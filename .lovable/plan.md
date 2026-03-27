

## Make Decision Tree Interactive

### Current State
Lines 904-985 of `OfficePoliticsGuide.tsx` contain a static CSS-based decision tree showing all branches at once.

### Plan
Replace the static tree with a step-by-step interactive component where the user clicks YES/NO buttons to navigate through questions, revealing one question at a time until they reach their PATH result.

**Flow:**
```text
Q1: Are you in political trouble right now?
  YES → Q2: Are you seen as "The Problem"?
    YES → PATH A: Emergency Repair
    NO  → Q3: Is someone blocking you?
      YES → PATH B: Adversary Management
      NO  → PATH C: Energy Redirect
  NO  → Q4: Do you know what you want from your career?
    NO  → PATH D: Goal Clarity
    YES → PATH E: Build Political Power
```

**Implementation:**
- Add `useState` to track current step (q1, q2, q3, q4, or a result path)
- Each step shows the question with YES/NO buttons styled in the existing design system (executive-green, gold accents)
- When a result is reached, show the PATH card with a "Start over" button
- Animate transitions with a simple fade
- Keep the same container styling (bg-card, border, rounded-xl)
- Result cards link/scroll to the corresponding PATH section below using anchor IDs (already present as `path-a` through `path-e`)

### Files Changed
- `src/pages/OfficePoliticsGuide.tsx` — replace lines 904-985 with interactive state machine
- Also update `src/pages/OfficePoliticsGuideZhTw.tsx` if the same tree exists there

