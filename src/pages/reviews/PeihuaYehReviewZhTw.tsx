import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const PeihuaYehReviewZhTw = () => {
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
              href="/downloads/PEIHUA_YEH_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">葉沛樺</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* PART 1: OVERALL ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">整體評估</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體分數</p>
                <p className="text-3xl font-bold text-gold">50/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={50} label="修改前" size="md" />
                <ScoreGauge score={90} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷展現了紮實的技術基礎，包括在 HP 工作 4 年以及近期取得的產品負責人認證（PSM I、PSPO I）。然而，薄弱的呈現方式——格式混亂、職責導向的語言、定位不清——削弱了您的資歷。</p>
              
              <p><strong>第一，不專業的格式和篇幅問題。</strong>您僅有 4 年主要工作經驗卻使用兩頁，版面凌亂。字體難以閱讀。姓名在頁首重複出現兩次。聯絡資訊大小寫不一致（EMAIL 全部大寫）。</p>
              
              <p><strong>第二，全篇使用職責導向語言而非成果導向的價值主張。</strong>您告訴雇主您負責什麼，而不是您達成了什麼成果。沒有任何一個要點遵循 XYZ 框架：「透過執行 [Z]，以 [Y] 衡量，達成了 [X]」。每個要點都以職責動詞開頭，如「定義」、「執行」、「協作」、「驗證」，而非展示可衡量的影響。</p>
              
              <p><strong>第三，內容分散造成定位混亂。</strong>您的核心能力區塊位置太低，沒有任何數據或佐證。國際經驗區塊列出與工作無關的旅行經歷，削弱您的專業形象。申請德國職位時缺少關鍵資訊，如電話號碼、完整 LinkedIn 網址和工作授權狀態。</p>
              
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
                  <span className="text-foreground"><strong>近期產品負責人認證</strong>：PSM I（2025 年 6 月）和 PSPO I（2025 年 7 月）來自 Scrum.org，直接符合產品負責人職位要求，展現對職涯轉型的積極投入</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>4 年以上 HP 技術產品經驗</strong>：副軟體工程師角色（2020-2024）涵蓋 WWAN、IoT 和 Windows 連線測試，為科技公司的產品負責人職位提供技術可信度</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>跨部門協作經驗</strong>：與產品經理、開發人員和 ODM 合作夥伴合作，排列功能優先順序並達成發布里程碑，展現產品負責人核心的利害關係人管理技能</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>面對客戶的銷售背景</strong>：在 BoConcept 的 B2B/B2C 業績名列前茅，展現客戶同理心和顧問式溝通技巧，可轉化為以用戶為中心的產品負責人工作</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>多語言能力</strong>：母語中文、台語，流利英語（C1），為國際產品團隊提供競爭優勢</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技術技能廣度</strong>：QXDM、PowerStress、WinDbg、PowerShell、根本原因分析，展現與工程團隊有效合作的能力</span>
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
                  <span className="text-foreground"><strong>不專業的電子郵件地址</strong>：「laquasha87@gmail.com」看起來隨機且與您的名字無關。請使用 firstname.lastname@gmail.com 格式（peihua.yeh@gmail.com）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少關鍵聯絡資訊</strong>：頁首沒有電話號碼或完整 LinkedIn 網址。招募人員需要多種方式聯繫您，並會在致電前查看 LinkedIn</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>姓名在頁首重複兩次</strong>：「PeiHua Yeh」出現在左上角且又作為置中標題。這造成冗餘並浪費寶貴的履歷空間</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>4 年經驗卻用兩頁顯示判斷力不佳</strong>：您最多需要一頁。5 年以下經驗用兩頁會讓招募人員認為您無法排定優先順序或精簡內容</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>所有要點 100% 職責導向語言</strong>：每個要點都描述責任（「定義和管理」、「執行驗證」、「協作」）而非達成的可衡量成果</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>完全沒有量化結果</strong>：任何經驗要點都沒有指標、百分比、時間節省、品質改善或業務影響衡量</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少工作授權狀態</strong>：從台灣申請德國職位卻未說明簽證狀態，會造成立即被拒絕的風險</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技能中缺少產品負責人關鍵字</strong>：沒有 Jira、Confluence、Productboard、Miro 或其他目標職位描述中出現的產品管理工具</span>
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
            我們找出 6 項策略性轉變，以最佳方式為您定位產品負責人職位。以下是影響最大的改變：
          </p>

          {/* Must-Fix Issue #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 壓縮為一頁</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">透過刪除區塊和整合要點，壓縮為一頁</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（篇幅顯示判斷力不佳）：</p>
                <p className="text-muted-foreground text-sm">4 年以下經驗用兩頁，對招募人員來說是警訊。這表示您無法確定優先順序或無情地刪減內容。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm">一頁格式，迫使您只保留最高影響力的內容。刪除國際經驗區塊、整合技能區塊、每個角色最多 3-4 個要點。</p>
              </div>
            </div>
          </div>

          {/* More improvements... */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ 框架</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">使用 XYZ 框架重寫所有要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（職責導向）：</p>
                <p className="text-muted-foreground text-sm">「定義和管理 WWAN 相關需求和驗證測試案例。」</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（成果導向）：</p>
                <p className="text-foreground text-sm">「透過建立全面的驗證測試套件，減少 30% 上市時間，在發布前識別出 45 個關鍵缺陷，確保跨 15 款筆電型號的無縫 WWAN 連線。」</p>
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
                  <p className="font-semibold text-foreground">修正格式和基本資訊</p>
                  <p className="text-muted-foreground text-sm">更換為專業電子郵件、新增電話號碼和 LinkedIn 網址、移除重複姓名</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">2</div>
                <div>
                  <p className="font-semibold text-foreground">壓縮為一頁</p>
                  <p className="text-muted-foreground text-sm">刪除國際經驗區塊、整合技能、每個角色限制 3-4 個要點</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">3</div>
                <div>
                  <p className="font-semibold text-foreground">使用 XYZ 框架重寫所有要點</p>
                  <p className="text-muted-foreground text-sm">「透過執行 [Z]，以 [Y] 衡量，達成了 [X]」格式</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">4</div>
                <div>
                  <p className="font-semibold text-foreground">新增工作授權聲明</p>
                  <p className="text-muted-foreground text-sm">明確說明簽證狀態和搬遷時間表</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">5</div>
                <div>
                  <p className="font-semibold text-foreground">新增產品管理工具</p>
                  <p className="text-muted-foreground text-sm">在技能中加入 Jira、Confluence、Miro 等工具</p>
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

export default PeihuaYehReviewZhTw;
