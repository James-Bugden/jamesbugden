import { describe, it, expect, beforeEach, vi } from "vitest";

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(global, "localStorage", { value: localStorageMock });

// Mock crypto.randomUUID
Object.defineProperty(global, "crypto", {
  value: {
    randomUUID: () => `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
  },
});

import {
  createDocument,
  getDocument,
  getAllDocuments,
  updateDocument,
  deleteDocument,
  renameDocument,
  duplicateDocument,
} from "@/lib/documentStore";

describe("Document Store", () => {
  beforeEach(() => {
    localStorageMock.clear();
  });

  // ─── Create ───────────────────────────────────────────

  it("creates a resume document with default data", () => {
    const doc = createDocument("resume", "My Resume");
    expect(doc.id).toBeTruthy();
    expect(doc.type).toBe("resume");
    expect(doc.name).toBe("My Resume");
    expect(doc.createdAt).toBeTruthy();
    expect(doc.updatedAt).toBeTruthy();
  });

  it("creates a cover letter document", () => {
    const doc = createDocument("cover_letter", "My Letter");
    expect(doc.type).toBe("cover_letter");
    expect(doc.name).toBe("My Letter");
  });

  it("auto-generates name if not provided", () => {
    const doc = createDocument("resume");
    expect(doc.name).toMatch(/Resume \d+/);
  });

  it("increments auto name based on existing count", () => {
    createDocument("resume");
    const doc2 = createDocument("resume");
    expect(doc2.name).toBe("Resume 2");
  });

  it("persists to localStorage", () => {
    createDocument("resume", "Persistent");
    const stored = JSON.parse(localStorageMock.getItem("james_careers_documents")!);
    expect(stored).toHaveLength(1);
    expect(stored[0].name).toBe("Persistent");
  });

  // ─── Read ─────────────────────────────────────────────

  it("getDocument finds by id", () => {
    const created = createDocument("resume", "Findable");
    const found = getDocument(created.id);
    expect(found).toBeDefined();
    expect(found!.name).toBe("Findable");
  });

  it("getDocument returns undefined for non-existent id", () => {
    const found = getDocument("nonexistent-id");
    expect(found).toBeUndefined();
  });

  it("getAllDocuments returns all", () => {
    createDocument("resume", "A");
    createDocument("resume", "B");
    createDocument("cover_letter", "C");
    const all = getAllDocuments();
    expect(all).toHaveLength(3);
  });

  // ─── Update ───────────────────────────────────────────

  it("updateDocument changes fields", () => {
    const doc = createDocument("resume", "Original");
    const updated = updateDocument(doc.id, { name: "Updated" });
    expect(updated).toBeDefined();
    expect(updated!.name).toBe("Updated");
    // updatedAt is refreshed (may be same ms in fast tests, just check it exists)
    expect(updated!.updatedAt).toBeTruthy();
  });

  it("updateDocument returns undefined for non-existent id", () => {
    const result = updateDocument("fake-id", { name: "Nope" });
    expect(result).toBeUndefined();
  });

  // ─── Rename ───────────────────────────────────────────

  it("renameDocument changes the name", () => {
    const doc = createDocument("resume", "Old Name");
    renameDocument(doc.id, "New Name");
    const found = getDocument(doc.id);
    expect(found!.name).toBe("New Name");
  });

  // ─── Delete ───────────────────────────────────────────

  it("deleteDocument removes from store", () => {
    const doc = createDocument("resume", "Deletable");
    expect(getAllDocuments()).toHaveLength(1);
    deleteDocument(doc.id);
    expect(getAllDocuments()).toHaveLength(0);
  });

  it("deleteDocument is idempotent for non-existent id", () => {
    createDocument("resume", "A");
    deleteDocument("fake-id");
    expect(getAllDocuments()).toHaveLength(1);
  });

  // ─── Duplicate ────────────────────────────────────────

  it("duplicateDocument creates a deep copy", () => {
    const doc = createDocument("resume", "Original");
    const dupe = duplicateDocument(doc.id);
    expect(dupe).toBeDefined();
    expect(dupe!.id).not.toBe(doc.id);
    expect(dupe!.name).toBe("Original (copy)");
    expect(getAllDocuments()).toHaveLength(2);
  });

  it("duplicateDocument with custom name", () => {
    const doc = createDocument("resume", "Original");
    const dupe = duplicateDocument(doc.id, "My Copy");
    expect(dupe!.name).toBe("My Copy");
  });

  it("duplicateDocument returns undefined for non-existent id", () => {
    const result = duplicateDocument("fake-id");
    expect(result).toBeUndefined();
  });

  it("duplicated document data is independent (deep copy)", () => {
    const doc = createDocument("resume", "Original");
    const dupe = duplicateDocument(doc.id)!;

    // Modifying the duplicate shouldn't affect original
    updateDocument(dupe.id, { name: "Changed Copy" });
    const original = getDocument(doc.id)!;
    expect(original.name).toBe("Original");
  });

  // ─── Edge cases ───────────────────────────────────────

  it("handles corrupted localStorage gracefully", () => {
    localStorageMock.setItem("james_careers_documents", "not valid json{{{");
    const docs = getAllDocuments();
    expect(docs).toEqual([]);
  });

  it("handles empty localStorage", () => {
    const docs = getAllDocuments();
    expect(docs).toEqual([]);
  });
});
