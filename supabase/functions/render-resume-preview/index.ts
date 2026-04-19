/**
 * render-resume-preview — FlowCV-style live preview, NO Browserless.
 *
 * Why this exists:
 *   - Client-side pdfjs rasterization freezes on CJK-heavy PDFs on slow
 *     devices (the 30–75s hang observed on Chinese resumes). FlowCV
 *     avoids this by rendering server-side; we mimic that approach.
 *
 * Architecture choice (2026-04-19, user-directed):
 *   - Client generates the PDF with the existing react-pdf pipeline
 *     (keeps preview↔download parity — the main invariant).
 *   - Client POSTs the PDF blob (as base64) to this Edge Function.
 *   - Function rasterizes each page with pdfjs-dist running in Deno
 *     (no Chromium, no Browserless, no external bill).
 *   - Function returns PNG data URLs; client renders them as <img>.
 *
 * Why NOT Browserless:
 *   - The existing `generate-pdf` function uses Browserless but isn't
 *     in the main resume download path, so Browserless is currently a
 *     sunk cost. Using it here would lock in that cost. pdfjs-dist
 *     runs fine inside Deno via `npm:` specifiers.
 *
 * Dependencies (resolved at deploy time by Deno):
 *   - npm:pdfjs-dist@4.10.38 — PDF parsing + rendering
 *   - npm:@napi-rs/canvas@0.1  — Canvas polyfill for rasterization
 *
 * If @napi-rs/canvas fails at runtime (binary mismatch on Supabase's
 * Deno Deploy host), fall back to Option A (Browserless) — the commit
 * history for this file has the ready-to-use Browserless version.
 *
 * Auth:
 *   - Requires Bearer token (valid Supabase session).
 *   - Rate limited to 200 previews / user / month (admin bypass).
 *
 * Env:
 *   - SUPABASE_URL, SUPABASE_ANON_KEY — auto-injected.
 *   - No Browserless key needed.
 */

import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "jsr:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
};

const PREVIEW_MONTHLY_LIMIT = 200;
const USAGE_TYPE = "preview_render";
// 150 DPI — sharper than viewport default but not so big the response
// balloons past Edge Function payload limits (~6 MB).
const RASTER_DPI = 150;
const MAX_PAGES = 5;

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }
  if (req.method !== "POST") {
    return json({ error: "Method not allowed" }, 405);
  }

  try {
    // ── 1. Auth ────────────────────────────────────────────────────
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return json({ error: "Unauthorized" }, 401);
    }

    const supabase = createClient(
      Deno.env.get("SUPABASE_URL")!,
      Deno.env.get("SUPABASE_ANON_KEY")!,
      { global: { headers: { Authorization: authHeader } } },
    );

    const token = authHeader.replace("Bearer ", "");
    const { data: claimsData, error: claimsError } = await supabase.auth.getClaims(token);
    if (claimsError || !claimsData?.claims) {
      return json({ error: "Unauthorized" }, 401);
    }
    const userId = claimsData.claims.sub as string;

    // ── 2. Rate limit (admin bypass) ───────────────────────────────
    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });

    let usedThisMonth = 0;
    if (!isAdmin) {
      const { data: countData } = await supabase.rpc("count_ai_usage_this_month", {
        p_user_id: userId,
        p_usage_type: USAGE_TYPE,
      });
      usedThisMonth = (countData as number) ?? 0;
      if (usedThisMonth >= PREVIEW_MONTHLY_LIMIT) {
        return json(
          {
            error: "Monthly preview render limit reached",
            limit: PREVIEW_MONTHLY_LIMIT,
            used: usedThisMonth,
          },
          429,
        );
      }
    }

    // ── 3. Parse input ─────────────────────────────────────────────
    const body = await req.json();
    const pdfBase64 = body.pdfBase64 as string | undefined;
    if (!pdfBase64 || typeof pdfBase64 !== "string") {
      return json({ error: "Missing pdfBase64 in request body" }, 400);
    }

    const pdfBytes = base64ToBytes(pdfBase64);

    // ── 4. Rasterize with pdfjs-dist in Deno ───────────────────────
    const pngs = await rasterizePdf(pdfBytes);
    if (pngs.length === 0) {
      return json({ error: "PDF produced zero pages" }, 400);
    }

    // ── 5. Log usage ───────────────────────────────────────────────
    await supabase.from("ai_usage_log").insert({
      user_id: userId,
      usage_type: USAGE_TYPE,
    });

    // ── 6. Return ──────────────────────────────────────────────────
    return json(
      {
        pngs,
        pageCount: pngs.length,
        used: usedThisMonth + 1,
        limit: PREVIEW_MONTHLY_LIMIT,
      },
      200,
    );
  } catch (err) {
    console.error("[render-resume-preview] fatal:", err);
    return json({ error: (err as Error).message ?? "Unknown server error" }, 500);
  }
});

// ─── helpers ────────────────────────────────────────────────────────

function json(body: unknown, status: number) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, "Content-Type": "application/json" },
  });
}

function base64ToBytes(b64: string): Uint8Array {
  const binStr = atob(b64);
  const bytes = new Uint8Array(binStr.length);
  for (let i = 0; i < binStr.length; i++) bytes[i] = binStr.charCodeAt(i);
  return bytes;
}

/**
 * Rasterize each page of a PDF to a PNG data URL. Uses pdfjs-dist's
 * "legacy" build which is pure JS (no worker, no DOM). We provide a
 * canvas via @napi-rs/canvas — pure WASM, runs in any Deno environment.
 *
 * Returns an array of `data:image/png;base64,...` strings.
 */
async function rasterizePdf(pdfBytes: Uint8Array): Promise<string[]> {
  // Imported dynamically so cold-start cost is only paid when the
  // function actually handles a request.
  const [{ getDocument }, { createCanvas }] = await Promise.all([
    import("npm:pdfjs-dist@4.10.38/legacy/build/pdf.mjs"),
    import("npm:@napi-rs/canvas@0.1"),
  ]);

  const pdf = await getDocument({
    data: pdfBytes,
    // legacy build still pulls a worker URL; disable so Deno doesn't try
    // to spawn a Worker we didn't set up.
    disableWorker: true,
  } as unknown as Parameters<typeof getDocument>[0]).promise;

  const pageCount = Math.min(pdf.numPages, MAX_PAGES);
  const scale = RASTER_DPI / 72; // pdfjs viewport default is 72 DPI
  const pngs: string[] = [];

  for (let i = 1; i <= pageCount; i++) {
    const page = await pdf.getPage(i);
    const viewport = page.getViewport({ scale });
    const canvas = createCanvas(Math.ceil(viewport.width), Math.ceil(viewport.height));
    const ctx = canvas.getContext("2d");

    await page.render({
      // @napi-rs/canvas's context matches the CanvasRenderingContext2D
      // interface pdfjs expects. The cast tells TS to trust us.
      canvasContext: ctx as unknown as CanvasRenderingContext2D,
      viewport,
    }).promise;

    // encodeSync returns a Buffer; convert to base64 manually to avoid
    // pulling node:buffer.
    const png = canvas.encodeSync("png");
    pngs.push("data:image/png;base64," + uint8ToBase64(png));
  }

  return pngs;
}

function uint8ToBase64(bytes: Uint8Array): string {
  let bin = "";
  const CHUNK = 0x8000;
  for (let i = 0; i < bytes.length; i += CHUNK) {
    bin += String.fromCharCode(...bytes.subarray(i, i + CHUNK));
  }
  return btoa(bin);
}
