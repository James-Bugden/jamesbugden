import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';
import AnnotatedResume from '@/components/AnnotatedResume';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';

// Annotations for page 1 - positions are percentages
const page1Annotations = [
  { id: 1, x: 22, y: 2.5, width: 18, height: 2, label: '電話號碼格式需要修正：+886 920 187 795', type: 'error' as const },
  { id: 2, x: 3, y: 5, width: 94, height: 14, label: '摘要過長（6行）。包含防禦性類比。重寫為3-4行。', type: 'error' as const },
  { id: 3, x: 3, y: 20, width: 94, height: 28, label: '主要成就包含類似「(類似於司機忠誠度)」的類比用語 - 請全部移除', type: 'error' as const },
  { id: 4, x: 3, y: 64, width: 94, height: 18, label: '工作經驗項目需要具體指標和 CAR 格式', type: 'error' as const },
];

const page2Annotations = [
  { id: 5, x: 45, y: 6, width: 5, height: 2, label: '字元編碼錯誤：「的」應該移除', type: 'error' as const },
];

const CharleneLeeReviewZhTw = () => {
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
              href="/reviews/charlene-lee-resume.pdf" 
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
            <h2 className="font-heading text-3xl text-foreground">執行摘要</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">整體評估</p>
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
              Charlene，你的履歷展現了在知名企業（微軟）的豐富經驗，並擁有令人印象深刻的客戶留存指標（120%+、100% 續約率）。
            </p>
            
            <p className="text-foreground leading-relaxed mb-4">
              然而，這份履歷目前定位於客戶成功職位，但似乎想轉型到營運/供應鏈相關職位（根據你的用詞推測可能是 Uber/共享出行）。大量使用類比（「直接適用於司機招募」）實際上削弱了你的定位——你在告訴招募人員如何理解你的經驗，而不是讓你的成就自己說話。
            </p>
            
            <p className="text-foreground leading-relaxed mb-6">
              經過有針對性的重新定位和內容優化，這份履歷可以在營運經理或供應成長職位的競爭中脫穎而出。我假設你的目標是這類職位，但回想起來我應該先詢問你的目標職位描述。
            </p>
          </div>

          {/* Target Readiness */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">目標準備度</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">65%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>目前狀態：</strong>這份履歷可以讓你獲得科技公司客戶成功經理或客戶經理職位的面試。然而，對於營運/供應成長職位的定位並不理想，因為：
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 太多「客戶成功」相關用語</li>
                <li>• 營運/供應鏈術語不足</li>
                <li>• 類比使轉型意圖過於明顯且不自然</li>
                <li>• 缺少關鍵營運指標（產能、效率、使用率）</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">修改後</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">85%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>執行上述3個優先事項後：</strong>履歷將達到85%準備度，可競爭以下職位：
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 營運經理（科技公司、市場平台）</li>
                <li>• 供應成長經理（Uber、Grab、Deliveroo、Foodpanda）</li>
                <li>• 商業營運經理（高成長新創）</li>
                <li>• 策略合作經理（B2B 平台）</li>
              </ul>
            </div>
          </div>

          {/* Remaining Gap */}
          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <p className="text-gold font-semibold mb-3">剩餘 15% 差距：</p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                針對每個特定職位調整關鍵字（營運 vs 供應 vs 合作夥伴）
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                可能需要重新排列經驗順序，將營運成就放在前面
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                如果目標是純營運職位，可增加1-2個營運相關認證（六標準差、PMP）
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
            <h2 className="font-heading text-3xl text-foreground">三大優勢</h2>
          </div>

          <div className="space-y-6">
            {/* Strength 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold text-foreground">量化且令人印象深刻的成果</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">整體組合 120%+ 的留存與成長</span>
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
                  <span className="text-foreground">這些指標立即展現你能創造商業影響力，是以結果為導向的人才</span>
                </li>
              </ul>
            </div>

            {/* Strength 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold text-foreground">頂尖企業品牌信譽</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">在微軟工作 20 年（2005-2025）展現忠誠度、職涯發展，以及在複雜企業環境工作的能力</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">微軟的名字立即建立招募人員的信任</span>
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
                <h3 className="text-xl font-semibold text-foreground">明確的跨部門領導力</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">協調工程、交付、支援團隊</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">與 C 級主管合作</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">跨銷售、服務、支援組織協調</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">展現你能在沒有直接權限的情況下影響他人，並管理複雜的利益相關者</span>
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
            <h2 className="font-heading text-3xl text-foreground">三大優先事項（按影響力排名）</h2>
          </div>

          {/* Priority 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先事項 1 - 高影響力 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">移除所有類比和括號說明</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼重要：</strong>你的摘要和條列項目充滿了「(直接適用於平台服務提供者/司機招募)」和「(類似於司機忠誠度)」等用語。這造成三個主要問題：
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>削弱你的可信度</strong> - 聽起來像是你在試圖說服招募人員你的經驗是相關的</li>
              <li><strong>佔用寶貴空間</strong> - 用 15-20% 的履歷篇幅來做後設評論</li>
            </ol>

            <p className="text-foreground font-semibold mb-4">解決方案：簡單描述你實際做了什麼以及達成的成果。讓招募人員自己建立連結。</p>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">❌ 目前（弱）：</p>
                <p className="text-foreground italic">"達成 100% 客戶續約，同時在高價值組合中超越 120% 留存與成長目標，證明建立可擴展、長期參與策略的能力（類似於司機忠誠度）。"</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">✅ 更好（強）：</p>
                <p className="text-foreground italic">"達成 100% 客戶續約，同時在 25+ 個企業帳戶（價值 $15M+ ARR）的高價值組合中超越 120% 留存與成長目標。"</p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">第二個版本更有力、更具體，而且不為自己辯解。</p>
          </div>

          {/* Priority 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">優先事項 2 - 高影響力 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">重寫專業摘要，聚焦職位而非轉型</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼重要：</strong>你目前的摘要讀起來像是一封求職信，在解釋為什麼你有資格做另一個職位。它是 6 行密集文字，試圖將你的經驗連結到其他東西。招募人員會快速掃過，錯過你真正的價值。
            </p>

            <p className="text-foreground font-semibold mb-3">目前版本的問題：</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>太長（6 行，最多應該 4 行）</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>防禦性語氣（「直接適用於」）</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>試圖將客戶成功經驗強制套用到營運角色</strong>
              </li>
            </ul>

            <div className="space-y-4">
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">✅ 建議的摘要（4 行）：</p>
                <p className="text-foreground italic">"擁有 20 年微軟經驗的資深營運經理，專精成長策略、客戶留存與卓越營運。創造 120%+ 組合成長，同時維持 $15M+ 帳戶 100% 客戶續約。精通數據驅動的管道管理、跨部門團隊領導，以及策略預測以推動可衡量的商業成果。"</p>
              </div>
            </div>
          </div>

          {/* Priority 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">優先事項 3 - 中等影響力 🟡</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">在姓名下方添加職稱</h3>
            
            <p className="text-foreground mb-4">
              <strong>為什麼重要：</strong>目前你的聯絡資訊直接在姓名下方，但招募人員在收到數十份履歷時，掃描平均 6-7 秒。前 2 秒用於識別：「這個人是誰？」姓名下方的職稱立即回答這個問題，並框架你的整份履歷。沒有它，你就是在強迫招募人員瀏覽你的內容來找出你是誰——他們可能不會這樣做。
            </p>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">✅ 建議添加：</p>
              <p className="text-foreground italic">"資深營運經理 | 成長策略 | 卓越營運"</p>
              <p className="text-muted-foreground text-sm mt-2">放在姓名正下方、聯絡資訊之前</p>
            </div>
          </div>
        </section>

        {/* Corrected Resume */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">修正後的履歷</h2>
          </div>

          {/* Corrected Resume Images */}
          <div className="space-y-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-4">第 1 頁</p>
              <img 
                src="/reviews/charlene-corrected-page1.png" 
                alt="修正後的履歷第 1 頁" 
                className="w-full rounded-lg border border-border"
              />
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-medium text-muted-foreground mb-4">第 2 頁</p>
              <img 
                src="/reviews/charlene-corrected-page2.png" 
                alt="修正後的履歷第 2 頁" 
                className="w-full rounded-lg border border-border"
              />
            </div>
          </div>

          {/* Actions Section */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-6 mb-8 border-2 border-gold/30">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">接下來該做什麼</h3>
            </div>
            <p className="text-sm text-muted-foreground mb-5">4 個改變，立即提升</p>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">刪除所有括號類比</p>
                  <p className="text-sm text-muted-foreground">尋找：「(直接適用於」、「(類似於」、「(鏡像」。刪除這些括號內的所有內容。</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">在姓名下方添加職稱</p>
                  <p className="text-sm text-muted-foreground">添加：「資深營運經理 | 成長策略 | 卓越營運」</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">重寫專業摘要</p>
                  <p className="text-sm text-muted-foreground">使用上面建議的 4 行版本。移除所有「直接適用於」語言。</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">修正電話號碼格式</p>
                  <p className="text-sm text-muted-foreground">更改為：+886 920 187 795（適當的間距）</p>
                </div>
              </label>
            </div>
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
              Charlene，你擁有在世界頂級公司之一取得真正成就的堅實基礎。你的挑戰不是缺乏經驗——而是展示方式。
            </p>

            <p className="text-foreground leading-relaxed mb-4">
              你需要關注的核心問題是：停止為你的經驗道歉，停止為你的經驗辯解。移除那些類比。讓你的數字自己說話。如果你在微軟達成 100% 客戶續約和 120%+ 成長——這些成就在任何行業都令人印象深刻。你不需要解釋為什麼它們很重要。
            </p>

            <p className="text-foreground leading-relaxed mb-6">
              實施這 3 個優先事項（大約 1-2 小時的工作），你的履歷將顯著提升。
            </p>

            <div className="border-t border-border mt-6 pt-6">
              <p className="text-muted-foreground">對回饋有任何問題嗎？有任何你希望我釐清或詳細說明的地方嗎？</p>
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
