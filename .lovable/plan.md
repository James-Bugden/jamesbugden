## I Merge All Inline Footers into One Unified Green SiteFooter

### Problem

The screenshot shows two separate green sections stacked: the page's inline footer (social icons + copyright) and then the global SiteFooter (Guides/Tools links). These should be one compact green block.

### Approach

**1. Redesign `SiteFooter.tsx` to include everything in one compact green section**

New layout (single `bg-nav-green` block):

- Social icons row (LinkedIn, Instagram, Threads)
- Two inline link groups: Guides | Tools (horizontal on desktop, stacked on mobile)
- Copyright line in `text-cream-90`
- Compact padding throughout (`py-6`, tight gaps)

**2. Remove inline `<footer>` blocks from ~30+ page files**

Every page that has its own `<footer>` with copyright/social links needs that block removed. The SiteLayout wrapper already renders SiteFooter globally, so removing the inline ones eliminates duplication.

Affected pages (found via search — 30+ files):


| Category | Files                                                                                                                                                                                                                                                                                                                                                             |
| -------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Homepage | `Index.tsx`, `IndexZhTw.tsx`                                                                                                                                                                                                                                                                                                                                      |
| Guides   | `ResumeGuide`, `InterviewPrepGuide`, `LinkedInGuide`, `JobOfferGuide`, `CareerGameGuide`, `IkigaiGuide`, `PivotMethodGuide`, `RecruiterGuide`, `RecruiterScreenGuide`, `OfficePoliticsGuide`, `ProblemSolvingGuide`, `FortyEightLawsGuide`, `AiJobSearchGuide`, `InterviewPreparationGuide`, `LinkedInBrandingGuide`, `ResumeQuickReference` (EN + ZhTw variants) |
| Reviews  | All review pages (~16 files)                                                                                                                                                                                                                                                                                                                                      |
| Salary   | `SalaryStarterKit` (EN + ZhTw)                                                                                                                                                                                                                                                                                                                                    |
| Other    | `RecruiterGuide`, `InterviewPrepGuide` etc.                                                                                                                                                                                                                                                                                                                       |


For each file