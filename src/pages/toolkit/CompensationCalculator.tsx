import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Linkedin, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const exampleData = [
  { component: "Monthly Base (本薪)", offerA: "NT$75,000", offerB: "NT$85,000", current: "NT$65,000", formula: "As stated in offer" },
  { component: "Guaranteed Months", offerA: "14 months", offerB: "14 months", current: "13 months", formula: "12 + guaranteed year-end months" },
  { component: "Base × Guaranteed", offerA: "NT$1,050,000", offerB: "NT$1,190,000", current: "NT$845,000", formula: "Monthly base × guaranteed months" },
  { component: "Year-End above guarantee", offerA: "NT$50,000", offerB: "NT$200,000", current: "NT$30,000", formula: "Ask HR for last year's average" },
  { component: "Profit Sharing (員工分紅)", offerA: "NT$0", offerB: "NT$400,000", current: "NT$0", formula: "Ask HR for this level's average" },
  { component: "Stock / ESPP", offerA: "NT$100,000", offerB: "NT$120,000", current: "NT$35,000", formula: "Annual vest value or ESPP discount" },
  { component: "Sign-on Bonus (簽約獎金)", offerA: "NT$100,000", offerB: "NT$0", current: "N/A", formula: "One-time; divide by expected years to annualize" },
  { component: "Meal Allowance (伙食津貼)", offerA: "NT$2,400/mo", offerB: "NT$2,400/mo", current: "NT$2,400/mo", formula: "Monthly amount × 12" },
  { component: "Transport/Other Allowances", offerA: "NT$0", offerB: "NT$3,000/mo", current: "NT$0", formula: "Monthly amount × 12" },
  { component: "Group Insurance Upgrade (團保)", offerA: "Basic", offerB: "Premium (+dental, family)", current: "Basic", formula: "Estimate value of premium coverage" },
  { component: "Annual Leave", offerA: "15 days", offerB: "12 days", current: "10 days", formula: "Above legal minimum = real value" },
];

const totalRow = { 
  component: "TOTAL ANNUAL TC", 
  offerA: "NT$1,333,800", 
  offerB: "NT$1,945,600", 
  current: "NT$938,800", 
  formula: "—" 
};

const effectiveMonthlyRow = { 
  component: "Effective Monthly", 
  offerA: "NT$111,150", 
  offerB: "NT$162,133", 
  current: "NT$78,233", 
  formula: "Total ÷ 12" 
};

const blankTemplate = [
  { component: "Monthly Base (本薪)", formula: "As stated" },
  { component: "Guaranteed Months", formula: "12 + guaranteed year-end" },
  { component: "Base × Guaranteed", formula: "Row 1 × Row 2" },
  { component: "Year-End above guarantee", formula: "Ask HR for last year's average" },
  { component: "Profit Sharing (員工分紅)", formula: "Ask HR for this level's average" },
  { component: "Stock / ESPP", formula: "Annual value" },
  { component: "Sign-on Bonus", formula: "One-time payment" },
  { component: "Meal Allowance × 12", formula: "Monthly × 12" },
  { component: "Transport/Other × 12", formula: "Monthly × 12" },
  { component: "Insurance Value", formula: "Estimate premium coverage" },
  { component: "Annual Leave (days)", formula: "Days above legal minimum" },
];

const howToUse = [
  "Get the full written offer before filling this in. Use the Offer Response Script (T2) to buy time.",
  "Ask HR directly for year-end bonus and profit-sharing averages. The question: \"What was the average year-end bonus and profit sharing for this level/role last year?\"",
  "Fill in your current job as a baseline — this shows you the real gap (or lack of one).",
  "Compare the \"Effective Monthly\" row — this is the truest apples-to-apples number. Use it in your counteroffer email.",
];

const marketDataSources = [
  { name: "104人力銀行", url: "https://www.104.com.tw", desc: "Largest Taiwan job board, has salary ranges by role/industry" },
  { name: "CakeResume", url: "https://www.cakeresume.com", desc: "Tech-focused, has reported salaries from users" },
  { name: "Glassdoor", url: "https://www.glassdoor.com", desc: "International roles and multinationals in Taiwan" },
  { name: "Levels.fyi", url: "https://www.levels.fyi", desc: "Best for FAANG/big tech comp data, some Taiwan entries" },
  { name: "Salary.tw", url: "https://salary.tw", desc: "Community-reported salaries" },
  { name: "Dcard 工作版", url: "https://www.dcard.tw/f/job", desc: "Forum discussions with real salary sharing (use carefully, not always verified)" },
];

