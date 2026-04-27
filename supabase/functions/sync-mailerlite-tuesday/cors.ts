// HIR-88: CORS allowlist for sync-mailerlite-tuesday. Replaces the previous
// `Access-Control-Allow-Origin: *` so only our own origins can call the
// function from a browser.

const PROD_ORIGIN = "https://jamesbugden.com";
const LOCALHOST_RE = /^http:\/\/localhost(:\d+)?$/;

const ALLOWED_HEADERS =
  "authorization, x-client-info, apikey, content-type, x-supabase-client-platform, x-supabase-client-platform-version, x-supabase-client-runtime, x-supabase-client-runtime-version";

export function isAllowedOrigin(origin: string | null | undefined): boolean {
  if (!origin) return false;
  if (origin === PROD_ORIGIN) return true;
  return LOCALHOST_RE.test(origin);
}

export function buildCorsHeaders(
  origin: string | null | undefined,
): Record<string, string> {
  const headers: Record<string, string> = {
    Vary: "Origin",
    "Access-Control-Allow-Headers": ALLOWED_HEADERS,
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
  };
  if (isAllowedOrigin(origin)) {
    headers["Access-Control-Allow-Origin"] = origin as string;
  }
  return headers;
}
