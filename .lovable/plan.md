

## Fix: Resume PDF Export Broken by `html2canvas` CSS Color Function Error

### Problem
`html2canvas` crashes with `"Attempting to parse an unsupported color function 'color'"` when trying to capture the resume preview. This is a known, unfixable limitation of the abandoned `html2canvas` library — it cannot parse modern CSS `color()` functions used by newer browser stylesheets/Tailwind.

### Solution
Replace the `html2canvas + jsPDF` export with a `window.print()` approach using custom `@media print` CSS. This is the same pattern already used by the Resume Analyzer and toolkit pages.

### Changes

**1. `src/lib/pdfExport.ts`** — Replace both `exportToPdf` and `exportResumePages` with a single `printResume()` function that:
- Temporarily adds a class to `<html>` to activate print-specific styles
- Calls `window.print()` (browser-native PDF generation, no library needed)
- Removes the class after printing
- Keep the function signatures backward-compatible or update callers

**2. `src/pages/ResumeBuilder.tsx`** — Update `handleDownload` to call the new print-based export instead of `exportResumePages`/`exportToPdf`.

**3. `src/pages/ResumeBuilderSimple.tsx`** — Same update as above.

**4. `src/components/cover-letter/CoverLetterBuilder.tsx`** — Update to use print-based export for cover letters.

**5. `src/index.css` (or new print stylesheet)** — Add `@media print` rules that:
- Hide everything except the resume/cover-letter preview target
- Remove scaling transforms so the A4 content prints at native size
- Set `@page` size to A4/Letter with zero margins
- Hide nav bars, sidebars, and other UI chrome

**6. `package.json`** — Remove `html2canvas` and `jspdf` dependencies (no longer needed).

### Why This Works
- `window.print()` uses the browser's own rendering engine, which fully supports modern CSS
- No dependency on abandoned libraries with known vulnerabilities and parsing gaps
- Already proven in the project's other export flows (Resume Analyzer, toolkit pages)

