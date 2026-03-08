

## Fix: Reduce whitespace by allowing content to split across pages

### Problem
The current pagination algorithm pushes entire entries to the next page when they straddle a page boundary. For long entries (like multi-bullet experience items), this creates large empty gaps at the bottom of pages — as shown in the screenshot.

### Root cause
In `ResumePreview.tsx` lines 1095-1119, the pagination logic has a threshold of `0.6 * usablePerPage` (~60% of page height). Any entry smaller than that gets pushed entirely to the next page. For entries larger than 60%, it does child-level splitting but still pushes individual `<li>` elements forward.

### Solution
Reduce the threshold so only very small items (section headings, single-line entries) get pushed whole. Let larger entries split naturally across page boundaries, with only individual bullet points (`<li>`, `<p>`) being pushed when they straddle a boundary.

**File: `src/components/resume-builder/ResumePreview.tsx`**

1. **Lower the whole-entry push threshold** from `0.6` to `0.25` — only push entries shorter than ~25% of the page. Longer entries will flow across pages naturally via the child-level splitting logic.

2. **Tighten the child-block push threshold** from `0.5` to `0.3` — only push individual bullets/paragraphs if they're less than 30% of the page, preventing excessive spacer injection for large paragraphs.

3. **Add section-heading orphan protection** — if a section heading (`<h2>`) is the last thing on a page with no content below it, push it to the next page. This avoids orphaned headings without wasting space on full entries.

### Changes summary
- One file edited: `src/components/resume-builder/ResumePreview.tsx`
- Two numeric threshold changes in the pagination convergence loop (~lines 1096 and 1111)
- No structural or API changes

