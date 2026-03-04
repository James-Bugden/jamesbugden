import { useState, useCallback, useEffect, useRef } from "react";
import { Plus, Eye, Undo2, Redo2, Check, Loader2, GripVertical } from "lucide-react";
import { ResumeTopNav } from "@/components/resume-builder/ResumeTopNav";
import { PersonalDetailsCard } from "@/components/resume-builder/PersonalDetailsCard";
import { SectionCard } from "@/components/resume-builder/SectionCard";
import { AddContentModal } from "@/components/resume-builder/AddContentModal";
import { ResumePreview } from "@/components/resume-builder/ResumePreview";
import { CustomizePanel } from "@/components/resume-builder/CustomizePanel";
// CompletenessScore removed for cleaner UX
import { AiToolsPanel } from "@/components/resume-builder/AiToolsPanel";
import { useResumeStore } from "@/components/resume-builder/useResumeStore";
import { SECTION_TYPES, getDefaultFieldsForType, ResumeSection } from "@/components/resume-builder/types";
import { CoverLetterBuilder } from "@/components/cover-letter/CoverLetterBuilder";
import { DocumentDashboard } from "@/components/document-dashboard/DocumentDashboard";
import { ImportModal } from "@/components/document-dashboard/ImportModal";
import { SavedDocument, DocType, updateDocument, getAllDocuments } from "@/lib/documentStore";
import { exportToPdf } from "@/lib/pdfExport";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type ViewMode = "dashboard" | "resume-editor" | "cover-letter-editor";

/* ── Floating undo/redo ────────────────────────────────── */
function UndoRedoBar({ onUndo, onRedo, canUndo, canRedo }: {
  onUndo: () => void; onRedo: () => void; canUndo: boolean; canRedo: boolean;
}) {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex items-center gap-1 bg-white rounded-full shadow-lg border border-gray-200 p-1">
      <button
        onClick={onUndo}
        disabled={!canUndo}
        className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", canUndo ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed")}
        title="Undo (Cmd+Z)"
      >
        <Undo2 className="w-4.5 h-4.5" />
      </button>
      <button
        onClick={onRedo}
        disabled={!canRedo}
        className={cn("w-10 h-10 rounded-full flex items-center justify-center transition-colors", canRedo ? "hover:bg-gray-100 text-gray-700" : "text-gray-300 cursor-not-allowed")}
        title="Redo (Cmd+Shift+Z)"
      >
        <Redo2 className="w-4.5 h-4.5" />
      </button>
    </div>
  );
}

/* ── Auto-save indicator ───────────────────────────────── */
function SaveIndicator({ saving }: { saving: boolean }) {
  return (
    <div className="flex items-center gap-1.5 text-xs text-gray-400">
      {saving ? (
        <>
          <Loader2 className="w-3 h-3 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Check className="w-3 h-3 text-green-500" />
          <span>All changes saved</span>
        </>
      )}
    </div>
  );
}

