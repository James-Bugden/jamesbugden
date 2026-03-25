import { useState, useEffect, useRef, useCallback, useMemo, memo, MouseEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import ThemeToggle from "@/components/ThemeToggle";
import { ArrowRight, FileText, DollarSign, PenTool, Search, X, BarChart3, MessageSquare, Compass, ClipboardList, Mic, Banknote } from "lucide-react";
import { useRecentlyUsed } from "@/hooks/useRecentlyUsed";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useResumeAnalyses } from "@/hooks/useResumeAnalyses";
import { useAnalyzerUsage } from "@/hooks/useAnalyzerUsage";
import OnboardingChecklist from "@/components/OnboardingChecklist";
import DashboardSkeleton from "@/components/DashboardSkeleton";
import NpsPulse from "@/components/feedback/NpsPulse";
import JourneySection, { type JourneyItem, type GuideTag, useSeenNewItems } from "@/components/dashboard/JourneySection";
import { SEO } from "@/components/SEO";

interface ToolItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  path: string;
  zhPath?: string;
}

const tools: ToolItem[] = [
  {
    id: "resume-analyzer",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "#EEF2FF",
    title: { en: "Resume Analyzer", zh: "履歷健檢" },
    description: { en: "Upload your resume. Get a recruiter-level score and specific fixes in 60 seconds.", zh: "上傳履歷，60 秒內拿到 Recruiter 視角的評分與具體改善建議。" },
    path: "/resume-analyzer",
    zhPath: "/zh-tw/resume-analyzer",
  },
  {
    id: "resume-builder",
    icon: <PenTool className="w-5 h-5" />,
    iconBg: "#FFF7ED",
    title: { en: "Resume Builder", zh: "履歷編輯器" },
    description: { en: "Build a recruiter-approved resume from scratch using proven templates.", zh: "用實戰驗證的模板，從頭打造一份讓 Recruiter 點頭的履歷。" },
    path: "/resume",
    zhPath: "/zh-tw/resume",
  },
  {
    id: "offer-calculator",
    icon: <DollarSign className="w-5 h-5" />,
    iconBg: "#FEF9C3",
    title: { en: "Offer Calculator", zh: "Offer 試算器" },
    description: { en: "See how much more you'd earn over 30 years by negotiating strategically.", zh: "算算看，策略性談薪 30 年下來能多賺多少。" },
    path: "/offer-calculator",
    zhPath: "/zh-tw/offer-calculator",
  },
  {
    id: "interview-questions",
    icon: <MessageSquare className="w-5 h-5" />,
    iconBg: "#F0FDF4",
    title: { en: "Interview Question Bank", zh: "面試題庫" },
    description: { en: "203 real interview questions with sample answers to prepare for your next interview.", zh: "203 道真實面試題附參考答案，幫你準備下一場面試。" },
    path: "/interview-questions",
    zhPath: "/zh-tw/interview-questions",
  },
];

