

## Problem

The PDF export fails with "Export failed — Something went wrong generating the PDF" because the hidden measurement div (which doubles as the `resume-pdf-target` for `html2canvas`) is positioned at `left: -9999px`. While this was changed from `opacity: 0` to fix a previous issue, `html2canvas` still struggles to capture elements that are far off-screen — it can produce empty or errored canvases depending on browser clipping behavior.

The root issue is that the same div serves two incompatible purposes:
1. **Measurement** (for pagination spacer logic) — needs to be in the DOM flow but hidden
2. **PDF capture target** (for html2canvas) — needs to be visually renderable

## Plan

**File: `src/components/resume-builder/ResumePreview.tsx`**

1. **Separate the PDF target from the hidden measurement div.** Keep the hidden measurement div (`hiddenFlowRef`) off-screen for pagination calculations, but **remove** the `pdfTargetId` from it.

2. **Add a dedicated PDF capture div** that is only made visible (moved on-screen) at export time. This div will:
   - Live inside the scrollable container
   - Default to `visibility: hidden; height: 0; overflow: hidden` (takes no space, doesn't interfere with layout)
   - Have `id={pdfTargetId}` so `exportToPdf` can find it

3. **Expose an imperative method or use a state flag** so that when `exportToPdf` is called, the PDF target temporarily becomes visible (full size, on-screen) for `html2canvas` to capture, then hides again after.

**Simpler alternative (preferred):** Instead of the above complexity, just move the hidden div back on-screen but use `visibility: hidden; position: absolute; overflow: hidden; height: 0` — this doesn't work for html2canvas either.

**Simplest fix:** Move the PDF target div to use `position: fixed; left: 0; top: 0; opacity: 0.01; pointer-events: none; z-index: -9999` — keeping it technically "on-screen" and renderable by html2canvas while being invisible to the user. The key difference from `left: -9999px` is that the element remains within the browser's rendering viewport.

**File: `src/lib/pdfExport.ts`**

4. Add a temporary repositioning step before calling `html2canvas`:
   - Before capture: move the target element to `position: fixed; left: 0; top: 0; z-index: -1; opacity: 1`
   - Call `html2canvas`
   - After capture (in finally block): restore original styles

This approach is the most robust because it guarantees the element is fully rendered when captured, regardless of how it's hidden during normal use.

### Summary of changes
- `ResumePreview.tsx` — no changes needed (keep hidden div as-is for measurement)
- `pdfExport.ts` — temporarily reposition the target element on-screen before `html2canvas` capture, then restore it afterward

