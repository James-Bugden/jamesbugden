# AGENTS.md — jamesbugden.com

Codebase contract for any AI agent (Claude Code, Paperclip site-engineer, Lovable, etc.) editing this repo. Read it before making any change.

## Stack

- **Framework:** React + Vite + TypeScript (`vite_react_shadcn_ts`)
- **Routing:** react-router-dom
- **UI:** shadcn/ui + Tailwind + Radix primitives
- **Forms/data:** react-hook-form, zod, @tanstack/react-query
- **Backend:** Supabase (auth, db, edge functions) — project `reahmeddjkivwzjsoqkn`
- **PDF:** `@react-pdf/renderer` (download AND preview pipeline)
- **Tests:** Vitest unit + Playwright e2e (`npm run test:e2e`). Smoke specs match `*smoke*.e2e.spec.ts`.
- **Package manager:** npm (per `package-lock.json` and existing CI). `pnpm-lock.yaml` and `bun.lockb` are Lovable-generated artifacts — leave them alone, don't switch tooling.
- **Deploy:** Lovable (manual Publish click — push to main does NOT auto-deploy)

## Local dev

```sh
npm ci
npm run dev       # Vite on :8080 (per vite.config.ts:25)
```

Test account credentials live in James's password manager — ask him before testing flows that require sign-in. If the sign-in form hangs, sign in via console:

```js
const { supabase } = await import('/src/integrations/supabase/client.ts');
await supabase.auth.signInWithPassword({ email: '<from-pw-mgr>', password: '<from-pw-mgr>' });
```

**Always default to local dev for any complex change.** Each Lovable deploy cycle is 3-5 min. Vite HMR is ~200ms.

## Verify before commit

```sh
npx tsc --noEmit                             # type check — REQUIRED before every commit
QA_BASE_URL=http://localhost:8080 LOCAL=1 \
  npx playwright test --grep "smoke"         # smoke suite for any UI change (auto-boots dev server)
node scripts/banned-patterns.mjs             # blocks @ts-ignore, console.log, debugger (diff-aware)
node scripts/lovable-protected-paths.mjs     # only fails on Lovable-bot PRs touching protected paths
npm run lint                                 # advisory only — ~309 pre-existing errors to clean up
```

For UI changes, also visually verify in the running Vite dev server (Preview MCP for Claude agents). Type check pass does NOT mean the feature works.

## Git workflow

- **Default branch:** `main`. Never commit directly to it. Always branch.
- **Branch naming:** `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`
- **PRs:** open via `gh pr create`. Body must include: summary (3 bullets max, *why* not *what*), test plan checklist, screenshots for UI work, link to the originating issue/Paperclip task.
- **Migration PRs:** any PR that adds or edits a file under `supabase/migrations/` MUST include a "Post-merge action" callout in the PR description telling James to apply the migration through Lovable's in-app migration tool. Lovable Publish does **not** run migrations — see *Lovable Cloud constraints* below.
- **One logical change per commit.** Don't bundle unrelated work.
- **Commit message:** subject ≤ 70 chars, body explains *why* (the *what* is in the diff). Sign with the agent identity.
- **Never use `--no-verify`** or any flag that bypasses pre-commit hooks. If a hook fails, fix the cause.
- **Never force-push** to a branch someone else might be reviewing.
- **Never delete branches** unless explicitly told to.
- **Lovable's `gpt-engineer-app[bot]` also commits to main.** Pull and inspect before starting any new branch — don't rebase on top of an unread Lovable change.

## Files NEVER to commit

- `.claude/`
- `.env*` (any env file)
- `node_modules/`, `dist/`, `.vite/`, `playwright-report/`, `test-results/`
- Any file containing API keys, OAuth tokens, or session secrets

## Protected paths (Lovable coordination — agreed 2026-04-19)

These paths are **off-limits to Lovable's bot**, so Claude/Paperclip can land defensive code there safely:

