import { useState, useEffect, useRef } from "react";
import { ArrowLeft, ArrowUp, FileText, ChevronRight, ChevronDown, CheckCircle2, X, Menu, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link, useNavigate } from "react-router-dom";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

/* ─── Reading Progress Bar ─── */
const ReadingProgress = () => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const update = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? (window.scrollY / h) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);
  return (
    <div className="fixed top-[56px] left-0 right-0 z-40 h-1 bg-border/30">
      <div className="h-full bg-gold transition-all duration-150 ease-out" style={{ width: `${progress}%` }} />
    </div>
  );
};

/* ─── Back to Top Button ─── */
const BackToTop = () => {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const toggle = () => setShow(window.scrollY > 600);
    window.addEventListener("scroll", toggle, { passive: true });
    return () => window.removeEventListener("scroll", toggle);
  }, []);
  if (!show) return null;
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="fixed bottom-6 right-6 z-50 w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg hover:bg-executive-green/90 transition-all duration-200 flex items-center justify-center hover:scale-105"
      aria-label="回到頂部"
    >
      <ArrowUp className="w-5 h-5" />
    </button>
  );
};

/* ─── Table of Contents ─── */
const tocSections = [
  { id: "truths", label: "4 個履歷真相" },
  { id: "tests", label: "4 項測試" },
  { id: "blueprint", label: "關鍵字藍圖" },
  { id: "layout", label: "排版與格式" },
  { id: "design", label: "設計細節" },
  { id: "content", label: "撰寫內容" },
  { id: "breakdown", label: "逐項分解" },
  { id: "polish", label: "收尾工作" },
  { id: "mistakes", label: "10 個錯誤" },
  { id: "checklist", label: "檢查清單" },
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

/* ─── Section Header Component ─── */
const SectionHeader = ({ number, title, id }: { number: string; title: string; id: string }) => (
  <div id={id} className="scroll-mt-20 flex items-center gap-4 mb-8">
    <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center flex-shrink-0">
      <span className="text-gold font-bold text-sm">{number}</span>
    </div>
    <h2 className="font-heading text-2xl md:text-3xl text-foreground">{title}</h2>
  </div>
);

/* ─── Golden Rule Card ─── */
const GoldenRule = ({ number, text }: { number: number; text: string }) => (
  <div className="bg-executive-green rounded-xl p-5 md:p-6 mb-6 flex items-start gap-4">
    <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 mt-0.5">
      <span className="text-gold font-bold text-xs">#{number}</span>
    </div>
    <p className="text-cream font-semibold text-base md:text-lg leading-relaxed">{text}</p>
  </div>
);

/* ─── Recruiter Reality Check ─── */
const RecruiterCheck = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gold/8 border-l-4 border-gold rounded-r-lg p-4 md:p-5 my-6">
    <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-2">🎯 招募官現實檢驗</p>
    <p className="text-foreground text-sm leading-relaxed">{children}</p>
  </div>
);

/* ─── Key Insight Callout ─── */
const KeyInsight = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 md:p-5 my-6">
    <p className="text-foreground text-sm leading-relaxed">{children}</p>
  </div>
);

/* ─── Inline Infographic: Resume Gauntlet ─── */
const ResumeGauntlet = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8 overflow-x-auto">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-2">履歷關卡</h3>
    <p className="text-muted-foreground text-sm text-center mb-8">四項全部通過，招募官會拿起電話打給你。<br /><span className="text-destructive font-semibold">任何一項失敗，你就出局。</span></p>
    <div className="flex flex-col md:flex-row items-center justify-center gap-3 md:gap-0">
      {[
        { label: "關鍵字", sub: "測試", num: "測試 1" },
        { label: "掃描測試", sub: "（6 秒）", num: "測試 2" },
        { label: "資格", sub: "測試", num: "測試 3" },
        { label: "適配", sub: "測試", num: "測試 4" },
      ].map((item, i) => (
        <div key={i} className="flex items-center gap-3">
          <div className="bg-executive-green text-cream rounded-lg px-5 py-4 text-center min-w-[120px]">
            <p className="font-semibold text-sm">{item.label}</p>
            <p className="text-gold text-xs font-medium">{item.sub}</p>
            <p className="text-cream/60 text-[10px] mt-1">{item.num}</p>
          </div>
          {i < 3 && <ChevronRight className="w-5 h-5 text-muted-foreground hidden md:block" />}
          <div className="md:hidden flex flex-col items-center">
            {i < 3 && <div className="w-px h-4 bg-border" />}
          </div>
        </div>
      ))}
      <div className="flex items-center gap-3">
        <ChevronRight className="w-5 h-5 text-muted-foreground hidden md:block" />
        <div className="text-center min-w-[100px]">
          <p className="text-gold font-semibold text-sm">→ 通過</p>
          <p className="text-gold text-xs">接到電話</p>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Inline Infographic: 6-Second Scan Heatmap ─── */
const ScanHeatmap = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-2">6 秒掃描</h3>
    <p className="text-muted-foreground text-sm text-center mb-8">招募官的目光去向</p>
    <div className="max-w-md mx-auto">
      <div className="border border-border rounded-lg bg-background p-5 space-y-4 relative">
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-xl font-bold text-foreground border-l-4 border-gold pl-3">王 大 明</div>
            <p className="text-muted-foreground text-xs mt-1 pl-3">台北市 | email@gmail.com | 0912-345-678</p>
          </div>
          <span className="text-gold text-xs font-medium whitespace-nowrap">← 目光先到這裡</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="bg-gold/5 rounded p-3 flex-1">
            <p className="font-semibold text-foreground text-sm">目前職位</p>
            <p className="text-muted-foreground text-xs">公司名稱 | 2022 - 至今</p>
            <div className="mt-2 space-y-1">
              <div className="h-2 bg-muted rounded w-4/5" />
              <div className="h-2 bg-muted rounded w-3/5" />
              <div className="h-2 bg-muted rounded w-4/5" />
            </div>
          </div>
          <span className="text-gold text-xs font-medium whitespace-nowrap mt-2">← 然後這裡</span>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <p className="font-semibold text-foreground text-sm">上一個職位</p>
            <p className="text-muted-foreground text-xs">公司名稱 | 2019 - 2022</p>
            <div className="mt-2 space-y-1">
              <div className="h-2 bg-muted rounded w-3/5" />
              <div className="h-2 bg-muted rounded w-2/5" />
            </div>
          </div>
          <span className="text-gold text-xs font-medium whitespace-nowrap mt-2">← 然後這裡</span>
        </div>
        <div>
          <p className="font-semibold text-foreground/60 text-sm italic">更早的職位</p>
          <p className="text-muted-foreground/50 text-xs">公司 | 2016 - 2019</p>
        </div>
        <div>
          <p className="font-semibold text-foreground/60 text-sm italic">技能</p>
          <p className="text-muted-foreground/50 text-xs">技能 A · 技能 B · 技能 C</p>
        </div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="font-semibold text-foreground text-sm">學歷</p>
            <p className="text-muted-foreground text-xs">大學名稱 | 學士學位 | 2016</p>
          </div>
          <span className="text-gold text-xs font-medium whitespace-nowrap">← 最後</span>
        </div>
      </div>
    </div>
  </div>
);

