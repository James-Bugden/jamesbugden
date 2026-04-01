

# Fix: "Could not read file" Error on PDF Upload (Resume Analyzer)

## Problem
When uploading a PDF in the Resume Analyzer, users see "Could not read file. Please try pasting instead." The error is a generic catch-all that hides the actual failure reason.

## Root Cause
The outer `try/catch` in `handleSubmitResume` (line 307-309) catches **any** error from PDF extraction or analysis and shows one generic message. Common causes include:
- Password-protected PDFs
- Image-only/scanned PDFs that extract <100 chars (handled separately but confusingly)
- PDF.js worker initialization failures on some browsers
- The `extractTextFromPDF` function throwing before returning usable text

## Solution

### Step 1: Improve error specificity in `handleSubmitResume`
In `src/pages/ResumeAnalyzer.tsx`, update the outer catch block (line 307-309) to:
- Check for common PDF.js error patterns (password required, invalid PDF)
- Show targeted error messages instead of a single generic one
- Log the full error for debugging

### Step 2: Add a fallback worker initialization
Wrap the PDF.js worker setup in its own try/catch with a fallback to `workerSrc = ""` (uses main-thread parsing as backup). This ensures PDFs still parse even if the CDN worker fails to load.

### Step 3: Better "too short" messaging
The current flow extracts text, then checks `text.length < 100` (line 234). If extraction succeeds but yields very little text, the message says "scanned PDF" — which is correct but the flow should also hint that paste is available.

## Files Changed
- `src/pages/ResumeAnalyzer.tsx` — improved error handling in `extractTextFromPDF` and `handleSubmitResume` catch block

