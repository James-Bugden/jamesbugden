

# Add Comprehensive Feature Usage Dashboard

## Problem
The current "Feature Adoption" section only shows AI usage log entries (import, ai_tool). It doesn't show broader feature usage across the site — who's using the Resume Builder, Analyzer, Question Bank, Guides, Salary Checker, etc.

## Data sources available
We can derive feature usage from existing tables without any schema changes:

| Feature | Source | How to count |
|---------|--------|-------------|
| Resume Builder | `user_documents` (type="resume") | Unique user_ids with resume docs |
| Cover Letter Builder | `user_documents` (type="cover_letter") | Unique user_ids with cover letter docs |
| Resume Analyzer | `resume_analyses` | Unique user_ids |
| Resume Import (AI) | `ai_usage_log` (usage_type="import") | Already tracked |
| AI Tools | `ai_usage_log` (usage_type="ai_tool") | Already tracked |
| Question Bank | `event_tracks` (event_type="qbank_view") | Unique pages/sessions |
| Guides | `event_tracks` (event_type="guide_view") | Unique event_names |
| Salary Checker | `salary_checks` | Total checks |

## What changes

### `src/pages/AdminDashboard.tsx`
- Pass `resumeAnalyses`, `documents`, and `salaryChecks` to InsightsTab (some may already be passed)

### `src/components/admin/InsightsTab.tsx`
- Replace the current small "Feature Adoption (Unique Users)" card grid with a richer **Feature Usage Overview** section
- New section shows a horizontal bar chart of unique users per feature, plus total usage counts
- Features listed: Resume Builder, Cover Letter, Resume Analyzer, AI Import, AI Tools, Question Bank, Guides, Salary Checker
- Each bar shows unique users (from user_id where available) and total actions
- Color-coded by feature category (documents = green, AI = blue, content = purple, tools = amber)

### Visual layout
- Horizontal bar chart (largest to smallest) showing unique users per feature
- Small stat cards below showing total actions per feature
- Replaces the existing minimal "Feature Adoption" grid

## No database changes needed
Everything derives from existing tables already passed as props or fetchable from existing data.

