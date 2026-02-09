import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";

const exampleAchievements = [
  { achievement: "主導舊系統遷移到雲端架構", impact: "伺服器成本降低 35%（年省 NT$2.4M）" },
  { achievement: "為行動團隊建立自動化測試流程", impact: "發布週期從 3 週縮短到 5 天" },
  { achievement: "帶 3 位初階工程師完成 onboarding", impact: "3 位都通過試用期。1 位在 8 個月內晉升" },
  { achievement: "交付面向客戶的數據分析儀表板", impact: "第一季度被 12 家企業客戶採用" },
];

const exampleMarketData = {
  currentComp: "NT$78,000/月（年度 TC 約 NT$1.17M）",
  marketRange: "NT$85,000 到 NT$110,000/月",
  source: "104人力銀行、Glassdoor、CakeResume",
  gap: "低於市場中位數 NT$7,000 到 32,000/月",
};

const exampleAsk = {
  primary: "調整月薪到 NT$92,000（市場中位數）",
  alternative: "晉升到資深工程師（解鎖更高的薪資級距）",
  fallback: "保障 3 個月年終獎金 + NT$30,000 培訓預算 + 3 天額外年假",
};

const exampleTalkingPoints = {
  opening: "在過去一年，我主導了雲端遷移，年省 NT$2.4M。建立了自動化測試流程，讓發布週期縮短 70%。帶了 3 位初階工程師，全部通過試用期。",
  data: "根據 104人力銀行和 Glassdoor，台北資深工程師以我的經驗水準，市場範圍是月薪 NT$85K 到 110K。我目前的底薪 NT$78K 低於這個範圍。",
  ask: "我希望能討論調整薪酬到月薪 NT$92K，以反映我的貢獻並貼近市場行情。",
  ifNo: "我理解。那要達到什麼樣的目標或里程碑，才能在下一個考核週期調整薪酬呢？我想確保我們有共識。",
};

const tips = [
  "帶一份列印版到會議。不要照念，但隨時參考。",
  "會後寄一封跟進 email，摘要你們討論和同意的內容。",
  "如果你的公司有嚴格的薪資職等制度，考慮爭取升等/升 title。這通常會解鎖一個完全不同的薪資級距。",
  "選對時機：年度考核前 1 到 2 個月、剛完成重大成果之後、或你的職責已經明顯超出原本的角色範圍。",
];

