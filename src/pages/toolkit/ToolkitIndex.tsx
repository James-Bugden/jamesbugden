import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, Linkedin, FileText, Calculator, MessageSquare, TrendingUp, ClipboardList } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";

const templates = [
  {
    id: "T1",
    email: "Email 1",
    title: "Deflection Scripts",
    description: "5 copy-paste scripts for when they ask your salary expectations",
    href: "/toolkit/scripts",
    icon: MessageSquare,
  },
  {
    id: "T2",
    email: "Email 2",
    title: "Offer Response Script",
    description: "3-step flowchart for the 30 seconds after receiving an offer",
    href: "/toolkit/offer-response",
    icon: FileText,
  },
  {
    id: "T3",
    email: "Email 3",
    title: "Counteroffer Email Templates",
    description: "4 pre-written emails for different negotiation scenarios",
    href: "/toolkit/counteroffer",
    icon: FileText,
  },
  {
    id: "T4",
    email: "Email 3",
    title: "Total Compensation Calculator",
    description: "Compare offers beyond the monthly base salary",
    href: "/toolkit/calculator",
    icon: Calculator,
  },
  {
    id: "T5",
    email: "Email 4",
    title: "Pushback Response Cheat Sheet",
    description: "Scripts for when they say \"no budget\" or \"standard offer\"",
    href: "/toolkit/pushback",
    icon: MessageSquare,
  },
  {
    id: "T6",
    email: "Email 5",
    title: "Raise Request One-Pager",
    description: "Build your case on one page for your raise conversation",
    href: "/toolkit/raise",
    icon: TrendingUp,
  },
  {
    id: "T7",
    email: "Email 5",
    title: "Weekly Achievement Log",
    description: "Track your wins every Friday to build your raise case",
    href: "/toolkit/log",
    icon: ClipboardList,
  },
];

const ToolkitIndex = () => {
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
      <section className="py-16 md:py-24 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Link 
            to="/" 
            className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors mb-6 text-sm"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-white mb-4">
            Salary Negotiation Toolkit
          </h1>
          <p className="text-lg md:text-xl text-white/70 max-w-2xl mx-auto">
            7 free templates to help you negotiate your salary with confidence. Taiwan-localized with NT$ and bilingual phrasing.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="pb-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-4">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Link
                  key={template.id}
                  to={template.href}
                  className="group bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#E94560]/50 rounded-xl p-6 transition-all duration-300"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#E94560]/20 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-[#E94560]" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs text-[#E94560] font-semibold uppercase">{template.id}</span>
                        <span className="text-xs text-white/40">•</span>
                        <span className="text-xs text-white/40">{template.email}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-white group-hover:text-[#E94560] transition-colors mb-1">
                        {template.title}
                      </h3>
                      <p className="text-sm text-white/60">
                        {template.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-white/30 group-hover:text-[#E94560] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Email Series CTA */}
      <section className="pb-20 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="bg-gradient-to-r from-[#E94560]/20 to-[#0F3460]/20 rounded-xl p-8 text-center border border-[#E94560]/30">
            <h2 className="font-heading text-2xl md:text-3xl text-white mb-3">
              Get the Complete 5-Email Series
            </h2>
            <p className="text-white/70 mb-6 max-w-xl mx-auto">
              These templates are part of a free 5-email salary negotiation course. Subscribe to get all the context and strategies.
            </p>
            <Link
              to="/"
              className="inline-flex items-center gap-2 bg-[#E94560] hover:bg-[#d13a54] text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              Subscribe Free
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 border-t border-white/10">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-white/50 text-sm">
            From the Salary Negotiation Toolkit by{" "}
            <Link to="/" className="text-[#E94560] hover:underline">James Bugden</Link>
          </p>
        </div>
      </footer>
    </div>
  );
};

export default ToolkitIndex;
