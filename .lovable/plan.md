## Create Rema Rao Resume Review Page

Build a new client review page at `/reviews/rema-rao` following the existing premium design template, with 100% content fidelity from the provided markdown (667 lines, all preserved without truncation).

### Content Structure (from the markdown)

**Part 1: Summary**

- Overall Assessment: 90/100 (Exceptional Resume), After Implementation: 100/100
- 5 strengths, 6 areas for improvement
- Overview comparison table (7 rows: Business Results, People Management, Stakeholder Management, Geographic Scope, LinkedIn Keywords, LinkedIn Alignment, M&A Financial Context)

**Part 2: Key Improvements Explained**

- 3 Must-Fix Issues (RED):
  1. Add Quantified Business Results to UK EMI/EEA and Taiwan TPPSP Bullets (with before/after examples)
  2. People Management Experience in Recent Roles (with before/after examples)
  3. Make Stakeholder Management Explicit (with before/after examples)
- 5 Important Changes (YELLOW):
  1. Elevate Geographic Scope in Executive Summary
  2. Add Financial Context to M&A Integration Bullet
  3. Add Business Outcome to APAC Payments Strategy Bullet
  4. LinkedIn Expertise Section: Keyword Gap (with keyword list)
  5. Align LinkedIn Role Presentation with Resume

**Part 3: Detailed Section-by-Section Analysis**

- 7 sections, each with star ratings and detailed analysis:
  1. Header & Contact Details (5/5)
  2. Executive Summary (4/5 -> 5/5)
  3. Work Experience: GM Role (5/5)
  4. Work Experience: Progressive Roles (4/5 -> 5/5)
  5. Board Roles (5/5)
  6. Early Career (5/5)
  7. Education (5/5)

**Part 4: Strategic Positioning**

- LinkedIn Optimization section
- LinkedIn vs Resume Alignment

**Next Steps** (4 steps including STAR method)

**Reminders** (Do's and Don'ts)

**Final Thought**

**Feedback section** ( Trustpilot)

### Files to Create/Modify

1. **Create `src/pages/reviews/RemaRaoReview.tsx**`
  - Follow the HopeChenReview.tsx template structure
  - ScoreGauge showing 90 (Before) and 100 (After)
  - All sections with exact text from the markdown, no truncation
  - No language toggle (English-only review)
  - No download PDF button (no PDF provided yet)
  - Feedback links to Trustpilot
2. **Update `src/App.tsx**`
  - Add lazy import for RemaRaoReview
  - Add route at `/reviews/rema-rao`

### Design Notes

- Hero: Executive Green background, "Rema Rao" title, subtitle "General Manager, Financial Services | Uber"
- No ReviewLanguageToggle (English-only)
- No Download PDF button in header (no PDF uploaded)
- Before/After cards use the existing red/gold color scheme
- LinkedIn keyword list rendered as a grid of tags
- All (EXAMPLE) placeholders preserved exactly as written
- "Review Completed: March 2026" at the bottom