import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp, Award, Globe, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const RoyTsaiReviewZhTw = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <ReviewLanguageToggle />
            <a href="/downloads/YI_TING_ROY_TSAI_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">下載 PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審閱報告</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">蔡宜庭 (Roy)</h1>
          <p className="text-cream/80 text-lg">品牌激活經理 | Revolut / 產品行銷經理 | Snap</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* OVERALL ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">整體評估</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體分數</p>
                <p className="text-3xl font-bold text-gold">70/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={70} label="修改前" size="md" />
                <ScoreGauge score={90} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷有強大的量化成就和紮實的經驗，但呈現方式的問題阻礙了在目標公司獲得面試機會。</p>
              <p>第一，缺少工作授權聲明造成即時被拒風險。您從台灣申請英國（Revolut）和新加坡（Snap）職位，卻沒有澄清簽證狀態。招募人員假設您需要昂貴的贊助，並在閱讀您的資歷之前就篩掉您。</p>
              <p>第二，內容過於密集讓閱讀疲勞。兩頁有 20 多個要點分布在近期職位，迫使招募人員尋找相關資訊。您最強的成就被埋在文字牆中而非在開頭突出顯示。</p>
              <p>第三，技能區塊過於籠統浪費寶貴的 ATS 關鍵字機會。「產品行銷」、「品牌策略」和「數位策略」是基本假設，無法讓您脫穎而出，也不符合職位描述中「上層漏斗」、「創作者經濟」、「品牌一致性」或「客戶分群」等具體要求。</p>
              <p className="text-gold font-semibold">然而，您具備資深產品行銷職位的良好資歷，例如連續 2 年市場份額第一名，以及東英吉利大學品牌領導力碩士學位並獲得優等榮譽——和我同一所大學！問題不在於您的經驗，而在於您如何呈現它。</p>
            </div>
          </div>

          {/* What's Working & What Needs Improvement */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現良好的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>全篇卓越的量化成就</strong>：20 倍銷售提升、5 倍轉換率、疫情期間 +41% 成長、15% 留存率 vs. 10% 基準、+79% 品牌健康改善、ROAS 8 倍、6 個亞太市場節省 £251K 成本，展現持續的成果導向表現</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>獎項認可驗證品質</strong>：2024 Sanofi Play-To-Win 獎、2022 J&J Digital First 獎、2020 亞洲漿紙年度傑出員工證明您交付卓越工作並獲得領導層認可</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的跨國品牌經驗</strong>：Sanofi、Kenvue、嬌生、亞洲漿紙、Coty Inc. 提供可信度，展現您能在複雜組織中大規模運營</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>展現專案建設能力</strong>：在 J&J 建立首個 CRM 忠誠度計畫（在北美、歐洲、澳紐、東南亞全球展示）、在 Sanofi 建立首個策略合作夥伴計畫、首個跨品牌激活，證明您能從零開始創建新能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>相關碩士學位並獲優等</strong>：東英吉利大學（英國）品牌領導力碩士並獲優等，直接符合品牌激活和產品行銷要求</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>跨部門領導力明顯</strong>：成功與數位 IT、商業成長、合規、法務、財務、產品、設計、運營、PMO 協作，展現推動複雜利害關係人群體一致的能力</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 需要改進的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少工作授權聲明</strong>：沒有簽證狀態、工作權利或搬遷時間表。對於英國和新加坡職位，這是造成自動拒絕的最大阻礙，不論資歷如何</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>摘要太長且籠統</strong>：100 多字的段落充滿模糊聲明（「可衡量的業務影響」、「驅動品牌成長」），而非以「20 倍銷售提升」和「15% 留存率 vs. 10% 基準」等量化證明開頭</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技能區塊太籠統且缺少關鍵 JD 關鍵字</strong>：「產品行銷和品牌策略」不符合 Revolut 對「品牌一致性」、「客戶分群」、「內容品質」的需求，或 Snap 對「上層漏斗」、「創作者經濟」、「知名度和考慮行銷活動」的需求</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>經驗區塊太密集有 20 多個要點</strong>：Sanofi（5 個）、Kenvue（4 個）、J&J（5 個）、APP（2 個）、NU SKIN（2 個）、OPPO（3 個）、Coty（2 個）迫使招募人員閱讀所有內容，而非每個角色突出前 3-4 項成就</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>NU SKIN 3 個月任期引發質疑</strong>：2019 年 4-7 月任期非常短，且 NU SKIN 的 MLM 商業模式有爭議名聲，可能損害形象，特別是對於科技/CPG 職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>教育專案佔用太多空間</strong>：三個詳細的 2016-2017 學術專案佔用 8 行卻價值有限。您 10 年以上的專業經驗遠比學生作品重要</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* KEY IMPROVEMENTS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 6 項策略性轉變，以最佳方式為您定位目標職位。以下是影響最大的改變：
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 工作授權</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增明確的工作授權聲明</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（未提及）：</p>
                <p className="text-muted-foreground text-sm">從台灣申請英國和新加坡職位，沒有關於簽證狀態或工作權利的資訊。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm">明確聲明：「需要工作贊助」或「無需贊助即可工作」並附搬遷時間表</p>
              </div>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 摘要優化</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">精簡摘要並以量化證明開頭</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（100 多字，籠統聲明）：</p>
                <p className="text-muted-foreground text-sm">密集段落充滿模糊聲明如「可衡量的業務影響」、「驅動品牌成長」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（90 字以內 4 句）：</p>
                <p className="text-foreground text-sm">以量化證明開頭（20 倍銷售、15% 留存率、+41% 成長）的產品行銷經理或品牌激活經理定位</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">1</div>
                <div>
                  <p className="font-semibold text-foreground">新增工作授權聲明</p>
                  <p className="text-muted-foreground text-sm">明確說明簽證狀態和搬遷時間表</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">精簡摘要</p>
                  <p className="text-muted-foreground text-sm">90 字以內 4 句，以量化證明開頭</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">優化技能區塊</p>
                  <p className="text-muted-foreground text-sm">以類別組織，包含 20 多個具體工具、方法論和 JD 關鍵字</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">精簡經驗區塊</p>
                  <p className="text-muted-foreground text-sm">每個主要角色聚焦前 3-4 項成就，精簡/移除較舊角色（NU SKIN、Coty）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-foreground">移除教育專案細節</p>
                  <p className="text-muted-foreground text-sm">只保留學位和榮譽</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Feedback Section */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">您的回饋很重要</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="https://tally.so/r/81L09x" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">分享您的回饋</h3>
              </div>
              <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進服務。我會閱讀每一則回覆並持續優化我的方法。</p>
            </a>
            
            <a 
              href="https://www.trustpilot.com/review/jamesbugden.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">在 Trustpilot 留下評論</h3>
              </div>
              <p className="text-sm text-muted-foreground">公開評論有助於建立可信度，幫助其他專業人士做出明智的決定。</p>
            </a>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <strong>為什麼 Trustpilot 分數是 3.8？</strong>我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。
            </p>
          </div>
        </section>

      </main>
    </div>
  );
};

export default RoyTsaiReviewZhTw;
