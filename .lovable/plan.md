

# Fix: PDF Import Using Bundled Worker URL (pdfjs-dist v4)

## Problem
Setting `GlobalWorkerOptions.workerSrc = ""` does not disable the worker in pdfjs-dist v4 — it leaves PDF.js with a broken worker path, causing all PDF uploads to fail silently.

## Solution
Use Vite's `?url` import suffix to get a proper URL to the bundled worker file. This gives PDF.js a valid worker it can spawn, which is the correct approach for pdfjs-dist v4 in a Vite project.

## Changes (3 files, same pattern)

### Pattern
```typescript
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
// ...
const pdfjsLib = await import("pdfjs-dist");
pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
```

### Files
1. **`src/lib/documentImport.ts`** — Add the static `?url` import at the top. Use `pdfjsWorkerUrl` in `extractTextFromPdf`.
2. **`src/pages/ResumeAnalyzer.tsx`** — Same static import, use in `extractTextFromPDF` callback.
3. **`src/lib/renderPdfToImage.ts`** — Same static import, use in `renderPdfToImage`.

The `?url` import is a Vite feature that bundles the worker file as a static asset and returns its URL at build time — no CDN, no CORS issues.

