

## Add Cream Header to Resume Builder Dashboard View

### Problem
The `/resume` and `/zh-tw/resume` dashboard view (document list) is missing the cream-colored top navigation bar with "← Home", "Dashboard/我的專區", and language toggle that exists on the resume editor view and the Resume Analyzer. The user wants consistent navigation across all resume builder views.

### Solution
Add the same cream header bar to the `DocumentDashboard` component, matching the Resume Analyzer's exact style.

### Changes

**`src/components/document-dashboard/DocumentDashboard.tsx`**

1. Import `useAuth` from `@/contexts/AuthContext`, `Link` from `react-router-dom`, and `LogIn` from `lucide-react`
2. Add the cream header bar at the top of the return JSX (before the existing `h-screen flex` wrapper), or wrap everything in a new outer container:
   - Cream background (`#FDFBF7`), sticky, border-bottom
   - Left: "JAMES BUGDEN" brand link (→ `/` or `/zh-tw`)
   - Right: "← Home" / "← 首頁" link, Dashboard pill (green, logged in) or Sign in pill (not logged in), language toggle pill (gold outline with "EN" or "中文")
3. The existing mobile header and sidebar language toggle remain functional but the top cream header provides consistent navigation on both mobile and desktop
4. Adjust the main container height from `h-screen` to account for the new header (use `flex-1` inside a `h-screen flex flex-col` wrapper)

### Header layout
```text
┌─────────────────────────────────────────────────────────┐
│ JAMES BUGDEN              ← Home  [Dashboard]  [中文]   │  ← cream header
├─────────────────────────────────────────────────────────┤
│ [Sidebar] │ Main content (document cards)               │
└─────────────────────────────────────────────────────────┘
```

### Files
1. `src/components/document-dashboard/DocumentDashboard.tsx` — add cream header, wrap layout

