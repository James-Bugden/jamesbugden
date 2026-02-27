

# Resume Analyzer: Rate Limiting, Bug Fixes, and UX Improvements

## Overview
Fix all identified issues in the Resume Analyzer: add server-side rate limiting (5/month), fix broken template links, fix database insert errors, add coaching CTA, improve progress animation, and auto-expand weak sections.

## Changes

### 1. Server-Side Rate Limiting (5 uses/month per email)
**New migration**: Add `input_method` and `user_agent` columns to `resume_leads` table (fixes the insert bug simultaneously), then use the existing `resume_leads` table to count analyses per email per month.

**`src/pages/ResumeAnalyzer.tsx`** -- Add a rate-limit check in `handleUnlock`:
- After the user submits their email, query `resume_leads` to count rows with that email in the current calendar month
- If count >= 5, show an error: "You've reached the limit of 5 free analyses per month. Try again next month."
- Remove the client-side `hasAnalyzed` state guard (replaced by server-side check)
- Move the rate check to BEFORE the analysis runs (ask for email first, then analyze) -- this prevents wasting API calls on rate-limited users

**Flow change**: Upload -> Email gate (moved earlier) -> Analyzing -> Results
This way we collect the email before spending API credits.

### 2. Fix Dead Template Links
**`src/components/resume-analyzer/ResumeResults.tsx`** -- Replace the template section's `href="#"` with:
- English: `https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing`
- Chinese: `https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing`

Also add a link to `/resume-quick-reference` (the user's dedicated template page).

### 3. Fix Database Insert Error
**New migration**: Add `input_method text` and `user_agent text` nullable columns to `resume_leads`.

This fixes the current insert that references these non-existent columns.

### 4. Sync Progress Animation with API
**`src/pages/ResumeAnalyzer.tsx`** -- Instead of a fixed timer reaching 70% and stalling:
- Progress crawls to 85% over ~15 seconds
- When the API response arrives, jump to 100%
- Clear intervals immediately on completion or error

### 5. Add Coaching CTA After Top 3 Priorities
**`src/components/resume-analyzer/ResumeResults.tsx`** -- Insert a CTA card between "Top 3 Priorities" and "Free Templates":
- Heading: "Want a recruiter to fix all of this for you?"
- Body: Brief pitch for the 1:1 resume review service
- Button linking to homepage `/#coaching` section
- Styled with gold border to match the brand

### 6. Auto-Expand Weak Sections
**`src/components/resume-analyzer/ResumeResults.tsx`** -- Change `SectionCard` to auto-expand sections scoring below 6 (in addition to the first section):
```
defaultOpen={i === 0 || section.score < 6}
```

### 7. Add Name Field to Email Gate
**`src/pages/ResumeAnalyzer.tsx`** -- The `gateName` state already exists but there's no input for it. Add a name input field above the email input in the gate form.

## File Changes Summary

| File | Action |
|------|--------|
| `supabase migration` | Add `input_method` and `user_agent` columns to `resume_leads` |
| `src/pages/ResumeAnalyzer.tsx` | Reorder flow (email first), add rate limiting, fix progress, add name input |
| `src/components/resume-analyzer/ResumeResults.tsx` | Fix template URLs, add coaching CTA, auto-expand weak sections |