const journeyItems: JourneyItem[] = [
  // ── End to End Guides ──
  { id: "ai-job-search", title: { en: "AI Job Search Guide", zh: "AI 求職完整指南" }, description: { en: "How to use ChatGPT at every stage of your job search — from career direction to final offer.", zh: "從職涯方向到最終 Offer，每個階段都用 ChatGPT 的完整指南。" }, enPath: "/ai-job-search-guide", zhPath: "/zh-tw/ai-job-search-guide", tag: "end-to-end", contentType: "guide", isNew: true },
  { id: "pivot-guide", title: { en: "Pivot Method Guide", zh: "轉職攻略" }, description: { en: "The complete 5-stage framework for changing careers without starting over.", zh: "完整 5 階段架構，讓你換跑道不必砍掉重練。" }, enPath: "/pivot-method-guide", zhPath: "/zh-tw/pivot-method-guide", tag: "end-to-end", contentType: "guide" },
  { id: "pivot-mini", title: { en: "Pivot Method Mini Guide", zh: "轉職攻略精華版" }, description: { en: "The same framework in 8 minutes. For when you need the short version.", zh: "同一套架構，8 分鐘讀完。趕時間的你適用。" }, enPath: "/pivot-method-mini-guide", zhPath: "/zh-tw/pivot-method-mini-guide", tag: "end-to-end", contentType: "guide", miniOf: "pivot-guide" },
  { id: "linkedin-guide", title: { en: "LinkedIn for Job Search", zh: "LinkedIn 求職攻略" }, description: { en: "How to optimize your LinkedIn so recruiters actually find you.", zh: "怎麼調整 LinkedIn，讓 Recruiter 主動來找你。" }, enPath: "/linkedin-guide", zhPath: "/zh-tw/linkedin-guide", tag: "applying", contentType: "guide", miniOf: "linkedin-brand" },
  { id: "linkedin-brand", title: { en: "LinkedIn for Job Seekers: Stop Applying, Start Getting Found", zh: "LinkedIn 求職者指南：別再海投，讓機會來找你" }, description: { en: "Build a personal brand that gets you inbound opportunities. Not just a profile update.", zh: "打造個人品牌，讓機會主動找上門。不只是改個大頭照。" }, enPath: "/linkedin-branding-guide", zhPath: "/zh-tw/linkedin-branding-guide", tag: "applying", contentType: "guide" },

  // ── Applying ──
  { id: "resume-guide", title: { en: "Resume Guide", zh: "履歷撰寫指南" }, description: { en: "The complete guide to writing a resume that passes the 6-second recruiter scan.", zh: "完整教學，寫出能通過 Recruiter 6 秒掃描的履歷。" }, enPath: "/resume-guide", tag: "applying", contentType: "guide" },
  { id: "resume-ref", title: { en: "Resume Quick Reference", zh: "履歷速查表" }, description: { en: "One-page cheat sheet. The rules I check every resume against.", zh: "一頁濃縮。我審履歷時會看的所有重點。" }, enPath: "/resume-quick-reference", zhPath: "/zh-tw/resume-quick-reference", tag: "applying", contentType: "guide", miniOf: "resume-guide" },

  // ── Interviewing ──
  { id: "interview-full", title: { en: "Interview Preparation Guide", zh: "面試準備完整指南" }, description: { en: "The extended version with practice questions, frameworks, and recruiter-insider tips.", zh: "進階版：附練習題、回答框架、Recruiter 內部觀點。" }, enPath: "/interview-preparation-guide", zhPath: "/zh-tw/interview-preparation-guide", tag: "interviewing", contentType: "guide" },
  { id: "interview-prep", title: { en: "Interview Prep Guide", zh: "面試準備指南" }, description: { en: "How to prepare for interviews at foreign companies in Taiwan. What they actually ask and why.", zh: "在台灣準備外商面試的完整攻略。他們問什麼、為什麼這樣問。" }, enPath: "/interview-prep-guide", zhPath: "/zh-tw/interview-prep-guide", tag: "interviewing", contentType: "guide", miniOf: "interview-full" },
  { id: "hr-screen", title: { en: "Recruiter Screen Guide", zh: "如何通過HR面試關" }, description: { en: "How to pass the recruiter phone screen and advance to the hiring manager round.", zh: "如何通過招募官電話面試，順利進到用人主管面試。" }, enPath: "/hr-interview-guide", zhPath: "/zh-tw/hr-interview-guide", tag: "interviewing", contentType: "guide" },
  { id: "interview-questions", title: { en: "Interview Question Bank", zh: "面試題庫" }, description: { en: "203 real interview questions with sample answers to prepare for your next interview.", zh: "203 道真實面試題附參考答案，幫你準備下一場面試。" }, enPath: "/interview-questions", zhPath: "/zh-tw/interview-questions", tag: "interviewing", contentType: "guide" },

  // ── Negotiating ──
  { id: "tk-index", title: { en: "Salary Negotiation Toolkit", zh: "談薪工具包總覽" }, description: { en: "The full overview of every tool in this kit. Read this first to know what to use and when.", zh: "所有工具的完整介紹。先讀這篇，搞清楚什麼時候用什麼。" }, enPath: "/toolkit", zhPath: "/zh-tw/toolkit", tag: "negotiating", contentType: "guide", pinned: true, pinnedLabel: { en: "START HERE", zh: "從這開始" } },
  { id: "salary-kit", title: { en: "Salary Starter Kit", zh: "談薪入門懶人包" }, description: { en: "Everything you need before your next salary conversation. Scripts, data, templates.", zh: "下次談薪前你需要的一切：話術、數據、範本。" }, enPath: "/salary-starter-kit", zhPath: "/zh-tw/salary-starter-kit", tag: "negotiating", contentType: "guide" },
  { id: "tk-scripts", title: { en: "Deflection Scripts", zh: "薪資迴避話術" }, description: { en: "What to say when they ask your salary expectations too early. Word-for-word scripts.", zh: "對方太早問期望薪資怎麼辦？逐字話術直接用。" }, enPath: "/toolkit/scripts", zhPath: "/zh-tw/toolkit/scripts", tag: "negotiating", contentType: "template" },
  { id: "tk-offer", title: { en: "Offer Response", zh: "Offer 回覆範本" }, description: { en: "How to respond to an offer without accepting or rejecting. Buy time and negotiate better.", zh: "收到 Offer 後怎麼回覆才不會太快答應又不失禮。爭取時間，談更好的條件。" }, enPath: "/toolkit/offer-response", zhPath: "/zh-tw/toolkit/offer-response", tag: "negotiating", contentType: "template" },
  { id: "tk-counter", title: { en: "Counteroffer Email", zh: "還價信範本" }, description: { en: "Copy-paste email templates for countering an offer professionally.", zh: "專業還價 email 範本，複製貼上就能用。" }, enPath: "/toolkit/counteroffer", zhPath: "/zh-tw/toolkit/counteroffer", tag: "negotiating", contentType: "template" },
  { id: "tk-calc", title: { en: "Compensation Calculator", zh: "總薪酬計算器" }, description: { en: "Calculate your total comp — base, bonus, stock, benefits — so you compare offers properly.", zh: "底薪、獎金、股票、福利全部算進來，才能真正比較 Offer。" }, enPath: "/toolkit/calculator", zhPath: "/zh-tw/toolkit/calculator", tag: "negotiating", contentType: "calculator" },
  { id: "tk-calc-int", title: { en: "Comp Calculator Interactive", zh: "薪酬互動試算" }, description: { en: "The interactive version. Plug in two offers and see the real difference.", zh: "互動版。輸入兩個 Offer，一眼看出真正差多少。" }, enPath: "/toolkit/calculator-interactive", zhPath: "/zh-tw/toolkit/calculator-interactive", tag: "negotiating", contentType: "calculator" },
  { id: "tk-pushback", title: { en: "Pushback Cheat Sheet", zh: "談判反擊速查" }, description: { en: "When they say 'this is our best offer' or 'the budget is fixed' — here's what to say back.", zh: "對方說「這已經是最好的 Offer 了」或「預算就這樣」— 你可以這樣回。" }, enPath: "/toolkit/pushback", zhPath: "/zh-tw/toolkit/pushback", tag: "negotiating", contentType: "template" },
  { id: "tk-raise", title: { en: "Raise One-Pager", zh: "加薪提案單" }, description: { en: "A one-page template to present your case for a raise to your manager. Data-backed, not emotional.", zh: "一頁式範本，用數據向主管提加薪。講證據，不講感覺。" }, enPath: "/toolkit/raise", zhPath: "/zh-tw/toolkit/raise", tag: "negotiating", contentType: "template" },
  { id: "tk-log", title: { en: "Achievement Log", zh: "成就紀錄簿" }, description: { en: "Track your wins weekly so when review time comes, you have the evidence ready.", zh: "每週記錄你的成果，績效考核時直接拿出來用。" }, enPath: "/toolkit/log", zhPath: "/zh-tw/toolkit/log", tag: "negotiating", contentType: "template" },
];

