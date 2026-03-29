

## Add Mini Sparkline Charts to KPI Cards

### What
Each of the 5 KPI cards gets a small inline sparkline (SVG area chart, ~40px tall) showing the metric's daily trend. This gives instant visual context — is this number trending up, down, or flat?

### Data Source
`postTrend.data` (from `usePostDerivedTrend`) already provides daily breakdowns with `views`, `likes`, `replies`, `reposts`, `shares`, `engagementRate`, and `posts` count. `followerDeltas.data?.deltas` provides daily follower changes. All data is already fetched.

### Changes

**`src/pages/ThreadsAnalytics.tsx`**

1. **Add a `MiniSparkline` component** (~30 lines) that takes `data: number[]` and `color: string`, renders a pure SVG `<polyline>` + gradient `<linearGradient>` fill beneath. Fixed height 40px, full width of card. No axes, no labels — just the shape.

2. **Update `KpiCard`** to accept an optional `sparkData?: number[]` prop. Render `<MiniSparkline>` at the bottom of the card when data exists.

3. **Pass sparkline data to each KPI card:**
   - Total Posts → `trendData.map(d => d.posts)`
   - Total Views → `trendData.map(d => d.views)`
   - Engagement → `trendData.map(d => d.engagementRate)`
   - Avg Views/Post → `trendData.map(d => d.views / Math.max(d.posts, 1))`
   - Followers Gained → `followerDeltas.data?.deltas.map(d => d.delta) || []`

Each sparkline uses the same `iconColor` as its card's icon for visual consistency.

