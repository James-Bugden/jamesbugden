import { Clock, Linkedin, ChevronDown, Menu, Heart, Zap, Users, Shield, Gauge, Target, AlertTriangle, ArrowRight, Lightbulb, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import { useState, useEffect } from "react";
import { InteractiveCareerMap, InteractiveScorecard, InteractivePulseCheck } from "@/components/ikigai/InteractiveWidgets";

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

const InfoBox = ({ title, children, variant = "default" }: { title: string; children: React.ReactNode; variant?: "default" | "gold" | "green" }) => (
  <div className={`rounded-xl p-5 md:p-6 ${
    variant === "gold" ? "bg-card border border-gold/30" :
    variant === "green" ? "bg-executive-green" :
    "bg-card border border-border"
  }`}>
    <h4 className={`font-semibold mb-2 ${variant === "green" ? "text-gold" : variant === "gold" ? "text-gold" : "text-foreground"}`}>{title}</h4>
    <div className={`text-sm leading-relaxed ${variant === "green" ? "text-cream/90" : "text-muted-foreground"}`}>{children}</div>
  </div>
);

const tocSections = [
  { id: "why-useful", label: "為什麼有用" },
  { id: "what-is-ikigai", label: "什麼是 Ikigai？" },
  { id: "five-pillars", label: "5 大支柱" },
  { id: "pillar-1", label: "支柱 1：使命感" },
  { id: "pillar-2", label: "支柱 2：心流" },
  { id: "pillar-3", label: "支柱 3：社群" },
  { id: "pillar-4", label: "支柱 4：韌性" },
  { id: "pillar-5", label: "支柱 5：節奏" },
  { id: "scorecard", label: "評分卡" },
  { id: "what-if-stuck", label: "卡住怎麼辦？" },
  { id: "common-mistakes", label: "常見錯誤" },
  { id: "quick-reference", label: "快速參考" },
  { id: "action-plan", label: "行動計畫" },
  { id: "resources", label: "資源" },
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
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">目錄</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
            >{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button onClick={() => setOpen(!open)} className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform" aria-label="目錄">
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">目錄</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >{label}</a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const IkigaiDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">Ikigai 的四個圓圈</h4>
    <div className="relative w-full max-w-[440px] mx-auto" style={{ aspectRatio: "1" }}>
      <div className="absolute rounded-full border-2 border-pink-400/50 bg-pink-400/10"
        style={{ width: "55%", height: "55%", top: "2%", left: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-pink-500 dark:text-pink-400 text-center leading-tight" style={{ top: "18%", left: "20%" }}>你熱愛<br/>的事</span>
      </div>
      <div className="absolute rounded-full border-2 border-blue-400/50 bg-blue-400/10"
        style={{ width: "55%", height: "55%", top: "2%", right: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-blue-500 dark:text-blue-400 text-center leading-tight" style={{ top: "18%", right: "18%" }}>你擅長<br/>的事</span>
      </div>
      <div className="absolute rounded-full border-2 border-emerald-400/50 bg-emerald-400/10"
        style={{ width: "55%", height: "55%", bottom: "2%", left: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-emerald-500 dark:text-emerald-400 text-center leading-tight" style={{ bottom: "18%", left: "16%" }}>世界需要<br/>的事</span>
      </div>
      <div className="absolute rounded-full border-2 border-amber-400/50 bg-amber-400/10"
        style={{ width: "55%", height: "55%", bottom: "2%", right: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-amber-500 dark:text-amber-400 text-center leading-tight" style={{ bottom: "18%", right: "12%" }}>能獲得<br/>報酬的事</span>
      </div>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ top: "22%", left: "50%", transform: "translateX(-50%)" }}>熱情</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ left: "10%", top: "50%", transform: "translateY(-50%)" }}>使命</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}>專業</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ bottom: "22%", left: "50%", transform: "translateX(-50%)" }}>天職</span>
      <div className="absolute rounded-full bg-gold/20 border-2 border-gold/60 flex items-center justify-center"
        style={{ width: "20%", height: "20%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <span className="text-xs md:text-sm font-bold text-gold">IKIGAI</span>
      </div>
    </div>
  </div>
);

const FlowSpectrum = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">心流光譜</h4>
    <div className="flex items-center gap-2">
      <div className="flex-1 text-center bg-muted/40 rounded-l-lg p-3 border border-border">
        <p className="text-foreground text-sm font-bold">太簡單</p>
        <p className="text-muted-foreground text-xs mt-1">→ 無聊</p>
      </div>
      <div className="flex-1 text-center bg-gold/10 rounded-lg p-3 border border-gold/30">
        <p className="text-gold text-sm font-bold">恰到好處</p>
        <p className="text-muted-foreground text-xs mt-1">→ 心流</p>
      </div>
      <div className="flex-1 text-center bg-muted/40 rounded-r-lg p-3 border border-border">
        <p className="text-foreground text-sm font-bold">太困難</p>
        <p className="text-muted-foreground text-xs mt-1">→ 焦慮</p>
      </div>
    </div>
  </div>
);

const AntifragilityDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">脆弱 → 韌性 → 反脆弱</h4>
    <div className="grid grid-cols-3 gap-3">
      {[
        { title: "脆弱", desc: "單一薪水、單一技能、沒有人脈", color: "bg-destructive/5 border-destructive/20" },
        { title: "韌性", desc: "儲蓄緩衝、穩定職涯、良好人脈", color: "bg-muted/40 border-border" },
        { title: "反脆弱", desc: "多元收入來源、多樣化技能、強大的模合、副業專案", color: "bg-gold/10 border-gold/30" },
      ].map((item) => (
        <div key={item.title} className={`rounded-lg p-3 border ${item.color}`}>
          <p className="text-foreground text-sm font-bold">{item.title}</p>
          <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const IkigaiGuideZhTw = () => {
  useTrackGuideProgress("ikigai-zh");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Ikigai：打造一份你不會在 12 個月內辭掉的職涯 | James Bugden"
        description="招募人員的使命感、心流與持久力完整指南。根據 Héctor García 的 Ikigai 改編。包含 Ikigai 職涯地圖、評分卡和 90 天行動計畫。"
        path="/zh-tw/ikigai-guide"
      />

      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            Ikigai：打造一份你不會在 12 個月內<br className="hidden sm:block" />辭掉的職涯
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-4">不燃燒殆盡。不砍掉重練。</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden，職涯教練 · Uber 資深招募人員</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">35 分鐘閱讀</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">根據《富足樂齡：IKIGAI，日本生活美學的長壽祕訣》Héctor García & Francesc Miralles 著</p>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      <TableOfContents />

      {/* How to Use */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            這份指南超過 8,000 字。你不需要一次讀完。根據你目前的狀況，直接跳到你需要的章節。
          </p>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">你現在處於什麼狀態？</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">01</span><span className="text-foreground text-sm"><strong>「我不知道自己想做什麼。」</strong> → 從<a href="#what-is-ikigai" className="text-gold underline underline-offset-2 hover:text-gold/80">什麼是 Ikigai？</a> + <a href="#pillar-1" className="text-gold underline underline-offset-2 hover:text-gold/80">支柱 1（使命感）</a>開始</span></li>
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">02</span><span className="text-foreground text-sm"><strong>「我有工作，但覺得卡住了、被掏空了。」</strong> → 從<a href="#pillar-2" className="text-gold underline underline-offset-2 hover:text-gold/80">支柱 2（心流）</a> + <a href="#pillar-5" className="text-gold underline underline-offset-2 hover:text-gold/80">支柱 5（節奏）</a>開始</span></li>
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">03</span><span className="text-foreground text-sm"><strong>「我正在找工作，快要撐不下去了。」</strong> → 從<a href="#mental-health" className="text-gold underline underline-offset-2 hover:text-gold/80">心理健康</a> + <a href="#pillar-3" className="text-gold underline underline-offset-2 hover:text-gold/80">支柱 3（社群）</a>開始</span></li>
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">04</span><span className="text-foreground text-sm"><strong>「我每份工作都做不到 12 個月就離職。」</strong> → 從頭到尾讀完。問題的模式就藏在裡面。</span></li>
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">05</span><span className="text-foreground text-sm"><strong>「我目前還好，想保持領先。」</strong> → 跳到<a href="#pillar-4" className="text-gold underline underline-offset-2 hover:text-gold/80">支柱 4（韌性）</a> + <a href="#scorecard" className="text-gold underline underline-offset-2 hover:text-gold/80">評分卡</a> + <a href="#action-plan" className="text-gold underline underline-offset-2 hover:text-gold/80">行動計畫</a></span></li>
              <li className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">06</span><span className="text-foreground text-sm"><strong>「我現在需要一件能立刻做的事。」</strong> → 跳到<a href="#action-plan" className="text-gold underline underline-offset-2 hover:text-gold/80">行動計畫</a></span></li>
            </ul>
          </div>
          <p className="text-muted-foreground leading-relaxed">讀你需要的。跳過你不需要的。其餘的之後再回來看。</p>
        </div>
      </section>

      {/* ═══════════════ WHY USEFUL ═══════════════ */}
      <section id="why-useful" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">這本書為什麼有用</h2>
              <p className="text-muted-foreground text-lg">招募人員眼中的 ikigai</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">十二個月。平均來說，一個不適任的員工大約在十二個月內離職或被淘汰。</p>
            <p className="text-muted-foreground leading-relaxed">我看過這個循環上百次。有人拿到錄取通知。薪水不錯。公司穩定。他們接受了。六個月後，興奮感消退。九個月後，午餐時間開始瀏覽求職網站。十二個月後，他們回到人力市場。</p>
            <p className="text-muted-foreground leading-relaxed">履歷更新。循環重新開始。</p>
            <p className="text-muted-foreground leading-relaxed">在審閱超過 20,000 份履歷、在 Uber 和 Netskope 等公司完成 500 次以上的錄用後，我開始問一個不同的問題。不是「怎麼填補這個職缺？」而是「為什麼有些人能建立十年的職涯，有些人每 12 個月就要重來？」</p>
            <p className="text-muted-foreground leading-relaxed">答案出現在一個意想不到的地方。一座全世界居民最長壽的日本島嶼。</p>
            <p className="text-muted-foreground leading-relaxed">日本沖繩的人均壽命是全球最長的。百歲人瑞的人口比例也是全球最高。研究他們的學者發現了令人意外的結論。祕密不是基因。祕密是使命感。</p>
            <p className="text-muted-foreground leading-relaxed">日本人把這種使命感稱為 <strong className="text-foreground">ikigai</strong>（生き甲斐）。這個詞的意思接近「保持忙碌的幸福」。在沖繩，沒有「退休」這個詞。人們持續做自己熱愛的事，直到生命的最後一天。</p>
            <p className="text-muted-foreground leading-relaxed">背後的研究橫跨沖繩的百歲人瑞、心理學（Viktor Frankl 的意義治療、Csikszentmihalyi 的心流理論），以及日本哲學（侘寂、森田療法、反脆弱）。核心論點：使命感讓人活得更久。使命感也讓職涯走得更遠。</p>
            <p className="text-muted-foreground leading-relaxed">這份指南把這些概念直接應用到你的職涯。所有內容都是為了幫你做出更好的職涯決定、在求職過程中保護你的心理健康，以及打造一份你不需要每 12 個月逃離的工作生活。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT IS IKIGAI ═══════════════ */}
      <section id="what-is-ikigai" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">什麼是 Ikigai？</h2>
              <p className="text-muted-foreground text-lg">概念與四個圓圈</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">在日文中，ikigai 寫作生き甲斐。它結合了「生」（生命）和「甲斐」（值得的）。</p>
            <p className="text-muted-foreground leading-relaxed">每個人都有自己的 ikigai。有些人已經找到了。有些人還在尋找。但每個人心裡都有一個。</p>
            <IkigaiDiagram />
            <p className="text-muted-foreground leading-relaxed">當你的工作位於四個圓圈的正中央，你就找到了 ikigai。</p>
            <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">你熱愛你的工作，但沒有人付錢給你做這件事：</strong>你有熱情，但沒有職涯。</p>
            <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">你擅長你的工作，薪水也不錯，但你感到空虛：</strong>你有一份舒適的工作，但沒有使命感。</p>
            <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">世界需要你的工作，但你討厭做這件事：</strong>你有一個使命，但你會燃燒殆盡。</p>
            <p className="text-muted-foreground leading-relaxed">甜蜜點在四個圓圈的交集處。找到這個甜蜜點的人，不會倒數退休的日子。他們會一直做下去。</p>

            <h3 className="font-heading text-xl text-foreground mt-8">這對你的職涯為什麼重要</h3>
            <p className="text-muted-foreground leading-relaxed">大宜味村是沖繩北部的一個村莊，人口約 3,000 人。它擁有金氏世界紀錄認證的最長壽社區。研究人員在那裡訪問了 100 位居民，大多數超過 80 歲，有些超過 100 歲。</p>
            <p className="text-muted-foreground leading-relaxed">沒有一個人閒著沒事做。每一位居民都有自己的菜園。他們唱卡拉 OK。他們打門球。他們走路去市場、拜訪朋友、為社區做志工。</p>
            <InfoBox title="居民的話" variant="gold">
              <p className="mb-2">「祕密是不要擔心。保持年輕的心。微笑，對人敞開心扉。」</p>
              <p>「工作。如果你不工作，你的身體會垮掉。」</p>
            </InfoBox>
            <p className="text-muted-foreground leading-relaxed">這些人從未停止工作。但他們也從未燃燒殆盡。差別在於他們為了什麼而工作。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ 5 PILLARS ═══════════════ */}
      <section id="five-pillars" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">持久職涯的 5 大支柱</h2>
              <p className="text-muted-foreground text-lg">總覽</p>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <div className="space-y-4">
              {[
                { num: "1", title: "使命感", desc: "知道你為什麼工作，不是在哪裡工作。", icon: Heart, anchor: "#pillar-1" },
                { num: "2", title: "心流", desc: "在工作中忘記時間的流逝。", icon: Zap, anchor: "#pillar-2" },
                { num: "3", title: "社群", desc: "建立你的模合。交真正的朋友。", icon: Users, anchor: "#pillar-3" },
                { num: "4", title: "韌性", desc: "從挫折中變得更強。", icon: Shield, anchor: "#pillar-4" },
                { num: "5", title: "永續節奏", desc: "用 80% 的力量工作。調整你的步調。", icon: Gauge, anchor: "#pillar-5" },
              ].map((pillar) => (
                <a key={pillar.num} href={pillar.anchor} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                  <span className="text-gold font-heading text-2xl font-bold w-8">{pillar.num}</span>
                  <pillar.icon className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold text-sm group-hover:text-gold transition-colors">{pillar.title}</p>
                    <p className="text-muted-foreground text-xs">{pillar.desc}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-muted-foreground text-xs text-center">基礎：你的 Ikigai</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed">這份指南接下來拆解每一個支柱，附帶你今天就做得到的練習，以及我十年招募經驗帶來的觀點。</p>
        </div>
      </section>

      {/* ═══════════════ PILLAR 1 ═══════════════ */}
      <section id="pillar-1" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">支柱 1：找到你的使命感</h2>
              <p className="text-muted-foreground text-lg">在下一次求職之前</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">大多數人開始找工作時，第一件事是更新履歷。錯誤的起點。</p>
            <p className="text-muted-foreground leading-relaxed">在你動履歷之前，先回答一個問題：「我為什麼工作？」</p>
            <p className="text-muted-foreground leading-relaxed">不是「我想在哪裡工作？」也不是「我想要什麼頭銜？」這些問題之後再說。第一個問題是關於使命感。如果你沒有清楚的答案，你會追著頭銜和薪水跑進同一個 12 個月的循環。</p>

            <h3 className="font-heading text-xl text-foreground mt-8">Ikigai 職涯地圖</h3>
            <p className="text-muted-foreground leading-relaxed">花 15 分鐘，填寫你目前職涯的四個面向。</p>
            <InteractiveCareerMap lang="zh" />
            <p className="text-muted-foreground leading-relaxed">「目前」這兩個字很重要。你的 ikigai 會隨著時間改變。使命感在人生的不同階段會轉變。重點不是找到一個永久的答案。重點是今天有一個方向。</p>

            <h3 className="font-heading text-xl text-foreground mt-8">當你感到卡住：先行動，後清晰</h3>
            <p className="text-muted-foreground leading-relaxed">日本治療師森田正馬圍繞這個問題建立了一整個治療學派。他的方法根植於禪宗佛學，和西方的思維完全相反。西方療法說：先修正你的想法，再修正你的感覺，然後採取行動。森田說的相反。先採取行動。你的感覺會跟上。</p>
            <InfoBox title="森田療法的三個原則" variant="default">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">1. 接受你的感受。</strong>如果你對職涯轉換感到焦慮，不要試圖「修復」這個焦慮。接受不適感。森田把負面思想比喻成一頭被繩子綁在柱子上的驢子。驢子越是掙扎，就越纏得越緊。</p>
                <p><strong className="text-foreground">2. 做你該做的事。</strong>停止分析。開始做下一步。投出申請。打那通電話。預約那場會議。行動本身會改變你的情緒狀態。</p>
                <p><strong className="text-foreground">3. 問「我現在該做什麼？」</strong>不是「我該有什麼感覺？」答案永遠是一個具體的下一步。</p>
              </div>
            </InfoBox>
            <p className="text-muted-foreground leading-relaxed">這和 Viktor Frankl 的意義治療相連。Frankl 是一位在奧斯威辛集中營倖存的精神科醫師。他發現在集中營裡，有目標的囚犯存活機率最高。戰後，Frankl 建立了一個核心理念的治療學派：有清楚使命感的人，幾乎能承受任何事。</p>
            <p className="text-muted-foreground leading-relaxed">教訓：有時候問題不是心理層面的。有時候你需要的是一份不同的工作。有時候你需要在清晰到來之前就採取行動。</p>

            <h3 id="mental-health" className="font-heading text-xl text-foreground mt-8 scroll-mt-24">求職過程中的心理健康</h3>
            <p className="text-muted-foreground leading-relaxed">求職是職業生涯中最消耗心力的經歷之一。拒絕是常態。沉默更糟。你開始質疑自己的價值、技能和職涯決定。</p>
            <p className="text-muted-foreground leading-relaxed">如果你現在正在找工作，記住這一點：情緒的起伏是正常的。感到迷茫、焦慮或挫折，不代表你有問題。這代表你是人。這些感受是訊號。它們在告訴你：你需要使命感和方向。</p>
            <InfoBox title="求職期間值得嘗試的四件事" variant="gold">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">建立每天的結構。</strong>大宜味村的百歲人瑞每天在同一時間起床。在求職期間也這樣做。設定一個時間表。早上 9 點到 12 點處理申請。午餐後運動。下午經營人脈。結構在一切都不確定時創造穩定。</p>
                <p><strong className="text-foreground">和人保持連結。</strong>孤立讓一切變得更糟。沖繩人生活在緊密的社群中，稱為模合（moai）。在求職期間，和人交談。喝杯咖啡。打個電話。加入一個群組。人與人的連結是對抗失業焦慮最有效的方式。</p>
                <p><strong className="text-foreground">用雙手做點什麼。</strong>大宜味村的每位百歲人瑞都有一個菜園。照顧某樣東西的實際行動，在更大的目標之間給他們使命感。找到你自己的版本。</p>
                <p><strong className="text-foreground">設定每天的小目標，而不是一個巨大的結果目標。</strong>「找到工作」是你無法控制的目標。「今天投出 3 份申請」是你完全能控制的目標。專注在你能掌握的行動上。</p>
              </div>
            </InfoBox>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 2 ═══════════════ */}
      <section id="pillar-2" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">支柱 2：在工作中找到心流</h2>
              <p className="text-muted-foreground text-lg">專注單一任務、匠人心態</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">Mihaly Csikszentmihalyi 是芝加哥大學的心理學家，研究人們完全沉浸在一個活動中時會發生什麼事。他把這個狀態稱為「心流」（flow）。</p>
            <p className="text-muted-foreground leading-relaxed">心流是一種完全沉浸在工作中、忘記時間流逝的體驗。你忘了吃飯。你不看手機。活動本身就是獎勵。</p>
            <p className="text-muted-foreground leading-relaxed">心流和 ikigai 直接相關。讓你進入心流狀態的活動，是通往 ikigai 的線索。如果你想找到使命感，先追蹤你在什麼時候忘記了時間。</p>

            <h3 className="font-heading text-xl text-foreground">進入心流的 7 個條件</h3>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <ol className="space-y-2">
                {["你知道要做什麼。", "你知道怎麼做。", "你知道自己做得好不好。", "你知道下一步往哪裡走。", "挑戰性夠高。", "你的能力匹配挑戰。", "你不受干擾。"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="text-gold font-bold text-sm">{i + 1}.</span><span className="text-muted-foreground text-sm">{item}</span></li>
                ))}
              </ol>
            </div>
            <FlowSpectrum />
            <p className="text-muted-foreground leading-relaxed">這就是為什麼在同一個職位待太多年，沒有新的挑戰，人們會開始感到不安。工作不再讓他們成長。心流消失了。</p>

            <h3 className="font-heading text-xl text-foreground">專注單一任務完勝多工。每一次都是。</h3>
            <p className="text-muted-foreground leading-relaxed">史丹佛大學研究了數百名經常多工的學生。結果：多工的學生在所有方面表現都更差。其他研究顯示，多工處理讓生產力下降 60%，智商降低超過 10 分。</p>
            <InfoBox title="在工作中專注單一任務的實際步驟" variant="default">
              <ul className="space-y-2 mt-2">
                <li className="text-sm">• 在專注工作時段關閉通知。</li>
                <li className="text-sm">• 試試番茄鐘工作法：25 分鐘專注工作，5 分鐘休息。</li>
                <li className="text-sm">• 在固定時間查看電子郵件。大多數職位一天兩次就夠了。</li>
                <li className="text-sm">• 起床後第一個小時和睡前最後一個小時不要看手機。</li>
                <li className="text-sm">• 如果你需要思考，去一個沒有 Wi-Fi 的地方。</li>
              </ul>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">匠人心態：精通一件事</h3>
            <p className="text-muted-foreground leading-relaxed">日本有匠人（takumi）的傳統。這些人把一生奉獻給一項技能的精進。</p>
            <p className="text-muted-foreground leading-relaxed">紀錄片《壽司之神》講述了類似的故事。小野二郎在東京一個地鐵站旁的小吧台做了超過 80 年的壽司。他的一位學徒花了好幾年學做一種玉子燒，才得到二郎的認可。</p>
            <p className="text-muted-foreground leading-relaxed">匠人的方法說：往深處走。把你的技能精通到無人能取代你。找到你的才能和市場需求的交集。然後更深入。</p>

            <h3 className="font-heading text-xl text-foreground">心流與你的心理健康</h3>
            <p className="text-muted-foreground leading-relaxed">當你處於心流狀態時，你不焦慮。你不在回想過去。你不在擔心未來。你在這裡。此刻。專注。</p>
            <p className="text-muted-foreground leading-relaxed">如果你目前的工作完全沒有心流，注意這個訊號。工作中完全沒有心流，代表有東西不對齊。你不需要明天就辭職。但開始追蹤：你的心流時刻正在指向你的 ikigai。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 3 ═══════════════ */}
      <section id="pillar-3" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">支柱 3：建立你的模合</h2>
              <p className="text-muted-foreground text-lg">你的職涯社群</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">在沖繩，人們組成緊密的團體，稱為<strong className="text-foreground">模合（moai）</strong>。模合是一個非正式的朋友圈，成員互相照顧。他們定期聚會、一起吃飯、玩遊戲，在困難時期互相支持。</p>
            <p className="text-muted-foreground leading-relaxed">但重點不是錢。重點是歸屬感。</p>
            <InfoBox title="居民的話" variant="gold">
              <p className="mb-2">「和朋友在一起是我最重要的 ikigai。我們都在這裡聚在一起聊天。我知道明天一定會再見到他們。」</p>
              <p>「每天和你愛的人說話。這就是長壽的祕密。」</p>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">你的職涯需要一個模合</h3>
            <p className="text-muted-foreground leading-relaxed">大多數求職者把人脈經營當成交易。這不是模合。這是披著專業外衣的絕望。</p>
            <p className="text-muted-foreground leading-relaxed">真正的職業模合是一群你在需要任何東西之前就開始投資的人。超過 70% 的職位是透過推薦和人脈填補的。你的模合是你的職涯保險。但保險只有在你多年持續存入後才會理賠。</p>

            <h3 className="font-heading text-xl text-foreground">在工作中交真正的朋友</h3>
            <div className="space-y-4">
              <InfoBox title="在工作中有真正朋友的人待得更久" variant="default"><p>蓋洛普的研究持續顯示，在工作中有好朋友是員工敬業度和留任率最強的預測指標之一。</p></InfoBox>
              <InfoBox title="在工作中有真正朋友的人表現更好" variant="default"><p>當你信任身邊的人，你溝通得更好，敢冒更多風險，解決問題更快。</p></InfoBox>
              <InfoBox title="在工作中有真正朋友的人更快樂" variant="default"><p>想想看：週一到一個喜歡同事的公司上班，和週一到一個不喜歡同事的公司上班，感覺差多少。</p></InfoBox>
            </div>

            <h3 className="font-heading text-xl text-foreground">如何在工作中建立模合</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">和人一起吃午餐。</strong>不是在你的辦公桌前。在桌子旁，和其他人一起。</p>
              <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">在別人開口之前幫忙。</strong>大宜味村的核心原則之一是結丸（yuimaaru），即團隊合作。</p>
              <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">做一個感興趣的人，而不是有趣的人。</strong>最好的人脈經營者會問問題。他們記住細節。</p>
              <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">離開後保持聯繫。</strong>當你換工作時，不要從你共事過的人的生活中消失。</p>
              <p className="text-muted-foreground leading-relaxed"><strong className="text-foreground">加入（或創建）一個群組。</strong>模合結構有效是因為定期、反覆的接觸。一致性比數量更重要。</p>
            </div>
            <p className="text-muted-foreground leading-relaxed">在順境時建立你的模合。逆境時你會需要這些人。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 4 ═══════════════ */}
      <section id="pillar-4" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">支柱 4：建立職涯韌性</h2>
              <p className="text-muted-foreground text-lg">侘寂與反脆弱</p>
            </div>
          </div>
          <div className="space-y-6">
            <h3 className="font-heading text-xl text-foreground">侘寂：你的職涯會不完美。沒關係。</h3>
            <p className="text-muted-foreground leading-relaxed">侘寂是一種日本哲學。它在不完美、不完整和無常中找到美。一個有裂痕的茶杯比完美的更美。一個有彎路的職涯比一條直線更有趣。</p>
            <p className="text-muted-foreground leading-relaxed">侘寂說：裂痕是美的一部分。你的職涯會有失敗。這些都不會浪費。每段經歷都為你的職涯增添質感。</p>

            <h3 className="font-heading text-xl text-foreground">一期一會：每個機會都是獨一無二的</h3>
            <p className="text-muted-foreground leading-relaxed">「這個時刻只存在於此刻，不會再來。」應用到你的職涯：每份工作、每場面試、每次和招募人員的對話都只發生一次。</p>

            <h3 className="font-heading text-xl text-foreground">斯多葛式韌性：控制你能控制的</h3>
            <p className="text-muted-foreground leading-relaxed italic border-l-2 border-gold pl-4">接受你無法改變的事物。有勇氣去改變你應該改變的事物。知道兩者之間的區別。</p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <InfoBox title="你能控制的事" variant="default">
                <ul className="space-y-1 mt-1">
                  <li className="text-sm">• 你的履歷品質</li>
                  <li className="text-sm">• 你投出多少申請</li>
                  <li className="text-sm">• 你如何準備面試</li>
                  <li className="text-sm">• 你如何跟進</li>
                </ul>
              </InfoBox>
              <InfoBox title="你無法控制的事" variant="default">
                <ul className="space-y-1 mt-1">
                  <li className="text-sm">• 公司凍結招募</li>
                  <li className="text-sm">• 招募人員的偏好</li>
                  <li className="text-sm">• 內部候選人</li>
                  <li className="text-sm">• 經濟變化</li>
                </ul>
              </InfoBox>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-4">反脆弱：從挫折中變得更強</h3>
            <AntifragilityDiagram />
            <InfoBox title="變得反脆弱的三個步驟" variant="gold">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">步驟 1：創造冗餘。</strong>不要依賴單一收入來源、單一技能或單一關係。發展第二項技能。開始一個副業專案。在多家公司和產業維持關係。</p>
                <p><strong className="text-foreground">步驟 2：進行許多小賭注。</strong>不要做一個大的職涯賭注，而是做幾個小的。每個小風險的下行有限，上行潛力大。</p>
                <p><strong className="text-foreground">步驟 3：消除脆弱性。</strong>問自己：什麼讓我脆弱？找出脆弱點，在它們斷裂之前處理。</p>
              </div>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">Ikigai 職涯韌性的 10 條法則</h3>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <ol className="space-y-3">
                {["保持活躍。不要停止學習、成長或貢獻。", "放慢你的職涯節奏。匆忙導致錯誤的決定。", "不要把盤子裝到 100%。留空間給休息、反思和恢復。", "在工作中圍繞好的人。你的模合是你職涯的根基。", "為下一個挑戰保持狀態。保持技能銳利，身體活動。", "微笑。態度決定別人如何記住你。", "離開你的辦公桌。大自然、休息和距離給你觀點。", "感恩。感恩改變你對即使是困難工作的體驗。", "活在當下。不要再為過去的職涯決定後悔。專注在今天。", "追隨你的 ikigai。你的內心有一個使命。如果你還沒找到，你的任務就是繼續尋找。"].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3"><span className="text-gold font-bold text-sm shrink-0">{i + 1}.</span><span className="text-muted-foreground text-sm">{rule}</span></li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 5 ═══════════════ */}
      <section id="pillar-5" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">支柱 5：不要燃燒殆盡</h2>
              <p className="text-muted-foreground text-lg">工作的腹八分原則</p>
            </div>
          </div>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">每餐之前，沖繩人會說「<strong className="text-foreground">腹八分</strong>」（hara hachi bu）。意思是「讓肚子填到八分滿就好」。</p>
            <p className="text-muted-foreground leading-relaxed">他們在吃飽之前就停止進食。這單一的習慣是他們長壽的最大原因之一。</p>

            <h3 className="font-heading text-xl text-foreground">為什麼倦怠比錯誤決定更快地摧毀職涯</h3>
            <p className="text-muted-foreground leading-relaxed">好員工離開好工作的第一大原因是倦怠。不是錢。不是頭銜。不是壞主管。是倦怠。</p>
            <p className="text-muted-foreground leading-relaxed">這個循環看起來是這樣的。你接受一個職位。你急於證明自己。你對所有事情都說好。十二個月後，你精疲力竭但硬撐著。二十四個月後，你離開了。</p>

            <h3 className="font-heading text-xl text-foreground">80% 法則應用到你的職涯</h3>
            <InfoBox title="80% 法則" variant="default">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">在你的日程中留出餘裕。</strong>不要從早上 8 點到下午 6 點連續排滿會議。留出思考、走動和恢復的間隔。</p>
                <p><strong className="text-foreground">更常說不。</strong>每個「好」都會從其他事情中拿走時間。不要過度承諾。</p>
                <p><strong className="text-foreground">在你需要之前就休息。</strong>不要等到精疲力竭才休息。把休息融入日常作息。</p>
                <p><strong className="text-foreground">保護你的睡眠。</strong>睡覺不是懶惰。睡覺是職涯維護。每晚 7-9 小時。</p>
              </div>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">5 分鐘每日回顧</h3>
            <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6">
              <h4 className="text-gold font-semibold mb-3">每天早上，問自己三個問題：</h4>
              <ol className="space-y-2">
                <li className="flex items-start gap-3"><span className="text-gold font-bold text-sm">1.</span><span className="text-foreground text-sm">今天我應該把最好的精力投入到哪一項任務？</span></li>
                <li className="flex items-start gap-3"><span className="text-gold font-bold text-sm">2.</span><span className="text-foreground text-sm">今天有什麼事情我應該說不（或推回）？</span></li>
                <li className="flex items-start gap-3"><span className="text-gold font-bold text-sm">3.</span><span className="text-foreground text-sm">我休息夠了嗎，還是在透支？</span></li>
              </ol>
              <p className="text-muted-foreground text-xs mt-4">三個問題。五分鐘。一年下來，這累積成超過 30 小時的有意識職涯管理。</p>
            </div>
            <InfoBox title="百歲人瑞的話" variant="gold">
              <p className="mb-2">「我長壽的祕密是總是對自己說，『慢下來』和『放鬆』。如果你不匆忙，你會活得更久。」</p>
              <p>「每天做很多不同的事情。一直保持忙碌，但一次只做一件事，不讓自己負擔過重。」</p>
            </InfoBox>
            <p className="text-muted-foreground leading-relaxed">職涯很漫長。調整節奏的人比衝刺的人走得更遠。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ SCORECARD ═══════════════ */}
      <section id="scorecard" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Ikigai 職涯評分卡</h2>
              <p className="text-muted-foreground text-lg">評估你目前的工作</p>
            </div>
          </div>
          <div className="space-y-6">
            <InteractiveScorecard lang="zh" />

            <h3 className="font-heading text-xl text-foreground">如何解讀你的分數</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { range: "80–100", label: "強烈的 ikigai 對齊", desc: "你的職涯狀態良好。維持你正在做的。", color: "bg-green-500/5 border-green-500/20", textColor: "text-green-400" },
                { range: "60–79", label: "謹慎前進", desc: "你的職涯有優勢但有缺口。看看哪些支柱得分最低。", color: "bg-gold/5 border-gold/20", textColor: "text-gold" },
                { range: "40–59", label: "是時候改變了", desc: "你的職涯有明顯的不對齊。找出最弱的支柱並制定計畫。", color: "bg-orange-500/5 border-orange-500/20", textColor: "text-orange-400" },
                { range: "40 以下", label: "你的 ikigai 缺失了", desc: "你的工作生活不可持續。開始規劃你的下一步。", color: "bg-destructive/5 border-destructive/20", textColor: "text-destructive" },
              ].map((tier) => (
                <div key={tier.range} className={`rounded-lg p-4 border ${tier.color}`}>
                  <p className={`${tier.textColor} text-sm font-bold mb-1`}>{tier.range}：{tier.label}</p>
                  <p className="text-muted-foreground text-xs">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT IF STUCK ═══════════════ */}
      <section id="what-if-stuck" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如果你毫無頭緒怎麼辦？</h2>
              <p className="text-muted-foreground text-lg">困難處境的務實建議</p>
            </div>
          </div>
          <div className="space-y-6">
            <Collapsible title="如果你卡在一份你討厭的工作裡">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">不要明天就辭職。但也不要把現狀當成永久的。設一個時間表。在這個職位上的時候，做 <a href="#pillar-1" className="text-gold underline underline-offset-2">Ikigai 職涯地圖</a>練習。</p>
              </div>
            </Collapsible>
            <Collapsible title="如果你失業了，現在需要收入">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">接受這份工作。付帳單。做一份生存型的工作沒有什麼好丟臉的。但要睜大眼睛。設一個 12 個月的時間表。風險在於你待太久，因為你停止了尋找。</p>
              </div>
            </Collapsible>
            <Collapsible title="如果你完全不知道自己想要什麼">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">追蹤你的能量兩週。每天工作結束時，寫下你感到投入的時刻和你感到被消耗的時刻。森田療法說：不要等到清晰才行動。行動，清晰會跟上。</p>
              </div>
            </Collapsible>
            <Collapsible title="如果你在評分卡上得分低於 40">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm"><a href="#scorecard" className="text-gold underline underline-offset-2">評分卡</a>上低於 40 分代表你目前的狀況不可持續。看看哪些支柱得分最低。不是每個低分都需要辭職。找出最弱的支柱，先從那裡著手。</p>
              </div>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMMON MISTAKES ═══════════════ */}
      <section id="common-mistakes" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">常見錯誤</h2>
              <p className="text-muted-foreground text-lg">500+ 次招募中看到的盲點</p>
            </div>
          </div>
          <div className="space-y-6">
            {[
              { title: "錯誤 1：只看錄取通知的條件，不看第一年。", desc: "人們花好幾週談判薪水、頭銜和到職日期。他們花零時間思考前 90 天會是什麼樣子。問用人主管：「6 個月後的成功標準是什麼？」" },
              { title: "錯誤 2：把好公司和好職位搞混。", desc: "知名公司裡有糟糕的團隊。沒聽過名字的新創公司裡有令人驚豔的團隊。評估職位、主管和團隊。不是品牌。" },
              { title: "錯誤 3：忽視面試中的訊號。", desc: "遲到的面試官。混亂的安排。充滿敵意的問題。面試是公司最好的表現。如果最好的表現已經很差，真實的情況只會更糟。" },
              { title: "錯誤 4：換工作但不改變模式。", desc: "如果你在三年內因為類似的原因離開了三份工作，下一份工作不會修復這個模式。用評分卡為每個支柱設定最低門檻。" },
              { title: "錯誤 5：等待完美的時機。", desc: "完美的時機不存在。森田療法在這裡適用：先行動，清晰會跟上。開始建立你的 ikigai 的最好時機是今天。" },
            ].map((mistake, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="text-foreground font-semibold text-sm mb-2">{mistake.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{mistake.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ QUICK REFERENCE ═══════════════ */}
      <section id="quick-reference" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">※</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">快速參考：Ikigai 職涯框架</h2>
            </div>
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-6">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">你的 Ikigai</h3>
            <p className="text-cream/80 text-sm mb-4">四者的交集：你熱愛的 + 你擅長的 + 世界需要的 + 你能獲得報酬的</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">持久職涯的 5 大支柱</h3>
            <ol className="space-y-2 mb-4">
              {["使命感：知道你的「為什麼」。用 Ikigai 職涯地圖找到交集。", "心流：做讓你沉浸其中的工作。追蹤你忘記時間的時刻。", "社群：建立你的模合。在工作中交真正的朋友。", "韌性：擁抱侘寂。建立反脆弱性。", "永續節奏：用 80% 工作。保護休息。調整節奏。"].map((item, i) => (
                <li key={i} className="text-cream/70 text-sm"><span className="text-gold font-bold mr-1">{i + 1}.</span> {item}</li>
              ))}
            </ol>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">關鍵練習</h3>
            <ul className="space-y-1">
              {["完成 Ikigai 職涯地圖（4 個圓圈）", "追蹤你的心流時刻一週", "找出你的模合（或開始建立一個）", "用 Ikigai 評分卡評估你目前的工作", "列出 3 件讓你脆弱的事。解決其中一件。"].map((item, i) => (
                <li key={i} className="flex items-start gap-2"><GoldCheckBadge /><span className="text-cream/70 text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ ACTION PLAN ═══════════════ */}
      <section id="action-plan" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">你的行動計畫</h2>
              <p className="text-muted-foreground text-lg">90 天路線圖與每週任務</p>
            </div>
          </div>
          <div className="space-y-8">
            {/* Right Now */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">立刻做（5 分鐘）</h3>
              <InteractivePulseCheck lang="zh" />
            </div>

            {/* Phase 1 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">第 1 階段：評估你的基線（第 1 週）</h3>
              <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
                {[
                  { day: "第 1-2 天", title: "Ikigai 職涯地圖", desc: "填完四個圓圈。找到交集。", link: "#pillar-1" },
                  { day: "第 3-5 天", title: "心流 + 消耗追蹤表", desc: "每天工作結束時，寫下心流和消耗的時刻。", link: "#pillar-2" },
                  { day: "第 6 天", title: "Ikigai 職涯評分卡", desc: "設定權重。評分每個支柱。計算。", link: "#scorecard" },
                  { day: "第 7 天", title: "回顧", desc: "哪個支柱得分最低？最大的差距在哪裡？" },
                ].map((item) => (
                  <div key={item.day} className="flex items-start gap-4">
                    <span className="text-gold text-xs font-bold uppercase shrink-0 w-20 pt-0.5">{item.day}</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">{item.title} {item.link && <a href={item.link} className="text-gold text-xs underline underline-offset-2">→ 完整工具</a>}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">第 2 階段：修復你最弱的支柱（第 2-4 週）</h3>
              <div className="space-y-3">
                {[
                  { pillar: "使命感", actions: ["和 3 個你好奇的職位或領域的人對話", "朝新方向採取一個小行動", "月底重新檢視你的 Ikigai 職涯地圖"], link: "#pillar-1" },
                  { pillar: "心流", actions: ["找出殺死你專注力的頭號干擾。移除它兩週。", "向你的主管要求一個挑戰性專案", "每天封鎖 2 小時做單一任務工作"], link: "#pillar-2" },
                  { pillar: "社群", actions: ["這週和同事一起吃午餐 3 次", "聯繫 2 位你失聯的前同事", "加入一個群組"], link: "#pillar-3" },
                  { pillar: "韌性", actions: ["列出 3 件讓你脆弱的事。選一件處理。", "開始一個副業專案或第二項技能", "書面回答：如果我明天失去這份工作？"], link: "#pillar-4" },
                  { pillar: "永續節奏", actions: ["開始 5 分鐘的每日回顧", "這週拒絕一項承諾", "設定工作的硬性截止時間。連續遵守 3 週。"], link: "#pillar-5" },
                ].map((item) => (
                  <Collapsible key={item.pillar} title={`如果${item.pillar}得分最低`}>
                    <div className="mt-2">
                      <p className="text-muted-foreground text-xs mb-2"><a href={item.link} className="text-gold underline underline-offset-2">這個支柱的練習 →</a></p>
                      <ul className="space-y-1">
                        {item.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2"><GoldCheckBadge /><span className="text-muted-foreground text-sm">{action}</span></li>
                        ))}
                      </ul>
                    </div>
                  </Collapsible>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mt-4 italic">一個支柱。三週。小步驟。</p>
            </div>

            {/* Phase 3 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">第 3 階段：建立系統（第 2-3 個月）</h3>
              <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
                {[
                  { freq: "每日（5 分鐘）", items: ["今天我的第一優先任務是什麼？", "我應該對什麼說不？", "我休息夠了，還是在透支？"] },
                  { freq: "每週（30 分鐘，每週五）", items: ["這週我在哪裡體驗到心流？", "我在哪裡感到被消耗？", "傳一則訊息給你的模合中的某個人"] },
                  { freq: "每月（1 小時，每月第一個週一）", items: ["重新做 Ikigai 職涯評分卡", "分數在上升、下降還是持平？", "找出下一個最弱的支柱做 30 天專注"] },
                  { freq: "每季（2 小時）", items: ["重新檢視 Ikigai 職涯地圖", "更新你的履歷（在你需要之前）", "反脆弱性檢查：我有冗餘嗎？"] },
                ].map((block) => (
                  <div key={block.freq}>
                    <p className="text-gold text-xs font-bold uppercase mb-2">{block.freq}</p>
                    <ul className="space-y-1">{block.items.map((item, i) => (<li key={i} className="text-muted-foreground text-sm">• {item}</li>))}</ul>
                  </div>
                ))}
              </div>
            </div>

            {/* 90-Day View */}
            <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6">
              <h4 className="text-gold font-semibold mb-4">完整 90 天時間表</h4>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { phase: "立刻做", desc: "5 分鐘", detail: "回答 3 個問題", result: "「我有了起始的訊號。」" },
                  { phase: "第 1 週", desc: "評估", detail: "Ikigai 地圖、心流追蹤、評分卡", result: "「我知道自己的位置。」" },
                  { phase: "第 2-4 週", desc: "行動", detail: "修復最弱的支柱", result: "「我正在進步。」" },
                  { phase: "第 2-3 個月", desc: "建立", detail: "每日回顧、每週檢視、每月重新評分", result: "「這是我管理職涯的方式。」" },
                ].map((item) => (
                  <div key={item.phase}>
                    <p className="text-gold text-xs font-bold">{item.phase}</p>
                    <p className="text-foreground text-sm font-medium mt-1">{item.desc}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.detail}</p>
                    <p className="text-foreground text-xs italic mt-2">{item.result}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs mt-4 text-center">然後重複。選擇下一個最弱的支柱。再做一輪 30 天的專注。重新評分。</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">90 天後，你和第 1 天的自己不一樣了。大宜味村的百歲人瑞每天早上都照顧他們的菜園。他們不會種一次就走開。用同樣的方式對待你的職涯。</p>
          </div>
        </div>
      </section>

      {/* ═══════════════ RESOURCES ═══════════════ */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">資源</h2>
              <p className="text-cream/60">繼續打造你的職涯</p>
            </div>
          </div>
          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">本書</h3>
            <p className="text-cream/80 text-sm italic mb-4">《富足樂齡：IKIGAI，日本生活美學的長壽祕訣》Héctor García & Francesc Miralles 著</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">其他引用</h3>
            <ul className="space-y-1 text-cream/70 text-sm">
              <li>• 《活出意義來》Viktor Frankl 著</li>
              <li>• 《心流》Mihaly Csikszentmihalyi 著</li>
              <li>• 《反脆弱》Nassim Nicholas Taleb 著</li>
              <li>• The Okinawa Program，Bradley Willcox 等著</li>
            </ul>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/career-game-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">升職攻略</p>
              <span className="text-gold text-sm font-medium">職涯遊戲指南 →</span>
            </Link>
            <Link to="/zh-tw/pivot-method-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">轉換職涯</p>
              <span className="text-gold text-sm font-medium">轉職方法論 →</span>
            </Link>
            <Link to="/zh-tw/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">談判薪資</p>
              <span className="text-gold text-sm font-medium">薪資談判入門 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-xs italic text-center">
            本指南根據 Héctor García 和 Francesc Miralles 的《富足樂齡：IKIGAI，日本生活美學的長壽祕訣》。招募人員觀點來自 James Bugden 超過 15 年的招募經驗。
          </p>
        </div>
      </section>

      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2026 James Bugden. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ThreadsIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default IkigaiGuideZhTw;
