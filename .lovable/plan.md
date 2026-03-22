
Goal: fix the admin Google login flow so a valid admin Google account actually reaches `/admin` instead of ending up back on the login page.

What I found
- The backend side is working:
  - `auth` logs show a successful Google login for `james@jamesbugden.com`.
  - `public.admin_users` already contains `james@jamesbugden.com`, so this account is recognized as an admin.
- That means the failure is very likely client-side, not a credential or role issue.
- There are two weak spots in the current flow:
  1. `src/pages/AdminLogin.tsx` sends Google OAuth back to `window.location.origin`, so the admin flow depends on the homepage noticing `sessionStorage.auth_redirect` and forwarding to `/admin`.
  2. `src/components/ProtectedRoute.tsx` can redirect too early because `checkedUserRef` suppresses duplicate admin checks before the first `is_admin` RPC has finished. In that race, `loading` becomes false while `isAdmin` is still false, so the user gets bounced back to `/admin/login`.

Implementation plan
1. Make the admin OAuth return directly to the admin login route
- In `src/pages/AdminLogin.tsx`, change the Google sign-in `redirect_uri` from `window.location.origin` to `${window.location.origin}/admin/login`.
- Keep `sessionStorage` as a fallback, but stop relying on the homepage redirect to complete admin login.

2. Make AdminLogin recover existing sessions on mount
- Update `AdminLogin` so it always checks for an existing session on mount, not only when `auth_redirect === "/admin"`.
- If a session already exists:
  - run `is_admin`
  - navigate to `/admin` when true
  - sign out and show “Access denied” when false
- Clear stale `auth_redirect` after a successful admin redirect or denied access.

3. Remove the ProtectedRoute race condition
- Refactor `src/components/ProtectedRoute.tsx` so admin routes stay in a loading state until the admin RPC actually resolves.
- Replace the current “skip duplicate checks” pattern with one of these safer approaches:
  - simplest: remove `checkedUserRef` and just re-check on mount/auth change
  - or keep dedupe, but only mark a user as checked after the RPC finishes
- Ensure `requireAdmin` routes never render the redirect branch while the admin status is still unresolved.

4. Add explicit admin-auth loading states
- Split auth resolution from admin resolution inside `ProtectedRoute`.
- Only evaluate:
  - “no session” after auth is resolved
  - “not admin” after admin check is resolved
- This prevents false redirects during OAuth return / session hydration.

5. Add regression tests
- Add tests covering:
  - admin Google OAuth uses `/admin/login` as the return location
  - `AdminLogin` redirects an already-authenticated admin to `/admin`
  - `ProtectedRoute` does not redirect before `is_admin` finishes
  - a non-admin authenticated user is still rejected correctly

Files to update
- `src/pages/AdminLogin.tsx`
- `src/components/ProtectedRoute.tsx`
- `src/test/auth.test.ts` (or a new focused auth route test file)

Technical notes
- I do not plan any database changes: the admin role row already exists and the admin-check function is already correct.
- I do not plan changes to `src/integrations/lovable/index.ts` or `src/integrations/supabase/client.ts`.
- Root cause is most likely: successful Google auth + admin role exists + client redirect/race sends the user back to login.

Expected outcome
- Clicking “Sign in with Google” returns to `/admin/login`
- the page detects the authenticated admin session immediately
- the admin check completes before redirect logic runs
- the user lands reliably on `/admin`
