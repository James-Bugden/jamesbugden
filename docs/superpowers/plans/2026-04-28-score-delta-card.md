# Score Delta Card Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a score delta card (and baseline card for first-time analyses) below the ScoreHero on the Analyzer results screen, visible only to logged-in users.

**Architecture:** Pure delta-computation logic lives in `scoreDeltaUtils.ts` (unit-testable, no React); a new `ScoreDeltaCard.tsx` presentational component renders either the baseline or delta variant; `ResumeResults.tsx` receives the previous analysis as a prop and delegates rendering to the card; `ResumeAnalyzer.tsx` snapshots the pre-save analysis state before triggering analysis so there's no race condition with the async save.

**Tech Stack:** React, TypeScript, Tailwind, shadcn/ui CSS variables, Vitest (unit tests), Playwright e2e (no new specs needed — existing unauthenticated suite is unaffected).

---

## File Map

| Action | Path | Responsibility |
|--------|------|----------------|
| Create | `src/components/resume-analyzer/scoreDeltaUtils.ts` | Pure functions: `computeTopContributor`, `computeNextTarget` |
| Create | `src/components/resume-analyzer/__tests__/scoreDelta.test.ts` | Vitest unit tests for those functions |
| Create | `src/components/resume-analyzer/ScoreDeltaCard.tsx` | Baseline/delta card UI component |
| Modify | `src/components/resume-analyzer/ResumeResults.tsx` | Add `previousAnalysis?` + `isFirstAnalysis?` props; render `ScoreDeltaCard` |
| Modify | `src/pages/ResumeAnalyzer.tsx` | Snapshot pre-save state; pass props to `ResumeResults`; reset on re-analyze |

---

## Task 1: Write failing unit tests for `scoreDeltaUtils`

**Files:**
- Create: `src/components/resume-analyzer/__tests__/scoreDelta.test.ts`

- [ ] **Step 1: Create the test file**

```typescript
// src/components/resume-analyzer/__tests__/scoreDelta.test.ts
import { describe, it, expect } from "vitest";
import {
  computeTopContributor,
  computeNextTarget,
} from "../scoreDeltaUtils";
import type { Section } from "../types";

const makeSection = (name: string, score: number): Section => ({
  name,
  score,
  summary: "",
  findings: [],
});

describe("computeTopContributor", () => {
  it("returns the section with the largest positive delta", () => {
    const prev: Section[] = [
      makeSection("Work Experience", 5),
      makeSection("Skills", 6),
      makeSection("Education", 7),
    ];
    const curr: Section[] = [
      makeSection("Work Experience", 8),  // +3
      makeSection("Skills", 7),           // +1
      makeSection("Education", 7),        // 0
    ];
    expect(computeTopContributor(curr, prev)).toBe("Work Experience");
  });

  it("returns null when no section improved", () => {
    const prev: Section[] = [makeSection("Work Experience", 8)];
    const curr: Section[] = [makeSection("Work Experience", 7)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("returns null when all deltas are zero", () => {
    const prev: Section[] = [makeSection("Skills", 6)];
    const curr: Section[] = [makeSection("Skills", 6)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("ignores sections whose name does not match between analyses", () => {
    const prev: Section[] = [makeSection("Contact Info", 9)];
    const curr: Section[] = [makeSection("Summary", 5)];
    expect(computeTopContributor(curr, prev)).toBeNull();
  });

  it("handles empty arrays without throwing", () => {
    expect(computeTopContributor([], [])).toBeNull();
  });
});

describe("computeNextTarget", () => {
  it("returns 60 when score is below 60", () => {
    expect(computeNextTarget(45)).toBe(60);
  });

  it("returns 70 when score is exactly 60", () => {
    expect(computeNextTarget(60)).toBe(70);
  });

  it("returns 80 when score is between 70 and 80", () => {
    expect(computeNextTarget(74)).toBe(80);
  });

  it("returns 90 when score is between 80 and 90", () => {
    expect(computeNextTarget(83)).toBe(90);
  });

  it("returns 100 when score is 90", () => {
    expect(computeNextTarget(90)).toBe(100);
  });

  it("returns 100 when score is already 100", () => {
    expect(computeNextTarget(100)).toBe(100);
  });
});
```

