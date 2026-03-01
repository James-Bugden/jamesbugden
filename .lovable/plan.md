

## Add Spacing Between Welcome Banner and Search Bar

**Problem:** The search bar section sits too close to the Welcome Banner above it, making the layout feel cramped.

**Fix:** Add vertical spacing between the Welcome Banner section and the Search/Recently Used section by increasing the top padding on the search section from `pt-8 md:pt-10` to `pt-10 md:pt-12`, and optionally adding bottom padding to the Welcome Banner.

**File:** `src/pages/Dashboard.tsx`

**Change (line 477):**
- Current: `pt-8 md:pt-10`
- New: `pt-10 md:pt-14`

This adds roughly 8-16px more breathing room between the welcome banner and the search bar.

