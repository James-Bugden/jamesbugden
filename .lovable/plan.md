

## Fix Page Break Content Splitting in Resume Preview

### Problem
The current pagination system slices content at fixed pixel intervals (`usablePerPage`) using CSS `translateY`. This is purely mathematical and has zero awareness of DOM elements. When a bullet point or entry straddles a page boundary, it gets cut in half -- the top half shows at the bottom of page N and the bottom half at the top of page N+1 (as seen in the screenshot).

### Root Cause
Lines 1036-1039 in `ResumePreview.tsx`: each page just shifts the same rendered content up by `i * usablePerPage` pixels and clips it with `overflow: hidden`. No element boundary detection happens.

### Solution: Element-Aware Pagination with Spacer Injection

Instead of blindly slicing at fixed offsets, measure actual DOM element positions in the hidden flow div and inject spacers to push elements that would be split to the next page.

**Approach:**

1. **Add `data-page-break="avoid"` attributes** to key elements in the `A4Page` render:
   - Each `<section>` wrapper (section heading + entries)
   - Each individual entry `<div>` within experience/education/etc.
   - Each `<li>` bullet point within entry descriptions (via a wrapper in `HtmlBlock`)

2. **Create a `paginateContent()` function** that runs after the hidden div renders:
   - Query all `[data-page-break="avoid"]` elements in the hidden flow div
   - For each element, calculate its top offset relative to the content start (after top margin)
   - Determine which page boundary it would cross: `pageBottom = (pageIndex + 1) * usablePerPage`
   - If an element starts before a page boundary but ends after it, AND the element height is less than `usablePerPage` (it fits on a single page), insert a CSS spacer before it to push it to the next page
   - Track cumulative spacer height to adjust subsequent calculations
   - Return the final total content height (including spacers) for accurate page count

3. **Apply spacers via a state array** rather than DOM manipulation:
   - Store spacer positions as state: `[{ beforeElementIndex: number, height: number }]`
   - Re-render the A4Page with spacer divs injected at the right positions
   - Actually, simpler: use a `useEffect` that directly manipulates the hidden div's DOM to insert spacer `<div>`s, then re-measure for page count

4. **Simpler alternative — CSS margin-based approach:**
   - After measuring, set `margin-top` on elements that need to be pushed down
   - This avoids extra wrapper elements

### Implementation Detail

**File: `src/components/resume-builder/ResumePreview.tsx`**

**Step 1:** Add `data-page-item` class to section wrappers (lines 856, 872, 889) and entry divs in `renderSectionEntries`.

**Step 2:** Replace the simple `pageCount` measurement effect (lines 949-967) with an element-aware pagination effect:

```typescript
useEffect(() => {
  const root = hiddenFlowRef.current;
  if (!root) return;

  // Reset any previously injected spacers
  root.querySelectorAll('.page-spacer').forEach(el => el.remove());
  root.querySelectorAll('[data-page-item]').forEach(el => {
    (el as HTMLElement).style.marginTop = '';
  });

  // Double-rAF to ensure layout is settled
  requestAnimationFrame(() => requestAnimationFrame(() => {
    const items = root.querySelectorAll('[data-page-item]');
    const contentTop = marginYPX; // top margin of A4Page
    let addedSpace = 0;

    items.forEach(el => {
      const rect = el.getBoundingClientRect();
      const rootRect = root.getBoundingClientRect();
      const elTop = rect.top - rootRect.top + addedSpace - contentTop;
      const elBottom = elTop + rect.height;

      // Which page does this element start on?
      const pageIndex = Math.floor(elTop / usablePerPage);
      const pageBottom = (pageIndex + 1) * usablePerPage;

      // If element crosses page boundary and fits on one page
      if (elTop < pageBottom && elBottom > pageBottom && rect.height < usablePerPage) {
        const push = pageBottom - elTop;
        (el as HTMLElement).style.marginTop = `${push}px`;
        addedSpace += push;
      }
    });

    // Re-measure total height for page count
    const totalH = root.scrollHeight - 2 * marginYPX;
    const pages = totalH / usablePerPage;
    setPageCount(Math.max(1, pages <= 1.02 ? 1 : Math.ceil(pages)));
  }));
}, [data, customize, dims.hPX, marginYPX, usablePerPage]);
```

**Step 3:** Mark pageable elements with `data-page-item`:
- On each section wrapper in A4Page (lines 856, 872, 889): add `data-page-item`
- On each entry div inside `renderSectionEntries` for patterned types: add `data-page-item`

This ensures entries and sections are never split across pages. Bullets within a single entry may still split if the entry itself is taller than one page (rare), which is acceptable.

### Files Changed
- `src/components/resume-builder/ResumePreview.tsx`

