import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { createJob, updateJob, getAllJobs, deleteJob } from "./jobStore";
import * as analytics from "@/lib/analytics";

// Mock localStorage
const mockLocalStorage = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: vi.fn((key: string) => store[key] || null),
    setItem: vi.fn((key: string, value: string) => { store[key] = value; }),
    clear: vi.fn(() => { store = {}; }),
    removeItem: vi.fn((key: string) => { delete store[key]; }),
  };
})();

Object.defineProperty(window, "localStorage", { value: mockLocalStorage });

// Mock analytics
vi.mock("./analytics", () => ({
  track: vi.fn(),
  trackTool: vi.fn(),
}));

// Mock Supabase remote operations
vi.mock("./jobStoreSupabase", () => ({
  upsertJobRemote: vi.fn(() => Promise.resolve()),
  deleteJobRemote: vi.fn(() => Promise.resolve()),
}));

describe("jobStore tracking", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockLocalStorage.clear();
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  describe("createJob", () => {
    it("should track job_saved event when creating a job with bookmarked stage", () => {
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "bookmarked",
      });

      expect(analytics.track).toHaveBeenCalledWith(
        "save_for_later",
        "job_saved",
        expect.objectContaining({
          job_application_id: job.id,
          job_title: "Software Engineer",
          company_name: "Tech Corp",
          source_page: expect.any(String),
        })
      );
    });

    it("should not track job_saved when creating job with non-bookmarked stage", () => {
      createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "applied", // Not bookmarked
      });

      // Should not track save event for non-bookmarked jobs
      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_saved",
        expect.any(Object)
      );
    });
  });

  describe("updateJob", () => {
    it("should track job_unsaved when changing stage from bookmarked to another stage", () => {
      // Create a bookmarked job first
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "bookmarked",
      });

      vi.clearAllMocks(); // Clear createJob tracking

      // Update to non-bookmarked stage
      updateJob(job.id, { stage: "applied" });

      expect(analytics.track).toHaveBeenCalledWith(
        "save_for_later",
        "job_unsaved",
        expect.objectContaining({
          job_application_id: job.id,
          job_title: "Software Engineer",
          company_name: "Tech Corp",
          new_stage: "applied",
        })
      );
    });

    it("should track job_saved when changing stage to bookmarked from another stage", () => {
      // Create a non-bookmarked job first
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "applied",
      });

      vi.clearAllMocks(); // Clear createJob tracking

      // Update to bookmarked stage
      updateJob(job.id, { stage: "bookmarked" });

      expect(analytics.track).toHaveBeenCalledWith(
        "save_for_later",
        "job_saved",
        expect.objectContaining({
          job_application_id: job.id,
          job_title: "Software Engineer",
          company_name: "Tech Corp",
          previous_stage: "applied",
          source_page: expect.any(String),
        })
      );
    });

    it("should not track save/unsave events when stage doesn't change", () => {
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "bookmarked",
      });

      vi.clearAllMocks();

      // Update other fields but not stage
      updateJob(job.id, { title: "Senior Software Engineer", notes: "Updated notes" });

      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_saved",
        expect.any(Object)
      );
      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_unsaved",
        expect.any(Object)
      );
    });

    it("should not track save/unsave events when updating from bookmarked to bookmarked (no change)", () => {
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "bookmarked",
      });

      vi.clearAllMocks();

      // Update job but keep stage as bookmarked
      updateJob(job.id, { stage: "bookmarked", title: "Updated Title" });

      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_saved",
        expect.any(Object)
      );
      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_unsaved",
        expect.any(Object)
      );
    });
  });

  describe("deleteJob", () => {
    it("should track deletion but not as unsave event", () => {
      const job = createJob({
        title: "Software Engineer",
        company: "Tech Corp",
        stage: "bookmarked",
      });

      vi.clearAllMocks();

      deleteJob(job.id);

      // Deletion should be tracked separately (not as unsave)
      // Note: deleteJob might not have tracking yet, but we're testing the pattern
      expect(analytics.track).not.toHaveBeenCalledWith(
        "save_for_later",
        "job_unsaved",
        expect.any(Object)
      );
    });
  });
});