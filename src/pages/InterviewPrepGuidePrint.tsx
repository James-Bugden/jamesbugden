import { Download } from "lucide-react";

const InterviewPrepGuidePrint = () => {
  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/The_10-Hour_Interview_Prep_System.pdf';
    link.download = 'The_10-Hour_Interview_Prep_System.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      {/* Print Controls - Hidden in Print */}
      <div className="print-controls fixed top-4 right-4 z-50 flex gap-3 print:hidden">
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-4 py-2 bg-[#1a2e1a] text-[#c9a227] rounded-lg hover:bg-[#243324] transition-colors"
        >
          <Download className="w-4 h-4" />
          Download PDF
        </button>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 px-4 py-2 bg-[#c9a227] text-[#1a2e1a] rounded-lg hover:bg-[#d4af37] transition-colors font-semibold"
        >
          Print / Export PDF
        </button>
      </div>

      {/* Report Container */}
      <div className="report">
        
        {/* Page 1: Cover */}
        <div className="page cover-page">
          <div className="page-content flex flex-col justify-center items-center h-full text-center">
            <p className="text-sm uppercase tracking-[0.3em] text-[#666] mb-8">Career Preparation Guide</p>
            <h1 className="text-5xl font-bold text-[#1a2e1a] mb-6 leading-tight">
              The 10-Hour<br />Interview Prep<br />System
            </h1>
            <div className="w-24 h-1 bg-[#c9a227] my-8"></div>
            <p className="text-xl text-[#444] max-w-md mb-4">
              The Checklist You Need to Prepare For The Interview
            </p>
            <p className="text-base text-[#666] italic max-w-lg mb-8">
              Based on Sam Owens' "I Hate Job Interviews" methodology, adapted with insider recruiting knowledge from 500+ hires and 20,000+ resume reviews.
            </p>
            <p className="mt-auto text-sm text-[#888]">James Bugden • Senior Recruiter at Uber</p>
          </div>
        </div>

        {/* Page 2: Why This Works */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Why This Works</h2>
            <p className="text-lg text-[#333] mb-6 leading-relaxed">
              I've hired 500+ people in my career. The candidates who get offers aren't always the most qualified.
            </p>
            <p className="text-2xl font-semibold text-[#c9a227] mb-8">
              They're the most prepared.
            </p>
            <p className="text-lg text-[#333] mb-6 leading-relaxed">
              Most people spend 1 hour preparing. You're about to spend 10.
            </p>
            <p className="text-2xl font-bold text-[#1a2e1a]">
              That's your advantage.
            </p>
          </div>
        </div>

        {/* Page 3: The Breakdown Overview */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Your 10-Hour Breakdown</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">3h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Research</h3>
                  <p className="text-[#666]">Company basics and talking to employees</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">3h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Formulation</h3>
                  <p className="text-[#666]">Building power examples and learning the 3 answer frameworks</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">4h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Practice</h3>
                  <p className="text-[#666]">Practice out loud alone and mock interviews</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 4: Research - Hour 1 */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Research • 3 Hours Total</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Hour 1: Company Basics</h2>
            
            <ul className="space-y-4 text-lg text-[#333]">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Company history and mission</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Products/services (actually use them if possible)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Recent news (last 3 months)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Financials (revenue, growth - basics only)</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Page 5: Research - Hours 2-3 */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Research • 3 Hours Total</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Hours 2-3: Talk to Employees</h2>
            
            <p className="text-lg text-[#333] mb-6">
              <span className="font-semibold text-[#c9a227]">This is your secret weapon.</span> Reach out to 5-10 people on LinkedIn who work there:
            </p>

            <div className="bg-[#f8f6f0] p-6 rounded-lg mb-8">
              <p className="text-sm text-[#666] mb-2">Message template:</p>
              <p className="text-[#333] italic">
                "Hey [name], I'm interviewing for [role] at [company]. Would you have 15 minutes to share your experience?"
              </p>
            </div>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Questions to ask:</h3>
            <ul className="space-y-3 text-lg text-[#333] mb-6">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>What's the culture really like?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>What does success look like in this role?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>What challenges is the team facing?</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>What advice for someone interviewing?</span>
              </li>
            </ul>

            <p className="text-[#666] italic">
              Most will ignore you. You only need 1-2 to say yes.
            </p>
          </div>
        </div>

        {/* Page 6: Formulation - Hour 1 Power Examples */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Formulation • 3 Hours Total</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Hour 1: Build Your Power Examples</h2>
            
            <p className="text-lg text-[#333] mb-6">
              Create 7-10 stories that prove you can do the job.
            </p>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-3">How:</h3>
            <ol className="space-y-2 text-lg text-[#333] list-decimal list-inside mb-6">
              <li>Read the job description</li>
              <li>Identify the top 7-10 skills they want</li>
              <li>Match ONE story from your experience to each skill</li>
            </ol>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-3">Each story needs:</h3>
            <ul className="space-y-3 text-lg text-[#333]">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Specific timeframe ("Q2 2024" not "recently")</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Numbers and metrics</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>What YOU did (not just "the team")</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Measurable results</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Page 7: Power Examples - Good vs Bad */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Formulation • Power Examples</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Good vs Bad Examples</h2>
            
            <div className="bg-[#e8f5e9] border-l-4 border-[#2e7d32] p-6 rounded-lg mb-6">
              <p className="font-semibold text-[#2e7d32] mb-3">✓ Good example:</p>
              <p className="text-[#333] text-base leading-relaxed">
                "In Q2 2024, I led a cross-functional team of 5 engineers and 2 designers to launch our new mobile checkout feature. We had a 6-week deadline. Week 4, we hit a major technical blocker with the payment API integration that threatened to delay launch. I brought in a senior backend engineer, reprioritized non-critical features to post-launch, and restructured our sprint to focus solely on the blocker. We shipped on time and saw a 35% increase in mobile conversion rates within 30 days, adding roughly $200K in monthly revenue."
              </p>
            </div>

            <div className="bg-[#ffebee] border-l-4 border-[#c62828] p-6 rounded-lg">
              <p className="font-semibold text-[#c62828] mb-3">✗ Bad example:</p>
              <p className="text-[#333] text-base">
                "I often work with teams and solve problems."
              </p>
            </div>
          </div>
        </div>

        {/* Page 8: Framework 1 - SPAR */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Formulation • Hours 2-3</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-2">Learn the 3 Answer Frameworks</h2>
            <h3 className="text-2xl font-bold text-[#c9a227] mb-6">Framework 1: SPAR</h3>
            
            <p className="text-[#666] italic mb-6">For "Tell me about a time..." questions</p>

            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">S</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Situation (10-15 seconds)</p>
                  <p className="text-[#666]">Set the scene</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">P</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Problem (15-20 seconds)</p>
                  <p className="text-[#666]">What was the challenge?</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">A</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Action (60-90 seconds)</p>
                  <p className="text-[#666]">What YOU did (use 3 steps)</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">R</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Result (15-20 seconds)</p>
                  <p className="text-[#666]">Quantify the outcome</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 9: Framework 2 - Home Base */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Formulation • Answer Frameworks</p>
            <h3 className="text-2xl font-bold text-[#c9a227] mb-4">Framework 2: Home Base</h3>
            
            <p className="text-[#666] italic mb-6">For "How would you approach..." questions (These are the hardest because they're hypothetical)</p>

            <div className="space-y-6 mb-8">
              <div>
                <p className="font-semibold text-[#1a2e1a] mb-2">Step 1 - Establish (20-30 sec): Give your framework</p>
                <ul className="space-y-1 text-[#333] ml-4">
                  <li>"I'd approach this in three phases..."</li>
                  <li>"There are four key areas I'd look at..."</li>
                  <li>"My process would involve three steps..."</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold text-[#1a2e1a]">Step 2 - Explore (60-90 sec each): Go through each part with details</p>
              </div>
              <div>
                <p className="font-semibold text-[#1a2e1a]">Step 3 - Summarize (15-20 sec): Restate your framework</p>
              </div>
            </div>

            <div className="bg-[#f8f6f0] p-5 rounded-lg">
              <p className="text-sm text-[#666] mb-2">Example:</p>
              <p className="text-[#333] text-sm leading-relaxed">
                "I'd break my first 90 days into three phases: Learn, Contribute, and Scale. In the Learn phase (days 1-30), I'd meet stakeholders and identify quick wins. In the Contribute phase (days 31-60), I'd execute those wins to build credibility. In the Scale phase (days 61-90), I'd implement larger initiatives. So in summary: Learn, Contribute, Scale."
              </p>
            </div>
          </div>
        </div>

        {/* Page 10: Framework 3 - SEE */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Formulation • Answer Frameworks</p>
            <h3 className="text-2xl font-bold text-[#c9a227] mb-4">Framework 3: SEE</h3>
            
            <p className="text-[#666] italic mb-6">For "What's your biggest weakness?" questions</p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">S</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Statement</p>
                  <p className="text-[#666]">Say it directly</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">E</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Example</p>
                  <p className="text-[#666]">Give a specific instance</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl font-bold text-[#c9a227]">E</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Effect</p>
                  <p className="text-[#666]">Explain what you learned and how you've improved</p>
                </div>
              </div>
            </div>

            <div className="bg-[#f8f6f0] p-5 rounded-lg mb-6">
              <p className="text-sm text-[#666] mb-2">Example:</p>
              <p className="text-[#333] text-sm leading-relaxed">
                "I take on too much because I struggle to say no. Last quarter, I agreed to 3 major projects simultaneously and ended up working late nights. I've learned to evaluate new requests against my current workload before committing. Last month I completed 3 projects ahead of schedule because I was more strategic about what I accepted."
              </p>
            </div>

            <p className="text-[#666] italic text-sm">
              Don't say "I'm a perfectionist" or "I work too hard." Pick a real weakness that won't disqualify you.
            </p>
          </div>
        </div>

        {/* Page 11: Practice - Hours 1-2 */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Practice • 4 Hours Total</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Hours 1-2: Practice Out Loud Alone</h2>
            
            <p className="text-lg text-[#333] mb-6">
              Stand in front of a mirror. Answer common questions using your frameworks:
            </p>

            <ul className="space-y-3 text-lg text-[#333] mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>"Tell me about yourself"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>"Why do you want this job?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>"Tell me about a time you failed"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>"Where do you see yourself in 5 years?"</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>"Why should we hire you?"</span>
              </li>
            </ul>

            <p className="text-[#666] italic">
              This feels awkward. Do it anyway. You'll hear what sounds weird and fix it now.
            </p>
          </div>
        </div>

        {/* Page 12: Practice - Hours 3-4 */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Practice • 4 Hours Total</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Hours 3-4: Mock Interviews</h2>
            
            <p className="text-lg text-[#333] mb-6">
              Get a friend, colleague, or family member to interview you. Give them:
            </p>

            <ul className="space-y-3 text-lg text-[#333] mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Your resume</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>The job description</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>List of common interview questions</span>
              </li>
            </ul>

            <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Rules:</h3>
            <ul className="space-y-3 text-lg text-[#333] mb-8">
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Treat it like it's real</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>No stopping mid-answer</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Feedback at the END only</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-[#c9a227] text-xl">✓</span>
                <span>Do minimum 2 mock interviews</span>
              </li>
            </ul>

            <p className="text-[#c9a227] font-semibold text-lg">
              This is the most important part. It reveals your weaknesses before they cost you the job.
            </p>
          </div>
        </div>

        {/* Page 13: Day-Of Checklist - Before & During */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Day-Of Checklist</h2>
            
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div className="bg-[#f8f6f0] p-5 rounded-lg">
                <h3 className="text-xl font-bold text-[#c9a227] mb-4">Before:</h3>
                <ul className="space-y-3 text-[#333]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Arrive 10-15 minutes early (no more, no less)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Turn off your phone</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Review your power examples one last time</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">3 deep breaths: in for 1 second, out for 4 seconds</span>
                  </li>
                </ul>
              </div>

              <div className="bg-[#f8f6f0] p-5 rounded-lg">
                <h3 className="text-xl font-bold text-[#c9a227] mb-4">During:</h3>
                <ul className="space-y-3 text-[#333]">
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Strong handshake, eye contact, smile</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">If you need time to think, pause 2-4 seconds</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Watch for engagement cues (nodding, leaning in)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#c9a227]">✓</span>
                    <span className="text-sm">Sit up straight, use natural hand gestures</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-[#f8f6f0] p-5 rounded-lg">
              <h3 className="text-xl font-bold text-[#c9a227] mb-4">Your Questions to Ask Them:</h3>
              <ul className="space-y-3 text-[#333]">
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">✓</span>
                  <span>"What does success look like in this role in the first 6 months?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">✓</span>
                  <span>"What are the biggest challenges facing the team?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#c9a227]">✓</span>
                  <span>"What do you like most about working here?"</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page 14: Day-Of Checklist - Closing */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Day-Of Checklist</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Closing</h2>
            
            <div className="bg-[#f8f6f0] p-6 rounded-lg mb-8">
              <ul className="space-y-4 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227] text-xl">✓</span>
                  <span>Restate your interest: "I'm very interested in this role and would love to move forward"</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227] text-xl">✓</span>
                  <span>Ask about next steps</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a2e1a] p-6 rounded-lg">
              <p className="text-[#c9a227] font-bold text-xl">
                After: Send thank you email within 24 hours.
              </p>
            </div>
          </div>
        </div>

        {/* Page 15: Common Mistakes */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Common Mistakes That Kill Offers</h2>
            
            <div className="space-y-5">
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Talking too much</p>
                  <p className="text-[#666]">Answer the question, then stop</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Trashing previous employers</p>
                  <p className="text-[#666]">Stay diplomatic</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">No specific examples</p>
                  <p className="text-[#666]">Everything needs details and numbers</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Not asking questions</p>
                  <p className="text-[#666]">Shows you don't care</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">No follow-up</p>
                  <p className="text-[#666]">Send that thank you email</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Lying</p>
                  <p className="text-[#666]">They'll find out</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <p className="font-semibold text-[#1a2e1a]">Showing up unprepared</p>
                  <p className="text-[#666]">This guide fixes that</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 16: The Bottom Line */}
        <div className="page">
          <div className="page-content flex flex-col justify-center h-full text-center">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">The Bottom Line</h2>
            
            <p className="text-xl text-[#333] mb-6">
              Interviewing is a skill. Most people don't prepare enough.
            </p>
            <p className="text-xl text-[#333] mb-8">
              Do the 10 hours. Use the frameworks. Practice out loud.
            </p>
            <p className="text-2xl font-bold text-[#c9a227]">
              Your competition isn't doing this.
            </p>
          </div>
        </div>

        {/* Page 17: Need More Help */}
        <div className="page">
          <div className="page-content flex flex-col justify-center items-center h-full text-center">
            <div className="w-24 h-1 bg-[#c9a227] mb-8"></div>
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-6">Need More Help?</h2>

            <div className="text-left max-w-xl mb-10 w-full">
              <div className="mb-8">
                <h3 className="font-semibold text-[#1a2e1a] mb-2">Resume Reviews</h3>
                <p className="text-[#666] leading-relaxed">
                  I review 5 resumes per month for free using an exhaustive report. Join the waitlist here: 
                  <span className="text-[#1a2e1a] underline">https://tally.so/r/Pd1jlB</span>
                </p>
              </div>

              <div className="mb-8">
                <h3 className="font-semibold text-[#1a2e1a] mb-2">Full Career Package</h3>
                <p className="text-[#666] leading-relaxed">
                  If you want the complete package - resume, LinkedIn optimization, interview preparation, salary negotiation coaching - I'm testing this product at a discounted rate right now.
                </p>
              </div>

              <p className="text-[#333] leading-relaxed">
                Email <span className="text-[#1a2e1a] underline">james@jamesbugden.com</span> or message me on LinkedIn or Threads to find out more.
              </p>
            </div>

            <p className="text-sm text-[#888] italic max-w-xl">
              This guide is based on Sam Owens' "I Hate Job Interviews" methodology. Support the author - his book is the best resource on interviewing I've read.
            </p>

            <div className="mt-auto">
              <p className="text-sm text-[#888]">© 2024 James Bugden. All rights reserved.</p>
            </div>
          </div>
        </div>

        {/* Page 18: Save This Guide */}
        <div className="page">
          <div className="page-content flex flex-col justify-center items-center h-full text-center">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-6">Save This Guide</h2>
            <p className="text-xl text-[#333] mb-10 max-w-xl leading-relaxed">
              Download the PDF to reference before your next interview.
            </p>

            <div className="bg-[#f8f6f0] p-8 rounded-lg max-w-xl w-full">
              <p className="text-[#666] mb-3">Download:</p>
              <p className="text-[#1a2e1a] font-semibold">
                The_10-Hour_Interview_Prep_System.pdf
              </p>
            </div>

            <p className="mt-10 text-sm text-[#666]">
              Tip: In Chrome, go to Print → Save as PDF, paper size A4, margins None, scale 100%, background graphics ON.
            </p>
          </div>
        </div>

      </div>

      {/* Print Styles */}
      <style>{`
        @media screen {
          .report {
            max-width: 794px;
            margin: 0 auto;
            padding: 40px 20px;
            background: #f5f5f5;
          }
          
          .page {
            background: white;
            margin-bottom: 40px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.1);
            border-radius: 4px;
          }
        }

        .page {
          width: 794px;
          min-height: 1123px;
          padding: 0;
          box-sizing: border-box;
          page-break-after: always;
          page-break-inside: avoid;
        }

        .page:last-child {
          page-break-after: auto;
        }

        .page-content {
          padding: 80px 72px;
          min-height: calc(1123px - 160px);
        }

        .cover-page .page-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding-top: 160px;
          padding-bottom: 80px;
        }

        @media print {
          @page {
            size: A4;
            margin: 0;
          }

          html, body {
            width: 210mm;
            height: auto;
          }

          .report {
            max-width: none;
            margin: 0;
            padding: 0;
            background: white;
          }

          /* IMPORTANT: don't force a fixed height — it can clip content during "Save as PDF" */
          .page {
            width: 210mm;
            height: auto;
            min-height: 297mm;
            margin: 0;
            box-shadow: none;
            border-radius: 0;
            page-break-after: always;
            page-break-inside: avoid;
            overflow: visible;
          }

          .page-content {
            padding: 20mm 18mm;
            min-height: auto;
          }

          .cover-page .page-content {
            padding-top: 50mm;
            padding-bottom: 20mm;
          }

          .print-controls {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
};

export default InterviewPrepGuidePrint;
