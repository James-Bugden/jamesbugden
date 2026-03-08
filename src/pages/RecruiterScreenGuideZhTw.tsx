import { FileText, Clock, Linkedin, Phone, Video, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, MessageSquare, Target, Shield, Briefcase, ChevronDown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import { useState } from "react";

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

const RecruiterScreenGuideZhTw = () => {
  useTrackGuideProgress("recruiter-screen");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="如何通過招募人員的電話篩選 | James Bugden"
        description="資深招募官的完整實戰手冊。逐字範例、薪資話術、以及招募人員使用的評分表。"
        path="/zh-tw/recruiter-screen-guide"
        lang="zh-Hant-TW"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <button
              onClick={() => navigate("/recruiter-screen-guide")}
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <Phone className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">免費職涯資源</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            如何通過招募人員的<br className="hidden sm:block" />電話篩選
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

      {/* Introduction */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            我審閱過超過 20,000 份履歷。我在頂尖國際企業完成了 500 次以上的錄用。我做過數千次電話篩選。
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            多數求職者把招募人員的電話篩選當成熱身。但它不是。<span className="text-gold font-semibold">它是一道關卡。</span>沒有通過我這關，你見不到用人主管。
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            這份指南涵蓋了完整的流程。電話前要做什麼。通話中我在評估什麼。如何應對每一個問題，包括薪資。掛斷電話後該做什麼。以及不同職涯階段的篩選差異。
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 text-center">
            <p className="text-foreground font-medium">
              按照這份指南去準備。你會比我每週通話的 <span className="text-gold font-semibold">90% 求職者都準備得更充分。</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: The Scorecard */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section className="py-14 md:py-20">
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

          {/* What I evaluate */}
          <div className="space-y-4">
            {[
              { title: "資格符合度", desc: "你的技能是否符合職缺需求？電話篩選是在確認履歷上寫的東西是否屬實。" },
              { title: "動機和真實興趣", desc: "你換工作的理由是否正確？我越能看到這個職缺與你想要的方向一致，你接受 offer 的機率就越高。" },
              { title: "溝通能力", desc: "你有沒有言簡意賅地用真實的例子回答？我在想你面對用人主管時會怎麼表現。" },
              { title: "薪資期望一致性", desc: "如果我們的期望差了 4 萬美元，三輪面試流程對任何人都沒有幫助。" },
              { title: "警訊", desc: "無法解釋的空窗期。履歷上的經歷無法自圓其說。對前雇主的負面評價。遲到。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <span className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-foreground font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <p className="text-foreground text-sm leading-relaxed italic">
              <span className="text-gold font-semibold">多數求職者不知道的事：</span>當我讓你進入下一輪，我是把自己的名字押在這個決定上。如果你在用人主管面前表現很差，受影響的是我的判斷力。我不是在找淘汰你的理由。我是在找足夠的信心來承擔這個風險。
            </p>
          </div>
        </section>

        {/* Section 2: Before the Call */}
        <section className="pb-14 md:pb-20">
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
              <ul className="space-y-2">
                {[
                  "閱讀公司網站。使命、產品、領導團隊。",
                  "搜尋最新消息。融資、併購、產品發表。",
                  "查看 Glassdoor。注意評價中的趨勢，不要只看分數。",
                  "看他們的 LinkedIn 頁面。看他們發了什麼內容，最近有誰加入。",
                  "如果他們有產品，親自試用。哪怕只是免費試用。",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-xs uppercase font-medium mb-1">✕ 模糊</p>
                  <p className="text-foreground text-sm italic">「我聽說貴公司的文化很好。」</p>
                </div>
                <div className="bg-background border border-gold/30 rounded-lg p-3">
                  <p className="text-gold text-xs uppercase font-medium mb-1">✓ 具體</p>
                  <p className="text-foreground text-sm italic">「我讀到你們上個月完成了 C 輪融資，進軍東南亞市場。」</p>
                </div>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">研究招募人員</h3>
              <p className="text-muted-foreground text-sm mb-3">在電話前去看看我的 LinkedIn。我看得到你瀏覽過我的個人檔案。我很欣賞這種行為。</p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-gold text-xs uppercase font-medium mb-1">開場範例</p>
                <p className="text-foreground text-sm italic">「我在 LinkedIn 上看到你是從〔公司〕過來的，轉換順利嗎？」</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">拆解職缺描述</h3>
              <p className="text-muted-foreground text-sm mb-4">職缺描述是你的作弊指南。建立一個三欄表格：</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["職缺要求", "你的相關經驗", "具體案例"].map((col) => (
                  <div key={col} className="bg-background border border-border rounded-lg p-3">
                    <p className="text-foreground text-xs font-medium">{col}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">建立你的小抄</h3>
              <ul className="space-y-2">
                {[
                  "你對公司了解的三個具體事實",
                  "你想要這份工作的三個首要理由",
                  "職缺要求對照你的經驗",
                  "「請介紹一下你自己」的重點",
                  "兩到三個準備好的故事和成果",
                  "五個要問的問題",
                  "你的目標薪資範圍",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm mt-3 italic">控制在一頁。不要逐字照念。</p>
            </div>
          </div>
        </section>
      </main>

      {/* Section 3: Know Your Story */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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

          <div className="space-y-3">
            <Collapsible title="📝 逐字範例：行銷經理">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我目前是 TechCorp 的行銷經理，帶領一個五人團隊。過去兩年，我把自然流量提升了 150%，每次開發客戶的成本降低了 35%。在這之前，我在一家數位行銷公司工作了三年，負責 B2B 客戶的內容策略和付費媒體。我想轉到企業端的職位，在那裡我能掌管整個行銷漏斗。我讀到你們正在擴展企業客戶市場，這一點特別吸引我。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：新鮮人">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我最近從〔大學〕畢業，主修資訊工程。大四的時候，我帶領一個四人團隊為一個地方非營利組織開發了一個手機 App。我們準時交付，第一個月就有 200 個活躍用戶，並減少了他們 40% 的行政工作量。我也完成了兩次實習。我正在找一份全職工作，在這些基礎上繼續成長。你們的工程文化和對初階工程師的指導重視，是我特別注意到的。」
              </p>
            </Collapsible>
            <Collapsible title="📝 逐字範例：轉職者">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                「我過去六年都在教育領域，最近的職位是高中科主任，管理一個八人團隊。過去一年我一直在轉向教學設計，完成了兩項認證，並以自由接案的方式建立了三門線上課程。我準備好全職投入這個領域了。你們專注於企業培訓課程，正是我想要發揮這些技能的地方。」
              </p>
            </Collapsible>
          </div>

          <div className="mt-10">
            <h3 className="font-heading text-xl text-foreground mb-4">你想要這份工作的三個首要理由</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: "1", label: "為什麼是這家公司", desc: "提到一些真實的、具體的事。" },
                { num: "2", label: "為什麼是這個職缺", desc: "把日常工作內容連結到你的專業驅動力。" },
                { num: "3", label: "為什麼是現在", desc: "解釋為什麼這是你職涯的正確下一步。" },
              ].map((item) => (
                <div key={item.num} className="bg-background border border-border rounded-xl p-4 text-center">
                  <span className="inline-flex w-8 h-8 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-sm mb-2">{item.num}</span>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.label}</h4>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-destructive text-xs uppercase font-medium mb-2">✕ 會毀掉你回答的說法</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>「我需要新的挑戰。」<span className="text-muted-foreground text-xs">（模糊，適用於任何工作）</span></li>
                <li>「通勤距離剛好。」<span className="text-muted-foreground text-xs">（跟職缺無關）</span></li>
                <li>「我一直很欣賞你們的品牌。」<span className="text-muted-foreground text-xs">（空洞，沒有實質內容）</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Answer Frameworks */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
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

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">STAR 方法</h3>
              <p className="text-muted-foreground text-xs mb-4">總共 90-120 秒</p>
              <div className="space-y-3">
                {[
                  { letter: "S", label: "情境", desc: "描述場景。1-2 句話。" },
                  { letter: "T", label: "任務", desc: "你負責什麼？" },
                  { letter: "A", label: "行動", desc: "你做了什麼？花 60% 的時間在這裡。", highlight: true },
                  { letter: "R", label: "結果", desc: "結果是什麼？用數據。" },
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

          <Collapsible title="📝 STAR 範例：帶領團隊度過困難轉變">
            <p className="text-foreground text-sm leading-relaxed mt-3 italic">
              「我的公司決定在 90 天內把整個資料基礎設施遷移到新平台。〔情境〕我是專案負責人，負責協調四個團隊。〔任務〕我建立了每週的跨部門站會，製作了共用的追蹤文件，並親自管理三條最複雜的資料管線。第六週遇到重大阻礙時，我快速向上反映。〔行動〕我們如期完成。零資料遺失。成本比預算低 15%，報告時間縮短一半。〔結果〕」
            </p>
          </Collapsible>

          <div className="mt-8">
            <h3 className="font-heading text-lg text-foreground mb-4">準備 5-7 個故事，涵蓋：</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {["克服挑戰", "領導或影響他人", "處理衝突", "快速學習新事物", "做出困難的決定", "改善流程", "在壓力下交付成果"].map((story, i) => (
                <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                  <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold">{i + 1}</span>
                  <p className="text-foreground text-sm">{story}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Section 5: Tough Questions */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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
              <p className="text-muted-foreground text-sm mb-4">把重點放在你要前往的方向。不是你要逃離的東西。永遠不要說前雇主的壞話。</p>
              <div className="space-y-3">
                <Collapsible title="目前在職">
                  <p className="text-foreground text-sm mt-3 italic">「我在目前的職位學到了很多，也很自豪團隊完成的成果。我準備好接受更大的範圍了。這個職缺吸引我是因為〔具體原因〕。這是我想走的方向。」</p>
                </Collapsible>
                <Collapsible title="被裁員">
                  <p className="text-foreground text-sm mt-3 italic">「公司經歷了組織重整，我的職位被取消了。我的績效評估一直很好，最近一次在前 25%。從那之後我一直在〔具體活動〕。我已經準備好加入新團隊了。」</p>
                </Collapsible>
                <Collapsible title="被解僱">
                  <p className="text-foreground text-sm mt-3 italic">「公司和我對這個職位有不同的期待。我反思過那段經歷，學到了〔具體教訓〕。我在找一個〔相關適配點〕的環境。」</p>
                </Collapsible>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">「你最大的弱點是什麼？」</h3>
              <p className="text-muted-foreground text-sm mb-3">說出一個真實的弱點。展現自我覺察。描述你正在怎麼改善。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mb-4">
                <p className="text-foreground text-sm font-medium">公式：<span className="text-gold">行為 → 影響 → 改善方法 → 結果</span></p>
              </div>
              <div className="space-y-3">
                <Collapsible title="📝 範例：授權委派">
                  <p className="text-foreground text-sm mt-3 italic">「我有一個傾向，會把我做得好的任務抓在手上。在上一個職位，我成了瓶頸。我開始每週做授權檢視，至少把兩項重要任務分配給其他人。我們最近兩次的產品發佈都如期完成。我的主管特別提到我在這方面的進步。」</p>
                </Collapsible>
                <Collapsible title="📝 範例：公開演講">
                  <p className="text-foreground text-sm mt-3 italic">「在大型場合做簡報曾經讓我焦慮。18 個月前我加入了 Toastmasters 演講社團，承諾每月上台一次。到現在我已經主持了兩場全員會議和一場 40 人的客戶提案。它不再阻礙我了。」</p>
                </Collapsible>
              </div>
            </div>

            <Collapsible title="「請告訴我一次你失敗的經驗。」">
              <p className="text-muted-foreground text-sm mt-3 mb-3">這個問題在測試自我覺察和成長。</p>
              <p className="text-foreground text-sm italic">「在我擔任團隊主管的第二年，我推動在用戶研究不夠充分的情況下發佈一個功能。採用率很低，接下來兩個月都在重新修改。從那以後，我在每個功能計畫進入開發前都設立了研究檢查點。我們之後發佈了四個重要功能，四個都在第一個月達到了採用目標。」</p>
            </Collapsible>

            <Collapsible title="「你五年後的規劃是什麼？」">
              <p className="text-muted-foreground text-sm mt-3 mb-3">展示符合這個職缺的企圖心。顯示你想在這裡成長。</p>
              <p className="text-foreground text-sm italic">「五年後我想帶領一個團隊，負責更大範圍的工作。這個職缺感覺是正確的一步。我想要深入〔具體領域〕，在這裡建立成績，然後從這裡成長。我不想頻繁跳槽。」</p>
            </Collapsible>

            <Collapsible title="「你是否有其他 offer 或正在進行中的面試？」">
              <p className="text-muted-foreground text-sm mt-3 mb-3">誠實回答。有其他選擇不會傷害你。反而有幫助。</p>
              <p className="text-foreground text-sm italic">「我目前同時在跟另外兩家公司面試。我對機會的選擇很嚴格。這個職缺是我真心感興趣的。」</p>
              <p className="text-foreground text-sm italic mt-2">如果沒有：「我還在找工作的初期階段，對投遞的公司很慎重。這個職缺是我特別鎖定的。」</p>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Section 6: Salary */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
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

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-6 text-center font-semibold">薪資迴避階梯</p>
            <div className="space-y-4">
              {[
                { level: "第一層", label: "迴避", script: "「我想先多了解這個職缺再討論薪酬。你能分享這個職位的預算範圍嗎？」", note: "從這裡開始。60% 的時候有效。" },
                { level: "第二層", label: "反問", script: "「我想確認我們的方向一致。這個職缺核准的範圍是多少？」", note: "如果被施壓。大部分剩下的時候有效。" },
                { level: "第三層", label: "錨定", script: "「根據我的研究和經驗，我的目標整體薪酬在 X 到 Y 的範圍。」", note: "只有在被逼到角落時。報範圍的頂端。用整體薪酬。" },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">{item.level}</span>
                    <span className="text-cream font-semibold text-sm">{item.label}</span>
                  </div>
                  <p className="text-cream/80 text-sm italic mb-2">{item.script}</p>
                  <p className="text-cream/50 text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <p className="text-destructive text-xs uppercase font-medium mb-3">✕ 關於薪資絕對不要說的話</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li>絕對不要主動透露你目前的薪資。</li>
              <li>絕對不要說「你們覺得合理就好」。</li>
              <li>薪資問題被提起時，絕對不要說「我猜」或「我不知道」。</li>
              <li>不要讓它變成情感訴求。用市場數據，不要用個人財務需求。</li>
              <li>絕對不要當場接受 offer 而不先考慮一晚。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Setup & Etiquette */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                設備和禮儀
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">電話</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>通話時站起來</li>
                <li>使用耳機</li>
                <li>說話時微笑</li>
                <li>用完整的名字接聽</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">視訊</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>鏡頭調到與眼睛同高</li>
                <li>面對窗戶或光源</li>
                <li>乾淨、沒有雜物的背景</li>
                <li>提前 30 分鐘測試設備</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">面對面</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>提前 10-15 分鐘到達</li>
                <li>穿著比你認為需要的正式一級</li>
                <li>帶上列印好的履歷和問題</li>
                <li>手機收好，不是放桌上</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Questions to Ask */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                該問招募人員的問題
              </h2>
              <p className="text-muted-foreground text-lg">
                問一到兩個。品質比數量重要。
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">關於職缺</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>「前 90 天的成功標準是什麼？」</li>
                <li>「這個職位最大的挑戰是什麼？」</li>
                <li>「這是補人還是新增職位？」</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">關於團隊</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>「這個團隊的工作風格是什麼？」</li>
                <li>「用人主管在培養團隊成員方面的方式？」</li>
              </ul>
            </div>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ 在這個階段應該避免</p>
            <p className="text-foreground text-sm">薪資、福利、休假、遠距工作彈性、升遷時間表。這些留到 offer 階段。</p>
          </div>
        </div>
      </section>

      {/* Section 9: Red Flags */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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

          <div className="space-y-3">
            {[
              { flag: "招募人員無法清楚地解釋這個職缺", action: "問：「90 天時成功是怎麼衡量的？」" },
              { flag: "這個職缺已經開了很久或不斷被補人", action: "問：「這是新職位還是補人？」" },
              { flag: "薪資資訊含糊或閃避", action: "如果他們連範圍都不願意分享，值得留意。" },
              { flag: "流程雜亂無章", action: "無故重新排定的通話、緩慢的後續回覆、資訊前後矛盾。" },
              { flag: "催促你快速決定", action: "問：「是什麼驅動了這個時間表？」" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background border border-border rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium text-sm">{item.flag}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.action}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 10: Common Mistakes */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                淘汰大多數求職者的常見錯誤
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { mistake: "沒有準備", desc: "50% 的求職者在通話前沒有看過公司網站。" },
              { mistake: "低能量", desc: "如果語氣聽起來像這是你申請的三十個之一，我會這樣假設。" },
              { mistake: "聲稱無法支持的技能", desc: "履歷寫「專家」，對話中顯示「我用過一點」。" },
              { mistake: "離題", desc: "回答被問的問題。用真實的案例。然後停下來。" },
              { mistake: "籠統的動機回答", desc: "「我一直很欣賞你們的品牌」什麼都沒告訴我。" },
              { mistake: "差的後勤準備", desc: "遲到、背景噪音、視訊不開鏡頭卻不解釋。" },
              { mistake: "不問任何問題", desc: "「沒有，我沒問題」表示你沒有認真思考過這個職缺。" },
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
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                通話結束後
              </h2>
            </div>
          </div>

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
                    <p className="text-cream text-sm">提交給用人主管審閱</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">用人主管決定：進入下一輪或淘汰</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
            <p className="text-gold text-xs uppercase font-medium mb-2">後續信件模板</p>
            <p className="text-foreground text-sm italic">
              「〔名字〕你好，感謝今天的對話。我對〔職缺〕的機會感到興奮，特別是〔我們討論的具體內容〕。期待聽到下一步的消息。如果有任何需要我提供的資訊，請告訴我。」
            </p>
          </div>

          <Collapsible title="📝 在後續信件中修正薄弱的回答">
            <p className="text-foreground text-sm mt-3 italic">
              「有一件事我想針對我們的對話補充。當你問到我在〔X〕方面的經驗時，我說得不夠完整。我其實〔具體澄清〕。我想確保你掌握了完整的資訊。」
            </p>
          </Collapsible>

          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 mt-6 text-center">
            <p className="text-foreground font-medium text-sm">
              <span className="text-gold font-semibold">不要停止投遞</span>。在你手上有一份簽好的 offer 之前，繼續行動。
            </p>
          </div>
        </div>
      </section>

      {/* Section 12: By Career Level */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                依職涯階段區分
              </h2>
              <p className="text-muted-foreground text-lg">
                相同的內容，不同層級的重點。
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                level: "初階",
                focus: "招的是潛力，不是實績。學習意願、對公司和職缺的熱情、溝通能力。",
                example: "「我上個月從〔大學〕畢業，主修統計學。畢業專題中，我建立了一個預測模型，準確度在 8% 以內。我在〔公司〕實習，用 SQL 和 Tableau 建立每週的報告儀表板。我正在找一份全職的分析師職位，在這些基礎上繼續發展。」",
              },
              {
                level: "中階（3-10 年）",
                focus: "有可量化成果的實績紀錄。職涯成長軌跡、技能匹配度、獨立工作能力。",
                example: "「我是〔公司〕的產品經理，帶領支付團隊。我推出了三個重要功能，將結帳轉換率提升了 22%。每次轉換都是有意的——我想在帶領團隊前先了解完整的產品架構。現在我準備好擔任資深 PM。」",
              },
              {
                level: "高階主管",
                focus: "策略清晰度、組織影響力、對話中的沉穩。把每個故事都圍繞在影響整個組織的決策上。",
                example: "「我是工程副總，帶領一個 120 人的組織。我從零開始重建了基礎設施團隊，把部署改為持續部署，事故率降低 60%。我正在找一個與執行長緊密合作的角色，為下一階段的成長制定技術策略。」",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-heading text-lg text-gold mb-2">{item.level}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.focus}</p>
                <div className="bg-background border border-gold/30 rounded-lg p-4">
                  <p className="text-foreground text-sm italic">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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
                {["研究公司（30-60 分鐘）", "在 LinkedIn 上查看招募人員", "拆解職缺描述（必備 vs 加分）", "把經驗對照到每個關鍵要求", "準備「現在-過去-未來」自我介紹", "準備三個首要理由", "建立 5-7 個 STAR 故事", "建立一頁小抄"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                通話中
              </h3>
              <ul className="space-y-3">
                {["站起來（電話）或鏡頭調到眼睛高度（視訊）", "用「現在-過去-未來」回答自我介紹（60-90 秒）", "用 STAR 或 CAR 回答行為面試問題", "用三層級迴避框架處理薪資", "問 1-2 個精準的問題", "在掛斷前問下一步"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                困難問題速查
              </h3>
              <ul className="space-y-3">
                {["為什麼離開：朝目標前進，不要逃離。保持正面。", "弱點：真實的、可管理的、正在改善中的。", "薪資：先迴避 → 再反問 → 只有在必須時才報高數字。", "五年計畫：符合職缺的企圖心。顯示你想在這裡成長。"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                通話後
              </h3>
              <ul className="space-y-3">
                {["2-4 小時內寄送後續信件", "提到對話中的具體內容", "簡短修正任何薄弱的回答", "繼續投遞其他職缺"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
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

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2024 James Bugden. 版權所有。</span>
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

export default RecruiterScreenGuideZhTw;
