import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { ArrowRight } from "lucide-react";
import PageSEO from "@/components/PageSEO";

type GuideTag = "getting-started" | "applying" | "negotiating";

interface Guide {
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  enPath: string;
  zhPath?: string;
  tag: GuideTag;
  isNew?: boolean;
}

interface ToolkitItem {
  title: { en: string; zh: string };
  desc: { en: string; zh: string };
  enPath: string;
  zhPath: string;
}

interface ToolItem {
  emoji: string;
  title: { en: string; zh: string };
  description: { en: string; zh: string };
  path: string;
}

const tools: ToolItem[] = [
  {
    emoji: "📄",
    title: { en: "Resume Analyzer", zh: "履歷分析器" },
    description: { en: "Upload your resume. Get a recruiter-level score and specific fixes in 60 seconds.", zh: "上傳你的履歷，60 秒內獲得招募等級的評分與具體修改建議。" },
    path: "/resume-analyzer",
  },
  {
    emoji: "💰",
    title: { en: "Offer Calculator", zh: "Offer 計算機" },
    description: { en: "See how much more you'd earn over 30 years by negotiating strategically.", zh: "看看透過策略性談判，30 年內你能多賺多少。" },
    path: "/offer-calculator",
  },
  {
    emoji: "⚖️",
    title: { en: "Offer Calculator Compare", zh: "Offer 比較計算機" },
    description: { en: "Compare two offers side by side — base, bonus, stock, benefits — and see the real difference.", zh: "並排比較兩個 Offer——底薪、獎金、股票、福利——看看真正的差距。" },
    path: "/offer-calculator/compare",
  },
  {
    emoji: "📝",
    title: { en: "Resume Builder", zh: "履歷產生器" },
    description: { en: "Build a recruiter-approved resume from scratch using proven templates.", zh: "使用經過驗證的模板，從頭打造一份招募官認可的履歷。" },
    path: "/resume",
  },
  {
    emoji: "📋",
    title: { en: "Job Tracker", zh: "求職追蹤器" },
    description: { en: "Track every application, interview, and follow-up in one place. Stop losing opportunities.", zh: "在同一個地方追蹤每一份申請、面試和跟進，不再錯失機會。" },
    path: "/jobs",
  },
];

const guides: Guide[] = [
  { title: { en: "Pivot Method Guide", zh: "職涯轉型方法指南" }, description: { en: "The complete 5-stage framework for changing careers without starting over.", zh: "完整的五階段框架，幫你轉換跑道而不用從零開始。" }, enPath: "/pivot-method-guide", zhPath: "/zh-tw/pivot-method-guide", tag: "getting-started" },
  { title: { en: "Pivot Method Mini Guide", zh: "職涯轉型迷你指南" }, description: { en: "The same framework in 8 minutes. For when you need the short version.", zh: "同樣的框架，8 分鐘讀完。需要精簡版的時候用。" }, enPath: "/pivot-method-mini-guide", zhPath: "/zh-tw/pivot-method-mini-guide", tag: "getting-started" },
  { title: { en: "LinkedIn Guide", zh: "LinkedIn 指南" }, description: { en: "How to optimize your LinkedIn so recruiters actually find you.", zh: "如何優化你的 LinkedIn，讓招募官真的找得到你。" }, enPath: "/linkedin-guide", zhPath: "/zh-tw/linkedin-guide", tag: "getting-started" },
  { title: { en: "LinkedIn Branding Guide", zh: "LinkedIn 個人品牌指南" }, description: { en: "Build a personal brand that gets you inbound opportunities. Not just a profile update.", zh: "打造一個能帶來主動機會的個人品牌，不只是更新檔案。" }, enPath: "/linkedin-branding-guide", zhPath: "/zh-tw/linkedin-branding-guide", tag: "getting-started" },
  { title: { en: "Resume Guide", zh: "履歷指南" }, description: { en: "The complete guide to writing a resume that passes the 6-second recruiter scan.", zh: "完整指南：寫出能通過招募官 6 秒篩選的履歷。" }, enPath: "/resume-guide", tag: "applying" },
  { title: { en: "Resume Quick Reference", zh: "履歷速查表" }, description: { en: "One-page cheat sheet. The rules I check every resume against.", zh: "一頁速查表。我檢查每份履歷時使用的標準。" }, enPath: "/resume-quick-reference", zhPath: "/zh-tw/resume-quick-reference", tag: "applying" },
  { title: { en: "Interview Prep Guide", zh: "面試準備指南" }, description: { en: "How to prepare for interviews at foreign companies in Taiwan. What they actually ask and why.", zh: "如何準備台灣外商面試。他們實際問什麼、為什麼這樣問。" }, enPath: "/interview-prep-guide", zhPath: "/zh-tw/interview-prep-guide", tag: "applying" },
  { title: { en: "Interview Preparation Guide", zh: "面試準備完整指南" }, description: { en: "The extended version with practice questions, frameworks, and recruiter-insider tips.", zh: "延伸版本，包含練習題、框架與招募內部人士的建議。" }, enPath: "/interview-preparation-guide", zhPath: "/zh-tw/interview-preparation-guide", tag: "applying" },
  { title: { en: "Salary Starter Kit", zh: "薪資談判入門包" }, description: { en: "Everything you need before your next salary conversation. Scripts, data, templates.", zh: "下次薪資對話前你需要的一切。腳本、數據、模板。" }, enPath: "/salary-starter-kit", zhPath: "/zh-tw/salary-starter-kit", tag: "negotiating" },
];

