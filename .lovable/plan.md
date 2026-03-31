

# Fix: "Old UI" Flash When Switching Languages

## Root Cause

When switching between `/dashboard` and `/zh-tw/dashboard`, React unmounts the entire `Dashboard` component and remounts a new instance. This resets `useProfile()` to `loading: true` and `profile: null`.

During the ~200-500ms profile re-fetch:
- `profile?.career_phase` is `null` → **PhaseBar doesn't render**
- `careerPhase` is `null` → **Journey sections lose their expand/collapse/highlight behavior**
- The dashboard briefly renders without any phase-aware features — which looks exactly like the "old UI"

## Fix

**Show `DashboardSkeleton` while profile is loading too** (not just auth loading). This prevents the brief flash of the un-personalized dashboard.

### File: `src/pages/Dashboard.tsx`

Change line 279 from:
```tsx
if (isLoading) return <DashboardSkeleton />;
```
to:
```tsx
if (isLoading || profileLoading) return <DashboardSkeleton />;
```

This ensures the skeleton stays visible until both auth AND profile data are ready, so the dashboard never renders in the "old" state without the phase bar and journey highlights.

### One-line change, one file.

