

## Fix: Page 2 content too close to top in PDF export

### Problem
The exported PDF uses `@page { margin: 0 }` and relies on the resume element's internal padding for margins. This works on page 1, but when content flows to page 2+, headless Chrome starts content at the very top edge — there's no `@page` margin to create spacing on subsequent pages.

### Solution
Use CSS `@page` margins (derived from the user's `marginX`/`marginY` settings) so **every page** gets consistent margins. Then strip the element's own top/bottom padding to avoid doubling on page 1.

### Changes

**File: `src/lib/serverPdfExport.ts`**

1. Calculate `@page` margin values from the `customize.marginY` and `customize.marginX` settings (defaulting to 10mm if not provided)
2. Update the `@page` rule from `margin: 0` to `margin: {marginY}mm {marginX}mm`
3. Strip the cloned element's top and bottom padding so margins aren't doubled on page 1 (the `@page` margin now handles it)

This ensures headless Chrome applies the same margin on every page, matching what the user sees in the preview.

### Technical detail
- The `@page` CSS rule controls margins on *every* printed page
- Currently set to `0`, meaning only the element's internal padding provides spacing — but only on the first page
- By moving margins to `@page`, Chrome's print engine applies them uniformly across all pages

