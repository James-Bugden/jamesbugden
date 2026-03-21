

## Remove 🆕 emoji from Dashboard announcement banner

**What**: Remove the `🆕` emoji from the "New: AI Job Search Guide" announcement text on the dashboard.

**File**: `src/pages/Dashboard.tsx`

**Change**: Line 324 — remove the `<span className="mr-1.5">🆕</span>` element from the announcement banner. The text "New: AI Job Search Guide" and its Chinese equivalent will remain, just without the emoji prefix.

