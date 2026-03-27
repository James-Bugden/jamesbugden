import { Clock, ChevronDown, Menu, AlertTriangle } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">{num}</span>
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

const InfoBox = ({ title, children, variant = "default" }: { title: string; children: React.ReactNode; variant?: "default" | "gold" | "green" }) => (
  <div className={`rounded-xl p-5 md:p-6 ${variant === "gold" ? "bg-card border border-gold/30" : variant === "green" ? "bg-executive-green" : "bg-card border border-border"}`}>
    <h4 className={`font-semibold mb-2 ${variant === "green" ? "text-gold" : variant === "gold" ? "text-gold" : "text-foreground"}`}>{title}</h4>
    <div className={`text-sm leading-relaxed ${variant === "green" ? "text-cream/90" : "text-muted-foreground"}`}>{children}</div>
  </div>
);

const tocSections = [
  { id: "intro", label: "前言" },
  { id: "rules", label: "01 · 4 個規則" },
  { id: "work", label: "02 · 讓你升遷的工作" },
  { id: "spikes", label: "03 · 尖峰技能" },
  { id: "brand", label: "04 · 打造品牌" },
  { id: "promotion", label: "05 · 升遷機制" },
  { id: "network", label: "06 · 擴展人脈" },
  { id: "disagree", label: "07 · 表達不同意見" },
  { id: "managing", label: "08 · 管理 vs. 領導" },
  { id: "mental", label: "09 · 心理負擔" },
  { id: "corner", label: "10 · 角落辦公室？" },
  { id: "action", label: "11 · 行動追蹤表" },
  { id: "reference", label: "快速參考" },
  { id: "resources", label: "資源" },
];

