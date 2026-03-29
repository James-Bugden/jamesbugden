

## Fix Threads Analytics Dashboard — Missing Data & Edge Function Timeout

### Root Cause Analysis

After inspecting the database:
- **threads_posts**: 195 rows ✅ (posts are syncing)
- **threads_user_insights**: 0 rows ❌ (engagement trend & follower charts empty)
- **threads_demographics**: 0 rows ❌ (demographics section hidden)
- **threads_link_clicks**: 0 rows ❌ (link clicks section hidden)
- **image_analyzed_at**: 0 of 195 posts analyzed ❌ (image tags/descriptions missing)

The edge function fetches 284 posts and tries to call `fetchPostInsights()` for each one sequentially with 200ms delays — that alone takes ~57 seconds. The function **times out at 60s** before reaching the user insights, demographics, link clicks, or image analysis steps.

### Fix Strategy

#### 1. Optimize the edge function to not timeout

Split the work into phases and batch efficiently:

- **Skip re-fetching insights for posts already in DB** — only fetch insights for new/recently posted items (e.g., posts from the last 7 days or posts with 0 views)
- **Batch the insight fetches** with `Promise.allSettled` (5 concurrent) instead of sequential
- **Move image analysis to a separate action** (`action: "analyze-images"`) so it doesn't block the main sync
- **Increase parallelism** for post upserts

#### 2. Fix the daily insights sync

The current code fetches yesterday's insights only. The problem is it may have never successfully reached this code due to timeout. After the optimization above, it should work. Also add better logging to confirm completion.

#### 3. Fix the backfill action

The backfill loops through 30-day chunks from April 2024 — this is also too much for one function call. Fix by:
- Having each backfill call process ONE chunk (30 days) and return the next chunk start date
- The frontend can call it repeatedly or we process in a single run with tighter time management

#### 4. Force demographics sync

Demographics currently only runs on Mondays. Add a `action: "demographics"` option to trigger it manually, and call it from the dashboard.

#### 5. Add a "Sync Images" button

Since image analysis is slow (500ms per image × 195 images = 97 seconds), make it a separate action with its own button that processes in batches of 10.

### Files Changed

1. **`supabase/functions/threads-sync/index.ts`** — Optimize: skip already-synced posts, batch concurrent API calls, separate image analysis action, demographics action, chunked backfill
2. **`src/pages/ThreadsAnalytics.tsx`** — Add "Analyze Images" and "Sync Demographics" buttons to the sync status bar; show progress indicators
3. **`src/components/analytics/LinksDemographicsSections.tsx`** — Add empty state with "Sync Demographics" CTA instead of hiding when no data

### Technical Details

```text
Current flow (broken):
  sync → fetch 284 posts → fetch insights ×284 (TIMEOUT) → never reaches insights/demographics/images

Fixed flow:
  sync       → fetch posts → upsert → fetch insights for NEW posts only (batch 5) → daily insights → link clicks
  backfill   → process 30-day chunk → upsert daily insights + follower count  
  analyze    → process 10 unanalyzed images → return count remaining
  demographics → fetch all 4 breakdown types → upsert
```

Key optimization: On subsequent syncs, only fetch individual post insights for posts created in the last 7 days OR posts where views = 0 (never fetched). This reduces API calls from 284 to ~20-30.

