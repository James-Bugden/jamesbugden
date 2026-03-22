
Goal: replace the still-broken screenshot export with a true resume PDF generator. The uploaded PDF confirms the current output is effectively empty: both pages parse as `NO_CONTENT_HERE`, and the current code still exports from a hidden off-screen DOM clone in `src/lib/pdfExport.ts`, which is the same fragile path causing blank pages and oversized files.

Plan

1. Stop using DOM capture for resume exports
- Keep the on-screen resume preview exactly as it is.
- Remove the resume download path’s dependency on `html-to-image`, hidden measurement DOM, and page-image slicing.
- Leave cover letter export alone for now so this fix stays scoped and lower-risk.

2. Add a dedicated resume PDF document
- Create a new PDF renderer using `@react-pdf/renderer` that builds the resume directly from `ResumeData` + `CustomizeSettings`.
- Generate real PDF text instead of a flattened screenshot, which fixes both blank pages and file size.
- Support A4 and Letter based on the existing page format setting.

3. Mirror the current resume structure in PDF
- Reuse the existing section order and section types: summary, experience, education, skills, languages, certificates, plus the personal header.
- Map the current customization options that matter most for output:
  - page size
  - margins
  - font size / line height
  - accent color
  - one-column vs two-column layout
  - heading style
  - footer / page numbers
- Build this with shared helpers so the PDF stays close to the live preview without depending on browser CSS.

4. Convert builder rich text into PDF-safe content
- Add a small parser for the HTML the editor already produces: paragraphs, line breaks, bold, italic, underline, lists, and links.
- Render those as native PDF text blocks and bullets instead of images.
- Sanitize and normalize unsupported markup so exports stay reliable.

5. Make fonts reliable instead of browser-dependent
- Do not depend on Google Fonts stylesheets at export time.
- Register only the active font families needed for the current resume, or map to safe PDF fonts where necessary for reliability.
- This removes the current cross-origin/font stylesheet failure point entirely.

6. Wire the builders to the new API
- Update `ResumeBuilder.tsx` and `ResumeBuilderSimple.tsx` to call a new resume-specific PDF export function using the actual resume data/settings, not `exportMetricsRef`.
- Keep `exportToPdf()` only for cover letters until resume export is stable.

Files to update
- `src/lib/pdfExport.ts`
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`
- new resume PDF files under `src/components/resume-builder/` or `src/lib/`
- `package.json`

Technical notes
- The current blank output is not just a tuning issue. It comes from exporting a hidden DOM clone through a screenshot pipeline.
- Because the present resume preview uses browser CSS features like Google Fonts and modern color functions, continuing to patch the screenshot approach will stay brittle.
- A true PDF renderer is the correct fix for:
  - non-blank output
  - smaller files
  - selectable/searchable text
  - stable multi-page exports

QA plan
- Export a one-page and multi-page resume from `/resume`.
- Verify the downloaded PDF contains real text, not empty pages.
- Check file size against the current export and confirm it is materially smaller.
- Parse the generated PDF and visually inspect page renders to confirm:
  - no blank pages
  - no clipped sections
  - correct pagination
  - footer/page-number behavior