- [ ] **Step 2: Run tests — confirm they fail with "Cannot find module"**

```bash
cd /tmp/hir-42 && npx vitest run src/components/resume-analyzer/__tests__/scoreDelta.test.ts 2>&1 | tail -20
```

Expected: `Error: Cannot find module '../scoreDeltaUtils'`

---

## Task 2: Implement `scoreDeltaUtils.ts`

**Files:**
- Create: `src/components/resume-analyzer/scoreDeltaUtils.ts`

- [ ] **Step 1: Create the utility module**

```typescript
// src/components/resume-analyzer/scoreDeltaUtils.ts
import type { Section } from "./types";

export function computeTopContributor(
  currentSections: Section[],
  previousSections: Section[]
): string | null {
  let maxDelta = 0;
  let topSection: string | null = null;
  for (const section of currentSections) {
    const prev = previousSections.find((s) => s.name === section.name);
    if (prev === undefined) continue;
    const delta = section.score - prev.score;
    if (delta > maxDelta) {
      maxDelta = delta;
      topSection = section.name;
    }
  }
  return topSection;
}

const MILESTONES = [60, 70, 80, 90, 100] as const;

export function computeNextTarget(score: number): number {
  return MILESTONES.find((m) => m > score) ?? 100;
}
```

- [ ] **Step 2: Run tests — confirm they pass**

```bash
cd /tmp/hir-42 && npx vitest run src/components/resume-analyzer/__tests__/scoreDelta.test.ts 2>&1 | tail -20
```

Expected: `✓ 10 tests passed`

- [ ] **Step 3: Commit**

```bash
cd /tmp/hir-42
git add src/components/resume-analyzer/scoreDeltaUtils.ts \
        src/components/resume-analyzer/__tests__/scoreDelta.test.ts
git commit -m "$(cat <<'EOF'
feat(analyzer): add score delta utility functions with unit tests

computeTopContributor finds the section with the largest improvement
between two analyses; computeNextTarget returns the next score milestone.
Both are pure functions so they can be tested in isolation.

Co-Authored-By: Paperclip <noreply@paperclip.ing>
EOF
)"
```

---

## Task 3: Create `ScoreDeltaCard.tsx`

**Files:**
- Create: `src/components/resume-analyzer/ScoreDeltaCard.tsx`

- [ ] **Step 1: Create the component**

