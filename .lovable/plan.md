## Resume Analyzer Results Page Improvements

### 1. Resume Visual with Section Highlights

Since the AI analysis doesn't return pixel-level coordinates, we'll take a practical approach:

- **Render the uploaded PDF's first page as an image** using the existing `pdfjs-dist` library (canvas render, then convert to data URL)
- **Display it alongside a "Section Health Map"** — a side-by-side layout where the left shows the actual resume image and the right shows colored indicators mapping to each scored section
- Each section indicator uses the same color coding as the SectionCards (green/gold/yellow/red) with a connecting line or numbered badge pointing to the approximate area on the resume
- This appears **above** the Section-by-Section Breakdown as a visual summary
- For paste-text users (no PDF), show just the Section Health Map without the resume image

**Technical approach:**

- Pass the uploaded `File` object (or rendered image data URL) from `ResumeAnalyzer.tsx` down to `ResumeResults.tsx` via a new `resumeImageUrl` prop
- Add a `renderPdfToImage` utility that uses pdfjs-dist to render page 1 to a canvas and return a data URL
- Create a `ResumeVisualSummary` component inside `ResumeResults.tsx` that displays the resume thumbnail with section score badges overlaid at approximate positions (header area at top, experience in the middle, education near bottom, etc.)

### 2. Replace Share Section with Email + LINE Buttons

Replace the current custom share button (using `navigator.share`) with the same Email + LINE pattern used in `GuideShareButtons.tsx`:

- Reuse the `GuideShareButtons` component directly, or replicate its Email (mailto) + LINE (`line.me/R/share`) button pattern
- Keep the dark green card styling but swap the single "Share with a friend" button for two buttons: Email and LINE
- Pass `isZhTw={lang === "zh-TW"}` for localized text

### 3. General UX/UI Improvements

**Score Hero section:**

- Add a subtle entrance animation (fade-in + scale) on the score ring using framer-motion
- Show the score counting up from 0 to the actual number (animated counter)

**Section Breakdown:**

- Add a summary stat bar above the cards: "X of Y sections need improvement" with a mini progress indicator
- Color the section headers more prominently so users can quickly spot red flags

**Bullet Rewrite section:**

- Add a visual arrow or transformation indicator between "Before" and "After" to make the improvement feel more dramatic

**Action bar:**

- Make "Scan Another Resume" more prominent with an outlined button style instead of plain text link

**Mobile polish:**

- Ensure the resume visual summary stacks vertically on mobile (image on top, health map below)

### 4. Files to Modify

1. `**src/pages/ResumeAnalyzer.tsx**` — Render PDF page 1 as image data URL after extraction, pass it to ResumeResults, store in sessionStorage for auth round-trip
2. `**src/components/resume-analyzer/ResumeResults.tsx**` — Add ResumeVisualSummary component before Section Breakdown, replace Share section with Email/LINE buttons, add animated score counter, add section summary stats, improve action bar styling
3. `**src/components/resume-analyzer/types.ts**` — No changes needed (existing types suffice)

### Summary of Visual Layout (Results Page, Top to Bottom)

```text
+----------------------------------+
|  Action Bar (Reset | Download)   |
+----------------------------------+
|  Score Ring + Grade + Verdict     |
|  (animated counter)              |
+----------------------------------+
|  [LOCKED OVERLAY IF NOT SIGNED IN]
|                                  |
|  Resume Visual Summary           |
|  +------------+  +-----------+   |
|  | PDF Page 1 |  | Section   |   |
|  | (thumbnail)|  | Health    |   |
|  |            |  | Map with  |   |
|  |            |  | scores    |   |
|  +------------+  +-----------+   |
|                                  |
|  Section-by-Section Breakdown    |
|  Bullet Rewrite (Before/After)   |
|  Top 3 Priorities                |
|  Coaching CTA                    |
+----------------------------------+
|  Free Templates                  |
|  Next Steps                      |
|  Share (Email + LINE buttons)    |
+----------------------------------+
```