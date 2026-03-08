

## Inline Text Formatting Toolbar on Selection

### What it does now
Clicking any element in the preview opens a color picker that changes the color for the **entire role** (e.g., all headings, all dates). No per-selection formatting exists.

### What the user wants
Select any text in the preview → a floating toolbar appears with **Bold, Italic, Underline, Color** options → applies formatting to just the selected text. This works across all sections freely.

### How to implement

**1. Make preview text selectable and editable**
- The resume content is rendered via `dangerouslySetInnerHTML` in `HtmlBlock` and hardcoded `<p>`/`<span>` elements. To allow inline formatting, the page content area needs to respond to text selection.
- The simplest approach: listen for `selectionchange` / `mouseup` events on the preview container. When a selection exists (non-collapsed), show a floating toolbar near the selection.

**2. Create a new `InlineFormatToolbar` component**
- Appears above/below the text selection anchor
- Buttons: **Bold** (`<strong>`), **Italic** (`<em>`), **Underline** (`<u>`), **Color picker** (wraps selection in `<span style="color:...">`)
- Uses `document.execCommand` or the Selection/Range API to wrap the selected text with formatting tags
- The toolbar positions itself using `selection.getRangeAt(0).getBoundingClientRect()`

**3. Propagate changes back to the resume data store**
- After formatting is applied, read the updated `innerHTML` of the closest content block (identified by a `data-section-id` + `data-entry-id` attribute) and call `onChange` to persist the change back into `useResumeStore`
- This requires adding `contentEditable="true"` to editable text blocks (descriptions, titles, etc.) or alternatively using the Range API to modify the underlying HTML string in the store

**4. Architectural approach — `contentEditable` on key text elements**
- Add `contentEditable="true"` to `HtmlBlock` (descriptions) and entry title/subtitle `<p>` elements
- On `input` event, read back the innerHTML and update the store
- On `mouseup`/`selectionchange`, if there's a selection inside an editable element, show `InlineFormatToolbar`
- Use `document.execCommand('bold')`, `execCommand('italic')`, `execCommand('underline')`, and for color: `execCommand('foreColor', false, color)` — these work on contentEditable elements and are the simplest path

**5. Changes to existing code**
- **`ResumePreview.tsx`**: Add `contentEditable` to `HtmlBlock` and key text elements. Add selection listener. Render `InlineFormatToolbar` when selection is active.
- **New file `InlineFormatToolbar.tsx`**: Floating toolbar with Bold, Italic, Underline, Color buttons. Positioned at selection rect. Uses `execCommand` for formatting.
- **`HtmlBlock` component**: Add `onInput` handler to sync changes back, add `contentEditable="true"`, suppress React hydration warning.
- **Keep existing `data-color-role` click behavior** as-is for whole-role color changes — the new toolbar is additive.

**6. DOMPurify configuration**
- Update sanitize config to allow `style` attributes (for inline color spans) and tags like `<u>`, `<span>`, `<strong>`, `<em>`.

### Files to create/modify
- **Create**: `src/components/resume-builder/InlineFormatToolbar.tsx`
- **Modify**: `src/components/resume-builder/ResumePreview.tsx` — add contentEditable, selection listeners, render toolbar

