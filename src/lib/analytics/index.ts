/**
 * Central analytics module.
 *
 * Public API:
 *   - track(eventType, eventName, metadata?)        → event_tracks (firehose)
 *   - trackTool(tool, action, outcome?, opts?)      → tool_completions
 *   - trackError(source, message, extra?)           → error_log
 *   - trackGuideRead(slug, lang)                    → guide_reads (returns updater)
 *
 * All writes auto-attach anon_id + session_id + user_id.
 * Every helper is fire-and-forget; failures only log in DEV.
 */
import { supabase } from "@/integrations/supabase/client";
import { getAnonId } from "./anonId";
import { getSessionId, initSession as ensureSession } from "./session";

export { initSession, touchSession, endSession, getSessionId } from "./session";
export { getAnonId } from "./anonId";

async function getUserId(): Promise<string | null> {
  try {
    const { data } = await supabase.auth.getUser();
    return data?.user?.id ?? null;
  } catch {
    return null;
  }
}

/** Firehose event — goes to event_tracks. */
export function track(
  eventType: string,
  eventName: string,
  metadata?: Record<string, unknown>,
): void {
  if (typeof window === "undefined") return;
  const anon_id = getAnonId();
  const session_id = getSessionId();
  const page = window.location.pathname;
  const enriched = { ...(metadata ?? {}), anon_id, session_id };
  supabase
    .from("event_tracks" as any)
    .insert({
      event_type: eventType,
      event_name: eventName,
      page,
      metadata: enriched,
    })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn("[analytics] track failed:", error.message);
      }
    });
}

/** Significant tool completion — goes to tool_completions. */
export async function trackTool(
  tool: string,
  action: string,
  outcome: Record<string, unknown> = {},
  opts: { lang?: string; durationMs?: number; success?: boolean } = {},
): Promise<void> {
  if (typeof window === "undefined") return;
  const [user_id, session_id] = await Promise.all([getUserId(), ensureSession()]);
  const anon_id = getAnonId();
  const { error } = await supabase.from("tool_completions" as any).insert({
    session_id,
    anon_id,
    user_id,
    tool,
    action,
    lang: opts.lang ?? null,
    outcome,
    duration_ms: opts.durationMs ?? null,
    success: opts.success ?? true,
  });
  if (error && import.meta.env.DEV) {
    console.warn("[analytics] trackTool failed:", error.message);
  }
}

/** Error capture — goes to error_log. */
export function trackError(
  source: "js_error" | "pdf_export" | "garbled_text" | "ai_call" | "network" | string,
  message: string,
  extra: { stack?: string; metadata?: Record<string, unknown> } = {},
): void {
  if (typeof window === "undefined") return;
  const session_id = getSessionId();
  const anon_id = getAnonId();
  supabase
    .from("error_log" as any)
    .insert({
      session_id,
      anon_id,
      // Don't await getUserId — keep the call sync-ish for error handlers
      source,
      message: message.slice(0, 1000),
      stack: extra.stack?.slice(0, 4000) ?? null,
      page: window.location.pathname,
      metadata: extra.metadata ?? {},
    })
    .then(({ error }) => {
      if (error && import.meta.env.DEV) {
        console.warn("[analytics] trackError failed:", error.message);
      }
    });
}

/**
 * Start a guide read. Returns helpers to update scroll/time/CTAs and
 * finalize on unmount. Fire-and-forget — if the row insert fails, the
 * updaters become no-ops.
 */
