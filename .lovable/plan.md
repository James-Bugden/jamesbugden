

## Fix Job Title vs Company Name Parsing in Resume Import

### Problem
The `splitTitleOrg` function in `src/lib/documentImport.ts` (line 494) always assigns the first part as `position` and the second as `company`. Many resumes use "Company | Title" or "Company — Title" format, which results in the company being placed in the job title field and vice versa.

### Solution
Add a heuristic to detect which part is the company and which is the job title, then swap if needed. The heuristic will use:

1. **Known company indicators**: Words like Inc, Corp, Ltd, LLC, Group, Technologies, Solutions, University, Bank, etc.
2. **Known job title indicators**: Words like Engineer, Manager, Director, Developer, Analyst, Designer, Lead, Senior, Junior, Intern, Associate, VP, CEO, CTO, Consultant, Coordinator, etc.
3. **Scoring system**: Score each part for "company-likeness" vs "title-likeness" and swap if the first part scores higher as a company name.

### Changes — `src/lib/documentImport.ts`

**1. Add two keyword lists** (above `splitTitleOrg`):
- `COMPANY_INDICATORS`: Inc, Corp, Ltd, LLC, GmbH, Co, Group, Technologies, Solutions, Labs, Studio, Bank, University, College, Institute, Foundation, Association, etc.
- `TITLE_INDICATORS`: Engineer, Developer, Manager, Director, Analyst, Designer, Architect, Lead, Senior, Junior, Intern, Associate, VP, President, CEO, CTO, CFO, Consultant, Coordinator, Specialist, Administrator, Officer, Head, Principal, Staff, Fellow, etc.

**2. Add a `looksLikeCompany(text)` function** that returns a score based on how many company indicators appear in the text.

**3. Add a `looksLikeTitle(text)` function** that returns a score based on how many title indicators appear.

**4. Modify `splitTitleOrg`** to check after splitting: if `primary` scores higher as a company than as a title, AND `secondary` scores higher as a title than as a company, swap them.

**5. Apply same logic in `parseExperienceEntries`** continuation lines (line 569-576) where `current.company` is assigned — if the line looks more like a job title, swap with position.

### One file changed
- `src/lib/documentImport.ts`

