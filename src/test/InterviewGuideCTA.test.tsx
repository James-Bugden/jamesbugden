import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";

const trackMock = vi.fn();
vi.mock("@/lib/analytics", () => ({
  track: (...args: unknown[]) => trackMock(...args),
}));

import { InterviewGuideCTA } from "@/components/resume-analyzer/InterviewGuideCTA";

describe("InterviewGuideCTA", () => {
  beforeEach(() => {
    trackMock.mockReset();
  });

  it("links to the EN interview prep guide for lang='en'", () => {
    render(<InterviewGuideCTA lang="en" score={78} seniorityLevel="Senior Software Engineer" />);
    const link = screen.getByRole("link", { name: /interview guide/i });
    expect(link).toHaveAttribute("href", "/interview-preparation-guide");
  });

  it("links to the ZH interview prep guide for lang='zh-TW'", () => {
    render(<InterviewGuideCTA lang="zh-TW" score={78} seniorityLevel="Senior Software Engineer" />);
    const link = screen.getByRole("link", { name: /面試指南/ });
    expect(link).toHaveAttribute("href", "/zh-tw/interview-preparation-guide");
  });

  it("renders the score in the headline", () => {
    render(<InterviewGuideCTA lang="en" score={42} seniorityLevel={null} />);
    expect(screen.getByText(/Your score is 42/)).toBeInTheDocument();
  });

  it("uses a level descriptor in the body when seniority is detected (EN)", () => {
    render(<InterviewGuideCTA lang="en" score={82} seniorityLevel="Senior Software Engineer" />);
    expect(screen.getByText(/senior-level experience/i)).toBeInTheDocument();
  });

  it("uses the ZH level descriptor when seniority is detected (ZH)", () => {
    render(<InterviewGuideCTA lang="zh-TW" score={82} seniorityLevel="Senior Software Engineer" />);
    expect(screen.getByText(/資深經驗/)).toBeInTheDocument();
  });

  it("omits the level clause when seniority is missing or unknown", () => {
    render(<InterviewGuideCTA lang="en" score={50} seniorityLevel={null} />);
    expect(screen.queryByText(/Based on your/i)).not.toBeInTheDocument();
    expect(screen.getByText(/interview guide to prepare/i)).toBeInTheDocument();
  });

  it("fires a cross_tool_cta_click event with score_bucket and destination on click", () => {
    render(<InterviewGuideCTA lang="en" score={82} seniorityLevel="Senior Software Engineer" />);
    const link = screen.getByRole("link", { name: /interview guide/i });
    fireEvent.click(link);
    expect(trackMock).toHaveBeenCalledTimes(1);
    expect(trackMock).toHaveBeenCalledWith(
      "cta_click",
      "cross_tool_cta_click",
      { score_bucket: "75-89", destination: "/interview-preparation-guide" },
    );
  });

  it("buckets a score < 60 as '<60' in the tracked metadata", () => {
    render(<InterviewGuideCTA lang="en" score={45} seniorityLevel={null} />);
    fireEvent.click(screen.getByRole("link", { name: /interview guide/i }));
    expect(trackMock).toHaveBeenCalledWith(
      "cta_click",
      "cross_tool_cta_click",
      { score_bucket: "<60", destination: "/interview-preparation-guide" },
    );
  });
});
