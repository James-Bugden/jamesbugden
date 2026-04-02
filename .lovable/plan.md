# Create Unlimited Test Account

## Overview

Create a new test account with email/password, then bypass all usage limits for admin users across both client-side hooks and server-side edge functions.

## Steps

### Step 1: Create the test account

- Sign up a new account via the app's `/join` page with a test email you provide (e.g. `test@jamesbugden.com`)
- After email verification, add the account to the `admin_users` table so it gets the admin flag

### Step 2: Add admin bypass to edge functions

Modify the rate-limit checks in 3 edge functions to skip limits for admin users:

`**supabase/functions/analyze-resume/index.ts**` — After getting `userId`, check `is_admin(userId)` via RPC. If admin, skip the monthly limit check.

`**supabase/functions/parse-resume-to-builder/index.ts**` — Same admin bypass before the import limit check.

`**supabase/functions/generate-pdf/index.ts**` — Same admin bypass before the PDF export limit check.

The pattern added to each function (after userId is resolved):

```typescript
// Check if user is admin (unlimited usage)
const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });
if (isAdmin) { /* skip rate limit check */ }
```

### Step 3: Add admin bypass to client-side hooks

`**src/hooks/useAnalyzerUsage.ts**` — Check `is_admin` RPC, if true set `limitReached` to always false.

`**src/hooks/useBuilderAiUsage.ts**` — Same admin check, bypass import and AI tool limits.

`**src/lib/documentStore.ts**` — In `checkServerDocumentLimit`, check admin status and return true (no limit) for admins.

### Step 4: Insert admin record

After you create and verify the test account, I'll insert a row into `admin_users` with the test user's ID and email.

## Files Changed

- `supabase/functions/analyze-resume/index.ts`
- `supabase/functions/parse-resume-to-builder/index.ts`
- `supabase/functions/generate-pdf/index.ts`
- `src/hooks/useAnalyzerUsage.ts`
- `src/hooks/useBuilderAiUsage.ts`
- `src/lib/documentStore.ts`

## What You Need To Do

Tell me what email and password you'd like for the test account, and I'll set everything up.  
  
make sure the limits are not being blocked from teh server also   
  
[test@test.com](mailto:test@test.com)  
test12345