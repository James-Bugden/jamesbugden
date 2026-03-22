

## Problem

When a user clicks "Sign in" on the homepage → Google OAuth → redirects back to `window.location.origin` (the homepage `/`). The homepage has **no logic** to detect the freshly-logged-in state and redirect to `/dashboard`. The redirect logic only lives in `Login.tsx` and `Signup.tsx`.

The `sessionStorage.setItem("auth_redirect", from)` is set before OAuth, but the homepage never reads it.

## Solution

Add a small `useEffect` to the **homepage components** (`Index.tsx` and `IndexZhTw.tsx`) that checks:
1. User just became logged in (`isLoggedIn` from `useAuth()`)
2. There's an `auth_redirect` value in sessionStorage, OR default to `/dashboard`

If both conditions are met, redirect to dashboard and clear the sessionStorage flag.

### Changes

**File: `src/pages/Index.tsx`**
- Add a `useEffect` after the existing `useAuth()` call:
```tsx
const navigate = useNavigate();
useEffect(() => {
  if (!isLoggedIn) return;
  const pending = sessionStorage.getItem("auth_redirect");
  if (pending) {
    sessionStorage.removeItem("auth_redirect");
    navigate(pending === "/" ? "/dashboard" : pending, { replace: true });
  }
}, [isLoggedIn]);
```
- Add `useNavigate` import

**File: `src/pages/IndexZhTw.tsx`**
- Same pattern but defaulting to `/zh-tw/dashboard`

This keeps the existing Login/Signup redirect logic intact and adds a safety net on the homepage for OAuth returns.

