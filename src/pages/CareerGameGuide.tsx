import { Clock, Linkedin, ChevronDown, Menu, Briefcase, Target, TrendingUp, Users, Brain, Shield, Star, AlertTriangle, ArrowRight, Lightbulb } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
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
  { id: "intro", label: "Introduction" },
  { id: "rules", label: "01 · The 4 Rules" },
  { id: "work", label: "02 · Work That Promotes" },
  { id: "spikes", label: "03 · Know Your Spikes" },
  { id: "brand", label: "04 · Build Your Brand" },
  { id: "promotion", label: "05 · The Promotion Machine" },
  { id: "network", label: "06 · Grow Your Network" },
  { id: "disagree", label: "07 · How to Disagree" },
  { id: "managing", label: "08 · Managing vs. Leading" },
  { id: "mental", label: "09 · Mental Load & Toxicity" },
  { id: "corner", label: "10 · Corner Office?" },
  { id: "action", label: "11 · Action Tracker" },
  { id: "reference", label: "Quick Reference" },
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

/* ── Infographic: 40/40/20 Work Split Bar ─────────────────────── */
const WorkSplitDiagram = () => (
  <div className="bg-card border border-border rounded-xl p-5 md:p-6 space-y-4">
    <h4 className="font-heading text-lg text-foreground mb-1">The 40/40/20 Work Split</h4>
    <p className="text-muted-foreground text-xs mb-4">How to divide your time for maximum career progression</p>
    {[
      { label: "BAU Work", pct: 40, desc: "Core job, repeatable, team-isolated, automatable", color: "bg-muted-foreground/30" },
      { label: "High-Impact Work", pct: 50, desc: "Cross-team projects, drives strategy, measurable outcomes", color: "bg-gold" },
      { label: "Self-Development", pct: 20, desc: "Training, mentoring, certifications, culture", color: "bg-executive-green" },
    ].map((item) => (
      <div key={item.label}>
        <div className="flex justify-between text-sm mb-1">
          <span className="text-foreground font-medium">{item.label}</span>
          <span className="text-muted-foreground">{item.label === "High-Impact Work" ? "40-50%" : item.label === "Self-Development" ? "10-20%" : `${item.pct}%`}</span>
        </div>
        <div className="h-3 bg-muted rounded-full overflow-hidden">
          <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
        </div>
        <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
      </div>
    ))}
    <div className="border-t border-border pt-4 mt-4">
      <p className="text-foreground text-sm font-semibold mb-2">Too much BAU? Use the Prioritize-Bundle-Rebrand framework:</p>
      <div className="grid grid-cols-3 gap-2">
        {[
          { step: "Prioritize", desc: "What's highest value?" },
          { step: "Bundle", desc: "Combine repetitive requests" },
          { step: "Rebrand", desc: "Reframe tasks as impact work" },
        ].map((s) => (
          <div key={s.step} className="bg-muted/50 rounded-lg p-3 text-center">
            <p className="text-foreground text-xs font-bold">{s.step}</p>
            <p className="text-muted-foreground text-xs mt-1">{s.desc}</p>
          </div>
        ))}
      </div>
    </div>
  </div>
);

/* ── Infographic: 10/10/10 One-on-One ─────────────────────────── */
const OneOnOneDiagram = () => (
  <div className="bg-card border border-border rounded-xl overflow-hidden">
    <div className="bg-executive-green px-5 py-3">
      <h4 className="font-heading text-cream text-lg">The 10/10/10 One-on-One Structure</h4>
      <p className="text-cream/60 text-xs">30 minutes. Three sections. Every meeting.</p>
    </div>
    {[
      { time: "1-10 min", title: "INFORM", desc: "Share the impact of your work. Not a task list. Focus on: revenue increased, efficiency gained, risk reduced, problems solved. Drop stakeholder names. Flag upcoming deliverables that will affect your capacity." },
      { time: "11-20 min", title: "ESCALATE", desc: "Share risks, roadblocks, and decisions you need. Don't wait until things are on fire. Ask: \"I need your input on X before I proceed.\" Flag capacity constraints early." },
      { time: "21-30 min", title: "ADVOCATE", desc: "Discuss your development and get feedback. Ask: \"How am I tracking against my goals?\" Bring up promotion timelines, skill gaps, and opportunities you want to pursue. Make sure you and your boss are in sync." },
    ].map((block, i) => (
      <div key={i} className={`px-5 py-4 ${i < 2 ? "border-b border-border" : ""}`}>
        <div className="flex items-center gap-2 mb-2">
          <span className="text-gold text-xs font-bold uppercase">{block.time}</span>
          <span className="text-foreground font-semibold text-sm">{block.title}</span>
        </div>
        <p className="text-muted-foreground text-sm leading-relaxed">{block.desc}</p>
      </div>
    ))}
    <div className="bg-gold/10 px-5 py-3">
      <p className="text-foreground text-xs font-medium">If you don't have regular 1-on-1s: Stop reading. Open your calendar. Schedule one now. Biweekly minimum. Weekly is better.</p>
    </div>
  </div>
);

/* ── Infographic: 9-Box Grid ──────────────────────────────────── */
const NineBoxGrid = () => {
  const boxes = [
    { pos: "top-left", label: "3. Dysfunctional Geniuses", desc: "Great vision, zero follow-through on work." },
    { pos: "top-mid", label: "7. High Potentials", desc: "Soft skills outshine output. On the leadership radar." },
    { pos: "top-right", label: "9. Stars ★★★", desc: "Top 1-5%. Fast progression. Mastered the game." },
    { pos: "mid-left", label: "2. Up or Out Dilemmas", desc: "Strong talkers, weak delivery. Running out of time." },
    { pos: "mid-mid", label: "6. Core Players", desc: "Good work, good soft skills. Will reach mid-management and plateau." },
    { pos: "mid-right", label: "8. High Performers", desc: "The SME in every meeting. Huge workload, high proficiency. Move up 3-4 yrs." },
    { pos: "bot-left", label: "1. Bad Hires", desc: "Low everything. Get managed out or fired." },
    { pos: "bot-mid", label: "4. Up or Out Grinders", desc: "Strong delivery, poor communication. Grinding with no recognition." },
    { pos: "bot-right", label: "5. Workhorses", desc: "Go above and beyond. Told \"we couldn't do this without you\" but never promoted." },
  ];
  const highlight = ["top-right", "top-mid", "mid-right"];
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6">
      <h4 className="font-heading text-lg text-foreground mb-1">The 9-Box: Where Do You Sit?</h4>
      <p className="text-muted-foreground text-xs mb-4">Performance vs. Potential: How Companies Secretly Evaluate You</p>
      {/* axis labels */}
      <div className="flex text-xs text-muted-foreground mb-2">
        <div className="w-20 shrink-0" />
        <div className="flex-1 grid grid-cols-3 text-center font-semibold">
          <span>Low Perf.</span><span>Med Perf.</span><span>High Perf.</span>
        </div>
      </div>
      {["High Potential", "Med Potential", "Low Potential"].map((rowLabel, ri) => (
        <div key={ri} className="flex mb-1">
          <div className="w-20 shrink-0 flex items-center">
            <span className="text-xs text-muted-foreground font-semibold leading-tight">{rowLabel}</span>
          </div>
          <div className="flex-1 grid grid-cols-3 gap-1">
            {boxes.slice(ri * 3, ri * 3 + 3).map((box) => (
              <div key={box.pos} className={`rounded-lg p-2.5 ${highlight.includes(box.pos) ? "bg-gold/10 border border-gold/30" : "bg-muted/40 border border-border"}`}>
                <p className={`text-xs font-bold leading-tight ${highlight.includes(box.pos) ? "text-gold" : "text-foreground"}`}>{box.label}</p>
                <p className="text-muted-foreground text-[10px] leading-snug mt-1">{box.desc}</p>
              </div>
            ))}
          </div>
        </div>
      ))}
      <div className="mt-4 grid sm:grid-cols-2 gap-3">
        <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-3">
          <p className="text-destructive text-xs font-bold mb-1">Where most people get stuck:</p>
          <p className="text-muted-foreground text-xs">Box 4-5: Working hard, not moving up = soft skills gap</p>
          <p className="text-muted-foreground text-xs">Box 6: Comfortable, no urgency to grow = the "plateau zone"</p>
        </div>
        <div className="bg-green-500/5 border border-green-500/20 rounded-lg p-3">
          <p className="text-green-400 text-xs font-bold mb-1">Where you want to be:</p>
          <p className="text-muted-foreground text-xs">Box 7-8-9: The only boxes that lead to senior leadership</p>
        </div>
      </div>
    </div>
  );
};

