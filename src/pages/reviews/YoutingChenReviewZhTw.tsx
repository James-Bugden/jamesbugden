import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Clock, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const YoutingChenReviewZhTw = () => {
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
            <a href="/downloads/YOUTING_CHEN_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Youting Chen</h1>
          <p className="text-cream/80 text-lg">產品總監，代幣上架 | OKX</p>
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
                <p className="text-3xl font-bold text-gold">85/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={85} label="修改前" size="md" />
                <ScoreGauge score={95} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷展現了卓越的產品領導力和加密貨幣交易專業知識，全篇都有強大的量化成就。基礎是紮實的。</p>
              <p>第一，缺少執行摘要。您迫使招募人員閱讀密集的經驗要點才能理解您的價值。開頭 3-4 句摘要可以立即定位您的專業知識和關鍵成就。</p>
              <p>第二，QR 碼用途不明確。頁首的 QR 碼缺乏說明。招募人員不會掃描未知的 QR 碼。要麼移除，要麼加上清楚的說明。</p>
              <p>第三，技能區塊過於籠統，削弱影響力。「問題解決」和「利害關係人管理」等廣泛假設沒有差異化。應替換為針對角色的技術技能和加密/Web3 工具。</p>
              <p className="text-gold font-semibold">您在 Bybit 管理 8 位 PM、$15 億 AUM 恢復、Orderly 做市基礎設施、幣安成長計畫和匯豐財富管理的領導經驗，構成了令人信服的敘事。問題不在於您的經驗，而在於迫使招募人員自己去挖掘。</p>
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
                  <span className="text-foreground"><strong>全篇強大的量化成就</strong>：Bybit $15 億 AUM 恢復、Orderly 山寨幣交易量擴展 6 倍、幣安現貨市場份額貢獻 0.6%、TapPay 季度成長 30% 展現清晰的業務影響和具體指標</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>領導規模清楚說明</strong>：管理 8 位產品經理、協調 30 多家做市商、監督 20 多家 DEX 建設者，展現適合總監級職位的職責範圍</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>加密原生經驗深度</strong>：3 年以上在 Bybit、Orderly 和幣安的經驗，涵蓋 CEX 運營、DeFi 流動性、代幣上架、做市和合規，完全符合 OKX 要求</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>乾淨格式和超連結公司名稱</strong>：公司名稱連結到網站（雖然超連結應該用底線和藍色更明顯）增加專業度和背景資訊</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>漸進式職涯發展</strong>：從共同創辦人到匯豐培訓生到幣安運營到副總裁到產品主管的清晰晉升，展現持續成長和增加的責任</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>雙語能力</strong>：中國文學背景加上國際教育，為需要中英雙語的香港/亞太地區職位提供良好定位</span>
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
                  <span className="text-foreground"><strong>沒有執行摘要來框架經驗</strong>：履歷直接跳入經驗區塊，迫使招募人員拼湊您的價值主張，而非立即看到帶有關鍵指標的陳述</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>QR 碼未說明造成困惑</strong>：頁首的 QR 碼沒有說明，招募人員不會掃描未知 QR 碼，要麼移除要麼加上清楚標籤如「LinkedIn QR」</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技能區塊過於籠統沒有價值</strong>：「分析和問題解決技能」、「利害關係人管理」、「溝通技能」是任何總監級職位的基本假設，應替換為具體技術技能和加密工具</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>超連結不明顯可點擊</strong>：公司名稱連結存在但沒有底線和藍色標準，讀者不會知道它們可以點擊，錯失提供背景資訊的機會</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Bybit 角色有兩個填充要點</strong>：「建立關鍵指標、監控系統和儀表板」和「跨部門協作推出新產品」缺乏具體成果或差異化，讀起來像基本職責</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少 OKX 特定關鍵字</strong>：職位描述強調「上架/下架流程」、「風險管理」、「代幣上架行銷」、「Web3 業務團隊」、「團隊管理」，這些應該明確出現在履歷中</span>
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
            我們找出策略性轉變，以最佳方式為您定位 OKX 的產品總監職位。以下是影響最大的改變：
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 新增執行摘要</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增執行摘要以立即展示價值</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（完全缺失）：</p>
                <p className="text-muted-foreground text-sm">履歷直接跳入經驗區塊，沒有開頭的價值主張。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm italic">擁有 5 年以上加密原生經驗的產品領導者，專注於 CEX/DEX 運營、代幣上架和流動性管理。在 Bybit 管理 8 位 PM 團隊恢復 $15 億 AUM，在 Orderly 將山寨幣交易量擴展 6 倍，在幣安貢獻 0.6% 現貨市場份額。專精於做市基礎設施、代幣經濟學、風險管理和合規框架。尋求領導 OKX 代幣上架策略，驅動收入成長和市場定位。</p>
              </div>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 技能區塊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">用加密特定技術技能替換籠統技能</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（籠統軟技能）：</p>
                <p className="text-muted-foreground text-sm">分析和問題解決技能、利害關係人管理、溝通技能</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（加密特定技能）：</p>
                <p className="text-foreground text-sm">代幣經濟學、做市、流動性管理、DeFi 協議、CEX/DEX 運營、合規框架、風險管理、智能合約審計、Web3 商業發展</p>
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
                  <p className="text-muted-foreground text-sm">3-4 句摘要，包含經驗年資、專業領域、前 3 項量化成就、關鍵專業領域</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">處理 QR 碼</p>
                  <p className="text-muted-foreground text-sm">加上標籤「LinkedIn QR」或完全移除</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">替換技能區塊</p>
                  <p className="text-muted-foreground text-sm">用加密特定技術技能替換籠統軟技能</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">精簡 Bybit 要點</p>
                  <p className="text-muted-foreground text-sm">從 8 個減到 4-5 個最高影響力要點，移除填充內容</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-foreground">加入 OKX 關鍵字</p>
                  <p className="text-muted-foreground text-sm">在經驗要點中策略性加入職位描述中的關鍵術語</p>
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

export default YoutingChenReviewZhTw;
