import { ArrowLeft, Download, CheckCircle2, AlertTriangle, Lightbulb, Target, Users, Rocket, Crown } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GuideShareButtons from "@/components/GuideShareButtons";

const PivotMethodMiniGuideZhTw = () => {
  const navigate = useNavigate();
  
  const toggleLanguage = () => {
    navigate("/pivot-method-mini-guide");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <button 
              onClick={toggleLanguage}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
            <Button asChild className="btn-gold">
              <a href="/downloads/ZH_The_Pivot_Method_Mini_Guide.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                下載 PDF
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#1B3A2F] text-cream py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gold font-medium mb-4 tracking-wide uppercase">職涯轉換快速指南</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6" style={{ lineHeight: 1.2 }}>
            轉換方法論
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-4">
            根據 Jenny Blake 的《Pivot:唯一重要的動作是你的下一步》改編
          </p>
          <p className="text-lg text-cream/80">
            作者:James Bugden • 資深招募顧問
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        
        {/* Why This Guide Exists */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">為什麼有這份指南</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              我在 Uber 和 Netskope 等公司錄用了 500 多人。我審閱過超過 20,000 份履歷。我最常看到的模式是:有才華的人困在錯誤的職業中,做出錯誤的動作來脫困。
            </p>
            <p className="text-lg leading-relaxed mb-4">
              他們沒有計劃就辭職。他們在完全不同的領域從零開始。他們在網上申請 200 個工作,然後納悶為什麼沒人回電。
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Jenny Blake 的書《Pivot》提出了一個更聰明的方法。這是我看到對我錄用的最佳轉職者有效的同樣方法。這份指南從招募人員的視角分解了什麼真正有效(以及失敗)— 從招募桌的另一側看。
            </p>
            <p className="text-lg leading-relaxed">
              這是濃縮版;框架、關鍵行動和要避免的錯誤。
            </p>
          </div>
        </section>

        {/* What Is a Career Pivot */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">什麼是職涯轉換(Career Pivot)?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            轉換是加倍投入有效的部分,以轉向新的相關方向。你不是從零開始。你在使用現有的優勢、技能和人脈來進入更好的領域。
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            把它想成籃球:一隻腳保持固定(你的基礎),而另一隻腳探索新領域。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-heading text-xl text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                轉換不是:
              </h3>
              <ul className="space-y-2 text-red-700">
                <li>• 沒有計劃就辭職</li>
                <li>• 在完全不同的領域重新開始</li>
                <li>• 中年危機或崩潰</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-heading text-xl text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                轉換是:
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• 有計劃的、循序漸進的過程</li>
                <li>• 建立在你已有的基礎上</li>
                <li>• 在承諾前測試</li>
                <li>• 在探索時降低風險</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gold/10 border border-gold/30 rounded-xl p-6">
            <p className="text-foreground">
              <strong>為什麼現在很重要:</strong> 平均任職時間是 4-5 年。你的職業生涯中可能會有 11 個以上的工作,並換 3-6 次產業。問題不是你是否會轉換 — 而是你會做得好還是做得差。
            </p>
          </div>
        </section>

        {/* The 5 Stages */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">5 個階段</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            大多數人跳過前面的階段,直接到第 4 階段(做出重大舉動),而沒有完成第 1-3 階段的工作。這就是為什麼大多數職業轉換感覺混亂而不是策略性的。
          </p>

          {/* Stage 1: Plant */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">階段 1:種植 — 設定你的基礎</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              在探索任何新事物之前,先弄清楚你已經擁有什麼以及你真正想要什麼。
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">校準你的指南針</h4>
                <p className="text-muted-foreground">你真正的價值觀是什麼 — 不是應該重要的,而是實際上重要的?什麼讓你充滿活力,什麼讓你筋疲力盡?你的不可妥協事項是什麼?</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">招募人員現實檢查:</strong> 我看到還沒弄清楚這一點的候選人為了錢接受工作,然後六個月後因為文化有毒而辭職。他們追逐頭銜而不考慮這個角色是否發揮他們的優勢。在開始搜尋前先了解你的指南針。
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">設定 1 年願景</h4>
                <p className="text-muted-foreground">不是 5 年,不是 10 年。一年後你想在哪裡?要具體。「我想領導一個 5 人的工程師團隊,從事 AI 基礎設施工作」是有用的。「我想要一份更好的工作」則不是。</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">識別你的優勢</h4>
                <p className="text-muted-foreground">你天生擅長什麼?人們來找你解決什麼問題?哪些技能可以轉移到新的環境?成功的轉換是以新方式利用現有優勢。工程師轉到產品管理,顧問轉到內部策略,教師轉到企業培訓。他們不是從零開始。他們重新瞄準。</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">資助你的跑道</h4>
                <p className="text-muted-foreground">你不能在財務絕望中轉換。在做出任何重大舉動之前,至少存下 3-6 個月的開支。絕望會扼殺你的談判力。當我在招募時,我能感覺到候選人何時需要這份工作,何時想要這份工作。想要的人得到更好的 offer。</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  階段 1 的行動步驟:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>寫下你的前 3-4 個價值觀(真實的,不是理想的)</li>
                  <li>完成這句話:「一年後,我想要 __」,盡可能具體</li>
                  <li>列出 5 件你真正擅長、人們依賴你做的事</li>
                  <li>計算你的跑道:每月開支 × 6 = 你的儲蓄目標</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 2: Scan */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">階段 2:掃描 — 收集情報</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              現在你知道了你的基礎,研究你想去哪裡以及到達那裡需要什麼。
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">在需要之前建立你的人脈網</h4>
                <p className="text-muted-foreground">70-80% 的工作是通過人脈而不是職缺公告填補的。當我在 Uber 開啟一個職位時,我的第一步是問我的團隊「我們認識誰?」如果有人為候選人擔保,他們就會跳到隊伍的最前面。冷申請的人需要非常出色才能被注意到。</p>
                <p className="text-muted-foreground mt-2">不要把社交視為請求幫忙。把它視為建立雙向關係。先給予,稍後再要求。</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">彌合你的技能差距,但要聰明地做</h4>
                <p className="text-muted-foreground">你不需要職位描述上的每一項。根據我篩選履歷的經驗,如果你能講一個關於差距的好故事,60-70% 的匹配度通常就足夠了。專注於對該角色最關鍵、最難在工作中學習以及在目標市場中最有價值的技能。</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">讓自己可被發現</h4>
                <p className="text-muted-foreground">不要用你目前的職稱定義自己。用你解決的問題定義自己。「我正在為 SaaS 產品開發用戶獲取策略」勝過「我是一個想轉換的行銷經理」。</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">招募人員現實檢查:</strong> 「灑履歷」方法 — 申請 100 個工作 — 對職涯轉換者很少有效。有針對性的能見度更有效。讓目標領域的 10 個人認識你並能為你擔保。這比 100 個冷申請更有力量。
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  階段 2 的行動步驟:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>找到 5 個已經在你目標領域工作的人,請求 20 分鐘的咖啡聊天</li>
                  <li>列出你目標角色需要的前 3 項你還沒有的技能</li>
                  <li>選擇一個技能差距在本月開始彌補(線上課程、副項目或培訓)</li>
                  <li>更新你的 LinkedIn 個人檔案,描述你解決的問題,而不只是你擔任過的頭銜</li>
                  <li>告訴你人脈網中 3 個值得信賴的人你正在探索什麼,讓他們幫助連接點</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 3: Pilot */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">階段 3:試點 — 在承諾前測試</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              這是最重要的階段,也是大多數人完全跳過的階段。不要做一次大跳躍,而是進行小型實驗來收集真實世界的數據。
            </p>
            <p className="text-muted-foreground mb-6">
              人們辭職去「追求夢想」,然後發現他們討厭那個夢想的現實。試點可以防止這種昂貴的錯誤。
            </p>

            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="font-medium text-foreground mb-2">一個強大的試點是:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• 低風險(可以在受僱時進行)</li>
                  <li>• 低成本(最小的財務投資)</li>
                  <li>• 可逆轉(如果不奏效)</li>
                  <li>• 提供真實數據(不只是理論)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">試點範例:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>目標產業的自由職業專案</strong> — 測試:你能做這項工作嗎?你喜歡嗎?</li>
                  <li>• <strong>週末的副項目</strong> — 測試:真正的興趣、技能水平、市場需求</li>
                  <li>• <strong>在受僱時為 1-2 個客戶提供諮詢</strong> — 測試:業務可行性</li>
                  <li>• <strong>教授工作坊</strong> — 測試:專業知識、對教育的興趣</li>
                  <li>• <strong>在新領域當志工</strong> — 測試:文化、日常現實</li>
                </ul>
              </div>

              <p className="text-muted-foreground">
                <strong>追求數量。</strong> 進行 5-10 個小實驗,而不是 1 個完美的測試。如果你在測試自由撰稿,不要只投一篇文章就放棄。投 20 篇,完成 5 篇,加入 2 個社群,訪談 3 個全職作家。在決定前匯總數據。
              </p>

              <div>
                <h4 className="font-semibold text-foreground mb-3">每次試點後,問三個問題:</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>什麼有效?</strong>(什麼讓我充滿活力?我得到什麼反饋?)</li>
                  <li><strong>什麼無效?</strong>(什麼讓我筋疲力盡?什麼比預期困難?)</li>
                  <li><strong>接下來是什麼?</strong>(繼續?嘗試變化?進行不同的實驗?)</li>
                </ol>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">招募人員現實檢查:</strong> 當我審閱職涯轉換者的履歷時,我尋找試點的證明。從諮詢轉到產品管理的人應該有產品副項目、與產品團隊合作的經驗,或產品思維的證據。沒有試點,你是在要求雇主對你承擔更大的風險。有了試點,你就有了證明。
                </p>
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-foreground font-medium">
                  黃金法則:如果你討厭試點,你就會討厭轉換。最好現在發現,當你還有工作和收入的時候。
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  階段 3 的行動步驟:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>設計你的第一個試點 — 你本週可以進行的最小實驗是什麼?</li>
                  <li>設定目標:在接下來的 2 個月內至少進行 3 次試點</li>
                  <li>每次試點後,用 3 句話寫下你學到了什麼</li>
                  <li>與 3 個已經在做你目標工作的人交談 — 將他們的現實與你的期望進行比較</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 4: Launch */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">階段 4:啟動 — 做出舉動</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              啟動不是關於勇氣。Blake 的關鍵見解:<strong>先建立,勇氣第二。</strong>
            </p>
            <p className="text-muted-foreground mb-6">
              當你正確完成種植、掃描和試點時,啟動變得不那麼可怕,因為它是數據驅動的,而不是恐懼驅動的。
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4">定義你的啟動標準</h4>
                <p className="text-muted-foreground mb-4">這些是在你做出舉動之前必須為真的具體條件。寫下來。對自己誠實。</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">財務標準:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ 儲蓄了 ___ 個月的應急基金</li>
                      <li>☐ 建立了 $___ 的副業收入(如適用)</li>
                      <li>☐ 將主要債務減少到可管理的水平</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">專業標準:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ 已排定 ___ 個付費客戶 / 獲得工作 offer</li>
                      <li>☐ 獲得關鍵證書或技能</li>
                      <li>☐ 擁有 ___ 個強大範例的作品集</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">個人標準:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ 伴侶/家人支持這個改變</li>
                      <li>☐ 生活狀況穩定</li>
                      <li>☐ 心理和身體健康狀況良好</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-foreground">
                  <strong>不要等待完美的條件。</strong> 沒有完美的時機來進行職業轉換。當你的標準達到時就啟動,即使你仍然害怕。恐懼是正常的。癱瘓是可選的。
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  階段 4 的行動步驟:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>寫下你的啟動標準清單 — 要具體和可衡量</li>
                  <li>對於每個標準,確定什麼已經達到,什麼仍需努力</li>
                  <li>設定截止日期:「我將在 [日期] 前做出決定」</li>
                  <li>準備你的轉換對話(主管、家人)— 先做決定,再計劃對話</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 5: Lead */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">階段 5:領導 — 幫助他人轉換</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              一旦你成功轉換,分享你學到的東西。幫助他人度過他們的轉換。介紹人脈。審閱履歷。慶祝他人的職涯成功。
            </p>
            <p className="text-muted-foreground mb-6">
              職涯因果報應是真實的。你幫助越多人成功轉換,當你需要下一次轉換時,你就會有越多支持。
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                階段 5 的行動步驟:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-green-700">
                <li>與至少一個正在考慮類似舉動的人分享你的轉換故事</li>
                <li>為處於轉換期的人提供審閱履歷或進行模擬面試</li>
                <li>連接你人脈網中可以互相幫助的兩個人</li>
              </ol>
            </div>
          </div>
        </section>

        {/* The 5 Mistakes */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">我每週看到的 5 個錯誤</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">1. 測試前辭職</h3>
              <p className="text-red-700">永遠先試點。職業的現實很少與想法匹配。在你還受僱並有收入時收集數據。</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">2. 從零開始</h3>
              <p className="text-red-700">你不需要一個完全新的身份。找到相鄰的舉動 — 從你現在的位置開始一步。利用你已經擁有的。顧問 → 內部策略。工程師 → 產品管理。教師 → 企業培訓。</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">3. 分析癱瘓</h3>
              <p className="text-red-700">在某個時候,更多的研究沒有幫助 — 你需要經驗。設定決策截止日期。20 次資訊性訪談教你的東西少於一個實際做這項工作的自由職業專案。</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">4. 沒有財務跑道</h3>
              <p className="text-red-700">絕望會扼殺談判。這在候選人接受 offer 的速度、他們談判多少、他們如何提出問題中很明顯。在任何重大啟動前存下 3-6 個月的開支。</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">5. 跳過人脈網</h3>
              <p className="text-red-700">在網上申請 100 個工作而不與目標領域的任何人交談是職業轉換最慢的途徑。大多數工作是通過人脈填補的。你的履歷不如誰在內部為你爭取重要。</p>
            </div>
          </div>
        </section>

        {/* Start Here */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">從這裡開始</h2>
          
          <div className="grid gap-4">
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Target className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">如果你受僱且不確定 →</p>
                <p className="text-muted-foreground">從種植開始。明確你的指南針和 1 年願景。</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Users className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">如果你知道你想去哪裡 →</p>
                <p className="text-muted-foreground">進入掃描。建立你的人脈網並彌合技能差距。</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">如果你已經做了研究 →</p>
                <p className="text-muted-foreground">進行試點。用真實實驗測試你的假設。</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Rocket className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">如果你已經測試和驗證 →</p>
                <p className="text-muted-foreground">檢查你的啟動標準。設定決策截止日期。</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Crown className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">如果你已經轉換 →</p>
                <p className="text-muted-foreground">領導。幫助他人度過他們的轉換。</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-heading text-foreground mb-8">
              唯一重要的動作是你的下一步
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1B3A2F] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
            獲取完整指南
          </h2>
          <p className="text-cream/80 mb-6 max-w-2xl mx-auto">
            下載包含練習、詳細範例和視覺框架的完整指南。
          </p>
          <Button asChild size="lg" className="btn-gold">
            <a href="/downloads/ZH_The_Pivot_Method_Mini_Guide.pdf" download>
              <Download className="w-5 h-5 mr-2" />
              下載 PDF 指南
            </a>
          </Button>
        </section>

        <GuideShareButtons isZhTw />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="mb-2">
            James Bugden • Uber Taiwan 資深招募顧問
          </p>
          <p className="text-sm">
            根據 Jenny Blake 的《Pivot:唯一重要的動作是你的下一步》。所有框架概念和方法論歸功於 Jenny Blake。
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PivotMethodMiniGuideZhTw;
