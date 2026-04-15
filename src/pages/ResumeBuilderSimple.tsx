import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, TouchSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
import { useSearchParams } from "react-router-dom";
import { SortableContext, verticalListSortingStrategy, arrayMove } from "@dnd-kit/sortable";
import { restrictToVerticalAxis } from "@dnd-kit/modifiers";
import { SortableSectionCard } from "@/components/resume-builder/SortableSectionCard";
import { Plus, Eye, Undo2, Redo2, Check, Loader2, Upload, ArrowLeft, FileText, Download, Globe, Settings2, Lightbulb, Minus, ChevronDown, Home, X } from "lucide-react";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { PersonalDetailsCard } from "@/components/resume-builder/PersonalDetailsCard";
import { SectionCard } from "@/components/resume-builder/SectionCard";
import { ResumePdfPreview } from "@/components/resume-builder/ResumePdfPreview";
import { useResumeStore } from "@/components/resume-builder/useResumeStore";
import { getDefaultFieldsForType, ResumeSection } from "@/components/resume-builder/types";
import { DocumentDashboard } from "@/components/document-dashboard/DocumentDashboard";
import { ImportModal } from "@/components/document-dashboard/ImportModal";
import { CompletenessScore } from "@/components/resume-builder/CompletenessScore";
import { AnalyzerCTA } from "@/components/resume-builder/AnalyzerCTA";
import { DesignPhilosophy } from "@/components/resume-builder/DesignPhilosophy";
import { SavedDocument, DocType, updateDocument, getAllDocuments, renameDocument, createDocument } from "@/lib/documentStore";
import { supabase } from "@/integrations/supabase/client";
import { useBuilderAiUsage } from "@/hooks/useBuilderAiUsage";
import { CustomizeSettings, DEFAULT_CUSTOMIZE } from "@/components/resume-builder/customizeTypes";
import { exportResumePdfServer } from "@/lib/serverPdfExport";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import FeedbackBox from "@/components/FeedbackBox";
import { useResumeBuilderLang, useT, getLocalizedSectionTypes } from "@/components/resume-builder/i18n";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { LogIn } from "lucide-react";
import { AnalyzerPromptDialog } from "@/components/resume-builder/AnalyzerPromptDialog";
import { SEO } from "@/components/SEO";

type ViewMode = "dashboard" | "resume-editor";

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

/* ── Locked-in opinionated design preset ─────────────────── */
const LOCKED_CUSTOMIZE: CustomizeSettings = {
  ...DEFAULT_CUSTOMIZE,
  template: "classic",
  bodyFont: "'Lora', serif",
  headingFont: "'Lora', serif",
  fontSize: 11,
  lineHeight: 1.5,
  marginX: 16,
  marginY: 16,
  sectionSpacing: 5,
  columns: "one",
  headerAlign: "center",
  headerArrangement: "stacked",
  contactSeparator: "icon",
  headerIconStyle: "outline",
  headingStyle: "underline",
  headingSize: "m",
  headingUppercase: true,
  accentColor: "#1e293b",
  entryLayout: "stacked",
  showPhoto: false,
  showPageNumbers: false,
  nameSize: "s",
  nameBold: true,
  nameFont: "body",
  titleSize: "m",
  colorMode: "basic",
  accentApplyHeadings: true,
  accentApplyLines: true,
  linkUnderline: true,
  linkBlue: true,
  skillsDisplay: "grid",
  languagesDisplay: "grid",
  educationOrder: "degree-first",
  experienceOrder: "title-first",
};

/* ── Allowed section types (only 6) ──────────────────────── */
const ALLOWED_SECTION_TYPES = ["summary", "experience", "education", "skills", "languages", "certificates"];

