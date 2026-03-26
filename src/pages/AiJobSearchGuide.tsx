import { FileText, Clock, Linkedin, Bot, Target, Briefcase, Send, MessageSquare, DollarSign, AlertTriangle, CheckCircle2, XCircle, ArrowRight, ChevronDown, Menu, Search, Zap, BookOpen, Copy, Check } from "lucide-react";

import { AI_GUIDE_PROMPTS } from "@/data/aiGuidePrompts";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { useState, useEffect } from "react";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";

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

const AiPromptBlock = ({ children }: { children: React.ReactNode }) => {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    const text = typeof children === "string" ? children : (children as any)?.toString?.() ?? "";
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="bg-muted/50 border border-border rounded-xl p-4 md:p-5 my-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-gold" />
          <span className="text-sm font-semibold text-gold">AI Prompt</span>
        </div>
        <button onClick={handleCopy} className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-2 py-1 rounded-md hover:bg-muted">
          {copied ? <Check className="w-3.5 h-3.5 text-green-500" /> : <Copy className="w-3.5 h-3.5" />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="text-sm text-foreground whitespace-pre-wrap font-mono bg-background/50 rounded-lg p-4 overflow-x-auto">{children}</pre>
    </div>
  );
};

const CopyAllPromptsButton = ({ lang }: { lang: "en" | "zh" }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyAll = () => {
    const allText = AI_GUIDE_PROMPTS.map(stage =>
      `--- Stage ${stage.stage}: ${lang === "en" ? stage.titleEn : stage.titleZh} ---\n\n` +
      stage.prompts.map(p => `[${lang === "en" ? p.step : p.stepZh}]\n${lang === "en" ? p.promptEn : p.promptZh}`).join("\n\n")
    ).join("\n\n\n");
    navigator.clipboard.writeText(allText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };
  return (
    <button onClick={handleCopyAll} className="flex items-center gap-2 text-sm font-medium text-gold hover:text-gold/80 transition-colors px-4 py-2.5 rounded-lg border border-gold/30 hover:bg-gold/5">
      {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      {copied ? "All prompts copied!" : "Copy All Prompts"}
    </button>
  );
};

const RecruiterCheck = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-executive/5 border-l-4 border-gold rounded-r-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Search className="w-5 h-5 text-gold" />
      <span className="text-sm font-semibold text-gold">Recruiter Reality Check</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const ProTip = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-gold/5 border border-gold/20 rounded-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <Zap className="w-5 h-5 text-gold" />
      <span className="text-sm font-semibold text-gold">Pro Tip</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const ActionStep = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-card border border-border rounded-xl p-4 md:p-5 my-4">
    <div className="flex items-center gap-2 mb-2">
      <CheckCircle2 className="w-5 h-5 text-green-500" />
      <span className="text-sm font-semibold text-green-600">Action</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

const CommonMistake = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-4 md:p-5 my-6">
    <div className="flex items-center gap-2 mb-2">
      <XCircle className="w-5 h-5 text-red-500" />
      <span className="text-sm font-semibold text-red-500">{title}</span>
    </div>
    <div className="text-sm text-muted-foreground leading-relaxed">{children}</div>
  </div>
);

/* ─── Table of Contents ─── */
const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "find-path", label: "01 · Find Your Path" },
  { id: "linkedin", label: "02 · LinkedIn Defense" },
  { id: "resume", label: "03 · Resume Offense" },
  { id: "apply", label: "04 · Find & Apply" },
  { id: "interview", label: "05 · Crush Interviews" },
  { id: "negotiate", label: "06 · Negotiate" },
  { id: "mistakes", label: "07 · AI Mistakes" },
  { id: "mindset", label: "08 · Mindset Shifts" },
  { id: "checklist", label: "09 · Checklist" },
  { id: "resources", label: "10 · Resources" },
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

