import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeaderZhTw from "@/components/toolkit/ToolkitHeaderZhTw";
import ToolkitFooterZhTw from "@/components/toolkit/ToolkitFooterZhTw";
import ToolkitNavZhTw from "@/components/toolkit/ToolkitNavZhTw";

const exampleData = [
  { item: "月薪（本薪）", offerA: "NT$75,000", offerB: "NT$85,000", current: "NT$65,000", formula: "offer 上寫的數字" },
  { item: "保障月數", offerA: "14 個月", offerB: "14 個月", current: "13 個月", formula: "12 + 保障年終月數" },
  { item: "本薪 × 保障月數", offerA: "NT$1,050,000", offerB: "NT$1,190,000", current: "NT$845,000", formula: "月薪 × 保障月數" },
  { item: "超出保障的年終獎金", offerA: "~NT$75,000", offerB: "~NT$170,000", current: "~NT$65,000", formula: "問：「去年這個職位平均年終超出保障的部分是多少？」" },
  { item: "員工分紅", offerA: "NT$0", offerB: "~NT$400,000", current: "NT$0", formula: "問：「去年這個職等平均分紅大概是多少？」" },
  { item: "股票 / ESPP（持股信託）", offerA: "NT$50,000/年", offerB: "NT$100,000/年", current: "NT$0", formula: "股票購買折扣或選擇權的年度價值" },
  { item: "簽約獎金", offerA: "NT$100,000", offerB: "NT$0", current: "不適用", formula: "一次性。除以預計工作年數來年化" },
  { item: "伙食津貼", offerA: "NT$2,400/月", offerB: "NT$2,400/月", current: "NT$2,400/月", formula: "月金額 × 12" },
  { item: "交通/其他津貼", offerA: "NT$0", offerB: "NT$3,000/月", current: "NT$0", formula: "月金額 × 12" },
  { item: "團保升級", offerA: "基本", offerB: "進階（含牙齒、眷屬）", current: "基本", formula: "估算進階保障的價值" },
  { item: "年假", offerA: "15 天", offerB: "12 天", current: "10 天", formula: "超過法定最低天數 = 實際價值" },
];

const blankTemplate = [
  { item: "月薪（本薪）", formula: "offer 上寫的" },
  { item: "保障月數", formula: "12 + 保障年終" },
  { item: "本薪 × 保障月數", formula: "第 1 列 × 第 2 列" },
  { item: "超出保障的年終", formula: "問 HR 去年平均" },
  { item: "員工分紅", formula: "問 HR 這個職等平均" },
  { item: "股票 / ESPP", formula: "年度價值" },
  { item: "簽約獎金", formula: "一次性" },
  { item: "伙食津貼 × 12", formula: "月 × 12" },
  { item: "交通/其他 × 12", formula: "月 × 12" },
  { item: "保險價值", formula: "估算進階保障" },
  { item: "年假（天數）", formula: "超過法定最低天數" },
];

const howToUse = [
  "先拿到完整的書面 offer 再填。用 Offer 回應話術（T2）爭取時間。",
  "直接問 HR 年終獎金和分紅平均值。問法：「去年這個職位/職等平均年終和分紅各是多少？」",
  "填入你目前的工作作為基準線。這會讓你看到真正的差距（或沒有差距）。",
  "比較「等效月薪」這一列。這是最真實的同等比較數字。在還價信中使用它。",
];

const marketDataSources = [
  { name: "104人力銀行", desc: "（104.com.tw），台灣最大求職網站，有依職位/產業分類的薪資範圍" },
  { name: "CakeResume", desc: "，科技業導向，用戶回報薪資" },
  { name: "Glassdoor", desc: "，外商和跨國公司在台灣的數據" },
  { name: "Levels.fyi", desc: "，大型科技公司薪酬數據，部分有台灣條目" },
  { name: "Salary.tw", desc: "，社群回報薪資" },
];

