# Design: /q-bank TTI Regression Guard

**Issue:** HIR-337  
**Date:** 2026-04-30  
**Status:** Approved (autonomous)

## Goal

Add a client-side performance timing guard to `/interview-questions` (/q-bank) that emits a structured `console.warn` when Time-to-Interactive (TTI) exceeds 2,500 ms. No UI change. Purely observability.

## Baseline

Current p50 load time is ~1.5 s. The guard threshold of 2,500 ms gives 1,000 ms of headroom before alerting. The mark `qbank:tti` persists in the PerformanceTimeline so future smoke tests can read it without parsing console output.

## Approach: Custom hook + `performance.mark/measure`

### Why this approach

- Uses the Web Performance API as the issue spec suggests.
- Extracting a `useQBankTTIGuard` hook isolates the observability concern from the 1,100-line component.
- The hook is testable with `renderHook` + mocked performance API, no Supabase mocking needed.
- `performance.getEntriesByName('qbank:tti', 'measure')` gives future automation a machine-readable signal.

### What "interactive" means here

The practical proxy for TTI is the first `loading: true → false` transition in `InterviewQuestionBank`. This is when the initial page of questions has been fetched from Supabase and rendered, and the user can read and interact with the list. It is not a browser-standard TTI measure, but it is the component-level readiness signal.

## Files touched

| File | Change |
|---|---|
| `src/hooks/useQBankTTIGuard.ts` | **New** — hook implementation |
| `src/test/qbankTTIGuard.test.ts` | **New** — Vitest unit tests |
| `src/components/interview-questions/InterviewQuestionBank.tsx` | Add one `useQBankTTIGuard(loading)` call |

Files NOT touched: anything under `src/components/resume-builder/`, `src/lib/resumePdf/`, supabase migrations, SEO, i18n.

## Hook contract

```typescript
// src/hooks/useQBankTTIGuard.ts
useQBankTTIGuard(loading: boolean): void
```

- **On mount**: `performance.mark('qbank:start')`
- **On first `loading → false`**: `performance.mark('qbank:interactive')`, `performance.measure('qbank:tti', 'qbank:start', 'qbank:interactive')`
- **If `tti_ms > 2500`**: `console.warn('[qbank] TTI regression detected', { tti_ms, threshold_ms: 2500, mark: 'qbank:tti' })`
- Measures **exactly once** per component mount (ref guard).

## Structured warning shape

```json
{
  "tti_ms": 3124,
  "threshold_ms": 2500,
  "mark": "qbank:tti"
}
```

## Tests

Three cases in `src/test/qbankTTIGuard.test.ts`:

1. **Slow load (TTI > 2500 ms)** — mock `getEntriesByName` to return `duration: 3000`, assert `console.warn` called with expected payload.
2. **Fast load (TTI ≤ 2500 ms)** — mock returns `duration: 1500`, assert `console.warn` NOT called.
3. **Only fires once** — trigger `loading → false` twice, assert warn called at most once.

## Verification

```sh
npx tsc --noEmit
node scripts/banned-patterns.mjs
npm test -- qbankTTIGuard
```

No Playwright e2e needed (no UI change).
