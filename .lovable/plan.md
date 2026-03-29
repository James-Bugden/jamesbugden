

## Fix Analytics Dashboard Issues

### Problems Identified

1. **Reach Ratio Analysis** — depends on `threads_user_insights` (0 rows) for follower counts. Without follower data, all reach ratios are meaningless (dividing by 0 or 1). **Fix**: Remove dependency on insights table; use the current follower count from the API instead.

2. **Audience Demographics** — `threads_demographics` table has 0 rows. The section shows "No demographics data yet" but user may not notice the instruction. **Fix**: Make the empty state more prominent and auto-trigger demographics sync if empty.

3. **Follower Growth** — depends on `threads_user_insights` (0 rows). Historical follower data simply doesn't exist and can't be backfilled. **Fix**: Remove this metric card or show only current count (already shown). The "30d growth" calculation will always be wrong without history.

4. **Engagement Quality Breakdown (Top 30)** — stacked bar chart with #1-#30 labels is hard to read. **Fix**: Replace with a simpler horizontal bar chart showing total interactions per post with a text preview, or remove entirely since Top Posts section already covers this.

5. **"0 posts" on Post Length chart** — `text_length` is likely null for many posts (not populated). **Fix**: Skip posts with null `text_length` from the calculation.

6. **Unclear percentages on Post Length & Media Type** — the `%` values are average engagement rates but this isn't labeled. **Fix**: Add clear labels like "Avg Engagement Rate" and explanatory subtext.

### Changes

#### 1. `src/components/analytics/ContentAnalysisSections.tsx`

- **PostLengthSection**: Filter out posts where `text_length` is null/0. Add chart title clarification "Avg Engagement Rate by Post Length". Add post count inline.
- **MediaTypeSection**: Add label "Avg Engagement Rate" under the percentage. Make the metric name explicit.
- **EngagementBreakdownSection**: Remove entirely — redundant with Top Posts section.
- **ReachRatioSection**: Instead of using `threads_user_insights` for follower count, use a single current follower count (from `useFollowerGrowth` in the main page, or fetch latest from `threads_user_insights`). If no follower data exists at all, hide the section with a message.

#### 2. `src/pages/ThreadsAnalytics.tsx`

- **Follower Growth metric card**: Only show if we have actual historical data. Show current count always, but remove the "30d growth" sub-metric when there's no historical baseline (diff would be 0).
- Pass current follower count down or make it available to ReachRatio.

#### 3. `src/components/analytics/LinksDemographicsSections.tsx`

- **DemographicsSection**: Make empty state more visible — larger card, suggest clicking the Demographics button with an arrow/highlight.

### Files
1. **Edit**: `src/components/analytics/ContentAnalysisSections.tsx` — fix PostLength null filter, clarify % labels, remove EngagementBreakdown, fix ReachRatio fallback
2. **Edit**: `src/pages/ThreadsAnalytics.tsx` — fix follower growth display when no history
3. **Edit**: `src/components/analytics/LinksDemographicsSections.tsx` — improve demographics empty state