const RaiseOnePagerZhTw = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyTemplate = () => {
    const templateText = `加薪準備單

重要成就（過去 12 個月）
成就 | 影響 / 數據
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________
_________________________________ | _________________________________

市場數據
- 我目前的薪酬：NT$________/月（年度 TC 約 NT$________）
- 這個職位的市場範圍：NT$________ 到 NT$________/月
- 來源：_________________________________
- 差距：低於市場 NT$________/月

我的要求
- 首要：________________________________________________________________
- 替代方案：________________________________________________________________
- 底薪凍結時的備案：________________________________________________________________

對話重點
- 開場：「在過去 ________，我 ________________________________________________________________」
- 數據：「根據 ________，________ 在 ________ 以我的經驗水準，市場範圍是月薪 NT$________ 到 ________。」
- 要求：「我希望能討論調整薪酬到月薪 NT$________，以反映 ________________________________________________________________」
- 如果被拒：「我理解。那要達到什麼樣的目標或里程碑，才能在下一個考核週期調整薪酬呢？」`;

    navigator.clipboard.writeText(templateText);
    setCopied(true);
    toast({ title: "已複製模板！", description: "貼到文件中填寫。" });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "已複製連結！", description: "分享給需要的人。" });
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="min-h-screen bg-background">
      <ToolkitHeaderZhTw />

      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative print:hidden">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link to="/zh-tw/toolkit" className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors text-sm">
              <ArrowLeft className="w-4 h-4" />返回工具包
            </Link>
            <button onClick={() => navigate("/toolkit/raise")} className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105">EN</button>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">加薪準備單</h1>
          <p className="text-lg text-cream-90">把你的論述整理在一頁上。帶進會議。</p>
        </div>
      </section>

      <div className="pt-8 print:hidden"><ToolkitNavZhTw currentTemplate="T6" /></div>

      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="grid lg:grid-cols-2 gap-6">
            <div className="bg-muted rounded-xl overflow-hidden shadow-premium print:hidden">
              <div className="bg-executive px-6 py-3"><span className="bg-gold text-white text-xs font-bold px-2 py-1 rounded">📋 範例</span></div>
              <div className="p-6 space-y-6">
                <div><h3 className="font-semibold text-foreground mb-3">重要成就（過去 12 個月）</h3><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left py-2 text-muted-foreground">成就</th><th className="text-left py-2 text-muted-foreground">影響 / 數據</th></tr></thead><tbody>{exampleAchievements.map((item, i) => (<tr key={i} className="border-b border-border"><td className="py-2 text-foreground">{item.achievement}</td><td className="py-2 text-foreground">{item.impact}</td></tr>))}</tbody></table></div>
                <div><h3 className="font-semibold text-foreground mb-3">市場數據</h3><ul className="text-sm space-y-1"><li className="text-foreground">• 我目前的薪酬：{exampleMarketData.currentComp}</li><li className="text-foreground">• 這個職位的市場範圍：{exampleMarketData.marketRange}</li><li className="text-foreground">• 來源：{exampleMarketData.source}</li><li className="text-foreground">• 差距：{exampleMarketData.gap}</li></ul></div>
                <div><h3 className="font-semibold text-foreground mb-3">我的要求</h3><ul className="text-sm space-y-1"><li className="text-foreground">• 首要：{exampleAsk.primary}</li><li className="text-foreground">• 替代方案：{exampleAsk.alternative}</li><li className="text-foreground">• 底薪凍結時的備案：{exampleAsk.fallback}</li></ul></div>
                <div><h3 className="font-semibold text-foreground mb-3">對話重點</h3><div className="space-y-3 text-sm">{Object.entries(exampleTalkingPoints).map(([key, val]) => (<div key={key} className="border-l-4 border-gold pl-3"><p className="text-muted-foreground font-semibold">{key === 'opening' ? '開場' : key === 'data' ? '數據' : key === 'ask' ? '要求' : '如果被拒'}：</p><p className="text-foreground italic">「{val}」</p></div>))}</div></div>
              </div>
            </div>
            <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
              <div className="bg-executive px-6 py-3"><span className="bg-card text-foreground text-xs font-bold px-2 py-1 rounded">✏️ 你的版本</span></div>
              <div className="p-6 space-y-6">
                <div><h3 className="font-semibold text-foreground mb-3">重要成就（過去 12 個月）</h3><table className="w-full text-sm"><thead><tr className="border-b border-border"><th className="text-left py-2 text-muted-foreground">成就</th><th className="text-left py-2 text-muted-foreground">影響 / 數據</th></tr></thead><tbody>{[1,2,3,4].map(i => (<tr key={i} className="border-b border-dashed border-border"><td className="py-3 text-muted-foreground">_________________________________</td><td className="py-3 text-muted-foreground">_________________________________</td></tr>))}</tbody></table></div>
                <div><h3 className="font-semibold text-foreground mb-3">市場數據</h3><ul className="text-sm space-y-2"><li className="text-foreground">• 我目前的薪酬：NT$________/月（年度 TC 約 NT$________）</li><li className="text-foreground">• 這個職位的市場範圍：NT$________ 到 NT$________/月</li><li className="text-foreground">• 來源：_________________________________</li><li className="text-foreground">• 差距：低於市場 ☐ 中位數 ☐ 75 百分位 NT$________/月</li></ul></div>
                <div><h3 className="font-semibold text-foreground mb-3">我的要求</h3><ul className="text-sm space-y-2"><li className="text-foreground">• 首要：________________________________________________________________</li><li className="text-foreground">• 替代方案：________________________________________________________________</li><li className="text-foreground">• 底薪凍結時的備案：________________________________________________________________</li></ul></div>
                <div><h3 className="font-semibold text-foreground mb-3">對話重點</h3><div className="space-y-3 text-sm"><div className="border-l-4 border-gold pl-3"><p className="text-muted-foreground font-semibold">開場：</p><p className="text-muted-foreground italic">「在過去 ________，我 ________________________________________________________________」</p></div><div className="border-l-4 border-gold pl-3"><p className="text-muted-foreground font-semibold">數據：</p><p className="text-muted-foreground italic">「根據 ________，________ 以我的經驗水準，市場範圍是月薪 NT$________ 到 ________。」</p></div><div className="border-l-4 border-gold pl-3"><p className="text-muted-foreground font-semibold">要求：</p><p className="text-muted-foreground italic">「我希望能討論調整薪酬到月薪 NT$________，以反映 ________________________________________________________________」</p></div><div className="border-l-4 border-gold pl-3"><p className="text-muted-foreground font-semibold">如果被拒：</p><p className="text-muted-foreground italic">「我理解。那要達到什麼樣的目標或里程碑，才能在下一個考核週期調整薪酬呢？」</p></div></div></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h3 className="font-heading text-lg text-gold mb-4">💡 提示</h3>
            <ul className="space-y-2">{tips.map((tip, i) => (<li key={i} className="flex items-start gap-2 text-foreground"><span>•</span><span>{tip}</span></li>))}</ul>
          </div>
        </div>
      </section>

      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button onClick={() => window.print()} className="bg-executive hover:bg-executive-light text-cream px-6 py-3 h-auto"><Printer className="w-4 h-4 mr-2" />列印</Button>
          <Button onClick={copyTemplate} className="btn-gold px-6 py-3 h-auto">{copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}{copied ? "已複製！" : "複製模板"}</Button>
          <Button onClick={shareUrl} variant="outline" className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto">{shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}{shared ? "已複製連結！" : "分享"}</Button>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default RaiseOnePagerZhTw;
