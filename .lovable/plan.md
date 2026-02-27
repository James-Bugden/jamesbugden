

# Three Improvements: Auto-Sitemap, Premium 404, Stronger Email Gate

## 1. Auto-Generated Sitemap via Build Script

**Problem**: The sitemap is a static XML file that requires manual updates whenever new pages are added.

**Solution**: Create a Vite plugin that auto-generates `sitemap.xml` at build time by extracting all route paths from `App.tsx`.

**Changes**:
- Create `scripts/generate-sitemap.ts` -- a small script that parses the route definitions in `App.tsx` using regex, maps them to full URLs with priority rules, and writes `public/sitemap.xml`
- Add a custom Vite plugin in `vite.config.ts` that runs this generation at build time (via `buildStart` hook) and during dev server startup
- The priority rules: homepage = 1.0, `/zh-tw` = 0.9, tools/guides = 0.7, toolkit sub-pages = 0.5, reviews = 0.4, admin/utility = 0.3
- Delete the manually-maintained `public/sitemap.xml` (it will be auto-generated)

---

## 2. Premium 404 Page

**Problem**: The current NotFound page is a plain white screen with generic "404" text -- no navigation, no branding, no helpful links.

**Solution**: Redesign it to match the executive green/gold brand with helpful navigation.

**Changes to `src/pages/NotFound.tsx`**:
- Use the site's `bg-background` with subtle gradient textures (matching the premium visual language)
- Large gold "404" heading with `font-heading`
- Friendly copy: "This page doesn't exist" with a suggestion to check the URL
- Quick-link grid with cards to: Homepage, Guides, Offer Calculator, Toolkit, Quiz
- Each card has an icon (from lucide-react), title, and brief description
- "Return to Homepage" primary button below
- Footer link to `/site-directory` for the full site index
- Responsive layout: 2-column grid on mobile, 3 columns on desktop

---

## 3. Server-Side Email Gate Verification

**Problem**: The email gate stores unlock state in `localStorage`, so users can bypass it by clearing storage or using incognito mode. The email is collected but the unlock check is purely client-side.

**Solution**: Move unlock verification to the database. When a user submits their email, store it server-side. On page load, check the database (by email or by authenticated user) before unlocking.

**Changes**:

**Database**: The `email_gate_leads` table already exists with `email`, `source`, and `created_at` columns. No schema changes needed -- we'll query it to verify unlock status.

**`src/hooks/useEmailGate.ts`** -- rewrite:
- On mount, check if user is logged in (auto-unlock) OR check if the email stored in localStorage exists in `email_gate_leads` table via a database query
- The `unlock` function still inserts into `email_gate_leads` and stores the email in localStorage (for the query key on next visit), but `isUnlocked` is now driven by the database response rather than a simple localStorage boolean
- Remove the `STORAGE_KEY` ("offer-compass-unlocked") boolean -- only store the email for lookup purposes
- Use React Query or a simple `useEffect` + state for the async check, with a brief loading state

**Flow**:
1. Logged-in user --> always unlocked (no change)
2. Returning visitor with email in localStorage --> query `email_gate_leads` to verify, unlock if found
3. New visitor --> gate is locked, must submit email
4. Clearing localStorage --> gate re-locks (they'd need to re-enter email, which already exists in DB, so it re-unlocks after submission)
5. Incognito --> no localStorage, gate is locked, must submit email again

This makes the gate meaningfully harder to bypass while keeping the UX smooth for legitimate users.

---

## Technical Details

### File Changes Summary
| File | Action |
|------|--------|
| `scripts/generate-sitemap.ts` | Create new |
| `vite.config.ts` | Add sitemap plugin |
| `public/sitemap.xml` | Will be auto-generated (can delete manual version) |
| `src/pages/NotFound.tsx` | Rewrite with premium design |
| `src/hooks/useEmailGate.ts` | Rewrite with server-side verification |

### No database migrations needed
The existing `email_gate_leads` table already has the right schema. We just need to add a SELECT query (currently only INSERT is used). RLS policy may need a check -- if there's no SELECT policy for anon, we'll add one scoped to checking by email.
