

## Plan: Match AI Job Search Guide to Recruiter Screen Guide Design

### Key Differences Found

After comparing the two guides, here are the structural/visual mismatches:

1. **Introduction section**: Recruiter guide uses `bg-card border-b border-border` on the intro section, giving it a distinct card-like background. AI guide has no background differentiation — it's plain.

2. **Content wrapper**: Recruiter guide wraps all numbered sections inside a single `<main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">` tag. AI guide uses individual `<section>` tags each with their own container — no shared `<main>` wrapper.

3. **Section spacing**: Recruiter guide sections use `pb-14 md:pb-20` inside the main wrapper. AI guide uses `pb-16` with separate px/container per section.

4. **Section header layout**: Recruiter guide uses `flex items-start gap-5 mb-8` with `pt-3` on the text div. AI guide uses `flex items-end gap-4` with no pt offset.

### Changes (both EN + ZH-TW files)

1. **Intro section**: Add `bg-card border-b border-border` and matching padding (`py-14 md:py-20`) to the intro `<section>` element — same as Recruiter guide line 185.

2. **Wrap numbered sections in `<main>`**: After the intro section, open a `<main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">` that wraps all remaining content sections (find-path through resources + share/footer). Remove per-section `px-5 md:px-6` and `container mx-auto max-w-3xl` since the parent `<main>` handles it.

3. **Section headers**: Change from `flex items-end gap-4` to `flex items-start gap-5 mb-8` with `pt-3` on the text container — matching the Recruiter guide's visual weight.

4. **Section spacing**: Change section padding from `pb-16` to `pb-14 md:pb-20 scroll-mt-24` to match Recruiter guide rhythm.

These are purely structural/class changes — no content modifications needed.

