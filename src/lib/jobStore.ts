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
  createdAt: string;
  updatedAt: string;
}

export const JOB_STAGES: { id: JobStage; label: string; color: string }[] = [
  { id: "wishlist", label: "Wishlist", color: "#6366f1" },
  { id: "applied", label: "Applied", color: "#0ea5e9" },
  { id: "interview", label: "Interview", color: "#f59e0b" },
  { id: "offer", label: "Offer", color: "#22c55e" },
  { id: "rejected", label: "Rejected", color: "#ef4444" },
];

const STORAGE_KEY = "james_careers_jobs";

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
    createdAt: now,
    updatedAt: now,
    ...data,
  };
  const jobs = load();
  jobs.push(job);
  save(jobs);
  return job;
}

export function updateJob(id: string, updates: Partial<JobApplication>) {
  const jobs = load();
  const idx = jobs.findIndex((j) => j.id === id);
  if (idx === -1) return;
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
