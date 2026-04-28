import { useState, useCallback, useRef, useEffect } from "react";
import { toast } from "@/hooks/use-toast";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Upload, FileText, Sparkles, BarChart3, CloudUpload, X, Check, Lock, ArrowRight, ShieldCheck, ChevronRight, AlertTriangle, LogIn } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import ResumeResults from "@/components/resume-analyzer/ResumeResults";
import { UsageLimitBanner } from "@/components/resume-analyzer/UsageLimitBanner";
import { useAnalyzerUsage } from "@/hooks/useAnalyzerUsage";
import { LimitReachedModal } from "@/components/LimitReachedModal";

import type { AnalysisResult } from "@/components/resume-analyzer/types";
import LogoScroll from "@/components/LogoScroll";
import MicroSurvey from "@/components/feedback/MicroSurvey";
import { useAuth } from "@/contexts/AuthContext";
import { useResumeAnalyses } from "@/hooks/useResumeAnalyses";
import type { SavedAnalysis } from "@/hooks/useResumeAnalyses";
import { renderPdfToImage } from "@/lib/renderPdfToImage";
import pdfjsWorkerUrl from "pdfjs-dist/build/pdf.worker.min.mjs?url";
import jamesPhoto from "@/assets/james-bugden.jpg";
import { SEO } from "@/components/SEO";
import { trackTool, trackError } from "@/lib/analytics";


type Screen = "upload" | "analyzing" | "results" | "history";
type Language = "en" | "zh-TW";
type InputMethod = "upload_pdf" | "upload_docx" | "upload_txt" | "paste";

const t = (lang: Language, en: string, zh: string) => lang === "en" ? en : zh;

