

## Add Interactive Templates to Career Game Guide (EN + ZH)

### What
Create 9 fillable interactive widgets embedded in both English and Chinese Career Game Guide pages. Each widget saves to localStorage and has a "Copy" button. They replace the current static text descriptions of exercises.

### Widgets to Build

All widgets go in a new file: `src/components/career-game/InteractiveTemplates.tsx`

**1. SkillAssessment** — 20-skill scoring grid
- 4 columns: Skill | You (1-10) | Boss | Peer | Stakeholder | Average
- Auto-calculates average per row, highlights top 3 "spikes"
- Copy button exports as formatted text

**2. ElevenList** — fillable template
- 5 input fields "Want to be known for"
- 5 input fields "Don't want to be known for"  
- 1 textarea for mission statement
- Copy button

**3. ElevatorPitch** — two textarea fields
- Sentence 1, Sentence 2
- Character count hint
- Copy button

**4. InfluencerList** — scoring table
- Add rows (name + 8 criteria scored 1-5): Relationship, Seniority, Risk, Power, Exposure, Fear, Validation, Future influence
- Auto-total, auto-sort
- Copy button

**5. AccomplishmentTracker** — weekly log
- 5 rows (Mon-Fri): What I did | Impact | Who knows? | Type [B/I/D]
- Week label input
- Copy button

**6. OneOnOnePrep** — 10/10/10 structure
- 3 textareas: Inform (10 min) | Escalate (10 min) | Advocate (10 min)
- Copy button

**7. BAUTransformer** — single task identifier
- Fields: BAU task | How to bundle/rebrand/automate | Expected impact
- Copy button

**8. CompetencyReScore** — simplified re-assessment
- Reuses the 20 skills, just "Current Score" column + "Previous Score" (read from SkillAssessment localStorage) + Delta
- Copy button

**9. FortyFortyTwentyReview** — work split tracker
- 5 day rows: Task | Hours | Category (BAU/High-Impact/Self-Dev)
- Auto-calculates percentage split
- Visual bar showing actual vs target
- Copy button

### Integration

**In `CareerGameGuide.tsx` (EN):**
- Section 3 (Spikes): Add `<SkillAssessment lang="en" />` after the 20-skills collapsible
- Section 4 (Brand): Add `<ElevenList lang="en" />` after the 11-List description, `<ElevatorPitch lang="en" />` after pitch paragraph
- Section 5 (Promotion): Add `<AccomplishmentTracker lang="en" />` after "Start an accomplishment tracker" paragraph
- Section 6 (Network): Add `<InfluencerList lang="en" />` after the 8-criteria description
- Action Tracker Steps: Replace checklist items with interactive versions:
  - Step 1: embed SkillAssessment, FortyFortyTwentyReview, ElevenList links
  - Step 2: embed CompetencyReScore
  - Step 3: embed ElevatorPitch
  - Step 5: embed AccomplishmentTracker, OneOnOnePrep, BAUTransformer
  - Step 6: embed CompetencyReScore, FortyFortyTwentyReview

**In `CareerGameGuideZhTw.tsx` (ZH):** — same placement, `lang="zh"`

### Design
- Each widget: card with border, collapsible header ("Try it: [name]" / "試試看：[name]")
- Inputs use existing `Input` and `Textarea` components
- Gold "Copy" button top-right
- localStorage key pattern: `career_game_{widget}_{lang}`
- All labels fully translated for ZH version

### Files
1. **New**: `src/components/career-game/InteractiveTemplates.tsx` — all 9 widget components
2. **Edit**: `src/pages/CareerGameGuide.tsx` — embed EN widgets
3. **Edit**: `src/pages/CareerGameGuideZhTw.tsx` — embed ZH widgets

