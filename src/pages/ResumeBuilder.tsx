import { useState, useCallback, useEffect, useRef, useMemo } from "react";
import { DndContext, closestCenter, KeyboardSensor, PointerSensor, useSensor, useSensors, DragEndEvent } from "@dnd-kit/core";
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
import { SavedDocument, DocType, updateDocument, getAllDocuments, renameDocument } from "@/lib/documentStore";
import { applyTemplatePreset } from "@/components/resume-builder/templatePresets";
import { exportToPdf } from "@/lib/pdfExport";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

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
      id: "exp-1",
      type: "experience",
      title: "Professional Experience",
      collapsed: false,
      entries: [
        {
          id: "e1",
          fields: {
            position: "Senior Software Engineer",
            company: "TechCorp Inc.",
            location: "San Francisco, CA",
            startMonth: "March",
            startYear: "2022",
            endMonth: "",
            endYear: "",
            currentlyHere: "true",
            description: "<ul><li>Led development of a microservices architecture serving 2M+ daily active users, improving API response times by 40%</li><li>Mentored a team of 4 junior engineers and established code review best practices</li><li>Designed and implemented a real-time data pipeline processing 500K events/hour using Kafka and Redis</li></ul>",
          },
        },
        {
          id: "e2",
          fields: {
            position: "Software Engineer",
            company: "StartupXYZ",
            location: "San Francisco, CA",
            startMonth: "June",
            startYear: "2020",
            endMonth: "February",
            endYear: "2022",
            currentlyHere: "",
            description: "<ul><li>Built the core payment processing system handling $10M+ in monthly transactions</li><li>Implemented CI/CD pipelines reducing deployment time from 2 hours to 15 minutes</li><li>Developed a React-based dashboard used by 500+ enterprise customers</li></ul>",
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
            degree: "B.S. Computer Science",
            institution: "University of California, Berkeley",
            location: "Berkeley, CA",
            startMonth: "August",
            startYear: "2016",
            endMonth: "May",
            endYear: "2020",
            currentlyHere: "",
            description: "GPA: 3.8/4.0 · Dean's List · Teaching Assistant for Data Structures",
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
          fields: { skills: "TypeScript, React, Node.js, Python, PostgreSQL, Redis, Kafka, Docker, Kubernetes, AWS, CI/CD, System Design" },
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
          <span className="text-gray-400">Saving...</span>
        </>
      ) : (
        <>
          <Check className="w-3 h-3" style={{ color: BRAND.green }} />
          <span className="text-gray-500">All changes saved</span>
        </>
      )}
    </div>
  );
}

