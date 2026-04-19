import { supabase } from "@/integrations/supabase/client";
import { getAnonId } from "./anonId";

/**
 * Session manager.
 * - Creates a row in `sessions` on first page view of a visit.
 * - Heartbeats `last_seen_at` + `pages_viewed` as the user navigates.
 * - On unload, writes `ended_at` + `duration_sec` + `exit_page`.
 *
 * A session is "the same visit" until 30 minutes of inactivity, then a new
 * session is started. We track activity in sessionStorage so a real tab
 * close definitively ends it.
 */

const SESSION_KEY = "jb_session_id";
const SESSION_STARTED_KEY = "jb_session_started_at";
const SESSION_LAST_KEY = "jb_session_last_at";
const PAGES_KEY = "jb_session_pages";
const INACTIVITY_MS = 30 * 60 * 1000;

let currentSessionId: string | null = null;
let initPromise: Promise<string | null> | null = null;

function detectDevice(): "mobile" | "tablet" | "desktop" {
  const ua = navigator.userAgent;
  if (/iPad|Tablet/i.test(ua)) return "tablet";
  if (/Mobi|Android|iPhone/i.test(ua)) return "mobile";
  return "desktop";
}

function detectBrowser(): string {
  const ua = navigator.userAgent;
  if (/Edg\//.test(ua)) return "Edge";
  if (/OPR\/|Opera/.test(ua)) return "Opera";
  if (/Chrome\//.test(ua) && !/Chromium/.test(ua)) return "Chrome";
  if (/Firefox\//.test(ua)) return "Firefox";
  if (/Safari\//.test(ua) && !/Chrome/.test(ua)) return "Safari";
  return "Other";
}

const RETURNING_KEY = "jb_has_visited";

function readUtm(): Record<string, string | null> {
  const p = new URLSearchParams(window.location.search);
  return {
    utm_source: p.get("utm_source"),
    utm_medium: p.get("utm_medium"),
    utm_campaign: p.get("utm_campaign"),
    utm_term: p.get("utm_term"),
    utm_content: p.get("utm_content"),
  };
}

export async function initSession(): Promise<string | null> {
  if (typeof window === "undefined") return null;
  if (currentSessionId) return currentSessionId;
  if (initPromise) return initPromise;

  initPromise = (async () => {
    const now = Date.now();
    const stored = sessionStorage.getItem(SESSION_KEY);
    const lastSeen = parseInt(sessionStorage.getItem(SESSION_LAST_KEY) || "0", 10);

    // Resume same session if recent
    if (stored && lastSeen && now - lastSeen < INACTIVITY_MS) {
      currentSessionId = stored;
      const pages = parseInt(sessionStorage.getItem(PAGES_KEY) || "1", 10) + 1;
      sessionStorage.setItem(PAGES_KEY, String(pages));
      sessionStorage.setItem(SESSION_LAST_KEY, String(now));
      // Fire-and-forget heartbeat
      supabase
        .from("sessions" as any)
        .update({
          last_seen_at: new Date().toISOString(),
          pages_viewed: pages,
          exit_page: window.location.pathname,
        })
        .eq("id", stored)
        .then(() => {});
      return stored;
    }

    // Otherwise start a new session
    const anonId = getAnonId();
    const { data: userRes } = await supabase.auth.getUser();
    const userId = userRes?.user?.id ?? null;
    const utm = readUtm();
    let isReturning = false;
    try {
      isReturning = localStorage.getItem(RETURNING_KEY) === "1";
      if (!isReturning) localStorage.setItem(RETURNING_KEY, "1");
    } catch {
      // ignore — private mode
    }

    const { data, error } = await supabase
      .from("sessions" as any)
      .insert({
        anon_id: anonId,
        user_id: userId,
        entry_page: window.location.pathname,
        exit_page: window.location.pathname,
        device_type: detectDevice(),
        browser: detectBrowser(),
        is_returning: isReturning,
        viewport_w: window.innerWidth,
        viewport_h: window.innerHeight,
        user_agent: navigator.userAgent.slice(0, 500),
        language: navigator.language,
        timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        referrer: document.referrer || null,
        ...utm,
      })
      .select("id")
      .single();

    if (error || !data) {
      if (import.meta.env.DEV) console.warn("Session init failed:", error?.message);
      initPromise = null;
      return null;
    }

    const id = (data as any).id as string;
    currentSessionId = id;
    sessionStorage.setItem(SESSION_KEY, id);
    sessionStorage.setItem(SESSION_STARTED_KEY, String(now));
    sessionStorage.setItem(SESSION_LAST_KEY, String(now));
    sessionStorage.setItem(PAGES_KEY, "1");
    return id;
  })();

  return initPromise;
}

export function getSessionId(): string | null {
  if (currentSessionId) return currentSessionId;
  if (typeof window !== "undefined") {
    return sessionStorage.getItem(SESSION_KEY);
  }
  return null;
}

/** Bumps last-seen and increments page count on SPA navigation. */
export async function touchSession(path: string): Promise<void> {
  const id = getSessionId();
  if (!id) {
    await initSession();
    return;
  }
  const now = Date.now();
  const pages = parseInt(sessionStorage.getItem(PAGES_KEY) || "1", 10) + 1;
  sessionStorage.setItem(PAGES_KEY, String(pages));
  sessionStorage.setItem(SESSION_LAST_KEY, String(now));
  supabase
    .from("sessions" as any)
    .update({
      last_seen_at: new Date().toISOString(),
      pages_viewed: pages,
      exit_page: path,
    })
    .eq("id", id)
    .then(() => {});
}

/** Called on tab close / pagehide. Best-effort. */
export function endSession(): void {
  const id = getSessionId();
  if (!id) return;
  const startedAt = parseInt(sessionStorage.getItem(SESSION_STARTED_KEY) || "0", 10);
  const durationSec = startedAt ? Math.round((Date.now() - startedAt) / 1000) : null;
  // Use sendBeacon-ish pattern via fetch with keepalive for reliability
  try {
    const url = `${import.meta.env.VITE_SUPABASE_URL}/rest/v1/sessions?id=eq.${id}`;
    const body = JSON.stringify({
      ended_at: new Date().toISOString(),
      duration_sec: durationSec,
      exit_page: window.location.pathname,
    });
    fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        apikey: import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
        Prefer: "return=minimal",
      },
      body,
      keepalive: true,
    }).catch(() => {});
  } catch {
    // ignore
  }
}
