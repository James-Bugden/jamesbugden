import { FileText, Clock, Linkedin, Briefcase, AlertTriangle, CheckCircle2, XCircle, ChevronDown, Menu, ArrowRight, Shield, Target, MessageSquare } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import { useState, useEffect } from "react";
import JobOfferScorecard from "@/components/job-offer/JobOfferScorecard";

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
  { id: "before-offer", label: "01 · Before the Offer" },
  { id: "when-offer", label: "02 · When the Offer Comes" },
  { id: "evaluate", label: "03 · 6 Things to Evaluate" },
  { id: "need-job", label: "04 · If You Need the Job" },
  { id: "multiple", label: "05 · Multiple Offers" },
  { id: "competitor", label: "06 · From a Competitor" },
  { id: "counteroffers", label: "07 · Counteroffers" },
  { id: "decline", label: "08 · How to Decline" },
  { id: "accept", label: "09 · How to Accept" },
  { id: "scorecard", label: "10 · The Scorecard" },
  { id: "flags", label: "Red & Green Flags" },
  { id: "scripts", label: "Scripts & Templates" },
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

const scorecardCategories = [
  { key: "compensation", label: "Compensation", questions: ["Is the base salary at or above market rate for my role, level, and city?", "Do I understand the full compensation package (bonus, equity, benefits)?", "Have I compared the total value, not the headline salary?"] },
  { key: "job-content", label: "Job Content & Daily Work", questions: ["Do I know what a typical week looks like in this position?", "Are the success metrics clear and achievable?", "Will this work energize me or drain me?"] },
  { key: "boss", label: "My Future Boss", questions: ["Did the hiring manager engage with me during the interview process?", "Do I understand their management style?", "Do I trust this person to support my growth?"] },
  { key: "culture", label: "Company Culture", questions: ["Did the interview process feel organized and respectful?", "Do current employees stay for more than 2 years on average?", "Does the onboarding process show investment in new hires?"] },
  { key: "benefits", label: "Benefits & Work-Life Balance", questions: ["Have I calculated the total value of the benefits package?", "Does the PTO and flexibility policy match my life needs?", "Are there growth benefits (training budget, tuition, conferences)?"] },
  { key: "growth", label: "Growth Potential", questions: ["Will this role help me reach my 3-5 year career goals?", "Do employees get promoted internally?", "Is there a professional development budget?"] },
];

