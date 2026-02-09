import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Copy, Share2, Linkedin, Check, Printer } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import ToolkitNav from "@/components/toolkit/ToolkitNav";

const exampleWeek = {
  weekOf: "February 3, 2026",
  entries: [
    { day: "Mon", achievement: "Delivered revised API documentation to partner team", impact: "Unblocked 3 downstream integrations that were waiting 2 weeks", category: "efficiency" },
    { day: "Tue", achievement: "Closed renewal deal with [Client X]", impact: "NT$1.2M ARR retained; upsold premium tier (+NT$300K)", category: "revenue" },
    { day: "Wed", achievement: "Presented Q4 results to department leads (40 people)", impact: "Received VP recognition in follow-up email", category: "leadership" },
    { day: "Thu", achievement: "Proposed and prototyped automated alert system for prod outages", impact: "Estimated 60% reduction in response time if adopted", category: "innovation" },
    { day: "Fri", achievement: "Paired with junior developer on debugging production issue", impact: "She resolved a P1 independently by end of day", category: "leadership" },
  ],
};

const categories = {
  revenue: { icon: "💰", label: "Revenue", color: "bg-green-100 text-green-700" },
  efficiency: { icon: "⚡", label: "Efficiency", color: "bg-blue-100 text-blue-700" },
  leadership: { icon: "👥", label: "Leadership", color: "bg-purple-100 text-purple-700" },
  innovation: { icon: "💡", label: "Innovation", color: "bg-orange-100 text-orange-700" },
};

