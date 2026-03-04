import { useState, useEffect } from "react";
import {
  FileText,
  Mail,
  Plus,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  Upload,
  Briefcase,
  Search,
  ArrowRight,
  RotateCcw,
  User,
  ChevronRight,
} from "lucide-react";
import {
  SavedDocument,
  getAllDocuments,
  createDocument,
  deleteDocument,
  duplicateDocument,
  renameDocument,
  migrateFromLegacy,
  DocType,
} from "@/lib/documentStore";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { TemplateGalleryModal } from "@/components/resume-builder/TemplateGalleryModal";
import { DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";
import { applyTemplatePreset } from "@/components/resume-builder/templatePresets";
import { ResumeThumbnail } from "@/components/resume-builder/ResumeThumbnail";
import { ResumeData } from "@/components/resume-builder/types";
import { CustomizeSettings } from "@/components/resume-builder/customizeTypes";

interface DocumentDashboardProps {
  onOpenDocument: (doc: SavedDocument) => void;
  onImport: (type: DocType) => void;
}

type SidebarTab = "resume" | "cover_letter" | "job_tracker";

export function DocumentDashboard({ onOpenDocument, onImport }: DocumentDashboardProps) {
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SidebarTab>("resume");
  const navigate = useNavigate();

  const refresh = () => setDocuments(getAllDocuments());

  useEffect(() => {
    migrateFromLegacy();
    refresh();
  }, []);

  // Close menu on click outside
  useEffect(() => {
    if (!menuOpenId) return;
    const handler = () => setMenuOpenId(null);
    window.addEventListener("click", handler);
    return () => window.removeEventListener("click", handler);
  }, [menuOpenId]);

  const handleCreateFromTemplate = (templateId: string) => {
    const appliedSettings = applyTemplatePreset(DEFAULT_CUSTOMIZE, templateId);
    const doc = createDocument("resume", undefined, {
      settings: appliedSettings,
    });
    onOpenDocument(doc);
  };

  const handleCreate = (type: DocType) => {
    if (type === "resume") {
      setTemplateModalOpen(true);
      return;
    }
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

  const filteredResumes = searchQuery
    ? resumes.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : resumes;

  const filteredCoverLetters = searchQuery
    ? coverLetters.filter((d) => d.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : coverLetters;

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    const now = new Date();
    const diffMs = now.getTime() - d.getTime();
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);
    if (diffMins < 1) return "Just now";
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffHours < 24) return `${diffHours}h ago`;
    if (diffDays < 7) return `${diffDays}d ago`;
    return d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });
  };

  const pageSize = (settings: any) => {
    if (!settings?.pageFormat) return "A4";
    return settings.pageFormat === "letter" ? "Letter" : "A4";
  };

  /* ── Resume Card ─────────────────────────────── */
  const ResumeCard = ({ doc }: { doc: SavedDocument }) => (
    <div
      className="group bg-white rounded-lg overflow-hidden cursor-pointer relative"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
      onClick={() => onOpenDocument(doc)}
    >
      {/* Thumbnail */}
      <div className="aspect-[210/297] bg-[#fafaf8] relative overflow-hidden">
        <ResumeThumbnail
          data={doc.data as ResumeData}
          settings={doc.settings as CustomizeSettings}
        />

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDocument(doc); }}
            className="flex items-center gap-1.5 text-white text-[11px] font-semibold tracking-wider uppercase hover:underline"
          >
            View Resume <ArrowRight className="w-3 h-3" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDuplicate(doc.id); }}
            className="flex items-center gap-1.5 text-white/80 text-[11px] font-medium tracking-wider uppercase hover:text-white hover:underline"
          >
            Duplicate <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Info footer */}
      <div className="px-3 py-2.5 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          {renamingId === doc.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameConfirm}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleRenameConfirm();
                if (e.key === "Escape") setRenamingId(null);
              }}
              onClick={(e) => e.stopPropagation()}
              className="text-[13px] font-semibold text-gray-900 w-full bg-gray-50 border border-gray-200 rounded px-1.5 py-0.5 outline-none focus:border-gray-400"
            />
          ) : (
            <p className="text-[13px] font-semibold text-gray-800 truncate">{doc.name}</p>
          )}
          <p className="text-[11px] text-gray-400 mt-0.5">
            edited {formatDate(doc.updatedAt)} · {pageSize(doc.settings)}
          </p>
        </div>

        {/* Three-dot menu */}
        <div className="relative flex-shrink-0 ml-1">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setMenuOpenId(menuOpenId === doc.id ? null : doc.id);
            }}
            className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpenId === doc.id && (
            <div
              className="absolute right-0 top-7 bg-white rounded-lg shadow-lg border border-gray-100 py-1 z-20 min-w-[130px]"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                onClick={() => handleRenameStart(doc)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                <Pencil className="w-3 h-3" /> Rename
              </button>
              <button
                onClick={() => handleDuplicate(doc.id)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-gray-700 hover:bg-gray-50"
              >
                <Copy className="w-3 h-3" /> Duplicate
              </button>
              <button
                onClick={() => handleDelete(doc.id)}
                className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-red-600 hover:bg-red-50"
              >
                <Trash2 className="w-3 h-3" /> Delete
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  /* ── Cover Letter Card ──────────────────────── */
  const CoverLetterCard = ({ doc }: { doc: SavedDocument }) => (
    <div
      className="group bg-white rounded-lg overflow-hidden cursor-pointer relative"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)" }}
      onClick={() => onOpenDocument(doc)}
    >
      <div className="aspect-[210/297] bg-[#fafaf8] flex items-center justify-center relative">
        <Mail className="w-10 h-10 text-gray-300" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDocument(doc); }}
            className="flex items-center gap-1.5 text-white text-[11px] font-semibold tracking-wider uppercase hover:underline"
          >
            View Letter <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[13px] font-semibold text-gray-800 truncate">{doc.name}</p>
        <p className="text-[11px] text-gray-400 mt-0.5">edited {formatDate(doc.updatedAt)}</p>
      </div>
    </div>
  );

  /* ── Sidebar ──────────────────────────────────── */
  const sidebarItems: { id: SidebarTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "resume", label: "Resume", icon: <FileText className="w-[18px] h-[18px]" />, count: resumes.length },
    { id: "cover_letter", label: "Cover Letter", icon: <Mail className="w-[18px] h-[18px]" />, count: coverLetters.length },
    { id: "job_tracker", label: "Job Tracker", icon: <Briefcase className="w-[18px] h-[18px]" /> },
  ];

  const mainTitle = activeTab === "resume" ? "My Resumes" : activeTab === "cover_letter" ? "My Cover Letters" : "Job Tracker";

  return (
    <div className="h-screen flex bg-[#f5f5f0]">
      {/* ── Left Sidebar ──────────────────────────── */}
      <aside className="w-[200px] flex-shrink-0 bg-white border-r border-gray-100 flex flex-col h-full">
        {/* Brand */}
        <div className="px-5 pt-5 pb-4">
          <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-0.5">
            <span className="text-[18px] font-bold tracking-tight text-gray-900" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              james
            </span>
            <span className="text-[18px] font-bold tracking-tight" style={{ color: "#FF4B6E", fontFamily: "'Source Sans 3', sans-serif" }}>
              .careers
            </span>
          </a>
        </div>

        {/* Nav items */}
        <nav className="flex-1 px-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "job_tracker") {
                  navigate("/jobs");
                  return;
                }
                setActiveTab(item.id);
              }}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
                activeTab === item.id
                  ? "bg-gray-100 text-gray-900"
                  : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
              )}
            >
              <span className={cn(
                "flex-shrink-0",
                activeTab === item.id ? "text-gray-800" : "text-gray-400"
              )}>
                {item.icon}
              </span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-[11px] text-gray-400 tabular-nums">{item.count}</span>
              )}
              {item.id === "job_tracker" && (
                <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
              )}
            </button>
          ))}
        </nav>

        {/* Bottom: Account */}
        <div className="px-2 pb-4">
          <div className="border-t border-gray-100 pt-3">
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] text-gray-500 hover:text-gray-700 hover:bg-gray-50 transition-colors">
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5 text-gray-500" />
              </div>
              <span className="font-medium">My account</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[960px] mx-auto px-8 py-8">
          {/* Header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[22px] font-bold text-gray-900" style={{ fontFamily: "'Source Sans 3', sans-serif" }}>
              {mainTitle}
            </h1>

            <div className="flex items-center gap-2">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-[12px] bg-white border border-gray-200 rounded-md w-[160px] focus:outline-none focus:border-gray-400 placeholder-gray-400"
                />
              </div>
            </div>
          </div>

          {/* ── Resume tab ──────────────────────────── */}
          {activeTab === "resume" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* New resume card */}
              <button
                onClick={() => handleCreate("resume")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors bg-white/60 hover:bg-white"
              >
                <Plus className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">New resume</span>
              </button>

              {/* Import card */}
              <button
                onClick={() => onImport("resume")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors bg-white/60 hover:bg-white"
              >
                <Upload className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">Import</span>
              </button>

              {/* Resume cards */}
              {filteredResumes.map((doc) => (
                <ResumeCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {/* ── Cover letter tab ────────────────────── */}
          {activeTab === "cover_letter" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              <button
                onClick={() => handleCreate("cover_letter")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed border-gray-300 flex flex-col items-center justify-center gap-2 text-gray-400 hover:border-gray-400 hover:text-gray-500 transition-colors bg-white/60 hover:bg-white"
              >
                <Plus className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">New cover letter</span>
              </button>

              {filteredCoverLetters.map((doc) => (
                <CoverLetterCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {/* Empty states */}
          {activeTab === "resume" && filteredResumes.length === 0 && (
            <div className="text-center py-16 mt-4">
              <FileText className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No resumes yet</p>
              <p className="text-xs text-gray-400 mt-1">Create your first resume to get started</p>
            </div>
          )}

          {activeTab === "cover_letter" && filteredCoverLetters.length === 0 && (
            <div className="text-center py-16 mt-4">
              <Mail className="w-10 h-10 text-gray-300 mx-auto mb-3" />
              <p className="text-sm text-gray-500">No cover letters yet</p>
              <p className="text-xs text-gray-400 mt-1">Create your first cover letter to get started</p>
            </div>
          )}
        </div>
      </main>

      {/* Template Gallery Modal */}
      <TemplateGalleryModal
        open={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        selected=""
        onSelect={handleCreateFromTemplate}
      />
    </div>
  );
}
