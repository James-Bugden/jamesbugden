export type JobStage =
  | "bookmarked"
  | "applying"
  | "applied"
  | "interviewing"
  | "negotiating"
  | "accepted"
  // Archive states
  | "withdrawn"
  | "not_selected"
  | "no_response";

export interface JobContact {
  id: string;
  name: string;
  email: string;
  role: string;
  company: string;
  notes: string;
}

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  stage: JobStage;
  url: string;
  minSalary: string;
  maxSalary: string;
  notes: string;
  jobDescription: string;
  excitement: number; // 0-5 stars
  linkedDocIds: string[];
  contacts: JobContact[];
  checklist: Record<string, boolean>; // checklistItemId -> completed
  dateSaved: string;
  dateApplied: string | null;
  followUpDate: string | null;
  deadline: string | null;
  appliedAt: string | null; // kept for weekly goal tracking
  createdAt: string;
  updatedAt: string;
}

export const ACTIVE_STAGES: { id: JobStage; label: string; color: string }[] = [
  { id: "bookmarked", label: "Bookmarked", color: "#6366f1" },
  { id: "applying", label: "Applying", color: "#8b5cf6" },
  { id: "applied", label: "Applied", color: "#0ea5e9" },
  { id: "interviewing", label: "Interviewing", color: "#f59e0b" },
  { id: "negotiating", label: "Negotiating", color: "#22c55e" },
  { id: "accepted", label: "Accepted", color: "#10b981" },
];

export const ARCHIVE_STAGES: { id: JobStage; label: string; color: string }[] = [
  { id: "withdrawn", label: "Withdrawn", color: "#9CA3AF" },
  { id: "not_selected", label: "Not Selected", color: "#ef4444" },
  { id: "no_response", label: "No Response", color: "#6B7280" },
];

export const JOB_STAGES = [...ACTIVE_STAGES, ...ARCHIVE_STAGES];

// Stage-specific checklists (like Teal's Guidance)
export const STAGE_CHECKLISTS: Record<string, { id: string; label: string }[]> = {
  bookmarked: [
    { id: "review_jd", label: "Review the job description" },
    { id: "check_fit", label: "Assess if the role is a good fit" },
    { id: "research_company", label: "Research the company" },
  ],
  applying: [
    { id: "find_hiring_mgr", label: "Find the hiring manager for the role" },
    { id: "find_contact", label: "Find a contact at this company" },
    { id: "get_referral", label: "Get a referral into the company" },
    { id: "tailor_resume", label: "Tailor your resume with highlighted keywords" },
    { id: "submit_app", label: "Submit online application" },
  ],
  applied: [
    { id: "send_note", label: "Send note to hiring manager" },
    { id: "follow_up_5d", label: "Follow up in 5 days if you have not heard back" },
  ],
  interviewing: [
    { id: "research_prepare", label: "Research & prepare" },
    { id: "practice_interviewing", label: "Practice interviewing" },
    { id: "test_tech", label: "Test your tech (virtual only)" },
    { id: "follow_up", label: "Send follow-up / thank you email" },
  ],
  negotiating: [
    { id: "evaluate_offer", label: "Evaluate the full compensation package" },
    { id: "research_market", label: "Research market rates" },
    { id: "prepare_counter", label: "Prepare your counteroffer" },
    { id: "negotiate", label: "Negotiate terms" },
  ],
  accepted: [
    { id: "sign_offer", label: "Sign the offer letter" },
    { id: "notify_others", label: "Notify other companies" },
    { id: "prepare_start", label: "Prepare for your start date" },
  ],
};

import { upsertJobRemote, deleteJobRemote } from "./jobStoreSupabase";
import { trackJobSaved, trackJobUnsaved, trackSaveItemAdded } from "@/lib/analytics";

const STORAGE_KEY = "james_careers_jobs";
const GOAL_KEY = "james_careers_weekly_goal";
const CONTACTS_KEY = "james_careers_job_contacts";

function load(): JobApplication[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    const jobs: JobApplication[] = s ? JSON.parse(s) : [];
    // Migration: add new fields to old jobs
    return jobs.map((j) => ({
      minSalary: "",
      maxSalary: "",
      jobDescription: "",
      excitement: 0,
      contacts: [],
      checklist: {},
      dateSaved: j.createdAt,
      dateApplied: null,
      followUpDate: null,
      deadline: null,
      appliedAt: null,
      ...j,
      // Migrate old stages
      stage: migrateStage(j.stage),
    }));
  } catch {
    return [];
  }
}

function migrateStage(stage: string): JobStage {
  const map: Record<string, JobStage> = {
    wishlist: "bookmarked",
    interview: "interviewing",
    offer: "negotiating",
    rejected: "not_selected",
  };
  return (map[stage] || stage) as JobStage;
}

