import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const RoyTsaiReviewZhTw = () => {
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
            <a href="/downloads/YI_TING_ROY_TSAI_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Roy Tsai</h1>
          <p className="text-cream/80 text-lg">品牌激活經理 | Revolut / 產品行銷經理 | Snap</p>
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
                <p className="text-3xl font-bold text-gold">70/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={70} label="修改前" size="md" />
                <ScoreGauge score={90} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷有強大的量化成就和紮實的經驗，但呈現方式的問題阻礙了在目標公司獲得面試機會。</p>
              <p>第一，缺少工作授權聲明造成即時被拒風險。您從台灣申請英國（Revolut）和新加坡（Snap）職位，卻沒有澄清簽證狀態。招募人員假設您需要昂貴的贊助，並在閱讀您的資歷之前就篩掉您。</p>
              <p>第二，內容過於密集讓閱讀疲勞。兩頁有 20 多個要點分布在近期職位，迫使招募人員尋找相關資訊。您最強的成就被埋在文字牆中而非在開頭突出顯示。</p>
              <p>第三，技能區塊過於籠統浪費寶貴的 ATS 關鍵字機會。「產品行銷」、「品牌策略」和「數位策略」是基本假設，無法讓您脫穎而出，也不符合職位描述中「上層漏斗」、「創作者經濟」、「品牌一致性」或「客戶分群」等具體要求。</p>
              <p className="text-gold font-semibold">然而，您具備資深產品行銷職位的良好資歷，例如連續 2 年市場份額第一名，以及東英吉利大學品牌領導力碩士學位並獲得優等榮譽，和我同一所大學！問題不在於您的經驗，而在於您如何呈現它。</p>
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
                  <span className="text-foreground"><strong>全篇卓越的量化成就</strong>：20 倍銷售提升、5 倍轉換率、疫情期間 +41% 成長、15% 留存率 vs. 10% 基準、+79% 品牌健康改善、ROAS 8 倍、6 個亞太市場節省 £251K 成本，展現持續的成果導向表現</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>獎項認可驗證品質</strong>：2024 Sanofi Play-To-Win 獎、2022 J&J Digital First 獎、2020 亞洲漿紙年度傑出員工證明您交付卓越工作並獲得領導層認可</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的跨國品牌經驗</strong>：Sanofi、Kenvue、嬌生、亞洲漿紙、Coty Inc. 提供可信度，展現您能在複雜組織中大規模運營</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>展現專案建設能力</strong>：在 J&J 建立首個 CRM 忠誠度計畫（在北美、歐洲、澳紐、東南亞全球展示）、在 Sanofi 建立首個策略合作夥伴計畫、首個跨品牌激活，證明您能從零開始創建新能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>相關碩士學位並獲優等</strong>：東英吉利大學（英國）品牌領導力碩士並獲優等，直接符合品牌激活和產品行銷要求</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>跨部門領導力明顯</strong>：成功與數位 IT、商業成長、合規、法務、財務、產品、設計、運營、PMO 協作，展現推動複雜利害關係人群體一致的能力</span>
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
                  <span className="text-foreground"><strong>缺少工作授權聲明</strong>：沒有簽證狀態、工作權利或搬遷時間表。對於英國和新加坡職位，這是造成自動拒絕的最大阻礙，不論資歷如何</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>摘要太長且籠統</strong>：100 多字的段落充滿模糊聲明（「可衡量的業務影響」、「驅動品牌成長」），而非以「20 倍銷售提升」和「15% 留存率 vs. 10% 基準」等量化證明開頭</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>技能區塊太籠統且缺少關鍵 JD 關鍵字</strong>：「產品行銷和品牌策略」不符合 Revolut 對「品牌一致性」、「客戶分群」、「內容品質」的需求，或 Snap 對「上層漏斗」、「創作者經濟」、「知名度和考慮行銷活動」的需求</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>經驗區塊太密集有 20 多個要點</strong>：Sanofi（5 個）、Kenvue（4 個）、J&J（5 個）、APP（2 個）、NU SKIN（2 個）、OPPO（3 個）、Coty（2 個）迫使招募人員閱讀所有內容，而非每個角色突出前 3-4 項成就</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>NU SKIN 3 個月任期引發質疑</strong>：2019 年 4-7 月任期非常短，且 NU SKIN 的 MLM 商業模式有爭議名聲，可能損害形象，特別是對於科技/CPG 職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>教育專案佔用太多空間</strong>：三個詳細的 2016-2017 學術專案佔用 8 行卻價值有限。您 10 年以上的專業經驗遠比學生作品重要</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>日期格式不一致</strong>：有些使用「Aug 2024 - Now」vs.「Nov 2023-Apr 2024」（缺少空格），造成不專業的外觀</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>公司描述不一致</strong>：有些在括號內有句號「(Medical Device Manufacturer.)」，有些沒有「Johnson and Johnson(Consumer Health BU)」，造成視覺不一致</span>
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
                  <td className="py-3 px-2 font-medium">工作授權</td>
                  <td className="py-3 px-2 text-muted-foreground">未提及</td>
                  <td className="py-3 px-2">明確聲明：「需要工作贊助」或「無需贊助即可工作」並附搬遷時間表</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">摘要長度</td>
                  <td className="py-3 px-2 text-muted-foreground">100 多字，密集段落，籠統聲明</td>
                  <td className="py-3 px-2">4 句話 90 字以內，以量化證明開頭（20 倍銷售、15% 留存率、+41% 成長）</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">摘要定位</td>
                  <td className="py-3 px-2 text-muted-foreground">籠統的「行銷專業人員」</td>
                  <td className="py-3 px-2">角色專屬：「產品行銷經理」或「品牌激活經理」並附專業領域</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">技能區塊</td>
                  <td className="py-3 px-2 text-muted-foreground">4 個籠統技能，缺少關鍵 JD 關鍵字</td>
                  <td className="py-3 px-2">按類別組織，包含 20 多個具體工具、方法論和 JD 關鍵字（上層漏斗、創作者經濟、品牌一致性、分群）</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">經驗密度</td>
                  <td className="py-3 px-2 text-muted-foreground">7 個角色 20 多個要點，閱讀疲勞</td>
                  <td className="py-3 px-2">每個主要角色聚焦前 3-4 項成就，精簡/移除較舊角色（NU SKIN、Coty）</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">高</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">要點長度</td>
                  <td className="py-3 px-2 text-muted-foreground">部分要點 40-51 字，難以掃讀</td>
                  <td className="py-3 px-2">每個要點最多 35 字，理想 25-30 字</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">NU SKIN 角色</td>
                  <td className="py-3 px-2 text-muted-foreground">3 個月任期，MLM 公司名聲風險</td>
                  <td className="py-3 px-2">完全移除以避免質疑，將空間用於更強內容</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">教育專案</td>
                  <td className="py-3 px-2 text-muted-foreground">2016-2017 學術專案佔 8 行</td>
                  <td className="py-3 px-2">移除專案細節，只保留學位和優等</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Coty Inc. 角色</td>
                  <td className="py-3 px-2 text-muted-foreground">2010-2014 經驗佔 3 個要點</td>
                  <td className="py-3 px-2">精簡為 2 個要點或完全移除，對 2026 年申請相關性有限</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">中</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">日期格式</td>
                  <td className="py-3 px-2 text-muted-foreground">空格不一致，「Now」vs.「Present」</td>
                  <td className="py-3 px-2">標準化：「Month YYYY - Present」，橫線前後有空格</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-bold rounded">低</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TARGET READINESS ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">目標準備度評估</h2>
          </div>

          {/* Revolut Assessment */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">職位 1：品牌激活經理 - Revolut（英國）</h3>
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-foreground"><strong>整體契合度：75%</strong> → <span className="text-gold font-semibold">90% 準備就緒</span>（優化後）</p>
              <p className="text-muted-foreground text-sm mt-1">具有強大的產品行銷和品牌建設經驗，並有經證實的多市場成果，但缺少明確的品牌代理商協作範例，工作授權是關鍵阻礙</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-foreground font-semibold">要求（來自 JD）</th>
                    <th className="text-left py-2 px-2 text-foreground font-semibold">準備度</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">將 Revolut 品牌打造成全球知名品牌，推動品牌一致性和採用</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 連續 2 年維持市場份額第一、+79% 品牌健康改善、在 6 個亞太市場統一品牌形象節省 £251K</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">執行品牌策略以提升知名度和考慮度</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - +8% 滲透率、+16% 忠誠用戶透過跨品牌激活，首個策略合作夥伴計畫推動 +11% 營收</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">與世界級品牌代理商合作</td>
                    <td className="py-2 px-2"><span className="text-gold">中等</span> - 透過「360° 市場推廣活動」隱含代理商協作，但缺少明確的代理商管理範例</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">建立品牌策略和客戶分群的可擴展流程</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 開發首個用戶分群模型、建立產品訊息框架被認可為最佳實踐、創建首個全球品牌指南</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">為內容品質設定持續高標準</td>
                    <td className="py-2 px-2"><span className="text-gold">中等</span> - 提及「內容品質」但缺少內容治理或品質指標的具體範例</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">全球品牌行銷專業知識</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 10 年以上消費品牌經驗（J&J、Sanofi、Kenvue、Coty、APP），品牌領導力碩士並獲優等</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">管理預算和交付成本效益解決方案的經驗</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 在 6 個亞太市場節省 £251K 成本，ROAS 8 倍證明預算效率</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">英國工作授權</td>
                    <td className="py-2 px-2"><span className="text-destructive">關鍵</span> - 沒有明確的簽證狀態、工作權利或資格聲明，是主要阻礙</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Snap Assessment */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">職位 2：產品行銷經理 - Snap Inc.（新加坡）</h3>
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-foreground"><strong>整體契合度：70%</strong> → <span className="text-gold font-semibold">85% 準備就緒</span>（優化後）</p>
              <p className="text-muted-foreground text-sm mt-1">具有強大的產品行銷基礎和優秀的量化成果，但在創作者經濟、科技/廣告技術背景和特定工具（Looker、社群廣告平台）方面有缺口。工作授權是關鍵阻礙。</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-foreground font-semibold">要求（來自 JD）</th>
                    <th className="text-left py-2 px-2 text-foreground font-semibold">準備度</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">與產品管理和銷售合作在亞太區推出廣告產品</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 領導旗艦產品的 360° GTM 策略、推出首個策略合作夥伴計畫、負責全通路策略</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">成為公認的上層漏斗行銷專家</td>
                    <td className="py-2 px-2"><span className="text-gold">中等</span> - +79% 品牌健康改善展現能力，但缺少明確的「上層漏斗」術語</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">深入了解創作者經濟和品牌機會</td>
                    <td className="py-2 px-2"><span className="text-destructive">弱</span> - 沒有明確的創作者合作夥伴關係、網紅行銷或創作者經濟範例</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">強大的分析能力，能識別新機會</td>
                    <td className="py-2 px-2"><span className="text-gold">強</span> - 快速實驗達成 ROAS 8 倍、A/B 測試提升 CTR +36%、用戶分群推動 +32% 營收</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">熟悉數據分析工具（Looker、Excel）</td>
                    <td className="py-2 px-2"><span className="text-gold">中等</span> - 隱含 Excel 和分析能力，但未提及「Looker」，沒有明確的數據科學協作範例</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">科技或廣告技術公司經驗</td>
                    <td className="py-2 px-2"><span className="text-gold">中等</span> - 所有經驗在 CPG、製藥、美妝領域，沒有直接的科技公司或廣告技術平台經驗</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">新加坡工作授權</td>
                    <td className="py-2 px-2"><span className="text-destructive">關鍵</span> - 沒有明確的簽證狀態聲明，是新加坡申請的主要阻礙</td>
                  </tr>
                </tbody>
              </table>
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

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 工作授權</span>
            <h3 className="font-heading text-2xl text-foreground mt-4 mb-4">在標題新增明確的工作授權聲明</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（關鍵阻礙）：</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">Yi-Ting(Roy) Tsai</p>
                <p className="text-muted-foreground">Mobile: +886-937-436-875 | Email: yitingroytsai@gmail.com | LinkedIn: https://www.linkedin.com/in/yitingroytsai/</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>台灣電話號碼（+886）但申請英國和新加坡職位，立即造成您是否有權在無雇主贊助下工作的困惑</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>沒有簽證狀態或工作權利聲明，招募人員假設您需要昂貴、耗時的贊助流程，使您看起來比本地候選人風險更高</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>英國和新加坡職位收到 200 多份申請，沒有明確的工作授權，您的履歷在招募人員閱讀您的資歷之前就被篩掉</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">選項 A - 如果您需要贊助：</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">YI-TING (ROY) TSAI</p>
                <p className="font-medium">Product Marketing Manager | Brand Activation & Go-To-Market Strategy</p>
                <p className="text-gold">Relocating to London/Singapore Q2 2026 | Requires work sponsorship</p>
                <p className="text-muted-foreground">Mobile: +886 937 436 875 | Email: yitingroytsai@gmail.com</p>
                <p className="text-muted-foreground">LinkedIn: linkedin.com/in/yitingroytsai</p>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">選項 B - 如果您有工作授權：</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">YI-TING (ROY) TSAI</p>
                <p className="font-medium">Product Marketing Manager | Brand Activation & Go-To-Market Strategy</p>
                <p className="text-gold">Authorized to work in UK/Singapore without sponsorship | Available March 2026</p>
                <p className="text-muted-foreground">Mobile: +886 937 436 875 | Email: yitingroytsai@gmail.com</p>
                <p className="text-muted-foreground">LinkedIn: linkedin.com/in/yitingroytsai</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">為什麼有效：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>移除阻礙面試的第一大阻礙，在開頭明確說明工作授權，防止在篩選階段被自動拒絕</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>降低感知的聘用風險，「無需贊助」或明確的贊助需求展現透明度</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>展現搬遷承諾，具體的季度/月份展示這是有計畫的職涯發展，而非隨意探索</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>專業頭銜創造即時定位，「產品行銷經理」配合專業領域直接符合目標 JD 要求</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>頭銜中策略性載入關鍵字，「品牌激活」（Revolut 關鍵字）+ 「市場推廣策略」（Snap 關鍵字）優化 ATS 掃描</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">影響：將履歷從「需要複雜簽證流程且時間不確定的國際候選人」轉變為「具有明確工作授權狀態且準備好貢獻的合格候選人」。</p>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 重寫摘要</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">將摘要從籠統改為以量化證明為主的成果導向</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（缺乏證明的模糊聲明）：</p>
              <p className="text-muted-foreground text-sm italic">I'm a marketing professional with 10+ years' experience driving brand growth and product adoption across diverse markets. I specialise in turning user insights into clear value propositions, positioning, and go-to-market strategies that deliver measurable business impact. My track record includes improving user retention, customer lifetime value and product marketing strategies while building 0–1 CRM loyalty programmes, designing omnichannel campaigns and digital-first partnerships, and creating cross-market assets that generated a 20X sales uplift and scaled into repeatable growth models. I thrive in fast-paced, complex environments and continue to upskill in emerging technologies such as AI and digital tools to enable long-term product success.</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>以籠統詞句浪費開頭，「I'm a marketing professional」用寶貴的開頭文字描述招募人員已經知道的資訊</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>埋沒最強成就，「20X sales uplift」出現在 100 多字段落的中間而非開頭</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>太長且閱讀疲勞，4 句話合計 100 多字形成文字牆，招募人員會略讀或完全跳過</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>結尾軟弱削弱可信度，「continue to upskill in emerging technologies such as AI」聽起來初級且志向性，而非經證實的專家</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Revolut 品牌激活經理版本：</p>
              <p className="text-foreground text-sm">Brand Activation Manager who delivered 20X sales uplift across multi-market campaigns and +79% brand health improvement while sustaining No.1 market share for 2 consecutive years. Built first CRM loyalty program at J&J recognized globally as best-practice (showcased across NA, EU, ANZ, SEA), and saved £251K harmonizing brand identity across 6 APAC markets. Led 360° go-to-market strategies for flagship launches at Sanofi, Kenvue, and J&J. M.A. Brand Leadership with Distinction from University of East Anglia (UK).</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Snap 產品行銷經理版本：</p>
              <p className="text-foreground text-sm">Product Marketing Manager who increased product adoption from 15% to 22% through user journey mapping and drove +79% brand health improvement with upper-funnel strategy at multinational consumer brands. Achieved 20X sales uplift with automated CRM programs, 15% retention rate (vs. 10% benchmark) recognized as best-practice globally, and ROAS of 8 through rapid experimentation. Led cross-functional product launches across Sanofi, Kenvue, and J&J. M.A. Brand Leadership with Distinction from University of East Anglia (UK).</p>
            </div>

            <p className="text-gold font-semibold text-sm">影響：將摘要從「100 多字籠統聲明讓招募人員質疑您實際做過什麼」轉變為「4 句量化證明在前 3 秒內建立可信度」。</p>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 技能區塊改造</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">將技能區塊從籠統轉變為策略性關鍵字儲存庫</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（4 個籠統技能）：</p>
              <p className="text-muted-foreground text-sm">Product Marketing and Brand Strategy | Digital Strategy and Technology | Agency, Stakeholder Management and Cross-Functional Collaboration | Revenue Generation</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>太籠統無法區分，「Product Marketing」和「Brand Strategy」是職位的基本假設，不會讓您脫穎而出</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>缺少關鍵 JD 關鍵字，沒有出現「upper funnel」、「creator economy」、「brand consistency」、「customer segmentation」、「Looker」</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>浪費寶貴的 ATS 匹配機會，履歷被 ATS 掃描是因為具體關鍵字，而非籠統類別</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Revolut 優化版本：</p>
              <div className="text-foreground text-sm space-y-2">
                <p><strong>品牌行銷與策略：</strong>品牌激活、品牌一致性、品牌知名度、品牌考慮度、品牌定位、品牌指南、外部訊息框架</p>
                <p><strong>活動執行：</strong>跨通路活動、多市場活動、活動激活、全通路行銷、合作夥伴激活、零售激活</p>
                <p><strong>分群與鎖定：</strong>客戶分群、受眾鎖定、消費者洞察、市場研究（質性/量化）</p>
                <p><strong>協作與管理：</strong>代理商協作、利害關係人管理、預算管理、內容品質標準</p>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Snap 優化版本：</p>
              <div className="text-foreground text-sm space-y-2">
                <p><strong>產品行銷與 GTM：</strong>上層漏斗行銷、產品推出、市場推廣策略、產品採用、產品定位、推出規劃</p>
                <p><strong>品牌與知名度：</strong>品牌知名度活動、品牌考慮度、品牌建設、品牌健康指標、知名度和考慮度指標</p>
                <p><strong>CRM 與數位：</strong>創作者經濟、創作者合作夥伴關係、網紅策略、社群媒體廣告、內容策略</p>
                <p><strong>分析與工具：</strong>Looker、Excel、Google Analytics、A/B 測試、市場研究、數據分析、競爭基準</p>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">影響：將技能從「4 個籠統詞彙符合任何職位」轉變為「25 多個具體能力直接符合 Revolut 和 Snap 的 JD 要求」。</p>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">#4 精簡經驗</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">精簡經驗區塊從 23 個要點減至 15 個</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（7 個角色 23 個要點）：</p>
              <p className="text-muted-foreground text-sm">Sanofi（5 個要點）、Kenvue（4 個要點）、J&J（5 個要點）、APP（2 個要點）、NU SKIN（2 個要點）、OPPO（3 個要點）、Coty（2 個要點）</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>迫使招募人員閱讀所有內容，20 多個要點讓招募人員無法快速識別您最強、最相關的成就</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>NU SKIN 3 個月角色引發質疑，2019 年 4-7 月短期任期造成問題，且 MLM 商業模式有爭議名聲</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Coty 2010-2014 角色價值有限，10 多年前的經驗相關性不如您 2019-2025 的工作</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化方法：</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-foreground font-medium">Sanofi - 保留 3 個最強要點：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• 產品採用 15% 到 22% + 用戶分群推動 +32% 營收</li>
                    <li>• 即時分析基礎設施將延遲從 2 個月縮短到 &lt;24 小時</li>
                    <li>• +1.9pt 通路份額開創法規限制通路</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Kenvue - 保留 3 個要點：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• +15% 營收成長，將前兩大零售商的下滑逆轉為 +4% 份額</li>
                    <li>• 透過自動化 CRM 達成 5 倍轉換率和 20 倍零售銷售</li>
                    <li>• 透過電商實驗達成 8:1 ROAS</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">J&J - 保留 4 個要點：</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• 15% 留存率（vs. 10% 基準）被全球認可為最佳實踐</li>
                    <li>• 連續 2 年維持市場份額第一</li>
                    <li>• +8% 滲透率、+16% 忠誠度、+5% 電商、+79% 品牌健康</li>
                    <li>• A/B 測試達成 +36% CTR 改善和 -19% CPC 降低</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">NU SKIN - 完全移除</p>
                  <p className="text-muted-foreground">（3 個月，MLM 名聲風險）</p>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">影響：從 23 個減至 15 個要點（35% 減少）使履歷可在 10 秒內掃讀，同時確保每個保留的要點都直接相關。</p>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">#5 移除教育專案</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">移除教育專案，只保留學位 + 優等</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">目前版本（2016-2017 學術工作佔 8 行）：</p>
              <div className="text-sm text-foreground">
                <p>Projects:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>• Cooknst: Partnered with a UK start-up to develop brand principles, go-to-market strategy, loyalty scheme, digital content roadmap, and visual identity. (May–Aug 2017)</li>
                  <li>• Paston: Redefined brand purpose, proposition, personality, and identity for a UK-based client. (Jan–Mar 2017)</li>
                  <li>• Unitas: Designed brand vision, positioning, and digital marketing plan. (Nov–Dec 2016)</li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">問題：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>專案已超過 8 年，2016-2017 學術工作對 2026 年資深產品行銷經理申請相關性非常有限</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>佔用寶貴空間，學生專案消耗 8 行，這些空間可用於更強的技能區塊</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>造成初級印象，列出詳細的學術專案暗示缺乏實質的專業成就，而您顯然有豐富的專業成就</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
              <div className="text-sm text-foreground">
                <p className="font-medium">EDUCATION</p>
                <div className="mt-2 space-y-2">
                  <p>University of East Anglia, Norwich Business School | United Kingdom</p>
                  <p className="text-muted-foreground">Master of Arts (M.A.) in Brand Leadership | Graduated with Distinction | 2016-2017</p>
                  <p className="mt-2">National Chung Cheng University | Chiayi, Taiwan</p>
                  <p className="text-muted-foreground">Bachelor of Business Administration (B.B.A.) | 2006-2010</p>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">影響：將教育區塊從 13 行精簡至 4 行（70% 減少），釋放空間給更高價值的內容，同時維持證書可信度。</p>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wide">#6 標準化格式</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">標準化日期格式和公司描述以呈現專業光澤</h3>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">不一致範例：</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• "Aug 2024 - Now" vs. "Nov 2023-Apr 2024"（空格不一致）</li>
                <li>• "Johnson and Johnson(Consumer Health BU)"（括號前無空格）</li>
                <li>• "Asia Pulp & Paper (APP is the Top 10 pulp and paper company in the world.)"（括號內有句號）</li>
                <li>• "(Medical Device Manufacturer.)"（大寫，括號內有句號）</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">標準化格式：</p>
              <div className="text-sm text-foreground space-y-2">
                <div>
                  <p className="font-medium">所有日期：</p>
                  <p className="text-muted-foreground">"Month YYYY - Present" 或 "Month YYYY - Month YYYY"，橫線前後有空格</p>
                </div>
                <div>
                  <p className="font-medium">所有公司描述：</p>
                  <p className="text-muted-foreground">（小寫描述，無句號）</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Johnson & Johnson Consumer Health</li>
                    <li>• Asia Pulp & Paper (global pulp & paper company)</li>
                    <li>• OPPO Medical Corp. (medical device manufacturer)</li>
                    <li>• Coty Inc. (global beauty & fragrance leader)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">影響：雖然這些是個別的小改變，但整體上將履歷從「好內容但格式粗糙」轉變為「光澤專業的文件」。</p>
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
            {/* Revolut Before/After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Revolut 品牌激活經理</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-destructive font-semibold">修改前：35%</p>
                  <p className="text-muted-foreground text-sm">缺少：品牌激活、品牌知名度、品牌考慮度、內容品質、指標評估、代理商協作</p>
                </div>
                <div>
                  <p className="text-gold font-semibold">修改後：95%</p>
                  <p className="text-foreground text-sm">與所有關鍵 Revolut 品牌激活術語強烈一致</p>
                </div>
              </div>
            </div>

            {/* Snap Before/After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Snap 產品行銷經理</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-destructive font-semibold">修改前：45%</p>
                  <p className="text-muted-foreground text-sm">缺少：上層漏斗、創作者經濟、Looker、社群媒體廣告管理平台</p>
                </div>
                <div>
                  <p className="text-gold font-semibold">修改後：92%</p>
                  <p className="text-foreground text-sm">與 Snap 產品行銷和上層漏斗術語強烈一致</p>
                </div>
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
            <h2 className="font-heading text-3xl text-foreground">履歷關鍵字參考清單</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Revolut Keywords */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">Revolut 品牌激活經理適用</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">品牌行銷與策略：</p>
                  <p className="text-muted-foreground">Brand activation, Brand consistency, Brand awareness, Brand consideration, Brand positioning, Brand guidelines, External messaging frameworks</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">活動執行：</p>
                  <p className="text-muted-foreground">Cross-channel campaigns, Multi-market campaigns, Campaign activations, Omnichannel marketing, Partnership activations, Retail activations</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">分群與鎖定：</p>
                  <p className="text-muted-foreground">Customer segmentation, Audience targeting, Consumer insights, Market research (qualitative/quantitative)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">協作與管理：</p>
                  <p className="text-muted-foreground">Agency collaboration, Stakeholder management, Budget management, Content quality standards</p>
                </div>
              </div>
            </div>

            {/* Snap Keywords */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">Snap 產品行銷經理適用</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">產品行銷：</p>
                  <p className="text-muted-foreground">Upper funnel marketing, Product launches, Go-to-market strategy, Product adoption, Product positioning, Launch planning</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">品牌與知名度：</p>
                  <p className="text-muted-foreground">Brand awareness campaigns, Brand consideration, Brand building, Brand health metrics, Awareness and consideration metrics</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">創作者與數位：</p>
                  <p className="text-muted-foreground">Creator economy, Creator partnerships, Influencer strategy, Social media advertising, Content strategy</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">分析與工具：</p>
                  <p className="text-muted-foreground">Looker, Excel, Google Analytics, A/B testing, Market research, Data analytics, Competitive benchmarking</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-4 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>提示：只包含真正反映您經驗的關鍵字，因為面試官會要求您詳細說明列出的任何內容。如果您加入「creator economy」但沒有任何創作者合作夥伴關係範例，您在面試中會遇到困難。</span>
          </p>
        </section>

        {/* TRANSFORMATION SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">履歷效能提升</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">優化前：70/100</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>國際申請缺少工作授權，自動被拒</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>籠統摘要充滿模糊聲明，招募人員略讀看不到價值</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>只有 4 個籠統技能，錯失 ATS 關鍵字機會</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>7 個角色 23 個要點，閱讀疲勞，埋沒最佳工作</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>NU SKIN 3 個月 MLM 角色引發質疑</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>2016-2017 教育專案佔用寶貴空間</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不一致的格式暗示缺乏注意細節</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">優化後：90/100</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>明確的工作授權聲明，移除第一大阻礙</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>成果導向摘要配合量化證明，招募人員立即看到 20 倍提升、15% 留存率 vs. 基準</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>策略性技能區塊包含 25 多個關鍵字，Revolut 95% ATS 匹配、Snap 92%</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>聚焦 15 個要點突顯頂尖成就，10 秒可掃讀</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>移除 NU SKIN 並精簡較舊角色，清晰時間線</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>教育精簡為學位 + 優等，專業聚焦</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>全篇一致的格式，光澤外觀</span>
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
                <h3 className="font-heading text-xl text-foreground">修正格式和基本資訊</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• 如有授權：「Authorized to work in UK/Singapore without sponsorship | Available March 2026」</li>
                <li>• 新增專業頭銜：「Product Marketing Manager | Brand Activation & Go-To-Market Strategy」</li>
                <li>• 更新 LinkedIn URL 格式：移除「https://」使外觀更簡潔</li>
                <li>• 標準化所有日期格式：「Month YYYY - Present」，橫線前後有空格</li>
                <li>• 標準化公司描述：「（小寫描述無句號）」</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">2</div>
                <h3 className="font-heading text-xl text-foreground">將摘要轉變為成果導向</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• 根據主要目標選擇 Revolut 或 Snap 版本</li>
                <li>• 以量化成就開頭：20 倍銷售提升、15% 留存率 vs. 10% 基準、+41% 成長</li>
                <li>• 包含品牌名稱可信度：J&J、Sanofi、Kenvue</li>
                <li>• 以教育證書結尾：品牌領導力碩士並獲優等</li>
                <li>• 目標：4 句話，90 字以內</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">3</div>
                <h3 className="font-heading text-xl text-foreground">將技能區塊轉變為策略性關鍵字儲存庫</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• 根據主要目標使用 Revolut 或 Snap 優化版本</li>
                <li>• 組織為 4 個類別：產品行銷與 GTM、CRM/數位、分析、利害關係人管理</li>
                <li>• 包含具體工具：Google Analytics、Looker、Excel、Meta、TikTok、Snap</li>
                <li>• 納入 JD 關鍵字：上層漏斗、創作者經濟、品牌一致性、客戶分群</li>
                <li>• 目標 25 多個具體技能 vs. 目前 4 個籠統技能</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">4</div>
                <h3 className="font-heading text-xl text-foreground">將經驗區塊從 23 個精簡至 15 個要點</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• Sanofi：保留 3 個要點（產品採用、即時分析、通路份額）</li>
                <li>• Kenvue：保留 3 個要點（營收成長、CRM 轉換、ROAS）</li>
                <li>• J&J：保留 4 個要點（留存率、市場份額、品牌健康、A/B 測試）</li>
                <li>• NU SKIN：完全移除（3 個月任期，MLM 名聲風險）</li>
                <li>• OPPO：保留 2 個要點（訊息框架、Arab Health 大會）</li>
                <li>• Coty：精簡為 2 個要點或移除</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">5</div>
                <h3 className="font-heading text-xl text-foreground">精簡教育區塊</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• 刪除 Cooknst、Paston、Unitas 專案描述</li>
                <li>• 保留學位 + 「Graduated with Distinction」</li>
                <li>• 格式：「Master of Arts (M.A.) in Brand Leadership | Graduated with Distinction | 2016-2017」</li>
                <li>• 為更高價值內容節省 6 行</li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">6</div>
                <h3 className="font-heading text-xl text-foreground">為每個申請客製化</h3>
              </div>
              <div className="ml-11 space-y-4 text-sm text-foreground">
                <div>
                  <p className="font-medium">版本 A：Revolut 品牌激活經理</p>
                  <ul className="mt-1 space-y-1">
                    <li>• 摘要強調：多市場活動、跨通路激活、品牌一致性</li>
                    <li>• 技能區塊包含：品牌激活、品牌一致性、客戶分群、代理商協作</li>
                    <li>• 經驗要點突顯：£251K 品牌統一、合作夥伴計畫、+11% 營收</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">版本 B：Snap 產品行銷經理</p>
                  <ul className="mt-1 space-y-1">
                    <li>• 摘要強調：上層漏斗策略、+79% 品牌健康、知名度活動</li>
                    <li>• 技能區塊包含：上層漏斗、創作者經濟、Looker、社群媒體廣告</li>
                    <li>• 經驗要點突顯：產品採用 15% 到 22%、市場研究、產品推出</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">7</div>
                <h3 className="font-heading text-xl text-foreground">使用 STAR 方法準備面試故事</h3>
              </div>
              <div className="ml-11 text-sm text-foreground">
                <p className="font-medium mb-2">STAR 框架：</p>
                <ul className="space-y-1 mb-4">
                  <li>• Situation（情境）：背景/問題是什麼？</li>
                  <li>• Task（任務）：您的具體職責是什麼？</li>
                  <li>• Action（行動）：您做了什麼？（步驟）</li>
                  <li>• Result（結果）：發生了什麼？（量化成果）</li>
                </ul>
                <p className="font-medium mb-2">要準備的關鍵故事：</p>
                <ul className="space-y-1">
                  <li>• 20 倍銷售提升的多市場活動（Kenvue）</li>
                  <li>• 15% 留存率 vs. 10% 基準的 CRM 計畫（J&J）</li>
                  <li>• 透過用戶旅程圖將產品採用從 15% 提升至 22%（Sanofi）</li>
                  <li>• 疫情期間 +41% 銷售成長（亞洲漿紙）</li>
                  <li>• 連續 2 年維持市場份額第一（J&J）</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">應該做</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>為每個申請客製化，更改 2-3 個要點以符合 JD</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>申請後跟進，5-7 天後發信給招募人員</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>準備好解釋每個指標，面試官會問</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>保持範例機密，不要提及內部專案名稱</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>展現真誠熱情，引用公司的具體計畫</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-3">不應該做</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要未客製化就申請，質量重於數量</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要誇大指標，準備好用數據支持</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要批評前雇主，保持專業</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>不要忽略文化契合度，研究公司價值觀</span>
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
                <ScoreGauge score={70} label="修改前" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <div className="text-center">
                <ScoreGauge score={90} label="修改後" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 text-center space-y-4">
              <p className="text-foreground">您之前的履歷沒有有效地講述這個故事。它列出籠統技能如「Product Marketing」而非具體能力如「upper funnel strategy」和「customer segmentation」。它迫使招募人員在 23 個要點中尋找您最好的工作。</p>
              <p className="text-foreground">您的新履歷以量化證明開頭，針對 Revolut 和 Snap ATS 系統優化，並將注意力集中在每個角色的前 3-4 項成就。</p>
              <p className="text-gold font-semibold text-lg">您有經驗。現在您有了定位。去拿到 offer 吧。祝好運！🚀</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK */}
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

export default RoyTsaiReviewZhTw;
