// Tests for send-welcome-sequence-trigger.
// Run: deno test --allow-env supabase/functions/send-welcome-sequence-trigger/index.test.ts

import { assertEquals } from "https://deno.land/std@0.168.0/testing/asserts.ts";
import { handleRequest, type Deps } from "./index.ts";

function makeRequest(opts: {
  method?: string;
  secret?: string | null;
  body?: unknown;
}): Request {
  const headers = new Headers({ "Content-Type": "application/json" });
  if (opts.secret !== null && opts.secret !== undefined) {
    headers.set("x-webhook-secret", opts.secret);
  }
  return new Request("https://example.com/", {
    method: opts.method ?? "POST",
    headers,
    body: opts.body !== undefined ? JSON.stringify(opts.body) : undefined,
  });
}

function insertPayload(recordOverrides: Record<string, unknown> = {}) {
  return {
    type: "INSERT",
    table: "resume_leads",
    schema: "public",
    record: {
      id: "row-abc",
      email: "test@example.com",
      name: "Ada Lovelace",
      overall_score: 78,
      welcome_sequence_started_at: null,
      created_at: "2026-04-28T12:00:00Z",
      ...recordOverrides,
    },
    old_record: null,
  };
}

function makeDeps(overrides: Partial<Deps> = {}): Deps {
  return {
    getEnv: (key: string) => {
      const map: Record<string, string> = {
        SEND_WELCOME_SEQUENCE_WEBHOOK_SECRET: "test-secret",
        MAILERLITE_API_KEY: "ml-key",
        SUPABASE_URL: "https://example.supabase.co",
        SUPABASE_SERVICE_ROLE_KEY: "svc-key",
      };
      return map[key];
    },
    supabaseFactory: (_url: string, _key: string) =>
      ({
        from: (_table: string) => ({
          select: (_cols: string) => ({
            eq: (_col: string, _val: string) => ({
              not: (_col2: string, _op: string, _val2: unknown) => ({
                limit: (_n: number) =>
                  Promise.resolve({ data: [], error: null }),
              }),
              maybeSingle: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          update: (_vals: Record<string, unknown>) => ({
            eq: (_col: string, _val: string) =>
              Promise.resolve({ error: null }),
          }),
          insert: (_row: Record<string, unknown>) =>
            Promise.resolve({ error: null }),
        }),
      }) as unknown as ReturnType<Deps["supabaseFactory"]>,
    mailerLiteFetch: (
      _email: string,
      _fields: Record<string, unknown>,
      _groups: string[],
    ) => Promise.resolve({ ok: true, status: 200 }),
    ...overrides,
  };
}

Deno.test("rejects non-POST methods", async () => {
  const res = await handleRequest(makeRequest({ method: "GET" }), makeDeps());
  assertEquals(res.status, 405);
});

Deno.test("rejects missing webhook secret header", async () => {
  const res = await handleRequest(
    makeRequest({ secret: null, body: insertPayload() }),
    makeDeps(),
  );
  assertEquals(res.status, 401);
});

Deno.test("rejects mismatched webhook secret", async () => {
  const res = await handleRequest(
    makeRequest({ secret: "wrong-secret", body: insertPayload() }),
    makeDeps(),
  );
  assertEquals(res.status, 401);
});

Deno.test("skips when email already in sequence", async () => {
  const deps = makeDeps({
    supabaseFactory: (_url: string, _key: string) =>
      ({
        from: (_table: string) => ({
          select: (_cols: string) => ({
            eq: (_col: string, _val: string) => ({
              not: (_col2: string, _op: string, _val2: unknown) => ({
                limit: (_n: number) =>
                  Promise.resolve({ data: [{ id: "old-row" }], error: null }),
              }),
              maybeSingle: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          update: (_vals: Record<string, unknown>) => ({
            eq: (_col: string, _val: string) =>
              Promise.resolve({ error: null }),
          }),
          insert: (_row: Record<string, unknown>) =>
            Promise.resolve({ error: null }),
        }),
      }) as unknown as ReturnType<Deps["supabaseFactory"]>,
  });

  const res = await handleRequest(
    makeRequest({ secret: "test-secret", body: insertPayload() }),
    deps,
  );
  assertEquals(res.status, 200);
  const body = await res.json();
  assertEquals(body.skipped, "already_in_sequence");
});

Deno.test("calls MailerLite with resume_score and first/last name, sets welcome_sequence_started_at", async () => {
  let capturedEmail = "";
  let capturedFields: Record<string, unknown> = {};
  let capturedGroups: string[] = [];
  let updatedRowId = "";

  const deps = makeDeps({
    mailerLiteFetch: (
      email: string,
      fields: Record<string, unknown>,
      groups: string[],
    ) => {
      capturedEmail = email;
      capturedFields = fields;
      capturedGroups = groups;
      return Promise.resolve({ ok: true, status: 200 });
    },
    supabaseFactory: (_url: string, _key: string) =>
      ({
        from: (_table: string) => ({
          select: (_cols: string) => ({
            eq: (_col: string, _val: string) => ({
              not: (_col2: string, _op: string, _val2: unknown) => ({
                limit: (_n: number) =>
                  Promise.resolve({ data: [], error: null }),
              }),
              maybeSingle: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          update: (_vals: Record<string, unknown>) => ({
            eq: (_col: string, val: string) => {
              updatedRowId = val;
              return Promise.resolve({ error: null });
            },
          }),
          insert: (_row: Record<string, unknown>) =>
            Promise.resolve({ error: null }),
        }),
      }) as unknown as ReturnType<Deps["supabaseFactory"]>,
  });

  const res = await handleRequest(
    makeRequest({ secret: "test-secret", body: insertPayload() }),
    deps,
  );

  assertEquals(res.status, 200);
  assertEquals(capturedEmail, "test@example.com");
  assertEquals(capturedFields.resume_score, 78);
  assertEquals(capturedFields.name, "Ada");
  assertEquals(capturedFields.last_name, "Lovelace");
  assertEquals(capturedGroups, ["181733295867823354"]);
  assertEquals(updatedRowId, "row-abc");
});

Deno.test("sets stage_branch=negotiating when profile has negotiating stage", async () => {
  let capturedFields: Record<string, unknown> = {};

  const deps = makeDeps({
    mailerLiteFetch: (
      _email: string,
      fields: Record<string, unknown>,
      _groups: string[],
    ) => {
      capturedFields = fields;
      return Promise.resolve({ ok: true, status: 200 });
    },
    supabaseFactory: (_url: string, _key: string) =>
      ({
        from: (_table: string) => ({
          select: (_cols: string) => ({
            eq: (_col: string, _val: string) => ({
              not: (_col2: string, _op: string, _val2: unknown) => ({
                limit: (_n: number) =>
                  Promise.resolve({ data: [], error: null }),
              }),
              maybeSingle: () =>
                Promise.resolve({
                  data: { job_search_stage: "negotiating" },
                  error: null,
                }),
            }),
          }),
          update: (_vals: Record<string, unknown>) => ({
            eq: (_col: string, _val: string) =>
              Promise.resolve({ error: null }),
          }),
          insert: (_row: Record<string, unknown>) =>
            Promise.resolve({ error: null }),
        }),
      }) as unknown as ReturnType<Deps["supabaseFactory"]>,
  });

  const res = await handleRequest(
    makeRequest({ secret: "test-secret", body: insertPayload() }),
    deps,
  );

  assertEquals(res.status, 200);
  assertEquals(capturedFields.stage_branch, "negotiating");
});

Deno.test("returns 502 and logs failed status when MailerLite returns non-ok", async () => {
  let loggedStatus = "";

  const deps = makeDeps({
    mailerLiteFetch: (
      _email: string,
      _fields: Record<string, unknown>,
      _groups: string[],
    ) => Promise.resolve({ ok: false, status: 429 }),
    supabaseFactory: (_url: string, _key: string) =>
      ({
        from: (_table: string) => ({
          select: (_cols: string) => ({
            eq: (_col: string, _val: string) => ({
              not: (_col2: string, _op: string, _val2: unknown) => ({
                limit: (_n: number) =>
                  Promise.resolve({ data: [], error: null }),
              }),
              maybeSingle: () => Promise.resolve({ data: null, error: null }),
            }),
          }),
          update: (_vals: Record<string, unknown>) => ({
            eq: (_col: string, _val: string) =>
              Promise.resolve({ error: null }),
          }),
          insert: (row: Record<string, unknown>) => {
            loggedStatus = row.status as string;
            return Promise.resolve({ error: null });
          },
        }),
      }) as unknown as ReturnType<Deps["supabaseFactory"]>,
  });

  const res = await handleRequest(
    makeRequest({ secret: "test-secret", body: insertPayload() }),
    deps,
  );

  assertEquals(res.status, 502);
  assertEquals(loggedStatus, "failed");
});
