import { Clock, ChevronDown, Menu, Heart, Zap, Users, Shield, Gauge, Target, AlertTriangle, ArrowRight, Lightbulb, BookOpen } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { InteractiveCareerMap, InteractiveScorecard, InteractivePulseCheck } from "@/components/ikigai/InteractiveWidgets";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

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

const InfoBox = ({ title, children, variant = "default" }: { title: string; children: React.ReactNode; variant?: "default" | "gold" | "green" }) => (
  <div className={`rounded-xl p-5 md:p-6 ${
    variant === "gold" ? "bg-card border border-gold/30" :
    variant === "green" ? "bg-executive-green" :
    "bg-card border border-border"
  }`}>
    <h4 className={`font-semibold mb-2 ${variant === "green" ? "text-gold" : variant === "gold" ? "text-gold" : "text-foreground"}`}>{title}</h4>
    <div className={`text-sm leading-relaxed ${variant === "green" ? "text-cream/90" : "text-muted-foreground"}`}>{children}</div>
  </div>
);

const tocSections = [
  { id: "why-useful", label: "Why This Book" },
  { id: "what-is-ikigai", label: "What Is Ikigai?" },
  { id: "five-pillars", label: "The 5 Pillars" },
  { id: "pillar-1", label: "Pillar 1: Purpose" },
  { id: "pillar-2", label: "Pillar 2: Flow" },
  { id: "pillar-3", label: "Pillar 3: Community" },
  { id: "pillar-4", label: "Pillar 4: Resilience" },
  { id: "pillar-5", label: "Pillar 5: Pace" },
  { id: "scorecard", label: "Scorecard" },
  { id: "what-if-stuck", label: "What If Stuck?" },
  { id: "common-mistakes", label: "Common Mistakes" },
  { id: "quick-reference", label: "Quick Reference" },
  { id: "action-plan", label: "Action Plan" },
  { id: "resources", label: "Resources" },
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
      <aside className="hidden xl:block fixed left-[max(1rem,calc((100vw-72rem)/2-14rem))] top-28 w-48 z-30">
        <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">Contents</p>
        <nav className="space-y-1">
          {tocSections.map(({ id, label }) => (
            <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${active === id ? "border-gold text-gold font-medium" : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"}`}
            >{label}</a>
          ))}
        </nav>
      </aside>
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button onClick={() => setOpen(!open)} className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform" aria-label="Table of contents">
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contents</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a key={id} href={`#${id}`} onClick={(e) => { e.preventDefault(); document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" }); setOpen(false); }}
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

/* ── Ikigai 4-Circle Diagram ─────────────────────────────────── */
const IkigaiDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">The 4 Circles of Ikigai</h4>
    <div className="relative w-full max-w-[440px] mx-auto" style={{ aspectRatio: "1" }}>
      {/* Top-left: What you LOVE */}
      <div className="absolute rounded-full border-2 border-pink-400/50 bg-pink-400/10"
        style={{ width: "55%", height: "55%", top: "2%", left: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-pink-500 dark:text-pink-400 text-center leading-tight" style={{ top: "18%", left: "18%" }}>What you<br/>LOVE</span>
      </div>
      {/* Top-right: What you're GOOD AT */}
      <div className="absolute rounded-full border-2 border-blue-400/50 bg-blue-400/10"
        style={{ width: "55%", height: "55%", top: "2%", right: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-blue-500 dark:text-blue-400 text-center leading-tight" style={{ top: "18%", right: "14%" }}>What you're<br/>GOOD AT</span>
      </div>
      {/* Bottom-left: What the world NEEDS */}
      <div className="absolute rounded-full border-2 border-emerald-400/50 bg-emerald-400/10"
        style={{ width: "55%", height: "55%", bottom: "2%", left: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-emerald-500 dark:text-emerald-400 text-center leading-tight" style={{ bottom: "18%", left: "12%" }}>What the world<br/>NEEDS</span>
      </div>
      {/* Bottom-right: What you can be PAID FOR */}
      <div className="absolute rounded-full border-2 border-amber-400/50 bg-amber-400/10"
        style={{ width: "55%", height: "55%", bottom: "2%", right: "5%" }}>
        <span className="absolute text-xs md:text-sm font-semibold text-amber-500 dark:text-amber-400 text-center leading-tight" style={{ bottom: "18%", right: "8%" }}>What you can<br/>be PAID FOR</span>
      </div>
      {/* Overlap labels */}
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ top: "22%", left: "50%", transform: "translateX(-50%)" }}>Passion</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ left: "10%", top: "50%", transform: "translateY(-50%)" }}>Mission</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ right: "10%", top: "50%", transform: "translateY(-50%)" }}>Profession</span>
      <span className="absolute text-[10px] md:text-xs font-medium text-foreground/70 text-center" style={{ bottom: "22%", left: "50%", transform: "translateX(-50%)" }}>Vocation</span>
      {/* Center: IKIGAI */}
      <div className="absolute rounded-full bg-gold/20 border-2 border-gold/60 flex items-center justify-center"
        style={{ width: "20%", height: "20%", top: "50%", left: "50%", transform: "translate(-50%, -50%)" }}>
        <span className="text-xs md:text-sm font-bold text-gold">IKIGAI</span>
      </div>
    </div>
  </div>
);

/* ── Flow Spectrum ─────────────────────────────────────────── */
const FlowSpectrum = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">The Flow Spectrum</h4>
    <div className="flex items-center gap-2">
      <div className="flex-1 text-center bg-muted/40 rounded-l-lg p-3 border border-border">
        <p className="text-foreground text-sm font-bold">Too Easy</p>
        <p className="text-muted-foreground text-xs mt-1">→ Boredom</p>
      </div>
      <div className="flex-1 text-center bg-gold/10 rounded-lg p-3 border border-gold/30">
        <p className="text-gold text-sm font-bold">Right Challenge</p>
        <p className="text-muted-foreground text-xs mt-1">→ FLOW</p>
      </div>
      <div className="flex-1 text-center bg-muted/40 rounded-r-lg p-3 border border-border">
        <p className="text-foreground text-sm font-bold">Too Hard</p>
        <p className="text-muted-foreground text-xs mt-1">→ Anxiety</p>
      </div>
    </div>
  </div>
);

/* ── Antifragility Spectrum ──────────────────────────────────── */
const AntifragilityDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6">
    <h4 className="font-heading text-lg text-foreground mb-4">Fragile → Resilient → Antifragile</h4>
    <div className="grid grid-cols-3 gap-3">
      {[
        { title: "Fragile", desc: "One salary, one skill, no network", color: "bg-destructive/5 border-destructive/20" },
        { title: "Resilient", desc: "Savings cushion, stable career, good network", color: "bg-muted/40 border-border" },
        { title: "Antifragile", desc: "Multiple income streams, diverse skills, strong moai, side projects", color: "bg-gold/10 border-gold/30" },
      ].map((item) => (
        <div key={item.title} className={`rounded-lg p-3 border ${item.color}`}>
          <p className="text-foreground text-sm font-bold">{item.title}</p>
          <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
        </div>
      ))}
    </div>
  </div>
);

const IkigaiGuide = () => {
  useTrackGuideProgress("ikigai");

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/ikigai-guide", title: "Ikigai Career Guide | Find Your Purpose", description: "Apply Ikigai to your career. A guided framework for finding work at the intersection of passion, skill, need, and pay." })} />

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
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            Ikigai: Build a Career You Won't Quit<br className="hidden sm:block" /> in 12 Months
          </h1>
          <p className="text-lg md:text-xl text-cream/90 mb-4">Without Burning Out. Without Starting Over.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-gold-soft/80">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-gold-soft/80">
              <Clock className="w-4 h-4" />
              <span className="text-sm">35 min read</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">Based on "Ikigai: The Japanese Secret to a Long and Happy Life" by Héctor García & Francesc Miralles</p>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      <TableOfContents />

      {/* ═══════════════ HOW TO USE ═══════════════ */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            This guide is 8,000+ words. You don't need to read it all in one sitting. Here's where to go based on your situation.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">Where are you right now?</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">01</span>
                <span className="text-foreground text-sm"><strong>"I don't know what I want to do."</strong> → Start with <a href="#what-is-ikigai" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">What Is Ikigai?</a> + <a href="#pillar-1" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Pillar 1 (Purpose)</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">02</span>
                <span className="text-foreground text-sm"><strong>"I have a job but I feel stuck and drained."</strong> → Start with <a href="#pillar-2" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Pillar 2 (Flow)</a> + <a href="#pillar-5" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Pillar 5 (Pace)</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">03</span>
                <span className="text-foreground text-sm"><strong>"I'm job searching and it's destroying me."</strong> → Start with <a href="#mental-health" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Mental Health</a> + <a href="#pillar-3" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Pillar 3 (Community)</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">04</span>
                <span className="text-foreground text-sm"><strong>"I keep quitting jobs after 12 months."</strong> → Read the full guide top to bottom. The pattern is in here somewhere.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">05</span>
                <span className="text-foreground text-sm"><strong>"I'm doing fine. I want to stay ahead."</strong> → Skip to <a href="#pillar-4" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Pillar 4 (Resilience)</a> + the <a href="#scorecard" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Scorecard</a> + <a href="#action-plan" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Your Action Plan</a></span>
              </li>
              <li className="flex items-start gap-3">
                <span className="shrink-0 w-6 h-6 rounded-full bg-gold/20 text-gold text-xs font-bold flex items-center justify-center mt-0.5">06</span>
                <span className="text-foreground text-sm"><strong>"I need something to do RIGHT NOW."</strong> → Skip to <a href="#action-plan" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Your Action Plan</a></span>
              </li>
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            Read what you need. Skip what you don't. Come back to the rest later.
          </p>
        </div>
      </section>

      {/* ═══════════════ WHY THIS BOOK ═══════════════ */}
      <section id="why-useful" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Why This Book Is Useful</h2>
              <p className="text-muted-foreground text-lg">The recruiter case for ikigai</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Twelve months. On average, a bad hire lasts about twelve months before they quit or get managed out.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              I've seen this cycle hundreds of times. Someone gets an offer. Good salary. Solid company. They accept. Six months in, the excitement fades. Nine months in, they're browsing job boards during lunch. Twelve months in, they're back on the market.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The resume gets updated. The cycle starts again.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              After reviewing 20,000+ resumes and making 500+ hires at companies like Uber and Netskope, I started asking a different question. Not "How do I fill this role?" but "Why do some people build 10-year careers while others restart every 12 months?"
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The answer showed up in an unexpected place. A Japanese island where people live longer than anywhere on Earth.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The people of Okinawa, Japan, have the longest life expectancy on the planet. More centenarians per capita than anywhere else. Researchers who study them found something surprising. The secret isn't genetics. The secret is purpose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The Japanese call this purpose <strong className="text-foreground">ikigai</strong>. The word means something close to "the happiness of always being busy." In Okinawa, there is no word for retirement. People keep doing what they love until their last day. And they live longer, healthier, happier lives because of this.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The research behind this spans Okinawa's centenarians, psychology (Viktor Frankl's logotherapy, Csikszentmihalyi's flow state), and Japanese philosophy (wabi-sabi, Morita therapy, antifragility). The core argument: purpose keeps people alive. And purpose keeps careers alive too.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This guide applies these ideas directly to your career. Everything here helps you make better career decisions, protect your mental health during the job search, and build a work life you won't need to escape from every 12 months.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT IS IKIGAI ═══════════════ */}
      <section id="what-is-ikigai" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">What Is Ikigai?</h2>
              <p className="text-muted-foreground text-lg">The concept, the 4 circles</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              In Japanese, ikigai is written as 生き甲斐. It combines "life" (生き) with "to be worthwhile" (甲斐).
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Everyone has an ikigai. Some people have found theirs. Others are still searching. But everyone carries one inside them.
            </p>

            <IkigaiDiagram />

            <p className="text-muted-foreground leading-relaxed">
              When your work sits at the center of all four circles, you have found your ikigai.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">If you love your work but nobody pays you for work like this:</strong> You have passion, but no career.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">If you're good at your work and get paid well, but you feel empty:</strong> You have a comfortable job, but no purpose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              <strong className="text-foreground">If the world needs your work but you hate doing the work:</strong> You have a mission, but you'll burn out.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The sweet spot is where all four overlap. And the people who find the sweet spot don't count down the days until retirement. They keep going.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-8">Why This Matters for Your Career</h3>
            <p className="text-muted-foreground leading-relaxed">
              Ogimi is a village in northern Okinawa with a population of 3,000. It holds the Guinness record for the longest-living community on Earth. Researchers interviewed 100 people there, most of them over 80, some over 100.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Not a single person was sitting around doing nothing. Every single resident kept a vegetable garden. They sang karaoke. They played gateball (a croquet-like sport). They walked to the market, visited friends, and volunteered for their community.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              One 99-year-old woman blew out her birthday candles and danced with more energy than people half her age.
            </p>

            <InfoBox title="What the residents said" variant="gold">
              <p className="mb-2">"The secret is not to worry. Keep your heart young. Smile and open your heart to people."</p>
              <p>"Working. If you don't work, your body breaks down."</p>
            </InfoBox>

            <p className="text-muted-foreground leading-relaxed">
              These people never stopped working. But they also never burned out. The difference is what they were working toward.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ THE 5 PILLARS ═══════════════ */}
      <section id="five-pillars" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 5 Pillars of a Career That Lasts</h2>
              <p className="text-muted-foreground text-lg">Overview</p>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <div className="space-y-4">
              {[
                { num: "1", title: "PURPOSE", desc: "Know your why, not your where.", icon: Heart, anchor: "#pillar-1" },
                { num: "2", title: "FLOW", desc: "Lose track of time at work.", icon: Zap, anchor: "#pillar-2" },
                { num: "3", title: "COMMUNITY", desc: "Build your moai. Real friends.", icon: Users, anchor: "#pillar-3" },
                { num: "4", title: "RESILIENCE", desc: "Get stronger from setbacks.", icon: Shield, anchor: "#pillar-4" },
                { num: "5", title: "SUSTAINABLE PACE", desc: "Work at 80%. Pace yourself.", icon: Gauge, anchor: "#pillar-5" },
              ].map((pillar) => (
                <a key={pillar.num} href={pillar.anchor} className="flex items-center gap-4 p-3 rounded-lg hover:bg-muted/50 transition-colors group">
                  <span className="text-gold font-heading text-2xl font-bold w-8">{pillar.num}</span>
                  <pillar.icon className="w-5 h-5 text-gold shrink-0" />
                  <div>
                    <p className="text-foreground font-semibold text-sm group-hover:text-gold transition-colors">{pillar.title}</p>
                    <p className="text-muted-foreground text-xs">{pillar.desc}</p>
                  </div>
                </a>
              ))}
            </div>
            <div className="border-t border-border pt-4 mt-4">
              <p className="text-muted-foreground text-xs text-center">Foundation: Your Ikigai</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            The rest of this guide breaks down each pillar with exercises you will do today and the recruiter perspective I bring from a decade of hiring.
          </p>
        </div>
      </section>

      {/* ═══════════════ PILLAR 1: PURPOSE ═══════════════ */}
      <section id="pillar-1" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pillar 1: Find Your Purpose</h2>
              <p className="text-muted-foreground text-lg">Before your next job search</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Most people start a job search by updating their resume. Wrong starting point.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Before you touch your resume, answer one question: "Why do I work?"
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Not "Where do I want to work?" or "What title do I want?" Those questions come later. The first question is about purpose. And if you don't have a clear answer, you'll end up chasing titles and salaries into the same 12-month cycle.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-8">The Ikigai Career Map</h3>
            <p className="text-muted-foreground leading-relaxed">
              Take 15 minutes and fill in these four areas for your career right now.
            </p>

            <InteractiveCareerMap lang="en" />

            <p className="text-muted-foreground leading-relaxed">
              The phrase "for now" matters. Your ikigai will change over time. Purpose shifts at different stages of life. The point is not to find one permanent answer. The point is to have a direction today.
            </p>

            <h3 className="font-heading text-xl text-foreground mt-8">When You Feel Stuck: Action First, Clarity Later</h3>
            <p className="text-muted-foreground leading-relaxed">
              If you're staring at the map above and drawing blanks, don't spiral into analysis mode.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A Japanese therapist named Shoma Morita built an entire school of therapy around this problem. His approach, rooted in Zen Buddhism, flips Western thinking on its head. Western therapy says: fix your thoughts, then fix your feelings, then take action. Morita says the opposite. Take action first. Your feelings will follow.
            </p>

            <InfoBox title="Three principles from Morita" variant="default">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">1. Accept your feelings.</strong> If you feel anxious about a career change, stop trying to "fix" the anxiety. Accept the discomfort. Morita compared negative thoughts to a donkey tied to a post. The more the donkey fights the rope, the more tangled the donkey becomes.</p>
                <p><strong className="text-foreground">2. Do what you should be doing.</strong> Stop analyzing. Start working on the next step. Send the application. Make the call. Book the meeting. The action itself will shift your emotional state.</p>
                <p><strong className="text-foreground">3. Ask "What should I do right now?"</strong> Not "What should I feel?" The answer is always a concrete next step.</p>
              </div>
            </InfoBox>

            <p className="text-muted-foreground leading-relaxed">
              This connects to Viktor Frankl's logotherapy. Frankl was a psychiatrist who survived Auschwitz. He found prisoners with a goal outside the camp had the greatest chance of survival. His own goal, rewriting a confiscated manuscript on scraps of paper, kept him alive. After the war, Frankl built a therapy practice around one idea: people with a clear purpose will endure almost anything.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Frankl treated a diplomat who had spent years in therapy being told to make peace with his father figure. Frankl showed him in a few sessions the real problem was simpler: he wanted a different career. Five years later, the former diplomat was working in a new profession and happy.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The lesson: sometimes the problem isn't psychological. Sometimes you need a different job. And sometimes you need to act before the clarity arrives.
            </p>

            <h3 id="mental-health" className="font-heading text-xl text-foreground mt-8 scroll-mt-24">Your Mental Health During the Job Search</h3>
            <p className="text-muted-foreground leading-relaxed">
              Job searching is one of the most mentally draining experiences in professional life. Rejection is constant. Silence is worse. You start questioning your worth, your skills, your career decisions.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Frankl used the term "Sunday neurosis" for the emptiness people feel when the structure of the workweek disappears. Without tasks and obligations, they confront how little meaning they have in their lives.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The same thing happens when you lose a job. Or when you're between roles. Or when you're stuck in a purposeless role.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If you're in a job search right now, know this: the emotional rollercoaster is normal. Feeling lost, anxious, or frustrated does not mean something is wrong with you. It means you're human. These feelings are signals. They're telling you: you need purpose and direction.
            </p>

            <InfoBox title="Four things to try during the job search" variant="gold">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">Build structure into your days.</strong> The centenarians of Ogimi wake up at the same time every morning. They tend their gardens. They visit friends. They follow routines. Do the same with your job search. Set a schedule. Work on applications from 9 to 12. Exercise after lunch. Network in the afternoon. Structure creates stability when everything else feels uncertain.</p>
                <p><strong className="text-foreground">Stay connected to people.</strong> Isolation makes everything worse. The Okinawans live in tight-knit communities called moai. They see friends every day. During a job search, talk to people. Not about the search. About anything. Go for coffee. Call a friend. Join a group. Human connection is the strongest antidote to the anxiety of unemployment.</p>
                <p><strong className="text-foreground">Do something with your hands.</strong> Every centenarian in Ogimi keeps a vegetable garden. The physical act of tending to something gives them purpose between bigger activities. Find your version of this. Cook a meal from scratch. Organize your workspace. Fix something around the house. Physical activity grounds you when your mind is racing.</p>
                <p><strong className="text-foreground">Set small daily goals, not one giant outcome goal.</strong> "Get a job" is a goal you have no control over. "Send 3 applications today" is a goal you control completely. Focus on the actions you own.</p>
              </div>
            </InfoBox>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 2: FLOW ═══════════════ */}
      <section id="pillar-2" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pillar 2: Find Flow in Your Work</h2>
              <p className="text-muted-foreground text-lg">Single-tasking, takumi mindset</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Mihaly Csikszentmihalyi, a psychologist at the University of Chicago, studied what happens when people are completely absorbed in an activity. He called this state "flow."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Flow is the experience of being so immersed in your work you lose track of time. You forget to eat. You don't check your phone. The activity itself becomes the reward.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Flow connects directly to ikigai. The activities putting you in a state of flow are clues to your ikigai. If you want to find your purpose, start by tracking when you lose track of time.
            </p>

            <h3 className="font-heading text-xl text-foreground">The 7 Conditions for Achieving Flow</h3>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <ol className="space-y-2">
                {[
                  "You know what to do.",
                  "You know how to do the work.",
                  "You know how well you're doing.",
                  "You know where to go next.",
                  "The challenge is high.",
                  "Your skills match the challenge.",
                  "You are free from distractions.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold font-bold text-sm">{i + 1}.</span>
                    <span className="text-muted-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ol>
            </div>

            <FlowSpectrum />

            <p className="text-muted-foreground leading-relaxed">
              This is why people who stay in the same role for too many years without new challenges start to feel restless. The work stopped stretching them. Flow disappeared. And with flow gone, so did the sense of purpose.
            </p>

            <h3 className="font-heading text-xl text-foreground">Single-Tasking Beats Multitasking. Every Time.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Stanford University studied hundreds of students who regularly multitasked. The result: multitaskers performed worse at everything. They got distracted by irrelevant information. They made more mistakes. They remembered less.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Other research shows multitasking drops productivity by 60% and lowers IQ by more than 10 points.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The conclusion is direct: concentrating on one thing at a time is the single most important factor in achieving flow.
            </p>

            <InfoBox title="Practical steps to single-task at work" variant="default">
              <ul className="space-y-2 mt-2">
                <li className="text-sm">• Turn off notifications during focused work blocks.</li>
                <li className="text-sm">• Try the Pomodoro method: 25 minutes of focused work, 5 minutes of rest. One task per block.</li>
                <li className="text-sm">• Check email at set times. Twice per day is enough for most roles.</li>
                <li className="text-sm">• Don't look at your phone for the first hour after waking up and the last hour before bed.</li>
                <li className="text-sm">• If you need to think, go to a place with no Wi-Fi.</li>
              </ul>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">The Takumi Mindset: Master One Thing</h3>
            <p className="text-muted-foreground leading-relaxed">
              Japan has a tradition of takumis, or master artisans. These are people who dedicate their lives to perfecting a single skill.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              One striking example: a woman who works for a makeup brush company in Kumano. She sits alone in a small room, sorting individual bristles by hand. Every single bristle of every brush the company makes passes through her hands. Her movements are so fast the researchers needed high-speed camera settings to capture them.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The documentary <em>Jiro Dreams of Sushi</em> shows a similar story. Jiro Ono has made sushi for over 80 years at a small bar near a subway station in Tokyo. One of his apprentices spent years learning to make a single type of omelet before earning Jiro's approval. Years. On one dish.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This runs counter to modern career advice, which says: be a generalist, learn a little of everything, stay adaptable. The takumi approach says: go deep. Master your skill to the point where nobody else does what you do.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You don't need to sort bristles for 40 years. But consider: what is the one skill in your career where you should go deeper instead of wider?
            </p>

            <h3 className="font-heading text-xl text-foreground">Flow and Your Mental Health</h3>
            <p className="text-muted-foreground leading-relaxed">
              When you are in a state of flow, you are not anxious. You are not ruminating on the past. You are not worried about the future. You are here. Present. Focused.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Flow is the opposite of the "Sunday neurosis" Frankl described. Flow fills the empty space with purpose.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              If your current role gives you zero flow, pay attention to the signal. A complete absence of flow at work is a sign of misalignment. Either the challenge is too low (you're bored), the challenge is too high (you're overwhelmed), or the work itself doesn't connect to your ikigai.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You don't need to quit tomorrow. But start tracking: when do I lose track of time? When does work feel like work, and when does work feel like something else? Your flow moments are pointing you toward your ikigai.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 3: COMMUNITY ═══════════════ */}
      <section id="pillar-3" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pillar 3: Build Your Moai</h2>
              <p className="text-muted-foreground text-lg">Your career community</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              In Okinawa, people form tight-knit groups called <strong className="text-foreground">moai</strong>. A moai is an informal circle of friends who look out for each other. Members meet regularly, share meals, play games, and support each other through hard times. Some moai groups have been together for decades.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The concept started during hard agricultural times when farmers would pool resources and help each other survive bad harvests. Members contribute a small monthly amount to the group. If someone hits financial trouble, they get support from the group's fund.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              But the money isn't the point. The belonging is.
            </p>

            <InfoBox title="What the residents said" variant="gold">
              <p className="mb-2">"Getting together with my friends is my most important ikigai. We all get together here and talk. I always know I'll see them all here tomorrow, and that's one of my favorite things in life."</p>
              <p>"Talking each day with the people you love. That's the secret to a long life."</p>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">Your Career Needs a Moai</h3>
            <p className="text-muted-foreground leading-relaxed">
              Most job seekers treat networking like a transaction. They send LinkedIn connection requests when they need a job. They go to events with a stack of business cards. They ask for referrals from people they haven't spoken to in two years.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is not a moai. This is desperation with a professional filter.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              A real professional moai is a group of people you invest in long before you need anything. You share advice. You celebrate wins. You support each other through layoffs, bad bosses, and career pivots. You show up consistently, not conveniently.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Over 70% of jobs are filled through referrals and networking. Your moai is your career insurance. But the insurance only pays out if you've been making deposits for years.
            </p>

            <h3 className="font-heading text-xl text-foreground">Make Friends at Work. Real Friends.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Some of the best friendships I have came from work. Not from networking events. Not from LinkedIn. From sitting next to someone, working through a hard problem together, and realizing we had something in common beyond the job.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Work friendships get a bad reputation. People say "don't mix work and personal life" or "your coworkers aren't your friends." I disagree.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              You spend more waking hours with your coworkers than with almost anyone else. If you treat every colleague as a transactional relationship, you're choosing to spend a huge portion of your life without genuine human connection.
            </p>

            <div className="space-y-4">
              <InfoBox title="People who have real friends at work stay longer" variant="default">
                <p>Gallup research consistently shows a close friend at work is one of the strongest predictors of engagement and retention. People don't quit jobs where they have real relationships.</p>
              </InfoBox>
              <InfoBox title="People who have real friends at work perform better" variant="default">
                <p>When you trust the people around you, you communicate better, take more risks, and solve problems faster. Teams with genuine relationships outperform teams where everyone is polite but distant.</p>
              </InfoBox>
              <InfoBox title="People who have real friends at work are happier" variant="default">
                <p>You know the difference between a Monday at a job where you like the people and a Monday at a job where you don't.</p>
              </InfoBox>
            </div>

            <h3 className="font-heading text-xl text-foreground">How to Build a Moai at Work</h3>
            <div className="space-y-4">
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Eat lunch with people.</strong> Not at your desk. At a table, with other humans. Ask questions. Listen. The Okinawan centenarians eat together constantly. Shared meals build bonds faster than any team-building exercise.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Help people before they ask.</strong> One of the core principles in Ogimi is yuimaaru, or teamwork. The residents help each other with everything from building houses to planting rice. At work, look for chances to help. Review someone's presentation. Offer to cover a meeting. Share a resource. The deposits you make now will come back.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Be interested, not interesting.</strong> The best networkers ask questions. They remember details. They follow up. They ask "How did your daughter's recital go?" three weeks after you mentioned the event. This is how real relationships form.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Stay in touch after you leave.</strong> When you change jobs, don't disappear from the lives of people you worked with. Send a message. Grab coffee once a quarter. Keep the relationship alive. Your former colleagues become your broader moai over time.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                <strong className="text-foreground">Join (or start) a group.</strong> The moai structure works because of regular, recurring contact. Find your version of this. A monthly dinner with former colleagues. A Slack group of people in your industry. Consistency matters more than volume.
              </p>
            </div>

            <h3 className="font-heading text-xl text-foreground">Why Your Moai Protects Your Mental Health</h3>
            <p className="text-muted-foreground leading-relaxed">
              During a job search, isolation is the biggest threat to your mental health. When you're unemployed or between roles, the natural social structure of work disappears. You lose daily contact with colleagues. You start spending too much time alone with your thoughts.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your moai prevents this. If you've built real relationships during your career, those people are still there when the job isn't. They check in. They send leads. They remind you your worth isn't defined by your employment status.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Build your moai when times are good. You'll need those people when times aren't.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 4: RESILIENCE ═══════════════ */}
      <section id="pillar-4" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pillar 4: Build Career Resilience</h2>
              <p className="text-muted-foreground text-lg">Wabi-sabi and antifragility</p>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="font-heading text-xl text-foreground">Wabi-Sabi: Your Career Will Be Imperfect. That's Fine.</h3>
            <p className="text-muted-foreground leading-relaxed">
              Wabi-sabi is a Japanese philosophy. It finds beauty in imperfection, incompleteness, and impermanence. A cracked teacup is more beautiful than a perfect one. A career with detours is more interesting than a straight line.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Most people try to build perfect careers. The right school, the right first job, the right progression. When something goes wrong, a layoff, a bad boss, a failed startup, they feel like the whole plan is ruined.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Wabi-sabi says: the cracks are part of the beauty.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your career will have failures. You will take jobs where the fit is wrong. You will get rejected from roles you wanted. You will spend time in dead-end roles. None of this goes to waste. Every experience adds texture to your career.
            </p>

            <h3 className="font-heading text-xl text-foreground">Ichi-Go Ichi-E: Every Opportunity Is Unique</h3>
            <p className="text-muted-foreground leading-relaxed">
              A related Japanese concept is ichi-go ichi-e: "this moment exists only now and won't come again." In Japanese tea ceremonies, this phrase reminds everyone each gathering is unique and unrepeatable.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Applied to your career: every job, every interview, every conversation with a recruiter happens once. Don't sleepwalk through opportunities because you're waiting for a "better" one. And don't beat yourself up over missed chances. The moment passed. New ones are coming.
            </p>

            <h3 className="font-heading text-xl text-foreground">Stoic Resilience: Control What You Control</h3>
            <p className="text-muted-foreground leading-relaxed italic border-l-2 border-gold pl-4">
              Accept the things you cannot change. Have the courage to change the things you should change. Know the difference between the two.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 mt-4">
              <InfoBox title="Things you control" variant="default">
                <ul className="space-y-1 mt-1">
                  <li className="text-sm">• Quality of your resume</li>
                  <li className="text-sm">• How many applications you send</li>
                  <li className="text-sm">• How you prepare for interviews</li>
                  <li className="text-sm">• How you follow up</li>
                  <li className="text-sm">• How you treat recruiters</li>
                </ul>
              </InfoBox>
              <InfoBox title="Things you don't control" variant="default">
                <ul className="space-y-1 mt-1">
                  <li className="text-sm">• Hiring freezes</li>
                  <li className="text-sm">• Recruiter preferences</li>
                  <li className="text-sm">• Internal candidates</li>
                  <li className="text-sm">• Economic shifts</li>
                </ul>
              </InfoBox>
            </div>

            <h3 className="font-heading text-xl text-foreground mt-4">Antifragility: Get Stronger from Setbacks</h3>
            <AntifragilityDiagram />

            <InfoBox title="Three steps to become antifragile" variant="gold">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">Step 1: Create redundancies.</strong> Don't rely on one income stream, one skill, or one relationship. The centenarians of Ogimi all had a primary occupation and a secondary one. Develop a secondary skill. Start a side project. Maintain relationships across multiple companies and industries.</p>
                <p><strong className="text-foreground">Step 2: Take many small risks.</strong> Instead of one big career bet, make several small ones. Apply to a role outside your comfort zone. Take on a stretch project. Volunteer for a cross-functional team. Each small risk has limited downside and potential upside.</p>
                <p><strong className="text-foreground">Step 3: Remove fragility.</strong> Ask yourself: what makes me fragile? A toxic boss you depend on for your next promotion? A single skill on the verge of automation? A career path with no transferable skills? Identify the fragile points and address them before they break.</p>
              </div>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">The 10 Rules of Ikigai for Career Resilience</h3>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <ol className="space-y-3">
                {[
                  "Stay active. Don't retire from learning, growing, or contributing.",
                  "Take your career slow. Rushing leads to bad decisions.",
                  "Don't fill your plate to 100%. Leave room for rest, reflection, and recovery.",
                  "Surround yourself with good people at work. Your moai is your career foundation.",
                  "Stay in shape for the next challenge. Keep your skills sharp and your body moving.",
                  "Smile. Attitude determines how people remember you.",
                  "Step away from your desk. Nature, rest, and distance give you perspective.",
                  "Give thanks. Gratitude changes how you experience even a difficult job.",
                  "Live in the moment. Stop regretting past career decisions. Stop fearing the future. Focus on today.",
                  "Follow your ikigai. There is a purpose inside you. If you haven't found yours yet, your mission is to keep searching.",
                ].map((rule, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <span className="text-gold font-bold text-sm shrink-0">{i + 1}.</span>
                    <span className="text-muted-foreground text-sm">{rule}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ PILLAR 5: SUSTAINABLE PACE ═══════════════ */}
      <section id="pillar-5" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pillar 5: Don't Burn Out</h2>
              <p className="text-muted-foreground text-lg">The Hara Hachi Bu of work</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Before every meal, Okinawans say the phrase <strong className="text-foreground">hara hachi bu</strong>. It means "fill your belly to 80%."
            </p>
            <p className="text-muted-foreground leading-relaxed">
              They stop eating before they're full. Their daily calorie intake averages 1,785 to 1,900 calories, compared to 2,200 to 3,300 in the United States. This single habit is one of the biggest reasons they live so long.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The principle extends beyond food. The centenarians of Ogimi are always busy, but never rushed. They work steadily, rest often, and don't push to the point of exhaustion.
            </p>

            <h3 className="font-heading text-xl text-foreground">Why Burnout Destroys Careers Faster Than Bad Decisions</h3>
            <p className="text-muted-foreground leading-relaxed">
              Here is what I see from the recruiter side. The #1 reason good employees leave good jobs is burnout. Not money. Not titles. Not bad managers. Burnout.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The cycle looks like this. You accept a role. You're eager to prove yourself. You say yes to everything. You work late. You skip vacations. Twelve months in, you're exhausted but pushing through. Eighteen months in, you're on a Sunday night dreading Monday. Twenty-four months in, you're gone.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              The role was fine. The company was fine. You burned yourself out.
            </p>

            <h3 className="font-heading text-xl text-foreground">The 80% Rule Applied to Your Career</h3>
            <InfoBox title="The 80% rule for work" variant="default">
              <div className="space-y-3 mt-2">
                <p><strong className="text-foreground">Leave margin in your day.</strong> Don't schedule meetings back to back from 8 AM to 6 PM. Leave gaps for thinking, walking, and recovery. Your brain does its best work in the spaces between tasks.</p>
                <p><strong className="text-foreground">Say no more often.</strong> Every "yes" takes time from something else. The centenarians of Ogimi do many different things every day, but they do one thing at a time, without getting overwhelmed. They don't overcommit.</p>
                <p><strong className="text-foreground">Rest before you need to.</strong> Don't wait until you're exhausted to take a break. Build rest into your routine, not as a reward for finishing work, but as a standard part of the workday.</p>
                <p><strong className="text-foreground">Protect your sleep.</strong> Melatonin strengthens the immune system, protects against cancer, promotes insulin production, and slows neurological decline. Sleep is not laziness. Sleep is career maintenance. Get 7-9 hours. Every night.</p>
              </div>
            </InfoBox>

            <h3 className="font-heading text-xl text-foreground">The 5-Minute Daily Check-In</h3>
            <p className="text-muted-foreground leading-relaxed">
              Every morning in Japan, millions of people do a 5-minute exercise routine called radio taiso. The exercises are simple: raising your arms, stretching, rotating your joints. Nothing intense. The point is daily maintenance, not peak performance.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Your career needs the same kind of daily check-in. Not a 2-hour weekly review. Not a quarterly "career reflection." Five minutes, every day.
            </p>

            <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6">
              <h4 className="text-gold font-semibold mb-3">Every morning, ask yourself three questions:</h4>
              <ol className="space-y-2">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-sm">1.</span>
                  <span className="text-foreground text-sm">What is the one task today where I should focus my best energy?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-sm">2.</span>
                  <span className="text-foreground text-sm">What is one thing I should say no to (or push back on) today?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold text-sm">3.</span>
                  <span className="text-foreground text-sm">Am I resting enough, or am I running on fumes?</span>
                </li>
              </ol>
              <p className="text-muted-foreground text-xs mt-4">Three questions. Five minutes. Over a year, this adds up to 30+ hours of conscious career management. Most people spend zero.</p>
            </div>

            <h3 className="font-heading text-xl text-foreground">What the Centenarians Teach Us About Pacing</h3>
            <InfoBox title="What the residents said" variant="gold">
              <p className="mb-2">"My secret to a long life is always saying to myself, 'Slow down,' and 'Relax.' You live much longer if you're not in a hurry."</p>
              <p>"Doing many different things every day. Always staying busy, but doing one thing at a time, without getting overwhelmed."</p>
            </InfoBox>
            <p className="text-muted-foreground leading-relaxed">
              Careers are long. The people who pace themselves finish stronger than the people who sprint.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ SCORECARD ═══════════════ */}
      <section id="scorecard" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Ikigai Career Scorecard</h2>
              <p className="text-muted-foreground text-lg">Rate your current role</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Use this scorecard to evaluate your current role or a new opportunity. Rate each pillar from 1 to 5. Then weight each pillar by how much the area matters to you right now.
            </p>

            <InteractiveScorecard lang="en" />

            <Collapsible title="Scoring Questions for Each Pillar">
              <div className="space-y-4 mt-3">
                {[
                  { title: "Purpose", questions: ["Do I wake up on Monday knowing why I'm going to work?", "Does my role connect to something I care about?", "Would I do a version of this work even if the pay was lower?"] },
                  { title: "Flow", questions: ["Do I lose track of time during work at least a few times per week?", "Is the challenge level right for my skills?", "Am I free from constant distractions during focused work?"] },
                  { title: "Community", questions: ["Do I have at least one real friend at work?", "Do I feel like part of a team, or like I'm working alone?", "Do I have a professional moai outside my current company?"] },
                  { title: "Resilience", questions: ["Am I learning new skills making me stronger?", "Do I have multiple options if this role disappeared tomorrow?", "Am I building antifragility?"] },
                  { title: "Sustainable Pace", questions: ["Am I working at a pace I will maintain for 5+ years?", "Do I have time for rest, relationships, and activities outside work?", "Am I sleeping enough? Moving enough? Taking breaks?"] },
                ].map((section) => (
                  <div key={section.title}>
                    <p className="text-foreground font-semibold text-sm mb-1">{section.title}</p>
                    <ul className="space-y-1">
                      {section.questions.map((q, i) => (
                        <li key={i} className="text-muted-foreground text-sm">• {q}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </Collapsible>

            <h3 className="font-heading text-xl text-foreground">How to Read Your Score</h3>
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { range: "80–100", label: "Strong ikigai alignment", desc: "Your career is in a good place. Maintain what you're doing.", color: "bg-green-500/5 border-green-500/20", textColor: "text-green-400" },
                { range: "60–79", label: "Proceed with awareness", desc: "Your career has strengths but gaps. Look at which pillars scored lowest.", color: "bg-gold/5 border-gold/20", textColor: "text-gold" },
                { range: "40–59", label: "Time to make changes", desc: "Your career has meaningful misalignment. Identify the weakest pillars and build a plan.", color: "bg-orange-500/5 border-orange-500/20", textColor: "text-orange-400" },
                { range: "Below 40", label: "Your ikigai is missing", desc: "Your work life is not sustainable. Start planning your next move.", color: "bg-destructive/5 border-destructive/20", textColor: "text-destructive" },
              ].map((tier) => (
                <div key={tier.range} className={`rounded-lg p-4 border ${tier.color}`}>
                  <p className={`${tier.textColor} text-sm font-bold mb-1`}>{tier.range}: {tier.label}</p>
                  <p className="text-muted-foreground text-xs">{tier.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════ WHAT IF STUCK ═══════════════ */}
      <section id="what-if-stuck" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">What If You Have No Idea What Your Ikigai Is?</h2>
              <p className="text-muted-foreground text-lg">Hard cases, honest advice</p>
            </div>
          </div>

          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Not everyone reads a guide like this from a position of strength. Some of you are stuck. Burned out. Between jobs. In a role you hate with bills to pay and no clear alternative.
            </p>

            <Collapsible title="If you're stuck in a job you hate">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">Don't quit tomorrow. But don't accept the situation as permanent either.</p>
                <p className="text-muted-foreground text-sm">Set a timeline. Tell yourself: "I will commit to this role for 6-12 more months. During this time I will do good work, build skills, and plan my exit." A stepping-stone role is fine. A prison sentence is not. The difference is awareness and a deadline.</p>
                <p className="text-muted-foreground text-sm">While you're in the role, run the <a href="#pillar-1" className="text-gold underline underline-offset-2">Ikigai Career Map</a> exercise. Fill in the four circles. Even if the overlap is small, it gives you a direction. Start taking one small step per week outside of work.</p>
              </div>
            </Collapsible>

            <Collapsible title="If you're unemployed and need income now">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">Take the job. Pay the bills. There is no shame in a survival role.</p>
                <p className="text-muted-foreground text-sm">But go in with your eyes open. Know what you're accepting and what you're giving up. Set a 12-month timeline. Commit to doing good work, expanding your network, and continuing to search for a better fit in the background.</p>
                <p className="text-muted-foreground text-sm">The risk of taking a bad-fit job isn't the job itself. The risk is staying too long because you stopped looking.</p>
              </div>
            </Collapsible>

            <Collapsible title="If you don't know what you want at all">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">This is more common than people admit. Most adults have no clear answer to "What is your ikigai?"</p>
                <p className="text-muted-foreground text-sm">Start here: track your energy for two weeks. At the end of each workday, write down the moments you felt engaged and the moments you felt drained. Don't analyze. Don't judge. Observe.</p>
                <p className="text-muted-foreground text-sm">After two weeks, look for patterns. The engaged moments are your flow clues. They point toward your ikigai, even if the full picture isn't clear yet.</p>
                <p className="text-muted-foreground text-sm">Morita therapy says: don't wait for clarity before acting. Act, and clarity will follow. Try things. Volunteer. Take a short course. Have coffee with someone in a different field. Your ikigai reveals itself through action, not reflection.</p>
              </div>
            </Collapsible>

            <Collapsible title="If you scored below 40 on the Ikigai Career Scorecard">
              <div className="space-y-3 mt-3">
                <p className="text-muted-foreground text-sm">A score below 40 on the <a href="#scorecard" className="text-gold underline underline-offset-2">scorecard</a> means your current situation is not sustainable. Something has to change.</p>
                <p className="text-muted-foreground text-sm">Look at which pillars scored lowest. If Purpose is your weakest area, the job itself is the problem. If Community is lowest, the environment is the problem. If Sustainable Pace is the issue, your habits are the problem.</p>
                <p className="text-muted-foreground text-sm">Not every low score requires quitting. Some require a conversation with your manager. Some require setting boundaries. Some require building a moai outside of work. Identify the weakest pillar and focus there first.</p>
              </div>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* ═══════════════ COMMON MISTAKES ═══════════════ */}
      <section id="common-mistakes" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Common Mistakes</h2>
              <p className="text-muted-foreground text-lg">Blind spots from 500+ hires</p>
            </div>
          </div>

          <div className="space-y-6">
            {[
              { title: "Mistake 1: Optimizing for the offer, not the first year.", desc: "People spend weeks negotiating salary, title, and start date. They spend zero time thinking about what the first 90 days will look like. Ask the hiring manager: \"What does success look like at 6 months?\" If the answer is vague, the role is undefined." },
              { title: "Mistake 2: Confusing a good company with a good role.", desc: "Brand-name companies have bad teams. Startups nobody's heard of have incredible ones. The company logo on your LinkedIn means nothing if the daily work drains you. Evaluate the role, the manager, and the team. Not the brand." },
              { title: "Mistake 3: Ignoring the signals during the interview.", desc: "Late interviewers. Disorganized scheduling. Hostile questions. Weekend emails during the process. These are not red flags to explain away. These are previews of your daily experience. The interview is the company's best behavior." },
              { title: "Mistake 4: Changing jobs without changing the pattern.", desc: "If you've left three roles in three years for similar reasons, the next job won't fix the pattern. Before you search again, identify what you need to change about how you evaluate opportunities. Use the scorecard. Set minimum thresholds." },
              { title: "Mistake 5: Waiting for the perfect moment to make a move.", desc: "There is no perfect moment. The economy won't be ideal. Your skills won't feel \"ready.\" Your savings won't feel \"enough.\" Morita therapy applies here: act first, clarity follows. The best time to start building toward your ikigai is today." },
            ].map((mistake, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="text-foreground font-semibold text-sm mb-2">{mistake.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{mistake.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════ QUICK REFERENCE ═══════════════ */}
      <section id="quick-reference" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">※</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">Quick Reference: The Ikigai Career Framework</h2>
            </div>
          </div>

          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-6">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">Your Ikigai</h3>
            <p className="text-cream/90 text-sm mb-4">The intersection of: What you love + What you're good at + What the world needs + What you're paid for</p>

            <h3 className="text-gold text-sm font-bold uppercase mb-3">5 Pillars of a Career That Lasts</h3>
            <ol className="space-y-2 mb-4">
              {[
                "PURPOSE: Know your why. Use the Ikigai Career Map to find the overlap.",
                "FLOW: Do work that absorbs you. Track when you lose track of time.",
                "COMMUNITY: Build your moai. Make real friends at work.",
                "RESILIENCE: Embrace wabi-sabi. Build antifragility.",
                "SUSTAINABLE PACE: Work at 80%. Protect rest. Pace yourself.",
              ].map((item, i) => (
                <li key={i} className="text-cream/85 text-sm"><span className="text-gold font-bold mr-1">{i + 1}.</span> {item}</li>
              ))}
            </ol>

            <h3 className="text-gold text-sm font-bold uppercase mb-3">Key Exercises</h3>
            <ul className="space-y-1">
              {[
                "Complete the Ikigai Career Map (4 circles)",
                "Track your flow moments for one week",
                "Identify your moai (or start building one)",
                "Score your current role on the Ikigai Scorecard",
                "List 3 things that make you fragile. Fix one.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <GoldCheckBadge />
                  <span className="text-cream/85 text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ ACTION PLAN ═══════════════ */}
      <section id="action-plan" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Your Action Plan</h2>
              <p className="text-muted-foreground text-lg">90-day roadmap with weekly tasks</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Right Now */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">Right Now (5 Minutes)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Do this before you close this page.</p>
              <InteractivePulseCheck lang="en" />
            </div>

            {/* Phase 1 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">Phase 1: Assess Your Baseline (Week 1)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Your only job this week is to understand where you stand. No changes. No decisions. Data only.</p>
              <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
                {[
                  { day: "Day 1-2", title: "The Ikigai Career Map", desc: "Fill in all four circles. Find the overlap. Write down your ikigai (for now).", link: "#pillar-1" },
                  { day: "Day 3-5", title: "Flow + Drain Tracker", desc: "End of each workday, write down: when did time fly? (flow) When did time drag? (drain)", link: "#pillar-2" },
                  { day: "Day 6", title: "The Ikigai Career Scorecard", desc: "Set weights. Rate each pillar. Calculate.", link: "#scorecard" },
                  { day: "Day 7", title: "Review", desc: "Which pillar scored lowest? Biggest gap between your priorities and reality?" },
                ].map((item) => (
                  <div key={item.day} className="flex items-start gap-4">
                    <span className="text-gold text-xs font-bold uppercase shrink-0 w-16 pt-0.5">{item.day}</span>
                    <div>
                      <p className="text-foreground text-sm font-medium">{item.title} {item.link && <a href={item.link} className="text-gold text-xs underline underline-offset-2">→ full tool</a>}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Phase 2 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">Phase 2: Fix Your Weakest Pillar (Weeks 2-4)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">Look at your scorecard. Find the lowest-scoring pillar. Spend three weeks on this one area only.</p>
              <div className="space-y-3">
                {[
                  { pillar: "PURPOSE", actions: ["Have 3 conversations with people in roles you're curious about", "Take one small action toward a new direction", "Revisit your Ikigai Career Map at month-end"], link: "#pillar-1" },
                  { pillar: "FLOW", actions: ["Identify the #1 distraction killing your focus. Remove it for 2 weeks.", "Ask your manager for a stretch project matching your skills", "Block 2 hours per day for single-task, zero-notification work"], link: "#pillar-2" },
                  { pillar: "COMMUNITY", actions: ["Eat lunch with a colleague 3 times this week. Away from your desk.", "Reach out to 2 former coworkers you've lost touch with", "Join one group (industry Slack, local meetup, professional association)"], link: "#pillar-3" },
                  { pillar: "RESILIENCE", actions: ["List 3 things making you fragile. Pick one and address it.", "Start one small side project or secondary skill", "Answer: \"What would I do if I lost this job tomorrow?\""], link: "#pillar-4" },
                  { pillar: "SUSTAINABLE PACE", actions: ["Start the 5-minute daily check-in (3 questions every morning)", "Say no to one commitment this week", "Set a hard stop time for work. Honor it for 3 weeks."], link: "#pillar-5" },
                ].map((item) => (
                  <Collapsible key={item.pillar} title={`If ${item.pillar} scored lowest`}>
                    <div className="mt-2">
                      <p className="text-muted-foreground text-xs mb-2"><a href={item.link} className="text-gold underline underline-offset-2">Exercises in this pillar →</a></p>
                      <ul className="space-y-1">
                        {item.actions.map((action, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <GoldCheckBadge />
                            <span className="text-muted-foreground text-sm">{action}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Collapsible>
                ))}
              </div>
              <p className="text-muted-foreground text-sm mt-4 italic">One pillar. Three weeks. Small steps.</p>
            </div>

            {/* Phase 3 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">Phase 3: Build the System (Months 2-3)</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">After addressing your weakest pillar, shift to maintenance.</p>
              <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
                {[
                  { freq: "DAILY (5 min)", items: ["What is my #1 task today?", "What should I say no to?", "Am I resting enough, or running on fumes?"] },
                  { freq: "WEEKLY (30 min, every Friday)", items: ["Where did I experience flow this week?", "Where did I feel drained?", "Send one message to someone in my moai"] },
                  { freq: "MONTHLY (1 hour, first Monday)", items: ["Re-score the Ikigai Career Scorecard", "Score going up, down, or flat?", "Identify next weakest pillar for 30-day focus"] },
                  { freq: "QUARTERLY (2 hours)", items: ["Revisit Ikigai Career Map. Has it shifted?", "Update your resume (before you need to)", "Antifragility check: Do I have redundancies?"] },
                ].map((block) => (
                  <div key={block.freq}>
                    <p className="text-gold text-xs font-bold uppercase mb-2">{block.freq}</p>
                    <ul className="space-y-1">
                      {block.items.map((item, i) => (
                        <li key={i} className="text-muted-foreground text-sm">• {item}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* The Full 90-Day View */}
            <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6">
              <h4 className="text-gold font-semibold mb-4">The Full 90-Day View</h4>
              <div className="grid grid-cols-4 gap-3 text-center">
                {[
                  { phase: "RIGHT NOW", desc: "5 min", detail: "Answer 3 questions", result: "\"I have a starting signal.\"" },
                  { phase: "WEEK 1", desc: "Assess", detail: "Ikigai Map, Flow tracking, Scorecard", result: "\"I know where I stand.\"" },
                  { phase: "WEEKS 2-4", desc: "Act", detail: "Fix weakest pillar, one focus only", result: "\"I'm making progress.\"" },
                  { phase: "MONTHS 2-3", desc: "Build", detail: "Daily check-in, weekly review, monthly re-score", result: "\"This is how I manage my career now.\"" },
                ].map((item) => (
                  <div key={item.phase}>
                    <p className="text-gold text-xs font-bold">{item.phase}</p>
                    <p className="text-foreground text-sm font-medium mt-1">{item.desc}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.detail}</p>
                    <p className="text-foreground text-xs italic mt-2">{item.result}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs mt-4 text-center">Then repeat. Pick next weakest pillar. Run another 30-day focus. Re-score.</p>
            </div>

            <p className="text-muted-foreground leading-relaxed">
              After 90 days, you're not the same professional you were on Day 1. You have a clear ikigai direction, a stronger weakest pillar, and a system keeping all five pillars in check.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Then you repeat. The centenarians of Ogimi tend their gardens every single morning. They don't plant once and walk away. Treat your career the same way.
            </p>
          </div>
        </div>
      </section>

      {/* ═══════════════ RESOURCES ═══════════════ */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">Resources</h2>
              <p className="text-gold-soft/80">Keep building your career</p>
            </div>
          </div>

          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">The Book</h3>
            <p className="text-cream/90 text-sm italic mb-4">"Ikigai: The Japanese Secret to a Long and Happy Life" by Héctor García and Francesc Miralles</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">Also Referenced</h3>
            <ul className="space-y-1 text-cream/85 text-sm">
              <li>• <em>Man's Search for Meaning</em> by Viktor Frankl</li>
              <li>• <em>Flow: The Psychology of Optimal Experience</em> by Mihaly Csikszentmihalyi</li>
              <li>• <em>Antifragile: Things That Gain from Disorder</em> by Nassim Nicholas Taleb</li>
              <li>• <em>The Okinawa Program</em> by Bradley Willcox, Craig Willcox, and Makoto Suzuki</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/career-game-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">The Promotion Playbook</p>
              <span className="text-gold text-sm font-medium">Career Game Guide →</span>
            </Link>
            <Link to="/pivot-method-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Change careers</p>
              <span className="text-gold text-sm font-medium">Pivot Method Guide →</span>
            </Link>
            <Link to="/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Negotiate your salary</p>
              <span className="text-gold text-sm font-medium">Salary Starter Kit →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      {/* Attribution */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-muted-foreground text-xs italic text-center">
            This guide is based on "Ikigai: The Japanese Secret to a Long and Happy Life" by Héctor García and Francesc Miralles, along with the research and frameworks referenced throughout. Recruiter perspectives are from James Bugden's 15+ years of hiring experience.
          </p>
        </div>
      </section>

      <InlineRating contentId="guide_ikigai" locale="en" />

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default IkigaiGuide;