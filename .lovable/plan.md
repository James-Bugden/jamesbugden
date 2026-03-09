

## Plan: Prioritize Full Guides Over Mini Guides on Dashboard

### Problem
Currently, full guides and mini guides are listed sequentially at the same visual weight. Mini guides (Pivot Mini, Resume Quick Reference) sit right next to their full counterparts, making it unclear which to read first.

### Approach: Pair Full + Mini with Visual Hierarchy

For each topic that has both a full and mini version, show the **full guide as the primary card** and nest a subtle "Quick version" link inside or below it. This keeps mini guides accessible without competing for attention.

**Specifically:**
1. Add a `miniOf?: string` field to the `Guide` interface pointing to the parent guide's `id`
2. Mark `pivot-mini` as `miniOf: "pivot-guide"` and `resume-ref` as `miniOf: "resume-guide"`
3. Filter mini guides out of the main grid rendering
4. In `GuideCard`, if a guide has linked minis, render a small secondary link below the description — e.g. "⚡ 8-min version" / "⚡ 精華版" — that links to the mini guide's path
5. The mini link uses `e.stopPropagation()` so clicking it navigates to the mini, while clicking the card goes to the full guide

### Visual Result
Each card with a mini version gets a subtle inline link:

```text
┌──────────────────────────────┐
│ GETTING STARTED              │
│ Pivot Method Guide           │
│ Complete 5-stage framework…  │
│                              │
│ ⚡ 8-min quick version       │
│ ▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃▃ 0%      │
└──────────────────────────────┘
```

This removes 2 cards from the grid (less clutter), prioritizes full guides, and keeps minis one click away.

### Files Changed
- **`src/pages/Dashboard.tsx`** only:
  - `Guide` interface: add `miniOf?: string`
  - Guides array: add `miniOf` to `pivot-mini` and `resume-ref`
  - Rendering: filter out guides where `miniOf` is set from the main grid
  - `GuideCard`: look up any mini guide linked to the current guide, render a small secondary link

