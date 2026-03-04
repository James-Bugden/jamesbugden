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

/* ── Brand colors ─────────────────────────────────────────── */
const BRAND = {
  green: "#2b4734",
  greenHover: "#1f3a28",
  greenLight: "#e8f0eb",
  greenLighter: "#f2f7f4",
  gold: "#D4930D",
  cream: "#FDFBF7",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  border: "#e5e7eb",
};

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

  useEffect(() => {
    if (!menuOpenId) return;
    const handler = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('[data-menu-container]')) {
        setMenuOpenId(null);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [menuOpenId]);

  const handleCreateFromTemplate = (templateId: string) => {
    const appliedSettings = applyTemplatePreset(DEFAULT_CUSTOMIZE, templateId);
    const sampleData = {
      personalDetails: {
        fullName: "Alex Chen",
        professionalTitle: "Software Engineer",
        email: "alex.chen@email.com",
        phone: "+1 (555) 123-4567",
        location: "San Francisco, CA",
        photo: "",
        extras: [{ id: "1", type: "LinkedIn", value: "linkedin.com/in/alexchen" }],
      },
      sections: [
        {
          id: crypto.randomUUID(),
          type: "experience",
          title: "Professional Experience",
          collapsed: false,
          entries: [
            {
              id: crypto.randomUUID(),
              fields: {
                position: "Senior Software Engineer",
                company: "TechCorp Inc.",
                location: "San Francisco, CA",
                startMonth: "March", startYear: "2022",
                endMonth: "", endYear: "", currentlyHere: "true",
                description: "<ul><li>Led development of a microservices architecture serving 2M+ daily active users</li><li>Mentored a team of 4 junior engineers</li></ul>",
              },
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          type: "education",
          title: "Education",
          collapsed: false,
          entries: [
            {
              id: crypto.randomUUID(),
              fields: {
                degree: "B.S. Computer Science",
                institution: "University of California, Berkeley",
                location: "Berkeley, CA",
                startMonth: "August", startYear: "2016",
                endMonth: "May", endYear: "2020",
                currentlyHere: "",
                description: "GPA: 3.8/4.0 · Dean's List",
              },
            },
          ],
        },
        {
          id: crypto.randomUUID(),
          type: "skills",
          title: "Skills",
          collapsed: false,
          entries: [{ id: crypto.randomUUID(), fields: { skills: "TypeScript, React, Node.js, Python, PostgreSQL, Docker, AWS" } }],
        },
      ],
    };
    const doc = createDocument("resume", undefined, {
      data: sampleData,
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
      className="group bg-white rounded-lg cursor-pointer relative hover:shadow-md transition-shadow duration-200"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
      onClick={() => onOpenDocument(doc)}
    >
      <div className="aspect-[210/297] relative overflow-hidden" style={{ backgroundColor: BRAND.cream }}>
        <ResumeThumbnail data={doc.data as ResumeData} settings={doc.settings as CustomizeSettings} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDocument(doc); }}
            className="flex items-center gap-2 text-white text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-colors"
          >
            View Resume <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDuplicate(doc.id); }}
            className="flex items-center gap-2 text-white/90 text-sm font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors"
          >
            Duplicate <RotateCcw className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5 flex items-start justify-between">
        <div className="min-w-0 flex-1">
          {renamingId === doc.id ? (
            <input
              autoFocus
              value={renameValue}
              onChange={(e) => setRenameValue(e.target.value)}
              onBlur={handleRenameConfirm}
              onKeyDown={(e) => { if (e.key === "Enter") handleRenameConfirm(); if (e.key === "Escape") setRenamingId(null); }}
              onClick={(e) => e.stopPropagation()}
              className="text-[13px] font-semibold w-full bg-gray-50 border rounded px-1.5 py-0.5 outline-none"
              style={{ color: BRAND.text, borderColor: BRAND.border }}
            />
          ) : (
            <p className="text-[13px] font-semibold truncate" style={{ color: BRAND.text }}>{doc.name}</p>
          )}
          <p className="text-[11px] mt-0.5" style={{ color: BRAND.textSecondary }}>
            edited {formatDate(doc.updatedAt)} · {pageSize(doc.settings)}
          </p>
        </div>
        <div className="relative flex-shrink-0 ml-1" data-menu-container>
          <button
            onClick={(e) => { e.stopPropagation(); setMenuOpenId(menuOpenId === doc.id ? null : doc.id); }}
            className="p-1 rounded-md hover:bg-gray-100 transition-colors"
            style={{ color: BRAND.textSecondary }}
          >
            <MoreVertical className="w-4 h-4" />
          </button>
          {menuOpenId === doc.id && (
            <div className="absolute right-0 top-7 bg-white rounded-lg shadow-lg border py-1 z-20 min-w-[130px]" style={{ borderColor: BRAND.border }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleRenameStart(doc)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] hover:bg-gray-50" style={{ color: BRAND.text }}>
                <Pencil className="w-3 h-3" /> Rename
              </button>
              <button onClick={() => handleDuplicate(doc.id)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] hover:bg-gray-50" style={{ color: BRAND.text }}>
                <Copy className="w-3 h-3" /> Duplicate
              </button>
              <button onClick={() => handleDelete(doc.id)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-red-600 hover:bg-red-50">
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
      className="group bg-white rounded-lg overflow-hidden cursor-pointer relative hover:shadow-md transition-shadow duration-200"
      style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08)" }}
      onClick={() => onOpenDocument(doc)}
    >
      <div className="aspect-[210/297] flex items-center justify-center relative" style={{ backgroundColor: BRAND.cream }}>
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
        <p className="text-[13px] font-semibold truncate" style={{ color: BRAND.text }}>{doc.name}</p>
        <p className="text-[11px] mt-0.5" style={{ color: BRAND.textSecondary }}>edited {formatDate(doc.updatedAt)}</p>
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
    <div className="h-screen flex" style={{ backgroundColor: BRAND.cream }}>
      {/* ── Left Sidebar ──────────────────────────── */}
      <aside className="w-[200px] flex-shrink-0 bg-white border-r flex flex-col h-full" style={{ borderColor: BRAND.border }}>
        <div className="px-5 pt-5 pb-4">
          <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="inline-flex items-baseline gap-0.5">
            <span className="text-[18px] font-bold tracking-tight" style={{ fontFamily: "'Source Sans 3', sans-serif", color: BRAND.text }}>james</span>
            <span className="text-[18px] font-bold tracking-tight" style={{ color: BRAND.gold, fontFamily: "'Source Sans 3', sans-serif" }}>.careers</span>
          </a>
        </div>
        <nav className="flex-1 px-2 space-y-0.5">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                if (item.id === "job_tracker") { navigate("/jobs"); return; }
                setActiveTab(item.id);
              }}
              className={cn(
                "w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] font-medium transition-colors",
                activeTab === item.id ? "text-white" : "hover:bg-gray-50"
              )}
              style={
                activeTab === item.id
                  ? { backgroundColor: BRAND.green, color: "#fff" }
                  : { color: BRAND.textSecondary }
              }
            >
              <span className="flex-shrink-0">{item.icon}</span>
              <span className="flex-1 text-left">{item.label}</span>
              {item.count !== undefined && (
                <span className="text-[11px] tabular-nums" style={{ opacity: 0.7 }}>{item.count}</span>
              )}
              {item.id === "job_tracker" && <ChevronRight className="w-3.5 h-3.5 text-gray-300" />}
            </button>
          ))}
        </nav>
        <div className="px-2 pb-4">
          <div className="border-t pt-3" style={{ borderColor: BRAND.border }}>
            <button className="w-full flex items-center gap-2.5 px-3 py-2 rounded-md text-[13px] hover:bg-gray-50 transition-colors" style={{ color: BRAND.textSecondary }}>
              <div className="w-6 h-6 rounded-full bg-gray-200 flex items-center justify-center flex-shrink-0">
                <User className="w-3.5 h-3.5" style={{ color: BRAND.textSecondary }} />
              </div>
              <span className="font-medium">My account</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[960px] mx-auto px-8 py-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-[22px] font-bold" style={{ fontFamily: "'Source Sans 3', sans-serif", color: BRAND.text }}>{mainTitle}</h1>
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: BRAND.textSecondary }} />
                <input
                  type="text"
                  placeholder="Search…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-[12px] bg-white border rounded-md w-[160px] focus:outline-none placeholder-gray-400"
                  style={{ borderColor: BRAND.border, color: BRAND.text }}
                />
              </div>
            </div>
          </div>

          {activeTab === "resume" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* New resume */}
              <button
                onClick={() => handleCreate("resume")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 transition-colors bg-white/60 hover:bg-white"
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
              >
                <Plus className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">New resume</span>
              </button>

              {/* Import */}
              <button
                onClick={() => onImport("resume")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-3 transition-colors bg-white/60 hover:bg-white"
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
              >
                <Upload className="w-7 h-7" strokeWidth={1.5} />
                <div className="text-center">
                  <span className="text-[12px] font-medium block">Import</span>
                  <span className="text-[10px] mt-0.5 block" style={{ color: BRAND.textSecondary }}>Upload your existing CV</span>
                </div>
              </button>

              {filteredResumes.map((doc) => (
                <ResumeCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {activeTab === "cover_letter" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              <button
                onClick={() => handleCreate("cover_letter")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 transition-colors bg-white/60 hover:bg-white"
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
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
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.greenLight }}>
                <FileText className="w-10 h-10" style={{ color: BRAND.green }} />
              </div>
              <p className="text-lg font-semibold mb-1" style={{ color: BRAND.text }}>Create your first resume</p>
              <p className="text-sm mb-6" style={{ color: BRAND.textSecondary }}>Start from scratch or import an existing CV</p>
              <div className="flex items-center justify-center gap-3">
                <button
                  onClick={() => handleCreate("resume")}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: BRAND.green }}
                >
                  Create Resume
                </button>
                <button
                  onClick={() => onImport("resume")}
                  className="px-5 py-2.5 rounded-lg text-sm font-semibold border bg-white hover:opacity-80 transition-colors"
                  style={{ color: BRAND.green, borderColor: BRAND.green }}
                >
                  Import Existing CV
                </button>
              </div>
            </div>
          )}

          {activeTab === "cover_letter" && filteredCoverLetters.length === 0 && (
            <div className="text-center py-16 mt-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.greenLight }}>
                <Mail className="w-10 h-10" style={{ color: BRAND.green }} />
              </div>
              <p className="text-lg font-semibold mb-1" style={{ color: BRAND.text }}>No cover letters yet</p>
              <p className="text-sm" style={{ color: BRAND.textSecondary }}>Create your first cover letter to get started</p>
            </div>
          )}
        </div>
      </main>

      <TemplateGalleryModal
        open={templateModalOpen}
        onClose={() => setTemplateModalOpen(false)}
        selected=""
        onSelect={handleCreateFromTemplate}
      />
    </div>
  );
}
