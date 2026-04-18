import { useState, useEffect, useMemo } from "react";
import { useBuilderAiUsage } from "@/hooks/useBuilderAiUsage";
import { useAnalyzerUsage } from "@/hooks/useAnalyzerUsage";
import { DesignPhilosophy } from "@/components/resume-builder/DesignPhilosophy";
import {
  FileText,
  Mail,
  Plus,
  MoreVertical,
  Pencil,
  Copy,
  Trash2,
  Upload,
  Search,
  ArrowRight,
  RotateCcw,
  User,
  ChevronRight,
  Globe,
  Clock,
  Heart,
  Info,
  BarChart3,
  Home,
} from "lucide-react";
import {
  SavedDocument,
  getAllDocuments,
  onDocumentsUpdated,
  createDocument,
  deleteDocument,
  duplicateDocument,
  renameDocument,
  migrateFromLegacy,
  seedExampleResume,
  DocType,
  checkServerDocumentLimit,
} from "@/lib/documentStore";
import { cn } from "@/lib/utils";
import { useNavigate, Link } from "react-router-dom";
import { useT, useResumeBuilderLang, SAMPLE_RESUME_DATA_ZH_TW } from "@/components/resume-builder/i18n";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import { toast } from "@/hooks/use-toast";

import { TemplateGalleryModal } from "@/components/resume-builder/TemplateGalleryModal";
import { DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";
import { applyTemplatePreset } from "@/components/resume-builder/templatePresets";
import { ResumeThumbnail } from "@/components/resume-builder/ResumeThumbnail";
import { ResumeData } from "@/components/resume-builder/types";
import { resumeDataToText } from "@/lib/resumeDataToText";
import { CustomizeSettings } from "@/components/resume-builder/customizeTypes";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

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
  const t = useT();
  const lang = useResumeBuilderLang();
  const { isLoggedIn } = useAuth();
  const { importCount, importLimit, loading: usageLoading } = useBuilderAiUsage();
  const { used: analyzerUsed, limit: analyzerLimit } = useAnalyzerUsage();

  const daysUntilReset = useMemo(() => {
    const now = new Date();
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
    return Math.ceil((endOfMonth.getTime() - now.getTime()) / 86400000);
  }, []);
  const [documents, setDocuments] = useState<SavedDocument[]>([]);
  const [menuOpenId, setMenuOpenId] = useState<string | null>(null);
  const [renamingId, setRenamingId] = useState<string | null>(null);
  const [renameValue, setRenameValue] = useState("");
  const [templateModalOpen, setTemplateModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState<SidebarTab>("resume");
  const [replacePickerOpen, setReplacePickerOpen] = useState(false);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);
  const [pendingAction, setPendingAction] = useState<null | { type: "create"; templateId?: string } | { type: "import" } | { type: "duplicate"; sourceId: string }>(null);
  const navigate = useNavigate();

  const refresh = () => setDocuments(getAllDocuments());

  useEffect(() => {
    migrateFromLegacy();
    seedExampleResume(lang);
    refresh();
  }, []);

  // Listen for documents saved by OTHER tabs (BroadcastChannel). When
  // another tab renames, duplicates, creates or deletes a resume, we
  // refresh our in-memory list so the dashboard stays in sync without a
  // manual reload. This is half of the BUG-A (multi-tab data loss) fix;
  // the other half is the broadcast on every save in documentStore.ts.
  useEffect(() => {
    const unsubscribe = onDocumentsUpdated(() => {
      refresh();
    });
    return unsubscribe;
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

  const RESUME_LIMIT = 2;

  const openReplacePicker = (action: typeof pendingAction) => {
    setPendingAction(action);
    setReplaceTargetId(resumes[0]?.id || null);
    setReplacePickerOpen(true);
  };

  const handleCreateFromTemplate = (templateId: string) => {
    if (resumeLimitReached) {
      setTemplateModalOpen(false);
      openReplacePicker({ type: "create", templateId });
      return;
    }
    executeCreateFromTemplate(templateId);
  };

  const executeCreateFromTemplate = (templateId: string, deleteId?: string) => {
    if (deleteId) deleteDocument(deleteId);
    const appliedSettings = applyTemplatePreset(DEFAULT_CUSTOMIZE, templateId);
    const sampleData = lang === "zh-tw" ? SAMPLE_RESUME_DATA_ZH_TW : {
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
    // Pass a localized default name so Chinese users get "履歷 2" instead
    // of "Resume 2". The sequence number matches createDocument's internal
    // counting logic (count of existing docs of this type + 1).
    const resumeCount = documents.filter((d) => d.type === "resume").length + 1;
    const localizedName = `${t("defaultResumeNamePrefix")} ${resumeCount}`;
    const doc = createDocument("resume", localizedName, {
      data: sampleData,
      settings: appliedSettings,
    });
    refresh();
    onOpenDocument(doc);
  };

  const handleCreate = async (type: DocType) => {
    if (type === "resume") {
      // Check both local and server-side counts (catches stale state from other tabs)
      const serverAllowed = await checkServerDocumentLimit("resume");
      if (resumeLimitReached || !serverAllowed) {
        openReplacePicker({ type: "create" });
        return;
      }
      setTemplateModalOpen(true);
      return;
    }
    // Localize the default name so it's e.g. "求職信 2" in zh-tw rather
    // than the hardcoded English "Cover Letter 2".
    const sameTypeCount = documents.filter((d) => d.type === type).length + 1;
    const localizedName =
      type === "cover_letter"
        ? `${t("defaultCoverLetterNamePrefix")} ${sameTypeCount}`
        : `${t("defaultResumeNamePrefix")} ${sameTypeCount}`;
    const doc = createDocument(type, localizedName);
    onOpenDocument(doc);
  };

  const handleDuplicate = async (id: string) => {
    const serverAllowed = await checkServerDocumentLimit("resume");
    if (resumeLimitReached || !serverAllowed) {
      openReplacePicker({ type: "duplicate", sourceId: id });
      return;
    }
    duplicateDocument(id);
    refresh();
    setMenuOpenId(null);
  };

  const handleReplaceConfirm = () => {
    if (!replaceTargetId || !pendingAction) return;
    setReplacePickerOpen(false);

    if (pendingAction.type === "create" && pendingAction.templateId) {
      executeCreateFromTemplate(pendingAction.templateId, replaceTargetId);
    } else if (pendingAction.type === "create") {
      // No template selected yet — delete first, then open template picker
      deleteDocument(replaceTargetId);
      refresh();
      setTemplateModalOpen(true);
    } else if (pendingAction.type === "import") {
      deleteDocument(replaceTargetId);
      refresh();
      onImport("resume");
    } else if (pendingAction.type === "duplicate") {
      deleteDocument(replaceTargetId);
      duplicateDocument(pendingAction.sourceId);
      refresh();
    }

    setPendingAction(null);
    setReplaceTargetId(null);
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
  const resumeLimitReached = resumes.length >= RESUME_LIMIT;
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
    if (diffMins < 1) return t("justNow");
    if (diffMins < 60) return `${diffMins}${t("mAgo")}`;
    if (diffHours < 24) return `${diffHours}${t("hAgo")}`;
    if (diffDays < 7) return `${diffDays}${t("dAgo")}`;
    return d.toLocaleDateString(lang === "zh-tw" ? "zh-TW" : "en-GB", { day: "numeric", month: "short", year: "numeric" });
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
      <div className="aspect-[210/297] relative overflow-hidden rounded-t-lg" style={{ backgroundColor: BRAND.cream }}>
        <ResumeThumbnail data={doc.data as ResumeData} settings={doc.settings as CustomizeSettings} />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-200 flex flex-col items-center justify-center gap-3 opacity-0 group-hover:opacity-100">
          <button
            onClick={(e) => { e.stopPropagation(); onOpenDocument(doc); }}
            className="flex items-center gap-2 text-white text-sm font-semibold tracking-wider uppercase bg-white/20 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/30 transition-colors"
          >
            {t("viewResumeAction")} <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); handleDuplicate(doc.id); }}
            className="flex items-center gap-2 text-white/90 text-sm font-medium tracking-wider uppercase bg-white/10 backdrop-blur-sm px-5 py-2.5 rounded-full hover:bg-white/20 transition-colors"
          >
            {t("duplicateAction")} <RotateCcw className="w-4 h-4" />
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
            {t("edited")} {formatDate(doc.updatedAt)} · {pageSize(doc.settings)}
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
            <div className="absolute right-0 top-7 bg-white rounded-lg shadow-lg border py-1 z-20 min-w-[130px] max-w-[calc(100vw-2rem)]" style={{ borderColor: BRAND.border }} onClick={(e) => e.stopPropagation()}>
              <button onClick={() => handleRenameStart(doc)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] hover:bg-gray-50" style={{ color: BRAND.text }}>
                <Pencil className="w-3 h-3" /> {t("renameAction")}
              </button>
              <button onClick={() => handleDuplicate(doc.id)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] hover:bg-gray-50" style={{ color: BRAND.text }}>
                <Copy className="w-3 h-3" /> {t("duplicateAction")}
              </button>
              <button onClick={() => handleDelete(doc.id)} className="w-full flex items-center gap-2 px-3 py-1.5 text-[12px] text-red-600 hover:bg-red-50">
                <Trash2 className="w-3 h-3" /> {t("deleteAction")}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="px-3 pb-2.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            const text = resumeDataToText(doc.data as ResumeData);
            sessionStorage.setItem("analyzer-auto-text", text);
            navigate(lang === "zh-tw" ? "/zh-tw/resume-analyzer" : "/resume-analyzer");
          }}
          className="w-full flex items-center justify-center gap-1.5 text-[12px] font-semibold rounded-full py-1.5 border transition-colors"
          style={{
            color: "hsl(42 52% 56%)",
            borderColor: "hsl(42 52% 56% / 0.4)",
            backgroundColor: "hsl(42 52% 56% / 0.06)",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "hsl(42 52% 56% / 0.15)"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "hsl(42 52% 56% / 0.06)"; }}
        >
          <BarChart3 className="w-3.5 h-3.5" /> {t("analyzeAction")}
        </button>
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
            {t("viewLetter")} <ArrowRight className="w-3 h-3" />
          </button>
        </div>
      </div>
      <div className="px-3 py-2.5">
        <p className="text-[13px] font-semibold truncate" style={{ color: BRAND.text }}>{doc.name}</p>
        <p className="text-[11px] mt-0.5" style={{ color: BRAND.textSecondary }}>{t("edited")} {formatDate(doc.updatedAt)}</p>
      </div>
    </div>
  );

  /* ── Sidebar ──────────────────────────────────── */
  const sidebarItems: { id: SidebarTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: "resume", label: t("resume"), icon: <FileText className="w-[18px] h-[18px]" />, count: resumes.length },
  ];

  const mainTitle = activeTab === "resume" ? t("myResumes") : activeTab === "cover_letter" ? t("myCoverLetters") : t("jobTracker");

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: BRAND.cream }}>
      {/* ── Cream top header (matches Resume Analyzer) ── */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: '#FDFBF7', borderBottom: '1px solid rgba(43,71,52,0.1)' }}>
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-14 px-5">
          <Link to={lang === "zh-tw" ? "/zh-tw" : "/"} className="font-heading text-base md:text-lg font-bold tracking-wide whitespace-nowrap" style={{ color: '#2b4734' }}>
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-2">
            <Link to={lang === "zh-tw" ? "/zh-tw" : "/"} className="text-sm transition-colors hover:opacity-80 hidden sm:inline" style={{ color: '#6B6B6B' }}>
              {lang === "zh-tw" ? "← 首頁" : "← Home"}
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                state={{ from: lang === "zh-tw" ? "/zh-tw/resume" : "/resume" }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: '#2b4734', color: '#FDFBF7' }}
              >
                <LogIn className="w-3.5 h-3.5" />
                {lang === "zh-tw" ? "登入" : "Sign in"}
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to={lang === "zh-tw" ? "/zh-tw/dashboard" : "/dashboard"}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: '#2b4734', color: '#FDFBF7' }}
              >
                {lang === "zh-tw" ? "我的專區" : "Dashboard"}
              </Link>
            )}
            <button
              onClick={() => navigate(lang === "zh-tw" ? "/resume" : "/zh-tw/resume")}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:bg-gold hover:text-white"
              style={{ border: '1px solid #D4930D', color: '#D4930D' }}
            >
              {lang === "zh-tw" ? "EN" : "中文"}
            </button>
          </div>
        </div>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
      <header className="md:hidden px-4 py-3 bg-white border-b space-y-3" style={{ borderColor: BRAND.border }}>
        <div>
          <h1 className="text-[16px] font-bold tracking-tight" style={{ fontFamily: "'Source Sans 3', sans-serif", color: BRAND.text }}>{t("resumeBuilderTitle")}</h1>
          <p className="text-[11px]" style={{ color: BRAND.textSecondary }}>{t("resumeBuilderTagline")}</p>
        </div>
        <DesignPhilosophy />
      </header>

      {/* ── Left Sidebar (hidden on mobile) ───────── */}
      <aside className="hidden md:flex w-[200px] flex-shrink-0 bg-white border-r flex-col h-full overflow-y-auto" style={{ borderColor: BRAND.border }}>
        <div className="px-5 pt-5 pb-2">
          <button
            onClick={() => navigate("/")}
            className="flex items-center gap-1.5 text-[11px] font-medium mb-2 hover:opacity-70 transition-colors"
            style={{ color: BRAND.textSecondary }}
          >
            <Home className="w-3.5 h-3.5" />
            {lang === "zh-tw" ? "回到首頁" : "Back to Home"}
          </button>
          <h1 className="text-[18px] font-bold tracking-tight" style={{ fontFamily: "'Source Sans 3', sans-serif", color: BRAND.text }}>{t("resumeBuilderTitle")}</h1>
          <p className="text-[11px] mt-0.5" style={{ color: BRAND.textSecondary }}>{t("resumeBuilderTagline")}</p>
        </div>
        <nav className="px-2 space-y-0.5 pb-2">
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
        <div className="px-3 py-2">
          <DesignPhilosophy />
        </div>
        <div className="px-2 pb-4 space-y-1">
          <div className="border-t pt-3" style={{ borderColor: BRAND.border }}>
            <button
              onClick={() => navigate(lang === "zh-tw" ? "/resume" : "/zh-tw/resume")}
              className="w-full flex items-center justify-center gap-2 px-3 py-2 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              <Globe className="w-4 h-4" />
              <span>{lang === "zh-tw" ? "English" : "中文"}</span>
            </button>
          </div>
        </div>
      </aside>

      {/* ── Main Content ──────────────────────────── */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-[960px] mx-auto px-4 py-5 md:px-8 md:py-8">
          <div className="flex items-center justify-between mb-5 md:mb-6 gap-3">
            <h1 className="text-[18px] md:text-[22px] font-bold whitespace-nowrap flex items-center gap-2" style={{ fontFamily: "'Source Sans 3', sans-serif", color: BRAND.text }}>
              {mainTitle}
              <span className="text-[10px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full leading-none" style={{ backgroundColor: `${BRAND.gold}20`, color: BRAND.gold }}>Beta</span>
              {activeTab === "resume" && (
                <>
                  <span className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded-full" style={{ backgroundColor: resumeLimitReached ? "rgba(220,38,38,0.08)" : "rgba(43,71,52,0.08)", color: resumeLimitReached ? "#dc2626" : BRAND.green }}>
                    {resumes.length}/{RESUME_LIMIT} {lang === "zh-tw" ? "份履歷" : "resumes"}
                  </span>
                  <span className="text-[11px] font-semibold tabular-nums px-2 py-0.5 rounded-full" style={{ backgroundColor: analyzerUsed >= analyzerLimit ? "rgba(220,38,38,0.08)" : "rgba(43,71,52,0.08)", color: analyzerUsed >= analyzerLimit ? "#dc2626" : BRAND.green }}>
                    {analyzerUsed}/{analyzerLimit} {lang === "zh-tw" ? "次分析" : "analyses"}
                  </span>
                </>
              )}
            </h1>
            <div className="flex items-center gap-2 flex-1 justify-end">
              <div className="relative">
                <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5" style={{ color: BRAND.textSecondary }} />
                <input
                  type="text"
                  placeholder={t("search")}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-[12px] bg-white border rounded-md w-[120px] md:w-[160px] focus:outline-none placeholder-gray-400"
                  style={{ borderColor: BRAND.border, color: BRAND.text }}
                />
              </div>
            </div>
          </div>

          {activeTab === "resume" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5">
              {/* New resume */}
              {/* NOTE: must NOT use `disabled` here — disabled buttons swallow
                  clicks, and the user gets zero feedback that they hit the
                  2-resume limit. Instead, keep the click active and let
                  handleCreate() open the replace-picker AlertDialog. */}
              <button
                onClick={() => handleCreate("resume")}
                aria-disabled={resumeLimitReached}
                className={`aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 transition-colors ${resumeLimitReached ? "opacity-40 bg-gray-50 hover:bg-gray-100" : "bg-white/60 hover:bg-white"}`}
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { if (!resumeLimitReached) { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
              >
                <Plus className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">{t("newResumeAction")}</span>
              </button>

              {/* Import */}
              {/* Same as the New resume button above: do NOT pass `disabled`,
                  so the click handler can show the replace-picker when at
                  the 2-resume limit instead of failing silently. */}
              <button
                onClick={() => { if (resumeLimitReached) { openReplacePicker({ type: "import" }); return; } onImport("resume"); }}
                aria-disabled={resumeLimitReached}
                className={`aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-3 transition-colors ${resumeLimitReached ? "opacity-40 bg-gray-50 hover:bg-gray-100" : "bg-white/60 hover:bg-white"}`}
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { if (!resumeLimitReached) { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; } }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
              >
                <Upload className="w-7 h-7" strokeWidth={1.5} />
                <div className="text-center">
                  <span className="text-[12px] font-medium block">{t("importAction")}</span>
                  <span className="text-[10px] mt-0.5 block" style={{ color: BRAND.textSecondary }}>{t("uploadExistingCvAction")}</span>
                </div>
                {!usageLoading && !resumeLimitReached && (
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full" style={{ backgroundColor: importCount >= importLimit ? "rgba(220,38,38,0.08)" : "rgba(212,147,13,0.1)", color: importCount >= importLimit ? "#dc2626" : "#D4930D" }}>
                    {importCount}/{importLimit} {lang === "zh-tw" ? "已使用" : "used"}
                  </span>
                )}
                {!usageLoading && !resumeLimitReached && (
                  <span className="flex items-center gap-1 text-[10px]" style={{ color: BRAND.textSecondary }}>
                    <Clock className="w-3 h-3" />
                    {t("resetsIn")} {daysUntilReset} {daysUntilReset === 1 ? t("day") : t("days")}
                  </span>
                )}
              </button>

              {filteredResumes.map((doc) => (
                <ResumeCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {/* ── Usage limits explanation ─────────────── */}
          {activeTab === "resume" && (
            <div className="mt-8 rounded-xl p-5 space-y-4" style={{ backgroundColor: "rgba(43,71,52,0.04)", border: "1px solid rgba(43,71,52,0.1)" }}>
              <div className="flex items-start gap-3">
                <Heart className="w-5 h-5 shrink-0 mt-0.5" style={{ color: BRAND.gold }} />
                <div>
                  <p className="text-[13px] font-semibold" style={{ color: BRAND.text }}>{t("usageLimitsTitle")}</p>
                  <p className="text-[12px] mt-1.5 leading-relaxed" style={{ color: BRAND.textSecondary }}>
                    {t("usageLimitsBody")}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-3 ml-8">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white" style={{ border: `1px solid ${BRAND.border}` }}>
                  <span className="text-[13px] font-bold tabular-nums" style={{ color: BRAND.green }}>{RESUME_LIMIT}</span>
                  <span className="text-[11px]" style={{ color: BRAND.textSecondary }}>{t("usageLimitsResumes")}</span>
                </div>
                {!usageLoading && (
                  <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white" style={{ border: `1px solid ${BRAND.border}` }}>
                    <span className="text-[13px] font-bold tabular-nums" style={{ color: BRAND.green }}>{importLimit}</span>
                    <span className="text-[11px]" style={{ color: BRAND.textSecondary }}>{t("usageLimitsImports")}</span>
                  </div>
                )}
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white" style={{ border: `1px solid ${BRAND.border}` }}>
                  <span className="text-[13px] font-bold tabular-nums" style={{ color: BRAND.green }}>{analyzerLimit}</span>
                  <span className="text-[11px]" style={{ color: BRAND.textSecondary }}>{lang === "zh-tw" ? "次分析額度 / 月" : "analyses per month"}</span>
                </div>
              </div>
            </div>
          )}

          {activeTab === "cover_letter" && (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-5">
              <button
                onClick={() => handleCreate("cover_letter")}
                className="aspect-[210/297] rounded-lg border-[1.5px] border-dashed flex flex-col items-center justify-center gap-2 transition-colors bg-white/60 hover:bg-white"
                style={{ borderColor: BRAND.border, color: BRAND.textSecondary }}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = BRAND.green; e.currentTarget.style.color = BRAND.green; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = BRAND.border; e.currentTarget.style.color = BRAND.textSecondary; }}
              >
                <Plus className="w-7 h-7" strokeWidth={1.5} />
                <span className="text-[12px] font-medium">{t("newCoverLetter")}</span>
              </button>
              {filteredCoverLetters.map((doc) => (
                <CoverLetterCard key={doc.id} doc={doc} />
              ))}
            </div>
          )}

          {/* Empty states */}
          {activeTab === "resume" && filteredResumes.length === 0 && (
            <div className="text-center py-16 mt-4">
              {searchQuery ? (
                // Filtered to empty by search — show "no results" messaging
                // instead of the misleading "create your first resume" CTA.
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.greenLight }}>
                    <Search className="w-10 h-10" style={{ color: BRAND.green }} />
                  </div>
                  <p className="text-lg font-semibold mb-1" style={{ color: BRAND.text }}>{t("noSearchResults")}</p>
                  <p className="text-sm mb-6" style={{ color: BRAND.textSecondary }}>{t("trySearchingAgain")}</p>
                  <button
                    onClick={() => setSearchQuery("")}
                    className="px-5 py-2.5 rounded-lg text-sm font-semibold border bg-white hover:opacity-80 transition-colors"
                    style={{ color: BRAND.green, borderColor: BRAND.green }}
                  >
                    {t("clearSearch")}
                  </button>
                </>
              ) : (
                // Truly empty (no resumes at all) — show the create-first CTA.
                <>
                  <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.greenLight }}>
                    <FileText className="w-10 h-10" style={{ color: BRAND.green }} />
                  </div>
                  <p className="text-lg font-semibold mb-1" style={{ color: BRAND.text }}>{t("createYourFirstResume")}</p>
                  <p className="text-sm mb-6" style={{ color: BRAND.textSecondary }}>{t("startFromScratch")}</p>
                  <div className="flex items-center justify-center gap-3">
                    <button
                      onClick={() => handleCreate("resume")}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold text-white transition-opacity hover:opacity-90"
                      style={{ backgroundColor: BRAND.green }}
                    >
                      {t("createResume")}
                    </button>
                    <button
                      onClick={() => onImport("resume")}
                      className="px-5 py-2.5 rounded-lg text-sm font-semibold border bg-white hover:opacity-80 transition-colors"
                      style={{ color: BRAND.green, borderColor: BRAND.green }}
                    >
                      {t("importExistingCv")}
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {activeTab === "cover_letter" && filteredCoverLetters.length === 0 && (
            <div className="text-center py-16 mt-4">
              <div className="w-20 h-20 mx-auto mb-4 rounded-full flex items-center justify-center" style={{ backgroundColor: BRAND.greenLight }}>
                <Mail className="w-10 h-10" style={{ color: BRAND.green }} />
              </div>
              <p className="text-lg font-semibold mb-1" style={{ color: BRAND.text }}>{t("noCoverLettersYet")}</p>
              <p className="text-sm" style={{ color: BRAND.textSecondary }}>{t("createFirstCoverLetter")}</p>
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

      {/* ── Replace Picker Dialog ──────────────────── */}
      <AlertDialog open={replacePickerOpen} onOpenChange={(o) => { if (!o) { setReplacePickerOpen(false); setPendingAction(null); } }}>
        <AlertDialogContent className="max-w-[400px]">
          <AlertDialogHeader>
            <AlertDialogTitle className="text-[16px]">{t("replaceLimitTitle")}</AlertDialogTitle>
            <AlertDialogDescription className="text-[13px]">{t("replaceLimitDesc")}</AlertDialogDescription>
          </AlertDialogHeader>
          <RadioGroup value={replaceTargetId || ""} onValueChange={setReplaceTargetId} className="space-y-2 my-2">
            {resumes.map((doc) => {
              const rd = doc.data as import("@/components/resume-builder/types").ResumeData;
              const personName = rd?.personalDetails?.fullName || "";
              const personTitle = rd?.personalDetails?.professionalTitle || "";
              const subtitle = [personName, personTitle].filter(Boolean).join(" · ");
              return (
                <label key={doc.id} className={cn("flex items-center gap-3 p-3 rounded-lg border cursor-pointer transition-colors", replaceTargetId === doc.id ? "border-primary bg-primary/5" : "border-gray-200 hover:bg-gray-50")}>
                  <RadioGroupItem value={doc.id} />
                  <div className="min-w-0 flex-1">
                    <p className="text-[13px] font-medium truncate">{doc.name}</p>
                    {subtitle && <p className="text-[11px] text-muted-foreground">{subtitle}</p>}
                    <p className="text-[11px] text-muted-foreground">{t("edited")} {formatDate(doc.updatedAt)}</p>
                  </div>
                </label>
              );
            })}
          </RadioGroup>
          <AlertDialogFooter>
            <AlertDialogCancel className="text-[13px]">{lang === "zh-tw" ? "取消" : "Cancel"}</AlertDialogCancel>
            <AlertDialogAction onClick={handleReplaceConfirm} disabled={!replaceTargetId} className="text-[13px]">{t("replaceAndCreate")}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      </div>
    </div>
  );
}
