## Plan: Restyle Resume Analyzer + Make Output More Comprehensive

### 1. Restyle Upload Page to Match Homepage

**ResumeAnalyzer.tsx** changes:

- **Header**: Change from `bg-background/95 backdrop-blur` to cream nav (`backgroundColor: '#FDFBF7'`) with green brand text (`color: '#2b4734'`), matching the homepage nav pattern
- **Page background**: Wrap in `experiment` class, set `backgroundColor: '#FDFBF7'` on the outer container
- **Hero text**: Use inline `style` with `color: '#1A1A1A'`, `fontSize: 'clamp(...)'` for heading, `color: '#6B6B6B'` for subtext — same as homepage
- **Upload card**: Use `backgroundColor: '#FFFFFF'` with `boxShadow: '0 4px 24px rgba(0,0,0,0.08)'` instead of current Tailwind card tokens
- **CTA button**: Change from `bg-[#1B3A2F]` to `backgroundColor: '#2b4734'` inline style with hover `#3a5a45`, matching homepage buttons
- **"How It Works" icons**: Keep gold accent (`#D4930D`)
- **Language toggle**: Match the gold-bordered pill style from homepage
- **Analyzing screen**: Cream background, gold progress ring

### 2. Restyle Results Page to Match Homepage

**ResumeResults.tsx** changes:

- **Score hero background**: Add a cream section wrapper with the homepage's cream/white alternating pattern
- **Section cards**: Use `backgroundColor: '#FFFFFF'` with homepage shadow style instead of Tailwind `bg-card`
- **Bullet rewrite card**: Gold border using `#D4930D` inline, white background
- **Coaching CTA**: Keep the dark green gradient, but ensure gold button uses `#D4930D`
- **Share section**: Keep dark green style, consistent with homepage
- **Typography**: All headings use inline `color: '#1A1A1A'`, subtext `color: '#6B6B6B'`

### 3. Make Output More Comprehensive

**Add new sections to ResumeResults.tsx** (after existing content):

- **Segmentation Profile**: Display the `analysis.segmentation` data (years experience, seniority, industry, company type, target readiness) as a compact profile card — this data is returned by the AI but currently hidden
- **Detailed Findings Count**: Show total strengths vs warnings vs critical findings across all sections as a summary bar
- **Section-by-section**: Auto-expand all sections for logged-in users (currently only first + low-scoring ones open)
- **Actionable Next Steps**: Add numbered action items derived from top priorities, with direct links to relevant guides (resume guide, interview prep, etc.)
- make sure to add all the imporvemnt points for all parts of the experience section 
- for the summary keep it to 2-3 sentences max 

### 4. Files to Change

1. `src/pages/ResumeAnalyzer.tsx` — Restyle header, hero, upload area, analyzing screen to homepage colors
2. `src/components/resume-analyzer/ResumeResults.tsx` — Restyle results + add Four Tests, Segmentation Profile, and enhanced next steps sections

No new files needed. No database changes.