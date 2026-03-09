## Plan: Use Clear Red-to-Green Color Scale for Section Scores

Currently the score colors use brand greens and golds which don't clearly communicate good vs bad. Replace with an intuitive red → orange → yellow → green gradient across both files.

&nbsp;

dont use dark green for excellent, it shold be a brigher green like red is to orangge

### Color Scale (1-10)


| Score | Color      | Hex       | Meaning    |
| ----- | ---------- | --------- | ---------- |
| 1-3   | Red        | `#dc2626` | Critical   |
| 4-5   | Orange     | `#ea580c` | Poor       |
| 6-7   | Amber      | `#d97706` | Needs Work |
| 8-9   | Green      | `#16a34a` | Good       |
| 10    | Dark Green | `#15803d` | Excellent  |


### Files to Change

**1. `src/components/resume-analyzer/ResumeResults.tsx**`

- Update `scoreColor` (line 168): map to the 5-tier scale above
- Update `barColor` (line 169): same 5-tier scale
- Update overall score ring color (line 44): adjust thresholds to use red/orange/amber/green

**2. `src/components/resume-analyzer/ResumeVisualSummary.tsx**`

- Update `bandColor()`, `bandColorStrong()`, `badgeBg()` functions to use 5-tier inline styles instead of 3-tier Tailwind classes
- Update `statusIcon()` and `statusLabel()` to match the 5 tiers
- Update the section health bar color (line 160) to match

All changes are purely color value swaps — no structural changes.