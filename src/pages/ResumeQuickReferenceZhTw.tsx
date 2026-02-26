import { Download, FileText, Target, CheckSquare, Linkedin } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import PageSEO from "@/components/PageSEO";

const ResumeQuickReferenceZhTw = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="完美履歷：快速參考指南 | James Bugden"
        description="10 條黃金法則、三 R 模型、框架技巧與送出前檢查清單。由 Uber 資深招募官 James Bugden 撰寫。"
        path="/zh-tw/resume-quick-reference"
        lang="zh-Hant-TW"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <button
            onClick={() => navigate("/resume-quick-reference")}
            className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
          >
            EN
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <FileText className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">免費職涯資源</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            完美履歷：快速參考指南
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            你需要的一切，都在這一頁。沒有廢話。
          </p>
          <p className="text-base text-cream/60 mb-6">
            James Bugden | Uber 資深招募官
          </p>
        </div>
      </section>

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* 下載你的履歷模板 */}
        <section className="py-12 md:py-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Download className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              下載你的履歷模板
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            已排版好。直接填入。遵循本指南的每一條規則。
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button className="bg-gold hover:bg-gold/90 text-executive-green font-semibold w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                English Template
              </Button>
            </a>
            <a
              href="https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button variant="outline" className="border-gold/40 text-gold hover:bg-gold/10 font-semibold w-full sm:w-auto">
                <Download className="w-4 h-4 mr-2" />
                中文模板
              </Button>
            </a>
          </div>
        </section>

        {/* 你的履歷必須通過的 4 項測試 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-executive-green flex items-center justify-center">
              <Target className="w-6 h-6 text-cream" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              你的履歷必須通過的 4 項測試
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            你的履歷依序通過四項測試。任何一項失敗你就出局。
          </p>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            {["測試 1：關鍵字", "測試 2：掃描（6 秒）", "測試 3：資格", "測試 4：適配"].map((test, i) => (
              <div key={test} className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground">
                  {test}
                </span>
                {i < 3 && <span className="text-gold font-bold">→</span>}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-gold font-bold">→</span>
              <span className="px-3 py-1.5 bg-gold/20 border border-gold/40 rounded-lg text-sm font-semibold text-gold">
                ✓ 接到電話
              </span>
            </div>
          </div>
          <p className="text-foreground font-medium">
            四項全部通過，招募官會拿起電話打給你。
          </p>
        </section>

        {/* 10 條黃金法則 */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">
            10 條黃金法則
          </h2>
          <div className="space-y-4">
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
              <div key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <p className="text-foreground text-base md:text-lg pt-1">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 三 R 模型 */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            三 R 模型
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            你履歷上的每個條目都必須符合：
          </p>
          <div className="space-y-4 mb-8">
            {[
              { letter: "R", title: "相關（Relevant）", desc: "與職位描述相關。" },
              { letter: "R", title: "相對（Relative）", desc: "與基準比較。" },
              { letter: "R", title: "成果導向（Results-oriented）", desc: "聚焦結果，而非任務。" },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 font-bold text-gold text-sm">
                  {item.letter}
                </span>
                <div>
                  <span className="font-semibold text-foreground">{item.title}：</span>{" "}
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5 mb-4">
            <p className="font-medium text-destructive mb-2">弱：</p>
            <p className="text-foreground text-sm italic">「負責管理客戶帳戶。」</p>
            <p className="text-muted-foreground text-xs mt-1">（不相關。不相對。沒有成果。）</p>
          </div>
          <div className="bg-card border border-gold/30 rounded-lg p-5 mb-4">
            <p className="font-medium text-gold mb-2">強：</p>
            <p className="text-foreground text-sm italic">「在 37 個中型客戶中維持 85% 留存率，超額完成成長目標 55%。」</p>
            <p className="text-muted-foreground text-xs mt-1">（相關。相對。成果導向。）</p>
          </div>
          <p className="text-muted-foreground italic text-sm">
            同一個人。同一份工作。完全不同的印象。
          </p>
        </section>

        {/* 框架技巧 */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            框架技巧
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            把模糊的影響轉換為具體數字。讓數學為你工作。
          </p>
          <div className="bg-executive-green rounded-lg p-6 mb-6">
            <p className="text-cream font-mono text-sm md:text-base text-center">
              8 人 × 每週省 2 小時 × 時薪 $30 × 52 週 = <span className="text-gold font-bold">每年 $25,000</span>
            </p>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5 mb-4">
            <p className="font-medium text-destructive mb-2">之前：</p>
            <p className="text-foreground text-sm italic">「優化了一個幫團隊節省時間的流程。」</p>
          </div>
          <div className="bg-card border border-gold/30 rounded-lg p-5 mb-4">
            <p className="font-medium text-gold mb-2">之後：</p>
            <p className="text-foreground text-sm italic">「在 8 名團隊成員中節省了每年 $25,000。」</p>
          </div>
          <p className="text-muted-foreground italic text-sm">
            同一個專案。同一個結果。強 10 倍的印象。
          </p>
        </section>

        {/* 送出前檢查清單 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              送出前檢查清單
            </h2>
          </div>

          {/* 規劃 */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">規劃</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">確認目標公司和職位</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">從 3-5 個職位描述中提取關鍵字</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">將成就對應到職位描述關鍵字</span>
              </li>
            </ul>
          </div>

          {/* 格式 */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">格式</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">正好一頁，填滿整頁</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">內容密度 30-50%</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">全程一種字型。不用顏色、不用圖形。</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">邊距 0.5-1 英吋。行距 1.0-1.15。</span>
              </li>
            </ul>
          </div>

          {/* 內容 */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">內容</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">名字是最顯眼的元素</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">每個條目以強而有力的動詞開頭</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">每個條目聚焦成果，而非職責</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">條目盡可能包含數字、百分比或金額</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「5 對 5」法則：近期職位最多 5 個條目，較早最多 3 個</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">沒有放「絕對不要放」清單中的任何內容</span>
              </li>
            </ul>
          </div>

          {/* 潤飾 */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="font-heading text-xl text-gold mb-4">潤飾</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">零拼寫或文法錯誤</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">全程格式一致（粗體、斜體、日期、間距）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">檔案存為 PDF：「[你的名字] Resume_[月份 年份]_[公司名稱]」</span>
              </li>
            </ul>
          </div>
        </section>

        {/* 更多免費指南 */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            更多免費指南
          </h2>
          <div className="space-y-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-foreground font-medium mb-2">拿到面試了？贏下它。</p>
              <Link to="/zh-tw/interview-preparation-guide" className="text-gold hover:underline text-sm">
                面試準備指南 →
              </Link>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-foreground font-medium mb-2">考慮轉職？</p>
              <Link to="/zh-tw/pivot-method-guide" className="text-gold hover:underline text-sm">
                轉職方法指南 →
              </Link>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-foreground font-medium mb-2">所有指南</p>
              <Link to="/zh-tw/guides" className="text-gold hover:underline text-sm">
                查看所有指南 →
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. 版權所有。
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeQuickReferenceZhTw;
