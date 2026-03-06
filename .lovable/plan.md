

## Move Drag Handle to Left of Section Title

Currently in `SortableSectionCard.tsx`, the drag handle (GripVertical icon) is rendered as a separate row **above** the children content. It needs to be repositioned to sit **inline to the left** of the section title.

### Approach

**`SortableSectionCard.tsx`** — Change the layout from vertical (handle above content) to horizontal (handle left of content):

- Wrap in a `flex flex-row` container
- Place the drag handle as a narrow left-side column, vertically centered
- Place the children (SectionCard) as the flex-1 right column
- Remove the separate centered row for the grip icon

**`SectionCard.tsx`** (line 572) — Remove the duplicate `GripVertical` icon that's already inside the section header, since the drag handle from `SortableSectionCard` will now serve this role.

### Result
The drag handle will appear as a vertical grip on the left edge of each section card, aligned with the title row, matching standard drag-and-drop UX patterns.

