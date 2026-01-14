import { CheckCircle2, AlertTriangle } from "lucide-react";
import GoldCheckBadge from "@/components/GoldCheckBadge";

const InterviewPreparationGuidePrint = () => {
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
          Full Interview Preparation Guide
        </h1>
        <p className="cream-text opacity-80 text-lg mb-2">
          Stop Stressing. Start Performing. Get the Job.
        </p>
        <p className="cream-text opacity-60 text-base">
          By James Bugden, Senior Recruiter at Uber
        </p>
      </div>

      {/* Framework Note */}
      <div className="bg-gray-100 py-4 px-6 rounded-lg mb-8 text-center">
        <p className="text-sm text-gray-600 italic">
          Framework Attribution: This guide is based on Sam Owens' "I Hate Job Interviews: Stop Stressing. Start Performing. Get the Job You Want" methodology, adapted with my insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
        </p>
      </div>

      {/* Why Most People Fail Interviews */}
      <div className="mb-10 avoid-break">
        <h2 className="text-2xl font-serif mb-4">Why Most People Fail Interviews</h2>
        <p className="text-base mb-3">I've been on both sides of the table.</p>
        <p className="text-base mb-3">I bombed interviews early in my career. Now I've hired 500+ people as a recruiter.</p>
        <p className="text-base mb-3">
          Here's what I learned: <span className="gold-text font-semibold">The best candidate doesn't get the job. The best person at interviewing gets the job.</span>
        </p>
        <p className="text-base mb-3">Good news for you.</p>
        <p className="text-base mb-3">You can beat more qualified candidates if you prepare better. Most people don't prepare enough.</p>
        <p className="text-base mb-3">They prepare 1-2 hours for an interview, prepare the wrong things, and wonder why they didn't get an offer.</p>
        <p className="text-xl font-serif gold-text">Interviewing is a skill. You can learn it. This guide shows you how.</p>
      </div>

      {/* Kill These Lies First */}
      <div className="mb-10 avoid-break">
        <h2 className="text-2xl font-serif mb-4">Kill These Lies First</h2>
        <p className="text-base mb-4">Let's destroy the myths keeping you from interview success.</p>
        
        <div className="space-y-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold mb-1">"Just be yourself"</p>
            <p className="text-gray-600">Which self? The one that binge-watched Netflix all weekend? You have multiple selves. Be your best prepared self.</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold mb-1">"I can't prepare without knowing the questions"</p>
            <p className="text-gray-600">Wrong. There are 5 main question types. You can prepare for all of them.</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold mb-1">"Interviewers are experts"</p>
            <p className="text-gray-600">Most hiring managers get zero training. They're winging it too. Also, most don't do any preparation for the interview beyond looking at your resume.</p>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="font-semibold mb-1">"I lost because someone was more qualified"</p>
            <p className="text-gray-600">Yes, this happens. We can't change how qualified you are compared to others but we can prepare the best we can for the highest chance of success.</p>
          </div>
        </div>
      </div>

      {/* 10-Hour Framework Header */}
      <div className="green-bg text-center py-6 px-8 rounded-lg mb-8">
        <h2 className="cream-text text-2xl font-serif mb-2">The 10-Hour Prep Framework</h2>
        <p className="cream-text opacity-80">Most candidates spend 1 hour preparing. You're about to spend 10 hours. That's your advantage.</p>
      </div>

      {/* Framework Breakdown */}
      <div className="mb-10 avoid-break">
        <div className="grid md:grid-cols-3 gap-4 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-serif mb-1">Research</h3>
            <p className="gold-text font-semibold mb-2">3 Hours</p>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• 1 hour: Company basics</li>
              <li>• 2 hours: Informational interviews with employees</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-serif mb-1">Formulation</h3>
            <p className="gold-text font-semibold mb-2">3 Hours</p>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• 1 hour: Create 7-10 power examples</li>
              <li>• 2 hours: Build frameworks for different question types</li>
            </ul>
          </div>
          
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 text-center">
            <h3 className="text-lg font-serif mb-1">Practice</h3>
            <p className="gold-text font-semibold mb-2">4 Hours</p>
            <ul className="text-sm text-gray-600 text-left space-y-1">
              <li>• 1-2 hours: Practice out loud alone</li>
              <li>• 2 hours: Mock interviews with feedback</li>
            </ul>
          </div>
        </div>
        
        <p className="text-center">10 hours for a job you'll spend 40+ hours/week at for years? <span className="gold-text font-semibold">Yes, I know it's hard but do it.</span></p>
      </div>

      {/* Part 1: Research Phase */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">🎯</span>
          </div>
          <h2 className="text-2xl font-serif">Part 1: The Research Phase</h2>
        </div>

        {/* Company Research */}
        <div className="mb-8 avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Company Research</span> (1 Hour)
          </h3>
          <p className="mb-3">Before you walk in, you need to know:</p>
          <ul className="space-y-2 mb-3">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span><strong>Company history:</strong> Where they've been, where they're going</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span><strong>Mission and values:</strong> These will come up in your answers</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span><strong>Financials:</strong> Revenue, profits, growth trajectory (basics only unless it's a finance role)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span><strong>Products/services:</strong> Actually use the product if you can</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span><strong>Current news:</strong> What's happening with them right now?</span>
            </li>
          </ul>
          <p className="text-gray-600 italic">Most of this is on their website, Wikipedia, or recent news articles.</p>
        </div>

        {/* Inside Information */}
        <div className="avoid-break">
          <h3 className="text-xl font-serif mb-3">
            <span className="gold-text">Inside Information</span> (2 Hours) - Your Secret Weapon
          </h3>
          <p className="mb-3">This separates good candidates from great ones. <span className="font-semibold gold-text">Talk to people who actually work there.</span></p>
          
          <h4 className="font-semibold mb-2">You'll get:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Real insights Google can't give you</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Names to drop in interviews (have people inside the company advocate for you)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Problems the team is actually facing</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Insider language (the jargon they use in the company shows you understand them)</span>
            </li>
          </ul>

          <h4 className="font-semibold mb-2">How to get these conversations:</h4>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li>Search LinkedIn for 1st/2nd degree connections</li>
            <li>Message: "Hey [name], interviewing for [role] at [company]. Can I grab 15 minutes of your time?"</li>
            <li>Ask good questions (below)</li>
            <li>Take notes</li>
            <li>Send thanks</li>
          </ol>

          <p className="text-gray-600 italic mb-4">Note: If you know someone who works in the company or a friend of a friend, talk to them this way.</p>

          <h4 className="font-semibold mb-2">What to ask:</h4>
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
              <span>What do you wish you knew before starting?</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>What advice for someone interviewing?</span>
            </li>
          </ul>

          <p className="text-gray-600 italic">Do 2-3 of these. Will you get rejected a lot? Yes. But you only need to talk to one person to get insider information.</p>
        </div>
      </div>

      {/* Part 2: Formulation Phase */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">💡</span>
          </div>
          <h2 className="text-2xl font-serif">Part 2: The Formulation Phase</h2>
        </div>

        {/* Power Examples */}
        <div className="mb-8 avoid-break">
          <h3 className="text-xl font-serif mb-3">Create Your Power Examples (7-10 Stories)</h3>
          <p className="mb-3">Power examples = stories that prove you can do the job. They're your foundation for every answer.</p>

          <h4 className="font-semibold mb-2">How to pick them:</h4>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li>Read job description</li>
            <li>Find top 7-10 skills they want</li>
            <li>Match one story to each skill</li>
          </ol>

          <h4 className="font-semibold mb-2">Where stories come from:</h4>
          <ul className="mb-4 space-y-1">
            <li>• Previous jobs (best)</li>
            <li>• School projects</li>
            <li>• Volunteer work</li>
            <li>• Side projects</li>
            <li>• Anywhere you've done relevant work</li>
          </ul>

          <h4 className="font-semibold mb-2">Good power examples are:</h4>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <span>Specific ("March 2024, led team of 5" not "I often worked with teams")</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <span>Quantified (numbers, metrics, outcomes)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <span>Recent (last 2-3 years)</span>
            </li>
            <li className="flex items-start gap-3">
              <CheckCircle2 className="w-5 h-5 text-green-700 flex-shrink-0 mt-0.5" />
              <span>About YOU (not just "the team")</span>
            </li>
          </ul>

          <h4 className="font-semibold mb-2">Bad power examples:</h4>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✕</span>
              <span>"I'm a good communicator"</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✕</span>
              <span>"We increased sales" (who's we?)</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="text-red-600 text-xl">✕</span>
              <span>Vague, no numbers, no specifics</span>
            </li>
          </ul>
        </div>

        {/* Example Power Stories */}
        <div className="space-y-4 mb-8">
          <h4 className="text-lg font-serif gold-text">Example Power Stories</h4>
          
          {/* Story 1 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h5 className="font-semibold mb-1">Power Story #1: Leadership</h5>
            <p className="text-sm text-gray-600 mb-2">Skill: Team leadership and project management</p>
            <p className="text-sm mb-2">
              "In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch a new mobile app feature. We had a tight 6-week deadline. I organized daily standups, created a shared project tracker, and assigned clear ownership for each milestone.
            </p>
            <p className="text-sm mb-2">
              When we hit a technical blocker in week 4, I reprioritized tasks and brought in a senior engineer to unblock us. We launched on time, and the feature drove a 35% increase in user engagement within the first month."
            </p>
            <p className="gold-text text-sm italic">Why it works: Specific timeline, clear numbers, shows leadership actions, quantified result.</p>
          </div>

          {/* Story 2 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h5 className="font-semibold mb-1">Power Story #2: Problem-Solving</h5>
            <p className="text-sm text-gray-600 mb-2">Skill: Analytical thinking and data analysis</p>
            <p className="text-sm mb-2">
              "At my last company, our customer support costs increased 40% year-over-year, but nobody knew why. I pulled 6 months of ticket data and discovered that 60% of tickets were about the same 3 issues.
            </p>
            <p className="text-sm mb-2">
              I created a simple knowledge base with solutions to those 3 problems and added links to our product interface. Within 3 months, support tickets dropped 28%, saving the company approximately $45K annually. The knowledge base is still being used today."
            </p>
            <p className="gold-text text-sm italic">Why it works: Identified specific problem, shows analytical approach, concrete financial impact, lasting solution.</p>
          </div>

          {/* Story 3 */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h5 className="font-semibold mb-1">Power Story #3: Communication/Stakeholder Management</h5>
            <p className="text-sm text-gray-600 mb-2">Skill: Working with difficult stakeholders</p>
            <p className="text-sm mb-2">
              "I was managing a marketing campaign when our biggest client suddenly demanded we change the entire creative direction 1 week before launch. The design team was frustrated because they'd already completed the work.
            </p>
            <p className="text-sm mb-2">
              Instead of pushing back immediately, I scheduled a call with the client to understand their concerns. I discovered they'd received negative feedback from their CEO. I worked with our team to create 3 new options that addressed the CEO's feedback while keeping 70% of our original work.
            </p>
            <p className="text-sm mb-2">
              We presented all options, the client chose one, and we delivered on time. They increased their contract value by 30% the following quarter."
            </p>
            <p className="gold-text text-sm italic">Why it works: Shows diplomacy, problem-solving under pressure, specific actions taken, business outcome.</p>
          </div>
        </div>
      </div>

      {/* Page Break before Part 3 */}
      <div className="page-break"></div>

      {/* Part 3: Question Frameworks */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-4">Part 3: Question Frameworks</h2>
        <p className="mb-4">Now that you have your power examples, let's learn how to deploy them for different question types.</p>

        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-6 avoid-break">
          <h4 className="font-semibold mb-2">How many examples should you prepare?</h4>
          <ul className="space-y-1">
            <li>• <strong>Behavioral questions (SPAR):</strong> Prepare 7-10 stories (your power examples)</li>
            <li>• <strong>Scenario questions (Home Base):</strong> Practice 5-7 different frameworks/approaches</li>
            <li>• <strong>About You questions (SEE):</strong> You'll reuse your behavioral stories, just reframe them</li>
          </ul>
          <p className="gold-text mt-3 font-semibold">The beauty of this system: You don't need 50 different stories. Your 7-10 power examples can answer most questions.</p>
        </div>

        {/* Framework 1: SPAR */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 avoid-break">
          <h4 className="text-lg font-serif gold-text mb-2">Framework #1: SPAR Model (For Behavioral Questions)</h4>
          <p className="text-gray-600 mb-3 italic">Behavioral questions ask about your past experiences: "Tell me about a time when...", "Give me an example of...", "Describe a situation where..."</p>
          <p className="mb-3">Use SPAR: <strong>Situation, Problem, Action, Result</strong></p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">S</span>
              <span><strong>Situation</strong> (10-15 seconds): Set the scene. Keep it brief. Don't waste time here.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">P</span>
              <span><strong>Problem</strong> (15-20 seconds): Create tension. This is what makes people want to keep listening.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">A</span>
              <span><strong>Action</strong> (60-90 seconds): This is the meat. Explain what YOU did (not your team). Use the "rule of three" - break your action into 3 steps.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">R</span>
              <span><strong>Result</strong> (15-20 seconds): Quantify the outcome. Tie it in a bow.</span>
            </li>
          </ul>

          <div className="bg-white border border-gray-200 rounded p-3">
            <p className="text-sm text-gray-600 mb-1">Example:</p>
            <p className="text-sm text-gray-600 italic mb-2">Question: "Tell me about a time you solved a complex problem."</p>
            <p className="text-sm mb-1"><strong>Situation:</strong> "Last year at my previous company, I was the account manager for our digital marketing clients."</p>
            <p className="text-sm mb-1"><strong>Problem:</strong> "A few months in, my boss asked me to figure out which clients were most valuable to us. We'd never done this before, and there was no clear definition of 'value.'"</p>
            <p className="text-sm mb-1"><strong>Action:</strong> "I approached this in three steps. First, I created a scorecard with three metrics: revenue, profitability, and credibility score. Second, I calculated hours spent per client and created efficiency ratios. Third, I presented my findings to leadership with recommendations."</p>
            <p className="text-sm"><strong>Result:</strong> "We shifted strategy to focus on our highest-impact clients. Six months later, we grew revenue from those clients by 25%, which was a major contribution to the firm's growth that year."</p>
          </div>
        </div>

        {/* Framework 2: Home Base */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 mb-5 avoid-break">
          <h4 className="text-lg font-serif gold-text mb-2">Framework #2: Home Base Model (For Scenario Questions)</h4>
          <p className="text-gray-600 mb-3 italic">Scenario questions are hypothetical: "How would you approach...?", "What would you do if...?", "How would you handle...?"</p>
          <p className="mb-3">These are the hardest questions because they're wide open.</p>
          <p className="mb-3">Use the Home Base model: <strong>Establish, Explore, Summarize</strong></p>

          {/* Visual Diagram */}
          <div className="bg-white border border-gray-200 rounded p-4 mb-4">
            <p className="text-sm text-gray-600 mb-3 font-medium text-center">Visual Guide: The Home Base Model</p>
            <div className="flex flex-col items-center py-3">
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1 text-center mb-2">
                <p className="gold-text font-semibold text-sm">PATH 1</p>
              </div>
              <div className="w-0.5 h-4 bg-yellow-300"></div>
              <div className="flex items-center justify-center gap-0 w-full max-w-md">
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1 text-center">
                  <p className="gold-text font-semibold text-sm">PATH 2</p>
                </div>
                <div className="h-0.5 w-6 bg-yellow-300"></div>
                <div className="green-bg border-2 border-yellow-500 rounded-lg px-4 py-2 text-center">
                  <p className="gold-text font-bold text-sm">HOME BASE</p>
                </div>
                <div className="h-0.5 w-6 bg-yellow-300"></div>
                <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1 text-center">
                  <p className="gold-text font-semibold text-sm">PATH 3</p>
                </div>
              </div>
              <div className="w-0.5 h-4 bg-yellow-300"></div>
              <div className="bg-yellow-100 border border-yellow-300 rounded-lg px-3 py-1 text-center mt-2">
                <p className="gold-text font-semibold text-sm">PATH 4</p>
              </div>
            </div>
            <p className="text-sm text-center mt-2">
              <span className="gold-text font-semibold">HOME BASE</span> = Your central framework, <span className="gold-text font-semibold">PATHS</span> = Specific ideas branching out
            </p>
          </div>

          <div className="space-y-3 mb-4">
            <div>
              <p className="font-semibold mb-1">Step 1: Establish Your Home Base (20-30 seconds)</p>
              <p className="mb-1">Start with a framework or approach. This is your "map."</p>
              <ul className="text-sm ml-4">
                <li>• "I'd approach this in three phases..."</li>
                <li>• "There are four key areas I'd look at..."</li>
                <li>• "My process would involve three steps..."</li>
              </ul>
            </div>
            <div>
              <p className="font-semibold">Step 2: Explore Each Path (60-90 seconds each)</p>
              <p>Go through each part of your framework. Add details. Show your thinking.</p>
            </div>
            <div>
              <p className="font-semibold">Step 3: Summarize (15-20 seconds)</p>
              <p>Tie it together. Restate your framework.</p>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded p-3">
            <p className="text-sm text-gray-600 mb-1">Example:</p>
            <p className="text-sm text-gray-600 italic mb-2">Question: "How would you approach your first 90 days in this role?"</p>
            <p className="text-sm mb-1"><strong>Establish:</strong> "I'd break my first 90 days into three phases: Learn, Contribute, and Scale."</p>
            <p className="text-sm mb-1"><strong>Explore:</strong> "In the Learn phase (first 30 days), I'd meet with key stakeholders, understand current processes, and identify quick wins. In the Contribute phase (days 31-60), I'd execute on those quick wins to build credibility and start taking on bigger projects. In the Scale phase (days 61-90), I'd start implementing larger initiatives and thinking about long-term strategy."</p>
            <p className="text-sm"><strong>Summarize:</strong> "So in summary: Learn, Contribute, Scale. That's how I'd structure my first quarter."</p>
          </div>
        </div>

        {/* Framework 3: SEE */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-5 avoid-break">
          <h4 className="text-lg font-serif gold-text mb-2">Framework #3: SEE Model (For "About You" Questions)</h4>
          <p className="text-gray-600 mb-3 italic">These questions ask about your qualities: "What's your biggest weakness?", "Why should we hire you?", "What's your work style?"</p>
          <p className="mb-3">Use SEE: <strong>Statement, Example, Effect</strong></p>
          <ul className="space-y-2 mb-4">
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">S</span>
              <span><strong>Statement:</strong> Say it directly. No hedging.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">E</span>
              <span><strong>Example:</strong> Give a specific instance.</span>
            </li>
            <li className="flex items-start gap-3">
              <span className="font-bold gold-text min-w-[24px]">E</span>
              <span><strong>Effect:</strong> Explain why this matters for the role.</span>
            </li>
          </ul>

          <div className="bg-white border border-gray-200 rounded p-3">
            <p className="text-sm text-gray-600 mb-1">Example:</p>
            <p className="text-sm text-gray-600 italic mb-2">Question: "What's your biggest weakness?"</p>
            <p className="text-sm mb-1"><strong>Statement:</strong> "I tend to take on too much because I have a hard time saying no."</p>
            <p className="text-sm mb-1"><strong>Example:</strong> "Last quarter, I agreed to three major projects simultaneously and ended up working late nights to meet all the deadlines."</p>
            <p className="text-sm"><strong>Effect:</strong> "I've learned to be more strategic about what I commit to. Now I evaluate new requests against my current workload and the impact of the work. For this role, that means I'll be focused on the highest-impact projects rather than spreading myself too thin."</p>
          </div>
        </div>
      </div>

      {/* Page Break before Part 4 */}
      <div className="page-break"></div>

      {/* Part 4: Handling Difficult Questions */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">❓</span>
          </div>
          <h2 className="text-2xl font-serif">Part 4: Handling Difficult Questions</h2>
        </div>

        {/* Weakness Questions */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif gold-text mb-3">Weakness Questions</h3>
          <p className="mb-2">Don't say "I'm a perfectionist" or "I work too hard."</p>
          <p className="mb-2">Pick a real weakness that:</p>
          <ol className="list-decimal list-inside mb-3 space-y-1">
            <li>Won't disqualify you</li>
            <li>You're actively fixing</li>
            <li>Shows self-awareness</li>
          </ol>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Template:</p>
            <p className="italic mb-2">"I [weakness], which led to [consequence]. I'm fixing this by [action]. I've already seen [progress]."</p>
            <p className="text-sm text-gray-600 mb-1">Example:</p>
            <p className="text-sm">"I tend to take on too much at once, which led to me missing a deadline last quarter. Now I evaluate new requests against my current workload before committing. Last month I completed three major projects ahead of schedule."</p>
          </div>
        </div>

        {/* Salary Questions */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif gold-text mb-3">Salary Questions</h3>
          <div className="space-y-3">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-1">If they ask first:</p>
              <p>"I'm looking for competitive compensation for this role and market. What's the range you have budgeted?"</p>
            </div>
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
              <p className="font-semibold mb-1">If you must give a number:</p>
              <p>Give a range based on market research, and say "depending on the full compensation package."</p>
            </div>
          </div>
        </div>

        {/* Gap Questions */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif gold-text mb-3">Gap Questions</h3>
          <p className="mb-2">Be honest but brief. Don't over-explain.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="italic">"I took time off to [reason]. During that time I [stayed sharp by...]. Now I'm ready to jump back in."</p>
          </div>
        </div>

        {/* Illegal/Inappropriate Questions */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif gold-text mb-3">Illegal/Inappropriate Questions</h3>
          <p className="mb-2">Some interviewers ask illegal stuff (age, marital status, religion, etc.). Options:</p>
          <ol className="list-decimal list-inside space-y-1">
            <li><strong>Redirect:</strong> "Is there a specific concern about how this relates to the role?"</li>
            <li><strong>Politely decline:</strong> "I'd prefer to focus on my qualifications for the position."</li>
            <li><strong>Just answer</strong> if it's harmless and you don't care</li>
          </ol>
        </div>

        {/* Weird Questions */}
        <div className="avoid-break">
          <h3 className="text-xl font-serif gold-text mb-3">Weird Questions</h3>
          <p className="mb-2">Some interviewers ask wacky stuff ("If you were an animal..."). They want to see how you think.</p>
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="text-sm text-gray-600 mb-1">Template: Answer + "because" + (optional) tie back to job</p>
            <p className="italic">"I'd be a golden retriever because I'm eager to please and work well with others. That's how I approach teamwork at work too."</p>
          </div>
        </div>
      </div>

      {/* Part 5: Your Questions to Ask */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-4">Part 5: Your Questions to Ask</h2>
        <p className="mb-4">Always have 3-5 questions ready. This is your chance to interview THEM.</p>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Questions that make you look good:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">"What does success look like in this role in the first 6 months?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">"What are the biggest challenges facing the team right now?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">"How would you describe the culture here?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">"What do you like most about working here?"</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">"What's your management style?" (if asking the hiring manager)</span>
              </li>
            </ul>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif text-red-600 mb-3">Questions NOT to ask:</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✕</span>
                <span className="text-sm">Anything you could Google (shows you didn't prepare)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✕</span>
                <span className="text-sm">"What does this company do?" (seriously, don't)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-red-600 text-xl">✕</span>
                <span className="text-sm">Only questions about benefits/vacation (looks like you only care about perks)</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Part 6: The Practice Phase */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">💬</span>
          </div>
          <h2 className="text-2xl font-serif">Part 6: The Practice Phase</h2>
        </div>

        <p className="text-xl gold-text font-semibold mb-4">This is where 90% of candidates quit. Don't be them.</p>

        {/* Phase 1 */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif mb-2">
            <span className="gold-text">Phase 1:</span> Read-Through (30-60 min)
          </h3>
          <p className="mb-1">Say your answers out loud.</p>
          <p className="text-gray-600 italic">You'll hear what's awkward. Fix it now.</p>
        </div>

        {/* Phase 2 */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif mb-2">
            <span className="gold-text">Phase 2:</span> Memorize (60-90 min)
          </h3>
          <p>Learn your frameworks and stories.</p>
        </div>

        {/* Phase 3 */}
        <div className="mb-6 avoid-break">
          <h3 className="text-xl font-serif mb-2">
            <span className="gold-text">Phase 3:</span> Mock Interviews (2-3 hours)
          </h3>
          <p className="gold-text font-semibold mb-3">This is the most important part.</p>
          <p className="mb-3">Get someone to interview you. Can be:</p>
          <ul className="mb-4 space-y-1">
            <li>• Friend</li>
            <li>• Colleague</li>
            <li>• Career coach (best)</li>
            <li>• Your spouse</li>
            <li>• AI</li>
          </ul>

          <h4 className="font-semibold mb-2">Mock interview rules:</h4>
          <ol className="list-decimal list-inside mb-4 space-y-1">
            <li>Treat it like it's real</li>
            <li>No stopping mid-answer</li>
            <li>Feedback at the END only</li>
            <li>Do 2 minimum</li>
          </ol>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
            <p className="gold-text font-semibold mb-1">Why practice works:</p>
            <p>It reveals your weaknesses before they cost you the job. That awkward pause? Fix it now, not in the real interview. Most candidates skip this. That's your advantage.</p>
          </div>
        </div>
      </div>

      {/* Page Break before Part 7 */}
      <div className="page-break"></div>

      {/* Part 7: Interview Day */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-yellow-100 flex items-center justify-center">
            <span className="gold-text text-xl">📅</span>
          </div>
          <h2 className="text-2xl font-serif">Part 7: Interview Day</h2>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-6">
          {/* Before */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Before the Interview</h3>
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Get there 10-15 minutes early (no more, no less)</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Turn off your phone</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Use the bathroom</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Review your power examples one last time</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span className="text-sm">Take 3 deep breaths: breathe in 1 second, breathe out 4 seconds, repeat</span>
              </li>
            </ul>
          </div>

          {/* During */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">During the Interview</h3>
            <p className="text-sm font-semibold mb-1">First impression tips:</p>
            <ul className="space-y-1 mb-3 text-sm">
              <li>• Strong handshake</li>
              <li>• Eye contact</li>
              <li>• Smile</li>
              <li>• Mirror their energy level</li>
            </ul>
            <p className="text-sm font-semibold mb-1">During questions:</p>
            <ul className="space-y-1 text-sm">
              <li>• Pause 2-4 seconds before answering (shows you're thinking)</li>
              <li>• If you don't understand, ask them to clarify</li>
              <li>• It's ok to say "That's a great question, let me think for a second"</li>
              <li>• Watch for engagement cues (nodding, leaning in)</li>
            </ul>
          </div>
        </div>

        {/* Body Language */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 avoid-break">
          <h3 className="text-lg font-serif gold-text mb-3">Body Language</h3>
          <div className="grid md:grid-cols-2 gap-3">
            <ul className="space-y-2">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span>Sit up straight</span>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <span>Don't cross your arms</span>
              </li>
            </ul>
            <ul className="space-y-2">
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
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 mb-4 avoid-break">
          <h3 className="text-lg font-serif gold-text mb-3">Closing</h3>
          <ul className="space-y-2">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Ask your questions</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Restate your interest: "I'm very interested in this role and would love to move forward"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span>Ask about next steps</span>
            </li>
          </ul>
        </div>

        {/* After */}
        <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
          <h3 className="text-lg font-serif gold-text mb-3">After the Interview</h3>
          <p className="mb-3">Send a thank you email within 24 hours.</p>
          <div className="bg-white border border-gray-200 rounded p-3">
            <p className="text-sm text-gray-600 mb-1">Template:</p>
            <p className="text-sm mb-1">Hi [Name],</p>
            <p className="text-sm mb-1">Thank you for taking the time to speak with me today about the [role] position.</p>
            <p className="text-sm mb-1">I really enjoyed learning about [specific thing they mentioned] and I'm excited about the opportunity to [specific contribution you'd make].</p>
            <p className="text-sm mb-1">[Optional: Reference to something personal you connected on]</p>
            <p className="text-sm mb-1">I look forward to hearing about next steps.</p>
            <p className="text-sm">Best,<br />[Your name]</p>
          </div>
        </div>
      </div>

      {/* Common Mistakes */}
      <div className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-full bg-red-100 flex items-center justify-center">
            <AlertTriangle className="w-5 h-5 text-red-600" />
          </div>
          <h2 className="text-2xl font-serif">Common Mistakes That Kill Offers</h2>
        </div>

        <ul className="space-y-3">
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Talking too much</strong> - Answer the question. Then stop.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Trashing previous employers</strong> - Stay diplomatic.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>No specific examples</strong> - Everything needs details.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Not asking questions</strong> - Shows you don't care.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>No follow-up</strong> - Send that thank you email.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Lying</strong> - They'll find out. Don't.</span>
          </li>
          <li className="flex items-start gap-3">
            <span className="text-red-600 text-xl">✕</span>
            <span><strong>Showing up unprepared</strong> - If you don't care to prep, they won't care to hire.</span>
          </li>
        </ul>
      </div>

      {/* Quick Reference Cheat Sheet */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-6">Quick Reference Cheat Sheet</h2>

        <div className="grid md:grid-cols-2 gap-4 mb-4">
          {/* Pre-Interview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Pre-Interview Checklist</h3>
            <ul className="space-y-1 text-sm">
              <li>☐ Research company (1 hour)</li>
              <li>☐ Informational interviews (2 hours)</li>
              <li>☐ Create 7-10 power examples (1 hour)</li>
              <li>☐ Prepare SPAR stories (1 hour)</li>
              <li>☐ Prepare scenario frameworks (1 hour)</li>
              <li>☐ Practice out loud (1 hour)</li>
              <li>☐ Mock interview #1 (1 hour)</li>
              <li>☐ Mock interview #2 (1 hour)</li>
              <li>☐ Prepare questions to ask (30 min)</li>
              <li>☐ Plan outfit (15 min)</li>
            </ul>
          </div>

          {/* Day-Of */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Day-Of Checklist</h3>
            <ul className="space-y-1 text-sm">
              <li>☐ Review power examples</li>
              <li>☐ Arrive 10-15 min early</li>
              <li>☐ Phone on silent</li>
              <li>☐ Bring printed resume</li>
              <li>☐ Bring notebook</li>
              <li>☐ Smile and make eye contact</li>
            </ul>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {/* Online Interviews */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Online Interviews</h3>
            <ul className="space-y-1 text-sm">
              <li>☐ Test your internet connection</li>
              <li>☐ Audio</li>
              <li>☐ Video</li>
              <li>☐ No clutter in the background</li>
              <li>☐ Make sure you are in a quiet place</li>
              <li>☐ The camera should be level with your face</li>
            </ul>
          </div>

          {/* Post-Interview */}
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="text-lg font-serif gold-text mb-3">Post-Interview Checklist</h3>
            <ul className="space-y-1 text-sm">
              <li>☐ Send thank you email within 24 hours</li>
              <li>☐ Note what went well/needs improvement</li>
              <li>☐ Follow up if no response by their timeline</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Final Thoughts */}
      <div className="green-bg text-center py-8 px-8 rounded-lg mb-8">
        <h2 className="cream-text text-2xl font-serif mb-4">Final Thoughts</h2>
        <p className="cream-text opacity-90 text-lg mb-3">
          I've seen incredibly talented people bomb interviews. Many times it's because they haven't prepared or didn't have feedback on how to act in interviews.
        </p>
        <p className="cream-text opacity-90 text-lg mb-3">
          I've seen average candidates get offers. They showed up ready.
        </p>
        <p className="cream-text opacity-90 text-lg mb-3">
          Interviewing is a skill. Practice makes you better.
        </p>
        <p className="text-xl gold-text font-serif">
          Use this guide. Do the 10 hours. Watch your interview performance transform.
        </p>
      </div>

      {/* Need More Help */}
      <div className="mb-10">
        <h2 className="text-2xl font-serif mb-6 text-center">Want Personalized Help?</h2>
        
        <div className="space-y-4 mb-6">
          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="font-semibold mb-1">Resume Reviews</h3>
            <p className="text-gray-600">
              I review 5 resumes per month for free using an exhaustive report. <span className="gold-text">Join the waitlist here.</span>
            </p>
          </div>

          <div className="bg-gray-50 border border-gray-200 rounded-lg p-4 avoid-break">
            <h3 className="font-semibold mb-1">1-on-1 Coaching</h3>
            <p className="text-gray-600">
              I offer 1-on-1 coaching and resume reviews for professionals targeting high-paying roles.
            </p>
          </div>
        </div>

        <div className="text-center">
          <p className="mb-3">
            Email <span className="gold-text">james@jamesbugden.com</span> for more information.
          </p>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-200 text-sm text-gray-500">
        <p>© 2024 James Bugden. All rights reserved.</p>
      </div>
    </div>
  );
};

export default InterviewPreparationGuidePrint;
