

## Fix: Persistent whitespace between sections on formatting changes

### Root Cause

The architecture uses a hidden DOM for measurement and then replicates computed `marginTop` mutations to visible pages via DOM manipulation. The core problem:

1. When `data`/`customize` changes (color, bold, font size), React re-renders visible A4Page components. Because React reconciles using stable keys (`section.id`, `entry.id`), DOM elements are **reused in place** — old `marginTop` values set by previous DOM manipulation survive the re-render.

2. The pagination effect fires but waits **~32ms** (double rAF) before computing new mutations and calling `setMutationVersion`. During this gap, stale margins persist on visible pages.

3. The apply effect depends on `[mutationVersion, pageCount]`. After a `data`/`customize` change but before pagination completes, the effect either:
   - Doesn't run (mutationVersion hasn't changed yet), leaving stale margins
   - Runs but skips via the generation guard (`muts.gen === lastAppliedGenRef.current`)

4. For layout-neutral changes (color, bold), the stale margins happen to match the new ones, so no visible issue. But for **any case where content reflows** (font size, line height, or even if React reorders/adds/removes DOM nodes during reconciliation), the stale margins create visible whitespace gaps that persist until the rAF-delayed pagination catches up — and sometimes the index mapping between hidden and visible DOMs gets out of sync, making the gap permanent.

### The Fix

**Replace the fragile ref+rAF mutation replication with React-synchronized state.**

1. **Store mutations as React state** instead of a ref — change `mutationsRef` to `const [mutations, setMutations] = useState<PaginationMutations | null>(null)`.

2. **Clear mutations immediately when deps change** — add a synchronous effect on `[data, customize]` that clears all visible-page margins to `''`. This prevents stale margins from surviving React re-render.

3. **Remove the generation guard and rAF wrapper from the apply effect** — apply mutations synchronously in a `useLayoutEffect` triggered by `[mutations, pageCount]`. Using `useLayoutEffect` ensures margins are applied before paint, eliminating the flash entirely.

4. **Remove `mutationVersion`, `paginationGenRef`, `lastAppliedGenRef`** — no longer needed since mutations flow through state.

### Implementation Details

**File: `src/components/resume-builder/ResumePreview.tsx`**

- Remove: `paginationGenRef`, `lastAppliedGenRef`, `mutationVersion` state
- Change: `mutationsRef` → `const [mutations, setMutations] = useState<PaginationMutations | null>(null)`
- In pagination effect (line 1064): after convergence loop, call `setMutations(muts)` instead of updating ref + incrementing version. Keep `setPageCount` call.
- Add new effect: `useEffect(() => { /* clear all visible-page margins to '' */ }, [data, customize])` — runs before pagination completes, prevents stale margins from showing
- Replace apply effect (line 1200) with `useLayoutEffect` depending on `[mutations, pageCount]`:
  - No generation guard needed
  - No rAF wrapper needed (useLayoutEffect runs synchronously before paint)
  - Same margin-application logic: iterate `[data-page-item]`, apply `mutations.items[idx]`, apply child mutations
- Import `useLayoutEffect` alongside existing hooks

This eliminates:
- The 2-frame gap where stale margins are visible
- The ref-vs-state synchronization mismatch
- The generation counter complexity

