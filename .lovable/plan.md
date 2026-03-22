

## Fix: PDF Export Visual Parity with Preview

### Problem
The exported PDF doesn't match the on-screen preview. Key differences found by comparing `ResumePdfDocument.tsx` against `ResumePreview.tsx`:

### Issues to Fix

**1. Entry title color wrong**
- PDF uses `bodyColor` for entry titles; preview uses `nameColor`
- Fix: change `entryTitle` style to use `nameColor`

**2. Location rendered incorrectly**
- PDF concatenates company/institution and location with " · " on same line
- Preview renders location on its own line below subtitle
- Fix: render location as separate `Text` element

**3. Skills display doesn't match**
- PDF always renders as gray pill tags
- Preview supports `bubble`, `grid`, and `compact` layouts with configurable separators
- Fix: replicate the three display modes and separator options

**4. Languages display doesn't match**
- PDF renders as flat tags ("English – Native")
- Preview's default `grid` mode shows language name left-aligned with proficiency right-aligned
- Fix: replicate grid/compact/bubble modes

**5. Contact separator "icon" mode falls back to " | "**
- When `contactSeparator === "icon"`, preview shows icons (Mail, Phone, MapPin) — icons can't render in PDF
- Fix: fall back to " | " for icon mode (already works), but ensure the separator logic is correct

**6. Missing header divider line**
- Preview renders a thin horizontal accent line after the header
- Fix: add a `View` with 0.3pt height and accent background color after header

**7. Heading styles incomplete**
- PDF only handles `underline` and `full-underline`
- Preview also has `left-accent`, `background`, `left-border`, `plain`
- Fix: implement all heading styles in PDF

**8. Section order not applied**
- PDF uses `data.sections` directly without reordering
- Preview calls `normalizeSectionOrder()` to respect `customize.sectionOrder`
- Fix: apply same sort logic before rendering

**9. Two-column layout not supported**
- Preview splits sections into sidebar (skills, languages, etc.) and main columns
- `@react-pdf/renderer` doesn't support CSS grid, but supports flexbox `flexDirection: "row"`
- Fix: for `columns === "two"` or `"mix"`, render a two-column `View` with sidebar and main content

**10. Experience subtitle placement options missing**
- Preview supports `subtitlePlacement: "same-line"` (primary · secondary on one line)
- PDF always renders on separate lines
- Fix: check `subtitlePlacement` and render accordingly

### Technical Approach
All changes in `src/lib/resumePdf/ResumePdfDocument.tsx`:
- Add section ordering logic (port `normalizeSectionOrder`)
- Fix entry title color to `nameColor`
- Add location as separate line in experience/education
- Rewrite skills section to support grid/compact/bubble display modes
- Rewrite languages section to support grid/compact/bubble display modes
- Add all heading style variants
- Add header divider line
- Add two-column layout support using flexbox row
- Add subtitle placement support
- No new files needed — all fixes in the existing PDF document component

### Files to Edit
- `src/lib/resumePdf/ResumePdfDocument.tsx`

