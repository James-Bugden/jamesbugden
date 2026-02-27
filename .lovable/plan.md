

## Change Resume Analyzer to "Freemium Results" Model

### Current Flow
Upload → Email Gate → Analysis → Full Results

### New Flow
Upload → Analysis → Partial Results (blurred sections) → Create Account to Unlock Full Report

### What Users See for Free (No Gate)
- Overall score ring + grade (A/B/C/etc.)
- Four tests (Keyword, Scan, Qualifications, Fit) — pass/fail cards
- Section-by-section breakdown headers with scores (collapsed, not expandable)

### What Gets Blurred / Locked (Requires Account)
- Section detail findings (the expandable content inside each SectionCard)
- Bullet rewrite example (before/after)
- Top 3 priorities
- Download PDF button

A blurred overlay with a "Create a free account to see your full report" CTA will cover the locked sections.

### Technical Changes

**1. `src/pages/ResumeAnalyzer.tsx`**
- Remove the `email-gate` screen entirely
- Change `handleSubmitResume` to go directly from upload → analyzing → results
- Move the email/name collection + rate limit check + DB save logic to happen either:
  - Without gating (save lead with just the resume data, no email required), OR
  - After account creation (deferred save)
- For now: run analysis without email, save lead record without email (make email optional or use a placeholder), then show partial results
- Actually, simpler: skip the lead save until they create an account. Just run the analysis and show results.

**2. `src/components/resume-analyzer/ResumeResults.tsx`**
- Accept a new `isUnlocked` prop (boolean)
- When `isUnlocked = false`:
  - Show score hero + four tests fully visible
  - Show section breakdown headers/scores but collapse all and disable expanding
  - Blur the bullet rewrite, top 3 priorities, and coaching CTA sections behind an overlay
  - The overlay has a prominent "Create a free account" button linking to `/signup` (or a modal)
- When `isUnlocked = true`: show everything as-is (current behavior)
- Hide Download PDF button when locked

**3. Account-based unlocking**
- Use the existing `useAuth` hook to check `isLoggedIn`
- Pass `isUnlocked={isLoggedIn}` to `ResumeResults`
- When user signs up/logs in and returns, the results are still in state and automatically unlock

**4. Persist analysis across auth redirect**
- Store `analysisResult` in `sessionStorage` before redirecting to signup
- On mount, check sessionStorage and restore if present + user is now logged in
- This ensures the report survives the signup/login round-trip

### Files to Modify
1. **`src/pages/ResumeAnalyzer.tsx`** — Remove email-gate screen, direct flow, persist analysis to sessionStorage, pass `isUnlocked` to results
2. **`src/components/resume-analyzer/ResumeResults.tsx`** — Add `isUnlocked` prop, blur locked sections with signup CTA overlay

