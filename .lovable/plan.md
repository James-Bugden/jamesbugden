

## Diagnosis

### 1. Font Size Slider Not Working
The `--resume-font-size` CSS variable is set correctly on the A4Page container (line 565, 633), but nearly every text element inside overrides it with hardcoded `pt` values:
- `HtmlBlock` hardcodes `fontSize: "9pt"` (line 84)
- Entry titles use fixed maps: `{ xs: "8pt", s: "8.5pt", m: "9pt", l: "10pt" }`
- Subtitles, dates, contact info all use fixed `8pt`, `8.5pt`, etc.
- Section headings use `HEADING_SIZES` with fixed values

Result: moving the font size slider changes the CSS variable but almost no visible text uses it.

### 2. Page Break Not Working
The page-count measurement (lines 835-843) uses a hidden absolutely-positioned div that renders one `A4Page` with no height constraint, then divides `scrollHeight` by `dims.hPX`. This approach is correct in principle, but:
- The hidden div sits inside the scaled container and may not measure accurately due to layout context
- The `setTimeout(measure, 0)` may fire before fonts load or before the browser has fully laid out the content
- Each visible page re-renders an independent `<A4Page>` component (line 911), which is wasteful and can cause slight measurement differences

## Plan

### Fix 1: Make font sizes relative to the base font size
- Define a base size from the slider value (e.g. `customize.fontSize = 10.5`)
- Compute all other sizes as offsets from this base, so changing the slider scales everything proportionally
- Update `HtmlBlock`, entry title/subtitle maps, heading sizes, contact font size to all derive from the base
- Example: if base is `10.5pt`, headings = `base + 1.5pt`, body/descriptions = `base - 1.5pt`, dates = `base - 2.5pt`

### Fix 2: Fix page break measurement
- Move the hidden measurement div outside the scaled container so CSS transforms don't affect it
- Use `requestAnimationFrame` instead of `setTimeout(_, 0)` for more reliable post-layout measurement
- Add a `MutationObserver` or re-trigger measurement when font loads complete

### Files to edit
- `src/components/resume-builder/ResumePreview.tsx` — both fixes apply here

