import { ResumeData, DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";
import { CoverLetterData, CoverLetterCustomize, DEFAULT_COVER_LETTER_DATA, DEFAULT_COVER_LETTER_CUSTOMIZE } from "@/components/cover-letter/types";
import { applyTemplatePreset } from "@/components/resume-builder/templatePresets";
import { EXAMPLE_RESUME_EN, EXAMPLE_RESUME_ZH_TW } from "@/lib/exampleResumeData";
import { supabase } from "@/integrations/supabase/client";

export type DocType = "resume" | "cover_letter";

export interface SavedDocument {
  id: string;
  type: DocType;
  name: string;
  data: ResumeData | CoverLetterData;
  settings: CustomizeSettings | CoverLetterCustomize;
  createdAt: string;
  updatedAt: string;
  linkedJobId?: string; // linked to a job application
}

const STORAGE_KEY = "james_careers_documents";

function load(): SavedDocument[] {
  try {
    const s = localStorage.getItem(STORAGE_KEY);
    return s ? JSON.parse(s) : [];
  } catch {
    return [];
  }
}

function save(docs: SavedDocument[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(docs));
}

export function getAllDocuments(): SavedDocument[] {
  return load();
}

export function getDocument(id: string): SavedDocument | undefined {
  return load().find((d) => d.id === id);
}

export function createDocument(type: DocType, name?: string, baseData?: Partial<SavedDocument>): SavedDocument {
  const now = new Date().toISOString();
  const docs = load();
  const count = docs.filter((d) => d.type === type).length + 1;
  const doc: SavedDocument = {
    id: crypto.randomUUID(),
    type,
    name: name || (type === "resume" ? `Resume ${count}` : `Cover Letter ${count}`),
    data: type === "resume" ? { ...DEFAULT_RESUME_DATA } : { ...DEFAULT_COVER_LETTER_DATA },
    settings: type === "resume" ? { ...DEFAULT_CUSTOMIZE } : { ...DEFAULT_COVER_LETTER_CUSTOMIZE },
    createdAt: now,
    updatedAt: now,
    ...baseData,
  };
  docs.push(doc);
  save(docs);
  // Fire-and-forget server registration
  registerDocumentOnServer(doc);
  return doc;
}

export function updateDocument(id: string, updates: Partial<SavedDocument>): SavedDocument | undefined {
  const docs = load();
  const idx = docs.findIndex((d) => d.id === id);
  if (idx === -1) return undefined;
  const updatedAt = new Date().toISOString();
  docs[idx] = { ...docs[idx], ...updates, updatedAt };
  save(docs);
  // Fire-and-forget server sync
  updateDocumentOnServer(id, { ...updates, updatedAt });
  return docs[idx];
}

export function duplicateDocument(id: string, newName?: string): SavedDocument | undefined {
  const doc = getDocument(id);
  if (!doc) return undefined;
  return createDocument(doc.type, newName || `${doc.name} (copy)`, {
    data: JSON.parse(JSON.stringify(doc.data)),
    settings: JSON.parse(JSON.stringify(doc.settings)),
  });
}

export function deleteDocument(id: string) {
  save(load().filter((d) => d.id !== id));
  // Fire-and-forget server unregistration
  unregisterDocumentOnServer(id);
}

export function renameDocument(id: string, name: string) {
  updateDocument(id, { name });
}

/**
 * Check the server-side document count before allowing creation.
 * Returns true if under limit, false if at/over limit.
 */
export async function checkServerDocumentLimit(type: DocType): Promise<boolean> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    if (!userId) return true;

    // Admin bypass
    const { data: isAdmin } = await supabase.rpc("is_admin", { _user_id: userId });
    if (isAdmin) return true;

    const { data: count } = await (supabase as any).rpc("count_user_documents", {
      p_user_id: userId,
      p_type: type,
    });
    return (count as number ?? 0) < 2;
  } catch {
    return true;
  }
}

/**
 * Register a document on the server after local creation (with full content).
 */
async function registerDocumentOnServer(doc: SavedDocument): Promise<void> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    if (!userId) return;

    await (supabase as any).from("user_documents").insert({
      id: doc.id,
      user_id: userId,
      type: doc.type,
      name: doc.name,
      data: doc.data,
      settings: doc.settings,
      linked_job_id: doc.linkedJobId || null,
    });
  } catch {
    // Best-effort — document still created locally
  }
}

/**
 * Update a document's content on the server.
 */
async function updateDocumentOnServer(id: string, updates: Partial<SavedDocument> & { updatedAt?: string }): Promise<void> {
  try {
    const serverUpdates: Record<string, unknown> = { updated_at: updates.updatedAt || new Date().toISOString() };
    if (updates.name !== undefined) serverUpdates.name = updates.name;
    if (updates.data !== undefined) serverUpdates.data = updates.data;
    if (updates.settings !== undefined) serverUpdates.settings = updates.settings;
    if (updates.linkedJobId !== undefined) serverUpdates.linked_job_id = updates.linkedJobId;

    await (supabase as any).from("user_documents").update(serverUpdates).eq("id", id);
  } catch {
    // Best-effort
  }
}

/**
 * Remove a document record from the server.
 */
