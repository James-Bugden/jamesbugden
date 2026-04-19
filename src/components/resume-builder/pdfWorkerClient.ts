/**
 * Client-side wrapper around the PDF render Web Worker.
 *
 * Spawns a FRESH worker per render and terminates it when done.
 *
 * Why not reuse a singleton? We tried that first (commit 1a03765) — the
 * singleton rendered correctly when called directly via DevTools in prod
 * but hung indefinitely when called from the preview component's useEffect.
 * Fresh-per-render eliminates any worker-state-across-renders variable
 * from the debugging surface. Cold-start cost is real (~8-12s for CJK
 * because react-pdf + fontkit re-parse per render) but acceptable for a
 * feature only CJK users hit; debounce already gates re-renders to once
 * every 1.5s of user idle.
 *
 * If we ever want to bring back worker reuse, add a `keepAlive?: boolean`
 * flag to `renderPdfInWorker` and only terminate when false.
 */

import type { ResumeData } from "./types";
import type { CustomizeSettings } from "./customizeTypes";

// Vite resolves the ?worker suffix at build time and produces a
// constructor that boots the worker in its own thread.
import PdfRendererWorker from "../../workers/pdfRenderer.worker?worker";

type RenderResult =
  | { ok: true; blob: Blob }
  | { ok: false; error: string }
  | { ok: false; cancelled: true };

let currentRender: { id: string; terminate: () => void } | null = null;
let idCounter = 0;

/**
 * Render the resume to a PDF blob in a fresh Web Worker.
 *
 * If called while a previous render is in flight, the previous render is
 * terminated (worker killed) and its promise resolves with `cancelled: true`.
 * Callers should check `"cancelled" in result` before touching `result.blob`.
 */
export function renderPdfInWorker(
  data: ResumeData,
  customize: CustomizeSettings,
): { promise: Promise<RenderResult>; cancel: () => void } {
  const id = String(++idCounter);

  // Kill any in-flight render. Its promise below will resolve as cancelled.
  if (currentRender) {
    currentRender.terminate();
    currentRender = null;
  }

  const worker = new PdfRendererWorker();
  let settled = false;

  const promise = new Promise<RenderResult>((resolve) => {
    const finish = (r: RenderResult) => {
      if (settled) return;
      settled = true;
      // Tear down regardless of outcome — we don't reuse workers.
      try { worker.terminate(); } catch { /* noop */ }
      if (currentRender?.id === id) currentRender = null;
      resolve(r);
    };

    worker.addEventListener("message", (evt: MessageEvent<any>) => {
      const msg = evt.data ?? {};
      // Ignore responses for other ids (shouldn't happen since each worker
      // handles exactly one request, but be defensive).
      if (msg.id !== id) return;
      if (msg.ok) finish({ ok: true, blob: msg.blob });
      else finish({ ok: false, error: msg.error ?? "Unknown worker error" });
    });

    worker.addEventListener("error", (evt) => {
      finish({ ok: false, error: evt.message || "Worker crashed" });
    });

    // "messageerror" fires when postMessage data fails to deserialize.
    worker.addEventListener("messageerror", () => {
      finish({ ok: false, error: "Worker message deserialization failed" });
    });

    currentRender = {
      id,
      terminate: () => finish({ ok: false, cancelled: true } as RenderResult),
    };

    worker.postMessage({ id, data, customize });
  });

  return {
    promise,
    cancel: () => {
      if (currentRender?.id === id) {
        currentRender.terminate();
        currentRender = null;
      }
    },
  };
}

/**
 * Tear down any in-flight worker. Call from component cleanup if needed.
 */
export function disposePdfWorker(): void {
  if (currentRender) {
    currentRender.terminate();
    currentRender = null;
  }
}
