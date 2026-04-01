

# Fix: "View Report" Link on Dashboard

## Problem
The "View Report" link in the Resume Score card navigates to `/resume-analyzer`, which always shows the upload screen. There's no mechanism to load a previously saved analysis from the database.

## Solution
Add a `?report=latest` query parameter support to `ResumeAnalyzer.tsx` so the dashboard link can deep-link to a saved report.

### Step 1: Update `PickUpWhereYouLeftOff.tsx`
Change the "View Report" link from `/resume-analyzer` to `/resume-analyzer?report=latest` (and `/zh-tw/resume-analyzer?report=latest` for Chinese).

### Step 2: Update `ResumeAnalyzer.tsx`
Add a `useEffect` that checks for `?report=latest` on mount. If present and user is logged in:
- Fetch the latest analysis from the `resume_analyses` table (using the existing `useResumeAnalyses` hook's `latest` value)
- Set `analysisResult` from `latest.analysis_result` and `setScreen("results")`
- This reuses the existing `useResumeAnalyses` hook — no new data fetching needed

### Files Changed
- `src/components/dashboard/PickUpWhereYouLeftOff.tsx` — update link href
- `src/pages/ResumeAnalyzer.tsx` — add query param handling to load saved analysis

