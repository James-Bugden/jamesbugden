import { ArrowLeft, Star, Users, FileText, MessageSquare, Search, CheckCircle2, Calendar, Linkedin, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const LinkedInGuideZhTw = () => {
  useTrackGuideProgress("linkedin-guide-zh");
  const navigate = useNavigate();


  return (
      <div className="min-h-screen bg-background">
        <SEO schemaJson={guideSchema({ path: "/zh-tw/linkedin-guide", title: "LinkedIn 個人檔案指南｜吸引招募官", description: "打造吸引頂尖企業招募官的LinkedIn檔案。標題公式、摘要範本和真實案例。" })} />
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
              onClick={() => navigate("/linkedin-guide")}
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
            LinkedIn 求職指南
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            讓招募人員主動找到你
          </p>
          <p className="text-base text-cream/60 mb-2">
            作者：James Bugden，資深招募顧問
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">15 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            根據 Sandra Long 的《LinkedIn 個人品牌終極指南》改編
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-base md:text-lg text-foreground mb-4">
            你的 LinkedIn 個人檔案在任何人親自見到你之前就創造了第一印象。<span className="text-gold font-semibold">65% 的專業人士表示，你在網路上留下的印象與親自見面時一樣重要。</span>
          </p>
          <p className="text-base md:text-lg text-foreground">
            這份指南提供 Sandra Long 經過驗證的框架，幫助你脫穎而出，成為朝自己方向游泳的「橘色魚」。
          </p>
        </div>
      </section>

      {/* Step 1: All-Star Status */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 1：達到全明星狀態</h2>
              <p className="text-muted-foreground">你的基礎</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            在做任何事之前，先讓你的 LinkedIn 個人檔案達到「全明星」強度。這是讓你的個人檔案在搜尋結果中更容易被看見的最低門檻。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">全明星需要：</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">專業照片</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">50+ 個聯絡人</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">列出目前職位</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">2 個過去職位</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">教育背景</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">3+ 項技能</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">填寫產業和地點</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">為什麼重要：</strong> 全明星個人檔案在搜尋結果中出現的機率顯著更高。把它想成入場券 — 沒有它你就不會被找到。
            </p>
          </div>

          <div className="mt-6">
            <InteractiveChecklist guideKey="li_guide_action1_zh" lang="zh" items={[
              { label: "行動：檢查你的個人檔案強度指標。這個週末填補上述任何空白。" },
            ]} />
          </div>
        </div>
      </section>

      {/* Step 2: Strategic Headline */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 2：撰寫策略性標題</h2>
              <p className="text-muted-foreground">70-90 字元</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            你的標題和照片通常是別人在決定是否點擊你的個人檔案前唯一會看到的東西。大多數人保留預設值 — 他們的職稱。這是錯失的機會。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra 的頂級標題建議：</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>使用關鍵字</strong> — 標題中的字詞幫助人們在搜尋中找到你</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>加入價值陳述</strong> — 不要只說你是什麼，說你為人們做什麼</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>具體明確</strong> — 「業務主管」太籠統；加入讓你與眾不同的地方</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>保留你的企業品牌</strong>（如果它知名度高）— 「GE 資深副總」會吸引點擊</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">參考其他人在你的產業中的做法以獲得想法和用語</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">改寫前後範例：</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left text-foreground">❌ 之前</th>
                  <th className="border border-border p-3 text-left text-foreground">✅ 之後</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">行銷經理</td>
                  <td className="border border-border p-3 text-foreground">行銷主管 | 成長策略 | 通路開發 | 合作夥伴關係</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">人力資源顧問</td>
                  <td className="border border-border p-3 text-foreground">人資顧問 | 人才招募 | 員工留任 | 優化你的勞動力以實現成長</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">營運經理</td>
                  <td className="border border-border p-3 text-foreground">營運經理 | 客服中心優化 | 黑帶 | 六標準差 | 退伍軍人</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">待業中尋找行銷職位</td>
                  <td className="border border-border p-3 text-foreground">行銷領導者 | 數位媒體 | 潛在客戶開發專家 | 幫助組織成長</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">你可以加入的「以價值為重點」的句子：</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• 「我幫助人們和企業發展正向溝通技巧」</li>
            <li>• 「讓所有女性都能創業」</li>
            <li>• 「保護家庭資產和財富」</li>
          </ul>

          <InteractiveChecklist guideKey="li_guide_action2_zh" lang="zh" items={[
            { label: "行動：寫 3-5 個標題選項。選擇最吸引人且包含你的策略關鍵字的那個。" },
          ]} />
        </div>
      </section>

      {/* Step 3: About Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 3：打造你的關於區塊</h2>
              <p className="text-muted-foreground">800-1,200 字元</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            你的關於區塊是寶貴的數位資產。不要只是重複個人檔案中已有的內容。以一種吸引人們想與你合作或推薦你的方式編織你的故事。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra 撰寫優秀關於區塊的 10 個技巧：</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>1. 專注</strong> — 打造出色的介紹。先在 Word 中撰寫以檢查拼字和文法。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>2. 設定目標</strong> — 你想達成什麼？新客戶？新工作？演講邀請？</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>3. 考慮你的讀者</strong> — 思考所有你的受眾。什麼讓他們想聯絡你？</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>4. 使用空間</strong> — LinkedIn 說至少 40 個字的文章讓你的個人檔案更容易在搜尋中被找到。大多數強大的個人檔案包含 2-3 段。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>5. 真實且真誠</strong> — 讓真正的「你」展現出來。包含個人興趣。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>6. 用第一人稱撰寫</strong> — 創造溫暖。40% 的招募人員在個人檔案中尋找個性。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>7. 使用策略性語言</strong> — 自然地包含關鍵字。在最後加入專業領域清單。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>8. 讓它有吸引力</strong> — 使用間距、大小寫和符號來增加視覺吸引力。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>9. 以鉤子開始</strong> — 吸引讀者。讓他們想點擊「查看更多」。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>10. 小心結尾</strong> — 以專業領域清單和聯絡資訊結束，提供「快速閱讀」選項。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">使用五個 H 格式：</h3>
          <p className="text-muted-foreground mb-4">Sandra 撰寫關於區塊的標誌性結構：</p>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🪝</span>
              <div>
                <p className="text-foreground font-semibold">Hook（鉤子）</p>
                <p className="text-muted-foreground">以吸引人的開場白開始，讓人們想繼續閱讀</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="text-foreground font-semibold">Help（幫助）</p>
                <p className="text-muted-foreground">描述你如何幫助你的客戶、潛在客戶或雇主</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">😊</span>
              <div>
                <p className="text-foreground font-semibold">Human（人性）</p>
                <p className="text-muted-foreground">加入個性。分享是什麼吸引你投入這份工作、你的價值觀或工作以外的興趣</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔑</span>
              <div>
                <p className="text-foreground font-semibold">Hot-Words（熱門字）</p>
                <p className="text-muted-foreground">在整篇文章中自然地編織你的策略關鍵字</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-foreground font-semibold">Hello（打招呼）</p>
                <p className="text-muted-foreground">以你的聯絡資訊結束，讓人們可以聯繫你</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">選擇你的寫作角色：</h3>
          <p className="text-muted-foreground mb-4">Sandra 確定了撰寫關於區塊的六種方法。選擇適合你的那個：</p>
          <div className="space-y-4 mb-6">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">歷史學家</strong> — 你的職業生涯的時間順序故事。如果你使用這種方法，確保加入個性。不要只是重複你的經歷區塊。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">說故事的人</strong> — 以一個與你個人品牌相關的精彩故事開場。Sandra 最喜歡的方法：「我就是喜歡故事。」</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">編織者</strong> — 如果你的職業道路不是線性的，這很完美。使用關於區塊來連接點，解釋為什麼你多樣化的經驗合在一起是有意義的。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">主題化者</strong> — 最適合資深領導者或有廣泛經驗的人。選擇 3-4 個貫穿你職業生涯的主題，並圍繞這些主題組織。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">個性派</strong> — 讓你的性格和工作風格成為中心舞台。展示你如何處理問題和協作。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">商業領袖</strong> — 將你的關於區塊寫成潛在客戶的「預售文件」。仍然使用第一人稱並講述你的故事。</p>
            </div>
          </div>

          <InteractiveChecklist guideKey="li_guide_action3_zh" lang="zh" items={[
            { label: "行動：選擇你的角色。使用五個 H 結構撰寫你的關於區塊。先在單獨的文件中起草，然後貼上。" },
          ]} />
        </div>
      </section>

      {/* Step 4: Social Proof */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 4：建立社會證明</h2>
              <p className="text-muted-foreground">推薦和認可</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            線上評論可以決定你是否被找到、被錄用和被信任。在 LinkedIn 上有推薦和認可的人都曾努力爭取 — 這不會自動發生。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">技能與認可</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>清理你的技能</strong> — 移除任何不符合你品牌的東西。僅僅因為有人認可你的某項技能，不代表它應該出現在你的個人檔案上。</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>釘選你的前 3 項</strong> — 在你個人檔案上顯示的前三項技能應該是你最具策略性的技能。</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>每幾個月檢視一次</strong> — 你的技能清單應該隨著你的職業發展而演變。</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">LinkedIn 有趣的事實：</strong> 至少擁有 5 項相關技能的用戶收到訊息的次數是沒有技能者的 31 倍，被查看的次數是 17 倍。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra 的 6 步驟推薦流程：</h3>
          <ol className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">1</span>
              <div>
                <p className="text-foreground"><strong>列清單</strong> — 決定誰可以從直接與你合作的經驗中第一手描述你的工作</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">2</span>
              <div>
                <p className="text-foreground"><strong>考慮時機</strong> — 最佳時機是剛完成專案、離開工作或收到大讚美後</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">3</span>
              <div>
                <p className="text-foreground"><strong>親自詢問</strong> — 對於親近的聯絡人，一封訊息就可以。對其他人，先暖身 — 打電話或約喝咖啡。個人化的請求會大幅提高成功率</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">4</span>
              <div>
                <p className="text-foreground"><strong>讓它變簡單</strong> — 詢問他們是否想要談話要點，或者你是否應該為他們起草一些東西讓他們編輯</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">5</span>
              <div>
                <p className="text-foreground"><strong>溫和追蹤</strong> — 人們有好意但會忙碌。溫和的提醒是明智的</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">6</span>
              <div>
                <p className="text-foreground"><strong>表達感激</strong> — 發送感謝信或 LinkedIn 訊息</p>
              </div>
            </li>
          </ol>

          <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5 mb-6">
            <p className="text-foreground">
              <strong>目標：</strong> 獲得至少 3 條推薦。給出至少 5 條。最好的推薦來自客戶、你的直屬主管或擁有重要頭銜的人。
            </p>
          </div>

          <p className="text-muted-foreground italic mb-6">
            來自書中的專業建議：為推薦你的人寫推薦是完全可以的。在一個很棒的專案後：「我真的很享受與你合作。讓我們基於這個偉大的成就互相在 LinkedIn 上寫推薦吧。」
          </p>

          <InteractiveChecklist guideKey="li_guide_action4_zh" lang="zh" items={[
            { label: "行動：確定 3-5 個人請求推薦。本週使用 6 步驟流程發送你的第一個請求。" },
          ]} />
        </div>
      </section>

      {/* Step 5: Content & Engagement */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 5：創建並參與內容</h2>
              <p className="text-muted-foreground">80/20 法則</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Sandra 的內容規則是書中最重要的參與策略。
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl text-gold mb-3">80/20 法則：</h3>
            <p className="text-foreground mb-4">
              將至少 80% 的內容時間花在參與其他人的內容上。要有幫助。提供思想領導力。分享有用的見解。
            </p>
            <p className="text-foreground">
              避免銷售、要求會議或要求工作。這種有幫助的方法建立關係，讓人們來找你。
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">把它想成一個社交活動（Sandra 的類比）：</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-foreground"><strong className="text-red-600 dark:text-red-400">❌ Bill</strong> 走進來立即開始他的銷售說詞。他從不停下來喘口氣。一切都圍繞著他自己。Bill 令人反感。</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-foreground"><strong className="text-green-600 dark:text-green-400">✅ Mark</strong> 進入並對他人表現出真誠的興趣。他進行有趣的對話。Mark 吸引人。</p>
            </div>
          </div>

          <p className="text-foreground mb-6 italic">線上世界的運作方式完全相同。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">內容的三個 C：</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Create（創建）</strong> — 撰寫原創貼文、文章或錄製原生影片。400-600 字元的貼文往往表現良好。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Curate（策展）</strong> — 找到有價值的內容並以你獨特的觀點分享。加入有見地的評論 — 不要只是按「轉發」。</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Comment（評論）</strong> — Sandra 的第一秘訣。如果她只能做一件事，那就是每天用有意義、有見地或支持性的評論留言。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">評論最佳實踐：</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">寫更長、有見地的評論 — 不只是「很棒的貼文！」</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">如果你的評論很長，加入空白</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">用 @-提及（標記）回覆評論</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">除非絕對必要，否則避免連結</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">絕不劫持別人的貼文來推銷你自己的議程</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">通過評論建立關係：</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">當你創建貼文時：</p>
              <p className="text-muted-foreground text-sm">你發文 → 有人評論 → 你按讚並回覆他們的評論（用 @-提及）→ 訪問他們的個人檔案並參與他們的內容 → 用個人化訊息邀請他們連接 → 繼續提供幫助 → 看著關係自然發展</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">當你參與他人內容時：</p>
              <p className="text-muted-foreground text-sm">在主題標籤串流中找到有趣的內容 → 留下有見地的評論並 @-提及 → 他們回覆評論並查看你的個人檔案 → 按讚他們的回覆 → 訪問他們的個人檔案，評論另一篇貼文 → 讓它自然地導向連接</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn 上可用的內容類型：</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• <strong>貼文</strong>（400-600 字元，出現在首頁動態）</li>
            <li>• <strong>原生影片</strong>（從手機上傳，加入字幕）</li>
            <li>• <strong>直播影片</strong>（從個人或公司頁面廣播）</li>
            <li>• <strong>文件貼文</strong>（上傳 PDF 或 PowerPoint）</li>
            <li>• <strong>投票</strong>（非常適合推動參與和對話）</li>
            <li>• <strong>文章</strong>（長篇部落格內容，1,500-3,000 字）</li>
          </ul>

          <InteractiveChecklist guideKey="li_guide_action5_zh" lang="zh" items={[
            { label: "行動：本週每天評論 5 篇貼文，給予真誠、深思熟慮的見解。分享 1 篇策展文章並加入你自己的觀點。" },
          ]} />
        </div>
      </section>

      {/* Step 6: Optimize for Search */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">步驟 6：優化搜尋和能見度</h2>
            </div>
          </div>

          <p className="text-foreground mb-6">
            在 LinkedIn 上被找到需要有意識地放置關鍵字和完整的個人檔案。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">在哪裡放置關鍵字：</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>標題</strong>（搜尋權重最高）</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>關於區塊</strong>（特別是專業領域清單）</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>經歷區塊</strong>的標題和描述</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>技能區塊</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">出版物、專案和其他區塊</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">快速能見度贏家：</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">自訂 URL</strong> — 將你的 LinkedIn URL 改為 linkedin.com/in/你的名字</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">公開個人檔案</strong> — 確保你的個人檔案在 Google 上可見</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">地點和產業</strong> — 正確填寫；它們會影響搜尋結果</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">精選區塊</strong> — 在個人檔案頂部展示你最好的內容、媒體提及、案例研究或潛在客戶磁鐵</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">豐富媒體</strong> — 在你的經歷區塊中加入影片、簡報和文件</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-heading text-lg text-foreground mb-3">專業照片指南：</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• 專業、最近的、高品質</li>
                <li>• 照片中只有你一個人</li>
                <li>• 友善的表情</li>
                <li>• 最小 400 × 400 像素</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-heading text-lg text-foreground mb-3">背景橫幅：</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• 1584 × 396 像素</li>
                <li>• 用它來強化你的品牌</li>
                <li>• 可加入標語、視覺、網站</li>
              </ul>
            </div>
          </div>

          <InteractiveChecklist guideKey="li_guide_action6_zh" lang="zh" items={[
            { label: "行動：自訂你的 URL。加入背景橫幅。在你的經歷區塊中上傳 1-2 個豐富媒體項目。" },
          ]} />
        </div>
      </section>

      {/* 4-Week Action Plan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-cream">你的 4 週行動計劃</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 1 週：基礎</h3>
              <InteractiveChecklist
                guideKey="linkedin_guide_wk1_zh"
                lang="zh"
                variant="dark"
                items={[
                  { label: "在 LinkedIn 上檢查你的全明星狀態 — 填補任何空白" },
                  { label: "更新照片和背景橫幅" },
                  { label: "重寫標題（寫 3-5 個選項，選擇最好的）" },
                  { label: "選擇你的關於區塊角色" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 2 週：強力區塊</h3>
              <InteractiveChecklist
                guideKey="linkedin_guide_wk2_zh"
                lang="zh"
                variant="dark"
                items={[
                  { label: "使用五個 H 結構撰寫關於區塊" },
                  { label: "更新經歷區塊（加入成就和關鍵字）" },
                  { label: "清理技能 — 釘選前 3 項策略性技能" },
                  { label: "加入精選區塊" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 3 週：社會證明</h3>
              <InteractiveChecklist
                guideKey="linkedin_guide_wk3_zh"
                lang="zh"
                variant="dark"
                items={[
                  { label: "使用 6 步驟流程發送 3-5 個推薦請求" },
                  { label: "為其他人寫 2-3 條推薦" },
                  { label: "給同事真誠的認可" },
                  { label: "自訂你的 LinkedIn URL" },
                ]}
              />
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">第 4 週：內容與參與</h3>
              <InteractiveChecklist
                guideKey="linkedin_guide_wk4_zh"
                lang="zh"
                variant="dark"
                items={[
                  { label: "應用 80/20 法則 — 每天評論 5+ 篇貼文" },
                  { label: "本週分享 2-3 篇貼文（創建或策展並加入你的觀點）" },
                  { label: "使用建立關係的評論策略" },
                  { label: "檢視你的個人檔案分析 — 什麼有效？" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            要記住的關鍵書籍原則
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🟠</p>
              <p className="text-foreground"><strong className="text-gold">成為橘色魚</strong> — LinkedIn 上的大多數人看起來都一樣。你獨特的個人品牌是讓人們想與你連接、錄用或向你購買的原因。不要與藍魚混在一起。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🎭</p>
              <p className="text-foreground"><strong className="text-gold">展示，不要告訴</strong> — 不要說你有「展現的領導力」。通過你的故事、成就和內容實際展示它。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">✍</p>
              <p className="text-foreground"><strong className="text-gold">永遠第一人稱</strong> — 用第一人稱撰寫你的關於區塊。它創造溫暖和連接。第三人稱感覺冷漠和不人性化。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-foreground"><strong className="text-gold">評論為王</strong> — 如果你在 LinkedIn 上只能做一件事，每天用有意義的見解評論。它比單獨發文建立更多關係。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🤝</p>
              <p className="text-foreground"><strong className="text-gold">80/20 一切</strong> — 80% 幫助他人，20% 關於你。這適用於內容、參與和社交。</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">📊</p>
              <p className="text-foreground"><strong className="text-gold">保持至少 80% 的內容是資訊性的</strong> — 不超過 20% 是促銷性的。如果每篇貼文都是銷售說詞，人們會忽略你。</p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Limits Reference */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 text-center">
            快速參考：字元數
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left text-foreground">區塊</th>
                  <th className="border border-border p-3 text-left text-foreground">字元限制</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 text-foreground">標題</td>
                  <td className="border border-border p-3 text-gold font-semibold">70-90 字元</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">關於</td>
                  <td className="border border-border p-3 text-gold font-semibold">800-1,200 字元</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">經歷（每個）</td>
                  <td className="border border-border p-3 text-gold font-semibold">600-800 字元</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">技能</td>
                  <td className="border border-border p-3 text-gold font-semibold">最多 50 項技能</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">照片</td>
                  <td className="border border-border p-3 text-gold font-semibold">最小 400 × 400 像素</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">橫幅</td>
                  <td className="border border-border p-3 text-gold font-semibold">1584 × 396 像素</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm italic">
            這份迷你指南基於 Sandra Long 的《LinkedIn 個人品牌終極指南》。如需包含額外範例、案例研究和進階策略的完整框架，請取得完整書籍。
          </p>
        </div>
      </section>

      <GuideShareButtons isZhTw />

      <InlineRating contentId="guide_linkedin_zhtw" locale="zh-tw" />

      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default LinkedInGuideZhTw;