const toolkitItems: ToolkitItem[] = [
  { title: { en: "Deflection Scripts", zh: "迴避話術腳本" }, desc: { en: "What to say when they ask your salary expectations too early. Word-for-word scripts.", zh: "當他們太早問你期望薪資時該怎麼說。逐字腳本。" }, enPath: "/toolkit/scripts", zhPath: "/zh-tw/toolkit/scripts" },
  { title: { en: "Offer Response", zh: "Offer 回覆指南" }, desc: { en: "How to respond to an offer without accepting or rejecting. Buy time and negotiate better.", zh: "如何回覆 Offer 而不接受或拒絕。爭取時間，談出更好條件。" }, enPath: "/toolkit/offer-response", zhPath: "/zh-tw/toolkit/offer-response" },
  { title: { en: "Counteroffer Email", zh: "還價信模板" }, desc: { en: "Copy-paste email templates for countering an offer professionally.", zh: "可直接複製貼上的專業還價信模板。" }, enPath: "/toolkit/counteroffer", zhPath: "/zh-tw/toolkit/counteroffer" },
  { title: { en: "Compensation Calculator", zh: "薪資計算機" }, desc: { en: "Calculate your total comp — base, bonus, stock, benefits — so you compare offers properly.", zh: "計算你的總薪酬——底薪、獎金、股票、福利——正確比較 Offer。" }, enPath: "/toolkit/calculator", zhPath: "/zh-tw/toolkit/calculator" },
  { title: { en: "Comp Calculator Interactive", zh: "互動式薪資計算機" }, desc: { en: "The interactive version. Plug in two offers and see the real difference.", zh: "互動版本。輸入兩個 Offer，看看真正的差異。" }, enPath: "/toolkit/calculator-interactive", zhPath: "/zh-tw/toolkit/calculator-interactive" },
  { title: { en: "Pushback Cheat Sheet", zh: "反擊話術速查表" }, desc: { en: "When they say 'this is our best offer' or 'the budget is fixed' — here's what to say back.", zh: "當他們說「這是最好的條件」或「預算固定了」——你可以這樣回。" }, enPath: "/toolkit/pushback", zhPath: "/zh-tw/toolkit/pushback" },
  { title: { en: "Raise One-Pager", zh: "加薪提案單頁" }, desc: { en: "A one-page template to present your case for a raise to your manager. Data-backed, not emotional.", zh: "一頁模板，用數據向主管提出加薪案。理性而非感性。" }, enPath: "/toolkit/raise", zhPath: "/zh-tw/toolkit/raise" },
  { title: { en: "Achievement Log", zh: "成就紀錄表" }, desc: { en: "Track your wins weekly so when review time comes, you have the evidence ready.", zh: "每週記錄你的成就，績效考核時你就有現成的證據。" }, enPath: "/toolkit/log", zhPath: "/zh-tw/toolkit/log" },
];

