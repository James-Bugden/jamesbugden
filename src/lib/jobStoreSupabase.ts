/**
 * Supabase persistence layer for the job tracker (HIR-145).
 * Mirrors the documentStore sync pattern: localStorage is the primary local
 * cache; this module handles upload/download against job_applications table.
 *
 * camelCase ↔ snake_case mapping lives here so jobStore.ts stays unchanged.
 */
import { supabase } from "@/integrations/supabase/client";
import type { JobApplication } from "./jobStore";

// ── shape stored in DB ────────────────────────────────────────────────────

interface JobRow {
  id: string;
  user_id: string;
  title: string;
  company: string;
  location: string;
  stage: string;
  url: string;
  min_salary: string;
  max_salary: string;
  notes: string;
  job_description: string;
  excitement: number;
  linked_doc_ids: string[];
  contacts: JobApplication["contacts"];
  checklist: Record<string, boolean>;
  date_saved: string | null;
  date_applied: string | null;
  follow_up_date: string | null;
  deadline: string | null;
  applied_at: string | null;
  created_at: string;
  updated_at: string;
}

function toRow(job: JobApplication, userId: string): Omit<JobRow, "user_id"> & { user_id: string } {
  return {
    id: job.id,
    user_id: userId,
    title: job.title,
    company: job.company,
    location: job.location,
    stage: job.stage,
    url: job.url,
    min_salary: job.minSalary,
    max_salary: job.maxSalary,
    notes: job.notes,
    job_description: job.jobDescription,
    excitement: job.excitement,
    linked_doc_ids: job.linkedDocIds,
    contacts: job.contacts,
    checklist: job.checklist,
    date_saved: job.dateSaved ?? null,
    date_applied: job.dateApplied ?? null,
    follow_up_date: job.followUpDate ?? null,
    deadline: job.deadline ?? null,
    applied_at: job.appliedAt ?? null,
    created_at: job.createdAt,
    updated_at: job.updatedAt,
  };
}

function fromRow(row: JobRow): JobApplication {
  return {
    id: row.id,
    title: row.title,
    company: row.company,
    location: row.location,
    stage: row.stage as JobApplication["stage"],
    url: row.url,
    minSalary: row.min_salary,
    maxSalary: row.max_salary,
    notes: row.notes,
    jobDescription: row.job_description,
    excitement: row.excitement,
    linkedDocIds: row.linked_doc_ids ?? [],
    contacts: row.contacts ?? [],
    checklist: row.checklist ?? {},
    dateSaved: row.date_saved ?? row.created_at,
    dateApplied: row.date_applied,
    followUpDate: row.follow_up_date,
    deadline: row.deadline,
    appliedAt: row.applied_at,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

// ── sync helpers ──────────────────────────────────────────────────────────

async function getUserId(): Promise<string | null> {
  const { data } = await supabase.auth.getSession();
  return data?.session?.user?.id ?? null;
}

/**
 * Upload all local jobs to Supabase on first authenticated login.
 * No-ops if the server already has jobs for this user.
 */
export async function syncJobsToServer(
  localJobs: JobApplication[],
): Promise<{ synced: number; error?: unknown }> {
  try {
    const userId = await getUserId();
    if (!userId) return { synced: 0 };

    const { data: existing } = await (supabase as any)
      .from("job_applications")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) return { synced: 0 };
    if (localJobs.length === 0) return { synced: 0 };

    const rows = localJobs.map((j) => toRow(j, userId));
    const { error } = await (supabase as any).from("job_applications").insert(rows);
    if (error) return { synced: 0, error };
    return { synced: rows.length };
  } catch (err) {
    return { synced: 0, error: err };
  }
}

/**
 * Load the current user's jobs from Supabase and write them to localStorage.
 * Returns true if server jobs were loaded, false otherwise.
 */
export async function loadJobsFromServer(): Promise<boolean> {
  try {
    const userId = await getUserId();
    if (!userId) return false;

    const { data, error } = await (supabase as any)
      .from("job_applications")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data || data.length === 0) return false;
    const jobs = (data as JobRow[]).map(fromRow);
    // Overwrite localStorage with authoritative server data
    localStorage.setItem("james_careers_jobs", JSON.stringify(jobs));
    return true;
  } catch {
    return false;
  }
}

/** Write a single job to Supabase (upsert). Fire-and-forget from callers. */
export async function upsertJobRemote(job: JobApplication): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await (supabase as any)
    .from("job_applications")
    .upsert(toRow(job, userId), { onConflict: "id" });
}

/** Delete a single job from Supabase. Fire-and-forget from callers. */
export async function deleteJobRemote(id: string): Promise<void> {
  const userId = await getUserId();
  if (!userId) return;
  await (supabase as any).from("job_applications").delete().eq("id", id);
}
