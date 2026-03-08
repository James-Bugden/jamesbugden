

## Fix Grouped Promotions Layout

Based on the reference image, the grouped promotions layout needs these changes:

### Current vs. Desired

**Current**: Company name + overall date range on same line, roles indented with date on right, location on separate line below role title.

**Desired (from image)**:
- **Company name** bold/uppercase on its own line (no overall date range next to it)
- Each **role title** in *italic* with individual date range + location on the **right side** (date on first line, location on second line, both right-aligned)
- No left-indentation padding on roles — the role title sits at the same indent as bullet content
- Bullets use standard disc markers

### Changes in `src/components/resume-builder/ResumePreview.tsx` (lines 533-556)

1. **Company header**: Remove the overall `groupDateRange` from next to the company name — show company name only, bold
2. **Role rows**: Show position in *italic* (fontStyle italic, fontWeight 600), with date + location stacked on the right side (right-aligned column)
3. **Remove left padding** (`paddingLeft: "4mm"` → remove or reduce) — the reference shows minimal indentation, just a vertical line or none
4. Keep description/bullets rendering unchanged

