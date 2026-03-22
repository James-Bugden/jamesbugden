
Goal: make Resume Builder PDF export reliable on both desktop and mobile by removing the brittle “capture one off-screen tall node” approach and exporting from a stable paginated source.

1. Identify and replace the fragile export path
- The current export depends on `getElementById("resume-pdf-target")` and a hidden flow positioned at `left: -9999px`.
- That is brittle for mobile browsers, font loading, and large multi-page resumes.
- I’ll replace this with a dedicated resume export path that does not rely on a globally queried off-screen node.

2. Add a stable export source in `ResumePreview`
- In `src/components/resume-builder/ResumePreview.tsx`, I’ll expose an always-mounted, unscaled export container or page refs for the already-paginated resume pages.
- Each PDF page will map to one real DOM page, matching the existing pagination engine instead of slicing one giant canvas.
- This keeps the current live preview behavior, zoom, and mobile overlay intact while giving export a clean source.

3. Upgrade `src/lib/pdfExport.ts` for reliable page-by-page export
- Change the exporter so it can capture page elements directly instead of only an `elementId`.
- Export each page separately with `html2canvas`, then append each page to `jsPDF`.
- Add readiness guards before capture:
  - wait for layout paint
  - wait for `document.fonts.ready`
  - wait for images to finish decoding where possible
- Add mobile-safe capture settings:
  - adaptive scale (lower on small/mobile devices to avoid memory crashes)
  - explicit background color
  - safe scroll offsets / fixed positioning handling
- Keep backward compatibility for the cover-letter export path if possible, so only resume export behavior changes.

4. Update Resume Builder download handlers
- In `src/pages/ResumeBuilder.tsx` and `src/pages/ResumeBuilderSimple.tsx`, switch the download action to the new resume export API.
- Keep the existing loading state, filename handling, and paper-size selection.
- Ensure both desktop dropdown download and mobile preview-overlay download call the same stable exporter.

5. Prevent common failure modes
- No more dependence on `left: -9999px` for the resume export.
- No more giant single-canvas capture for multi-page resumes.
- Avoid blank/partial PDFs caused by fonts not being ready.
- Reduce mobile failures caused by memory pressure from high-resolution full-document capture.

Technical details
```text
Current flow
  hidden off-screen tall node
  -> html2canvas(one huge capture)
  -> slice into pages

Planned flow
  paginated page DOM refs / hidden export pages
  -> wait until fonts + layout are ready
  -> html2canvas(each page individually)
  -> jsPDF addPage per captured page
```

Files likely to change
- `src/lib/pdfExport.ts`
- `src/components/resume-builder/ResumePreview.tsx`
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`

QA plan
- Desktop: export 1-page and 2+ page resumes
- Mobile: export from the preview overlay on a narrow viewport
- Formats: verify both A4 and Letter
- Styling: verify custom fonts/colors render correctly
- Regression: confirm cover-letter PDF export still works
