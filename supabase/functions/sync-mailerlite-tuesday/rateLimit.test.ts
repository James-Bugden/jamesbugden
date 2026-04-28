import { assertEquals, assertRejects } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { checkAndRecord, getClientIp } from "./rateLimit.ts";

// Minimal hand-rolled fake of the supabase-js client surface we use.
// We only call `.from(table).select(...).eq(...).eq(...).gte(...)` (awaitable)
// and `.from(table).insert(row)` (awaitable). Matching that shape is enough.

interface InsertRow {
  function_name: string;
  client_ip: string;
}

class FakeQuery implements PromiseLike<{ count: number; error: null }> {
  count: number;
  selectOpts: { count: string; head: boolean } | null = null;
  filters: Array<{ col: string; op: string; val: unknown }> = [];

  constructor(count: number) {
    this.count = count;
  }

  select(_cols: string, opts: { count: string; head: boolean }) {
    this.selectOpts = opts;
    return this;
  }
  eq(col: string, val: unknown) {
    this.filters.push({ col, op: "eq", val });
    return this;
  }
  gte(col: string, val: unknown) {
    this.filters.push({ col, op: "gte", val });
    return this;
  }
  // PromiseLike — fires when the chain is awaited.
  then<TR1 = { count: number; error: null }, TR2 = never>(
    onfulfilled?: ((v: { count: number; error: null }) => TR1 | PromiseLike<TR1>) | null,
    _onrejected?: ((reason: unknown) => TR2 | PromiseLike<TR2>) | null,
  ): Promise<TR1 | TR2> {
    return Promise.resolve({ count: this.count, error: null }).then(onfulfilled);
  }
}

class FakeSupabase {
  query: FakeQuery;
  inserts: InsertRow[] = [];
  insertError: { message: string } | null = null;
  fromCalls: string[] = [];

  constructor(count = 0) {
    this.query = new FakeQuery(count);
  }

  from(table: string) {
    this.fromCalls.push(table);
    return {
      select: (cols: string, opts: { count: string; head: boolean }) =>
        this.query.select(cols, opts),
      insert: (row: InsertRow) => {
        if (this.insertError) {
          return Promise.resolve({ error: this.insertError });
        }
        this.inserts.push(row);
        return Promise.resolve({ error: null });
      },
    };
  }
}

class FakeSupabaseCountError {
  fromCalls: string[] = [];
  from(table: string) {
    this.fromCalls.push(table);
    return {
      select: (_cols: string, _opts: unknown) => ({
        eq: () => ({
          eq: () => ({
            gte: () => Promise.resolve({ count: null, error: { message: "boom" } }),
          }),
        }),
      }),
      insert: () => Promise.resolve({ error: null }),
    };
  }
}

Deno.test("getClientIp: prefers x-forwarded-for first entry", () => {
  const h = new Headers({ "x-forwarded-for": "1.2.3.4, 5.6.7.8" });
  assertEquals(getClientIp(h), "1.2.3.4");
});

Deno.test("getClientIp: trims whitespace from x-forwarded-for", () => {
  const h = new Headers({ "x-forwarded-for": "   1.2.3.4   , 5.6.7.8" });
  assertEquals(getClientIp(h), "1.2.3.4");
});

Deno.test("getClientIp: falls back to cf-connecting-ip", () => {
  const h = new Headers({ "cf-connecting-ip": "9.9.9.9" });
  assertEquals(getClientIp(h), "9.9.9.9");
});

Deno.test("getClientIp: falls back to x-real-ip", () => {
  const h = new Headers({ "x-real-ip": "8.8.8.8" });
  assertEquals(getClientIp(h), "8.8.8.8");
});

Deno.test("getClientIp: returns 'unknown' when no header", () => {
  assertEquals(getClientIp(new Headers()), "unknown");
});

Deno.test("checkAndRecord: under limit → allowed=true, insert called with right row", async () => {
  const sb = new FakeSupabase(2);
  const result = await checkAndRecord(sb as unknown as never, {
    functionName: "sync-mailerlite-tuesday",
    clientIp: "1.2.3.4",
    maxPerWindow: 5,
    windowSeconds: 60,
  });
  assertEquals(result.allowed, true);
  assertEquals(result.used, 3);
  assertEquals(result.limit, 5);
  assertEquals(sb.inserts.length, 1);
  assertEquals(sb.inserts[0].function_name, "sync-mailerlite-tuesday");
  assertEquals(sb.inserts[0].client_ip, "1.2.3.4");
});

Deno.test("checkAndRecord: at limit → allowed=false, insert NOT called", async () => {
  const sb = new FakeSupabase(5);
  const result = await checkAndRecord(sb as unknown as never, {
    functionName: "sync-mailerlite-tuesday",
    clientIp: "1.2.3.4",
    maxPerWindow: 5,
    windowSeconds: 60,
  });
  assertEquals(result.allowed, false);
  assertEquals(result.used, 5);
  assertEquals(result.retryAfterSeconds, 60);
  assertEquals(sb.inserts.length, 0);
});

Deno.test("checkAndRecord: over limit → allowed=false", async () => {
  const sb = new FakeSupabase(99);
  const result = await checkAndRecord(sb as unknown as never, {
    functionName: "sync-mailerlite-tuesday",
    clientIp: "1.2.3.4",
    maxPerWindow: 5,
    windowSeconds: 60,
  });
  assertEquals(result.allowed, false);
});

Deno.test("checkAndRecord: queries the rate-limit log table by function+ip+window", async () => {
  const sb = new FakeSupabase(0);
  await checkAndRecord(sb as unknown as never, {
    functionName: "sync-mailerlite-tuesday",
    clientIp: "5.6.7.8",
    maxPerWindow: 5,
    windowSeconds: 60,
  });
  assertEquals(sb.fromCalls[0], "edge_function_rate_limit_log");
  // Should have applied two eq filters and one gte (function_name, client_ip, attempted_at)
  const colsFiltered = sb.query.filters.map((f) => `${f.op}:${f.col}`);
  assertEquals(colsFiltered.includes("eq:function_name"), true);
  assertEquals(colsFiltered.includes("eq:client_ip"), true);
  assertEquals(colsFiltered.includes("gte:attempted_at"), true);
});

Deno.test("checkAndRecord: count error → throws (caller fails closed)", async () => {
  const sb = new FakeSupabaseCountError();
  await assertRejects(() =>
    checkAndRecord(sb as unknown as never, {
      functionName: "sync-mailerlite-tuesday",
      clientIp: "1.2.3.4",
      maxPerWindow: 5,
      windowSeconds: 60,
    })
  );
});

Deno.test("checkAndRecord: insert error → throws", async () => {
  const sb = new FakeSupabase(0);
  sb.insertError = { message: "boom" };
  await assertRejects(() =>
    checkAndRecord(sb as unknown as never, {
      functionName: "sync-mailerlite-tuesday",
      clientIp: "1.2.3.4",
      maxPerWindow: 5,
      windowSeconds: 60,
    })
  );
});
