

## Issues to Fix

### 1. "Group Promotions" Checkbox — Not Wired
The checkbox at `CustomizePanel.tsx:932` is hardcoded: `checked={false} onChange={() => {}}`. It needs a new `groupPromotions` field in `CustomizeSettings` and rendering logic in the preview that groups consecutive experience entries sharing the same `company` under a single company heading with a shared date range.

### 2. Page Break — No Minimum Header/Footer Padding
Currently, the page system slices the A4Page at exact `dims.hPX` boundaries with `translateY`. Content can land right at the top or bottom edge of a page. There's no enforced minimum "safe zone" (padding) at the top/bottom of each page slice, so text gets clipped or runs too close to the edge.

---

## Plan

### Fix 1: Group Promotions Feature

**`customizeTypes.ts`** — Add `groupPromotions: boolean` (default `false`).

**`CustomizePanel.tsx`** — Wire the checkbox to read/write `settings.groupPromotions`.

**`ResumePreview.tsx`** — In `renderSectionEntries` for `experience` type, when `groupPromotions` is true:
- Group consecutive entries with the same `company` value.
- Render a single company heading with the overall date range (earliest start → latest end).
- Render each role within the group indented, showing only the role title, its specific dates, and description.
- Single-entry groups render normally.

### Fix 2: Page Break Safe Zones

**`ResumePreview.tsx`** — Add top/bottom padding to each page slice:
- Define a `PAGE_PADDING_PX` constant (~8mm ≈ 30px) for the safe zone.
- In the measurement logic, reduce the usable height per page from `dims.hPX` to `dims.hPX - 2 * PAGE_PADDING_PX`.
- In each page's visible viewport div, add `paddingTop` (for pages > 0) via `clipPath` or by adjusting the `translateY` offset so content doesn't start at pixel 0 of a new page.
- Alternative simpler approach: apply `padding-top` and `padding-bottom` directly inside the A4Page component via the margin-y CSS variable — but since margin-y is already user-controlled, instead add a minimum enforced inner padding of ~6mm that the content can't escape, by wrapping the content area in a div with `min-padding` that's always at least 10mm even if the user sets margin-y lower.

Actually, the real fix is simpler: the page break calculation should account for the existing margin. The `A4Page` already has `padding: var(--resume-margin-y) var(--resume-margin-x)` which creates top/bottom margins. The issue is that the page-slice viewport (`translateY(-i * dims.hPX)`) clips at the full page height, which is correct — content within the padded A4Page should naturally stay within margins. The real problem is that content overflows beyond the first page's padded area, and the second page slice shows it starting at the very top of the page (at `translateY(-dims.hPX)`), which has no padding because it's just a shifted view of the same continuous div.

The proper fix: instead of rendering each page as a shifted view of the same `A4Page`, enforce that each page's content starts after a top margin and ends before a bottom margin. This means:
- Calculate usable content height per page = `dims.hPX - (marginY * 2 * PX_PER_MM)`
- Use this usable height for page count calculation
- For page i > 0, offset the translateY to skip the margin area, effectively creating a fresh margin on each page

### Files to Edit
- `src/components/resume-builder/customizeTypes.ts` — add `groupPromotions` field
- `src/components/resume-builder/CustomizePanel.tsx` — wire checkbox
- `src/components/resume-builder/ResumePreview.tsx` — group promotions rendering + page break margin fix

