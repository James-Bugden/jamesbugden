

## Show Follower Growth Chart Even When Flat

### Problem
The backfilled data has the same follower count (12,465) for every date. The current code checks `hasRealChanges = deltas.some(d => d.delta !== 0)` and hides the chart entirely when all deltas are zero, showing only a static number. But a flat line is still valid data — it shows stability.

### Solution
Show the chart whenever there are 2+ data points, regardless of whether deltas are zero. Only show the empty state when there's truly no data (0-1 rows).

### Changes

**File: `src/pages/ThreadsAnalytics.tsx`**

1. In the Follower Growth chart section (~line 753-805):
   - Remove the `hasRealChanges` gate — always render the chart if `followerHistory.data` has 2+ points
   - Use `followerHistory.data` (which has all dates + follower counts) as the primary data source instead of `realDeltas`
   - Keep the daily change bars but show them even when zero (they'll just be tiny/invisible)
   - Update the subtitle text: when all deltas are 0, show "Stable at X followers" instead of "Tracking started"

2. In the subtitle text (~line 740-749):
   - Change the `hasRealChanges` condition: if deltas exist but are all zero, say "Stable — no change in this period" instead of "Tracking started"

