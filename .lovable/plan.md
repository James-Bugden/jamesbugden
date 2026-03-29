

## Improvement Plan: Make Analytics Tool Product-Ready

### Priority 1: Period-Over-Period Comparison (highest impact)

**What:** Add delta badges to all 5 KPI cards showing "vs previous period" (e.g. if viewing Last 30d, compare against the 30 days before that).

**File:** `src/pages/ThreadsAnalytics.tsx`
- Extend `usePostsAggregates` to fetch both current AND previous period data
- Calculate deltas: `((current - previous) / previous) * 100`
- Show "+12.3%" or "-5.1%" badges on each KPI card in green/red pills
- Add a small "vs prev 30d" label under each delta

### Priority 2: Viral Post Highlight on Overview

**What:** Add a "Top Performer" card on Overview showing the single best post from the selected period with thumbnail, text preview, views count, and a "View on Threads" link.

**File:** `src/pages/ThreadsAnalytics.tsx`
- Find the post with highest views (or engagement) from the current range
- Render a highlighted card between KPI row and strategy section
- Include: thumbnail, first 120 chars, views/likes/engagement, permalink

### Priority 3: Day+Hour Heatmap

**What:** Replace the text-based "Best time" recommendation with an interactive heatmap grid (7 days x 24 hours) showing engagement intensity. Users can visually spot their optimal posting windows.

**File:** `src/components/analytics/ContentAnalysisSections.tsx`
- Build a simple CSS grid (7 columns x ~12 rows for waking hours)
- Color cells from gray (no data) → light blue (low) → dark blue (high engagement)
- Show tooltip on hover with exact avg engagement + post count for that slot
- Place it in Content section, before or after Post Frequency

### Priority 4: Onboarding Empty States

**What:** When data is missing, show guided setup steps instead of blank sections.

**File:** `src/pages/ThreadsAnalytics.tsx`
- Detect: 0 posts? Show "Connect & Sync" wizard card
- Detect: posts but no tags? Show "Run AI Tagging" prompt card  
- Detect: no demographics? Show "Sync Demographics" prompt
- Each card has a single action button that triggers the corresponding Settings action directly

### Priority 5: Custom Date Range Picker

**What:** Add a "Custom" option to the date range dropdown that opens a date picker for start/end dates.

**File:** `src/pages/ThreadsAnalytics.tsx`
- Add "Custom" as a 5th option in the Select dropdown
- When selected, show a popover with two date inputs (from/to)
- Pass custom range through to all data hooks

### Files Changed

1. **`src/pages/ThreadsAnalytics.tsx`** — Add period comparison logic to KPI cards, add viral post highlight card, add onboarding empty states, add custom date range picker
2. **`src/components/analytics/ContentAnalysisSections.tsx`** — Add posting time heatmap component in Content section

