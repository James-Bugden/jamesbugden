import { ResumeData, DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";
import { CoverLetterData, CoverLetterCustomize, DEFAULT_COVER_LETTER_DATA, DEFAULT_COVER_LETTER_CUSTOMIZE } from "@/components/cover-letter/types";

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
  return doc;
}

export function updateDocument(id: string, updates: Partial<SavedDocument>): SavedDocument | undefined {
  const docs = load();
  const idx = docs.findIndex((d) => d.id === id);
  if (idx === -1) return undefined;
  docs[idx] = { ...docs[idx], ...updates, updatedAt: new Date().toISOString() };
  save(docs);
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
}

export function renameDocument(id: string, name: string) {
  updateDocument(id, { name });
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
