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
            <p className="text-xl text-[#444] max-w-md">
              A structured approach to interview preparation that actually works
            </p>
            <p className="mt-auto text-sm text-[#888]">James Bugden • Career Coach</p>
          </div>
        </div>

        {/* Page 2: Why This Works */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Why This Works</h2>
            <p className="text-lg text-[#333] mb-6 leading-relaxed">
              Most candidates either over-prepare (spending 40+ hours memorizing scripts) 
              or under-prepare (winging it because they're "good at talking").
            </p>
            <p className="text-lg text-[#333] mb-8 leading-relaxed">
              Both approaches fail.
            </p>
            <div className="bg-[#f8f6f0] p-8 rounded-lg border-l-4 border-[#c9a227]">
              <p className="text-xl font-semibold text-[#1a2e1a] mb-4">
                The 10-hour system gives you:
              </p>
              <ul className="space-y-3 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227] font-bold">→</span>
                  <span>Enough structure to feel confident</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227] font-bold">→</span>
                  <span>Enough flexibility to sound natural</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227] font-bold">→</span>
                  <span>Focus on what actually moves the needle</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page 3: The Breakdown Overview */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">The 10-Hour Breakdown</h2>
            <div className="space-y-6">
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">3h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Research</h3>
                  <p className="text-[#666]">Company, role, and interviewer deep-dive</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">4h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Formulation</h3>
                  <p className="text-[#666]">Crafting your stories and key messages</p>
                </div>
              </div>
              <div className="flex items-center gap-6 p-6 bg-[#f8f6f0] rounded-lg">
                <div className="w-16 h-16 bg-[#1a2e1a] rounded-full flex items-center justify-center">
                  <span className="text-2xl font-bold text-[#c9a227]">3h</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Practice</h3>
                  <p className="text-[#666]">Rehearsal and refinement</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 4: Research Phase */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 1</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Research (3 Hours)</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Company Research (1.5 hours)</h3>
              <ul className="space-y-3 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Mission, values, and recent news</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Products/services and market position</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Culture and working environment</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Recent challenges or opportunities</span>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Role Research (1 hour)</h3>
              <ul className="space-y-3 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Key responsibilities and expectations</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Required skills and experience</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Success metrics for the position</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page 5: Research Phase Continued */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 1 (continued)</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Interviewer Research</h2>
            
            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">LinkedIn Deep-Dive (30 minutes)</h3>
              <ul className="space-y-3 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Career trajectory and background</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Shared connections or experiences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Recent posts or articles they've shared</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Their role in the interview process</span>
                </li>
              </ul>
            </div>

            <div className="bg-[#1a2e1a] p-6 rounded-lg">
              <p className="text-[#c9a227] font-semibold mb-2">Pro Tip</p>
              <p className="text-[#e8e4d9]">
                Don't just collect information—think about how it connects to your story. 
                What problems can you solve for them?
              </p>
            </div>
          </div>
        </div>

        {/* Page 6: Formulation Phase */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 2</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Formulation (4 Hours)</h2>
            
            <p className="text-xl text-[#333] mb-8 leading-relaxed">
              This is where you build your arsenal of stories and talking points.
            </p>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-[#1a2e1a] mb-4">Your Story Bank (2 hours)</h3>
              <p className="text-lg text-[#333] mb-4">
                Prepare 5-7 strong stories that demonstrate:
              </p>
              <ul className="space-y-3 text-lg text-[#333]">
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Leadership and influence</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Problem-solving under pressure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Collaboration and teamwork</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Learning from failure</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-[#c9a227]">•</span>
                  <span>Driving results and impact</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Page 7: Story Structure */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 2 (continued)</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Structure Every Story</h2>
            
            <div className="space-y-6">
              <div className="border-l-4 border-[#c9a227] pl-6">
                <h3 className="text-xl font-bold text-[#1a2e1a]">Situation</h3>
                <p className="text-lg text-[#666]">Set the context briefly (15-20 seconds)</p>
              </div>
              <div className="border-l-4 border-[#c9a227] pl-6">
                <h3 className="text-xl font-bold text-[#1a2e1a]">Task</h3>
                <p className="text-lg text-[#666]">What was your specific responsibility?</p>
              </div>
              <div className="border-l-4 border-[#c9a227] pl-6">
                <h3 className="text-xl font-bold text-[#1a2e1a]">Action</h3>
                <p className="text-lg text-[#666]">What did YOU do? (Be specific)</p>
              </div>
              <div className="border-l-4 border-[#c9a227] pl-6">
                <h3 className="text-xl font-bold text-[#1a2e1a]">Result</h3>
                <p className="text-lg text-[#666]">Quantify the outcome when possible</p>
              </div>
            </div>

            <div className="mt-8 p-6 bg-[#f8f6f0] rounded-lg">
              <p className="text-lg font-semibold text-[#1a2e1a]">
                Each story should be 90 seconds to 2 minutes max.
              </p>
            </div>
          </div>
        </div>

        {/* Page 8: Key Messages */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 2 (continued)</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Your Key Messages</h2>
            
            <p className="text-xl text-[#333] mb-8 leading-relaxed">
              Beyond stories, prepare clear answers for:
            </p>

            <div className="space-y-6">
              <div className="p-6 bg-[#f8f6f0] rounded-lg">
                <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">"Tell me about yourself"</h3>
                <p className="text-[#666]">2-minute career narrative connecting past → present → future</p>
              </div>
              <div className="p-6 bg-[#f8f6f0] rounded-lg">
                <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">"Why this company?"</h3>
                <p className="text-[#666]">Specific reasons tied to your research</p>
              </div>
              <div className="p-6 bg-[#f8f6f0] rounded-lg">
                <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">"Why this role?"</h3>
                <p className="text-[#666]">How it aligns with your skills and goals</p>
              </div>
              <div className="p-6 bg-[#f8f6f0] rounded-lg">
                <h3 className="text-lg font-semibold text-[#1a2e1a] mb-2">"What are your weaknesses?"</h3>
                <p className="text-[#666]">Genuine growth area + what you're doing about it</p>
              </div>
            </div>
          </div>
        </div>

        {/* Page 9: Practice Phase */}
        <div className="page">
          <div className="page-content">
            <p className="text-sm uppercase tracking-widest text-[#c9a227] mb-4">Phase 3</p>
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Practice (3 Hours)</h2>
            
            <p className="text-xl text-[#333] mb-8 leading-relaxed">
              Knowing what to say is different from being able to say it well.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#1a2e1a]">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Solo Practice (1.5 hours)</h3>
                  <p className="text-[#666]">Record yourself. Listen back. Refine.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#1a2e1a]">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Mock Interview (1 hour)</h3>
                  <p className="text-[#666]">Practice with someone who'll give honest feedback.</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-[#c9a227] rounded-full flex items-center justify-center flex-shrink-0">
                  <span className="text-lg font-bold text-[#1a2e1a]">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-[#1a2e1a]">Final Refinement (30 minutes)</h3>
                  <p className="text-[#666]">Polish based on feedback. Don't over-rehearse.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 10: Day-Of Checklist */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Day-Of Checklist</h2>
            
            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Review your story bank one more time</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Check recent company news</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Prepare 3-5 thoughtful questions</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Test your tech (if virtual)</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Arrive 10-15 minutes early</span>
              </div>
              <div className="flex items-center gap-4 p-4 border border-[#e0e0e0] rounded-lg">
                <div className="w-6 h-6 border-2 border-[#c9a227] rounded"></div>
                <span className="text-lg text-[#333]">Breathe. You've prepared. Trust it.</span>
              </div>
            </div>
          </div>
        </div>

        {/* Page 11: Common Mistakes */}
        <div className="page">
          <div className="page-content">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">Common Mistakes to Avoid</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a]">Memorizing scripts word-for-word</h3>
                  <p className="text-[#666]">You'll sound robotic and panic if you forget a line</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a]">Giving generic "company website" answers</h3>
                  <p className="text-[#666]">Show you've done real research, not surface-level browsing</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a]">Talking too much (or too little)</h3>
                  <p className="text-[#666]">Aim for 1-2 minute responses. Check in with the interviewer</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a]">Forgetting to ask questions</h3>
                  <p className="text-[#666]">This signals disinterest. Always have questions ready</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <span className="text-2xl text-red-500">✗</span>
                <div>
                  <h3 className="text-lg font-semibold text-[#1a2e1a]">Not following up</h3>
                  <p className="text-[#666]">Send a thank-you within 24 hours. Reference something specific</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Page 12: The Bottom Line */}
        <div className="page">
          <div className="page-content flex flex-col justify-center h-full">
            <h2 className="text-3xl font-bold text-[#1a2e1a] mb-8">The Bottom Line</h2>
            
            <blockquote className="text-2xl text-[#333] leading-relaxed mb-8 pl-6 border-l-4 border-[#c9a227]">
              "10 hours of focused, strategic preparation beats 40 hours of scattered, anxious cramming every time."
            </blockquote>

            <p className="text-xl text-[#333] leading-relaxed">
              Research deeply. Formulate clearly. Practice deliberately.
            </p>
            <p className="text-xl text-[#333] leading-relaxed mt-4">
              Then walk in with confidence—you've done the work.
            </p>
          </div>
        </div>

        {/* Page 13: Closing */}
        <div className="page">
          <div className="page-content flex flex-col justify-center items-center h-full text-center">
            <div className="w-24 h-1 bg-[#c9a227] mb-8"></div>
            <h2 className="text-2xl font-bold text-[#1a2e1a] mb-4">Need More Help?</h2>
            <p className="text-lg text-[#666] mb-8 max-w-md">
              Get personalized interview coaching and resume reviews to maximize your chances.
            </p>
            <p className="text-xl font-semibold text-[#1a2e1a]">jamesbugden.com</p>
            <div className="mt-auto">
              <p className="text-sm text-[#888]">© James Bugden • Career Coach</p>
            </div>
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
            height: 297mm;
          }

          .report {
            max-width: none;
            margin: 0;
            padding: 0;
            background: white;
          }

          .page {
            width: 210mm;
            height: 297mm;
            min-height: 297mm;
            margin: 0;
            box-shadow: none;
            border-radius: 0;
          }

          .page-content {
            padding: 20mm 18mm;
            min-height: calc(297mm - 40mm);
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