/* ─── Inline Infographic: Content Density ─── */
const ContentDensity = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-2">內容密度：最佳區間</h3>
    <div className="grid grid-cols-3 gap-4 mt-8">
      {[
        { label: "太密", pct: "(60%+)", desc: "文字牆。", color: "text-destructive", bars: [100, 100, 100, 95, 100, 100, 90, 100] },
        { label: "剛好", pct: "(30-50%)", desc: "平衡。易掃描。", color: "text-gold", bars: [70, 40, 80, 50, 60, 75, 45, 65] },
        { label: "太稀疏", pct: "(<20%)", desc: "看起來空洞。", color: "text-destructive", bars: [30, 15, 40, 10, 25, 0, 20, 10] },
      ].map((col, i) => (
        <div key={i} className="text-center">
          <p className={`font-semibold text-sm ${col.color}`}>{col.label}</p>
          <p className="text-muted-foreground text-xs mb-3">{col.pct}</p>
          <div className="border border-border rounded bg-background p-3 aspect-[3/4] flex flex-col justify-between">
            {col.bars.map((w, j) => (
              <div key={j} className="h-2 bg-muted rounded" style={{ width: `${w}%` }} />
            ))}
          </div>
          <p className="text-muted-foreground text-xs mt-2">{col.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

/* ─── Inline Infographic: Section Order ─── */
const SectionOrder = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-8">履歷段落順序</h3>
    <div className="max-w-sm mx-auto space-y-3">
      {[
        "姓名與聯絡資訊",
        "個人簡介 / 摘要",
        "工作經歷",
        "技能與證照",
        "學歷",
      ].map((label, i) => (
        <div key={i}>
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
              {i + 1}
            </div>
            <div className="bg-background border border-border rounded-lg px-4 py-3 flex-1">
              <p className="text-foreground text-sm font-medium">{label}</p>
            </div>
          </div>
          {i < 4 && (
            <div className="flex justify-start ml-[14px]">
              <div className="w-px h-3 bg-gold/40" />
            </div>
          )}
        </div>
      ))}
    </div>
    <p className="text-muted-foreground text-xs text-center mt-6">每個段落必須贏得讀者的注意力，讓他們繼續看下一個。</p>
  </div>
);

/* ─── Inline Infographic: Framing Math ─── */
const FramingMath = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-6">框架技巧</h3>
    <div className="bg-executive-green rounded-lg p-5 text-center mb-6">
      <p className="text-cream text-sm">8 人 × 每週省 2 小時 × 時薪 $30 × 52 週</p>
      <p className="text-gold text-2xl font-bold mt-2">= 每年 $25,000</p>
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-destructive/30 rounded-lg p-4">
        <p className="text-destructive text-xs font-semibold mb-2">之前</p>
        <p className="text-foreground text-sm">「優化了一個幫團隊節省時間的流程。」</p>
      </div>
      <div className="border border-gold/40 rounded-lg p-4">
        <p className="text-gold text-xs font-semibold mb-2">之後</p>
        <p className="text-foreground text-sm">「在 8 名團隊成員中節省了每年 $25,000。」</p>
      </div>
    </div>
    <p className="text-muted-foreground text-xs text-center mt-4">同一個專案。同一個結果。強 10 倍的印象。</p>
  </div>
);

/* ─── Inline Infographic: Weak vs Strong Bullet ─── */
const BulletComparison = () => (
  <div className="my-10 bg-card border border-border rounded-xl p-6 md:p-8">
    <h3 className="font-heading text-xl md:text-2xl text-foreground text-center mb-2">弱條目 vs. 強條目</h3>
    <p className="text-muted-foreground text-xs text-center mb-6">三 R 模型實戰</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="border border-destructive/30 rounded-lg p-5">
        <p className="text-destructive font-semibold text-sm mb-3">弱</p>
        <p className="text-foreground text-sm mb-4">「負責管理團隊營運和報告。」</p>
        <div className="space-y-1 text-xs">
          <p className="text-destructive flex items-center gap-1"><X className="w-3 h-3" /> 不相關</p>
          <p className="text-destructive flex items-center gap-1"><X className="w-3 h-3" /> 不相對</p>
          <p className="text-destructive flex items-center gap-1"><X className="w-3 h-3" /> 非成果導向</p>
        </div>
      </div>
      <div className="border border-gold/40 rounded-lg p-5">
        <p className="text-gold font-semibold text-sm mb-3">強</p>
        <p className="text-foreground text-sm mb-4">「優化團隊營運並建立報告系統，在 8 名成員中每年節省 $25,000。」</p>
        <div className="space-y-1 text-xs">
          <p className="text-gold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 相關</p>
          <p className="text-gold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 相對</p>
          <p className="text-gold flex items-center gap-1"><CheckCircle2 className="w-3 h-3" /> 成果導向</p>
        </div>
      </div>
    </div>
    <p className="text-muted-foreground text-xs text-center mt-4">同一個人。同一份工作。完全不同的印象。</p>
  </div>
);

/* ─── Main Page Component ─── */
const ResumeGuideZhTw = () => {
  useTrackGuideProgress("resume-guide");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/resume-guide", title: "履歷撰寫指南｜讓你獲得更多面試機會", description: "資深招募官教你如何撰寫出色的履歷。格式、重點描述、ATS 技巧及實際範例。" })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      <ReadingProgress />
      <TableOfContents />
      <BackToTop />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            完美履歷：10 條黃金法則
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            讓你獲得理想公司面試機會的招募官指南
          </p>
          <p className="text-base text-cream/60 mb-2">
            基於 Dan Clay 所著《How to Write the Perfect Resume》
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60">
            <Clock className="w-4 h-4" />
            <span className="text-sm">15 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Guide Overview */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center leading-relaxed">
            本指南內容：改變你整個求職策略的 4 個履歷真相。履歷在招募官閱讀前必須通過的 4 項測試。讓你的履歷從其他 249 份中脫穎而出的 10 條黃金法則。如何撰寫讓招募官主動打電話給你的重點條目。按下送出前的完整檢查清單。
          </p>
        </div>
      </section>

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 1: 4 Resume Truths */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="01" title="每位求職者都需要接受的 4 個履歷真相" id="truths" />
          <p className="text-foreground leading-relaxed mb-6">在你寫下第一個字之前，你需要了解履歷在真實世界中如何運作的四個真相。這些直接來自 Dan Clay 的書，而我以招募官的身分逐一確認。</p>
          <p className="text-foreground leading-relaxed mb-10">Clay 的可信度在於：他不是轉行當職涯教練的招募官。他是一個普通的專業人士，靠著他的履歷拿到了 Google、LinkedIn、Gartner 和 Shell 的工作。沒有常春藤學歷。沒有內部人脈。他靠的是一份遵循明確規則的履歷。</p>

          {/* Truth 1 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">1.</span> 大多數履歷都很差（這對你是好消息）
            </h3>
            <p className="text-foreground leading-relaxed mb-4">當我拿起一疊履歷，我預期大部分都很普通。格式混亂。描述模糊。資訊缺漏。拼寫錯誤。這就是常態。</p>
            <p className="text-foreground leading-relaxed mb-4">因為標準這麼低，一份做得好的履歷很快就會脫穎而出。你不需要出類拔萃。你只需要在別人都草率的時候保持精緻。在別人都模糊的時候保持具體。</p>
            <p className="text-foreground leading-relaxed">差的履歷和好的履歷之間的差距，比你想像的小。這份指南會幫你補上這個差距。</p>
          </div>

          {/* Truth 2 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">2.</span> 怎麼說比你做了什麼更重要
            </h3>
            <p className="text-foreground leading-relaxed mb-4">這是大多數人忽略的真相。</p>
            <p className="text-foreground leading-relaxed mb-4">在紙上，感知就是現實。兩個經歷完全相同的求職者，如果其中一個更善於包裝自己的成就，結果會完全不同。</p>
            <p className="text-foreground leading-relaxed mb-4">一個治癒疾病、讓公司股價翻倍的人，如果履歷溝通不佳、格式混亂、有錯字，還是會被淘汰。聽起來極端。但確實發生。</p>
            <p className="text-foreground leading-relaxed mb-4">你對如何定位自己有完全的主導權。這不是包裝。不是說謊。而是選擇正確的用詞、正確的框架和正確的結構，用最有力的方式呈現你的經歷。</p>
            <p className="text-foreground leading-relaxed">「負責管理客戶帳戶」和「在 37 個中型客戶中維持 85% 的留存率，超額完成成長目標 55%」之間的差距是巨大的。同一份工作。同一個人。完全不同的印象。</p>
          </div>

          {/* Truth 3 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">3.</span> 招募官想找到你
            </h3>
            <p className="text-foreground leading-relaxed mb-4">這一點讓很多人驚訝。</p>
            <p className="text-foreground leading-relaxed mb-4">招募官有業績目標。他們需要填補職缺。他們的績效取決於成功招聘的數量和速度。當招募官拿起你的履歷，他們希望你就是對的人。他們想找到優秀的候選人，因為這讓他們的工作更輕鬆。</p>
            <p className="text-foreground leading-relaxed mb-4">問題是？他們快被淹沒了。每個職缺 250 份履歷。其中 75% 來自根本不符合資格的人。所以招募官為了生存，發展出了淘汰心態。他們掃描尋找說「不」的理由，因為不可能對每個人都說「是」。</p>
            <p className="text-foreground leading-relaxed">你的任務是消除他們說「不」的每一個理由。這從理解你的履歷必須通過的四項測試開始。</p>
          </div>

          {/* Truth 4 */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">4.</span> 你仍然需要一份履歷
            </h3>
            <p className="text-foreground leading-relaxed">你的 LinkedIn 個人檔案不是履歷。你的作品集不是履歷。公司需要一份統一格式的文件，存入他們的系統，與用人主管分享，並在整個流程中參考。你需要一份。沒有例外。</p>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 2: 4 Tests */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="02" title="你的履歷必須通過的 4 項測試" id="tests" />
          <p className="text-foreground leading-relaxed mb-4">你的履歷不是從收件匣直接到面試。它要經過一個關卡。四項測試，依序進行。任何一項失敗你就出局。</p>
          <p className="text-foreground leading-relaxed mb-6">Dan Clay 清楚地列出了這四項測試。我會補充我在招募端看到的觀點。</p>

          <ResumeGauntlet />

          {/* 4 Audiences */}
          <h3 className="font-heading text-xl text-foreground mb-4">閱讀你履歷的 4 類受眾</h3>
          <p className="text-foreground leading-relaxed mb-4">在進入測試之前，先了解誰在看你的履歷：</p>
          <ol className="list-decimal list-inside space-y-2 text-foreground leading-relaxed mb-6 pl-1">
            <li><strong>應徵者追蹤系統（ATS）：</strong>儲存、整理履歷並協助招募官搜尋的軟體</li>
            <li><strong>招募官：</strong>第一個看你履歷的人。他們每天看數百份履歷。</li>
            <li><strong>面試官：</strong>面試時你的履歷就在他們面前。上面的每一項都可能被問到。</li>
            <li><strong>用人主管：</strong>做最終決定的人。你的履歷需要回應他們的具體需求。</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-10">每個受眾關注的重點不同。你的履歷需要滿足全部四個。</p>

          {/* Test 1 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">測試 1</span>　關鍵字測試
            </h3>
            <p className="text-foreground leading-relaxed mb-4">大多數大公司使用應徵者追蹤系統來儲存和整理履歷。當招募官搜尋候選人時，他們會在 ATS 中輸入職位描述中的關鍵字。如果你的履歷不包含這些關鍵字，它不會出現在搜尋結果中。招募官永遠找不到你。</p>
            <p className="text-foreground leading-relaxed mb-4">這就是為什麼你需要在履歷中反映職位描述的用語。如果職位公告寫「跨部門協作」，你的履歷應該包含「跨部門協作」。如果寫「營收成長」，你的條目應該提到營收成長。</p>
            <p className="text-foreground leading-relaxed mb-4">這不是鑽漏洞。這是和雇主說同一種語言。</p>
            <RecruiterCheck>大多數 ATS 系統不會自動淘汰履歷。但招募官會使用關鍵字搜尋在系統中找候選人。如果你的履歷不符合職位描述的用語，你會靜靜地躺在資料庫裡。招募官會轉向先出現在搜尋結果中的候選人。</RecruiterCheck>
          </div>

          {/* Test 2 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">測試 2</span>　掃描測試（6 秒）
            </h3>
            <p className="text-foreground leading-relaxed mb-4">眼動追蹤研究顯示，招募官平均花 6 秒掃描一份履歷，然後決定是否繼續閱讀。六秒。</p>
            <p className="text-foreground leading-relaxed mb-4">在這段時間裡，他們在找四樣東西：</p>
            <ol className="list-decimal list-inside space-y-1 text-foreground leading-relaxed mb-4 pl-1">
              <li>你的名字</li>
              <li>你目前的職位（職稱、公司、日期）</li>
              <li>你上一個職位（職稱、公司、日期）</li>
              <li>你的學歷</li>
            </ol>
            <p className="text-foreground leading-relaxed mb-4">如果招募官拿起你的履歷，必須費力尋找這四項資訊中的任何一項，你就沒通過掃描測試。</p>

            <ScanHeatmap />

            <RecruiterCheck>我曾在不到 3 秒內淘汰一份履歷。創意排版、不尋常的格式、沒有清晰結構的文字牆。如果我拿起來感到困惑，就直接放進「不通過」那疊。我還有 249 份要看。</RecruiterCheck>
          </div>

          {/* Test 3 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">測試 3</span>　資格測試
            </h3>
            <p className="text-foreground leading-relaxed mb-4">你的履歷通過掃描測試後，招募官會檢查你是否符合基本要求。你有對的學歷嗎？足夠的年資嗎？必備的技能嗎？</p>
            <p className="text-foreground leading-relaxed mb-4">這是黃金法則 #1 變得很重要的地方。</p>
            <GoldenRule number={1} text="只申請你有資格的職位。" />
            <p className="text-foreground leading-relaxed mb-4">聽起來理所當然。但 75% 的申請者不符合他們所申請職位的資格。他們用不相關的履歷淹沒招募官，這讓招募官對每一份履歷都更加懷疑。</p>
            <p className="text-foreground leading-relaxed mb-4">如果職位要求 5 年經驗而你只有 2 年，不要申請。如果需要你沒有的特定證照，不要申請。你在浪費自己和對方的時間。</p>
            <p className="text-foreground leading-relaxed mb-4">專注在你符合核心要求的職位。然後用你的履歷證明你會在這個職位上表現出色，不要只達到最低門檻。</p>
            <RecruiterCheck>「加分條件」和「必要條件」是有區別的。如果一個職位列了 10 項資格而你符合 7-8 項，投吧。如果你只符合 3 項，別投。用你的判斷力，但對自己誠實。</RecruiterCheck>
          </div>

          {/* Test 4 */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold font-bold">測試 4</span>　適配測試
            </h3>
            <p className="text-foreground leading-relaxed mb-4">到了這個階段，招募官開始興奮了。你的履歷有對的關鍵字，看起來乾淨，你也符合資格。現在他們在問：「這個人在這個職位上會成功嗎？」</p>
            <p className="text-foreground leading-relaxed mb-4">這是你的表達方式、框架和重點條目品質發揮作用的地方。招募官正更仔細地閱讀你的工作經歷。他們在看你如何溝通、如何定位你的成果，以及你的整體呈現是否展現專業。</p>
            <p className="text-foreground leading-relaxed mb-4">通過適配測試，你就進入了。你的名字會進入合適候選人名單。招募官拿起電話打給你。</p>
            <RecruiterCheck>適配測試是我最關注的環節。我看過通過前三項測試但在這裡失敗的候選人，因為模糊的條目、草率的摘要或不一致的格式。走到這一步不要功虧一簣。細節很重要。</RecruiterCheck>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 3: Keyword Blueprint */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="03" title="動筆前的準備：關鍵字藍圖" id="blueprint" />
          <p className="text-foreground leading-relaxed mb-4">大多數人打開一份空白文件就開始打字。這是個錯誤。</p>
          <p className="text-foreground leading-relaxed mb-4">在你在履歷上寫下任何一個字之前，你需要一個計劃。Dan Clay 稱之為關鍵字規劃流程。我認為這是履歷撰寫中最多人忽略的步驟。</p>
          <GoldenRule number={2} text="讓你的履歷反映目標職位描述中使用的語言。" />
          <p className="text-foreground leading-relaxed mb-8">以下是流程。</p>

          {/* Step 1 */}
          <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">1</span>
            建立你的規劃文件
          </h3>
          <p className="text-foreground leading-relaxed mb-4">打開一份空白文件。建立四個標題：</p>
          <ol className="list-decimal list-inside space-y-1 text-foreground leading-relaxed mb-4 pl-1">
            <li>公司（你想為誰工作）</li>
            <li>職位（你瞄準什麼職位）</li>
            <li>職位公告網址（每個公告的連結）</li>
            <li>關鍵字與主題（他們使用的語言）</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-10">把這份文件放在螢幕一半。瀏覽器開在另一半。你會在職位公告和規劃文件之間來回切換。</p>

          {/* Step 2 */}
          <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">2</span>
            建立你的目標清單
          </h3>
          <p className="text-foreground leading-relaxed mb-4">前往目標公司的招聘頁面。找到你感興趣的職位。把網址複製到你的規劃文件。列出公司名稱和職位名稱。</p>
          <p className="text-foreground leading-relaxed mb-10">不要只限一家公司。在這個階段廣撒網。你想看到多個職位描述之間的模式。</p>

          {/* Step 3 */}
          <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">3</span>
            提取關鍵字和主題
          </h3>
          <p className="text-foreground leading-relaxed mb-4">仔細閱讀每個職位描述。把重複出現的詞彙、短語和要求複製到規劃文件的「關鍵字與主題」部分。</p>
          <p className="text-foreground leading-relaxed mb-4">你會開始看到模式。如果每個職位描述都提到「利益相關者管理」或「數據驅動決策」或「跨部門團隊」，這些短語需要出現在你的履歷中。</p>
          <p className="text-foreground leading-relaxed mb-10">這一步消除了猜測。公司正在告訴你他們想要什麼。給他們就對了。</p>

          {/* Step 4 */}
          <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-gold/15 flex items-center justify-center text-gold text-xs font-bold flex-shrink-0">4</span>
            腦力激盪你的成就
          </h3>
          <p className="text-foreground leading-relaxed mb-4">在你開始把經歷塞進履歷模板之前，先自由腦力激盪。用書中這些問題來開始：</p>
          <ol className="list-decimal list-inside space-y-2 text-foreground leading-relaxed mb-6 pl-1">
            <li>如果你在電梯裡有 30 秒和你申請的公司的執行長對話，你會告訴他們什麼？</li>
            <li>你做過的每份工作中，你最引以為豪的三件事是什麼？</li>
            <li>你現在和以前的同事會說你在哪些技能上特別出色？</li>
            <li>你獲得過什麼獎項或認可？</li>
            <li>你什麼時候超越了職責範圍？</li>
            <li>想像一個前主管在為你做推薦。他們會列舉什麼理由說你很優秀？</li>
            <li>如果你是「求職者商店」貨架上的公仔，你會如何定位自己來脫穎而出？</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-4">在這個階段不要篩選。全部寫下來。篩選是之後正式建立履歷時的事。</p>
          <RecruiterCheck>大多數候選人完全跳過這一步。他們直接開始寫，結果做出一份對每家公司都說一樣話的通用履歷。你花在關鍵字規劃上的 30 分鐘，會節省你數小時的挫折，並大幅提高你的回覆率。</RecruiterCheck>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 4: Layout & Format */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="04" title="排版與格式：通過掃描測試" id="layout" />
          <p className="text-foreground leading-relaxed mb-4">你已經完成了規劃。你的關鍵字和成就都已對應好。現在是建立實際文件的時候了。</p>
          <p className="text-foreground leading-relaxed mb-10">本節涵蓋三條黃金法則，控制你的履歷在最初 6 秒內的外觀和閱讀體驗。</p>

          {/* Rule 3 */}
          <div className="mb-12">
            <GoldenRule number={3} text="用實力突出，不是用花樣" />
            <p className="text-foreground leading-relaxed mb-4">Dan Clay 講了 Nina 的故事。她非常想在 Airbnb 工作，所以製作了一份精心設計的履歷，看起來就像 Airbnb 自己的設計團隊做的。它有自己的網站。傳遍網路。獲得了 50 萬次瀏覽。Airbnb 的執行長在推特上轉發了它。</p>
            <p className="text-foreground leading-relaxed mb-4">她沒有得到那份工作。</p>
            <p className="text-foreground leading-relaxed mb-4">再多的花樣也無法彌補實力的不足。Nina 的創意方式獲得了關注，但沒有讓她被錄用。公司認為她不適合這個職位。</p>
            <p className="text-foreground leading-relaxed mb-4">你的履歷不是設計作品。它是一份專業文件。保持乾淨。保持簡潔。讓你的成就來說話。</p>
            <RecruiterCheck>我看過帶有資訊圖表、顏色條、圖示和創意排版的履歷。每一次，它們都更難閱讀。這些格式讓 ATS 軟體更難讀取你的內容。而我在用我的 6 秒試圖弄清楚排版，而不是評估候選人。不要這樣做。</RecruiterCheck>
          </div>

          {/* Rule 4 */}
          <div className="mb-12">
            <GoldenRule number={4} text="你的履歷應該正好一頁" />
            <p className="text-foreground leading-relaxed mb-4">不是「最多」一頁。正好一頁。從頭到尾，填滿整頁。</p>
            <p className="text-foreground leading-relaxed mb-4">有些人會不同意。他們通常是按頁收費寫履歷的人。</p>
            <p className="text-foreground leading-relaxed mb-4">除非你在高度技術性的領域或你是 20 年以上的資深業界人士，一頁是標準。原因如下：</p>
            <p className="text-foreground leading-relaxed mb-4">當招募官看到兩頁的履歷，他們立刻提高了標準。你要求他們花雙倍的處理時間。如果第二頁沒有亮點，你就留下了壞印象。一頁精準的內容永遠勝過兩頁拖沓的平庸。</p>
            <p className="text-foreground leading-relaxed mb-4">一頁的限制也迫使你精挑細選。當空間有限，只有你最好、最相關的內容才能入選。這正是重點。</p>
            <RecruiterCheck>我審閱過數千份兩頁的履歷。至少 90% 的情況下，第二頁的所有內容都可以刪掉。如果你的履歷是兩頁，問問自己：第二頁的每一行是否都比第一頁最弱的一行更強？如果不是，刪掉。</RecruiterCheck>
          </div>

          {/* Rule 5 */}
          <div>
            <GoldenRule number={5} text="先為掃描而設計，再為閱讀而設計" />
            <p className="text-foreground leading-relaxed mb-4">記住 6 秒法則。在那 6 秒裡，招募官是在掃描，不是在閱讀。他們在找你的名字、目前職位、上一個職位和學歷。</p>
            <p className="text-foreground leading-relaxed mb-4">你的履歷排版需要讓這四項資訊一目了然。這意味著：</p>
            <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
              <li>你的名字是頁面上最大的文字，在最上方</li>
              <li>你最近的職位清楚標明公司、職稱和日期</li>
              <li>之前的職位按時間倒序排列</li>
              <li>你的學歷在底部，招募官預期找到它的地方</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">標題靠左對齊。人們從左到右閱讀。不要讓招募官的目光移到頁面中央才能找到一個段落的開頭。</p>
            <p className="text-foreground leading-relaxed">不要在排版上搞創意。招募官對履歷上的東西該在哪裡有一張心理地圖。當你的履歷符合那張地圖，他們很快找到需要的資訊。不符合的時候，他們就跳過。</p>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 5: Design Details */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="05" title="設計細節：字型、邊距和密度" id="design" />

          <h3 className="font-heading text-xl text-foreground mb-4">內容密度：30-50% 的最佳區間</h3>
          <p className="text-foreground leading-relaxed mb-4">你的履歷應該在內容和留白之間取得平衡。文字太多，招募官會感到壓迫。太少，他們會認為你資歷不足。</p>
          <p className="text-foreground leading-relaxed mb-4">目標內容密度在 30% 到 50% 之間。也就是大約三分之一到一半的頁面有文字，其餘是留白。</p>

          <ContentDensity />

          <p className="text-foreground leading-relaxed mb-2">調整方法：</p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>內容太多？加寬邊距，減少條目數量，精簡用詞</li>
            <li>內容太少？縮窄邊距，增加更多成就，擴展描述</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-10">快速檢查法：列印你的履歷，稍微放鬆目光。頁面感覺平衡嗎？還是像一面文字牆？或者大部分是空的？相信你的直覺。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">字型選擇：它傳達的訊號</h3>
          <p className="text-foreground leading-relaxed mb-4">你的字型在任何人讀第一個字之前就已經傳達了訊息。</p>
          <p className="text-foreground leading-relaxed mb-4">襯線字型（如 Times New Roman、Georgia、Garamond）傳達：傳統、穩重、保守。適合金融、法律或傳統產業。</p>
          <p className="text-foreground leading-relaxed mb-4">無襯線字型（如 Arial、Calibri、Helvetica）傳達：現代、乾淨、創新。適合科技、行銷或前瞻性公司。</p>
          <p className="text-foreground leading-relaxed mb-4">選一個字型，整份履歷都用它。不要混用字型。避免太細或太淡的字型。2016 年的眼動追蹤研究發現，淡色字型降低可讀性，增加讀者的閱讀負擔。你希望招募官吸收你的內容，而不是費力閱讀。</p>
          <p className="text-foreground leading-relaxed mb-4">安全選擇：Calibri、Arial、Garamond、Cambria、Georgia、Helvetica。</p>
          <p className="text-foreground leading-relaxed mb-10">避免：Comic Sans（不用多說）、任何太花俏的字型，以及名稱中帶「New」或「Neue」的字型（通常太淡）。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">其他格式規則</h3>
          <p className="text-foreground leading-relaxed mb-4"><strong>邊距：</strong>從 1 英吋邊距開始。如果需要更多空間，側邊可以調到 0.5 英吋。頂部邊距保持在 1 英吋或接近，這樣頁面不會感覺擁擠。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>行距：</strong>1.0 到 1.15 之間。更高的話履歷看起來單薄。更低的話感覺擠壓。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>顏色：</strong>不要用。你的履歷在彩色和黑白下需要看起來一樣。很多招募官用普通印表機列印履歷。如果你的格式依賴顏色，你在冒不必要的風險。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>底線：</strong>跳過。它們讓履歷看起來雜亂。粗體、斜體和字型大小已經給你足夠的強調工具。</p>
          <p className="text-foreground leading-relaxed mb-10"><strong>直線分隔技巧：</strong>如果空間緊張，用管線符號（ | ）將資訊合併到一行。不要把公司名稱、職稱和日期分三行，把它們放在一行：<strong>Gartner, Inc.</strong> | <em>Territory Sales Manager</em> | Jan. 2015 - Dec. 2017。這可以騰出空間放更多條目。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">省略求職信</h3>
          <p className="text-foreground leading-relaxed mb-4">只有 17% 的招募官會閱讀求職信。這個數字直接來自數據。</p>
          <p className="text-foreground leading-relaxed mb-4">為每份申請寫客製化求職信需要數小時。你的時間花在改善履歷和找人脈引薦上更有價值。</p>
          <p className="text-foreground leading-relaxed">唯一的例外：如果你是透過公司的招聘頁面投遞，作為最後手段，沒有其他方式。即使如此，真正發揮作用的還是你的履歷。</p>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 6: Writing Content */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="06" title="撰寫能獲得回覆的內容" id="content" />
          <p className="text-foreground leading-relaxed mb-4">你的履歷已經排版好了。你的版面通過了掃描測試。現在進入把最頂尖 1% 的履歷和其他人區分開來的部分：內容。</p>
          <p className="text-foreground leading-relaxed mb-10">這是另外兩條黃金法則發揮作用的地方。</p>

          {/* Rule 6 */}
          <div className="mb-12">
            <GoldenRule number={6} text="每次都用主動語態" />
            <p className="text-foreground leading-relaxed mb-4">被動語態會毀掉履歷。它聽起來軟弱、間接、不留印象。</p>
            <p className="text-foreground leading-relaxed mb-4">Dan Clay 使用他所稱的「Hell Yea!」測試。寫完一個段落後，重新讀一遍。它是否讓你想說「Hell Yea!」？如果不是，用更強、更主動的語言重寫。</p>
            <p className="text-foreground leading-relaxed mb-4">差別如下：</p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              <div className="border border-destructive/30 rounded-lg p-4">
                <p className="text-destructive text-xs font-semibold mb-2">被動（弱）</p>
                <p className="text-foreground text-sm leading-relaxed">擅長談判，具有管理複雜關係和執行高價值合約的經驗，使我在同儕中成為領導者。</p>
              </div>
              <div className="border border-gold/40 rounded-lg p-4">
                <p className="text-gold text-xs font-semibold mb-2">主動（強）</p>
                <p className="text-foreground text-sm leading-relaxed">談判複雜的數百萬美元合約，一直維持同事中績效前 10%。</p>
              </div>
            </div>
            <p className="text-foreground leading-relaxed mb-4">看到發生了什麼嗎？「擅長談判」變成了「談判了」。名詞變成了動詞。句子從描述你是誰，變成展示你做了什麼。</p>
            <p className="text-foreground leading-relaxed mb-4">這個轉變對你履歷上的每個條目都很重要。用動詞和副詞表達你的成就，而不是形容詞和名詞。每個條目都以強而有力的動詞開頭：帶領、建立、推動、談判、設計、推出、降低、增加。</p>
            <RecruiterCheck>當我讀到一份每個條目都以「負責...」開頭的履歷，我馬上知道這個候選人沒有思考如何定位自己。「負責」是最弱的開頭。它告訴我的是你的職位描述寫了什麼，而不是你做了什麼。</RecruiterCheck>
          </div>

          {/* Rule 7 */}
          <div>
            <GoldenRule number={7} text="用成果描述成就，而非職責" />
            <p className="text-foreground leading-relaxed mb-4">這是改變一切的黃金法則。</p>
            <p className="text-foreground leading-relaxed mb-4">Dan Clay 將此分解為他所稱的「三 R 模型」。你履歷上的每個條目都應該滿足三個標準：</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>相關（Relevant）：</strong>與職位描述相關。如果職位要求「客戶留存」，你的條目應該提到客戶留存。</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>相對（Relative）：</strong>與基準比較。不要說「簽下 500 萬美元合約。」要說「達成目標合約價值的 150%，簽下 500 萬美元。」第一個數字沒有上下文毫無意義。第二個讓你看起來像頂尖表現者。</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>成果導向（Results-oriented）：</strong>聚焦結果，而非任務。不是「管理 8 人團隊。」而是：「帶領 8 人團隊，透過優化採購流程，每年節省 25,000 美元。」</p>

            <BulletComparison />

            <h3 className="font-heading text-lg text-foreground mb-4">框架技巧：讓你的成果聽起來強 10 倍，而且不說謊</h3>
            <p className="text-foreground leading-relaxed mb-4">這是書中我希望你記住的技巧。它叫做框架，它決定了一份履歷是獲得回覆還是被忽略。</p>
            <p className="text-foreground leading-relaxed mb-4">假設你帶領了一個優化公司流程的專案。以下是如何框架影響力：</p>

            <FramingMath />

            <p className="text-foreground leading-relaxed mb-4">對你寫的每個條目都使用這個技巧。把時間節省轉換為金額節省。把每週數字轉換為年度數字。把個人影響轉換為團隊影響。讓數學為你工作。</p>
            <RecruiterCheck>當我在履歷上看到金額和百分比，我會注意。當我看到「提升效率」這種模糊說法，我繼續往下看。具體讓你有可信度。模糊讓你被遺忘。</RecruiterCheck>

            <h3 className="font-heading text-lg text-foreground mb-4 mt-10">「5 對 5」法則</h3>
            <p className="text-foreground leading-relaxed mb-4">Dan Clay 對每個職位放多少條目有一個簡單規則：</p>
            <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
              <li>如果你在過去 5 年內擔任該職位：最多 5 個條目</li>
              <li>如果你在 5 年前擔任該職位：最多 3 個條目</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">邏輯很簡單。招募官更關心你最近做了什麼。你最近的職位獲得最多篇幅。較早的職位獲得較少。</p>
            <p className="text-foreground leading-relaxed mb-4">如果你只擔任過一兩個職位，需要更多條目來填滿頁面，沒問題。但確保每個額外的條目都相關且有力。不要用填充內容來湊數。</p>
            <p className="text-foreground leading-relaxed mb-10">另外：刪掉超過 15 年的工作經驗，除非它是你目前的職位或與申請的職位直接相關。舊經驗占用了應該給近期成就的空間。而且列出太久以前的經驗可能不小心露出你的年齡，某些招募官（違法但實際上）會因此產生偏見。</p>

            <h3 className="font-heading text-lg text-foreground mb-4">排列你的條目</h3>
            <p className="text-foreground leading-relaxed mb-4">在每個職位中，按相關性從高到低排列你的條目。不是按時間順序。不是按對前雇主的重要性。按對你申請的職位的相關性。</p>
            <p className="text-foreground leading-relaxed mb-4">問自己：「如果招募官只讀一個條目，應該是哪一個？」那就是你的第一個條目。然後對剩下的條目問同樣的問題。重複直到全部排好。</p>
            <p className="text-foreground leading-relaxed">招募官通常在第一眼只讀前一兩個條目。用你最強、最相關的成就打頭陣。</p>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 7: Section-by-Section Breakdown */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="07" title="逐項分解" id="breakdown" />
          <GoldenRule number={8} text="永遠優先放與你申請的職位最相關的資訊。" />
          <p className="text-foreground leading-relaxed mb-4">這條規則指導本節的每一個決定。當你決定要放什麼或刪什麼時，問：「這是否直接支持我申請這個特定職位？」如果答案是否，刪掉。</p>
          <p className="text-foreground leading-relaxed mb-4">Dan Clay 建議以下順序，從上到下：</p>
          <ol className="list-decimal list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>姓名和聯絡資訊（必要）</li>
            <li>個人簡介或摘要（選填）</li>
            <li>工作經歷（必要）</li>
            <li>專業活動和志工經歷（選填）</li>
            <li>獎項（選填）</li>
            <li>技能和證照（選填）</li>
            <li>學歷（必要）</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-6">你在每個段落的任務是留下足夠強的印象，讓讀者繼續往下讀。任何一個薄弱環節，招募官就可能停止閱讀。</p>

          <SectionOrder />

          {/* Name & Contact */}
          <h3 className="font-heading text-xl text-foreground mb-4 mt-12">姓名和聯絡資訊</h3>
          <p className="text-foreground leading-relaxed mb-4">保持這個段落簡潔明瞭。</p>
          <p className="text-foreground leading-relaxed mb-2"><strong>要放：</strong></p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>全名（與你的 LinkedIn 個人檔案一致）</li>
            <li>電子郵件（專業的，不是工作郵箱）</li>
            <li>電話號碼（個人手機，不是工作電話）</li>
            <li>城市和州/國家（完整地址選填）</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-2"><strong>不要放：</strong></p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>「電話：」或「Email：」之類的標籤（這些很明顯）</li>
            <li>多個電話號碼或地址</li>
            <li>社群媒體連結（除非 LinkedIn 與職位相關）</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">你的名字應該是頁面上最顯眼的元素。加粗。字型至少比第二大的字大 2 號。這是你的個人品牌。</p>
          <KeyInsight><strong className="text-gold">應該嚇到你的 email 數據：</strong>76% 的履歷因為使用不專業的電子郵件地址而被淘汰。如果你的 email 不是名字的簡潔組合（如 first.last@gmail.com、firstlast@gmail.com），在你寄出下一份履歷之前先建一個新的。</KeyInsight>
          <p className="text-foreground leading-relaxed mb-10"><strong>搬遷說明：</strong>如果你申請的是不同城市的職位，不要假造本地地址。招募官會發現。在你目前的城市旁邊加上「願意搬遷」。老實說。如果公司不招外地人，你會提早知道，省下你的時間。</p>

          {/* Summary */}
          <h3 className="font-heading text-xl text-foreground mb-4">個人簡介 / 摘要</h3>
          <p className="text-foreground leading-relaxed mb-4">這是你 4-5 行的電梯簡報。它應該告訴招募官：你是誰，你帶來什麼，為什麼值得再看。</p>
          <p className="text-foreground leading-relaxed mb-4">把你的摘要直接對準這個職位。使用職位描述中的關鍵字。要具體，不要空泛。</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="border border-destructive/30 rounded-lg p-4">
              <p className="text-destructive text-xs font-semibold mb-2">差的</p>
              <p className="text-foreground text-sm leading-relaxed">「注重成果的專業人士，具有良好的溝通能力和成功的熱情。」</p>
            </div>
            <div className="border border-gold/40 rounded-lg p-4">
              <p className="text-gold text-xs font-semibold mb-2">好的</p>
              <p className="text-foreground text-sm leading-relaxed">「企業銷售主管，8 年經驗，在 SaaS 平台上推動年營收超過 1500 萬美元。連續三年超額完成配額 130% 以上的紀錄。」</p>
            </div>
          </div>
          <p className="text-foreground leading-relaxed mb-4"><strong>永遠不要放目標陳述。</strong>招募官知道你的目標是被錄用。目標陳述告訴他們你想要什麼。摘要告訴他們你帶來什麼。專注在對他們有什麼好處。</p>
          <RecruiterCheck>我讀摘要來決定是否繼續看下去。如果是空泛的，我會假設整份履歷都是空泛的。如果具體且相關，我已經期待看工作經歷的部分了。</RecruiterCheck>

          {/* Work Experience */}
          <h3 className="font-heading text-xl text-foreground mb-4 mt-10">工作經歷</h3>
          <p className="text-foreground leading-relaxed mb-4">這是最重要的段落。這是你證明你的說法的地方。</p>
          <p className="text-foreground leading-relaxed mb-2"><strong>每個職位的格式要一致：</strong></p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>公司名稱（粗體）</li>
            <li>職稱（斜體）</li>
            <li>地點</li>
            <li>任職日期（拼寫出來：「Jan. 2020 - Present」，而不是「1/2020 - Present」）</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">用條目，不用段落。條目更容易掃描。每個條目都應該以強而有力的動詞開頭。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>在同一家公司擔任多個職位：</strong>把公司名稱和總任職日期作為標題，然後在下面列出每個職位各自的日期和條目。這展示了晉升和主動性。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>處理工作空白期：</strong>不要隱藏。解釋它們。</p>
          <p className="text-foreground leading-relaxed mb-4">如果你在空白期間旅行、創業、接案或進修，把它放在履歷上。框架為個人或專業發展。</p>
          <div className="bg-muted/50 rounded-lg p-4 space-y-2 mb-6">
            <p className="text-foreground text-sm italic leading-relaxed">「在 6 個國家獨立旅行和工作，培養了跨文化溝通和專案管理能力。」</p>
            <p className="text-foreground text-sm italic leading-relaxed">「創立小型電商，月營收達 3,000 美元，之後回歸全職工作。」</p>
          </div>
          <p className="text-foreground leading-relaxed mb-4">招募官尊重那些冒險並從中學到東西的人。他們不尊重解釋不清的空白期。</p>
          <RecruiterCheck>我經常看到工作空白期。它們很正常。讓我擔心的是有人試圖透過改日期或完全刪除一個職位來隱藏空白。我寧願看到坦誠的解釋，也不願發現不一致。</RecruiterCheck>
          <p className="text-foreground leading-relaxed mb-10 mt-6"><strong>短期工作（不到 6 個月）：</strong>通常不要放，除非該職位是季節性的或代表一個有意義的職涯轉折點。如果你有連續多個短期工作，那是穩定性的警訊。一次可以解釋。三次就是模式。</p>

          {/* Skills & Certifications */}
          <h3 className="font-heading text-xl text-foreground mb-4">技能和證照</h3>
          <p className="text-foreground leading-relaxed mb-4">只放與職位相關的技能，以及招募官不會假設你已經具備的技能。每個人都會用 Microsoft Office。除非你達到進階或專家等級，否則不要列出來。</p>
          <p className="text-foreground leading-relaxed mb-2">使用這些熟練程度：</p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li><strong>中級：</strong>前 50% 的專業水平</li>
            <li><strong>進階：</strong>前 75% 的專業水平。人們會向你請教。</li>
            <li><strong>專家：</strong>前 95% 的專業水平。你是公認的權威。</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">列出證照時包含證照名稱和獲得年份。如果證照有聲望且高度相關（如 PMP 或 CPA），在摘要和技能段落都提到。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>語言：</strong>只列出商務熟練程度以上的語言。基本或對話程度不夠有用，除非職位特別要求。</p>
          <p className="text-foreground leading-relaxed mb-10"><strong>永遠不要加單獨的關鍵字段落。</strong>有些建議說要建一個「專長」或「特長」段落，塞滿關鍵字。招募官一眼就看穿。這是關鍵字堆砌，它表示你的實際經驗不支持你聲稱的技能。把你的關鍵字融入你的條目中。</p>

          {/* Education */}
          <h3 className="font-heading text-xl text-foreground mb-4">學歷</h3>
          <p className="text-foreground leading-relaxed mb-4">學歷放在履歷底部。這是招募官預期找到它的地方。</p>
          <p className="text-foreground leading-relaxed mb-4">一個例外：如果你申請的是大學畢業後的第一份工作，把學歷放在最上面。招募官會理解你還沒有豐富的工作經驗。</p>
          <p className="text-foreground leading-relaxed mb-2"><strong>要放什麼取決於你畢業多久：</strong></p>
          <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>不到 5 年：學校名稱、學位、畢業年份、榮譽、相關課程、GPA（如果 3.5 以上）</li>
            <li>5-10 年：學校名稱、學位、畢業年份</li>
            <li>10 年以上：學校名稱、學位（如果擔心年齡問題，畢業年份選填）</li>
          </ul>
          <p className="text-foreground leading-relaxed mb-4">學位從最高到最低排列，到學士學位。</p>
          <p className="text-foreground leading-relaxed mb-2"><strong>兩種格式選項：</strong></p>
          <p className="text-foreground leading-relaxed mb-4">精簡版（適合有經驗的專業人士）：Michigan State University, East Lansing, MI | B.A., Marketing, 2012</p>
          <p className="text-foreground leading-relaxed mb-4">詳細版（適合應屆畢業生）：更多細節，多行，下方列出榮譽和相關課程。</p>
          <p className="text-foreground leading-relaxed mb-4"><strong>一致性很重要：</strong>如果你把一個學位縮寫為「B.A.」，全部都要縮寫。如果你把一個學校名稱加粗，全部都要加粗。你在工作經歷段落設定的格式模式應該延續到學歷段落。公司名稱 = 學校名稱（粗體）。職稱 = 學位名稱（斜體）。日期 = 畢業年份。</p>
          <p className="text-foreground leading-relaxed mb-10"><strong>如果你沒有畢業：</strong>坦誠。寫「修讀會計學士（完成 72 個學分）」或「完成電腦科學學士 48 個學分」。永遠不要用可能讓招募官以為你完成了實際上沒完成的學位的方式來呈現。</p>

          {/* Awards */}
          <h3 className="font-heading text-xl text-foreground mb-4">獎項</h3>
          <p className="text-foreground leading-relaxed mb-2">兩種展示獎項的方式：</p>
          <ol className="list-decimal list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
            <li>作為相關工作經歷下的條目（節省空間）</li>
            <li>作為頁面底部附近的獨立段落（如果你有 3 個以上值得強調的獎項）</li>
          </ol>
          <p className="text-foreground leading-relaxed mb-10">對每個獎項，包含：名稱、原因和獲得時間。光是名稱沒有意義。一家公司的「總裁俱樂部」和另一家的不同。</p>

          {/* Never Include */}
          <h3 className="font-heading text-xl text-foreground mb-4">絕對不要放的內容</h3>
          <p className="text-foreground leading-relaxed mb-4">Dan Clay 清楚列出了這些，我完全同意：</p>
          <ul className="list-disc list-inside space-y-3 text-foreground leading-relaxed pl-1">
            <li><strong>目標陳述：</strong>浪費空間。用摘要代替。</li>
            <li><strong>興趣愛好：</strong>留到面試閒聊時再說。</li>
            <li><strong>照片：</strong>公司擔心歧視訴訟。不要給他們擔心的理由。</li>
            <li><strong>推薦人或「推薦人備索」：</strong>他們需要時會問。</li>
            <li><strong>社群媒體連結</strong>（LinkedIn 除外）：他們想找的話會自己找。</li>
            <li><strong>推薦或背書：</strong>留在 LinkedIn。</li>
            <li><strong>個人資訊</strong>（年齡、婚姻狀況、宗教、性別、性取向）：不相關，可能有害。</li>
            <li><strong>圖片或圖形元素：</strong>可能讓 ATS 軟體混亂，而且看起來不專業。</li>
            <li><strong>關鍵字段落：</strong>關鍵字堆砌代表的是弱點，不是強項。</li>
            <li><strong>薪資歷史或期望：</strong>這在談判開始前就暴露了你的底牌。</li>
          </ul>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 8: Final Polish */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="08" title="收尾工作：90% 的人在這裡偷懶" id="polish" />
          <p className="text-foreground leading-relaxed mb-4">你已經規劃了。你已經排版了。你已經寫了有力的、成果導向的條目。你快完成了。</p>
          <p className="text-foreground leading-relaxed mb-10">但「快完成了」正是大多數人停止在意的地方。而這就是他們失敗的地方。</p>

          {/* Rule 9 */}
          <div className="mb-12">
            <GoldenRule number={9} text="完美防止被淘汰" />
            <p className="text-foreground leading-relaxed mb-4">Dan Clay 直言：一個錯誤是意外，兩個是草率，三個是不可原諒。</p>
            <p className="text-foreground leading-relaxed mb-4">根據 CareerBuilder 的調查，61% 的招募官會因為一個錯字就淘汰一份履歷。一個錯字。差距就是這麼小。</p>
            <p className="text-foreground leading-relaxed mb-4">你的履歷需要完美。不是 95% 完美。不是「差不多」。完美。</p>
            <p className="text-foreground leading-relaxed mb-4">以下是要檢查的：</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>拼寫：</strong>使用拼寫檢查，但不要只依賴它。拼寫檢查不會抓到你把「經理」打成「今理」。讓朋友或家人讀一遍。用 Grammarly 之類的工具做第二遍檢查。</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>文法：</strong>條目中去掉人稱代名詞。不是「我建立了一個新流程」而是「建立了新流程」。過去的職位用過去式，只有目前的職位用現在式。</p>
            <p className="text-foreground leading-relaxed mb-4"><strong>時態一致性：</strong>如果你在描述過去的成就，保持過去式。不要在同一個職位中切換「管理了」和「管理」。</p>
            <p className="text-foreground leading-relaxed"><strong>格式：</strong>檢查每個句號、每個空格、每個對齊。你的日期都靠右對齊了嗎？你的條目符號大小一致嗎？標題前後的行高一致嗎？</p>
          </div>

          {/* Rule 10 */}
          <div className="mb-12">
            <GoldenRule number={10} text="持續保持一致" />
            <p className="text-foreground leading-relaxed mb-4">一致性代表專業。你做的每一個格式決定都要全部一樣。</p>
            <p className="text-foreground leading-relaxed mb-4">如果公司名稱是粗體，每個公司名稱都是粗體。如果職稱是斜體，每個職稱都是斜體。如果你在一個地方把 December 縮寫為「Dec.」，你在每個地方都要縮寫。</p>
            <p className="text-foreground leading-relaxed mb-2">一致性不只在格式。想想你資訊的邏輯：</p>
            <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed mb-4 pl-1">
              <li>工作經歷：<strong>公司名稱</strong>（粗體）= 組織。<em>職稱</em>（斜體）= 你的角色。</li>
              <li>學歷：<strong>學校名稱</strong>（粗體）= 組織。<em>學位</em>（斜體）= 你的角色。</li>
            </ul>
            <p className="text-foreground leading-relaxed mb-4">兩個段落的模式應該一樣。組織 = 粗體。角色 = 斜體。</p>
            <p className="text-foreground leading-relaxed mb-2"><strong>常見的一致性錯誤：</strong></p>
            <ul className="list-disc list-inside space-y-2 text-foreground leading-relaxed pl-1">
              <li>句子後面的單空格 vs. 雙空格</li>
              <li>月份縮寫不一致（Dec. vs. December）</li>
              <li>條目末尾缺少句號</li>
              <li>日期範圍的連字號周圍空格不一致</li>
              <li>公司名稱格式不同（LinkedIn vs. LinkedIn Corp.）</li>
              <li>段落之間的行距不同</li>
              <li>條目符號大小不同</li>
              <li>日期沒有對齊右邊距</li>
            </ul>
          </div>

          {/* File Naming */}
          <h3 className="font-heading text-xl text-foreground mb-4">檔案名稱和格式</h3>
          <p className="text-foreground leading-relaxed mb-4">把你的履歷存為 PDF。一律如此。除非公司或招募官特別要求 Word 文件。</p>
          <p className="text-foreground leading-relaxed mb-4">用你的全名、月份和年份命名檔案：「James Bugden Resume_February 2026」</p>
          <p className="text-foreground leading-relaxed mb-4">包含日期表示你的履歷是新的。六個月前的檔名告訴招募官你已經找工作找了一陣子但沒有成功。即使這是事實，也不要廣播出去。</p>
          <p className="text-foreground leading-relaxed mb-4">更進一步：在檔名中加上公司名稱。「James Bugden Resume_February 2026_Google。」這向招募官展示這份履歷是為他們量身定制的，即使內容和你寄給其他地方的一樣。</p>
          <RecruiterCheck>我會注意檔案名稱。當我看到「Resume_final_v3_UPDATED (1).docx」，我立刻懷疑這個候選人的注意力。你的檔案名稱是第一印象的一部分。認真對待。</RecruiterCheck>

          {/* Print Tips */}
          <h3 className="font-heading text-xl text-foreground mb-4 mt-10">列印提示</h3>
          <p className="text-foreground leading-relaxed mb-4">如果你要參加面對面的面試，帶幾份列印副本。檢查有沒有墨漬，確保沒有東西超出列印邊距，用乾淨的白紙。</p>
          <p className="text-foreground leading-relaxed mb-4">不要在高級紙上浪費錢。你的履歷已經完成了它的工作，讓你得到面試機會。內容和對話比紙張品質更重要。</p>
          <p className="text-foreground leading-relaxed">而且永遠不要在公司印履歷。太多事情可能出錯。</p>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 9: 10 Mistakes */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="09" title="我每週都看到的 10 個錯誤" id="mistakes" />
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <p className="text-muted-foreground text-sm mb-6">審閱超過 20,000 份履歷後，以下是一再出現的模式。</p>
            <ol className="list-decimal list-inside space-y-3 text-foreground leading-relaxed">
              <li>申請你不符合資格的職位（黃金法則 #1）</li>
              <li>對每家公司都寄同一份通用履歷（黃金法則 #2）</li>
              <li>過度設計排版（黃金法則 #3）</li>
              <li>超過一頁（黃金法則 #4）</li>
              <li>讓關鍵資訊難以找到（黃金法則 #5）</li>
              <li>使用被動語態和軟弱的措辭（黃金法則 #6）</li>
              <li>列出職責而非成果（黃金法則 #7）</li>
              <li>放入不相關的資訊（黃金法則 #8）</li>
              <li>留下錯字和不一致（黃金法則 #9）</li>
              <li>格式不一致（黃金法則 #10）</li>
            </ol>
            <p className="text-muted-foreground text-sm mt-6">每個錯誤都對應一條黃金法則。遵循法則。避免錯誤。</p>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION 10: Quick Reference & Checklist */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <SectionHeader number="10" title="快速參考：10 條黃金法則 + 檢查清單" id="checklist" />

          {/* 10 Rules Summary */}
          <h3 className="font-heading text-xl text-foreground mb-4">10 條黃金法則一覽</h3>
          <ol className="list-decimal list-inside space-y-2 text-foreground leading-relaxed mb-12 pl-1">
            <li>只申請你有資格的職位</li>
            <li>反映目標職位描述中的語言</li>
            <li>用實力突出，不是用花樣</li>
            <li>正好一頁（大多數人沒有例外）</li>
            <li>先為掃描而設計，再為閱讀而設計</li>
            <li>每個條目都用主動語態</li>
            <li>成果，而非職責（三 R 模型：相關、相對、成果導向）</li>
            <li>優先放與職位最相關的資訊</li>
            <li>完美防止被淘汰</li>
            <li>持續保持一致</li>
          </ol>

          {/* Checklist */}
          <h3 className="font-heading text-xl text-foreground mb-6">送出前檢查清單</h3>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gold/15 flex items-center justify-center text-gold text-xs font-bold">1</span>
                規劃
              </h4>
              <InteractiveChecklist
                guideKey="resume_checklist_plan_zh"
                lang="zh"
                items={[
                  { label: "確認目標公司和職位" },
                  { label: "從 3-5 個職位描述中提取關鍵字" },
                  { label: "用 7 個問題腦力激盪成就" },
                  { label: "將成就對應到職位描述關鍵字" },
                ]}
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gold/15 flex items-center justify-center text-gold text-xs font-bold">2</span>
                格式
              </h4>
              <InteractiveChecklist
                guideKey="resume_checklist_format_zh"
                lang="zh"
                items={[
                  { label: "正好一頁，填滿整頁" },
                  { label: "內容密度在 30-50% 之間" },
                  { label: "全程使用一種字型" },
                  { label: "正確的邊距（側邊 0.5-1 英吋，頂部 1 英吋）" },
                  { label: "標題靠左對齊" },
                  { label: "行距在 1.0-1.15 之間" },
                  { label: "不用顏色、不用圖片、不用圖形" },
                ]}
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gold/15 flex items-center justify-center text-gold text-xs font-bold">3</span>
                內容
              </h4>
              <InteractiveChecklist
                guideKey="resume_checklist_content_zh"
                lang="zh"
                items={[
                  { label: "名字是最顯眼的元素" },
                  { label: "聯絡資訊乾淨（專業 email、一個電話號碼、城市/州）" },
                  { label: "簡介/摘要針對目標職位寫（不放目標陳述）" },
                  { label: "工作經歷按時間倒序排列" },
                  { label: "每個條目以強而有力的動詞開頭" },
                  { label: "每個條目聚焦成果，而非職責" },
                  { label: "條目盡可能包含數字、百分比或金額" },
                  { label: "「5 對 5」法則已套用（近期職位最多 5 個條目，較早職位最多 3 個）" },
                  { label: "每個職位內的條目按相關性排列" },
                  { label: "技能段落只包含相關的、不是一看就知道的技能" },
                  { label: "學歷格式與工作經歷一致" },
                  { label: "沒有放「絕對不要放」清單中的任何內容" },
                ]}
              />
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center gap-2">
                <span className="w-6 h-6 rounded bg-gold/15 flex items-center justify-center text-gold text-xs font-bold">4</span>
                潤飾
              </h4>
              <InteractiveChecklist
                guideKey="resume_checklist_polish_zh"
                lang="zh"
                items={[
                  { label: "零拼寫錯誤（拼寫檢查 + 第二雙眼睛）" },
                  { label: "零文法錯誤" },
                  { label: "時態一致（過去職位用過去式，只有目前職位用現在式）" },
                  { label: "全程格式一致（粗體、斜體、日期、間距、條目符號）" },
                  { label: "檔案存為 PDF" },
                  { label: "檔名格式：「[你的名字] Resume_[月份 年份]_[公司名稱]」" },
                  { label: "列印版已檢查排版、邊距和墨漬" },
                ]}
              />
            </div>
          </div>
        </section>

        <hr className="border-border" />

        {/* ════════════════════════════════════════════════════════ */}
        {/* SECTION: More Guides */}
        {/* ════════════════════════════════════════════════════════ */}
        <section className="py-14 md:py-20">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">更多免費指南</h2>
          <p className="text-foreground leading-relaxed mb-8">你的履歷是第一步。接下來該做的：</p>
          <div className="grid gap-4">
            <Link to="/zh-tw/interview-preparation-guide" className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-300">
              <p className="font-semibold text-foreground group-hover:text-gold transition-colors mb-1">拿到面試了？贏下它。</p>
              <p className="text-muted-foreground text-sm leading-relaxed">查看面試攻略：3 個框架回答任何問題，拿下錄取通知。一個準備答案、建構故事、自信走進面試的系統。</p>
            </Link>
            <Link to="/zh-tw/pivot-method-guide" className="group bg-card border border-border rounded-xl p-5 md:p-6 hover:border-gold/40 hover:shadow-lg transition-all duration-300">
              <p className="font-semibold text-foreground group-hover:text-gold transition-colors mb-1">考慮轉職？</p>
              <p className="text-muted-foreground text-sm leading-relaxed">查看轉職方法：招募官教你在不搞砸一切的情況下轉換跑道。一個在你做出行動之前先測試下一步的框架。</p>
            </Link>
          </div>
        </section>

        {/* Attribution */}
        <p className="text-muted-foreground text-sm text-center italic pb-4">基於 Dan Clay 所著《How to Write the Perfect Resume》</p>

      </main>

      <GuideShareButtons isZhTw />

      <InlineRating contentId="guide_resume_zhtw" locale="zh-tw" />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default ResumeGuideZhTw;