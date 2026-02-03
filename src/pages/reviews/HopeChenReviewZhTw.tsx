import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const HopeChenReviewZhTw = () => {
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
              href="/downloads/HOPE_CHEN_RESUME_REVIEW.pdf" 
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
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審閱</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Hope Chen</h1>
          <p className="text-cream/80 text-lg">品牌與品類成長經理</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 整體評估 */}
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
                <p className="text-3xl font-bold text-gold">90/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">（執行後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="優化前" size="md" />
                <ScoreGauge score={95} label="優化後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷紮實，有清晰的價值主張、強大的量化成就和良好的品牌名稱參考。設計乾淨，95% 的內容運作良好。您有效地說明工具和技能與目標職位的關聯。</p>
              
              <p><strong>第一，職稱字體大小太小的小問題</strong>，在姓名下方減少了定位的視覺影響。</p>
              
              <p><strong>第二，部分工作經驗要點的戰術與策略平衡問題</strong>，描述您做了什麼但沒有明確連結到更廣泛的業務目標或策略影響。</p>
              
              <p><strong>第三，LinkedIn 個人資料不完整</strong>（超出本次審閱範圍），讓招募人員更難透過搜尋找到您。</p>
              
              <p>然而，您具備行銷經理職位所需的強大基礎資歷。您的 10 年快消品和零售經驗、預算管理、與高端品牌（adidas、Schweppes、BMW）合作、量化成就，以及從客戶執行到經理的清晰晉升都展現了能力。</p>
              
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於呈現和將戰術成果連結到策略成果的小修改。</p>
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
                  <span className="text-foreground"><strong>全篇強大的量化成就：</strong>每個重點要點都包含具體指標（11 倍、10%+、153%、40%）展現可衡量的影響，而非模糊聲明</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>高端品牌可信度：</strong>與 adidas、Schweppes、BMW、JP Morgan、LG Taiwan 的合作經驗提供即時可信度並展現大規模工作能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>清晰的預算管理範圍：</strong>1800 萬台幣 A&P 責任顯示經理級問責和財務管理能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>結構組織良好：</strong>精選亮點區塊將最佳工作放在開頭引起注意，核心能力提供關鍵字豐富的摘要，經驗展示適當的細節水準</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>適當的長度和聚焦：</strong>最近職位獲得適當強調，較舊職位適當濃縮，整體履歷可掃描且聚焦</span>
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
                  <span className="text-foreground"><strong>職稱字體大小太小：</strong>「品牌與品類成長經理」需要更大更粗以獲得更好的視覺層次和即時定位清晰度</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>部分要點聚焦於執行而沒有業務背景：</strong>幾個工作經驗要點描述您做了什麼和如何做，但沒有明確連結到更廣泛的業務目標或策略成果</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>不必要地列出 MS Office：</strong>這對行銷職位來說是假設的，浪費可以展示更獨特技能或完全移除的空間</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Shape Advertising 要點缺少成果：</strong>很好地描述了整合 GTM 執行但缺少工作產生的結果（知名度提升、互動率、上市成功）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ADK Taiwan 要點強調營運指標：</strong>100% 準時推出是好的但沒有展示行銷影響或活動效果</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Ogilvy 要點純粹是營運性的：</strong>描述活動協調但沒有任何業務成果如試用率、銷售提升或市場份額影響</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">目前狀態 vs. 最佳狀態</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">元素</th>
                  <th className="text-left py-2 text-muted-foreground">目前狀態</th>
                  <th className="text-left py-2 text-gold">最佳狀態</th>
                  <th className="text-center py-2 text-foreground">優先級</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">職稱視覺層次</td>
                  <td className="py-2 text-muted-foreground">職稱字體在姓名下方太小，降低定位清晰度</td>
                  <td className="py-2 text-foreground">更大、更粗的職稱以立即識別角色</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">工具區塊</td>
                  <td className="py-2 text-muted-foreground">列出 MS Office（假設技能）</td>
                  <td className="py-2 text-foreground">移除或替換為經驗中的資料分析證明</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Shape Advertising 要點</td>
                  <td className="py-2 text-muted-foreground">執行聚焦沒有活動成果</td>
                  <td className="py-2 text-foreground">新增知名度提升、互動率或上市成功指標</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">ADK Taiwan 要點</td>
                  <td className="py-2 text-muted-foreground">強調營運指標（100% 準時）</td>
                  <td className="py-2 text-foreground">新增行銷效益或活動結果</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Ogilvy Action 要點</td>
                  <td className="py-2 text-muted-foreground">協調聚焦沒有業務成果</td>
                  <td className="py-2 text-foreground">新增試用率、銷售提升或市場份額影響</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">中</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 關鍵改進說明 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 5 項策略性轉變，以最佳方式為您定位目標職位。以下是影響最大的改變：
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 職稱層次</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">增加職稱字體大小以獲得更好的視覺層次</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（弱定位）：</p>
                <p className="text-sm text-foreground italic mb-3">Hope Chen 品牌與品類成長經理 [小字體]</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 職稱相對於姓名太小，減少視覺影響</li>
                  <li>• 弱層次造成困惑</li>
                  <li>• 招募人員更難快速分類您</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-sm text-foreground italic mb-3">Hope Chen 品牌與品類成長經理 [更大、更粗字體]</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 招募人員立即看到角色清晰度</li>
                  <li>• 專業的視覺平衡</li>
                  <li>• 6 秒掃描中更快處理</li>
                  <li>• 可靈活客製化</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 資料分析</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">透過經驗背景展示資料分析和 Excel 能力</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（假設技能列出）：</p>
                <p className="text-sm text-foreground italic mb-3">工具：MS Office（Excel、PowerPoint）</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• MS Office 對行銷專業人士來說是假設的</li>
                  <li>• 沒有熟練程度證明</li>
                  <li>• 錯過強調資料技能的機會</li>
                  <li>• 佔用可以移除的行數</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-sm text-foreground mb-2">選項 A：完全移除工具區塊</p>
                <p className="text-sm text-foreground mb-2">選項 B：在 Mediacom 職位新增要點：</p>
                <p className="text-sm text-foreground italic">「為 1800 萬台幣 A&P 資金池進行進階 Excel 活動分析和預算建模，建立自動化儀表板和每週績效報告，指導即時優化決策並將預測準確度提升 [X]%。」</p>
              </div>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#3 Shape Advertising</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">為 Shape Advertising 經驗新增活動成果</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（執行沒有成果）：</p>
                <p className="text-sm text-foreground italic mb-3">「為 LG Taiwan 策劃整合 GTM，結合網紅敘事和社群影片素材，確保跨觸點的訊息一致性和執行品質。」</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 描述過程但不是成果</li>
                  <li>• 缺少行銷影響指標</li>
                  <li>• 純粹營運聚焦</li>
                  <li>• 沒有活動成功證明</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-sm text-foreground mb-2">選項 A（如果您有指標）：</p>
                <p className="text-sm text-foreground italic mb-3">「...達成 [X]% 品牌知名度增加和 [Y]% 互動率，超越活動基準。」</p>
                <p className="text-sm text-foreground mb-2">選項 B（如果沒有指標）：</p>
                <p className="text-sm text-foreground italic">「...成功準時並在預算內推出[產品/活動名稱]，在數位和社群渠道提供連貫的品牌體驗。」</p>
              </div>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 ADK & Ogilvy</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">為 ADK Taiwan 和 Ogilvy Action 經驗新增策略指標</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本 - ADK Taiwan（營運聚焦）：</p>
                <p className="text-sm text-foreground italic">「為 BMW、JP Morgan、CITIZEN 和 Kirin Beer 管理整合 ATL、數位和零售活動，確保訊息和現場活動支持品牌定位和業務目標，協調 ATL/POSM/數位交付物和跨團隊時程；達成 100% 準時推出。」</p>
              </div>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本 - Ogilvy Action（協調聚焦）：</p>
                <p className="text-sm text-foreground italic">「為英美菸草執行 30 多場店內活動，在緊迫時程和品牌合規要求下協調品牌利害關係人和現場團隊。」</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-sm text-foreground mb-2">ADK Taiwan：</p>
                <p className="text-sm text-foreground italic mb-3">「...達成 100% 準時推出並年度活動效益分數提升 [X]%。」</p>
                <p className="text-sm text-foreground mb-2">Ogilvy Action：</p>
                <p className="text-sm text-foreground italic">「...在活動期間達成 [X]% 產品試用增加和 [Y]% 銷售提升，貢獻區域市場份額成長。」</p>
              </div>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 頁首格式</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">優化頁首和小格式元素</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本：</p>
                <p className="text-sm text-foreground italic">LinkedIn: https://www.linkedin.com/in/hopechenyo/</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-sm text-foreground italic mb-3">LinkedIn: linkedin.com/in/hopechenyo</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 更專業的外觀</li>
                  <li>• 更容易手動輸入</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 策略定位與 ATS 優化 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">策略定位與 ATS 優化</h2>
          </div>

          {/* Version 1: UNIQLO */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">版本 1：產品行銷經理（UNIQLO）</h3>
            <p className="text-sm text-muted-foreground mb-4">目標：UNIQLO 產品行銷副理/經理</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">職缺描述關鍵要求：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 8 年以上零售、服飾、化妝品或快消品行銷經驗</li>
                <li>• 付費和自有媒體活動管理</li>
                <li>• 本地專案：活動、數位競賽、與 KOL 內容創作</li>
                <li>• 雙語製作和校對</li>
                <li>• A&P 預算管理</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-foreground font-medium">您的適配度：</span>
              <span className="bg-gold text-white px-3 py-1 rounded-full text-sm">85% 匹配</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">客製化策略：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 職稱：「品牌與品類成長經理」適用，或使用「產品行銷經理 - 快消品與零售」</li>
                <li>• 摘要：強調「零售經驗」和「產品上市規劃」（LTO/NPD）</li>
                <li>• 亮點：以 LTO 上市規劃要點為首（產品上市是這個職位的關鍵）</li>
                <li>• 核心能力：新增「產品生命週期管理」、「零售行銷」、「全通路策略」</li>
                <li>• 經驗：強調跨觸及優化（零售需要廣泛客戶觸及）和季節規劃</li>
              </ul>
            </div>
          </div>

          {/* Version 2: 全億寢飾 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">版本 2：品牌行銷營運經理（全億寢飾）</h3>
            <p className="text-sm text-muted-foreground mb-4">目標：全億寢飾品牌行銷營運經理</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">職缺描述關鍵要求：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 品牌行銷策略和執行</li>
                <li>• 行銷營運和預算管理</li>
                <li>• 代理商和供應商管理</li>
                <li>• 流程優化</li>
                <li>• 內容行銷和品牌敘事</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-foreground font-medium">您的適配度：</span>
              <span className="bg-gold text-white px-3 py-1 rounded-full text-sm">75% 匹配</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">客製化策略：</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 職稱：「品牌與品類成長經理」或「品牌行銷營運經理」</li>
                <li>• 摘要：強調「A&P 預算管理」（1800 萬台幣）和「跨部門領導」</li>
                <li>• 亮點：以展示營運效率的 A&P 優化要點為首（10%+ 觸及提升、40% CPR 降低）</li>
                <li>• 核心能力：新增「行銷營運」、「預算管理」、「流程優化」、「供應商/代理商管理」</li>
                <li>• 經驗：強調所有職位的營運效率改善和代理商合作</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ATS 關鍵字匹配分析 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS 關鍵字匹配分析</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">優化前 - UNIQLO 職位</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-foreground">產品行銷</span><span className="text-yellow-600">弱</span></div>
                <div className="flex justify-between"><span className="text-foreground">零售</span><span className="text-green-600">有</span></div>
                <div className="flex justify-between"><span className="text-foreground">活動</span><span className="text-green-600">有</span></div>
                <div className="flex justify-between"><span className="text-foreground">KOL 合作</span><span className="text-destructive">缺</span></div>
                <div className="flex justify-between"><span className="text-foreground">活動</span><span className="text-destructive">缺</span></div>
                <div className="flex justify-between"><span className="text-foreground">內容創作</span><span className="text-destructive">缺</span></div>
              </div>
              <p className="text-sm text-destructive font-medium mt-4">關鍵字匹配分數：50%</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">優化後 - UNIQLO 職位</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-foreground">產品行銷</span><span className="text-green-600">強</span></div>
                <div className="flex justify-between"><span className="text-foreground">零售</span><span className="text-green-600">強</span></div>
                <div className="flex justify-between"><span className="text-foreground">KOL 合作</span><span className="text-green-600">強</span></div>
                <div className="flex justify-between"><span className="text-foreground">雙語</span><span className="text-green-600">強</span></div>
                <div className="flex justify-between"><span className="text-foreground">數位行銷</span><span className="text-green-600">強</span></div>
                <div className="flex justify-between"><span className="text-foreground">A&P 預算</span><span className="text-green-600">強</span></div>
              </div>
              <p className="text-sm text-gold font-medium mt-4">關鍵字匹配分數：90%</p>
            </div>
          </div>
        </section>

        {/* 履歷關鍵字參考清單 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">履歷關鍵字參考清單</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading text-lg text-foreground mb-4">UNIQLO 產品行銷職位適用</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gold mb-2">產品行銷與零售</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 產品生命週期管理</li>
                    <li>• 零售行銷</li>
                    <li>• 產品上市規劃</li>
                    <li>• LTO/NPD 執行</li>
                    <li>• 全通路策略</li>
                    <li>• 店內行銷</li>
                    <li>• 新店開幕支援</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">活動與內容</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• KOL 合作</li>
                    <li>• 網紅行銷</li>
                    <li>• 內容創作</li>
                    <li>• 雙語活動執行</li>
                    <li>• 社群媒體行銷</li>
                    <li>• 數位競賽</li>
                    <li>• 活動管理</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">營運與預算</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• A&P 預算管理</li>
                    <li>• 付費與自有媒體</li>
                    <li>• 全球活動協調</li>
                    <li>• 跨部門合作</li>
                    <li>• 行銷營運</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading text-lg text-foreground mb-4">全億寢飾品牌行銷營運職位適用</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gold mb-2">行銷營運</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 行銷營運管理</li>
                    <li>• 流程優化</li>
                    <li>• 預算管理與預測</li>
                    <li>• 行銷效率</li>
                    <li>• 活動營運</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">代理商與供應商管理</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 代理商關係管理</li>
                    <li>• 供應商管理</li>
                    <li>• 外部夥伴協調</li>
                    <li>• 製作管理</li>
                    <li>• 創意代理商合作</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">品牌與內容</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 品牌行銷策略</li>
                    <li>• 品牌敘事</li>
                    <li>• 內容行銷</li>
                    <li>• 品牌定位</li>
                    <li>• 整合行銷傳播</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">分析與優化</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 行銷分析</li>
                    <li>• 活動績效分析</li>
                    <li>• 資料驅動優化</li>
                    <li>• 行銷效益</li>
                    <li>• ROI 衡量</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6 italic">提示：只包含真正反映您經驗的關鍵字，因為面試官會要求您詳細說明列出的任何內容。</p>
        </section>

        {/* 履歷效能改善 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">履歷效能改善</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">優化前</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 職稱太小降低定位清晰度 → 招募人員可能忽視或誤解您的級別</li>
                <li>• 部分要點聚焦於戰術而沒有業務背景 → 看起來以執行為主而非策略</li>
                <li>• 列出 MS Office 作為技能 → 浪費空間在假設資訊上</li>
                <li>• Shape Advertising 缺少成果指標 → 缺少活動效果證明</li>
                <li>• ADK Taiwan 只強調營運指標 → 沒有展示高端客戶工作的行銷影響</li>
                <li>• Ogilvy Action 純粹是協調聚焦 → 缺少活動的業務成果</li>
              </ul>
              <p className="text-sm text-destructive font-medium mt-4">預估通過率：目標職位 70-75%</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">優化後</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 更大的職稱有更好的層次 → 招募人員立即看到定位清晰度</li>
                <li>• 所有要點連結戰術到業務目標 → 展現策略思維和業務影響導向</li>
                <li>• 移除 MS Office 或替換為資料分析證明 → 展示獨特的分析能力</li>
                <li>• Shape Advertising 包含活動成果 → 證明超越執行的行銷效果</li>
                <li>• ADK Taiwan 新增效益指標 → 展示高端客戶工作的策略價值</li>
                <li>• Ogilvy Action 包含業務成果 → 展現從早期職涯開始的成果導向</li>
              </ul>
              <p className="text-sm text-gold font-medium mt-4">預估通過率：目標職位 90-95%</p>
            </div>
          </div>
        </section>

        {/* 下一步行動 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">修正格式和基本資訊</h3>
                <p className="text-muted-foreground text-sm">增加職稱字體大小</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">轉換經驗要點以連結業務成果</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• 為 Shape Advertising 要點新增成果</li>
                  <li>• 為 ADK Taiwan 要點新增策略指標</li>
                  <li>• 為 Ogilvy 要點新增業務成果</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">優化工具區塊</h3>
                <p className="text-muted-foreground text-sm">移除 MS Office 或替換為資料分析證明</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">申請 5-10 個目標職位</h3>
                <p className="text-muted-foreground text-sm">根據上述角色特定策略為每個申請客製化履歷</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">5</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">使用 STAR 方法準備面試故事</h3>
                <p className="text-muted-foreground text-sm mb-3">為每個主要成就準備 2-3 分鐘的 STAR 框架故事：</p>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• <span className="font-medium text-foreground">情境：</span>背景/問題是什麼？</li>
                  <li>• <span className="font-medium text-foreground">任務：</span>您的具體職責是什麼？</li>
                  <li>• <span className="font-medium text-foreground">行動：</span>您做了什麼？（逐步）</li>
                  <li>• <span className="font-medium text-foreground">結果：</span>發生了什麼？（量化成果）</li>
                </ul>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">您的 11 倍銷售提升成就範例：</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• <span className="font-medium text-foreground">情境：</span>Schweppes 在競爭激烈的飲料市場面臨銷售下滑，需要突破性活動</li>
                    <li>• <span className="font-medium text-foreground">任務：</span>領導 GTM/IMC 策略以扭轉銷售趨勢並重新奪回市場份額</li>
                    <li>• <span className="font-medium text-foreground">行動：</span>將消費者洞察轉化為渠道特定策略，以目標數位和線下組合優化 O2O 轉換，實施每週績效審查進行即時調整</li>
                    <li>• <span className="font-medium text-foreground">結果：</span>活動期間達成 11 倍銷售提升，超越目標 [X]% 並貢獻整體品牌成長</li>
                  </ul>
                </div>
                
                <div className="mt-4">
                  <p className="text-muted-foreground text-sm mb-2">使用我的完整面試準備指南：</p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="/interview-preparation-guide" 
                      className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      英文面試準備指南
                    </a>
                    <a 
                      href="/zh-tw/interview-preparation-guide" 
                      className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      中文面試準備指南
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* 提醒事項 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">提醒事項</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">該做的</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 為每個申請客製化，根據職位描述調整 2-3 個要點</li>
                <li>• 申請後跟進，5-7 天後發郵件給招募人員</li>
                <li>• 準備好解釋每個指標，面試官會問</li>
                <li>• 保持範例機密，不要提及內部專案名稱</li>
                <li>• 展現真誠熱情，參考公司具體計畫</li>
              </ul>
            </div>
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">不該做的</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• 不要在沒有客製化的情況下申請，質量大於數量</li>
                <li>• 不要誇大指標，準備好用資料支持</li>
                <li>• 不要說前雇主壞話，保持專業</li>
                <li>• 不要忽視文化適配，研究公司價值觀</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 最後想法 */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8">
            <h2 className="font-heading text-2xl text-cream mb-4">最後想法</h2>
            <p className="text-cream/90 leading-relaxed mb-4">
              您的經驗很強：您之前的履歷已經紮實，達到 90/100。呈現清晰，成就有量化。
            </p>
            <p className="text-cream/90 leading-relaxed mb-4">
              這些修改將您提升到 95/100，透過將戰術卓越連結到策略業務成果。
            </p>
            <p className="text-gold font-semibold text-lg">
              您有經驗。現在您有定位。去拿到 offer 吧。
            </p>
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

          <p className="text-muted-foreground mb-6">我希望這份審閱對加強您的申請有價值。</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
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
                <ExternalLink className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">在 Trustpilot 留下評論</h3>
              </div>
              <p className="text-sm text-muted-foreground">公開評論有助於建立可信度，幫助其他專業人士做出明智的決定。</p>
            </a>
          </div>
          
          <div className="bg-muted/30 rounded-xl p-4 border border-border mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">為什麼 Trustpilot 分數是 3.8？</span>我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。
            </p>
          </div>
        </section>

        {/* 下載 PDF */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl text-foreground mb-2">下載您的審閱報告</h2>
                <p className="text-muted-foreground text-sm">保存一份審閱報告副本供您參考</p>
              </div>
              <a
                href="/downloads/HOPE_CHEN_RESUME_REVIEW.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-executive-green text-cream rounded-xl hover:bg-executive-green/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                下載 PDF
              </a>
            </div>
          </div>
        </section>

        {/* 問題 */}
        <section className="text-center py-8">
          <p className="text-muted-foreground mb-2">對任何建議有問題或需要澄清？</p>
          <a 
            href="mailto:james@james.careers" 
            className="text-gold hover:underline font-medium"
          >
            歡迎聯繫我。我在這裡幫助您成功。
          </a>
        </section>
      </main>
    </div>
  );
};

export default HopeChenReviewZhTw;
