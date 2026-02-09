import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import LanguageToggle from "@/components/LanguageToggle";

const SalaryStarterKitZhTw = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="bg-nav-green py-4 px-5 md:px-6 sticky top-0 z-50">
        <div className="container mx-auto max-w-4xl flex items-center justify-between">
          <Link 
            to="/zh-tw" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            首頁
          </Link>
          <LanguageToggle />
        </div>
      </nav>

      {/* Hero */}
      <section className="bg-executive-green py-16 md:py-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4 leading-tight">
            下一次 Offer，多談 20-30%
          </h1>
          <p className="text-lg md:text-xl text-cream-90 max-w-3xl mx-auto">
            每個薪資對話的逐字話術。複製、填空、寄出。
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="prose prose-lg max-w-none">
            <p className="text-foreground text-lg leading-relaxed">
              全部給你。每一套話術、每一個模板、每一個我教的策略。沒有付費牆、沒有附帶條件。下次面試、評估 offer、或準備績效考核時，直接拿來用。
            </p>
            <p className="text-foreground text-lg leading-relaxed">
              覺得有幫助的話，分享給需要的人。等你在談一個重要的轉職，來找我。
            </p>
            <p className="text-foreground text-lg font-semibold">James</p>
          </div>
        </div>
      </section>

      {/* How to Use This Guide */}
      <section className="py-12 px-5 md:px-6 bg-muted">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">如何使用這份指南</h2>
          <p className="text-foreground mb-6">這份指南按照薪資談判的自然流程編排：</p>
          <ol className="space-y-3 text-foreground">
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
              <span><strong>拿到 offer 之前：</strong>被問薪資期望時怎麼回答</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
              <span><strong>拿到 offer 的那一刻：</strong>改變一切的 30 秒回應</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
              <span><strong>評估完整的薪酬方案：</strong>藏在你 offer 裡的錢</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">4</span>
              <span><strong>寄出你的還價信：</strong>4 封直接複製的 email 範本</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">5</span>
              <span><strong>對方拒絕時：</strong>應對 4 種最常見回絕的話術</span>
            </li>
            <li className="flex gap-3">
              <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">6</span>
              <span><strong>之後爭取加薪：</strong>從第一天就開始累積籌碼</span>
            </li>
          </ol>
          <p className="text-muted-foreground mt-6 italic">
            以下所有內容使用台灣市場數據（NT$）。這些話術在任何職級都適用。準備越充分，效果越好。
          </p>
        </div>
      </section>

      {/* Part 1 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 1：被問薪資期望時怎麼回答</h2>
          <p className="text-foreground mb-6">
            這個問題幾乎在每個求職流程中都會出現。你怎麼回答，會讓 offer 差到 NT$3,000 到 10,000/月。算上獎金，一年下來就是 NT$50K 到 150K 以上，永遠拿不回來。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">為什麼絕對不要直接回答</h3>
          <p className="text-foreground mb-4">
            你開口說出一個數字的那一刻，就等於設了天花板。如果對方的預算是 NT$55K/月，而你說了 NT$45K，你剛剛讓自己少了 NT$120,000/年。還沒算獎金。
          </p>
          <p className="text-foreground mb-8">
            你可能覺得自己沒有籌碼去閃避這個問題。你有。這些話術在每個職級都管用，因為它們是專業的，不是咄咄逼人的。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">5 種情境的應對話術</h3>

          {/* Script 1 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">① 第一次被問</p>
            <p className="text-muted-foreground mb-2">對方：「可以分享一下你的薪資期望嗎？」</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「目前我比較想先了解這個職位的內容和我能怎麼貢獻。薪酬當然重要，但我希望在討論具體數字之前，先了解更多關於職責、團隊和期望。」
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              這招有效是因為你不是在逃避，你是在引導方向。你聽起來像一個重視工作內容的人。
            </p>
          </div>

          {/* Script 2 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">② 對方繼續追問</p>
            <p className="text-muted-foreground mb-2">對方：「我們只是想確認雙方在同一個範圍。」</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「等我們確認我是適合的人選之後，我很樂意討論薪酬。請問這個職位的薪資範圍是多少？」
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              你翻轉了局面。現在是他們透露預算，而不是把你壓低。
            </p>
          </div>

          {/* Script 3 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">③ 對方不肯退讓</p>
            <p className="text-muted-foreground mb-2">對方：「我們需要一個數字才能往下走。」</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「我很彈性，也願意接受有競爭力的條件。我知道薪酬會根據經驗和貢獻有所不同。你們這個職位目標的範圍是多少？」
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              注意這個模式：每一套話術都以一個反問結尾。
            </p>
          </div>

          {/* Script 4 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-gold font-semibold mb-3">④ 你不得不說一個數字</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「根據我的研究和產業基準，同類職位這個等級的月薪通常在 NT$[X] 到 [Y]，但我願意就整體薪酬方案做討論，包括獎金和福利。」
            </p>
            <p className="text-muted-foreground mt-3 text-sm italic">
              小技巧：把你滿意的月薪加上 10 到 20%。這樣對方有空間把你「談下來」到你的目標。記得用年薪的框架來表達。年終獎金會多出 2 到 4 個月以上。
            </p>
          </div>

          {/* Script 5 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-gold font-semibold mb-3">⑤ 申請表上要求填數字</p>
            <p className="text-foreground bg-muted p-4 rounded-lg">
              填「面議」或「依公司規定」。如果欄位只接受數字，根據市場調研填一個範圍。絕對不要填你目前的薪水。
            </p>
          </div>

          {/* Pattern insight */}
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-6 mb-6">
            <p className="text-foreground">
              <span className="font-semibold text-gold">💡 每套話術背後的共同模式：</span>每一套話術都以一個把球丟回對方的問題結尾。你不是在刁難。你是一個做過功課的專業人士。這在基層和高階都一樣有效。
            </p>
          </div>

          <p className="text-foreground">
            <strong>給女性的建議：</strong>不要說「我想要」。試試看「我的研究顯示這個職位通常的薪酬是……」引用外部數據（104人力銀行、Glassdoor）把焦點從你個人轉移到市場行情。
          </p>
        </div>
      </section>

      {/* Part 2 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 2：對方開出數字後的 30 秒</h2>
          <p className="text-foreground mb-4">
            你通過了面試。他們要你了。然後 HR 說：
          </p>
          <p className="text-foreground bg-card p-4 rounded-lg border border-border mb-6 font-medium">
            「我們想提供你月薪 NT$[X]。」
          </p>
          <p className="text-foreground mb-8">
            這是你職業生涯中最貴的一刻。大多數人在這裡搞砸。要嘛說「好，沒問題！」（你剛剛把 NT$50 到 150K/年留在桌上了），要嘛慌張地脫口說出一個隨便的數字。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">3 步驟 Offer 回應法</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">第 1 步：複述那個數字</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">你：「NT$[X]……」</p>
              <p className="text-muted-foreground mt-3 text-sm">語氣帶一點思考的味道。不是震驚。像是你在仔細消化。</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">第 2 步：沉默 15 到 30 秒</p>
              <p className="text-foreground">
                這會讓你很不舒服。這正是它有效的原因。招募人員的大腦會開始和自己的 offer 過不去。很多時候，他們會主動補充（「當然，這還不包括年終獎金……」）或者在你回應之前就改善數字。
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-3">第 3 步：用熱情加一個問題回應</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                你：「謝謝，我對這個機會和團隊非常期待。我想花一兩天時間好好看完整個方案。請問你們能把完整的 offer 細節以書面寄給我嗎？包括獎金結構和福利。」
              </p>
              <p className="text-muted-foreground mt-3 text-sm">就這樣。你沒有說好。你沒有說不好。你爭取到了時間來準備一個真正的還價。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">千萬不要這樣做</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <ul className="space-y-2 text-foreground">
              <li>❌ 說「聽起來很棒！」。你剛剛沒談判就接受了。</li>
              <li>❌ 毫無準備地脫口說出還價。你聰起來很慌。</li>
              <li>❌ 說「我目前月薪 NT$X」。把你釘在一個不相關的數字上。</li>
              <li>❌ 在電話或 LINE 上談。你會失去沉著，也無法仔細看細節。</li>
              <li>❌ 覺得有壓力要當場回答。花時間考慮是正常且被期待的。</li>
            </ul>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-executive">🔰 職涯初期提醒：</span>你可能在想：「我還很菜，我沒有籌碼去推回去。」真相是：公司已經決定要錄用你了。他們花了時間和金錢在面試上。他們不想重新來過。這就是你的籌碼，你只是還沒感覺到。沉默技巧不分資歷深淺都有效，因為這不是關於權力，而是給自己時間思考。
            </p>
          </div>
        </div>
      </section>

      {/* Part 3 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 3：藏在你 Offer 裡的錢</h2>
          <p className="text-foreground mb-4">
            大部分在台灣拿到 offer 的人，只看一個數字：月薪。然後談（或不談）這個數字就結束了。
          </p>
          <p className="text-foreground mb-8">
            這是一個錯誤。月薪只是你年度總薪酬的一塊。有些部分更容易談，因為它們不會碰到公司的薪資結構。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">影響最大的項目</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">月薪（本薪）</p>
              <p className="text-muted-foreground">所有獎金的計算基礎。年終獎金、加班費、保險提撥都是從本薪計算的。即使只多 NT$3,000/月，每年多 NT$36K 底薪，加上更高的獎金。</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">年終獎金</p>
              <p className="text-muted-foreground">台灣薪酬中變化最大的一項。法定最低半個月。大多數科技公司發 2 到 4 個月。表現好的人在台積電、聯發科等公司拿到 6 到 10 個月以上。永遠要問：「這個職位去年的平均年終是幾個月？」</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">員工分紅</p>
              <p className="text-muted-foreground">在很多台灣科技公司，這才是大錢。在聯發科或聯詠這類公司，分紅讓你的實際年薪翻倍是常見的。要問：「這個職等通常的分紅大概是多少？」</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="font-semibold text-foreground mb-2">簽約獎金</p>
              <p className="text-muted-foreground">基層職位比較少見，但越來越多公司提供。對公司來說是一次性成本，比調底薪更容易談。</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">容易拿到的項目</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• 伙食津貼和交通補助</li>
              <li>• 遠端工作或彈性工時</li>
              <li>• 專業發展預算（訓練、研討會、證照）</li>
              <li>• 提前績效考核（6 個月而非 12 個月）</li>
              <li>• 設備補助（筆電、手機、居家辦公設備）</li>
              <li>• 團保升級，包括牙齒、健檢、眷屬保險</li>
              <li>• 超過勞基法最低標準的額外年假</li>
            </ul>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6 mb-8">
            <p className="text-foreground mb-4">
              <span className="font-semibold text-executive">🔰 職涯初期提醒：優先拉哪些項目</span>
            </p>
            <p className="text-foreground mb-3">如果你是比較資淺的新人，最強的談判切入點是：</p>
            <ol className="space-y-2 text-foreground">
              <li><strong>1. 年終獎金保底。</strong>要求一個保證的最低數字（例如 2 個月，而不是模糊的「看表現」）。這招特別有效，因為它不會改變你的職等。</li>
              <li><strong>2. 提前考核。</strong>「我們是否安排 6 個月的考核，而不是等 12 個月？我希望能更早展現我的價值。」這表現出企圖心，也讓你更快有機會加薪。</li>
              <li><strong>3. 培訓發展預算。</strong>公司樂於投資新人。要求 NT$20,000 到 50,000 的課程、證照或研討會預算。這對他們來說很容易答應，而且讓你更快成長。</li>
            </ol>
            <p className="text-foreground mt-3">不要一次談所有項目。選一個，得到結果，再談下一個。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">如何計算你的年度總薪酬</h3>
          <p className="text-foreground mb-4">大多數人不知道的公式：</p>
          <div className="bg-executive text-cream p-6 rounded-xl mb-6 font-mono text-sm">
            <p>年度總薪酬 =</p>
            <p className="pl-4">月薪 × 保障月數（通常 14 個月）</p>
            <p className="pl-4">+ 超出保障的年終獎金</p>
            <p className="pl-4">+ 員工分紅</p>
            <p className="pl-4">+ 股票 / ESPP 年度價值</p>
            <p className="pl-4">+ 簽約獎金（僅第一年）</p>
            <p className="pl-4">+ （伙食津貼 + 交通補助）× 12</p>
          </div>

          <p className="text-foreground font-semibold mb-4">範例，兩個看起來一樣但完全不同的 offer：</p>
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-muted">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">你實際拿到的錢</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Offer A</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">Offer B</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">月薪</td><td className="px-4 py-3">NT$50,000</td><td className="px-4 py-3">NT$48,000</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">保障年終獎金</td><td className="px-4 py-3">NT$50,000（1 個月）</td><td className="px-4 py-3">NT$96,000（2 個月）</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">平均績效年終獎金</td><td className="px-4 py-3">NT$25,000</td><td className="px-4 py-3">NT$96,000</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">員工分紅</td><td className="px-4 py-3">NT$0</td><td className="px-4 py-3">NT$100,000</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">伙食津貼（年度）</td><td className="px-4 py-3">NT$28,800</td><td className="px-4 py-3">NT$28,800</td></tr>
                <tr className="border-t border-border bg-gold text-white font-bold"><td className="px-4 py-3">年度總薪酬</td><td className="px-4 py-3">NT$703,800</td><td className="px-4 py-3">NT$896,800</td></tr>
                <tr className="border-t border-border bg-executive text-cream font-bold"><td className="px-4 py-3">等效月薪</td><td className="px-4 py-3">NT$58,650</td><td className="px-4 py-3">NT$74,733</td></tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-gold">💡 重點：</span>Offer B 的月薪少了 NT$2,000。但一年實際多放 NT$193,000 進你口袋。永遠不要只用月薪比較 offer。
            </p>
            <p className="text-foreground mt-3">
              問 HR：「去年這個職位的平均年終總共發了幾個月？」這會告訴你保障加績效的總金額。
            </p>
          </div>
        </div>
      </section>

      {/* Part 4 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 4：還價信</h2>
          <p className="text-foreground mb-8">
            拿到書面 offer 之後，用以下的 email。四個版本對應四種情境。選適合的，把 [括號] 換掉，直接寄。
          </p>

          {/* Version 1 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">版本 1：標準還價</h3>
            <p className="text-muted-foreground mb-4 text-sm">適用：你有一個 offer，想要談條件。</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>主旨：</strong>Offer 後續討論</p>
              <p>[HR 名字] 你好，</p>
              <p>非常感謝 offer，我對加入 [公司名稱] 並為 [團隊/專案] 貢獻感到很興奮。</p>
              <p>仔細看過 offer 之後，我希望能討論一些調整，讓條件更貼近市場行情和我的經驗。</p>
              <p>根據我在 104人力銀行和 Glassdoor 上的研究，我的期望是：</p>
              <p><strong>月薪：</strong>NT$[目標]，以更貼近這個職位和經驗等級的市場範圍</p>
              <p>我很期待能進一步討論有哪些彈性空間。我對團隊有信心，相信我們能找到雙方都滿意的方案。</p>
              <p>請讓我知道方便的時間。</p>
              <p>祝好，<br />[你的名字]</p>
            </div>
          </div>

          {/* Version 2 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">版本 2：你有其他 Offer</h3>
            <p className="text-muted-foreground mb-4 text-sm">適用：你手上有另一家公司的書面 offer。</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>主旨：</strong>Offer 後續，補充資訊</p>
              <p>[HR 名字] 你好，</p>
              <p>再次感謝 [公司名稱] 的 offer，我對這個職位和團隊在 [專案] 上的工作很期待。</p>
              <p>我想坦誠告知：我收到了另一個 offer，年度總薪酬大約 NT$[對方 TC]。我分享這個不是要下最後通牒，而是因為 [公司名稱] 仍然是我的首選，我希望能找到讓它成行的方式。</p>
              <p>根據對方的 offer 和市場數據，我希望能討論調整：</p>
              <p><strong>月薪：</strong>NT$[目標]，讓年度總薪酬更接近</p>
              <p>我對自己能為 [團隊] 帶來的價值有信心，也希望了解有哪些彈性空間，讓我能全心投入 [公司名稱]。</p>
              <p>祝好，<br />[你的名字]</p>
            </div>
          </div>

          {/* Version 3 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <h3 className="font-heading text-lg text-gold mb-2">版本 3：目前待業中或轉職空窗期</h3>
            <p className="text-muted-foreground mb-4 text-sm">適用：你不想讓目前的狀態削弱你的談判位置。</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>主旨：</strong>Offer 後續討論</p>
              <p>[HR 名字] 你好，</p>
              <p>非常感謝 offer，我對能將我在 [領域] 的經驗帶到 [公司名稱] 並為 [團隊/專案] 做出貢獻感到興奮。</p>
              <p>看完整個方案後，我希望能討論一項調整。根據我在 104人力銀行、Glassdoor 以及與業界同行的交流，這個職位的市場範圍是月薪 NT$[X] 到 [Y]。以我在 [具體成就與數據] 方面的成績，我認為月薪 NT$[目標] 更能反映我將帶來的價值。</p>
              <p>我期待加入團隊，也相信我們能找到雙方都滿意的方案。</p>
              <p>祝好，<br />[你的名字]</p>
            </div>
          </div>

          {/* Version 4 */}
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <h3 className="font-heading text-lg text-gold mb-2">版本 4：社會新鮮人</h3>
            <p className="text-muted-foreground mb-4 text-sm">適用：你是剛畢業的新鮮人，經驗有限但準備充足。</p>
            <div className="bg-muted p-4 rounded-lg text-foreground text-sm space-y-3">
              <p><strong>主旨：</strong>Offer 後續討論</p>
              <p>[HR 名字] 你好，</p>
              <p>非常感謝 offer，我對能在 [公司名稱] 開始職涯並為 [團隊/專案] 貢獻感到興奮。</p>
              <p>看過 offer 之後，我希望能討論這個方案。根據我在 104人力銀行和 CakeResume 上的研究，[城市] 的初階 [職位] 市場範圍是月薪 NT$[X] 到 [Y]。以我的 [相關實習/論文專案/證照/技能]，我認為 NT$[目標] 更能反映我從第一天起能做出的貢獻。</p>
              <p>如果底薪受到職等限制，我也想討論保障年終獎金最低數字或提前 6 個月績效考核的可能性。</p>
              <p>我期待加入團隊，也相信我們能找到雙方都滿意的方案。</p>
              <p>祝好，<br />[你的名字]</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">每封還價信的 5 條規則</h3>
          <div className="bg-card rounded-xl p-6 border border-border">
            <ol className="space-y-3 text-foreground">
              <li><strong>1. 開頭展現熱忱。</strong>讓他們知道你不是要走人。</li>
              <li><strong>2. 一封信只提一個要求。</strong>底薪談完之後，再另外跟進下一個項目。</li>
              <li><strong>3. 用市場數據，不用個人需求。</strong>「產業基準顯示……」不是「我需要付房租」。</li>
              <li><strong>4. 結尾留開放空間。</strong>「我很期待討論」不是「我需要週五前得到答覆」。</li>
              <li><strong>5. 即使你很滿意，也問一句：</strong>「方案中有哪些部分有彈性空間嗎？」答案通常是有的。</li>
            </ol>
          </div>
        </div>
      </section>

      {/* Part 5 */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 5：對方拒絕你的還價時</h2>
          <p className="text-foreground mb-4">
            你寄出了還價信。然後 HR 說了類似這樣的話：「很抱歉，這是這個職等的標準方案。」
          </p>
          <p className="text-foreground mb-8">
            大多數人聽到這裡就覺得結束了。通常不是。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-6">4 種最常見的拒絕說法</h3>

          <div className="space-y-4 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">① 「這是這個職等的標準薪資。」</p>
              <p className="text-muted-foreground mb-3 text-sm">翻譯：底薪被鎖在職等裡。但獎金和考核時間通常不是。</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                你：「我理解薪資結構。如果月薪是固定的，那保障年終獎金或第一次績效考核的時間有彈性嗎？提前考核讓我更早展現我的價值。」
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">② 「我們的預算有限。」</p>
              <p className="text-muted-foreground mb-3 text-sm">翻譯：底薪預算鎖死了。但簽約獎金和培訓預算通常來自不同的口袋。</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                你：「我完全理解預算限制。我也知道類似的職位在可比較的公司提供的方案大約在 NT$[X 到 Y] 的範圍。如果底薪固定的話，年終保障或培訓預算有調整空間嗎？」
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">③ 「這已經是很有競爭力的條件了。」</p>
              <p className="text-muted-foreground mb-3 text-sm">翻譯：「有競爭力」代表在範圍內。不代表在頂端。</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                你：「我同意這是一個好 offer，也很感謝。根據這個職位的市場數據，我的期望比較接近月薪 NT$[X]。我希望能一起找到一個能反映這個水準的方案。」
              </p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-gold font-semibold mb-2">④ 「我們需要維持內部公平性。」</p>
              <p className="text-muted-foreground mb-3 text-sm">翻譯：薪資職等是硬的。非薪資項目才是你的談判空間。</p>
              <p className="text-foreground bg-muted p-4 rounded-lg">
                你：「這完全合理。既然內部公平性很重要，我們是否看看保障 2 個月年終獎金或提前考核週期？這些不會影響薪資結構，但能幫助讓整體方案更到位。」
              </p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">有競爭 Offer 時的話術</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「我想坦誠告訴你，我收到了另一個蠻有吸引力的 offer。不過 [公司名稱] 仍然是我的首選。有沒有彈性讓 offer 更接近？」
            </p>
            <p className="text-muted-foreground mt-3 text-sm">沒有最後通牒，沒有威脅。你給他們一個動起來的理由，同時讓他們知道你想留在這裡。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">延長期限的話術</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「我很感謝這個 offer，也很期待這個機會。職涯決定對我來說很重要。是否有辦法延長一週的期限，讓我好好評估？」
            </p>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-executive">🔰 職涯初期提醒：</span>如果你比較資淺，你可能覺得推回去有風險。不會。因為有人專業地、有數據支持地談判就撤回 offer，這幾乎不會發生。招募人員本來就預期你會談。如果一家公司因為你問了一個專業的、有數據的問題就撤回 offer，那已經告訴你這家公司文化的一切了。
            </p>
            <p className="text-foreground mt-3">
              不談判才是風險。第一份薪水會成為未來每一次加薪、獎金、和新 offer 的基準線，持續好幾年。
            </p>
          </div>
        </div>
      </section>

      {/* Part 6 */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Part 6：加薪，從第一天就開始</h2>
          <p className="text-foreground mb-4">
            前面 5 個部分是關於談新 offer。但你職涯的大部分收入，來自於你入職之後。
          </p>
          <p className="text-foreground mb-8">
            不舒服的真相：你的主管沒有在想你的薪水。表現好不等於自動加薪。尤其在台灣的年度考核制度下。你必須自己建立論述。最好的時機是從第一週開始。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">5 分鐘週五習慣</h3>
          <p className="text-foreground mb-4">每週五下午 4:30，花 5 分鐘寫下你這週的成果。要具體：</p>
          
          <div className="overflow-x-auto mb-6">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">❌ 模糊</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">✅ 具體</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">做了專案</td><td className="px-4 py-3">交付用戶認證模組，比截止日期提前 3 天</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">開了會</td><td className="px-4 py-3">主持跨團隊同步會議，解決了 API 整合的 2 週阻塞</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">幫了同事</td><td className="px-4 py-3">帶新人做第一次 code review。她現在獨立 review 了</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">做了業務</td><td className="px-4 py-3">成交 [客戶] NT$800K 案子。本季最短銷售週期</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">修了 bug</td><td className="px-4 py-3">45 分鐘內解決 P1 線上事故。影響 12K 用戶</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-foreground mb-4">用一個簡單的記錄表追蹤：</p>
          <div className="overflow-x-auto mb-4">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">日期</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">成就</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">影響 / 數據</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">類別</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">_______</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">_______________________________________</td><td className="px-4 py-3">💰 ⚡ 👥 💡</td></tr>
              </tbody>
            </table>
          </div>
          <p className="text-muted-foreground mb-6 text-sm">類別：💰 營收。⚡ 效率。👥 領導力。💡 創新。</p>
          <p className="text-foreground mb-8">6 個月後你會有 120 條以上的成果記錄。比 99% 的人在加薪對話中能拿出的證據都多。</p>

          <h3 className="font-heading text-xl text-foreground mb-4">讓你的工作被看見（提出前 2 到 3 個月）</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• 達成里程碑時，簡短回報主管：「快速更新：新模組上線了，處理時間減少 35%」</li>
              <li>• 主動參加簡報或跨團隊專案。</li>
              <li>• 如果你自動化了什麼、訓練了人、或節省了開支，確保你的主管知道。</li>
            </ul>
            <p className="text-muted-foreground mt-4 text-sm italic">這不是自吹自擂。這是確保決策者在預算分配的時候有他需要的資訊。</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">選對時機</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-8">
            <ul className="space-y-2 text-foreground">
              <li>• 剛完成重大成果之後（影響力最明顯的時候）。</li>
              <li>• 當你的職責已經超出原本的角色範圍。</li>
              <li>• 年度考核前 1 到 2 個月（大多數台灣公司 Q4 考核，1 月調薪）。</li>
              <li>• 主管公開肯定你的成果之後。</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">加薪話術</h3>
          <p className="text-foreground mb-2">不要說：「我覺得我應該加薪，因為我一直很努力。」</p>
          <p className="text-foreground mb-4">這樣說：</p>
          <div className="bg-card rounded-xl p-6 border border-border mb-4">
            <p className="text-foreground bg-muted p-4 rounded-lg">
              你：「在過去 [期間]，我 [具體成就加上數字]。根據 104人力銀行和 Glassdoor 的市場數據，類似的職位薪酬在 NT$[X 到 Y]/月。我希望能討論調整我的薪酬，以反映我的貢獻並貼近市場行情。」
            </p>
          </div>
          <p className="text-foreground mb-4">這招有效是因為你說的話你主管能直接轉述給他的主管。你是在給他說服上層的理由，不是在做個人訴求。</p>
          <p className="text-foreground mb-8">
            <strong>台灣特別提醒：</strong>如果你的公司有嚴格的薪資職等制度，爭取升等或升 title 而不是調薪。這會解鎖一個更高的薪資級距。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">如果他們說不</h3>
          <div className="bg-card rounded-xl p-6 border border-border mb-6">
            <p className="text-foreground bg-muted p-4 rounded-lg mb-4">
              你：「我理解。那要達到什麼樣的目標或里程碑，才能在下一個考核週期調整薪酬呢？我想確保我們有共識。」
            </p>
            <p className="text-foreground">把他們的回答留下書面記錄。這就建立了問責。</p>
            <p className="text-foreground mt-3">如果薪水凍結了，轉向：額外年假、培訓預算、彈性工作、title 調整、或保障獎金的改善。這些通常不受凍薪影響。</p>
          </div>

          <div className="bg-executive/10 border-l-4 border-executive rounded-r-xl p-6">
            <p className="text-foreground mb-3">
              <span className="font-semibold text-executive">🔰 職涯初期提醒：你的第一次加薪</span>
            </p>
            <p className="text-foreground">
              第一次加薪是最難開口的，也是最重要的。越早建立「你會談判」的模式，你的薪酬就越會複利成長。第一年加薪 NT$5,000/月等於每年多 NT$60K。但算上以底薪計算的獎金，更接近 NT$80 到 100K/年。十年下來，那一次對話價值 NT$800K 到 1M 以上。
            </p>
            <p className="text-foreground mt-3 font-semibold">
              從第一天就開始記成就。不是等你「覺得準備好了」。不是等你「證明了自己」。第一天。
            </p>
          </div>
        </div>
      </section>

      {/* Taiwan Salary Benchmarks */}
      <section className="py-12 px-5 md:px-6 border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">台灣薪資基準（2025）</h2>
          <p className="text-foreground mb-6">
            準備話術時參考這些數據。<span className="text-muted-foreground italic">免責聲明：這些範圍基於我面試和輔導過的候選人，他們大多在台灣的美商或跨國公司任職。這些數據比台灣市場平均值偏高。如果你的目標是本土公司，預期值下調 15 到 30%，並以 104人力銀行或 CakeResume 驗證。務必自己針對你的職位、公司和城市做研究。</span>
          </p>

          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-executive text-cream">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold">等級</th>
                  <th className="text-left px-4 py-3 font-semibold">月薪（NT$）</th>
                  <th className="text-left px-4 py-3 font-semibold">約年度總薪酬（NT$）</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">應屆畢業（0 到 1 年）</td><td className="px-4 py-3">38K 到 52K</td><td className="px-4 py-3">550K 到 800K</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">初階（1 到 3 年）</td><td className="px-4 py-3">45K 到 65K</td><td className="px-4 py-3">700K 到 1.1M</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">中階（3 到 5 年）</td><td className="px-4 py-3">65K 到 95K</td><td className="px-4 py-3">1.1M 到 1.7M</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">資深（5 到 10 年）</td><td className="px-4 py-3">90K 到 140K</td><td className="px-4 py-3">1.5M 到 2.5M</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">Staff / Principal（10 年以上）</td><td className="px-4 py-3">120K 到 200K+</td><td className="px-4 py-3">2M 到 4M+</td></tr>
                <tr className="border-t border-border bg-gold/20"><td className="px-4 py-3 font-semibold">頂尖（台積電、聯發科等）</td><td className="px-4 py-3">差異很大</td><td className="px-4 py-3">2.5M 到 5M+</td></tr>
              </tbody>
            </table>
          </div>

          <p className="text-foreground mb-6">
            年度總薪酬 = 底薪 × 保障月數 + 年終獎金 + 員工分紅 + 津貼。半導體和 IC 設計公司因為分紅和員工獎金，數字會明顯偏高。
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">查薪資的管道：</h3>
          <div className="bg-card rounded-xl p-6 border border-border">
            <ul className="space-y-2 text-foreground">
              <li>• <strong>104人力銀行</strong> (104.com.tw)，台灣最大求職網站，有依職位分類的薪資範圍</li>
              <li>• <strong>CakeResume</strong>，科技業導向，用戶回報薪資</li>
              <li>• <strong>Glassdoor</strong>，外商和跨國公司在台灣的數據</li>
              <li>• <strong>Levels.fyi</strong>，大型科技公司薪酬數據，部分有台灣條目</li>
              <li>• <strong>Salary.tw</strong>，社群回報薪資</li>
              <li>• <strong>Dcard 工作版</strong>，論壇討論含薪資資料（引用前請驗證）</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 px-5 md:px-6 bg-muted border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">快速參考：所有話術一頁整理</h2>
          <p className="text-muted-foreground mb-8">存到手機裡，通話時即時參考。</p>

          <h3 className="font-heading text-lg text-foreground mb-4">閃避薪資問題</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">情境</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">你說</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">第一次被問</td><td className="px-4 py-3">「我想先了解更多職位內容再討論數字。」</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">對方追問</td><td className="px-4 py-3">「請問這個職位的薪資範圍是多少？」</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">不肯退讓</td><td className="px-4 py-3">「我很彈性。你們目標的範圍是多少？」</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">一定要說數字</td><td className="px-4 py-3">「根據基準，NT$[X] 到 [Y]，但我願意談整體方案。」</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">書面申請</td><td className="px-4 py-3">填「面議」或根據市場調研填範圍</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">回應 Offer</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">步驟</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">動作</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">1</td><td className="px-4 py-3">複述：「NT$[X]……」（帶一點思考的語氣）</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">2</td><td className="px-4 py-3">沉默：15 到 30 秒</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">3</td><td className="px-4 py-3">「我很興奮。請把完整 offer 書面寄給我。」</td></tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">應對拒絕</h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm border border-border rounded-lg overflow-hidden">
              <thead className="bg-card">
                <tr>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">對方說</th>
                  <th className="text-left px-4 py-3 font-semibold text-foreground">你說</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-t border-border"><td className="px-4 py-3">「最好的條件了」</td><td className="px-4 py-3">「如果底薪固定，獎金或考核時間有彈性嗎？」</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">「沒預算」</td><td className="px-4 py-3">「年終保障或簽約獎金有空間嗎？」</td></tr>
                <tr className="border-t border-border"><td className="px-4 py-3">「已經很有競爭力了」</td><td className="px-4 py-3">「根據市場數據，我的期望比較接近 NT$[X]。」</td></tr>
                <tr className="border-t border-border bg-muted/50"><td className="px-4 py-3">「內部公平性」</td><td className="px-4 py-3">「保障獎金或提前考核有空間嗎？」</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* Closing */}
      <section className="py-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">最後一件事</h2>
          <p className="text-foreground mb-4">
            這份指南裡的每一套話術都有用。我知道，因為我看過人們用過。跨產業、跨資歷、跨公司類型。唯一沒用的，是不去試。
          </p>
          <p className="text-foreground mb-8">
            如果這份指南對你有幫助，分享給正在找工作或準備考核的朋友。如果你未來想一起合作，當你在談一個高風險的轉職，想要有人在你身邊幫你準備，你知道哪裡找到我。
          </p>
          <p className="text-foreground font-semibold mb-8">James</p>
          <p className="text-muted-foreground italic text-sm">
            這份指南是為我想幫助、但目前沒辦法合作的人做的。裡面包含我在付費教練課程中使用的每一個框架、話術和模板。沒有附帶條件。
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">準備好談下一個 Offer 了嗎？</h2>
          <p className="text-cream-90 mb-6">取得完整的薪資談判工具包，附互動式模板。</p>
          <Link to="/toolkit">
            <Button className="btn-gold px-8 py-3 h-auto">
              查看完整工具包
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-muted-foreground text-sm">
            來自{" "}
            <Link to="/zh-tw" className="text-gold hover:underline">James Bugden</Link>{" "}
            的薪資談判指南
          </p>
        </div>
      </footer>
    </div>
  );
};

export default SalaryStarterKitZhTw;
