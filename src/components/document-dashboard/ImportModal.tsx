import { useState, useRef, useCallback } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Upload, FileText, Loader2, ClipboardPaste, FileUp, X, Heart, AlertTriangle } from "lucide-react";
import { extractTextFromDocx, extractTextFromPdf, parseResumeWithFallback } from "@/lib/documentImport";
import { createDocument, SavedDocument, DocType } from "@/lib/documentStore";
import { DEFAULT_RESUME_DATA } from "@/components/resume-builder/types";
import { toast } from "@/hooks/use-toast";
import { useBuilderAiUsage } from "@/hooks/useBuilderAiUsage";
import { useResumeBuilderLang } from "@/components/resume-builder/i18n";

interface ImportModalProps {
  open: boolean;
  onClose: () => void;
  type: DocType;
  onImported: (doc: SavedDocument) => void;
}

type ImportTab = "upload" | "paste";

const tl = (lang: string, en: string, zh: string) => lang === "zh-tw" ? zh : en;

export function ImportModal({ open, onClose, type, onImported }: ImportModalProps) {
  const lang = useResumeBuilderLang();
  const { importCount, importLimit, importLimitReached, loading: usageLoading } = useBuilderAiUsage();
  const [loading, setLoading] = useState(false);
  const [loadingMessage, setLoadingMessage] = useState("Extracting text…");
  const [tab, setTab] = useState<ImportTab>("upload");
  const [pastedText, setPastedText] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const buildDoc = useCallback(async (text: string, name: string) => {
    const parsed = await parseResumeWithFallback(text, (msg) => setLoadingMessage(msg));

    // Build extras from linkedin/website
    const extras: { id: string; type: string; value: string }[] = [];
    if (parsed.linkedin) extras.push({ id: crypto.randomUUID(), type: "LinkedIn", value: parsed.linkedin });
    if (parsed.website) extras.push({ id: crypto.randomUUID(), type: "Website", value: parsed.website });

    const doc = createDocument(type, name, {
      data: {
        ...DEFAULT_RESUME_DATA,
        personalDetails: {
          ...DEFAULT_RESUME_DATA.personalDetails,
          fullName: parsed.fullName || "",
          professionalTitle: parsed.professionalTitle || "",
          email: parsed.email || "",
          phone: parsed.phone || "",
          location: parsed.location || "",
          extras,
        },
        sections: parsed.sections,
      },
    });

    return { doc, parsed };
  }, [type]);

  const handleFile = async (file: File) => {
    setLoading(true);
    setLoadingMessage("Extracting text…");
    try {
      let text = "";
      const ext = file.name.split(".").pop()?.toLowerCase();

      if (ext === "pdf") {
        text = await extractTextFromPdf(file);
      } else if (ext === "docx" || ext === "doc") {
        text = await extractTextFromDocx(file);
      } else if (ext === "txt") {
        text = await file.text();
      } else {
        toast({ title: "Unsupported format", description: "Please upload a PDF, DOCX, or TXT file.", variant: "destructive" });
        setLoading(false);
        return;
      }

      if (!text.trim()) {
        toast({ title: "No text found", description: "The file appears to be empty or image-only. Try pasting the text instead.", variant: "destructive" });
        setLoading(false);
        return;
      }

      setLoadingMessage("Analyzing structure…");
      const { doc, parsed } = await buildDoc(text, file.name.replace(/\.[^.]+$/, ""));
      const sectionCount = parsed.sections.length;

      const sourceLabel = parsed.source === "ai" ? "AI import" : "Heuristic import";
      toast({
        title: "Imported successfully",
        description: sectionCount > 0
          ? `${sourceLabel}: found ${sectionCount} section${sectionCount > 1 ? "s" : ""}. Review and adjust as needed.`
          : "We imported what we could — you may need to adjust some sections manually.",
      });

      if (parsed.warnings.length > 0) {
        toast({
          title: "Import note",
          description: parsed.warnings[0],
        });
      }

      onImported(doc);
      handleClose();
    } catch (err) {
      console.error("Import error:", err);
      toast({ title: "Import failed", description: "Could not extract text from the file. Try pasting the text instead.", variant: "destructive" });
    } finally {
      setLoading(false);
      setSelectedFile(null);
    }
  };

  const handlePaste = async () => {
    const trimmed = pastedText.trim();
    if (!trimmed) {
      toast({ title: "Empty text", description: "Please paste your resume text first.", variant: "destructive" });
      return;
    }

    setLoading(true);
    setLoadingMessage("Analyzing structure…");

    try {
      const { doc, parsed } = await buildDoc(trimmed, "Imported Resume");
      const sectionCount = parsed.sections.length;

      const sourceLabel = parsed.source === "ai" ? "AI import" : "Heuristic import";
      toast({
        title: "Imported successfully",
        description: sectionCount > 0
          ? `${sourceLabel}: found ${sectionCount} section${sectionCount > 1 ? "s" : ""}. Review and adjust as needed.`
          : "We imported what we could — you may need to adjust some sections manually.",
      });

      if (parsed.warnings.length > 0) {
        toast({
          title: "Import note",
          description: parsed.warnings[0],
        });
      }

      onImported(doc);
      handleClose();
    } catch (err) {
      console.error("Parse error:", err);
      toast({ title: "Parse error", description: "Something went wrong parsing the text. Please try again.", variant: "destructive" });
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    setPastedText("");
    setTab("upload");
    setSelectedFile(null);
    setDragActive(false);
    onClose();
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      const ext = file.name.split(".").pop()?.toLowerCase();
      if (ext === "pdf" || ext === "docx" || ext === "doc") {
        setSelectedFile(file);
      } else {
        toast({ title: "Unsupported format", description: "Please upload a PDF or DOCX file.", variant: "destructive" });
      }
    }
  }, []);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
  }, []);

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-[480px] p-0 gap-0 overflow-hidden" style={{ borderRadius: "12px" }}>
        <DialogHeader className="px-6 pt-6 pb-0">
          <DialogTitle className="text-[17px] font-semibold text-gray-900">Import Resume</DialogTitle>
          <DialogDescription className="text-[13px] text-gray-500 mt-1">
            Upload a file or paste text — we'll parse it into editable sections.
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex gap-0 mx-6 mt-4 bg-gray-100 rounded-lg p-0.5">
          <button
            onClick={() => setTab("upload")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              tab === "upload"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> Upload File
          </button>
          <button
            onClick={() => setTab("paste")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              tab === "paste"
                ? "bg-white shadow-sm text-gray-900"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5" /> Paste Text
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.doc"
          className="hidden"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) setSelectedFile(file);
            if (fileRef.current) fileRef.current.value = "";
          }}
        />

        <div className="px-6 pt-4 pb-6">
          {importLimitReached ? (
            /* ── Limit reached state ─────────────────── */
            <div className="space-y-4">
              <div className="rounded-xl p-4 space-y-3" style={{ backgroundColor: "rgba(220,38,38,0.04)", border: "1px solid rgba(220,38,38,0.15)" }}>
                <div className="flex items-start gap-2.5">
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "#dc2626" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "#1A1A1A" }}>
                      {tl(lang, "Monthly import limit reached", "本月匯入額度已用完")}
                    </p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "#6B6B6B" }}>
                      {tl(lang,
                        `You've used all ${importLimit} free AI imports this month. Your limit resets at the start of next month.`,
                        `你已使用完本月 ${importLimit} 次免費 AI 匯入額度。額度將於下月初重置。`
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#D4930D" }} />
                <p className="text-xs leading-relaxed" style={{ color: "#6B6B6B" }}>
                  {tl(lang,
                    "I built this tool by myself as a solo creator. Every import uses AI which costs real money, plus hosting and development costs. These limits help me keep the tool free for everyone. Thank you for understanding! 🙏",
                    "這個工具是我一個人獨力開發的。每次匯入都會使用 AI，產生實際費用，加上主機和開發成本。設定使用上限是為了讓這個工具能繼續免費提供給大家。感謝你的體諒！🙏"
                  )}
                </p>
              </div>
            </div>
          ) : tab === "upload" ? (
            loading ? (
              <div className="flex flex-col items-center gap-3 py-12">
                <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
                <span className="text-[13px] text-gray-500">{loadingMessage}</span>
              </div>
            ) : selectedFile ? (
              <div className="space-y-4">
                {/* Selected file preview */}
                <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <div className="w-9 h-9 rounded-lg bg-white border border-gray-200 flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-gray-500" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-gray-800 truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-gray-400">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1 rounded-md text-gray-400 hover:text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleFile(selectedFile)}
                  className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#333", }}
                >
                  Import File
                </button>
              </div>
            ) : (
              <div
                onClick={() => fileRef.current?.click()}
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                className={`py-12 border-[1.5px] border-dashed rounded-lg flex flex-col items-center gap-2.5 cursor-pointer transition-all ${
                  dragActive
                    ? "border-gray-500 bg-gray-100"
                    : "border-gray-300 hover:border-gray-400 hover:bg-gray-50"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <FileUp className="w-5 h-5 text-gray-500" />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-gray-700">
                    Drop your file here or <span className="text-gray-900 underline">browse</span>
                  </p>
                  <p className="text-[11px] text-gray-400 mt-0.5">Supports PDF and DOCX</p>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Loader2 className="w-7 h-7 animate-spin text-gray-400" />
                  <span className="text-[13px] text-gray-500">{loadingMessage}</span>
                </div>
              ) : (
                <>
                  <textarea
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={"John Doe\nSoftware Engineer\njohn@example.com · (555) 123-4567\n\nExperience\nSoftware Engineer at Acme Corp\nJan 2020 – Present · San Francisco, CA\n• Built scalable APIs serving 1M+ users\n• Led migration to microservices architecture\n\nEducation\nB.S. Computer Science\nStanford University, 2016-2020\n\nSkills\nJavaScript, TypeScript, React, Node.js, Python"}
                    className="w-full min-h-[220px] p-3 text-[12px] font-mono text-gray-800 bg-gray-50 border border-gray-200 rounded-lg resize-none outline-none focus:border-gray-400 placeholder-gray-400"
                    style={{ lineHeight: 1.6 }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-gray-400">
                      {pastedText.trim() ? `${pastedText.trim().split("\n").length} lines` : "Paste your resume text above"}
                    </span>
                    <button
                      onClick={handlePaste}
                      disabled={!pastedText.trim()}
                      className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-colors disabled:opacity-40"
                      style={{ backgroundColor: "#333" }}
                    >
                      Import Text
                    </button>
                  </div>
                </>
              )}
            </div>
          )}

          {/* ── Usage footer (shown when not limit-reached) ── */}
          {!importLimitReached && !loading && !usageLoading && (
            <div className="mt-4 space-y-2.5 pt-3" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
              <div className="flex items-center justify-between">
                <span className="text-[11px] font-medium" style={{ color: "#6B6B6B" }}>
                  {tl(lang,
                    `${Math.max(0, importLimit - importCount)} of ${importLimit} free AI imports remaining this month`,
                    `本月還剩 ${Math.max(0, importLimit - importCount)}/${importLimit} 次免費 AI 匯入`
                  )}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "#D4930D" }} />
                <p className="text-[11px] leading-relaxed" style={{ color: "#9CA3AF" }}>
                  {tl(lang,
                    "I built this tool by myself. Every import uses AI which costs real money. These limits help me keep it free for everyone. 🙏",
                    "這個工具是我一個人開發的。每次匯入都會使用 AI，產生實際費用。設定上限是為了讓工具能繼續免費。🙏"
                  )}
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