```typescript
// src/components/resume-analyzer/ScoreDeltaCard.tsx
import { TrendingUp, TrendingDown, Minus, Target } from "lucide-react";
import { computeTopContributor, computeNextTarget } from "./scoreDeltaUtils";
import type { Section } from "./types";
import type { SavedAnalysis } from "@/hooks/useResumeAnalyses";

type Language = "en" | "zh-TW";
const t = (lang: Language, en: string, zh: string) =>
  lang === "en" ? en : zh;

interface ScoreDeltaCardProps {
  currentScore: number;
  currentSections: Section[];
  previousAnalysis: SavedAnalysis | null;
  isFirstAnalysis: boolean;
  lang: Language;
}

export function ScoreDeltaCard({
  currentScore,
  currentSections,
  previousAnalysis,
  isFirstAnalysis,
  lang,
}: ScoreDeltaCardProps) {
  if (!isFirstAnalysis && !previousAnalysis) return null;

  // ── Baseline card ──────────────────────────────────────────────
  if (isFirstAnalysis) {
    return (
      <div
        className="rounded-2xl p-5 text-center"
        style={{
          backgroundColor: "hsl(var(--card))",
          border: "1px solid rgba(43,71,52,0.1)",
          boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
        }}
      >
        <div className="text-3xl mb-2">📊</div>
        <p className="font-semibold text-sm mb-1" style={{ color: "hsl(var(--foreground))" }}>
          {t(lang, "This is your baseline", "這是你的基準分數")}
        </p>
        <p className="text-sm" style={{ color: "hsl(var(--muted-foreground))" }}>
          {t(
            lang,
            "Come back after editing your resume to see your improvement.",
            "編輯履歷後回來，看看你的進步。"
          )}
        </p>
      </div>
    );
  }

  // ── Delta card ─────────────────────────────────────────────────
  const prevScore = previousAnalysis!.overall_score ?? 0;
  const delta = currentScore - prevScore;
  const improved = delta > 0;
  const unchanged = delta === 0;

  const prevSections: Section[] =
    (previousAnalysis!.analysis_result as { sections?: Section[] } | null)
      ?.sections ?? [];
  const topContributor = computeTopContributor(currentSections, prevSections);
  const nextTarget = computeNextTarget(currentScore);

  const deltaColor = improved
    ? "hsl(var(--executive-green))"
    : unchanged
    ? "hsl(var(--muted-foreground))"
    : "hsl(var(--destructive))";

  const DeltaIcon = improved ? TrendingUp : unchanged ? Minus : TrendingDown;

  return (
    <div
      className="rounded-2xl p-5"
      style={{
        backgroundColor: "hsl(var(--card))",
        border: `1px solid ${improved ? "rgba(43,71,52,0.2)" : "rgba(43,71,52,0.1)"}`,
        boxShadow: "0 2px 8px rgba(0,0,0,0.04)",
      }}
    >
      {/* Score row */}
      <div className="flex items-center justify-center gap-3 mb-3">
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {prevScore}
        </span>
        <span className="text-muted-foreground">→</span>
        <span
          className="text-2xl font-bold tabular-nums"
          style={{ color: "hsl(var(--foreground))" }}
        >
          {currentScore}
        </span>
        <span
          className="inline-flex items-center gap-1 text-base font-semibold"
          style={{ color: deltaColor }}
        >
          <DeltaIcon className="w-4 h-4" />
          {improved ? `+${delta}` : delta}
        </span>
      </div>

      {/* Headline */}
      <p
        className="text-sm font-semibold text-center mb-2"
        style={{ color: "hsl(var(--foreground))" }}
      >
        {improved
          ? t(
              lang,
              `Your score improved from ${prevScore} → ${currentScore}`,
              `你的分數從 ${prevScore} 提升至 ${currentScore}`
            )
          : unchanged
          ? t(lang, "Your score is the same as last time", "你的分數與上次相同")
          : t(
              lang,
              `Your score changed from ${prevScore} → ${currentScore}`,
              `你的分數從 ${prevScore} 變為 ${currentScore}`
            )}
      </p>

      {/* Top contributor */}
      {topContributor && (
        <p
          className="text-xs text-center mb-1"
          style={{ color: "hsl(var(--muted-foreground))" }}
        >
          {t(lang, "Top improvement:", "最大進步：")}
          {" "}
          <span
            className="font-semibold"
            style={{ color: "hsl(var(--executive-green))" }}
          >
            {topContributor}
          </span>
        </p>
      )}

      {/* Next target */}
      <div
        className="flex items-center justify-center gap-1.5 mt-2"
        style={{ color: "hsl(var(--muted-foreground))" }}
      >
        <Target className="w-3.5 h-3.5" style={{ color: "hsl(var(--gold))" }} />
        <p className="text-xs">
          {t(lang, `Next target: ${nextTarget}`, `下一個目標：${nextTarget}`)}
        </p>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Type-check**

```bash
cd /tmp/hir-42 && npx tsc --noEmit 2>&1 | grep -E "ScoreDeltaCard|scoreDeltaUtils" | head -20
```

Expected: no output (zero errors in new files).

---

## Task 4: Wire `ScoreDeltaCard` into `ResumeResults.tsx`

**Files:**
- Modify: `src/components/resume-analyzer/ResumeResults.tsx`

- [ ] **Step 1: Add imports after line 16 (`import { usePrintUsage } from "@/hooks/usePrintUsage";`)**

```typescript
import { ScoreDeltaCard } from "./ScoreDeltaCard";
import type { SavedAnalysis } from "@/hooks/useResumeAnalyses";
```

- [ ] **Step 2: Extend the props interface (lines 521–535)**

Find:
```typescript
export default function ResumeResults({
  analysis,
  lang,
  onReset,
  isUnlocked = true,
  resumeImageUrl,
  resumeText,
}: {
  analysis: AnalysisResult;
  lang: Language;
  onReset?: () => void;
  isUnlocked?: boolean;
  resumeImageUrl?: string | null;
  resumeText?: string;
})
```

Replace with:
```typescript
export default function ResumeResults({
  analysis,
  lang,
  onReset,
  isUnlocked = true,
  resumeImageUrl,
  resumeText,
  previousAnalysis,
  isFirstAnalysis,
}: {
  analysis: AnalysisResult;
  lang: Language;
  onReset?: () => void;
  isUnlocked?: boolean;
  resumeImageUrl?: string | null;
  resumeText?: string;
  previousAnalysis?: SavedAnalysis | null;
  isFirstAnalysis?: boolean;
})
```

- [ ] **Step 3: Render ScoreDeltaCard below ScoreHero (around lines 563–566)**

Find:
```tsx
        {/* Overall Score */}
        <div className="text-center">
          <ScoreHero score={analysis.overall_score} lang={lang} />
        </div>
