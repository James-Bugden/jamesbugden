

## Improve Resume Import Section Mapping Accuracy

### Current Issues

1. **ALL-CAPS false positives**: `isSectionHeader` treats any ALL-CAPS short line (≤5 words) as a section header. Company names like "GOOGLE", "IBM", "TSMC" or degree names like "MBA" get misidentified as section breaks, splitting content into wrong sections.

2. **Education degree vs institution swap**: `splitTitleOrg` only applies `smartSwap` for experience entries (`isExperience: true`). Education lines like "MIT | B.S. Computer Science" don't get institution/degree distinguished.

3. **Date-only lines start new entries**: A line containing only a date range (no title text) triggers a new entry with an empty position, instead of attaching the date to the current entry.

4. **Multi-line entries break apart**: When title and company appear on separate lines (common in PDF extraction), the second line can trigger a new entry instead of being merged as the company/institution for the current one.

5. **No validation against known section types before ALL-CAPS heuristic**: The ALL-CAPS check at line 133 fires before checking if the text is actually a recognized section keyword.

### Changes — `src/lib/documentImport.ts`

**1. Harden `isSectionHeader` against false positives**
- After the ALL-CAPS check, add a negative filter: if the ALL-CAPS line matches `COMPANY_INDICATORS` or `TITLE_INDICATORS`, return false (it's a company/job title, not a section header)
- Also reject ALL-CAPS lines that are only 1 word and fewer than 4 characters (e.g., "IBM", "SAP", "MBA")
- Add a contextual check: peek at the next line — if it also looks like a short non-bullet line (suggesting it's a title/company pair), don't treat the current line as a header

**2. Add education-specific smart swap**
- Add `INSTITUTION_INDICATORS` regex: `university|college|institute|school|academy|polytechnic|conservatory`
- Add `DEGREE_INDICATORS` regex: `b\.?s\.?|b\.?a\.?|m\.?s\.?|m\.?a\.?|m\.?b\.?a\.?|ph\.?d|bachelor|master|doctor|diploma|associate|certificate|degree`
- Create `educationSmartSwap(primary, secondary)` that swaps if primary looks like an institution and secondary looks like a degree
- Call this in `splitTitleOrg` when `isExperience` is false (add a third parameter or refactor to pass section type)

**3. Handle date-only lines as continuation**
- In `parseExperienceEntries` and `parseEducationEntries`, before starting a new entry when `dates` is found, check if the remaining text (after removing the date string) is empty or very short (<3 chars)
- If so, and `current` exists, attach the date to `current` instead of flushing and creating a new entry

**4. Improve multi-line entry merging in experience parser**
- In the continuation branch (line 624), when `current` has no company yet and the line has no date and no bullet marker, be more aggressive about treating it as company info rather than a bullet — raise the threshold and remove the `line.length < 60` guard (use `< 80` instead since company names with locations can be longer)

### Files changed
- `src/lib/documentImport.ts`

