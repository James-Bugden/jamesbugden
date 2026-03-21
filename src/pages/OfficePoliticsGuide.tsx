import { Clock, Linkedin, ChevronDown, Menu, Users, Shield, Target, Zap, AlertTriangle, Eye, Brain, ArrowRight } from "lucide-react";
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

const tocSections = [
  { id: "intro", label: "Introduction" },
  { id: "ofol", label: "01 · 5 Organizational Facts" },
  { id: "wishes-goals", label: "02 · Wishes vs. Goals" },
  { id: "types", label: "03 · 4 Political Types" },
  { id: "leverage", label: "04 · Leverage" },
  { id: "network", label: "05 · Allies & Adversaries" },
  { id: "games", label: "06 · 8 Political Games" },
  { id: "suicide", label: "07 · Political Suicide" },
  { id: "four-ps", label: "08 · The 4 P's" },
  { id: "influence", label: "09 · Influence Skills" },
  { id: "game-plan", label: "10 · Your Game Plan" },
  { id: "cheat-sheet", label: "Quick Reference" },
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

const OfficePoliticsGuide = () => {
  useTrackGuideProgress("office-politics");

  return (
    <div className="min-h-screen bg-background">
      <PageSEO
        title="Office Politics: How to Get What You Want at Work | James Bugden"
        description="A recruiter's guide to office politics. The 5 organizational facts, 4 political types, 7 leverage boosters, and 8 games people play. Based on Marie McIntyre's research."
        path="/office-politics-guide"
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
            Office Politics:<br className="hidden sm:block" /> How to Get What You Want at Work
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-3">Without Backstabbing, Sucking Up, or Getting Fired</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">45 min read</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">Based on "Secrets to Winning at Office Politics" by Marie G. McIntyre, Ph.D.</p>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      <TableOfContents />

      {/* Introduction */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Let me be direct. The #1 reason talented people stall at work is not skill. Politics.
          </p>
          <p className="text-foreground text-lg leading-relaxed mb-6">
            I've seen this pattern over and over: a smart, hard-working person gets passed over, pushed out, or stuck. Not because they lacked ability. Because they lacked political awareness.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Most people hear "office politics" and think backstabbing. Sucking up. Scheming.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide is not about any of those things.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            <strong className="text-foreground">Politics is what happens when people with different goals, interests, and personalities try to work together.</strong> You're already playing. Every single day. The question is whether you're playing well or playing blind.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            And there's one rule above all others. McIntyre calls this the <strong className="text-foreground">Political Golden Rule: never advance your own interests by harming the business or hurting other people.</strong> This guide is about winning the right way. Ethical. Strategic. And effective.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">Who this guide is for:</h3>
            <ul className="space-y-2">
              {[
                "You started a new job and want to avoid early political mistakes",
                "You're stuck mid-career and don't understand why you keep getting passed over",
                "You sense something is off at work but don't know what's happening or how to fix the situation",
                "You're dealing with a difficult boss, toxic coworker, or political game you didn't sign up for",
                "You want to increase your influence without becoming the person everyone hates",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Marie McIntyre is an organizational psychologist who has coached hundreds of employees, managers, and executives through political messes. Her book, <em>Secrets to Winning at Office Politics</em>, is the most practical guide I've found on this topic. She names what most career advice won't touch.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide gives you the core frameworks from her book, filtered through my experience as a recruiter who watches people either thrive or self-destruct based on their political ability.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6">
            <h3 className="font-heading text-lg text-gold mb-4">What you'll get:</h3>
            <ul className="space-y-2">
              {[
                "The 5 facts about organizations nobody tells you",
                "How to tell if you're a political Winner or headed for trouble",
                "The 7 things increasing your influence at work",
                "The 8 games people play and how to respond",
                "A step-by-step plan to increase your influence",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Main content */}
      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">

        {/* Section 1: 5 Organizational Facts */}
        <section id="ofol" className="py-14 md:py-20 scroll-mt-24">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 5 Organizational Facts of Life</h2>
              <p className="text-muted-foreground text-lg">The rules of the game most people never learn</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">McIntyre calls these the <strong className="text-foreground">Organizational Facts of Life (OFOL)</strong>. They're the rules of the game. Most people never learn them. The ones who do have a massive advantage.</p>

          <div className="space-y-6">
            {[
              { title: "OFOL #1: Organizations Are Not Democracies", content: "You don't get a vote. Someone above you makes decisions. You carry them out. This is by design. If everyone had to agree before anything happened, nothing would get done." },
              { title: "OFOL #2: Some People Have More Power Than Others", content: "This isn't cynical. This is structural. Your CEO has more power than your manager. Your manager has more power than you. The sooner you accept this, the sooner you stop fighting the system and start working within the structure." },
              { title: "OFOL #3: Virtually All Decisions Are Subjective", content: "People make decisions based on their values, beliefs, goals, and preferences. Not yours. Two people will look at the same situation and reach opposite conclusions. Both will call their view \"objective.\" Neither is wrong. They're different." },
              { title: "OFOL #4: Your Boss Has Control Over Much of Your Life", content: "Your boss affects your pay, your assignments, your reputation, your advancement, and the general quality of your work life. You traded personal control for a paycheck. The deal is the deal." },
              { title: "OFOL #5: Fairness Is an Impossible Goal", content: "No absolute standard of fairness exists. Perception drives fairness. Any large decision will trigger someone complaining. Getting worked up about fairness wastes time and energy." },
            ].map((ofol, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5 md:p-6">
                <h3 className="font-heading text-lg text-foreground mb-3">{ofol.title}</h3>
                <p className="text-muted-foreground text-sm leading-relaxed">{ofol.content}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">The takeaway from OFOL #4:</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">Instead of worrying about how your boss treats you, start figuring out how to relate to your boss. Managing upward is one of the most important skills you need.</p>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-4">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">I've interviewed thousands of candidates. The ones who spend the interview complaining about how they were treated "unfairly" at their last job? Red flag. Every time. Not because their complaint isn't valid. Because they focus on grievances instead of goals. The best candidates talk about what they did to change their situation. They talk about the future. Not the past.</p>
          </div>
        </section>
      </main>

      {/* Section 2: Wishes vs Goals */}
      <section id="wishes-goals" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Wishes vs. Goals</h2>
              <p className="text-muted-foreground text-lg">Stop complaining, start planning</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">There's a line between <strong className="text-foreground">wishes</strong> and <strong className="text-foreground">goals</strong>. This distinction changes everything.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h3 className="text-destructive font-semibold text-sm mb-3">Wishes sound like this:</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>"I wish I made more money."</li>
                <li>"I wish my boss wasn't so difficult."</li>
                <li>"I wish I got the promotion instead of Susan."</li>
                <li>"I wish someone would offer me a better job."</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-3">Wishing is passive. Wishing puts the focus on what you want "them" to do. Wishing takes you out of the power position.</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
              <h3 className="text-green-400 font-semibold text-sm mb-3">Goals sound like this:</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>"I will develop the skills I need for a higher-paying role."</li>
                <li>"I will communicate in a more productive way with my boss."</li>
                <li>"I will ask my manager what I need to do to prepare for the next promotion."</li>
                <li>"I will update my resume and start looking at roles in my field."</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-3">Goals imply action. Goals put you in control.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The 5-Step Wish-to-Goal Conversion</h3>
          <div className="space-y-3 mb-6">
            {[
              { step: "Step 1", desc: "Define the specific result you want. \"I want more money\" is vague. \"I want a role paying $120K\" is specific." },
              { step: "Step 2", desc: "Identify the obstacles in your way. Lack of education? Limited career path? Negative perceptions from decision-makers?" },
              { step: "Step 3", desc: "Figure out what YOU will do to overcome those obstacles. Not what someone else should do. What you will do." },
              { step: "Step 4", desc: "Write a goal statement. A goal statement starts with \"I,\" uses an action verb, and describes something specific. Example: \"I will research degree programs fitting my work schedule.\"" },
              { step: "Step 5", desc: "Take the first step. Then the next one. Big goals feel manageable when you focus on one action at a time." },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.step}:</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">I've seen people stay stuck for years. Same role. Same complaints. Same lunch group where everyone vents about management. The people who move forward? They stop wishing and start planning. They send the email. They have the conversation. They apply for the job. Wishing costs you nothing. And delivers nothing.</p>
          </div>
        </div>
      </section>

      {/* Section 3: 4 Political Types */}
      <section id="types" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 4 Political Types</h2>
              <p className="text-muted-foreground text-lg">Which one are you?</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">Four political types exist, based on how your behavior affects your business goals and personal goals.</p>

          {/* 2x2 Grid */}
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">Martyr</p>
                <p className="text-muted-foreground text-xs">Helps the org. Hurts themselves.</p>
              </div>
              <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">Winner ✓</p>
                <p className="text-muted-foreground text-xs">Helps the org AND themselves.</p>
              </div>
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">Dimwit</p>
                <p className="text-muted-foreground text-xs">Hurts themselves AND the org.</p>
              </div>
              <div className="bg-orange-500/10 border border-orange-500/20 rounded-lg p-4">
                <p className="font-bold text-foreground text-sm mb-1">Sociopath</p>
                <p className="text-muted-foreground text-xs">Helps themselves. Hurts the org.</p>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">The Martyr</h3>
              <p className="text-foreground text-sm font-semibold mb-2">Helps the organization. Hurts themselves.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Martyrs sacrifice everything for the company. They work the longest hours. They say yes to everything. They never push back. And they end up feeling unappreciated and resentful.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Some Martyrs are pleasers. They do whatever the boss wants, no matter the cost. Take Emily, a VP of customer service who worked herself into exhaustion trying to meet her CEO's impossible demands. She never pushed back. She never set boundaries. Her reward? She got replaced. By someone who worked fewer hours, had more staff, and got paid twice as much.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Other Martyrs are crusaders. They fight for a cause they believe in. But their single-minded preaching pushes people away. The influence they seek gets destroyed by their approach.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">The Sociopath</h3>
              <p className="text-foreground text-sm font-semibold mb-2">Helps themselves. Hurts the organization.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Sociopaths only care about their own needs. They meet personal goals in ways creating problems for everyone else. Short-term, they look like winners. Long-term, their selfishness catches up with them.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">This includes people who steal time by doing nothing all day. People who use personal connections to dodge accountability. And executives who award themselves massive bonuses while the company loses money.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">The Dimwit</h3>
              <p className="text-foreground text-sm font-semibold mb-2">Hurts themselves AND the organization.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Emotions control Dimwits, not the other way around. The manager who yells at employees until they all quit. The partner who makes inappropriate comments until a lawsuit shows up. The supervisor who berates people until HR investigates.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">Dimwit behavior is self-destructive and harmful to the business. These people don't intend to fail. Anger, anxiety, or impulse runs the show.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">The Winner</h3>
              <p className="text-foreground text-sm font-semibold mb-2">Helps the organization AND themselves.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Winners deliver results making the business more successful. At the same time, they build their own career, reputation, and network.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">The book profiles Glenn, who joined his company as an accountant and worked his way up to VP of finance. At each step, he learned new things, took on visible projects, delivered results, got to know executives, and built positive relationships. People respected his success because they watched him earn every step.</p>
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">The key question:</strong> Which type are you? Not on your best day. Under stress. When things go wrong. When your boss makes a decision you hate. When a coworker gets the promotion you wanted.</p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">I've hired all four types. Winners are easy to spot. They talk about what they accomplished AND how they worked with others to do the work. In interviews, I listen for the balance. Results AND relationships. If you've got both, you're a Winner.</p>
          </div>
        </div>
      </section>

      {/* Section 4: Leverage */}
      <section id="leverage" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Forget Fairness, Look for Leverage</h2>
              <p className="text-muted-foreground text-lg">One of the most important concepts in the book</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6"><strong className="text-foreground">Leverage is your ability to get others to do what you want.</strong> Not through force. Not through manipulation. Through positioning.</p>

          <p className="text-muted-foreground leading-relaxed mb-6">Here's a simple example: you want to ask your boss for a raise. Are you more likely to get the raise if (a) you've been loyal for five years or (b) you have another job offer? Your leverage increases when your services are desired elsewhere.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">The Leverage Equation</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">In every interaction, there's a leverage equation. Who has more? Who needs what from whom? Winners calculate this accurately. Overestimate your leverage and you set yourself up for a fall. Underestimate yours and you miss opportunities.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Here's a great example from the book: Marcia threatens to withhold payment from her movers while they still have half her furniture on the truck. Bad timing. The movers had equal leverage. If she waited until everything was unloaded, the equation would have shifted in her favor.</p>

          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-8">
            <h3 className="text-destructive font-semibold text-sm mb-3">Common leverage mistakes:</h3>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>Defying your boss because you "shouldn't have to" do something (your boss has more leverage)</li>
              <li>Complaining about the CEO to the CEO's executive assistant (loyalty is part of the leverage equation)</li>
              <li>Refusing a direct request from your manager because you disagree with the task. Brian, an engineer in the book, ignored his boss's request for project status updates because he didn't think he should have to do them. He got a lower performance rating and a reduced pay increase. He was shocked. He shouldn't have been.</li>
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The 7 Leverage Boosters</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Seven ways to increase your leverage at work:</p>

          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "The Power of Results", desc: "Deliver outcomes making your organization more competitive. The more dramatic your results, the more leverage you build." },
              { num: "2", title: "The Power of Knowledge", desc: "Develop deep expertise in your work. Become the person people seek out when they need answers." },
              { num: "3", title: "The Power of Attitude", desc: "Be the type of person others want to work with. Friendly. Helpful. Cooperative. Keep negative reactions to yourself." },
              { num: "4", title: "The Power of Empathy", desc: "Try to understand other people's problems. A sympathetic ear builds trust and information." },
              { num: "5", title: "The Power of Networks", desc: "The more connections you have (inside and outside your organization) the more problems you solve and the higher your leverage." },
              { num: "6", title: "The Power of Inclusion", desc: "Involve others in your decisions and projects. Build bridges to other functions. Break down silos." },
              { num: "7", title: "The Power of Detachment", desc: "Don't get too emotionally invested. People who overreact to criticism or suggestions are difficult to work with. Being seen as unbiased and thoughtful increases your influence." },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.num}. {item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">When candidates ask me how to negotiate a better offer, they're asking about leverage. You have the most leverage after they extend the offer and before you accept. Use the moment. But also: leverage isn't a one-time thing. You build leverage every day. Every result you deliver. Every relationship you build. Every problem you solve.</p>
          </div>
        </div>
      </section>

      {/* Section 5: Allies & Adversaries */}
      <section id="network" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Allies, Adversaries, and Your Political Network</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">The core truth: <strong className="text-foreground">positive relationships build political capital.</strong> When you like people, you want to help them. When you don't, you won't go out of your way. Simple. Your supporters increase your leverage. Your enemies reduce your leverage. If your adversaries outnumber your allies, you're in trouble.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">3 Types of Allies</h3>
          <div className="space-y-3 mb-8">
            {[
              { type: "Friends", desc: "Colleagues who \"click\" because of common interests or similar personalities. These happen naturally. But remember: colleagues judge your personality and competence separately. Your office buddy might like you but still think you're not great at your job." },
              { type: "Partners", desc: "Colleagues whose outcomes are tied to yours. You depend on each other to get results. These come with your job. The key is to treat Partners as allies, not rivals. When Partners compete instead of collaborate, everyone loses." },
              { type: "Connections", desc: "People you call on when you need information, assistance, or a favor. The more Connections you have, the more problems you solve. But don't overuse them. Too many favors and you wear out your welcome." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.type}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Building Your Network (Even If You're Introverted)</h3>
          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <p className="text-muted-foreground text-sm mb-3">You don't have to be the most social person in the office. You do need to:</p>
            <ul className="space-y-2">
              {[
                "Identify the people you need to know. Who makes decisions about your goals?",
                "Find ways to interact. Meetings. Lunch. Professional events. A simple conversation about their work.",
                "Be someone people want to talk to. Helpful. Competent. Friendly. Predictable in mood.",
                "Get outside your comfort zone. Stop hanging out only with people who think like you.",
                "Look for shared interests. Common ground personalizes relationships.",
                "Be helpful. Offering assistance builds bridges. Every time.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{item}</span></li>
              ))}
            </ul>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">3 Types of Adversaries</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Not everyone who annoys you is an adversary. An adversary is someone who <strong className="text-foreground">stands between you and your goals.</strong> Three categories:</p>
          <div className="space-y-3 mb-6">
            {[
              { type: "Focused adversaries", desc: "Want their own way and see you as an obstacle. Nothing personal. They want the promotion, the assignment, the resources. You're in the way.", strategy: "Find common ground. Show them how you contribute to their success. If you fail to convert them, contain them by increasing your own leverage." },
              { type: "Emotional adversaries", desc: "Create problems for everyone. Their behavior springs from their own needs, not yours. They throw tantrums, pout, form cliques, or get their feelings hurt.", strategy: "Don't get hooked into their emotions. Stay calm. Stay rational. Don't try to change their personality. Focus on reducing their harmful behavior around you." },
              { type: "Vengeful adversaries", desc: "Specifically out to get you. Sometimes because of something you did (without knowing). Sometimes because they're wired for conflict.", strategy: "First, examine your own actions. Did you trigger their resentment? If so, try the direct approach: \"I don't think our working relationship is going well. I'd like to figure out how to improve things.\" If they're irrational, focus on containment and protecting yourself." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.type}</p>
                <p className="text-muted-foreground text-sm mb-2">{item.desc}</p>
                <p className="text-gold text-xs font-semibold mb-1">Strategy:</p>
                <p className="text-muted-foreground text-sm">{item.strategy}</p>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">I tell every new hire the same thing: your first 90 days are about building allies. Not impressing people with how smart you are. Not proving you were the right hire. Building relationships. The people who succeed long-term at any company are the ones with a strong network. The ones who get pushed out? Almost always, they ran out of allies before they ran out of ability.</p>
          </div>
        </div>
      </section>

      {/* Section 6: 8 Political Games */}
      <section id="games" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 8 Political Games People Play</h2>
              <p className="text-muted-foreground text-lg">Recognize them before they cost you</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Eight common political games show up in every workplace. Each has a pattern, an emotional payoff for the player, and a countermove for you. Knowing these games helps you spot them early and respond with your brain, not your emotions.</p>
          <p className="text-muted-foreground leading-relaxed mb-8">Every workplace has at least two or three of these running at any given time. You don't have to play. But you do have to recognize what's happening. The worst outcome isn't losing a game. The worst outcome is not realizing you're in one.</p>

          <h3 className="font-heading text-lg text-gold mb-4">Power Games</h3>
          <div className="space-y-4 mb-8">
            {[
              {
                num: "1", title: "The Suck-Up Game", motto: "\"I think you're wonderful, so you have to like me.\"",
                desc: "The player showers management with compliments and never disagrees. They direct all their energy upward. Colleagues resent them. Management gets filtered information instead of honest feedback.",
                example: "In the book, Albert, a district manager, had a motto: \"Keeping the boss happy is job one.\" When his sales staff raised concerns about an unrealistic marketing plan, Albert brushed them off. He'd never question the boss. His team suffered. The plan failed.",
                move: "Draw out their real opinions in private. In meetings, ask specific questions requiring honest answers, not flattery."
              },
              {
                num: "2", title: "The Control Game", motto: "\"You have no authority over me.\"",
                desc: "The player resists direction from others. Some are dominators who want to give the orders. Others are resistors who refuse outside influence over their work.",
                example: "Consider Sherry, whose new employee Matt made clear he didn't respect her and believed he should have her job. He argued with her, ignored her requests, and started cultivating her boss by golfing with him on weekends. Sherry avoided the conflict because talking to Matt was unpleasant. This made things worse.",
                move: "Don't get sucked into a power struggle. Stand your ground. Address work issues directly. And increase your leverage with management so the equation favors you."
              },
              {
                num: "3", title: "The Shunning Game", motto: "\"If you don't fit in, we're going to get you.\"",
                desc: "A group punishes someone for being different. The target gets excluded from lunches, conversations, and social events. Nobody admits anything is happening.",
                example: "In the book, Darla, a new executive assistant, had a casual style not matching the polished image of the other assistants. They tried to \"help\" by telling her where to buy clothes and get her hair done. When she laughed off their suggestions, the shunning started. No one stopped by her desk. She ate lunch alone. Nobody admitted anything was wrong.",
                move: "Find other sources of support. Build relationships with the friendlier members of the group individually. Try to identify the behavior triggering the shunning (even if the reason seems unfair)."
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>
                <p className="text-gold text-xs font-semibold mb-1">Your move:</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-gold mb-4">Ego Games</h3>
          <p className="text-muted-foreground text-sm mb-4">Power Games are about control and status within the hierarchy. Ego Games are different. They're about insecurity. The players need to feel special, and they'll make your life worse to get there.</p>
          <div className="space-y-4 mb-8">
            {[
              {
                num: "4", title: "The Superiority Game", motto: "\"Aren't you impressed with me?\"",
                desc: "The player brags constantly, controls conversations, and makes sure everyone knows how important they are. Underneath the posturing, they're deeply insecure. In the book, Charlotte hijacked every meeting to talk about her big projects, took calls mid-conversation, and dismissed whatever you needed to discuss. Colleagues learned to stop scheduling time with her.",
                example: "In interviews, I spot this within the first two minutes. The candidate who name-drops three executives before I finish my first question. The one who describes every accomplishment in superlatives. Confidence is attractive. Performing confidence is repulsive.",
                move: "Don't reward the behavior. Don't ask follow-up questions about their latest achievement. Address problematic behavior directly when the behavior interferes with work."
              },
              {
                num: "5", title: "The Put-Down Game", motto: "\"You're obviously an idiot, so I must be brilliant.\"",
                desc: "The player makes biting, sarcastic remarks to make others feel stupid. They only feel good about themselves by making someone else feel bad. In the book, George, a manager, interrupted a staff member's presentation after three minutes with \"your conclusions are incorrect\" and \"I used to think you had a mind for strategy, but now I'm not sure you have a mind at all.\" His staff dreaded meetings.",
                example: "I've hired people who quit within a year because of a Put-Down boss. The damage is real. And here's what concerns me most: the Put-Down player rarely gets fired until retention numbers force the issue. By then, the best employees are already gone.",
                move: "Don't tremble. Maintain confidence. Get other opinions on your work from mentally healthy people. If this person is your boss, find another job as soon as possible."
              },
              {
                num: "6", title: "The In-Group Game", motto: "\"You'd like to be one of us, but you're not welcome.\"",
                desc: "Two unequal groups exist. Everyone knows one group is more desirable and the group restricts membership. Nobody talks about the dynamic openly. In the book, nine district managers had quarterly meetings dominated by four senior members. They golfed together the day before, had dinner together, sat on the same side of the table, and always voted as a block. When a new manager unknowingly sat in one of their chairs, the \"jokes\" didn't stop until he moved.",
                example: "",
                move: "Band together with other out-group members to acknowledge the dynamic. Build individual relationships with the more accessible in-group members. Suggest activities mixing the groups."
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                {game.example && <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>}
                <p className="text-gold text-xs font-semibold mb-1">Your move:</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-gold mb-4">Escape Games</h3>
          <p className="text-muted-foreground text-sm mb-4">Power Games grab control. Ego Games grab attention. Escape Games dodge responsibility. The players below are either avoiding blame or avoiding work.</p>
          <div className="space-y-4">
            {[
              {
                num: "7", title: "The Scapegoat Game", motto: "\"This problem was clearly your fault.\"",
                desc: "Someone is quickly blamed for a problem with no exploration of other causes. This is especially dangerous when your boss is the player.",
                example: "A clothing chain CEO was reviewing a 32% decline in sales. The marketing VP presented data showing customers came into the stores but didn't buy because the merchandise had changed. The CEO (who had personally chosen the new product lines) refused to hear this. He declared the decline an \"advertising problem.\" The facts were irrelevant. Someone needed to take the blame, and the CEO wasn't going to be the one.",
                move: "Don't argue. Acknowledge partial responsibility if appropriate. Subtly defend yourself by stating facts. If your boss plays this regularly, invest in CYA (cover your ass) activities."
              },
              {
                num: "8", title: "The Avoidance Game", motto: "\"I don't want to do the work, so I'm not going to do the work.\"",
                desc: "The player puts off difficult or unpleasant tasks. They use excuses as delaying tactics. Anyone who depends on them suffers.",
                example: "In the book, Karen needed a contract from Gerald, the corporate attorney, to close the biggest order of her career. Four weeks passed. Gerald sent three excuses. Then he went silent. The real reason? Gerald hated discussing contracts with the CEO, who quibbled over every clause. So Gerald avoided the entire task while Karen's deal hung in limbo.",
                move: "Always get a commitment to a specific date. Offer to help with the difficult part. Make the consequences of delay visible to people with influence."
              },
            ].map((game) => (
              <div key={game.num} className="bg-background border border-border rounded-xl p-5 md:p-6">
                <h4 className="font-heading text-base text-foreground mb-1">{game.num}. {game.title}</h4>
                <p className="text-muted-foreground text-sm italic mb-3">{game.motto}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.desc}</p>
                <p className="text-muted-foreground text-sm leading-relaxed mb-3">{game.example}</p>
                <p className="text-gold text-xs font-semibold mb-1">Your move:</p>
                <p className="text-muted-foreground text-sm">{game.move}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 7: Political Suicide */}
      <section id="suicide" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How to Commit Political Suicide</h2>
              <p className="text-muted-foreground text-lg">So you avoid doing this</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">If you want to destroy your career, here's the recipe: become The Problem.</p>
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">The Problem is anyone who consumes too much of management's time and attention.</strong> Managers have limited patience. Once someone tips into "Problem" territory, the manager starts fantasizing about how pleasant life would be without the person.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">There's a <strong className="text-foreground">tipping point</strong>. The moment a manager shifts from "this person has some issues" to "I need this person gone." Once you've tipped, every future behavior confirms their negative conclusion. You're in a deep hole. Digging out is extremely hard.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-8">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h3 className="text-destructive font-semibold text-sm mb-3">Anger-based destruction:</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><strong>Complaining:</strong> constant negativity about management, coworkers, the company</li>
                <li><strong>Rebellion:</strong> disagreeing with decisions, refusing to follow policies you don't like</li>
                <li><strong>Confrontation:</strong> yelling, cursing, berating people, making them cry</li>
              </ul>
            </div>
            <div className="bg-yellow-500/5 border border-yellow-500/20 rounded-xl p-5">
              <h3 className="text-yellow-500 font-semibold text-sm mb-3">Anxiety-based destruction:</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li><strong>Timidity:</strong> afraid to speak up, always capitulating to keep the peace</li>
                <li><strong>Neediness:</strong> constantly seeking reassurance about your work quality</li>
                <li><strong>Hiding:</strong> avoiding interaction, ducking conversations, becoming invisible</li>
              </ul>
            </div>
          </div>

          <Collapsible title="The Victim Identity Trap">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>Watch your self-talk. If you constantly tell yourself "No one appreciates me" or "I always get passed over," you're building a Victim Identity. This is one of the most politically destructive patterns.</p>
              <p>Take Dorothy, who didn't get a promotion and decided her boss must be the enemy. She pulled away from him. Stopped asking for advice. Started communicating only through email. Filed a grievance. Wrote a letter to the department head. With each action, she dug herself deeper into The Problem category. The promotion she originally missed became impossible.</p>
              <p><strong className="text-foreground">The pattern:</strong> Something bad happens. You decide you're a victim. You look for evidence confirming your belief. You find evidence everywhere. Your behavior changes. People notice. Things get worse. You blame them. Repeat.</p>
            </div>
          </Collapsible>

          <h3 className="font-heading text-lg text-foreground mt-8 mb-4">Warning Signs You're in Political Trouble</h3>
          <div className="space-y-4 mb-8">
            {[
              { level: "Level 1: Something isn't right.", items: ["Growing uneasiness and angry thoughts about unfairness", "Colleagues seem distant or evasive", "Your boss ignores you or makes pointed remarks", "Your boss has a \"serious talk\" about your performance", "The company brings in a personal coach for you (they're investing, but you've got issues)"] },
              { level: "Level 2: The future looks questionable.", items: ["An important assignment goes to someone else", "You're turned down for promotions more than once", "Your leverage is slipping after getting a new boss", "Someone from HR starts checking in with you regularly"] },
              { level: "Level 3: Career change ahead.", items: ["You lose staff, title, responsibilities, or reporting level after a reorg", "Your boss's boss reinforces a serious talk you already had", "Layoff rumors are swirling and people avoid eye contact with you"] },
            ].map((lvl, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-2">{lvl.level}</p>
                <ul className="space-y-1.5">
                  {lvl.items.map((item, j) => (
                    <li key={j} className="flex items-start gap-2 text-muted-foreground text-sm">
                      <AlertTriangle className="w-3.5 h-3.5 text-yellow-500 shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Political Plastic Surgery: The AMISH Model</h3>
          <div className="space-y-3 mb-6">
            {[
              { letter: "A", title: "Awareness", desc: "Recognize something is wrong. Seek feedback. Ask questions. Don't wait for the ax to fall." },
              { letter: "M", title: "Motivation", desc: "Accept you need to change. If you don't think you have a problem, you won't fix anything." },
              { letter: "I", title: "Identification", desc: "Get specific about what needs to change. \"Bad attitude\" is too vague. \"I interrupt people in meetings and dismiss their ideas\" is specific." },
              { letter: "S", title: "Substitution", desc: "For every behavior you stop, decide what you'll start doing instead. \"When I feel angry in meetings, I will take a deep breath and ask a question instead of arguing.\"" },
              { letter: "H", title: "Habit Replacement", desc: "New habits take time. Expect setbacks. People won't believe the new you immediately. Be patient and consistent." },
            ].map((item) => (
              <div key={item.letter} className="bg-card border border-border rounded-xl p-4 flex items-start gap-4">
                <span className="text-gold font-heading text-2xl font-bold">{item.letter}</span>
                <div>
                  <p className="text-foreground font-semibold text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-sm">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed mb-3">I've seen talented people get fired from jobs they were great at. Not because the work was bad. Because they became The Problem. The saddest version? People who don't realize the end is coming. They think everything is fine while their manager is already planning their exit.</p>
            <p className="text-muted-foreground text-sm leading-relaxed">If you feel uneasy at work. If your boss has been distant. If assignments are going to other people. Pay attention. Those feelings are data. Act on them before the decision gets made for you.</p>
          </div>

          <div className="bg-executive-green rounded-xl p-5 mt-6">
            <p className="text-cream/90 text-sm font-medium">If you recognize yourself here, go to Section 10, PATH A for the full action plan.</p>
          </div>
        </div>
      </section>

      {/* Section 8: The 4 P's */}
      <section id="four-ps" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 4 P's of Political Power</h2>
              <p className="text-muted-foreground text-lg">Your framework for increasing influence</p>
            </div>
          </div>

          <div className="bg-executive-green rounded-xl p-6 md:p-8 mb-8">
            <div className="grid sm:grid-cols-2 gap-4">
              {[
                { p: "P1", title: "Power Assessment", desc: "How strong is your leverage position?" },
                { p: "P2", title: "Performance", desc: "Are your results making the business more successful?" },
                { p: "P3", title: "Perception", desc: "Do the right people know about your results?" },
                { p: "P4", title: "Partnerships", desc: "Are you building alliances expanding your reach?" },
              ].map((item) => (
                <div key={item.p} className="bg-cream/5 border border-cream/10 rounded-xl p-4">
                  <p className="text-gold text-xs font-bold uppercase mb-1">{item.p}</p>
                  <p className="text-cream font-semibold text-sm mb-1">{item.title}</p>
                  <p className="text-cream/60 text-xs">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #1: Power Assessment</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Evaluate both your position influence (what your job gives you: authority, access, visibility) and your personal influence (what you bring: expertise, attitude, relationships, track record).</p>
              <p className="text-foreground text-sm font-semibold mb-2">Ask yourself:</p>
              <ul className="space-y-2">
                {["Do decision-makers know who I am?", "Do people trust me with information?", "When I want something, do I usually get the outcome?", "Would key people go to bat for me?"].map((q, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{q}</span></li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #2: Performance</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">The Performance Principle: business results determine your value.</strong> You need an ROI mindset. Your organization invested in your position and in you specifically. Do you know what return management expects? Are you delivering more than the minimum?</p>
              <p className="text-foreground text-sm font-semibold mb-2">Deliver the goods:</p>
              <ul className="space-y-2">
                {["Understand what's important to your boss (whether you like them or not)", "Recognize the values of the Power Elite (the executives who run the show)", "Focus on fundamentals: quality work, deadlines met, commitments kept", "Be reliable. Be dependable. Those two words should come to mind when anyone thinks of you."].map((q, i) => (
                  <li key={i} className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">{q}</span></li>
                ))}
              </ul>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #3: Perception</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">The Perception Principle: invisible contributions have no political value.</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">She tells a story about a teenager who rescues two kids from a burning house. In version one, he carries them out the front door. Crowd cheers. TV reporter interviews him. He gets a scholarship changing his life. In version two, he carries them out the back door. Nobody sees the rescue. No TV report. No scholarship. Same act. Different outcome. Perception matters.</p>

              <div className="bg-card border border-border rounded-xl p-4 mb-4">
                <p className="text-foreground text-sm font-semibold mb-2">Categorize your work into four types:</p>
                <div className="grid grid-cols-2 gap-2">
                  {[
                    { type: "Starmakers", desc: "High visibility, high importance. Put extra effort here.", color: "bg-green-500/10" },
                    { type: "Maintenance", desc: "High visibility, low importance. Don't screw these up.", color: "bg-yellow-500/10" },
                    { type: "Transparent Tasks", desc: "Low visibility, high importance. Find ways to get these into the spotlight.", color: "bg-blue-500/10" },
                    { type: "Time Wasters", desc: "Low visibility, low importance. Minimize or eliminate.", color: "bg-destructive/10" },
                  ].map((item) => (
                    <div key={item.type} className={`${item.color} rounded-lg p-3`}>
                      <p className="text-foreground text-xs font-bold mb-1">{item.type}</p>
                      <p className="text-muted-foreground text-[11px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
              <p className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">Watch the details:</strong> Sloppy emails, typos, missed deadlines. Small errors make people assume your other work is sloppy too.</p>
            </div>

            <div className="bg-background border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">P #4: Partnerships</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">The Partnership Principle: the more people you work with, the more your influence increases.</strong></p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3">Every time you snap at someone, react defensively, or fail to cooperate, you give away a little of your political influence.</p>
              <p className="text-muted-foreground text-sm leading-relaxed mb-3"><strong className="text-foreground">Stretch your tolerance zone.</strong> People with different work styles aren't wrong. They're different. The people who annoy you most are often your natural complements. They have strengths you lack. Learn to work with them, and you'll produce better results.</p>
              <p className="text-muted-foreground text-sm leading-relaxed">McIntyre shares the story of Gayle, a stressed-out technical publications supervisor drowning in frustration and anger. After applying the 4 P's, she stopped complaining, started collaborating with product managers, changed her behavior with her boss, and got promoted to director. Her biggest move? She quit her daily lunch group. "The group wasn't a support group," she said. "The group was a bitching club."</p>
            </div>
          </div>

          <div className="bg-card border border-gold/30 rounded-xl p-5 mt-6">
            <h4 className="text-gold font-semibold mb-2">My Take</h4>
            <p className="text-muted-foreground text-sm leading-relaxed">The 4 P's apply to your job search too. Power Assessment: do you have the leverage to negotiate? Performance: does your resume show results? Perception: do the right people (recruiters, hiring managers) know about your work? Partnerships: is your network strong enough to surface opportunities? If any of these are weak, focus there.</p>
          </div>
        </div>
      </section>

      {/* Section 9: Influence Skills */}
      <section id="influence" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Influence Skills: The Winner's Toolkit</h2>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-4">Most people operate on autopilot. They proceed through the day doing whatever comes naturally. Sometimes the approach works. Sometimes not.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">Winners are different. They make <strong className="text-foreground">conscious, intelligent decisions</strong> about their behavior. This is influence. Not manipulation. Not scheming. Conscious choice.</p>

          <h3 className="font-heading text-lg text-foreground mb-4">Self-Management: The Foundation</h3>
          <div className="space-y-3 mb-8">
            {[
              { title: "Self-observation:", desc: "Watch your own actions and their effects on others. Are people reacting well? Pulling away? Getting defensive? Notice. In the book, Carlton, a new company president, got so lost in thought he walked right past people without seeing them. Employees quickly labeled him arrogant and unfriendly. He wasn't. He was lost in his own head. But perception was reality." },
              { title: "Self-restraint:", desc: "Your first impulse is not always your best move. In the book, Eileen blurted out \"He's a real little dictator, isn't he?\" about her new boss within earshot of the entire office. One sentence. Massive damage. The ability to pause before reacting is one of the most valuable political skills you'll develop." },
              { title: "Selective behavior:", desc: "Once you observe and restrain, you're in a position to choose. What behavior will move you closer to your goal in this specific situation?" },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-5">
                <p className="text-foreground font-semibold text-sm mb-1">{item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">I see self-management failures in interviews constantly. The candidate who badmouths their former boss. The one who interrupts me three times in five minutes. The one who checks their phone during the conversation. These are autopilot behaviors. And they kill your chances before the conversation gets interesting.</p>

          <h3 className="font-heading text-lg text-foreground mb-4">Direct vs. Indirect Influence</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Think of influence as a continuum. On one end: direct influence (persuading, asserting, ordering). On the other: indirect influence (observing, asking, listening).</p>
          <p className="text-muted-foreground leading-relaxed mb-4">Most people overuse one side. Ralph, a training manager in the book, talked nonstop. He gave his opinion on everything, told people what to do, and dominated every discussion. His staff tuned him out. Vickie, a quiet specialist, relied entirely on asking questions and listening. She never stated her own position. People ignored her too.</p>
          <p className="text-muted-foreground leading-relaxed mb-4"><strong className="text-foreground">The best influencers use both sides.</strong> They know when to make a bold case and when to shut up and listen. They know when to act fast and when to wait for the perfect moment.</p>
          <p className="text-muted-foreground leading-relaxed mb-6">McIntyre's colleague Carl demonstrated this perfectly. In a heated daylong meeting where everyone was arguing, Carl barely spoke. He observed. He waited. Hours in, when the group was exhausted and stuck, Carl made one calm, precise observation. The debate ended. Problem solved. Carl had mastered the art of the perfect moment.</p>
          <p className="text-muted-foreground leading-relaxed mb-8">The influence skill I see missing most often in interviews? Listening. Candidates who listen to the question, pause, and give a thoughtful answer stand out. Candidates who launch into a rehearsed monologue before I finish my sentence? They tell me they won't listen to their manager, their team, or their customers either.</p>

          <h3 className="font-heading text-lg text-foreground mb-4">Managing Up, Across, and Down</h3>

          <Collapsible title="Managing Your Boss">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>You need to stop worrying about how your boss treats you and start figuring out how to work with your boss.</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Accept your boss has the authority to direct your activities. Even if you're smarter.</li>
                <li>Help your boss succeed. This is the fastest path to your own success.</li>
                <li>Learn their expectations. Don't guess. Ask. McIntyre worked under three different CEOs who each valued completely different things: one wanted face-to-face interaction, one preferred written communication, one wanted data and surveys. Same function. Three different playbooks.</li>
                <li>Make your boss look good. Quality results, met deadlines, useful information.</li>
                <li>Never complain about your boss to others. Especially outside your department. In the book, John, a VP of HR, regularly vented about the new company president to the president's executive assistant. He assumed she was a safe audience. She wasn't. Her loyalty was to her boss. John lost his job. He never connected the dots.</li>
                <li>Give sincere compliments from time to time. Managers hear plenty of complaints and almost no appreciation.</li>
                <li>Adapt when you get a new boss. The world changed. Change with the world. McIntyre shares an executive's warning: "Either people change or we change people." I've watched people throw away years of goodwill because they refused to adjust to a new manager.</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="Working with Executives">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <p>If you get the chance to work directly with senior leaders, here are rules worth memorizing:</p>
              <ol className="list-decimal list-inside space-y-2">
                <li>Don't tell executives they are unable to do something. Say "Yes, we will do this, but let me ask you something..." This simple shift acknowledges their authority and keeps the conversation open.</li>
                <li>Talk fast. Start with your most important points. Be ready for questions after three sentences. They don't want a monologue. They want to control the conversation, get what they need, and move on.</li>
                <li>Don't expect specific instructions. Figure the details out yourself or use your network.</li>
                <li>Take care of the details. They expect flawless execution. You'll get vague instructions. Don't go back for clarification.</li>
                <li>Don't take abuse personally. The behavior is not about you. You're dealing with a high-level person who has bad manners.</li>
                <li>Show confidence while respecting their authority.</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="Cooperating with Colleagues">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>Be consistently agreeable, helpful, and responsive.</li>
                <li>Follow through. Return calls. Meet deadlines. Keep promises.</li>
                <li>Don't expect coworkers to be your therapists.</li>
                <li>Avoid blatant self-promotion at your colleagues' expense.</li>
                <li>When you disagree, discuss the issue like an adult. No insults. No pouting.</li>
              </ol>
            </div>
          </Collapsible>

          <Collapsible title="Leading Your Team (If You Manage People)">
            <div className="mt-3 text-sm text-muted-foreground space-y-3">
              <ol className="list-decimal list-inside space-y-2">
                <li>You're a manager, not a monarch. Get over the title.</li>
                <li>Focus on being respected, not liked.</li>
                <li>Learn to manage performance. Set goals. Give feedback. Appreciate good work.</li>
                <li>Help your employees develop. Learn their goals. Help them grow.</li>
              </ol>
            </div>
          </Collapsible>
        </div>
      </section>

      {/* Section 10: Your Game Plan */}
      <section id="game-plan" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Your Political Game Plan</h2>
              <p className="text-muted-foreground text-lg">Stop, Start, Continue</p>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">Here's where everything in this guide becomes action. Not theory. Not concepts. Specific steps based on your situation right now.</p>

          <h3 className="font-heading text-lg text-foreground mb-4">Step 1: Find Your Starting Point</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Use the decision tree below. Start at the top. Follow the path matching your situation.</p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-8">
            <p className="text-xs font-bold text-gold uppercase tracking-wider mb-5">Decision Tree: Find Your Starting Point</p>
            <div className="flex flex-col items-center gap-0">
              {/* Q1 */}
              <div className="bg-executive-green text-cream text-sm font-semibold px-6 py-3 rounded-lg text-center max-w-sm leading-snug">
                Are you in political trouble right now?
              </div>
              <p className="text-muted-foreground text-xs text-center max-w-xs mt-1 mb-1">(Boss is distant, assignments going elsewhere, HR checking in)</p>
              <div className="w-px h-3 bg-gold/40" />
              <div className="flex w-full max-w-lg">
                {/* YES branch */}
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 max-w-[200px]">
                    Are you seen as<br />"The Problem"?
                  </div>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="flex w-full max-w-xs">
                    {/* YES-YES */}
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">PATH A</p>
                        <p className="text-foreground text-xs">Emergency Repair</p>
                      </div>
                    </div>
                    {/* YES-NO */}
                    <div className="flex-1 flex flex-col items-center">
                      <span className="text-xs font-bold text-destructive mb-1">NO</span>
                      <div className="w-px h-2 bg-gold/40" />
                      <div className="border border-border rounded-lg px-3 py-2 text-center text-xs text-foreground font-medium bg-muted/50">
                        Is someone<br />blocking you?
                      </div>
                      <div className="w-px h-3 bg-gold/40" />
                      <div className="flex gap-2">
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                          <div className="bg-gold/15 border border-gold/30 rounded-lg px-2 py-1.5 text-center">
                            <p className="text-gold text-xs font-bold">PATH B</p>
                            <p className="text-foreground text-[10px]">Adversary Mgmt</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-center">
                          <span className="text-xs font-bold text-destructive mb-1">NO</span>
                          <div className="bg-gold/15 border border-gold/30 rounded-lg px-2 py-1.5 text-center">
                            <p className="text-gold text-xs font-bold">PATH C</p>
                            <p className="text-foreground text-[10px]">Energy Redirect</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* NO branch */}
                <div className="flex-1 flex flex-col items-center">
                  <span className="text-xs font-bold text-destructive mb-1">NO</span>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="border border-border rounded-lg px-4 py-2 text-center text-sm text-foreground font-medium bg-muted/50 max-w-[200px]">
                    Do you know what you<br />want from your career?
                  </div>
                  <div className="w-px h-3 bg-gold/40" />
                  <div className="flex w-full max-w-xs justify-center gap-4">
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-destructive mb-1">NO</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">PATH D</p>
                        <p className="text-foreground text-xs">Goal Clarity</p>
                      </div>
                    </div>
                    <div className="flex flex-col items-center">
                      <span className="text-xs font-bold text-green-500 mb-1">YES</span>
                      <div className="bg-gold/15 border border-gold/30 rounded-lg px-3 py-2 text-center">
                        <p className="text-gold text-xs font-bold">PATH E</p>
                        <p className="text-foreground text-xs">Build Political Power</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* PATH A-E */}
          {[
            {
              id: "path-a", title: "PATH A: Emergency Repair", subtitle: "You're Becoming The Problem",
              situation: "You sense management is losing patience with you. You've had a \"serious talk.\" Your leverage is shrinking. You're in the danger zone.",
              priority: "Stop the bleeding. You have a narrow window to change perceptions before the decision gets made for you.",
              steps: [
                "Get your emotions under control. Before anything else, stop reacting. No venting to coworkers. No angry emails. No confrontations. Every emotional outburst confirms their negative view of you.",
                "Find out what people think. Ask your boss directly: \"I want to make sure I'm meeting expectations. Is there anything you'd like me to do differently?\"",
                "Apply the AMISH model. Identify the specific behaviors causing the problem. For each behavior, define the replacement. Practice the replacement daily.",
                "Be patient and visible about the change. People won't trust the new you immediately. Keep showing up differently. Consistency over time is the only thing changing their perception.",
              ],
              ssc: { stop: "the specific behaviors identified in your AMISH assessment", start: "the replacement behaviors, plus regular check-ins with your boss", cont: "delivering strong work results (this is your lifeline)" },
              note: "If nothing changes after 60-90 days of genuine effort: Start your job search. Leave on your terms. Don't wait to get pushed out."
            },
            {
              id: "path-b", title: "PATH B: Adversary Management", subtitle: "Someone Is Blocking You",
              situation: "A specific person is standing between you and your goals. A boss who won't support you. A coworker who undermines you. A rival who takes credit for your work.",
              priority: "Diagnose the adversary type and respond with strategy, not emotion.",
              steps: [
                "Confirm they're an adversary, not an annoyance. Are they blocking your goals or are they annoying you?",
                "Identify their type: Focused (wants something you're blocking), Emotional (creates problems for everyone), or Vengeful (targeting you personally).",
                "Decide - convert or contain? If there's common ground, try converting them to an ally. If not, contain them by increasing your own leverage.",
                "If nothing works, escalate wisely or exit. Involving higher-level managers is a last resort.",
              ],
              ssc: { stop: "obsessing about the adversary, venting to coworkers, retaliating", start: "building leverage, documenting facts, strengthening other alliances", cont: "focusing on your own goals and delivering results" },
            },
            {
              id: "path-c", title: "PATH C: Energy Redirect", subtitle: "You're Wasting Time on the Wrong Things",
              situation: "You're not in danger. Nobody is blocking you. But you feel stuck, frustrated, or drained. You're spending energy on things not moving you forward.",
              priority: "Audit where your energy goes and redirect toward your goals.",
              steps: [
                "Apply the screening question to everything: \"Is this the best use of my energy right now?\" Ask this about every activity for one full week.",
                "Identify your energy leeches: toxic coworkers you eat lunch with daily, fairness complaints you replay in your head, gossip and venting sessions, negative self-talk.",
                "Cut the leeches. Increase the investments. Remember Gayle? She quit her daily complaining lunch group. Within six months she got promoted.",
              ],
              ssc: { stop: "energy leeches (name the specific ones from your audit)", start: "redirecting freed-up energy toward your goals", cont: "anything already producing results or building relationships" },
            },
            {
              id: "path-d", title: "PATH D: Goal Clarity", subtitle: "You Don't Know What You Want",
              situation: "You don't hate your job. But you're not excited about your future. You have no clear direction.",
              priority: "Turn vague dissatisfaction into specific goals.",
              steps: [
                "Answer three questions honestly: Do you want to continue in your current type of work? Do you want to stay with your current organization? Do you want to stay in your current position?",
                "Draw your ideal future. Picture your working life two years from now. Write down everything. Convert each wish to a goal using the 5-step process from Section 2.",
                "Pick one goal. Start with the first step. Don't try to fix everything at once. Take the first action this week.",
              ],
              ssc: { stop: "drifting without direction, waiting for something to change on its own", start: "answering the three questions above, converting one wish to a goal", cont: "performing well in your current role while you plan your next move" },
            },
            {
              id: "path-e", title: "PATH E: Build Political Power", subtitle: "You Know What You Want",
              situation: "You have clear goals. You're not in trouble. You're ready to increase your influence and make your next move.",
              priority: "Apply the 4 P's to close the gap between where you are and where you want to be.",
              steps: [
                "Run the 4 P's assessment on yourself. For each P, answer the diagnostic questions honestly.",
                "Fix your weakest P first. If your \"NO\" answers are concentrated in one area, start there.",
                "Set specific 90-day actions. Turn your assessment into a Stop/Start/Continue list with a 90-day timeline. Review your progress monthly.",
              ],
              ssc: { stop: "behaviors reducing your leverage in your weakest P area", start: "specific actions improving your weakest P area", cont: "strengths from your strongest P areas" },
            },
          ].map((path) => (
            <Collapsible key={path.id} title={path.title}>
              <div className="mt-3 text-sm space-y-4">
                <p className="text-muted-foreground"><strong className="text-foreground">Your situation:</strong> {path.situation}</p>
                <p className="text-muted-foreground"><strong className="text-foreground">Your immediate priority:</strong> {path.priority}</p>
                <div className="space-y-2">
                  {path.steps.map((step, i) => (
                    <div key={i} className="bg-background border border-border rounded-lg p-3">
                      <p className="text-muted-foreground text-sm"><strong className="text-foreground">Step {i + 1}:</strong> {step}</p>
                    </div>
                  ))}
                </div>
                {path.note && <p className="text-gold text-sm font-medium">{path.note}</p>}
                <div className="bg-background border border-border rounded-lg p-4">
                  <p className="text-foreground font-semibold text-sm mb-2">Your Stop/Start/Continue:</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-destructive">STOP:</strong> {path.ssc.stop}</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-green-400">START:</strong> {path.ssc.start}</p>
                  <p className="text-muted-foreground text-sm"><strong className="text-gold">CONTINUE:</strong> {path.ssc.cont}</p>
                </div>
              </div>
            </Collapsible>
          ))}
        </div>
      </section>

      {/* Quick Reference / Cheat Sheet */}
      <section id="cheat-sheet" className="py-14 md:py-20 px-5 md:px-6 bg-background scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-gold/30 font-heading text-6xl md:text-7xl font-bold leading-none select-none">📋</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Quick Reference: The Office Politics Cheat Sheet</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The 5 Organizational Facts of Life</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li>Organizations are not democracies</li>
                <li>Some people have more power than others</li>
                <li>Virtually all decisions are subjective</li>
                <li>Your boss has control over much of your life</li>
                <li>Fairness is an impossible goal</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The 4 Political Types</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>Martyr</strong> - helps the org, hurts themselves</li>
                <li><strong>Sociopath</strong> - helps themselves, hurts the org</li>
                <li><strong>Dimwit</strong> - hurts themselves AND the org</li>
                <li><strong>Winner</strong> - helps the org AND themselves</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The 7 Leverage Boosters</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>Results</strong> - deliver outcomes making a difference</li>
                <li><strong>Knowledge</strong> - become the go-to expert</li>
                <li><strong>Attitude</strong> - be someone people want to work with</li>
                <li><strong>Empathy</strong> - understand other people's problems</li>
                <li><strong>Networks</strong> - build connections inside and outside</li>
                <li><strong>Inclusion</strong> - involve others in your decisions</li>
                <li><strong>Detachment</strong> - don't overreact to criticism</li>
              </ol>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The AMISH Model</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>Awareness</strong> - recognize something is wrong</li>
                <li><strong>Motivation</strong> - accept you need to change</li>
                <li><strong>Identification</strong> - get specific about what to change</li>
                <li><strong>Substitution</strong> - replace bad behaviors with good ones</li>
                <li><strong>Habit Replacement</strong> - practice until the new behavior sticks</li>
              </ol>
            </div>

            <div className="bg-executive-green rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The Political Golden Rule</h3>
              <p className="text-cream/90 text-sm font-medium">Never advance your own interests by harming the business or hurting other people.</p>
            </div>

            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-gold mb-3">The 4 P's of Political Influence</h3>
              <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm">
                <li><strong>Power Assessment</strong> - evaluate your leverage position</li>
                <li><strong>Performance</strong> - deliver results with an ROI mindset</li>
                <li><strong>Perception</strong> - make your work visible to decision-makers</li>
                <li><strong>Partnerships</strong> - build alliances expanding your influence</li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Section: Final Word */}
      <section className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Final Word</h2>
          <p className="text-muted-foreground leading-relaxed mb-4">Politics isn't dirty. Playing blind is.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">The frameworks in this guide work. The 5 Organizational Facts of Life. The 4 Political Types. The 7 Leverage Boosters. The 8 Games. The 4 P's. Stop, Start, Continue. These are tools. Use them.</p>
          <p className="text-muted-foreground leading-relaxed mb-4">The people who succeed at work are not the most talented. They're the most aware. They see the game. They build the relationships. They deliver results AND make those results visible. They manage up, across, and down. And they never advance their own interests by harming the business or hurting other people.</p>
          <p className="text-foreground leading-relaxed font-medium">Start with Section 10. Find your path. Write your plan. Take the first step this week.</p>
        </div>
      </section>

      {/* Resources */}
      <section id="resources" className="py-14 md:py-20 px-5 md:px-6 bg-executive-green scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <span className="text-cream/20 font-heading text-6xl md:text-7xl font-bold leading-none select-none">→</span>
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-cream mb-2">Additional Resources</h2>
              <p className="text-cream/60">Keep levelling up your career</p>
            </div>
          </div>

          <div className="bg-cream/5 border border-cream/10 rounded-xl p-5 md:p-6 mb-8">
            <h3 className="text-gold text-sm font-bold uppercase mb-3">The Book</h3>
            <p className="text-cream/80 text-sm italic mb-4">Secrets to Winning at Office Politics: How to Achieve Your Goals and Increase Your Influence at Work by Marie G. McIntyre, Ph.D.</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">Related Reading</h3>
            <ul className="space-y-1 text-cream/70 text-sm">
              <li>• <em>Emotional Intelligence</em> by Daniel Goleman</li>
              <li>• <em>The Seven Habits of Highly Effective People</em> by Stephen Covey</li>
              <li>• <em>Leading Quietly</em> by Joseph Badaracco</li>
              <li>• <em>Talking from 9 to 5</em> by Deborah Tannen</li>
            </ul>
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
            <Link to="/salary-starter-kit" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Negotiate your salary</p>
              <span className="text-gold text-sm font-medium">Salary Starter Kit →</span>
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

export default OfficePoliticsGuide;
