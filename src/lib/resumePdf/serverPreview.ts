/**
 * Server-side preview rasterization — FlowCV-style.
 *
 * Sends a client-rendered PDF blob to a server that rasterizes each page to
 * a PNG, then returns the PNG data URLs for the preview pane.
 *
 * Two backends supported (decided at runtime):
 *   - Fly.io service at VITE_PREVIEW_ENDPOINT_URL (preferred — avoids the
 *     Lovable-owned Supabase project which blocks CLI deploys).
 *   - Supabase Edge Function `render-resume-preview` (fallback — works if
 *     that project's perms are ever unblocked).
 *
 * Why this path exists:
 *   - Client-side pdfjs rasterization freezes on CJK-heavy PDFs on slow
 *     devices. Offloading rasterization keeps the editor responsive.
 *   - PDF generation still happens on the client (same react-pdf pipeline
 *     as download), so server preview == downloaded file — no drift.
 *
 * Gating:
 *   - `VITE_PREVIEW_ENDPOINT_ENABLED=1` env flag OR
 *   - `?serverPreview=1` query param (for testing before flip)
 *
 * Not-yet-authed callers get `ok: false`. Caller falls back to local path.
 */

import { supabase } from "@/integrations/supabase/client";

export type ServerPreviewResult =
  | { ok: true; pngs: string[]; pageCount: number }
  | { ok: false; error: string };

/**
 * Turn a PDF Blob into an array of page PNG data URLs.
 *
 * Routes to the Fly.io endpoint if `VITE_PREVIEW_ENDPOINT_URL` is set,
 * otherwise falls back to the Supabase Edge Function name.
 * Safe to call on every debounce tick — the server enforces its own rate
 * limits.
 */
export async function renderPagesServer(
  pdf: Blob,
  opts: { signal?: AbortSignal; pageFormat?: "a4" | "letter" } = {},
): Promise<ServerPreviewResult> {
  // PDF → base64. Use FileReader because Blob.arrayBuffer() → btoa() on a
  // ~200KB file runs the UI thread for ~40ms — FileReader yields to the
  // event loop and is safe for a debounced preview path.
  const pdfBase64 = await blobToBase64(pdf);
  const body = { pdfBase64, pageFormat: opts.pageFormat ?? "a4" };

  // Default to the Fly.io rasterization endpoint. Lovable has no UI for
  // VITE_* build-time env vars, so hardcoding is the simplest way to wire
  // prod to the server renderer. Env var still overrides for staging/local.
  const flyUrl = ((import.meta.env.VITE_PREVIEW_ENDPOINT_URL as string | undefined) ??
    "https://jamesbugden-preview.fly.dev/render");
  if (flyUrl) {
    return renderViaFly(flyUrl, body, opts.signal);
  }

  // Supabase fallback (currently 403 due to Lovable project perms)
  try {
    const { data, error } = await supabase.functions.invoke("render-resume-preview", {
      body,
    });

    if (error) {
      return { ok: false, error: error.message ?? String(error) };
    }
    if (!data?.pngs?.length) {
      return { ok: false, error: "Server returned no pages" };
    }
    return { ok: true, pngs: data.pngs, pageCount: data.pageCount ?? data.pngs.length };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * POST to the Fly.io endpoint with the user's Supabase JWT. Server verifies
 * the token before accepting the render.
 */
async function renderViaFly(
  url: string,
  body: { pdfBase64: string; pageFormat: "a4" | "letter" },
  signal?: AbortSignal,
): Promise<ServerPreviewResult> {
  let accessToken = "";
  try {
    const { data } = await supabase.auth.getSession();
    accessToken = data.session?.access_token ?? "";
  } catch {
    /* unauthenticated path — server will reject and we'll fall back */
  }

  if (!accessToken) {
    return { ok: false, error: "Not authenticated" };
  }

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(body),
      signal,
    });

    if (!res.ok) {
      const text = await res.text().catch(() => "");
      return { ok: false, error: `HTTP ${res.status}: ${text.slice(0, 200)}` };
    }

    const json = (await res.json()) as {
      pngs?: string[];
      pageCount?: number;
    };
    if (!json.pngs?.length) {
      return { ok: false, error: "Server returned no pages" };
    }
    return {
      ok: true,
      pngs: json.pngs,
      pageCount: json.pageCount ?? json.pngs.length,
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

/**
 * Flag to opt in to the server path. Defaults to OFF — the Tokyo round-trip
 * adds ~1-2s per preview tick which felt slow even for CJK, so local pdfjs
 * stays the default and the iframe fallback handles the rare pdfjs crash.
 * Opt in per-tab with `?serverPreview=1`.
 */
export function serverPreviewEnabled(): boolean {
  if (typeof window === "undefined") return false;
  const qp = new URLSearchParams(window.location.search);
  if (qp.get("serverPreview") === "1") return true;
  if (qp.get("serverPreview") === "0") return false;
  const envFlag = (import.meta.env.VITE_PREVIEW_ENDPOINT_ENABLED ?? "") as string;
  return envFlag === "1" || envFlag === "true";
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      // reader.result is a data URL — strip the prefix "data:application/pdf;base64,"
      const str = reader.result as string;
      const comma = str.indexOf(",");
      resolve(comma >= 0 ? str.slice(comma + 1) : str);
    };
    reader.onerror = () => reject(reader.error ?? new Error("FileReader failed"));
    reader.readAsDataURL(blob);
  });
}
