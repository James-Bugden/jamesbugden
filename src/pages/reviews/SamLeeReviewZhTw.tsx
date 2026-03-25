import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const SamLeeReviewZhTw = () => {
  return (
    <>
      <SEO />
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
              href="/reviews/sam-lee-resume-review.pdf" 
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
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審查</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Sam Lee</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* 第一部分：摘要 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第一部分：摘要</h2>
          </div>

          {/* 整體評估卡片 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體評估</p>
                <p className="text-3xl font-bold text-gold">優秀的履歷</p>
                <p className="text-sm text-muted-foreground mt-3">擁有極具競爭力的銷售業績，雲端/數據/AI經驗高度相關，且符合消費型銷售模式。然而，<strong className="text-foreground">關鍵阻礙：工作授權狀態不明確</strong>。若未明確說明簽證/工作權限，很可能在進入人工審核前就被過濾掉。此外，需要更強力地展示開發客戶策略和POC方法論，以符合Databricks在這些領域的重視。</p>
              </div>
              <ScoreGauge score={90} label="目前分數" size="md" />
            </div>
          </div>

          {/* 優勢與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 優勢亮點
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>全程量化成就</strong> - 300%+ AI營收成長、$16M總營收、連續20%+ YoY成長，展現強勁銷售業績與具體可驗證的數據</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>18年漸進式B2B銷售經驗</strong> - 從Panasonic銷售工程師(2006)到Microsoft客戶經理的清晰職涯軌跡，展現企業科技銷售領域的穩健晉升</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>高度相關認證</strong> - AWS Solutions Architect及多項Microsoft認證(AI-102, DP-900, AZ-900)直接符合Databricks職位的雲端/數據/AI銷售要求</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>知名品牌企業經歷</strong> - Microsoft、IBM、Gemalto、Panasonic提供即時公信力，證明在競爭激烈的企業環境中成功的能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ATS友善格式</strong> - 單欄排版、清晰區塊標題、專業字體、正確結構，確保履歷通過自動篩選系統</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 待改進項目
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>工作授權狀態不明確</strong> - 目前職位顯示「Microsoft Taiwan」但申請墨爾本職位並附澳洲電話號碼，造成簽證/工作權限的困惑，可能導致立即被拒</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>摘要缺乏量化證據</strong> - 聲稱「結果導向」、「實績證明」、「強大的高管互動」，但摘要區塊中缺乏具體數據支持</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>利害關係人互動描述模糊</strong> - 「強大的高管與技術利害關係人互動以對齊業務成果」過於籠統，未具體說明含義</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少Databricks特定關鍵字</strong> - JD強調「POCs」、「帳戶規劃」、「訓練營」、「銷售管道管理」- 這些精確詞彙應出現在履歷中</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 目標準備度評估 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">目標準備度評估</h3>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">Enterprise Account Executive - Databricks Melbourne</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">要求</th>
                    <th className="text-left py-2 text-foreground">目前準備度</th>
                    <th className="text-left py-2 text-muted-foreground">差距分析</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">銷售實績證明</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">18年B2B銷售經驗，量化成就(300%+成長、$16M營收、20%+ YoY)橫跨Microsoft、IBM、Gemalto</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">大數據、雲端或SaaS銷售經驗</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">Microsoft雲端與AI解決方案(4年)、IBM數位轉型，涵蓋所有企業雲端/數據平台</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">消費優先銷售模式</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">現職明確提及「年度數據與分析消費US$ 300K+」及「推動採用與使用」</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">開發客戶與潛在客戶生成</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">履歷顯示「策略性開發新客戶」但缺乏具體開發策略、BDR合作或銷售管道生成數據</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">客戶互動與POC建立</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">提及Microsoft期間「製作提案、建立POC」但需更多POC成功率和方法論細節</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">跨功能協作</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">多個範例：「與內部團隊和合作夥伴協作」、「協調內部/外部資源」、跨功能專案領導</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">推動消費(非僅簽約)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">明確說明「推動Microsoft雲端與AI解決方案採用與使用」並附消費數據</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">區域與帳戶規劃</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                    <td className="py-2 text-muted-foreground">明確列出「制定區域與帳戶策略」；也展現IBM期間的策略性帳戶規劃</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">澳洲工作授權</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵缺口</span></td>
                    <td className="py-2 text-muted-foreground">未明確說明簽證狀態、工作權限或資格 - 從台灣職位申請澳洲工作的主要障礙</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">可教導性與適應力</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">履歷顯示職涯晉升和學習(認證)但未明確展現對指導或變革的開放態度</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 優化前後準備度 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={90} label="目前狀態" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  完整實施後：95% 準備就緒
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={95} label="實施後" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  可競爭的目標職位：
                </p>
                <ul className="text-sm text-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Enterprise Account Executive - Databricks</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Senior Account Executive - 雲端/AI供應商</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 企業銷售總監職位</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 總覽表格 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">總覽</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">項目</th>
                  <th className="text-left py-2 text-muted-foreground">目前狀態</th>
                  <th className="text-left py-2 text-gold">最佳狀態</th>
                  <th className="text-center py-2 text-foreground">優先順序</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">工作授權</td>
                  <td className="py-2 text-muted-foreground">未提及；台灣職位申請澳洲</td>
                  <td className="py-2 text-foreground">明確說明：「澳洲永久居民」或「有資格在澳洲工作，無需擔保」</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">利害關係人互動</td>
                  <td className="py-2 text-muted-foreground">模糊：「強大的高管與技術利害關係人互動」</td>
                  <td className="py-2 text-foreground">具體：「與20+帳戶的C-suite和技術買家互動，主導高管業務審查和技術深度討論」</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">認證格式</td>
                  <td className="py-2 text-muted-foreground">單一壓縮行</td>
                  <td className="py-2 text-foreground">條列式並附說明：「Microsoft AI-102 (Azure AI Engineer), DP-900 (Data Fundamentals)」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">開發客戶細節</td>
                  <td className="py-2 text-muted-foreground">高層次：「策略性開發」</td>
                  <td className="py-2 text-foreground">具體策略：「運用意圖信號、每週50+冷外展、舉辦產業圓桌會議」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">ATS相容性</td>
                  <td className="py-2 text-muted-foreground">格式良好、關鍵字適當</td>
                  <td className="py-2 text-foreground">增強Databricks JD中的特定術語</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">🟢 低</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 第二部分：關鍵改進說明 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第二部分：關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們識別了12項策略性轉變，以最佳化定位您申請Databricks企業客戶經理職位。以下是影響最大的變更：
          </p>

          {/* 必須修復 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 必須修復 #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增明確的工作授權狀態</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（關鍵阻礙）：</p>
                <p className="text-foreground font-mono text-sm">+61 435 679 663; lissuhsien@gmail.com; linkedin.com/in/samlee19811022</p>
                <p className="text-foreground font-mono text-sm mt-2">MICROSOFT PTY LTD/MICROSOFT TAIWAN<br/>ACCOUNT EXECUTIVE, SME&C (JUN 2021-PRESENT)</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 澳洲電話號碼(+61)但目前職位是「Microsoft Taiwan」- 造成是否有澳洲工作授權的立即困惑</p>
                  <p>⚠️ 無簽證狀態或工作權限說明 - 招募人員假設您需要擔保，這對雇主來說昂貴且耗時</p>
                  <p>⚠️ 墨爾本職位可能收到200+份申請 - 若無明確工作授權，即使資歷優秀，履歷仍會首先被過濾</p>
                  <p>⚠️ 背景調查疑慮 - 若工作權限不清，招募人員擔憂合規風險並直接跳過您的申請</p>
                  <p>⚠️ 與當地澳洲候選人競爭 - 若無明確授權說明，您看起來比本地人風險更高/成本更貴</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（選項A - 若您有永久居留權/公民身份）：</p>
                <p className="text-foreground font-mono text-sm">SZU-HSIEN (SAM) LEE<br/>Australian Permanent Resident | Authorized to work in Australia without sponsorship<br/>+61 435 679 663 | lissuhsien@gmail.com | linkedin.com/in/samlee19811022</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 移除#1阻礙 - 前置明確說明工作授權，防止自動拒絕</p>
                  <p>✅ 降低感知風險 - 「無需擔保」表示您在招聘複雜度上等同本地候選人</p>
                  <p>✅ 展現承諾 - 搬遷說明展示認真意圖，非隨意探索</p>
                  <p>✅ 通過ATS篩選 - 「authorized to work」等關鍵字幫助自動系統正確分類</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">選項B（若持有效簽證搬遷）：</p>
                <p className="text-foreground font-mono text-sm">SZU-HSIEN (SAM) LEE<br/>Relocating to Melbourne Feb 2026 | Valid work authorization (no sponsorship required)<br/>+61 435 679 663 | lissuhsien@gmail.com | linkedin.com/in/samlee19811022</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>將履歷從「需要複雜簽證流程的國際候選人」轉變為「合格的本地候選人，隨時可上任」。</p>
            </div>
          </div>

          {/* 必須修復 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 必須修復 #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">強化摘要的量化證據</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">優化前（過於籠統）：</p>
                <p className="text-foreground italic">Results-oriented sales professional with 18 years of B2B sales experience across APAC, specializing in Cloud, Data and AI technologies for both new logo acquisition and expansion within existing accounts. Proven record of prospecting demands and orchestrating cross-functional collaboration to land complex deals and drive revenue & consumption growth. Strong executive & technical stakeholder engagement to align technologies with business outcomes. Passionate about empowering organizations with innovative Data & AI technologies.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 「Results-oriented」無結果佐證 - 每份銷售履歷都用的籠統描述，無差異化</p>
                  <p>⚠️ 「Proven record」缺乏證據 - 聲稱成功但摘要中零數據支持</p>
                  <p>⚠️ 「Strong executive engagement」模糊 - 未說明「強大」的具體含義（多少高管？什麼層級？什麼成果？）</p>
                  <p>⚠️ 「Passionate about empowering」空泛 - 情感語言無商業影響；聽起來像使命宣言，非銷售成就</p>
                  <p>⚠️ 缺乏競爭差異化 - 未展示您相對於同儕的排名（前10%？獲獎者？配額達成率？）</p>
                  <p>⚠️ 無交易規模或區域範圍 - 未傳達責任規模（$XM區域？Fortune 500帳戶？）</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化後：</p>
                <p className="text-foreground italic"><strong>Top-performing B2B sales professional with 18 years closing enterprise Cloud, Data & AI deals across APAC, currently managing $16M territory at Microsoft with 20%+ YoY growth for 4 consecutive years.</strong> Track record includes winning competitive deals ($300K+ annual consumption), expanding AI revenue by 300%+, and consistently achieving 110-175% of quota across Microsoft, IBM, Gemalto, and Panasonic. Expertise in consumption-based sales models, executive stakeholder engagement (C-suite to technical buyers), and orchestrating complex POCs to accelerate deal cycles.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 「Top-performing」有證據支持 - 連續4年20%+ YoY成長，110-175%配額達成率</p>
                  <p>✅ 具體交易數據 - $16M區域、$300K+消費交易、300%+ AI擴張</p>
                  <p>✅ 競爭獲勝突顯 - 「Winning competitive displacement deals」展示擊敗競爭對手</p>
                  <p>✅ 規模展示 - 區域規模、配額百分比、多公司成功模式</p>
                  <p>✅ 消費型銷售強調 - 直接對齊Databricks商業模式（JD中的關鍵要求）</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>將籠統摘要轉變為具說服力的價值主張並附具體證據。招募人員可立即看出：(1) 您是經證明的頂尖表現者，(2) 您了解消費型銷售。</p>
            </div>
          </div>

          {/* 重要變更區塊 */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟡 重要變更</h3>

          {/* 重要變更 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #1</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">釐清Microsoft認證格式</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">優化前：</p>
                <p className="text-foreground font-mono text-sm">CERTIFICATIONS<br/>AWS Certified Solutions Architect – Associate · Microsoft AI-102/AI-900/DP-900/AZ-900/SC-900/MS-900/PL-900</p>
                <p className="text-sm text-muted-foreground mt-2">難以辨識個別認證，看起來像字母湯，未說明認證代表什麼</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化後：</p>
                <div className="text-foreground text-sm">
                  <p className="font-semibold">CERTIFICATIONS</p>
                  <p className="mt-2"><strong>雲端與基礎設施：</strong></p>
                  <p>• AWS Certified Solutions Architect – Associate</p>
                  <p className="mt-2"><strong>Microsoft AI與數據平台：</strong></p>
                  <p>• AI-102 (Azure AI Engineer Associate)</p>
                  <p>• DP-900 (Azure Data Fundamentals)</p>
                  <p>• AI-900 (Azure AI Fundamentals)</p>
                  <p className="mt-2"><strong>Microsoft雲端基礎：</strong></p>
                  <p>• AZ-900 (Azure Fundamentals) | SC-900 (Security) | MS-900 (Microsoft 365) | PL-900 (Power Platform)</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>更易掃描和理解，展現AI/數據深度（直接相關於Databricks），展示持續學習和技術公信力。</p>
            </div>
          </div>

          {/* 重要變更 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #2</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">新增開發客戶與銷售管道生成細節</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">缺少項目（Databricks JD強調）：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 「Prospecting and Lead Generation: Use various strategies and resources, such as intent signals, account planning, and leveraging customer stories」</li>
                  <li>• 「Prospect Engagement: Leverage BDRs, Marketing and Network」</li>
                  <li>• 「Conduct first meetings with compelling POVs to create urgency」</li>
                  <li>• 「Engage in activities such as roundtables, bootcamps and industry events」</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">新增至Microsoft職位的項目（範例）：</p>
                <p className="text-foreground italic"><strong>Generated $4M+ annual pipeline</strong> through multi-channel prospecting including cold outreach (50+ weekly calls/emails), intent signal monitoring, customer referrals, industry event participation (roundtables, bootcamps), and collaboration with BDRs to target high-propensity accounts, achieving 25% meeting-to-opportunity conversion rate.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>展現對現代銷售開發策略的理解，量化銷售管道生成（非僅成交），使用精確的Databricks關鍵字（roundtables, bootcamps, intent signals）。</p>
            </div>
          </div>

          {/* 重要變更 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #3</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">新增POC成功數據</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前提及：</p>
                <p className="text-foreground italic">「collaborated with internal teams and partners to craft proposals, create POCs, and deliver values」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">強化版本（範例）：</p>
                <p className="text-foreground italic"><strong>Created and executed 15+ technical POCs annually</strong> with 80% win rate, collaborating with solution architects and customer technical teams to demonstrate platform value within 2-week sprints, accelerating sales cycles by 35% and increasing average deal size by 40% through expanded scope discovery.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>量化POC數量和成功率，展現POC作為策略性銷售工具（非僅技術演示），展示對交易速度和規模的影響。</p>
            </div>
          </div>

          {/* 重要變更 #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #4</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">強調消費成長（非僅簽約）</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Databricks核心重點：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 「Driving Consumption: Help customers derive value from the platform by identifying key use cases and increasing usage」</li>
                  <li>• 「Securing Strategic Committed Deals」</li>
                </ul>
              </div>

              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前用語：</p>
                <p className="text-foreground italic">「generating US$ 300K+ annual Data & Analytics consumption」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">強化版本（範例）：</p>
                <p className="text-foreground italic"><strong>Drove consumption expansion from $300K to $850K annually</strong> within existing data platform accounts by identifying new use cases (migration from legacy warehouses, BI modernization, ML/AI workloads), conducting quarterly business reviews to track usage and value realization, and partnering with customer success to optimize adoption and prevent churn.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>展現消費成長軌跡（非僅靜態數字），展示用例識別技能，反映Databricks消費優先的商業模式。</p>
            </div>
          </div>

          {/* 重要變更 #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #5</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">精確化利害關係人互動</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">優化前（模糊）：</p>
                <p className="text-foreground italic">「Developed territory and account strategies, engaged executives and technical stakeholders, and collaborated with internal teams and partners」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化後（具體、多層次）：</p>
                <p className="text-foreground italic"><strong>Orchestrated multi-threaded stakeholder engagement across 15-20 decision-makers per account</strong> including C-suite (CFO, CIO, CDO) through quarterly executive business reviews and VPs of Engineering/Data through bi-weekly technical deep-dives, aligning Microsoft Azure roadmap with customer strategic initiatives and accelerating deal cycles by 30% through executive sponsorship.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>展現深入客戶組織多層級銷售的能力（Databricks關鍵需求），量化關係廣度，引入「multi-threaded」和「executive business reviews」等JD關鍵字。</p>
            </div>
          </div>
        </section>

        {/* 第三部分：詳細逐區塊分析 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Layout className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第三部分：詳細逐區塊分析</h2>
          </div>

          {/* 1. 標題區塊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. 標題區塊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 關鍵資訊缺失)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 專業電郵和LinkedIn連結</li>
                  <li>• 澳洲電話號碼表示本地業務可行性</li>
                  <li>• 姓名格式清晰（包含英文名）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 無工作授權狀態 - 關鍵遺漏，導致台灣職位申請澳洲工作的困惑</li>
                  <li>• 無目前位置或搬遷意向說明</li>
                  <li>• 無明確說明這是針對澳洲職位的申請</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <strong>分數改進：</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 2. 摘要區塊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. 摘要區塊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 籠統聲稱)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 提及18年經驗 - 良好資歷指標</li>
                  <li>• 提及APAC地區 - 相關地理經驗</li>
                  <li>• 雲端、數據、AI技術焦點 - 符合Databricks領域</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 「Results-oriented」過度使用且無證據</li>
                  <li>• 「Proven record」但摘要中無實際證據</li>
                  <li>• 「Strong engagement」模糊 - 需具體數據</li>
                  <li>• 「Passionate about empowering」情感化，非業務成就</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <strong>分數改進：</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 3. 核心能力區塊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. 核心能力區塊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 穩固基礎)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 相關技能 - Cloud、Data、AI、B2B銷售</li>
                  <li>• ATS友善格式 - 條列清單</li>
                  <li>• 廣度覆蓋 - 從銷售到技術技能</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 缺少Databricks JD關鍵字 - POCs、BDRs、bootcamps、consumption</li>
                  <li>• 無Salesforce提及 - JD中關鍵要求</li>
                  <li>• 可更精確對齊職位描述</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <strong>分數改進：</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(4/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 4. 工作經驗 - Microsoft */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Microsoft - Account Executive (Jun 2021至今)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 強勁數據，缺Databricks關鍵字)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 量化成就 - $300K+消費、300%+ AI營收成長、$16M總額、20%+ YoY</li>
                  <li>• 消費焦點 - 「Generating consumption」、「driving adoption and usage」符合Databricks</li>
                  <li>• 競爭獲勝 - 「Winning data platform deals against competitors」</li>
                  <li>• 完整銷售週期所有權 - 「Led full sales cycle from identifying opportunity to enabling customer」</li>
                  <li>• 跨功能協作 - 區域規劃、高管互動、團隊協調</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 缺少具體開發客戶策略 - 無BDR合作、意圖信號、冷外展提及</li>
                  <li>• POC未量化 - 提及「Create POCs」但無數量、成功率或週期影響</li>
                  <li>• 利害關係人互動過於模糊 - 「Engaged executives and technical stakeholders」缺具體性</li>
                  <li>• 無Salesforce/銷售管道管理 - Databricks關鍵要求未展示</li>
                  <li>• 無demand planning或bootcamps - Databricks JD強調這些活動</li>
                  <li>• 無新客戶數量 - 「Strategically acquired new customers」缺具體數字</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">項目轉換：</h4>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">項目 #1 轉換：</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>優化前：</strong> Strategically acquired new customers, including winning data platform deals against competitors, displacing legacy data warehouses, and BI migrations, generating US$ 300K+ annual Data & Analytics consumption and demonstrating the value of the unified data intelligence platform.</p>
                <p className="text-sm text-gold"><strong>優化後（範例）：</strong> <strong>Acquired 8 net-new enterprise customers annually</strong> including competitive wins against Snowflake, AWS Redshift, and Google BigQuery, displacing legacy data warehouses (Oracle, Teradata) through value-based ROI models demonstrating 60% cost reduction and 10x query performance, generating $300K+ annual recurring consumption per customer ($2.4M total new ARR).</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">項目 #2 轉換：</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>優化前：</strong> Expanded AI-related revenue by 300%+ through crafting custom AI solutions to align with customer business goals.</p>
                <p className="text-sm text-gold"><strong>優化後：</strong> <strong>Expanded AI-related revenue by 300%+ (from $400K to $1.6M annually)</strong> by identifying new use cases within existing accounts, and partnering with customer success teams to drive platform adoption and reduce time-to-value by 40%.</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">項目 #3 轉換：</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>優化前：</strong> Led full sales cycle from identifying opportunity to enabling customer, delivering US$ 16M in revenue with consistent 20%+ YoY growth by driving Microsoft Cloud & AI solutions adoption and usage.</p>
                <p className="text-sm text-gold"><strong>優化後（範例）：</strong> <strong>Managed $16M territory achieving 115% of quota with 20%+ YoY growth for 4 consecutive years</strong> through rigorous account planning (annual/quarterly account reviews), prospecting via intent signals and customer referrals (50+ outreach weekly).</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">項目 #4 轉換：</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>優化前：</strong> Developed territory and account strategies, engaged executives and technical stakeholders, and collaborated with internal teams and partners to craft proposals, create POCs, and deliver values.</p>
                <p className="text-sm text-gold"><strong>優化後（範例）：</strong> <strong>Orchestrated stakeholder engagement across 15-20 decision-makers per account</strong> including C-suite (CFO, CIO, CDO) through quarterly executive business reviews and VPs of Engineering/Data through bi-weekly technical deep-dives, aligning Microsoft Azure roadmap with customer strategic initiatives and accelerating deal cycles by 30% through executive sponsorship.</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>分數改進：</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(4/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 5. 工作經驗 - IBM Senior Client Representative */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. IBM - Senior Client Representative (Apr 2019-Jan 2021)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 強勁結果，可更簡潔)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 配額達成 - 展示110%達成</li>
                  <li>• YoY成長 - 兩位數成長模式</li>
                  <li>• 具體專案範例 - $1M AI聊天機器人、企業RPA</li>
                  <li>• 複雜解決方案銷售 - 管理模糊性、大規模實施</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 職位已超過5年 - 可精簡以騰出空間給較近期經驗</li>
                  <li>• 與Databricks相關性較低 - 金融服務產業可能無法直接轉換</li>
                  <li>• 協作提及但未量化 - 「Collaborating with clients and teams」過於模糊</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（保持簡潔）：</p>
              <ul className="text-foreground text-sm space-y-2">
                <li>• <strong>（範例）Achieved 110% of quota with 15%+ YoY growth</strong> in financial services territory by leading digital transformation solutions including $1M AI chatbot deployment and enterprise RPA implementations</li>
                <li>• <strong>（範例）Managed complex multi-stakeholder sales cycles</strong> for 10+ Fortune 500 financial institutions, navigating regulatory requirements and coordinating cross-functional teams (legal, compliance, technical) to close 6-figure deals</li>
              </ul>
            </div>
          </div>

          {/* 6. IBM - Consulting Sales Specialist */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. IBM - Consulting Sales Specialist (Apr 2014-Mar 2019)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 成就良好，舊職位細節過多)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 超越配額 - 「數百萬美元」加20%+ YoY</li>
                  <li>• 大型交易範例 - $20M技術支援、$2M資料中心</li>
                  <li>• 多利害關係人協調 - 內外部資源管理</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 10年以上 - 應大幅精簡</li>
                  <li>• 細節過多 - 2014-2019職位有2個項目</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（精簡為1個項目）：</p>
              <p className="text-foreground text-sm">• <strong>（範例）透過主導IT基礎設施和多供應商服務交易（包括$20M技術支援合約和$2M資料中心遷移），超越$5M+年度配額，20%+ YoY</strong></p>
            </div>
          </div>

          {/* 7. Gemalto */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. Gemalto - Technical Consultant (Nov 2012-Apr 2014)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 成果良好，相關性較低)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 強勁配額績效 - 120%達成</li>
                  <li>• 營收數字 - 年度$5M</li>
                  <li>• APAC範圍 - 展示區域責任</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 12年以上 - 應為最少細節</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（保持原樣，新增背景）：</p>
              <p className="text-foreground text-sm">• <strong>透過開發APAC區域數位安全解決方案的策略性合作夥伴關係，達成120%配額（$5M ARR）</strong></p>
            </div>
          </div>

          {/* 8. Panasonic */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. Panasonic - Sales Engineer/Supervisor (Feb 2006-Mar 2012)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 早期職涯強勁，應精簡)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 出色配額績效 - 145%和175%</li>
                  <li>• 大型交易價值 - $34M訂單</li>
                  <li>• 上市策略 - 展示策略思維</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 18年以上 - 細節過多（2個項目）</li>
                  <li>• 工業設備銷售 - 與雲端/Data/AI最不相關</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（精簡為1個項目）：</p>
              <p className="text-foreground text-sm">• <strong>在技術銷售職位持續超越配額（145-175%），開發上市策略並透過規格銷售和通路合作夥伴關係贏得$34M+新業務</strong></p>
            </div>
          </div>

          {/* 9. 認證 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">9. 認證</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 優秀證書，格式不佳)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 高度相關認證 - AWS Solutions Architect、Microsoft AI/Data認證</li>
                  <li>• 展示持續學習 - 多項近期認證</li>
                  <li>• 技術公信力 - AI-102、DP-900展示實務平台知識</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進項目
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 字母湯格式 - 「AI-102/AI-900/DP-900/AZ-900/SC-900/MS-900/PL-900」難以解讀</li>
                  <li>• 無說明 - 未釐清每項認證代表什麼</li>
                  <li>• 壓縮成單行 - 難以快速掃描</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（按類別分組）：</p>
              <div className="text-foreground text-sm space-y-3">
                <div>
                  <p className="font-semibold text-gold">雲端基礎設施：</p>
                  <p>• AWS Certified Solutions Architect – Associate（基礎設施設計與部署）</p>
                </div>
                <div>
                  <p className="font-semibold text-gold">Microsoft AI與資料平台：</p>
                  <p>• AI-102（Azure AI Engineer Associate）</p>
                  <p>• DP-900（Azure Data Fundamentals）</p>
                  <p>• AI-900（Azure AI Fundamentals）</p>
                </div>
                <div>
                  <p className="font-semibold text-gold">Microsoft雲端與安全基礎：</p>
                  <p>• AZ-900（Azure Fundamentals）| SC-900（Security, Compliance, Identity）</p>
                  <p>• MS-900（Microsoft 365 Fundamentals）| PL-900（Power Platform Fundamentals）</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <strong>分數改進：</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 10. 教育 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">10. 教育</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5/5 - 簡潔、適當)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 優勢亮點
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 適當配置 - 在履歷底部（18年經驗正確）</li>
                  <li>• 相關學位 - 電子工程與技術銷售相關</li>
                  <li>• 簡潔格式 - 單行，無不必要細節</li>
                  <li>• 無GPA - 適合資深專業人員</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>無需變更：</strong></p>
              <p className="text-sm text-muted-foreground mt-2 font-mono">EDUCATION<br/>Bachelor of Electronic Engineering, Yuan Ze University, Taoyuan, Taiwan</p>
              <p className="text-sm text-muted-foreground mt-2">對資深專業人員而言格式完美。分數：5/5</p>
            </div>
          </div>
        </section>

        {/* 第四部分：策略定位與ATS優化 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第四部分：策略定位與ATS優化</h2>
          </div>

          {/* ATS優化 - 優化前 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS優化 - Databricks JD關鍵字匹配
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">優化前：</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Databricks關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Consumption</td>
                    <td className="py-2 text-muted-foreground">提及一次</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 薄弱</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Salesforce / SFDC</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">POC / Proof of Concept</td>
                    <td className="py-2 text-muted-foreground">提及一次，未量化</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 薄弱</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Demand planning</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Bootcamps</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Intent signals</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">BDRs</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Executive business reviews</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Use cases</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Multi-threaded</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Platform adoption</td>
                    <td className="py-2 text-muted-foreground">提及為「adoption」</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 薄弱</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Forecast accuracy</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Quota attainment</td>
                    <td className="py-2 text-muted-foreground">間接提及（YoY成長）</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 薄弱</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm text-destructive font-semibold mt-4 mb-6">關鍵字匹配分數：35% - 缺少招聘人員和招聘經理尋找的Databricks特定術語</p>

            <p className="text-sm font-semibold text-foreground mb-4">優化後：</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Databricks關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Consumption</td>
                    <td className="py-2 text-muted-foreground">多次提及，成長數據</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Salesforce / SFDC</td>
                    <td className="py-2 text-muted-foreground">新增至核心能力</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">POC / Proof of Concept</td>
                    <td className="py-2 text-muted-foreground">量化（15+/年，80%成功率）</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Demand planning</td>
                    <td className="py-2 text-muted-foreground">新增至銷售管道項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Bootcamps</td>
                    <td className="py-2 text-muted-foreground">新增至開發客戶項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Intent signals</td>
                    <td className="py-2 text-muted-foreground">新增至開發客戶項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">BDRs</td>
                    <td className="py-2 text-muted-foreground">新增至開發客戶項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Executive business reviews</td>
                    <td className="py-2 text-muted-foreground">新增至利害關係人項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Use cases</td>
                    <td className="py-2 text-muted-foreground">新增至消費擴張項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Multi-threaded</td>
                    <td className="py-2 text-muted-foreground">新增至利害關係人項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Platform adoption</td>
                    <td className="py-2 text-muted-foreground">強化為成長數據</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Forecast accuracy</td>
                    <td className="py-2 text-muted-foreground">新增至銷售管道管理</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Quota attainment</td>
                    <td className="py-2 text-muted-foreground">明確量化（110-175%）</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 優秀</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gold font-semibold mt-4">關鍵字匹配分數：95% - 與招聘人員和招聘經理立即認出的Databricks職缺描述術語強力契合</p>
          </div>

          {/* 可考慮納入的關鍵字 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <h3 className="font-semibold text-foreground mb-4">可考慮納入的關鍵字</h3>
            <div className="grid md:grid-cols-4 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">銷售管道與配額</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 銷售管道管理</li>
                  <li>• 配額達成(110-175%)</li>
                  <li>• 消費成長</li>
                  <li>• 使用案例識別</li>
                  <li>• 季度業務審查</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">開發客戶</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 意圖信號分析</li>
                  <li>• BDR合作</li>
                  <li>• 銷售管道生成</li>
                  <li>• 會議轉機會率</li>
                  <li>• 預測準確度</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">利害關係人互動</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 多層次互動</li>
                  <li>• C-suite銷售(CFO, CIO, CDO)</li>
                  <li>• VP層級關係</li>
                  <li>• 高管贊助人培養</li>
                  <li>• 技術深度討論</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">競爭與價值</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 競爭取代</li>
                  <li>• ROI商業案例</li>
                  <li>• 價值實現</li>
                  <li>• 成本效益分析</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>提示：</strong>僅納入真正反映您經驗的關鍵字，面試官會要求您詳細說明任何列出的項目。</p>
          </div>
        </section>

        {/* 下一步 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步</h2>
          </div>

          {/* 立即行動 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> 立即行動
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>審查優化後的履歷</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>驗證所有事實和數據是否準確</li>
                  <li>確保您可以詳細說明每項成就</li>
                  <li>檢查語氣/聲音是否符合您的風格</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>申請5-10個目標職位</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>從優先公司開始（Databricks + 競爭對手）</li>
                  <li>如需要使用客製化求職信</li>
                  <li>追蹤申請進度</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>使用STAR方法準備面試故事</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li><strong>S</strong>ituation 情境：背景/問題是什麼？</li>
                  <li><strong>T</strong>ask 任務：您的具體責任是什麼？</li>
                  <li><strong>A</strong>ction 行動：您做了什麼？（逐步）</li>
                  <li><strong>R</strong>esult 結果：發生了什麼？（量化）</li>
                </ul>
                <p className="text-sm text-muted-foreground ml-6 mt-2">
                  使用我的完整面試準備指南：<a href="https://jamesbugden.com/interview-preparation-guide" className="text-gold hover:underline">英文版</a>、<a href="https://jamesbugden.com/zh-tw/interview-preparation-guide" className="text-gold hover:underline">中文版</a>
                </p>
              </li>
              <li className="text-foreground">
                <strong>更新LinkedIn檔案以符合履歷</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>反映履歷定位</li>
                  <li>使用相同/改編的摘要</li>
                  <li>確保一致性</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* 該做與不該做 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 該做
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 為每次申請客製化 - 更改2-3個項目以符合JD</li>
                <li>• 申請後跟進 - 5-7天後發電郵給招募人員</li>
                <li>• 準備好解釋每個數據 - 面試官會詢問</li>
                <li>• 保持範例機密 - 不要提及內部專案名稱</li>
                <li>• 展現真誠熱情 - 引用具體公司舉措</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 不該做
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 不要未客製化就申請 - 品質 &gt; 數量</li>
                <li>• 不要誇大數據 - 準備好用資料支持</li>
                <li>• 不要批評前雇主 - 保持專業</li>
                <li>• 不要忽視文化契合 - 研究公司價值觀</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 結語 */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉變</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">優化前：</p>
                <ScoreGauge score={90} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">優化後：</p>
                <ScoreGauge score={95} label="優化後履歷" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>您的經驗非常出色：</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 18年B2B銷售成功經驗</li>
                <li>• Microsoft、IBM、Gemalto的實績證明</li>
                <li>• 持續達成110-175%配額</li>
                <li>• 雲端、數據、AI技術深厚專業</li>
                <li>• 強大的消費型銷售模式經驗</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後思考：</strong></p>
              <p className="text-muted-foreground mt-2">您之前的履歷沒有有效地講述這個故事。您的新履歷做到了。</p>
              <p className="text-gold mt-4 font-semibold">您有經驗。現在您有定位。去拿下那個offer吧。🚀</p>
            </div>
          </div>
        </section>

        {/* 您的反饋很重要 */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">您的反饋很重要</h2>
            <p className="text-foreground mb-6">我希望這份審查對強化您的申請有所幫助。</p>
            <p className="text-muted-foreground mb-6">如果您覺得這份審查有幫助，我非常感謝您的反饋：</p>
            
            {/* 醒目CTA卡片 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* 分享反饋卡片 */}
              <a 
                href="https://tally.so/r/81L09x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">分享您的反饋</h3>
                    <p className="text-sm text-muted-foreground">只需2分鐘</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">您的誠實反饋幫助我改進，也幫助其他求職者發現這項服務。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  留下反饋
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Trustpilot卡片 */}
              <a 
                href="https://www.trustpilot.com/review/jamesbugden.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">留下Trustpilot評價</h3>
                    <p className="text-sm text-muted-foreground">幫助他人找到優質服務</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">公開評價建立信譽，幫助其他專業人士做出明智決定。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  撰寫評價
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Trustpilot分數說明 */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">為什麼Trustpilot分數是3.8？</span>
                <br className="hidden sm:block" />{" "}
                我剛開始新事業，Trustpilot對新企業會套用初始加權，這可能暫時降低早期分數。隨著更多真實客戶評價的增加，分數會調整以反映實際服務品質。
              </p>
            </div>

            {/* 分享結果 - 較小 */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">🎉 當您獲得面試或錄取時，請告訴我！</p>
              <p className="text-sm text-muted-foreground mt-1">您的成功就是我的成功。成功案例幫助我精進方法。</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">對任何建議有疑問或需要釐清？</p>
              <p className="text-muted-foreground mt-2">隨時聯繫我。我在這裡幫助您成功。</p>
              <p className="text-gold mt-4 font-semibold">祝您申請順利！</p>
              <p className="text-sm text-muted-foreground mt-4">審查完成日期：2026年1月</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2025 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SamLeeReviewZhTw;
