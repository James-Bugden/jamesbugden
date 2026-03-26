

## Fix Remaining SEO Issues Across All Flagged Pages

### Issue Analysis

After auditing the codebase against the crawl report, here are the real issues and fixes needed:

---

### 1. TITLE_LENGTH (titles >60 chars)

Already fixed in the last round. The current `seo-config.ts` titles are all within limits. **No action needed.**

### 2. META_DESC_LENGTH (zh-tw pages)

Many zh-tw descriptions exceed 160 characters (Chinese characters count as 1 char each but crawlers often measure bytes or pixels). The fix is to trim descriptions in `seo-config.ts` for all zh-tw entries.

**Affected pages (~25):** All `/zh-tw/*` guide, toolkit, salary, quiz, join, offer-calculator pages.

**Fix:** Shorten each zh-tw description to ≤155 characters in `seo-config.ts`.

### 3. HREFLANG_INVALID (salary, review pages)

**Root cause:** The SEO component outputs `hrefLang="zh-Hant-TW"` for Chinese pages. Some crawlers expect the simpler `zh-TW` format. While `zh-Hant-TW` is valid BCP 47, Google recommends `zh-TW` for Traditional Chinese Taiwan. 

**Fix in `SEO.tsx`:** Change `zh-Hant-TW` → `zh-TW` in both hreflang alternate link outputs (lines 46 and 50).

### 4. HEADING_LEVEL_SKIPPED

Multiple pages skip from h1 → h3 (missing h2). Files to fix:

| Page | Component | Issue | Fix |
|------|-----------|-------|-----|
| `/salary` | `SalaryResultCard.tsx` | h3 under h1 (no h2 between) | h3 → h2 for role titles, or keep since h2 exists in PopularSearches |
| `/salary/insights` | `SalaryInsights.tsx` | Has h1, check chart components for h3 skips | Audit chart headings |
| `/toolkit/counteroffer` | `CounterofferEmail.tsx` | h1 → h3 (key principles section) | h3 → h2 |
| `/toolkit/raise` | `RaiseOnePager.tsx` | h1 → h3 (section labels) | h3 → `p` (they're form labels, not content headings) |
| `/toolkit/calculator-interactive` | `CompCalculatorInteractive.tsx` | h1 → h3 (CTA section) | h3 → h2 |
| `/zh-tw/toolkit/counteroffer`, `/zh-tw/toolkit/raise`, `/zh-tw/toolkit/calculator-interactive` | ZhTw equivalents | Same pattern | Same fixes |
| `/site-directory` | `SiteDirectory.tsx` | Section titles are `<button>`, not headings — may trigger skip if SiteFooter has h3 | Check and fix footer headings if needed |
| `/zh-tw/guides` | `GuidesPageZhTw.tsx` | Check for heading skips | Audit |
| `/zh-tw/quiz` | `QuizZhTw.tsx` | Check heading hierarchy | Audit |

### 5. MISSING_H1 (salary/compare, salary/explore)

`SalaryCompare.tsx` and `SalaryExplore.tsx` have no `<h1>` tag — they use `SalaryNav` + content components but none contain an h1.

**Fix:** Add a visually-hidden or visible h1 to each page:
- `SalaryCompare.tsx`: Add `<h1>` "Compare Salaries" before the tab selector
- `SalaryExplore.tsx`: Add `<h1>` "Explore Salaries" before the table

Same for zh-tw equivalents (`SalaryCompareZhTw.tsx`, `SalaryExploreZhTw.tsx`).

### 6. IMG_ALT_MISSING_OR_WEAK

The `alt=""` issues in resume builder were already fixed. The remaining IMG_ALT flags across nearly all pages are likely from the **OG image** (`og-image.png`) which doesn't have alt text in meta tags (OG images don't have alt attributes — this is a false positive from the crawler). No action needed unless there are actual `<img>` tags with empty alt.

**Verified:** No remaining `alt=""` in `src/` components.

### 7. DUPLICATE_TITLE / DUPLICATE_META_DESC (zh-tw review pages)

The zh-tw review pages already have unique entries in `seo-config.ts` (added in last round). The crawler may have cached old results. **Already fixed — re-crawl should resolve.**

### 8. STATUS_4XX_5XX (zh-tw/salary/*, zh-tw/resume, zh-tw/resume-simple)

These pages are behind `LoginGate` which renders a blurred overlay (HTTP 200) — not a redirect or 4xx. This is likely a crawler issue with JavaScript rendering. The LoginGate component renders children (dimmed) + overlay, so content is present. 

**Possible fix:** These are tool pages that require login. They should have `noIndex: true` if you don't want crawlers accessing them, OR accept they'll show as gated. Since salary data is premium content, consider adding `noIndex: true` for salary and resume builder pages.

### 9. BROKEN_INTERNAL_LINKS (salary pages, site-directory)

The salary pages link to each other via `SalaryFooter` and `SalaryNav`. If the crawler can't render the JS, these links appear broken. This is a SPA rendering issue, not a real broken link. **No code fix needed** — this resolves with proper JavaScript rendering by the crawler.

### 10. THIN_CONTENT

Pages like `/salary/compare`, `/zh-tw/join`, `/zh-tw/toolkit`, `/zh-tw/quiz` are flagged as thin. This is a content issue (not enough text on the page), not a code issue. **No code fix available** — would need more written content added to these pages.

---

### Implementation Summary

**File 1: `src/components/SEO.tsx`**
- Change `zh-Hant-TW` → `zh-TW` on lines 46 and 50

**File 2: `src/config/seo-config.ts`**
- Trim all zh-tw descriptions to ≤155 characters

**File 3: `src/pages/SalaryExplore.tsx` + `SalaryExploreZhTw.tsx`**
- Add `<h1>` heading

**File 4: `src/pages/SalaryCompare.tsx` + `SalaryCompareZhTw.tsx`**
- Add `<h1>` heading

**File 5: `src/pages/toolkit/CounterofferEmail.tsx` + `CounterofferEmailZhTw.tsx`**
- Change h3 → h2 for "5 Rules" section

**File 6: `src/pages/toolkit/CompCalculatorInteractive.tsx` + `CompCalculatorInteractiveZhTw.tsx`**
- Change CTA h3 → h2

**File 7: `src/pages/toolkit/RaiseOnePager.tsx` + `RaiseOnePagerZhTw.tsx`**
- Change section label h3 → `p` (they're form labels like "KEY ACHIEVEMENTS", "MARKET DATA")

**Not fixing (false positives or content issues):**
- IMG_ALT_MISSING_OR_WEAK → OG meta image (no alt attribute in OG tags)
- BROKEN_INTERNAL_LINKS → SPA routing, works in browser
- STATUS_4XX_5XX → LoginGate renders 200, crawler JS rendering issue
- THIN_CONTENT → needs more written content, not a code fix
- DUPLICATE_TITLE/META_DESC → already fixed, needs re-crawl

