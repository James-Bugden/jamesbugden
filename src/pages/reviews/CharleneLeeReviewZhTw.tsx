import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Settings, FileCheck, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import { SEO } from "@/components/SEO";

const CharleneLeeReviewZhTw = () => {
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
              href="/reviews/charlene-lee-resume-review-zh-tw.pdf"
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Charlene Lee</h1>
          <p className="text-cream-70 text-lg">專業履歷分析與建議</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Executive Summary */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">總體摘要</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體評估</p>
                <p className="text-3xl font-bold text-gold">良好</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-gold text-gold" />
                  ))}
                  <Star className="w-6 h-6 fill-gold/50 text-gold" />
                  <Star className="w-6 h-6 text-border" />
                </div>
                <span className="text-muted-foreground">(3.5/5)</span>
              </div>
            </div>
            
            <p className="text-foreground leading-relaxed mb-4">
              Charlene，您的履歷展現了在知名公司（Microsoft）的豐富經驗，以及令人印象深刻的留存指標（120%+、100% 續約率）。
            </p>
            
            <p className="text-foreground leading-relaxed mb-4">
              然而，這份履歷目前是以客戶成功職位為定位，但試圖轉向營運/供應類職位（根據您的措辭，可能是 Uber/共乘平台相關）。大量使用類比說明（「直接適用於司機招募」）實際上削弱了您的定位——您是在告訴招募人員如何解讀您的經驗，而不是讓您的成就自己說話。
            </p>
            
            <p className="text-foreground leading-relaxed mb-6">
              透過重新聚焦定位和內容優化，這份履歷可以在營運經理或供應成長職位上極具競爭力。我的假設是您正在瞄準這類職位，但回想起來，我應該先詢問您的目標職位描述。
            </p>
          </div>

          {/* Target Readiness */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">目標準備度</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">65%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>目前狀態：</strong>這份履歷可以讓您獲得科技公司客戶成功經理或客戶經理職位的面試機會。然而，它並非最佳定位於營運/供應成長職位，因為：
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 太多「客戶成功」語言</li>
                <li>• 營運/供應鏈術語不足</li>
                <li>• 類比說明使轉職意圖明顯且尷尬</li>
                <li>• 缺少關鍵營運指標（產出量、效率、利用率）</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2 font-semibold">實施以上 3 個優先項目後</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">85%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>執行上述 3 個優先項目後：</strong>履歷將達到 85% 準備度，並具競爭力適用於：
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 營運經理職位（科技公司、市場平台）</li>
                <li>• 供應成長經理（Uber、Grab、Deliveroo、Foodpanda）</li>
                <li>• 業務營運經理（高成長新創公司）</li>
                <li>• 策略夥伴關係經理（B2B 平台）</li>
              </ul>
            </div>
          </div>

          {/* Remaining Gap */}
          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <p className="text-gold font-semibold mb-3">剩餘 15% 差距：</p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                針對每個特定職位調整關鍵字（營運 vs 供應 vs 夥伴關係）
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                可能需要重新排序經歷，將營運成就放在前面
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                如果瞄準純營運職位，可添加 1-2 個營運認證（Six Sigma、PMP）
              </li>
            </ul>
          </div>
        </section>

        {/* Top 3 Strengths */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">三大優勢 ✅</h2>
          </div>

          <div className="space-y-6">
            {/* Strength 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold text-foreground">量化且亮眼的成果</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">投資組合達到 120%+ 留存率和成長</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">100% 客戶續約率</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">報告時間減少 20%</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">這些指標立即展示您能推動業務影響並以成果為導向</span>
                </li>
              </ul>
            </div>

            {/* Strength 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold text-foreground">頂級品牌信譽</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">在 Microsoft 服務 20 年（2005-2025）展現了忠誠度、晉升發展，以及在複雜企業環境中工作的能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Microsoft 的名字立即為招募人員建立信任</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">認證組合（Azure、M365、AI、Security）展現持續學習</span>
                </li>
              </ul>
            </div>

            {/* Strength 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-xl font-semibold text-foreground">清晰的跨部門領導力</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">協調工程、交付、支援團隊</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">與 C 級高管合作</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">跨銷售、服務、支援組織進行協調</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">展現您能夠在沒有正式權力的情況下產生影響力，並管理複雜的利害關係人</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Top 3 Priorities */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">三大優先改進項目 🎯（按影響力排序）</h2>
          </div>

          {/* Priority 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先項目 1 - 高影響力 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">移除所有類比和括號說明</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼這很重要：</strong>您的摘要和項目符號中充滿了諸如「（直接適用於平台工作者/司機招募）」和「（類似於司機忠誠度）」等用語。這造成三個主要問題：
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>削弱您的可信度</strong> - 聽起來像是您在試圖說服招募人員您的經驗是相關的</li>
              <li><strong>佔用寶貴空間</strong> - 使用了 15-20% 的履歷版面在自我說明上</li>
            </ol>

            <p className="text-foreground font-semibold mb-4">解決方法：簡單描述您實際做了什麼以及取得的成果。讓招募人員自己建立連結。</p>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">❌ 目前（弱）：</p>
                <p className="text-foreground italic">"在高價值投資組合中達成 100% 客戶續約，同時超越 120% 留存率和成長，證明了建立可擴展、長期互動策略的能力（類似於司機忠誠度）。"</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">✅ 改進後（強）：</p>
                <p className="text-foreground italic">"在 25+ 個企業帳戶、價值 $15M+ ARR 的高價值投資組合中達成 100% 客戶續約，同時超越 120% 留存率和成長。"</p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">第二個版本更有力、更具體，而且不會為自己辯解。</p>
          </div>

          {/* Priority 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先項目 2 - 高影響力 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">重寫您的專業摘要，聚焦於職位而非轉職說明</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼這很重要：</strong>您目前的摘要讀起來像是一封求職信，在解釋為什麼您有資格擔任不同的職位。這是 6 行密集的文字，試圖將您的經驗與其他東西連結起來。招募人員會快速瀏覽這段內容並錯過您真正的價值。
            </p>

            <p className="text-foreground font-semibold mb-3">目前版本的問題：</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <span><strong>太長（6 行，最多應該 4 行）</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <span><strong>防禦性語氣（「直接適用於」）</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <span><strong>不清楚您實際瞄準什麼職位</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <span><strong>掩蓋了您最強的成就</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <span><strong>通用用語（「卓越營運」、「跨部門團隊」）</strong></span>
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">行動方案：重寫為 3-4 行緊湊的內容，說明：</p>
            <ol className="list-decimal list-inside space-y-1 mb-6 text-foreground">
              <li><strong>您是誰（職稱/職能）</strong></li>
              <li><strong>經驗年數 + 公司品牌</strong></li>
              <li><strong>前 2-3 項量化成就</strong></li>
              <li><strong>核心專長/專業領域</strong></li>
            </ol>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 建議改寫（選項 A - 營運經理重點）：</p>
              <p className="text-foreground">
                擁有 20 年 Microsoft 經驗的資深營運經理，專精於成長策略、客戶留存和卓越營運。在價值 $15M+ 的企業帳戶中實現 120%+ 投資組合成長，同時維持 100% 續約率。擅長數據驅動的管道管理、跨部門團隊領導和策略預測，以推動可衡量的業務成果。
              </p>
            </div>

            <p className="text-foreground font-semibold mb-3">為什麼這更好：</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span><strong>立即清楚您的工作內容</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span><strong>Microsoft 品牌放在最前面</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span><strong>第二行就有頂尖指標</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span><strong>具體專長，沒有類比說明</strong></span>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span><strong>自信、專業的語氣</strong></span>
              </li>
            </ul>

            {/* Alternative Options */}
            <div className="mt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">選項 B - 供應成長重點（如果瞄準 Uber/Grab）：</p>
                <p className="text-muted-foreground italic text-sm">
                  擁有 20 年 Microsoft 經驗的資深營運和成長經理，領導高價值投資組合擴展和留存策略。透過數據驅動的漏斗優化和跨部門團隊領導，在企業帳戶中達成 120%+ 成長和 100% 續約率。具備管道預測、利害關係人管理和卓越營運的專業能力。
                </p>
                <p className="text-sm text-foreground mt-3"><strong>為什麼這有效：</strong>強調「成長」以對應供應成長職位。「投資組合擴展」和「漏斗優化」暗示供應/市場平台經驗。仍然提到 Microsoft 品牌和關鍵指標。沒有防禦性語言或類比說明。</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">選項 C - 如果留在客戶成功：</p>
                <p className="text-muted-foreground italic text-sm">
                  擁有 20 年 Microsoft 經驗的資深客戶成功客戶經理，專精於企業客戶留存和投資組合成長。透過策略性採用路線圖和數據驅動的互動，在高價值帳戶中實現 120%+ 成長和 100% 續約率。擅長 C 級利害關係人管理、跨部門專案領導和業務轉型。
                </p>
                <p className="text-sm text-foreground mt-3"><strong>為什麼這有效：</strong>將您定位為資深 CS 領導者。強調企業和策略性工作。仍包含頂尖指標和 Microsoft 品牌。</p>
              </div>
            </div>

            {/* Summary Writing Formula */}
            <div className="bg-gold/10 rounded-lg p-4 mt-6 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">💡 摘要撰寫公式：</p>
              <p className="text-foreground text-sm">
                <strong>第 1 行：</strong>[職稱] with [X 年] at [公司], specializing in [核心職能]<br/>
                <strong>第 2 行：</strong>Delivered [頂尖指標] and [第二頂尖指標] across [規模/範圍]<br/>
                <strong>第 3 行：</strong>Expert in [技能 1], [技能 2], and [技能 3] to [業務成果]
              </p>
              <p className="text-sm text-muted-foreground mt-2">填入括號中的具體資訊，您每次都會有一個強而有力的摘要。</p>
            </div>

            {/* Principle Box */}
            <div className="bg-muted/30 rounded-lg p-4 mt-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 原則：</p>
              <p className="text-sm text-foreground mb-2"><strong>摘要最多 4-5 行</strong> - 較長的摘要會變成難以閱讀的文字牆。招募人員會略讀，所以 4 行緊湊的內容提供資訊而不會讓人不知所措。摘要應該回答：您是誰？在哪裡工作過？交付了什麼？擅長什麼？</p>
              <p className="text-sm text-foreground"><strong>基於證據，而非基於形容詞</strong> - 像「豐富經驗」這樣的形容詞沒有可衡量的價值。用成果取代形容詞（120% 成長、100% 續約率）創造更強大、可信的敘述，清楚展示影響力。</p>
            </div>
          </div>

          {/* Priority 3 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">優先項目 3 - 中等影響力 🟡</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">為工作經歷項目添加缺失的指標和背景</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼這很重要：</strong>有幾個項目只描述了活動，但沒有顯示規模或業務影響。沒有數字，您的成就就會與其他「與高管合作」或「領導業務審查」的人混在一起。
            </p>

            <p className="text-foreground font-semibold mb-3">需要修正的模式：許多項目說了您做了什麼，但沒有說：</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>多少/多大（規模）</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>什麼改變了（前後對比）</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>為什麼重要（業務影響）</strong>
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">需要指標的項目範例：</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">目前項目（模糊）：</p>
                <p className="text-foreground italic mb-3">"與高管合作設計策略性現代化和採用路線圖"</p>
                
                <p className="text-sm text-muted-foreground mb-2">需要回答的問題：</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>多少位高管？多高階？</strong></li>
                  <li>• <strong>多少份路線圖？針對多少價值的帳戶？</strong></li>
                  <li>• <strong>結果是什麼？（採用率%、營收影響、時間節省？）</strong></li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-2">✅ 更強的版本：</p>
                  <p className="text-foreground text-sm">"與 15+ 位 C 級高管合作，為價值 $8M+ 的帳戶設計策略性採用路線圖，在 6 個月內達成 85% 功能採用率，並將價值實現時間縮短 40%。"</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">目前項目（不完整）：</p>
                <p className="text-foreground italic mb-3">"設計並部署預測儀表板和穩健的管道分析，以提供策略性銷售決策參考"</p>
                
                <p className="text-sm text-muted-foreground mb-2">需要回答的問題：</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>多少個儀表板？多少人使用？</strong></li>
                  <li>• <strong>做出了什麼決策？什麼改變了？</strong></li>
                  <li>• <strong>可衡量的影響是什麼？</strong></li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-2">✅ 更強的版本：</p>
                  <p className="text-foreground text-sm">"設計並部署 5 個預測儀表板，供 40+ 位銷售主管使用，提升管道可見度並促進預測準確度提高 15%。"</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Detailed Section Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">詳細章節分析</h2>
          </div>

          {/* Section 1: Header */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">1</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">標題與聯絡資訊</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 完整的聯絡資訊：電話、電子郵件、地點、LinkedIn 都有</li>
                <li>• 專業的電子郵件：charlenelyc@gmail.com 乾淨且以姓名為基礎</li>
                <li>• 包含 LinkedIn URL：顯示您了解現代求職實務</li>
                <li>• 清楚的地點：「Taipei City, Taiwan」夠具體但不會給出完整地址</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 需要改進的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 電話號碼格式：「886 920187795」稍微難閱讀</li>
                <li>• 名字下方沒有職稱：招募人員無法立即知道您擔任/想要什麼職位</li>
                <li>• LinkedIn URL 未優化：使用預設格式（charlene-l-38621a11a）而非自訂</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">💡 如何修正</p>
              <p className="text-foreground text-sm mb-2"><strong>電話號碼：</strong>添加空格或連字號以提高可讀性</p>
              <p className="text-foreground text-sm mb-1">❌ 目前：886 920187795</p>
              <p className="text-foreground text-sm mb-3">✅ 改進：+886 920 187 795 或 +886-920-187-795</p>
              <p className="text-foreground text-sm mb-2"><strong>在您的名字下方添加定位行：</strong></p>
              <div className="bg-muted/50 p-3 rounded text-sm">
                <p className="font-bold">CHARLENE LEE</p>
                <p>資深營運經理 | 成長策略 | 客戶成功</p>
                <p className="text-muted-foreground">+886 920 187 795 | charlenelyc@gmail.com | Taipei City, Taiwan</p>
              </div>
            </div>
          </div>

          {/* Section 2: Format */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">2</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">格式與版面配置</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 單欄、ATS 友善的版面配置：沒有表格、圖形或會破壞解析的文字框</li>
                <li>• 乾淨、一致的設計（使用 Calibri/Arial/Helvetica，11-12 pt）</li>
                <li>• 清晰的章節標題：全部大寫，全文一致</li>
                <li>• 專業字體：乾淨、易讀、適當大小</li>
                <li>• 合理的長度：對於 20 年經驗，兩頁是正確的</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 需要改進的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 間距不一致：某些章節之間的空間比其他章節多</li>
                <li>• 字元編碼錯誤：「的」出現在第二個職位的英文文字中</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 原則</p>
              <p className="text-sm text-foreground">不一致的字體、間距或格式會讓履歷看起來雜亂且不專業。ATS 系統可能會誤讀裝飾性元素。所有章節的一致樣式創造一個精緻、值得信賴的印象，顯示您注重細節——這對營運職位至關重要。</p>
            </div>
          </div>

          {/* Section 3: Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">3</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">專業摘要</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 提到量化成就：120%+ 留存率、100% 續約率</li>
                <li>• 建立資深地位：「資深營運和客戶成功客戶經理」</li>
                <li>• 展示專業化：供應成長、互動、留存策略</li>
                <li>• 提到跨部門領導：工程、產品、支援</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 這是您最大的問題章節</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li><strong>1. 太長</strong> - 目前 6 行密集文字，最多應該 3-4 行。招募人員花 6-8 秒掃描，大多數人會跳過整段。</li>
                <li><strong>2. 過度解釋的語氣</strong> - 充滿辯解：「（直接適用於平台工作者/司機招募）」、「（類似於司機忠誠度）」。這些用語大喊「我正在轉職，不確定自己是否有資格」。</li>
                <li><strong>3. 沒有背景的通用流行語</strong> -「卓越營運」（過度使用、模糊）、「數據驅動」（每個人都這麼說）、「協調跨部門團隊」（標準用語）。</li>
                <li><strong>4. 不清楚目標職位</strong> - 您是營運經理？客戶成功經理？供應成長經理？招募人員無法判斷您想要什麼。</li>
                <li><strong>5. 缺少關鍵資訊</strong> - 多少年經驗？哪家公司？（Microsoft 應該被突出！）投資組合規模？</li>
              </ul>
            </div>
          </div>

          {/* Section 4: Key Achievements */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">4</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">主要成就</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 聰明地設置這個章節：將您最好的勝績放在頂部，招募人員一定會看到</li>
                <li>• 強而有力的指標：120%+、100%、20% 都令人印象深刻且具體</li>
                <li>• 項目符號格式：容易快速掃描</li>
                <li>• 展示多樣性：留存、獲取、分析、營運、領導力都有涵蓋</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 需要改進的部分</p>
              <p className="text-foreground text-sm mb-2">問題：每個項目都有括號說明，削弱了您的可信度</p>
            </div>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">目前項目 1：</p>
                <p className="text-foreground italic text-sm mb-2">"供應留存與成長（120%+）：在高價值投資組合中達成 100% 客戶續約，同時超越 120% 留存率和成長，證明建立可擴展、長期互動策略的能力（類似於司機忠誠度）。"</p>
                <p className="text-sm text-foreground mb-2"><strong>問題所在：</strong>「證明能力」- 防禦性語言；「（類似於司機忠誠度）」- 讓招募人員自己建立連結；缺少：多少客戶？什麼金額價值？</p>
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">✅ 項目 1 改寫：</p>
                  <p className="text-foreground text-sm">供應留存與成長：在 [數量] 個企業帳戶、價值 [$金額] ARR 中達成 100% 客戶續約和 120%+ 投資組合成長，實施主動互動策略和數據驅動的健康評分以降低流失風險。</p>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Core Skills */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">5</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">核心技能</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 組織良好：邏輯分組的技能，容易掃描</li>
                <li>• 硬技能和軟技能混合：數據分析、預測 + 利害關係人互動</li>
                <li>• 與目標職位相關：大多數技能適用於營運/供應/CS 職位</li>
                <li>• 提到具體工具/方法：KPI 分析、供需預測</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 需要改進的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 順序與目標職位不符：如果您瞄準營運/供應職位，應以營運技能為首</li>
                <li>• 「數位轉型與採用路線圖」非常偏客戶成功，對純營運職位沒有共鳴</li>
                <li>• 缺少一些營運術語：流程優化、資源配置、產能規劃、績效指標、工作流程自動化</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">💡 營運/供應職位的建議重新排序：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>1. 供需預測與管道開發</li>
                <li>2. 卓越營運與流程優化</li>
                <li>3. 數據驅動洞察與 KPI 分析</li>
                <li>4. 方案設計與激勵優化</li>
                <li>5. 跨部門協作與專案領導</li>
                <li>6. 利害關係人互動與影響力（C 級）</li>
                <li>7. 業務規劃與策略路線圖</li>
              </ul>
            </div>
          </div>

          {/* Section 6: Work Experience */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">6</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">工作經歷</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 整體做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 在 Microsoft 20 年：展示忠誠度、晉升、在複雜企業環境中工作的能力</li>
                <li>• 清晰的職稱：客戶成功客戶經理 vs 業務卓越營運</li>
                <li>• 量化成果：120%+ 成長、100% 續約、20% 時間減少</li>
                <li>• 展示跨部門領導：工程、交付、支援、銷售</li>
                <li>• 提到 C 級互動：展示策略性影響力</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 整體需要改進的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 第一個職位（2022-2025）只有 3 年但有 4 個項目；第二個職位（2005-2022）有 17 年但只有 4 個項目 - 比例不合理</li>
                <li>• 許多項目缺乏具體資訊：多少位高管/帳戶/專案？什麼金額影響或百分比改進？</li>
                <li>• 第二個職位有字元編碼錯誤</li>
                <li>• 不清楚您是獲得晉升還是只是換了部門</li>
              </ul>
            </div>

            {/* 6a. First Role */}
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">6a. 客戶成功客戶經理 | Microsoft Taiwan（2022年9月 - 2025年8月）</p>
              
              <p className="text-sm text-foreground mb-2"><strong>項目 1 需要改寫：</strong></p>
              <p className="text-foreground italic text-sm mb-2">"與高管合作設計策略性現代化和採用路線圖，直接影響高價值 B2B 投資組合的生命週期和長期互動。"</p>
              <div className="bg-gold/10 rounded-lg p-3">
                <p className="text-sm font-semibold text-gold mb-1">✅ 改寫：</p>
                <p className="text-foreground text-sm">與 [數量] 個企業帳戶（[$金額] ARR）的 [數量] 位 C 級高管合作設計策略性現代化路線圖，在 [時間範圍] 內達成 [%] 功能採用率，並將價值實現時間縮短 [%]。</p>
              </div>
            </div>

            {/* 6b. Second Role */}
            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">6b. 業務卓越營運 | Microsoft Taiwan（2005年6月 - 2022年9月）</p>
              
              <p className="text-sm text-foreground mb-2"><strong>主要問題：</strong></p>
              <ul className="space-y-1 text-foreground text-sm mb-3">
                <li>• 17 年壓縮成 4 個項目 - 太少細節</li>
                <li>• 要麼拆分為 2-3 個子職位顯示晉升，或添加更多項目顯示工作廣度</li>
              </ul>
              
              <div className="bg-gold/10 rounded-lg p-3">
                <p className="text-sm font-semibold text-gold mb-1">💡 建議結構變更：</p>
                <p className="text-foreground text-sm">拆分為晉升顯示成長：分析師 → 經理 → 資深經理 → 客戶經理。這清楚展示在一家公司 20 年的晉升（令人印象深刻！）</p>
              </div>
            </div>
          </div>

          {/* Section 7: Certifications */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">7</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">認證</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 四項 Microsoft 認證：展示持續學習和技術能力</li>
                <li>• 最新認證組合：Azure、M365、AI、Security 都是當前技術</li>
                <li>• 與科技職位相關：展示您了解雲端、AI、安全領域</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">❌ 需要改進的部分</p>
              <p className="text-foreground text-sm">缺少日期：您什麼時候獲得這些認證？</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">💡 如何修正 - 添加年份以顯示時效性：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Microsoft Certified: Azure Fundamentals (AZ-900), 2023</li>
                <li>• Microsoft Certified: Microsoft 365 Fundamentals (MS-900), 2023</li>
                <li>• Microsoft Certified: AI Fundamentals (AI-900), 2024</li>
                <li>• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900), 2024</li>
              </ul>
              <p className="text-sm text-muted-foreground mt-2">展示持續學習（2023-2024）、證明認證是當前的、展示保持相關性的承諾</p>
            </div>
          </div>

          {/* Section 8: Education */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-gold font-bold text-sm">8</span>
              </div>
              <h3 className="text-xl font-semibold text-foreground">教育</h3>
            </div>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ 做得好的部分</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 清晰的學位和學校：Finance, National Taipei University of Business</li>
                <li>• 相關主修：財務是營運/商業職位的堅實基礎</li>
                <li>• 乾淨的格式：簡單的一行列表</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 原則</p>
              <p className="text-sm text-foreground">中高階職位將教育放在最後。有 20 年的專業經驗，教育必須是最後一個部分。它的目的是驗證資格，而不是展示早期成就。工作經驗在這個階段比學術歷史更相關。</p>
            </div>
          </div>
        </section>

        {/* Before & After Showcase */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">前後對照展示</h2>
          </div>

          <p className="text-foreground mb-6">讓我展示當我們將這些原則應用於您的實際內容時的顯著改進。</p>

          {/* Example 1: Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">範例 1：專業摘要</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">之前 ❌</p>
              <p className="text-foreground text-sm italic">
                具有豐富科技和數位轉型經驗的資深營運和客戶成功客戶經理，專精於供應成長、互動和留存策略。擅長將數據驅動的獲取和生命週期管理原則應用於高價值客戶投資組合（直接適用於平台工作者/司機招募）。具有協調跨部門團隊（工程、產品、支援）以執行複雜、大規模計畫的能力，在快節奏環境中達成 120%+ 留存率和成長。擅長影響 C 級利害關係人並將策略轉化為卓越營運，以加速採用並達成可衡量的成長。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是弱的：</strong>🔴 6 行太長 🔴 多處括號中的類比 🔴 通用流行語 🔴 沒有提到 Microsoft 🔴 頂尖指標埋在段落中間 🔴 不清楚目標職位</p>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">之後 ✅</p>
              <p className="text-foreground text-sm italic">
                擁有 20 年 Microsoft 經驗的資深營運經理，推動成長策略、客戶留存和卓越營運。在價值 [$金額] 的企業帳戶中實現 120%+ 投資組合成長，同時維持 100% 續約率。擅長數據驅動的管道管理、跨部門團隊領導和策略預測，以達成可衡量的業務成果。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是強的：</strong>✅ 4 行完美長度 ✅ Microsoft 品牌突出 ✅ 第二行就有頂尖指標 ✅ 自信、清晰的定位 ✅ 沒有防禦性語言</p>
            </div>
          </div>

          {/* Example 2: Key Achievement */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">範例 2：主要成就項目</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">之前 ❌</p>
              <p className="text-foreground text-sm italic">
                獲取策略與分群：透過超越 120% 新供應/帳戶獲取率來擴大平台機會捕獲，利用數據驅動的漏斗分群和目標互動——經驗直接可轉移至司機招募。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是弱的：</strong>🔴「經驗直接可轉移至司機招募」大喊轉職/急切 🔴「擴大平台機會捕獲」不清楚 🔴 缺少：多少帳戶？什麼起點終點？</p>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">之後 ✅</p>
              <p className="text-foreground text-sm italic">
                獲取策略與成長：超越 120% 新帳戶獲取目標，透過數據驅動的漏斗分群和目標外展，在 [時間範圍] 內將企業投資組合從 [數量] 擴展到 [數量] 個客戶（[%] 成長）。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是強的：</strong>✅ 移除防禦性語言 ✅ 顯示具體數字前後對比 ✅ 包含時間範圍 ✅ 清晰的成長百分比</p>
            </div>
          </div>

          {/* Example 3: Work Experience */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">範例 3：工作經歷項目</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">之前 ❌</p>
              <p className="text-foreground text-sm italic">
                與高管合作設計策略性現代化和採用路線圖，直接影響高價值 B2B 投資組合的生命週期和長期互動。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是弱的：</strong>🔴「與高管合作」多少位？什麼級別？ 🔴「高價值 B2B 投資組合」多高？多少帳戶？ 🔴「直接影響」模糊，無法衡量</p>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">之後 ✅</p>
              <p className="text-foreground text-sm italic">
                與 [數量] 個企業帳戶（[$金額] ARR）的 [數量] 位 C 級高管合作設計策略性現代化路線圖，在 [時間範圍] 內達成 [%] 功能採用率，並將價值實現時間縮短 [%]。
              </p>
              <p className="text-sm text-foreground mt-3"><strong>為什麼這是強的：</strong>✅ 展示規模：高管數量、帳戶數量、金額價值 ✅ 具體級別：C 級 ✅ 可衡量結果：採用百分比和時間縮短</p>
            </div>
          </div>
        </section>

        {/* ATS Compliance Check */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileCheck className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS 合規檢查 ✅</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <p className="text-foreground mb-4">讓我根據 ATS（應徵者追蹤系統）要求評估您的履歷：</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">單欄版面配置：是，乾淨的單欄</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">標準字體：是，使用專業字體</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">無圖形/表格：是，純文字格式</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">關鍵字存在：是，但對營運職位可以更強</span>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">正確的章節標題：是，全部大寫，清晰</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">標準日期格式：是，全文一致</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">頁首/頁尾無關鍵資訊：正確</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-gold" />
                  <span className="text-foreground text-sm">聯絡資訊在頂部：是，全部存在</span>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-gold">ATS 分數：9/10 ✅</span>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-gold font-semibold mb-2">一個差距：</p>
              <p className="text-foreground text-sm mb-3">您的關鍵字密度對於營運/供應職位可以更高。目前偏重「客戶成功」語言。</p>
              <p className="text-sm font-semibold text-foreground mb-2">需要添加的營運關鍵字：</p>
              <div className="flex flex-wrap gap-2">
                <span className="px-2 py-1 bg-muted rounded text-sm">流程優化</span>
                <span className="px-2 py-1 bg-muted rounded text-sm">工作流程效率</span>
                <span className="px-2 py-1 bg-muted rounded text-sm">資源配置</span>
                <span className="px-2 py-1 bg-muted rounded text-sm">產能規劃</span>
                <span className="px-2 py-1 bg-muted rounded text-sm">績效指標</span>
              </div>
            </div>
          </div>
        </section>

        {/* Competitive Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Trophy className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">競爭力分析</h2>
          </div>

          <p className="text-foreground mb-6">這份履歷與其他營運經理候選人相比如何：</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-3">✅ 您相對於競爭對手的優勢：</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• <strong>在 Microsoft 20 年</strong> - 大多數候選人在多家公司總共有 5-10 年經驗。您的長期任職展示忠誠度和深厚的機構知識。</li>
                <li>• <strong>令人印象深刻的留存指標</strong> - 120%+ 成長和 100% 續約率真的很出色。</li>
                <li>• <strong>C 級利害關係人管理</strong> - 直接與高管互動並不普遍，尤其在營運職位。</li>
                <li>• <strong>跨部門領導</strong> - 協調工程、產品、支援顯示您可以橫向工作。</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-3">⚠ 您相對於競爭對手的差距：</p>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• <strong>客戶成功職稱</strong> - 對於純營運職位，您最近的職稱可能會引發是否適合的疑問。</li>
                <li>• <strong>有限的技術營運語言</strong> - 您的履歷強調客戶面對的工作。競爭對手可能展示更多系統/流程/分析工作。</li>
                <li>• <strong>沒有營運認證</strong> - 許多營運經理有 Six Sigma、PMP、Lean 或類似認證。</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <p className="text-gold font-semibold mb-3">什麼會讓您進入前 10%：</p>
            <ol className="list-decimal list-inside space-y-2 text-foreground">
              <li>重新定位為營運經理（移除客戶成功定位）</li>
              <li>添加 3-5 個更多營運指標（效率百分比、成本節省、流程改進）</li>
              <li>考慮獲得 Six Sigma Green Belt 或類似認證（3 個月線上課程）</li>
              <li>在摘要和主要成就中以營運成就為首</li>
              <li>針對每個特定公司/職位進行調整（添加他們的語言和優先事項）</li>
            </ol>
          </div>
        </section>

        {/* Final Notes */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">最後備註</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-foreground leading-relaxed mb-4">
              Charlene，您擁有在世界頂級公司之一取得真正成就的堅實基礎。您的挑戰不是缺乏經驗，而是展示方式。
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              您需要關注的核心問題是：停止為您的經驗道歉，停止為您的經驗辯解。移除那些類比。讓您的數字自己說話。如果您在 Microsoft 達成 100% 客戶續約和 120%+ 成長，這些成就在任何行業都令人印象深刻。您不需要解釋為什麼它們很重要。
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              實施這 3 個優先事項（大約 1-2 小時的工作），您的履歷將顯著提升。
            </p>

            <div className="border-t border-border mt-6 pt-6">
              <p className="text-muted-foreground">對回饋有任何問題嗎？有任何您希望我釐清或詳細說明的地方嗎？</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            履歷審閱 by James Bugden | <a href="mailto:james@james.careers" className="text-gold hover:underline">james@james.careers</a>
          </p>
        </footer>
      </main>
    </div>
  );
};

export default CharleneLeeReviewZhTw;
