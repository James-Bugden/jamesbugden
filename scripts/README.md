# scripts/

Small utility scripts for this repo. No runtime deps. Run with `node` directly.

## check-i18n-drift.js

Walks `src/pages/**` and finds every `Foo.tsx` paired with a `FooZhTw.tsx`.
For each pair, compares structural signals — not string content — to detect
drift:

- **🔴 errors** — progress-tracking ID collisions, `<SEO />` rendered in only one side
- **🟡 warnings** — line-count drift (>30%), link / anchor count mismatches, custom hook parity, shared component (`<GuideShareButtons>`, `<GuideBottomCTA>`, `<GuideSignInBanner>`) rendered on only one side

Ignores React/router utility hooks (useState, useEffect, useNavigate, etc.)
and skips line-count drift checks when either file is < 60 non-blank lines
(assumes thin-wrapper consolidation pattern where content lives in a shared
component).

**Usage:**

```
npm run i18n:drift
# or
node scripts/check-i18n-drift.js
```

Prints a one-line summary to stdout and writes a full report to
`tmp/i18n-drift-report.md`. Exits 1 if any errors are found (useful as a CI
gate or pre-commit hook).

**When to run:**

- Before starting each phase of the consolidation migration (per the plan at
  `.claude/plans/wise-jingling-dream.md`)
- After merging any PR that touches a paired `*Tsx`/`*ZhTw.tsx` file, to
  catch regressions early
- Optionally add as a CI gate in `.github/workflows/` to prevent drift being
  reintroduced after migration
