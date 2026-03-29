

## UX/UI Review: Threads Analytics Dashboard

### Current Issues

**Information Architecture**
- The page is ~20 sections long with no visual grouping or navigation. Users must scroll extensively to find what matters.
- The most actionable section ("What to Post Next" strategy recommendations) is buried in the middle, below 4 charts.
- 5 consecutive tag breakdown charts (Topic, Format, Tone, CTA, Audience) create visual fatigue — they all look identical.
- Sync controls are hidden at the very bottom; if data is missing, users won't find them.
- No follower growth chart despite the user requesting one.

**Visual Hierarchy**
- Metric cards use horizontal scroll which hides cards off-screen — especially "Virality" and "Conversation" labels are too long for the card width.
- Sparklines at 60×20px are too small to convey any trend.
- No section headings or dividers between logical groups (Overview → Content Strategy → Post Details → Timing → Demographics).
- Chart heights vary arbitrarily (300px, 280px, 250px, 220px) with no visual rhythm.

**Redundancy**
- "Engagement Quality Breakdown (Top 30)" still exists in code but was supposedly removed — it's redundant with Top Posts.
- Cumulative Engagement Growth (area chart) is a vanity metric that doesn't drive decisions.
- Image Content Performance overlaps heavily with Media Type + Tag Breakdown charts.
- Reach Ratio section is broken when no follower data exists (shows empty state).

### Recommended Priority Order for Charts/Sections

```text
TIER 1 — Keep prominent, move up
─────────────────────────────────
1. KPI Cards (compact, 2 rows on mobile)
2. "What to Post Next" (strategy recommendations) ← MOVE TO TOP
3. Engagement Trend (line chart)
4. Follower Growth (NEW — area chart from threads_user_insights)
5. Top Performing Posts (with filters)

TIER 2 — Keep but consolidate
─────────────────────────────────
6. Content Performance by Media Type
7. Post Frequency Analysis
8. Performance by Day of Week
9. Tag Insights (consolidate 5 charts into 1 tabbed card)

TIER 3 — Collapse/move to bottom
─────────────────────────────────
10. Post Length Analysis
11. Hashtag Performance
12. Full Post Table + CSV Export
13. Link Clicks
14. Demographics

REMOVE
─────────────────────────────────
- Cumulative Engagement Growth (vanity, not actionable)
- Engagement Quality Breakdown (redundant with Top Posts)
- Reach Ratio (broken without reliable follower data)
- Image Content Performance (redundant)
```

### Proposed Changes

#### 1. Reorder page layout
Move "What to Post Next" directly below the KPI cards and date range selector — it's the most valuable section. Then Engagement Trend, then Follower Growth chart, then everything else.

#### 2. Add section group headings
Insert visual dividers with labels: "Overview", "Content Strategy", "Post Explorer", "Timing & Audience", "Data Management" to break the page into scannable groups.

#### 3. Consolidate tag breakdown charts
Replace the 5 separate `TagBreakdownChart` instances with a single card containing tabs (Topic / Format / Tone / CTA / Audience). Saves 4 full-height chart sections.

#### 4. Add Follower Growth chart
New area chart pulling from `threads_user_insights` (follower_count by metric_date). Shows empty state with prompt to backfill if no data.

#### 5. Remove low-value sections
Remove: Cumulative Engagement Growth, Engagement Breakdown, Reach Ratio, Image Content Performance. These are either broken, redundant, or not actionable.

#### 6. Move sync controls to sticky footer or collapsible panel
Currently buried at bottom. Move to a collapsible "Data Management" bar that's always accessible.

#### 7. Fix metric cards layout
Use a responsive grid (2 cols mobile, 4 cols tablet, 5 cols desktop) instead of horizontal scroll. Shorten labels ("Avg Eng" not "Virality (reposts+quotes/views)"). Remove tiny sparklines — they're too small to read.

### Files Changed
1. **`src/pages/ThreadsAnalytics.tsx`** — reorder sections, add group headings, fix metric cards grid, add follower growth chart, remove cumulative chart, move sync bar
2. **`src/components/analytics/ContentAnalysisSections.tsx`** — remove EngagementBreakdown/ReachRatio/ImageContent, consolidate tag charts into tabbed card, move ContentStrategy to be a standalone export
3. **`src/components/analytics/PostDetailSections.tsx`** — no major changes
4. **`src/components/analytics/TimingSections.tsx`** — no major changes
5. **`src/components/analytics/LinksDemographicsSections.tsx`** — no major changes

