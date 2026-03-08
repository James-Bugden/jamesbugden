import { FileText, Clock, Linkedin, Briefcase, AlertTriangle, CheckCircle2, XCircle, ChevronDown, Menu, ArrowRight, Shield, Target, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import { useState, useEffect } from "react";
import JobOfferScorecard from "@/components/job-offer/JobOfferScorecard";

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
  { id: "before-offer", label: "01 · 面試階段評估" },
  { id: "when-offer", label: "02 · 收到錄取通知" },
  { id: "evaluate", label: "03 · 6 項評估要點" },
  { id: "need-job", label: "04 · 需要這份工作" },
  { id: "multiple", label: "05 · 多份工作機會" },
  { id: "competitor", label: "06 · 來自競爭對手" },
  { id: "counteroffers", label: "07 · 反聘條件" },
  { id: "decline", label: "08 · 如何拒絕" },
  { id: "accept", label: "09 · 如何接受" },
  { id: "scorecard", label: "10 · 評分卡" },
  { id: "flags", label: "紅旗與綠旗" },
  { id: "scripts", label: "範本與模板" },
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

const scorecardCategories = [
  { key: "compensation", label: "薪酬", questions: ["底薪是否達到或高於我的職位、級別和城市的市場行情？", "我是否了解完整的薪酬方案（獎金、股權、福利）？", "我是否比較了整體價值，而非帳面薪資？"] },
  { key: "job-content", label: "工作內容與日常工作", questions: ["我知道這個職位典型的一週是什麼樣子嗎？", "成功指標是否清楚且可達成？", "這份工作會讓我充滿動力還是消耗殆盡？"] },
  { key: "boss", label: "未來主管", questions: ["用人主管在面試過程中有投入嗎？", "我了解他們的管理風格嗎？", "我信任這個人會支持我的成長嗎？"] },
  { key: "culture", label: "公司文化", questions: ["面試過程是否感覺有組織且受到尊重？", "現任員工平均任期超過 2 年嗎？", "入職流程是否展現了對新人的投資？"] },
  { key: "benefits", label: "福利與工作生活平衡", questions: ["我是否計算了福利方案的整體價值？", "特休天數和彈性政策是否符合我的生活需求？", "是否有成長福利（培訓預算、學費補助、研討會）？"] },
  { key: "growth", label: "成長潛力", questions: ["這個職位會幫助我達到 3-5 年的職涯目標嗎？", "員工是否在內部獲得晉升？", "是否有專業發展預算？"] },
];

const JobOfferGuideZhTw = () => {
  useTrackGuideProgress("job-offer-zh");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="收到錄取通知？如何做出不後悔的決定 | James Bugden"
        description="招募人員的完整指南：評估、接受或拒絕工作機會。互動式評分卡、逐字範本，以及薪水以外的 6 項評估要點。"
        path="/zh-tw/job-offer-guide"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">免費職涯資源</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            收到錄取通知？<br className="hidden sm:block" />如何做出不後悔的決定
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">評估、接受或放棄工作機會的完整指南</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden · 職涯教練 · Uber 資深 Recruiter</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">閱讀時間 30 分鐘</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">根據 13 篇《哈佛商業評論》關於工作機會、談判與職涯轉換的文章整理</p>
        </div>
      </section>

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">你收到了錄取通知。現在才是真正困難的開始。</p>
          <p className="text-foreground text-lg leading-relaxed mb-6">很多人花在選餐廳吃飯的時間，比評估一份工作機會還多。他們看到薪水數字，感到一陣興奮，當天就答應了。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">六個月後，他們想離開。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">我從桌子的另一邊審視每一份工作機會。我發出錄取通知。我看著人們太快接受、談判失誤、用讓自己後悔的方式拒絕。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">這份指南拆解完整的錄取決策流程。一步一步來。從你接到電話的那一刻，到你簽約、拒絕或離開。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">每個章節都包含公司那一邊在想什麼。因為了解桌子另一邊發生的事，會改變一切。</p>
          <p className="text-muted-foreground leading-relaxed">這份指南取材自 13 篇《哈佛商業評論》的文章，由研究人員和職涯專家撰寫。我用招募人員的視角過濾了他們的建議，並補上他們遺漏的部分：招募端的真實情況。</p>
        </div>
      </section>

      {/* Section 1: Before the Offer */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section id="before-offer" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">在錄取通知到來之前</h2>
              <p className="text-muted-foreground text-lg">面試階段就開始評估</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">大多數指南從收到錄取通知開始。太遲了。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">你的決定從面試過程就開始了。每一次和用人主管、招募人員、團隊成員的對話，都是收集資訊的機會。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">當錄取電話打來時，你應該已經對這個職位是否適合你有很強的判斷了。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">最終面試階段要評估什麼</h3>
            <p className="text-foreground font-semibold text-sm mb-2">問用人主管：</p>
            <ul className="space-y-2 mb-4">
              {["「請描述一下這個職位典型的一週是什麼樣子？」", "「前 6 個月的成功標準是什麼？」", "「上一位擔任這個職位的人後來怎麼了？」", "「什麼樣的員工在你的團隊裡表現最好？」"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-foreground font-semibold text-sm mb-2">問招募人員：</p>
            <ul className="space-y-2">
              {["「決定的時間表是什麼？」", "「除了底薪之外，完整的薪資福利方案是什麼樣的？」", "「最終面試階段有多少候選人？」"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">這些問題給你兩樣東西。第一，做決定需要的資訊。第二，公司重視什麼的訊號。</p>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的觀點：在錄取通知前解讀訊號</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">注意招募人員在最終面試後的溝通方式。如果他們主動打電話確認、詢問你的意願，並給你來自團隊的正面回饋，錄取通知即將到來。</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">這時候就該開始做功課了。不是等到錄取通知到了之後。</p>
            <p className="text-muted-foreground text-sm leading-relaxed">如果招募人員在最終面試後沉默好幾天，公司正在候選人之間做決定，或者這個職位被暫停了。直接問：「目前流程進展到哪裡了？」你有權知道。</p>
          </div>
        </section>
      </main>

      {/* Section 2: When the Offer Comes */}
      <section id="when-offer" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">收到錄取通知時</h2>
              <p className="text-muted-foreground text-lg">電話來了。以下是該做和不該做的事。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">表達興奮。然後要求時間。</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">當招募人員打電話告訴你錄取時，你的第一反應是立刻回應。說好。說不。當場開始談判。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">不要這樣做。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">要求時間。最多一週是合理的。大多數公司預期你會這樣做。好的招募人員會尊重你的請求。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">時間表為什麼重要。公司花了好幾週（有時好幾個月）面試候選人。他們選了你。他們要你。多 5-7 天不會改變他們的決定。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">但倉促的決定會改變你的人生。</p>

          <div className="bg-executive-green rounded-xl p-5 md:p-6 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-3 font-semibold">試試這樣說：</p>
            <p className="text-cream/90 text-sm italic leading-relaxed">「非常感謝您的錄取通知。我對這個職位和團隊很興奮。我想給這個決定應有的思考和重視。我是否能花幾天時間好好評估，在 [具體日期] 之前回覆您？」</p>
            <p className="text-cream/50 text-xs mt-3">注意這個範本的兩個重點。第一，你先表達感謝和興奮。第二，你給出一個具體日期。不是「幾天」。是日曆上的一個確切日期。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">在錄取電話上問對的問題</h3>
          <div className="space-y-4 mb-8">
            {[
              { q: "「目前還有多少其他候選人在考慮這個職位？」", a: "這告訴你你有多少談判空間。如果你是唯一的人選，公司會更有彈性。如果有很強的備選人選，公司對漫長的決策時間會缺乏耐心。" },
              { q: "「團隊對我面試的回饋是什麼？」", a: "答案顯示你的位置。強烈的正面回饋代表公司對你很有信心。褒貶不一的回饋代表他們有所保留，也有備案。" },
              { q: "「你們需要我在什麼時候給最終答覆？」", a: "這確認了時間表。如果招募人員說「這週末之前」，你知道你的窗口。如果他們說「慢慢來」，你有更多時間評估。" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">這些問題感覺很大膽。但招募人員已經決定錄用你了。問這些問題不會讓你失去錄取機會。你在展現你的深思熟慮和策略性。</p>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mb-8">
            <h4 className="text-gold font-semibold mb-2">我的觀點：你做決定的這段時間，他們那邊發生什麼事</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">招募人員已經告訴用人主管你是首選。團隊很興奮。他們把其他候選人擱置了。</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">現在他們等待。</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">在你做決定的這段時間，招募人員會：跟你確認一兩次（這是正常的，不是在施壓）、讓備選候選人保持聯繫、準備回答你的後續問題、如果你接受就開始規劃入職流程。</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">一個在 24 小時內逼你做決定的招募人員是在亮紅旗。健康的公司會給你空間。</p>
            <p className="text-muted-foreground text-sm leading-relaxed">但反過來說。如果招募人員告訴你有一位很強的第二人選，而且時間很緊，請認真看待這個訊號。給招募人員一個明確的時間表，然後信守承諾。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">不要做的事</h3>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <ul className="space-y-3 text-foreground text-sm">
              <li><strong>不要沉默。</strong> 失聯會讓招募人員緊張。如果你需要更多時間，直說。</li>
              <li><strong>不要在問問題時表現得挑剔或懷疑。</strong> 保持正面。保持好奇。</li>
              <li><strong>不要當場接受。</strong> 睡一覺再決定。和你信任的人談談。把數字算清楚。</li>
              <li><strong>不要捏造競爭的工作機會</strong>來製造假的緊迫感。誠實面對。如果你有其他面試在進行中，直說。</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: 6 Things to Evaluate */}
      <section id="evaluate" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">薪水之外，要評估的 6 件事</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">大多數人只關注一個數字：底薪。但薪水只是全貌的一小部分。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">1. 薪資與整體薪酬</h3>
            <p className="text-muted-foreground text-sm mb-3">從研究開始。在 104 人力銀行、CakeResume、Glassdoor 和 LinkedIn Salary 上查詢這個職位的級別和所在城市。</p>
            <p className="text-foreground text-sm font-semibold mb-2">計算完整的薪酬方案：</p>
            <ul className="space-y-2 mb-4">
              {["底薪（月薪 x 保障月數）", "獎金結構（以及目標達成的實際可能性）", "股權或股票選擇權（以及歸屬時間表）", "簽約獎金", "勞工退休金提撥（法定 6% 之外是否有額外提撥）", "團體保險與健康福利"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">一篇 HBR 文章發現，大約四分之三收到外部工作機會的高階主管，並不完全了解新的薪酬與目前薪酬的比較。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">2. 工作內容與日常工作</h3>
            <ul className="space-y-2 mb-4">
              {["日常任務會讓我充滿動力還是精疲力竭？", "我想管理人還是做獨立貢獻者？", "這個職位是否符合我想做的專案類型？", "成功指標是否清楚且可達成？"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">職位說明書經常過時。直接問用人主管：「請描述一下這個職位典型的一週是什麼樣子？」</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">3. 你未來的主管</h3>
            <p className="text-muted-foreground text-sm mb-3">你的主管對你日常工作體驗的影響，超過公司品牌、薪水或辦公環境。</p>
            <p className="text-muted-foreground text-sm mb-3">直接和你未來的主管聊他們的管理風格、如何衡量團隊的成功、什麼樣的員工在他們手下表現最好、如何處理意見分歧。</p>
            <p className="text-muted-foreground text-sm">注意面試過程中的體驗。你未來的主管準時出現了嗎？他們有投入嗎？主管在面試中的表現，是他們在工作中最好的版本。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">4. 公司文化</h3>
            <p className="text-muted-foreground text-sm mb-3">從外部評估文化很難。但有跡可循。</p>
            <ul className="space-y-2 mb-4">
              {["公司如何安排你的面試（有組織還是混亂？）", "他們是否在面試過程中發送深夜或週末的郵件", "員工待多久（在 LinkedIn 上查看平均任期）", "上一位擔任這個職位的人後來怎麼了"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mb-4">問現任員工：「加入之前，你希望你知道什麼？」</p>
            <Collapsible title="如何接觸現任員工">
              <div className="space-y-3 mt-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">透過你的推薦人。</strong> 如果有人推薦你，直接問他們。</p>
                <p><strong className="text-foreground">透過 LinkedIn 人脈。</strong> 搜尋在該公司類似職位或部門工作的人。</p>
                <p><strong className="text-foreground">問用人主管。</strong>「我想和團隊裡的人聊聊，更了解日常的工作情況。」</p>
                <p><strong className="text-foreground">要求團隊見面。</strong> 要求在接受前和團隊相處幾個小時。</p>
                <p><strong className="text-foreground">詢問入職流程。</strong> 投資於結構化入職流程的公司投資於你的成功。</p>
              </div>
            </Collapsible>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">5. 福利與完整方案</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { cat: "健康", items: "團體保險、牙科補助、心理健康保障、生育福利" },
                { cat: "財務", items: "勞退提撥、股權、股票選擇權、年終獎金、壽險" },
                { cat: "成長", items: "專業發展預算、培訓課程、學費補助" },
                { cat: "生活平衡", items: "特休天數、彈性工時、遠端/混合辦公、育嬰假" },
              ].map((b) => (
                <div key={b.cat} className="bg-background border border-border rounded-lg p-3">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{b.cat}</p>
                  <p className="text-muted-foreground text-xs">{b.items}</p>
                </div>
              ))}
            </div>
            <Collapsible title="大多數人忽略的算術">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-foreground">工作機會 A：</strong> 年薪 NT$1,650,000。7 天特休。僅法定 6% 勞退提撥。無專業發展預算。每週 5 天進辦公室。</p>
                <p><strong className="text-foreground">工作機會 B：</strong> 年薪 NT$1,500,000。20 天特休。法定 6% 勞退提撥加上雇主額外自願提撥 3%（每年多 NT$45,000）。NT$30,000 專業發展預算。每週 2 天遠端。</p>
                <p>工作機會 B 的價值更高。額外的特休本身有現金價值（多 13 天乘以你的日薪 ≈ NT$75,000）。加上額外的勞退提撥和發展預算。整體薪酬價值約 NT$1,650,000，和 A 相當。但你還獲得每週兩天遠端工作的彈性。</p>
                <p className="font-semibold text-foreground">計算整體價值，不要只看帳面數字。</p>
              </div>
            </Collapsible>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-3">6. 成長潛力</h3>
            <p className="text-muted-foreground text-sm mb-3">這份工作會讓你更接近 3-5 年後想要的位置嗎？</p>
            <p className="text-muted-foreground text-sm mb-3">問用人主管，有哪些員工在組織內晉升的例子。詢問升遷時間表。詢問專業發展預算。</p>
            <p className="text-muted-foreground text-sm">如果大多數員工在 18-24 個月內離開，這家公司是跳板，不是終點。在接受之前搞清楚差別。</p>
          </div>
        </div>
      </section>

      {/* Section 4: Need the Job */}
      <section id="need-job" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如果你很需要這份工作怎麼辦？</h2>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">有時候你不是在兩個好選擇之間做決定。有時候你需要收入。帳單是真的。存款在縮水。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">誠實問自己：你是在清楚地評估這份工作，還是在說服自己接受，因為你覺得別無選擇？</p>
          <p className="text-muted-foreground leading-relaxed mb-4">如果你需要這份工作，接受它。但要睜大眼睛。</p>
          <p className="text-muted-foreground leading-relaxed mb-4">知道你在接受什麼，在妥協什麼。設一個時間表。告訴自己：「我會在這個職位全力投入 12 個月，做好工作、學習技能、拓展人脈。然後重新評估。」</p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4">
            <p className="text-foreground font-medium text-sm">跳板型的工作沒問題。恐慌性的決定不行。<span className="text-gold font-semibold">差別在於是否有意識。</span></p>
          </div>
        </div>
      </section>

      {/* Section 5: Multiple Offers */}
      <section id="multiple" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">處理多份工作機會</h2>
              <p className="text-muted-foreground text-lg">與時間衝突</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">第 1 步：爭取時間（有禮貌地）</h3>
              <p className="text-muted-foreground text-sm">請 A 公司給你一週時間做決定。如果你需要更多時間，要求認識更多團隊成員或參觀辦公室。把會議安排在一週後。</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">第 2 步：加速 B 公司</h3>
              <p className="text-muted-foreground text-sm mb-3">聯繫 B 公司的招募人員。告訴他們你手上有另一份錄取通知，但他們仍然是你的首選。</p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-foreground text-sm italic">「我想坦白告訴你。我收到了另一家公司的錄取通知，但你們的職位是我的首選。我還是有力的候選人嗎？有什麼我需要做的來推進流程？」</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">第 3 步：不要失聯</h3>
              <p className="text-muted-foreground text-sm mb-3">如果你正在面試你不再感興趣的公司，現在就打電話或寄郵件給那些招募人員。不要消失。</p>
              <div className="bg-card border border-gold/30 rounded-xl p-4">
                <p className="text-gold text-xs uppercase font-semibold mb-1">我的觀點</p>
                <p className="text-muted-foreground text-sm">招募人員之間會互相交流。產業圈子很小。如果你在一次求職中讓三家公司失聯，消息會傳開。花 5 分鐘專業地結束對話。</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">第 4 步：了解接受後反悔的風險</h3>
              <p className="text-muted-foreground text-sm mb-3">如果你接受了錄取通知然後反悔，你會和 A 公司斷絕關係。你也會和招募人員、用人主管、所有面試過你的人斷絕關係。</p>
              <p className="text-muted-foreground text-sm font-semibold">準備好全心投入時，再接受。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Competitor */}
      <section id="competitor" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">當錄取通知來自競爭對手</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">先檢查你的合約</h3>
              <p className="text-muted-foreground text-sm mb-3">檢視你的勞動契約。注意競業禁止條款、禁止招攬條款和保密協議。</p>
              <p className="text-muted-foreground text-sm">如果你簽過任何限制性協議，在進一步行動前私下諮詢律師。法律執行因國家和地區而異。</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">想清楚你知道什麼</h3>
              <p className="text-muted-foreground text-sm mb-3">盤點你在目前職位上接觸的機密資訊。客戶名單。定價策略。產品路線圖。</p>
              <p className="text-muted-foreground text-sm">有道德的公司會歡迎關於如何負責地處理這些問題的對話。如果新公司在面試過程中逼你分享機密資訊，立刻離開。</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">考慮你的名聲</h3>
              <p className="text-muted-foreground text-sm mb-3">想想你的導師、你目前的團隊和你的專業人脈。他們會如何看待這個決定？</p>
              <p className="text-muted-foreground text-sm">和兩家公司之外的可信賴導師或顧問談談。在做決定前獲得長期的觀點。</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">如何告訴目前的雇主</h3>
              <p className="text-muted-foreground text-sm mb-3">誠實以對。保持專業。先感謝你得到的機會。準備好你的雇主可能會要求你立刻離開。</p>
              <div className="bg-card border border-gold/30 rounded-xl p-4 mt-3">
                <p className="text-gold text-xs uppercase font-semibold mb-1">我的觀點</p>
                <p className="text-muted-foreground text-sm">員工跳槽到競爭對手時，公司總是想知道兩件事。「是因為錢嗎？」和「是誰先接觸誰？」誠實回答。</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Counteroffers */}
      <section id="counteroffers" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">反聘條件</h2>
              <p className="text-muted-foreground text-lg">為什麼你（幾乎）不該接受</p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">數據說明一切</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">~40%</p>
                <p className="text-cream/70 text-xs">的資深主管認為接受反聘條件會損害你的職涯</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">5-25%</p>
                <p className="text-cream/70 text-xs">反聘條件有好結果的估計機率</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">~80%</p>
                <p className="text-cream/70 text-xs">表示接受會損害在目前公司的信任和名聲</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">反聘條件為什麼會失敗</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">你的主管現在質疑你的忠誠度。同事怨恨你得到的特殊待遇。公司開始尋找你的替代人選，即使你留下了。</p>
          <p className="text-muted-foreground leading-relaxed mb-6">兩邊都輸。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">「離職前談話」的替代方案</h3>
            <p className="text-muted-foreground text-sm mb-3">如果你對目前的工作不滿意，在開始找新工作之前先和主管談。坦誠地討論你的職涯路徑、你的薪酬，以及需要改變什麼。</p>
            <p className="text-muted-foreground text-sm">如果你的主管對一場關於職涯的坦誠對話反應憤怒或怨恨，這段關係已經破裂了。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">唯一的例外</h3>
            <p className="text-muted-foreground text-sm mb-3">如果你的主管透露他們在你辭職之前就已經在規劃給你升遷或新角色，而且時間表和細節是具體的，反聘條件值得考慮。</p>
            <p className="text-muted-foreground text-sm">但誠實問自己：「如果我沒有提出辭職，他們還會這樣做嗎？」如果答案是不會，反聘條件只是權宜之計。</p>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的觀點：你的雇主在想什麼</h4>
            <p className="text-muted-foreground text-sm">當公司提出反聘條件，這個決定是基於成本考量。替換你的成本是你年薪的 50-200%。反聘條件比重新招募便宜。反聘條件是為了留住一個資源。不是為了你的職涯發展。</p>
          </div>
        </div>
      </section>

      {/* Section 8: How to Decline */}
      <section id="decline" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如何拒絕錄取通知</h2>
              <p className="text-muted-foreground text-lg">而不燒毀橋樑</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">拒絕得好，保護你的名聲。拒絕得差，關上好幾年的大門。</p>

          <div className="space-y-4 mb-8">
            {[
              { title: "迅速行動。", desc: "一旦你做了決定，在 24-48 小時內溝通。" },
              { title: "先打電話。", desc: "不要用電子郵件作為第一步。拿起電話。" },
              { title: "使用三段式架構：", desc: "感謝、理由、保持聯繫。" },
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <GoldCheckBadge />
                <p className="text-foreground text-sm"><strong>{rule.title}</strong> {rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">三段式架構</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "感謝", desc: "真誠的感謝。說出你欣賞的具體事項。" },
                { label: "理由", desc: "清楚、誠實的理由。不含糊。不刺耳。" },
                { label: "保持聯繫", desc: "敞開大門。提議保持聯絡。" },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                  <p className="text-gold text-xs font-bold uppercase mb-2">{item.label}</p>
                  <p className="text-cream/70 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">常見理由和表達方式：</h3>
          <div className="space-y-3 mb-6">
            {[
              { reason: "外部因素：", script: "「經過仔細考慮，目前的時機對我的家庭來說不太合適。」" },
              { reason: "薪酬：", script: "「我感謝這份工作機會，但薪酬方案無法達到我目前需要的水準。希望未來我們還有合作的機會。」" },
              { reason: "角色契合度：", script: "「我越了解這個角色，越發現日常工作和我的職涯方向不一致。我寧願現在坦白說出來，也不願意接受後表現不佳。」" },
              { reason: "文化契合度：", script: "「我尊重團隊和你們做的工作。經過思考後，我認為這個環境不太適合我的工作風格。」" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.reason}</p>
                <p className="text-muted-foreground text-sm italic">{item.script}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">我的觀點：招募人員如何記住拒絕的候選人</h4>
            <p className="text-muted-foreground text-sm mb-3">招募人員記住兩種候選人：優雅拒絕的人，和失聯或讓過程很痛苦的人。</p>
            <p className="text-muted-foreground text-sm">打電話、給出清楚的理由、表達感謝的候選人，會回到「A 名單」。當 6 個月後有更合適的職位開出來，招募人員會第一個打給他們。</p>
          </div>
        </div>
      </section>

      {/* Section 9: How to Accept */}
      <section id="accept" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">如何接受</h2>
              <p className="text-muted-foreground text-lg">並為第一天做好準備</p>
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">確認所有條件都寫在紙上</h3>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <p className="text-muted-foreground text-sm mb-3">在你簽名之前，確認錄取通知書包含：</p>
            <ul className="space-y-2 mb-4">
              {["底薪（月薪與保障年薪月數）", "獎金結構和目標", "股權細節和歸屬時間表", "到職日期", "職稱和匯報架構", "勞健保與團體保險生效日期", "所有談判過的條件（簽約獎金、額外特休、遠端工作安排）"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">如果有任何口頭討論過但沒有寫在信裡的內容，在簽名前要求補充。口頭承諾會消失。書面條件不會。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">談判到職日期</h3>
            <p className="text-muted-foreground text-sm mb-3">在兩份工作之間給自己時間。台灣《勞基法》規定的預告期間依年資而定。再加上至少一到兩週的個人時間。</p>
            <div className="bg-background border border-gold/30 rounded-lg p-3 mb-3">
              <p className="text-foreground text-sm italic">「我想以最好的狀態開始。休息兩週讓我恢復精力，從第一天就全力投入。」</p>
            </div>
            <p className="text-muted-foreground text-sm">大多數用人主管會接受 4-6 週的到職時間表。如果公司要求你一週內到職，問清楚原因。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">正確地提出辭呈</h3>
            <p className="text-muted-foreground text-sm mb-3">在以下條件都滿足之前，不要向目前的工作提出辭呈：錄取通知書已簽署、背景調查已完成、到職日期已確認。</p>
            <p className="text-muted-foreground text-sm">一切確定後，親自或透過電話告訴你的主管。保持對話簡短、專業。然後以書面形式提交辭呈。</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-3">利用空檔做準備</h3>
            <ul className="space-y-2">
              {["閱讀新公司分享的策略文件或報告", "和你的主管、關鍵利害關係人和直屬部屬安排第一週的會議", "提前完成人資文件，這樣第一天就直接投入工作", "在 LinkedIn 上研究你的新團隊"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 10: Interactive Scorecard */}
      <section id="scorecard" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">工作機會評分卡</h2>
              <p className="text-muted-foreground text-lg">為每個類別評分。設定權重。得到你的分數。</p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">如何使用</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">第 1 步：設定權重。</strong> 每個類別給予 1（低優先）到 3（最優先）的權重。你的權重會根據你的人生階段和目標而改變。</p>
              <p><strong className="text-foreground">第 2 步：評分。</strong> 根據你的研究和評估，給每個類別 1 分（差）到 5 分（優秀）。</p>
              <p><strong className="text-foreground">第 3 步：</strong>加權分數和百分制最終分數會自動計算。</p>
            </div>
          </div>

          <JobOfferScorecard categories={scorecardCategories} locale="zh-tw" />

          <div className="mt-8 space-y-4">
            <h3 className="font-heading text-lg text-foreground">如何解讀你的分數</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { range: "80-100", label: "強力接受", color: "text-green-400", desc: "這份工作與你的優先事項高度吻合。充滿信心地往前走。" },
                { range: "60-79", label: "謹慎行事", color: "text-gold", desc: "有優勢但有明顯差距。找出哪些類別拉低了分數。" },
                { range: "40-59", label: "談判或放棄", color: "text-orange-400", desc: "與你重視的方面有重大不一致。" },
                { range: "40 以下", label: "放棄", color: "text-destructive", desc: "這份工作不符合你的優先事項。" },
              ].map((band) => (
                <div key={band.range} className="bg-background border border-border rounded-xl p-4">
                  <p className={`font-bold text-sm ${band.color} mb-1`}>{band.range}：{band.label}</p>
                  <p className="text-muted-foreground text-xs">{band.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              <strong className="text-foreground">比較兩份工作？</strong> 分別對每份工作做評分。兩份使用相同的權重。當兩份工作的分數差距在 5 分以內，看你權重最高的類別。
            </p>
          </div>
        </div>
      </section>

      {/* Flags */}
      <section id="flags" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> 注意紅旗
              </h3>
              <ul className="space-y-2">
                {["用人主管在面試中分心、遲到或敷衍", "公司施壓要求你在 24 小時內做決定", "職位描述在面試之間有明顯變化", "現任員工平均任期短（不到 18 個月）", "公司拒絕將口頭承諾寫入書面", "深夜或週末安排面試是常態"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground text-sm"><XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> 注意綠旗
              </h3>
              <ul className="space-y-2">
                {["用人主管追問問題並記得之前對話的細節", "公司給你空間做決定", "現任員工正面評價團隊和管理層", "入職流程有培訓和導師制度的結構", "錄取通知書與所有口頭討論的內容一致"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground text-sm"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scripts & Templates */}
      <section id="scripts" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📝</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">範本與模板</h2>
              <p className="text-muted-foreground text-lg">複製、修改、使用</p>
            </div>
          </div>

          <div className="space-y-3">
            <Collapsible title="範本：要求考慮時間">
              <p className="text-foreground text-sm mt-3 italic">「非常感謝您的錄取通知。我對這個職位和團隊很興奮。我想給這個決定應有的思考和重視。我是否能花幾天時間好好評估，在 [具體日期] 之前回覆您？」</p>
            </Collapsible>
            <Collapsible title="範本：詢問回饋和其他候選人">
              <p className="text-foreground text-sm mt-3 italic">「我對錄取通知非常高興。在我花時間評估之前，我想了解：團隊對我面試的回饋是什麼？目前還有其他候選人在考慮嗎？」</p>
            </Collapsible>
            <Collapsible title="範本：詢問福利">
              <p className="text-foreground text-sm mt-3 italic">「我想確保完全了解整體薪酬方案。您是否能為我介紹福利內容，包括團體保險、勞退提撥、特休天數和專業發展支援？」</p>
            </Collapsible>
            <Collapsible title="範本：談判到職日期">
              <p className="text-foreground text-sm mt-3 italic">「我想以最好的狀態開始這份工作，從第一天就全力投入。為此，我想在目前的工作好好交接，並在開始前休息一段時間。[日期，大約 4-6 週後] 作為到職日是否合適？」</p>
            </Collapsible>
            <Collapsible title="範本：電話拒絕">
              <p className="text-foreground text-sm mt-3 italic">「你好 [姓名]，感謝您抽出時間。我想先說，我很感謝整個面試過程以及每位花時間認識我的人。經過仔細考慮，我決定走另一個方向。[插入你的理由]。我很尊重團隊和你們正在做的事。希望我們保持聯繫，未來有機會合作。」</p>
            </Collapsible>
            <Collapsible title="模板：拒絕確認郵件">
              <div className="mt-3 text-sm space-y-2">
                <p className="text-foreground font-semibold">主旨：感謝，[公司名稱]</p>
                <p className="text-muted-foreground italic">[姓名] 您好，</p>
                <p className="text-muted-foreground italic">我想跟進我們今天的對話。再次感謝您的錄取通知，以及團隊在面試過程中投入的時間。[一項你欣賞的關於公司或團隊的具體事項。]</p>
                <p className="text-muted-foreground italic">經過仔細考慮，我決定走另一個方向。[簡短重述理由。]</p>
                <p className="text-muted-foreground italic">我很尊重 [公司名稱] 做的工作，希望未來我們還有交集。如果有任何我能幫忙的事，請隨時聯繫。</p>
                <p className="text-muted-foreground italic">祝好，<br />[你的名字]</p>
              </div>
            </Collapsible>
            <Collapsible title="模板：接受確認郵件">
              <div className="mt-3 text-sm space-y-2">
                <p className="text-foreground font-semibold">主旨：期待加入 [公司名稱]</p>
                <p className="text-muted-foreground italic">[姓名] 您好，</p>
                <p className="text-muted-foreground italic">我很高興確認接受 [公司名稱] 的 [職稱] 職位。我已簽署並寄回錄取通知書。</p>
                <p className="text-muted-foreground italic">確認以下資訊：<br />• 到職日期：[日期]<br />• 底薪：[金額]<br />• [其他談判過的條件]</p>
                <p className="text-muted-foreground italic">我期待為團隊做出貢獻。如果在第一天上班前有任何需要完成的事項，請告訴我。</p>
                <p className="text-muted-foreground italic">祝好，<br />[你的名字]</p>
              </div>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">更多資源</h2>
              <p className="text-cream/60">持續提升你的求職實力</p>
            </div>
          </div>

          <p className="text-cream/70 text-sm mb-8">
            本指南取材自 13 篇《哈佛商業評論》關於工作機會、談判和職涯轉換的文章，作者包括 Bill Barnett、Hannah Riley Bowles、Rebecca Knight、Kelly O. Kay、Michael Cullen、Jodi Glickman、Rebecca Zucker、Marlo Lyons、Monne Williams、Amantha Imber、Amy Gallo、Samorn Selim 和 Amii Barnard-Bahn。
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">完整薪資策略</p>
              <span className="text-gold text-sm font-medium">薪資談判入門 →</span>
            </Link>
            <Link to="/zh-tw/offer-calculator" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">比較你的 Offer</p>
              <span className="text-gold text-sm font-medium">Offer 計算機 →</span>
            </Link>
            <Link to="/zh-tw/recruiter-screen-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">通過招募電話</p>
              <span className="text-gold text-sm font-medium">招募電話攻略 →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2024 James Bugden. All rights reserved.</span>
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

export default JobOfferGuideZhTw;