const filterTabsEn = [
  { label: "All", value: "all" as const },
  { label: "Getting Started", value: "getting-started" as const },
  { label: "Applying", value: "applying" as const },
  { label: "Negotiating", value: "negotiating" as const },
];
const filterTabsZh = [
  { label: "全部", value: "all" as const },
  { label: "入門準備", value: "getting-started" as const },
  { label: "求職申請", value: "applying" as const },
  { label: "薪資談判", value: "negotiating" as const },
];

const groupLabelsEn: Record<GuideTag, string> = { "getting-started": "Getting Started", applying: "Applying", negotiating: "Negotiating" };
const groupLabelsZh: Record<GuideTag, string> = { "getting-started": "入門準備", applying: "求職申請", negotiating: "薪資談判" };

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
    salaryKitLink: "/salary-starter-kit",
    toolkitIndexPath: "/toolkit",
    filterTabs: filterTabsEn,
    groupLabels: groupLabelsEn,
  },
  zh: {
    seoTitle: "儀表板 — James Bugden",
    seoDesc: "你的職涯工具儀表板。",
    signOut: "登出",
    hey: "嗨",
    welcomeBack: "歡迎回來，",
    newBadge: "最新：薪資談判入門包",
    newBody: "下次談判前你需要的一切。腳本、模板，還有精確的數字。",
    checkItOut: "了解更多",
    toolsHeading: "你的工具",
    toolsSub: "以真實招募數據打造的互動工具。你可以無限次使用。",
    launch: "開啟",
    guidesHeading: "指南",
    guidesSub: "求職每個階段的實戰手冊。由招募官撰寫，而非職涯部落客。",
    toolkitHeading: "薪資談判工具包",
    toolkitSub: "一套完整的談判系統。先從索引開始，需要時再使用各個工具。",
    toolkitIndex: "工具包索引",
    toolkitIndexDesc: "這套工具包的完整概覽。先讀這篇，了解該用什麼、什麼時候用。",
    startHere: "從這裡開始",
    ctaHeading: "想要一對一協助？",
    ctaBody: "這些工具能幫你完成 80%。如果你想要有人針對你的情況——履歷、面試、薪資談判——我每個月會和幾位夥伴合作。",
    ctaButton: "看看是否適合你",
    ctaTrust: "免費初次通話 · 無需承諾 · 無壓力",
    salaryKitLink: "/zh-tw/salary-starter-kit",
    toolkitIndexPath: "/zh-tw/toolkit",
    filterTabs: filterTabsZh,
    groupLabels: groupLabelsZh,
  },
};

function GuideCard({ guide, lang }: { guide: Guide; lang: "en" | "zh" }) {
  const path = lang === "zh" && guide.zhPath ? guide.zhPath : guide.enPath;
  return (
    <Link to={path} className="relative bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium">
      {guide.isNew && (
        <span className="absolute top-3 right-3 bg-gold text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">NEW</span>
      )}
      <div>
        <h4 className="text-base font-bold text-foreground mb-1">{guide.title[lang]}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{guide.description[lang]}</p>
      </div>
    </Link>
  );
}

