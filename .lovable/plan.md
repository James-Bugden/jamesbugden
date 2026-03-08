

## Auto-detect and notify about excessive whitespace

### Problem
After pagination pushes items to the next page, the last page can end with a large blank area (e.g. content fills only 40% of the final page). The user wants either an auto-fix or a helpful notification.

### Approach: Whitespace detection + toast notification with actionable tips

After pagination runs (end of the convergence loop ~line 1147), calculate how much of the last page is actually used. If content fills less than ~50% of the last page AND there are 2+ pages, show a toast with tips.

**Detection logic** (inside the pagination useEffect, after `setPageCount`):
```
const lastPageUsed = totalH - (pages - 1) * usablePerPage;
const lastPageRatio = lastPageUsed / usablePerPage;
if (pages >= 2 && lastPageRatio < 0.5) → show notification
```

**Notification**: A non-blocking toast (using the existing sonner toast) with:
- "Your resume has a lot of empty space on page {N}."
- Tips: "Try reducing margins, decreasing font size, or adjusting line spacing in the Customize tab."
- Show once per data/customize change cycle (debounced, don't spam)

**Why not auto-fix**: Auto-adjusting margins/font would override user preferences unexpectedly. A notification respects user control while surfacing the issue.

### Files to modify
- **`src/components/resume-builder/ResumePreview.tsx`**: After pagination completes, calculate last-page fill ratio and call an `onWhitespaceWarning` callback or show toast directly
- Add a ref to track whether the warning was already shown for the current content state to avoid repeated toasts

### Implementation detail
- Add a `whitespaceWarningShown` ref (boolean) that resets when `data` or `customize` changes
- After `setPageCount`, if pages >= 2 and lastPageRatio < 0.5 and warning not yet shown, call `toast()` with the message and set the ref to true
- Import `toast` from `sonner` in ResumePreview

