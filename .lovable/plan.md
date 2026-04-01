

# PDF Import Debugging — Investigation Summary

## What I Found

After reviewing the full import pipeline, **the code is structurally intact**. No recent changes appear to have broken the PDF upload flow itself. Here's the chain:

1. **File selection** → `ImportModal.tsx` accepts `.pdf` files via drag-drop or file picker
2. **Text extraction** → `extractTextFromPdf()` uses `pdfjs-dist` (v4.10.38, installed)
3. **Parsing** → `parseResumeWithFallback()` tries AI first (`resume-ai` edge function), falls back to heuristic
4. **Saving** → `createDocument()` saves to localStorage, then fire-and-forget syncs to server

## Likely Cause: Missing `user_documents` Table

The network logs show a **404 error** on `user_documents` table — it doesn't exist in the database. While this shouldn't block the import (errors are caught silently), it could cause issues if:
- The `DocumentDashboard` fails to load/render properly after import
- The document list fetch errors out and interferes with state

## Possible Secondary Issue: AI Parse Edge Function

The `resume-ai` edge function is called during import. If it's failing silently, the fallback heuristic parser runs instead — but if _both_ fail, the import would error out. Need to verify this function is deployed and working.

## Recommended Plan

### Step 1: Create the `user_documents` table
Run a migration to create the missing `user_documents` table with proper columns (`id`, `user_id`, `type`, `name`, `data`, `settings`, `linked_job_id`, `created_at`, `updated_at`) and RLS policies. This fixes the 404 errors.

### Step 2: Verify `resume-ai` edge function
Check the edge function logs to confirm it's deployed and responding correctly when a PDF is imported.

### Step 3: Test end-to-end
Upload a PDF through the import modal and verify the full flow works.

## Technical Details

- **Files involved**: `src/lib/documentStore.ts`, `src/components/document-dashboard/ImportModal.tsx`, `src/lib/documentImport.ts`, `supabase/functions/resume-ai/index.ts`
- **Migration needed**: `CREATE TABLE public.user_documents (...)` with RLS policies for authenticated users
- **No code changes** needed to the import flow itself — the logic is correct

