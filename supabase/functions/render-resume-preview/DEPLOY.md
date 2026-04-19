# Deploying `render-resume-preview`

One-time setup to ship the FlowCV-style server-side preview.

## 1. One-time auth

```bash
# Supabase CLI was installed at C:\Users\jbbug\.supabase-cli\supabase.exe
# For convenience, create an alias or put it on PATH. The steps below use
# the full path — adjust if you've added it to PATH.

# Log into Supabase (browser opens once, token saved locally)
"/c/Users/jbbug/.supabase-cli/supabase.exe" login
```

## 2. Link the local repo to your Supabase project

```bash
cd "C:/Users/jbbug/OneDrive/Documents/GitHub/jamesbugden"
"/c/Users/jbbug/.supabase-cli/supabase.exe" link --project-ref rpeaehxawjvbhdneglce
```

(Project ref comes from `supabase/config.toml`.)

## 3. Deploy the function

```bash
"/c/Users/jbbug/.supabase-cli/supabase.exe" functions deploy render-resume-preview
```

First deploy takes ~30–60s. Subsequent deploys are faster.

## 4. Test the function

### 4a. End-to-end from the browser

Open `https://jamesbugden.com/zh-tw/resume?serverPreview=1` while logged in.
The preview should render via the server; first render takes 3–6 s
(cold start), subsequent renders 500 ms–2 s.

### 4b. cURL smoke test

```bash
# Get a session JWT from your browser DevTools → Application → Local
# Storage → "sb-<project-ref>-auth-token" → access_token field.

curl -X POST "https://rpeaehxawjvbhdneglce.supabase.co/functions/v1/render-resume-preview" \
  -H "Authorization: Bearer <YOUR_JWT>" \
  -H "Content-Type: application/json" \
  -d '{"pdfBase64":"<1-page-pdf-as-base64>"}'
```

Expected: JSON response with `pngs: [...]` array.

## 5. Flip it on for all users

Once the function is verified working with `?serverPreview=1`, make it the
default by setting the env flag in Lovable:

1. Lovable project → Settings → Environment Variables
2. Add `VITE_PREVIEW_ENDPOINT_ENABLED=1`
3. Click Publish → Update

After the deploy, every preview uses the server path. Fall back to
client path is automatic if the server returns an error.

## Rate limit

The function is capped at **200 previews / user / month** (admin bypass).
Adjust `PREVIEW_MONTHLY_LIMIT` in `index.ts` if the editor's debounce is
tight and 200 isn't enough.

## Browserless status

This function does NOT use Browserless. If you're paying for a
Browserless subscription and nothing else in the codebase uses it
(check `src/lib/serverPdfExport.ts` — it's client-side react-pdf), you
can cancel the subscription and save that monthly cost.

## Rollback

If the Edge Function is slower / buggier than the client path, flip the
flag off:

1. In Lovable env vars, set `VITE_PREVIEW_ENDPOINT_ENABLED=0` (or delete it)
2. Publish → Update

Users fall back to the client-side worker path immediately. No Edge
Function un-deploy needed.
