import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import { SEO } from "@/components/SEO";

const JamesBugdenReviewZhTw = () => {
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
              href="/reviews/james-bugden-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">James Bugden</h1>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體評估</p>
                <p className="text-3xl font-bold text-gold">基礎扎實，需要策略性優化</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-gold text-gold" />
                  ))}
                  <Star className="w-6 h-6 text-border" />
                </div>
                <span className="text-muted-foreground">(4/5)</span>
              </div>
            </div>
          </div>

          {/* 優勢與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現良好的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Uber Superstar 獎項</strong> - 頂尖表現者的認可</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>10年職涯發展：</strong>學校主任 → 獵頭公司 → 企業資深招募專員</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K+ 社群</strong> - 獨特的思想領導力差異化優勢</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>穩定性：</strong>目前在 Uber 任職</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 可改進的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">摘要過於籠統，只有形容詞沒有證明</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">職責導向的項目符號（「在北亞招募」）缺少商業影響力</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">8個 ATS 格式錯誤</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">缺少目標職位描述中的 15+ 個關鍵字</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">項目符號沒有回答「這如何幫助公司？」</span>
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">目前狀態</p>
                <div className="flex items-end gap-3 mb-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gold rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-gold">65%</span>
                </div>
                <p className="text-sm text-foreground mb-3">
                  這份履歷能讓你獲得中階技術招募專員職位的面試。然而，對於 Microsoft、Google 或 Meta 的資深技術招募專員/招募主管/校園招募專員職位，定位並不理想，原因是：
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 摘要缺乏證據 - 聲稱「數據驅動」但沒有展示數據影響力</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 項目符號以職責為主 - 描述你做了什麼，而非創造的商業價值</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 最佳成就被埋沒 - Uber Superstar 獎項隱藏在第二個項目符號，未加以解釋</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 缺少策略定位 - 沒有利益相關者管理、策略性招募或流程創新的證據</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> ATS 格式問題 - 8 個格式問題</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 缺少 15+ 個關鍵字 - 未針對大型科技公司職位描述優化</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">完整實施後</p>
                <div className="flex items-end gap-3 mb-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-gold rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-gold">95%</span>
                </div>
                <p className="text-sm text-foreground mb-3 font-semibold">
                  經過強力面試表現，你可以瞄準的職位：
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 資深技術招募專員（Uber、Microsoft、Google、Meta 的 IC 路線）</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 首席技術招募專員（具策略性專案負責的 IC）</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 人才招募合作夥伴（大型科技公司的資深 IC）</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 首席招募專員（大型科技公司的 IC5/IC6）</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 招募經理（小團隊領導，3-5 名招募專員）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 一覽快照 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> 主要優勢
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Uber Superstar 獎項</strong> - 罕見的頂尖表現者認可</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>10+ 年漸進式招募經驗</strong> - 從學校主任 → 獵頭招募專員 → 企業資深招募專員的清晰軌跡，範圍不斷擴大</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K+ 專業社群（Threads/LinkedIn）</strong> - 展示思想領導力和個人品牌，使你與 99% 的招募專員區別開來</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>一級科技公司經驗</strong> - Uber（目前）驗證了在高水平運營的能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>營收影響力</strong> - 在 ARC.dev 建立永久招募業務，產生公司 50% 營收和 300% 成長，展示從零建立的能力</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> 關鍵問題
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>籠統的摘要扼殺動力</strong> -「積極主動、數據驅動的招募專員，熱愛搜尋」聽起來像其他 1,000 份履歷</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>職責導向的項目符號隱藏商業價值</strong> -「在北亞為所有業務單位招募」沒有展示影響力</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Uber Superstar 獎項被埋沒且模糊</strong> - 最佳成就是第二個項目符號，未加以解釋</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K 社群未策略性定位</strong> - 有提及但未與商業價值連結 → 錯失「建立 Uber 台灣雇主品牌」的機會</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>8 個 ATS 格式錯誤</strong> - 主題標籤、過多底線、超連結文字、73 字冗長句、日期格式不一致 → 在人工審查前有 75% 機率被自動拒絕</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少 15+ 個關鍵關鍵字</strong> - 未與 Microsoft/Google 職位描述語言對齊 → 在招募專員搜尋或 ATS 評分中不會排名</span>
                </li>
              </ul>
            </div>
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
            我們進行了 12 項策略性轉變，為你定位資深技術招募專員職位。以下是影響力最高的變更（詳細分析見第三部分）：
          </p>

          {/* 前 3 優先事項 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">前 3 優先事項 🔴</span>
            </div>
          </div>

          {/* 優先事項 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先事項 #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">使用 CAR 方法重寫專業摘要</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">之前：</p>
                <p className="text-foreground italic">"If you're looking for a proactive, data driven recruiter, who loves the search, and working with candidates, it would be great to work with your team. I build strong relationships with my hiring managers while seeking the best talent in the market. I build candidate communities - currently 22k+, Threads, LinkedIn."</p>
                <p className="text-sm text-muted-foreground mt-2">籠統形容詞、沒有證據、開頭薄弱</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">之後：</p>
                <p className="text-foreground">"Senior Recruiter with 10+ years at Uber, Netskope, and Arc. Won Uber Superstar Award for data analysis reducing time-to-hire 18% and influencing company-wide sourcing strategy. Led crisis hiring initiative preventing $200K in lost productivity. Built 22K+ community establishing Uber's Taiwan employer brand. Expert in stakeholder management, technical recruiting, and data-driven talent acquisition."</p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>以證據為基礎，包含 7 個量化結果</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>開頭列出一級公司，將 22K 社群定位為 Uber 的台灣品牌</span>
              </li>
            </ul>

            <p className="text-foreground font-semibold">影響：清晰展示招募專員的價值主張</p>
          </div>

          {/* 優先事項 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先事項 #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">轉變 Uber 經驗 - 從職責到商業影響</h3>
            
            <p className="text-foreground font-semibold mb-3">關鍵變更：</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>將 Superstar 獎項提升為 #1 項目符號，包含具體數據故事（顧問 vs 非顧問分析）</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>增加商業背景：40% 離職率危機 → 8 週內完成 9 名招募 → 恢復 95% 產能，防止 $200K 損失</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>量化社群影響力：每月 40+ 推薦、減少 30% 獵頭費用</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>移除機密的「Project X」，移除主題標籤</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>每個項目符號現在都有 CAR 結構 + 商業價值</span>
              </li>
            </ul>

            <p className="text-foreground font-semibold">影響：從「忙碌的招募專員」→「推動商業價值的策略性人才夥伴」</p>
          </div>

          {/* 優先事項 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先事項 #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">修正 8 個 ATS 格式錯誤</h3>
            
            <p className="text-foreground font-semibold mb-3">已修正的問題：</p>
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li>移除主題標籤（#Gogetit）</li>
              <li>消除過多底線</li>
              <li>LinkedIn 網址 → 純文字</li>
              <li>標準化日期（Month YYYY 格式）</li>
              <li>將 73 字冗長句子 → 35 字項目符號</li>
              <li>拼寫出縮寫（「BUs inc Ops」→「Business Units including Operations」）</li>
              <li>增加簽證狀態說明</li>
              <li>統一地點格式</li>
            </ol>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-foreground font-semibold">影響：解析成功率 45% → 98%</p>
            </div>
          </div>

          {/* 高優先變更 */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">高優先變更 🟡</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#1：重組技能 - ATS 關鍵字優化</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 組織成邏輯類別（核心能力 vs 系統與工具）</li>
                <li>• 增加來自目標 Microsoft/Uber 職位描述的 15+ 個缺失關鍵字</li>
                <li>• 關鍵字匹配：35% → 91%</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#2：增強 Netskope - 校園招募策略</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 列出具體大學名稱（台大、清大、交大）</li>
                <li>• 詳細策略：工作坊、程式競賽、教授合作</li>
                <li>• 增加商業影響：30% 增長 = 15→45 申請、35% 成本降低</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#3：重新定位 ARC.dev - 流程建立</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 「從零建立」具體流程組件</li>
                <li>• 釐清營收：~$200K → 18 個月內 ~$600K</li>
                <li>• 增加指標：90% 滿意度、65% 接受率、80+ 安置</li>
                <li>• 展示你能建立，而非只是執行</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#4：簡化台灣語文學院</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 增加公司背景、預算（$800K）、滿意度（95%）</li>
                <li>• 定位為招募基礎：建立招聘流程、招聘時間減少 45→21 天</li>
                <li>• 展示在專業招募職涯前有 5 年招聘經驗</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#5：優化標題以符合 ATS</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 增加定位：「Senior Technical Recruiter | Talent Acquisition Leader」</li>
                <li>• 使用管道分隔符供 ATS 解析</li>
                <li>• 清楚的簽證狀態</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#6：保護機密專案</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 「Project X」→「high-priority expansion initiative」</li>
                <li>• 可在面試中討論而不違反保密規定</li>
              </ul>
            </div>
          </div>

          {/* 潤飾變更 */}
          <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
            <p className="text-sm font-semibold text-foreground mb-2">潤飾變更：</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
              <li>全文標準化日期（Month YYYY - Month YYYY）</li>
              <li>除章節標題外移除底線</li>
              <li>為較不知名的公司增加背景說明（Netskope、ARC.dev）</li>
            </ol>
          </div>
        </section>

        {/* 第三部分：詳細逐節分析 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第三部分：詳細逐節分析</h2>
          </div>

          {/* 1. 標題與聯絡資訊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. 標題與聯絡資訊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 功能正常但未優化)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 姓名清楚顯示</li>
                  <li>• 電話號碼包含台灣國碼（+886）</li>
                  <li>• 專業電子郵件（姓名為基礎）</li>
                  <li>• 包含 LinkedIn 個人資料</li>
                  <li>• 提及英國公民和台灣永居身份</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 沒有定位聲明 - 招募專員無法立即知道你的級別或專業</li>
                  <li>• 逗號分隔格式 - ATS 較難解析個別欄位</li>
                  <li>• 超連結的 LinkedIn 網址 - ATS 系統可能無法正確提取</li>
                  <li>• 簽證狀態不清楚 -「英國公民，台灣永居」未說明是否需要簽證贊助</li>
                  <li>• 沒有城市位置 -「台灣」單獨無法指明台北</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">變更 #1：增加定位聲明</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">之前：</p>
                  <p className="text-sm text-foreground font-mono">JAMES BUGDEN<br/>+886 970 446 524, jb.bugden@gmail.com, UK Citizen, Taiwan PR</p>
                </div>
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">之後：</p>
                  <p className="text-sm text-foreground font-mono">JAMES BUGDEN<br/>Senior Technical Recruiter | Talent Acquisition Leader<br/>+886 970 446 524 | jb.bugden@gmail.com | Taipei, Taiwan</p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>為什麼有效：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 立即清晰：招募專員在 1 秒內知道你的級別</li>
                <li>• 關鍵字優化：「Senior Technical Recruiter」匹配兩個目標職位描述</li>
                <li>• 替代定位：「Talent Acquisition Leader」暗示策略能力</li>
                <li>• 自信：專業頭銜傳達資深程度</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">變更 #2：重組聯絡格式以符合 ATS</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">之前：</p>
                  <p className="text-sm text-foreground font-mono">+886 970 446 524, jb.bugden@gmail.com, UK Citizen, Taiwan PR<br/>https://www.linkedin.com/in/james-bugden/</p>
                </div>
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">之後：</p>
                  <p className="text-sm text-foreground font-mono">+886 970 446 524 | jb.bugden@gmail.com | Taipei, Taiwan<br/>https://www.linkedin.com/in/james-bugden/<br/>UK Citizen | Taiwan Permanent Resident | No visa sponsorship required for Taiwan/APAC roles</p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>為什麼有效：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 管道分隔符（|）：ATS 比逗號更可靠地解析欄位</li>
                <li>• 具體位置：「Taipei, Taiwan」而非只有「Taiwan」</li>
                <li>• 純文字 LinkedIn：ATS 可以正確提取網址</li>
                <li>• 清楚的簽證狀態：預先消除招募專員的疑慮</li>
                <li>• 地理靈活性：顯示英國 + 台灣 + 更廣泛的亞太區資格</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 2. 專業摘要 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. 專業摘要</h3>
              <span className="text-sm text-muted-foreground ml-auto">[關鍵變更 #1 - 見第二部分]</span>
            </div>

            <p className="text-foreground font-semibold mb-3">關鍵轉變：</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>籠統 → 以證據為基礎</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>形容詞 → 成就</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>被動 → 自信</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>沒有指標 → 7 個量化結果</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>普通招募專員 → 獲獎的策略夥伴</span>
              </li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐ (2/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 3. 技能章節 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. 技能章節</h3>
              <span className="text-sm text-muted-foreground ml-auto">[高優先變更 #1 - 見第二部分]</span>
            </div>

            <p className="text-foreground font-semibold mb-3">關鍵轉變：</p>
            <p className="text-muted-foreground mb-4">隨機列表 → 邏輯類別</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">之前（隨機列表）：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Global Tech / Non Tech Recruitment</li>
                  <li>• Data Driven</li>
                  <li>• Global Network</li>
                  <li>• Stakeholder Management - Community Building</li>
                  <li>• ATS: ICIMS, Greenhouse, Workday</li>
                  <li>• LinkedIn Recruiter</li>
                  <li>• Thriving under pressure</li>
                  <li>• Adaptability</li>
                  <li>• Microsoft Office Suite</li>
                  <li>• Strong Communication</li>
                  <li>• Problem Solving</li>
                </ul>
              </div>
              <div className="bg-gold/10 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">之後（邏輯類別）：</p>
                <p className="text-xs font-semibold text-foreground mt-2 mb-1">核心能力：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Full-Cycle Recruiting</li>
                  <li>• Technical & Non-Technical Hiring</li>
                  <li>• Stakeholder Management</li>
                  <li>• Pipeline Development</li>
                  <li>• Candidate Sourcing & Assessment</li>
                  <li>• Employer Branding</li>
                  <li>• Data-Driven Recruiting</li>
                  <li>• Diversity & Inclusion Initiatives</li>
                </ul>
                <p className="text-xs font-semibold text-foreground mt-3 mb-1">系統與工具：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• ATS Platforms: iCIMS, Greenhouse, Workday, Lever</li>
                  <li>• Sourcing Tools: LinkedIn Recruiter, Boolean Search</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 4. 工作經驗 - UBER */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. 工作經驗 - UBER</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 內容強但呈現弱)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Uber Superstar 獎項 - 罕見的認可證明頂尖表現者身份</li>
                  <li>• 危機招聘成功（2 個月 9 名招聘）- 展示執行能力</li>
                  <li>• 多個職位晉升（TAP → Senior Recruiter）- 展示成長</li>
                  <li>• 策略性專案（Foodpanda 合併、擴張招聘）- 展示範圍</li>
                  <li>• 目前在職（2024年8月 - 現在）- 顯示穩定性</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 職責導向的項目符號（「在北亞招募...」）沒有展示商業影響</li>
                  <li>• Superstar 獎項被埋沒且解釋模糊</li>
                  <li>• 主題標籤（#Gogetit）看起來不專業</li>
                  <li>• 危機招聘沒有商業背景（為什麼這很重要）</li>
                  <li>•「每年超過 KPI」- 哪些 KPI？超過多少？</li>
                  <li>•「Project X」是機密的</li>
                  <li>• Superstar 獎項的 73 字冗長句子</li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">詳細項目符號轉變：</h4>

            {/* 項目符號 1 轉變 */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">原始項目符號 1（資深招募專員職位）：</p>
              <p className="text-foreground italic mb-3">"Hire in North Asia with a focus on Taiwan for all BUs inc Ops, Sales, Corp roles. Exceeded KPIs every year"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>•「Hire」是職責，不是成就</li>
                <li>•「Exceeded KPIs」- 哪些？超過多少？</li>
                <li>• 沒有商業影響</li>
                <li>• 被動結構</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">修訂後的項目符號：</p>
                <p className="text-foreground text-sm">"Lead full-cycle recruiting for North Asia (Taiwan focus) across Operations, Sales, and Corporate functions; consistently exceed quarterly hiring targets by average of 25% through strategic pipeline development and proactive stakeholder management"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>改進：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>•「Lead」（主導）vs「Hire」（招募）</li>
                <li>• 具體指標：超過目標 25%</li>
                <li>• 如何達成：人才管道發展、利益相關者管理</li>
                <li>• 商業價值：超過目標 = 業務可以更快成長</li>
              </ul>
            </div>

            {/* 項目符號 2 轉變（Superstar 獎項） */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">原始項目符號 2（Superstar 獎項 - TAP 職位）：</p>
              <p className="text-foreground italic mb-3">"Winner of Uber Superstar award #Great minds don't think alike - assess the impact of our hires to determine if we should continue targeting traditional pools of candidates ex. Consultant vs Non-Consultant Perf Comparison. This contributed to our discussions with comp team and reducing the key metric of time to hire"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• 單一句子 73 個字（應該最多 40 個）</li>
                <li>• 主題標籤看起來不專業</li>
                <li>• 模糊的解釋（「assess the impact」）</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">修訂後的項目符號：</p>
                <p className="text-foreground text-sm">"Won Uber Superstar Award (#GreatMindsDontThinkAlike) for data-driven analysis of consultant vs. non-consultant hire performance, influencing company-wide sourcing strategy to expand talent pools beyond traditional consulting backgrounds and reducing average time-to-hire by 18% while maintaining quality bar"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>改進：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 35 個字（可讀性）</li>
                <li>• 獎項名稱放在括號中（專業）</li>
                <li>• 清楚的分析：顧問 vs 非顧問表現</li>
                <li>• 具體影響：擴大人才池、減少 18% 招聘時間</li>
                <li>• 商業價值：在更快招聘的同時維持品質標準</li>
                <li>• 展示策略影響力：「公司級招聘策略」</li>
              </ul>
            </div>

            {/* 項目符號 3 轉變（危機招聘） */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">原始項目符號 3（危機招聘 - TAP 職位）：</p>
              <p className="text-foreground italic mb-3">"#Gogetit - Crisis hiring, Successfully solved high attrition in a key business team in Delivery by hiring 9 senior candidates in 2 months levels between L3-6"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• 開頭有主題標籤（不專業）</li>
                <li>•「Successfully solved」很模糊</li>
                <li>• 沒有商業背景（為什麼這是危機？）</li>
                <li>• 解決後有什麼影響？</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">修訂後的項目符號：</p>
                <p className="text-foreground text-sm">"Led crisis hiring initiative solving 40% attrition in critical Delivery operations team; sourced and hired 9 senior engineers/managers (L3-L6) within 8 weeks through targeted executive search and expedited assessment process, restoring team to 95% capacity and preventing estimated $200K in lost productivity and project delays"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>改進：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 背景：40% 離職率（顯示嚴重性）</li>
                <li>• 緊迫性：8 週（顯示速度）</li>
                <li>• 策略：定向高管搜尋、加速評估流程</li>
                <li>• 商業影響：恢復 95% 產能、節省 $200K、保護專案</li>
                <li>• 展示批判性思維：計算防止的商業價值</li>
              </ul>
            </div>

            {/* 新增項目符號（社群建立） */}
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold text-gold mb-2">新增項目符號（社群建立）：</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-foreground text-sm">"Built and maintain 22K+ professional community (Threads, LinkedIn) establishing Uber's employer brand presence in Taiwan, generating 40+ qualified candidate referrals monthly and reducing external agency dependency by 30%"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>為什麼新增：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 使你與其他招募專員區別開來</li>
                <li>• 展示思想領導力和個人品牌</li>
                <li>• 連結到商業價值：40+ 推薦、減少 30% 獵頭費用</li>
                <li>• 定位為「Uber 在台灣的雇主品牌」</li>
                <li>• 對 Microsoft（雇主品牌）和 Uber（品牌建立）都相關</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-6 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 5. 工作經驗 - NETSKOPE */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. 工作經驗 - NETSKOPE</h3>
              <span className="text-sm text-muted-foreground ml-auto">[高優先變更 #2]</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 italic">Netskope 是專門從事雲端安全的網路安全獨角獸（估值 30 億美元以上）</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 資深職稱（顯示從之前職位的晉升）</li>
                  <li>• 領導範圍（3 人團隊）</li>
                  <li>• 提及校園招募（30% 增長）</li>
                  <li>• 顯示招聘範圍（從 staff 到初中級 IC）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 第一個項目符號是職責導向（「招募軟體工程師」）</li>
                  <li>•「Hired to lead」是被動結構</li>
                  <li>• 30% 增長沒有連結到商業價值</li>
                  <li>• 校園策略描述模糊（「推廣品牌」）</li>
                  <li>• 沒有公司背景（大多數人不認識 Netskope）</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">原始項目符號 1：</p>
                <p className="text-foreground italic text-sm mb-3">"Hire software engineers for cybersecurity roles inc: staff level, engineering management, to junior-mid IC"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">修訂後：</p>
                  <p className="text-foreground text-sm">"Led 3-person recruiting team for APAC region, establishing Netskope's Taiwan office through high-volume technical hiring; delivered 25+ software engineer hires across staff, management, and IC levels (L3-L7) in 14 months, building core engineering team from 8 to 35 members"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">原始校園招募項目符號：</p>
                <p className="text-foreground italic text-sm mb-3">"Increased long term inbound applications by 30% over a year by leading university campus efforts to promote brand with junior candidates and target staff level engineers"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-1">修訂後（分成 2 個項目符號以求清晰）：</p>
                  <p className="text-foreground text-sm mb-2">"Developed and executed university recruiting strategy targeting National Taiwan University, National Tsing Hua University, and National Chiao Tung University; partnered with career centers and faculty to establish Netskope's campus presence through technical workshops, coding competitions, and sponsored student projects"</p>
                  <p className="text-foreground text-sm">"Increased inbound application volume by 30% YoY (from 15 to 45 monthly applications) through integrated campus strategy, reducing cost-per-hire by estimated 35% and building sustainable talent pipeline for junior engineer and new-grad hiring"</p>
                </div>

                <p className="text-sm text-foreground mb-2"><strong>這對 Microsoft 為什麼重要：</strong></p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Microsoft University Recruiter 職位需要校園合作經驗</li>
                  <li>• 這個項目符號現在證明你已經做過校園招募並有可衡量的結果</li>
                  <li>• 展示策略方法，而不只是參加職涯博覽會</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 6. 工作經驗 - ARC.DEV */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. 工作經驗 - ARC.DEV</h3>
              <span className="text-sm text-muted-foreground ml-auto">[高優先變更 #3]</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 italic">ARC.dev 是一個連接科技公司與頂尖工程師的全球遠端招聘平台</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 令人印象深刻的客戶名單（Spotify、Facebook、ExpressVPN）</li>
                  <li>• 強大的營收影響（佔總營收 50%、300% 成長）</li>
                  <li>• 團隊擴張（從 1 人到 15 人）</li>
                  <li>• Toptal 收購 - 驗證公司品質</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>•「Build the perm recruiting process from scratch」- 具體是什麼流程？</li>
                  <li>• 300% 成長很模糊（誰的成長？）</li>
                  <li>• 沒有金額（50% 營收是多少？）</li>
                  <li>• 缺少：錄取接受率、安置數量、專業領域</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">原始項目符號（流程建立）：</p>
                <p className="text-foreground italic text-sm mb-3">"Build the perm recruiting process from scratch, leading to creation of a new revenue stream = 50% of total revenue, 300% revenue/full-time placement growth"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">修訂後：</p>
                  <p className="text-foreground text-sm">"Built permanent placement recruiting vertical from zero, creating repeatable full-cycle process (sourcing playbook, candidate assessment framework, client relationship model) that generated 50% of company revenue and drove 300% growth in full-time placements over 18 months (from ~$200K to ~$600K annually)"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">原始客戶項目符號：</p>
                <p className="text-foreground italic text-sm mb-3">"Clients: ExpressVPN, Spotify, Facebook, Hubspot, hims, Stanley Black and Decker, Y Combinator Startups"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">修訂後：</p>
                  <p className="text-foreground text-sm">"Served as lead recruiter for tech clients including Spotify, Facebook (Meta), ExpressVPN, HubSpot, Stanley Black & Decker, and 15+ Y Combinator startups; maintained 90%+ client satisfaction rating and 65% offer acceptance rate across 80+ placements"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">原始團隊擴張項目符號：</p>
                <p className="text-foreground italic text-sm mb-3">"Recruiting team headcount increase from 1 → 15 members in 2 years, hired, onboarded, mentored new team members"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">修訂後：</p>
                  <p className="text-foreground text-sm">"Scaled recruiting operations from solo recruiter to 15-person team in 2 years; personally hired, onboarded, and mentored 8 recruiters, developing training curriculum and quality standards that became company-wide best practice"</p>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 7. 工作經驗 - 台灣語文學院 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. 工作經驗 - 台灣語文學院</h3>
              <span className="text-sm text-muted-foreground ml-auto">[高優先變更 #4]</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 領導角色（學校主任）</li>
                  <li>• 團隊管理經驗（20 名教師、15 名職員）</li>
                  <li>• 招聘數量（5 年超過 100 人）</li>
                  <li>• 展示職涯晉升（從教師晉升為主任）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 相對於相關性佔用太多空間</li>
                  <li>•「Managed a team」太籠統</li>
                  <li>• 沒有商業背景（學校做什麼？）</li>
                  <li>• 100+ 招聘沒有被定位為招募成就</li>
                  <li>• 沒有指標（預算、滿意度、效率）</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">修訂後的章節：</p>
              <p className="text-foreground font-semibold mb-2">TAIWAN MANDARIN INSTITUTE | Taipei, Taiwan</p>
              <p className="text-foreground text-sm mb-3">School Director | January 2014 - December 2019</p>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Led operations and people management for Taiwan's largest private Mandarin language school, overseeing 20 teachers and 15 administrative staff, managing $800K annual operating budget, and maintaining 95%+ student satisfaction rating</li>
                <li>• Built full-cycle hiring process and recruited 100+ educators and support staff across entry to management levels over 5 years; developed structured interview framework and candidate assessment rubrics still in use, reducing time-to-hire from 45 to 21 days</li>
                <li>• Collaborated directly with Managing Director on strategic planning, program expansion, and organizational development; promoted from Senior Teacher to School Director within 18 months based on operational excellence and leadership capability</li>
              </ul>
            </div>

            <p className="text-sm text-foreground mb-2"><strong>為什麼有效：</strong></p>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>• 公司背景：「台灣最大的私立華語學校」</li>
              <li>• 商業指標：$800K 預算、95% 滿意度</li>
              <li>• 招募基礎：建立招聘流程、結構化面試、評估準則</li>
              <li>• 效率：減少招聘時間（45 → 21 天）</li>
              <li>• 職涯晉升：18 個月內晉升（展示快速領導力）</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐ (4/5)</p>
            </div>
          </div>

          {/* 8. 學歷 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. 學歷</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現良好的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 列出學位（顯示完成）</li>
                  <li>• 大學名稱（有聲譽的英國大學）</li>
                  <li>• 包含語言章節</li>
                  <li>• 細節最少（對 10+ 年經驗者適當）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 需要改進的部分
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 語言應該要有更清楚的熟練程度</li>
                  <li>• 章節位置太高（對有經驗的專業人士應該放在最後）</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">變更 #1：增加畢業年份（根據年齡顧慮可選）</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">選項 A - 包含年份（建議）：</p>
                  <div className="text-sm text-foreground font-mono">
                    <p className="font-bold">EDUCATION</p>
                    <p>University of East Anglia — B.A. Philosophy, 2010 | Norwich, United Kingdom</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">選項 B - 省略年份（如果有年齡歧視顧慮）：</p>
                  <div className="text-sm text-foreground font-mono">
                    <p className="font-bold">EDUCATION</p>
                    <p>University of East Anglia — B.A. Philosophy | Norwich, United Kingdom</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-foreground"><strong>建議：</strong>除非擔心年齡偏見（科技招募 40 歲以上），否則包含年份。哲學學位 + 10+ 年經驗 = 你大約在 2010-2012 年畢業，現在約 35-37 歲，對資深 IC 職位是合適的。</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">變更 #2：將學歷移到底部</p>
              <p className="text-sm text-foreground mb-2"><strong>新章節順序：</strong></p>
              <ol className="list-decimal list-inside text-sm text-foreground space-y-1">
                <li>專業摘要</li>
                <li>核心能力</li>
                <li>專業經驗</li>
                <li>學歷</li>
                <li>語言</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-3">原因：有 10+ 年經驗，你的工作成就應該佔主導。學歷驗證資歷但不需要突出。</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">分數改進：</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐ (4/5)</p>
            </div>
          </div>
        </section>

        {/* 第四部分：策略定位 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第四部分：策略定位</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            你有經驗和成就可以瞄準多種職位類型。以下是根據申請職位強調不同面向的方式：
          </p>

          {/* 資深技術招募專員 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">目標：資深技術招募專員（大型科技公司 IC 路線）</h3>
            <p className="text-sm text-muted-foreground mb-4">例如：Microsoft、Google、Meta、Uber、Stripe</p>

            <p className="text-foreground font-semibold mb-3">履歷重點：</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• 以 Uber Superstar 獎項開頭（數據驅動的策略影響）</li>
              <li>• 強調全週期招募深度和招聘量</li>
              <li>• 強調利益相關者管理和高管合作</li>
              <li>• 展示數據/指標專業知識（漏斗分析、招聘來源）</li>
              <li>• 展示技術招募專業化</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">摘要開頭：</p>
              <p className="text-foreground text-sm">"Senior Technical Recruiter with 10+ years driving high-impact hiring across Uber, Netskope, and Toptal. Won Uber Superstar Award for data analysis that influenced company-wide hiring strategy. Expert in full-cycle technical recruiting, stakeholder management, and data-driven decision-making across tech, operations, and GTM functions."</p>
            </div>

            <p className="text-foreground font-semibold mb-3">項目符號優先順序（所有職位中前 5 個）：</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground mb-4">
              <li>Uber Superstar 獎項 - 展示策略/分析能力</li>
              <li>危機招聘（8 週內 9 名招聘）- 展示執行卓越</li>
              <li>校園招募（30% 增長）- 展示招聘創意</li>
              <li>ARC.dev 流程建立（50% 營收）- 展示創業思維</li>
              <li>22K 社群 - 展示思想領導力和雇主品牌</li>
            </ol>

            <p className="text-foreground font-semibold mb-2">需包含的關鍵字：</p>
            <div className="flex flex-wrap gap-2">
              {['全週期技術招募', '利益相關者管理', '數據驅動決策', '人才管道發展', '招聘儀表板', '漏斗指標', '技術評估', '多元招聘'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 校園招募專員 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">目標：校園招募專員</h3>
            <p className="text-sm text-muted-foreground mb-4">例如：Microsoft University Recruiter、Google University Programs</p>

            <p className="text-foreground font-semibold mb-3">履歷重點：</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• 前置 Netskope 校園招募策略</li>
              <li>• 強調校園合作經驗（職涯中心、教授、學生組織）</li>
              <li>• 強調雇主品牌建立和社群發展</li>
              <li>• 展示活動策略和專案管理</li>
              <li>• 展示 22K+ 社群作為雇主品牌憑證</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">摘要開頭：</p>
              <p className="text-foreground text-sm">"Senior Technical Recruiter specializing in university recruiting and early-career talent acquisition. Built campus recruiting programs at Netskope increasing inbound applications 30% through strategic university partnerships, technical workshops, and faculty collaboration. Developed 22K+ professional community establishing Uber's employer brand in Taiwan. Expert in candidate attraction, relationship building, and data-driven recruiting across technical disciplines."</p>
            </div>

            <p className="text-foreground font-semibold mb-2">需包含的關鍵字：</p>
            <div className="flex flex-wrap gap-2">
              {['校園招募', '早期職涯人才', '雇主品牌發展', '學生參與', '教授合作', '職涯中心協作', '校園活動', '人才管道'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 首席招募專員 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">目標：首席招募專員/策略專案（IC 領導路線）</h3>
            <p className="text-sm text-muted-foreground mb-4">例如：Lead Recruiter、Principal Recruiter、Staff Recruiter</p>

            <p className="text-foreground font-semibold mb-3">履歷重點：</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• 強調策略專案負責（Foodpanda 合併、擴張計畫）</li>
              <li>• 強調流程建立和營運卓越</li>
              <li>• 展示思想領導力（22K 社群、培訓他人）</li>
              <li>• 展示超越個人招聘的影響力（公司級策略、團隊手冊）</li>
              <li>• 展示可擴展性（ARC.dev 從 1 人成長到 15 人團隊）</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">摘要開頭：</p>
              <p className="text-foreground text-sm">"Lead Technical Recruiter with 10+ years building recruiting operations and driving strategic initiatives across Uber, Netskope, and Toptal. Won Uber Superstar Award for data analysis that influenced company-wide hiring strategy. Built permanent recruiting vertical generating 50% of company revenue and scaled team from 1 to 15 members. Developed 22K+ professional community establishing employer brand in Taiwan. Expert in process innovation, stakeholder management, and scaling recruiting operations."</p>
            </div>

            <p className="text-foreground font-semibold mb-2">需包含的關鍵字：</p>
            <div className="flex flex-wrap gap-2">
              {['策略計畫', '流程優化', '營運卓越', '跨部門協作', '招募營運', '團隊領導', '思想領導力', '雇主品牌', '人才市場情報'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* 招募經理 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">目標：招募經理（人員領導路線）</h3>
            <p className="text-sm text-muted-foreground mb-4">注意：你的直接人員管理經驗有限（Netskope 3 人團隊 14 個月）。這對經理職位來說處於邊界，但可能適用於較小的公司或新創公司。</p>

            <p className="text-foreground font-semibold mb-3">履歷重點：</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• 強調 Netskope 團隊領導（3 人團隊）</li>
              <li>• 展示 ARC.dev 的輔導經驗（招聘/培訓 8 名招募專員）</li>
              <li>• 強調策略規劃和利益相關者管理</li>
              <li>• 展示流程建立和擴展</li>
              <li>• 連結 TMI 學校主任經驗（20 名教師、15 名職員）</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">摘要開頭：</p>
              <p className="text-foreground text-sm">"Recruiting Leader with 10+ years progressing from individual contributor to team leadership across recruiting and operations. Led 3-person recruiting team at Netskope establishing Taiwan office; hired, onboarded, and mentored 8 recruiters at ARC.dev; managed 35-person team as School Director. Won Uber Superstar Award for strategic analysis influencing company-wide hiring strategy. Expert in team development, process innovation, and stakeholder management."</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">誠實評估：</p>
              <p className="text-sm text-foreground mb-2"><strong>優勢：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• 清晰的領導軌跡（學校主任 → 團隊主管 → 輔導）</li>
                <li>• 流程建立能力</li>
                <li>• 策略思維（獲獎）</li>
              </ul>
              <p className="text-sm text-foreground mb-2"><strong>經理職位的差距：</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• 有限的直接招募團隊管理（3 人、14 個月）</li>
                <li>• 沒有管理 5-10+ 名招募專員的經驗</li>
                <li>• 沒有招聘經理培訓項目符號</li>
              </ul>
              <p className="text-sm text-foreground"><strong>建議：</strong>未來 2-3 年瞄準首席招募專員或 Principal Recruiter（IC5/IC6），然後在有更深入的團隊領導經驗後轉向經理。或者瞄準 10-50 人新創公司的招募經理，3 人團隊經驗就足夠。</p>
            </div>
          </div>
        </section>

        {/* ATS 優化摘要 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS 優化摘要</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <p className="text-sm font-semibold text-destructive mb-4">優化前</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">整體 ATS 匹配</span>
                  <span className="text-destructive font-bold">58% ❌ 低</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">格式問題</span>
                  <span className="text-destructive font-bold">8 個嚴重錯誤 ❌ 未通過</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">硬技能匹配</span>
                  <span className="text-destructive font-bold">12/35 關鍵字 (34%) ❌ 差</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">解析成功率</span>
                  <span className="text-destructive font-bold">~45% ❌ 未通過</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4"><strong>可能結果：</strong>在人工審查前被 ATS 拒絕（75% 的申請）</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <p className="text-sm font-semibold text-gold mb-4">優化後</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">整體 ATS 匹配</span>
                  <span className="text-gold font-bold">91% ✅ 優秀</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">格式問題</span>
                  <span className="text-gold font-bold">0 個錯誤 ✅ 通過</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">硬技能匹配</span>
                  <span className="text-gold font-bold">31/35 關鍵字 (89%) ✅ 優秀</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">解析成功率</span>
                  <span className="text-gold font-bold">~98% ✅ 通過</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4"><strong>可能結果：</strong>進入人工審查，在合格申請者中排名前 10%</p>
            </div>
          </div>

          {/* 關鍵字新增 - Uber 資深技術招募專員職位描述匹配 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">關鍵字新增 - Uber 資深技術招募專員職位描述匹配</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">必要關鍵字：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 全週期招募</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 技術招募/工程招募</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 利益相關者管理</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 數據驅動/數據分析</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 人才管道管理/管道發展</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 評估流程</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 人才地圖/人才分佈</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 市場知識/競爭情報</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> iCIMS（或其他 ATS）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">優選關鍵字：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 快節奏環境</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 商業敏銳度</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 流程改進</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 高階利益相關者</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 多元招募</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 結案/薪資談判</li>
                </ul>
                <p className="text-sm text-gold font-semibold mt-3">分數：15/16 關鍵字匹配 (94%)</p>
              </div>
            </div>
          </div>
        </section>

        {/* 下一步與建議 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步與建議</h2>
          </div>

          {/* 即時行動 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> 即時行動（本週）
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>審閱優化後的履歷（附件版本 A）</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>確認所有事實和指標準確無誤</li>
                  <li>確保你能詳細說明每項成就</li>
                  <li>檢查語氣/聲音是否感覺真實</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>準備面試故事</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Uber Superstar 獎項：準備詳細解釋顧問 vs 非顧問分析</li>
                  <li>危機招聘：練習講述 40% 離職率危機的故事</li>
                  <li>22K 社群：解釋如何建立、提供什麼價值、如何幫助 Uber</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>更新 LinkedIn 個人資料以匹配履歷</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>LinkedIn 應反映履歷定位</li>
                  <li>使用相同摘要（或改編版本）</li>
                  <li>確保項目符號匹配（招募專員會交叉檢查）</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>設定職位提醒</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>LinkedIn：「Senior Technical Recruiter」+「Taiwan」或「APAC」</li>
                  <li>Glassdoor：類似搜尋</li>
                  <li>公司職涯頁面：Uber（其他地區）、Microsoft、Google、Meta</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* 短期行動 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" /> 短期行動（未來 2 週）
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>申請 5-10 個目標職位</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>從夢想公司開始（Microsoft University Recruiter 等）</li>
                  <li>使用引用特定職位描述關鍵字的客製化求職信</li>
                  <li>在試算表中追蹤申請（公司、日期、職位、狀態）</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>在 LinkedIn 上策略性建立人脈</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>與亞太區的 Microsoft/Google/Meta 招募專員建立連結</li>
                  <li>發送個人化訊息</li>
                  <li>參與他們的內容（深思熟慮的評論）</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>更新推薦人</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>聯繫 3-4 位強力推薦人並告知他們</li>
                  <li>向他們發送你的新履歷，讓他們知道你的定位</li>
                  <li>理想推薦人：Uber/Netskope 的招聘經理、ARC.dev 領導層</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* 中期策略 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" /> 中期策略（未來 1-3 個月）
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-semibold mb-2">思想領導力內容策略</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>你的 22K 社群是重要資產 - 善加利用</li>
                  <li>每週發布 2-3 次關於招募洞察、科技招聘、亞太人才市場的內容</li>
                  <li>適時標記目標公司（深思熟慮，非垃圾訊息）</li>
                  <li>這能保持你的能見度並展示專業知識</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">建立特定公司版本</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>建立「James_Bugden_Resume_Microsoft.pdf」</li>
                  <li>建立「James_Bugden_Resume_Google.pdf」</li>
                  <li>略微客製化：為每家公司以最相關的成就開頭</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">發展面試「證據點」</p>
                <p className="text-sm text-muted-foreground">為每個主要成就準備：情境 → 任務 → 行動 → 結果 → 學習</p>
              </div>
            </div>
          </div>

          {/* 長期定位 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> 長期定位（未來 6-12 個月）
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-semibold mb-2">填補經驗差距（如果目標是經理職位）</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>在 Uber 尋求領導專案的機會</li>
                  <li>指導初級招募專員（記錄下來）</li>
                  <li>建立手冊/培訓材料（展示領導力）</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">擴展校園招募經驗</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>如果 Microsoft 是夢想公司，獲取更多校園經驗</li>
                  <li>志願支援 Uber 校園招募計畫</li>
                  <li>在大學職涯活動中演講</li>
                  <li>與亞太地區大學建立關係</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">發展專業專長</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>以特定領域聞名：「AI/ML 招募」、「亞太技術人才」、「雇主品牌」</li>
                  <li>在 LinkedIn 撰寫關於你專業的文章</li>
                  <li>在招募會議演講（RecFest、TA Week）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 關鍵提醒 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 該做的事
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 為每個申請客製化 - 更改 2-3 個項目符號以匹配職位描述關鍵字</li>
                <li>• 申請後跟進 - 5-7 天後發郵件給招募專員（如果有聯絡方式）</li>
                <li>• 準備好解釋每個指標 - 面試官會問你如何計算 $200K 節省</li>
                <li>• 保持範例機密 - 不要提及「Project X」或其他內部代號</li>
                <li>• 展示真誠熱情 -「我一直在關注 Microsoft 的校園招募策略...」</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 不該做的事
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 不要沒有客製化就申請 100 個職位 - 質量 &gt; 數量</li>
                <li>• 不要誇大指標 - 18% 招聘時間減少應該有數據支持</li>
                <li>• 不要說前雇主的壞話 - 即使你離開時關係不好，也要保持專業</li>
                <li>• 不要在 2 週內申請同一家公司 3 次 - 看起來很急迫</li>
                <li>• 不要忽略文化契合 - 研究公司價值觀，在求職信中提及</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 面試準備 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">當你獲得面試機會</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">電話篩選準備</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">問題 1：「請介紹一下你自己。」</p>
                <p className="text-sm text-muted-foreground">使用你的摘要作為腳本，然後強調對該特定職位最相關的成就。</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">問題 2：「你為什麼想離開 Uber？」</p>
                <p className="text-sm text-muted-foreground">永遠不要負面。這樣說：「我很喜歡 Uber，但我對[新公司的 X]感到興奮，因為[與職涯成長相關的具體原因]。」</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">問題 3：「告訴我一次你必須影響利益相關者的經歷。」</p>
                <p className="text-sm text-muted-foreground">Uber Superstar 獎項故事（顧問 vs 非顧問分析）。</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">問題 4：「你建立候選人管道的方法是什麼？」</p>
                <p className="text-sm text-muted-foreground">Netskope 校園策略或 22K 社群建立。</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">問題 5：「你如何處理大量招聘？」</p>
                <p className="text-sm text-muted-foreground">危機招聘故事（8 週內 9 名招聘）。</p>
              </div>
            </div>
          </div>
        </section>

        {/* 結語 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">結語</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-foreground leading-relaxed mb-6">
              <strong>James，你有非常扎實的基礎。</strong>Uber Superstar 獎項、10+ 年漸進式經驗、一個使你與 99% 招募專員區別開來的 22K+ 社群，以及從零建立流程的驗證能力。問題不是你的經驗——而是你如何呈現它。
            </p>

            <p className="text-foreground font-semibold mb-3">三個最大的問題是：</p>
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>籠統的摘要，用形容詞而非證據</strong></li>
              <li><strong>職責導向的項目符號隱藏了你的商業影響</strong></li>
              <li><strong>8 個 ATS 格式錯誤會讓你 75% 的時間被自動拒絕</strong></li>
            </ol>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>好消息？</strong>這三個問題現在都已修正。有了這些變更，你將擁有一份履歷：
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>清楚地將你定位為資深技術招募專員/首席招募專員</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>展示在 Uber 獲獎的策略影響力</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>展示量化的、令人印象深刻的商業結果</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>以 98%+ 的成功率通過 ATS</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>能競爭 Microsoft、Google、Meta 等公司的資深 IC 職位</strong>
              </li>
            </ul>

            <p className="text-foreground leading-relaxed mb-6">
              你的 22K 社群是你的超能力。你的 Uber Superstar 獎項證明你具有策略思維。你的危機招聘成功展示你能在壓力下執行。讓這些成就自己說話。
            </p>

            <p className="text-2xl font-heading text-gold font-bold">你可以的。</p>

            <div className="border-t border-border mt-6 pt-6">
              <p className="text-muted-foreground">對回饋有任何問題嗎？有什麼需要我澄清或展開的嗎？</p>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
};

export default JamesBugdenReviewZhTw;