export default function ResumeAnalyzer({ defaultLang = "en" }: { defaultLang?: Language }) {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { isLoggedIn, user } = useAuth();
  const { latest, analyses, loading: analysesLoading, saveAnalysis } = useResumeAnalyses();
  const { used, limit, limitReached, recordUsage } = useAnalyzerUsage();
  const [lang, setLang] = useState<Language>(defaultLang);
  const [screen, setScreen] = useState<Screen>("upload");
  const [file, setFile] = useState<File | null>(null);
  const [pasteText, setPasteText] = useState("");
  const [resumeText, setResumeText] = useState("");
  const [inputMethod, setInputMethod] = useState<InputMethod>("paste");
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [error, setError] = useState("");
  const [analyzeStep, setAnalyzeStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const [resumeImageUrl, setResumeImageUrl] = useState<string | null>(null);
  const [showMicroSurvey, setShowMicroSurvey] = useState(false);
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [deltaPrev, setDeltaPrev] = useState<SavedAnalysis | null>(null);
  const [deltaIsFirst, setDeltaIsFirst] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  

  // Restore analysis from sessionStorage after auth redirect
  useEffect(() => {
    if (isLoggedIn && !analysisResult) {
      const stored = sessionStorage.getItem("resume-analysis-result");
      const storedLang = sessionStorage.getItem("resume-analysis-lang");
      const storedImg = sessionStorage.getItem("resume-analysis-image");
      if (stored) {
        try {
          setAnalysisResult(JSON.parse(stored));
          if (storedLang) setLang(storedLang as Language);
          if (storedImg) setResumeImageUrl(storedImg);
          setScreen("results");
          sessionStorage.removeItem("resume-analysis-result");
          sessionStorage.removeItem("resume-analysis-lang");
          sessionStorage.removeItem("resume-analysis-image");
        } catch {}
      }
    }
  }, [isLoggedIn, analysisResult]);

  // Load saved report when arriving with ?report=latest or show history
  const reportLoaded = useRef(false);
  useEffect(() => {
    if (searchParams.get("view") === "history" && isLoggedIn) {
      setScreen("history");
      return;
    }
    if (searchParams.get("report") === "latest" && latest?.analysis_result && !reportLoaded.current) {
      reportLoaded.current = true;
      setAnalysisResult(latest.analysis_result as AnalysisResult);
      setResumeImageUrl(latest.resume_image_url ?? null);
      setScreen("results");
    }
  }, [searchParams, latest, isLoggedIn]);


  const autoTriggered = useRef(false);
  useEffect(() => {
    const autoText = sessionStorage.getItem("analyzer-auto-text");
    if (autoText && screen === "upload" && !autoTriggered.current) {
      autoTriggered.current = true;
      sessionStorage.removeItem("analyzer-auto-text");
      setResumeText(autoText);
      setPasteText(autoText);
      setInputMethod("paste");
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // Trigger analysis once pasteText is set from auto-text
  const submitRef = useRef<(() => void) | null>(null);
  useEffect(() => {
    if (autoTriggered.current && pasteText.length >= 100 && screen === "upload") {
      // Use ref to call handleSubmitResume after it's defined
      setTimeout(() => submitRef.current?.(), 50);
    }
  }, [pasteText]); // eslint-disable-line react-hooks/exhaustive-deps

  const analyzeSteps = [
    t(lang, "Extracting resume content...", "擷取履歷內容..."),
    t(lang, "Analyzing header & contact info...", "分析聯絡資訊..."),
    t(lang, "Evaluating work experience...", "評估工作經驗..."),
    t(lang, "Checking ATS compatibility...", "檢查 ATS 相容性..."),
    t(lang, "Generating your personalized report...", "產生個人化報告..."),
  ];

  const extractTextFromPDF = useCallback(async (file: File): Promise<string> => {
    const pdfjsLib = await import("pdfjs-dist");
    pdfjsLib.GlobalWorkerOptions.workerSrc = pdfjsWorkerUrl;
    const pdf = await pdfjsLib.getDocument({
      data: new Uint8Array(await file.arrayBuffer()),
    }).promise;
    let text = "";
    for (let i = 1; i <= pdf.numPages; i++) {
      const page = await pdf.getPage(i);
      const content = await page.getTextContent();
      text += content.items.map((item: any) => ("str" in item ? item.str : "")).join(" ") + "\n";
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
    if (!["pdf", "docx", "txt"].includes(ext || "")) {
      setError(t(lang, "Please upload a PDF, DOCX, or TXT file.", "請上傳 PDF、DOCX 或 TXT 檔案。"));
      trackError("file_upload", `Rejected file type: ${ext || "unknown"}`, {
        metadata: { tool: "resume_analyzer", file_name: selectedFile.name, file_size: selectedFile.size, ext, lang },
      });
      return;
    }
    if (selectedFile.size > 5 * 1024 * 1024) {
      setError(t(lang, "File size must be under 5MB.", "檔案大小須小於 5MB。"));
      trackError("file_upload", `File too large: ${selectedFile.size} bytes`, {
        metadata: { tool: "resume_analyzer", file_name: selectedFile.name, file_size: selectedFile.size, ext, lang },
      });
      return;
    }
    setFile(selectedFile);
    setInputMethod(ext === "pdf" ? "upload_pdf" : ext === "txt" ? "upload_txt" : "upload_docx");
    setError("");
  }, [lang]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) handleFileSelect(droppedFile);
  }, [handleFileSelect]);

  const startAnalysis = useCallback(async (text: string) => {
    setScreen("analyzing");
    setAnalyzeStep(0);
    setProgress(0);

    const stepInterval = setInterval(() => {
      setAnalyzeStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev < 85) return prev + (85 - prev) * 0.04 + 0.3;
        return prev;
      });
    }, 200);

    try {
      const { data, error: fnError } = await supabase.functions.invoke("analyze-resume", {
        body: { resumeText: text, language: lang },
      });

      clearInterval(stepInterval);
      clearInterval(progressInterval);

      if (fnError || data?.error) {
        const status = (fnError as any)?.context?.status;
        const errorMsg = data?.error || fnError?.message || "Analysis failed";
        if (import.meta.env.DEV) console.error("Edge function error:", { status, errorMsg, fnError, data });
        if (status === 429 || data?.error?.includes?.("limit")) {
          throw new Error("RATE_LIMIT");
        }
        throw new Error(errorMsg);
      }

      const result = data as AnalysisResult;
      setAnalysisResult(result);
      setAnalyzeStep(4);
      setProgress(100);
      return result;
    } catch (err: any) {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      const msg = String(err?.message || "");
      if (import.meta.env.DEV) console.error("Analysis error:", msg, err);
      if (msg === "RATE_LIMIT") {
        setError(t(lang, "You've reached your monthly analysis limit. Please try again next month.", "你已達到本月分析上限。請下月再試。"));
      } else {
        setError(t(lang, `Analysis failed: ${msg}. Please try again.`, `分析失敗：${msg}。請再試一次。`));
      }
      setScreen("upload");
      return null;
    }
  }, [lang]);


  // New flow: Upload → Analyzing → Results (no email gate)
  const handleSubmitResume = useCallback(async () => {
    setError("");
    const analyzeStarted = performance.now();
    if (isLoggedIn) {
      setDeltaPrev(latest);
      setDeltaIsFirst(!analysesLoading && analyses.length === 0);
    }
    if (limitReached) {
      trackTool("resume_analyzer", "limit_blocked", { used, limit }, { lang, success: false });
      setShowLimitModal(true);
      return;
    }
    try {
      let text = "";
      if (file) {
        const ext = file.name.split(".").pop()?.toLowerCase();
        if (ext === "pdf") {
          text = await extractTextFromPDF(file);
          // Render first page as image for visual summary
          let savedImageUrl: string | null = null;
          try {
            const imgUrl = await renderPdfToImage(file);
            setResumeImageUrl(imgUrl);
            sessionStorage.setItem("resume-analysis-image", imgUrl);
            // Upload to storage so the image survives page reloads
            if (user) {
              const blob = await (await fetch(imgUrl)).blob();
              const path = `${user.id}/${Date.now()}.jpg`;
              const { error: uploadError } = await supabase.storage
                .from("resume-images")
                .upload(path, blob, { contentType: "image/jpeg", upsert: false });
              if (!uploadError) {
                const { data: signedData } = await supabase.storage
                  .from("resume-images")
                  .createSignedUrl(path, 315360000); // ~10 years
                if (signedData?.signedUrl) {
                  savedImageUrl = signedData.signedUrl;
                  sessionStorage.setItem("resume-analysis-image", signedData.signedUrl);
                  setResumeImageUrl(signedData.signedUrl);
                }
              }
            }
          } catch {
            // Non-critical, continue without image
          }
        } else if (ext === "txt") {
          text = await file.text();
        } else {
          text = await extractTextFromDOCX(file);
        }
        // First-session funnel signal (HIR-64). Fires on every successful
        // resume upload — the v_first_session_tool_action view filters to
        // the user's first authenticated session at read time.
        if (text.length >= 100) {
          trackTool(
            "resume_analyzer",
            "resume_uploaded",
            { input_method: `upload_${ext}`, text_length: text.length },
            { lang },
          );
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
        return;
      }

      setResumeText(text);
      sessionStorage.setItem("analyzer-resume-text", text);
      const result = await startAnalysis(text);
      if (result) {
        recordUsage();
        sessionStorage.setItem("resume-analysis-result", JSON.stringify(result));
        sessionStorage.setItem("resume-analysis-lang", lang);

        // Fire-and-forget analytics tracking, extract name/email from resume text or auth
        const resumeLines = text.split("\n").map(l => l.trim()).filter(Boolean);
        // Only treat first line as name if it looks like one (short, no special chars)
        const looksLikeName = (s: string) => s.length > 0 && s.length < 40 && !/[@|•·]/.test(s) && !/\d{5,}/.test(s);
        const rawName = resumeLines[0] || "";
        const resumeName = looksLikeName(rawName) ? rawName : null;
        // Try to find an email in the resume text
        const emailMatch = text.match(/[\w.+-]+@[\w-]+\.[\w.-]+/);
        const resumeEmail = emailMatch?.[0] || "";
        const leadName = user?.user_metadata?.full_name || user?.user_metadata?.name || resumeName;
        const leadEmail = user?.email || resumeEmail;
        // Extract job title from second line or segmentation
        const rawTitle = resumeLines[1] || "";
        const extractedTitle = (rawTitle.length > 0 && rawTitle.length < 60 && !/[@|•·]/.test(rawTitle) && !/\d{5,}/.test(rawTitle)) ? rawTitle : null;
        const jobTitle = extractedTitle || result.segmentation?.seniority_level || null;
        supabase.from("resume_leads").insert({
          email: leadEmail,
          name: leadName || null,
          job_title: jobTitle,
          language: lang,
          overall_score: result.overall_score ?? null,
          input_method: file ? "upload" : "paste",
          analysis_result: result as any,
          seniority_level: result.segmentation?.seniority_level ?? null,
          industry: result.segmentation?.industry ?? null,
          current_company_type: result.segmentation?.current_company_type ?? null,
          target_readiness: result.segmentation?.target_readiness ?? null,
          years_experience: result.segmentation?.years_experience ?? null,
          user_agent: navigator.userAgent,
          resume_text: text,
        }).then(({ error }) => {
          if (error && import.meta.env.DEV) console.warn("Analytics insert failed:", error.message);
        });

        // Auto-save analysis for logged-in users
        if (isLoggedIn && user) {
          saveAnalysis({
            overall_score: result.overall_score,
            analysis_result: result,
            resume_text: text,
            language: lang,
            resume_image_url: savedImageUrl,
          });
          toast({
            title: t(lang, "Report saved!", "報告已儲存！"),
            description: t(lang,
              "Your analysis report has been saved to your dashboard.",
              "你的分析報告已儲存至你的儀表板。"
            ),
          });
        }

        // Tool completion event, structured outcome for funnel analysis
        trackTool(
          "resume_analyzer",
          "analysis_run",
          {
            overall_score: result.overall_score ?? null,
            input_method: file ? `upload_${file.name.split(".").pop()?.toLowerCase()}` : "paste",
            seniority_level: result.segmentation?.seniority_level ?? null,
            industry: result.segmentation?.industry ?? null,
            text_length: text.length,
            is_logged_in: isLoggedIn,
          },
          { lang, durationMs: Math.round(performance.now() - analyzeStarted), success: true },
        );

        setTimeout(() => {
          setScreen("results");
          setShowMicroSurvey(true);
        }, 800);
      }
    } catch (err: any) {
      if (import.meta.env.DEV) console.error("Extract error:", err);
      const msg = String(err?.message || err || "");
      trackError("ai_call", `Resume analyzer failed: ${msg}`, {
        stack: err?.stack,
        metadata: { tool: "resume_analyzer", input_method: file ? "upload" : "paste", lang },
      });
      trackTool("resume_analyzer", "analysis_run", { error: msg.slice(0, 200) }, { lang, success: false });
      if (/password/i.test(msg)) {
        setError(t(lang,
          "This PDF is password-protected. Please remove the password and re-upload, or paste the text instead.",
          "此 PDF 有密碼保護。請移除密碼後重新上傳，或改用貼上方式。"
        ));
      } else if (/invalid pdf/i.test(msg) || /bad pdf/i.test(msg)) {
        setError(t(lang,
          "This file doesn't appear to be a valid PDF. Please check the file and try again.",
          "此檔案似乎不是有效的 PDF。請檢查檔案後再試。"
        ));
      } else {
        setError(t(lang,
          "Could not read this file. Try a different PDF or paste your resume text instead.",
          "無法讀取此檔案。請換一個 PDF 或改用貼上方式。"
        ));
      }
    }
  }, [file, pasteText, lang, extractTextFromPDF, extractTextFromDOCX, startAnalysis]);

  // Keep submit ref in sync for auto-analyze
  submitRef.current = handleSubmitResume;


  const canSubmit = file || pasteText.trim().length >= 200;

  return (
    <>
      <SEO />

      {/* Header, cream nav matching homepage */}
      <header className="sticky top-0 z-50" style={{ backgroundColor: 'hsl(var(--paper))', borderBottom: '1px solid rgba(43,71,52,0.1)' }}>
        <div className="container mx-auto max-w-5xl flex items-center justify-between h-14 px-5">
          <Link to={lang === "zh-TW" ? "/zh-tw" : "/"} className="font-heading text-base md:text-lg font-bold tracking-wide whitespace-nowrap" style={{ color: 'hsl(var(--executive-green))' }}>
            hiresign
          </Link>
          <div className="flex items-center gap-2">
            <Link to={lang === "zh-TW" ? "/zh-tw" : "/"} className="text-sm transition-colors hover:opacity-80 hidden sm:inline" style={{ color: 'hsl(var(--muted-foreground))' }}>
              {t(lang, "← Home", "← 首頁")}
            </Link>
            {!isLoggedIn && (
              <Link
                to="/login"
                state={{ from: lang === "zh-TW" ? "/zh-tw/resume-analyzer" : "/resume-analyzer" }}
                className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: 'hsl(var(--executive-green))', color: 'hsl(var(--paper))' }}
              >
                <LogIn className="w-3.5 h-3.5" />
                {t(lang, "Sign in", "登入")}
              </Link>
            )}
            {isLoggedIn && (
              <Link
                to={lang === "zh-TW" ? "/zh-tw/dashboard" : "/dashboard"}
                className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                style={{ backgroundColor: 'hsl(var(--executive-green))', color: 'hsl(var(--paper))' }}
              >
                {t(lang, "Dashboard", "我的專區")}
              </Link>
            )}
            <button
              onClick={() => navigate(lang === "en" ? "/zh-tw/resume-analyzer" : "/resume-analyzer")}
              className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:bg-gold hover:text-white"
              style={{ border: '1px solid hsl(var(--gold))', color: 'hsl(var(--gold))' }}
            >
              {lang === "en" ? "中文" : "EN"}
            </button>
          </div>
        </div>
      </header>

      <main className="min-h-screen" style={{ backgroundColor: 'hsl(var(--paper))' }}>
        {/* SCREEN 1: UPLOAD */}
        {screen === "upload" && (
          <div className="py-8 md:py-14 px-5">
            <div className="container mx-auto max-w-2xl">
              {/* Hero */}
              <div className="text-center mb-8">
                <h1
                  className="font-heading mb-4"
                  style={{
                    color: 'hsl(var(--foreground))',
                    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                    lineHeight: lang === "zh-TW" ? 1.2 : 1.1,
                    fontWeight: 700,
                  }}
                >
                  {t(lang, "98% of Resumes Get Ignored.", "98% 的履歷")}
                  <br />
                  {t(lang, "", "沒人看")}
                  {lang === "zh-TW" && <br />}
                  <span style={{ color: 'hsl(var(--gold))' }}>{t(lang, "Fix Yours in 1 Minute.", "1 分鐘幫你修好")}</span>
                </h1>
                <p className="text-base md:text-lg mb-5 max-w-xl mx-auto" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {t(lang, "Start for free.", "免費開始")}
                </p>
                {/* Authority badge */}
                <div
                  className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full"
                  style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.12)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}
                >
                  <img src={jamesPhoto} alt="James Bugden" className="w-7 h-7 rounded-full object-cover" />
                  <span className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
                    {t(lang,
                      "Built by James Bugden, Senior Recruiter who has reviewed 20,000+ resumes",
                      "由 James Bugden 打造，審閱超過 20,000 份履歷的資深招募官"
                    )}
                  </span>
                </div>
              </div>

              {/* Upload Area */}
              <div
                className="rounded-2xl p-6 md:p-8"
                style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 4px 24px rgba(0,0,0,0.08)' }}
              >
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
                        className="border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition-all"
                        style={{ borderColor: 'rgba(43,71,52,0.2)' }}
                        onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'hsl(var(--gold))'; e.currentTarget.style.backgroundColor = 'rgba(212,147,13,0.03)'; }}
                        onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'rgba(43,71,52,0.2)'; e.currentTarget.style.backgroundColor = 'transparent'; }}
                      >
                        <CloudUpload className="w-10 h-10 mx-auto mb-3" style={{ color: 'hsl(var(--muted-foreground))' }} />
                        <p className="font-medium mb-1" style={{ color: 'hsl(var(--foreground))' }}>
                          {t(lang, "Drag & drop your resume here, or click to browse", "拖放你的履歷到這裡，或點擊瀏覽")}
                        </p>
                        <p className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>
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
                      <div className="flex items-center gap-3 p-4 rounded-xl" style={{ backgroundColor: 'hsl(var(--paper-alt))', border: '1px solid rgba(43,71,52,0.1)' }}>
                        <Check className="w-5 h-5 shrink-0" style={{ color: 'hsl(var(--executive-green))' }} />
                        <FileText className="w-5 h-5 shrink-0" style={{ color: 'hsl(var(--muted-foreground))' }} />
                        <span className="text-sm font-medium truncate flex-1" style={{ color: 'hsl(var(--foreground))' }}>{file.name}</span>
                        <button onClick={() => { setFile(null); setError(""); }} style={{ color: 'hsl(var(--muted-foreground))' }} className="hover:opacity-70">
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
                        className="w-full min-h-[200px] p-4 rounded-xl text-sm resize-y focus:outline-none focus:ring-2"
                        style={{
                          border: '1px solid rgba(43,71,52,0.15)',
                          backgroundColor: 'hsl(var(--paper))',
                          color: 'hsl(var(--foreground))',
                          // @ts-ignore
                          '--tw-ring-color': 'rgba(212,147,13,0.4)',
                        }}
                      />
                      <span className="absolute bottom-3 right-3 text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>
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

                {/* Usage limit banner */}
                <div className="mt-4">
                  <UsageLimitBanner lang={lang} used={used} limit={limit} limitReached={limitReached} />
                </div>

                <button
                  onClick={handleSubmitResume}
                  disabled={!canSubmit || limitReached}
                  className="w-full mt-4 h-12 text-base font-semibold rounded-lg text-white transition-colors disabled:opacity-40"
                  style={{ backgroundColor: 'hsl(var(--executive-green))' }}
                  onMouseEnter={(e) => { if (!e.currentTarget.disabled) e.currentTarget.style.backgroundColor = 'hsl(var(--executive-green-light))'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'hsl(var(--executive-green))'; }}
                >
                  {t(lang, "Analyze My Resume", "分析我的履歷")}
                </button>

                {/* Privacy Badge */}
                <div
                  className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-full mx-auto w-fit"
                  style={{ backgroundColor: 'rgba(43,71,52,0.05)', border: '1px solid rgba(43,71,52,0.15)' }}
                >
                  <ShieldCheck className="w-4 h-4 shrink-0" style={{ color: 'hsl(var(--executive-green))' }} />
                  <span className="text-xs font-medium" style={{ color: 'hsl(var(--executive-green))' }}>
                    {t(lang, "100% Private, Your resume is never shared or sold", "100% 隱私保護, 你的履歷不會外流，絕不轉賣")}
                  </span>
                </div>
              </div>

              {/* How It Works */}
              <div className="mt-10">
                <h2 className="text-center font-heading text-lg font-semibold mb-6" style={{ color: 'hsl(var(--foreground))' }}>
                  {t(lang, "How It Works", "三步驟，快速搞定")}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: CloudUpload, title: t(lang, "Upload", "上傳履歷"), desc: t(lang, "Upload your resume or paste the text", "上傳檔案或直接貼上文字") },
                    { icon: BarChart3, title: t(lang, "Get Scored", "即時評分"), desc: t(lang, "AI analyzes against recruiter criteria", "AI 用招募官標準幫你打分") },
                    { icon: Sparkles, title: t(lang, "Improve", "精準改善"), desc: t(lang, "Get actionable fixes to land interviews", "拿到具體建議，提高面試機會") },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ backgroundColor: 'rgba(212,147,13,0.1)' }}>
                        <step.icon className="w-5 h-5" style={{ color: 'hsl(var(--gold))' }} />
                      </div>
                      <p className="font-semibold text-sm" style={{ color: 'hsl(var(--foreground))' }}>{step.title}</p>
                      <p className="text-xs leading-snug" style={{ color: 'hsl(var(--muted-foreground))' }}>{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Results Preview */}
              <div className="mt-12">
                <h2 className="text-center font-heading text-lg font-semibold mb-2" style={{ color: 'hsl(var(--foreground))' }}>
                  {t(lang, "See What You'll Get", "看看你會得到什麼")}
                </h2>
                <p className="text-center text-sm mb-6" style={{ color: 'hsl(var(--muted-foreground))' }}>
                  {t(lang, "A detailed breakdown with actionable improvements", "詳細分析報告，附帶可執行的改善建議")}
                </p>
                <div
                  className="relative rounded-2xl p-5 md:p-7 overflow-hidden"
                  style={{ backgroundColor: 'hsl(var(--card))', border: '1px solid rgba(43,71,52,0.1)', boxShadow: '0 8px 24px rgba(27,58,47,0.08)' }}
                >
                  {/* Blurred overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 z-10 flex items-end justify-center pb-3" style={{ background: 'linear-gradient(to top, #FFFFFF 30%, rgba(255,255,255,0.85) 60%, transparent)' }}>
                    <span className="text-xs font-medium" style={{ color: 'hsl(var(--muted-foreground))' }}>{t(lang, "Upload your resume to see your full report", "上傳履歷查看完整報告")}</span>
                  </div>

                  {/* Mock score header */}
                  <div className="flex flex-col items-center mb-6">
                    <div className="w-20 h-20 rounded-full flex items-center justify-center mb-2" style={{ border: '5px solid hsl(var(--executive-green))' }}>
                      <span className="font-heading text-2xl font-bold" style={{ color: 'hsl(var(--executive-green))' }}>B</span>
                    </div>
                    <p className="font-heading text-lg font-bold" style={{ color: 'hsl(var(--foreground))' }}>74 <span className="text-sm font-normal" style={{ color: 'hsl(var(--muted-foreground))' }}>/100</span></p>
                    <p className="text-xs" style={{ color: 'hsl(var(--muted-foreground))' }}>{t(lang, "Overall Resume Score", "整體履歷評分")}</p>
                  </div>

                  {/* Mock section health check */}
                  <div className="space-y-3">
                    {[
                      { label: t(lang, "Header & Contact Info", "基本資訊"), score: 9, status: "strong" as const },
                      { label: t(lang, "Professional Summary", "專業摘要"), score: 5, status: "warning" as const },
                      { label: t(lang, "Work Experience", "工作經歷"), score: 7, status: "strong" as const },
                      { label: t(lang, "Skills & Keywords", "技能與關鍵字"), score: 4, status: "critical" as const },
                      { label: t(lang, "Education", "學歷"), score: 8, status: "strong" as const },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <div className="flex items-center gap-2">
                            {s.status === "strong" ? (
                              <Check className="w-3.5 h-3.5" style={{ color: 'hsl(var(--executive-green))' }} />
                            ) : s.status === "critical" ? (
                              <X className="w-3.5 h-3.5 text-destructive" />
                            ) : (
                              <AlertTriangle className="w-3.5 h-3.5 text-warning" />
                            )}
                            <span className="font-medium" style={{ color: 'hsl(var(--foreground))' }}>{s.label}</span>
                          </div>
                          <span className={`font-semibold ${s.status === "strong" ? "" : s.status === "critical" ? "text-destructive" : "text-warning"}`} style={s.status === "strong" ? { color: 'hsl(var(--executive-green))' } : undefined}>{s.score}/10</span>
                        </div>
                        <div className="h-1.5 rounded-full overflow-hidden" style={{ backgroundColor: 'rgba(43,71,52,0.08)' }}>
                          <div
                            className={`h-full rounded-full transition-all ${s.status === "critical" ? "bg-destructive" : s.status === "warning" ? "bg-warning" : ""}`}
                            style={{ width: `${s.score * 10}%`, ...(s.status === "strong" ? { backgroundColor: 'hsl(var(--executive-green))' } : {}) }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>


              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-center font-heading text-lg font-semibold mb-4" style={{ color: 'hsl(var(--foreground))' }}>
                  {t(lang, "Frequently Asked Questions", "你可能想問")}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    
                    { q: t(lang, "How does the resume analyzer work?", "這個分析工具怎麼運作？"), a: t(lang, "Our AI evaluates your resume against the same criteria top recruiters use: keyword optimization, formatting, quantified achievements, and overall readability. You get a score and specific recommendations.", "AI 會根據頂尖招募官的實際篩選標準來評估你的履歷，包括關鍵字、格式、量化成就和可讀性，最後給你評分和具體改善建議。") },
                    { q: t(lang, "Is my resume data safe?", "我的履歷資料安全嗎？"), a: t(lang, "Yes. Your resume is processed securely, never shared with third parties, and never used for training. We take your privacy seriously.", "完全安全。你的履歷經過加密處理，不會分享給任何第三方，也不會用來訓練 AI 模型。") },
                    { q: t(lang, "How many times can I use this tool?", "可以免費用幾次？"), a: t(lang, "You can analyze up to 3 resumes per month for free. I built this tool by myself, and every analysis uses AI which costs real money, plus hosting and development. These limits help me keep the tool free for everyone.", "每月可免費分析 3 份履歷。這個工具是我一個人獨力開發的，每次分析都會使用 AI，產生實際費用，加上主機和開發成本。設定使用上限是為了讓這個工具能繼續免費提供給大家。") },
                    { q: t(lang, "What file formats are supported?", "支援哪些檔案格式？"), a: t(lang, "We support PDF and DOCX files up to 5MB. You can also paste your resume text directly.", "支援 5MB 以內的 PDF 和 DOCX 檔案，也可以直接貼上履歷文字。") },
                    { q: t(lang, "How is this different from other resume scanners?", "跟其他履歷工具有什麼不同？"), a: t(lang, "This tool is built by a senior recruiter who has personally reviewed 20,000+ resumes. The scoring criteria reflect real hiring decisions, not generic AI rules.", "這個工具由親自審閱超過兩萬份履歷的資深招募官打造，評分標準來自真實招聘經驗，不是套公式的 AI 規則。") },
                  ].map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-sm text-left font-medium">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm" style={{ color: 'hsl(var(--muted-foreground))' }}>{item.a}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
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
                  <circle cx="50" cy="50" r="45" fill="none" stroke="rgba(43,71,52,0.15)" strokeWidth="6" />
                  <circle
                    cx="50" cy="50" r="45" fill="none"
                    stroke="hsl(var(--gold))"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={`${progress * 2.83} 283`}
                    className="transition-all duration-300"
                  />
                </svg>
                <span className="absolute inset-0 flex items-center justify-center font-heading text-xl font-bold" style={{ color: 'hsl(var(--foreground))' }}>
                  {Math.round(progress)}%
                </span>
              </div>

              <div className="space-y-3">
                {analyzeSteps.map((step, i) => (
                  <p
                    key={i}
                    className={`text-sm transition-all duration-500 ${
                      i === analyzeStep
                        ? "font-medium animate-pulse"
                        : i < analyzeStep
                        ? "line-through"
                        : ""
                    }`}
                    style={{
                      color: i === analyzeStep ? 'hsl(var(--foreground))' : i < analyzeStep ? 'hsl(var(--muted-foreground))' : 'rgba(107,107,107,0.4)',
                    }}
                  >
                    {i < analyzeStep ? "✓ " : i === analyzeStep ? "→ " : ""}{step}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 3: RESULTS */}
        {screen === "results" && analysisResult && (
          <ResumeResults
            analysis={analysisResult}
            lang={lang}
            isUnlocked={isLoggedIn}
            resumeImageUrl={resumeImageUrl}
            resumeText={resumeText}
            previousAnalysis={deltaPrev}
            isFirstAnalysis={deltaIsFirst}
            onReset={() => {
              setDeltaPrev(null);
              setDeltaIsFirst(false);
              setAnalysisResult(null);
              setFile(null);
              setPasteText("");
              setResumeText("");
              setResumeImageUrl(null);
              setError("");
              setProgress(0);
              setAnalyzeStep(0);
              sessionStorage.removeItem("resume-analysis-result");
              sessionStorage.removeItem("resume-analysis-lang");
              sessionStorage.removeItem("resume-analysis-image");
              setScreen("upload");
            }}
          />
        )}
        {/* SCREEN: HISTORY */}
        {screen === "history" && (
          <div className="py-8 md:py-14 px-5">
            <div className="container mx-auto max-w-2xl">
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-xl font-bold text-foreground">{t(lang, "Analysis History", "分析紀錄")}</h1>
                <button
                  onClick={() => { setScreen("upload"); navigate(lang === "zh-TW" ? "/zh-tw/resume-analyzer" : "/resume-analyzer", { replace: true }); }}
                  className="text-xs font-semibold px-3 py-1.5 rounded-full transition-all hover:opacity-80"
                  style={{ backgroundColor: 'hsl(var(--executive-green))', color: 'hsl(var(--paper))' }}
                >
                  {t(lang, "New Analysis", "新分析")}
                </button>
              </div>
              {analysesLoading ? (
                <p className="text-sm text-muted-foreground">{t(lang, "Loading…", "載入中…")}</p>
              ) : analyses.length === 0 ? (
                <p className="text-sm text-muted-foreground">{t(lang, "No analyses yet. Upload a resume to get started!", "尚無分析紀錄。上傳履歷開始吧！")}</p>
              ) : (
                <div className="space-y-3">
                  {analyses.map((a) => {
                    const date = new Date(a.created_at).toLocaleDateString(lang === "zh-TW" ? "zh-TW" : "en-US", { year: "numeric", month: "short", day: "numeric", hour: "2-digit", minute: "2-digit" });
                    const score = a.overall_score ?? 0;
                    const color = score >= 80 ? "hsl(var(--executive-green))" : score >= 60 ? "hsl(var(--warning))" : score >= 40 ? "hsl(var(--warning))" : "hsl(var(--destructive))";
                    return (
                      <button
                        key={a.id}
                        onClick={() => {
                          setAnalysisResult(a.analysis_result as AnalysisResult);
                          setResumeImageUrl(a.resume_image_url ?? null);
                          setScreen("results");
                          navigate(lang === "zh-TW" ? "/zh-tw/resume-analyzer" : "/resume-analyzer", { replace: true });
                        }}
                        className="w-full rounded-xl p-4 flex items-center gap-4 bg-card border border-border hover:-translate-y-0.5 transition-all duration-200 text-left shadow-sm"
                      >
                        <div className="w-12 h-12 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: `${color}18` }}>
                          <span className="text-lg font-bold" style={{ color }}>{score}</span>
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-semibold text-foreground">{t(lang, "Score", "分數")}: {score}/100</p>
                          <p className="text-xs text-muted-foreground">{date} · {a.language === "zh-TW" ? "中文" : "English"}</p>
                        </div>
                        <ChevronRight className="w-4 h-4 text-muted-foreground shrink-0" />
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}
        {showMicroSurvey && <MicroSurvey actionKey="resume_analysis" locale={lang === "zh-TW" ? "zh-tw" : "en"} />}
        <LimitReachedModal
          open={showLimitModal}
          onClose={() => setShowLimitModal(false)}
          limitType={lang === "en" ? "AI analyses" : "AI 分析"}
          currentCount={used}
          planLimit={limit}
          lang={lang}
        />
      </main>
    </>
  );
}