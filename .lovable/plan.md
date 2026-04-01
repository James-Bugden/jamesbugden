

# Fix: PDF Upload Still Failing — `disableWorker` Is Ignored in pdfjs-dist v4

## Root Cause
The `disableWorker` option was removed from PDF.js in version 2.0. The project uses **pdfjs-dist v4.10.38**, so passing `disableWorker: true` in the `getDocument()` options does absolutely nothing — it's silently ignored. The library still attempts to spawn a web worker, which fails due to CORS/blocked scripts.

## Solution
Set `pdfjsLib.GlobalWorkerOptions.workerSrc = ""` **before** calling `getDocument()`. This is the correct v4 way to force main-thread parsing. Remove the non-functional `disableWorker`, `useWorkerFetch`, and `isEvalSupported` options.

### Files to Change (3 files, same pattern)

**1. `src/pages/ResumeAnalyzer.tsx`** (lines 115-130)
Add `pdfjsLib.GlobalWorkerOptions.workerSrc = "";` after the import, remove the dead options from `getDocument()`.

**2. `src/lib/documentImport.ts`** (lines 11-20)
Same fix — add `workerSrc = ""` after import, simplify `getDocument()` call.

**3. `src/lib/renderPdfToImage.ts`** (lines 4-13)
Same fix.

### Code Pattern (applied to all 3 files)
```typescript
const pdfjsLib = await import("pdfjs-dist");
pdfjsLib.GlobalWorkerOptions.workerSrc = "";
const pdf = await pdfjsLib.getDocument({
  data: new Uint8Array(await file.arrayBuffer()),
}).promise;
```

