# Resume Builder — Product Review

Last updated: 2026-04-19
Author: Claude (acting PM), based on code inspection of the current `test/dev-baseline` branch and the test plan in `resume-builder-preview-export.md`.

Framing: the builder works. Users can craft, preview, and export a resume in two languages. What follows is what a PM would flag after a working session with the codebase — ordered by expected impact on retention and conversion, not by implementation cost.

## TL;DR

- **Biggest user pain you haven't closed:** perceived preview speed. You got the PDF pipeline matching the export exactly (huge), but it costs ~500–800ms per edit. Users don't read the code — they read the lag. Fix with progressive rendering, not by shortening the debounce further.
- **Biggest hidden risk:** the iframe fallback on Chinese resumes is a silent quality-of-experience cliff. It's better than a crash, but a user who hits it today can't tell why their preview looks different from their peers' and why zoom/scroll feels different.
- **Biggest leverage for growth:** the "2 resume slot" cap is both a cost gate and a conversion blocker. A single shared-link public resume view would probably beat any new template or font added this quarter.

## What's good (keep)

1. **Preview == export.** Solving the "preview updates fast but doesn't match the PDF" bug by rendering through the same `react-pdf` pipeline was the right call. Pagination fidelity is the ticket to price; don't let a refactor ever regress this.
2. **Iframe fallback for CJK.** Crash → degraded UX is the right product trade. Keep it; polish it (see below).
3. **Customize tab structure.** The five subtabs (Basics / Layout & Spacing / Design / Header / Sections) map to real user intents. It's discoverable without a tour.
4. **Two-language separation.** `/resume` vs `/zh-tw/resume` as distinct routes with distinct state is simpler than a universal switcher; avoids bilingual-state-leak bugs.
5. **Server-preview feature flag left OFF by default.** That was a painful lesson to learn (Tokyo round-trip). The `?serverPreview=1` opt-in preserves the option without costing everyone latency.

## What to fix (near-term, user-visible)

### P0 — Preview feels slow on long edits, even though it isn't

**Symptom:** typing a long bullet produces ~5 "Updating…" flashes because each keystroke fires the 350ms debounce, then the next keystroke invalidates it. Total time to first stable preview feels like 1–2s.

**Root cause:** debounce is the wrong tool for streaming text. It's right for slider drag, wrong for keyboard input.

**Proposed fix:**

- **For form text fields** — swap debounce for "idle detection + speculative pre-render." While the user is actively typing (key events < 80ms apart), don't even queue a render. On first keystroke after a pause, render immediately. This makes a 20-word paragraph feel like 1 update, not 5.
- **For customize controls** — keep debounce but shorten it to 120ms post-drag-end. Users interpret sliders as continuous, preview update as confirmation.
- **Progressive page rendering** — when the PDF has 2+ pages, show page 1 the moment it's rasterized rather than waiting for all pages. Page 2 can slide in a beat later.

Do this **before** investigating any "faster engine" approaches. It'll close 70% of the perceived slowness without touching the render path.

### P0 — CJK fallback is invisible to the user

**Symptom:** Chinese resumes render in a browser-embedded PDF iframe, which has different zoom behavior, different scroll behavior, visible PDF chrome on some browsers, and no shadow/page spacing that matches the rasterized English preview.

**Why it matters:** a Chinese user sees a worse-looking preview than an English user and has no way to know why, or that the exported file will look fine.

**Proposed fix:**

- Add a small info chip at the top of the iframe preview: "Preview rendered in compatibility mode for Chinese fonts. Your downloaded PDF will look identical to English resumes."
- Style the iframe with matching page shadow and padding so the visual difference is minimized.
- Investigate whether a one-time pdfjs warm-up with a CJK subset font registered globally would let the primary path succeed. The current crash suggests pdfjs-dist's font parser chokes on a specific subset boundary, not on CJK broadly — worth 1–2 days of spike work.

### P1 — Font picker on `/zh-tw/resume` is now hidden but the decision is not explained

**Done in this branch:** hidden the Design-tab font picker on zh. That solves the dead-knob problem.

**Follow-up:** add a one-line note in its place explaining *why*: "Chinese resumes use Noto Sans TC / SC automatically — no font choice needed." Otherwise the user wonders if they're missing a feature, or worse, switches to EN because they "need more customization."

### P1 — Download path has no success feedback

