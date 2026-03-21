import { Clock, Linkedin, ChevronDown, Menu, Brain, Target, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
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
  { id: "five-types", label: "01 · 五種面試者類型" },
  { id: "four-steps", label: "02 · 四步驟框架" },
  { id: "logic-trees", label: "03 · 分解樹" },
  { id: "yes-no-trees", label: "04 · 是非樹" },
  { id: "hypothesis", label: "05 · 假設金字塔" },
  { id: "pros-cons", label: "06 · 正確的優缺點分析" },
  { id: "mushroom", label: "07 · 蘑菇戀人方法" },
  { id: "octopus", label: "08 · 章魚約翰方法" },
  { id: "mistakes", label: "09 · 五個面試錯誤" },
  { id: "in-action", label: "10 · 框架實戰" },
  { id: "toolkit", label: "快速參考" },
  { id: "practice", label: "如何練習" },
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

const ProblemSolvingGuideZhTw = () => {
  useTrackGuideProgress("problem-solving-zh");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="問題解決 101：讓你成功錄取的思考框架 | James Bugden"
        description="招募官的結構化思考面試指南。分解樹、是非樹、假設金字塔和四步驟框架。根據渡邊健介的《解決問題最簡單的方法》。"
        path="/zh-tw/problem-solving-guide"
      />

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
            問題解決 101：<br className="hidden sm:block" />讓你成功錄取的思考框架
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">根據渡邊健介的《解決問題最簡單的方法》</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden，職涯教練 · Uber 資深 Recruiter</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">60 分鐘閱讀</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            我審閱過超過 <strong>20,000 份履歷。</strong>我在 <strong>Uber</strong> 和 <strong>Netskope</strong> 等公司錄用了超過 <strong>500 人。</strong>
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            被錄取的求職者和沒被錄取的求職者，最大的差別是什麼？不是經驗。不是學歷。<strong>是他們的思考方式。</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            大多數求職者走進面試就開始即興發揮。他們聽到問題，就脫口說出腦海中第一個想到的東西。他們東拉西扯，希望能碰巧說中什麼。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            最好的求職者做的事不一樣。他們暫停。他們拆解問題。他們用有結構的方式大聲思考。然後才回答。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這種結構化的思考方式有個名字。它來自渡邊健介的<strong className="text-foreground">《解決問題最簡單的方法》</strong>（英文版：Problem Solving 101）。渡邊健介是前麥肯錫顧問，後來離開去教日本孩子如何解決問題。他的書成為<strong className="text-foreground">日本商業類暢銷書第一名。</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這本書中的工具，和顧問、商業領袖、以及我面試過最強的求職者所使用的工具完全一樣。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這份指南教你這些工具。你會學到如何在每一場面試中運用它們。你回答問題時會比 <strong className="text-foreground">95% 的其他求職者</strong>更清楚、更有結構、更有信心。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            不需要顧問背景。不需要 MBA。這些是簡單的工具。任何人都能學會。
          </p>

          <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6 mb-6">
            <p className="text-foreground text-sm leading-relaxed">
              <strong className="text-gold">以我錄用 500 人以上的經驗來說：</strong>當我面對一位用結構化方式思考的求職者，我在前 5 分鐘內就會注意到。他們之所以突出，是因為大多數人從來沒學過這件事。你即將學會。
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">這份指南包含什麼</h3>
            <ol className="space-y-2">
              {[
                "五種面試者類型。你是哪一種？（大多數人是混合型。）",
                "四步驟框架。每一個強大面試回答背後的核心流程。",
                "分解樹。如何把「你會如何……？」的問題拆成有結構的部分。",
                "是非樹。如何一步步帶面試官走過你的診斷過程。",
                "假設金字塔。如何回答「如果……你會怎麼做？」而不靠猜測。",
                "正確的優缺點分析。如何用真實標準回答「為什麼選我們？」和「為什麼選這個職位？」。",
                "蘑菇戀人方法。如何在你的回答和案例研究報告中使用數據。",
                "章魚約翰方法。如何用具體內容回答「你五年後看到自己在哪裡？」。",
                "五個面試錯誤。扼殺回答的錯誤，附帶修正前後對比。",
                "框架實戰。工程、營運、客服、業務和人員管理職位的完整標註範例。",
                "快速參考工具包。每個工具的一頁小抄，包含使用時機和關鍵句。",
                "如何練習。如何在下一次面試前演練這些工具。",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">{i + 1}</span><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Main content wrapper */}
      <main className="pb-0">

        {/* Section 1: 5 Types */}
        <section id="five-types" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="01" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">五種面試者類型</h2>
                <p className="text-muted-foreground text-lg">其中四種不會被錄取</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">渡邊健介在書中介紹了五種角色類型。每一種代表一種不同的解決問題方式。我每個禮拜都會在面試中看到這五種人。</p>

            <div className="grid gap-3">
              {[
                { type: "冷凍人", quote: "「我不知道……」", result: "未錄取", icon: "❄️", color: "border-destructive/30 bg-destructive/5" },
                { type: "抱怨者", quote: "「我老闆很糟糕……」", result: "未錄取", icon: "😤", color: "border-destructive/30 bg-destructive/5" },
                { type: "夢想家", quote: "「我想要創造影響力……」", result: "未錄取", icon: "💭", color: "border-destructive/30 bg-destructive/5" },
                { type: "衝衝衝", quote: "「所以我馬上就做了……」", result: "未錄取", icon: "🏃", color: "border-destructive/30 bg-destructive/5" },
                { type: "問題解決者", quote: "「首先，我找出了根本原因……」", result: "錄取", icon: "🧠", color: "border-green-500/30 bg-green-500/5" },
              ].map((item) => (
                <div key={item.type} className={`flex items-center gap-4 rounded-xl border p-4 ${item.color}`}>
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold text-sm">{item.type}</p>
                    <p className="text-muted-foreground text-sm italic truncate">{item.quote}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-bold uppercase px-3 py-1 rounded-full ${item.result === "錄取" ? "bg-green-500/20 text-green-600" : "bg-destructive/20 text-destructive"}`}>
                    {item.result}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">以下是從書中翻譯到面試間的版本。</p>

            {/* Type 1 */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">1. 冷凍人（書中的「藉口小子」）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">在書中，藉口小子一面對挑戰就放棄。她說「我永遠做不到」然後就停下來不嘗試了。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">在面試中，</strong>這是那種聽到困難問題就當機的求職者。他們說「我不知道」然後跳過。他們只給一句話的答案。他們迴避任何感覺有風險的東西。</p>
              <p className="text-destructive text-sm font-semibold mb-3">面試官想的是：「這個人在壓力下會崩潰。」</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「跟我說一個你面對模糊情境的經驗。」</p>
                <p className="text-muted-foreground text-sm italic">「嗯，我不太確定那個我有沒有好的例子。我是說，我上一份工作通常事情都蠻清楚的。我想有時候事情不太明確，但我想不起來具體的例子。抱歉。」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">這個回答讓評估結束了。面試官直接跳過你。你現在落後每一個其他求職者。</p>
            </div>

            {/* Type 2 */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">2. 抱怨者（書中的「批評小子」）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">在書中，批評小子指出每個人做錯的事，但他自己從來不做任何事。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">在面試中，</strong>這是那種整場面試都在講現職問題的求職者。爛主管。爛文化。爛系統。他們有一長串的抱怨，但<strong className="text-foreground">零個解決方案。</strong></p>
              <p className="text-destructive text-sm font-semibold mb-3">面試官想的是：「這個人到了這裡，事情出錯的時候也會怪所有其他人。」</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「你為什麼想離開現在的職位？」</p>
                <p className="text-muted-foreground text-sm italic">「老實說，領導層沒有願景。我的主管不給明確方向，然後專案落後就怪我們。流程都是壞的。我已經告訴他們一百次需要改什麼，但沒有人聽。我需要一個重視好想法的地方。」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">每一句都在指著別人。沒有一句話描述這個求職者做了什麼來解決問題。</p>
            </div>

            {/* Type 3 */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">3. 夢想家（書中的「空想小子」）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">在書中，空想小子有很大的想法但從不計畫如何實現它們。她滿足於只是想著她的夢想。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">在面試中，</strong>這是那種談論願景和策略但沒有任何具體內容的求職者。他們說「我想打造有意義的東西」或「我看到自己帶領一個團隊」之類的話。但當你問<strong className="text-foreground">怎麼做，</strong>他們什麼都沒有。</p>
              <p className="text-destructive text-sm font-semibold mb-3">面試官想的是：「很棒的想法。零執行力。」</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「你在前 90 天會做什麼？」</p>
                <p className="text-muted-foreground text-sm italic">「我會先想了解大方向。然後我會尋找增加價值的方式，並在組織中建立關係。我覺得最重要的是帶來全新的觀點，串連其他人遺漏的點。」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">聽起來很聰明。什麼都沒說。沒有具體內容。沒有計畫。沒有可衡量的行動。</p>
            </div>

            {/* Type 4 */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">4. 衝衝衝（書中的「衝動小子」）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">這一種會讓人驚訝。在書中，衝動小子不是懶惰。他很快跳入行動。他很努力工作。但他<strong className="text-foreground">從不停下來想一想</strong>自己是否跑對方向。</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">在面試中，</strong>這是那種直接跳到「這是我做的事」卻不解釋<strong className="text-foreground">為什麼</strong>這樣做的求職者。他們跳過思考。跳過診斷。直接進入行動。</p>
              <p className="text-destructive text-sm font-semibold mb-3">面試官想的是：「這個人會把事情做完，但他們知道為什麼嗎？他們會解決對的問題還是看起來很忙？」</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「跟我說一個你解決困難問題的經驗。」</p>
                <p className="text-muted-foreground text-sm italic">「我們的業績下降了，所以我馬上開始打更多電話。我把外展量增加了一倍。我每天加班到很晚。我早上六點就寄追蹤信。最後業績回來了，因為我比問題更努力。」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">很多努力。沒有診斷。沒有根本原因。沒有策略。業績大概是因為完全不同的原因回升。</p>
            </div>

            {/* Type 5 */}
            <div className="bg-card border border-green-500/20 rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">5. 問題解決者（書中的「解決問題小子」）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">在書中，解決問題小子做了其他人都沒做的事。他們<strong className="text-foreground">先了解狀況。</strong>他們<strong className="text-foreground">找到根本原因。</strong>他們<strong className="text-foreground">制定計畫。</strong>他們<strong className="text-foreground">執行。</strong>然後他們<strong className="text-foreground">檢查結果並調整。</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">在面試中，</strong>這是那種回答前先問釐清問題的求職者。把問題拆成幾個部分的人。一步一步解釋自己推理過程的人。用真實數字分享結果的人。告訴你他們學到什麼的人。</p>
              <p className="text-green-400 text-sm font-semibold mb-3">這就是我每次都會推薦錄取的求職者。</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「跟我說一個你解決困難問題的經驗。」</p>
                <p className="text-muted-foreground text-sm italic mb-2">「我們的業績在第三季下降了 20%。在做任何事之前，我把數據按區域、產品線和業務代表拆開來看。結果三個區域中有兩個沒問題。整個下降都來自東南區，在我們改變那裡的定價模型之後。」</p>
                <p className="text-muted-foreground text-sm italic mb-2">「我訪談了那個區域的五位業務代表和三位停止購買的客戶。根本原因不是努力不夠或競爭。客戶說新的定價層級太令人困惑，他們搞不清楚該買哪個方案。」</p>
                <p className="text-muted-foreground text-sm italic">「我和產品團隊合作，把六個選項簡化為三個。我們也為業務代表製作了一頁的比較表。六週內，東南區的業績恢復到上一季的 95%。」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">那個回答有診斷、根本原因、計畫、執行和帶數字的結果。那就是拿到錄取通知的回答。</p>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/50 px-5 py-3 border-b border-border">
                <p className="text-foreground text-sm font-semibold">同一個問題，五種不同的回答</p>
                <p className="text-muted-foreground text-xs italic">「跟我說一個你解決困難問題的經驗。」</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  { type: "冷凍人", answer: "「我想不到一個。」", bad: true },
                  { type: "抱怨者", answer: "「沒有人給我資源來解決它。」", bad: true },
                  { type: "夢想家", answer: "「我構想了一個更好的系統。」", bad: true },
                  { type: "衝衝衝", answer: "「我更努力工作直到解決了。」", bad: true },
                  { type: "問題解決者", answer: "「我診斷了根本原因，制定了計畫，執行它，然後衡量了結果。」", bad: false },
                ].map((item) => (
                  <div key={item.type} className={`flex items-center gap-3 px-5 py-3 ${item.bad ? "" : "bg-green-500/5"}`}>
                    {item.bad ? <XCircle className="w-4 h-4 text-destructive shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                    <span className="text-foreground text-sm font-medium w-24 shrink-0">{item.type}</span>
                    <span className="text-muted-foreground text-sm italic">{item.answer}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>你大概是這些類型的混合。這是正常的。目標是在你給出的每一個回答中，讓自己更接近<strong className="text-foreground">第五型。</strong>這份指南的其餘部分會告訴你具體怎麼做。</p>
            </div>
          </div>
        </section>

        {/* Section 2: 4-Step Framework */}
        <section id="four-steps" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="02" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">贏得面試的四步驟框架</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">渡邊健介整本書歸結為<strong className="text-foreground">四個步驟。</strong>他教的每一個工具都支持這個流程：</p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { step: "步驟一", title: "了解現況", phrase: "「讓我確認我理解你問的問題。」" },
                  { step: "步驟二", title: "找出根本原因", phrase: "「我把問題拆開，找到了真正的問題。」" },
                  { step: "步驟三", title: "制定行動計畫", phrase: "「以下是我做的事，以及為什麼選這個方法。」" },
                  { step: "步驟四", title: "執行監控調整", phrase: "「結果是 X。以下是我會做得不同的地方。」" },
                ].map((item) => (
                  <div key={item.step} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                    <p className="text-gold text-xs font-bold uppercase mb-1">{item.step}</p>
                    <p className="text-cream font-semibold text-sm mb-2">{item.title}</p>
                    <p className="text-cream/60 text-xs italic">{item.phrase}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">就是這樣。四個步驟。同樣的四個步驟適用於修復搖滾樂團的觀眾問題、存錢買電腦、或挑選巴西的學校。它們也適用於<strong className="text-foreground">回答任何面試問題。</strong></p>

            {/* Step 1 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">步驟一：了解狀況（先別回答）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">當面試官問你問題時，大多數求職者馬上就開始說話。問題解決者做相反的事。他們<strong className="text-foreground">先確認自己理解了這個問題。</strong></p>
              <ul className="space-y-2 mb-4">
                {["暫停 2 到 3 秒。整理你的想法。", "問一個釐清的問題，如果問題不夠明確。", "用自己的話重述問題。"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
                ))}
              </ul>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「你會怎麼改善我們的客戶留存率？」</p>
                <p className="text-muted-foreground text-sm italic">「在我回答之前，我想確認我用對的方式思考這個問題。你說的留存率，是指讓客戶在第一次購買後繼續留下，還是降低長期客戶的流失率？你是否知道最大的流失發生在哪裡？」</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">步驟二：找出根本原因（挖得比表面更深）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">大多數求職者給出表面層次的答案。「業績下降了，所以我打更多電話。」那是<strong className="text-foreground">衝動小子的回答。</strong>你跳過了診斷。</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">面試官：</strong>「跟我說一個你找到問題根本原因的經驗。」</p>
                <p className="text-muted-foreground text-sm italic">「我們的客服工單量在一個月內翻倍了。表面的解釋是『更多客戶，更多工單。』但我拉出數據，按類型分類工單。80% 的增長來自一個類別：帳單問題。我進一步深入。我們三週前推出了新的定價頁面。那個頁面有一個格式錯誤，顯示了錯誤的年費方案價格。客戶按一個價格註冊，卻被收了另一個價格。根本原因不是更多客戶。是壞掉的定價頁面。」</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">步驟三：制定行動計畫（展示你的思考過程）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">找到根本原因後，解釋你打算怎麼處理它。這是面試官看到你策略思考的地方。</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic">「一旦我確認根本原因是定價頁面的錯誤，我有三個選項。選項 A：立即恢復到舊的定價頁面。快速修復，但我們會失去新的設計改進。選項 B：修復新頁面上的格式錯誤。最好的長期方案，但需要開發團隊的幫助，而他們在衝刺期。選項 C：在等待開發修復的同時，加一個臨時橫幅說明正確價格。我選了組合方案。我推動開發團隊做緊急修復，因為這是影響營收的 bug。同時，我加了一個臨時橫幅，讓客戶在修復上線前的 24 小時內不會被搞混。」</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">步驟四：執行並調整（分享結果和教訓）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">這是你畫上句號的地方。<strong className="text-foreground">分享發生了什麼。</strong>盡量用真實數字。然後<strong className="text-foreground">分享你學到了什麼。</strong></p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic">「開發團隊在 24 小時內修好了頁面。客服工單一週內恢復正常。我們也退款給 340 位被多收費的客戶，這讓那群客戶的留存率比我們的平均值高了 15%。他們很感謝我們發現了錯誤並做出補救。我從中學到的教訓是：每次我們更改面向客戶的頁面，現在都會專門針對定價準確性做 QA 檢查。那一個流程改變，之後已經防止了兩次類似的錯誤。」</p>
              </div>
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我錄用 500 人以上的經驗來說：</strong>這個四步驟框架對應到大多數面試教練教的 <strong className="text-foreground">STAR 方法</strong>（情境、任務、行動、結果）。但它走得更遠。STAR 方法告訴你要<strong className="text-foreground">包含什麼。</strong>渡邊健介的框架教你<strong className="text-foreground">如何思考</strong>每一個部分。這就是背誦式答案和真正強大答案之間的差別。</p>
            </div>
          </div>
        </section>

        {/* Section 3: Logic Trees */}
        <section id="logic-trees" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="03" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">分解樹：如何拆解任何面試問題</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">分解樹</strong>是一個視覺工具，幫助你把大問題拆成小塊。你從左邊一個問題開始，往右邊分出分支，從寬泛到具體。</p>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6 overflow-x-auto">
              <p className="text-xs font-bold text-gold uppercase tracking-wider mb-4">分解樹：胡椒罐</p>
              <div className="flex items-stretch gap-0 min-w-[500px]">
                <div className="flex items-center shrink-0">
                  <div className="bg-executive-green text-cream text-xs font-semibold px-4 py-3 rounded-lg text-center leading-snug">
                    如何讓一次搖<br />出更多胡椒？
                  </div>
                  <div className="w-6 h-px bg-gold/40" />
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-l border-gold/30 h-6 rounded-tl-lg" />
                    <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">增加頂面的面積</div>
                  </div>
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-gold/30" />
                    <div className="flex items-center gap-0">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">增加表面積搖出的胡椒量</div>
                      <div className="w-4 h-px bg-gold/30" />
                      <div className="flex flex-col gap-1">
                        <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">每個面積更多孔</div>
                        <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">更大的孔</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-b border-l border-gold/30 h-6 rounded-bl-lg" />
                    <div className="flex items-center gap-0">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">讓胡椒更容易出來</div>
                      <div className="w-4 h-px bg-gold/30" />
                      <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">更小的胡椒粒</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">一個問題產生四個不同的解決方案。「搖更大力」根本不在清單上。這就是分解樹的力量。</p>

            <h3 className="font-heading text-xl text-foreground mb-4">如何在面試中使用分解樹</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">大多數面試中你不會在白板上畫樹。但你會<strong className="text-foreground">用同樣的思考模式大聲說出來。</strong>當面試官問<strong className="text-foreground">「你會如何改善 X？」</strong>時，這樣做：</p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
              <li><strong className="text-foreground">把問題拆成</strong> 2 到 3 個主要類別。</li>
              <li><strong className="text-foreground">在每個類別下，</strong>列出 1 到 2 個具體想法。</li>
              <li><strong className="text-foreground">解釋</strong>你會先處理哪個分支以及為什麼。</li>
            </ol>

            <Collapsible title="範例：改善新人到職流程的分解樹">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會用三個面向來思考這件事。第一，<strong className="text-foreground not-italic">到職前溝通。</strong>新人在第一天之前是否有得到足夠的資訊？像是歡迎包、工具權限、指派的夥伴。第二，<strong className="text-foreground not-italic">第一週體驗。</strong>行程是有結構的還是混亂的？大多數公司在第一週塞滿文書，卻跳過關係建立。第三，<strong className="text-foreground not-italic">前 90 天的持續支援。</strong>有沒有夥伴制度或主管的定期確認？」</p>
                <p className="italic">「以我看到的情況，最大的流失發生在第二個面向。新人在前 5 天就形成了對公司的看法。我會從建立一個有結構的第一週行程開始，平衡到職任務和認識團隊。」</p>
              </div>
            </Collapsible>

            <Collapsible title="範例：你會如何增加營收？">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會把營收成長拆成三個面向。獲得更多客戶、從每位客戶身上獲得更多營收、或讓客戶留更久。每一個都有不同的操作方式。在選定方向之前，我想先知道最大的缺口在哪裡。如果你的轉換率是 1% 但留存率是 95%，我會專注在轉換。如果留存率是 70%，那就是錢正在流失的地方。」</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">什麼時候使用分解樹</h3>
            <ul className="space-y-2 mb-6">
              {["「你會如何處理這個問題？」", "「你在前 90 天會做什麼？」", "「你會如何增加這個產品的營收？」", "「你會考慮哪些因素？」", "任何要求你解決、改善或規劃某件事的問題。"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">各職位的分解樹</h3>
            <div className="space-y-3">
              {[
                { role: "工程", q: "你會如何降低頁面載入時間？", a: "「我會拆成三個層。第一，網路層。我們有沒有優化資產傳遞？CDN、壓縮、快取標頭。第二，後端層。API 呼叫是否緩慢？資料庫查詢、伺服器回應時間、傳送了不必要的數據。第三，前端層。我們的渲染效率高嗎？打包大小、延遲載入、阻塞腳本。我會先測量每一層。如果後端在 100 毫秒內回應，但前端需要 3 秒來渲染，我會專注在前端。」" },
                { role: "營運", q: "你會如何減少出貨錯誤？", a: "「我會把出貨錯誤拆成三個類別。第一，揀貨錯誤。從架上拿了錯誤的商品。第二，包裝錯誤。拿對了商品但數量錯誤或貼了錯誤的地址標籤。第三，系統錯誤。訂單管理系統傳送了不正確的資訊到倉庫。每一種有不同的修復方式。我會拉出過去 3 個月的錯誤報告，分類它們，然後先專注在最大的桶子。」" },
                { role: "客戶服務", q: "你會如何減少重複來電？", a: "「我會把重複來電分成三個桶子。第一，未解決的問題。客戶回電是因為第一次沒解決他們的問題。第二，溝通不清楚。問題解決了，但客戶不了解結果。第三，反覆發生的問題。同一個問題不斷發生。每個桶子需要不同的解決方案。」" },
                { role: "業務", q: "你會如何縮短銷售週期？", a: "「我會把銷售週期按階段拆開，找出哪一個耗時最長。第一，從潛在客戶到第一次會議。第二，從第一次會議到提案。第三，從提案到成交。以我的經驗，最大的時間消耗通常在提案到成交之間。交易卡在等待客戶端的內部審批。我會專注在給支持者內部銷售的工具：ROI 計算器、高層摘要和參考電話。」" },
                { role: "人員管理者", q: "你會如何提升團隊生產力？", a: "「我會把生產力拆成三個領域。第一，清晰度。每個人都知道自己該做什麼嗎？第二，容量。工作量合理嗎？第三，能力。人們有做好工作所需的技能和工具嗎？大多數主管直接跳到能力。以我的經驗，問題通常在清晰度或容量。」" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}：「${item.q}」`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>當求職者在回答前先把問題分成幾個類別，我會在筆記上寫下<strong className="text-foreground">「結構化思考者」。</strong>單單那個標籤就能讓求職者在流程中向前推進。那是招募官能給的最高讚美之一。</p>
            </div>
          </div>
        </section>

        {/* Section 4: Yes/No Trees */}
        <section id="yes-no-trees" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="04" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">是非樹：大聲診斷問題</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">是非樹</strong>根據是或否的問題，把人或事物分到不同的桶子裡。每個答案通向一個桶子（解釋）或另一個問題。</p>

            <div className="bg-card border border-border rounded-xl p-6 md:p-8">
              <p className="text-xs font-bold text-gold uppercase tracking-wider mb-6">是非樹：蘑菇戀人演唱會出席</p>
              <div className="flex flex-col items-center">
                <div className="bg-executive-green text-cream text-sm font-semibold px-6 py-3.5 rounded-xl text-center">全校 500 位<br />師生</div>
                <div className="w-px h-8 bg-gold/40" />
                <div className="border border-border rounded-xl px-5 py-3 text-center text-sm text-foreground font-medium bg-muted/50">他們知道演唱會的事嗎？</div>
                <div className="flex w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-green-600 mb-2">是</span>
                    <div className="w-px h-6 bg-gold/40" />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-destructive mb-2">否</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-center">
                      <p className="text-foreground text-sm font-bold">350 人 <span className="text-muted-foreground font-normal">(70%)</span></p>
                      <p className="text-muted-foreground text-xs mt-0.5">「不知道」</p>
                    </div>
                  </div>
                </div>
                <div className="border border-border rounded-xl px-5 py-3 text-center text-sm text-foreground font-medium bg-muted/50 mt-2">他們有來過嗎？</div>
                <div className="flex w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-green-600 mb-2">是</span>
                    <div className="w-px h-6 bg-gold/40" />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-destructive mb-2">否</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-center">
                      <p className="text-foreground text-sm font-bold">135 人 <span className="text-muted-foreground font-normal">(27%)</span></p>
                      <p className="text-muted-foreground text-xs mt-0.5">「知道但從沒來過」</p>
                    </div>
                  </div>
                </div>
                <div className="border border-border rounded-xl px-5 py-3 text-center text-sm text-foreground font-medium bg-muted/50 mt-2">他們固定來嗎？</div>
                <div className="flex w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-green-600 mb-2">是</span>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-xl px-4 py-3 text-center">
                      <p className="text-foreground text-sm font-bold">12 人 <span className="text-muted-foreground font-normal">(2%)</span></p>
                      <p className="text-muted-foreground text-xs mt-0.5">「忠實粉絲」</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-6 bg-gold/40" />
                    <span className="text-sm font-bold text-destructive mb-2">否</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-xl px-4 py-3 text-center">
                      <p className="text-foreground text-sm font-bold">3 人 <span className="text-muted-foreground font-normal">(1%)</span></p>
                      <p className="text-muted-foreground text-xs mt-0.5">「來過一次就不來了」</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">這幫助他們精確定位問題出在哪裡。不是知名度（他們假設的）。<strong className="text-foreground">是轉換率</strong>（真正的問題）。知道演唱會的人中有 90% 從來沒去過。那才是要修的桶子。</p>

            <Collapsible title="完整範例：客戶流失診斷">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我們的客戶流失率在一個季度內從 <strong className="text-foreground not-italic">5% 飆升到 12%。</strong>我需要搞清楚我們在哪裡流失客戶。」</p>
                <p className="italic">「第一個問題：我們是在免費試用階段流失客戶，還是在他們成為付費客戶之後？我查了數據。<strong className="text-foreground not-italic">答案：付費客戶。</strong>試用轉換是穩定的。所以問題不在獲客。」</p>
                <p className="italic">「下一個：他們是在第一個月內取消還是幾個月後？<strong className="text-foreground not-italic">答案：第一個月。</strong>所以問題在早期體驗，不是長期價值。」</p>
                <p className="italic">「下一個：他們取消前有聯繫客服嗎，還是無聲離開？<strong className="text-foreground not-italic">答案：90% 無聲離開。</strong>他們甚至沒有嘗試尋求幫助。」</p>
                <p className="italic">「這告訴我根本原因是<strong className="text-foreground not-italic">新付費客戶的到職體驗。</strong>他們不知道如何快速從產品中獲得價值。所以我建立了一個 7 天到職電子郵件序列，配合引導式設定清單。第一個月的流失率在兩個月內從 12% 降回 6%。」</p>
              </div>
            </Collapsible>

            <Collapsible title="完整範例：排查技術問題">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我們的應用程式載入時間一夜之間翻倍了。我需要快速找到原因。」</p>
                <p className="italic">「它影響所有使用者還是一部分？<strong className="text-foreground not-italic">所有使用者。</strong>所以不是特定裝置。它影響所有頁面還是特定頁面？<strong className="text-foreground not-italic">所有頁面。</strong>所以不是單一功能。它從特定時間開始嗎？<strong className="text-foreground not-italic">是的，週二凌晨 2 點。</strong>週二凌晨 2 點部署了什麼？<strong className="text-foreground not-italic">一個資料庫遷移。</strong>那就是根本原因。遷移加了一個索引，本應加速查詢，但在每次查詢時都執行全表掃描。」</p>
                <p className="italic">「我們回滾了遷移，載入時間恢復正常，資料庫團隊重新設計了索引後再重新部署。」</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">各職位的是非樹</h3>
            <div className="space-y-3">
              {[
                { role: "工程", q: "除錯正式環境問題", a: "「我們的付款處理有大約 5% 的交易開始失敗。第一：是所有付款方式都受影響還是一種？一種。只有信用卡。下一個：是所有信用卡還是特定卡種？只有 Visa。下一個：是所有 Visa 交易還是特定區域？只有帳單地址在美國以外的交易。根本原因：我們的付款閘道推送了一個更新，改變了 Visa 國際地址驗證的方式。我和閘道供應商協調回滾驗證變更。失敗率在 24 小時內從 5% 降回 0.1%。」" },
                { role: "營運", q: "找到品質問題來源", a: "「我們的產品退貨率在一個月內從 2% 飆升到 8%。第一：是所有產品還是特定 SKU？三個 SKU。都在同一個產品線。下一個：退貨來自所有倉庫還是一個？一個倉庫。我們的達拉斯設施。下一個：是所有班次還是特定班次？只有夜班。我去了達拉斯設施。兩週前安裝了一台新的包裝機。它校準不正確，封箱太鬆。我們重新校準了機器，退貨率在兩週內降回 1.5%。」" },
                { role: "客戶服務", q: "客戶滿意度為什麼下降", a: "「我們的 CSAT 分數在兩個月內從 87% 降到 71%。第一：是所有渠道都下降還是一個？電話穩定。線上客服下降了。下一個：是所有問題類型都下降還是特定的？只有帳務相關的線上客服。下一個：是否和任何變更同時發生？是的。我們兩個月前推出了新的帳務聊天機器人。聊天機器人要求客戶重新輸入他們已經打過的資訊。我和產品團隊合作，把聊天機器人的對話歷史傳給客服。帳務線上客服的 CSAT 在一個月內恢復到 83%。」" },
                { role: "業務", q: "交易為什麼停滯", a: "「我的銷售管道中有 200 萬美元的交易已經在『提案已發送』階段停了超過 30 天。第一：是所有交易規模都停滯還是特定的？只有超過 5 萬美元的交易。下一個：是所有產業還是一個？跨產業。下一個：它們卡在審批流程的哪裡？在支持者說了同意之後，但在採購批准之前。我打電話給 5 位支持者。他們都說採購需要一份 ROI 論證文件。我建立了一份標準化的 ROI 模板。從提案到成交的平均時間從 45 天降到 22 天。」" },
                { role: "人員管理者", q: "團隊為什麼表現不佳", a: "「我的團隊的衝刺速度在三個衝刺週期中下降了 30%。第一：是所有團隊成員還是特定的？六人中有三人下降了。下一個：那三人有什麼共同點？是的。他們三人都在一個新的跨職能專案上。下一個：那個專案是增加到他們的工作量還是取代現有工作？增加。沒有人移除他們現有的衝刺承諾。根本原因是容量，不是績效。我和專案負責人合作，減少他們的衝刺承諾。速度在兩個衝刺週期內恢復到 95%。」" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}：${item.q}`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>我面試過最好的求職者都會做某種版本的這件事。他們不會說「問題是 X。」他們會帶我走過<strong className="text-foreground">他們是怎麼搞清楚</strong>問題是 X 的。診斷過程比解決方案更令人印象深刻。</p>
            </div>
          </div>
        </section>

        {/* Section 5: Hypothesis Pyramid */}
        <section id="hypothesis" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="05" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">假設金字塔：不要急著下結論</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">假設</strong>是一種預感。它是你在確認之前認為答案是什麼。渡邊健介的重大教訓：<strong className="text-foreground">陳述你的假設，解釋你的推理，然後測試它。</strong></p>
            <p className="text-muted-foreground leading-relaxed mb-6">大多數人跳過測試的部分。他們把第一個直覺當成事實就跑了。</p>

            <h3 className="font-heading text-lg text-foreground mb-4">如何在面試中使用假設金字塔</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
              <li><strong className="text-foreground">陳述你的假設。</strong>「我的第一直覺是問題是 X。」</li>
              <li><strong className="text-foreground">解釋你的推理。</strong>「我這麼想是因為 A、B 和 C。」</li>
              <li><strong className="text-foreground">解釋你會如何測試。</strong>「在我投入那個方法之前，我會先確認 D 和 E。」</li>
            </ol>

            <Collapsible title="範例：產品上市表現不佳">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我最初的假設會是定位沒有和目標受眾產生共鳴。我會這麼想是因為流量數字強勁但轉換率低。人們有看到它但沒有購買。」</p>
                <p className="italic">「但我不會馬上按照那個假設行動。我會透過檢視到達頁面的分析數據、確認漏斗中的流失點、以及和 5 到 10 位瀏覽過但沒有購買的客戶談話來測試。」</p>
                <p className="italic">「如果數據確認了我的假設，我會重新設計訊息傳達。如果不是，我會把定價或產品市場適配度作為替代解釋來檢視。」</p>
              </div>
            </Collapsible>

            <Collapsible title="範例：員工敬業度分數下降">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我的假設是下降和最近的組織變動有關。我們兩個月前做了組織重整，以我的經驗，重整後敬業度會下降，因為人們對自己的角色感到不確定。」</p>
                <p className="italic">「要測試這一點，我會按部門看數據。如果下降集中在被重整的團隊，我的假設成立。如果是全面性的，原因就是其他東西。」</p>
              </div>
            </Collapsible>

            <Collapsible title="範例：重要客戶威脅要離開">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我的假設是客戶有一個未解決的問題，已經累積了一段時間。客戶很少因為單一事件就離開。通常是一個模式。」</p>
                <p className="italic">「我會透過檢視過去 6 個月的溝通記錄、客服工單和會議紀錄來測試。我也會直接打電話給客戶，問：『需要改變什麼才能讓你有信心繼續和我們合作？』」</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">各職位的假設金字塔</h3>
            <div className="space-y-3">
              {[
                { role: "工程", q: "微服務拋出間歇性錯誤", a: "「我的假設是這是資源競爭問題，而不是程式碼 bug。在本地無法重現的間歇性錯誤通常和基礎設施有關：記憶體限制、連線池耗盡、或在負載下的競爭條件。我會透過檢查三件事來測試。第一，錯誤發生期間服務的記憶體和 CPU 指標。第二，資料庫連線池使用率。第三，錯誤是否和流量高峰相關。」" },
                { role: "營運", q: "關鍵供應商錯過交貨期限", a: "「我的假設是這是他們那邊的產能問題，而不是一次性的失誤。錯過期限的供應商通常是在發出信號，需求已經超過了他們的生產能力。短期，我會和他們談判一個有具體日期的恢復計畫。長期，我會評估是否需要第二個供應商。」" },
                { role: "客戶服務", q: "來電量突然翻倍", a: "「我的假設是有什麼特定的事情觸發了它。來電量不會隨機翻倍。我會透過查看過去 48 小時發生了什麼來測試，並拉出來電原因代碼。如果 60% 的新來電是關於同一個主題，那就是觸發因素。」" },
                { role: "業務", q: "勝率突然下降", a: "「我的假設是競爭環境或我們自己的銷售流程中有什麼改變了，而不是團隊一夜之間變差了。我會透過查看失敗交易數據和聽 10 通最近的失敗交易通話錄音來測試。」" },
                { role: "人員管理者", q: "多個團隊成員同時遞出辭呈", a: "「我的假設是有一個共同的根本原因。當多人同時離開，這很少是巧合。我會做誠實的離職對話，看 2 到 3 個月前有什麼改變。」" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}：${item.q}`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>當求職者說「我認為問題是 X，以下是我會如何驗證」，我知道他們在工作中不會做衝動的決定。那一句話傳達出<strong className="text-foreground">成熟、謙遜和強大的判斷力。</strong>這很少見。用起來吧。</p>
            </div>
          </div>
        </section>

        {/* Section 6: Pros & Cons Done Right */}
        <section id="pros-cons" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="06" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">正確的優缺點分析</h2>
                <p className="text-muted-foreground text-lg">如何回答「為什麼選我們？」和「為什麼選這個職位？」</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">在書中，足球少女奇異果要在巴西兩所學校之間做選擇。她差點選錯了。為什麼？她用了<strong className="text-foreground">錯誤的標準</strong>來比較。她過度重視不重要的事（地點、網站設計），卻低估了重要的事（教練品質、上場時間、文化沉浸）。</p>

            <h3 className="font-heading text-lg text-foreground mb-4">渡邊健介的標準與評估方法</h3>
            <div className="space-y-2 mb-6">
              {["步驟一：列出你的選項。", "步驟二：定義你的評估標準。", "步驟三：按重要性為每個標準加權（高、中、低）。", "步驟四：根據加權標準為每個選項評分。", "步驟五：選擇最具吸引力的選項。"].map((item, i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-3">
                  <p className="text-foreground text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>

            <Collapsible title="範例：「你為什麼想在這裡工作？」">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">弱回答：</strong><span className="italic">「我很喜歡你們的品牌。使命和我產生共鳴，我覺得文化很棒。」</span></p>
                <p><strong className="text-green-400">強回答：</strong><span className="italic">「我根據目前對我最重要的三個標準來評估這個職位。第一，在規模化問題上工作的機會。你們的團隊服務 5000 萬月活用戶。第二，團隊結構。你們的團隊讓成員負責端到端的專案。第三，成長軌跡。這個職位直接對應到我 3 年後想到達的地方。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="範例：「你為什麼選我們而不是 X 公司？」">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我根據三個標準評估了兩個機會。第一，職位範圍。你們的職位負責完整漏斗。第二，我會從中學習的團隊。第三，交付速度。你們每週部署。另一家公司按季度交付。以我目前的職涯階段，我需要快速的回饋循環。」</p>
              </div>
            </Collapsible>

            <Collapsible title="範例：「你為什麼選擇你目前的方法而不是其他替代方案？」">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我有兩個選項。選項 A 是從頭重建系統。選項 B 是修補現有系統。我根據三個標準評估：實施時間、破壞現有功能的風險、以及長期可維護性。考慮到我們有一個 4 週的硬性截止日，我選了選項 B。但我記錄了技術債，並安排了第二季的重建。」</p>
              </div>
            </Collapsible>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>我總是能分辨求職者做了深入研究還是表面研究。表面研究者說「我很喜歡你們的文化。」深入研究者說「我和你們團隊的兩個人聊過，他們都提到了每週回饋會議。那正是我做出最佳表現的環境。」其中一個答案會拿到錄取。<strong className="text-foreground">猜猜是哪一個。</strong></p>
            </div>
          </div>
        </section>

        {/* Section 7: Mushroom Lovers Method */}
        <section id="mushroom" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="07" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">蘑菇戀人方法</h2>
                <p className="text-muted-foreground text-lg">在面試和案例研究報告中使用數據</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">這一節是書中框架<strong className="text-foreground">最直接有用</strong>的地方。蘑菇戀人的演唱會出席故事是一個完整的案例研究。<strong className="text-foreground">如果你在面試中需要做案例研究報告，這就是你的藍圖。</strong></p>

            <h3 className="font-heading text-lg text-foreground mb-4">七部分案例研究結構</h3>
            <div className="space-y-3 mb-8">
              {[
                { part: "第一部分", title: "清楚定義問題", desc: "用具體、可衡量的術語陳述。差：「公司需要更多客戶。」好：「過去兩個季度，每月新客戶獲取量下降了 25%，從每月 800 人降到 600 人。」" },
                { part: "第二部分", title: "列出所有可能的原因", desc: "使用分解樹。把問題分成分支。展示你已經考慮了所有角度。" },
                { part: "第三部分", title: "陳述你的假設", desc: "清楚說明你認為問題是什麼以及為什麼。" },
                { part: "第四部分", title: "展示數據收集和分析", desc: "解釋你收集了什麼數據或會收集什麼數據。解釋它顯示了什麼。" },
                { part: "第五部分", title: "將假設與現實比較", desc: "展示你測試了你的假設。這是區分好的分析師和優秀分析師的地方。" },
                { part: "第六部分", title: "推薦解決方案並排優先順序", desc: "使用影響力 vs. 執行難度矩陣。高影響力 + 容易 = 立即做。高影響力 + 困難 = 下一季做。" },
                { part: "第七部分", title: "展示預期結果", desc: "用預測結果收尾。使用真實或估計的數字。" },
              ].map((item) => (
                <div key={item.part} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                  <span className="text-gold font-heading text-sm font-bold whitespace-nowrap">{item.part}</span>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-lg text-foreground mb-4">蘑菇戀人原則適用於所有面試回答</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">即使你不是在做正式的案例研究，這個原則適用於每一個行為面試回答：<strong className="text-foreground">帶上數據。</strong></p>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 text-xs font-bold uppercase tracking-wider">
                <div className="px-5 py-3 bg-destructive/10 text-destructive border-b border-border">❌ 模糊</div>
                <div className="px-5 py-3 bg-green-500/10 text-green-600 border-b border-l border-border">✅ 具體</div>
              </div>
              {[
                { vague: "「我改善了流程。」", specific: "「我把處理時間從 5 天降到 2 天。」" },
                { vague: "「我們擴大了團隊。」", specific: "「我們在 8 個月內從 4 人增加到 12 人。」" },
                { vague: "「客戶滿意度提高了。」", specific: "「NPS 在一個季度內從 32 上升到 61。」" },
                { vague: "「我增加了業績。」", specific: "「我把銷售管道增加了 35%，第四季成交 210 萬美元。」" },
                { vague: "「我為公司省了錢。」", specific: "「我重新談判了 3 份供應商合約，每年節省 18 萬美元。」" },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-border last:border-b-0">
                  <div className="px-5 py-3 text-muted-foreground text-sm italic">{row.vague}</div>
                  <div className="px-5 py-3 text-foreground text-sm font-medium border-l border-border">{row.specific}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>我在每場面試中都保持一個心理記分卡。當求職者使用具體數字時，我會在筆記中圈出那個回答。在面試中使用 <strong className="text-foreground">3 個或更多具體指標</strong>的求職者被推薦的比率是那些一個都沒用的求職者的<strong className="text-foreground">兩倍。</strong>這不是猜測。這是我在 500 次以上錄用中觀察到的。</p>
            </div>
          </div>
        </section>

        {/* Section 8: John Octopus Method */}
        <section id="octopus" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="08" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">章魚約翰方法</h2>
                <p className="text-muted-foreground text-lg">在面試中展示目標設定</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">面試官喜歡問<strong className="text-foreground">「你五年後看到自己在哪裡？」</strong>和<strong className="text-foreground">「你的職涯目標是什麼？」</strong>大多數求職者給出夢想家式的回答。「我想在領導職位上。」這些答案聽起來不錯，但什麼都沒說。</p>

            <p className="text-muted-foreground leading-relaxed mb-6">在書中，章魚約翰想買一台電腦。他第一個目標陳述很弱：「我想要一台電腦。」<strong className="text-foreground">一個真正的目標要回答三個問題：</strong></p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { q: "1. 具體要什麼？", a: "500 美元二手 Apple" },
                  { q: "2. 什麼時候？", a: "六個月內" },
                  { q: "3. 什麼條件？", a: "不借錢" },
                ].map((item) => (
                  <div key={item.q} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                    <p className="text-gold text-xs font-bold uppercase mb-1">{item.q}</p>
                    <p className="text-cream font-semibold text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <Collapsible title="「你五年後看到自己在哪裡？」">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">弱回答：</strong><span className="italic">「我看到自己在一個領導角色。」</span></p>
                <p><strong className="text-green-400">強回答：</strong><span className="italic">「在接下來的 2 年，我想成為團隊中數據分析的核心人物。我想端到端地負責至少一個主要專案。到了第 3 年，我想開始指導較新的團隊成員。到第 5 年，我想帶領一個小團隊或負責一個主要工作流。」</span></p>
                <p className="italic">「我目前和目標之間的差距主要在兩個方面：專案領導經驗和人員管理技能。這個職位填補了第一個差距。我計畫透過志願參加導師計畫和跨職能專案來填補第二個。」</p>
              </div>
            </Collapsible>

            <Collapsible title="「你為什麼在找新工作？」（差距分析）">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">弱回答（抱怨者）：</strong><span className="italic">「我現在的公司毫無前途。沒有成長空間。我的主管不支持我。」</span></p>
                <p><strong className="text-green-400">強回答（差距分析）：</strong><span className="italic">「我的目標是在全球規模的問題上工作。我目前的角色專注在單一市場。我和目標之間的差距是國際經驗和跨市場策略。你們的團隊在 15 個國家運作。那正是我需要填補的差距。」</span></p>
              </div>
            </Collapsible>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">以我的經驗來說：</strong>當求職者把職涯轉換解釋為填補一個具體差距時，它告訴我兩件事。第一，他們對自己的職涯是有意圖的。第二，他們不會一時衝動就離開這個職位。他們是有原因來的。這兩個信號都讓我更有信心推薦他們。</p>
            </div>
          </div>
        </section>

        {/* Section 9: 5 Interview Mistakes */}
        <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="09" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">問題解決者永遠不會犯的 5 個面試錯誤</h2>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { num: "1", title: "在理解問題之前就回答", bad: "「跟我說一個你領導的專案。」求職者馬上開始講故事，沒有問面試官關心哪種類型的專案。", good: "「你說的『專案』，你是在找一個技術專案、跨職能計畫、還是我領導人員的經驗？三種我都有例子，我想給你最相關的那個。」" },
                { num: "2", title: "治療症狀而不是根本原因", bad: "「我們的團隊很慢，所以我推動每個人更努力工作。」", good: "「我們的團隊很慢。我深入數據，發現 70% 的延遲來自一個瓶頸：等待設計審查。設計師們不是慢。他們是超載了，因為他們同時支援三個團隊。我提議為我們的團隊配置一位專屬設計師。交付時間下降了 60%。」" },
                { num: "3", title: "沒有測試你的假設", bad: "「客戶不開心，所以我重新設計了產品。」", good: "「我有個預感客戶對產品不滿意。在重新設計任何東西之前，我拉了 NPS 數據，檢視了客服工單，並訪談了 10 位客戶。結果他們很喜歡產品。他們不滿的是帳務體驗。修復比全面重新設計小得多。」" },
                { num: "4", title: "面試官想看你的思考過程時只給一個方案", bad: "「所以我把報表自動化了。」", good: "「我考慮了三個選項。選項 A：完全自動化報表。選項 B：簡化報表模板。選項 C：取消報表，用儀表板取代。我選了選項 C，因為這份報表只有兩個人在看，他們告訴我他們想要即時數據，不是每週的 PDF。」" },
                { num: "5", title: "做決定時沒有加權標準", bad: "「感覺是對的選擇。」", good: "「我根據三個標準評估了兩家供應商：整合速度、持續成本和客服回應速度。供應商 A 比較便宜，但需要 6 週的整合時間。供應商 B 貴了 20%，但一週內就能整合，而且有全天候客服。考慮到我們緊迫的截止日，我把速度和支援的權重設得比成本高，選了供應商 B。」" },
              ].map((mistake) => (
                <div key={mistake.num} className="bg-card border border-border rounded-xl p-5 md:p-6">
                  <h3 className="font-heading text-base text-foreground mb-3">錯誤 {mistake.num}：{mistake.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm italic">{mistake.bad}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm italic">{mistake.good}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: Framework in Action */}
        <section id="in-action" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="10" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">框架實戰：各職位的範例</h2>
                <p className="text-muted-foreground text-lg">使用完整四步驟流程的標註範例</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">這份指南中的每一個工具都適用於每一種職位。但語言會因為你面試的是工程、營運、客服、業務還是管理職位而改變。每個範例都使用完整的四步驟流程。</p>

            {/* Engineering */}
            <Collapsible title="工程：解決複雜技術問題">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[步驟一 - 了解]</strong> <span className="italic">「我們的 API 回應時間在兩週內從 200 毫秒跳到 1.2 秒。團隊表面上的假設是我們需要擴展伺服器。」</span></p>
                <p><strong className="text-gold">[步驟二 - 根本原因]</strong> <span className="italic">「在那樣做之前，我想了解根本原因。我把問題拆成三個領域：資料庫查詢、應用程式邏輯和網路延遲。我在每一層做了追蹤。整個飆升完全在應用程式層。」</span></p>
                <p><strong className="text-gold">[步驟二 - 根本原因（深入）]</strong> <span className="italic">「我進一步縮小範圍。一個端點占了 85% 的惡化。那個端點在兩週前被修改過。新代碼對列表中的每個項目都呼叫了一個外部服務的巢狀迴圈。」</span></p>
                <p><strong className="text-gold">[步驟三 - 行動計畫]</strong> <span className="italic">「我有兩個選項。選項 A：為外部服務呼叫加入快取。實施快速但會提供過期數據。選項 B：重構代碼，把外部呼叫批量處理。更乾淨但代碼改動更大。我選了選項 B，因為數據準確性很重要。」</span></p>
                <p><strong className="text-gold">[步驟四 - 結果]</strong> <span className="italic">「回應時間降回 180 毫秒，比原始基準線還好。新的 CI 效能測試之後已經標記了三次潛在的退化，全部在進入正式環境前被攔截。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="工程：設計處理 10 倍流量的系統">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會把這拆成三個領域。第一，找到瓶頸。系統在 10 倍負載下最先在哪裡崩潰？我會在設計任何東西之前先跑負載測試。第二，評估瓶頸的選項。如果是資料庫：讀取副本、快取或分片。如果是應用程式層：水平擴展、非同步處理。第三，按影響力和風險排優先順序。加一個快取層是高影響力低風險。分片是高影響力但高風險。」</p>
              </div>
            </Collapsible>

            {/* Operations */}
            <Collapsible title="營運：改善營運流程">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[步驟一]</strong> <span className="italic">「我們暢銷 SKU 的缺貨率在第二季達到 18%。目標是低於 5%。」</span></p>
                <p><strong className="text-gold">[步驟二]</strong> <span className="italic">「預測錯誤占了缺貨的 60%。我們的模型使用簡單的 3 個月滾動平均。它沒有考慮季節性或促銷活動。」</span></p>
                <p><strong className="text-gold">[步驟三]</strong> <span className="italic">「三個選項：聘請需求規劃師（9 萬美元，3 個月）、升級預測模型（我兩週內做出 v1）、或增加安全庫存（20 萬美元營運資金）。我建議選項 B 加上對前 20 個 SKU 暫時增加安全庫存。」</span></p>
                <p><strong className="text-gold">[步驟四]</strong> <span className="italic">「缺貨率在一個月內從 18% 降到 6%，到第三季末達到 3.8%。我們也收回了 15 萬美元的營運資金。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="營運：處理突發需求暴增">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「在反應之前，我會問三個問題。第一，這是一次性的暴增還是趨勢？第二，限制在哪裡？第三，無法滿足需求的代價是什麼？我的假設是限制在營運的某一個特定環節。我會先找到那個瓶頸。然後看臨時解方：加班、臨時工、簡化流程、或合作夥伴履行。」</p>
              </div>
            </Collapsible>

            {/* Customer Service */}
            <Collapsible title="客戶服務：扭轉負面客戶體驗">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[步驟一]</strong> <span className="italic">「一位客戶打進來非常憤怒，因為他們在 3 天內被轉接了 4 次，試圖解決一個帳務錯誤。」</span></p>
                <p><strong className="text-gold">[步驟二]</strong> <span className="italic">「根本原因不是帳務錯誤。是交接流程。沒有人負責到底。每個客服都把它當成一張新工單。」</span></p>
                <p><strong className="text-gold">[步驟三]</strong> <span className="italic">「我當場處理退款，給客戶 50 美元信用額度和我的個人電子郵件，並撰寫案例報告給組長。」</span></p>
                <p><strong className="text-gold">[步驟四]</strong> <span className="italic">「客戶留下來了，留了正面評價。我的組長建立了新流程：任何未解決的帳務問題都指派給單一負責人。帳務類的重複升級下降了 40%。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="客戶服務：在不影響滿意度的情況下降低處理時間">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會從了解時間花在哪裡開始。我會抽取 50 通電話的樣本，把處理時間拆成幾個類別。我的假設是系統查詢是最大的時間消耗。如果客服花 5 分鐘在系統之間切換，那是工具問題，不是人的問題。我會提議一個統一的客戶儀表板和常見問題的一鍵解決路徑。」</p>
              </div>
            </Collapsible>

            {/* Sales */}
            <Collapsible title="業務：扭轉表現不佳的區域">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[步驟一]</strong> <span className="italic">「我接手了一個連續 3 個季度未達標的區域。在我開始打電話之前，我把銷售管道按階段拆開，和公司基準比較。」</span></p>
                <p><strong className="text-gold">[步驟二]</strong> <span className="italic">「潛在客戶量高於平均。問題不在開發。成交率是 25%，公司基準是 42%。我檢視了 10 筆失去的交易。7 筆有同樣的模式：潛在客戶在收到提案後消失了。根本原因：提案太通用。」</span></p>
                <p><strong className="text-gold">[步驟三]</strong> <span className="italic">「我重建了提案流程。提案前的需求確認電話。客製化每一份提案。加入產業匹配的客戶案例。」</span></p>
                <p><strong className="text-gold">[步驟四]</strong> <span className="italic">「成交率從 25% 提升到 48%。達成 110% 配額。區域營收從年 80 萬美元增長到 140 萬美元。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="業務：進入全新市場">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會分成三個階段。第一，研究和假設。在嘗試銷售任何東西之前，先和 15 到 20 位潛在客戶交談。第二，小規模測試。找 5 個潛在客戶做完整的銷售週期，學習流程在哪裡斷裂。第三，擴展有效的方法。從那些對話中汲取教訓，改進推銷話術，建立可重複的手冊。」</p>
              </div>
            </Collapsible>

            {/* People Manager */}
            <Collapsible title="人員管理者：處理表現不佳的團隊成員">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[步驟一]</strong> <span className="italic">「我的一位直接下屬連續三個專案都錯過了截止日。我的跨級主管建議把他們列入績效改善計畫。」</span></p>
                <p><strong className="text-gold">[步驟二]</strong> <span className="italic">「我用是非樹來診斷。是技能問題嗎？否。是清晰度問題嗎？否。是容量問題嗎？是。他們在一位隊友離職後吸收了所有專案。他們在做 1.5 倍的工作。」</span></p>
                <p><strong className="text-gold">[步驟三]</strong> <span className="italic">「三個選項：PIP（可能導致辭職）、重新分配專案、或引進約聘人員。我選了重新分配加約聘人員的組合。」</span></p>
                <p><strong className="text-gold">[步驟四]</strong> <span className="italic">「兩週內回到正軌。之後每個截止日都達成。他們告訴我之前差點辭職。如果我跳過診斷就直接列入 PIP，我會因為工作量問題而失去一位強大的員工。」</span></p>
              </div>
            </Collapsible>

            <Collapsible title="人員管理者：從零開始建立團隊">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會使用章魚約翰同樣的目標設定方法。具體要什麼？一個 6 人的客戶成功團隊。什麼時候？4 個月內。條件？在 65 萬美元總薪酬預算內。然後計算差距，按影響力和填補難度排優先順序。第一個招的人：資深客戶成功經理（適應期最長，幫忙面試其他人）。第二：初階客戶成功經理。第三：客戶成功營運。第四：第二位初階客戶成功經理。」</p>
              </div>
            </Collapsible>

            <Collapsible title="人員管理者：處理團隊成員之間的衝突">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">「我會從診斷開始，而不是介入。我的假設是衝突是關於一個具體的工作問題，而不是個性衝突。大多數職場衝突都有結構性的根本原因：不清楚的權責、衝突的優先順序、或不一致的誘因。我會先分別和每個人會面。如果是權責不清楚，我會修正結構。如果是優先順序衝突，我會讓他們達成一致。如果確實是人際問題，那我會做一次協調對話。」</p>
              </div>
            </Collapsible>
          </div>
        </section>

        {/* Quick Reference Toolkit */}
        <section id="toolkit" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📋</span>
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">快速參考：問題解決面試工具包</h2>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { tool: "四步驟框架", what: "了解 > 診斷 > 計畫 > 執行", when: "每一個面試回答", phrase: "「在我行動之前，我需要了解根本原因。」" },
                { tool: "分解樹", what: "把大問題拆成小分支", when: "「你會如何……？」", phrase: "「我會把這拆成三個領域。」" },
                { tool: "是非樹", what: "用是非問題分類到桶子", when: "「跟我說一個你找出問題的經驗。」", phrase: "「我透過問一系列問題來縮小範圍。」" },
                { tool: "假設金字塔", what: "陳述直覺 > 解釋原因 > 行動前先測試", when: "「如果……你會怎麼做？」", phrase: "「我的假設是 X，以下是我如何測試它。」" },
                { tool: "標準與評估", what: "用加權標準比較選項", when: "「為什麼選這個職位？」「為什麼選那個方法？」", phrase: "「我根據三個標準來評估。」" },
                { tool: "影響力 vs. 執行難度矩陣", what: "按影響力和執行難度繪製解決方案", when: "案例研究報告。「你會如何排優先順序？」", phrase: "「我根據影響力和執行難度來排優先順序。」" },
                { tool: "差距分析", what: "定義目前和目標之間的差距", when: "「你看到自己在哪裡？」「你為什麼在找工作？」", phrase: "「我和目標之間的差距是 X。」" },
              ].map((item) => (
                <div key={item.tool} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-foreground font-semibold text-sm">{item.tool}</h4>
                  </div>
                  <p className="text-muted-foreground text-xs mb-1"><strong>是什麼：</strong>{item.what}</p>
                  <p className="text-muted-foreground text-xs mb-1"><strong>用於：</strong>{item.when}</p>
                  <p className="text-gold text-xs italic">{item.phrase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Practice */}
        <section id="practice" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">如何練習</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">閱讀這份指南是第一步。練習才是改變發生的地方。以下是在下一次面試前演練這些工具的方法。</p>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-4">每天 15 分鐘的演練</h3>
              <p className="text-muted-foreground text-sm mb-3">挑一個面試問題。設一個 2 分鐘的計時器。用四步驟框架大聲回答。用手機錄音。聽回放，問自己：</p>
              <ul className="space-y-2">
                {["我有在回答前釐清問題嗎？（步驟一）", "我有找到根本原因，還是直接跳到解決方案？（步驟二）", "我有展示多個選項嗎？（步驟三）", "我有分享具體數字和學到的教訓嗎？（步驟四）"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
                ))}
              </ul>
            </div>

            <h3 className="font-heading text-lg text-foreground mb-4">按工具分類的練習問題</h3>
            <div className="space-y-3 mb-6">
              <Collapsible title="分解樹練習問題">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• 你會如何把客訴減少 50%？</li>
                  <li>• 你會如何把電子報從 1,000 訂閱者增長到 10,000？</li>
                  <li>• 你會如何把一個部門的成本削減 20%？</li>
                </ul>
              </Collapsible>
              <Collapsible title="是非樹練習問題">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• 你的團隊上個月的產出下降了。帶我走過你會如何診斷。</li>
                  <li>• 一個產品功能的採用率低。你會如何找出原因？</li>
                  <li>• 一個區域的業績下降了。帶我走過你的分析。</li>
                </ul>
              </Collapsible>
              <Collapsible title="假設金字塔練習問題">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• 一個競爭對手推出了類似的產品。你會怎麼做？</li>
                  <li>• 員工流動率上升了。你的假設是什麼，你會如何測試？</li>
                  <li>• 客戶獲取成本翻倍了。發生了什麼事？</li>
                </ul>
              </Collapsible>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-4">練習記分卡</h3>
              <div className="space-y-2">
                {[
                  "我有在回答前釐清嗎？",
                  "我有找到根本原因嗎？",
                  "我有展示 2 個以上的選項嗎？",
                  "我有使用具體數字嗎？",
                  "我有分享學到的教訓嗎？",
                  "我有控制在 2 分鐘以內嗎？",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-2.5">
                    <div className="w-5 h-5 rounded border-2 border-gold/40 shrink-0" />
                    <span className="text-foreground text-sm flex-1">{item}</span>
                    <span className="text-muted-foreground text-xs">是 / 否</span>
                  </div>
                ))}
                <div className="flex items-center justify-between mt-3 px-1">
                  <p className="text-foreground text-sm font-semibold">分數：___/6</p>
                  <p className="text-gold text-sm font-medium">目標：在面試前穩定達到 5/6。</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">下次面試前：檢查清單</h3>
              <div className="space-y-5">
                {[
                  { heading: "準備", items: [
                    "我有 3 個按照四步驟框架準備的故事。",
                    "每個故事都有具體數字（前後對比、%、$、時間）。",
                    "我用真實來源研究了這家公司。",
                    "我知道我的「為什麼選這家公司？」回答，有 3 個加權標準。",
                    "我知道我的「為什麼在找工作？」回答，框架為差距分析。",
                  ]},
                  { heading: "面試中", items: [
                    "我會在回答前暫停。需要時釐清。",
                    "我會在解決問題之前先分類。",
                    "我會陳述我的假設並解釋如何測試。",
                    "被問到「你會怎麼……？」時我會展示 2-3 個選項。",
                    "我會在每個回答中使用數字。不要模糊的宣稱。",
                    "我會用學到的教訓結束每個故事。",
                  ]},
                  { heading: "面試後", items: [
                    "我會寫下每一個被問到的問題。",
                    "我會用四步驟框架為我的回答打分。",
                    "我會找出我漏掉的步驟並練習它。",
                  ]},
                ].map((section) => (
                  <div key={section.heading}>
                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{section.heading}</p>
                    <div className="space-y-1.5">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 bg-background border border-border rounded-lg px-4 py-2.5">
                          <div className="w-4 h-4 mt-0.5 rounded border-2 border-gold/40 shrink-0" />
                          <span className="text-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final Word */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">最後一件事</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">最好的求職者不會背答案。<strong className="text-foreground">他們學會如何思考。</strong>然後每一個答案聽起來都自然、有結構、有信心，因為它確實如此。</p>
            <p className="text-muted-foreground leading-relaxed mb-4">這些工具不是技巧。它們是<strong className="text-foreground">思考習慣。</strong>在準備面試時練習。在工作中解決問題時練習。在個人生活中做決定時練習。</p>
            <p className="text-muted-foreground leading-relaxed mb-6">渡邊健介寫《解決問題最簡單的方法》是為了孩子。它成為日本商業類暢銷書第一名的事實告訴你一件事。<strong className="text-foreground">簡單的思考工具，持續應用，比任何複雜的策略都更有效。</strong></p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8">
              <h3 className="font-heading text-lg text-gold mb-4">你的面試小抄</h3>
              <div className="space-y-2 text-cream/90 text-sm">
                <p><strong>回答之前：</strong>「讓我確認我理解……」</p>
                <p><strong>診斷時：</strong>「我把它拆成了……」</p>
                <p><strong>提出建議時：</strong>「我的假設是……以下是我會如何測試。」</p>
                <p><strong>解釋原因時：</strong>「我根據三個標準來評估。」</p>
                <p><strong>分享結果時：</strong>用數字。一定要用數字。</p>
                <p><strong>收尾時：</strong>「以下是我學到的，以及我下次會做得不同的地方。」</p>
              </div>
              <p className="text-cream font-heading text-lg font-semibold mt-6">從簡單開始。結構化思考。拿到錄取。</p>
            </div>
          </div>
        </section>

      </main>

      {/* Resources */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">更多資源</h2>
              <p className="text-cream/60">持續提升你的面試技巧</p>
            </div>
          </div>

          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">書籍</h3>
            <p className="text-cream/80 text-sm italic mb-4">《解決問題最簡單的方法》渡邊健介 著（英文版：Problem Solving 101 by Ken Watanabe）</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/interview-prep-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">面試準備攻略</p>
              <span className="text-gold text-sm font-medium">面試準備指南 →</span>
            </Link>
            <Link to="/zh-tw/resume-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">修改你的履歷</p>
              <span className="text-gold text-sm font-medium">履歷攻略 →</span>
            </Link>
            <Link to="/zh-tw/job-offer-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">評估工作機會</p>
              <span className="text-gold text-sm font-medium">Offer 評估指南 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      {/* Footer */}
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

export default ProblemSolvingGuideZhTw;
