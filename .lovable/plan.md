

## Reorganize Dashboard Guide Categories

Currently the dashboard groups guides into 3 sections: **Getting Started**, **Applying**, **Negotiating**. The user wants 4 sections: **End to End Guides**, **Applying**, **Interviewing**, **Negotiating**.

### Changes

**1. Update the `GuideTag` type** (`JourneySection.tsx`)
- Change from `"getting-started" | "applying" | "negotiating" | "leveling-up"` to `"end-to-end" | "applying" | "interviewing" | "negotiating"`

**2. Update `JOURNEY_META`** (`Dashboard.tsx`)
- Rename "Getting Started" → "End to End Guides" / "完整指南" with tag `"end-to-end"`
- Add new "Interviewing" / "面試準備" section with tag `"interviewing"` (emoji: 🎤, color: purple/teal)
- Keep "Applying" and "Negotiating"

**3. Re-tag journey items** (`Dashboard.tsx`)
- **End to End Guides** (`end-to-end`): AI Job Search Guide, Pivot Method Guide (+ mini), LinkedIn guides — these are comprehensive cross-stage guides
- **Applying** (`applying`): Resume Guide (+ quick ref)
- **Interviewing** (`interviewing`): Interview Preparation Guide (+ prep mini), Recruiter Screen Guide
- **Negotiating** (`negotiating`): unchanged

**4. Update `DashboardZhTw.tsx`** with matching changes (same tag reassignments and meta).

**5. Update localStorage key** for collapsed state — the old `journey_collapsed_getting-started` key becomes `journey_collapsed_end-to-end` (happens automatically via the tag change).

### Files Modified
- `src/components/dashboard/JourneySection.tsx` — update `GuideTag` type
- `src/pages/Dashboard.tsx` — update `JOURNEY_META` and item tags
- `src/pages/DashboardZhTw.tsx` — same changes for ZH version

