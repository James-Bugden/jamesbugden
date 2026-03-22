
Goal: reapproach this as an architecture fix, not another export patch.

What is going wrong now
- The export path is still too indirect.
- `ResumePreview.tsx` currently maintains separate resume representations:
  1. `hiddenFlowRef` for pagination measurement
  2. visible preview pages
  3. export-only off-screen pages
  4. a cloned copy created again inside `captureElement()` during export
- Pagination is measured in one tree, replayed into other trees by DOM index, then captured from a cloned copy. That is why each “fix” keeps drifting from what the user actually sees.

Best reapproach
- Keep only one “source of truth” for the final paginated page UI.
- Use measurement DOM only to calculate page breaks.
- Render the actual page shells through one shared paginated page component.
- Export those same rendered page shells directly.

Implementation plan

1. Extract a shared paginated page renderer
- Pull the repeated page-shell markup out of `ResumePreview.tsx` into one internal renderer/component.
- That renderer should own:
  - page frame
  - cropped content window
  - footer
  - page numbers
  - page background
- Use it for both on-screen preview and export output so they cannot diverge structurally.

2. Reduce pagination to data, not duplicated DOM
- Keep `hiddenFlowRef` only for measurement.
- Continue computing page count and margin/push mutations there.
- Convert that result into a stable pagination model that the shared renderer consumes.
- Stop relying on “same DOM order in multiple trees” as the contract.

3. Replace the permanent export stack with on-demand export mode
- Do not keep a second always-mounted export stack in the normal preview.
- When the user clicks Download:
  - mount a temporary 1:1 export root using the same shared paginated renderer
  - wait for fonts/layout to settle
  - capture those page wrappers
  - unmount the export root after save
- This avoids stale refs and removes another long-lived duplicate tree.

4. Simplify the PDF capture pipeline
- `exportResumePages()` should only accept already-rendered page wrapper elements.
- Capture one page wrapper per PDF page.
- Remove legacy `sourceElement` usage entirely.
- Keep the font/CORS protections, but avoid cloning a cloned export structure where possible.

5. Add strict readiness guards
- Only allow export when:
  - pagination model exists
  - export root page count matches computed page count
  - fonts are ready
- If not ready, delay export by one or two animation frames instead of exporting stale DOM.

6. Add a regression checklist while implementing
- one-page resume
- multi-page resume
- two-column layout
- footer/page numbers on and off
- custom fonts/colors
- desktop and mobile trigger paths

Files to rework
- `src/components/resume-builder/ResumePreview.tsx`
- `src/lib/pdfExport.ts`
- `src/pages/ResumeBuilder.tsx`
- `src/pages/ResumeBuilderSimple.tsx`

Technical direction
- Do not go back to the separate PDF renderer for this exact-match requirement.
- Do not export `hiddenFlowRef`.
- Do not keep two hand-maintained page stacks inside `ResumePreview`.
- Remove `sourceElement` from the export contract once the new flow is in place.

Success criterion
```text
measurement DOM -> computes breaks only
shared paginated renderer -> draws preview pages
same shared paginated renderer -> draws export pages
PDF capture -> captures those exact export pages
```

Why this is the right reapproach
- It attacks the real problem: too many render copies of the same resume.
- It gives exact preview parity without depending on a separate PDF layout engine.
- It makes future preview styling changes automatically flow into export.
