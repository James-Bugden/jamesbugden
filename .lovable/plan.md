

# Fix: Resume Builder Editor Cut Off on Mobile

## Problem
On mobile, the Resume Builder editor content is cut off at the bottom. The root cause is a combination of:

1. **MobileBottomNav overlap**: The `/resume` path is not in `HIDDEN_NAV_PATHS`, so logged-in users see a fixed bottom nav bar (64px) plus a 64px spacer `div`. The Resume Builder uses `h-screen` for its layout, but the bottom nav sits on top of it, hiding the last ~64px of content.

2. **Too many fixed elements eating vertical space**: The sticky top bar (2 rows: brand row ~48-56px + doc name row ~40px), plus the always-visible export warning banner (~50px), plus the BrandingFooter — all reduce the scrollable editor area significantly on small screens.

## Solution

### 1. Hide MobileBottomNav on `/resume` paths
Add `/resume` to `HIDDEN_NAV_PATHS` in `src/App.tsx`. The Resume Builder has its own navigation (back arrow, dashboard link, preview button) so the global bottom nav is redundant and harmful here.

### 2. Add bottom padding to mobile editor
Add `pb-20` to the mobile editor container (`lg:hidden` div at line 1106) to ensure the "Add Content" button and bottom sections are fully reachable, accounting for any browser chrome.

### Files Changed
- **`src/App.tsx`** — Add `"/resume"` to `HIDDEN_NAV_PATHS` array
- **`src/pages/ResumeBuilder.tsx`** — Add `pb-20` to the mobile editor `div` (line 1106)

