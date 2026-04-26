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
  // Initial loading message, replaced by progress messages from
  // parseResumeWithFallback during the actual import flow.
  const [loadingMessage, setLoadingMessage] = useState(
    tl(lang, "Extracting text…", "正在擷取文字…")
  );
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
          : "We imported what we could, you may need to adjust some sections manually.",
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
      if (import.meta.env.DEV) console.error("Import error:", err);
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
          : "We imported what we could, you may need to adjust some sections manually.",
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
      if (import.meta.env.DEV) console.error("Parse error:", err);
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
      if (ext === "pdf" || ext === "docx" || ext === "doc" || ext === "txt") {
        setSelectedFile(file);
      } else {
        toast({ title: "Unsupported format", description: "Please upload a PDF, DOCX, or TXT file.", variant: "destructive" });
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
          <DialogTitle className="text-[17px] font-semibold text-foreground">
            {tl(lang, "Import Resume", "匯入履歷")}
          </DialogTitle>
          <DialogDescription className="text-[13px] text-muted-foreground mt-1">
            {tl(
              lang,
              "Upload a file or paste text, we'll parse it into editable sections.",
              "上傳檔案或貼上文字, , 我們會解析並轉成可編輯的區塊。"
            )}
          </DialogDescription>
        </DialogHeader>

        {/* Tab switcher */}
        <div className="flex gap-0 mx-6 mt-4 bg-muted rounded-lg p-0.5">
          <button
            onClick={() => setTab("upload")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              tab === "upload"
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Upload className="w-3.5 h-3.5" /> {tl(lang, "Upload File", "上傳檔案")}
          </button>
          <button
            onClick={() => setTab("paste")}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 rounded-md text-[12px] font-medium transition-all ${
              tab === "paste"
                ? "bg-white shadow-sm text-foreground"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <ClipboardPaste className="w-3.5 h-3.5" /> {tl(lang, "Paste Text", "貼上文字")}
          </button>
        </div>

        <input
          ref={fileRef}
          type="file"
          accept=".pdf,.docx,.doc,.txt"
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
                  <AlertTriangle className="w-5 h-5 shrink-0 mt-0.5" style={{ color: "hsl(var(--destructive))" }} />
                  <div>
                    <p className="text-sm font-semibold" style={{ color: "hsl(var(--foreground))" }}>
                      {tl(lang, "Monthly import limit reached", "本月匯入額度已用完")}
                    </p>
                    <p className="text-xs mt-1 leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
                      {tl(lang,
                        `You've used all ${importLimit} free AI imports this month. Your limit resets at the start of next month.`,
                        `你已使用完本月 ${importLimit} 次免費 AI 匯入額度。額度將於下月初重置。`
                      )}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex items-start gap-2 pt-1" style={{ borderTop: "1px solid rgba(0,0,0,0.06)" }}>
                <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "hsl(var(--gold))" }} />
                <p className="text-xs leading-relaxed" style={{ color: "hsl(var(--muted-foreground))" }}>
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
                <Loader2 className="w-7 h-7 animate-spin text-muted-foreground/70" />
                <span className="text-[13px] text-muted-foreground">{loadingMessage}</span>
              </div>
            ) : selectedFile ? (
              <div className="space-y-4">
                {/* Selected file preview */}
                <div className="flex items-center gap-3 p-3 bg-paper-alt rounded-lg border border-border">
                  <div className="w-9 h-9 rounded-lg bg-white border border-border flex items-center justify-center flex-shrink-0">
                    <FileText className="w-4 h-4 text-muted-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] font-medium text-foreground truncate">{selectedFile.name}</p>
                    <p className="text-[11px] text-muted-foreground/70">{(selectedFile.size / 1024).toFixed(0)} KB</p>
                  </div>
                  <button
                    onClick={() => setSelectedFile(null)}
                    className="p-1 rounded-md text-muted-foreground/70 hover:text-muted-foreground hover:bg-muted transition-colors"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                <button
                  onClick={() => handleFile(selectedFile)}
                  className="w-full py-2.5 rounded-lg text-[13px] font-semibold text-white transition-colors"
                  style={{ backgroundColor: "#333", }}
                >
                  {tl(lang, "Import File", "匯入檔案")}
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
                    ? "border-gold bg-muted"
                    : "border-border hover:border-border hover:bg-paper-alt"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <FileUp className="w-5 h-5 text-muted-foreground" />
                </div>
                <div className="text-center">
                  <p className="text-[13px] font-medium text-foreground">
                    {lang === "zh-tw" ? (
                      <>
                        把檔案拖到這裡，或<span className="text-foreground underline">點此瀏覽</span>
                      </>
                    ) : (
                      <>
                        Drop your file here or <span className="text-foreground underline">browse</span>
                      </>
                    )}
                  </p>
                  <p className="text-[11px] text-muted-foreground/70 mt-0.5">
                    {tl(lang, "Supports PDF, DOCX, and TXT", "支援 PDF、DOCX、TXT")}
                  </p>
                </div>
              </div>
            )
          ) : (
            <div className="space-y-3">
              {loading ? (
                <div className="flex flex-col items-center gap-3 py-12">
                  <Loader2 className="w-7 h-7 animate-spin text-muted-foreground/70" />
                  <span className="text-[13px] text-muted-foreground">{loadingMessage}</span>
                </div>
              ) : (
                <>
                  <textarea
                    value={pastedText}
                    onChange={(e) => setPastedText(e.target.value)}
                    placeholder={"John Doe\nSoftware Engineer\njohn@example.com · (555) 123-4567\n\nExperience\nSoftware Engineer at Acme Corp\nJan 2020 – Present · San Francisco, CA\n• Built scalable APIs serving 1M+ users\n• Led migration to microservices architecture\n\nEducation\nB.S. Computer Science\nStanford University, 2016-2020\n\nSkills\nJavaScript, TypeScript, React, Node.js, Python"}
                    className="w-full min-h-[220px] p-3 text-[12px] font-mono text-foreground bg-paper-alt border border-border rounded-lg resize-none outline-none focus:border-gold placeholder:text-muted-foreground/60"
                    style={{ lineHeight: 1.6 }}
                  />
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] text-muted-foreground/70">
                      {pastedText.trim()
                        ? tl(
                            lang,
                            `${pastedText.trim().split("\n").length} lines`,
                            `${pastedText.trim().split("\n").length} 行`
                          )
                        : tl(lang, "Paste your resume text above", "在上方貼上你的履歷文字")}
                    </span>
                    <button
                      onClick={handlePaste}
                      disabled={!pastedText.trim()}
                      className="px-4 py-2 rounded-lg text-[13px] font-semibold text-white transition-colors disabled:opacity-40"
                      style={{ backgroundColor: "#333" }}
                    >
                      {tl(lang, "Import Text", "匯入文字")}
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
                <span className="text-[11px] font-medium" style={{ color: "hsl(var(--muted-foreground))" }}>
                  {tl(lang,
                    `${Math.max(0, importLimit - importCount)} of ${importLimit} free AI imports remaining this month`,
                    `本月還剩 ${Math.max(0, importLimit - importCount)}/${importLimit} 次免費 AI 匯入`
                  )}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Heart className="w-3.5 h-3.5 shrink-0 mt-0.5" style={{ color: "hsl(var(--gold))" }} />
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
