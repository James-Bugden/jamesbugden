import { ArrowLeft, Clock, Users, Lightbulb, Target, MessageSquare, AlertTriangle, CheckCircle2 } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import GuideShareButtons from "@/components/GuideShareButtons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";
import GuideBottomCTA from "@/components/guides/GuideBottomCTA";
import { SEO } from "@/components/SEO";
import { SiteHeader } from "@/components/SiteHeader";
import { guideSchema } from "@/lib/guideSchema";
import InlineRating from "@/components/feedback/InlineRating";

const InterviewPrepGuide = () => {
  useTrackGuideProgress("interview-prep");


  return (
      <div className="min-h-screen bg-background">
        <SEO schemaJson={guideSchema({ path: "/interview-prep-guide", title: "Interview Prep Guide | Step-by-Step", description: "Step-by-step guide to preparing for job interviews at top companies. Covers STAR method, common questions, and recruiter insights." })} />
      {/* Navigation */}
      <SiteHeader variant="dark" lang="en" sticky showSocials />

{/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            The 10-Hour Interview Prep System
          </h1>
          <p className="text-lg md:text-xl text-cream/90 mb-2">
            The Checklist You Need to Prepare For The Interview
          </p>
          <p className="text-base text-gold-soft/80 mb-2">
            By James Bugden, Senior Recruiter at Uber
          </p>
          <div className="flex items-center justify-center gap-1.5 text-gold-soft/80 mb-6">
            <Clock className="w-4 h-4" />
            <span className="text-sm">20 min read</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            Framework: Based on Sam Owens' "I Hate Job Interviews" methodology, adapted with my insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
          </p>
        </div>
      </section>

      {/* Why This Works */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Why This Works
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            I've hired 500+ people in my career. The candidates who get offers aren't always the most qualified. <span className="text-gold font-semibold">They're the most prepared.</span>
          </p>
          <p className="text-base md:text-lg text-foreground mb-4">
            Most people spend 1 hour preparing. You're about to spend 10.
          </p>
          <p className="text-xl md:text-2xl font-heading text-gold">
            That's your advantage.
          </p>
        </div>
      </section>

      {/* 10-Hour Breakdown Header */}
      <section className="py-8 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream">
            Your 10-Hour Breakdown
          </h2>
        </div>
      </section>

      {/* RESEARCH Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">RESEARCH</h2>
              <p className="text-gold font-medium">3 hours total</p>
            </div>
          </div>

          {/* Hour 1 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Hour 1:</span> Company Basics
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Company history and mission</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Products/services (actually use them if possible)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Recent news (last 3 months)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Financials (revenue, growth - basics only)</span>
              </li>
            </ul>
          </div>

          {/* Hours 2-3 */}
          <div className="mb-6">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Hours 2-3:</span> Talk to Employees
            </h3>
            <p className="text-foreground mb-4">
              <span className="font-semibold text-gold">This is your secret weapon.</span> Reach out to 5-10 people on LinkedIn who work there:
            </p>
            
            <div className="bg-card border border-border rounded-lg p-5 mb-6">
              <p className="text-sm text-muted-foreground mb-2">Message template:</p>
              <p className="text-foreground italic">
                "Hey [name], I'm interviewing for [role] at [company]. Would you have 15 minutes to share your experience?"
              </p>
            </div>

            <h4 className="font-semibold text-foreground mb-3">Questions to ask:</h4>
            <ul className="space-y-3 mb-6">
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
                <span className="text-foreground">What advice for someone interviewing?</span>
              </li>
            </ul>

            <p className="text-muted-foreground italic">
              Most will ignore you. You only need 1-2 to say yes.
            </p>
          </div>
        </div>
      </section>

      {/* FORMULATION Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Lightbulb className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">FORMULATION</h2>
              <p className="text-gold font-medium">3 hours total</p>
            </div>
          </div>

          {/* Hour 1: Power Examples */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Hour 1:</span> Build Your Power Examples
            </h3>
            <p className="text-foreground mb-4">
              Create 7-10 stories that prove you can do the job.
            </p>
            
            <h4 className="font-semibold text-foreground mb-3">How:</h4>
            <ol className="space-y-2 mb-6 list-decimal list-inside text-foreground">
              <li>Read the job description</li>
              <li>Identify the top 7-10 skills they want</li>
              <li>Match ONE story from your experience to each skill</li>
            </ol>

            <h4 className="font-semibold text-foreground mb-3">Each story needs:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Specific timeframe ("Q2 2024" not "recently")</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Numbers and metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">What YOU did (not just "the team")</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Measurable results</span>
              </li>
            </ul>

            {/* Good Example */}
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5 mb-4">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5 text-executive-green" />
                <span className="font-semibold text-executive-green">Good example:</span>
              </div>
              <p className="text-foreground text-sm md:text-base">
                "In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch our new mobile checkout feature. We had a 6-week deadline. Week 4, we hit a major technical blocker with the payment API integration that threatened to delay launch. I brought in a senior backend engineer, reprioritized non-critical features to post-launch, and restructured our sprint to focus solely on the blocker. We shipped on time and saw a 35% increase in mobile conversion rates within 30 days, adding roughly $200K in monthly revenue."
              </p>
            </div>

            {/* Bad Example */}
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="w-5 h-5 text-destructive" />
                <span className="font-semibold text-destructive">Bad example:</span>
              </div>
              <p className="text-foreground text-sm md:text-base">
                "I often work with teams and solve problems."
              </p>
            </div>
          </div>

          {/* Hours 2-3: Answer Frameworks */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-6 flex items-center gap-2">
              <span className="text-gold">Hours 2-3:</span> Learn the 3 Answer Frameworks
            </h3>

            {/* Framework 1: SPAR */}
            <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                Framework 1: SPAR
              </h4>
              <p className="text-muted-foreground mb-4 italic">For "Tell me about a time..." questions</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">S</span>
                  <span className="text-foreground"><strong>Situation</strong> (10-15 seconds): Set the scene</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">P</span>
                  <span className="text-foreground"><strong>Problem</strong> (15-20 seconds): What was the challenge?</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">A</span>
                  <span className="text-foreground"><strong>Action</strong> (60-90 seconds): What YOU did (use 3 steps)</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">R</span>
                  <span className="text-foreground"><strong>Result</strong> (15-20 seconds): Quantify the outcome</span>
                </li>
              </ul>
            </div>

            {/* Framework 2: Home Base */}
            <div className="bg-background border border-border rounded-lg p-6 mb-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                Framework 2: Home Base
              </h4>
              <p className="text-muted-foreground mb-4 italic">For "How would you approach..." questions (These are the hardest because they're hypothetical)</p>
              
              <div className="space-y-4 mb-6">
                <div>
                  <p className="font-semibold text-foreground mb-2">Step 1 - Establish (20-30 sec): Give your framework</p>
                  <ul className="space-y-1 text-foreground ml-4">
                    <li>"I'd approach this in three phases..."</li>
                    <li>"There are four key areas I'd look at..."</li>
                    <li>"My process would involve three steps..."</li>
                  </ul>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Step 2 - Explore (60-90 sec each): Go through each part with details</p>
                </div>
                <div>
                  <p className="font-semibold text-foreground">Step 3 - Summarize (15-20 sec): Restate your framework</p>
                </div>
              </div>

              <div className="bg-card border border-border rounded p-4">
                <p className="text-sm text-muted-foreground mb-2">Example:</p>
                <p className="text-foreground text-sm">
                  "I'd break my first 90 days into three phases: Learn, Contribute, and Scale. In the Learn phase (days 1-30), I'd meet stakeholders and identify quick wins. In the Contribute phase (days 31-60), I'd execute those wins to build credibility. In the Scale phase (days 61-90), I'd implement larger initiatives. So in summary: Learn, Contribute, Scale."
                </p>
              </div>
            </div>

            {/* Framework 3: SEE */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h4 className="font-heading text-lg md:text-xl text-gold mb-3">
                Framework 3: SEE
              </h4>
              <p className="text-muted-foreground mb-4 italic">For "What's your biggest weakness?" questions</p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">S</span>
                  <span className="text-foreground"><strong>Statement</strong>: Say it directly</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">E</span>
                  <span className="text-foreground"><strong>Example</strong>: Give a specific instance</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="font-bold text-gold min-w-[24px]">E</span>
                  <span className="text-foreground"><strong>Effect</strong>: Explain what you learned and how you've improved</span>
                </li>
              </ul>

              <div className="bg-card border border-border rounded p-4 mb-4">
                <p className="text-sm text-muted-foreground mb-2">Example:</p>
                <p className="text-foreground text-sm">
                  "I take on too much because I struggle to say no. Last quarter, I agreed to 3 major projects simultaneously and ended up working late nights. I've learned to evaluate new requests against my current workload before committing. Last month I completed 3 projects ahead of schedule because I was more strategic about what I accepted."
                </p>
              </div>

              <p className="text-muted-foreground text-sm italic">
                Don't say "I'm a perfectionist" or "I work too hard." Pick a real weakness that won't disqualify you.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* PRACTICE Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">PRACTICE</h2>
              <p className="text-gold font-medium">4 hours total</p>
            </div>
          </div>

          {/* Hours 1-2 */}
          <div className="mb-10">
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Hours 1-2:</span> Practice Out Loud Alone
            </h3>
            <p className="text-foreground mb-4">
              Stand in front of a mirror. Answer common questions using your frameworks:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"Tell me about yourself"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"Why do you want this job?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"Tell me about a time you failed"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"Where do you see yourself in 5 years?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"Why should we hire you?"</span>
              </li>
            </ul>
            <p className="text-muted-foreground italic">
              This feels awkward. Do it anyway. You'll hear what sounds weird and fix it now.
            </p>
          </div>

          {/* Hours 3-4 */}
          <div>
            <h3 className="font-heading text-xl md:text-2xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Hours 3-4:</span> Mock Interviews
            </h3>
            <p className="text-foreground mb-4">
              Get a friend, colleague, or family member to interview you. Give them:
            </p>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Your resume</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">The job description</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">List of common interview questions</span>
              </li>
            </ul>

            <h4 className="font-semibold text-foreground mb-3">Rules:</h4>
            <ul className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Treat it like it's real</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">No stopping mid-answer</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Feedback at the END only</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Do minimum 2 mock interviews</span>
              </li>
            </ul>

            <p className="text-gold font-semibold">
              This is the most important part. It reveals your weaknesses before they cost you the job.
            </p>
          </div>
        </div>
      </section>

      {/* Day-Of Checklist */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8">
            Day-Of Checklist
          </h2>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Before */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Before:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Arrive 10-15 minutes early (no more, no less)</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Turn off your phone</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Review your power examples one last time</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">3 deep breaths: in for 1 second, out for 4 seconds</span>
                </li>
              </ul>
            </div>

            {/* During */}
            <div className="bg-background border border-border rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">During:</h3>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Strong handshake, eye contact, smile</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">If you need time to think, pause 2-4 seconds</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Watch for engagement cues (nodding, leaning in)</span>
                </li>
                <li className="flex items-start gap-3">
                  <GoldCheckBadge />
                  <span className="text-foreground text-sm">Sit up straight, use natural hand gestures</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Questions to Ask */}
          <div className="bg-background border border-border rounded-lg p-6 mb-6">
            <h3 className="font-heading text-xl text-gold mb-4">Your Questions to Ask Them:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"What does success look like in this role in the first 6 months?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"What are the biggest challenges facing the team?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">"What do you like most about working here?"</span>
              </li>
            </ul>
          </div>

          {/* Closing */}
          <div className="bg-background border border-border rounded-lg p-6">
            <h3 className="font-heading text-xl text-gold mb-4">Closing:</h3>
            <ul className="space-y-3 mb-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Restate your interest: "I'm very interested in this role and would love to move forward"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-foreground">Ask about next steps</span>
              </li>
            </ul>
            <p className="text-gold font-semibold">
              After: Send thank you email within 24 hours.
            </p>
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
              <span><strong>Talking too much</strong> - Answer the question, then stop</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Trashing previous employers</strong> - Stay diplomatic</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No specific examples</strong> - Everything needs details and numbers</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Not asking questions</strong> - Shows you don't care</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>No follow-up</strong> - Send that thank you email</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Lying</strong> - They'll find out</span>
            </li>
            <li className="flex items-start gap-3 text-foreground">
              <span className="text-destructive text-xl">✕</span>
              <span><strong>Showing up unprepared</strong> - This guide fixes that</span>
            </li>
          </ul>
        </div>
      </section>

      {/* Bottom Line */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-cream mb-6">
            The Bottom Line
          </h2>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            Interviewing is a skill. Most people don't prepare enough.
          </p>
          <p className="text-lg md:text-xl text-cream/90 mb-4">
            Do the 10 hours. Use the frameworks. Practice out loud.
          </p>
          <p className="text-xl md:text-2xl text-gold font-heading">
            Your competition isn't doing this.
          </p>
        </div>
      </section>

      {/* Book Attribution */}
      <section className="py-8 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <p className="text-sm text-muted-foreground italic">
            This guide is based on Sam Owens' "I Hate Job Interviews" methodology. Support the author - his book is the best resource on interviewing I've read.
          </p>
        </div>
      </section>


      <GuideShareButtons />

      <InlineRating contentId="guide_interview_prep" locale="en" />

      <GuideBottomCTA lang="en" />
    </div>
  );
};

export default InterviewPrepGuide;