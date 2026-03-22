

## Fix: "Fix overlap" button doesn't work

### Root cause

The "Fix overlap" button (line 1466-1500) measures item positions from the **already-paginated** hidden flow (where margins have been applied by the auto-pass). It then calculates the page boundary as `pageBottom = i * usablePerPage`. But after auto-pagination has pushed items down with `marginTop`, the actual content positions no longer align with simple multiples of `usablePerPage`. So the button either finds **no straddling items** or the **wrong items**.

When `manualBreaks` is set, the pagination `useEffect` fires, **resets all margins**, and re-runs from scratch. The item indices stored in `manualBreaks` may now refer to items that don't actually straddle the boundary in the un-paginated state.

### The fix

**In the button click handler** (lines 1466-1484): reset the hidden flow margins before measuring, so positions match the un-paginated coordinate system that the pagination engine uses after its own reset.

```typescript
onClick={() => {
  const root = hiddenFlowRef.current;
  if (!root) return;

  // Reset margins first so we measure un-paginated positions
  // (same as what the pagination useEffect does before its passes)
  root.querySelectorAll('[data-page-item]').forEach(el => {
    (el as HTMLElement).style.marginTop = '';
  });
  root.querySelectorAll('[data-page-break-child]').forEach(el => {
    (el as HTMLElement).style.marginTop = '';
    el.removeAttribute('data-page-break-child');
  });

  // Force layout reflow
  void root.offsetHeight;

  const items = root.querySelectorAll('[data-page-item]');
  const rootRect = root.getBoundingClientRect();
  const pageBottom = i * usablePerPage;
  const newBreaks = new Set(manualBreaks);
  items.forEach((el, idx) => {
    if (el.querySelector('[data-page-item]')) return;
    const rect = el.getBoundingClientRect();
    const elTop = rect.top - rootRect.top - contentOriginPX;
    const elBottom = elTop + rect.height;
    if (elTop < pageBottom && elBottom > pageBottom + 2) {
      newBreaks.add(idx);
    }
  });
  setManualBreaks(newBreaks);
  setFixedPages(prev => new Set(prev).add(i));
}}
```

### File to edit
- `src/components/resume-builder/ResumePreview.tsx` — button click handler (lines 1466-1484)

### Why this works
The pagination `useEffect` always resets margins before running its passes. The button now measures in the **same coordinate space** (un-paginated), so the item indices it stores in `manualBreaks` will correctly identify straddling items when the useEffect re-runs its passes.