const goodEntries = [
  { bad: "Worked on the project", good: "Shipped user authentication module — 3 days ahead of deadline" },
  { bad: "Had meetings", good: "Led cross-team sync that resolved 2-week blocker on API integration" },
  { bad: "Helped a colleague", good: "Mentored junior dev through first code review; she now reviews independently" },
  { bad: "Did sales stuff", good: "Closed NT$800K deal with [Client]; shortest sales cycle this quarter (18 days)" },
  { bad: "Fixed bugs", good: "Resolved P1 production outage in 45 minutes; affected 12K users" },
  { bad: "Attended training", good: "Completed AWS Solutions Architect certification; applied VPC knowledge to reduce infra costs" },
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
💰 Revenue — Deals closed, revenue generated, costs saved, clients retained
⚡ Efficiency — Time saved, processes improved, bottlenecks removed, automation built
👥 Leadership — People mentored, presentations given, cross-team coordination, hiring
💡 Innovation — New ideas proposed, prototypes built, experiments run, patents filed`;

    navigator.clipboard.writeText(templateText);
    setCopied(true);
    toast({ title: "Template copied!", description: "Paste it into a document and fill it in weekly." });
    setTimeout(() => setCopied(false), 2000);
  };

  const shareUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    setShared(true);
    toast({ title: "Link copied!", description: "Share it with anyone who needs it." });
    setTimeout(() => setShared(false), 2000);
  };

  const printPage = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#1A1A2E]">
      {/* Header */}
      <header className="bg-[#1A1A2E] border-b border-white/10 print:hidden">
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
      <section className="py-12 md:py-16 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl text-center">
          <Link 
            to="/toolkit" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Toolkit
          </Link>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl text-white mb-4">
            Weekly Achievement Log
          </h1>
          <p className="text-lg text-white/70">
            5 minutes every Friday. The most valuable career habit you'll ever build.
          </p>
        </div>
      </section>

      {/* Toolkit Navigation */}
      <div className="print:hidden">
        <ToolkitNav currentTemplate="T7" />
      </div>

      {/* How It Works */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#0F3460] rounded-xl p-6">
            <h2 className="text-white font-semibold text-lg mb-4">How It Works</h2>
            <ol className="space-y-2 text-white/80">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E94560] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">1</span>
                <span>Every Friday, spend 5 minutes writing down what you accomplished that week</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E94560] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">2</span>
                <span>Be specific — use numbers, percentages, dollar amounts, and outcomes</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-[#E94560] text-white text-sm font-bold flex items-center justify-center flex-shrink-0">3</span>
                <span>When it's time to ask for a raise, you'll have months of documented proof instead of vague memories</span>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Example Week */}
      <section className="pb-8 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-[#F8F8F8] rounded-xl overflow-hidden shadow-lg">
            <div className="bg-[#0F3460] px-6 py-3">
              <h2 className="text-white font-semibold">FILLED EXAMPLE: Week of {exampleWeek.weekOf}</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-16">Day</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Achievement</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700">Impact / Metric</th>
                    <th className="text-left px-4 py-3 font-semibold text-gray-700 w-28">Category</th>
                  </tr>
                </thead>
                <tbody>
                  {exampleWeek.entries.map((entry, index) => {
                    const cat = categories[entry.category as keyof typeof categories];
                    return (
                      <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-3 font-medium text-gray-900">{entry.day}</td>
                        <td className="px-4 py-3 text-gray-700">{entry.achievement}</td>
                        <td className="px-4 py-3 text-gray-700">{entry.impact}</td>
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
            <div key={weekNum} className="bg-white rounded-xl overflow-hidden shadow-lg print:shadow-none print:border print:border-gray-300 print:break-inside-avoid">
              <div className="bg-gray-100 px-6 py-3 print:bg-gray-50">
                <h2 className="text-gray-700 font-semibold">BLANK TEMPLATE: Week of ________________</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 w-16">Day</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Achievement</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700">Impact / Metric</th>
                      <th className="text-left px-4 py-3 font-semibold text-gray-700 w-32">Category</th>
                    </tr>
                  </thead>
                  <tbody>
                    {days.map((day, index) => (
                      <tr key={day} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                        <td className="px-4 py-4 font-medium text-gray-900">{day}</td>
                        <td className="px-4 py-4">
                          <div className="border-b-2 border-dashed border-gray-300 h-6"></div>
                        </td>
                        <td className="px-4 py-4">
                          <div className="border-b-2 border-dashed border-gray-300 h-6"></div>
                        </td>
                        <td className="px-4 py-4 text-gray-400 text-xs">☐💰 ☐⚡ ☐👥 ☐💡</td>
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
          <div className="bg-white rounded-xl overflow-hidden shadow-lg">
            <div className="bg-[#0F3460] px-6 py-3">
              <h2 className="text-white font-semibold">What Makes a Good Entry</h2>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="text-left px-4 py-3 font-semibold text-red-600">❌ Vague (don't write this)</th>
                    <th className="text-left px-4 py-3 font-semibold text-green-600">✅ Specific (write this)</th>
                  </tr>
                </thead>
                <tbody>
                  {goodEntries.map((entry, index) => (
                    <tr key={index} className={index % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                      <td className="px-4 py-3 text-gray-500 italic">{entry.bad}</td>
                      <td className="px-4 py-3 text-gray-800">{entry.good}</td>
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
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="font-heading text-lg text-gray-900 mb-4">Categories</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {categoryDescriptions.map((cat, index) => (
                <div key={index} className="flex items-start gap-3">
                  <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium ${cat.color}`}>
                    {cat.icon} {cat.label}
                  </span>
                  <p className="text-gray-600 text-sm">{cat.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5-Minute Friday Habit */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-amber-50 rounded-xl p-6 border-l-4 border-amber-400">
            <h3 className="font-heading text-lg text-amber-800 mb-3">📅 The 5-Minute Friday Habit</h3>
            <p className="text-amber-800">
              Set a recurring calendar event: every Friday at 4:30 PM. Title it "Log Wins." Open this page, fill in the week's row, and close it. That's it. In 6 months, you'll have 120+ documented achievements — more evidence than 99% of people bring to a raise conversation.
            </p>
          </div>
        </div>
      </section>

      {/* Action Buttons */}
      <section className="pb-12 px-5 md:px-6 print:hidden">
        <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={printPage}
            className="bg-[#0F3460] hover:bg-[#0a2a4d] text-white px-6 py-3 h-auto"
          >
            <Printer className="w-4 h-4 mr-2" />
            Print This
          </Button>
          <Button 
            onClick={copyTemplate}
            className="bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 h-auto"
          >
            {copied ? <Check className="w-4 h-4 mr-2" /> : <Copy className="w-4 h-4 mr-2" />}
            {copied ? "Copied!" : "Copy Template"}
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
      <footer className="py-8 px-5 md:px-6 border-t border-white/10 print:hidden">
        <div className="container mx-auto max-w-4xl text-center">
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

export default AchievementLog;
