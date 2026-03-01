

## Speed Up the Website

After analyzing the codebase, here are the main bottlenecks and fixes, organized from highest to lowest impact.

### 1. Optimize Image Imports (Biggest Win)

**Problem:** Logo images (17 files) and testimonial photos (7+ files) are statically imported, meaning they get bundled into every page's JavaScript chunk even when not visible. PNG/JPG logos should be WebP or SVG.

**Fix:**
- Convert all remaining `.png` and `.jpg` logo files to `.webp` (smaller file size)
- Add `loading="lazy"` and explicit `width`/`height` attributes to all logo and testimonial images
- Use native `<img>` tags with `/assets/` paths instead of JS imports where possible to avoid bundling

### 2. Reduce Initial JavaScript Bundle

**Problem:** The `App.tsx` file imports 80+ lazy-loaded pages. While lazy loading helps, the router configuration itself is heavy. Additionally, `@supabase/supabase-js` loads on every page even when not needed (e.g., public homepage).

**Fix:**
- Move the `AuthProvider` (which imports Supabase) so it only wraps routes that need auth, not the entire app
- Split the route definitions into smaller grouped files (reviews, toolkit, guides) so the router config is lighter
- Add `React.StrictMode` removal for production builds (already not present, good)

### 3. Defer Non-Critical CSS and Scripts

**Problem:** The `index.css` file is 593 lines and loads all styles upfront including experiment-specific styles and complex component styles.

**Fix:**
- Move experiment-specific CSS (`.experiment .btn-gold`, etc.) into the experiment page components themselves using inline styles or CSS modules
- This reduces the critical CSS that blocks rendering

### 4. Add Resource Hints for Faster Loading

**Problem:** No `dns-prefetch` or `preconnect` for the backend API domain.

**Fix in `index.html`:**
- Add `<link rel="dns-prefetch" href="https://reahmeddjkivwzjsoqkn.supabase.co">` for faster auth checks
- Add `<link rel="preload">` for the hero image (james-bugden.jpg) on the homepage with `fetchpriority="high"`

### 5. Optimize Dashboard Component (765 lines)

**Problem:** The Dashboard renders all sections (tools, guides, toolkit, CTA, footer) at once -- even content below the fold.

**Fix:**
- Wrap the Toolkit section and CTA section in the existing `LazySection` component so they only render when scrolled into view
- Memoize the `GuideCard` component with `React.memo` to prevent re-renders when the search query changes

### 6. Reduce Lucide Icon Bundle

**Problem:** 86 files import from `lucide-react`, many importing 15+ icons each. Tree-shaking helps, but the total icon count is still large.

**Fix:**
- No code change needed -- Vite tree-shakes unused icons. But ensure imports use named imports (already done correctly).

---

### Technical Summary

| Change | Files | Impact |
|--------|-------|--------|
| Image optimization (WebP + lazy loading) | `LogoScroll.tsx`, `HomepageTestimonials.tsx`, logo assets | High -- reduces payload by ~200-500KB |
| Defer AuthProvider to auth routes only | `App.tsx` | Medium -- removes Supabase from homepage bundle |
| LazySection for dashboard below-fold | `Dashboard.tsx` | Medium -- faster dashboard paint |
| Resource hints in index.html | `index.html` | Low-Medium -- faster DNS/connection |
| Move experiment CSS inline | `index.css`, experiment components | Low -- smaller critical CSS |

### Implementation Order

1. Add resource hints to `index.html`
2. Wrap Dashboard below-fold sections in `LazySection`
3. Add `loading="lazy"` to all images in `LogoScroll` and `HomepageTestimonials`
4. Scope `AuthProvider` to only auth-needed routes in `App.tsx`
5. Move experiment-specific CSS out of `index.css`

