

## Plan: Post-Action Micro-Surveys + Inline Ratings + NPS Pulse + Visible FeedbackBox

### Answer to your question
No — each micro-survey uses `localStorage` to remember that the user already responded for that specific action (e.g., `feedback_survey_resume_analysis`). Once dismissed or submitted, it won't show again. The NPS pulse similarly tracks a `lastNpsShown` timestamp and only re-triggers after 90 days.

---

### What we're building

**4 feedback mechanisms**, all storing responses in the existing `feedback` table with a new `type` column to distinguish them.

### Database change
- Add `type` column to `feedback` table (nullable text, default `'general'`). Values: `general`, `micro_survey`, `inline_rating`, `nps`.
- Add `rating` column (nullable integer) for thumbs/NPS score storage.
- Add `context` column (nullable text) for storing which action/tool triggered it.

### 1. Post-action micro-surveys (`MicroSurvey` component)
- Small toast-like popup with thumbs up/down + optional one-line text input
- Triggered after: resume analysis completion, PDF export, cover letter download
- localStorage key per action type prevents repeat prompts (e.g., `micro_survey_resume_analysis_done`)
- Saves to `feedback` with `type = 'micro_survey'`, `rating` (1 or -1), `context` (action name)

**Integration points:**
- `ResumeAnalyzer.tsx` — after analysis completes (~line 273, after `setScreen("results")`)
- `ResumeBuilder.tsx` — after PDF download succeeds (~line 676)
- `CoverLetterBuilder.tsx` — after PDF download succeeds (~line 53)

### 2. Inline AI output ratings (`InlineRating` component)
- Thumbs up/down buttons below AI-generated content
- localStorage tracks per-content-id to prevent duplicate ratings
- Saves to `feedback` with `type = 'inline_rating'`, `context` (e.g., `resume_analysis_result`)

**Integration points:**
- `ResumeResults.tsx` — below the analysis results

### 3. NPS pulse (`NpsPulse` component)
- Modal dialog with 0-10 slider + optional comment
- Shows to logged-in users on 3rd+ session (tracked via `localStorage` session counter)
- Won't re-show for 90 days after dismissal or submission
- Saves to `feedback` with `type = 'nps'`, `rating` (0-10)

**Integration point:**
- Rendered in `App.tsx` or `Dashboard.tsx` for logged-in users

### 4. Make FeedbackBox more visible
- Convert from collapsible text link to a small fixed floating button (bottom-right corner)
- Expand into a card on click (same textarea + send functionality)

### Files to create
- `src/components/feedback/MicroSurvey.tsx`
- `src/components/feedback/InlineRating.tsx`
- `src/components/feedback/NpsPulse.tsx`

### Files to modify
- `src/components/FeedbackBox.tsx` — redesign as floating button
- `src/pages/ResumeAnalyzer.tsx` — trigger MicroSurvey after analysis
- `src/pages/ResumeBuilder.tsx` — trigger MicroSurvey after PDF export
- `src/components/cover-letter/CoverLetterBuilder.tsx` — trigger MicroSurvey after download
- `src/components/resume-analyzer/ResumeResults.tsx` — add InlineRating
- `src/pages/Dashboard.tsx` — render NpsPulse

### Technical details
- All components use `localStorage` for deduplication — no extra DB queries needed
- The `feedback` table insert uses `as any` cast (matching existing pattern) since types are auto-generated
- MicroSurvey auto-dismisses after 10 seconds if ignored
- NPS uses session count via `localStorage` key `session_count`, incremented on mount in AuthContext or Dashboard

