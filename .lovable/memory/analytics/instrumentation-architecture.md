---
name: Analytics instrumentation architecture
description: Four analytics tables (sessions, guide_reads, tool_completions, error_log) plus event_tracks firehose, all auto-enriched with anon_id and session_id
type: feature
---

The analytics stack uses 5 tables. All writes auto-attach `anon_id` (localStorage UUID via `src/lib/analytics/anonId.ts`) and `session_id` (sessionStorage, 30-min inactivity rollover via `src/lib/analytics/session.ts`).

**Tables:**
- `event_tracks` — firehose for clicks/CTAs/copies/auth events. Existing `trackEvent()` in `src/lib/trackEvent.ts` was upgraded to enrich every call with anon/session IDs (zero changes needed at 100+ existing call sites).
- `sessions` — one row per visit. Captures device, viewport, UTM, entry/exit page, duration. Initialized + heartbeated by `<AnalyticsProvider />` mounted in App.tsx.
- `guide_reads` — one row per guide view with scroll depth, time on page, CTA/copy counters. Auto-fired by `useTrackGuideProgress` (every guide page already uses this hook).
- `tool_completions` — one row per significant tool action (analyzer run, PDF export, salary check, job added, CSV export). Use `trackTool(tool, action, outcome, opts)`.
- `error_log` — JS errors (global handler), PDF export failures, AI call failures. Use `trackError(source, message, extra)`.

**Public API:** `import { track, trackTool, trackError, startGuideRead } from "@/lib/analytics"` (all fire-and-forget).

**Edge function:** `analytics-export` includes all 5 tables — `?tables=sessions,tool_completions,error_log` to filter.

All tables: public INSERT, admin-only SELECT via `is_admin(auth.uid())`. `user_id` is nullable to support guest tracking.
