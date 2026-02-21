

# Performance Optimization (Excluding Logo Changes)

## 1. Lazy-render below-fold sections

Create a new `LazySection` component that uses `IntersectionObserver` to defer mounting of children until they are near the viewport.

**New file:** `src/components/LazySection.tsx`
- Uses `useRef` + `useState` + `IntersectionObserver` with `rootMargin: "200px"`
- Renders a placeholder `<div>` until visible, then mounts children
- Once visible, stays mounted (no unmounting on scroll-away)

**Update:** `src/pages/Index.tsx` and `src/pages/IndexZhTw.tsx`
- Wrap `HomepageTestimonials`, `SelfSegmentation`, `OfferCalculatorCTA`, `ReadinessAssessment`, and `CoachingCTA` in `<LazySection>` tags
- Keep `LogoScroll` eager since it's close to the fold

This defers ~1,000+ DOM nodes and associated JS execution from initial load.

## 2. Defer MailerLite script to interaction

**Update:** `src/components/MailerLiteForm.tsx`
- Remove the `useEffect` that calls `loadMailerLite()` on mount
- Instead, call `loadMailerLite()` on `onFocus` of the email input field
- This delays the ~1.4s third-party script until the user actually interacts with the form

## 3. Add lazy loading to testimonial images

**Update:** `src/components/HomepageTestimonials.tsx` and `src/components/HomepageTestimonialsZhTw.tsx`
- Add `loading="lazy"` and explicit `width={48} height={48}` to all testimonial `<img>` tags (except the featured one which may be near-fold)

## 4. Remove prefetch links

**Update:** `index.html`
- Remove the three `<link rel="prefetch">` tags for `/quiz`, `/offer-calculator`, and `/guides` to stop consuming bandwidth before the page finishes loading

---

## Technical Notes

- No logo files or `LogoScroll.tsx` will be changed
- The `LazySection` component is ~20 lines with zero dependencies
- All changes are backward-compatible -- sections render identically once visible
