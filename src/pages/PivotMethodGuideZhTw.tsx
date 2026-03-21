import { ArrowLeft, Target, Compass, Search, FlaskConical, Rocket, Users, CheckCircle2, AlertTriangle, Linkedin, Calendar, TrendingUp, Zap, BarChart3, Lightbulb, RefreshCw, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";

const PivotMethodGuideZhTw = () => {
  useTrackGuideProgress("pivot-guide");
  const navigate = useNavigate();


  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <Link to="/zh-tw" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">返回首頁</span>
            </Link>
            <button 
              onClick={() => navigate("/pivot-method-guide")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-[1.2] mb-4">
            轉換方法：職涯轉換完整指南
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            招募人員的戰術指南
          </p>
          <p className="text-base text-cream/60 mb-2">
            作者：James Bugden，資深招募顧問
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">40 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            根據 Jenny Blake 的《Pivot: 唯一重要的動作是你的下一步》改編，結合 20,000+ 份履歷審核和 500+ 次錄用的招募經驗。
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            什麼是職涯轉換？
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            Jenny Blake 將職涯轉換定義為「加倍投入有效的部分，以在新的相關方向上做出有目的的轉變。」
          </p>
          <p className="text-base md:text-lg text-foreground mb-6">
            <span className="text-gold font-semibold">轉換意味著你不是從零開始。</span>你正在利用現有的優勢、技能和經驗朝相關方向前進。把它想成籃球轉身：一隻腳保持固定（你的基礎），而另一隻腳探索新領域。
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                轉換不是什麼
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 沒有計劃就辭職</li>
                <li>• 在完全不相關的領域重新開始</li>
                <li>• 追逐零相關技能的夢想</li>
                <li>• 中年危機或崩潰</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                轉換是什麼
              </h3>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• 有意圖的、有條理的職涯轉換過程</li>
                <li>• 建立在你現有的優勢和經驗上</li>
                <li>• 在完全承諾前測試新方向</li>
                <li>• 在探索機會時降低風險</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">智慧型手機類比：</strong>職涯過去像梯子（線性、可預測、一條向上的路徑）。現在它們像智慧型手機（模組化、可自訂、動態的）。轉換是關於一次下載一個新應用程式，而不是試圖一夜之間升級你的整個作業系統。
            </p>
          </div>
        </div>
      </section>

      {/* Five Stages Overview */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            轉換的五個階段
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            大多數人直接跳到啟動（做出重大舉動）而沒有完成基礎工作，這就是為什麼這麼多職涯轉換失敗的原因。
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">階段 1</h3>
              <p className="text-gold font-semibold">種植</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">階段 2</h3>
              <p className="text-gold font-semibold">掃描</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">階段 3</h3>
              <p className="text-gold font-semibold">試點</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">階段 4</h3>
              <p className="text-gold font-semibold">啟動</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">階段 5</h3>
              <p className="text-gold font-semibold">領導</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 1: Plant */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">階段 1：種植</h2>
              <p className="text-muted-foreground">在移動前設定你的基礎</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-gold" />
                1. 校準你的指南針
              </h3>
              <p className="text-foreground mb-4">你的指南針是你的一套指導原則和價值觀。它幫助你在面對不確定性時做出決定。</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• 你的核心價值觀是什麼？（不是應該對你重要的，而是實際上重要的）</li>
                <li>• 什麼讓你充滿活力，什麼讓你筋疲力盡？</li>
                <li>• 你在工作和生活中的不可妥協事項是什麼？</li>
              </ul>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">練習：創建你的快樂公式</p>
                <p className="text-muted-foreground text-sm">什麼組合的因素讓你在工作中感到滿足？對某些人來說是自主權 + 學習 + 影響。對其他人來說是穩定性 + 明確期望 + 協作。</p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-gold" />
                2. 定下目標
              </h3>
              <p className="text-foreground mb-4">為一年後你想要的地方創建願景。不是五年，不是十年。一年。</p>
              <ul className="space-y-2 text-foreground">
                <li>• 現在什麼最讓你興奮？</li>
                <li>• 一年後成功是什麼樣子？</li>
                <li>• 你想在哪裡（角色、公司、產業、生活方式）？</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold" />
                3. 為引擎加油
              </h3>
              <p className="text-foreground mb-4">識別什麼已經在起作用。成功的轉換以新方式利用現有優勢。</p>
              <ul className="space-y-2 text-foreground">
                <li>• 你天生擅長什麼？</li>
                <li>• 你在哪裡以最少的努力表現出色？</li>
                <li>• 人們一直來找你幫助什麼？</li>
              </ul>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gold" />
                4. 資助你的跑道
              </h3>
              <p className="text-foreground mb-4">你不能從財務絕望的位置轉換。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
                <p className="text-foreground">
                  <strong className="text-gold">最低建議：</strong>在做出任何重大舉動之前存下 3-6 個月的開支。絕望會扼殺你的談判力。建立你的跑道，這樣你就能從優勢而非絕望中談判。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Scan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">階段 2：掃描</h2>
              <p className="text-muted-foreground">在跳躍前收集情報</p>
            </div>
          </div>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">1. 加強你的替補席</h3>
              <p className="text-foreground mb-4">你的「替補席」是你的顧問、導師和人脈網絡，他們可以幫助你渡過轉換。</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-4">
                <p className="text-foreground">
                  <strong className="text-gold">招募人員的真相：</strong>70-80% 的工作是通過人脈網而非職位公告填補的。你的履歷不如誰在內部為你爭取重要。在需要之前建立關係。
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">2. 彌合差距</h3>
              <p className="text-foreground mb-4">誠實的技能評估。Blake 的框架分為三種類型的技能差距：</p>
              <div className="grid md:grid-cols-3 gap-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">技術技能</h4>
                  <p className="text-muted-foreground text-sm">特定軟體、證書、技術知識</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">可轉移技能</h4>
                  <p className="text-muted-foreground text-sm">溝通、領導力、問題解決</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">經驗差距</h4>
                  <p className="text-muted-foreground text-sm">需要實際操作的領域</p>
                </div>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">3. 讓自己可被發現</h3>
              <p className="text-foreground mb-4">人們需要知道你在探索新方向，這樣他們才能幫助你。</p>
              <ul className="space-y-2 text-foreground">
                <li>• 更新你的 LinkedIn 個人檔案以反映你的轉換</li>
                <li>• 分享你在學習什麼（貼文、文章）</li>
                <li>• 參與目標領域的對話</li>
                <li>• 讓你的人脈網知道你在探索</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 3: Pilot */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🧪</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">階段 3：試點</h2>
              <p className="text-muted-foreground">在承諾前測試</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            這是 Blake 對職涯轉換方法論最重要的貢獻。與其做一次大跳躍，你進行小實驗來收集真實世界的數據。
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">核心原則：</strong>如果你討厭試點，你就會討厭轉換。最好在你還有工作和收入時發現這一點。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">什麼構成強大的試點？</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">低風險、低成本</p>
                <p className="text-muted-foreground text-sm">可以在受僱時進行，不需要辭職，如果不奏效可以逆轉</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">提供真實世界的數據</p>
                <p className="text-muted-foreground text-sm">測試實際興趣和能力，給你市場反饋</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">一次測試一個變數</p>
                <p className="text-muted-foreground text-sm">隔離你正在測試的內容（角色、產業、環境、技能）</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">試點範例：</h3>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• 目標產業的自由職業專案</li>
            <li>• 週末的副項目或熱情專案</li>
            <li>• 在受僱時為 1-2 個客戶提供諮詢</li>
            <li>• 教授課程或工作坊</li>
            <li>• 新領域的志願者角色</li>
            <li>• 與 10 個正在做你目標工作的人進行資訊性訪談</li>
          </ul>

          <div className="bg-card border border-border rounded-lg p-5">
            <h4 className="font-semibold text-foreground mb-3">通過試點回答的問題：</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• 這項工作讓你充滿活力還是耗盡你？</li>
              <li>• 你能實際做這項工作嗎？</li>
              <li>• 你的技能有市場需求嗎？</li>
              <li>• 你喜歡日常現實（不只是想法）嗎？</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Stage 4: Launch */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">階段 4：啟動</h2>
              <p className="text-muted-foreground">當你準備好時做出重大舉動</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Blake 的關鍵見解：「先建立，勇氣第二。」當你在種植、掃描和試點中完成工作時，啟動變得不那麼可怕，因為它是數據驅動的，而不是恐懼驅動的。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">確定你的啟動標準</h3>
          <p className="text-foreground mb-4">在你做出舉動之前什麼需要是真的？</p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">財務標準</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 存下 6 個月的應急基金</li>
                <li>• 建立副業收入</li>
                <li>• 減少債務</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">專業標準</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 排定付費客戶</li>
                <li>• 獲得工作 offer</li>
                <li>• 完成認證</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">個人標準</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 伴侶完全支持</li>
                <li>• 健康狀況良好</li>
                <li>• 生活狀況穩定</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <h4 className="font-semibold text-gold mb-3">轉換六邊形：評估六個維度的準備度</h4>
            <ol className="space-y-1 text-foreground">
              <li>1. 價值觀和願景一致性</li>
              <li>2. 優勢和技能匹配</li>
              <li>3. 財務基礎穩固</li>
              <li>4. 人脈網和支持系統到位</li>
              <li>5. 試點數據積極</li>
              <li>6. 時機感覺對</li>
            </ol>
            <p className="text-muted-foreground text-sm mt-3">你不需要所有六個都完美，但你需要至少 4-5 個是綠色的才能安全啟動。</p>
          </div>
        </div>
      </section>

      {/* Stage 5: Lead */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">階段 5：領導</h2>
              <p className="text-muted-foreground">幫助他人轉換</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            一旦你成功轉換，你就有責任（和機會）幫助他人。Blake 稱之為「職涯因果報應」— 你幫助別人轉換得越多，當你需要下一次轉換時，你得到的支持就越多。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">分享你的故事</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 你為什麼轉換</li>
                <li>• 你如何弄清楚下一步</li>
                <li>• 你犯了什麼錯誤</li>
                <li>• 什麼有效、你學到了什麼</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">職涯因果報應行動</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• 將人們介紹給你人脈網中的聯繫人</li>
                <li>• 為正在轉換的人審查履歷</li>
                <li>• 進行模擬面試</li>
                <li>• 指導正在轉換的人</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            常見的轉換陷阱（以及如何避免它們）
          </h2>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #1：分析癱瘓</p>
              <p className="text-muted-foreground">無休止的研究而從不採取行動。解決方案：為研究階段設定時間限制，關注行動而不是研究。「你永遠不會在開始時看到整個轉換路徑，你也不會想要。」</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #2：從零開始</p>
              <p className="text-muted-foreground">忽略所有現有技能並嘗試在全新領域重新開始。解決方案：尋找相鄰的舉動，從你現在的位置開始一步。轉換是從已經有效的部分加倍投入。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #3：跳過試點</p>
              <p className="text-muted-foreground">沒有測試就辭掉工作轉換到新職業。解決方案：總是在承諾之前運行試點。如果你討厭試點，你就會討厭轉換。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #4：等待完美條件</p>
              <p className="text-muted-foreground">完美的條件永遠不會到來。解決方案：定義你的啟動標準，當標準滿足時啟動。區分「還不是時候」和「我害怕」。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #5：沒有財務跑道就啟動</p>
              <p className="text-muted-foreground">絕望會產生糟糕的決定。解決方案：在啟動前建立 3-6 個月的費用。絕望的候選人接受糟糕的 offer，協商不力。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #6：忽略人脈網絡</p>
              <p className="text-muted-foreground">依靠線上申請。解決方案：70-80% 的工作通過人脈網填補，在需要之前開始建立人脈網。通過內部推薦來到招募人員桌上的候選人比冷申請者領先 10 倍。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">陷阱 #7：太快放棄</p>
              <p className="text-muted-foreground">在它有時間奏效之前放棄轉換。解決方案：為試點階段設定現實的時間框架（3-6 個月，不是 2 週），將早期失敗視為學習，而不是最終答案。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Special Situations */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            特殊情況的轉換
          </h2>

          <div className="space-y-8">
            {/* After Layoff */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">裁員後的轉換</h3>
              <p className="text-foreground mb-4">被裁員實際上可能是轉換的好時機 — 如果你策略性地處理它。</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
                  <p className="text-gold mb-2">為什麼裁員可以幫助：</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• 遣散費給你跑道</li>
                    <li>• 你有時間進行深度掃描和試點</li>
                    <li>• 心理上更容易證明改變的合理性</li>
                    <li>• 你已經「在市場上」</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-muted-foreground mb-2">要避免的陷阱：</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• 恐慌並接受第一個 offer</li>
                    <li>• 跳過試點階段因為你「需要」工作</li>
                    <li>• 在沒有策略的情況下做出反應性的轉換</li>
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground italic text-sm">從招募人員的角度：被裁員的候選人如果他們能展示他們在過渡期間做了什麼（課程、試點、自由職業、技能建設），實際上可以更具吸引力。它顯示主動性。</p>
            </div>

            {/* Mid-Career */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">中年職業轉換</h3>
              <p className="text-foreground mb-4">在你的 40 多歲或 50 多歲轉換有獨特的挑戰和優勢。</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-semibold mb-2">挑戰：</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• 年齡歧視（真實的，即使是非法的）</li>
                    <li>• 更多的財務責任</li>
                    <li>• 可能需要降低薪水</li>
                    <li>• 感覺「太晚了」的心理障礙</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">優勢：</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• 幾十年的可轉移技能</li>
                    <li>• 已建立的人脈網絡</li>
                    <li>• 財務穩定（如果你一直在儲蓄）</li>
                    <li>• 知道你的價值觀和你想要什麼的清晰度</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* During Parenthood */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">父母身份期間的轉換</h3>
              <p className="text-foreground mb-4">有年幼孩子的父母面臨額外的限制，但轉換仍然可能。</p>
              
              <ul className="space-y-2 text-foreground mb-4">
                <li>• 延長時間線（12-18 個月的試點而不是 6 個月）</li>
                <li>• 運行非常小的、低承諾的試點</li>
                <li>• 與伴侶協調以創造試點時間</li>
                <li>• 考慮兼職或諮詢角色作為過渡</li>
              </ul>

              <p className="text-muted-foreground italic text-sm">許多成功的轉換發生在育兒假期間或當一個伴侶承擔更多家務時。創造力和靈活性是關鍵。</p>
            </div>

            {/* International */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">國際轉換</h3>
              <p className="text-foreground mb-4">移動到新國家為職業轉換增加了複雜性。</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-semibold mb-2">額外因素：</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• 簽證和工作授權</li>
                    <li>• 語言障礙</li>
                    <li>• 憑證可能不轉移</li>
                    <li>• 人脈網從零開始</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">策略：</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• 從內部轉移開始（如果你在跨國公司）</li>
                    <li>• 針對有國際曝光的角色</li>
                    <li>• 在移動前建立人脈網</li>
                    <li>• 考慮語言作為技能差距來彌合</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Conversations for Leaders */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            為領導者：促進職涯對話
          </h2>

          <p className="text-foreground mb-6">如果你是經理或領導者，幫助你的團隊成長，即使這意味著他們可能離開。</p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">每季度職涯對話框架：</h3>
            <ul className="space-y-2 text-foreground">
              <li>• 你最享受什麼工作？</li>
              <li>• 什麼讓你筋疲力盡？</li>
              <li>• 你想發展什麼技能？</li>
              <li>• 你在 1-2 年內看到自己在哪裡？</li>
              <li>• 我如何支持你的成長？</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-3">為什麼這有效：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 建立信任和忠誠</li>
                <li>• 減少意外辭職</li>
                <li>• 幫助識別延伸任務和內部轉換</li>
                <li>• 創造一個人們想留下的環境</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-3">內部試點機會：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 輪調計劃（3-6 個月）</li>
                <li>• 跨職能專案團隊</li>
                <li>• 延伸任務在舒適區之外</li>
                <li>• 內部教學或培訓機會</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-8 text-center">
            快速參考：轉換方法
          </h2>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🌱 階段 1：種植 — 設定你的基礎</h3>
              <InteractiveChecklist guideKey="pivot_ref_plant_zh" lang="zh" variant="dark" items={[
                { label: "校準指南針：定義價值觀、快樂公式、不可妥協事項" },
                { label: "定下目標：從現在起一年的願景" },
                { label: "為引擎加油：識別優勢、什麼有效" },
                { label: "資助你的跑道：建立 3-6 個月的儲蓄" },
              ]} />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🔍 階段 2：掃描 — 收集情報</h3>
              <InteractiveChecklist guideKey="pivot_ref_scan_zh" lang="zh" variant="dark" items={[
                { label: "加強你的替補席：擴展人脈網，找到顧問" },
                { label: "彌合差距：評估所需技能，創建學習計劃" },
                { label: "讓自己可被發現：建立能見度，讓人們知道你在探索" },
              ]} />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🧪 階段 3：試點 — 在承諾前測試</h3>
              <InteractiveChecklist guideKey="pivot_ref_pilot_zh" lang="zh" variant="dark" items={[
                { label: "運行小實驗：低風險、低成本測試" },
                { label: "數量勝過質量：運行 5-10 個試點" },
                { label: "暫停和審查：什麼有效？什麼無效？" },
              ]} />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🚀 階段 4：啟動 — 做出舉動</h3>
              <InteractiveChecklist guideKey="pivot_ref_launch_zh" lang="zh" variant="dark" items={[
                { label: "定義標準：在你啟動之前什麼必須是真的？" },
                { label: "先建立，勇氣第二" },
                { label: "將決定與對話分開" },
              ]} />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🎯 階段 5：領導 — 幫助他人轉換</h3>
              <InteractiveChecklist guideKey="pivot_ref_lead_zh" lang="zh" variant="dark" items={[
                { label: "分享你的故事：教授你學到的東西" },
                { label: "實踐職涯因果報應：給予介紹、反饋、支持" },
              ]} />
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            從你所在的地方開始
          </h2>
          <p className="text-foreground mb-4">
            你不需要把一切都弄清楚才能開始。你不需要完美的條件。你不需要知道整個路徑。
          </p>
          
          <div className="bg-card border border-border rounded-lg p-6 text-left mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• <strong>如果你受僱且不確定：</strong>從種植開始。明確你的指南針和願景。</li>
              <li>• <strong>如果你知道你想去哪裡：</strong>進入掃描。建立人脈網，彌合技能差距。</li>
              <li>• <strong>如果你已經做了研究：</strong>運行試點。用真實實驗測試你的假設。</li>
              <li>• <strong>如果你已經測試和驗證：</strong>檢查你的啟動標準。你準備好行動了嗎？</li>
              <li>• <strong>如果你已經成功轉換：</strong>領導。幫助他人度過他們的轉換。</li>
            </ul>
          </div>

          <p className="text-xl font-heading text-gold mb-6">
            唯一重要的動作是你的下一步。
          </p>
          <p className="text-muted-foreground italic">
            不是五年後的完美職業。你的下一步。你的是什麼？
          </p>
        </div>
      </section>

      <GuideShareButtons isZhTw />

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 bg-nav-green">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/zh-tw" className="font-heading text-lg font-medium text-cream">
              JAMES BUGDEN
            </Link>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/jamesbugden/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/jamesbugden/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://www.threads.net/@jamesbugden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="Threads"
              >
                <ThreadsIcon />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-cream/50 text-sm">
            © {new Date().getFullYear()} James Bugden. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PivotMethodGuideZhTw;
