

## Fix Toolkit Navigation Button on Dashboard

### Problem
Clicking the "Toolkit" navigation pill does nothing. The Toolkit section is wrapped in a `LazySection` component that only renders its children when the section scrolls into the viewport. When clicking the nav pill, `document.getElementById("toolkit")` returns `null` because the section hasn't been rendered yet, so `scrollIntoView` silently fails.

### Solution
Move the `id="toolkit"` attribute from the inner `<section>` (which only exists after lazy-loading) to the outer `<LazySection>` wrapper `<div>`. This way the scroll target always exists in the DOM regardless of whether the lazy content has loaded. When the browser scrolls to that element, it will trigger the `IntersectionObserver` inside `LazySection`, which will then render the actual content.

### Technical Details

**File: `src/components/LazySection.tsx`**
- Add an optional `id` prop to `LazySection`
- Pass it through to the outer `<div ref={ref}>`

**File: `src/pages/Dashboard.tsx`**
- Add `id="toolkit"` to the `<LazySection>` wrapper (line 765)
- Remove `id="toolkit"` from the inner `<section>` (line 766), keeping only the `scrollMarginTop` style
- Also apply `scrollMarginTop` to the `LazySection` wrapper so the scroll offset works correctly
- Do the same for the Coaching CTA `LazySection` if it has similar issues
