

## Add AI Usage Tracking to `resume-ai` Edge Function

### Problem
The `resume-ai` function (used for improve, grammar, starter, tailor, summary, skills, optimize, and parse_resume actions) has **no auth check and no usage logging**. Every call is an AI cost that goes untracked.

Note: `parse-resume-to-builder` **already tracks usage** as `import` — no changes needed there.

### Plan

**File: `supabase/functions/resume-ai/index.ts`**

1. Add Supabase client import and initialization with the caller's auth header
2. Extract user ID from JWT claims (same pattern as other edge functions)
3. After a successful AI response, insert a row into `ai_usage_log` with `usage_type: 'ai_tool'`
4. Make tracking best-effort — don't fail the request if the insert fails (user may be unauthenticated for some actions)
5. Redeploy the function

### Technical Detail

The function currently has no auth at all — it reads `{ action, text, context }` directly. Since resume builder AI tools require sign-in on the frontend, the auth header should already be present. The tracking will:
- Attempt to extract user ID from the Authorization header
- If authenticated, log usage after successful AI response
- If not authenticated, skip logging silently (no breaking change)

### Cost mapping
In the admin dashboard, `ai_tool` is already mapped at `$0.0006/call` — these will now appear in the AI Usage tab.

