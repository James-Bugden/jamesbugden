

## Reduce Header/Footer Safe Zones

Currently `HEADER_SAFE_MM` and `FOOTER_SAFE_MM` are both `8`mm, which combined with the user's margin setting reserves 16mm of dead space per page. Reducing these to `4`mm each frees 8mm more usable content area per page.

### Changes

**`src/components/resume-builder/ResumePreview.tsx`** (lines 24-25)
- Change `HEADER_SAFE_MM = 8` → `4`
- Change `FOOTER_SAFE_MM = 8` → `4`

**`src/lib/pdfExport.ts`** (lines 17-18)
- Change `HEADER_SAFE_MM = 8` → `4`
- Change `FOOTER_SAFE_MM = 8` → `4`

Both files must stay in sync so the preview pagination and PDF export match exactly.