/* ── Sample resume data ──────────────────────────────────── */
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
    ],
  },
  sections: [
    {
      id: "sum-1", type: "summary", title: "Summary", collapsed: false, showHeading: false,
      entries: [{ id: "su1", fields: { description: "Proactive, data-driven recruiter who loves the search and working with candidates. Builds strong relationships with hiring managers while seeking the best talent in the market." } }],
    },
    {
      id: "exp-1", type: "experience", title: "Professional Experience", collapsed: false,
      entries: [{ id: "e1", fields: { position: "Senior Recruiter", company: "Uber", location: "Taiwan", startMonth: "January", startYear: "2024", endMonth: "", endYear: "", currentlyHere: "true", description: "<ul><li>Hire across North Asia with a focus on Taiwan for all business units</li><li>Exceeded KPIs every year since joining</li></ul>" } }],
    },
    {
      id: "edu-1", type: "education", title: "Education", collapsed: false,
      entries: [{ id: "ed1", fields: { degree: "B.A. Philosophy", institution: "University of East Anglia", location: "United Kingdom", startMonth: "", startYear: "2010", endMonth: "", endYear: "2013", currentlyHere: "", description: "" } }],
    },
    {
      id: "skills-1", type: "skills", title: "Skills", collapsed: false,
      entries: [{ id: "s1", fields: { skills: "Global Tech Recruitment, Data-Driven Hiring, Greenhouse, LinkedIn Recruiter, Stakeholder Management" } }],
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
    if (!saving) { setPulse(true); const tm = setTimeout(() => setPulse(false), 1500); return () => clearTimeout(tm); }
  }, [saving]);
  return (
      <div className={cn("flex items-center gap-1.5 text-xs transition-opacity duration-300", pulse ? "opacity-100" : "opacity-60")}>
      {saving ? (
        <><Loader2 className="w-3 h-3 animate-spin text-gray-400" /><span className="text-gray-400">{t("saving")}</span></>
      ) : (
        <><Check className="w-3 h-3" style={{ color: BRAND.green }} /><span className="text-gray-500">{t("allChangesSaved")}</span></>
      )}
    </div>
  );
}

