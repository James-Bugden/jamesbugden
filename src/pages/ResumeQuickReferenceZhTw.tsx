import { Download, FileText, Target, CheckSquare, Clock, ArrowRight } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">
    {num}
  </span>
);

const ResumeQuickReferenceZhTw = () => {
  useTrackGuideProgress("resume-ref");
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/zh-tw/resume-quick-reference", title: "履歷快速參考｜一頁速查表", description: "一頁式履歷速查表，含格式規則、動作動詞和注意事項。" })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <button
              onClick={() => navigate("/resume-quick-reference")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            完美履歷：<br className="hidden sm:block" />快速參考指南
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            你需要的一切，都在這一頁。沒有廢話。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">
              James Bugden | Uber 資深招募官
            </p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">3 分鐘閱讀</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Template Download */}
      <section className="py-10 md:py-14 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-5">
            <Download className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">免費模板</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
            下載你的履歷模板
          </h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
            已排版好。直接填入。遵循本指南的每一條規則。
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-executive-green font-semibold w-full sm:w-auto h-12 px-8 text-base">
                <Download className="w-5 h-5 mr-2" />
                英文模板
              </Button>
            </a>
            <a
              href="https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted font-semibold w-full sm:w-auto h-12 px-8 text-base">
                <Download className="w-5 h-5 mr-2" />
                中文模板
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* 4 項測試 */}
        <section className="py-14 md:py-20">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                你的履歷必須通過的 4 項測試
              </h2>
              <p className="text-muted-foreground text-lg">
                你的履歷依序通過四項測試。任何一項失敗你就出局。
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { num: "1", label: "關鍵字" },
              { num: "2", label: "掃描（6 秒）" },
              { num: "3", label: "資格" },
              { num: "4", label: "適配" },
            ].map((test, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 text-center relative">
                <span className="text-gold font-heading text-2xl font-bold">{test.num}</span>
                <p className="text-foreground text-sm font-medium mt-1">{test.label}</p>
                {i < 3 && (
                  <ArrowRight className="w-4 h-4 text-gold absolute -right-3.5 top-1/2 -translate-y-1/2 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-3 text-center">
            <p className="text-foreground font-medium">
              四項全部通過 → <span className="text-gold font-semibold">招募官會拿起電話打給你</span>
            </p>
          </div>
        </section>

        {/* 10 條黃金法則 */}
        <section className="pb-14 md:pb-20">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                10 條黃金法則
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "只申請你有資格的職位",
              "反映目標職位描述中的語言",
              "用實力突出，不是用花樣",
              "正好一頁。大多數人沒有例外",
              "先為掃描而設計，再為閱讀而設計",
              "每個條目都用主動語態",
              "成果，而非職責（三 R 模型）",
              "優先放與職位最相關的資訊",
              "完美防止被淘汰",
              "持續保持一致",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <span className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-foreground text-sm md:text-base leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* 三 R 模型 */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                三 R 模型
              </h2>
              <p className="text-muted-foreground text-lg">
                你履歷上的每個條目都必須符合：
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: "相關", eng: "Relevant", desc: "與職位描述相關。" },
              { title: "相對", eng: "Relative", desc: "與基準比較。" },
              { title: "成果導向", eng: "Results-oriented", desc: "聚焦結果，而非任務。" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5 text-center">
                <span className="inline-flex w-10 h-10 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-lg mb-3">
                  R
                </span>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-xs mb-1">({item.eng})</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <p className="font-medium text-destructive mb-3 text-sm uppercase tracking-wider">✕ 弱</p>
              <p className="text-foreground italic mb-2">「負責管理客戶帳戶。」</p>
              <p className="text-muted-foreground text-xs">（不相關。不相對。沒有成果。）</p>
            </div>
            <div className="bg-background border border-gold/30 rounded-xl p-5">
              <p className="font-medium text-gold mb-3 text-sm uppercase tracking-wider">✓ 強</p>
              <p className="text-foreground italic mb-2">「在 37 個中型客戶中維持 85% 留存率，超額完成成長目標 55%。」</p>
              <p className="text-muted-foreground text-xs">（相關。相對。成果導向。）</p>
            </div>
          </div>
          <p className="text-muted-foreground italic text-sm text-center mt-6">
            同一個人。同一份工作。完全不同的印象。
          </p>
        </div>
      </section>

      {/* 框架技巧 */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                框架技巧
              </h2>
              <p className="text-muted-foreground text-lg">
                把模糊的影響轉換為具體數字。讓數學為你工作。
              </p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-cream/60 text-xs uppercase tracking-wider mb-3 text-center">公式</p>
            <p className="text-cream font-mono text-sm md:text-base text-center leading-relaxed">
              8 人 × 每週省 2 小時 × 時薪 $30 × 52 週
            </p>
            <p className="text-gold font-heading text-2xl md:text-3xl text-center mt-2 font-bold">
              = 每年 $25,000
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <p className="font-medium text-destructive mb-3 text-sm uppercase tracking-wider">✕ 之前</p>
              <p className="text-foreground text-sm italic">「優化了一個幫團隊節省時間的流程。」</p>
            </div>
            <div className="bg-card border border-gold/30 rounded-xl p-5">
              <p className="font-medium text-gold mb-3 text-sm uppercase tracking-wider">✓ 之後</p>
              <p className="text-foreground text-sm italic">「在 8 名團隊成員中節省了每年 $25,000。」</p>
            </div>
          </div>
          <p className="text-muted-foreground italic text-sm text-center mt-6">
            同一個專案。同一個結果。強 10 倍的印象。
          </p>
        </div>
      </section>

      {/* 送出前檢查清單 */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-10">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                送出前檢查清單
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                規劃
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">確認目標公司和職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">從 3-5 個職位描述中提取關鍵字</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">將成就對應到職位描述關鍵字</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                格式
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">正好一頁，填滿整頁</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">內容密度 30-50%</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">全程一種字型。不用顏色、不用圖形。</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">邊距 0.5-1 英吋。行距 1.0-1.15。</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                內容
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">名字是最顯眼的元素</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">每個條目以強而有力的動詞開頭</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">每個條目聚焦成果，而非職責</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">條目盡可能包含數字、百分比或金額</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「5 對 5」法則：近期職位最多 5 個條目，較早最多 3 個</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">沒有放「絕對不要放」清單中的任何內容</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                潤飾
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">零拼寫或文法錯誤</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">全程格式一致（粗體、斜體、日期、間距）</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">檔案存為 PDF：「[你的名字] Resume_[月份 年份]_[公司名稱]」</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* 更多免費指南 */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">06</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">
                更多免費指南
              </h2>
              <p className="text-cream/60">持續提升你的求職競爭力</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/zh-tw/interview-preparation-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">拿到面試了？贏下它</p>
              <span className="text-gold text-sm font-medium">
                面試準備指南 →
              </span>
            </Link>
            <Link to="/zh-tw/pivot-method-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">考慮轉職？</p>
              <span className="text-gold text-sm font-medium">
                轉職方法指南 →
              </span>
            </Link>
            <Link to="/zh-tw/guides" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">瀏覽所有資源</p>
              <span className="text-gold text-sm font-medium">
                查看所有指南 →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons isZhTw />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default ResumeQuickReferenceZhTw;