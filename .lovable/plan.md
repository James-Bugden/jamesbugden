

## Apply Experiment Design Guidelines to /dashboard

The current dashboard uses the older Tailwind token-based styling (e.g., `bg-executive`, `bg-card`, `text-foreground`). The experiment page uses inline styles with specific hex values from the design guidelines. This plan aligns the dashboard with those guidelines.

### What Changes

**1. Navigation Bar**
- Change from dark green (`bg-executive`) to white/cream (`#FDFBF7`) background
- Text color from white to `#1A1A1A` (dark)
- "JAMES BUGDEN" in dark green `#2D3A2E`
- Sign out and greeting text in `#6B6B6B`
- Add subtle shadow on scroll (matching experiment nav behavior)

**2. Welcome Banner**
- Change from dark green background to cream `#FDFBF7`
- Headline text from white to `#1A1A1A`
- Announcement pill: light border style instead of `bg-white/10`
- Gold link stays `#D4930D`

**3. Page Background**
- Main content area from `bg-background` (Tailwind token) to `#FFFFFF`
- Section headings use `style={{ color: '#1A1A1A' }}` with `font-heading` and `clamp()` sizing

**4. Tool Cards**
- Background: cream `#FDFBF7` instead of `bg-card`
- Left border: `4px solid #D4930D` (explicit hex)
- Shadow: `0 2px 8px rgba(0,0,0,0.06)` (lighter, per guidelines)
- Text: `#1A1A1A` for titles, `#6B6B6B` for descriptions
- "Launch" text: `#D4930D` gold

**5. Guide Cards**
- Same cream background `#FDFBF7`
- Shadow: `0 2px 8px rgba(0,0,0,0.06)`
- Text colors: `#1A1A1A` titles, `#6B6B6B` descriptions
- Filter pills: active = `#D4930D` gold bg, inactive = white with `#1A1A1A` text and light border
- Sub-group labels: `#6B6B6B`

**6. Toolkit Section**
- Background tint stays distinct but uses a cream variant consistent with guidelines
- Featured card: cream bg with gold left border `#D4930D`
- Badge: `#D4930D` background
- Grid cards: same cream style as guide cards

**7. Coaching CTA Section**
- Background: gradient from `#2D3A2E` to `#232E24` (matching experiment CTA)
- Add subtle noise texture overlay (same as `CoachingCTAExperiment`)
- Headline: `#FBF7F0` with `clamp()` sizing
- Body text: `rgba(251,247,240,0.85)`
- Button: `#D4930D` gold with hover to `#E0A520`
- Trust line: `#A8B5A9` muted green-gray

**8. Footer**
- Background: `#FFFFFF`
- Text: `#6B6B6B` for all lines
- Clean, minimal

### Technical Details

**File modified:** `src/pages/Dashboard.tsx`

The approach mirrors the experiment page pattern: replace Tailwind color tokens (`bg-executive`, `text-foreground`, `bg-card`, etc.) with inline `style={{}}` props using the exact hex values from the design guidelines. This ensures pixel-perfect consistency with the experiment page without modifying the global Tailwind config or affecting other pages.

Key style mappings:
```text
bg-executive       -->  style={{ backgroundColor: '#2D3A2E' }}  (CTA only)
bg-card             -->  style={{ backgroundColor: '#FDFBF7' }}
text-foreground     -->  style={{ color: '#1A1A1A' }}
text-muted-foreground --> style={{ color: '#6B6B6B' }}
bg-gold             -->  style={{ backgroundColor: '#D4930D' }}
shadow-[...]        -->  style={{ boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}
```

Scroll-based nav shadow will require a `useState` + `useEffect` scroll listener (same pattern as `IndexExperiment.tsx`).

