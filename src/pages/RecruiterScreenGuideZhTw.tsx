import { FileText, Clock, Phone, Video, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, MessageSquare, Target, Shield, Briefcase, ChevronDown, Menu } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";

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

/* ─── Table of Contents ─── */
const tocSectionsZh = [
  { id: "intro", label: "前言" },
  { id: "scorecard", label: "01 · 招募人員在做什麼" },
  { id: "before", label: "02 · 電話前的準備" },
  { id: "story", label: "03 · 掌握你的故事" },
  { id: "frameworks", label: "04 · 回答框架" },
  { id: "tough", label: "05 · 處理困難問題" },
  { id: "salary", label: "06 · 薪資" },
  { id: "setup", label: "07 · 設備和禮儀" },
  { id: "questions", label: "08 · 該問的問題" },
  { id: "redflags", label: "09 · 需要注意的警訊" },
  { id: "mistakes", label: "10 · 常見錯誤" },
  { id: "after", label: "11 · 通話結束後" },
  { id: "levels", label: "12 · 依職涯階段區分" },
  { id: "cheatsheet", label: "速查表" },
];

const TableOfContentsZh = () => {
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
    tocSectionsZh.forEach(({ id }) => {
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
          {tocSectionsZh.map(({ id, label }) => (
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
              {tocSectionsZh.map(({ id, label }) => (
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

const RecruiterScreenGuideZhTw = () => {
  useTrackGuideProgress("recruiter-screen");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/recruiter-screen-guide", title: "招募官篩選指南｜通過第一關", description: "招募官在電話面試中檢查什麼，以及如何回答每個問題。" })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <button
              onClick={() => navigate("/hr-interview-guide")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            如何通過HR面試關
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            資深招募官的完整實戰手冊
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">
              James Bugden | Uber 資深招募官
            </p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 分鐘閱讀</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Introduction */}
      <TableOfContentsZh />
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            我審閱過超過 20,000 份履歷。我在頂尖國際企業完成了 500 次以上的錄用。我做過數千次電話篩選。
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            多數求職者把招募人員的電話篩選當成熱身。但它不是。<span className="text-gold font-semibold">它是一道關卡。</span>沒有通過我這關，你見不到用人主管（好吧，有時候你走內部推薦的路可以跳過這關）。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            好消息是：電話篩選是整個招募流程中最容易預測的環節。問題大同小異。常見的錯誤也大同小異。能夠順利通過的關鍵因素也大同小異。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這份指南涵蓋了完整的流程。電話前要做什麼。通話中我在評估什麼。如何應對每一個問題，包括薪資。掛斷電話後該做什麼。以及不同職涯階段的篩選差異。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            我也附上了逐字範例，針對最容易讓人失誤的問題。請仔細閱讀那些段落。大聲練習這些回答。然後轉化成你自己的版本。
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 text-center mb-10">
            <p className="text-foreground font-medium">
              按照這份指南去準備。你會比我每週通話的 <span className="text-gold font-semibold">90% 求職者都準備得更充分。</span>
            </p>
          </div>

          {/* How you ended up on my list */}
          <h3 className="font-heading text-xl text-foreground mb-4">你是怎麼出現在我的名單上的</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            在我們進入電話篩選的細節之前，先了解你是怎麼走到這一步的。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            你會出現在我的行事曆上，原因不外乎幾種。你投了履歷，而且你的履歷通過了 ATS（應徵者追蹤系統）。或者你之前申請過，資料還在我們的系統裡。或者我透過搜尋找到了你的 LinkedIn 個人檔案。或者團隊裡有人推薦了你。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            這條路徑很重要，因為它會影響我的初始印象。來自信任員工的內部推薦會得到額外的關注。主動投遞代表你的履歷本身做得夠好。LinkedIn 主動接觸代表你的個人檔案中有某些東西符合我的搜尋條件。不管哪種情況，電話篩選都是我驗證紙面上的訊號是否在對話中站得住腳的環節。
          </p>
          <p className="text-muted-foreground leading-relaxed">
            如果你根本沒有接到篩選電話，問題出在更前面的環節。你的履歷或 LinkedIn 個人檔案沒有發揮作用。先閱讀<Link to="/zh-tw/resume-guide" className="text-gold hover:underline">履歷指南</Link>來解決這個問題。
          </p>
        </div>
      </section>

      {/* Section 1: The Scorecard */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section id="scorecard" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                招募人員到底在做什麼
              </h2>
              <p className="text-muted-foreground text-lg">
                你在想你的回答。我在填寫評分表。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            在有制度的公司，每個招募人員都會使用評分表。它是一張表格，上面有優點、缺點，以及最終決定的欄位。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            以下是我使用過的格式。沒有「也許」這個選項。我必須從四個選項中選一個：絕對不行、不行、可以、絕對可以。我在這通電話中要回答的核心問題是：我有沒有足夠的信心把這個人推薦給用人主管？
          </p>

          {/* Scorecard visual */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8 font-mono text-sm">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-sans font-semibold">招募人員評分表</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4">
                <p className="text-cream/60 text-xs uppercase mb-2">優點</p>
                <div className="space-y-2">
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                </div>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4">
                <p className="text-cream/60 text-xs uppercase mb-2">缺點</p>
                <div className="space-y-2">
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                </div>
              </div>
            </div>
            <p className="text-cream/60 text-xs uppercase mb-3 text-center">決定（選一個）：</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["絕對不行", "不行", "可以", "絕對可以"].map((d) => (
                <span key={d} className="px-3 py-1.5 border border-cream/20 rounded text-cream/70 text-xs">{d}</span>
              ))}
            </div>
            <p className="text-cream/40 text-xs text-center mt-4 font-sans italic">
              沒有「也許」。你的任務是讓這個決定變得容易。
            </p>
          </div>

          {/* What I evaluate - expanded */}
          <p className="text-muted-foreground leading-relaxed mb-6">以下是我用來填寫這些欄位的評估項目。</p>

          <div className="space-y-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">資格符合度</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                你的技能是否符合職缺需求？電話篩選是在確認履歷上寫的東西是否屬實。如果你的履歷寫著「SQL 專家」，但我一問你就結巴，我會記下一個信任問題。我篩掉你不是因為技能差距本身。我篩掉你是因為你聲稱的和你展現的之間有落差。
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">動機和真實興趣</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                這是評分表上最被低估的因素。如果你的資格符合，也通過了以下其他標準，我需要知道一件事：你換工作的理由是否正確？
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                我會在心裡問自己一連串關於你的問題。如果你經常換工作，這次會不會也一樣？你是認真在找新工作，還是只是在市場上看看有什麼機會？這份工作如何符合你的職涯目標和長期規劃？
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                我越能看到這個職缺與你想要的方向一致，你接受我們 offer 的機率就越高。你留下來的機率也越高。我不是在填一個空位。我需要找到一個能在這個職位上長期成功的人。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                你不需要長篇大論。你需要的是具體細節。讓我看到你已經想過：為什麼是這個職缺、這家公司、在你職涯的這個時間點。這才是會被寫進「優點」欄位的內容。
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">溝通能力</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                你有沒有回答我問的問題？有沒有用真實的例子？有沒有言簡意賅？我不只在評估你的內容。我在想你面對用人主管、面試小組、客戶時會怎麼表現。如果你在篩選電話中就開始離題，我會擔心正式面試時會發生什麼事。
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">薪資期望一致性</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                薪資落差是我的兩大淘汰因素之一。我問薪資不是要設陷阱。如果你需要 200 萬而這個職缺的上限是 150 萬，我、你、和用人團隊都不想在一個你最後不會接受 offer 的面試流程上浪費時間。
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">警訊</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                無法解釋的空窗期。履歷上的經歷無法自圓其說。對前雇主的負面評價。遲到。這些都會被記錄下來。反過來說，這些問題的缺席也會被注意到，而且對你有利。
              </p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <p className="text-foreground text-sm leading-relaxed italic">
              <span className="text-gold font-semibold">多數求職者不知道的事：</span>當我讓你進入下一輪，我是把自己的名字押在這個決定上。如果你在用人主管面前表現很差，受影響的是我的判斷力。我不是在找淘汰你的理由。我是在找足夠的信心來承擔這個風險。你的任務是給我這份信心。
            </p>
          </div>
        </section>

        {/* Section 2: Before the Call */}
        <section id="before" className="pb-14 md:pb-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                電話前的準備
              </h2>
              <p className="text-muted-foreground text-lg">
                能進入下一輪的求職者不一定更有才華。他們只是準備得更充分。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">研究公司（30-60 分鐘）</h3>
              <p className="text-muted-foreground text-sm mb-4">你需要能用具體細節回答「你對我們公司了解多少？」這意味著：</p>
              <ul className="space-y-2 mb-4">
                {[
                  "閱讀公司網站。使命、產品、領導團隊。",
                  "搜尋最新消息。融資、併購、產品發表、管理層異動。",
                  "查看 Glassdoor。注意評價中的趨勢，不要只看分數。",
                  "看他們的 LinkedIn 頁面。看他們發了什麼內容，最近有誰加入。",
                  "如果他們有產品，親自試用。哪怕只是免費試用或註冊流程。",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm mb-4">至少準備三個你對這家公司了解的具體事實。你不一定會被直接問到。但當對話展開時，你需要有真正的內容可以說。</p>
              <p className="text-muted-foreground text-sm mb-4">我能立刻察覺一個人有沒有做功課。</p>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-xs uppercase font-medium mb-1">✕ 模糊</p>
                  <p className="text-foreground text-sm italic">「我聽說貴公司的文化很好。」</p>
                </div>
                <div className="bg-background border border-gold/30 rounded-lg p-3">
                  <p className="text-gold text-xs uppercase font-medium mb-1">✓ 具體</p>
                  <p className="text-foreground text-sm italic">「我讀到你們上個月完成了 C 輪融資，進軍東南亞市場這件事讓我很感興趣。」</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">研究招募人員</h3>
              <p className="text-muted-foreground text-sm mb-3">在電話前去看看我的 LinkedIn。我看得到你瀏覽過我的個人檔案。我很欣賞這種行為。這告訴我你做事很細心。看看我的職涯經歷以及我在這家公司待了多久。在電話開始的第一分鐘用這些資訊來建立關係。</p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-gold text-xs uppercase font-medium mb-1">開場範例</p>
                <p className="text-foreground text-sm italic">「我在 LinkedIn 上看到你是從〔公司〕過來的，轉換順利嗎？」</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">這就夠了。在進入正式問題前先讓對話暖起來。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">拆解職缺描述</h3>
              <p className="text-muted-foreground text-sm mb-3">職缺描述是你的作弊指南。多數求職者只瀏覽一次。你要逐行閱讀。</p>
              <p className="text-muted-foreground text-sm mb-4">前三個項目幾乎總是描述必備條件。如果某項技能在不同段落出現了兩三次，那就是必要條件。像是「熟悉」或「加分」這樣的用語代表的是加分項目。</p>
              <p className="text-muted-foreground text-sm mb-4">建立一個簡單的三欄表格：</p>
              <div className="grid grid-cols-3 gap-2 text-center mb-4">
                {["職缺要求", "你的相關經驗", "具體案例"].map((col) => (
                  <div key={col} className="bg-background border border-border rounded-lg p-3">
                    <p className="text-foreground text-xs font-medium">{col}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-sm">這張表格能清楚地告訴你哪裡經驗充足，哪裡有缺口。它也會成為你在電話中大部分回答的素材。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">準備好談論履歷上列出的每項技能</h3>
              <p className="text-muted-foreground text-sm mb-3">招募人員會注意到履歷和口頭對話不一致的情況。把你履歷上的每項技能都過一遍。確保你能用對話的方式談論每一項。不需要很技術性。不需要很深入。但要準備好回答「跟我說一個你使用 X 的經驗」，針對你列出的每一項技能。</p>
              <p className="text-muted-foreground text-sm">如果你列了一個最近沒用過的工具或技術，誠實地說明你目前的程度。或者把它移除。</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">建立你的小抄</h3>
              <p className="text-muted-foreground text-sm mb-3">電話或視訊篩選最大的好處之一，就是你可以把筆記放在看得到的地方。善用這一點。</p>
              <ul className="space-y-2">
                {[
                  "你對公司了解的三個具體事實",
                  "你想要這份工作的三個首要理由",
                  "職缺要求對照你的經驗",
                  "「請介紹一下你自己」的重點（不是完整的稿子）",
                  "兩到三個準備好的故事和成果",
                  "五個要問我的問題",
                  "你的目標薪資範圍",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm mt-3 italic">控制在一頁。打電話時放在旁邊。視訊時開在另一個瀏覽器視窗。不要逐字照念。</p>
            </div>
          </div>
        </section>
      </main>

      {/* Section 3: Know Your Story */}
      <section id="story" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                掌握你的故事
              </h2>
              <p className="text-muted-foreground text-lg">
                「請介紹一下你自己」為後續所有對話定下基調。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            「請介紹一下你自己」是這通電話中最重要的問題。最好的求職者掌控這個回答。最差的求職者把它當成意外題。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            使用「現在-過去-未來」公式。60 到 90 秒就夠了，而且能給我所有我需要的資訊。最多講兩分鐘，然後讓面試官問後續問題。我看到很多求職者，甚至是資深的求職者，在自我介紹上講了五到十分鐘。你講得越久，你對對話的掌控力就越低。
          </p>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">現在 → 過去 → 未來</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "現在", pct: "30-40%", desc: "目前的職位加上一個有數據的重要成果。" },
                { label: "過去", pct: "30-40%", desc: "你怎麼走到今天的。只講跟這個職缺相關的。" },
                { label: "未來", pct: "20-30%", desc: "為什麼這個職缺是你自然的下一步。" },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{item.label}</p>
                  <p className="text-cream font-heading text-xl font-bold mb-2">{item.pct}</p>
                  <p className="text-cream/70 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-cream/50 text-xs text-center mt-4 italic">總共：60-90 秒。然後停下來。讓面試官問後續問題。</p>
          </div>

          <p className="text-muted-foreground text-sm mb-6">不要提個人生活、完整的職涯經歷、和離開前公司的負面理由。目標是讓這個職缺感覺像是你自然的下一步。</p>

          <div className="space-y-3 mb-10">
            <Collapsible title="📝 逐字範例：行銷經理">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我目前是 TechCorp 的行銷經理，帶領一個五人團隊。過去兩年，我把自然流量提升了 150%，每次開發客戶的成本降低了 35%。在這之前，我在一家數位行銷公司工作了三年，負責 B2B 客戶的內容策略和付費媒體。我想轉到企業端的職位，在那裡我能掌管整個行銷漏斗，而不是一次只負責一個管道。我讀到你們正在擴展企業客戶市場，這一點特別吸引我。這正是我想要參與的成長挑戰。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：新鮮人">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我最近從〔大學〕畢業，主修資訊工程。大四的時候，我帶領一個四人團隊為一個地方非營利組織開發了一個手機 App。我們準時交付，第一個月就有 200 個活躍用戶，並減少了他們 40% 的行政工作量。我也完成了兩次實習，一次是後端開發，一次是產品。我正在找一份全職工作，在這些基礎上繼續成長。你們的工程文化和對初階工程師的指導重視，是我在研究團隊時特別注意到的。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：轉職者">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我過去六年都在教育領域，最近的職位是高中科主任，管理一個八人團隊。我負責教師專業發展、課程設計、和學生成績數據追蹤。過去一年我一直在轉向教學設計，完成了兩項認證，並以自由接案的方式建立了三門線上課程。我準備好全職投入這個領域了。你們專注於企業培訓課程，正是我想要發揮這些技能的地方。」
              </p>
            </Collapsible>
          </div>

          {/* Map experience to the role */}
          <h3 className="font-heading text-xl text-foreground mb-4">把你的經驗對照到這個職缺</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            不要讓我自己去連結你的背景和這份工作。替我做好這件事。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            用有數據的具體案例。「提升了客戶滿意度」什麼都沒告訴我。「在六個月內透過建立新的回饋流程，將滿意度分數從 72% 提升到 91%」告訴我你知道如何推動一個指標。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            對於你的經驗和職缺要求之間的差距，直接面對。不要抱著我不會注意到的僥倖心理。
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
              <p className="text-destructive text-xs uppercase font-medium mb-2">✕ 弱的回答</p>
              <p className="text-foreground text-sm italic">「我沒有真的用過 Tableau，但我學得很快。」</p>
            </div>
            <div className="bg-background border border-gold/30 rounded-lg p-4">
              <p className="text-gold text-xs uppercase font-medium mb-2">✓ 強的回答</p>
              <p className="text-foreground text-sm italic">「我沒有專門用過 Tableau，但我過去三年一直在用 Power BI 和 Looker 建立儀表板。我兩週前完成了 Tableau 的線上認證。分析思維是一樣的。工具只是語法不同。」</p>
            </div>
          </div>

          {/* Top 3 Reasons */}
          <h3 className="font-heading text-xl text-foreground mb-4">你想要這份工作的三個首要理由</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            當我問你為什麼想要這個職缺，我在測試兩件事。你有沒有做功課。以及你的理由是否顯示你會留下來並且在這裡成功。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            每次電話篩選前，用以下結構準備三個具體的理由：
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { num: "1", label: "為什麼是這家公司", desc: "提到一些真實的、具體的事。你認同的使命、最近的動作、產品或市場定位的特點。" },
              { num: "2", label: "為什麼是這個職缺", desc: "把日常工作內容連結到你的專業驅動力。" },
              { num: "3", label: "為什麼是現在", desc: "解釋為什麼這是你目前職涯方向的正確下一步。" },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-4 text-center">
                <span className="inline-flex w-8 h-8 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-sm mb-2">{item.num}</span>
                <h4 className="font-semibold text-foreground text-sm mb-1">{item.label}</h4>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mb-6">用這個測試檢查每個理由：它是不是只適用於這家公司和這個職缺？還是可以原封不動地貼到另一份申請裡？如果可以直接複製貼上，那就不夠強。</p>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-6">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ 會毀掉你回答的說法</p>
            <ul className="space-y-1 text-foreground text-sm">
              <li>「我需要新的挑戰。」<span className="text-muted-foreground text-xs">（模糊，適用於任何工作）</span></li>
              <li>「通勤距離剛好。」<span className="text-muted-foreground text-xs">（跟職缺無關）</span></li>
              <li>「我聽說福利很好。」<span className="text-muted-foreground text-xs">（現階段優先順序不對）</span></li>
              <li>「我一直很欣賞你們的品牌。」<span className="text-muted-foreground text-xs">（空洞，沒有實質內容）</span></li>
            </ul>
          </div>

          <div className="space-y-3 mb-10">
            <Collapsible title="📝 逐字範例：金融科技新創的軟體工程師">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「三個理由。第一，公司。你們正在為小型企業的支付建立基礎設施，在大多數人仍使用現金的市場裡。這是一個真實的問題，也是我在意的。第二，職缺。我過去三年一直在維護舊系統，我想建造新東西。這個職缺是從零開始的工作，這很少見。第三，時間點。我剛完成我第一個端到端的系統遷移專案。我覺得我準備好進入一個有更多主導權的角色了。這感覺就是正確的下一步。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：SaaS 公司的業務經理">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「有幾件事讓我印象深刻。我關注你們的成長大約一年了。你們在 18 個月內從 50 個客戶成長到 200 個，而且沒有再募資。這告訴我產品有真正的市場適配性。第二，這個職缺正好是我想要專注的方向。我做了四年的業務代表，而且一直在非正式地指導團隊裡的兩個初階業務。我想要全職做這件事。第三，你們的銷售方法論。我聽了你們業務副總在〔Podcast〕上的訪談。你們談論需求探索的方式跟我的銷售方式一致。我不想花前六個月在改掉原有的習慣。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：營運協調員（新鮮人）">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我想在一家營運對產品來說很重要的公司工作。研究你們一週後，很明顯物流是你們業務的核心，不是附帶的。這對我來說很重要。在職缺方面，我最有動力的時候是在修復壞掉的流程。在我的實習中，我重新建立了一個手動報告流程，每週為團隊節省了四個小時。我想要大規模地做這件事。從個人角度來說，我正在職涯的一個階段，想要向有經驗的營運專家學習。你們的營運團隊由一位曾經帶領三家公司擴展的人領導，這非常吸引我。」
              </p>
            </Collapsible>
          </div>

          {/* Broader Career Motivation */}
          <h3 className="font-heading text-xl text-foreground mb-4">更廣泛的職涯動機方法</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            還有另一種方式回答「為什麼想要這份工作」的問題。不用公司-職缺-時機的框架，而是從你現在對職涯的整體期望來回答。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            我聽到的三個最常見的動機：
          </p>

          <div className="space-y-4 mb-6">
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold text-sm mb-2">影響力</h4>
              <p className="text-muted-foreground text-sm mb-3">你想要一個你的工作更有意義的職位。你能看到你建造、發佈、或修復的東西帶來的成果。很多求職者來自大公司，在那裡他們的貢獻被整個機器吸收了。他們想要感受到自己帶來的改變。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
                <p className="text-foreground text-sm italic">「我在〔公司〕待了四年。工作還不錯，但我跟客戶隔了五層。我想要一個能直接看到我的成果的職位。你們的團隊規模和直接面向終端用戶的模式，正是我要的。」</p>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold text-sm mb-2">文化</h4>
              <p className="text-muted-foreground text-sm mb-3">你想要不同的環境。不同的團隊氛圍。不同的工作方式。這是合理的。關鍵是具體說明你想要什麼，而不是模糊地說你要離開什麼。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
                <p className="text-foreground text-sm italic">「我最看重的是一個行動快速、給人空間去主導自己工作的團隊。我在一個高度矩陣式的環境工作了三年。當我有明確的主導權和短的回饋循環時，我表現最好。從我讀到的關於你們工程團隊運作方式的資訊來看，這就是你們的做法。」</p>
              </div>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold text-sm mb-2">薪資</h4>
              <p className="text-muted-foreground text-sm mb-3">你想要得到你應得的報酬。這一點在電話篩選中不太容易直說，但有一種方式可以表達。把它連結到職責範圍和成長，而不是只談錢。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-3">
                <p className="text-foreground text-sm italic">「我在找一個同時提升職責和薪資的機會。我已經超出了目前職位的發展空間，成長路徑有限。這個職位在職責範圍上是一個升級，我已經準備好了。」</p>
              </div>
            </div>
          </div>
          <p className="text-muted-foreground text-sm">你不需要只選一個。最有力的回答會結合兩到三個。「我想要更大的影響力，我想要在一個節奏更快的環境中工作，我想要一個符合我目前表現水準的職位。」這是一個完整、誠實的回答。</p>
        </div>
      </section>

      {/* Section 4: Answer Frameworks */}
      <section id="frameworks" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                回答框架
              </h2>
              <p className="text-muted-foreground text-lg">
                沒有結構，回答會變得冗長、沒有重點。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">
            你需要一個結構來回答行為面試問題。市面上有很多回答面試問題的框架。只要你使用其中一個就沒問題。我在這裡挑選了兩個：STAR 和 CAR。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">STAR 方法</h3>
              <p className="text-muted-foreground text-xs mb-4">總共 90-120 秒</p>
              <div className="space-y-3">
                {[
                  { letter: "S", label: "情境", desc: "描述場景。1-2 句話。" },
                  { letter: "T", label: "任務", desc: "你負責什麼？" },
                  { letter: "A", label: "行動", desc: "你做了什麼？花 60% 的時間在這裡。要具體。用「我」不用「我們」。", highlight: true },
                  { letter: "R", label: "結果", desc: "結果是什麼？用數據。營收、百分比、時間。" },
                ].map((item) => (
                  <div key={item.letter} className={`flex items-start gap-3 p-3 rounded-lg ${item.highlight ? "bg-gold/10 border border-gold/20" : "bg-background"}`}>
                    <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-sm flex-shrink-0">{item.letter}</span>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs mt-4 italic">每個回答結尾：「這個經驗和這個職缺的關聯是⋯⋯」</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">CAR 方法</h3>
              <p className="text-muted-foreground text-xs mb-4">60-90 秒。適合電話篩選。</p>
              <div className="space-y-3">
                {[
                  { letter: "C", label: "挑戰", desc: "問題或情境是什麼？" },
                  { letter: "A", label: "行動", desc: "你做了什麼？" },
                  { letter: "R", label: "結果", desc: "結果是什麼？" },
                ].map((item) => (
                  <div key={item.letter} className="flex items-start gap-3 p-3 rounded-lg bg-background">
                    <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-sm flex-shrink-0">{item.letter}</span>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <Collapsible title="📝 STAR 範例：帶領團隊度過困難轉變">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我的公司決定在 90 天內把整個資料基礎設施遷移到新平台。〔情境〕我是專案負責人，負責協調四個團隊，並在遷移期間維持日常營運。〔任務〕我建立了每週的跨部門站會，製作了共用的追蹤文件，並且親自管理三條最複雜的資料管線。在第六週遇到重大阻礙時，我快速向上反映，讓工程主管介入，我們在一週內恢復了時程。〔行動〕我們如期完成。零資料遺失。遷移成本比預算低 15%，新平台把我們的報告時間縮短了一半。〔結果〕」
              </p>
            </Collapsible>
            <Collapsible title="📝 CAR 範例：改善流程">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我們的業務團隊每週要花三個小時從三個不同的工具中手動拉取業務管線資料。〔挑戰〕我建立了一個單一儀表板，自動從三個資料來源擷取數據，每天更新。〔行動〕團隊每週省下了三個小時。業務副總開始在每週檢討會議中使用它。現在它已經被另外兩個部門採用。〔結果〕」
              </p>
            </Collapsible>
          </div>

          <div>
            <h3 className="font-heading text-lg text-foreground mb-4">準備 5-7 個故事，涵蓋：</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {["克服挑戰", "領導或影響他人", "處理衝突", "快速學習新事物", "做出困難的決定", "改善流程", "在壓力下交付成果"].map((story, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold">{i + 1}</span>
                  <p className="text-foreground text-sm">{story}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">大聲練習每個故事。只存在腦海裡的故事，講出來時會沒有條理。目標是每個故事在兩分鐘內講完。講完後，把它連結回這個職缺：「這個經驗和這個職缺直接相關，因為〔具體連結〕。」</p>
          </div>
        </div>
      </section>

      {/* Section 5: Tough Questions */}
      <section id="tough" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                處理困難問題
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">「你為什麼要離開現在的工作？」</h3>
              <p className="text-muted-foreground text-sm mb-4">把重點放在你要前往的方向。不是你要逃離的東西。保持在一到兩句話。然後轉到為什麼這個職缺吸引你。永遠不要說前雇主的壞話。即使情況確實很糟。這顯示出判斷力不佳，而且會讓我想：你以後會怎麼說我們。</p>
              <div className="space-y-3">
                <Collapsible title="目前在職">
                  <p className="text-foreground text-sm mt-3 italic">「我在目前的職位學到了很多，也很自豪團隊完成的成果。我準備好接受更大的範圍了。這個職缺吸引我是因為〔具體原因〕。這是我想走的方向。」</p>
                </Collapsible>
                <Collapsible title="被裁員">
                  <p className="text-foreground text-sm mt-3 italic">「公司經歷了組織重整，我的職位被取消了。我的績效評估一直很好，最近一次在前 25%。從那之後我一直在〔具體活動：顧問、進修、自由接案〕。我已經準備好加入新團隊了。」</p>
                </Collapsible>
                <Collapsible title="被解僱">
                  <p className="text-foreground text-sm mt-3 italic">「公司和我對這個職位有不同的期待。我反思過那段經歷，學到了〔具體教訓〕。我在找一個〔相關適配點〕的環境，讓我從第一天就能做好準備。」</p>
                </Collapsible>
                <Collapsible title="離開有問題的環境">
                  <p className="text-foreground text-sm mt-3 italic">「團隊經歷了很多領導層的變動，方向一直在改變。我在有穩定性和明確優先順序的環境中表現最好。我在找一家〔這家公司提供的具體元素〕的公司。根據我的研究，你們似乎已經建立了這樣的環境。」</p>
                </Collapsible>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">「你最大的弱點是什麼？」</h3>
              <p className="text-muted-foreground text-sm mb-3">「我是完美主義者」不是一個回答。「我工作太努力」也不是。我聽過這兩個回答幾千次了。它們什麼都沒告訴我。</p>
              <p className="text-muted-foreground text-sm mb-3">說出一個真實的弱點。展現自我覺察。描述你正在怎麼改善。展示改善的證據。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mb-4">
                <p className="text-foreground text-sm font-medium">公式：<span className="text-gold">行為 → 影響 → 改善方法 → 結果</span></p>
              </div>
              <p className="text-muted-foreground text-sm mb-4">弱點應該是真實的，但不能是致命的。如果這個職位對截止日期要求很高，不要說你在遵守截止日期上有困難。如果這是面對客戶的職位，不要說你不擅長與人相處。</p>
              <div className="space-y-3">
                <Collapsible title="📝 範例：授權委派">
                  <p className="text-foreground text-sm mt-3 italic">「我有一個傾向，會把我知道自己做得好的任務抓在手上，而不是交派出去。在我上一個職位，這意味著在最忙的那個季度我成了瓶頸。我意識到這對團隊和時程都不公平。我開始每週做一次授權檢視，至少把兩項重要任務分配給其他人，並在固定的時間點確認進度，而不是一直盯著。我們最近兩次的產品發佈都如期完成。我的主管在上次績效評估中特別提到我在這方面的進步。」</p>
                </Collapsible>
                <Collapsible title="📝 範例：公開演講">
                  <p className="text-foreground text-sm mt-3 italic">「在大型場合做簡報曾經讓我焦慮到影響我的表現。我迴避這些場合的次數比應該的還多。大約 18 個月前我加入了一個 Toastmasters 演講社團，承諾每個月至少上台一次。到現在我已經主持了兩場全員會議和一場有 40 人在場的客戶提案。這仍然不是我最喜歡的事，但它不再阻礙我了。」</p>
                </Collapsible>
                <Collapsible title="📝 範例：不懂拒絕">
                  <p className="text-foreground text-sm mt-3 italic">「我以前對每個要求都說好，因為我不想讓任何人失望。結果是我承諾太多，在太多事情上交出了普通的成果，而不是在少數事情上交出優秀的成果。我開始封鎖時間做深度工作，當新的要求會影響現有的優先順序時就直接說明。我的主管注意到了這個轉變。我最近兩個專案獲得了我有史以來最高的回饋分數。」</p>
                </Collapsible>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">「請告訴我一次你失敗的經驗。」</h3>
              <p className="text-muted-foreground text-sm mb-3">這個問題在測試自我覺察和成長。表現不好的求職者要嘛聲稱自己從未失敗過，要嘛描述了一次失敗但沒有展示學到了什麼。</p>
              <p className="text-foreground text-sm italic">「在我擔任團隊主管的第二年，我推動在用戶研究不夠充分的情況下發佈一個功能。我對自己的直覺很有信心，而且我想要達到季度目標。我們上線了，但採用率很低，接下來兩個月我們都在根據本來應該提前蒐集的回饋重新修改。延遲造成的時間成本比做研究還多。從那以後，我在每個功能計畫進入開發前都設立了最低限度的研究檢查點。我們之後發佈了四個重要功能。四個都在第一個月達到了採用目標。」</p>
            </div>

            <Collapsible title="「你五年後的規劃是什麼？」">
              <p className="text-muted-foreground text-sm mt-3 mb-3">我不是在找一個詳細的職涯規劃。我在找的是合理的企圖心，與這個職缺相符，並且顯示你會留得夠久來產生影響。</p>
              <p className="text-muted-foreground text-sm mb-3">如果這個職缺有自然的成長路徑，提到它。很多職位在設計時就預期這個人會隨著時間成長到更高的職位。如果職缺描述提到「有機會成長為〔資深職稱〕」或招募人員提到團隊成長計畫，在你的回答中使用這些資訊。</p>
              <p className="text-foreground text-sm italic mb-3">「五年後我想帶領一個團隊，負責更大範圍的工作。這個職缺感覺是朝那個方向邁進的正確一步。我想要深入〔職缺的具體領域〕，在這裡建立成績，然後從這裡成長。我不想頻繁跳槽。我想找一個地方，隨著時間累積贏得更多責任。」</p>
              <p className="text-foreground text-sm italic">「我注意到職缺描述提到這個角色會隨著團隊擴展成長為資深職位。這正是我想要的。五年後我想管理一個團隊，掌管一個完整的〔功能〕。我寧願在這裡證明自己來贏得升遷，也不想靠跳槽去換一個頭銜。」</p>
            </Collapsible>

            <Collapsible title="「你是否有其他 offer 或正在進行中的面試？」">
              <p className="text-muted-foreground text-sm mt-3 mb-3">誠實回答。有其他選擇不會傷害你。反而有幫助。</p>
              <p className="text-muted-foreground text-sm mb-3">如果你在其他公司已經進入後期階段，而招募人員認為你是強的人選，這個資訊會加快流程。招募人員不想因為流程太慢而失去好的人選。</p>
              <p className="text-muted-foreground text-sm mb-3">記住：有競爭的 offer 是你在 offer 階段談判薪資時最強的籌碼。同時進行兩到三個面試流程不是不忠誠。這是聰明的做法。</p>
              <p className="text-foreground text-sm italic mb-2">「我目前同時在跟另外兩家公司面試。我對機會的選擇很嚴格。這個職缺是我真心感興趣的，這也是我想要繼續推進這個對話的原因。」</p>
              <p className="text-foreground text-sm italic">如果沒有：「我還在找工作的初期階段，對投遞的公司很慎重。這個職缺是我特別鎖定的。」</p>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Section 6: Salary */}
      <section id="salary" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                薪資
              </h2>
              <p className="text-muted-foreground text-lg">
                目標：讓公司先亮出他們的範圍。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            薪資問題是電話篩選中最被誤解的環節之一。我問薪資不是要設陷阱。我只是想避免浪費所有人的時間。如果我們的期望差了 4 萬美元，三輪面試流程對任何人都沒有幫助。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            話說回來，你在這裡的籌碼比你想像的多。在任何談判中，先提出的數字往往會錨定整個對話。目標是讓公司先亮出他們的範圍。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-8">
            完整的薪資策略，包括如何處理 offer 階段和談判整體薪酬方案，請閱讀<Link to="/zh-tw/salary-starter-kit" className="text-gold hover:underline">薪資指南</Link>。
          </p>

          <h3 className="font-heading text-lg text-foreground mb-4">不要先報數字</h3>
          <p className="text-muted-foreground leading-relaxed mb-8">
            一旦你報低了，很難翻盤。一旦你沒有根據地報高了，你會冒著在初期就被淘汰的風險。先迴避。再反問。只有在被逼到角落時才給數字。
          </p>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-6 text-center font-semibold">薪資迴避階梯</p>
            <p className="text-cream/60 text-xs text-center mb-6">把它想成一個階梯。從第一層開始。只有在招募人員施壓時才往上爬。</p>
            <div className="space-y-4">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">第一層</span>
                  <span className="text-cream font-semibold text-sm">初步迴避</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">「我正在找一個能在職責和薪資上同時成長的職位。在確定數字之前，我想先了解這個職缺的完整範圍。」</p>
                <p className="text-cream/50 text-xs mb-3">從這裡開始。永遠。</p>
                <p className="text-cream/60 text-xs">如果被問到目前薪資：「我傾向把重點放在我能為這個職缺帶來什麼價值，而不是我現在的薪資。」在許多國家和地區，雇主詢問你目前的薪資已經是違法的。你不需要分享。即使在合法的地方，主動透露只會限制你。</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">第二層</span>
                  <span className="text-cream font-semibold text-sm">反問</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">「我很樂意討論貴公司為這個職缺編列的預算。如果我們在同一個範圍內，我有信心我們能找到雙方都滿意的方案。」</p>
                <p className="text-cream/50 text-xs mb-3">如果被施壓。80% 的時候他們會在這裡分享範圍。</p>
                <p className="text-cream/60 text-xs mb-2">「在同一個範圍內」這個措辭是刻意的。它不構成承諾。你並沒有同意接受那個範圍內的數字。你在表示開放態度的同時保留了你的選擇。</p>
                <p className="text-cream/60 text-xs">如果招募人員分享了一個範圍，不要馬上反應。說「這很有幫助，謝謝」然後繼續。你會在 offer 階段再談具體數字。</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">第三層</span>
                  <span className="text-cream font-semibold text-sm">錨定</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">「根據我的經驗和〔地點〕這類職位目前的市場行情，我的目標是 14 萬到 15.5 萬美元。不過，我願意根據包含股權和獎金在內的完整薪酬方案來討論。」</p>
                <p className="text-cream/50 text-xs mb-3">只有在被逼到角落時。報範圍的頂端。用整體薪酬。用數據佐證。</p>
                <p className="text-cream/60 text-xs">注意這個結構。錨定在高處。用整體薪酬（不是底薪）來表述。為完整方案留下空間。這給招募人員足夠的資訊繼續推進，同時保護你的立場。</p>
              </div>
            </div>
            <p className="text-cream/50 text-xs text-center mt-6 italic">在每次電話篩選前，在 Levels.fyi、Glassdoor、Payscale 和 LinkedIn Salary 上研究薪資範圍。了解你的職位、層級和地點的行情。</p>
          </div>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <p className="text-destructive text-xs uppercase font-medium mb-3">✕ 關於薪資絕對不要說的話</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li>絕對不要主動透露你目前的薪資。主動分享只會限制你。</li>
              <li>絕對不要說「你們覺得合理就好」。這表示你沒有研究過市場行情。</li>
              <li>薪資問題被提起時，絕對不要說「我猜」或「我不知道」。對自己價值的不確定，表示你沒有做功課。</li>
              <li>不要讓它變成情感訴求。「我需要 X，因為我的房租是⋯⋯」不是談判策略。用市場數據，不要用個人財務需求。</li>
              <li>絕對不要當場接受 offer 而不先考慮一晚。招募人員預期你會談判。跳過談判等於每次都把錢留在桌上。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Setup & Etiquette */}
      <section id="setup" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                設備和禮儀
              </h2>
              <p className="text-muted-foreground text-lg">
                電話還沒開始，你就已經在被評估了。
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">電話</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>通話時站起來。站著的時候你的聲音會更有活力。</li>
                <li>使用耳機。找一個安靜、訊號好的空間。</li>
                <li>說話時微笑。溫暖會透過你的聲音傳遞出來。</li>
                <li>用完整的名字和正面的語調接聽：「你好，我是〔名字 姓氏〕。」</li>
                <li>在電話開始前關掉所有通知。</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">視訊</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>鏡頭調到與眼睛同高。太低像在俯視，太高像在仰望。</li>
                <li>把畫面框在頭部和肩膀佔據大部分螢幕。</li>
                <li>面對窗戶或光源。避免頂部照明。</li>
                <li>乾淨、沒有雜物的背景。</li>
                <li>提前 30 分鐘測試完整設備。一起檢查音訊、燈光和背景。</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">面對面</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>提前 10-15 分鐘到達。不要更早。</li>
                <li>穿著比你認為需要的正式一個等級。</li>
                <li>帶上列印好的履歷、筆記本、筆和問題。</li>
                <li>提供有力的握手和眼神接觸。用你的全名自我介紹。</li>
                <li>手機收好，不是放桌上。</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold text-sm mb-2">所有形式通用</h4>
            <p className="text-foreground text-sm leading-relaxed mb-2">電話篩選通常是 15-30 分鐘。注意時間。給出符合節奏的回答。在我們掛斷前，一定要問下一步。</p>
            <p className="text-foreground text-sm italic">「接下來的流程是什麼，你們的時間表大概如何？」這顯示你的興趣，也讓你知道什麼時候該追蹤後續。</p>
          </div>
        </div>
      </section>

      {/* Section 8: Questions to Ask */}
      <section id="questions" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                該問招募人員的問題
              </h2>
              <p className="text-muted-foreground text-lg">
                你問的問題告訴我的，和你的回答告訴我的一樣多。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            多數求職者把這當成事後想到的事。但它不是。問出精準、具體問題的求職者會脫穎而出。什麼都不問的，或在這個階段問薪資和福利的，會留下不好的印象。問一到兩個問題。不是五個。你的時間有限，品質比數量重要。
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">關於職缺</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>「這個職位在前 90 天的成功標準是什麼？」</li>
                <li>「接手這個職位的人會面對的最大挑戰是什麼？」</li>
                <li>「這個職位為什麼開缺？是補人還是新增職位？」</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">關於團隊和主管</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>「你會怎麼形容這個團隊的工作風格？」</li>
                <li>「用人主管在培養團隊成員方面的方式是什麼？」</li>
              </ul>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h4 className="text-gold text-xs uppercase font-semibold mb-3">關於流程</h4>
            <p className="text-foreground text-sm">「下一步是什麼？你們做出決定的時間表大概多久？」</p>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ 在這個階段應該避免的問題</p>
            <p className="text-foreground text-sm">薪資、福利、休假、遠距工作彈性、和升遷時間表。這些都是重要的問題。但它們屬於 offer 階段。在電話篩選中提問這些，會顯示出錯誤的優先順序。</p>
          </div>
        </div>
      </section>

      {/* Section 9: Red Flags */}
      <section id="redflags" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                需要注意的警訊
              </h2>
              <p className="text-muted-foreground text-lg">
                電話篩選是雙向的。你也應該在評估我們。
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            多數求職者太專注於表現好，以至於忘記評估這是不是一個他們想工作的地方。以下是值得注意的信號。
          </p>

          <div className="space-y-3 mb-6">
            {[
              { flag: "招募人員無法清楚地解釋這個職缺", desc: "如果我對你每天要做什麼含糊其辭，代表這個職缺的定義不夠清楚。這在你入職後會造成問題。", action: "問：「這個職位在 90 天的時候，成功是怎麼衡量的？」" },
              { flag: "這個職缺已經開了很久，或不斷被重新填補", desc: "某個特定職位的高流動率通常反映了團隊、主管或期望方面的問題。", action: "直接問：「這是一個新職位還是補人？」如果是補人，問前一個人發生了什麼事。" },
              { flag: "薪資資訊含糊或閃避", desc: "一家公司開出了職缺卻不附薪資範圍，在電話篩選中又拒絕分享。這值得留意。", action: "" },
              { flag: "流程雜亂無章", desc: "無故重新排定的通話。緩慢的後續回覆。關於職缺的資訊前後矛盾。一家公司怎麼運作招募流程，通常反映了它怎麼運作所有其他事情。", action: "" },
              { flag: "催促你快速行動或快速決定", desc: "緊迫性有時是真的。但如果你在還沒有足夠時間好好評估之前就被催促做承諾，問清楚原因。", action: "「是什麼驅動了這個時間表？」是一個合理的問題。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background border border-border rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium text-sm">{item.flag}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  {item.action && <p className="text-gold text-xs mt-1 italic">{item.action}</p>}
                </div>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm italic">這些都不是自動走人的理由。但進入任何 offer 談判時都要保持清醒的眼光。</p>
        </div>
      </section>

      {/* Section 10: Common Mistakes */}
      <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                淘汰大多數求職者的常見錯誤
              </h2>
              <p className="text-muted-foreground text-lg">
                我不斷看到相同的模式。
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { mistake: "沒有準備", desc: "我在前兩分鐘內就能判斷一個人有沒有花時間準備。50% 的求職者在通話前沒有看過公司網站。" },
              { mistake: "低能量", desc: "我需要相信你想要這份工作。如果你的語氣聽起來像這是你本週申請的三十個之一，我會假設它確實如此。" },
              { mistake: "聲稱無法支持的技能", desc: "履歷寫「專家」，對話中顯示「我用過一點」。那是信任問題。對你的程度誠實。" },
              { mistake: "離題", desc: "回答被問的問題。簡潔地。用真實的案例。然後停下來。" },
              { mistake: "說前雇主的壞話", desc: "即使情況確實很糟。這顯示出判斷力不佳，讓我想你以後會怎麼說我們。" },
              { mistake: "太早問福利", desc: "在我們還沒確認彼此有沒有共同興趣之前就問休假、遠距彈性或獎金，表示優先順序不對。" },
              { mistake: "籠統的動機回答", desc: "「我一直很欣賞你們的品牌」什麼都沒告訴我。要具體。" },
              { mistake: "差的後勤準備", desc: "遲到、背景噪音、視訊不開鏡頭卻不解釋。這些是小事，但暗示了更大的習慣問題。" },
              { mistake: "不問任何問題", desc: "「沒有，我沒問題」表示你沒有認真思考過這個職缺是否適合你。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-destructive/30 transition-colors">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-semibold text-sm">{item.mistake}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: After the Call */}
      <section id="after" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                通話結束後
              </h2>
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">我這邊會發生什麼</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            以下是大多數求職者看不到的。我們掛斷後，我填寫評分表。優點、缺點、和我的決定。我寫下內部筆記，總結這通電話。然後把所有資料提交給用人主管審閱。
          </p>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">掛斷電話後發生的事</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-cream/60 text-xs uppercase mb-3">你</p>
                <div className="space-y-2">
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">寄送後續追蹤信件（2-4 小時內）</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">等待。繼續投其他職缺。</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">收到通知（或沉默）— 2-7 天</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-cream/60 text-xs uppercase mb-3">招募人員</p>
                <div className="space-y-2">
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">填寫評分表（優點、缺點、決定）</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">撰寫內部筆記和摘要</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">提交給用人主管審閱</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">用人主管決定：進入下一輪或淘汰</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-cream/40 text-xs text-center mt-4 italic">時間會有變動。取決於用人主管的時間、其他求職者的進度、以及內部審批流程。</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            用人主管審閱我的筆記，決定是否讓你進入下一輪。這個過程從兩天到一週不等。有時更久。你對這個部分零控制力。你能控制的是後續追蹤。
          </p>

          <h3 className="font-heading text-lg text-foreground mb-4">在 24 小時內寄送後續信件</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            在通話結束後兩到四個小時內寄一封簡短的信件。控制在三到四句話。感謝我的時間。提到對話中的具體內容。重申你的興趣。確認你隨時可以進入下一步。
          </p>

          <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
            <p className="text-gold text-xs uppercase font-medium mb-2">後續信件模板</p>
            <p className="text-foreground text-sm italic">
              「〔名字〕你好，感謝今天的對話。我對〔職缺〕的機會感到興奮，特別是〔我們討論的具體內容〕。期待聽到下一步的消息。如果有任何需要我提供的資訊，請告訴我。」
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            如果你在通話中有一個回答不太好，後續信件是你的機會來補救。保持簡短。
          </p>

          <Collapsible title="📝 在後續信件中修正薄弱的回答">
            <p className="text-foreground text-sm mt-3 italic">
              「有一件事我想針對我們的對話補充。當你問到我在〔X〕方面的經驗時，我說得不夠完整。我其實〔具體澄清〕。我想確保你掌握了完整的資訊。」
            </p>
            <p className="text-muted-foreground text-sm mt-2">這種程度的自我覺察很少見。根據我的經驗，這通常會強化而非削弱求職者的地位。</p>
          </Collapsible>

          <div className="mt-8">
            <h3 className="font-heading text-lg text-foreground mb-4">關於感謝信</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              我說實話。我個人認為感謝信基本上沒什麼用。我從求職者那裡收到很多信件，而感謝信從來沒有改變過我是否讓某人進入下一輪的決定。評分表是根據通話來填寫的，不是根據你事後寄的東西。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              話說回來，有些招募人員和用人主管確實欣賞感謝信。寄一封也沒壞處。如果你要寄，寫得具體且簡短。如果你不想寄，也不用為此擔心。真正重要的是那通電話本身。
            </p>
          </div>

          <div className="mt-8">
            <h3 className="font-heading text-lg text-foreground mb-4">如果你沒有收到回覆</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">
              如果我給了你一個時間表但那個日期過了，再等兩天然後寄一封簡短的追蹤信。
            </p>
            <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
              <p className="text-gold text-xs uppercase font-medium mb-2">追蹤信範例</p>
              <p className="text-foreground text-sm italic">
                「〔名字〕你好，我想追蹤一下我們〔日期〕的對話。我對〔職缺〕仍然很感興趣，想確認一下時間進度。如果需要我回答任何額外的問題，我很樂意配合。」
              </p>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
              如果沒有給時間表，在你的感謝信之後一週追蹤。兩到三週後再追蹤第二次也是合理的。在兩封沒有回覆的信件之後，繼續往前走。
            </p>
            <p className="text-muted-foreground leading-relaxed">
              沉默不一定代表被拒絕。招募時程會因為與你無關的原因而暫停。優先順序改變了。內部審批變慢了。其他面試官的回饋需要時間。
            </p>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 mt-8 text-center">
            <p className="text-foreground font-medium text-sm">
              <span className="text-gold font-semibold">不要停止投遞</span>。即使電話篩選進行得很順利。即使我說我很快會聯繫你。在你手上有一份簽好的 offer 之前，繼續行動。
            </p>
          </div>
        </div>
      </section>

      {/* Section 12: By Career Level */}
      <section id="levels" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                依職涯階段區分
              </h2>
              <p className="text-muted-foreground text-lg">
                電話篩選在每個層級都涵蓋相同的內容。但我關注的重點會根據你的職涯階段而改變。
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Entry Level */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">初階</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                在這個階段，我招的是潛力，不是實績。我看的是學習意願、對公司和職缺的熱情、溝通能力、和相關的專案或實習經驗。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                新鮮人最大的錯誤是假設自己沒有例子。你有。學術專案、實習、志工經歷、和學生幹部經歷都算。從這些經驗中建立 STAR 故事。在電話前大聲練習。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                在這個層級脫穎而出的特質：充分的準備、明確的活力、以及把學術或實習經驗連結到職缺要求的能力。成為我那週通話對象中準備最充分的人，在任何經驗等級都做得到。
              </p>
              <div className="bg-background border border-gold/30 rounded-lg p-4">
                <p className="text-gold text-xs uppercase font-medium mb-2">逐字「現在-過去-未來」範例（初階，數據分析師）</p>
                <p className="text-foreground text-sm italic">「我上個月從〔大學〕畢業，主修統計學。畢業專題中，我為一家本地零售連鎖店建立了一個預測模型，預測季節性需求。模型的準確度在 8% 以內，這家公司到現在還在使用。我去年夏天也在〔公司〕實習，用 SQL 和 Tableau 為業務團隊建立了每週的報告儀表板。我正在找一份全職的分析師職位，在這些統計基礎和實作工具上繼續發展。你們團隊專注在數據驅動的產品決策，這是吸引我申請這個職缺的原因。」</p>
              </div>
            </div>

            {/* Mid Level */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">中階（3-10 年）</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                在三到十年的經驗範圍，我預期看到有可量化成果的實績紀錄。我在評估職涯成長軌跡、具體的技能匹配度、和你在沒有密切督導的情況下獨立工作的能力。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                把你的職涯故事講成一個清晰的脈絡。展示每個職位如何在上一個的基礎上成長，並自然地引導到這個職缺。不要只列出你做了什麼。解釋每一次轉換為什麼合理。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                這也是競爭性 offer 成為真正談判籌碼的階段。同時進行兩到三個面試流程不是不忠誠。是聰明的做法。對你來說最好的結果是拿到多個 offer。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                中階脫穎而出的特質：量化的成果、對結果的明確主導權、以及想要這個職缺在這家公司的具體理由。
              </p>
              <div className="bg-background border border-gold/30 rounded-lg p-4">
                <p className="text-gold text-xs uppercase font-medium mb-2">逐字「現在-過去-未來」範例（中階，產品經理）</p>
                <p className="text-foreground text-sm italic">「我是〔公司〕的產品經理，帶領支付團隊。過去兩年我推出了三個重要功能，將結帳轉換率提升了 22%。在這之前，我在〔公司〕擔任了三年的 Associate PM，從行動團隊轉到平台團隊。每次轉換都是有意的。我想在帶領團隊之前先了解完整的產品架構。現在我準備好擔任一個能端到端擁有一條產品線的資深 PM 角色。你們在 B2B 支付的擴展正是我想投入的領域，而這裡的團隊規模意味著我從第一天就能有真正的主導權。」</p>
              </div>
            </div>

            {/* Executive */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">高階主管</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                在高階主管層級，對話是不同的。我不是在確認你有沒有在做事。我在評估你是否是這個組織在這個特定時刻需要的領導者。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                高階主管的招募流程比較慢。涉及更多利害關係人。預計會有三到五輪面試，為期數週。在這個層級，電話篩選更像是雙方的相互了解，而非正式的評估。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                有一件事要知道：在這個層級，招募人員往往比求職者更資淺。不要讓這改變你對待這場對話的方式。我看過高階主管因為認為「真正的」對話是跟執行長而輕視電話篩選。這種態度會被記錄下來。招募人員仍然控制著整個流程。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                薪酬遠不止底薪。股權、績效獎金、簽約獎金、遞延報酬、和離職保障都是整體方案的一部分。在進入任何對話前就要清楚你的完整數字。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                把每個故事都圍繞在影響整個組織的決策上。建立的團隊。影響的營收。進入的市場。塑造的文化。你案例的規模應該與這個職位的規模相匹配。
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                高階主管層級脫穎而出的特質：策略清晰度、談論組織影響力的能力、以及對話中的沉穩。表現得太積極或焦慮的高階主管，傳達的是不安全感。最好的高階主管求職者把電話篩選當作同儕之間的對話。
              </p>
              <div className="bg-background border border-gold/30 rounded-lg p-4">
                <p className="text-gold text-xs uppercase font-medium mb-2">逐字「現在-過去-未來」範例（高階主管，工程副總）</p>
                <p className="text-foreground text-sm italic">「我目前是〔公司〕的工程副總，帶領一個 120 人的組織，橫跨四個工程團隊。過去三年我從零開始重建了基礎設施團隊，把部署時間從每週一次改為持續部署，並把事故率降低了 60%。在〔公司〕之前，我是〔公司〕的資深總監，帶領的平台遷移支撐了公司從 5,000 萬美元到 2 億美元 ARR 的成長。我正在找一個與執行長緊密合作的角色，為下一階段的成長制定技術策略。你們的 C 輪融資和進軍企業市場，正是我的經驗最有價值的轉折點。」</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section id="cheatsheet" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-10">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">★</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                電話篩選速查表
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                電話前
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#before" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">研究公司</a>（30-60 分鐘）</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">在 LinkedIn 上查看招募人員</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#before" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">拆解職缺描述</a>（必備條件 vs 加分條件）</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">把經驗對照到每個關鍵要求</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">準備<a href="#story" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">「現在-過去-未來」自我介紹</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">準備三個首要理由</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">建立 5-7 個 <a href="#frameworks" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">STAR 故事</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">建立一頁小抄</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">準備好談論履歷上的每項技能</span></li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                通話中
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">站起來（電話）或鏡頭調到眼睛高度（視訊）</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">用<a href="#story" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">「現在-過去-未來」</a>回答自我介紹（60-90 秒）</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">用 <a href="#frameworks" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">STAR 或 CAR</a> 回答行為面試問題</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">用<a href="#salary" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">三層級迴避框架</a>處理薪資</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">問 1-2 個<a href="#questions" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">精準的問題</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">在掛斷前問下一步</span></li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                困難問題速查
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">為什麼離開：朝目標前進，不要逃離。一到兩句話。保持正面。</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#tough" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">弱點</a>：真實的、可管理的、正在改善中的。用行為-影響-改善-結果公式。</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#salary" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">薪資</a>：先迴避 → 再反問 → 只有在必須時才報高數字。</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">五年計畫：符合職缺的企圖心。顯示你想在這裡成長。</span></li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                通話後
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#after" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">2-4 小時內寄送後續信件</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">提到對話中的具體內容</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">簡短修正任何薄弱的回答</span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">繼續投遞其他職缺</span></li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 md:col-span-2">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                需要注意的警訊
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#redflags" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">模糊的職缺描述</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#redflags" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">閃避薪資資訊</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#redflags" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">長期開缺或反覆補人的職位</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#redflags" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">雜亂無章的招募流程</a></span></li>
                <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm"><a href="#redflags" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">催促你快速決定</a></span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Free Guides */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">
                額外資源
              </h2>
              <p className="text-cream/60">持續提升你的求職競爭力</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">完整薪資策略</p>
              <span className="text-gold text-sm font-medium">薪資入門包 →</span>
            </Link>
            <Link to="/zh-tw/resume-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">拿到更多篩選電話</p>
              <span className="text-gold text-sm font-medium">履歷指南 →</span>
            </Link>
            <Link to="/zh-tw/interview-preparation-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">通過篩選了？贏下面試。</p>
              <span className="text-gold text-sm font-medium">面試準備指南 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons isZhTw />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default RecruiterScreenGuideZhTw;