```

Replace with:
```tsx
        {/* Overall Score */}
        <div className="text-center">
          <ScoreHero score={analysis.overall_score} lang={lang} />
        </div>

        {/* Score delta / baseline card — only for logged-in users */}
        {isUnlocked && (isFirstAnalysis || previousAnalysis) && (
          <ScoreDeltaCard
            currentScore={analysis.overall_score}
            currentSections={analysis.sections}
            previousAnalysis={previousAnalysis ?? null}
            isFirstAnalysis={!!isFirstAnalysis}
            lang={lang}
          />
        )}
```

- [ ] **Step 4: Type-check**

```bash
cd /tmp/hir-42 && npx tsc --noEmit 2>&1 | grep -E "ResumeResults|ScoreDeltaCard" | head -20
```

Expected: no output.

---

## Task 5: Wire delta context capture into `ResumeAnalyzer.tsx`

**Files:**
- Modify: `src/pages/ResumeAnalyzer.tsx`

- [ ] **Step 1: Add import for `SavedAnalysis` type**

At the top of the import block, `useResumeAnalyses` is already imported (line 19). Extend it:

Find:
```typescript
import { useResumeAnalyses } from "@/hooks/useResumeAnalyses";
```

Replace with:
```typescript
import { useResumeAnalyses } from "@/hooks/useResumeAnalyses";
import type { SavedAnalysis } from "@/hooks/useResumeAnalyses";
```

- [ ] **Step 2: Add delta state variables after existing `useState` calls (after line 51 `const [showLimitModal, setShowLimitModal] = useState(false);`)**

```typescript
  const [deltaPrev, setDeltaPrev] = useState<SavedAnalysis | null>(null);
  const [deltaIsFirst, setDeltaIsFirst] = useState(false);
```

- [ ] **Step 3: Snapshot pre-save state in `handleSubmitResume`**

In `handleSubmitResume`, right after `setError("");` (line 225) and before the `if (limitReached)` block, add:

```typescript
    if (isLoggedIn) {
      setDeltaPrev(latest);
      setDeltaIsFirst(!analysesLoading && analyses.length === 0);
    }
