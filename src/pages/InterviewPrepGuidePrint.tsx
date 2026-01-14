import { CheckCircle2, AlertTriangle } from "lucide-react";
import GoldCheckBadge from "@/components/GoldCheckBadge";

const InterviewPrepGuidePrint = () => {
  return (
    <div className="print-document bg-white text-black min-h-screen">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 15mm 18mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
          }
          .page-break {
            page-break-before: always;
          }
          .avoid-break {
            page-break-inside: avoid;
          }
        }
        .print-document {
          font-family: system-ui, -apple-system, sans-serif;
          line-height: 1.6;
          max-width: 800px;
          margin: 0 auto;
          padding: 40px 30px;
        }
        .gold-text {
          color: #C9A227;
        }
        .green-bg {
          background-color: #1a3a2f;
        }
        .green-text {
          color: #1a3a2f;
        }
        .cream-text {
          color: #FAF8F5;
        }
        h1, h2, h3, h4 {
          font-family: Georgia, serif;
        }
      `}</style>

      {/* Hero Section */}
      <div className="green-bg text-center py-12 px-8 rounded-lg mb-8">
        <h1 className="cream-text text-4xl md:text-5xl font-serif mb-4">
          The 10-Hour Interview Prep System
        </h1>
        <p className="cream-text opacity-80 text-lg mb-2">
          The Checklist You Need to Prepare For The Interview
        </p>
        <p className="cream-text opacity-60 text-base">
          By James Bugden, Senior Recruiter at Uber
        </p>
      </div>

      {/* Framework Note */}
      <div className="bg-gray-100 py-4 px-6 rounded-lg mb-8 text-center">
        <p className="text-sm text-gray-600 italic">
          Framework: Based on Sam Owens' "I Hate Job Interviews" methodology, adapted with my insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
        </p>
      </div>

      {/* Why This Works */}
      <div className="mb-10 avoid-break">
        <h2 className="text-2xl font-serif mb-4">Why This Works</h2>
        <p className="text-base mb-3">
          I've hired 500+ people in my career. The candidates who get offers aren't always the most qualified. <span className="gold-text font-semibold">They're the most prepared.</span>
        </p>
        <p className="text-base mb-3">
          Most people spend 1 hour preparing. You're about to spend 10.
        </p>
        <p className="text-xl font-serif gold-text">
          That's your advantage.
        </p>
      </div>

      {/* 10-Hour Breakdown Header */}
      <div className="green-bg text-center py-6 px-8 rounded-lg mb-8">
        <h2 className="cream-text text-2xl font-serif">
          Your 10-Hour Breakdown
        </h2>
      </div>

      {/* RESEARCH Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">🎯</span>
          </div>
          <div>
            <h2 className="text-2xl font-serif">RESEARCH</h2>
            <p className="gold-text font-medium">3 hours total</p>
          </div>
        </div>

        {/* Hour 1 */}
        <div className="mb-8 avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Hour 1:</span> Company Basics
          </h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Company history and mission</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Products/services (actually use them if possible)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Recent news (last 3 months)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Financials (revenue, growth - basics only)</span>
            </li>
          </ul>
        </div>

        {/* Hours 2-3 */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Hours 2-3:</span> Talk to Employees
          </h3>
          <p className="mb-3">
            <span className="font-semibold gold-text">This is your secret weapon.</span> Reach out to 5-10 people on LinkedIn who work there:
          </p>
          
          <div className="bg-gray-100 border border-gray-200 rounded-lg p-4 mb-4">
            <p className="text-sm text-gray-600 mb-1">Message template:</p>
            <p className="italic">
              "Hey [name], I'm interviewing for [role] at [company]. Would you have 15 minutes to share your experience?"
            </p>
          </div>

          <h4 className="font-semibold mb-2">Questions to ask:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What's the culture really like?</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What does success look like in this role?</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What challenges is the team facing?</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What advice for someone interviewing?</span>
            </li>
          </ul>

          <p className="text-gray-600 italic">
            Most will ignore you. You only need 1-2 to say yes.
          </p>
        </div>
      </div>

      {/* Page Break before FORMULATION */}
      <div className="page-break"></div>

      {/* FORMULATION Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">💡</span>
          </div>
          <div>
            <h2 className="text-2xl font-serif">FORMULATION</h2>
            <p className="gold-text font-medium">3 hours total</p>
          </div>
        </div>

        {/* Hour 1: Power Examples */}
        <div className="mb-8 avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Hour 1:</span> Build Your Power Examples
          </h3>
          <p className="mb-3">
            Create 7-10 stories that prove you can do the job.
          </p>
          
          <h4 className="font-semibold mb-2">How:</h4>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li>Read the job description</li>
            <li>Identify the top 7-10 skills they want</li>
            <li>Match ONE story from your experience to each skill</li>
          </ol>

          <h4 className="font-semibold mb-2">Each story needs:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Specific timeframe ("Q2 2024" not "recently")</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Numbers and metrics</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What YOU did (not just "the team")</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Measurable results</span>
            </li>
          </ul>

          {/* Good Example */}
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-3">
            <div className="flex items-center gap-2 mb-2">
              <CheckCircle2 className="w-5 h-5 text-green-700" />
              <span className="font-semibold text-green-700">Good example:</span>
            </div>
            <p className="text-sm">
              "In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch our new mobile checkout feature. We had a 6-week deadline. Week 4, we hit a major technical blocker with the payment API integration that threatened to delay launch. I brought in a senior backend engineer, reprioritized non-critical features to post-launch, and restructured our sprint to focus solely on the blocker. We shipped on time and saw a 35% increase in mobile conversion rates within 30 days, adding roughly $200K in monthly revenue."
            </p>
          </div>

          {/* Bad Example */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-2">
              <AlertTriangle className="w-5 h-5 text-red-600" />
              <span className="font-semibold text-red-600">Bad example:</span>
            </div>
            <p className="text-sm">
              "I often work with teams and solve problems."
            </p>
          </div>
        </div>

        {/* Hours 2-3: Answer Frameworks */}
        <div>
          <h3 className="text-xl font-serif mb-4">
            <span className="gold-text">Hours 2-3:</span> Learn the 3 Answer Frameworks
          </h3>

          {/* Framework 1: SPAR */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 avoid-break">
            <h4 className="text-lg font-serif gold-text mb-2">
              Framework 1: SPAR
            </h4>
            <p className="text-gray-600 mb-3 italic">For "Tell me about a time..." questions</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">S</span>
                <span><strong>Situation</strong> (10-15 seconds): Set the scene</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">P</span>
                <span><strong>Problem</strong> (15-20 seconds): What was the challenge?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">A</span>
                <span><strong>Action</strong> (60-90 seconds): What YOU did (use 3 steps)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">R</span>
                <span><strong>Result</strong> (15-20 seconds): Quantify the outcome</span>
              </li>
            </ul>
          </div>

          {/* Page Break before Framework 2 */}
          <div className="page-break"></div>

          {/* Framework 2: Home Base */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 avoid-break">
            <h4 className="text-lg font-serif gold-text mb-2">
              Framework 2: Home Base
            </h4>
            <p className="text-gray-600 mb-3 italic">For "How would you approach..." questions (These are the hardest because they're hypothetical)</p>
            
            <div className="space-y-3 mb-4">
              <div>
                <p className="font-semibold mb-1">Step 1 - Establish (20-30 sec): Give your framework</p>
                <ul className="space-y-1 ml-4 text-sm">
                  <li>"I'd approach this in three phases..."</li>
                  <li>"There are four key areas I'd look at..."</li>
                  <li>"My process would involve three steps..."</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Step 2 - Explore (60-90 sec each): Go through each part with details</p>
              </div>
              <div>
                <p className="font-semibold">Step 3 - Summarize (15-20 sec): Restate your framework</p>
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded p-3">
              <p className="text-sm text-gray-600 mb-1">Example:</p>
              <p className="text-sm">
                "I'd break my first 90 days into three phases: Learn, Contribute, and Scale. In the Learn phase (days 1-30), I'd meet stakeholders and identify quick wins. In the Contribute phase (days 31-60), I'd execute those wins to build credibility. In the Scale phase (days 61-90), I'd implement larger initiatives. So in summary: Learn, Contribute, Scale."
              </p>
            </div>
          </div>

          {/* Framework 3: SEE */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
            <h4 className="text-lg font-serif gold-text mb-2">
              Framework 3: SEE
            </h4>
            <p className="text-gray-600 mb-3 italic">For "What's your biggest weakness?" questions</p>
            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">S</span>
                <span><strong>Statement</strong>: Say it directly</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">E</span>
                <span><strong>Example</strong>: Give a specific instance</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="font-bold gold-text min-w-[24px]">E</span>
                <span><strong>Effect</strong>: Explain what you learned and how you've improved</span>
              </li>
            </ul>

            <div className="bg-white border border-gray-200 rounded p-3 mb-3">
              <p className="text-sm text-gray-600 mb-1">Example:</p>
              <p className="text-sm">
                "I take on too much because I struggle to say no. Last quarter, I agreed to 3 major projects simultaneously and ended up working late nights. I've learned to evaluate new requests against my current workload before committing. Last month I completed 3 projects ahead of schedule because I was more strategic about what I accepted."
              </p>
            </div>

            <p className="text-gray-600 text-sm italic">
              Don't say "I'm a perfectionist" or "I work too hard." Pick a real weakness that won't disqualify you.
            </p>
          </div>
        </div>
      </div>

      {/* Page Break before PRACTICE */}
      <div className="page-break"></div>

      {/* PRACTICE Section */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">💬</span>
          </div>
          <div>
            <h2 className="text-2xl font-serif">PRACTICE</h2>
            <p className="gold-text font-medium">4 hours total</p>
          </div>
        </div>

        {/* Hours 1-2 */}
        <div className="mb-8 avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Hours 1-2:</span> Practice Out Loud Alone
          </h3>
          <p className="mb-3">
            Stand in front of a mirror. Answer common questions using your frameworks:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"Tell me about yourself"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"Why do you want this job?"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"Tell me about a time you failed"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"Where do you see yourself in 5 years?"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"Why should we hire you?"</span>
            </li>
          </ul>
          <p className="text-gray-600 italic">
            This feels awkward. Do it anyway. You'll hear what sounds weird and fix it now.
          </p>
        </div>

        {/* Hours 3-4 */}
        <div className="avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Hours 3-4:</span> Mock Interviews
          </h3>
          <p className="mb-3">
            Get a friend, colleague, or family member to interview you. Give them:
          </p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Your resume</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>The job description</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>List of common interview questions</span>
            </li>
          </ul>

          <h4 className="font-semibold mb-2">Rules:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Treat it like it's real</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>No stopping mid-answer</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Feedback at the END only</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Do minimum 2 mock interviews</span>
            </li>
          </ul>

          <p className="gold-text font-semibold">
            This is the most important part. It reveals your weaknesses before they cost you the job.
          </p>
        </div>
      </div>

      {/* Page Break before Day-Of Checklist */}
      <div className="page-break"></div>

      {/* Day-Of Checklist */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-6">
          Day-Of Checklist
        </h2>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Before */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Before:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Arrive 10-15 minutes early (no more, no less)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Turn off your phone</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Review your power examples one last time</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">3 deep breaths: in for 1 second, out for 4 seconds</span>
              </li>
            </ul>
          </div>

          {/* During */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">During:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Strong handshake, eye contact, smile</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">If you need time to think, pause 2-4 seconds</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Watch for engagement cues (nodding, leaning in)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Sit up straight, use natural hand gestures</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Questions to Ask */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-4 avoid-break">
          <h3 className="text-lg font-serif gold-text mb-3">Your Questions to Ask Them:</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"What does success look like in this role in the first 6 months?"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"What are the biggest challenges facing the team?"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>"What do you like most about working here?"</span>
            </li>
          </ul>
        </div>

        {/* Closing */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
          <h3 className="text-lg font-serif gold-text mb-3">Closing:</h3>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Restate your interest: "I'm very interested in this role and would love to move forward"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Ask about next steps</span>
            </li>
          </ul>
          <p className="gold-text font-semibold">
            After: Send thank you email within 24 hours.
          </p>
        </div>
      </div>

      {/* Page Break before Common Mistakes */}
      <div className="page-break"></div>

      {/* Common Mistakes */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-serif">
            Common Mistakes That Kill Offers
          </h2>
        </div>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Talking too much</strong> - Answer the question, then stop</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Trashing previous employers</strong> - Stay diplomatic</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>No specific examples</strong> - Everything needs details and numbers</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Not asking questions</strong> - Shows you don't care</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>No follow-up</strong> - Send that thank you email</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Lying</strong> - They'll find out</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Showing up unprepared</strong> - This guide fixes that</span>
          </li>
        </ul>
      </div>

      {/* Bottom Line */}
      <div className="green-bg text-center py-8 px-8 rounded-lg mb-8">
        <h2 className="cream-text text-2xl font-serif mb-4">
          The Bottom Line
        </h2>
        <p className="cream-text opacity-90 text-lg mb-3">
          Interviewing is a skill. Most people don't prepare enough.
        </p>
        <p className="cream-text opacity-90 text-lg mb-3">
          Do the 10 hours. Use the frameworks. Practice out loud.
        </p>
        <p className="text-xl gold-text font-serif">
          Your competition isn't doing this.
        </p>
      </div>

      {/* Need More Help */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-6 text-center">
          Need More Help?
        </h2>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
            <h3 className="font-semibold mb-2">Resume Reviews</h3>
            <p className="text-gray-600">
              I review 5 resumes per month for free using an exhaustive report. <span className="gold-text">Join the waitlist here.</span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
            <h3 className="font-semibold mb-2">Full Career Package</h3>
            <p className="text-gray-600">
              If you want the complete package - resume, LinkedIn optimization, interview preparation, salary negotiation coaching - I'm testing this product at a discounted rate right now.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-3">
            Email <span className="gold-text">james@jamesbugden.com</span> or message me on LinkedIn or Threads to find out more.
          </p>
          <p className="text-sm text-gray-600 italic">
            This guide is based on Sam Owens' "I Hate Job Interviews" methodology. Support the author - his book is the best resource on interviewing I've read.
          </p>
        </div>
      </div>

      {/* Save This Guide */}
      <div className="text-center py-8 border-t border-gray-200">
        <h2 className="text-2xl font-serif mb-3">
          Save This Guide
        </h2>
        <p className="text-gray-600">
          Download the PDF to reference before your next interview.
        </p>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-200 text-sm text-gray-500">
        <p>© 2024 James Bugden. All rights reserved.</p>
      </div>
    </div>
  );
};

export default InterviewPrepGuidePrint;