const AiJobSearchGuide = () => {
  useTrackGuideProgress("ai-job-search-guide");
  const [checklistState, setChecklistState] = useState<Record<number, boolean[]>>({});
  const toggleChecklist = (stageIndex: number, itemIndex: number) => {
    setChecklistState(prev => {
      const stage = [...(prev[stageIndex] || [])];
      stage[itemIndex] = !stage[itemIndex];
      return { ...prev, [stageIndex]: stage };
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <SEO schemaJson={guideSchema({ path: "/ai-job-search-guide", title: "AI Job Search Guide | Find Jobs Faster", description: "Use ChatGPT, Claude, and AI tools to speed up your job search." })} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><Linkedin className="w-5 h-5" /></a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><InstagramIcon className="w-5 h-5" /></a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors"><ThreadsIcon className="w-5 h-5" /></a>
            </div>
          </div>
        </div>
      </nav>

      <TableOfContents />

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            How to Use AI to Run Your<br className="hidden sm:block" /> Entire Job Search
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            Using ChatGPT at Every Stage: From Career Direction to Final Offer
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60 italic">
              Based on <em>Career Coach GPT</em> by Jeremy Schifeling · Guide by James Bugden
            </p>
          </div>
          <div className="flex items-center justify-center gap-6 text-sm text-cream/50">
            <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" /> 4-6 hours total</span>
            <span className="w-1 h-1 rounded-full bg-cream/20" />
            <span className="flex items-center gap-1.5"><FileText className="w-4 h-4" /> 10 Sections</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* ═══════════════ INTRODUCTION ═══════════════ */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground flex items-end gap-4">Introduction: Why AI Changes Everything About Job Searching</h2>

          <p className="text-muted-foreground leading-relaxed">I'm James. I'm a recruiter in Taiwan. I've been here for over 13 years. I've worked at a Taiwan startup and US tech companies in Taipei. I review more than 10,000 applications a year. I helped scale an engineering team from 10 to 80 people in six months.</p>

          <p className="text-muted-foreground leading-relaxed">Everything in this guide comes from real hiring experience in this market.</p>

          <p className="text-muted-foreground leading-relaxed">I spent more than 20 hours reading, testing, and building this content based on Jeremy Schifeling's <em>Career Coach GPT</em>. The book is one of the best AI-powered career guides I've come across. I took his system, pressure-tested it against what I see every day as a recruiter, and added the insider perspective that only someone on the hiring side can give you.</p>

          <p className="text-muted-foreground leading-relaxed">Here's the truth: most job seekers waste too much time doing the wrong things. They send the same resume to 100 jobs. They wing their interviews. They accept the first offer without negotiating. AI does not fix bad strategy. But when you combine AI with the right system, it compresses weeks of work into hours.</p>

          <p className="text-muted-foreground leading-relaxed font-medium text-foreground">This guide gives you that system.</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">How to use this guide:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Follow each section in order. The system builds step by step.</li>
              <li>Copy the prompts, paste into ChatGPT (or Claude, or any AI tool), and fill in your details.</li>
              <li>Take action after each step. Update your LinkedIn, fix your resume, prep your answers.</li>
              <li>Repeat the exercises for every job title you target.</li>
              <li>Keep this guide open while you job search. It's meant to be used, not just read.</li>
            </ol>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">After every AI output, ask yourself three things:</h3>
            <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground">
              <li>Does this sound like me, or does it sound like a robot?</li>
              <li>Did I add my own numbers, tools, and specifics?</li>
              <li>Would I be comfortable saying this out loud in an interview?</li>
            </ol>
            <p className="text-sm text-muted-foreground">If the answer to any of these is no, rewrite it.</p>
          </div>

          <p className="text-foreground font-semibold">Ready? Open ChatGPT (or Claude) in another tab. You're going to start using it in about 60 seconds.</p>

          <div className="bg-gold/10 border border-gold/30 rounded-xl p-5 md:p-6">
            <p className="text-foreground font-semibold mb-3">Estimated total time: 4-6 hours to complete all sections.</p>
            <p className="text-sm text-muted-foreground mb-3">That's less time than most people spend on a single frustrated week of unfocused job searching. Here's the breakdown:</p>
            <ul className="text-sm text-muted-foreground space-y-1">
              <li>• Find Your Path: 45 min</li>
              <li>• LinkedIn: 60 min</li>
              <li>• Resume: 90 min per version</li>
              <li>• Apply System: 30 min setup</li>
              <li>• Interview Prep: 2-3 hours per company</li>
              <li>• Negotiation: 30 min per round</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 1: FIND YOUR PATH ═══════════════ */}
      <section id="find-path" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Find Your Path</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 45 minutes</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">Before you build a resume, LinkedIn profile, or even start applying, you need clarity. AI can only help you if you point it in the right direction.</p>
          <p className="text-muted-foreground leading-relaxed">Most people skip this step entirely. They jump straight into applying for anything that looks vaguely related to their experience. This is the single biggest mistake I see from candidates. When you don't have clarity on what you want, everything you build (your resume, your LinkedIn, your interview answers) ends up generic. Generic gets rejected.</p>
          <p className="text-muted-foreground leading-relaxed">This section helps you turn your skills, interests, and background into specific job titles. Recruiters search by title, not vague categories like "tech jobs" or "creative roles." If you don't know what title you're targeting, you're invisible.</p>

          {/* 1.1 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.1 Generate Job Titles</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">This first exercise gives you a starting point and gets you out of analysis paralysis. Feed AI your skills, interests, and background, and let it generate specific titles you might not have considered.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Note: only include the information you want the AI to consider. If you don't want it to focus too much on your academic background, leave out your major. If you want a fresh start disconnected from past roles, don't include your resume.</p>
          <AiPromptBlock>{`Generate 10 specific job titles that could be a good fit for me based on:

My Favorite Skills: ____
My Interests: ____
My Major: ____
My Resume: ____`}</AiPromptBlock>
          <RecruiterCheck>When I search for candidates on LinkedIn Recruiter, I type exact job titles into the search bar. "Software Engineer," "Product Marketing Manager," "Data Analyst." I never search for "someone who likes technology and is creative." If your target title isn't clear, I will never find you. That's why this step matters more than most people think.</RecruiterCheck>

          {/* 1.2 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.2 Explore the Roles</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Many jobs sound attractive from the outside but feel very different once you understand the day-to-day reality. A "Product Manager" at a startup is nothing like a "Product Manager" at a bank.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">This step helps you build insider-level understanding of each role. What you actually do, who tends to enjoy the work, and whether it matches your personality and preferences. The goal is to eliminate roles that look good on paper but won't fit your lifestyle or strengths.</p>
          <AiPromptBlock>{`Please tell me about a typical day for each of these job titles and the kinds of people who tend to enjoy them:

[INSERT TITLES]`}</AiPromptBlock>
          <ProTip>After getting the AI's answer, go to YouTube and search "[job title] day in the life." Real videos from people in those roles will give you a much more honest picture than any AI summary.</ProTip>

          {/* 1.3 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.3 Rank the Roles</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">At this stage, you want to move from "interesting possibilities" to realistic and aligned options. This prompt forces you to compare your potential roles against your goals (income, lifestyle, impact) and your actual qualifications.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">It helps you narrow your list based not just on what you like, but also what you can win.</p>
          <AiPromptBlock>{`Rank these jobs:
[INSERT TITLES]

Based on my:
Career Goals: [INSERT GOALS]
Qualifications: [INSERT SKILLS + CREDENTIALS]`}</AiPromptBlock>
          <RecruiterCheck>The candidates who land jobs fastest aren't the ones who apply everywhere. They pick two or three target titles and go deep. They tailor everything to those specific roles: resume, LinkedIn, interview prep. Focused beats scattered every single time.</RecruiterCheck>

          {/* 1.4 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.4 Test Your Fit</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Choosing a role shouldn't be theoretical. You need real-world signals. By testing your fit through small tasks, reading, projects, or shadow-style activities, you quickly learn whether a role energizes you or drains you.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Think of this as rapid prototyping your career decisions.</p>
          <AiPromptBlock>{`What are three specific ways I can test my fit with each of the following roles:

[INSERT ROLES]`}</AiPromptBlock>
          <ProTip>The fastest test is to find someone in that role and ask if you can shadow them for half a day, or do a small project in that space. Talking about a role is never the same as doing the work. Even a weekend project can tell you more than months of research.</ProTip>

          {/* 1.5 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">1.5 Learn from Alumni</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">No AI or book can beat the insight of someone who's already doing the job. LinkedIn's Alumni Tool helps you connect with people who share your background and who are far more likely to reply than cold outreach to strangers.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Talking to real practitioners gives you insider knowledge and helps you build relationships that can lead to referrals, advice, and better career decisions.</p>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>Search for your university on LinkedIn.</li>
              <li>Click the Alumni tab on the university's page.</li>
              <li>Filter for alumni who work in your field of interest, and maybe companies and locations that interest you too.</li>
              <li>Send a personalized connection request:
                <blockquote className="mt-2 pl-4 border-l-2 border-gold/30 italic text-muted-foreground">"I'm a fellow [School Name] alum and I'm at a career crossroads. Specifically, I'm trying to decide whether to pursue your path. Would you be open to a 10-minute Zoom chat so I could learn from your journey?"</blockquote>
              </li>
              <li>Interview them with questions like:
                <blockquote className="mt-2 pl-4 border-l-2 border-gold/30 italic text-muted-foreground">"What's a typical day like for you? What kind of person tends to be really happy in this role? Does it give you a chance to use X skills or achieve Y goals?"</blockquote>
              </li>
            </ol>
          </ActionStep>
          <RecruiterCheck>Every week I see candidates who picked the wrong role and are now trying to pivot mid-search. They've spent months building a resume and LinkedIn profile for a title they don't actually want. Spending a few hours on informational interviews now saves you from a painful restart later.</RecruiterCheck>

          <CommonMistake title="Common Mistake: Skipping This Section">
            <p>The number one mistake I see is people who skip career clarity and jump straight to resume writing. They end up with a resume that tries to be everything for everyone. That means it's compelling for no one. If you don't have a clear target title, stop here and complete this section before moving on.</p>
          </CommonMistake>

          <p className="text-foreground font-medium">Next up: Now that you know what you're targeting, let's make sure recruiters can find you.</p>
        </div>
      </section>

      {/* ═══════════════ SECTION 2: LINKEDIN DEFENSE ═══════════════ */}
      <section id="linkedin" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Build Your LinkedIn Defense</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 60 minutes</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">LinkedIn is your number one passive job search tool. Even if you never apply to a single job, a well-optimized profile brings recruiters to you. I spend hours every day on LinkedIn Recruiter searching for candidates. The ones I find are the ones who've done this section properly. The ones I miss are the ones who haven't.</p>
          <p className="text-muted-foreground leading-relaxed">Think of your LinkedIn profile as your defense. Your resume is your offense. You send it out to attack specific opportunities. But your LinkedIn sits there working for you 24/7, attracting recruiters even while you sleep.</p>

          {/* 2.1 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.1 Write a Headline That Recruiters Actually Search For</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your headline is the single most important line on your profile. If it's unclear, vague, or generic, you'll disappear in recruiter searches no matter how strong your background is.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Most people leave their headline as their current job title at their current company. That's a missed opportunity. Your headline should signal what you want to do next, not just what you're doing now.</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a542926/edit-your-headline" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to edit your headline on LinkedIn.</a></p>
          <AiPromptBlock>{`Generate a 220 character LinkedIn profile Headline based on the following template, desired job title, and resume:

Here's a headline template:
DESIRED JOB (List "Seeking" if the candidate lacks experience) | RELEVANT SKILLS FOR JOB

Here's the desired job title: [INSERT JOB]

And here's the resume: [INSERT RESUME]`}</AiPromptBlock>
          <RecruiterCheck>When I search on LinkedIn Recruiter, the headline is the first thing I see in the search results. Before I even click on your profile. If your headline says "Aspiring professional looking for new opportunities," I skip it. If it says "Senior Data Analyst | SQL, Python, Tableau, A/B Testing," I click.</RecruiterCheck>

          {/* 2.2 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.2 Set Your Location to Where You Want to Work</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">LinkedIn search is location-driven. If your profile lists the wrong city, recruiters simply won't see you. Set your location to where you want to get hired, not where you're currently living.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">If you're in Kaohsiung but want to work in Taipei, set your location to Taipei. If you're open to multiple cities, pick the one with the most opportunities in your field.</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a564134/change-the-location-on-your-profile" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to edit your location on LinkedIn.</a></p>
          <ActionStep>Update your location in LinkedIn's settings to the city where you want to work.</ActionStep>
          <ProTip>If you're in Taiwan targeting roles at foreign companies, always set your location to Taipei. Most recruiters for multinational companies in Taiwan only search Taipei as a location filter.</ProTip>

          {/* 2.3 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.3 Find and Add the Right Skills</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Recruiters filter by skills before reading anything else. Most people guess what to include and miss the real keywords employers care about. You need to find the actual market-demand skills from job descriptions so your profile aligns with what hiring managers search for.</p>
          <AiPromptBlock>{`What are the 20 most common skills listed on job descriptions for [JOB TITLE]?`}</AiPromptBlock>
          <ActionStep>After generating this list, add every skill you genuinely have to your LinkedIn Skills section. <a href="https://www.linkedin.com/help/linkedin/answer/a549047" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to add skills on LinkedIn.</a> Then ask colleagues or classmates to endorse your top three. Endorsements push your skills higher in search rankings.</ActionStep>
          <RecruiterCheck>LinkedIn Recruiter lets me filter candidates by specific skills. If I'm looking for a "Product Manager" who has "SQL" and "A/B Testing" as listed skills, your profile won't show up unless those exact skills are on your profile. It doesn't matter if you mention them in your About section. They need to be in the Skills section.</RecruiterCheck>

          {/* 2.4 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.4 Embed Keywords Into Your Bullet Points</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Skills only help you if LinkedIn can detect them. That means placing them correctly in both your Skills list and your experience bullet points. Embedding the right keywords throughout your profile increases visibility and helps you match job descriptions when recruiters search.</p>
          <AiPromptBlock>{`Please add the following keywords into my existing resume bullet points.

Keywords: [PASTE KEYWORDS]

Bullet Points: [PASTE BULLET POINTS]`}</AiPromptBlock>
          <ActionStep>Update the Experience section of your LinkedIn profile with these keyword-enriched bullet points. Add the same keywords to your Skills section too.</ActionStep>

          {/* 2.5 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.5 Write Your About Section</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your About section sets your narrative. It tells recruiters who you are, what you've done well, and where you're heading. Most people write something too long, too vague, or too generic. You need a clear, structured summary that makes you look credible and aligned with your target role.</p>
          <AiPromptBlock>{`Generate a 2,000 character LinkedIn profile About section based on the following template, desired job title, and resume.

Here's a template:

Start with an opening sentence that states the candidate's focus on their desired job title.

▶ Pull out a relevant bullet from their resume
▶ Pull out a second relevant bullet from their resume
▶ Pull out a third relevant bullet from their resume

Specialties: List the most relevant skills for the desired job from their resume

Here's the desired job title: ____

And here's the resume: ____`}</AiPromptBlock>
          <ProTip>Your About section should be readable on its own. The reader shouldn't need to scroll through your entire Experience section to understand you. Think of it as the movie trailer. Give them enough to want to learn more, but don't make them work for it.</ProTip>

          {/* 2.6 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.6 Build Missing Skills Fast</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">If you're missing skills for the roles you want, you need a fast and practical way to close the gap. Don't waste six months on a course you don't need. Focus on low-cost, targeted learning paths that close specific gaps.</p>
          <AiPromptBlock>{`What are the specific fastest and cheapest ways to learn [SKILL]?`}</AiPromptBlock>
          <ProTip>Most skills don't require a certification. If a job lists "Tableau" as a requirement, a free YouTube crash course plus a personal project on your GitHub is often enough to get past the screening stage. Recruiters care that you can do it, not where you learned it.</ProTip>

          {/* 2.7 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.7 Turn On "Open to Work" (The Right Way)</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">This setting controls whether recruiters know you're available. The key is using the correct privacy option.</p>
          <ActionStep>Turn on "Open to Work" in your LinkedIn settings. <a href="https://linkedin.com/help/linkedin/answer/67405" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to change your Open to Work settings.</a> Choose "Recruiters only" if you're currently employed or don't want others to know you're looking. This makes you visible to recruiters without broadcasting it to your entire network, including your current boss.</ActionStep>
          <RecruiterCheck>When I search for candidates, LinkedIn flags profiles that have "Open to Work" turned on. It shows a green badge next to your name in my search results. This makes me far more likely to reach out because I know you'll respond. Turning this on gets you a lot more recruiter messages.</RecruiterCheck>

          {/* 2.8 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.8 Grow Your Network to 500+</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">A small LinkedIn network limits your visibility, reach, and opportunities. Most people only connect with classmates, colleagues, and friends, which keeps their network tiny and causes their profile to circulate in a very narrow circle.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Hitting 500+ connections gives you a real advantage. You look more established, your profile shows up in more searches, and your content reaches a wider audience.</p>
          <ActionStep>Send 10-20 connection requests per day to people in your industry, alumni from your university, people at your target companies, and colleagues from past jobs. Within a few weeks, you'll cross 500.</ActionStep>

          {/* 2.9 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.9 Follow Target Companies</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Following companies teaches LinkedIn what industries and roles you care about. It improves your job recommendations and signals interest to recruiters from those companies.</p>
          <AiPromptBlock>{`Generate a list of the 100 top employers of [X job title] in [Y industry] and [Z location].`}</AiPromptBlock>
          <ActionStep>Follow every company on this list that interests you. When a recruiter from that company searches for candidates, LinkedIn prioritizes people who already follow the company page.</ActionStep>

          {/* 2.10 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.10 Optimize Your Profile Photo</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your photo shapes first impressions and trust. A low-quality or unprofessional photo can reduce recruiter clicks. You don't need a professional photographer, but you do need to follow three rules:</p>
          <ol className="list-decimal list-inside space-y-2 text-sm text-muted-foreground ml-2">
            <li>Closely crop it around your head and shoulders.</li>
            <li>Show a genuine, warm smile (what psychologists call a Duchenne smile).</li>
            <li>Dress for the industry you want to enter.</li>
          </ol>
          <ProTip>Take the photo in natural daylight near a window. Clean, simple background. No selfies, no group crops, no sunglasses.</ProTip>

          {/* 2.11 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.11 Get Recommendations</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">A strong recommendation adds instant credibility. It shows others have seen your work and trust your abilities.</p>
          <p className="text-sm text-muted-foreground"><a href="https://www.linkedin.com/help/linkedin/answer/a546682" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to request a Recommendation on LinkedIn.</a></p>
          <AiPromptBlock>{`Generate a LinkedIn Recommendation request for my former boss/client, [NAME]. Please use a friendly but grateful and respectful tone. Keep the message under 500 characters.`}</AiPromptBlock>
          <ActionStep>Send this to two or three former managers, clients, or senior colleagues. Even one recommendation makes your profile far more credible than having zero.</ActionStep>

          {/* 2.12 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.12 Add a Cover Photo</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your cover photo is free branding space. Most people leave it blank, which wastes an opportunity. Choose an image that reinforces your expertise, industry, or the type of role you're targeting.</p>
          <AiPromptBlock>{`Please generate 10 ideas for a photo of [X role] in action.`}</AiPromptBlock>
          <ActionStep>Use a stock photo site (Unsplash, Pexels) or create a simple branded banner with your name and target role using Canva.</ActionStep>

          {/* 2.13 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">2.13 Respond to Every InMail</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Responding to recruiter InMails (even with "No thanks") improves your search ranking. It shows LinkedIn that you're an active, responsive user. This increases your visibility in future searches.</p>
          <ActionStep>Check your LinkedIn messages at least once a week. Click "No thanks" on any that don't interest you. Reply to any that do.</ActionStep>
          <RecruiterCheck>LinkedIn actually tracks your response rate and shows it to recruiters. When I see "Typically responds within 1 day" on a candidate's profile, I'm more likely to reach out. It tells me my message won't disappear into a black hole.</RecruiterCheck>

          {/* 5 LinkedIn Mistakes */}
          <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 md:p-6 my-6 space-y-4">
            <div className="flex items-center gap-2 mb-2">
              <XCircle className="w-5 h-5 text-red-500" />
              <span className="font-semibold text-red-500">The 5 LinkedIn Mistakes I See Every Day</span>
            </div>
            <ol className="list-decimal list-inside space-y-3 text-sm text-muted-foreground">
              <li><strong className="text-foreground">Headline is just your current job title.</strong> You're telling recruiters what you are, not what you want. Always include your target role and key skills.</li>
              <li><strong className="text-foreground">Location is wrong.</strong> If you're targeting Taipei but your profile says Tainan, I will never see you in my search results.</li>
              <li><strong className="text-foreground">No skills listed.</strong> I literally cannot filter for you if your skills section is empty. It's like a store with no sign on the door.</li>
              <li><strong className="text-foreground">About section is empty or a wall of text.</strong> Either extreme kills you. Use the structured template above.</li>
              <li><strong className="text-foreground">Profile photo is missing or unprofessional.</strong> Profiles without photos get far fewer clicks. A bad photo (blurry, cropped from a group shot, selfie with sunglasses) is almost as bad.</li>
            </ol>
          </div>

          <p className="text-foreground font-medium">Next up: Your LinkedIn is set. Now let's build the resume you'll send to specific jobs.</p>
        </div>
      </section>

      {/* ═══════════════ SECTION 3: RESUME ═══════════════ */}
      <section id="resume" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Go on the Offense with Your Resume</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 90 minutes per version</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">Your LinkedIn is your defense. Your resume is your offense. It's what you send out to attack specific opportunities. And unlike LinkedIn, which stays mostly the same, your resume should be tailored for every job title you're targeting.</p>
          <p className="text-muted-foreground leading-relaxed">Most people write one resume and send it everywhere. This is the second biggest mistake I see (after skipping career clarity). A generic resume that tries to appeal to everyone ends up convincing no one.</p>

          <h4 className="font-heading text-lg text-gold font-semibold pt-4">Setup: Get Your Foundation Right (3.1-3.8)</h4>

          {/* 3.1 */}
          <Collapsible title="3.1 Grab a Resume Template">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">A strong resume starts with a strong structure. A clean, recruiter-tested template removes all the guesswork around layout, keywords, sections, and hierarchy. All you need to focus on is the content.</p>
            <ActionStep>Download a clean, single-column resume template. Avoid templates with graphics, icons, headshots, or multiple columns. These look nice but break when parsed by ATS (Applicant Tracking Systems).</ActionStep>
            <RecruiterCheck>I've reviewed thousands of resumes that were mangled by ATS software because the candidate used a fancy two-column template. The system couldn't read it, so it showed me scrambled text. If I can't read your resume in the first three seconds, I move on. Simple beats pretty.</RecruiterCheck>
            <div className="flex flex-wrap gap-3 mt-4">
              <Link to="/resume" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
                Open Resume Builder →
              </Link>
              <Link to="/resume-guide" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
                Read Resume Guide →
              </Link>
            </div>
          </Collapsible>


          {/* 3.2 */}
          <Collapsible title="3.2 Create Different Versions for Each Job Title">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Every job title signals a different set of skills, achievements, and keywords. Because recruiters search by specific role terms, using the same resume for multiple titles makes you look less qualified for each one.</p>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Creating tailored versions lets you adjust your keywords, highlight the most relevant experiences, and shape your narrative so it directly matches what each hiring manager wants.</p>
            <ActionStep>If you're targeting two or three job titles from Section 1, create a separate resume file for each one. Name them clearly: "Resume_DataAnalyst.pdf" and "Resume_ProductManager.pdf."</ActionStep>
          </Collapsible>

          {/* 3.3 */}
          <Collapsible title="3.3 Lead with Your Target Job Title">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">The job title at the very top of your resume is your most powerful keyword. It tells recruiters and ATS exactly what you're targeting. Without this, your resume forces reviewers to guess your direction. Any confusion pushes you out of the qualified pile.</p>
            <ActionStep>Add your desired job title immediately below your name and contact information.</ActionStep>
            <p className="text-sm text-muted-foreground mt-3"><strong>Before:</strong> Name, email, phone number, then straight into Experience.</p>
            <p className="text-sm text-muted-foreground"><strong>After:</strong> Name, email, phone number, then <strong>"Senior Data Analyst"</strong> in bold, then Experience.</p>
          </Collapsible>

          {/* 3.4 */}
          <Collapsible title="3.4 Update Your Location to Be a Local">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Location is one of the first filters recruiters apply. Many ATS systems automatically exclude candidates outside the target area. Even if you're open to relocating, leaving your current location unchanged can remove you from search results before anyone reads your resume.</p>
            <ActionStep>Update your resume location to the city you intend to work in. If you're in Hsinchu but want to work in Taipei, list Taipei.</ActionStep>
          </Collapsible>

          {/* 3.5 */}
          <Collapsible title="3.5 Include Relevant Non-Work Experience">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Not all valuable experience comes from paid work. Projects, volunteer roles, internships, freelance work, student leadership, or community contributions can all demonstrate the skills required for the job. If an experience helps prove you can succeed in the role, it deserves to be included.</p>
            <ProTip>Label these clearly. "Freelance Project," "Volunteer," "Personal Project." Don't try to disguise them as full-time employment. Recruiters respect honesty and initiative.</ProTip>
          </Collapsible>

          {/* 3.6 */}
          <Collapsible title="3.6 Use Year Dates if You've Had Short Stints">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Short job stints can trigger bias or unnecessary questions from recruiters. Month-to-month dates highlight how brief the role was, even when the reason is completely valid (contract work, restructuring, relocation).</p>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Using only years helps keep your timeline clean and minimizes distraction. It keeps the focus on your skills and achievements rather than inviting assumptions about job-hopping.</p>
            <RecruiterCheck>When I see "Jan 2023 – Apr 2023" on a resume, my brain immediately flags it. When I see "2023" I barely notice it. Same experience, completely different first impression. Use this to your advantage.</RecruiterCheck>
          </Collapsible>

          {/* 3.7 */}
          <Collapsible title="3.7 Add Organizational Context If Helpful">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">If your company isn't well-known, recruiters may miss how impressive or relevant it actually is. Adding a short line of context (team size, customer scale, industry ranking, or notable achievements) helps you get proper credit for your experience.</p>
            <p className="text-sm text-muted-foreground"><strong>Example:</strong> Instead of just "ABC Corp," write "ABC Corp (Series B fintech startup, 200 employees, serving 50,000+ SMB customers in Southeast Asia)."</p>
          </Collapsible>

          {/* 3.8 */}
          <Collapsible title="3.8 Add Explanatory Job Titles If Helpful">
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Internal job titles often don't reflect the actual work you did. A vague or company-specific title like "Coordinator," "Associate," or "Business Partner" may not match the language recruiters use when searching.</p>
            <p className="text-muted-foreground leading-relaxed text-sm mb-3">Adding a short explanatory title in parentheses helps translate your role into terms the market recognizes.</p>
            <p className="text-sm text-muted-foreground"><strong>Example:</strong> "Business Enablement Partner (Technical Recruiter)" or "Associate III (Senior Data Analyst)"</p>
          </Collapsible>

          <h4 className="font-heading text-lg text-gold font-semibold pt-6">Content: Write Bullets That Get Callbacks (3.9-3.17)</h4>

          {/* 3.9 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.9 Pull Keywords from Real Job Descriptions</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Hiring systems and recruiters rely heavily on keywords to determine whether you match a role. Pulling the most common keywords from real job descriptions gives you a data-driven foundation for tailoring your resume.</p>
          <AiPromptBlock>{`Generate the 20 most important keywords from across [ROLE] job descriptions.`}</AiPromptBlock>
          <ProTip>Don't just use AI for this. Open five to ten real job postings for your target role and highlight the skills, tools, and responsibilities that keep appearing. The overlap between AI-generated keywords and real postings is your keyword gold.</ProTip>

          {/* 3.10 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.10 Write 3 Bullets Per Role (Quality Over Quantity)</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">For each role on your resume, aim for exactly three bullet points. Each one should showcase a concrete accomplishment, not a responsibility.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">It's better to have three outstanding bullets than ten mediocre ones. Recruiters scan, they don't read line by line. Three strong bullets create a clear, powerful impression. Ten average bullets create noise.</p>

          {/* 3.11 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.11 Add an Achievement for Each Experience</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Every role on your resume should showcase concrete accomplishments, not just responsibilities. Achievements prove your impact and set you apart from candidates who simply "did tasks."</p>
          <AiPromptBlock>{`What are some example numeric or eye-catching accomplishments that I could list on my resume for [X Experience]?`}</AiPromptBlock>
          <RecruiterCheck>The difference between a resume that gets a callback and one that doesn't almost always comes down to this. "Managed social media accounts" tells me nothing. "Grew Instagram following by 300% in 6 months, generating 45 qualified leads per month" tells me everything.</RecruiterCheck>

          {/* 3.12 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.12 Match Keywords to Achievements</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Each achievement you list should be paired with the most relevant keywords from your target job descriptions. This makes sure your strongest accomplishments use the exact language recruiters and ATS systems scan for.</p>
          <AiPromptBlock>{`Which of the following keywords would be a good fit for my resume based on the following achievements?

Please suggest specific relevant keywords from my list for each achievement.

Keywords: [PASTE KEYWORDS]

Achievements: [PASTE ACHIEVEMENTS]`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-2">
            <p><strong>Example:</strong></p>
            <p>Achievement: "Hired a lot of engineers fast"</p>
            <p>Keywords from JD: full-cycle recruiting, technical hiring, time-to-fill, sourcing, engineering</p>
            <p>AI output: "full-cycle recruiting, technical hiring, time-to-fill, sourcing" all map to this achievement.</p>
          </div>

          {/* 3.13 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.13 Build Complete Bullets</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">This is where it all comes together. Combine your achievements and keywords into polished resume bullets.</p>
          <AiPromptBlock>{`Please combine this achievement and these keywords to make a great resume bullet:

Achievement: [PASTE ACHIEVEMENT]
Keywords: [PASTE KEYWORDS]`}</AiPromptBlock>

          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-3 my-4">
            <p className="font-semibold text-foreground">Full Example: From Raw Achievement to Polished Bullet</p>
            <p><strong>Step 1</strong> (Raw achievement): "Hired a lot of engineers fast"</p>
            <p><strong>Step 2</strong> (Keywords from JD): full-cycle recruiting, technical hiring, time-to-fill, sourcing, engineering</p>
            <p><strong>Step 3</strong> (Combined bullet): "Led full-cycle technical recruiting for 35 software engineering roles across frontend, backend, and ML teams, reducing time-to-fill from 65 to 38 days through targeted sourcing on LinkedIn and GitHub."</p>
            <p><strong>Step 4</strong> (AI review): Score 9/10. Strong metrics, clear scope, relevant keywords.</p>
            <div className="border-t border-border pt-3 mt-3">
              <p><strong>Before:</strong> "Responsible for recruiting engineers"</p>
              <p><strong>After:</strong> "Led full-cycle technical recruiting for 35 software engineering roles across frontend, backend, and ML teams, reducing average time-to-fill from 65 to 38 days through targeted sourcing on LinkedIn and GitHub."</p>
            </div>
          </div>

          {/* 3.14 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.14 Review Your Bullets</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Each bullet should be judged on two criteria: the strength of the accomplishment and how well it integrates the right keywords.</p>
          <AiPromptBlock>{`Please rate the following resume bullets based on the impressiveness of their accomplishments and their inclusion of important keywords for [X ROLE].

And suggest specific ideas to improve them, if possible:

[BULLET POINTS]`}</AiPromptBlock>
          <ProTip>After AI reviews your bullets, read them out loud. If they sound like a robot wrote them, rewrite in your own voice. Recruiters can spot AI-generated content, and it makes you look lazy rather than impressive.</ProTip>

          {/* 3.15 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.15 Aim for ~50% Keyword Match</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">You don't need to include every keyword from the job description. But you need enough of the important ones so the system recognizes you as a strong fit.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">Why 50%? Below 30%, ATS might not surface you at all. Above 70%, your resume starts to read like keyword stuffing. 50% is the sweet spot.</p>
          <div className="flex flex-wrap gap-3 mt-3 mb-4">
            <Link to="/resume-analyzer" className="inline-flex items-center gap-1.5 text-sm text-gold hover:underline font-medium">
              Check your keyword match with our Resume Analyzer →
            </Link>
          </div>
          <AiPromptBlock>{`Suggest a revision of this resume bullet to add these keywords: [KEYWORDS]

[RESUME BULLET]`}</AiPromptBlock>

          {/* 3.16 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.16 Add Education Bullets</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your education can offer valuable evidence of relevant skills, coursework, or achievements. Aim for one to two highly relevant bullet points per educational experience.</p>
          <AiPromptBlock>{`What experiences from my [EDUCATION] might be relevant for an [X] role?`}</AiPromptBlock>

          {/* 3.17 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.17 Review Your Education Bullets</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Just like your work experience, your education bullets should be reviewed for clarity, relevance, and keyword alignment. Each bullet should reflect an accomplishment or responsibility that directly supports your target role.</p>
          <AiPromptBlock>{`Please rate the following resume bullets based on the impressiveness of their accomplishments and their inclusion of important keywords for [X ROLE].

And suggest specific ideas to improve them, if possible:

[BULLET POINTS]`}</AiPromptBlock>
          <ProTip>Education bullets matter most for people early in their career or changing fields. If you have 10+ years of relevant work experience, keep education bullets minimal. One line per degree is enough. But if you're a recent graduate, your education bullets might be the strongest part of your resume. Invest time in making them excellent.</ProTip>

          <h4 className="font-heading text-lg text-gold font-semibold pt-6">Polish: Final Touches (3.18-3.19)</h4>

          {/* 3.18 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.18 Complete Your Skills Section</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">The skills section is one of the most frequently scanned areas of your resume. Organize your skills into clear categories.</p>
          <AiPromptBlock>{`Place these skills into categories:

[PASTE IN SKILLS LIST]`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-4 text-sm text-muted-foreground space-y-1 my-3">
            <p className="font-semibold text-foreground mb-2">Example output:</p>
            <p><strong>Programming:</strong> Python, SQL, R, JavaScript</p>
            <p><strong>Analytics:</strong> Tableau, Power BI, Google Analytics, A/B Testing</p>
            <p><strong>Project Management:</strong> Jira, Asana, Agile/Scrum</p>
            <p><strong>Languages:</strong> English (Native), Mandarin (Business)</p>
          </div>
          <ProTip>Put the most relevant category first. If you're applying for a data role, lead with Programming/Analytics, not Languages.</ProTip>

          {/* 3.19 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">3.19 Write a Summary</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Your summary sits at the top of your resume and sets the entire tone for your candidacy. A strong summary clearly states the role you're targeting, highlights your most relevant achievements, and emphasizes the strengths that make you a strong fit.</p>
          <AiPromptBlock>{`Please rate the following resume summary based on how clear my interest is in a [X] role and how impressive and relevant my accomplishments are.

And suggest specific ideas to improve it, if possible:

[INSERT SUMMARY]`}</AiPromptBlock>

          <CommonMistake title="Common Mistake: Using One Resume for Everything">
            <p>If you're targeting "Data Analyst" and "Business Intelligence Analyst," those require different keyword emphasis, different bullet point ordering, and different summaries. A resume that tries to cover both ends up mediocre for each. Take the extra 30 minutes to create a tailored version for each title. It's the highest-ROI activity in your entire job search.</p>
          </CommonMistake>

          <p className="text-foreground font-medium">Next up: Your resume is ready. Time to put it to work.</p>
        </div>
      </section>

      {/* ═══════════════ SECTION 4: FIND AND APPLY ═══════════════ */}
      <section id="apply" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Find and Apply on Autopilot</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 30 min setup, then 15 min/day</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">Most people treat job searching like a manual, exhausting process. They open LinkedIn, scroll through jobs, apply to a few, close the tab, and repeat. This section turns that into a system that runs on autopilot.</p>

          {/* 4.1 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.1 Set Up Job Alerts for Multiple Titles</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Instead of refreshing job boards all day, let new openings come straight to you. Set alerts for your target job titles and also for similar titles that companies might use.</p>
          <AiPromptBlock>{`What are the most common other job titles companies use instead of [ROLE]?`}</AiPromptBlock>
          <ActionStep>Set up job alerts on LinkedIn, Indeed, and any niche job boards relevant to your industry (for example, Idealist for non-profit roles, or AngelList for startups). <a href="https://www.linkedin.com/help/linkedin/answer/a511279" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Here's how to set up job alerts on LinkedIn.</a> Use your target title plus two or three alternative titles. This ensures you catch opportunities even when companies use different naming conventions.</ActionStep>
          <ProTip>Set alerts for daily delivery, not weekly. You want to see new jobs within 24 hours of posting, not seven days later when 500 other people have already applied.</ProTip>

          {/* 4.2 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.2 Apply the Same Day Jobs Are Posted</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Speed matters. Applying early increases your chances of being seen because recruiters often review the first batch of applicants before anyone else.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">When you see a role that fits, apply the same day. Even a short delay can push you into a crowded pile where your resume is less likely to stand out.</p>
          <RecruiterCheck>At Uber, when I post a role, I typically start reviewing applications within the first 48-96 hours. The first 20-30 applications get the most attention. By day five, I might have 200+ applications and I'm scanning much faster. Being in that first batch is a genuine advantage.</RecruiterCheck>

          {/* 4.3 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.3 Decide Whether to Write a Cover Letter</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Don't overthink this. If the employer asks for one, write it. If you feel it will strengthen your application (for example, you're changing careers and need to explain why), write it. If it won't make a difference, skip it and spend that time applying to more jobs.</p>
          <p className="text-muted-foreground leading-relaxed text-sm">When in doubt, ask yourself what you would regret more: not writing one and missing out, or spending 15 minutes on one that might tip the scales.</p>

          {/* 4.4 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.4 Use a Cover Letter Template</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">When you do write a cover letter, use a structured template that focuses on showing how your skills and passion match the role.</p>
          <AiPromptBlock>{`Please rate the following cover letter for an [X] role based on how clearly my skills and passion align with the role. And suggest specific ideas to improve it, if possible:

[INSERT COVER LETTER]`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground space-y-3 my-4">
            <p className="font-semibold text-foreground">Structure your cover letter in three paragraphs:</p>
            <p><strong>Paragraph 1: The Hook.</strong> Why you're excited about this specific role and company. One to two sentences.</p>
            <p><strong>Paragraph 2: The Skills Match.</strong> Your most relevant achievements that directly align with the job requirements. Three to four sentences with specific examples.</p>
            <p><strong>Paragraph 3: The Close.</strong> Why you're a strong fit and a call to action. One to two sentences.</p>
          </div>
          <div className="bg-muted/30 border border-border rounded-xl p-5 text-sm text-muted-foreground my-4 italic">
            <p>Dear [Hiring Manager / Recruiting Team],</p>
            <p className="mt-2">[1-2 sentences: Why this specific role and company excites you.]</p>
            <p className="mt-2">[3-4 sentences: Your most relevant achievements that match the job requirements. Include numbers.]</p>
            <p className="mt-2">[1-2 sentences: Why you're a strong fit. "I'd welcome the chance to discuss how my experience in X can help your team with Y."]</p>
            <p className="mt-2">Best,<br />[Your Name]</p>
          </div>

          {/* 4.5 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.5 Customize for Each Employer</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Keep the skills paragraph mostly the same across applications, but always tailor the employer-specific paragraph. Talk about why you want to work at that company specifically.</p>
          <AiPromptBlock>{`Rewrite the following cover letter paragraph to focus on [X EMPLOYER]:

[INSERT PARAGRAPH]`}</AiPromptBlock>
          <RecruiterCheck>I can spot a generic cover letter in seconds. "I admire your company's approach to technology" could apply to any tech company on earth. "I've been following Uber's expansion into autonomous freight delivery and your recent partnership with Aurora. My background in logistics optimization at DHL makes me excited to contribute to this." That tells me you've done your homework.</RecruiterCheck>

          {/* 4.6 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">4.6 Find Someone Who Can Refer You</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Once you apply, your next move is to search for someone inside the company who can refer you. Referrals boost your chances because recruiters trust internal recommendations.</p>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>After you've applied, search for and open the employer's Company Page on LinkedIn.</li>
              <li>Click on the number of employees.</li>
              <li>Filter for 1st Degree Connections or school alumni.</li>
              <li>Look up their email address on Hunter.io or your alumni database.</li>
              <li>Send them a referral request.</li>
            </ol>
          </ActionStep>
          <div className="bg-muted/30 border border-border rounded-xl p-5 text-sm text-muted-foreground my-4 italic">
            <p className="font-semibold not-italic text-foreground mb-2">Email template:</p>
            <p>Subject: Quick favor from a fellow [school/connection]?</p>
            <p className="mt-2">Hi [Name],</p>
            <p className="mt-2">I just applied for the [Role Title] at [Company] and I'm really excited about it. My background in [relevant experience] feels like a strong match.</p>
            <p className="mt-2">Would you be open to referring me for the position? If so, here's my resume: [LINK].</p>
            <p className="mt-2">Hoping you might even get a nice referral bonus out of it!</p>
            <p className="mt-2">Thanks for considering,<br />[Your Name]</p>
          </div>
          <RecruiterCheck>When a candidate comes through as a referral, their application gets flagged in my system. At most companies I've worked at, referred candidates are reviewed before non-referred candidates. Some companies even have a policy that every referral must get a phone screen. A single referral email can be the difference between your resume sitting in a pile of 300 and getting a call within 48 hours.</RecruiterCheck>

          <CommonMistake title="Common Mistake: Applying Without a Referral">
            <p>Most people apply and then wait. The top candidates apply and then immediately search for a referral. Even if the referral is a loose connection (a friend of a friend, an alumni you've never met), it's still far more effective than applying cold.</p>
          </CommonMistake>

          <p className="text-foreground font-medium">Next up: Applications are flowing. Let's prepare for when they call you back.</p>
        </div>
      </section>

      {/* ═══════════════ SECTION 5: INTERVIEWS ═══════════════ */}
      <section id="interview" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Prepare to Crush Your Interviews</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 2-3 hours per company</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">If you've made it to the interview stage, the company already believes you can probably do the job. The interview is about confirming that belief and determining whether you're the best option.</p>
          <p className="text-muted-foreground leading-relaxed">Every interview evaluates two things. Competence: can you do the job? And warmth: would you be good to work with? Most candidates focus entirely on competence and forget about warmth. The candidates who get offers nail both.</p>

          {/* 5.1 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.1 Generate the 10 Most Likely Questions</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Start by taking the job description and your resume and let AI generate the ten questions you are most likely to be asked. This gives you a realistic preview of the interview so you never walk in cold.</p>
          <AiPromptBlock>{`Generate a list of the 10 most likely interview questions I'll face based on the following job description. And for each question, generate an answer in Challenge - Action - Result format, drawing only from the following resume.

Job description: [PASTE JOB DESCRIPTION]
Resume: [PASTE RESUME]`}</AiPromptBlock>
          <ProTip>
            <p className="mb-2">The Challenge-Action-Result (CAR) format is your best friend. Every behavioral answer should follow this structure:</p>
            <p><strong>Challenge:</strong> What was the problem or situation?</p>
            <p><strong>Action:</strong> What specifically did you do?</p>
            <p><strong>Result:</strong> What was the measurable outcome?</p>
            <p className="mt-2">This keeps your answers sharp, specific, and credible. No rambling. No vague claims. Just evidence.</p>
          </ProTip>

          {/* 5.2 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.2 Practice Writing Your Answers</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Once you have your draft answers, practice refining them. Use AI as your mock interviewer.</p>
          <AiPromptBlock>{`I want you to interview me for an [X ROLE] at [Y COMPANY]. Start by asking me questions based on the job description below.

And then, after I answer, please provide constructive criticism on my answer - and ask the next question.

Here is the job description: [JOB DESCRIPTION]`}</AiPromptBlock>

          {/* 5.3 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.3 Practice Delivering Your Answers Out Loud</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Knowing your answer on paper is very different from saying it out loud. Speaking your answers helps you internalize the stories so they feel natural rather than memorized.</p>
          <ActionStep>Use Claude or ChatGPT's voice mode to practice out loud. Record yourself answering and play it back. Listen for filler words ("um," "like," "so"), rambling, and unclear structure.</ActionStep>
          <ProTip>Your answers should be 60-90 seconds for standard questions and no more than 2 minutes for behavioral stories. If you're going longer, you're losing the interviewer's attention. Practice with a timer.</ProTip>

          {/* 5.4 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">5.4 Research the Company Before Every Interview</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Before your interview, shift your mindset from answering questions to understanding the company's problems.</p>
          <AiPromptBlock>{`1) What are the 5 biggest challenges and opportunities facing [X COMPANY]?

2) What's a 90-day action plan to tackle the job described in this job description: [PASTE JOB DESCRIPTION]`}</AiPromptBlock>
          <RecruiterCheck>The candidates who stand out in interviews are the ones who ask informed questions. When a candidate says "I noticed you recently expanded into the Japanese market. What's been the biggest challenge in localizing the product?" That tells me they've done real research. When a candidate asks "So what does your company do?" That tells me they haven't. The difference in impression is enormous.</RecruiterCheck>

          <CommonMistake title="Common Mistake: Memorizing Answers Word-for-Word">
            <p>Don't memorize scripts. Memorize your key stories and the structure (Challenge-Action-Result). Then practice delivering them naturally in different ways. If you memorize word-for-word, the moment an interviewer asks a slightly different version of the question, you freeze. If you know your stories, you can adapt to any phrasing.</p>
          </CommonMistake>

          <p className="text-foreground font-medium">Next up: You're interview-ready. One step left: making sure you get paid what you're worth.</p>
        </div>
      </section>

      {/* ═══════════════ SECTION 6: NEGOTIATE ═══════════════ */}
      <section id="negotiate" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Negotiate Like a Robot</h2>
              <p className="text-sm text-muted-foreground flex items-center gap-1.5"><Clock className="w-4 h-4" /> 30 min per round</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">Most people don't negotiate at all. They get an offer, feel relieved, and accept immediately. This is leaving money on the table. In my experience as a recruiter, I can tell you that almost every offer has room to move. The company expects you to negotiate.</p>
          <p className="text-muted-foreground leading-relaxed">The key is to negotiate with data, not with emotion. I call this section "Negotiate Like a Robot." Remove your feelings from the equation and let the facts do the talking.</p>

          {/* 6.1 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.1 Evaluate Offers Against Your Goals</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Before you negotiate, step back and look at each offer through the lens of your long-term goals. Don't choose based only on salary or brand.</p>
          <AiPromptBlock>{`My career goal is [X], my skills are [Y], and my interests are [Z].

Based on this context, please evaluate the following job opportunities to help me determine which is the best fit:

[INSERT OFFERS]`}</AiPromptBlock>

          {/* 6.2 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.2 Background Check Your Future Boss</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Most people skip this step. Don't. A great job with a terrible manager is a terrible job. Before you accept, do your research.</p>
          <ActionStep>
            <ol className="list-decimal list-inside space-y-2">
              <li>Find former employees of the company on LinkedIn.</li>
              <li>Filter for people from your prospective team.</li>
              <li>Filter for people with something in common (same school, mutual connections).</li>
              <li>Send them a short, polite message asking about their experience on the team.</li>
            </ol>
          </ActionStep>
          <ProTip>Ask specifically: "What was the management style like?" and "Why did you leave?" The answers to these two questions tell you more about your future experience than any Glassdoor review.</ProTip>

          {/* 6.3 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.3 Frame the Negotiation Early</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">Don't wait until the end to talk about expectations. As soon as you know you're interviewing with multiple companies, let the recruiter know.</p>
          <AiPromptBlock>{`Generate a short, conversational email to the recruiter at [X COMPANY], letting them know about my other interviews/offers at [Y COMPANY] and [Z COMPANY].

Ask them if, in light of these competitive opportunities, they can do ABC (accelerate their interview process, make a final decision sooner, or offer a more competitive package).`}</AiPromptBlock>
          <RecruiterCheck>When a candidate tells me they have competing offers, it changes my urgency level immediately. I push harder internally to speed up the process and get the best possible package approved. If you don't tell me about other offers, I have no reason to rush or go above the initial offer. You're not being aggressive by sharing this. You're giving me the information I need to fight for you internally.</RecruiterCheck>

          {/* 6.4 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.4 Reanchor with Compensation Data</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">When you receive an offer, start by thanking the recruiter. Then share the facts.</p>
          <AiPromptBlock>{`Generate a short, conversational email to my recruiter, thanking them for their kind job offer ([INSERT OFFER]), and letting them know that I'd like to explore what's possible based on the following facts:

- Current Salary: ____
- Other Offers: ____
- Pay Research for Role/Location: ____`}</AiPromptBlock>
          <ProTip>Use data from Glassdoor, Levels.fyi, Salary.com, or local salary surveys. For Taiwan-specific salary data, check 104.com.tw salary reports, CakeResume salary insights, and Glassdoor Taiwan. When you say "Based on my research, the market range for this role in Taipei is X to Y," you're giving the recruiter ammunition to take to the hiring manager. Without data, they have nothing to justify an increase.</ProTip>

          {/* 6.5 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.5 Rebut the Second Offer</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">If the company comes back with a second offer that still doesn't feel right, respond with confidence. Keep your tone friendly and calm.</p>
          <AiPromptBlock>{`I asked my recruiter to match this offer: [X].

They came back with the following message: [Y].

Generate a short, conversational response that asks them to do better, given my opportunities at these other firms: [Z]`}</AiPromptBlock>

          {/* 6.6 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.6 Change the Focus If Salary Won't Move</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">If salary is not moving, shift the conversation. There are many ways to win value beyond base pay.</p>
          <AiPromptBlock>{`Generate a short, conversational email to my recruiter offering a concession of [X salary] in exchange for [Y benefit].`}</AiPromptBlock>
          <div className="bg-card border border-border rounded-xl p-5 text-sm text-muted-foreground my-4">
            <p className="font-semibold text-foreground mb-3">Negotiable items beyond salary:</p>
            <ul className="space-y-1.5">
              <li>• Sign-on bonus</li>
              <li>• Equity / stock options</li>
              <li>• Relocation support</li>
              <li>• Job title upgrade</li>
              <li>• Remote work flexibility</li>
              <li>• Additional vacation days</li>
              <li>• Earlier start date / later start date</li>
              <li>• Professional development budget</li>
              <li>• Performance review timeline (earlier review = earlier raise opportunity)</li>
            </ul>
          </div>

          {/* 6.7 */}
          <h3 className="font-heading text-xl text-foreground font-semibold pt-4">6.7 Close the Deal</h3>
          <p className="text-muted-foreground leading-relaxed text-sm">When you're ready to finalize the offer, send a simple message. Tell the recruiter you want to accept and turn down your other opportunities, but you can only do that if they can meet one final condition.</p>
          <AiPromptBlock>{`Generate a short, conversational email to my recruiter saying I'm ready to accept and turn down my other offers, but I need them to meet [ONE FINAL CONDITION] to make it happen.`}</AiPromptBlock>
          <RecruiterCheck>This is the most powerful move in negotiation. When a candidate tells me "I want to sign with you, I'm ready to turn down my other offers, I just need X to make it work," I go to my hiring manager and fight for it. I know that if we give this one thing, we close the candidate. That certainty makes internal approvals much easier to get.</RecruiterCheck>

          <CommonMistake title="Common Mistake: Not Negotiating At All">
            <p>I've seen countless candidates accept offers without even asking. The company had budget to offer more. The hiring manager expected a counteroffer. But the candidate was so relieved to get the offer that they said yes on the spot. Even a polite "Is there any flexibility on the base salary?" can result in a 5-15% increase. That's thousands of dollars per year, compounding over your entire career. All from one sentence.</p>
          </CommonMistake>
        </div>
      </section>

      {/* ═══════════════ SECTION 7: AI MISTAKES ═══════════════ */}
      <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">The 7 Biggest AI Job Search Mistakes</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed">After helping hundreds of job seekers and reviewing thousands of applications, these are the AI-specific mistakes I see most often.</p>

          {[
            { title: "Mistake 1: Copy-pasting AI output without editing", body: "Recruiters can spot AI-generated text. It's too polished, too generic, and lacks the specific details only you would know. Always add your own numbers, tools, team sizes, and outcomes. If it could belong to anyone, it belongs to no one." },
            { title: "Mistake 2: Using AI as a replacement instead of a starting point", body: "AI gives you a draft. That's it. You still need to rewrite, personalize, and pressure-test everything it produces. The best candidates use AI to get 70% of the way there, then add the 30% that makes it theirs." },
            { title: "Mistake 3: Running prompts without feeding AI your real data", body: "The prompts in this guide ask for your resume, your skills, your goals. If you leave those fields blank or vague, the AI output will be vague too. The more specific your input, the more useful the output." },
            { title: "Mistake 4: Trusting AI's keyword suggestions without checking real job postings", body: "AI-generated keyword lists are a starting point, not the final answer. Always cross-check against five to ten real job postings for your target role. The overlap between AI suggestions and real postings is where the gold is." },
            { title: "Mistake 5: Letting AI write your interview answers", body: "AI can help you structure answers using Challenge-Action-Result. But the stories need to come from your real experience. If an interviewer asks a follow-up question and you can't elaborate, they'll know you didn't live the story." },
            { title: "Mistake 6: Using the same AI-generated resume for every application", body: "AI makes it fast to create tailored versions. There's no excuse for sending the same resume to every job when you can generate a customized version in 15 minutes." },
            { title: "Mistake 7: Negotiating with AI-drafted emails you haven't read out loud", body: "AI can draft negotiation emails. But tone matters more than words in negotiation. Read every email out loud before sending. If it sounds robotic or aggressive, rewrite it in your own voice." },
          ].map((item, i) => (
            <div key={i} className="bg-card border border-border rounded-xl p-5 space-y-2">
              <h3 className="font-heading text-lg text-foreground font-semibold flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-gold flex-shrink-0" />
                {item.title}
              </h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SECTION 8: MINDSET SHIFTS ═══════════════ */}
      <section id="mindset" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Mindset Shifts: Old Thinking vs. New Thinking</h2>
            </div>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-4 text-muted-foreground font-semibold">Old Thinking</th>
                  <th className="text-left py-3 px-4 text-gold font-semibold">New Thinking</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                {[
                  ['"I\'ll figure out what I want later."', "Clarity first. A focused search is 10x faster."],
                  ['"My resume should list all my duties."', "Your resume should prove your impact with numbers."],
                  ['"I\'ll apply to 100 jobs and hope for the best."', "Apply to 20 jobs with tailored materials and a referral for each."],
                  ['"I should wait for the perfect job to appear."', "Set up alerts, apply same-day, and create your own luck."],
                  ['"Networking is awkward and doesn\'t work."', "One referral email is worth 50 cold applications."],
                  ['"Negotiating is rude or risky."', "Recruiters expect it. Not negotiating leaves money on the table."],
                  ['"AI will write everything for me."', "AI drafts. You refine. The human touch makes it yours."],
                  ['"I just need to get any job right now."', "The wrong job costs you more time than a focused search."],
                ].map(([old, newT], i) => (
                  <tr key={i} className="border-b border-border/50">
                    <td className="py-3 px-4">{old}</td>
                    <td className="py-3 px-4 text-foreground font-medium">{newT}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ═══════════════ SECTION 9: CHECKLIST ═══════════════ */}
      <section id="checklist" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Quick Reference: The Complete AI Job Search Checklist</h2>
            </div>
          </div>

          {[
            { title: "Stage 1: Find Your Path", anchor: "#find-path", items: [
              "Generate 10 potential job titles based on your skills and interests → 1.1",
              "Explore a typical day for each role → 1.2",
              "Rank roles based on goals and qualifications → 1.3",
              "Test your fit with three experiments per role → 1.4",
              "Connect with alumni in your target roles → 1.5",
            ]},
            { title: "Stage 2: Build Your LinkedIn Defense", anchor: "#linkedin", items: [
              "Write a keyword-rich headline (220 characters max) → 2.1",
              "Set location to where you want to work → 2.2",
              "Add the top 20 skills for your target role → 2.3",
              "Embed keywords in experience bullet points → 2.4",
              "Write a structured About section (2,000 characters) → 2.5",
              "Identify and start building any missing skills → 2.6",
              'Turn on "Open to Work" (Recruiters Only) → 2.7',
              "Grow network to 500+ connections → 2.8",
              "Follow target companies → 2.9",
              "Upload a professional profile photo → 2.10",
              "Request two to three recommendations → 2.11",
              "Add a cover photo → 2.12",
              "Respond to all InMails → 2.13",
            ]},
            { title: "Stage 3: Build Your Resume", anchor: "#resume", items: [
              "Download a clean, ATS-friendly template → 3.1",
              
              "Create a separate version for each target job title → 3.2",
              "Add desired job title at the top → 3.3",
              "Update location to target city → 3.4",
              "Include relevant non-work experience → 3.5",
              "Use year dates for short stints → 3.6",
              "Add organizational context for unknown companies → 3.7",
              "Clarify vague internal job titles → 3.8",
              "Pull top 20 keywords from job descriptions → 3.9",
              "Write 3 achievement-based bullets per role → 3.10",
              "Match keywords to achievements → 3.12",
              "Build complete, polished bullets → 3.13",
              "Review and rate bullet quality → 3.14",
              "Aim for 50% keyword match rate → 3.15",
              "Add education bullets → 3.16",
              "Review and rate education bullet quality → 3.17",
              "Complete and categorize skills section → 3.18",
              "Write a focused summary → 3.19",
            ]},
            { title: "Stage 4: Find and Apply", anchor: "#apply", items: [
              "Set up daily job alerts for target and alternative titles → 4.1",
              "Apply same-day when new roles match → 4.2",
              "Write a cover letter (when needed) → 4.3",
              "Customize cover letter for each employer → 4.5",
              "Find and request a referral for every application → 4.6",
            ]},
            { title: "Stage 5: Crush Your Interviews", anchor: "#interview", items: [
              "Generate the 10 most likely interview questions → 5.1",
              "Write CAR-format answers for each → 5.1",
              "Practice answering in writing with AI feedback → 5.2",
              "Practice answering out loud (aim for 60-90 seconds per answer) → 5.3",
              "Research the company's top 5 challenges → 5.4",
              "Prepare a 90-day action plan for the role → 5.4",
              "Prepare thoughtful questions to ask the interviewer → 5.4",
            ]},
            { title: "Stage 6: Negotiate Like a Robot", anchor: "#negotiate", items: [
              "Evaluate offers against career goals → 6.1",
              "Background check your future boss → 6.2",
              "Frame the negotiation early (share competing offers) → 6.3",
              "Reanchor with compensation data → 6.4",
              "Rebut the second offer if needed → 6.5",
              "Shift focus to non-salary items if base is fixed → 6.6",
              "Close with a conditional acceptance → 6.7",
            ]},
          ].map((stage, si) => (
            <div key={si} className="bg-card border border-border rounded-xl p-5 space-y-3">
              <h3 className="font-heading text-lg text-gold font-semibold">
                <a href={stage.anchor} className="hover:underline underline-offset-2 transition-colors">{stage.title}</a>
              </h3>
              <ul className="space-y-2">
                {stage.items.map((item, j) => {
                  const refMatch = item.match(/→\s*(\d+)\.\d+$/);
                  const isChecked = checklistState[si]?.[j] ?? false;
                  return (
                    <li key={j} onClick={() => toggleChecklist(si, j)} className={`flex items-start gap-2 text-sm cursor-pointer group transition-opacity ${isChecked ? "opacity-60" : ""}`}>
                      <span className={`w-5 h-5 rounded border-2 flex-shrink-0 mt-0.5 flex items-center justify-center transition-colors ${isChecked ? "bg-gold border-gold text-background" : "border-border group-hover:border-gold/60"}`}>
                        {isChecked && <Check className="w-3 h-3" />}
                      </span>
                      <span className={isChecked ? "line-through text-muted-foreground" : "text-muted-foreground"}>
                        {refMatch ? (
                          <>{item.replace(/→\s*\d+\.\d+$/, "")} <a href={stage.anchor} onClick={e => e.stopPropagation()} className="text-gold hover:underline transition-colors">→ {refMatch[0].replace("→ ", "")}</a></>
                        ) : item}
                      </span>
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ═══════════════ SECTION 11: PROMPT LIBRARY ═══════════════ */}
      <section id="prompt-library" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Complete Prompt Library</h2>
              <p className="text-muted-foreground mt-2 text-sm">Every AI prompt from this guide in one place. Expand a stage, then copy any prompt directly into ChatGPT.</p>
            </div>
          </div>

          <CopyAllPromptsButton lang="en" />

          <div className="space-y-3">
            {AI_GUIDE_PROMPTS.map(stage => (
              <Collapsible key={stage.stage} title={`Stage ${stage.stage}: ${stage.titleEn}`}>
                <div className="space-y-1 pt-2">
                  {stage.prompts.map((p, i) => (
                    <div key={i}>
                      <p className="text-xs font-semibold text-muted-foreground mb-1">{p.step}</p>
                      <AiPromptBlock>{p.promptEn}</AiPromptBlock>
                    </div>
                  ))}
                </div>
              </Collapsible>
            ))}
          </div>
        </div>
      </section>



      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl space-y-6">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Additional Resources</h2>
            </div>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-4">
            <h3 className="font-heading text-lg text-foreground font-semibold">For deeper dives into each stage, check out my other free guides:</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li><Link to="/resume-guide" className="text-gold hover:underline font-medium">Resume Guide:</Link> How to write a resume that passes every test (based on Dan Clay's framework)</li>
              <li><Link to="/interview-preparation-guide" className="text-gold hover:underline font-medium">Interview Playbook:</Link> A recruiter's complete guide to winning interviews (based on Thea Kelley's system)</li>
              <li><Link to="/hr-interview-guide" className="text-gold hover:underline font-medium">Recruiter Screening Guide:</Link> How to pass the recruiter phone screen and advance to the hiring manager</li>
              <li><Link to="/linkedin-guide" className="text-gold hover:underline font-medium">LinkedIn Guide:</Link> Optimize your profile so recruiters find you first</li>
              <li><Link to="/pivot-method-guide" className="text-gold hover:underline font-medium">Pivot Method Guide:</Link> A structured framework for career transitions</li>
              <li><Link to="/resume-analyzer" className="text-gold hover:underline font-medium">Resume Analyzer:</Link> Get instant AI-powered feedback on your resume</li>
              <li><Link to="/salary-starter-kit" className="text-gold hover:underline font-medium">Salary Starter Kit:</Link> Research compensation data before you negotiate</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">The book behind this guide:</h3>
            <p className="text-sm text-muted-foreground"><em>Career Coach GPT</em> by Jeremy Schifeling</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 space-y-3">
            <h3 className="font-heading text-lg text-foreground font-semibold">Email lookup for referrals:</h3>
            <p className="text-sm text-muted-foreground"><a href="https://hunter.io" target="_blank" rel="noopener noreferrer" className="text-gold hover:underline">Hunter.io</a></p>
          </div>
        </div>
      </section>

      <section className="py-12 px-5 md:px-6">
        <div className="container mx-auto max-w-3xl">
          <GuideShareButtons />
        </div>
      </section>

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default AiJobSearchGuide;