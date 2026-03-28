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
import InlineRating from "@/components/feedback/InlineRating";

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
          <p className="text-muted-foreground leading-relaxed mb-4">所有的工作都可以歸類為三種。這個框架改變了我評估候選人的方式。</p>
          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "BAU（日常營運工作）", desc: "這是你的核心工作。職位說明書上列出的任務。做報表、管理系統、回覆需求。這是維持你職位的工作，但很少讓你升遷。BAU 的定義：核心職責、僅限於直屬團隊的工作、可重複或可訓練的任務、以及任何可以自動化的事情。" },
              { num: "2", title: "高影響力/高能見度工作", desc: "這是推動公司前進的工作。涉及多個團隊。符合公司策略。解決關鍵問題。而且成果可衡量。標準：推動組織前進、涉及三個以上的團隊、符合你的核心技能、解決關鍵問題、成果可衡量。" },
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

          <Collapsible title="範例：一位行銷分析師分類她的一週">
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-sm text-left">
                <thead><tr className="border-b border-border"><th className="py-2 pr-3 text-foreground font-semibold">任務</th><th className="py-2 pr-3 text-foreground font-semibold">類別</th><th className="py-2 text-foreground font-semibold">行動</th></tr></thead>
                <tbody className="text-muted-foreground">
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">拉出每週廣告報表</td><td className="py-2 pr-3">BAU</td><td className="py-2">自動化 → 建立儀表板</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">回答 12 個臨時數據需求</td><td className="py-2 pr-3">BAU</td><td className="py-2">整合 → 建立自助查詢工具</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">從報表建立主管摘要</td><td className="py-2 pr-3">BAU</td><td className="py-2">重新定位 → 「為管理層提供數據驅動決策」</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">帶領跨團隊歸因分析專案</td><td className="py-2 pr-3">高影響力</td><td className="py-2">保留 → 推動策略</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">向副總裁報告分析結果</td><td className="py-2 pr-3">高影響力</td><td className="py-2">保留 → 高能見度</td></tr>
                  <tr className="border-b border-border/50"><td className="py-2 pr-3">完成 Google Analytics 認證</td><td className="py-2 pr-3">自我發展</td><td className="py-2">保留 → 強化尖峰技能</td></tr>
                  <tr><td className="py-2 pr-3">組織團隊午餐學習會</td><td className="py-2 pr-3">自我發展</td><td className="py-2">保留 → 文化建設</td></tr>
                </tbody>
              </table>
            </div>
            <p className="text-muted-foreground text-xs mt-3"><strong className="text-foreground">之前：</strong>70% BAU / 20% 高影響力 / 10% 自我發展</p>
            <p className="text-muted-foreground text-xs"><strong className="text-foreground">之後：</strong>40% BAU / 40% 高影響力 / 20% 自我發展（同樣的時數，更好的分配）</p>
          </Collapsible>

          <p className="text-muted-foreground leading-relaxed mt-6 mb-8">如果你的工作高度技術性（工程師、科學家、開發人員），你的 BAU 比例會更高。這很正常。但目標仍然是盡量把時間轉移到高影響力的工作上。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 5：你必須建立和維持健康的界限</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">目標不是工作更多。也不是工作更努力。目標是更好地安排你的時間。這從界限開始。把它們寫下來。範例：週末不工作。準時下班，不留加班。一定要吃午飯。家人生病時不工作。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">當你的工作量超載時，用以下三步驟處理：</p>
          <div className="space-y-3 mb-4">
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">排序（Prioritize）：</p>
              <p className="text-muted-foreground text-sm">不要再說「好的，我來處理。」改說「我理解這是高優先事項。考慮到我手上的 A、B、C 任務，你同意我把 C 的優先順序降低來騰出空間嗎？」</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">整合（Bundle）：</p>
              <p className="text-muted-foreground text-sm">把重複的需求合併。如果你收到幾十個數據需求，建一個自助儀表板，而不是逐一回覆。</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">重新定位（Rebrand）：</p>
              <p className="text-muted-foreground text-sm">原本是「跑週報」的工作變成「透過自動化儀表板實現數據驅動的決策」。同樣的工作。不同的描述。更大的影響力。</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">書中分享了一個個人故事。作者有 12 個專案在週五截止，同一天是團隊活動日。她在辦公室裡哭，打算不去參加。她的老闆讓她坐下來，讓她列出每項任務。然後劃掉三項、圈出兩項在活動前完成，其餘分散到接下來兩週。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">他的回應：「我真希望早點知道你在做這麼多不同的任務。我本來能把一些分配給其他人。」這直接帶出下一個秘密。</p>

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
          <p className="text-muted-foreground leading-relaxed mt-6">你已經知道工作的類型。你知道如何談論它們。現在你需要找出你最擅長什麼，確保你的公司需要它。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">看看 Steve。優秀的數據技能。好的聲譽。但他很少被選入高影響力的專案。他被稱為「那個做數據的人」，而不是一個交付成果的人。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">當作者把他放到她的團隊時，她請每個人提出組織裡哪裡出了問題的想法。Steve 提出了一個出色的方案。她把專案分配給他。Steve 和各利害關係人群組合作，建立了框架，快速迭代，並和業務夥伴驗證結果。這個專案為公司節省了數百萬元的成本，並推動了超過 30% 的效率提升。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Steve 第一次不再只是那個做數據的人。他成為了交付影響力的人。重點：把工作做好是不夠的。你需要推動可衡量的影響力。然後你需要確保對的人知道這件事。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 9：沒有人需要的技能毫無價值</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">這裡有一個我很喜歡的問題：「如果一棵樹在森林裡倒了，周圍沒有人，有誰會在乎？」如果你有一項技能但身邊沒有人需要它，它不會幫你升遷。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">作者在混亂的環境中表現最好。結構讓她無聊。她在事情一團亂、沒人知道該怎麼辦的時候最能發揮價值。她選擇正在大改組、混亂或快速變化的公司。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">書中分享了一個技能錯配的故事。作者離開了一個類似新創的文化，去了一家「金字招牌」公司，一個人人都認得的名字。她拒絕了一家小公司的財務長職位，選擇了這家大公司的副總裁角色。結果完全不合適。公司官僚、行動緩慢、抗拒創新。領導層把她的天生優勢當成問題。她的成果導向被視為急躁。她的社交被說成不恰當。這段經歷讓她學到的企業政治比整個職涯其餘時間加起來還多。但她很痛苦。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">結論：把你的優勢帶到最需要的地方。不要強迫自己進入一個不重視你所帶來的價值的環境。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">自我評估</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">以下是一個 20 項技能評分練習。每項技能自評 1-10 分（10 = 你比任何人都強，1 = 從未展現過）。然後讓三個人幫你評分：你的老闆、一位同事和一位利害關係人。將分數平均後排名。</p>
          <Collapsible title="20 項技能清單">
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm mt-3">
              {["高度正直/誠實", "技術/專業經驗", "解決問題/分析問題", "創新", "學習敏捷度/自我發展", "追求結果", "設定挑戰性目標", "主動積極", "有力的溝通", "激勵/激發他人", "建立關係", "協作和團隊合作", "策略思維", "推動變革", "客戶和外部導向", "培養他人", "堅強的道德品格", "決策力", "冒險精神", "重視多元化"].map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ol>
          </Collapsible>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">你的「尖峰技能」是比其他分數高出 1-2 分的技能。這些是你的差異化因素。讓你從普通變成卓越的領域。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">作者的尖峰技能範例：解決問題、追求結果、推動變革。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">有兩項技能需要特別注意，無論它們落在哪裡：溝通和協作。如果其中任何一項落在你的最低四名，先修這些。如果人們不想和你共事，其他什麼都不重要。</p>
          <InfoBox title="我的看法" variant="gold"><p>當我評估候選人時，我找的是尖峰技能。我不想要一個「什麼都還可以」的人。我要一個在兩三件事上出類拔萃的人。告訴我你有什麼不同。如果你說不出來，我會轉向能說出來的人。</p></InfoBox>
          <p className="text-muted-foreground leading-relaxed mt-4">你找到了你的尖峰技能。現在你需要把它們包裝成一個品牌，讓人記住、重複、在你不在場時替你代言。</p>
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
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-6">
            <p className="text-foreground text-sm font-medium mb-2">使命範例：</p>
            <p className="text-foreground text-sm italic">「我想幫助公司解決複雜問題、推動效率改善，同時培養下一代領導者。」</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 10：別人在工作中如何看你，直接在你的掌控中</h3>
          <InfoBox title="我的看法" variant="gold"><p>我不完全同意這一條。你無法控制別人怎麼看你。人們帶著自己的偏見、情緒和假設進入每一次互動。但這個想法的精神是對的。即使你無法控制結果，你也應該嘗試影響認知。如果你從不描述你的價值，別人會自己填空。這很少對你有利。</p></InfoBox>
          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">重要的是：把你的 11 清單和自我評估的尖峰技能做比較。你應該會看到重疊。重視生產力的人傾向在追求結果上得分較高。重視同理心的人傾向在正直和道德品格上得分較高。你的個人品牌應該和你現在的樣子一致。不是你想成為的樣子。目標不是創造一個和你大不相同的個人品牌。你要緊貼自己擅長的，然後變得卓越。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">有了 11 清單後，寫一到兩句的電梯簡報。背下來。到處使用。</p>
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
            <p className="text-foreground text-sm font-medium mb-2">書中的品牌宣言範例：</p>
            <p className="text-foreground text-sm italic">「我是你丟進公司黑洞裡的人。那個沒人知道發生什麼事的地方。我帶來組織、成果和清晰度，讓那個部分的業務能夠擴展。我以一個熱情的人才領導者的身份做這件事，專注於為公司培養下一代優秀的領導者。」</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">然後從你的使命宣言中挑出三到五個關鍵詞。把它們寫在桌上的便利貼上。把這些詞編織進每一次的自我介紹、專案啟動會議和績效討論中。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">隨著時間推移，會發生一件有力的事。這叫做回聲效應。當你持續一致地描述自己時，你周圍的人開始用同樣的語言來描述你。他們把你的品牌像回聲一樣傳遞給你和其他人。</p>
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
            <p className="text-foreground text-sm italic">「在過去十年裡管理過我的每個人都會說：『Kendall 很會交付成果，溝通很有效。我把她丟進沒人搞得懂的問題裡。』每一個人。大概用完全相同的措辭。」</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 11：你的品牌會在你之前進入會議室，在你離開後很久才離開</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">95% 關於你職涯、升遷和發展的對話，發生在你不在場的時候。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">書中分享了一個替團隊成員爭取升遷的故事。公司要求有一位高階主管擔任「贊助人」，一位副總裁或以上層級的人願意為候選人辯護。作者直到要交文件時才知道這個要求。然後發生了一件了不起的事。一位高階主管主動聯繫並提出擔任贊助人。接下來 24 小時內，又有四位副總裁主動提出。這位候選人的個人品牌走在他前面。各部門的領導者都願意替他說話。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">重點：你需要你的品牌在你永遠不會進入的會議室裡替你工作。做到這一點的方法是：一致的語言、一致的交付，以及一個聽過你的品牌且能確認的人脈網絡。</p>
          <InfoBox title="我的看法" variant="gold"><p>當用人主管告訴我「我需要一個很會某件事的人」，我腦中立刻浮現那些用這種方式描述自己的候選人。如果你從來沒有告訴我你有什麼不同，你不會被想到。你的品牌就是你的行銷。做得好，機會會找到你，而不是你找機會。</p></InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">冒牌者症候群：重新定義</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">書中有一段關於冒牌者症候群的觀點，是我在其他地方沒聽過的。冒牌者症候群不是缺乏信心。而是對自己學習新事物的能力缺乏信念。大多數人只在知道所有答案時才感到有信心。但信心應該是相信自己有能力搞清楚事情。你目前擁有的每一項技能，都曾經是從零開始學的。下一個也一樣。</p>
          <p className="text-muted-foreground leading-relaxed mb-2">當你沒有答案時，試試這些說法：</p>
          <div className="space-y-2 mb-4">
            <div className="bg-muted/30 border border-border rounded-lg p-3"><p className="text-foreground text-sm italic">「這是個好問題。我蠻確定答案是 X，但讓我確認一下再回覆你。」</p></div>
            <div className="bg-muted/30 border border-border rounded-lg p-3"><p className="text-foreground text-sm italic">「這是個有趣的觀點。讓我把利害關係人召集起來討論，我們會在週五前提供更新。」</p></div>
            <div className="bg-muted/30 border border-border rounded-lg p-3"><p className="text-foreground text-sm italic">「好問題。[同事 X]，你是這個領域的專家，你來回答好嗎？」</p></div>
          </div>
          <p className="text-muted-foreground leading-relaxed">你的品牌建立了。你的尖峰技能明確了。現在你需要了解升遷系統在關門後是怎麼運作的，這樣你才能停止空等，開始規劃。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">六項標準職能評估中有五項和軟實力相關。你的公司對你在協作、文化貢獻和與人共事方面的評分，高於對你技術能力的評分。這對任何一直專注於技術表現的人來說是一記警鐘。加班時數和培訓都不重要，如果你不能和人好好相處。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">對「我不想做作」這個反駁的回應：這不是關於拍馬屁。這是關於把溝通、交付和個性當成你需要發展的技能，就像其他任何技能一樣。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 13：只有想升遷但沒有計畫，12 個月後你會在原地不動</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">獲得升遷的人是那些主動要求、有計畫、建立自己支持資源的人。他們不會走進年終考核時期待驚喜。</p>
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">職能練習：</strong>拿到你角色的職能框架。按職級給自己每項職能打分。然後給你的老闆一張空白表格，請他們也給你打分。</p>
          <div className="space-y-3 mb-6">
            {[
              { scenario: "你的老闆給你的分數比你自己打的高。", action: "你應該開始有針對性地討論升遷。是什麼阻礙了？時間表？預算？直接問。" },
              { scenario: "你的老闆給你的分數比你低。", action: "了解差距在哪裡。請求具體的例子。制定一個在未來 6-12 個月內縮小差距的計畫。" },
              { scenario: "分數大致吻合。", action: "你們是同步的。現在問：「你需要什麼條件才會在下一個週期替我爭取升遷？」" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">情境 {i + 1}：{item.scenario}</p>
                <p className="text-muted-foreground text-sm">{item.action}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">學會「自誇」（重新定義：你是在彙報）</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">你不是在自誇。你是在彙報。想想你上一個工作日。你的老闆親眼見證了你多少百分比的工作？20%？50%？剩下的部分，你的老闆完全不知道你做了什麼或者需要多少努力。開始做一個成就追蹤表。每週更新。在一對一會議中用它把你的工作和業務成果連結起來。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 14：你老闆不知道的工作等於不存在</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">保護你的資產。當你犯了錯，帶著計畫去找你的老闆。不要藏起來希望它自己消失。</p>
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-6">
            <p className="text-foreground text-sm italic">「嗨。我想確保你知道昨天發出的報告中有一個小錯誤。我們已經解決了，會重新發送。未來，我們已經做了 X、Y、Z 來防止再次發生。想讓你知道。」</p>
            <p className="text-muted-foreground text-xs mt-2">這展現了解決問題、負責任和預防的能力。你的老闆從你這裡先聽到，而不是從一個生氣的利害關係人那裡。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 15：大多數關於你職涯的對話會在你不在場時進行</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">以下是大多數大公司背後發生的事情：</p>
          <div className="space-y-3 mb-4">
            {[
              { phase: "第一階段：績效考核", desc: "你和你的老闆根據職能給你打分。你在這裡有大約 80% 的控制權。" },
              { phase: "第二階段：升遷提報", desc: "如果你被提名升遷，你的文件會被送出。有些公司需要高階贊助人。有些需要「升遷包」。例如，Google 要求寫一份你的工作如何對應公司價值觀的報告，由一個不包括你老闆的小組審閱。你在這裡有大約 60% 的控制權。" },
              { phase: "第三階段：校準", desc: "領導者把所有考核帶到一個房間裡跨團隊比較。公司目標是鐘型曲線：70% 得分 3，10% 得分 1-2，20% 得分 4-5。如果太多人被評為 5，他們會把人往下調。如果你的分數在邊界上，房間裡認識你且高度評價你的人數，決定了你是留在原位還是被調降。" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.phase}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <InfoBox title="我的看法" variant="gold"><p>我去過這些房間。我看過有人因為房間裡沒人認識他們而被調降。我也看過有人因為三位領導者替他們說話而留在頂端。你的人脈不是可有可無的。它是你在那些你不在場的會議室裡的保險。</p></InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 16：讓你進入高階管理層的是你的潛力，不是你的績效</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">績效是關於你做現在的工作有多好。潛力是關於你能成長多高、多快。它們是不同的衡量標準，大多數公司在升遷決策中更看重潛力。</p>

          <NineBoxGrid />

          <div className="space-y-4 mt-6">
            {[
              { box: "第 1 格，招錯人：", desc: "低績效，低潛力。很快被管理出局或被解僱。" },
              { box: "第 4 格，拚命三郎：", desc: "交付能力強，但溝通和自我行銷差。他們每天拚命做，但幾乎得不到認可。主管利用他們分配更多工作，而不是投資他們的成長。" },
              { box: "第 5 格，工作馬：", desc: "工作做得很好，超越職責，但離開主管就無法運作。被告知「沒有你我們做不到」，但不被邀請參加領導會議或跨團隊專案。" },
              { box: "第 6 格，核心成員：", desc: "工作不錯，軟實力也不錯，會到中階管理層然後停滯。他們是維持事情運轉的穩定型選手。" },
              { box: "第 7 格，高潛力：", desc: "工作做得不錯，但溝通和軟實力比核心績效更出色。經常被拉入高能見度的專案。" },
              { box: "第 8 格，高績效者：", desc: "你在每場會議中都會看到的專家。處理龐大的工作量，水準高，軟實力強。每 3-4 年升遷一次。" },
              { box: "第 9 格，明星：", desc: "人口的 1-5%。優秀的軟實力，快速晉升，高品質的工作，天生擅長這場遊戲。如果你在這個群體裡，你知道的。" },
            ].map((item, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">{item.box}</strong> {item.desc}</p>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">公司通常不會告訴你你在哪一格。但你應該能根據你收到的回饋感受到。</p>

          <Collapsible title="你現在在哪一格？快速自我檢測">
            <div className="space-y-3 mt-3">
              {[
                { q: "你聽到「工作做得好」但從不升遷？", a: "第 4 或 5 格（拚命三郎或工作馬）。你的軟實力需要加強。" },
                { q: "人們喜歡和你合作但質疑你的產出？", a: "第 2 或 7 格（進退兩難或高潛力）。你的交付需要加強。" },
                { q: "你得到不錯的考核、好的回饋，但覺得卡住了？", a: "第 6 格（核心成員）。你需要決定是否想要更多，然後制定計畫。" },
                { q: "你被拉入高能見度的專案，每 3-4 年升一次？", a: "第 8 格（高績效者）。繼續你正在做的。" },
                { q: "每個人都搶著和你合作，你正在快速晉升？", a: "第 9 格（明星）。你已經掌握了這場遊戲。" },
              ].map((item, i) => (
                <div key={i} className="bg-background rounded-lg p-3">
                  <p className="text-foreground text-sm font-medium mb-1">{item.q}</p>
                  <p className="text-muted-foreground text-xs">→ {item.a}</p>
                </div>
              ))}
            </div>
          </Collapsible>

          <InfoBox title="我的看法" variant="gold">
            <p className="mt-2">當我招募領導角色時，我篩選的是潛力，不是績效。這個人會成長到下一個層級嗎？他們會帶團隊嗎？他們能處理模糊性嗎？我不在乎你是否每個星期四都跑出了完美的報表。我在乎的是你能不能走進一個坐滿資深領導者的房間，然後站穩腳跟。</p>
          </InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 17：建立你的領導力，不只讓你成功，也讓你的團隊成功</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">這是連接「知道你在哪裡」和「採取行動」之間的橋樑。你的個人技能讓你走到這裡。領導力技能讓你到達下一個層級。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">光是把工作做好、幫助團隊做好是不夠的。你需要持續成長和發展自己與你的人才，同時讓你的領導層了解這些工作。這讓你在職涯中走得更遠，也帶著你的團隊一起成長。</p>
          <p className="text-muted-foreground leading-relaxed">接下來三個部分涵蓋如何建立成長的基礎設施：你的人脈、你的衝突解決技能，以及你的管理方法。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">把你的人脈想成一棵樹。主幹是你的直屬領導鏈（你的老闆、他們的老闆，一路往上）。枝葉是你的橫向、斜向和跨組織關係。大多數人建立了強壯的主幹就停下來。但枝葉才是讓你脫穎而出並讓你獲得資源（機會、能見度、支持者）的關鍵。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">看看 Jim。任何職涯書籍中最優秀的社交高手。Jim 從來沒有投過履歷。當 Jim 在公司重組後發現自己陷入死胡同時，他沒有投遞申請。他舉辦和參加活動。他加入電子報和社群。他對任何可能認識他目標領域的人進行陌生開發。兩個月內，他的人脈擴展了十倍。他在目標產業的五家主要公司都有聯繫人。當正式找工作的時候，每個聯繫人都有潛在的機會。Jim 有了選擇權。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 19：沒有人脈你會失敗</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">為你組織中的 20-25 人按八個標準評分：關係強度、職級、對你晉升的風險、在組織中的權力、能給你曝光的能力、威嚇度、背書力、對你職涯的未來影響力。總分排名。移除比你高兩個以上層級的人（放到「目標」清單）。專注於你的前五位可接觸對象。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">在 30 天內安排咖啡聊天或指導會議。如果在你的公司文化中直接聯繫感覺不太合適，問你的老闆：「作為我持續成長的一部分，我正在擴展我的人脈。我注意到 [某人] 在 [某項技能] 方面非常出色。我很想和他們見面學習。你願意幫我介紹嗎？」</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 20：幫助你的人會比你幫助的人更喜歡你</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">這違反直覺，但有心理學作為依據。當有人幫助你時，他們把你視為自己的延伸。他們投資了你。推薦你就像推薦他們自己的判斷力。建議：在社交時，先尋求學習。不要先提供幫助。請他們教你。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">你和新聯繫人的第一次對話應該達到三件事：</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li>了解他們的個人和職業背景。找到共同點。</li>
            <li>找出他們擁有的一項你想發展的技能。真誠地讚美：「我注意到你在 [某方面] 非常出色，我很想向你學習一些技巧。」</li>
            <li>分享你的個人品牌。不是履歷摘要。是什麼讓你與眾不同和有價值。</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">導師關係的規則</h3>
          <div className="space-y-2 mb-6">
            {["不要抱怨你的老闆、管理層或同事。你的導師不是你的心理諮商師。", "準備好兩到三個導師能透過指導增加價值的話題。", "安排正式會議。放在行事曆上。這是一段專業關係。", "不要乞求工作。如果他們張貼了一個你感興趣的職位，在單獨的對話中詢問。"].map((rule, i) => (
              <div key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-muted-foreground text-sm">{rule}</span></div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">書中還提供了按導師技能領域（溝通、利害關係人管理、主管氣場、領導力）組織的具體對話提示。這些是你帶到下一次輔導會議的現成問題。</p>
          <p className="text-muted-foreground leading-relaxed">你的人脈在成長。你的關係在建立。現在到了這些關係被考驗的時候：意見分歧。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">意見分歧失控的三個原因：</p>
          <div className="space-y-3 mb-6">
            {[
              { title: "你的管理層不一定想要最直接的解決方案。", desc: "辦公室政治存在。你的解決方案可能需要和一個不願合作的團隊協作。或者管理層正在爭取更大的職權範圍，而你的方案不支持。" },
              { title: "你的管理層有你看不到的背景資訊。", desc: "你的解決方案可能解決了你的問題，但在其他地方造成問題。隧道視野讓你錯過了更大的圖景。" },
              { title: "你沒有帶人跟上你的思考過程。", desc: "天生的問題解決者會直接跳到解決方案。但如果你的解決方案比房間裡其他人的思考快了三步，人們不會跟上。" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{i + 1}. {item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">國王和專家</h3>
          <KingsVsSpecialists />
          <p className="text-muted-foreground leading-relaxed mt-4 mb-6">了解你面對的是哪種類型，能在衝突開始前就預防。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 22：根據對方調整你的溝通方式，能在衝突出現前就化解它</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">日本概念 nemawashi（根回し）：翻譯為「轉動根基」，意思是「決策在走廊上完成」。不要等到大型會議才第一次提出你的想法。做預先溝通。進行一對一的對話。在正式提案前建立共識。如果你的老闆第一次聽到你的想法是在一個有 20 個人的會議上，你成功的機會很低。先做預備工作。</p>

          <h3 className="font-heading text-lg text-foreground mb-3">衝突解決的五個工具</h3>
          <div className="space-y-3 mb-6">
            {[
              { tool: "大量提問。", desc: "把你的回饋包裝成問題。不要說「那行不通」，改說「你能幫我理解這如何和營運團隊的需求對齊嗎？」" },
              { tool: "先認可再回應。", desc: "當有人提出你不同意的方案時，先說「謝謝你提出這個」再解釋你的顧慮。這讓人感覺被包容而不是被碾壓。" },
              { tool: "表達不同意見但不說不。", desc: "說「我理解為什麼我們想這樣做，但我有一些顧慮...」分享顧慮而不是直接反對。" },
              { tool: "RASI 框架。", desc: "重述問題。提出釐清問題。陳述你的解決方案。讓其他人參與取得共識。" },
              { tool: "一切都是「可以」。", desc: "如果你有足夠的人力、時間或資金，沒有什麼是不可能的。不要說不，而是框定成本：「我們完全做得到。需要增加兩個人力，並把 Q3 時間線延後六週。你希望我把這些選項整理出來嗎？」" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{i + 1}. {item.tool}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-foreground mb-3">ARSE 電子郵件模板</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">用於和管理層或困難利害關係人溝通的框架（是的，這個縮寫是故意的）：</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "A", word: "認可", desc: "感謝他們聯繫你。如果他們是更高層級或外部人員，正式打招呼。" },
              { letter: "R", word: "重述", desc: "用你自己的話重複他們的問題。增加背景資訊以顯示你理解他們在問什麼。" },
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
          <p className="text-muted-foreground leading-relaxed mb-4">這就是 Amazon 的「不同意但承諾」做法。用上面的五個工具儘早分享你的顧慮。如果管理層仍然選擇不同的方向，放下它，努力讓專案成功。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">觸發因素也很重要。看看你「不想被知道的」五件事清單。這些同樣的特質就是在其他人身上觸發你的東西。當一個同事讓你抓狂時，很可能是因為他們展現了一個你在自己身上拒絕接受的特質。了解你的觸發因素可以讓你做好準備。</p>

          <Collapsible title="在你下次和困難同事互動之前，做這些事">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mt-3">
              <li><strong className="text-foreground">命名觸發因素。</strong>這個人身上什麼讓你困擾？是他們的懶惰？控制慾？無組織？要具體。</li>
              <li><strong className="text-foreground">對照你的 11 清單。</strong>這個特質是否在你「不想被知道的」清單上？如果是，你是把自己的標準投射到一個不共享這些標準的人身上。這是你要管理的問題，不是他們的。</li>
              <li><strong className="text-foreground">提前準備你的回應。</strong>寫下兩到三件你知道你在會議中會想說的話。然後用「先認可再回應」的方法重新寫。</li>
              <li><strong className="text-foreground">為這次互動設定個人界限。</strong>提前決定：「我不會打斷。我會在反應之前先問一個釐清的問題。我不會在還在生氣的時候發跟進郵件。」</li>
              <li><strong className="text-foreground">事後覆盤。</strong>你的觸發因素被觸發了嗎？你說了什麼？下次你會改變什麼？目標不是消除你的觸發因素。目標是阻止它們在當下控制你的行為。</li>
            </ol>
          </Collapsible>
          <p className="text-muted-foreground leading-relaxed mt-6">你學會了如何溝通、表達不同意見和解決衝突。職涯遊戲的下一步是大多數人面臨的最大技能跳躍：從個人貢獻者轉變為管理者。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">從資深經理到總監的跳躍是所有產業中最困難的之一。你必須學會領導，不只是管理。很多經理知道如何管理但不知道如何領導。這些人變成了微管理者。很多領導者不知道如何管理。這些人變成了隱形老闆。能兩者兼顧的人很少見。</p>
          <InfoBox title="我的看法" variant="gold"><p>我曾經僱了一位資深經理擔任團隊主管。技術能力強。面試表現出色。三個月內，半個團隊要求轉調。問題？他什麼都自己做。他重寫團隊的工作而不是指導他們。他參加每一場會議而不是授權。他作為個人貢獻者是高績效者，但他的管理技能為零。他的團隊覺得自己隱形了。現在當我招募管理職時，我問的第一個問題是：「告訴我你團隊裡你培養的一個人。」如果答案含糊，這告訴我一切。</p></InfoBox>

          <SkillMaturityLadder />

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">有效管理的三大支柱</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">有效管理只需要三件事：</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-4">
            <li>為你的團隊設定清楚的期望</li>
            <li>定期的發展和專案完成檢視</li>
            <li>了解每個團隊成員的學習風格和目標</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mb-6">掌握這三件事，你就會比 90% 的經理更好。</p>

          <h3 className="font-heading text-lg text-foreground mb-3">CODS 工作指派框架</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "C", word: "背景", desc: "為什麼這項工作重要？你要回答什麼問題？什麼利害關係人提出的？" },
              { letter: "O", word: "產出", desc: "交付物長什麼樣子？樞紐分析表？儀表板？簡報？要具體，尤其對初階團隊成員。" },
              { letter: "D", word: "截止日期", desc: "初稿什麼時候交？最終版本？中間有什麼檢查點？" },
              { letter: "S", word: "資源", desc: "他們去哪裡獲取更多資訊？和誰合作？數據在哪？" },
            ].map((item) => (
              <div key={item.letter} className="bg-background border border-border rounded-xl p-4">
                <span className="text-gold font-bold text-lg">{item.letter}</span>
                <span className="text-foreground font-semibold text-sm ml-2">{item.word}</span>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 25：成功始於任務指派，而非完成</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">如果你在指派工作時就為團隊做好準備，你在後端修正的時間就會更少。</p>

          <Collapsible title="管理儀式 — 有效的節奏">
            <ul className="space-y-2 text-muted-foreground text-sm mt-3">
              <li>• <strong className="text-foreground">每兩週一對一：</strong>10 分鐘談優先事項，10 分鐘即時回饋，10 分鐘上報和障礙。</li>
              <li>• <strong className="text-foreground">交替進行的團隊會議</strong>分享更新、專案成功和背景資訊。</li>
              <li>• <strong className="text-foreground">一月</strong>和每個人進行目標設定。</li>
              <li>• <strong className="text-foreground">六月</strong>年中檢視進度和職涯對話。</li>
              <li>• <strong className="text-foreground">十月/十一月</strong>年終準備，確保沒有人對自己的評估感到驚訝。</li>
            </ul>
          </Collapsible>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 26：一個成功的員工造就一個成功的領導者</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">太多經理害怕和團隊分享功勞。他們擔心員工會比自己看起來更好。這是本末倒置的。你的團隊做得越好，你看起來越好。你作為經理的目標應該是不斷取代自己。當你的團隊能在沒有你的情況下運作，你就能騰出時間做更具策略性、更高能見度的工作。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 27：負面的模式比負面的人更有問題</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">忘掉「問題員工」。專注於問題模式。就像醫生透過症狀診斷疾病一樣，經理應該找出根本原因的模式並加以治療。</p>
          <Collapsible title="常見的負面模式">
            <ul className="space-y-2 text-muted-foreground text-sm mt-3">
              <li>• <strong className="text-foreground">注意力不足：</strong>小錯誤、錯字、CC 錯人、錯過小截止日期。</li>
              <li>• <strong className="text-foreground">缺乏主動性：</strong>等待一步一步的指示，BAU 做得好但面對新工作就掙扎。</li>
              <li>• <strong className="text-foreground">組織能力差：</strong>沒有文件、溝通散亂、計畫沒有後續。</li>
              <li>• <strong className="text-foreground">溝通和執行風範薄弱：</strong>工作做得好但無法表達，在領導面前害羞。</li>
              <li>• <strong className="text-foreground">拒絕授權：</strong>什麼都自己做，不信任團隊。</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3">管理模式，而不是個人。持續對「授權」給予回饋，而不是給出一堆他們不知道怎麼修的零散抱怨。</p>
          </Collapsible>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">秘密 28：你無法代替你的團隊</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">建立團隊的三條規則：</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li>不要害怕管理低績效者出局。設定期望，給時間交付，清楚溝通。如果他們沒有改善，他們需要走。</li>
            <li>招聘時，先看態度、工作倫理和文化契合度。技術能力其次。有好基礎的努力工作者可以被教會大多數技能。</li>
            <li>授權。如果你什麼都自己做，你的團隊成長不了，你也是。</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 29：策略是必要的</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">建立策略的兩個工具：</p>
          <div className="space-y-3">
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">1. 願景問題：</p>
              <p className="text-muted-foreground text-sm">「如果我有無限的資金和資源，我會怎麼管理我的團隊？」然後回到現實，從今天的狀態到那個未來狀態建立一個路線圖。</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">2. 三的法則：</p>
              <p className="text-muted-foreground text-sm">把你的目標組織成三個類別。超過三個會讓人不知所措。少於三個看起來你沒有認真思考。三是人們在一次會議中能消化的理想數字。</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mt-6">你有了管理方法。但如果你已經倦怠、困在有毒的環境中，或被太多責任壓得喘不過氣，這些都不管用。讓我們處理這些。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">心理負擔，而非工作時數，才是倦怠的真正預測指標。一個每週工作 30-35 小時的人，如果他們扛著整個團隊的規劃、跟進和品質控制，心理負擔可能很高。一個每週工作 50 小時但有明確定義、可重複範圍的人，心理負擔可能很低。</p>
          <h4 className="text-foreground font-semibold text-sm mb-3">降低心理負擔的六個策略：</h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li><strong className="text-foreground">清單和路線圖。</strong>把大專案拆成小任務。指定到具體日期。</li>
            <li><strong className="text-foreground">日程區塊化。</strong>某些類型的工作放在某些天。例如：週一和週五下午用來趕進度，週二做簡報，週日做內容創作。</li>
            <li><strong className="text-foreground">優先順序權衡。</strong>帶著準備好的優先事項清單找你的老闆。問哪些最重要。放下被降級的事項。</li>
            <li><strong className="text-foreground">全面授權。</strong>不只是交出一項任務，而是交出所有權。如果你授權了但一直被拉回來，它不會減少你的負擔。</li>
            <li><strong className="text-foreground">制定策略。</strong>當你有一個經過老闆批准的清楚路線圖時，更容易拒絕不符合的新要求。</li>
            <li><strong className="text-foreground">給經理：</strong>如果完整的多年路線圖會讓你的團隊對尚未存在的未來工作感到壓力，不要分享它。專注於未來一到兩年。</li>
          </ol>

          <h3 className="font-heading text-lg text-foreground mb-3">用選項向上管理</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">管理老闆的最佳方式是減輕他們的心理負擔。預先做好思考。要求加薪時：研究市場行情，製作簡報，列出你的價值和你的請求。爭取升遷時：製作一頁紙展示你在下一個層級的職責範圍和你已經展現的職能。提出方案時：在一張投影片上呈現三個選項，讓他們能快速做出決定。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 31：有毒的工作環境對任何人都沒好處</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">以下是識別有毒工作環境的檢查清單：</p>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-6">
            <ul className="space-y-2">
              {["你在週日晚上就開始恐懼週一早上。", "你因為害怕被責罵而不敢問問題。", "你覺得被歧視。", "你不信任你的老闆會支持你。", "無償的極端加班、言語虐待或不當關係是常態。", "你請假只是為了從工作中恢復。"].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" /><span className="text-muted-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-foreground text-sm font-medium mt-4">如果以上任何一項與你相符，建議很直接：辭掉工作。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 32：從有毒工作環境中恢復需要時間</h3>
          <p className="text-muted-foreground leading-relaxed">就像從一段糟糕的感情中恢復一樣，離開有毒環境後你需要時間重建。回到你的尖峰技能和 11 清單。重新認識自己，不要讓過去的毒性影響你的自我認知。重新寫你的品牌宣言，開始再次把它融入對話中。</p>
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
          <p className="text-muted-foreground leading-relaxed mb-4">這不是殘忍。這是務實的。高階領導所需的技能都可以學習，但大多數人不願意投入所需的時間和不適感。作者在 30 歲前就收到了財務長的職位邀約。她拒絕了。她的目標改變了。她不再想要長時間工作。她的問題解決技能在營運方面比金融更有影響力。財務長的角色不再與她是誰相符。</p>
          <h4 className="text-foreground font-semibold text-sm mb-3">高階領導的五項不可妥協的技能：</h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li><strong className="text-foreground">公眾演說。</strong>你必須定期向大群人做報告。沒有例外。</li>
            <li><strong className="text-foreground">堅強的道德品格。</strong>信任是基礎。沒有它，其他一切都不行。</li>
            <li><strong className="text-foreground">策略。</strong>看到公司目前運營方式之外的東西。把願景和可執行的目標連結起來。</li>
            <li><strong className="text-foreground">處理人際衝突的能力。</strong>你越往上走，情況越複雜。更多的人、更多的意見、更多的資源利害關係。</li>
            <li><strong className="text-foreground">堅定不移的自信。</strong>相信你的決定，並在出錯時做好為它們辯護的準備。</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 34：你職涯的正確路徑是你技能和興趣的自然對齊</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">注意「意外的職涯」——不帶意圖地接受任何出現的機會。但典型的職涯建議也需要翻轉。它不總是一條直線往上的梯子。它是一個職涯格子，往上、往旁邊、斜向移動。書中描述的最成功的人在多個部門、產業和職級擔任過職位。他們跟隨自己的技能進入任何能產生最大影響力的角色。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 35：只有你直屬主管的文化才重要</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">有一個概念叫「幽靈文化」。這是執行長認為存在的文化。印在海報上的、貼在網站上的、在面試中引用的。現實是：大多數員工體驗到的是他們直屬團隊和主管的次文化。更廣泛的公司文化可能存在於頂層，但很少能一致地向下傳遞。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">評估文化的有力面試問題：</p>
          <div className="space-y-2 mb-4">
            {[
              "「你們如何給予建設性回饋？」",
              "「組織多久允許一次晉升對話？」",
              "「這個團隊的成員平均任期多長？」",
              "「你最不喜歡公司和這個團隊的什麼？」",
            ].map((q, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-3">
                <p className="text-foreground text-sm italic">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">最強的建議：要求和團隊中的一位同事交談。如果公司拒絕，這是一個嚴重的紅旗。</p>

          <h3 className="font-heading text-xl text-foreground mb-3">秘密 36：你僱用的領導者決定你的公司文化</h3>
          <p className="text-muted-foreground leading-relaxed">最後一個秘密直接對領導者說。一個錯誤的招聘會毒害團隊的文化。一個糟糕的經理會創造一個難以扭轉的有毒次文化。隨著你的晉升，你組織的文化取決於你引進的領導者。以價值觀對齊為標準招聘。以文化契合度為標準招聘。技術技能教得會。價值觀教不會。</p>
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
                { label: "完成 20 項技能自我評估（自評 1-10 分）。找到你的尖峰技能。", href: "#spikes" },
                { label: "追蹤 5 天的所有工作。標記：BAU / 高影響力 / 自我發展。計算百分比，對照 40/40/20 目標。", href: "#work" },
                { label: "寫你的 11 清單（5 想被知道 / 5 不想 / 1 使命）。", href: "#brand" },
                { label: "開始使用成就追蹤表。", href: "#promotion" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 2 步：做一次現實檢驗（30 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step2_zh" lang="zh" items={[
                { label: "給老闆一張空白職能表。請他們為你評分。比較分數。找出差距。寫行動計畫。" },
                { label: "讓 3 個人做 20 項技能評估。平均結果。", href: "#spikes" },
                { label: "問：「你需要什麼條件才會替我爭取升遷？」", href: "#promotion" },
                { label: "如果還沒有，安排每兩週一次一對一會議。" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 3 步：建立你的品牌（60 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step3_zh" lang="zh" items={[
                { label: "寫你的 2 句電梯簡報。背下來。", href: "#brand" },
                { label: "挑 3-5 個品牌關鍵詞。寫在便利貼上。" },
                { label: "在 5 場以上的會議或對話中使用品牌語言。", href: "#brand" },
                { label: "找出 1 項 BAU 任務來整合、重新定位或自動化。", href: "#work" },
                { label: "更新成就追蹤表（應該有 8 項以上）。" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 4 步：擴展你的人脈（90 天內）</h3>
              <InteractiveChecklist guideKey="career_game_step4_zh" lang="zh" items={[
                { label: "建立 20-25 人的影響力名單。用八個標準評分。", href: "#network" },
                { label: "和你的前五名可接觸聯繫人安排咖啡聊天。" },
                { label: "為每次會議準備兩到三個指導話題。請求學習，不是推銷。" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 5 步：建立升遷基礎設施（持續）</h3>
              <InteractiveChecklist guideKey="career_game_step5_zh" lang="zh" items={[
                { label: "開始使用成就追蹤表。每週更新。", href: "#promotion" },
                { label: "安排每兩週一對一會議（如果還沒有的話）。用 10/10/10 結構：彙報、上報、爭取。", href: "#promotion" },
                { label: "找出一項 BAU 任務，這個季度可以整合、重新定位或自動化為高影響力工作。", href: "#work" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">第 6 步：每 90 天檢視自己</h3>
              <InteractiveChecklist guideKey="career_game_step6_zh" lang="zh" items={[
                { label: "每週更新成就追蹤表。" },
                { label: "在一對一中分享成績（10/10/10 結構）。", href: "#promotion" },
                { label: "每季重新聯繫 1 位淡出的人脈。", href: "#network" },
                { label: "重新和老闆做職能比較。", href: "#spikes" },
                { label: "檢視並更新你的 11 清單和電梯簡報。", href: "#brand" },
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

      <InlineRating contentId="guide_career_game_zhtw" locale="zh-tw" />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default CareerGameGuideZhTw;