/* ── Mobile preview overlay ────────────────────────────── */
function MobilePreviewOverlay({ children, onClose }: { children: React.ReactNode; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 bg-white flex flex-col animate-in slide-in-from-bottom duration-300">
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200 bg-gray-50">
        <span className="text-sm font-semibold text-gray-700">Preview</span>
        <button onClick={onClose} className="text-sm font-medium text-pink-600 hover:text-pink-700">Close</button>
      </div>
      <div className="flex-1 overflow-auto">
        {children}
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
  return (
    <div className="py-3 px-4 text-center border-t border-gray-100 bg-white">
      <p className="text-[11px] text-gray-400">
        Powered by{" "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="text-pink-500 hover:text-pink-600 font-medium">
          james.careers
        </a>
        {" · "}
        <a href="https://james.careers" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-gray-600">
          Need resume help? Get expert feedback →
        </a>
      </p>
    </div>
  );
}

const ResumeBuilder = () => {
  const store = useResumeStore();
  const { data, customize, updateCustomize, updatePersonalDetails, setSections, updateSection, removeSection } = store;

  /* ── Section drag-and-drop reordering ────────────────── */
  const sectionDragIdx = useRef<number | null>(null);
  const [sectionOverIdx, setSectionOverIdx] = useState<number | null>(null);

  const handleSectionDragStart = (idx: number) => (e: React.DragEvent) => {
    sectionDragIdx.current = idx;
    e.dataTransfer.effectAllowed = "move";
  };
  const handleSectionDragOver = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setSectionOverIdx(idx);
  };
  const handleSectionDrop = (idx: number) => (e: React.DragEvent) => {
    e.preventDefault();
    const from = sectionDragIdx.current;
    if (from === null || from === idx) { setSectionOverIdx(null); return; }
    pushHistory();
    const updated = [...data.sections];
    const [moved] = updated.splice(from, 1);
    updated.splice(idx, 0, moved);
    setSections(updated);
    sectionDragIdx.current = null;
    setSectionOverIdx(null);
  };
  const handleSectionDragEnd = () => { sectionDragIdx.current = null; setSectionOverIdx(null); };
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
  const isMobile = useIsMobile();

  // Undo/redo via history stack
  const historyRef = useRef<{ past: any[]; future: any[] }>({ past: [], future: [] });

  const pushHistory = useCallback(() => {
    historyRef.current.past.push(JSON.stringify(data));
    if (historyRef.current.past.length > 30) historyRef.current.past.shift();
    historyRef.current.future = [];
  }, [data]);

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

  // Auto-save to multi-doc store
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
      if (mod && e.key === "s") {
        e.preventDefault();
        if (activeDocId) {
          updateDocument(activeDocId, { data, settings: customize });
          toast({ title: "Saved", description: "Document saved." });
        }
      }
      if (mod && e.key === "p") { e.preventDefault(); handleDownload(); }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [undo, redo, activeDocId, data, customize]);

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

  const handleDownload = async () => {
    if (downloading) return;
    setDownloading(true);
    const name = data.personalDetails.fullName || "Resume";
    const pageFormat = (customize as any).pageFormat || "a4";
    await exportToPdf({
      elementId: "resume-pdf-target",
      fileName: `${name.replace(/\s+/g, "_")}_Resume.pdf`,
      pageFormat,
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

  /* Scroll the editor sidebar to a section card when clicking "Edit" on the preview */
  const editorScrollRef = useRef<HTMLDivElement>(null);
  const handleEditSection = useCallback((sectionId: string) => {
    setActiveTab("content");
    // Small delay to let tab switch render
    setTimeout(() => {
      const el = document.getElementById(`section-card-${sectionId}`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  }, []);

  if (viewMode === "dashboard") {
    return (
      <>
        <DocumentDashboard onOpenDocument={handleOpenDocument} onImport={handleImport} />
        <ImportModal open={importing} onClose={() => setImporting(false)} type={importType} onImported={handleOpenDocument} />
      </>
    );
  }

  if (viewMode === "cover-letter-editor") {
    return (
      <div className="h-screen flex flex-col bg-gray-50">
        <div className="flex items-center gap-3 px-4 py-2 bg-gray-100 border-b border-gray-200">
          <button onClick={handleBackToDashboard} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
          <span className="text-sm font-medium text-gray-700">{activeDoc?.name || "Cover Letter"}</span>
        </div>
        <div className="flex-1 overflow-hidden">
          <CoverLetterBuilder docId={activeDocId} />
        </div>
        <BrandingFooter />
      </div>
    );
  }

  // Resume editor
  const editorContent = loading ? (
    <EditorSkeleton />
  ) : activeTab === "content" ? (
    <div className="max-w-2xl mx-auto p-4 md:p-6 space-y-4">
      {/* Resume score removed for cleaner UX */}
      <PersonalDetailsCard details={data.personalDetails} onChange={(u) => { pushHistory(); updatePersonalDetails(u); }} collapsible />
      {data.sections.map((section, idx) => (
        <div
          key={section.id}
          draggable
          onDragStart={handleSectionDragStart(idx)}
          onDragOver={handleSectionDragOver(idx)}
          onDrop={handleSectionDrop(idx)}
          onDragEnd={handleSectionDragEnd}
          className={cn(
            "transition-all duration-150",
            sectionOverIdx === idx && "ring-2 ring-purple-400 ring-offset-2 rounded-xl"
          )}
        >
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
                    className="text-xs font-semibold text-pink-600 hover:text-pink-700 px-2 py-1 rounded bg-pink-50 hover:bg-pink-100"
                  >
                    Undo
                  </button>
                ),
              });
            }}
          />
        </div>
      ))}
      <button
        onClick={() => setModalOpen(true)}
        className="w-full flex items-center justify-center gap-2 py-4 md:py-3.5 rounded-xl text-white font-semibold text-sm bg-gradient-to-r from-[#FF4B6E] to-[#FF6B8A] hover:opacity-90 transition-opacity shadow-md active:scale-[0.98]"
      >
        <Plus className="w-5 h-5" /> Add Content
      </button>
      {data.sections.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-400 text-sm">Your resume is empty. Add sections to get started!</p>
        </div>
      )}
    </div>
  ) : activeTab === "customize" ? (
    <CustomizePanel settings={customize} onChange={updateCustomize} sections={data.sections} />
  ) : (
    <AiToolsPanel data={data} onUpdateData={(d) => { pushHistory(); store.setData(d); }} />
  );

  return (
    <div className="h-screen flex flex-col bg-gray-50">
      {/* Back bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-gray-100 border-b border-gray-200">
        <div className="flex items-center gap-3">
          <button onClick={handleBackToDashboard} className="text-sm text-gray-500 hover:text-gray-700">← Dashboard</button>
          <span className="text-sm font-medium text-gray-700">{activeDoc?.name || "Resume"}</span>
        </div>
        <SaveIndicator saving={saving} />
      </div>

      <ResumeTopNav
        activeTab={activeTab}
        onTabChange={setActiveTab}
        docName={activeDoc?.name || "Resume 1"}
        allDocs={allDocs.filter((d) => d.type === "resume")}
        onDocSwitch={handleDocSwitch}
        onDownload={handleDownload}
        downloading={downloading}
      />

      {activeTab === "ai-tools" ? (
        <div className="flex-1 overflow-y-auto bg-white">
          {editorContent}
        </div>
      ) : (
        <div className="flex-1 overflow-hidden">
          {/* Desktop: fixed 40/60 split */}
          <div className="hidden md:flex h-full">
            <div className="w-[40%] min-w-[340px] max-w-[480px] flex-shrink-0 h-full overflow-y-auto bg-white border-r border-gray-200">
              {editorContent}
            </div>
            <div className="flex-1 h-full">
              <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} />
            </div>
          </div>

          {/* Mobile: editor only + floating preview button */}
          <div className="md:hidden h-full overflow-y-auto bg-white">
            {editorContent}
          </div>

          {/* Mobile floating preview button */}
          {isMobile && !mobilePreview && (
            <button
              onClick={() => setMobilePreview(true)}
              className="md:hidden fixed bottom-20 right-4 z-40 w-14 h-14 rounded-full bg-white shadow-lg border border-gray-200 flex items-center justify-center text-gray-700 hover:shadow-xl active:scale-95 transition-all"
              title="Preview"
            >
              <Eye className="w-5 h-5" />
            </button>
          )}

          {/* Mobile preview overlay */}
          {isMobile && mobilePreview && (
            <MobilePreviewOverlay onClose={() => setMobilePreview(false)}>
              <ResumePreview data={data} customize={customize} pdfTargetId="resume-pdf-target" onEditSection={handleEditSection} />
            </MobilePreviewOverlay>
          )}
        </div>
      )}

      {/* Undo/Redo floating bar */}
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
    </div>
  );
};

export default ResumeBuilder;