/* ── Mobile preview overlay ────────────────────────────── */
function MobilePreviewOverlay({ children, onClose, onDownload, downloading }: { children: React.ReactNode; onClose: () => void; onDownload?: () => void; downloading?: boolean }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-fade-in">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200" style={{ backgroundColor: BRAND.cream }}>
        <span className="text-sm font-semibold" style={{ color: BRAND.text }}>Preview</span>
        <div className="flex items-center gap-3">
          {onDownload && (
            <button
              onClick={onDownload}
              disabled={downloading}
              className="flex items-center gap-1.5 text-sm font-medium hover:opacity-80 transition-opacity"
              style={{ color: BRAND.green }}
            >
              {downloading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Download className="w-4 h-4" />}
              {downloading ? "..." : "Download"}
            </button>
          )}
          <button onClick={onClose} className="text-sm font-medium hover:opacity-80 transition-opacity" style={{ color: BRAND.gold }}>Close</button>
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
  return (
    <div className="py-3 px-4 text-center border-t bg-white" style={{ borderColor: BRAND.border }}>
      <p className="text-[11px]" style={{ color: BRAND.textSecondary }}>
        Powered by{" "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 font-medium transition-opacity" style={{ color: BRAND.gold }}>
          james.careers
        </a>
        {" · "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-80 transition-colors" style={{ color: BRAND.textSecondary }}>
          Need resume help? Get expert feedback →
        </a>
      </p>
    </div>
  );
}

/* ── Download dropdown ─────────────────────────────────── */
function DownloadDropdown({ downloading, pageFormat, docName, onDownload }: {
  downloading: boolean; pageFormat: string; docName: string; onDownload: (filename: string) => void;
}) {
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
        {downloading ? "Generating..." : "Download"}
      </Button>

      {open && !downloading && (
        <div className="absolute right-0 top-full mt-2 bg-white rounded-xl shadow-xl border z-30 w-[280px] p-4 animate-scale-in" style={{ borderColor: BRAND.border }}>
          <div className="space-y-3">
            <div>
              <label className="block text-xs font-semibold mb-1" style={{ color: BRAND.textSecondary }}>Filename</label>
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
              <span className="text-xs font-medium" style={{ color: BRAND.textSecondary }}>Paper size</span>
              <span className="text-xs font-semibold" style={{ color: BRAND.text }}>
                {pageFormat === "letter" ? "US Letter" : "A4"}
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
              Download PDF
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
  const { data, customize, updateCustomize, updatePersonalDetails, setSections, updateSection, removeSection } = store;

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
  const [saving, setSaving] = useState(false);
  const [loading, setLoading] = useState(false);
  const [mobilePreview, setMobilePreview] = useState(false);
  const [templatePickerOpen, setTemplatePickerOpen] = useState(false);
  const [pendingImportDocId, setPendingImportDocId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState(false);
  const [nameValue, setNameValue] = useState("");
  const [editorImportOpen, setEditorImportOpen] = useState(false);
  const isMobile = useIsMobile();

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
    setDownloading(true);
    const pf = customize.pageFormat || "a4";
    const fn = filename || (data.personalDetails.fullName || "Resume").replace(/\s+/g, "_") + "_Resume";
    await exportToPdf({
      elementId: "resume-pdf-target",
      fileName: fn,
      pageFormat: pf as "a4" | "letter",
    });
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
    const meta = SECTION_TYPES.find((s) => s.type === type);
    const newSection: ResumeSection = {
      id: crypto.randomUUID(),
      type,
      title: meta?.title || "Custom Section",
      entries: [{ id: crypto.randomUUID(), fields: getDefaultFieldsForType(type) }],
      collapsed: false,
    };
    setSections([...data.sections, newSection]);
    toast({ title: "Section added", description: `${meta?.title || "Custom"} section added.` });
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

  const handleImported = useCallback((doc: SavedDocument) => {
    if (doc.type === "resume") {
      const classicSettings = applyTemplatePreset(doc.settings as any, "classic");
      store.setData(doc.data as any);
      store.updateCustomize(classicSettings);
      updateDocument(doc.id, { settings: classicSettings });
      setActiveDocId(doc.id);
      setViewMode("resume-editor");
      setActiveTab("content");
      historyRef.current = { past: [], future: [] };
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
      toast({ title: "Content imported", description: "Your resume content has been replaced with the imported data." });
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
            <ArrowLeft className="w-3.5 h-3.5" /> Dashboard
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
      <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-3">
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
                  Import content
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Import from file (PDF, DOCX)</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

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
                      title: "Section removed",
                      description: `${removed.title} was deleted.`,
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
                          Undo
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
            <p className="text-sm" style={{ color: BRAND.textSecondary }}>Add sections to build your resume</p>
          </div>
        )}

        {/* Add Content button — gradient pill */}
        <div className="flex justify-center pt-2">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => setModalOpen(true)}
                  className="flex items-center justify-center gap-2 px-8 py-3 rounded-full text-white font-semibold text-sm transition-all hover:opacity-90 active:scale-[0.98] shadow-md"
                  style={{ background: "linear-gradient(135deg, #D4930D 0%, #e8a520 50%, #f0c060 100%)" }}
                >
                  <Plus className="w-4.5 h-4.5" /> Add Content
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Add a new section</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>
    </div>
  ) : activeTab === "customize" ? (
    <div className="animate-fade-in">
      <CustomizePanel settings={customize} onChange={updateCustomize} sections={data.sections} resumeData={data} />
    </div>
  ) : null;

  return (
    <div className="h-screen flex flex-col" style={{ backgroundColor: BRAND.cream }}>
      {/* ── Simplified top bar ─────────────────────────── */}
      <div className="sticky top-0 z-30 flex items-center justify-between bg-white border-b px-4 h-14" style={{ borderColor: BRAND.border }}>
        {/* Left: Back + editable name */}
        <div className="flex items-center gap-3 min-w-0">
          <TooltipProvider delayDuration={300}>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={handleBackToDashboard}
                  className="flex items-center gap-1 text-sm transition-colors flex-shrink-0 hover:opacity-80"
                  style={{ color: BRAND.textSecondary }}
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Dashboard</span>
                </button>
              </TooltipTrigger>
              <TooltipContent side="bottom" className="text-xs">Back to dashboard</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <span className="text-gray-300">|</span>
          {editingName ? (
            <input
              autoFocus
              value={nameValue}
              onChange={(e) => setNameValue(e.target.value)}
              onBlur={handleRenameSave}
              onKeyDown={(e) => { if (e.key === "Enter") handleRenameSave(); if (e.key === "Escape") setEditingName(false); }}
              className="text-sm font-medium bg-gray-50 border rounded px-2 py-1 outline-none min-w-[120px]"
              style={{ color: BRAND.text, borderColor: BRAND.border }}
            />
          ) : (
            <button
              onClick={() => { setEditingName(true); setNameValue(currentDocName); }}
              className="text-sm font-medium transition-colors truncate max-w-[160px] hover:opacity-70"
              style={{ color: BRAND.text }}
              title="Click to rename"
            >
              {currentDocName}
            </button>
          )}
        </div>

        {/* Center: Content | Customize toggle */}
        <div className="flex items-center gap-0.5 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setActiveTab("content")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "content"
                ? "bg-white shadow-sm"
                : "hover:opacity-80"
            )}
            style={{ color: activeTab === "content" ? BRAND.text : BRAND.textSecondary }}
          >
            <FileText className="w-3.5 h-3.5" />
            Content
          </button>
          <button
            onClick={() => setActiveTab("customize")}
            className={cn(
              "flex items-center gap-1.5 px-4 py-1.5 rounded-md text-sm font-medium transition-all",
              activeTab === "customize"
                ? "bg-white shadow-sm"
                : "hover:opacity-80"
            )}
            style={{ color: activeTab === "customize" ? BRAND.text : BRAND.textSecondary }}
          >
            <Palette className="w-3.5 h-3.5" />
            Customize
          </button>
        </div>

        {/* Right: Save indicator + Download */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <SaveIndicator saving={saving} />
          </div>
          <DownloadDropdown
            downloading={downloading}
            pageFormat={customize.pageFormat || "a4"}
            docName={currentDocName}
            onDownload={handleDownload}
          />
        </div>
      </div>

      {/* ── Editor body ────────────────────────────────── */}
      <div className="flex-1 overflow-hidden">
        {/* Desktop: 40/60 split */}
        <div className="hidden lg:flex h-full">
          <div className="w-[40%] min-w-[340px] max-w-[480px] flex-shrink-0 h-full overflow-y-auto bg-white border-r" style={{ borderColor: BRAND.border }} ref={editorScrollRef}>
            {editorContent}
          </div>
          <div className="flex-1 h-full">
            <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} onColorChange={(f, c) => updateCustomize({ [f]: c } as any)} />

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
            className="lg:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full shadow-lg flex items-center justify-center hover:shadow-xl active:scale-95 transition-all"
            style={{ backgroundColor: BRAND.green, border: `1px solid ${BRAND.border}` }}
            title="Preview"
          >
            <Eye className="w-5 h-5 text-white" />
          </button>
        )}

        {/* Mobile preview overlay */}
        {mobilePreview && (
          <MobilePreviewOverlay onClose={() => setMobilePreview(false)} onDownload={() => handleDownload()} downloading={downloading}>
            <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} onColorChange={(f, c) => updateCustomize({ [f]: c } as any)} />
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
    </div>
  );
};

export default ResumeBuilder;
