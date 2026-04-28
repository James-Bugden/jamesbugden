import { assertEquals } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { callMailerLiteWithRetry } from "./retry.ts";

type Reply = { status: number; body?: unknown };

function fakeFetcher(replies: Reply[]) {
  let i = 0;
  const calls: Array<{ url: string; init: RequestInit }> = [];
  const fetcher = (url: string, init: RequestInit): Promise<Response> => {
    calls.push({ url, init });
    const reply = replies[Math.min(i, replies.length - 1)];
    i += 1;
    return Promise.resolve(
      new Response(JSON.stringify(reply.body ?? {}), {
        status: reply.status,
        headers: { "content-type": "application/json" },
      }),
    );
  };
  return { fetcher, calls };
}

const apiKey = "ml-test-key";
const email = "user@example.com";
const fields = { full_name: "Jane Doe", job_title: "Engineer" };
const noopSleep = () => Promise.resolve();

Deno.test("callMailerLiteWithRetry: 200 on first attempt → ok with 1 attempt", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 200, body: { id: "s1" } }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, true);
  assertEquals(result.attempts, 1);
  assertEquals(result.lastStatus, 200);
  assertEquals(calls.length, 1);
  const sent = JSON.parse(calls[0].init.body as string);
  assertEquals(sent.email, email);
  assertEquals(sent.fields, fields);
  assertEquals(sent.groups, undefined);
  assertEquals(
    (calls[0].init.headers as Record<string, string>).Authorization,
    `Bearer ${apiKey}`,
  );
});

Deno.test("callMailerLiteWithRetry: retries on 5xx then succeeds", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 502 }, { status: 200, body: { id: "s1" } }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, true);
  assertEquals(result.attempts, 2);
  assertEquals(calls.length, 2);
});

Deno.test("callMailerLiteWithRetry: retries on 429 then succeeds", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 429 }, { status: 200, body: { id: "s1" } }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, true);
  assertEquals(result.attempts, 2);
  assertEquals(calls.length, 2);
});

Deno.test("callMailerLiteWithRetry: gives up after 3 attempts of 5xx", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 500 }, { status: 502 }, { status: 503 }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, false);
  assertEquals(result.attempts, 3);
  assertEquals(result.lastStatus, 503);
  assertEquals(calls.length, 3);
});

Deno.test("callMailerLiteWithRetry: fails fast on 4xx (not 429) — dead-letter candidate", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 422, body: { errors: { email: ["bad"] } } }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, false);
  assertEquals(result.attempts, 1);
  assertEquals(result.lastStatus, 422);
  assertEquals(calls.length, 1);
});

Deno.test("callMailerLiteWithRetry: 401 fails fast — dead-letter candidate", async () => {
  const { fetcher, calls } = fakeFetcher([{ status: 401 }]);
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, false);
  assertEquals(result.attempts, 1);
  assertEquals(result.lastStatus, 401);
  assertEquals(calls.length, 1);
});

Deno.test("callMailerLiteWithRetry: sleeps between retries with provided schedule", async () => {
  const sleeps: number[] = [];
  const { fetcher } = fakeFetcher([{ status: 500 }, { status: 500 }, { status: 200 }]);
  const result = await callMailerLiteWithRetry({
    apiKey,
    email,
    fields,
    fetcher,
    sleep: (ms: number) => { sleeps.push(ms); return Promise.resolve(); },
    backoffMs: [10, 20, 40],
  });
  assertEquals(result.ok, true);
  assertEquals(result.attempts, 3);
  assertEquals(sleeps, [10, 20]);
});

Deno.test("callMailerLiteWithRetry: network error retries then gives up", async () => {
  let calls = 0;
  const fetcher = (_url: string, _init: RequestInit): Promise<Response> => {
    calls += 1;
    return Promise.reject(new Error("network down"));
  };
  const result = await callMailerLiteWithRetry({ apiKey, email, fields, fetcher, sleep: noopSleep });
  assertEquals(result.ok, false);
  assertEquals(result.attempts, 3);
  assertEquals(result.lastStatus, 0);
  assertEquals(calls, 3);
});
