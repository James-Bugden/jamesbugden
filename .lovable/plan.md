

## Make 48 Laws Guide Interactive with Cloud Save

### What becomes interactive

1. **Power Audit Tracker** — The 7 areas (Direction, Managing Up, Reputation, etc.) become score inputs (1-5) with auto-calculated total, color-coded result, and history tracking per 90-day cycle.

2. **Action Step Checklists** — Each section's Action Steps get a checkbox so users can mark them done and track progress.

Both use the existing `useGuideStorage` hook which saves to localStorage for guests and syncs to the cloud `guide_progress` table for logged-in users. No database changes needed.

### Implementation

**File: `src/pages/FortyEightLawsGuide.tsx`**

1. Import `useGuideStorage` and `useAuth`, plus the `SaveBanner` pattern from `InteractiveChecklist`.

2. **Power Audit Tracker** (Section 9, ~line 1111-1146):
   - Replace static text with 7 number inputs (1-5) using `useGuideStorage<number[]>("48laws_power_audit_en", Array(7).fill(0))`.
   - Show auto-calculated total out of 35 with color-coded scoring bracket.
   - Add a "Save snapshot" button that appends `{ date, scores }` to a `useGuideStorage<Array>` history array, letting users compare 90-day cycles.
   - Show save banner for guests after they start scoring.

3. **Action Step checkboxes** (~12 Action Steps across sections):
   - Add a `useGuideStorage<boolean[]>("48laws_actions_en", Array(12).fill(false))` for tracking which action steps are completed.
   - Wrap each `<ActionStep>` with a clickable checkbox row showing completed/uncompleted state.
   - Display overall "X/12 action steps completed" counter.

4. Keep the `SaveBanner` pattern: after 2+ interactions, show "Create a free account to sync across devices" for guests (matching `InteractiveChecklist` behavior).

### Technical details

- **Storage keys**: `48laws_power_audit_en`, `48laws_audit_history_en`, `48laws_actions_en`
- **No DB migration needed** — `guide_progress` table already stores arbitrary JSON per `(user_id, guide_key)`
- **Pattern**: follows `InteractiveScorecard` from Ikigai guide (number inputs, clamped 1-5, `useGuideStorage`)
- Action Steps will be indexed by their order of appearance (0-11), with a stable array length

