

## Plan: Delete "Skip tracer" line + UI/UX Improvements for 48 Laws Guide

### 1. Content fix
**Delete "Skip tracer at a detective agency."** from the Introduction paragraph (line 334). The sentence currently reads:
> "Construction worker in Greece. Hotel receptionist in Paris. English teacher in Barcelona. Hollywood screenwriter. Skip tracer at a detective agency. Magazine editor."

Remove "Skip tracer at a detective agency." — this phrase is not in the source markdown.

### 2. UI/UX Improvements

After reviewing the full page and comparing it with the best-designed guides (Ikigai, Office Politics), here are the improvements:

**A. Sticky floating action step progress bar**
Currently, the action step counter only appears at the very bottom after completing at least 1 step. Move it to a sticky bottom bar that appears once the user completes 1+ action steps — always visible as they scroll, showing "X/19 action steps completed" with a thin progress bar. This gives constant feedback and motivation.

**B. Make the Alive Time Audit and Irreplaceability Audit interactive**
Two static audits (Alive Time Audit at line 454 and Irreplaceability Audit at line 757) currently just show questions without scoring inputs. Add the same interactive scoring buttons (like the Power Audit) so users can actually score themselves and see results. Save with `useGuideStorage`.

**C. Improve the 48 Laws collapsible cards**
Currently all 48 laws are plain collapsible text blocks. Add:
- Color-coded left border based on tag (green for USE, amber for DEFEND, red for AVOID)
- Show the tag badge on the collapsed title row (not just inside)
- This lets users scan the full list visually without opening each one

**D. Better mobile ToC**
The current mobile ToC is a floating button that opens a full list. Add section numbering dots/pills and make the current section name visible on the button (not just a menu icon), so users always know where they are in this long guide.

**E. Add reading progress bar**
Add a thin gold progress bar at the top of the page (under the nav) that fills as the user scrolls, similar to the pattern used on long-form content sites. Gives spatial awareness on a 45-min read.

### Technical details

**Files to edit:** `src/pages/FortyEightLawsGuide.tsx`

**New storage keys:**
- `48laws_alive_audit_en` — number[] (5 scores for Alive Time Audit)
- `48laws_irreplaceable_audit_en` — number[] (5 scores for Irreplaceability Audit)

**No new dependencies or DB migrations needed.**

