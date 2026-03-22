
Goal: make the resume download a real, clean PDF with no blank pages and a much smaller file size.

What I found
- The current resume export in `src/lib/pdfExport.ts` is still screenshot-based: it captures the hidden resume DOM with `html-to-image`, then slices that raster image into PDF pages.
- The console error points to the real failure: `html-to-image` is trying to read Google Fonts stylesheet rules and hits a cross-origin `SecurityError`. `ResumePreview.tsx` injects `<link rel="stylesheet" href={GOOGLE_FONTS_URL} />`, so the export pipeline depends on a stylesheet the browser won’t let it inspect.
- Even when it works, the current approach produces large files because every page becomes a high-resolution PNG inside the PDF.
- This is also why the export can drift from the visible preview: it exports the hidden measurement tree, not a true PDF document.

Implementation plan
1. Replace the resume export path with a true PDF renderer
- Build a dedicated resume PDF document module using `@react-pdf/renderer`.
- Generate the PDF directly from `ResumeData` + `CustomizeSettings` instead of capturing DOM.
- Keep text as real PDF text and only use raster images for items like the profile photo.

2. Reuse the existing resume structure and styling rules
- Create shared helpers for:
  - section ordering
  - date formatting
  - page size (A4 / Letter)
  - margins, colors, header/footer settings
  - one-column / two-column section placement
- Map the current customization controls to PDF styles so the downloaded file still matches the builder design closely.

3. Convert editor HTML into PDF-safe rich text
- Add a small parser for the limited markup the builder already uses (`p`, `br`, `ul`, `ol`, `li`, `strong`, `em`, `u`, `a`).
- Render bullets, links, emphasis, and paragraph spacing as real PDF text blocks instead of flattened images.

4. Make the export smaller and more reliable
- Register only the active fonts used by the current resume instead of relying on the full Google Fonts stylesheet bundle.
- Remove resume dependence on `html-to-image`, `hiddenFlowRef`, and page-image slicing.
- Keep image assets compressed, but stop embedding full-page PNGs.

5. Wire the builders to the new export API
- Update `ResumeBuilder.tsx` and `ResumeBuilderSimple.tsx` to call the new resume PDF generator directly.
- Scope this change to resume export only, so cover letter export is not disturbed during the fix.

6. Add regression coverage
- Add tests for the rich-text conversion helpers and section/style mapping.
- Add an export smoke test to verify one-page and multi-page resumes generate a non-empty PDF blob.
- Verify page numbers, footer options, and two-column resumes still export correctly.

Files to update
- `src/lib/pdfExport.ts`
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`
- new PDF document component/helper files under `src/components/resume-builder/` or `src/lib/`
- `package.json`

Technical note
- I would not keep iterating on the current screenshot exporter for resumes. It is the direct cause of both reported problems:
  - blank/failed pages from the font stylesheet security error
  - oversized files from rasterized page images
- The preview UI can stay as-is. Only the download path needs to move to a true PDF implementation.

Expected outcome
- no blank first page
- much smaller PDF files
- selectable/searchable text
- clean one-click PDF download without using a screenshot export pipeline
