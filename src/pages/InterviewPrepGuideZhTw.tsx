import { ArrowLeft, Clock, Users, Lightbulb, Target, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";

const InterviewPrepGuideZhTw = () => {
  useTrackGuideProgress("interview-prep");
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
              onClick={() => navigate("/interview-prep-guide")}
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
            10 小時面試準備系統
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            你準備面試真正需要的檢查清單
          </p>
          <p className="text-base text-cream/60 mb-2">
            James Bugden｜Uber 資深招募顧問
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">20 分鐘閱讀</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="zh" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            框架說明：本系統基於 Sam Owens 的《I Hate Job Interviews》方法論，並結合我親自參與 500+ 錄用決策、20,000+ 份履歷審閱的第一線招募經驗加以改寫。
          </p>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            為什麼這套方法有效
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            在我的職涯中，我已經錄用了超過 500 人。真正拿到 offer 的候選人，不一定是最厲害的那個。<span className="text-gold font-semibold">而是準備最充分的那個。</span>
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            大多數人只花 1 小時準備。你接下來要花 10 小時。
          </p>
          <p className="text-xl md:text-2xl font-heading text-gold">
            這就是你的優勢。
          </p>
        </div>
      </section>

      {/* 10-Hour Breakdown Header */}
      <section className="py-8 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream">
            你的 10 小時配置表
          </h2>
        </div>
      </section>

      {/* RESEARCH Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">研究</h2>
              <p className="text-gold font-medium">共 3 小時</p>
            </div>
          </div>

          {/* Hour 1 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">第 1 小時：</span>公司基本功
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">公司歷史與使命</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">產品／服務（能用就親自用）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">近期新聞（過去 3 個月）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">財務概況（營收、成長，了解重點即可）</span>
              </li>
            </ul>
          </div>

          {/* Hours 2-3 */}
          <div className="mb-6">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">第 2–3 小時：</span>和內部員工聊
            </h3>
            <p className="text-foreground mb-4">
              <span className="font-semibold text-gold">這是你的秘密武器。</span>在 LinkedIn 上主動聯絡 5–10 位在那家公司工作的人。
            </p>
            
            <div className="bg-card border border-border rounded-lg p-5 mb-6">
              <p className="text-sm text-muted-foreground mb-2">私訊範本：</p>
              <p className="text-foreground italic">
                「嗨 [姓名]，我正在面試 [公司] 的 [職位]，想請教你 15 分鐘，分享你的實際工作經驗，不知道方不方便？」
              </p>
            </div>

            <h4 className="font-semibold text-foreground mb-3">可以問的問題：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">真實的公司文化是什麼？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">這個角色「成功」長什麼樣子？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">團隊目前最大的挑戰是什麼？</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">對面試者有什麼建議？</span>
              </li>
            </ul>

            <p className="text-muted-foreground italic">
              大多數人不會回你。你只需要 1–2 個願意回覆的人就夠了。
            </p>
          </div>
        </div>
      </section>

      {/* FORMULATION Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">內容建構</h2>
              <p className="text-gold font-medium">共 3 小時</p>
            </div>
          </div>

          {/* Hour 1: Power Examples */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">第 1 小時：</span>打造你的關鍵實戰案例
            </h3>
            <p className="text-foreground mb-4">
              準備 7–10 個故事，證明你「真的能做這份工作」。
            </p>
            
            <h4 className="font-semibold text-foreground mb-3">做法：</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>仔細閱讀職缺說明</li>
              <li>找出他們最在意的 7–10 項能力</li>
              <li>每一項能力，對應你的一個實際經驗故事</li>
            </ol>

            <h4 className="font-semibold text-foreground mb-3">每個故事必須包含：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">明確時間點（例如「2024 年 Q2」，不是「之前」）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">具體數字與指標</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">你做了什麼（不是只有「團隊做了什麼」）</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">可量化的結果</span>
              </li>
            </ul>

            {/* Good Example */}
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green" />
                <span className="font-semibold text-executive-green">好的範例：</span>
              </div>
              <p className="text-foreground text-sm md:text-base">
                「2024 年 Q2，我帶領一個由 5 位工程師與 2 位設計師組成的跨部門團隊，上線新的行動結帳功能。我們只有 6 週期限。第 4 週時，付款 API 整合出現重大技術阻礙，可能導致專案延期。我立刻找來資深後端工程師協助，將非關鍵功能延後到上線後，並重新調整 sprint，專注解決 blocker。我們準時上線，30 天內行動端轉換率提升 35%，每月新增約 20 萬美元營收。」
              </p>
            </div>

            {/* Bad Example */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="font-semibold text-destructive">糟糕的範例：</span>
              </div>
              <p className="text-foreground text-sm md:text-base">
                「我常常跟團隊合作、解決問題。」
              </p>
            </div>
          </div>

          {/* Hours 2-3: Answer Frameworks */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 flex items-center gap-2">
              <span className="text-gold">第 2–3 小時：</span>學會 3 種回答框架
            </h3>

            {/* Framework 1: SPAR */}
            <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                框架一：SPAR
              </h4>
              <p className="text-muted-foreground mb-4 italic">用於「請分享一次你曾經……」的題型</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">S</span>
                  <span className="text-foreground"><strong>情境</strong>（10–15 秒）：交代背景</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">P</span>
                  <span className="text-foreground"><strong>問題</strong>（15–20 秒）：面臨什麼挑戰</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">A</span>
                  <span className="text-foreground"><strong>行動</strong>（60–90 秒）：你實際做了什麼（3 個步驟）</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">R</span>
                  <span className="text-foreground"><strong>結果</strong>（15–20 秒）：量化成果</span>
                </li>
              </ul>
            </div>

            {/* Framework 2: Home Base */}
            <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                框架二：Home Base
              </h4>
              <p className="text-muted-foreground mb-4 italic">用於「你會如何處理……」的假設題（這類題目通常最難）</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-semibold text-foreground mb-2">步驟 1｜建立框架（20–30 秒）</p>
                  <ul className="space-y-1 text-foreground ml-4">
                    <li>「我會用三個階段來處理……」</li>
                    <li>「我會從四個面向來看……」</li>
                    <li>「我的流程會分成三個步驟……」</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground">步驟 2｜展開說明（每一點 60–90 秒）</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">步驟 3｜總結（15–20 秒）</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded p-4">
                <p className="text-sm text-muted-foreground mb-2">範例：</p>
                <p className="text-foreground text-sm">
                  「我會把前 90 天分成三個階段：學習、貢獻、擴大影響。在學習期（第 1–30 天），我會認識利害關係人並找出 quick wins；在貢獻期（第 31–60 天），我會執行這些成果來建立信任；在擴展期（第 61–90 天），我會推動更大的計畫。總結來說，就是：學習、貢獻、擴大。」
                </p>
              </div>
            </div>

            {/* Framework 3: SEE */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                框架三：SEE
              </h4>
              <p className="text-muted-foreground mb-4 italic">用於「你最大的缺點是什麼？」</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">S</span>
                  <span className="text-foreground">直接陳述缺點</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">E</span>
                  <span className="text-foreground">實際例子</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">E</span>
                  <span className="text-foreground">影響與改善</span>
                </li>
              </ul>

              <div className="bg-card border border-border rounded p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">範例：</p>
                <p className="text-foreground text-sm">
                  「我有時候會接太多事情，因為不太會說不。上個季度我同時接了 3 個大型專案，結果常常加班。我學會在答應新任務前，先評估目前的工作量。上個月我因此提早完成 3 個專案，因為我更有策略地選擇該接什麼。」
                </p>
              </div>

              <p className="text-muted-foreground text-sm italic">
                不要說「我是完美主義者」或「我太努力工作」。選一個真實、但不會讓你被刷掉的缺點。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">練習</h2>
              <p className="text-gold font-medium">共 4 小時</p>
            </div>
          </div>

          {/* Hours 1-2 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">第 1–2 小時：</span>自己大聲練習
            </h3>
            <p className="text-foreground mb-4">
              站在鏡子前，用框架回答常見問題：
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「請介紹你自己」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「為什麼想要這份工作？」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「說一次你失敗的經驗」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「你 5 年後想成為什麼樣子？」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「為什麼我們要錄用你？」</span>
              </li>
            </ul>
            <p className="text-muted-foreground italic">
              這會讓你覺得很彆扭。但還是要做。你會發現哪些聽起來怪怪的，現在就能改。
            </p>
          </div>

          {/* Hours 3-4 */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">第 3–4 小時：</span>模擬面試
            </h3>
            <p className="text-foreground mb-4">
              找朋友、同事或家人幫你面試，給他們：
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">你的履歷</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">職缺說明</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">常見面試題清單</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">規則：</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">當成真的面試</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">回答中途不能停</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">最後才給回饋</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">至少做 2 次模擬面試</span>
              </li>
            </ul>

            <p className="text-gold font-semibold">
              這是最重要的一步。它會在真正面試前，先暴露你的弱點。
            </p>
          </div>
        </div>
      </section>

      {/* Day-Of Checklist */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">
            面試當天檢查清單
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試前</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">提早 10–15 分鐘到（不要更多）</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">手機關靜音</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">快速複習你的關鍵案例</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">深呼吸 3 次：吸 1 秒、吐 4 秒</span>
                </li>
              </ul>
            </div>

            {/* During */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">面試中</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">穩定握手、眼神交流、微笑</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">需要思考時，停 2–4 秒再回答</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">注意對方反應（點頭、前傾）</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">坐直、自然使用手勢</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Questions to Ask */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">你可以問他們的問題</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「這個角色在前 6 個月成功的標準是什麼？」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「團隊目前最大的挑戰是什麼？」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">「你最喜歡在這裡工作的哪一點？」</span>
              </li>
            </ul>
          </div>

          {/* Closing */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-heading text-xl text-gold mb-4">結尾</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">重申興趣：「我對這個角色非常有興趣，也很希望能進入下一步。」</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">詢問後續流程</span>
              </li>
            </ul>
            <p className="text-gold font-semibold">
              面試後：24 小時內寄出感謝信。
            </p>
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
              會直接害你拿不到 Offer 的常見錯誤
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>話講太多</strong> – 回答完就停</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>批評前公司</strong> – 保持專業</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒有具體例子</strong> – 一切都要有細節和數字</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>不問問題</strong> – 看起來你不在乎</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒有 follow-up</strong> – 一定要寄感謝信</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>說謊</strong> – 他們一定會發現</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>沒準備</strong> – 這份指南就是為了避免這件事</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-6">
            重點總結
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            面試是一項技能。大多數人準備得不夠。
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            花完這 10 小時。用好這些框架。大聲練習。
          </p>
          <p className="text-xl md:text-2xl text-gold font-heading">
            你的競爭對手沒有這樣做。
          </p>
        </div>
      </section>

      {/* Book Attribution */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground italic">
            本指南基於 Sam Owens《I Hate Job Interviews》的方法論。強烈推薦支持原作者，這是我讀過最好的面試書。
          </p>
        </div>
      </section>


      <GuideShareButtons isZhTw />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="flex items-center gap-6">
              <Link to="/zh-tw" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                首頁
              </Link>
              <Link to="/resume-guide" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                履歷指南
              </Link>
            </div>
            <span className="text-sm text-muted-foreground">
              © 2026 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    
      <GuideBottomCTA lang="zh" />
    </div>
  );
};

export default InterviewPrepGuideZhTw;
