
## Status: Implemented

## What was done

Eliminated the separate export DOM stack. The PDF export now captures the **exact visible page frames** the user sees in the preview.

### Architecture (after fix)

```
hiddenFlowRef  → measurement only (computes pagination breaks)
visible page frames (pageFrameRefs) → rendered preview + PDF export source
captureElement → clones each frame, strips shadow/border-radius, preserves inner translateY
```

### Changes made

1. **ResumePreview.tsx**
   - Removed `exportPageRefs` and the entire off-screen export stack (~70 lines)
   - Added `pageFrameRefs` pointing to the actual visible page frame divs
   - Export metrics now expose `pageFrameRefs` as `pageElements`
   - Removed export stack from mutation application and stale-margin clearing

2. **pdfExport.ts**
   - Fixed `captureElement` to preserve inner transforms (translateY for pagination)
   - Uses explicit inline dimensions instead of scrollWidth when available
   - Strips `boxShadow` and `borderRadius` from clones (removes preview-only decorations)

3. **Builders unchanged** — they already consume `metrics.pageElements`
