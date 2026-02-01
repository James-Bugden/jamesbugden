import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, Zap, Calendar, Building, Search, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const JanelleChengReviewZhTw = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <ReviewLanguageToggle />
            <a href="/downloads/CHI_CHENG_JANELLE_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">下載 PDF</span>
            </a>
          </div>
        </div>
      </header>

      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審閱報告</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">鄭季 (Janelle)</h1>
          <p className="text-cream/80 text-lg">資深分析工程師 | Maniko Nails & Riot</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* 整體評估 */}
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
                <p className="text-3xl font-bold text-gold">90/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="修改前" size="md" />
                <ScoreGauge score={95} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷展現了強大的分析工程師定位，在目前職位有出色的技術執行力。</p>
              <p><strong>第一，缺少關鍵聯絡資訊對歐盟招募人員造成即時摩擦。</strong>沒有電話號碼、沒有明確地點，最關鍵的是從台灣申請德國和法國職位卻沒有工作授權聲明，意味著無論資歷如何，您的申請都面臨自動篩選挑戰。</p>
              <p><strong>第二，分配給不相關內容的空間減少了對最強技術工作的聚焦。</strong>專業發展（聚會參與）和志工經驗（2013 年觀光規劃）佔用寶貴的履歷空間卻不支持您的分析工程師定位。</p>
              <p><strong>第三，部分要點缺乏展示影響力深度所需的具體性。</strong>雖然大多數要點遵循 XYZ 框架，但一些關鍵成就（KPI 分析使毛利增加 3 倍、客戶留存改善）需要更清晰的方法論來展示您的工作如何創造商業價值。</p>
              <p>然而，您的核心資歷對分析工程師職位來說是卓越的。您的 dbt 實務經驗將 SAP 資料轉換為 20 多個商業模型、10 多個自動化 Tableau 儀表板並 100% 準時交付、跨歐洲/美國/亞洲的多區域 BI 統一、建立自助分析文化，以及 9 年橋接商業策略與資料建模的經驗。</p>
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於呈現細節造成不必要的摩擦。</p>
            </div>
          </div>

          {/* 優點與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現良好的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>出色的目前職位呈現：</strong>Teamson Design Corp 要點展現強大的分析工程師能力，包含 dbt 工作流程、星型綱要建模、高階 BI 交付和利害關係人賦能，全部帶有量化指標（20+ 模型、10+ 儀表板、100% 準時、24% 工單減少、3 倍毛利增加）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>出色的摘要：</strong>您的摘要已經非常出色且針對分析工程師職位量身定制，清楚定位您為「橋接商業策略與資料建模的分析工程師」，量化 9 年經驗，強調國際協作（歐洲/美國/亞洲），並自然整合關鍵字（dbt、SQL、Tableau）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>現代技術堆疊：</strong>您的技術堆疊區塊涵蓋所有主要分析工程師工具，dbt、SQL、Tableau、Python、Airflow、Docker、Git 與 CI/CD，以及 GCP（BigQuery、GCS、Compute Engine）展現超越基本 SQL 分析的工程思維</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的 XYZ 框架執行：</strong>大多數要點有效遵循「完成 [X] 透過 [Y] 衡量，藉由做 [Z]」結構，展示成果（20% 延遲改善）、量化（10+ 儀表板、100+ 用戶）和方法（dbt 工作流程、星型綱要模型、RBAC 管理）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>乾淨格式和視覺層次：</strong>兩頁格式適合您的經驗水準，版面專業且易於掃描，區塊邏輯組織，並善用背景說明（如「玩具與傢俱電商」明確產業類型）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>相關認證：</strong>近期的 Tableau Desktop 培訓（2023-2024）和 Google 敏捷專案管理（2025）展現在直接相關領域的持續專業發展</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強調國際經驗：</strong>摘要和經驗要點中的歐洲、美國和亞洲多區域協作，為 Maniko（全球客戶）和 Riot（國際營運）等全球公司提供良好定位</span>
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
                  <span className="text-foreground"><strong>頁首缺少電話號碼：</strong>未提供聯絡電話，招募人員需要多種聯絡方式，特別是需要亞洲到歐盟時區協調的遠端職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少地點資訊：</strong>頁首未指定城市或國家，對於遠端職位來說，指明時區背景和從台灣申請德國/法國職位時的工作授權狀態至關重要</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>沒有工作授權聲明：</strong>從台灣申請歐盟職位卻沒有明確的簽證/工作權聲明，會造成即時的不確定性，招募人員會假設您需要贊助並可能自動過濾您的申請，無論資歷如何</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>專業發展區塊有些不相關：</strong>dbt Meetup Taiwan 和 Tableau User Group Meetup Taiwan 展現社群參與，但佔用空間卻未展示經過驗證的能力，聚會參與更適合放在 LinkedIn 而非履歷</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>志工經驗與工作無關：</strong>2013 年的原住民部落觀光規劃（12 年前）與分析工程師職位無關，佔用寶貴空間，這些空間可以用來展示相關技術專案或擴展目前職位成就</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Teamson 第 4 點缺乏具體性：</strong>「透過 KPI 和費用分析促進資料驅動行動，發現成本驅動因素並實現 3 倍貢獻毛利增加」未指明哪些 KPI、什麼分析方法，或您的工作如何直接促成 3 倍增長</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>沒有明確強調資料品質或測試：</strong>兩個目標職位描述都強調資料品質框架和驗證流程，但您的要點沒有明確提及測試、驗證或資料品質保證工作</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少利害關係人協作流程細節：</strong>雖然要點展示產出（交付的儀表板、建立的模型），但沒有明確描述兩個職位描述都強調的協作流程</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* 目標職位準備度評估 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">目標職位準備度評估</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">資深分析工程師 - Maniko Nails（德國）</h3>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">整體適配度：75% 準備就緒 → 95% 準備就緒（實施後）</p>
              <p className="text-sm text-muted-foreground mt-1">待工作授權明確</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">首席分析工程師 - Riot（法國）</h3>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">整體適配度：70% 準備就緒 → 90% 準備就緒（實施後）</p>
              <p className="text-sm text-muted-foreground mt-1">待工作授權明確並新增利害關係人挑戰範例</p>
            </div>
          </div>
        </section>

        {/* 關鍵改進說明 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 6 項策略性轉變，以最佳方式為您定位 Maniko 和 Riot 的資深分析工程師職位。以下是影響最大的改變：
          </p>

          {/* 改進 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 聯絡資訊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增完整聯絡資訊並附工作授權聲明</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（造成重大招聘摩擦）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>沒有電話號碼降低可及性，招募人員需要多種聯絡方式，特別是需要亞洲與歐洲時區協調的國際遠端職位</p>
                  <p>缺少地點造成困惑，歐盟招募人員無法判斷您是在台灣、已在歐洲，還是計劃搬遷，除非有明確的城市/國家</p>
                  <p>沒有工作授權聲明是關鍵阻礙，從台灣申請德國和法國卻沒有明確簽證狀態意味著招募人員會假設您需要贊助（昂貴且複雜），並首先過濾您的申請，無論資歷如何</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - 選項 A（如果您有歐盟工作授權）：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">鄭季 (JANELLE)</p>
                  <p>分析工程師</p>
                  <p>台北，台灣 | 歐盟工作授權 | 願意搬遷</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>
            </div>
          </div>

          {/* 改進 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 移除不相關區塊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">移除專業發展和志工經驗區塊</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（佔用寶貴空間）：</p>
                <p className="text-muted-foreground text-sm">專業發展：dbt Meetup Taiwan、Tableau User Group Meetup Taiwan</p>
                <p className="text-muted-foreground text-sm mt-2">志工經驗：2013 年原住民部落觀光規劃（12 年前，與工作無關）</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm">完全移除這兩個區塊。聚會參與不展示經過驗證的能力，12 年前的觀光規劃與分析工程師職位無關。釋放的空間可用於擴展目前職位成就或新增資料品質要點。</p>
              </div>
            </div>
          </div>

          {/* 改進 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#3 新增資料品質強調</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增資料品質和測試要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">新增要點：</p>
                <p className="text-foreground text-sm italic">「建立資料品質框架，使用 dbt 測試自動化資料驗證，覆蓋 20 多個商業模型的空值檢查、唯一性約束和關聯完整性，減少 40% 的資料品質相關事件並將儀表板可靠性提升至 99%。」</p>
              </div>
            </div>
          </div>
        </section>

        {/* 策略定位與 ATS 優化 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">策略定位與 ATS 優化</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">角色明確策略：建立兩個客製化版本</h3>
            <p className="text-muted-foreground mb-4">您正在申請兩家不同公司，它們有類似但略有不同的分析工程師重點。雖然一份履歷適用於兩者，但小幅客製化將提高匹配率。</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">版本 1：資深分析工程師 - Maniko Nails（主要目標）</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>職稱：</strong>「分析工程師」</li>
                  <li><strong>摘要重點：</strong>自助分析、dbt 資料建模、利害關係人協作、多區域 BI</li>
                  <li><strong>關鍵字強調：</strong>dbt、SQL、Tableau、資料建模、自助服務、資料品質、驗證、商業合作夥伴關係</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">版本 2：首席分析工程師 - Riot（次要目標）</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>職稱：</strong>「分析工程師」或「首席分析工程師」</li>
                  <li><strong>摘要重點：</strong>資料基礎設施、可擴展資料產品、利害關係人管理、資料驅動方法</li>
                  <li><strong>關鍵字強調：</strong>資料基礎設施、資料產品、可擴展性、利害關係人管理、挑戰假設</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">ATS 關鍵字匹配分析</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">優化前 - Maniko 關鍵字</p>
                <p className="mt-3 text-sm font-semibold">關鍵字匹配分數：<span className="text-yellow-500">55%</span></p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">優化後 - Maniko 關鍵字</p>
                <p className="mt-3 text-sm font-semibold">關鍵字匹配分數：<span className="text-green-600">95%</span></p>
              </div>
            </div>
          </div>
        </section>

        {/* 履歷效能改善 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">履歷效能改善</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 優化前
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>缺少聯絡資訊 → 降低可及性並對歐盟招募人員造成工作授權不確定性</li>
                <li>不相關區塊佔用空間 → 專業發展和志工經驗稀釋對技術成就的聚焦</li>
                <li>部分要點缺乏具體性 → KPI 分析、客戶留存方法不清楚，削弱能力證明</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">預估通過率：Maniko 55%，Riot 45%</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-green-600 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 優化後
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>完整聯絡資訊附工作授權 → 移除關鍵的歐盟招聘阻礙並展現專業度</li>
                <li>聚焦於相關成就 → 每個區塊都直接支持分析工程師定位</li>
                <li>所有要點遵循 XYZ 框架 → 全篇有清晰成果、量化指標、具體方法</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-green-600">預估通過率：Maniko 95%，Riot 90%</p>
            </div>
          </div>

          <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
            <p className="text-sm text-foreground"><strong>結論：</strong>優化聯絡資訊、移除不相關區塊並新增策略關鍵字，可以將您在歐盟分析工程師職位的面試率提高約 3 倍。您的技術經驗已經非常出色，這些改變只是確保招募人員能無障礙地看到它。</p>
          </div>
        </section>

        {/* 下一步 */}
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
                  <p className="font-semibold text-foreground">修正格式和基本資訊</p>
                  <p className="text-muted-foreground text-sm">新增電話號碼、地點和工作授權聲明（15 分鐘）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">移除不相關區塊</p>
                  <p className="text-muted-foreground text-sm">刪除專業發展和志工經驗區塊（5 分鐘）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">新增資料品質要點</p>
                  <p className="text-muted-foreground text-sm">在 Teamson 經驗中加入測試和驗證工作（30 分鐘）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">增強利害關係人協作語言</p>
                  <p className="text-muted-foreground text-sm">在要點中加入需求收集、商業翻譯流程（30 分鐘）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-foreground">建立兩個客製化版本</p>
                  <p className="text-muted-foreground text-sm">一個針對 Maniko（Tableau 重點）、一個針對 Riot（基礎設施重點）（45 分鐘）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">6</div>
                <div>
                  <p className="font-semibold text-foreground">申請 5-10 個目標職位</p>
                  <p className="text-muted-foreground text-sm">為每個申請客製化履歷（持續進行）</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">7</div>
                <div>
                  <p className="font-semibold text-foreground">使用 STAR 方法準備面試故事</p>
                  <p className="text-muted-foreground text-sm">為每個主要成就準備 2-3 分鐘的故事</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 最後想法 */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8 text-cream">
            <h2 className="font-heading text-2xl mb-4">最後想法</h2>
            <div className="space-y-4 text-cream/90">
              <p>您的經驗對資深分析工程師職位來說是優秀的。</p>
              <p>您在 Teamson 的 dbt 工作、Tableau 儀表板交付、多區域協作和自助文化建立都直接符合 Maniko 和 Riot 的要求。</p>
              <p>唯一真正的阻礙是工作授權明確性和小幅呈現優化。</p>
              <p className="text-gold font-semibold text-lg">您有經驗。現在您有定位。去拿到 offer 吧。</p>
              <p className="text-xl">祝好運！🚀</p>
            </div>
          </div>
        </section>

        {/* 回饋區塊 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">您的回饋很重要</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">分享您的回饋</h3>
              </div>
              <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進服務。我會閱讀每一則回覆並持續優化我的方法。</p>
            </a>
            <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow">
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

export default JanelleChengReviewZhTw;