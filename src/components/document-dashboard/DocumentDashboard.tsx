import { useState, useEffect, useRef } from "react";
import { FileText, Mail, Plus, MoreVertical, Pencil, Copy, Trash2, Upload, Briefcase } from "lucide-react";
import { SavedDocument, getAllDocuments, createDocument, deleteDocument, duplicateDocument, renameDocument, migrateFromLegacy, DocType } from "@/lib/documentStore";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

interface DocumentDashboardProps {
  onOpenDocument: (doc: SavedDocument) => void;
  onImport: (type: DocType) => void;
}

export function DocumentDashboard({ onOpenDocument, onImport }: DocumentDashboardProps) {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const navigate = useNavigate();

  const refresh = () => setDocuments(getAllDocuments());

  useEffect(() => {
    migrateFromLegacy();
    refresh();
  }, []);

  const handleCreate = (type: DocType) => {
    const doc = createDocument(type);
    onOpenDocument(doc);
  };

  const handleDuplicate = (id: string) => {
    duplicateDocument(id);
    refresh();
    setMenuOpenId(null);
  };

  const handleDelete = (id: string) => {
    deleteDocument(id);
    refresh();
    setMenuOpenId(null);
  };

  const handleRenameStart = (doc: SavedDocument) => {
    setRenamingId(doc.id);
    setRenameValue(doc.name);
    setMenuOpenId(null);
  };

  const handleRenameConfirm = () => {
    if (renamingId && renameValue.trim()) {
      renameDocument(renamingId, renameValue.trim());
      refresh();
    }
    setRenamingId(null);
  };

  const resumes = documents.filter((d) => d.type === "resume");
  const coverLetters = documents.filter((d) => d.type === "cover_letter");

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const DocCard = ({ doc }: { doc: SavedDocument }) => (
    <div
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer relative group"
      onClick={() => onOpenDocument(doc)}
    >
      {/* Thumbnail placeholder */}
      <div className="aspect-[210/297] bg-gray-50 rounded-lg mb-3 flex items-center justify-center border border-gray-100">
        {doc.type === "resume" ? (
          <FileText className="w-10 h-10 text-gray-300" />
        ) : (
          <Mail className="w-10 h-10 text-gray-300" />
        )}
      </div>

      {/* Name */}
      {renamingId === doc.id ? (
        <input
          autoFocus
          value={renameValue}
          onChange={(e) => setRenameValue(e.target.value)}
          onBlur={handleRenameConfirm}
          onKeyDown={(e) => { if (e.key === "Enter") handleRenameConfirm(); if (e.key === "Escape") setRenamingId(null); }}
          onClick={(e) => e.stopPropagation()}
          className="text-sm font-semibold text-gray-900 w-full bg-gray-50 border border-gray-200 rounded px-2 py-1"
        />
      ) : (
        <p className="text-sm font-semibold text-gray-900 truncate">{doc.name}</p>
      )}
      <p className="text-xs text-gray-400 mt-0.5">Edited {formatDate(doc.updatedAt)}</p>

      {/* Menu */}
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <button
          onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === doc.id ? null : doc.id); }}
          className="p-1.5 rounded-lg bg-white/80 hover:bg-gray-100 text-gray-500"
        >
          <MoreVertical className="w-4 h-4" />
        </button>
        {menuOpenId === doc.id && (
          <div className="absolute right-0 top-8 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-10 min-w-[140px]">
            <button onClick={(e) => { e.stopPropagation(); handleRenameStart(doc); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Pencil className="w-3.5 h-3.5" /> Rename
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleDuplicate(doc.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50">
              <Copy className="w-3.5 h-3.5" /> Duplicate
            </button>
            <button onClick={(e) => { e.stopPropagation(); handleDelete(doc.id); }} className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50">
              <Trash2 className="w-3.5 h-3.5" /> Delete
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen" style={{ backgroundColor: "#F5F0E8" }}>
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-gray-900">My Documents</h1>
          <button
            onClick={() => navigate("/jobs")}
            className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <Briefcase className="w-4 h-4" />
            Job Tracker
          </button>
        </div>

        {/* Resumes */}
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <FileText className="w-5 h-5 text-pink-500" />
              Resumes
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {resumes.map((doc) => <DocCard key={doc.id} doc={doc} />)}
            {/* Create buttons */}
            <button
              onClick={() => handleCreate("resume")}
              className="aspect-[210/297] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-pink-300 hover:text-pink-500 transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="text-xs font-semibold">New Resume</span>
            </button>
            <button
              onClick={() => onImport("resume")}
              className="aspect-[210/297] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-blue-300 hover:text-blue-500 transition-colors"
            >
              <Upload className="w-8 h-8" />
              <span className="text-xs font-semibold">Import</span>
            </button>
          </div>
        </section>

        {/* Cover Letters */}
        <section>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              <Mail className="w-5 h-5 text-purple-500" />
              Cover Letters
            </h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {coverLetters.map((doc) => <DocCard key={doc.id} doc={doc} />)}
            <button
              onClick={() => handleCreate("cover_letter")}
              className="aspect-[210/297] rounded-xl border-2 border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-purple-300 hover:text-purple-500 transition-colors"
            >
              <Plus className="w-8 h-8" />
              <span className="text-xs font-semibold">New Cover Letter</span>
            </button>
          </div>
        </section>
      </div>
    </div>
  );
}
