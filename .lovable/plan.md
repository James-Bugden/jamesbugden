

## Add Follower Growth Chart

### Problem
The `threads_user_insights` table stores daily `follower_count` snapshots but currently only a metric card shows the current count. There's no chart visualizing follower growth over time.

### Solution
Add a **Follower Growth line chart** (Section 4, replacing the current "Cumulative Engagement Growth" chart which is a proxy). The chart plots `follower_count` from `threads_user_insights` over time. If the table has data (populated via daily sync/backfill), it shows the trend. If empty, show a message prompting to run backfill.

Keep the Cumulative Engagement Growth chart below it as a secondary chart.

### Changes

**`src/pages/ThreadsAnalytics.tsx`**
1. Add a new `useFollowerHistory()` hook that fetches all rows from `threads_user_insights` ordered by `metric_date`, returning `{ date, followers }[]`
2. Insert a new **Follower Growth** chart card between the Engagement Trend chart (Section 3) and the Cumulative Engagement Growth chart
3. Chart: `AreaChart` with green gradient, X = date, Y = follower count
4. If no data, show a styled empty state: "No follower history yet. Click Backfill to start tracking."

