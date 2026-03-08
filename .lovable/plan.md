

## Problem

The numeral "3" in the hero headline "在夢想公司拿到年薪3百萬以上的 Offer" sits lower than the surrounding Chinese characters because `font-heading` (Playfair Display) has different baseline metrics than the CJK glyphs. The screenshot confirms the "3" appears visually dropped.

## Solution

Wrap the "3" in a `<span>` with a slight `relative` positioning nudge upward and optionally switch it to the system sans-serif font so it blends better with the Chinese text. This affects two files:

1. **`src/pages/IndexExperimentZhTw.tsx`** (line 125) — The unicode-escaped headline. Replace with JSX mixing text and a styled `<span>` for the "3":
   ```tsx
   <h1 ...>
     在夢想公司拿到年薪<span style={{ fontFamily: 'system-ui, sans-serif', position: 'relative', top: '-0.05em' }}>3</span>百萬以上的&nbsp;Offer
   </h1>
   ```

2. **`src/pages/IndexZhTw.tsx`** (line 69) — Same treatment:
   ```tsx
   拿到年薪 <span style={{ fontFamily: 'system-ui, sans-serif', position: 'relative', top: '-0.05em' }}>300</span> 萬以上的外商&nbsp;Offer
   ```

This keeps the numeral aligned with the CJK baseline while looking clean. The `system-ui` font matches Chinese system fonts better than Playfair Display for numerals.

