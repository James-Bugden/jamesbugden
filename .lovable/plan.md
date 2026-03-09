

## Plan: Upgrade Problem Solving Guide Graphics

### Problem
The Problem Solving Guide uses plain monospace ASCII art (`CodeBlock` / `<pre>` blocks) for all diagrams and visual elements. These look basic and don't match the premium executive design system used elsewhere. There are ~8 ASCII diagrams that need upgrading.

### Approach
Replace each `CodeBlock` usage with a purpose-built responsive HTML/CSS infographic component, using the executive color palette (forest green, gold, cream) and the design patterns from the memory (cards, gradients, badges).

### Specific Graphics to Upgrade

1. **"The 5 Interview Types" table** (line ~220) — Replace with styled cards showing each type with icon, quote, and result badge (red "No Offer" / green "Offer").

2. **"Same Question, 5 Different Answers" comparison** (line ~299) — Replace with a stacked visual comparison with color-coded rows (4 red, 1 green).

3. **"Logic Tree: The Pepper Shaker"** (line ~407) — Replace with a responsive tree diagram using CSS borders/connectors, nodes as cards with gold accents.

4. **"Yes/No Tree: Mushroom Lovers Concert"** (line ~482) — Replace with a flowchart-style diagram using cards, arrows (CSS), and data callout badges showing percentages.

5. **"Vague vs. Specific Answers"** (line ~698) — Replace with a side-by-side comparison grid with red (bad) / green (good) highlighting.

6. **"Practice Scorecard"** (line ~990) — Replace with an interactive-looking checklist card with gold styling.

7. **"Before Your Next Interview: Checklist"** (line ~1007) — Replace with a styled checklist with section headers and checkbox styling.

### Technical Details
- All changes in `src/pages/ProblemSolvingGuide.tsx` only (and mirrored to `ProblemSolvingGuideZhTw.tsx`)
- Remove the generic `CodeBlock` component if no longer used
- Use existing Tailwind tokens: `bg-executive-green`, `text-gold`, `text-cream`, `border-gold/30`, etc.
- Responsive: stack vertically on mobile, use grid on desktop
- No external dependencies needed — pure HTML/CSS components

