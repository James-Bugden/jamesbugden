import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowDown, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { nativeShare } from "@/lib/share";
import { trackEvent } from "@/lib/trackEvent";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";
import { SEO } from "@/components/SEO";

const steps = [
  {
    number: 1,
    label: "回音",
    title: "複述那個數字",
    script: "NT$[X]……",
    instruction: "語氣帶一點思考的味道。不是震驚。像是你在仔細消化。",
  },
  {
    number: 2,
    label: "暫停",
    title: "沉默",
    script: null,
    instruction: "什麼都不要說，15 到 30 秒。如果需要的話在心裡默數。這會讓你很不舒服。這正是它有效的原因。",
    note: "沉默期間發生什麼：招募人員的大腦會開始和自己的 offer 過不去。",
    branches: [
      { label: "A", text: "對方在你開口前改善數字 → 進入第 3 步" },
      { label: "B", text: "對方等你回應 → 進入第 3 步" },
    ],
  },
  {
    number: 3,
    label: "導向",
    title: "用熱情加一個問題回應",
    script: "謝謝，我對這個機會和團隊非常期待。我想花一兩天時間好好看完整個方案。請問你們能把完整的 offer 細節以書面寄給我嗎？包括獎金結構和福利。",
    instruction: "為什麼有效：你沒有說好。你沒有說不好。你展現了熱情，同時爭取到準備真正還價的時間。",
  },
];

const outcomes = [
  {
    label: "A",
    title: "只有口頭 offer",
    text: "用 email 跟進：「謝謝今天的對話。我對這個機會非常期待。請問您能把完整的 offer 細節以書面寄給我嗎？讓我好好看過整個方案。」",
  },
  {
    label: "B",
    title: "收到書面 offer",
    text: "你準備好用還價信了（模板 T3）",
    link: "/zh-tw/toolkit/counteroffer",
  },
];

const donts = [
  "說「聽起來很棒！」。你剛剛沒談判就接受了。",
  "毫無準備地脫口說出還價。你聽起來很慌。",
  "說「我目前月薪 NT$X」。把你釘在一個不相關的數字上。",
  "在電話或 LINE 上談。你會失去沉著，也無法仔細看細節。",
];

const OfferResponseZhTw = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyScript = () => {
    const scriptText = `OFFER 回應話術

第 1 步：複述那個數字（回音）
說：「NT$[X]……」
${steps[0].instruction}

第 2 步：沉默（暫停）
${steps[1].instruction}
${steps[1].note}

第 3 步：用熱情加一個問題回應（導向）
說：「${steps[2].script}」
${steps[2].instruction}

結果 A（只有口頭 offer）：
${outcomes[0].text}

結果 B（收到書面 offer）：
${outcomes[1].text}`;

    navigator.clipboard.writeText(scriptText);
    trackEvent("copy", "offer_response");
    setCopied(true);
    toast({ title: "已複製話術！", description: "貼到任何你需要的地方。" });
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
            Offer 回應話術
          </h1>
          <p className="text-lg text-cream-90">
            3 個步驟。30 秒。價值數萬元。
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNavZhTw currentTemplate="offer-response" />
      </div>

      {/* Flowchart Steps */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl space-y-4">
          {steps.map((step, index) => (
            <div key={step.number}>
              {/* Step Card */}
              <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
                {/* Step Header */}
                <div className="bg-executive px-6 py-4 flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gold flex items-center justify-center text-white font-bold text-xl flex-shrink-0">
                    {step.number}
                  </div>
                  <div>
                    <p className="text-gold text-sm font-semibold uppercase">{step.label}</p>
                    <h2 className="text-cream font-semibold text-lg">{step.title}</h2>
                  </div>
                </div>

                {/* Script */}
                {step.script && (
                  <div className="px-6 py-4 border-l-4 border-gold bg-muted">
                    <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">說：</p>
                    <p className="text-foreground text-lg italic">「{step.script}」</p>
                  </div>
                )}

                {/* Instruction */}
                <div className="px-6 py-4">
                  <p className="text-foreground">{step.instruction}</p>
                </div>

                {/* Note (Step 2) */}
                {step.note && (
                  <div className="px-6 pb-4">
                    <p className="text-muted-foreground italic text-sm">{step.note}</p>
                  </div>
                )}

                {/* Branches (Step 2) */}
                {step.branches && (
                  <div className="px-6 pb-4 space-y-2">
                    {step.branches.map((branch) => (
                      <div key={branch.label} className="flex items-start gap-3 bg-executive/5 p-3 rounded-lg">
                        <span className="w-6 h-6 rounded-full bg-executive text-cream text-xs font-bold flex items-center justify-center flex-shrink-0">
                          {branch.label}
                        </span>
                        <p className="text-sm text-foreground">{branch.text}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Arrow between steps */}
              {index < steps.length - 1 && (
                <div className="flex justify-center py-3">
                  <ArrowDown className="w-8 h-8 text-gold" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* Outcomes */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="flex justify-center py-3">
            <ArrowDown className="w-8 h-8 text-gold" />
          </div>
          <div className="grid md:grid-cols-2 gap-4">
            {outcomes.map((outcome) => (
              <div key={outcome.label} className="bg-card rounded-xl p-6 shadow-premium border border-border">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-8 h-8 rounded-full bg-executive text-cream font-bold flex items-center justify-center">
                    {outcome.label}
                  </span>
                  <h3 className="font-semibold text-foreground">{outcome.title}</h3>
                </div>
                <p className="text-muted-foreground text-sm">{outcome.text}</p>
                {outcome.link && (
                  <Link to={outcome.link} className="text-gold text-sm font-medium hover:underline mt-2 inline-block">
                    前往還價信模板 →
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* DON'T Box */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-destructive/10 rounded-xl p-6 border-l-4 border-destructive">
            <h3 className="font-heading text-xl text-destructive mb-4 flex items-center gap-2">
              千萬不要
            </h3>
            <ul className="space-y-3">
              {donts.map((item, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="text-destructive">✕</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Tip Box */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl">
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-lg text-executive mb-3">💡 給女性</h3>
            <p className="text-foreground">
              沉默搭配溫暖。暫停之後，先展現真誠的熱情，再提出查看方案的要求。研究顯示這種「持續友善」的組合能化解女性談判時有時遇到的好感度代價。
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-2xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyScript}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "已複製！" : "複製話術"}
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

export default OfferResponseZhTw;