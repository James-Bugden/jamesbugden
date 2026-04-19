/**
 * Web Worker for react-pdf rendering.
 *
 * Moves @react-pdf/renderer + fontkit entirely off the main thread so the
 * editor stays responsive while CJK fonts parse (previously a 30-75s
 * freeze on Traditional Chinese resumes).
 *
 * Design notes:
 * - We do NOT static-import react-pdf at the top of this file. react-pdf
 *   (and transitively pdfkit / fontkit) reads `window` and `document` at
 *   module init for feature detection, which throws in a worker because
 *   neither global exists. We shim `window` and `document` FIRST, then
 *   dynamic-import the PDF code only after the globals are in place.
 * - The worker owns its own Font.register registry — it can't share state
 *   with the main thread, so fonts are registered fresh the first time
 *   this worker handles a resume. Subsequent renders hit the in-worker
 *   cache.
 *
 * Message protocol:
 *   main → worker: { id: string, data: ResumeData, customize: CustomizeSettings }
 *   worker → main: { id: string, ok: true, blob: Blob }
 *                  { id: string, ok: false, error: string }
 */

// --- Worker globals shim (must run BEFORE any PDF code is loaded) -----------
// ES import statements are hoisted to the top of the module, so the only
// reliable way to patch globals before react-pdf evaluates is to keep its
// import out of the static graph and dynamic-import it inside the handler.
const g = self as unknown as {
  window?: unknown;
  document?: unknown;
};
if (typeof g.window === "undefined") g.window = self;
// Vite dev mode injects React Fast Refresh stubs into every TSX file.
// Workers don't have the refresh runtime, so define no-ops before any
// TSX import (ResumePDF, etc) evaluates.
const gRefresh = self as unknown as {
  $RefreshReg$?: (type: unknown, id: string) => void;
  $RefreshSig$?: () => <T>(type: T) => T;
};
if (typeof gRefresh.$RefreshReg$ === "undefined") {
  gRefresh.$RefreshReg$ = () => {};
}
if (typeof gRefresh.$RefreshSig$ === "undefined") {
  gRefresh.$RefreshSig$ = () => (type) => type;
}

if (typeof g.document === "undefined") {
  // react-pdf / pdfkit / their transitive deps touch a surprising amount
  // of DOM surface area at module init. Each method is a no-op that
  // returns a plausibly-shaped object so feature detection code paths
  // fall through without throwing.
  const fakeNode = () => ({
    style: {},
    setAttribute: () => {},
    appendChild: () => {},
    removeChild: () => {},
    addEventListener: () => {},
    removeEventListener: () => {},
  });
  g.document = {
    createElement: fakeNode,
    createElementNS: fakeNode,
    createTextNode: fakeNode,
    querySelector: () => null,
    querySelectorAll: () => [],
    getElementById: () => null,
    getElementsByTagName: () => [],
    getElementsByClassName: () => [],
    addEventListener: () => {},
    removeEventListener: () => {},
    documentElement: { style: {} },
    head: { appendChild: () => {}, removeChild: () => {} },
    body: { appendChild: () => {}, removeChild: () => {} },
  };
}

// --- Types (kept as type-only imports so they don't drag in runtime) --------
import type { ResumeData } from "../components/resume-builder/types";
import type { CustomizeSettings } from "../components/resume-builder/customizeTypes";

type RenderRequest = {
  id: string;
  data: ResumeData;
  customize: CustomizeSettings;
};

type RenderResponse =
  | { id: string; ok: true; blob: Blob }
  | { id: string; ok: false; error: string };

// Memoise the dynamic import so repeat renders don't re-fetch the module.
type PdfModule = {
  React: typeof import("react");
  pdf: typeof import("@react-pdf/renderer").pdf;
  ResumePDF: typeof import("../components/resume-builder/ResumePDF").ResumePDF;
  prepareFonts: typeof import("../components/resume-builder/ResumePDF").prepareFonts;
};

let pdfModulePromise: Promise<PdfModule> | null = null;
function loadPdfModule(): Promise<PdfModule> {
  if (!pdfModulePromise) {
    pdfModulePromise = (async () => {
      const [React, reactPdf, resumePdf] = await Promise.all([
        import("react"),
        import("@react-pdf/renderer"),
        import("../components/resume-builder/ResumePDF"),
      ]);
      return {
        React: (React as unknown as { default: typeof import("react") }).default ?? React,
        pdf: reactPdf.pdf,
        ResumePDF: resumePdf.ResumePDF,
        prepareFonts: resumePdf.prepareFonts,
      } as PdfModule;
    })();
  }
  return pdfModulePromise;
}

self.addEventListener("message", async (evt: MessageEvent<RenderRequest>) => {
  const { id, data, customize } = evt.data;
  try {
    const mod = await loadPdfModule();
    // awaitCJK: true — we're off the main thread, so fontkit's 30-75s
    // sync parse doesn't matter. Waiting ensures pdf().toBlob() renders
    // actual Chinese glyphs instead of Helvetica tofu.
    await mod.prepareFonts(customize, data, { awaitCJK: true });
    const element = mod.React.createElement(mod.ResumePDF, { data, customize });
    const blob = await mod.pdf(element as unknown as React.ReactElement).toBlob();

    const resp: RenderResponse = { id, ok: true, blob };
    (self as unknown as Worker).postMessage(resp);
  } catch (err) {
    const resp: RenderResponse = {
      id,
      ok: false,
      error: err instanceof Error ? `${err.name}: ${err.message}` : String(err),
    };
    (self as unknown as Worker).postMessage(resp);
  }
});

// Keep TypeScript happy — this file is a module.
export {};
