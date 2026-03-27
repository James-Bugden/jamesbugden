

## Replace LINE with WhatsApp on English Pages

### What changes
On all English pages, the LINE share button becomes a WhatsApp share button. Chinese (ZhTw) pages keep LINE unchanged.

### Files to edit

**1. `src/components/GuideShareButtons.tsx`**
- Add a WhatsApp icon SVG component
- When `isZhTw === false`: render WhatsApp button with deep link `https://wa.me/?text={url}` instead of LINE
- When `isZhTw === true`: keep LINE button as-is
- Update button color from LINE green (`#06C755`) to WhatsApp green (`#25D366`) for English

**2. `src/components/resume-analyzer/ResumeResults.tsx`**
- Add WhatsApp icon SVG
- When `isZhTw === false` (English): show WhatsApp button with `https://wa.me/?text={url}`
- When `isZhTw === true`: keep LINE button
- This component already has `isZhTw` prop available via the language check

**3. `src/components/interview-questions/InterviewQuestionBank.tsx`**
- This is an English-only page — replace LINE button with WhatsApp button
- Change icon, label, color, and deep link

### Deep link format
- WhatsApp: `https://wa.me/?text=${encodeURIComponent(url)}`
- This opens the WhatsApp app's share/compose screen with the URL pre-filled

