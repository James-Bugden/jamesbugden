import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Clock, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const YoutingChenReviewZhTw = () => {
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
                  <span className="text-foreground"><strong>交換生計畫相關性不明確</strong>：2015 年北京大學交換可能與目前總監級申請不相關，考慮移除以節省空間，除非針對中國相關職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少 OKX 特定關鍵字</strong>：職位描述強調「上架/下架流程」、「風險管理」、「代幣上架行銷」、「Web3 業務團隊」、「團隊管理」，這些應該明確出現在履歷中</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>畢業日期可能觸發年齡偏見</strong>：2011-2015 本科日期透露大約年齡，考慮移除日期以避免無意識偏見，只保留學位和學校</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Bybit 要點列表過長需要優先排序</strong>：一個角色 8 個要點過多，識別與目標角色最相關的前 4-5 項最令人印象深刻的成就並刪減其餘</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CURRENT STATE VS OPTIMAL STATE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">目前狀態 vs. 最佳狀態</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-foreground font-semibold">項目</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">目前狀態</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">最佳狀態</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">優先級</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">執行摘要</td>
                  <td className="py-3 px-2 text-muted-foreground">完全缺失，沒有開頭的價值主張</td>
                  <td className="py-3 px-2">3-4 句摘要，包含經驗年資、專業領域、前 3 項量化成就、關鍵專業領域</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">QR 碼說明</td>
                  <td className="py-3 px-2 text-muted-foreground">頁首未說明的 QR 碼造成困惑</td>
                  <td className="py-3 px-2">加上標籤「LinkedIn 個人檔案」或完全移除</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">技能區塊</td>
                  <td className="py-3 px-2 text-muted-foreground">籠統軟技能（分析、問題解決、利害關係人管理、溝通）</td>
                  <td className="py-3 px-2">替換為加密特定技術技能：代幣經濟學、做市、流動性管理、DeFi 協議、CEX/DEX 運營、合規框架</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Bybit 要點數量</td>
                  <td className="py-3 px-2 text-muted-foreground">8 個要點稀釋最強成就的影響力</td>
                  <td className="py-3 px-2">減到只有 4-5 個最高影響力的要點，移除填充內容</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Bybit 填充要點</td>
                  <td className="py-3 px-2 text-muted-foreground">「建立關鍵指標」和「跨部門協作」缺乏具體成果</td>
                  <td className="py-3 px-2">刪除或替換為展現獨特影響力的量化成就</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">OKX 關鍵字對齊</td>
                  <td className="py-3 px-2 text-muted-foreground">缺少關鍵 JD 術語：上架/下架流程、風險管理、代幣上架行銷、成長策略</td>
                  <td className="py-3 px-2">在經驗要點中如實策略性整合</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">超連結格式</td>
                  <td className="py-3 px-2 text-muted-foreground">公司名稱有連結但視覺上不明顯（沒有底線、沒有藍色）</td>
                  <td className="py-3 px-2">格式化為標準超連結，藍色文字和底線以顯示可點擊</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Notes */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">交換生計畫</h4>
              <p className="text-muted-foreground text-sm">2015 年北京大學：如果與加密產品職位沒有直接相關，考慮移除以節省空間</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">畢業日期</h4>
              <p className="text-muted-foreground text-sm">完整日期範圍（2011-2015、2015-2017）可能透露年齡。移除日期，只保留學位和學校</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">聯絡資訊</h4>
              <p className="text-muted-foreground text-sm">清楚的電郵、電話、LinkedIn 網址格式。不需要更改，已經很專業</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">公司背景</h4>
              <p className="text-muted-foreground text-sm">部分角色包含括號中的公司描述。將此模式擴展到所有角色以增加清晰度（例如「Bybit（全球前 3 大加密交易所按交易量）」）</p>
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
          <p className="text-muted-foreground mb-8">我們找出 6 項策略性轉變，以最佳方式為您定位 OKX 產品總監，代幣上架職位。以下是影響最大的改變：</p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 新增執行摘要</span>
            <h3 className="font-heading text-2xl text-foreground mt-4 mb-4">新增帶有量化成就的執行摘要</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（缺少價值主張）：</p>
              <p className="text-muted-foreground text-sm italic">履歷直接跳入經驗區塊，開頭是「Bybit，杜拜，產品主管...」</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有即時價值捕捉：招募人員花 6 秒做初步掃描，您迫使他們閱讀密集的要點才能理解您的適合度，而非開頭就陳述</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>缺少關鍵差異化：您的 $15 億 AUM 恢復、8 人團隊領導和 6 倍交易量擴展被埋在要點中，它們應該立即突出</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有定位聲明：不清楚您是產品領導者、加密運營專家還是成長策略師，摘要應該澄清您的主要身份</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>競爭劣勢：經驗較弱但摘要較好的其他候選人會先捕獲注意力</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有加密專業信號：不閱讀完整經驗區塊的話，您深厚的加密原生背景不會立即明顯</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
              <p className="text-foreground text-sm"><strong>摘要</strong></p>
              <p className="text-foreground text-sm italic mt-2">擁有 6 年以上加密原生經驗的產品總監，專注於頂級交易所（Bybit、Orderly、幣安）的代幣上架運營、現貨交易成長和流動性基礎設施。過往成績包括透過駭客後上架產品驅動 $15 億 AUM 恢復、管理 8 人產品團隊涵蓋現貨/鏈上/上架/AI 工具、透過 50 多個新上架將山寨幣交易量擴展 6 倍，以及透過新用戶獲取平台達成 0.6% 現貨市場份額貢獻。</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">為什麼這樣有效：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>經驗年資開頭陳述：「6 年以上加密原生」立即建立資歷和專業化</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>前 3 項量化成就突出：$15 億 AUM、6 倍交易量擴展、0.6% 市場份額用具體指標證明影響力</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>角色定位清晰：「產品總監」聚焦「代幣上架運營」直接對齊 OKX 職位標題和職責</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>公司可信度建立：提及 Bybit、Orderly、幣安將您定位為一級交易所運營者</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX 關鍵字載入：「代幣上架」、「流動性」、「上架/下架流程」、「合規」、「團隊領導」命中關鍵 JD 要求</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>雙語優勢陳述：中英雙語流利直接符合 JD 中「雙語能力是優勢」</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">影響：摘要將履歷從「密集工作歷史」轉變為「擁有 OKX 確切需要技能的經驗證加密產品領導者」，在招募人員注意力的前 6 秒內完成。</p>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 替換籠統技能</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">用加密特定技術能力替換籠統技能</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（假設的基本技能）：</p>
              <p className="text-foreground text-sm font-medium">核心技能</p>
              <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                <li>• 分析和問題解決技能</li>
                <li>• 利害關係人管理和影響技能</li>
                <li>• 書面和口頭溝通技能</li>
                <li>• 團隊管理經驗</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>零差異化：每個產品經理都聲稱這些相同的軟技能，您看起來與其他 100 位申請者完全相同</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有展現技術深度：招募人員想看具體的加密/Web3 專業知識，而非籠統的企業能力</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>浪費寶貴履歷空間：技能區塊應該載入 ATS 關鍵字並證明專業知識，而非重複職位描述要求</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>缺少 OKX 關鍵字：JD 強調「加密交易」、「Web3 行業」、「代幣上架」、「風險管理」，這些都沒有出現在您的技能中</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>無法證明加密原生聲明：籠統技能可以適用於任何行業，這裡沒有任何東西顯示深厚的加密專業知識</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
              <p className="text-foreground text-sm font-medium">核心技能</p>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">代幣上架和市場運營：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• 代幣上架/下架流程和風險管理</li>
                    <li>• 現貨交易、期貨、衍生品、鏈上交易</li>
                    <li>• 做市和流動性管理（CEX 和 DEX）</li>
                    <li>• 代幣經濟學和代幣經濟分析</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Web3 和加密生態系統：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• DeFi 協議（永續 DEX、AMM、訂單簿模型）</li>
                    <li>• 區塊鏈基礎設施和鏈上分析</li>
                    <li>• 加密合規和監管框架</li>
                    <li>• Web3 產品策略和成長行銷</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">技術和領導力：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• 數據驅動產品策略和 A/B 測試</li>
                    <li>• 跨部門團隊領導（8 位以上直屬下屬）</li>
                    <li>• 利害關係人管理（做市商、DEX 建設者、合規）</li>
                    <li>• 雙語：中文/英語</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-3 italic">您不需要包含所有這些技能。選擇與角色最相關的。</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">為什麼這樣有效：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX 職位描述關鍵字載入：「代幣上架/下架」、「風險管理」、「現貨交易」、「Web3」、「團隊領導」直接匹配 JD 要求</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>展現加密特定專業知識：做市、DeFi 協議、代幣經濟學、鏈上分析證明深厚的行業知識</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>技術深度顯示資歷：表明您不是普通產品經理而是專業的加密產品領導者</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>三層組織改善可掃描性：按代幣/市場、Web3/加密、技術/領導力分組創建清晰層次</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>雙語定位為技能：將語言能力從埋沒的背景移到明確的競爭優勢</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>ATS 優化：加密/Web3 關鍵字確保履歷通過行業特定術語的自動篩選</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">影響：技能區塊從「籠統企業流行語」轉變為「擁有 OKX 確切需要技術能力的經驗證加密產品專家」。</p>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 精簡 Bybit 到 5 個要點</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">將 Bybit 經驗從 8 個要點減到 5 個最高影響力成就</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（被填充內容稀釋）：</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• 「建立關鍵指標、監控系統和儀表板以加速管理決策」</li>
                <li>• 「跨部門協作透過定義分析和流程推出新產品、功能和合作夥伴關係」</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>兩個要點是籠統填充：「建立指標/儀表板」和「跨部門協作」描述基本 PM 職責，不是獨特成就</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>填充要點沒有量化成果：什麼決策被加速了？推出了哪些產品？業務影響是什麼？</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>稀釋更強的成就：每增加一個要點就減少對您最佳工作如 $15 億 AUM 恢復和 50% DAU 增加的注意力</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>更難快速掃描：一個角色 8 個要點迫使招募人員太努力才能找到頂級成就</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>顯示優先排序能力差：資深產品領導者應該識別他們 4-5 個最重要的勝利，而非列出所有內容</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本（共 5 個要點）：</p>
              <p className="text-foreground text-sm font-medium">Bybit | 杜拜</p>
              <p className="text-foreground text-sm">產品主管，現貨業務單位 | 2024 年 11 月 - 至今</p>
              <ul className="text-foreground text-sm mt-3 space-y-2">
                <li>• 領導 8 人產品團隊涵蓋現貨交易、鏈上交易、代幣上架和 AI 工具，透過整合產品策略驅動交易量、DAU、AUM、新用戶獲取和流動性成長，達成 $15 億 AUM 駭客後恢復</li>
                <li>• 推出駭客後上架儲蓄和持有產品，結合新代幣激勵與收益和倉位獎勵，在 [X] 個月內驅動超過 $15 億 AUM 恢復和流入</li>
                <li>• 主導代幣分析改版，整合 AI 模型和外部數據到統一流程，透過改善用戶洞察和發現體驗驅動 50% DAU 增加和 2 倍交易轉換</li>
                <li>• 協調機構合作以增強前 180 個交易對和新上架的現貨流動性，透過實施零售價格改善訂單達到幣安級別的深度和點差</li>
                <li>• 簡化端到端代幣上架申請和推廣工作流程，透過系統整合和自動驗證改善 90% 運營效率，同時符合受監管市場的合規要求</li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">影響：精簡的 Bybit 區塊聚焦招募人員注意力在 5 個高影響力成就上，而非迫使他們篩選 8 個要點尋找相關內容。</p>
          </div>
        </section>

        {/* STRATEGIC POSITIONING */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">策略定位與 ATS 優化</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">目標角色分析</h3>
            <p className="text-muted-foreground mb-4">基於 OKX 產品總監，代幣上架職位描述，以下是如何定位自己：</p>
            
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-gold font-semibold">主要目標：OKX 香港產品總監，代幣上架</p>
              <p className="text-foreground mt-2">匹配強度：85% 符合（優化後：95%）</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gold mb-3">為什麼您很適合：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>6 年以上加密原生產品經驗超過「5-8 年產品策略/產品管理」要求，涵蓋 Bybit、Orderly、幣安</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>在 Bybit 的直接代幣上架運營經驗，包括「端到端上架申請和推廣」工作流程優化達成 90% 效率改善</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>團隊管理能力證明，透過在 Bybit 領導 8 人產品團隊、在 Orderly 管理 30 多家做市商、協調 20 多家 DEX 建設者</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>強大分析技能，透過數據驅動成長計畫展現：50% DAU 增加、2 倍交易轉換、0.6% 市場份額貢獻，全部基於指標</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>加密/Web3 深厚專業知識涵蓋 CEX（Bybit、幣安）、DeFi（Orderly）、代幣經濟學、做市、流動性管理、合規框架</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>雙語中英能力來自中國文學學位、台灣教育、國際工作經驗（杜拜、新加坡）</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-destructive mb-3">目前差距：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有明確的「上架/下架風險管理」語言：經驗存在（管理 50 多項資產上架、合規對齊）但沒有使用 OKX 的確切術語框架</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>「上架相關行銷」沒有突出顯示：駭客後上架產品和新用戶獲取活動展現此能力但需要重新定位</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>MBA 優先但非必需：您有科技與創新管理碩士相關但不是傳統 MBA</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* ATS OPTIMIZATION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS 關鍵字匹配分析</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">優化前：40%</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">OKX 關鍵字</th>
                      <th className="text-left py-2 text-foreground">狀態</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">代幣上架</td>
                      <td className="py-2"><span className="text-gold">薄弱</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">上架/下架流程</td>
                      <td className="py-2"><span className="text-destructive">缺失</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">風險管理</td>
                      <td className="py-2"><span className="text-destructive">缺失</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">上架相關行銷</td>
                      <td className="py-2"><span className="text-gold">薄弱</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Web3/加密/區塊鏈</td>
                      <td className="py-2"><span className="text-gold">薄弱</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">產品策略</td>
                      <td className="py-2"><span className="text-gold">薄弱</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">利害關係人管理</td>
                      <td className="py-2"><span className="text-destructive">缺失</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">成長策略</td>
                      <td className="py-2"><span className="text-gold">薄弱</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">雙語（中/英）</td>
                      <td className="py-2"><span className="text-destructive">缺失</span></td>
                    </tr>
                    <tr>
                      <td className="py-2">分析技能</td>
                      <td className="py-2"><span className="text-destructive">缺失</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">優化後：95%</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">OKX 關鍵字</th>
                      <th className="text-left py-2 text-foreground">狀態</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">代幣上架</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">上架/下架流程</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">風險管理</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">上架相關行銷</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Web3/加密/區塊鏈</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">產品策略</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">利害關係人管理</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">成長策略</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">雙語（中/英）</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                    <tr>
                      <td className="py-2">分析技能</td>
                      <td className="py-2"><span className="text-gold">強</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </section>

        {/* KEYWORDS REFERENCE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">履歷關鍵字參考列表</h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">代幣上架和交易所運營</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• 代幣上架/下架流程</li>
                <li>• 上架申請審核</li>
                <li>• 風險管理和評估</li>
                <li>• 代幣盡職調查</li>
                <li>• 上架相關行銷</li>
                <li>• 推廣活動執行</li>
                <li>• 做市運營</li>
                <li>• 流動性管理（CEX 和 DEX）</li>
                <li>• 現貨交易運營</li>
                <li>• 衍生品交易</li>
                <li>• 鏈上交易</li>
                <li>• 交易量成長</li>
                <li>• 市場份額擴展</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">產品策略和管理</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• 產品策略和路線圖</li>
                <li>• 跨部門協作</li>
                <li>• 利害關係人管理</li>
                <li>• 團隊管理和領導</li>
                <li>• 市場進入執行</li>
                <li>• 產品推出和交付</li>
                <li>• 功能優先排序</li>
                <li>• A/B 測試和實驗</li>
                <li>• 用戶旅程優化</li>
                <li>• 指標定義和追蹤</li>
                <li>• 數據驅動決策</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">成長和用戶獲取</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• 成長策略</li>
                <li>• 用戶獲取</li>
                <li>• 用戶轉換</li>
                <li>• 用戶留存</li>
                <li>• DAU/MAU 成長</li>
                <li>• AUM 成長</li>
                <li>• 交易量成長</li>
                <li>• 推薦計畫</li>
                <li>• 激勵設計</li>
                <li>• 收益優化</li>
              </ul>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">轉型影響總結</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">優化前</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有執行摘要 → 招募人員必須從密集的要點中拼湊價值</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>籠統技能區塊 → 看起來與非加密產品經理一樣</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Bybit 8 個要點含填充內容 → 稀釋最強成就的影響力</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>缺少 OKX 關鍵字 → ATS 評分 40%，可能在人工審閱前就被過濾</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>未說明的 QR 碼 → 造成困惑和安全顧慮</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>顯示畢業日期 → 潛在年齡偏見觸發</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">優化後</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>強大的 4 句摘要 → 立即定位為具有 $15 億以上影響力的加密產品領導者</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>加密特定技能 → 展現代幣上架、DeFi、做市的深度技術專業知識</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>聚焦的 5 點 Bybit 區塊 → 只突出頂級成就，移除填充內容</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>策略性 OKX 關鍵字整合 → ATS 評分 95%，通過自動篩選</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>清楚的 QR 碼標籤 → 專業打磨，引導流量至作品集/LinkedIn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>移除畢業日期 → 消除年齡偏見，聚焦目前能力</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">1</div>
                <h3 className="font-heading text-xl text-foreground">審閱優化後的履歷</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>驗證準確性</strong>：檢查所有事實和指標是否準確。確保您對每個量化成就都有具體範例準備好。確認語調和風格感覺真實。</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">2</div>
                <h3 className="font-heading text-xl text-foreground">新增執行摘要</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>撰寫 3-4 句摘要</strong>：使用提供的優化版本作為模板。用您的實際指標和成就客製化。將自己定位為專精「代幣上架運營」的「產品總監」。包含加密經驗年資、前 3 項量化勝利、關鍵專業領域、雙語能力。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>用 6 秒規則測試摘要</strong>：大聲朗讀摘要。招募人員應該在 6 秒內理解您的價值主張。如果不夠清晰，簡化語言並加強指標。</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">3</div>
                <h3 className="font-heading text-xl text-foreground">優化技能區塊</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>替換籠統技能</strong>：刪除：分析技能、問題解決、利害關係人管理、溝通（任何總監的假設）。新增：代幣上架/下架流程、風險管理、做市、DeFi 協議、代幣經濟學、合規框架。組織成 3 個類別：代幣/市場運營、Web3/加密生態系統、技術/領導力。包含「雙語：中文（母語）、英語（流利）」作為明確技能。</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">4</div>
                <h3 className="font-heading text-xl text-foreground">將 Bybit 經驗減到前 5 個要點</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>移除填充內容</strong>：刪除：「建立關鍵指標、監控系統和儀表板」和「跨部門協作推出新產品、功能和合作夥伴關係」。只保留：團隊領導 + AUM 恢復、駭客後上架產品、代幣分析改版、流動性增強、上架工作流程優化。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>在剩餘要點中新增 OKX 關鍵字</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">5</div>
                <h3 className="font-heading text-xl text-foreground">修正 QR 碼和超連結格式</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>新增 QR 碼標籤（2 分鐘）</strong>：如果 QR 連結到 LinkedIn：在 QR 碼下方加上「LinkedIn 個人檔案」文字。如果 QR 連結到作品集：在 QR 碼下方加上「掃描查看作品集」文字。如果 QR 不是必要的：完全移除並使用標準 LinkedIn 網址。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>格式化公司超連結</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">6</div>
                <h3 className="font-heading text-xl text-foreground">考慮移除畢業日期</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>評估年齡偏見顧慮</strong>：如果您對潛在年齡計算感到自在：保留日期。如果您想避免無意識偏見：移除所有日期（Sep. 2015 - Aug. 2017 等）。無論決定如何都保留大學名稱和學位。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>評估交換生計畫相關性</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 7 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">7</div>
                <h3 className="font-heading text-xl text-foreground">申請 5-10 個目標職位</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>為每次申請客製化（每個職位 30 分鐘）</strong>：仔細閱讀職位描述並記錄特定關鍵字要求。調整 2-3 個要點以匹配特定 JD 術語。如果 JD 強調不同技術領域則更新技能區塊。如有需要撰寫自訂求職信（大多數加密交易所不需要）。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>追蹤申請（持續進行）</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 8 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">8</div>
                <h3 className="font-heading text-xl text-foreground">使用 STAR 方法準備面試故事</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>準備 2-3 分鐘故事（總共 2-3 小時）</strong>：對於履歷上的每個主要成就，按照 STAR 框架準備故事：情境、任務、行動、結果。</span>
                </li>
              </ul>
              <div className="ml-11 mt-4 bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">$15 億 AUM 恢復的範例結構：</p>
                <p className="text-sm text-foreground italic">2024 年 11 月在 Bybit，我們面臨重大駭客攻擊，嚴重影響用戶信心並導致大規模提款。作為現貨業務單位的產品主管，我負責恢復 AUM 並重建信任。我的方法是首先分析用戶提款模式，發現新代幣上架結合收益激勵可以驅動重新存款。我與代幣上架團隊合作加速高品質專案推出，設計基於倉位的獎勵機制，並創建自動儲蓄產品讓用戶輕鬆從新代幣獲利。在 [X] 個月內，我們透過這些整合的上架和儲蓄產品恢復了超過 $15 億 AUM，超過恢復目標 [Y]% 並恢復用戶信心，以 [Z 指標] 衡量。</p>
              </div>
              <div className="ml-11 mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">需要準備故事的關鍵成就：</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Bybit $15 億 AUM 恢復（發生了什麼、您的角色、具體行動、時間線、成果）</li>
                  <li>• 代幣分析改版帶來 50% DAU 增加和 2 倍交易轉換（問題、解決方案、指標）</li>
                  <li>• 90% 上架工作流程效率改善（之前狀態、挑戰、解決方案、結果）</li>
                  <li>• Orderly 山寨幣交易量擴展 6 倍（策略、執行、合作夥伴關係、衡量）</li>
                  <li>• 幣安 0.6% 現貨市場份額貢獻（平台設計、用戶旅程、成長策略）</li>
                  <li>• 管理 8 人產品團隊（招聘、結構、目標、團隊成就）</li>
                  <li>• Orderly 30 多家做市商關係（如何建立、如何管理、業務成果）</li>
                </ul>
              </div>
            </div>

            {/* Step 9 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">9</div>
                <h3 className="font-heading text-xl text-foreground">LinkedIn 和線上形象</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>更新 LinkedIn 個人檔案</strong>：將履歷變更同步到 LinkedIn。使用相同的摘要（可以稍微擴展）。確保經驗部分一致。新增技能並請求認可。</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>參與加密/產品社群</strong>：追蹤 OKX 領導者和競爭對手。對相關產業貼文發表評論。分享您對加密產品趨勢的見解。</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">應該做的</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>為每次申請客製化：更改 2-3 個要點以匹配具體 JD 關鍵字</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>申請後追蹤：5-7 天後寄簡短專業的電郵給招募人員或招聘經理</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>準備好解釋每個指標：面試官會問「您如何衡量的？」和「您的具體貢獻是什麼？」</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>徹底研究 OKX：了解他們的產品、近期新聞、市場定位、競爭對手</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-3">不應該做的</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要沒有客製化就用同一份履歷申請每個職位</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要包含您無法在面試中解釋或辯護的指標</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要在專注履歷的同時忽略 LinkedIn 個人檔案</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">您的履歷轉型</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <ScoreGauge score={85} label="修改前" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <div className="text-center">
                <ScoreGauge score={95} label="修改後" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 text-center space-y-4">
              <p className="text-foreground">您之前的履歷沒有有效地講述您的故事。它迫使招募人員挖掘密集的要點才能找到您的價值，而非開頭就陳述。您的新履歷透過強大的摘要立即捕獲注意力，透過技術技能展現加密特定專業知識，並只突出您最令人印象深刻的成就。</p>
              <p className="text-gold font-semibold text-lg">您有經驗。現在您有定位。去拿下 offer 吧。</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-4">您的回饋很重要</h2>
            <p className="text-foreground mb-6">希望這份審閱對加強您的申請有價值。</p>
            <p className="text-muted-foreground mb-6">如果您覺得這份審閱有幫助，我非常感謝您的回饋：</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">分享您的回饋</h3>
                    <p className="text-sm text-muted-foreground">在這裡留下您的想法</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• 您誠實的回饋幫助我改進服務</li>
                  <li>• 推薦幫助其他求職者發現這項服務</li>
                  <li>• 我閱讀每一則回覆並持續優化我的方法</li>
                </ul>
              </a>
              <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">在 Trustpilot 留下評論</h3>
                    <p className="text-sm text-muted-foreground">在這裡分享您的經驗</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• 公開評論有助於建立可信度</li>
                  <li>• 您的評論幫助其他專業人士做出明智的決定</li>
                </ul>
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground"><strong>為什麼 Trustpilot 分數是 3.8？</strong></p>
              <p className="text-sm text-muted-foreground mt-1">我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。</p>
            </div>

            <div className="mb-6">
              <p className="text-foreground"><strong>分享您的成果：</strong>當您獲得面試或 offer 時，請讓我知道！</p>
              <p className="text-muted-foreground mt-2">對任何建議有問題或需要澄清？歡迎聯繫。我在這裡幫助您成功。</p>
            </div>


            <p className="text-gold font-semibold mt-6">祝您申請順利！</p>
            <p className="text-muted-foreground mt-2">我在這裡幫助您成功。</p>
            <p className="text-sm text-muted-foreground mt-4">審閱完成：2026 年 2 月</p>
          </div>
        </section>
      </main>

      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2026 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
    </>
  );
};

export default YoutingChenReviewZhTw;
