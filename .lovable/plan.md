

## Link Salary Starter Kit Sections to Toolkit Tools

The Salary Starter Kit guide has 6 parts that map directly to individual tools in the Salary Negotiation Toolkit. Right now there's only a single CTA at the very bottom. We'll add inline "Use the interactive tool" links at the end of each relevant section so readers can jump straight to the toolkit tool they need.

### Section-to-Tool Mapping

| Starter Kit Section | Toolkit Tool | Path |
|---|---|---|
| Part 1: Deflection Scripts | Deflection Scripts | `/toolkit/scripts` |
| Part 2: Offer Response | Offer Response Script | `/toolkit/offer-response` |
| Part 3: Total Compensation | Compensation Calculator | `/toolkit/calculator` |
| Part 4: Counteroffer Email | Counteroffer Templates | `/toolkit/counteroffer` |
| Part 5: Pushback Scripts | Pushback Cheat Sheet | `/toolkit/pushback` |
| Part 6: Raise / Achievement | Raise One-Pager + Achievement Log | `/toolkit/raise` and `/toolkit/log` |

### What changes

**`src/pages/SalaryStarterKit.tsx`**
- At the end of each of the 6 sections, add a small inline callout card linking to the corresponding toolkit tool (e.g., "Use the interactive Deflection Scripts tool")
- Style: subtle card with gold left border, toolkit icon, and an arrow link -- consistent with the existing design language
- Fix: ensure links use proper paths

**`src/pages/SalaryStarterKitZhTw.tsx`**
- Same inline callout cards with Chinese labels
- Fix the bottom CTA link from `/toolkit` to `/zh-tw/toolkit`
- All inline links use `/zh-tw/toolkit/...` paths

### Design of inline callout

A compact card at the bottom of each section:
```text
+--gold border------------------------------------------+
|  [icon]  Use the interactive tool  ->                  |
|          Deflection Scripts                            |
+--------------------------------------------------------+
```

Uses `Link` from react-router-dom, gold left border, muted background, small text with arrow icon.