const JOURNEY_META: { tag: GuideTag; icon: React.ReactNode; color: string; label: { en: string; zh: string } }[] = [
  { tag: "end-to-end", icon: <Compass className="w-5 h-5" />, color: "hsl(var(--executive-green))", label: { en: "End to End Guides", zh: "完整指南" } },
  { tag: "applying", icon: <ClipboardList className="w-5 h-5" />, color: "#1D4ED8", label: { en: "Applying", zh: "投遞申請" } },
  { tag: "interviewing", icon: <Mic className="w-5 h-5" />, color: "#7C3AED", label: { en: "Interviewing", zh: "面試準備" } },
  { tag: "negotiating", icon: <Banknote className="w-5 h-5" />, color: "hsl(var(--gold-dark))", label: { en: "Negotiating", zh: "薪資談判" } },
];

type SearchableItem = { id: string; type: "tool" | "guide"; title: { en: string; zh: string }; desc: { en: string; zh: string }; path: string };

function buildSearchable(lang: "en" | "zh"): SearchableItem[] {
  const items: SearchableItem[] = [];
  const seen = new Set<string>();
  tools.forEach(t => {
    if (seen.has(t.id)) return;
    seen.add(t.id);
    items.push({ id: t.id, type: "tool", title: t.title, desc: t.description, path: lang === "zh" && t.zhPath ? t.zhPath : t.path });
  });
  journeyItems.forEach(g => {
    if (seen.has(g.id)) return;
    seen.add(g.id);
    const path = lang === "zh" && g.zhPath ? g.zhPath : g.enPath;
    items.push({ id: g.id, type: "guide", title: g.title, desc: g.description, path });
  });
  return items;
}

