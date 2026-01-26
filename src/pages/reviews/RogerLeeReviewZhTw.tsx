import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const RogerLeeReviewZhTw = () => {
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
              href="/reviews/roger-lee-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Roger Lee</h1>
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
                <p className="text-3xl font-bold text-gold">內容紮實，呈現待加強</p>
                <p className="text-sm text-muted-foreground mt-3">產品管理和 GTM 經驗紮實，具有量化成就和相關 MBA 學歷。然而，<strong className="text-foreground">關鍵阻礙：工作許可狀態完全不清楚</strong>。沒有明確的 F-1 OPT 或簽證聲明，國際 MBA 候選人通常在人工審查前就被過濾掉。此外，履歷呈現問題（無摘要、過於密集、教育區塊不聚焦）降低了競爭激烈的 MBA 後招聘中的有效性。</p>
              </div>
              <ScoreGauge score={80} label="目前分數" size="md" />
            </div>
          </div>

          {/* 優勢與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現優異之處
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>全程量化成就</strong> - 30% 成本節省、20% 銷量增加、$6M 營收創造、80K+ 單位銷售，展示跨多角色的強大業務影響力與具體可驗證指標</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>6 年以上漸進式產品/GTM 經驗</strong> - 從產品經理（2017）到目前 MBA 候選人並具有策略合作夥伴實習的清晰職涯軌跡，顯示在 B2B 科技和消費電子領域的進步</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的數據驅動決策</strong> - 多個市場分析、競爭研究和 ROI 商業案例範例，展示 MBA 後角色重視的分析能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>UCLA Anderson MBA 並具領導角色</strong> - 目前 MBA 候選人（2026 年 6 月畢業）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>乾淨 ATS 友善格式</strong> - 單欄版面、清晰區塊標題、專業字體和適當結構</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 待改進之處
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少專業摘要</strong> - 沒有快速概述建立 MBA 候選人 + 產品/GTM 背景 + 目標角色，迫使招聘人員從分散的區塊拼湊您的故事</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>無美國工作許可聲明</strong> - 國際 MBA 學生的關鍵阻礙；沒有明確的簽證狀態或公民身份指示，履歷可能被 90%+ 雇主立即過濾</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>資訊過載 - 共 16 個項目</strong> - 對於履歷僅獲得 6-8 秒掃描的 MBA 後招聘來說過於密集；應最多 10-12 個項目以獲得最佳可讀性</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>教育區塊不聚焦</strong> - 籃球隊隊長和社團成員（電玩商業、科技商業）與商業角色無關；浪費寶貴空間</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技能區塊臃腫且不清楚</strong> - 混合軟體工具卻無熟練度等級，包含預設技能（MS Office、Google Suite）和不相關興趣（健行、籃球迷）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>無清楚的目標角色定位</strong> - 履歷未明確說明是否目標產品管理、業務開發、策略顧問或其他 MBA 後路徑</span>
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

            <p className="text-sm font-semibold text-foreground mb-4">MBA 後產品管理角色 - 科技公司（Microsoft、Google、Amazon）</p>
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
                    <td className="py-2 text-foreground">產品策略與路線圖開發</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">ASUS 角色顯示「定義產品定位、客戶訊息和 GTM 策略」導致 $6M 營收和 20% 銷量增加</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">跨職能領導</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">多個範例：協調 10+ 國家發布，管理跨產品/工程/銷售團隊的利害關係人期望</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">數據驅動決策</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">市場分析、競爭基準、ROI 計算在經歷中明顯（30% 成本節省，$200-300M 機會市場規模）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">GTM 執行</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">桌上型專案發布（80K+ 單位、$28M 營收）、跨 10 國教育產品路線圖顯示強大 GTM 能力</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">目標學校 MBA</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">UCLA Anderson（M7 鄰近專案）2026 年 6 月畢業，目前在學並具領導角色</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">工作許可清晰度</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                    <td className="py-2 text-muted-foreground">無明確的 F-1 OPT 資格、簽證狀態或工作許可聲明 - 導致自動拒絕的主要阻礙</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">履歷可掃描性</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">16 個項目過於密集；缺少專業摘要；教育區塊有不相關細節不聚焦</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">技術能力</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">認證顯示技術基礎，但未提供熟練度等級或背景</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* 前後準備度 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={80} label="目前狀態" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  完全實施後：95% 準備就緒
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={95} label="實施後" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  強面試表現後可以目標的角色：
                </p>
                <ul className="text-sm text-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 產品經理 - 科技公司（Microsoft、Google、Amazon、Meta）</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 產品行銷經理 - GTM 策略與定位</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 策略與業務營運 - 財星 500 輪調專案</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 業務開發經理 - 雲端/SaaS 合作夥伴</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 概覽表格 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">概覽</h3>
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
                  <td className="py-2 text-foreground font-semibold">工作許可</td>
                  <td className="py-2 text-muted-foreground">未提及</td>
                  <td className="py-2 text-foreground">明確聲明：「F-1 visa with 3-year STEM OPT authorization (no sponsorship required until 2029)」</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">專業摘要</td>
                  <td className="py-2 text-muted-foreground">完全缺失</td>
                  <td className="py-2 text-foreground">摘要：學校 + 背景 + 成就 + 目標 + 工作狀態</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">項目總數</td>
                  <td className="py-2 text-muted-foreground">16 個項目（過於密集）</td>
                  <td className="py-2 text-foreground">10-12 分配：OPSERA-3、ASUS Regional-2、EcloudValley-2、ASUS PM-3</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">教育區塊</td>
                  <td className="py-2 text-muted-foreground">籃球、社團過於雜亂</td>
                  <td className="py-2 text-foreground">清潔：MBA 優先，僅相關專案/獎學金，移除運動/社團</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">技能區塊</td>
                  <td className="py-2 text-muted-foreground">臃腫：MS Office、健行、籃球</td>
                  <td className="py-2 text-foreground">精簡至 3 行：認證、技術工具、語言</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">目標角色清晰度</td>
                  <td className="py-2 text-muted-foreground">不清楚尋求什麼角色</td>
                  <td className="py-2 text-foreground">摘要明確說明「seeking Product Management roles at tech companies」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">長度</td>
                  <td className="py-2 text-muted-foreground">1 頁（適當）</td>
                  <td className="py-2 text-foreground">優化 1 頁，關鍵資訊突出</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">🟢 低</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 結語 */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉型</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">之前：</p>
                <ScoreGauge score={80} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">之後：</p>
                <ScoreGauge score={95} label="優化履歷" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>您的經驗卓越：</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 7 年以上產品管理和業務開發成功經驗</li>
                <li>• 在 ASUS、Whirlpool 和快速成長新創公司的經證實記錄</li>
                <li>• 跨消費電子、家電和 SaaS 的多個產品發布</li>
                <li>• 跨職能領導、市場策略和 GTM 執行的深厚專業知識</li>
                <li>• 競爭分析、使用者研究和數據驅動決策的堅實基礎</li>
                <li>• UCLA Anderson MBA（2026 年 6 月）- 定位您獲得頂級 PM 和 BD 角色</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後思考：</strong></p>
              <p className="text-muted-foreground mt-2">您之前的履歷沒有有效講述這個故事。您的新履歷做到了。</p>
              <p className="text-gold mt-4 font-semibold">您有經驗。您有目標學校的 MBA。現在您有定位。去拿下 offer 吧。🚀</p>
            </div>
          </div>
        </section>

        {/* 您的意見回饋很重要 */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">您的意見回饋很重要</h2>
            <p className="text-foreground mb-6">我希望這份審查對加強您的申請有所幫助。</p>
            <p className="text-muted-foreground mb-6">如果您覺得這份審查有幫助，我將非常感謝您的意見回饋：</p>
            
            {/* 醒目 CTA 卡片 */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
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
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">分享您的意見回饋</h3>
                    <p className="text-sm text-muted-foreground">只需 2 分鐘</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">您的誠實意見回饋幫助我改進，並幫助其他求職者發現這項服務。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  留下意見回饋
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

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
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">留下 Trustpilot 評論</h3>
                    <p className="text-sm text-muted-foreground">幫助他人找到優質服務</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">公開評論建立信譽，幫助其他專業人士做出明智決定。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  撰寫評論
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">為何 Trustpilot 分數是 3.8？</span>
                <br className="hidden sm:block" />{" "}
                我剛開始創業，Trustpilot 對新企業套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的新增，分數會調整以反映實際服務品質。
              </p>
            </div>

            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">🎉 當您獲得面試或 offer 時，請告訴我！</p>
              <p className="text-sm text-muted-foreground mt-1">您的勝利就是我的勝利。成功故事幫助我改進方法。</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">有問題或需要對任何建議進行澄清？</p>
              <p className="text-muted-foreground mt-2">歡迎聯繫。我在這裡幫助您成功。</p>
              <p className="text-gold mt-4 font-semibold">祝您 MBA 招聘順利，恭喜您的 UCLA Anderson 旅程！</p>
              <p className="text-sm text-muted-foreground mt-4">審查完成：2026 年 1 月</p>
              <p className="text-sm text-muted-foreground">客戶：Roger Lee | 目標角色：產品管理 - MBA 後（科技公司）</p>
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

export default RogerLeeReviewZhTw;
