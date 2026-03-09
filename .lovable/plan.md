

## Changes to Dashboard

### 1. Remove Job Tracker from tools array (lines 89-96)
Delete the `job-tracker` entry from the `tools` array.

### 2. Remove Job Tracker references throughout
- **Line 11**: Remove `getActiveJobs` import
- **Lines 262-266**: Remove `job-tracker` branch from `getProgressBadge`
- **Lines 426, 437-444**: Remove `hasJobTracker` logic and the "Track your applications" recommendation from `nextStep`

### 3. Add "Beta" badge to Resume Analyzer, Resume Builder, and Offer Calculator
In the tool card rendering (line 728), append a `Beta` tag next to the tool title for IDs `resume-analyzer`, `resume-builder`, and `offer-calculator`:

```tsx
<h3 className="text-lg font-bold mb-1" style={{ color: C.text }}>
  {tool.title[lang]}
  {["resume-analyzer", "resume-builder", "offer-calculator"].includes(tool.id) && (
    <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full align-middle"
      style={{ backgroundColor: C.goldFaded, color: C.gold }}>Beta</span>
  )}
</h3>
```

All changes are in `src/pages/Dashboard.tsx` only. The Job Tracker remains in `SiteDirectory` and the router.

