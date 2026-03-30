# Security Fixes Plan — Remaining Issues

## Overview

The security audit identified 10 issues. **6 are fully implemented**, 2 are partial, and 2 are not started. Issues 5 & 6 (PDF payload validation + stylesheet whitelist) target the `generate-pdf` Supabase function which is no longer used — all PDF exports are client-side via `@react-pdf/renderer`. This plan covers the **2 remaining actionable items**.

---

## Status Summary (All 10 Issues)

| # | Issue | Status |
|---|-------|--------|
| 1 | PDF page-break distortion | Done — `@react-pdf/renderer` with orphan protection |
| 2 | Auth bypass on feature gates | **Partial — CSS blur bypassable** |
| 3 | PDF export auth fallback | Done — proper 401, no fallback key |
| 4 | Resume limit browser-only | Done — server-side `count_user_documents` RPC |
| 5 | PDF payload validation | N/A — `generate-pdf` endpoint unused |
| 6 | Stylesheet whitelist for PDF | N/A — `generate-pdf` endpoint unused |
| 7 | XSS in salary tool | Done — DOMPurify used everywhere |
| 8 | Documents to server storage | Done — Supabase `user_documents` sync |
| 9 | Content Security Policy | Done — CSP meta tag in `index.html` |
| 10 | Browser print fallback gating | **Not implemented** |

---

## TODO 1: Fix EmailGateOverlay — Replace Blur with Conditional Render

**Priority:** High (security)
**Effort:** Low (1 file)
**Issue:** `EmailGateOverlay` renders children behind a CSS `blur(6px)` filter. Anyone can remove the blur in DevTools to see full content.

### Current State
- `src/components/EmailGateOverlay.tsx` lines 55-58 render `{children}` inside a blurred div
- Content is fully in the DOM, just visually obscured
- `OfferCompass.tsx`, `OfferCompassCompare.tsx`, and ZhTw variants consume this component

### Fix
Replace the blurred `{children}` block with skeleton placeholder bars. When `!isUnlocked`, children are **never rendered to the DOM**.

**File:** `src/components/EmailGateOverlay.tsx`

```tsx
// BEFORE (lines 55-58):
<div style={{ filter: "blur(6px)", maxHeight: "300px", overflow: "hidden" }}>
  {children}
</div>

// AFTER:
<div className="space-y-4 px-4 py-6" style={{ maxHeight: "300px", overflow: "hidden" }}>
  {[...Array(5)].map((_, i) => (
    <div key={i} className="h-4 rounded bg-muted/40" style={{ width: `${70 + (i % 3) * 10}%` }} />
  ))}
</div>
```

The gradient fade and gate card stay unchanged. No consumer changes needed — the component API is identical.

### Verification
1. Open `/offer-calculator` logged out
2. Inspect DOM → confirm no real content, only skeleton bars
3. Unlock with email → confirm real content appears

---

## TODO 2: Gate Browser Print Behind Usage Tracking

**Priority:** Medium (rate limit bypass)
**Effort:** Medium (1 new file + 5 modified)
**Issue:** `window.print()` is called in 5 files with no rate limiting. Users can print unlimited PDFs.

### Current State
`window.print()` used without tracking in:
- `src/components/resume-analyzer/ResumeResults.tsx` (lines 547, 814)
- `src/pages/toolkit/AchievementLog.tsx` (line 89)
- `src/pages/toolkit/AchievementLogZhTw.tsx` (line 198)
- `src/pages/toolkit/RaiseOnePager.tsx` (line 96)
- `src/pages/toolkit/RaiseOnePagerZhTw.tsx` (line 149)

### Fix

**Step A: Create `src/hooks/usePrintUsage.ts`**

Follow the existing `useBuilderAiUsage` hook pattern:
- Fetch count via `count_ai_usage_this_month` RPC with `usage_type: "print_export"`
- `gatedPrint()` checks limit → calls `window.print()` → records to `ai_usage_log`
- Unauthenticated users get raw `window.print()` (can't track without user ID)
- Returns `{ gatedPrint, printCount, printLimit, printLimitReached, loading }`
- Limit: 50/month (matches existing PDF_MONTHLY_LIMIT constant)

**Step B: Update 5 consumer files**

| File | Line | Change |
|------|------|--------|
| `ResumeResults.tsx` | 547, 814 | `onClick={gatedPrint}`, disable when `printLimitReached` |
| `AchievementLog.tsx` | 89 | Replace `printPage` fn with `gatedPrint` |
| `AchievementLogZhTw.tsx` | 198 | Replace `window.print()` with `gatedPrint` |
| `RaiseOnePager.tsx` | 96 | Replace `printPage` fn with `gatedPrint` |
| `RaiseOnePagerZhTw.tsx` | 149 | Replace `window.print()` with `gatedPrint` |

No schema changes needed — reuses existing `ai_usage_log` table and `count_ai_usage_this_month` RPC.

### Verification
1. Click print button → confirm usage recorded in `ai_usage_log` table
2. Reach 50 limit → confirm toast shown ("Monthly print limit reached") and button disabled

---

## Implementation Order

1. **TODO 1** (EmailGateOverlay) — single file, highest security impact
2. **TODO 2** (Print gating) — new hook + 5 file updates, lower severity
