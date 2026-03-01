

## Fix SalaryProofSection Background Colors

### Problem
The two dark sections use off-brand colors:
- Part A uses `#1A1A1A` (charcoal black) -- should be brand dark green
- Part B uses `#232E24` (dark olive) -- should use the matching darker shade

### Changes (1 file: `src/components/SalaryProofSection.tsx`)

**Part A -- "The numbers speak for themselves"**
- Change background from `#1A1A1A` to `#1B3A2F` (the brand's deep forest green, matching other dark sections on the site)

**Part B -- "Here's what negotiating looks like"**
- Change background from `#232E24` to `#2D3A2E` (the slightly lighter executive green used in the experiment's Final CTA section, creating a subtle two-tone effect)

Both sections will now use the same forest green palette as the rest of the site (nav, footer, final CTA), maintaining visual consistency.

No copy or layout changes -- only the two background-color values.

