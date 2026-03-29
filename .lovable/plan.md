

## Add AI Content Tagging for Deeper Post Insights

### Problem
Posts currently only have basic metadata (media_type, text_length, hashtag, detected_language, image_tags). There's no content-level categorization to understand **what topics, formats, and tones** perform best — which is what you need to decide what to post next.

### Solution
Use AI (Anthropic Claude, already configured) to classify every post's **text content** into multiple tag dimensions. Then surface these tags in the analytics dashboard with performance breakdowns.

### New Tag Dimensions

Each post gets classified across these categories:

| Dimension | Example Values |
|-----------|---------------|
| **topic** | resume-tips, interview-prep, salary-negotiation, career-pivot, linkedin, job-search, mindset, office-politics, personal-branding, recruiter-insights, work-life, motivation, industry-trends |
| **format** | listicle, story, hot-take, question, tip, myth-bust, before-after, case-study, announcement, thread, quote-commentary, poll |
| **tone** | motivational, educational, provocative, humorous, vulnerable, authoritative, conversational |
| **cta_type** | follow, save, share, comment, link-click, dm, none |
| **audience_target** | job-seekers, career-changers, professionals, new-grads, managers |

### Implementation

#### 1. Database migration — add 5 new columns to `threads_posts`
```sql
ALTER TABLE threads_posts ADD COLUMN content_topic text;
ALTER TABLE threads_posts ADD COLUMN content_format text;
ALTER TABLE threads_posts ADD COLUMN content_tone text;
ALTER TABLE threads_posts ADD COLUMN content_cta text;
ALTER TABLE threads_posts ADD COLUMN content_audience text;
ALTER TABLE threads_posts ADD COLUMN content_tagged_at timestamptz;
```

#### 2. Edge function — new `tag-content` action in `threads-sync`
- Queries posts where `content_tagged_at IS NULL` and `text_content IS NOT NULL`, limit 15 per call
- Sends text to Claude with a prompt listing the exact tag options per dimension
- Parses JSON response and updates the post row
- Returns `{ tagged: N, remaining: M }`

#### 3. Analytics UI — new "Content Breakdown" cards in `ContentAnalysisSections.tsx`
For each tag dimension, show a bar chart of avg engagement rate by tag value, sorted by performance. This directly answers "what kind of content should I make more of?"

Cards:
- **Topic Performance** — bar chart: topic vs avg engagement, colored by above/below average
- **Format Performance** — bar chart: format vs avg engagement
- **Tone Performance** — horizontal bars showing which tones get best engagement
- **CTA Effectiveness** — which call-to-action types drive highest engagement
- **Audience Fit** — which audience segments your best content targets

Also update the **"What to Post Next"** strategy section to include recommendations from these new dimensions (e.g., "Your best topic is salary-negotiation with 4.2% avg engagement").

#### 4. Dashboard UI — add "Tag Content" button
Add a button next to "Analyze Images" in `ThreadsAnalytics.tsx` that calls `threads-sync` with `action: "tag-content"`. Shows remaining untagged count.

### Files Changed
1. **Migration** — add 6 columns to `threads_posts`
2. **`supabase/functions/threads-sync/index.ts`** — add `actionTagContent()` function and case in switch
3. **`src/components/analytics/analyticsShared.ts`** — add new fields to `ThreadsPost` type and `POST_FIELDS`
4. **`src/components/analytics/ContentAnalysisSections.tsx`** — add 5 tag breakdown charts, update strategy recommendations
5. **`src/pages/ThreadsAnalytics.tsx`** — add "Tag Content" button

