import { Download, FileText, Target, CheckSquare, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import PageSEO from "@/components/PageSEO";

const ResumeQuickReference = () => {
  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="The Perfect Resume: Quick Reference Guide | James Bugden"
        description="A concise cheat sheet with the 10 Golden Rules, Three R Model, Framing Technique, and pre-submission checklist. By James Bugden, Senior Recruiter at Uber."
        path="/resume-quick-reference"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <LanguageToggle variant="nav" />
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <FileText className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">Free Career Resource</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            The Perfect Resume: Quick Reference Guide
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Everything you need on one page. No fluff.
          </p>
          <p className="text-base text-cream/60 mb-6">
            By James Bugden, Senior Recruiter at Uber
          </p>
        </div>
      </section>

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* Download Your Resume Template */}
        <section className="-mx-5 md:-mx-6 px-5 md:px-6 py-10 md:py-14 bg-executive-green mt-0">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-cream/10 border border-cream/20 rounded-full mb-5">
              <Download className="w-4 h-4 text-gold" />
              <span className="text-sm text-cream/80 font-medium">Free Template</span>
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-cream mb-3">
              Download Your Resume Template
            </h2>
            <p className="text-cream/70 mb-8 text-lg">
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
                <Button size="lg" variant="outline" className="border-cream/30 text-cream hover:bg-cream/10 font-semibold w-full sm:w-auto h-12 px-8 text-base">
                  <Download className="w-5 h-5 mr-2" />
                  中文模板
                </Button>
              </a>
            </div>
          </div>
        </section>

        {/* The 4 Tests */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-12 h-12 rounded-full bg-executive-green flex items-center justify-center">
              <Target className="w-6 h-6 text-cream" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              The 4 Tests Your Resume Must Pass
            </h2>
          </div>
          <p className="text-muted-foreground mb-6 text-lg">
            Your resume goes through four tests, in order. Fail any one and you're out.
          </p>
          <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-4">
            {["Test 1: Keyword", "Test 2: Scan (6 sec)", "Test 3: Qualifications", "Test 4: Fit"].map((test, i) => (
              <div key={test} className="flex items-center gap-2">
                <span className="px-3 py-1.5 bg-card border border-border rounded-lg text-sm font-medium text-foreground">
                  {test}
                </span>
                {i < 3 && <span className="text-gold font-bold">→</span>}
              </div>
            ))}
            <div className="flex items-center gap-2">
              <span className="text-gold font-bold">→</span>
              <span className="px-3 py-1.5 bg-gold/20 border border-gold/40 rounded-lg text-sm font-semibold text-gold">
                ✓ Callback
              </span>
            </div>
          </div>
          <p className="text-foreground font-medium">
            Pass all four and the recruiter picks up the phone.
          </p>
        </section>

        {/* 10 Golden Rules */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">
            10 Golden Rules
          </h2>
          <div className="space-y-4">
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
              <div key={i} className="flex items-start gap-4">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-sm font-bold text-gold">
                  {i + 1}
                </span>
                <p className="text-foreground text-base md:text-lg pt-1">{rule}</p>
              </div>
            ))}
          </div>
        </section>

        {/* The Three R Model */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            The Three R Model
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Every bullet on your resume must be:
          </p>
          <div className="space-y-4 mb-8">
            {[
              { letter: "R", title: "Relevant", desc: "Tied to the job description." },
              { letter: "R", title: "Relative", desc: "Compared to a benchmark." },
              { letter: "R", title: "Results-oriented", desc: "Focused on outcomes, not tasks." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 font-bold text-gold text-sm">
                  {item.letter}
                </span>
                <div>
                  <span className="font-semibold text-foreground">{item.title}:</span>{" "}
                  <span className="text-muted-foreground">{item.desc}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Weak vs Strong */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5 mb-4">
            <p className="font-medium text-destructive mb-2">WEAK:</p>
            <p className="text-foreground text-sm italic">"Responsible for managing client accounts."</p>
            <p className="text-muted-foreground text-xs mt-1">(Not relevant. Not relative. No results.)</p>
          </div>
          <div className="bg-card border border-gold/30 rounded-lg p-5 mb-4">
            <p className="font-medium text-gold mb-2">STRONG:</p>
            <p className="text-foreground text-sm italic">"Drove 85% client retention across 37 accounts, exceeding growth targets by 55%."</p>
            <p className="text-muted-foreground text-xs mt-1">(Relevant. Relative. Results-oriented.)</p>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Same person. Same job. Completely different impression.
          </p>
        </section>

        {/* The Framing Technique */}
        <section className="mb-16">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            The Framing Technique
          </h2>
          <p className="text-muted-foreground mb-6 text-lg">
            Convert vague impact into specific numbers. Make the math work for you.
          </p>
          <div className="bg-executive-green rounded-lg p-6 mb-6">
            <p className="text-cream font-mono text-sm md:text-base text-center">
              8 people × 2 hrs saved/week × $30/hr × 52 weeks = <span className="text-gold font-bold">$25,000/year</span>
            </p>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-5 mb-4">
            <p className="font-medium text-destructive mb-2">Before:</p>
            <p className="text-foreground text-sm italic">"Streamlined a process that saved the team time."</p>
          </div>
          <div className="bg-card border border-gold/30 rounded-lg p-5 mb-4">
            <p className="font-medium text-gold mb-2">After:</p>
            <p className="text-foreground text-sm italic">"Saved $25,000 annually across 8 team members."</p>
          </div>
          <p className="text-muted-foreground italic text-sm">
            Same project. Same result. 10x stronger impression.
          </p>
        </section>

        {/* Pre-Submission Checklist */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <CheckSquare className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Pre-Submission Checklist
            </h2>
          </div>

          {/* Planning */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">PLANNING</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Identified target companies and roles</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Extracted keywords from 3-5 job descriptions</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Mapped achievements to job description keywords</span>
              </li>
            </ul>
          </div>

          {/* Format */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">FORMAT</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Exactly one page, edge to edge</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Content density 30-50%</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">One font throughout. No color, no graphics.</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Margins 0.5-1 inch. Line spacing 1.0-1.15.</span>
              </li>
            </ul>
          </div>

          {/* Content */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">CONTENT</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Name is the most prominent element</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Every bullet starts with a strong action verb</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Every bullet focuses on results, not responsibilities</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Numbers, percentages, or dollar amounts in bullets</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"5 For 5" rule: max 5 bullets (recent), max 3 (older)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Nothing from the "never include" list</span>
              </li>
            </ul>
          </div>

          {/* Polish */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <h3 className="font-heading text-xl text-gold mb-4">POLISH</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Zero spelling or grammar errors</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Consistent formatting (bold, italics, dates, spacing)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">File saved as PDF: "[Name] Resume_[Month Year]_[Company]"</span>
              </li>
            </ul>
          </div>
        </section>

        {/* More Free Guides */}
        <section className="-mx-5 md:-mx-6 px-5 md:px-6 py-10 md:py-14 bg-executive-green/5 border-y border-gold/20 mb-16">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2 text-center">
              More Free Guides
            </h2>
            <p className="text-muted-foreground text-center mb-8">Keep levelling up your job search</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <Link to="/interview-preparation-guide" className="group bg-card border border-border rounded-xl p-6 text-center hover:border-gold/40 hover:shadow-md transition-all">
                <p className="text-foreground font-semibold mb-2 group-hover:text-gold transition-colors">Got the interview? Win it.</p>
                <span className="text-gold text-sm font-medium">
                  Interview Prep →
                </span>
              </Link>
              <Link to="/pivot-method-guide" className="group bg-card border border-border rounded-xl p-6 text-center hover:border-gold/40 hover:shadow-md transition-all">
                <p className="text-foreground font-semibold mb-2 group-hover:text-gold transition-colors">Thinking about a career change?</p>
                <span className="text-gold text-sm font-medium">
                  Pivot Method →
                </span>
              </Link>
              <Link to="/guides" className="group bg-card border border-border rounded-xl p-6 text-center hover:border-gold/40 hover:shadow-md transition-all">
                <p className="text-foreground font-semibold mb-2 group-hover:text-gold transition-colors">Browse all resources</p>
                <span className="text-gold text-sm font-medium">
                  All Guides →
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeQuickReference;
