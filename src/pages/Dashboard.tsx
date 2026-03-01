import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { ArrowRight } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const tools = [
  {
    emoji: "📄",
    title: "Resume Analyzer",
    description: "Upload your resume. Get a recruiter-level score and specific fixes in 60 seconds.",
    path: "/resume-analyzer",
  },
  {
    emoji: "💰",
    title: "Offer Calculator",
    description: "See how much more you'd earn over 30 years by negotiating strategically.",
    path: "/offer-calculator",
  },
  {
    emoji: "⚖️",
    title: "Offer Calculator Compare",
    description: "Compare two offers side by side — base, bonus, stock, benefits — and see the real difference.",
    path: "/offer-calculator/compare",
  },
  {
    emoji: "📝",
    title: "Resume Builder",
    description: "Build a recruiter-approved resume from scratch using proven templates.",
    path: "/resume",
  },
  {
    emoji: "📋",
    title: "Job Tracker",
    description: "Track every application, interview, and follow-up in one place. Stop losing opportunities.",
    path: "/jobs",
  },
];

type GuideTag = "getting-started" | "applying" | "negotiating";

interface Guide {
  title: string;
  description: string;
  enPath: string;
  zhPath?: string;
  tag: GuideTag;
  isNew?: boolean;
}

const guides: Guide[] = [
  // Getting Started
  { title: "Pivot Method Guide", description: "The complete 5-stage framework for changing careers without starting over.", enPath: "/pivot-method-guide", zhPath: "/zh-tw/pivot-method-guide", tag: "getting-started" },
  { title: "Pivot Method Mini Guide", description: "The same framework in 8 minutes. For when you need the short version.", enPath: "/pivot-method-mini-guide", zhPath: "/zh-tw/pivot-method-mini-guide", tag: "getting-started" },
  { title: "LinkedIn Guide", description: "How to optimize your LinkedIn so recruiters actually find you.", enPath: "/linkedin-guide", zhPath: "/zh-tw/linkedin-guide", tag: "getting-started" },
  { title: "LinkedIn Branding Guide", description: "Build a personal brand that gets you inbound opportunities. Not just a profile update.", enPath: "/linkedin-branding-guide", zhPath: "/zh-tw/linkedin-branding-guide", tag: "getting-started" },
  // Applying
  { title: "Resume Guide", description: "The complete guide to writing a resume that passes the 6-second recruiter scan.", enPath: "/resume-guide", tag: "applying" },
  { title: "Resume Quick Reference", description: "One-page cheat sheet. The rules I check every resume against.", enPath: "/resume-quick-reference", zhPath: "/zh-tw/resume-quick-reference", tag: "applying" },
  { title: "Interview Prep Guide", description: "How to prepare for interviews at foreign companies in Taiwan. What they actually ask and why.", enPath: "/interview-prep-guide", zhPath: "/zh-tw/interview-prep-guide", tag: "applying" },
  { title: "Interview Preparation Guide", description: "The extended version with practice questions, frameworks, and recruiter-insider tips.", enPath: "/interview-preparation-guide", zhPath: "/zh-tw/interview-preparation-guide", tag: "applying" },
  // Negotiating
  { title: "Salary Starter Kit", description: "Everything you need before your next salary conversation. Scripts, data, templates.", enPath: "/salary-starter-kit", zhPath: "/zh-tw/salary-starter-kit", tag: "negotiating" },
];

const filterTabs: { label: string; value: GuideTag | "all" }[] = [
  { label: "All", value: "all" },
  { label: "Getting Started", value: "getting-started" },
  { label: "Applying", value: "applying" },
  { label: "Negotiating", value: "negotiating" },
];

const groupLabels: Record<GuideTag, string> = {
  "getting-started": "Getting Started",
  "applying": "Applying",
  "negotiating": "Negotiating",
};

