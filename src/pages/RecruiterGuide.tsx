import { FileText, Clock, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, Target, Shield, Briefcase, ChevronDown, Menu, Search, Phone, Mail, Star, TrendingUp, UserCheck, Eye, EyeOff, Zap, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const selfAssessmentQs = [
  "Have you been contacted by a headhunter in the last 12 months?",
  "Do you have a specialized skill most people in your field don't have?",
  "Is your total compensation above the market median for your role and city?",
  "Do you have domain expertise in a specific industry, not a general function?",
  "Have you worked at a company well-known in your field?",
  "Do you have a rare combination of skills (e.g., technical depth + management)?",
  "If you posted on LinkedIn that you're open to work, would headhunters reach out within a week?",
];

const RecruiterSelfAssessment = () => {
  const [answers, setAnswers] = useState<Record<number, boolean>>({});
  const answered = Object.keys(answers).length;
  const yesCount = Object.values(answers).filter(Boolean).length;
  const done = answered === selfAssessmentQs.length;

  const result = done
    ? yesCount >= 5 ? { emoji: "🐟", label: "You're a tuna.", desc: "Headhunters are looking for you." }
    : yesCount >= 3 ? { emoji: "🔄", label: "You're on the border.", desc: "This guide will help you get on more radars." }
    : { emoji: "🐱", label: "You're a catfish right now.", desc: "That's fine. This guide will show you how to start building toward tuna." }
    : null;

  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
      <p className="text-xs font-bold text-accent uppercase tracking-wider mb-4">Self-Assessment: Where Do You Sit? (7 Questions)</p>
      <div className="space-y-3">
        {selfAssessmentQs.map((q, i) => (
          <div key={i} className="flex items-start gap-3">
            <span className="text-sm text-muted-foreground font-medium mt-0.5 w-5 shrink-0">{i + 1}.</span>
            <p className="text-sm text-foreground/80 flex-1">{q}</p>
            <div className="flex gap-1.5 shrink-0">
              <button
                onClick={() => setAnswers(prev => ({ ...prev, [i]: true }))}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${answers[i] === true ? "bg-accent text-accent-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >Yes</button>
              <button
                onClick={() => setAnswers(prev => ({ ...prev, [i]: false }))}
                className={`px-3 py-1 rounded text-xs font-bold transition-colors ${answers[i] === false ? "bg-destructive text-destructive-foreground" : "bg-muted text-muted-foreground hover:bg-muted/80"}`}
              >No</button>
            </div>
          </div>
        ))}
      </div>
      {done && result && (
        <div className="mt-5 p-4 bg-accent/10 border border-accent/20 rounded-lg text-center">
          <p className="text-2xl mb-1">{result.emoji}</p>
          <p className="font-heading font-bold text-foreground">{result.label}</p>
          <p className="text-sm text-muted-foreground mt-1">{result.desc}</p>
          <p className="text-xs text-muted-foreground mt-2">Score: {yesCount}/7</p>
        </div>
      )}
      {!done && answered > 0 && (
        <p className="text-xs text-muted-foreground mt-3">{answered}/7 answered</p>
      )}
    </div>
  );
};

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">
    {num}
  </span>
);

