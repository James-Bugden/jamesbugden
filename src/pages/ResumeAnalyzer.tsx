import { useState, useCallback, useRef } from "react";
import { Helmet } from "react-helmet-async";
import { Link } from "react-router-dom";
import { Upload, FileText, Sparkles, BarChart3, CloudUpload, X, Check, Lock, ArrowRight, ShieldCheck, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { supabase } from "@/integrations/supabase/client";
import ResumeResults from "@/components/resume-analyzer/ResumeResults";
import type { AnalysisResult } from "@/components/resume-analyzer/types";
import LogoScroll from "@/components/LogoScroll";
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
  const [remainingUses, setRemainingUses] = useState<number | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const analysisPromiseRef = useRef<Promise<AnalysisResult> | null>(null);

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

  // New flow: Upload → Email Gate → Analyzing → Results
  // Step 1: Extract text and move to email gate
  const handleSubmitResume = useCallback(async () => {
    setError("");
    try {
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
        return;
      }

      setResumeText(text);
      setScreen("email-gate");
    } catch (err: any) {
      console.error("Extract error:", err);
      setError(t(lang, "Could not read file. Please try pasting instead.", "無法讀取檔案。請改用貼上方式。"));
    }
  }, [file, pasteText, lang, extractTextFromPDF, extractTextFromDOCX]);

  // Step 2: After email, check rate limit then start analysis
  const startAnalysis = useCallback(async (text: string) => {
    setScreen("analyzing");
    setAnalyzeStep(0);
    setProgress(0);

    // Animate steps
    const stepInterval = setInterval(() => {
      setAnalyzeStep(prev => (prev < 3 ? prev + 1 : prev));
    }, 1200);

    // Progress crawls to 85% over ~15s
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
        throw new Error(data?.error || fnError?.message || "Analysis failed");
      }

      const result = data as AnalysisResult;
      setAnalysisResult(result);
      setAnalyzeStep(4);
      setProgress(100);

      // Return the result so handleUnlock can use it for the DB insert
      return result;
    } catch (err: any) {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
      console.error("Analysis error:", err);
      setError(t(lang, "Something went wrong with the analysis. Please try again.", "分析過程發生錯誤。請再試一次。"));
      setScreen("upload");
      return null;
    }
  }, [lang]);

  const handleUnlock = useCallback(async () => {
    const trimmedEmail = gateEmail.trim();
    const trimmedName = gateName.trim();
    if (!trimmedName) {
      setGateError(t(lang, "Please enter your name.", "請輸入你的名字。"));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setGateError(t(lang, "Please enter a valid email address.", "請輸入有效的電子信箱。"));
      return;
    }

    setIsSubmitting(true);
    setGateError("");

    try {
      // Rate-limit check: count analyses this calendar month via secure RPC
      const { data: usageCount, error: countError } = await supabase
        .rpc("count_resume_analyses_this_month", { p_email: trimmedEmail });

      const count = (typeof usageCount === "number" ? usageCount : 0);
      if (!countError && count >= 5) {
        setRemainingUses(0);
        setGateError(t(lang,
          "You've reached the limit of 5 free analyses per month. Try again next month!",
          "你已達到每月 5 次免費分析的上限。下個月再試吧！"
        ));
        setIsSubmitting(false);
        return;
      }
      setRemainingUses(5 - count - 1);

      // Start analysis
      const result = await startAnalysis(resumeText);
      if (!result) {
        setIsSubmitting(false);
        return;
      }

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
        analysis_result: result as any,
        overall_score: result?.overall_score ? Math.round(result.overall_score) : null,
        language: lang,
        years_experience: result?.segmentation?.years_experience,
        seniority_level: result?.segmentation?.seniority_level,
        current_company_type: result?.segmentation?.current_company_type,
        industry: result?.segmentation?.industry,
        target_readiness: result?.segmentation?.target_readiness,
        input_method: inputMethod,
        user_agent: navigator.userAgent,
      });

      // Brief pause at 100% then show results
      setTimeout(() => setScreen("results"), 800);
    } catch (err) {
      console.error("Save error:", err);
      setGateError(t(lang, "Something went wrong. Please try again.", "出了點問題。請再試一次。"));
      setScreen("upload");
    } finally {
      setIsSubmitting(false);
    }
  }, [gateEmail, gateName, lang, file, resumeText, inputMethod, startAnalysis]);

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
                <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground mb-4" style={lang === "zh-TW" ? { lineHeight: 1.2 } : undefined}>
                  {t(lang, "98% of Resumes Get Ignored.", "98% 的履歷，沒人看")}
                  <br />
                  <span className="text-gold">{t(lang, "Fix Yours in 1 Minute.", "1 分鐘幫你修好")}</span>
                </h1>
                <p className="text-base md:text-lg text-muted-foreground mb-5 max-w-xl mx-auto">
                  {t(lang,
                    "Start for free.",
                    "免費使用，立即開始"
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
                  onClick={handleSubmitResume}
                  disabled={!canSubmit}
                  className="w-full mt-6 h-12 text-base font-semibold bg-[#1B3A2F] hover:bg-[#152E25] text-white disabled:opacity-40"
                >
                  {t(lang, "Analyze My Resume", "分析我的履歷")}
                </Button>

                {/* Privacy Badge */}
                <div className="flex items-center justify-center gap-2 mt-4 px-4 py-2.5 rounded-full bg-executive-green/5 border border-executive-green/20 mx-auto w-fit">
                  <ShieldCheck className="w-4 h-4 text-executive-green shrink-0" />
                  <span className="text-xs font-medium text-executive-green">
                    {t(lang, "100% Private — Your resume is never shared or sold", "100% 隱私保護 — 你的履歷不會外流，絕不轉賣")}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground mt-3 text-center italic">
                  {t(lang, 
                    'Frameworks based on "How to Write the Perfect Resume" by Dan Clay', 
                    '分析框架參考 Dan Clay 著作《How to Write the Perfect Resume》'
                  )}
                </p>
              </div>

              {/* How It Works */}
              <div className="mt-10">
                <h2 className="text-center font-heading text-lg font-semibold text-foreground mb-6">
                  {t(lang, "How It Works", "三步驟，快速搞定")}
                </h2>
                <div className="grid grid-cols-3 gap-4">
                  {[
                    { icon: CloudUpload, title: t(lang, "Upload", "上傳履歷"), desc: t(lang, "Upload your resume or paste the text", "上傳檔案或直接貼上文字") },
                    { icon: BarChart3, title: t(lang, "Get Scored", "即時評分"), desc: t(lang, "AI analyzes against recruiter criteria", "AI 用招募官標準幫你打分") },
                    { icon: Sparkles, title: t(lang, "Improve", "精準改善"), desc: t(lang, "Get actionable fixes to land interviews", "拿到具體建議，提高面試機會") },
                  ].map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center gap-2">
                      <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center">
                        <step.icon className="w-5 h-5 text-gold" />
                      </div>
                      <p className="font-semibold text-sm text-foreground">{step.title}</p>
                      <p className="text-xs text-muted-foreground leading-snug">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Sample Results Preview */}
              <div className="mt-12">
                <h2 className="text-center font-heading text-lg font-semibold text-foreground mb-2">
                  {t(lang, "See What You'll Get", "看看你會得到什麼")}
                </h2>
                <p className="text-center text-sm text-muted-foreground mb-6">
                  {t(lang, "A detailed breakdown with actionable improvements", "詳細分析報告，附帶可執行的改善建議")}
                </p>
                <div className="relative rounded-2xl border border-border bg-card p-5 md:p-7 shadow-[0_8px_24px_rgba(27,58,47,0.08)] overflow-hidden">
                  {/* Blurred overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-card via-card/90 to-transparent z-10 flex items-end justify-center pb-4">
                    <span className="text-xs font-medium text-muted-foreground">{t(lang, "Upload your resume to see your full report", "上傳履歷查看完整報告")}</span>
                  </div>

                  {/* Mock score header */}
                  <div className="flex flex-col items-center mb-5">
                    <div className="w-20 h-20 rounded-full border-[5px] border-executive-green flex items-center justify-center mb-2">
                      <span className="font-heading text-2xl font-bold text-executive-green">B+</span>
                    </div>
                    <p className="font-heading text-lg font-bold text-foreground">74 <span className="text-sm font-normal text-muted-foreground">/100</span></p>
                    <p className="text-xs text-muted-foreground">{t(lang, "Overall Resume Score", "整體履歷評分")}</p>
                  </div>

                  {/* Mock test cards */}
                  <div className="grid grid-cols-2 gap-2 mb-5">
                    {[
                      { label: t(lang, "Keyword Test", "關鍵字測試"), pass: true },
                      { label: t(lang, "Scan Test", "快速掃描測試"), pass: true },
                      { label: t(lang, "Qualifications Test", "資歷測試"), pass: false },
                      { label: t(lang, "Fit Test", "適配度測試"), pass: true },
                    ].map((test, i) => (
                      <div key={i} className="flex items-center gap-2 rounded-lg border border-border px-3 py-2">
                        {test.pass ? (
                          <Check className="w-3.5 h-3.5 text-executive-green shrink-0" />
                        ) : (
                          <X className="w-3.5 h-3.5 text-destructive shrink-0" />
                        )}
                        <span className="text-xs font-medium text-foreground">{test.label}</span>
                      </div>
                    ))}
                  </div>

                  {/* Mock section bars */}
                  <div className="space-y-3">
                    {[
                      { label: t(lang, "Header & Contact Info", "基本資訊"), score: 9, max: 10 },
                      { label: t(lang, "Professional Summary", "專業摘要"), score: 6, max: 10 },
                      { label: t(lang, "Work Experience", "工作經歷"), score: 7, max: 10 },
                    ].map((s, i) => (
                      <div key={i}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="font-medium text-foreground">{s.label}</span>
                          <span className="text-muted-foreground">{s.score}/{s.max}</span>
                        </div>
                        <div className="h-1.5 rounded-full bg-muted overflow-hidden">
                          <div className="h-full rounded-full bg-executive-green transition-all" style={{ width: `${(s.score / s.max) * 100}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Logo Scroll */}
              <div className="mt-10">
                <LogoScroll heading={t(lang, "I've helped professionals from", "這些公司的人都找過我")} />
              </div>

              {/* FAQ Section */}
              <div className="mt-12">
                <h2 className="text-center font-heading text-lg font-semibold text-foreground mb-4">
                  {t(lang, "Frequently Asked Questions", "你可能想問")}
                </h2>
                <Accordion type="single" collapsible className="w-full">
                  {[
                    { q: t(lang, "What is an ATS and why does it matter?", "ATS 是什麼？為什麼很重要？"), a: t(lang, "An Applicant Tracking System (ATS) is software used by 99% of large employers to screen resumes. If your resume isn't ATS-friendly, it may be rejected before a human ever reads it.", "ATS（應徵者追蹤系統）是 99% 大企業用來自動篩選履歷的軟體。如果你的履歷不符合 ATS 格式，還沒被人看到就會被刷掉。") },
                    { q: t(lang, "How does the resume analyzer work?", "這個分析工具怎麼運作？"), a: t(lang, "Our AI evaluates your resume against the same criteria top recruiters use: keyword optimization, formatting, quantified achievements, and overall readability. You get a score and specific recommendations.", "AI 會根據頂尖招募官的實際篩選標準來評估你的履歷，包括關鍵字、格式、量化成就和可讀性，最後給你評分和具體改善建議。") },
                    { q: t(lang, "Is my resume data safe?", "我的履歷資料安全嗎？"), a: t(lang, "Yes. Your resume is processed securely, never shared with third parties, and never used for training. We take your privacy seriously.", "完全安全。你的履歷經過加密處理，不會分享給任何第三方，也不會用來訓練 AI 模型。") },
                    { q: t(lang, "How many times can I use this tool?", "可以免費用幾次？"), a: t(lang, "You can analyze up to 5 resumes per month for free. This resets at the beginning of each calendar month.", "每月可免費分析 5 份履歷，每月月初自動重置。") },
                    { q: t(lang, "What file formats are supported?", "支援哪些檔案格式？"), a: t(lang, "We support PDF and DOCX files up to 5MB. You can also paste your resume text directly.", "支援 5MB 以內的 PDF 和 DOCX 檔案，也可以直接貼上履歷文字。") },
                    { q: t(lang, "How is this different from other resume scanners?", "跟其他履歷工具有什麼不同？"), a: t(lang, "This tool is built by a senior recruiter who has personally reviewed 20,000+ resumes. The scoring criteria reflect real hiring decisions, not generic AI rules.", "這個工具由親自審閱超過兩萬份履歷的資深招募官打造，評分標準來自真實招聘經驗，不是套公式的 AI 規則。") },
                  ].map((item, i) => (
                    <AccordionItem key={i} value={`faq-${i}`}>
                      <AccordionTrigger className="text-sm text-left font-medium">{item.q}</AccordionTrigger>
                      <AccordionContent className="text-sm text-muted-foreground">{item.a}</AccordionContent>
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
                  {Math.round(progress)}%
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

        {/* SCREEN 3: EMAIL GATE (now before analysis) */}
        {screen === "email-gate" && (
          <div className="py-12 md:py-20 px-5">
            <div className="container mx-auto max-w-md text-center">
              <div className="bg-card border border-border rounded-2xl shadow-xl p-8">
                <div className="w-12 h-12 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-4">
                  <Lock className="w-6 h-6 text-gold" />
                </div>
                <h2 className="font-heading text-xl md:text-2xl font-bold text-foreground mb-2">
                  {t(lang, "Almost There!", "即將完成！")}
                </h2>
                <p className="text-sm text-muted-foreground mb-6">
                  {t(lang,
                    "Enter your name and email to start your free resume analysis.",
                    "輸入你的名字和 Email 以開始免費履歷分析。"
                  )}
                </p>

                <div className="space-y-3 text-left">
                  <Input
                    type="text"
                    value={gateName}
                    onChange={(e) => { setGateName(e.target.value); setGateError(""); }}
                    placeholder={t(lang, "Your name", "你的名字")}
                    className="h-11"
                  />
                  <Input
                    type="email"
                    value={gateEmail}
                    onChange={(e) => { setGateEmail(e.target.value); setGateError(""); }}
                    placeholder="your@email.com"
                    className="h-11"
                  />
                  {gateError && <p className="text-xs text-destructive">{gateError}</p>}
                  {remainingUses !== null && remainingUses > 0 && (
                    <p className="text-xs text-muted-foreground">
                      {t(lang, `${remainingUses} free analyses remaining this month`, `本月剩餘 ${remainingUses} 次免費分析`)}
                    </p>
                  )}
                  <Button onClick={handleUnlock} disabled={isSubmitting} className="w-full h-11 font-semibold">
                    {isSubmitting
                      ? t(lang, "Analyzing...", "分析中...")
                      : t(lang, "Analyze My Resume", "分析我的履歷")}
                  </Button>
                </div>

                <p className="text-xs text-muted-foreground mt-3">
                  🔒 {t(lang, "We respect your privacy. No spam, ever.", "我們尊重你的隱私。絕不寄送垃圾郵件。")}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* SCREEN 4: FULL RESULTS */}
        {screen === "results" && analysisResult && (
          <ResumeResults
            analysis={analysisResult}
            lang={lang}
            onReset={() => {
              setAnalysisResult(null);
              setFile(null);
              setPasteText("");
              setResumeText("");
              setGateName("");
              setGateEmail("");
              setError("");
              setGateError("");
              setProgress(0);
              setAnalyzeStep(0);
              setScreen("upload");
            }}
          />
        )}
      </main>
    </>
  );
}
