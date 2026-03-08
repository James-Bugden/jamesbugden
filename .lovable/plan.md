

## Fix Skills/Languages Layout Options

### Problems identified

1. **Grid layout ignores Separator setting** — always renders bullet dots regardless of separator choice
2. **Compact layout ignores `newline` separator** — defaults to bullet when newline is selected
3. **Subtitle Style has no effect** — `section.subtitleStyle` is never read in the preview renderer for skills/languages. Skills entries can have category groupings (e.g. "Programming: Python, Java") and the subtitle style should control that separator character
4. **Level layout to be removed** — per user request, remove `level` from layout options entirely
5. **Languages section** likely has the same issues (same `LAYOUT_OPTIONS` used)

### Plan

**File: `src/components/resume-builder/types.ts`**
- Remove `"level"` from `SectionLayout` type
- Remove `LevelIndicator` type (no longer needed)
- Remove `levelIndicator` from `ResumeSection` interface

**File: `src/components/resume-builder/SectionCard.tsx`**
- Remove `level` from `LAYOUT_OPTIONS` array
- Remove `LEVEL_INDICATOR_OPTIONS` constant
- Remove the conditional `PillSwitcher` for level indicator in both skills and languages cases
- Show Separator for all layouts except bubble (grid + compact + newline all need it)

**File: `src/components/resume-builder/ResumePreview.tsx`**
- **Grid layout**: Apply separator setting — use selected separator (bullet/pipe/comma/newline) between items in 2-column grid instead of hardcoded bullet dots
- **Compact layout**: Handle `newline` separator — render as stacked list instead of inline text
- **Remove `level` layout** rendering block entirely
- **Subtitle Style**: For skills entries that contain a colon (e.g. "Category: skill1, skill2"), render the category prefix using the selected subtitle style:
  - `dash`: "Category — skill1, skill2"  
  - `colon`: "Category: skill1, skill2"
  - `bracket`: "Category (skill1, skill2)"
- Apply same fixes for languages section

### Files to edit
- `src/components/resume-builder/types.ts`
- `src/components/resume-builder/SectionCard.tsx`
- `src/components/resume-builder/ResumePreview.tsx`

