

## Revert to Screenshot-Based Export (Exact Preview Match)

### Problem
The `@react-pdf/renderer` approach generates a separate PDF document from data, which can never exactly match the complex 1600-line `ResumePreview.tsx` component. The console error `Invalid '' string child outside <Text>` also indicates rendering bugs in the PDF document component.

### Root Cause
The resume builders were switched from `exportResumePages()` (screenshot of actual preview DOM) to `exportResumePdf()` (`@react-pdf/renderer`). The old screenshot method had CORS issues with Google Fonts, but those were already fixed in `pdfExport.ts` via font CSS pre-fetching and cross-origin link filtering.

### Solution
Switch `handleDownload` in both `ResumeBuilder.tsx` and `ResumeBuilderSimple.tsx` back to using `exportResumePages()` from `pdfExport.ts`, which captures the actual rendered preview DOM. The `exportMetricsRef` is already being populated by `ResumePreview` with the correct hidden flow element and pagination metrics.

### Changes

**`src/pages/ResumeBuilder.tsx`** (lines 661-666)
- Replace `exportResumePdf({ data, customize, fileName: fn })` with `exportResumePages()` using `exportMetricsRef.current`
- Remove unused `exportResumePdf` import

**`src/pages/ResumeBuilderSimple.tsx`** (lines 657-663)
- Same change as above

### Why This Works
- `pdfExport.ts` already has the Google Fonts CORS fix (pre-fetches CSS, filters cross-origin `<link>` tags)
- `pdfExport.ts` already uses JPEG at 85% quality for smaller files
- `exportMetricsRef` is still being populated by `ResumePreview` with the hidden flow element, page count, and pagination metrics
- The screenshot captures exactly what the user sees, including all CSS, fonts, colors, layouts, and pagination

