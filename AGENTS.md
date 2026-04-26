# AGENTS.md — jamesbugden.com

This file is the codebase contract for any AI agent (Claude Code, Paperclip site-engineer, Lovable, etc.) editing this repo. Read it before making any change.

## Stack

- **Framework:** React + Vite + TypeScript (`vite_react_shadcn_ts`)
- **Routing:** react-router-dom
- **UI:** shadcn/ui + Tailwind + Radix primitives
- **Forms/data:** react-hook-form, zod, @tanstack/react-query
- **Backend:** Supabase (auth, db, edge functions) — project `reahmeddjkivwzjsoqkn`
- **PDF:** `@react-pdf/renderer` (download AND preview pipeline)
- **Tests:** Playwright e2e (`pnpm test:e2e`); no unit-test framework configured
- **Deploy:** Lovable (manual Publish click — push to main does NOT auto-deploy)

## Local dev

```sh
pnpm install
pnpm dev          # Vite on :8080 (sometimes :8081 if 8080 taken)
```

Test account (pre-seeded, unlimited quota): credentials live in James's password manager — ask him before testing flows that require sign-in.

If the sign-in form hangs after entering creds, sign in via console:

```js
const { supabase } = await import('/src/integrations/supabase/client.ts');
await supabase.auth.signInWithPassword({ email: '<from-password-manager>', password: '<from-password-manager>' });
```

**Always default to local dev for any complex change.** Each Lovable deploy cycle is 3-5 min. Vite HMR is ~200ms.

## Verify before commit

```sh
pnpm tsc --noEmit                  # type check — REQUIRED before every commit
pnpm lint                          # eslint
pnpm test:e2e --grep <feature>     # if UI-touching
```

For UI changes, also visually verify in the running Vite dev server (Preview MCP for Claude agents). Type checks pass does NOT mean the feature works.

## Git workflow

- **Default branch:** `main`. Never commit directly to it. Always branch.
- **Branch naming:** `feat/<slug>`, `fix/<slug>`, `chore/<slug>`, `docs/<slug>`
- **PRs:** open via `gh pr create`. Body must include: summary (3 bullets max, *why* not *what*), test plan checklist, screenshots for UI work, link to the originating issue/Paperclip task.
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

Other paths (`src/pages/**`, the rest of `src/lib/**`) are still fair game for Lovable edits. Defensive code in those areas needs an explicit `// Do NOT remove — required for X` comment, or it will get stripped by Lovable's next "Changes" commit.

If you (Claude/Paperclip) see a `gpt-engineer-app[bot]` commit on main that touched `src/components/resume-builder/` or `src/lib/resumePdf/`, **flag it immediately to James** — that's a rule violation.

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
- Run `pnpm i18n:drift` before committing translation changes

## Supabase

- Production project: `reahmeddjkivwzjsoqkn` (Lovable-provisioned, not in James's personal account → CLI deploys return 403)
- Local `.env` should have `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` from the Lovable project
- Edge Functions: deploy via Lovable (or wait for the project transfer to James's account before using `supabase functions deploy`)
- Do **not** add `service_role` key to client-side code

## Browserless

The `generate-pdf` Edge Function uses Browserless.io but is NOT in the resume download critical path (download uses client-side `src/lib/serverPdfExport.ts`). Cancelling Browserless saves ~$49/mo with no user impact today. The `render-resume-preview` scaffold uses pdfjs-dist + @napi-rs/canvas in Deno, no Browserless needed.

## CJK preview — solution ladder

Target UX: FlowCV-like — live image of printed page, no PDF-viewer chrome, real-time refresh on edit. The `<iframe src=blob:>` hack is **dead** (rejected because it shows browser PDF chrome and caches blob internals). Only escalate up the ladder if the previous step fails:

1. Worker PDF + main-thread pdfjs rasterization (current shipped state)
2. OffscreenCanvas + pdfjs in our worker (transfer ImageBitmap back) — ~1 day work
3. Server-side rasterization Edge Function — last resort, needs infra

## When you (an AI agent) are stuck

- Local test fails repeatedly: invoke `superpowers:debugging`. RCA, not symptom-fix.
- A commit hook fails: read the hook output, fix the cause, recommit. Never `--no-verify`.
- A protected path needs to change: stop, file an issue for James to decide, do not edit.
- The plan changes mid-session: update the plan file in `.claude/plans/`, don't drift silently.
- 3 TDD cycles fail on the same test: the test or the type model is wrong — usually the test. Re-derive the expected behaviour.

## When in doubt

Ask James via a Paperclip issue comment. Speed of asking < cost of an incorrect ship.
