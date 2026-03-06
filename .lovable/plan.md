

## UX/UI Improvement Opportunities for the Resume Builder

After reviewing the codebase thoroughly, here are actionable improvements organized by impact:

---

### 1. Keyboard Shortcut Hints & Tooltips
Currently undo/redo and download have keyboard shortcuts (Cmd+Z, Cmd+S) but users have no way to discover them. Add tooltips to the undo/redo bar and download button showing shortcuts.

**Files:** `src/pages/ResumeBuilder.tsx` (UndoRedoBar, DownloadDropdown sections)

---

### 2. Empty State for Customize Panel Sections Tab
When section-specific settings have no applicable options, show a friendly empty state with guidance instead of a blank panel.

**File:** `src/components/resume-builder/CustomizePanel.tsx` (SectionsTab)

---

### 3. Smooth Scroll-to-Section When Clicking Preview
The `onEditSection` callback scrolls to a section card, but it's jarring. Add a highlight flash animation (brief green border pulse) on the target card after scrolling so the user knows where to look.

**Files:** `src/pages/ResumeBuilder.tsx` (handleEditSection), `src/components/resume-builder/SectionCard.tsx`

---

### 4. Mobile Preview Improvements
The mobile preview overlay exists but lacks download capability. Add a floating download button inside the mobile preview overlay so users can export without closing it.

**File:** `src/pages/ResumeBuilder.tsx` (MobilePreviewOverlay section)

---

### 5. Confirmation Before Losing Unsaved Work
No browser `beforeunload` guard exists. If a user navigates away from the editor with unsaved changes, they lose work silently. Add a `beforeunload` event listener.

**File:** `src/pages/ResumeBuilder.tsx`

---

### 6. Drag Handle Tooltip on Section Cards
The newly added `GripVertical` icon is subtle. Add a tooltip ("Drag to reorder") on hover to make it discoverable.

**File:** `src/components/resume-builder/SortableSectionCard.tsx`

---

### 7. Section Card Collapse Memory
Section collapse state resets when switching tabs. Persist collapse state in localStorage alongside the document data so it's restored.

**File:** `src/components/resume-builder/SectionCard.tsx`, `src/lib/documentStore.ts`

---

### 8. Better Color Picker with Preset Swatches
The accent color picker is a raw `<input type="color">` + text input. Add preset color swatches (6-8 popular accent colors) above the custom picker for faster selection.

**File:** `src/components/resume-builder/CustomizePanel.tsx` (ColorPickerRow / accent color section)

---

### Summary of Priority

| # | Improvement | Impact | Effort |
|---|-------------|--------|--------|
| 1 | Keyboard shortcut tooltips | Medium | Low |
| 2 | Empty states | Low | Low |
| 3 | Scroll highlight flash | High | Low |
| 4 | Mobile preview download | Medium | Low |
| 5 | Unsaved work guard | High | Low |
| 6 | Drag handle tooltip | Low | Low |
| 7 | Collapse state persistence | Medium | Medium |
| 8 | Color preset swatches | Medium | Low |

I'd recommend starting with items 3, 5, and 1 for maximum UX impact with minimal effort. Shall I implement all of them or a specific subset?

