import { ArrowLeft, Download, Target, AlertTriangle, FileText, Clock, Shield, Sparkles, Ban, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";
import GuideSignInBanner from "@/components/guides/GuideSignInBanner";

const ResumeGuide = () => {
  useTrackGuideProgress("resume-guide");
  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight hover:text-cream-90 transition-colors">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <AuthHeaderButton variant="nav" />
            <LanguageToggle variant="nav" />
            <Link to="/" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              Back to Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 md:pt-40 pb-16 md:pb-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-foreground leading-tight mb-6">
            The Job-Winning Resume Guide
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto mb-4">
            I've reviewed 20,000+ resumes and hired 500+ people. Here's exactly what separates the resumes that get interviews from the ones that get ignored.
          </p>
          <div className="flex items-center justify-center gap-1.5 text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span className="text-sm">15 min read</span>
          </div>
        </div>
      </section>

      <GuideSignInBanner lang="en" />

      <main className="container mx-auto px-5 md:px-6 pb-20 max-w-3xl">
        
        {/* 5-Minute Audit Checklist */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-executive-green flex items-center justify-center">
              <Target className="w-6 h-6 text-cream" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              The 5-Minute Resume Audit
            </h2>
          </div>
          <p className="text-muted-foreground mb-10 text-lg">
            Run through this checklist and honestly assess your current resume.
          </p>

          {/* First Impressions */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Clock className="w-5 h-5 text-gold" />
              <h3 className="font-heading text-xl text-foreground">First Impressions (0-6 seconds)</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Clean layout</span>
                  <p className="text-muted-foreground text-sm mt-0.5">If it looks like a design project, it's wrong</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Contact info is complete</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Phone, email, LinkedIn — all working and professional</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Proper length</span>
                  <p className="text-muted-foreground text-sm mt-0.5">One page for &lt;10 years experience, two pages max otherwise</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Standard font</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Arial, Calibri, or Helvetica (10-12pt)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">White space</span>
                  <p className="text-muted-foreground text-sm mt-0.5">I need to scan it in 6 seconds. Make it easy on me</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Content Strength */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-heading text-xl text-foreground">Content Strength</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Strong summary</span>
                  <p className="text-muted-foreground text-sm mt-0.5">2-3 lines that sell your value, not just describe you</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Results over responsibilities</span>
                  <p className="text-muted-foreground text-sm mt-0.5">"Increased sales by 30%" not "Responsible for sales"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Numbers everywhere</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Numbers, percentages, dollar amounts wherever possible</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Tailored to the job</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Keywords from the job description are strategically placed</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">No generic buzzwords</span>
                  <p className="text-muted-foreground text-sm mt-0.5">"Team player" and "detail-oriented" without proof = instant no</p>
                </div>
              </li>
            </ul>
          </div>

          {/* ATS-Friendly */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <Shield className="w-5 h-5 text-gold" />
              <h3 className="font-heading text-xl text-foreground">ATS-Friendly</h3>
            </div>
            <p className="text-muted-foreground text-sm mb-5 bg-muted/50 p-3 rounded-lg">
              <strong>ATS</strong> = Applicant Tracking System. The software that scans your resume before a human ever sees it. If it can't read your resume, you're out.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Standard section headings</span>
                  <p className="text-muted-foreground text-sm mt-0.5">"Experience," "Education," "Skills"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Skills match job description</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Use exact terminology from the posting</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Simple formatting</span>
                  <p className="text-muted-foreground text-sm mt-0.5">No tables or text boxes — modern ATS can read them but parse inconsistently</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Red Flag Check */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8 mb-6">
            <div className="flex items-center gap-3 mb-6">
              <AlertTriangle className="w-5 h-5 text-gold" />
              <h3 className="font-heading text-xl text-foreground">Red Flag Check</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Zero typos</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Use Grammarly or ChatGPT to proofread. One typo in your header = instant reject</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Employment gaps explained</span>
                  <p className="text-muted-foreground text-sm mt-0.5">If you have gaps or short tenures, briefly explain why in one line</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Consistent dates</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Pick one style and stick to it</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Relevant experience first</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Remove irrelevant stuff from 10+ years ago. Lead with what matters for THIS job</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Final Polish */}
          <div className="bg-card border border-border rounded-xl p-6 md:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Sparkles className="w-5 h-5 text-gold" />
              <h3 className="font-heading text-xl text-foreground">The Final Polish</h3>
            </div>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">Professional email</span>
                  <p className="text-muted-foreground text-sm mt-0.5">firstname.lastname@email.com — yes, I judge partygirl99@</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">LinkedIn URL customized</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Use linkedin.com/in/yourname (not the random number version)</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">File naming</span>
                  <p className="text-muted-foreground text-sm mt-0.5">"FirstName_LastName_Resume.pdf" not "Resume Final v3.docx"</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <span className="font-medium text-foreground">PDF format</span>
                  <p className="text-muted-foreground text-sm mt-0.5">Unless specifically asked for Word doc</p>
                </div>
              </li>
            </ul>
          </div>
        </section>

        {/* Common Mistakes Section */}
        <section className="mb-20">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-destructive/10 flex items-center justify-center">
              <Ban className="w-6 h-6 text-destructive" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">
              Mistakes That Kill Applications
            </h2>
          </div>

          {/* Mistake 1 */}
          <div className="border border-border rounded-xl overflow-hidden mb-6">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #1: The Generic Resume Spray-and-Pray</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-2 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <p className="text-foreground/80 text-sm">Using the exact same resume for every job application without customization.</p>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-3 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• Use keywords from the job description in your summary and skills</li>
                  <li>• Highlight relevant experience first</li>
                  <li>• Adjust your bullet points to match what they're looking for</li>
                  <li>• Show you understand their industry</li>
                </ul>
                <p className="text-muted-foreground text-xs mt-4 pt-3 border-t border-border">
                  You don't need a new resume for every application — but different job types (Sales vs Operations) need different versions.
                </p>
              </div>
            </div>
          </div>

          {/* Mistake 2 */}
          <div className="border border-border rounded-xl overflow-hidden mb-6">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #2: Vague, Responsibility-Focused Bullets</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• "Responsible for managing social media accounts"</li>
                  <li>• "Handled customer service inquiries"</li>
                  <li>• "Worked on team projects"</li>
                </ul>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-3 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• "Grew Instagram following from 2K to 15K in 6 months, increasing engagement by 140%"</li>
                  <li>• "Resolved 95% of customer issues on first contact, maintaining 4.9/5 satisfaction rating"</li>
                  <li>• "Led cross-functional team of 5 to deliver $2M project 3 weeks ahead of schedule"</li>
                </ul>
              </div>
              <div className="bg-executive-green text-cream rounded-lg p-5">
                <p className="font-medium mb-2">The Formula</p>
                <p className="text-cream-90 text-sm mb-3">Action Verb + What You Did + Quantified Result</p>
                <div className="text-cream-70 text-xs space-y-1">
                  <p><strong className="text-cream">CAR:</strong> Challenge → Action → Result</p>
                  <p><strong className="text-cream">XYZ:</strong> Accomplished X as measured by Y, by doing Z</p>
                </div>
              </div>
            </div>
          </div>

          {/* Mistake 3 */}
          <div className="border border-border rounded-xl overflow-hidden mb-6">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #3: The Wall of Text</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-2 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <p className="text-foreground/80 text-sm">Dense paragraphs, no white space, tiny fonts, cramming everything onto one page at the expense of readability.</p>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-3 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• Use bullet points (3-5 per role maximum)</li>
                  <li>• Keep bullets to 1-2 lines each</li>
                  <li>• Add space between sections</li>
                  <li>• Use standard 10-12pt font</li>
                  <li>• Leave enough white space for easy scanning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Mistake 4 */}
          <div className="border border-border rounded-xl overflow-hidden mb-6">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #4: Outdated or Irrelevant Information</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• Including your full address (city, country is enough)</li>
                  <li>• Listing "Microsoft Office" as a skill in 2024</li>
                  <li>• "References available upon request" (wasted space)</li>
                  <li>• Objective statements (you applied — it's assumed you want the job)</li>
                  <li>• Irrelevant jobs from 10+ years ago</li>
                </ul>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-2 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <p className="text-foreground/80 text-sm">Focus on what matters NOW for the job you're applying for. Keep it relevant, recent, and results-driven.</p>
              </div>
            </div>
          </div>

          {/* Mistake 5 */}
          <div className="border border-border rounded-xl overflow-hidden mb-6">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #5: Lying or Exaggerating</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• Inflating job titles</li>
                  <li>• Claiming skills you don't have</li>
                  <li>• Extending employment dates to hide gaps</li>
                  <li>• Taking credit for team achievements as solely your own</li>
                </ul>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-3 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <p className="text-foreground/80 text-sm mb-3">Be honest but strategic:</p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• "Contributing team member on project that achieved X"</li>
                  <li>• List skills you're "proficient" vs "expert" in honestly</li>
                  <li>• Explain gaps briefly if asked</li>
                </ul>
                <p className="text-muted-foreground text-xs mt-4 pt-3 border-t border-border">
                  Your integrity matters more than a perfect resume.
                </p>
              </div>
            </div>
          </div>

          {/* Mistake 6 */}
          <div className="border border-border rounded-xl overflow-hidden">
            <div className="bg-muted/50 px-6 py-4 border-b border-border">
              <h3 className="font-heading text-lg text-foreground">Mistake #6: Ignoring the ATS</h3>
            </div>
            <div className="p-6 md:p-8 space-y-6">
              <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
                <p className="font-medium text-destructive mb-3 flex items-center gap-2">
                  <Ban className="w-4 h-4" /> What not to do
                </p>
                <ul className="space-y-1 text-sm text-foreground/80">
                  <li>• Putting important info in headers/footers</li>
                  <li>• Using images, graphics, or logos</li>
                  <li>• Fancy fonts or colors</li>
                </ul>
              </div>
              <div className="bg-card border border-gold/30 rounded-lg p-4">
                <p className="font-medium text-gold mb-3 flex items-center gap-2">
                  <GoldCheckBadge /> What to do instead
                </p>
                <ul className="space-y-2 text-sm text-foreground/80">
                  <li>• Standard section headings</li>
                  <li>• Plain text format with simple bullets</li>
                  <li>• Keywords from the job description</li>
                  <li>• Standard fonts, no graphics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-executive-green rounded-2xl p-8 md:p-12 text-center relative overflow-hidden">
          <div className="relative z-10">
            <h2 className="font-heading text-2xl md:text-3xl text-cream mb-4">
              Get Your Free Resume Templates
            </h2>
            <p className="text-cream-70 mb-8 max-w-md mx-auto">
              Professional templates that are ATS-friendly, clean, easy to customize, and proven to get interviews.
            </p>
            <div className="grid grid-cols-2 gap-4 max-w-sm mx-auto mb-8">
              <div className="flex items-center gap-2 text-cream-90 text-sm">
                <GoldCheckBadge />
                <span>ATS-friendly</span>
              </div>
              <div className="flex items-center gap-2 text-cream-90 text-sm">
                <GoldCheckBadge />
                <span>Professional</span>
              </div>
              <div className="flex items-center gap-2 text-cream-90 text-sm">
                <GoldCheckBadge />
                <span>Easy to customize</span>
              </div>
              <div className="flex items-center gap-2 text-cream-90 text-sm">
                <GoldCheckBadge />
                <span>Proven results</span>
              </div>
            </div>
            <Link to="/#resources">
              <Button size="lg" className="h-14 px-10 btn-gold font-medium text-base">
                <Download className="w-5 h-5 mr-2" />
                Download Free Templates
              </Button>
            </Link>
          </div>
        </section>
      </main>

      <GuideShareButtons />

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
              ← Back to Home
            </Link>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ResumeGuide;
