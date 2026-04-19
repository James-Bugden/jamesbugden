/**
 * Client-side wrapper around the PDF render Web Worker.
 *
 * Owns a single Worker instance, sends tagged render requests, and
 * resolves the matching response. Superseded requests resolve with
 * { cancelled: true } instead of hanging or throwing, so the preview
 * component can cleanly ignore stale renders when the user keeps typing.
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

type Pending = {
  resolve: (r: RenderResult) => void;
};

let worker: Worker | null = null;
const pending = new Map<string, Pending>();
let currentId = 0;

function getWorker(): Worker {
  if (worker) return worker;
  worker = new PdfRendererWorker();
  worker.addEventListener("message", (evt: MessageEvent<any>) => {
    const { id, ok, blob, error } = evt.data ?? {};
    const entry = pending.get(id);
    if (!entry) return;
    pending.delete(id);
    if (ok) entry.resolve({ ok: true, blob });
    else entry.resolve({ ok: false, error: error ?? "Unknown worker error" });
  });
  worker.addEventListener("error", (evt) => {
    // If the worker itself dies, reject every pending render
    const msg = evt.message || "Worker crashed";
    pending.forEach((p) => p.resolve({ ok: false, error: msg }));
    pending.clear();
    worker = null;
  });
  return worker;
}

/**
 * Render the resume to a PDF blob in the worker.
 *
 * Calling this a second time before the first resolves will mark the
 * earlier call as cancelled — its promise resolves with { cancelled: true }
 * and the caller should discard the result. The worker still finishes
 * the old render (we don't have sync interruption), but by the time it
 * posts back the id won't match any pending entry.
 */
export function renderPdfInWorker(
  data: ResumeData,
  customize: CustomizeSettings,
): { promise: Promise<RenderResult>; cancel: () => void } {
  const id = String(++currentId);
  const w = getWorker();

  // Cancel any in-flight renders — preview updates supersede each other.
  pending.forEach((entry, oldId) => {
    pending.delete(oldId);
    entry.resolve({ ok: false, cancelled: true });
  });

  const promise = new Promise<RenderResult>((resolve) => {
    pending.set(id, { resolve });
  });

  w.postMessage({ id, data, customize });

  const cancel = () => {
    const entry = pending.get(id);
    if (entry) {
      pending.delete(id);
      entry.resolve({ ok: false, cancelled: true });
    }
  };

  return { promise, cancel };
}

/**
 * Tear down the worker. Only useful on hot reload or when the app
 * unmounts the resume builder entirely. Normal preview re-renders
 * should NOT call this — reusing the worker preserves its Font.register
 * cache, saving multi-second font fetches.
 */
export function disposePdfWorker(): void {
  if (worker) {
    worker.terminate();
    worker = null;
  }
  pending.forEach((p) => p.resolve({ ok: false, cancelled: true }));
  pending.clear();
}
