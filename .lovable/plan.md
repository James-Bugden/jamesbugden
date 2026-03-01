

## Dashboard UI/UX Improvements

A comprehensive upgrade to the dashboard experience across navigation, visual design, personalization, and discoverability.

### 1. Navigation and Layout

**Sticky nav upgrade**
- Add a "Dashboard" breadcrumb-style label next to "JAMES BUGDEN" so users know where they are
- Add a mobile-friendly hamburger or bottom tab bar for quick section jumping (Tools / Guides / Toolkit)
- Smooth-scroll anchor links from the nav to each dashboard section

**Section anchors**
- Each major section (Tools, Guides, Toolkit) gets an `id` attribute
- Clicking nav links scrolls smoothly to that section with `scroll-margin-top` to account for sticky nav

### 2. Cards and Visual Hierarchy

**Tool cards: icon upgrade**
- Replace emoji (📄, 💰, etc.) with custom-styled Lucide icons inside colored circular badges for a more polished look
- Add a subtle arrow animation on hover (arrow slides right)

**Guide cards: visual tags**
- Add a small colored dot or pill showing the category (Getting Started = green, Applying = blue, Negotiating = gold) directly on each card
- This reinforces the filter without users needing to look at the pills

**Toolkit cards: numbering**
- Add a step number (01-08) in faded gold to each toolkit card to reinforce the sequential workflow

**General card improvements**
- Add `border-radius: 16px` (slightly rounder) for a softer, modern feel
- Increase card padding on mobile for better touch targets

### 3. Personalization and Engagement

**"Recently Used" section**
- Track the last 3 tools/guides the user clicked (stored in localStorage)
- Show a "Pick Up Where You Left Off" row at the top of the dashboard with those 3 items as compact cards
- If no history exists, show a "Recommended for You" row with Resume Analyzer, Pivot Method Guide, and Salary Starter Kit

**Progress indicators on tools**
- For Resume Analyzer: show "Last score: 72/100" if they've used it before (from localStorage)
- For Job Tracker: show "X active applications" count
- These appear as small badges/subtexts on the tool cards

### 4. Search and Discoverability

**Search bar**
- Add a search input at the top of the main content area (below the welcome banner)
- Filters across all tools, guides, and toolkit items by title and description
- Shows instant results as user types, grouped by category
- Empty state: "No results found" with a suggestion to browse all content

**Quick-access keyboard shortcut**
- Press `/` to focus the search bar (subtle hint shown as a `/ ` badge on the search input)

### Technical Details

**File modified:** `src/pages/Dashboard.tsx`

**New hook:** `src/hooks/useRecentlyUsed.ts`
- Reads/writes a `dashboard_recent` key in localStorage
- Exports `{ recentItems, trackItem }` where `trackItem(id)` pushes to the recency list (max 3)
- Each item stores `{ id, type, timestamp }`

**Search implementation:**
- Local client-side filter using `useState` for the query
- Searches across the existing `tools`, `guides`, and `toolkitItems` arrays by matching against `title[lang]` and `description[lang]`
- Debounced with a 150ms delay for smooth typing
- Results grouped under "Tools", "Guides", "Toolkit" headings

**Section navigation:**
- Add `id="tools"`, `id="guides"`, `id="toolkit"` to each section
- Nav gets 3 pill-shaped links that call `document.getElementById(id).scrollIntoView({ behavior: 'smooth' })`
- Active section highlighted based on scroll position using `IntersectionObserver`

**Recently Used tracking:**
- Wrap each tool/guide `Link` with an `onClick` that calls `trackItem()`
- The "Pick Up Where You Left Off" row maps stored IDs back to the tools/guides/toolkit arrays to render compact cards

**Progress badges:**
- Resume Analyzer: reads `resume_analysis_result` from localStorage for last score
- Job Tracker: calls `getActiveJobs().length` from the existing `jobStore`

**Both English and Chinese versions** are updated since Dashboard.tsx handles both via the `lang` prop. All new UI strings added to the `i18n` object.

