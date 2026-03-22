
Goal: fix resume PDF export so page 1 no longer clips the top header, and page 2+ starts lower with proper top spacing.

What I found
- `src/lib/serverPdfExport.ts` currently serializes the hidden full-flow resume with `@page { margin: 0; }` and keeps the resume’s own top/bottom padding intact.
- In `src/components/resume-builder/ResumePreview.tsx`, the hidden export source is one continuous `A4Page` box. Its vertical padding only protects the very top and very bottom of that one long element, not each printed page.
- `supabase/functions/generate-pdf/index.ts` also forces Browserless print margins to zero and uses `preferCSSPageSize: false`, which can override or fight any page-margin rules we set in the exported HTML.

Implementation plan
1. Restore export-only page margins in the serializer
- In `src/lib/serverPdfExport.ts`, compute export margins from `customize.marginY` plus the existing safe zones.
- Set `@page` to vertical margins only:
  ```text
  margin: {topSafe}mm 0 {bottomSafe}mm 0
  ```
- Keep horizontal spacing on the resume element itself so left/right margins still come from `--resume-margin-x`.

2. Strip only vertical padding from the cloned resume root
- Find the cloned `A4Page` root (`[data-color-role='background']`).
- Zero only:
  - `--resume-pad-top`
  - `--resume-pad-bottom`
  - `paddingTop`
  - `paddingBottom`
- Do not touch `--resume-margin-x` or left/right padding.

3. Make the backend respect the print CSS
- In `supabase/functions/generate-pdf/index.ts`, stop hardcoding zero PDF margins in Browserless.
- Switch the PDF call to honor CSS page sizing/margins cleanly (`preferCSSPageSize: true` and remove conflicting width/height/margin overrides, or otherwise align backend options to the same values).
- This is the key coordination step so the serializer fix actually takes effect in the generated PDF.

4. Keep the header intact and preserve natural pagination
- Leave the cleanup selector limited to interactive UI only (`button`, overlays, poppers, `.no-print`).
- Keep removing preview-only `marginTop` hacks from `[data-page-item]` and `[data-page-break-child]` before export so Chrome can paginate naturally.

Technical details
- The export source is `hiddenFlowRef`, which wraps a single `A4Page`; exporting a continuous layout is fine as long as vertical spacing is moved from element padding to page margins.
- `clone.outerHTML` should continue to be sent, not inner fragments.
- No database changes are needed; this is a client + backend-function export fix only.
- Both `ResumeBuilder.tsx` and `ResumeBuilderSimple.tsx` already pass `customize`, so they should benefit automatically once the serializer/backend are corrected.

Verification plan
1. Export a 2-page resume like the uploaded example.
2. Confirm page 1 shows the full name/title/contact row above the divider.
3. Confirm page 2 content starts below a visible top margin instead of touching the top edge.
4. Confirm left/right margins still match the on-screen preview.
5. Re-test with different margin settings and both A4/Letter to ensure the spacing scales correctly.
