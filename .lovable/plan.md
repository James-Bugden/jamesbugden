

## Fix: Override Heading Font on Analytics Page

### Problem
`src/index.css` line 137-139 sets ALL `h1-h6` elements to use `Playfair Display` (serif). This is correct for the main branded site but makes the analytics dashboard look inconsistent — headings render in serif while body text uses Inter.

### Solution
Add a scoped CSS override so that within the analytics page, all headings use Inter (the sans-serif stack) instead of Playfair Display.

### Changes

**`src/pages/ThreadsAnalytics.tsx`**
- Add a wrapper `div` with a class like `analytics-dashboard` around the entire page content (if not already present)

**`src/index.css`**
- Add a scoped rule at the end:
```css
.analytics-dashboard h1,
.analytics-dashboard h2,
.analytics-dashboard h3,
.analytics-dashboard h4,
.analytics-dashboard h5,
.analytics-dashboard h6 {
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
  letter-spacing: -0.01em;
}
```

This keeps the branded Playfair Display on all other pages while giving the analytics product a clean, modern SaaS feel with Inter throughout.

