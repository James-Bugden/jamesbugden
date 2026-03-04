

## Diagnosis

### 1. Section Reorder — Not Implemented
The "Change Section Layout" card (CustomizePanel line 331-345) renders static rows with a `GripVertical` icon but has no drag-and-drop or move-up/move-down logic. The `sectionOrder` array in customize settings is never updated.

### 2. Subtitle Style & Placement — Working in Code, But May Not Visually Distinguish
Looking at the preview code (lines 419-536), subtitle style and placement ARE read from settings. However, there are two issues:
- The `subtitleStyle` "italic" sets `fontStyle: "italic"` correctly, but "bold" sets `fontWeight: 700` while the subtitle text already inherits from a parent. The visual difference may be too subtle.
- The "same-line" placement renders the subtitle after a " · " separator inside the same `<p>` tag — this works but the subtitle uses `var(--resume-subtitle)` color which may blend in if accent colors aren't applied.

After closer inspection, the code logic is correct. The issue is likely that the **accent color toggles aren't wired** (see #5 below), so subtitle color never changes, making style changes hard to see.

### 3. List Style — CSS Pseudo-Element Broken
The hyphen list style uses `[&_ul_li]:before:content-['–_']` in a Tailwind class string. This complex nested arbitrary selector likely doesn't compile correctly in Tailwind JIT. The fix is to use inline styles or a `<style>` tag instead of Tailwind arbitrary selectors for the hyphen case.

### 4. Colors — Accent Apply Checkboxes Not Wired
This is the biggest bug. The preview's `cssVars` (lines 588-604) always uses the explicit color values (`nameColor`, `headingsColor`, etc.) and **never checks** the `accentApply*` flags. For example:
- `--resume-name` always = `nameColor` — should be `accentColor` when `accentApplyName` is true
- `--resume-headings` always = `headingsColor` — should be `accentColor` when `accentApplyHeadings` is true  
- Same for dates, title, subtitle, icons

## Plan

### Fix 1: Section Reorder (CustomizePanel.tsx)
Add move-up / move-down arrow buttons to each section row. On click, update `sectionOrder` in customize settings. No external drag-and-drop library needed — simple array reorder with arrow buttons.

### Fix 2: Wire Accent Color Application (ResumePreview.tsx)
Update the `cssVars` computation to check each `accentApply*` flag:
```
"--resume-name": accentApplyName ? accentColor : nameColor
"--resume-headings": accentApplyHeadings ? accentColor : headingsColor
"--resume-dates": accentApplyDates ? accentColor : datesColor
"--resume-title": accentApplyTitle ? accentColor : titleColor
"--resume-subtitle": accentApplySubtitle ? accentColor : subtitleColor
```

### Fix 3: Fix List Style Rendering (ResumePreview.tsx)
Replace the Tailwind arbitrary class approach for hyphen/none list styles with a scoped `<style>` tag or inline approach using a unique class name per section, ensuring the hyphen `::before` pseudo-element renders correctly.

### Files to Edit
- `src/components/resume-builder/CustomizePanel.tsx` — section reorder buttons
- `src/components/resume-builder/ResumePreview.tsx` — accent color wiring + list style fix

