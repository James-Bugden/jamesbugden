import { Clock, ChevronDown, Menu, AlertTriangle } from "lucide-react";
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

type TreeStepZh = "q1" | "q2" | "q3" | "q4" | "pathA" | "pathB" | "pathC" | "pathD" | "pathE";

const pathsZh: Record<string, { label: string; title: string; id: string }> = {
  pathA: { label: "路徑 A", title: "緊急修復", id: "path-a" },
  pathB: { label: "路徑 B", title: "對手管理", id: "path-b" },
  pathC: { label: "路徑 C", title: "能量重導", id: "path-c" },
  pathD: { label: "路徑 D", title: "目標清晰化", id: "path-d" },
  pathE: { label: "路徑 E", title: "建立政治影響力", id: "path-e" },
};

const DecisionTreeZh = () => {
  const [step, setStep] = useState<TreeStepZh>("q1");
  const [fade, setFade] = useState(true);

  const go = (next: TreeStepZh) => {
    setFade(false);
    setTimeout(() => { setStep(next); setFade(true); }, 200);
  };

  const QuestionCard = ({ question, hint, onYes, onNo }: { question: string; hint?: string; onYes: () => void; onNo: () => void }) => (
    <div className={`flex flex-col items-center gap-4 transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}>
      <div className="bg-executive-green text-cream text-sm font-semibold px-6 py-4 rounded-lg text-center max-w-sm leading-snug">
        {question}
      </div>
      {hint && <p className="text-muted-foreground text-xs text-center max-w-xs -mt-2">{hint}</p>}
      <div className="flex gap-3">
        <button onClick={onYes} className="px-6 py-2.5 rounded-lg text-sm font-bold bg-accent/15 border border-accent/30 text-accent hover:bg-accent/25 transition-colors">是</button>
        <button onClick={onNo} className="px-6 py-2.5 rounded-lg text-sm font-bold bg-muted border border-border text-muted-foreground hover:bg-muted/80 transition-colors">否</button>
      </div>
    </div>
  );

  const isResult = step.startsWith("path");
  const path = isResult ? pathsZh[step] : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-5">決策樹：找到你的起點</p>
      <div className="flex flex-col items-center min-h-[160px] justify-center">
        {step === "q1" && (
          <QuestionCard question="你現在有政治麻煩嗎？" hint="（老闆疏遠、任務被分給別人、HR 來找你）" onYes={() => go("q2")} onNo={() => go("q4")} />
        )}
        {step === "q2" && (
          <QuestionCard question="你是否被視為「問題人物」？" onYes={() => go("pathA")} onNo={() => go("q3")} />
        )}
        {step === "q3" && (
          <QuestionCard question="有人在阻擋你嗎？" onYes={() => go("pathB")} onNo={() => go("pathC")} />
        )}
        {step === "q4" && (
          <QuestionCard question="你知道你的職涯想要什麼嗎？" onYes={() => go("pathE")} onNo={() => go("pathD")} />
        )}
        {isResult && path && (
          <div className={`flex flex-col items-center gap-4 transition-opacity duration-200 ${fade ? "opacity-100" : "opacity-0"}`}>
            <div className="bg-accent/10 border border-accent/20 rounded-xl px-8 py-5 text-center">
              <p className="text-accent text-sm font-bold">{path.label}</p>
              <p className="text-foreground text-lg font-heading font-bold mt-1">{path.title}</p>
            </div>
            <div className="flex gap-3">
              <a href={`#${path.id}`} className="px-5 py-2 rounded-lg text-sm font-semibold bg-accent text-accent-foreground hover:bg-accent/90 transition-colors">
                前往{path.label} ↓
              </a>
              <button onClick={() => go("q1")} className="px-5 py-2 rounded-lg text-sm font-medium border border-border text-muted-foreground hover:bg-muted transition-colors">
                重新開始
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

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

const tocSections = [
  { id: "intro", label: "前言" },
  { id: "ofol", label: "01 · 5個組織事實" },
  { id: "wishes-goals", label: "02 · 願望 vs. 目標" },
  { id: "types", label: "03 · 4種政治類型" },
  { id: "leverage", label: "04 · 籌碼" },
  { id: "network", label: "05 · 盟友與對手" },
  { id: "games", label: "06 · 8種政治遊戲" },
  { id: "suicide", label: "07 · 政治自殺" },
  { id: "four-ps", label: "08 · 4個P" },
  { id: "influence", label: "09 · 影響力技能" },
  { id: "game-plan", label: "10 · 遊戲計劃" },
  { id: "cheat-sheet", label: "速查表" },
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

const OfficePoliticsGuideZhTw = () => {
  useTrackGuideProgress("office-politics-zh");

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/office-politics-guide", title: "辦公室政治指南｜職場技巧", description: "在跨國企業中閱讀和應對辦公室政治的實用指南。" })} />

      {/* Navigation */}
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
            職場政治：<br className="hidden sm:block" />如何在工作中得到你想要的
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">不搞小動作、不拍馬屁、不被開除</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden，職涯教練 · Uber 資深招募人員</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">閱讀時間 45 分鐘</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">根據 Marie G. McIntyre 博士的《Secrets to Winning at Office Politics》</p>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            讓我直說。有才華的人在工作中停滯不前的第一大原因不是能力。是政治。
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            我一次又一次看到同樣的模式：一個聰明、努力的人被忽略、被擠走、或卡住。不是因為他們缺乏能力。因為他們缺乏政治意識。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            大多數人聽到「職場政治」就會想到暗箭傷人。拍馬屁。搞陰謀。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這份指南不是在講這些。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground">政治是當不同目標、不同利益、不同個性的人一起工作時自然發生的事。</strong>你已經在玩這場遊戲了。每一天。問題是你玩得好不好，還是在盲玩。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            所有規則之上有一條最重要的規則。McIntyre 稱之為<strong className="text-foreground">政治黃金法則：永遠不要通過傷害公司或傷害他人來推進自己的利益。</strong>這份指南教你用正確的方式贏。有道德的。有策略的。有效的。
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">這份指南適合誰：</h3>
            <ul className="space-y-2">
              {[
                "你剛開始一份新工作，想避免早期的政治錯誤",
                "你在職涯中段卡住了，不明白為什麼一直被忽略",
                "你感覺工作中有什麼不對勁，但不知道發生了什麼或怎麼解決",
                "你正在面對難搞的老闆、有毒的同事、或你沒有報名參加的政治遊戲",
                "你想增加你的影響力，但不想成為每個人都討厭的那個人",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Marie McIntyre 是一位組織心理學家，幫助過數百位員工、經理和高管處理政治困境。她的書《Secrets to Winning at Office Politics》是我找到的最實用的指南。她說出了大多數職涯建議不敢碰的東西。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這份指南把她書中的核心框架，透過我作為招募人員的經驗過濾後呈現給你。我看著人們因為政治能力而成功或自我毀滅。
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">你會學到：</h3>
            <ul className="space-y-2">
              {[
                "沒有人告訴你的5個組織事實",
                "如何判斷你是政治贏家還是正在走向麻煩",
                "增加你在職場影響力的7件事",
                "人們玩的8種遊戲以及如何應對",
                "一步步增加你影響力的計劃",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* Section 1: 5 Organizational Facts */}
        <section id="ofol" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">組織生活的5個事實</h2>
              <p className="text-muted-foreground text-lg">大多數人從來沒學過的遊戲規則</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">McIntyre 稱之為<strong className="text-foreground">組織生活事實（OFOL）</strong>。這些是遊戲的規則。大多數人從來沒學過。學會的人有巨大的優勢。</p>

          <div className="space-y-6">
            {[
              { title: "OFOL #1：組織不是民主體制", content: "你沒有投票權。你上面的人做決定。你執行。這是設計好的。如果每個人都要同意才能行動，什麼事都做不成。" },
              { title: "OFOL #2：有些人比其他人有更多權力", content: "這不是在說風涼話。這是結構性的。你的 CEO 比你的經理有更多權力。你的經理比你有更多權力。你越早接受這一點，就越早停止對抗系統，開始在結構中運作。" },
              { title: "OFOL #3：幾乎所有決定都是主觀的", content: "人們根據自己的價值觀、信念、目標和偏好做決定。不是你的。兩個人看同一個情況會得出相反的結論。兩個人都會稱自己的看法「客觀」。兩個人都沒有錯。他們只是不同。" },
              { title: "OFOL #4：你的老闆掌控你大部分的生活", content: "你的老闆影響你的薪水、你的任務分配、你的聲譽、你的升遷、以及你工作生活的整體品質。你用個人控制權換了一份薪水。交易就是交易。" },
              { title: "OFOL #5：公平是不可能的目標", content: "不存在絕對的公平標準。感知決定公平。任何大的決定都會引發有人抱怨。為公平問題煩惱是在浪費時間和精力。" },
            ].map((ofol, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-heading text-lg text-foreground mb-3">{ofol.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ofol.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">OFOL #4 的重點：</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">與其擔心你的老闆怎麼對待你，不如開始想怎麼跟你的老闆相處。向上管理是你需要的最重要技能之一。</p>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-4">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">我面試過數千名候選人。那些在面試中花時間抱怨上一份工作「不公平」對待的人？每一次都是警訊。不是因為他們的抱怨沒道理。而是因為他們把焦點放在委屈上而不是目標上。最好的候選人會談他們做了什麼來改變處境。他們談未來。不談過去。</p>
          </div>
        </section>
      </main>

      {/* Section 2: Wishes vs Goals */}
      <section id="wishes-goals" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">願望 vs. 目標</h2>
              <p className="text-muted-foreground text-lg">停止抱怨，開始規劃</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">願望</strong>和<strong className="text-foreground">目標</strong>之間有一條線。這個區別改變一切。</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h3 className="text-destructive font-semibold text-sm mb-3">願望聽起來像這樣：</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>「我希望我賺更多錢。」</li>
                <li>「我希望我的老闆沒這麼難搞。」</li>
                <li>「我希望是我升遷而不是 Susan。」</li>
                <li>「我希望有人給我一個更好的工作機會。」</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-3">許願是被動的。許願把焦點放在你希望「他們」做什麼。許願讓你離開權力位置。</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold text-sm mb-3">目標聽起來像這樣：</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>「我會發展我需要的技能來得到更高薪的職位。」</li>
                <li>「我會用更有效率的方式跟我的老闆溝通。」</li>
                <li>「我會問我的經理我需要做什麼來準備下一次升遷。」</li>
                <li>「我會更新我的履歷，開始看我所在領域的職位。」</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-3">目標代表行動。目標讓你掌控。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">從願望到目標的5個步驟</h3>
          <div className="space-y-3 mb-6">
            {[
              { step: "步驟 1", desc: "定義你想要的具體結果。「我想要更多錢」太模糊。「我想要一個年薪 400 萬的職位」才夠具體。" },
              { step: "步驟 2", desc: "找出你路上的障礙。缺乏教育？有限的職涯路徑？決策者對你的負面印象？" },
              { step: "步驟 3", desc: "找出你自己能做什麼來克服這些障礙。不是別人應該做什麼。你會做什麼。" },
              { step: "步驟 4", desc: "寫一個目標聲明。目標聲明以「我」開頭，使用行動動詞，描述具體的事情。範例：「我會研究適合我工作時間的學位課程。」" },
              { step: "步驟 5", desc: "採取第一步。然後下一步。當你專注在一次一個行動時，大目標會變得容易管理。" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.step}：</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">我看過人們卡住好幾年。同樣的職位。同樣的抱怨。同樣的午餐團體，每個人都在發洩對管理層的不滿。往前走的人？他們停止許願，開始規劃。他們寄出那封信。他們進行那場對話。他們投遞那份履歷。許願不花你任何代價。也不值任何東西。</p>
          </div>
        </div>
      </section>

      {/* Section 3: 4 Political Types */}
      <section id="types" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">4種政治類型</h2>
              <p className="text-muted-foreground text-lg">你是哪一種？</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">有四種政治類型，基於你的行為如何影響你的業務目標和個人目標。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">烈士</p>
                <p className="text-muted-foreground text-xs">幫助組織。傷害自己。</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">贏家 ✓</p>
                <p className="text-muted-foreground text-xs">幫助組織，也幫助自己。</p>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">笨蛋</p>
                <p className="text-muted-foreground text-xs">傷害自己，也傷害組織。</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">反社會者</p>
                <p className="text-muted-foreground text-xs">幫助自己。傷害組織。</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">烈士</h3>
              <p className="text-foreground text-sm font-semibold mb-2">幫助組織。傷害自己。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">烈士為公司犧牲一切。他們工作最長的時間。他們對所有事情都說好。他們從不抗拒。最終他們覺得不被感激和怨恨。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">有些烈士是討好者。他們不計代價做老闆想要的一切。以 Emily 為例，她是客服部門副總，為了滿足 CEO 不可能的要求而把自己累垮了。她從不抗拒。她從不設界線。她的回報？她被換掉了。換上的人工作時數更少、有更多人手、薪水是她的兩倍。</p>
              <p className="text-muted-foreground text-sm leading-relaxed">其他烈士是十字軍戰士。他們為自己相信的事業奮鬥。但他們一心一意的傳教讓人們退避三舍。他們追求的影響力被他們的方式摧毀了。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">反社會者</h3>
              <p className="text-foreground text-sm font-semibold mb-2">幫助自己。傷害組織。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">反社會者只在乎自己的需求。他們用為所有人製造問題的方式達成個人目標。短期來看，他們像贏家。長期來看，他們的自私會追上他們。</p>
              <p className="text-muted-foreground text-sm leading-relaxed">這包括整天什麼都不做來偷時間的人。用私人關係逃避責任的人。還有在公司虧錢時給自己發巨額獎金的高管。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">笨蛋</h3>
              <p className="text-foreground text-sm font-semibold mb-2">傷害自己，也傷害組織。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">情緒控制笨蛋，而不是相反。對員工大吼直到所有人都辭職的經理。說出不當言論直到官司找上門的合夥人。斥責人們直到人力資源部介入調查的主管。</p>
              <p className="text-muted-foreground text-sm leading-relaxed">笨蛋行為是自我毀滅的，對業務也有害。這些人不是故意要失敗。憤怒、焦慮或衝動在主導一切。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">贏家</h3>
              <p className="text-foreground text-sm font-semibold mb-2">幫助組織，也幫助自己。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">贏家交出讓公司更成功的成果。同時，他們建立自己的職涯、聲譽和人脈。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">書中介紹了 Glenn，他以會計師身份加入公司，一路晉升到財務副總。在每一步，他學習新東西、承擔有曝光度的專案、交出成果、認識高管、建立正面的工作關係。人們尊重他的成功，因為他們看著他一步一步贏得每個階段。</p>
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">關鍵問題：</strong>你是哪一種？不是在你最好的日子。在壓力下。當事情出錯時。當老闆做出你討厭的決定時。當同事得到你想要的升遷時。</p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">我錄用過四種類型的人。贏家很容易認出來。他們談他們完成了什麼，同時談他們如何與他人合作完成工作。在面試中，我聽的是平衡。成果加上人際關係。如果你兩者兼具，你就是贏家。</p>
          </div>
        </div>
      </section>

      {/* Section 4: Leverage */}
      <section id="leverage" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">忘掉公平，看看籌碼</h2>
              <p className="text-muted-foreground text-lg">書中最重要的概念之一</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">籌碼是你讓他人照你的意思行動的能力。</strong>不是通過強迫。不是通過操縱。通過定位。</p>

          <p className="text-muted-foreground leading-relaxed mb-6">一個簡單的例子：你想跟老闆要求加薪。如果 (a) 你已經忠誠地工作了五年，或 (b) 你有另一個工作機會，你更有可能得到加薪？當你的服務在其他地方被需要時，你的籌碼就會增加。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">籌碼等式</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">在每一次互動中，都有一個籌碼等式。誰擁有更多？誰需要誰的什麼？贏家準確地計算這些。高估你的籌碼，你會為自己設下陷阱。低估你的籌碼，你會錯過機會。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">書中有一個好例子：Marcia 在搬家工人還有一半家具在卡車上時威脅要扣款。時機不對。搬家工人有同等的籌碼。如果她等到所有東西都卸下來，等式就會轉向對她有利。</p>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-8">
            <h3 className="text-destructive font-semibold text-sm mb-3">常見的籌碼誤判：</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>因為你覺得「不應該」做某件事就違抗老闆（你的老闆有更多籌碼）</li>
              <li>向 CEO 的行政助理抱怨 CEO（忠誠是籌碼等式的一部分）</li>
              <li>拒絕經理的直接要求，因為你不同意這個任務。書中的 Brian，一位工程師，無視老闆要求的專案進度更新，因為他覺得自己不該做。他的績效評分被降低了，加薪也減少了。他很震驚。他不應該驚訝。</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">7種籌碼加速器</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">增加你在職場的籌碼的七種方式：</p>

          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "成果的力量", desc: "交出讓組織更有競爭力的成果。你的成果越引人注目，你累積的籌碼就越多。" },
              { num: "2", title: "知識的力量", desc: "在你的工作中發展深度專業。成為人們需要答案時會找的那個人。" },
              { num: "3", title: "態度的力量", desc: "成為別人想要一起工作的那種人。友善。樂於助人。合作。把負面反應留給自己。" },
              { num: "4", title: "同理心的力量", desc: "試著理解其他人的問題。一個有同情心的耳朵能建立信任和資訊。" },
              { num: "5", title: "人脈的力量", desc: "你的連結越多（組織內外），你能解決的問題越多，你的籌碼就越高。" },
              { num: "6", title: "包容的力量", desc: "讓他人參與你的決定和專案。跨功能建立橋樑。打破孤島。" },
              { num: "7", title: "超然的力量", desc: "不要過度情緒投入。對批評或建議反應過度的人很難合作。被視為客觀且有想法的人會增加你的影響力。" },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.num}. {item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">當候選人問我如何談到更好的薪資條件時，他們問的是籌碼。你在他們給出 offer 之後、你接受之前，擁有最多籌碼。把握那個時刻。但同時：籌碼不是一次性的事。你每天都在累積籌碼。你交出的每一個成果。你建立的每一段關係。你解決的每一個問題。</p>
          </div>
        </div>
      </section>

      {/* Section 5: Allies & Adversaries */}
      <section id="network" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">盟友、對手，和你的政治網路</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">核心事實：<strong className="text-foreground">正面的關係建立政治資本。</strong>當你喜歡一個人，你自然想幫他們。當你不喜歡，你不會多走一步。很簡單。你的支持者增加你的籌碼。你的敵人減少你的籌碼。如果你的對手數量超過你的盟友，你就有麻煩了。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">3種類型的盟友</h3>
          <div className="space-y-3 mb-8">
            {[
              { type: "朋友", desc: "因為共同興趣或類似個性而「合拍」的同事。這些自然發生。但記住：同事會分開評估你的個性和能力。你的辦公室好友可能很喜歡你，但仍然覺得你工作不怎麼樣。" },
              { type: "夥伴", desc: "成果與你綁在一起的同事。你們彼此依賴來產出結果。這些隨著你的工作而來。關鍵是把夥伴當作盟友，不是對手。當夥伴競爭而不是合作時，每個人都輸。" },
              { type: "人脈", desc: "你需要資訊、幫助或人情時找的人。你的人脈越多，你能解決的問題越多。但不要過度使用。要的人情太多，你會磨光你的歡迎程度。" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.type}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">建立你的人脈（即使你很內向）</h3>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <p className="text-muted-foreground text-sm mb-3">你不必成為辦公室裡最外向的人。你需要做的是：</p>
            <ul className="space-y-2">
              {[
                "確認你需要認識的人。誰在做關於你目標的決定？",
                "找到互動的方式。會議。午餐。專業活動。一個關於他們工作的簡單對話。",
                "成為人們想跟你說話的那種人。樂於助人。有能力。友善。情緒穩定。",
                "走出你的舒適區。停止只跟跟你想法一樣的人混在一起。",
                "尋找共同興趣。共同點讓關係變得個人化。",
                "樂於助人。提供幫助能建立橋樑。每一次都是。",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">3種類型的對手</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">不是每個讓你煩的人都是對手。對手是<strong className="text-foreground">站在你和你的目標之間的人。</strong>三個類別：</p>
          <div className="space-y-3 mb-6">
            {[
              { type: "聚焦型對手", desc: "想要達到自己的目的，把你視為障礙。不是針對你個人。他們想要升遷、任務、資源。你擋在路上。", strategy: "找到共同點。讓他們看到你如何貢獻到他們的成功。如果你無法轉化他們，就通過增加自己的籌碼來圍堵他們。" },
              { type: "情緒型對手", desc: "為每個人製造問題。他們的行為來自自己的需求，不是你的。他們發脾氣、鬧脾氣、形成小圈子、或感情受傷。", strategy: "不要被捲入他們的情緒。保持冷靜。保持理性。不要試著改變他們的個性。專注在減少他們對你周圍的有害行為。" },
              { type: "報復型對手", desc: "針對你個人。有時候是因為你做了什麼事（你不知道）。有時候是因為他們天生愛衝突。", strategy: "首先，檢視你自己的行為。你是否觸發了他們的怨恨？如果是，試試直接的方式：「我覺得我們的工作關係不太順暢。我想找出怎麼改善。」如果他們不理性，專注在圍堵和保護自己。" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.type}</p>
                <p className="text-muted-foreground text-sm mb-2">{item.desc}</p>
                <p className="text-gold text-xs font-semibold mb-1">策略：</p>
                <p className="text-muted-foreground text-sm">{item.strategy}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">我告訴每個新員工同樣的話：你的前90天是關於建立盟友。不是用你的聰明去打動人。不是證明你是正確的人選。建立關係。在任何公司長期成功的人是那些有強大人脈的人。被擠走的人？幾乎每一次，他們在能力用完之前就先用完了盟友。</p>
          </div>
        </div>
      </section>

      {/* Section 6: 8 Political Games */}
      <section id="games" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">人們玩的8種政治遊戲</h2>
              <p className="text-muted-foreground text-lg">在付出代價之前認識它們</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">每個職場都有八種常見的政治遊戲。每一種都有模式、對玩家的情緒回報、和你的反制手段。認識這些遊戲幫助你早期發現並用腦而不是情緒來回應。</p>
          <p className="text-muted-foreground leading-relaxed mb-8">每個職場在任何時候都至少有兩三種遊戲在進行。你不必玩。但你必須認識正在發生什麼。最壞的結果不是輸掉一場遊戲。最壞的結果是不知道自己在遊戲中。</p>

          <h3 className="font-heading text-lg text-gold mb-4">權力遊戲</h3>
          <div className="space-y-4 mb-8">
            {[
              {
                num: "1", title: "拍馬屁遊戲", motto: "「我覺得你太棒了，所以你要喜歡我。」",
                desc: "玩家向管理層灌滿讚美，從不反對。他們把所有精力向上投射。同事怨恨他們。管理層得到過濾的資訊而不是誠實的回饋。",
                example: "在書中，Albert，一位地區經理，有一句座右銘：「讓老闆開心是第一要務。」當他的業務團隊對一個不切實際的行銷計劃提出疑慮時，Albert 把他們擋了回去。他永遠不會質疑老闆。他的團隊受苦了。計劃失敗了。",
                move: "在私下場合探詢他們的真實意見。在會議中，問需要誠實回答而非阿諛的具體問題。"
              },
              {
                num: "2", title: "控制遊戲", motto: "「你管不了我。」",
                desc: "玩家抗拒他人的指導。有些是支配者，想要發號施令。其他是抗拒者，拒絕對自己工作的任何外部影響。",
                example: "以 Sherry 為例，她的新員工 Matt 明確表示他不尊重她，認為自己應該有她的職位。他跟她爭論，無視她的要求，並開始在週末跟她的老闆打高爾夫球來拉攏關係。Sherry 避開衝突，因為跟 Matt 說話很不愉快。這讓事情更糟了。",
                move: "不要被吸進權力鬥爭。堅守你的立場。直接處理工作問題。增加你在管理層面的籌碼，讓等式對你有利。"
              },
              {
                num: "3", title: "排擠遊戲", motto: "「如果你不合群，我們要你好看。」",
                desc: "一個群體因為有人不同而懲罰他。目標被排除在午餐、對話和社交活動之外。沒有人承認有任何事情在發生。",
                example: "在書中，Darla，一位新的行政助理，她隨性的風格跟其他助理精緻的形象不搭。他們試著「幫忙」告訴她去哪裡買衣服和剪頭髮。當她一笑置之時，排擠就開始了。沒有人到她的座位打招呼。她獨自吃午餐。沒有人承認有任何問題。",
                move: "找到其他支持來源。個別地跟群體中比較友善的成員建立關係。試著找出觸發排擠的行為（即使原因看起來不公平）。"
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>
                <p className="text-gold text-xs font-semibold mb-1">你的應對：</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-gold mb-4">自負遊戲</h3>
          <p className="text-muted-foreground text-sm mb-4">權力遊戲是關於控制和地位。自負遊戲不同。它們關於不安全感。玩者需要感覺自己特別，而且他們會讓你的生活更糟來得到這種感覺。</p>
          <div className="space-y-4 mb-8">
            {[
              {
                num: "4", title: "優越感遊戲", motto: "「你對我印象深刻嗎？」",
                desc: "玩家不斷吹噓，控制對話，確保每個人都知道他們有多重要。在姿態之下，他們非常不安全。在書中，Charlotte 劫持每一場會議來談她的大專案，在對話中接電話，無視你需要討論的任何事。同事們學會了不再安排跟她的會議時間。",
                example: "在面試中，我在前兩分鐘內就會發現這一點。在我問完第一個問題之前就提了三位高管名字的候選人。用最高級形容詞描述每一項成就的人。自信很有吸引力。表演自信令人反感。",
                move: "不要回應這種行為。不要追問他們最近的成就。當行為干擾到工作時，直接處理。"
              },
              {
                num: "5", title: "貶低遊戲", motto: "「你明顯是個白痴，所以我一定很聰明。」",
                desc: "玩家用尖銳、諷刺的言語讓他人覺得自己很蠢。他們只有在讓別人覺得糟時才能感覺良好。在書中，George，一位經理，在一位員工報告三分鐘後打斷他說「你的結論是錯的」和「我以為你有策略頭腦，但現在我不確定你有頭腦。」他的團隊害怕開會。",
                example: "我錄用過在一年內因為貶低型老闆而辭職的人。損害是真實的。最讓我擔心的是：貶低遊戲的玩家很少被開除，直到留任率數字迫使公司處理。到那時，最好的員工已經走了。",
                move: "不要畏縮。保持自信。從心理健康的人那裡得到對你工作的其他意見。如果這個人是你的老闆，儘快找到另一份工作。"
              },
              {
                num: "6", title: "小圈子遊戲", motto: "「你想成為我們的一員，但你不受歡迎。」",
                desc: "兩個不平等的群體存在。每個人都知道一個群體更受歡迎，而且群體限制成員資格。沒有人公開談論這種動態。在書中，九位地區經理的季度會議被四位資深成員主導。他們前一天一起打高爾夫球，一起吃晚餐，坐在桌子的同一邊，總是以同一陣營投票。當一位新經理不知情地坐在他們的位子上時，「玩笑」一直持續到他換位子為止。",
                example: "",
                move: "和其他外圈成員聯合起來承認這種動態。跟比較容易接近的內圈成員建立個人關係。建議混合群體的活動。"
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                {game.example && <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>}
                <p className="text-gold text-xs font-semibold mb-1">你的應對：</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-gold mb-4">逃避遊戲</h3>
          <p className="text-muted-foreground text-sm mb-4">權力遊戲搶控制。自負遊戲搶注意力。逃避遊戲迴避責任。下面的玩家不是在逃避指責，就是在逃避工作。</p>
          <div className="space-y-4">
            {[
              {
                num: "7", title: "代罪羊遊戲", motto: "「這個問題明顯是你的錯。」",
                desc: "有人被快速歸咎於問題而沒有探索其他原因。當你的老闆是玩家時，這特別危險。",
                example: "一位服裝連鎖店 CEO 正在檢視 32% 的銷售下滑。行銷副總裁提出數據顯示客人走進了店裡但沒有購買，因為商品已經改變。CEO（親自選擇了新的產品線）拒絕接受。他宣布下滑是「廣告問題」。事實不重要。需要有人扛責任，而 CEO 不會是那個人。",
                move: "不要爭論。如果適當的話，承認部分責任。通過陳述事實微妙地保護自己。如果你的老闆經常玩這個遊戲，投資在 CYA（留存自保的證據）活動。"
              },
              {
                num: "8", title: "逃避遊戲", motto: "「我不想做這個工作，所以我不打算做。」",
                desc: "玩家拖延困難或不愉快的任務。他們用藉口作為拖延策略。任何依賴他們的人都會受苦。",
                example: "在書中，Karen 需要企業律師 Gerald 完成一份合約，才能完成她職業生涯中最大的訂單。四週過去了。Gerald 送來三個藉口。然後他完全消失。真正的原因？Gerald 討厭跟 CEO 討論合約，因為 CEO 會對每一條款挑毛病。所以 Gerald 逃避整個任務，而 Karen 的交易懸在那裡。",
                move: "永遠要得到一個具體日期的承諾。提議幫忙處理困難的部分。讓延遲的後果對有影響力的人可見。"
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>
                <p className="text-gold text-xs font-semibold mb-1">你的應對：</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Political Suicide */}
      <section id="suicide" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如何進行政治自殺</h2>
              <p className="text-muted-foreground text-lg">這樣你就能避免</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">如果你想毀掉你的職涯，這是配方：成為問題人物。</p>
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">問題人物是消耗太多管理層時間和注意力的人。</strong>經理的耐心有限。一旦有人進入「問題」領域，經理就會開始幻想沒有這個人的生活會多麼美好。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">有一個<strong className="text-foreground">臨界點</strong>。經理從「這個人有一些問題」轉變為「我需要讓這個人走」的那一刻。一旦你越過臨界點，每一個未來的行為都會確認他們的負面結論。你在一個深坑裡。爬出來極度困難。</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h3 className="text-destructive font-semibold text-sm mb-3">基於憤怒的毀滅：</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><strong>抱怨：</strong>對管理層、同事、公司持續的負面態度</li>
                <li><strong>叛逆：</strong>不同意決定，拒絕遵守你不喜歡的政策</li>
                <li><strong>對抗：</strong>吼叫、咒罵、斥責人們、讓他們哭</li>
              </ul>
            </div>
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
              <h3 className="text-yellow-500 font-semibold text-sm mb-3">基於焦慮的毀滅：</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><strong>膽怯：</strong>害怕發言，總是退讓以維持和平</li>
                <li><strong>依賴：</strong>持續尋求對你工作品質的安慰</li>
                <li><strong>躲藏：</strong>迴避互動，躲開對話，變成隱形人</li>
              </ul>
            </div>
          </div>

          <Collapsible title="受害者身份陷阱">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>注意你的自我對話。如果你持續告訴自己「沒有人感激我」或「我總是被忽略」，你正在建立受害者身份。這是政治上最具破壞性的模式之一。</p>
              <p>以 Dorothy 為例，她沒有得到升遷，於是認定她的老闆一定是敵人。她疏遠了他。不再尋求建議。開始只通過電子郵件溝通。提出了申訴。寫了一封信給部門主管。每一個行動都讓她在問題人物的類別中陷得更深。她原本錯過的升遷變得不再有任何機會了。</p>
              <p><strong className="text-foreground">這個模式：</strong>有壞事發生。你認定自己是受害者。你尋找確認你信念的證據。你到處都找到證據。你的行為改變了。人們注意到了。事情變得更糟。你責怪他們。重複。</p>
            </div>
          </Collapsible>

          <h3 className="font-heading text-lg text-foreground mt-8 mb-4">你陷入政治麻煩的警告信號</h3>
          <div className="space-y-4 mb-8">
            {[
              { level: "第1級：有什麼不對勁。", items: ["不安的感覺增長，對不公平的憤怒想法增多", "同事看起來疏遠或閃避", "你的老闆忽視你或做出尖銳的評論", "你的老闆跟你進行了一次「嚴肅談話」關於你的表現", "公司為你請了一位個人教練（他們在投資，但你有問題）"] },
              { level: "第2級：未來看起來不確定。", items: ["一項重要任務被分配給了其他人", "你被升遷拒絕超過一次", "在換了新老闆後你的籌碼正在流失", "人力資源部開始定期找你確認"] },
              { level: "第3級：職涯變動在即。", items: ["在重組後你失去了員工、頭銜、責任或匯報層級", "你老闆的老闆加強了你已經有過的嚴肅談話", "裁員傳言在流傳，人們避開你的目光"] },
            ].map((lvl, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-2">{lvl.level}</p>
                <ul className="space-y-1.5">
                  {lvl.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">政治整形手術：AMISH 模型</h3>
          <div className="space-y-3 mb-6">
            {[
              { letter: "A", title: "意識（Awareness）", desc: "認識到有問題。尋求回饋。提問。不要等到斧頭落下。" },
              { letter: "M", title: "動力（Motivation）", desc: "接受你需要改變。如果你不覺得自己有問題，你不會修正任何事情。" },
              { letter: "I", title: "辨識（Identification）", desc: "具體說明什麼需要改變。「態度不好」太模糊。「我在會議中打斷人們，否定他們的想法」才夠具體。" },
              { letter: "S", title: "替代（Substitution）", desc: "對每一個你停止的行為，決定你會用什麼來替代。「當我在會議中感到憤怒時，我會深呼吸並提問而不是爭論。」" },
              { letter: "H", title: "習慣替換（Habit Replacement）", desc: "新習慣需要時間。期待挫折。人們不會立刻相信新的你。要有耐心和一致性。" },
            ].map((item) => (
              <div key={item.letter} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                <span className="text-gold font-heading text-2xl font-bold">{item.letter}</span>
                <div>
                  <p className="text-foreground font-semibold text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">我看過有才華的人從他們表現出色的工作中被開除。不是因為工作品質差。因為他們成為了問題人物。最悲傷的版本？不知道結局正在到來的人。他們認為一切都好，而他們的經理已經在規劃他們的離開了。</p>
            <p className="text-muted-foreground text-sm leading-relaxed">如果你在工作中感到不安。如果你的老闆一直很疏遠。如果任務正在分配給其他人。注意。那些感覺就是訊號。在決定替你做出之前先行動。</p>
          </div>

          <div className="bg-executive-green rounded-xl p-5 mt-6">
            <p className="text-cream/90 text-sm font-medium">如果你在這裡認出了自己，跳到第10節，路徑A，了解完整的行動計劃。</p>
          </div>
        </div>
      </section>

      {/* Section 8: The 4 P's */}
      <section id="four-ps" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">政治影響力的4個P</h2>
              <p className="text-muted-foreground text-lg">增加影響力的框架</p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { p: "P1", title: "影響力評估", desc: "你的籌碼位置有多強？" },
                { p: "P2", title: "績效", desc: "你的成果有讓公司更成功嗎？" },
                { p: "P3", title: "感知", desc: "對的人知道你的成果嗎？" },
                { p: "P4", title: "夥伴關係", desc: "你有在建立擴展你影響範圍的聯盟嗎？" },
              ].map((item) => (
                <div key={item.p} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{item.p}</p>
                  <p className="text-cream font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-cream/60 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #1：影響力評估</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">評估你的職位影響力（你的工作給你的：權限、接觸機會、曝光度）和你的個人影響力（你帶來的：專業、態度、關係、過往記錄）。</p>
              <p className="text-foreground text-sm font-semibold mb-2">問你自己：</p>
              <ul className="space-y-2">
                {["決策者知道我是誰嗎？", "人們信任我提供的資訊嗎？", "當我想要什麼，我通常會得到結果嗎？", "關鍵人物會為我背書嗎？"].map((q, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{q}</span></li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #2：績效</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">績效原則：業務成果決定你的價值。</strong>你需要 ROI 思維。你的組織投資了你的職位，也投資了你這個人。你知道管理層期望什麼回報嗎？你交出的是否超過最低要求？</p>
              <p className="text-foreground text-sm font-semibold mb-2">交出成績：</p>
              <ul className="space-y-2">
                {["了解什麼對你的老闆重要（不管你喜不喜歡他們）", "認識權力菁英的價值觀（管理公司的那群高管）", "專注在基本面：高品質的工作、準時完成、信守承諾", "做到可靠。做到值得信賴。當任何人想到你時，這兩個詞應該出現在腦海中。"].map((q, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{q}</span></li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #3：感知</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">感知原則：看不見的貢獻沒有政治價值。</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">她講了一個故事，一個青少年從著火的房子裡救出兩個孩子。版本一，他從前門把他們抱出來。群眾歡呼。電視記者訪問他。他得到了改變人生的獎學金。版本二，他從後門把他們抱出來。沒有人看到救援。沒有電視報導。沒有獎學金。同樣的行為。不同的結果。感知很重要。</p>

              <div className="bg-card border border-border rounded-xl p-4 mb-4">
                <p className="text-foreground text-sm font-semibold mb-2">把你的工作分成四種類型：</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "明星工作", desc: "高曝光度，高重要性。在這裡多花心力。", color: "bg-green-500/10" },
                    { type: "維護工作", desc: "高曝光度，低重要性。不要搞砸。", color: "bg-yellow-500/10" },
                    { type: "隱形任務", desc: "低曝光度，高重要性。找到方法讓這些被看見。", color: "bg-blue-500/10" },
                    { type: "浪費時間", desc: "低曝光度，低重要性。最小化或消除。", color: "bg-destructive/10" },
                  ].map((item) => (
                    <div key={item.type} className={`${item.color} rounded-lg p-3`}>
                      <p className="text-foreground text-xs font-bold mb-1">{item.type}</p>
                      <p className="text-muted-foreground text-[11px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">注意細節：</strong>草率的郵件、錯字、錯過截止日期。小錯誤會讓人們假設你其他的工作也很粗糙。</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #4：夥伴關係</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">夥伴關係原則：跟你合作的人越多，你的影響力就越大。</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">每次你對某人發脾氣、防衛性地反應、或不配合，你就放棄了一點政治影響力。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">拓展你的容忍區。</strong>工作風格不同的人不是錯的。他們只是不同。最讓你煩的人通常是你天然的互補。他們有你缺乏的優勢。學著跟他們合作，你會產出更好的結果。</p>
              <p className="text-muted-foreground text-sm leading-relaxed">McIntyre 分享了 Gayle 的故事，一位壓力很大的技術出版品主管，淹沒在挫折和憤怒中。在應用了4個P之後，她停止抱怨，開始跟產品經理合作，改變了她對老闆的行為，得到了升遷成為總監。她最大的一步？她離開了每天的午餐團體。「這個團體不是支持團體，」她說。「這個團體是一個抱怨俱樂部。」</p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">我的看法</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">4個P也適用於你的求職。影響力評估：你有談判的籌碼嗎？績效：你的履歷展現了成果嗎？感知：對的人（招募人員、用人主管）知道你的工作嗎？夥伴關係：你的人脈強到能浮現機會嗎？如果這些中有任何一個薄弱，專注在那裡。</p>
          </div>
        </div>
      </section>

      {/* Section 9: Influence Skills */}
      <section id="influence" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">影響力技能：贏家工具包</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">大多數人在自動駕駛模式下運作。他們一整天做自然而然的事。有時候有效。有時候無效。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">贏家不同。他們對自己的行為做<strong className="text-foreground">有意識的、明智的決定</strong>。這就是影響力。不是操縱。不是陰謀。有意識的選擇。</p>

          <h3 className="font-heading text-lg text-foreground mb-4">自我管理：基礎</h3>
          <div className="space-y-3 mb-8">
            {[
              { title: "自我觀察：", desc: "觀察你自己的行動和對他人的影響。人們反應好嗎？正在退縮？變得防衛？注意。在書中，Carlton，一位新公司總裁，陷入思考到他走過人們身邊完全沒看到他們。員工很快就給他貼上了傲慢和不友善的標籤。他不是。他迷失在自己的腦海中。但感知就是現實。" },
              { title: "自我克制：", desc: "你的第一個衝動不一定是最好的一步。在書中，Eileen 脫口而出「他真是個小獨裁者，不是嗎？」說的是她的新老闆，而且在整個辦公室都聽得到。一句話。巨大的傷害。暫停後再反應的能力是你會發展出的最有價值的政治技能之一。" },
              { title: "選擇性行為：", desc: "一旦你觀察和克制了，你就處在一個做選擇的位置。什麼行為會讓你在這個特定情況下更接近你的目標？" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">我在面試中不斷看到自我管理的失敗。說前老闆壞話的候選人。在五分鐘內打斷我三次的人。在對話中查看手機的人。這些都是自動駕駛行為。在對話變得有趣之前就扼殺了你的機會。</p>

          <h3 className="font-heading text-lg text-foreground mb-4">直接 vs. 間接影響力</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">把影響力想像成一個光譜。一端是：直接影響力（說服、斷言、命令）。另一端是：間接影響力（觀察、提問、傾聽）。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">大多數人過度使用一邊。書中的 Ralph，一位培訓經理，說個不停。他對每件事都發表意見，告訴人們該做什麼，主導每一場討論。他的團隊把他當耳旁風。Vickie，一位安靜的專家，完全依賴提問和傾聽。她從不表達自己的立場。人們也忽視她。</p>
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">最好的影響者兩邊都使用。</strong>他們知道什麼時候該大膽表達，什麼時候該閉嘴傾聽。他們知道什麼時候該快速行動，什麼時候該等待完美時機。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">McIntyre 的同事 Carl 完美地展示了這一點。在一場激烈的全天會議中，每個人都在爭論，Carl 幾乎沒說話。他觀察。他等待。幾小時後，當團隊精疲力竭且卡住時，Carl 做出了一個冷靜、精確的觀察。辯論結束了。問題解決了。Carl 掌握了完美時機的藝術。</p>
          <p className="text-muted-foreground leading-relaxed mb-8">我在面試中看到最缺乏的影響力技能？傾聽。聽完問題、暫停、然後給出深思熟慮的答案的候選人會脫穎而出。在我說完之前就開始背誦準備好的長篇大論的候選人？他們告訴我他們也不會聽他們的經理、團隊或客戶。</p>

          <h3 className="font-heading text-lg text-foreground mb-4">向上、橫向和向下管理</h3>

          <Collapsible title="管理你的老闆">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>你需要停止擔心你的老闆怎麼對你，開始想怎麼跟你的老闆合作。</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>接受你的老闆有權限指導你的工作。即使你更聰明。</li>
                <li>幫助你的老闆成功。這是通往你自己成功的最快路。</li>
                <li>了解他們的期望。不要猜。問。McIntyre 在三位不同的 CEO 下工作過，每一位重視完全不同的東西：一位想要面對面互動，一位偏好書面溝通，一位想要數據和調查。同樣的功能。三套不同的劇本。</li>
                <li>讓你的老闆看起來好。高品質的結果，準時完成，有用的資訊。</li>
                <li>永遠不要向他人抱怨你的老闆。特別是在你部門外。在書中，John，一位人力資源副總裁，經常向新公司總裁的行政助理發洩對總裁的不滿。他以為她是安全的聽眾。她不是。她的忠誠是對她老闆的。John 丟了工作。他從來沒有把這些連接起來。</li>
                <li>偶爾給你的老闆真誠的讚美。經理聽到大量的抱怨，幾乎得不到任何感謝。</li>
                <li>當你換了新老闆時要適應。世界改變了。隨之改變。McIntyre 分享了一位主管的警告：「要嘛人改變，要嘛我們換人。」我看過人們因為拒絕適應新經理而浪費了多年的善意。</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="跟高管合作">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>如果你有機會直接跟資深領導合作，這些規則值得記住：</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>不要告訴高管他們「做不到」某件事。說「好，我們會這麼做，但讓我問你一個問題...」這個簡單的轉變承認了他們的權限，讓對話保持開放。</li>
                <li>說話要快。從你最重要的要點開始。準備好在三句話後被打斷。他們不想聽獨白。他們想控制對話，得到他們需要的，然後繼續下一件事。</li>
                <li>不要期望得到具體的指示。自己搞清楚細節，或用你的人脈。</li>
                <li>注意細節。他們期望完美的執行。你會得到模糊的指示。不要回去要求澄清。</li>
                <li>不要把不當對待當成針對你個人。你在面對的是一位有不好態度的高層人士。</li>
                <li>在尊重他們權限的同時展現自信。</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="跟同事合作">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>持續地展現友善、樂於助人和回應迅速。</li>
                <li>說到做到。回覆電話。準時完成。信守承諾。</li>
                <li>不要期望同事當你的心理治療師。</li>
                <li>避免以犧牲同事為代價來進行明顯的自我推銷。</li>
                <li>當你有不同意見時，像成年人一樣討論問題。不要侮辱。不要鬧脾氣。</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="領導你的團隊（如果你管理人員）">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>你是經理，不是國王。放下頭銜的架子。</li>
                <li>專注在被尊重，不是被喜歡。</li>
                <li>學會管理績效。設定目標。給回饋。感謝好的工作。</li>
                <li>幫助你的員工成長。了解他們的目標。幫助他們發展。</li>
              </ol>
            </div>
          </Collapsible>
        </div>
      </section>

      {/* Section 10: Your Game Plan */}
      <section id="game-plan" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">你的政治遊戲計劃</h2>
              <p className="text-muted-foreground text-lg">停止、開始、繼續</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">這裡是這份指南中的一切變成行動的地方。不是理論。不是概念。根據你現在的處境，列出具體步驟。</p>

          <h3 className="font-heading text-lg text-foreground mb-4">步驟 1：找到你的起點</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">使用下面的決策樹。從頂部開始。跟隨符合你情況的路線。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <p className="text-xs font-bold text-gold uppercase tracking-wider mb-5">決策樹：找到你的起點</p>
            <div className="flex flex-col items-center gap-0">
              <div className="bg-executive-green text-cream text-sm font-semibold px-6 py-3 rounded-lg text-center max-w-sm leading-snug">
                你現在有政治麻煩嗎？
              </div>
              <p className="text-muted-foreground text-xs text-center max-w-xs mt-1 mb-1">（老闆疏遠、任務被分給別人、HR 來找你）</p>
              <div className="w-px h-3 bg-gold/40" />
              <div className="flex w-full max-w-lg">
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-bold text-green-500 mb-1">是</span>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 max-w-[200px]">
                    你是否被視為<br />「問題人物」？
                  </div>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="flex w-full max-w-xs">
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-xs font-bold text-green-500 mb-1">是</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">路徑 A</p>
                        <p className="text-foreground text-xs">緊急修復</p>
                      </div>
                    </div>
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-xs font-bold text-destructive mb-1">否</span>
                      <div className="w-px h-2 bg-gold/40" />
                      <div className="border border-border rounded-lg px-3 py-2 text-center text-xs text-foreground font-medium bg-muted/50">
                        有人在<br />阻擋你嗎？
                      </div>
                      <div className="w-px h-3 bg-gold/40" />
                      <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-green-500 mb-1">是</span>
                          <div className="bg-gold/15 border border-gold/30 rounded-lg px-2 py-1.5 text-center">
                            <p className="text-gold text-xs font-bold">路徑 B</p>
                            <p className="text-foreground text-[10px]">對手管理</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-destructive mb-1">否</span>
                          <div className="bg-gold/15 border border-gold/30 rounded-lg px-2 py-1.5 text-center">
                            <p className="text-gold text-xs font-bold">路徑 C</p>
                            <p className="text-foreground text-[10px]">能量重導</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-bold text-destructive mb-1">否</span>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 max-w-[200px]">
                    你知道你的<br />職涯想要什麼嗎？
                  </div>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="flex w-full max-w-xs justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-destructive mb-1">否</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">路徑 D</p>
                        <p className="text-foreground text-xs">目標清晰化</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-green-500 mb-1">是</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">路徑 E</p>
                        <p className="text-foreground text-xs">建立政治影響力</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PATH A-E */}
          {[
            {
              id: "path-a", title: "路徑 A：緊急修復", subtitle: "你正在成為問題人物",
              situation: "你感覺管理層正在對你失去耐心。你有過一次「嚴肅談話」。你的籌碼正在縮小。你在危險區。",
              priority: "止血。你有一個狹窄的窗口來改變感知，在決定替你做出之前。",
              steps: [
                "控制你的情緒。在任何事之前，停止反應。不要向同事發洩。不要寫憤怒的郵件。不要對抗。每一次情緒爆發都會確認他們對你的負面看法。",
                "找出人們怎麼想。直接問你的老闆：「我想確保我符合期望。有什麼你希望我做不同的嗎？」如果你有過嚴肅談話，後續跟進：「我一直在思考你說的話。這是我正在做的改變。」",
                "應用 AMISH 模型。找出造成問題的具體行為。對每一個行為，定義替代行為。每天練習替代行為。",
                "對改變要有耐心，而且要讓改變被看到。人們不會立刻信任新的你。持續展現不同的樣子。時間加上一致性是唯一能改變他們感知的東西。",
              ],
              ssc: { stop: "在你的 AMISH 評估中找出的具體行為", start: "替代行為，加上跟老闆定期溝通", cont: "交出有力的工作成果（這是你的生命線）" },
              note: "如果在60-90天的真誠努力後沒有改變：開始你的求職。按你的條件離開。不要等到被推出去。"
            },
            {
              id: "path-b", title: "路徑 B：對手管理", subtitle: "有人在阻擋你",
              situation: "一個特定的人站在你和你的目標之間。不支持你的老闆。暗中破壞你的同事。搶你功勞的對手。",
              priority: "診斷對手類型，用策略回應，不是情緒。",
              steps: [
                "確認他們是對手，不是惱人的人。他們在阻擋你的目標還是在讓你煩？",
                "辨識他們的類型：聚焦型（想要你擋住的東西）、情緒型（為所有人製造問題）、或報復型（針對你個人）。",
                "決定——轉化還是圍堵？如果有共同點，試著把他們轉化為盟友。如果沒有，通過增加你自己的籌碼來圍堵他們。",
                "如果什麼都沒用，明智地升級或離開。讓更高層的經理介入是最後手段。",
              ],
              ssc: { stop: "對對手的執念、向同事發洩、報復", start: "累積籌碼、記錄事實、強化其他聯盟", cont: "專注在你自己的目標和交出成果" },
            },
            {
              id: "path-c", title: "路徑 C：能量重導", subtitle: "你把時間花在錯的地方",
              situation: "你沒有危險。沒有人在阻擋你。但你覺得卡住、沮喪或疲憊。你把精力花在不讓你前進的事情上。",
              priority: "審計你的精力流向，重導到你的目標。",
              steps: [
                "對一切應用篩選問題：「這是我精力的最佳用途嗎？」整整一週對每一個活動、對話、抱怨和任務問這個問題。",
                "找出你的精力消耗者：你每天一起吃午餐的有毒同事、你在腦中反覆播放的公平抱怨、八卦和發洩會議、負面自我對話。",
                "砍掉消耗者。增加投資。記得 Gayle 嗎？她離開了每天的抱怨午餐團體，六個月內她得到了升遷。",
              ],
              ssc: { stop: "精力消耗者（從你的審計中具名列出）", start: "把釋放出的精力重導向你的目標", cont: "任何已經在產出成果或建立關係的事" },
            },
            {
              id: "path-d", title: "路徑 D：目標清晰化", subtitle: "你不知道你想要什麼",
              situation: "你不討厭你的工作。但你對未來不興奮。你沒有明確的方向。",
              priority: "把模糊的不滿轉化為具體的目標。",
              steps: [
                "誠實地回答三個問題：你想繼續做目前類型的工作嗎？你想留在目前的組織嗎？你想留在目前的位置嗎？",
                "畫出你理想的未來。想像兩年後你的工作生活。把所有東西寫下來。用第2節的5步驟流程把每個願望轉換成目標。",
                "選一個目標。從第一步開始。不要試著一次解決所有問題。這週採取第一個行動。",
              ],
              ssc: { stop: "漫無目的地漂流，等待事情自己改變", start: "回答上面三個問題，把一個願望轉換成一個目標", cont: "在你的目前角色表現良好，同時規劃你的下一步" },
            },
            {
              id: "path-e", title: "路徑 E：建立政治影響力", subtitle: "你知道你想要什麼",
              situation: "你有明確的目標。你沒有麻煩。你準備好增加你的影響力並採取下一步。",
              priority: "應用4個P來縮小你現在的位置和你想到達的位置之間的差距。",
              steps: [
                "對自己做4個P評估。對每一個P，誠實地回答診斷問題。",
                "先修你最弱的P。如果你的「否」答案集中在一個領域，從那裡開始。",
                "設定具體的90天行動。把你的評估轉換成一個停止/開始/繼續清單，加上90天的時間線。每月檢視你的進度。",
              ],
              ssc: { stop: "在你最弱的P領域中削弱你籌碼的行為", start: "改善你最弱的P領域的具體行動", cont: "你最強的P領域的優勢" },
            },
          ].map((path) => (
            <Collapsible key={path.id} title={path.title}>
              <div className="mt-3 text-sm space-y-4">
                <p className="text-muted-foreground"><strong className="text-foreground">你的處境：</strong>{path.situation}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">你的首要任務：</strong>{path.priority}</p>
                <div className="space-y-2">
                  {path.steps.map((step, i) => (
                    <div key={i} className="bg-background border border-border rounded-lg p-3">
                      <p className="text-muted-foreground text-sm"><strong className="text-foreground">步驟 {i + 1}：</strong>{step}</p>
                    </div>
                  ))}
                </div>
                {path.note && <p className="text-gold text-sm font-medium">{path.note}</p>}
                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground font-semibold text-sm mb-2">你的停止/開始/繼續：</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-destructive">停止：</strong>{path.ssc.stop}</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-green-400">開始：</strong>{path.ssc.start}</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-gold">繼續：</strong>{path.ssc.cont}</p>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Quick Reference / Cheat Sheet */}
      <section id="cheat-sheet" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📋</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">快速參考：職場政治速查表</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">組織生活的5個事實</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li>組織不是民主體制</li>
                <li>有些人比其他人有更多權力</li>
                <li>幾乎所有決定都是主觀的</li>
                <li>你的老闆掌控你大部分的生活</li>
                <li>公平是不可能的目標</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">4種政治類型</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>烈士</strong> - 幫助組織，傷害自己</li>
                <li><strong>反社會者</strong> - 幫助自己，傷害組織</li>
                <li><strong>笨蛋</strong> - 傷害自己也傷害組織</li>
                <li><strong>贏家</strong> - 幫助組織也幫助自己</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">7種籌碼加速器</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>成果</strong> - 交出有影響的成果</li>
                <li><strong>知識</strong> - 成為首選專家</li>
                <li><strong>態度</strong> - 成為人們想要合作的人</li>
                <li><strong>同理心</strong> - 理解他人的問題</li>
                <li><strong>人脈</strong> - 在內外部建立連結</li>
                <li><strong>包容</strong> - 讓他人參與你的決定</li>
                <li><strong>超然</strong> - 不要對批評反應過度</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">AMISH 模型</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>意識</strong> - 認識到有問題</li>
                <li><strong>動力</strong> - 接受你需要改變</li>
                <li><strong>辨識</strong> - 具體說明要改什麼</li>
                <li><strong>替代</strong> - 用好的行為替代壞的</li>
                <li><strong>習慣替換</strong> - 練習直到新行為成為習慣</li>
              </ol>
            </div>

            <div className="bg-executive-green rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">政治黃金法則</h3>
              <p className="text-cream/90 text-sm font-medium">永遠不要通過傷害公司或傷害他人來推進自己的利益。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">政治影響力的4個P</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>影響力評估</strong> - 評估你的籌碼位置</li>
                <li><strong>績效</strong> - 用 ROI 思維交出成果</li>
                <li><strong>感知</strong> - 讓決策者看到你的工作</li>
                <li><strong>夥伴關係</strong> - 建立擴展你影響力的聯盟</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Final Word */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">最後一句話</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">政治不是骯髒的。盲目地玩才是。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">這份指南中的框架有效。組織生活的5個事實。4種政治類型。7種籌碼加速器。8種遊戲。4個P。停止、開始、繼續。這些都是工具。使用它們。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">在工作中成功的人不是最有才華的。他們是最有覺察力的。他們看到遊戲。他們建立關係。他們交出成果，同時讓這些成果被看見。他們向上管理、橫向管理和向下管理。而且他們從不通過傷害公司或傷害他人來推進自己的利益。</p>
          <p className="text-foreground leading-relaxed font-medium">從第10節開始。找到你的路徑。寫你的計劃。這週採取第一步。</p>
        </div>
      </section>

      {/* Resources */}
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
            <h3 className="text-gold text-sm font-bold uppercase mb-3">這本書</h3>
            <p className="text-cream/80 text-sm italic mb-4">Secrets to Winning at Office Politics: How to Achieve Your Goals and Increase Your Influence at Work，Marie G. McIntyre 博士</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">延伸閱讀</h3>
            <ul className="space-y-1 text-cream/70 text-sm">
              <li>• <em>Emotional Intelligence</em>，Daniel Goleman</li>
              <li>• <em>The Seven Habits of Highly Effective People</em>，Stephen Covey</li>
              <li>• <em>Leading Quietly</em>，Joseph Badaracco</li>
              <li>• <em>Talking from 9 to 5</em>，Deborah Tannen</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/interview-prep-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">面試準備</p>
              <span className="text-gold text-sm font-medium">面試準備指南 →</span>
            </Link>
            <Link to="/zh-tw/resume-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">修改你的履歷</p>
              <span className="text-gold text-sm font-medium">履歷指南 →</span>
            </Link>
            <Link to="/zh-tw/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">薪資談判</p>
              <span className="text-gold text-sm font-medium">薪資入門包 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons isZhTw />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default OfficePoliticsGuideZhTw;