Code path: click Download → file lands in Downloads folder → no toast, no state change in the app.

Users on mobile or users whose browsers put downloads behind a prompt (Firefox default, for example) sometimes miss that anything happened and click again, generating 2–3 identical files.

Fix: add a ~2s toast "Downloaded `Example-Resume.pdf`" on success. Disable the Download button for 800ms after click to suppress double-clicks.

### P1 — `2 resume slots` hard-cap on the list page is not a good first impression

The replace-flow dialog (seen in the screenshot during test-run) fires as soon as the user clicks "New Resume" when they already have 2. That's the first thing a returning power user hits after adding a second language, and it's adversarial UI — the user is being asked to destroy work.

Options, cheapest first:
1. Raise the cap to 5 for signed-in accounts. Cost is negligible per account, conversion impact is real.
2. Replace the "replace" dialog with an archive model — old resumes go to a trash/history view rather than being destroyed. Same storage cost, much better psychology.
3. Surface the limit earlier (on the list page) rather than at the blocking moment.

Don't commit to #1 without checking current per-user storage; if resume slots are the main cost driver, #2 + #3 is the right answer.

### P2 — Customize panel does too much

At ~600+ lines and 5 subtabs with ~20 controls visible per tab, the Design subtab alone exposes: heading style, heading size, uppercase toggle, heading color, heading font, body font, link underline, link blue, and (when advanced) color mode, subtitle style, subtitle placement, entry layout, and a few more. A new user doesn't know where to start.

Proposed: introduce a **Template preset** as the primary control at the top of Design, with "Customize further" as a collapsed section below it. Users who want total control still have it. Users who want a good-looking resume in 30 seconds get there.

This is partly done (TEMPLATE_LIST exists, `applyTemplatePreset` is wired) but not surfaced as the default entry.

## What to measure (before the next iteration)

You're flying without instrumentation on the features that matter most. Wire these 5 events; they'll tell you whether any of the above actually pay off:

1. `preview_render_ms` — time from edit/customize → first paint of new preview (p50, p90, p99, bucketed by lang and page count)
2. `preview_fallback_fired` — counter on iframe fallback (with lang + content-length buckets)
3. `download_click` → `download_complete` funnel (catches silent failures)
4. `resume_slot_limit_hit` — counts how many active users hit the 2-resume cap
5. `session_edit_count` — edits per session, to validate perceived-speed fixes

Don't ship instrumentation that needs cookie consent for these — they're anonymous usage stats. Batch them client-side and fire on `visibilitychange`.

## What to ignore (for now)

- **Adding more templates.** You have enough. Presentation > variety until retention stabilizes.
- **Adding more languages.** The architecture supports it; users aren't blocked on it. Revisit after Chinese conversion matches English.
- **Server-side preview rendering.** You already have the Fly.io service built. Leave it gated; only revisit if client-side perf work hits a wall on genuinely CJK-heavy resumes on low-end devices.
- **AI import improvements.** Works well enough and isn't the drop-off point.

## What the test plan is missing

`resume-builder-preview-export.md` is comprehensive for functional QA but doesn't cover:

- **Low-end device performance** — CPU-throttled Chrome DevTools (4× slowdown) is a proxy for a lot of real user devices. Add an F7: "F1–F6 targets all pass at 4× CPU slowdown."
- **Offline / flaky network** — what does the preview do when the font CDN is slow or dropped? Observed in dev: indefinite "Generating preview…". Add a 10s timeout with a clear error + retry button.
- **Accessibility** — is the preview keyboard-reachable? Is the Download button announced to screen readers? Current zoom controls don't appear to be. Add a section I (a11y).
- **Printer output** — people print resumes. A "Print preview" that matches actual print output is worth half a QA pass.

## Scorecard (opinion, 1–5)

| Area | Today | After P0s landed |
|---|---|---|
| Preview fidelity to export | 5 | 5 |
| Perceived preview speed | 2 | 4 |
| CJK preview quality | 2 | 3.5 |
| Customization discoverability | 3 | 4 |
| Resume management (list page) | 2 | 3.5 |
| Download UX | 3 | 4 |
| A11y | Unknown | Deliberately improved |
| Instrumentation | 1 | 3 |

## One-line closing

The builder is in a rare state where the core pipeline is solid and most remaining work is surface polish; the risk now is burying that progress under template variety or new languages before the speed and fallback experience catch up to it.
