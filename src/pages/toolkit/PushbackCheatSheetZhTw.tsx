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

const mainCards = [
  {
    number: 1,
    theySay: "這是這個職等的標準薪資。",
    translation: "底薪被鎖在職等裡。但獎金、津貼和考核時間通常不是。",
    youSay: "我理解薪資結構。如果月薪是固定的，那保障年終獎金或第一次績效考核的時間有彈性嗎？提前考核讓我更早展現我的價值。",
  },
  {
    number: 2,
    theySay: "我們的預算有限。",
    translation: "底薪預算鎖死了。但簽約獎金、培訓預算和津貼通常來自不同的預算科目。",
    youSay: "我完全理解預算限制。我也知道類似的職位在可比較的公司提供的月薪方案大約在 NT$[X 到 Y] 的範圍。如果底薪固定的話，年終保障或簽約獎金有調整空間嗎？",
  },
  {
    number: 3,
    theySay: "這已經是很有競爭力的條件了。",
    translation: "他們希望你覺得你要求太多。「有競爭力」代表在範圍內。不代表在頂端。",
    youSay: "我同意這是一個好 offer，也很感謝。根據我的經驗等級和我將做出的貢獻，我的期望比較接近月薪 NT$[X]。我希望能一起找到一個能反映這個水準的方案。",
  },
  {
    number: 4,
    theySay: "我們需要維持內部公平性。",
    translation: "內部薪資一致性很重要。在台灣，很多公司有嚴格的薪資職等制度。這正是非薪資項目成為你談判空間的原因。",
    youSay: "這完全合理。既然內部公平性很重要，我們是否看看保障 3 個月年終獎金或提前考核週期？這些不會影響薪資結構，但能幫助讓年度總薪酬更到位。",
  },
];

const bonusScripts = [
  {
    id: "competing",
    title: "有競爭 Offer",
    situation: "你手上有另一家公司的書面 offer。",
    youSay: "我想坦誠告訴你，我收到了另一個蠻有吸引力的整體方案。不過 [公司名稱] 仍然是我的首選。有沒有彈性讓 offer 更接近？",
    key: "沒有最後通牒，沒有威脅。你給他們一個動起來的理由，同時讓他們知道你想留在這裡。",
  },
  {
    id: "deadline",
    title: "延長期限",
    situation: "對方給你壓力要快點決定。",
    youSay: "我很感謝這個 offer，也很期待這個機會。職涯決定對我來說很重要。是否有辦法延長一週的期限，讓我好好評估？我希望加入的時候是全心投入的。",
    followUp: "然後催其他公司：「我收到了一個有期限的 offer。貴公司仍然是我的首選。流程有辦法加速嗎？」",
  },
];

const PushbackCheatSheetZhTw = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyAllScripts = () => {
    const mainScriptsText = mainCards.map((card, index) => 
      `回絕 ${index + 1}：\n對方說：「${card.theySay}」\n你說：「${card.youSay}」`
    ).join("\n\n---\n\n");

    const bonusScriptsText = bonusScripts.map(script => 
      `額外話術：${script.title}\n情境：${script.situation}\n你說：「${script.youSay}」${script.followUp ? `\n${script.followUp}` : ""}`
    ).join("\n\n---\n\n");

    const fullText = `回絕應對小抄\n\n${mainScriptsText}\n\n---\n\n${bonusScriptsText}`;

    navigator.clipboard.writeText(fullText);
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
    <>
      <SEO />
      <div className="min-h-screen bg-background">
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
            回絕應對小抄
          </h1>
          <p className="text-lg text-cream-90">
            對方會推回去。這是你要說的話。
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNavZhTw currentTemplate="pushback" />
      </div>

      {/* Main Cards */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl space-y-6">
          {mainCards.map((card) => (
            <div key={card.number} className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
              <div className="grid md:grid-cols-2">
                {/* They Say */}
                <div className="bg-muted p-6">
                  <div className="flex items-center gap-3 mb-3">
                    <span className="w-8 h-8 rounded-full bg-executive text-cream font-bold flex items-center justify-center text-sm">
                      {card.number}
                    </span>
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">對方說：</p>
                  </div>
                  <p className="text-foreground italic mb-4">「{card.theySay}」</p>
                  <div className="pt-4 border-t border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1">翻譯：</p>
                    <p className="text-muted-foreground text-sm italic">{card.translation}</p>
                  </div>
                </div>
                {/* You Say */}
                <div className="p-6 border-l-4 border-gold">
                  <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3">你說：</p>
                  <p className="text-foreground">「{card.youSay}」</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Bonus Scripts */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <h2 className="text-foreground text-xl font-heading mb-4">額外話術</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {bonusScripts.map((script) => (
              <div key={script.id} className="bg-executive/5 rounded-xl overflow-hidden shadow-premium border-l-4 border-executive">
                <div className="p-6">
                  <h3 className="font-semibold text-executive text-lg mb-2">{script.title}</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    <span className="font-semibold text-foreground">情境：</span> {script.situation}
                  </p>
                  <div className="bg-card rounded-lg p-4 mb-3 border border-border">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">你說：</p>
                    <p className="text-foreground text-sm">「{script.youSay}」</p>
                  </div>
                  {script.followUp && (
                    <p className="text-sm text-muted-foreground italic">{script.followUp}</p>
                  )}
                  {script.key && (
                    <p className="text-sm text-executive mt-3">
                      <span className="font-semibold">關鍵：</span> {script.key}
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Remember Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h3 className="font-heading text-lg text-gold mb-3">📌 記住</h3>
            <p className="text-foreground">
              HR 不是你的敵人。他們也想成交。你的工作是讓他們更容易去幫你爭取更多。給他們能帶去給主管的數據。在台灣，把你的要求框架為「這個職等在市場上的合理水準」比「我想要的」有效得多。
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyAllScripts}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "已複製！" : "複製全部"}
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

export default PushbackCheatSheetZhTw;
