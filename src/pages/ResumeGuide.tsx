import { CheckCircle, XCircle, ArrowLeft, Download } from "lucide-react";
import { Link } from "react-router-dom";

const ResumeGuide = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-primary text-primary-foreground py-8">
        <div className="container mx-auto px-4">
          <Link to="/" className="inline-flex items-center gap-2 text-primary-foreground/80 hover:text-primary-foreground mb-4 transition-colors">
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Link>
          <h1 className="text-3xl md:text-4xl font-bold">The Job-Winning Resume Guide</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 max-w-4xl">
        {/* 5-Minute Resume Audit Checklist */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-3xl">🎯</span> The 5-Minute Resume Audit Checklist
          </h2>
          <p className="text-muted-foreground mb-8">Run through this checklist and honestly assess your current resume:</p>

          {/* First Impressions */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">✓ First Impressions (0-6 seconds)</h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Clean layout</strong> - If it looks like a design project, it's wrong</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Contact info is complete</strong> - Phone, email, LinkedIn (all working and professional)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>One page</strong> for &lt;10 years experience, two pages max otherwise</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Standard font</strong> - Arial, Calibri, or Helvetica (10-12pt)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>White space</strong> - I need to scan it in 6 seconds. Make it easy on me</span>
              </li>
            </ul>
          </div>

          {/* Content Strength */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">✓ Content Strength (The meat)</h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Strong summary</strong> - 2-3 lines that sell your value, not just describe you</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Results over responsibilities</strong> - "Increased sales by 30%" not "Responsible for sales"</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Numbers everywhere</strong> - Numbers, percentages, dollar amounts wherever possible</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Tailored to the job</strong> - Keywords from the job description are strategically placed</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>No generic buzzwords</strong> - "Team player," "hard worker," "detail-oriented" without proof = instant no</span>
              </li>
            </ul>
          </div>

          {/* ATS-Friendly */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">✓ ATS-Friendly</h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Standard section headings</strong> - "Experience," "Education," "Skills"</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Skills match job description</strong> - Use exact terminology from the posting</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Simple formatting</strong> - Bullet points are fine, but avoid complex formatting or images. No tables or text boxes—modern ATS can read them but parse inconsistently. Why risk it?</span>
              </li>
            </ul>
          </div>

          {/* Red Flag Check */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">✓ Red Flag Check</h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Zero typos</strong> - Use Grammarly or ChatGPT to proofread. One typo in your header = instant reject</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Employment gaps</strong> - If you have many gaps or short tenures (1 year each), briefly explain why in one line</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Consistent dates</strong> - Pick one style and stick to it</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Relevant experience first</strong> - Remove irrelevant stuff from 10+ years ago. Lead with what matters for THIS job</span>
              </li>
            </ul>
          </div>

          {/* Final Polish */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-4 text-primary">✓ The Final Polish</h3>
            <ul className="space-y-2 text-foreground/90">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>Professional email</strong> - firstname.lastname@email.com (yes, I judge partygirl99@)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>LinkedIn URL customized</strong> - Use linkedin.com/in/yourname (not the random number version)</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>File naming</strong> - "FirstName_LastName_Resume.pdf" not "Resume Final v3.docx". When I download 50 resumes, I need to know whose is whose</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                <span><strong>PDF format</strong> - Unless specifically asked for Word doc</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-16">
          <h2 className="text-2xl md:text-3xl font-bold mb-8 flex items-center gap-3">
            <span className="text-3xl">🚫</span> Common Mistakes That Kill Applications
          </h2>

          {/* Mistake 1 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #1: The Generic Resume Spray-and-Pray</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>WHAT NOT TO DO:</strong> Using the exact same resume for every job application without customization.</span>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>WHAT TO DO INSTEAD:</strong> Customize your resume for each type of role by:</span>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Using keywords from the job description (especially in your summary and skills)</li>
                <li>• Highlighting relevant experience first</li>
                <li>• Adjusting your bullet points to match what they're looking for</li>
                <li>• Showing you understand their industry/company</li>
              </ul>
              <p className="mt-3 text-muted-foreground text-sm">You don't need to create a new resume for every application but if it is a different job type ex. Sales vs Operations, then you will need to create a new version.</p>
            </div>
          </div>

          {/* Mistake 2 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #2: Vague, Responsibility-Focused Bullets</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT NOT TO DO:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• "Responsible for managing social media accounts"</li>
                <li>• "Handled customer service inquiries"</li>
                <li>• "Worked on team projects"</li>
              </ul>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT TO DO INSTEAD:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• "Grew Instagram following from 2K to 15K in 6 months, increasing engagement by 140%"</li>
                <li>• "Resolved 95% of customer issues on first contact, maintaining 4.9/5 satisfaction rating"</li>
                <li>• "Led cross-functional team of 5 to deliver $2M project 3 weeks ahead of schedule"</li>
              </ul>
              <div className="mt-4 p-4 bg-muted rounded-lg">
                <p className="font-medium mb-2">Pro tip: Use the formula: Action Verb + What You Did + Quantified Result</p>
                <p className="text-sm text-muted-foreground">You can use either of these frameworks:</p>
                <ul className="text-sm text-muted-foreground mt-1">
                  <li>• <strong>CAR</strong> (Challenge you faced, Action you took, Result you achieved)</li>
                  <li>• <strong>XYZ</strong> (Accomplished X as measured by Y, by doing Z)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mistake 3 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #3: The Wall of Text</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>WHAT NOT TO DO:</strong> Dense paragraphs, no white space, tiny fonts, cramming everything onto one page at the expense of readability.</span>
              </div>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT TO DO INSTEAD:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Use bullet points (3-5 per role maximum)</li>
                <li>• Keep bullets to 1-2 lines each</li>
                <li>• Add space between sections</li>
                <li>• Use standard 10-12pt font</li>
                <li>• Leave enough space on the page so it is easy to read</li>
              </ul>
            </div>
          </div>

          {/* Mistake 4 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #4: Outdated or Irrelevant Information</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT NOT TO DO:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Including your full address (city, country is enough)</li>
                <li>• Listing "Microsoft Office" as a skill in 2024</li>
                <li>• 'References available upon request' (companies assume this, it's wasted space)</li>
                <li>• Objective statements (you applied for the position so it's assumed that you want this job)</li>
                <li>• Jobs from 10+ years ago that aren't relevant</li>
              </ul>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span><strong>WHAT TO DO INSTEAD:</strong> Focus on what matters NOW for the job you're applying for. Keep it relevant, recent, and results-driven.</span>
              </div>
            </div>
          </div>

          {/* Mistake 5 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #5: Lying or Exaggerating</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT NOT TO DO:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Inflating job titles</li>
                <li>• Claiming skills you don't have</li>
                <li>• Extending employment dates to hide gaps</li>
                <li>• Taking credit for team achievements as solely your own</li>
              </ul>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT TO DO INSTEAD:</strong> Be honest but strategic:
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• "Contributing team member on project that achieved X" (if it was team work)</li>
                <li>• List skills you're "proficient" vs "expert" in honestly</li>
                <li>• Explain gaps briefly if asked (career break, upskilling, personal reasons)</li>
                <li>• Your integrity matters more than a perfect resume</li>
              </ul>
            </div>
          </div>

          {/* Mistake 6 */}
          <div className="bg-card rounded-lg p-6 mb-6 border">
            <h3 className="text-xl font-semibold mb-4">Mistake #6: Ignoring ATS (Applicant Tracking Systems)</h3>
            <div className="mb-4">
              <div className="flex items-start gap-2 text-destructive mb-2">
                <XCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT NOT TO DO:</strong>
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Putting important info in headers/footers</li>
                <li>• Using images, graphics, or logos</li>
                <li>• Fancy fonts or colors</li>
              </ul>
            </div>
            <div>
              <div className="flex items-start gap-2 text-primary mb-2">
                <CheckCircle className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <strong>WHAT TO DO INSTEAD:</strong> Keep it simple and scannable:
              </div>
              <ul className="ml-7 space-y-1 text-foreground/80">
                <li>• Standard section headings</li>
                <li>• Plain text format with simple bullets</li>
                <li>• Keywords from the job description strategically placed</li>
                <li>• Standard fonts</li>
                <li>• No graphics or images</li>
              </ul>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary text-primary-foreground rounded-xl p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Access Your Free Resume Templates</h2>
          <p className="mb-6 text-primary-foreground/90">👉 Click here to get your professional resume templates</p>
          <div className="space-y-2 text-primary-foreground/80 mb-6">
            <p>✅ ATS-friendly</p>
            <p>✅ Clean and professional</p>
            <p>✅ Easy to customize</p>
            <p>✅ Proven to get interviews</p>
          </div>
          <Link 
            to="/#free-resources" 
            className="inline-flex items-center gap-2 bg-background text-foreground px-6 py-3 rounded-lg font-semibold hover:bg-background/90 transition-colors"
          >
            <Download className="w-5 h-5" />
            Get Free Templates
          </Link>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-muted py-8 mt-16">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <Link to="/" className="hover:text-foreground transition-colors">
            ← Back to Home
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default ResumeGuide;
