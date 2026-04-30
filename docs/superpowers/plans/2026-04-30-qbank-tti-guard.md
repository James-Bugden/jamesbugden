# Q-Bank TTI Regression Guard Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Add a `useQBankTTIGuard` hook to `/interview-questions` that emits a structured `console.warn` when the component's first data-load exceeds 2,500 ms, leaving a `qbank:tti` PerformanceTimeline entry for future automation.

**Architecture:** Extract all timing logic into a single `useQBankTTIGuard(loading: boolean)` hook. The hook places a `performance.mark` on mount and a second mark + `performance.measure` on the first `loading → false` transition. If the measured duration exceeds 2,500 ms it emits a structured `console.warn`. The component receives only one new line of code.

**Tech Stack:** React (`useEffect`, `useRef`), Web Performance API (`performance.mark`, `performance.measure`, `performance.getEntriesByName`), Vitest + `@testing-library/react` (`renderHook`).

---

## File Map

| File | Role |
|---|---|
| `src/hooks/useQBankTTIGuard.ts` | **New** — hook: marks, measures, warns |
| `src/test/qbankTTIGuard.test.ts` | **New** — three Vitest cases via `renderHook` |
| `src/components/interview-questions/InterviewQuestionBank.tsx` | **Edit** — add one `useQBankTTIGuard(loading)` call |

---

### Task 1: Write the failing test

**Files:**
- Create: `src/test/qbankTTIGuard.test.ts`

- [ ] **Step 1: Create the test file**

```typescript
// src/test/qbankTTIGuard.test.ts
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useQBankTTIGuard } from "@/hooks/useQBankTTIGuard";

describe("useQBankTTIGuard", () => {
  let warnSpy: ReturnType<typeof vi.spyOn>;

  beforeEach(() => {
    vi.spyOn(globalThis.performance, "mark").mockImplementation(
      () => ({} as PerformanceMark)
    );
    vi.spyOn(globalThis.performance, "measure").mockImplementation(
      () => ({} as PerformanceMeasure)
    );
    warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("emits console.warn when TTI exceeds 2500 ms", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 3124 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => {
      rerender({ loading: false });
    });

    expect(warnSpy).toHaveBeenCalledOnce();
    expect(warnSpy).toHaveBeenCalledWith("[qbank] TTI regression detected", {
      tti_ms: 3124,
      threshold_ms: 2500,
      mark: "qbank:tti",
    });
  });

  it("does not emit console.warn when TTI is within threshold", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 1500 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => {
      rerender({ loading: false });
    });

    expect(warnSpy).not.toHaveBeenCalled();
  });

  it("only measures once per mount even if loading toggles again", () => {
    vi.spyOn(globalThis.performance, "getEntriesByName").mockReturnValue([
      { duration: 3000 } as PerformanceMeasure,
    ]);

    const { rerender } = renderHook(
      ({ loading }: { loading: boolean }) => useQBankTTIGuard(loading),
      { initialProps: { loading: true } }
    );

    act(() => { rerender({ loading: false }); });
    act(() => { rerender({ loading: true }); });
    act(() => { rerender({ loading: false }); });

    expect(warnSpy).toHaveBeenCalledOnce();
  });
});
```

- [ ] **Step 2: Run the tests to confirm they fail with "module not found"**

```bash
cd /home/paperclip/code/jamesbugden && npx vitest run src/test/qbankTTIGuard.test.ts
```

Expected output: failure mentioning `Cannot find module '@/hooks/useQBankTTIGuard'` (or similar). **Do not proceed until you see this failure — confirms the test file is wired up correctly.**

---

### Task 2: Implement the hook

**Files:**
- Create: `src/hooks/useQBankTTIGuard.ts`

- [ ] **Step 3: Write the hook**

