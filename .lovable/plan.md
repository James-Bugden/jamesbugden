

## Fix: Title "Position" toggle (Below Name / Same Line) is broken

### What I found

The toggle in CustomizePanel (line 666-674) correctly sets `titleSameLine` as a boolean. The preview code at line 771 checks:
```ts
const titleSameLine = c?.titleSameLine === true && !!p.professionalTitle;
```

And at line 806-828, it renders either a flex row (same line) or stacked layout. The logic appears correct at first glance, but the issue is likely one of these:

1. **The `titleSameLine` flex container doesn't work with the header's `textAlign` style** — the header at line 798 applies `textAlign` which doesn't affect flex items, but the flex container itself uses `justifyContent` correctly. However, when `headerArrangement` is `"stacked"` and no photo is shown, the `nameBlock` is rendered directly inside the header `<div>` which has `textAlign` set — a flex container ignores `textAlign` but the parent might interfere with layout.

2. **The `items-end` baseline alignment causes the title to appear below** when the name font size is very large relative to the title — making it look like it's still on a separate line when it actually wraps.

3. **The flex container doesn't have `flex-wrap: nowrap`** — with large names or small viewport widths, the title wraps to the next line, making it look identical to "Below Name."

### Fix plan

**File: `src/components/resume-builder/ResumePreview.tsx`**

1. Add `flexWrap: "nowrap"` and `whiteSpace: "nowrap"` to the same-line flex container (line 808) to prevent wrapping that makes it look like stacked layout
2. Add `alignItems: "baseline"` instead of `items-end` for better text alignment between different font sizes
3. If the name + title exceeds available width, allow the title to truncate with ellipsis rather than wrap (which would defeat the purpose of "same line")

**Verification**: Toggle between "Below Name" and "Same Line" — the title should visibly move beside the name on the same horizontal line versus appearing on its own line below.

