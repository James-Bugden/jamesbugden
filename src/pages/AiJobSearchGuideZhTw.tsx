import { FileText, Clock, Linkedin, Bot, Target, Briefcase, Send, MessageSquare, DollarSign, AlertTriangle, CheckCircle2, XCircle, ArrowRight, ChevronDown, Menu, Search, Zap, BookOpen, Copy, Check } from "lucide-react";

import { AI_GUIDE_PROMPTS } from "@/data/aiGuidePrompts";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">
    {num}
  </span>
);

const Collapsible = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 bg-card hover:bg-muted/50 transition-colors text-left">
        <span className="text-foreground font-medium text-sm md:text-base">{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5 bg-card border-t border-border">{children}</div>}
    </div>
  );
};

const AiPromptBlock = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = typeof children === "string" ? children : (children as any)?.toString?.() ?? "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-muted/50 border border-border rounded-xl p-4 md:p-5 my-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-gold" />
          <span className="text-sm font-semibold text-gold">AI 提示詞</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted">
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "已複製" : "複製"}
        </button>
      </div>
      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-background/50 rounded-lg p-4 overflow-x-auto">{children}</pre>
    </div>
  );
};

const CopyAllPromptsButton = ({ lang }: { lang: "en" | "zh" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyAll = () => {
    const allText = AI_GUIDE_PROMPTS.map(stage =>
      `--- 階段 ${stage.stage}：${lang === "zh" ? stage.titleZh : stage.titleEn} ---\n\n` +
      stage.prompts.map(p => `[${lang === "zh" ? p.stepZh : p.step}]\n${lang === "zh" ? p.promptZh : p.promptEn}`).join("\n\n")
    ).join("\n\n\n");
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button onClick={handleCopyAll} className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors px-4 py-2.5 rounded-lg border border-gold/30 hover:bg-gold/5">
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "已複製所有提示詞！" : "複製所有提示詞"}
    </button>
  );
};

const RecruiterCheck = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-executive/5 border-l-4 border-gold rounded-r-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Search className="w-5 h-5 text-gold" />
      <span className="text-sm font-semibold text-gold">招募官真心話</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Zap className="w-5 h-5 text-gold" />
      <span className="text-sm font-semibold text-gold">小技巧</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const ActionStep = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      <span className="text-sm font-semibold text-green-600">行動</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const CommonMistake = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 md:p-5 my-6">
    <div className="flex items-center gap-2 mb-2">
      <XCircle className="w-5 h-5 text-red-500" />
      <span className="text-sm font-semibold text-red-500">{title}</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

/* ─── Table of Contents ─── */
const tocSections = [
  { id: "intro", label: "前言" },
  { id: "find-path", label: "01 · 找到方向" },
  { id: "linkedin", label: "02 · LinkedIn 防線" },
  { id: "resume", label: "03 · 履歷進攻" },
  { id: "apply", label: "04 · 投遞系統" },
  { id: "interview", label: "05 · 完勝面試" },
  { id: "negotiate", label: "06 · 薪資談判" },
  { id: "mistakes", label: "07 · AI 錯誤" },
  { id: "mindset", label: "08 · 心態轉換" },
  { id: "checklist", label: "09 · 檢核表" },
  { id: "resources", label: "10 · 資源" },
];

