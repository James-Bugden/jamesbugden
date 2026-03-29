

## Add Follower Growth Per Post & "Best For" Insights

### Problem
You can't currently see how many followers you gain per post or over time periods, and there's no way to know which post types are best for **views** vs **engagement** vs **follower growth** — three different goals that may favor different content.

### Data Reality Check
The Threads API does **not** provide per-post follower gain data. The `threads_user_insights` table tracks daily `follower_count` snapshots. We can **estimate** followers gained per period by comparing consecutive snapshots, then correlate with posts published in that period.

### Solution

#### 1. Add "Followers Gained" KPI card + chart overlay
- Compute daily follower deltas from `threads_user_insights` (today's count minus yesterday's)
- Show a new KPI card: **"Followers This Period"** showing net gain for the selected date range
- On the Follower Growth chart, add a secondary bar series showing daily follower change (+/-)

#### 2. Add "Followers Gained per Post" estimate
- For each week/month, calculate: `followers gained ÷ posts published = estimated followers per post`
- Show this as a simple line on the Post Frequency chart or as a standalone small card
- Caveat text: "Estimated — based on follower snapshots and post timing"

#### 3. Add "Best For" comparison table in ContentStrategySection
A new section showing each content type (Carousel, Image, Text, Video) ranked by three goals:

```text
Format      | Best For Views | Best For Engagement | Best For Growth*
Carousel    | #2 (19.8K)     | #1 (2.28%)          | #1 (+12/post)
Video       | #3 (15K)       | #2 (2.63%)          | #2 (+8/post)
Image       | #1 (22K)       | #3 (1.46%)          | #3 (+5/post)
Text        | #4 (12K)       | #4 (1.62%)          | #4 (+3/post)
```

*Growth estimated from weekly follower deltas correlated with post types published that week.

Same breakdown for content_topic tags if available (career advice, personal story, etc.)

#### 4. Strategy recommendations updated
The "What to Post Next" section will include growth-oriented recommendations like:
- "Carousels drive the most follower growth — about 12 new followers per carousel post"
- "Your engagement is highest on Videos, but Carousels bring the most new followers"

### Files Changed

1. **`src/components/analytics/analyticsShared.ts`**
   - Add `useFollowerDeltas()` hook: fetches `threads_user_insights`, computes daily/weekly deltas
   - Export follower delta data for reuse

2. **`src/pages/ThreadsAnalytics.tsx`**
   - Add "Followers Gained" KPI card using follower deltas for selected range
   - Add daily change bars to the Follower Growth chart (green positive, red negative)

3. **`src/components/analytics/ContentAnalysisSections.tsx`**
   - Add "Best For" comparison table in ContentStrategySection showing views vs engagement vs growth rankings by format and topic
   - Update strategy recommendations to include follower growth insights
   - Add caveat noting growth estimates are approximate

