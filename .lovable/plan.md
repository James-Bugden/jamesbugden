

## Fix: Replace `window.print()` with Direct PDF Download

### Problem
The current export uses `window.print()`, which opens a browser print dialog instead of directly downloading a PDF. Users expect a one-click PDF download.

### Solution
Use `html-to-image` (SVG foreignObject approach — no CSS parsing, so no `color()` function crash) + `jsPDF` to render the resume to a proper downloadable PDF file.

### Changes

**1. Install dependencies**
- `html-to-image` — converts DOM to PNG via SVG foreignObject (supports all modern CSS)
- `jspdf` — assembles images into a multi-page PDF

**2. Rewrite `src/lib/pdfExport.ts`**
- `exportResumePages()`: Clone the source element at 1:1 scale into an off-screen container, use `html-to-image`'s `toPng()` to capture each page region, then assemble pages into a `jsPDF` document and trigger `pdf.save(fileName)`.
- `exportToPdf()`: Same approach for cover letters — single-page capture + download.
- Handle font loading wait (document.fonts.ready) before capture.
- Use 2x pixel ratio for crisp output, 1.5x on mobile to avoid memory issues.

**3. Update `src/pages/ResumeBuilder.tsx`** — No changes needed (already calls `exportResumePages`).

**4. Update `src/pages/ResumeBuilderSimple.tsx`** — No changes needed (already calls `exportResumePages`).

**5. Update `src/components/cover-letter/CoverLetterBuilder.tsx`** — No changes needed if it already calls `exportToPdf`.

### Why `html-to-image` over `html2canvas`
- Uses the browser's own rendering engine (SVG foreignObject) instead of re-implementing CSS parsing
- Fully supports modern CSS including `color()`, `oklch()`, etc.
- Actively maintained

