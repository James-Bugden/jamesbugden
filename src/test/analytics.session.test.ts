/**
 * Tests for HIR-170: session_id linking and UTM capture
 *
 * Test 1: trackTool() must await initSession() so tool_completions never get
 *         a null session_id even when the tool fires before session insert completes.
 * Test 2: New session inserts must include UTM params read from the URL.
 * Test 3: Session resume (same tab, UTM email link) must update the row with UTM.
 */

import { describe, it, expect, vi, beforeEach } from "vitest";

// ─── Stable capture arrays (survive vi.resetModules) ───────────────────────
const captured = {
  sessionInserts: [] as Record<string, unknown>[],
  toolInserts: [] as Record<string, unknown>[],
  sessionUpdates: [] as Record<string, unknown>[],
};

// ─── Supabase mock ─────────────────────────────────────────────────────────
vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    auth: {
      getUser: () => Promise.resolve({ data: { user: null } }),
    },
    from: (table: string) => {
      if (table === "sessions") {
        return {
          insert: (data: Record<string, unknown>) => {
            captured.sessionInserts.push(data);
            return {
              select: () => ({
                single: () =>
                  Promise.resolve({
                    data: { id: "mock-session-id" },
                    error: null,
                  }),
              }),
            };
          },
          update: (data: Record<string, unknown>) => {
            captured.sessionUpdates.push(data);
            return { eq: () => Promise.resolve({ error: null }) };
          },
        };
      }
      if (table === "tool_completions") {
        return {
          insert: (data: Record<string, unknown>) => {
            captured.toolInserts.push(data);
            return Promise.resolve({ error: null });
          },
        };
      }
      return { insert: () => Promise.resolve({ error: null }) };
    },
  },
}));

vi.mock("@/lib/analytics/anonId", () => ({
  getAnonId: () => "test-anon-id",
}));

// ─── Helpers ───────────────────────────────────────────────────────────────

function setLocationSearch(search: string) {
  Object.defineProperty(window, "location", {
    configurable: true,
    writable: true,
    value: {
      search,
      pathname: "/tools",
      href: `https://jamesbugden.com/tools${search}`,
    },
  });
}

beforeEach(() => {
  captured.sessionInserts.length = 0;
  captured.toolInserts.length = 0;
  captured.sessionUpdates.length = 0;
  vi.resetModules();
  sessionStorage.clear();
  localStorage.clear();
  setLocationSearch("");
});

// ─── Test 1: Fix 1 — session_id race condition ─────────────────────────────

describe("trackTool session_id linking (Fix 1)", () => {
  it(
    "tool_completion has session_id even when trackTool fires before session insert resolves",
    async () => {
      // Fresh module instances (no cached session state)
      const { initSession } = await import("@/lib/analytics/session");
      const { trackTool } = await import("@/lib/analytics/index");

      // Start session init but do not await — simulates the race condition
      // where a user triggers a tool action while the session insert is in flight
      initSession();

      // Immediately call trackTool (session not yet in sessionStorage / memory)
      await trackTool("resume_analyzer", "analysis_run", { score: 80 });

      const toolInsert = captured.toolInserts[0];
      expect(toolInsert).toBeDefined();

      // Without fix: getSessionId() returns null synchronously → session_id: null
      // With fix: trackTool awaits initSession() → session_id: 'mock-session-id'
      expect(toolInsert.session_id).toBe("mock-session-id");
    }
  );
});

// ─── Test 2: UTM in new session (should already pass) ─────────────────────

describe("UTM capture — new session (Fix 2a)", () => {
  it("new session insert includes utm_source / utm_medium / utm_campaign", async () => {
    setLocationSearch(
      "?utm_source=mailerlite&utm_medium=email&utm_campaign=welcome-drip"
    );

    const { initSession } = await import("@/lib/analytics/session");
    await initSession();

    const sessionInsert = captured.sessionInserts[0];
    expect(sessionInsert).toBeDefined();
    expect(sessionInsert.utm_source).toBe("mailerlite");
    expect(sessionInsert.utm_medium).toBe("email");
    expect(sessionInsert.utm_campaign).toBe("welcome-drip");
  });
});

// ─── Test 3: UTM on session resume (Fix 2b) ───────────────────────────────

describe("UTM capture — session resume (Fix 2b)", () => {
  it(
    "resumed session is updated with UTM params when user arrives via UTM link",
    async () => {
      // Existing valid session in sessionStorage (< 30 min inactivity)
      sessionStorage.setItem("jb_session_id", "existing-session-id");
      sessionStorage.setItem(
        "jb_session_last_at",
        String(Date.now() - 60_000) // 1 min ago
      );

      // User clicks email UTM link — URL now carries UTM params
      setLocationSearch(
        "?utm_source=mailerlite&utm_medium=email&utm_campaign=welcome-drip"
      );

      const { initSession } = await import("@/lib/analytics/session");
      await initSession();

      // Session is resumed — no new row should be inserted
      expect(captured.sessionInserts).toHaveLength(0);

      // The heartbeat update should carry the new UTM values
      const sessionUpdate = captured.sessionUpdates[0];
      expect(sessionUpdate).toBeDefined();

      // Without fix: update only has last_seen_at / pages_viewed / exit_page
      // With fix: update also includes utm_* when UTM params are present
      expect(sessionUpdate.utm_source).toBe("mailerlite");
      expect(sessionUpdate.utm_medium).toBe("email");
      expect(sessionUpdate.utm_campaign).toBe("welcome-drip");
    }
  );
});