async function unregisterDocumentOnServer(id: string): Promise<void> {
  try {
    await (supabase as any).from("user_documents").delete().eq("id", id);
  } catch {
    // Best-effort
  }
}

/**
 * Fetch all documents from the server for the current user.
 * Returns null if not authenticated or on error.
 */
export async function fetchServerDocuments(): Promise<SavedDocument[] | null> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    if (!sessionData?.session?.user?.id) return null;

    const { data, error } = await (supabase as any)
      .from("user_documents")
      .select("*")
      .order("updated_at", { ascending: false });

    if (error || !data) return null;

    return data.map((row: any) => ({
      id: row.id,
      type: row.type as DocType,
      name: row.name,
      data: row.data,
      settings: row.settings,
      createdAt: row.created_at,
      updatedAt: row.updated_at,
      linkedJobId: row.linked_job_id || undefined,
    }));
  } catch {
    return null;
  }
}

/**
 * Sync local documents to the server on first login.
 * Only uploads if the server has no documents for this user.
 */
export async function syncLocalToServer(): Promise<{ synced: number }> {
  try {
    const { data: sessionData } = await supabase.auth.getSession();
    const userId = sessionData?.session?.user?.id;
    if (!userId) return { synced: 0 };

    // Check if server already has documents
    const { data: existing } = await (supabase as any)
      .from("user_documents")
      .select("id")
      .limit(1);

    if (existing && existing.length > 0) return { synced: 0 };

    // Upload local documents to server
    const localDocs = load();
    if (localDocs.length === 0) return { synced: 0 };

    const rows = localDocs.map((doc) => ({
      id: doc.id,
      user_id: userId,
      type: doc.type,
      name: doc.name,
      data: doc.data,
      settings: doc.settings,
      linked_job_id: doc.linkedJobId || null,
      created_at: doc.createdAt,
      updated_at: doc.updatedAt,
    }));

    const { error } = await (supabase as any).from("user_documents").insert(rows);
    if (error) {
      console.error("Document sync error:", error);
      return { synced: 0 };
    }

    return { synced: rows.length };
  } catch {
    return { synced: 0 };
  }
}

/**
 * Clear all document-related localStorage keys.
 * Called on sign-out and before loading a different user's documents.
 */
export function clearLocalDocuments() {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem("james_careers_resume");
  localStorage.removeItem("james_careers_customize");
  localStorage.removeItem("james_careers_cover_letter");
  localStorage.removeItem("james_careers_cover_letter_customize");
  localStorage.removeItem(SEEDED_KEY);
}

/**
 * Load the current user's documents from the server into localStorage.
 * Returns true if server docs were loaded, false otherwise.
 */
export async function loadFromServer(): Promise<boolean> {
  const serverDocs = await fetchServerDocuments();
  if (!serverDocs || serverDocs.length === 0) return false;
  save(serverDocs);
  return true;
}

// Seed example resume on first visit
const SEEDED_KEY = "james_careers_example_seeded";

export function seedExampleResume(lang?: string) {
  if (localStorage.getItem(SEEDED_KEY)) return;
  const docs = load();
  if (docs.length > 0) {
    localStorage.setItem(SEEDED_KEY, "true");
    return;
  }
  const isZh = lang === "zh-tw" || lang === "zh-TW";
  const data = isZh ? EXAMPLE_RESUME_ZH_TW : EXAMPLE_RESUME_EN;
  const name = isZh ? "範例履歷" : "Example Resume";
  const settings = applyTemplatePreset({ ...DEFAULT_CUSTOMIZE }, "classic");
  createDocument("resume", name, { data: JSON.parse(JSON.stringify(data)), settings });
  localStorage.setItem(SEEDED_KEY, "true");
}

// Migration: if user has legacy single-doc data, import it
export function migrateFromLegacy() {
  const docs = load();
  if (docs.length > 0) return; // already migrated

  const newDocs: SavedDocument[] = [];
  const now = new Date().toISOString();

  // Resume
  try {
    const resumeData = localStorage.getItem("james_careers_resume");
    const resumeSettings = localStorage.getItem("james_careers_customize");
    if (resumeData) {
      newDocs.push({
        id: crypto.randomUUID(),
        type: "resume",
        name: "Resume 1",
        data: { ...DEFAULT_RESUME_DATA, ...JSON.parse(resumeData) },
        settings: resumeSettings ? { ...DEFAULT_CUSTOMIZE, ...JSON.parse(resumeSettings) } : { ...DEFAULT_CUSTOMIZE },
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch {}

  // Cover letter
  try {
    const clData = localStorage.getItem("james_careers_cover_letter");
    const clSettings = localStorage.getItem("james_careers_cover_letter_customize");
    if (clData) {
      newDocs.push({
        id: crypto.randomUUID(),
        type: "cover_letter",
        name: "Cover Letter 1",
        data: { ...DEFAULT_COVER_LETTER_DATA, ...JSON.parse(clData) },
        settings: clSettings ? { ...DEFAULT_COVER_LETTER_CUSTOMIZE, ...JSON.parse(clSettings) } : { ...DEFAULT_COVER_LETTER_CUSTOMIZE },
        createdAt: now,
        updatedAt: now,
      });
    }
  } catch {}

  if (newDocs.length > 0) {
    save(newDocs);
  }
}
