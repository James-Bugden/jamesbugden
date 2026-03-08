
Goal: eliminate sentence/bullet clipping at page boundaries in both live preview and downloaded PDF, and explain why previous fixes did not resolve it.

1) Deep-dive diagnosis (why it’s still broken)
- Previous fix improved hidden-flow pagination heuristics, but preview rendering still uses separate fresh A4Page trees per page slice. Break margins are computed/mutated in the hidden measurement flow, not guaranteed to be applied identically to every visible flow instance.
- Child targeting is still brittle: `querySelectorAll('p, li, div:not([data-page-item]), ...')` can miss/over-target nested rich-text structures from `dangerouslySetInnerHTML` (especially grouped promotions + custom sections), causing some split blocks to escape protection.
- Two-pass reflow is insufficient for consistent multi-page cascades; pushes in one branch can create new boundary collisions beyond pass #2.
- Boundary checks are still edge-sensitive for line descenders; some lines that visually clip are not classified as overflow at current tolerances/conditions.

2) Implementation plan (single-file fix in `src/components/resume-builder/ResumePreview.tsx`)
A. Unify pagination application across hidden + visible flows
- Add refs/markers for visible page content roots and apply the same page-break mutation routine to:
  - hidden measurement root (PDF source)
  - every visible A4Page root used for page slices
- This removes preview/PDF divergence.

B. Replace brittle child selector with robust block traversal
- In large-entry mode, traverse descendants with a TreeWalker (or filtered all-elements pass) and include “atomic block” candidates based on:
  - semantic tags (`li`, `p`, headings, blockquote, pre, table rows/cells, etc.)
  - plus block/list-item computed display with non-empty text
- Skip nested `[data-page-item]` containers to avoid double-handling parent/child wrappers.
- Add a marker on HtmlBlock wrapper (e.g. `data-html-block`) to prioritize deep rich-text descendants reliably.

C. Upgrade reflow algorithm from fixed 2-pass to convergence loop
- Run passes until stable (`no new pushes`) or `maxPasses` (e.g. 6–8).
- Recompute geometry every pass.
- Keep whole-entry push threshold at ~80% of usable height.
- Increase boundary safety behavior:
  - tolerance >= 4px
  - use `>=` overflow condition to catch near-boundary descender clipping.
- Preserve/accumulate margin safely for already-shifted nodes (avoid accidental overwrite drift).

D. Ensure grouped promotions/custom blocks are protected
- Confirm group wrappers and rich-text list children are treated as movable atomic blocks.
- Apply same overflow handling rules to these branches so multi-line bullets/paragraphs move as whole blocks.

3) Validation plan (must pass before closing)
- Reproduce with user-reported cases: experience bullets, custom section bullets, grouped promotions, plain paragraphs.
- Verify in live preview:
  - no clipped sentence tails at any page boundary
  - no duplicated/overlapping content after reflow
- Verify in downloaded PDF:
  - same page breaks as preview
  - no clipped descenders/sentence fragments
- Stress checks: different margins, fonts, A4/Letter, 2+ pages.

4) Expected outcome
- Whole sentences/bullets move cleanly to next page when needed.
- Large entries split only at safe child boundaries.
- Preview and PDF remain synchronized and clipping-free.
