

## Show Uploaded Photo on Resume Preview

The photo is uploaded and stored in `personalDetails.photo` (base64), but the `A4Page` header in `ResumePreview.tsx` never renders it. The `CustomizeSettings` also lacks any photo-related settings.

### Plan

**File: `src/components/resume-builder/customizeTypes.ts`**
- Add photo settings to `CustomizeSettings`: `showPhoto: boolean`, `photoSize: "s" | "m" | "l"`, `photoShape: "circle" | "square" | "rounded"`
- Add defaults: `showPhoto: true`, `photoSize: "m"`, `photoShape: "circle"`

**File: `src/components/resume-builder/ResumePreview.tsx`**
- In the header section (~line 799), check if `p.photo` exists and `c?.showPhoto !== false`
- Render the photo as an `<img>` element next to the name/title block
- Size mapping: s=12mm, m=18mm, l=24mm; shape from `photoShape`
- Wrap the header in a flex row when photo is present: photo on one side, name+title+contacts on the other
- Respect `headerAlign` for positioning (left align = photo left, right align = photo right, center = photo above or left)

**File: `src/components/resume-builder/CustomizePanel.tsx`**
- Add a "Photo" collapsible section with toggles for show/hide, size picker, and shape picker

### Files to edit
- `src/components/resume-builder/customizeTypes.ts`
- `src/components/resume-builder/ResumePreview.tsx`
- `src/components/resume-builder/CustomizePanel.tsx`

