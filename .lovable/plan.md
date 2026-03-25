

## Remove Dead AI Assist Actions from `resume-ai`

### What changes
Strip the unused `improve`, `grammar`, `starter`, `tailor`, `summary`, `skills`, and `optimize` switch cases from the edge function. Keep only `parse_resume`. Also remove the now-unnecessary `ai_tool` rate limiting and usage logging (since `parse_resume` is already tracked as `import` by `parse-resume-to-builder`).

### File: `supabase/functions/resume-ai/index.ts`

1. Remove the `AI_TOOL_MONTHLY_LIMIT` constant and the rate-limit check block (lines 100, 127-146)
2. Remove the auth extraction block (lines 110-125) — no longer needed since this function only handles `parse_resume` and doesn't do its own usage logging
3. Remove all switch cases except `parse_resume` (lines 175-209)
4. Remove the `ai_tool` usage logging block (lines 258-263)
5. Remove the generic text response at the bottom (lines 300-303) since only the tool-call response path for `parse_resume` is used
6. Simplify the `default` case to just throw an error for any non-`parse_resume` action
7. Redeploy the function

### Result
The function becomes a focused resume parser with no dead code. Usage tracking for parse operations continues to happen in `parse-resume-to-builder` as before.

