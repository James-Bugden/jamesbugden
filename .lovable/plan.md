

## Plan: Format Tag Legend + Improve Power Audit Mobile Layout

### 1. Tag Legend (USE / DEFEND / AVOID) — Better formatting

**Current** (line 1411-1413): Plain `<p>` with inline bold text, hard to scan.

**Replace with** styled card-style legend — three stacked rows with color-coded dots matching the filter buttons:
- Green dot + **USE** — Apply proactively as career strategy
- Amber dot + **DEFEND** — Recognize when others use this against you  
- Red dot + **AVOID** — Too risky for most workplace situations

Use `flex items-center gap-2` per row inside a `rounded-lg bg-muted/30 p-3 space-y-2` container. Dots are small `w-2.5 h-2.5 rounded-full` divs with matching bg colors (`bg-emerald-500`, `bg-amber-500`, `bg-red-500`).

### 2. Power Audit — Mobile improvements (lines 1452-1521)

**Problems on mobile:**
- Score buttons (5 × `w-8`) + label text in a horizontal flex row is cramped
- The `flex items-start gap-4` layout doesn't stack on small screens

**Fixes:**
- Change the audit area rows from side-by-side to **stacked on mobile**: area name + question on top, score buttons below (`flex-col sm:flex-row`)
- Make score buttons `w-7 h-7 text-xs` on mobile, `w-8 h-8 text-sm` on `sm:` breakpoint
- Add `gap-2` instead of `gap-4` on mobile
- For the 90-Day cycle grid: change from `grid-cols-2 md:grid-cols-4` to `grid-cols-1 sm:grid-cols-2 md:grid-cols-4` so it's single-column on small phones

### Technical details

**File:** `src/pages/FortyEightLawsGuide.tsx`
- Lines 1411-1413: Replace tag legend paragraph
- Lines 1454-1477: Update audit area layout for mobile stacking
- Lines 1461-1475: Responsive score button sizing
- Line 1524: Update 90-day cycle grid breakpoints

