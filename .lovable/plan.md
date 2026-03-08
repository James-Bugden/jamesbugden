

## Fix: Whitespace flicker between sections on text/color/bold changes

### Root Cause

When `data` or `customize` changes (from formatting, color picks, text edits), two effects fire:

1. **Pagination effect** (line 1060): Immediately resets all `marginTop` to `''` on the hidden flow, then recalculates after a **double-rAF** delay (~32ms)
2. **Visible-page apply effect** (line 1179): Also resets all `marginTop` to `''` on visible pages before reapplying mutations — but runs with the **stale** `mutationsRef.current` during the gap before pagination finishes

This creates a visible flash: sections collapse together (margins removed) → wait ~32ms → new margins applied. Users see sections jumping/whitespace appearing.

### Fix

**1. Don't reset visible-page margins until new mutations are ready.** Remove the eager reset in the apply-mutations effect. Instead, only apply once pagination has actually completed by gating on a render cycle counter.

**2. Keep old mutations applied until new ones replace them.** Instead of clearing `marginTop` to `''` then re-setting, directly overwrite with new values.

**3. Add a pagination-generation counter** to prevent the visible-page effect from using stale mutations.

### Files to modify

**`src/components/resume-builder/ResumePreview.tsx`**:

- Add a `paginationGenRef` (number ref, increments each pagination pass)
- In the pagination effect (line 1060), increment the gen counter after computing mutations
- Store gen alongside mutations: `mutationsRef.current = { gen, items, children }`
- In the visible-page apply effect (line 1179):
  - Remove the blanket `marginTop = ''` reset (lines 1187-1189)
  - Instead, iterate all items and set margin to `muts.items[idx] || 0` — this overwrites with 0 instead of removing, preventing layout shift
  - Track last-applied gen to skip redundant applies
- Remove the redundant `data-page-break-child` cleanup reset on the hidden flow — it's already handled by the per-item reset

This eliminates the two-frame gap where margins are cleared but not yet recalculated, preventing the visible whitespace flicker.

