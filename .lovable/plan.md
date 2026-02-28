

## Replace Emoji with Brand-Aligned Icon

**What changes:**
Replace the ☝ pointing-up emoji in the "Tap the path that sounds most like you" prompt with a Lucide icon that fits the premium, executive brand aesthetic.

**Recommended icon:** `ChevronUp` or `MousePointerClick` from Lucide — clean, minimal, and professional. `ChevronUp` pairs naturally with the "tap" instruction and matches the chevron style already used elsewhere (e.g., the "Show More Reviews" button uses `ChevronDown`).

**File:** `src/components/SelfSegmentationExperiment.tsx` (line 271)

**Details:**
- Remove the `☝` emoji span
- Replace with a `ChevronUp` icon (Lucide) in gold (#D4930D), keeping the bounce animation
- Icon size: 18-20px to match the current text scale
- Keep the existing text, color, and layout unchanged