const TableOfContents = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const visible = entries.filter((e) => e.isIntersecting);
      if (visible.length > 0) setActive(visible[0].target.id);
    }, { rootMargin: "-80px 0px -60% 0px", threshold: 0 });
    tocSections.forEach(({ id }) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
  }, []);
  return (
    <>
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">目錄</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}>{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button onClick={() => setOpen(!open)} className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform" aria-label="目錄"><Menu className="w-5 h-5" /></button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">目錄</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

/* ── Infographic: 40/40/20 ─────────────────────── */
const WorkSplitDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
    <h4 className="font-heading text-lg text-foreground mb-1">40/40/20 工作分配</h4>
    <p className="text-muted-foreground text-xs mb-4">如何分配你的時間以獲得最大職涯進展</p>
    {[
      { label: "BAU 工作", pct: 40, desc: "核心工作、可重複、團隊內部、可自動化", color: "bg-muted-foreground/30" },
      { label: "高影響力工作", pct: 50, desc: "跨團隊專案、推動策略、可衡量成果", color: "bg-gold" },
      { label: "自我發展", pct: 20, desc: "培訓、指導、證照、文化建設", color: "bg-executive-green" },
    ].map((item) => (
      <div key={item.label}>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-foreground font-medium">{item.label}</span>
          <span className="text-muted-foreground">{item.label === "高影響力工作" ? "40-50%" : item.label === "自我發展" ? "10-20%" : `${item.pct}%`}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden"><div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} /></div>
        <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
      </div>
    ))}
    <div className="border-t border-border pt-4 mt-4">
      <p className="text-foreground text-sm font-semibold mb-2">BAU 太多？用「排序-整合-重新定位」框架：</p>
      <div className="grid grid-cols-3 gap-2">
        {[{ step: "排序", desc: "什麼最有價值？" }, { step: "整合", desc: "合併重複的需求" }, { step: "重新定位", desc: "把任務重新包裝為高影響力工作" }].map((s) => (
          <div key={s.step} className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-foreground text-xs font-bold">{s.step}</p>
            <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Infographic: 10/10/10 ─────────────────────────── */
const OneOnOneDiagram = () => (
  <div className="bg-card border border-border rounded-xl overflow-hidden">
    <div className="bg-executive-green px-5 py-3">
      <h4 className="font-heading text-cream text-lg">10/10/10 一對一會議結構</h4>
      <p className="text-cream/60 text-xs">30 分鐘。三個部分。每次會議。</p>
    </div>
    {[
      { time: "1-10 分鐘", title: "彙報", desc: "分享你工作的影響力。不是任務清單。重點：增加了多少營收、提升了多少效率、降低了多少風險、解決了什麼問題。提到利害關係人的名字。標記即將影響你工作量的待交付事項。" },
      { time: "11-20 分鐘", title: "上報", desc: "分享風險、障礙和你需要的決策。不要等到火燒眉毛才說。說：「在我繼續之前，需要你對 X 提供意見。」提前標記工作量瓶頸。" },
      { time: "21-30 分鐘", title: "爭取", desc: "討論你的發展並獲取回饋。問：「我的目標進展如何？」提出升遷時間表、技能缺口，以及你想爭取的機會。確保你和老闆的認知一致。" },
    ].map((block, i) => (
      <div key={i} className={`px-5 py-4 ${i < 2 ? "border-b border-border" : ""}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gold text-xs font-bold uppercase">{block.time}</span>
          <span className="text-foreground font-semibold text-sm">{block.title}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{block.desc}</p>
      </div>
    ))}
    <div className="bg-gold/10 px-5 py-3">
      <p className="text-foreground text-xs font-medium">如果你沒有定期的一對一會議：停止閱讀。打開你的行事曆。現在就排一個。最少每兩週一次。每週更好。</p>
    </div>
  </div>
);

/* ── Infographic: 9-Box Grid ──────────────────────────────────── */
const NineBoxGrid = () => {
  const boxes = [
    { pos: "top-left", label: "3. 失能型天才", desc: "有遠見，零執行力。" },
    { pos: "top-mid", label: "7. 高潛力", desc: "軟實力超越產出。在領導層的關注名單上。" },
    { pos: "top-right", label: "9. 明星 ★★★", desc: "前 1-5%。快速晉升。掌握了這場遊戲。" },
    { pos: "mid-left", label: "2. 進退兩難", desc: "能說會道，交付薄弱。時間不多了。" },
    { pos: "mid-mid", label: "6. 核心成員", desc: "工作和軟實力都不錯。會到中階主管然後停滯。" },
    { pos: "mid-right", label: "8. 高績效者", desc: "每場會議的專家。龐大工作量，高水準。每 3-4 年升一次。" },
    { pos: "bot-left", label: "1. 招錯人", desc: "什麼都低。很快被汰換或解僱。" },
    { pos: "bot-mid", label: "4. 拚命三郎", desc: "交付強，溝通差。一直在做但得不到認可。" },
    { pos: "bot-right", label: "5. 工作馬", desc: "超越職責。被告知「沒有你我們做不到」但從不升遷。" },
  ];
  const highlight = ["top-right", "top-mid", "mid-right"];
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6">
      <h4 className="font-heading text-lg text-foreground mb-1">9-Box：你在哪一格？</h4>
      <p className="text-muted-foreground text-xs mb-4">績效 vs. 潛力：公司如何秘密評估你</p>
      <div className="flex text-xs text-muted-foreground mb-2">
        <div className="w-20 shrink-0" />
        <div className="flex-1 grid grid-cols-3 text-center font-semibold"><span>低績效</span><span>中等績效</span><span>高績效</span></div>
      </div>
      {["高潛力", "中等潛力", "低潛力"].map((rowLabel, ri) => (
        <div key={ri} className="flex mb-1">
          <div className="w-20 shrink-0 flex items-center"><span className="text-xs text-muted-foreground font-semibold leading-tight">{rowLabel}</span></div>
          <div className="flex-1 grid grid-cols-3 gap-1">
            {boxes.slice(ri * 3, ri * 3 + 3).map((box) => (
              <div key={box.pos} className={`rounded-lg p-2.5 ${highlight.includes(box.pos) ? "bg-gold/10 border border-gold/30" : "bg-muted/40 border border-border"}`}>
                <p className={`text-xs font-bold leading-tight ${highlight.includes(box.pos) ? "text-gold" : "text-foreground"}`}>{box.label}</p>
                <p className="text-muted-foreground text-[10px] leading-snug mt-1">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
          <p className="text-destructive text-xs font-bold mb-1">大多數人卡在哪裡：</p>
          <p className="text-muted-foreground text-xs">第 4-5 格：努力工作，沒有升遷 = 軟實力不足</p>
          <p className="text-muted-foreground text-xs">第 6 格：舒適，沒有成長的緊迫感 = 「停滯區」</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
          <p className="text-green-400 text-xs font-bold mb-1">你想要在哪裡：</p>
          <p className="text-muted-foreground text-xs">第 7-8-9 格：唯一通往高階管理層的三格</p>
        </div>
      </div>
    </div>
  );
};

/* ── Kings vs Specialists ────────────────────────── */
const KingsVsSpecialists = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-2xl mb-2">👑</p>
      <h4 className="text-foreground font-bold text-sm mb-3">國王</h4>
      <div className="space-y-2 text-muted-foreground text-xs">
        <p><strong className="text-foreground">心態：</strong>所有人都是為他們服務的，讓他們的生活更輕鬆。</p>
        <p><strong className="text-foreground">什麼時候和你合作：</strong>當他們需要你的東西時。</p>
        <p><strong className="text-foreground">你的角色：</strong>支持他們的目標。移除障礙。讓他們看起來好。</p>
        <p><strong className="text-foreground">關鍵策略：</strong>支持、支持、再支持。</p>
        <p><strong className="text-foreground">這樣說：</strong>「我來這裡是幫助你成功的。你需要什麼？」</p>
      </div>
    </div>
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-2xl mb-2">🧠</p>
      <h4 className="text-foreground font-bold text-sm mb-3">專家</h4>
      <div className="space-y-2 text-muted-foreground text-xs">
        <p><strong className="text-foreground">心態：</strong>他們什麼都知道。沒有他們的決策注定失敗。</p>
        <p><strong className="text-foreground">什麼時候和你合作：</strong>當你先承認他們的專業知識時。</p>
        <p><strong className="text-foreground">你的角色：</strong>尊重他們的知識。提前讓他們參與。做預先溝通。</p>
        <p><strong className="text-foreground">關鍵策略：</strong>尊重、尊重、再尊重。</p>
        <p><strong className="text-foreground">這樣說：</strong>「你在這方面有豐富的知識。你能告訴我為什麼這樣行不通嗎？」</p>
      </div>
    </div>
  </div>
);

/* ── Skill Maturity Ladder ───────────────────────── */
const SkillMaturityLadder = () => {
  const stages = [
    { num: "4", title: "策略願景", range: "總監 → 高階主管", focus: "制定策略（三的法則）。建立團隊品牌。適應未知。在有限資訊下做決策。", invest: "聘請高階教練。在這個層級，外部顧問幾乎是必要的。" },
    { num: "3", title: "管理能力", range: "經理 → 資深經理", focus: "設定期望（CODS 框架）。授權。定期檢視。了解每個團隊成員的學習風格和目標。", invest: "管理教練或管理培訓。書籍和 podcast。不要等 11 年才接受第一次培訓。" },
    { num: "2", title: "社交技能", range: "中階 → 資深個人貢獻者", focus: "建立人際關係。有目的地社交。在不說「不」的情況下表達不同意見。", invest: "找一位導師。學會指導他人。在你需要之前就建立關係。" },
    { num: "1", title: "技術能力", range: "個人貢獻者 → 初階經理", focus: "主動積極。核心工作交付。提出釐清問題。電子郵件和會議禮儀。", invest: "考取證照。跨部門和跨產業的橫向異動。把你的核心工作學到透徹。" },
  ];
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6">
      <h4 className="font-heading text-lg text-foreground mb-1">技能成熟度階梯</h4>
      <p className="text-muted-foreground text-xs mb-4">在你職涯的每個階段要發展什麼</p>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.num} className={`rounded-lg p-4 ${i === 0 ? "bg-gold/10 border border-gold/30" : "bg-muted/30 border border-border"}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${i === 0 ? "bg-gold text-white" : "bg-muted-foreground/20 text-foreground"}`}>第 {s.num} 階段</span>
              <span className="text-foreground font-semibold text-sm">{s.title}</span>
              <span className="text-muted-foreground text-xs ml-auto hidden sm:inline">{s.range}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed"><strong className="text-foreground">重點：</strong>{s.focus}</p>
            <p className="text-muted-foreground text-xs leading-relaxed mt-1"><strong className="text-foreground">投資：</strong>{s.invest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareerGameGuideZhTw = () => {
  useTrackGuideProgress("career-game-zh");

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/career-game-guide", title: "職涯遊戲指南｜策略思維", description: "把職涯當作長期博弈。涵蓋時機、槓桿和策略性行動。" })} />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3"><AuthHeaderButton variant="nav" /><LanguageToggle variant="nav" /></div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            升遷教戰手冊：<br className="hidden sm:block" />公司永遠不會告訴你的 36 個職場秘密
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden｜職涯教練 · 資深招募人員 @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60"><Clock className="w-4 h-4" /><span className="text-sm">50 分鐘閱讀</span></div>
          </div>
          <p className="text-sm text-cream/50 italic">根據 Kendall Berg 著作《Secrets of the Career Game》整理</p>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      <TableOfContents />

      {/* ═══════════════════ 前言 ═══════════════════ */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">Kendall Berg 是前科技策略總監，曾任職於 Capital One、JP Morgan Chase、Samsung 和 AT&T。她在 30 歲前就收到財務長的職位邀約，管理過跨國金融服務團隊，並建立了一個涵蓋多位高階主管的人脈網絡。她目前經營 That Career Coach，分享大多數公司不會告訴你的職涯攻略。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">她的核心訊息很簡單：職涯是一場有規則的遊戲。大多數人從來沒學過這些規則。學會的人升遷更快、倦怠更少，不再把自己的發展交給運氣。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">我坐在桌子的另一邊。我是審閱你履歷的人。我在招募決策的會議室裡。我看到誰升遷了、誰卡住了。這 36 個秘密和我在數千次招募決策中觀察到的完全一致。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">這份指南是我用招募人員的視角拆解這本書的框架。每個概念都來自書中。「我的看法」來自我 15 年以上的招募經驗。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">如何閱讀這份指南：</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">如果你只有 10 分鐘，讀「<a href="#rules" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">職涯遊戲的 4 個規則</a>」和最後的「<a href="#action" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">90 天行動追蹤表</a>」。這兩個部分會從明天開始改變你對工作的思考方式。</span></li>
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">如果你有 30 分鐘，加上「<a href="#spikes" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">找到你的尖峰技能</a>」和「<a href="#brand" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">打造你的品牌</a>」。邊讀邊填寫模板。</span></li>
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">如果你讀完整份指南，你會得到一套完整的<a href="#promotion" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">升遷</a>、<a href="#network" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">建立人脈</a>、<a href="#managing" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">管理團隊</a>的方法，以及決定你是否真的想要那間<a href="#corner" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">角落辦公室</a>。</span></li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">模板的設計方便截圖或列印。填寫它們。放在你的桌上。每 90 天回來檢視一次。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 1: 4 個規則 ═══════════════════ */}
      <section id="rules" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">職涯遊戲的 4 個規則</h2>
              <p className="text-muted-foreground text-lg">大多數人從來沒學過的基本規則</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">秘密 1：你是創業家，你的職涯就是你的事業</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">這裡有一個我很喜歡的比喻。想像有人要你玩一個你從沒見過的遊戲，拒絕告訴你規則，然後要你拿生計來賭。你會直接走人。</p>
              <p className="text-muted-foreground leading-relaxed mb-4">但這就是大多數人每天上班在做的事。打卡上班、埋頭做事、希望有人注意到。</p>
              <p className="text-muted-foreground leading-relaxed">換個方式思考。把自己想成一個企業主。你的技能是產品。你的老闆和公司是你的客戶。你的人脈是你的潛在客戶名單。當你像經營事業一樣經營職涯，你的決策方式會改變。你不再對每個要求說好。你開始思考你的時間在哪裡產生最大價值。你評估你目前的「客戶」（雇主）是否合適，還是你需要找更好的客戶。</p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">秘密 2：人際關係比工作更重要</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">這是書中最殘酷的真相。一個又一個的故事證明了這一點。</p>
              <p className="text-muted-foreground leading-relaxed mb-4">看看 Erin。一個每週工作 80-100 小時的明星員工。從不掉球。替其他團隊收拾殘局。帳面上看，她是最佳表現者。但 Erin 在任職初期就和一位叫 Bob 的資深利害關係人搞砸了關係。那一段受損的關係拖住了她。Bob 最終在自己的團隊裡雇了一個人來做 Erin 的工作，這樣他就不用和她互動。Erin 從未升遷。她離開了公司。</p>
              <p className="text-muted-foreground leading-relaxed">再看 Stacy。團隊裡最博學的人。絕對的領域專家。但沒有人喜歡和她共事。她囤積資訊。她拒絕授權。她在會議中使用刻薄的語言。當 Stacy 被提名升遷時，她的主管提出了有力的論述。每個人都對她的技術成就點頭表示認同。然後有人問了一個簡單的問題：「有人喜歡和她一起工作嗎？」會議室安靜了。Stacy 從升遷候選人變成了「需要改進」。一場會議的事。</p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">秘密 3：溝通是關鍵</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">書中分享了一段讓我尊敬的自白。作者曾經收到最糟糕的回饋是：「你工作做得很好，但和你共事不太好。」</p>
              <p className="text-muted-foreground leading-relaxed mb-4">八年後，她收到最好的讚美是：「我希望自己在困難情況下也能像你一樣善於溝通。」</p>
              <p className="text-muted-foreground leading-relaxed mb-4">這個轉變花了多年的刻意練習。溝通不是為了捍衛你的觀點。而是用你的聽眾在乎的方式來呈現你的工作。他們的痛點。他們的優先事項。他們的目標。在你的下一場會議前，寫下誰會在場，每個人最大的優先事項是什麼。然後準備兩到三個數據點，把你的工作和他們的優先事項連結起來。</p>
              <InfoBox title="我的看法" variant="gold"><p>當我做初步電話篩選時，溝通是我第一個評估的。不是你說什麼。是你怎麼說。你能在 60 秒內清楚地解釋你的工作嗎？你能把你的成就和業務成果連結起來嗎？大多數候選人給我一長串任務清單。能進到下一輪的人會告訴我一個關於影響力的故事。</p></InfoBox>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">秘密 4：除了你自己，沒有人對你的職涯負責</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">這個部分很直接。如果你留在有毒的工作環境，受傷的是你。如果你每次都接受第一個工作機會而不評估適合度，被拖累的是你。如果你忠於一家不給你升遷的公司，卡住的是你。</p>
              <p className="text-muted-foreground leading-relaxed mb-4">把求職想成約會。你的履歷是交友檔案。面試是快速約會。被錄取是「穩定交往」。如果你忽視紅旗，你會陷入一段不健康的婚姻。</p>
              <p className="text-muted-foreground leading-relaxed mb-4">寫三個「熱情宣言」，描述什麼讓你在工作中感到充實。不是任務。是核心需求。</p>
              <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
                <p className="text-foreground text-sm italic mb-2">「我對擁有廣泛的影響範圍和每天做不同任務充滿熱情。」</p>
                <p className="text-foreground text-sm italic mb-2">「我對領導和培養團隊充滿熱情。」</p>
                <p className="text-foreground text-sm italic">「我需要直接看到自己努力的成果。」</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">然後把你的面試問題對應到這些熱情宣言。如果答案不一致，這份工作就不適合你，不管條件看起來多好。還有一個建議：如果用人主管是你在面試過程中最不喜歡的人，不要接受這份工作。你的直屬主管對你職涯的影響比公司裡幾乎任何人都大。</p>
              <InfoBox title="我的看法" variant="gold"><p>我告訴每個和我合作的候選人，面試公司的力度要和公司面試你一樣。要求和團隊成員交談。詢問離職率。問主管最不喜歡這個角色的地方。跳過這一步的候選人，六個月後又回到市場上。</p></InfoBox>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-8">以上是四個基本規則。現在來談工作本身。因為不是所有工作都一樣。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 2: 讓你升遷的工作 ═══════════════════ */}
      <section id="work" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">讓你升遷的工作</h2>
              <p className="text-muted-foreground text-lg">不是所有工作都一樣</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">三種工作類型</h3>
          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "BAU（日常營運工作）", desc: "這是你的核心工作。職位說明書上列出的任務。做報表、管理系統、回覆需求。這是維持你職位的工作，但很少讓你升遷。" },
              { num: "2", title: "高影響力/高能見度工作", desc: "這是推動公司前進的工作。涉及多個團隊。符合公司策略。解決關鍵問題。而且成果可衡量。" },
              { num: "3", title: "自我發展/參與工作", desc: "這是投資自己和團隊文化。考取證照。閱讀。上課。帶領團隊參與活動。指導他人。" },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-5">
                <h4 className="text-foreground font-semibold text-sm mb-2">{item.num}. {item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">40/40/20 法則</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">追蹤你一週做的所有事情。標記每項任務。理想的比例：40% BAU、40-50% 高影響力工作、10-20% 自我發展。</p>
          <WorkSplitDiagram />

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 5：你必須建立和維持健康的界限</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">目標不是工作更多。也不是工作更努力。目標是更好地安排你的時間。這從界限開始。把它們寫下來。範例：週末不工作。準時下班。一定要吃午飯。家人生病時不工作。</p>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 6：你的老闆不知道你在做什麼</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">就這樣。再好的主管也不會追蹤你的所有任務。讓他們了解你的工作狀況是你的責任。</p>
          <OneOnOneDiagram />
          <InfoBox title="我的看法" variant="gold"><p className="mt-2">當我做背景調查時，我會問主管候選人履歷上列出的具體專案。你會驚訝有多少次主管說「我不知道他們在做那件事。」如果你的老闆不知道你的成績，他們不會在你不在場的會議室裡替你說話。</p></InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 7：你如何談論你的工作很重要</h3>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-destructive text-xs font-bold mb-2">選項 A</p>
              <p className="text-muted-foreground text-sm italic">「我催促利害關係人在截止日期前提供資料，追蹤預算支出，建立了專案文件。」</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 text-xs font-bold mb-2">選項 B</p>
              <p className="text-muted-foreground text-sm italic">「我交付了一套精簡的技術解決方案，透過和關鍵利害關係人合作、釐清業務需求、引導業務走向預算內的最佳方案，提升了 20% 的開發效率。」</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">同一個人。同一個專案。完全不同的認知。規則：不要描述你做了什麼。描述沒有你就不會發生什麼。</p>
          <InfoBox title="我的看法" variant="gold"><p>這就是一份收到回電的履歷和一份被跳過的履歷之間的差別。我掃描履歷時找的是影響力語言。「管理一個團隊」什麼都沒告訴我。「透過重組客戶流程將團隊營收提升 40%」告訴我一切。</p></InfoBox>
        </div>
      </section>

      {/* ═══════════════════ SECTION 3: 尖峰技能 ═══════════════════ */}
      <section id="spikes" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">找到你的尖峰技能</h2>
              <p className="text-muted-foreground text-lg">找出讓你卓越的東西</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 8：如果你沒有產生影響力，你不會看到進展</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">看看 Steve。優秀的數據技能。好的聲譽。但他很少被選入高影響力的專案。他被稱為「那個做數據的人」，而不是一個交付成果的人。當作者把他放到她的團隊時，Steve 提出了一個出色的方案並獨立執行。這個專案為公司節省了數百萬元的成本，並推動了超過 30% 的效率提升。Steve 第一次不再只是那個做數據的人。他成為了交付影響力的人。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 9：沒有人需要的技能毫無價值</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">如果你有一項技能但身邊沒有人需要它，它不會幫你升遷。把你的優勢帶到最需要的地方。不要強迫自己進入一個不重視你所帶來的價值的環境。</p>

          <Collapsible title="20 項技能清單">
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm mt-3">
              {["高度正直/誠實", "技術/專業經驗", "解決問題/分析問題", "創新", "學習敏捷度/自我發展", "追求結果", "設定挑戰性目標", "主動積極", "有力的溝通", "激勵/激發他人", "建立關係", "協作和團隊合作", "策略思維", "推動變革", "客戶和外部導向", "培養他人", "堅強的道德品格", "決策力", "冒險精神", "重視多元化"].map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ol>
          </Collapsible>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">你的「尖峰技能」是比其他分數高出 1-2 分的技能。有兩項技能需要特別注意：溝通和協作。如果其中任何一項落在你的最低四名，先修這些。</p>
          <InfoBox title="我的看法" variant="gold"><p>當我評估候選人時，我找的是尖峰技能。我不想要一個「什麼都還可以」的人。我要一個在兩三件事上出類拔萃的人。告訴我你有什麼不同。如果你說不出來，我會轉向能說出來的人。</p></InfoBox>
        </div>
      </section>

      {/* ═══════════════════ SECTION 4: 打造品牌 ═══════════════════ */}
      <section id="brand" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">打造你的品牌</h2>
              <p className="text-muted-foreground text-lg">把你的尖峰技能包裝成人們記住的東西</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">11 清單</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">寫出：五件你想在工作中被知道的事。五件你不想在工作中被知道的事。一個使命宣言。</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
              <h4 className="text-green-400 font-semibold text-sm mb-2">想被知道的：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm"><li>策略/願景</li><li>改善/精簡流程</li><li>成為優秀的團隊領導者</li><li>熱情</li><li>強大的溝通</li></ul>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h4 className="text-destructive font-semibold text-sm mb-2">不想被知道的：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm"><li>自私</li><li>微管理</li><li>短視</li><li>搶功勞</li><li>糟糕的領導</li></ul>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 10：別人在工作中如何看你，直接在你的掌控中</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">你的個人品牌應該和你現在的樣子一致。不是你想成為的樣子。有了 11 清單後，寫一到兩句的電梯簡報。背下來。到處使用。隨著時間推移，會發生回聲效應。當你持續一致地描述自己時，你周圍的人開始用同樣的語言來描述你。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 11：你的品牌會在你之前進入會議室，在你離開後很久才離開</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">95% 關於你職涯、升遷和發展的對話，發生在你不在場的時候。你需要你的品牌在你永遠不會進入的會議室裡替你工作。</p>
          <InfoBox title="我的看法" variant="gold"><p>當用人主管告訴我「我需要一個很會某件事的人」，我腦中立刻浮現那些用這種方式描述自己的候選人。如果你從來沒有告訴我你有什麼不同，你不會被想到。你的品牌就是你的行銷。做得好，機會會找到你，而不是你找機會。</p></InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">冒牌者症候群：重新定義</h3>
          <p className="text-muted-foreground leading-relaxed">冒牌者症候群不是缺乏信心。而是對自己學習新事物的能力缺乏信念。大多數人只在知道所有答案時才感到有信心。但信心應該是相信自己有能力搞清楚事情。你目前擁有的每一項技能，都曾經是從零開始學的。下一個也一樣。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 5: 升遷機制 ═══════════════════ */}
      <section id="promotion" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">升遷機制</h2>
              <p className="text-muted-foreground text-lg">決策如何真正做出</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 12：人們喜歡和自己喜歡的人一起工作</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">六項標準職能評估中有五項和軟實力相關。你的公司對你在協作、文化貢獻和與人共事方面的評分，高於對你技術能力的評分。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 13：只有想升遷但沒有計畫，12 個月後你會在原地不動</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">獲得升遷的人是那些主動要求、有計畫、建立自己支持資源的人。他們不會走進年終考核時期待驚喜。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 15：大多數關於你職涯的對話會在你不在場時進行</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">公司有三個階段：績效考核（你有 80% 控制權）、升遷提報（60% 控制權）、校準（最少控制權，但你的人脈和品牌會替你工作）。</p>
          <InfoBox title="我的看法" variant="gold"><p>我去過這些房間。我看過有人因為房間裡沒人認識他們而被調降。我也看過有人因為三位領導者替他們說話而留在頂端。你的人脈不是可有可無的。它是你在那些你不在場的會議室裡的保險。</p></InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 16：讓你進入高階管理層的是你的潛力，不是你的績效</h3>
          <NineBoxGrid />

          <Collapsible title="你現在在哪一格？快速自我檢測">
            <div className="space-y-3 mt-3">
              {[
                { q: "你聽到「工作做得好」但從不升遷？", a: "第 4 或 5 格。你的軟實力需要加強。" },
                { q: "人們喜歡和你合作但質疑你的產出？", a: "第 2 或 7 格。你的交付需要加強。" },
                { q: "你得到不錯的考核但覺得卡住了？", a: "第 6 格。你需要決定是否想要更多。" },
                { q: "你被拉入高能見度的專案，每 3-4 年升一次？", a: "第 8 格。繼續你正在做的。" },
                { q: "每個人都搶著和你合作，你正在快速晉升？", a: "第 9 格。你已經掌握了這場遊戲。" },
              ].map((item, i) => (
                <div key={i} className="bg-background rounded-lg p-3">
                  <p className="text-foreground text-sm font-medium mb-1">{item.q}</p>
                  <p className="text-muted-foreground text-xs">→ {item.a}</p>
                </div>
              ))}
            </div>
          </Collapsible>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 17：建立你的領導力，不只讓你成功，也讓你的團隊成功</h3>
          <p className="text-muted-foreground leading-relaxed">你的個人技能讓你走到這裡。領導力技能讓你到達下一個層級。你需要持續成長和發展自己與你的人才，同時讓你的領導層了解這些工作。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 6: 人脈 ═══════════════════ */}
      <section id="network" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">擴展你的人脈</h2>
              <p className="text-muted-foreground text-lg">你在那些你不在場的會議室裡的保險</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 18：你的人脈必須超越你自己的團隊</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">把你的人脈想成一棵樹。主幹是你的直屬領導鏈。枝葉是你的橫向、斜向和跨組織關係。大多數人建立了強壯的主幹就停下來。但枝葉才是讓你脫穎而出的關鍵。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 19：沒有人脈你會失敗</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">為你組織中的 20-25 人按八個標準評分：關係強度、職級、風險、影響力、曝光度、威嚇度、背書力、未來影響力。專注於你的前五位可接觸對象。在 30 天內安排咖啡聊天。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 20：幫助你的人會比你幫助的人更喜歡你</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">這違反直覺，但有心理學作為依據。在社交時，先尋求學習。不要先提供幫助。請他們教你。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">導師關係的規則</h3>
          <div className="space-y-2 mb-6">
            {["不要抱怨你的老闆、管理層或同事。你的導師不是你的心理諮商師。", "準備好兩到三個導師能透過指導增加價值的話題。", "安排正式會議。放在行事曆上。這是一段專業關係。", "不要乞求工作。如果他們張貼了一個你感興趣的職位，在單獨的對話中詢問。"].map((rule, i) => (
              <div key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-muted-foreground text-sm">{rule}</span></div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECTION 7: 表達不同意見 ═══════════════════ */}
      <section id="disagree" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如何表達不同意見而不被解僱</h2>
              <p className="text-muted-foreground text-lg">困難情境的溝通框架</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 21：你表達不同意見的方式比你的意見更重要</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">意見分歧失控的三個原因：管理層不一定想要最直接的解決方案、管理層有你看不到的背景資訊、你沒有帶人跟上你的思考過程。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">國王和專家</h3>
          <KingsVsSpecialists />

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 22：根據對方調整你的溝通方式，能在衝突出現前就化解它</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">日本概念 nemawashi（根回し）：「決策在走廊上完成」。不要等到大型會議才第一次提出你的想法。做預先溝通。建立共識。</p>

          <h3 className="font-heading text-lg text-foreground mb-3">衝突解決的五個工具</h3>
          <div className="space-y-3 mb-6">
            {[
              { tool: "大量提問。", desc: "把你的回饋包裝成問題。不要說「那行不通」，改說「你能幫我理解這如何和營運團隊的需求對齊嗎？」" },
              { tool: "先認可再回應。", desc: "當有人提出你不同意的方案時，先說「謝謝你提出這個」再解釋你的顧慮。" },
              { tool: "表達不同意見但不說不。", desc: "說「我理解為什麼我們想這樣做，但我有一些顧慮...」" },
              { tool: "RASI 框架。", desc: "重述問題。提出釐清問題。陳述你的解決方案。讓其他人參與取得共識。" },
              { tool: "一切都是「可以」。", desc: "不要說不，而是框定成本：「我們完全做得到。需要增加兩個人力，並把 Q3 時間線延後六週。你希望我把這些選項整理出來嗎？」" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{i + 1}. {item.tool}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-foreground mb-3">ARSE 電子郵件模板</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "A", word: "認可", desc: "感謝他們聯繫你。如果他們是更高層級或外部人員，正式打招呼。" },
              { letter: "R", word: "重述", desc: "用你自己的話重複他們的問題。增加背景資訊。" },
              { letter: "S", word: "解決", desc: "提出解決方案。回答問題。提供下一步行動。" },
              { letter: "E", word: "讚揚", desc: "表達感謝。認可他們的專業知識。提醒他們你隨時可以跟進。" },
            ].map((item) => (
              <div key={item.letter} className="bg-card border border-border rounded-xl p-4">
                <span className="text-gold font-bold text-lg">{item.letter}</span>
                <span className="text-foreground font-semibold text-sm ml-2">{item.word}</span>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 23：你不會總是如願</h3>
          <p className="text-muted-foreground leading-relaxed">這就是 Amazon 的「不同意但承諾」做法。儘早分享你的顧慮。如果管理層仍然選擇不同的方向，放下它，努力讓專案成功。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 8: 管理 vs 領導 ═══════════════════ */}
      <section id="managing" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">管理 vs. 領導</h2>
              <p className="text-muted-foreground text-lg">你職涯中最大的技能跳躍</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 24：管理和領導不是同一回事</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">從資深經理到總監的跳躍是所有產業中最困難的之一。你必須學會領導，不只是管理。</p>
          <InfoBox title="我的看法" variant="gold"><p>我曾經僱了一位資深經理擔任團隊主管。技術能力強。面試表現出色。三個月內，半個團隊要求轉調。問題？他什麼都自己做。現在當我招募管理職時，我問的第一個問題是：「告訴我你團隊裡你培養的一個人。」如果答案含糊，這告訴我一切。</p></InfoBox>

          <SkillMaturityLadder />

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">CODS 工作指派框架</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "C", word: "背景", desc: "為什麼這項工作重要？什麼利害關係人提出的？" },
              { letter: "O", word: "產出", desc: "交付物長什麼樣子？要具體。" },
              { letter: "D", word: "截止日期", desc: "初稿什麼時候交？中間有什麼檢查點？" },
              { letter: "S", word: "資源", desc: "他們去哪裡獲取更多資訊？和誰合作？" },
            ].map((item) => (
              <div key={item.letter} className="bg-background border border-border rounded-xl p-4">
                <span className="text-gold font-bold text-lg">{item.letter}</span>
                <span className="text-foreground font-semibold text-sm ml-2">{item.word}</span>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 25-29 重點</h3>
          <div className="space-y-3">
            {[
              "秘密 25：成功始於任務指派，而非完成。",
              "秘密 26：一個成功的員工造就一個成功的領導者。你的團隊做得越好，你看起來越好。",
              "秘密 27：負面的模式比負面的人更有問題。管理的是模式，不是個人。",
              "秘密 28：你無法代替你的團隊。授權。如果你什麼都自己做，你的團隊成長不了，你也是。",
              "秘密 29：策略是必要的。用願景問題和三的法則來建立策略。",
            ].map((s, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">{s.split("。")[0]}。</strong>{s.substring(s.indexOf("。") + 1)}</p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECTION 9: 心理負擔 ═══════════════════ */}
      <section id="mental" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">心理負擔、有毒工作環境和向上管理</h2>
              <p className="text-muted-foreground text-lg">保護你的能量，讓其他一切運作</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 30：管理你的心理負擔應該優先於管理你的工作量</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">心理負擔，而非工作時數，才是倦怠的真正預測指標。</p>
          <h4 className="text-foreground font-semibold text-sm mb-3">降低心理負擔的六個策略：</h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li>清單和路線圖。把大專案拆成小任務。</li>
            <li>日程區塊化。某些類型的工作放在某些天。</li>
            <li>優先順序權衡。帶著清單找老闆。</li>
            <li>全面授權。交出所有權，不只是任務。</li>
            <li>制定策略。有清楚路線圖後更容易拒絕不符合的新要求。</li>
            <li>給經理：專注於未來一到兩年。</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 31：有毒的工作環境對任何人都沒好處</h3>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-6">
            <ul className="space-y-2">
              {["你在週日晚上就開始恐懼週一早上。", "你因為害怕被責罵而不敢問問題。", "你覺得被歧視。", "你不信任你的老闆會支持你。", "無償的極端加班、言語虐待或不當關係是常態。", "你請假只是為了從工作中恢復。"].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-foreground text-sm font-medium mt-4">如果以上任何一項與你相符，建議很直接：辭掉工作。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 32：從有毒工作環境中恢復需要時間</h3>
          <p className="text-muted-foreground leading-relaxed">就像從一段糟糕的感情中恢復一樣，離開有毒環境後你需要時間重建。回到你的尖峰技能和 11 清單。重新認識自己。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 10: 角落辦公室 ═══════════════════ */}
      <section id="corner" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">你真的想要那間角落辦公室嗎？</h2>
              <p className="text-muted-foreground text-lg">大多數職涯建議跳過的誠實問題</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 33：大多數人永遠不會成為高階主管</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">高階領導的五項不可妥協的技能：公眾演說、堅強的道德品格、策略、處理人際衝突的能力、堅定不移的自信。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 34：你職涯的正確路徑是你技能和興趣的自然對齊</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">它不總是一條直線往上的梯子。它是一個職涯格子，往上、往旁邊、斜向移動。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 35：只有你直屬主管的文化才重要</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">「幽靈文化」是執行長認為存在的文化。大多數員工體驗到的是他們直屬團隊的次文化。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">最強的建議：要求和團隊中的一位同事交談。如果公司拒絕，這是一個嚴重的紅旗。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 36：你僱用的領導者決定你的公司文化</h3>
          <p className="text-muted-foreground leading-relaxed">以價值觀對齊為標準招聘。技術技能教得會。價值觀教不會。</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 11: 行動追蹤表 ═══════════════════ */}
      <section id="action" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">你的下一步：評估並採取行動</h2>
              <p className="text-muted-foreground text-lg">把指南變成今天的行動</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 1 步：評估你現在的位置（本週）</h3>
              <InteractiveChecklist guideKey="career_game_step1_zh" lang="zh" items={[
                { label: "完成 20 項技能自我評估。自評 1-10 分。找到你的尖峰技能。", href: "#spikes" },
                { label: "追蹤你一整週的工作。標記 BAU / 高影響力 / 自我發展。對照 40/40/20 目標。", href: "#work" },
                { label: "寫你的 11 清單。五件你想被知道的事。五件你不想的。一個使命宣言。", href: "#brand" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 2 步：做一次現實檢驗（30 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step2_zh" lang="zh" items={[
                { label: "給你的老闆一張空白的職能表。請他們為你評分。" },
                { label: "請三個人做 20 項技能評估。平均結果。", href: "#spikes" },
                { label: "問：「你需要什麼條件才會替我爭取升遷？」", href: "#promotion" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 3 步：建立你的品牌（60 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step3_zh" lang="zh" items={[
                { label: "寫你的兩句電梯簡報。背下來。", href: "#brand" },
                { label: "挑出三到五個品牌關鍵詞。寫在便利貼上。" },
                { label: "在 5 場以上的會議中使用品牌語言。", href: "#brand" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 4 步：擴展你的人脈（90 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step4_zh" lang="zh" items={[
                { label: "建立 20-25 人的影響力名單。用八個標準評分。", href: "#network" },
                { label: "和你的前五名聯繫人安排咖啡聊天。" },
                { label: "為每次會議準備兩到三個指導話題。" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 5 步：建立升遷基礎設施（持續）</h3>
              <InteractiveChecklist guideKey="career_game_step5_zh" lang="zh" items={[
                { label: "開始使用成就追蹤表。每週更新。", href: "#promotion" },
                { label: "安排每兩週一對一會議。用 10/10/10 結構。", href: "#promotion" },
                { label: "找出一項 BAU 任務來整合、重新定位或自動化為高影響力工作。", href: "#work" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 6 步：每 90 天檢視自己</h3>
              <InteractiveChecklist guideKey="career_game_step6_zh" lang="zh" items={[
                { label: "重新評估你的職能。差距在縮小嗎？", href: "#spikes" },
                { label: "檢視你的 40/40/20 工作分配。有改變嗎？", href: "#work" },
                { label: "更新成就追蹤表。和老闆分享成績。" },
                { label: "每季重新聯繫一位淡出的人脈。", href: "#network" },
              ]} />
            </div>
          </div>

          <InfoBox title="我的看法" variant="gold">
            <p className="mt-1">進展最快的候選人是那些把職涯當成專案來管理的人。他們設定目標。追蹤進度。每季調整。他們不會等到年度考核才知道自己的狀況。執行第 1-6 步，你會領先 90% 的同事。</p>
          </InfoBox>
        </div>
      </section>

      {/* ═══════════════════ 快速參考 ═══════════════════ */}
      <section id="reference" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">快速參考：全部 36 個秘密</h2>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-3">
            {[
              "你是創業家，你的職涯就是你的事業。", "人際關係比工作更重要。", "溝通是關鍵。", "除了你自己，沒有人對你的職涯負責。",
              "你必須建立和維持健康的界限。", "你的老闆不知道你在做什麼。", "你如何談論你的工作很重要。", "如果你沒有產生影響力，你不會看到進展。",
              "沒有人需要的技能毫無價值。", "別人在工作中如何看你，直接在你的掌控中。", "你的品牌會在你之前進入會議室，在你離開後很久才離開。", "人們喜歡和自己喜歡的人一起工作。",
              "只有想升遷但沒有計畫，12 個月後你會在原地不動。", "你老闆不知道的工作等於不存在。", "大多數關於你職涯的對話會在你不在場時進行。", "讓你進入高階管理層的是你的潛力，不是你的績效。",
              "建立你的領導力，不只讓你成功，也讓你的團隊成功。", "你的人脈必須超越你自己的團隊。", "沒有人脈你會失敗。", "幫助你的人會比你幫助的人更喜歡你。",
              "你表達不同意見的方式比你的意見更重要。", "根據對方調整你的溝通方式，能在衝突出現前就化解它。", "你不會總是如願。", "管理和領導不是同一回事。",
              "成功始於任務指派，而非完成。", "一個成功的員工造就一個成功的領導者。", "負面的模式比負面的人更有問題。", "你無法代替你的團隊。",
              "策略是必要的。", "管理你的心理負擔應該優先於管理你的工作量。", "有毒的工作環境對任何人都沒好處。", "從有毒工作環境中恢復需要時間。",
              "大多數人永遠不會成為高階主管。", "你職涯的正確路徑是你技能和興趣的自然對齊。", "只有你直屬主管的文化才重要。", "你僱用的領導者決定你的公司文化。",
            ].map((secret, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-3 flex items-start gap-2">
                <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-accent/15 text-accent text-xs font-bold flex-shrink-0 mt-0.5">{i + 1}</span>
                <p className="text-muted-foreground text-sm leading-snug">{secret}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ 資源 ═══════════════════ */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">其他資源</h2>
              <p className="text-cream/60">持續提升你的職涯</p>
            </div>
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">原書</h3>
            <p className="text-cream/80 text-sm italic mb-4">"Secrets of the Career Game: 36 Simple Strategies to Win in the Workplace" by Kendall Berg</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">推薦書目</h3>
            <ul className="space-y-1 text-cream/70 text-sm">
              <li>• <em>The Unspoken Truths for Career Success</em> by Tessa White</li>
              <li>• <em>The New Extraordinary Leader</em> by John Zenger and Joseph Folkman</li>
              <li>• <em>The Coaching Habit</em> by Michael Stanier</li>
              <li>• <em>Dare to Lead</em> by Brene Brown</li>
            </ul>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/office-politics-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">掌握辦公室政治</p>
              <span className="text-gold text-sm font-medium">辦公室政治指南 →</span>
            </Link>
            <Link to="/zh-tw/interview-prep-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">面試準備</p>
              <span className="text-gold text-sm font-medium">面試準備指南 →</span>
            </Link>
            <Link to="/zh-tw/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">薪資談判</p>
              <span className="text-gold text-sm font-medium">薪資入門工具包 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-xs italic text-center">本指南根據 Kendall Berg 的著作《Secrets of the Career Game: 36 Simple Strategies to Win in the Workplace》整理。所有框架概念、秘密和核心方法論歸功於 Kendall Berg。招募人員視角和觀點來自 James Bugden 15 年以上的招募經驗。</p>
        </div>
      </section>

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default CareerGameGuideZhTw;