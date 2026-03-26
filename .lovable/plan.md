

## Fix SEO Issues Across All Flagged Pages

### Issues Summary

There are 4 types of issues across ~25+ pages:

| Issue | Root Cause | Fix |
|-------|-----------|-----|
| **TITLE_LENGTH** (>60 chars) | Many titles in `seo-config.ts` exceed 60 characters | Shorten titles to ≤60 chars |
| **META_DESC_LENGTH** (>160 chars) | Several descriptions exceed 160 characters | Trim to ≤155 chars |
| **IMG_ALT_MISSING_OR_WEAK** | OG image (`og-image.png`) likely has no alt; `ResumePreview.tsx` and `PersonalDetailsCard.tsx` have `alt=""` | Add meaningful alt text to all images |
| **DUPLICATE_TITLE / DUPLICATE_META_DESC** | All review pages (`/reviews/*`) have NO entry in `seo-config.ts`, so they fall back to the same generic default | Add unique SEO entries for every review page |
| **HEADING_LEVEL_SKIPPED** | Pages like `/guides`, `/join`, `/offer-calculator`, `/interview-questions` skip heading levels (e.g. h1 → h3) | Fix heading hierarchy |

### Changes

**File 1: `src/config/seo-config.ts`**

Shorten all titles >60 chars and descriptions >160 chars. Add entries for all review pages. Here are the shortened titles (current → proposed):

| Page | Current Title (chars) | Proposed Title |
|------|----------------------|----------------|
| `/` | ✅ 57 chars — OK | No change |
| `/join` | 66 chars | `Join Free | Career Resources for Taiwan Pros \| James Bugden` |
| `/guides` | 67 chars | `Free Career Guides \| Resume, Interview & More \| James Bugden` |
| `/resume-analyzer` | 62 chars | `Free AI Resume Analyzer \| Instant Feedback \| James Bugden` |
| `/resume-guide` | 83 chars | `Resume Guide \| Write a Resume That Gets Interviews \| James Bugden` → still 68, try: `Resume Guide \| Get More Interviews \| James Bugden` |
| `/interview-prep-guide` | 70 chars | `Interview Prep Guide \| Step-by-Step \| James Bugden` |
| `/interview-preparation-guide` | 74 chars | `Interview Preparation Guide \| Deep Dive \| James Bugden` |
| `/linkedin-branding-guide` | 68 chars | `LinkedIn Branding Guide \| Stand Out \| James Bugden` |
| `/pivot-method-guide` | 70 chars | `Pivot Method \| Change Careers Successfully \| James Bugden` |
| `/pivot-method-mini-guide` | 67 chars | `Pivot Method Mini Guide \| Quick Start \| James Bugden` |
| `/hr-interview-guide` | 66 chars | `HR Interview Guide \| Pass the Screening \| James Bugden` |
| `/ai-job-search-guide` | 69 chars | `AI Job Search Guide \| Find Jobs Faster \| James Bugden` |
| `/job-offer-guide` | 67 chars | `Job Offer Guide \| Evaluate & Negotiate \| James Bugden` |
| `/problem-solving-guide` | 68 chars | `Problem Solving for Interviews \| James Bugden` |
| `/office-politics-guide` | 65 chars | `Office Politics Guide \| Workplace Tips \| James Bugden` |
| `/career-game-guide` | 65 chars | `Career Game Guide \| Play Strategically \| James Bugden` |
| `/48-laws-guide` | 72 chars | `48 Laws of Power for Your Career \| James Bugden` |
| `/offer-calculator` | 66 chars | `Job Offer Calculator \| Compare Compensation \| James Bugden` |
| `/interview-questions` | 69 chars | `200+ Interview Questions & Answers \| James Bugden` |
| All zh-tw equivalents | Similar over-length | Shorten similarly |

Same approach for descriptions >160 chars (trim `/resume-guide`, `/interview-preparation-guide`, `/ai-job-search-guide`, `/guides`, and zh-tw equivalents).

**Add ~27 review page entries** with unique titles/descriptions, e.g.:
```
"/reviews/charlene-lee": {
  title: "Charlene Lee Resume Review | James Bugden",
  description: "Detailed resume review and feedback for Charlene Lee by senior recruiter James Bugden.",
}
```
Plus zh-tw versions.

**File 2: `src/components/resume-builder/PersonalDetailsCard.tsx`**
- Change `alt=""` → `alt="Profile photo"` (2 occurrences)

**File 3: `src/components/resume-builder/ResumePreview.tsx`**
- Change `alt=""` → `alt="Profile photo"` (1 occurrence)

**File 4: Heading hierarchy fixes** in:
- `src/pages/GuidesPage.tsx` / `GuidesPageZhTw.tsx` — category headings are h2 under h1, OK. Check if there's an h3 skip.
- `src/pages/Join.tsx` / `JoinZhTw.tsx` — check heading levels
- Other flagged pages — audit and fix any h1→h3 skips

### Scope
- Only `seo-config.ts`, a few component files for alt text, and heading fixes in flagged pages
- No layout, styling, or routing changes

