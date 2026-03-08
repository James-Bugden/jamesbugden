
Goal: fix the whitespace gap bug that appears after changing text size in the Resume Builder preview.

What I found
- The pagination engine computes page-break margin mutations into `mutationsRef`.
- The visible-page apply effect currently runs on `[pageCount, data, customize]`.
- On font-size changes where `pageCount` does not change, the apply effect can run before new mutations are ready, then never rerun after mutations are updated (because refs don’t trigger re-renders).  
- Result: stale margins remain applied, creating persistent white space between sections.

Implementation plan

1) Add a render-trigger for fresh pagination mutations
- File: `src/components/resume-builder/ResumePreview.tsx`
- Add a lightweight state like `mutationVersion` (number).
- After pagination finishes and `mutationsRef.current` is updated with a new generation, increment `mutationVersion`.

2) Rewire visible mutation application to run only when fresh mutations are ready
- Update the apply effect dependencies to include `mutationVersion` (and keep `pageCount` as needed for ref availability), removing reliance on `data/customize` timing.
- Keep generation guard (`lastAppliedGenRef`) so each mutation generation is applied exactly once.

3) Prevent stale spacing when content structure changes
- In apply effect, continue overwriting `marginTop` for every current `[data-page-item]` (`mt ? px : ''`) and clearing child block margins before applying child mutations.
- This ensures removed/changed entries don’t keep old spacer offsets.

4) Keep pagination/trim behavior intact
- Preserve the existing trailing-empty-page trimming logic and convergence loop.
- Do not change section rendering semantics; only synchronize when mutations are applied.

Validation checklist
- Reproduce with font size slider: increase/decrease repeatedly; confirm no phantom gaps between sections.
- Reproduce with line-height and margin sliders; confirm spacing updates smoothly.
- Re-test text formatting edits (bold/color) to confirm no flicker regression.
- Verify multi-page resumes: page breaks still avoid splitting entries and no extra trailing blank page appears.

Technical details
- Root cause is a synchronization issue between ref-updated pagination mutations and effect timing, not the spacing math itself.
- Fix strategy is event-ordering: apply mutations only after pagination publishes a new generation via state-triggered rerender.
