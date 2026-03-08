
Goal: Fix the Resume Builder preview pagination bug where page N+1 repeats/overlaps content from page N around the cut line/footer zone.

What I found
1. The issue is in preview only (confirmed), not necessarily download export.
2. `ResumePreview.tsx` currently slices pages by shifting each page by `usablePerPage`, but each page still shows a full page-height viewport (`dims.hPX`), which creates a built-in overlap band between pages.
3. Previous fixes likely focused on spacer thresholds, but the core bug is architectural:
   - break calculations happen in hidden flow
   - visible pages are rendered with a different viewport model
   - so boundary math and rendered slices can diverge

Why previous fixes kept failing
- Tweaking `push` logic / tolerances cannot fully solve this because the visible renderer is not clipping to the same “usable content window” used by the paginator.

Implementation plan

1) Refactor preview page slicing to a strict usable-window viewport  
File: `src/components/resume-builder/ResumePreview.tsx`
- Keep page container at full page size.
- Inside each page, add a dedicated content viewport:
  - `top = marginYPX + headerReservePX`
  - `height = usablePerPage`
  - `overflow: hidden`
- Render `A4Page` inside that viewport with:
  - `translateY(-(marginYPX + headerReservePX + i * usablePerPage))`
- Keep footer absolutely positioned in reserved bottom area.
Result: each page shows only one non-overlapping content slice.

2) Align visual and measurement models
File: `src/components/resume-builder/ResumePreview.tsx`
- Reuse the exact same offsets/constants already used in measurement (`marginY/header/footer reserves`) for page viewport positioning.
- Ensure page count logic still measures hidden flow but visual slicing now matches the same coordinate system.

3) Stabilize boundary behavior for near-edge elements
File: `src/components/resume-builder/ResumePreview.tsx`
- Keep current “push to next page” logic for straddling items.
- Add a small consistent epsilon constant (instead of inline magic numbers) so boundary checks are deterministic and easier to tune.

Technical details (for implementation)
- Current overlap comes from rendering `dims.hPX` while shifting by `usablePerPage` (`dims.hPX - reserved`), which inherently overlaps by reserved height.
- New model renders only `usablePerPage` content area per page; top/bottom reserved areas remain blank/safe zones for print-like behavior and footer.
- No backend/db changes needed; frontend-only fix.

Validation plan
1. Import the problematic resume and verify no repeated lines at page boundaries.
2. Check page footer remains visible and does not collide with body text.
3. Test with:
   - A4 and Letter
   - one-page and multi-page resumes
   - zoom in/out
   - two-column and one-column layouts
4. Confirm PDF export still matches preview page breaks closely.