```typescript
// src/hooks/useQBankTTIGuard.ts
import { useEffect, useRef } from "react";

const MARK_START = "qbank:start";
const MARK_INTERACTIVE = "qbank:interactive";
const MEASURE_NAME = "qbank:tti";
const TTI_THRESHOLD_MS = 2500;

export function useQBankTTIGuard(loading: boolean): void {
  const measured = useRef(false);

  useEffect(() => {
    performance.mark(MARK_START);
  }, []);

  useEffect(() => {
    if (loading || measured.current) return;
    measured.current = true;
    performance.mark(MARK_INTERACTIVE);
    performance.measure(MEASURE_NAME, MARK_START, MARK_INTERACTIVE);
    const entries = performance.getEntriesByName(
      MEASURE_NAME,
      "measure"
    ) as PerformanceMeasure[];
    const tti_ms = entries[entries.length - 1]?.duration ?? 0;
    if (tti_ms > TTI_THRESHOLD_MS) {
      console.warn("[qbank] TTI regression detected", {
        tti_ms,
        threshold_ms: TTI_THRESHOLD_MS,
        mark: MEASURE_NAME,
      });
    }
  }, [loading]);
}
```

- [ ] **Step 4: Run the tests to confirm all three pass**

```bash
cd /home/paperclip/code/jamesbugden && npx vitest run src/test/qbankTTIGuard.test.ts
```

Expected output:
```
 ✓ src/test/qbankTTIGuard.test.ts (3)
   ✓ useQBankTTIGuard > emits console.warn when TTI exceeds 2500 ms
   ✓ useQBankTTIGuard > does not emit console.warn when TTI is within threshold
   ✓ useQBankTTIGuard > only measures once per mount even if loading toggles again

 Test Files  1 passed (1)
 Tests       3 passed (3)
```

If any test fails, re-read the test expectations and the hook. The most common issue is the `entries.length - 1` index vs `entries[0]` — choose the last entry because jsdom may have accumulated earlier entries from previous tests. Fix and re-run before proceeding.

- [ ] **Step 5: Commit hook + tests**

```bash
cd /home/paperclip/code/jamesbugden
git add src/hooks/useQBankTTIGuard.ts src/test/qbankTTIGuard.test.ts
git commit -m "$(cat <<'EOF'
feat: add useQBankTTIGuard hook for /q-bank TTI observability

Logs a structured console.warn when the first Supabase data load on
/interview-questions exceeds 2500 ms. Marks qbank:start on mount and
qbank:interactive on first loading→false, leaving a qbank:tti entry
in the PerformanceTimeline for future smoke-test assertions.

Closes HIR-337 (partially — component wiring in next commit).

Co-Authored-By: Paperclip Engineering <noreply@paperclip.sh>
EOF
)"
```

---

### Task 3: Wire the hook into the component

**Files:**
- Modify: `src/components/interview-questions/InterviewQuestionBank.tsx`

- [ ] **Step 6: Add the import**

In `src/components/interview-questions/InterviewQuestionBank.tsx`, add the import after line 19 (the last existing import):

```typescript
import { useQBankTTIGuard } from "@/hooks/useQBankTTIGuard";
```

- [ ] **Step 7: Call the hook**

Inside `InterviewQuestionBank` (the exported default function), add a single call immediately after the existing `trackTool` effect block (after line 210, before the `// Fetch category counts once on mount` comment). Place it with the other hooks at the top of the function body:

```typescript
useQBankTTIGuard(loading);
```

That is the only change to this file. No other lines should be modified.

- [ ] **Step 8: Run type-check**

```bash
cd /home/paperclip/code/jamesbugden && npx tsc --noEmit
```

Expected: zero errors. If TypeScript reports errors about `PerformanceMeasure` not being typed, they will be in the hook file — ensure `tsconfig.json` targets `lib: ["dom"]` (it does, this is a Vite/React project).

- [ ] **Step 9: Run banned-patterns check**

```bash
cd /home/paperclip/code/jamesbugden && node scripts/banned-patterns.mjs
```

Expected: `banned-patterns: clean`. `console.warn` is NOT banned (only `console.log` is). If it reports a violation, read the error and fix.

