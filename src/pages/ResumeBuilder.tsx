import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { useSearchParams } from "react-router-dom";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers" ;
import { SortableSectionCard } from "@/components/resume-builder/SortableSectionCard";
import { Plus, Eye, Undo2, Redo2, Check, Loader2, Upload, ArrowLeft, FileText, Palette, Download, MoreVertical, ChevronDown } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { PersonalDetailsCard } from "@/components/resume-builder/PersonalDetailsCard";
import { SectionCard } from "@/components/resume-builder/SectionCard";
import { AddContentModal } from "@/components/resume-builder/AddContentModal";
import { ResumePreview } from "@/components/resume-builder/ResumePreview";
import { CustomizePanel } from "@/components/resume-builder/CustomizePanel";
import { useResumeStore } from "@/components/resume-builder/useResumeStore";
import { SECTION_TYPES, getDefaultFieldsForType, ResumeSection, DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { CoverLetterBuilder } from "@/components/cover-letter/CoverLetterBuilder";
import { DocumentDashboard } from "@/components/document-dashboard/DocumentDashboard";
import { TemplatePickerOverlay } from "@/components/resume-builder/TemplatePickerOverlay";
import { ImportModal } from "@/components/document-dashboard/ImportModal";
import { CompletenessScore } from "@/components/resume-builder/CompletenessScore";
import { AnalyzerCTA } from "@/components/resume-builder/AnalyzerCTA";
import { DesignPhilosophy } from "@/components/resume-builder/DesignPhilosophy";

import { SavedDocument, DocType, updateDocument, getAllDocuments, renameDocument, createDocument, deleteDocument } from "@/lib/documentStore";
import { AlertDialog, AlertDialogContent, AlertDialogHeader, AlertDialogTitle, AlertDialogDescription, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "@/components/ui/alert-dialog";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { useBuilderAiUsage } from "@/hooks/useBuilderAiUsage";
import { applyTemplatePreset } from "@/components/resume-builder/templatePresets";
import { exportResumePdfServer } from "@/lib/serverPdfExport";
import { ResumeExportMetrics } from "@/components/resume-builder/ResumePreview";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FeedbackBox from "@/components/FeedbackBox";
import { useResumeBuilderLang, useT, getLocalizedSectionTypes, SAMPLE_RESUME_DATA_ZH_TW } from "@/components/resume-builder/i18n";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import { AnalyzerPromptDialog } from "@/components/resume-builder/AnalyzerPromptDialog";
import { AnalyzerSuggestionsPanel, Suggestion, extractSuggestions, applySuggestionToData } from "@/components/resume-builder/AnalyzerSuggestionsPanel";
import MicroSurvey from "@/components/feedback/MicroSurvey";
import { SEO } from "@/components/SEO";

type ViewMode = "dashboard" | "resume-editor" | "cover-letter-editor";

/* ── Brand colors ─────────────────────────────────────────── */
const BRAND = {
  green: "#2b4734",
  greenHover: "#1f3a28",
  greenLight: "#e8f0eb",
  greenLighter: "#f2f7f4",
  gold: "#D4930D",
  goldHover: "#b87d0b",
  cream: "#FDFBF7",
  text: "#1A1A1A",
  textSecondary: "#6B6B6B",
  border: "#e5e7eb",
};

/* ── Sample resume data for new resumes ──────────────── */
const SAMPLE_RESUME_DATA = {
  personalDetails: {
    fullName: "James Bugden",
    professionalTitle: "Senior Recruiter",
    email: "jb.bugden@email.com",
    phone: "+886 970 446 524",
    location: "Taiwan",
    photo: "",
    extras: [
      { id: "1", type: "LinkedIn", value: "linkedin.com/in/jamesbugden" },
      { id: "2", type: "Nationality", value: "UK Citizen · Taiwan PR" },
    ],
  },
  sections: [
    {
      id: "sum-1",
      type: "summary",
      title: "Summary",
      collapsed: false,
      showHeading: false,
      entries: [
        {
          id: "su1",
          fields: {
            description: "Proactive, data-driven recruiter who loves the search and working with candidates. Builds strong relationships with hiring managers while seeking the best talent in the market. Experienced building candidate communities of 22K+ across Threads and LinkedIn.",
          },
        },
      ],
    },
    {
      id: "exp-1",
      type: "experience",
      title: "Professional Experience",
      collapsed: false,
      entries: [
        {
          id: "e1",
          fields: {
            position: "Senior Recruiter",
            company: "Uber",
            location: "Taiwan",
            startMonth: "January",
            startYear: "2024",
            endMonth: "",
            endYear: "",
            currentlyHere: "true",
            description: "<ul><li>Hire across North Asia with a focus on Taiwan for all business units including Operations, Sales, and Corporate roles — exceeded KPIs every year</li><li>#GoGetIt — Crisis hiring: solved high attrition in a key Delivery team by hiring 9 senior candidates (L3-6) in 2 months</li><li>Leading Project Tetris: expansion hiring for 60+ sales roles in 2 quarters with limited timeline and cross-functional coordination</li></ul>",
          },
        },
        {
          id: "e2",
          fields: {
            position: "Talent Acquisition Partner",
            company: "Uber",
            location: "Taiwan",
            startMonth: "January",
            startYear: "2022",
            endMonth: "December",
            endYear: "2023",
            currentlyHere: "",
            description: "<ul><li>Winner of Uber Superstar award — assessed hiring impact to determine if the team should continue targeting traditional candidate pools (Consultant vs Non-Consultant performance comparison), contributing to reduced time-to-hire</li><li>TA POC for Uber ↔ Foodpanda merger: long-term hiring project for non-exec board and general TA requisitions</li><li>Operational Excellence: sourcing and screening knowledge sharing, deep-dive analysis into source-of-hire success rates</li></ul>",
          },
        },
        {
          id: "e3",
          fields: {
            position: "Senior Talent Acquisition Partner",
            company: "Netskope",
            location: "Taipei, Taiwan",
            startMonth: "January",
            startYear: "2021",
            endMonth: "December",
            endYear: "2022",
            currentlyHere: "",
            description: "<ul><li>Hired to lead a team of 3 recruiters on-site in Taipei for cybersecurity software engineering roles (staff level to junior IC)</li><li>Increased long-term inbound applications by 30% over a year by leading university campus efforts to promote the brand</li><li>Sourced using a variety of channels: job fairs, LinkedIn Recruiter, referrals, and community events</li></ul>",
          },
        },
      ],
    },
    {
      id: "edu-1",
      type: "education",
      title: "Education",
      collapsed: false,
      entries: [
        {
          id: "ed1",
          fields: {
            degree: "B.A. Philosophy",
            institution: "University of East Anglia",
            location: "United Kingdom",
            startMonth: "",
            startYear: "2010",
            endMonth: "",
            endYear: "2013",
            currentlyHere: "",
            description: "",
          },
        },
      ],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Skills",
      collapsed: false,
      entries: [
        {
          id: "s1",
          fields: { skills: "Global Tech Recruitment, Non-Tech Recruitment, Data-Driven Hiring, Greenhouse, iCIMS, Beamery, LinkedIn Recruiter, Stakeholder Management, Team Leadership, Campus Recruiting" },
        },
      ],
    },
    {
      id: "lang-1",
      type: "languages",
      title: "Languages",
      collapsed: false,
      entries: [
        {
          id: "l1",
          fields: { language: "English", proficiency: "Native or bilingual proficiency" },
        },
        {
          id: "l2",
          fields: { language: "Mandarin Chinese", proficiency: "Professional working proficiency" },
        },
      ],
    },
    {
      id: "cert-1",
      type: "certificates",
      title: "Certificates",
      collapsed: false,
      entries: [
        {
          id: "c1",
          fields: { name: "Certified Internet Recruiter (CIR)", issuer: "AIRS powered by ADP", date: "2023", url: "" },
        },
      ],
    },
  ],
};

/* ── Floating undo/redo ────────────────────────────────── */
function UndoRedoBar({ onUndo, onRedo, canUndo, canRedo }: {
  onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean;
}) {
  const isMac = typeof navigator !== "undefined" && /Mac|iPod|iPhone|iPad/.test(navigator.userAgent);
  const mod = isMac ? "⌘" : "Ctrl+";
  return (
    <TooltipProvider delayDuration={300}>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-white rounded-full shadow-lg border border-gray-200 p-1">
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={onUndo} disabled={!canUndo} className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", canUndo ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed")}>
              <Undo2 className="w-4.5 h-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">Undo ({mod}Z)</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <button onClick={onRedo} disabled={!canRedo} className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", canRedo ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed")}>
              <Redo2 className="w-4.5 h-4.5" />
            </button>
          </TooltipTrigger>
          <TooltipContent side="top" className="text-xs">Redo ({mod}⇧Z)</TooltipContent>
        </Tooltip>
      </div>
    </TooltipProvider>
  );
}

