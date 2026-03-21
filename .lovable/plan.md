

## Redesign JobTitleWorksheet for Clarity and Usability

### Problems Identified

1. **Confusing purpose** — Title "Interactive Resume Workbook" doesn't explain what this tool does. The subtitle is vague. Users don't understand why they should use it or what outcome they'll get.

2. **Instructions are overwhelming** — 7 steps shown in a collapsible panel, mixing concepts (skills, counts, experiences, achievements, keywords, bullet points) without visual flow. Users see a wall of text.

3. **Empty state is unhelpful** — Shows 20 empty rows immediately, which is intimidating. The empty state message only shows when no job title is entered, but the tab system makes this confusing.

4. **Column relationships are invisible** — The 6-column table doesn't show that columns 1-2 (skills/count) are about the job, columns 3-4 (experience/achievement) are about YOU, column 5 (keywords) is the BRIDGE, and column 6 (bullet point) is the OUTPUT. This is the core mental model users need.

5. **Mobile UX is poor** — 20 cards with 6 fields each = massive scroll. No way to collapse or focus on one step at a time.

6. **AI prompts are disconnected** — "Generate with AI" button appears but users don't know where to paste results back.

7. **No visual workflow** — Users can't tell if they're making progress through the steps or just filling random fields.

### Plan

**File**: `src/components/guides/JobTitleWorksheet.tsx`

**1. Rewrite header and subtitle**
- EN: "Job Title Keyword Worksheet" / "Turn job description keywords into resume bullet points. One tab per target role."
- ZH: "職稱關鍵字工作表" / "將職缺描述中的關鍵字轉化為履歷條列句。每個分頁對應一個目標職位。"

**2. Replace 7-step instructions with a 3-phase visual flow**
- Show a simple horizontal stepper (3 phases) instead of 7 text steps:
  - Phase 1: "Research the Job" → Fill Skills + Count columns from job descriptions
  - Phase 2: "Map Your Experience" → Add your experiences, achievements, and match keywords  
  - Phase 3: "Build Bullet Points" → Combine into optimized resume bullets
- Each phase shows 1-2 sentences max, with the relevant AI prompt inline
- Use colored badges/icons to make phases scannable

**3. Improve empty state**
- When job title is empty: show a focused prompt card with input field and "Get Started" CTA
- Start with 5 rows instead of 20 (less intimidating), let users add more
- Show example data as placeholder text in first row

**4. Add column group headers on desktop table**
- Add a secondary header row above the columns:
  - "The Job" spans Skills + Count
  - "Your Background" spans Experience + Achievement  
  - "The Match" spans Keywords + Bullet Point
- Use subtle background colors to visually group columns

**5. Improve mobile card layout**
- Group fields into the 3 phases with collapsible sections per card
- Show only skill name and a completion indicator in collapsed state
- Add a "phase indicator" badge on each card

**6. Better placeholder text**
- Skills: "e.g. Project Management"
- Count: leave as number
- Experience: "e.g. Led product launch at Acme Corp"
- Achievement: "e.g. Increased user retention by 35%"
- Keywords: keep selector
- Bullet Point: "e.g. Spearheaded product launch driving 35% retention increase through strategic project management"

**7. Update Chinese labels to match**
- Same structural improvements with proper ZH translations

### Files Modified
- `src/components/guides/JobTitleWorksheet.tsx` — all changes in this single component

