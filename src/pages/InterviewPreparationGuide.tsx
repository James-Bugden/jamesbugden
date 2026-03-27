import { ArrowLeft, Target, Lightbulb, MessageSquare, AlertTriangle, CheckCircle2, Calendar, HelpCircle, BookOpen, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import GuideShareButtons from "@/components/GuideShareButtons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const InterviewPreparationGuide = () => {
  useTrackGuideProgress("interview-full");


  return (
      <div className="min-h-screen bg-background">
        <SEO schemaJson={guideSchema({ path: "/interview-preparation-guide", title: "Interview Preparation Guide | Deep Dive", description: "Comprehensive interview prep covering behavioral, case, and technical rounds plus salary discussions." })} />
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <Link to="/" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            Full Interview Preparation Guide
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Stop Stressing. Start Performing. Get the Job.
          </p>
          <p className="text-base text-cream/60 mb-2">
            By James Bugden, Senior Recruiter at Uber
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">45 min read</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            Framework Attribution: This guide is based on Sam Owens' "I Hate Job Interviews: Stop Stressing. Start Performing. Get the Job You Want" methodology, adapted with my insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Why Most People Fail Interviews
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            I've been on both sides of the table.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            I bombed interviews early in my career. Now I've hired 500+ people as a recruiter.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            Here's what I learned: <span className="text-gold font-semibold">The best candidate doesn't get the job. The best person at interviewing gets the job.</span>
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            Good news for you.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            You can beat more qualified candidates if you prepare better. Most people don't prepare enough.
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            They prepare 1-2 hours for an interview, prepare the wrong things, and wonder why they didn't get an offer.
          </p>
          <p className="text-xl md:text-2xl font-heading text-gold">
            Interviewing is a skill. You can learn it. This guide shows you how.
          </p>
        </div>
      </section>

      {/* Kill These Lies */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Kill These Lies First
          </h2>
          <p className="text-base md:text-lg text-muted-foreground mb-6">
            Let's destroy the myths keeping you from interview success.
          </p>
          
          <div className="space-y-6">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">"Just be yourself"</p>
              <p className="text-muted-foreground">
                Which self? The one that binge-watched Netflix all weekend? You have multiple selves. Be your best prepared self.
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">"I can't prepare without knowing the questions"</p>
              <p className="text-muted-foreground">
                Wrong. There are 5 main question types. You can prepare for all of them.
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">"Interviewers are experts"</p>
              <p className="text-muted-foreground">
                Most hiring managers get zero training. They're winging it too. Also, most don't do any preparation for the interview beyond looking at your resume.
              </p>
            </div>
            
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="font-semibold text-foreground mb-2">"I lost because someone was more qualified"</p>
              <p className="text-muted-foreground">
                Yes, this happens. We can't change how qualified you are compared to others but we can prepare the best we can for the highest chance of success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 10-Hour Framework Overview */}
      <section className="py-8 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
            The 10-Hour Prep Framework
          </h2>
          <p className="text-cream/80 mb-4">
            Most candidates spend 1 hour preparing. You're about to spend 10 hours. That's your advantage.
          </p>
        </div>
      </section>

      {/* Framework Breakdown */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Target className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">Research</h3>
              <p className="text-gold font-semibold mb-3">3 Hours</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1 hour: Company basics</li>
                <li>• 2 hours: Informational interviews with employees</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <Lightbulb className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">Formulation</h3>
              <p className="text-gold font-semibold mb-3">3 Hours</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1 hour: Create 7-10 power examples</li>
                <li>• 2 hours: Build frameworks for different question types</li>
              </ul>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-6 text-center">
              <MessageSquare className="w-8 h-8 text-gold mx-auto mb-3" />
              <h3 className="font-heading text-xl text-foreground mb-2">Practice</h3>
              <p className="text-gold font-semibold mb-3">4 Hours</p>
              <ul className="text-sm text-muted-foreground text-left space-y-1">
                <li>• 1-2 hours: Practice out loud alone</li>
                <li>• 2 hours: Mock interviews with feedback</li>
              </ul>
            </div>
          </div>
          
          <p className="text-center text-foreground">
            10 hours for a job you'll spend 40+ hours/week at for years? <span className="text-gold font-semibold">Yes, I know it's hard but do it.</span>
          </p>
        </div>
      </section>

      {/* Part 1: Research Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Part 1: The Research Phase</h2>
            </div>
          </div>

          {/* Company Research */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Company Research</span> (1 Hour)
            </h3>
            <p className="text-foreground mb-4">Before you walk in, you need to know:</p>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>Company history:</strong> Where they've been, where they're going</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>Mission and values:</strong> These will come up in your answers</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>Financials:</strong> Revenue, profits, growth trajectory (basics only unless it's a finance role)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>Products/services:</strong> Actually use the product if you can</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground"><strong>Current news:</strong> What's happening with them right now?</span>
              </li>
            </ul>
            <p className="text-muted-foreground italic">
              Most of this is on their website, Wikipedia, or recent news articles.
            </p>
          </div>

          {/* Inside Information */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Inside Information</span> (2 Hours) - Your Secret Weapon
            </h3>
            <p className="text-foreground mb-4">
              This separates good candidates from great ones. <span className="font-semibold text-gold">Talk to people who actually work there.</span>
            </p>
            
            <h4 className="font-semibold text-foreground mb-3">You'll get:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Real insights Google can't give you</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Names to drop in interviews (have people inside the company advocate for you)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Problems the team is actually facing</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Insider language (the jargon they use in the company shows you understand them)</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">How to get these conversations:</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>Search LinkedIn for 1st/2nd degree connections</li>
              <li>Message: "Hey [name], interviewing for [role] at [company]. Can I grab 15 minutes of your time?"</li>
              <li>Ask good questions (below)</li>
              <li>Take notes</li>
              <li>Send thanks</li>
            </ol>

            <p className="text-muted-foreground mb-4 italic">
              Note: If you know someone who works in the company or a friend of a friend, talk to them this way.
            </p>

            <h4 className="font-semibold text-foreground mb-3">What to ask:</h4>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What's the culture really like?</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What does success look like in this role?</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What challenges is the team facing?</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What do you wish you knew before starting?</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What advice for someone interviewing?</span>
              </li>
            </ul>

            <p className="text-muted-foreground italic">
              Do 2-3 of these. Will you get rejected a lot? Yes. But you only need to talk to one person to get insider information.
            </p>
          </div>
        </div>
      </section>

      {/* Part 2: Formulation Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Part 2: The Formulation Phase</h2>
            </div>
          </div>

          {/* Power Examples */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4">
              Create Your Power Examples (7-10 Stories)
            </h3>
            <p className="text-foreground mb-4">
              Power examples = stories that prove you can do the job. They're your foundation for every answer.
            </p>

            <h4 className="font-semibold text-foreground mb-3">How to pick them:</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>Read job description</li>
              <li>Find top 7-10 skills they want</li>
              <li>Match one story to each skill</li>
            </ol>

            <h4 className="font-semibold text-foreground mb-3">Where stories come from:</h4>
            <ul className="space-y-2 mb-6 text-foreground">
              <li>• Previous jobs (best)</li>
              <li>• School projects</li>
              <li>• Volunteer work</li>
              <li>• Side projects</li>
              <li>• Anywhere you've done relevant work</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">Good power examples are:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Specific ("March 2024, led team of 5" not "I often worked with teams")</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Quantified (numbers, metrics, outcomes)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">Recent (last 2-3 years)</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green flex-shrink-0 mt-0.5" />
                <span className="text-foreground">About YOU (not just "the team")</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">Bad power examples:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">"I'm a good communicator"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">"We increased sales" (who's we?)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-destructive text-xl">✕</span>
                <span className="text-foreground">Vague, no numbers, no specifics</span>
              </li>
            </ul>
          </div>

          {/* Example Power Stories */}
          <div className="space-y-6 mb-10">
            <h4 className="font-heading text-lg text-gold">Example Power Stories</h4>
            
            {/* Story 1 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">Power Story #1: Leadership</h5>
              <p className="text-sm text-muted-foreground mb-3">Skill: Team leadership and project management</p>
              <p className="text-foreground text-sm mb-3">
                "In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch a new mobile app feature. We had a tight 6-week deadline. I organized daily standups, created a shared project tracker, and assigned clear ownership for each milestone.
              </p>
              <p className="text-foreground text-sm mb-3">
                When we hit a technical blocker in week 4, I reprioritized tasks and brought in a senior engineer to unblock us. We launched on time, and the feature drove a 35% increase in user engagement within the first month."
              </p>
              <p className="text-gold text-sm italic">Why it works: Specific timeline, clear numbers, shows leadership actions, quantified result.</p>
            </div>

            {/* Story 2 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">Power Story #2: Problem-Solving</h5>
              <p className="text-sm text-muted-foreground mb-3">Skill: Analytical thinking and data analysis</p>
              <p className="text-foreground text-sm mb-3">
                "At my last company, our customer support costs increased 40% year-over-year, but nobody knew why. I pulled 6 months of ticket data and discovered that 60% of tickets were about the same 3 issues.
              </p>
              <p className="text-foreground text-sm mb-3">
                I created a simple knowledge base with solutions to those 3 problems and added links to our product interface. Within 3 months, support tickets dropped 28%, saving the company approximately $45K annually. The knowledge base is still being used today."
              </p>
              <p className="text-gold text-sm italic">Why it works: Identified specific problem, shows analytical approach, concrete financial impact, lasting solution.</p>
            </div>

            {/* Story 3 */}
            <div className="bg-card border border-border rounded-lg p-6">
              <h5 className="font-semibold text-foreground mb-2">Power Story #3: Communication/Stakeholder Management</h5>
              <p className="text-sm text-muted-foreground mb-3">Skill: Working with difficult stakeholders</p>
              <p className="text-foreground text-sm mb-3">
                "I was managing a marketing campaign when our biggest client suddenly demanded we change the entire creative direction 1 week before launch. The design team was frustrated because they'd already completed the work.
              </p>
              <p className="text-foreground text-sm mb-3">
                Instead of pushing back immediately, I scheduled a call with the client to understand their concerns. I discovered they'd received negative feedback from their CEO. I worked with our team to create 3 new options that addressed the CEO's feedback while keeping 70% of our original work.
              </p>
              <p className="text-foreground text-sm mb-3">
                We presented all options, the client chose one, and we delivered on time. They increased their contract value by 30% the following quarter."
              </p>
              <p className="text-gold text-sm italic">Why it works: Shows diplomacy, problem-solving under pressure, specific actions taken, business outcome.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 3: Question Frameworks */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Part 3: Question Frameworks
          </h2>
          <p className="text-foreground mb-6">
            Now that you have your power examples, let's learn how to deploy them for different question types.
          </p>

          <div className="bg-background border border-border rounded-lg p-5 mb-8">
            <h4 className="font-semibold text-foreground mb-3">How many examples should you prepare?</h4>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>Behavioral questions (SPAR):</strong> Prepare 7-10 stories (your power examples)</li>
              <li>• <strong>Scenario questions (Home Base):</strong> Practice 5-7 different frameworks/approaches</li>
              <li>• <strong>About You questions (SEE):</strong> You'll reuse your behavioral stories, just reframe them</li>
            </ul>
            <p className="text-gold mt-4 font-semibold">
              The beauty of this system: You don't need 50 different stories. Your 7-10 power examples can answer most questions.
            </p>
          </div>

          {/* Framework 1: SPAR */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              Framework #1: SPAR Model (For Behavioral Questions)
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              Behavioral questions ask about your past experiences: "Tell me about a time when...", "Give me an example of...", "Describe a situation where..."
            </p>
            <p className="text-foreground mb-4">Use SPAR: <strong>Situation, Problem, Action, Result</strong></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">S</span>
                <span className="text-foreground"><strong>Situation</strong> (10-15 seconds): Set the scene. Keep it brief. Don't waste time here.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">P</span>
                <span className="text-foreground"><strong>Problem</strong> (15-20 seconds): Create tension. This is what makes people want to keep listening.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">A</span>
                <span className="text-foreground"><strong>Action</strong> (60-90 seconds): This is the meat. Explain what YOU did (not your team). Use the "rule of three" - break your action into 3 steps.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">R</span>
                <span className="text-foreground"><strong>Result</strong> (15-20 seconds): Quantify the outcome. Tie it in a bow.</span>
              </li>
            </ul>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p className="text-sm text-muted-foreground italic mb-2">Question: "Tell me about a time you solved a complex problem."</p>
              <p className="text-foreground text-sm mb-2">
                <strong>Situation:</strong> "Last year at my previous company, I was the account manager for our digital marketing clients."
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>Problem:</strong> "A few months in, my boss asked me to figure out which clients were most valuable to us. We'd never done this before, and there was no clear definition of 'value.'"
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>Action:</strong> "I approached this in three steps. First, I created a scorecard with three metrics: revenue, profitability, and credibility score. Second, I calculated hours spent per client and created efficiency ratios. Third, I presented my findings to leadership with recommendations."
              </p>
              <p className="text-foreground text-sm">
                <strong>Result:</strong> "We shifted strategy to focus on our highest-impact clients. Six months later, we grew revenue from those clients by 25%, which was a major contribution to the firm's growth that year."
              </p>
            </div>
          </div>

          {/* Framework 2: Home Base */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              Framework #2: Home Base Model (For Scenario Questions)
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              Scenario questions are hypothetical: "How would you approach...?", "What would you do if...?", "How would you handle...?"
            </p>
            <p className="text-foreground mb-4">These are the hardest questions because they're wide open.</p>
            <p className="text-foreground mb-4">Use the Home Base model: <strong>Establish, Explore, Summarize</strong></p>

            <div className="bg-card border border-border rounded p-6 mb-6">
              <p className="text-sm text-muted-foreground mb-4 font-medium text-center">
                Visual Guide: The Home Base Model
              </p>
              
              {/* Visual Diagram */}
              <div className="flex flex-col items-center py-4">
                {/* PATH 1 - Top */}
                <div className="flex flex-col items-center mb-2">
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">PATH 1</p>
                    <p className="text-muted-foreground text-xs">(Specific idea)</p>
                  </div>
                </div>
                
                {/* Vertical connector */}
                <div className="w-0.5 h-6 bg-gold/40"></div>
                
                {/* Middle row: PATH 2 - HOME BASE - PATH 3 */}
                <div className="flex items-center justify-center gap-0 w-full max-w-lg">
                  {/* PATH 2 */}
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">PATH 2</p>
                    <p className="text-muted-foreground text-xs">(Specific idea)</p>
                  </div>
                  
                  {/* Horizontal connector left */}
                  <div className="h-0.5 w-8 md:w-12 bg-gold/40"></div>
                  
                  {/* HOME BASE - Center */}
                  <div className="bg-executive-green border-2 border-gold rounded-lg px-5 py-3 text-center shadow-lg">
                    <p className="text-gold font-bold text-base">HOME BASE</p>
                    <p className="text-cream/80 text-xs">(Foundation)</p>
                  </div>
                  
                  {/* Horizontal connector right */}
                  <div className="h-0.5 w-8 md:w-12 bg-gold/40"></div>
                  
                  {/* PATH 3 */}
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">PATH 3</p>
                    <p className="text-muted-foreground text-xs">(Specific idea)</p>
                  </div>
                </div>
                
                {/* Vertical connector */}
                <div className="w-0.5 h-6 bg-gold/40"></div>
                
                {/* PATH 4 - Bottom */}
                <div className="flex flex-col items-center mt-2">
                  <div className="bg-gold/20 border border-gold/40 rounded-lg px-4 py-2 text-center">
                    <p className="text-gold font-semibold text-sm">PATH 4</p>
                    <p className="text-muted-foreground text-xs">(Specific idea)</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-foreground text-center mt-4">
                Think of it like a hub-and-spoke: <span className="text-gold font-semibold">HOME BASE</span> = Your central framework/approach, <span className="text-gold font-semibold">PATHS</span> = Specific ideas that branch out from your framework
              </p>
            </div>

            <div className="space-y-4 mb-6">
              <div>
                <p className="font-semibold text-foreground mb-2">Step 1: Establish Your Home Base (20-30 seconds)</p>
                <p className="text-foreground mb-2">Start with a framework or approach. This is your "map."</p>
                <ul className="text-foreground text-sm ml-4">
                  <li>• "I'd approach this in three phases..."</li>
                  <li>• "There are four key areas I'd look at..."</li>
                  <li>• "My process would involve three steps..."</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-foreground">Step 2: Explore Each Path (60-90 seconds each)</p>
                <p className="text-foreground">Go through each part of your framework. Add details. Show your thinking.</p>
              </div>
              <div>
                <p className="font-semibold text-foreground">Step 3: Summarize (15-20 seconds)</p>
                <p className="text-foreground">Tie it together. Restate your framework.</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p className="text-sm text-muted-foreground italic mb-2">Question: "How would you approach your first 90 days in this role?"</p>
              <p className="text-foreground text-sm mb-2">
                <strong>Establish:</strong> "I'd break my first 90 days into three phases: Learn, Contribute, and Scale."
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>Explore:</strong> "In the Learn phase (first 30 days), I'd meet with key stakeholders, understand current processes, and identify quick wins. In the Contribute phase (days 31-60), I'd execute on those quick wins to build credibility and start taking on bigger projects. In the Scale phase (days 61-90), I'd start implementing larger initiatives and thinking about long-term strategy."
              </p>
              <p className="text-foreground text-sm">
                <strong>Summarize:</strong> "So in summary: Learn, Contribute, Scale. That's how I'd structure my first quarter."
              </p>
            </div>
          </div>

          {/* Framework 3: SEE */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
              Framework #3: SEE Model (For "About You" Questions)
            </h4>
            <p className="text-muted-foreground mb-4 italic">
              These questions ask about your qualities: "What's your biggest weakness?", "Why should we hire you?", "What's your work style?"
            </p>
            <p className="text-foreground mb-4">Use SEE: <strong>Statement, Example, Effect</strong></p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">S</span>
                <span className="text-foreground"><strong>Statement:</strong> Say it directly. No hedging.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">E</span>
                <span className="text-foreground"><strong>Example:</strong> Give a specific instance.</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold text-gold min-w-[24px]">E</span>
                <span className="text-foreground"><strong>Effect:</strong> Explain why this matters for the role.</span>
              </li>
            </ul>

            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p className="text-sm text-muted-foreground italic mb-2">Question: "What's your biggest weakness?"</p>
              <p className="text-foreground text-sm mb-2">
                <strong>Statement:</strong> "I tend to take on too much because I have a hard time saying no."
              </p>
              <p className="text-foreground text-sm mb-2">
                <strong>Example:</strong> "Last quarter, I agreed to three major projects simultaneously and ended up working late nights to meet all the deadlines."
              </p>
              <p className="text-foreground text-sm">
                <strong>Effect:</strong> "I've learned to be more strategic about what I commit to. Now I evaluate new requests against my current workload and the impact of the work. For this role, that means I'll be focused on the highest-impact projects rather than spreading myself too thin."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 4: Handling Difficult Questions */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <HelpCircle className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Part 4: Handling Difficult Questions</h2>
          </div>

          {/* Weakness Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">Weakness Questions</h3>
            <p className="text-foreground mb-4">
              Don't say "I'm a perfectionist" or "I work too hard."
            </p>
            <p className="text-foreground mb-4">Pick a real weakness that:</p>
            <ol className="list-decimal list-inside text-foreground mb-4 space-y-1">
              <li>Won't disqualify you</li>
              <li>You're actively fixing</li>
              <li>Shows self-awareness</li>
            </ol>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-muted-foreground mb-2">Template:</p>
              <p className="text-foreground italic mb-3">
                "I [weakness], which led to [consequence]. I'm fixing this by [action]. I've already seen [progress]."
              </p>
              <p className="text-sm text-muted-foreground mb-2">Example:</p>
              <p className="text-foreground text-sm">
                "I tend to take on too much at once, which led to me missing a deadline last quarter. Now I evaluate new requests against my current workload before committing. Last month I completed three major projects ahead of schedule."
              </p>
            </div>
          </div>

          {/* Salary Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">Salary Questions</h3>
            <div className="space-y-4">
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="font-semibold text-foreground mb-2">If they ask first:</p>
                <p className="text-foreground">
                  "I'm looking for competitive compensation for this role and market. What's the range you have budgeted?"
                </p>
              </div>
              <div className="bg-card border border-border rounded-lg p-5">
                <p className="font-semibold text-foreground mb-2">If you must give a number:</p>
                <p className="text-foreground">
                  Give a range based on market research, and say "depending on the full compensation package."
                </p>
              </div>
            </div>
          </div>

          {/* Gap Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">Gap Questions</h3>
            <p className="text-foreground mb-4">Be honest but brief. Don't over-explain.</p>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-foreground italic">
                "I took time off to [reason]. During that time I [stayed sharp by...]. Now I'm ready to jump back in."
              </p>
            </div>
          </div>

          {/* Illegal/Inappropriate Questions */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-gold mb-4">Illegal/Inappropriate Questions</h3>
            <p className="text-foreground mb-4">
              Some interviewers ask illegal stuff (age, marital status, religion, etc.). Options:
            </p>
            <ol className="list-decimal list-inside text-foreground space-y-2">
              <li><strong>Redirect:</strong> "Is there a specific concern about how this relates to the role?"</li>
              <li><strong>Politely decline:</strong> "I'd prefer to focus on my qualifications for the position."</li>
              <li><strong>Just answer</strong> if it's harmless and you don't care</li>
            </ol>
          </div>

          {/* Weird Questions */}
          <div>
            <h3 className="font-heading text-xl text-gold mb-4">Weird Questions</h3>
            <p className="text-foreground mb-4">
              Some interviewers ask wacky stuff ("If you were an animal..."). They want to see how you think.
            </p>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-sm text-muted-foreground mb-2">Template: Answer + "because" + (optional) tie back to job</p>
              <p className="text-foreground italic">
                "I'd be a golden retriever because I'm eager to please and work well with others. That's how I approach teamwork at work too."
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 5: Your Questions to Ask */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Part 5: Your Questions to Ask
          </h2>
          <p className="text-foreground mb-6">
            Always have 3-5 questions ready. This is your chance to interview THEM.
          </p>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Questions that make you look good:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What does success look like in this role in the first 6 months?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What are the biggest challenges facing the team right now?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"How would you describe the culture here?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What do you like most about working here?"</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">"What's your management style?" (if asking the hiring manager)</span>
                </li>
              </ul>
            </div>

            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-destructive mb-4">Questions NOT to ask:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">Anything you could Google (shows you didn't prepare)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">"What does this company do?" (seriously, don't)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-destructive text-xl">✕</span>
                  <span className="text-foreground text-sm">Only questions about benefits/vacation (looks like you only care about perks)</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Part 6: The Practice Phase */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Part 6: The Practice Phase</h2>
            </div>
          </div>

          <p className="text-xl text-gold font-semibold mb-6">
            This is where 90% of candidates quit. Don't be them.
          </p>

          {/* Phase 1 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">Phase 1:</span> Read-Through (30-60 min)
            </h3>
            <p className="text-foreground mb-2">Say your answers out loud.</p>
            <p className="text-muted-foreground italic">You'll hear what's awkward. Fix it now.</p>
          </div>

          {/* Phase 2 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">Phase 2:</span> Memorize (60-90 min)
            </h3>
            <p className="text-foreground">Learn your frameworks and stories.</p>
          </div>

          {/* Phase 3 */}
          <div className="mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">
              <span className="text-gold">Phase 3:</span> Mock Interviews (2-3 hours)
            </h3>
            <p className="text-gold font-semibold mb-4">This is the most important part.</p>
            <p className="text-foreground mb-4">Get someone to interview you. Can be:</p>
            <ul className="text-foreground mb-6 space-y-1">
              <li>• Friend</li>
              <li>• Colleague</li>
              <li>• Career coach (best)</li>
              <li>• Your spouse</li>
              <li>• AI</li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">Mock interview rules:</h4>
            <ol className="list-decimal list-inside text-foreground space-y-2 mb-6">
              <li>Treat it like it's real</li>
              <li>No stopping mid-answer</li>
              <li>Feedback at the END only</li>
              <li>Do 2 minimum</li>
            </ol>

            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-gold font-semibold mb-2">Why practice works:</p>
              <p className="text-foreground">
                It reveals your weaknesses before they cost you the job. That awkward pause? Fix it now, not in the real interview. Most candidates skip this. That's your advantage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Part 7: Interview Day */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Part 7: Interview Day</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Before the Interview</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Get there 10-15 minutes early (no more, no less)</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Turn off your phone</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Use the bathroom</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Review your power examples one last time</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Take 3 deep breaths: breathe in 1 second, breathe out 4 seconds, repeat</span>
                </li>
              </ul>
            </div>

            {/* During */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">During the Interview</h3>
              <p className="text-sm font-semibold text-foreground mb-2">First impression tips:</p>
              <ul className="space-y-2 mb-4 text-sm text-foreground">
                <li>• Strong handshake</li>
                <li>• Eye contact</li>
                <li>• Smile</li>
                <li>• Mirror their energy level</li>
              </ul>
              <p className="text-sm font-semibold text-foreground mb-2">During questions:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Pause 2-4 seconds before answering (shows you're thinking)</li>
                <li>• If you don't understand, ask them to clarify</li>
                <li>• It's ok to say "That's a great question, let me think for a second"</li>
                <li>• Watch for engagement cues (nodding, leaning in)</li>
              </ul>
            </div>
          </div>

          {/* Body Language */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">Body Language</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>Sit up straight</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>Don't cross your arms</span>
                </li>
              </ul>
              <ul className="space-y-2 text-foreground">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>Use hand gestures naturally</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span>Maintain eye contact 70-80% of the time</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Closing */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">Closing</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Ask your questions</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Restate your interest: "I'm very interested in this role and would love to move forward"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Ask about next steps</span>
              </li>
            </ul>
          </div>

          {/* After */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-heading text-xl text-gold mb-4">After the Interview</h3>
            <p className="text-foreground mb-4">Send a thank you email within 24 hours.</p>
            <div className="bg-card border border-border rounded p-4">
              <p className="text-sm text-muted-foreground mb-2">Template:</p>
              <p className="text-foreground text-sm mb-2">Hi [Name],</p>
              <p className="text-foreground text-sm mb-2">
                Thank you for taking the time to speak with me today about the [role] position.
              </p>
              <p className="text-foreground text-sm mb-2">
                I really enjoyed learning about [specific thing they mentioned] and I'm excited about the opportunity to [specific contribution you'd make].
              </p>
              <p className="text-foreground text-sm mb-2">[Optional: Reference to something personal you connected on]</p>
              <p className="text-foreground text-sm mb-2">I look forward to hearing about next steps.</p>
              <p className="text-foreground text-sm">Best,<br />[Your name]</p>
            </div>
          </div>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-destructive/20 flex items-center justify-center">
              <AlertTriangle className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Common Mistakes That Kill Offers
            </h2>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Talking too much</strong> - Answer the question. Then stop.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Trashing previous employers</strong> - Stay diplomatic.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No specific examples</strong> - Everything needs details.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Not asking questions</strong> - Shows you don't care.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No follow-up</strong> - Send that thank you email.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Lying</strong> - They'll find out. Don't.</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Showing up unprepared</strong> - If you don't care to prep, they won't care to hire.</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Quick Reference Cheat Sheet */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BookOpen className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Quick Reference Cheat Sheet</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Pre-Interview */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Pre-Interview Checklist</h3>
              <InteractiveChecklist
                guideKey="interview_prep_pre_en"
                items={[
                  { label: "Research company (1 hour)" },
                  { label: "Informational interviews (2 hours)" },
                  { label: "Create 7-10 power examples (1 hour)" },
                  { label: "Prepare SPAR stories (1 hour)" },
                  { label: "Prepare scenario frameworks (1 hour)" },
                  { label: "Practice out loud (1 hour)" },
                  { label: "Mock interview #1 (1 hour)" },
                  { label: "Mock interview #2 (1 hour)" },
                  { label: "Prepare questions to ask (30 min)" },
                  { label: "Plan outfit (15 min)" },
                ]}
              />
            </div>

            {/* Day-Of */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Day-Of Checklist</h3>
              <InteractiveChecklist
                guideKey="interview_prep_dayof_en"
                items={[
                  { label: "Review power examples" },
                  { label: "Arrive 10-15 min early" },
                  { label: "Phone on silent" },
                  { label: "Bring printed resume" },
                  { label: "Bring notebook" },
                  { label: "Smile and make eye contact" },
                ]}
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Online Interviews */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Online Interviews</h3>
              <InteractiveChecklist
                guideKey="interview_prep_online_en"
                items={[
                  { label: "Test your internet connection" },
                  { label: "Audio" },
                  { label: "Video" },
                  { label: "No clutter in the background" },
                  { label: "Make sure you are in a quiet place" },
                  { label: "The camera should be level with your face" },
                ]}
              />
            </div>

            {/* Post-Interview */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Post-Interview Checklist</h3>
              <InteractiveChecklist
                guideKey="interview_prep_post_en"
                items={[
                  { label: "Send thank you email within 24 hours" },
                  { label: "Note what went well/needs improvement" },
                  { label: "Follow up if no response by their timeline" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final Thoughts */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-6">
            Final Thoughts
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            I've seen incredibly talented people bomb interviews. Many times it's because they haven't prepared or didn't have feedback on how to act in interviews.
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            I've seen average candidates get offers. They showed up ready.
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            Interviewing is a skill. Practice makes you better.
          </p>
          <p className="text-xl md:text-2xl text-gold font-heading">
            Use this guide. Do the 10 hours. Watch your interview performance transform.
          </p>
        </div>
      </section>

      {/* Book Attribution */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground italic">
            This guide is based on Sam Owens' "I Hate Job Interviews" methodology, which I've adapted based on my experience hiring as a Senior Recruiter. Support the author and buy his book to understand the full context behind his framework. It's the best interview preparation guide I've read.
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Source: Owens, Sam. "I Hate Job Interviews: Stop Stressing, Start Performing, Get the Job You Want." HarperCollins Leadership, 2024.
          </p>
        </div>
      </section>


      <GuideShareButtons />

      <InlineRating contentId="guide_interview_preparation" locale="en" />

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default InterviewPreparationGuide;