const CompensationCalculatorZhTw = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyTable = () => {
    const tableText = `年度總薪酬計算表

項目 | Offer A | Offer B | 目前工作 | 公式
${blankTemplate.map(row => `${row.item} | NT$_______ | NT$_______ | NT$_______ | ${row.formula}`).join('\n')}
年度總薪酬 | NT$_______ | NT$_______ | NT$_______ | 以上全部加總
等效月薪 | NT$_______ | NT$_______ | NT$_______ | 年度總薪酬 ÷ 12`;

    navigator.clipboard.writeText(tableText);
    setCopied(true);
    toast({ title: "已複製表格！", description: "貼到文件中填寫。" });
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

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Link 
              to="/zh-tw/toolkit" 
              className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors text-sm"
            >
              <ArrowLeft className="w-4 h-4" />
              返回工具包
            </Link>
            <button 
              onClick={() => navigate("/toolkit/calculator")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              EN
            </button>
          </div>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            年度總薪酬計算表
          </h1>
          <p className="text-lg text-cream-90">
            你的 offer 不只是那個月薪數字。這是看清全貌的方法。
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNavZhTw currentTemplate="T4" />
      </div>

      {/* Example Table */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-xl text-foreground mb-4">範例：如何計算</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-executive text-cream">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">項目</th>
                    <th className="text-left px-4 py-3 font-semibold">Offer A（科技公司）</th>
                    <th className="text-left px-4 py-3 font-semibold">Offer B（半導體）</th>
                    <th className="text-left px-4 py-3 font-semibold">目前工作</th>
                    <th className="text-left px-4 py-3 font-semibold text-cream-70">如何計算</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleData.map((row, index) => (
                    <tr key={index} className={`border-t border-border ${index % 2 === 1 ? 'bg-muted/50' : ''}`}>
                      <td className="px-4 py-3 font-medium">{row.item}</td>
                      <td className="px-4 py-3">{row.offerA}</td>
                      <td className="px-4 py-3">{row.offerB}</td>
                      <td className="px-4 py-3">{row.current}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-gold bg-gold/20">
                    <td className="px-4 py-3 font-bold">年度總薪酬</td>
                    <td className="px-4 py-3 font-bold">NT$1,333,800</td>
                    <td className="px-4 py-3 font-bold">NT$1,945,600</td>
                    <td className="px-4 py-3 font-bold">NT$938,800</td>
                    <td className="px-4 py-3"></td>
                  </tr>
                  <tr className="bg-gold/10">
                    <td className="px-4 py-3 font-bold">等效月薪</td>
                    <td className="px-4 py-3 font-bold">NT$111,150</td>
                    <td className="px-4 py-3 font-bold">NT$162,133</td>
                    <td className="px-4 py-3 font-bold">NT$78,233</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">年度總薪酬 ÷ 12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Key Insight */}
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-4 mt-4">
            <p className="text-foreground text-sm">
              <span className="font-semibold text-gold">重點：</span> Offer B 的月薪只比 Offer A 多 NT$10,000/月。但因為分紅、股票和獎金結構，年度總薪酬多了 NT$611,800。永遠不要只用月薪比較 offer。
            </p>
          </div>
        </div>
      </section>

      {/* Blank Template */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-xl text-foreground mb-4">你的比較：空白模板</h2>
          <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold">項目</th>
                    <th className="text-left px-4 py-3 font-semibold">Offer A：[______]</th>
                    <th className="text-left px-4 py-3 font-semibold">Offer B：[______]</th>
                    <th className="text-left px-4 py-3 font-semibold">目前工作</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground">公式</th>
                  </tr>
                </thead>
                <tbody>
                  {blankTemplate.map((row, index) => (
                    <tr key={index} className="border-t border-dashed border-border">
                      <td className="px-4 py-3 font-medium">{row.item}</td>
                      <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                      <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                      <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  <tr className="border-t-2 border-border">
                    <td className="px-4 py-3 font-bold">年度總薪酬</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">以上全部加總</td>
                  </tr>
                  <tr className="bg-muted/50">
                    <td className="px-4 py-3 font-bold">等效月薪</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground">NT$_______</td>
                    <td className="px-4 py-3 text-muted-foreground text-xs">年度總薪酬 ÷ 12</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* How to Use */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-lg text-executive mb-4">如何使用</h3>
            <ol className="space-y-3">
              {howToUse.map((step, index) => (
                <li key={index} className="flex items-start gap-3 text-foreground">
                  <span className="w-6 h-6 rounded-full bg-executive text-cream text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Market Data Sources */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-lg text-foreground mb-4">市場數據來源</h3>
            <ul className="space-y-2 text-foreground text-sm">
              {marketDataSources.map((source, index) => (
                <li key={index}>• <strong>{source.name}</strong>{source.desc}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyTable}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "已複製！" : "複製表格"}
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

export default CompensationCalculatorZhTw;
