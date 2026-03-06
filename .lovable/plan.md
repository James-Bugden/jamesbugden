

## Fix Experience Import — ALL CAPS Company Names Misidentified

### Problem
When importing a resume with the format:
```
UBER
Senior Recruiter 2024 – Present
• bullet points...
```

"UBER" is incorrectly treated as a **section header** by `isSectionHeader()` because:
- It's ALL CAPS and >3 chars → passes the `isAllCaps` check
- The next line ("Senior Recruiter 2024 – Present") has a date, so the companion-line guard (`!nextHasDate`) doesn't reject it
- "UBER" doesn't match `COMPANY_INDICATORS` regex (no "inc", "corp", etc.)

Even if it weren't a section header, `parseExperienceEntries` can't handle the "company on its own line, then title+date on the next line" pattern.

### Fix (2 changes in `src/lib/documentImport.ts`)

**1. Fix `isSectionHeader` (line ~146):**
When an ALL CAPS line is followed by a line WITH a date, it's almost certainly a company name inside an experience block (e.g., "UBER" → "Senior Recruiter 2024 – Present"), not a section header. Add this guard:

```typescript
if (nextHasDate) return false;  // ALL CAPS + next line has date = company name, not header
```

**2. Fix `parseExperienceEntries` (line ~667-707):**
Handle the pattern where a standalone company name appears on its own line before the title+date line. When we see a non-bullet, non-date, short line AND `current` already exists with no bullets yet, treat it as a company name for the upcoming entry. When we see a line with a date and `current` exists with no bullets and no dates, merge the company context forward instead of flushing a bare entry.

Specifically:
- Before flushing on a date line, check if `current` has no bullets and no dates — if so, carry its position/company forward as the company for the new entry
- On the new entry's title/org split, if we already have a carried company, use it

### Files Changed
- `src/lib/documentImport.ts`

