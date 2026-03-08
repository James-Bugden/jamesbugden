

## Replace Comparison Cards with Bar Chart Visualization

**Goal**: Replace the two stacked text cards (lines 54–83) in `SalaryProofSection.tsx` (and its ZhTw counterpart) with a side-by-side vertical bar chart, inspired by the reference screenshot.

### Design
- Two vertical bars side by side: a shorter muted bar for "Accept First Offer" (NT$73M) and a taller gold bar for "Negotiate Strategically" (NT$153M)
- Pure CSS bars (no charting library needed) — proportional heights based on the values
- Labels below each bar with the scenario name, raise %, and total amount
- A "3-Year Salary Comparison" style heading above: "30-Year Career Earnings"
- Keeps the same dark green background and color palette (#D4930D gold, #A8B5A9 muted text, #FBF7F0 white)
- Mobile responsive: bars stay side-by-side but shrink proportionally

### Structure
```
  ┌─────────────────────────────────┐
  │   30-Year Career Earnings       │
  │   Same starting salary. Two     │
  │   strategies.                   │
  │                                 │
  │      ┌───┐                      │
  │      │   │    ┌───┐             │
  │      │   │    │   │  ← gold bar │
  │      │   │    │   │             │
  │      │   │    │   │             │
  │      └───┘    └───┘             │
  │    NT$73M    NT$153M            │
  │   Accept    Negotiate           │
  │   15%/change 30%/change         │
  └─────────────────────────────────┘
```

### Files Changed
1. **`src/components/SalaryProofSection.tsx`** — Replace lines 54–83 (the two comparison cards) with a CSS bar chart component showing two proportional bars with labels
2. **`src/components/SalaryProofSectionZhTw.tsx`** — Same change with Traditional Chinese text equivalents

