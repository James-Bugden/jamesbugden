

# Fix: Skills Not Rendering in PDF Preview (Chinese Font Issue)

## Root cause

After thorough investigation, the skills section code is **correct** — data flows properly from TagInput → store → preview. The real issue is that the **PDF preview uses built-in fonts (Helvetica, Times-Roman, Courier)** that have **no Chinese glyph coverage**. This causes ALL Chinese text — including skills — to render as garbled/mojibake characters in the right-side preview.

The user sees skills "not showing" because the Chinese skill tags (技術招募, 人才策略規劃, etc.) are rendered as unreadable symbols, making them appear invisible or missing.

## What this is NOT

- Not a data flow bug (TagInput correctly saves comma-separated values to `fields.skills`)
- Not a rendering logic bug (both `ResumePreview.tsx` and `ResumePDF.tsx` correctly read and render skills)
- Not a section filtering bug (`hasContent` correctly detects skills data)

## Fix: Register CJK fonts for `@react-pdf/renderer`

### `src/components/resume-builder/ResumePDF.tsx`
- Register a CJK-compatible font (e.g., Noto Sans TC from Google Fonts CDN) with `@react-pdf/renderer`'s `Font.register()`
- Use this font as fallback when Chinese characters are detected, or always use it for zh-TW locale
- Register normal + bold weights

### `src/lib/resumePdf/fontMap.ts`
- Add a CJK font family constant (e.g., `"Noto Sans TC"`)
- Update `toPdfFont()` to return the CJK font when the resume locale is zh-TW or when CJK characters are detected in content

### Technical approach
```typescript
// In ResumePDF.tsx, register CJK font once
import { Font } from "@react-pdf/renderer";

Font.register({
  family: "Noto Sans TC",
  fonts: [
    { src: "https://fonts.gstatic.com/s/notosanstc/v35/nKKQ...woff2" },
    { src: "https://fonts.gstatic.com/s/notosanstc/v35/nKKQ...woff2", fontWeight: 700 },
  ],
});
```

- Detect CJK content via regex `/[\u4e00-\u9fff]/` on the resume data
- When CJK detected, use `"Noto Sans TC"` as the body font family in the PDF
- This fixes ALL Chinese text rendering (summary, experience, skills, etc.)

### Files changed
1. `src/components/resume-builder/ResumePDF.tsx` — register CJK font, add detection logic
2. `src/lib/resumePdf/fontMap.ts` — add CJK font mapping
3. `src/components/resume-builder/ResumePdfPreview.tsx` — ensure font loading completes before rendering

## Scope
This fixes the garbled Chinese text issue across the entire PDF preview, not just skills. Skills will then correctly appear as readable Chinese tags on the right-side preview.

