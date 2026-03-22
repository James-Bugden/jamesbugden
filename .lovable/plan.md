

## Plan: Make Remaining Sections Interactive + Flywheel Diagram

The Alive Time Audit and Irreplaceability Audit are **already interactive** with scoring buttons from the previous implementation. The three items that need work are:

### 1. Brag Doc Template → Fillable Form (line ~941-951)
Replace the static `___________` placeholders with actual text inputs saved via `useGuideStorage`. Users fill in their weekly entries and can add multiple weeks.

- Storage key: `48laws_bragdoc_en` — array of `{ week: string, shipped: string, result: string, who: string, learned: string }`
- "Add week" button appends a new blank entry; each entry is editable inline
- Show count: "X entries logged"

### 2. Boss Management Matrix → Interactive Selector (line ~678-707)
Replace the static table + steps with two interactive selectors:
- **Boss's Ego**: Low / High (two buttons)
- **Your Visibility**: Low / High (two buttons)

Once both are selected, highlight the matching quadrant in the table (gold border) and show the strategy text prominently below. Save selections via `useGuideStorage<{ego: string, visibility: string}>("48laws_boss_matrix_en", {ego:"",visibility:""})`.

### 3. Reputation Flywheel → Visual Cycle Diagram (line ~781-787)
Replace the plain text "Results → Visibility → Trust → Opportunity → More Results" with a circular HTML/CSS flywheel diagram:
- 5 nodes arranged in a circle/pentagon using absolute positioning
- Curved arrows connecting them (CSS borders or SVG arcs)
- The "Visibility" node highlighted in gold with a pulse animation
- Caption below: "Most people break the VISIBILITY link"

### Technical details

**File:** `src/pages/FortyEightLawsGuide.tsx`

**New storage keys:**
- `48laws_bragdoc_en` — brag doc entries array
- `48laws_boss_matrix_en` — boss matrix selections

**No DB migration needed.** All data stored as JSON in existing `guide_progress` table.

