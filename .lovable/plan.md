

## Revamp Threads Analytics: Remove Sections + Add Content Strategy Insights

### Changes

#### 1. Remove two sections from `ContentAnalysisSections.tsx`
- **Remove**: `LanguageSection` (Section 7 — "Language Comparison EN vs ZH")
- **Remove**: `OriginalVsQuoteSection` (Section 9 — "Original vs Quote Posts")
- Update the main export to stop rendering them

#### 2. Add "Content Strategy Insights" section to `ContentAnalysisSections.tsx`
A new card that analyzes all posts and generates actionable recommendations. It will compute:

- **Best performing media type** (highest avg engagement) → "Focus on [type] posts"
- **Optimal post length** bucket → "Keep posts [range] characters"
- **Best posting day** (from posted_at) → "Post more on [day]"
- **Best posting hour** (Taiwan time UTC+8) → "Post around [hour]"
- **Top image tag** (if data exists) → "Use [tag] style images"
- **Hashtag recommendation** (best performing hashtag with 2+ uses)
- **Engagement sweet spot** — show the characteristics shared by top 10% of posts (media type, length range, day, hour)

Display as a card with a lightbulb icon header "What to Post Next", showing 5-7 bullet-point recommendations derived purely from the data, each with a supporting stat.

#### 3. Enhance Top Performing Posts (Section 13 in `PostDetailSections.tsx`)
- Increase default display from 20 to 50 posts
- Add a summary stats bar at the top showing: total posts analyzed, median engagement rate, top post engagement vs median ratio

### Files
1. **Edit**: `src/components/analytics/ContentAnalysisSections.tsx` — remove LanguageSection and OriginalVsQuoteSection, add ContentStrategySection
2. **Edit**: `src/components/analytics/PostDetailSections.tsx` — enhance top posts section with summary stats, increase to 50

