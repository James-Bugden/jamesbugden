

# User Authentication System

## Overview
Add a login/signup system so returning users don't need to re-enter their email every time they use gated tools (Offer Calculator, Comp Calculator, etc.). Logged-in users get full access to all tools with no email gate.

## What Changes

### 1. Auth Pages
- **`/login`** -- Sign in with email/password or Google. Includes "Forgot password?" link. Bilingual support (detects if user came from `/zh-tw/` route).
- **`/signup`** -- Create account with email/password or Google. Email verification required before first sign-in.
- **`/reset-password`** -- Page where users land after clicking the password reset link in their email. Shows a form to set a new password.

### 2. Auth Context
- Create `src/contexts/AuthContext.tsx` -- a React context that wraps the app, tracks the current session via `onAuthStateChange`, and exposes `user`, `isLoggedIn`, `signOut`.

### 3. Update the Email Gate
- Modify `useEmailGate` hook: if the user is logged in (from AuthContext), `isUnlocked` is automatically `true` -- no overlay shown at all.
- If not logged in, the overlay changes: instead of just an email input, it shows **"Sign in or create a free account"** buttons that link to `/login` and `/signup`, plus the existing email-only option as a fallback for quick one-time access.

### 4. Routing
- Add `/login`, `/signup`, `/reset-password` routes in `App.tsx`.
- No pages become "protected" -- all guides and content remain publicly viewable. Only the gated tool sections (detailed breakdowns in Offer Calculator, etc.) prompt login.

### 5. Nav Updates
- Add a small "Sign in" link or user avatar to the tool headers (Offer Calculator, Comp Calculator) when relevant. Logged-in users see their email/avatar with a sign-out option.

### 6. Password Reset Flow
- Forgot password on the login page calls `supabase.auth.resetPasswordForEmail()` with `redirectTo` pointing to `/reset-password`.
- The `/reset-password` page detects the recovery token in the URL hash and shows a "Set new password" form that calls `supabase.auth.updateUser({ password })`.
- Default system emails are used (no custom domain setup needed).

### 7. Google Sign-In
- Use the Lovable Cloud managed Google OAuth via `lovable.auth.signInWithOAuth("google")`. No API keys needed.
- Configure social login using the platform tool, which generates the required integration module.

## Technical Details

### New Files
- `src/contexts/AuthContext.tsx` -- session provider
- `src/pages/Login.tsx` -- login page (email/password + Google)
- `src/pages/Signup.tsx` -- signup page
- `src/pages/ResetPassword.tsx` -- password reset page

### Modified Files
- `src/App.tsx` -- wrap with `AuthProvider`, add 3 new routes
- `src/hooks/useEmailGate.ts` -- check auth context first; if logged in, auto-unlock
- `src/components/EmailGateOverlay.tsx` -- add "Sign in" / "Create account" buttons alongside existing email input

### Database
- No new tables needed. The existing `email_gate_leads` table continues to capture leads from non-logged-in users. Logged-in users bypass the gate entirely.

### Security
- Email verification is required (no auto-confirm).
- Google OAuth uses Lovable Cloud's managed credentials.
- No profile table needed since we only need auth status, not extra user data.

