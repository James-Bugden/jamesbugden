

# Fix: WhatsNewModal Not Closable on Mobile

## Problem
On small screens (320px viewport), the DialogContent fills the entire screen. The default Dialog close button (X) is hidden or clipped, and the "Got it" button is pushed below the fold, leaving users stuck.

## Solution
Two changes to `src/components/dashboard/WhatsNewModal.tsx`:

1. **Add `max-h-[90dvh] overflow-y-auto`** to DialogContent so it scrolls within the viewport instead of overflowing
2. **Make the CTA button sticky** at the bottom so it's always visible even if content scrolls
3. **Reduce spacing on mobile** — smaller padding and tighter item gaps to fit more content above the fold

### Changes

**`src/components/dashboard/WhatsNewModal.tsx`**

- DialogContent: add `max-h-[90dvh] flex flex-col` classes
- Header: reduce mobile padding (`px-4 pt-6 pb-4 sm:px-6 sm:pt-8 sm:pb-5`)
- Items container: add `overflow-y-auto flex-1`, reduce mobile spacing (`space-y-3 sm:space-y-5 px-4 py-4 sm:px-6 sm:py-6`)
- CTA container: add `sticky bottom-0 bg-background` with reduced mobile padding (`px-4 pb-4 sm:px-6 sm:pb-6`)

This ensures the button is always reachable and the content scrolls if needed on small