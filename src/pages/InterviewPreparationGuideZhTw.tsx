import { ArrowLeft, Target, Lightbulb, MessageSquare, AlertTriangle, CheckCircle2, Calendar, HelpCircle, BookOpen, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";

const InterviewPreparationGuideZhTw = () => {
  useTrackGuideProgress("interview-full");
  const navigate = useNavigate();


  return (
      <div className="min-h-screen bg-background">
        <SEO />
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
              onClick={() => navigate("/interview-preparation-guide")}
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
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            面試準備完整指南
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            停止焦慮。開始表現。拿到工作。
          </p>
          <p className="text-base text-cream/60 mb-2">
            作者：James Bugden，Uber 資深招募專員
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">45 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            框架來源：本指南基於 Sam Owens 的《我討厭求職面試：停止壓力，開始表現，拿到你想要的工作》方法論，並結合我在 500+ 次招募和 20,000+ 份履歷審核中累積的內部招募知識進行改編。
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            前言：為什麼大多數人面試失敗
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            我經歷過面試桌的兩邊。
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            我在職涯早期曾經面試慘敗。現在我作為招募人員已經雇用了 500+ 人。
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            我學到的是：<span className="text-gold font-semibold">最好的求職者不會拿到工作。最會面試的人才會拿到工作。</span>
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            這對你來說是好消息。
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            如果你準備得更充分，你可以打敗更有資格的求職者。大多數人準備不足。
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            他們為面試準備 1-2 小時，準備錯誤的東西，然後想知道為什麼沒有拿到 offer。
          </p>
          <p className="text-xl md:text-2xl font-heading text-gold">
            面試是一種技能。你可以學會它。本指南會告訴你怎麼做。
          </p>
        </div>
      </section>

      {/* Kill These Lies */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            先破除這些謊言
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            讓我們摧毀那些阻礙你面試成功的迷思。
          </p>
          
          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">「做你自己就好」</p>
              <p className="text-muted-foreground">
                哪個自己？那個整個週末狂看 Netflix 的自己？你有多個自己。做你準備最充分的那個自己。
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">「不知道問題就無法準備」</p>
              <p className="text-muted-foreground">
                錯了。面試問題有 5 種主要類型。你可以為所有類型做準備。
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">「面試官都是專家」</p>
              <p className="text-muted-foreground">
                大多數招募主管零訓練。他們也在即興發揮。而且，大多數人除了看你的履歷外，不會為面試做任何準備。
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">「我輸了因為有人更有資格」</p>
              <p className="text-muted-foreground">
                是的，這種情況會發生。我們無法改變你與其他人相比有多合格，但我們可以盡最大努力準備，以獲得最高的成功機會。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Hour Framework Overview */}
      <section className="py-8 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
            10 小時準備框架
          </h2>
          <p className="text-cream/80 mb-4">
            大多數求職者花 1 小時準備。你即將花 10 小時。這就是你的優勢。
          </p>
        </div>
      </section>

      {/* Framework Breakdown */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Target className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">研究</h3>
              <p className="text-gold font-semibold mb-3">3 小時</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1 小時：公司基本資訊</li>
                <li>• 2 小時：與員工進行資訊性訪談</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Lightbulb className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">制定</h3>
              <p className="text-gold font-semibold mb-3">3 小時</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1 小時：創建 7-10 個有力範例</li>
                <li>• 2 小時：為不同問題類型建立框架</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <MessageSquare className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">練習</h3>
              <p className="text-gold font-semibold mb-3">4 小時</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1-2 小時：獨自大聲練習</li>
                <li>• 2 小時：有反饋的模擬面試</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center text-foreground">
            為一份你將每週花 40+ 小時、持續數年的工作準備 10 小時？<span className="text-gold font-semibold">是的，我知道這很難，但請去做。</span>
          </p>
        </div>
      </section>

      {/* Part 1: Research Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">第一部分：研究階段</h2>
            </div>
          </div>

          {/* Company Research */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">公司研究</span>（1 小時）
            </h3>
            <p className="text-foreground mb-4">在你走進去之前，你需要知道：</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>公司歷史：</strong>他們從哪裡來，要往哪裡去</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>使命和價值觀：</strong>這些會出現在你的答案中</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>財務狀況：</strong>營收、利潤、成長軌跡（除非是財務職位，否則只需基本了解）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>產品/服務：</strong>如果可以，實際使用產品</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>最新消息：</strong>他們現在發生什麼事？</span>
              </li>
            </ul>
            <p className="text-muted-foreground italic">
              大部分資訊都在他們的網站、維基百科或最新新聞文章上。
            </p>
          </div>

          {/* Inside Information */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">內部資訊</span>（2 小時）- 你的秘密武器
            </h3>
            <p className="text-foreground mb-4">
              這是區分好求職者和優秀求職者的關鍵。<span className="font-semibold text-gold">與實際在那裡工作的人交談。</span>
            </p>
            
            <h4 className="font-semibold text-foreground mb-3">你會得到：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Google 無法給你的真實見解</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">可以在面試中提到的名字（讓公司內部的人為你背書）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">團隊實際面臨的問題</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">內部術語（他們在公司使用的行話顯示你了解他們）</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">如何進行這些對話：</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>在 LinkedIn 上搜尋 1st/2nd 度連結</li>
              <li>發訊息：「嗨 [名字]，我正在面試 [公司] 的 [職位]。可以佔用你 15 分鐘嗎？」</li>
              <li>問好問題（見下方）</li>
              <li>做筆記</li>
              <li>發送感謝</li>
            </ol>

            <p className="text-muted-foreground mb-4 italic">
              注意：如果你認識在公司工作的人或朋友的朋友，用這種方式與他們交談。
            </p>

            <h4 className="font-semibold text-foreground mb-3">要問什麼：</h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">文化真的是什麼樣子？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">這個職位的成功是什麼樣子？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">團隊面臨哪些挑戰？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">你希望在開始之前就知道什麼？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">對面試者有什麼建議？</span>
              </li>
            </ul>

            <p className="text-muted-foreground italic">
              做 2-3 次這樣的對話。你會被拒絕很多次嗎？會的。但你只需要與一個人交談就能獲得內部資訊。
            </p>
          </div>
        </div>
      </section>

      {/* Part 2: Formulation Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">第二部分：制定階段</h2>
            </div>
          </div>

          {/* Power Examples */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
              創建你的有力範例（7-10 個故事）
            </h3>
            <p className="text-foreground mb-4">
              有力範例 = 證明你能做這份工作的故事。它們是你每個答案的基礎。
            </p>

            <h4 className="font-semibold text-foreground mb-3">如何選擇：</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>閱讀職位描述</li>
              <li>找出他們想要的前 7-10 項技能</li>
              <li>為每項技能配對一個故事</li>
            </ol>

            <h4 className="font-semibold text-foreground mb-3">故事來源：</h4>
            <ul className="space-y-2 mb-6 text-foreground">
              <li>• 以前的工作（最佳）</li>
              <li>• 學校專案</li>
              <li>• 志工工作</li>
              <li>• 副業專案</li>
              <li>• 任何你做過相關工作的地方</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">好的有力範例是：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">具體的（「2024 年 3 月，領導 5 人團隊」而不是「我經常與團隊合作」）</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">量化的（數字、指標、結果）</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">最近的（過去 2-3 年）</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">關於你的（不只是「團隊」）</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">壞的有力範例：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">「我是個好的溝通者」</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">「我們增加了銷售」（誰是我們？）</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">模糊、沒有數字、沒有具體內容</span>
              </li>
            </ul>
          </div>

          {/* Example Power Stories */}
          <div className="space-y-6 mb-10">
            <h4 className="font-heading text-lg text-gold">有力故事範例</h4>
            
            {/* Story 1 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">有力故事範例 #1：領導力</h5>
              <p className="text-sm text-muted-foreground mb-3">技能：團隊領導和專案管理</p>
              <p className="text-foreground text-sm mb-3">
                「在 2024 年第二季，我領導一個由 5 名工程師和 2 名設計師組成的跨職能團隊，推出新的行動應用程式功能。我們有緊迫的 6 週期限。我組織每日站會，創建共享專案追蹤器，並為每個里程碑分配明確的負責人。
              </p>
              <p className="text-foreground text-sm mb-3">
                當我們在第 4 週遇到技術障礙時，我重新安排任務優先順序，並引入一位資深工程師來解除障礙。我們準時推出，該功能在第一個月內將用戶參與度提高了 35%。」
              </p>
              <p className="text-gold text-sm italic">為什麼有效：具體時間、明確數字、展示領導行動、量化結果。</p>
            </div>

            {/* Story 2 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">有力故事範例 #2：問題解決</h5>
              <p className="text-sm text-muted-foreground mb-3">技能：分析思維和數據分析</p>
              <p className="text-foreground text-sm mb-3">
                「在我上一家公司，客戶支援成本年增 40%，但沒人知道原因。我調取了 6 個月的工單數據，發現 60% 的工單是關於相同的 3 個問題。
              </p>
              <p className="text-foreground text-sm mb-3">
                我創建了一個簡單的知識庫，提供這 3 個問題的解決方案，並在產品介面添加連結。在 3 個月內，支援工單下降了 28%，每年為公司節省約 45,000 美元。該知識庫至今仍在使用。」
              </p>
              <p className="text-gold text-sm italic">為什麼有效：識別具體問題、展示分析方法、具體財務影響、持久解決方案。</p>
            </div>

            {/* Story 3 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">有力故事範例 #3：溝通/利害關係人管理</h5>
              <p className="text-sm text-muted-foreground mb-3">技能：與困難的利害關係人合作</p>
              <p className="text-foreground text-sm mb-3">
                「我在管理一個行銷活動時，最大的客戶突然要求我們在推出前 1 週改變整個創意方向。設計團隊很沮喪，因為他們已經完成工作。
              </p>
              <p className="text-foreground text-sm mb-3">
                我沒有立即反駁，而是安排與客戶通話以了解他們的擔憂。我發現他們收到了 CEO 的負面反饋。我與團隊合作創建 3 個新選項，既解決了 CEO 的反饋，又保留了 70% 的原始工作。
              </p>
              <p className="text-foreground text-sm mb-3">
                我們展示了所有選項，客戶選擇了一個，我們準時交付。他們在下一季將合約價值增加了 30%。」
              </p>
              <p className="text-gold text-sm italic">為什麼有效：展示外交手腕、壓力下解決問題、採取的具體行動、商業成果。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Question Frameworks */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            第三部分：問題框架
          </h2>
          <p className="text-foreground mb-6">
            現在你有了有力範例，讓我們學習如何針對不同問題類型部署它們。
          </p>

          <div className="bg-background border border-border rounded-lg p-5 mb-8">
            <h4 className="font-semibold text-foreground mb-3">應該準備多少範例？</h4>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>行為問題（SPAR）：</strong>準備 7-10 個故事（你的有力範例）</li>
              <li>• <strong>情境問題（Home Base）：</strong>練習 5-7 種不同的框架/方法</li>
              <li>• <strong>關於你的問題（SEE）：</strong>你會重複使用行為故事，只需重新框架</li>
            </ul>
            <p className="text-gold mt-4 font-semibold">
              這個系統的優點：你不需要 50 個不同的故事。你的 7-10 個有力範例可以回答大多數問題。
            </p>
          </div>

          {/* Framework 1: SPAR */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              框架 #1：SPAR 模型（用於行為問題）
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              行為問題詢問你過去的經驗：「告訴我一次當...的時候」、「給我一個...的例子」、「描述一個...的情況」
            </p>
            <p className="text-foreground mb-4">使用 SPAR：<strong>情境、問題、行動、結果</strong></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">S</span>
                <span className="text-foreground"><strong>情境</strong>（10-15 秒）：設定場景。保持簡短。不要在這裡浪費時間。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">P</span>
                <span className="text-foreground"><strong>問題</strong>（15-20 秒）：製造張力。這是讓人想繼續聽的原因。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">A</span>
                <span className="text-foreground"><strong>行動</strong>（60-90 秒）：這是核心。解釋你做了什麼（不是你的團隊）。使用「三法則」- 將你的行動分解為 3 個步驟。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">R</span>
                <span className="text-foreground"><strong>結果</strong>（15-20 秒）：量化成果。做個總結。</span>
              </li>
            </ul>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">範例：</p>
              <p className="text-sm text-muted-foreground italic mb-2">問題：「告訴我一次你解決複雜問題的經驗。」</p>
              <p className="text-foreground text-sm mb-2">
                <strong>情境：</strong>「去年在我上一家公司，我是數位行銷客戶的客戶經理。」
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>問題：</strong>「幾個月後，我老闆要求我找出哪些客戶對我們最有價值。我們以前從未做過這個，而且沒有明確的『價值』定義。」
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>行動：</strong>「我用三個步驟處理這個問題。首先，我創建了一個包含三個指標的評分卡：營收、獲利能力和可信度分數。其次，我計算每個客戶花費的時間並創建效率比率。第三，我向領導層展示我的發現並提出建議。」
              </p>
              <p className="text-foreground text-sm">
                <strong>結果：</strong>「我們調整策略，專注於影響力最大的客戶。六個月後，我們從這些客戶那裡的營收增長了 25%，這對公司當年的成長做出了重大貢獻。」
              </p>
            </div>
          </div>

          {/* Framework 2: Home Base */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              框架 #2：Home Base 模型（用於情境問題）
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              情境問題是假設性的：「你會如何處理...？」、「如果...你會怎麼做？」、「你會如何應對...？」
            </p>
            <p className="text-foreground mb-4">這些是最難的問題，因為它們完全開放。</p>
            <p className="text-foreground mb-4">使用 Home Base 模型：<strong>建立、探索、總結</strong></p>

            <div className="bg-card border border-border rounded p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4 font-medium text-center">
                視覺指南：Home Base 模型
              </p>
              
              {/* Visual Diagram */}
              <div className="flex flex-col items-center py-4">
                {/* PATH 1 - Top */}
                <div className="flex flex-col items-center mb-2">
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">路徑 1</p>
                    <p className="text-muted-foreground text-xs">（具體想法）</p>
                  </div>
                </div>
                
                {/* Vertical connector */}
                <div className="w-0.5 h-6 bg-gold/40"></div>
                
                {/* Middle row: PATH 2 - HOME BASE - PATH 3 */}
                <div className="flex items-center justify-center gap-0 w-full max-w-lg">
                  {/* PATH 2 */}
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">路徑 2</p>
                    <p className="text-muted-foreground text-xs">（具體想法）</p>
                  </div>
                  
                  {/* Horizontal connector left */}
                  <div className="h-0.5 w-8 md:w-12 bg-gold/40"></div>
                  
                  {/* HOME BASE - Center */}
                  <div className="bg-executive-green border-2 border-gold rounded-lg px-5 py-3 text-center shadow-lg">
                    <p className="text-gold font-bold text-base">HOME BASE</p>
                    <p className="text-cream/80 text-xs">（基礎）</p>
                  </div>
                  
                  {/* Horizontal connector right */}
                  <div className="h-0.5 w-8 md:w-12 bg-gold/40"></div>
                  
                  {/* PATH 3 */}
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">路徑 3</p>
                    <p className="text-muted-foreground text-xs">（具體想法）</p>
                  </div>
                </div>
                
                {/* Vertical connector */}
                <div className="w-0.5 h-6 bg-gold/40"></div>
                
                {/* PATH 4 - Bottom */}
                <div className="flex flex-col items-center mt-2">
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">路徑 4</p>
                    <p className="text-muted-foreground text-xs">（具體想法）</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-foreground text-center mt-4">
                把它想像成一個中心輻射系統：<span className="text-gold font-semibold">HOME BASE</span> = 你的中心框架/方法，<span className="text-gold font-semibold">路徑</span> = 從你的框架延伸出來的具體想法
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-foreground mb-2">步驟 1：建立你的 Home Base（20-30 秒）</p>
                <p className="text-foreground mb-2">從框架或方法開始。這是你的「地圖」。</p>
                <ul className="text-foreground text-sm ml-4">
                  <li>• 「我會分三個階段處理...」</li>
                  <li>• 「我會看四個關鍵領域...」</li>
                  <li>• 「我的流程包括三個步驟...」</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground">步驟 2：探索每條路徑（每條 60-90 秒）</p>
                <p className="text-foreground">逐一檢視框架的每個部分。添加細節。展示你的思考。</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">步驟 3：總結（15-20 秒）</p>
                <p className="text-foreground">做個總結。重申你的框架。</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">範例：</p>
              <p className="text-sm text-muted-foreground italic mb-2">問題：「你會如何處理這個職位的前 90 天？」</p>
              <p className="text-foreground text-sm mb-2">
                <strong>建立：</strong>「我會將前 90 天分為三個階段：學習、貢獻和擴展。」
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>探索：</strong>「在學習階段（前 30 天），我會與關鍵利害關係人會面，了解當前流程，並確定快速勝利的機會。在貢獻階段（第 31-60 天），我會執行這些快速勝利以建立可信度，並開始承擔更大的專案。在擴展階段（第 61-90 天），我會開始實施更大的計劃，並思考長期策略。」
              </p>
              <p className="text-foreground text-sm">
                <strong>總結：</strong>「所以總結一下：學習、貢獻、擴展。這就是我會如何安排我的第一季。」
              </p>
            </div>
          </div>

          {/* Framework 3: SEE */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              框架 #3：SEE 模型（用於「關於你」的問題）
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              這些問題詢問你的特質：「你最大的弱點是什麼？」、「我們為什麼應該雇用你？」、「你的工作風格是什麼？」
            </p>
            <p className="text-foreground mb-4">使用 SEE：<strong>陳述、例子、效果</strong></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">S</span>
                <span className="text-foreground"><strong>陳述：</strong>直接說。不要迴避。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">E</span>
                <span className="text-foreground"><strong>例子：</strong>給一個具體實例。</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">E</span>
                <span className="text-foreground"><strong>效果：</strong>解釋為什麼這對這個職位很重要。</span>
              </li>
            </ul>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">範例：</p>
              <p className="text-sm text-muted-foreground italic mb-2">問題：「你最大的弱點是什麼？」</p>
              <p className="text-foreground text-sm mb-2">
                <strong>陳述：</strong>「我傾向於承擔太多，因為我很難說不。」
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>例子：</strong>「上季，我同時同意了三個主要專案，最後工作到深夜才能滿足所有截止日期。」
              </p>
              <p className="text-foreground text-sm">
                <strong>效果：</strong>「我學會了更策略性地承諾。現在我會根據當前工作量和工作影響來評估新請求。對於這個職位，這意味著我會專注於影響力最大的專案，而不是讓自己過於分散。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 4: Handling Difficult Questions */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">第四部分：處理困難問題</h2>
          </div>

          {/* Weakness Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">弱點問題</h3>
            <p className="text-foreground mb-4">
              不要說「我是完美主義者」或「我工作太努力」。
            </p>
            <p className="text-foreground mb-4">選擇一個真實的弱點：</p>
            <ol className="list-decimal list-inside text-foreground mb-4 space-y-1">
              <li>不會讓你失去資格</li>
              <li>你正在積極改善</li>
              <li>顯示自我意識</li>
            </ol>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-muted-foreground mb-2">模板：</p>
              <p className="text-foreground italic mb-3">
                「我 [弱點]，導致 [後果]。我通過 [行動] 來改善這一點。我已經看到 [進展]。」
              </p>
              <p className="text-sm text-muted-foreground mb-2">範例：</p>
              <p className="text-foreground text-sm">
                「我傾向於一次承擔太多，這導致我上季錯過了一個截止日期。現在我在承諾之前會根據當前工作量評估新請求。上個月我提前完成了三個主要專案。」
              </p>
            </div>
          </div>

          {/* Salary Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">薪資問題</h3>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="font-semibold text-foreground mb-2">如果他們先問：</p>
                <p className="text-foreground">
                  「我正在尋找這個職位和市場的有競爭力的薪酬。你們預算的範圍是多少？」
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="font-semibold text-foreground mb-2">如果你必須給數字：</p>
                <p className="text-foreground">
                  根據市場研究給一個範圍，並說「取決於完整的薪酬套餐」。
                </p>
              </div>
            </div>
          </div>

          {/* Gap Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">空窗期問題</h3>
            <p className="text-foreground mb-4">誠實但簡短。不要過度解釋。</p>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-foreground italic">
                「我休息是為了 [原因]。在那段時間我 [通過...保持敏銳]。現在我準備好重新投入。」
              </p>
            </div>
          </div>

          {/* Illegal/Inappropriate Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">非法/不當問題</h3>
            <p className="text-foreground mb-4">
              有些面試官會問非法問題（年齡、婚姻狀況、宗教等）。選項：
            </p>
            <ol className="list-decimal list-inside text-foreground space-y-2">
              <li><strong>重新導向：</strong>「這與職位有什麼具體關係嗎？」</li>
              <li><strong>禮貌拒絕：</strong>「我更願意專注於我的職位資格。」</li>
              <li><strong>如果無害且你不在意就回答</strong></li>
            </ol>
          </div>

          {/* Weird Questions */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">奇怪的問題</h3>
            <p className="text-foreground mb-4">
              有些面試官會問古怪的問題（「如果你是動物...」）。他們想看你如何思考。
            </p>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-muted-foreground mb-2">模板：回答 +「因為」+（可選）與工作連結</p>
              <p className="text-foreground italic">
                「我會是黃金獵犬，因為我渴望取悅他人並與他人合作良好。這也是我在工作中處理團隊合作的方式。」
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 5: Your Questions to Ask */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            第五部分：你要問的問題
          </h2>
          <p className="text-foreground mb-6">
            總是準備 3-5 個問題。這是你面試他們的機會。
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">讓你看起來很好的問題：</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「這個職位在前 6 個月的成功是什麼樣子？」</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「團隊目前面臨的最大挑戰是什麼？」</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「你會如何描述這裡的文化？」</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「你最喜歡在這裡工作的什麼？」</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">「你的管理風格是什麼？」（如果問招募主管）</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-destructive mb-4">不要問的問題：</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">任何你可以 Google 到的（顯示你沒準備）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">「這家公司做什麼？」（認真的，別問）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">只問福利/假期的問題（看起來你只關心福利）</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Part 6: The Practice Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">第六部分：練習階段</h2>
            </div>
          </div>

          <p className="text-xl text-gold font-semibold mb-6">
            這是 90% 求職者放棄的地方。不要成為他們。
          </p>

          {/* Phase 1 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">階段 1：</span>朗讀（30-60 分鐘）
            </h3>
            <p className="text-foreground mb-2">大聲說出你的答案。</p>
            <p className="text-muted-foreground italic">你會聽到什麼是尷尬的。現在修正它。</p>
          </div>

          {/* Phase 2 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">階段 2：</span>記憶（60-90 分鐘）
            </h3>
            <p className="text-foreground">學習你的框架和故事。</p>
          </div>

          {/* Phase 3 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">階段 3：</span>模擬面試（2-3 小時）
            </h3>
            <p className="text-gold font-semibold mb-4">這是最重要的部分。</p>
            <p className="text-foreground mb-4">找人來面試你。可以是：</p>
            <ul className="text-foreground mb-6 space-y-1">
              <li>• 朋友</li>
              <li>• 同事</li>
              <li>• 職業教練（最佳）</li>
              <li>• 你的配偶</li>
              <li>• AI</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">模擬面試規則：</h4>
            <ol className="list-decimal list-inside text-foreground space-y-2 mb-6">
              <li>把它當真的</li>
              <li>中途不要停止回答</li>
              <li>反饋只在最後給</li>
              <li>至少做 2 次</li>
            </ol>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-gold font-semibold mb-2">為什麼練習有效：</p>
              <p className="text-foreground">
                它在弱點讓你失去工作之前揭露它們。那個尷尬的停頓？現在修正它，而不是在真正的面試中。大多數求職者跳過這一步。這就是你的優勢。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 7: Interview Day */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">第七部分：面試當天</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試前</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">提前 10-15 分鐘到達（不多不少）</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">關掉手機</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">上廁所</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">最後複習一次你的有力範例</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">做 3 次深呼吸：吸氣 1 秒，呼氣 4 秒，重複</span>
                </li>
              </ul>
            </div>

            {/* During */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試期間</h3>
              <p className="text-sm font-semibold text-foreground mb-2">第一印象技巧：</p>
              <ul className="space-y-2 mb-4 text-sm text-foreground">
                <li>• 有力的握手</li>
                <li>• 眼神接觸</li>
                <li>• 微笑</li>
                <li>• 配合他們的能量水平</li>
              </ul>
              <p className="text-sm font-semibold text-foreground mb-2">在問題期間：</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• 在回答前暫停 2-4 秒（顯示你在思考）</li>
                <li>• 如果你不理解，請他們澄清</li>
                <li>• 可以說「這是個好問題，讓我想一下」</li>
                <li>• 注意參與度線索（點頭、身體前傾）</li>
              </ul>
            </div>
          </div>

          {/* Body Language */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">肢體語言</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>坐直</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>不要交叉手臂</span>
                </li>
              </ul>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>自然使用手勢</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>保持 70-80% 的時間眼神接觸</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Closing */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">結束</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">問你的問題</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">重申你的興趣：「我對這個職位非常感興趣，很想繼續推進」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">詢問下一步</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-heading text-xl text-gold mb-4">面試後</h3>
            <p className="text-foreground mb-4">在 24 小時內發送感謝郵件。</p>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">模板：</p>
              <p className="text-foreground text-sm mb-2">嗨 [名字]，</p>
              <p className="text-foreground text-sm mb-2">
                感謝您今天抽出時間與我討論 [職位] 職位。
              </p>
              <p className="text-foreground text-sm mb-2">
                我非常喜歡了解 [他們提到的具體事情]，我對 [你會做出的具體貢獻] 的機會感到興奮。
              </p>
              <p className="text-foreground text-sm mb-2">[可選：提及你們連結的個人話題]</p>
              <p className="text-foreground text-sm mb-2">期待聽到下一步的消息。</p>
              <p className="text-foreground text-sm">最好的祝福，<br />[你的名字]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              導致失去 Offer 的常見錯誤
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>說太多</strong> - 回答問題。然後停止。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>批評前雇主</strong> - 保持外交。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒有具體例子</strong> - 一切都需要細節。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>不問問題</strong> - 顯示你不在乎。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒有跟進</strong> - 發送感謝郵件。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>撒謊</strong> - 他們會發現。別這樣做。</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒準備就出現</strong> - 如果你不在乎準備，他們就不會在乎雇用。</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">快速參考速查表</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Pre-Interview */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試前檢查清單</h3>
              <InteractiveChecklist
                guideKey="interview_prep_pre_zh"
                lang="zh"
                items={[
                  { label: "研究公司（1 小時）" },
                  { label: "資訊性訪談（2 小時）" },
                  { label: "創建 7-10 個有力範例（1 小時）" },
                  { label: "準備 SPAR 故事（1 小時）" },
                  { label: "準備情境框架（1 小時）" },
                  { label: "大聲練習（1 小時）" },
                  { label: "模擬面試 #1（1 小時）" },
                  { label: "模擬面試 #2（1 小時）" },
                  { label: "準備要問的問題（30 分鐘）" },
                  { label: "計劃服裝（15 分鐘）" },
                ]}
              />
            </div>

            {/* Day-Of */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">當天檢查清單</h3>
              <InteractiveChecklist
                guideKey="interview_prep_dayof_zh"
                lang="zh"
                items={[
                  { label: "複習有力範例" },
                  { label: "提前 10-15 分鐘到達" },
                  { label: "手機靜音" },
                  { label: "帶列印的履歷" },
                  { label: "帶筆記本" },
                  { label: "微笑並保持眼神接觸" },
                ]}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Online Interviews */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">線上面試</h3>
              <InteractiveChecklist
                guideKey="interview_prep_online_zh"
                lang="zh"
                items={[
                  { label: "測試網路連接" },
                  { label: "音訊" },
                  { label: "視訊" },
                  { label: "背景無雜物" },
                  { label: "確保你在安靜的地方" },
                  { label: "攝影機應與你的臉齊平" },
                ]}
              />
            </div>

            {/* Post-Interview */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試後檢查清單</h3>
              <InteractiveChecklist
                guideKey="interview_prep_post_zh"
                lang="zh"
                items={[
                  { label: "在 24 小時內發送感謝郵件" },
                  { label: "記下什麼做得好/需要改進" },
                  { label: "如果在他們的時間表內沒有回應就跟進" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-6">
            我的最後想法
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            我見過非常有才華的人面試慘敗。很多時候是因為他們沒準備或沒有得到如何在面試中表現的反饋。
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            我見過普通求職者拿到 offer。他們做好準備出現。
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            面試是一種技能。練習讓你變得更好。
          </p>
          <p className="text-xl md:text-2xl text-gold font-heading">
            使用這份指南。做那 10 小時。看著你的面試表現轉變。
          </p>
        </div>
      </section>

      {/* Book Attribution */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground italic">
            本指南基於 Sam Owens 的《我討厭求職面試》方法論，我根據作為資深招募專員的招募經驗進行了改編。請支持作者並購買他的書以了解其框架背後的完整背景。這是我讀過最好的面試準備指南。
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            來源：Owens, Sam. "I Hate Job Interviews: Stop Stressing, Start Performing, Get the Job You Want." HarperCollins Leadership, 2024.
          </p>
        </div>
      </section>


      <GuideShareButtons isZhTw />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default InterviewPreparationGuideZhTw;