import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const PinWeiWuReviewZhTw = () => {
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
              href="/reviews/pin-wei-wu-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Pin-Wei Wu</h1>
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
                <p className="text-3xl font-bold text-gold">基礎穩固，經驗尚有差距</p>
              </div>
              <ScoreGauge score={85} label="目前分數" size="md" />
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
                  <span className="text-foreground"><strong>乾淨、專業的版面配置</strong> - 結構良好的單欄格式，清晰的區塊標題、專業字體和適當的留白空間，確保 ATS 相容性和人眼可讀性</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>瑞典公民身份顯眼標示</strong> - 標題清楚標示「Swedish Citizen」，消除歐盟雇主對簽證/工作許可的疑慮，移除主要聘僱阻礙</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的 CRM 技術能力</strong> - 在多個職位中展示 HubSpot 和 Dynamics 365 的專業知識，顯示對客戶資料管理和營運效率的系統性方法</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>多語言能力</strong> - 母語中文、流利英語、中級日語（JLPT N2）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>B2B 經驗</strong> - 清晰的職涯軌跡，從行銷專員到客戶成功專員再到內部銷售專員，跨越多家公司展現責任遞增</span>
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
                  <span className="text-foreground"><strong>摘要缺乏量化銷售 KPI</strong> - 聲稱「5 年以上推動平台採用和 B2B 成長經驗」卻沒有任何績效指標證明（無配額達成率、管理營收、留存率或客戶組合規模）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>著重營運/CRM 而非銷售影響力</strong> - 強調「標準化 CRM 流程」和「提升營運效率」，而非營收創造、成交、客戶擴展或業務開發成果</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>初學者級瑞典語障礙</strong> - SFI Level D（初學者）可能無法符合斯德哥爾摩客戶經理職位要求的「瑞典語和英語完全流利」</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>目標職位經驗等級不符</strong> - 2-3 年客戶成功/客戶管理經驗，目標是大型跨國公司（如 Uber 台灣）的客戶主管級職位，但西方國家可能較為可行</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少銷售專業技能</strong> - 列出「客戶成功營運、B2B 溝通、技術疑難排解」，但缺乏關鍵銷售技能如管道管理、價值銷售、開發潛在客戶、談判或 Salesforce 專業知識</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>經歷中缺乏充分的業務影響指標</strong> - 沒有客戶組合規模、營收貢獻數字、留存百分比、擴展營收或業務成果來證明銷售/AM 效能</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>公司背景不清楚</strong> - Quizrr AB 和 Hyper Island 不是知名品牌；履歷未說明這些公司提供什麼產品/服務或服務哪些產業</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 目標準備度評估 - Uber 瑞典 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">目標準備度評估</h3>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">客戶經理，Uber Eats 瑞典（斯德哥爾摩）</p>
            <div className="overflow-x-auto mb-6">
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
                    <td className="py-2 text-foreground">瑞典語和英語完全流利</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                    <td className="py-2 text-muted-foreground">履歷顯示「Swedish (Beginner / SFI Level D)」- 這是根本性的不合格因素，因為此職位需要完全流利的瑞典語才能與當地餐廳合作夥伴建立關係</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">0-2 年客戶管理、業務開發、銷售或合作夥伴經驗</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">有約 2-3 年客戶成功/內部銷售經驗，但缺乏傳統配額制銷售或有營收目標的正式客戶管理</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">達成配額目標的記錄</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                    <td className="py-2 text-muted-foreground">履歷中任何地方都沒有配額達成、營收目標或銷售績效指標</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">跨職能協作</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">多個範例：「協調端到端交付...管理行銷、產品和全球客戶之間的複雜溝通」以及「作為客戶和工程團隊之間的主要聯繫人」</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">出色的溝通和關係建立</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">提及「B2B 溝通」和合作夥伴互動，但缺乏具體的關係建立成果範例（留存率、擴展營收、客戶滿意度評分）</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">以數據為導向的思維，熟悉 Excel/Sheets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">列出「進階 Excel」技能，加上「翻新 Dynamics 365 報表」和「監控線上能見度指標」的經驗展示分析能力</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">最低監督下自主工作</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">獨立管理國際 B2B 客戶組合，「主導 HubSpot CRM 標準化」顯示自我導向</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">快節奏環境中的適應力</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">履歷中的多家新創/規模化公司顯示對變化的適應能力，但未以具體範例明確展示</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">對餐廳業務的熱情</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">沒有餐廳/食品產業經驗；背景是 SaaS、電商、教育科技</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>整體契合度：60%</strong> - 具備基礎 B2B 客戶管理技能和技術能力，但瑞典語障礙是此斯德哥爾摩職位的根本性不合格因素。此外，缺乏展示的銷售績效指標（配額達成、營收目標）和餐廳產業背景。若無母語級瑞典語流利度，申請可能無法通過初步篩選。</p>
            </div>
            <div className="bg-gold/10 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>完全實施後：65% 準備就緒</strong> - 履歷改進可加強 B2B 客戶管理方面的定位，但無法克服瑞典語要求（需要 6-12 個月以上的密集語言學習才能達到專業流利度）</p>
            </div>
          </div>

          {/* 目標準備度評估 - Uber 台北 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">業務開發代表，Uber for Business（台北）</p>
            <div className="overflow-x-auto mb-6">
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
                    <td className="py-2 text-foreground">3 年以上開發、業務開發或合作夥伴經驗</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">有 5 年以上 B2B 經驗，但缺乏以外撥潛在客戶開發為重點的正式開發/業務開發角色；經驗更多是入站客戶成功和客戶管理</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">以客戶為中心，溝通能力優秀</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">「客戶成功與營運專業人員」，在多個職位中展示客戶關係管理；「優秀溝通」透過多語言能力和利害關係人協調展現</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">成長心態和積極態度</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">履歷顯示學習（瑞典語學習、多次公司轉換），但未透過具體範例明確展示成長心態</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">優秀的英語能力</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                    <td className="py-2 text-muted-foreground">列為「English (Fluent)」，並曾在需要英語商務溝通的國際公司工作</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">企業差旅或餐飲解決方案經驗</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 弱</span></td>
                    <td className="py-2 text-muted-foreground">沒有企業福利、HR 科技、差旅或餐飲解決方案產業經驗</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">有效外撥潛在客戶開發記錄</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                    <td className="py-2 text-muted-foreground">履歷顯示客戶管理和客戶成功，但沒有冷接觸、開發潛在客戶、潛在客戶資格審查或管道生成活動的證據</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">SQL/ARR 創造目標</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                    <td className="py-2 text-muted-foreground">沒有關於銷售合格潛在客戶、管道生成或年度經常性收入貢獻的指標</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">與客戶主管合作</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                    <td className="py-2 text-muted-foreground">有與內部團隊協調的經驗，但沒有明確的 BDR→AE 交接或銷售團隊協作範例</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>整體契合度：75%</strong> - 由於台灣地點、母語中文和 B2B 關係管理技能，比斯德哥爾摩職位更契合。但缺乏明確的開發/外撥潛在客戶開發經驗和銷售指標（SQL 目標、ARR 創造、轉換率）。經驗更多是客戶成功/客戶管理而非業務開發/銷售開發。</p>
            </div>
            <div className="bg-gold/10 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>完全實施後：85% 準備就緒</strong> - 透過履歷重新定位強調合作夥伴開發（Gaston Luga 聯盟/零售合作夥伴）、客戶組合成長（Hyper Island 營收擴展）和平台採用（Quizrr 合作夥伴互動），可更好展示與業務開發相關的技能</p>
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
                  <td className="py-2 text-foreground font-semibold">摘要焦點</td>
                  <td className="py-2 text-muted-foreground">營運效率與 CRM 標準化</td>
                  <td className="py-2 text-foreground">營收影響、客戶組合管理、帳戶擴展並附量化指標</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">銷售績效指標</td>
                  <td className="py-2 text-muted-foreground">完全未提及</td>
                  <td className="py-2 text-foreground">新增：[X] 位客戶管理、[Y]% 留存率、[$Z] 營收貢獻、[%] 擴展率</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">銷售專業技能</td>
                  <td className="py-2 text-muted-foreground">技能區塊中缺失</td>
                  <td className="py-2 text-foreground">新增：客戶管理、管道管理、價值銷售、開發潛在客戶、Salesforce、談判</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">公司背景</td>
                  <td className="py-2 text-muted-foreground">Quizrr AB 和 Hyper Island 未說明</td>
                  <td className="py-2 text-foreground">簡短產業/產品描述：「Quizrr AB（企業培訓 SaaS 測驗平台）」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">瑞典語障礙</td>
                  <td className="py-2 text-muted-foreground">「Beginner / SFI Level D」</td>
                  <td className="py-2 text-foreground">注意：不符合需要完全流利的斯德哥爾摩 AM 職位；專注於國際/台灣職位或密集瑞典語學習</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">經歷項目指標</td>
                  <td className="py-2 text-muted-foreground">沒有數字的通用描述</td>
                  <td className="py-2 text-foreground">量化：組合規模、管理營收、留存 %、支援票據減少 %、效率提升</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">銷售影響力框架</td>
                  <td className="py-2 text-muted-foreground">「減少支援票據」、「提升效率」</td>
                  <td className="py-2 text-foreground">重新框架：「提升客戶滿意度帶動 [X]% 追加銷售率」、「促成 [$Y] 擴展營收」</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 中</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">工作許可</td>
                  <td className="py-2 text-muted-foreground">標題中標示「Swedish Citizen」</td>
                  <td className="py-2 text-foreground">已最佳化 - 無需更改</td>
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
            我識別了 12 項策略性轉換，以最佳方式定位您申請 Uber 的客戶經理和業務開發代表職位。以下是影響最大的改變：
          </p>

          {/* 必須修正問題 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 必須修正 #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">在摘要中新增量化銷售 KPI</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（太籠統）：</p>
                <p className="text-foreground italic">Customer Success & Operations Professional with 5+ years of experience in driving platform adoption and B2B growth. Skilled in bridging the gap between client technical needs and internal product solutions. Proven track record in standardizing CRM (HubSpot/Dynamics 365) workflows to improve operational efficiency and ensure long-term partner success.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 「5 年以上經驗」沒有績效證明 - 通用的時間陳述無法讓您與其他候選人區別；每份客戶成功履歷都這麼說</p>
                  <p>⚠️ 「推動平台採用和 B2B 成長」缺乏指標 - 沒有說明成長多少、多少客戶、什麼採用率或產生什麼業務成果</p>
                  <p>⚠️ 「經證實的記錄」卻沒有證明 - 聲稱成功但提供零 KPI 支持（沒有留存率、營收數字、客戶滿意度評分、擴展百分比）</p>
                  <p>⚠️ 「標準化 CRM 流程」強調營運而非銷售 - 專注於內部流程改善而非營收創造、客戶獲取或帳戶擴展</p>
                  <p>⚠️ 「提升營運效率」不是銷售成果 - 營運語言不適合銷售/業務開發角色；招聘經理想看到配額達成、管道管理、成交</p>
                  <p>⚠️ 缺少競爭差異化 - 沒有顯示您相對於同儕的排名（前 10% 績效？獲獎者？最高留存率？）</p>
                  <p>⚠️ 沒有組合規模或營收範圍 - 未能傳達責任規模（[X] 位客戶管理？[$Y] 營收監管？[Z]% 區域成長？）</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground italic">Customer Success & Sales Professional with 5+ years managing B2B client portfolios ([NUMBER] accounts), driving [$VALUE] revenue growth and maintaining [X]% retention rates across SaaS, e-commerce, and education technology sectors. Expert in bridging technical solutions with client business needs, expanding accounts through consultative relationship management, and leveraging CRM systems (HubSpot/Dynamics 365) for pipeline visibility and data-driven decision-making.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 「Customer Success & Sales Professional」雙重定位 - 承認目前的客戶成功背景，同時轉向銷售導向角色</p>
                  <p>✅ 具體組合指標 - 「[NUMBER] 個帳戶」和「[$VALUE] 營收成長」量化責任規模（候選人應填入實際數字）</p>
                  <p>✅ 留存率顯示客戶管理卓越 - 「[X]% 留存」證明維護關係和防止流失的能力（對 AM 角色至關重要）</p>
                  <p>✅ 「透過顧問式關係管理擴展帳戶」- 將焦點從營運轉移到營收創造和帳戶成長</p>
                  <p>✅ CRM 框架為銷售賦能工具 - 「管道可見性和數據驅動決策」將 CRM 技能連接到銷售成果，而非僅營運效率</p>
                  <p>✅ 展示產業多樣性 - 「SaaS、電商和教育科技」顯示跨產業的多才多藝</p>
                  <p>✅ 強調業務成果 - 「可衡量的業務成果」標誌對銷售角色重要的結果導向</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>將通用的客戶成功摘要轉變為具有具體證據的引人注目的銷售導向價值主張。招聘人員可以立即看到：(1) 您管理大量客戶組合，(2) 您推動營收成長，(3) 您擅長客戶留存，(4) 您了解顧問式銷售方法</p>
            </div>
          </div>

          {/* 必須修正問題 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 必須修正 #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">重新框架經驗：從營運效率 → 銷售影響力</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（營運導向）：</p>
                <p className="text-foreground font-semibold">Quizrr AB - Inside Sales Specialist：</p>
                <p className="text-foreground italic">Data Transparency: Overhauled Dynamics 365 reporting to provide partners with clearer data insights, improving their decision-making speed and reducing support tickets.</p>
                <p className="text-foreground font-semibold mt-3">Hyper Island - Customer Success Specialist：</p>
                <p className="text-foreground italic">CRM Operations: Led the standardization of HubSpot CRM for 20+ corporate training programs, creating a unified data structure that allowed international teams to scale efficiently.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 「翻新 Dynamics 365 報表」強調系統工作而非客戶成果 - 專注於工具/流程而非對營收、留存或擴展的業務影響</p>
                  <p>⚠️ 「減少支援票據」是營運指標，不是銷售指標 - 客戶成功語言適合營運角色，但無法展示營收創造或帳戶成長</p>
                  <p>⚠️ 「主導 HubSpot CRM 標準化」是內部流程 - 顯示營運卓越但未連接到客戶獲取、成交或帳戶擴展</p>
                  <p>⚠️ 缺少營收影響 - 沒有說明 CRM 改進如何導致更多成交、更高勝率、更快銷售週期或增加管道可見性</p>
                  <p>⚠️ 沒有客戶組合規模或帳戶價值 - 未量化多少客戶從這些改進中受益或涉及多少營收</p>
                  <p>⚠️ 「讓國際團隊高效擴展」含糊 - 擴展到什麼？產生什麼業務成果？如何影響營收或客戶成長？</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground font-semibold">Quizrr AB - Inside Sales Specialist：</p>
                <p className="text-foreground italic">Managed [NUMBER]-partner B2B portfolio ([$VALUE] ARR) by implementing Dynamics 365 reporting dashboard that reduced client escalations by [X]% and enabled [Y]% account expansion through proactive issue identification and data-driven client business reviews.</p>
                <p className="text-foreground font-semibold mt-3">Hyper Island - Customer Success Specialist：</p>
                <p className="text-foreground italic">Standardized HubSpot CRM operations for 20+ corporate training programs, creating unified pipeline visibility that enabled sales team to increase forecast accuracy to [X]% and reduce sales cycle time by [Y] days through improved lead qualification and opportunity tracking.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 組合規模和 ARR 量化 - 「[NUMBER] 合作夥伴組合（[$VALUE] ARR）」顯示客戶管理責任規模</p>
                  <p>✅ 客戶升級與留存相關 - 「減少客戶升級 [X]%」展示防止流失的關係管理卓越</p>
                  <p>✅ 帳戶擴展百分比 - 「[Y]% 帳戶擴展」證明擴展現有帳戶的能力（關鍵 AM 技能）</p>
                  <p>✅ 「主動問題識別」顯示顧問式方法 - 不是被動支援，而是策略性帳戶管理</p>
                  <p>✅ CRM 連接到銷售成果 - 「預測準確性」和「銷售週期時間」是銷售指標，不僅是營運指標</p>
                  <p>✅ 「數據驅動的客戶業務審查」- 顯示對帳戶管理和價值展示的結構化方法</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>將營運成就轉化為與銷售相關的成就。招聘經理現在看到您是推動營收和擴展的人，而不僅是維護系統的人。</p>
            </div>
          </div>

          {/* 必須修正問題 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 必須修正 #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">在技能區塊新增銷售專業技能</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（缺少關鍵銷售技能）：</p>
                <p className="text-foreground"><strong>Technical:</strong> CRM (HubSpot, Dynamics 365), MS Office (Advanced Excel), E-commerce Platforms (Shopify, Magento), Inventory Management (Boomerang)</p>
                <p className="text-foreground mt-2"><strong>Expertise:</strong> Customer Success Ops, B2B Communication, Technical Troubleshooting, Stakeholder Coordination, Process Improvement</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 沒有列出客戶管理或銷售技能 - 「Customer Success Ops」和「Process Improvement」是營運性的，不是銷售導向的</p>
                  <p>⚠️ 缺少管道管理 - 對 AM 和 BDR 角色都是關鍵技能（管道生成、機會追蹤、預測準確性）</p>
                  <p>⚠️ 沒有價值銷售或顧問式銷售方法 - 未顯示對解決方案銷售或顧問式方法的理解</p>
                  <p>⚠️ 缺少開發/業務開發技能 - BDR 角色需要冷接觸、潛在客戶資格審查、SDR 策略 - 都未提及</p>
                  <p>⚠️ 未提及 Salesforce - 雖然有 HubSpot/Dynamics 365，但 Salesforce 是大型科技公司銷售角色的產業標準</p>
                  <p>⚠️ 缺少談判技能 - 對管理續約、追加銷售、合約談判的 AM 角色至關重要</p>
                  <p>⚠️ 「Technical Troubleshooting」聽起來像支援角色 - 與銷售職位不相關；應強調業務問題解決</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground"><strong>Sales & Account Management:</strong> • Account Management & Expansion • B2B Pipeline Management • Value-Based Selling • Client Relationship Strategy • Prospecting & Lead Qualification • Contract Negotiation & Renewals</p>
                <p className="text-foreground mt-2"><strong>CRM & Sales Operations:</strong> • CRM Pipeline Management (HubSpot, Dynamics 365) • Sales Forecasting & Analytics • Opportunity Tracking & Reporting • Advanced Excel (Pivot Tables, VLOOKUP, Data Analysis)</p>
                <p className="text-foreground mt-2"><strong>Client Engagement:</strong> • Consultative Needs Analysis • Stakeholder Coordination (Technical & Business Buyers) • Executive Business Reviews • Cross-Functional Collaboration (Product, Engineering, Marketing)</p>
                <p className="text-foreground mt-2"><strong>Languages:</strong> • Mandarin (Native) • English (Fluent) • Swedish (Beginner / SFI Level D) • Japanese (Intermediate; JLPT N2)</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>技能區塊現在讀起來像銷售專業人員的履歷，而非客戶成功營運專員。ATS 將匹配關鍵關鍵字（Pipeline Management、Value Selling、Salesforce、Prospecting），招聘經理將看到相關的 AM/BDR 能力。</p>
            </div>
          </div>

          {/* 重要更改區塊 */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟡 重要更改</h3>

          {/* 重要更改 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #1</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">為 Quizrr AB 和 Hyper Island 新增公司背景</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">缺少什麼：</p>
                <p className="text-sm text-muted-foreground">Quizrr AB 和 Hyper Island 不是家喻戶曉的名字。Uber 等大公司的招聘人員可能不知道這些公司提供什麼產品/服務、服務哪些產業、運營什麼商業模式，或公司規模和市場地位。沒有這個背景，您的經驗缺乏可信度，招聘經理無法評估可轉移性。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">在公司名稱後新增：</p>
                <p className="text-foreground"><strong>Inside Sales Specialist, Quizrr AB</strong> <span className="text-muted-foreground">(SaaS quiz platform for corporate training)</span><br/>Mar 2025 - Sep 2025</p>
                <p className="text-foreground mt-3"><strong>Customer Success Specialist, Hyper Island</strong> <span className="text-muted-foreground">(Global education company specializing in corporate digital transformation training)</span><br/>Sep 2023 - Feb 2025</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>為公司合法性和市場地位提供即時背景。幫助招聘人員了解 B2B SaaS 和教育科技的可轉移性。顯示您為合法企業工作，而非不知名的新創公司。澄清經驗是 B2B 企業導向的，而非面向消費者的。</p>
            </div>
          </div>

          {/* 重要更改 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #2</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">量化所有職位的客戶組合規模</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">缺少什麼：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• 您同時管理多少客戶？</li>
                  <li>• 這些帳戶的規模/價值是多少？</li>
                  <li>• 您獲取了多少新帳戶？</li>
                  <li>• 您的業務簿規模是多少？</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">為每個職位新增指標：</p>
                <p className="text-foreground"><strong>Quizrr AB:</strong> Managed a portfolio of [NUMBER] international B2B clients</p>
                <p className="text-foreground mt-2"><strong>Hyper Island:</strong> Facilitated 1.5M SEK in growth across [NUMBER] corporate training accounts</p>
                <p className="text-foreground mt-2"><strong>Gaston Luga AB:</strong> Built and managed [NUMBER] high-performing affiliate and retail partnerships</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>展示責任規模。顯示您能處理企業工作量。證明多帳戶管理能力（對 AM 角色至關重要）。提供經驗的具體範圍。</p>
            </div>
          </div>

          {/* 重要更改 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #3</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">將 Hyper Island 營收指標轉換為清晰的歸屬</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本：</p>
                <p className="text-foreground italic">Revenue & Impact: Facilitated 1.5M SEK in growth by identifying user pain points and aligning digital solutions with partner business goals.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 「Facilitated」是被動語言 - 聽起來像您幫助別人創造營收，而不是您直接推動的</p>
                  <p>⚠️ 歸屬不清楚 - 這是您的個人貢獻還是團隊營收？新業務還是擴展？您的組合還是全公司？</p>
                  <p>⚠️ 缺少時間框架 - 1.5M SEK 是多長時間的？年度？整個任期期間？</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground italic">Contributed to 1.5M SEK annual revenue growth by identifying client pain points in [NUMBER] corporate accounts and aligning digital transformation training solutions to business objectives, achieving [X]% client retention rate and [Y]% expansion revenue from existing accounts.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>為何有效：</strong>「Contributed to」誠實但主動 - 顯示擁有權同時承認團隊環境。「Annual revenue growth」澄清時間框架。新增帳戶數量顯示組合規模。留存和擴展率證明帳戶管理卓越。業務目標對齊展示顧問式方法。</p>
            </div>
          </div>

          {/* 重要更改 #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #4</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">重新框架 Gaston Luga 合作夥伴工作為銷售/AM 經驗</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本：</p>
                <p className="text-foreground italic">Partner Growth: Delivered a 58% sales increase in the Taiwan market by building and managing high-performing affiliate and retail partnerships.</p>
                <p className="text-sm text-foreground mt-2 font-semibold">這實際上是強大的銷售經驗，但被埋在「Marketing Associate」頭銜下！</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 職位頭銜說「Marketing」但工作明顯是合作夥伴/業務開發/AM - 隱藏了相關的銷售經驗</p>
                  <p>⚠️ 沒有合作夥伴獲取指標 - 您入職了多少合作夥伴？轉換率是多少？</p>
                  <p>⚠️ 缺少合作夥伴結構 - 這些是營收分成交易？批發？零售寄售？</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground italic"><strong>Partnership Development & Account Management:</strong> Built Taiwan market from zero to [NUMBER] affiliate and retail partnerships, delivering 58% sales increase ([$VALUE] revenue growth) through partner acquisition, relationship management, and performance optimization. Negotiated commercial terms, provided partner enablement training, and conducted quarterly business reviews to drive [X]% partner retention rate.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>影響：</strong>這個項目現在讀起來像客戶經理或業務開發經理經驗，使其與 Uber AM/BDR 角色高度相關。58% 成長指標在定位為合作夥伴銷售成就時變得更令人印象深刻。</p>
            </div>
          </div>

          {/* 重要更改 #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 重要 #5</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">重新框架「減少支援票據」為客戶滿意度 → 追加銷售機會</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（Quizrr AB）：</p>
                <p className="text-foreground italic">Data Transparency: Overhauled Dynamics 365 reporting to provide partners with clearer data insights, improving their decision-making speed and reducing support tickets.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ 「減少支援票據」聽起來像客戶支援角色 - 與銷售職位不相關</p>
                  <p>⚠️ 營運指標而非業務成果 - 應連接到留存、擴展或營收</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground italic">Implemented Dynamics 365 self-service reporting dashboard for [NUMBER] B2B partners, reducing escalations by [X]% and improving client satisfaction scores, which contributed to [Y]% account expansion rate through increased product adoption and identification of upsell opportunities.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>為何有效：</strong>「Self-service reporting」顯示賦能 - 主動的帳戶管理，而非被動的支援。將滿意度連接到擴展 - 顯示您了解 CS 如何推動營收。「Upsell opportunities」是銷售語言 - 展示商業意識。帳戶擴展率是 AM 指標 - 與客戶經理角色直接相關。如果無法實現這一點，請移除這個要點。</p>
            </div>
          </div>

          {/* 最終潤飾項目 */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟢 最終潤飾項目</h3>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">🟢 低優先級</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">考慮重新排列標題元素以強調重點</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">目前順序：</p>
                <p className="text-foreground font-mono text-sm">Brommaplan, Stockholm • +46 793133294 • pinweiwu81@gmail.com • Swedish Citizen • Linkedin</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">替代順序（首先強調公民身份）：</p>
                <p className="text-foreground font-mono text-sm">Swedish Citizen | Brommaplan, Stockholm<br/>+46 793133294 | pinweiwu81@gmail.com | linkedin.com/in/[yourprofile]</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>為何：</strong>以瑞典公民身份開頭（歐盟職位的主要賣點），使用兩行格式以獲得更好的可讀性。<strong>影響：</strong>最小但改善視覺層次結構並確保公民身份是招聘人員首先看到的內容。</p>
            </div>
          </div>
        </section>

        {/* 第三部分：詳細逐項分析 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Layout className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第三部分：詳細逐項分析</h2>
          </div>

          {/* 1. 標題與聯絡資訊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. 標題與聯絡資訊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 公民身份明確，版面乾淨)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 瑞典公民身份明確標示 - 立即消除歐盟工作許可問題</li>
                  <li>• 斯德哥爾摩位置相關 - 符合目標職位地理位置</li>
                  <li>• 專業電子郵件格式</li>
                  <li>• 包含 LinkedIn 連結 - 現代簡歷必備</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 可以更強調公民身份 - 移到第一位置以立即吸引注意力</li>
                </ul>
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

          {/* 2. 專業摘要 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. 專業摘要</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 經驗聲明，缺乏銷售指標)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 5 年以上經驗聲明 - 顯示資歷水平</li>
                  <li>• 提及 B2B 成長和平台採用</li>
                  <li>• CRM 專業知識（HubSpot、Dynamics 365）明確</li>
                  <li>• 技術與業務橋接能力</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 無量化銷售 KPI - 沒有配額、營收或留存數字</li>
                  <li>• 營運語言而非銷售語言 - 「效率」而非「營收」</li>
                  <li>• 缺乏客戶組合規模</li>
                  <li>• 無競爭差異化</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 3. 技能區塊 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. 技能區塊</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 相關技術技能，缺乏銷售焦點)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 強大的 CRM 能力 - HubSpot 和 Dynamics 365 是產業標準工具</li>
                  <li>• 進階 Excel 技能 - 銷售角色中數據分析的關鍵</li>
                  <li>• B2B 溝通強調 - 與面對客戶的職位相關</li>
                  <li>• 邏輯分組 - 技術 vs 專業 vs 語言使瀏覽容易</li>
                  <li>• 多語言能力 - 四種語言展示文化適應力</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 無客戶管理或銷售方法技能</li>
                  <li>• 缺少管道管理 - 對 AM 和 BDR 角色至關重要</li>
                  <li>• 無價值銷售或顧問式銷售方法</li>
                  <li>• 缺乏開發和業務開發技能</li>
                  <li>• 未提及 Salesforce - 大型科技公司的產業標準</li>
                  <li>• 無談判技能 - 對 AM 角色至關重要</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 4. 工作經驗 - Quizrr AB */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Inside Sales Specialist, Quizrr AB (Mar 2025 - Sep 2025)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 缺乏背景和指標)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 「Inside Sales Specialist」是好頭銜 - 明確銷售導向</li>
                  <li>• 多市場範圍 - 「國際 B2B 客戶，跨越歐洲和亞洲」</li>
                  <li>• 技術與業務橋接 - 連接客戶和工程團隊</li>
                  <li>• CRM 專業知識 - Dynamics 365 實施</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 無公司背景 - Quizrr AB 是什麼？</li>
                  <li>• 缺少組合規模 - 多少客戶？</li>
                  <li>• 無銷售指標 - 配額、營收、轉換率？</li>
                  <li>• 「減少支援票據」是營運指標 - 應該是銷售成果</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 5. 工作經驗 - Hyper Island */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. Customer Success Specialist, Hyper Island (Sep 2023 - Feb 2025)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 強營收指標，需更好歸屬)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 量化營收影響 - 「1.5M SEK 成長」是具體的</li>
                  <li>• 規模化 CRM 標準化 - 「20+ 企業培訓專案」</li>
                  <li>• 跨職能協調 - 行銷、產品和全球客戶</li>
                  <li>• 國際曝光 - 全球團隊和客戶</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 無公司背景 - Hyper Island 不是廣為人知</li>
                  <li>• 「Facilitated」是被動語言 - 聽起來像支援角色</li>
                  <li>• 營收歸屬不清楚 - 個人 vs 團隊貢獻？</li>
                  <li>• 1.5M SEK 沒有時間框架 - 年度？整個任期？</li>
                  <li>• 無帳戶數量或留存指標</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 6. 工作經驗 - Gaston Luga */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Senior Marketing Associate, Gaston Luga AB (Jan 2020 - Aug 2022)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 行銷頭銜下隱藏的銷售經驗)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 卓越成長指標 - 「58% 銷售增長」令人印象深刻</li>
                  <li>• 展示合作夥伴開發 - 建立聯盟和零售合作夥伴是業務開發工作</li>
                  <li>• 提及培訓/賦能 - 顯示領導能力</li>
                  <li>• 市場建設經驗 - 台灣市場開發展示創業心態</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 職位頭銜說「Marketing」但工作明顯是合作夥伴/業務開發/AM - 隱藏相關銷售經驗</li>
                  <li>• 無合作夥伴獲取指標 - 入職多少合作夥伴？</li>
                  <li>• 58% 銷售增長未提供背景 - 什麼基準？什麼絕對營收？</li>
                  <li>• 未說明合作夥伴結構 - 營收分成？批發？</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>關鍵說明：</strong>此角色包含您最強的銷售/業務開發證據。透過合作夥伴開發實現 58% 成長與 Uber AM 和 BDR 角色都高度相關。透過將此重新框架為合作夥伴開發與客戶管理工作，您將顯著加強您的候選資格。</p>
            </div>

            {/* Gaston Luga 詳細項目轉換 */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground">詳細項目轉換：</h4>
              
              {/* 項目 #1 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">項目 #1 - 之前：</p>
                <p className="text-foreground italic">Partner Growth: Delivered a 58% sales increase in the Taiwan market by building and managing high-performing affiliate and retail partnerships.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">之後：</p>
                <p className="text-foreground italic"><strong>Partnership Development & Account Management:</strong> Built Taiwan market from zero to [NUMBER] affiliate and retail partnerships (e-commerce platforms, retail stores, influencer affiliates), delivering 58% sales increase ([$VALUE] revenue growth from [$BASELINE] to [$END]) through partner acquisition, relationship management, and performance optimization.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 子標題將工作重新定位為業務開發/AM</p>
                  <p>✅ 「從零開始」顯示業務開發能力</p>
                  <p>✅ 合作夥伴數量量化並指定合作夥伴類型</p>
                  <p>✅ 絕對營收數字為 58% 成長提供背景</p>
                  <p>✅ 「關係管理和績效優化」是 AM 活動</p>
                </div>
              </div>

              {/* 項目 #2 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">項目 #2 - 之前：</p>
                <p className="text-foreground italic">CRM Digital Strategy: Managed CRM-based influencer campaigns and standardized internal data processes to ensure seamless marketing-commercial alignment.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">之後：</p>
                <p className="text-foreground italic">Managed [NUMBER] influencer partnership campaigns generating [$VALUE] revenue through performance tracking in CRM system, negotiating commercial terms ([X]% commission structure), and conducting monthly partner performance reviews to optimize ROI and ensure [Y]% partner retention rate.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 活動數量和營收量化</p>
                  <p>✅ 「談判商業條款」顯示銷售/業務開發技能</p>
                  <p>✅ 佣金結構展示對合作夥伴經濟的理解</p>
                  <p>✅ 「每月合作夥伴績效審查」對應 AM 季度業務審查</p>
                  <p>✅ 合作夥伴留存率證明關係管理能力</p>
                </div>
              </div>

              {/* 項目 #3 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">項目 #3 - 之前：</p>
                <p className="text-foreground italic">Workflow Enablement: Trained team members on CRM usage and data processes.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">之後：</p>
                <p className="text-foreground italic">Trained [NUMBER] cross-functional team members (sales, marketing, operations) on partnership management best practices and CRM workflow optimization, improving data quality by [X]% and enabling [$Y] incremental revenue through partner segmentation and targeted engagement.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ 培訓範圍量化</p>
                  <p>✅ 顯示跨職能影響</p>
                  <p>✅ 數據品質改進可衡量</p>
                  <p>✅ 將培訓連接到營收影響</p>
                  <p>✅ 「合作夥伴細分和目標互動」是銷售/AM 技能</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 7. 工作經驗 - Unilever */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. E-commerce Coordinator Intern, Unilever (Jul 2019 - Dec 2019)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - 知名品牌，需更強的影響力指標)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Unilever 是知名品牌 - 立即建立可信度</li>
                  <li>• 電商經驗相關 - 展示數位銷售渠道理解</li>
                  <li>• 提及跨職能協調</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 項目缺乏具體影響指標</li>
                  <li>• 描述過於籠統</li>
                  <li>• 未量化營收或成長貢獻</li>
                </ul>
              </div>
            </div>

            {/* 詳細項目轉換 */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground">詳細項目轉換：</h4>
              
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">之前：</p>
                <p className="text-foreground italic">Monitored e-commerce performance metrics and coordinated with brand teams to optimize product listings across platforms.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">之後：</p>
                <p className="text-foreground italic">Monitored e-commerce performance across [NUMBER] product SKUs, coordinating with [NUMBER] brand teams to optimize product listings that contributed to [X]% increase in online visibility and [Y]% improvement in conversion rates on major e-commerce platforms (momo, PChome, Shopee).</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ SKU 數量顯示責任範圍</p>
                  <p>✅ 品牌團隊數量展示跨職能協調</p>
                  <p>✅ 能見度和轉換率改進可衡量</p>
                  <p>✅ 具名平台增加具體性</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
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

          {/* 8. 教育 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. 教育</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - 良好學歷，簡潔呈現)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> 表現優異
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Hyper Island 碩士學位 - 數位管理專業</li>
                  <li>• 國立台北大學學士 - 國際商業專業</li>
                  <li>• JLPT N2 日語認證 - 顯示語言投資</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> 待改進
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 可新增相關課程或專案</li>
                  <li>• GPA 若優異可列出</li>
                </ul>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>分數：</strong> ⭐⭐⭐⭐ (4/5) - 良好，無需重大更改</p>
          </div>
        </section>

        {/* 第四部分：ATS 優化與競爭力 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">第四部分：ATS 優化與競爭力</h2>
          </div>

          {/* ATS 優化 - Uber 瑞典 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS 優化 - 客戶經理，Uber Eats 瑞典（斯德哥爾摩）
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">優化前 - 關鍵字匹配：35%</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber 關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Account Management</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Quota achievement</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Restaurant industry</td>
                    <td className="py-2 text-muted-foreground">無相關經驗</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Swedish fluency</td>
                    <td className="py-2 text-muted-foreground">僅初學者級</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">優化後 - 關鍵字匹配：65%</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber 關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Account Management</td>
                    <td className="py-2 text-muted-foreground">技能區塊 + 經驗項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data-driven</td>
                    <td className="py-2 text-muted-foreground">CRM 報表 + Excel</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cross-functional</td>
                    <td className="py-2 text-muted-foreground">多個經驗項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership Management</td>
                    <td className="py-2 text-muted-foreground">Gaston Luga 合作夥伴開發區塊</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Quota targets</td>
                    <td className="py-2 text-muted-foreground">（若有目標可新增）</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 中等</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Swedish fluency</td>
                    <td className="py-2 text-muted-foreground">「Beginner / SFI Level D」（誠實揭露）</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 關鍵差距</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>注意：</strong>餐廳產業經驗和母語級瑞典語流利度無法捏造。專注於可轉移的 B2B 合作夥伴/客戶管理技能，同時對差距保持透明。</p>
            </div>
          </div>

          {/* ATS 優化 - Uber 台北 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS 優化 - 業務開發代表，Uber for Business（台北）
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">優化前 - 關鍵字匹配：20%</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber 關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Prospecting</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Lead generation</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business development</td>
                    <td className="py-2 text-muted-foreground">未提及</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 缺失</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership</td>
                    <td className="py-2 text-muted-foreground">Gaston Luga 中提及</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ 弱</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">優化後 - 關鍵字匹配：85%</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber 關鍵字</th>
                    <th className="text-left py-2 text-foreground">履歷中是否存在？</th>
                    <th className="text-left py-2 text-foreground">狀態</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Prospecting</td>
                    <td className="py-2 text-muted-foreground">技能區塊 + 經驗項目</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Lead generation</td>
                    <td className="py-2 text-muted-foreground">技能 + 合作夥伴獲取指標</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business development</td>
                    <td className="py-2 text-muted-foreground">技能 + Gaston Luga 合作夥伴開發</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership</td>
                    <td className="py-2 text-muted-foreground">Gaston Luga + Quizrr 合作夥伴互動</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Communication skills</td>
                    <td className="py-2 text-muted-foreground">摘要 + 技能 + 多語言能力</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ 強</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Corporate travel/meal solutions</td>
                    <td className="py-2 text-muted-foreground">無經驗（誠實差距）</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ 弱</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>與 BDR 要求優秀對齊</strong>透過重新定位客戶成功和合作夥伴開發經驗。台北 BDR 角色是您更強的目標。</p>
            </div>
          </div>

          {/* 要新增的關鍵字 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">在整份履歷中新增的關鍵字</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">銷售與業務開發</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Account Management</li>
                  <li>• Business Development</li>
                  <li>• Pipeline Management</li>
                  <li>• Value-Based Selling</li>
                  <li>• Account Expansion</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">開發與管道</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Prospecting</li>
                  <li>• Lead Qualification</li>
                  <li>• Partner Acquisition</li>
                  <li>• Client Retention</li>
                  <li>• Revenue Growth</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">關係管理</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Executive Business Reviews</li>
                  <li>• Stakeholder Coordination</li>
                  <li>• Contract Negotiation</li>
                  <li>• Cross-Functional Collaboration</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>提示：</strong>只包含真正反映您經驗的關鍵字，因為面試官會要求您詳細說明列出的任何內容。</p>
          </div>

          {/* 策略建議 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">策略建議</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">客戶經理，Uber Eats 瑞典（斯德哥爾摩）：</p>
                <p className="text-sm text-destructive mb-2"><strong>現實評估：</strong>沒有專業級瑞典語流利度，無論履歷優化如何，候選資格都不太可能推進。此角色需要每天與瑞典餐廳合作夥伴以母語溝通。</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">業務開發代表，Uber for Business（台北）：</p>
                <p className="text-sm text-gold mb-2"><strong>現實評估：</strong>履歷重新定位後 75-85% 契合。您的合作夥伴開發工作、客戶成功組合管理和營收貢獻提供了可轉移的基礎。主要挑戰是缺乏傳統的外撥 BDR 經驗，但 Uber 可能重視 B2B 銷售開發的合作夥伴/關係技能。</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">值得考慮的替代職業路徑：</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><strong>路徑 1：客戶經理角色（比 AE 更適合）</strong> - 您的經驗與客戶經理（組合管理、留存、擴展）比客戶主管（新業務獲取、配額制銷售）更為一致</li>
                  <li><strong>路徑 2：銷售營運 / 營收營運</strong> - 利用您的 CRM 標準化和流程優化優勢。在 RevOps 1-2 年 → 轉型為具有內部信譽的直接銷售角色</li>
                </ul>
              </div>
            </div>
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

          {/* 填寫佔位指標 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> 1. 填寫佔位指標
            </h3>
            <p className="text-sm text-muted-foreground mb-4">檢查您的履歷並用實際數字替換 [NUMBER]、[$VALUE]、[X]% 佔位符：</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Quizrr AB：</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>您的組合中有多少 B2B 客戶？</li>
                  <li>您管理的大約 ARR 是多少？</li>
                  <li>支援票據/升級減少了多少百分比？</li>
                  <li>您達成了多少百分比的帳戶擴展？</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Hyper Island：</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>您管理多少企業培訓帳戶？</li>
                  <li>您的客戶留存率是多少？</li>
                  <li>1.5M SEK 成長中有多少直接歸因於您的帳戶？</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Gaston Luga：</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>您建立了多少聯盟合作夥伴？</li>
                  <li>多少零售合作夥伴？</li>
                  <li>您的合作夥伴專案之前與之後的基準營收是多少？</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>如果您沒有確切數字：</strong>使用保守估計（「15-20 個帳戶」），使用範圍（「[$400K-$600K] ARR」），使用限定詞（「大約 X%」）。永遠不要捏造指標，但要根據合理回憶量化您的影響。</p>
            </div>
          </div>

          {/* 準備面試故事 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" /> 2. 使用 STAR 方法準備面試故事
            </h3>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">STAR 框架：</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>S</strong>ituation（情境）：背景/問題是什麼？</li>
                  <li><strong>T</strong>ask（任務）：您的具體責任是什麼？</li>
                  <li><strong>A</strong>ction（行動）：您做了什麼？（逐步）</li>
                  <li><strong>R</strong>esult（結果）：發生了什麼？（量化）</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">要準備的範例故事：</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li><strong>故事 1：合作夥伴開發（Gaston Luga）</strong> - 台灣市場未開發 → 從零建立聯盟網絡 → [X] 個合作夥伴、58% 銷售增長</li>
                  <li><strong>故事 2：帳戶擴展（Hyper Island）</strong> - 客戶面臨採用挑戰 → 提高利用率 → [X]% 擴展營收</li>
                  <li><strong>故事 3：CRM 優化 → 銷售影響（Quizrr）</strong> - 合作夥伴缺乏可見性 → 實施儀表板 → [X]% 帳戶擴展</li>
                  <li><strong>故事 4：跨文化協作</strong> - 與國際團隊合作 → 建立協議 → [X]% 準時交付</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 該做與不該做 */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 該做
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• <strong>為每份申請客製化</strong> - 調整 2-3 個項目以匹配特定 JD 關鍵字</li>
                <li>• <strong>首先申請台北 BDR 角色</strong> - 鑑於語言/地點契合，成功機率較高</li>
                <li>• <strong>徹底研究公司</strong> - 在求職信中參考特定 Uber for Business 計劃</li>
                <li>• <strong>策略性跟進</strong> - 申請後 5-7 天發送郵件給招聘人員</li>
                <li>• <strong>準備好解釋每個指標</strong> - 面試官會深入詢問細節</li>
                <li>• <strong>誠實承認 CS 背景</strong> - 「客戶成功基礎讓我具有深厚的客戶同理心」</li>
                <li>• <strong>展示商業意識</strong> - 討論營收影響，而非僅營運效率</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 不該做
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• <strong>不要未客製化就申請</strong> - 通用履歷很快被過濾</li>
                <li>• <strong>不要誇大超出可辯護範圍的指標</strong> - 準備好解釋計算方式</li>
                <li>• <strong>不要詆毀前雇主</strong> - 正面框架轉換</li>
                <li>• <strong>不要為客戶成功背景道歉</strong> - 這是資產，不是負債</li>
                <li>• <strong>不要聲稱沒有的銷售技能</strong> - 對 CS → 銷售轉型保持誠實</li>
                <li>• <strong>不要只專注於營運</strong> - 與營收/業務影響平衡</li>
                <li>• <strong>不要使用被動語言</strong> - 「Facilitated」、「Helped」讓您聽起來資淺</li>
                <li>• <strong>不要讓指標模糊</strong> - 「顯著成長」毫無用處；量化或使用範圍</li>
              </ul>
            </div>
          </div>
        </section>

        {/* 結語 */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉型</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">之前：</p>
                <ScoreGauge score={85} label="原始履歷" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">之後：</p>
                <ScoreGauge score={95} label="優化履歷" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>您的經驗比目前履歷呈現的更強：</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 5 年以上跨多產業的 B2B 客戶關係管理</li>
                <li>• 展示的營收影響（1.5M SEK 成長、58% 銷售增長）</li>
                <li>• 從零開始的合作夥伴開發（Gaston Luga 網絡建設）</li>
                <li>• 技術到業務轉譯技能（技術產品銷售的關鍵）</li>
                <li>• 國際/跨文化經驗（瑞典、台灣、全球團隊）</li>
                <li>• 多語言能力（中文、英語、日語、瑞典語）</li>
                <li>• CRM 和數據驅動決策專業知識</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>最後思考：</strong></p>
              <p className="text-muted-foreground mt-2">銷售/業務開發經驗被埋在「Marketing Associate」和「Customer Success」頭銜下。營收指標沒有顯眼呈現。合作夥伴獲取沒有框架為業務開發。帳戶擴展工作沒有量化。</p>
              <p className="text-gold mt-4 font-semibold">您有經驗。現在您有定位。去拿下 offer 吧。🚀</p>
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
              {/* 分享意見回饋卡片 */}
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

              {/* Trustpilot 卡片 */}
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

            {/* Trustpilot 分數說明 */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">為何 Trustpilot 分數是 3.8？</span>
                <br className="hidden sm:block" />{" "}
                我剛開始創業，Trustpilot 對新企業套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的新增，分數會調整以反映實際服務品質。
              </p>
            </div>

            {/* 分享結果 - 較小 */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">🎉 當您獲得面試或 offer 時，請告訴我！</p>
              <p className="text-sm text-muted-foreground mt-1">您的勝利就是我的勝利。成功故事幫助我改進方法。</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">有問題或需要對任何建議進行澄清？</p>
              <p className="text-muted-foreground mt-2">歡迎聯繫。我在這裡幫助您成功。</p>
              <p className="text-gold mt-4 font-semibold">祝您申請順利！</p>
              <p className="text-sm text-muted-foreground mt-4">審查完成：2026 年 1 月</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default PinWeiWuReviewZhTw;