/* ── Mobile preview overlay ────────────────────────────── */
function MobilePreviewOverlay({ children, onClose, onDownload, downloading }: { children: React.ReactNode; onClose: () => void; onDownload?: () => void; downloading?: boolean }) {
  const t = useT();
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [onClose]);
  return (
    <div className="fixed inset-0 z-50 bg-black/40 flex flex-col animate-fade-in" onClick={onClose}>
      <div className="flex-1 flex flex-col bg-white" onClick={(e) => e.stopPropagation()}>
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200" style={{ backgroundColor: BRAND.cream }}>
          <span className="text-sm font-semibold" style={{ color: BRAND.text }}>{t("preview")}</span>
          <div className="flex items-center gap-3">
            {onDownload && (
              <button onClick={onDownload} disabled={downloading} className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: BRAND.green }}>
                {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
                {downloading ? "..." : t("download")}
              </button>
            )}
            <button onClick={onClose} className="flex items-center justify-center w-11 h-11 -mr-2 rounded-lg hover:bg-gray-100 transition-colors" aria-label="Close preview">
              <X className="w-5 h-5" style={{ color: BRAND.text }} />
            </button>
          </div>
        </div>
        <div className="flex-1 overflow-auto">{children}</div>
      </div>
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
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 font-medium transition-opacity" style={{ color: BRAND.gold }}>james.careers</a>
        {" · "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-colors" style={{ color: BRAND.textSecondary }}>{t("needResumeHelp")}</a>
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

  useEffect(() => { setFilename((docName || "Resume").replace(/\s+/g, "_") + "_Resume"); }, [docName]);
  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => { if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false); };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div className="relative" ref={ref}>
      <Button
        size="sm" className="text-white gap-1.5 transition-colors hover:opacity-90 active:opacity-80"
        style={{ backgroundColor: BRAND.green }}
        onClick={() => { if (!downloading) setOpen(!open); }}
        disabled={downloading}
      >
        {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
        {downloading ? t("generating") : t("download")}
      </Button>
      {open && !downloading && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border z-30 w-[calc(100vw-2rem)] sm:w-[280px] max-w-[280px] p-4 animate-scale-in" style={{ borderColor: BRAND.border }}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: BRAND.textSecondary }}>{t("filename")}</label>
              <div className="flex items-center">
                <input type="text" value={filename} onChange={(e) => setFilename(e.target.value)} className="flex-1 px-3 py-2 text-sm border rounded-l-lg outline-none bg-white" style={{ borderColor: BRAND.border, color: BRAND.text }} />
                <span className="px-3 py-2 text-sm bg-gray-50 border border-l-0 rounded-r-lg" style={{ color: BRAND.textSecondary, borderColor: BRAND.border }}>.pdf</span>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 px-3 bg-gray-50 rounded-lg">
              <span className="text-xs font-medium" style={{ color: BRAND.textSecondary }}>{t("paperSize")}</span>
              <span className="text-xs font-semibold" style={{ color: BRAND.text }}>A4</span>
            </div>
            <Button className="w-full text-white transition-colors hover:opacity-90 active:opacity-80" style={{ backgroundColor: BRAND.green }}
              onClick={() => { setOpen(false); onDownload(filename); }}
            >
              <Download className="w-4 h-4 mr-2" /> {t("downloadPdf")}
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/* ── Inline Add Section (limited to 6 types) ─────────── */
function AddSectionInline({ onAdd, existingTypes }: { onAdd: (type: string) => void; existingTypes: string[] }) {
  const [open, setOpen] = useState(false);
  const lang = useResumeBuilderLang();
  const sectionTypes = getLocalizedSectionTypes(lang);
  const t = useT();
  const allowed = sectionTypes.filter((s) => ALLOWED_SECTION_TYPES.includes(s.type));

  if (!open) {
    return (
      <div className="flex justify-center pt-2">
        <button
          onClick={() => setOpen(true)}
          className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md min-h-[44px]"
          style={{ background: "linear-gradient(135deg, #D4930D 0%, #e8a520 50%, #f0c060 100%)" }}
        >
          <Plus className="w-4.5 h-4.5" /> {t("addContent")}
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border p-4 space-y-2" style={{ borderColor: BRAND.border }}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-semibold" style={{ color: BRAND.text }}>{t("addContentTitle")}</span>
        <button onClick={() => setOpen(false)} className="text-xs hover:opacity-70" style={{ color: BRAND.textSecondary }}>✕</button>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {allowed.map((section) => {
          const exists = existingTypes.includes(section.type) && section.type !== "custom";
          return (
            <button
              key={section.type}
              onClick={() => { onAdd(section.type); setOpen(false); }}
              disabled={exists}
              className={cn(
                "flex items-start gap-2 p-3 rounded-lg text-left transition-all text-sm",
                exists ? "opacity-40 cursor-not-allowed bg-gray-50" : "hover:bg-gray-50 border border-gray-100 hover:border-gray-200"
              )}
            >
              <div className="flex-1 min-w-0">
                <p className="font-medium" style={{ color: exists ? "#9ca3af" : BRAND.text }}>{section.title}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}

/* ── Missing Summary Dialog ────────────────────────────── */
function MissingSummaryDialog({ open, onAdd, onSkip }: { open: boolean; onAdd: () => void; onSkip: () => void }) {
  const t = useT();
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 animate-fade-in" onClick={onSkip}>
      <div className="bg-white rounded-2xl shadow-2xl max-w-[420px] w-[90vw] mx-4 overflow-hidden animate-scale-in" onClick={(e) => e.stopPropagation()}>
        <div className="px-6 pt-6 pb-4">
          <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4" style={{ backgroundColor: BRAND.greenLight }}>
            <Lightbulb className="w-5 h-5" style={{ color: BRAND.green }} />
          </div>
          <h3 className="text-[17px] font-bold mb-2" style={{ color: BRAND.text }}>{t("missingSummaryTitle")}</h3>
          <p className="text-[13px] leading-relaxed mb-3" style={{ color: BRAND.textSecondary }}>{t("missingSummaryDesc")}</p>
          <div className="bg-gray-50 rounded-lg p-3 border border-gray-100">
            <p className="text-[12px] font-semibold mb-1" style={{ color: BRAND.text }}>💡 How to write it:</p>
            <p className="text-[12px] leading-relaxed" style={{ color: BRAND.textSecondary }}>{t("missingSummaryHow")}</p>
          </div>
        </div>
        <div className="flex gap-3 px-6 pb-6 pt-2">
          <button onClick={onSkip} className="flex-1 py-2.5 rounded-lg text-[13px] font-medium border transition-colors hover:bg-gray-50" style={{ color: BRAND.textSecondary, borderColor: BRAND.border }}>
            {t("missingSummarySkip")}
          </button>
          <button onClick={onAdd} className="flex-1 py-2.5 rounded-lg text-[13px] font-semibold text-white transition-colors hover:opacity-90" style={{ backgroundColor: BRAND.green }}>
            {t("missingSummaryAdd")}
          </button>
        </div>
      </div>
    </div>
  );
}

/* ── Simple Customize Panel ────────────────────────────── */
function SimpleCustomizePanel({ customize, onChange }: { customize: CustomizeSettings; onChange: (u: Partial<CustomizeSettings>) => void }) {
  const t = useT();
  const [open, setOpen] = useState(false);

  return (
    <div className="bg-white rounded-xl shadow-sm border overflow-hidden" style={{ borderColor: BRAND.border }}>
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between px-4 py-3 hover:bg-gray-50/50 transition-colors">
        <div className="flex items-center gap-2">
          <Settings2 className="w-4 h-4" style={{ color: BRAND.textSecondary }} />
          <span className="text-sm font-semibold" style={{ color: BRAND.text }}>{t("simpleCustomizeTitle")}</span>
        </div>
        <ChevronDown className={cn("w-4 h-4 transition-transform duration-200", open && "rotate-180")} style={{ color: BRAND.textSecondary }} />
      </button>

      {open && (
        <div className="px-4 pb-4 space-y-4 border-t" style={{ borderColor: BRAND.border }}>
          {/* Font Size */}
          <div className="pt-3">
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold" style={{ color: BRAND.text }}>{t("fontSizeLabel")}</label>
              <span className="text-xs font-mono px-2 py-0.5 bg-gray-100 rounded" style={{ color: BRAND.textSecondary }}>{customize.fontSize}pt</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onChange({ fontSize: Math.max(8, customize.fontSize - 0.5) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Minus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
              <input type="range" min={8} max={14} step={0.5} value={customize.fontSize}
                onChange={(e) => onChange({ fontSize: parseFloat(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-700"
              />
              <button onClick={() => onChange({ fontSize: Math.min(14, customize.fontSize + 0.5) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Plus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
            </div>
          </div>

          {/* Line Height */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold" style={{ color: BRAND.text }}>{t("lineHeightLabel")}</label>
              <span className="text-xs font-mono px-2 py-0.5 bg-gray-100 rounded" style={{ color: BRAND.textSecondary }}>{customize.lineHeight.toFixed(1)}</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onChange({ lineHeight: Math.max(1.0, +(customize.lineHeight - 0.1).toFixed(1)) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Minus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
              <input type="range" min={1.0} max={2.0} step={0.1} value={customize.lineHeight}
                onChange={(e) => onChange({ lineHeight: parseFloat(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-700"
              />
              <button onClick={() => onChange({ lineHeight: Math.min(2.0, +(customize.lineHeight + 0.1).toFixed(1)) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Plus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
            </div>
          </div>

          {/* Margins */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold" style={{ color: BRAND.text }}>{t("marginsLabel")}</label>
              <span className="text-xs font-mono px-2 py-0.5 bg-gray-100 rounded" style={{ color: BRAND.textSecondary }}>{customize.marginX}mm</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onChange({ marginX: Math.max(8, customize.marginX - 2), marginY: Math.max(8, customize.marginY - 2) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Minus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
              <input type="range" min={8} max={24} step={2} value={customize.marginX}
                onChange={(e) => { const v = parseInt(e.target.value); onChange({ marginX: v, marginY: v }); }}
                className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-700"
              />
              <button onClick={() => onChange({ marginX: Math.min(24, customize.marginX + 2), marginY: Math.min(24, customize.marginY + 2) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Plus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
            </div>
          </div>

          {/* Section Spacing */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="text-xs font-semibold" style={{ color: BRAND.text }}>{t("spacingLabel")}</label>
              <span className="text-xs font-mono px-2 py-0.5 bg-gray-100 rounded" style={{ color: BRAND.textSecondary }}>{customize.sectionSpacing}px</span>
            </div>
            <div className="flex items-center gap-3">
              <button onClick={() => onChange({ sectionSpacing: Math.max(0, customize.sectionSpacing - 1) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Minus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
              <input type="range" min={0} max={12} step={1} value={customize.sectionSpacing}
                onChange={(e) => onChange({ sectionSpacing: parseInt(e.target.value) })}
                className="flex-1 h-1.5 bg-gray-200 rounded-full appearance-none cursor-pointer accent-gray-700"
              />
              <button onClick={() => onChange({ sectionSpacing: Math.min(12, customize.sectionSpacing + 1) })} className="w-7 h-7 rounded-md border flex items-center justify-center hover:bg-gray-50 transition-colors" style={{ borderColor: BRAND.border }}>
                <Plus className="w-3 h-3" style={{ color: BRAND.textSecondary }} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ═════════════════════════════════════════════════════════════
   Main Component — Simplified, Opinionated Builder
   ═════════════════════════════════════════════════════════════ */
const ResumeBuilderSimple = () => {
  const store = useResumeStore();
  const { data, setData, updatePersonalDetails, setSections, updateSection, removeSection } = store;
  const lang = useResumeBuilderLang();
  const t = useT();
  const { importLimitReached, recordImport } = useBuilderAiUsage();
  const navigateTo = useNavigate();
  const { isLoggedIn } = useAuth();
  const [searchParams, setSearchParams] = useSearchParams();
  const localizedSectionTypes = useMemo(() => getLocalizedSectionTypes(lang), [lang]);

  // Always start from locked customize — but allow user tweaks
  const [customizeOverrides, setCustomizeOverrides] = useState<Partial<CustomizeSettings>>({});
  const customize = useMemo(() => ({ ...LOCKED_CUSTOMIZE, ...customizeOverrides }), [customizeOverrides]);
  const handleCustomizeChange = useCallback((updates: Partial<CustomizeSettings>) => {
    setCustomizeOverrides(prev => ({ ...prev, ...updates }));
  }, []);

  // Missing summary prompt state
  const [missingSummaryOpen, setMissingSummaryOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 100, tolerance: 5 } }),
    useSensor(KeyboardSensor)
  );
  const sectionIds = useMemo(() => data.sections.map(s => s.id), [data.sections]);

  const [viewMode, setViewMode] = useState<ViewMode>("dashboard");
  const [activeDocId, setActiveDocId] = useState<string | null>(null);
  const [importing, setImporting] = useState(false);
  const [importType, setImportType] = useState<DocType>("resume");
  const [downloading, setDownloading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editorImportOpen, setEditorImportOpen] = useState(false);
  const isMobile = useIsMobile();
  const [analyzerImporting, setAnalyzerImporting] = useState(false);

  // Auto-import from Resume Analyzer
  const analyzerImportRan = useRef(false);
  useEffect(() => {
    if (analyzerImportRan.current) return;
    const isFromAnalyzer = searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text");
    if (!isFromAnalyzer) return;
    const resumeText = sessionStorage.getItem("analyzer-resume-text");
    if (!resumeText || analyzerImporting) return;

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
        if (importLimitReached) {
          toast({ title: lang === "zh-tw" ? "本月 AI 匯入額度已用完" : "Monthly AI import limit reached", description: lang === "zh-tw" ? "每月限 2 次 AI 匯入。額度下月初重置。" : "You can import up to 2 resumes per month with AI. Resets next month.", variant: "destructive" });
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
        const doc = createDocument("resume", parsed.personalDetails?.fullName ? `${parsed.personalDetails.fullName} Resume` : "Imported Resume");
        updateDocument(doc.id, { data: parsed, settings: customize });
        store.setData(parsed);
        recordImport();
        setActiveDocId(doc.id);
        setViewMode("resume-editor");
        checkMissingSummary(parsed);
        toast({ title: "Resume imported!", description: "Your resume has been imported. Edit and download below." });
        setSearchParams({}, { replace: true });
      } catch (e) {
        console.error("Analyzer import error:", e);
        toast({ title: "Import failed", description: "Something went wrong.", variant: "destructive" });
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
  }, [data.sections, pushHistory, setSections]);

  const undo = useCallback(() => {
    const { past, future } = historyRef.current;
    if (past.length === 0) return;
    future.push(JSON.stringify(data));
    store.setData(JSON.parse(past.pop()!));
  }, [data, store]);

  const redo = useCallback(() => {
    const { past, future } = historyRef.current;
    if (future.length === 0) return;
    past.push(JSON.stringify(data));
    store.setData(JSON.parse(future.shift()!));
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
  }, [data, activeDocId, viewMode]);

  // Keyboard shortcuts
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && e.key === "z" && !e.shiftKey) { e.preventDefault(); undo(); }
      if (mod && e.key === "z" && e.shiftKey) { e.preventDefault(); redo(); }
      if (mod && (e.key === "s" || e.key === "p")) { e.preventDefault(); handleDownload(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, activeDocId, data]);

  // Unsaved work guard
  useEffect(() => {
    if (viewMode !== "resume-editor") return;
    const handler = (e: BeforeUnloadEvent) => { e.preventDefault(); e.returnValue = ""; };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [viewMode]);

  const handleOpenDocument = useCallback((doc: SavedDocument) => {
    setLoading(true);
    setActiveDocId(doc.id);
    if (doc.type === "resume") {
      store.setData(doc.data as any);
      // Always force locked customize
      setViewMode("resume-editor");
      historyRef.current = { past: [], future: [] };
    }
    setTimeout(() => setLoading(false), 300);
  }, [store]);

  const handleImport = (type: DocType) => { setImportType(type); setImporting(true); };

  const handleBackToDashboard = () => {
    if (activeDocId && viewMode === "resume-editor") {
      updateDocument(activeDocId, { data, settings: customize });
    }
    setViewMode("dashboard");
    setActiveDocId(null);
  };

  const activeDoc = activeDocId ? getAllDocuments().find((d) => d.id === activeDocId) : null;

  const handleDownload = async (filename?: string) => {
    if (downloading) return;
    setDownloading(true);
    const fn = filename || (data.personalDetails.fullName || "Resume").replace(/\s+/g, "_") + "_Resume";
    try {
      await exportResumePdfServer({
        data,
        customize,
        fileName: fn,
      });
    } catch (err: any) {
      console.error("PDF export error:", err?.message, err?.stack);
      toast({
        title: lang === "zh-tw" ? "下載失敗" : "Download failed",
        description: lang === "zh-tw"
          ? "PDF 產生時發生錯誤。請再試一次。"
          : "Something went wrong while preparing your download. Please try again.",
        variant: "destructive",
        action: (
          <ToastAction altText={lang === "zh-tw" ? "重試" : "Try again"} onClick={() => handleDownload(filename)}>
            {lang === "zh-tw" ? "重試" : "Try again"}
          </ToastAction>
        ),
      });
    }
    setDownloading(false);
  };

  const addSection = (type: string) => {
    pushHistory();
    const meta = localizedSectionTypes.find((s) => s.type === type);
    const newSection: ResumeSection = {
      id: crypto.randomUUID(),
      type,
      title: meta?.title || "Section",
      entries: [{ id: crypto.randomUUID(), fields: getDefaultFieldsForType(type) }],
      collapsed: false,
    };
    setSections([...data.sections, newSection]);
    toast({ title: t("sectionAdded"), description: `${meta?.title || "Section"} ${t("sectionAddedDesc")}` });
  };

  const handleEditSection = useCallback((sectionId: string) => {
    setTimeout(() => {
      const el = document.getElementById(`section-card-${sectionId}`);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
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

  const checkMissingSummary = useCallback((resumeData: any) => {
    const sections = resumeData?.sections || [];
    const hasSummary = sections.some((s: any) => s.type === "summary");
    if (!hasSummary && sections.length > 0) {
      setTimeout(() => setMissingSummaryOpen(true), 600);
    }
  }, []);

  const handleImported = useCallback((doc: SavedDocument) => {
    if (doc.type === "resume") {
      store.setData(doc.data as any);
      updateDocument(doc.id, { settings: customize });
      setActiveDocId(doc.id);
      setViewMode("resume-editor");
      historyRef.current = { past: [], future: [] };
      checkMissingSummary(doc.data);
    }
  }, [store, customize, checkMissingSummary]);

  const handleEditorImported = useCallback((doc: SavedDocument) => {
    if (doc.type === "resume") {
      pushHistory();
      store.setData(doc.data as any);
      toast({ title: t("contentImported"), description: t("contentImportedDesc") });
      checkMissingSummary(doc.data);
    }
    setEditorImportOpen(false);
  }, [store, pushHistory, checkMissingSummary]);

  const handleAddSummaryFromPrompt = useCallback(() => {
    setMissingSummaryOpen(false);
    addSection("summary");
    // Scroll to the new summary section after a brief delay
    setTimeout(() => {
      const summarySection = data.sections.find(s => s.type === "summary");
      if (summarySection) {
        const el = document.getElementById(`section-card-${summarySection.id}`);
        el?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    }, 300);
  }, [addSection, data.sections]);

  const handleRenameSave = () => {
    if (activeDocId && nameValue.trim()) renameDocument(activeDocId, nameValue.trim());
    setEditingName(false);
  };

  if (analyzerImporting) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4" style={{ backgroundColor: BRAND.cream }}>
        <Loader2 className="w-8 h-8 animate-spin" style={{ color: BRAND.gold }} />
        <p className="text-sm font-medium" style={{ color: BRAND.text }}>Importing your resume...</p>
      </div>
    );
  }

  if (viewMode === "dashboard") {
    return (
      <>
        <DocumentDashboard onOpenDocument={handleOpenDocument} onImport={handleImport} />
        <ImportModal open={importing} onClose={() => setImporting(false)} type={importType} onImported={handleImported} />
      </>
    );
  }

  // Resume editor — content only, no customize/AI tabs
  const currentDocName = activeDoc?.name || "Resume";

  const editorContent = loading ? (
    <EditorSkeleton />
  ) : (
    <div className="animate-fade-in">
      <div className="max-w-2xl mx-auto p-3 sm:p-4 md:p-6 space-y-3">
        {/* Import content link */}
        <div className="flex items-center justify-end mb-1">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button onClick={() => setEditorImportOpen(true)} className="flex items-center gap-1.5 text-xs font-medium transition-colors hover:opacity-80" style={{ color: BRAND.textSecondary }}>
                  <Upload className="w-3.5 h-3.5" /> {t("importContent")}
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">{t("importFromFile")}</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {/* Personal Details */}
        <div id="personal-details-card" className="transition-all">
          <PersonalDetailsCard details={data.personalDetails} onChange={(u) => { pushHistory(); updatePersonalDetails(u); }} />
        </div>

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
                          onClick={() => { const restored = [...data.sections]; restored.splice(idx, 0, removed); setSections(restored); }}
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

        {/* Simple customize controls */}
        <SimpleCustomizePanel customize={customize} onChange={handleCustomizeChange} />

        <DesignPhilosophy />

        <CompletenessScore data={data} onNavigate={(target) => {
          setTimeout(() => {
            if (target === "personal") {
              const el = document.getElementById("personal-details-card");
              if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); el.classList.add("ring-2", "ring-amber-400/70"); setTimeout(() => el.classList.remove("ring-2", "ring-amber-400/70"), 1200); }
              return;
            }
            const section = data.sections.find(s => s.type === target);
            if (section) {
              const el = document.getElementById(`section-card-${section.id}`);
              if (el) { el.scrollIntoView({ behavior: "smooth", block: "start" }); el.classList.add("ring-2", "ring-amber-400/70"); setTimeout(() => el.classList.remove("ring-2", "ring-amber-400/70"), 1200); }
            }
          }, 100);
        }} />

        {/* Analyzer CTA */}
        <AnalyzerCTA fromAnalyzer={searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text")} resumeData={data} />

        {/* Inline add section — limited to 6 types */}
        <AddSectionInline onAdd={addSection} existingTypes={data.sections.map((s) => s.type)} />
      </div>
    </div>
  );

  return (
    <div className="h-screen flex flex-col overflow-x-hidden" style={{ backgroundColor: BRAND.cream }}>
      <SEO />
      {/* ── Top bar — cream nav matching analyzer ──────────────── */}
      <div className="sticky top-0 z-30" style={{ backgroundColor: BRAND.cream, borderBottom: '1px solid rgba(43,71,52,0.1)' }}>
        {/* Row 1: Brand + nav */}
        <div className="flex items-center justify-between px-3 sm:px-5 h-12 sm:h-14">
          <Link to={lang === "zh-tw" ? "/zh-tw" : "/"} className="font-heading text-base md:text-lg font-bold tracking-wide whitespace-nowrap" style={{ color: BRAND.green }}>
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-2">
            <Link to={lang === "zh-tw" ? "/zh-tw" : "/"} className="text-sm transition-colors hover:opacity-80 hidden sm:inline" style={{ color: BRAND.textSecondary }}>
              {lang === "zh-tw" ? "← 首頁" : "← Home"}
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                state={{ from: lang === "zh-tw" ? "/zh-tw/resume-simple" : "/resume-simple" }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: BRAND.green, color: BRAND.cream }}
              >
                <LogIn className="w-3.5 h-3.5" />
                {lang === "zh-tw" ? "登入" : "Sign in"}
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to={lang === "zh-tw" ? "/zh-tw/dashboard" : "/dashboard"}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: BRAND.green, color: BRAND.cream }}
              >
                {lang === "zh-tw" ? "我的專區" : "Dashboard"}
              </Link>
            )}
            <button
              onClick={() => navigateTo(lang === "zh-tw" ? "/resume-simple" : "/zh-tw/resume-simple")}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
              style={{ border: `1px solid ${BRAND.gold}`, color: BRAND.gold }}
            >
              {lang === "zh-tw" ? "EN" : "中文"}
            </button>
          </div>
        </div>

        {/* Row 2: doc name + download */}
        <div className="flex items-center justify-between px-3 sm:px-5 pb-2 gap-2">
          <div className="flex items-center gap-2 min-w-0">
            <button onClick={handleBackToDashboard} className="text-xs transition-colors hover:opacity-80 flex-shrink-0" style={{ color: BRAND.textSecondary }}>
              <ArrowLeft className="w-3.5 h-3.5" />
            </button>
            {editingName ? (
              <input autoFocus value={nameValue} onChange={(e) => setNameValue(e.target.value)} onBlur={handleRenameSave}
                onKeyDown={(e) => { if (e.key === "Enter") handleRenameSave(); if (e.key === "Escape") setEditingName(false); }}
                className="text-sm font-medium bg-white border rounded px-2 py-1 outline-none min-w-[100px] max-w-[160px]"
                style={{ color: BRAND.text, borderColor: BRAND.border }}
              />
            ) : (
              <button onClick={() => { setEditingName(true); setNameValue(currentDocName); }}
                className="text-sm font-medium transition-colors truncate max-w-[120px] sm:max-w-[160px] hover:opacity-70"
                style={{ color: BRAND.text }} title={t("clickToRename")}
              >
                {currentDocName}
              </button>
            )}
            <div className="hidden sm:block"><SaveIndicator saving={saving} /></div>
          </div>
          <DownloadDropdown downloading={downloading} pageFormat="a4" docName={currentDocName} onDownload={handleDownload} />
        </div>
      </div>

      {/* ── Editor body ────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        <div className="hidden lg:flex h-full">
          <div className="w-[40%] min-w-[300px] max-w-[480px] flex-shrink-0 h-full overflow-y-auto bg-white border-r" style={{ borderColor: BRAND.border }}>
            {editorContent}
          </div>
          <div className="flex-1 h-full relative">
            <ResumePdfPreview data={data} customize={customize} />
            <div className="absolute bottom-4 left-4 z-20">
              <FeedbackBox subject="Resume Builder Feedback" locale={lang} />
            </div>
          </div>
        </div>

        <div className="lg:hidden h-full overflow-y-auto bg-white">{editorContent}</div>

        {!mobilePreview && (
          <button onClick={() => setMobilePreview(true)}
            className="lg:hidden fixed bottom-24 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl active:scale-95 transition-all"
            style={{ backgroundColor: BRAND.green, border: `1px solid ${BRAND.border}` }} aria-label={t("preview")}
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
        )}

        {mobilePreview && (
          <MobilePreviewOverlay onClose={() => setMobilePreview(false)} onDownload={() => handleDownload()} downloading={downloading}>
            <ResumePdfPreview data={data} customize={customize} />
          </MobilePreviewOverlay>
        )}
      </div>

      {viewMode === "resume-editor" && !isMobile && (
        <UndoRedoBar onUndo={undo} onRedo={redo} canUndo={historyRef.current.past.length > 0} canRedo={historyRef.current.future.length > 0} />
      )}

      <BrandingFooter />
      <ImportModal open={editorImportOpen} onClose={() => setEditorImportOpen(false)} type="resume" onImported={handleEditorImported} />
      <MissingSummaryDialog open={missingSummaryOpen} onAdd={handleAddSummaryFromPrompt} onSkip={() => setMissingSummaryOpen(false)} />
      {viewMode === "resume-editor" && <AnalyzerPromptDialog fromAnalyzer={searchParams.get("from") === "analyzer" || !!sessionStorage.getItem("analyzer-resume-text")} />}
    </div>
  );
};

export default ResumeBuilderSimple;