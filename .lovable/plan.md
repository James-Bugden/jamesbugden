

## Fix "Quick Reference: All 36 Secrets" Desktop Layout

### Problem
On mobile, the single-column list looks fine. On desktop, the 2-column grid (`sm:grid-cols-2`) makes the 36 items look sparse and poorly formatted — long sentences wrap awkwardly across narrow columns.

### Fix
Switch to a 3-column grid on medium+ screens and add numbered cards with subtle borders for better visual structure on desktop:

- Change `grid sm:grid-cols-2 gap-x-6 gap-y-2` → `grid sm:grid-cols-2 md:grid-cols-3 gap-3`
- Wrap each item in a compact card with border styling (similar to the "10 Golden Rules" pattern in the Resume Quick Reference page)
- Each card: gold number badge + secret text, with `bg-background border border-border rounded-lg p-3`

### Files Changed
1. **`src/pages/CareerGameGuide.tsx`** — lines 1237-1279: update grid classes and item styling
2. **`src/pages/CareerGameGuideZhTw.tsx`** — lines 803-816: same changes with Chinese content

