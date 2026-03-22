

## MailerLite Subscriber Sync on Signup

### Overview
Add MailerLite email sync as a fire-and-forget side effect after every successful signup. The uploaded API token will be stored as a secret.

### Important Note
Your signup forms don't collect a name field — only email and password. The MailerLite sync will send the email only (name will be empty). If you want names synced, we'd need to add a name input to the signup forms — but per your request, we won't change the UI.

### Steps

1. **Store the MailerLite API key as a secret**
   - Use the `add_secret` tool to store `MAILERLITE_API_KEY` with the token you uploaded

2. **Create Edge Function `sync-mailerlite`** (`supabase/functions/sync-mailerlite/index.ts`)
   - POST handler accepting `{ email, name? }`
   - Calls `https://connect.mailerlite.com/api/subscribers` with Bearer auth
   - Splits name into first/last, assigns group `181733295867823354`
   - CORS headers, OPTIONS preflight handler
   - Returns success/error JSON

3. **Create helper** (`src/lib/mailerlite.ts`)
   - `syncToMailerLite(email, name?)` — invokes the edge function via `supabase.functions.invoke`
   - Catches all errors silently, logs to console

4. **Update 3 signup pages** to call `syncToMailerLite` after successful `signUp()`:
   - `src/pages/Signup.tsx`
   - `src/pages/Join.tsx`
   - `src/pages/JoinZhTw.tsx`
   - Fire-and-forget (no `await`), no UI changes

### Technical Details

**Edge Function structure:**
```
POST /sync-mailerlite
Body: { email: string, name?: string }
→ POST https://connect.mailerlite.com/api/subscribers
  Headers: Authorization: Bearer $MAILERLITE_API_KEY
  Body: { email, fields: { name, last_name }, groups: ["181733295867823354"] }
```

**Integration point in each signup handler:**
```typescript
// After: setSuccess(true)
// Add: syncToMailerLite(email.trim());
```

No database changes needed. No UI changes.

