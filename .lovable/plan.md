

## Resume Builder Feature Improvements

### Priority 1: AI "Tailor to Job Description" Panel
- Add a new tab or panel in the "AI Tools" section (which currently shows "Coming soon")
- User pastes a job description → edge function analyzes keyword overlap with current resume
- Returns: missing keywords, suggested bullet point rewrites, match percentage
- Reuses existing `resume-ai` edge function with a new `action: "tailor"` mode
- UI: Split panel with JD on left, suggestions on right, one-click "Apply" buttons

### Priority 2: Resume Completeness Score Widget
- Floating widget in the editor sidebar showing real-time completion percentage
- Scoring rules: has summary (+10), has 2+ experience entries (+20), all entries have descriptions (+15), dates filled (+10), contact info complete (+15), skills section exists (+10), quantified achievements detected (+20)
- Visual: circular progress ring with percentage, expandable checklist of what's missing
- Lives above the "Add Content" button in the Content tab

### Priority 3: Populate the "AI Tools" Tab
- Currently renders "AI Tools — Coming soon" placeholder
- Build out with: "Tailor to Job" (above), "Generate Summary from Experience", "Suggest Skills", "Optimize Bullet Points (batch)"
- Each tool card shows a description, input area, and results

### Priority 4: Real-time Word Count per Section
- Add a small `<span>` below each `RichTextEditor` showing word count and bullet point count
- Highlight in amber if too long (>150 words per entry) or too short (<20 words)
- Lightweight: computed from the editor's text content on each change

### Priority 5: Click-to-Edit on Preview (Inline Editing)
- When user clicks text on the A4 preview, show a floating input/textarea positioned over the clicked element
- On blur/enter, update the corresponding field in the data model
- Start with simple fields only: job title, company name, degree, institution
- More complex than other items; implement after the above

### Files to Edit
- `src/pages/ResumeBuilder.tsx` — Add completeness widget, wire AI Tools tab
- `src/components/resume-builder/ResumeTopNav.tsx` — No changes needed
- `src/components/resume-builder/RichTextEditor.tsx` — Add word count display
- `supabase/functions/resume-ai/index.ts` — Add `tailor` action for JD matching
- New: `src/components/resume-builder/CompletenessScore.tsx` — Score widget component
- New: `src/components/resume-builder/AiToolsPanel.tsx` — Full AI tools tab content
- New: `src/components/resume-builder/TailorToJob.tsx` — JD tailoring panel

### Implementation Order
1. Completeness score widget (standalone, no backend needed)
2. Word count on RichTextEditor (small change)
3. AI Tools tab with Tailor to Job (needs edge function update)
4. Click-to-edit on preview (complex, last)

