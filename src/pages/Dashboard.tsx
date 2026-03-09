import { useState, useEffect, useRef, useCallback, useMemo, memo, MouseEvent } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import LanguageToggle from "@/components/LanguageToggle";
import { ArrowRight, FileText, DollarSign, PenTool, ClipboardList, Search, X, Sparkles, Check } from "lucide-react";
import PageSEO from "@/components/PageSEO";
import LazySection from "@/components/LazySection";
import { useRecentlyUsed, type RecentItem } from "@/hooks/useRecentlyUsed";
import { getActiveJobs } from "@/lib/jobStore";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type GuideTag = "getting-started" | "applying" | "negotiating";

interface Guide {
  id: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  enPath: string;
  zhPath?: string;
  tag: GuideTag;
  isNew?: boolean;
  miniOf?: string;
}

interface ToolkitItem {
  id: string;
  title: { en: string; zh: string };
  desc: { en: string; zh: string };
  enPath: string;
  zhPath: string;
}

interface ToolItem {
  id: string;
  icon: React.ReactNode;
  iconBg: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  path: string;
}

/* ── Design tokens ── */
const C = {
  cream: '#FDFBF7',
  white: '#FFFFFF',
  darkGreen: '#1B3A2F',
  navGreen: '#2D3A2E',
  gold: '#D4930D',
  goldHover: '#E0A520',
  goldFaded: 'rgba(212,147,13,0.15)',
  text: '#1A1A1A',
  textSecondary: '#6B6B6B',
  cardShadow: '0 2px 8px rgba(0,0,0,0.06)',
  cardHoverShadow: '0 8px 24px rgba(27,58,47,0.08)',
  toolkitBg: '#F0EDE8',
  tagGreen: '#2D6A4F',
  tagBlue: '#1D4ED8',
  tagGold: '#B8860B',
};

const noiseOverlay = 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")';

const TAG_COLORS: Record<GuideTag, string> = {
  "getting-started": C.tagGreen,
  applying: C.tagBlue,
  negotiating: C.tagGold,
};

const tools: ToolItem[] = [
  {
    id: "resume-analyzer",
    icon: <FileText className="w-5 h-5" />,
    iconBg: "#EEF2FF",
    title: { en: "Resume Analyzer", zh: "履歷健檢" },
    description: { en: "Upload your resume. Get a recruiter-level score and specific fixes in 60 seconds.", zh: "上傳履歷，60 秒內拿到 Recruiter 視角的評分與具體改善建議。" },
    path: "/resume-analyzer",
  },
  {
    id: "resume-builder",
    icon: <PenTool className="w-5 h-5" />,
    iconBg: "#FFF7ED",
    title: { en: "Resume Builder", zh: "履歷編輯器" },
    description: { en: "Build a recruiter-approved resume from scratch using proven templates.", zh: "用實戰驗證的模板，從頭打造一份讓 Recruiter 點頭的履歷。" },
    path: "/resume",
  },
  {
    id: "job-tracker",
    icon: <ClipboardList className="w-5 h-5" />,
    iconBg: "#F0F9FF",
    title: { en: "Job Tracker", zh: "求職進度追蹤" },
    description: { en: "Track every application, interview, and follow-up in one place. Stop losing opportunities.", zh: "所有投遞、面試、後續跟進，一個地方搞定。不再漏掉任何機會。" },
    path: "/jobs",
  },
  {
    id: "offer-calculator",
    icon: <DollarSign className="w-5 h-5" />,
    iconBg: "#FEF9C3",
    title: { en: "Offer Calculator", zh: "Offer 試算器" },
    description: { en: "See how much more you'd earn over 30 years by negotiating strategically.", zh: "算算看，策略性談薪 30 年下來能多賺多少。" },
    path: "/offer-calculator",
  },
];

