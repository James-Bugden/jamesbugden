
## Best solution

The best fix is to export the exact paginated preview pages, not the hidden measurement flow and not a separate PDF renderer.

## Why it is still broken now

The “revert” only switched the button back to `exportResumePages()`, but the exporter still uses `exportMetricsRef.current.sourceElement = hiddenFlowRef.current`.

That hidden node is not the same thing the user sees:
- it is the off-screen measurement tree
- it does not include the visible page shells/cropping behavior
- it does not include footer/page-number rendering
- it is exported as one tall image and then sliced mathematically

So the current export path is still not exporting the real preview. It is exporting an internal layout source.

## Implementation plan

1. In `ResumePreview.tsx`, expose the actual rendered page DOM for export
- extend `ResumeExportMetrics` to include `pageElements` or an `exportRoot`
- stop treating `hiddenFlowRef` as the export source
- keep `hiddenFlowRef` only for pagination measurement

2. Add a dedicated export-only page stack in `ResumePreview.tsx`
- render the same page markup as the visible preview, at 1:1 scale, off-screen
- include the exact page frame, cropped content window, translated page content, and footer/page numbers
- apply the same pagination mutations that the visible preview uses

3. Rewrite `exportResumePages()` in `src/lib/pdfExport.ts`
- accept the real page elements instead of one tall `sourceElement`
- capture each page individually and add one image per PDF page
- remove the current single-image slicing logic for resume export
- keep font embedding/CORS handling, but add stronger readiness guards before capture

4. Update both resume builders
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`
- use the new export metrics shape and fail gracefully if export pages are not ready

## Files to change

- `src/components/resume-builder/ResumePreview.tsx`
- `src/lib/pdfExport.ts`
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`

## Technical details

Recommended direction:
- export page-by-page from the same DOM structure used for the visible preview
- do not use `ResumePdfDocument.tsx` for exact-match export
- do not use `hiddenFlowRef` as the final export source
- do not slice one long screenshot into pages

This is the lowest-risk way to get true preview parity, because it removes the mismatch between:
```text
measurement DOM  -> exported now
visible paginated DOM -> what the user actually sees
```

After this change, the PDF should match:
- section order
- column layout
- pagination breaks
- footer/page numbers
- colors/fonts/spacing
- any future preview styling changes automatically
