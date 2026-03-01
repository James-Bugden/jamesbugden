

## Dashboard Improvements

Three changes to `/dashboard` (skipping the Calendly link update for now):

### 1. Dismissible "What's New" banner
- Add an X button to the banner (lines 460-472)
- Store dismissed state in localStorage with key like `dashboard_banner_dismissed_v1`
- When dismissed, hide the banner entirely
- Using a versioned key so you can show new banners in the future by bumping the version

### 2. Show greeting on mobile
- Currently `{t.hey} {firstName}` in the nav uses `hidden sm:inline` (line 431), making it invisible on mobile
- Remove the `hidden sm:inline` class so the name shows on all screen sizes
- Also add progress context (last resume score, active job count) to the "Pick Up Where You Left Off" cards

### 3. Smart "Start Here" next-step recommendation
- Add logic that checks what the user has already used (via `recentItems`) and recommends the logical next step
- If no tools used yet: recommend Resume Analyzer ("Start with your resume")
- If resume analyzed but no jobs tracked: recommend Job Tracker
- If jobs tracked but no negotiation tools: recommend Salary Starter Kit
- Display this as a highlighted card above the "Pick Up Where You Left Off" section when the user has some history but hasn't completed the natural flow
- Bilingual labels for both en/zh

### Technical details

**File: `src/pages/Dashboard.tsx`**

- Add `useLocalStorage` import and banner dismissed state
- Add `X` icon import from lucide-react
- Wrap the banner in a conditional render based on dismissed state
- Add close button to the banner
- Remove `hidden sm:inline` from the greeting span
- Add a `getNextStep()` helper function that returns a recommended item based on recent usage
- Add progress badge text to recent cards (resume score, active jobs)
- Render the "Start Here" recommendation card in the search/recent section

All changes are in a single file. Both English and Chinese versions will work since Dashboard already accepts `lang` prop.
