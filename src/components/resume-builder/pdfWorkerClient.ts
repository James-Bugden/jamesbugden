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

// Diagnostic ring buffer accessible from DevTools as window.__pdfWorkerLog.
// Helps debug "why does the direct call succeed but the component call hang"
// by giving a timestamped trace of every state transition. Remove once CJK
// preview is stable.
type LogEntry = { t: number; ev: string; id?: string; detail?: unknown };
const boot = performance.now();
const log: LogEntry[] = [];
function trace(ev: string, id?: string, detail?: unknown) {
  const entry: LogEntry = { t: Math.round(performance.now() - boot), ev, id, detail };
  log.push(entry);
  if (log.length > 200) log.shift();
  if (typeof window !== "undefined") {
    (window as unknown as { __pdfWorkerLog?: LogEntry[] }).__pdfWorkerLog = log;
  }
}

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
  trace("call", id);

  // IMPORTANT: do NOT terminate in-flight workers.
  //
  // We tried terminating on new calls (commit cdf60b4) — that froze the
  // preview because React's effect cleanup + re-run pattern caused every
  // render to kill its own predecessor before it could complete. With
  // debouncedData oscillating during the first ~second of mount the
  // worker never got to finish a single render inside the 90s timeout.
  //
  // Instead, let ALL in-flight workers keep running. When the newest one
  // resolves, its result is used; older results are dropped by the
  // caller (which tracks the latest id via the return value). Cost:
  // occasional parallel worker work for 5-10s until the old ones finish.
  // Acceptable — only CJK users hit this path.

  const worker = new PdfRendererWorker();
  let settled = false;

  const promise = new Promise<RenderResult>((resolve) => {
    const finish = (r: RenderResult) => {
      if (settled) return;
      settled = true;
      trace("finish", id, { ok: (r as { ok?: boolean }).ok, cancelled: "cancelled" in r });
      try { worker.terminate(); } catch { /* noop */ }
      if (currentRender?.id === id) currentRender = null;
      resolve(r);
    };

    worker.addEventListener("message", (evt: MessageEvent<any>) => {
      const msg = evt.data ?? {};
      trace("worker:message", id, { msgId: msg?.id, ok: msg?.ok, size: msg?.blob?.size, errPrefix: msg?.error?.slice?.(0, 60) });
      if (msg.id !== id) return;
      if (msg.ok) finish({ ok: true, blob: msg.blob });
      else finish({ ok: false, error: msg.error ?? "Unknown worker error" });
    });

    worker.addEventListener("error", (evt) => {
      trace("worker:error", id, { msg: evt.message?.slice?.(0, 80) });
      finish({ ok: false, error: evt.message || "Worker crashed" });
    });

    worker.addEventListener("messageerror", () => {
      trace("worker:messageerror", id);
      finish({ ok: false, error: "Worker message deserialization failed" });
    });

    currentRender = {
      id,
      terminate: () => { trace("terminate-requested", id); finish({ ok: false, cancelled: true } as RenderResult); },
    };

    trace("postMessage", id);
    worker.postMessage({ id, data, customize });
  });

  return {
    promise,
    cancel: () => {
      trace("cancel-requested", id);
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
