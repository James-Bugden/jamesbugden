import { ArrowLeft, Download, CheckCircle2, AlertTriangle, Lightbulb, Target, Users, Rocket, Crown } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { Button } from "@/components/ui/button";
import GuideShareButtons from "@/components/GuideShareButtons";

const PivotMethodMiniGuide = () => {

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-foreground hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <LanguageToggle variant="nav" />
            <Button asChild className="btn-gold">
              <a href="/downloads/The_Pivot_Method_Mini_Guide.pdf" download>
                <Download className="w-4 h-4 mr-2" />
                Download PDF
              </a>
            </Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="bg-[#1B3A2F] text-cream py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-4xl text-center">
          <p className="text-gold font-medium mb-4 tracking-wide uppercase">Quick Guide to Career Change</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl mb-6">
            The Pivot Method
          </h1>
          <p className="text-xl md:text-2xl text-cream/90 mb-4">
            Based on "Pivot: The Only Move That Matters Is Your Next One" by Jenny Blake
          </p>
          <p className="text-lg text-cream/80">
            By James Bugden • Senior Recruiter
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12 md:py-16 max-w-4xl">
        
        {/* Why This Guide Exists */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Why This Guide Exists</h2>
          <div className="prose prose-lg max-w-none text-muted-foreground">
            <p className="text-lg leading-relaxed mb-4">
              I've hired 500+ people at companies like Uber and Netskope. I've reviewed over 20,000 resumes. And the pattern I see most often is this: talented people stuck in the wrong career, making the wrong moves to get out.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              They quit without a plan. They start from scratch in a totally different field. They apply to 200 jobs online and wonder why nobody calls back.
            </p>
            <p className="text-lg leading-relaxed mb-4">
              Jenny Blake's book "Pivot" lays out a smarter method. It's the same approach I've seen work for the best career changers I've hired. This guide breaks it down through a recruiter's lens — what I actually see work (and fail) from the hiring side of the table.
            </p>
            <p className="text-lg leading-relaxed">
              This is the condensed version; the framework, the key actions, and the mistakes to avoid.
            </p>
          </div>
        </section>

        {/* What Is a Career Pivot */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">What Is a Career Pivot?</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            A pivot is doubling down on what's working to shift in a new, related direction. You're not starting from scratch. You're using your existing strengths, skills, and connections to move into something better.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Think of it like basketball: one foot stays planted (your foundation) while the other explores new territory.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-heading text-xl text-red-800 mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                A pivot is NOT:
              </h3>
              <ul className="space-y-2 text-red-700">
                <li>• Quitting your job with no plan</li>
                <li>• Starting over in a totally different field</li>
                <li>• A midlife crisis or breakdown</li>
              </ul>
            </div>
            <div className="bg-green-50 border border-green-200 rounded-xl p-6">
              <h3 className="font-heading text-xl text-green-800 mb-4 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                A pivot IS:
              </h3>
              <ul className="space-y-2 text-green-700">
                <li>• A planned, step-by-step process</li>
                <li>• Building on what you already have</li>
                <li>• Testing before committing</li>
                <li>• Reducing risk while exploring</li>
              </ul>
            </div>
          </div>

          <div className="mt-8 bg-gold/10 border border-gold/30 rounded-xl p-6">
            <p className="text-foreground">
              <strong>Why this matters now:</strong> Average job tenure is 4-5 years. You'll likely have 11+ jobs and change industries 3-6 times in your career. The question isn't whether you'll pivot — it's whether you'll do it well or badly.
            </p>
          </div>
        </section>

        {/* The 5 Stages */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">The 5 Stages</h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            Most people skip straight to Stage 4 (making the big move) without doing the work in Stages 1-3. That's why most career changes feel chaotic instead of strategic.
          </p>

          {/* Stage 1: Plant */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">Stage 1: Plant — Set Your Foundation</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Before you explore anything new, get clear on what you already have and what you actually want.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Calibrate your compass.</h4>
                <p className="text-muted-foreground">What are your real values — not what should matter, but what actually does? What energizes you versus drains you? What are your non-negotiables?</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Recruiter reality check:</strong> I see candidates who haven't figured this out take jobs for money, then quit six months later because the culture is toxic. They chase titles without considering whether the role uses their strengths. Know your compass before you start searching.
                </p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Set a 1-year vision.</h4>
                <p className="text-muted-foreground">Not 5 years, not 10. Where do you want to be in one year? Be specific. "I want to be leading a team of 5 engineers working on AI infrastructure" is useful. "I want a better job" is not.</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Identify your strengths.</h4>
                <p className="text-muted-foreground">What are you naturally good at? What do people come to you for? What skills transfer to new contexts? Successful pivots leverage existing strengths in new ways — engineers pivot to product management, consultants pivot to internal strategy, teachers pivot to corporate training. They don't start from zero. They re-aim.</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Fund your runway.</h4>
                <p className="text-muted-foreground">You cannot pivot from financial desperation. Save 3-6 months of expenses minimum before making any major move. Desperation kills your negotiating power. When I'm hiring, I can sense when a candidate needs the job versus wants the job. The ones who want it get better offers.</p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Action steps for Stage 1:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Write down your top 3-4 values (the real ones, not the aspirational ones)</li>
                  <li>Complete this sentence: "In one year, I want to be ___" with as much specificity as possible</li>
                  <li>List 5 things you're genuinely good at that people rely on you for</li>
                  <li>Calculate your runway: monthly expenses × 6 = your savings target</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 2: Scan */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">Stage 2: Scan — Gather Intelligence</h3>
            </div>
            <p className="text-muted-foreground mb-6">
              Now that you know your foundation, research where you want to go and what it takes to get there.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-2">Build your network before you need it.</h4>
                <p className="text-muted-foreground">70-80% of jobs are filled through networks, not job postings. When I open a role at Uber, my first step is asking my team "who do we know?" If someone vouches for a candidate, they jump to the front of the line. Cold applicants need to be exceptional to get noticed.</p>
                <p className="text-muted-foreground mt-2">Don't think of networking as asking for favors. Think of it as building two-way relationships. Give first, ask later.</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Bridge your skill gaps, but be smart about it.</h4>
                <p className="text-muted-foreground">You don't need every item on the job description. From my experience screening resumes, a 60-70% match is often enough if you can tell a good story about the gaps. Focus on the skills that are most critical for the role, hardest to learn on the job, and most valued in your target market.</p>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-2">Make yourself discoverable.</h4>
                <p className="text-muted-foreground">Don't define yourself by your current job title. Define yourself by the problems you solve. "I'm working on user acquisition strategies for SaaS products" beats "I'm a marketing manager looking to pivot."</p>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Recruiter reality check:</strong> The "spray and resume" approach — applying to 100 jobs — rarely works for career pivoters. Targeted visibility works better. Be known by 10 people in your target field who can vouch for you. That's more powerful than 100 cold applications.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Action steps for Stage 2:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Find 5 people already working in your target field, ask for 20-minute coffee chats</li>
                  <li>List the top 3 skills your target role requires that you don't have yet</li>
                  <li>Pick ONE skill gap to start closing this month (online course, side project, or training)</li>
                  <li>Update your LinkedIn profile to describe problems you solve, not just titles you've held</li>
                  <li>Tell 3 trusted people in your network what you're exploring, let them help connect dots</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 3: Pilot */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">Stage 3: Pilot — Test Before You Commit</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              This is the most important stage, and the one most people skip entirely. Instead of making one big leap, run small experiments to gather real-world data.
            </p>
            <p className="text-muted-foreground mb-6">
              People quit their jobs to "pursue their dreams," then discover they hate the reality of that dream. Pilots prevent this expensive mistake.
            </p>

            <div className="space-y-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="font-medium text-foreground mb-2">A strong pilot is:</p>
                <ul className="text-muted-foreground space-y-1">
                  <li>• Low risk (can be done while employed)</li>
                  <li>• Low cost (minimal financial investment)</li>
                  <li>• Reversible (if it doesn't work)</li>
                  <li>• Provides real data (not just theory)</li>
                </ul>
              </div>

              <div>
                <h4 className="font-semibold text-foreground mb-3">Examples of pilots:</h4>
                <ul className="space-y-2 text-muted-foreground">
                  <li>• <strong>Freelance project in your target industry</strong> — tests: can you do the work? Do you enjoy it?</li>
                  <li>• <strong>Side project on weekends</strong> — tests: genuine interest, skill level, market demand</li>
                  <li>• <strong>Consulting for 1-2 clients while employed</strong> — tests: business viability</li>
                  <li>• <strong>Teaching a workshop</strong> — tests: expertise, interest in education</li>
                  <li>• <strong>Volunteering in the new field</strong> — tests: culture, day-to-day reality</li>
                </ul>
              </div>

              <p className="text-muted-foreground">
                <strong>Aim for quantity.</strong> Run 5-10 small experiments, not 1 perfect test. If you're testing freelance writing, don't pitch one article and quit. Pitch 20, complete 5, join 2 communities, interview 3 full-time writers. Aggregate the data before deciding.
              </p>

              <div>
                <h4 className="font-semibold text-foreground mb-3">After each pilot, ask three questions:</h4>
                <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                  <li><strong>What worked?</strong> (What energized me? What feedback did I get?)</li>
                  <li><strong>What didn't?</strong> (What drained me? What was harder than expected?)</li>
                  <li><strong>What's next?</strong> (Continue? Try a variation? Run a different experiment?)</li>
                </ol>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-muted-foreground">
                  <strong className="text-foreground">Recruiter reality check:</strong> When I review resumes from career pivoters, I look for proof of pilots. Someone going from consulting to product management should have product side projects, experience with product teams, or evidence of product thinking. Without pilots, you're asking employers to take a bigger risk on you. With pilots, you have proof.
                </p>
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-foreground font-medium">
                  The golden rule: if you hate the pilot, you'll hate the pivot. Better to find out now while you still have your job and income.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Action steps for Stage 3:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Design your first pilot — what's the smallest experiment you can run this week?</li>
                  <li>Set a goal: run at least 3 pilots within the next 2 months</li>
                  <li>After each pilot, write down what you learned in 3 sentences</li>
                  <li>Talk to 3 people already doing your target job — compare their reality to your expectations</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 4: Launch */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-orange-100 flex items-center justify-center">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">Stage 4: Launch — Make the Move</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Launch is not about courage. Blake's key insight: <strong>build first, courage second.</strong>
            </p>
            <p className="text-muted-foreground mb-6">
              When you've done Plant, Scan, and Pilot properly, the launch becomes less scary because it's data-driven, not fear-driven.
            </p>

            <div className="space-y-6">
              <div>
                <h4 className="font-semibold text-foreground mb-4">Define your launch criteria.</h4>
                <p className="text-muted-foreground mb-4">These are specific conditions that must be true before you make your move. Write them down. Be honest with yourself.</p>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">Financial criteria:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ Emergency fund of ___ months saved</li>
                      <li>☐ Side income of $___ established (if applicable)</li>
                      <li>☐ Major debt reduced to manageable level</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">Professional criteria:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ ___ paying clients lined up / job offer secured</li>
                      <li>☐ Key certifications or skills acquired</li>
                      <li>☐ Portfolio with ___ strong examples</li>
                    </ul>
                  </div>
                  <div className="bg-muted/30 rounded-lg p-4">
                    <h5 className="font-medium text-foreground mb-3">Personal criteria:</h5>
                    <ul className="space-y-2 text-sm text-muted-foreground">
                      <li>☐ Partner/family supportive of the change</li>
                      <li>☐ Living situation stable</li>
                      <li>☐ Mental and physical health in a good place</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-foreground">
                  <strong>Don't wait for perfect conditions.</strong> There's no perfect time to make a career change. Launch when your criteria are met, even if you're still scared. Fear is normal. Paralysis is optional.
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-5 mt-6">
                <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  Action steps for Stage 4:
                </h4>
                <ol className="list-decimal list-inside space-y-2 text-green-700">
                  <li>Write your launch criteria checklist — be specific and measurable</li>
                  <li>For each criterion, identify what's already met vs. what still needs work</li>
                  <li>Set a deadline: "I will make a decision by [date]"</li>
                  <li>Prepare your transition conversations (boss, family) — make the decision first, plan the conversations second</li>
                </ol>
              </div>
            </div>
          </div>

          {/* Stage 5: Lead */}
          <div className="mb-12 bg-card border border-border rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-2xl text-foreground">Stage 5: Lead — Help Others Pivot</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Once you've pivoted successfully, share what you learned. Help others through their transitions. Make introductions. Review resumes. Celebrate other people's career wins.
            </p>
            <p className="text-muted-foreground mb-6">
              Career karma is real. The more you help others pivot successfully, the more support you'll have when you need your next one.
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-5">
              <h4 className="font-semibold text-green-800 mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" />
                Action steps for Stage 5:
              </h4>
              <ol className="list-decimal list-inside space-y-2 text-green-700">
                <li>Share your pivot story with at least one person who's considering a similar move</li>
                <li>Offer to review a resume or do a mock interview for someone in transition</li>
                <li>Connect two people in your network who could help each other</li>
              </ol>
            </div>
          </div>
        </section>

        {/* The 5 Mistakes */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">The 5 Mistakes I See Every Week</h2>
          
          <div className="space-y-4">
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">1. Quitting before testing.</h3>
              <p className="text-red-700">Always pilot first. The reality of a career rarely matches the idea of it. Gather data while you're still employed and have income.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">2. Starting from scratch.</h3>
              <p className="text-red-700">You don't need a completely new identity. Find the adjacent move — one step from where you are now. Leverage what you already have. Consultant → internal strategy. Engineer → product management. Teacher → corporate training.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">3. Analysis paralysis.</h3>
              <p className="text-red-700">At some point, more research doesn't help — you need experience. Set a decision deadline. 20 informational interviews teach you less than one freelance project actually doing the work.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">4. No financial runway.</h3>
              <p className="text-red-700">Desperation kills negotiations. It's obvious in how quickly candidates accept offers, how little they negotiate, how they frame questions. Save 3-6 months expenses before any major launch.</p>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-xl p-6">
              <h3 className="font-semibold text-red-800 mb-2">5. Skipping the network.</h3>
              <p className="text-red-700">Applying to 100 jobs online without talking to a single person in the target field is the slowest path to a career change. Most jobs are filled through connections. Your resume matters less than who's championing you internally.</p>
            </div>
          </div>
        </section>

        {/* Start Here */}
        <section className="mb-16">
          <h2 className="font-heading text-3xl md:text-4xl text-foreground mb-6">Start Here</h2>
          
          <div className="grid gap-4">
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Target className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">If you're employed and uncertain →</p>
                <p className="text-muted-foreground">Start with Plant. Clarify your compass and 1-year vision.</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Users className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">If you know where you want to go →</p>
                <p className="text-muted-foreground">Move to Scan. Build your network and bridge skill gaps.</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Lightbulb className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">If you've done your research →</p>
                <p className="text-muted-foreground">Run Pilots. Test your assumptions with real experiments.</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Rocket className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">If you've tested and validated →</p>
                <p className="text-muted-foreground">Check your Launch criteria. Set a decision deadline.</p>
              </div>
            </div>
            
            <div className="bg-card border border-border rounded-xl p-5 flex items-start gap-4">
              <Crown className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
              <div>
                <p className="font-medium text-foreground">If you've already pivoted →</p>
                <p className="text-muted-foreground">Lead. Help others through their transitions.</p>
              </div>
            </div>
          </div>

          <div className="mt-8 text-center">
            <p className="text-2xl font-heading text-foreground mb-8">
              The only move that matters is your next one.
            </p>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-[#1B3A2F] rounded-2xl p-8 md:p-12 text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
            Get the Full Guide
          </h2>
          <p className="text-cream/80 mb-6 max-w-2xl mx-auto">
            Download the complete guide with exercises, detailed examples, and visual frameworks.
          </p>
          <Button asChild size="lg" className="btn-gold">
            <a href="/downloads/The_Pivot_Method_Mini_Guide.pdf" download>
              <Download className="w-5 h-5 mr-2" />
              Download PDF Guide
            </a>
          </Button>
        </section>

        <GuideShareButtons />

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-border text-center text-muted-foreground">
          <p className="mb-2">
            James Bugden • Senior Recruiter @ Uber Taiwan
          </p>
          <p className="text-sm">
            Based on "Pivot: The Only Move That Matters Is Your Next One" by Jenny Blake. All framework concepts and methodology credit goes to Jenny Blake.
          </p>
        </footer>
      </main>
    </div>
  );
};

export default PivotMethodMiniGuide;
