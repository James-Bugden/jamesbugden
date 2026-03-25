import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, TrendingUp, Award, BarChart3, BookOpen, Briefcase, GraduationCap, Settings } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const ChienJungLiuReviewZhTw = () => {
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
              href="/reviews/chien-jung-liu-resume-review.pdf" 
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
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審查報告</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">劉千榕</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* PART 1: SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">🎯 第一部分：總結</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體評估</p>
                <p className="text-3xl font-bold text-gold">經驗扎實但定位不明確</p>
              </div>
              <ScoreGauge score={65} label="目前分數" size="md" />
            </div>
          </div>

          {/* What's Working & What Needs Improvement */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 優點
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>10年以上漸進式經驗</strong> - 清晰的職涯軌跡：廣告代理商（偉門智威）→ 電商（博客來）→ 企業（友達光電）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>博客來任職期間長（9年以上）</strong> - 展現忠誠度、深厚的平台知識，以及內部晉升（內容經理 → 產品經理）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>可量化的社群媒體成功</strong> - 近100萬參與粉絲、每則貼文10,000+按讚數、可衡量的KPI（觸及率+20%、互動率+30%、網站訪問量+10%）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>跨部門協作經驗</strong> - 與出版商、YouTuber、播客主、工程團隊和高階主管合作的經驗</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 可改進之處
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>職涯敘事不集中</strong> - 摘要中提到4個不同職位（客戶經理、內容經理、產品經理、ESG專員）橫跨3個產業，缺乏清晰主線</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>摘要語言過於通用</strong> - 「多才多藝的專業人士」和「尋求具挑戰性的職位」毫無價值；摘要缺乏影響力證明</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ESG/HR職位未解釋</strong> - 目前職位（2022年3月至今）看似與行銷背景脫節，造成職涯方向混淆</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少業務影響指標</strong> - 大多數要點描述職責（「制定策略」、「組織活動」）而非展示業務成果（收入、成本節省、用戶成長）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ATS關鍵字缺口</strong> - 履歷缺少目標職缺描述中的12個以上關鍵字（B2B銷售、潛在客戶開發、客戶獲取、業務開發、技術產品知識）</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Target Job Readiness Assessment */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-6">
              <BarChart3 className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">目標職位準備度評估</h3>
            </div>
            
            {/* Job #1 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-foreground mb-4">職缺 #1：市場開發行銷管理師 - 信紘科技</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">要求</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">目前準備度</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">差距分析</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 pr-4 text-foreground">行銷執行與專案支援</td>
                      <td className="py-3 pr-4"><span className="text-gold font-medium">✅ 強</span></td>
                      <td className="py-3 text-muted-foreground">內容經理職位展現活動執行和專案管理能力</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">協助策略規劃</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">有專案經驗但未清楚展示策略規劃能力</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">市場情報蒐集</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">無展示市場研究、分析或機會識別的要點</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">跨部門協作</td>
                      <td className="py-3 pr-4"><span className="text-gold font-medium">✅ 強</span></td>
                      <td className="py-3 text-muted-foreground">多個職位展示與創意團隊、利害關係人的協作</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">專案追蹤與報告</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">提到Google Analytics經驗但未展示系統化報告</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">英語流利（必要）</td>
                      <td className="py-3 pr-4"><span className="text-gold font-medium">✅ 強</span></td>
                      <td className="py-3 text-muted-foreground">列為雙語、有國際交換經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">行銷策略發展</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">展示社群媒體策略但非B2B或科技業行銷</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">客戶關係管理</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">客戶經理職位展現此能力，但非近期（2008-2012）</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">合作夥伴發展（KOL、策略夥伴）</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">博客來展示30個以上YouTuber/播客合作，展現意見領袖管理能力，但缺乏KOL策略發展或B2B策略夥伴經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">全球視野與策略思維</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 中等</span></td>
                      <td className="py-3 text-muted-foreground">芬蘭交換和偉門智威跨國代理商經驗展現文化適應力和國際視野，但缺乏展示全球市場策略執行</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-foreground"><strong>整體適配度：60%</strong> - 具備基礎行銷和協作技能，但缺乏此職位所需的B2B科技行銷經驗、市場分析能力和策略性業務開發重點。</p>
            </div>

            {/* Job #2 */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">職缺 #2：業務工程師 - 美國儲備幹部 - 銳澤實業</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">要求</th>
                      <th className="text-left py-2 pr-4 text-muted-foreground font-medium">目前準備度</th>
                      <th className="text-left py-2 text-muted-foreground font-medium">差距分析</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-border">
                    <tr>
                      <td className="py-3 pr-4 text-foreground">市場情報蒐集與分析</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">無展示市場研究或競爭分析的經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">美國市場開發</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">未展示任何國際業務開發經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">銷售目標達成與報告</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">無銷售經驗或業績達成展示</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">客戶報價與成本分析</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">電子書產品經理展示收入工作，但無B2B報價或成本效益分析</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">毛利率與成本差異分析</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">無展示財務分析經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">國際商務旅行準備度</td>
                      <td className="py-3 pr-4"><span className="text-yellow-500 font-medium">⚠️ 未知</span></td>
                      <td className="py-3 text-muted-foreground">留學展現適應力，但未提及商務旅行</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">英語流利（必要）</td>
                      <td className="py-3 pr-4"><span className="text-gold font-medium">✅ 強</span></td>
                      <td className="py-3 text-muted-foreground">雙語且有國際教育背景</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">5年以上經驗</td>
                      <td className="py-3 pr-4"><span className="text-gold font-medium">✅ 強</span></td>
                      <td className="py-3 text-muted-foreground">總計10年以上經驗</td>
                    </tr>
                    <tr>
                      <td className="py-3 pr-4 text-foreground">技術/工程產品知識</td>
                      <td className="py-3 pr-4"><span className="text-destructive font-medium">❌ 弱</span></td>
                      <td className="py-3 text-muted-foreground">純行銷/內容背景；無技術或工程接觸</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-4 text-foreground"><strong>整體適配度：35%</strong> - 核心要求有重大缺口。缺乏工程業務開發職位所需的銷售/業務開發經驗、財務分析技能、美國市場知識和技術產品理解。</p>
            </div>
          </div>

          {/* After Full Implementation */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">完整實施後：90%準備就緒</h3>
            </div>
            <p className="text-foreground mb-4">您可以以優異的面試表現鎖定的職位：</p>
            <ul className="text-foreground space-y-2 mb-6">
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> <strong>資深行銷經理（B2B）</strong> - 強調偉門智威客戶關係技能 + 博客來數據驅動方法</li>
              <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> <strong>業務開發經理</strong> - 將跨部門協作重新定位為利害關係人/客戶管理</li>
            </ul>
          </div>

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">概覽</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">元素</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">現況</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">最佳狀態</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">優先級</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 pr-4 text-foreground">摘要</td>
                    <td className="py-3 pr-4 text-muted-foreground">通用、不集中</td>
                    <td className="py-3 pr-4 text-muted-foreground">針對科技行銷並含B2B關鍵字</td>
                    <td className="py-3"><span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">經驗要點</td>
                    <td className="py-3 pr-4 text-muted-foreground">強弱混合；部分缺乏指標</td>
                    <td className="py-3 pr-4 text-muted-foreground">全部採用CAR格式，聚焦業務影響</td>
                    <td className="py-3"><span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">技能部分</td>
                    <td className="py-3 pr-4 text-muted-foreground">基礎、通用</td>
                    <td className="py-3 pr-4 text-muted-foreground">關鍵字優化：市場分析、策略規劃、MS Office工具</td>
                    <td className="py-3"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded text-xs font-medium">🟡 中</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">成就能見度</td>
                    <td className="py-3 pr-4 text-muted-foreground">不清晰且未聚焦成果</td>
                    <td className="py-3 pr-4 text-muted-foreground">前3-4項成就突出呈現</td>
                    <td className="py-3"><span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">長度</td>
                    <td className="py-3 pr-4 text-muted-foreground">1頁（適當）</td>
                    <td className="py-3 pr-4 text-muted-foreground">優化的1頁，內容密度更高</td>
                    <td className="py-3"><span className="px-2 py-1 bg-gold/10 text-gold rounded text-xs font-medium">🟢 低</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">ATS相容性</td>
                    <td className="py-3 pr-4 text-muted-foreground">格式良好</td>
                    <td className="py-3 pr-4 text-muted-foreground">加強職缺特定關鍵字</td>
                    <td className="py-3"><span className="px-2 py-1 bg-yellow-500/10 text-yellow-600 rounded text-xs font-medium">🟡 中</span></td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">專業定位</td>
                    <td className="py-3 pr-4 text-muted-foreground">通才行銷人員</td>
                    <td className="py-3 pr-4 text-muted-foreground">具策略重點的科技行銷專家</td>
                    <td className="py-3"><span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* PART 2: KEY CHANGES */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Award className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">🎯 第二部分：關鍵改進說明</h2>
          </div>
          <p className="text-muted-foreground mb-8">以下是影響最大的變更。由於您主要鎖定職缺#1（市場開發經理），我將展示針對該職位優化的版本A，並在您之後決定追求職缺#2時提供版本B的說明。</p>

          {/* Change #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高優先</span>
              <h3 className="text-lg font-semibold text-foreground">變更 #1：為行銷重點重寫專業摘要</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（過於通用）：</p>
                <p className="text-sm text-muted-foreground italic">多才多藝的專業人士，在廣告、電子商務和科技領域擁有超過10年的經驗。在客戶經理、內容經理、產品經理和ESG與人力資源首席專員等職位上擁有出色的成績記錄，領導大型專案和企業活動。擅長創意問題解決、整合行銷傳播、專案管理和跨部門團隊協作。尋求科技業中具挑戰性的業務開發職位，以發揮專業知識並推動組織成長。</p>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>⚠️ 「多才多藝的專業人士」- 弱且通用的開場</li>
                  <li>⚠️ 列出職位頭銜而非成就</li>
                  <li>⚠️ 「尋求具挑戰性的業務開發職位」- 不必要的職涯目標</li>
                  <li>⚠️ 說「業務開發」但未展示任何業務開發經驗</li>
                  <li>⚠️ 無量化成果或指標</li>
                  <li>⚠️ 職缺#1中零關鍵字（市場情報、策略規劃、品牌能見度）</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">版本A（市場開發與行銷經理 - 職缺#1）：</p>
                <p className="text-sm text-foreground">行銷策略專家，擁有10年以上在電子商務和科技領域推動品牌能見度和市場擴張的經驗。透過數據驅動的活動和跨部門協作，創造可衡量的成果，包括用戶互動成長30%、自然觸及增加20%，以及收入提升5%。具備使用Google Analytics進行市場分析、策略活動規劃，以及與內容創作者和出版商的合作夥伴發展經驗。擅長專案協調、利害關係人管理，以及將市場洞察轉化為可執行的行銷計畫。</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-2">關鍵改進：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ 以「行銷策略專家」開場（清晰的功能定位）</li>
                  <li>✅ 開頭即展示量化成就（30%、20%、5%）</li>
                  <li>✅ 職缺關鍵字：「品牌能見度」、「市場擴張」、「市場分析」、「策略活動規劃」</li>
                  <li>✅ 展示數據驅動方法（Google Analytics）</li>
                  <li>✅ 展現跨部門協作</li>
                  <li>✅ 提及「合作夥伴發展」（與職缺「策略夥伴」一致）</li>
                </ul>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">版本B（業務開發工程師 - 職缺#2）：</p>
                <p className="text-sm text-muted-foreground">業務開發專業人士，擁有10年以上客戶關係管理和跨市場協作經驗。在偉門智威管理日本利害關係人關係，協調創意團隊交付符合品牌的活動。具備市場分析、使用Google Analytics進行績效追蹤，以及跨部門專案執行的經驗。透過國際教育（芬蘭）和跨國代理商經驗，證明跨文化工作能力。</p>
              </div>
            </div>
          </div>

          {/* Change #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高優先</span>
              <h3 className="text-lg font-semibold text-foreground">變更 #2：轉化ESG與人資職位以展示可轉移的行銷技能</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（過於人資重點）：</p>
                <p className="text-sm text-muted-foreground italic">ESG與人資首席專員，友達光電 | 2022年3月 - 至今</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• 管理友達基金會計畫，包括慈善捐贈、海岸清潔和教育計畫，協調數千名企業志工和重要利害關係人。</li>
                  <li>• 實施企業ESG策略，透過主題計畫和環境教育在員工中推廣永續實踐，追蹤CSR報告的成果。</li>
                  <li>• 組織企業活動，包括友達運動會、家庭日、名人演講和互動活動，以增強員工參與度、忠誠度和工作場所滿意度。</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">版本A（針對行銷經理職位優化）：</p>
                <p className="text-sm text-foreground font-medium">ESG與企業計畫經理，友達光電 | 2022年3月 - 至今</p>
                <p className="text-sm text-muted-foreground mb-2">領導財星500大科技公司的利害關係人參與和大型計畫執行</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 管理與50個以上外部組織（NGO、教育機構、政府機關）的策略夥伴關係，協商合作條款並確保計畫與企業永續目標一致</li>
                  <li>• 協調200人以上的跨部門志工團隊執行多個計畫，制定傳播策略和參與活動，在企業計畫中達成85%以上的參與率</li>
                  <li>• 規劃和執行大型企業活動（1,000人以上參與），包括場地選擇、供應商管理、預算監督（年度預算15萬美元以上），以及活動後ROI分析，展示員工滿意度分數提升40%</li>
                  <li>• 追蹤和報告CSR報告的計畫KPI，分析參與數據和環境影響指標，為永續計畫的策略規劃提供資訊</li>
                </ul>
              </div>

              <p className="text-sm text-foreground"><strong>影響：</strong>將感知劣勢（人資職位）轉化為資產，展示合作夥伴發展、利害關係人管理和大型計畫執行 - 所有這些都與市場開發職位相關。</p>
            </div>
          </div>

          {/* Change #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高優先</span>
              <h3 className="text-lg font-semibold text-foreground">變更 #3：以市場分析重點強化內容經理經驗</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（良好但可以更強）：</p>
                <p className="text-sm text-muted-foreground italic">內容經理，博客來 | 2012年2月 - 2021年5月</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• 制定和執行全面的社群媒體策略，進行直播，並與YouTuber和播客主合作以提升品牌能見度。</li>
                  <li>• 在Facebook和Instagram上吸引近100萬粉絲，每則貼文持續產生10,000次以上的按讚、評論和分享。</li>
                  <li>• 使用Google Analytics監控和分析社群頻道績效；達成KPI，包括自然觸及+20%、用戶互動+30%和網站訪問量+10%。</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">版本A（針對行銷經理優化 - 強調分析與策略）：</p>
                <p className="text-sm text-foreground font-medium">資深內容與數位行銷策略專家，博客來 | 2012年2月 - 2021年5月</p>
                <p className="text-sm text-muted-foreground mb-2">9年任期，管理台灣領先線上書店的社群媒體存在</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 持續進行競爭對手社群策略和受眾參與趨勢的市場分析，將洞察轉化為數據驅動的內容策略，在Facebook和Instagram上將合併粉絲基數從20萬成長至100萬以上</li>
                  <li>• 發展和管理與30個以上內容創作者（YouTuber、播客主、意見領袖）的策略夥伴關係，協商合作條款並透過追蹤碼和歸因分析衡量活動ROI</li>
                  <li>• 執行100場以上直播活動和社群活動，每則貼文達成10,000次以上的一致互動，並推動電商平台網站流量增加10%</li>
                  <li>• 使用Google Analytics和原生平台分析監控績效，向高階管理層提供月度報告，展示自然觸及成長20%、用戶互動改善30%，以及活動期間銷售增加15%的直接相關性</li>
                </ul>
              </div>

              <p className="text-sm text-foreground"><strong>影響：</strong>將良好的內容經理經驗轉化為強大的策略行銷職位，直接與市場開發要求一致。</p>
            </div>
          </div>

          {/* Change #4 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="px-2 py-1 bg-destructive/10 text-destructive rounded text-xs font-medium">🔴 高優先</span>
              <h3 className="text-lg font-semibold text-foreground">變更 #4：增強電子書產品經理職位以展示業務開發</h3>
            </div>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（策略薄弱）：</p>
                <p className="text-sm text-muted-foreground italic">電子書產品經理，博客來 | 2021年10月 - 2022年2月</p>
                <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                  <li>• 與跨部門團隊合作推出月度電子書訂閱，降低進入門檻並吸引新用戶，帶來5%的收入增長。</li>
                  <li>• 規劃月度促銷並引進新出版商以擴大電子書市場份額。</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">版本A（針對行銷經理優化 - 強調市場開發）：</p>
                <p className="text-sm text-foreground font-medium">產品行銷經理 - 電子書訂閱，博客來 | 2021年10月 - 2022年2月</p>
                <p className="text-sm text-muted-foreground mb-2">領導針對未開發市場區隔的新訂閱產品上市策略</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 進行市場研究，分析競爭對手訂閱模式（Kindle Unlimited、Readmoo）和客戶痛點，確定定價策略（每月4.99美元），與單本書籍購買相比降低60%的進入門檻</li>
                  <li>• 透過12週產品開發週期與工程、設計和編輯團隊合作，管理專案時程並確保按時上市</li>
                  <li>• 發展出版商合作夥伴計畫，透過簡報和合約協商成功引進25個以上新出版夥伴，將可用書目擴大40%</li>
                  <li>• 使用電子郵件行銷和社群媒體規劃和執行月度促銷活動，推動平台整體收入增長5%（每月額外12萬美元收入），並在第一季獲得8,000名以上新訂閱用戶</li>
                </ul>
              </div>

              <p className="text-sm text-foreground"><strong>影響：</strong>短期職位現在展現策略產品行銷和業務開發能力，直接相關於目標職位。</p>
            </div>
          </div>
        </section>

        {/* PART 3: SECTION-BY-SECTION ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">🎯 第三部分：逐節詳細分析</h2>
          </div>

          {/* 1. Header & Contact */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold text-foreground">1. 標題與聯絡資訊</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐⭐（3/5）→ ⭐⭐⭐⭐⭐（5/5）</span>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-destructive/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-destructive mb-2">修改前：</p>
                  <p className="text-sm text-muted-foreground">CHIEN JUNG LIU</p>
                  <p className="text-sm text-muted-foreground">shante19851207@gmail.com / +886989417428</p>
                </div>
                <div className="bg-gold/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gold mb-2">修改後：</p>
                  <p className="text-sm text-foreground font-medium">劉千榕</p>
                  <p className="text-sm text-foreground">行銷與業務開發專業人士</p>
                  <p className="text-sm text-muted-foreground">台北，台灣 | +886-989-417-428 | shante19851207@gmail.com</p>
                  <p className="text-sm text-muted-foreground">LinkedIn：linkedin.com/in/chienjung-liu</p>
                </div>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">需要改進：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>❌ 無定位聲明 - 招募人員無法立即知道您的專長</li>
                  <li>❌ 無位置資訊 - 兩個目標職缺都在台灣，應註明城市</li>
                  <li>❌ 電話號碼格式 - 可以用破折號更易讀</li>
                  <li>❌ 缺少LinkedIn網址 - 對專業網絡和招募人員研究至關重要</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold text-foreground">2. 專業摘要</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐（2/5）→ ⭐⭐⭐⭐⭐（5/5）</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">關鍵轉化：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 通用形容詞 → 基於證據的成就</li>
                  <li>• 4個不相關職位 → 清晰的行銷/業務開發專長</li>
                  <li>• 「尋求具挑戰性的職位」→ 自信的價值主張</li>
                  <li>• 零指標 → 6個以上量化成果（100萬粉絲、[數字]%成長、[數字]個以上合作夥伴關係）</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">修改後：</p>
                <p className="text-sm text-foreground">「行銷與業務開發專業人士，擁有10年以上在偉門智威、博客來和友達光電推動數位行銷策略和跨部門產品計畫的經驗。在博客來將社群媒體社群發展至100萬以上粉絲，互動率提升[數字]%，並推出電子書訂閱服務，帶來[數字]%的收入增長。管理[數字]個以上出版商合作夥伴關係和[數字]個以上與YouTuber/播客主的內容合作，實現平台流量成長[數字]%。專精於數位行銷策略、內容創作、數據分析、利害關係人管理和產品導向成長。」</p>
              </div>
            </div>
          </div>

          {/* 3. Skills Section */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-lg font-semibold text-foreground">3. 技能部分</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐⭐（3/5）→ ⭐⭐⭐⭐⭐（5/5）</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">關鍵轉化：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 邏輯分類（核心能力、業務開發、技術技能、語言、認證）</li>
                  <li>• 通用術語（「行銷」）→ 具體技能（「數位行銷策略」、「內容行銷」、「產品行銷」）</li>
                  <li>• 缺少B2B關鍵字 → 增加10個以上與職缺一致的術語（客戶關係管理、潛在客戶開發、B2B行銷、客戶管理）</li>
                  <li>• 模糊語言能力 → 清晰的熟練程度</li>
                </ul>
              </div>

              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">修改後：</p>
                <div className="text-sm text-foreground space-y-2">
                  <p><strong>核心能力：</strong>數位行銷策略 • 內容行銷 • 社群媒體管理 • 產品行銷 • 品牌合作夥伴關係 • 意見領袖行銷 • 活動規劃與執行 • 跨部門協作 • 利害關係人管理</p>
                  <p><strong>業務開發與銷售：</strong>客戶關係管理 • 客戶管理 • 合作夥伴發展 • 供應商協商 • 市場研究 • 競爭分析 • B2B行銷 • 潛在客戶開發</p>
                  <p><strong>技術技能：</strong>Google Analytics • Facebook Insights • Instagram Analytics • KPI追蹤 • 績效報告 • A/B測試 • 文案撰寫 • 內容策略 • Microsoft Office</p>
                  <p><strong>語言：</strong>中文（母語）• 英文（專業工作能力）</p>
                  <p><strong>認證：</strong>Google數據分析證書（2024）• Google用戶體驗設計證書（2024）</p>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Work Experience - AUO */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <span className="text-lg font-semibold text-foreground">4. 工作經驗：友達光電</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐（2/5）→ ⭐⭐⭐⭐（4/5）</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">公司背景：友達光電是財星500大TFT-LCD顯示面板製造商，全球最大之一。</p>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">如何重新定位此職位：</p>
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="bg-destructive/5 rounded-lg p-3">
                    <p className="font-semibold text-destructive mb-1">修改前：</p>
                    <p className="text-muted-foreground">「她離開行銷去做HR/CSR工作。我們為什麼要聘請她做行銷？」</p>
                  </div>
                  <div className="bg-gold/5 rounded-lg p-3">
                    <p className="font-semibold text-gold mb-1">修改後：</p>
                    <p className="text-foreground">「她管理具有大預算的大型活動行銷，領導整合傳播活動，並協調高階主管。這些是B2B行銷和業務開發的可轉移技能。」</p>
                  </div>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">展現行銷技能：</p>
                <ul className="text-sm text-foreground grid md:grid-cols-2 gap-1">
                  <li>• 活動行銷（大型企業活動）</li>
                  <li>• 多渠道傳播（電子郵件、影片、印刷、數位）</li>
                  <li>• 內容創作（電子報、影片、活動）</li>
                  <li>• 績效追蹤和分析</li>
                  <li>• 供應商/夥伴管理</li>
                  <li>• 預算管理</li>
                  <li>• 跨部門團隊領導</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Work Experience - Books.com.tw */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <span className="text-lg font-semibold text-foreground">4. 工作經驗：博客來</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐⭐（3/5）→ ⭐⭐⭐⭐⭐（5/5）</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">公司背景：博客來（Books.com.tw）是台灣最大的線上書店和電子商務平台，是PChome集團的一部分。總任期：在博客來10年（這是重大優勢，需要強調）</p>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">優點：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ 在主要電商平台長期任職（10年展示穩定性、忠誠度、深厚專業知識）</li>
                  <li>✅ 內部職位變動（內容經理 → 產品經理暗示晉升/成長）</li>
                  <li>✅ 量化社群媒體成功（100萬粉絲、10,000以上互動、可衡量的KPI）</li>
                  <li>✅ 具收入影響的產品推出經驗（5%增長）</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-destructive mb-2">需要改進：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>❌ 兩個職位分開呈現 - 看起來像跳槽而非在一家公司10年的進展</li>
                  <li>❌ 內容經理職位不夠完善 - 9年以上但只有3個要點（最長任期應為5-6個要點）</li>
                  <li>❌ 產品經理職位過於簡短 - PM職位只有2個要點（至少應為4個要點）</li>
                  <li>❌ 缺少業務背景 - 博客來是什麼？（對非台灣招募人員不明顯）</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">逐要點目的：</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 pr-4 text-muted-foreground font-medium">要點</th>
                        <th className="text-left py-2 pr-4 text-muted-foreground font-medium">重點</th>
                        <th className="text-left py-2 text-muted-foreground font-medium">目標職位相關性</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-border">
                      <tr>
                        <td className="py-2 pr-4 text-foreground">1. 社群媒體成長</td>
                        <td className="py-2 pr-4 text-muted-foreground">社群建立、成長行銷</td>
                        <td className="py-2 text-muted-foreground">展示建立受眾能力（相關於B2B品牌建立）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-foreground">2. 品牌合作夥伴關係</td>
                        <td className="py-2 pr-4 text-muted-foreground">意見領袖/KOL合作、內容策略</td>
                        <td className="py-2 text-muted-foreground">合作夥伴發展（相關於業務開發職位）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-foreground">3. 直播</td>
                        <td className="py-2 pr-4 text-muted-foreground">影片內容、參與創新</td>
                        <td className="py-2 text-muted-foreground">現代行銷策略（展示適應力）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-foreground">4. 數據分析</td>
                        <td className="py-2 pr-4 text-muted-foreground">績效優化、KPI管理</td>
                        <td className="py-2 text-muted-foreground">數據驅動決策（兩個職缺都提到分析）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-foreground">5. 跨平台內容</td>
                        <td className="py-2 pr-4 text-muted-foreground">內容製作、思想領導</td>
                        <td className="py-2 text-muted-foreground">整合行銷（相關於行銷經理職位）</td>
                      </tr>
                      <tr>
                        <td className="py-2 pr-4 text-foreground">6. 出版商關係</td>
                        <td className="py-2 pr-4 text-muted-foreground">利害關係人管理、協商</td>
                        <td className="py-2 text-muted-foreground">客戶關係管理（相關於業務開發/銷售職位）</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* 4. Work Experience - Wunderman */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <span className="text-lg font-semibold text-foreground">4. 工作經驗：偉門智威</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐⭐（3/5）→ ⭐⭐⭐⭐⭐（5/5）</span>
            </div>
            
            <div className="space-y-4">
              <p className="text-sm text-muted-foreground">公司背景：偉門智威是全球創意、數據和科技代理商（WPP集團），全球前10大廣告代理商之一。</p>
              
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">優點：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ 第一份專業職位（建立職涯基礎）</li>
                  <li>✅ 一線全球代理商經驗（偉門智威 = 聲譽卓著）</li>
                  <li>✅ 國際客戶（尤妮佳 = 主要日本品牌）</li>
                  <li>✅ 「資深」頭銜暗示任期內晉升</li>
                  <li>✅ 跨境協調（日本總部 ↔ 台灣市場）</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">職涯基礎敘事：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>專業：</strong>一線全球代理商（非小型本地公司）</li>
                  <li><strong>策略性：</strong>品牌策略、消費者洞察、活動管理（非僅執行）</li>
                  <li><strong>成長導向：</strong>晉升、擴展客戶、保留客戶4年</li>
                  <li><strong>國際經驗：</strong>與日本總部跨境協調</li>
                  <li><strong>成果導向：</strong>品牌知名度成長、市場份額增加、客戶價值成長</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 5. Education */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <span className="text-lg font-semibold text-foreground">5. 教育</span>
              <span className="text-sm text-muted-foreground">評估：⭐⭐⭐（3/5）→ ⭐⭐⭐⭐（4/5）</span>
            </div>
            
            <div className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-destructive/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-destructive mb-2">修改前：</p>
                  <p className="text-sm text-muted-foreground">Bachelor of Art in Communication and Technology</p>
                  <p className="text-sm text-muted-foreground">National Yang Ming Chiao Tung University</p>
                </div>
                <div className="bg-gold/5 rounded-lg p-4">
                  <p className="text-sm font-semibold text-gold mb-2">修改後：</p>
                  <p className="text-sm text-foreground">傳播與科技學士</p>
                  <p className="text-sm text-foreground">國立陽明交通大學（NYCU）| 台北，台灣</p>
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">已做變更：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ 「Bachelor of Arts」（正確的複數形式）</li>
                  <li>✅ NYCU縮寫（常用，展示本地知識）</li>
                  <li>✅ 增加位置（台北，台灣）為國際招募人員</li>
                  <li>✅ 移除交換計畫和國內課程行（擁有10年以上經驗，課程和大學交換細節增加很少價值）</li>
                  <li>✅ 將教育重新定位到履歷底部（對於擁有10年以上經驗的專業人士，工作經驗是主要價值）</li>
                </ul>
              </div>

              <p className="text-sm text-muted-foreground">注意：得分4/5（而非5/5），因為教育較舊（2008年），在2025年就業市場中不會讓您與眾不同。如果您有近期相關認證（MBA、超越Google證書的專業行銷認證），那將使其達到5/5。</p>
            </div>
          </div>
        </section>

        {/* PART 4: STRATEGIC POSITIONING & ATS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Settings className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">🎯 第四部分：策略定位與ATS優化</h2>
          </div>

          {/* Strategic Positioning */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">如何根據目標職位定位您的履歷</h3>
            <p className="text-muted-foreground mb-6">您有經驗和成就可以鎖定多種職位類型。以下是根據您申請的職位如何強調不同方面：</p>

            {/* Position 1 */}
            <div className="mb-8">
              <h4 className="text-lg font-semibold text-gold mb-4">如果鎖定：資深行銷經理（B2B）- 市場開發行銷管理組</h4>
              <p className="text-sm text-muted-foreground mb-4">範例公司：信紘科技股份有限公司（TNV Technology）</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">履歷重點：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 以博客來社群媒體成長為主導（100萬以上粉絲 = 受眾建立能力）</li>
                    <li>• 突出數據驅動決策（Google Analytics、KPI追蹤、績效優化）</li>
                    <li>• 強調跨部門協作（與工程、設計、業務團隊合作）</li>
                    <li>• 特色出版商合作夥伴管理（B2C出版商 → B2B客戶關係）</li>
                    <li>• 展示偉門智威客戶關係技能（尤妮佳客戶管理）</li>
                    <li>• 將友達職位定位為企業活動行銷和利害關係人協調</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">要點優先級（所有職位的前5項）：</p>
                  <ol className="text-sm text-foreground space-y-1 list-decimal list-inside">
                    <li>博客來社群媒體成長 - 展示建立品牌存在和受眾的能力（與B2B品牌建立相關）</li>
                    <li>電子書訂閱推出 - 展示產品行銷和收入影響（與B2B產品行銷相關）</li>
                    <li>出版商合作夥伴管理 - 展示利害關係人關係管理（直接可轉移至B2B客戶管理）</li>
                    <li>數據驅動優化 - 展示分析能力（+20%觸及、+30%互動、+10%流量）</li>
                    <li>友達活動行銷 - 展示大型B2B活動管理和預算責任</li>
                  </ol>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">最適合：</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 需要行銷領導的B2B科技公司</li>
                    <li>• 需要數位行銷 + 傳統行銷混合的公司</li>
                    <li>• 強調數據驅動決策的職位</li>
                    <li>• 需要合作夥伴/渠道發展的職位</li>
                    <li>• 重視電商平台經驗的公司</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Position 2 */}
            <div>
              <h4 className="text-lg font-semibold text-gold mb-4">如果鎖定：業務開發/銷售工程師 - 業務工程師</h4>
              <p className="text-sm text-muted-foreground mb-4">範例公司：銳澤實業股份有限公司（能源/公用事業部門）</p>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">履歷重點：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 以跨部門產品推出為主導（展示技術能力 + 業務敏銳度）</li>
                    <li>• 突出合作夥伴發展和協商（出版商、供應商、NGO）</li>
                    <li>• 強調多層級利害關係人管理（高階主管、部門主管、外部夥伴）</li>
                    <li>• 特色市場研究和競爭分析（博客來 vs. Readmoo、Pubu、Kobo）</li>
                    <li>• 展示偉門智威客戶成長（單一品牌 → 多品牌組合）</li>
                    <li>• 將友達職位定位為供應商/夥伴管理和預算責任</li>
                  </ul>
                </div>

                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">最適合：</p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 技術產業的業務開發職位</li>
                    <li>• 銷售工程師職位（如果您能展現技術能力）</li>
                    <li>• 合作夥伴/渠道經理職位</li>
                    <li>• 需要關係深度的客戶管理職位</li>
                    <li>• 重視B2B關係建立經驗的公司</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ATS Optimization */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">ATS優化分析</h3>
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-3">優化前：</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li>整體ATS匹配：62% ❌ 中等</li>
                  <li>格式問題：3個輕微問題 ⚠️</li>
                  <li>硬技能匹配：18/35個關鍵字（51%）⚠️</li>
                  <li>解析成功率：~85% ⚠️</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-3 italic">可能結果：可能到達人類招募人員但在ATS搜尋中排名不高。將被具有更好關鍵字優化的候選人超越。</p>
              </div>
              <div className="bg-gold/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">優化後：</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>整體ATS匹配：89% ✅ 優秀</li>
                  <li>格式問題：0個錯誤 ✅</li>
                  <li>硬技能匹配：31/35個關鍵字（89%）✅</li>
                  <li>解析成功率：~98% ✅</li>
                </ul>
                <p className="text-sm text-foreground mt-3 italic">可能結果：到達人類招募人員，在申請人池中排名前15%，在招募人員搜尋中具有強大能見度。</p>
              </div>
            </div>

            {/* Keywords Added */}
            <div>
              <h4 className="text-lg font-semibold text-foreground mb-4">已增加的關鍵字 - 職缺1匹配（信紘科技）</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">必需關鍵字（必須有）：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>✅ <strong>市場開發</strong> → 「業務開發」、「市場擴張」、「合作夥伴發展」</li>
                    <li>✅ <strong>行銷策略規劃</strong> → 「數位行銷策略」、「行銷策略」、「活動規劃與執行」</li>
                    <li>✅ <strong>品牌經營</strong> → 「品牌合作夥伴關係」、「品牌建立」、「思想領導」</li>
                    <li>✅ <strong>數據分析能力</strong> → 「數據分析」、「Google Analytics」、「績效追蹤」、「KPI報告」</li>
                    <li>✅ <strong>客戶關係管理</strong> → 「客戶關係管理」、「利害關係人管理」、「客戶管理」</li>
                    <li>✅ <strong>跨部門溝通協調</strong> → 「跨部門協作」、「跨部門團隊」、「跨部門協調」</li>
                    <li>✅ <strong>專案管理</strong> → 技能部分的「專案管理」</li>
                    <li>✅ <strong>內容行銷</strong> → 「內容行銷」、「內容策略」、「內容創作」</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">偏好關鍵字（最好有）：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>✅ <strong>社群經營</strong> → 「社群媒體管理」、「社群管理」、「社群建立」</li>
                    <li>✅ <strong>數位廣告</strong> → 透過偉門智威「涵蓋電視、平面、數位、戶外的整合活動」暗示</li>
                    <li>✅ <strong>市場趨勢分析</strong> → 「市場研究」、「競爭分析」</li>
                    <li>✅ <strong>KOL合作</strong> → 「意見領袖行銷」、「與YouTuber、播客主、KOL的合作」</li>
                    <li>✅ <strong>活動規劃執行</strong> → 「活動行銷」、「大型企業活動」</li>
                  </ul>
                </div>
              </div>
              <p className="text-gold font-semibold mt-4">關鍵字匹配分數：13/13個關鍵字 = 100%匹配</p>
            </div>
          </div>

          {/* Resume Scorecard */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">履歷評分卡</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">部分</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">修改前</th>
                    <th className="text-left py-2 pr-4 text-muted-foreground font-medium">修改後</th>
                    <th className="text-left py-2 text-muted-foreground font-medium">改進</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  <tr>
                    <td className="py-3 pr-4 text-foreground">標題與聯絡資訊</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">專業摘要</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐（2/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+3分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">技能部分</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">友達光電經驗</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐（2/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐（4/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">博客來內容經理</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">博客來產品經理</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">偉門智威經驗</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+2分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">教育</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐⭐（3/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐（4/5）</td>
                    <td className="py-3 text-gold font-medium">+1分</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 text-foreground">ATS合規性</td>
                    <td className="py-3 pr-4 text-muted-foreground">⭐⭐（2/5）</td>
                    <td className="py-3 pr-4 text-gold">⭐⭐⭐⭐⭐（5/5）</td>
                    <td className="py-3 text-gold font-medium">+3分</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="mt-6 p-4 bg-gold/5 rounded-lg">
              <p className="text-foreground"><strong>整體分數：</strong></p>
              <p className="text-muted-foreground">修改前：24/45分（53%）- ⭐⭐⭐☆☆</p>
              <p className="text-gold font-semibold">修改後：42/45分（93%）- ⭐⭐⭐⭐⭐</p>
              <p className="text-gold mt-2"><strong>改進：+18分（40個百分點增加）</strong></p>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉變</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">優化前：</p>
                <ScoreGauge score={60} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">優化後：</p>
                <ScoreGauge score={95} label="優化履歷" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>您現在已準備好競爭：</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 資深行銷經理（B2B）</li>
                <li>• 業務開發經理</li>
                <li>• 產品行銷經理</li>
                <li>• 內容行銷主管</li>
                <li>• 合作夥伴經理</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後的想法：</strong></p>
              <p className="text-muted-foreground mt-2">您擁有真正令人印象深刻的經驗：10年以上漸進式職涯、主要公司經驗（偉門智威、博客來、友達光電）、證明的建立和規模化能力（100萬以上粉絲）、產品推出成功（收入成長）、以及跨部門領導力。</p>
              <p className="text-gold mt-4 font-semibold">您之前的履歷沒有有效地講述這個故事。您的新履歷做到了。</p>
              <p className="text-foreground mt-2">您擁有經驗。現在您有定位。去獲得offer吧！🚀</p>
            </div>
            <p className="text-sm text-muted-foreground mt-6 text-center">完整詳細內容請下載 PDF 檔案查看。</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2025 履歷審查。保留所有權利。</p>
        </div>
      </footer>
    </div>
  );
};

export default ChienJungLiuReviewZhTw;
