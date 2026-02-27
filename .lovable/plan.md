

## Three Changes to Resume Analyzer Results

### 1. Remove the Four Test Cards
Remove the entire "Four Tests" grid (Keyword Test, Scan Test, Qualifications Test, Fit Test) and the tagline below it from the results page. Only the score ring + grade + verdict text will remain in the top section.

**File:** `src/components/resume-analyzer/ResumeResults.tsx`
- Delete the `fourTests` array (lines 149-154)
- Delete the Four Tests grid markup (lines 187-201)

### 2. Move the Locked Overlay Higher
Currently the "Create a Free Account" blocker appears after the Section Breakdown, requiring lots of scrolling. Move it so the blur + overlay starts right after the score hero, covering the Section Breakdown and everything below it.

**File:** `src/components/resume-analyzer/ResumeResults.tsx`
- Wrap the Section Breakdown, Bullet Rewrite, Top 3 Priorities, and Coaching CTA all inside the blur/lock container
- The locked overlay will appear immediately after the score, so users see it without scrolling

### 3. Redirect Back to Original Page After Signup/Login
Currently, after creating an account the user is sent to the homepage. Instead, pass the current page path via `location.state.from` so Login/Signup redirect back.

**Files:**
- `src/components/resume-analyzer/ResumeResults.tsx` — Update the `LockedOverlay` links to `/signup` and `/login` to include `state={{ from: currentPath }}` (using `useLocation`)
- `src/pages/Signup.tsx` — Update the Google OAuth `redirect_uri` to include the `from` path so users return to the correct page after Google sign-in
- `src/pages/Login.tsx` — Same Google OAuth redirect fix

**Technical detail for Google OAuth:** Since OAuth redirects lose React state, we'll store the `from` path in `sessionStorage` before initiating OAuth, then read it back on return. The Signup/Login `useEffect` that runs on `isLoggedIn` already reads `location.state?.from` — we'll extend it to also check `sessionStorage` as a fallback.

