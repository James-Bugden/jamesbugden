

# Fix: "What's New" Modal Showing Every Login

## What I Found

The `WhatsNewModal` code is logically correct — it uses `localStorage.getItem("james_careers_dashboard_v2_seen")` to check if dismissed, and `localStorage.setItem()` on dismiss. The dismiss handler fires on both the "Got it" button and the X/overlay close.

**Why it keeps showing**: localStorage is domain-scoped. If you're accessing the site from different origins (e.g. `jamesbugden.com` vs `jamesbugden.lovable.app` vs preview URL), each has its own localStorage. Also, clearing browser data or using incognito mode wipes it.

## Fix: Persist Dismissal in the User Profile (Database)

Instead of relying only on localStorage, store the flag in the user's profile so it persists across devices, browsers, and domains.

### Step 1: Add `whats_new_v2_seen` column to `profiles` table
Run a migration to add a boolean column `whats_new_v2_seen` (default `false`) to the `profiles` table.

### Step 2: Update `WhatsNewModal` to check profile + localStorage
- Accept `profile` and `updateProfile` as props (already available in `Dashboard.tsx`)
- Show modal only if **both** `localStorage` AND `profile.whats_new_v2_seen` are falsy
- On dismiss: set localStorage **and** call `updateProfile({ whats_new_v2_seen: true })`

### Step 3: Update Dashboard.tsx to pass profile props
Pass `profile` and `updateProfile` to `WhatsNewModal` in both the English and Chinese dashboard renders.

## Technical Details

**Files changed**:
- `supabase/migrations/` — new migration adding `whats_new_v2_seen boolean default false`
- `src/components/dashboard/WhatsNewModal.tsx` — accept profile props, dual-check logic
- `src/pages/Dashboard.tsx` — pass profile/updateProfile to WhatsNewModal

