

# Chinese Translation Audit — Dashboard

## Current Status: Mostly Accurate, 5 Issues Found

### Issue 1: PhaseBar — Hardcoded English labels
**File:** `src/components/dashboard/PhaseBar.tsx` (lines 5-9)
- Phase labels are hardcoded English: `"Applying"`, `"Interviewing"`, `"Negotiating"`
- Progress text `"complete"` is also hardcoded English (line 70)
- **Fix:** Accept a `lang` prop and use localized labels:
  - Applying → 投遞申請
  - Interviewing → 面試準備
  - Negotiating → 薪資談判
  - `{completedCount}/{totalCount} complete` → `{completedCount}/{totalCount} 已完成`

### Issue 2: JourneySection — Collapsed summary text is English-only
**File:** `src/components/dashboard/JourneySection.tsx` (lines 286-296)
- `buildSummary()` outputs English: `"3 resources: 2 guides, 1 template"`
- **Fix:** Localize:
  - "resources" → "項資源"
  - "guide/guides" → "指南"
  - "template/templates" → "範本"
  - "calculator/calculators" → "計算器"

### Issue 3: PickUpWhereYouLeftOff — Phase label in "next-phase" suggestion is English
**File:** `src/components/dashboard/PickUpWhereYouLeftOff.tsx` (lines 57-63)
- `phaseLabel` uses raw English phase name: `phase.charAt(0).toUpperCase() + phase.slice(1)`
- Chinese output becomes: `"準備好進入Interviewing了嗎？"` — mixes Chinese and English
- **Fix:** Map phase IDs to Chinese labels: `{ applying: "投遞申請", interviewing: "面試準備", negotiating: "薪資談判" }`

### Issue 4: NpsPulse locale mismatch
**File:** `src/pages/Dashboard.tsx`
- NpsPulse expects `"zh-tw"` but we pass `lang === "zh" ? "zh-tw" : "en"` — this is correct now.
- However, `NpsPulse` component's LABELS object uses key `"zh-tw"` (confirmed from the component code). This is fine.

### Issue 5: Minor — "offer" in OnboardingPhaseModal should be capitalized
**File:** `src/components/OnboardingPhaseModal.tsx` (line 23)
- `"我已經收到 offer"` — in Taiwan context, "Offer" is typically capitalized as it's a loanword. Minor stylistic preference, not a bug.

---

## Summary of Changes

| File | Change |
|------|--------|
| `PhaseBar.tsx` | Add `lang` prop, localize pill labels + "complete" text |
| `JourneySection.tsx` | Localize `buildSummary()` output |
| `PickUpWhereYouLeftOff.tsx` | Map phase IDs to Chinese labels in "next-phase" suggestion |
| `Dashboard.tsx` | Pass `lang` to `PhaseBar` |
| `OnboardingPhaseModal.tsx` | Capitalize "Offer" (minor) |

All other translations (tool names, journey item titles/descriptions, WhatsNewModal, section headings, search UI, CTA text) are accurate and natural-sounding Traditional Chinese for a Taiwan audience.