- `src/components/resume-builder/`
- `src/lib/resumePdf/`

CI enforces this via `scripts/lovable-protected-paths.mjs` — any PR by `gpt-engineer-app[bot]` that touches these paths fails the ship-gate.

Other paths (`src/pages/**`, the rest of `src/lib/**`) are still fair game for Lovable edits. Defensive code in those areas needs an explicit `// Do NOT remove — required for X` comment, or it will get stripped by Lovable's next "Changes" commit.

## Resume builder constraints (DO NOT regress)

The PDF preview (`src/components/resume-builder/ResumePdfPreview.tsx`) is **the design choice, not a mistake**. James previously paid a developer to migrate from HTML-based preview to PDF-based preview to fix a preview/download drift bug. The comment at the top of `ResumePdfPreview.tsx` documents this.

**Forbidden:**

- Switching the default preview to HTML (`ResumePreview.tsx` is for thumbnails only — leave it).
- "Hide the iframe chrome with CSS" tricks for showing PDFs.
- Switching PDF libraries (jsPDF/pdfmake also use fontkit, same problem).

**Allowed performance fixes:**

- Subset fonts smaller (the working CJK path uses MOE-4808 ~400 KB).
- Move react-pdf rendering to a Web Worker (working recipe in `src/workers/pdfRenderer.worker.ts` and `src/components/resume-builder/pdfWorkerClient.ts` — see *Web Worker recipe* below).
- Server-side rasterization endpoint (scaffolded but undeployed — see `supabase/functions/render-resume-preview/`).

## Web Worker + react-pdf recipe (proven, 2026-04-19)

If you ever need to move react-pdf rendering off the main thread again, follow this exactly. Don't re-derive it.

1. **Do NOT static-import react-pdf at the top of the worker.** Shim globals first, then dynamic-import inside the message handler. ES imports are hoisted — react-pdf's module init touches `window`/`document`/Fast Refresh globals before your shims run.
2. **Font registration must AWAIT inside the worker.** Pass `opts.awaitCJK = true` so `pdf().toBlob()` doesn't run before fontkit has the glyphs (otherwise PDF falls back to Helvetica → 3 KB blank output).
3. **Keep ONE Worker instance alive across renders** so Font.register cache persists. See `pdfWorkerClient.ts`.
4. **pdfjs rasterization stays on main thread.** ~1s per render is acceptable; the 30-75s fontkit freeze was the actual problem.
5. **Cache-busting:** if the chunk graph is unstable across deploys, touch a `__BUILD_TAG__` constant in `src/main.tsx` to force a rebuild. Symptom of stale chunks: fresh tab loads infinite spinner, dynamic import throws "Failed to fetch dynamically imported module".

## i18n

- Type: `type Lang = "en" | "zh-tw"` (consolidating across codebase per `.claude/plans/wise-jingling-dream.md`)
- Guide progress IDs: EN uses base name (`"resume-guide"`), ZH suffixes `-zh`
- ZH content is **Traditional Chinese (Taiwan)**, never Simplified
- Run `npm run i18n:drift` before committing translation changes

## Supabase