const TableOfContents = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">目錄</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${
                active === id
                  ? "border-gold text-gold font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile floating TOC */}
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="目錄"
        >
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">目錄</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setOpen(false);
                  }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${
                    active === id
                      ? "border-gold text-gold font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const AiJobSearchGuideZhTw = () => {
  useTrackGuideProgress("ai-job-search-guide-zh");
  const [checklistState, setChecklistState] = useState<Record<number, boolean[]>>({});
  const toggleChecklist = (stageIndex: number, itemIndex: number) => {
    setChecklistState(prev => {
      const stage = [...(prev[stageIndex] || [])];
      stage[itemIndex] = !stage[itemIndex];
      return { ...prev, [stageIndex]: stage };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/ai-job-search-guide", title: "AI 求職指南｜更快找到工作", description: "使用ChatGPT、Claude和AI工具加速求職流程。" })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><ThreadsIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </nav>

      <TableOfContents />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            如何用 AI 掌控你的<br className="hidden sm:block" />整個求職過程
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            從職涯方向到最終 Offer，每個階段都用 ChatGPT
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60 italic">
              根據 Jeremy Schifeling 的《Career Coach GPT》撰寫 · 指南作者：James Bugden
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-cream/50">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 總計 4-6 小時</span>
            <span className="w-1 h-1 rounded-full bg-cream/20" />
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> 10 個章節</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* ═══════════════ 前言 ═══════════════ */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground">前言：為什麼 AI 改變了求職的一切</h2>

          <p className="text-muted-foreground leading-relaxed">我是 James。我是一名在台灣工作的招募官。我在這裡已經超過 13 年了。我待過台灣的新創公司，也待過在台北設點的美國科技公司。我每年審閱超過 10,000 份申請。我曾在六個月內將一個工程團隊從 10 人擴展到 80 人。</p>
          <p className="text-muted-foreground leading-relaxed">這份指南中的所有內容，都來自我在這個市場的真實招募經驗。</p>
          <p className="text-muted-foreground leading-relaxed">我花了超過 20 小時閱讀、測試和撰寫這份內容，基礎是 Jeremy Schifeling 的《Career Coach GPT》。這本書是我看過最好的 AI 求職指南之一。我把他的系統拿來，用我每天身為招募官看到的現實進行壓力測試，再加上只有站在招募端的人才能給你的內部視角。</p>
          <p className="text-muted-foreground leading-relaxed">事實是：大多數求職者花了太多時間做錯誤的事。他們把同一份履歷投給 100 個職缺。他們面試靠臨場發揮。他們拿到第一個 offer 就直接接受，從不談判。AI 無法修正錯誤的策略。但當你把 AI 和正確的系統結合起來，它能把幾週的工作壓縮成幾小時。</p>
          <p className="text-muted-foreground leading-relaxed font-medium text-foreground">這份指南就是給你那套系統。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">如何使用這份指南：</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>按順序完成每個章節。系統是一步一步建構的。</li>
              <li>複製提示詞，貼到 ChatGPT（或 Claude，或任何 AI 工具），填入你的資料。</li>
              <li>每一步完成後就採取行動。更新你的 LinkedIn、修改履歷、準備面試答案。</li>
              <li>針對每個你瞄準的職稱重複這些練習。</li>
              <li>求職期間保持這份指南打開。它是拿來用的，不是拿來讀完就放著的。</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">每次 AI 產出結果後，問自己三個問題：</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>這聽起來像我自己說的話，還是像機器人寫的？</li>
              <li>我有沒有加入自己的數據、工具和具體細節？</li>
              <li>如果面試時要講這段話，我會自在嗎？</li>
            </ol>
            <p className="text-sm text-muted-foreground">如果任何一個答案是「不」，就重寫。</p>
          </div>

          <p className="text-foreground font-semibold">準備好了嗎？在另一個分頁打開 ChatGPT（或 Claude）。你大約 60 秒後就會開始用到它。</p>

          <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 md:p-6">
            <p className="text-foreground font-semibold mb-3">預估總時間：4-6 小時完成所有章節</p>
            <p className="text-sm text-muted-foreground mb-3">這比大多數人花在一週漫無目的求職上的時間還短。以下是時間分配：</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• 找到方向：45 分鐘</li>
              <li>• LinkedIn：60 分鐘</li>
              <li>• 履歷：每個版本 90 分鐘</li>
              <li>• 投遞系統：30 分鐘設定</li>
              <li>• 面試準備：每家公司 2-3 小時</li>
              <li>• 談判：每輪 30 分鐘</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ 第 1 章：找到方向 ═══════════════ */}
      <section id="find-path" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">找到你的方向</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 分鐘</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">在你開始寫履歷、建 LinkedIn 個人檔案、甚至開始投遞之前，你需要先想清楚。AI 只有在你指對方向時才能幫到你。</p>
          <p className="text-muted-foreground leading-relaxed">大多數人完全跳過這一步。他們直接開始投遞任何看起來跟自己經歷沾得上邊的職缺。這是我從求職者身上看到的最大錯誤。當你不清楚自己要什麼，你做的一切（履歷、LinkedIn、面試回答）都會變得很泛。泛泛的東西會被淘汰。</p>
          <p className="text-muted-foreground leading-relaxed">這個章節幫助你把技能、興趣和背景轉化為具體的職稱。招募官搜尋的是職稱，不是模糊的類別，例如「科技工作」或「創意類職位」。如果你不知道自己瞄準的職稱是什麼，你就是隱形的。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.1 產生職稱清單</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">這個練習給你一個起點，讓你跳脫選擇困難。把你的技能、興趣和背景餵給 AI，讓它產生你可能沒想過的具體職稱。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">注意：只放入你想讓 AI 考慮的資訊。如果你不想讓它太聚焦在學術背景，就不要放你的科系。如果你想要一個跟過去工作脫鉤的全新開始，就不要放你的履歷。</p>
          <AiPromptBlock>{`根據以下資訊，產生 10 個可能適合我的具體職稱：

我最喜歡的技能：____
我的興趣：____
我的科系：____
我的履歷：____`}</AiPromptBlock>
          <RecruiterCheck>當我在 LinkedIn Recruiter 上搜尋候選人時，我在搜尋欄輸入的是精確的職稱。「軟體工程師」、「產品行銷經理」、「數據分析師」。我從來不會搜尋「喜歡科技又有創意的人」。如果你的目標職稱不明確，我永遠找不到你。這就是為什麼這一步比大多數人以為的更重要。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.2 探索這些角色</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">很多工作從外面看起來很吸引人，但一旦你了解日常工作的真實情況，感覺會很不一樣。新創公司的「產品經理」跟銀行的「產品經理」是完全不同的工作。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">這一步幫助你建立對每個角色的深入了解。你實際上做什麼、什麼樣的人會享受這份工作、它是否符合你的個性和偏好。目標是淘汰那些紙面上好看但不適合你生活方式或優勢的角色。</p>
          <AiPromptBlock>{`請告訴我以下每個職稱的典型一天是什麼樣子，以及什麼類型的人通常會喜歡這些工作：

[輸入職稱]`}</AiPromptBlock>
          <ProTip>拿到 AI 的回答後，去 YouTube 搜尋「[職稱] 一天的生活」。真人拍的影片會給你比任何 AI 摘要都更真實的畫面。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.3 排序這些角色</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">在這個階段，你要從「有趣的可能性」轉向「務實且契合的選項」。這個提示詞會迫使你把潛在的角色跟你的目標（收入、生活方式、影響力）和實際資歷做比較。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">它幫助你縮小清單，不只基於你喜歡什麼，也基於你能贏得什麼。</p>
          <AiPromptBlock>{`排序這些工作：
[輸入職稱]

根據我的：
職涯目標：[輸入目標]
資歷：[輸入技能 + 證照]`}</AiPromptBlock>
          <RecruiterCheck>最快找到工作的候選人，不是那些到處投遞的人。他們挑兩到三個目標職稱然後深入經營。所有東西都針對那些特定角色量身打造：履歷、LinkedIn、面試準備。專注永遠贏過分散。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.4 測試你的適合度</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">選擇角色不該只是紙上談兵。你需要真實世界的訊號。透過小任務、閱讀、專案或觀摩式活動來測試你的適合度，你能很快知道一個角色是讓你充滿幹勁還是精疲力竭。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">把這當作是你職涯決策的快速原型測試。</p>
          <AiPromptBlock>{`我可以用哪三種具體方式來測試我對以下每個角色的適合度：

[輸入角色]`}</AiPromptBlock>
          <ProTip>最快的測試方法是找到一個正在做那份工作的人，問他能不能讓你觀摩半天，或是在那個領域做一個小專案。談論一個角色永遠不等於實際做那份工作。即使是一個週末專案，也能告訴你比幾個月的研究更多的東西。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.5 向校友學習</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">沒有任何 AI 或書本能打敗一個已經在做那份工作的人的見解。LinkedIn 的校友工具幫助你聯繫跟你有相同背景的人，他們比完全陌生的人更有可能回覆你。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">跟真正的從業者交流會給你內部知識，幫助你建立可能帶來推薦、建議和更好職涯決策的人脈。</p>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>在 LinkedIn 上搜尋你的大學。</li>
              <li>點擊大學頁面上的「校友」分頁。</li>
              <li>篩選在你感興趣領域工作的校友，也可以加上你感興趣的公司和地點。</li>
              <li>發送客製化的連結邀請：
                <blockquote className="mt-2 pl-4 border-l-2 border-gold/30 italic text-muted-foreground">「您好，我是[學校名稱]的校友，目前正在職涯的十字路口。我正在考慮是否要走您這條路。您是否願意抽 10 分鐘視訊聊聊，讓我從您的經歷中學習？」</blockquote>
              </li>
              <li>用以下問題訪談他們：
                <blockquote className="mt-2 pl-4 border-l-2 border-gold/30 italic text-muted-foreground">「您典型的一天是什麼樣子？什麼類型的人通常在這個角色中會很開心？這份工作有沒有機會運用 X 技能或達成 Y 目標？」</blockquote>
              </li>
            </ol>
          </ActionStep>
          <RecruiterCheck>我每週都看到候選人選錯了角色，然後在求職途中試圖轉向。他們已經花了幾個月建立一份履歷和 LinkedIn，結果是針對一個自己根本不想要的職稱。現在花幾個小時做資訊性訪談，可以讓你免於之後痛苦地重來。</RecruiterCheck>

          <CommonMistake title="常見錯誤：跳過這個章節">
            <p>我看到的第一大錯誤是人們跳過職涯方向的釐清，直接跳到寫履歷。結果他們的履歷試圖面面俱到。那就代表對任何人都沒有說服力。如果你還沒有明確的目標職稱，停在這裡，先完成這個章節再繼續。</p>
          </CommonMistake>

          <p className="text-foreground font-medium">接下來：現在你知道自己瞄準什麼了，讓我們確保招募官能找到你。</p>
        </div>
      </section>

      {/* ═══════════════ 第 2 章：LinkedIn 防線 ═══════════════ */}
      <section id="linkedin" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">建立你的 LinkedIn 防線</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 60 分鐘</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">LinkedIn 是你最強的被動求職工具。就算你從來不主動投遞任何工作，一個優化好的 LinkedIn 個人檔案會幫你吸引招募官主動來找你。我每天花好幾個小時在 LinkedIn Recruiter 上搜尋候選人。我找到的是那些做好這個章節的人。我錯過的是那些沒做好的人。</p>
          <p className="text-muted-foreground leading-relaxed">把你的 LinkedIn 當作你的防線。你的履歷是你的進攻武器。你送它出去攻擊特定的機會。但你的 LinkedIn 全天候為你工作，即使你在睡覺也在吸引招募官。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.1 寫一個招募官真的會搜尋到的標題</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你的標題是個人檔案上最重要的一行字。如果它不清楚、太模糊、或太泛，無論你的背景多強，你都會在招募官的搜尋中消失。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">大多數人把標題留成目前公司的現職職稱。這是浪費機會。你的標題應該傳達你接下來想做什麼，而不只是你現在在做什麼。</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a542926/edit-your-headline" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何在 LinkedIn 上編輯你的標題。</a></p>
          <AiPromptBlock>{`根據以下模板、目標職稱和履歷，產生一個 120 字以內的 LinkedIn 個人檔案標題：

模板如下：
目標職稱（若候選人缺乏經驗則加上「尋求」）| 與職位相關的技能

目標職稱：[輸入職稱]

履歷：[輸入履歷]`}</AiPromptBlock>
          <RecruiterCheck>當我在 LinkedIn Recruiter 上搜尋時，標題是我在搜尋結果中看到的第一樣東西。在我點進你的個人檔案之前就看到了。如果你的標題寫「積極尋求新機會的專業人士」，我會跳過。如果寫「資深數據分析師 | SQL、Python、Tableau、A/B Testing」，我會點進去。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.2 把地點設定到你想工作的城市</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">LinkedIn 搜尋是以地點為驅動的。如果你的個人檔案顯示錯誤的城市，招募官根本不會看到你。把地點設定成你想被錄用的地方，而不是你目前住的地方。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">如果你在高雄但想在台北工作，把地點設成台北。如果你對多個城市都可以，選擇你目標領域機會最多的那個。</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a564134/change-the-location-on-your-profile" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何在 LinkedIn 上編輯你的地點。</a></p>
          <ActionStep>在 LinkedIn 設定中把地點更新為你想工作的城市。</ActionStep>
          <ProTip>如果你在台灣，想要找外商公司的職缺，一定要把地點設定為台北。大多數在台灣的跨國公司招募官，搜尋時只會用台北作為地點篩選條件。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.3 找到並加入正確的技能</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">招募官在看任何其他內容之前，先用技能來篩選。大多數人用猜的來決定要放什麼，結果漏掉了雇主真正在意的關鍵字。你需要從職缺描述中找到真正的市場需求技能，讓你的個人檔案與招聘需求對齊。</p>
          <AiPromptBlock>{`[職稱] 的職缺描述中最常列出的 20 個技能是什麼？`}</AiPromptBlock>
          <ActionStep>產生清單後，把你真的具備的每個技能加到 LinkedIn 的技能區塊。<a href="https://www.linkedin.com/help/linkedin/answer/a549047" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何在 LinkedIn 上加入技能。</a>然後請同事或同學為你最重要的三項技能背書。背書會讓你的技能在搜尋排名中更靠前。</ActionStep>
          <RecruiterCheck>LinkedIn Recruiter 讓我可以用特定技能篩選候選人。如果我在找一個有「SQL」和「A/B Testing」技能的「產品經理」，除非這些技能出現在你的個人檔案上，否則你不會出現。放在「關於」區塊裡沒有用。它們需要在技能區塊裡。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.4 把關鍵字嵌入你的經歷要點</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">技能只有在 LinkedIn 偵測得到的時候才有用。這代表你需要把它們正確地放在技能列表和經歷要點中。在你的整個個人檔案中嵌入正確的關鍵字，可以增加曝光度，幫助你在招募官搜尋時匹配職缺描述。</p>
          <AiPromptBlock>{`請把以下關鍵字加入我現有的履歷要點中。

關鍵字：[貼上關鍵字]

要點：[貼上要點]`}</AiPromptBlock>
          <ActionStep>用這些加了關鍵字的要點更新你 LinkedIn 的經歷區塊。同時把相同的關鍵字加到你的技能區塊。</ActionStep>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.5 撰寫你的「關於」區塊</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你的「關於」區塊設定了你的敘事方向。它告訴招募官你是誰、你做了什麼、你要往哪裡去。大多數人寫得太長、太模糊、或太泛。你需要一個清晰、有結構的摘要，讓你看起來有可信度且與目標角色一致。</p>
          <AiPromptBlock>{`根據以下模板、目標職稱和履歷，產生一個 1,200 字以內的 LinkedIn「關於」區塊。

模板如下：

以一句話開頭，說明候選人聚焦的目標職稱。

▶ 從履歷中抽出一個相關要點
▶ 從履歷中抽出第二個相關要點
▶ 從履歷中抽出第三個相關要點

專長：列出履歷中與目標職位最相關的技能

目標職稱：____

履歷：____`}</AiPromptBlock>
          <ProTip>你的「關於」區塊應該獨立就能看懂。讀者不需要滑過你整個經歷區塊才能理解你。把它當作電影預告片。給他們足夠的內容讓他們想了解更多，但不要讓他們需要花力氣。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.6 快速補足缺少的技能</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">如果你缺少目標角色需要的技能，你需要一個快速且務實的方法來補足差距。不要浪費六個月在你不需要的課程上。專注在能填補特定缺口的低成本、有針對性的學習路徑。</p>
          <AiPromptBlock>{`學習 [技能] 最快、最便宜的具體方法是什麼？`}</AiPromptBlock>
          <ProTip>大部分技能不需要證照。如果一個工作要求「Tableau」，一個免費的 YouTube 速成課加上你 GitHub 上的個人專案，通常就足以通過篩選階段。招募官在意的是你能不能做到，不是你在哪裡學的。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.7 正確地開啟「Open to Work」</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">這個設定控制招募官是否知道你有在找工作。關鍵是使用正確的隱私選項。</p>
          <ActionStep>在 LinkedIn 設定中開啟「Open to Work」。<a href="https://linkedin.com/help/linkedin/answer/67405" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何更改你的 Open to Work 設定。</a>如果你目前有在職或不想讓別人知道你在找工作，選擇「僅招募官可見」。這讓你對招募官是可見的，但不會廣播給你整個人脈網，包括你現在的老闆。</ActionStep>
          <RecruiterCheck>當我搜尋候選人時，LinkedIn 會標記出開啟了「Open to Work」的個人檔案。它會在我的搜尋結果中，你的名字旁邊顯示一個綠色標記。這讓我更有可能主動聯繫你，因為我知道你會回覆。開啟這個功能會讓你收到更多招募官訊息。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.8 把人脈網擴大到 500+</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">小型的 LinkedIn 人脈網會限制你的曝光度、觸及範圍和機會。大多數人只跟同學、同事和朋友連結，這讓他們的人脈網很小，個人檔案只在很窄的圈子裡流傳。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">達到 500+ 連結會給你一個真正的優勢。你看起來更有份量，你的個人檔案出現在更多搜尋中，你的內容觸及更廣的受眾。</p>
          <ActionStep>每天發送 10-20 個連結邀請給你產業裡的人、大學校友、你目標公司的人、以及過去工作的同事。幾週內你就會突破 500。</ActionStep>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.9 追蹤目標公司</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">追蹤公司會告訴 LinkedIn 你關心什麼產業和角色。它改善你的職缺推薦，也向那些公司的招募官發出你有興趣的訊號。</p>
          <AiPromptBlock>{`產生在 [Y 產業] 和 [Z 地點] 聘用 [X 職稱] 的前 100 大雇主清單。`}</AiPromptBlock>
          <ActionStep>追蹤這份清單上每一家你感興趣的公司。當那家公司的招募官搜尋候選人時，LinkedIn 會優先顯示已經追蹤該公司頁面的人。</ActionStep>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.10 優化你的大頭照</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你的照片塑造第一印象和信任感。低品質或不專業的照片會減少招募官點擊你的機率。你不需要專業攝影師，但你需要遵守三條規則：</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
            <li>緊密裁切在頭部和肩膀周圍。</li>
            <li>展現真誠、溫暖的微笑（心理學家稱之為 Duchenne 微笑）。</li>
            <li>穿著你想進入的產業的服裝。</li>
          </ol>
          <ProTip>在窗邊的自然光下拍照。乾淨、簡單的背景。不要自拍、不要從團體照裁切、不要戴太陽眼鏡。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.11 獲得推薦</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">一封有力的推薦能立即建立可信度。它證明別人看過你的工作成果並信任你的能力。</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a546682" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何在 LinkedIn 上請求推薦。</a></p>
          <AiPromptBlock>{`幫我撰寫一封向我前主管/客戶 [姓名] 請求 LinkedIn 推薦的訊息。請用友善但感恩且尊重的語氣。訊息控制在 300 字以內。`}</AiPromptBlock>
          <ActionStep>把這封訊息發給兩到三位前主管、客戶或資深同事。即使只有一封推薦，都能讓你的個人檔案比零封推薦的人可信很多。</ActionStep>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.12 加上背景照片</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你的背景照片是免費的品牌宣傳空間。大多數人空著不放，這是浪費機會。選擇一張能強化你專業、產業或你目標角色類型的圖片。</p>
          <AiPromptBlock>{`請產生 10 個 [X 角色] 在工作中的照片點子。`}</AiPromptBlock>
          <ActionStep>使用免費圖庫（Unsplash、Pexels）或用 Canva 製作一個簡單的品牌橫幅，放上你的名字和目標角色。</ActionStep>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.13 回覆每一封 InMail</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">回覆招募官的 InMail（即使回「謝謝，目前沒興趣」）會改善你的搜尋排名。它向 LinkedIn 顯示你是一個活躍、有回應的用戶。這會增加你在未來搜尋中的曝光度。</p>
          <ActionStep>至少每週檢查一次你的 LinkedIn 訊息。對不感興趣的點「不用了，謝謝」。對感興趣的回覆。</ActionStep>
          <RecruiterCheck>LinkedIn 實際上會追蹤你的回覆率，並顯示給招募官看。當我看到候選人的個人檔案上寫「通常在 1 天內回覆」，我更有可能主動聯繫。它告訴我，我的訊息不會石沈大海。</RecruiterCheck>

          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 md:p-6 my-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-500">我每天看到的 5 個 LinkedIn 錯誤</span>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
              <li><strong className="text-foreground">標題只是你的現職職稱。</strong>你在告訴招募官你現在是什麼，而不是你想要什麼。永遠要加入你的目標角色和關鍵技能。</li>
              <li><strong className="text-foreground">地點錯誤。</strong>如果你目標是台北但個人檔案寫台南，我在搜尋結果中永遠不會看到你。</li>
              <li><strong className="text-foreground">沒有列出技能。</strong>如果你的技能區塊是空的，我根本無法篩選到你。這就像一家店門口沒有招牌。</li>
              <li><strong className="text-foreground">「關於」區塊是空的或是一大堆文字。</strong>兩個極端都會害你。使用上面的結構化模板。</li>
              <li><strong className="text-foreground">大頭照缺失或不專業。</strong>沒有照片的個人檔案，點擊率遠低於有照片的。糟糕的照片（模糊、從團體照裁切、戴太陽眼鏡的自拍）幾乎一樣糟。</li>
            </ol>
          </div>

          <p className="text-foreground font-medium">接下來：你的 LinkedIn 設定好了。現在讓我們來建立你要投遞給特定職缺的履歷。</p>
        </div>
      </section>

      {/* ═══════════════ 第 3 章：履歷 ═══════════════ */}
      <section id="resume" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">用履歷主動出擊</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 每個版本 90 分鐘</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">你的 LinkedIn 是你的防線。你的履歷是你的進攻武器。它是你送出去攻擊特定機會的東西。跟 LinkedIn 大致維持不變不同，你的履歷應該針對每個目標職稱量身打造。</p>
          <p className="text-muted-foreground leading-relaxed">大多數人寫一份履歷然後到處投。這是我看到的第二大錯誤（僅次於跳過職涯方向的釐清）。一份試圖吸引所有人的泛用履歷，結果是誰都說服不了。</p>

          <h4 className="font-heading text-lg text-gold font-semibold pt-4">設定：打好基礎 (3.1-3.8)</h4>

          <Collapsible title="3.1 取得履歷模板">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">強大的履歷從強大的結構開始。一個乾淨、經過招募官測試的模板，能消除你在版面、關鍵字、區塊和層級上的所有猜測。你只需要專注在內容上。</p>
            <ActionStep>下載一個乾淨的單欄履歷模板。避免有圖形、圖標、大頭照或多欄的模板。這些看起來漂亮但在 ATS（求職者追蹤系統）解析時會壞掉。</ActionStep>
            <RecruiterCheck>我審閱過數千份因為候選人用了華麗的雙欄模板而被 ATS 弄亂的履歷。系統讀不了它，所以顯示給我的是亂碼。如果我在前三秒內讀不了你的履歷，我就跳過。簡單打敗花俏。</RecruiterCheck>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/zh-tw/resume" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
                開啟履歷編輯器 →
              </Link>
              <Link to="/zh-tw/resume-guide" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
                閱讀履歷指南 →
              </Link>
            </div>
          </Collapsible>


          <Collapsible title="3.2 為每個職稱建立不同版本">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">每個職稱代表不同的技能、成就和關鍵字組合。因為招募官用特定的角色用語搜尋，用同一份履歷投不同職稱會讓你對每個職稱看起來都不夠格。</p>
            <ActionStep>如果你從第 1 章中瞄準了兩到三個職稱，為每個建立一個獨立的履歷檔案。清楚命名：「履歷_數據分析師.pdf」和「履歷_產品經理.pdf」。</ActionStep>
          </Collapsible>

          <Collapsible title="3.3 把目標職稱放在最上方">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">你履歷最上方的職稱是你最強的關鍵字。它告訴招募官和 ATS 你瞄準的是什麼。沒有這個，你的履歷會迫使審閱者猜測你的方向。任何困惑都會把你推出合格的那一疊。</p>
            <ActionStep>在你的名字和聯絡資訊正下方加上你的目標職稱。</ActionStep>
            <p className="text-sm text-muted-foreground mt-3"><strong>之前：</strong>姓名、電子郵件、電話，然後直接進入經歷。</p>
            <p className="text-sm text-muted-foreground"><strong>之後：</strong>姓名、電子郵件、電話，然後用粗體寫上<strong>「資深數據分析師」</strong>，然後才是經歷。</p>
          </Collapsible>

          <Collapsible title="3.4 更新地點，看起來像在地人">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">地點是招募官最先用的篩選條件之一。很多 ATS 系統會自動排除目標區域以外的候選人。即使你願意搬遷，保留目前的地點不改，可能會在任何人讀到你的履歷之前就把你從搜尋結果中移除。</p>
            <ActionStep>把你履歷上的地點更新為你打算工作的城市。如果你在新竹但想在台北工作，就填台北。</ActionStep>
          </Collapsible>

          <Collapsible title="3.5 加入相關的非正職經歷">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">不是所有有價值的經歷都來自有薪工作。專案、志工角色、實習、接案工作、學生領導經驗或社區貢獻，都能展示該工作所需的技能。如果一段經歷能證明你有能力在那個角色中成功，它就值得被放進去。</p>
            <ProTip>清楚標注這些經歷。「接案專案」、「志工」、「個人專案」。不要試圖把它們偽裝成全職工作。招募官尊重誠實和主動性。</ProTip>
          </Collapsible>

          <Collapsible title="3.6 如果你有短期工作經歷，只用年份">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">短期工作經歷可能觸發招募官的偏見或不必要的質疑。按月份顯示的日期會凸顯那段工作有多短暫，即使原因完全合理（約聘、組織重組、搬遷）。</p>
            <RecruiterCheck>當我看到履歷上寫「2023年1月 – 2023年4月」，我的大腦會立刻標記。當我看到「2023」，我幾乎不會注意到。同樣的經歷，完全不同的第一印象。善用這一點。</RecruiterCheck>
          </Collapsible>

          <Collapsible title="3.7 如果有幫助的話，加上組織背景">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">如果你的公司不出名，招募官可能會錯過它實際上有多厲害或多相關。加上一小行背景說明能幫助你為自己的經歷獲得適當的評價。</p>
            <p className="text-sm text-muted-foreground"><strong>範例：</strong>不要只寫「ABC 公司」，而是寫「ABC 公司（B 輪金融科技新創，200 名員工，服務東南亞 50,000+ 中小企業客戶）。」</p>
          </Collapsible>

          <Collapsible title="3.8 如果有幫助的話，加上說明性職稱">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">公司內部的職稱往往無法反映你實際做的工作。模糊的或公司專用的職稱可能跟招募官搜尋時用的語言不一致。</p>
            <p className="text-sm text-muted-foreground"><strong>範例：</strong>「Business Enablement Partner（技術招募官）」或「Associate III（資深數據分析師）」</p>
          </Collapsible>

          <h4 className="font-heading text-lg text-gold font-semibold pt-6">內容：寫出能拿到面試的要點 (3.9-3.17)</h4>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.9 從真實的職缺描述中提取關鍵字</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">招聘系統和招募官非常依賴關鍵字來判斷你是否匹配一個角色。從真實的職缺描述中提取最常見的關鍵字，能給你一個有數據基礎的客製化方向。</p>
          <AiPromptBlock>{`產生 [角色] 職缺描述中最重要的 20 個關鍵字。`}</AiPromptBlock>
          <ProTip>不要只用 AI 做這件事。打開五到十個你目標角色的真實職缺，標記出反覆出現的技能、工具和職責。AI 建議和真實職缺之間的交集，就是你的關鍵字金礦。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.10 每段經歷寫 3 個要點（品質重於數量）</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">每段履歷上的經歷，目標是剛好三個要點。每一個都應該展示一個具體的成就，而不是一項職責。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">三個出色的要點好過十個普通的要點。招募官是掃描式閱讀，不是逐行閱讀。三個強有力的要點能創造清晰、有力的印象。十個平庸的要點只會製造雜訊。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.11 為每段經歷加上一個成就</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你履歷上的每個角色都應該展示具體的成就，而不只是職責。成就證明你的影響力，讓你從那些只是「做任務」的候選人中脫穎而出。</p>
          <AiPromptBlock>{`我可以在 [X 經歷] 的履歷中列出哪些量化或引人注目的成就範例？`}</AiPromptBlock>
          <RecruiterCheck>一份能拿到回電和不能拿到回電的履歷，差異幾乎永遠在這裡。「管理社群媒體帳號」什麼都沒告訴我。「在 6 個月內將 Instagram 追蹤人數成長 300%，每月帶來 45 個合格潛在客戶」告訴我一切。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.12 把關鍵字和成就配對</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你列出的每個成就都應該搭配目標職缺描述中最相關的關鍵字。這能確保你最強的成就用的是招募官和 ATS 系統掃描時的精確語言。</p>
          <AiPromptBlock>{`以下哪些關鍵字適合放入我的履歷，基於以下成就？

請針對每個成就建議我清單中具體相關的關鍵字。

關鍵字：[貼上關鍵字]

成就：[貼上成就]`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.13 建立完整的要點</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">這是把所有東西結合在一起的地方。把你的成就和關鍵字組合成精煉的履歷要點。</p>
          <AiPromptBlock>{`請把這個成就和這些關鍵字組合成一個優秀的履歷要點：

成就：[貼上成就]
關鍵字：[貼上關鍵字]`}</AiPromptBlock>

          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-3 my-4">
            <p className="font-semibold text-foreground">完整範例：從原始成就到精煉要點</p>
            <p><strong>步驟 1</strong>（原始成就）：「快速招募了大量工程師」</p>
            <p><strong>步驟 2</strong>（職缺描述中的關鍵字）：全週期招募、技術招聘、招聘時間、人才尋訪、工程</p>
            <p><strong>步驟 3</strong>（組合後的要點）：「主導 35 個軟體工程職位的全週期技術招聘，涵蓋前端、後端和機器學習團隊，透過 LinkedIn 和 GitHub 的精準人才尋訪，將平均招聘時間從 65 天縮短至 38 天。」</p>
            <p><strong>步驟 4</strong>（AI 評分）：9/10 分。有力的數據、清晰的範圍、相關的關鍵字。</p>
            <div className="border-t border-border pt-3 mt-3">
              <p><strong>之前：</strong>「負責招募工程師」</p>
              <p><strong>之後：</strong>「主導 35 個軟體工程職位的全週期技術招聘，涵蓋前端、後端和機器學習團隊，透過 LinkedIn 和 GitHub 的精準人才尋訪，將平均招聘時間從 65 天縮短至 38 天。」</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.14 檢視你的要點</h3>
          <AiPromptBlock>{`請根據成就的令人印象深刻程度，以及是否包含 [X 角色] 的重要關鍵字，來評分以下的履歷要點。

並建議具體的改進方向：

[要點]`}</AiPromptBlock>
          <ProTip>AI 檢視完你的要點後，把它們大聲讀出來。如果聽起來像機器人寫的，用你自己的語氣重寫。招募官能看出 AI 生成的內容，這會讓你看起來偷懶而不是令人印象深刻。</ProTip>

          <div className="flex flex-wrap gap-3 mt-3 mb-4">
            <Link to="/zh-tw/resume-analyzer" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
              用我們的履歷分析器檢查你的關鍵字匹配率 →
            </Link>
          </div>
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.15 瞄準約 50% 的關鍵字匹配率</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">你不需要包含職缺描述中的每個關鍵字。但你需要足夠多的重要關鍵字，讓系統認定你是一個強力的匹配。</p>
          <p className="text-muted-foreground leading-relaxed text-sm">為什麼是 50%？低於 30%，ATS 可能根本不會讓你浮出來。高於 70%，你的履歷開始讀起來像是在塞關鍵字。50% 是最佳平衡點。</p>
          <AiPromptBlock>{`建議一個修訂版本，把這些關鍵字加入這個履歷要點：[關鍵字]

[履歷要點]`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.16 加入教育背景的要點</h3>
          <AiPromptBlock>{`我在 [教育背景] 中的哪些經歷可能跟 [X] 角色相關？`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.17 檢視你的教育背景要點</h3>
          <AiPromptBlock>{`請根據成就的令人印象深刻程度，以及是否包含 [X 角色] 的重要關鍵字，來評分以下的履歷要點。

並建議具體的改進方向：

[要點]`}</AiPromptBlock>
          <ProTip>教育背景要點對職涯初期或轉職的人最重要。如果你有 10 年以上的相關工作經驗，教育背景要點保持精簡就好。每個學位一行就夠了。但如果你是應屆畢業生，你的教育背景要點可能是你履歷中最強的部分。花時間把它們做到最好。</ProTip>

          <h4 className="font-heading text-lg text-gold font-semibold pt-6">打磨：最後修飾 (3.18-3.19)</h4>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.18 完成你的技能區塊</h3>
          <AiPromptBlock>{`把這些技能分類：

[貼上技能清單]`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-1 my-3">
            <p className="font-semibold text-foreground mb-2">範例輸出：</p>
            <p><strong>程式語言：</strong>Python、SQL、R、JavaScript</p>
            <p><strong>分析工具：</strong>Tableau、Power BI、Google Analytics、A/B Testing</p>
            <p><strong>專案管理：</strong>Jira、Asana、Agile/Scrum</p>
            <p><strong>語言能力：</strong>中文（母語）、英文（流利）</p>
          </div>
          <ProTip>把最相關的類別放在最前面。如果你在投數據相關的角色，以程式語言/分析工具開頭，而不是語言能力。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.19 撰寫摘要</h3>
          <AiPromptBlock>{`請根據以下履歷摘要中，我對 [X] 角色的興趣是否清晰，以及我的成就是否令人印象深刻且相關，來評分。

並建議具體的改進方向：

[輸入摘要]`}</AiPromptBlock>

          <CommonMistake title="常見錯誤：用同一份履歷投遞所有職缺">
            <p>如果你同時瞄準「數據分析師」和「商業智慧分析師」，這兩個需要不同的關鍵字重點、不同的要點排序和不同的摘要。一份試圖兼顧兩者的履歷，對兩者都只能做到平庸。多花 30 分鐘為每個職稱建立一個客製版本。這是你整個求職過程中投報率最高的活動。</p>
          </CommonMistake>

          <p className="text-foreground font-medium">接下來：你的履歷準備好了。是時候讓它發揮作用了。</p>
        </div>
      </section>

      {/* ═══════════════ 第 4 章：投遞 ═══════════════ */}
      <section id="apply" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">自動化你的求職投遞</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 30 分鐘設定，之後每天 15 分鐘</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">大多數人把求職當成一個手動、令人疲憊的過程。他們打開 LinkedIn，滑過職缺，投幾個，關掉分頁，然後重複。這個章節把它變成一個自動化運作的系統。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.1 為多個職稱設定職缺提醒</h3>
          <AiPromptBlock>{`公司最常用什麼其他職稱來代替 [角色]？`}</AiPromptBlock>
          <ActionStep>在 LinkedIn、Indeed 和任何跟你產業相關的小眾求職網站上設定職缺提醒。<a href="https://www.linkedin.com/help/linkedin/answer/a511279" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">以下是如何在 LinkedIn 上設定職缺提醒。</a>使用你的目標職稱加上兩到三個替代職稱。</ActionStep>
          <ProTip>設定每日推送，不要每週。你想在職缺發布後 24 小時內看到它，而不是七天後才看到，那時已經有 500 個人投遞了。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.2 職缺發布當天就投遞</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">速度很重要。早投遞會增加你被看到的機會，因為招募官通常會先審閱第一批申請者。</p>
          <RecruiterCheck>在 Uber，當我發布一個職缺時，我通常會在最初的 48-96 小時內開始審閱申請。前 20-30 份申請會得到最多關注。到了第五天，我可能已經有 200+ 份申請，掃描速度會快很多。排在第一批是一個真正的優勢。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.3 決定是否要寫求職信</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">不要想太多。如果雇主要求，就寫。如果你覺得它能加強你的申請（例如你在轉職，需要解釋原因），就寫。如果不會有什麼差別，就跳過，把時間花在投更多的工作上。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.4 使用求職信模板</h3>
          <AiPromptBlock>{`請根據我的技能和熱情與這個角色的契合度，來評分以下求職信。並建議具體的改進方向：

[輸入求職信]`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-3 my-4">
            <p className="font-semibold text-foreground">用三段式結構撰寫你的求職信：</p>
            <p><strong>第一段：開場。</strong>為什麼你對這個特定角色和公司感到興奮。一到兩句話。</p>
            <p><strong>第二段：技能匹配。</strong>你最相關的成就，直接對應工作要求。三到四句話，附上具體例子。</p>
            <p><strong>第三段：收尾。</strong>為什麼你是很強的人選，加上行動呼籲。一到兩句話。</p>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-5 text-sm text-muted-foreground my-4 italic">
            <p>親愛的 [招聘經理 / 招募團隊]，</p>
            <p className="mt-2">[1-2 句話：為什麼這個特定角色和公司讓你感到興奮。]</p>
            <p className="mt-2">[3-4 句話：你最相關的成就，匹配職缺要求。附上數據。]</p>
            <p className="mt-2">[1-2 句話：為什麼你是一個很強的人選。「我很期待有機會討論我在 X 方面的經驗如何能幫助貴團隊在 Y 方面取得成果。」]</p>
            <p className="mt-2">此致敬禮，<br />[你的名字]</p>
          </div>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.5 為每個雇主客製化</h3>
          <AiPromptBlock>{`把以下求職信段落改寫為聚焦在 [X 雇主]：

[輸入段落]`}</AiPromptBlock>
          <RecruiterCheck>我能在幾秒內看出一封泛用的求職信。「我欣賞貴公司在科技領域的做法」可以套用在地球上任何一家科技公司。「我一直在關注 Uber 在自動貨運配送方面的擴展以及最近與 Aurora 的合作。我在 DHL 的物流優化背景讓我很期待能為此做出貢獻。」那才告訴我你有做功課。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.6 找到能推薦你的人</h3>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>投遞後，在 LinkedIn 上搜尋並打開該雇主的公司頁面。</li>
              <li>點擊員工人數。</li>
              <li>篩選第一度人脈或學校校友。</li>
              <li>在 Hunter.io 或你的校友資料庫中查找他們的電子郵件。</li>
              <li>發送推薦請求。</li>
            </ol>
          </ActionStep>
          <div className="bg-muted/30 border border-border rounded-xl p-5 text-sm text-muted-foreground my-4 italic">
            <p className="font-semibold not-italic text-foreground mb-2">電子郵件模板：</p>
            <p>主旨：一位校友/朋友的小請求？</p>
            <p className="mt-2">[姓名] 您好，</p>
            <p className="mt-2">我剛投遞了 [公司] 的 [職位名稱]，我對這個職位很興奮。我在 [相關經歷] 的背景感覺是一個很強的匹配。</p>
            <p className="mt-2">您是否願意幫我做內部推薦？如果可以的話，這是我的履歷：[連結]。</p>
            <p className="mt-2">希望您還能因此拿到一筆推薦獎金！</p>
            <p className="mt-2">感謝您的考慮，<br />[你的名字]</p>
          </div>
          <RecruiterCheck>當一個候選人透過推薦進來時，他們的申請會在我的系統中被標記。在我待過的大部分公司，被推薦的候選人會在非推薦候選人之前被審閱。有些公司甚至有政策要求每個被推薦的人都必須接到電話面試。一封推薦郵件可以決定你的履歷是在 300 份的堆裡，還是在 48 小時內接到電話。</RecruiterCheck>

          <CommonMistake title="常見錯誤：投遞後不找推薦">
            <p>大多數人投遞後就等。最頂尖的候選人投遞後立刻尋找推薦。即使推薦人是鬆散的人脈（朋友的朋友、從未見過面的校友），它仍然比冷投遞有效得多。</p>
          </CommonMistake>

          <p className="text-foreground font-medium">接下來：投遞在進行中了。讓我們準備好他們回電時該怎麼做。</p>
        </div>
      </section>

      {/* ═══════════════ 第 5 章：面試 ═══════════════ */}
      <section id="interview" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">準備完勝面試</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 每家公司 2-3 小時</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">如果你已經走到面試階段，公司已經相信你大概能做這份工作。面試是在確認這個信念，並判斷你是不是最佳選擇。</p>
          <p className="text-muted-foreground leading-relaxed">每場面試評估兩件事。能力：你能不能做這份工作？親和力：跟你合作會不會愉快？大多數候選人只專注在能力上，忘了親和力。拿到 offer 的候選人兩者兼具。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.1 產生最可能被問到的 10 個問題</h3>
          <AiPromptBlock>{`根據以下職缺描述，產生我最可能面對的 10 個面試問題清單。針對每個問題，用挑戰-行動-結果的格式產生答案，僅根據以下履歷。

職缺描述：[貼上職缺描述]
履歷：[貼上履歷]`}</AiPromptBlock>
          <ProTip>
            <p className="mb-2">挑戰-行動-結果（CAR）格式是你最好的朋友。每個行為面試的回答都應該遵循這個結構：</p>
            <p><strong>挑戰：</strong>問題或情境是什麼？</p>
            <p><strong>行動：</strong>你具體做了什麼？</p>
            <p><strong>結果：</strong>可量化的成果是什麼？</p>
            <p className="mt-2">這讓你的答案簡潔、具體且有說服力。不會漫無邊際。不會模糊不清。只有證據。</p>
          </ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.2 練習撰寫你的答案</h3>
          <AiPromptBlock>{`我想請你針對 [Y 公司] 的 [X 角色] 面試我。從根據以下職缺描述提問開始。

然後，在我回答後，請針對我的回答提供建設性的批評，然後問下一個問題。

以下是職缺描述：[職缺描述]`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.3 練習口頭回答</h3>
          <ActionStep>使用 Claude 或 ChatGPT 的語音模式大聲練習。錄下你的回答然後回放。注意聽填充詞（「嗯」、「那個」、「就是」）、漫無邊際的回答、以及不清晰的結構。</ActionStep>
          <ProTip>標準問題的答案應該在 60-90 秒之間，行為面試的故事不超過 2 分鐘。如果你講得更久，你正在失去面試官的注意力。用計時器練習。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.4 面試前研究公司</h3>
          <AiPromptBlock>{`1) [X 公司] 面臨的 5 個最大挑戰和機會是什麼？

2) 根據以下職缺描述，一個 90 天行動計畫會是什麼樣子：[貼上職缺描述]`}</AiPromptBlock>
          <RecruiterCheck>面試中脫穎而出的候選人，是那些提出有深度問題的人。當候選人說「我注意到你們最近擴展到日本市場。在產品本地化方面最大的挑戰是什麼？」那告訴我他們做了真正的研究。當候選人問「那你們公司是做什麼的？」那告訴我他們沒有。給面試官的印象差異巨大。</RecruiterCheck>

          <CommonMistake title="常見錯誤：逐字背誦答案">
            <p>不要背腳本。記住你的關鍵故事和結構（挑戰-行動-結果）。然後練習用不同方式自然地表達它們。如果你逐字背，當面試官問了稍微不同版本的問題，你就會當機。如果你熟悉你的故事，你可以應對任何問法。</p>
          </CommonMistake>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3 my-4">
            <h4 className="font-heading text-base text-foreground font-semibold">深入了解面試準備：</h4>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/zh-tw/interview-preparation-guide" className="text-gold hover:underline font-medium">面試攻略 →</Link> 招募官的完整面試致勝指南</li>
              <li><Link to="/zh-tw/interview-questions" className="text-gold hover:underline font-medium">面試題庫 →</Link> 200+ 道真實面試題練習</li>
            </ul>
          </div>


          <p className="text-foreground font-medium">接下來：你的面試準備好了。最後一步：確保你拿到應有的薪水。</p>
        </div>
      </section>

      {/* ═══════════════ 第 6 章：談判 ═══════════════ */}
      <section id="negotiate" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">像機器人一樣談判</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 每輪 30 分鐘</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">大多數人根本不談判。他們拿到 offer，鬆了一口氣，然後立刻接受。這是在浪費桌上的錢。以我身為招募官的經驗，我可以告訴你幾乎每個 offer 都有調整空間。公司預期你會談判。</p>
          <p className="text-muted-foreground leading-relaxed">關鍵是用數據談判，不是用情緒。我把這個章節叫做「像機器人一樣談判」。把你的感受從等式中移除，讓事實替你說話。</p>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.1 根據你的目標評估 Offer</h3>
          <AiPromptBlock>{`我的職涯目標是 [X]，我的技能是 [Y]，我的興趣是 [Z]。

根據這些背景，請評估以下工作機會，幫助我判斷哪個最適合：

[輸入 offer]`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.2 背景調查你未來的老闆</h3>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>在 LinkedIn 上找到該公司的前員工。</li>
              <li>篩選來自你未來團隊的人。</li>
              <li>篩選跟你有共同點的人（同學校、共同人脈）。</li>
              <li>發一條簡短、禮貌的訊息，詢問他們在團隊中的經驗。</li>
            </ol>
          </ActionStep>
          <ProTip>具體地問：「管理風格是什麼樣的？」和「你為什麼離開？」這兩個問題的答案能告訴你比任何 Glassdoor 評論都更多的關於你未來體驗的資訊。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.3 儘早框架談判</h3>
          <AiPromptBlock>{`產生一封簡短、對話式的電子郵件給 [X 公司] 的招募官，讓他們知道我在 [Y 公司] 和 [Z 公司] 也有面試/offer。

詢問他們鑒於這些競爭機會，是否可以做 ABC（加速面試流程、更快做出最終決定、或提供更有競爭力的方案）。`}</AiPromptBlock>
          <RecruiterCheck>當候選人告訴我他們有競爭 offer，我的緊迫感會立刻改變。我會更用力地在內部推動，加速流程並爭取最好的方案。如果你不告訴我其他 offer 的事，我沒有理由加急或超出原始 offer。你分享這些不是在咄咄逼人。你在給我需要的資訊，讓我在內部為你爭取。</RecruiterCheck>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.4 用薪資數據重新錨定</h3>
          <AiPromptBlock>{`產生一封簡短、對話式的電子郵件給我的招募官，感謝他們慷慨的 offer（[輸入 offer]），並讓他們知道我想根據以下事實來探討是否有調整空間：

- 目前薪資：____
- 其他 offer：____
- 該角色/地點的薪資調查：____`}</AiPromptBlock>
          <ProTip>使用 Glassdoor、Levels.fyi、Salary.com 或當地薪資調查的數據。如果是台灣市場的薪資數據，可以查看 104.com.tw 的薪資報告、CakeResume 的薪資洞察、以及 Glassdoor 台灣。當你說「根據我的調查，這個角色在台北的市場範圍是 X 到 Y」，你在給招募官彈藥，讓他去跟用人主管爭取。沒有數據，他就沒有理由去為加薪背書。</ProTip>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.5 反駁第二次 Offer</h3>
          <AiPromptBlock>{`我請招募官匹配這個 offer：[X]。

他們回覆了以下訊息：[Y]。

產生一個簡短、對話式的回覆，請他們做得更好，鑒於我在這些其他公司的機會：[Z]`}</AiPromptBlock>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.6 如果薪資談不動，改變焦點</h3>
          <AiPromptBlock>{`產生一封簡短、對話式的電子郵件給我的招募官，提出在 [X 薪資] 上讓步以換取 [Y 福利]。`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground my-4">
            <p className="font-semibold text-foreground mb-3">底薪以外的可談判項目：</p>
            <ul className="space-y-1.5">
              <li>• 簽約金</li>
              <li>• 股票 / 股票選擇權</li>
              <li>• 搬遷補助</li>
              <li>• 職稱升級</li>
              <li>• 遠端工作彈性</li>
              <li>• 額外假期天數</li>
              <li>• 提前或延後的入職日期</li>
              <li>• 專業發展預算</li>
              <li>• 績效考核時程（更早的考核 = 更早的加薪機會）</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.7 成交</h3>
          <AiPromptBlock>{`產生一封簡短、對話式的電子郵件給我的招募官，說我準備接受並拒絕其他 offer，但我需要他們滿足 [一個最後條件] 才能成交。`}</AiPromptBlock>
          <RecruiterCheck>這是談判中最有力的一招。當候選人告訴我「我想跟你們簽約，我準備好拒絕其他 offer，我只需要 X 就能成交」，我會去找我的用人主管全力爭取。我知道如果我們給了這一樣東西，就能鎖定這個候選人。那個確定性讓內部審批容易很多。</RecruiterCheck>

          <CommonMistake title="常見錯誤：完全不談判">
            <p>我看過無數候選人拿到 offer 後連問都不問就接受了。公司有預算能給更多。用人主管預期會有還價。但候選人太開心拿到 offer，就當場說好了。即使只是禮貌地問一句「底薪有沒有彈性？」就可能帶來 5-15% 的增加。那是每年幾萬塊台幣，在你整個職涯中複利成長。全部來自一句話。</p>
          </CommonMistake>
        </div>
      </section>

      {/* ═══════════════ 第 7 章：AI 錯誤 ═══════════════ */}
      <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">AI 求職的 7 大錯誤</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">在幫助數百位求職者和審閱數千份申請後，以下是我最常看到的 AI 相關求職錯誤。</p>

          {[
            { title: "錯誤 1：複製貼上 AI 的輸出，不做編輯", body: "招募官能看出 AI 生成的文字。它太精緻、太泛，缺乏只有你自己才知道的具體細節。永遠要加入你自己的數據、工具、團隊規模和成果。如果它聽起來像誰都能寫的，那它對誰都沒有說服力。" },
            { title: "錯誤 2：把 AI 當替代品而不是起點", body: "AI 給你的是草稿。僅此而已。你仍然需要重寫、個人化，並對它產出的每樣東西做壓力測試。最好的候選人用 AI 完成 70%，然後加入讓它變成自己的那 30%。" },
            { title: "錯誤 3：跑提示詞時沒有餵入你的真實資料", body: "這份指南中的提示詞會要求你的履歷、技能、目標。如果你把那些欄位留空或寫得很模糊，AI 的輸出也會很模糊。你的輸入越具體，輸出就越有用。" },
            { title: "錯誤 4：信任 AI 的關鍵字建議卻不對照真實職缺", body: "AI 產生的關鍵字清單是起點，不是最終答案。永遠要跟五到十個你目標角色的真實職缺交叉核對。AI 建議和真實職缺之間的交集，才是金礦所在。" },
            { title: "錯誤 5：讓 AI 替你寫面試回答", body: "AI 能幫你用挑戰-行動-結果的結構來組織答案。但故事需要來自你的真實經歷。如果面試官問追問題而你無法展開說明，他們就知道你沒有真的經歷過那個故事。" },
            { title: "錯誤 6：用同一份 AI 生成的履歷投遞所有工作", body: "AI 讓建立客製版本變得很快。當你可以在 15 分鐘內產生一個客製版本時，用同一份履歷投遞每份工作是沒有藉口的。" },
            { title: "錯誤 7：用沒有大聲讀過的 AI 草稿郵件來談判", body: "AI 能替你草擬談判郵件。但在談判中，語氣比文字更重要。發送前大聲讀出每封郵件。如果聽起來像機器人或有攻擊性，用你自己的語氣重寫。" },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-2">
              <h3 className="font-heading text-lg text-foreground font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0" />
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 第 8 章：心態轉換 ═══════════════ */}
      <section id="mindset" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">心態轉換：舊思維 vs. 新思維</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">舊思維</th>
                  <th className="text-left py-3 px-4 text-gold font-semibold">新思維</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ["「我之後再想我要什麼。」", "先搞清楚方向。專注的求職快 10 倍。"],
                  ["「我的履歷應該列出所有職責。」", "你的履歷應該用數據證明你的影響力。"],
                  ["「我投 100 份然後看看會怎樣。」", "投 20 份，每份都有客製化材料和推薦。"],
                  ["「我應該等完美的工作出現。」", "設定提醒，當天投遞，自己創造機運。"],
                  ["「人脈經營很尷尬，沒有用。」", "一封推薦信勝過 50 份冷投遞。"],
                  ["「談判很失禮或有風險。」", "招募官預期你會談判。不談判就是浪費桌上的錢。"],
                  ["「AI 會替我寫好一切。」", "AI 寫草稿。你來精修。你的個人化才是關鍵。"],
                  ["「我現在先隨便找一份工作就好。」", "找錯工作比專注搜尋花的時間更多。"],
                ].map(([old, newT], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4">{old}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{newT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════ 第 9 章：檢核表 ═══════════════ */}
      <section id="checklist" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">快速參考：完整的 AI 求職檢核表</h2>
            </div>
          </div>

          {[
            { title: "階段 1：找到你的方向", anchor: "#find-path", items: ["根據你的技能和興趣產生 10 個潛在職稱 → 1.1", "探索每個角色的典型一天 → 1.2", "根據目標和資歷排序角色 → 1.3", "用三個實驗測試你對每個角色的適合度 → 1.4", "聯繫在你目標角色中的校友 → 1.5"] },
            { title: "階段 2：建立你的 LinkedIn 防線", anchor: "#linkedin", items: ["撰寫富含關鍵字的標題（120 字以內） → 2.1", "把地點設定到你想工作的地方 → 2.2", "加入目標角色的前 20 個技能 → 2.3", "在經歷要點中嵌入關鍵字 → 2.4", "撰寫結構化的「關於」區塊（1,200 字） → 2.5", "找出並開始補足缺少的技能 → 2.6", "開啟「Open to Work」（僅招募官可見） → 2.7", "將人脈網擴大到 500+ 連結 → 2.8", "追蹤目標公司 → 2.9", "上傳專業大頭照 → 2.10", "請求兩到三封推薦 → 2.11", "加上背景照片 → 2.12", "回覆所有 InMail → 2.13"] },
            { title: "階段 3：建立你的履歷", anchor: "#resume", items: ["下載乾淨、ATS 友善的模板 → 3.1", "為每個目標職稱建立獨立版本 → 3.2", "在最上方加入目標職稱 → 3.3", "更新地點為目標城市 → 3.4", "加入相關的非正職經歷 → 3.5", "短期工作經歷只用年份 → 3.6", "為不知名的公司加上組織背景 → 3.7", "釐清模糊的內部職稱 → 3.8", "從職缺描述中提取前 20 個關鍵字 → 3.9", "每段經歷寫 3 個以成就為基礎的要點 → 3.10", "把關鍵字和成就配對 → 3.12", "建立完整、精煉的要點 → 3.13", "檢視並評分要點品質 → 3.14", "瞄準 50% 的關鍵字匹配率 → 3.15", "加入教育背景要點 → 3.16", "檢視並評分教育背景要點品質 → 3.17", "完成並分類技能區塊 → 3.18", "撰寫聚焦的摘要 → 3.19"] },
            { title: "階段 4：投遞", anchor: "#apply", items: ["為目標和替代職稱設定每日職缺提醒 → 4.1", "新角色匹配時當天投遞 → 4.2", "需要時撰寫求職信 → 4.3", "為每個雇主客製化求職信 → 4.5", "為每次投遞找到並請求推薦 → 4.6"] },
            { title: "階段 5：完勝面試", anchor: "#interview", items: ["產生最可能被問到的 10 個面試問題 → 5.1", "為每個問題撰寫 CAR 格式的答案 → 5.1", "用 AI 回饋練習書面回答 → 5.2", "練習口頭回答（目標 60-90 秒每題） → 5.3", "研究公司的前 5 大挑戰 → 5.4", "準備角色的 90 天行動計畫 → 5.4", "準備要問面試官的有深度問題 → 5.4"] },
            { title: "階段 6：像機器人一樣談判", anchor: "#negotiate", items: ["根據職涯目標評估 offer → 6.1", "背景調查你的未來老闆 → 6.2", "儘早框架談判（分享競爭 offer） → 6.3", "用薪資數據重新錨定 → 6.4", "必要時反駁第二次 offer → 6.5", "如果底薪不動，轉移焦點到非薪資項目 → 6.6", "用有條件的接受來成交 → 6.7"] },
          ].map((stage, si) => (
            <div key={si} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h3 className="font-heading text-lg text-gold font-semibold">
                <a href={stage.anchor} className="hover:underline underline-offset-2 transition-colors">{stage.title}</a>
              </h3>
              <ul className="space-y-2">
                {stage.items.map((item, j) => {
                  const refMatch = item.match(/→\s*(\d+)\.\d+$/);
                  const isChecked = checklistState[si]?.[j] ?? false;
                  return (
                    <li key={j} onClick={() => toggleChecklist(si, j)} className={`flex items-start gap-2 text-sm cursor-pointer group transition-opacity ${isChecked ? "opacity-60" : ""}`}>
                      <span className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isChecked ? "bg-gold border-gold text-background" : "border-border group-hover:border-gold/60"}`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                      <span className={isChecked ? "line-through text-muted-foreground" : "text-muted-foreground"}>
                        {refMatch ? (
                          <>{item.replace(/→\s*\d+\.\d+$/, "")} <a href={stage.anchor} onClick={e => e.stopPropagation()} className="text-gold hover:underline transition-colors">→ {refMatch[0].replace("→ ", "")}</a></>
                        ) : item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ 第 11 章：提示詞庫 ═══════════════ */}
      <section id="prompt-library" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">完整提示詞庫</h2>
              <p className="text-muted-foreground mt-2 text-sm">本指南所有 AI 提示詞集中在此。展開各階段，直接複製提示詞到 ChatGPT 使用。</p>
            </div>
          </div>

          <CopyAllPromptsButton lang="zh" />

          <div className="space-y-3">
            {AI_GUIDE_PROMPTS.map(stage => (
              <Collapsible key={stage.stage} title={`階段 ${stage.stage}：${stage.titleZh}`}>
                <div className="space-y-1 pt-2">
                  {stage.prompts.map((p, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{p.stepZh}</p>
                      <AiPromptBlock>{p.promptZh}</AiPromptBlock>
                    </div>
                  ))}
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>



      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">額外資源</h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-semibold">想深入了解每個階段，可以參考我的其他免費指南：</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/zh-tw/resume-guide" className="text-gold hover:underline font-medium">履歷指南：</Link>如何寫出通過每項測試的履歷（根據 Dan Clay 的框架）</li>
              <li><Link to="/zh-tw/interview-preparation-guide" className="text-gold hover:underline font-medium">面試攻略：</Link>招募官的完整面試致勝指南（根據 Thea Kelley 的系統）</li>
              <li><Link to="/zh-tw/hr-interview-guide" className="text-gold hover:underline font-medium">招募官電話面試指南：</Link>如何通過招募官電話面試，進入用人主管面試</li>
              <li><Link to="/zh-tw/linkedin-guide" className="text-gold hover:underline font-medium">LinkedIn 指南：</Link>優化你的個人檔案，讓招募官先找到你</li>
              <li><Link to="/zh-tw/pivot-method-guide" className="text-gold hover:underline font-medium">轉職方法指南：</Link>職涯轉換的結構化框架</li>
              <li><Link to="/zh-tw/resume-analyzer" className="text-gold hover:underline font-medium">履歷分析器：</Link>獲得即時的 AI 履歷回饋</li>
              <li><Link to="/zh-tw/salary-starter-kit" className="text-gold hover:underline font-medium">薪資入門包：</Link>在談判前研究薪資數據</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">這份指南的原書：</h3>
            <p className="text-sm text-muted-foreground"><em>Career Coach GPT</em> by Jeremy Schifeling</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">推薦查找電子郵件的工具：</h3>
            <p className="text-sm text-muted-foreground"><a href="https://hunter.io" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Hunter.io</a></p>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <GuideShareButtons isZhTw />
        </div>
      </section>

      <InlineRating contentId="guide_ai_job_search_zhtw" locale="zh-tw" />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default AiJobSearchGuideZhTw;