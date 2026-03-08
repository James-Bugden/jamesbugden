

## Inline Text Color Editor

This is a significant feature that replaces the sidebar Colors panel with click-to-edit color picking directly on the resume preview.

### Files to create

**`src/components/resume-builder/InlineColorToolbar.tsx`**
- Floating toolbar component with 10 preset color swatches (28px circles) + rainbow custom picker circle
- Props: `targetRect`, `currentColor`, `elementType` (label), `onColorChange`, `onClose`, `isMobile`
- Positioning: centered above target element with 8px gap; flips below if no space above; mobile: fixed bottom
- Styling: white bg, `border: 1px solid #e5e7eb`, `border-radius: 12px`, `box-shadow: 0 4px 16px rgba(0,0,0,0.12)`, `padding: 8px 12px`, z-index 999
- Animations: fade + scale 0.95→1.0 on enter (150ms), fade on exit (100ms)
- Selected swatch: 2px dark ring
- Checkmark feedback: green check icon 300ms after selection, then dismiss
- Custom picker: last circle is rainbow gradient; clicking opens native `<input type="color">`; after picking, replaces rainbow with chosen color for session
- Dismiss: click outside or "x" button
- Preset swatches: `#111827, #374151, #6B7280, #9CA3AF, #0891b2, #2563eb, #7c3aed, #dc2626, #16a34a, #D4930D`

### Files to modify

**`src/components/resume-builder/customizeTypes.ts`**
- Add `bodyColor: string` field to `CustomizeSettings` (default `"#374151"`)

**`src/components/resume-builder/ResumePreview.tsx`**
- Add `data-color-role` attributes to all colorable elements in `A4Page`:
  - Name h1 → `data-color-role="name"` → maps to `nameColor`
  - Title p → `data-color-role="title"` → `titleColor`
  - Contact container → `data-color-role="contacts"` → `linkIconColor`
  - Section headings h2 → `data-color-role="headings"` → `headingsColor`
  - Date elements → `data-color-role="dates"` → `datesColor`
  - Entry titles → `data-color-role="entryTitle"` → `nameColor`
  - Entry subtitles → `data-color-role="subtitle"` → `subtitleColor`
  - HtmlBlock body text → `data-color-role="body"` → `bodyColor`
  - Accent lines/dividers → `data-color-role="accent"` → `accentColor`
  - Page background div → `data-color-role="background"` → `a4Background`
- Update `cssVars` to use `bodyColor` from settings: `"--resume-body": c?.bodyColor ?? "#374151"`
- Add `onColorChange` prop to `ResumePreviewProps` and `A4Page`
- In the outer `ResumePreview` component: add click handler on the page container that detects clicks on `[data-color-role]` elements, captures element rect (adjusted for scale), and shows `InlineColorToolbar`
- Add CSS hover state: `[data-color-role]` elements get `1px dashed lightblue` outline with `4px` padding on hover (desktop only, via a `<style>` tag)
- Map `data-color-role` values to customize field names in a lookup object

**`src/components/resume-builder/CustomizePanel.tsx`**
- Delete the entire Colors `SettingCard` block (lines 481-494)

**`src/pages/ResumeBuilder.tsx`**
- Pass `onColorChange` callback to `ResumePreview` that calls `updateCustomize` with the mapped field

### Interaction flow
1. User hovers over text on preview → dashed outline appears
2. User clicks → `InlineColorToolbar` appears above the element
3. User picks a swatch → checkmark flash → toolbar dismisses → color updates in real-time via `updateCustomize`
4. Custom picker: click rainbow circle → native color input opens → selection applies same way

### Mobile behavior
- Toolbar fixed to bottom of viewport (above zoom bar)
- Swatches horizontally scrollable
- No hover outlines; tap opens toolbar directly

