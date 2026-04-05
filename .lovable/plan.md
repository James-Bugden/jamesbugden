

# Add Date Consistency Warnings to Resume Completeness Score

## What changes
Enhance the existing `CompletenessScore` component to detect and warn about two new date issues, shown as warning items (amber) below the existing checklist when expanded.

### New warnings detected
1. **Missing end dates** — Experience/education/project entries that have a start date but no end date and are not marked "Currently here"
2. **Inconsistent dates** — Entries where end date is before start date (comparing year, then month)

### Implementation

#### 1. `src/components/resume-builder/CompletenessScore.tsx`
- Add a `DateWarning` interface: `{ label: string; entryName: string }`
- Add a `useComputeDateWarnings(data)` hook that scans experience, education, projects, and organisations sections for:
  - Entries with `startYear` but missing `endYear` and `currentlyHere !== "true"` → "Missing end date"
  - Entries where `endYear < startYear` or (same year and `endMonth < startMonth`) → "End date before start date"
- Render warnings as amber `AlertTriangle` icon items below the existing checklist when expanded
- Warnings do not affect the score percentage — they are advisory only

#### 2. `src/components/resume-builder/i18n.tsx`
- Add new translation keys for both EN and zh-TW:
  - `dateWarnMissing`: "Missing end date" / "缺少結束日期"
  - `dateWarnInconsistent`: "End date is before start date" / "結束日期早於開始日期"
  - `dateWarnings`: "Date warnings" / "日期警告"

### Visual design
- Warning items use `AlertTriangle` icon in amber (`text-amber-500`) instead of the green check / gray circle
- Entry name (position/company or degree/institution) shown alongside the warning for easy identification
- Grouped under a small "⚠ Date warnings" subheading within the expanded checklist

