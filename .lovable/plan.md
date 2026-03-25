

## Remove Dead PageSEO Component

The migration from `PageSEO` to the zero-config `<SEO />` component is already complete. No pages import `PageSEO` anymore — it only exists as dead code.

### Single step

**Delete `src/components/PageSEO.tsx`** — the file is unused. No other files reference it.

