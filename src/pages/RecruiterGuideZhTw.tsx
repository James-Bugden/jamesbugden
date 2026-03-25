import { FileText, Clock, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Target, Shield, Briefcase, ChevronDown, Menu, Search, Star, Zap} from "lucide-react";
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

const tocSections = [
  { id: "intro", label: "前言" },
  { id: "difference", label: "01 · 招募人員 vs 獵頭" },
  { id: "business", label: "02 · 這門生意如何運作" },
  { id: "process", label: "03 · 獵頭的流程" },
  { id: "tuna", label: "04 · 鮪魚還是鯰魚？" },
  { id: "levels", label: "05 · 經驗等級" },
  { id: "rules", label: "06 · 7 條法則" },
  { id: "find", label: "07 · 找到招募人員" },
  { id: "multiple", label: "08 · 和多位獵頭合作" },
  { id: "ghosting", label: "09 · 獵頭失聯了" },
  { id: "cheatsheet", label: "速查表" },
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
              className={`block text-xs py-1 pl-2 border-l-2 transition-colors ${active === id ? "border-gold text-gold font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-4 z-40">
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="目錄"
        >
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 w-56 bg-card border border-border rounded-xl shadow-xl p-3 max-h-72 overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">目錄</p>
            <nav className="space-y-0.5">
              {tocSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}>{label}</a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const TemplateBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-executive/5 border border-executive/20 rounded-xl p-4 md:p-5 my-4">
    <p className="text-sm font-semibold text-executive mb-2 flex items-center gap-2"><FileText className="w-4 h-4" />{title}</p>
    <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{children}</div>
  </div>
);

const InfoBox = ({ icon: Icon, title, children, variant = "default" }: { icon: any; title: string; children: React.ReactNode; variant?: "default" | "warning" | "success" }) => {
  const styles = { default: "bg-muted/50 border-border", warning: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800", success: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800" };
  return (
    <div className={`border rounded-xl p-4 md:p-5 my-4 ${styles[variant]}`}>
      <p className="font-semibold text-sm flex items-center gap-2 mb-2"><Icon className="w-4 h-4" />{title}</p>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
};

export default function RecruiterGuideZhTw() {
  useTrackGuideProgress("recruiter-guide-zh");

  return (
    <div className="min-h-screen bg-background">
      <SEO />

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
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            如何讓招募人員<br className="hidden md:block" />搶著要你
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            讓獵頭搶著推薦你的內部攻略
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">James Bugden，資深招募人員 @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 分鐘閱讀</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      <TableOfContents />

      {/* 前言 */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground/80 leading-relaxed mb-4">這份指南由一位每天站在招聘端的招募人員和獵頭所寫，給你來自內部的攻略。你會了解招募人員和獵頭如何思考、什麼因素讓他們為一位候選人拿起電話卻忽略另一位，以及如何建立能為你整個職涯打開機會的關係。</p>
          <p className="text-foreground/80 leading-relaxed mb-4">為什麼要和招募人員及獵頭合作？因為很多職位從未公開發布。因為他們和用人主管有直接的關係。因為當他們推薦你，你會跳過那疊履歷，直接排到最前面。</p>
          <InfoBox icon={FileText} title="在閱讀本指南之前">
            <p>你的履歷是招募人員或獵頭看到的第一樣東西。如果你的履歷還沒準備好，先從<Link to="/zh-tw/resume-guide" className="text-gold underline hover:text-gold/80">「完美履歷：10 條面試邀約黃金法則」</Link>指南開始。</p>
          </InfoBox>
        </div>
      </section>

      <main className="container mx-auto max-w-3xl px-5 md:px-6 py-10 md:py-16">

        {/* Section 2: 招募人員 vs 獵頭 */}
        <section id="difference" className="mb-16 scroll-mt-20">
          <SectionNumber num="01" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">招募人員 vs 獵頭：搞清楚差別</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">這個區別很重要。在這份指南中，這兩個詞有不同的意思。</p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-foreground mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4 text-gold" /> 招募人員（內部）</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">公司的員工，只為自己的雇主招人。他們深入了解公司文化，能直接接觸用人主管。在大型公司，內部招募團隊包括尋才專員（sourcer）負責找候選人、招募人員管理流程、協調人員處理後勤。尋才專員使用 LinkedIn Recruiter 透過關鍵字、技能、地點和職稱搜尋候選人。你的 LinkedIn 個人檔案就是他們的搜尋引擎。</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-foreground mb-2 flex items-center gap-2"><Search className="w-4 h-4 text-gold" /> 獵頭（外部）</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">獨立運作的。他們同時服務多家客戶公司。付費方式取決於類型 — 預付制、成功制、人力派遣或轉職服務。</p>
            </div>
          </div>

          <Collapsible title="獵頭的類型">
            <ul className="space-y-3 mt-3 text-sm text-foreground/80">
              <li><strong>預付制獵頭公司（Retained search firms）</strong>在開始搜尋前就收到費用。這類職位通常是高階或主管級別。公司是認真的，因為他們已經投入了資金。你會是一份短名單上的候選人（通常 5-6 位）。這是你能得到的最好機率。</li>
              <li><strong>成功制獵頭（Contingency headhunters）</strong>只在成功聘用後才收費。同一個職位可能有其他獵頭在競爭。競爭更激烈，但成功制獵頭在市場上填補最多職缺。他們處理各行各業的中高階職位。</li>
              <li><strong>人力派遣公司</strong>以自己的員工身份僱用你，將你派駐到客戶公司做臨時或約聘工作。你不需要付費。客戶公司支付給仲介較高的時薪。這是進入難以直接進入的公司的常見途徑。約聘轉正職是一條真實的路。</li>
              <li><strong>轉職服務公司（Outplacement firms）</strong>幫助被裁員的員工找新工作。你的前雇主支付這項服務。他們提供履歷協助、面試輔導和求職支援。</li>
            </ul>
          </Collapsible>

          <InfoBox icon={Target} title="根據你的職涯階段選擇目標">
            <ul className="space-y-1 mt-1">
              <li>• 早期職涯 / 通用技能 → 內部招募人員、人力派遣公司</li>
              <li>• 中階職涯 / 專業化 → 成功制獵頭</li>
              <li>• 高階 / 主管 → 預付制獵頭公司 + 成功制獵頭</li>
              <li>• 轉職者 → 人力派遣公司（作為過渡）+ 目標產業的成功制獵頭</li>
            </ul>
          </InfoBox>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">不是所有獵頭都好</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">獵頭的品質差異很大。這個行業吸引了各種背景的人，不是每個人都有深厚的產業專業知識。在交出履歷和職涯資訊之前，先判斷這位獵頭是否值得你的時間。</p>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 rounded-xl p-4">
              <p className="font-semibold text-sm flex items-center gap-2 mb-2 text-red-700 dark:text-red-400"><XCircle className="w-4 h-4" /> 紅旗警訊</p>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• 不告訴你他們把你的履歷發到哪裡</li>
                <li>• 未經你同意就把履歷大量發送給公司</li>
                <li>• 逼你接受不符合你要求的職位</li>
                <li>• 無法回答關於公司或職位的基本問題</li>
                <li>• 初次通話後就消失，不再跟進</li>
                <li>• 在 LinkedIn 上沒有存在感或信譽</li>
              </ul>
            </div>
            <div className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4">
              <p className="font-semibold text-sm flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="w-4 h-4" /> 綠旗正向訊號</p>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• 詳細詢問你的目標、偏好和底線</li>
                <li>• 在面試前用內部資訊幫你準備</li>
                <li>• 給你誠實的回饋，即使不是你想聽的</li>
                <li>• 定期溝通，回覆你的電話和郵件</li>
                <li>• 在你的產業有口碑</li>
                <li>• 保護你的隱私</li>
              </ul>
            </div>
          </div>

          <Collapsible title="在承諾合作前，問獵頭這些問題">
            <ul className="space-y-2 mt-3 text-sm text-foreground/80">
              <li>• 你在這個產業做招募多久了？</li>
              <li>• 這個職位是你獨家的，還是有其他獵頭也在進行？</li>
              <li>• 你會提交多少位候選人？</li>
              <li>• 你和用人主管的關係如何？</li>
            </ul>
          </Collapsible>
        </section>

        {/* Section 3: 這門生意如何運作 */}
        <section id="business" className="mb-16 scroll-mt-20">
          <SectionNumber num="02" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">這門生意如何運作</h2>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">商業模式（獵頭）</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">你是產品。公司是客戶。獵頭是仲介。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2"><Users className="w-7 h-7 text-gold" /></div>
                <p className="font-bold text-sm">你</p><p className="text-xs text-muted-foreground">（產品）</p>
                <p className="text-xs text-muted-foreground mt-1">你不付錢。<br/>你得到指導。<br/>你被推薦。</p>
              </div>
              <div className="text-gold font-bold text-lg">{"←"}</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-executive/10 flex items-center justify-center mx-auto mb-2"><Search className="w-7 h-7 text-executive" /></div>
                <p className="font-bold text-sm">獵頭</p><p className="text-xs text-muted-foreground">（仲介）</p>
                <p className="text-xs text-muted-foreground mt-1">篩選你。<br/>準備你。<br/>為你爭取。</p>
              </div>
              <div className="text-gold font-bold text-lg">{"→"}</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2"><Briefcase className="w-7 h-7 text-foreground/60" /></div>
                <p className="font-bold text-sm">公司</p><p className="text-xs text-muted-foreground">（客戶）</p>
                <p className="text-xs text-muted-foreground mt-1">支付仲介費。<br/>設定要求。<br/>做最終決定。</p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 italic">獵頭為公司工作 — 但有經濟動力幫你拿到 offer。</p>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">一旦獵頭選中你作為他們的候選人，他們有經濟動機幫你拿到 offer。他們會指導你、幫你準備、推動公司做出決定。但他們需要你是一位值得投入的候選人。</p>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">商業模式（內部招募人員）</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">內部招募人員是公司的正職員工。他們不靠每次成功招聘賺取佣金。他們有招聘目標要達成。他們的動力是找到合格的候選人，讓人留下來並表現出色。在流程中他們站在你這邊，但他們的優先順序是公司，不是你。</p>

          <Collapsible title="大型公司的招聘流程中有哪些人參與">
            <ul className="space-y-3 mt-3 text-sm text-foreground/80">
              <li><strong>用人主管</strong>主導一切。他們定義需求、建立面試流程、做最終的錄用/不錄用決定。</li>
              <li><strong>招募人員</strong>協調所有事務。他們篩選候選人、引導你完成流程。</li>
              <li><strong>尋才專員（sourcer）</strong>主動在 LinkedIn 和其他管道尋找候選人。當尋才專員聯繫你，他們想把你帶進招聘管道。這不代表你已經有工作了。</li>
              <li><strong>Inbound Sourcer</strong>（大型公司才有）篩選所有收到的申請。這個人決定哪些履歷被轉交給招募人員。</li>
              <li><strong>招募協調人員</strong>管理後勤：安排面試時間、預訂交通、在時程衝突時替換面試官。</li>
            </ul>
            <p className="text-sm text-foreground/80 mt-3">招募人員和 Inbound Sourcer 都需要完成招聘目標。他們從根本上站在你這邊。但他們也需要匹配用人主管設定的要求。</p>
            <p className="text-sm text-foreground/80 mt-2">在新創公司，用人主管通常一手包辦。競爭較少，流程較短，決策較快。代價是知名度較低，薪資有時較低，風險也更大。但競爭程度低得多。</p>
          </Collapsible>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">招聘管道</h3>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6 space-y-3">
            {[
              { label: "200+ 份申請", w: "100%", color: "bg-muted-foreground/20" },
              { label: "30-50 份履歷篩選", w: "50%", color: "bg-muted-foreground/30" },
              { label: "10-15 通招募人員篩選電話", w: "30%", color: "bg-gold/30" },
              { label: "5-8 次技能/能力篩選", w: "18%", color: "bg-gold/50" },
              { label: "2-3 次最終面試", w: "10%", color: "bg-executive/40" },
              { label: "1 個 offer", w: "5%", color: "bg-executive" },
            ].map((step) => (
              <div key={step.label}><div className={`${step.color} rounded-md h-7 flex items-center px-3`} style={{ width: step.w }}><span className="text-xs font-medium text-foreground truncate">{step.label}</span></div></div>
            ))}
            <p className="text-xs text-muted-foreground italic mt-2">{"← 淘汰率最高的階段：履歷篩選 →"}</p>
          </div>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">你的履歷如何被排序</h3>
          <div className="bg-card border border-border rounded-xl p-5 my-6 space-y-2">
            {[
              { rank: 1, label: "內部推薦", desc: "幾乎一定會被仔細閱讀。" },
              { rank: 2, label: "獵頭推薦", desc: "類似內部推薦的優先加分。" },
              { rank: 3, label: "當地候選人", desc: "不需要搬遷，手續最少。" },
              { rank: 4, label: "不需要簽證", desc: "到職更快。" },
              { rank: 5, label: "需要簽證 + 搬遷", desc: "費用最高。優先順序最低。" },
            ].map(({ rank, label, desc }) => (
              <div key={rank} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="w-7 h-7 rounded-full bg-gold/10 text-gold font-bold text-xs flex items-center justify-center shrink-0">{rank}</span>
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic mt-2">這就是為什麼建立獵頭關係很重要。當獵頭推薦你，你在優先順序中往上移動。</p>
          </div>
        </section>

        {/* Section 4: 獵頭的流程 */}
        <section id="process" className="mb-16 scroll-mt-20">
          <SectionNumber num="03" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">獵頭的流程：逐步拆解</h2>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "接案", desc: "公司設定職位需求" },
                { step: 2, title: "搜尋", desc: "資料庫 + 人脈" },
                { step: 3, title: "聯繫", desc: "郵件或 LinkedIn" },
                { step: 4, title: "篩選", desc: "2-3 通不同天" },
                { step: 5, title: "查核", desc: "推薦人確認" },
                { step: 6, title: "推薦", desc: "前 3-5 位給用人主管" },
                { step: 7, title: "面試", desc: "獵頭 = 你的教練" },
                { step: 8, title: "結果", desc: "錄用或不錄用" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-gold font-bold text-lg">{step}</p>
                  <p className="font-bold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>
          <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80 mb-4">
            <li>公司給獵頭一個職位要填補（有具體要求）</li>
            <li>獵頭搜尋他們的資料庫和人脈網絡尋找匹配的人</li>
            <li>獵頭聯繫潛在候選人（通常透過電子郵件或 LinkedIn）</li>
            <li>獵頭在不同天進行 2-3 通電話篩選候選人（檢查一致性）</li>
            <li>獵頭進行推薦人查核</li>
            <li>獵頭向用人主管推薦最優秀的候選人</li>
            <li>公司面試候選人（獵頭成為你的面試教練和代言人）</li>
            <li>公司錄用或不錄用。如果錄用，獵頭向公司收費。如果不錄用，獵頭把你保留在資料庫中等待下次機會。</li>
          </ol>
          <InfoBox icon={AlertTriangle} title="大多數候選人失敗的地方" variant="warning">
            <p>第 4 步的篩選電話是大多數候選人失敗的地方。完整的通過方法，請查看<Link to="/zh-tw/hr-interview-guide" className="text-gold underline hover:text-gold/80">「篩選電話攻略」</Link>指南。</p>
          </InfoBox>
          <p className="text-foreground/80 leading-relaxed">如果你一直表現得專業且好合作，獵頭會在每次有匹配職位時想到你。長期關係比任何單一職位都重要。</p>
        </section>

        {/* Section 5: 鮪魚還是鯰魚 */}
        <section id="tuna" className="mb-16 scroll-mt-20">
          <SectionNumber num="04" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">你是藍鰭鮪魚還是鯰魚？</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">一個理解獵頭如何評估你的框架：</p>
          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <h3 className="font-heading font-bold text-gold mb-2 flex items-center gap-2"><Star className="w-4 h-4" /> 藍鰭鮪魚</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• 稀有技能</li><li>• 難以找到</li><li>• 獵頭追著你跑</li><li>• 專業化 + 供不應求</li><li>• 公司願意付費請獵頭來找你</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-muted-foreground mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> 鯰魚</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• 常見技能</li><li>• 容易找到</li><li>• 公司自己找得到</li><li>• 通才。可替代的。</li><li>• 公司不需要付費來找你</li>
              </ul>
            </div>
          </div>
          <p className="text-foreground/80 leading-relaxed mb-4">事實是：如果你的技能很普遍，經驗也很一般，獵頭會把你往後排。不是因為你不好。是因為公司不需要付一筆仲介費來找你。</p>

          <Collapsible title="自我評估：你在哪個位置？（7 個問題）">
            <ol className="list-decimal list-inside space-y-2 mt-3 text-sm text-foreground/80">
              <li>過去 12 個月內，有獵頭主動聯繫你嗎？</li>
              <li>你有一項同行業大多數人沒有的專業技能嗎？</li>
              <li>你的整體薪酬高於你的職位和城市的市場中位數嗎？</li>
              <li>你在特定產業有深入的專業知識，而不只是一般性的功能？</li>
              <li>你曾在你所在領域知名的公司工作過嗎？</li>
              <li>你有稀有的技能組合嗎（例如：技術深度 + 管理能力）？</li>
              <li>如果你在 LinkedIn 上發布你正在找工作，獵頭會在一週內聯繫你嗎？</li>
            </ol>
            <div className="mt-4 space-y-2 text-sm">
              <p><strong>5-7 個「是」：</strong>你是鮪魚。獵頭正在找你。</p>
              <p><strong>3-4 個「是」：</strong>你在邊界上。這份指南會幫你進入更多獵頭的視野。</p>
              <p><strong>0-2 個「是」：</strong>你目前是鯰魚。沒關係。這份指南會告訴你如何開始建立關係。</p>
            </div>
          </Collapsible>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">什麼讓一個人成為「鮪魚」</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• 在你的領域中供不應求的專業技能</li>
            <li>• 產業專長（深入了解特定產業，結合你的職能）</li>
            <li>• 在知名公司的領導經驗</li>
            <li>• 稀有組合（例如：工程 + 管理、財務 + 營運）</li>
          </ul>
          <h3 className="font-heading text-lg font-bold text-foreground mt-6 mb-3">如何從鯰魚變成鮪魚</h3>
          <ul className="space-y-1 text-sm text-foreground/80">
            <li>• 在你領域的利基方向建立專業經驗</li>
            <li>• 進入知名公司，即使是較小的職位，也能建立你的品牌</li>
            <li>• 培養 T 型技能：在一個領域深耕，同時有足夠的廣度跨越不同功能</li>
            <li>• 建立可量化的成果記錄</li>
          </ul>
        </section>

        {/* Section 6: 經驗等級 */}
        <section id="levels" className="mb-16 scroll-mt-20">
          <SectionNumber num="05" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">你的經驗等級如何改變一切</h2>
          <div className="space-y-3 my-6">
            {[
              { level: "總監 / 副總裁 / 高階主管", target: "預付制獵頭 + 成功制獵頭", score: 12, desc: "鮪魚。他們會來找你。" },
              { level: "高階（8 年以上）", target: "預付制 + 成功制獵頭", score: 9, desc: "很可能是鮪魚。" },
              { level: "中階（5-8 年）", target: "成功制獵頭", score: 6, desc: "過渡期。" },
              { level: "初中階（3-5 年）", target: "成功制獵頭（開始建立關係）", score: 4, desc: "開始經營關係。" },
              { level: "早期職涯（0-2 年）", target: "內部招募人員 + 人力派遣公司", score: 2, desc: "鯰魚。累積技能。" },
              { level: "轉職者", target: "人力派遣公司 + 目標產業的成功制獵頭", score: 3, desc: "取決於可轉移技能。" },
            ].map(({ level, target, score, desc }) => (
              <div key={level} className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="md:w-1/3"><p className="font-bold text-sm text-foreground">{level}</p><p className="text-xs text-muted-foreground">{target}</p></div>
                <div className="md:w-1/3"><div className="flex gap-0.5">{Array.from({ length: 12 }).map((_, i) => (<div key={i} className={`h-3 w-3 rounded-sm ${i < score ? "bg-gold" : "bg-muted"}`} />))}</div></div>
                <p className="text-xs text-muted-foreground md:w-1/3">{desc}</p>
              </div>
            ))}
          </div>

          <Collapsible title="各經驗等級詳細說明">
            <div className="space-y-4 mt-3 text-sm text-foreground/80">
              <div><p className="font-semibold text-foreground mb-1">早期職涯（0-2 年）</p><p>和最大量的申請者競爭。實習、相關專案、領導活動和證照是讓你脫穎而出的關鍵。專注於內部招募人員和人力派遣公司。獵頭很少處理早期職涯的職位，因為仲介費太低了。</p></div>
              <div><p className="font-semibold text-foreground mb-1">初中階職涯（3-5 年）</p><p>你已經累積了實際經驗。這是獵頭關係開始形成的階段。開始和你產業中的獵頭建立聯繫。寄出你的履歷。讓他們記住你。</p></div>
              <div><p className="font-semibold text-foreground mb-1">中階職涯（5-8 年）</p><p>這是從鯰魚變成鮪魚的過渡期。進入知名公司。建立成果的記錄。成功制獵頭成為你最佳管道。</p></div>
              <div><p className="font-semibold text-foreground mb-1">高階（8 年以上）</p><p>你的履歷應該強調領導力、影響力和規模。不是你做了什麼，而是因為你做了什麼而產生了什麼結果。預付制獵頭公司在這個層級開始出現。</p></div>
              <div><p className="font-semibold text-foreground mb-1">總監、副總裁和高階主管</p><p>履歷從個人貢獻轉向組織成果。在這個層級，獵頭會來找你。問題不是他們會不會打電話。而是你要維護哪些關係。</p></div>
              <div><p className="font-semibold text-foreground mb-1">轉職者</p><p>轉換領域時，獵頭比較難合作。專注於可轉移的技能，建立過渡經驗，瞄準專門做你想進入的產業的獵頭。更完整的拆解，請查看<Link to="/zh-tw/pivot-method-guide" className="text-gold underline hover:text-gold/80">「職涯轉型指南」</Link>。</p></div>
            </div>
          </Collapsible>
        </section>

        {/* Section 7: 7 條法則 */}
        <section id="rules" className="mb-16 scroll-mt-20">
          <SectionNumber num="06" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">讓招募人員和獵頭願意和你合作的 7 條法則</h2>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 1：搞清楚誰付他們錢</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">獵頭的費用由公司支付，不是你。內部招募人員是公司的員工。在兩種情況下，公司都是客戶。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">不要在你不會接受的職位上浪費他們的時間。不要讓他們推薦你，只為了從現任雇主那裡拿到反聘條件。不要在不願搬遷時說你願意。做了這些中的任何一項，關係就結束了。</p>
          </div>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 2：保守他們的秘密</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">當獵頭告訴你一個職位的資訊，不要分享給其他獵頭或候選人。不要在透過獵頭了解到這個職位後，直接向公司投遞。他們的資訊是他們的生計。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">這也保護你：如果你目前在職，好的獵頭會保護你的隱私。差的獵頭會到處發送你的履歷。</p>
          </div>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 3：對一切誠實</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">不要在履歷上說謊。不要誇大。不要隱瞞被解僱、空白期或任何問題。招募人員和獵頭會查出來的。</p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">如果你的過去有問題，一開始就告訴獵頭。他們知道如何呈現。但他們需要先知道。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">如果你已經直接向一家公司投遞了，在獵頭推薦你之前就告訴他們。</p>
          </div>

          <TemplateBox title="範本：告知被解僱的說法">
            {"「我想對你坦白。我在 [月份/年份] 被 [公司] 解僱了。[一句話說明發生了什麼。保持事實陳述，不要指責。] 這是一段艱難的經歷，但我從中學到了：[一句話說明你學到了什麼或改變了什麼]。我想讓你先從我這裡聽到，這樣就不會有意外。」"}
          </TemplateBox>
          <TemplateBox title="範本：告知職涯空白期的說法">
            {"「你會看到我的履歷上從 [日期] 到 [日期] 有一段空白。[一句話解釋：家庭假、健康因素、照顧家人、個人專案、裁員後休整等。] 在這段時間我 [你做過的任何有意義的事]。我已經準備好回歸，以下是我對 [目標職位/產業] 感到期待的原因。」"}
          </TemplateBox>
          <TemplateBox title="範本：告知職涯問題的說法">
            {"「在我們繼續之前，我想分享一件事。[一句話說明問題。直接了當。] 背景是這樣的：[最多 2-3 句。事實，不找藉口。] 我已經 [你為解決這個問題做了什麼]。我寧願現在讓你知道，這樣我們能一起處理，也不要之後才被發現。」"}
          </TemplateBox>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 4：保持一致，不要有意外（獵頭）</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">一開始就告訴他們：你的薪資要求、地點偏好、底線和時間表。不要在 offer 階段改變說法。不要在最後一刻提出新的要求。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">獵頭投入了自己的時間和聲譽來向客戶推薦你。如果你在最後一刻改變要求，獵頭在客戶面前就失去了信譽。</p>
          </div>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 5：回覆要快</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">當天就回覆招募人員和獵頭。時機很重要。有候選人因為能在 6 小時內趕到面試而拿到工作。有候選人因為花了 3 天才回覆而失去機會。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">即使你的答案是不，也要回覆。對獵頭已讀不回，等於保證他們下次不會打給你。</p>
          </div>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 6：聽從獵頭的指導</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">當獵頭要求你修改履歷，照做。他們知道用人主管在找什麼。當他們寄面試準備資料給你，讀完。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">當他們要求你在時間安排上有彈性，配合。裝作難以接觸不會提高你的價值。只會讓公司選擇下一位候選人。</p>
          </div>

          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">法則 7：什麼都要溝通，特別是其他面試</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">如果你在其他公司面試，告訴你的獵頭。不要說公司名稱（法則 2 適用），但告訴他們你在別處有面試在進行。</p>
            <p className="text-sm text-foreground/80 leading-relaxed">獵頭需要知道全貌才能幫你爭取最好的條件。如果另一個 offer 在檯面上，獵頭會推動客戶加快速度。</p>
          </div>

          <TemplateBox title="範本：告訴獵頭你在其他公司面試的說法">
            {"「我想讓你知道最新情況。我也在和另一家公司進行面試流程。我無法透露是哪一家，但我想對你坦誠。我目前在 [X 階段：電話篩選 / 最終面試 / 等待 offer]。你客戶的這個職位 [仍然是我的首選 / 同樣有吸引力 / 我想進一步了解]。我想讓你知道，這樣你那邊可以規劃時間。」"}
          </TemplateBox>
        </section>

        {/* Section 8: 找到招募人員 */}
        <section id="find" className="mb-16 scroll-mt-20">
          <SectionNumber num="07" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">如何找到和接觸招募人員與獵頭</h2>
          <p className="text-xs text-muted-foreground mb-4 italic">以下範本以中文撰寫。如果獵頭是外商或國際獵頭公司，建議使用英文版範本。</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">在哪裡找到他們</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-6">
            <li>• LinkedIn（主要管道）</li>
            <li>• 產業活動、研討會和展覽</li>
            <li>• 同事的推薦</li>
            <li>• Google 搜尋：[你的產業] + [你的職能] + 「獵頭」或「executive search」</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">如何接觸</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-6">
            <li>• 先寄電子郵件，不要直接打電話</li>
            <li>• 如果有推薦人，提到推薦人的名字</li>
            <li>• 附上一份好的履歷</li>
            <li>• 郵件保持簡短：你是誰、你做什麼、你在找什麼</li>
          </ul>

          <TemplateBox title="範本：主動聯繫獵頭的郵件">
            {"主旨：[你的職稱] | [你的產業] | 對新機會持開放態度\n\n[獵頭姓名] 你好，\n\n我是一位 [你的職稱]，在 [你的產業/職能] 有 [X 年] 的經驗。我正在探索新的機會，想和你建立聯繫。\n\n我的背景是 [2-3 項關鍵技能或專業領域]。我的目標是 [目標職位類型] 在 [目標公司類型]。\n\n我附上了我的履歷。如果你有合適的職位，歡迎簡短通話。\n\n祝好，\n[你的名字]\n[電話]\n[LinkedIn URL]"}
          </TemplateBox>

          <TemplateBox title="範本：有推薦人的聯繫郵件">
            {"主旨：由 [推薦人姓名] 推薦 | [產業] 的 [你的職稱]\n\n[獵頭姓名] 你好，\n\n[推薦人姓名] 建議我和你聯繫。他/她提到你專門做 [產業/職能] 方面的招聘，認為我們應該認識一下。\n\n我是一位 [你的職稱]，在 [你的領域] 有 [X 年] 的經驗。我目前正在探索 [目標職位類型] 的新機會。\n\n我附上了我的履歷。如果你有合適的職位，希望能簡短聊聊。\n\n祝好，\n[你的名字]\n[電話]\n[LinkedIn URL]"}
          </TemplateBox>

          <TemplateBox title="範本：LinkedIn 邀請獵頭的訊息">
            {"[姓名] 你好，我是 [產業] 的 [你的職稱]。我看到你專門做 [他們的專業領域]。想建立聯繫，看看目前或未來是否有合適的機會。如果需要，我很樂意分享我的履歷。"}
          </TemplateBox>

          <TemplateBox title="範本：獵頭主動聯繫你時的回覆">
            {"[姓名] 你好，感謝你的聯繫。我很樂意了解更多。\n\n簡單介紹一下：我目前 [簡述目前狀況，1 句話]。我在找 [你想要的，1 句話]。\n\n歡迎安排通話。[建議 2-3 個時段] 對我都可以，或者告訴我你方便的時間。"}
          </TemplateBox>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">優化你的 LinkedIn</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• 開啟「開放求職機會」功能（設為僅對招募人員可見）</li>
            <li>• 在標題中使用他們會搜尋的職稱（不要用創意頭銜）</li>
            <li>• 填寫完整的技能欄位</li>
            <li>• 寫一份讀起來像自我推銷的個人簡介</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-foreground mt-6 mb-3">保持在獵頭的視線中</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• 積極找工作：每週寄一封簡短的更新郵件</li>
            <li>• 被動開放：每 3-6 個月聯繫一次</li>
            <li>• 換工作、換職稱或換聯繫方式的時候，都要更新他們</li>
            <li>• 給獵頭推薦人選和產業資訊。他們會記住幫過他們的人。</li>
          </ul>

          <TemplateBox title="範本：每週更新郵件（積極求職中）">
            {"主旨：近況更新 | [你的名字]\n\n[獵頭姓名] 你好，\n\n簡單更新一下我這邊的狀況。我仍在積極尋找新機會。\n\n[可選：1-2 句最新動態。]\n\n如果有合適的機會出現，請告訴我。隨時歡迎聊聊。\n\n祝好，\n[你的名字]"}
          </TemplateBox>

          <TemplateBox title="範本：每季聯繫郵件（被動/未在找工作）">
            {"主旨：打個招呼 | [你的名字]\n\n[獵頭姓名] 你好，\n\n希望一切順利。我想保持聯繫，讓你知道我的近況。\n\n我還在 [公司] 負責 [簡述 1 句話更新]。一切進展順利，但對於合適的機會我一直持開放態度。\n\n有什麼我能幫到你的，請隨時告訴我。\n\n祝好，\n[你的名字]"}
          </TemplateBox>

          <TemplateBox title={`範本：「我找到新工作了」更新郵件`}>
            {"主旨：更新 | 開始新職位\n\n[獵頭姓名] 你好，\n\n我想讓你知道，我已經接受了 [公司] 的 [職稱] 職位。我在 [日期] 開始上班。\n\n感謝你在我求職過程中的幫助。我希望保持聯繫。如果我能為你推薦優秀的候選人或分享產業資訊，請隨時聯繫。\n\n祝好，\n[你的名字]\n[新的電子郵件/電話]\n[LinkedIn URL]"}
          </TemplateBox>
        </section>

        {/* Section 9: 和多位獵頭合作 */}
        <section id="multiple" className="mb-16 scroll-mt-20">
          <SectionNumber num="08" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">和多位獵頭合作</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">你應該和不止一位獵頭合作。但你需要謹慎管理。</p>
          <h3 className="font-heading text-lg font-bold text-foreground mb-3">應該和多少位獵頭合作？</h3>
          <p className="text-foreground/80 leading-relaxed mb-4 text-sm">沒有固定數字。目標是在你的產業中有 3-5 段穩固的獵頭關係。有些是活躍的（正在為你處理某個職位），有些是休眠的（在資料庫中等待未來的職位）。認識你的獵頭越多，你會聽到越多機會。</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">規則</h3>
          <ul className="space-y-2 text-sm text-foreground/80 mb-6">
            <li>• <strong>告訴每位獵頭</strong>你和其他獵頭也有合作。不需要說出名字。</li>
            <li>• <strong>絕對不要讓兩位獵頭把你推薦到同一家公司的同一個職位。</strong>這會造成費用糾紛，兩位獵頭都會放棄你。在任何獵頭提交你的履歷之前，問清楚是哪家公司、哪個職位。</li>
            <li>• <strong>在所有獵頭面前保持一致的說法。</strong>你的薪資期望、地點偏好和底線，無論對誰說都應該相同。獵頭之間會交流。</li>
            <li>• <strong>如果你透過某位獵頭拿到 offer</strong>，及時告知其他人。不要對他們已讀不回。</li>
          </ul>

          <InfoBox icon={AlertTriangle} title="如果兩位獵頭聯繫你同一個職位怎麼辦？" variant="warning">
            <p className="text-sm">告訴第二位獵頭你已經在和另一位獵頭進行這個職位了。直接說。他們會感謝你的誠實。不要試圖在同一個職位上操作兩邊。一定會出問題。</p>
          </InfoBox>

          <InfoBox icon={Shield} title="如果你已經直接投遞了，然後獵頭打來聊同一家公司怎麼辦？">
            <p className="text-sm">立刻告訴獵頭。如果你的履歷已經在公司的系統裡，獵頭無法在那裡為你安排。隱瞞這件事浪費他們的時間。誠實面對，問他們是否有其他合適的職位。</p>
          </InfoBox>
        </section>

        {/* Section 10: 獵頭失聯了 */}
        <section id="ghosting" className="mb-16 scroll-mt-20">
          <SectionNumber num="09" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">當招募人員或獵頭失聯了</h2>
          <p className="text-foreground/80 leading-relaxed mb-4">這是求職者對招募人員和獵頭最常見的抱怨，也是整個過程中最令人挫折的部分。</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">他們為什麼沉默</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• 他們手上沒有適合你的職位</li>
            <li>• 公司暫停了這個職位或內部填補了</li>
            <li>• 他們同時處理 30 多位候選人，你不是最優先的</li>
            <li>• 他們在等公司的回饋</li>
            <li>• 他們轉去做其他搜尋了</li>
            <li>• 公司給了負面回饋，他們不想傳達壞消息</li>
          </ul>
          <p className="text-foreground/80 leading-relaxed mb-4 text-sm"><strong>這不代表什麼：</strong>這很少代表你做錯了什麼。招聘是一項商業行為。如果沒有適合你的活躍職位，他們沒有理由打給你。</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <h4 className="font-heading font-bold text-sm mb-4">獵頭失聯了：該怎麼做</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-semibold mb-1">你當時在進行中的面試流程嗎？</p>
                <div className="ml-4 space-y-2 mt-2">
                  <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                    <p className="font-semibold text-amber-700 dark:text-amber-400">{"是 → 他們有錯過承諾的回覆日期嗎？"}</p>
                    <p className="mt-1 text-foreground/80">{"是 → 積極追：打電話（不要用郵件）。表示緊急。"}</p>
                    <p className="mt-1 text-foreground/80">{"否 → 寄郵件追蹤。等一週。還是沒消息？再追一次。還是沒消息？繼續前進。"}</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="font-semibold">{"否 → 你只寄了履歷（還沒對話過）？"}</p>
                    <p className="mt-1 text-foreground/80">{"是 → 他們沒有適合你的職位。保留在追蹤表中。3-6 個月後再試。"}</p>
                    <p className="mt-1 text-foreground/80">{"否 → 追蹤兩次（間隔一週）。沒回應？繼續前進。保持門開著。"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <InfoBox icon={Zap} title="更積極追的情況" variant="warning">
              <ul className="space-y-1 text-sm">
                <li>• 你在一個活躍的面試流程中，他們在中途沉默了</li>
                <li>• 他們說會在某個日期回覆你，但沒有</li>
                <li>• 你有時間緊迫的情況（另一個 offer）</li>
              </ul>
              <p className="text-sm mt-2">在這些情況下，用電話追。郵件容易被忽略。電話表示緊急。</p>
            </InfoBox>
            <InfoBox icon={Shield} title="放手的情況">
              <ul className="space-y-1 text-sm">
                <li>• 你寄了履歷但從沒收到回覆</li>
                <li>• 你已經追了兩次沒有回應</li>
                <li>• 他們從一開始就對職位和公司含糊不清</li>
              </ul>
              <p className="text-sm mt-2">永遠不要斷了關係。今天對你失聯的獵頭，6 個月後可能手上有你夢想的職位。</p>
            </InfoBox>
          </div>

          <TemplateBox title="範本：獵頭失聯時的追蹤郵件">
            {"主旨：追蹤 | [你的名字]\n\n[姓名] 你好，\n\n我想追蹤上次我們關於 [職位/你的求職] 的對話。我仍然有興趣，目前也仍在積極找機會。\n\n如果你那邊有任何更新，我很想知道。如果時機不對，完全沒問題。我很樂意保持聯繫，等待未來的機會。\n\n祝好，\n[你的名字]"}
          </TemplateBox>

          <TemplateBox title="範本：第二次追蹤（換個角度）">
            {"主旨：打個招呼 | [你的名字]\n\n[姓名] 你好，\n\n我想確認你有收到我上次的訊息。我仍在積極找機會，也對 [職位/你的領域的機會] 有興趣。\n\n我理解你那邊事情進展很快。如果時間有變化，沒問題。我希望繼續留在你的候選人名單上。\n\n祝好，\n[你的名字]"}
          </TemplateBox>

          <p className="text-foreground/80 leading-relaxed text-sm">另一面：如果一位獵頭持續失聯、不溝通、面試後也不給回饋，那就是紅旗。找一位更好的。</p>
        </section>

        {/* 速查表 */}
        <section id="cheatsheet" className="mb-16 scroll-mt-20">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">快速參考速查表</h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm mb-3">7 條法則</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80">
                <li>搞清楚誰付他們錢</li><li>保守他們的秘密</li><li>對一切誠實</li><li>保持一致，不要有意外（獵頭）</li><li>回覆要快</li><li>聽從獵頭的指導</li><li>什麼都要溝通，特別是其他面試</li>
              </ol>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm mb-3">獵頭的 8 步流程</h3>
              <p className="text-sm text-foreground/80">{"公司開出職缺 → 獵頭搜尋資料庫 → 獵頭聯繫你 → 篩選電話（2-3 通）→ 推薦人查核 → 向用人主管推薦 → 公司面試你 → 錄用或不錄用"}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm mb-3">履歷優先順序</h3>
              <p className="text-sm text-foreground/80">{"內部推薦 → 獵頭推薦 → 當地候選人 → 不需要簽證 → 需要簽證 + 搬遷"}</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm mb-3">保持聯繫的頻率</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• 積極求職中：每週一封郵件</li><li>• 被動/未在找工作：每 3-6 個月</li><li>• 換工作、換職稱或換聯繫方式：立刻通知</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-sm mb-3">他們打電話時要準備好的東西</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• 你的履歷（已更新）</li><li>• 你的薪資範圍</li><li>• 你的地點偏好和底線</li><li>• 你的「為什麼在找工作？」回答</li><li>• 關於職位和公司的問題</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 更多指南 */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">更多免費指南</h2>
          <div className="space-y-3">
            <Link to="/zh-tw/resume-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div><p className="font-semibold text-sm text-foreground">完美履歷：10 條面試邀約黃金法則</p><p className="text-xs text-muted-foreground">打造一份能拿到面試機會的履歷。</p></div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
            <Link to="/zh-tw/hr-interview-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div><p className="font-semibold text-sm text-foreground">篩選電話攻略</p><p className="text-xs text-muted-foreground">如何通過第一關，進入面試。</p></div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
            <Link to="/zh-tw/pivot-method-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div><p className="font-semibold text-sm text-foreground">職涯轉型指南</p><p className="text-xs text-muted-foreground">招募人員教你如何轉換跑道。</p></div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
          </div>
        </section>

      </main>

      <GuideShareButtons isZhTw />

    </div>
  );
}