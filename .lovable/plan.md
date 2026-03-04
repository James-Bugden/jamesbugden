

## Problem

The hidden measurement div renders `A4Page` with `minHeight: 297mm` (CSS). The browser converts `mm` to `px` using its own DPI (typically `1mm = 3.78px` at 96 DPI, but may vary slightly). Meanwhile, the page calculation uses a hardcoded `PX_PER_MM = 3.7795`. Any sub-pixel mismatch causes `scrollHeight` to slightly exceed `dims.hPX`, making `contentH > usablePerPage` and thus showing 2 pages even when content fits on one.

## Fix — `ResumePreview.tsx`

**1. Add a small tolerance to the page count calculation (line ~974)**

Change:
```typescript
setPageCount(Math.max(1, Math.ceil(contentH / usablePerPage)));
```
To:
```typescript
const rawPages = contentH / usablePerPage;
setPageCount(Math.max(1, rawPages <= 1.02 ? 1 : Math.ceil(rawPages)));
```

This adds a 2% tolerance — if content is within 2% of one page, it stays as one page. Content only spills to page 2 when it genuinely overflows.

**2. Alternative/complementary: remove `minHeight` from A4Page for the hidden measurement div**

Instead of the hidden div rendering `A4Page` with its `minHeight`, strip the `minHeight` so `scrollHeight` reflects actual content height only. This can be done by passing a prop like `measureMode` to `A4Page` that omits `minHeight`, or by wrapping the hidden div's content and reading its `scrollHeight` directly.

The simpler approach is fix #1 (tolerance). Both can be combined for robustness.

### File to edit
- `src/components/resume-builder/ResumePreview.tsx` — page count measurement logic (~line 974)

