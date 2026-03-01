

## Optimize About Section and Move Above FAQ

### Position Change
Move the About section from after the FAQ to between the Salary Proof section and the FAQ. New order:
1. Salary Proof (dark green `#2b4734`)
2. **About** (dark green `#2b4734`)
3. FAQ (white `#FFFFFF`)

Since Salary Proof and About are both dark green, they'll flow together seamlessly. The About section then transitions into the white FAQ, which transitions into the dark green footer -- a clean alternation.

### Visual Fixes

**1. Match the brand color**
- Change background from `#1B3A2F` to `#2b4734` to match Salary Proof and Footer
- Change text colors to match the Salary Proof palette: `#FBF7F0` for headings, `#A8B5A9` for body text

**2. Add a thin gold divider**
- Add a horizontal gold line (`#D4930D`, 60px wide, 3px tall) between the Salary Proof section and the About section to visually separate them while keeping the same background

**3. Add gold section label**
- Add a small uppercase tracking-wide gold label "ABOUT" above the name, matching how other sections use gold accents

**4. Upgrade social links to pill badges**
- Wrap LinkedIn and Threads links in semi-transparent pill containers (`rgba(255,255,255,0.08)` background, subtle border)
- This matches the premium card styling used elsewhere on the page

**5. Add a CTA button**
- Add a gold "Book a 1-on-1 Session" button below the social row, linking to coaching
- Uses the existing `btn-gold` styling from the design system

**6. Photo treatment**
- Add a subtle gold border (`2px solid rgba(212,147,13,0.3)`) to match the hero photo's gold ring treatment
- Keep both photos but tighten spacing

### Files to Edit
- `src/components/AboutSection.tsx` -- All visual updates
- `src/components/AboutSectionZhTw.tsx` -- Same changes, Chinese text
- `src/pages/IndexExperiment.tsx` -- Move About LazySection above FAQ
- `src/pages/IndexExperimentZhTw.tsx` -- Same reorder