const JobOfferGuide = () => {
  useTrackGuideProgress("job-offer");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Got a Job Offer? How to Decide Without Regret | James Bugden"
        description="A recruiter's complete guide to evaluating, accepting, or declining a job offer. Interactive scorecard, word-for-word scripts, and the 6 things to evaluate beyond salary."
        path="/job-offer-guide"
      />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</Link>
          <div className="flex items-center gap-3">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="pt-28 md:pt-36 pb-14 md:pb-20 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <Briefcase className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">Free Career Resource</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            Got a Job Offer?<br className="hidden sm:block" /> How to Decide Without Regret
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">A Guide to Evaluating, Accepting, or Walking Away</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">30 min read</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">Based on 13 Harvard Business Review articles on job offers, negotiation, and career transitions</p>
        </div>
      </section>

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            You got the offer. Now comes the hard part.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Many people spend more time picking a restaurant for dinner than they spend evaluating a job offer. They see the salary number, feel the rush of excitement, and say yes the same day.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Then six months later they want out.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I review offers from the other side of the table. I extend them. I watch people accept too fast, negotiate poorly, and decline in ways they regret.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide breaks down the full offer decision process. Step by step. From the moment you get the call to the moment you sign, decline, or walk away.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Every section includes what the company is thinking on their end. Because knowing what happens on the other side of the table changes everything.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            This guide draws from 13 Harvard Business Review articles by researchers and career experts. I've filtered their advice through a recruiter's lens and added what they miss: the hiring side of the equation.
          </p>
        </div>
      </section>

      {/* Section 1: Before the Offer */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section id="before-offer" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Before the Offer Arrives</h2>
              <p className="text-muted-foreground text-lg">Start evaluating during interviews</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Most guides start when the offer lands. That's too late.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Your decision starts during the interview process. Every conversation with the hiring manager, recruiter, and team members is a chance to gather information.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">By the time the offer call comes, you should already have a strong sense of whether this role is right for you.</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">What to Evaluate During Final Rounds</h3>
            <p className="text-foreground font-semibold text-sm mb-2">Ask the hiring manager:</p>
            <ul className="space-y-2 mb-4">
              {["\"Walk me through a typical week in this position.\"", "\"What does success look like in the first 6 months?\"", "\"What happened to the last person in this role?\"", "\"What kind of employee thrives on your team?\""].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-foreground font-semibold text-sm mb-2">Ask the recruiter:</p>
            <ul className="space-y-2">
              {["\"What's the timeline for a decision?\"", "\"What does the full compensation package look like, beyond base salary?\"", "\"How many candidates are in the final round?\""].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">These questions give you two things. First, information to make your decision. Second, signals about what the company values.</p>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mb-4">
            <h4 className="text-gold font-semibold mb-2">My Take: Reading the Signals Before an Offer</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">Pay attention to how the recruiter communicates after final interviews. If they call to check in, ask about your interest level, and give you positive feedback from the team, an offer is coming.</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">This is the time to start your research. Not after the offer arrives.</p>
            <p className="text-muted-foreground text-sm leading-relaxed">If the recruiter goes quiet for days after a final interview, the company is either deciding between candidates or the role is on hold. Ask directly: "Where are things in the process?" You have the right to know.</p>
          </div>
        </section>
      </main>

      {/* Section 2: When the Offer Comes — full width alt bg */}
      <section id="when-offer" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">When the Offer Comes In</h2>
              <p className="text-muted-foreground text-lg">The call arrives. Here's what to do and what to avoid.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Express Excitement. Then Ask for Time.</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">When a recruiter calls with an offer, your first instinct is to react. Say yes. Say no. Start negotiating on the spot.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Don't.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Ask for time. Up to one week is reasonable. Most companies expect this. A good recruiter will respect the request.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Here's why the timeline matters. The company spent weeks (sometimes months) interviewing candidates. They chose you. They want you. An extra 5-7 days will not change their mind.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">But a rushed decision will change your life.</p>

          <div className="bg-executive-green rounded-xl p-5 md:p-6 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-3 font-semibold">Try This:</p>
            <p className="text-cream/90 text-sm italic leading-relaxed">"Thank you so much for the offer. I'm excited about the role and the team. I want to give this the thought and attention the decision deserves. Would I be able to take a few days to review everything and get back to you by [specific day]?"</p>
            <p className="text-cream/50 text-xs mt-3">Two things to notice. First, you lead with gratitude and excitement. Second, you give a specific date. Not "a few days." A real day on the calendar.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Ask the Right Questions on the Offer Call</h3>
          <div className="space-y-4 mb-8">
            {[
              { q: "\"How many other candidates are you considering for this role?\"", a: "This tells you how much leverage you have. If you're the only finalist, the company is more flexible. If there's a strong backup candidate, the company has less patience for a long decision." },
              { q: "\"What was the team's feedback on me from the interviews?\"", a: "The answer shows you where you stand. Strong positive feedback means the company is invested in you. Mixed feedback means they have reservations and a backup plan." },
              { q: "\"When do you need a final answer?\"", a: "This confirms the timeline. If the recruiter says \"end of the week,\" you know your window. If they say \"take your time,\" you have more room to evaluate." },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-2">{item.q}</p>
                <p className="text-muted-foreground text-sm">{item.a}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">These questions feel bold. But the recruiter already decided to hire you. You're not risking the offer by asking. You're showing you're thoughtful and strategic.</p>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mb-8">
            <h4 className="text-gold font-semibold mb-2">My Take: What Happens on Their End During Your Decision</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">The recruiter already told the hiring manager you're their top pick. The team is excited. They put other candidates on hold.</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">Now they wait.</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">During your decision time, the recruiter will: check in with you once or twice (this is normal, not pressure), keep backup candidates warm, prepare to answer your follow-up questions, and start thinking about onboarding if you say yes.</p>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">A recruiter who pressures you to decide in 24 hours is waving a red flag. Healthy companies give you space.</p>
            <p className="text-muted-foreground text-sm leading-relaxed">But here's the flip side. If the recruiter tells you there's a strong second-place candidate and a tight timeline, take the signal seriously. Give the recruiter a clear timeline and stick to your commitment.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">What NOT to Do</h3>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <ul className="space-y-3 text-foreground text-sm">
              <li><strong>Don't go silent.</strong> Radio silence makes recruiters nervous. If you need more time, say so.</li>
              <li><strong>Don't sound critical or suspicious</strong> when asking questions about the offer. Stay positive. Stay curious.</li>
              <li><strong>Don't accept on the spot</strong> out of excitement. Sleep on the decision. Talk to people you trust. Run the numbers.</li>
              <li><strong>Don't fabricate competing offers</strong> to create false urgency. Be honest. If you have other interviews in progress, say so.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 3: 6 Things to Evaluate */}
      <section id="evaluate" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 6 Things to Evaluate</h2>
              <p className="text-muted-foreground text-lg">Beyond salary</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-8">Most people focus on one number: the base salary. But salary is one piece of a much bigger picture.</p>

          {/* 1. Salary */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">1. Salary and Total Compensation</h3>
            <p className="text-muted-foreground text-sm mb-3">Start with research. Look up the role, level, and location on Glassdoor, Indeed, Levels.fyi, and LinkedIn Salary.</p>
            <p className="text-foreground text-sm font-semibold mb-2">Calculate the full compensation package:</p>
            <ul className="space-y-2 mb-4">
              {["Base salary", "Bonus structure (and how realistic the target is)", "Equity or stock options (and the vesting schedule)", "Signing bonus", "Retirement matching (401k, pension, superannuation)", "Health insurance value"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">One HBR article found about three-fourths of executives who received outside offers didn't fully understand how the new compensation compared to their current pay.</p>
          </div>

          {/* 2. Job Content */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">2. Job Content and Daily Work</h3>
            <ul className="space-y-2 mb-4">
              {["Will the daily tasks energize you or drain you?", "Do you want to manage people, or work as an individual contributor?", "Does the role match the kind of projects you want to work on?", "Are the success metrics clear and achievable?"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">Job descriptions are often outdated. The role on paper and the role in practice differ more than you'd expect. Ask the hiring manager directly: "Walk me through a typical week in this position."</p>
          </div>

          {/* 3. Future Boss */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">3. Your Future Boss</h3>
            <p className="text-muted-foreground text-sm mb-3">Your boss will shape your daily experience more than the company brand, the salary, or the office space.</p>
            <p className="text-muted-foreground text-sm mb-3">Have a direct conversation with your future manager about their management style, how they measure success, what kind of employee thrives under them, and how they handle disagreements.</p>
            <p className="text-muted-foreground text-sm">Pay attention to the interview experience. Did your future boss show up on time? Were they engaged? How a manager behaves in the interview is the best version of how they'll behave on the job.</p>
          </div>

          {/* 4. Company Culture */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">4. Company Culture</h3>
            <p className="text-muted-foreground text-sm mb-3">Culture is hard to evaluate from the outside. But there are signals.</p>
            <ul className="space-y-2 mb-4">
              {["How the company handled scheduling your interviews (organized or chaotic?)", "Whether they sent late-night or weekend emails during the process", "How long employees stay (check LinkedIn for average tenure)", "What happened to the last person in this role"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm mb-4">Ask current employees: "What's one thing you wish you knew before joining?"</p>
            <Collapsible title="How to reach current employees">
              <div className="space-y-3 mt-3 text-sm text-muted-foreground">
                <p><strong className="text-foreground">Through your referral.</strong> If someone referred you, ask them directly.</p>
                <p><strong className="text-foreground">Through LinkedIn connections.</strong> Search for people who work at the company in similar roles.</p>
                <p><strong className="text-foreground">Ask the hiring manager.</strong> "I'd love to talk to someone on the team to get a better sense of the day-to-day."</p>
                <p><strong className="text-foreground">Request a team meet-and-greet.</strong> Ask to spend a few hours with the team before accepting.</p>
                <p><strong className="text-foreground">Ask about the onboarding process.</strong> Companies who invest in structured onboarding invest in your success.</p>
              </div>
            </Collapsible>
          </div>

          {/* 5. Benefits */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">5. Benefits and Full Package</h3>
            <div className="grid sm:grid-cols-2 gap-3 mb-4">
              {[
                { cat: "Health", items: "Medical, dental, vision, mental health coverage, fertility benefits" },
                { cat: "Financial", items: "Pension, equity, stock options, profit sharing, disability and life insurance" },
                { cat: "Growth", items: "Professional development budget, training programs, tuition reimbursement" },
                { cat: "Work-Life", items: "PTO policy, flexible hours, remote/hybrid options, parental leave" },
              ].map((b) => (
                <div key={b.cat} className="bg-background border border-border rounded-lg p-3">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{b.cat}</p>
                  <p className="text-muted-foreground text-xs">{b.items}</p>
                </div>
              ))}
            </div>
            <Collapsible title="The math most people skip">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-foreground">Offer A:</strong> $110,000 base salary. 2 weeks PTO. No retirement matching. No professional development budget. No remote work.</p>
                <p><strong className="text-foreground">Offer B:</strong> $100,000 base salary. 5 weeks PTO. 6% retirement matching ($6,000/year). $2,000 professional development budget. 2 days remote per week.</p>
                <p>Offer B is worth more. The extra PTO alone has a dollar value (3 extra weeks at your daily rate ≈ $5,700). Add the retirement matching and development budget. Offer B's total compensation is roughly $113,700 in value. And you get flexibility Offer A doesn't provide.</p>
                <p className="font-semibold text-foreground">Calculate the total value, not the headline number.</p>
              </div>
            </Collapsible>
          </div>

          {/* 6. Growth */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-3">6. Growth Potential</h3>
            <p className="text-muted-foreground text-sm mb-3">Will this job move you closer to where you want to be in 3-5 years?</p>
            <p className="text-muted-foreground text-sm mb-3">Ask the hiring manager for examples of employees who have advanced in the organization. Ask about promotion timelines. Ask about the professional development budget.</p>
            <p className="text-muted-foreground text-sm">If most employees leave within 18-24 months, the company is a stepping stone, not a destination. Know the difference before you accept.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Need the Job */}
      <section id="need-job" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">What If You Need the Job?</h2>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Sometimes you're not choosing between two great options. Sometimes you need the income. The bills are real. The savings account is shrinking.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Be honest with yourself about whether you're evaluating the offer clearly, or talking yourself into a role because you feel you have no choice.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">If you need the job, take the job. But go in with your eyes open.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Know what you're accepting and what you're compromising on. Set a timeline. Tell yourself: "I'll commit to this role for 12 months, give my best work, build skills, and expand my network. Then I'll reassess."</p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4">
            <p className="text-foreground font-medium text-sm">A stepping-stone role is fine. A panic decision is not. <span className="text-gold font-semibold">The difference is awareness.</span></p>
          </div>
        </div>
      </section>

      {/* Section 5: Multiple Offers */}
      <section id="multiple" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Handling Multiple Offers</h2>
              <p className="text-muted-foreground text-lg">And competing timelines</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 1: Buy Time (Respectfully)</h3>
              <p className="text-muted-foreground text-sm">Ask Company A for a week to decide. If you need more time, ask to meet additional team members or take an office tour. Schedule the meeting a week out. This extends your timeline without raising suspicion.</p>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 2: Speed Up Company B</h3>
              <p className="text-muted-foreground text-sm mb-3">Contact Company B's recruiter. Tell them you have another offer in hand but they remain your first choice.</p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-foreground text-sm italic">"I want to be transparent. I received an offer from another company, but your role is my top choice. Am I still a strong candidate? Is there anything I should do to move forward?"</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 3: Don't Ghost Anyone</h3>
              <p className="text-muted-foreground text-sm mb-3">If you're interviewing at companies you're no longer interested in, call or email those recruiters now. Don't disappear.</p>
              <div className="bg-card border border-gold/30 rounded-xl p-4">
                <p className="text-gold text-xs uppercase font-semibold mb-1">My Take</p>
                <p className="text-muted-foreground text-sm">Recruiters talk to each other. Industries are small. If you ghost three companies during one job search, word gets around. Take 5 minutes to close the loop professionally.</p>
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 4: Know the Risks of Accepting Then Backing Out</h3>
              <p className="text-muted-foreground text-sm mb-3">If you accept an offer then back out, you burn the bridge with Company A. You also burn the bridge with the recruiter, the hiring manager, and everyone who interviewed you.</p>
              <p className="text-muted-foreground text-sm font-semibold">Accept an offer when you're ready to commit.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Section 6: Competitor */}
      <section id="competitor" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">When the Offer Comes from a Competitor</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Check Your Agreements First</h3>
              <p className="text-muted-foreground text-sm mb-3">Review your employment contract. Look for noncompete clauses, non-solicitation agreements, and confidentiality agreements.</p>
              <p className="text-muted-foreground text-sm">If you signed any restrictive agreements, consult with a lawyer privately before you proceed. Enforcement varies by country and region.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Think Through What You Know</h3>
              <p className="text-muted-foreground text-sm mb-3">Take stock of the confidential information you have access to. Customer lists. Pricing strategies. Product roadmaps.</p>
              <p className="text-muted-foreground text-sm">An ethical company will welcome a conversation about handling this responsibly. If the new company pushes you to share confidential information during the interview process, walk away.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Consider Your Reputation</h3>
              <p className="text-muted-foreground text-sm mb-3">Think about your mentor, your current team, and your professional network. How will they view this move?</p>
              <p className="text-muted-foreground text-sm">Talk to a trusted mentor or advisor outside both companies. Get a long-term perspective before you decide.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">How to Tell Your Current Employer</h3>
              <p className="text-muted-foreground text-sm mb-3">Be honest. Keep the conversation professional. Lead with gratitude. Prepare for your employer to ask you to leave immediately.</p>
              <div className="bg-card border border-gold/30 rounded-xl p-4 mt-3">
                <p className="text-gold text-xs uppercase font-semibold mb-1">My Take</p>
                <p className="text-muted-foreground text-sm">Companies who lose employees to competitors always want to know two things. "Is this about money?" and "Who approached who?" Be honest. Lying about how the opportunity developed will damage your credibility.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Section 7: Counteroffers */}
      <section id="counteroffers" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Counteroffers</h2>
              <p className="text-muted-foreground text-lg">Why you should (almost) never accept</p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">The Numbers Tell the Story</p>
            <div className="grid sm:grid-cols-3 gap-4">
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">~40%</p>
                <p className="text-cream/70 text-xs">of senior executives agree accepting a counteroffer hurts your career</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">5-25%</p>
                <p className="text-cream/70 text-xs">estimated success rate of counteroffers working out well</p>
              </div>
              <div className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                <p className="text-cream font-heading text-2xl font-bold mb-1">~80%</p>
                <p className="text-cream/70 text-xs">said accepting damages trust and reputation at the current company</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Why Counteroffers Fail</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Your boss now questions your loyalty. Colleagues resent the special treatment. The company starts looking for your replacement, even after you stay.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">You lose both ways.</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">The "Pre-Quit Discussion" Alternative</h3>
            <p className="text-muted-foreground text-sm mb-3">If you're unhappy in your current role, talk to your boss before you start interviewing. Have a frank conversation about your career path, your compensation, and what needs to change.</p>
            <p className="text-muted-foreground text-sm">If your boss reacts with anger or resentment to an honest conversation about your career, the relationship is already broken.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">The One Exception</h3>
            <p className="text-muted-foreground text-sm mb-3">If your boss reveals they were already planning a promotion or new role for you before you resigned, and the timeline and details are specific, the counteroffer is worth considering.</p>
            <p className="text-muted-foreground text-sm">But ask yourself honestly: "Would they have done this if I hadn't threatened to leave?" If the answer is no, the counteroffer is a band-aid.</p>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take: What Your Employer is Thinking</h4>
            <p className="text-muted-foreground text-sm">When a company makes a counteroffer, the decision is about cost. Replacing you costs 50-200% of your annual salary. The counteroffer is cheaper than a new search. The counteroffer is about retaining a resource. Not about your career growth.</p>
          </div>
        </div>
      </section>

      {/* Section 8: How to Decline */}
      <section id="decline" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How to Decline an Offer</h2>
              <p className="text-muted-foreground text-lg">Without burning bridges</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">Declining well protects your reputation. Declining poorly closes doors for years.</p>

          <div className="space-y-4 mb-8">
            {[
              { title: "Act fast.", desc: "Once you've decided, communicate within 24-48 hours." },
              { title: "Call first.", desc: "Don't send an email as your first move. Pick up the phone." },
              { title: "Use the 3-Part Framework:", desc: "Thank You, Rationale, Forward Momentum." },
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <GoldCheckBadge />
                <p className="text-foreground text-sm"><strong>{rule.title}</strong> {rule.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-semibold">The 3-Part Framework</p>
            <div className="grid sm:grid-cols-3 gap-4">
              {[
                { label: "THANK YOU", desc: "Genuine gratitude. Name specific things you appreciated." },
                { label: "RATIONALE", desc: "Clear, honest reason. Not vague. Not harsh." },
                { label: "FORWARD", desc: "Keep the door open. Offer to stay in touch." },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4 text-center">
                  <p className="text-gold text-xs font-bold uppercase mb-2">{item.label}</p>
                  <p className="text-cream/70 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Common reasons and how to frame them:</h3>
          <div className="space-y-3 mb-6">
            {[
              { reason: "External factors:", script: "\"After careful thought, the timing isn't right for my family to make this move.\"" },
              { reason: "Compensation:", script: "\"I appreciate the offer, but the compensation package doesn't meet where I need to be right now. I hope we'll have a chance to work together in the future.\"" },
              { reason: "Role fit:", script: "\"The more I learned about the role, the more I realized the day-to-day work doesn't align with my career direction. I'd rather be upfront about this now than underperform in the position.\"" },
              { reason: "Culture fit:", script: "\"I respect the team and the work you do. After reflection, I don't think the environment is the right fit for my working style.\"" },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.reason}</p>
                <p className="text-muted-foreground text-sm italic">{item.script}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take: How Recruiters Remember Candidates Who Decline</h4>
            <p className="text-muted-foreground text-sm mb-3">Recruiters remember two types of candidates: the ones who declined with class and the ones who ghosted or made the process painful.</p>
            <p className="text-muted-foreground text-sm">The candidates who call, give a clear reason, and express gratitude go back into the "A list." When a better-fit role opens in 6 months, the recruiter calls them first.</p>
          </div>
        </div>
      </section>

      {/* Section 9: How to Accept */}
      <section id="accept" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How to Accept</h2>
              <p className="text-muted-foreground text-lg">And set yourself up for Day 1</p>
            </div>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Confirm Everything in Writing</h3>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <p className="text-muted-foreground text-sm mb-3">Before you sign, make sure the offer letter includes:</p>
            <ul className="space-y-2 mb-4">
              {["Base salary", "Bonus structure and targets", "Equity details and vesting schedule", "Start date", "Job title and reporting structure", "Benefits enrollment date", "Any negotiated terms (signing bonus, extra PTO, remote work agreement)"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
            <p className="text-muted-foreground text-sm">If something was discussed verbally but isn't in the letter, ask for the addition before you sign. Verbal promises disappear. Written terms do not.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">Negotiate Your Start Date</h3>
            <p className="text-muted-foreground text-sm mb-3">Give yourself time between jobs. Most employment contracts require four weeks of notice. Add at least one to two weeks of personal time before you start.</p>
            <div className="bg-background border border-gold/30 rounded-lg p-3 mb-3">
              <p className="text-foreground text-sm italic">"I want to start fresh and fully energized. Taking two weeks to decompress means I'll show up ready to contribute from day one."</p>
            </div>
            <p className="text-muted-foreground text-sm">Most hiring managers will accept a 4-6 week start timeline. If the company demands you start in one week, ask why.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">Give Notice the Right Way</h3>
            <p className="text-muted-foreground text-sm mb-3">Don't give notice at your current job until: the offer letter is signed, the background check is complete, and the start date is confirmed.</p>
            <p className="text-muted-foreground text-sm">Tell your current manager in person or on a call. Keep the conversation short and professional. Then put your resignation in writing.</p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-3">Use the Gap to Ramp Up</h3>
            <ul className="space-y-2">
              {["Read any strategic documents or reports the new company shares with you", "Schedule meetings with your boss, key stakeholders, and direct reports for your first week", "Complete HR paperwork early so you spend day one working, not filling out forms", "Research your new team on LinkedIn"].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Section 10: Interactive Scorecard */}
      <section id="scorecard" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Job Offer Scorecard</h2>
              <p className="text-muted-foreground text-lg">Rate each category. Set your weights. Get your score.</p>
            </div>
          </div>

          <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-foreground mb-3">How to Use</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p><strong className="text-foreground">Step 1: Set your weights.</strong> Each category gets a weight from 1 (low priority) to 3 (top priority). Your weights will change based on your life stage and goals.</p>
              <p><strong className="text-foreground">Step 2: Rate the offer.</strong> Score each category from 1 (poor) to 5 (excellent) based on your research and evaluation.</p>
              <p><strong className="text-foreground">Step 3:</strong> Your weighted score and final score out of 100 are calculated automatically.</p>
            </div>
          </div>

          <JobOfferScorecard categories={scorecardCategories} locale="en" />

          <div className="mt-8 space-y-4">
            <h3 className="font-heading text-lg text-foreground">How to Read Your Score</h3>
            <div className="grid sm:grid-cols-2 gap-3">
              {[
                { range: "80-100", label: "Strong Accept", color: "text-green-400", desc: "The offer aligns well with your priorities. Move forward with confidence." },
                { range: "60-79", label: "Proceed with Caution", color: "text-gold", desc: "Strengths but meaningful gaps. Identify what's dragging the score down." },
                { range: "40-59", label: "Negotiate or Walk Away", color: "text-orange-400", desc: "Significant misalignment. Negotiate or reconsider." },
                { range: "Below 40", label: "Walk Away", color: "text-destructive", desc: "The offer doesn't match your priorities." },
              ].map((band) => (
                <div key={band.range} className="bg-background border border-border rounded-xl p-4">
                  <p className={`font-bold text-sm ${band.color} mb-1`}>{band.range}: {band.label}</p>
                  <p className="text-muted-foreground text-xs">{band.desc}</p>
                </div>
              ))}
            </div>
            <p className="text-muted-foreground text-sm mt-4">
              <strong className="text-foreground">Comparing two offers?</strong> Run the scorecard for each offer separately. Use the same weights for both. When two offers score within 5 points of each other, look at your top-weighted category.
            </p>
          </div>
        </div>
      </section>

      {/* Flags */}
      <section id="flags" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="grid sm:grid-cols-2 gap-6">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Red Flags
              </h3>
              <ul className="space-y-2">
                {["The hiring manager was distracted, late, or dismissive during interviews", "The company pressured you to decide in 24 hours", "The role description changed significantly between interviews", "Current employees have short tenures (under 18 months)", "The company refused to put verbal promises in writing", "Late-night or weekend scheduling as standard practice"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground text-sm"><XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-green-400 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Green Flags
              </h3>
              <ul className="space-y-2">
                {["The hiring manager asked follow-up questions and remembered details", "The company gave you space to decide", "Current employees spoke positively about the team", "The onboarding process is structured with training and mentorship", "The offer letter matches everything discussed verbally"].map((item, i) => (
                  <li key={i} className="flex items-start gap-2 text-foreground text-sm"><CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />{item}</li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Scripts & Templates */}
      <section id="scripts" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📝</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Scripts and Templates</h2>
              <p className="text-muted-foreground text-lg">Copy, customize, and use</p>
            </div>
          </div>

          <div className="space-y-3">
            <Collapsible title="Script: Asking for Time to Decide">
              <p className="text-foreground text-sm mt-3 italic">"Thank you so much for the offer. I'm excited about the role and the team. I want to give this the thought and attention the decision deserves. Would I be able to review everything and get back to you by [specific day]?"</p>
            </Collapsible>
            <Collapsible title="Script: Asking About Feedback and Other Candidates">
              <p className="text-foreground text-sm mt-3 italic">"I'm thrilled about the offer. Before I take time to review, I'd love to know: what was the team's feedback from my interviews? And are there other candidates you're considering for the role?"</p>
            </Collapsible>
            <Collapsible title="Script: Asking About Benefits">
              <p className="text-foreground text-sm mt-3 italic">"I want to make sure I fully understand the total compensation package. Are you able to walk me through the benefits, including health coverage, retirement matching, PTO, and any professional development support?"</p>
            </Collapsible>
            <Collapsible title="Script: Negotiating Start Date">
              <p className="text-foreground text-sm mt-3 italic">"I want to start strong and give this role my full energy from day one. To do this well, I'd like to give proper notice at my current job and take a short break before starting. Would a start date of [date, roughly 4-6 weeks out] work for the team?"</p>
            </Collapsible>
            <Collapsible title="Script: Declining by Phone">
              <p className="text-foreground text-sm mt-3 italic">"Hi [Name], thanks for making time to talk. I want to start by saying how much I appreciated the interview process and the time everyone spent getting to know me. After careful thought, I've decided to go in a different direction. [Insert your reason]. I have a lot of respect for the team and what you're building. I hope we stay connected and have a chance to work together in the future."</p>
            </Collapsible>
            <Collapsible title="Template: Decline Follow-Up Email">
              <div className="mt-3 text-sm space-y-2">
                <p className="text-foreground font-semibold">Subject: Thank You, [Company Name]</p>
                <p className="text-muted-foreground italic">Hi [Name],</p>
                <p className="text-muted-foreground italic">I wanted to follow up on our conversation today. Thank you again for the offer and for the time the team invested in the interview process. [One specific thing you appreciated about the company or team.]</p>
                <p className="text-muted-foreground italic">After careful consideration, I've decided to pursue a different direction. [Brief restatement of reason.]</p>
                <p className="text-muted-foreground italic">I have deep respect for the work [Company Name] does, and I hope our paths cross again. Please don't hesitate to reach out if there's ever a way I'm able to help.</p>
                <p className="text-muted-foreground italic">Best,<br />[Your Name]</p>
              </div>
            </Collapsible>
            <Collapsible title="Template: Acceptance Email">
              <div className="mt-3 text-sm space-y-2">
                <p className="text-foreground font-semibold">Subject: Excited to Join [Company Name]</p>
                <p className="text-muted-foreground italic">Hi [Name],</p>
                <p className="text-muted-foreground italic">I'm happy to confirm my acceptance of the [Job Title] position at [Company Name]. I've signed and returned the offer letter.</p>
                <p className="text-muted-foreground italic">To confirm:<br />• Start date: [Date]<br />• Base salary: [Amount]<br />• [Any other negotiated terms]</p>
                <p className="text-muted-foreground italic">I'm looking forward to contributing to the team. Please let me know if there's anything I should complete before my first day.</p>
                <p className="text-muted-foreground italic">Best,<br />[Your Name]</p>
              </div>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">Additional Resources</h2>
              <p className="text-cream/60">Keep levelling up your job search</p>
            </div>
          </div>

          <p className="text-cream/70 text-sm mb-8">
            This guide draws from 13 Harvard Business Review articles on job offers, negotiation, and career transitions by Bill Barnett, Hannah Riley Bowles, Rebecca Knight, Kelly O. Kay, Michael Cullen, Jodi Glickman, Rebecca Zucker, Marlo Lyons, Monne Williams, Amantha Imber, Amy Gallo, Samorn Selim, and Amii Barnard-Bahn.
          </p>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Full salary strategy</p>
              <span className="text-gold text-sm font-medium">Salary Starter Kit →</span>
            </Link>
            <Link to="/offer-calculator" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Compare your offers</p>
              <span className="text-gold text-sm font-medium">Offer Calculator →</span>
            </Link>
            <Link to="/recruiter-screen-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Pass the recruiter screen</p>
              <span className="text-gold text-sm font-medium">Recruiter Screen Guide →</span>
            </Link>
          </div>
        </div>
      </section>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">© 2024 James Bugden. All rights reserved.</span>
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

export default JobOfferGuide;
