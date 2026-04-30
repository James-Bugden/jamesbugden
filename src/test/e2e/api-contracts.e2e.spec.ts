/**
 * Backend API contract tests — Supabase Edge Functions + Fly.io preview.
 *
 * These tests validate the OUTWARD shape of each backend endpoint without
 * consuming LLM quota or creating DB rows:
 *   - unauthenticated requests get 401
 *   - malformed bodies get 400
 *   - wrong methods get 405
 *   - CORS preflight works (OPTIONS returns proper headers)
 *   - health endpoints respond
 *
 * Heavier behavioural tests (actual analyze / parse / PDF generation)
 * live in api-analyzer-flow.e2e.spec.ts and are gated by RUN_EXPENSIVE_API=1.
 *
 * Backend surface documented in:
 *   supabase/functions/<name>/index.ts  (one folder per edge function)
 *   server/src/server.ts                (Fly.io preview rasterizer)
 */

import { test, expect } from "@playwright/test";
import { readFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const REPO_ROOT = path.resolve(__dirname, "../../..");

const SUPABASE_URL = "https://reahmeddjkivwzjsoqkn.supabase.co";
const FLY_URL = "https://jamesbugden-preview.fly.dev";

// Edge functions actually deployed to Supabase. `render-resume-preview`
// exists in supabase/functions/ locally but is not deployed to prod — the
// server-side preview was moved to Fly.io (see server/src/server.ts), and
// the Supabase version is stale code. Probing it returns 404 at the
// gateway, which is not a meaningful contract — so it's excluded here.
const EDGE_FUNCTIONS = [
  "analyze-resume",
  "parse-resume-to-builder",
  "generate-pdf",
  "resume-ai",
] as const;

// No auth state needed for these raw HTTP checks — they ARE the auth tests.
test.use({ storageState: { cookies: [], origins: [] } });

test.describe("Edge function contract — auth rejection", () => {
  // Both analyze-resume and resume-ai allow guest calls per
  // supabase/functions/*/index.ts, but all others require a JWT.
  const AUTH_REQUIRED: (typeof EDGE_FUNCTIONS)[number][] = [
    "parse-resume-to-builder",
    "generate-pdf",
  ];

  for (const fn of AUTH_REQUIRED) {
    test(`${fn}: unauthenticated POST returns 401`, async ({ request }) => {
      const res = await request.post(`${SUPABASE_URL}/functions/v1/${fn}`, {
        data: {},
        headers: { "Content-Type": "application/json" },
      });
      // Supabase gateway may return 401 OR the function body may 401 itself.
      // Accept either — the important thing is it is NOT 200 with real data.
      expect([401, 403]).toContain(res.status());
    });
  }
});

test.describe("Edge function contract — CORS preflight", () => {
  for (const fn of EDGE_FUNCTIONS) {
    test(`${fn}: OPTIONS returns CORS headers`, async ({ request }) => {
      const res = await request.fetch(`${SUPABASE_URL}/functions/v1/${fn}`, {
        method: "OPTIONS",
        headers: {
          Origin: "https://jamesbugden.com",
          "Access-Control-Request-Method": "POST",
          "Access-Control-Request-Headers": "content-type,authorization",
        },
      });
      // Supabase gateway returns 204 No Content or 200 for OPTIONS.
      expect([200, 204]).toContain(res.status());
      const allowOrigin = res.headers()["access-control-allow-origin"];
      expect(allowOrigin, "missing Access-Control-Allow-Origin").toBeTruthy();
    });
  }
});

test.describe("Edge function contract — malformed bodies", () => {
  // analyze-resume allows guests — test with invalid body to exercise 400 path.
  test("analyze-resume: missing resumeText returns 4xx (not 200)", async ({
    request,
  }) => {
    const res = await request.post(
      `${SUPABASE_URL}/functions/v1/analyze-resume`,
      {
        data: { language: "en" }, // no resumeText
        headers: { "Content-Type": "application/json" },
      },
    );
    // Should not succeed — either validation or downstream will reject.
    expect(res.status(), `got ${res.status()} with no resumeText`).toBeLessThan(
      500,
    );
    expect(res.status()).not.toBe(200);
  });

  test("analyze-resume: empty resumeText string returns 4xx", async ({
    request,
  }) => {
    const res = await request.post(
      `${SUPABASE_URL}/functions/v1/analyze-resume`,
      {
        data: { resumeText: "", language: "en" },
        headers: { "Content-Type": "application/json" },
      },
    );
    expect(res.status()).not.toBe(200);
  });

  test("analyze-resume: non-JSON body does not crash (5xx) the function", async ({
    request,
  }) => {
    const res = await request.post(
      `${SUPABASE_URL}/functions/v1/analyze-resume`,
      {
        data: "this is not json at all",
        headers: { "Content-Type": "text/plain" },
      },
    );
    // 4xx is fine, 5xx means the function isn't catching its own JSON parse.
    expect(
      res.status(),
      `non-JSON crashed the function (expected 4xx, got ${res.status()})`,
    ).toBeLessThan(500);
  });
});

test.describe("Edge function contract — method restrictions", () => {
  test("analyze-resume: GET is rejected", async ({ request }) => {
    const res = await request.get(
      `${SUPABASE_URL}/functions/v1/analyze-resume`,
    );
    // Edge function handles OPTIONS + POST only. GET should return non-200.
    expect(res.status()).not.toBe(200);
  });
});

test.describe("Fly.io preview service", () => {
  test("GET /health returns ok with service metadata", async ({ request }) => {
    const res = await request.get(`${FLY_URL}/health`);
    expect(res.status()).toBe(200);
    const body = await res.json();
    expect(body.ok, `health body: ${JSON.stringify(body)}`).toBe(true);
    expect(body.service).toBe("resume-preview");
    expect(typeof body.version).toBe("string");
  });

  test("POST /render without Authorization returns 401", async ({
    request,
  }) => {
    const res = await request.post(`${FLY_URL}/render`, {
      data: { pdfBase64: "JVBERi0xLjQK", pageFormat: "a4" },
      headers: { "Content-Type": "application/json" },
    });
    expect(res.status()).toBe(401);
  });

  test("POST /render with invalid Bearer token returns 401", async ({
    request,
  }) => {
    const res = await request.post(`${FLY_URL}/render`, {
      data: { pdfBase64: "JVBERi0xLjQK", pageFormat: "a4" },
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer not-a-real-jwt",
      },
    });
    expect(res.status()).toBe(401);
  });

  test("OPTIONS /render returns CORS headers for jamesbugden.com origin", async ({
    request,
  }) => {
    const res = await request.fetch(`${FLY_URL}/render`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://jamesbugden.com",
        "Access-Control-Request-Method": "POST",
      },
    });
    expect([200, 204]).toContain(res.status());
    const allowOrigin = res.headers()["access-control-allow-origin"];
    expect(allowOrigin).toContain("jamesbugden.com");
  });

  test("OPTIONS /render from random origin is not blanket-allowed", async ({
    request,
  }) => {
    // Cross-check: ALLOWED_ORIGINS in server/src/server.ts should NOT
    // include arbitrary origins. A wildcard would be a security bug.
    const res = await request.fetch(`${FLY_URL}/render`, {
      method: "OPTIONS",
      headers: {
        Origin: "https://attacker.example.com",
        "Access-Control-Request-Method": "POST",
      },
    });
    const allowOrigin = res.headers()["access-control-allow-origin"] ?? "";
    expect(allowOrigin).not.toBe("*");
    expect(allowOrigin).not.toContain("attacker.example.com");
  });
});

