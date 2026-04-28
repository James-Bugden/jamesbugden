# Score Delta Card — Design Spec
**Date:** 2026-04-28  
**Issue:** HIR-42 (parent: HIR-36)

## What We're Building

Two new cards that appear right below the `ScoreHero` on the Analyzer results screen:

1. **Baseline card** — shown when this is the user's first saved analysis. Copy: "This is your baseline. Come back after editing your resume to see your improvement."
2. **Delta card** — shown when a previous analysis exists. Shows: old score → new score, numeric change, top-contributing section (biggest positive section-score delta), and next target milestone.

Neither card is shown for anonymous (not-logged-in) users.

---

## Data Model (confirmed, no migrations needed)

Table: `resume_analyses`  
Relevant columns:
- `overall_score: number | null` — the top-level score (0–100)
- `analysis_result: Json | null` — full `AnalysisResult` blob; `analysis_result.sections[]` has `{ name: string; score: number }` per section (0–10 scale)
- `created_at: string`

The `useResumeAnalyses` hook already fetches all analyses DESC by `created_at`. No new DB work required.

---

## Architecture

### New Files

**`src/components/resume-analyzer/scoreDeltaUtils.ts`**  
Pure utility functions — no React, no side effects:
- `computeTopContributor(currentSections, previousSections)` → section name with largest positive delta, or `null` if score decreased across all sections
- `computeNextTarget(score)` → next milestone in [60, 70, 80, 90, 100] above the current score

**`src/components/resume-analyzer/__tests__/scoreDelta.test.ts`**  
Vitest unit tests covering the pure functions with known before/after fixtures.

**`src/components/resume-analyzer/ScoreDeltaCard.tsx`**  
Presentational component. Props:
```ts
{
  currentScore: number;
  currentSections: Section[];
  previousAnalysis: SavedAnalysis | null;  // null → show baseline card
  isFirstAnalysis: boolean;
  lang: Language;
}
```
Renders nothing if `!isFirstAnalysis && !previousAnalysis`.

### Modified Files

**`src/components/resume-analyzer/ResumeResults.tsx`**  
- Add props: `previousAnalysis?: SavedAnalysis | null`, `isFirstAnalysis?: boolean`
- Render `<ScoreDeltaCard />` directly below `<ScoreHero />`, above the "saved report banner"

**`src/pages/ResumeAnalyzer.tsx`**  
- Add state: `deltaPrev: SavedAnalysis | null`, `deltaIsFirst: boolean`
- In `handleSubmitResume`, before starting analysis, snapshot the current `latest` and `analyses.length` into those state vars (race-condition-free — captured before save)
- Pass `previousAnalysis={deltaPrev}` and `isFirstAnalysis={deltaIsFirst}` to `ResumeResults`
- Reset both in `onReset`

---

## Delta Calculation Logic

```
delta = currentScore - previousScore
topContributor = argmax over matched sections of (currentScore - prevScore), only if > 0
nextTarget = min(milestones) where milestone > currentScore
```

Section matching is by `name` field. Unmatched sections (name differs between analyses) are skipped.

---

## EN/ZH Copy

Baseline card:
- EN: "This is your baseline. Come back after editing your resume to see your improvement."
- ZH: "這是你的基準分數。編輯履歷後回來，看看你的進步。"

Delta card (improved):
- EN: "Your score improved from {prev} → {current} (+{delta})"
- ZH: "你的分數從 {prev} 提升至 {current}（+{delta}）"

Delta card (declined):
- EN: "Your score changed from {prev} → {current} ({delta})"
- ZH: "你的分數從 {prev} 變為 {current}（{delta}）"

Top contributor line:
- EN: "Top improvement: {sectionName}"
- ZH: "最大進步：{sectionName}"

Next target line:
- EN: "Next target: {nextTarget}"
- ZH: "下一個目標：{nextTarget}"

---

## What We're NOT Doing

- No Recharts history chart (not cheap enough given the visual design complexity)
- No new DB tables, columns, or migrations
- No change to the `?report=latest` view (delta card only shows on fresh analyses this session)
- No change to anonymous user experience (no cards)

---

## Testing

**Unit tests (Vitest):**
- `computeTopContributor` with known before/after section arrays
- `computeTopContributor` returns null when no sections improved
- `computeTopContributor` handles unmatched section names
- `computeNextTarget` for scores at various milestones

**E2e:** The existing analyzer-results e2e specs continue to pass (no regression). The delta card is auth-gated so it won't appear in existing unauthenticated tests.

---

## Acceptance Criteria Mapping

| AC | Covered by |
|----|-----------|
| Delta card on re-analysis | `ScoreDeltaCard` renders delta variant when `previousAnalysis` non-null |
| Baseline card on first analysis | `ScoreDeltaCard` renders baseline variant when `isFirstAnalysis === true` |
| Delta + top-contributor correct, covered by tests | `scoreDeltaUtils.test.ts` |
| No card for anonymous users | `deltaPrev/deltaIsFirst` only set when `isLoggedIn` |
| No regressions on results layout | existing e2e suite |
| EN + ZH copy | inline `t()` calls in `ScoreDeltaCard.tsx` |
