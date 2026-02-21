

# Website Speed Audit & Optimization Plan

## Current Performance (Homepage)

| Metric | Current | Target |
|--------|---------|--------|
| First Contentful Paint | 6.5s | < 1.5s |
| Full Page Load | 4.3s | < 2.5s |
| Image payload | ~6.8MB | < 500KB |
| DOM Content Loaded | 4.2s | < 2s |

---

## Issue #1: Oversized Testimonial Images (CRITICAL)

The five testimonial WebP images on the homepage are 900KB-1.3MB each despite being displayed at only 40-48px (thumbnail size). They should be ~10-20KB each.

| Image | Current Size | Target Size |
|-------|-------------|-------------|
| pinwei.webp | 1,334 KB | ~15 KB |
| sunny.webp | 1,216 KB | ~15 KB |
| cynthia.webp | 1,170 KB | ~15 KB |
| julie.webp | 1,124 KB | ~15 KB |
| monica.webp | 927 KB | ~15 KB |

**Fix:** Re-compress all testimonial images to 96x96px resolution at quality 75-80. This alone should cut ~5.5MB from the page load.

**Files affected:** All images in `src/assets/testimonials/`

---

## Issue #2: Eager Loading of Below-the-Fold Images

The testimonial photos and some logo images load immediately even though they are well below the fold. The `HomepageTestimonials` component imports all photos at the top of the file, so they're bundled into the initial chunk.

**Fix:** 
- Use dynamic `import()` or move testimonial images to `public/` and reference them via URL strings with `loading="lazy"` on the `<img>` tags
- The hero photo (`james-bugden.jpg`) should remain eagerly loaded since it's above the fold

**Files affected:** `src/components/HomepageTestimonials.tsx`, `src/components/HomepageTestimonialsZhTw.tsx`

---

## Issue #3: Logo Images Using PNG/JPG Instead of SVG

Several logo images use unoptimized PNG or JPG formats when SVG versions exist in the same directory:

- `microsoft.png` (SVG version exists)
- `meta.png` (SVG version exists)  
- `mckinsey.png` (SVG version exists)
- `bcg.png` (SVG version exists)
- `tsmc.jpg` (no SVG, but could be optimized)
- `pg.png`, `tesla.png`, `agoda.png`, `appier.png`, `momo.png`

**Fix:** Switch to SVG versions where available. For remaining PNGs, compress to appropriate display size.

**Files affected:** `src/components/LogoScroll.tsx`

---

## Issue #4: Render-Blocking Google Fonts

The Google Fonts stylesheet is render-blocking. While the `display=swap` parameter helps, the CSS file itself still blocks first paint.

**Fix:** The current setup already uses `rel="preload"` which is good. Consider inlining the critical `@font-face` declarations in `index.css` and loading the full stylesheet asynchronously to eliminate the blocking request.

**Files affected:** `index.html`, potentially `src/index.css`

---

## Issue #5: Prefetch Targets Outdated

The HTML prefetches `/offer-compass` which now redirects to `/offer-calculator`. This wastes a network request.

**Fix:** Update prefetch href from `/offer-compass` to `/offer-calculator`.

**Files affected:** `index.html`

---

## Implementation Priority

1. **Re-compress testimonial images** (biggest impact -- saves ~5.5MB)
2. **Lazy-load below-fold images** (prevents blocking initial render)
3. **Switch logos to SVG where available** (smaller file sizes)
4. **Fix prefetch URL** (quick win)
5. **Optimize font loading** (minor improvement)

---

## Technical Details

### Image compression approach
The `src/lib/imageCompression.ts` utility already exists in the project. For the testimonial thumbnails, images should be resized to 2x their display size (96x96px for 48px display) and compressed at WebP quality 75-80. This typically produces files under 20KB.

### Lazy loading approach
Instead of static imports (`import sunnyPhoto from "..."`) which bundle images into the JS chunk, move the image references to be string paths and use standard `<img loading="lazy">`. The images can stay in `src/assets/` but should be referenced dynamically.

### Font loading approach
Extract the two `@font-face` rules for "DM Sans 400" and "Playfair Display 700" (the most critical weights) and inline them directly into `index.css`. Then load the full Google Fonts stylesheet with `media="print" onload="this.media='all'"` pattern for non-blocking behavior.

