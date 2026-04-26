import { Download, FileText, Target, CheckSquare, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import GuideShareButtons from "@/components/GuideShareButtons";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/SiteHeader";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const SectionNumber = ({ num }: { num: string }) => (
  <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">
    {num}
  </span>
);

const ResumeQuickReference = () => {
  useTrackGuideProgress("resume-ref");
  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/resume-quick-reference", title: "Resume Quick Reference | Cheat Sheet", description: "One-page resume cheat sheet with formatting rules, action verbs, and do's and don'ts." })} />

      {/* Navigation */}
      <SiteHeader variant="dark" lang="en" sticky />

{/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            The Perfect Resume:<br className="hidden sm:block" /> Quick Reference Guide
          </h1>
          <p className="text-lg md:text-xl text-cream/90 mb-3">
            Everything you need on one page. No fluff.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-gold-soft/80">
              By James Bugden, Senior Recruiter at Uber
            </p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-gold-soft/80">
              <Clock className="w-4 h-4" />
              <span className="text-sm">3 min read</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* Template Download - separate from hero with distinct background */}
      <section className="py-10 md:py-14 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gold/10 border border-gold/20 rounded-full mb-5">
            <Download className="w-4 h-4 text-gold" />
            <span className="text-sm text-gold font-medium">Free Template</span>
          </div>
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-3">
            Download Your Resume Template
          </h2>
          <p className="text-muted-foreground mb-8 text-lg max-w-xl mx-auto">
            Pre-formatted. Ready to fill in. Follows every rule in this guide.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="https://docs.google.com/document/d/1BAkVHZ57JsLzL0hk1AUvFBu4bsx8ymMA7tPJKuJROIM/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" className="bg-gold hover:bg-gold/90 text-executive-green font-semibold w-full sm:w-auto h-12 px-8 text-base">
                <Download className="w-5 h-5 mr-2" />
                English Template
              </Button>
            </a>
            <a
              href="https://docs.google.com/document/d/1U14BS5yISb17ejgVIX5IyeaVZKiww33hpJNOnEy4Wy0/edit?usp=sharing"
              target="_blank"
              rel="noopener noreferrer"
            >
              <Button size="lg" variant="outline" className="border-border text-foreground hover:bg-muted font-semibold w-full sm:w-auto h-12 px-8 text-base">
                <Download className="w-5 h-5 mr-2" />
                中文模板
              </Button>
            </a>
          </div>
        </div>
      </section>

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* The 4 Tests */}
        <section className="py-14 md:py-20">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                The 4 Tests Your Resume Must Pass
              </h2>
              <p className="text-muted-foreground text-lg">
                Your resume goes through four tests, in order. Fail any one and you're out.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
            {[
              { num: "1", label: "Keyword" },
              { num: "2", label: "Scan (6 sec)" },
              { num: "3", label: "Qualifications" },
              { num: "4", label: "Fit" },
            ].map((test, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4 text-center relative">
                <span className="text-gold font-heading text-2xl font-bold">{test.num}</span>
                <p className="text-foreground text-sm font-medium mt-1">{test.label}</p>
                {i < 3 && (
                  <ArrowRight className="w-4 h-4 text-gold absolute -right-3.5 top-1/2 -translate-y-1/2 hidden md:block" />
                )}
              </div>
            ))}
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-3 text-center">
            <p className="text-foreground font-medium">
              Pass all four → <span className="text-gold font-semibold">the recruiter picks up the phone.</span>
            </p>
          </div>
        </section>

        {/* 10 Golden Rules */}
        <section className="pb-14 md:pb-20">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                10 Golden Rules
              </h2>
            </div>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Only apply to jobs you're qualified for.",
              "Mirror the language from your target job descriptions.",
              "Stand out with substance, not style.",
              "Exactly one page. No exceptions for most people.",
              "Build to be scanned first, read second.",
              "Active voice in every bullet.",
              "Results, not responsibilities. (The Three R Model.)",
              "Prioritize what's most relevant to the role.",
              "Perfection prevents rejection.",
              "Be persistently consistent.",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <span className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold mt-0.5">
                  {i + 1}
                </span>
                <p className="text-foreground text-sm md:text-base leading-relaxed">{rule}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      {/* Three R Model - full width alternate bg */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                The Three R Model
              </h2>
              <p className="text-muted-foreground text-lg">
                Every bullet on your resume must be:
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4 mb-10">
            {[
              { title: "Relevant", desc: "Tied to the job description." },
              { title: "Relative", desc: "Compared to a benchmark." },
              { title: "Results-oriented", desc: "Focused on outcomes, not tasks." },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5 text-center">
                <span className="inline-flex w-10 h-10 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-lg mb-3">
                  R
                </span>
                <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          {/* Side-by-side comparison */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <p className="font-medium text-destructive mb-3 text-sm uppercase tracking-wider">✕ Weak</p>
              <p className="text-foreground italic mb-2">"Responsible for managing client accounts."</p>
              <p className="text-muted-foreground text-xs">(Not relevant. Not relative. No results.)</p>
            </div>
            <div className="bg-background border border-gold/30 rounded-xl p-5">
              <p className="font-medium text-gold mb-3 text-sm uppercase tracking-wider">✓ Strong</p>
              <p className="text-foreground italic mb-2">"Drove 85% client retention across 37 accounts, exceeding growth targets by 55%."</p>
              <p className="text-muted-foreground text-xs">(Relevant. Relative. Results-oriented.)</p>
            </div>
          </div>
          <p className="text-muted-foreground italic text-sm text-center mt-6">
            Same person. Same job. Completely different impression.
          </p>
        </div>
      </section>

      {/* The Framing Technique */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                The Framing Technique
              </h2>
              <p className="text-muted-foreground text-lg">
                Convert vague impact into specific numbers. Make the math work for you.
              </p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold-soft/80 text-xs uppercase tracking-wider mb-3 text-center">The Formula</p>
            <p className="text-cream font-mono text-sm md:text-base text-center leading-relaxed">
              8 people × 2 hrs saved/week × $30/hr × 52 weeks
            </p>
            <p className="text-gold font-heading text-2xl md:text-3xl text-center mt-2 font-bold">
              = $25,000/year
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <p className="font-medium text-destructive mb-3 text-sm uppercase tracking-wider">✕ Before</p>
              <p className="text-foreground text-sm italic">"Streamlined a process that saved the team time."</p>
            </div>
            <div className="bg-card border border-gold/30 rounded-xl p-5">
              <p className="font-medium text-gold mb-3 text-sm uppercase tracking-wider">✓ After</p>
              <p className="text-foreground text-sm italic">"Saved $25,000 annually across 8 team members."</p>
            </div>
          </div>
          <p className="text-muted-foreground italic text-sm text-center mt-6">
            Same project. Same result. 10x stronger impression.
          </p>
        </div>
      </section>

      {/* Pre-Submission Checklist */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-10">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                Pre-Submission Checklist
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Planning */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                PLANNING
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Identified target companies and roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Extracted keywords from 3-5 job descriptions</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Mapped achievements to JD keywords</span>
                </li>
              </ul>
            </div>

            {/* Format */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                FORMAT
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Exactly one page, edge to edge</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Content density 30-50%</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">One font throughout. No color, no graphics.</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Margins 0.5-1 inch. Line spacing 1.0-1.15.</span>
                </li>
              </ul>
            </div>

            {/* Content */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                CONTENT
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Name is the most prominent element</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Every bullet starts with a strong action verb</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Every bullet focuses on results, not responsibilities</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Numbers, percentages, or dollar amounts in bullets</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"5 For 5" rule: max 5 bullets (recent), max 3 (older)</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Nothing from the "never include" list</span>
                </li>
              </ul>
            </div>

            {/* Polish */}
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                POLISH
              </h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Zero spelling or grammar errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Consistent formatting (bold, italics, dates, spacing)</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">File saved as PDF: "[Name] Resume_[Month Year]_[Company]"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Free Guides */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">06</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">
                More Free Guides
              </h2>
              <p className="text-gold-soft/80">Keep levelling up your job search</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/interview-preparation-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Got the interview? Win it.</p>
              <span className="text-gold text-sm font-medium">
                Interview Prep →
              </span>
            </Link>
            <Link to="/pivot-method-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Thinking about a career change?</p>
              <span className="text-gold text-sm font-medium">
                Pivot Method →
              </span>
            </Link>
            <Link to="/guides" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Browse all resources</p>
              <span className="text-gold text-sm font-medium">
                All Guides →
              </span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      <InlineRating contentId="guide_resume_quick_ref" locale="en" />

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default ResumeQuickReference;