import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, FileText, Calculator, MessageSquare, TrendingUp, ClipboardList } from "lucide-react";
import ToolkitHeader from "@/components/toolkit/ToolkitHeader";
import ToolkitFooter from "@/components/toolkit/ToolkitFooter";
import { SEO } from "@/components/SEO";

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
    description: "A 3-step flowchart for the 30 seconds after you get an offer",
    href: "/toolkit/offer-response",
    icon: FileText,
  },
  {
    id: "T3",
    email: "Email 3",
    title: "Counteroffer Email Templates",
    description: "4 pre-written emails for different negotiation situations",
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
      <div className="min-h-screen bg-background">
      <SEO />
      <ToolkitHeader />

      {/* Hero */}
      <section className="bg-executive-green py-16 md:py-24 px-5 md:px-6 relative">
        <div className="container mx-auto max-w-4xl text-center relative z-10">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-cream mb-4">
            Salary Negotiation Toolkit
          </h1>
          <p className="text-lg md:text-xl text-cream-90 max-w-2xl mx-auto">
            7 free templates to help you negotiate your salary with confidence.
          </p>
        </div>
      </section>

      {/* Templates Grid */}
      <section className="py-16 px-5 md:px-6">
        <div className="container mx-auto max-w-4xl">
          <div className="grid gap-4">
            {templates.map((template) => {
              const IconComponent = template.icon;
              return (
                <Link
                  key={template.id}
                  to={template.href}
                  className="group card-premium bg-card rounded-xl p-6 border border-border"
                >
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center flex-shrink-0">
                      <IconComponent className="w-6 h-6 text-gold" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors mb-1">
                        {template.title}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {template.description}
                      </p>
                    </div>
                    <ArrowRight className="w-5 h-5 text-muted-foreground group-hover:text-gold group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
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
          <div className="bg-executive-green rounded-xl p-8 text-center relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-3">
                Get the Complete 5-Email Series
              </h2>
              <p className="text-cream-90 mb-6 max-w-xl mx-auto">
                These templates are part of a free 5-email salary negotiation course. Subscribe to get all the strategies.
              </p>
              <Link
                to="/"
                className="inline-flex items-center gap-2 btn-gold px-6 py-3 rounded-lg font-semibold"
              >
                Subscribe Free
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ToolkitFooter />
    </div>
  );
};

export default ToolkitIndex;
