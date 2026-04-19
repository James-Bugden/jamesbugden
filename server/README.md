# jamesbugden-preview server

Fly.io service that rasterizes PDF blobs (generated client-side by
`@react-pdf/renderer`) into PNG data URLs for the resume-builder preview pane.

Exists because the Lovable-owned Supabase project blocks CLI deploys to the
equivalent Edge Function. This is the drop-in replacement; the client code at
`src/lib/resumePdf/serverPreview.ts` is wired to hit this endpoint when
`VITE_PREVIEW_ENDPOINT_URL` is set.

## First-time deploy

```bash
cd server
flyctl auth login                       # browser OAuth, one-time
flyctl launch --no-deploy               # creates the app; pick the "jamesbugden-preview" name
flyctl secrets set \
  SUPABASE_URL=https://rpeaehxawjvbhdneglce.supabase.co \
  SUPABASE_ANON_KEY=<anon-key-from-lovable>
flyctl deploy
```

Then in Lovable env vars, add:

```
VITE_PREVIEW_ENDPOINT_URL=https://jamesbugden-preview.fly.dev/render
VITE_PREVIEW_ENDPOINT_ENABLED=1
```

Publish the site — CJK previews go through Fly.io.

## Local dev

```bash
cd server
npm install
SUPABASE_URL=... SUPABASE_ANON_KEY=... npm run dev
```

Then hit `http://localhost:8080/health` to verify.

## How it's used

Client flow in `src/components/resume-builder/ResumePdfPreview.tsx`:

1. Client generates PDF via react-pdf (identical output to downloaded file)
2. Client POSTs `{ pdfBase64, pageFormat }` + `Authorization: Bearer <JWT>`
3. Server validates JWT against Supabase, rasterizes with pdfjs + @napi-rs/canvas
4. Server returns `{ pngs: string[], pageCount: number }`
5. Client renders `<img src={png}>` for each page

## Rollback

Flip `VITE_PREVIEW_ENDPOINT_ENABLED=0` in Lovable env vars. Client falls back to
local pdfjs rasterization (or iframe fallback if that crashes).
