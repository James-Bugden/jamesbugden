import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const SilviaChenReviewZhTw = () => {
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
            <a 
              href="/downloads/SILVIA_CHEN_RESUME_REVIEW.pdf" 
              download 
              className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors"
            >
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Silvia Chen</h1>
          <p className="text-cream/80 text-lg">客戶成功經理 | Speak</p>
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

          {/* Overall Score Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體分數</p>
                <p className="text-3xl font-bold text-gold">60/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={60} label="修改前" size="md" />
                <ScoreGauge score={90} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷展現了在知名公司的豐富 B2B 經驗，但薄弱的呈現方式讓招募人員無法快速理解您的價值。</p>
              
              <p><strong>第一，缺少摘要區塊造成即時的困惑</strong>——不清楚您目標是什麼職位以及為什麼您符合資格。招募人員花 6 秒掃描履歷。沒有摘要在開頭展示您的客戶成功專業知識，他們就會轉向下一位候選人。</p>
              
              <p><strong>第二，全篇使用職責導向語言</strong>而非成果導向的成就。您告訴雇主您負責什麼，而不是您達成了什麼成果。大多數要點缺乏 XYZ 框架：「透過執行 [Z]，以 [Y] 衡量，達成了 [X]」。</p>
              
              <p><strong>第三，格式和間距不一致</strong>讓履歷看起來倉促且不專業。不同的要點樣式、間距問題和格式不一致顯示對細節的關注不足。</p>
              
              <p>然而，您具備客戶成功經理職位所需的紮實資歷。您擁有 8 年以上 B2B 經驗、驅動客戶留存的能力、跨部門協作技能，以及雙語能力（英語、日語 N1、正在學習韓語）。</p>
              
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於您如何呈現它。</p>
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
                  <span className="text-foreground"><strong>Merkle 強大的客戶留存成就</strong>：透過 RFM 模型和數據驅動的再互動策略，為家具品牌達成 122% 銷售目標，展現具體方法論的量化客戶成功影響</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>知名公司的相關 B2B 經驗</strong>：8 年以上在 Merkle/Dentsu、DKSH Smollan（Google Pixel）、HTC/VIVEPORT、ASUS ROG 的經驗，展現在科技和數位領域的進步，品牌知名度高</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>數據分析和 CRM 技能</strong>：RFM 模型、客戶旅程地圖、LINE/CRM 標籤、A/B 測試、Tableau、Power BI 和 Excel 經驗，直接符合數據驅動的客戶成功要求</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>多語言能力</strong>：流利英語、日語（JLPT N1）、正在學習韓語（TOPIK 1），展現在多語言環境工作和支援國際客戶的能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>跨部門協作經驗</strong>：與數據團隊、行銷、銷售、產品團隊和工程團隊合作，展現跨部門合作以確保客戶成功的能力</span>
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
                  <span className="text-foreground"><strong>缺少摘要區塊</strong>：沒有執行摘要意味著招募人員無法快速理解您的價值主張、經驗年資，或為什麼您符合客戶成功經理職位的資格</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>聯絡資訊不完整</strong>：缺少 LinkedIn 網址和地點（台北，台灣）。現代履歷需要 LinkedIn 來驗證可信度，需要地點來明確工作授權狀態</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>全篇職責導向語言</strong>：幾乎每個要點都描述責任（「驅動」、「架構」、「協調」、「監控」）而非使用 XYZ 框架的可衡量成果</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>格式和間距不一致</strong>：不同的要點樣式、區塊間距問題、縮排不一致，讓履歷看起來不專業且難以掃描</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少關鍵客戶成功關鍵字</strong>：履歷缺少「客戶引導」、「QBR」、「續約」、「流失降低」、「客戶健康分數」、「擴展收入」、「NPS」、「客戶倡導」等術語</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>語言能力被埋沒</strong>：多語言能力（英語、日語 N1、韓語）埋在技能區塊，而非作為競爭優勢突出顯示</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* KEY IMPROVEMENTS EXPLAINED */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 6 項策略性轉變，以最佳方式為您定位 Speak 的客戶成功經理職位。以下是影響最大的改變：
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 新增執行摘要</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增執行摘要以展示客戶成功經驗</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（完全缺失）：</p>
                <p className="text-muted-foreground text-sm">您的履歷沒有摘要區塊。招募人員花 6 秒掃描履歷再決定是否繼續閱讀。沒有摘要，他們必須從分散在多個職位的要點中拼湊您的價值主張。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm italic">擁有 8 年以上 B2B 經驗的客戶成功專業人士，專注於驅動科技和數位平台的客戶留存、擴展和滿意度。過往成績包括透過數據驅動的再互動策略達成 122% 銷售目標、透過優化客戶旅程地圖降低流失率，以及透過銷售和行銷協調將市場份額擴展 53%（1.5% 到 2.3%）為 Google Pixel。專精於客戶生命週期管理、CRM 策略、跨部門協作和數據分析（RFM 模型、A/B 測試、Tableau、Power BI）。流利英語和日語（JLPT N1），具有支援亞太市場全球客戶的經驗。</p>
              </div>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ 框架</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">使用 XYZ 框架重寫經驗要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（職責導向）：</p>
                <p className="text-muted-foreground text-sm">「驅動高價值家具品牌客戶的客戶留存策略，使用 RFM 模型和再互動行銷活動。」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（成果導向）：</p>
                <p className="text-foreground text-sm">「透過設計基於 RFM 的客戶分群和個人化再互動行銷活動，達成 122% 銷售目標，將客戶生命週期價值提升 25%，降低 15% 流失率。」</p>
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
                  <p className="font-semibold text-foreground">新增執行摘要</p>
                  <p className="text-muted-foreground text-sm">3-4 句摘要，包含經驗年資、量化成就、關鍵技能和客戶成功聚焦</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">補充聯絡資訊</p>
                  <p className="text-muted-foreground text-sm">新增 LinkedIn 網址和「台北，台灣」地點</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">使用 XYZ 框架重寫要點</p>
                  <p className="text-muted-foreground text-sm">每個要點格式：「透過執行 [Z]，以 [Y] 衡量，達成了 [X]」</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">統一格式</p>
                  <p className="text-muted-foreground text-sm">一致的要點樣式、適當間距、統一縮排、清晰的視覺層次</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-foreground">新增客戶成功關鍵字</p>
                  <p className="text-muted-foreground text-sm">在摘要、要點和技能中策略性加入客戶成功術語</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                <div>
                  <p className="font-semibold text-foreground">突出語言能力</p>
                  <p className="text-muted-foreground text-sm">獨立「語言」區塊：「英語（流利）、日語（JLPT N1）、韓語（TOPIK 1 - 學習中）」</p>
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

export default SilviaChenReviewZhTw;
