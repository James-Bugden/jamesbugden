

# Admin Dashboard UI/UX Improvements

## Problems Identified
1. **Reviews tab is hard to find** — it's the 4th tab in a row of 9, buried between "Email Leads" and "Salary". On mobile, it requires horizontal scrolling to reach.
2. **Too many tabs** — 9 tabs (Accounts, Resume Leads, Email Leads, Reviews, Salary, Feedback, AI Usage, Analytics, Insights) create cognitive overload and make important sections easy to miss.
3. **No visual hierarchy** — all tabs look identical; no way to distinguish management tools (Reviews) from analytics (Insights).
4. **Overview cards don't link to tabs** — the stat cards at the top are passive; clicking them should navigate to the relevant tab.

## Solution: Reorganize into 4 grouped tabs with sub-navigation

### New tab structure

```text
┌─────────────┬─────────────┬─────────────┬─────────────┐
│  Overview   │   People    │    Data     │  Insights   │
└─────────────┴─────────────┴─────────────┴─────────────┘
```

- **Overview** (default) — The stat cards grid (already exists) + a quick-glance section with: recent signups (last 5), recent resume leads (last 5), recent feedback (last 3). Clicking any card or "View all" links to the relevant tab.
- **People** — Sub-tabs: Accounts | Resume Leads | Email Leads (existing content, unchanged)
- **Data** — Sub-tabs: Reviews | Salary | Feedback | AI Usage (existing content, unchanged). **Reviews is now the first sub-tab** so it's immediately visible.
- **Insights** — The existing Insights + Analytics tabs merged into one view (Insights charts at top, raw Analytics events below in a collapsible section)

### Clickable stat cards
Each overview card becomes clickable, navigating to the relevant tab:
- Accounts → People/Accounts
- Resume Leads → People/Resume Leads
- Email Leads → People/Email Leads
- Salary → Data/Salary
- Feedback → Data/Feedback
- AI Usage → Data/AI Usage
- Shares/Events → Insights

### Technical details

**File: `src/pages/AdminDashboard.tsx`**
- Replace the single `Tabs` with a two-level navigation:
  - Top level: 4 main tabs using existing `Tabs` component
  - Inside People and Data tabs: nested `Tabs` for sub-sections
- URL params: `?tab=data&sub=reviews` format to preserve deep-linking
- Wrap each stat card in a clickable div that calls `setSearchParams`
- Move the Analytics tab content (share clicks, event tracks tables) into a collapsible section within the Insights tab
- Reviews sub-tab is first in the Data group, making it immediately visible

**File: `src/components/admin/InsightsTab.tsx`**
- Add an optional `analyticsSection` prop that renders the raw Analytics tables (share clicks, event tracks) in a collapsible `<details>` at the bottom

### Visual improvements
- Stat cards get `cursor-pointer hover:border-primary/30` for click affordance
- Active stat card gets a subtle highlight ring matching its color
- Sub-tab bars use a smaller, pill-style variant to differentiate from main tabs