const guides: Guide[] = [
  { id: "pivot-guide", title: { en: "Pivot Method Guide", zh: "轉職攻略" }, description: { en: "The complete 5-stage framework for changing careers without starting over.", zh: "完整 5 階段架構，讓你換跑道不必砍掉重練。" }, enPath: "/pivot-method-guide", zhPath: "/zh-tw/pivot-method-guide", tag: "getting-started" },
  { id: "pivot-mini", title: { en: "Pivot Method Mini Guide", zh: "轉職攻略精華版" }, description: { en: "The same framework in 8 minutes. For when you need the short version.", zh: "同一套架構，8 分鐘讀完。趕時間的你適用。" }, enPath: "/pivot-method-mini-guide", zhPath: "/zh-tw/pivot-method-mini-guide", tag: "getting-started", miniOf: "pivot-guide" },
  { id: "linkedin-guide", title: { en: "LinkedIn Guide", zh: "LinkedIn 優化指南" }, description: { en: "How to optimize your LinkedIn so recruiters actually find you.", zh: "怎麼調整 LinkedIn，讓 Recruiter 主動來找你。" }, enPath: "/linkedin-guide", zhPath: "/zh-tw/linkedin-guide", tag: "getting-started" },
  { id: "linkedin-brand", title: { en: "LinkedIn Branding Guide", zh: "LinkedIn 個人品牌指南" }, description: { en: "Build a personal brand that gets you inbound opportunities. Not just a profile update.", zh: "打造個人品牌，讓機會主動找上門。不只是改個大頭照。" }, enPath: "/linkedin-branding-guide", zhPath: "/zh-tw/linkedin-branding-guide", tag: "getting-started" },
  { id: "resume-guide", title: { en: "Resume Guide", zh: "履歷撰寫指南" }, description: { en: "The complete guide to writing a resume that passes the 6-second recruiter scan.", zh: "完整教學，寫出能通過 Recruiter 6 秒掃描的履歷。" }, enPath: "/resume-guide", tag: "applying" },
  { id: "resume-ref", title: { en: "Resume Quick Reference", zh: "履歷速查表" }, description: { en: "One-page cheat sheet. The rules I check every resume against.", zh: "一頁濃縮。我審履歷時會看的所有重點。" }, enPath: "/resume-quick-reference", zhPath: "/zh-tw/resume-quick-reference", tag: "applying", miniOf: "resume-guide" },
  { id: "interview-prep", title: { en: "Interview Prep Guide", zh: "面試準備指南" }, description: { en: "How to prepare for interviews at foreign companies in Taiwan. What they actually ask and why.", zh: "在台灣準備外商面試的完整攻略。他們問什麼、為什麼這樣問。" }, enPath: "/interview-prep-guide", zhPath: "/zh-tw/interview-prep-guide", tag: "applying" },
  { id: "interview-full", title: { en: "Interview Preparation Guide", zh: "面試完整準備手冊" }, description: { en: "The extended version with practice questions, frameworks, and recruiter-insider tips.", zh: "進階版：附練習題、回答框架、Recruiter 內部觀點。" }, enPath: "/interview-preparation-guide", zhPath: "/zh-tw/interview-preparation-guide", tag: "applying" },
  { id: "salary-kit", title: { en: "Salary Starter Kit", zh: "談薪入門懶人包" }, description: { en: "Everything you need before your next salary conversation. Scripts, data, templates.", zh: "下次談薪前你需要的一切：話術、數據、範本。" }, enPath: "/salary-starter-kit", zhPath: "/zh-tw/salary-starter-kit", tag: "negotiating" },
];

const toolkitItems: ToolkitItem[] = [
  { id: "tk-scripts", title: { en: "Deflection Scripts", zh: "薪資迴避話術" }, desc: { en: "What to say when they ask your salary expectations too early. Word-for-word scripts.", zh: "對方太早問期望薪資怎麼辦？逐字話術直接用。" }, enPath: "/toolkit/scripts", zhPath: "/zh-tw/toolkit/scripts" },
  { id: "tk-offer", title: { en: "Offer Response", zh: "Offer 回覆範本" }, desc: { en: "How to respond to an offer without accepting or rejecting. Buy time and negotiate better.", zh: "收到 Offer 後怎麼回覆才不會太快答應又不失禮。爭取時間，談更好的條件。" }, enPath: "/toolkit/offer-response", zhPath: "/zh-tw/toolkit/offer-response" },
  { id: "tk-counter", title: { en: "Counteroffer Email", zh: "還價信範本" }, desc: { en: "Copy-paste email templates for countering an offer professionally.", zh: "專業還價 email 範本，複製貼上就能用。" }, enPath: "/toolkit/counteroffer", zhPath: "/zh-tw/toolkit/counteroffer" },
  { id: "tk-calc", title: { en: "Compensation Calculator", zh: "總薪酬計算器" }, desc: { en: "Calculate your total comp — base, bonus, stock, benefits — so you compare offers properly.", zh: "底薪、獎金、股票、福利全部算進來，才能真正比較 Offer。" }, enPath: "/toolkit/calculator", zhPath: "/zh-tw/toolkit/calculator" },
  { id: "tk-calc-int", title: { en: "Comp Calculator Interactive", zh: "薪酬互動試算" }, desc: { en: "The interactive version. Plug in two offers and see the real difference.", zh: "互動版。輸入兩個 Offer，一眼看出真正差多少。" }, enPath: "/toolkit/calculator-interactive", zhPath: "/zh-tw/toolkit/calculator-interactive" },
  { id: "tk-pushback", title: { en: "Pushback Cheat Sheet", zh: "談判反擊速查" }, desc: { en: "When they say 'this is our best offer' or 'the budget is fixed' — here's what to say back.", zh: "對方說「這已經是最好的 Offer 了」或「預算就這樣」— 你可以這樣回。" }, enPath: "/toolkit/pushback", zhPath: "/zh-tw/toolkit/pushback" },
  { id: "tk-raise", title: { en: "Raise One-Pager", zh: "加薪提案單" }, desc: { en: "A one-page template to present your case for a raise to your manager. Data-backed, not emotional.", zh: "一頁式範本，用數據向主管提加薪。講證據，不講感覺。" }, enPath: "/toolkit/raise", zhPath: "/zh-tw/toolkit/raise" },
  { id: "tk-log", title: { en: "Achievement Log", zh: "成就紀錄簿" }, desc: { en: "Track your wins weekly so when review time comes, you have the evidence ready.", zh: "每週記錄你的成果，績效考核時直接拿出來用。" }, enPath: "/toolkit/log", zhPath: "/zh-tw/toolkit/log" },
];

