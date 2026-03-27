

## Fix Admin Dashboard Resume Leads Table

### Problem
1. The `name` column often contains resume text (first line of resume) instead of actual names, because when there's no auth user, it falls back to `resumeLines[0]`
2. The `job_title` column is never populated in the insert — it's always `null`
3. The `resume_text` field is stored but not accessible from the admin view, and long name values expand rows

### Fix

**1. `src/pages/ResumeAnalyzer.tsx` (~line 234-242)**
- Extract job title from the resume's second line (typically the professional title) or from segmentation data
- Better name extraction: only use first line as name if it looks like a name (short, no special characters like `@`, `|`, etc.)
- Add `job_title` to the insert payload

**2. `src/pages/AdminDashboard.tsx` (~lines 56-67, 284-287, 796-829)**
- Add `resume_text` to the ResumeLead interface and the select query
- Truncate the `name` column display with `max-w-[120px] truncate`
- Truncate `job_title` similarly
- Add a collapsible/expandable "Resume Text" column that shows first ~50 chars with a tooltip or expand toggle
- Add `max-w` and `truncate` to all text columns to prevent row expansion

### Technical Details

**Name extraction improvement** (ResumeAnalyzer.tsx):
```ts
const looksLikeName = (s: string) => s.length < 40 && !/[@|•]/.test(s);
const resumeName = looksLikeName(resumeLines[0] || "") ? resumeLines[0] : null;
```

**Job title extraction**:
```ts
job_title: result.segmentation?.seniority_level 
  ? (resumeLines[1] && resumeLines[1].length < 60 ? resumeLines[1] : null) 
  : null,
```

**Table columns** — add `max-w` and `truncate` to Name, Job Title, Industry cells. Add a "Resume" column with truncated preview and title tooltip.

### Files Changed
1. `src/pages/ResumeAnalyzer.tsx` — improve name/job_title extraction in the insert
2. `src/pages/AdminDashboard.tsx` — fix column widths, add resume_text preview column

