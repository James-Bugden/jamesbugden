

## Fix: Professional Summary font size mismatch

### Root Cause
In `ResumePreview.tsx` line 233, the summary section's `HtmlBlock` does not receive a `fontSize` prop, so it defaults to `"inherit"` — which may not match the document's body font size. Every other section passes `fontSize={bodyPt(base)}`.

### Fix
One line change in `renderSectionEntries()`:

```tsx
// Line 233 — add fontSize={bodyPt(base)}
return <HtmlBlock html={section.entries?.[0]?.fields?.description} sectionId={section.id} entryId={section.entries?.[0]?.id} fontSize={bodyPt(base)} className="mt-[1mm] [&_p]:mb-[1.2mm] [&_ul]:list-disc [&_ul]:pl-[5mm] [&_ol]:list-decimal [&_ol]:pl-[5mm]" />;
```

This ensures the Professional Summary text renders at the same `bodyPt(base)` size as Experience, Education, and all other description blocks.

