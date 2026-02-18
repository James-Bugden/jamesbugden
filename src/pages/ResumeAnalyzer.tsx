import { useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Upload, FileText, Sparkles, BarChart3, CloudUpload, X, Check, Lock, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import ResumeResults from "@/components/resume-analyzer/ResumeResults";
import type { AnalysisResult } from "@/components/resume-analyzer/types";
import jamesPhoto from "@/assets/james-bugden.jpg";


type Screen = "upload" | "analyzing" | "email-gate" | "results";
type Language = "en" | "zh-TW";
type InputMethod = "upload_pdf" | "upload_docx" | "paste";

const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

export default function ResumeAnalyzer() {
  const [lang, setLang] = useState<Language>("en");
  const [screen, setScreen] = useState<Screen>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [inputMethod, setInputMethod] = useState<InputMethod>("paste");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [gateName, setGateName] = useState("");
  const [gateEmail, setGateEmail] = useState("");
  const [gateError, setGateError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasAnalyzed, setHasAnalyzed] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const analyzeSteps = [
    t(lang, "Extracting resume content...", "擷取履歷內容..."),
    t(lang, "Analyzing header & contact info...", "分析聯絡資訊..."),
    t(lang, "Evaluating work experience...", "評估工作經驗..."),
    t(lang, "Checking ATS compatibility...", "檢查 ATS 相容性..."),
    t(lang, "Generating your personalized report...", "產生個人化報告..."),
  ];

  const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js";
    const arrayBuffer = await file.arrayBuffer();
    const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => item.str).join(" ") + "\n";
    }
    return text.trim();
  }, []);

  const extractTextFromDOCX = useCallback(async (file: File): Promise<string> => {
    const mammoth = await import("mammoth");
    const arrayBuffer = await file.arrayBuffer();
    const result = await mammoth.extractRawText({ arrayBuffer });
    return result.value.trim();
  }, []);

  const handleFileSelect = useCallback((selectedFile: File) => {
    const ext = selectedFile.name.split(".").pop()?.toLowerCase();
    if (!["pdf", "docx"].includes(ext || "")) {
      setError(t(lang, "Please upload a PDF or DOCX file.", "請上傳 PDF 或 DOCX 檔案。"));
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError(t(lang, "File size must be under 5MB.", "檔案大小須小於 5MB。"));
      return;
    }
    setFile(selectedFile);
    setInputMethod(ext === "pdf" ? "upload_pdf" : "upload_docx");
    setError("");
  }, [lang]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const handleAnalyze = useCallback(async () => {
    if (hasAnalyzed) {
      setError(t(lang, "You've already analyzed a resume in this session. Use a different browser or try again later.", "你已在此次瀏覽中分析過履歷。請使用其他瀏覽器或稍後再試。"));
      return;
    }

    setError("");
    setScreen("analyzing");
    setAnalyzeStep(0);
    setProgress(0);

    try {
      // Extract text
      let text = "";
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext === "pdf") {
          text = await extractTextFromPDF(file);
        } else {
          text = await extractTextFromDOCX(file);
        }
      } else {
        text = pasteText.trim();
      }

      if (text.length < 100) {
        if (file) {
          setError(t(lang, "This appears to be a scanned PDF. Please upload a text-based document or paste your resume text instead.", "這似乎是掃描的 PDF。請上傳文字版文件或直接貼上履歷內容。"));
        } else {
          setError(t(lang, "Resume text is too short. Please paste your full resume.", "履歷內容太短。請貼上完整的履歷。"));
        }
        setScreen("upload");
        return;
      }

      setResumeText(text);

      // Animate steps
      const stepInterval = setInterval(() => {
        setAnalyzeStep(prev => {
          if (prev < 3) return prev + 1;
          return prev;
        });
      }, 1200);

      const progressInterval = setInterval(() => {
        setProgress(prev => {
          if (prev < 70) return prev + 2;
          return prev;
        });
      }, 100);

      // Call edge function
      const { data, error: fnError } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText: text, language: lang },
      });

      clearInterval(stepInterval);
      clearInterval(progressInterval);

      if (fnError || data?.error) {
        throw new Error(data?.error || fnError?.message || "Analysis failed");
      }

      setAnalysisResult(data as AnalysisResult);
      setAnalyzeStep(4);
      setProgress(100);
      setHasAnalyzed(true);

      // Brief pause at 100% then transition
      setTimeout(() => setScreen("email-gate"), 800);

    } catch (err: any) {
      console.error("Analysis error:", err);
      setError(t(lang, "Something went wrong with the analysis. Please try again.", "分析過程發生錯誤。請再試一次。"));
      setScreen("upload");
    }
  }, [file, pasteText, lang, hasAnalyzed, extractTextFromPDF, extractTextFromDOCX]);

  const handleUnlock = useCallback(async () => {
    const trimmedEmail = gateEmail.trim();
    const trimmedName = gateName.trim() || "Anonymous";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setGateError(t(lang, "Please enter a valid email address.", "請輸入有效的電子信箱。"));
      return;
    }

    setIsSubmitting(true);
    setGateError("");

    try {
      // Upload file if exists
      let fileUrl: string | null = null;
      if (file) {
        const ext = file.name.split(".").pop();
        const path = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
        const { error: uploadError } = await supabase.storage
          .from("resume-files")
          .upload(path, file);
        if (!uploadError) {
          fileUrl = path;
        }
      }

      // Save lead
      await supabase.from("resume_leads").insert({
        email: trimmedEmail,
        name: trimmedName,
        resume_text: resumeText,
        resume_file_url: fileUrl,
        analysis_result: analysisResult as any,
        overall_score: analysisResult?.overall_score ? Math.round(analysisResult.overall_score) : null,
        language: lang,
        years_experience: analysisResult?.segmentation?.years_experience,
        seniority_level: analysisResult?.segmentation?.seniority_level,
        current_company_type: analysisResult?.segmentation?.current_company_type,
        industry: analysisResult?.segmentation?.industry,
        target_readiness: analysisResult?.segmentation?.target_readiness,
        input_method: inputMethod,
        user_agent: navigator.userAgent,
      });

      setScreen("results");
    } catch (err) {
      console.error("Save error:", err);
      setGateError(t(lang, "Something went wrong. Please try again.", "出了點問題。請再試一次。"));
    } finally {
      setIsSubmitting(false);
    }
  }, [gateEmail, gateName, lang, file, resumeText, analysisResult, inputMethod]);

  const canSubmit = file || pasteText.trim().length >= 200;

  return (
    <>
      <Helmet>
        <title>{t(lang, "Free Resume Analyzer — AI-Powered Resume Score", "免費履歷分析工具 — AI 驅動的履歷評分")}</title>
        <meta name="description" content={t(lang, "Get a free, instant AI analysis of your resume powered by the same criteria top recruiters use.", "免費獲得即時 AI 履歷分析，基於頂尖招募官實際使用的篩選標準。")} />
      </Helmet>

      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur border-b border-border">
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-14 px-5">
          <Link to="/" className="font-heading text-lg font-bold text-foreground tracking-wide">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              {t(lang, "← Home", "← 首頁")}
            </Link>
            <button
              onClick={() => setLang(lang === "en" ? "zh-TW" : "en")}
              className="text-xs font-semibold px-3 py-1.5 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-all"
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen bg-background">
        {/* SCREEN 1: UPLOAD */}
        {screen === "upload" && (
          <div className="py-8 md:py-14 px-5">
            <div className="container mx-auto max-w-2xl">
              {/* Hero */}
              <div className="text-center mb-8">
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4">
                  {t(lang, "How Strong Is Your Resume?", "你的履歷有多強？")}
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl mx-auto">
                  {t(lang,
                    "I put all my knowledge about resumes into this tool. Get a score and recommendations in 20 seconds.",
                    "我把所有履歷知識都注入了這個工具。20 秒內獲得評分和改善建議。"
                  )}
                </p>
                {/* Authority badge */}
                <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-card border border-border">
                  <img src={jamesPhoto} alt="James Bugden" className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs text-muted-foreground">
                    {t(lang,
                      "Built by James Bugden, Senior Recruiter who has reviewed 20,000+ resumes",
                      "由 James Bugden 打造，審閱超過 20,000 份履歷的資深招募官"
                    )}
                  </span>
                </div>
              </div>

              {/* Upload Area */}
              <div className="bg-card border border-border rounded-2xl p-6 md:p-8 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
                <Tabs defaultValue="upload" className="w-full">
                  <TabsList className="grid w-full grid-cols-2 mb-6">
                    <TabsTrigger value="upload">{t(lang, "Upload File", "上傳檔案")}</TabsTrigger>
                    <TabsTrigger value="paste">{t(lang, "Paste Text", "貼上文字")}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="upload">
                    {!file ? (
                      <div
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => fileInputRef.current?.click()}
                        className="border-2 border-dashed border-border rounded-xl p-10 text-center cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-all"
                      >
                        <CloudUpload className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
                        <p className="text-foreground font-medium mb-1">
                          {t(lang, "Drag & drop your resume here, or click to browse", "拖放你的履歷到這裡，或點擊瀏覽")}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {t(lang, "PDF or DOCX, max 5MB", "PDF 或 DOCX，最大 5MB")}
                        </p>
                        <input
                          ref={fileInputRef}
                          type="file"
                          accept=".pdf,.docx"
                          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
                          className="hidden"
                        />
                      </div>
                    ) : (
                      <div className="flex items-center gap-3 p-4 rounded-xl bg-muted border border-border">
                        <Check className="w-5 h-5 text-executive-green shrink-0" />
                        <FileText className="w-5 h-5 text-muted-foreground shrink-0" />
                        <span className="text-sm text-foreground font-medium truncate flex-1">{file.name}</span>
                        <button onClick={() => { setFile(null); setError(""); }} className="text-muted-foreground hover:text-foreground">
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </TabsContent>

                  <TabsContent value="paste">
                    <div className="relative">
                      <textarea
                        value={pasteText}
                        onChange={(e) => { setPasteText(e.target.value); setFile(null); setError(""); }}
                        placeholder={t(lang, "Paste your full resume text here...", "在此貼上你的完整履歷內容...")}
                        className="w-full min-h-[200px] p-4 rounded-xl border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold/50 text-sm resize-y"
                      />
                      <span className="absolute bottom-3 right-3 text-xs text-muted-foreground">
                        {pasteText.length} {t(lang, "characters", "字元")}
                        {pasteText.length > 0 && pasteText.length < 200 && (
                          <span className="text-destructive ml-1">({t(lang, "min 200", "最少 200")})</span>
                        )}
                      </span>
                    </div>
                  </TabsContent>
                </Tabs>

                {error && (
                  <p className="text-destructive text-sm mt-4 text-center">{error}</p>
                )}

                <Button
                  onClick={handleAnalyze}
                  disabled={!canSubmit}
                  className="w-full mt-6 h-12 text-base font-semibold bg-[#1B3A2F] hover:bg-[#152E25] text-white disabled:opacity-40"
                >
                  {t(lang, "Analyze My Resume", "分析我的履歷")}
                </Button>

                <p className="text-xs text-muted-foreground mt-3 text-center">
                  🔒 {t(lang, "Your resume is analyzed securely. We never sell your data.", "你的履歷將被安全分析。我們絕不販售你的資料。")}
                </p>
                <p className="text-xs text-muted-foreground mt-2 text-center italic">
                  {t(lang, 
                    'Frameworks based on "How to Write the Perfect Resume" by Dan Clay', 
                    '框架基於 Dan Clay 所著《How to Write the Perfect Resume》'
                  )}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 2: ANALYZING */}
        {screen === "analyzing" && (
          <div className="py-20 md:py-32 px-5">
            <div className="container mx-auto max-w-md text-center">
              <div className="relative w-24 h-24 mx-auto mb-8">
                <svg className="w-24 h-24 -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="hsl(var(--border))" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="hsl(var(--gold, 43 65% 59%))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.83} 283`}
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold text-foreground">
                  {progress}%
                </span>
              </div>

              <div className="space-y-3">
                {analyzeSteps.map((step, i) => (
                  <p
                    key={i}
                    className={`text-sm transition-all duration-500 ${
                      i === analyzeStep
                        ? "text-foreground font-medium animate-pulse"
                        : i < analyzeStep
                        ? "text-muted-foreground line-through"
                        : "text-muted-foreground/40"
                    }`}
                  >
                    {i < analyzeStep ? "✓ " : i === analyzeStep ? "→ " : ""}{step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: EMAIL GATE */}
        {screen === "email-gate" && analysisResult && (
          <div className="py-12 md:py-20 px-5">
            <div className="container mx-auto max-w-4xl">
              {/* Blurred preview - full height visible */}
              <div className="relative rounded-xl overflow-hidden">
                <div className="pointer-events-none select-none" aria-hidden>
                  <div style={{ filter: "blur(8px)" }}>
                    <ResumeResults analysis={analysisResult} lang={lang} />
                  </div>
                </div>

                {/* Gate card overlay */}
                <div className="absolute inset-0 flex items-start justify-center pt-12 md:pt-20 bg-background/60">
                  <div className="bg-card border border-border rounded-2xl shadow-xl p-8 max-w-[420px] w-full mx-4 text-center">
                    <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                      <Lock className="w-6 h-6 text-gold" />
                    </div>
                    <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                      {t(lang, "Your Resume Analysis is Ready!", "你的履歷分析已完成！")}
                    </h2>
                    <p className="text-sm text-muted-foreground mb-6">
                      {t(lang,
                        "Enter your email to unlock your full score breakdown, section-by-section feedback, and a free resume template.",
                        "輸入你的 Email 來解鎖完整分數分析、逐項回饋，以及免費履歷模板。"
                      )}
                    </p>

                    <div className="space-y-3">
                      <Input
                        type="email"
                        value={gateEmail}
                        onChange={(e) => { setGateEmail(e.target.value); setGateError(""); }}
                        placeholder="your@email.com"
                        className="h-11"
                      />
                      {gateError && <p className="text-xs text-destructive text-left">{gateError}</p>}
                      <Button onClick={handleUnlock} disabled={isSubmitting} className="w-full h-11 font-semibold">
                        {isSubmitting
                          ? t(lang, "Unlocking...", "解鎖中...")
                          : t(lang, "Unlock My Results", "解鎖我的結果")}
                      </Button>
                    </div>

                    <p className="text-xs text-muted-foreground mt-3">
                      🔒 {t(lang, "We respect your privacy. No spam, ever.", "我們尊重你的隱私。絕不寄送垃圾郵件。")}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: FULL RESULTS */}
        {screen === "results" && analysisResult && (
          <ResumeResults analysis={analysisResult} lang={lang} />
        )}
      </main>
    </>
  );
}