const CompensationCalculator = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);

  const copyTable = () => {
    const tableText = `TOTAL ANNUAL COMPENSATION CALCULATOR

Component | Offer A | Offer B | Current Job | Formula
${blankTemplate.map(row => `${row.component} | NT$_______ | NT$_______ | NT$_______ | ${row.formula}`).join('\n')}
TOTAL ANNUAL TC | NT$_______ | NT$_______ | NT$_______ | Sum all above
Effective Monthly | NT$_______ | NT$_______ | NT$_______ | Total ÷ 12`;

    navigator.clipboard.writeText(tableText);
    setCopied(true);
    toast({ title: "Table copied!", description: "Paste it into a spreadsheet or document." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
    setTimeout(() => setShared(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Header */}
      <header className="bg-[#1A1A2E] border-b border-white/10">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-white tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="hidden md:flex items-center gap-3">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-white/70 hover:text-white transition-colors">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="py-12 md:py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl text-center">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Total Annual Compensation Calculator
          </h1>
          <p className="text-lg text-white/70">
            Your offer is more than the monthly number. Here's how to see the full picture.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <ToolkitNav currentTemplate="T4" />

      {/* Example Table */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="bg-[#0F3460] px-6 py-4">
              <h2 className="text-white font-semibold text-lg">EXAMPLE: How to Calculate</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Component</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Offer A (Tech Co)</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Offer B (Semiconductor)</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Current Job</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">How to Calculate</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.component}</td>
                      <td className="px-4 py-3 text-gray-700">{row.offerA}</td>
                      <td className="px-4 py-3 text-gray-700">{row.offerB}</td>
                      <td className="px-4 py-3 text-gray-700">{row.current}</td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-[#E94560] text-white font-bold">
                    <td className="px-4 py-3">{totalRow.component}</td>
                    <td className="px-4 py-3">{totalRow.offerA}</td>
                    <td className="px-4 py-3">{totalRow.offerB}</td>
                    <td className="px-4 py-3">{totalRow.current}</td>
                    <td className="px-4 py-3 text-xs font-normal">{totalRow.formula}</td>
                  </tr>
                  {/* Effective Monthly Row */}
                  <tr className="bg-[#0F3460] text-white font-bold">
                    <td className="px-4 py-3">{effectiveMonthlyRow.component}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.offerA}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.offerB}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.current}</td>
                    <td className="px-4 py-3 text-xs font-normal">{effectiveMonthlyRow.formula}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-gray-50 border-t text-xs text-gray-500 italic">
              Note: Sign-on bonus shown at full value in Year 1. In subsequent years, Offer A drops to NT$1,233,800.
            </div>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-amber-50 border-l-4 border-amber-400 rounded-r-xl p-6">
            <p className="text-amber-800">
              <span className="font-semibold">💡 Key Insight:</span> Offer B's monthly base is only NT$10,000/month more than Offer A — but the total annual TC is NT$611,800 more because of profit sharing, stock, and bonus structure. Never compare offers by monthly base alone.
            </p>
          </div>
        </div>
      </section>

      {/* Blank Template */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="bg-[#0F3460] px-6 py-4">
              <h2 className="text-white font-semibold text-lg">YOUR COMPARISON — Blank Template</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Component</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Offer A: [______]</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Offer B: [______]</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Current Job</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-500 text-xs">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  {blankTemplate.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 font-medium text-gray-900">{row.component}</td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-gray-300 text-gray-400 px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-gray-300 text-gray-400 px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-gray-300 text-gray-400 px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3 text-gray-500 text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-gray-200 font-bold">
                    <td className="px-4 py-3 text-gray-900">TOTAL ANNUAL TC</td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-400 text-gray-600 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-400 text-gray-600 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-400 text-gray-600 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs font-normal">Sum all above</td>
                  </tr>
                  {/* Effective Monthly Row */}
                  <tr className="bg-gray-300 font-bold">
                    <td className="px-4 py-3 text-gray-900">Effective Monthly</td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-500 text-gray-700 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-500 text-gray-700 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-gray-500 text-gray-700 px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3 text-gray-500 text-xs font-normal">Total ÷ 12</td>
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
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-heading text-xl text-gray-900 mb-4">How to Use This</h3>
            <ol className="space-y-3">
              {howToUse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-[#0F3460] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-gray-700">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Market Data Sources */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-[#E8F4FD] rounded-xl p-6 border-l-4 border-[#0F3460]">
            <h3 className="font-heading text-xl text-[#0F3460] mb-4">Where to Find Market Data</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketDataSources.map((source, index) => (
                <a 
                  key={index} 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-[#0F3460] hover:underline"
                >
                  <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{source.name}</p>
                    <p className="text-sm text-gray-600">{source.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={copyTable}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Table"}
          </Button>
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 border-t border-white/10">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-white/50 text-sm">
            From the Salary Negotiation Toolkit by{" "}
            <Link to="/" className="text-[#E94560] hover:underline">James Bugden</Link>
            . Get the full 5-email series →{" "}
            <Link to="/" className="text-[#E94560] hover:underline">Subscribe</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CompensationCalculator;