/* ── Infographic: Kings vs Specialists ────────────────────────── */
const KingsVsSpecialists = () => (
  <div className="grid sm:grid-cols-2 gap-4">
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-2xl mb-2">👑</p>
      <h4 className="text-foreground font-bold text-sm mb-3">The King</h4>
      <div className="space-y-2 text-muted-foreground text-xs">
        <p><strong className="text-foreground">Mindset:</strong> Everyone exists to serve them and make their life easier.</p>
        <p><strong className="text-foreground">Works with you when:</strong> They need something from you.</p>
        <p><strong className="text-foreground">Your role:</strong> Support their goals. Remove obstacles. Make them look good.</p>
        <p><strong className="text-foreground">Key strategy:</strong> Support, support, support.</p>
        <p><strong className="text-foreground">Say this:</strong> "I'm here to help you be successful. What exactly do you need?"</p>
      </div>
    </div>
    <div className="bg-card border border-border rounded-xl p-5">
      <p className="text-2xl mb-2">🧠</p>
      <h4 className="text-foreground font-bold text-sm mb-3">The Specialist</h4>
      <div className="space-y-2 text-muted-foreground text-xs">
        <p><strong className="text-foreground">Mindset:</strong> They know everything. Decisions without them fail.</p>
        <p><strong className="text-foreground">Works with you when:</strong> You acknowledge their expertise first.</p>
        <p><strong className="text-foreground">Your role:</strong> Defer to their knowledge. Include them early. Do pre-reads with them.</p>
        <p><strong className="text-foreground">Key strategy:</strong> Defer, defer, defer.</p>
        <p><strong className="text-foreground">Say this:</strong> "You have great knowledge. Can you talk me through why this wouldn't work?"</p>
      </div>
    </div>
  </div>
);

