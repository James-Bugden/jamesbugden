import { ArrowLeft, Users, Target, FileText, MessageSquare, Search, CheckCircle2, Calendar, Linkedin, TrendingUp, Briefcase, Award, Eye, Zap, BarChart3, UserPlus, Settings, HelpCircle, BookOpen, Rocket, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";

const LinkedInBrandingGuideZhTw = () => {
  useTrackGuideProgress("linkedin-brand");
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
              onClick={() => navigate("/linkedin-branding-guide")}
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
              <Linkedin className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            LinkedIn 求職者必讀：別再投履歷，讓機會主動上門
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            招募人員的戰術指南
          </p>
          <p className="text-base text-cream/60 mb-2">
            作者：James Bugden，資深招募顧問
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">30 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Framework Note / Foreword */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-xl md:text-2xl text-foreground mb-4">前言</h2>
          <p className="text-sm md:text-base text-muted-foreground mb-4">
            這份指南從一個審閱過 20,000 多份履歷、在 Uber 和 Netskope 等公司錄用過 500 多人的人的視角，分解了 Sandra Long 的 LinkedIn 個人品牌框架。我在總結這本書的同時，也加入了自己的想法和行動計劃。
          </p>
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            根據 Sandra Long 的《LinkedIn 個人品牌終極指南》改編。Sandra Long 是 LinkedIn 專家、TEDx 演講者和 Post Road Consulting 的創辦人。她在 LinkedIn 上的個人品牌框架已經幫助數千名專業人士找到更好的工作、完成更多銷售，並建立蓬勃發展的諮詢業務。這本書成為亞馬遜國際暢銷書第一名，因為它超越了基本的「操作指南」建議，進入策略性定位。
          </p>
        </div>
      </section>

      {/* What is Personal Branding */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            什麼是個人品牌？
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            個人品牌是積極管理你的形象並定義你的獨特價值。這是關於展示你最好的真實自我，而不是創造一個虛假的人格。
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            Tom Peters 在 1997 年寫了《品牌叫做你》：「我們是自己公司的執行長：Me Inc.」他走在時代的前面。今天，在 LinkedIn 上建立個人品牌對專業成功至關重要。
          </p>
          <p className="text-base md:text-lg text-foreground mb-6">
            現實是這樣的：<span className="text-gold font-semibold">無論你是否積極管理它，你的品牌聲譽都存在。問題是：你會控制敘事，還是讓別人定義你？</span>
          </p>

          {/* What it's not / what it is */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">個人品牌不是什麼：</h3>
              <ul className="space-y-2 text-muted-foreground">
                <li>• 創造虛假或誇大的人格</li>
                <li>• 過度推銷或銷售導向</li>
                <li>• 複製別人的聲音或風格</li>
                <li>• 一旦「完成」個人檔案就保持靜態</li>
                <li>• 只適用於高階主管或企業家</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">個人品牌是什麼：</h3>
              <ul className="space-y-2 text-foreground">
                <li>• 展示你最好的真實自我</li>
                <li>• 策略性地定位你的獨特價值</li>
                <li>• 成為脫穎而出的「橘色魚」（不只是另一條藍魚）</li>
                <li>• 你專業身份的不斷演進表現</li>
                <li>• 對職業發展、銷售和思想領導力至關重要</li>
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">「橘色魚」原則</h3>
          <p className="text-foreground mb-4">
            這本書的封面顯示數百條藍魚朝一個方向游泳，而一條橘色魚朝自己的方向游泳。
          </p>
          <p className="text-foreground mb-4">
            大多數 LinkedIn 個人檔案看起來都一樣：職稱、公司名稱、職責。這就是當一條藍魚。你的目標是成為橘色魚：令人難忘、與眾不同、引人注目。
          </p>
          <p className="text-foreground mb-4">
            我不是說要華而不實或不專業。但你的「特殊醬汁」應該閃耀出來。
          </p>
          <p className="text-muted-foreground italic">
            當我在 Uber 篩選候選人時，藍魚都模糊在一起。橘色魚得到面試機會。
          </p>
        </div>
      </section>

      {/* Why LinkedIn Matters */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">為什麼 LinkedIn 品牌現在很重要</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">7 億</p>
              <p className="text-muted-foreground">全球用戶，每秒 2 個新用戶加入</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">5000 萬+</p>
              <p className="text-muted-foreground">每天被查看的個人檔案</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">65%</p>
              <p className="text-muted-foreground">專業人士認為線上印象與見面一樣重要</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">87%</p>
              <p className="text-muted-foreground">招募人員使用 LinkedIn 評估候選人</p>
            </div>
          </div>

          <p className="text-foreground mb-4">
            大多數人不了解的是：第一印象現在發生在你走進門或拿起電話<em>之前</em>。當我有 10 個候選人適合一個職位時，我會先查看他們所有的 LinkedIn 個人檔案。那些擁有強大個人品牌的人立即脫穎而出。
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">招募人員的真相：</strong>我可以在查看你的個人檔案的 6 秒內判斷你是一個認真的候選人還是只是另一份履歷。你的 LinkedIn 品牌要麼為你 24/7 工作，要麼每天都在讓你失去機會。
            </p>
          </div>
        </div>
      </section>

      {/* Six Opportunities - Expanded */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-4 text-center">
            LinkedIn 創造的六個機會
          </h2>
          <p className="text-center text-muted-foreground mb-8">強大的 LinkedIn 存在解鎖了六個核心機會：</p>

          {/* 1. Career */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">1. 職業機會</h3>
            </div>
            <p className="text-foreground mb-3">無論你是在積極找工作還是在滿意的工作中，你的 LinkedIn 個人檔案都會影響你的職業軌跡。</p>
            <p className="text-foreground mb-3"><strong className="text-gold">招募人員現實：</strong>87% 的招募人員使用 LinkedIn 來評估候選人。如果你不在 LinkedIn 上或你的個人檔案很弱，你對你想要的工作是隱形的。</p>
            <p className="text-foreground mb-3">我曾有候選人告訴我他們「沒在找工作」，所以不需要更新 LinkedIn。這是倒退的思維。最好的機會來自於你<em>不在</em>找工作的時候，但前提是你的個人檔案能吸引它們。</p>
            <h4 className="font-semibold text-foreground mb-2">有效的做法：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 講述清晰的進步和影響故事的個人檔案</li>
              <li>• 具體的指標和成就（不只是職責）</li>
              <li>• 與招募人員搜尋的關鍵字匹配</li>
              <li>• 驗證你技能的推薦</li>
            </ul>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm italic">
                <strong>範例故事：</strong>Sarah 在同一家公司工作了 8 年。她沒有找工作，但她用最近專案的具體指標更新了她的 LinkedIn 個人檔案。在 2 週內，三位招募人員聯繫她，提供比她目前薪水高 30-40% 的機會。其中一個成為她的新職位。她永遠不會冷申請這些工作，是它們找到她的。
              </p>
            </div>
          </div>

          {/* 2. Sales */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">2. 銷售機會</h3>
            </div>
            <p className="text-foreground mb-3">對於業務員、顧問、律師和企業主來說，LinkedIn 是一個潛在客戶金礦。</p>
            <p className="text-foreground mb-3">在潛在客戶接聽你的電話或同意見面之前，他們會在 LinkedIn 上查找你。如果你的個人檔案很弱或很籠統，你已經失去了信譽。</p>
            <h4 className="font-semibold text-foreground mb-2">潛在客戶想看到的：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 產業專業知識和內幕知識</li>
              <li>• 社會證明（來自滿意客戶的推薦）</li>
              <li>• 思想領導力（展示專業知識的貼文和文章）</li>
              <li>• 清晰的價值主張（你如何幫助客戶，而不只是你銷售什麼）</li>
            </ul>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-muted-foreground text-sm italic">
                <strong>範例故事：</strong>Albert 是一位財務顧問，與客戶關係很好，但幾乎沒有 LinkedIn 存在。當他最好的客戶試圖將他推薦給一個高淨值潛在客戶時，潛在客戶在 Google 上搜尋 Albert，發現了一個空洞的 LinkedIn 個人檔案。推薦沒有發生。Albert 用客戶推薦、市場見解和他的投資理念更新了他的個人檔案。幾個月內，推薦增加了 40%。
              </p>
            </div>
          </div>

          {/* 3. Thought Leadership */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">3. 思想領導機會</h3>
            </div>
            <p className="text-foreground mb-3">思想領導是新的行銷。如果你想被視為專家、演講者、作者或產業領袖，LinkedIn 是必不可少的。</p>
            <h4 className="font-semibold text-foreground mb-2">它如何運作：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 會議組織者在 LinkedIn 上搜尋演講者</li>
              <li>• 媒體透過 LinkedIn 找到專家</li>
              <li>• 潛在客戶在雇用前驗證專業知識</li>
              <li>• 產業同行連接和協作</li>
            </ul>
            <p className="text-foreground mb-3">LinkedIn 的演算法青睞來自個人的原創內容勝過公司貼文。如果你持續分享有價值的見解，你會建立一個將你視為專家的受眾。</p>
            <p className="text-muted-foreground italic">從我的經驗來看：在我開始定期在 LinkedIn 上發文之前，我必須追逐演講機會。在建立一致的內容存在（每週發文 3-5 次）之後，活動組織者和公司開始聯繫我。從「推」到「拉」行銷的轉變是戲劇性的。</p>
          </div>

          {/* 4. Social Proof */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">4. 社會證明</h3>
            </div>
            <p className="text-foreground mb-3">人們根據別人說的話對你形成意見。LinkedIn 提供多種方式來展示社會證明：</p>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• <strong>推薦</strong>：來自同事、經理或客戶的書面推薦</li>
              <li>• <strong>認可</strong>：對你技能的快速驗證</li>
              <li>• <strong>參與度</strong>：對你貼文的評論和反應顯示人們重視你的見解</li>
              <li>• <strong>人脈網</strong>：你與誰連接標誌著你的專業水準</li>
              <li>• <strong>證書和資格</strong>：專業知識的第三方驗證</li>
            </ul>
            <p className="text-muted-foreground italic">招募人員對社會證明的看法：當我在兩個相似的候選人之間做決定時，我總是檢查他們的推薦和認可。強大的社會證明可以成為決勝點。來自知名人士或公司的推薦具有額外的分量。</p>
          </div>

          {/* 5. Partnership */}
          <div className="bg-card border border-border rounded-lg p-6 mb-6">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">5. 合作夥伴和協作機會</h3>
            </div>
            <p className="text-foreground mb-3">LinkedIn 將你與潛在的商業夥伴、聯合創辦人、董事會成員和協作者連接起來。</p>
            <h4 className="font-semibold text-foreground mb-2">合作夥伴關係如何形成：</h4>
            <ul className="space-y-1 text-foreground">
              <li>• 你人脈網中的某人看到一篇貼文並想「我應該把他們介紹給 X」</li>
              <li>• 產業同行透過搜尋找到你並聯繫</li>
              <li>• 共同聯繫人促成溫暖的介紹</li>
              <li>• 你的專業知識對潛在合作夥伴變得可見</li>
            </ul>
          </div>

          {/* 6. Credibility */}
          <div className="bg-card border border-border rounded-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <Eye className="w-8 h-8 text-gold" />
              <h3 className="font-heading text-lg text-foreground">6. 信譽和名氣</h3>
            </div>
            <p className="text-foreground mb-3">擁有強大的 LinkedIn 存在讓你以好的方式「可以被 Google 到」。當有人搜尋你的名字時，你的 LinkedIn 個人檔案（通常是最高結果）要麼驗證你的專業知識，要麼引發問題。</p>
            <h4 className="font-semibold text-foreground mb-2">信譽堆疊：</h4>
            <ol className="space-y-1 text-foreground list-decimal list-inside">
              <li>專業個人檔案照片</li>
              <li>清晰、引人注目的標題</li>
              <li>講述你故事的豐富關於區塊</li>
              <li>包含成就的詳細經歷</li>
              <li>推薦和認可</li>
              <li>積極參與（貼文、文章、評論）</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Personal Brand Framework - Expanded */}
      <section id="brand" className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">個人品牌框架</h2>
          </div>
          <p className="text-foreground mb-8">LinkedIn 個人品牌的方法有幾個核心組成部分。讓我們系統地分解它們。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 1：了解你的受眾</h3>
          <p className="text-foreground mb-4">在你在 LinkedIn 上寫下任何字之前，你需要知道：<strong>誰將閱讀你的個人檔案，你希望他們做什麼？</strong></p>
          <h4 className="font-semibold text-foreground mb-2">潛在受眾：</h4>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• 招募經理和招募人員</li>
            <li>• 潛在客戶或顧客</li>
            <li>• 產業同行和思想領袖</li>
            <li>• 合作夥伴或投資者</li>
            <li>• 會議組織者和媒體</li>
            <li>• 你自己的人脈網（用於推薦）</li>
          </ul>
          <p className="text-foreground mb-4"><strong>我的建議：</strong>列出你的前 3 個目標受眾。然後問：什麼會讓每個受眾想要聯繫我？</p>
          <div className="bg-background border border-border rounded-lg p-4 mb-8">
            <p className="text-foreground text-sm"><strong>範例：</strong></p>
            <ul className="text-foreground text-sm space-y-1 mt-2">
              <li>• <strong>受眾 1</strong>：財富 500 強公司的科技招募人員</li>
              <li>• <strong>我希望他們做什麼</strong>：聯繫關於資深工程領導職位</li>
              <li>• <strong>他們需要看到的</strong>：技術深度、領導經驗、影響指標</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 2：定義你的獨特價值</h3>
          <p className="text-foreground mb-4">你不只是一個職稱。你擁有獨特的組合：技能和專業知識、個性和溝通風格、價值觀和你關心的事、經驗和背景、觀點和見解。</p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-4">
            <p className="text-foreground font-semibold mb-2">個人品牌方程式：</p>
            <p className="text-gold font-heading text-lg">你的獨特價值 = 技能 + 個性 + 觀點 + 證明</p>
          </div>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• <strong>技能</strong>：你在技術上擅長什麼</li>
            <li>• <strong>個性</strong>：你如何出現並與他人合作</li>
            <li>• <strong>觀點</strong>：來自你經驗的獨特見解</li>
            <li>• <strong>證明</strong>：驗證以上所有內容的證據</li>
          </ul>
          <p className="text-muted-foreground italic mb-8">從我的招募經驗來看：獲得最佳職位的候選人並不總是技能最強的，他們是那些能清楚地表達他們獨特價值的人。他們在我還沒問之前就回答了「為什麼我們應該僱用你？」</p>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 3：真實</h3>
          <p className="text-foreground mb-4">你想對自己、你的技能和你的個性保持真實。這更多的是展示或證明你最好的真實自我，而不是創造任何新東西。</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-2">真實性不意味著：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 過度分享個人細節</li>
                <li>• 不專業</li>
                <li>• 忽視受眾需求</li>
                <li>• 拒絕策略性定位</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <p className="text-gold mb-2">真實性意味著：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 你的 LinkedIn 聲音與你實際溝通的方式相符</li>
                <li>• 你突出真正的優勢（不是誇大的）</li>
                <li>• 你的範例和故事是真實的</li>
                <li>• 你的價值觀閃耀出來</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground italic">
            蘇斯博士說得最好：「今天你就是你，這比真實更真實。沒有人活著比你更像你。」想想：「我會如何在產業會議上介紹自己？」這就是你的 LinkedIn 聲音。
          </p>
        </div>
      </section>

      {/* Profile Sections - Expanded */}
      <section id="profile" className="py-12 md:py-16 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn 個人檔案：逐段分析</h2>
          </div>
          <p className="text-foreground mb-8">讓我們在考慮策略定位的情況下走過每個個人檔案區塊。我會在整個過程中加入招募見解。</p>

          {/* Headline */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">標題</span>（70-90 字元）
            </h3>
            <p className="text-foreground mb-4">這是你整個個人檔案上最重要的地產。它出現在搜尋結果、當你評論貼文時、當你發送聯絡請求時、在「誰查看了你的個人檔案」頁面上。</p>
            
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-muted-foreground mb-2">❌ 大多數人浪費了它：</p>
              <p className="text-foreground">「Google 的軟體工程師」或「行銷經理 | MBA」</p>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
              <p className="text-gold mb-2">✅ 更好的做法：</p>
              <p className="text-foreground">「幫助 SaaS 公司從 100 萬美元擴展到 1000 萬美元以上的年經常性收入 | 成長行銷領導者 | 前 Google、Meta」</p>
            </div>

            <p className="text-foreground font-semibold mb-2">公式：</p>
            <p className="text-gold mb-4">[獨特價值] | [關鍵技能/專業知識] | [信譽標記]</p>

            <p className="text-foreground mb-3"><strong className="text-gold">招募人員的觀點：</strong>當我搜尋候選人時，我首先瀏覽標題。好的標題讓我點擊。籠統的標題讓我跳到下一個人。</p>

            <h4 className="font-semibold text-foreground mb-3">更多範例：</h4>
            <ul className="space-y-2 text-foreground mb-4">
              <li>• <strong>與其說</strong>：「ABC 公司的銷售經理」 → <strong>不如試試</strong>：「為企業 SaaS 公司推動 40% 的年度收入成長 | 銷售領導力」</li>
              <li>• <strong>與其說</strong>：「自由設計師」 → <strong>不如試試</strong>：「為有意識的公司創造大膽的品牌識別 | 品牌 + 網頁設計師」</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">關鍵原則：</h4>
            <ol className="space-y-1 text-foreground list-decimal list-inside mb-4">
              <li>以價值或結果為主，而非職稱</li>
              <li>使用招募人員搜尋的關鍵字</li>
              <li>包括信譽標記（公司名稱、證書、結果）</li>
              <li>具體，而不是籠統</li>
              <li>隨著你的焦點演變而更新它</li>
            </ol>

            <p className="text-muted-foreground italic">行動步驟：寫 5 個不同的標題選項，然後與值得信賴的同事一起測試它們。哪一個讓他們最想了解更多？</p>
          </div>

          {/* Profile Photo & Banner */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">個人照片與背景橫幅</span>
            </h3>
            <p className="text-foreground mb-4">你的個人照片是你的「視覺品牌」— 人們注意到的第一件事。</p>
            
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
                <p className="text-gold mb-2">✅ 什麼有效：</p>
                <ul className="space-y-1 text-foreground text-sm">
                  <li>• 專業但平易近人</li>
                  <li>• 高品質，不模糊</li>
                  <li>• 最近的（2 年內）</li>
                  <li>• 適合你產業的著裝</li>
                  <li>• 良好的照明，簡單的背景</li>
                  <li>• 照片中只有你一個人</li>
                  <li>• 微笑或溫暖的表情</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground mb-2">❌ 什麼不行：</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• 休閒度假照片</li>
                  <li>• 團體照（你是哪一個？）</li>
                  <li>• 太陽眼鏡或帽子遮住臉</li>
                  <li>• 過度濾鏡或編輯</li>
                  <li>• 超過 10 年前的照片</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-4">
              <p className="text-foreground">
                <strong className="text-gold">招募人員現實：</strong>有專業照片的個人檔案獲得 14 倍的瀏覽量和 36 倍的訊息。如果你沒有照片，我會認為你對 LinkedIn 不認真。
              </p>
            </div>

            <h4 className="font-semibold text-foreground mb-3">背景橫幅（1584 x 396 像素）</h4>
            <p className="text-foreground mb-2">大多數人忽略這個。不要。這是免費的廣告牌空間。</p>
            <ul className="space-y-1 text-foreground text-sm mb-4">
              <li>• 你的公司標誌或品牌</li>
              <li>• 包含你的標語或價值主張的設計</li>
              <li>• 代表你的產業或專業知識的圖片</li>
              <li>• 來自你工作的專業攝影</li>
              <li>• 包含聯絡資訊或網站的文字覆蓋</li>
            </ul>
            <p className="text-muted-foreground italic">我使用的：我的橫幅包括我的標語（「幫助國際專業人士在財富 500 強公司找到 15 萬美元以上的職位」）、我的網站和微妙的品牌。每次有人查看我的個人檔案時，它都會強化我的定位。</p>
          </div>

          {/* About Section - Expanded */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">關於區塊</span>（800-1,200 字元）
            </h3>
            <p className="text-foreground mb-4">這是你講述故事的機會。大多數人寫無聊的工作描述。你應該寫引人注目的敘事。</p>
            
            <h4 className="font-semibold text-foreground mb-3">結構：</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">開場鉤子（前 2-3 句）</p>
                  <p className="text-muted-foreground text-sm">這些在手機上「查看更多」之前顯示。讓它們有價值。以你的獨特價值主張、一個引人注目的問題、或一個意想不到的陳述開始。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">你的故事（中間部分）</p>
                  <p className="text-muted-foreground text-sm">你如何到達現在的位置、什麼驅動你、塑造你專業知識的關鍵經驗、你的方法或哲學。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">你提供的（下一部分）</p>
                  <p className="text-muted-foreground text-sm">你幫助人們/公司的具體方式、你的超能力或關鍵優勢、你解決的問題類型。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">行動呼籲（最後部分）</p>
                  <p className="text-muted-foreground text-sm">人們如何與你合作、你對什麼開放（演講、諮詢等）、如何聯繫你。</p>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
              <p className="text-foreground">
                <strong className="text-gold">招募人員的內部觀點：</strong>我閱讀關於區塊以了解某人是否適合我們的文化和職位。我在尋找：溝通技巧（他們能清楚地寫作嗎？）、自我意識（他們了解自己的優勢嗎？）、動機（什麼驅動他們？）、一致性（他們的價值觀與我們的匹配嗎？）。一個很棒的關於區塊讓我<em>想要</em>面試你。一個籠統的區塊讓我繼續前進。
              </p>
            </div>

            {/* Before/After Example */}
            <h4 className="font-semibold text-foreground mb-3">範例轉換：</h4>
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-muted-foreground mb-2">❌ 之前（籠統）：</p>
              <p className="text-foreground text-sm">「我是一名擁有 10 年 B2B SaaS 經驗的行銷專業人士。我在內容行銷、SEO 和需求生成方面擁有專業知識。我熱衷於幫助公司成長。目前正在尋找新機會。」</p>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
              <p className="text-gold mb-2">✅ 之後（引人注目）：</p>
              <p className="text-foreground text-sm mb-2">「大多數 B2B SaaS 公司將內容行銷視為一個複選框。他們發布沒人閱讀的部落格文章，然後納悶為什麼潛在客戶不會實現。</p>
              <p className="text-foreground text-sm mb-2">我採取不同的方法：真正轉換的內容。</p>
              <p className="text-foreground text-sm mb-2">在過去十年中，我已經幫助 30 多家 SaaS 公司透過策略性內容產生 5000 萬美元以上的業務機會。我的專長是將技術產品轉化為與買家產生共鳴的引人注目的故事。</p>
              <p className="text-foreground text-sm mb-2">我的方法有什麼不同：<br/>• 我將內容映射到實際的買家旅程（不只是關鍵字）<br/>• 我訪談客戶以找到真正的痛點（不是假設的）<br/>• 我通過業務機會貢獻來衡量內容（不只是流量）</p>
              <p className="text-foreground text-sm">開放於：早期 B2B SaaS 公司的顧問職位、演講邀約、內容策略諮詢。讓我們連接：[email] 或在這裡給我發訊息。」</p>
            </div>
            <p className="text-foreground mb-4">看到區別了嗎？第一個什麼都沒說。第二個讓我想僱用這個人。</p>

            <h4 className="font-semibold text-foreground mb-3">寫作技巧：</h4>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• 用第一人稱撰寫（「我」而非「他」或「她」）</li>
              <li>• 使用短段落和項目符號以提高可讀性</li>
              <li>• 包括具體的指標和結果</li>
              <li>• 注入個性而不失專業</li>
              <li>• 以清晰的行動呼籲結束</li>
            </ul>
          </div>

          {/* Featured Section */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">精選區塊</span>
            </h3>
            <p className="text-foreground mb-4">這個區塊讓你在個人檔案頂部展示你最好的作品。大多數人忽略它 — 這是個錯誤。</p>
            
            <h4 className="font-semibold text-foreground mb-3">要展示什麼：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 你最好的文章或部落格貼文</li>
              <li>• 媒體報導或新聞報導</li>
              <li>• 案例研究或作品集</li>
              <li>• 演講影片或簡報</li>
              <li>• 推薦信或成功故事</li>
              <li>• 引流磁鐵（白皮書、電子書）</li>
            </ul>
            <p className="text-foreground mb-3"><strong>策略思考：</strong>你想讓人們首先看到什麼？選擇 3-6 件最能展示你專業知識或價值的內容。</p>
            <p className="text-muted-foreground italic">從我的角度來看：當我招募高級職位時，我總是檢查精選區塊。它向我展示某人認為什麼是他們最好的作品。空的精選區塊 = 錯失留下深刻印象的機會。</p>
          </div>

          {/* Experience Section - Expanded */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">經歷區塊</span>
            </h3>
            <p className="text-foreground mb-4">這是大多數人只是複製貼上他們履歷的地方。不要這樣做。</p>
            
            <h4 className="font-semibold text-foreground mb-3">描述公式：</h4>
            <ul className="space-y-2 mb-6 text-foreground">
              <li>• <strong>背景</strong>（1-2 句）：你開始時的情況是什麼？</li>
              <li>• <strong>行動</strong>（2-4 個項目符號）：你做了什麼？</li>
              <li>• <strong>結果</strong>（數字和結果）：你產生了什麼影響？</li>
            </ul>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
              <p className="text-foreground">
                <strong className="text-gold">我在尋找：</strong>範圍（你的責任有多大？）、影響（因為你的工作改變了什麼？）、技能（你展示了什麼能力？）、成長（你有晉升或擴大責任嗎？）
              </p>
            </div>

            {/* Experience Before/After */}
            <h4 className="font-semibold text-foreground mb-3">範例轉換：</h4>
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-muted-foreground mb-2">❌ 之前：</p>
              <p className="text-foreground text-sm font-semibold mb-1">資深軟體工程師 | TechCo <span className="font-normal text-muted-foreground">2019 年 1 月 - 現在</span></p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• 開發和維護後端服務</li>
                <li>• 與跨職能團隊合作</li>
                <li>• 審查代碼並指導初級工程師</li>
                <li>• 參與架構決策</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
              <p className="text-gold mb-2">✅ 之後：</p>
              <p className="text-foreground text-sm font-semibold mb-1">資深軟體工程師 | TechCo <span className="font-normal text-muted-foreground">2019 年 1 月 - 現在</span></p>
              <p className="text-foreground text-sm mb-2">作為最早的 10 名工程師之一加入，從零開始建立 TechCo 的核心平台。將系統擴展到處理每天 1000 萬以上的用戶，同時保持 99.9% 的正常運行時間。</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• 架構微服務基礎設施，將部署時間從 2 小時減少到 15 分鐘，實現 10 倍更快的迭代</li>
                <li>• 領導從單體到微服務的遷移，提前 18 個月完成，零停機時間</li>
                <li>• 指導 8 名初級工程師，其中 3 人在 18 個月內晉升為中級</li>
                <li>• 通過資料庫優化和緩存策略將 P95 延遲降低 60%</li>
              </ul>
              <p className="text-foreground text-sm mt-2"><strong>技術堆疊</strong>：Python、AWS、Kubernetes、PostgreSQL、Redis、Go</p>
            </div>
            <p className="text-foreground mb-4">看到第二個版本如何講述成長、影響和領導力的故事了嗎？這就是讓你獲得面試的原因。</p>

            <h4 className="font-semibold text-foreground mb-3">經歷描述的專業技巧：</h4>
            <ul className="space-y-1 text-muted-foreground text-sm mb-4">
              <li>• 以你最大的成就開頭</li>
              <li>• 盡可能使用具體數字</li>
              <li>• 包含背景（團隊規模、預算、時間表）</li>
              <li>• 突出可轉移的技能</li>
              <li>• 提及與你領域相關的技術或工具</li>
              <li>• 展示角色內的進步</li>
            </ul>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• <strong>對於轉職者</strong>：強調可轉移技能和結果，而不是特定產業的術語。</li>
              <li>• <strong>對於求職者</strong>：反映你感興趣的職位描述中的關鍵字（不要謊報你的經驗）。</li>
              <li>• <strong>對於業務員</strong>：包括配額達成、交易規模、客戶名稱（如果允許）和留存指標。</li>
            </ul>
          </div>

          {/* Education Section */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">教育區塊</span>
            </h3>
            <p className="text-foreground mb-4">不要只是列出你的學位。策略性地使用這個空間。</p>
            
            <h4 className="font-semibold text-foreground mb-3">要包含什麼：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 學位和研究領域</li>
              <li>• 榮譽、獎項或顯著成就</li>
              <li>• 相關課程（特別是對應屆畢業生）</li>
              <li>• 展示領導力的課外活動</li>
              <li>• 論文或主要專案</li>
            </ul>
            <p className="text-foreground mb-3"><strong>專業技巧：</strong>如果你上過知名學校，利用該品牌資產。如果沒有，突出你的教育的獨特之處。</p>

            <div className="bg-background border border-border rounded-lg p-4 mb-4">
              <p className="text-foreground text-sm font-semibold mb-1">範例：</p>
              <p className="text-foreground text-sm font-semibold">MBA | 華頓商學院 <span className="font-normal text-muted-foreground">2018 - 2020</span></p>
              <p className="text-foreground text-sm">專注：創業與金融 GPA：3.8/4.0</p>
              <ul className="text-foreground text-sm space-y-1 mt-1">
                <li>• 華頓創業俱樂部主席（領導 200 多名會員組織）</li>
                <li>• 華頓學者（班級前 10%）</li>
                <li>• 畢業專案：為 A 輪 SaaS 新創公司建立財務模型（公司籌集了 500 萬美元）</li>
              </ul>
            </div>

            <p className="text-muted-foreground italic">招募人員觀點：對於入門級候選人，教育更重要。對於有經驗的專業人士，我在這裡花 5 秒 — 除非你去了史丹佛/MIT 等。</p>
          </div>

          {/* Skills & Endorsements */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">技能與認可</span>
            </h3>
            <p className="text-foreground mb-4">這個區塊部分是關於 SEO（幫助你出現在搜尋中），部分是關於社會證明。</p>
            
            <h4 className="font-semibold text-foreground mb-3">如何優化技能：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 列出你的前 50 項技能（LinkedIn 的最大限制）</li>
              <li>• 把你最重要的技能放在頂部（你可以重新排序）</li>
              <li>• 包含技術和軟技能的組合</li>
              <li>• 使用產業標準術語（人們搜尋的內容）</li>
              <li>• 請同事認可特定技能</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">認可挑戰：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 先認可他人（他們通常會回報）</li>
              <li>• 直接詢問值得信賴的同事</li>
              <li>• 專注於質量而非數量（10 個相關的認可勝過 50 個隨機的）</li>
            </ul>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-foreground">
                <strong className="text-gold">招募人員現實：</strong>我使用技能作為快速篩選器。如果我在招聘 Python 角色，而你沒有在你的前 10 項技能中列出 Python，你可能不是強力匹配。確保你的關鍵技能是可見的並得到認可。
              </p>
            </div>
          </div>

          {/* Recommendations - Expanded */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">推薦</span>
            </h3>
            <p className="text-foreground mb-4">這是 LinkedIn 上最未被充分利用的功能，也是建立信任最強大的功能。</p>
            
            <h4 className="font-semibold text-foreground mb-3">為什麼推薦很重要：</h4>
            <ul className="space-y-1 text-foreground mb-4">
              <li>• 它們比認可更難偽造</li>
              <li>• 它們提供敘述性的社會證明</li>
              <li>• 它們使你的個人檔案令人難忘</li>
              <li>• 它們解決潛在客戶/招募人員可能有的擔憂</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-2">詢問誰：</h4>
            <ul className="space-y-1 text-foreground mb-4 text-sm">
              <li>• 前任經理或高階主管</li>
              <li>• 你幫助過的客戶或顧客</li>
              <li>• 與你密切合作的同事</li>
              <li>• 你指導過的人</li>
              <li>• 商業夥伴或供應商</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-2">何時詢問：</h4>
            <ul className="space-y-1 text-foreground mb-4 text-sm">
              <li>• 在成功完成專案後立即</li>
              <li>• 離開職位時（當它還很新鮮時）</li>
              <li>• 收到讚美或感謝後</li>
              <li>• 每年作為個人檔案維護的一部分</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">如何詢問：</h4>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground mb-2">❌ 不要：</p>
                <p className="text-foreground text-sm">「嘿，你能為我寫一個推薦嗎？」</p>
              </div>
              <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
                <p className="text-gold mb-2">✅ 要：</p>
                <p className="text-foreground text-sm">「嗨 [姓名]，我正在更新我的 LinkedIn 個人檔案，希望你能為我們在 [特定專案] 上的合作寫一個推薦。你願意寫一個簡短的推薦，突出 [特定技能或結果] 嗎？我很樂意提供一些談話要點或為你起草一份供你編輯。」</p>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-3">優秀推薦的公式：</h4>
            <ol className="space-y-2 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">1</span>
                <p className="text-foreground"><strong>背景</strong> — 你們如何認識/一起工作</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">2</span>
                <p className="text-foreground"><strong>具體內容</strong> — 你的工作或影響的具體範例</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">3</span>
                <p className="text-foreground"><strong>技能</strong> — 展示的關鍵優勢或能力</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">4</span>
                <p className="text-foreground"><strong>結果</strong> — 你提供的結果或價值</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">5</span>
                <p className="text-foreground"><strong>認可</strong> — 他們會再次與你合作/推薦你嗎？</p>
              </li>
            </ol>

            <p className="text-foreground mb-3"><strong>互惠：</strong>當有人為你寫推薦時，為他們寫一個。這建立善意，並使未來的請求更容易。</p>
            <p className="text-muted-foreground italic">從我的招募視角：我總是仔細閱讀推薦。它們給我洞察其他人如何看待你、你以什麼聞名、人們是否真正尊重你、以及你的人際關係技能。一個有 5-10 個強有力推薦的個人檔案比一個沒有推薦的個人檔案要可信得多。</p>
          </div>

          {/* Other Profile Sections */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">其他個人檔案區塊</span>
            </h3>
            <div className="grid md:grid-cols-2 gap-3">
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">證書</p>
                <p className="text-muted-foreground text-xs">列出相關的產業證書。對於某些職位（雲端工程、專案管理），這些是基本要求。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">出版物</p>
                <p className="text-muted-foreground text-xs">如果你寫過書籍、研究論文或主要文章，在這裡展示它們。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">專利</p>
                <p className="text-muted-foreground text-xs">對於技術職位，專利展示創新。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">課程</p>
                <p className="text-muted-foreground text-xs">完成的專業發展課程（特別是來自認可機構的）。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">專案</p>
                <p className="text-muted-foreground text-xs">對於自由職業者、顧問或任何建立作品集的人特別有用。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">榮譽與獎項</p>
                <p className="text-muted-foreground text-xs">來自你產業或公司的認可。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">語言</p>
                <p className="text-muted-foreground text-xs">特別是對國際職位相關。</p>
              </div>
              <div className="bg-card border border-border rounded-lg p-3">
                <p className="text-foreground font-semibold text-sm">志願經驗</p>
                <p className="text-muted-foreground text-xs">顯示你的價值觀和社區參與。</p>
              </div>
            </div>
            <p className="text-muted-foreground italic mt-4">我的建議：只包括那些強化你定位的區塊。一個空的「出版物」區塊看起來比根本沒有區塊更糟。</p>
          </div>
        </div>
      </section>

      {/* Content Strategy - Expanded */}
      <section id="content" className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">內容策略：成為思想領袖</h2>
          </div>
          <p className="text-foreground mb-8">這本書專門用五章來討論內容創作。這是 LinkedIn 戲劇性演變的地方，從靜態履歷平台到動態發布平台。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">為什麼在 LinkedIn 上創建內容？</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">可見度</strong> — 你發文越多，你的個人檔案被看到越多</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">權威</strong> — 定期內容建立專業知識</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">機會</strong> — 內容吸引入站機會</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">關係</strong> — 評論和參與建立連接</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">保持在心中</strong> — 你在你的人脈網中保持前沿和中心</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">學習</strong> — 創建內容迫使你澄清你的思維</p>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-4">我的經驗：我主要透過 LinkedIn 內容建立了我的教練業務。在 18 個月內，我透過每週發文 3-5 次從 2,000 名追隨者增加到 22,000 名追隨者。內容吸引了演講邀約、諮詢客戶和 300 多人的課程候補名單。</p>
          <p className="text-foreground mb-8"><strong>複利效應：</strong>早期的貼文可能會獲得 10 個讚。但持續發文會建立動力。你的人脈網成長，參與度增加，最終，貼文可以接觸到數萬人。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 上的內容類型</h3>
          <div className="grid md:grid-cols-2 gap-3 mb-8">
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">1. 文字貼文</p>
              <p className="text-muted-foreground text-xs">最多 1,300 字元。最容易創建，高參與度。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">2. 圖片貼文</p>
              <p className="text-muted-foreground text-xs">在動態中突出。輪播最多 20 張圖片。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">3. 影片貼文</p>
              <p className="text-muted-foreground text-xs">最高參與度。最長 10 分鐘。原生效果更好。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">4. 文章</p>
              <p className="text-muted-foreground text-xs">最多 125,000 字元。被 Google 索引（SEO 好處）。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">5. 文件（PDF）</p>
              <p className="text-muted-foreground text-xs">適合輪播。高度可分享。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">6. 投票</p>
              <p className="text-muted-foreground text-xs">簡單的參與。提供受眾數據。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">7. LinkedIn 直播</p>
              <p className="text-muted-foreground text-xs">即時影片串流。問答、訪談、工作坊。需要申請和批准。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-3">
              <p className="text-foreground font-semibold text-sm">8. LinkedIn 限時動態</p>
              <p className="text-muted-foreground text-xs">24 小時壽命。快速、隨意的更新。適合幕後內容。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">尋找內容想法</h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">來源 1：你的專業知識和經驗</p>
                <p className="text-muted-foreground text-sm">你為客戶解決的問題、從專案中學到的教訓、你觀察到的產業趨勢、錯誤以及你如何克服它們、你使用的框架或流程</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">來源 2：你受眾的問題</p>
                <p className="text-muted-foreground text-sm">潛在客戶經常問的問題、你的產業面臨的挑戰、你反覆看到的誤解、人們在線下問你的主題</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">來源 3：當前事件和趨勢</p>
                <p className="text-muted-foreground text-sm">產業新聞和你的看法、新研究或數據、你參加的會議或活動、季節性主題</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">來源 4：你的內容庫</p>
                <p className="text-muted-foreground text-sm">將部落格文章重新用作 LinkedIn 文章、將簡報轉換為文件輪播、將長篇內容總結為貼文</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">來源 5：他人的內容</p>
                <p className="text-muted-foreground text-sm">分享文章並加上你的評論、回應熱門討論、建立在別人的想法上、尊重地不同意流行意見</p>
              </div>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground font-semibold mb-2">我的內容規劃系統：</p>
            <ul className="text-foreground space-y-1">
              <li>• 週一：產業見解或趨勢分析</li>
              <li>• 週三：實用技巧或操作指南</li>
              <li>• 週五：個人故事或學到的教訓</li>
            </ul>
            <p className="text-foreground mt-2">一致性比完美更重要。每週至少發文 2-3 次。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">撰寫有效的 LinkedIn 貼文</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>鉤子（前 1-2 行）</strong> — 這是人們在點擊「查看更多」之前看到的。讓它引人注目。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>正文</strong> — 講一個故事，分享一個教訓，或提供價值。使用短段落（最多 1-3 句）。包括空白以提高可讀性。加入項目符號或數字以獲得結構。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>行動呼籲</strong> — 問一個問題來推動評論。邀請人們分享他們的經驗。將他們引導到你的個人檔案或網站。</p>
            </div>
          </div>

          <h4 className="font-semibold text-foreground mb-3">強鉤子的範例：</h4>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• 「我剛剛被我真正想要的工作拒絕了。這是我學到的：」</li>
            <li>• 「在審閱了 10,000 份履歷後，我注意到一個預測成功的模式：」</li>
            <li>• 「大多數人在 LinkedIn 上做錯了。這是真正有效的：」</li>
          </ul>

          {/* Example Post */}
          <h4 className="font-semibold text-foreground mb-3">範例貼文結構：</h4>
          <div className="bg-background border border-border rounded-lg p-5 mb-8">
            <p className="text-foreground text-sm mb-3">我昨天拒絕了 20 萬美元的工作機會。</p>
            <p className="text-foreground text-sm mb-3">不是因為錢不好。不是因為公司不令人印象深刻。</p>
            <p className="text-foreground text-sm mb-3">是因為這個職位與我 5 年後想去的地方不一致。</p>
            <p className="text-foreground text-sm mb-3">兩年前，我會立即接受那個 offer。我太專注於爬梯子，以至於忘了問：這個梯子是否靠在正確的牆上？</p>
            <p className="text-foreground text-sm mb-3">這是改變的地方：<br/>• 我弄清楚了我的價值觀（自主權 &gt; 聲望）<br/>• 我定義了成功對我來說是什麼樣子（不是對其他人）<br/>• 我學會了對好機會說不，以便對偉大的機會說是</p>
            <p className="text-foreground text-sm mb-3">最難的部分？告訴招募人員不。最好的部分？對我的決定感到自信。</p>
            <p className="text-foreground text-sm italic">有時正確的舉動不是向上，而是朝著完全不同的方向。</p>
            <p className="text-foreground text-sm mt-3 text-gold">你有沒有拒絕過在紙面上看起來很棒的機會？你的理由是什麼？</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">內容參與策略</h3>
          <p className="text-foreground mb-4">創建內容是戰鬥的一半。參與他人的內容同樣重要。</p>
          <h4 className="font-semibold text-foreground mb-3">每日參與例行公事（15-20 分鐘）：</h4>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• 對來自你人脈網的 10-15 篇貼文做出反應</li>
            <li>• 留下 5-7 個深思熟慮的評論（不只是「很棒的貼文！」）</li>
            <li>• 回應你最近貼文上的所有評論</li>
            <li>• 分享 1-2 篇貼文並加上你自己的評論</li>
          </ul>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <p className="text-gold mb-2">✅ 好評論：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 為對話增加價值</li>
                <li>• 分享個人經驗或觀點</li>
                <li>• 提出深思熟慮的問題</li>
                <li>• 尊重地建立在想法上或挑戰想法</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-2">❌ 壞評論：</p>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 「很棒的貼文！」（空洞的陳詞濫調）</li>
                <li>• 沒有背景的自我推銷</li>
                <li>• 沒有實質內容的不同意</li>
                <li>• 離題的切線</li>
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 上的影片內容</h3>
          <p className="text-foreground mb-4">影片是最高參與度的內容類型，但大多數人避免它。不要這樣。</p>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">為什麼影片有效：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 更快建立個人連接</li>
                <li>• 演算法偏好原生影片</li>
                <li>• 競爭較少</li>
                <li>• 展示溝通技巧</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">影片想法：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 快速提示（30-60 秒）</li>
                <li>• 回答常見問題的問答</li>
                <li>• 你工作的幕後花絮</li>
                <li>• 客戶推薦或案例研究</li>
                <li>• 對產業新聞的反應</li>
              </ul>
            </div>
          </div>
          <h4 className="font-semibold text-foreground mb-3">影片技巧：</h4>
          <ul className="space-y-1 text-foreground text-sm mb-4">
            <li>• 撰寫大綱，但不要逐字閱讀</li>
            <li>• 使用良好的照明（自然光效果很好）</li>
            <li>• 保持簡短（理想情況下不到 3 分鐘）</li>
            <li>• 包括字幕（70% 的人在沒有聲音的情況下觀看）</li>
            <li>• 在前 3 秒加入鉤子</li>
          </ul>
          <p className="text-muted-foreground italic mb-8">克服影片不情願：從螢幕錄製開始（不那麼令人生畏）。在發布我的第一個影片之前練習了 10 次。提醒自己：完成比完美更好。在發布 5-6 個影片後，它變得容易得多。參與度比文字貼文高 3 倍。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 文章 vs 貼文</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">何時撰寫文章：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 深入探討複雜主題</li>
                <li>• 想在 Google 搜尋中排名</li>
                <li>• 建立內容庫</li>
                <li>• 建立全面的專業知識</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">何時撰寫貼文：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 更快創建</li>
                <li>• 更及時或反應性的內容</li>
                <li>• 想要更高的即時參與度</li>
                <li>• 在撰寫長篇之前測試想法</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground italic">我的混合方法：我為常青主題撰寫文章，然後創建連結回這些文章的貼文。這推動了對文章的流量，同時保持我的動態活躍。</p>
        </div>
      </section>

      {/* Algorithm & Visibility */}
      <section id="algorithm" className="py-12 md:py-16 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn 演算法：如何被看見</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">演算法優先事項：</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground"><strong>停留時間</strong> — 人們花多少時間閱讀你的貼文</span></li>
            <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground"><strong>參與度</strong> — 讚、評論、分享和點擊</span></li>
            <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground"><strong>相關性</strong> — 你的內容與觀看者感興趣的內容匹配程度</span></li>
            <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground"><strong>新鮮度</strong> — 較新的貼文獲得初始提升</span></li>
            <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground"><strong>作者信譽</strong> — SSI 較高的個人檔案獲得更多覆蓋</span></li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">如何針對演算法優化：</h3>
          <div className="space-y-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">創建值得參與的內容：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 在貼文結尾提出問題</li>
                <li>• 採取強硬（但不是兩極分化的）立場</li>
                <li>• 分享脆弱或個人故事</li>
                <li>• 提供意想不到的見解</li>
                <li>• 使用模式中斷（令人驚訝的事實、違反直覺的建議）</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">鼓勵有意義的評論：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 在第一個小時內回應每條評論</li>
                <li>• 提出後續問題</li>
                <li>• 在評論中標記相關人員</li>
                <li>• 從親密聯繫人那裡獲得早期評論</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">策略性地使用主題標籤：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 最多 3-5 個主題標籤</li>
                <li>• 混合流行和利基主題標籤</li>
                <li>• 創建你自己的品牌主題標籤</li>
                <li>• 研究你的受眾關注什麼</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <p className="text-foreground">
              <strong className="text-gold">「黃金時段」：</strong>發文後的前 60 分鐘至關重要。如果你的貼文立即獲得強勁的參與度，LinkedIn 會向更多人展示它。如果參與度很弱，覆蓋率就會受到限制。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">最佳發文時間：</h3>
          <ul className="space-y-2 text-foreground mb-4">
            <li>• 週二至週四是最強的日子</li>
            <li>• 上午 8-10 點和中午 12-2 點（在你受眾的時區）</li>
            <li>• 避免週末發布 B2B 內容</li>
          </ul>
          <p className="text-muted-foreground italic">我的發文策略：在我的人脈網活躍時的上午 8 點發文。有 3-4 個親密聯繫人準備立即參與。在第一個小時內回應所有評論。將貼文分享到相關群組。</p>
        </div>
      </section>

      {/* LinkedIn Networking - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <UserPlus className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn 社交：建立有意義的聯繫</h2>
          </div>
          <p className="text-foreground mb-6">你的 LinkedIn 人脈網只有在它是策略性的和參與的時候才有價值。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">聯繫策略</h3>
          <p className="text-foreground mb-4"><strong className="text-gold">質量勝過數量：</strong>500 個隨機聯繫不如 200 個策略性聯繫有價值。</p>
          <h4 className="font-semibold text-foreground mb-2">與誰聯繫：</h4>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• 你曾與之共事的人（同事、客戶、合作夥伴）</li>
            <li>• 在你的目標產業或職位中的人</li>
            <li>• 你關注和參與的思想領袖</li>
            <li>• 來自會議或活動的參與者</li>
            <li>• 你學校的校友</li>
            <li>• 參與你內容的人</li>
          </ul>

          <h4 className="font-semibold text-foreground mb-3">聯繫請求公式：</h4>
          <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
            <p className="text-foreground text-sm mb-2"><strong>永遠個性化。</strong>不要使用預設的「我想將你加入我的人脈網」。</p>
            <p className="text-foreground text-sm italic">
              「嗨 Sarah，我看到你對 Michael 關於遠端工作政策的貼文的評論，真的很欣賞你對異步溝通的看法。我也在產品管理領域，想與你聯繫。我一直在我的公司處理類似的挑戰。謝謝！James」
            </p>
          </div>

          <h4 className="font-semibold text-foreground mb-2">何時發送聯繫請求：</h4>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• 在活動中見面後（24 小時內）</li>
            <li>• 在多次參與他們的內容後</li>
            <li>• 當你有來自共同聯繫人的溫暖介紹時</li>
            <li>• 申請前研究公司時</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4 mt-8">關注 vs. 聯繫</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">關注</p>
              <p className="text-muted-foreground text-sm">看到他們的內容，他們看不到你的，沒有直接訊息存取</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">聯繫</p>
              <p className="text-muted-foreground text-sm">相互關係，雙方都看到內容，可以直接發訊息</p>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-8">聰明的策略：關注你欽佩但不認識的思想領袖。與你有真正關係或想建立關係的人聯繫。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 群組</h3>
          <p className="text-foreground mb-4">群組未被充分利用，但對利基社交很有價值。</p>
          <h4 className="font-semibold text-foreground mb-2">群組參與策略：</h4>
          <ol className="space-y-1 text-foreground list-decimal list-inside mb-4">
            <li>加入 5-10 個相關群組</li>
            <li>每週在每個群組中花 10 分鐘</li>
            <li>評論討論</li>
            <li>分享有價值的內容（不是自我推銷）</li>
            <li>回答問題以展示專業知識</li>
          </ol>
          <p className="text-muted-foreground italic">我的經驗：我在 8 個與招募、人力資源和職業發展相關的群組中。我每週發布有用的內容並在可以增加價值時回答問題。這導致了演講機會和諮詢客戶。</p>
        </div>
      </section>

      {/* Advanced Strategies - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Settings className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">進階 LinkedIn 策略</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">社交銷售指數（SSI）</h3>
          <p className="text-foreground mb-4">LinkedIn 根據四個因素計算社交銷售指數分數（0-100）：</p>
          <ol className="space-y-2 text-foreground list-decimal list-inside mb-4">
            <li><strong>建立你的專業品牌</strong>：完整的個人檔案、發布的內容</li>
            <li><strong>找到合適的人</strong>：有效使用搜尋和推薦</li>
            <li><strong>參與見解</strong>：分享和創建內容</li>
            <li><strong>建立關係</strong>：增長你的人脈網並培養聯繫</li>
          </ol>
          <p className="text-foreground mb-4"><strong>檢查你的 SSI：</strong>linkedin.com/sales/ssi</p>
          <p className="text-foreground mb-8"><strong>為什麼 SSI 很重要：</strong>較高的 SSI 與更好的搜尋可見度和內容覆蓋率相關。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn Premium：值得嗎？</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">誰受益於 Premium：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 積極尋找潛在客戶的銷售專業人士</li>
                <li>• 尋找候選人的招募人員</li>
                <li>• 申請許多職位的求職者</li>
                <li>• 業務發展或合作夥伴職位</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">誰不需要 Premium：</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 擁有強大有機人脈網的人</li>
                <li>• 定期發布內容的人（用於可見度）</li>
                <li>• 不積極尋找潛在客戶或找工作的專業人士</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-8">我的看法：我在建立業務時使用了 2 年的 Premium。它對 InMail 和個人檔案查看很有價值。現在我的有機覆蓋率很強，我不需要它。但對於剛開始或處於積極銷售模式的人來說，它可能很有價值。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 分析：追蹤什麼</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">個人檔案分析：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 個人檔案查看趨勢</li>
                <li>• 搜尋出現次數（你在哪些關鍵字上排名？）</li>
                <li>• 誰在查看你的個人檔案（他們是你的目標受眾嗎？）</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">內容分析：</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 曝光次數（有多少人看到你的貼文）</li>
                <li>• 參與率（讚 + 評論 + 分享 / 曝光次數）</li>
                <li>• 追隨者成長</li>
                <li>• 點擊率（對於帶連結的貼文）</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-8">我如何使用分析：每週檢視以查看哪些內容引起共鳴。加倍投入獲得高參與度的主題。根據受眾活躍時間調整發文時間。追蹤哪些貼文推動個人檔案訪問或網站點擊。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">公司和員工的 LinkedIn</h3>
          <p className="text-foreground mb-4"><strong>員工倡導優勢：</strong>員工貼文獲得的參與度比公司頁面貼文高 8 倍。聰明的公司利用這一點。</p>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• 鼓勵員工優化個人檔案</li>
            <li>• 為員工 LinkedIn 活動創建指南</li>
            <li>• 分享公司內容供員工放大</li>
            <li>• 認可建立強大個人品牌的員工</li>
          </ul>
          <p className="text-muted-foreground italic">從我在 Uber 的招募角度來看：我們鼓勵員工分享公司內容並談論他們的工作。這使招募更容易，因為候選人看到的是真實的人，而不只是企業訊息。</p>
        </div>
      </section>

      {/* Common Mistakes - Expanded to 8 */}
      <section id="mistakes" className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            常見的 LinkedIn 錯誤（以及如何避免它們）
          </h2>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #1：將 LinkedIn 視為履歷</p>
              <p className="text-muted-foreground">履歷是用於申請的。LinkedIn 是用於吸引的。像你在喝咖啡時告訴同事你的工作一樣寫作。包括指標、故事和個性。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #2：沒有策略</p>
              <p className="text-muted-foreground">沒有策略，LinkedIn 變成噪音。定義你的目標（求職、銷售、思想領導），識別目標受眾，在個人檔案和內容中創建一致的定位。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #3：過度推銷</p>
              <p className="text-muted-foreground">遵循 80/20 規則。80% 的增值內容（有用、教育性、娛樂性），20% 的促銷性。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #4：不一致的活動</p>
              <p className="text-muted-foreground">LinkedIn 演算法青睞一致的用戶。每週至少發文 2-3 次。一致性勝過完美。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #5：忽視參與</p>
              <p className="text-muted-foreground">社交媒體是社交的。回應你貼文上的每條評論。每天花 15-20 分鐘參與他人的內容。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #6：籠統內容</p>
              <p className="text-muted-foreground">「週一快樂！希望每個人都有美好的一週！」— 籠統的貼文沒有提供任何價值。具體。從你的經驗中分享獨特的見解。採取立場。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #7：沒有行動呼籲</p>
              <p className="text-muted-foreground">突然結束的貼文錯過了加深參與的機會。以問題、連結到你的個人檔案/網站或明確的聯繫邀請結束貼文。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #8：過時的個人檔案</p>
              <p className="text-muted-foreground">每季更新個人檔案。加入新成就，更新關於區塊，請求新推薦。</p>
            </div>
          </div>
        </div>
      </section>

      {/* LinkedIn for Job Seekers - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Briefcase className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">求職者的 LinkedIn：內部招募技巧</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">針對招募人員搜尋進行優化</h3>
          <p className="text-foreground mb-3"><strong>招募人員如何搜尋：</strong>使用關鍵字的布林搜尋、地點/產業/公司/工作年資的過濾器、技能和職稱。</p>
          <h4 className="font-semibold text-foreground mb-2">如何被找到：</h4>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• 包括所有相關職稱（目前和目標）</li>
            <li>• 使用產業標準術語（不是你公司的內部職稱）</li>
            <li>• 列出所有相關技能（你可以有多達 50 個）</li>
            <li>• 在經歷描述中提及目標公司或競爭對手</li>
            <li>• 包括地點（如果靈活，願意搬遷）</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4 mt-8">「開放工作」功能</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <p className="text-gold mb-2">優點：</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 向招募人員表明你在積極尋找</li>
                <li>• 增加招募人員搜尋中的可見度</li>
                <li>• 可以按特定類型的職位進行過濾</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-muted-foreground mb-2">缺點：</p>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• 你目前的雇主可能會看到它</li>
                <li>• 如果過度使用可能表示絕望</li>
              </ul>
            </div>
          </div>
          <p className="text-foreground mb-8"><strong>我的建議：</strong>如果你失業或你的求職是已知的，使用它。如果你在被動尋找或需要謹慎，不要使用它。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">透過 LinkedIn 申請工作</h3>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• 調整你的 LinkedIn 標題/關於區塊以匹配職位</li>
            <li>• 申請前參與公司的內容</li>
            <li>• 與員工聯繫（不要立即聯繫招募經理）</li>
            <li>• 包括個性化的求職信</li>
            <li>• 用訊息跟進招募人員或招募經理</li>
          </ul>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">招募人員現實：</strong>我可以看到誰透過 LinkedIn 申請，我會檢查他們的個人檔案。強大的個人檔案讓你獲得電話篩選。弱的個人檔案即使有好的履歷也會被拒絕。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">用人脈網的方式獲得 Offer</h3>
          <p className="text-foreground mb-3"><strong className="text-gold">這是 70% 的工作如何填補的</strong>：通過人脈網，而不是申請。</p>
          <h4 className="font-semibold text-foreground mb-2">溫暖介紹策略：</h4>
          <ol className="space-y-1 text-foreground list-decimal list-inside mb-4">
            <li>確定目標公司</li>
            <li>搜尋這些公司的員工（第二度聯繫）</li>
            <li>請求共同聯繫人介紹</li>
            <li>進行資訊性訪談（不是銷售說詞）</li>
            <li>保持聯繫</li>
            <li>當相關職位開放時，你是首要考慮的</li>
          </ol>
          <p className="text-muted-foreground italic">從我的招募經驗來看：通過溫暖介紹聯繫的候選人比冷申請者更有可能獲得面試機會 10 倍。我們信任我們員工的推薦。</p>
        </div>
      </section>

      {/* LinkedIn for Sales - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">銷售人員和顧問的 LinkedIn</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">社交銷售：現代的潛在客戶開發方法</h3>
          <p className="text-foreground mb-4"><strong>舊方法</strong>：冷電話、大量電子郵件、購買的清單 → <strong>新方法</strong>：首先通過內容和參與建立關係</p>

          <h4 className="font-semibold text-foreground mb-3">社交銷售流程：</h4>
          <ol className="space-y-2 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">1</span>
              <p className="text-foreground"><strong>識別潛在客戶</strong>（LinkedIn Sales Navigator 或搜尋）</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">2</span>
              <p className="text-foreground"><strong>研究</strong>（閱讀他們的個人檔案、貼文、公司新聞）</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">3</span>
              <p className="text-foreground"><strong>參與</strong>（評論他們的內容，分享相關見解）</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">4</span>
              <p className="text-foreground"><strong>聯繫</strong>（提及共同興趣的個性化請求）</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">5</span>
              <p className="text-foreground"><strong>提供價值</strong>（分享有用的資源、介紹、提供見解）</p>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">6</span>
              <p className="text-foreground"><strong>開始對話</strong>（當建立信任時）</p>
            </li>
          </ol>
          <p className="text-muted-foreground italic mb-8">我的方法：我從不在第一條訊息中推銷我的服務。我首先提供價值（免費資源、有用的文章、介紹某人）。在建立信任後，銷售對話自然發生。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">創建客戶吸引個人檔案</h3>
          <ul className="space-y-2 text-foreground mb-4">
            <li>• <strong>標題</strong>：專注於你幫助誰以及結果，而不是你的職稱</li>
            <li>• <strong>關於區塊</strong>：以你理想客戶的問題開場，分享你的方法，包括具體的客戶結果，以明確的 CTA 結束</li>
            <li>• <strong>經歷</strong>：寫案例研究而不是工作描述，包括客戶推薦，展示之前/之後的轉變</li>
            <li>• <strong>精選區塊</strong>：潛在客戶磁鐵、客戶成功故事、媒體出現、有價值的文章</li>
          </ul>
          <p className="text-foreground"><strong>目標：</strong>你的個人檔案應該預售你的服務。當有人聯繫時，他們已經確信你可以幫助他們。</p>
        </div>
      </section>

      {/* 90-Day Plan - Expanded */}
      <section id="plan" className="py-12 md:py-16 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-cream">你的 90 天 LinkedIn 轉型計劃</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 1-2 週：基礎</h3>
              <p className="text-cream/80 text-sm mb-2"><strong>第 1-3 天：審計和策略</strong></p>
              <InteractiveChecklist
                guideKey="li_brand_week1_audit_zh"
                lang="zh"
                items={[
                  { label: "對照本指南中的框架檢視目前的個人檔案", href: "#brand" },
                  { label: "定義你的目標受眾和目標" },
                  { label: "識別你的獨特價值主張" },
                  { label: "列出 SEO 優化的關鍵字" },
                ]}
              />
              <p className="text-cream/80 text-sm mb-2 mt-4"><strong>第 4-7 天：個人檔案改造 - 第 1 部分</strong></p>
              <InteractiveChecklist
                guideKey="li_brand_week1_makeover1_zh"
                lang="zh"
                items={[
                  { label: "更新個人檔案照片和背景橫幅", href: "#profile" },
                  { label: "重寫標題（創建 5 個選項，與同事一起測試）", href: "#profile" },
                  { label: "起草新的關於區塊（使用說故事框架）", href: "#profile" },
                  { label: "更新前 2-3 個職位的經歷區塊", href: "#profile" },
                ]}
              />
              <p className="text-cream/80 text-sm mb-2 mt-4"><strong>第 8-14 天：個人檔案改造 - 第 2 部分</strong></p>
              <InteractiveChecklist
                guideKey="li_brand_week1_makeover2_zh"
                lang="zh"
                items={[
                  { label: "完成剩餘的經歷區塊" },
                  { label: "加入或更新教育、證書、技能" },
                  { label: "策展精選區塊（3-6 個項目）", href: "#profile" },
                  { label: "向關鍵人物請求 5 個推薦", href: "#profile" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 3-4 週：內容啟動</h3>
              <InteractiveChecklist
                guideKey="li_brand_week3_content_zh"
                lang="zh"
                items={[
                  { label: "使用框架腦力激盪 20 個內容想法", href: "#content" },
                  { label: "創建內容日曆（每週 2-3 篇貼文）", href: "#content" },
                  { label: "提前寫下前 5 篇貼文" },
                  { label: "設置分析追蹤" },
                  { label: "發布第一篇內容" },
                  { label: "每天參與 10-15 篇貼文" },
                  { label: "每天在 5-7 篇貼文上留下深思熟慮的評論" },
                  { label: "發送 10 個個性化的聯繫請求" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 5-8 週：一致性和優化</h3>
              <InteractiveChecklist
                guideKey="li_brand_week5_optimize_zh"
                lang="zh"
                items={[
                  { label: "按計劃每週發文 2-3 次" },
                  { label: "在 1 小時內回應所有評論" },
                  { label: "每日參與例行公事（15-20 分鐘）", href: "#content" },
                  { label: "每週追蹤分析" },
                  { label: "向策略目標發送 20 個聯繫請求" },
                  { label: "加入 3-5 個相關的 LinkedIn 群組" },
                  { label: "創建第一個影片貼文", href: "#content" },
                  { label: "撰寫第一篇 LinkedIn 文章" },
                  { label: "檢視個人檔案查看、追隨者成長、參與指標", href: "#metrics" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 9-12 週：擴展和進階策略</h3>
              <InteractiveChecklist
                guideKey="li_brand_week9_scale_zh"
                lang="zh"
                items={[
                  { label: "與產業影響者互動" },
                  { label: "創建回應趨勢的內容" },
                  { label: "向參與的聯繫人發送個性化訊息" },
                  { label: "提供價值（介紹、資源、見解）" },
                  { label: "安排 2-3 次咖啡聊天或電話" },
                  { label: "向 10 個溫暖潛在客戶/目標公司聯繫" },
                  { label: "檢視 90 天進展並計劃下一個 90 天" },
                  { label: "記錄有效的內容並創建模板" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">長期維護（持續進行）</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-cream/80 text-sm mb-2"><strong>每日（20 分鐘）</strong></p>
                  <ul className="space-y-1 text-cream/90 text-sm">
                    <li>• 參與 10-15 篇貼文</li>
                    <li>• 回應評論和訊息</li>
                    <li>• 檢查個人檔案查看和新聯繫</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cream/80 text-sm mb-2"><strong>每週（2-3 小時）</strong></p>
                  <ul className="space-y-1 text-cream/90 text-sm">
                    <li>• 創建和安排 2-3 篇貼文</li>
                    <li>• 檢視分析</li>
                    <li>• 參與群組</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cream/80 text-sm mb-2"><strong>每月（2-4 小時）</strong></p>
                  <ul className="space-y-1 text-cream/90 text-sm">
                    <li>• 用新成就更新個人檔案</li>
                    <li>• 請求新推薦</li>
                    <li>• 撰寫一篇長篇文章</li>
                  </ul>
                </div>
                <div>
                  <p className="text-cream/80 text-sm mb-2"><strong>每季（半天）</strong></p>
                  <ul className="space-y-1 text-cream/90 text-sm">
                    <li>• 主要個人檔案檢視和更新</li>
                    <li>• 更新目標和定位</li>
                    <li>• 計劃下一季的內容主題</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics - Expanded */}
      <section id="metrics" className="py-12 md:py-16 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">衡量成功：好的表現是什麼樣子</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">個人檔案查看</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 初學者：每週 50-100 次</li>
                <li>• 中級：每週 100-300 次</li>
                <li>• 進階：每週 300-1,000+ 次</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">參與率</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 初學者：1-3%</li>
                <li>• 中級：3-7%</li>
                <li>• 進階：7-15%+</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">追隨者成長</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 初學者：每月 20-50</li>
                <li>• 中級：每月 50-200</li>
                <li>• 進階：每月 200-1,000+</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">每篇貼文的曝光次數</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 初學者：500-2,000</li>
                <li>• 中級：2,000-10,000</li>
                <li>• 進階：10,000-100,000+</li>
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">業務影響指標</h3>
          <div className="grid md:grid-cols-3 gap-4 mb-6">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">對於求職者：</h4>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• 每週收到的招募人員訊息</li>
                <li>• 來自 LinkedIn 的面試請求</li>
                <li>• 入站機會的質量</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">對於銷售人員：</h4>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• 來自 LinkedIn 產生的潛在客戶</li>
                <li>• LinkedIn 潛在客戶的轉換率</li>
                <li>• 透過 LinkedIn 外展預約的會議</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2 text-sm">對於思想領袖：</h4>
              <ul className="space-y-1 text-muted-foreground text-xs">
                <li>• 演講邀請</li>
                <li>• 媒體請求或播客訪談</li>
                <li>• 合作夥伴機會</li>
                <li>• 諮詢查詢</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">我的結果（18 個月持續努力後）：</strong>每月 20,000+ 次個人檔案查看、22,000+ 追隨者、每篇貼文 50,000-200,000 次曝光、80% 的諮詢客戶透過 LinkedIn 找到我。
            </p>
          </div>
        </div>
      </section>

      {/* FAQ - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">常見問題和挑戰</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-2">「我沒有時間做這一切」</h3>
              <p className="text-foreground mb-2">從小處開始。最小可行的 LinkedIn 策略：每週 30 分鐘優化個人檔案 + 每週 3 次，每次 15 分鐘發文和參與。</p>
              <p className="text-muted-foreground italic">這是每週 75 分鐘。如果你不願意投資這些，你對你的專業品牌不認真。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-2">「我對自我推銷感到不舒服」</h3>
              <p className="text-foreground">重新框架它：你不是在推銷自己，你是在與你的人脈網分享價值。專注於幫助他人，你的專業知識自然會變得可見。把你的 LinkedIn 存在視為教學和幫助，而非吹噓。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-2">「如果我發文沒人參與怎麼辦？」</h3>
              <p className="text-foreground">早期，這是正常的。啟動參與的策略：請 3-5 個親密聯繫人參與你的早期貼文、加入參與小組、首先評論他人的貼文以預熱你的人脈網。耐心等待，動力需要 3-6 個月。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-2">「我的產業不在 LinkedIn 上」</h3>
              <p className="text-foreground">每個專業人士都在 LinkedIn 上。你可能需要以不同的方式搜尋或加入利基群組，但你的受眾在那裡。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-2">「我在職位之間，對我的就業空白感到尷尬」</h3>
              <p className="text-foreground">誠實且策略性。你可以說：「目前正在探索 [領域] 的機會」、「在 [前職位] 之後休假，尋求 [下一個機會]」、「因 [家庭/健康/搬遷] 而職業休息，現在準備好 [目標]」。空白是正常的。重要的是你如何框架它們。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Take Action Now - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Rocket className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">現在採取行動</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-gold mb-3">今天（15 分鐘）</h3>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 檢視你目前的 LinkedIn 個人檔案</li>
                <li>• 識別 3 個最弱的區塊</li>
                <li>• 為每個區塊寫一個改進</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-gold mb-3">本週（2 小時）</h3>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 更新個人檔案照片和標題</li>
                <li>• 重寫你的關於區塊</li>
                <li>• 請求 3 個推薦</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-gold mb-3">本月（10 小時）</h3>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 完成完整的個人檔案改造</li>
                <li>• 發布你的第一篇內容</li>
                <li>• 每天參與 10 篇貼文</li>
                <li>• 與 20 個策略性的人聯繫</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-gold mb-3">接下來的 90 天</h3>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• 遵循上述轉型計劃</li>
                <li>• 每週一致地發文 2-3 次</li>
                <li>• 通過參與建立關係</li>
                <li>• 根據結果衡量和優化</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 text-center">
            <p className="text-foreground font-semibold">你的 LinkedIn 轉型不會在一夜之間發生。但 90 天後，你可以擁有完全不同的專業品牌 — 一個吸引機會而不是追逐機會的品牌。</p>
            <p className="text-gold mt-2">問題是：你會投入工作嗎？</p>
          </div>
        </div>
      </section>

      {/* Quick Reference - NEW SECTION */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">快速參考：LinkedIn 個人品牌方法</h2>
          </div>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 1：策略基礎</h3>
              <p className="text-foreground text-sm">定義目標受眾和目標 → 識別獨特價值主張 → 研究優化的關鍵字</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 2：個人檔案優化</h3>
              <p className="text-foreground text-sm">專業照片和橫幅 → 引人注目的標題（價值，而非職稱）→ 故事驅動的關於區塊 → 以成就為重點的經歷 → 策略性精選區塊</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 3：社會證明</h3>
              <p className="text-foreground text-sm">請求 5-10 個推薦 → 讓同事認可技能 → 展示證書和資格 → 展示客戶結果和推薦</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 4：內容創建</h3>
              <p className="text-foreground text-sm">每週一致地發文 2-3 次 → 混合價值、故事和參與內容 → 在前 2 行使用強鉤子 → 包括行動呼籲</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 5：參與策略</h3>
              <p className="text-foreground text-sm">每日：參與 10-15 篇貼文 → 回應你貼文上的所有評論 → 每週：加入並參與群組</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 6：關係建立</h3>
              <p className="text-foreground text-sm">向聯繫人發送價值優先的訊息 → 提供介紹和資源 → 建立真正的關係（不是交易）</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h3 className="font-semibold text-gold mb-2">步驟 7：衡量和調整</h3>
              <p className="text-foreground text-sm">每週：檢視內容表現 → 每月：分析個人檔案指標 → 每季：更新個人檔案和策略 → 每年：評估業務影響</p>
            </div>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            你的 LinkedIn 之旅現在開始
          </h2>
          <p className="text-foreground mb-4">
            LinkedIn 上的個人品牌不再是可選的，它是必不可少的。無論你是在找工作、發展業務還是建立思想領導力，LinkedIn 是專業成功發生的地方。
          </p>
          <p className="text-foreground mb-4">
            在 LinkedIn 上成功的人和那些不成功的人之間的區別不是才能或運氣，而是策略和一致性。
          </p>
          <p className="text-xl font-heading text-gold mb-4">
            核心訊息：真實、策略性、一致
          </p>
          <p className="text-foreground font-semibold mb-4">
            你不需要完美。你需要開始。
          </p>
          <p className="text-muted-foreground italic mb-6">
            你的 LinkedIn 個人檔案是你的 24/7 銷售員。它現在正在為你工作，要麼吸引機會，要麼讓你失去機會。是哪一個？
          </p>
          <p className="text-foreground font-semibold">
            記住：你距離下一個大機會只有一個經過良好優化的個人檔案。
          </p>
        </div>
      </section>

      {/* Resources */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm text-muted-foreground text-center mb-2">
            本指南基於 Sandra Long 的《LinkedIn 個人品牌終極指南》。招募見解和實際應用由 James Bugden 加入。
          </p>
          <p className="text-xs text-muted-foreground text-center">
            閱讀完整書籍：Sandra Long 的《LinkedIn 個人品牌終極指南》| 作者資源：PostRoadConsulting.com
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
            <p className="text-cream/60 text-sm">
              © {new Date().getFullYear()} James Bugden
            </p>
          </div>
        </div>
      </footer>
    
      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default LinkedInBrandingGuideZhTw;