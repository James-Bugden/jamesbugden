

# Fix: PDF Upload "Could not read file" Error

## Root Cause
The PDF.js worker URL is set to a CDN `.mjs` file, but the `try/catch` around the assignment is useless — assigning a string to `workerSrc` never throws. The actual failure happens asynchronously when `getDocument()` tries to spawn the worker and it fails (CORS, blocked `.mjs`, version mismatch). This triggers the outer catch with the generic error.

## Solution
Set `workerSrc = ""` to force main-thread parsing (no worker). This is slower but universally reliable. The worker URL approach is fragile across environments.

### Step 1: Simplify `extractTextFromPDF` in `src/pages/ResumeAnalyzer.tsx`
Replace lines 115-133 with:
```typescript
const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
  const pdfjsLib = await import("pdfjs-dist");
  pdfjsLib.GlobalWorkerOptions.workerSrc = "";
  const pdf = await pdfjsLib.getDocument({ data: new Uint8Array(await file.arrayBuffer()) }).promise;
  let text = "";
  for (let i = 1; i <= pdf.numPages; i++) {
    const page = await pdf.getPage(i);
    const content = await page.getTextContent();
    text += content.items.map((item: any) => ("str" in item ? item.str : "")).join(" ") + "\n";
  }
  return text.trim();
}, []);
```

Key changes:
- Force `workerSrc = ""` (main-thread parsing, always works)
- Safer item mapping with `"str" in item` check
- Remove the useless try/catch around the property assignment

### Files Changed
- `src/pages/ResumeAnalyzer.tsx` — simplified `extractTextFromPDF`

