

## Highlight Resume Sections on the Image

### Approach

Overlay semi-transparent colored bands on the resume thumbnail image, mapping each AI-scored section to its approximate vertical position on the page. This uses the same HTML/CSS overlay technique already proven in `AnnotatedResume.tsx`.

### How Section Mapping Works

Since the AI doesn't return pixel coordinates, we use a fixed vertical mapping based on standard resume layout conventions:

```text
+---------------------------+
|  Header & Contact (0-12%) |  <-- green/red band
|  Summary (12-25%)         |  <-- green/red band
|  Skills (25-35%)          |  <-- green/red band
|  Experience (35-75%)      |  <-- green/red band
|  Education (75-88%)       |  <-- green/red band
|  Additional (88-100%)     |  <-- green/red band
+---------------------------+
```

Each band gets color-coded: green (score >= 8), yellow (5-7), red (< 5), with a numbered badge and section name on hover.

### Changes

**1. `src/components/resume-analyzer/ResumeVisualSummary.tsx`**

Replace the plain `<img>` with a relative-positioned container that overlays colored highlight bands on the resume image:

- Define a `SECTION_REGIONS` map that assigns approximate `top%` and `height%` for each of the 7 standard section names (with fuzzy matching by keyword: "header", "summary", "skill", "experience", "education", "additional", "format")
- For each analyzed section, render a semi-transparent overlay band (`bg-green-500/15`, `bg-yellow-500/15`, or `bg-red-500/15`) at the mapped position
- Add a small numbered badge on the left edge of each band with the score
- On hover, show the section name + status label as a tooltip
- The "Formatting & ATS" section doesn't map to a specific area, so it gets a thin full-width indicator at the bottom or is omitted from the image overlay (shown only in the health list)

**2. Interactive connection between image and health list**

- Add hover state sync: when a user hovers over a section in the health list on the right, the corresponding band on the resume image highlights more strongly (and vice versa)
- This uses a shared `hoveredIndex` state within the component

**3. Mobile behavior**

- On mobile (stacked layout), the annotated resume image appears on top with the bands visible, followed by the health list below
- Bands remain visible without hover interaction on mobile (always shown at base opacity)
