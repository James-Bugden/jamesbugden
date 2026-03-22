
# Fix: MailerLite sync not firing for Google OAuth signups

## Problem
13 new Google OAuth accounts were created today but none triggered the `sync-mailerlite` edge function. The logs confirm zero calls for these users.

**Root cause**: When a Google OAuth user returns to the site, two things happen simultaneously:
1. `AuthContext` detects `SIGNED_IN` and calls `syncToMailerLite` (fire-and-forget fetch)
2. The Join/Signup page's `useEffect` detects `isLoggedIn` and immediately navigates to the dashboard

The page navigation cancels the in-flight fetch request before it completes.

## Solution: Move sync to a database trigger (server-side)

Instead of relying on client-side code that can be interrupted by navigation, move the MailerLite sync to a **database trigger + edge function** pattern that fires reliably on the server.

### Step 1 — Create a `profiles` insert trigger via migration
- Create a trigger on `auth.users` — **wait, we can't modify auth schema.**
- Instead: create a database webhook or use the existing `AuthContext` approach but make it more resilient.

### Revised approach — Make client-side sync resilient

**File: `src/contexts/AuthContext.tsx`**
- Add a small delay or use `setTimeout(..., 0)` to ensure the sync call is dispatched before navigation occurs
- Better: use `navigator.sendBeacon` or `keepalive: true` fetch option so the request survives page navigation

**File: `src/lib/mailerlite.ts`**
- Change from `supabase.functions.invoke` to a direct `fetch` call with `keepalive: true` — this ensures the request completes even if the page navigates away
- Construct the edge function URL using `VITE_SUPABASE_URL`

### Step 2 — Backfill missing subscribers
- Run a one-time script via the edge function to sync today's 13 missing users to MailerLite group `181733295867823354`

### Step 3 — Add a fallback server-side sync
- Create a lightweight cron or database trigger approach: add a `profiles` table insert trigger that calls the sync function, ensuring no signups are ever missed regardless of client behavior

## Technical details

The key fix in `mailerlite.ts`:
```typescript
export function syncToMailerLite(email: string, name?: string): void {
  const url = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/sync-mailerlite`;
  fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY,
    },
    body: JSON.stringify({ email, name }),
    keepalive: true,  // survives page navigation
  }).catch(() => {});
}
```

This single change (`keepalive: true`) will fix the issue for all OAuth signups going forward.

## Files to modify
1. `src/lib/mailerlite.ts` — switch to `fetch` with `keepalive: true`
2. `supabase/functions/sync-mailerlite/index.ts` — add a `/batch` mode to backfill the 13 missing users