export function startGuideRead(slug: string, lang: "en" | "zh" = "en") {
  const anon_id = getAnonId();
  const session_id = getSessionId();
  const startedAt = Date.now();
  let rowId: string | null = null;
  let ctaClicks = 0;
  let copyActions = 0;

  const insertPromise = (async () => {
    const user_id = await getUserId();
    const { data, error } = await supabase
      .from("guide_reads" as any)
      .insert({
        session_id,
        anon_id,
        user_id,
        guide_slug: slug,
        guide_lang: lang,
      })
      .select("id")
      .single();
    if (error || !data) {
      if (import.meta.env.DEV) console.warn("[analytics] guide_read insert failed:", error?.message);
      return null;
    }
    rowId = (data as any).id as string;
    return rowId;
  })();

  return {
    incrementCta: () => {
      ctaClicks++;
    },
    incrementCopy: () => {
      copyActions++;
    },
    /** Finalize the row with scroll depth, time, and counters. */
    finalize: async (scrollDepthPct: number, markedComplete = false) => {
      await insertPromise;
      if (!rowId) return;
      const time_on_page_sec = Math.round((Date.now() - startedAt) / 1000);
      supabase
        .from("guide_reads" as any)
        .update({
          ended_at: new Date().toISOString(),
          time_on_page_sec,
          scroll_depth_pct: Math.max(0, Math.min(100, Math.round(scrollDepthPct))),
          reached_bottom: scrollDepthPct >= 90,
          cta_clicks: ctaClicks,
          copy_actions: copyActions,
          marked_complete: markedComplete,
        })
        .eq("id", rowId)
        .then(() => {});
    },
  };
}

/** Install global error handler — call once on app mount. */
export function installGlobalErrorHandler(): () => void {
  if (typeof window === "undefined") return () => {};

  const onError = (e: ErrorEvent) => {
    trackError("js_error", e.message || "Unknown error", {
      stack: e.error?.stack,
      metadata: {
        filename: e.filename,
        lineno: e.lineno,
        colno: e.colno,
      },
    });
  };
  const onRejection = (e: PromiseRejectionEvent) => {
    const reason = e.reason;
    const message =
      typeof reason === "string"
        ? reason
        : reason?.message || "Unhandled promise rejection";
    trackError("js_error", message, {
      stack: reason?.stack,
      metadata: { kind: "unhandledrejection" },
    });
  };

  window.addEventListener("error", onError);
  window.addEventListener("unhandledrejection", onRejection);
  return () => {
    window.removeEventListener("error", onError);
    window.removeEventListener("unhandledrejection", onRejection);
  };
}

// Phase A tracking events (HIR-246) — Save-for-Later + Profile Wizard
// These utilities will be wired when corresponding UI components are built.

/**
 * Fire when a job is saved for later (bookmarked).
 * @param jobId Job identifier
 * @param jobTitle Job title
 * @param company Company name
 * @param metadata Optional additional data
 */
export function trackJobSaved(jobId: string, jobTitle: string, company: string, metadata?: Record<string, unknown>): void {
  track("save_for_later", "job_saved", { job_application_id: jobId, job_title: jobTitle, company_name: company, ...metadata });
}

/**
 * Fire when a job is removed from saved for later (unbookmarked).
 * @param jobId Job identifier
 * @param jobTitle Job title
 * @param company Company name
 * @param metadata Optional additional data
 */
export function trackJobUnsaved(jobId: string, jobTitle: string, company: string, metadata?: Record<string, unknown>): void {
  track("save_for_later", "job_unsaved", { job_application_id: jobId, job_title: jobTitle, company_name: company, ...metadata });
}

/**
 * Fire when a resume analysis is saved.
 * @param score Analysis score
 * @param language Language of the resume
 * @param metadata Optional additional data
 */
export function trackResumeAnalysisSaved(score: number, language: string, metadata?: Record<string, unknown>): void {
  track("resume_analysis", "analysis_saved", { score, language, ...metadata });
}

/**
 * Fire when the Profile Wizard is first presented to a new user.
 * @param userId User identifier
 * @param metadata Optional additional data
 */
export function trackProfileWizardStarted(userId: string, metadata?: Record<string, unknown>): void {
  track("profile_wizard", "profile_wizard_started", { user_id: userId, ...metadata });
}

/**
 * Fire when a user updates any field in the Profile Wizard.
 * @param updates The profile fields that were updated
 * @param metadata Optional additional data
 */
export function trackProfileWizardUpdated(updates: Record<string, unknown>, metadata?: Record<string, unknown>): void {
  track("profile_wizard", "profile_wizard_updated", { updates, ...metadata });
}