- [ ] **Step 10: Run the full test suite**

```bash
cd /home/paperclip/code/jamesbugden && npx vitest run
```

Expected: all existing tests pass, plus 3 new `useQBankTTIGuard` tests. If any pre-existing test fails, note it as pre-existing in the PR body — do not fix unrelated failures in this branch.

- [ ] **Step 11: Commit component wiring**

```bash
cd /home/paperclip/code/jamesbugden
git add src/components/interview-questions/InterviewQuestionBank.tsx
git commit -m "$(cat <<'EOF'
feat: wire useQBankTTIGuard into InterviewQuestionBank

Activates the TTI regression guard on /interview-questions.
No UI change — purely observability (HIR-337).

Co-Authored-By: Paperclip Engineering <noreply@paperclip.sh>
EOF
)"
```

---

### Task 4: Open PR and hand off

- [ ] **Step 12: Push the branch**

```bash
cd /home/paperclip/code/jamesbugden && git push -u origin feat/hir-337-qbank-tti-guard
```

Wait — check the current branch name first:

```bash
git branch --show-current
```

If the branch is not yet named `feat/hir-337-qbank-tti-guard`, create it before pushing:

```bash
git checkout -b feat/hir-337-qbank-tti-guard
git push -u origin feat/hir-337-qbank-tti-guard
```

- [ ] **Step 13: Run self-review**

Invoke `superpowers:code-reviewer` on the diff:

```bash
git diff origin/main...HEAD
```

Treat its output as a real review. Fix or explicitly defer each finding before opening the PR.

- [ ] **Step 14: Open draft PR**

```bash
gh pr create --draft \
  --title "feat: add TTI regression guard to /q-bank (HIR-337)" \
  --body "$(cat <<'EOF'
## Summary

- Adds `useQBankTTIGuard` hook that measures time from component mount to first Supabase data load completion on `/interview-questions`
- Emits a structured `console.warn` if that duration exceeds 2,500 ms (current p50 is ~1.5 s, giving 1,000 ms headroom)
- Leaves `qbank:tti` PerformanceTimeline entry readable by future smoke tests via `performance.getEntriesByName('qbank:tti', 'measure')`

## Test plan

- [x] `useQBankTTIGuard` — 3 unit tests (slow load warns, fast load silent, only fires once)
- [x] `npx tsc --noEmit` — zero errors
- [x] `node scripts/banned-patterns.mjs` — clean
- [x] Full Vitest suite — all pass
- [ ] No Playwright e2e needed (no UI change)

## Tier classification

**Tier 1** — observability only, no user-visible change, no auth/payments/schema/nav touch.

## Paperclip issue

HIR-337
EOF
)"
```

- [ ] **Step 15: Comment on the Paperclip issue and set status to `in_review`**

Use the `paperclip` skill to:
1. Post a comment on HIR-337: `"PR open: <pr-url> — ready for Director Engineering review. Tier 1 (observability only)."`
2. Set issue status to `in_review`.

---

## Self-Review Checklist

**Spec coverage:**
- [x] Performance guard logs structured warning when TTI > 2.5 s → Task 2 Step 3
- [x] No visible UI change → Task 3 only adds one hook call
- [x] PR opened, passing tests → Task 4

**Placeholder scan:** No TBDs, no "implement later", all code blocks complete.

**Type consistency:**
- `MEASURE_NAME = "qbank:tti"` used in both `performance.measure(MEASURE_NAME, ...)` and `performance.getEntriesByName(MEASURE_NAME, "measure")` and the warn payload `mark: MEASURE_NAME` — consistent.
- `MARK_START = "qbank:start"` and `MARK_INTERACTIVE = "qbank:interactive"` defined once, used in both effects — consistent.
- `TTI_THRESHOLD_MS = 2500` used in both the `if` guard and the warn payload `threshold_ms: TTI_THRESHOLD_MS` — consistent.
