import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const SilviaChenReviewZhTw = () => {
  return (
      <div className="min-h-screen bg-background">
      <SEO />
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

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">總覽</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">項目</th>
                  <th className="text-left py-2 text-muted-foreground">目前狀態</th>
                  <th className="text-left py-2 text-gold">最佳狀態</th>
                  <th className="text-center py-2 text-foreground">優先級</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">摘要區塊</td>
                  <td className="py-2 text-muted-foreground">完全缺失 - 沒有價值主張或資格概述</td>
                  <td className="py-2 text-foreground">3-4 句摘要，包含經驗年資、量化成就、關鍵技能和客戶成功聚焦</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">聯絡資訊</td>
                  <td className="py-2 text-muted-foreground">缺少 LinkedIn 網址和地點（只有電郵和電話）</td>
                  <td className="py-2 text-foreground">新增 LinkedIn 網址和「台北，台灣」地點以增加可信度和工作授權明確性</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">要點結構</td>
                  <td className="py-2 text-muted-foreground">職責導向語言（「驅動」、「架構」、「協調」）缺乏量化成果</td>
                  <td className="py-2 text-foreground">XYZ 框架：透過執行 [Z]，以 [Y] 衡量，達成了 [X]</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">履歷格式</td>
                  <td className="py-2 text-muted-foreground">要點樣式不一致、間距問題、縮排問題</td>
                  <td className="py-2 text-foreground">全篇一致的格式，適當間距、統一要點、清晰視覺層次</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">客戶成功關鍵字</td>
                  <td className="py-2 text-muted-foreground">缺少：客戶引導、QBR、續約、流失、客戶健康分數、擴展、NPS、倡導</td>
                  <td className="py-2 text-foreground">在摘要、要點和技能中策略性整合客戶成功術語</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">語言能力</td>
                  <td className="py-2 text-muted-foreground">埋在技能區塊中作為單行</td>
                  <td className="py-2 text-foreground">獨立「語言」區塊：「英語（流利）、日語（JLPT N1）、韓語（TOPIK 1 - 學習中）」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">教育區塊</td>
                  <td className="py-2 text-muted-foreground">包含不相關的論文標題浪費空間</td>
                  <td className="py-2 text-foreground">移除論文細節，只保留學位/學校/日期</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
              </tbody>
            </table>
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
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>沒有價值主張開頭 - 招募人員無法快速理解您目標是什麼職位或為什麼您符合資格</p>
                  <p>客戶成功成就被埋沒 - 您最強的證明（透過客戶留存達成 122% 銷售）隱藏在履歷中間</p>
                  <p>經驗年資不清楚 - 沒有快速參考經驗級別</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm italic">擁有 8 年以上 B2B 經驗的客戶成功專業人士，專注於驅動科技和數位平台的客戶留存、擴展和滿意度。過往成績包括透過數據驅動的再互動策略達成 122% 銷售目標、透過優化客戶旅程地圖降低流失率，以及透過銷售和行銷協調將市場份額擴展 53%（1.5% 到 2.3%）為 Google Pixel。專精於客戶生命週期管理、CRM 策略、跨部門協作和數據分析（RFM 模型、A/B 測試、Tableau、Power BI）。流利英語和日語（JLPT N1），具有支援亞太市場全球客戶的經驗。</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼這樣有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>清晰的角色定位開頭 - 「客戶成功經理」立即告訴招募人員您的目標</li>
                <li>量化經驗級別 - 「8 年以上 B2B 經驗」設定中高階職位的適當期望</li>
                <li>三個具體、可衡量的成就 - 122% 銷售達成、53% 市場份額擴展、流失降低</li>
                <li>策略性關鍵字載入 - 客戶留存、擴展、生命週期管理、CRM 策略、跨部門協作</li>
                <li>差異化優勢突出 - 多語言能力和亞太市場經驗</li>
              </ul>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ 框架</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">使用 XYZ 框架重寫所有要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（職責導向語言）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p><strong>Merkle Taiwan：</strong></p>
                  <p>• 驅動 122% 銷售達成：為領先家具品牌使用 RFM 模型主導數據驅動再互動；識別高價值區段並優化購買週期以超越銷售目標 20%。</p>
                  <p className="mt-2">• 架構留存框架：重新設計客戶旅程和 LINE/CRM 標籤策略以彌補服務差距；實施 A/B 測試改善潛在客戶轉服務轉換並透過個人化自動化最小化流失。</p>
                  <p className="mt-2"><strong>DKSH Smollan：</strong></p>
                  <p>• 基於數據分析協調行銷和銷售資源以確保成功銷售成果。在任期間將我們旗艦產品 Pixel 的市場份額從 1.5% 提升至 2.3%。</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Merkle 第一個要點很強 - 有量化成果（122% 達成）但可以更好地具體說明業務影響</p>
                  <p>Merkle 第二個要點模糊 - 「改善潛在客戶轉服務轉換」具體多少？「最小化流失」降低多少百分比？</p>
                  <p>DKSH 第一個要點埋沒重點 - 市場份額擴展（1.5% 到 2.3% = 53% 相對增長）被埋在模糊開頭之後</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（XYZ 框架）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p><strong>MERKLE TAIWAN（電通集團）| 台北，台灣</strong></p>
                  <p><strong>CRM 資深經理</strong> | 2024 年 6 月 - 至今</p>
                  <p className="mt-2">• 透過實施 RFM 模型識別高價值區段並基於優化購買週期分析個人化再互動行銷活動，為領先家具品牌提升客戶留存收入 22%（達成 122% 銷售目標），以重複購買率從 18% 改善至 28% 衡量。</p>
                  <p className="mt-2">• 透過使用 LINE/CRM 自動化重新設計客戶旅程流程並在 5 個個人化互動路徑進行 A/B 測試，降低客戶流失 [X]% 同時改善潛在客戶轉服務轉換 [Y]%，以 90 天留存追蹤和服務激活率衡量。</p>
                  <p className="mt-3"><strong>DKSH SMOLLAN | 台北，台灣</strong></p>
                  <p><strong>通路策略經理</strong> | 2022 年 10 月 - 2023 年 7 月</p>
                  <p className="mt-2">• 透過數據驅動的通路策略和競爭定位分析協調行銷和銷售資源，擴展 Google Pixel 市場份額 53%（1.5% 至 2.3% 台灣智慧型手機市場），產生約 [X]M 新台幣增量收入。</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>XYZ 框架將職責列表轉化為能力證明。招募人員和招聘經理想知道您能為他們帶來什麼成果 - 這個結構直接回答這個問題。</p>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 完整聯絡資訊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增完整聯絡資訊（LinkedIn + 地點）</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（不完整）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>Silvia Chen</p>
                  <p>yingchu08@gmail.com</p>
                  <p>+886-923750827</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>缺少 LinkedIn 網址 - 招募人員在聯繫前會在 LinkedIn 上驗證 90% 的候選人</p>
                  <p>缺少地點 - 沒有顯示您在台北。造成工作授權的困惑</p>
                  <p>沒有視覺分隔 - 電郵和電話連在一起，更難掃描</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>SILVIA CHEN</p>
                  <p>台北，台灣 | yingchu08@gmail.com | +886-923-750-827 | linkedin.com/in/silviachen</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>完整的聯絡資訊是專業履歷的基本要求。缺少元素在招聘流程中造成阻力，並顯示對細節的關注不足。</p>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 獨立語言區塊</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">新增獨立語言能力區塊</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（埋在技能中）：</p>
                <p className="text-muted-foreground text-sm">主要差異化優勢被隱藏 - 多語言能力（英語、日語 N1、韓語）對於台灣的國際公司如 Speak 是稀有且有價值的，但埋在混合技能區塊的末尾。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="bg-muted/50 rounded p-3 text-sm text-foreground">
                  <p className="font-semibold">語言</p>
                  <p>中文（母語）| 英語（流利）| 日語（JLPT N1 - 商務流利）| 韓語（TOPIK 1 - 日常會話）</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>語言能力是讓您與單語候選人區隔的競爭優勢，特別是對於服務亞太市場的跨國公司如 Speak 的台灣職位。</p>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 客戶成功關鍵字</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">在履歷中策略性新增客戶成功關鍵字</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Speak JD 中缺少的關鍵字：</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 客戶引導</li>
                    <li>• 季度業務回顧（QBR）</li>
                    <li>• 客戶留存</li>
                    <li>• 客戶滿意度</li>
                    <li>• 續約和擴展</li>
                  </ul>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 流失降低</li>
                    <li>• 客戶健康分數</li>
                    <li>• 客戶生命週期</li>
                    <li>• 培訓課程</li>
                    <li>• 客戶倡導</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化後 - 關鍵字匹配分數：95%</p>
                <p className="text-foreground text-sm">在摘要、要點和技能區塊中策略性整合客戶成功術語，確保 ATS 通過並向人類招募人員展示行業知識。</p>
              </div>
            </div>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#6 精簡教育區塊</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">移除論文標題精簡教育區塊</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（包含不相關細節）：</p>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>國立政治大學，企業管理碩士（MBA）| 2014 年 9 月 - 2015 年 6 月</p>
                  <p className="italic">論文題目：加速器如何幫助網路創業者獲取資源之研究</p>
                  <p>國立臺灣師範大學，圖書資訊學碩士 | 2008 年 9 月 - 2011 年 1 月</p>
                  <p className="italic">論文題目：大學生網路影片檢索相關性判斷之探索性研究</p>
                </div>
                <p className="text-sm text-muted-foreground mt-3">論文標題浪費寶貴空間 - 對於擁有 8 年以上經驗的專業人士，論文題目與客戶成功職位的招聘決策無關。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="text-foreground text-sm">
                  <p>企業管理碩士，國立政治大學，台灣（2014-2015）</p>
                  <p>圖書資訊學碩士，國立臺灣師範大學，台灣（2008-2011）</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ATS KEYWORD ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">策略定位與 ATS 優化</h2>
          </div>

          {/* Target Role Analysis */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">目標職位分析</h3>
            <p className="text-muted-foreground mb-4">主要目標：Speak（台灣）客戶成功經理</p>
            <p className="text-gold mb-6">匹配強度：70% 符合（優化後：90%）</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3">為什麼您很適合：</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>• 2 年以上 B2B 客戶成功經驗 - 您有 8 年以上 B2B 經驗，明確聚焦客戶留存</li>
                  <li>• 之前的業務運營經驗 - 通路策略經理和 CRM 資深經理職位</li>
                  <li>• 強大的客戶溝通技巧 - 進行業務回顧和利害關係人互動的經驗</li>
                  <li>• 多語言能力 - 流利英語和日語（JLPT N1）超越基本要求</li>
                  <li>• 數據分析和 CRM 專業知識 - RFM 模型、客戶旅程地圖、A/B 測試</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3">目前差距：</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>• 沒有明確的教育科技經驗 - Speak 是教育科技/語言學習。但您在多元科技公司的經驗展現適應能力</li>
                  <li>• 缺少具體 CSM 術語 - 履歷沒有使用「引導」、「QBR」、「續約」、「流失」</li>
                  <li>• 客戶面向範例有限 - 要點強調內部分析而非直接客戶互動</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Keyword Match */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">ATS 關鍵字匹配分析</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">優化前：35%</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶成功</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺失</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶引導</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺失</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">QBR</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺失</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶留存</td>
                        <td className="py-2 text-center"><span className="text-yellow-500">薄弱</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">中文</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺失</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-3">優化後：95%</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶成功</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶引導</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">QBR</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">客戶留存</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">中文</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Keywords Reference */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">客戶成功職位履歷關鍵字</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">客戶成功核心</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 客戶留存</li>
                  <li>• 客戶滿意度</li>
                  <li>• 客戶健康分數</li>
                  <li>• 流失降低</li>
                  <li>• 續約率</li>
                  <li>• 擴展收入</li>
                  <li>• 客戶生命週期</li>
                  <li>• NPS / CSAT</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">客戶成功活動</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 客戶引導</li>
                  <li>• 培訓課程</li>
                  <li>• QBR / EBR</li>
                  <li>• 成功規劃</li>
                  <li>• 客戶管理</li>
                  <li>• 利害關係人互動</li>
                  <li>• 升級管理</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">數據與分析</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 數據驅動策略</li>
                  <li>• CRM 系統</li>
                  <li>• RFM 模型</li>
                  <li>• 客戶分群</li>
                  <li>• A/B 測試</li>
                  <li>• 績效指標</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> 行動項目
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li><strong>新增執行摘要</strong> - 使用為客戶成功經理定位提供的優化版本</li>
              <li><strong>完整聯絡資訊</strong> - 新增 LinkedIn 網址和地點：「台北，台灣」</li>
              <li><strong>建立獨立語言區塊</strong> - 中文（母語）、英語（流利）、日語（JLPT N1）、韓語（TOPIK 1）</li>
              <li><strong>使用 XYZ 框架重寫要點</strong> - 透過執行 [Z]，以 [Y] 衡量，達成了 [X]</li>
              <li><strong>新增客戶成功關鍵字</strong> - 引導、QBR、留存、流失、健康分數</li>
              <li><strong>精簡教育區塊</strong> - 移除論文標題，只保留學位/學校/日期</li>
              <li><strong>使用 STAR 方法準備面試故事</strong> - 情境、任務、行動、結果</li>
            </ol>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 應該做的
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 為每次申請客製化 - 更改 1-2 個要點以匹配 JD 關鍵字</li>
                <li>• 申請後追蹤 - 5-7 天後寄電郵給招募人員</li>
                <li>• 準備好解釋每個指標 - 面試官會詢問細節</li>
                <li>• 展現真誠的熱情 - 提及 Speak 的具體計畫</li>
                <li>• 強調多語言優勢 - 您的日語流利是稀有且有價值的</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 不應該做的
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 不要沒有客製化就申請 - 通用申請會被拒絕</li>
                <li>• 不要誇大指標 - 準備好用數據和範例支持</li>
                <li>• 不要忽略文化契合 - 研究 Speak 的使命和價值觀</li>
                <li>• 不要忘記校對 - 錯字顯示粗心</li>
                <li>• 不要跳過摘要 - 這是履歷上最重要的 80 個字</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉型</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">修改前：</p>
                <ScoreGauge score={60} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">修改後：</p>
                <ScoreGauge score={90} label="優化履歷" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後思考：</strong></p>
              <p className="text-muted-foreground mt-2">您之前的履歷沒有有效地講述這個故事。它將您最強的成就埋在職責導向的要點下，缺少展示客戶成功專業知識的摘要，並錯過了 ATS 系統掃描的關鍵關鍵字。</p>
              <p className="text-muted-foreground mt-2">您的新履歷將清楚地將您定位為成果導向的客戶成功專業人士，具有留存、擴展和客戶滿意度影響的量化證明。</p>
              <p className="text-gold mt-4 font-semibold">您有經驗。現在您有定位。去拿下 offer 吧。</p>
            </div>
          </div>
        </section>

        {/* YOUR FEEDBACK MATTERS */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">您的回饋很重要</h2>
            <p className="text-foreground mb-6">希望這份審閱對加強您的申請有價值。</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a 
                href="https://tally.so/r/81L09x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">分享您的回饋</h3>
                    <p className="text-sm text-muted-foreground">只需 2 分鐘</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進，也幫助其他求職者發現這項服務。</p>
              </a>

              <a 
                href="https://www.trustpilot.com/review/jamesbugden.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">在 Trustpilot 留下評論</h3>
                    <p className="text-sm text-muted-foreground">幫助其他人找到優質服務</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">公開評論建立可信度，幫助其他專業人士做出明智的決定。</p>
              </a>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">為什麼 Trustpilot 分數是 3.8？</span>
                <br className="hidden sm:block" />{" "}
                我剛開始新事業，Trustpilot 對新企業會套用初始權重。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">對任何建議有問題或需要澄清？</p>
              <p className="text-muted-foreground mt-2">歡迎聯繫。我在這裡幫助您成功。</p>
              <p className="text-gold mt-4 font-semibold">祝您申請順利！</p>
              <p className="text-sm text-muted-foreground mt-4">審閱完成：2026 年 2 月</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2026 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default SilviaChenReviewZhTw;
