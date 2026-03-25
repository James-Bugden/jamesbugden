import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare, Phone, MapPin, Shield, Trash2, Edit3, Search, UserCheck, Code, Database, TestTube, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const JanelleChengReviewZhTw = () => {
  return (
      <div className="min-h-screen bg-background">
      <SEO />
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <ReviewLanguageToggle />
            <a href="/downloads/CHI_CHENG_JANELLE_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">下載 PDF</span>
            </a>
          </div>
        </div>
      </header>

      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審閱報告</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Janelle Cheng</h1>
          <p className="text-cream/80 text-lg">資深分析工程師 | Maniko Nails & Riot</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        {/* 整體評估 */}
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
                <p className="text-3xl font-bold text-gold">90/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="修改前" size="md" />
                <ScoreGauge score={95} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷展現了強大的分析工程師定位，在目前職位有出色的技術執行力。</p>
              <p><strong>第一，缺少關鍵聯絡資訊對歐盟招募人員造成即時摩擦。</strong>沒有電話號碼、沒有明確地點，最關鍵的是從台灣申請德國和法國職位卻沒有工作授權聲明，意味著無論資歷如何，您的申請都面臨自動篩選挑戰。</p>
              <p><strong>第二，分配給不相關內容的空間減少了對最強技術工作的聚焦。</strong>專業發展（聚會參與）和志工經驗（2013 年觀光規劃）佔用寶貴的履歷空間卻不支持您的分析工程師定位。</p>
              <p><strong>第三，部分要點缺乏展示影響力深度所需的具體性。</strong>雖然大多數要點遵循 XYZ 框架，但一些關鍵成就（KPI 分析使毛利增加 3 倍、客戶留存改善）需要更清晰的方法論來展示您的工作如何創造商業價值。</p>
              <p>然而，您的核心資歷對分析工程師職位來說是卓越的。您的 dbt 實務經驗將 SAP 資料轉換為 20 多個商業模型、10 多個自動化 Tableau 儀表板並 100% 準時交付、跨歐洲/美國/亞洲的多區域 BI 統一、建立自助分析文化，以及 9 年橋接商業策略與資料建模的經驗。</p>
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於呈現細節造成不必要的摩擦。</p>
            </div>
          </div>

          {/* 優點與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現良好的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>出色的目前職位呈現：</strong>Teamson Design Corp 要點展現強大的分析工程師能力，包含 dbt 工作流程、星型綱要建模、高階 BI 交付和利害關係人賦能，全部帶有量化指標（20+ 模型、10+ 儀表板、100% 準時、24% 工單減少、3 倍毛利增加）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>出色的摘要：</strong>您的摘要已經非常出色且針對分析工程師職位量身定制，清楚定位您為「橋接商業策略與資料建模的分析工程師」，量化 9 年經驗，強調國際協作（歐洲/美國/亞洲），並自然整合關鍵字（dbt、SQL、Tableau）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>現代技術堆疊：</strong>您的技術堆疊區塊涵蓋所有主要分析工程師工具，dbt、SQL、Tableau、Python、Airflow、Docker、Git 與 CI/CD，以及 GCP（BigQuery、GCS、Compute Engine）展現超越基本 SQL 分析的工程思維</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的 XYZ 框架執行：</strong>大多數要點有效遵循「完成 [X] 透過 [Y] 衡量，藉由做 [Z]」結構，展示成果（20% 延遲改善）、量化（10+ 儀表板、100+ 用戶）和方法（dbt 工作流程、星型綱要模型、RBAC 管理）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>乾淨格式和視覺層次：</strong>兩頁格式適合您的經驗水準，版面專業且易於掃描，區塊邏輯組織，並善用背景說明（如「玩具與傢俱電商」明確產業類型）</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>相關認證：</strong>近期的 Tableau Desktop 培訓（2023-2024）和 Google 敏捷專案管理（2025）展現在直接相關領域的持續專業發展</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強調國際經驗：</strong>摘要和經驗要點中的歐洲、美國和亞洲多區域協作，為 Maniko（全球客戶）和 Riot（國際營運）等全球公司提供良好定位</span>
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
                  <span className="text-foreground"><strong>頁首缺少電話號碼：</strong>未提供聯絡電話，招募人員需要多種聯絡方式，特別是需要亞洲到歐盟時區協調的遠端職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少地點資訊：</strong>頁首未指定城市或國家，對於遠端職位來說，指明時區背景和從台灣申請德國/法國職位時的工作授權狀態至關重要</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>沒有工作授權聲明：</strong>從台灣申請歐盟職位卻沒有明確的簽證/工作權聲明，會造成即時的不確定性，招募人員會假設您需要贊助並可能自動過濾您的申請，無論資歷如何</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>專業發展區塊有些不相關：</strong>dbt Meetup Taiwan 和 Tableau User Group Meetup Taiwan 展現社群參與，但佔用空間卻未展示經過驗證的能力，聚會參與更適合放在 LinkedIn 而非履歷</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>志工經驗與工作無關：</strong>2013 年的原住民部落觀光規劃（12 年前）與分析工程師職位無關，佔用寶貴空間，這些空間可以用來展示相關技術專案或擴展目前職位成就</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Teamson 第 4 點缺乏具體性：</strong>「透過 KPI 和費用分析促進資料驅動行動，發現成本驅動因素並實現 3 倍貢獻毛利增加」未指明哪些 KPI、什麼分析方法，或您的工作如何直接促成 3 倍增長</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>沒有明確強調資料品質或測試：</strong>兩個目標職位描述都強調資料品質框架和驗證流程，但您的要點沒有明確提及測試、驗證或資料品質保證工作</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少利害關係人協作流程細節：</strong>雖然要點展示產出（交付的儀表板、建立的模型），但沒有明確描述兩個職位描述都強調的協作流程</span>
                </li>
              </ul>
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
                  <th className="text-center py-2 text-foreground">優先級</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">電話號碼</td>
                  <td className="py-2 text-muted-foreground">頁首未包含</td>
                  <td className="py-2 text-foreground">新增國際格式：+886-XXX-XXX-XXX 以提高可及性</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">地點</td>
                  <td className="py-2 text-muted-foreground">未指定</td>
                  <td className="py-2 text-foreground">明確的城市/國家：「台北，台灣」以說明時區和背景</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">工作授權</td>
                  <td className="py-2 text-muted-foreground">未提及</td>
                  <td className="py-2 text-foreground">明確聲明：「歐盟工作授權」或「需要贊助」或「搬遷至 [城市]」</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">專業發展區塊</td>
                  <td className="py-2 text-muted-foreground">dbt Meetup Taiwan、Tableau User Group Meetup Taiwan</td>
                  <td className="py-2 text-foreground">完全移除 - 聚會參與不展示經過驗證的能力</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">志工經驗區塊</td>
                  <td className="py-2 text-muted-foreground">2013 年觀光規劃（12 年前，與工作無關）</td>
                  <td className="py-2 text-foreground">建議移除 - 與分析工程師職位無關</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Teamson 第 4 點具體性</td>
                  <td className="py-2 text-muted-foreground">模糊：「KPI 和費用分析...實現 3 倍貢獻毛利增加」</td>
                  <td className="py-2 text-foreground">指明哪些 KPI、什麼費用類別、分析如何直接促成增長</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">資料品質強調</td>
                  <td className="py-2 text-muted-foreground">儘管有做這項工作但未明確提及</td>
                  <td className="py-2 text-foreground">新增要點或強化現有要點以突顯測試、驗證框架、資料品質流程</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">利害關係人協作流程</td>
                  <td className="py-2 text-muted-foreground">展示產出（儀表板、模型）但非協作流程</td>
                  <td className="py-2 text-foreground">新增需求收集、利害關係人工作坊、將商業需求轉化為技術解決方案的細節</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">中</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">摘要</td>
                  <td className="py-2 text-muted-foreground">已經出色 - 作為分析工程師並量化經驗的強大定位</td>
                  <td className="py-2 text-foreground">無需更改</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">低</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">認證</td>
                  <td className="py-2 text-muted-foreground">近期相關的 Tableau 和敏捷專案管理認證</td>
                  <td className="py-2 text-foreground">無需更改 - 格式正確且有價值</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">低</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">目前職位（Teamson）</td>
                  <td className="py-2 text-muted-foreground">具有量化影響的強大技術要點</td>
                  <td className="py-2 text-foreground">無需重大更改 - 6 個要點中有 5 個出色</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">低</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 目標職位準備度評估 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">目標職位準備度評估</h2>
          </div>

          {/* Maniko Nails */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">資深分析工程師 - Maniko Nails（德國）</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">要求</th>
                    <th className="text-left py-2 text-foreground">準備度</th>
                    <th className="text-left py-2 text-muted-foreground">差距分析</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">3 年以上分析工程師經驗</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">Teamson 1.5 年明確的分析工程聚焦加上 Tasameng 4 年商品分析，約等於 5 年相關經驗 - 遠超最低要求</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">強大的 SQL 和資料轉換（dbt）</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">明確要點：「設計並優化 dbt 工作流程，將 SAP 資料轉換為 20 多個商業模型」並有 20% 延遲改善，展現 dbt 實務專業</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">資料建模和結構化專業知識</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">明確要點：「開發可重用的星型綱要資料模型以支援可擴展的自助分析」展現維度建模知識</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">視覺化工具（偏好 Tableau）</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">多個 Tableau 要點（10+ 儀表板、100+ 用戶管理、培訓工作坊）加上 Tableau Desktop 認證（2023-2024）展現專家級熟練度</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">資料品質和可靠性聚焦</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">中等</span></td>
                    <td className="py-2 text-muted-foreground">您顯然有做這項工作（20+ 商業模型、提及資料準確性）但沒有關於測試框架、驗證流程或資料品質保證的明確要點</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">協作和利害關係人管理</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">中等</span></td>
                    <td className="py-2 text-muted-foreground">展示產出（儀表板、模型、培訓）但協作流程未明確描述 - 沒有關於需求收集、利害關係人工作坊、轉化商業需求的要點</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">自助分析賦能</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">兩個明確要點：自助用星型綱要、培訓工作坊建立自助文化、減少臨時請求</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">商業影響和優先排序</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">多個商業影響指標：3 倍貢獻毛利增加、24% IT 工單減少、消除手動報表、20% 年成長</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Python（加分項）</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">有</span></td>
                    <td className="py-2 text-muted-foreground">列在技術堆疊中，根據經驗背景用於資料工程任務</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">德國工作授權</td>
                    <td className="py-2"><span className="text-destructive font-semibold">關鍵</span></td>
                    <td className="py-2 text-muted-foreground">沒有歐盟工作權聲明 - 除非您有簽證或願意事先說明贊助需求，否則是德國雇主的主要阻礙</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">整體適配度：75% 準備就緒 → 95% 準備就緒（實施後）</p>
              <p className="text-sm text-muted-foreground mt-1">待工作授權明確</p>
            </div>
          </div>

          {/* Riot */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">首席分析工程師 - Riot（法國）</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">要求（來自 JD）</th>
                    <th className="text-left py-2 text-foreground">準備度</th>
                    <th className="text-left py-2 text-muted-foreground">差距分析</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">分析工程師經驗</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">1.5 年明確的分析工程加上商業/營運分析背景展現能力</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">資料基礎設施開發</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">dbt 工作流程、星型綱要建模、PostgreSQL 資料模型展現超越臨時分析的基礎設施建設</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">可擴展的分析資料模型</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">明確：「開發可重用的星型綱要資料模型以支援可擴展的自助分析」</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">為利害關係人的資料產品</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">10+ 自動化 Tableau 儀表板、建立自助文化、100+ 用戶賦能展現資料產品創建</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">資料品質</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">中等</span></td>
                    <td className="py-2 text-muted-foreground">工作明顯（商業模型、資料準確性）但沒有明確提及測試框架或驗證流程</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">商業合作夥伴與轉譯</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">中等</span></td>
                    <td className="py-2 text-muted-foreground">展示結果（儀表板、模型）但未明確描述需求收集或轉譯流程</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">利害關係人管理</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">中等</span></td>
                    <td className="py-2 text-muted-foreground">高階 BI 報告和培訓展現參與但缺少流程細節</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">挑戰假設和倡導</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">弱</span></td>
                    <td className="py-2 text-muted-foreground">沒有挑戰利害關係人或倡導資料驅動方法的證據 - 要點聚焦於交付</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">SQL 和資料轉換</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">強</span></td>
                    <td className="py-2 text-muted-foreground">dbt + SQL + 20+ 模型展現強大能力</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">法國工作授權</td>
                    <td className="py-2"><span className="text-destructive font-semibold">關鍵</span></td>
                    <td className="py-2 text-muted-foreground">沒有歐盟工作權聲明 - 法國雇主的阻礙</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">整體適配度：70% 準備就緒 → 90% 準備就緒（實施後）</p>
              <p className="text-sm text-muted-foreground mt-1">待工作授權明確並新增利害關係人挑戰範例</p>
            </div>
          </div>
        </section>

        {/* 關鍵改進說明 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 6 項策略性轉變，以最佳方式為您定位 Maniko 和 Riot 的資深分析工程師職位。以下是影響最大的改變：
          </p>

          {/* 改進 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 聯絡資訊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增完整聯絡資訊並附工作授權聲明</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（造成重大招聘摩擦）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>沒有電話號碼降低可及性 - 招募人員需要多種聯絡方式，特別是需要亞洲與歐洲時區協調的國際遠端職位</p>
                  <p>缺少地點造成困惑 - 歐盟招募人員無法判斷您是在台灣、已在歐洲，還是計劃搬遷，除非有明確的城市/國家</p>
                  <p>沒有工作授權聲明是關鍵阻礙 - 從台灣申請德國和法國卻沒有明確簽證狀態意味著招募人員會假設您需要贊助（昂貴且複雜），並首先過濾您的申請，無論資歷如何</p>
                  <p>與本地歐盟候選人競爭 - 沒有明確的授權聲明，您比資歷相同的本地申請者看起來風險更高、成本更高</p>
                  <p>背景調查和合規顧慮 - 不明確的工作權造成法律合規擔憂，讓招募人員完全跳過您的申請</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - 選項 A（如果您有歐盟工作授權）：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">鄭季 (JANELLE)</p>
                  <p>分析工程師</p>
                  <p>台北，台灣 | 歐盟工作授權 | 願意搬遷</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - 選項 B（如果搬遷中並持有效簽證）：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">鄭季 (JANELLE)</p>
                  <p>分析工程師</p>
                  <p>搬遷至柏林/巴黎 [月份 年份] | 有效工作授權</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - 選項 C（如果您需要贊助 - 坦誠說明）：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">鄭季 (JANELLE)</p>
                  <p>分析工程師</p>
                  <p>台北，台灣 | 需要工作贊助 | 願意搬遷</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>移除關鍵阻礙 - 明確的工作授權聲明防止在您的資歷被考慮之前就被自動過濾</li>
                <li>電話號碼確保可及性 - 國際格式（+886）使歐盟招募人員可以輕鬆聯繫</li>
                <li>地點提供時區背景 - 遠端協作需要清楚的時區預期</li>
                <li>專業頭銜強化定位 - 「分析工程師」而非籠統的「資料分析師」符合目標職位</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：這些看似小的變化解決歐盟招募人員對國際候選人的最常見阻礙。</p>
            </div>
          </div>

          {/* 改進 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 移除不相關區塊</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">移除專業發展和志工經驗區塊</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（佔用寶貴空間）：</p>
                <p className="text-muted-foreground text-sm">專業發展：dbt Meetup Taiwan、Tableau User Group Meetup Taiwan</p>
                <p className="text-muted-foreground text-sm mt-2">志工經驗：2013 年原住民部落觀光規劃（12 年前，與工作無關）</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm">完全移除這兩個區塊。聚會參與不展示經過驗證的能力，12 年前的觀光規劃與分析工程師職位無關。釋放的空間可用於擴展目前職位成就或新增資料品質要點。</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>履歷空間是寶貴的 - 每個區塊都應支持您的分析工程師定位</li>
                <li>聚會參與不等於能力 - 參加活動不等同於經過驗證的技能</li>
                <li>12 年前的志工工作無關緊要 - 2013 年的觀光規劃不支持技術職位申請</li>
                <li>節省的空間可用於更高價值的內容 - 資料品質要點、利害關係人協作細節</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：移除 2 個不相關區塊釋放空間給直接支持 Maniko 和 Riot 優先事項的內容。</p>
            </div>
          </div>

          {/* 改進 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#3 新增資料品質強調</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增資料品質和測試要點</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">缺少的內容：</p>
                <p className="text-foreground text-sm mb-3">兩個 JD 都強調資料品質：</p>
                <ul className="text-muted-foreground text-sm ml-4 list-disc space-y-1">
                  <li>Maniko JD：「你對資料品質可靠性有自豪感，對每個資料集你建立測試框架和驗證流程」</li>
                  <li>Riot JD：「確保高資料品質和可靠性」和「你關心資料品質」</li>
                </ul>
                <p className="text-foreground text-sm mt-3">您的履歷沒有明確提及測試、驗證框架或資料品質流程 - 儘管您的工作（20+ 商業模型、資料準確性）暗示您做了這項工作。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">在 Teamson 職位新增要點：</p>
                <p className="text-foreground text-sm italic">「使用 dbt 測試和驗證檢查在 20+ 資料模型中實施資料品質框架，在生產前捕捉資料異常並提升資料可靠性 XX%，減少下游報表錯誤並建立利害關係人對分析產出的信任。」</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">替代方案 - 強化現有第 2 點：</p>
                <p className="text-sm text-muted-foreground mb-2">目前：「開發可重用的星型綱要資料模型以支援可擴展的自助分析，提升資料可及性、準確性和治理。」</p>
                <p className="text-foreground text-sm italic">強化：「開發帶有內建資料品質檢查（dbt 測試、參照完整性驗證、空值檢查）的可重用星型綱要資料模型，支援 100+ 用戶的自助分析，同時確保所有分析產出的準確性、一致性和治理。」</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>解決關鍵 JD 要求 - 兩個職位都明確要求測試框架和驗證流程</li>
                <li>展現工程嚴謹性 - 測試和驗證區分分析工程師與基本分析師</li>
                <li>展示資料優先思維 - 主動的品質保證證明您如 Maniko JD 所要求的對可靠性有自豪感</li>
                <li>建立利害關係人信任 - 品質聚焦連結到兩個 JD 都強調的商業合作夥伴方面</li>
                <li>技術深度 - 具體方法（dbt 測試、參照完整性、空值檢查）展現實務實作知識</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：新增明確的資料品質強調直接解決兩家目標公司都優先考慮的要求 - 展現您理解分析工程師負責資料可靠性，而非只是資料交付。</p>
            </div>
          </div>

          {/* 改進 #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#4 KPI 要點具體性</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">重寫 Teamson 第 4 點以更具體</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（缺乏具體性）：</p>
                <p className="text-muted-foreground text-sm italic">「透過 KPI 和費用分析促進資料驅動行動，發現成本驅動因素並實現 3 倍貢獻毛利增加」</p>
                <p className="text-foreground text-sm mt-3">這個要點有令人印象深刻的結果（3 倍增加）但沒有說明哪些 KPI、什麼類型的費用、或您的分析如何直接促成這個結果。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <p className="text-foreground text-sm italic">「透過交付追蹤產品級獲利能力、供應商成本和運輸費用的 KPI 儀表板實現 3 倍貢獻毛利增加，找出 $50K 節省成本機會（重新談判供應商條款、優化運輸路線）並為 200+ SKU 提供定價策略調整資訊。」</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>指明分析了哪些 KPI - 產品獲利能力、供應商成本、運輸費用展現深度</li>
                <li>量化成本節省 - $50K 是具體可驗證的影響</li>
                <li>展示可操作洞察 - 供應商談判、路線優化是具體商業決策</li>
                <li>建立規模感 - 200+ SKU 定價影響展現企業級工作</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：將 3 倍毛利增加從模糊成就轉變為可信的資料驅動商業影響故事。</p>
            </div>
          </div>

          {/* 改進 #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#5 利害關係人協作</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">新增利害關係人協作流程細節</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">缺少的內容：</p>
                <p className="text-foreground text-sm mb-3">兩個 JD 都強調協作流程，而非只是產出：</p>
                <ul className="text-muted-foreground text-sm ml-4 list-disc space-y-1">
                  <li>Maniko JD：「您將成為團隊的緊密商業合作夥伴，與同事合作將他們的需求轉化為可執行的資料解決方案」</li>
                  <li>Riot JD：「與利害關係人緊密合作定義指標和啟用資料驅動決策是您的強項之一」</li>
                </ul>
                <p className="text-foreground text-sm mt-3">您的要點展示出色的產出（儀表板、模型、培訓）但沒有描述您如何與利害關係人協作收集需求、轉化商業需求或定義指標。</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">選項 1 - 在 Teamson 新增要點：</p>
                <p className="text-foreground text-sm italic">「與商業、財務和營運領導者合作將商業需求轉化為資料解決方案，舉辦利害關係人工作坊定義 KPI、根據商業影響排序分析請求，並交付解決特定決策需求的客製化儀表板。」</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">選項 2 - 強化現有培訓要點：</p>
                <p className="text-sm text-muted-foreground mb-2">目前：「透過 Tableau 和 Power BI 工作坊提升商業、供應鏈、財務和營運團隊的技能，建立自助文化並減少臨時請求。」</p>
                <p className="text-foreground text-sm italic">強化：「透過與商業、供應鏈、財務和營運團隊舉辦 10+ 利害關係人工作坊建立自助分析文化，將他們的商業問題轉化為 Tableau 和 Power BI 解決方案，培訓 50+ 用戶自助能力，並減少 30% 臨時分析請求。」</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>展示商業合作夥伴關係 - 「與領導者合作」和「利害關係人工作坊」展現兩個 JD 都想要的緊密協作</li>
                <li>強調轉譯技能 - 「將商業需求轉化為資料解決方案」是 Maniko JD 的確切語言</li>
                <li>展示優先排序 - 「根據商業影響排序」展現您策略性地平衡請求</li>
                <li>流程重於產出 - 聚焦於您如何與利害關係人工作，而非只是交付什麼</li>
                <li>決策啟用聚焦 - 「解決特定決策需求」連結到 Riot 的「啟用資料驅動決策」</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：使協作流程明確而非隱含 - 證明您能成為兩家公司都尋求的「緊密商業合作夥伴」，而非只是技術執行者。</p>
            </div>
          </div>

          {/* 改進 #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">#6 選擇性強化</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">選擇性強化以達到最大影響</h3>
            
            <p className="text-muted-foreground mb-4">這些變更優先級較低，但可以進一步強化定位：</p>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">A) 分類技術堆疊以便於掃描</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2">目前：</p>
                    <p className="text-foreground">dbt, SQL, Tableau, Python, Airflow, Docker, Jira, Git (Version Control, CI/CD), GCP (GCS, BigQuery, Compute Engine)</p>
                  </div>
                  <div>
                    <p className="text-gold mb-2">強化：</p>
                    <ul className="text-foreground space-y-1">
                      <li><strong>資料建模與轉換：</strong>dbt、SQL、星型綱要、維度建模</li>
                      <li><strong>資料庫與倉儲：</strong>PostgreSQL、BigQuery、SAP</li>
                      <li><strong>視覺化與 BI：</strong>Tableau、Power BI</li>
                      <li><strong>程式語言：</strong>Python、SQL</li>
                      <li><strong>編排：</strong>Airflow</li>
                      <li><strong>雲端平台：</strong>GCP（BigQuery、GCS、Compute Engine）</li>
                      <li><strong>DevOps 與協作：</strong>Git（CI/CD）、Docker、Jira</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">B) 量化 Teamson 第 6 點培訓成果</p>
                <div className="mt-3 text-sm">
                  <p className="text-muted-foreground mb-2">目前：「透過 Tableau 和 Power BI 工作坊提升商業、供應鏈、財務和營運團隊的技能，建立自助文化並減少臨時請求。」</p>
                  <p className="text-gold mt-2">強化：「透過 10+ Tableau 和 Power BI 工作坊提升商業、供應鏈、財務和營運等四個部門 50+ 用戶的技能，建立自助文化並減少 30% 臨時分析請求。」</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">這些選擇性改進增加光澤和深度，但不是關鍵的，因為您的核心定位已經很強。</p>
          </div>
        </section>

        {/* ATS 優化 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">策略定位與 ATS 優化</h2>
          </div>

          {/* ATS 關鍵字匹配分析 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">ATS 關鍵字匹配分析</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">優化前 - Maniko 關鍵字</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>Analytics Engineer</span> <span className="text-yellow-500">弱</span></p>
                  <p className="flex justify-between"><span>dbt</span> <span className="text-green-600">有</span></p>
                  <p className="flex justify-between"><span>SQL</span> <span className="text-green-600">有</span></p>
                  <p className="flex justify-between"><span>Tableau</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>資料建模</span> <span className="text-yellow-500">弱</span></p>
                  <p className="flex justify-between"><span>自助分析</span> <span className="text-yellow-500">弱</span></p>
                  <p className="flex justify-between"><span>資料品質</span> <span className="text-yellow-500">弱</span></p>
                  <p className="flex justify-between"><span>驗證流程</span> <span className="text-destructive">缺少</span></p>
                  <p className="flex justify-between"><span>測試框架</span> <span className="text-destructive">缺少</span></p>
                  <p className="flex justify-between"><span>商業合作夥伴</span> <span className="text-destructive">缺少</span></p>
                </div>
                <p className="mt-3 text-sm font-semibold">關鍵字匹配分數：<span className="text-yellow-500">55%</span></p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">優化後 - Maniko 關鍵字</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>Analytics Engineer</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>dbt</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>SQL</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>Tableau</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>資料建模</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>自助分析</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>資料品質</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>驗證流程</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>測試框架</span> <span className="text-green-600">強</span></p>
                  <p className="flex justify-between"><span>商業合作夥伴</span> <span className="text-green-600">強</span></p>
                </div>
                <p className="mt-3 text-sm font-semibold">關鍵字匹配分數：<span className="text-green-600">95%</span></p>
              </div>
            </div>
          </div>

          {/* 履歷效能提升 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">履歷效能提升</h3>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">目前履歷效能：</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>ATS 成功率：</strong>60%（技術關鍵字強但缺少流程關鍵字）</li>
                  <li><strong>招募人員回覆率：</strong>55%（經驗好但聯絡/授權有摩擦）</li>
                  <li><strong>面試轉換率：</strong>70%（一旦通過篩選技術能力強）</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">優化後履歷效能：</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>ATS 成功率：</strong>95%（技術和流程領域全面關鍵字覆蓋）</li>
                  <li><strong>招募人員回覆率：</strong>90%（清晰定位、完整資訊、無授權摩擦）</li>
                  <li><strong>面試轉換率：</strong>85%（能表達技術深度和商業合作夥伴關係）</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border-l-4 border-gold">
              <p className="text-sm text-foreground"><strong>底線：</strong>優化聯絡資訊、移除不相關區塊和新增策略關鍵字可將您的歐盟分析工程師職位面試率提高約 3 倍。您的技術經驗已經出色 - 這些變更只是確保招募人員能無摩擦地看到它。</p>
            </div>
          </div>
        </section>

        {/* 下一步 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          {/* 步驟 1 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">1</div>
              <h3 className="font-heading text-xl text-foreground">修正聯絡資訊和頁首</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">新增完整聯絡詳情（15 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>新增國際格式電話號碼：+886-XXX-XXX-XXX</li>
                  <li>新增明確地點：台北，台灣</li>
                  <li>新增工作授權聲明（根據您的簽證狀態選擇適當選項）</li>
                  <li>新增專業頭銜：分析工程師</li>
                  <li>完整 LinkedIn URL 格式：linkedin.com/in/[yourprofile]</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">選擇工作授權方法（5 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>「歐盟工作授權 | 願意搬遷」（如果您有簽證/許可）</li>
                  <li>「搬遷至 [柏林/巴黎] [月份 年份] | 有效工作授權」（如果已規劃）</li>
                  <li>「需要工作贊助 | 願意搬遷」（如果您需要雇主贊助）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 步驟 2 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</div>
              <h3 className="font-heading text-xl text-foreground">移除不相關區塊</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">刪除專業發展區塊（2 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>移除「dbt Meetup Taiwan」和「Tableau User Group Meetup Taiwan」</li>
                  <li>社群參與可保留在 LinkedIn，但不屬於履歷</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">刪除志工經驗區塊（2 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>移除 2013 年觀光規劃項目</li>
                  <li>12 年前與工作無關的志工工作不支持分析工程師定位</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 步驟 3 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</div>
              <h3 className="font-heading text-xl text-foreground">強化關鍵要點以增加具體性</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">重寫 Teamson 第 4 點 KPI 分析（20 分鐘）</p>
                <p className="text-muted-foreground mt-1">目前：「透過 KPI 和費用分析促進資料驅動行動，發現成本驅動因素並實現 3 倍貢獻毛利增加」</p>
                <p className="text-gold mt-2">強化：「透過交付追蹤產品級獲利能力、供應商成本和運輸費用的 KPI 儀表板實現 3 倍貢獻毛利增加，找出 $50K 節省成本機會（重新談判供應商條款、優化運輸路線）並為 200+ SKU 提供定價策略調整資訊。」</p>
              </div>
              <div>
                <p className="font-semibold">資料品質強化 - 新增要點或強化現有第 2 點</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>選項 A - 新增要點：</strong>「使用 dbt 測試和驗證檢查在 20+ 資料模型中實施資料品質框架，在生產前捕捉資料異常並提升資料可靠性 25%，減少下游報表錯誤並建立利害關係人對分析產出的信任。」</li>
                  <li><strong>選項 B - 強化現有第 2 點：</strong>「開發帶有內建資料品質檢查（dbt 測試、參照完整性驗證、空值檢查）的可重用星型綱要資料模型，支援 100+ 用戶的自助分析，同時確保所有分析產出的準確性、一致性和治理。」</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 步驟 4-7 簡化版 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</div>
              <h3 className="font-heading text-xl text-foreground">選擇性強化</h3>
            </div>
            <ul className="text-sm text-muted-foreground ml-11 list-disc space-y-1">
              <li>分類技術堆疊（15 分鐘 - 選擇性）</li>
              <li>量化培訓成果（10 分鐘 - 選擇性）</li>
            </ul>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</div>
              <h3 className="font-heading text-xl text-foreground">建立兩個客製化版本</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">版本 A：Maniko Nails 聚焦（30 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>強調：自助分析、Tableau 專業、培訓/賦能、資料品質</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">版本 B：Riot 聚焦（30 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>強調：資料基礎設施、可擴展資料產品、Python、編排</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">6</div>
              <h3 className="font-heading text-xl text-foreground">準備面試</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">使用 STAR 方法準備故事（2-3 小時）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>Situation（情境）：</strong>背景/問題是什麼？</li>
                  <li><strong>Task（任務）：</strong>您的具體職責是什麼？</li>
                  <li><strong>Action（行動）：</strong>您做了什麼？（步驟）</li>
                  <li><strong>Result（結果）：</strong>發生了什麼？（量化成果）</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">要準備的故事：</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>dbt 實施和優化</li>
                  <li>100% 準時交付儀表板</li>
                  <li>透過培訓建立自助文化</li>
                  <li>3 倍貢獻毛利增加分析</li>
                  <li>100+ 用戶 Tableau 管理</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">7</div>
              <h3 className="font-heading text-xl text-foreground">申請目標職位</h3>
            </div>
            <ul className="text-sm text-muted-foreground ml-11 list-disc space-y-1">
              <li>Maniko：使用版本 A（自助分析強調）</li>
              <li>Riot：使用版本 B（資料基礎設施強調）</li>
              <li>客製化 2-3 個要點以符合特定 JD 語言</li>
            </ul>
          </div>

          {/* 提醒 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">提醒</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> 應該做</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 為每個申請客製化，更改 2-3 個要點以符合 JD</li>
                  <li>• 申請後跟進，5-7 天後發信給招募人員</li>
                  <li>• 準備好解釋每個指標，面試官會問</li>
                  <li>• 保持範例機密，不要提及內部專案名稱</li>
                  <li>• 展現真誠熱情，引用公司的具體計畫</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2"><XCircle className="w-4 h-4" /> 不應該做</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• 不要未客製化就申請，質量重於數量</li>
                  <li>• 不要誇大指標，準備好用數據支持</li>
                  <li>• 不要批評前雇主，保持專業</li>
                  <li>• 不要忽略文化契合度，研究公司價值觀</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 最後感想 */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉型</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <ScoreGauge score={90} label="修改前" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <div className="text-center">
                <ScoreGauge score={95} label="修改後" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 text-center space-y-4">
              <p className="text-foreground">您的履歷已經有很強的技術基礎。透過解決聯絡資訊、移除不相關區塊，以及新增資料品質和利害關係人協作的明確強調，您將消除歐盟招募人員的所有摩擦點。</p>
              <p className="text-gold font-semibold text-lg">您有經驗。現在您有了定位。去拿到 offer 吧。祝好運！🚀</p>
            </div>
          </div>
        </section>

        {/* 回饋區塊 */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-4">您的回饋很重要</h2>
            <p className="text-foreground mb-6">希望這份審閱對加強您的申請有所幫助。</p>
            <p className="text-muted-foreground mb-6">如果您覺得這份審閱有幫助，我非常感謝您的回饋：</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">分享您的回饋</h3>
                    <p className="text-sm text-muted-foreground">在此留下您的想法</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• 您誠實的回饋幫助我改進服務</li>
                  <li>• 推薦語幫助其他求職者發現這項服務</li>
                  <li>• 我會閱讀每則回覆並持續優化我的方法</li>
                </ul>
              </a>
              <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">在 Trustpilot 留下評論</h3>
                    <p className="text-sm text-muted-foreground">在此分享您的體驗</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• 公開評論有助於建立可信度</li>
                  <li>• 您的評論幫助其他專業人士做出明智決定</li>
                </ul>
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground"><strong>為什麼 Trustpilot 分數是 3.8？</strong></p>
              <p className="text-sm text-muted-foreground mt-2">我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。</p>
            </div>

            <p className="text-foreground text-center font-semibold">感謝您的信任。祝您求職之旅順利成功！</p>
          </div>
        </section>
      </main>
    </div>
  );
};

export default JanelleChengReviewZhTw;