```

- [ ] **Step 4: Pass the new props to `<ResumeResults>`**

Find:
```tsx
          <ResumeResults
            analysis={analysisResult}
            lang={lang}
            isUnlocked={isLoggedIn}
            resumeImageUrl={resumeImageUrl}
            resumeText={resumeText}
            onReset={() => {
```

Replace with:
```tsx
          <ResumeResults
            analysis={analysisResult}
            lang={lang}
            isUnlocked={isLoggedIn}
            resumeImageUrl={resumeImageUrl}
            resumeText={resumeText}
            previousAnalysis={deltaPrev}
            isFirstAnalysis={deltaIsFirst}
            onReset={() => {
```

- [ ] **Step 5: Reset delta state in `onReset`**

Inside the `onReset` callback, add before the existing resets:

```typescript
              setDeltaPrev(null);
              setDeltaIsFirst(false);
```

- [ ] **Step 6: Full type-check**

```bash
cd /tmp/hir-42 && npx tsc --noEmit 2>&1 | head -40
```

Expected: exit 0, no errors.

- [ ] **Step 7: Run unit tests**

```bash
cd /tmp/hir-42 && npx vitest run src/components/resume-analyzer/__tests__/scoreDelta.test.ts 2>&1 | tail -10
```

Expected: `✓ 10 tests passed`

---

## Task 6: Final commit and draft PR

- [ ] **Step 1: Stage and commit wiring changes + docs**

```bash
cd /tmp/hir-42 && git add \
  src/components/resume-analyzer/ScoreDeltaCard.tsx \
  src/components/resume-analyzer/ResumeResults.tsx \
  src/pages/ResumeAnalyzer.tsx \
  docs/superpowers/specs/2026-04-28-score-delta-card-design.md \
  docs/superpowers/plans/2026-04-28-score-delta-card.md
git commit -m "$(cat <<'EOF'
feat(analyzer): add score delta + baseline card for logged-in users

Shows old→new score, top-contributing section, and next score milestone
when a logged-in user re-analyzes their resume. Shows a baseline prompt
on their first analysis. Anonymous users see neither card.

Part of HIR-36 variable-reward loop / Rewards of the Self.
Closes HIR-42.

Co-Authored-By: Paperclip <noreply@paperclip.ing>
EOF
)"
```

- [ ] **Step 2: Push branch**

```bash
cd /tmp/hir-42 && git push -u origin feat/hir-42-score-delta-card
```

- [ ] **Step 3: Open draft PR via `gh`**

```bash
cd /tmp/hir-42 && gh pr create --draft \
  --title "feat(analyzer): score delta + baseline card for logged-in users [HIR-42]" \
  --body "$(cat <<'EOF'
## Summary

- Adds a **score delta card** below the ScoreHero when a logged-in user re-analyzes: shows old→new score, numeric delta, top-contributing section (biggest section-score gain), and next milestone (HIR-36 variable-reward, Rewards of the Self phase).
- Adds a **baseline card** on a user's first analysis to prime the return visit loop.
- Anonymous users see neither card — no regression to unauthenticated flows.

## Test plan

- [ ] `npx vitest run src/components/resume-analyzer/__tests__/scoreDelta.test.ts` — 10 unit tests pass
- [ ] `npx tsc --noEmit` — zero type errors
- [ ] Existing unauthenticated e2e analyzer specs pass unchanged
- [ ] Manual: log in → analyze once → baseline card visible below score
- [ ] Manual: log in → analyze again → delta card shows prev→current change

## Spec

`docs/superpowers/specs/2026-04-28-score-delta-card-design.md`

## Tier classification

**Tier 2** — new feature visible to logged-in users, touches results layout. Requires Director Engineering review before merge.

## References

- Paperclip: [HIR-42](/HIR/issues/HIR-42) (parent: [HIR-36](/HIR/issues/HIR-36))
EOF
)"
```

- [ ] **Step 4: Post PR link to Paperclip issue and set `in_review`**

Use the Paperclip API to post a comment with the PR URL, update status to `in_review`, and reassign to Director Engineering.

---

## Self-Review

**Spec coverage:**
- ✅ Delta card on re-analysis → Tasks 3–5
- ✅ Baseline card on first analysis → Task 3 (isFirstAnalysis branch)
- ✅ Delta + top-contributor correct, covered by tests → Tasks 1–2
- ✅ No card for anonymous users → `isUnlocked` gate in Task 4 + `isLoggedIn` guard in Task 5
- ✅ No regressions on results layout → existing e2e unchanged (card is auth-gated)
- ✅ EN + ZH copy → `t()` calls in ScoreDeltaCard

**Placeholder scan:** None found.

**Type consistency:** `SavedAnalysis`, `Section`, `Language`, `computeTopContributor`, `computeNextTarget` all consistent across Tasks 1–5.
