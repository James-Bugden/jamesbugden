

## Add Visible Drag Handle to Section Cards

### Change: `src/components/resume-builder/SortableSectionCard.tsx`

Currently `{...attributes}` and `{...listeners}` are spread on the entire card wrapper, making the whole card draggable but with no visual indicator. 

**Fix:**
1. Remove `{...listeners}` from the outer `div`
2. Add a drag handle bar at the top of each card — a small `GripVertical` icon from lucide-react centered at the top
3. Apply `{...listeners}` only to the handle element so it's the dedicated drag target
4. Style the handle with `cursor-grab` (and `cursor-grabbing` while dragging), subtle gray color that darkens on hover
5. Keep `{...attributes}` on the outer wrapper for accessibility

The handle will be a narrow strip at the top of the card with the grip icon centered, matching the brand's clean aesthetic.

