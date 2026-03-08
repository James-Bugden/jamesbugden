

## Fix: Prevent Text Cut-off at Page Boundaries

### Problem
Bullet point text (`li` elements) that wraps to multiple lines gets visually clipped at the page boundary. The current pagination logic has two tiers:
1. **Whole entry push**: if a `data-page-item` straddles a page and is <95% of page height, push it entirely
2. **Child-level push**: if the entry is too large, push individual children (`p`, `li`, etc.)

The issue is that tier 2 only activates for very large entries (>95% page height). For normal-sized entries that simply happen to straddle the boundary, the whole entry is pushed — but if the entry is *just* large enough that pushing it would exceed the next page too, neither tier handles it well. Additionally, the child selector doesn't recurse deeply enough into `dangerouslySetInnerHTML` content.

### Fix in `src/components/resume-builder/ResumePreview.tsx`

**Change the pagination logic** (lines ~1042-1070) to:

1. **Lower the threshold** for whole-entry push from 95% to ~80% of usable page height — entries that fit on a single page should always be pushed whole
2. **For larger entries**, run child-level break prevention on ALL nested elements including deeply nested `li` items inside HtmlBlock rendered content
3. **Add a safety margin** (~4px) so lines aren't clipped right at the boundary — push if the bottom of any child is within 4px of the page edge
4. **Run multiple passes** (2 iterations) so that pushing one child doesn't cause the next child to now straddle a boundary

### Specific changes

In the pagination `useEffect`:
- Change `usablePerPage * 0.95` → `usablePerPage * 0.8` for the whole-entry push threshold
- Change the tolerance from `+ 2` to `+ 4` for boundary detection  
- After pushing children, do a second measurement pass to catch cascading breaks
- Ensure the `querySelectorAll` selector also targets `li` elements nested inside `div` containers (already does, but verify it works with the HtmlBlock wrapper)