const filterTabsEn = [
  { label: "All", value: "all" as const },
  { label: "Getting Started", value: "getting-started" as const },
  { label: "Applying", value: "applying" as const },
  { label: "Negotiating", value: "negotiating" as const },
];
const filterTabsZh = [
  { label: "全部", value: "all" as const },
  { label: "起步準備", value: "getting-started" as const },
  { label: "投遞申請", value: "applying" as const },
  { label: "薪資談判", value: "negotiating" as const },
];

const groupLabelsEn: Record<GuideTag, string> = { "getting-started": "Getting Started", applying: "Applying", negotiating: "Negotiating" };
const groupLabelsZh: Record<GuideTag, string> = { "getting-started": "起步準備", applying: "投遞申請", negotiating: "薪資談判" };

const i18n = {
  en: {
    seoTitle: "Dashboard — James Bugden",
    seoDesc: "Your career tools dashboard.",
    signOut: "Sign out",
    hey: "Hey",
    welcomeBack: "Welcome back,",
    newBadge: "New: Salary Starter Kit",
    newBody: "Everything you need to negotiate your next offer. Scripts, templates, and the exact numbers.",
    checkItOut: "Check it out",
    toolsHeading: "Your Tools",
    toolsSub: "Interactive tools built with real recruiting data. Use them as many times as you need.",
    launch: "Launch",
    guidesHeading: "Guides",
    guidesSub: "Step-by-step playbooks for every stage of your job search. Written by a recruiter, not a career blogger.",
    toolkitHeading: "Salary Negotiation Toolkit",
    toolkitSub: "A complete system for negotiating your offer. Start with the index, then use each tool when you need it.",
    toolkitIndex: "Toolkit Index",
    toolkitIndexDesc: "The full overview of every tool in this kit. Read this first to know what to use and when.",
    startHere: "START HERE",
    ctaHeading: "Want 1-on-1 help?",
    ctaBody: "These tools get you 80% of the way. If you want someone to look at your specific situation — resume, interviews, salary negotiation — I work with a few people each month.",
    ctaButton: "See If You're a Fit",
    ctaTrust: "Free intro call · No commitment · No pressure",
    footerCopyright: "© 2026 All Rights Reserved",
    salaryKitLink: "/salary-starter-kit",
    toolkitIndexPath: "/toolkit",
    filterTabs: filterTabsEn,
    groupLabels: groupLabelsEn,
    dashboard: "My Toolkit",
    navTools: "Tools",
    navGuides: "Guides",
    navToolkit: "Toolkit",
    searchPlaceholder: "Search tools, guides, and resources…",
    noResults: "No results found. Try a different keyword.",
    recentlyUsed: "Pick Up Where You Left Off",
    recommended: "Recommended for You",
    lastScore: "Last score",
    activeApps: "active applications",
    done: "Done",
    read: "read",
  },
  zh: {
    seoTitle: "我的專區 — James Bugden",
    seoDesc: "你的職涯工具與資源中心。",
    signOut: "登出",
    hey: "",
    welcomeBack: "歡迎回來，",
    newBadge: "新上線：談薪入門懶人包",
    newBody: "下次談薪前你需要的一切 — 話術、範本、還有實際數字。",
    checkItOut: "立即查看",
    toolsHeading: "工具",
    toolsSub: "根據真實招募經驗打造的互動工具，不限次數使用。",
    launch: "開啟",
    guidesHeading: "指南",
    guidesSub: "求職每個階段的完整攻略。由 Recruiter 撰寫，不是職涯部落客。",
    toolkitHeading: "談薪工具包",
    toolkitSub: "一套完整的談薪系統。建議先看索引，再依需求使用各工具。",
    toolkitIndex: "工具包總覽",
    toolkitIndexDesc: "所有工具的完整介紹。先讀這篇，搞清楚什麼時候用什麼。",
    startHere: "從這開始",
    ctaHeading: "想要一對一協助？",
    ctaBody: "這些工具能幫你搞定 80%。如果你想找人針對你的狀況 — 履歷、面試、談薪 — 我每個月接幾位客戶。",
    ctaButton: "了解詳情",
    ctaTrust: "免費諮詢 · 不綁約 · 零壓力",
    footerCopyright: "© 2026 版權所有",
    salaryKitLink: "/zh-tw/salary-starter-kit",
    toolkitIndexPath: "/zh-tw/toolkit",
    filterTabs: filterTabsZh,
    groupLabels: groupLabelsZh,
    dashboard: "我的專區",
    navTools: "工具",
    navGuides: "指南",
    navToolkit: "工具包",
    searchPlaceholder: "搜尋工具、指南、資源⋯",
    noResults: "沒有找到相關結果，換個關鍵字試試。",
    recentlyUsed: "接續上次進度",
    recommended: "推薦給你",
    lastScore: "上次分數",
    activeApps: "個進行中的投遞",
    done: "已完成",
    read: "已讀",
  },
};

