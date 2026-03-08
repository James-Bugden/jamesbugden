import { FileText, Clock, Linkedin, Phone, Video, Users, AlertTriangle, CheckCircle2, XCircle, ArrowRight, MessageSquare, Target, Shield, Briefcase, ChevronDown } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import { useState } from "react";

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

const RecruiterScreenGuide = () => {
  useTrackGuideProgress("recruiter-screen");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="How to Pass the Recruiter Screen | James Bugden"
        description="A Senior Recruiter's end-to-end playbook for passing the screening call. Word-for-word examples, salary scripts, and the exact scorecard recruiters use."
        path="/recruiter-screen-guide"
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
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-cream/10 border border-cream/20 rounded-full mb-6">
            <Phone className="w-4 h-4 text-gold" />
            <span className="text-sm text-cream/80">Free Career Resource</span>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            How to Pass the<br className="hidden sm:block" /> Recruiter Screen
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">
            A Senior Recruiter's End-to-End Playbook
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">
              By James Bugden, Senior Recruiter at Uber
            </p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">25 min read</span>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            I've reviewed over 20,000 resumes. I've made 500+ hires at top international companies. I've done thousands of screening calls.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Most candidates treat the recruiter screen like a warm-up. It isn't. <span className="text-gold font-semibold">It's the gate.</span> You don't get to the hiring manager without getting through me first.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide covers the whole process end to end. What to do before the call. What I score during it. How to handle every question, including salary. What to do after we hang up. And how the screen changes at each career level.
          </p>
          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 text-center">
            <p className="text-foreground font-medium">
              Do the work in this guide. You'll be better prepared than <span className="text-gold font-semibold">90% of the people I talk to every week.</span>
            </p>
          </div>
        </div>
      </section>

      {/* Section 1: The Scorecard */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        <section className="py-14 md:py-20">
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

          {/* Scorecard visual */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8 font-mono text-sm">
            <p className="text-gold text-xs uppercase tracking-wider mb-4 text-center font-sans font-semibold">The Recruiter Scorecard</p>
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
              There is no "maybe." Your job is to make this decision easy.
            </p>
          </div>

          {/* What I evaluate */}
          <div className="space-y-4">
            {[
              { title: "Qualification match", desc: "Do your skills match the job? The screen confirms what the resume suggested." },
              { title: "Motivation & genuine interest", desc: "Do you have the right reasons for changing jobs? The more this role aligns with what you want, the higher the chance you'll accept and stay." },
              { title: "Communication", desc: "Do you answer concisely with real examples? I'm thinking about how you'll come across with the hiring manager." },
              { title: "Salary alignment", desc: "If we're $40K apart, nobody wants to waste time on a full interview loop." },
              { title: "Red flags", desc: "Gaps you can't explain. Claims you can't back up. Negativity about past employers. Late to the call." },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 bg-card border border-border rounded-xl p-4 hover:border-gold/30 transition-colors">
                <span className="w-7 h-7 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0 text-xs font-bold text-gold mt-0.5">
                  {i + 1}
                </span>
                <div>
                  <p className="text-foreground font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <p className="text-foreground text-sm leading-relaxed italic">
              <span className="text-gold font-semibold">What most candidates don't realize:</span> When I advance you, I put my name behind that decision. If you bomb with the hiring manager, my judgment takes the hit. I'm not looking for reasons to reject you. I'm looking for enough confidence to take the risk.
            </p>
          </div>
        </section>

        {/* Section 2: Before the Call */}
        <section className="pb-14 md:pb-20">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Before the Call
              </h2>
              <p className="text-muted-foreground text-lg">
                Candidates who advance aren't always more talented. They're more prepared.
              </p>
            </div>
          </div>

          <div className="space-y-6">
            {/* Research the company */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Research the Company (30-60 min)</h3>
              <ul className="space-y-2">
                {[
                  "Read the company website. Mission, products, leadership team.",
                  "Search recent news. Funding, acquisitions, product launches.",
                  "Check Glassdoor. Look for patterns, not the score alone.",
                  "Look at their LinkedIn page. See what they post and who's joining.",
                  "If they have a product, use it. Even the free trial.",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 grid md:grid-cols-2 gap-3">
                <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
                  <p className="text-destructive text-xs uppercase font-medium mb-1">✕ Vague</p>
                  <p className="text-foreground text-sm italic">"I've heard great things about your culture."</p>
                </div>
                <div className="bg-background border border-gold/30 rounded-lg p-3">
                  <p className="text-gold text-xs uppercase font-medium mb-1">✓ Specific</p>
                  <p className="text-foreground text-sm italic">"I read about your Series C and the push into Southeast Asia."</p>
                </div>
              </div>
            </div>

            {/* Research the recruiter */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Research the Recruiter</h3>
              <p className="text-muted-foreground text-sm mb-3">Look me up on LinkedIn before the call. I see when you've viewed my profile. I appreciate it.</p>
              <div className="bg-background border border-gold/30 rounded-lg p-3">
                <p className="text-gold text-xs uppercase font-medium mb-1">Example opener</p>
                <p className="text-foreground text-sm italic">"I saw on LinkedIn you joined from [Company]. How has the transition been?"</p>
              </div>
            </div>

            {/* Decode the JD */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Decode the Job Description</h3>
              <p className="text-muted-foreground text-sm mb-4">The JD is your cheat code. Build a three-column document:</p>
              <div className="grid grid-cols-3 gap-2 text-center">
                {["Job Requirement", "Your Experience", "Specific Example"].map((col) => (
                  <div key={col} className="bg-background border border-border rounded-lg p-3">
                    <p className="text-foreground text-xs font-medium">{col}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Build your cheat sheet */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">Build Your Cheat Sheet</h3>
              <ul className="space-y-2">
                {[
                  "Three specific things you know about the company",
                  "Your top three reasons you want this role",
                  "Job requirements matched to your experience",
                  "Bullet points for 'Tell me about yourself'",
                  "Two or three prepared stories with results",
                  "Five questions to ask",
                  "Your target salary range",
                ].map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <GoldCheckBadge />
                    <span className="text-foreground text-sm">{item}</span>
                  </li>
                ))}
              </ul>
              <p className="text-muted-foreground text-sm mt-3 italic">Keep it to one page. Don't read from it word for word.</p>
            </div>
          </div>
        </section>
      </main>

      {/* Section 3: Know Your Story - full width alternate bg */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Know Your Story
              </h2>
              <p className="text-muted-foreground text-lg">
                "Tell me about yourself" sets the tone for everything that follows.
              </p>
            </div>
          </div>

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

          {/* Examples */}
          <div className="space-y-3">
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

          {/* Top 3 Reasons */}
          <div className="mt-10">
            <h3 className="font-heading text-xl text-foreground mb-4">Your Top 3 Reasons You Want This Job</h3>
            <div className="grid sm:grid-cols-3 gap-4 mb-6">
              {[
                { num: "1", label: "Why this company", desc: "Something real and specific about the company." },
                { num: "2", label: "Why this role", desc: "Connect the day-to-day work to what drives you." },
                { num: "3", label: "Why now", desc: "Why this is the right next step for your career." },
              ].map((item) => (
                <div key={item.num} className="bg-background border border-border rounded-xl p-4 text-center">
                  <span className="inline-flex w-8 h-8 rounded-full bg-gold/20 items-center justify-center font-bold text-gold text-sm mb-2">{item.num}</span>
                  <h4 className="font-semibold text-foreground text-sm mb-1">{item.label}</h4>
                  <p className="text-muted-foreground text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-destructive text-xs uppercase font-medium mb-2">✕ What kills your answer</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>"I need a new challenge." <span className="text-muted-foreground text-xs">(vague, applies to any job)</span></li>
                <li>"The commute works for me." <span className="text-muted-foreground text-xs">(not about the role)</span></li>
                <li>"I've always admired your brand." <span className="text-muted-foreground text-xs">(empty, no substance)</span></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Answer Frameworks */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Answer Frameworks
              </h2>
              <p className="text-muted-foreground text-lg">
                You need a structure for behavioral questions. Without one, answers get long and unfocused.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* STAR */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">STAR Method</h3>
              <p className="text-muted-foreground text-xs mb-4">90-120 seconds total</p>
              <div className="space-y-3">
                {[
                  { letter: "S", label: "Situation", desc: "Set the scene. 1-2 sentences." },
                  { letter: "T", label: "Task", desc: "What were YOU responsible for?" },
                  { letter: "A", label: "Action", desc: "What did you DO? Spend 60% of time here.", highlight: true },
                  { letter: "R", label: "Result", desc: "What happened? USE NUMBERS." },
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
            </div>

            {/* CAR */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">CAR Method</h3>
              <p className="text-muted-foreground text-xs mb-4">60-90 seconds. Good for phone screens.</p>
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

          <Collapsible title="📝 STAR example: Leading a team through a difficult change">
            <p className="text-foreground text-sm leading-relaxed mt-3 italic">
              "My company decided to migrate our entire data infrastructure to a new platform with a 90-day deadline. [S] I was the project lead responsible for coordinating across four teams and keeping daily operations running. [T] I set up a weekly cross-functional standup, built a shared tracking doc, and personally managed the three most complex data pipelines. When we hit a major blocker in week six, I escalated quickly. [A] We hit the deadline. Zero data loss. 15% under budget and reporting time cut in half. [R]"
            </p>
          </Collapsible>

          {/* Prepare your stories */}
          <div className="mt-8">
            <h3 className="font-heading text-lg text-foreground mb-4">Prepare 5-7 Stories Covering:</h3>
            <div className="grid sm:grid-cols-2 gap-3">
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
          </div>
        </div>
      </section>

      {/* Section 5: Tough Questions */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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
              <p className="text-muted-foreground text-sm mb-4">Focus on what you're moving toward. Not what you're running from. Never badmouth a past employer.</p>
              <div className="space-y-3">
                <Collapsible title="Currently employed">
                  <p className="text-foreground text-sm mt-3 italic">"I've learned a lot in my current role and I'm proud of what the team has built. I'm ready for a bigger scope. This role stood out because [specific thing]. That's the direction I want to go."</p>
                </Collapsible>
                <Collapsible title="Laid off">
                  <p className="text-foreground text-sm mt-3 italic">"The company went through a restructuring and my position was eliminated. My performance reviews were consistently strong, most recently rated in the top quartile. Since then I've been [specific activity]. I'm ready to bring that to a new team."</p>
                </Collapsible>
                <Collapsible title="Fired">
                  <p className="text-foreground text-sm mt-3 italic">"The company and I had different expectations for the role. I've reflected on that experience and learned [specific lesson]. I'm looking for an environment where [relevant fit point] so I set myself up better from day one."</p>
                </Collapsible>
              </div>
            </div>

            {/* Biggest weakness */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-4">"What is your biggest weakness?"</h3>
              <p className="text-muted-foreground text-sm mb-3">Name a real weakness. Show self-awareness. Describe what you're doing about it.</p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg px-4 py-3 mb-4">
                <p className="text-foreground text-sm font-medium">Formula: <span className="text-gold">Behavior → Impact → Fix → Result</span></p>
              </div>
              <div className="space-y-3">
                <Collapsible title="📝 Example: Delegation">
                  <p className="text-foreground text-sm mt-3 italic">"I've had a tendency to hold onto tasks I do well rather than delegate. In my last role, this meant I became a bottleneck. I started a weekly delegation review where I assign at least two significant tasks to others. Our last two product launches came in on time. My manager flagged my improvement in my last review."</p>
                </Collapsible>
                <Collapsible title="📝 Example: Public speaking">
                  <p className="text-foreground text-sm mt-3 italic">"Presenting to large groups used to make me anxious. About 18 months ago I joined Toastmasters and committed to presenting monthly. I've now led two all-hands meetings and a client pitch with 40 people. It's still not my favorite thing, but it no longer holds me back."</p>
                </Collapsible>
              </div>
            </div>

            {/* Failure */}
            <Collapsible title='"Tell me about a time you failed."'>
              <p className="text-muted-foreground text-sm mt-3 mb-3">This tests self-awareness and growth.</p>
              <p className="text-foreground text-sm italic">"In my second year as a team lead, I pushed to launch a feature before we had enough user research. Adoption was low and we spent two months reworking it. Since then, I build a minimum research checkpoint into every feature plan. We've shipped four major features since then. All four hit adoption targets within the first month."</p>
            </Collapsible>

            {/* Five years */}
            <Collapsible title='"Where do you see yourself in five years?"'>
              <p className="text-muted-foreground text-sm mt-3 mb-3">Show ambition that makes sense for this role. Signal you'll stay long enough to make an impact.</p>
              <p className="text-foreground text-sm italic">"In five years I want to be leading a team and owning a larger scope of work. This role feels like the right step. I want to get deep into [specific area], build a track record here, and grow from there. I'm not looking to jump around."</p>
            </Collapsible>

            {/* Other offers */}
            <Collapsible title='"Do you have other offers or interviews in progress?"'>
              <p className="text-muted-foreground text-sm mt-3 mb-3">Be honest. Having other options helps, not hurts.</p>
              <p className="text-foreground text-sm italic">"I'm in process with two other companies. I'm being selective. This role is one I'm genuinely excited about, which is why I wanted to move forward."</p>
              <p className="text-foreground text-sm italic mt-2">If none: "I'm early in my search and being thoughtful about where I apply. This role is one I've specifically targeted."</p>
            </Collapsible>
          </div>
        </div>
      </section>

      {/* Section 6: Salary */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Salary
              </h2>
              <p className="text-muted-foreground text-lg">
                The goal: get the company to show their range before you show yours.
              </p>
            </div>
          </div>

          {/* Deflection ladder */}
          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <p className="text-gold text-xs uppercase tracking-wider mb-6 text-center font-semibold">The Salary Deflection Ladder</p>
            <div className="space-y-4">
              {[
                { level: "Level 1", label: "Deflect", script: "\"I'd like to learn more about the role before discussing comp. Can you share the budgeted range?\"", note: "Start here. Works 60% of the time." },
                { level: "Level 2", label: "Flip it", script: "\"I want to make sure we're aligned. What range has been approved for this role?\"", note: "If pushed. Works most of the remaining time." },
                { level: "Level 3", label: "Anchor high", script: "\"Based on my research and experience, I'm targeting total comp in the range of $X to $Y.\"", note: "Only if cornered. Top of your range. Use total comp." },
              ].map((item, i) => (
                <div key={i} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-bold rounded">{item.level}</span>
                    <span className="text-cream font-semibold text-sm">{item.label}</span>
                  </div>
                  <p className="text-cream/80 text-sm italic mb-2">{item.script}</p>
                  <p className="text-cream/50 text-xs">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          {/* What never to say */}
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
            <p className="text-destructive text-xs uppercase font-medium mb-3">✕ What never to say about money</p>
            <ul className="space-y-2 text-foreground text-sm">
              <li>Never volunteer your current salary.</li>
              <li>Never say "I'll take whatever is fair."</li>
              <li>Never say "I guess" or "I don't know" when comp comes up.</li>
              <li>Never make it emotional. Use market data, not personal needs.</li>
              <li>Never accept an offer on the spot without sleeping on it.</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Section 7: Setup & Etiquette */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">
                Setup & Etiquette
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Phone className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Phone</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Stand up during the call</li>
                <li>Use a headset or earbuds</li>
                <li>Smile while you talk</li>
                <li>Answer with your full name</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Video className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">Video</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Camera at eye level</li>
                <li>Face a window or light source</li>
                <li>Plain, uncluttered background</li>
                <li>Test setup 30 minutes before</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-xl p-5">
              <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 text-gold" />
              </div>
              <h4 className="font-semibold text-foreground mb-2 text-sm">In-Person</h4>
              <ul className="space-y-1.5 text-muted-foreground text-xs">
                <li>Arrive 10-15 minutes early</li>
                <li>Dress one level more formally</li>
                <li>Bring printed resumes + questions</li>
                <li>Phone away, not just face down</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Section 8: Questions to Ask */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Questions to Ask the Recruiter
              </h2>
              <p className="text-muted-foreground text-lg">
                Ask one or two. Quality over quantity.
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">About the Role</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>"What does success look like in the first 90 days?"</li>
                <li>"What are the biggest challenges for this role?"</li>
                <li>"Is this a backfill or new headcount?"</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-xl p-5">
              <h4 className="text-gold text-xs uppercase font-semibold mb-3">About the Team</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>"How would you describe the team's working style?"</li>
                <li>"What's the hiring manager's approach to development?"</li>
              </ul>
            </div>
          </div>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
            <p className="text-destructive text-xs uppercase font-medium mb-2">✕ Avoid at this stage</p>
            <p className="text-foreground text-sm">Salary, benefits, vacation, remote flexibility, promotion timelines. Save these for the offer stage.</p>
          </div>
        </div>
      </section>

      {/* Section 9: Red Flags */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Red Flags to Watch For
              </h2>
              <p className="text-muted-foreground text-lg">
                The screening call goes two ways. You should be evaluating us too.
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {[
              { flag: "Recruiter can't explain the role clearly", action: "Ask: 'How does success get measured at the 90-day mark?'" },
              { flag: "Role has been open a long time or keeps getting refilled", action: "Ask: 'Is this a new position or a backfill?'" },
              { flag: "Compensation is vague or evasive", action: "Worth noting if they refuse to share even a range." },
              { flag: "Process is disorganized", action: "Rescheduled calls, slow follow-up, conflicting information." },
              { flag: "Pressure to decide quickly", action: "Ask: 'What's driving the timeline?'" },
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
        </div>
      </section>

      {/* Section 10: Common Mistakes */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                Common Mistakes That Eliminate Candidates
              </h2>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-3">
            {[
              { mistake: "No preparation", desc: "50% of candidates haven't visited the company website." },
              { mistake: "Low energy", desc: "If you sound like this is one of thirty applications, I'll assume it is." },
              { mistake: "Claiming skills you can't back up", desc: "'Expert' on resume, 'I've used it a bit' in conversation." },
              { mistake: "Rambling", desc: "Answer the question. With a real example. Then stop." },
              { mistake: "Generic motivation", desc: "'I've always admired your brand' tells me nothing." },
              { mistake: "Poor logistics", desc: "Late, background noise, camera off without explanation." },
              { mistake: "Not asking questions", desc: "'No, I'm good' suggests you haven't thought seriously about the role." },
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
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                After the Call
              </h2>
            </div>
          </div>

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
                    <p className="text-cream text-sm">Submit to hiring manager for review</p>
                  </div>
                  <div className="bg-cream/5 border border-cream/10 rounded-lg p-3">
                    <p className="text-cream text-sm">HM decides: advance or pass</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Follow-up email */}
          <div className="bg-background border border-gold/30 rounded-xl p-5 mb-4">
            <p className="text-gold text-xs uppercase font-medium mb-2">Follow-up email template</p>
            <p className="text-foreground text-sm italic">
              "Hi [Name], thank you for the conversation today. I'm excited about the [role] opportunity, particularly the [specific thing we discussed]. I look forward to hearing about next steps. Let me know if there's anything else you need from me."
            </p>
          </div>

          <Collapsible title="📝 Correcting a weak answer in your follow-up">
            <p className="text-foreground text-sm mt-3 italic">
              "One thing I want to revisit from our conversation. When you asked about my experience with [X], I undersold it. I've [specific clarification]. I wanted to make sure you had the full picture."
            </p>
          </Collapsible>

          <div className="bg-gold/10 border border-gold/30 rounded-lg px-5 py-4 mt-6 text-center">
            <p className="text-foreground font-medium text-sm">
              <span className="text-gold font-semibold">Do not stop applying</span> while you wait. Keep moving until you have a signed offer in your hand.
            </p>
          </div>
        </div>
      </section>

      {/* Section 12: By Career Level */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="12" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">
                By Career Level
              </h2>
              <p className="text-muted-foreground text-lg">
                Same ground, different focus at each level.
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {[
              {
                level: "Entry Level",
                focus: "Potential, not track record. Willingness to learn, enthusiasm, communication skills.",
                example: "\"I graduated from [University] last month with a degree in Statistics. For my capstone project, I built a predictive model accurate within 8%. I interned at [Company] building dashboards in SQL and Tableau. I'm looking for a full-time analyst role where I apply both the statistical foundation and the hands-on tools.\"",
              },
              {
                level: "Mid-Level (3-10 years)",
                focus: "Proven track record with quantifiable results. Career progression, specific skill match, independence.",
                example: "\"I'm a product manager at [Company] leading the payments team. I shipped three features that increased checkout conversion by 22%. Each career move was intentional — I wanted to understand the full product stack. Now I'm ready for senior PM ownership end to end.\"",
              },
              {
                level: "Executive",
                focus: "Strategic clarity, organizational impact, composure. Frame every story around decisions that affected the full organization.",
                example: "\"I'm VP of Engineering leading a 120-person org. I rebuilt the infrastructure team from scratch, reduced deployment to continuous, and cut incidents by 60%. I'm looking for a CEO-partnered role to set technical strategy for the next stage of growth.\"",
              },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-heading text-lg text-gold mb-2">{item.level}</h3>
                <p className="text-muted-foreground text-sm mb-4">{item.focus}</p>
                <div className="bg-background border border-gold/30 rounded-lg p-4">
                  <p className="text-foreground text-sm italic">{item.example}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
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
                  "Research the company (30-60 min)",
                  "Look up the recruiter on LinkedIn",
                  "Decode the JD (must-haves vs nice-to-haves)",
                  "Map experience to each key requirement",
                  "Prepare your Present-Past-Future pitch",
                  "Prepare top 3 reasons you want this role",
                  "Build 5-7 STAR stories",
                  "Build your one-page cheat sheet",
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
                During the Call
              </h3>
              <ul className="space-y-3">
                {[
                  "Stand up (phone) or camera at eye level (video)",
                  "Present-Past-Future for 'Tell me about yourself' (60-90s)",
                  "STAR or CAR for behavioral questions",
                  "Three-level deflection for salary",
                  "Ask 1-2 sharp questions about the role",
                  "Ask about next steps before hanging up",
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
                Tough Questions Quick Ref
              </h3>
              <ul className="space-y-3">
                {[
                  "Why leaving: move toward, not away. Stay positive.",
                  "Weakness: real, manageable, with a fix that's working.",
                  "Salary: deflect → flip → anchor high only if pushed.",
                  "5-year plan: ambition that fits the role. Signal growth.",
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
                  "Follow-up email within 2-4 hours",
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

export default RecruiterScreenGuide;
