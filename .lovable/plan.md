

## Fix: Excessive Whitespace Between Resume Sections

### Root Cause

The pagination algorithm treats `<section data-page-item>` wrappers the same as individual entry `<div data-page-item>` elements. When a section (e.g., Experience) straddles a page boundary and its total height is less than 80% of the usable page height, the **entire section** gets pushed to the next page — leaving a massive gap on the current page.

This happens because `querySelectorAll('[data-page-item]')` returns both section-level AND entry-level items. A section with only 2-3 entries can be under the 80% threshold and get pushed as a whole block, even though it would be better to let it start on the current page and break at individual entries.

Additionally, `getAtomicBlocks()` skips children with `data-page-item`, so when a section IS over the 80% threshold and deep traversal runs, it finds **no children** to break — the entry-level `data-page-item` divs are invisible to it.

### Fix (single file: `ResumePreview.tsx`)

**A. Skip section-level containers pagination — only process leaf items**

In `runPass()`, skip any `[data-page-item]` element that **contains** other `[data-page-item]` children. This ensures only the innermost items (individual entries) are candidates for pushing. Section wrappers flow naturally.

```typescript
items.forEach(el => {
  // Skip container-level items that have nested data-page-items
  if (el.querySelector('[data-page-item]')) return;
  // ... rest of push logic
});
```

**B. Update `getAtomicBlocks` to traverse INTO data-page-item children**

Since section-level items are now skipped, the deep traversal for large individual entries should still work. But also ensure that if an entry is large, its internal `li`/`p` elements are found correctly (they already are since entries don't contain nested `data-page-item`).

**C. Reduce whole-entry push threshold**

Lower from `0.8` to `0.6` — if a single entry takes more than 60% of a page, break at its children rather than pushing the whole thing.

### Result
- Sections start where they naturally flow — no more full-section pushes creating huge gaps
- Individual entries that straddle boundaries get pushed or broken at children
- Preview and PDF stay synchronized

