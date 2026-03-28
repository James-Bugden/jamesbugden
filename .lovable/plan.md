

## Match Resume Builder Header to Resume Analyzer Style

### What changes
Replace the current white top bar in both Resume Builder (`/resume`) and Resume Builder Simple (`/resume-simple`) with the cream-colored header from Resume Analyzer, featuring the "JAMES BUGDEN" brand name, "← Home" link, Dashboard pill button, and language toggle.

### Design (matching Resume Analyzer exactly)
- Cream background (`#FDFBF7`) with subtle bottom border
- Left: "JAMES BUGDEN" brand link (→ home or /zh-tw)
- Right: "← Home" text link | Dashboard pill (green, logged in) or Sign in pill (not logged in) | Language toggle pill (gold outline)

### Files changed

**1. `src/pages/ResumeBuilder.tsx`** (lines ~955-1015)
- Replace the current white `sticky top-0` header (Row 1) with the analyzer-style cream header
- Keep Row 2 (Content/Customize toggle tabs) below it, but move it inside the cream header block
- Add `useAuth` import for login state
- Left side: `<Link to={home}>JAMES BUGDEN</Link>`
- Right side: "← Home" link, Dashboard/Sign-in pill, language toggle pill, download button
- Remove the old ArrowLeft + doc name pattern from the header (doc name can stay in Row 2 or be accessed via the doc switcher)

**2. `src/pages/ResumeBuilderSimple.tsx`** (lines ~865-911)
- Same cream header treatment
- Already has language toggle — just restyle to match

**3. Both EN and ZH-TW versions** work automatically since `ResumeBuilderZhTw` and `ResumeBuilderSimpleZhTw` wrap the same components with the lang context.

### Header layout (both builders)
```text
┌─────────────────────────────────────────────────┐
│ JAMES BUGDEN          ← Home  [Dashboard] [中文] │  ← cream bg
│            [Content] [Customize]                 │  ← tab row (full builder only)
└─────────────────────────────────────────────────┘
```

The doc name editing + doc switcher dropdown + download button remain in the tab row or as a secondary bar below the brand header, preserving all existing functionality.

