

## Fix Login Redirect Logic

### Problem
When a user clicks "Sign in" from the homepage (`/` or `/zh-tw`), `location.state.from` is set to `/` or `/zh-tw`. After login, the redirect logic sends them back to that page instead of the dashboard.

Additionally, several components always link to `/login` and `/join` regardless of language context, so Chinese users get English login/signup pages.

### Changes

**1. `src/pages/Login.tsx` — Smart redirect after login**
- In the `useEffect` that handles post-login redirect (line 47-54), treat homepage paths (`/`, `/zh-tw`, `/zh-tw/`) as non-specific — redirect to dashboard instead of back to homepage.
- Also detect `isZhTw` from `location.state?.from` OR current path patterns to handle edge cases.

**2. `src/components/AuthHeaderButton.tsx` — Language-aware login link**
- Change `to="/login"` to use `/login` for English and pass the ZH context properly so the Login page knows the language.

**3. `src/components/guides/GuideSignInBanner.tsx` — Language-aware routes**
- When `lang="zh"`, navigate to `/login` but ensure `state.from` carries the zh-tw path (already does this via `location.pathname`, so this is correct). No change needed here.

**4. `src/components/LoginGate.tsx` — Already correct** (uses `location.pathname`).

**5. `src/components/EmailGateOverlay.tsx` — Already passes `state.from`**, but check it links correctly for ZH users.

**6. `src/pages/Dashboard.tsx` — Language-aware login redirect**
- Line 251: When redirecting unauthenticated users, detect if on ZH dashboard path and redirect to `/login` with appropriate state.

### Summary of actual code changes:
- **Login.tsx**: Add a check — if `redirectTo` is `/`, `/zh-tw`, or `/zh-tw/`, replace it with the appropriate dashboard path.
- **JoinZhTw.tsx**: Already redirects to `/zh-tw/dashboard` — correct.
- **Join.tsx**: Redirects to `/dashboard` — correct, but should respect `location.state?.from` like Login does.

