import { ArrowLeft, Target, Compass, Search, FlaskConical, Rocket, Users, CheckCircle2, AlertTriangle, Calendar, TrendingUp, Zap, BarChart3, Lightbulb, RefreshCw, BookOpen, MessageSquare, ArrowRight, Clock } from "lucide-react";
import { InteractiveChecklist } from "@/components/guides/InteractiveChecklist";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { Button } from "@/components/ui/button";
import GuideShareButtons from "@/components/GuideShareButtons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { guideSchema } from "@/lib/guideSchema";

const PivotMethodGuide = () => {
  useTrackGuideProgress("pivot-guide");


  return (
      <div className="min-h-screen bg-background">
        <SEO schemaJson={guideSchema({ path: "/pivot-method-guide", title: "Pivot Method | Change Careers Successfully", description: "A practical framework for changing careers without starting over." })} />
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
              <span className="hidden sm:inline">Back Home</span>
            </Link>
            <LanguageToggle variant="nav" />
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <RefreshCw className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-[1.2] mb-4">
            The Pivot Method: A Full Guide to Career Change
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Based on "Pivot: The Only Move That Matters Is Your Next One" by Jenny Blake
          </p>
          <p className="text-base text-cream/60 mb-2">
            By James Bugden • Senior Recruiter
          </p>
          <div className="flex items-center justify-center gap-1.5 text-cream/60 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">40 min read</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            Jenny Blake worked at Google for five years in training, coaching, and career development before pivoting to launch her own career consulting business. Her framework for career change is based on real experience and has helped thousands of professionals navigate transitions successfully.
          </p>
        </div>
      </section>

      {/* Understanding the Pivot Framework */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            What is a Career Pivot?
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            Jenny Blake defines a career pivot as <span className="text-gold font-semibold">"doubling down on what is working to make a purposeful shift in a new, related direction."</span>
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            This comes from Eric Ries' definition of a business pivot in The Lean Startup: "a change in strategy without a change in vision."
          </p>
          <p className="text-base md:text-lg text-foreground mb-6">
            In practical terms, a pivot means you're not starting from scratch. You're leveraging your existing strengths, skills, and experience to move in a related direction. Think of it as a basketball pivot: one foot stays planted (your foundation) while the other explores new territory.
          </p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-muted-foreground" />
                What a Pivot is NOT
              </h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Quitting your job with no plan</li>
                <li>• Starting over in a completely unrelated field</li>
                <li>• Chasing a dream with zero relevant skills</li>
                <li>• A midlife crisis or breakdown</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3 flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 text-gold" />
                What a Pivot IS
              </h3>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• An intentional, methodical process for career change</li>
                <li>• Building on your existing strengths and experience</li>
                <li>• Testing new directions before fully committing</li>
                <li>• Reducing risk while exploring opportunities</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">The Smartphone Analogy:</strong> Careers used to be like ladders (linear, predictable, one path up). Now they're like smartphones (modular, customizable, dynamic). Your education and upbringing are the out-of-the-box model. After that, it's up to you to download the apps, skills, interests, experiences, education, that you want and need. A pivot is about downloading new apps one at a time, not trying to upgrade your entire operating system overnight.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Why Pivoting Matters Now</h3>
          <p className="text-foreground mb-4">The career landscape has fundamentally changed:</p>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• Average job tenure in America: 4-5 years (down from decades)</li>
            <li>• Average person will have 11+ jobs in their lifetime</li>
            <li>• You'll likely change industries 3-6 times in your career</li>
            <li>• Traditional pension plans are mostly gone</li>
            <li>• Jobs change dramatically even within the same role</li>
          </ul>
          <p className="text-foreground italic">
            As Blake writes, "Your choice, today and in the future, is to pivot or get pivoted." The market will force change on you eventually. Either you proactively manage your transitions, or external forces (layoffs, industry disruption, skill obsolescence) will make the decision for you.
          </p>
        </div>
      </section>

      {/* Five Stages Overview */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            The Five Stages of a Pivot
          </h2>
          <p className="text-center text-muted-foreground mb-8">
            The Pivot Method has five distinct stages: Plant, Scan, Pilot, Launch, and Lead. Each stage builds on the previous one. Most people skip straight to Launch (making the big move) without doing the foundational work, which is why so many career changes fail.
          </p>

          <div className="grid md:grid-cols-5 gap-4">
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🌱</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">Stage 1</h3>
              <p className="text-gold font-semibold">Plant</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🔍</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">Stage 2</h3>
              <p className="text-gold font-semibold">Scan</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🧪</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">Stage 3</h3>
              <p className="text-gold font-semibold">Pilot</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🚀</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">Stage 4</h3>
              <p className="text-gold font-semibold">Launch</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4 text-center">
              <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="font-heading text-sm text-foreground mb-1">Stage 5</h3>
              <p className="text-gold font-semibold">Lead</p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 1: Plant */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🌱</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Stage 1: Plant</h2>
              <p className="text-muted-foreground">Set your foundation before you move</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Plant is about getting clear on four critical areas before you start exploring new directions. This stage prevents you from making reactive, fear-based decisions.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Compass className="w-5 h-5 text-gold" />
                1. Calibrate Your Compass
              </h3>
              <p className="text-foreground mb-4">Your compass is your set of guiding principles and values. It helps you make decisions when you're facing uncertainty.</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• What are your core values? (Not what should matter to you, but what actually does)</li>
                <li>• What energizes you versus drains you?</li>
                <li>• What are your non-negotiables in work and life?</li>
                <li>• What does your ideal day look like?</li>
              </ul>
              <p className="text-muted-foreground italic mb-4">
                From a recruiter's perspective, I see candidates who haven't calibrated their compass make terrible decisions. They take jobs for money, then quit six months later because the culture is toxic. They chase titles without considering whether the role actually uses their strengths.
              </p>
              <div className="bg-card border border-border rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Exercise: Create your happiness formula</p>
                <p className="text-muted-foreground text-sm">What combination of factors makes you feel fulfilled at work? For some it's autonomy + learning + impact. For others it's stability + clear expectations + collaboration. There's no right answer, but you need to know yours.</p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Target className="w-5 h-5 text-gold" />
                2. Put a Pin in It
              </h3>
              <p className="text-foreground mb-4">This is about creating a vision for where you want to be in one year. Not five years, not ten years. One year.</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• What excites you most right now?</li>
                <li>• What does success look like one year from now?</li>
                <li>• Where do you want to be (role, company, industry, lifestyle)?</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                <strong>Important:</strong> Your vision doesn't need to be crystal clear. Blake warns against "the tyranny of the hows" — getting stuck because you don't know exactly how you'll get there. You just need direction.
              </p>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4">
                <p className="text-foreground">
                  <strong className="text-gold">Recruiter reality check:</strong> When I ask candidates "where do you see yourself in a year?" most give vague answers. The ones who get hired have specific visions: "I want to be leading a team of 5 engineers working on AI infrastructure" or "I want to be consulting 3 days a week while building my own product 2 days a week." Specificity helps you (and others) identify opportunities.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <Zap className="w-5 h-5 text-gold" />
                3. Fuel Your Engine
              </h3>
              <p className="text-foreground mb-4">You need to identify what's already working before you can pivot. Successful pivots leverage existing strengths in new ways.</p>
              <p className="text-foreground mb-4">Blake's framework asks:</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• What are you naturally good at?</li>
                <li>• Where do you excel with minimal effort?</li>
                <li>• What do people consistently come to you for help with?</li>
                <li>• What skills have you developed that transfer to new contexts?</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Most people focus on their weaknesses or what they think they should be doing. Successful pivots leverage existing strengths in new ways.
              </p>
              <div className="bg-card border border-border rounded-lg p-4 mb-4">
                <p className="text-foreground font-semibold mb-2">Exercise: Do a work history highlights review</p>
                <p className="text-muted-foreground text-sm">Go through your past roles and identify: Projects you loved and did well • Skills that came naturally • Moments when you felt "in flow" • Accomplishments you're genuinely proud of. Look for patterns. Those patterns are your fuel.</p>
              </div>
              <p className="text-muted-foreground italic">
                From my recruiting experience: I see engineers pivot to product management (analytical thinking + user empathy), consultants pivot to internal strategy roles (problem-solving + communication), and teachers pivot to corporate training (instruction + curriculum design). They don't start from zero—they re-aim their strengths.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
                <BarChart3 className="w-5 h-5 text-gold" />
                4. Fund Your Runway
              </h3>
              <p className="text-foreground mb-4">Blake is blunt about this: you cannot pivot from a position of financial desperation.</p>
              <p className="text-foreground mb-4">Questions to answer:</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• How long can you sustain your current lifestyle without income?</li>
                <li>• Can you create additional income streams while employed?</li>
                <li>• What's your absolute minimum financial safety net?</li>
                <li>• What creative ways can you extend your runway?</li>
              </ul>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-4">
                <p className="text-foreground">
                  <strong className="text-gold">Minimum recommendation:</strong> 3-6 months of expenses saved before making any major move. Ideally more if you're supporting a family or pivoting to a lower-paying field initially.
                </p>
              </div>
              <p className="text-foreground mb-4">Blake suggests ways to extend runway:</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• Freelancing or consulting in your current field</li>
                <li>• Teaching or coaching on the side</li>
                <li>• Reducing expenses temporarily</li>
                <li>• Negotiating a part-time arrangement</li>
                <li>• Securing clients before leaving your job</li>
              </ul>
              <p className="text-muted-foreground italic">
                Recruiter's note on negotiation: Desperation kills your negotiating power. When I'm hiring, I can sense when a candidate needs the job versus wants the job. The ones who want it (because they have options) get better offers. Build your runway so you're negotiating from strength, not desperation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 2: Scan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🔍</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Stage 2: Scan</h2>
              <p className="text-muted-foreground">Gather intelligence before you leap</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Now that you know where you want to go (Plant), you need to figure out how to get there. Scan is about research, networking, and skill assessment.
          </p>

          <div className="space-y-8">
            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">1. Bolster Your Bench</h3>
              <p className="text-foreground mb-4">Your "bench" is your network of advisors, mentors, and connections who can help you navigate your pivot.</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• Who do you already know in your target field?</li>
                <li>• Who can provide honest advice about the transition?</li>
                <li>• What can you offer in return? (Career karma matters)</li>
                <li>• Who has made a similar pivot successfully?</li>
              </ul>
              <p className="text-muted-foreground mb-4">
                Most people think networking means asking for favors. Blake reframes it as building reciprocal relationships. The best networkers give first, ask later.
              </p>
              <div className="bg-card border border-border rounded-lg p-4 mb-4">
                <p className="text-foreground font-semibold mb-2">Practical approaches:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Informational interviews (20-30 minutes, focused questions)</li>
                  <li>• Industry events and conferences</li>
                  <li>• Online communities in your target field</li>
                  <li>• Alumni networks from your school or company</li>
                  <li>• Second-degree connections through LinkedIn</li>
                </ul>
              </div>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
                <p className="text-foreground">
                  <strong className="text-gold">Recruiter's truth:</strong> 70-80% of jobs are filled through networks, not job postings. Your resume matters less than who's championing you internally. When I hire at Uber, my first step when opening a role is asking my team "who do you know?" Build relationships before you need them. The time to expand your network is while you're employed and not desperate.
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">2. Bridge the Gaps</h3>
              <p className="text-foreground mb-4">This is about honest skill assessment. What do you need to learn to be competitive in your new direction?</p>
              <p className="text-foreground mb-4">Blake's framework for skill gaps:</p>
              <div className="grid md:grid-cols-3 gap-4 mb-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Technical Skills</h4>
                  <p className="text-muted-foreground text-sm">Specific software, certifications, technical knowledge</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Transferable Skills</h4>
                  <p className="text-muted-foreground text-sm">Communication, leadership, problem-solving</p>
                </div>
                <div className="bg-background border border-border rounded-lg p-4">
                  <h4 className="font-semibold text-foreground mb-2">Experience Gaps</h4>
                  <p className="text-muted-foreground text-sm">Areas where you need hands-on practice</p>
                </div>
              </div>
              <p className="text-foreground mb-4">
                <strong>Mind the gap:</strong> Don't assume you need to learn everything before making a move. Focus on the skills that are:
              </p>
              <ol className="space-y-1 text-foreground mb-4 list-decimal list-inside">
                <li>Most critical for the role</li>
                <li>Hardest to fake or learn on the job</li>
                <li>Most valued in your target market</li>
              </ol>
              <p className="text-muted-foreground mb-4 italic">
                From my experience screening resumes: I look for proof you can do the job, not proof you have every qualification listed. 60-70% match is often enough if you can tell a compelling story about the gaps.
              </p>
              <div className="bg-card border border-border rounded-lg p-4 mb-4">
                <p className="text-foreground font-semibold mb-2">Ways to bridge gaps:</p>
                <ul className="space-y-1 text-muted-foreground text-sm">
                  <li>• Online courses (Coursera, Udemy, platform-specific training)</li>
                  <li>• Certifications (especially for technical fields)</li>
                  <li>• Side projects that demonstrate skills</li>
                  <li>• Volunteer work or pro bono consulting</li>
                  <li>• Shadowing someone in your target role</li>
                </ul>
              </div>
              <p className="text-muted-foreground">
                Blake also warns against "linear thinking" — assuming you need to take step 1, then step 2, then step 3 in sequence. Often you can leapfrog steps or learn things in parallel.
              </p>
            </div>

            <div>
              <h3 className="font-heading text-xl text-foreground mb-4">3. Make Yourself Discoverable</h3>
              <p className="text-foreground mb-4">Visibility matters. You can have the right skills and network, but if no one knows you're looking or what you offer, opportunities won't find you.</p>
              <p className="text-foreground mb-4">Blake's framework for discoverability:</p>
              <ul className="space-y-2 text-foreground mb-4">
                <li>• Define your unique value proposition</li>
                <li>• Build a platform (website, LinkedIn, writing, speaking)</li>
                <li>• Do work that gets noticed</li>
                <li>• Let your network know you're exploring</li>
              </ul>
              <div className="bg-gold/10 border border-gold/30 rounded-lg p-4 mb-4">
                <p className="text-foreground">
                  <strong className="text-gold">Project-based purpose:</strong> Don't wait for the perfect job title. Define yourself by the projects you're working on and the problems you solve. Example: Instead of "I'm a marketing manager looking to pivot to product," try "I'm working on user acquisition strategies for SaaS products and helping companies optimize their onboarding funnels."
                </p>
              </div>
              <p className="text-muted-foreground italic">
                Recruiter's perspective on visibility: When I'm hiring, I look for candidates who have an updated LinkedIn profile with specific accomplishments, share insights in their target field, and make it easy for me to understand what they offer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stage 3: Pilot */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🧪</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Stage 3: Pilot</h2>
              <p className="text-muted-foreground">Test before you commit</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            This is Blake's most important contribution to career change methodology. Instead of making one big leap, you run small experiments to gather real-world data. Most career change advice skips this step entirely. People quit their jobs to "pursue their dreams," then discover they hate the reality of that dream. Pilots prevent this costly mistake.
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">Core principle:</strong> If you hate the pilot, you'll hate the pivot. Better to discover this while you still have your job and income.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">What Makes a Strong Pilot?</h3>
          <div className="space-y-4 mb-8">
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">1. Low risk, low cost</p>
                <p className="text-muted-foreground text-sm">Can be run while employed, doesn't require quitting your job, minimal financial investment, reversible if it doesn't work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">2. Provides real-world data</p>
                <p className="text-muted-foreground text-sm">Tests actual interest and aptitude, gives you market feedback, validates (or invalidates) assumptions, answers specific questions</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <GoldCheckBadge />
              <div>
                <p className="text-foreground font-semibold">3. Tests one variable at a time</p>
                <p className="text-muted-foreground text-sm">Don't change everything at once. Isolate what you're testing (role, industry, environment, skills). Makes results clear and actionable</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Examples of Strong Pilots:</h3>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• Freelance project in your target industry (tests: can you do the work? do you enjoy it?)</li>
            <li>• Side project or passion project on weekends (tests: interest, skill, market demand)</li>
            <li>• Consulting for 1-2 clients while employed (tests: business viability, client acquisition)</li>
            <li>• Teaching a course or workshop (tests: expertise, communication, interest in education)</li>
            <li>• Volunteer role in new field (tests: culture, day-to-day reality, connections)</li>
            <li>• Informational interviews with 10 people doing your target job (tests: assumptions, reality check)</li>
          </ul>

          <div className="bg-card border border-border rounded-lg p-5 mb-6">
            <h4 className="font-semibold text-foreground mb-3">Experimentation Framework</h4>
            <p className="text-muted-foreground mb-3">Aim for quantity first, not quality. In the pilot phase, you're gathering data. Run multiple small experiments rather than one perfect test.</p>
            <p className="text-foreground font-semibold mb-2">Example: If you're considering freelance writing:</p>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• Pitch 10 publications (tests: market demand)</li>
              <li>• Write 5 sample articles (tests: do you enjoy the writing process?)</li>
              <li>• Join 2 writing communities (tests: culture fit)</li>
              <li>• Interview 3 full-time writers (tests: reality of the career)</li>
            </ul>
          </div>

          <div className="bg-card border border-border rounded-lg p-5 mb-6">
            <h4 className="font-semibold text-foreground mb-3">Questions to Answer Through Pilots:</h4>
            <ul className="space-y-2 text-muted-foreground text-sm">
              <li>• Does this work energize or drain you?</li>
              <li>• Can you realistically do this work?</li>
              <li>• Is there market demand for your skills?</li>
              <li>• Do you enjoy the day-to-day reality (not just the idea)?</li>
              <li>• Can you make enough money doing this?</li>
              <li>• Do you like the people in this field?</li>
            </ul>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <p className="text-foreground">
              <strong className="text-gold">My recruiting lens on pilots:</strong> When I review resumes from career pivoters, I look for proof of pilots. Someone transitioning from consulting to product management should have: product side projects or case studies, experience working with product teams (even internally), product certifications or courses, evidence of product thinking in their current role. Without pilots, you're asking employers to take a bigger risk on you. With pilots, you have proof of capability and genuine interest. Pilots reduce employer risk. That's what most candidates don't understand.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Incremental Pilots Within Organizations</h3>
          <p className="text-foreground mb-4">Blake emphasizes you don't need to leave your company to pivot. Many successful pivots happen internally through:</p>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• Volunteering for cross-functional projects</li>
            <li>• Taking on stretch assignments</li>
            <li>• Shadowing other teams</li>
            <li>• Leading initiatives outside your core role</li>
            <li>• Internal transfers or rotations</li>
          </ul>
          <p className="text-muted-foreground italic mb-6">
            At Google, Blake pivoted from AdWords training to career development while still at the company. She built the foundation through side projects and internal initiatives before officially changing roles.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Pause, Review, Repeat</h3>
          <p className="text-foreground mb-4">After each pilot, ask:</p>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">What worked?</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• What energized you?</li>
                <li>• What feedback did you get?</li>
                <li>• What surprised you positively?</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">What didn't work?</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• What drained you?</li>
                <li>• What was harder than expected?</li>
                <li>• What disappointed you?</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">What's next?</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Continue this pilot?</li>
                <li>• Try a variation?</li>
                <li>• Run a different experiment?</li>
                <li>• Ready to launch?</li>
              </ul>
            </div>
          </div>
          <p className="text-foreground mt-4">
            The pilot phase isn't about getting it perfect. It's about gathering evidence to make informed decisions. Some pilots will confirm your direction. Others will redirect you to something better.
          </p>
        </div>
      </section>

      {/* Stage 4: Launch */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🚀</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Stage 4: Launch</h2>
              <p className="text-muted-foreground">Make the big move when you're ready</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Launch is not about courage. Blake's key insight: <span className="text-gold font-semibold">"Build first, courage second."</span> Most people think they need to gather courage before making a move. Blake flips this: you need to build evidence, skills, and runway first. When you've done the work in Plant, Scan, and Pilot, the launch becomes less scary because it's data-driven, not fear-driven.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Identify Your Launch Criteria</h3>
          <p className="text-foreground mb-4">This is the most important tool in this stage. Launch criteria are specific, measurable conditions that need to be met before you make your move. What needs to be true before you launch?</p>

          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">Financial Criteria</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 6 months emergency fund saved</li>
                <li>• $X in side income established</li>
                <li>• Debt paid down to $X</li>
                <li>• Partner's income can cover expenses</li>
                <li>• Severance package secured</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">Professional Criteria</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• 3 paying clients lined up</li>
                <li>• Job offer with $X salary</li>
                <li>• Specific certification completed</li>
                <li>• Portfolio with 5 strong case studies</li>
                <li>• Clear path to health insurance</li>
              </ul>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-3">Personal Criteria</h4>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Partner fully supportive of change</li>
                <li>• Childcare situation stable</li>
                <li>• Mental/physical health in good place</li>
                <li>• Living situation secure</li>
                <li>• Visa/legal status clear</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <h4 className="font-semibold text-gold mb-3">The Pivot Hexagon: Evaluate Readiness Across Six Dimensions</h4>
            <ol className="space-y-1 text-foreground">
              <li>1. Values and vision alignment</li>
              <li>2. Strengths and skills match</li>
              <li>3. Financial foundation solid</li>
              <li>4. Network and support system in place</li>
              <li>5. Pilot data positive</li>
              <li>6. Timing feels right</li>
            </ol>
            <p className="text-muted-foreground text-sm mt-3">You don't need perfection across all six, but you need minimum thresholds met in each area. 4-5 in the green is typically enough to launch safely.</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Know When to Hold vs. Fold</h3>
          <p className="text-foreground mb-4">Blake addresses a critical question: How do you know when to persist through difficulty versus when to pivot away?</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">Hold when:</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• The work aligns with your values and strengths</li>
                <li>• Challenges are temporary or solvable</li>
                <li>• You're making progress, even if slow</li>
                <li>• Feedback is positive, trajectory is upward</li>
                <li>• The difficulty is part of normal growth</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-muted-foreground mb-2">Fold when:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• The work consistently drains you</li>
                <li>• You're fighting against your natural strengths</li>
                <li>• Multiple pilots confirm this isn't the right fit</li>
                <li>• Market demand doesn't support this path</li>
                <li>• Values misalignment becomes clear</li>
              </ul>
            </div>
          </div>
          <p className="text-muted-foreground italic mb-6">
            From my recruiting experience: I see people stay in wrong-fit roles too long because they've invested so much. The sunk cost fallacy is real. Your past investment doesn't justify future misery. I also see people quit too soon, before giving themselves enough data. The pilot phase should give you clear evidence either way.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Your Gut Has a Brain</h3>
          <p className="text-foreground mb-4">Blake cites research on intuition: your gut actually has neurons and makes decisions. But gut instinct works best when it's informed by data, not driven by fear or fantasy.</p>
          <div className="grid md:grid-cols-2 gap-4 mb-6">
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">Good gut instinct:</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• Informed by pilots and real experience</li>
                <li>• Considers practical factors</li>
                <li>• Balanced with rational analysis</li>
                <li>• Feels like "yes, and it's scary" not "I hope this works out"</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-muted-foreground mb-2">Bad gut instinct:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Based on fantasy or avoidance</li>
                <li>• Ignoring red flags</li>
                <li>• Desperate or impulsive</li>
                <li>• Feels like "I have to escape" rather than "I'm moving toward"</li>
              </ul>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Separate Decisions from Difficult Conversations</h3>
          <p className="text-foreground mb-4">One reason people delay launch: they're dreading difficult conversations (telling their boss, disappointing family, explaining to friends). Blake advises: Make the decision first, then plan the conversations.</p>
          <p className="text-foreground mb-4">Don't let fear of someone's reaction prevent you from making the right career move. Difficult conversations are temporary. Wrong career paths drain you for years.</p>
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-foreground mb-3">Scripts for Common Difficult Conversations:</h4>
            <p className="text-foreground text-sm mb-2"><strong>Telling your boss:</strong> "I wanted to let you know I've accepted a position at [company]. My last day will be [date]. I'm grateful for the opportunities here and want to ensure a smooth transition."</p>
            <p className="text-muted-foreground text-sm mb-3 italic">Note: You don't owe them your life story or justifications. Be professional, brief, and focus on the transition.</p>
            <p className="text-foreground text-sm"><strong>Telling family who may not understand:</strong> "I know this seems different from what I've been doing, but I've spent [timeframe] researching and testing this direction. I'm confident in this move and excited about the opportunity."</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Don't Wait for Perfect Conditions</h3>
          <p className="text-foreground mb-4">There's no perfect time to make a career change. There will always be uncertainty. The goal isn't to eliminate all risk—it's to reduce risk to an acceptable level based on your tolerance and situation.</p>
          <div className="bg-card border border-border rounded-lg p-4 mb-6">
            <h4 className="font-semibold text-foreground mb-2">Common "waiting for perfect" traps:</h4>
            <ul className="space-y-1 text-muted-foreground text-sm">
              <li>• Waiting until you feel completely ready (you won't)</li>
              <li>• Waiting until you have every skill (you don't need them all)</li>
              <li>• Waiting until the economy is better (timing is unpredictable)</li>
              <li>• Waiting until your personal life is settled (it rarely is)</li>
            </ul>
          </div>
          <p className="text-foreground font-semibold">Launch when your criteria are met, even if you're still scared. Fear is normal. Paralysis is optional.</p>
        </div>
      </section>

      {/* Stage 5: Lead */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <span className="text-2xl">🎯</span>
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Stage 5: Lead</h2>
              <p className="text-muted-foreground">Help others pivot and facilitate career development</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            This final stage is often overlooked, but Blake argues it's essential both for others and for your own career growth. Once you've successfully pivoted, you have valuable knowledge that others need.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Why Leading Matters</h3>
          <p className="text-foreground mb-4">Once you've successfully pivoted, you have valuable knowledge:</p>
          <ul className="space-y-2 text-foreground mb-4">
            <li>• What worked in your transition</li>
            <li>• What mistakes to avoid</li>
            <li>• Which skills matter most</li>
            <li>• How to navigate the specific challenges of your pivot</li>
          </ul>
          <p className="text-foreground mb-6">This knowledge is valuable to: others considering a similar pivot, your company (improving internal mobility), your industry (developing talent pipelines), and your own network (career karma).</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Share Your Story</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Why you pivoted</li>
                <li>• How you figured out your next step</li>
                <li>• What mistakes you made</li>
                <li>• What worked and what you learned</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Career Karma Actions</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• Make introductions to contacts in your network</li>
                <li>• Review resumes for people who are pivoting</li>
                <li>• Conduct mock interviews</li>
                <li>• Mentor someone going through a transition</li>
                <li>• Offer to be a pilot client or test user for someone</li>
                <li>• Celebrate others' career wins</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">Career karma:</strong> The more you help others pivot successfully, the more support you'll have when you need your next pivot. From my recruiting experience: The best managers I know lose people regularly, because they develop them so well that they get promoted or recruited away. But those managers never have trouble hiring, because everyone wants to work for someone who invests in their growth.
            </p>
          </div>
        </div>
      </section>

      {/* Common Pitfalls */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Common Pivot Mistakes (And How to Avoid Them)
          </h2>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #1: The Big Leap Without Pilots</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> Quitting your job to "find yourself" or "pursue your passion" without testing the waters first.</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> You're making a major life decision based on fantasy, not data. The reality of a career rarely matches the idea of it.</p>
              <p className="text-foreground"><strong>Solution:</strong> Always pilot first. Run experiments while employed. Gather real-world data before making irreversible decisions.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #2: Starting from Scratch</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> "I want to completely change careers and do something totally different."</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> You're throwing away years of accumulated skills, relationships, and reputation. Starting from zero means competing with people who've spent years building what you're just beginning.</p>
              <p className="text-foreground"><strong>Solution:</strong> Find the "adjacent possible." What's one step away from what you're doing now? How can you leverage existing strengths in a new context?</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #3: Analysis Paralysis</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> "I need to research more before I decide" (said for the 47th time).</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> You're using research as avoidance. At some point, more information doesn't help—you need experience.</p>
              <p className="text-foreground"><strong>Solution:</strong> Set decision deadlines. After X pilots or Y months of research, make a call with the information you have. Remember: you can always pivot again. Blake recommends pilots over research. Twenty informational interviews teach you less than one freelance project actually doing the work.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #4: Ignoring Your Strengths</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> "I'm passionate about X, even though I'm not particularly good at it and it drains me."</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> Passion without skill equals hobby, not career. You'll struggle to compete and eventually burn out.</p>
              <p className="text-foreground"><strong>Solution:</strong> "Fuel your engine" first. Identify what you're naturally good at, what energizes you, where you excel with minimal effort. Find passion within your strengths, not despite them.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #5: No Financial Runway</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> "I'll figure out money later" or "I'll make it work somehow."</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> Desperation kills decision-making. You'll take the first offer out of panic, not alignment.</p>
              <p className="text-foreground"><strong>Solution:</strong> Fund your runway before you plant. Build savings, create side income, reduce expenses. Move from a position of security, not scarcity. Non-negotiable minimum: 3-6 months expenses saved before any major launch.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #6: Skipping the Network Building</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> Applying to 100 jobs online without talking to a single person in the target field.</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> Most jobs (70-80%) are filled through networks. Your resume goes into a black hole when you have no internal champion.</p>
              <p className="text-foreground"><strong>Solution:</strong> "Bolster your bench" in the Scan phase. Build relationships before you need them. Give value before asking for favors.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #7: Not Running Enough Pilots</p>
              <p className="text-muted-foreground mb-2"><strong>What it looks like:</strong> Running one small experiment, having it not work perfectly, and giving up.</p>
              <p className="text-muted-foreground mb-2"><strong>Why it fails:</strong> First pilots rarely succeed. You need quantity to gather enough data.</p>
              <p className="text-foreground"><strong>Solution:</strong> Aim for quantity over quality in the pilot phase. Run 5-10 small experiments, not one perfect test. Example: If you're testing freelance writing, don't pitch one article and quit. Pitch 20, complete 5, join 2 communities, interview 3 writers. Aggregate data before making conclusions.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Understanding When to Pivot vs. When to Process */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Understanding When to Pivot vs. When to Process
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5">
              <h3 className="font-heading text-xl text-gold mb-4">A Pivot is a Proactive Choice</h3>
              <p className="text-foreground mb-4">Blake defines pivots as changes you make of your own volition when you're ready for increased challenge and impact.</p>
              <p className="text-foreground font-semibold mb-2">Key characteristics:</p>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• You choose the timing (within reason)</li>
                <li>• You plan the transition</li>
                <li>• You maintain some control over the process</li>
                <li>• You're moving toward something, not just away from something</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-xl text-foreground mb-4">Signs It's Time to Pivot</h3>
              <ul className="space-y-2 text-muted-foreground text-sm">
                <li>• You've plateaued in your current role</li>
                <li>• You're consistently bored or under-challenged</li>
                <li>• Your values no longer align with your work</li>
                <li>• You see limited growth opportunities ahead</li>
                <li>• You daydream about other careers regularly</li>
                <li>• Sunday nights fill you with dread</li>
              </ul>
            </div>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl text-foreground mb-4">A Crisis Requires Different Support</h3>
            <p className="text-foreground mb-4">Examples of crises (not pivots):</p>
            <ul className="grid md:grid-cols-2 gap-2 text-muted-foreground mb-4">
              <li>• Death of a loved one</li>
              <li>• Serious illness or injury</li>
              <li>• Unexpected job loss or firing</li>
              <li>• Divorce or major relationship trauma</li>
              <li>• Financial catastrophe</li>
              <li>• Mental health emergency</li>
            </ul>
            <p className="text-foreground mb-4">Crises typically require more processing than planning, though not everyone will have the luxury to do those two things in sequence.</p>
            <p className="text-foreground font-semibold mb-2">When you're in crisis:</p>
            <ul className="space-y-1 text-foreground text-sm">
              <li>• Give yourself space to grieve and heal</li>
              <li>• Seek therapy or spiritual guidance if needed</li>
              <li>• Focus on getting through each day</li>
              <li>• Delay major career decisions if possible</li>
              <li>• Rebuild emotional foundation before planning pivots</li>
            </ul>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <h4 className="font-semibold text-gold mb-3">The Gray Area: Wake-Up Calls</h4>
            <p className="text-foreground mb-4">Sometimes crises catalyze pivots. A health scare might make you reconsider your 80-hour work weeks. A layoff might push you toward the career change you'd been avoiding.</p>
            <p className="text-foreground">Blake acknowledges: "Painful experiences also serve as powerful wake-up calls, encouraging us to rebuild in an even more authentic direction." The difference is timing: process the crisis first, then plan the pivot. Trying to do both simultaneously often leads to reactive decisions you later regret.</p>
          </div>
        </div>
      </section>

      {/* Special Situations */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Pivoting in Special Situations
          </h2>

          <div className="space-y-8">
            {/* After Layoff */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">Pivoting After a Layoff</h3>
              <p className="text-foreground mb-4">Being laid off can actually be a good time to pivot—if you approach it strategically.</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
                  <p className="text-gold mb-2">Why layoffs can help:</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• Severance gives you runway</li>
                    <li>• You have time for deep scanning and pilots</li>
                    <li>• Psychologically easier to justify change</li>
                    <li>• You're already "on the market"</li>
                  </ul>
                </div>
                <div className="bg-card border border-border rounded-lg p-4">
                  <p className="text-muted-foreground mb-2">Pitfalls to avoid:</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Panicking and taking the first offer</li>
                    <li>• Skipping pilot phase because you "need" a job</li>
                    <li>• Making reactive pivots without strategy</li>
                  </ul>
                </div>
              </div>

              <p className="text-muted-foreground italic text-sm">From a recruiter's perspective: Candidates who were laid off can actually be more attractive if they can show what they did during the transition (courses, pilots, freelancing, skill-building). It shows initiative.</p>
            </div>

            {/* Mid-Career */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">Mid-Career Pivoting</h3>
              <p className="text-foreground mb-4">Pivoting in your 40s or 50s has unique challenges and advantages.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-semibold mb-2">Challenges:</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Ageism (real, even if illegal)</li>
                    <li>• More financial responsibilities</li>
                    <li>• May need to take a pay cut</li>
                    <li>• Psychological barrier of feeling "too late"</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Advantages:</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• Decades of transferable skills</li>
                    <li>• Established network</li>
                    <li>• Financial stability (if you've been saving)</li>
                    <li>• Clarity about your values and what you want</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* During Parenthood */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">Pivoting During Parenthood</h3>
              <p className="text-foreground mb-4">Parents with young children face additional constraints, but pivoting is still possible.</p>
              
              <ul className="space-y-2 text-foreground mb-4">
                <li>• Extend the timeline (12-18 month pilots instead of 6)</li>
                <li>• Run very small, low-commitment pilots</li>
                <li>• Coordinate with partner to create pilot time</li>
                <li>• Consider part-time or consulting roles as transitions</li>
              </ul>

              <p className="text-muted-foreground italic text-sm">Many successful pivots happen during parental leave or when one partner takes on more domestic responsibility. Creativity and flexibility are key.</p>
            </div>

            {/* International */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-foreground mb-4">International Pivoting</h3>
              <p className="text-foreground mb-4">Moving to a new country adds complexity to career pivoting.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-foreground font-semibold mb-2">Additional factors:</p>
                  <ul className="space-y-1 text-muted-foreground text-sm">
                    <li>• Visa and work authorization</li>
                    <li>• Language barriers</li>
                    <li>• Credentials may not transfer</li>
                    <li>• Network starts from zero</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-semibold mb-2">Strategies:</p>
                  <ul className="space-y-1 text-foreground text-sm">
                    <li>• Start with internal transfer (if at multinational)</li>
                    <li>• Target roles with international exposure</li>
                    <li>• Build network before you move</li>
                    <li>• Consider language as a skill gap to bridge</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Career Conversations for Leaders */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            For Leaders: Facilitating Career Conversations
          </h2>

          <p className="text-foreground mb-6">If you're a manager or leader, help your team grow—even if it means they might leave. Blake emphasizes: Your interest in someone's career development matters more than you think.</p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">Quarterly Career Conversation Framework:</h3>
            <ul className="space-y-2 text-foreground">
              <li>• What work are you enjoying most?</li>
              <li>• What's draining you?</li>
              <li>• What skills do you want to develop?</li>
              <li>• Where do you see yourself in 1-2 years?</li>
              <li>• How can I support your growth?</li>
            </ul>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-3">Why This Works:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Builds trust and loyalty</li>
                <li>• Reduces surprise resignations</li>
                <li>• Helps identify stretch assignments and internal pivots</li>
                <li>• Creates an environment where people want to stay</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-semibold text-foreground mb-3">Internal Pilot Opportunities:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• Rotational programs (3-6 months)</li>
                <li>• Cross-functional project teams</li>
                <li>• Stretch assignments outside comfort zone</li>
                <li>• Internal teaching or training opportunities</li>
                <li>• Internal mentorship matching</li>
                <li>• Skill-sharing sessions</li>
              </ul>
            </div>
          </div>

          <p className="text-foreground mb-4">When managers actively support employee growth (even if it means the employee eventually moves to another team or company), they:</p>
          <ul className="space-y-1 text-foreground mb-4">
            <li>• Build loyalty and engagement short-term</li>
            <li>• Create advocates and strong network long-term</li>
            <li>• Develop reputation as a leader who cares</li>
            <li>• Attract top talent who want to work with them</li>
          </ul>
        </div>
      </section>

      {/* The Pivot Mindset */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            The Pivot Mindset: Reframing Career Change
          </h2>

          <p className="text-foreground mb-6">Blake's framework requires a fundamental shift in how we think about career transitions.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">Old Career Model vs. New Career Model</h3>
          <div className="overflow-x-auto mb-8">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-executive-green/20">
                  <th className="border border-border p-3 text-left text-foreground">Old Model (Career as Ladder)</th>
                  <th className="border border-border p-3 text-left text-foreground">New Model (Career as Smartphone)</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Linear progression up one ladder</td>
                  <td className="border border-border p-3 text-foreground">Modular, customizable paths</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">40 years at one company</td>
                  <td className="border border-border p-3 text-foreground">Average tenure: 4-5 years per job</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Clear, predictable path</td>
                  <td className="border border-border p-3 text-foreground">Dynamic, adaptive careers</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Retirement with pension</td>
                  <td className="border border-border p-3 text-foreground">Multiple industries/roles over lifetime</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Job security as goal</td>
                  <td className="border border-border p-3 text-foreground">Continuous learning and pivoting as normal</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Shifting from Scarcity to Abundance Thinking</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <h4 className="font-semibold text-muted-foreground mb-2">Scarcity Mindset:</h4>
              <ul className="space-y-1 text-muted-foreground text-sm">
                <li>• "I need to find THE right career"</li>
                <li>• "If I make the wrong move, I'm screwed"</li>
                <li>• "There's only one path for me"</li>
                <li>• "I have to know the whole plan before I start"</li>
              </ul>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4">
              <h4 className="font-semibold text-gold mb-2">Pivot Mindset:</h4>
              <ul className="space-y-1 text-foreground text-sm">
                <li>• "What's ONE next move I can test?"</li>
                <li>• "How can I reduce risk while exploring?"</li>
                <li>• "What am I learning from this experiment?"</li>
                <li>• "What's working that I can double down on?"</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground italic">
              "You will never see the entire pivot path at the outset, nor would you want to. If the next steps were obvious and manageable with a simple spreadsheet, you would either already be taking them or you would be bored."
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">From Passion to Strengths</h3>
          <p className="text-muted-foreground mb-2"><strong>Old thinking:</strong> "Find your passion, then figure out how to monetize it."</p>
          <p className="text-foreground mb-4"><strong>Blake's approach:</strong> "Identify your strengths, find work that uses them, discover passion in excellence and impact."</p>
          <p className="text-foreground mb-6">She writes in the Plant stage: "Fuel your engine" comes before "Put a pin in it." Know what you're good at before deciding where to go. Why this matters: Passion without skill leads to frustration and failure. Skills without passion lead to burnout. The sweet spot is finding passion within work that leverages your natural strengths.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">From Perfect Planning to Iterative Experimentation</h3>
          <p className="text-muted-foreground mb-2"><strong>Old approach:</strong> Research → Plan completely → Execute perfectly → Hope it works</p>
          <p className="text-foreground"><strong>Pivot Method:</strong> Plant → Scan → Pilot → Review → Adjust → Pilot again → Launch when ready</p>
        </div>
      </section>

      {/* Quick Reference */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-8 text-center">
            Quick Reference: The Pivot Method
          </h2>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🌱 Stage 1: Plant — Set Your Foundation</h3>
              <InteractiveChecklist
                guideKey="pivot_ref_plant_en"
                variant="dark"
                items={[
                  { label: "Calibrate compass: Define values, happiness formula, non-negotiables" },
                  { label: "Put a pin in it: Vision for 1 year from now (don't worry about how)" },
                  { label: "Fuel your engine: Identify strengths, what's working, where you excel" },
                  { label: "Fund your runway: Build 3-6 months savings, create side income" },
                ]}
              />
              <p className="text-cream/70 text-sm mt-3">Key output: Clear direction and financial foundation</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🔍 Stage 2: Scan — Gather Intelligence</h3>
              <InteractiveChecklist
                guideKey="pivot_ref_scan_en"
                variant="dark"
                items={[
                  { label: "Bolster your bench: Expand network, find advisors, practice career karma" },
                  { label: "Bridge the gaps: Assess skills needed, create learning plan, focus on critical gaps" },
                  { label: "Make yourself discoverable: Define unique value, build visibility, let people know you're exploring" },
                ]}
              />
              <p className="text-cream/70 text-sm mt-3">Key output: Network built, skills identified, market awareness</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🧪 Stage 3: Pilot — Test Before Committing</h3>
              <InteractiveChecklist
                guideKey="pivot_ref_pilot_en"
                variant="dark"
                items={[
                  { label: "Run small experiments: Low risk, low cost tests that give real data" },
                  { label: "Quantity over quality: Run 5-10 pilots, not 1 perfect test" },
                  { label: "Pause and review: What worked? What didn't? What's next?" },
                ]}
              />
              <p className="text-cream/70 text-sm mt-3">Key questions: Does this energize or drain you? Can you do the work? Is there market demand?</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🚀 Stage 4: Launch — Make the Move</h3>
              <InteractiveChecklist
                guideKey="pivot_ref_launch_en"
                variant="dark"
                items={[
                  { label: "Define criteria: What must be true before you launch? (financial, professional, personal)" },
                  { label: "Build first, courage second: Gather evidence and runway before leaping" },
                  { label: "Know when to fold: If pilots consistently fail, pivot direction" },
                  { label: "Separate decisions from conversations: Decide first, then handle difficult talks" },
                ]}
              />
              <p className="text-cream/70 text-sm mt-3">Key output: Successful transition to new role/career</p>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">🎯 Stage 5: Lead — Help Others Pivot</h3>
              <InteractiveChecklist
                guideKey="pivot_ref_lead_en"
                variant="dark"
                items={[
                  { label: "Share your story: Teach what you learned" },
                  { label: "Facilitate career conversations: If you're a manager, support team growth" },
                  { label: "Practice career karma: Give introductions, feedback, support" },
                  { label: "Pilot internal mobility: Create opportunities for others to test new directions" },
                ]}
              />
              <p className="text-cream/70 text-sm mt-3">Key output: Stronger network and leadership reputation</p>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Resources */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Additional Resources
          </h2>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <h3 className="font-heading text-lg text-gold mb-3">Read the Full Book</h3>
            <p className="text-foreground">Pivot: The Only Move That Matters Is Your Next One by Jenny Blake</p>
          </div>

          <h3 className="font-heading text-lg text-foreground mb-4">Blake Recommends These Books for Deeper Learning:</h3>
          <ul className="space-y-2 text-foreground mb-6">
            <li>• <strong>The Lean Startup</strong> by Eric Ries (on piloting and experimentation)</li>
            <li>• <strong>Designing Your Life</strong> by Bill Burnett and Dave Evans (on career design)</li>
            <li>• <strong>StrengthsFinder 2.0</strong> by Tom Rath (on identifying strengths)</li>
            <li>• <strong>The Coaching Habit</strong> by Michael Bungay Stanier (on facilitating career conversations)</li>
          </ul>

          <p className="text-muted-foreground italic text-center">
            This guide is based on Jenny Blake's book "Pivot: The Only Move That Matters Is Your Next One." All framework concepts and core methodology credit goes to Jenny Blake.
          </p>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Your Next Move
          </h2>
          <p className="text-foreground mb-4">
            Career changes force growth. They push you to develop new skills, meet new people, challenge assumptions, and discover capabilities you didn't know you had.
          </p>
          
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <h4 className="font-semibold text-gold mb-3">The Regret Question</h4>
            <p className="text-foreground">What will you regret more—trying and failing, or never trying? In my experience, regret comes from inaction, not from well-planned attempts that don't work out. The people I meet at 50 who are still in careers they hate aren't there because they tried something and failed. They're there because they never tried. Failed pivots teach you something. Avoided pivots just accumulate resentment.</p>
          </div>

          <div className="bg-card border border-border rounded-lg p-6 text-left mb-8">
            <h4 className="font-semibold text-foreground mb-3">Start Where You Are</h4>
            <p className="text-foreground mb-4">You don't need to have everything figured out to start. You don't need perfect conditions. You don't need to know the entire path.</p>
            <ul className="space-y-2 text-foreground">
              <li>• <strong>If you're employed and uncertain:</strong> Start with Plant. Clarify your compass and vision.</li>
              <li>• <strong>If you know where you want to go:</strong> Move to Scan. Build network, bridge skills gaps.</li>
              <li>• <strong>If you've done research:</strong> Run Pilots. Test your assumptions with real experiments.</li>
              <li>• <strong>If you've tested and validated:</strong> Check your Launch criteria. Are you ready to move?</li>
              <li>• <strong>If you've pivoted successfully:</strong> Lead. Help others through their transitions.</li>
            </ul>
          </div>

          <p className="text-xl font-heading text-gold mb-6">
            The only move that matters is your next one.
          </p>
          <p className="text-muted-foreground italic">
            Not the perfect career five years out. Your next step. What's yours?
          </p>
        </div>
      </section>

      <GuideShareButtons />

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default PivotMethodGuide;