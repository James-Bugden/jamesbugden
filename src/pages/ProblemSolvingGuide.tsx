import { Clock, Linkedin, ChevronDown, Menu, Brain, Target, Lightbulb, CheckCircle2, XCircle } from "lucide-react";
import { Link } from "react-router-dom";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
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


const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "five-types", label: "01 · 5 Types of Interviewees" },
  { id: "four-steps", label: "02 · The 4-Step Framework" },
  { id: "logic-trees", label: "03 · Logic Trees" },
  { id: "yes-no-trees", label: "04 · Yes/No Trees" },
  { id: "hypothesis", label: "05 · Hypothesis Pyramid" },
  { id: "pros-cons", label: "06 · Pros & Cons Done Right" },
  { id: "mushroom", label: "07 · Mushroom Lovers Method" },
  { id: "octopus", label: "08 · John Octopus Method" },
  { id: "mistakes", label: "09 · 5 Interview Mistakes" },
  { id: "in-action", label: "10 · Framework in Action" },
  { id: "toolkit", label: "Quick Reference" },
  { id: "practice", label: "How to Practice" },
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

const ProblemSolvingGuide = () => {
  useTrackGuideProgress("problem-solving");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Problem Solving 101: The Thinking Framework That Gets You Hired | James Bugden"
        description="A recruiter's guide to structured thinking in interviews. Logic trees, yes/no trees, hypothesis pyramids, and the 4-step framework used by top candidates. Based on Ken Watanabe's book."
        path="/problem-solving-guide"
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
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4" style={{ lineHeight: 1.2 }}>
            Problem Solving 101:<br className="hidden sm:block" /> The Thinking Framework That Gets You Hired
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">Based on "Problem Solving 101" by Ken Watanabe</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">60 min read</span>
            </div>
          </div>
        </div>
      </section>

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            I have reviewed over <strong>20,000 resumes.</strong> I have hired more than <strong>500 people</strong> at companies like <strong>Uber</strong> and <strong>Netskope.</strong>
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            The single biggest difference between candidates who get offers and candidates who don't? It's not experience. It's not education. <strong>It's how they think.</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Most candidates walk into an interview and wing it. They hear a question. They blurt out the first thing that comes to mind. They ramble. They hope something sticks.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The best candidates do something different. They pause. They break the question down. They think out loud in a structured way. Then they answer.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            That structured way of thinking has a name. It comes from a book called <strong className="text-foreground">"Problem Solving 101"</strong> by Ken Watanabe. Watanabe was a McKinsey consultant who left to teach Japanese children how to solve problems. His book became <strong className="text-foreground">Japan's number one business best-seller.</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            The tools in that book are the same tools used by consultants, business leaders, and the strongest candidates I have ever interviewed.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide teaches you those tools. You will learn how to apply them in every interview you walk into. You will answer questions with more clarity, more structure, and more confidence than <strong className="text-foreground">95% of other candidates.</strong>
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            No consulting background required. No MBA needed. These are simple tools. Anyone learns them.
          </p>

          <div className="bg-card border border-gold/30 rounded-xl p-5 md:p-6 mb-6">
            <p className="text-foreground text-sm leading-relaxed">
              <strong className="text-gold">From my experience hiring 500+ people:</strong> When I sit across from a candidate who thinks in a structured way, I notice within the first 5 minutes. They stand out because most people never learned how to do this. You are about to learn.
            </p>
          </div>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">What's Inside This Guide</h3>
            <ul className="space-y-2">
              {[
                "The 5 Types of Interviewees. Which type are you? (Most people are a mix.)",
                "The 4-Step Framework. The core process behind every strong interview answer.",
                "Logic Trees. How to break down \"How would you...?\" questions into structured parts.",
                "Yes/No Trees. How to walk an interviewer through your diagnosis step by step.",
                "The Hypothesis Pyramid. How to answer \"What would you do if...?\" without guessing.",
                "Pros and Cons Done Right. How to answer \"Why us?\" and \"Why this role?\" with real criteria.",
                "The Mushroom Lovers Method. How to use data in your answers and case study presentations.",
                "The John Octopus Method. How to answer \"Where do you see yourself in 5 years?\" with specifics.",
                "5 Interview Mistakes. The errors that kill answers, with before-and-after fixes.",
                "The Framework in Action. Full annotated examples for engineering, operations, customer service, sales, and people management roles.",
                "Quick Reference Toolkit. One-page cheat sheet of every tool, when to use it, and the key phrase.",
                "How to Practice. How to drill these tools before your next interview.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main content wrapper */}
      <main className="pb-0">

        {/* Section 1: 5 Types of Interviewees */}
        <section id="five-types" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="01" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 5 Types of Interviewees</h2>
                <p className="text-muted-foreground text-lg">And 4 of them don't get hired</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">Watanabe introduces five character types in his book. Each one represents a different approach to solving problems. I see all five show up in interviews every single week.</p>

            <div className="grid gap-3">
              {[
                { type: "The Freezer", quote: '"I don\'t know..."', result: "No Offer", icon: "❄️", color: "border-destructive/30 bg-destructive/5" },
                { type: "The Complainer", quote: '"My boss was terrible..."', result: "No Offer", icon: "😤", color: "border-destructive/30 bg-destructive/5" },
                { type: "The Dreamer", quote: '"I want to make impact..."', result: "No Offer", icon: "💭", color: "border-destructive/30 bg-destructive/5" },
                { type: "The Rusher", quote: '"So I immediately did..."', result: "No Offer", icon: "🏃", color: "border-destructive/30 bg-destructive/5" },
                { type: "The Problem Solver", quote: '"First, I figured out the root cause..."', result: "OFFER", icon: "🧠", color: "border-green-500/30 bg-green-500/5" },
              ].map((item) => (
                <div key={item.type} className={`flex items-center gap-4 rounded-xl border p-4 ${item.color}`}>
                  <span className="text-2xl shrink-0">{item.icon}</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-foreground font-semibold text-sm">{item.type}</p>
                    <p className="text-muted-foreground text-sm italic truncate">{item.quote}</p>
                  </div>
                  <span className={`shrink-0 text-xs font-bold uppercase px-3 py-1 rounded-full ${item.result === "OFFER" ? "bg-green-500/20 text-green-600" : "bg-destructive/20 text-destructive"}`}>
                    {item.result}
                  </span>
                </div>
              ))}
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">Here they are, translated from the book to the interview room.</p>

            {/* Type 1: The Freezer */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">1. The Freezer (Miss Sigh)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">In the book, Miss Sigh gives up the moment she faces a challenge. She says "I'll never be able to do that" and stops trying.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">In an interview,</strong> this is the candidate who hears a tough question and shuts down. They say "I don't know" and move on. They give one-sentence answers. They avoid anything that feels risky.</p>
              <p className="text-destructive text-sm font-semibold mb-3">What the interviewer thinks: "This person will crumble under pressure."</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "Tell me about a time you dealt with ambiguity."</p>
                <p className="text-muted-foreground text-sm italic">"Hmm, I'm not sure I have a good example for that one. I mean, things were usually pretty clear at my last job. I guess there were times when things were unclear but I don't remember a specific one. Sorry."</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">That answer ends the evaluation. The interviewer moves on. You are now behind every other candidate.</p>
            </div>

            {/* Type 2: The Complainer */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">2. The Complainer (Mr. Critic)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">In the book, Mr. Critic points out what everyone else is doing wrong but never does anything himself.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">In an interview,</strong> this is the candidate who spends the whole time talking about problems at their current job. Bad manager. Bad culture. Bad systems. They have a long list of complaints and <strong className="text-foreground">zero solutions.</strong></p>
              <p className="text-destructive text-sm font-semibold mb-3">What the interviewer thinks: "This person will blame everyone else when things go wrong here too."</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "Why are you looking to leave your current role?"</p>
                <p className="text-muted-foreground text-sm italic">"Honestly, the leadership has no vision. My manager doesn't give clear direction and then blames us when projects fall behind. The processes are broken. I've told them a hundred times what needs to change but nobody listens. I need to be somewhere that values good ideas."</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">Every sentence points the finger at someone else. Not a single sentence describes what this candidate did to fix anything.</p>
            </div>

            {/* Type 3: The Dreamer */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">3. The Dreamer (Miss Dreamer)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">In the book, Miss Dreamer has big ideas but never plans how to make them happen. She is satisfied thinking about her dreams.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">In an interview,</strong> this is the candidate who talks about vision and strategy but has no specifics. They say things like "I want to build something meaningful" or "I see myself leading a team." But when you ask <strong className="text-foreground">how,</strong> they have nothing.</p>
              <p className="text-destructive text-sm font-semibold mb-3">What the interviewer thinks: "Great ideas. Zero execution."</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "What would you do in your first 90 days?"</p>
                <p className="text-muted-foreground text-sm italic">"I'd really want to understand the big picture first. Then I'd look for ways to add value and build relationships across the org. I think the most important thing is bringing a fresh perspective and connecting the dots that others might miss."</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">Sounds smart. Says nothing. No specifics. No plan. No measurable actions.</p>
            </div>

            {/* Type 4: The Rusher */}
            <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">4. The Rusher (Mr. Go-Getter)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">This one surprises people. In the book, Mr. Go-Getter is not lazy. He jumps into action fast. He works hard. But he <strong className="text-foreground">never stops to think</strong> about whether he is running in the right direction.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">In an interview,</strong> this is the candidate who immediately jumps to "here's what I did" without explaining <strong className="text-foreground">why</strong> they did it. They skip the thinking. They skip the diagnosis. They go straight to action.</p>
              <p className="text-destructive text-sm font-semibold mb-3">What the interviewer thinks: "This person gets things done, but do they know why? Will they solve the right problems or stay busy?"</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "Tell me about a time you solved a difficult problem."</p>
                <p className="text-muted-foreground text-sm italic">"Our sales numbers were down so I immediately started making more calls. I doubled my outreach volume. I stayed late every night. I sent follow-up emails at 6am. Eventually the numbers came back up because I outworked the problem."</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">Lots of effort. No diagnosis. No root cause. No strategy. The numbers likely came back up for a completely different reason.</p>
            </div>

            {/* Type 5: The Problem Solver */}
            <div className="bg-card border border-green-500/20 rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-foreground mb-3">5. The Problem Solver (The One Who Gets Hired)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">In the book, Problem-Solving Kids do what none of the others do. They <strong className="text-foreground">understand the situation first.</strong> They <strong className="text-foreground">find the root cause.</strong> They <strong className="text-foreground">make a plan.</strong> They <strong className="text-foreground">execute.</strong> Then they <strong className="text-foreground">check their results and adjust.</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">In an interview,</strong> this is the candidate who asks a clarifying question before answering. Who breaks a problem into parts. Who explains their reasoning step by step. Who shares results with real numbers. Who tells you what they learned.</p>
              <p className="text-green-400 text-sm font-semibold mb-3">This is the candidate I recommend for the job. Every time.</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "Tell me about a time you solved a difficult problem."</p>
                <p className="text-muted-foreground text-sm italic mb-2">"Our sales numbers dropped 20% in Q3. Before I did anything, I broke the data down by region, product line, and rep. Turns out two of our three regions were fine. The entire drop came from the Southeast region after we changed our pricing model there."</p>
                <p className="text-muted-foreground text-sm italic mb-2">"I interviewed five reps in that region and three customers who had stopped buying. The root cause wasn't effort or competition. Customers said the new pricing tiers were confusing and they couldn't figure out which package to buy."</p>
                <p className="text-muted-foreground text-sm italic">"I worked with the product team to simplify the tiers from six options down to three. We also created a one-page comparison sheet for the sales reps. Within 6 weeks, Southeast sales recovered to 95% of the previous quarter."</p>
              </div>
              <p className="text-muted-foreground text-sm mt-3">That answer has diagnosis, root cause, a plan, execution, and results with numbers. That is the answer that gets the offer.</p>
            </div>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="bg-muted/50 px-5 py-3 border-b border-border">
                <p className="text-foreground text-sm font-semibold">Same Question, 5 Different Answers</p>
                <p className="text-muted-foreground text-xs italic">"Tell me about a time you solved a difficult problem."</p>
              </div>
              <div className="divide-y divide-border">
                {[
                  { type: "Freezer", answer: '"I can\'t think of one."', bad: true },
                  { type: "Complainer", answer: '"Nobody gave me the resources to fix it."', bad: true },
                  { type: "Dreamer", answer: '"I envisioned a better system."', bad: true },
                  { type: "Rusher", answer: '"I worked harder until it was fixed."', bad: true },
                  { type: "Problem Solver", answer: '"I diagnosed the root cause, built a plan, executed it, and measured the results."', bad: false },
                ].map((item) => (
                  <div key={item.type} className={`flex items-center gap-3 px-5 py-3 ${item.bad ? "" : "bg-green-500/5"}`}>
                    {item.bad ? <XCircle className="w-4 h-4 text-destructive shrink-0" /> : <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />}
                    <span className="text-foreground text-sm font-medium w-28 shrink-0">{item.type}</span>
                    <span className="text-muted-foreground text-sm italic">{item.answer}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> You are probably a mix of these types. That is normal. The goal is to move yourself closer to <strong className="text-foreground">Type 5</strong> in every answer you give. The rest of this guide shows you exactly how.</p>
            </div>
          </div>
        </section>

        {/* Section 2: 4-Step Framework */}
        <section id="four-steps" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="02" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 4-Step Framework That Wins Interviews</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">Watanabe's entire book comes down to <strong className="text-foreground">four steps.</strong> Every tool he teaches supports this process:</p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
              <div className="grid sm:grid-cols-4 gap-3">
                {[
                  { step: "Step 1", title: "Understand the Situation", phrase: '"Let me make sure I understand what you\'re asking."' },
                  { step: "Step 2", title: "Identify the Root Cause", phrase: '"I broke it down and found the real issue."' },
                  { step: "Step 3", title: "Develop an Action Plan", phrase: '"Here\'s what I did and why I chose this approach."' },
                  { step: "Step 4", title: "Execute & Adjust", phrase: '"The result was X. Here\'s what I\'d do differently."' },
                ].map((item) => (
                  <div key={item.step} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                    <p className="text-gold text-xs font-bold uppercase mb-1">{item.step}</p>
                    <p className="text-cream font-semibold text-sm mb-2">{item.title}</p>
                    <p className="text-cream/60 text-xs italic">{item.phrase}</p>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">That is it. Four steps. The same four steps apply whether you are fixing a rock band's attendance problem, saving money to buy a computer, or picking a school in Brazil. They also apply to <strong className="text-foreground">answering any interview question.</strong></p>

            {/* Step 1 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 1: Understand the Situation (Don't Answer Yet)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">When an interviewer asks you a question, most candidates start talking right away. Problem solvers do the opposite. They <strong className="text-foreground">make sure they understand the question first.</strong></p>
              <ul className="space-y-2 mb-4">
                {["Pause for 2 to 3 seconds. Collect your thoughts.", "Ask a clarifying question if the question is vague.", "Restate the question in your own words."].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
                ))}
              </ul>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "How would you improve our customer retention?"</p>
                <p className="text-muted-foreground text-sm italic">"Before I answer that, I want to make sure I'm thinking about this the right way. When you say retention, are you asking about keeping customers past their first purchase, or reducing churn among long-term customers? And do you have a sense of where the biggest drop-off is happening?"</p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 2: Identify the Root Cause (Go Deeper Than the Surface)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Most candidates give surface-level answers. "Sales were down, so I made more calls." That is a <strong className="text-foreground">Mr. Go-Getter answer.</strong> You skipped the diagnosis.</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic mb-2"><strong className="text-foreground not-italic">Interviewer:</strong> "Tell me about a time you identified the root cause of a problem."</p>
                <p className="text-muted-foreground text-sm italic">"Our support ticket volume doubled in one month. The surface-level explanation was 'more customers, more tickets.' But I pulled the data and segmented tickets by type. 80% of the increase came from one category: billing questions. I dug further. We had launched a new pricing page three weeks earlier. The page had a formatting error that showed the wrong price for our annual plan. Customers were signing up at one price and getting charged another. The root cause wasn't more customers. It was a broken pricing page."</p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 3: Develop an Action Plan (Show Your Thinking)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">After you find the root cause, explain what you planned to do about it. This is where interviewers see your strategic thinking.</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic">"Once I confirmed the root cause was the pricing page error, I had three options. Option A: immediately revert to the old pricing page. Fast fix, but we'd lose the new design improvements. Option B: fix the formatting error on the new page. Best long-term solution but needed the dev team's help, and they were in a sprint. Option C: add a temporary banner clarifying the correct pricing while waiting for the dev fix. I went with a combination. I pushed for an emergency fix from the dev team since it was a revenue-impacting bug. At the same time, I added a temporary banner so customers wouldn't be confused in the 24 hours before the fix went live."</p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-3">Step 4: Execute and Adjust (Share the Results and the Lessons)</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">This is where you close the loop. <strong className="text-foreground">Share what happened.</strong> Use real numbers when possible. Then <strong className="text-foreground">share what you learned.</strong></p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-muted-foreground text-sm italic">"The dev team fixed the page within 24 hours. Support tickets dropped back to normal within a week. We also refunded the 340 customers who were overcharged, which actually resulted in a 15% higher retention rate for that group compared to our average. They appreciated us catching the mistake and making it right. The lesson I took from this: any time we change a customer-facing page, we now do a QA check specifically on pricing accuracy. That one process change has prevented two similar errors since then."</p>
              </div>
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience hiring 500+ people:</strong> This 4-step framework maps to the <strong className="text-foreground">STAR method</strong> (Situation, Task, Action, Result) that most interview coaches teach. But it goes further. The STAR method tells you <strong className="text-foreground">what</strong> to include. Watanabe's framework teaches you <strong className="text-foreground">how to think</strong> through each part. That is the difference between a rehearsed answer and a genuinely strong one.</p>
            </div>
          </div>
        </section>

        {/* Section 3: Logic Trees */}
        <section id="logic-trees" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="03" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Logic Trees: How to Break Down Any Interview Question</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">A <strong className="text-foreground">logic tree</strong> is a visual tool that helps you break a big problem into smaller pieces. You start with one question on the left and split it into branches on the right, going from broad to specific.</p>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6 overflow-x-auto">
              <p className="text-xs font-bold text-gold uppercase tracking-wider mb-4">Logic Tree: The Pepper Shaker</p>
              <div className="flex items-stretch gap-0 min-w-[500px]">
                {/* Root */}
                <div className="flex items-center shrink-0">
                  <div className="bg-executive-green text-cream text-xs font-semibold px-4 py-3 rounded-lg text-center leading-snug">
                    How to get more<br />pepper out of<br />one shake?
                  </div>
                  <div className="w-6 h-px bg-gold/40" />
                </div>
                {/* Branches */}
                <div className="flex flex-col justify-center gap-2">
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-l border-gold/30 h-6 rounded-tl-lg" />
                    <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">Increase the area of the top surface</div>
                  </div>
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-gold/30" />
                    <div className="flex items-center gap-0">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">Increase pepper from the surface area</div>
                      <div className="w-4 h-px bg-gold/30" />
                      <div className="flex flex-col gap-1">
                        <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">More holes per area</div>
                        <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">Bigger holes</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-0">
                    <div className="w-4 border-t border-b border-l border-gold/30 h-6 rounded-bl-lg" />
                    <div className="flex items-center gap-0">
                      <div className="bg-muted border border-border rounded-lg px-3 py-2 text-xs text-foreground font-medium">Make it easier for pepper to come out</div>
                      <div className="w-4 h-px bg-gold/30" />
                      <div className="bg-gold/10 border border-gold/20 rounded px-2 py-1 text-xs text-foreground">Smaller pepper grains</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">Four different solutions from one question. "Shake harder" isn't even on the list. That is the power of a logic tree.</p>

            <h3 className="font-heading text-xl text-foreground mb-4">How to Use Logic Trees in Interviews</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">You will not draw a tree on a whiteboard in most interviews. But you will use the <strong className="text-foreground">same thinking pattern out loud.</strong> When an interviewer asks <strong className="text-foreground">"How would you improve X?"</strong> do this:</p>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
              <li><strong className="text-foreground">Break the problem</strong> into 2 to 3 main categories.</li>
              <li><strong className="text-foreground">Under each category,</strong> list 1 to 2 specific ideas.</li>
              <li><strong className="text-foreground">Explain</strong> which branch you would pursue and why.</li>
            </ol>

            <Collapsible title="Example: Logic Tree for Improving Onboarding">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd think about this in three buckets. First, <strong className="text-foreground not-italic">pre-start communication.</strong> Are new hires getting enough information before day one? Things like a welcome packet, access to tools, and an assigned buddy. Second, <strong className="text-foreground not-italic">the first-week experience.</strong> Is the schedule structured or chaotic? Most companies overload the first week with paperwork and skip the relationship building. Third, <strong className="text-foreground not-italic">ongoing support in the first 90 days.</strong> Is there a buddy system or a check-in cadence with the manager?"</p>
                <p className="italic">"From what I've seen, the biggest drop-off happens in bucket two. New hires form their opinion of the company in the first 5 days. I'd start by building a structured first-week schedule that balances onboarding tasks with meeting the team."</p>
              </div>
            </Collapsible>

            <Collapsible title="Example: How Would You Increase Revenue?">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd break revenue growth into three buckets. Get more customers, get more revenue per customer, or keep customers longer. Each one has a different set of levers. Before picking a direction, I'd want to know where the biggest gap is. If your conversion rate is 1% but your retention is 95%, I'd focus on conversion. If retention is 70%, that's where the money is leaking."</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">When to Use Logic Trees</h3>
            <ul className="space-y-2 mb-6">
              {["\"How would you approach this problem?\"", "\"What would you do in your first 90 days?\"", "\"How would you grow revenue for this product?\"", "\"What factors would you consider?\"", "Any question that asks you to solve, improve, or plan something."].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">Logic Trees by Role</h3>
            <div className="space-y-3">
              {[
                { role: "Engineering", q: "How would you reduce page load time?", a: "\"I'd break this into three layers. First, the network layer. Are we optimizing asset delivery? CDN, compression, caching headers. Second, the backend layer. Are the API calls slow? Database queries, server response time, unnecessary data being sent. Third, the frontend layer. Are we rendering efficiently? Bundle size, lazy loading, blocking scripts. I'd measure each layer first. If the backend is returning in 100ms but the frontend takes 3 seconds to render, I'm focusing on the frontend.\"" },
                { role: "Operations", q: "How would you reduce shipping errors?", a: "\"I'd break shipping errors into three categories. First, picking errors. The wrong item was pulled from the shelf. Second, packing errors. The right item was picked but the wrong quantity or wrong address label was applied. Third, system errors. The order management system sent incorrect information to the warehouse. Each one has a different fix. I'd pull the last 3 months of error reports, categorize them, and focus on the biggest bucket first.\"" },
                { role: "Customer Service", q: "How would you reduce repeat contacts?", a: "\"I'd split repeat contacts into three buckets. First, unresolved issues. The customer called back because their problem wasn't fixed the first time. Second, unclear communication. The problem was fixed but the customer didn't understand the resolution. Third, recurring problems. The same issue keeps happening. Each bucket needs a different solution.\"" },
                { role: "Sales", q: "How would you shorten the sales cycle?", a: "\"I'd break the sales cycle into stages and find which one takes the longest. First, lead to first meeting. Second, first meeting to proposal. Third, proposal to close. In my experience, the biggest time sink is usually between proposal and close. Deals get stuck waiting for internal approvals on the customer side. I'd focus on giving champions the tools to sell internally: ROI calculators, executive summaries, and reference calls.\"" },
                { role: "People Manager", q: "How would you improve team productivity?", a: "\"I'd break productivity into three areas. First, clarity. Does everyone know what they should be working on? Second, capacity. Is the workload realistic? Third, capability. Do people have the skills and tools? Most managers jump straight to capability. In my experience, the problem is usually clarity or capacity.\"" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}: "${item.q}"`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> When a candidate breaks a question into categories before answering, I write down <strong className="text-foreground">"structured thinker"</strong> in my notes. That label alone moves candidates forward in the process. It is one of the highest compliments a recruiter gives.</p>
            </div>
          </div>
        </section>

        {/* Section 4: Yes/No Trees */}
        <section id="yes-no-trees" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="04" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Yes/No Trees: Diagnose Problems Out Loud</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">A <strong className="text-foreground">yes/no tree</strong> puts people or things into buckets based on yes or no questions. Each answer leads to either a bucket (explanation) or another question.</p>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <p className="text-xs font-bold text-gold uppercase tracking-wider mb-5">Yes/No Tree: Mushroom Lovers Concert Attendance</p>
              <div className="flex flex-col items-center gap-0">
                {/* Start node */}
                <div className="bg-executive-green text-cream text-xs font-semibold px-5 py-3 rounded-lg text-center">All 500 students<br />and teachers</div>
                <div className="w-px h-4 bg-gold/40" />
                {/* Question 1 */}
                <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50">Do they know about the concerts?</div>
                <div className="flex items-start w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                    <div className="w-px h-3 bg-gold/40" />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-destructive mb-1">NO</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-center">
                      <p className="text-foreground text-sm font-bold">350 people <span className="text-muted-foreground font-normal">(70%)</span></p>
                      <p className="text-muted-foreground text-xs">"Not aware"</p>
                    </div>
                  </div>
                </div>
                {/* Question 2 */}
                <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 -mt-1">Have they ever attended?</div>
                <div className="flex items-start w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                    <div className="w-px h-3 bg-gold/40" />
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-destructive mb-1">NO</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-center">
                      <p className="text-foreground text-sm font-bold">135 people <span className="text-muted-foreground font-normal">(27%)</span></p>
                      <p className="text-muted-foreground text-xs">"Aware but never came"</p>
                    </div>
                  </div>
                </div>
                {/* Question 3 */}
                <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 -mt-1">Do they attend regularly?</div>
                <div className="flex items-start w-full max-w-md mt-0">
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                    <div className="bg-green-500/10 border border-green-500/20 rounded-lg px-3 py-2 text-center">
                      <p className="text-foreground text-sm font-bold">12 people <span className="text-muted-foreground font-normal">(2%)</span></p>
                      <p className="text-muted-foreground text-xs">"Loyal fans"</p>
                    </div>
                  </div>
                  <div className="flex-1 flex flex-col items-center">
                    <div className="w-px h-4 bg-gold/40" />
                    <span className="text-xs font-bold text-destructive mb-1">NO</span>
                    <div className="bg-destructive/10 border border-destructive/20 rounded-lg px-3 py-2 text-center">
                      <p className="text-foreground text-sm font-bold">3 people <span className="text-muted-foreground font-normal">(1%)</span></p>
                      <p className="text-muted-foreground text-xs">"Came once, stopped"</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mt-6 mb-6">This helped them pinpoint exactly where the problem was. Not awareness (they assumed). <strong className="text-foreground">Conversion</strong> (the real issue). 90% of people who knew about the concerts never came. That is the bucket to fix.</p>

            <Collapsible title="Full Example: Customer Churn Diagnosis">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"Our customer churn rate spiked from <strong className="text-foreground not-italic">5% to 12%</strong> in one quarter. I needed to figure out where we were losing people."</p>
                <p className="italic">"First question: Were we losing customers at the free trial stage or after they became paying customers? I checked the data. <strong className="text-foreground not-italic">Answer: paying customers.</strong> Trial conversion was stable. So the problem wasn't acquisition."</p>
                <p className="italic">"Next: Were they canceling within the first month or after several months? <strong className="text-foreground not-italic">Answer: first month.</strong> So the problem was the early experience, not long-term value."</p>
                <p className="italic">"Next: Were they contacting support before canceling or leaving silently? <strong className="text-foreground not-italic">Answer: 90% left silently.</strong> They weren't even trying to get help."</p>
                <p className="italic">"That told me the root cause was the <strong className="text-foreground not-italic">onboarding experience for new paying customers.</strong> They didn't know how to get value from the product fast enough. So I built a 7-day onboarding email sequence with a guided setup checklist. First-month churn dropped from 12% back down to 6% within two months."</p>
              </div>
            </Collapsible>

            <Collapsible title="Full Example: Troubleshooting a Technical Issue">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"Our app's load time doubled overnight. I needed to find the cause fast."</p>
                <p className="italic">"Did it affect all users or a subset? <strong className="text-foreground not-italic">All users.</strong> So it wasn't device-specific. Did it affect all pages or specific pages? <strong className="text-foreground not-italic">All pages.</strong> So it wasn't a single feature. Did it start at a specific time? <strong className="text-foreground not-italic">Yes, 2am Tuesday.</strong> What deployed at 2am Tuesday? <strong className="text-foreground not-italic">A database migration.</strong> That was the root cause. The migration added an index that was supposed to speed things up but was actually running a full table scan on every query."</p>
                <p className="italic">"We rolled back the migration, load times returned to normal, and the database team reworked the index before redeploying."</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">Yes/No Trees by Role</h3>
            <div className="space-y-3">
              {[
                { role: "Engineering", q: "Debugging a production issue", a: "\"Our payment processing started failing for about 5% of transactions. First: Is it affecting all payment methods or one? One. Credit cards only. Next: Is it all credit cards or a specific card type? Visa only. Next: Is it all Visa transactions or a specific region? Only transactions where the billing address is outside the US. Root cause: our payment gateway had pushed an update that changed how international address validation worked for Visa. I coordinated with the gateway provider to roll back the validation change. Failure rate went from 5% back to 0.1% in 24 hours.\"" },
                { role: "Operations", q: "Finding a quality issue source", a: "\"Our product return rate spiked from 2% to 8% in one month. First: Is it all products or specific SKUs? Three SKUs. All in the same product line. Next: Are the returns from all warehouses or one? One warehouse. Our Dallas facility. Next: Is it all shifts or a specific shift? The night shift only. I visited the Dallas facility. A new packaging machine had been installed two weeks earlier. It was calibrated incorrectly and was sealing boxes too loosely. We recalibrated the machine and returns dropped back to 1.5% within two weeks.\"" },
                { role: "Customer Service", q: "Why customer satisfaction dropped", a: "\"Our CSAT score dropped from 87% to 71% over two months. First: Did it drop across all channels or one? Phone was stable. Chat dropped. Next: Did it drop for all issue types or specific ones? Only billing-related chats. Next: Did it coincide with any changes? Yes. We launched a new billing chatbot two months ago. The chatbot was asking customers to re-enter information they'd already typed. I worked with the product team to pass the chatbot conversation history to the agent. CSAT on billing chats recovered to 83% within a month.\"" },
                { role: "Sales", q: "Why deals were stalling", a: "\"My pipeline had $2M in deals that had been in the 'proposal sent' stage for over 30 days. First: Is it all deal sizes or specific ones? Only deals over $50K. Next: Is it all industries or one? Across industries. Next: Where in the approval process were they stuck? After the champion said yes but before procurement approved. I called 5 champions. They all told me procurement needed an ROI justification document. I created a standardized ROI template. Average time from proposal to close dropped from 45 days to 22 days.\"" },
                { role: "People Manager", q: "Why a team was underperforming", a: "\"My team's sprint velocity dropped 30% over three sprints. First: Is it all team members or specific ones? Three out of six had dropped. Next: Did those three have something in common? Yes. All three were on a new cross-functional project. Next: Was the project adding to their workload or replacing existing work? Adding. Nobody removed their existing sprint commitments. The root cause was capacity, not performance. I worked with the project lead to reduce their sprint commitments. Velocity recovered to 95% in two sprints.\"" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}: ${item.q}`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> The best candidates I have interviewed all do some version of this. They don't say "the problem was X." They walk me through <strong className="text-foreground">how they figured out</strong> the problem was X. The diagnosis is more impressive than the solution.</p>
            </div>
          </div>
        </section>

        {/* Section 5: Hypothesis Pyramid */}
        <section id="hypothesis" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="05" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Hypothesis Pyramid: Don't Jump to Conclusions</h2>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">A <strong className="text-foreground">hypothesis</strong> is a hunch. It is what you think the answer is before you have confirmed it. Watanabe's big lesson: <strong className="text-foreground">state your hypothesis, explain your reasoning, then test it.</strong></p>
            <p className="text-muted-foreground leading-relaxed mb-6">Most people skip the testing part. They treat their first hunch as fact and run with it.</p>

            <h3 className="font-heading text-lg text-foreground mb-4">How to Use the Hypothesis Pyramid in Interviews</h3>
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
              <li><strong className="text-foreground">State your hypothesis.</strong> "My first instinct is that the issue is likely X."</li>
              <li><strong className="text-foreground">Explain your reasoning.</strong> "I think that because of A, B, and C."</li>
              <li><strong className="text-foreground">Explain how you would test it.</strong> "Before I committed to that approach, I would check D and E to confirm."</li>
            </ol>

            <Collapsible title="Example: Product launch underperforming">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"My initial hypothesis would be that the positioning isn't resonating with the target audience. I'd think that because the traffic numbers are strong but conversion is low. People are seeing it but not buying."</p>
                <p className="italic">"But I wouldn't act on that assumption right away. I'd test it by reviewing the landing page analytics, checking the drop-off points in the funnel, and talking to 5 to 10 customers who visited but didn't purchase."</p>
                <p className="italic">"If the data confirmed my hypothesis, I'd rework the messaging. If not, I'd look at pricing or product-market fit as alternative explanations."</p>
              </div>
            </Collapsible>

            <Collapsible title="Example: Employee engagement scores dropped">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"My hypothesis would be that the drop is related to recent organizational changes. We had a restructure two months ago, and in my experience, engagement dips after restructures because people feel uncertain about their role."</p>
                <p className="italic">"To test that, I'd look at the data by department. If the drop is concentrated in the teams that were restructured, my hypothesis holds. If it's across the board, the cause is something else."</p>
              </div>
            </Collapsible>

            <Collapsible title="Example: A key client is threatening to leave">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"My hypothesis would be that the client has an unresolved issue that has been building up over time. Clients rarely leave over a single incident. It's usually a pattern."</p>
                <p className="italic">"I'd test this by reviewing the last 6 months of communications, support tickets, and meeting notes. I'd also call the client directly and ask: 'What would need to change for you to feel confident staying with us?'"</p>
              </div>
            </Collapsible>

            <h3 className="font-heading text-lg text-foreground mt-8 mb-4">Hypothesis Pyramids by Role</h3>
            <div className="space-y-3">
              {[
                { role: "Engineering", q: "Microservice throwing intermittent errors", a: "\"My hypothesis would be that it's a resource contention issue, not a code bug. Intermittent errors that aren't reproducible locally are usually related to infrastructure: memory limits, connection pool exhaustion, or race conditions under load. I'd test that by checking three things. First, the service's memory and CPU metrics during the error windows. Second, the database connection pool utilization. Third, whether the errors correlate with traffic spikes.\"" },
                { role: "Operations", q: "Key supplier missed delivery deadline", a: "\"My hypothesis would be that this is a capacity issue on their end, not a one-time mistake. Suppliers who miss deadlines are usually signaling that demand has exceeded their production capacity. Short-term, I'd negotiate a recovery plan with specific dates. Long-term, I'd evaluate whether we need a second supplier.\"" },
                { role: "Customer Service", q: "Call volume suddenly doubled", a: "\"My hypothesis would be that something specific triggered it. Call volume doesn't double randomly. I'd test by looking at what happened in the last 48 hours and pulling call reason codes. If 60% of the new calls are about one topic, that's the trigger.\"" },
                { role: "Sales", q: "Win rate suddenly dropped", a: "\"My hypothesis would be that something changed in the competitive landscape or in our own sales process, not that the team got worse overnight. I'd test by looking at lost-deal data and listening to 10 recent lost-deal call recordings.\"" },
                { role: "People Manager", q: "Multiple team members handed in notice", a: "\"My hypothesis would be that there's a shared root cause. When multiple people leave at once, it's rarely a coincidence. I'd have honest exit conversations and look at what changed 2 to 3 months ago.\"" },
              ].map((item) => (
                <Collapsible key={item.role} title={`${item.role}: ${item.q}`}>
                  <p className="mt-3 text-sm text-muted-foreground italic">{item.a}</p>
                </Collapsible>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> When a candidate says "I think the problem is X, and here is how I would verify that," I know they won't make reckless decisions on the job. That one sentence signals <strong className="text-foreground">maturity, humility, and strong judgment.</strong> It is rare. Use it.</p>
            </div>
          </div>
        </section>

        {/* Section 6: Pros & Cons Done Right */}
        <section id="pros-cons" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="06" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Pros and Cons Done Right</h2>
                <p className="text-muted-foreground text-lg">How to answer "Why us?" and "Why this role?"</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">In the book, Kiwi the football player had to choose between two schools in Brazil. She almost picked the wrong one. Why? She compared them using <strong className="text-foreground">the wrong criteria.</strong> She overweighted things that didn't matter (location, website design) and underweighted things that did (coaching quality, playing time, cultural immersion).</p>

            <h3 className="font-heading text-lg text-foreground mb-4">Watanabe's Criteria and Evaluation Method</h3>
            <div className="space-y-2 mb-6">
              {["Step 1: List your options.", "Step 2: Define your evaluation criteria.", "Step 3: Weight each criterion by importance (high, medium, low).", "Step 4: Score each option against the weighted criteria.", "Step 5: Pick the most attractive option."].map((item, i) => (
                <div key={i} className="bg-background border border-border rounded-xl p-3">
                  <p className="text-foreground text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>

            <Collapsible title='Example: "Why do you want to work here?"'>
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">Weak answer:</strong> <span className="italic">"I love your brand. The mission really resonates with me and I think the culture is amazing."</span></p>
                <p><strong className="text-green-400">Strong answer:</strong> <span className="italic">"I looked at this role against three criteria that matter most to me right now. First, the opportunity to work on problems at scale. Your team handles 50 million monthly active users. Second, the team structure. Your team gives people ownership of end-to-end projects rather than slicing work into narrow tasks. Third, the growth trajectory. This role maps directly to where I want to be in 3 years."</span></p>
              </div>
            </Collapsible>

            <Collapsible title='Example: "Why are you choosing us over Company X?"'>
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I evaluated both opportunities against three criteria. First, the scope of the role. Your position owns the full funnel. Second, the team I'd be learning from. Third, the pace of shipping. You deploy weekly. The other company ships quarterly. For where I am in my career, I need fast feedback loops."</p>
              </div>
            </Collapsible>

            <Collapsible title='Example: "Why did you choose your current approach over the alternative?"'>
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I had two options. Option A was to rebuild the system from scratch. Option B was to patch the existing system. I evaluated them on three criteria: time to implement, risk of breaking existing features, and long-term maintainability. Given that we had a hard deadline in 4 weeks, I went with Option B. But I documented the technical debt and scheduled a rebuild for Q2."</p>
              </div>
            </Collapsible>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> I always spot the difference between a candidate who has done deep research vs. surface research. The surface researcher says "I love your culture." The deep researcher says "I spoke with two people on your team and they both mentioned the weekly feedback sessions. That is exactly the kind of environment where I do my best work." One of those answers leads to an offer. <strong className="text-foreground">Guess which one.</strong></p>
            </div>
          </div>
        </section>

        {/* Section 7: Mushroom Lovers Method */}
        <section id="mushroom" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="07" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Mushroom Lovers Method</h2>
                <p className="text-muted-foreground text-lg">Using data in interviews and case study presentations</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">This section is where the book's framework becomes <strong className="text-foreground">most directly useful.</strong> The Mushroom Lovers' concert attendance story is a complete case study. <strong className="text-foreground">If you ever need to give a case study presentation in an interview, this is your blueprint.</strong></p>

            <h3 className="font-heading text-lg text-foreground mb-4">The 7-Part Case Study Structure</h3>
            <div className="space-y-3 mb-8">
              {[
                { part: "Part 1", title: "Define the Problem Clearly", desc: "State it in specific, measurable terms. Bad: \"The company needs more customers.\" Good: \"Monthly new customer acquisition dropped 25% over the last two quarters, from 800 to 600 per month.\"" },
                { part: "Part 2", title: "Map the Possible Causes", desc: "Use a logic tree. Break the problem into branches. Show you have considered all the angles." },
                { part: "Part 3", title: "State Your Hypothesis", desc: "Be clear about what you think the problem is and why." },
                { part: "Part 4", title: "Show Your Data Collection and Analysis", desc: "Explain what data you gathered or would gather. Explain what it showed." },
                { part: "Part 5", title: "Compare Hypothesis to Reality", desc: "Show that you tested your assumption. This is what separates good analysts from great ones." },
                { part: "Part 6", title: "Recommend Solutions with Prioritization", desc: "Use the impact vs. ease matrix. High impact + easy = do now. High impact + hard = do next quarter." },
                { part: "Part 7", title: "Show Expected Results", desc: "Close with projected outcomes. Use real or estimated numbers." },
              ].map((item) => (
                <div key={item.part} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                  <span className="text-gold font-heading text-sm font-bold whitespace-nowrap">{item.part}</span>
                  <div>
                    <p className="text-foreground font-semibold text-sm">{item.title}</p>
                    <p className="text-muted-foreground text-sm">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <h3 className="font-heading text-lg text-foreground mb-4">The Mushroom Lovers Principle for All Interview Answers</h3>
            <p className="text-muted-foreground leading-relaxed mb-4">Even if you are not doing a formal case study, the principle applies to every behavioral answer: <strong className="text-foreground">bring data.</strong></p>

            <div className="bg-card border border-border rounded-xl overflow-hidden">
              <div className="grid grid-cols-2 text-xs font-bold uppercase tracking-wider">
                <div className="px-5 py-3 bg-destructive/10 text-destructive border-b border-border">❌ Vague</div>
                <div className="px-5 py-3 bg-green-500/10 text-green-600 border-b border-l border-border">✅ Specific</div>
              </div>
              {[
                { vague: '"I improved the process."', specific: '"I reduced processing time from 5 days to 2 days."' },
                { vague: '"We grew the team."', specific: '"We went from 4 to 12 people in 8 months."' },
                { vague: '"Customer satisfaction improved."', specific: '"NPS went from 32 to 61 in one quarter."' },
                { vague: '"I increased sales."', specific: '"I grew pipeline by 35% and closed $2.1M in Q4."' },
                { vague: '"I saved the company money."', specific: '"I renegotiated 3 vendor contracts, saving $180K per year."' },
              ].map((row, i) => (
                <div key={i} className="grid grid-cols-2 border-b border-border last:border-b-0">
                  <div className="px-5 py-3 text-muted-foreground text-sm italic">{row.vague}</div>
                  <div className="px-5 py-3 text-foreground text-sm font-medium border-l border-border">{row.specific}</div>
                </div>
              ))}
            </div>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> I keep a mental scorecard during every interview. When a candidate uses specific numbers, I circle their answer in my notes. Candidates who use <strong className="text-foreground">3 or more specific metrics</strong> in an interview get recommended at <strong className="text-foreground">double the rate</strong> of those who use none. That is not a guess. That is what I have seen across 500+ hires.</p>
            </div>
          </div>
        </section>

        {/* Section 8: John Octopus Method */}
        <section id="octopus" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="08" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The John Octopus Method</h2>
                <p className="text-muted-foreground text-lg">Showing goal-setting in interviews</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">Interviewers love asking <strong className="text-foreground">"Where do you see yourself in 5 years?"</strong> and <strong className="text-foreground">"What are your career goals?"</strong> Most candidates give Miss Dreamer answers. "I want to be in a leadership position." These answers sound nice but say nothing.</p>

            <p className="text-muted-foreground leading-relaxed mb-6">In the book, John Octopus wanted to buy a computer. His first goal statement was weak: "I want a computer." <strong className="text-foreground">A real goal answers three questions:</strong></p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
              <div className="grid sm:grid-cols-3 gap-3">
                {[
                  { q: "1. WHAT specifically?", a: "$500 used Apple" },
                  { q: "2. WHEN?", a: "Within 6 months" },
                  { q: "3. CONDITIONS?", a: "No borrowing" },
                ].map((item) => (
                  <div key={item.q} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                    <p className="text-gold text-xs font-bold uppercase mb-1">{item.q}</p>
                    <p className="text-cream font-semibold text-sm">{item.a}</p>
                  </div>
                ))}
              </div>
            </div>

            <Collapsible title='"Where do you see yourself in 5 years?"'>
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">Weak answer:</strong> <span className="italic">"I see myself in a leadership role."</span></p>
                <p><strong className="text-green-400">Strong answer:</strong> <span className="italic">"In the next 2 years, I want to become the go-to person on the team for data analysis. I want to own at least one major project end to end. By year 3, I'd like to be mentoring newer team members. By year 5, I want to be leading a small team or a major workstream."</span></p>
                <p className="italic">"The gap between where I am now and where I want to be is mainly in two areas: project leadership experience and people management skills. This role fills the first gap. I plan to fill the second by volunteering for mentorship programs and cross-functional projects."</p>
              </div>
            </Collapsible>

            <Collapsible title='"Why are you looking for a new role?" (Gap Analysis)'>
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-destructive">Weak (Complainer):</strong> <span className="italic">"My current company is going nowhere. There's no growth. My manager doesn't support me."</span></p>
                <p><strong className="text-green-400">Strong (Gap Analysis):</strong> <span className="italic">"My goal is to work on problems at a global scale. My current role is focused on a single market. The gap between where I am and where I want to be is international exposure and cross-market strategy. Your team works across 15 countries. That is exactly the gap I need to close."</span></p>
              </div>
            </Collapsible>

            <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-gold">From my experience:</strong> When a candidate explains their career move as closing a specific gap, it tells me two things. First, they are intentional about their career. Second, they won't leave this role on a whim. They came here for a reason. Both of those signals make me more confident recommending them.</p>
            </div>
          </div>
        </section>

        {/* Section 9: 5 Interview Mistakes */}
        <section id="mistakes" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="09" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">5 Interview Mistakes Problem Solvers Never Make</h2>
              </div>
            </div>

            <div className="space-y-6">
              {[
                { num: "1", title: "Answering Before Understanding the Question", bad: "\"Tell me about a project you led.\" Candidate immediately launches into a story without asking what kind of project the interviewer cares about.", good: "\"When you say 'project,' are you looking for a technical project, a cross-functional initiative, or something where I led people? I have examples of all three and I want to give you the most relevant one.\"" },
                { num: "2", title: "Treating Symptoms Instead of Root Causes", bad: "\"Our team was slow, so I pushed everyone to work harder.\"", good: "\"Our team was slow. I dug into the data and found that 70% of the delays came from one bottleneck: waiting for design reviews. The designers weren't slow. They were overloaded because they supported three teams at once. I proposed a dedicated design resource for our team. Turnaround time dropped by 60%.\"" },
                { num: "3", title: "Not Testing Your Assumptions", bad: "\"The customers weren't happy, so I redesigned the product.\"", good: "\"I had a hunch that customers weren't happy with the product. Before redesigning anything, I pulled NPS data, reviewed support tickets, and interviewed 10 customers. Turns out they loved the product. They were unhappy with the billing experience. The fix was much smaller than a full redesign.\"" },
                { num: "4", title: "Giving One Solution When They Want to See Your Process", bad: "\"So I automated the report.\"", good: "\"I considered three options. Option A: automate the report entirely. Option B: simplify the report template. Option C: eliminate the report and replace it with a dashboard. I went with Option C because the report was only read by two people, and they told me they wanted real-time data, not a weekly PDF.\"" },
                { num: "5", title: "Making Decisions Without Weighted Criteria", bad: "\"It felt like the right move.\"", good: "\"I evaluated both vendors on three criteria: integration speed, ongoing cost, and customer support responsiveness. Vendor A was cheaper but had a 6-week integration timeline. Vendor B cost 20% more but integrated in one week and had 24/7 support. Given our tight deadline, I weighted speed and support higher than cost and went with Vendor B.\"" },
              ].map((mistake) => (
                <div key={mistake.num} className="bg-card border border-border rounded-xl p-5 md:p-6">
                  <h3 className="font-heading text-base text-foreground mb-3">Mistake {mistake.num}: {mistake.title}</h3>
                  <div className="space-y-3">
                    <div className="flex items-start gap-2">
                      <XCircle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm italic">{mistake.bad}</p>
                    </div>
                    <div className="flex items-start gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-400 shrink-0 mt-0.5" />
                      <p className="text-muted-foreground text-sm italic">{mistake.good}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Section 10: Framework in Action */}
        <section id="in-action" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <SectionNumber num="10" />
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Framework in Action: Examples by Role</h2>
                <p className="text-muted-foreground text-lg">Full annotated examples using the 4-step process</p>
              </div>
            </div>

            <p className="text-muted-foreground leading-relaxed mb-6">Every tool in this guide works for every role. But the language changes depending on whether you are interviewing for engineering, operations, customer service, sales, or people management. Each example below uses the full 4-step process.</p>

            {/* Engineering */}
            <Collapsible title="Engineering: Solving a complex technical problem">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[STEP 1 - UNDERSTAND]</strong> <span className="italic">"Our API response times jumped from 200ms to 1.2 seconds over a two-week period. The surface-level assumption from the team was that we needed to scale up our servers."</span></p>
                <p><strong className="text-gold">[STEP 2 - ROOT CAUSE]</strong> <span className="italic">"Before doing that, I wanted to understand the root cause. I broke the problem into three areas: database queries, application logic, and network latency. I ran traces on each layer. The spike was entirely in the application layer."</span></p>
                <p><strong className="text-gold">[STEP 2 - ROOT CAUSE (deeper)]</strong> <span className="italic">"I narrowed it further. One endpoint accounted for 85% of the degradation. That endpoint had been modified two weeks earlier. The new code was making a nested loop that called an external service for every item in a list."</span></p>
                <p><strong className="text-gold">[STEP 3 - ACTION PLAN]</strong> <span className="italic">"I had two options. Option A: add caching for the external service calls. Fast but stale data. Option B: refactor the code to batch the external calls. Cleaner but larger code change. I went with Option B because data accuracy mattered."</span></p>
                <p><strong className="text-gold">[STEP 4 - RESULTS]</strong> <span className="italic">"Response times dropped back to 180ms, better than the original baseline. The new CI performance test has flagged three potential regressions since then, all caught before reaching production."</span></p>
              </div>
            </Collapsible>

            <Collapsible title="Engineering: Designing for 10x traffic">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd break this into three areas. First, identify the bottleneck. Where does the system break first at 10x load? I'd run a load test before designing anything. Second, evaluate the options for the bottleneck. If it's the database: read replicas, caching, or sharding. If it's the application layer: horizontal scaling, async processing. Third, prioritize by impact and risk. Adding a caching layer is high impact and low risk. Sharding is high impact but high risk."</p>
              </div>
            </Collapsible>

            {/* Operations */}
            <Collapsible title="Operations: Improving an operational process">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[STEP 1]</strong> <span className="italic">"Our stockout rate on top-selling SKUs hit 18% in Q2. Target was under 5%."</span></p>
                <p><strong className="text-gold">[STEP 2]</strong> <span className="italic">"Forecasting errors accounted for 60% of stockouts. Our model used a simple 3-month rolling average. It didn't account for seasonality or promotions."</span></p>
                <p><strong className="text-gold">[STEP 3]</strong> <span className="italic">"Three options: hire a demand planner ($90K, 3 months), upgrade the forecasting model (I could build v1 in 2 weeks), or increase safety stock ($200K in working capital). I recommended option B plus temporary safety stock on top 20 SKUs."</span></p>
                <p><strong className="text-gold">[STEP 4]</strong> <span className="italic">"Stockout rate dropped from 18% to 6% in one month, then to 3.8% by end of Q3. We also recovered $150K in working capital once the model proved reliable."</span></p>
              </div>
            </Collapsible>

            <Collapsible title="Operations: Handling a sudden demand spike">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"Before reacting, I'd ask three questions. First, is this a one-time spike or a trend? Second, where is the constraint? Third, what is the cost of not meeting the demand? My hypothesis is that the constraint is in one specific part of the operation. I'd identify that bottleneck first. Then look at temporary fixes: overtime, temporary workers, simplified processes, or partner fulfillment."</p>
              </div>
            </Collapsible>

            {/* Customer Service */}
            <Collapsible title="Customer Service: Turning around a negative experience">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[STEP 1]</strong> <span className="italic">"A customer called in furious because they had been transferred 4 times over 3 days trying to resolve a billing error."</span></p>
                <p><strong className="text-gold">[STEP 2]</strong> <span className="italic">"The root cause wasn't the billing error. It was the handoff process. There was no ownership. Each agent treated it as a new ticket."</span></p>
                <p><strong className="text-gold">[STEP 3]</strong> <span className="italic">"I processed the refund on the spot, gave the customer a $50 credit and my direct email, and wrote up the case for my team lead."</span></p>
                <p><strong className="text-gold">[STEP 4]</strong> <span className="italic">"The customer stayed and left a positive review. My team lead created a new process: any unresolved billing issue gets assigned to a single owner. Repeat escalations for billing dropped by 40%."</span></p>
              </div>
            </Collapsible>

            <Collapsible title="Customer Service: Reducing handle time without hurting CSAT">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd start by understanding where the time is going. I'd pull a sample of 50 calls and break down handle time into categories. My hypothesis is that system lookup is the biggest time sink. If agents are spending 5 minutes navigating between systems, that's a tool problem, not a people problem. I'd propose a unified customer dashboard and one-click resolution paths for common issues."</p>
              </div>
            </Collapsible>

            {/* Sales */}
            <Collapsible title="Sales: Turning around a struggling territory">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[STEP 1]</strong> <span className="italic">"I inherited a territory that had missed quota for 3 consecutive quarters. Before making calls, I broke the pipeline into stages vs. company benchmarks."</span></p>
                <p><strong className="text-gold">[STEP 2]</strong> <span className="italic">"Lead volume was above average. The problem wasn't prospecting. Close rate was 25% vs. 42% company benchmark. I reviewed 10 lost deals. 7 out of 10 had the same pattern: the prospect went dark after receiving the proposal. Root cause: proposals were too generic."</span></p>
                <p><strong className="text-gold">[STEP 3]</strong> <span className="italic">"I rebuilt the proposal process. Pre-proposal discovery call to confirm top 3 pain points. Customized every proposal. Added industry-matched case studies."</span></p>
                <p><strong className="text-gold">[STEP 4]</strong> <span className="italic">"Close rate went from 25% to 48%. Hit 110% of quota that quarter. Revenue: $800K to $1.4M annually."</span></p>
              </div>
            </Collapsible>

            <Collapsible title="Sales: Approaching a brand-new market">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd break this into three phases. First, research and hypothesis. I'd talk to 15 to 20 potential customers before trying to sell anything. Second, small-scale testing with 5 prospects to learn where the sales process breaks down. Third, scale what works by taking the learnings, refining the pitch, and building a repeatable playbook."</p>
              </div>
            </Collapsible>

            {/* People Manager */}
            <Collapsible title="People Manager: Dealing with an underperforming team member">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p><strong className="text-gold">[STEP 1]</strong> <span className="italic">"One of my direct reports missed deadlines on three consecutive projects. My skip-level manager suggested putting them on a PIP."</span></p>
                <p><strong className="text-gold">[STEP 2]</strong> <span className="italic">"I diagnosed with a yes/no tree: Is it a skill issue? No. Is it a clarity issue? No. Is it a capacity issue? Yes. They absorbed a departed teammate's full workload. They were doing 1.5x the work."</span></p>
                <p><strong className="text-gold">[STEP 3]</strong> <span className="italic">"Three options: PIP (would likely cause them to quit), redistribute projects, or bring in a contractor. I chose a combination of redistribute + contractor."</span></p>
                <p><strong className="text-gold">[STEP 4]</strong> <span className="italic">"Back on track in 2 weeks. Hit every deadline for the rest of the quarter. They told me they had been close to quitting. If I had skipped the diagnosis and gone straight to a PIP, I would have lost a strong performer over a workload problem."</span></p>
              </div>
            </Collapsible>

            <Collapsible title="People Manager: Building a team from scratch">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd use the same goal-setting method John Octopus used. What specifically? A team of 6 for customer success. When? 4 months. Conditions? Within $650K total comp budget. Then calculate the gap and prioritize hires by impact and ease of filling. First hire: the Senior CSM (longest ramp time, helps interview the rest). Second: junior CSM. Third: CS Ops. Fourth: second junior CSM."</p>
              </div>
            </Collapsible>

            <Collapsible title="People Manager: Handling conflict between team members">
              <div className="mt-3 text-sm text-muted-foreground space-y-3">
                <p className="italic">"I'd start with diagnosis, not intervention. My hypothesis would be that the conflict is about a specific work issue, not a personality clash. Most workplace conflicts have a structural root cause: unclear ownership, conflicting priorities, or misaligned incentives. I'd meet with each person separately first. If it's about unclear ownership, I'd fix the structure. If it's about conflicting priorities, I'd align them. If it is genuinely interpersonal after removing structural causes, then I'd facilitate a mediated conversation."</p>
              </div>
            </Collapsible>
          </div>
        </section>

        {/* Quick Reference Toolkit */}
        <section id="toolkit" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <div className="flex items-start gap-5 mb-8">
              <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📋</span>
              <div className="pt-3">
                <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Quick Reference: The Problem-Solving Interview Toolkit</h2>
              </div>
            </div>

            <div className="space-y-4">
              {[
                { tool: "4-Step Framework", what: "Understand > Diagnose > Plan > Execute", when: "Every single interview answer", phrase: "\"Before I acted, I needed to understand the root cause.\"" },
                { tool: "Logic Tree", what: "Break a big question into smaller branches", when: "\"How would you...?\"", phrase: "\"I'd break this into three areas.\"" },
                { tool: "Yes/No Tree", what: "Diagnose by sorting into buckets", when: "\"Tell me about a time you identified a problem.\"", phrase: "\"I narrowed it down by asking a series of questions.\"" },
                { tool: "Hypothesis Pyramid", what: "State hunch > Explain why > Test before acting", when: "\"What would you do if...?\"", phrase: "\"My hypothesis was X, and here's how I tested it.\"" },
                { tool: "Criteria & Evaluation", what: "Compare options with weighted criteria", when: "\"Why this role?\" \"Why did you choose that?\"", phrase: "\"I evaluated this against three criteria.\"" },
                { tool: "Impact vs. Ease Matrix", what: "Plot solutions by impact and ease", when: "Case studies. \"How would you prioritize?\"", phrase: "\"I prioritized based on impact and ease.\"" },
                { tool: "Gap Analysis", what: "Define gap between current state and goal", when: "\"Where do you see yourself?\" \"Why are you looking?\"", phrase: "\"The gap between where I am and where I want to be is X.\"" },
              ].map((item) => (
                <div key={item.tool} className="bg-card border border-border rounded-xl p-5">
                  <div className="flex items-start justify-between gap-4 mb-2">
                    <h4 className="text-foreground font-semibold text-sm">{item.tool}</h4>
                  </div>
                  <p className="text-muted-foreground text-xs mb-1"><strong>What:</strong> {item.what}</p>
                  <p className="text-muted-foreground text-xs mb-1"><strong>When:</strong> {item.when}</p>
                  <p className="text-gold text-xs italic">{item.phrase}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How to Practice */}
        <section id="practice" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">How to Practice</h2>
            <p className="text-muted-foreground leading-relaxed mb-6">Reading this guide is step one. Practicing is where the change happens. Here is how to drill these tools before your next interview.</p>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-4">The 15-Minute Daily Drill</h3>
              <p className="text-muted-foreground text-sm mb-3">Pick one interview question. Set a timer for 2 minutes. Answer it out loud using the 4-step framework. Record yourself. Listen back and ask:</p>
              <ul className="space-y-2">
                {["Did I clarify the question before answering? (Step 1)", "Did I identify a root cause, or did I jump to a solution? (Step 2)", "Did I show more than one option? (Step 3)", "Did I share specific numbers and a lesson learned? (Step 4)"].map((item, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
                ))}
              </ul>
            </div>

            <h3 className="font-heading text-lg text-foreground mb-4">Practice Questions by Tool</h3>
            <div className="space-y-3 mb-6">
              <Collapsible title="Logic Tree Practice Questions">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• How would you reduce customer complaints by 50%?</li>
                  <li>• How would you grow a newsletter from 1,000 to 10,000 subscribers?</li>
                  <li>• How would you cut costs in a department by 20%?</li>
                </ul>
              </Collapsible>
              <Collapsible title="Yes/No Tree Practice Questions">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• Your team's output dropped last month. Walk through how you'd diagnose it.</li>
                  <li>• A product feature has low adoption. How would you figure out why?</li>
                  <li>• Sales in one region are down. Walk through your analysis.</li>
                </ul>
              </Collapsible>
              <Collapsible title="Hypothesis Pyramid Practice Questions">
                <ul className="mt-3 space-y-2 text-muted-foreground text-sm">
                  <li>• A competitor launched a similar product. What do you do?</li>
                  <li>• Employee turnover is up. What's your hypothesis and how would you test it?</li>
                  <li>• Customer acquisition cost doubled. What's going on?</li>
                </ul>
              </Collapsible>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6 mb-6">
              <h3 className="font-heading text-lg text-gold mb-4">The Practice Scorecard</h3>
              <div className="space-y-2">
                {[
                  "Did I clarify before answering?",
                  "Did I identify a root cause?",
                  "Did I show 2+ options?",
                  "Did I use specific numbers?",
                  "Did I share what I learned?",
                  "Did I stay under 2 minutes?",
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3 bg-background border border-border rounded-lg px-4 py-2.5">
                    <div className="w-5 h-5 rounded border-2 border-gold/40 shrink-0" />
                    <span className="text-foreground text-sm flex-1">{item}</span>
                    <span className="text-muted-foreground text-xs">YES / NO</span>
                  </div>
                ))}
                <div className="flex items-center justify-between mt-3 px-1">
                  <p className="text-foreground text-sm font-semibold">Score: ___/6</p>
                  <p className="text-gold text-sm font-medium">Goal: Hit 5/6 consistently before your interview.</p>
                </div>
              </div>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-4">Before Your Next Interview: Checklist</h3>
              <div className="space-y-5">
                {[
                  { heading: "Preparation", items: [
                    "I have 3 stories ready that follow the 4-step framework.",
                    "Each story has specific numbers (before/after, %, $, time).",
                    "I have researched the company using real sources.",
                    'I know my "Why this company?" answer with 3 weighted criteria.',
                    'I know my "Why are you looking?" answer framed as a gap analysis.',
                  ]},
                  { heading: "During the Interview", items: [
                    "I will pause before answering. Clarify if needed.",
                    "I will break problems into categories before solving them.",
                    "I will state my hypothesis and explain how I'd test it.",
                    'I will show 2-3 options when asked "How would you...?"',
                    "I will use numbers in every answer. No vague claims.",
                    "I will close every story with what I learned.",
                  ]},
                  { heading: "After the Interview", items: [
                    "I will write down every question I was asked.",
                    "I will score my answers against the 4-step framework.",
                    "I will identify which step I missed and practice it.",
                  ]},
                ].map((section) => (
                  <div key={section.heading}>
                    <p className="text-gold text-xs font-bold uppercase tracking-wider mb-2">{section.heading}</p>
                    <div className="space-y-1.5">
                      {section.items.map((item, i) => (
                        <div key={i} className="flex items-start gap-3 bg-background border border-border rounded-lg px-4 py-2.5">
                          <div className="w-4 h-4 mt-0.5 rounded border-2 border-gold/40 shrink-0" />
                          <span className="text-foreground text-sm">{item}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Final Word */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-background">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">One Last Thing</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">The best candidates do not memorize answers. <strong className="text-foreground">They learn how to think.</strong> Then every answer sounds natural, structured, and confident because it is.</p>
            <p className="text-muted-foreground leading-relaxed mb-4">These tools are not tricks. They are <strong className="text-foreground">thinking habits.</strong> Practice them when you prepare for interviews. Practice them when you solve problems at work. Practice them when you make decisions in your personal life.</p>
            <p className="text-muted-foreground leading-relaxed mb-6">Watanabe wrote "Problem Solving 101" for children. The fact that it became Japan's number one business best-seller tells you something. <strong className="text-foreground">Simple thinking tools, applied consistently, are more effective than any complex strategy.</strong></p>

            <div className="bg-executive-green rounded-xl p-6 md:p-8">
              <h3 className="font-heading text-lg text-gold mb-4">Your Interview Cheat Sheet</h3>
              <div className="space-y-2 text-cream/90 text-sm">
                <p><strong>Before you answer:</strong> "Let me make sure I understand..."</p>
                <p><strong>When diagnosing:</strong> "I broke it down into..."</p>
                <p><strong>When recommending:</strong> "My hypothesis is... here's how I'd test it."</p>
                <p><strong>When explaining why:</strong> "I evaluated this against three criteria."</p>
                <p><strong>When sharing results:</strong> Use numbers. Always use numbers.</p>
                <p><strong>When closing:</strong> "Here's what I learned and what I'd do differently."</p>
              </div>
              <p className="text-cream font-heading text-lg font-semibold mt-6">Start simple. Think structured. Get hired.</p>
            </div>
          </div>
        </section>

      </main>

      {/* Resources */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">Additional Resources</h2>
              <p className="text-cream/60">Keep levelling up your interview skills</p>
            </div>
          </div>

          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">The Book</h3>
            <p className="text-cream/80 text-sm italic mb-4">"Problem Solving 101: A Simple Book for Smart People" by Ken Watanabe</p>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/interview-prep-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Ace your interviews</p>
              <span className="text-gold text-sm font-medium">Interview Prep Guide →</span>
            </Link>
            <Link to="/resume-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Fix your resume</p>
              <span className="text-gold text-sm font-medium">Resume Guide →</span>
            </Link>
            <Link to="/job-offer-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Evaluate job offers</p>
              <span className="text-gold text-sm font-medium">Job Offer Guide →</span>
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

export default ProblemSolvingGuide;
