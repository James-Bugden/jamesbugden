

## UI/UX Improvement Plan for /resume

After reviewing the full resume builder codebase, here are the most impactful improvements I'd recommend, grouped by area:

---

### 1. Dashboard Polish
- **Live thumbnail previews** on document cards instead of generic FileText/Mail icons. Render a tiny version of the actual resume content (similar to the existing thumbnail navigator) so users can visually distinguish documents at a glance.
- **Empty state illustration** when no documents exist yet — a friendly message with a visual prompt to create their first resume, rather than just showing the "New Resume" button in a grid.
- **Last-edited relative time** ("2 hours ago" instead of "4 Mar 2026") for recency context.

### 2. Editor Left Panel
- **Section drag-and-drop reordering** — sections in the Content tab can't be reordered (entries within a section can, but entire sections cannot). Add drag handles to section cards so users can reorder Experience above/below Education.
- **Collapsible personal details card** — currently always visible and takes significant vertical space. Let it collapse like section cards do.
- **Progress/completeness indicator** — a subtle progress bar or checklist showing how many sections have content (e.g., "4/6 sections filled") to guide users.
- **Keyboard shortcut hints** — show small `⌘Z` / `⌘⇧Z` labels on the undo/redo bar, and `⌘S` near the save indicator.

### 3. Preview Panel
- **Zoom controls** — add +/- zoom buttons or a zoom slider near the page indicator so users can zoom in on specific areas, rather than relying solely on auto-fit.
- **Fixed thumbnail navigator overlap** — the thumbnail in the bottom-right can overlap with the mobile preview button and the undo/redo bar. Add proper spacing/positioning.
- **Smoother page break indicators** — replace the plain text "Page Break" divider with a scissor icon or dashed line for a more professional feel.

### 4. Mobile Experience
- **Swipeable tab bar** for Content/Customize/AI Tools — currently tiny tap targets on mobile.
- **Bottom sheet for Add Content** — already uses a Drawer, but the section grid could benefit from larger touch targets (bigger cards, more padding).
- **Sticky "Preview" FAB position** — ensure it doesn't overlap with the undo/redo bar or branding footer.

### 5. Customize Panel
- **Search/filter for settings** — with 7 sub-tabs and many options, a search box at the top would help users find specific settings quickly (e.g., typing "font" highlights the relevant controls).
- **Live preview thumbnails in template switcher** — the template buttons currently just show text labels. Show actual mini-preview renders of each template style.
- **Reset to default button** per setting card — let users quickly revert individual sections to defaults.

### 6. General Polish
- **Onboarding tooltip tour** — on first visit, show 3-4 tooltips pointing to key areas (Add Content, Customize tab, Download button, Preview hover-to-edit).
- **Confirmation dialog for destructive actions** — deleting a section or removing an entry currently happens instantly. Add a brief confirmation or undo toast.
- **Download format options** — currently only PDF. Add a dropdown to also export as DOCX (even if basic), which is commonly requested by job applicants.

---

### Recommended Priority (highest impact, lowest effort first)

1. **Section drag-and-drop reordering** — high user value, moderate effort
2. **Delete confirmation / undo toast** — quick win, prevents frustration
3. **Zoom controls on preview** — small UI addition, big usability gain
4. **Live document thumbnails on dashboard** — visual polish, moderate effort
5. **Onboarding tooltips** — helps new users, moderate effort

### Technical Approach
- Section reordering: Add `draggable` handlers to `SectionCard` wrappers in `ResumeBuilder.tsx`, similar to the existing `EntryList` pattern in `SectionCard.tsx`
- Undo toast for deletions: Wrap `removeSection` with a `toast` that includes an "Undo" action button, storing the removed section temporarily
- Zoom controls: Add `+`/`-` buttons in `ResumePreview.tsx` that manually override the auto-calculated scale with a user preference
- Thumbnails: Reuse the existing `A4Page` component at a tiny scale (like the thumbnail navigator already does) inside `DocCard`

