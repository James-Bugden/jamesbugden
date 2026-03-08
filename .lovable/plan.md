

## Audit Results — Resume Builder Issues Found

### 1. **BUG: Orphan heading protection logic is inverted** (ResumePreview.tsx ~line 1099)
The condition `spaceBelow = pageBottom - elBottom` computes a **negative** value when the heading straddles the page boundary (since `elBottom > pageBottom` by definition in that code branch). This means `spaceBelow < 40` is **always true** for any straddling heading, causing ALL h2/h3 elements that cross a page boundary to be pushed — even ones with plenty of room. The check never reaches the normal entry-splitting logic for headings.

**Fix:** The orphan check should look at how much space is left *above* the heading on the current page, not below. Replace `spaceBelow` with something like `const spaceRemaining = pageBottom - elTop;` and only push if the heading is near the very bottom (e.g., `spaceRemaining < 40`).

---

### 2. **BUG: "Two Column" and "Sidebar" templates still available but columns UI removed**
The template picker in `CustomizePanel.tsx` shows all 8 templates including "Two Column" and "Sidebar" (`TEMPLATE_LIST` lines 14-15 in templatePresets.ts). Selecting these applies `columns: "two"` or `columns: "mix"` to the settings. However, the column layout UI controls were removed, so users can't adjust or understand why the layout changed, and `ResumePreview.tsx` still has two-column rendering logic (`isTwoColumn` at line 764) that may produce unexpected results.

**Fix:** Either remove the two-column/sidebar templates from `TEMPLATE_LIST`, or force `columns: "one"` in `applyTemplatePreset` regardless of the template's preset value.

---

### 3. **Minor: Dead `whitespaceWarningShown` ref** (ResumePreview.tsx lines 1024, 1192-1194)
The `whitespaceWarningShown` ref and its reset effect are leftover from the removed toast warning. They're harmless but dead code.

**Fix:** Remove the ref declaration and the associated `useEffect`.

---

### 4. **No other breaking issues found**
- Routing, lazy loading, and all page routes are correctly configured
- Document store (localStorage) CRUD operations are sound
- Undo/redo (manual history in ResumeBuilder.tsx) works correctly
- Auto-save to document store triggers properly
- AI tools panel calls edge function correctly
- PDF export pipeline is intact
- DnD section reordering syncs with customize sectionOrder
- Cover letter builder loads/saves independently
- All type definitions are consistent

### Summary of fixes needed

| # | Severity | Issue | File |
|---|----------|-------|------|
| 1 | **High** | Orphan heading logic always triggers (inverted condition) | ResumePreview.tsx |
| 2 | **Medium** | Two-column templates still selectable after column UI removal | templatePresets.ts / CustomizePanel.tsx |
| 3 | **Low** | Dead `whitespaceWarningShown` ref | ResumePreview.tsx |

