import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { assertWebhookSecret, WebhookSecretError } from "./webhookSecret.ts";

const SECRET = "shhh-test-secret";

Deno.test("assertWebhookSecret: accepts request with matching header", () => {
  const req = new Request("https://example.com/", {
    method: "POST",
    headers: { "x-webhook-secret": SECRET },
  });
  assertEquals(assertWebhookSecret(req, SECRET), true);
});

Deno.test("assertWebhookSecret: rejects when header missing", () => {
  const req = new Request("https://example.com/", { method: "POST" });
  assertThrows(
    () => assertWebhookSecret(req, SECRET),
    WebhookSecretError,
    "missing",
  );
});

Deno.test("assertWebhookSecret: rejects when header empty", () => {
  const req = new Request("https://example.com/", {
    method: "POST",
    headers: { "x-webhook-secret": "" },
  });
  assertThrows(
    () => assertWebhookSecret(req, SECRET),
    WebhookSecretError,
    "missing",
  );
});

Deno.test("assertWebhookSecret: rejects when header does not match", () => {
  const req = new Request("https://example.com/", {
    method: "POST",
    headers: { "x-webhook-secret": "wrong" },
  });
  assertThrows(
    () => assertWebhookSecret(req, SECRET),
    WebhookSecretError,
    "mismatch",
  );
});

Deno.test("assertWebhookSecret: throws when configured secret is empty (fail-closed)", () => {
  const req = new Request("https://example.com/", {
    method: "POST",
    headers: { "x-webhook-secret": "anything" },
  });
  assertThrows(
    () => assertWebhookSecret(req, ""),
    WebhookSecretError,
    "not configured",
  );
});