/* ── Auto-save indicator ───────────────────────────────── */
function SaveIndicator({ saving }: { saving: boolean }) {
  const t = useT();
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    if (!saving) {
      setPulse(true);
      const t = setTimeout(() => setPulse(false), 1500);
      return () => clearTimeout(t);
    }
  }, [saving]);

  return (
    <div className={cn("flex items-center gap-1.5 text-xs transition-opacity duration-300", pulse ? "opacity-100" : "opacity-60")}>
      {saving ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
          <span className="text-gray-400">{t("saving")}</span>
        </>
      ) : (
        <>
          <Check className="w-3 h-3" style={{ color: BRAND.green }} />
          <span className="text-gray-500">{t("allChangesSaved")}</span>
        </>
      )}
    </div>
  );
}

/* ── Mobile preview overlay ────────────────────────────── */
function MobilePreviewOverlay({ children, onClose, onDownload, downloading }: { children: React.ReactNode; onClose: () => void; onDownload?: () => void; downloading?: boolean }) {
  const t = useT();
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200" style={{ backgroundColor: BRAND.cream }}>
        <span className="text-sm font-semibold" style={{ color: BRAND.text }}>{t("preview")}</span>
        <div className="flex items-center gap-3">
          {onDownload && (
            <button
              onClick={onDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: BRAND.green }}
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? "..." : t("download")}
            </button>
          )}
          <button onClick={onClose} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: BRAND.gold }}>{t("close")}</button>
        </div>
      </div>
      <div className="flex-1 overflow-auto">{children}</div>
    </div>
  );
}

/* ── Loading skeleton ──────────────────────────────────── */
function EditorSkeleton() {
  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <Skeleton className="h-32 w-full rounded-xl" />
      <Skeleton className="h-48 w-full rounded-xl" />
      <Skeleton className="h-24 w-full rounded-xl" />
    </div>
  );
}

