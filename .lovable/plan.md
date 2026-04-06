

# Upgrade Guide Engagement Tracking

## Problem
Guide completion is currently measured by checklist ticks in `guide_progress` — unreliable because most users read without checking boxes. You're missing the two strongest engagement signals: **scroll depth** and **time on page**.

## What already exists
- `useTrackGuideProgress` fires a `guide_view` event to `event_tracks` on mount and tracks scroll % locally — but **never sends scroll depth or time to the database**
- `event_tracks` table already accepts `metadata` (jsonb), so no schema changes needed

## Plan

### Step 1: Enhance `useTrackGuideProgress` to track time + scroll depth server-side

**File: `src/hooks/useReadingProgress.ts`**

On unmount (or `beforeunload`), fire a single `guide_exit` event to `event_tracks` with metadata:
```json
{
  "guide_id": "pivot-guide",
  "scroll_depth_pct": 87,
  "time_on_page_sec": 214
}
```

This uses the existing `trackEvent` → `event_tracks` pipeline. No new tables needed.

- Track elapsed seconds via a simple `Date.now()` diff (start on mount, calc on unmount)
- Use the existing `maxRef` for scroll depth
- Fire on both `beforeunload` and React cleanup to catch tab closes

### Step 2: Update Insights tab guide completion logic

**File: `src/components/admin/InsightsTab.tsx`**

Replace the checklist-based completion calculation with a multi-signal approach using `event_tracks` data:

- **Scroll-based completion**: Guide is "completed" if any `guide_exit` event has `scroll_depth_pct >= 75`
- **Time-based engagement**: Show average time on page per guide
- **Visit frequency**: Count `guide_view` events per guide (already available)

New chart columns:
| Guide | Visits | Avg Time | Scroll ≥75% | Completion Rate |
|-------|--------|----------|-------------|-----------------|

### Step 3: Additional product metrics to add (as a PM)

These are high-value metrics you're currently missing:

1. **Drop-off points** — From `guide_exit` scroll depth, show a histogram of where users stop reading (25%, 50%, 75%, 100% buckets). Identifies which guides lose readers mid-way.

2. **Return visits** — Users who view the same guide 2+ times (from `guide_view` events). High return = reference material; low return + low scroll = content issue.

3. **Guide → Action conversion** — After reading a guide, did the user take action within 24h? (e.g., guide_view for "resume-guide" → resume_analyses or user_documents created). This is your most valuable content metric.

4. **Bounce rate per guide** — `guide_exit` with `time_on_page_sec < 15` AND `scroll_depth_pct < 10`. These users landed and immediately left.

5. **Reading speed** — `time_on_page_sec / estimated_word_count` helps identify if content is too dense or too light.

All of these derive from the same `guide_exit` event + cross-referencing existing tables — no new infrastructure.

## Files changed
- `src/hooks/useReadingProgress.ts` — add time tracking + fire `guide_exit` event with scroll depth + time
- `src/components/admin/InsightsTab.tsx` — replace checklist completion with scroll/time-based metrics, add drop-off histogram, bounce rate, guide→action conversion

## No database changes needed
Everything uses the existing `event_tracks` table and its `metadata` jsonb column.

