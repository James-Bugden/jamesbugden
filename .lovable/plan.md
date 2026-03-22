

## Fix: Capture Hidden Flow as One Image, Slice into Pages via Canvas

### Root Cause
The current approach tries to capture each visible page frame with `html-to-image`. These frames have a complex nested structure: `overflow:hidden` → absolutely positioned clipping div → `translateY`-shifted full A4Page content. When `html-to-image` clones this structure off-screen, the layout breaks and produces a blank image.

### Solution
Stop trying to capture the complex page frame DOM. Instead:

1. **Capture the hidden flow as one tall image** — `hiddenFlowRef` is a simple div, no transforms, no overflow clipping. It already has all pagination mutations (marginTop spacers) applied. `html-to-image` handles it reliably.

2. **Slice into pages using Canvas** — Load the tall image into a Canvas, then for each page, draw the correct vertical slice corresponding to `contentOriginPX + i * usablePerPage` into a page-sized canvas.

3. **Draw footer/page numbers onto each canvas** — Use Canvas text drawing to add footer content (name, email, page numbers) at the bottom of each page slice, matching the preview's footer styling.

4. **Export each canvas as a JPEG page in the PDF** — Convert each canvas to a data URL and add to jsPDF.

### Changes

**`src/lib/pdfExport.ts`**
- Rewrite `exportResumePages` to accept: `sourceElement`, `pageCount`, `contentOriginPX`, `usablePerPagePX`, `pageHeightPX`, `marginYPX`, `fileName`, `pageFormat`, and optional footer config (`footerName`, `footerEmail`, `showPageNumbers`)
- Capture `sourceElement` once as a tall PNG using `html-to-image`
- Load into an `Image`, draw sliced regions into per-page canvases
- Render footer text with `ctx.fillText()` if provided
- Add each canvas to jsPDF
- Remove the per-element capture loop

**`src/components/resume-builder/ResumePreview.tsx`**
- Update `ResumeExportMetrics` to include footer config: `footerName`, `footerEmail`, `showPageNumbers`, `bodyFont`, `datesColor`
- Populate these from `customize` and `data.personalDetails` in the export metrics effect
- Remove `pageElements` from the metrics (no longer needed)
- Keep `pageFrameRefs` for UI only (not export)

**`src/pages/ResumeBuilder.tsx`** and **`src/pages/ResumeBuilderSimple.tsx`**
- Update `handleDownload` to pass `sourceElement` and pagination metrics instead of `pageElements`
- Pass footer config from metrics

### Why This Works
- The hidden flow is a flat div that `html-to-image` can capture reliably (no transforms, no overflow clipping, no absolute positioning tricks)
- Canvas slicing is deterministic — no DOM cloning ambiguity
- Footer text is drawn in canvas space — no need for a second DOM tree
- The pagination mutations are already applied to the hidden flow, so page breaks are correct
- Single capture + slice is faster than N separate DOM captures

### Technical Detail
```text
hiddenFlowRef (simple div, mutations applied)
    ↓ html-to-image → one tall PNG
    ↓ Canvas slice per page region
    ↓ Draw footer text per page
    ↓ canvas.toDataURL() per page
    ↓ jsPDF.addImage() per page
    = PDF with exact content match + footers
```