test.describe("Public surface sanity", () => {
  test("root HTML has Content-Security-Policy meta tag", async ({ request }) => {
    const res = await request.get("https://jamesbugden.com/");
    expect(res.status()).toBe(200);
    const html = await res.text();
    expect(
      html,
      "CSP meta tag missing — would allow arbitrary font/connect sources",
    ).toMatch(/http-equiv="Content-Security-Policy"/);
  });

  test("source index.html CSP connect-src allows data: URIs (HIR-50)", () => {
    // Emscripten WASM loaders (e.g. yoga-layout, used by @react-pdf/renderer)
    // probe `fetch('data:application/octet-stream;base64,...')` before falling
    // back to TypedArray instantiation. Without `data:` in connect-src, the
    // probe is blocked and pollutes DevTools with CSP violations on every
    // Download panel open. The fallback succeeds today, but a future loader
    // upgrade may flip preference order — pre-empt that here.
    const html = readFileSync(path.join(REPO_ROOT, "index.html"), "utf8");
    const cspMatch = html.match(
      /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i,
    );
    expect(cspMatch, "CSP meta tag not found in index.html").not.toBeNull();
    const csp = cspMatch![1];
    const connectSrc = csp
      .split(";")
      .map((d) => d.trim())
      .find((d) => d.startsWith("connect-src"));
    expect(connectSrc, "connect-src directive missing").toBeTruthy();
    expect(
      connectSrc!.split(/\s+/),
      `connect-src missing 'data:' source — Emscripten WASM probe will spam CSP errors. Got: ${connectSrc}`,
    ).toContain("data:");
  });

  test("source index.html CSP script-src allows Facebook Pixel CDN (HIR-359)", () => {
    const html = readFileSync(path.join(REPO_ROOT, "index.html"), "utf8");
    const cspMatch = html.match(
      /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i,
    );
    expect(cspMatch, "CSP meta tag not found in index.html").not.toBeNull();
    const csp = cspMatch![1];
    const scriptSrc = csp
      .split(";")
      .map((d) => d.trim())
      .find((d) => d.startsWith("script-src"));
    expect(scriptSrc, "script-src directive missing").toBeTruthy();
    expect(
      scriptSrc!.split(/\s+/),
      `script-src missing 'https://connect.facebook.net' — Facebook Pixel script will be blocked by CSP. Got: ${scriptSrc}`,
    ).toContain("https://connect.facebook.net");
  });

  test("source index.html CSP connect-src allows Facebook Pixel event reporting (HIR-359)", () => {
    const html = readFileSync(path.join(REPO_ROOT, "index.html"), "utf8");
    const cspMatch = html.match(
      /<meta\s+http-equiv="Content-Security-Policy"\s+content="([^"]+)"/i,
    );
    expect(cspMatch, "CSP meta tag not found in index.html").not.toBeNull();
    const csp = cspMatch![1];
    const connectSrc = csp
      .split(";")
      .map((d) => d.trim())
      .find((d) => d.startsWith("connect-src"));
    expect(connectSrc, "connect-src directive missing").toBeTruthy();
    expect(
      connectSrc!.split(/\s+/),
      `connect-src missing 'https://www.facebook.com' — Facebook Pixel event XHRs will be blocked by CSP. Got: ${connectSrc}`,
    ).toContain("https://www.facebook.com");
  });

  test("self-hosted CJK TC subset fonts are served with correct content-type", async ({
    request,
  }) => {
    // Regression sentinel for the mojibake bug: if these 404, Traditional
    // Chinese resumes will render as mojibake regardless of prepareFonts()
    // arguments. This test catches deploy pipeline regressions that would
    // drop the `public/fonts/` directory from the build output.
    for (const weight of [400, 700]) {
      const res = await request.head(
        `https://jamesbugden.com/fonts/noto-sans-tc-subset-${weight}.woff2`,
      );
      expect(res.status(), `weight ${weight} missing`).toBe(200);
      expect(res.headers()["content-type"]).toContain("font/woff2");
    }
  });
});
