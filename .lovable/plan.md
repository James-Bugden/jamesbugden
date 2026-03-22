

## Fix: Resume PDF Export

### Problem
The `#resume-pdf-target` element in `ResumePreview.tsx` is the hidden measurement div used for pagination calculations. It's positioned at `left: -9999px` — completely off-screen. When `exportToPdf()` calls `html2canvas` on this element, the rendering fails or produces a blank/broken output because `html2canvas` struggles with off-screen elements.

### Solution
Modify `exportToPdf` in `src/lib/pdfExport.ts` to temporarily move the target element on-screen (but visually hidden behind a white overlay) before capturing, then restore it after.

### Changes

**File: `src/lib/pdfExport.ts`**
- Before calling `html2canvas`, temporarily override the container's styles:
  - Set `left: 0`, `top: 0`, `position: fixed`, `z-index: -1`, `opacity: 1`
  - This makes it renderable by html2canvas without being visible to the user
- After capture completes, restore the original styles
- This is a minimal, non-breaking change — no other files need editing

### Technical Detail
```text
Before capture:
  container.style.left = "0"
  container.style.top = "0"  
  container.style.position = "fixed"
  container.style.zIndex = "-1"

Capture with html2canvas...

After capture:
  Restore original styles
```

