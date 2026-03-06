

## Remove Sub-tabs from Customize Panel — Show All Settings as a Single Scrollable List

Currently the Customize panel uses 5 sub-tabs (Basics, Layout & Spacing, Design, Header, Sections) that hide/show content. The user wants it to match the Content tab pattern: one continuous scrollable list of all setting cards.

### Changes

**`src/components/resume-builder/CustomizePanel.tsx`**

1. Remove the `SUB_TABS` constant and the `subTab` state
2. Remove the sub-tab bar UI (the `<div>` with tab buttons at lines 209-227)
3. In the main `CustomizePanel` component, render all tab contents sequentially in a single scrollable container instead of conditionally:
   - `BasicsTab` content (Language & Region, Templates)
   - `LayoutTab` content (Layout, Section Reorder, Spacing, Entry Layout)
   - `DesignTab` content (Font, Colors, Section Headings, Link Styling)
   - `HeaderTab` content (Personal Details, Name, Professional Title, Photo)
   - `SectionsTab` content (Skills, Languages, Education, Experience, Footer)
4. Each sub-tab component stays as-is internally — just render them all without conditional switching, wrapped in fragment returns within the single scrollable `div`

### Result
All customization cards appear in one vertically scrollable list, matching the Content tab's UX pattern. No sub-tab navigation required.