/* ── Infographic: Skill Maturity Ladder ───────────────────────── */
const SkillMaturityLadder = () => {
  const stages = [
    { num: "4", title: "Strategic Vision", range: "Director → Executive", focus: "Developing strategy (Rule of Threes). Building a team brand. Comfort with the unknown. Decisions with limited info.", invest: "An executive coach. At this level, outside counsel is almost a requirement." },
    { num: "3", title: "Managerial Capabilities", range: "Manager → Senior Manager", focus: "Setting expectations (CODS). Delegation. Check-ins. Understanding each team member's learning style and goals.", invest: "Coaching or management training. Books and podcasts. Don't wait 11 years for your first training." },
    { num: "2", title: "Social Skills", range: "Mid-Level → Senior IC", focus: "Interpersonal relationship building. Networking with intention. Navigating conflict without saying \"no.\"", invest: "Getting a mentor. Learning to mentor others. Building relationships before you need them." },
    { num: "1", title: "Technical Acumen", range: "Individual Contributor → Junior Mgr", focus: "Proactivity. Core work delivery. Asking qualifying questions. Email and meeting etiquette.", invest: "Certifications. Lateral moves across divisions and industries. Learn your core job inside out." },
  ];
  return (
    <div className="bg-card border border-border rounded-xl p-5 md:p-6">
      <h4 className="font-heading text-lg text-foreground mb-1">The Skill Maturity Ladder</h4>
      <p className="text-muted-foreground text-xs mb-4">What to develop at each stage of your career</p>
      <div className="space-y-3">
        {stages.map((s, i) => (
          <div key={s.num} className={`rounded-lg p-4 ${i === 0 ? "bg-gold/10 border border-gold/30" : "bg-muted/30 border border-border"}`}>
            <div className="flex items-center gap-2 mb-2">
              <span className={`text-xs font-bold px-2 py-0.5 rounded ${i === 0 ? "bg-gold text-white" : "bg-muted-foreground/20 text-foreground"}`}>Stage {s.num}</span>
              <span className="text-foreground font-semibold text-sm">{s.title}</span>
              <span className="text-muted-foreground text-xs ml-auto hidden sm:inline">{s.range}</span>
            </div>
            <p className="text-muted-foreground text-xs leading-relaxed"><strong className="text-foreground">Focus:</strong> {s.focus}</p>
            <p className="text-muted-foreground text-xs leading-relaxed mt-1"><strong className="text-foreground">Invest in:</strong> {s.invest}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

const CareerGameGuide = () => {
  useTrackGuideProgress("career-game");

  return (
    <div className="min-h-screen bg-background">
      <SEO />

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
            The Promotion Playbook:<br className="hidden sm:block" /> 36 Secrets Your Company Will Never Tell You
          </h1>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 mb-6">
            <p className="text-base text-cream/60">By James Bugden, Career Coach · Senior Recruiter @ Uber</p>
            <span className="hidden sm:inline text-cream/30">·</span>
            <div className="flex items-center gap-1.5 text-cream/60">
              <Clock className="w-4 h-4" />
              <span className="text-sm">50 min read</span>
            </div>
          </div>
          <p className="text-sm text-cream/50 italic">Based on "Secrets of the Career Game" by Kendall Berg</p>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      <TableOfContents />

      {/* ═══════════════════ INTRODUCTION ═══════════════════ */}
      <section id="intro" className="py-14 md:py-20 px-5 md:px-6 bg-card border-b border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <p className="text-foreground text-lg leading-relaxed mb-6">
            Kendall Berg is a former director of technology strategy who worked with Capital One, JP Morgan Chase, Samsung, and AT&T. She was offered a CFO position before she turned 30, managed diverse teams across global financial services, and built a network of C-suite leaders. She now runs That Career Coach, where she shares the career playbook most companies never give you.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Her core message is simple: the career game has rules. Most people never learn them. The ones who do move up faster, burn out less, and stop leaving their progression to chance.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            I sit on the other side of the table. I'm the person reviewing your resume. I'm in the room when hiring decisions get made. I see who gets promoted and who gets stuck. These 36 secrets match what I've watched play out across thousands of hiring decisions.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            This guide is my recruiter's breakdown of her framework. Every concept is from the book. The recruiter reality checks are from my 15+ years of hiring experience.
          </p>

          <div className="bg-card border border-border rounded-xl p-5 md:p-6 mb-6">
            <h3 className="font-heading text-lg text-gold mb-4">How to read this guide:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">If you only have 10 minutes, read "<a href="#rules" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">The 4 Rules of the Career Game</a>" and the <a href="#action" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">90-Day Action Tracker</a> at the end. Those two sections will change how you think about work starting tomorrow.</span></li>
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">If you have 30 minutes, add "<a href="#spikes" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Know Your Spikes</a>" and "<a href="#brand" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">Build Your Brand</a>." Fill in the templates as you go.</span></li>
              <li className="flex items-start gap-3"><GoldCheckBadge /><span className="text-foreground text-sm">If you read the whole thing, you'll have a complete playbook for <a href="#promotion" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">getting promoted</a>, <a href="#network" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">building a network</a>, <a href="#managing" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">managing a team</a>, and deciding whether you even want the <a href="#corner" className="text-gold underline underline-offset-2 hover:text-gold/80 transition-colors">corner office</a>.</span></li>
            </ul>
          </div>

          <p className="text-muted-foreground leading-relaxed">
            The templates are designed to be screenshotted or printed. Fill them in. Put them on your desk. Come back to them every 90 days.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 1: THE 4 RULES ═══════════════════ */}
      <section id="rules" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="01" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The 4 Rules of the Career Game</h2>
              <p className="text-muted-foreground text-lg">The ground rules most people never learn</p>
            </div>
          </div>

          <div className="space-y-8">
            {/* Secret 1 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">Secret 1: You are an entrepreneur, and your career is your business</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Here's an analogy I love. Imagine someone asked you to play a game you've never seen before, refused to tell you the rules, and then asked you to bet your livelihood on the outcome. You'd walk away.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                But that's what most people do at work every day. They show up, do their job, and hope someone notices.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Here's the reframe. Think of yourself as a business owner. Your skills are the product. Your boss and company are your clients. Your network is your prospect list. When you run your career like a business, you start making decisions differently. You stop saying yes to every request. You start thinking about where your time generates the most value. You evaluate whether your current "client" (employer) is a good fit, or whether you need to find better ones.
              </p>
            </div>

            {/* Secret 2 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">Secret 2: Relationships matter more than the work</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This is the hardest truth in the book. And it's backed up with story after story.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Take Erin, a star employee who worked 80-100 hour weeks. Never dropped a ball. Picked up slack from other teams. On paper, she was the top performer. But Erin had burned a bridge with a senior stakeholder named Bob early in her tenure. That one damaged relationship held her back. Bob eventually hired someone on his own team to do Erin's job so he wouldn't have to interact with her. Erin never got promoted. She left the company.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Then there's Stacy. The most knowledgeable person on the team. An absolute subject matter expert. But nobody liked working with her. She hoarded information. She refused to delegate. She used abrasive language in meetings. When Stacy came up for promotion, her manager made a strong case. Everyone nodded along with her technical accomplishments. Then someone asked a simple question: "Does anyone actually like working with her?" The room went quiet. Stacy went from promotion candidate to "needs improvement" in a single meeting.
              </p>
            </div>

            {/* Secret 3 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">Secret 3: Communication is key</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                The book shares a confession I respect. The worst feedback the author ever received was, "You are great at your job, but you aren't great to work with."
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Eight years later, the best compliment she received was: "I aspire to communicate as well as you do in difficult situations."
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                That turnaround took years of intentional work. Communication isn't about defending your opinion. It's about framing your work in terms of what your audience cares about. Their pain points. Their priorities. Their goals. Before your next meeting, write out who will be in the room and what each person's biggest priority is. Then prepare two or three data points that connect your work to their priorities.
              </p>
              <InfoBox title="What I think" variant="gold">
                <p>When I do screening calls, communication is the first thing I evaluate. Not what you say. How you say it. Do you explain your work clearly in 60 seconds? Do you connect your accomplishments to business outcomes? Most candidates give me a laundry list of tasks. The ones who get advanced to the next round tell me a story about impact.</p>
              </InfoBox>
            </div>

            {/* Secret 4 */}
            <div>
              <h3 className="font-heading text-xl text-foreground mb-3">Secret 4: No one is responsible for your career but you</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                This section is blunt. If you stay in a toxic workplace, you're the one who gets hurt. If you accept the first offer every time without evaluating fit, you're the one who gets held back. If you stay loyal to a company that doesn't promote you, you're the one who stays stuck.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Think of job searching like dating. Your resume is a dating profile. Interviews are speed dates. Getting hired is "going steady." If you ignore red flags, you end up in an unhealthy marriage.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Write three "passion statements" that describe what fills your cup at work. Not tasks. Core needs.
              </p>
              <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
                <p className="text-foreground text-sm italic mb-2">"I am passionate about having a broad scope of influence and being able to work on different tasks each day."</p>
                <p className="text-foreground text-sm italic mb-2">"I am passionate about leading and developing a team."</p>
                <p className="text-foreground text-sm italic">"I need to see the output of my efforts directly."</p>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Then map your interview questions to those passion statements. If the answers don't align, the job isn't the right fit, no matter how good the offer looks. One more piece of advice: if the hiring manager is the person you liked least in the interview process, don't take the job. Your direct manager has more influence over your career than almost anyone else in the company.
              </p>
              <InfoBox title="What I think" variant="gold">
                <p>I tell every candidate I work with to interview the company as hard as the company interviews them. Ask to speak with peers on the team. Ask about turnover. Ask what the manager dislikes about the role. The candidates who skip this step are the same ones back on the market in six months.</p>
              </InfoBox>
            </div>
          </div>

          <p className="text-muted-foreground leading-relaxed mt-8">
            Those are the four ground rules. Now let's talk about the work itself. Because not all work is created equal.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 2: THE WORK ═══════════════════ */}
      <section id="work" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="02" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Work That Gets You Promoted</h2>
              <p className="text-muted-foreground text-lg">Not all work is created equal</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The three types of work</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">All work falls into three categories. This framework changed how I think about what I look for in candidates.</p>

          <div className="space-y-3 mb-6">
            {[
              { num: "1", title: "BAU (Business as Usual)", desc: "This is your core job. The tasks listed on your job description. Running reports, managing systems, responding to requests. It's the work that maintains your position but rarely gets you promoted. BAU is defined as: tasks core to your job, work isolated to your direct team, repeatable or trainable tasks, and anything that could be automated." },
              { num: "2", title: "High-impact / high-visibility work", desc: "This is the work that drives the company forward. It involves multiple teams. It aligns with company strategy. It solves a key problem. And the outcome is measurable. The criteria: it drives the organization forward, involves three or more teams, aligns with your key skills, solves a key problem, and the outcome is measurable." },
              { num: "3", title: "Self-development / engagement work", desc: "This is investing in yourself and your team's culture. Getting certified. Reading. Taking a course. Leading team engagement initiatives. Mentoring." },
            ].map((item) => (
              <div key={item.num} className="bg-background border border-border rounded-xl p-5">
                <h4 className="text-foreground font-semibold text-sm mb-2">{item.num}. {item.title}</h4>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The 40/40/20 rule</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Track everything you do for a week. Tag each task. The ideal split: 40% BAU, 40-50% high-impact work, 10-20% self-development.</p>

          <WorkSplitDiagram />

          <p className="text-muted-foreground leading-relaxed mt-6 mb-8">If you're highly technical (engineer, scientist, developer), your BAU percentage will be higher. That's expected. But the goal is still to shift as much as possible toward impact work.</p>

          {/* Secret 5 */}
          <h3 className="font-heading text-xl text-foreground mb-3">Secret 5: You must have and maintain healthy boundaries</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The goal isn't to work more. Or to work harder. The goal is to structure your time better. That starts with boundaries. Write them down. Examples: No work on weekends. No work after 5pm. Always take lunch. No work when family is sick.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">Here's a three-step process for when your plate overflows.</p>
          <div className="space-y-3 mb-4">
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">Prioritize:</p>
              <p className="text-muted-foreground text-sm">Stop saying "Sure, I'll take that on." Start saying "I appreciate this is high priority. Given what's on my plate, A, B, and C, are you comfortable with me deprioritizing C to make space?"</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">Bundle:</p>
              <p className="text-muted-foreground text-sm">Take repetitive requests and combine them. If you're getting dozens of data requests, build a self-service dashboard instead of answering each one individually.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">Rebrand:</p>
              <p className="text-muted-foreground text-sm">What was "running a weekly report" becomes "enabling data-driven decision-making through automated dashboards." Same work. Different framing. Bigger impact.</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Here's a personal story from the author. She had 12 projects due on a Friday, the same day as a team offsite. She was crying in an office, planning to skip the event. Her boss sat her down, made her list every task, and they crossed out three, circled two to finish before the offsite, and spread the rest over two weeks. His response: "I wish I'd known you were working on so many different tasks. I could have delegated some."
          </p>

          {/* Secret 6 */}
          <h3 className="font-heading text-xl text-foreground mb-3">Secret 6: Your boss does not know what you are working on</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Full stop. Even amazing managers don't track all of your tasks. It's your responsibility to keep them informed.
          </p>

          <OneOnOneDiagram />

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
            Outside of those meetings, CC your boss on emails related to high-profile projects. Loop them in on changes. Keep them aware.
          </p>
          <InfoBox title="What I think" variant="gold">
            <p>When I check references, I ask managers about specific projects the candidate listed on their resume. You'd be surprised how often the manager says "I didn't know they were working on that." If your boss doesn't know about your wins, they're not advocating for you in the rooms you're not in.</p>
          </InfoBox>

          {/* Secret 7 */}
          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Secret 7: How you talk about your work matters</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">A project manager could describe their work two ways.</p>
          <div className="grid sm:grid-cols-2 gap-4 mb-4">
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-4">
              <p className="text-destructive text-xs font-bold mb-2">Option A</p>
              <p className="text-muted-foreground text-sm italic">"I babysat stakeholders to get information by deadlines, tracked budget spend, and created project documentation."</p>
            </div>
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-4">
              <p className="text-green-400 text-xs font-bold mb-2">Option B</p>
              <p className="text-muted-foreground text-sm italic">"I delivered a streamlined solution for technical delivery, increasing development efficiency by 20%, by collaborating with key stakeholders, driving clarity on business requirements, and influencing the business toward the most optimal solution within budget."</p>
            </div>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-4">Same person. Same project. Completely different perception. The rule: stop describing what you did. Describe what couldn't have happened without you.</p>
          <InfoBox title="What I think" variant="gold">
            <p>This is the difference between a resume that gets a callback and one that gets skipped. I scan resumes for impact language. "Managed a team" tells me nothing. "Grew team revenue 40% by restructuring the client pipeline" tells me everything.</p>
          </InfoBox>

          <p className="text-muted-foreground leading-relaxed mt-6">You know the types of work. You know how to talk about them. Now you need to figure out what you're best at, and make sure your company needs it.</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 3: KNOW YOUR SPIKES ═══════════════════ */}
      <section id="spikes" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="03" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Know Your Spikes</h2>
              <p className="text-muted-foreground text-lg">Find what makes you exceptional</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 8: If you do not have an impact, you will not see progression</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Take Steve. Great data skills. Good reputation. But he was rarely chosen for high-impact projects. He was known as "the data guy," not as someone who delivered results. When the author put him on her team, she asked everyone to throw out ideas for what was going wrong in the organization. Steve came up with a brilliant idea. She assigned the project to him. Steve partnered across stakeholder groups, created a framework, iterated quickly, and validated results with business partners. The project saved the company millions of dollars and drove a 30% efficiency gain. For the first time, Steve wasn't just the data guy. He was the person who delivered impact.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">The point: doing your job well is not enough. You need to drive measurable impact. And then you need to make sure the right people know about it.</p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 9: An unneeded skill is unvaluable</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Here's a question I love: "If a tree falls in the forest and no one is around to hear it, does anyone care?" If you have a skill but no one around you needs it, it won't get you promoted.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The author thrives in chaotic environments. Structure bores her. She adds the most value when things are messy and nobody knows what to do. She chooses companies in overhaul, disarray, or rapid change.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Here's a mismatch story. The author left a startup-like culture for a "golden ticket" company, a name everyone recognizes. She turned down a CFO offer at a smaller company to take a VP role at this bigger firm. It was a terrible fit. The company was bureaucratic, slow-moving, and resistant to innovation. Leaders treated her natural strengths as problems. They saw her results orientation as impatience. They called her networking inappropriate.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">The takeaway: take your strengths where they are most needed. Don't force yourself into an environment that doesn't value what you bring.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">The self-assessment</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Here's a 20-skill scoring exercise. Rate yourself 1-10 on each skill (10 = you're better than anyone, 1 = never displayed it). Then get three other people to score you: your boss, a peer, and a stakeholder. Average the scores and rank them.
          </p>

          <Collapsible title="The 20 Skills List">
            <ol className="list-decimal list-inside space-y-1 text-muted-foreground text-sm mt-3">
              {[
                "High integrity/honesty", "Technical/professional experience", "Solves problems/analyzes issues", "Innovates", "Learning agility/self-development",
                "Drives for results", "Establishes stretch goals", "Takes initiative", "Communicates powerfully", "Inspires/motivates others",
                "Builds relationships", "Collaboration and teamwork", "Strategic", "Champions change", "Customer and external focus",
                "Develops others", "Strong moral character", "Decision-making", "Risk-taking", "Values diversity"
              ].map((skill, i) => (
                <li key={i}>{skill}</li>
              ))}
            </ol>
          </Collapsible>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
            Your "spikes" are the skills that stand 1-2 points above the rest. These are your differentiators. The areas where you go from average to extraordinary. Two skills require special attention regardless of where they fall: communication and collaboration. If either of these lands in your bottom four, fix them first. Nothing else matters if people don't want to work with you.
          </p>
          <InfoBox title="What I think" variant="gold">
            <p>When I evaluate candidates, I'm looking for spikes. I don't want someone who's "pretty good at everything." I want someone who's exceptional at two or three things. Tell me what makes you different. If you don't, I'll move on to someone who does.</p>
          </InfoBox>
        </div>
      </section>

      {/* ═══════════════════ SECTION 4: BUILD YOUR BRAND ═══════════════════ */}
      <section id="brand" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="04" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Build Your Brand</h2>
              <p className="text-muted-foreground text-lg">Package your spikes into something people remember</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The 11-List</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Here's a simple exercise called the 11-List. Write out: Five things you want to be known for at work. Five things you don't want to be known for at work. One mission statement.</p>

          <div className="grid sm:grid-cols-2 gap-4 mb-6">
            <div className="bg-green-500/5 border border-green-500/20 rounded-xl p-5">
              <h4 className="text-green-400 font-semibold text-sm mb-2">Want to be known for:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>Strategy/vision</li><li>Improving/streamlining</li><li>Being a great leader of teams</li><li>Passion</li><li>Strong communication</li>
              </ul>
            </div>
            <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5">
              <h4 className="text-destructive font-semibold text-sm mb-2">Don't want to be known for:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>Selfishness</li><li>Micromanaging</li><li>Shortsightedness</li><li>Stealing credit</li><li>Bad leadership</li>
              </ul>
            </div>
          </div>

          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-6">
            <p className="text-foreground text-sm font-semibold mb-2">Mission example:</p>
            <p className="text-muted-foreground text-sm italic">"I want to help companies solve complex problems and drive improved efficiencies while building the next generation of leaders."</p>
          </div>

          <p className="text-muted-foreground leading-relaxed mb-6">
            Compare your 11-List with your spikes from the self-assessment. You should see overlap. People who value productivity tend to spike in drives for results. People who value empathy tend to spike in integrity and moral character. Your personal brand should align with who you already are. Not who you want to be. The goal is not to create a personal brand that is vastly different from who you naturally are. You want to stick closely to what you are good at and then become great.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 10: What people think of you at work is directly in your control</h3>
          <InfoBox title="What I think" variant="gold">
            <p>I don't fully agree with this one. You don't control what people think of you. People bring their own biases, moods, and assumptions to every interaction. But the spirit of the idea is right. You should try to influence perception even if you don't control the outcome. If you never describe your value, people will fill in the blanks themselves. That rarely works in your favor.</p>
          </InfoBox>
          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">
            Once you have your 11-List, create a one-to-two sentence elevator pitch. Memorize it. Use it everywhere.
          </p>
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-4">
            <p className="text-foreground text-sm font-semibold mb-2">Brand statement example:</p>
            <p className="text-muted-foreground text-sm italic">"I am the individual who you put in the black hole of your business, where you have no idea what is going on. I bring organization, results, and clarity to that part of the business so it can scale. I do this as a passionate people leader who is focused on creating the next generation of great leaders for the company."</p>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Then pick three to five words from your mission statement. Keep them on a sticky note at your desk. Weave those words into every introduction, kickoff meeting, and accomplishment discussion. Over time, something powerful happens. This is called the echo effect. When you describe yourself consistently, people around you start using the same language to describe you. They echo your brand back to you and to others.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 11: Your brand will enter the room long before you do and leave long after you are gone</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            95% of conversations about your career, promotion, and growth happen when you are not in the room. Here's a story about advocating for a team member's promotion. The company required an executive sponsor, someone at the VP level or above willing to defend the candidate. The author didn't know this requirement existed until the paperwork was due.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Then something remarkable happened. An executive reached out and offered to sponsor the candidate. Over the next 24 hours, four more VPs offered. The candidate's personal brand had preceded him. Leaders across the business were eager to advocate on his behalf.
          </p>
          <InfoBox title="What I think" variant="gold">
            <p>When a hiring manager tells me "I need someone who's great at [specific thing]," I immediately think of candidates who've described themselves that way. If you've never told me what makes you different, you won't come to mind. Your brand is your marketing. Do it well and opportunities find you instead of the other way around.</p>
          </InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Imposter syndrome: A reframe</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Imposter syndrome is not a lack of confidence. It's a lack of faith in yourself to learn new things. Most people only feel confident when they know all the answers. But confidence should be about trusting your ability to figure things out. You've learned every skill you currently have from scratch at some point. You'll learn the next ones too.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">When you don't have the answer, try these phrases:</p>
          <div className="space-y-2 mb-4">
            {[
              '"That\'s a great question. I\'m fairly positive the answer is X, but let me confirm and send a follow-up."',
              '"That\'s an interesting perspective. Let me bring the stakeholders together to deliberate and we\'ll provide an update by Friday."',
              '"Good question. [Colleague X], you\'re the expert in that space, would you take this one?"',
            ].map((phrase, i) => (
              <div key={i} className="bg-muted/30 border border-border rounded-lg p-3">
                <p className="text-foreground text-sm italic">{phrase}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed">Your brand is built. Your spikes are clear. Now you need to understand how the promotion system works behind closed doors, so you stop hoping and start planning.</p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 5: THE PROMOTION MACHINE ═══════════════════ */}
      <section id="promotion" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="05" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">The Promotion Machine</h2>
              <p className="text-muted-foreground text-lg">How decisions really get made</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 12: People prefer to work with people they like</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Five out of six standard competency categories are soft-skills-related. Your company scores you more on collaboration, culture contribution, and working well with others than on your technical ability to do the job. This is a wake-up call for anyone who's been focused purely on technical performance. Overtime hours and training don't matter if you can't work well with people.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">The pushback to the "I don't want to be fake" objection: this isn't about kissing up. It's about treating communication, delivery, and personality as skills you develop, like any other.</p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 13: A desire for a promotion without a plan will land you exactly where you are now 12 months in the future</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The people who get promoted are the ones who asked for it, had a plan, and built their own advocacy resources. They didn't walk into their year-end review expecting a surprise.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            <strong className="text-foreground">The competency exercise:</strong> Get the competency framework for your role. Score yourself against each competency by seniority level. Then give your boss a blank chart and ask them to score you too.
          </p>
          <div className="space-y-3 mb-6">
            {[
              { scenario: "Your boss scores you higher than you scored yourself.", action: "You should be having targeted conversations about promotion. What's holding it back? Timeline? Budget? Ask directly." },
              { scenario: "Your boss scores you lower.", action: "Understand where the gaps are. Ask for specific examples. Create a plan to close those gaps over the next 6-12 months." },
              { scenario: "Scores roughly match.", action: 'You\'re in sync. Now ask: "What would it take for you to feel comfortable advocating for my promotion in the next cycle?"' },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">Scenario {i + 1}: {item.scenario}</p>
                <p className="text-muted-foreground text-sm">{item.action}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Learn to brag (reframe: you're informing)</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            You're not bragging. You're informing. Think about your last workday. What percentage of your activities did your boss witness? 20%? 50%? For the remaining percentage, your boss has no idea what you did or the effort it required. Start an accomplishment tracker. Update it weekly. Use it in one-on-ones to connect your work to business outcomes.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 14: Work that your boss doesn't know about doesn't matter</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Cover your assets. When you make a mistake, come to your boss with a plan. Don't hide it and hope it goes away.
          </p>
          <div className="bg-muted/30 border border-border rounded-xl p-5 mb-6">
            <p className="text-foreground text-sm italic">"Hi. I wanted to make sure you were informed about a small mistake in the report that went out yesterday. We've already resolved it and will resend. Moving forward, we've done X, Y, Z to prevent this from happening again. Wanted you to be aware."</p>
            <p className="text-muted-foreground text-xs mt-2">This shows problem-solving, ownership, and prevention. Your boss hears about it from you first, not from an angry stakeholder.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 15: Most conversations about your career will take place without you in the room</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Here's what happens behind closed doors at most large companies:</p>
          <div className="space-y-3 mb-4">
            {[
              { phase: "Phase 1: Performance review", desc: "You and your boss score you against competencies. You have about 80% control here." },
              { phase: "Phase 2: Promotion submission", desc: "If you're up for promotion, your documentation goes in. Some companies require executive sponsors. Some require \"promotion packets.\" Google, for example, requires a write-up of your work mapped to company values, reviewed by a panel that doesn't include your boss. You have about 60% control here." },
              { phase: "Phase 3: Calibration", desc: "Leaders bring all reviews into a room and compare across teams. Companies aim for a bell curve: 70% scoring a 3, 10% scoring 1-2, and 20% scoring 4-5. If too many people are rated 5, they move people down. If your score is on the bubble, the number of people in that room who know you and think highly of you determines whether you stay or get bumped." },
            ].map((item, i) => (
              <div key={i} className="bg-background border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{item.phase}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
          <InfoBox title="What I think" variant="gold">
            <p>I've been in these rooms. I've watched people get bumped down because nobody in the room knew who they were. I've watched people stay at the top because three leaders spoke up for them. Your network isn't optional. It's your insurance policy in the rooms you're not in.</p>
          </InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Secret 16: Your potential, not your performance, is what gets you into senior leadership</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Performance is about how well you do your current job. Potential is about how high and how fast you can grow. They're different measurements, and most companies weight potential more heavily for promotion decisions.
          </p>

          <NineBoxGrid />

          <div className="space-y-4 mt-6">
            {[
              { box: "Box 1, Bad hires:", desc: "Low performance, low potential. Get managed out or fired quickly." },
              { box: "Box 4, Up-or-out grinders:", desc: "Strong work delivery, poor communication and self-advocacy. They grind all day but get little recognition. Managers take advantage of them with more work instead of investing in their growth." },
              { box: "Box 5, Workhorses:", desc: "Great at their job, going above and beyond, but can't operate without their manager. They're told \"we couldn't do this without you\" but aren't included in leadership meetings or cross-collaborative projects." },
              { box: "Box 6, Core players:", desc: "Good work, good soft skills, will reach middle management and plateau. They're the steady-state players who keep things running." },
              { box: "Box 7, High potentials:", desc: "Good at their job, but their communication and soft skills outshine their core performance. Brought into high-profile projects often." },
              { box: "Box 8, High performers:", desc: "The SME you see in every meeting. Handle a huge workload with high proficiency and strong soft skills. Move up every 3-4 years." },
              { box: "Box 9, Stars:", desc: "1-5% of the population. Excellent soft skills, fast progression, high-caliber work, naturally good at the game. If you're in this group, you know it." },
            ].map((item, i) => (
              <p key={i} className="text-muted-foreground text-sm leading-relaxed"><strong className="text-foreground">{item.box}</strong> {item.desc}</p>
            ))}
          </div>

          <p className="text-muted-foreground leading-relaxed mt-4 mb-4">Companies usually won't tell you which box you're in. But you should be able to feel it based on the feedback you receive.</p>

          <Collapsible title="Which box are you in right now? A quick self-check">
            <div className="space-y-3 mt-3">
              {[
                { q: "Do you hear \"great work\" but never get promoted?", a: "Box 4 or 5 (Grinder or Workhorse). Your soft skills need work." },
                { q: "Do people love working with you but question your output?", a: "Box 2 or 7 (Dilemma or High Potential). Your delivery needs work." },
                { q: "Do you get solid reviews, good feedback, but feel stuck in place?", a: "Box 6 (Core Player). You need to decide if you want more, then build a plan." },
                { q: "Do you get pulled into high-profile projects and promoted every 3-4 years?", a: "Box 8 (High Performer). Keep doing what you're doing." },
                { q: "Does everyone fight to work with you and you're moving up fast?", a: "Box 9 (Star). You already know the game." },
              ].map((item, i) => (
                <div key={i} className="bg-background rounded-lg p-3">
                  <p className="text-foreground text-sm font-medium mb-1">{item.q}</p>
                  <p className="text-muted-foreground text-xs">→ {item.a}</p>
                </div>
              ))}
            </div>
          </Collapsible>

          <InfoBox title="What I think" variant="gold">
            <p className="mt-2">When I recruit for leadership roles, I'm screening for potential, not performance. Does this person grow into the next level? Do they lead a team? Do they handle ambiguity? I don't care if you ran a perfect report every Thursday. I care if you step into a room of senior leaders and hold your own.</p>
          </InfoBox>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Secret 17: Building your leadership skills allows for not only your success but the success of your team</h3>
          <p className="text-muted-foreground leading-relaxed">
            This is the bridge between knowing where you sit and doing something about it. Your individual skills got you to this point. Leadership skills get you to the next level. It's not enough to do your job well and help your team do theirs. You need to grow and develop yourself and your people while keeping your leadership informed about that work. This allows you to move further in your career and bring your team alongside you.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 6: GROW YOUR NETWORK ═══════════════════ */}
      <section id="network" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="06" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Grow Your Network</h2>
              <p className="text-muted-foreground text-lg">Your insurance policy in the rooms you're not in</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 18: Your network must extend beyond your own team</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Think of your network like a tree. The trunk is your direct leadership chain (your boss, their boss, up the line). The branches and leaves are your lateral, diagonal, and cross-organizational relationships. Most people build a strong trunk and stop there. But the branches are what make you stand out and give you access to resources (opportunities, visibility, advocates).
          </p>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Take Jim, the best networker in any career book I've read. Jim has never applied for a job. When Jim found himself in a dead-end role after a company restructuring, he didn't submit applications. He hosted and attended events. He joined newsletters and community groups. He did cold outreach to anyone who might know someone in his target space. In two months, he expanded his network tenfold. He had connections at five major players in his target industry. When it came time to formally look for roles, each contact had potential opportunities. Jim had his pick.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 19: Without a network you will fail</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Score 20-25 people in your organization across eight criteria: Relationship strength, Seniority, Risk to your progression, Power in the organization, Ability to give you exposure, Fear factor, Validation power, and Future influence on your career. Total and rank everyone. Remove anyone more than two levels above you (put them on a "reach" list). Focus on your top five accessible contacts.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Schedule coffee chats or mentoring sessions within 30 days. If reaching out directly feels inappropriate in your company culture, ask your boss: "As part of my desire to continue to grow, I'm trying to expand my network. I've noticed that [X person] is great at [Y skill]. I'd love to meet with them to learn. Would you be willing to help me make a connection?"
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 20: People who help you will think of you more fondly than people you help</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This is counterintuitive but backed by psychology. When someone helps you, they view you as an extension of themselves. They've invested in you. Recommending you feels like recommending their own judgment. The advice: when networking, seek to learn first. Don't offer to help. Ask them to teach you.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">Your first conversation with a new connection should achieve three things:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li>Learn about their personal and professional background. Find commonalities.</li>
            <li>Identify a skill they have that you want to develop. Flatter them genuinely: "I've noticed you're exceptional at [X] and I'd love to learn tips from you."</li>
            <li>Share your personal brand. Not a resume recap. What makes you different and valuable.</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">Mentorship rules</h3>
          <div className="space-y-2 mb-6">
            {[
              "Do not complain about your boss, leadership, or colleagues. Your mentor is not your therapist.",
              "Come prepared with two or three topics where the mentor can add value through coaching.",
              "Schedule formal meetings. Put them on the calendar. This is a professional relationship.",
              "Do not beg for a job. If they post a position you're interested in, ask about it in a separate conversation.",
            ].map((rule, i) => (
              <div key={i} className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-muted-foreground text-sm">{rule}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECTION 7: HOW TO DISAGREE ═══════════════════ */}
      <section id="disagree" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="07" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">How to Disagree Without Getting Fired</h2>
              <p className="text-muted-foreground text-lg">Communication frameworks for difficult situations</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 21: How you communicate your disagreement is more important than your opinion</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Three reasons disagreements go sideways:</p>
          <div className="space-y-3 mb-6">
            {[
              { title: "Your leadership doesn't always want the most direct solution.", desc: "Politics exist. Your solution might require collaboration with a team that's unwilling to cooperate. Or leadership is making a play for more scope that your solution doesn't support." },
              { title: "Your leadership has context you don't have.", desc: "Your solution might fix your problem but create issues elsewhere. Tunnel vision makes you miss the bigger picture." },
              { title: "You're not bringing people along on your mental journey.", desc: "Natural problem-solvers jump to solutions. But if your solution is three steps ahead of where the room is mentally, people won't follow." },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{i + 1}. {item.title}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Kings and Specialists</h3>
          <KingsVsSpecialists />
          <p className="text-muted-foreground leading-relaxed mt-4 mb-6">Understanding which type you're dealing with prevents conflict before it starts.</p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 22: Catering your communication to the individual will prevent conflict before it arises</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            There's a Japanese concept that applies here: nemawashi. It translates as "turning the roots" but means "decisions happen in the hallways." The idea: don't wait for a big meeting to present your idea for the first time. Do pre-reads. Have one-on-one conversations. Build alignment before the formal proposal. If the first time your boss hears your idea is in a meeting with 20 people, your chances of success are low. Do the pre-work instead.
          </p>

          <h3 className="font-heading text-lg text-foreground mb-3">Five tools for conflict resolution</h3>
          <div className="space-y-3 mb-6">
            {[
              { tool: "Ask a ton of questions.", desc: 'Phrase your feedback as questions. Instead of "That won\'t work," say "Can you help me understand how this aligns with the operations team\'s needs?"' },
              { tool: "Acknowledge before you respond.", desc: 'When someone proposes something you disagree with, start with "Thank you for bringing that up" before explaining your concern. This makes people feel included rather than steamrolled.' },
              { tool: "Disagree without saying no.", desc: 'Say "I understand why we\'d want to do this, but I have a few concerns..." Share concerns rather than flat disagreement.' },
              { tool: "RASI framework.", desc: "Restate the problem. Ask qualifying questions. State your solution. Include others for buy-in." },
              { tool: "Everything is a yes.", desc: 'Nothing is impossible if you have enough people, time, or money. Instead of saying no, frame the cost: "We can absolutely do that. It would require adding two headcount and pushing the Q3 timeline back by six weeks. Would you like me to put together those options?"' },
            ].map((item, i) => (
              <div key={i} className="bg-card border border-border rounded-xl p-4">
                <p className="text-foreground font-semibold text-sm mb-1">{i + 1}. {item.tool}</p>
                <p className="text-muted-foreground text-sm">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-lg text-foreground mb-3">The ARSE email template</h3>
          <p className="text-muted-foreground leading-relaxed mb-3">A framework for communicating with leadership or difficult stakeholders (yes, the acronym is intentional):</p>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "A", word: "Acknowledge", desc: "Thank them for reaching out. Greet them formally if they're senior or external." },
              { letter: "R", word: "Restate", desc: "Repeat their question in your own words. Add context to show you understand what they're asking." },
              { letter: "S", word: "Solve", desc: "Present a solution. Answer the question. Provide next steps." },
              { letter: "E", word: "Extol", desc: "Show appreciation. Acknowledge their expertise. Remind them you're available for follow-up." },
            ].map((item) => (
              <div key={item.letter} className="bg-card border border-border rounded-xl p-4">
                <span className="text-gold font-bold text-lg">{item.letter}</span>
                <span className="text-foreground font-semibold text-sm ml-2">{item.word}</span>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 23: You are not always going to get your way</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This is Amazon's "disagree and commit" practice. Share your concerns early using the five tools above. If leadership still chooses a different direction, let it go and work to make the project successful.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Triggers matter too. Look at the five things on your "don't want to be known for" list. Those same traits are what trigger you in other people. When a coworker drives you crazy, it's likely because they exhibit a trait you've rejected in yourself. Knowing your triggers lets you prepare.
          </p>

          <Collapsible title="Before your next interaction with a difficult colleague, do this">
            <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mt-3">
              <li><strong className="text-foreground">Name the trigger.</strong> What is it about this person that bothers you? Is it their laziness? Their need to control? Their disorganization? Be specific.</li>
              <li><strong className="text-foreground">Check it against your 11-List.</strong> Is the trait on your "don't want to be known for" list? If yes, you're projecting your own standards onto someone who doesn't share them. That's your problem to manage, not theirs.</li>
              <li><strong className="text-foreground">Prepare your responses in advance.</strong> Write down two or three things you know you'll want to say in the meeting. Then rewrite them using the acknowledge-then-respond method.</li>
              <li><strong className="text-foreground">Set a personal boundary for the interaction.</strong> Decide ahead of time: "I will not interrupt. I will ask one clarifying question before reacting. I will not send a follow-up email while I'm still frustrated."</li>
              <li><strong className="text-foreground">Debrief after.</strong> Did your triggers get pulled? What did you say? What would you change next time? The goal isn't to eliminate your triggers. The goal is to stop them from controlling your behavior in the moment.</li>
            </ol>
          </Collapsible>
        </div>
      </section>

      {/* ═══════════════════ SECTION 8: MANAGING VS LEADING ═══════════════════ */}
      <section id="managing" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="08" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Managing vs. Leading</h2>
              <p className="text-muted-foreground text-lg">The biggest skill jump in your career</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 24: Managing and leading are not the same</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The jump from senior manager to director is one of the most difficult across all industries. You don't make it without learning to lead, not manage. Many managers know how to manage but not lead. Those become micro-managers. Many leaders don't know how to manage. Those become absent bosses. Finding someone who does both well is rare.
          </p>
          <InfoBox title="What I think" variant="gold">
            <p>I once hired a senior manager for a team lead role. Strong technical skills. Great interview performance. Within three months, half the team had requested transfers. The problem? He did everything himself. He rewrote his team's work instead of coaching them. He attended every meeting instead of delegating. He was a high performer as an individual contributor, but he had zero management skills. His team felt invisible. When I recruit for management roles now, the first thing I ask is: "Tell me about someone you developed on your team." If the answer is vague, that tells me everything.</p>
          </InfoBox>

          <SkillMaturityLadder />

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Three pillars of effective management</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Effective management requires only three things:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-4">
            <li>Setting clear expectations for your team</li>
            <li>Regular check-ins for development and project completion</li>
            <li>Understanding the learning styles and goals of each team member</li>
          </ol>
          <p className="text-muted-foreground leading-relaxed mb-6">Master these three and you'll be better than 90% of managers.</p>

          <h3 className="font-heading text-lg text-foreground mb-3">CODS framework for assigning work</h3>
          <div className="grid sm:grid-cols-2 gap-3 mb-6">
            {[
              { letter: "C", word: "Context", desc: "Why does this work matter? What question are you trying to answer? What stakeholder requested it?" },
              { letter: "O", word: "Outcome", desc: "What does the deliverable look like? A pivot table? A dashboard? A slide deck? Be specific, especially with junior team members." },
              { letter: "D", word: "Deadline", desc: "When is the first draft due? The final? What checkpoints exist in between?" },
              { letter: "S", word: "Source", desc: "Where can they get more information? Who should they partner with? Where's the data?" },
            ].map((item) => (
              <div key={item.letter} className="bg-background border border-border rounded-xl p-4">
                <span className="text-gold font-bold text-lg">{item.letter}</span>
                <span className="text-foreground font-semibold text-sm ml-2">{item.word}</span>
                <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
              </div>
            ))}
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 25: Success starts at assignment, not at completion</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">If you set your team up for success when you assign the work, you'll spend less time fixing things on the back end.</p>

          <Collapsible title="Management ceremonies — a cadence that works">
            <ul className="space-y-2 text-muted-foreground text-sm mt-3">
              <li>• <strong className="text-foreground">Biweekly one-on-ones:</strong> 10 minutes for priorities, 10 for real-time feedback, 10 for escalations and roadblocks.</li>
              <li>• <strong className="text-foreground">Alternating biweekly team meetings</strong> for sharing updates, project successes, and context.</li>
              <li>• <strong className="text-foreground">January</strong> goal-setting calls with each individual.</li>
              <li>• <strong className="text-foreground">June</strong> mid-year reviews for progress checks and career conversation.</li>
              <li>• <strong className="text-foreground">October/November</strong> year-end prep to ensure no one is surprised by their evaluation.</li>
            </ul>
          </Collapsible>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Secret 26: A successful employee begets a successful leader</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Too many managers are afraid to share credit with their team. They worry the employee will look better than them. This is backwards. As your team does better, you look better. Your goal as a manager should be to constantly replace yourself. When your team can operate without you, you're freed up for more strategic, visible work.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 27: Negative patterns are more problematic than negative people</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Forget "problem employees." Focus on problem patterns. Like a doctor diagnosing a disease by its symptoms, managers should identify root-cause patterns and treat those.
          </p>
          <Collapsible title="Common negative patterns to identify">
            <ul className="space-y-2 text-muted-foreground text-sm mt-3">
              <li>• <strong className="text-foreground">Poor attention to detail:</strong> small mistakes, typos, wrong people CCed, misses small deadlines.</li>
              <li>• <strong className="text-foreground">Lack of proactivity:</strong> waits for step-by-step instructions, great at BAU but struggles with new work.</li>
              <li>• <strong className="text-foreground">Substandard organization:</strong> no documentation, scattered communication, plans without follow-through.</li>
              <li>• <strong className="text-foreground">Weak communication and executive presence:</strong> does great work but can't articulate it, shy around leaders.</li>
              <li>• <strong className="text-foreground">Refusal to delegate:</strong> does everything themselves, doesn't trust the team.</li>
            </ul>
            <p className="text-muted-foreground text-sm mt-3">Manage the pattern, not the person. Give consistent feedback on "delegation" rather than dozens of unrelated complaints they don't know how to fix.</p>
          </Collapsible>

          <h3 className="font-heading text-xl text-foreground mt-8 mb-3">Secret 28: You can't compensate for your team</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Three rules for building a team:</p>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li>Don't be afraid to manage out underperformers. Set expectations, give time to deliver, communicate clearly. If they don't improve, they need to go.</li>
            <li>When hiring, focus on attitude, work ethic, and culture fit first. Technical skills second. Hard workers with good foundations can be taught most skills.</li>
            <li>Delegate. If you do everything yourself, your team can't grow and neither can you.</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 29: Strategy is essential</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Two tools for building strategy:</p>
          <div className="space-y-3">
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">1. The vision question:</p>
              <p className="text-muted-foreground text-sm">"How would I run my team if I had unlimited money and resources?" Then walk it back to reality and create a roadmap from today to that future state.</p>
            </div>
            <div className="bg-background border border-border rounded-xl p-4">
              <p className="text-foreground font-semibold text-sm mb-1">2. The rule of threes:</p>
              <p className="text-muted-foreground text-sm">Organize your goals into three categories. More than three overwhelms people. Fewer than three looks like you didn't think it through. Three is the ideal number for people to digest in one sitting.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════ SECTION 9: MENTAL LOAD ═══════════════════ */}
      <section id="mental" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="09" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Mental Load, Toxic Workplaces, and Managing Up</h2>
              <p className="text-muted-foreground text-lg">Protect your energy so everything else works</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 30: Managing your mental load should take priority over managing your workload</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            Mental load, not hours worked, is the real predictor of burnout. Someone working 30-35 hours a week might have a high mental load if they're carrying the planning, follow-up, and quality control for their entire team. Someone working 50 hours with a clearly defined, repeatable scope might have a low mental load.
          </p>
          <h4 className="text-foreground font-semibold text-sm mb-3">Six tactics for reducing mental load:</h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li><strong className="text-foreground">Lists and roadmaps.</strong> Break big projects into small tasks. Assign them to specific dates.</li>
            <li><strong className="text-foreground">Day blocking.</strong> Certain types of work on certain days. Example: block Monday and Friday afternoons for catching up, Tuesdays for slides, Sundays for content creation.</li>
            <li><strong className="text-foreground">Prioritization trade-offs.</strong> Come to your boss with a pre-prepared list of priorities. Ask which ones matter most. Let go of what gets deprioritized.</li>
            <li><strong className="text-foreground">Comprehensive delegation.</strong> Not just handing off a task, but handing off ownership. If you delegate but keep getting pulled back in, it doesn't reduce your load.</li>
            <li><strong className="text-foreground">Creating a strategy.</strong> When you have a clear roadmap approved by your boss, it's easier to push back on new requests that don't align.</li>
            <li><strong className="text-foreground">For managers:</strong> Don't share the full multi-year roadmap with your team if it will stress them out about future work that doesn't exist yet. Focus one to two years ahead.</li>
          </ol>

          <h3 className="font-heading text-lg text-foreground mb-3">Managing up with optionality</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            The best way to manage your boss is to lighten their mental load. Do the thinking upfront. When requesting a raise: research market rates, create a presentation, outline your value and your ask. When advocating for promotion: create a one-pager showing your scope at the next level and the competencies you've demonstrated. When proposing a solution: present three options on a single slide so they can make a decision quickly.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 31: A toxic workplace isn't good for anyone</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">Here's a checklist for identifying a toxic workplace:</p>
          <div className="bg-destructive/5 border border-destructive/20 rounded-xl p-5 mb-6">
            <ul className="space-y-2">
              {[
                "You dread Monday mornings on Sunday night.",
                "You're afraid to ask questions for fear of backlash.",
                "You feel discriminated against.",
                "You don't trust your boss for support.",
                "Extreme overtime without pay, verbal abuse, or inappropriate relationships are common.",
                "You take time off solely to recover from your job.",
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive shrink-0 mt-0.5" />
                  <span className="text-muted-foreground text-sm">{item}</span>
                </li>
              ))}
            </ul>
            <p className="text-foreground text-sm font-medium mt-4">If any of these ring true, the advice is direct: quit your job.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 32: It takes time to recover from a toxic workplace</h3>
          <p className="text-muted-foreground leading-relaxed">
            Like recovering from a bad relationship, you need time to rebuild after leaving a toxic environment. Go back to your spikes and your 11-List. Rediscover who you are without the toxicity shaping your self-image. Build your brand statement fresh and start weaving it into conversations again.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 10: CORNER OFFICE ═══════════════════ */}
      <section id="corner" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="10" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Do You Even Want a Corner Office?</h2>
              <p className="text-muted-foreground text-lg">The honest question most career advice skips</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 33: Most people will never be executives</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            This isn't harsh. It's practical. The skills required for executive leadership can all be learned, but most people won't want to invest the time and discomfort required. The author was offered a CFO position before she turned 30. She turned it down. Her goals had shifted. She no longer wanted long hours. Her problem-solving skills were more impactful in operations than finance. A CFO role no longer aligned with who she was.
          </p>
          <h4 className="text-foreground font-semibold text-sm mb-3">Five non-negotiable skills for executive leadership:</h4>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground text-sm mb-6">
            <li><strong className="text-foreground">Public speaking.</strong> You must present to large groups regularly. Period.</li>
            <li><strong className="text-foreground">Strong moral character.</strong> Trust is the foundation. Without it, nothing else works.</li>
            <li><strong className="text-foreground">Strategy.</strong> See beyond how the company operates today. Tie vision to actionable goals.</li>
            <li><strong className="text-foreground">The ability to navigate interpersonal conflict.</strong> It gets worse the higher you go. More people, more opinions, more resources at stake.</li>
            <li><strong className="text-foreground">Unwavering confidence.</strong> Believe in your decisions and be prepared to defend them when things go wrong.</li>
          </ol>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 34: The right path for your career is a natural alignment to your skills and interests</h3>
          <p className="text-muted-foreground leading-relaxed mb-6">
            Watch out for the "accidental career," taking whatever comes your way without intention. But typical career advice gets flipped. It's not always a straight ladder up. It's a career lattice, moving up, sideways, and diagonally. The most successful people profiled held jobs in multiple departments, industries, and seniority levels. They followed their skills into whatever role allowed them to make the biggest impact.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 35: Only the culture of your direct manager matters</h3>
          <p className="text-muted-foreground leading-relaxed mb-4">
            There's a concept called "ghost culture." This is the culture a CEO thinks exists. The one printed on posters, posted on websites, quoted in interviews. The reality: the culture most employees experience is the subculture of their direct team and supervisor. The broader company culture might exist at the top, but it rarely trickles down consistently.
          </p>
          <p className="text-muted-foreground leading-relaxed mb-4">Strong interview questions for evaluating culture:</p>
          <div className="space-y-2 mb-4">
            {[
              '"How do you give constructive feedback?"',
              '"How often does the organization allow for progression conversations?"',
              '"What\'s the average tenure of team members on this team?"',
              '"What\'s the thing you dislike most about the company and this team?"',
            ].map((q, i) => (
              <div key={i} className="bg-background border border-border rounded-lg p-3">
                <p className="text-foreground text-sm italic">{q}</p>
              </div>
            ))}
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6">And her strongest recommendation: ask to speak with a peer on the team. If the company refuses, that's a severe red flag.</p>

          <h3 className="font-heading text-xl text-foreground mb-3">Secret 36: The leaders you hire determine your company culture</h3>
          <p className="text-muted-foreground leading-relaxed">
            The final secret speaks directly to leaders. One bad hire poisons a team's culture. One bad manager creates a toxic subculture that's hard to undo. As you move up, the culture of your organization depends on the leaders you bring in. Hire for values alignment. Hire for culture fit. Technical skills are teachable. Values are not.
          </p>
        </div>
      </section>

      {/* ═══════════════════ SECTION 11: ACTION TRACKER ═══════════════════ */}
      <section id="action" className="py-14 md:py-20 px-5 md:px-6 scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-start gap-5 mb-8">
            <SectionNumber num="11" />
            <div className="pt-3">
              <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Your Next Steps: Assess and Take Action</h2>
              <p className="text-muted-foreground text-lg">Turn this guide into action today</p>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 1: Assess Where You Are (This Week)</h3>
              <InteractiveChecklist guideKey="career_game_step1_en" lang="en" items={[
                { label: "Complete the 20-skill self-assessment. Score yourself 1-10 on each skill. Find your spikes.", href: "#spikes" },
                { label: "Track your work for one full week. Tag everything as BAU, high-impact, or self-development. Calculate your percentages. Compare to the 40/40/20 target.", href: "#work" },
                { label: "Write your 11-List. Five things you want to be known for. Five things you don't. One mission statement.", href: "#brand" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 2: Get a Reality Check (Within 30 Days)</h3>
              <InteractiveChecklist guideKey="career_game_step2_en" lang="en" items={[
                { label: "Give your boss a blank competency chart. Ask them to score you. Compare their scores to yours." },
                { label: "Ask three people (boss, peer, stakeholder) to score you on the 20-skill assessment. Average the results.", href: "#spikes" },
                { label: "Have the conversation: \"What would it take for you to feel comfortable advocating for my promotion in the next cycle?\"", href: "#promotion" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 3: Build Your Brand (Within 60 Days)</h3>
              <InteractiveChecklist guideKey="career_game_step3_en" lang="en" items={[
                { label: "Write your two-sentence elevator pitch. Memorize it.", href: "#brand" },
                { label: "Pick three to five words from your mission statement. Put them on a sticky note where you can see them daily." },
                { label: "Start using your brand language in meetings, one-on-ones, and emails. By the 20th time, it will feel natural.", href: "#brand" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 4: Grow Your Network (Within 90 Days)</h3>
              <InteractiveChecklist guideKey="career_game_step4_en" lang="en" items={[
                { label: "Create your influencer list of 20-25 people. Score them using the eight-criteria template.", href: "#network" },
                { label: "Schedule coffee chats with your top five accessible contacts." },
                { label: "Prepare two to three coaching topics for each meeting. Ask to learn, not to pitch." },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 5: Set Up Your Promotion Infrastructure (Ongoing)</h3>
              <InteractiveChecklist guideKey="career_game_step5_en" lang="en" items={[
                { label: "Start your accomplishment tracker. Update it weekly.", href: "#promotion" },
                { label: "Set up biweekly one-on-ones with your boss (if you don't have them). Use the 10/10/10 structure: inform, escalate, advocate.", href: "#promotion" },
                { label: "Identify one BAU task you can bundle, rebrand, or automate into high-impact work this quarter.", href: "#work" },
              ]} />
            </div>
            <div className="bg-card border border-border rounded-xl p-5 md:p-6">
              <h3 className="font-heading text-lg text-foreground mb-3">Step 6: Check Yourself Every 90 Days</h3>
              <InteractiveChecklist guideKey="career_game_step6_en" lang="en" items={[
                { label: "Re-score your competencies. Are you closing the gaps?", href: "#spikes" },
                { label: "Review your 40/40/20 work split. Has the balance shifted?", href: "#work" },
                { label: "Update your accomplishment tracker. Share wins with your boss." },
                { label: "Warm up one dormant network contact per quarter.", href: "#network" },
              ]} />
            </div>
          </div>

          <InfoBox title="What I think" variant="gold">
            <p className="mt-1">The candidates who progress fastest are the ones who treat their career like a project. They set goals. They track progress. They adjust every quarter. They don't wait for their annual review to find out where they stand. Do the work in Steps 1-6 and you'll be ahead of 90% of your peers.</p>
          </InfoBox>
        </div>
      </section>

      {/* ═══════════════════ QUICK REFERENCE ═══════════════════ */}
      <section id="reference" className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border scroll-mt-24">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">Quick Reference: All 36 Secrets</h2>
          <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
            {[
              "You are an entrepreneur, and your career is your business.",
              "Relationships matter more than the work.",
              "Communication is key.",
              "No one is responsible for your career but you.",
              "You must have and maintain healthy boundaries.",
              "Your boss does not know what you are working on.",
              "How you talk about your work matters.",
              "If you do not have an impact, you will not see progression.",
              "An unneeded skill is unvaluable.",
              "What people think of you at work is directly in your control.",
              "Your brand will enter the room long before you do and leave long after you are gone.",
              "People prefer to work with people that they like.",
              "A desire for a promotion without a plan will land you exactly where you are now 12 months in the future.",
              "Work that your boss doesn't know about doesn't matter.",
              "Most conversations about your career will take place without you in the room.",
              "Your potential, not your performance, is what gets you into senior leadership.",
              "Building your leadership skills allows for not only your success but the success of your team.",
              "Your network must extend beyond your own team.",
              "Without a network you will fail.",
              "People who help you will think of you more fondly than people you help.",
              "How you communicate your disagreement is more important than your opinion.",
              "Catering your communication to the individual will prevent conflict and disagreements before they arise.",
              "You are not always going to get your way.",
              "Managing and leading are not the same.",
              "Success starts at assignment, not at completion.",
              "A successful employee begets a successful leader.",
              "Negative patterns are more problematic than negative people.",
              "You can't compensate for your team.",
              "Strategy is essential.",
              "Managing your mental load should take priority over managing your workload.",
              "A toxic workplace isn't good for anyone.",
              "It takes time to recover from a toxic workplace.",
              "Most people will never be executives.",
              "The right path for your career is a natural alignment to your skills and interests.",
              "Only the culture of your direct manager matters.",
              "The leaders you hire determine your company culture.",
            ].map((secret, i) => (
              <p key={i} className="text-muted-foreground text-sm py-1.5">
                <span className="text-gold font-bold mr-1.5">{i + 1}.</span>{secret}
              </p>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════ RESOURCES ═══════════════════ */}
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
            <p className="text-cream/80 text-sm italic mb-4">"Secrets of the Career Game: 36 Simple Strategies to Win in the Workplace" by Kendall Berg</p>
            <h3 className="text-gold text-sm font-bold uppercase mb-3">Also Recommended</h3>
            <ul className="space-y-1 text-cream/70 text-sm">
              <li>• <em>The Unspoken Truths for Career Success</em> by Tessa White</li>
              <li>• <em>The New Extraordinary Leader</em> by John Zenger and Joseph Folkman</li>
              <li>• <em>The Coaching Habit</em> by Michael Stanier</li>
              <li>• <em>Dare to Lead</em> by Brene Brown</li>
            </ul>
          </div>

          <div className="grid sm:grid-cols-3 gap-4">
            <Link to="/office-politics-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Master office politics</p>
              <span className="text-gold text-sm font-medium">Office Politics Guide →</span>
            </Link>
            <Link to="/interview-prep-guide" className="group bg-cream/5 border border-cream/10 rounded-xl p-6 text-center hover:bg-cream/10 transition-all">
              <p className="text-cream font-semibold mb-2 group-hover:text-gold transition-colors">Ace your interviews</p>
              <span className="text-gold text-sm font-medium">Interview Prep Guide →</span>
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
            This guide is based on Kendall Berg's book "Secrets of the Career Game: 36 Simple Strategies to Win in the Workplace." All framework concepts, secrets, and core methodology credit goes to Kendall Berg. Recruiter perspectives and reality checks are from James Bugden's 15+ years of hiring experience.
          </p>
        </div>
      </section>

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
    
      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default CareerGameGuide;