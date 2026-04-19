/**
 * Fly.io preview rasterization service.
 *
 * Accepts a PDF (generated client-side by react-pdf) and returns PNG data
 * URLs of each page. Mirrors the architecture from
 * `supabase/functions/render-resume-preview/index.ts` but runs on a proper
 * Node server so we're not blocked by Lovable-owned Supabase project perms.
 *
 * Request: POST /render
 *   Authorization: Bearer <supabase JWT>
 *   Body: { pdfBase64: string, pageFormat?: "a4" | "letter" }
 *
 * Response: { pngs: string[], pageCount: number }
 */

import express, { type Request, type Response } from "express";
import cors from "cors";
import { createClient } from "@supabase/supabase-js";

// pdfjs-dist requires a DOM-like environment for its node build. The
// `legacy/build/pdf.mjs` entrypoint is explicitly node-safe and doesn't
// touch `window` or `document` at module load.
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf.mjs";
import { createCanvas } from "@napi-rs/canvas";

// ── Config ─────────────────────────────────────────────────────────
const PORT = Number(process.env.PORT ?? 8080);
const RASTER_DPI = Number(process.env.RASTER_DPI ?? 150);
const MAX_PAGES = Number(process.env.MAX_PAGES ?? 5);
const MAX_PDF_BYTES = Number(process.env.MAX_PDF_BYTES ?? 6 * 1024 * 1024);

// Supabase creds — used only to verify the user's JWT. Set via `fly secrets`.
const SUPABASE_URL = process.env.SUPABASE_URL ?? "";
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY ?? "";

if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
  console.warn(
    "[preview-server] SUPABASE_URL / SUPABASE_ANON_KEY not set — auth checks will fail",
  );
}

// Allow comma-separated origin list. Defaults to jamesbugden.com + the Lovable
// preview domain used during staging deploys.
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS ??
  "https://jamesbugden.com,https://www.jamesbugden.com")
  .split(",")
  .map((o) => o.trim())
  .filter(Boolean);

// ── App setup ──────────────────────────────────────────────────────
const app = express();

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow same-origin requests (no Origin header) and tools like curl
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.includes(origin)) return cb(null, true);
      // Also allow *.lovable.app subdomains for staging
      if (/^https:\/\/[a-z0-9-]+\.lovable\.app$/.test(origin)) return cb(null, true);
      cb(new Error(`Origin ${origin} not allowed`));
    },
    methods: ["POST", "OPTIONS"],
    allowedHeaders: ["Authorization", "Content-Type"],
  }),
);

// PDF blobs up to ~6MB encoded as base64 in JSON body
app.use(express.json({ limit: "10mb" }));

// ── Health ─────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.json({ ok: true, service: "resume-preview", version: "1.0.0" });
});

// ── Main render endpoint ───────────────────────────────────────────
app.post("/render", async (req: Request, res: Response) => {
  const start = Date.now();

  // 1. Auth check — require a valid Supabase JWT
  const authHeader = req.get("authorization") ?? "";
  const token = authHeader.startsWith("Bearer ") ? authHeader.slice(7) : "";
  if (!token) {
    return res.status(401).json({ error: "Missing Bearer token" });
  }

  if (SUPABASE_URL && SUPABASE_ANON_KEY) {
    const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
      global: { headers: { Authorization: `Bearer ${token}` } },
      auth: { persistSession: false, autoRefreshToken: false },
    });
    const { data: userResp, error: userErr } = await supabase.auth.getUser();
    if (userErr || !userResp?.user) {
      return res.status(401).json({ error: "Invalid session" });
    }
  }

  // 2. Parse + validate body
  const { pdfBase64, pageFormat } = (req.body ?? {}) as {
    pdfBase64?: string;
    pageFormat?: "a4" | "letter";
  };
  if (!pdfBase64 || typeof pdfBase64 !== "string") {
    return res.status(400).json({ error: "pdfBase64 is required" });
  }

  let pdfBytes: Buffer;
  try {
    pdfBytes = Buffer.from(pdfBase64, "base64");
  } catch {
    return res.status(400).json({ error: "pdfBase64 is not valid base64" });
  }

  if (pdfBytes.length === 0) {
    return res.status(400).json({ error: "PDF is empty" });
  }
  if (pdfBytes.length > MAX_PDF_BYTES) {
    return res
      .status(413)
      .json({ error: `PDF exceeds ${MAX_PDF_BYTES} byte limit` });
  }

  // 3. Rasterize
  try {
    const pngs = await rasterizePdfPages(pdfBytes, pageFormat === "letter" ? "letter" : "a4");
    const elapsed = Date.now() - start;
    console.log(
      `[render] pages=${pngs.length} bytes=${pdfBytes.length} elapsed=${elapsed}ms`,
    );
    return res.json({ pngs, pageCount: pngs.length });
  } catch (err) {
    console.error("[render] rasterization failed:", err);
    const msg = err instanceof Error ? err.message : String(err);
    return res.status(500).json({ error: `Rasterization failed: ${msg}` });
  }
});

// ── PDF → PNG rasterization ─────────────────────────────────────────

async function rasterizePdfPages(
  pdfBytes: Buffer,
  _pageFormat: "a4" | "letter",
): Promise<string[]> {
  // pdfjs wants a Uint8Array view. Copy to avoid keeping a reference into
  // express's request buffer.
  const data = new Uint8Array(pdfBytes);

  // Node builds of pdfjs expect `standardFontDataUrl` for CID fonts; if the
  // PDF is self-contained (react-pdf embeds subsets) this is not needed, but
  // supplying the path from the bundled asset avoids occasional warnings.
  const loadingTask = pdfjsLib.getDocument({
    data,
    disableFontFace: true,
    useSystemFonts: false,
    isEvalSupported: false,
  });

  const pdfDoc = await loadingTask.promise;
  const pages: string[] = [];

  try {
    const pageCount = Math.min(pdfDoc.numPages, MAX_PAGES);
    for (let i = 1; i <= pageCount; i++) {
      const page = await pdfDoc.getPage(i);

      // Skip blank pages (same heuristic as the client path).
      const textContent = await page.getTextContent();
      if (textContent.items.length === 0) {
        continue;
      }

      // 150 DPI → scale factor of 150/72 ≈ 2.083
      const scale = RASTER_DPI / 72;
      const viewport = page.getViewport({ scale });

      const canvas = createCanvas(
        Math.ceil(viewport.width),
        Math.ceil(viewport.height),
      );
      const ctx = canvas.getContext("2d");

      // Fill white background (pdfjs leaves transparent pixels where there's
      // no content; PNG over dark bg would look broken in the preview pane)
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // @napi-rs/canvas's context API is 1:1 with DOM CanvasRenderingContext2D
      // enough for pdfjs. Cast to the type pdfjs expects.
      await page.render({
        canvasContext: ctx as unknown as CanvasRenderingContext2D,
        viewport,
      }).promise;

      const buf = canvas.toBuffer("image/png");
      pages.push(`data:image/png;base64,${buf.toString("base64")}`);
    }
  } finally {
    try {
      await pdfDoc.destroy();
    } catch {
      /* noop */
    }
  }

  return pages;
}

// ── Startup ────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(
    `[preview-server] listening on :${PORT} (allowed origins: ${ALLOWED_ORIGINS.join(", ")})`,
  );
});