const SECTIONS = ["tools", "resources"] as const;

function getProgressBadge(toolId: string, lang: "en" | "zh", t: typeof i18n.en) {
  if (toolId === "resume-analyzer") {
    try {
      const raw = localStorage.getItem("resume_analysis_result");
      if (raw) {
        const data = JSON.parse(raw);
        const score = data?.overall_score ?? data?.overallScore;
        if (typeof score === "number") return `${t.lastScore}: ${score}/100`;
      }
    } catch { /* ignore */ }
  }
  return null;
}

const i18n = {
  en: {
    seoTitle: "Dashboard — James Bugden",
    seoDesc: "Your career tools dashboard.",
    signOut: "Sign out",
    hey: "Hey",
    welcomeBack: "Welcome back,",
    newBadge: "New: AI Job Search Guide",
    newBody: "A recruiter's complete guide to using ChatGPT at every stage of your job search.",
    checkItOut: "Try it now",
    toolsHeading: "Your Tools",
    toolsSub: "Interactive tools built with real recruiting data. Use them as many times as you need.",
    launch: "Launch",
    resourcesHeading: "Your Journey",
    resourcesSub: "Step-by-step playbooks for every stage of your career move. Written by a recruiter, not a career blogger.",
    ctaHeading: "Want 1-on-1 help?",
    ctaBody: "These tools get you 80% of the way. If you want someone to look at your specific situation — resume, interviews, salary negotiation — I work with a few people each month.",
    ctaButton: "See If You're a Fit",
    ctaTrust: "Free intro call · No commitment · No pressure",
    footerCopyright: "© 2026 All Rights Reserved",
    salaryKitLink: "/ai-job-search-guide",
    dashboard: "My Toolkit",
    navTools: "Tools",
    navResources: "Resources",
    searchPlaceholder: "Search tools, guides, and resources…",
    noResults: "No results found. Try a different keyword.",
    recentlyUsed: "Pick Up Where You Left Off",
    lastScore: "Last score",
    done: "Done",
    read: "read",
  },
  zh: {
    seoTitle: "我的專區 — James Bugden",
    seoDesc: "你的職涯工具與資源中心。",
    signOut: "登出",
    hey: "",
    welcomeBack: "歡迎回來，",
    newBadge: "新上線：AI 求職完整指南",
    newBody: "從職涯方向到最終 Offer，每個階段都用 ChatGPT 的招募官完整指南。",
    checkItOut: "立即體驗",
    toolsHeading: "工具",
    toolsSub: "根據真實招募經驗打造的互動工具，不限次數使用。",
    launch: "開啟",
    resourcesHeading: "你的旅程",
    resourcesSub: "求職每個階段的完整攻略。由 Recruiter 撰寫，不是職涯部落客。",
    ctaHeading: "想要一對一協助？",
    ctaBody: "這些工具能幫你搞定 80%。如果你想找人針對你的狀況 — 履歷、面試、談薪 — 我每個月接幾位客戶。",
    ctaButton: "了解詳情",
    ctaTrust: "免費諮詢 · 不綁約 · 零壓力",
    footerCopyright: "© 2026 版權所有",
    salaryKitLink: "/zh-tw/ai-job-search-guide",
    dashboard: "我的專區",
    navTools: "工具",
    navResources: "資源",
    searchPlaceholder: "搜尋工具、指南、資源⋯",
    noResults: "沒有找到相關結果，換個關鍵字試試。",
    recentlyUsed: "接續上次進度",
    lastScore: "上次分數",
    done: "已完成",
    read: "已讀",
  },
};