const Collapsible = ({ title, children }: { title: string; children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-border rounded-xl overflow-hidden">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between p-4 md:p-5 bg-card hover:bg-muted/50 transition-colors text-left">
        <span className="text-foreground font-medium text-sm md:text-base">{title}</span>
        <ChevronDown className={`w-5 h-5 text-muted-foreground transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-4 md:px-5 pb-4 md:pb-5 bg-card border-t border-border">{children}</div>}
    </div>
  );
};

const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "difference", label: "01 · Recruiters vs Headhunters" },
  { id: "business", label: "02 · How the Business Works" },
  { id: "process", label: "03 · The Headhunter's Process" },
  { id: "tuna", label: "04 · Tuna or Catfish?" },
  { id: "levels", label: "05 · Experience Levels" },
  { id: "rules", label: "06 · The 7 Rules" },
  { id: "find", label: "07 · Finding Recruiters" },
  { id: "multiple", label: "08 · Multiple Headhunters" },
  { id: "ghosting", label: "09 · When They Ghost You" },
  { id: "cheatsheet", label: "Cheat Sheet" },
];

const TableOfContents = () => {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) setActive(visible[0].target.id);
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    tocSections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`}
              onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-xs py-1 pl-2 border-l-2 transition-colors ${active === id ? "border-gold text-gold font-semibold" : "border-transparent text-muted-foreground hover:text-foreground"}`}
            >{label}</a>
          ))}
        </nav>
      </aside>
      {/* Mobile FAB */}
      <div className="xl:hidden fixed bottom-6 left-4 z-40">
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Table of contents"
        >
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 w-56 bg-card border border-border rounded-xl shadow-xl p-3 max-h-72 overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2 px-2">Contents</p>
            <nav className="space-y-0.5">
              {tocSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`}
                  onClick={(e) => { e.preventDefault(); setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground"}`}
                >{label}</a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const TemplateBox = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-executive/5 border border-executive/20 rounded-xl p-4 md:p-5 my-4">
    <p className="text-sm font-semibold text-executive mb-2 flex items-center gap-2"><FileText className="w-4 h-4" />{title}</p>
    <div className="text-sm text-foreground/80 leading-relaxed whitespace-pre-line">{children}</div>
  </div>
);

const InfoBox = ({ icon: Icon, title, children, variant = "default" }: { icon: any; title: string; children: React.ReactNode; variant?: "default" | "warning" | "success" }) => {
  const styles = {
    default: "bg-muted/50 border-border",
    warning: "bg-amber-50 dark:bg-amber-950/20 border-amber-200 dark:border-amber-800",
    success: "bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-800",
  };
  return (
    <div className={`border rounded-xl p-4 md:p-5 my-4 ${styles[variant]}`}>
      <p className="font-semibold text-sm flex items-center gap-2 mb-2"><Icon className="w-4 h-4" />{title}</p>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  );
};

export default function RecruiterGuide() {
  useTrackGuideProgress("recruiter-guide");

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/recruiter-guide", title: "How Recruiters Think | Insider Guide", description: "See hiring from the other side. How recruiters source, screen, and evaluate candidates." })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">hiresign</Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            How to Get Recruiters<br className="hidden md:block" /> to Fight Over You
          </h1>
          <p className="text-lg md:text-xl text-cream/90 mb-3">
            The insider playbook to getting headhunted
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-gold-soft/80">By James Bugden, Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-gold-soft/80">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 min read</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground/80 leading-relaxed mb-4">
            This guide gives you the insider playbook, written by a recruiter and headhunter who sits on the other side of the table every day. You'll learn how recruiters and headhunters think, what makes them pick up the phone for one candidate and ignore another, and how to build relationships that open doors for the rest of your career.
          </p>
          <p className="text-foreground/80 leading-relaxed mb-4">
            Why work with recruiters and headhunters at all? Because many roles never get posted publicly. Because they have direct relationships with hiring managers. Because when they submit you, you skip the pile and go to the front of the line.
          </p>
          <InfoBox icon={FileText} title="Before you read this guide">
            <p>Your resume is the first thing a recruiter or headhunter sees. If yours isn't ready, start with the <Link to="/resume-guide" className="text-gold underline hover:text-gold/80">Perfect Resume: 10 Golden Rules</Link> guide before reading this one.</p>
          </InfoBox>
        </div>
      </section>

      <main className="container mx-auto max-w-3xl px-5 md:px-6 py-10 md:py-16">

        {/* ─── Section 2: Recruiters vs Headhunters ─── */}
        <section id="difference" className="mb-16 scroll-mt-20">
          <SectionNumber num="01" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">Recruiters vs Headhunters: Know the Difference</h2>

          <p className="text-foreground/80 leading-relaxed mb-4">This distinction matters. Throughout this guide, these two terms mean different things.</p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-foreground mb-2 flex items-center gap-2"><Briefcase className="w-4 h-4 text-gold" /> Recruiters (Internal)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Employees of the company they hire for. They fill roles for their employer only. They know the culture deeply and have direct access to the hiring manager. At large companies, internal recruiting teams include sourcers who find candidates, recruiters who manage the process, and coordinators who handle logistics. Sourcers use LinkedIn Recruiter (a paid tool) to search for candidates by keywords, skills, location, and job title. Your LinkedIn profile is their search engine.
              </p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-foreground mb-2 flex items-center gap-2"><Search className="w-4 h-4 text-gold" /> Headhunters (External)</h3>
              <p className="text-sm text-foreground/80 leading-relaxed">
                Independent. They work with multiple client companies. How they get paid depends on the type, retained, contingency, staffing, or outplacement.
              </p>
            </div>
          </div>

          <Collapsible title="Types of Headhunters">
            <ul className="space-y-3 mt-3 text-sm text-foreground/80">
              <li><strong>Retained search firms</strong> get paid upfront to fill a specific role. These are usually senior or executive positions. The company is serious because they've already invested money. You'll be one of a small shortlist (often 5-6 candidates). These are the best odds you'll get.</li>
              <li><strong>Contingency headhunters</strong> get paid only when a hire is made. The role might also have other headhunters working on it. More competitive, but contingency headhunters fill the most roles in the market. They work mid-level to senior roles across every industry.</li>
              <li><strong>Staffing and contract agencies</strong> hire you as their employee and place you at a client company for temporary or contract work. You pay nothing. The client pays the agency a premium hourly rate. This is a common entry point for getting into companies that are hard to break into directly. Contract-to-permanent is a real path.</li>
              <li><strong>Outplacement firms</strong> help laid-off workers find new jobs. Your former employer pays for this service. They provide resume help, interview coaching, and job search support. You don't choose them. Your employer hires them on your behalf.</li>
            </ul>
          </Collapsible>

          <InfoBox icon={Target} title="Which to target based on your level">
            <ul className="space-y-1 mt-1">
              <li>• Early career / common skills → internal recruiters, staffing agencies</li>
              <li>• Mid-career / specialized → contingency headhunters</li>
              <li>• Senior / executive → retained search firms + contingency headhunters</li>
              <li>• Career changers → staffing agencies (for bridge roles) + contingency headhunters in your target industry</li>
            </ul>
          </InfoBox>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">Not All Headhunters Are Good</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">Headhunter quality varies widely. The field attracts people from all kinds of backgrounds, and not everyone has deep industry expertise. Your job is to figure out which headhunter is worth your time before you hand over your resume and career details.</p>

          <div className="grid md:grid-cols-2 gap-4 my-4">
            <div className="border border-red-200 dark:border-red-900 bg-red-50 dark:bg-red-950/20 rounded-xl p-4">
              <p className="font-semibold text-sm flex items-center gap-2 mb-2 text-red-700 dark:text-red-400"><XCircle className="w-4 h-4" /> Red Flags</p>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• Won't tell you where they're sending your resume</li>
                <li>• Blast your resume to companies without permission</li>
                <li>• Pressure you to accept mismatched roles</li>
                <li>• Can't answer basic questions about the company/role</li>
                <li>• Disappear after the initial call</li>
                <li>• No presence or credibility on LinkedIn</li>
              </ul>
            </div>
            <div className="border border-emerald-200 dark:border-emerald-900 bg-emerald-50 dark:bg-emerald-950/20 rounded-xl p-4">
              <p className="font-semibold text-sm flex items-center gap-2 mb-2 text-emerald-700 dark:text-emerald-400"><CheckCircle2 className="w-4 h-4" /> Green Flags</p>
              <ul className="text-sm space-y-1 text-foreground/80">
                <li>• Ask detailed questions about your goals and deal-breakers</li>
                <li>• Prep you before interviews with insider knowledge</li>
                <li>• Give honest feedback, even when it's not what you want</li>
                <li>• Communicate regularly and return calls/emails</li>
                <li>• Have a track record in your industry</li>
                <li>• Protect your confidentiality</li>
              </ul>
            </div>
          </div>

          <Collapsible title="Questions to ask a headhunter before committing">
            <ul className="space-y-2 mt-3 text-sm text-foreground/80">
              <li>• How long have you been recruiting in this industry?</li>
              <li>• Is this role exclusive to you or are other headhunters working on it?</li>
              <li>• How many candidates are you submitting?</li>
              <li>• What's your relationship with the hiring manager?</li>
            </ul>
          </Collapsible>
        </section>

        {/* ─── Section 3: How the Business Works ─── */}
        <section id="business" className="mb-16 scroll-mt-20">
          <SectionNumber num="02" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">How the Business Works</h2>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">The Business Model (Headhunters)</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">You are the product. The company is the customer. The headhunter is the broker.</p>

          {/* Infographic: Business model */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <div className="flex flex-col md:flex-row items-center justify-center gap-4 md:gap-8">
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-gold/10 flex items-center justify-center mx-auto mb-2"><Users className="w-7 h-7 text-gold" /></div>
                <p className="font-bold text-sm">YOU</p>
                <p className="text-xs text-muted-foreground">(Product)</p>
                <p className="text-xs text-muted-foreground mt-1">You pay nothing.<br/>You get coached.<br/>You get placed.</p>
              </div>
              <div className="text-gold font-bold text-lg">←</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-executive/10 flex items-center justify-center mx-auto mb-2"><Search className="w-7 h-7 text-executive" /></div>
                <p className="font-bold text-sm">HEADHUNTER</p>
                <p className="text-xs text-muted-foreground">(Broker)</p>
                <p className="text-xs text-muted-foreground mt-1">Screens you.<br/>Preps you.<br/>Advocates for you.</p>
              </div>
              <div className="text-gold font-bold text-lg">→</div>
              <div className="text-center">
                <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center mx-auto mb-2"><Briefcase className="w-7 h-7 text-foreground/60" /></div>
                <p className="font-bold text-sm">COMPANY</p>
                <p className="text-xs text-muted-foreground">(Customer)</p>
                <p className="text-xs text-muted-foreground mt-1">Pays the fee.<br/>Sets requirements.<br/>Makes hire decision.</p>
              </div>
            </div>
            <p className="text-center text-xs text-muted-foreground mt-4 italic">The headhunter works FOR the company, but is financially motivated to get YOU hired.</p>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">Once a headhunter picks you as their candidate, they are financially motivated to get you hired. They will coach you, prep you, and push the company for a decision. But they need you to be a candidate worth betting on.</p>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">The Business Model (Internal Recruiters)</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">Internal recruiters are salaried employees of the company. They don't earn a fee per placement. They have hiring targets to hit. Their incentive is to fill roles with qualified candidates who will stay and perform well. They are on your side during the process, but their priority is the company, not you.</p>

          <Collapsible title="Who's involved in the hiring process at larger companies">
            <ul className="space-y-3 mt-3 text-sm text-foreground/80">
              <li><strong>The hiring manager</strong> runs the show. They define requirements, set up the interview process, and make the final hire/no-hire decision. You usually don't talk to them until later in the process.</li>
              <li><strong>The recruiter</strong> coordinates everything. They screen candidates, guide you through the process, and have target numbers of hires to hit.</li>
              <li><strong>The sourcer</strong> proactively reaches out on LinkedIn and other channels to find candidates. When a sourcer messages you, they want to get you into the pipeline. This does not mean you have a job. You still go through the full interview process.</li>
              <li><strong>The inbound sourcer</strong> (at larger companies) screens all incoming applications. At big companies, there are hundreds of applications per week per role. This person decides which resumes get forwarded to the recruiter.</li>
              <li><strong>The recruitment coordinator</strong> manages logistics: scheduling interviews, booking travel, swapping interviewers when schedules conflict.</li>
            </ul>
            <p className="text-sm text-foreground/80 mt-3">Both the recruiter and the inbound sourcer need to make hires to hit their goals. They are fundamentally on your side. But they also need to match the requirements the hiring manager set.</p>
            <p className="text-sm text-foreground/80 mt-2">At startups, the hiring manager often does everything: resume screen, phone call, interview coordination. Less competition, shorter process, faster decisions. The trade-off: smaller companies are less known, sometimes pay less, and carry more risk. But the competition is much lower.</p>
          </Collapsible>

          {/* Infographic: Hiring Funnel */}
          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">The Hiring Pipeline</h3>
          <p className="text-foreground/80 leading-relaxed mb-4">At large, well-known companies, the pipeline typically looks like this:</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6 space-y-3">
            {[
              { label: "200+ applications", w: "100%", color: "bg-muted-foreground/20" },
              { label: "30-50 resume screens", w: "50%", color: "bg-muted-foreground/30" },
              { label: "10-15 recruiter screens", w: "30%", color: "bg-accent/30" },
              { label: "5-8 technical screens", w: "18%", color: "bg-accent/50" },
              { label: "2-3 final interviews", w: "10%", color: "bg-accent/70" },
              { label: "1 offer", w: "5%", color: "bg-executive-green" },
            ].map((step) => (
              <div key={step.label}>
                <div className={`${step.color} rounded-md h-7 flex items-center px-3`} style={{ width: step.w, minWidth: "fit-content" }}>
                  <span className={`text-xs font-medium whitespace-nowrap ${step.color === "bg-executive-green" ? "text-cream" : "text-foreground"}`}>{step.label}</span>
                </div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic mt-2">← Steepest drop: resume screen →</p>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80 mb-6">
            <li>Your application enters the Applicant Tracking System (ATS) queue. Not all applications get reviewed.</li>
            <li>Resume screen. A recruiter or inbound sourcer spends 5-20 seconds scanning your resume. This is where the steepest drop-off happens.</li>
            <li>Recruiter screen. A phone call to confirm experience, motivation, and soft skills.</li>
            <li>Technical or competency screen. A deeper evaluation of your skills.</li>
            <li>Final interviews. Multiple rounds with hiring managers, team members, and senior leaders.</li>
            <li>Offer. A pipeline starting with 100+ qualified resumes commonly produces a single offer.</li>
          </ol>

          {/* Resume Priority Stack */}
          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">How Your Resume Gets Prioritized</h3>
          <div className="bg-card border border-border rounded-xl p-5 my-6 space-y-2">
            {[
              { rank: 1, label: "Referrals", desc: "Almost always read in depth." },
              { rank: 2, label: "Headhunter submissions", desc: "Similar boost as a referral." },
              { rank: 3, label: "Local candidates", desc: "No relocation, no paperwork." },
              { rank: 4, label: "No visa needed", desc: "Faster to start." },
              { rank: 5, label: "Visa + relocation", desc: "Most expensive. Last priority." },
            ].map(({ rank, label, desc }) => (
              <div key={rank} className="flex items-center gap-3 p-2.5 rounded-lg bg-muted/50">
                <span className="w-7 h-7 rounded-full bg-gold/10 text-gold font-bold text-xs flex items-center justify-center shrink-0">{rank}</span>
                <div><p className="text-sm font-medium text-foreground">{label}</p><p className="text-xs text-muted-foreground">{desc}</p></div>
              </div>
            ))}
            <p className="text-xs text-muted-foreground italic mt-2">This is why building headhunter relationships matters. When a headhunter submits you, you move up the priority list.</p>
          </div>
        </section>

        {/* ─── Section 4: The Headhunter's Process ─── */}
        <section id="process" className="mb-16 scroll-mt-20">
          <SectionNumber num="03" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">The Headhunter's Process: Step by Step</h2>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {[
                { step: 1, title: "Brief", desc: "Company sets specs" },
                { step: 2, title: "Search", desc: "Database + network" },
                { step: 3, title: "Contact", desc: "Email or LinkedIn" },
                { step: 4, title: "Screen", desc: "2-3 calls, different days" },
                { step: 5, title: "References", desc: "Reference checks" },
                { step: 6, title: "Present", desc: "Top 3-5 to hiring manager" },
                { step: 7, title: "Interview", desc: "Headhunter = your coach" },
                { step: 8, title: "Result", desc: "Hire or pass" },
              ].map(({ step, title, desc }) => (
                <div key={step} className="bg-muted/50 rounded-lg p-3 text-center">
                  <p className="text-gold font-bold text-lg">{step}</p>
                  <p className="font-bold text-sm text-foreground">{title}</p>
                  <p className="text-xs text-muted-foreground mt-1">{desc}</p>
                </div>
              ))}
            </div>
          </div>

          <ol className="list-decimal list-inside space-y-2 text-sm text-foreground/80 mb-4">
            <li>Company gives the headhunter a job to fill (with specific requirements)</li>
            <li>Headhunter searches their database and network for matches</li>
            <li>Headhunter contacts potential candidates (usually by email or LinkedIn)</li>
            <li>Headhunter screens candidates with 2-3 phone calls on separate days (to check for consistency)</li>
            <li>Headhunter checks references</li>
            <li>Headhunter presents the top candidates to the hiring manager (by this point, the headhunter knows you inside and out)</li>
            <li>Company interviews the candidate (headhunter becomes your interview coach and advocate)</li>
            <li>Company hires or passes. If hired, headhunter bills the company. If passed, headhunter keeps you in the database for next time.</li>
          </ol>

          <InfoBox icon={AlertTriangle} title="Where most candidates fail" variant="warning">
            <p>The screening call at step 4 is where most candidates lose. For a full breakdown of how to pass it, check out the <Link to="/hr-interview-guide" className="text-gold underline hover:text-gold/80">Screening Playbook</Link> guide.</p>
          </InfoBox>

          <p className="text-foreground/80 leading-relaxed">If you've been professional and easy to work with, the headhunter will remember you every time a matching role comes in. The long game matters more than any single placement.</p>
        </section>

        {/* ─── Section 5: Tuna or Catfish? ─── */}
        <section id="tuna" className="mb-16 scroll-mt-20">
          <SectionNumber num="04" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">Are You a Bluefin Tuna or a Catfish?</h2>

          <p className="text-foreground/80 leading-relaxed mb-4">A framework for understanding how headhunters value you:</p>

          <div className="grid md:grid-cols-2 gap-4 my-6">
            <div className="bg-gold/5 border border-gold/20 rounded-xl p-5">
              <h3 className="font-heading font-bold text-gold mb-2 flex items-center gap-2"><Star className="w-4 h-4" /> Bluefin Tuna</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Rare skills</li>
                <li>• Hard to find</li>
                <li>• Headhunters chase you</li>
                <li>• Specialized + in demand</li>
                <li>• Companies pay headhunters to find you</li>
              </ul>
            </div>
            <div className="bg-muted/50 border border-border rounded-xl p-5">
              <h3 className="font-heading font-bold text-muted-foreground mb-2 flex items-center gap-2"><Users className="w-4 h-4" /> Catfish</h3>
              <ul className="text-sm text-foreground/80 space-y-1">
                <li>• Common skills</li>
                <li>• Easy to find</li>
                <li>• Companies find you on their own</li>
                <li>• Generalist. Replaceable.</li>
                <li>• Companies don't need to pay to find you</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground/80 leading-relaxed mb-4">The honest truth: if your skills are common and your experience is generic, headhunters will deprioritize you. Not because you're bad. Because companies don't need to pay a placement fee to find you.</p>

          <RecruiterSelfAssessment />

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">What Makes Someone a "Tuna"</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• Specialized skills in demand but short supply in your field</li>
            <li>• Domain expertise (deep knowledge of a specific industry combined with your function)</li>
            <li>• Leadership experience at recognized companies</li>
            <li>• Rare combinations (e.g., engineering + management, finance + operations)</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-foreground mt-6 mb-3">How to Move from Catfish to Tuna</h3>
          <ul className="space-y-1 text-sm text-foreground/80">
            <li>• Build specialized experience in a niche area of your field</li>
            <li>• Get into recognized companies, even in smaller roles, to build your brand</li>
            <li>• Develop T-shaped skills: deep in one area, broad enough to connect across functions</li>
            <li>• Build a track record of measurable results you can point to</li>
          </ul>
        </section>

        {/* ─── Section 6: Experience Levels ─── */}
        <section id="levels" className="mb-16 scroll-mt-20">
          <SectionNumber num="05" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">How Your Experience Level Changes Everything</h2>

          <div className="space-y-3 my-6">
            {[
              { level: "Director / VP / Executive", target: "Retained search firms + contingency", score: 12, desc: "Tuna. They come to you." },
              { level: "Senior (8+ yrs)", target: "Retained + contingency headhunters", score: 9, desc: "Likely tuna." },
              { level: "Mid-career (5-8)", target: "Contingency headhunters", score: 6, desc: "Transition zone." },
              { level: "Early-mid (3-5)", target: "Contingency headhunters (start connecting)", score: 4, desc: "Building relationships." },
              { level: "Early career (0-2)", target: "Internal recruiters + staffing agencies", score: 2, desc: "Catfish. Build skills." },
              { level: "Career changers", target: "Staffing agencies + contingency in target industry", score: 3, desc: "Depends on transferables." },
            ].map(({ level, target, score, desc }) => (
              <div key={level} className="bg-card border border-border rounded-xl p-4 flex flex-col md:flex-row md:items-center gap-3">
                <div className="md:w-1/3">
                  <p className="font-bold text-sm text-foreground">{level}</p>
                  <p className="text-xs text-muted-foreground">{target}</p>
                </div>
                <div className="md:w-1/3">
                  <div className="flex gap-0.5">
                    {Array.from({ length: 12 }).map((_, i) => (
                      <div key={i} className={`h-3 w-3 rounded-sm ${i < score ? "bg-gold" : "bg-muted"}`} />
                    ))}
                  </div>
                </div>
                <p className="text-xs text-muted-foreground md:w-1/3">{desc}</p>
              </div>
            ))}
          </div>

          <Collapsible title="Detailed breakdown by experience level">
            <div className="space-y-4 mt-3 text-sm text-foreground/80">
              <div>
                <p className="font-semibold text-foreground mb-1">Early career (0-2 years)</p>
                <p>Competing with the highest volume of applicants. At this stage, your resume looks like hundreds of others. Internships, relevant projects, leadership activities, and certifications are what separate you from the pile. Recruiters see a flood of early-career applications. Without something distinctive, your resume won't get a second look. Focus on internal recruiters and staffing agencies. Headhunters rarely work early-career roles because the placement fees are too low.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Early-to-mid career (3-5 years)</p>
                <p>You've built real experience. You have stories to tell about what you've accomplished. This is where headhunter relationships start forming. You're not senior enough to be headhunted automatically, but you're experienced enough to be worth a headhunter's time on the right role. Start connecting with headhunters in your industry.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Mid-career (5-8 years)</p>
                <p>This is the transition zone from catfish to tuna. You've built enough depth to be specialized. Get into recognized companies. Develop a track record of results. This is where contingency headhunters become your best channel.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Senior (8+ years)</p>
                <p>Your resume should emphasize leadership, impact, and scope. Not what you did, but what happened because you did it. Revenue generated. Teams built. Markets entered. Systems scaled. Retained search firms enter the picture at this level.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Directors, VPs, and executives</p>
                <p>The resume shifts from individual contribution to organizational outcomes. How many people did you lead? What was the business impact? At this level, headhunters come to you. The question isn't whether they'll call. It's which relationships you maintain and which roles you're open to.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground mb-1">Career changers</p>
                <p>Headhunters are harder to work with when you're changing fields. Focus on transferable skills, build bridge experience (contract work, side projects, volunteering in the new field), and target headhunters who specialize in the industry you're moving into, not the one you're leaving. For a full breakdown, check out the <Link to="/pivot-method-guide" className="text-gold underline hover:text-gold/80">Pivot Method</Link> guide.</p>
              </div>
            </div>
          </Collapsible>
        </section>

        {/* ─── Section 7: The 7 Rules ─── */}
        <section id="rules" className="mb-16 scroll-mt-20">
          <SectionNumber num="06" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">The 7 Rules That Make Recruiters Want to Work with You</h2>

          {/* Rule 1 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 1: Understand Who Pays Them</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">Headhunters get paid by the company, not by you. Internal recruiters are employed by the company. In both cases, the company is the client.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Don't waste their time on roles you won't take. Don't let them submit you to get a counter-offer from your current employer. Don't say yes to relocation when you won't move. Do any of these and the relationship is over.</p>
          </div>

          {/* Rule 2 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 2: Keep Their Secrets</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">When a headhunter tells you about a role, don't share the details with other headhunters or candidates. Don't apply to the company directly after learning about the role through a headhunter. Their information is their livelihood.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">This protects you too: if you're currently employed, a good headhunter protects your confidentiality. A bad one blasts your resume everywhere.</p>
          </div>

          {/* Rule 3 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 3: Be Honest About Everything</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">Don't lie on your resume. Don't embellish. Don't hide a firing, a gap, or a problem. Headhunters and recruiters will find out. They check references you didn't give them. They talk to other headhunters. If they find out you lied after submitting you to a client, your name is burned.</p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">If you have a problem in your past, tell the headhunter upfront. They have placed candidates with firings, gaps, and career issues. They know how to position it. But they need to know first.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">If you've already applied to a company directly, tell the headhunter before they submit you. A headhunter cannot place you at a company that already has your resume on file.</p>
          </div>

          <TemplateBox title="Script: Disclosing a Firing">
            {"\"I want to be upfront with you. I was let go from [Company] in [month/year]. [One sentence on what happened. Keep it factual, no blame.] It was a tough experience, but here's what I took from it: [one sentence on what you learned or changed]. I wanted you to hear it from me first so there are no surprises.\""}
          </TemplateBox>

          <TemplateBox title="Script: Disclosing a Career Gap">
            {"\"You'll see a gap on my resume from [date] to [date]. [One sentence explanation: family leave, health, caregiving, personal project, layoff recovery, etc.] During that time I [anything productive you did: freelanced, took courses, volunteered, etc. If nothing, that's fine too.] I'm ready to get back in and here's why I'm excited about [target role/industry].\""}
          </TemplateBox>

          <TemplateBox title="Script: Disclosing a Career Issue (Legal, Conduct, etc.)">
            {"\"Before we go further, I want to share something. [State the issue in one sentence. Be direct.] Here's the context: [2-3 sentences max. Facts, no excuses.] I've [what you've done to address or resolve it]. I'd rather you know now so we can work with it than have it come up later.\""}
          </TemplateBox>

          {/* Rule 4 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 4: Be Consistent, No Surprises (Headhunters)</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">Tell them upfront: your salary requirements, your location preferences, your deal-breakers, your timeline. Don't change your story at the offer stage. Don't spring new demands at the last minute.</p>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">Why this matters more with headhunters: a headhunter has invested their own time and reputation presenting you to a client. If you change your requirements at the last minute, the headhunter loses credibility with their client. That damages their business. They won't work with you again.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">With internal recruiters, the process is more flexible. But even with internal recruiters, don't blindside them with demands they've never heard before.</p>
          </div>

          {/* Rule 5 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 5: Respond Fast</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">Call headhunters and recruiters back the same day. Timing matters. Jobs move fast. Candidates have gotten hired because they were available for an interview with 6 hours' notice. Candidates have lost jobs because they took 3 days to respond.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">Even if your answer is no, respond. Ghosting a headhunter guarantees they won't call you next time. If the hiring manager contacts you directly during the process, tell your headhunter.</p>
          </div>

          {/* Rule 6 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 6: Listen to Your Headhunter's Coaching</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">When a headhunter asks you to change your resume, do it. They know what the hiring manager looks for. When they send you interview prep materials, read them.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">When they ask you to be flexible with scheduling, be flexible. Playing hard to get doesn't increase your value. It makes the company pick the next candidate.</p>
          </div>

          {/* Rule 7 */}
          <div className="border-l-4 border-gold pl-5 mb-8">
            <h3 className="font-heading text-lg font-bold text-foreground mb-2">Rule 7: Communicate Everything, Especially Other Interviews</h3>
            <p className="text-sm text-foreground/80 leading-relaxed mb-2">If you're interviewing with other companies, tell your headhunter. Don't name the company (Rule 2 applies), but tell them you're in process elsewhere.</p>
            <p className="text-sm text-foreground/80 leading-relaxed">The headhunter needs to know the full picture to negotiate the best deal for you. If another offer is on the table, the headhunter will push their client to move faster.</p>
          </div>

          <TemplateBox title="Script: Telling a Headhunter You're Interviewing Elsewhere">
            {"\"I want to keep you in the loop. I'm also in the interview process with another company. I'm not able to share which one, but I wanted to be transparent. I'm [at X stage: phone screen / final round / waiting on an offer]. This role with your client is [still my top choice / equally interesting / something I want to explore further]. I wanted you to know so we can plan timing on your end.\""}
          </TemplateBox>
        </section>

        {/* ─── Section 8: Finding Recruiters ─── */}
        <section id="find" className="mb-16 scroll-mt-20">
          <SectionNumber num="07" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">How to Find and Approach Recruiters and Headhunters</h2>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">Where to Find Them</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-6">
            <li>• LinkedIn (the primary channel)</li>
            <li>• Industry events, conferences, and trade shows</li>
            <li>• Referrals from colleagues who were placed by a headhunter</li>
            <li>• Google search: [your industry] + [your function] + "recruiter" or "search firm"</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">How to Approach</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-6">
            <li>• Email first, never cold call</li>
            <li>• If you have a referral, mention the name</li>
            <li>• Attach a strong resume</li>
            <li>• Keep the email short: who you are, what you do, what you're looking for</li>
            <li>• Submit to their website/ATS if they have one</li>
          </ul>

          <TemplateBox title="Cold Outreach Email to a Headhunter">
            {"Subject: [Your Title] | [Your Industry] | Open to Opportunities\n\nHi [Headhunter Name],\n\nI'm a [your title] with [X years] of experience in [your industry/function]. I'm exploring new opportunities and wanted to connect.\n\nMy background is in [2-3 key skills or areas of expertise]. I'm targeting [type of role] at [type of company or specific companies if relevant].\n\nI've attached my resume. I'd welcome a brief call if you have roles that could be a fit, or to introduce myself for future opportunities.\n\nBest,\n[Your Name]\n[Phone]\n[LinkedIn URL]"}
          </TemplateBox>

          <TemplateBox title="Outreach Email with a Referral">
            {"Subject: Referred by [Referral Name] | [Your Title] in [Industry]\n\nHi [Headhunter Name],\n\n[Referral Name] recommended I reach out to you. They mentioned you specialize in [industry/function] and thought we should connect.\n\nI'm a [your title] with [X years] of experience in [your area]. I'm currently exploring new opportunities in [target role type].\n\nI've attached my resume. I'd appreciate a brief conversation if you have roles that could be a fit.\n\nBest,\n[Your Name]\n[Phone]\n[LinkedIn URL]"}
          </TemplateBox>

          <TemplateBox title="LinkedIn Connection Request to a Headhunter">
            {"Hi [Name], I'm a [your title] in [industry]. I see you specialize in [their focus area]. I'd like to connect in case there's a fit for current or future roles. Happy to share my resume if helpful."}
          </TemplateBox>

          <TemplateBox title="Reply When a Recruiter Reaches Out Cold on LinkedIn">
            {"Hi [Name], thanks for reaching out. I'm open to hearing more about this.\n\nA bit about me: I'm currently [brief current situation, 1 sentence]. I'm looking for [what you want, 1 sentence].\n\nHappy to set up a call. [Suggest 2-3 time slots] work for me, or let me know what works on your end."}
          </TemplateBox>

          <h3 className="font-heading text-lg font-bold text-foreground mt-8 mb-3">Optimizing Your LinkedIn</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• Turn on Open to Work (visible to recruiters only, not your current employer)</li>
            <li>• Use job titles they search for in your headline (not creative titles like "Growth Wizard")</li>
            <li>• Fill out your skills section (recruiters filter by skills)</li>
            <li>• Write a profile summary that reads like a pitch, not a biography</li>
          </ul>

          <h3 className="font-heading text-lg font-bold text-foreground mt-6 mb-3">Staying on the Radar</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• If actively searching: email headhunters weekly with a brief update</li>
            <li>• If passively open: email every 3-6 months</li>
            <li>• Always update them if you change jobs, titles, or contact info</li>
            <li>• Give headhunters referrals and industry tips. They remember people who help them.</li>
          </ul>

          <TemplateBox title="Weekly Check-In Email (Active Job Search)">
            {"Subject: Quick update | [Your Name]\n\nHi [Headhunter Name],\n\nQuick update from my end. I'm still actively looking and available for new opportunities.\n\n[Optional: 1-2 sentences on anything new. Example: \"I completed a certification this month\" or \"I'm now open to roles in [new location] as well.\"]\n\nLet me know if anything comes across your desk that could be a fit. Happy to chat anytime.\n\nBest,\n[Your Name]"}
          </TemplateBox>

          <TemplateBox title="Quarterly Check-In Email (Passive / Not Searching)">
            {"Subject: Checking in | [Your Name]\n\nHi [Headhunter Name],\n\nHope things are going well. I wanted to touch base and keep you updated.\n\nI'm still at [Company] working on [brief 1-sentence update]. Things are going well, but I'm always open to hearing about the right opportunity.\n\n[Optional: share something useful. \"I heard [Company X] is expanding their [department]. Might be worth a look for your clients.\"]\n\nLet me know if there's anything I can do for you on my end.\n\nBest,\n[Your Name]"}
          </TemplateBox>

          <TemplateBox title={`"I Got a New Job" Update Email`}>
            {"Subject: Update | Started a new role\n\nHi [Headhunter Name],\n\nI wanted to let you know I've accepted a new position as [Title] at [Company]. I started [date].\n\nI appreciate your help during my search. I'd like to stay in touch for the future. If I can ever refer strong candidates your way or share industry info, don't hesitate to reach out.\n\nBest,\n[Your Name]\n[New email / phone if changed]\n[LinkedIn URL]"}
          </TemplateBox>

          <Collapsible title="Recruiter & Headhunter Tracker (Template)">
            <div className="overflow-x-auto mt-3">
              <table className="w-full text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2 font-semibold">Name</th>
                    <th className="text-left p-2 font-semibold">Firm</th>
                    <th className="text-left p-2 font-semibold">Type</th>
                    <th className="text-left p-2 font-semibold">Industry</th>
                    <th className="text-left p-2 font-semibold">Last Contact</th>
                    <th className="text-left p-2 font-semibold">Status</th>
                    <th className="text-left p-2 font-semibold">Notes</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border/50">
                    <td className="p-2 text-muted-foreground">Jane Smith</td>
                    <td className="p-2 text-muted-foreground">ABC Search</td>
                    <td className="p-2 text-muted-foreground">Contingency</td>
                    <td className="p-2 text-muted-foreground">SaaS Sales</td>
                    <td className="p-2 text-muted-foreground">2025-03-01</td>
                    <td className="p-2 text-muted-foreground">Active</td>
                    <td className="p-2 text-muted-foreground">Submitted me for VP Sales role</td>
                  </tr>
                  <tr>
                    <td className="p-2 text-muted-foreground">Tom Lee</td>
                    <td className="p-2 text-muted-foreground">[Company]</td>
                    <td className="p-2 text-muted-foreground">Internal</td>
                    <td className="p-2 text-muted-foreground">Engineering</td>
                    <td className="p-2 text-muted-foreground">2025-02-15</td>
                    <td className="p-2 text-muted-foreground">Dormant</td>
                    <td className="p-2 text-muted-foreground">No current roles, check Q2</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-xs text-muted-foreground mt-2">Update this after every interaction. When a headhunter contacts you about a new role, check here first to make sure another headhunter hasn't already submitted you for the same company.</p>
          </Collapsible>
        </section>

        {/* ─── Section 9: Multiple Headhunters ─── */}
        <section id="multiple" className="mb-16 scroll-mt-20">
          <SectionNumber num="08" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">Working with Multiple Headhunters</h2>

          <p className="text-foreground/80 leading-relaxed mb-4">You should work with more than one headhunter. But you need to manage it carefully.</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">How Many?</h3>
          <p className="text-foreground/80 leading-relaxed mb-4 text-sm">There's no fixed number. The goal is to have 3-5 strong headhunter relationships in your industry. Some will be active (working on a role for you right now), others will be dormant (keeping you in their database for future roles). The more headhunters who know you, the more opportunities you'll hear about.</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">The Rules</h3>
          <ul className="space-y-2 text-sm text-foreground/80 mb-6">
            <li>• <strong>Tell each headhunter</strong> you're working with others. You don't need to name them.</li>
            <li>• <strong>Never let two headhunters submit you for the same role</strong> at the same company. This creates a fee dispute and both headhunters drop you. Before any headhunter submits your resume, ask which company and which role. Check your tracker.</li>
            <li>• <strong>Keep your story consistent</strong> across all headhunters. Your salary expectations, location preferences, and deal-breakers should be the same no matter who you're talking to. Headhunters talk to each other.</li>
            <li>• <strong>If you get an offer through one headhunter</strong>, tell the others promptly. Don't ghost them. Close the loop professionally.</li>
          </ul>

          <InfoBox icon={AlertTriangle} title="What if two headhunters contact you about the same role?" variant="warning">
            <p className="text-sm">Tell the second headhunter you're already in process for that role with another headhunter. Be direct. They'll appreciate the honesty and may have other roles for you. Never try to work both angles on the same position. It always backfires.</p>
          </InfoBox>

          <InfoBox icon={Shield} title="What if you already applied directly?">
            <p className="text-sm">Tell the headhunter immediately. If your resume is already in the company's system, the headhunter cannot place you there. Hiding this wastes their time and damages the relationship. Be honest, and ask if they have other roles.</p>
          </InfoBox>
        </section>

        {/* ─── Section 10: Ghosting ─── */}
        <section id="ghosting" className="mb-16 scroll-mt-20">
          <SectionNumber num="09" />
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mt-2 mb-6">When a Recruiter or Headhunter Ghosts You</h2>

          <p className="text-foreground/80 leading-relaxed mb-4">This is the most common complaint job seekers have, and it's the most frustrating part of the process.</p>

          <h3 className="font-heading text-lg font-bold text-foreground mb-3">Why They Go Silent</h3>
          <ul className="space-y-1 text-sm text-foreground/80 mb-4">
            <li>• They don't have a role that fits you right now</li>
            <li>• The company put the role on hold or filled it internally</li>
            <li>• They're juggling 30+ candidates and you're not the top priority</li>
            <li>• They're waiting on the company for feedback</li>
            <li>• They moved on to a different search</li>
            <li>• The company gave negative feedback and they don't want to deliver bad news</li>
          </ul>

          <p className="text-foreground/80 leading-relaxed mb-4 text-sm"><strong>What it doesn't mean:</strong> It rarely means you did something wrong. Recruiting is a business transaction. If there's no active role for you, there's no financial reason for them to call.</p>

          {/* Decision tree as infographic */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 my-6">
            <h4 className="font-heading font-bold text-sm mb-4">Recruiter Went Silent: What to Do</h4>
            <div className="space-y-3 text-sm">
              <div className="bg-muted/50 rounded-lg p-3">
                <p className="font-semibold mb-1">Were you in an active interview process?</p>
                <div className="ml-4 space-y-2 mt-2">
                  <div className="bg-amber-50 dark:bg-amber-950/20 rounded-lg p-3">
                    <p className="font-semibold text-amber-700 dark:text-amber-400">YES → Did they miss a promised callback date?</p>
                    <p className="mt-1 text-foreground/80">YES → <strong>PUSH:</strong> Call (not email). Signal urgency.</p>
                    <p className="mt-1 text-foreground/80">NO → Follow up by email. Wait 1 week. Still nothing? Follow up once more. Still nothing? Move on.</p>
                  </div>
                  <div className="bg-muted rounded-lg p-3">
                    <p className="font-semibold">NO → Did you only send a resume (no conversation yet)?</p>
                    <p className="mt-1 text-foreground/80">YES → They don't have a role for you. Keep them in your tracker. Try again in 3-6 months.</p>
                    <p className="mt-1 text-foreground/80">NO → Follow up twice (1 week apart). No response? Move on. Keep the door open.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <InfoBox icon={Zap} title="Push harder if:" variant="warning">
              <ul className="space-y-1 text-sm">
                <li>• You were in an active interview process</li>
                <li>• They promised a callback date and missed it</li>
                <li>• You have a time-sensitive situation (another offer)</li>
              </ul>
              <p className="text-sm mt-2">In these cases, follow up by phone. A phone call signals urgency.</p>
            </InfoBox>
            <InfoBox icon={Shield} title="Let go if:">
              <ul className="space-y-1 text-sm">
                <li>• You sent your resume and never heard back</li>
                <li>• You've followed up twice with no response</li>
                <li>• They were vague about the role from the start</li>
              </ul>
              <p className="text-sm mt-2">Never burn the bridge. The same headhunter who ghosts you today might have your dream role in 6 months.</p>
            </InfoBox>
          </div>

          <TemplateBox title="Follow-Up Email When They Go Silent">
            {"Subject: Following up | [Your Name]\n\nHi [Name],\n\nI wanted to follow up on our last conversation about [the role / your search]. I'm still interested and available.\n\nIf there's any update on your end, I'd love to hear it. If the timing isn't right, no worries at all. I'm happy to stay in touch for future opportunities.\n\nBest,\n[Your Name]"}
          </TemplateBox>

          <TemplateBox title="Second Follow-Up (Slightly Different Angle)">
            {"Subject: Checking in | [Your Name]\n\nHi [Name],\n\nI wanted to confirm you received my last note. I'm still available and interested in [the role / opportunities in your area].\n\nI understand things move fast on your end. If the timing has changed, no problem. I'd still like to stay on your radar for future roles.\n\nBest,\n[Your Name]"}
          </TemplateBox>

          <p className="text-foreground/80 leading-relaxed text-sm">The flip side: if a headhunter consistently ghosts you, doesn't communicate, and provides no feedback after interviews, that's a red flag. Find a better one.</p>
        </section>

        {/* ─── Section 11: Cheat Sheet ─── */}
        <section id="cheatsheet" className="mb-16 scroll-mt-20">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">Quick Reference Cheat Sheet</h2>

          <div className="space-y-4">
            <a href="#rules" className="block bg-card border border-border rounded-xl p-5 hover:bg-muted/50 transition-colors group">
              <h3 className="font-heading font-bold text-sm mb-3 group-hover:text-accent transition-colors">The 7 Rules ↗</h3>
              <ol className="list-decimal list-inside space-y-1 text-sm text-foreground/80">
                <li>Understand who pays them</li>
                <li>Keep their secrets</li>
                <li>Be honest about everything</li>
                <li>Be consistent, no surprises (headhunters)</li>
                <li>Respond fast</li>
                <li>Listen to your headhunter's coaching</li>
                <li>Communicate everything, especially other interviews</li>
              </ol>
            </a>

            <a href="#process" className="block bg-card border border-border rounded-xl p-5 hover:bg-muted/50 transition-colors group">
              <h3 className="font-heading font-bold text-sm mb-3 group-hover:text-accent transition-colors">The 8-Step Headhunter Process ↗</h3>
              <p className="text-sm text-foreground/80">Company opens role → Headhunter searches database → Headhunter contacts you → Screening calls (2-3) → Reference checks → Presented to hiring manager → Company interviews you → Hire or pass</p>
            </a>

            <a href="#business" className="block bg-card border border-border rounded-xl p-5 hover:bg-muted/50 transition-colors group">
              <h3 className="font-heading font-bold text-sm mb-3 group-hover:text-accent transition-colors">Resume Priority Order ↗</h3>
              <p className="text-sm text-foreground/80">Referrals → Headhunter submissions → Local candidates → No visa needed → Visa + relocation</p>
            </a>

            <a href="#multiple" className="block bg-card border border-border rounded-xl p-5 hover:bg-muted/50 transition-colors group">
              <h3 className="font-heading font-bold text-sm mb-3 group-hover:text-accent transition-colors">How Often to Stay in Touch ↗</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Active job search: weekly email</li>
                <li>• Passive / not searching: every 3-6 months</li>
                <li>• Any change in job, title, or contact info: immediately</li>
              </ul>
            </a>

            <a href="#process" className="block bg-card border border-border rounded-xl p-5 hover:bg-muted/50 transition-colors group">
              <h3 className="font-heading font-bold text-sm mb-3 group-hover:text-accent transition-colors">What to Have Ready When They Call ↗</h3>
              <ul className="space-y-1 text-sm text-foreground/80">
                <li>• Your resume (updated)</li>
                <li>• Your salary range</li>
                <li>• Your location preferences and deal-breakers</li>
                <li>• Your "why are you looking?" answer (clear, 2-3 sentences)</li>
                <li>• Questions about the role and company</li>
              </ul>
            </a>
          </div>
        </section>

        {/* ─── Section 12: More Guides + CTA ─── */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-6">More Free Guides</h2>
          <div className="space-y-3">
            <Link to="/resume-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div>
                <p className="font-semibold text-sm text-foreground">The Perfect Resume: 10 Golden Rules</p>
                <p className="text-xs text-muted-foreground">Build a resume that lands interviews.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
            <Link to="/hr-interview-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div>
                <p className="font-semibold text-sm text-foreground">The Screening Playbook</p>
                <p className="text-xs text-muted-foreground">How to pass the first call and move to the interview.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
            <Link to="/pivot-method-guide" className="flex items-center justify-between p-4 rounded-xl border border-border bg-card hover:bg-muted/50 transition-colors group">
              <div>
                <p className="font-semibold text-sm text-foreground">The Pivot Method</p>
                <p className="text-xs text-muted-foreground">A recruiter's guide to changing careers.</p>
              </div>
              <ArrowRight className="w-4 h-4 text-muted-foreground group-hover:text-gold transition-colors" />
            </Link>
          </div>
        </section>

      </main>

      <GuideShareButtons />

    </div>
  );
}