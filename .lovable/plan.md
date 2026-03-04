

## Fix: Page Break Margins and Per-Page Footer Spacing

### Problem
Content flows right up to the footer area because `usablePerPage` doesn't reserve space for the footer. On page 2+, content starts too close to the top. The reference image shows clear whitespace between content and footer on every page.

### Root Cause
- `usablePerPage = dims.hPX - 2 * marginYPX` — this only accounts for top/bottom page margins but doesn't reserve space for the footer text line
- The footer is absolutely positioned at `bottom: marginYPX`, but content can extend into that same space
- Page 2+ gets `paddingTop: marginYPX` but has no bottom content cutoff adjustment

### Fix in `src/components/resume-builder/ResumePreview.tsx`

1. **Calculate footer reserve height** (~10mm ≈ 38px) when any footer option is enabled
2. **Subtract footer reserve from `usablePerPage`** so content stops before the footer zone on every page
3. **Adjust the page-slice `translateY` offset** for pages 2+ to account for the reduced usable area
4. **Position footer lower** — move it to a fixed bottom position inside the page margin, below the content cutoff

### Key changes (single file):

```
// Before:
const usablePerPage = dims.hPX - 2 * marginYPX;

// After:
const showFooter = customize?.showPageNumbers || customize?.showFooterEmail || customize?.showFooterName;
const footerReservePX = showFooter ? 10 * PX_PER_MM : 0;
const usablePerPage = dims.hPX - 2 * marginYPX - footerReservePX;
```

The footer stays absolutely positioned at the bottom margin. Content simply stops earlier on each page, creating the whitespace gap visible in the reference image.

