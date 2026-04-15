import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { usePrintUsage } from "@/hooks/usePrintUsage";
import { LimitReachedModal } from "@/components/LimitReachedModal";
import { nativeShare } from "@/lib/share";
import { trackEvent } from "@/lib/trackEvent";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import ToolkitNav from "@/components/toolkit/ToolkitNav";
import { SEO } from "@/components/SEO";

const exampleWeek = {
  weekOf: "February 3, 2026",
  entries: [
    { day: "Mon", achievement: "Delivered revised API documentation to partner team", impact: "Unblocked 3 downstream integrations waiting 2 weeks", category: "efficiency" },
    { day: "Tue", achievement: "Closed renewal deal with [Client X]", impact: "NT$1.2M ARR retained. Upsold premium tier (+NT$300K)", category: "revenue" },
    { day: "Wed", achievement: "Presented Q4 results to department leads (40 people)", impact: "Received VP recognition in follow-up email", category: "leadership" },
    { day: "Thu", achievement: "Proposed and prototyped automated alert system for prod outages", impact: "Estimated 60% reduction in response time if adopted", category: "innovation" },
    { day: "Fri", achievement: "Paired with junior developer on debugging production issue", impact: "She resolved a P1 independently by end of day", category: "leadership" },
  ],
};

const categories = {
  revenue: { icon: "💰", label: "Revenue", color: "bg-accent/20 text-accent-foreground" },
  efficiency: { icon: "⚡", label: "Efficiency", color: "bg-executive/10 text-executive" },
  leadership: { icon: "👥", label: "Leadership", color: "bg-muted text-foreground" },
  innovation: { icon: "💡", label: "Innovation", color: "bg-gold/20 text-gold-dark" },
};

const goodEntries = [
  { bad: "Worked on the project", good: "Shipped user authentication module, 3 days ahead of deadline" },
  { bad: "Had meetings", good: "Led cross-team sync resolving 2-week blocker on API integration" },
  { bad: "Helped a colleague", good: "Mentored junior dev through first code review. She now reviews independently" },
  { bad: "Did sales stuff", good: "Closed NT$800K deal with [Client]. Shortest sales cycle this quarter (18 days)" },
  { bad: "Fixed bugs", good: "Resolved P1 production outage in 45 minutes. Affected 12K users" },
  { bad: "Attended training", good: "Completed AWS Solutions Architect certification. Applied VPC knowledge to reduce infra costs" },
];

const categoryDescriptions = [
  { ...categories.revenue, desc: "Deals closed, revenue generated, costs saved, clients retained" },
  { ...categories.efficiency, desc: "Time saved, processes improved, bottlenecks removed, automation built" },
  { ...categories.leadership, desc: "People mentored, presentations given, cross-team coordination, hiring" },
  { ...categories.innovation, desc: "New ideas proposed, prototypes built, experiments run, patents filed" },
];

const days = ["Mon", "Tue", "Wed", "Thu", "Fri"];

