import { ArrowLeft, Download, FileText } from 'lucide-react';
import { Link } from 'react-router-dom';

const CharleneLeeReview = () => {
  return (
    <div className="min-h-screen bg-cream">
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <a 
            href="/reviews/charlene-lee-resume.pdf" 
            download 
            className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors"
          >
            <Download className="w-4 h-4" />
            <span className="text-sm font-medium">Download PDF</span>
          </a>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-executive-green relative py-10 sm:py-12">
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-3">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Resume Review</span>
          </div>
          <h1 className="font-heading text-3xl sm:text-4xl text-cream mb-2">Charlene Lee</h1>
          <p className="text-cream-70 text-base">Professional Resume Analysis & Action Plan</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-10">
        
        {/* How to Use This Guide */}
        <section className="mb-12">
          <h2 className="font-heading text-2xl sm:text-3xl text-foreground mb-4">How to Use This Guide</h2>
          <p className="text-foreground mb-2">
            <span className="font-semibold">This annotated resume shows you exactly where to make each change.</span>{' '}
            The numbered markers on the resume correspond to the detailed instructions below. Follow the day-by-day plan, making changes in the marked areas. Start with the Quick Wins (numbers 1-4) for immediate improvement.
          </p>
          
          {/* Annotated Resume Preview */}
          <div className="bg-white rounded-xl p-6 mt-6 shadow-sm border border-border/50">
            <iframe 
              src="/reviews/charlene-lee-resume.pdf" 
              className="w-full h-[500px] rounded-lg border border-border/30"
              title="Charlene Lee Resume"
            />
            <div className="flex flex-wrap gap-3 mt-4">
              <a 
                href="/reviews/charlene-lee-resume.pdf" 
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-4 py-2 bg-nav-green text-cream rounded-lg hover:bg-nav-green/90 transition-colors font-medium text-sm"
              >
                <FileText className="w-4 h-4" />
                Open Full Size
              </a>
              <a 
                href="/reviews/charlene-lee-resume.pdf" 
                download 
                className="inline-flex items-center gap-2 px-4 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors font-medium text-sm"
              >
                <Download className="w-4 h-4" />
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* Quick Wins Section Header */}
        <div className="mb-6">
          <span className="inline-block px-3 py-1.5 bg-nav-green text-cream text-xs font-bold rounded uppercase tracking-wide">
            Quick Wins
          </span>
        </div>

        {/* Action Item 1 */}
        <ActionCard 
          number={1}
          title="Fix Phone Number"
          time="1 min"
        >
          <p className="text-foreground mb-1">
            <span className="text-muted-foreground">Change:</span> "886 920187795"
          </p>
          <p className="text-foreground mb-3">
            <span className="text-muted-foreground">To:</span> "+886 920 187 795"
          </p>
          <p className="text-gold italic text-sm">Makes it easier to read and internationally formatted</p>
        </ActionCard>

        {/* Action Item 2 */}
        <ActionCard 
          number={2}
          title="Fix Character Encoding"
          time="1 min"
        >
          <p className="text-foreground mb-1">
            <span className="text-muted-foreground">Find:</span> "leadership 的 strategic"
          </p>
          <p className="text-foreground mb-3">
            <span className="text-muted-foreground">Change to:</span> "leadership's strategic"
          </p>
          <p className="text-gold italic text-sm">Remove the Chinese character</p>
        </ActionCard>

        {/* Action Item 3 */}
        <ActionCard 
          number={3}
          title="Delete ALL Analogies"
          time="5 min"
        >
          <p className="text-foreground mb-3">Remove all text in red strikethrough:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              "(directly applicable to...)"
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              "(analogous to driver loyalty)"
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              "(directly analogous to...)"
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              "(mirroring the function of...)"
            </li>
          </ul>
          <p className="text-gold italic text-sm">These weaken your credibility</p>
        </ActionCard>

        {/* Action Item 4 */}
        <ActionCard 
          number={4}
          title="Add Job Title"
          time="3 min"
        >
          <p className="text-foreground mb-2 font-medium">Add under your name:</p>
          <p className="text-foreground mb-3">"Senior Operations Manager | Growth Strategy | Client Success"</p>
          <p className="text-gold italic text-sm">Immediately positions you for target role</p>
        </ActionCard>

        {/* Day 1: Core Content Section Header */}
        <div className="mb-6 mt-10">
          <span className="inline-block px-3 py-1.5 bg-nav-green text-cream text-xs font-bold rounded uppercase tracking-wide">
            Day 1: Core Content
          </span>
        </div>

        {/* Action Item 5 */}
        <ActionCard 
          number={5}
          title="Rewrite Summary"
          time="30 min"
        >
          <p className="text-foreground mb-3">Replace entire paragraph with 3-4 lines:</p>
          <p className="text-gold italic mb-3">
            "Senior Operations Manager with 20 years at Microsoft, specializing in growth strategy, client retention, and operational excellence. Delivered 120%+ portfolio growth while maintaining 100% client renewals across $15M+ accounts. Expert in data-driven pipeline management, cross-functional team leadership, and strategic forecasting to drive measurable business outcomes."
          </p>
        </ActionCard>

        {/* Action Item 6 */}
        <ActionCard 
          number={6}
          title="Rewrite All 5 Bullets"
          time="60 min"
        >
          <p className="text-foreground mb-3">Each bullet needs:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Remove analogies (already marked)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Add [NUMBER] of accounts
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Add [$VALUE] of portfolio
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Add specific timeframes
            </li>
          </ul>
          <p className="text-gold italic text-sm">See detailed examples in full review</p>
        </ActionCard>

        {/* Day 2: Experience Section Header */}
        <div className="mb-6 mt-10">
          <span className="inline-block px-3 py-1.5 bg-nav-green text-cream text-xs font-bold rounded uppercase tracking-wide">
            Day 2: Experience
          </span>
        </div>

        {/* Action Item 7 */}
        <ActionCard 
          number={7}
          title="Rewrite Job 1 Bullets"
          time="45 min"
        >
          <p className="text-foreground mb-3">Customer Success Account Manager | Microsoft Taiwan</p>
          <p className="text-foreground mb-3">For each bullet:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Remove all analogies
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Add specific numbers (accounts, $value, %)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Use operations language instead of customer success
            </li>
          </ul>
          <p className="text-gold italic text-sm">Focus on operational achievements over client relationships</p>
        </ActionCard>

        {/* Action Item 8 */}
        <ActionCard 
          number={8}
          title="Rewrite Job 2 Bullets"
          time="45 min"
        >
          <p className="text-foreground mb-3">Business Excellence Operations | Microsoft Taiwan</p>
          <p className="text-foreground mb-3">This role is GOLD for operations positioning. Emphasize:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Forecasting dashboards and pipeline analytics
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Process optimization initiatives
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Cross-functional coordination
            </li>
          </ul>
          <p className="text-gold italic text-sm">Lead with operational achievements from this role</p>
        </ActionCard>

        {/* Day 3: Polish Section Header */}
        <div className="mb-6 mt-10">
          <span className="inline-block px-3 py-1.5 bg-nav-green text-cream text-xs font-bold rounded uppercase tracking-wide">
            Day 3: Polish
          </span>
        </div>

        {/* Action Item 9 */}
        <ActionCard 
          number={9}
          title="Reorder Core Skills"
          time="10 min"
        >
          <p className="text-foreground mb-3">Prioritize operational language:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Move "Supply-Demand Forecasting" to top
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Move "Operational Excellence" to top
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              De-emphasize "Customer Success" terminology
            </li>
          </ul>
        </ActionCard>

        {/* Action Item 10 */}
        <ActionCard 
          number={10}
          title="Add Certification Dates"
          time="5 min"
        >
          <p className="text-foreground mb-3">Show recency of learning:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Azure Fundamentals (2023)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              AI Fundamentals (2024)
            </li>
          </ul>
          <p className="text-gold italic text-sm">Dates show continuous learning vs old certifications</p>
        </ActionCard>

        {/* Action Item 11 */}
        <ActionCard 
          number={11}
          title="Add Education Year"
          time="2 min"
        >
          <p className="text-foreground mb-1">
            <span className="text-muted-foreground">Current:</span> "Finance, National Taipei University of Business"
          </p>
          <p className="text-foreground mb-3">
            <span className="text-muted-foreground">Change to:</span> "B.S. Finance, National Taipei University of Business, 2005"
          </p>
        </ActionCard>

        {/* Action Item 12 */}
        <ActionCard 
          number={12}
          title="Add Languages Section"
          time="5 min"
        >
          <p className="text-foreground mb-3">Add after Education:</p>
          <ul className="space-y-1.5 mb-3 text-foreground">
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              Mandarin (Native)
            </li>
            <li className="flex items-start gap-2">
              <span className="text-gold">•</span>
              English (Professional Working Proficiency)
            </li>
          </ul>
          <p className="text-gold italic text-sm">Shows bilingual capability for multinational companies</p>
        </ActionCard>

        {/* Summary Section */}
        <section className="mt-12 bg-white rounded-xl p-6 shadow-sm border border-border/50">
          <h3 className="font-heading text-xl text-foreground mb-4">Summary</h3>
          <p className="text-foreground mb-4">
            Your resume shows strong experience at Microsoft with impressive metrics (120%+ growth, 100% renewals). The main issue is positioning—you're currently framed for Customer Success but trying to pivot to Operations.
          </p>
          <p className="text-foreground mb-4">
            The analogies throughout the resume weaken your credibility. Let your achievements speak for themselves.
          </p>
          <p className="text-foreground">
            After implementing these changes, your resume will be competitive for Operations Manager, Supply Growth Manager, and Business Operations roles at tech companies and platforms.
          </p>
        </section>

        {/* Target Readiness */}
        <section className="mt-8 grid sm:grid-cols-2 gap-4">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
            <p className="text-sm text-muted-foreground mb-2">Current State</p>
            <div className="flex items-end gap-3 mb-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[65%] bg-gold rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-gold">65%</span>
            </div>
            <p className="text-sm text-muted-foreground">Ready for Customer Success roles, not optimized for Operations</p>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-sm border border-border/50">
            <p className="text-sm text-muted-foreground mb-2">After Fixes</p>
            <div className="flex items-end gap-3 mb-2">
              <div className="flex-1 h-2 bg-muted rounded-full overflow-hidden">
                <div className="h-full w-[85%] bg-gold rounded-full"></div>
              </div>
              <span className="text-2xl font-bold text-gold">85%</span>
            </div>
            <p className="text-sm text-muted-foreground">Competitive for Operations Manager roles at tech companies</p>
          </div>
        </section>

        {/* Closing Thoughts */}
        <section className="mt-12 mb-8">
          <h3 className="font-heading text-xl text-foreground mb-4">Closing Thoughts</h3>
          <p className="text-foreground mb-4">
            You have strong fundamentals—20 years at Microsoft, impressive metrics, cross-functional leadership. The issue is presentation, not substance.
          </p>
          <p className="text-foreground">
            Follow this action plan over 3 days and your resume will be significantly stronger. If you want me to review the updated version, just let me know.
          </p>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream-70 text-sm">
            Resume Review by James Bugden | Senior Recruiter at Uber
          </p>
        </div>
      </footer>
    </div>
  );
};

// Action Card Component
interface ActionCardProps {
  number: number;
  title: string;
  time: string;
  children: React.ReactNode;
}

const ActionCard = ({ number, title, time, children }: ActionCardProps) => {
  return (
    <div className="bg-white rounded-xl p-5 mb-4 shadow-sm border-l-4 border-gold/30 border border-border/50">
      <div className="flex items-center gap-3 mb-3">
        <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
          {number}
        </div>
        <h3 className="font-semibold text-foreground">{title}</h3>
        <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full ml-auto">
          {time}
        </span>
      </div>
      <div className="pl-11">
        {children}
      </div>
    </div>
  );
};

export default CharleneLeeReview;