export default function Dashboard({ lang = "en" }: { lang?: "en" | "zh" }) {
  const { user, isLoggedIn, isLoading, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState<GuideTag | "all">("all");
  const t = i18n[lang];

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    (lang === "zh" ? "你" : "there");

  const filteredGuides = activeFilter === "all" ? guides : guides.filter((g) => g.tag === activeFilter);

  const groupedGuides = activeFilter === "all"
    ? (["getting-started", "applying", "negotiating"] as GuideTag[]).map((tag) => ({
        tag,
        label: t.groupLabels[tag],
        items: guides.filter((g) => g.tag === tag),
      }))
    : null;

  return (
    <>
      <PageSEO title={t.seoTitle} description={t.seoDesc} path={lang === "zh" ? "/zh-tw/dashboard" : "/dashboard"} />

      {/* Nav */}
      <nav className="bg-executive text-cream-light sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 h-14">
          <Link to="/" className="font-heading text-lg tracking-wide text-white">JAMES BUGDEN</Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-white/80">{t.hey} {firstName}</span>
            <button onClick={signOut} className="text-white/70 hover:text-white transition-colors">{t.signOut}</button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Welcome Banner */}
      <section className="bg-executive">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl text-white">{t.welcomeBack} {firstName}.</h1>
          <div className="bg-white/10 rounded-lg px-4 py-3 max-w-lg">
            <p className="text-white/90 text-sm leading-relaxed">
              <span className="mr-1.5">🆕</span>
              <span className="font-semibold text-white">{t.newBadge}</span> — {t.newBody}{" "}
              <Link to={t.salaryKitLink} className="text-gold font-semibold hover:underline inline-flex items-center gap-0.5">
                {t.checkItOut} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-background min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Your Tools */}
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">{t.toolsHeading}</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">{t.toolsSub}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-[3px] border-l-gold p-6 min-h-[180px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
              >
                <div>
                  <span className="text-2xl mb-3 block">{tool.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{tool.title[lang]}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.description[lang]}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:text-gold-dark transition-colors">
                    {t.launch} <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Guides Section */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">{t.guidesHeading}</h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">{t.guidesSub}</p>

            <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
              {t.filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                    activeFilter === tab.value
                      ? "bg-gold text-white border-gold"
                      : "bg-card text-foreground border-border hover:border-gold/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeFilter === "all" && groupedGuides ? (
              groupedGuides.map((group) => (
                <div key={group.tag} className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{group.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((guide) => <GuideCard key={guide.enPath} guide={guide} lang={lang} />)}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGuides.map((guide) => <GuideCard key={guide.enPath} guide={guide} lang={lang} />)}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Salary Negotiation Toolkit */}
      <section className="bg-[hsl(39_20%_90%)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">{t.toolkitHeading}</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">{t.toolkitSub}</p>

          {/* Featured Card */}
          <Link to={t.toolkitIndexPath} className="relative block bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-[4px] border-l-gold p-6 md:p-8 mb-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium bg-gradient-to-r from-gold/5 to-transparent">
            <span className="absolute top-4 right-4 bg-gold text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">{t.startHere}</span>
            <span className="text-2xl mb-3 block">📖</span>
            <h3 className="text-lg font-bold text-foreground mb-1">{t.toolkitIndex}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{t.toolkitIndexDesc}</p>
          </Link>

          {/* Toolkit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {toolkitItems.map((item) => (
              <Link
                key={item.enPath}
                to={lang === "zh" ? item.zhPath : item.enPath}
                className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
              >
                <div>
                  <h4 className="text-base font-bold text-foreground mb-1">{item.title[lang]}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc[lang]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching CTA */}
      <section className="bg-executive">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">{t.ctaHeading}</h2>
          <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">{t.ctaBody}</p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
          >
            {t.ctaButton} <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/50 text-sm mt-4">{t.ctaTrust}</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-10 text-center">
        <p className="font-heading text-lg text-foreground/60 mb-1">JAMES BUGDEN</p>
        <p className="text-muted-foreground text-sm mb-1">james.careers</p>
        <p className="text-muted-foreground/60 text-xs">© 2026 All Rights Reserved</p>
      </footer>
    </>
  );
}
