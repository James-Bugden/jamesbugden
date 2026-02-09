import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";

const emailTemplates = [
  {
    id: "standard",
    label: "標準還價",
    whenToUse: "你有一個 offer，想要談條件。",
    subject: "Offer 後續討論",
    body: `[HR 名字] 你好，

非常感謝 offer，我對加入 [公司名稱] 並為 [團隊/專案] 貢獻感到很興奮。

仔細看過 offer 之後，我希望能討論一些調整，讓條件更貼近市場行情和我的經驗。

根據我在 104人力銀行和 Glassdoor 上的研究，我的期望是：

月薪：NT$[目標]，以更貼近這個職位和經驗等級在 [城市/地區] 的市場範圍

我很期待能進一步討論有哪些彈性空間。我對團隊有信心，相信我們能找到雙方都滿意的方案。

請讓我知道方便的時間。

祝好，
[你的名字]`,
    whyItWorks: "開頭展現熱情，讓對方知道你不是要走人。用市場數據框架你的要求，不是個人需求。一封信只提一個要求。底薪談完之後，再跟進下一個項目。結尾留開放空間，不是最後通牒。",
  },
  {
    id: "competing",
    label: "有競爭 Offer",
    whenToUse: "你手上有另一家公司的書面 offer。",
    subject: "Offer 後續，補充資訊",
    body: `[HR 名字] 你好，

再次感謝 [公司名稱] 的 offer，我對這個職位和團隊在 [專案] 上的工作很期待。

我想坦誠告知：我收到了另一個 offer，年度總薪酬大約 NT$[對方 TC]。我分享這個不是要下最後通牒，而是因為 [公司名稱] 仍然是我的首選，我希望能找到讓它成行的方式。

根據對方的 offer 和市場數據，我希望能討論調整：

月薪：NT$[目標]，讓年度總薪酬更接近

我對自己能為 [團隊] 帶來的價值有信心，也希望了解有哪些彈性空間，讓我能全心投入 [公司名稱]。

祝好，
[你的名字]`,
    whyItWorks: "「我分享這個不是要下最後通牒」消除了威脅感。把他們列為首選給了 HR 動力去爭取預算。你給了他們一個具體的數字去匹配，這讓他們的工作更容易。",
  },
  {
    id: "unemployed",
    label: "目前待業中",
    whenToUse: "你不想讓目前的狀態削弱你的談判位置。",
    subject: "Offer 後續討論",
    body: `[HR 名字] 你好，

非常感謝 offer，我對能將我在 [領域] 的 [X 年] 經驗帶到 [公司名稱] 並為 [團隊/專案] 做出貢獻感到興奮。

看完整個方案後，我希望能討論一項調整。根據我在 104人力銀行、Glassdoor 以及與業界同行的交流，這個職位的市場範圍是月薪 NT$[X] 到 [Y]。以我在 [具體成就與數據] 方面的成績，我認為月薪 NT$[目標] 更能反映我將帶來的價值。

我期待加入團隊，也相信我們能找到雙方都滿意的方案。

請讓我知道方便的時間。

祝好，
[你的名字]`,
    whyItWorks: "完全不提待業這件事，因為它和你的市場價值無關。用經驗和具體成果開頭，不是你的現況。和標準版本用一樣的市場數據框架。你的談判籌碼來自你能交付什麼，不是你從哪裡來。",
  },
  {
    id: "newgrad",
    label: "社會新鮮人",
    whenToUse: "你是剛畢業的新鮮人，經驗有限但準備充足。",
    subject: "Offer 後續討論",
    body: `[HR 名字] 你好，

非常感謝 offer，我對能在 [公司名稱] 開始職涯並為 [團隊/專案] 貢獻感到興奮。

看過 offer 之後，我希望能討論這個方案。根據我在 104人力銀行和 CakeResume 上的研究，[城市] 的初階 [職位] 市場範圍是月薪 NT$[X] 到 [Y]。以我的 [相關實習/論文專案/證照/技能]，我認為 NT$[目標] 更能反映我從第一天起能做出的貢獻。

如果底薪受到職等限制，我也想討論保障年終獎金最低數字或提前 6 個月績效考核的可能性。

我期待加入團隊，也相信我們能找到雙方都滿意的方案。

祝好，
[你的名字]`,
    whyItWorks: "把焦點放在你能做什麼，不是你缺什麼。底薪談不動時有備案（保障年終、提前考核）。和其他版本一樣用市場數據框架。",
  },
];

