import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const exampleData = [
  { component: "Monthly Base", offerA: "NT$75,000", offerB: "NT$85,000", current: "NT$65,000", formula: "As stated in offer" },
  { component: "Guaranteed Months", offerA: "14 months", offerB: "14 months", current: "13 months", formula: "12 + guaranteed year-end months" },
  { component: "Base × Guaranteed", offerA: "NT$1,050,000", offerB: "NT$1,190,000", current: "NT$845,000", formula: "Monthly base × guaranteed months" },
  { component: "Year-End above guarantee", offerA: "NT$50,000", offerB: "NT$200,000", current: "NT$30,000", formula: "Ask HR for last year's average" },
  { component: "Profit Sharing", offerA: "NT$0", offerB: "NT$400,000", current: "NT$0", formula: "Ask HR for this level's average" },
  { component: "Stock / ESPP", offerA: "NT$100,000", offerB: "NT$120,000", current: "NT$35,000", formula: "Annual vest value or ESPP discount" },
  { component: "Sign-on Bonus", offerA: "NT$100,000", offerB: "NT$0", current: "N/A", formula: "One-time; divide by expected years to annualize" },
  { component: "Meal Allowance", offerA: "NT$2,400/mo", offerB: "NT$2,400/mo", current: "NT$2,400/mo", formula: "Monthly amount × 12" },
  { component: "Transport/Other Allowances", offerA: "NT$0", offerB: "NT$3,000/mo", current: "NT$0", formula: "Monthly amount × 12" },
  { component: "Group Insurance Upgrade", offerA: "Basic", offerB: "Premium (+dental, family)", current: "Basic", formula: "Estimate value of premium coverage" },
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
  { component: "Monthly Base", formula: "As stated" },
  { component: "Guaranteed Months", formula: "12 + guaranteed year-end" },
  { component: "Base × Guaranteed", formula: "Row 1 × Row 2" },
  { component: "Year-End above guarantee", formula: "Ask HR for last year's average" },
  { component: "Profit Sharing", formula: "Ask HR for this level's average" },
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
  { name: "CakeResume", url: "https://www.cakeresume.com", desc: "Tech-focused, has reported salaries from users" },
  { name: "Glassdoor", url: "https://www.glassdoor.com", desc: "International roles and multinationals in Taiwan" },
  { name: "Levels.fyi", url: "https://www.levels.fyi", desc: "Best for FAANG/big tech comp data, some Taiwan entries" },
  { name: "Salary.tw", url: "https://salary.tw", desc: "Community-reported salaries" },
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
    <div className="min-h-screen bg-background">
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-5xl text-center relative z-10">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            Total Annual Compensation Calculator
          </h1>
          <p className="text-lg text-cream-90">
            Your offer is more than the monthly number. Here's how to see the full picture.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8">
        <ToolkitNav currentTemplate="T4" />
      </div>

      {/* Example Table */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="bg-executive px-6 py-4">
              <h2 className="text-cream font-semibold text-lg">EXAMPLE: How to Calculate</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Component</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Offer A (Tech Co)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Offer B (Semiconductor)</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Current Job</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs">How to Calculate</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleData.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.component}</td>
                      <td className="px-4 py-3 text-foreground">{row.offerA}</td>
                      <td className="px-4 py-3 text-foreground">{row.offerB}</td>
                      <td className="px-4 py-3 text-foreground">{row.current}</td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-gold text-white font-bold">
                    <td className="px-4 py-3">{totalRow.component}</td>
                    <td className="px-4 py-3">{totalRow.offerA}</td>
                    <td className="px-4 py-3">{totalRow.offerB}</td>
                    <td className="px-4 py-3">{totalRow.current}</td>
                    <td className="px-4 py-3 text-xs font-normal">{totalRow.formula}</td>
                  </tr>
                  {/* Effective Monthly Row */}
                  <tr className="bg-executive text-cream font-bold">
                    <td className="px-4 py-3">{effectiveMonthlyRow.component}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.offerA}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.offerB}</td>
                    <td className="px-4 py-3">{effectiveMonthlyRow.current}</td>
                    <td className="px-4 py-3 text-xs font-normal">{effectiveMonthlyRow.formula}</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="px-6 py-4 bg-muted border-t border-border text-xs text-muted-foreground italic">
              Note: Sign-on bonus shown at full value in Year 1. In subsequent years, Offer A drops to NT$1,233,800.
            </div>
          </div>
        </div>
      </section>

      {/* Key Insight */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-gold/10 border-l-4 border-gold rounded-r-xl p-6">
            <p className="text-foreground">
              <span className="font-semibold text-gold">💡 Key Insight:</span> Offer B's monthly base is only NT$10,000/month more than Offer A — but the total annual TC is NT$611,800 more because of profit sharing, stock, and bonus structure. Never compare offers by monthly base alone.
            </p>
          </div>
        </div>
      </section>

      {/* Blank Template */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="bg-executive px-6 py-4">
              <h2 className="text-cream font-semibold text-lg">YOUR COMPARISON — Blank Template</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Component</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Offer A: [______]</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Offer B: [______]</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Current Job</th>
                    <th className="text-left px-4 py-3 font-semibold text-muted-foreground text-xs">Formula</th>
                  </tr>
                </thead>
                <tbody>
                  {blankTemplate.map((row, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                      <td className="px-4 py-3 font-medium text-foreground">{row.component}</td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-border text-muted-foreground px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-border text-muted-foreground px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className="border-b-2 border-dashed border-border text-muted-foreground px-4">NT$_______</span>
                      </td>
                      <td className="px-4 py-3 text-muted-foreground text-xs">{row.formula}</td>
                    </tr>
                  ))}
                  {/* Total Row */}
                  <tr className="bg-muted font-bold">
                    <td className="px-4 py-3 text-foreground">TOTAL ANNUAL TC</td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-foreground text-foreground px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-foreground text-foreground px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-foreground text-foreground px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs font-normal">Sum all above</td>
                  </tr>
                  {/* Effective Monthly Row */}
                  <tr className="bg-executive/10 font-bold">
                    <td className="px-4 py-3 text-foreground">Effective Monthly</td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-executive text-executive px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-executive text-executive px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3">
                      <span className="border-b-2 border-executive text-executive px-4">NT$_______</span>
                    </td>
                    <td className="px-4 py-3 text-muted-foreground text-xs font-normal">Total ÷ 12</td>
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
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">How to Use This</h3>
            <ol className="space-y-3">
              {howToUse.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-executive text-cream text-sm font-bold flex items-center justify-center flex-shrink-0">
                    {index + 1}
                  </span>
                  <p className="text-foreground">{item}</p>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Market Data Sources */}
      <section className="pb-12 px-5 md:px-6">
        <div className="container mx-auto max-w-5xl">
          <div className="bg-executive/5 rounded-xl p-6 border-l-4 border-executive">
            <h3 className="font-heading text-xl text-executive mb-4">Where to Find Market Data</h3>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {marketDataSources.map((source, index) => (
                <a 
                  key={index} 
                  href={source.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-start gap-2 text-executive hover:text-gold transition-colors"
                >
                  <ExternalLink className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="font-semibold">{source.name}</p>
                    <p className="text-sm text-muted-foreground">{source.desc}</p>
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
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Table"}
          </Button>
          <Button 
            onClick={shareUrl}
            variant="outline"
            className="border-executive text-executive hover:bg-executive/10 px-6 py-3 h-auto"
          >
            {shared ? <Check className="w-4 h-4 mr-2" /> : <Share2 className="w-4 h-4 mr-2" />}
            {shared ? "Link Copied!" : "Share"}
          </Button>
        </div>
      </section>

      <ToolkitFooter />
    </div>
  );
};

export default CompensationCalculator;