function GuideCard({ guide }: { guide: Guide }) {
  return (
    <div className="relative bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium">
      {guide.isNew && (
        <span className="absolute top-3 right-3 bg-gold text-white text-[11px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wide">
          NEW
        </span>
      )}
      <div>
        <h4 className="text-base font-bold text-foreground mb-1">{guide.title}</h4>
        <p className="text-muted-foreground text-sm leading-relaxed">{guide.description}</p>
      </div>
      <div className="flex gap-2 mt-4">
        <Link
          to={guide.enPath}
          className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
        >
          EN
        </Link>
        {guide.zhPath && (
          <Link
            to={guide.zhPath}
            className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors"
          >
            中文
          </Link>
        )}
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { user, isLoggedIn, isLoading, signOut } = useAuth();
  const [activeFilter, setActiveFilter] = useState<GuideTag | "all">("all");

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  const filteredGuides = activeFilter === "all" ? guides : guides.filter((g) => g.tag === activeFilter);

  // Group guides by tag for "All" view
  const groupedGuides = activeFilter === "all"
    ? (["getting-started", "applying", "negotiating"] as GuideTag[]).map((tag) => ({
        tag,
        label: groupLabels[tag],
        items: guides.filter((g) => g.tag === tag),
      }))
    : null;

  return (
    <>
      <PageSEO title="Dashboard — James Bugden" description="Your career tools dashboard." path="/dashboard" />

      {/* Nav */}
      <nav className="bg-executive text-cream-light sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 h-14">
          <Link to="/" className="font-heading text-lg tracking-wide text-white">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-white/80">Hey {firstName}</span>
            <button onClick={signOut} className="text-white/70 hover:text-white transition-colors">
              Sign out
            </button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Welcome Banner */}
      <section className="bg-executive">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl text-white">
            Welcome back, {firstName}.
          </h1>
          <div className="bg-white/10 rounded-lg px-4 py-3 max-w-lg">
            <p className="text-white/90 text-sm leading-relaxed">
              <span className="mr-1.5">🆕</span>
              <span className="font-semibold text-white">New: Salary Starter Kit</span> — Everything you need to negotiate your next offer. Scripts, templates, and the exact numbers.{" "}
              <Link to="/salary-starter-kit" className="text-gold font-semibold hover:underline inline-flex items-center gap-0.5">
                Check it out <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-background min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Your Tools */}
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Your Tools</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">
            Interactive tools built with real recruiting data. Use them as many times as you need.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-[3px] border-l-gold p-6 min-h-[180px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
              >
                <div>
                  <span className="text-2xl mb-3 block">{tool.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:text-gold-dark transition-colors">
                    Launch <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>

          {/* Guides Section */}
          <div className="mt-16">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Guides</h2>
            <p className="text-muted-foreground text-sm md:text-base mb-6">
              Step-by-step playbooks for every stage of your job search. Written by a recruiter, not a career blogger.
            </p>

            {/* Filter Tabs */}
            <div className="flex gap-2 mb-8 overflow-x-auto pb-1 -mx-1 px-1">
              {filterTabs.map((tab) => (
                <button
                  key={tab.value}
                  onClick={() => setActiveFilter(tab.value)}
                  className={`whitespace-nowrap text-sm font-medium px-4 py-1.5 rounded-full border transition-colors ${
                    activeFilter === tab.value
                      ? "bg-gold text-white border-gold"
                      : "bg-card text-foreground border-border hover:border-gold/50"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {/* Cards */}
            {activeFilter === "all" && groupedGuides ? (
              groupedGuides.map((group) => (
                <div key={group.tag} className="mb-8">
                  <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">{group.label}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {group.items.map((guide) => (
                      <GuideCard key={guide.enPath} guide={guide} />
                    ))}
                  </div>
                </div>
              ))
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredGuides.map((guide) => (
                  <GuideCard key={guide.enPath} guide={guide} />
                ))}
              </div>
            )}
          </div>
        </div>
      </main>

      {/* Salary Negotiation Toolkit */}
      <section className="bg-[hsl(39_20%_90%)]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-12 md:py-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Salary Negotiation Toolkit</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">
            A complete system for negotiating your offer. Start with the index, then use each tool when you need it.
          </p>

          {/* Featured Card */}
          <div className="relative bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-[4px] border-l-gold p-6 md:p-8 mb-6 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium bg-gradient-to-r from-gold/5 to-transparent">
            <span className="absolute top-4 right-4 bg-gold text-white text-[11px] font-bold px-2.5 py-0.5 rounded-full uppercase tracking-wide">
              START HERE
            </span>
            <span className="text-2xl mb-3 block">📖</span>
            <h3 className="text-lg font-bold text-foreground mb-1">Toolkit Index</h3>
            <p className="text-muted-foreground text-sm leading-relaxed mb-4">
              The full overview of every tool in this kit. Read this first to know what to use and when.
            </p>
            <div className="flex gap-2">
              <Link to="/toolkit" className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors">EN</Link>
              <Link to="/zh-tw/toolkit" className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors">中文</Link>
            </div>
          </div>

          {/* Toolkit Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { title: "Deflection Scripts", desc: "What to say when they ask your salary expectations too early. Word-for-word scripts.", en: "/toolkit/scripts", zh: "/zh-tw/toolkit/scripts" },
              { title: "Offer Response", desc: "How to respond to an offer without accepting or rejecting. Buy time and negotiate better.", en: "/toolkit/offer-response", zh: "/zh-tw/toolkit/offer-response" },
              { title: "Counteroffer Email", desc: "Copy-paste email templates for countering an offer professionally.", en: "/toolkit/counteroffer", zh: "/zh-tw/toolkit/counteroffer" },
              { title: "Compensation Calculator", desc: "Calculate your total comp — base, bonus, stock, benefits — so you compare offers properly.", en: "/toolkit/calculator", zh: "/zh-tw/toolkit/calculator" },
              { title: "Comp Calculator Interactive", desc: "The interactive version. Plug in two offers and see the real difference.", en: "/toolkit/calculator-interactive", zh: "/zh-tw/toolkit/calculator-interactive" },
              { title: "Pushback Cheat Sheet", desc: "When they say 'this is our best offer' or 'the budget is fixed' — here's what to say back.", en: "/toolkit/pushback", zh: "/zh-tw/toolkit/pushback" },
              { title: "Raise One-Pager", desc: "A one-page template to present your case for a raise to your manager. Data-backed, not emotional.", en: "/toolkit/raise", zh: "/zh-tw/toolkit/raise" },
              { title: "Achievement Log", desc: "Track your wins weekly so when review time comes, you have the evidence ready.", en: "/toolkit/log", zh: "/zh-tw/toolkit/log" },
            ].map((item) => (
              <div key={item.en} className="bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] p-6 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium">
                <div>
                  <h4 className="text-base font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">{item.desc}</p>
                </div>
                <div className="flex gap-2 mt-4">
                  <Link to={item.en} className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors">EN</Link>
                  <Link to={item.zh} className="text-xs font-semibold px-3 py-1 rounded-full border border-gold text-gold hover:bg-gold hover:text-white transition-colors">中文</Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Coaching CTA */}
      <section className="bg-executive">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-16 md:py-20 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-white mb-4">Want 1-on-1 help?</h2>
          <p className="text-white/85 text-base md:text-lg max-w-2xl mx-auto mb-8 leading-relaxed">
            These tools get you 80% of the way. If you want someone to look at your specific situation — resume, interviews, salary negotiation — I work with a few people each month.
          </p>
          <a
            href="https://calendly.com"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-white font-semibold px-8 py-3 rounded-lg transition-colors text-base"
          >
            See If You're a Fit <ArrowRight className="w-4 h-4" />
          </a>
          <p className="text-white/50 text-sm mt-4">Free intro call · No commitment · No pressure</p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-background py-10 text-center">
        <p className="font-heading text-lg text-foreground/60 mb-1">JAMES BUGDEN</p>
        <p className="text-muted-foreground text-sm mb-1">james.careers</p>
        <p className="text-muted-foreground/60 text-xs">© 2026 All Rights Reserved</p>
      </footer>
    </>
  );
}