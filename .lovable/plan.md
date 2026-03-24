

## Investigation: Preview changes not reflected in PDF export

### Issues Found

After tracing the full export pipeline, I found **3 concrete gaps** where preview customizations are lost during export:

---

### 1. Background color is hardcoded to white
**File:** `src/lib/serverPdfExport.ts` (line 177)

The serialized HTML has `html, body { background: #ffffff; }` hardcoded, ignoring the user's `a4Background` customize setting. If a user picks a custom page background (e.g., the dark green seen in the session replay), the export renders white.

**Fix:** Read the background color from the cloned element's `backgroundColor` style and inject it into the HTML body CSS.

---

### 2. Footer (page numbers, name, email) is missing from export
**File:** `src/lib/serverPdfExport.ts`

The footer is rendered as an absolutely-positioned overlay in `ResumePreview` (lines 1548–1573), **outside** the `A4Page` component. The serializer only captures the `A4Page` content (`[data-color-role='background']`), so footers are completely absent from the exported PDF.

**Fix:** If footer settings are enabled, inject a CSS `@bottom-left` / `@bottom-right` margin box in the `@page` rule, or append a simple fixed-position footer div into the serialized HTML. Since `@page` margin boxes have limited browser support, the practical approach is to pass footer config into the serializer and append a `position: fixed; bottom` footer element that headless Chrome repeats on every page.

---

### 3. Full `customize` object not passed to serializer
**File:** `src/pages/ResumeBuilder.tsx` (line 674) and `src/pages/ResumeBuilderSimple.tsx`

Only `{ marginX, marginY }` is passed:
```typescript
customize: { marginX: customize.marginX, marginY: customize.marginY },
```

The serializer needs the full `a4Background` and footer settings too.

**Fix:** Pass the complete customize object (or at least the additional fields: `a4Background`, `showPageNumbers`, `showFooterName`, `showFooterEmail`, `fontSize`, `datesColor`, `bodyFont`) to `exportResumePdfServer`.

---

### Implementation Plan

**Step 1 — Expand the `ServerPdfExportOptions` interface** (`src/lib/serverPdfExport.ts`)
- Accept full customize settings (background, footer flags, font, colors)

**Step 2 — Fix background color in serializer** (`src/lib/serverPdfExport.ts`)
- Replace hardcoded `#ffffff` with the user's `a4Background` value

**Step 3 — Add footer to serialized HTML** (`src/lib/serverPdfExport.ts`)
- Append a `position: fixed; bottom: 0` footer div with the user's name, email, and page numbers using CSS `counter(page)` / `counter(pages)`

**Step 4 — Pass full customize from callers** (`src/pages/ResumeBuilder.tsx`, `src/pages/ResumeBuilderSimple.tsx`)
- Change `customize: { marginX, marginY }` to pass the full customize object

