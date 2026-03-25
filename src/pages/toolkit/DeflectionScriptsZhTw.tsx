import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";
import { SEO } from "@/components/SEO";

const scenarios = [
  {
    number: 1,
    title: "第一次被問",
    theySay: "可以分享一下你的薪資期望嗎？",
    youSay: "目前我比較想先了解這個職位的內容和我能怎麼貢獻。薪酬當然重要，但我希望在討論具體數字之前，先了解更多關於職責、團隊和期望。",
  },
  {
    number: 2,
    title: "對方繼續追問",
    theySay: "我們只是想確認雙方在同一個範圍，不想浪費你的時間。",
    youSay: "等我們確認我是適合的人選之後，我很樂意討論薪酬。請問這個職位的薪資範圍是多少？",
  },
  {
    number: 3,
    title: "對方不肯退讓",
    theySay: "我們需要一個數字才能往下走。",
    youSay: "我很彈性，也願意接受有競爭力的條件。我知道薪酬會根據經驗和貢獻有所不同。你們這個職位目標的範圍是多少？",
  },
  {
    number: 4,
    title: "你不得不說一個數字",
    theySay: null,
    youSay: "根據我的研究和產業基準，同類職位這個等級的月薪通常在 NT$[X] 到 [Y]，但我願意就整體薪酬方案做討論，包括獎金和福利。",
    proTip: "小技巧：把你滿意的月薪加上 10 到 20%。這樣對方有空間把你「談下來」到你的目標。",
  },
  {
    number: 5,
    title: "書面申請要求填數字",
    theySay: null,
    youSay: null,
    whatToWrite: "填「面議」或「依公司規定」。如果欄位只接受數字，根據市場調研填一個範圍。絕對不要填你目前的薪水。",
  },
];

const proTips = [
  {
    icon: "💡",
    title: "模式",
    text: "每套話術都以一個反問結尾。這改變了對話的主導權。他們揭露資訊，你不會。",
  },
  {
    icon: "💡",
    title: "數據重構（特別給女性）",
    text: "不要說「我想要」。試試看「我的研究顯示這個職位通常的薪酬是……」引用外部數據（104人力銀行、Glassdoor）把焦點從你個人轉移到市場行情。",
  },
  {
    icon: "💡",
    title: "記住",
    text: "你永遠不需要直接回答這個問題。閃避不是失禮，是專業。",
  },
];

const DeflectionScriptsZhTw = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyAllScripts = () => {
    const scriptsText = scenarios
      .filter((s) => s.youSay || s.whatToWrite)
      .map((s) => {
        if (s.whatToWrite) {
          return `情境 ${s.number}：${s.title}\n填什麼：\n${s.whatToWrite}`;
        }
        return `情境 ${s.number}：${s.title}\n你說：\n「${s.youSay}」`;
      })
      .join("\n\n---\n\n");

    navigator.clipboard.writeText(scriptsText);
    setCopied(true);
    toast({ title: "已複製所有話術！", description: "貼到任何你需要的地方。" });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = async () => {
    const shared = await nativeShare();
    if (!shared) {
      setShared(true);
      toast({ title: "已複製連結！", description: "分享給需要的人。" });
      setTimeout(() => setShared(false), 2000);
    }
    setTimeout(() => setShared(false), 2000);
  };

  return (
      <div className="min-h-screen bg-background">
      <SEO />
      <ToolkitHeaderZhTw />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <Link 
            to="/zh-tw/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            返回工具包
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            被問薪資期望時怎麼說
          </h1>
          <p className="text-lg text-cream-90">
            5 套複製貼上的話術，涵蓋所有情境。存到手機裡。
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNavZhTw currentTemplate="scripts" />
      </div>

      {/* Scenarios */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-6">
          {scenarios.map((scenario) => (
            <div key={scenario.number} className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
              {/* Scenario Header */}
              <div className="bg-executive px-6 py-4 flex items-center gap-4">
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                  {scenario.number}
                </div>
                <h2 className="text-cream font-semibold text-lg">{scenario.title}</h2>
              </div>

              {/* They Say */}
              {scenario.theySay && (
                <div className="bg-muted px-6 py-4">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">對方說：</p>
                  <p className="text-foreground italic">「{scenario.theySay}」</p>
                </div>
              )}

              {/* You Say */}
              {scenario.youSay && (
                <div className="px-6 py-4 border-l-4 border-gold bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">你說：</p>
                  <p className="text-foreground">「{scenario.youSay}」</p>
                </div>
              )}

              {/* What To Write (Scenario 5) */}
              {scenario.whatToWrite && (
                <div className="px-6 py-4 border-l-4 border-gold bg-card">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">填什麼：</p>
                  <p className="text-foreground">{scenario.whatToWrite}</p>
                </div>
              )}

              {/* Pro Tip (Scenario 4) */}
              {scenario.proTip && (
                <div className="px-6 py-4 bg-gold/10 border-t border-gold/20">
                  <p className="text-sm text-foreground">
                    <span className="font-semibold text-gold">💡</span> {scenario.proTip}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Pro Tips Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-xl text-executive mb-4">小技巧</h3>
            <div className="space-y-4">
              {proTips.map((tip, index) => (
                <div key={index}>
                  <p className="text-foreground">
                    <span className="font-semibold">{tip.icon} {tip.title}：</span> {tip.text}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyAllScripts}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "已複製！" : "複製所有話術"}
          </Button>
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "已複製連結！" : "分享"}
          </Button>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default DeflectionScriptsZhTw;
