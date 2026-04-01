

# Fix: "Something went wrong with the analysis" Error

## Investigation Results

I tested the `analyze-resume` edge function directly and it returned a **valid 200 response** with full analysis data. The backend is working correctly.

The error "Something went wrong with the analysis. Please try again." comes from the `startAnalysis` catch block (line 192-199 in `ResumeAnalyzer.tsx`). Since the edge function works, the likely causes are:

1. **PDF text extraction fails silently** — the `extractTextFromPDF` call inside `handleSubmitResume` throws, but it's caught by the *outer* catch block (line 304) which shows "Could not read file." However, if extraction succeeds but returns garbled/problematic text, the edge function invocation could fail with a parsing error on the client side.

2. **`supabase.functions.invoke` response handling** — the Supabase JS client may be wrapping the response in a way that triggers `fnError` (e.g., if the large JSON response is truncated or malformed during transit).

3. **Auth token expiry** — if the token expires during the analysis (which takes 10-30 seconds), the function returns 401 and the client throws.

## Solution

Improve error visibility and resilience in `startAnalysis`:

### Changes to `src/pages/ResumeAnalyzer.tsx`

1. **Log the actual error details** — In the `startAnalysis` catch block, include the error message in the user-facing toast so we can see what's actually failing (temporarily, for debugging). Also distinguish between rate limit errors (429), auth errors (401), and generic failures.

2. **Handle `fnError` more gracefully** — The `supabase.functions.invoke` returns `{ data, error }` where `error` can be a `FunctionsHttpError` with a response body. Extract the actual message from the response body instead of just using `fnError.message`.

3. **Add `.txt` file support** — The `.txt` import was added to the Resume Builder but never to the Resume Analyzer. Add it to `handleFileSelect` and `handleSubmitResume`.

### Code Changes

In `startAnalysis` (around line 175-200):
- When `fnError` is set, try to read `fnError.context?.body` or parse the response for a meaningful error message
- Show specific messages for rate limit (429) vs auth (401) vs generic errors
- Include the actual error text in the console log

In `handleFileSelect` (line 140):
- Add `"txt"` to the accepted extensions array

In `handleSubmitResume` (around line 212-228):
- Add an `else if (ext === "txt")` branch that reads the file as text using `file.text()`

