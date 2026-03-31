

# Google OAuth — Final Checklist (No Code Changes Needed)

The code is correct. The "redirect_uri is not allowed" error comes from the **Google Cloud Console** configuration, not from Lovable Cloud settings.

## What You Need in Google Cloud Console

Go to [Google Cloud Console → Credentials](https://console.cloud.google.com/apis/credentials) → click your OAuth 2.0 Client ID → edit it.

### 1. Authorized JavaScript Origins
Add these exact entries:
- `https://jamesbugden.com`
- `https://www.jamesbugden.com`

### 2. Authorized Redirect URIs
This is the critical one. You need to add the **Lovable Cloud OAuth callback URL**, which is visible in your Cloud Dashboard under **Users → Auth Settings → Sign In Methods → Google** (expand the Google section).

It will look something like:
- `https://reahmeddjkivwzjsoqkn.supabase.co/auth/v1/callback`

Add that exact URL to the "Authorized redirect URIs" in Google Cloud Console.

**Also add** (for safety):
- `https://jamesbugden.com`
- `https://jamesbugden.com/**` won't work in Google Console — Google requires exact URIs

### 3. Verify in Lovable Cloud
Open Cloud → Users → Auth Settings → Google and confirm the **callback URL** shown there matches what you added in Google Console.

## Summary
No code changes. The fix is adding the correct callback URI from Lovable Cloud's Google auth settings into Google Cloud Console's "Authorized redirect URIs" field.

