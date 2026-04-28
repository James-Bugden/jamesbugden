import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { buildCorsHeaders, isAllowedOrigin } from "./cors.ts";

Deno.test("isAllowedOrigin: production host", () => {
  assertEquals(isAllowedOrigin("https://jamesbugden.com"), true);
});

Deno.test("isAllowedOrigin: localhost any port", () => {
  assertEquals(isAllowedOrigin("http://localhost:8080"), true);
  assertEquals(isAllowedOrigin("http://localhost:3000"), true);
  assertEquals(isAllowedOrigin("http://localhost"), true);
});

Deno.test("isAllowedOrigin: rejects http on prod host", () => {
  assertEquals(isAllowedOrigin("http://jamesbugden.com"), false);
});

Deno.test("isAllowedOrigin: rejects subdomain", () => {
  assertEquals(isAllowedOrigin("https://evil.jamesbugden.com"), false);
});

Deno.test("isAllowedOrigin: rejects suffix-attack lookalike", () => {
  assertEquals(isAllowedOrigin("https://jamesbugden.com.attacker.example"), false);
});

Deno.test("isAllowedOrigin: rejects null and empty", () => {
  assertEquals(isAllowedOrigin(null), false);
  assertEquals(isAllowedOrigin(""), false);
});

Deno.test("isAllowedOrigin: rejects unrelated host", () => {
  assertEquals(isAllowedOrigin("https://attacker.example"), false);
});

Deno.test("isAllowedOrigin: rejects localhost with extra path", () => {
  assertEquals(isAllowedOrigin("http://localhost:8080/admin"), false);
});

Deno.test("buildCorsHeaders: allowed origin reflects + adds Vary", () => {
  const h = buildCorsHeaders("https://jamesbugden.com");
  assertEquals(h["Access-Control-Allow-Origin"], "https://jamesbugden.com");
  assertEquals(h["Vary"], "Origin");
  assertEquals(h["Access-Control-Allow-Methods"], "POST, OPTIONS");
});

Deno.test("buildCorsHeaders: disallowed omits ACAO but keeps Vary", () => {
  const h = buildCorsHeaders("https://attacker.example");
  assertEquals(h["Access-Control-Allow-Origin"], undefined);
  assertEquals(h["Vary"], "Origin");
});

Deno.test("buildCorsHeaders: null origin omits ACAO", () => {
  const h = buildCorsHeaders(null);
  assertEquals(h["Access-Control-Allow-Origin"], undefined);
  assertEquals(h["Vary"], "Origin");
});
