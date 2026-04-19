/**
 * Server-side preview rasterization — FlowCV-style.
 *
 * Sends a client-rendered PDF blob to the `render-resume-preview` Supabase
 * Edge Function (which uses Browserless to rasterize pages to PNG), then
 * returns the PNG data URLs the preview pane renders.
 *
 * Why this path exists:
 *   - Client-side pdfjs rasterization freezes on CJK-heavy PDFs on slow
 *     devices. Offloading rasterization to Browserless (fast, CJK-safe)
 *     keeps the editor responsive.
 *   - PDF generation still happens on the client (same react-pdf pipeline
 *     as download), so server preview == downloaded file — no drift.
 *
 * Gating:
 *   - `VITE_PREVIEW_ENDPOINT_ENABLED=1` env flag OR
 *   - `?serverPreview=1` query param (for testing before flip)
 *   - OR call renderPagesServer() directly from feature code.
 *
 * Not-yet-authed callers get `ok: false`. Caller falls back to local path.
 */

import { supabase } from "@/integrations/supabase/client";

export type ServerPreviewResult =
  | { ok: true; pngs: string[]; pageCount: number }
  | { ok: false; error: string };

/**
 * Turn a PDF Blob into an array of page PNG data URLs via the Edge
 * Function. Safe to call on every debounce tick — server-side usage is
 * rate-limited (200/mo/user by default, see render-resume-preview
 * index.ts).
 */
export async function renderPagesServer(
  pdf: Blob,
  opts: { signal?: AbortSignal; pageFormat?: "a4" | "letter" } = {},
): Promise<ServerPreviewResult> {
  // PDF → base64. Use FileReader because Blob.arrayBuffer() → btoa() on a
  // ~200KB file runs the UI thread for ~40ms — FileReader yields to the
  // event loop and is safe for a debounced preview path.
  const pdfBase64 = await blobToBase64(pdf);

  try {
    const { data, error } = await supabase.functions.invoke("render-resume-preview", {
      body: { pdfBase64, pageFormat: opts.pageFormat ?? "a4" },
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
 * Flag to opt in to the server path. Kept simple (env var OR query
 * param) so you can test on a single browser tab without redeploying.
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
