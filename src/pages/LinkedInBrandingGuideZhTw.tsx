import { ArrowLeft, Download, Users, Target, FileText, MessageSquare, Search, CheckCircle2, Calendar, Linkedin, TrendingUp, Briefcase, Award, Eye, Zap, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GoldCheckBadge from "@/components/GoldCheckBadge";

const LinkedInBrandingGuideZhTw = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/ZH_LinkedIn_Personal_Branding_Tactical_Guide.pdf';
    link.download = 'ZH_LinkedIn_Personal_Branding_Tactical_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
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
          <p className="text-base text-cream/60 mb-6">
            作者：James Bugden，資深招募顧問
          </p>
          <Button 
            onClick={handleDownload}
            className="bg-gold hover:bg-gold/90 text-executive-green font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            下載 PDF 指南
          </Button>
        </div>
      </section>

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            根據 Sandra Long 的《LinkedIn 個人品牌終極指南》改編，結合 20,000+ 份履歷審核和 500+ 次錄用的招募經驗。
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            什麼是個人品牌？
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            個人品牌是積極管理你的形象並定義你的獨特價值。這是關於展示你最好的真實自我，而不是創造一個虛假的人格。
          </p>
          <p className="text-base md:text-lg text-foreground mb-6">
            現實是這樣的：<span className="text-gold font-semibold">無論你是否積極管理它，你的品牌聲譽都存在。問題是：你會控制敘事，還是讓別人定義你？</span>
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">「橘色魚」原則</h3>
          <p className="text-foreground mb-4">
            大多數 LinkedIn 個人檔案看起來都一樣：職稱、公司名稱、職責。這就是當一條藍魚。你的目標是成為橘色魚：令人難忘、與眾不同、引人注目。
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

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">招募人員的真相：</strong>我可以在查看你的個人檔案的 6 秒內判斷你是一個認真的候選人還是只是另一份履歷。你的 LinkedIn 品牌要麼為你 24/7 工作，要麼每天都在讓你失去機會。
            </p>
          </div>
        </div>
      </section>

      {/* Six Opportunities */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            LinkedIn 創造的六個機會
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <Briefcase className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">1. 職業機會</h3>
              <p className="text-muted-foreground text-sm">最好的機會來自於你不在找工作的時候，但前提是你的個人檔案能吸引它們。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">2. 銷售機會</h3>
              <p className="text-muted-foreground text-sm">在潛在客戶接聽你的電話之前，他們會在 LinkedIn 上查找你。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Award className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">3. 思想領導機會</h3>
              <p className="text-muted-foreground text-sm">會議組織者和媒體透過 LinkedIn 找到專家和演講者。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Users className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">4. 社會證明</h3>
              <p className="text-muted-foreground text-sm">推薦、認可和參與度展示人們重視你的專業知識。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Zap className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">5. 合作夥伴機會</h3>
              <p className="text-muted-foreground text-sm">與潛在的商業夥伴、聯合創辦人和協作者連接。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Eye className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">6. 信譽和名氣</h3>
              <p className="text-muted-foreground text-sm">當有人搜尋你的名字時，你的 LinkedIn 個人檔案驗證你的專業知識。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Brand Framework */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">個人品牌框架</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 1：了解你的受眾</h3>
          <p className="text-foreground mb-4">在你在 LinkedIn 上寫下任何字之前，你需要知道：誰將閱讀你的個人檔案，你希望他們做什麼？</p>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• 招募經理和招募人員</li>
            <li>• 潛在客戶或顧客</li>
            <li>• 產業同行和思想領袖</li>
            <li>• 合作夥伴或投資者</li>
            <li>• 會議組織者和媒體</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 2：定義你的獨特價值</h3>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <p className="text-foreground font-semibold mb-2">個人品牌方程式：</p>
            <p className="text-gold font-heading text-lg">你的獨特價值 = 技能 + 個性 + 觀點 + 證明</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">組成部分 3：真實</h3>
          <p className="text-foreground mb-4">你想對自己、你的技能和你的個性保持真實。這更多的是展示或證明你最好的真實自我，而不是創造任何新東西。</p>
          <p className="text-muted-foreground italic">
            想想：「我會如何在產業會議上介紹自己？」這就是你的 LinkedIn 聲音。
          </p>
        </div>
      </section>

      {/* Profile Sections */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn 個人檔案：逐段分析</h2>
          </div>

          {/* Headline */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">標題</span>（70-90 字元）
            </h3>
            <p className="text-foreground mb-4">這是你整個個人檔案上最重要的地產。它出現在搜尋結果、當你評論貼文時、當你發送聯絡請求時。</p>
            
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-muted-foreground mb-2">❌ 大多數人這樣寫：</p>
              <p className="text-foreground">「Google 的軟體工程師」或「行銷經理 | MBA」</p>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
              <p className="text-gold mb-2">✅ 更好的做法：</p>
              <p className="text-foreground">「幫助 SaaS 公司從 100 萬美元擴展到 1000 萬美元以上的年經常性收入 | 成長行銷領導者 | 前 Google、Meta」</p>
            </div>

            <p className="text-foreground font-semibold mb-2">公式：</p>
            <p className="text-gold">[獨特價值] | [關鍵技能/專業知識] | [信譽標記]</p>
          </div>

          {/* About Section */}
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
                  <p className="text-muted-foreground text-sm">這些在手機上「查看更多」之前顯示。讓它們有價值。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">你的故事（中間部分）</p>
                  <p className="text-muted-foreground text-sm">你如何到達現在的位置、什麼驅動你、塑造你專業知識的關鍵經驗。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">你提供的（下一部分）</p>
                  <p className="text-muted-foreground text-sm">你幫助人們/公司的具體方式、你的超能力或關鍵優勢。</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">行動呼籲（最後部分）</p>
                  <p className="text-muted-foreground text-sm">人們如何與你合作、如何聯繫你。</p>
                </div>
              </div>
            </div>
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
                  <li>• 良好的照明，簡單的背景</li>
                  <li>• 照片中只有你一個人</li>
                  <li>• 微笑或溫暖的表情</li>
                </ul>
              </div>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-muted-foreground mb-2">❌ 什麼不行：</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• 休閒度假照片</li>
                  <li>• 團體照</li>
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
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• 你的公司標誌或品牌</li>
              <li>• 包含你的標語或價值主張的設計</li>
              <li>• 代表你的產業或專業知識的圖片</li>
              <li>• 包含聯絡資訊或網站的文字覆蓋</li>
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

            <p className="text-muted-foreground italic">從我的角度來看：當我招募高級職位時，我總是檢查精選區塊。它向我展示某人認為什麼是他們最好的作品。空的精選區塊 = 錯失留下深刻印象的機會。</p>
          </div>

          {/* Experience Section */}
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

            <h4 className="font-semibold text-foreground mb-3">經歷描述的專業技巧：</h4>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• 以你最大的成就開頭</li>
              <li>• 盡可能使用具體數字</li>
              <li>• 包含背景（團隊規模、預算、時間表）</li>
              <li>• 突出可轉移的技能</li>
              <li>• 展示角色內的進步</li>
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

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
              <p className="text-foreground">
                <strong className="text-gold">招募人員現實：</strong>我使用技能作為快速篩選器。如果我在招聘 Python 角色，而你沒有在你的前 10 項技能中列出 Python，你可能不是強力匹配。
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">推薦</span>
            </h3>
            <p className="text-foreground mb-4">這是 LinkedIn 上最未被充分利用的功能，也是建立信任最強大的功能。</p>
            
            <h4 className="font-semibold text-foreground mb-3">Sandra 的 6 步驟推薦流程：</h4>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">1</span>
                <p className="text-foreground"><strong>列清單</strong> — 決定誰可以從直接與你合作的經驗中第一手描述你的工作</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">2</span>
                <p className="text-foreground"><strong>考慮時機</strong> — 最佳時機是剛完成專案、離開工作或收到大讚美後</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">3</span>
                <p className="text-foreground"><strong>親自詢問</strong> — 個人化的請求會大幅提高成功率</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">4</span>
                <p className="text-foreground"><strong>讓它變簡單</strong> — 詢問他們是否想要談話要點</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">5</span>
                <p className="text-foreground"><strong>溫和追蹤</strong> — 人們有好意但會忙碌</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">6</span>
                <p className="text-foreground"><strong>表達感激</strong> — 發送感謝信或 LinkedIn 訊息</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Content Strategy */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">內容策略：成為思想領袖</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">為什麼在 LinkedIn 上創建內容？</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
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
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">尋找內容想法</h3>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">你的專業知識</p>
                <p className="text-muted-foreground text-sm">你解決過的問題、學到的教訓、你使用的框架</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">受眾問題</p>
                <p className="text-muted-foreground text-sm">常見問題、挑戰、你看到的誤解</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">時事</p>
                <p className="text-muted-foreground text-sm">產業新聞、新研究、你參加的會議</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">他人的內容</p>
                <p className="text-muted-foreground text-sm">分享並加上你的評論，回應討論，建立在想法上</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">高績效貼文的剖析</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>鉤子（前 1-2 行）</strong> — 這是人們在點擊「查看更多」之前看到的。讓它引人注目。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>正文</strong> — 講一個故事，分享一個教訓，或提供價值。使用短段落（最多 1-3 句）。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>行動呼籲</strong> — 問一個問題來推動評論。邀請人們分享他們的經驗。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">強鉤子的範例：</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• 「我剛剛被我真正想要的工作拒絕了。這是我學到的：」</li>
            <li>• 「在審閱了 10,000 份履歷後，我注意到一個預測成功的模式：」</li>
            <li>• 「大多數人在 LinkedIn 上做錯了。這是真正有效的：」</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">每日參與例行公事（15-20 分鐘）：</h3>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• 對來自你人脈網的 10-15 篇貼文做出反應</li>
            <li>• 留下 5-7 個深思熟慮的評論（不只是「很棒的貼文！」）</li>
            <li>• 回應你最近貼文上的所有評論</li>
            <li>• 分享 1-2 篇貼文並加上你自己的評論</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 上的影片內容</h3>
          <p className="text-foreground mb-4">影片是最高參與度的內容類型，但大多數人避免它。不要這樣。</p>
          <div className="grid md:grid-cols-2 gap-4">
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
                <li>• 對產業新聞的反應</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Algorithm & Visibility */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn 演算法：如何被看見</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">演算法優先事項：</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>停留時間</strong> — 人們花多少時間閱讀你的貼文</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>參與度</strong> — 讚、評論、分享和點擊</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>相關性</strong> — 你的內容與觀看者感興趣的內容匹配程度</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>新鮮度</strong> — 較新的貼文獲得初始提升</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>作者信譽</strong> — SSI 較高的個人檔案獲得更多覆蓋</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">「黃金時段」：</strong>發文後的前 60 分鐘至關重要。如果你的貼文立即獲得強勁的參與度，LinkedIn 會向更多人展示它。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">最佳發文時間：</h3>
          <ul className="space-y-2 text-foreground">
            <li>• 週二至週四是最強的日子</li>
            <li>• 上午 8-10 點和中午 12-2 點（在你受眾的時區）</li>
            <li>• 避免週末發布 B2B 內容</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            常見的 LinkedIn 錯誤（以及如何避免它們）
          </h2>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #1：將 LinkedIn 視為履歷</p>
              <p className="text-muted-foreground">履歷是用於申請的。LinkedIn 是用於吸引的。像你在喝咖啡時告訴同事你的工作一樣寫作。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #2：沒有策略</p>
              <p className="text-muted-foreground">定義你的目標（求職、銷售、思想領導），識別目標受眾，在個人檔案和內容中創建一致的定位。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #3：過度推銷</p>
              <p className="text-muted-foreground">遵循 80/20 規則。80% 的增值內容，20% 的促銷性。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #4：不一致的活動</p>
              <p className="text-muted-foreground">每週至少發文 2-3 次。一致性勝過完美。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">錯誤 #5：過時的個人檔案</p>
              <p className="text-muted-foreground">每季更新個人檔案。加入新成就，更新關於區塊，請求新推薦。</p>
            </div>
          </div>
        </div>
      </section>

      {/* 90-Day Plan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
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
              <ul className="space-y-2 text-cream/90">
                <li>☐ 對照本指南中的框架檢視目前的個人檔案</li>
                <li>☐ 定義你的目標受眾和目標</li>
                <li>☐ 更新個人檔案照片和背景橫幅</li>
                <li>☐ 重寫標題和關於區塊</li>
                <li>☐ 更新前 2-3 個職位的經歷區塊</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 3-4 週：內容啟動</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ 腦力激盪 20 個內容想法</li>
                <li>☐ 創建內容日曆（每週 2-3 篇貼文）</li>
                <li>☐ 發布第一篇內容</li>
                <li>☐ 每天參與 10-15 篇貼文</li>
                <li>☐ 發送 10 個個性化的聯繫請求</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 5-8 週：一致性和優化</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ 按計劃每週發文 2-3 次</li>
                <li>☐ 向策略目標發送 20 個聯繫請求</li>
                <li>☐ 加入 3-5 個相關的 LinkedIn 群組</li>
                <li>☐ 創建第一個影片貼文</li>
                <li>☐ 撰寫第一篇 LinkedIn 文章</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 9-12 週：擴展和進階策略</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ 與產業影響者互動</li>
                <li>☐ 向參與的聯繫人發送個性化訊息</li>
                <li>☐ 安排咖啡聊天或電話</li>
                <li>☐ 檢視 90 天進展並計劃下一個 90 天</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
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

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">我的結果（18 個月持續努力後）：</strong>每月 20,000+ 次個人檔案查看、22,000+ 追隨者、每篇貼文 50,000-200,000 次曝光、80% 的諮詢客戶透過 LinkedIn 找到我。
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            你的 LinkedIn 之旅現在開始
          </h2>
          <p className="text-foreground mb-4">
            LinkedIn 上的個人品牌不再是可選的，它是必不可少的。無論你是在找工作、發展業務還是建立思想領導力，LinkedIn 是專業成功發生的地方。
          </p>
          <p className="text-xl font-heading text-gold mb-6">
            核心訊息：真實、策略性、一致。
          </p>
          <p className="text-muted-foreground italic mb-8">
            你的 LinkedIn 個人檔案是你的 24/7 銷售員。它現在正在為你工作，要麼吸引機會，要麼讓你失去機會。是哪一個？
          </p>
          <p className="text-foreground font-semibold">
            記住：你距離下一個大機會只有一個經過良好優化的個人檔案。
          </p>
        </div>
      </section>

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
    </div>
  );
};

export default LinkedInBrandingGuideZhTw;
