# Change Import and Analyze Limits to 10/month

## Changes needed

Four files need limit constant updates:

### 1. `src/hooks/useAnalyzerUsage.ts` (line 5)

- Change `MONTHLY_LIMIT = 3` → `MONTHLY_LIMIT = 10`

### 2. `supabase/functions/analyze-resume/index.ts` (line 154)

- Change `MONTHLY_LIMIT = 3` → `MONTHLY_LIMIT = 10`

### 3. `src/hooks/useBuilderAiUsage.ts` (line 5)

- Change `IMPORT_LIMIT = 2` → `IMPORT_LIMIT = 10`

### 4. `supabase/functions/parse-resume-to-builder/index.ts` (line 10)

- Change `IMPORT_MONTHLY_LIMIT = 2` → `IMPORT_MONTHLY_LIMIT = 10`

### Deployment

- Redeploy `analyze-resume` and `parse-resume-to-builder` edge functions after updating.

No database changes needed. All limits are defined as constants in code.

&nbsp;

change on the UI where needed also so the users know also 