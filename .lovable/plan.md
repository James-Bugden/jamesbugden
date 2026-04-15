

# Fix: Stale Token Error & Misleading "Session Expired" for Guest Users

## Problem
Two related issues:
1. **Stale refresh tokens**: When a browser has leftover auth tokens (from a previous session or another user), Supabase tries to refresh them on page load and fails with "refresh_token_not_found". This error shows up in the console and can confuse the app state.
2. **Wrong error message for guests**: When an unauthenticated user tries to use the Resume Analyzer, the edge function returns 401, and the frontend shows "Your session expired. Please sign in again" — but the user was never signed in.

## Changes

### 1. `src/contexts/AuthContext.tsx` — Handle stale token cleanup
- Listen for the `TOKEN_REFRESHED` event failure by also checking for `SIGNED_OUT` triggered by token refresh failure
- On `onAuthStateChange`, if event is `TOKEN_REFRESHED` but session is null (refresh failed), clear localStorage auth keys to prevent repeated failures
- This ensures new/guest visitors with stale tokens in localStorage don't see errors

### 2. `src/pages/ResumeAnalyzer.tsx` — Better error message for 401
- When catching a 401 from the edge function, check if the user is currently logged in (via `useAuth`)
- If logged in → show "Your session expired. Please sign in again." (existing behavior)
- If NOT logged in → show "Please sign in to analyze your resume." with a link/button to the login page
- This prevents the confusing "session expired" message for first-time visitors

### 3. `src/contexts/AuthContext.tsx` — Graceful error suppression
- Wrap the auth initialization to catch `AuthApiError` with code `refresh_token_not_found`
- When this specific error occurs, call `supabase.auth.signOut()` silently to clear the invalid tokens
- This prevents the error from propagating to the console and confusing the app

## Files changed
1. `src/contexts/AuthContext.tsx` — Add stale token detection and cleanup
2. `src/pages/ResumeAnalyzer.tsx` — Context-aware error message for 401 (guest vs logged-in)

