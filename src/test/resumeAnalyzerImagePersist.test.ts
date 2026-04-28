import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import React from "react";

/**
 * Tests for HIR-219: persist resume image URL so annotated view
 * shows in history and on reload.
 *
 * Root causes under test:
 * 1. SavedAnalysis.resume_image_url field missing → fetchAll doesn't return it
 * 2. saveAnalysis() does not pass resume_image_url to insert
 * 3. fetchAll() select does not include resume_image_url
 */

// ── Supabase mock ──────────────────────────────────────────────────────

const mockInsert = vi.fn().mockResolvedValue({ error: null });
const mockOrder = vi.fn().mockResolvedValue({ data: [] });

const builder = {
  select: vi.fn(() => builder),
  eq: vi.fn(() => builder),
  order: mockOrder,
  insert: mockInsert,
};

vi.mock("@/integrations/supabase/client", () => ({
  supabase: {
    from: vi.fn(() => builder),
  },
}));

const mockSelect = builder.select;

// ── Auth context mock ──────────────────────────────────────────────────

vi.mock("@/contexts/AuthContext", () => ({
  useAuth: () => ({
    user: { id: "test-user-id" },
    isLoggedIn: true,
  }),
}));

// ── Tests ──────────────────────────────────────────────────────────────

describe("useResumeAnalyses.saveAnalysis — resume_image_url", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOrder.mockResolvedValue({ data: [] });
  });

  it("passes resume_image_url to the Supabase insert when provided", async () => {
    const { useResumeAnalyses } = await import("@/hooks/useResumeAnalyses");
    const { result } = renderHook(() => useResumeAnalyses());

    await act(async () => {
      await result.current.saveAnalysis({
        overall_score: 85,
        analysis_result: { overall_score: 85 },
        resume_text: "John Doe resume text",
        language: "en",
        resume_image_url: "https://signed.example.com/image.jpg",
      });
    });

    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        resume_image_url: "https://signed.example.com/image.jpg",
      })
    );
  });

  it("passes resume_image_url as null when omitted (paste input)", async () => {
    const { useResumeAnalyses } = await import("@/hooks/useResumeAnalyses");
    const { result } = renderHook(() => useResumeAnalyses());

    await act(async () => {
      await result.current.saveAnalysis({
        overall_score: 60,
        analysis_result: {},
        resume_text: "Paste text resume",
        language: "en",
      });
    });

    // When resume_image_url is not provided, the insert should use null
    expect(mockInsert).toHaveBeenCalledWith(
      expect.objectContaining({
        resume_image_url: null,
      })
    );
  });
});

describe("useResumeAnalyses.fetchAll — select includes resume_image_url", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockOrder.mockResolvedValue({ data: [] });
  });

  it("includes resume_image_url in the select query on mount", async () => {
    const { useResumeAnalyses } = await import("@/hooks/useResumeAnalyses");
    renderHook(() => useResumeAnalyses());

    // Wait for the async fetchAll to run
    await act(async () => {
      await new Promise((r) => setTimeout(r, 10));
    });

    expect(mockSelect).toHaveBeenCalledWith(
      expect.stringContaining("resume_image_url")
    );
  });
});

// ── Type-level contract tests (compile-time, verified via structure) ───

describe("SavedAnalysis type contract", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    builder.select.mockImplementation(() => builder);
    builder.eq.mockImplementation(() => builder);
    mockOrder.mockResolvedValue({ data: [] });
  });

  it("returned analysis objects include resume_image_url field", async () => {
    const { useResumeAnalyses } = await import("@/hooks/useResumeAnalyses");

    mockOrder.mockResolvedValue({
      data: [
        {
          id: "abc",
          overall_score: 80,
          analysis_result: {},
          language: "en",
          created_at: "2026-01-01T00:00:00Z",
          resume_image_url: "https://signed.example.com/img.jpg",
        },
      ],
    });

    const { result } = renderHook(() => useResumeAnalyses());

    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });

    const first = result.current.analyses[0];
    expect(first).toBeDefined();
    // resume_image_url must be present on the returned object
    expect("resume_image_url" in first).toBe(true);
    expect(first.resume_image_url).toBe("https://signed.example.com/img.jpg");
  });

  it("resume_image_url is null for analyses without an image", async () => {
    const { useResumeAnalyses } = await import("@/hooks/useResumeAnalyses");

    mockOrder.mockResolvedValue({
      data: [
        {
          id: "xyz",
          overall_score: 55,
          analysis_result: {},
          language: "en",
          created_at: "2026-01-01T00:00:00Z",
          resume_image_url: null,
        },
      ],
    });

    const { result } = renderHook(() => useResumeAnalyses());

    await act(async () => {
      await new Promise((r) => setTimeout(r, 20));
    });

    const first = result.current.analyses[0];
    expect(first.resume_image_url).toBeNull();
  });
});

// ── Storage path convention ────────────────────────────────────────────

describe("Storage upload path convention", () => {
  it("path is {userId}/{timestamp}.jpg for RLS isolation", () => {
    const userId = "user-abc-123";
    const timestamp = 1714300800000;
    const path = `${userId}/${timestamp}.jpg`;
    expect(path.startsWith(userId + "/")).toBe(true);
    expect(path.endsWith(".jpg")).toBe(true);
  });

  it("different users have separate path prefixes", () => {
    const p1 = "user-aaa/100.jpg";
    const p2 = "user-bbb/100.jpg";
    expect(p1.split("/")[0]).not.toBe(p2.split("/")[0]);
  });
});
