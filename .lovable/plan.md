

## Add Guide Reading Progress and "Mark as Finished" to Dashboard

### What you'll see

Each guide card on the dashboard will show:
1. **A thin progress bar** at the bottom showing how far you've scrolled through that guide (e.g., 45% read)
2. **A "Mark as done" checkbox** you can click to manually mark a guide as finished, which shows a green checkmark badge

### How it works

**Tracking scroll progress (automatic):**
- Each guide page already has a scroll-based reading progress bar at the top. We'll hook into the same scroll logic to save the max scroll percentage to localStorage when you leave a guide page.
- A new custom hook (`useReadingProgress`) will track `window.scrollY / (document.scrollHeight - window.innerHeight)` and persist the highest value reached per guide ID to localStorage (key: `guide_reading_progress`).
- This hook will be added to each guide page component (there are ~18 guide pages).

**Manual "Mark as finished" toggle:**
- A small checkbox on each guide card in the dashboard. Clicking it marks the guide as 100% complete.
- Stored in localStorage (key: `guide_completed`), as a simple set of guide IDs.
- Completed guides show a gold checkmark badge and the progress bar fills to 100%.

### Visual design on guide cards

- A thin 3px progress bar at the very bottom of each guide card (gold fill on light gray track)
- A small "Done" / "已完成" checkbox in the top-right corner (replaces the "NEW" badge position when applicable)
- When marked done: the card gets a subtle green checkmark badge

### Technical details

**New hook: `src/hooks/useReadingProgress.ts`**
- Tracks scroll percentage per guide ID using localStorage key `guide_reading_progress` (a `Record<string, number>` mapping guide IDs to 0-100)
- Exposes `progress` (current %), `markComplete(id)`, `getProgress(id)`, `isComplete(id)`
- Uses a separate localStorage key `guide_completed` (array of completed guide IDs) for manual completion

**Modified files:**

1. **`src/pages/Dashboard.tsx`**
   - Import new hook
   - Update `GuideCard` component to receive and display progress bar + done checkbox
   - Add i18n strings for "Done" / "已完成"

2. **Guide page files** (all ~18 of them, e.g., `PivotMethodGuide.tsx`, `LinkedInGuide.tsx`, etc.)
   - Add a `useEffect` that tracks scroll progress and saves to localStorage on unmount
   - Import and call the tracking function from the new hook

3. **`src/pages/Dashboard.tsx` - GuideCard component updates:**
   - Add a thin progress bar (3px height) at the bottom of the card
   - Add a checkbox button in the corner for "mark as done"
   - Show percentage text like "45% read" or "Done" next to the tag pill
   - Prevent the checkbox click from navigating to the guide (stopPropagation)