/* ── Main Dashboard ── */
export default function Dashboard({ lang = "en" }: { lang?: "en" | "zh" }) {
  const { user, isLoggedIn, isLoading, signOut } = useAuth();
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>("tools");

  const searchInputRef = useRef<HTMLInputElement>(null);
  const { recentItems, trackItem } = useRecentlyUsed();
  const [bannerDismissed, setBannerDismissed] = useLocalStorage("dashboard_banner_dismissed_v2", false);
  const { latest: latestAnalysis } = useResumeAnalyses();
  const { used: analyzerUsed, limit: analyzerLimit } = useAnalyzerUsage();
  const t = i18n[lang];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const observers: IntersectionObserver[] = [];
    SECTIONS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { rootMargin: "-20% 0px -60% 0px" },
      );
      obs.observe(el);
      observers.push(obs);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const { markSeen, hasSeen } = useSeenNewItems();
  const trackResource = useCallback((id: string) => { markSeen(id); trackItem(id, "guide"); }, [trackItem, markSeen]);
  const trackTool = useCallback((id: string) => trackItem(id, "tool"), [trackItem]);

  const allSearchable = useMemo(() => buildSearchable(lang), [lang]);
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return null;
    return allSearchable.filter(
      item => item.title[lang].toLowerCase().includes(q) || item.desc[lang].toLowerCase().includes(q)
    );
  }, [searchQuery, lang, allSearchable]);

  const recentCards = useMemo(() => {
    if (recentItems.length === 0) return [];
    return recentItems.map(r => allSearchable.find(s => s.id === r.id)).filter(Boolean) as SearchableItem[];
  }, [recentItems, allSearchable]);

  if (isLoading) return <DashboardSkeleton />;
  if (!isLoggedIn) {
    const dashPath = window.location.pathname;
    const isZhDash = dashPath.startsWith("/zh-tw") || dashPath.startsWith("/zh");
    return <Navigate to="/login" state={{ from: dashPath }} replace />;
  }

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    (lang === "zh" ? "你" : "there");

  const sectionNavItems = [
    { id: "tools", label: t.navTools },
    { id: "resources", label: t.navResources },
  ];

  return (
    <>

      {/* Nav */}
      <nav className={`sticky top-0 z-50 bg-executive-green transition-shadow duration-300 ${scrolled ? 'shadow-lg shadow-black/20' : ''}`}>
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading text-lg tracking-wide text-cream">JAMES BUGDEN</Link>
            <span className="text-cream/40 text-sm hidden sm:inline">/</span>
            <span className="text-sm font-semibold hidden sm:inline text-cream/80">{t.dashboard}</span>
          </div>

          <div className="hidden md:flex items-center gap-1">
            {sectionNavItems.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className={`text-sm font-medium px-3 py-1 rounded-full transition-colors ${
                  activeSection === sec.id
                    ? 'bg-gold/20 text-gold'
                    : 'text-cream/60 hover:text-cream/80'
                }`}
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-cream/60">{t.hey} {firstName}</span>
            <button onClick={signOut} className="hover:opacity-80 transition-opacity text-cream/60">{t.signOut}</button>
            <ThemeToggle variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>

        <div className="md:hidden border-t border-white/10 flex overflow-x-auto px-4 gap-1">
          {sectionNavItems.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className={`text-sm font-medium px-3 py-2 whitespace-nowrap transition-colors border-b-2 ${
                activeSection === sec.id
                  ? 'text-gold border-gold'
                  : 'text-cream/50 border-transparent'
              }`}
            >
              {sec.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Welcome Banner */}
      <section className="bg-background">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl text-foreground">{t.welcomeBack} {firstName}</h1>
          {!bannerDismissed && (
            <div className="rounded-2xl px-4 py-3 max-w-lg border border-border relative bg-card">
              <p className="text-sm leading-relaxed pr-6 text-muted-foreground">
                
                <span className="font-semibold text-foreground">{t.newBadge}</span> — {t.newBody}{" "}
                <Link to={t.salaryKitLink} className="font-semibold hover:underline inline-flex items-center gap-0.5 text-gold">
                  {t.checkItOut} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
              <button
                onClick={() => setBannerDismissed(true)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full hover:bg-muted transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5 text-muted-foreground" />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Onboarding Checklist */}
      <section className="bg-card">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-6">
          <OnboardingChecklist lang={lang} />
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-4 md:pt-6">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-muted-foreground" />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border border-border pl-10 pr-12 py-3 text-sm outline-none transition-shadow focus:ring-2 focus:ring-gold bg-background text-foreground"
            />
          </div>

          {/* Search Results */}
          {searchResults !== null && (
            <div className="mb-8">
              {searchResults.length === 0 ? (
                <p className="text-sm text-center py-6 text-muted-foreground">{t.noResults}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map(item => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5 bg-card shadow-[var(--dash-card-shadow)] hover:shadow-[var(--dash-card-hover-shadow)]"
                    >
                      <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block bg-gold/15 text-gold">
                        {item.type}
                      </span>
                      <h4 className="text-sm font-bold mb-1 text-foreground">{item.title[lang]}</h4>
                      <p className="text-xs leading-relaxed text-muted-foreground">{item.desc[lang]}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Recently Used */}
          {!searchResults && recentCards.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4 text-muted-foreground">
                {t.recentlyUsed}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentCards.map(item => {
                  const badge = getProgressBadge(item.id, lang, t);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-2xl border-l-[3px] border-l-gold p-4 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-3 bg-card shadow-[var(--dash-card-shadow)] hover:shadow-[var(--dash-card-hover-shadow)]"
                    >
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold text-foreground">{item.title[lang]}</h4>
                        <p className="text-xs mt-0.5 text-muted-foreground">{item.type === "tool" ? t.navTools : t.navResources}</p>
                        {badge && (
                          <span className="text-[10px] font-semibold mt-1 inline-block px-1.5 py-0.5 rounded-full bg-gold/15 text-gold">
                            {badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto shrink-0 text-gold" />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Your Tools */}
          <div id="tools" style={{ scrollMarginTop: '80px' }}>
            <h2 className="font-heading text-2xl md:text-3xl mb-2 text-foreground">{t.toolsHeading}</h2>
            <p className="text-sm md:text-base mb-8 text-muted-foreground">{t.toolsSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const badge = getProgressBadge(tool.id, lang, t);
                return (
                  <Link
                    key={tool.path}
                    to={lang === "zh" && tool.zhPath ? tool.zhPath : tool.path}
                    onClick={() => trackTool(tool.id)}
                    className="group rounded-2xl border-l-[4px] border-l-gold p-4 md:p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5 bg-card shadow-[var(--dash-card-shadow)] hover:shadow-[var(--dash-card-hover-shadow)]"
                  >
                    <span
                      className="w-9 h-9 rounded-full flex items-center justify-center shrink-0 text-foreground"
                      style={{ backgroundColor: tool.iconBg }}
                    >
                      {tool.icon}
                    </span>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-[15px] font-bold text-foreground leading-snug">
                        {tool.title[lang]}
                        {["resume-analyzer", "resume-builder", "offer-calculator", "interview-questions"].includes(tool.id) && (
                          <span className="ml-2 text-[10px] font-semibold uppercase tracking-wide px-1.5 py-0.5 rounded-full align-middle bg-gold/15 text-gold">Beta</span>
                        )}
                      </h3>
                      <p className="text-xs leading-relaxed text-muted-foreground mt-0.5 line-clamp-2">{tool.description[lang]}</p>
                      {badge && (
                        <span className="text-[10px] font-semibold mt-1 inline-block px-1.5 py-0.5 rounded-full bg-gold/15 text-gold">
                          {badge}
                        </span>
                      )}
                      {tool.id === "resume-analyzer" && (
                        <p className="text-[11px] font-medium mt-1 text-muted-foreground">
                          {lang === "zh"
                            ? `本月已使用 ${analyzerUsed}/${analyzerLimit} 次`
                            : `${analyzerUsed}/${analyzerLimit} analyses used this month`}
                        </p>
                      )}
                    </div>
                    <ArrowRight className="w-4 h-4 shrink-0 transition-transform group-hover:translate-x-1 text-gold" />
                  </Link>
                );
              })}
            </div>

            {/* Latest Analysis Report */}
            {latestAnalysis && (
              <div className="mt-6 rounded-2xl border border-border p-5 flex items-center gap-4 bg-card shadow-[var(--dash-card-shadow)]">
                <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0 bg-[#EEF2FF]">
                  <BarChart3 className="w-5 h-5 text-foreground" />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-0.5">
                    {lang === "zh" ? "最近的履歷分析" : "Latest Resume Analysis"}
                  </p>
                  <p className="text-sm font-bold text-foreground">
                    {lang === "zh" ? "分數" : "Score"}: {latestAnalysis.overall_score}/100
                    <span className="text-xs font-normal text-muted-foreground ml-2">
                      {new Date(latestAnalysis.created_at).toLocaleDateString(lang === "zh" ? "zh-TW" : "en-US", { month: "short", day: "numeric" })}
                    </span>
                  </p>
                </div>
                <div className="flex gap-2 shrink-0">
                  <button
                    onClick={() => {
                      if (latestAnalysis.analysis_result) {
                        sessionStorage.setItem("resume-analysis-result", JSON.stringify(latestAnalysis.analysis_result));
                        sessionStorage.setItem("resume-analysis-lang", latestAnalysis.language === "zh-TW" ? "zh-TW" : "en");
                      }
                      window.location.href = lang === "zh" ? "/zh-tw/resume-analyzer" : "/resume-analyzer";
                    }}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-gold hover:bg-gold/10"
                  >
                    {lang === "zh" ? "查看報告" : "View Report"}
                  </button>
                  <Link
                    to={lang === "zh" ? "/zh-tw/resume-analyzer" : "/resume-analyzer"}
                    className="text-xs font-semibold px-3 py-1.5 rounded-lg transition-colors text-muted-foreground hover:bg-muted"
                  >
                    {lang === "zh" ? "重新分析" : "Retake"}
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* Resources / Journey Section */}
          <div id="resources" className="mt-16" style={{ scrollMarginTop: '80px' }}>
            <h2 className="font-heading text-2xl md:text-3xl mb-2 text-foreground">{t.resourcesHeading}</h2>
            <p className="text-sm md:text-base mb-8 text-muted-foreground">{t.resourcesSub}</p>

            {JOURNEY_META.map((journey) => {
              const items = journeyItems.filter((i) => i.tag === journey.tag);
              if (items.length === 0) return null;
              return (
                <JourneySection
                  <SEO />
                  key={journey.tag}
                  tag={journey.tag}
                  label={journey.label[lang]}
                  icon={journey.icon}
                  color={journey.color}
                  items={items}
                  lang={lang}
                  onTrack={trackResource}
                  allItems={journeyItems}
                  hasSeen={hasSeen}
                />
              );
            })}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
          <span className="text-sm text-muted-foreground text-center w-full">
            {t.footerCopyright}
          </span>
        </div>
      </footer>
      <NpsPulse locale="en" />
    </>
  );
}