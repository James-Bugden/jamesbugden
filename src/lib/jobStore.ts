export type JobStage = "wishlist" | "applied" | "interview" | "offer" | "rejected";

export interface JobApplication {
  id: string;
  title: string;
  company: string;
  location: string;
  stage: JobStage;
  url: string;
  salary: string;
  notes: string;
  linkedDocIds: string[]; // document IDs
  appliedAt: string | null; // date when moved to "applied"
  createdAt: string;
  updatedAt: string;
}

export const JOB_STAGES: { id: JobStage; label: string; color: string }[] = [
  { id: "wishlist", label: "Bookmarked", color: "#6366f1" },
  { id: "applied", label: "Applied", color: "#0ea5e9" },
  { id: "interview", label: "Interviewing", color: "#f59e0b" },
  { id: "offer", label: "Negotiating", color: "#22c55e" },
  { id: "rejected", label: "Rejected", color: "#ef4444" },
];

const STORAGE_KEY = "james_careers_jobs";
const GOAL_KEY = "james_careers_weekly_goal";

function load(): JobApplication[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function save(jobs: JobApplication[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(jobs));
}

export function getAllJobs(): JobApplication[] {
  return load();
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
    stage: "wishlist",
    url: "",
    salary: "",
    notes: "",
    linkedDocIds: [],
    appliedAt: null,
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  if (job.stage === "applied" && !job.appliedAt) {
    job.appliedAt = now;
  }
  const jobs = load();
  jobs.push(job);
  save(jobs);
  return job;
}

export function updateJob(id: string, updates: Partial<JobApplication>) {
  const jobs = load();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return;
  // Track when moved to applied
  if (updates.stage === "applied" && !jobs[idx].appliedAt) {
    updates.appliedAt = new Date().toISOString();
  }
  jobs[idx] = { ...jobs[idx], ...updates, updatedAt: new Date().toISOString() };
  save(jobs);
  return jobs[idx];
}

export function deleteJob(id: string) {
  save(load().filter((j) => j.id !== id));
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

// Get applications sent this week (Mon-Sun)
export function getWeeklyAppliedCount(): number {
  const jobs = load();
  const now = new Date();
  const day = now.getDay();
  const diff = day === 0 ? 6 : day - 1; // Monday = 0
  const monday = new Date(now);
  monday.setDate(now.getDate() - diff);
  monday.setHours(0, 0, 0, 0);

  return jobs.filter((j) => {
    if (!j.appliedAt) return false;
    return new Date(j.appliedAt) >= monday;
  }).length;
}

// Get week range string
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
