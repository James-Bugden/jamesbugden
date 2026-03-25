

## Backfill Historical Analyze Usage

### Problem
44 resume analyses exist in `resume_analyses` but were never logged to `ai_usage_log` because tracking was added after the fact. The AI Usage tab underreports costs.

### Plan

**Database migration** — Insert historical `analyze` entries into `ai_usage_log` from `resume_analyses`:

```sql
INSERT INTO ai_usage_log (user_id, usage_type, created_at)
SELECT user_id, 'analyze', created_at
FROM resume_analyses
WHERE NOT EXISTS (
  SELECT 1 FROM ai_usage_log
  WHERE ai_usage_log.user_id = resume_analyses.user_id
    AND ai_usage_log.usage_type = 'analyze'
    AND ai_usage_log.created_at = resume_analyses.created_at
);
```

This is a one-time data fix. No code changes needed — both edge functions now have tracking going forward.

### Impact
- Admin dashboard AI Usage tab will show ~44 `analyze` entries
- Estimated cost display increases by ~44 × $0.003 = ~$0.13
- No effect on user-facing rate limits (those query current month only)

