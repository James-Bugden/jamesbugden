

## Remove "Browse Templates" Button

Simple removal of the "Browse Templates" button and its associated modal from `CustomizePanel.tsx`.

### Changes in `src/components/resume-builder/CustomizePanel.tsx`
- **Remove lines 284-290**: The "Browse Templates" button
- **Remove lines 293-300** (approx): The `TemplateGalleryModal` component rendered below it
- **Remove the `galleryOpen` state** and `TemplateGalleryModal` import if no longer used elsewhere in the file

