# Resume Builder — Preview & Export Test Plan

Last updated: 2026-04-19

Scope: verify that edits in the builder reflect correctly in both the live preview and the downloaded PDF, and that customization settings apply consistently across both surfaces. Covers English and CJK (Traditional Chinese, Simplified Chinese, Japanese, Korean) content.

## How to use

1. Load the resume builder at `/resume` (EN) or `/zh-tw/resume` (ZH).
2. Work through each section top-to-bottom. Each row is one test case.
3. For every case: perform the action, check the preview, then click Download and check the PDF.
4. Mark pass/fail. Capture a screenshot for any fail.

## A. Content edits (data path)

| # | Action | Preview check | PDF check |
|---|---|---|---|
| A1 | Type into name field | Updates within the debounce window (<500ms after pause) | Correct name in download |
| A2 | Type a 500+ char job description | No UI freeze, no stale-content flash | Description wraps cleanly, no overflow |
| A3 | Add / remove / duplicate section entries | Page count updates | Matches preview |
| A4 | Reorder sections via drag-drop | Order flips in preview | Order flips in PDF |
| A5 | Paste rich text (bold / italic / links) | Formatting preserved, links clickable | Same formatting, links selectable and clickable |
| A6 | Add special chars: é, ü, ñ, emoji | All glyphs render | All glyphs render |
| A7 | Enter CJK content (TC, SC, JP, KR) | Image preview OR iframe fallback; no crash | Correct glyphs in PDF |
| A8 | Leave optional fields blank (no phone, no photo) | No broken layout | No broken layout |
| A9 | Upload photo, then remove it | Image appears, then disappears | Same |
| A10 | Very long name (40+ chars) | No overflow past page edge | No overflow past page edge |
| A11 | Date fields with overlapping ranges | Warning visible if applicable | PDF renders dates as entered |
| A12 | Undo/redo (Ctrl+Z / Ctrl+Shift+Z) | History respected | Download reflects current state |

## B. Customization (customize path)

| # | Action | Check |
|---|---|---|
| B1 | Change accent color via picker | Instant visual update in preview AND PDF |
| B2 | Cycle heading style (plain → underline → full-underline → left-accent → background → left-border) | Each style renders identically in preview and PDF |
| B3 | Swap template preset | Layout shift matches between preview and PDF |
| B4 | Switch columns (1 → 2 → mix) | Column widths correct; no content cut |
| B5 | Slide fontSize min → max | Page count may shift; export matches |
| B6 | Slide lineHeight / sectionSpacing / marginX / marginY | Pagination shifts identically in preview and PDF |
| B7 | Switch A4 ↔ Letter | Dimensions change; page count recomputed |
| B8 | Change headingFont / nameFont | Weight and family match in PDF |
| B9 | Toggle group-promotions / nameBold / linkBlue | Flags apply identically |
| B10 | subtitlePlacement / subtitleStyle variants | All combinations render without overflow |
| B11 | Change entryLayout (stacked / inline / compact / academic) | Layout changes in both |
| B12 | Reorder section order (customize.sectionOrder) | Order reflects in both |

## C. Pagination edge cases

| # | Scenario | Check |
|---|---|---|
| C1 | Resume that fits exactly one page | No blank trailing page |
| C2 | Resume that overflows one line onto page 2 | Clean break; no orphaned heading |
| C3 | 3+ pages | All rendered, correct page numbers |
| C4 | Section heading at bottom of page | Doesn't split from first entry |
| C5 | List item at page boundary | No mid-word break |
| C6 | Photo + long name + long title at top | Header does not overflow |

## D. Language / locale

| # | URL | Content | Check |
|---|---|---|---|
| D1 | `/resume` | All English | Fast raster preview; download matches |
| D2 | `/resume` | English with some Chinese mixed | Iframe fallback or raster — no crash |
| D3 | `/zh-tw/resume` | Traditional Chinese | Preview works (iframe or raster); PDF has correct glyphs |
| D4 | `/zh-tw/resume` | Simplified Chinese | Same |
| D5 | `/zh-tw/resume` | Mixed CJK + English runs | Both scripts render; font picker does not apply to CJK runs |
| D6 | Switch language mid-session via URL | State persists via document store |

## E. Preview ↔ Export fidelity

| # | Action | Check |
|---|---|---|
| E1 | Take a screenshot of preview, open downloaded PDF side-by-side | Visual diff minimal across fonts, spacing, colors |
| E2 | Click Download → open file | Opens in system PDF viewer cleanly |
| E3 | Download after heavy customization | All customize settings reflected in file |
| E4 | Download Chinese resume | Glyphs correct, text selectable |
| E5 | Download 3-page resume | All pages present in order |
| E6 | Open downloaded PDF in Acrobat, Preview, Chrome | No viewer-specific rendering bugs |

## F. Performance

| # | Measure | Target |
|---|---|---|
| F1 | Keystroke → preview update (English) | < 600ms |
| F2 | Customize slider release → preview update | < 400ms |
| F3 | Debounce fire → first paint (English) | < 500ms |
| F4 | UI responsiveness during render — type continuously | No dropped frames, no input lag |
| F5 | Memory growth after 10 min of edits | < ~100MB |
| F6 | CJK resume — preview renders or falls back cleanly | No "Preview crashed" error banner |

## G. Regression sentinels

These are specific bugs that have shipped before. Check each one as part of every release.

| # | Bug | Check |
|---|---|---|
| G1 | "Preview crashed" on CJK (pre-`a1deec7`) | Iframe fallback kicks in |
| G2 | Blank trailing page on EN resume (pre-`ddd3224`) | No blank final page |
| G3 | Customize change invisible in iframe fallback | Iframe re-renders when customize changes |
| G4 | Preview flicker on rename | No flash of stale content |
| G5 | Duplicate Publish caused env drift | Lovable tracks main only |
| G6 | Tokyo round-trip slowed preview for all users (session regression) | `serverPreviewEnabled()` defaults to OFF |

## H. Export-only

| # | Action | Check |
|---|---|---|
| H1 | Download via Download button | File downloads with correct filename |
| H2 | Download with special chars in resume name | Filename sanitized |
| H3 | Download while preview is still regenerating | Download waits for complete render |
| H4 | Download with photo at 2MB+ | Image embedded correctly |
| H5 | Re-download without changes | No spurious re-render cycle |