/* ── Branding footer ───────────────────────────────────── */
function BrandingFooter() {
  const t = useT();
  return (
    <div className="py-3 px-4 text-center border-t bg-white" style={{ borderColor: BRAND.border }}>
      <p className="text-[11px]" style={{ color: BRAND.textSecondary }}>
        {t("poweredBy")}{" "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 font-medium transition-opacity" style={{ color: BRAND.gold }}>
          james.careers
        </a>
        {" · "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-colors" style={{ color: BRAND.textSecondary }}>
          {t("needResumeHelp")}
        </a>
      </p>
    </div>
  );
}

/* ── Download dropdown ─────────────────────────────────── */
function DownloadDropdown({ downloading, pageFormat, docName, onDownload }: {
  downloading: boolean; pageFormat: string; docName: string; onDownload: (filename: string) => void;
}) {
  const t = useT();
  const [open, setOpen] = useState(false);
  const [filename, setFilename] = useState("");
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setFilename((docName || "Resume").replace(/\s+/g, "_") + "_Resume");
  }, [docName]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Button
        size="sm"
        className="text-white gap-1.5 transition-colors"
        style={{ backgroundColor: BRAND.green }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.greenHover)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.green)}
        onClick={() => { if (!downloading) setOpen(!open); }}
        disabled={downloading}
      >
        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {downloading ? t("generating") : t("download")}
      </Button>

      {open && !downloading && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border z-30 w-[280px] p-4 animate-scale-in" style={{ borderColor: BRAND.border }}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: BRAND.textSecondary }}>{t("filename")}</label>
              <div className="flex items-center">
                <input
                  type="text"
                  value={filename}
                  onChange={(e) => setFilename(e.target.value)}
                  className="flex-1 px-3 py-2 text-sm border rounded-l-lg outline-none bg-white"
                  style={{ borderColor: BRAND.border, color: BRAND.text }}
                />
                <span className="px-3 py-2 text-sm bg-gray-50 border border-l-0 rounded-r-lg" style={{ color: BRAND.textSecondary, borderColor: BRAND.border }}>.pdf</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium" style={{ color: BRAND.textSecondary }}>{t("paperSize")}</span>
              <span className="text-xs font-semibold" style={{ color: BRAND.text }}>
                {pageFormat === "letter" ? t("usLetter") : "A4"}
              </span>
            </div>
            <div className="text-[10px] text-center" style={{ color: BRAND.textSecondary }}>⌘S to save · ⌘P to download</div>
            <Button
              className="w-full text-white transition-colors"
              style={{ backgroundColor: BRAND.green }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = BRAND.greenHover)}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = BRAND.green)}
              onClick={() => { setOpen(false); onDownload(filename); }}
            >
              <Download className="w-4 h-4 mr-2" />
              {t("downloadPdf")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   Main Component
   ═════════════════════════════════════════════════════════════ */
const ResumeBuilder = () => {
  const store = useResumeStore();
  const { data, setData, customize, updateCustomize, updatePersonalDetails, setSections, updateSection, removeSection } = store;
  const lang = useResumeBuilderLang();
  const t = useT();
  const builderAiUsage = useBuilderAiUsage();
  const navigateTo = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const localizedSectionTypes = useMemo(() => getLocalizedSectionTypes(lang), [lang]);

  /* ── dnd-kit sensors (defined early, used later after pushHistory) ── */
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(KeyboardSensor)
  );
  const sectionIds = useMemo(() => data.sections.map(s => s.id), [data.sections]);

  const [activeTab, setActiveTab] = useState("content");
  const [modalOpen, setModalOpen] = useState(false);
  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importType, setImportType] = useState<DocType>("resume");
  const [downloading, setDownloading] = useState(false);
  const [showPdfSurvey, setShowPdfSurvey] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const [pendingImportDocId, setPendingImportDocId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editorImportOpen, setEditorImportOpen] = useState(false);
  const isMobile = useIsMobile();
  const exportMetricsRef = useRef<ResumeExportMetrics | null>(null);
  const [analyzerImporting, setAnalyzerImporting] = useState(false);
  const [pageCount, setPageCount] = useState(1);
  const [showPageWarning, setShowPageWarning] = useState(false);
  const [justImported, setJustImported] = useState(false);
  const [analyzerSuggestions, setAnalyzerSuggestions] = useState<Suggestion[]>([]);
  const [replacePickerOpen, setReplacePickerOpen] = useState(false);
  const [pendingAnalyzerData, setPendingAnalyzerData] = useState<{ data: any; settings: any; name: string; suggestions: Suggestion[] } | null>(null);
  const [replaceTargetId, setReplaceTargetId] = useState<string | null>(null);

  const RESUME_LIMIT = 2;

  // Show page warning after import when pages > 2
  useEffect(() => {
    if (justImported && pageCount > 2) {
      setShowPageWarning(true);
      setJustImported(false);
    } else if (justImported && pageCount <= 2) {
      // Give it a moment for preview to recalculate
      const timer = setTimeout(() => setJustImported(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [justImported, pageCount]);

  const handlePageCount = useCallback((count: number) => {
    setPageCount(count);
  }, []);

  // Auto-import from Resume Analyzer
  const analyzerImportRan = useRef(false);
  useEffect(() => {
    if (analyzerImportRan.current) return;
    const isFromAnalyzer = searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text");
    if (!isFromAnalyzer) return;
    const resumeText = sessionStorage.getItem("analyzer-resume-text");
    if (!resumeText) return;

    // Mark as consumed immediately to prevent re-triggering on re-renders or re-visits
    analyzerImportRan.current = true;

    const analysisRaw = sessionStorage.getItem("analyzer-analysis-result");
    let analysisResult: any = null;
    try { analysisResult = analysisRaw ? JSON.parse(analysisRaw) : null; } catch {}

    // Clear sessionStorage eagerly so a refresh won't re-trigger
    sessionStorage.removeItem("analyzer-resume-text");
    sessionStorage.removeItem("analyzer-analysis-result");

    const withTimeout = <T,>(promise: Promise<T>, ms: number): Promise<T> =>
      Promise.race([
        promise,
        new Promise<never>((_, reject) => setTimeout(() => reject(new Error("Request timed out")), ms)),
      ]);

    setAnalyzerImporting(true);
    (async () => {
      try {
        if (builderAiUsage.importLimitReached) {
          toast({ title: lang === "zh-tw" ? "本月 AI 匯入額度已用完" : "Monthly AI import limit reached", description: lang === "zh-tw" ? "每月限 2 次 AI 匯入。額度下月初重置。" : "You can import up to 2 resumes per month with AI. Resets next month.", variant: "destructive" });
          setSearchParams({}, { replace: true });
          setAnalyzerImporting(false);
          return;
        }
        const { data: parsed, error } = await withTimeout(
          supabase.functions.invoke("parse-resume-to-builder", {
            body: { resumeText, analysisResult },
          }),
          60000
        );

        if (error || !parsed || parsed.error) {
          toast({ title: "Import failed", description: parsed?.error || "Could not parse resume", variant: "destructive" });
          setAnalyzerImporting(false);
          return;
        }

        const docName = parsed.personalDetails?.fullName
          ? `${parsed.personalDetails.fullName} Resume`
          : "Imported Resume";
        const tempDoc = createDocument("resume", "__temp__");
        const classicSettings = { ...applyTemplatePreset(tempDoc.settings as any, "classic"), fontSize: 9, lineHeight: 1.2, marginY: 7 };
        deleteDocument(tempDoc.id); // just needed settings shape

        const sug = analysisResult ? extractSuggestions(analysisResult) : [];
        const allDocs = getAllDocuments();
        const resumes = allDocs.filter((d) => d.type === "resume");

        if (resumes.length >= RESUME_LIMIT) {
          // At limit — ask user which to replace
          setPendingAnalyzerData({ data: parsed, settings: classicSettings, name: docName, suggestions: sug });
          setReplaceTargetId(resumes[0]?.id || null);
          setReplacePickerOpen(true);
          setAnalyzerImporting(false);
          return;
        }

        // Under limit — create normally
        const doc = createDocument("resume", docName);
        updateDocument(doc.id, { data: parsed, settings: classicSettings });
        store.setData(parsed);
        store.updateCustomize(classicSettings);
        builderAiUsage.recordImport();
        setActiveDocId(doc.id);
        setViewMode("resume-editor");
        setActiveTab("content");

        toast({ title: lang === "zh-tw" ? "履歷已匯入！" : "Resume imported!", description: lang === "zh-tw" ? "已使用 Classic 模板匯入。可在下方編輯並下載。" : "Your resume has been imported with the Classic template. Edit and download it below." });

        if (sug.length > 0) setAnalyzerSuggestions(sug);

        setSearchParams({}, { replace: true });
      } catch (e) {
        console.error("Analyzer import error:", e);
        setSearchParams({}, { replace: true });
        toast({ title: "Import failed", description: "Something went wrong. Please try again.", variant: "destructive" });
      } finally {
        setAnalyzerImporting(false);
      }
    })();
  }, [searchParams]);

  // Undo/redo
  const historyRef = useRef<{ past: any[]; future: any[] }>({ past: [], future: [] });

  const pushHistory = useCallback(() => {
    historyRef.current.past.push(JSON.stringify(data));
    if (historyRef.current.past.length > 30) historyRef.current.past.shift();
    historyRef.current.future = [];
  }, [data]);

  const handleDragEnd = useCallback((event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;
    pushHistory();
    const oldIndex = data.sections.findIndex(s => s.id === active.id);
    const newIndex = data.sections.findIndex(s => s.id === over.id);
    const reordered = arrayMove(data.sections, oldIndex, newIndex);
    setSections(reordered);
    // Sync customize sectionOrder so preview reflects the new order
    store.updateCustomize({ sectionOrder: reordered.map(s => s.id) });
  }, [data.sections, pushHistory, setSections, store]);

  const undo = useCallback(() => {
    const { past, future } = historyRef.current;
    if (past.length === 0) return;
    future.push(JSON.stringify(data));
    const prev = JSON.parse(past.pop()!);
    store.setData(prev);
  }, [data, store]);

  const redo = useCallback(() => {
    const { past, future } = historyRef.current;
    if (future.length === 0) return;
    past.push(JSON.stringify(data));
    const next = JSON.parse(future.shift()!);
    store.setData(next);
  }, [data, store]);

  // Auto-save
  useEffect(() => {
    if (!activeDocId || viewMode !== "resume-editor") return;
    setSaving(true);
    const timer = setTimeout(() => {
      updateDocument(activeDocId, { data, settings: customize });
      setSaving(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [data, customize, activeDocId, viewMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && e.key === "z" && e.shiftKey) { e.preventDefault(); redo(); }
      if (mod && e.key === "s") { e.preventDefault(); handleDownload(); }
      if (mod && e.key === "p") { e.preventDefault(); handleDownload(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, activeDocId, data, customize]);

  // Unsaved work guard (beforeunload)
  useEffect(() => {
    if (viewMode !== "resume-editor") return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
      e.returnValue = "";
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [viewMode]);

  const handleOpenDocument = useCallback((doc: SavedDocument) => {
    setLoading(true);
    setActiveDocId(doc.id);
    if (doc.type === "resume") {
      store.setData(doc.data as any);
      store.updateCustomize(doc.settings as any);
      setViewMode("resume-editor");
      setActiveTab("content");
      historyRef.current = { past: [], future: [] };
    } else {
      setViewMode("cover-letter-editor");
    }
    setTimeout(() => setLoading(false), 300);
  }, [store]);

  const handleImport = (type: DocType) => {
    setImportType(type);
    setImporting(true);
  };

  const handleBackToDashboard = () => {
    if (activeDocId && viewMode === "resume-editor") {
      updateDocument(activeDocId, { data, settings: customize });
    }
    setViewMode("dashboard");
    setActiveDocId(null);
  };

  const activeDoc = activeDocId ? getAllDocuments().find((d) => d.id === activeDocId) : null;
  const allDocs = getAllDocuments();

  const handleDownload = async (filename?: string) => {
    if (downloading) return;
    const metrics = exportMetricsRef.current;
    if (!metrics?.sourceElement) {
      toast({ title: "Export failed", description: "Preview not ready yet. Please wait a moment and try again.", variant: "destructive" });
      return;
    }
    setDownloading(true);
    const fn = filename || (data.personalDetails.fullName || "Resume").replace(/\s+/g, "_") + "_Resume";
    try {
      await exportResumePdfServer({
        sourceElement: metrics.sourceElement,
        fileName: fn,
        pageFormat: (customize.pageFormat || "a4") as "a4" | "letter",
        customize,
        personalDetails: data.personalDetails,
      });
      setShowPdfSurvey(true);
    } catch (err) {
      console.error("PDF export error:", err);
    }
    setDownloading(false);
  };

  const handleDocSwitch = (docId: string) => {
    if (activeDocId && viewMode === "resume-editor") {
      updateDocument(activeDocId, { data, settings: customize });
    }
    const doc = allDocs.find((d) => d.id === docId);
    if (doc) handleOpenDocument(doc);
  };

  const addSection = (type: string) => {
    pushHistory();
    const meta = localizedSectionTypes.find((s) => s.type === type);
    const newSection: ResumeSection = {
      id: crypto.randomUUID(),
      type,
      title: meta?.title || t("customSectionFallback"),
      entries: [{ id: crypto.randomUUID(), fields: getDefaultFieldsForType(type) }],
      collapsed: false,
    };
    setSections([...data.sections, newSection]);
    toast({ title: t("sectionAdded"), description: `${meta?.title || t("customSectionFallback")} ${t("sectionAddedDesc")}` });
  };

  const editorScrollRef = useRef<HTMLDivElement>(null);
  const handleEditSection = useCallback((sectionId: string) => {
    setActiveTab("content");
    setTimeout(() => {
      const el = document.getElementById(`section-card-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        // Highlight flash
        el.classList.add("ring-2", "ring-amber-400/70");
        setTimeout(() => el.classList.remove("ring-2", "ring-amber-400/70"), 1200);
      }
    }, 100);
  }, []);

  const handleContentEdit = useCallback((sectionId: string, entryId: string, field: string, html: string) => {
    setData(prev => ({
      ...prev,
      sections: prev.sections.map(s =>
        s.id === sectionId
          ? { ...s, entries: s.entries.map(e => e.id === entryId ? { ...e, fields: { ...e.fields, [field]: html } } : e) }
          : s
      ),
    }));
  }, [setData]);

  const handleImported = useCallback((doc: SavedDocument) => {
    if (doc.type === "resume") {
      const classicSettings = { ...applyTemplatePreset(doc.settings as any, "classic"), fontSize: 9, lineHeight: 1.2, marginY: 7 };
      store.setData(doc.data as any);
      store.updateCustomize(classicSettings);
      updateDocument(doc.id, { settings: classicSettings });
      setActiveDocId(doc.id);
      setViewMode("resume-editor");
      setActiveTab("content");
      historyRef.current = { past: [], future: [] };
      setJustImported(true);
    } else {
      handleOpenDocument(doc);
    }
  }, [store, handleOpenDocument]);

  const handleTemplatePickedAfterImport = useCallback((templateId: string) => {
    const newSettings = applyTemplatePreset(customize, templateId);
    store.updateCustomize(newSettings);
    if (pendingImportDocId) {
      updateDocument(pendingImportDocId, { settings: newSettings });
    }
    setTemplatePickerOpen(false);
    setPendingImportDocId(null);
    setViewMode("resume-editor");
    setActiveTab("content");
    historyRef.current = { past: [], future: [] };
  }, [customize, store, pendingImportDocId]);

  // Handle import into existing resume
  const handleEditorImported = useCallback((doc: SavedDocument) => {
    if (doc.type === "resume") {
      pushHistory();
      store.setData(doc.data as any);
      toast({ title: t("contentImported"), description: t("contentImportedDesc") });
      setJustImported(true);
    }
    setEditorImportOpen(false);
  }, [store, pushHistory]);

  // Rename handler
  const handleRenameSave = () => {
    if (activeDocId && nameValue.trim()) {
      renameDocument(activeDocId, nameValue.trim());
    }
    setEditingName(false);
  };

  if (analyzerImporting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: BRAND.cream }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: BRAND.gold }} />
        <p className="text-sm font-medium" style={{ color: BRAND.text }}>Importing your resume...</p>
        <p className="text-xs" style={{ color: BRAND.textSecondary }}>Parsing content and using my personal custom design</p>
      </div>
    );
  }

  if (viewMode === "dashboard") {
    return (
      <>
        <DocumentDashboard onOpenDocument={handleOpenDocument} onImport={handleImport} />
        <ImportModal open={importing} onClose={() => setImporting(false)} type={importType} onImported={handleImported} />
        <TemplatePickerOverlay
          open={templatePickerOpen}
          onSelect={handleTemplatePickedAfterImport}
          resumeData={data}
        />
      </>
    );
  }

  if (viewMode === "cover-letter-editor") {
    return (
      <div className="h-screen flex flex-col" style={{ backgroundColor: BRAND.cream }}>
        <div className="flex items-center gap-3 px-4 py-2 bg-white border-b" style={{ borderColor: BRAND.border }}>
          <button onClick={handleBackToDashboard} className="text-sm hover:opacity-80 transition-colors flex items-center gap-1" style={{ color: BRAND.textSecondary }}>
            <ArrowLeft className="w-3.5 h-3.5" /> {t("dashboard")}
          </button>
          <span className="text-sm font-medium" style={{ color: BRAND.text }}>{activeDoc?.name || "Cover Letter"}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <CoverLetterBuilder docId={activeDocId} />
        </div>
        <BrandingFooter />
      </div>
    );
  }

  // Resume editor
  const currentDocName = activeDoc?.name || "Resume";

  const editorContent = loading ? (
    <EditorSkeleton />
  ) : activeTab === "content" ? (
    <div className="animate-fade-in">
      <div className="max-w-2xl mx-auto p-3 sm:p-4 md:p-6 space-y-3">
        {/* Import content link */}
        <div className="flex items-center justify-end mb-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setEditorImportOpen(true)}
                  className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80"
                  style={{ color: BRAND.textSecondary }}
                >
                   <Upload className="w-3.5 h-3.5" />
                   {t("importContent")}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{t("importFromFile")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Page count warning after import */}
        {showPageWarning && (
          <div className="flex items-start gap-2 rounded-lg border border-amber-300 bg-amber-50 p-3 text-sm" style={{ color: BRAND.text }}>
            <span className="text-amber-600 mt-0.5 flex-shrink-0">⚠️</span>
            <div className="flex-1">
              <p className="font-medium text-amber-800">
                {lang === "zh-tw" ? "建議將履歷縮減為 2 頁以內" : "We recommend keeping your resume to 2 pages max"}
              </p>
              <p className="text-xs text-amber-700 mt-0.5">
                {lang === "zh-tw"
                  ? "大多數招募經理只花 6-10 秒瀏覽一份履歷。精簡內容能讓重點更突出。"
                  : "Most recruiters spend 6–10 seconds scanning a resume. Trim to keep the strongest content visible."}
              </p>
            </div>
            <button
              onClick={() => setShowPageWarning(false)}
              className="text-amber-400 hover:text-amber-600 transition-colors flex-shrink-0 mt-0.5"
              aria-label="Dismiss"
            >
              ✕
            </button>
          </div>
        )}

        {/* Personal Details */}
        <PersonalDetailsCard details={data.personalDetails} onChange={(u) => { pushHistory(); updatePersonalDetails(u); }} />

        {/* Sections — dnd-kit sortable */}
        <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd} modifiers={[restrictToVerticalAxis]}>
          <SortableContext items={sectionIds} strategy={verticalListSortingStrategy}>
            {data.sections.map((section, idx) => (
              <SortableSectionCard key={section.id} id={section.id}>
                <SectionCard
                  section={section}
                  onUpdate={(updates) => { pushHistory(); updateSection(section.id, updates); }}
                  onRemove={() => {
                    pushHistory();
                    const removed = section;
                    removeSection(section.id);
                    toast({
                      title: t("sectionRemoved"),
                      description: `${removed.title} ${t("sectionDeletedDesc")}`,
                      action: (
                        <button
                          onClick={() => {
                            const restored = [...data.sections];
                            restored.splice(idx, 0, removed);
                            setSections(restored);
                          }}
                          className="text-xs font-semibold hover:opacity-80 px-2 py-1 rounded transition-opacity"
                          style={{ color: BRAND.green, backgroundColor: BRAND.greenLight }}
                        >
                          {t("undo")}
                        </button>
                      ),
                    });
                  }}
                />
              </SortableSectionCard>
            ))}
          </SortableContext>
        </DndContext>
        {data.sections.length === 0 && (
          <div className="bg-white rounded-xl shadow-sm text-center py-8">
            <p className="text-sm" style={{ color: BRAND.textSecondary }}>{t("addSectionsPrompt")}</p>
          </div>
        )}

        {/* Completeness score */}
        <CompletenessScore data={data} />

        {/* Analyzer CTA */}
        <AnalyzerCTA fromAnalyzer={searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text")} resumeData={data} />

        {/* Add Content button — gradient pill */}
        <div className="flex justify-center pt-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md min-h-[44px]"
                  style={{ background: "linear-gradient(135deg, #D4930D 0%, #e8a520 50%, #f0c060 100%)" }}
                >
                  <Plus className="w-4.5 h-4.5" /> {t("addContent")}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{t("addContent")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  ) : activeTab === "customize" ? (
    <div className="animate-fade-in">
      <CustomizePanel settings={customize} onChange={updateCustomize} sections={data.sections} resumeData={data} />
      <div className="max-w-2xl mx-auto px-3 sm:px-4 md:px-6 pb-6">
        <DesignPhilosophy />
      </div>
    </div>
  ) : null;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: BRAND.cream }}>
      <SEO />
      {/* ── Top bar — stacks on mobile ─────────────────────────── */}
      <div className="sticky top-0 z-30 bg-white border-b" style={{ borderColor: BRAND.border }}>
        {/* Row 1: Back + name + download */}
        <div className="flex items-center justify-between px-3 sm:px-4 h-12 sm:h-14">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
            <TooltipProvider delayDuration={300}>
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    onClick={handleBackToDashboard}
                    className="flex items-center gap-1 text-sm transition-colors flex-shrink-0 hover:opacity-80 min-h-[44px] min-w-[44px] justify-center sm:justify-start sm:min-w-0"
                    style={{ color: BRAND.textSecondary }}
                  >
                    <ArrowLeft className="w-4 h-4 sm:w-3.5 sm:h-3.5" />
                    <span className="hidden sm:inline">{t("dashboard")}</span>
                  </button>
                </TooltipTrigger>
                <TooltipContent side="bottom" className="text-xs">{t("dashboard")}</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <span className="text-gray-300 hidden sm:inline">|</span>
            {editingName ? (
              <input
                autoFocus
                value={nameValue}
                onChange={(e) => setNameValue(e.target.value)}
                onBlur={handleRenameSave}
                onKeyDown={(e) => { if (e.key === "Enter") handleRenameSave(); if (e.key === "Escape") setEditingName(false); }}
                className="text-sm font-medium bg-gray-50 border rounded px-2 py-1 outline-none min-w-[100px] max-w-[160px]"
                style={{ color: BRAND.text, borderColor: BRAND.border }}
              />
            ) : (
              <button
                onClick={() => { setEditingName(true); setNameValue(currentDocName); }}
                className="text-sm font-medium transition-colors truncate max-w-[120px] sm:max-w-[160px] hover:opacity-70"
                style={{ color: BRAND.text }}
                title={t("clickToRename")}
              >
                {currentDocName}
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
            <div className="hidden sm:block">
              <SaveIndicator saving={saving} />
            </div>
            <button
              onClick={() => navigateTo(lang === "zh-tw" ? "/resume" : "/zh-tw/resume")}
              className="hidden sm:flex items-center gap-1 px-2.5 py-1.5 text-xs font-semibold rounded-md transition-colors hover:opacity-80"
              style={{ backgroundColor: `${BRAND.gold}20`, color: BRAND.gold, border: `1px solid ${BRAND.gold}40` }}
            >
              {lang === "zh-tw" ? "EN" : "中文"}
            </button>
            <DownloadDropdown
              downloading={downloading}
              pageFormat={customize.pageFormat || "a4"}
              docName={currentDocName}
              onDownload={handleDownload}
            />
          </div>
        </div>

        {/* Row 2: Content/Customize toggle — always visible, centered */}
        <div className="flex items-center justify-center px-3 sm:px-4 pb-2 gap-2">
          <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
            <button
              onClick={() => setActiveTab("content")}
              className={cn(
                "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === "content"
                  ? "bg-white shadow-sm"
                  : "hover:opacity-80"
              )}
              style={{ color: activeTab === "content" ? BRAND.text : BRAND.textSecondary }}
            >
              <FileText className="w-3.5 h-3.5" />
              {t("content")}
            </button>
            <button
              onClick={() => setActiveTab("customize")}
              className={cn(
                "flex items-center gap-1.5 px-3 sm:px-4 py-1.5 rounded-md text-sm font-medium transition-all",
                activeTab === "customize"
                  ? "bg-white shadow-sm"
                  : "hover:opacity-80"
              )}
              style={{ color: activeTab === "customize" ? BRAND.text : BRAND.textSecondary }}
            >
              <Palette className="w-3.5 h-3.5" />
              {t("customize")}
            </button>
          </div>
          {/* Mobile-only lang toggle */}
          <button
            onClick={() => navigateTo(lang === "zh-tw" ? "/resume" : "/zh-tw/resume")}
            className="sm:hidden flex items-center gap-1 px-2 py-1.5 text-xs font-semibold rounded-md transition-colors hover:opacity-80 min-h-[36px]"
            style={{ backgroundColor: `${BRAND.gold}20`, color: BRAND.gold, border: `1px solid ${BRAND.gold}40` }}
          >
            
            {lang === "zh-tw" ? "EN" : "中"}
          </button>
        </div>
      </div>

      {/* ── Multi-page export warning ──────────────────── */}
      <div className="mx-3 sm:mx-4 mb-2 px-3 py-2 rounded-lg bg-amber-50 border border-amber-200 text-xs leading-relaxed text-amber-700">
        {t("exportMultiPageNote")}
      </div>

      {/* ── Editor body ────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop: 40/60 split */}
        <div className="hidden lg:flex h-full">
          <div className="w-[40%] min-w-[340px] max-w-[480px] flex-shrink-0 h-full overflow-y-auto bg-white border-r" style={{ borderColor: BRAND.border }} ref={editorScrollRef}>
            {editorContent}
          </div>
          <div className="flex-1 h-full relative">
            <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} onColorChange={(f, c) => updateCustomize({ [f]: c } as any)} onContentEdit={handleContentEdit} onPageCount={handlePageCount} exportMetricsRef={exportMetricsRef} />
            <AnalyzerSuggestionsPanel
              suggestions={analyzerSuggestions}
              onApply={(s) => {
                pushHistory();
                const updated = applySuggestionToData(data, s);
                store.setData(updated);
                setAnalyzerSuggestions(prev => prev.filter(x => x.id !== s.id));
                toast({ title: "Suggestion applied", description: "The improvement has been applied to your resume." });
              }}
              onDismiss={(id) => setAnalyzerSuggestions(prev => prev.filter(x => x.id !== id))}
            />
            <div className="absolute bottom-4 left-4 z-20">
              <FeedbackBox subject="Resume Builder Feedback" locale={lang} />
            </div>
          </div>
        </div>

        {/* Mobile/tablet: editor only */}
        <div className="lg:hidden h-full overflow-y-auto bg-white">
          {editorContent}
        </div>

        {/* Mobile floating preview button */}
        {!mobilePreview && (
          <button
            onClick={() => setMobilePreview(true)}
            className="lg:hidden fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl active:scale-95 transition-all"
            style={{ backgroundColor: BRAND.green, border: `1px solid ${BRAND.border}` }}
            aria-label={t("preview")}
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Mobile preview overlay */}
        {mobilePreview && (
          <MobilePreviewOverlay onClose={() => setMobilePreview(false)} onDownload={() => handleDownload()} downloading={downloading}>
            <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} onColorChange={(f, c) => updateCustomize({ [f]: c } as any)} onContentEdit={handleContentEdit} onPageCount={handlePageCount} exportMetricsRef={exportMetricsRef} />
            <AnalyzerSuggestionsPanel
              suggestions={analyzerSuggestions}
              onApply={(s) => {
                pushHistory();
                const updated = applySuggestionToData(data, s);
                store.setData(updated);
                setAnalyzerSuggestions(prev => prev.filter(x => x.id !== s.id));
                toast({ title: "Suggestion applied", description: "The improvement has been applied to your resume." });
              }}
              onDismiss={(id) => setAnalyzerSuggestions(prev => prev.filter(x => x.id !== id))}
            />
            <div className="absolute bottom-4 left-4 z-20">
              <FeedbackBox subject="Resume Builder Feedback" locale={lang} />
            </div>
          </MobilePreviewOverlay>
        )}
      </div>

      {/* Undo/Redo */}
      {viewMode === "resume-editor" && !isMobile && (
        <UndoRedoBar
          onUndo={undo}
          onRedo={redo}
          canUndo={historyRef.current.past.length > 0}
          canRedo={historyRef.current.future.length > 0}
        />
      )}

      <BrandingFooter />

      <AddContentModal open={modalOpen} onClose={() => setModalOpen(false)} onAdd={addSection} existingTypes={data.sections.map((s) => s.type)} />

      {/* Import into existing resume */}
      <ImportModal open={editorImportOpen} onClose={() => setEditorImportOpen(false)} type="resume" onImported={handleEditorImported} />
      {viewMode === "resume-editor" && <AnalyzerPromptDialog fromAnalyzer={searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text")} />}

      {/* Replace picker dialog when at resume limit */}
      <AlertDialog open={replacePickerOpen} onOpenChange={setReplacePickerOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{lang === "zh-tw" ? "履歷數量已達上限" : "Resume limit reached"}</AlertDialogTitle>
            <AlertDialogDescription>
              {lang === "zh-tw"
                ? `你最多可以有 ${RESUME_LIMIT} 份履歷。選擇一份要取代的履歷：`
                : `You can have up to ${RESUME_LIMIT} resumes. Choose which one to replace with your new import:`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          {/* Incoming resume preview */}
          {pendingAnalyzerData && (() => {
            const pd = pendingAnalyzerData.data as import("@/components/resume-builder/types").ResumeData;
            const incomingName = pd?.personalDetails?.fullName || "";
            const incomingTitle = pd?.personalDetails?.professionalTitle || "";
            const incomingSub = [incomingName, incomingTitle].filter(Boolean).join(" · ");
            return (
              <div className="rounded-lg border-2 border-primary bg-primary/5 p-3 mb-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-[10px] font-semibold uppercase tracking-wider text-primary bg-primary/10 px-2 py-0.5 rounded-full">
                    {lang === "zh-tw" ? "新匯入" : "New Import"}
                  </span>
                </div>
                <p className="text-sm font-medium">{pendingAnalyzerData.name}</p>
                {incomingSub && <p className="text-xs text-muted-foreground mt-0.5">{incomingSub}</p>}
              </div>
            );
          })()}

          <p className="text-xs font-medium text-muted-foreground">
            {lang === "zh-tw" ? "選擇要取代的履歷：" : "Select which resume to replace:"}
          </p>
          <RadioGroup value={replaceTargetId || ""} onValueChange={setReplaceTargetId} className="gap-3">
          {getAllDocuments().filter(d => d.type === "resume").map(doc => {
              const rd = doc.data as import("@/components/resume-builder/types").ResumeData;
              const personName = rd?.personalDetails?.fullName || "";
              const personTitle = rd?.personalDetails?.professionalTitle || "";
              const subtitle = [personName, personTitle].filter(Boolean).join(" · ");
              return (
                <div key={doc.id} className={cn("flex items-center space-x-3 rounded-lg border p-3 cursor-pointer transition-colors", replaceTargetId === doc.id ? "border-destructive bg-destructive/5" : "hover:bg-muted/50")} onClick={() => setReplaceTargetId(doc.id)}>
                  <RadioGroupItem value={doc.id} id={`replace-${doc.id}`} />
                  <Label htmlFor={`replace-${doc.id}`} className="cursor-pointer flex-1">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{doc.name}</span>
                      <span className="text-xs text-muted-foreground">
                        {new Date(doc.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                    {subtitle && <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>}
                  </Label>
                </div>
              );
            })}
          </RadioGroup>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={() => { setReplacePickerOpen(false); setPendingAnalyzerData(null); }}>
              {lang === "zh-tw" ? "取消" : "Cancel"}
            </AlertDialogCancel>
            <AlertDialogAction
              disabled={!replaceTargetId}
              onClick={() => {
                if (!replaceTargetId || !pendingAnalyzerData) return;
                deleteDocument(replaceTargetId);
                const doc = createDocument("resume", pendingAnalyzerData.name);
                updateDocument(doc.id, { data: pendingAnalyzerData.data, settings: pendingAnalyzerData.settings });
                store.setData(pendingAnalyzerData.data);
                store.updateCustomize(pendingAnalyzerData.settings);
                builderAiUsage.recordImport();
                setActiveDocId(doc.id);
                setViewMode("resume-editor");
                setActiveTab("content");
                toast({ title: lang === "zh-tw" ? "履歷已匯入！" : "Resume imported!", description: lang === "zh-tw" ? "已取代選取的履歷。" : "The selected resume has been replaced." });
                if (pendingAnalyzerData.suggestions.length > 0) setAnalyzerSuggestions(pendingAnalyzerData.suggestions);
                sessionStorage.removeItem("analyzer-resume-text");
                sessionStorage.removeItem("analyzer-analysis-result");
                setSearchParams({}, { replace: true });
                setPendingAnalyzerData(null);
                setReplacePickerOpen(false);
              }}
            >
              {lang === "zh-tw" ? "取代並匯入" : "Replace & Import"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
      {showPdfSurvey && <MicroSurvey actionKey="resume_pdf_export" />}
    </div>
  );
};

export default ResumeBuilder;