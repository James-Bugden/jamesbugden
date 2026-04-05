

# Plan: Analytics Data Export API

## Overview
Create a single edge function that returns all your admin dashboard analytics data as JSON. Your AI agent can call it with a simple HTTPS GET request using an API key for authentication.

## What data the API will expose
Based on your existing tables, the endpoint will return:
- **Resume leads** — submissions, scores, segmentation data
- **Email gate leads** — email captures by source
- **Salary checks** — salary lookup logs
- **Event tracks** — CTA clicks, template copies, calculator usage
- **Share clicks** — share button usage by channel
- **Feedback** — user feedback and NPS responses
- **Threads analytics** — posts, engagement metrics, follower trends, demographics (if you want this included)

## How it works

### 1. Create edge function `supabase/functions/analytics-export/index.ts`
- Accepts GET requests with query params for filtering (e.g., `?range=30d`, `?tables=resume_leads,event_tracks`)
- Authenticates via a custom API key in the `X-API-Key` header (a secret you set, separate from user auth)
- Uses the Supabase service role to query all tables (bypasses RLS)
- Returns a single JSON object with all requested data

### 2. Add a secret for the API key
- Create a new secret `ANALYTICS_API_KEY` — a random string you share with your AI agent
- The edge function checks `X-API-Key` header against this secret

### 3. Example usage from your AI agent
```
GET https://<project>.supabase.co/functions/v1/analytics-export?range=30d
Headers:
  X-API-Key: <your-analytics-api-key>
```

Response:
```json
{
  "range": "30d",
  "resume_leads": { "total": 142, "rows": [...] },
  "event_tracks": { "total": 580, "rows": [...] },
  "share_clicks": { "total": 89, "rows": [...] },
  ...
}
```

## Security
- No user auth required — uses a dedicated API key checked in code
- Service role used server-side only (never exposed to client)
- Optional: IP allowlist or rate limiting can be added later

## Files changed
- **New**: `supabase/functions/analytics-export/index.ts`
- **Secret**: `ANALYTICS_API_KEY` (you provide or we generate one)

