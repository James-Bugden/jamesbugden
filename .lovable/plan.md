

## Track Guide Visit Frequency

### Problem
Currently, guide progress (scroll %) is tracked only in localStorage. There's no server-side record of how often each guide is visited, so you can't combine visit frequency with thumbs up/down ratings to identify truly valuable content.

### Solution
Add a `trackEvent("guide_view", guideId)` call inside `useTrackGuideProgress` so every guide page load logs to the `event_tracks` table. This requires zero new tables — it reuses the existing event tracking infrastructure.

Then surface a "Most Visited Guides" section in the Admin Dashboard's Analytics tab, showing visit counts per guide alongside their thumbs up/down ratio from the `feedback` table.

### Implementation

**1. `src/hooks/useReadingProgress.ts`** — Add `trackEvent` call in `useTrackGuideProgress`
- Import `trackEvent` from `@/lib/trackEvent`
- Fire `trackEvent("guide_view", guideId)` once on mount (inside the existing `useEffect`, before the scroll listener)
- This automatically logs guide ID, page URL, and timestamp

**2. `src/pages/AdminDashboard.tsx`** — Add "Guide Engagement" card to Analytics tab
- Query `event_tracks` where `event_type = 'guide_view'`, group by `event_name`, count visits
- Query `feedback` where `type = 'inline_rating'`, group by `context`, compute thumbs-up ratio
- Join the two datasets client-side by mapping guide IDs
- Display a table: Guide Name | Visits | 👍 | 👎 | Approval % — sorted by visits descending
- This gives the combined view: high-visit + high-approval = most valuable guides

### Why this works
- No new database tables or migrations needed
- Reuses `event_tracks` (already has public insert + admin select RLS)
- Reuses `feedback` table for ratings
- One-line addition to the shared hook means all 36 guide pages are instrumented automatically

### Files changed
1. `src/hooks/useReadingProgress.ts` — add trackEvent call
2. `src/pages/AdminDashboard.tsx` — add Guide Engagement analytics card