function save(jobs: JobApplication[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function getAllJobs(): JobApplication[] {
  return load();
}

export function getActiveJobs(): JobApplication[] {
  const archiveIds = ARCHIVE_STAGES.map((s) => s.id);
  return load().filter((j) => !archiveIds.includes(j.stage));
}

export function getArchivedJobs(): JobApplication[] {
  const archiveIds = ARCHIVE_STAGES.map((s) => s.id);
  return load().filter((j) => archiveIds.includes(j.stage));
}

export function getJob(id: string): JobApplication | undefined {
  return load().find((j) => j.id === id);
}

export function createJob(data: Partial<JobApplication>): JobApplication {
  const now = new Date().toISOString();
  const job: JobApplication = {
    id: crypto.randomUUID(),
    title: "",
    company: "",
    location: "",
    stage: "bookmarked",
    url: "",
    minSalary: "",
    maxSalary: "",
    notes: "",
    jobDescription: "",
    excitement: 0,
    linkedDocIds: [],
    contacts: [],
    checklist: {},
    dateSaved: now,
    dateApplied: null,
    followUpDate: null,
    deadline: null,
    appliedAt: null,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  if (job.stage === "applied" && !job.appliedAt) {
    job.appliedAt = now;
    job.dateApplied = now;
  }
  const jobs = load();
  jobs.push(job);
  save(jobs);
  upsertJobRemote(job).catch(() => {});
  
  // Track job saved event if stage is bookmarked
  if (job.stage === "bookmarked") {
    trackJobSaved(job.id, job.title, job.company, {
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
    });
    trackSaveItemAdded("job", null, {
      job_id: job.id,
      job_title: job.title,
      company: job.company,
      source_page: typeof window !== "undefined" ? window.location.pathname : "",
    });
  }
  
  return job;
}

export function updateJob(id: string, updates: Partial<JobApplication>) {
  const jobs = load();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return;
  
  const oldJob = jobs[idx];
  const oldStage = oldJob.stage;
  const newStage = updates.stage;
  
  // Track when moved to applied
  if (updates.stage === "applied" && !jobs[idx].appliedAt) {
    updates.appliedAt = new Date().toISOString();
    updates.dateApplied = new Date().toISOString();
  }
  
  jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
  save(jobs);
  upsertJobRemote(jobs[idx]).catch(() => {});
  
  // Track save/unsave events based on stage changes
  if (newStage && newStage !== oldStage) {
    if (oldStage === "bookmarked" && newStage !== "bookmarked") {
      // Job unsaved (unbookmarked)
      trackJobUnsaved(id, jobs[idx].title, jobs[idx].company, {
        new_stage: newStage,
      });
    } else if (newStage === "bookmarked" && oldStage !== "bookmarked") {
      // Job saved (bookmarked)
      trackJobSaved(id, jobs[idx].title, jobs[idx].company, {
        previous_stage: oldStage,
        source_page: typeof window !== "undefined" ? window.location.pathname : "",
      });
      trackSaveItemAdded("job", null, {
        job_id: id,
        job_title: jobs[idx].title,
        company: jobs[idx].company,
        previous_stage: oldStage,
        source_page: typeof window !== "undefined" ? window.location.pathname : "",
      });
    }
  }
  
  return jobs[idx];
}

export function deleteJob(id: string) {
  const jobs = load();
  const job = jobs.find((j) => j.id === id);
  save(jobs.filter((j) => j.id !== id));
  deleteJobRemote(id).catch(() => {});
  if (job) {
    trackJobUnsaved(job.id, job.title, job.company);
  }
}

export function linkDocumentToJob(jobId: string, docId: string) {
  const jobs = load();
  const idx = jobs.findIndex((j) => j.id === jobId);
  if (idx === -1) return;
  if (!jobs[idx].linkedDocIds.includes(docId)) {
    jobs[idx].linkedDocIds.push(docId);
    jobs[idx].updatedAt = new Date().toISOString();
    save(jobs);
  }
}

export function unlinkDocumentFromJob(jobId: string, docId: string) {
  const jobs = load();
  const idx = jobs.findIndex((j) => j.id === jobId);
  if (idx === -1) return;
  jobs[idx].linkedDocIds = jobs[idx].linkedDocIds.filter((d) => d !== docId);
  jobs[idx].updatedAt = new Date().toISOString();
  save(jobs);
}

// Weekly goal
export function getWeeklyGoal(): number {
  try {
    const v = localStorage.getItem(GOAL_KEY);
    return v ? parseInt(v, 10) : 5;
  } catch {
    return 5;
  }
}

export function setWeeklyGoal(goal: number) {
  localStorage.setItem(GOAL_KEY, String(goal));
}

export function getWeeklyAppliedCount(): number {
  const jobs = load();
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);

  return jobs.filter((j) => {
    if (!j.appliedAt) return false;
    return new Date(j.appliedAt) >= monday;
  }).length;
}

export function getWeekRange(): string {
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1;
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  const fmt = (d: Date) => d.toLocaleDateString("en-US", { month: "2-digit", day: "2-digit", year: "numeric" });
  return `${fmt(monday)} - ${fmt(sunday)}`;
}

// CSV Export
export function exportJobsCSV(): string {
  const jobs = load();
  const headers = ["Job Title", "Company", "Location", "Stage", "Min Salary", "Max Salary", "Excitement", "Date Saved", "Date Applied", "Follow-up Date", "Deadline", "URL", "Notes"];
  const rows = jobs.map((j) => [
    j.title, j.company, j.location, j.stage,
    j.minSalary, j.maxSalary, String(j.excitement),
    j.dateSaved ? new Date(j.dateSaved).toLocaleDateString() : "",
    j.dateApplied ? new Date(j.dateApplied).toLocaleDateString() : "",
    j.followUpDate ? new Date(j.followUpDate).toLocaleDateString() : "",
    j.deadline ? new Date(j.deadline).toLocaleDateString() : "",
    j.url, j.notes,
  ]);
  const escape = (s: string) => `"${s.replace(/"/g, '""')}"`;
  return [headers.map(escape).join(","), ...rows.map((r) => r.map(escape).join(","))].join("\n");
}

export function downloadCSV() {
  const csv = exportJobsCSV();
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `job-tracker-${new Date().toISOString().slice(0, 10)}.csv`;
  a.click();
  URL.revokeObjectURL(url);
}