/* ── Helper: all searchable items ── */
type SearchableItem = { id: string; type: "tool" | "guide" | "toolkit"; title: { en: string; zh: string }; desc: { en: string; zh: string }; path: string };

function buildSearchable(lang: "en" | "zh"): SearchableItem[] {
  const items: SearchableItem[] = [];
  tools.forEach(t => items.push({ id: t.id, type: "tool", title: t.title, desc: t.description, path: t.path }));
  guides.forEach(g => {
    const path = lang === "zh" && g.zhPath ? g.zhPath : g.enPath;
    items.push({ id: g.id, type: "guide", title: g.title, desc: g.description, path });
  });
  toolkitItems.forEach(tk => {
    const path = lang === "zh" ? tk.zhPath : tk.enPath;
    items.push({ id: tk.id, type: "toolkit", title: tk.title, desc: tk.desc, path });
  });
  return items;
}

/* ── Section nav items ── */
const SECTIONS = ["tools", "guides", "toolkit"] as const;

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
  if (toolId === "job-tracker") {
    try {
      const count = getActiveJobs().length;
      if (count > 0) return `${count} ${t.activeApps}`;
    } catch { /* ignore */ }
  }
  return null;
}

/* ── Guide Card ── */
const GuideCard = memo(function GuideCard({ guide, lang, onTrack }: { guide: Guide; lang: "en" | "zh"; onTrack: (id: string) => void }) {
  const path = lang === "zh" && guide.zhPath ? guide.zhPath : guide.enPath;
  const tagColor = TAG_COLORS[guide.tag];
  const tagLabel = lang === "zh" ? groupLabelsZh[guide.tag] : groupLabelsEn[guide.tag];
  const { getProgress, isComplete, toggleComplete } = useReadingProgress();
  const t = i18n[lang];
  const completed = isComplete(guide.id);
  const progress = completed ? 100 : getProgress(guide.id);

  // Find linked mini guide
  const miniGuide = guides.find(g => g.miniOf === guide.id);
  const miniPath = miniGuide ? (lang === "zh" && miniGuide.zhPath ? miniGuide.zhPath : miniGuide.enPath) : null;

  const handleToggle = (e: MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toggleComplete(guide.id);
  };

  return (
    <Link
      to={path}
      onClick={() => onTrack(guide.id)}
      className="relative rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 overflow-hidden"
      style={{ backgroundColor: C.cream, boxShadow: C.cardShadow }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
    >
      {/* Done checkbox */}
      <button
        onClick={handleToggle}
        className="absolute top-3 right-3 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors z-10"
        style={{
          borderColor: completed ? C.gold : 'rgba(0,0,0,0.2)',
          backgroundColor: completed ? C.gold : 'transparent',
        }}
        aria-label={completed ? t.done : "Mark as done"}
      >
        {completed && <Check className="w-3 h-3" style={{ color: C.white }} strokeWidth={3} />}
      </button>

      <div>
        <div className="flex items-center gap-2 mb-3">
          <span
            className="inline-block text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${tagColor}15`, color: tagColor }}
          >
            {tagLabel}
          </span>
          {progress > 0 && (
            <span className="text-[10px] font-semibold" style={{ color: completed ? C.gold : C.textSecondary }}>
              {completed ? t.done : `${progress}% ${t.read}`}
            </span>
          )}
        </div>
        <h4 className="text-base font-bold mb-1 pr-6" style={{ color: C.text }}>{guide.title[lang]}</h4>
        <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{guide.description[lang]}</p>

        {/* Mini guide quick link */}
        {miniGuide && miniPath && (
          <Link
            to={miniPath}
            onClick={(e) => { e.stopPropagation(); onTrack(miniGuide.id); }}
            className="inline-flex items-center gap-1 mt-3 text-xs font-medium transition-colors hover:opacity-80"
            style={{ color: C.gold }}
          >
            ⚡ {lang === "zh" ? `懶人包 · ${miniGuide.title.zh}` : `Mini guide · ${miniGuide.title.en}`}
          </Link>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="absolute bottom-0 left-0 right-0 h-[3px]"
        style={{ backgroundColor: 'rgba(0,0,0,0.06)' }}
      >
        <div
          className="h-full transition-all duration-500"
          style={{ width: `${progress}%`, backgroundColor: C.gold }}
        />
      </div>
    </Link>
  );
});

/* ── Main Dashboard ── */
export default function Dashboard({ lang = "en" }: { lang?: "en" | "zh" }) {
  const { user, isLoggedIn, isLoading, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState<GuideTag | "all">("all");
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSection, setActiveSection] = useState<string>("tools");
  const searchInputRef = useRef<HTMLInputElement>(null);
  const { recentItems, trackItem } = useRecentlyUsed();
  const [bannerDismissed, setBannerDismissed] = useLocalStorage("dashboard_banner_dismissed_v1", false);
  const t = i18n[lang];

  // Scroll shadow
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // IntersectionObserver for active section
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

  // Keyboard shortcut: "/" to focus search

  const scrollToSection = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const trackTool = useCallback((id: string) => trackItem(id, "tool"), [trackItem]);
  const trackGuide = useCallback((id: string) => trackItem(id, "guide"), [trackItem]);
  const trackToolkit = useCallback((id: string) => trackItem(id, "toolkit"), [trackItem]);

  // Search
  const allSearchable = useMemo(() => buildSearchable(lang), [lang]);
  const searchResults = useMemo(() => {
    const q = searchQuery.toLowerCase().trim();
    if (!q) return null;
    return allSearchable.filter(
      item => item.title[lang].toLowerCase().includes(q) || item.desc[lang].toLowerCase().includes(q)
    );
  }, [searchQuery, lang, allSearchable]);

  // Recently used / recommended
  const recentCards = useMemo(() => {
    if (recentItems.length === 0) {
      const defaultIds = ["resume-analyzer", "pivot-guide", "salary-kit"];
      return defaultIds.map(id => allSearchable.find(s => s.id === id)!).filter(Boolean);
    }
    return recentItems.map(r => allSearchable.find(s => s.id === r.id)).filter(Boolean) as SearchableItem[];
  }, [recentItems, allSearchable]);

  // Smart next-step recommendation
  const nextStep = useMemo(() => {
    const usedIds = new Set(recentItems.map(r => r.id));
    if (usedIds.size === 0) return null; // show defaults instead
    const hasResumeAnalyzer = usedIds.has("resume-analyzer");
    const hasJobTracker = usedIds.has("job-tracker");
    const hasSalaryKit = usedIds.has("salary-kit") || usedIds.has("tk-scripts") || usedIds.has("tk-counter") || usedIds.has("tk-offer");

    if (!hasResumeAnalyzer) {
      return {
        path: "/resume-analyzer",
        label: { en: "Suggested Next Step", zh: "建議下一步" },
        title: { en: "Start with your resume", zh: "先從履歷開始" },
        desc: { en: "Get a recruiter-level score and specific fixes in 60 seconds.", zh: "60 秒拿到 Recruiter 視角的評分與改善建議。" },
      };
    }
    if (!hasJobTracker) {
      return {
        path: "/jobs",
        label: { en: "Suggested Next Step", zh: "建議下一步" },
        title: { en: "Track your applications", zh: "開始追蹤你的投遞" },
        desc: { en: "Organize every application, interview, and follow-up in one place.", zh: "所有投遞、面試、跟進，一個地方搞定。" },
      };
    }
    if (!hasSalaryKit) {
      return {
        path: lang === "zh" ? "/zh-tw/salary-starter-kit" : "/salary-starter-kit",
        label: { en: "Suggested Next Step", zh: "建議下一步" },
        title: { en: "Prepare to negotiate", zh: "準備談薪" },
        desc: { en: "Scripts, templates, and the exact numbers for your next offer.", zh: "話術、範本、還有你下個 Offer 需要的實際數字。" },
      };
    }
    return null;
  }, [recentItems, lang]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ backgroundColor: C.cream }}>
        <div className="w-8 h-8 border-4 rounded-full animate-spin" style={{ borderColor: C.gold, borderTopColor: 'transparent' }} />
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    (lang === "zh" ? "你" : "there");

  const primaryGuides = guides.filter(g => !g.miniOf);
  const filteredGuides = activeFilter === "all" ? primaryGuides : primaryGuides.filter((g) => g.tag === activeFilter);

  const groupedGuides = activeFilter === "all"
    ? (["getting-started", "applying", "negotiating"] as GuideTag[]).map((tag) => ({
        tag,
        label: t.groupLabels[tag],
        items: primaryGuides.filter((g) => g.tag === tag),
      }))
    : null;

  const sectionNavItems = [
    { id: "tools", label: t.navTools },
    { id: "guides", label: t.navGuides },
    { id: "toolkit", label: t.navToolkit },
  ];

  return (
    <>
      <PageSEO title={t.seoTitle} description={t.seoDesc} path={lang === "zh" ? "/zh-tw/dashboard" : "/dashboard"} />

      {/* Nav */}
      <nav
        className={`sticky top-0 z-50 bg-executive-green transition-shadow duration-300 ${
          scrolled ? 'shadow-lg shadow-black/20' : ''
        }`}
      >
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 h-14">
          <div className="flex items-center gap-3">
            <Link to="/" className="font-heading text-lg tracking-wide text-cream">JAMES BUGDEN</Link>
            <span className="text-cream/40 text-sm hidden sm:inline">/</span>
            <span className="text-sm font-semibold hidden sm:inline text-cream/80">{t.dashboard}</span>
          </div>

          {/* Section nav pills (desktop) */}
          <div className="hidden md:flex items-center gap-1">
            {sectionNavItems.map((sec) => (
              <button
                key={sec.id}
                onClick={() => scrollToSection(sec.id)}
                className="text-sm font-medium px-3 py-1 rounded-full transition-colors"
                style={
                  activeSection === sec.id
                    ? { backgroundColor: 'rgba(212,147,13,0.2)', color: C.gold }
                    : { color: 'rgba(253,251,247,0.65)' }
                }
              >
                {sec.label}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-cream/60">{t.hey} {firstName}</span>
            <button onClick={signOut} className="hover:opacity-80 transition-opacity text-cream/60">{t.signOut}</button>
            <LanguageToggle variant="nav" />
          </div>
        </div>

        {/* Mobile section nav */}
        <div className="md:hidden border-t border-white/10 flex overflow-x-auto px-4 gap-1">
          {sectionNavItems.map((sec) => (
            <button
              key={sec.id}
              onClick={() => scrollToSection(sec.id)}
              className="text-sm font-medium px-3 py-2 whitespace-nowrap transition-colors"
              style={
                activeSection === sec.id
                  ? { color: C.gold, borderBottom: `2px solid ${C.gold}` }
                  : { color: 'rgba(253,251,247,0.5)', borderBottom: '2px solid transparent' }
              }
            >
              {sec.label}
            </button>
          ))}
        </div>
      </nav>

      {/* Welcome Banner */}
      <section style={{ backgroundColor: C.cream }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl" style={{ color: C.text }}>{t.welcomeBack} {firstName}.</h1>
          {!bannerDismissed && (
            <div
              className="rounded-2xl px-4 py-3 max-w-lg border relative"
              style={{ borderColor: 'rgba(0,0,0,0.08)', backgroundColor: C.white }}
            >
              <p className="text-sm leading-relaxed pr-6" style={{ color: C.textSecondary }}>
                <span className="mr-1.5">🆕</span>
                <span className="font-semibold" style={{ color: C.text }}>{t.newBadge}</span> — {t.newBody}{" "}
                <Link to={t.salaryKitLink} className="font-semibold hover:underline inline-flex items-center gap-0.5" style={{ color: C.gold }}>
                  {t.checkItOut} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </p>
              <button
                onClick={() => setBannerDismissed(true)}
                className="absolute top-2.5 right-2.5 p-1 rounded-full hover:bg-black/5 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3.5 h-3.5" style={{ color: C.textSecondary }} />
              </button>
            </div>
          )}
        </div>
      </section>

      {/* Search + Recently Used */}
      <section style={{ backgroundColor: C.white }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 pt-10 md:pt-14">
          {/* Search */}
          <div className="relative mb-8">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4.5 h-4.5" style={{ color: C.textSecondary }} />
            <input
              ref={searchInputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={t.searchPlaceholder}
              className="w-full rounded-xl border pl-10 pr-12 py-3 text-sm outline-none transition-shadow focus:ring-2"
              style={{
                borderColor: 'rgba(0,0,0,0.1)',
                backgroundColor: C.cream,
                color: C.text,
                // @ts-ignore
                '--tw-ring-color': C.gold,
              }}
            />
          </div>

          {/* Search Results */}
          {searchResults !== null && (
            <div className="mb-8">
              {searchResults.length === 0 ? (
                <p className="text-sm text-center py-6" style={{ color: C.textSecondary }}>{t.noResults}</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {searchResults.map(item => (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-2xl p-5 transition-all duration-200 hover:-translate-y-0.5"
                      style={{ backgroundColor: C.cream, boxShadow: C.cardShadow }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
                    >
                      <span
                        className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full mb-2 inline-block"
                        style={{ backgroundColor: C.goldFaded, color: C.gold }}
                      >
                        {item.type}
                      </span>
                      <h4 className="text-sm font-bold mb-1" style={{ color: C.text }}>{item.title[lang]}</h4>
                      <p className="text-xs leading-relaxed" style={{ color: C.textSecondary }}>{item.desc[lang]}</p>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Smart Next Step */}
          {!searchResults && nextStep && (
            <div className="mb-6">
              <Link
                to={nextStep.path}
                className="rounded-2xl border p-5 flex items-center gap-4 transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: C.goldFaded, borderColor: C.gold, boxShadow: C.cardShadow }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
              >
                <span className="w-10 h-10 rounded-full flex items-center justify-center shrink-0" style={{ backgroundColor: C.gold }}>
                  <Sparkles className="w-5 h-5" style={{ color: C.white }} />
                </span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold uppercase tracking-wider mb-0.5" style={{ color: C.gold }}>{nextStep.label[lang]}</p>
                  <h4 className="text-sm font-bold" style={{ color: C.text }}>{nextStep.title[lang]}</h4>
                  <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{nextStep.desc[lang]}</p>
                </div>
                <ArrowRight className="w-5 h-5 shrink-0" style={{ color: C.gold }} />
              </Link>
            </div>
          )}

          {/* Recently Used / Recommended */}
          {!searchResults && recentCards.length > 0 && (
            <div className="mb-8">
              <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textSecondary }}>
                {recentItems.length > 0 ? t.recentlyUsed : t.recommended}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {recentCards.map(item => {
                  const badge = getProgressBadge(item.id, lang, t);
                  return (
                    <Link
                      key={item.id}
                      to={item.path}
                      className="rounded-2xl border-l-[3px] p-4 transition-all duration-200 hover:-translate-y-0.5 flex items-center gap-3"
                      style={{ backgroundColor: C.cream, borderLeftColor: C.gold, boxShadow: C.cardShadow }}
                      onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
                      onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
                    >
                      <div className="min-w-0">
                        <h4 className="text-sm font-bold" style={{ color: C.text }}>{item.title[lang]}</h4>
                        <p className="text-xs mt-0.5" style={{ color: C.textSecondary }}>{item.type === "tool" ? t.navTools : item.type === "guide" ? t.navGuides : t.navToolkit}</p>
                        {badge && (
                          <span className="text-[10px] font-semibold mt-1 inline-block px-1.5 py-0.5 rounded-full" style={{ backgroundColor: C.goldFaded, color: C.gold }}>
                            {badge}
                          </span>
                        )}
                      </div>
                      <ArrowRight className="w-4 h-4 ml-auto shrink-0" style={{ color: C.gold }} />
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Main Content */}
      <main className="min-h-[60vh]" style={{ backgroundColor: C.white }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Your Tools */}
          <div id="tools" style={{ scrollMarginTop: '80px' }}>
            <h2 className="font-heading text-2xl md:text-3xl mb-2" style={{ color: C.text }}>{t.toolsHeading}</h2>
            <p className="text-sm md:text-base mb-8" style={{ color: C.textSecondary }}>{t.toolsSub}</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {tools.map((tool) => {
                const badge = getProgressBadge(tool.id, lang, t);
                return (
                  <Link
                    key={tool.path}
                    to={tool.path}
                    onClick={() => trackTool(tool.id)}
                    className="group rounded-2xl border-l-[4px] p-6 md:p-7 min-h-[180px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                    style={{ backgroundColor: C.cream, borderLeftColor: C.gold, boxShadow: C.cardShadow }}
                    onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
                    onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
                  >
                    <div>
                      <div className="flex items-center gap-3 mb-3">
                        <span
                          className="w-10 h-10 rounded-full flex items-center justify-center shrink-0"
                          style={{ backgroundColor: tool.iconBg, color: C.text }}
                        >
                          {tool.icon}
                        </span>
                        {badge && (
                          <span
                            className="text-[11px] font-semibold px-2 py-0.5 rounded-full"
                            style={{ backgroundColor: C.goldFaded, color: C.gold }}
                          >
                            {badge}
                          </span>
                        )}
                      </div>
                      <h3 className="text-lg font-bold mb-1" style={{ color: C.text }}>{tool.title[lang]}</h3>
                      <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{tool.description[lang]}</p>
                    </div>
                    <div className="flex justify-end mt-4">
                      <span className="inline-flex items-center gap-1 text-sm font-semibold transition-all" style={{ color: C.gold }}>
                        {t.launch} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Guides Section */}
          <div id="guides" className="mt-16" style={{ scrollMarginTop: '80px' }}>
            <h2 className="font-heading text-2xl md:text-3xl mb-2" style={{ color: C.text }}>{t.guidesHeading}</h2>
            <p className="text-sm md:text-base mb-6" style={{ color: C.textSecondary }}>{t.guidesSub}</p>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
              {t.filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className="whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-full border transition-colors"
                  style={
                    activeFilter === tab.value
                      ? { backgroundColor: C.gold, color: C.white, borderColor: C.gold }
                      : { backgroundColor: C.white, color: C.text, borderColor: 'rgba(0,0,0,0.12)' }
                  }
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeFilter === "all" && groupedGuides ? (
              groupedGuides.map((group) => (
                <div key={group.tag} className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: C.textSecondary }}>{group.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((guide) => <GuideCard key={guide.enPath} guide={guide} lang={lang} onTrack={trackGuide} />)}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGuides.map((guide) => <GuideCard key={guide.enPath} guide={guide} lang={lang} onTrack={trackGuide} />)}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Salary Negotiation Toolkit */}
      <LazySection minHeight="400px" id="toolkit" style={{ scrollMarginTop: '80px' }}>
      <section style={{ backgroundColor: C.toolkitBg }}>
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl mb-2" style={{ color: C.text }}>{t.toolkitHeading}</h2>
          <p className="text-sm md:text-base mb-8" style={{ color: C.textSecondary }}>{t.toolkitSub}</p>

          {/* Featured Card */}
          <Link
            to={t.toolkitIndexPath}
            onClick={() => trackToolkit("tk-index")}
            className="relative block rounded-2xl border-l-[4px] p-6 md:p-8 mb-6 transition-all duration-200 hover:-translate-y-0.5"
            style={{ backgroundColor: C.cream, borderLeftColor: C.gold, boxShadow: C.cardShadow }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
          >
            <span
              className="absolute top-4 right-4 text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide"
              style={{ backgroundColor: C.gold, color: C.white }}
            >
              {t.startHere}
            </span>
            <span className="text-2xl mb-3 block">📖</span>
            <h3 className="text-lg font-bold mb-1" style={{ color: C.text }}>{t.toolkitIndex}</h3>
            <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{t.toolkitIndexDesc}</p>
          </Link>

          {/* Toolkit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkitItems.map((item, idx) => (
              <Link
                key={item.enPath}
                to={lang === "zh" ? item.zhPath : item.enPath}
                onClick={() => trackToolkit(item.id)}
                className="relative rounded-2xl p-6 md:p-7 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5"
                style={{ backgroundColor: C.cream, boxShadow: C.cardShadow }}
                onMouseEnter={e => (e.currentTarget.style.boxShadow = C.cardHoverShadow)}
                onMouseLeave={e => (e.currentTarget.style.boxShadow = C.cardShadow)}
              >
                <span
                  className="absolute top-4 right-4 font-heading text-2xl font-bold"
                  style={{ color: C.goldFaded }}
                >
                  {String(idx + 1).padStart(2, "0")}
                </span>
                <div>
                  <h4 className="text-base font-bold mb-1 pr-8" style={{ color: C.text }}>{item.title[lang]}</h4>
                  <p className="text-sm leading-relaxed" style={{ color: C.textSecondary }}>{item.desc[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      </LazySection>

      {/* Coaching CTA */}
      <LazySection minHeight="250px">
      <section className="relative overflow-hidden" style={{ background: `linear-gradient(135deg, ${C.darkGreen} 0%, #152E1F 100%)` }}>
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: noiseOverlay, backgroundSize: '128px 128px' }} />
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20 text-center relative z-10">
          <h2
            className="font-heading mb-4"
            style={{ color: '#FBF7F0', fontSize: 'clamp(1.5rem, 3vw, 2.5rem)' }}
          >
            {t.ctaHeading}
          </h2>
          <p
            className="text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed"
            style={{ color: 'rgba(251,247,240,0.85)' }}
          >
            {t.ctaBody}
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-semibold px-8 py-3 rounded-lg transition-colors text-base"
            style={{ backgroundColor: C.gold, color: C.white }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = C.goldHover)}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = C.gold)}
          >
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-sm mt-4" style={{ color: '#A8B5A9' }}>{t.ctaTrust}</p>
        </div>
      </section>
      </LazySection>

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
    </>
  );
}
