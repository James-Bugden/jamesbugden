

## Fixes for Resume Dashboard Cards

### Issue 1: Three-dot menu doesn't open
The dropdown menu is a custom implementation using state (`menuOpenId`). There's likely a click-outside handler or event propagation issue closing it immediately. Looking at the code, there's no `useEffect` to close on outside click for this menu — but the card's `onClick` handler (line 219) navigates to the document, which may be firing and navigating away before the menu renders. The `e.stopPropagation()` on line 260 should prevent this, but the menu `div` at line 267 also needs pointer-events handled correctly. The real issue is likely that a global click handler or the card's click is interfering. Will add a proper ref-based outside-click handler and ensure the dropdown uses a portal or z-index fix.

### Issue 2: "View Resume" and "Duplicate" buttons too small
Currently `text-[11px]` with `w-3 h-3` icons. Will increase to `text-sm` (~14px) with `w-4 h-4` icons and add padding/background for better click targets.

### Files to Edit
- `src/components/document-dashboard/DocumentDashboard.tsx`

### Changes
1. **Three-dot menu fix**: Add a `useEffect` with a `mousedown` listener that closes the menu when clicking outside the menu ref. Ensure `e.stopPropagation()` is on all menu interactions.

2. **Larger hover overlay buttons**: Change "View Resume" and "Duplicate" from `text-[11px]` to `text-sm`, icons from `w-3 h-3` to `w-4 h-4`, and add a semi-transparent background pill (`bg-white/20 px-4 py-2 rounded-full`) for better visibility and click targets.

