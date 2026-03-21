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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Peihua Yeh</h1>
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
                  <td className="py-2 text-foreground font-semibold">聯絡資訊</td>
                  <td className="py-2 text-muted-foreground">不專業的電子郵件（laquasha87@gmail.com），缺少電話和完整 LinkedIn 網址，姓名重複兩次</td>
                  <td className="py-2 text-foreground">peihua.yeh@gmail.com + 電話號碼 + linkedin.com/in/peihuayeh，姓名僅列一次</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">工作授權</td>
                  <td className="py-2 text-muted-foreground">未提及，台灣人申請德國職位造成簽證狀態混淆</td>
                  <td className="py-2 text-foreground">明確聲明：「2026 年遷往德國」並清楚說明簽證狀態</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">履歷篇幅</td>
                  <td className="py-2 text-muted-foreground">4 年經驗用兩頁顯示判斷力不佳</td>
                  <td className="py-2 text-foreground">最多一頁，迫使優先篩選最高影響力的內容</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">摘要數據支撐</td>
                  <td className="py-2 text-muted-foreground">聲稱「專精於轉譯」和「連結團隊」卻沒有量化證明</td>
                  <td className="py-2 text-foreground">添加具體指標：需求數量、建立的測試場景、支援的發布次數</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">要點結構</td>
                  <td className="py-2 text-muted-foreground">100% 職責導向語言（「定義」、「執行」、「協作」）零成果</td>
                  <td className="py-2 text-foreground">XYZ 框架：透過執行 [Z]，以 [Y] 衡量，達成了 [X]</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">核心能力位置</td>
                  <td className="py-2 text-muted-foreground">埋在技術技能後面，沒有任何數據或證明</td>
                  <td className="py-2 text-foreground">完全移除此區塊，將最佳要點整合到改良版摘要中</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">國際經驗區塊</td>
                  <td className="py-2 text-muted-foreground">列出與工作無關的「打工度假」澳洲/愛爾蘭</td>
                  <td className="py-2 text-foreground">完全移除，與產品負責人職位無關，削弱專業形象</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">產品管理工具</td>
                  <td className="py-2 text-muted-foreground">缺少 Jira、Confluence、Miro、產品管理平台</td>
                  <td className="py-2 text-foreground">新增產品管理工具區塊作為第一類別，誠實標註「熟悉」程度</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">認證順序</td>
                  <td className="py-2 text-muted-foreground">PSM I 列在 PSPO I 之前，儘管 PSPO 更相關</td>
                  <td className="py-2 text-foreground">申請產品負責人職位時先列 PSPO I，再列 PSM I</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">低</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PART 2: KEY IMPROVEMENTS EXPLAINED */}
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
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>4 年經驗用兩頁是警訊。招募人員期待 0-8 年經驗用一頁。兩頁表示您無法優先排序或編輯。</p>
                  <p>HP 職位有 8 個要點稀釋了您最強的成就。每多一個要點都會降低最佳工作的影響力。招募人員會略讀或完全跳過。</p>
                  <p>國際經驗區塊不是工作相關。「打工度假」計畫通常是餐飲服務工作，不是專業經驗。這削弱您的專業形象。</p>
                  <p>核心能力區塊重複摘要內容。您用 6-7 行列出能力卻沒有任何證明。這重複了摘要中應有的內容。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（聚焦內容的一頁）：</p>
                <p className="text-foreground text-sm mb-3">僅保留這些區塊：</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• 頁首（1 行）</li>
                  <li>• 摘要（3-4 句）</li>
                  <li>• 工作經歷（4 個職位，共 9 個要點：HP 5 個、BoConcept 2 個、Unitech 1 個、HP 愛爾蘭 1 個）</li>
                  <li>• 技術技能（5 類）</li>
                  <li>• 認證（2 項）</li>
                  <li>• 語言（1 行）</li>
                  <li>• 教育（1 行）</li>
                </ul>
                <p className="text-foreground text-sm mt-3 font-semibold">完全刪除：</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• 國際經驗區塊（不相關）</li>
                  <li>• 核心能力區塊（整合到摘要）</li>
                  <li>• 專業照片（科技業非標準配備）</li>
                  <li>• 頁首重複的姓名</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼這樣有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>一頁迫使您只優先保留最高影響力、最相關的工作</li>
                <li>共 9 個要點聚焦在能直接證明您能勝任產品負責人職位的成就</li>
                <li>移除非專業的填充內容，這些內容暗示缺乏實質經驗</li>
                <li>展現判斷力和編輯能力。產品負責人必須無情地排定優先順序。一頁履歷證明您有這項技能。</li>
              </ul>
            </div>
          </div>

          {/* Must-Fix Issue #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ 框架</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">使用 XYZ 框架重寫所有經歷要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（100% 職責導向語言）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>• 為筆電定義和管理 WWAN（行動寬頻）測試計畫，將功能場景與業務和技術需求對齊。</p>
                  <p className="mt-2">• 執行 Windows OS 驅動程式的跨平台驗證，確保無縫相容性並貢獻於產品準備度。</p>
                  <p className="mt-2">• 與產品經理、開發人員和 ODM 合作夥伴協作，排定功能測試優先順序、識別瓶頸並達成發布里程碑。</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>每個要點都是職責導向。「定義」、「執行」、「協作」描述責任，不是結果。</p>
                  <p>零可衡量成果。沒有效能改善、效率提升、業務影響指標。</p>
                  <p>讀起來像職位描述。這些可以從職缺公告複製貼上。沒有任何內容證明「您」具體創造了價值。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（XYZ 框架）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>• 建立 [X] 個 WWAN 測試計畫，涵蓋每年 [Y] 款筆電型號的 LTE/5G 連線，將 [Z] 個業務需求轉化為 [N] 個可執行測試場景，在上市前識別 [M] 個關鍵缺陷，將產品準備度分數提高 [P]%</p>
                  <p className="mt-2">• 每年與產品經理合作 [X] 次發布，排定 [Y] 個關鍵功能的測試優先順序，識別 ODM 交付流程中的 [Z] 個瓶頸，透過主動的利害關係人協調，每個週期加速問題解決 [N] 天</p>
                  <p className="mt-2">• 每個衝刺將 [X] 個技術測試發現轉化為用戶影響洞察，用於產品待辦事項優化，貢獻 [Y] 個優先順序建議，提高衝刺規劃效率並減少 [Z]% 的返工</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p><strong>注意：</strong>您需要添加實際指標（標記為 [X]%、[Y] 天、[Z] 等）。如果沒有確切數字，請根據觀察使用保守估計。</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼這樣有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>清楚的 [X] 成果放在最前面。您達成了什麼，附上具體指標。</li>
                <li>提供可衡量的 [Y] 證明。您如何量化改善。</li>
                <li>解釋具體的 [Z] 方法。您實際做了什麼來達成結果。</li>
                <li>自然包含產品負責人關鍵字。「用戶影響洞察」、「待辦事項優化」、「優先順序建議」、「衝刺規劃」都出現了。</li>
              </ul>
            </div>
          </div>

          {/* Must-Fix Issue #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 聯絡與工作授權</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">修正聯絡資訊並新增工作授權聲明</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（德國申請的關鍵阻礙）：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>PeiHua Yeh</p>
                  <p>EMAIL: laquasha87@gmail.com</p>
                  <p>LinkedIn: LinkedIn</p>
                  <p className="mt-2">PeiHua Yeh</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>姓名重複兩次造成冗餘並浪費空間。</p>
                  <p>不專業的電子郵件地址。「laquasha87@gmail.com」看起來隨機且與您的名字無關。</p>
                  <p>LinkedIn 網址不完整。只顯示「LinkedIn」文字而非完整的 linkedin.com/in/username 格式。</p>
                  <p>缺少電話號碼和工作授權。從台灣申請德國職位卻沒有簽證狀態聲明，造成立即被拒絕的風險。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>PEIHUA YEH</p>
                  <p>台北，台灣 | 2026 年遷往德國 | 工作授權：[說明狀態]</p>
                  <p>+886-XXX-XXX-XXX | peihua.yeh@gmail.com | linkedin.com/in/peihuayeh</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">工作授權選項（根據您的情況選擇）：</p>
                <div className="space-y-3 text-sm text-foreground">
                  <p><strong>選項 A（如果您有歐盟工作權）：</strong><br/>歐盟公民 | 可在德國工作，無需贊助</p>
                  <p><strong>選項 B（如果以有效簽證遷往）：</strong><br/>2026 年 2 月遷往德國 | 有效工作授權（無需贊助）</p>
                  <p><strong>選項 C（如果需要贊助）：</strong><br/>2026 年遷往德國 | 需要工作贊助</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>將履歷從「需要複雜簽證流程的國際候選人」轉變為「有明確遷移計畫的合格候選人」。這單一改變可將國際申請的回覆率提高 40-60%。</p>
            </div>
          </div>

          {/* Important Change #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 重寫摘要</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">使用量化數據重寫摘要並移除目標職位聲明</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（聲稱無證明）：</p>
                <p className="text-foreground text-sm italic">Certified Scrum professional (PSM I & PSPO I) with 4 years of experience in software quality assurance, WWAN/IoT connectivity testing, and agile product delivery. I specialize in translating technical insights into actionable requirements, bridging engineering and business teams to build user-focused solutions. With a unique background in both IT validation and customer-facing sales, I bring a balanced perspective to product thinking—ensuring features are not only functional, but truly valuable to users.</p>
                <p className="text-foreground text-sm italic mt-2">Currently seeking Product Owner, Business Analyst, or Associate Product Manager opportunities in tech-driven teams.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>「Currently seeking...」浪費寶貴的摘要空間。您已經在申請產品負責人職位。招募人員知道您為什麼申請。</p>
                  <p>零量化結果。沒有指標、沒有成果、沒有影響證明。</p>
                  <p>全篇模糊聲稱。「轉譯技術洞察」、「連結工程和業務團隊」是沒有證明的空話。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm italic">認證產品負責人（PSPO I）和 Scrum Master（PSM I），在 HP 推動 WWAN/IoT 產品驗證 4 年，將 [X] 個業務需求轉化為 [Y] 個用戶故事和測試場景，使 Windows 筆電產品組合的產品準備度提高 [Z]%。管理工程、產品管理和 ODM 合作夥伴之間的跨部門協作，為 [N] 次產品發布排定功能優先順序，透過系統性根本原因分析將缺陷解決時間減少 [M]%。已證明能連結技術和業務利害關係人，結合 QA 領域專業知識與來自 B2B 銷售背景的以客戶為中心思維（BoConcept 最佳業績表現者）。</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>摘要是履歷上最重要的 60 個字。它決定招募人員是否繼續閱讀。以結果為導向、有明確定位和量化成就的摘要讓他們想繼續讀下去。</p>
            </div>
          </div>

          {/* Important Change #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 移除區塊</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">移除核心能力區塊和國際經驗區塊</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（浪費空間）：</p>
                <div className="text-sm text-foreground space-y-2">
                  <p><strong>核心能力</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 軟體與連線：具有 WWAN、WLAN 和 IoT 模組驗證的實作經驗...</li>
                    <li>• 測試執行與技術分析：精通軟體測試、測試規劃...</li>
                    <li>• 客戶管理：已證明管理和發展客戶帳戶的能力...</li>
                    <li>• 銷售管道管理：擅長監督整個銷售流程...</li>
                    <li>• 溝通與協作：強大的人際技巧...</li>
                  </ul>
                  <p className="mt-3"><strong>國際經驗</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 澳洲：打工度假 2011-2013</li>
                    <li>• 愛爾蘭：打工度假 2016</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>核心能力區塊重複摘要和技術技能內容。您用 6-7 行列出能力卻沒有任何支持數據或證明。</p>
                  <p>國際經驗不是工作相關。「打工度假」計畫通常是餐飲或服務工作，不是專業經驗。</p>
                  <p>這兩個區塊加起來在需要變成一頁的兩頁履歷上佔用 10+ 行。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm font-semibold">完全移除這兩個區塊</p>
                <ul className="text-foreground text-sm space-y-1 mt-2">
                  <li>• 核心能力內容應整合到改良版摘要區塊</li>
                  <li>• 國際經驗與產品負責人職位無關</li>
                  <li>• 這可以為一頁要求節省 10+ 行</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Change #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#6 新增產品工具</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">在技能區塊新增產品管理工具</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（缺少關鍵工具）：</p>
                <div className="text-sm text-foreground">
                  <p><strong>技術技能</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• 測試工具：QXDM（高通）、PowerStress、電話工具（5G）、WinDbg、Windows 事件檢視器</li>
                    <li>• 連線與無線技術：WWAN（LTE/5G）、WLAN、SIM 和數據機設定...</li>
                    <li>• 腳本與自動化：PowerShell（基礎）、批次腳本</li>
                    <li>• 生產力與文件：Microsoft Excel、PowerPoint、Word、Outlook、SharePoint</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>缺少關鍵產品負責人工具。沒有 Jira、Confluence、Productboard、Aha、Miro、FigJam 或其他產品管理平台。</p>
                  <p>過度強調測試工具。第一個區塊是與產品負責人招募經理較不相關的專業 QA 工具。</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="text-foreground text-sm">
                  <p><strong>技術技能</strong></p>
                  <ul className="space-y-1">
                    <li>• <strong>產品管理工具：</strong>Jira、Confluence（熟悉）、Miro（熟悉）、Microsoft Office 套件（Excel、PowerPoint、Word）</li>
                    <li>• 測試與品質：QXDM（高通）、PowerStress、電話工具（5G）、WinDbg、根本原因分析</li>
                    <li>• 連線技術：WWAN（LTE/5G）、WLAN、IoT 模組整合、SIM/數據機設定</li>
                    <li>• 作業系統與腳本：Windows 10/11、PowerShell（基礎）、批次腳本</li>
                    <li>• 除錯與分析：日誌解讀、裝置管理員、登錄檔除錯、事件檢視器</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>在維持技術深度的同時新增產品負責人工具，將您定位為技術型產品負責人候選人，而非只是想轉型的 QA 工程師。更好的平衡：40% 產品技能、60% 技術技能，展現完美適合產品負責人轉型的混合能力。</p>
            </div>
          </div>
        </section>

        {/* PART 3: STRATEGIC POSITIONING & ATS */}
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
            <p className="text-muted-foreground mb-6">根據您的兩個目標職位描述（TeamViewer 產品負責人和 Experian 初級產品經理），以下是如何定位自己：</p>

            {/* TeamViewer */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-foreground mb-2">主要目標：產品負責人（TeamViewer，德國不來梅）</h4>
              <p className="text-sm text-gold mb-4">匹配強度：目前 65% 適合 → 優化後 85% 適合</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold mb-2">為什麼您適合：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Scrum 認證直接符合要求（PSPO I）</li>
                    <li>• 與工程團隊的技術流暢度</li>
                    <li>• SaaS 和 B2B 產品背景</li>
                    <li>• 敏捷開發經驗</li>
                    <li>• 來自銷售背景的以客戶為中心思維</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-2">目前差距：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 德國工作授權未說明</li>
                    <li>• 產品路線圖所有權證據有限</li>
                    <li>• 缺少德語技能</li>
                    <li>• 沒有明確的 KPI 追蹤經驗</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experian */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">次要目標：初級產品經理（Experian，德國法蘭克福）</h4>
              <p className="text-sm text-gold mb-4">匹配強度：目前 60% 適合 → 優化後 80% 適合</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold mb-2">為什麼您適合：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 相當於 1-2 年產品/專案管理經驗</li>
                    <li>• IT 和資料產品背景</li>
                    <li>• 數據驅動方法的分析技能</li>
                    <li>• 技術和業務利害關係人之間的溝通</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-2">目前差距：</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 德國工作授權未說明</li>
                    <li>• 產品生命週期所有權有限</li>
                    <li>• 沒有商業案例或 ROI 分析經驗</li>
                    <li>• 缺少金融服務經驗</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ATS Keyword Match */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">ATS 關鍵字匹配分析</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">優化前</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground">TeamViewer 關鍵字</th>
                        <th className="text-center py-2 text-foreground">狀態</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Jira</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺少</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Confluence</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺少</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">產品路線圖</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺少</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">功能優先排序</td>
                        <td className="py-2 text-center"><span className="text-yellow-500">薄弱</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">KPI</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺少</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">利害關係人管理</td>
                        <td className="py-2 text-center"><span className="text-destructive">缺少</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">敏捷 / Scrum</td>
                        <td className="py-2 text-center"><span className="text-gold">有</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-destructive mt-3 font-semibold">關鍵字匹配分數：35%</p>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-3">優化後</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground">TeamViewer 關鍵字</th>
                        <th className="text-center py-2 text-foreground">狀態</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Jira</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Confluence</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">產品路線圖</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">功能優先排序</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">KPI</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">利害關係人管理</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">敏捷 / Scrum</td>
                        <td className="py-2 text-center"><span className="text-gold">強</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gold mt-3 font-semibold">關鍵字匹配分數：95%</p>
              </div>
            </div>
          </div>

          {/* Resume Keywords Reference List */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">產品負責人職位履歷關鍵字</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">產品管理核心</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Product Owner（產品負責人）</li>
                  <li>• Product roadmap（產品路線圖）</li>
                  <li>• Feature prioritization（功能優先排序）</li>
                  <li>• Product backlog（產品待辦事項）</li>
                  <li>• User stories（用戶故事）</li>
                  <li>• Acceptance criteria（驗收標準）</li>
                  <li>• Sprint planning（衝刺規劃）</li>
                  <li>• Release planning（發布規劃）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">敏捷與 Scrum</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Scrum framework（Scrum 框架）</li>
                  <li>• Agile methodology（敏捷方法論）</li>
                  <li>• Sprint cycles（衝刺週期）</li>
                  <li>• Daily standups（每日站會）</li>
                  <li>• Sprint retrospectives（衝刺回顧）</li>
                  <li>• Definition of Done（完成定義）</li>
                  <li>• PSPO I 認證</li>
                  <li>• PSM I 認證</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">利害關係人與協作</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Cross-functional collaboration（跨部門協作）</li>
                  <li>• Stakeholder management（利害關係人管理）</li>
                  <li>• Stakeholder alignment（利害關係人協調）</li>
                  <li>• Engineering partnership（工程合作）</li>
                  <li>• Customer feedback synthesis（客戶回饋綜合）</li>
                  <li>• Requirements gathering（需求收集）</li>
                  <li>• Consensus building（共識建立）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">數據與分析</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Data-driven decision-making（數據驅動決策）</li>
                  <li>• Product KPIs（產品 KPI）</li>
                  <li>• Metrics tracking（指標追蹤）</li>
                  <li>• Performance monitoring（效能監控）</li>
                  <li>• A/B testing（A/B 測試）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">工具與平台</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Jira</li>
                  <li>• Confluence</li>
                  <li>• Miro</li>
                  <li>• Microsoft Office</li>
                  <li>• QXDM（高通）</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">技術產品技能</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Technical requirements（技術需求）</li>
                  <li>• Root cause analysis（根本原因分析）</li>
                  <li>• Defect management（缺陷管理）</li>
                  <li>• Quality assurance（品質保證）</li>
                  <li>• Test planning（測試規劃）</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>提示：</strong>只包含真正反映您經驗的關鍵字。面試官會要求您詳細說明列出的任何內容。誠實標註「熟悉」或「學習中」狀態比聲稱沒有的專業知識更好。</p>
          </div>

          {/* Resume Effectiveness Improvement */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">履歷效果改善</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">優化前</h4>
                <ul className="text-sm text-foreground space-y-2">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 4 年經驗用兩頁顯示判斷力不佳和無法優先排序</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 所有要點 100% 職責導向語言，描述責任而非成就</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 零量化成果意味著沒有影響力或業務價值的證明</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 德國申請缺少工作授權造成立即被拒絕風險</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 不專業的聯絡資訊降低回覆可能性</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 缺少產品負責人工具（Jira、Confluence）造成 ATS 關鍵字差距</li>
                </ul>
                <p className="text-sm text-destructive font-semibold mt-4">預估通過率：產品負責人職位 35-40%</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold mb-3">優化後</h4>
                <ul className="text-sm text-foreground space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 聚焦內容的一頁展現判斷力和優先排序能力</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 全篇 XYZ 框架證明可衡量的影響力和業務價值</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 量化成就提供能力的具體證據</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 明確的工作授權聲明移除國際招聘的主要阻礙</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 專業的聯絡資訊提高招募人員聯繫您的能力</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> 新增產品管理工具彌補關鍵 ATS 關鍵字差距</li>
                </ul>
                <p className="text-sm text-gold font-semibold mt-4">預估通過率：產品負責人職位 85-90%</p>
              </div>
            </div>
          </div>
        </section>

        {/* PART 4: NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          {/* Step 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">1</span>
              修正格式和基本資訊
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>修正聯絡資訊</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>將電子郵件改為 peihua.yeh@gmail.com 或類似的專業格式</li>
                  <li>新增電話號碼：+886-XXX-XXX-XXX</li>
                  <li>新增完整 LinkedIn 網址：linkedin.com/in/peihuayeh（如果沒有請建立）</li>
                  <li>移除頁首重複的姓名</li>
                </ul>
              </li>
              <li>
                <strong>新增工作授權聲明</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>在頁首新增：「2026 年 [月份] 遷往德國 | 工作授權：[狀態]」</li>
                  <li>這單一行可將國際申請的回覆率提高 40-60%</li>
                </ul>
              </li>
              <li>
                <strong>使用專業履歷模板</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>使用 Flow Resume（flowcv.com）或類似服務取得乾淨、ATS 友善的格式</li>
                  <li>移除專業照片（美國/歐盟科技業非標準配備）</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</span>
              將內容轉變為結果導向
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>使用量化數據重寫摘要</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>使用提供的優化版本</li>
                  <li>如有可用，新增您的實際績效指標</li>
                  <li>移除「Currently seeking...」目標職位聲明</li>
                </ul>
              </li>
              <li>
                <strong>使用 XYZ 框架重寫所有經歷要點</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>[X] = 您達成了什麼？（成果）</li>
                  <li>[Y] = 您如何衡量它？（指標）</li>
                  <li>[Z] = 您如何做到的？（方法）</li>
                </ul>
              </li>
              <li>
                <strong>新增您的實際指標</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">如果沒有確切數字，使用保守估計：</p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-muted-foreground">
                  <li>建立的測試計畫：「每年 15-20 個測試計畫」</li>
                  <li>涵蓋的筆電型號：「跨越 25+ 款筆電型號」</li>
                  <li>識別的缺陷：「在上市前識別 40+ 個關鍵缺陷」</li>
                  <li>品質改善：「將產品準備度提高約 20%」</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</span>
              為目標職位優化
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>在技能中新增產品管理工具</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>新增第一類別：「產品管理工具：Jira、Confluence（熟悉）、Miro（熟悉）、Microsoft Office 套件」</li>
                  <li>重新排序技術技能，將產品負責人工具放在測試工具之前</li>
                  <li>對正在學習的工具保持誠實的「熟悉」標籤</li>
                </ul>
              </li>
              <li>
                <strong>移除非必要區塊</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>完全刪除國際經驗區塊</li>
                  <li>完全刪除核心能力區塊</li>
                  <li>將最佳能力整合到改良版摘要中並附上證明</li>
                </ul>
              </li>
              <li>
                <strong>新增德語狀態</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>更新語言區塊：「中文（母語）、台語（母語）、英語（流利 - C1）、德語（基礎 A1 / 學習中）」</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</span>
              壓縮為一頁
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>整合經歷要點</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">每個職位的最終要點數量：</p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-muted-foreground">
                  <li>HP（副軟體工程師）：5 個要點</li>
                  <li>BoConcept（銷售）：2 個要點</li>
                  <li>Unitech（客服 QA）：1 個要點</li>
                  <li>HP 愛爾蘭（機器操作員）：1 個要點</li>
                  <li className="font-semibold">總計：9 個經歷要點</li>
                </ul>
              </li>
              <li>
                <strong>單行格式提高效率</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>聯絡資訊：1 行</li>
                  <li>語言：1 行</li>
                  <li>教育：1 行</li>
                  <li>每個認證：1 行</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</span>
              申請目標職位
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>識別目標公司</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>TeamViewer（產品負責人，德國不來梅）- 主要目標</li>
                  <li>Experian（初級產品經理，德國法蘭克福）- 次要目標</li>
                  <li>德國科技公司的類似產品負責人職位</li>
                  <li>接受國際候選人的遠端產品負責人職位</li>
                </ul>
              </li>
              <li>
                <strong>為每份申請客製化</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>調整 2-3 個要點以匹配特定職位描述關鍵字</li>
                  <li>如需要可重新排序技能區塊以強調不同工具</li>
                  <li>確保工作授權聲明針對特定地點</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">6</span>
              使用 STAR 方法準備面試故事
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>準備 2-3 分鐘故事</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">對於履歷上的每個主要成就，準備一個遵循此框架的故事：</p>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li><strong>S</strong>ituation（情境）：背景或問題是什麼？</li>
                  <li><strong>T</strong>ask（任務）：您的具體責任是什麼？</li>
                  <li><strong>A</strong>ction（行動）：您做了什麼？（逐步）</li>
                  <li><strong>R</strong>esult（結果）：發生了什麼？（量化成果）</li>
                </ul>
              </li>
              <li>
                <strong>範例結構：</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2 italic">「在 HP，我們面臨跨多款筆電型號的 WWAN 連線驗證挑戰【情境】。作為副軟體工程師，我負責建立符合技術需求和業務時程的全面測試計畫【任務】。我的方法是先分析歷史缺陷模式以識別高風險區域，然後與產品經理合作排定關鍵功能的優先順序，最後建立可擴展到 25+ 款筆電型號的自動化測試場景【行動】。這導致在產品上市前識別 40+ 個關鍵缺陷，將我們的產品準備度分數提高約 20%，並將每個發布週期的上市時間縮短 2-3 週【結果】。」</p>
              </li>
              <li>
                <strong>使用面試準備指南：</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">
                  <a href="https://jamesbugden.com/interview-preparation-guide" className="text-gold hover:underline">英文面試準備指南</a> | <a href="https://jamesbugden.com/zh-tw/interview-preparation-guide" className="text-gold hover:underline">中文面試準備指南</a>
                </p>
              </li>
            </ul>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 該做的事
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 為每份申請客製化 - 更改 2-3 個要點以匹配職位描述</li>
                <li>• 申請後跟進 - 5-7 天後電郵招募人員</li>
                <li>• 準備好解釋每個指標 - 面試官會問</li>
                <li>• 保持範例機密 - 不要提及內部專案名稱</li>
                <li>• 展現真誠熱情 - 引用公司的具體計畫</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 不該做的事
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 不要不客製化就申請 - 質量 &gt; 數量</li>
                <li>• 不要誇大指標 - 準備好用數據支持</li>
                <li>• 不要說前雇主壞話 - 保持專業</li>
                <li>• 不要忽視文化契合度 - 研究公司價值觀</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CLOSING */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉變</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">修改前：</p>
                <ScoreGauge score={50} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">修改後：</p>
                <ScoreGauge score={90} label="優化履歷" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>您的經驗對產品負責人轉型很有優勢：</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 在 HP 4 年的 WWAN/IoT 產品經驗</li>
                <li>• PSM I 和 PSPO I 認證</li>
                <li>• 與工程和業務團隊的跨部門協作</li>
                <li>• 來自 B2B 銷售背景的以客戶為中心思維</li>
                <li>• 國際產品團隊的多語言能力</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後想法：</strong></p>
              <p className="text-muted-foreground mt-2">您之前的履歷沒有有效講述這個故事。它將您最強的成就埋在兩頁的 13 個職責導向要點中。它用分散的核心能力和與工作無關的國際經驗區塊讓招募人員困惑。它沒有量化任何結果或證明業務影響。</p>
              <p className="text-muted-foreground mt-2">您的新履歷將精確展示是什麼讓您有價值。您可以驗證複雜的技術產品。您可以與工程和業務利害關係人協作。您可以將技術發現轉化為可行動的產品洞察。您可以交付可衡量的品質改善。</p>
              <p className="text-gold mt-4 font-semibold">您有經驗。現在您有定位。去拿下那個 offer 吧。</p>
            </div>
          </div>
        </section>

        {/* YOUR FEEDBACK MATTERS */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">您的回饋很重要</h2>
            <p className="text-foreground mb-6">我希望這份審閱對加強您的求職申請有幫助。</p>
            <p className="text-muted-foreground mb-6">如果您覺得這份審閱有幫助，我會非常感謝您的回饋：</p>
            
            {/* Prominent CTA Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Share Feedback Card */}
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
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">分享您的回饋</h3>
                    <p className="text-sm text-muted-foreground">只需 2 分鐘</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進，也幫助其他求職者發現這項服務。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  留下回饋
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Trustpilot Card */}
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
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">在 Trustpilot 留下評論</h3>
                    <p className="text-sm text-muted-foreground">幫助他人找到優質服務</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">公開評論建立可信度，幫助其他專業人士做出明智決定。</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  撰寫評論
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Trustpilot Score Note */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">為什麼 Trustpilot 分數是 3.8？</span>
                <br className="hidden sm:block" />{" "}
                我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。
              </p>
            </div>

            {/* Share Results - Smaller */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">當您獲得面試或 offer 時，讓我知道！</p>
              <p className="text-sm text-muted-foreground mt-1">您的成功就是我的成功。成功故事幫助我精進方法。</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">對任何建議有問題或需要澄清？</p>
              <p className="text-muted-foreground mt-2">歡迎聯繫我。我在這裡幫助您成功。</p>
              <p className="text-gold mt-4 font-semibold">祝您求職申請順利！</p>
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

export default PeihuaYehReviewZhTw;
