import { FileText, Clock, Linkedin, Phone, Video, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, MessageSquare, Target, Shield, Briefcase, ChevronDown, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import { useState, useEffect } from "react";

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

/* ─── Table of Contents ─── */
const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "scorecard", label: "01 · The Scorecard" },
  { id: "before", label: "02 · Before the Call" },
  { id: "story", label: "03 · Know Your Story" },
  { id: "frameworks", label: "04 · Answer Frameworks" },
  { id: "tough", label: "05 · Tough Questions" },
  { id: "salary", label: "06 · Salary" },
  { id: "setup", label: "07 · Setup & Etiquette" },
  { id: "questions", label: "08 · Questions to Ask" },
  { id: "redflags", label: "09 · Red Flags" },
  { id: "mistakes", label: "10 · Common Mistakes" },
  { id: "after", label: "11 · After the Call" },
  { id: "levels", label: "12 · By Career Level" },
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
            <a
              key={id}
              href={`#${id}`}
              onClick={(e) => {
                e.preventDefault();
                document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
              }}
              className={`block text-sm py-1.5 pl-3 border-l-2 transition-all duration-200 ${
                active === id
                  ? "border-gold text-gold font-medium"
                  : "border-transparent text-muted-foreground hover:text-foreground hover:border-border"
              }`}
            >
              {label}
            </a>
          ))}
        </nav>
      </aside>

      {/* Mobile floating TOC */}
      <div className="xl:hidden fixed bottom-6 left-6 z-50">
        <button
          onClick={() => setOpen(!open)}
          className="w-11 h-11 rounded-full bg-executive-green text-cream shadow-lg flex items-center justify-center hover:scale-105 transition-transform"
          aria-label="Table of contents"
        >
          <Menu className="w-5 h-5" />
        </button>
        {open && (
          <div className="absolute bottom-14 left-0 bg-card border border-border rounded-xl shadow-2xl p-4 w-56 max-h-[70vh] overflow-y-auto">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-2">Contents</p>
            <nav className="space-y-1">
              {tocSections.map(({ id, label }) => (
                <a
                  key={id}
                  href={`#${id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
                    setOpen(false);
                  }}
                  className={`block text-sm py-1.5 pl-3 border-l-2 transition-all ${
                    active === id
                      ? "border-gold text-gold font-medium"
                      : "border-transparent text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {label}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </>
  );
};

const RecruiterScreenGuide = () => {
  useTrackGuideProgress("recruiter-screen");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="How to Pass the First Interview With HR | James Bugden"
        description="A Senior Recruiter's end-to-end playbook for passing the screening call. Word-for-word examples, salary scripts, and the exact scorecard recruiters use."
        path="/hr-interview-guide"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
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
            How to Pass the<br className="hidden sm:block" /> First Interview With HR
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            A Senior Recruiter's End-to-End Playbook
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">
              By James Bugden, Career Coach · Senior Recruiter @ Uber
            </p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 min read</span>
            </div>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* Introduction */}
      <TableOfContents />
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            I've reviewed over 20,000 resumes. I've made 500+ hires at top international companies. I've done thousands of screening calls.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Most candidates treat the recruiter screen like a warm-up. It isn't. <span className="text-gold font-semibold">It's the gate.</span> You don't get to the hiring manager without getting through me first (well, you do sometimes, if you're smart about referrals).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Here's the good news. The screening call is the most predictable part of the hiring process. The questions are mostly the same. The mistakes are mostly the same. The things that get people through are mostly the same.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide covers the whole process end to end. What to do before the call. What I score during it. How to handle every question, including salary. What to do after we hang up. And how the screen changes at each career level.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I've also included word-for-word examples for the questions that trip most people up. Read those sections carefully. Practice the answers out loud. Then make them your own.
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 text-center mb-8">
            <p className="text-foreground font-medium">
              Do the work in this guide. You'll be better prepared than <span className="text-gold font-semibold">90% of the people I talk to every week.</span>
            </p>
          </div>

          {/* How you ended up on my list */}
          <h3 className="font-heading text-xl text-foreground mb-4">How you ended up on my list</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Before we get into the call itself, it helps to understand how you got here.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You're on my calendar for one of a few reasons. You applied and your resume made it through the ATS (applicant tracking system). Or you were already in our system from a previous application. Or I found your LinkedIn profile through a search. Or someone on the team referred you.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The path matters because it changes my starting impression. A referral from a trusted employee gets extra attention. A cold application means your resume did the work on its own. A LinkedIn outreach means something in your profile matched what I was looking for. In all cases, the screening call is where I verify whether the signal I saw on paper holds up in a conversation.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            If you're not getting screening calls at all, the problem is upstream. Your resume or your LinkedIn profile isn't doing its job. Read the <Link to="/resume-guide" className="text-gold hover:underline">resume guide</Link> to fix that first.
          </p>
        </div>
      </section>

      {/* Section 1: The Scorecard */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section id="scorecard" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                What the Recruiter Is Actually Doing
              </h2>
              <p className="text-muted-foreground text-lg">
                You're thinking about your answers. I'm filling out a scorecard.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            Every recruiter at a structured company uses one. It's a form with space for pros, cons, and a final decision.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This is the format I've worked with. There is no "maybe" option. I pick one: Strong No, No, Yes, or Strong Yes. My job on the call is to answer one question: do I have enough confidence to put this person in front of my hiring manager?
          </p>

          {/* Scorecard visual */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8 font-mono text-sm">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-sans font-semibold">The Recruiter Scorecard</p>
            <p className="text-cream/50 text-xs text-center mb-4 font-sans">(What I fill out after your call)</p>
            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4">
                <p className="text-cream/60 text-xs uppercase mb-2">Pros</p>
                <div className="space-y-2">
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                </div>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-lg p-4">
                <p className="text-cream/60 text-xs uppercase mb-2">Cons</p>
                <div className="space-y-2">
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                  <div className="border-b border-cream/10 pb-1 text-cream/30">___________________</div>
                </div>
              </div>
            </div>
            <p className="text-cream/60 text-xs uppercase mb-3 text-center">Decision (pick one):</p>
            <div className="flex flex-wrap justify-center gap-2">
              {["STRONG NO", "NO", "YES", "STRONG YES"].map((d) => (
                <span key={d} className="px-3 py-1.5 border border-cream/20 rounded text-cream/70 text-xs">{d}</span>
              ))}
            </div>
            <p className="text-cream/40 text-xs text-center mt-4 font-sans italic">
              There is no "maybe." I have to make a decision. Your job is to make that decision easy.
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">Here's what I'm evaluating to fill out those boxes.</p>

          {/* What I evaluate - full paragraphs */}
          <div className="space-y-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">Qualification match</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Do your skills match what the job needs? The screen confirms what the resume suggested. If your resume says "SQL expert" and you stumble when I ask about it, I note a trust problem. I'm not screening you out for the gap. I'm screening you out for the gap between what you claimed and what you showed.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">Motivation and genuine interest</h4>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                This is the most underrated factor on the scorecard. If you fit the qualifications and meet the other criteria below, I need to know one thing: do you have the right reasons for changing jobs?
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                I'm asking myself a series of questions about you. If you change jobs often, will you do the same with this one? Are you seriously looking for a new role, or are you shopping around to see what's out there? How does this job fit your career goals and what you want long term?
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">
                The more I see this role aligning with what you want, the higher the chance you'll accept when we make an offer. And the higher the chance you'll stay. I'm not filling a seat. I'm filling a role I need someone to succeed in for years.
              </p>
              <p className="text-muted-foreground text-sm leading-relaxed">
                You don't need a speech. You need specifics. Show me you've thought about why this role, at this company, at this point in your career. That's what lands in the "pros" column.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">Communication</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Do you answer the question I asked? With a real example? Concisely? I'm not only evaluating your content. I'm thinking about how you'll come across with the hiring manager, in a panel, with clients. If you ramble on a screening call, I worry about what happens in the real interview.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">Salary alignment</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                One of my top two disqualifiers is a comp mismatch. I'm not asking about salary to trap you. If you need $200k and the role tops out at $150k, I, you, and the hiring team don't want to waste time on an interview process if you're not going to accept an offer because the salary is too low.
              </p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-foreground font-semibold mb-2">Red flags</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Gaps you can't explain. Resume claims you can't back up. Negativity about past employers. Late to the call. These get noted. So does their absence, which works in your favor.
              </p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">What most candidates don't realize</h4>
            <p className="text-foreground text-sm leading-relaxed italic">
              When I advance you, I put my name behind that decision. If you bomb with the hiring manager, my judgment takes the hit. I'm not looking for reasons to reject you. I'm looking for enough confidence to take the risk. Your job is to give me that confidence.
            </p>
          </div>
        </section>

        {/* Section 2: Before the Call */}
        <section id="before" className="pb-14 md:pb-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Before the Call
              </h2>
              <p className="text-muted-foreground text-lg">
                Candidates who advance aren't always more talented. They're more prepared. Here's the system.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Research the company */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Research the Company (30-60 min)</h3>
              <p className="text-muted-foreground text-sm mb-3">You need to answer "What do you know about us?" with specific detail. That means:</p>
              <ul className="space-y-2 mb-4">
                {[
                  "Read the company website. Mission, products, leadership team.",
                  "Search recent news. Funding, acquisitions, product launches, leadership changes.",
                  "Check Glassdoor. Look for patterns in reviews, not the score alone.",
                  "Look at their LinkedIn page. See what they post and who's joining.",
                  "If they have a product, use it. Even the free trial or onboarding flow.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm mb-4">
                Come prepared with at least three specific things you know about the company. You won't always get asked directly. But when the conversation opens up, you want something real to say.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                I notice immediately when someone hasn't done this.
              </p>
              <div className="grid md:grid-cols-2 gap-3">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-xs uppercase font-medium mb-1">✕ Vague</p>
                  <p className="text-foreground text-sm italic">"I've heard great things about your culture."</p>
                </div>
                <div className="bg-background border border-gold/30 rounded-lg p-3">
                  <p className="text-gold text-xs uppercase font-medium mb-1">✓ Specific</p>
                  <p className="text-foreground text-sm italic">"I read about your Series C last month and the push into Southeast Asia stood out to me."</p>
                </div>
              </div>
            </div>

            {/* Research the recruiter */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Research the Recruiter</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Look me up on LinkedIn before the call. I see when you've viewed my profile. I appreciate it. It tells me you're thorough. Look at my career path and how long I've been at the company. Use it to build rapport in the first minute of the call.
              </p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-gold text-xs uppercase font-medium mb-1">Example opener</p>
                <p className="text-foreground text-sm italic">"I saw on LinkedIn that you joined from [Company]. How has the transition been?"</p>
                <p className="text-muted-foreground text-xs mt-1">Enough to warm the conversation before we get into the formal questions.</p>
              </div>
            </div>

            {/* Decode the JD */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Decode the Job Description</h3>
              <p className="text-muted-foreground text-sm mb-3">
                The job description is your cheat code. Most candidates skim it once. Go line by line.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                The first three bullet points almost always describe the must-haves. If a skill appears two or three times across different sections, it's required. Language like "familiarity with" or "a plus" signals nice-to-haves.
              </p>
              <p className="text-muted-foreground text-sm mb-4">Build a simple three-column document:</p>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                {["Job Requirement", "Your Experience", "Specific Example"].map((col) => (
                  <div key={col} className="bg-background border border-border rounded-lg p-3">
                    <p className="text-foreground text-xs font-medium">{col}</p>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs">
                This shows you exactly where your experience is strong and where there are gaps. It also gives you the raw material for most of your answers during the call.
              </p>
            </div>

            {/* Prepare to speak to every skill */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Prepare to Speak to Every Skill You've Listed</h3>
              <p className="text-muted-foreground text-sm mb-3">
                Recruiters notice when a resume and a verbal conversation don't match. Go through every skill on your resume. Make sure you can speak to each one conversationally. Not technically. Not in depth. But be ready to answer "tell me about a time you used X" for anything you've claimed.
              </p>
              <p className="text-muted-foreground text-sm">
                If you listed a tool or technology you haven't used recently, be honest about your current level. Or remove it.
              </p>
            </div>

            {/* Build your cheat sheet */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Build Your Cheat Sheet</h3>
              <p className="text-muted-foreground text-sm mb-3">
                One of the biggest advantages of a phone or video screen is that you can keep notes visible. Use that.
              </p>
              <p className="text-muted-foreground text-sm mb-3">Your cheat sheet should include:</p>
              <ul className="space-y-2 mb-3">
                {[
                  "Three specific things you know about the company",
                  "Your top three reasons you want this role",
                  "Job requirements matched to your experience",
                  'Bullet points for "Tell me about yourself" (not a full script)',
                  "Two or three prepared stories with results",
                  "Five questions to ask me",
                  "Your target salary range",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm italic">Keep it to one page. Keep it next to you on a phone call. Keep it open on another browser window for video. Don't read from it word for word.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Section 3: Know Your Story - full width alternate bg */}
      <section id="story" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Know Your Story
              </h2>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The Present-Past-Future Formula</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            "Tell me about yourself" is the most important question on the call. It sets the tone for everything that follows. The best candidates own this answer. The worst ones treat it like a surprise.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Use Present-Past-Future. It takes 60 to 90 seconds and gives me exactly what I need.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Keep this to two minutes max and let the interviewer ask follow-up questions. I see many candidates, even senior ones, ramble for five to ten minutes on their self-introduction. The longer you talk, the more control you lose over the conversation.
          </p>

          {/* Present-Past-Future visual */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">Present → Past → Future</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "PRESENT", pct: "30-40%", desc: "Current role + one big result with a number." },
                { label: "PAST", pct: "30-40%", desc: "How you got here. Only what's relevant to this role." },
                { label: "FUTURE", pct: "20-30%", desc: "Why THIS role is the natural next step." },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{item.label}</p>
                  <p className="text-cream font-heading text-xl font-bold mb-2">{item.pct}</p>
                  <p className="text-cream/70 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-cream/50 text-xs text-center mt-4 italic">Total: 60-90 seconds. Then stop. Let the interviewer ask follow-ups.</p>
          </div>

          <div className="space-y-3 mb-4">
            <p className="text-muted-foreground text-sm"><strong className="text-foreground">Present (30-40% of your answer).</strong> Start with your current role and one strong, quantified result.</p>
            <p className="text-muted-foreground text-sm"><strong className="text-foreground">Past (30-40%).</strong> Cover the relevant background that shows how you got here. Keep it short and tied to this role.</p>
            <p className="text-muted-foreground text-sm"><strong className="text-foreground">Future (20-30%).</strong> Connect your story to this specific opportunity.</p>
            <p className="text-muted-foreground text-sm">Leave out personal details, your full career history, and negative reasons for leaving past jobs. The goal is to make this role feel like the natural next step.</p>
          </div>

          {/* Examples */}
          <div className="space-y-3 mb-10">
            <Collapsible title="📝 Word-for-word example: Marketing Manager">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "I'm currently a marketing manager at TechCorp where I lead a team of five. Over the past two years, I grew organic traffic by 150% and cut cost-per-lead by 35%. Before that, I spent three years at a digital agency working across content strategy and paid media for B2B clients. I'm looking to move into a company-side role where I own the full funnel, not one channel at a time. When I read about your expansion into the enterprise segment, it stood out. That's exactly the type of growth challenge I want to be part of."
              </p>
            </Collapsible>
            <Collapsible title="📝 Word-for-word example: Entry Level">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "I recently graduated from [University] with a degree in Computer Science. During my final year, I led a four-person team that built a mobile app for a local nonprofit. We shipped on time, got 200 active users in the first month, and reduced their admin workload by 40%. I also completed two internships, one in backend development and one in product. I'm looking for a full-time role where I keep building on that foundation. Your engineering culture and the focus on mentorship for junior devs stood out when I was researching the team."
              </p>
            </Collapsible>
            <Collapsible title="📝 Word-for-word example: Career Changer">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "I've spent the past six years in teaching, most recently as a high school department head managing a team of eight. I ran professional development, designed curriculum, and tracked student performance data. Over the past year I've been moving into instructional design, completing two certifications and building three online courses as freelance projects. I'm ready to take that full time. Your focus on corporate learning programs is exactly where I want to apply these skills."
              </p>
            </Collapsible>
          </div>

          {/* Map your experience */}
          <h3 className="font-heading text-xl text-foreground mb-4">Map Your Experience to the Role</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Don't make me connect your background to this job. Do it for me.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Use specific examples with numbers. "Improved customer satisfaction" tells me nothing. "Increased satisfaction scores from 72% to 91% in six months by building a new feedback process" tells me you know how to move a number.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            For gaps between your experience and the requirements, address them directly. Don't hope I won't notice.
          </p>
          <div className="grid md:grid-cols-2 gap-3 mb-10">
            <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
              <p className="text-destructive text-xs uppercase font-medium mb-1">✕ Weak</p>
              <p className="text-foreground text-sm italic">"I haven't really used Tableau but I'm a fast learner."</p>
            </div>
            <div className="bg-background border border-gold/30 rounded-lg p-3">
              <p className="text-gold text-xs uppercase font-medium mb-1">✓ Strong</p>
              <p className="text-foreground text-sm italic">"I haven't used Tableau specifically, but I've built dashboards in Power BI and Looker for the past three years. I completed Tableau's online certification two weeks ago. The analytical thinking is the same. The tool is syntax."</p>
            </div>
          </div>

          {/* Top 3 Reasons */}
          <h3 className="font-heading text-xl text-foreground mb-4">Your Top 3 Reasons You Want This Job</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            When I ask why you want this role, I'm testing two things. Whether you've done your homework. And whether your reasons suggest you'll stay and succeed here.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Before every screening call, prepare three specific reasons using this structure:
          </p>
          <div className="grid sm:grid-cols-3 gap-4 mb-6">
            {[
              { num: "1", label: "Why this company", desc: "Reference something real. A mission you connect with, a recent move they made, something specific about their product or market position." },
              { num: "2", label: "Why this role", desc: "Connect the day-to-day work to what drives you professionally." },
              { num: "3", label: "Why now", desc: "Explain why this is the right next step for where you're heading." },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-4 text-center">
                <span className="inline-flex w-8 h-8 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-sm mb-2">{item.num}</span>
                <h4 className="font-semibold text-foreground text-sm mb-1">{item.label}</h4>
                <p className="text-muted-foreground text-xs">{item.desc}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            Check each reason against this test: is it specific to this company and role, or does it work for any job? If you could paste it into another application unchanged, it's not strong enough.
          </p>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4 mb-6">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ What kills your answer</p>
            <ul className="space-y-1 text-foreground text-sm">
              <li>"I need a new challenge." <span className="text-muted-foreground text-xs">(vague, applies to any job)</span></li>
              <li>"The commute works for me." <span className="text-muted-foreground text-xs">(not about the role)</span></li>
              <li>"I've heard the benefits are good." <span className="text-muted-foreground text-xs">(wrong priority at this stage)</span></li>
              <li>"I've always admired your brand." <span className="text-muted-foreground text-xs">(empty, no substance)</span></li>
            </ul>
          </div>

          <div className="space-y-3 mb-10">
            <Collapsible title="📝 Example: Software Engineer at a Fintech Startup">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "Three reasons. First, the company. You're building infrastructure for small business payments in markets where most people still use cash. That's a real problem and one I care about. Second, the role. I've spent three years maintaining legacy systems and I want to build something new. This role is greenfield work, which is rare. Third, the timing. I've finished leading my first end-to-end migration project. I feel ready to step into a role with more ownership. This feels like the right next step."
              </p>
            </Collapsible>
            <Collapsible title="📝 Example: Sales Manager at a SaaS Company">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "A few things stood out. I've been following your growth for about a year. You went from 50 to 200 customers in 18 months without raising another round. That tells me the product has real market fit. Second, the role is exactly where I want to focus. I've been a rep for four years and I've been informally coaching two junior reps on my team. I want to do that full time. Third, your sales methodology. I read your VP of Sales' interview on [podcast]. The way you talk about discovery aligns with how I sell. I don't want to spend the first six months unlearning habits."
              </p>
            </Collapsible>
            <Collapsible title="📝 Example: Operations Coordinator, Entry Level">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "I want to work at a company where the operations matter to the product. After researching you for a week, it's clear logistics is core to what you do, not an afterthought. That matters to me. On the role side, I'm most energized when I'm fixing broken processes. In my internship I rebuilt a manual reporting workflow and saved the team four hours a week. I want to do that at scale. And personally, I'm at a point in my career where I want to learn from experienced operators. The fact that your ops team is led by someone who scaled three companies is a big draw."
              </p>
            </Collapsible>
          </div>

          {/* Broader career motivations */}
          <h3 className="font-heading text-xl text-foreground mb-4">The Broader Career Motivations Approach</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            There's another way to answer the "why this job" question. Instead of going company-role-timing, you frame your answer around what you want from your career right now.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I hear three motivations more than any others:
          </p>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold mb-2">Impact</h4>
              <p className="text-muted-foreground text-sm mb-3">
                You want a role where your work matters more. Where you see the result of what you build, ship, or fix. Many candidates come from large companies where their contribution gets absorbed into a machine. They want to feel the difference they make.
              </p>
              <p className="text-foreground text-sm italic">
                "I've spent four years at [Company]. The work is solid but I'm five layers from the customer. I want a role where I see the impact of what I build. Your team size and the way you ship directly to end users is exactly that."
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold mb-2">Culture</h4>
              <p className="text-muted-foreground text-sm mb-3">
                You want a different environment. A different team dynamic. A different way of working. This is valid. The key is being specific about what you want, not vague about what you're leaving.
              </p>
              <p className="text-foreground text-sm italic">
                "The biggest thing I'm looking for is a team that moves fast and gives people room to own their work. I've been in a heavily matrixed environment for three years. I do my best work when I have clear ownership and a short feedback loop. From what I've read about how your engineering team operates, that's how you work."
              </p>
            </div>

            <div className="bg-background border border-border rounded-xl p-5">
              <h4 className="text-gold font-semibold mb-2">Compensation</h4>
              <p className="text-muted-foreground text-sm mb-3">
                You want to be paid what you're worth. This one is tricky to say out loud during a screen, but there's a way to frame it. Tie it to scope and growth rather than money alone.
              </p>
              <p className="text-foreground text-sm italic">
                "I'm looking for a step up in both responsibility and compensation. I've outgrown my current role and the growth path is limited. This position is a level up in scope and I'm ready for it."
              </p>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-4">
            You don't need to pick one. The strongest answers combine two or three. "I want more impact, I want to work in a faster-moving environment, and I want a role that matches the level I'm performing at." That's a complete, honest answer.
          </p>
        </div>
      </section>

      {/* Section 4: Answer Frameworks */}
      <section id="frameworks" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Answer Frameworks
              </h2>
              <p className="text-muted-foreground text-lg">
                You need a structure for behavioral questions. Without one, answers get long, unfocused, and hard to follow.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            There are loads of frameworks out there on how to reply to interview questions. As long as you use one, you will be fine. The two I've picked here are STAR and CAR.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* STAR */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">STAR Method</h3>
              <p className="text-muted-foreground text-xs mb-4">90-120 seconds total</p>
              <div className="space-y-3">
                {[
                  { letter: "S", label: "Situation", desc: 'Set the scene. 1-2 sentences. Brief context only.' },
                  { letter: "T", label: "Task", desc: "What were YOU responsible for? Your specific role." },
                  { letter: "A", label: "Action", desc: 'What did you DO? This is the main part. Spend 60% of time here. Be specific. Use "I" not "we."', highlight: true },
                  { letter: "R", label: "Result", desc: "What happened? USE NUMBERS. Revenue. Percentage. Time." },
                ].map((item) => (
                  <div key={item.letter} className={`flex items-start gap-3 p-3 rounded-lg ${item.highlight ? "bg-gold/10 border border-gold/20" : "bg-background"}`}>
                    <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-sm flex-shrink-0">{item.letter}</span>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="text-muted-foreground text-xs mt-3 italic">End every answer: "That's relevant here because..."</p>
            </div>

            {/* CAR */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">CAR Method</h3>
              <p className="text-muted-foreground text-xs mb-4">60-90 seconds. Good for phone screens where time moves fast.</p>
              <div className="space-y-3">
                {[
                  { letter: "C", label: "Challenge", desc: "What was the problem or situation?" },
                  { letter: "A", label: "Action", desc: "What did you do?" },
                  { letter: "R", label: "Result", desc: "What happened?" },
                ].map((item) => (
                  <div key={item.letter} className="flex items-start gap-3 p-3 rounded-lg bg-background">
                    <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center font-bold text-gold text-sm flex-shrink-0">{item.letter}</span>
                    <div>
                      <p className="text-foreground font-semibold text-sm">{item.label}</p>
                      <p className="text-muted-foreground text-xs">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="space-y-3 mb-8">
            <Collapsible title="📝 STAR example: Leading a team through a difficult change">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "My company decided to migrate our entire data infrastructure to a new platform with a 90-day deadline. [Situation] I was the project lead responsible for coordinating across four teams and keeping daily operations running during the transition. [Task] I set up a weekly cross-functional standup, built a shared tracking doc, and personally managed the three most complex data pipelines. When we hit a major blocker in week six, I escalated quickly, got engineering leadership involved, and we recovered the timeline within a week. [Action] We hit the deadline. Zero data loss. The migration came in 15% under budget and the new platform cut our reporting time by half. [Result]"
              </p>
            </Collapsible>
            <Collapsible title="📝 CAR example: Improving a process">
              <p className="text-foreground text-sm leading-relaxed mt-3 italic">
                "Our sales team was spending three hours a week manually pulling pipeline data from three different tools. [Challenge] I built a single dashboard that pulled from all three sources automatically and refreshed daily. [Action] The team got those three hours back every week. The VP of Sales started using it in weekly reviews. It's now used across two other departments. [Result]"
              </p>
            </Collapsible>
          </div>

          {/* Prepare your stories */}
          <h3 className="font-heading text-lg text-foreground mb-4">Prepare 5-7 Stories Covering:</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-4">
            {[
              "Overcoming a challenge",
              "Leading or influencing others",
              "Handling conflict",
              "Learning something new quickly",
              "Making a tough decision",
              "Improving a process",
              "Delivering results under pressure",
            ].map((story, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold">{i + 1}</span>
                <p className="text-foreground text-sm">{story}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground text-sm">
            Practice each story out loud. Stories that only exist in your head come out disorganized. Aim to tell each one in under two minutes. When you finish, bridge it back to the role: "That experience is directly relevant here because [specific connection]."
          </p>
        </div>
      </section>

      {/* Section 5: Tough Questions */}
      <section id="tough" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Handle the Tough Questions
              </h2>
            </div>
          </div>

          <div className="space-y-4">
            {/* Why leaving */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"Why are you leaving your current job?"</h3>
              <p className="text-muted-foreground text-sm mb-3">Focus on what you're moving toward. Not what you're running from. Keep it to one or two sentences. Then pivot to why this role interests you.</p>
              <p className="text-muted-foreground text-sm mb-4">Never badmouth a past employer. Even if the situation was genuinely bad. It signals poor judgment and makes me wonder what you'll say about us someday.</p>
              <div className="space-y-3">
                <Collapsible title="Currently employed">
                  <p className="text-foreground text-sm mt-3 italic">"I've learned a lot in my current role and I'm proud of what the team has built. I'm ready for a bigger scope. This role stood out because [specific thing]. That's the direction I want to go."</p>
                </Collapsible>
                <Collapsible title="Laid off">
                  <p className="text-foreground text-sm mt-3 italic">"The company went through a restructuring and my position was eliminated. My performance reviews were consistently strong, most recently rated in the top quartile. Since then I've been [specific activity: consulting, upskilling, freelancing]. I'm ready to bring that to a new team."</p>
                </Collapsible>
                <Collapsible title="Fired">
                  <p className="text-foreground text-sm mt-3 italic">"The company and I had different expectations for the role. I've reflected on that experience and learned [specific lesson]. I'm looking for an environment where [relevant fit point] so I set myself up better from day one."</p>
                </Collapsible>
                <Collapsible title="Leaving a toxic environment">
                  <p className="text-foreground text-sm mt-3 italic">"The team went through a lot of leadership changes and the direction kept shifting. I do my best work when there's stability and clear priorities. I'm looking for a company where [specific element this company offers]. From my research, it seems like that's what you've built here."</p>
                </Collapsible>
              </div>
            </div>

            {/* Biggest weakness */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"What is your biggest weakness?"</h3>
              <p className="text-muted-foreground text-sm mb-3">"I'm a perfectionist" is not an answer. Neither is "I work too hard." I've heard both thousands of times. They tell me nothing.</p>
              <p className="text-muted-foreground text-sm mb-3">Name a real weakness. Show self-awareness. Describe what you're doing about it. Show evidence it's working.</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mb-4">
                <p className="text-foreground text-sm font-medium">Formula: <span className="text-gold">Behavior → Impact → Fix → Result</span></p>
              </div>
              <div className="space-y-3">
                <Collapsible title="📝 Example: Delegation">
                  <p className="text-foreground text-sm mt-3 italic">"I've had a tendency to hold onto tasks I know I do well rather than delegate them. In my last role, this meant I became a bottleneck during our busiest quarter. I recognized it wasn't fair to the team or the timeline. I started a weekly delegation review where I assign at least two significant tasks to others and check in at set points rather than hovering. Our last two product launches came in on time. My manager flagged my improvement on this specifically in my last review."</p>
                </Collapsible>
                <Collapsible title="📝 Example: Public speaking">
                  <p className="text-foreground text-sm mt-3 italic">"Presenting to large groups used to make me anxious to the point where it hurt my delivery. I avoided those situations more than I should have. About 18 months ago I joined a Toastmasters group and committed to presenting at least once a month. I've now led two all-hands meetings and a client pitch with 40 people in the room. It's still not my favorite thing, but it no longer holds me back."</p>
                </Collapsible>
                <Collapsible title="📝 Example: Saying no">
                  <p className="text-foreground text-sm mt-3 italic">"I used to say yes to every request because I didn't want to let anyone down. The result was I over-committed and delivered average work on too many things instead of great work on fewer. I started blocking time for deep work and being upfront when a new request would affect existing priorities. My manager noticed the shift. My last two projects got the highest feedback scores I've had."</p>
                </Collapsible>
              </div>
              <p className="text-muted-foreground text-sm mt-3">
                The weakness should be real but not disqualifying. Don't say you struggle to meet deadlines if this role is deadline-heavy. Don't say you're not a people person if this is a customer-facing position.
              </p>
            </div>

            {/* Failure */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"Tell me about a time you failed."</h3>
              <p className="text-muted-foreground text-sm mb-3">This question tests self-awareness and growth. The candidates who stumble either claim they've never failed, or they describe a failure without showing what they learned.</p>
              <p className="text-foreground text-sm italic">"In my second year as a team lead, I pushed to launch a feature before we had enough user research. I was confident in my instincts and I wanted to hit our quarterly target. We shipped it, adoption was low, and we spent the next two months reworking it based on feedback we should have gathered upfront. The delay cost us more time than the research would have. Since then, I build a minimum research checkpoint into every feature plan before anything goes into development. We've shipped four major features since then. All four hit adoption targets within the first month."</p>
            </div>

            {/* Five years */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"Where do you see yourself in five years?"</h3>
              <p className="text-muted-foreground text-sm mb-3">I'm not looking for a detailed career plan. I'm looking for ambition that makes sense for this role and signals you'll stay long enough to make an impact.</p>
              <p className="text-muted-foreground text-sm mb-4">If the role has a natural growth path, reference it. Many positions are designed with the expectation that the person will grow into a higher position over time. If the job description mentions "opportunity to grow into [senior title]" or the recruiter mentions team growth plans, use that information in your answer. It shows you've read between the lines and you see a future here.</p>
              <div className="space-y-3">
                <Collapsible title="📝 Standard example">
                  <p className="text-foreground text-sm mt-3 italic">"In five years I want to be leading a team and owning a larger scope of work. This role feels like the right step in that direction. I want to get deep into [specific area of the role], build a track record here, and grow from there. I'm not looking to jump around. I want to find a place where I earn more responsibility over time."</p>
                </Collapsible>
                <Collapsible title="📝 Example with growth path">
                  <p className="text-foreground text-sm mt-3 italic">"I noticed the job description mentions this role growing into a senior position as the team scales. That's exactly what I want. In five years I want to be managing a team and owning a full [function]. I'd rather earn that promotion by proving myself here than job hop to get a title somewhere else."</p>
                </Collapsible>
              </div>
            </div>

            {/* Other offers */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"Do you have other offers or interviews in progress?"</h3>
              <p className="text-muted-foreground text-sm mb-3">Be honest. Having other options does not hurt you. It helps.</p>
              <p className="text-muted-foreground text-sm mb-3">If you're in late stages with other companies and the recruiter thinks you're a strong candidate, this information speeds the process up. Recruiters don't want to lose good candidates to slow timelines. I've personally escalated candidates through the pipeline because they told me they had a final round elsewhere next week.</p>
              <p className="text-muted-foreground text-sm mb-4">Remember: having competing offers is the strongest leverage when negotiating salary at the offer stage. Running two or three interview processes at the same time is not disloyal. It's smart.</p>
              <p className="text-foreground text-sm italic mb-2">"I'm in process with two other companies. I'm being selective. This role is one I'm genuinely excited about, which is why I wanted to move forward with the conversation."</p>
              <p className="text-foreground text-sm italic">If you don't have other offers: "I'm early in my search and being thoughtful about where I apply. This role is one I've specifically targeted."</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Salary */}
      <section id="salary" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Salary
              </h2>
              <p className="text-muted-foreground text-lg">
                The salary question is one of the most misunderstood moments in the screening process.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">
            I'm not trying to trap you. I'm trying to avoid wasting everyone's time. If we're $40,000 apart on expectations, a three-round interview process helps no one.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            That said, you have more leverage here than most candidates realize. The first number in any negotiation tends to anchor the whole conversation. The goal is to get the company to show their range before you show yours.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            For the full salary strategy, including how to handle the offer stage and negotiate total compensation, read the <Link to="/salary-starter-kit" className="text-gold hover:underline">salary guide</Link>.
          </p>

          <h3 className="font-heading text-lg text-foreground mb-4">Don't Name the First Number</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Once you anchor low, you rarely recover. Once you anchor high without a basis, you risk screening yourself out early. Deflect first. Flip it second. Only give a number if you're pushed into a corner.
          </p>

          {/* Deflection ladder */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-6 text-center font-semibold">The Salary Deflection Ladder</p>
            <p className="text-cream/50 text-xs text-center mb-6 italic">Only climb if pushed</p>
            <div className="space-y-4">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">Level 1</span>
                  <span className="text-cream font-semibold text-sm">Deflect</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">"I'm looking for a role where I grow in both responsibility and compensation. I'd love to understand the full scope before settling on a number."</p>
                <p className="text-cream/50 text-xs">Start here. Always.</p>
                <p className="text-cream/60 text-xs mt-2">For current salary questions: "I'd prefer to keep the focus on what I bring to this role rather than what I earn now." In many states and localities, it's now illegal for employers to ask your current salary. You don't need to share it. Even where it's legal, volunteering it only limits you.</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">Level 2</span>
                  <span className="text-cream font-semibold text-sm">Flip it</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">"I'd be happy to discuss what the company has budgeted for this role. If we're in the same range, I'm confident we'll find something that works for both sides."</p>
                <p className="text-cream/50 text-xs">The phrase "in the same range" is deliberate. It's non-committal. You're not agreeing to accept a number in that range. You're signaling openness while keeping your options open.</p>
                <p className="text-cream/60 text-xs mt-2">In my experience, 80% of the time the recruiter will share a range once you ask this way. If the recruiter shares a range, don't react right away. Say "that's helpful, thank you" and move on. You'll negotiate the specifics at the offer stage.</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">Level 3</span>
                  <span className="text-cream font-semibold text-sm">Anchor high</span>
                </div>
                <p className="text-cream/80 text-sm italic mb-2">"Based on my experience and current market rates for this type of role in [location], I'm targeting $140,000-$155,000. That said, I'm open depending on the full package including equity and bonus."</p>
                <p className="text-cream/50 text-xs">Only if cornered. Anchor high. Frame as total comp (not base). Leave room for the full package.</p>
                <p className="text-cream/60 text-xs mt-2">Before any screening call, research comp ranges on Levels.fyi, Glassdoor, Payscale, and LinkedIn Salary. Know the range for your role, level, and location. When you give a number backed by data, it carries more weight than a number pulled from thin air.</p>
              </div>
            </div>
          </div>

          {/* What never to say */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <p className="text-destructive text-xs uppercase font-medium mb-3">✕ What never to say about money</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li><strong>Never volunteer your current salary.</strong> Sharing it voluntarily only limits you.</li>
              <li><strong>Never say "I'll take whatever is fair."</strong> That signals you haven't researched the market.</li>
              <li><strong>Never say "I guess" or "I don't know" when comp comes up.</strong> Uncertainty about your own value signals you haven't done the work.</li>
              <li><strong>Never make it emotional.</strong> "I need X because my rent is..." is not a negotiation strategy. Use market data, not personal financial needs.</li>
              <li><strong>Never accept an offer on the spot</strong> without sleeping on it. Recruiters expect you to negotiate. Skipping it leaves money on the table every time.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Setup & Etiquette */}
      <section id="setup" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-4">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                Setup & Etiquette
              </h2>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-8">
            The call hasn't started and you're already being evaluated. Here's how not to lose points before you open your mouth.
          </p>

          <div className="grid sm:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Phone</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Stand up during the call. Your voice projects more energy.</li>
                <li>Use a headset or earbuds. Find a quiet space.</li>
                <li>Turn off all notifications before the call.</li>
                <li>Smile while you talk. Warmth comes through in your voice.</li>
                <li>Answer with your full name in an upbeat tone.</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Video</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Camera at eye level. Stack laptop on books if needed.</li>
                <li>Head and shoulders fill most of the screen.</li>
                <li>Face a window or light source. Avoid overhead lighting.</li>
                <li>Plain, uncluttered background.</li>
                <li>Test your full setup 30 minutes before. Not five.</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">In-Person</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Arrive 10-15 minutes early. Not more.</li>
                <li>Dress one level more formally than you think is needed.</li>
                <li>Bring printed resumes, a notepad, a pen, and questions.</li>
                <li>Firm handshake with eye contact. Full name.</li>
                <li>Phone away before you walk in. Not face down on table. Away.</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4">
            <h4 className="text-gold font-semibold text-sm mb-2">For All Formats</h4>
            <p className="text-foreground text-sm">
              Screening calls run 15-30 minutes. Be aware of the time. Give answers that fit the pace. Before we hang up, always ask about next steps: "What does the rest of the process look like and what's your timeline?" This signals interest and tells you when to follow up.
            </p>
          </div>
        </div>
      </section>

      {/* Section 8: Questions to Ask */}
      <section id="questions" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Questions to Ask the Recruiter
              </h2>
              <p className="text-muted-foreground text-lg">
                Most candidates treat this as an afterthought. It isn't.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            The questions you ask tell me as much about you as your answers do. Candidates who ask sharp, specific questions stand out. Candidates who ask nothing, or who ask about salary and benefits at this stage, leave a poor impression. Ask one or two questions. Not five. You have limited time and you want quality over quantity.
          </p>

          <div className="grid md:grid-cols-2 gap-4 mb-4">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">About the Role</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>"What does success look like in the first 90 days?"</li>
                <li>"What are the biggest challenges the person stepping into this role will face?"</li>
                <li>"Why is this position open? Is it a backfill or a new headcount?"</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">About the Team & Manager</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>"How would you describe the team's working style?"</li>
                <li>"What's the hiring manager's approach to developing the people on their team?"</li>
              </ul>
            </div>
          </div>
          <div className="bg-card border border-border rounded-xl p-5 mb-6">
            <h4 className="text-gold text-xs uppercase font-semibold mb-3">About the Process</h4>
            <p className="text-foreground text-sm">"What are the next steps and what's your timeline for making a decision?"</p>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ Questions to avoid at this stage</p>
            <p className="text-foreground text-sm">Salary, benefits, vacation, remote work flexibility, and promotion timelines. These are important questions. But they belong at the offer stage. Asking them during a screening call signals the wrong priorities.</p>
          </div>
        </div>
      </section>

      {/* Section 9: Red Flags */}
      <section id="redflags" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Red Flags to Watch For
              </h2>
              <p className="text-muted-foreground text-lg">
                The screening call goes two ways. I'm evaluating you. You should be evaluating us.
              </p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Most candidates are so focused on performing well that they forget to assess whether this is a place they want to work. Here are signals worth paying attention to.
          </p>

          <div className="space-y-3 mb-4">
            {[
              { flag: "The recruiter can't explain the role clearly", action: "If I'm vague about what you'd do day to day, the role isn't well defined. That creates problems once you're in the seat. Ask: 'How does success get measured in this role at the 90-day mark?'" },
              { flag: "The role has been open a long time or keeps getting refilled", action: "Ask directly: 'Is this a new position or a backfill?' If it's a backfill, ask what happened with the previous person. High turnover in a specific role usually signals something about the team, the manager, or the expectations." },
              { flag: "Compensation is vague or evasive", action: "A company that posts a role without a salary range and refuses to share one during the screen. That's worth noting." },
              { flag: "The process is disorganized", action: "Rescheduled calls without explanation. Slow follow-up. Conflicting information about the role. How a company runs its hiring process usually reflects how it runs everything else." },
              { flag: "Pressure to move fast or decide quickly", action: "Urgency is sometimes real. But if you're being pushed to commit before you've had time to evaluate properly, ask why. 'What's driving the timeline?' is a fair question." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-background border border-border rounded-xl p-4">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-medium text-sm">{item.flag}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.action}</p>
                </div>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground text-sm italic">
            None of these are automatic reasons to walk away. But walk into any offer with clear eyes.
          </p>
        </div>
      </section>

      {/* Section 10: Common Mistakes */}
      <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Common Mistakes That Eliminate Most Candidates
              </h2>
              <p className="text-muted-foreground text-lg">I see the same patterns constantly.</p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { mistake: "No preparation", desc: "I notice within the first two minutes whether someone has spent any time on this call. 50% of candidates haven't visited the company website. That's one of the most common reasons I screen people out." },
              { mistake: "Low energy", desc: "I need to believe you want this job. If you sound like this role is one of thirty you've applied to this week, I'm going to assume it is. Energy signals interest. Flat tone signals indifference." },
              { mistake: "Claiming skills you can't back up", desc: "If your resume says 'expert' and the conversation reveals 'I've used it a bit,' that's a trust problem. Be honest about your level." },
              { mistake: "Rambling", desc: "Answer the question asked. Concisely. With a real example. Then stop. Candidates who lose control of their answers make me nervous." },
              { mistake: "Badmouthing past employers", desc: "Even if the situation was genuinely bad. This is not the time and place. It signals poor judgment and makes me wonder what you'll say about us." },
              { mistake: "Asking about benefits too early", desc: "Asking about vacation, remote flexibility, or bonuses before we've confirmed mutual interest signals the wrong priorities." },
              { mistake: "Generic motivation", desc: "'I've always admired your brand' tells me nothing. Be specific. If you can't tell me something specific about why you want to work here, I'll assume you can't tell the next person either." },
              { mistake: "Poor logistics", desc: "Late to a scheduled call without acknowledgment. Background noise on a phone screen. Camera off on video without explanation. Small things that suggest bigger habits." },
              { mistake: "Not asking questions", desc: "'No, I'm good' suggests you haven't thought seriously about whether this role is right for you. I want candidates who are evaluating me too." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-destructive/30 transition-colors">
                <XCircle className="w-5 h-5 text-destructive flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-foreground font-semibold text-sm">{item.mistake}</p>
                  <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 11: After the Call */}
      <section id="after" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                After the Call
              </h2>
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">What Happens on My Side</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Here's what most candidates don't see. After we hang up, I fill out the scorecard. Pros, cons, and my decision. I write internal notes summarizing the call. Then I submit everything to the hiring manager for review.
          </p>

          {/* Timeline visual */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">What Happens After You Hang Up</p>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-cream/60 text-xs uppercase mb-3">You</p>
                <div className="space-y-2">
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Send follow-up email (2-4 hrs)</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Wait. Keep applying.</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Get the call (or silence) — 2-7 days</p>
                  </div>
                </div>
              </div>
              <div>
                <p className="text-cream/60 text-xs uppercase mb-3">Recruiter</p>
                <div className="space-y-2">
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Fill out scorecard (pros, cons, decision)</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Write internal notes and summary</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">Submit to HM → HM decides: advance or pass</p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-cream/40 text-xs text-center mt-4 font-sans italic">
              Timeline varies. It depends on HM availability, other candidates in pipeline, and internal approvals.
            </p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            The hiring manager reviews my notes and decides whether to advance you to the next round. This takes anywhere from two days to a week. Sometimes longer. You have zero control over this part. What you do control is the follow-up.
          </p>

          {/* Follow-up email */}
          <h3 className="font-heading text-lg text-foreground mb-4">Send a Follow-Up Within 24 Hours</h3>
          <p className="text-muted-foreground text-sm mb-4">
            Send a short email within two to four hours of the call. Keep it to three or four sentences. Thank me for the time. Reference something specific from the conversation. Restate your interest. Confirm you're available for next steps.
          </p>
          <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
            <p className="text-gold text-xs uppercase font-medium mb-2">Follow-up email template</p>
            <p className="text-foreground text-sm italic">
              "Hi [Name], thank you for the conversation today. I'm excited about the [role] opportunity, particularly the [specific thing we discussed]. I look forward to hearing about next steps. Let me know if there's anything else you need from me."
            </p>
          </div>

          <p className="text-muted-foreground text-sm mb-4">If you gave a weak answer during the call, the follow-up email is your chance to address it. Keep it brief.</p>

          <Collapsible title="📝 Correcting a weak answer in your follow-up">
            <p className="text-foreground text-sm mt-3 italic">
              "One thing I want to revisit from our conversation. When you asked about my experience with [X], I undersold it. I've [specific clarification]. I wanted to make sure you had the full picture."
            </p>
            <p className="text-muted-foreground text-xs mt-2">This level of self-awareness is rare. In my experience, it usually strengthens the candidate's position rather than hurting it.</p>
          </Collapsible>

          {/* A note on thank-you emails */}
          <div className="bg-card border border-border rounded-xl p-5 mt-6 mb-6">
            <h4 className="text-foreground font-semibold mb-2">A note on thank-you emails</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-2">
              I'll be honest. I personally think thank-you emails are largely pointless. I get a lot of emails from candidates and a thank-you note has never changed my decision on whether to advance someone. The scorecard is filled out based on the call, not on what you send afterward.
            </p>
            <p className="text-muted-foreground text-sm leading-relaxed">
              That said, some recruiters and hiring managers do appreciate them. There's no harm in sending one. If you're going to send it, make it specific and short. If you're not going to send one, don't lose sleep over it. The call itself is what matters.
            </p>
          </div>

          {/* If you don't hear back */}
          <h3 className="font-heading text-lg text-foreground mb-4">If You Don't Hear Back</h3>
          <p className="text-muted-foreground text-sm mb-4">
            If I gave you a timeline and that date passes, wait two days and send a short check-in.
          </p>
          <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
            <p className="text-gold text-xs uppercase font-medium mb-2">Follow-up check-in template</p>
            <p className="text-foreground text-sm italic">
              "Hi [Name], I wanted to follow up on our conversation from [date]. I'm still interested in the [role] and wanted to check in on timing. Happy to answer any additional questions if helpful."
            </p>
          </div>
          <p className="text-muted-foreground text-sm mb-4">
            If no timeline was given, follow up one week after your thank-you email. A second follow-up is reasonable two to three weeks later. After two unanswered messages, move on.
          </p>
          <p className="text-muted-foreground text-sm mb-6">
            Silence doesn't always mean rejection. Hiring timelines get paused for reasons that have nothing to do with you. Priorities shift. Internal approvals slow down. Feedback from other interviewers takes time.
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 text-center">
            <p className="text-foreground font-medium text-sm">
              <span className="text-gold font-semibold">Do not stop applying</span> while you wait. Even if the screen went well. Even if I said I'd be in touch soon. Keep moving until you have a signed offer in your hand.
            </p>
          </div>
        </div>
      </section>

      {/* Section 12: By Career Level */}
      <section id="levels" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                By Career Level
              </h2>
              <p className="text-muted-foreground text-lg">
                The screening call covers the same ground at every level. But what I look for shifts based on where you are in your career.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Entry Level */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-2">Entry Level</h3>
              <p className="text-muted-foreground text-sm mb-3">
                At this stage, I'm hiring potential, not a track record. I look at willingness to learn, enthusiasm for the company and role, communication skills, and relevant projects or internships.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                The biggest mistake new graduates make is assuming they don't have examples. You do. Academic projects, internships, volunteer work, and student leadership all count. Build STAR stories from those experiences. Practice them out loud before the call.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                What stands out at this level: strong preparation, clear energy, and the ability to connect academic or internship experience to the role requirements. Being the most prepared person I talk to that week is achievable at any experience level.
              </p>
              <Collapsible title="📝 Present-Past-Future example (Data Analyst)">
                <p className="text-foreground text-sm mt-3 italic">
                  "I graduated from [University] last month with a degree in Statistics. For my capstone project, I built a predictive model for a local retail chain that forecasted seasonal demand. The model was accurate within 8% and the company is still using it. I also interned at [Company] last summer where I built weekly dashboards for the sales team in SQL and Tableau. I'm looking for a full-time analyst role where I apply both the statistical foundation and the hands-on tools I've been building. Your team's focus on data-driven product decisions is what drew me to this role."
                </p>
              </Collapsible>
            </div>

            {/* Mid-Level */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-2">Mid-Level (3-10 years)</h3>
              <p className="text-muted-foreground text-sm mb-3">
                At three to ten years of experience, I expect a proven track record with quantifiable results. I'm evaluating career progression, specific skill match, and your ability to work without close supervision.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Tell your career story as a clear arc. Show how each role built on the last and led naturally to this one. Don't list what you did. Explain why each move made sense.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                This is also the level where competing offers become real negotiating leverage. Running two or three interview processes at the same time is not disloyal. It's smart. The best outcome for you is multiple offers. That changes the dynamic at the offer stage.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                What stands out at mid-level: quantified results, clear ownership of outcomes, and specific reasons for wanting this role at this company.
              </p>
              <Collapsible title="📝 Present-Past-Future example (Product Manager)">
                <p className="text-foreground text-sm mt-3 italic">
                  "I'm a product manager at [Company] leading the payments team. Over the past two years I've shipped three major features that increased checkout conversion by 22%. Before that, I spent three years at [Company] as an associate PM where I moved from the mobile team to platform. Each move was intentional. I wanted to understand the full product stack before leading a team. Now I'm ready for a senior PM role where I own a product line end to end. Your expansion into B2B payments is the exact space I want to work in, and the team size here means I'd have real ownership from day one."
                </p>
              </Collapsible>
            </div>

            {/* Executive */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-2">Executive</h3>
              <p className="text-muted-foreground text-sm mb-3">
                At the executive level, the conversation is different. I'm not checking whether you do the work. I'm assessing whether you're the right leader for this organization at this specific moment.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Executive searches move slower. More stakeholders are involved. Expect three to five rounds over several weeks. The screening call at this level is more of a mutual exploration than a formal evaluation.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                One thing to know: at this level, the recruiter is often more junior than the candidate. Don't let that change how you treat the conversation. I've seen executives dismiss the screen because they think the "real" conversation is with the CEO. That attitude gets noted. The recruiter still controls the pipeline.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Compensation goes well beyond base salary. Equity, performance bonuses, signing bonuses, deferred compensation, and severance protections are all part of the picture. Know your full number before you go into any conversation.
              </p>
              <p className="text-muted-foreground text-sm mb-3">
                Frame every story around decisions that affected the full organization. Teams built. Revenue influenced. Markets entered. Culture shaped. The scope of your examples should match the scope of the role.
              </p>
              <p className="text-muted-foreground text-sm mb-4">
                What stands out at the executive level: strategic clarity, the ability to speak about organizational impact, and composure in the conversation. Executives who seem eager or anxious signal insecurity. The best executive candidates treat the screen as a peer conversation.
              </p>
              <Collapsible title="📝 Present-Past-Future example (VP Engineering)">
                <p className="text-foreground text-sm mt-3 italic">
                  "I'm currently VP of Engineering at [Company] where I lead a 120-person org across four engineering teams. Over the past three years I've rebuilt the infrastructure team from scratch, reduced deployment time from weekly to continuous, and cut incident rates by 60%. Before [Company], I was a senior director at [Company] where I led the platform migration that supported the company's growth from $50M to $200M ARR. I'm looking for a CEO-partnered role where I set technical strategy for the next stage of growth. Your Series C and the move into enterprise is the kind of inflection point where my experience is most valuable."
                </p>
              </Collapsible>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section id="cheatsheet" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-10">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">★</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                Quick Reference Cheat Sheet
              </h2>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                Before the Call
              </h3>
              <ul className="space-y-3">
                {[
                  { text: "Research the company (30-60 minutes)" },
                  { text: "Look up the recruiter on LinkedIn" },
                  { text: "Decode the JD (must-haves vs nice-to-haves)" },
                  { text: "Map experience to each key requirement" },
                  { text: <>Prepare your <a href="#story" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Present-Past-Future pitch</a></> },
                  { text: "Prepare top 3 reasons you want this role" },
                  { text: <>Build 5-7 <a href="#frameworks" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">STAR stories</a></> },
                  { text: "Build your one-page cheat sheet" },
                  { text: "Be ready to speak to every skill on your resume" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                During the Call
              </h3>
              <ul className="space-y-3">
                {[
                  { text: "Stand up (phone) or camera at eye level (video)" },
                  { text: <><a href="#story" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Present-Past-Future</a> for "Tell me about yourself" (60-90s)</> },
                  { text: <><a href="#frameworks" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">STAR or CAR</a> for behavioral questions</> },
                  { text: <><a href="#salary" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Three-level deflection</a> for salary</> },
                  { text: "Ask 1-2 sharp questions about the role" },
                  { text: "Ask about next steps before hanging up" },
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item.text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                Tough Questions Quick Ref
              </h3>
              <ul className="space-y-3">
                {[
                  "Why leaving: move toward, not away. One or two sentences. Stay positive.",
                  "Weakness: real, manageable, with a fix that's working. Use the behavior-impact-fix-result formula.",
                  "Salary: deflect first, flip it second, anchor high only if you must give a number.",
                  "5-year plan: ambition that fits the role. Signal you want to grow here.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                After the Call
              </h3>
              <ul className="space-y-3">
                {[
                  "Follow-up email within two to four hours",
                  "Reference something specific from the conversation",
                  "Correct any weak answers briefly",
                  "Keep applying to other roles",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-6 md:col-span-2">
              <h3 className="font-heading text-lg text-gold mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-gold" />
                Red Flags to Watch For
              </h3>
              <ul className="space-y-3">
                {[
                  "Vague role description",
                  "Evasive salary information",
                  "Long-open or repeatedly-filled position",
                  "Disorganized hiring process",
                  "Pressure to decide fast",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm"><a href="#redflags" className="hover:text-gold transition-colors">{item}</a></span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* More Free Guides */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">
                Additional Resources
              </h2>
              <p className="text-cream/60">Keep levelling up your job search</p>
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Full salary strategy</p>
              <span className="text-gold text-sm font-medium">Salary Starter Kit →</span>
            </Link>
            <Link to="/resume-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Get more screening calls</p>
              <span className="text-gold text-sm font-medium">Resume Guide →</span>
            </Link>
            <Link to="/interview-preparation-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Passed the screen? Win the interview.</p>
              <span className="text-gold text-sm font-medium">Interview Prep →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2026 James Bugden. All rights reserved.</span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors"><ThreadsIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default RecruiterScreenGuide;