const AchievementLog = () => {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [shared, setShared] = useState(false);
  const { gatedPrint: printPage, printLimitReached, printCount, printLimit } = usePrintUsage();
  const [showPrintLimitModal, setShowPrintLimitModal] = useState(false);

  const handlePrint = async () => {
    const ok = await printPage();
    if (!ok) setShowPrintLimitModal(true);
  };

  const copyTemplate = () => {
    const templateText = `WEEKLY ACHIEVEMENT LOG

Week of: ________________

Day | Achievement | Impact / Metric | Category
Mon | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
Tue | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
Wed | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
Thu | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡
Fri | _________________________________ | _________________________________ | ☐💰 ☐⚡ ☐👥 ☐💡

CATEGORIES:
💰 Revenue: Deals closed, revenue generated, costs saved, clients retained
⚡ Efficiency: Time saved, processes improved, bottlenecks removed, automation built
👥 Leadership: People mentored, presentations given, cross-team coordination, hiring
💡 Innovation: New ideas proposed, prototypes built, experiments run, patents filed`;

    navigator.clipboard.writeText(templateText);
    trackEvent("copy", "achievement_log");
    setCopied(true);
    toast({ title: "Template copied!", description: "Paste it into a document and fill it in weekly." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = async () => {
    const didShare = await nativeShare();
    if (!didShare) {
      setShared(true);
      toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
      setTimeout(() => setShared(false), 2000);
    }
  };


  return (
      <div className="min-h-screen bg-background">
        <SEO />
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-12 md:py-16 px-5 md:px-6 relative print:hidden">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-cream-70 hover:text-cream transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-cream mb-4">
            Weekly Achievement Log
          </h1>
          <p className="text-lg text-cream-90">
            5 minutes every Friday. The most valuable career habit you will ever build.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="pt-8 print:hidden">
        <ToolkitNav currentTemplate="log" />
      </div>

      {/* How It Works */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-executive rounded-xl p-6">
            <h2 className="text-cream font-semibold text-lg mb-4">How It Works</h2>
            <ol className="space-y-2 text-cream-90">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span>Every Friday, spend 5 minutes writing down what you accomplished this week.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span>Be specific. Use numbers, percentages, dollar amounts, and outcomes.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span>When it is time to ask for a raise, you will have months of documented proof instead of vague memories.</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Example Week */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-muted rounded-xl overflow-hidden shadow-premium">
            <div className="bg-executive px-6 py-3">
              <h2 className="text-cream font-semibold">FILLED EXAMPLE: Week of {exampleWeek.weekOf}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-card">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-foreground w-16">Day</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Achievement</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground">Impact / Metric</th>
                    <th className="text-left px-4 py-3 font-semibold text-foreground w-28">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleWeek.entries.map((entry, index) => {
                    const cat = categories[entry.category as keyof typeof categories];
                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                        <td className="px-4 py-3 font-medium text-foreground">{entry.day}</td>
                        <td className="px-4 py-3 text-foreground">{entry.achievement}</td>
                        <td className="px-4 py-3 text-foreground">{entry.impact}</td>
                        <td className="px-4 py-3">
                          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${cat.color}`}>
                            {cat.icon} {cat.label}
                          </span>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Blank Templates (4 weeks) */}
      <section className="pb-8 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl space-y-6">
          {[1, 2, 3, 4].map((weekNum) => (
            <div key={weekNum} className="bg-card rounded-xl overflow-hidden shadow-premium border border-border print:shadow-none print:border print:border-gray-300 print:break-inside-avoid">
              <div className="bg-muted px-6 py-3 print:bg-gray-50">
                <h2 className="text-foreground font-semibold">BLANK TEMPLATE: Week of ________________</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-muted/50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-foreground w-16">Day</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Achievement</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground">Impact / Metric</th>
                      <th className="text-left px-4 py-3 font-semibold text-foreground w-32">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, index) => (
                      <tr key={day} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                        <td className="px-4 py-4 font-medium text-foreground">{day}</td>
                        <td className="px-4 py-4">
                          <div className="border-b-2 border-dashed border-border h-6"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="border-b-2 border-dashed border-border h-6"></div>
                        </td>
                        <td className="px-4 py-4 text-muted-foreground text-xs">☐💰 ☐⚡ ☐👥 ☐💡</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What Makes a Good Entry */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-xl overflow-hidden shadow-premium border border-border">
            <div className="bg-executive px-6 py-3">
              <h2 className="text-cream font-semibold">What Makes a Good Entry</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-muted">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-destructive">✕ Vague (don't write this)</th>
                    <th className="text-left px-4 py-3 font-semibold text-executive">✓ Specific (write this)</th>
                  </tr>
                </thead>
                <tbody>
                  {goodEntries.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-card" : "bg-muted/50"}>
                      <td className="px-4 py-3 text-muted-foreground italic">{entry.bad}</td>
                      <td className="px-4 py-3 text-foreground">{entry.good}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-card rounded-xl p-6 shadow-premium border border-border">
            <h3 className="font-heading text-lg text-foreground mb-4">Categories</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {categoryDescriptions.map((cat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${cat.color}`}>
                    {cat.icon} {cat.label}
                  </span>
                  <p className="text-muted-foreground text-sm">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5-Minute Friday Habit */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gold/10 rounded-xl p-6 border-l-4 border-gold">
            <h3 className="font-heading text-lg text-gold mb-3">📅 The 5-Minute Friday Habit</h3>
            <p className="text-foreground">
              Set a recurring calendar event: every Friday at 4:30 PM. Title it "Log Wins." Open this page, fill in the week's row, and close it. In 6 months, you will have 120+ documented achievements. More evidence than 99% of people bring to a raise conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={handlePrint}
            disabled={printLimitReached}
            className="bg-executive hover:bg-executive-light text-cream px-6 py-3 h-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print This
          </Button>
          <Button 
            onClick={copyTemplate}
            className="btn-gold px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Template"}
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
      <LimitReachedModal open={showPrintLimitModal} onClose={() => setShowPrintLimitModal(false)} limitType="prints" currentCount={printCount} planLimit={printLimit} lang="en" />
    </div>
  );
};

export default AchievementLog;