- Production project: `reahmeddjkivwzjsoqkn` (Lovable-provisioned, not in James's personal account → CLI deploys return 403)
- Local `.env` should have `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Lovable project
- Edge Functions: deploy via Lovable (or wait for the project transfer to James's account before using `supabase functions deploy`)
- Do **not** add `service_role` key to client-side code

## Lovable Cloud constraints

This Supabase project is provisioned and managed by Lovable Cloud. That changes two things every agent gets wrong on first contact. Both cost real time on HIR-65 — read once, save the next session.

### 1. No triggers on the `auth` schema

Lovable's migration tool **rejects** any `CREATE TRIGGER … ON auth.users` (or any other `auth.*` table). Don't write one — it will fail at apply-time, not at PR-review time.

Workarounds, in order of preference:

1. **Lazy-insert in the relevant React hook.** Pattern already in use: `src/hooks/useProfile.ts:34-49` lazy-inserts the profiles row when a signed-in user first hits a page that needs it.
2. **Upsert in the `SIGNED_IN` event handler** at `src/contexts/AuthContext.tsx:70` (~5 lines). Runs on every sign-in regardless of which page mounts — use this when you need the row to exist before *any* page reads it.
3. **Polled Edge Function** reading `WHERE updated_at > <last sync>`. Only escalate to this if 1 + 2 are insufficient.

Triggers on `public.*` tables are fine — e.g. the `career_phase` ↔ `job_search_stage` sync trigger on `public.profiles` works.

### 2. Lovable **Publish** does NOT run Supabase migrations

The `Publish` button rebuilds the frontend (and Edge Functions) but does **not** apply files in `supabase/migrations/`. Migrations only ship when James runs them through Lovable's in-app migration tool — the sanctioned path for this Cloud project. Supabase Studio is not available (no direct project access) and the Lovable API has no migration endpoint.

site-engineer **cannot apply migrations from the sandbox**: only the public anon key is available — no `service_role`, no Supabase Management API token, no Lovable API.

Standard workflow for any migration PR:

1. site-engineer opens the PR with the migration file.
2. director-engineering reviews; Tier 2 confirmation if needed.
3. director-engineering merges via `gh pr merge --merge` (James has authorised agents to merge without his approval — confirmed 2026-04-28).
4. **James runs the migration through Lovable's in-app migration tool** (one click in Lovable UI — this step still requires James).
5. site-engineer probes the live PostgREST endpoint to verify the new schema, then closes the issue.

Every migration PR description must surface step 4 explicitly so James doesn't try to Publish-and-wait. See the *Migration PRs* bullet under *Git workflow*.

## CJK preview — solution ladder

Target UX: FlowCV-like — live image of printed page, no PDF-viewer chrome, real-time refresh on edit. The `<iframe src=blob:>` hack is **dead** (rejected because it shows browser PDF chrome and caches blob internals). Only escalate up the ladder if the previous step fails:

1. Worker PDF + main-thread pdfjs rasterization (current shipped state)
2. OffscreenCanvas + pdfjs in our worker (transfer ImageBitmap back) — ~1 day work
3. Server-side rasterization Edge Function — last resort, needs infra

## Hard rules — every action (anti-hallucination)

These apply to every AI agent editing this repo. The CI ship-gate enforces some of them; the rest are on you.

1. **Read before edit.** Never edit a file you haven't read this session.
2. **Verify before claim.** Every assertion about repo state — "X exists", "Y returns Z", "this is wired up at A" — requires a grep or read that proves it. If you can't prove it, mark it as "assumed" or ask.
3. **Test before "done".** For UI: run preview, hit the feature, check console. For non-UI: run the test that proves the change works. "Type check passes" is not "feature works".
4. **Cite line numbers.** Every claim about behavior of existing code must include `file:line` so a reviewer can verify.
5. **Never invent identifiers.** Function names, env vars, table columns, config keys — if you didn't read it, don't reference it. The hallucination-check CI job greps for this.
6. **No silent fallbacks.** If something doesn't work, surface it. Do not add try/catch that swallows errors.
7. **Never bypass hooks.** `--no-verify` is forbidden. If a hook fails, fix the cause.

## When you (an AI agent) are stuck

- Local test fails repeatedly: invoke `superpowers:debugging`. RCA, not symptom-fix.
- A commit hook fails: read the hook output, fix the cause, recommit. Never `--no-verify`.
- A protected path needs to change: stop, file an issue for James to decide, do not edit.
- The plan changes mid-session: update the plan file in `.claude/plans/`, don't drift silently.
- 3 TDD cycles fail on the same test: the test or the type model is wrong — usually the test. Re-derive the expected behaviour.

## When in doubt

Ask James via a Paperclip issue comment. Speed of asking < cost of an incorrect ship.