const keyPrinciples = [
  { title: "開頭展現熱忱", text: "讓他們知道你不是要走人。" },
  { title: "一封信只提一個要求", text: "底薪談完之後，再另外跟進下一個項目。不要打包。" },
  { title: "用市場數據，不用個人需求", text: "「產業基準顯示……」不是「我需要付房租」。" },
  { title: "結尾留開放空間", text: "「我很期待討論」不是「我需要週五前得到答覆」。" },
  { title: "即使你很滿意", text: "也問一句：「方案中有哪些部分有彈性空間嗎？」答案通常是有的。" },
];

const CounterofferEmailZhTw = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [shared, setShared] = useState(false);

  const copyEmail = (template: typeof emailTemplates[0]) => {
    const emailText = `主旨：${template.subject}\n\n${template.body}`;
    navigator.clipboard.writeText(emailText);
    setCopiedId(template.id);
    toast({ title: "已複製 Email！", description: "貼到你的郵件程式，填入括號中的內容。" });
    setTimeout(() => setCopiedId(null), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "已複製連結！", description: "分享給需要的人。" });
    setTimeout(() => setShared(false), 2000);
  };

  const highlightPlaceholders = (text: string) => {
    const parts = text.split(/(\[[^\]]+\])/g);
    return parts.map((part, index) => {
      if (part.match(/^\[[^\]]+\]$/)) {
        return (
          <span key={index} className="bg-gold/20 text-gold-dark px-1 rounded font-mono text-sm">
            {part}
          </span>
        );
      }
      return part;
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <ToolkitHeaderZhTw />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              to="/zh-tw/toolkit" 
              className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              返回工具包
            </Link>
            <button 
              onClick={() => navigate("/toolkit/counteroffer")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            還價信
          </h1>
          <p className="text-lg text-cream-90">
            4 個版本對應 4 種情境。找到你的，填空，寄出。
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNavZhTw currentTemplate="T3" />
      </div>

      {/* Email Templates */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <Tabs defaultValue="standard" className="w-full">
            <TabsList className="w-full flex flex-wrap h-auto gap-2 bg-transparent mb-6">
              {emailTemplates.map((template) => (
                <TabsTrigger 
                  key={template.id} 
                  value={template.id}
                  className="flex-1 min-w-[100px] bg-muted text-muted-foreground data-[state=active]:bg-gold data-[state=active]:text-white rounded-lg px-4 py-3"
                >
                  {template.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {emailTemplates.map((template) => (
              <TabsContent key={template.id} value={template.id}>
                <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
                  {/* When to use */}
                  <div className="bg-muted px-6 py-4 border-b border-border">
                    <p className="text-sm text-muted-foreground">
                      <span className="font-semibold text-foreground">適用：</span> {template.whenToUse}
                    </p>
                  </div>

                  {/* Subject Line */}
                  <div className="bg-executive px-6 py-3">
                    <p className="text-sm text-cream-70">主旨：</p>
                    <p className="text-cream font-mono">{template.subject}</p>
                  </div>

                  {/* Email Body */}
                  <div className="px-6 py-6">
                    <pre className="whitespace-pre-wrap font-sans text-foreground text-sm leading-relaxed">
                      {highlightPlaceholders(template.body)}
                    </pre>
                  </div>

                  {/* Copy Button */}
                  <div className="px-6 pb-4 flex justify-end">
                    <Button 
                      onClick={() => copyEmail(template)}
                      size="sm"
                      className="btn-gold"
                    >
                      {copiedId === template.id ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
                      {copiedId === template.id ? "已複製！" : "複製 Email"}
                    </Button>
                  </div>

                  {/* Why it works */}
                  <div className="bg-executive/5 px-6 py-4 border-t border-border">
                    <p className="text-sm text-foreground">
                      <span className="font-semibold text-gold">💡 為什麼這個版本有效：</span> {template.whyItWorks}
                    </p>
                  </div>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </section>

      {/* Key Principles */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">每封還價信的 5 條規則</h3>
            <ol className="space-y-4">
              {keyPrinciples.map((principle, index) => (
                <li key={index} className="flex items-start gap-4">
                  <span className="w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center flex-shrink-0 text-sm">
                    {index + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-foreground">{principle.title}</p>
                    <p className="text-muted-foreground text-sm">{principle.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl flex justify-center">
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "已複製連結！" : "分享此頁"}
          </Button>
        </div>
      </section>

      <ToolkitFooterZhTw />
    </div>
  );
};

export default CounterofferEmailZhTw;
