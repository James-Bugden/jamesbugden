

# Mobile Dashboard Fixes

## 6 Changes

### 1. Phase Bar — Stack counter below pills on mobile
**File:** `src/components/dashboard/PhaseBar.tsx`
- Change the container from `flex items-center justify-between` to `flex flex-col sm:flex-row` on mobile
- Pills row takes full width on mobile (`flex-1 w-full justify-between`)
- Progress counter moves below pills, centered, smaller text on `< sm`

### 2. Tool Cards — Horizontal scroll on mobile
**File:** `src/pages/Dashboard.tsx`
- Replace `grid grid-cols-1 md:grid-cols-2` with a responsive approach:
  - On `< sm`: `flex overflow-x-auto snap-x snap-mandatory gap-4` with each card `min-w-[280px] snap-start`
  - Add a right-edge fade gradient overlay (`pointer-events-none` absolute div with `bg-gradient-to-l from-card`)
  - On `sm+`: keep the existing 2-col grid
- Wrap in a relative container for the fade indicator

### 3. End-to-End Guides — Collapsed by default on mobile
**File:** `src/components/dashboard/JourneySection.tsx`
- Modify `getDefaultCollapsed()`: when `tag === "end-to-end"`, return `true` if viewport is `< 640px`
- Need to detect mobile: use `window.innerWidth < 640` at mount (or a simple state check), since this is a default value calculation
- Desktop behavior unchanged (always expanded)

### 4. Guide Cards — Compact list on mobile
**File:** `src/components/dashboard/JourneySection.tsx`
- Add a `isMobile` check (import `useIsMobile` from existing hook, but it uses 768px — we need 640px, so use a local check or adjust)
- When mobile + expanded: render items as compact rows instead of full cards
  - Each row: `flex items-center gap-3 py-3 border-b` — checkbox on left, title (no description), badges on right
  - Tapping the row navigates to the guide
  - Pinned items get a simplified row treatment too
- Desktop: keep existing full card grid unchanged

### 5. Background Color
**File:** `src/index.css`
- Current `--background: 39 47% 96%` = `hsl(39, 47%, 96%)` ≈ `#FAF6F0` — slightly warm cream. This is intentional brand cream, close to `#FBF7F0`. Verify it's not pinkish. The value is correct — `hsl(39, 47%, 96%)` renders as warm cream, not pink. No change needed unless the rendered color looks wrong in preview.

### 6. Double Footer — Remove dashboard's inline footer
**File:** `src/pages/Dashboard.tsx`
- The dashboard has its own `<footer>` block (lines 528-544) with social icons + copyright
- `SiteLayout` also renders `SiteFooter` on `/dashboard` since it's not in `EXCLUDED_PREFIXES`
- **Fix:** Remove the inline footer from Dashboard.tsx entirely. The `SiteFooter` from `SiteLayout` already handles it with the same social icons + links + copyright.

### Technical Notes
- For the mobile breakpoint (640px), the existing `useIsMobile` hook uses 768px. For items 3 and 4, I'll use a local `useState` + `matchMedia` check for `640px` inside `JourneySection`, or pass an `isMobile` prop.
- All changes are CSS/layout only — no data logic changes, no data loss risk.
- Chinese dashboard (`DashboardZhTw.tsx`) likely imports the same components, so PhaseBar and JourneySection changes apply automatically. Need to verify if DashboardZhTw has its own inline footer too.

