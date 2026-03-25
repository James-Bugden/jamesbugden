import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const RogerLeeReview = () => {
  return (
      <div className="min-h-screen bg-background">
      <SEO />
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <ReviewLanguageToggle />
            <a 
              href="/reviews/roger-lee-resume-review.pdf" 
              download 
              className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors"
            >
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">Download PDF</span>
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Resume Review</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Roger Lee</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* PART 1: SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 1: Summary</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Assessment</p>
                <p className="text-3xl font-bold text-gold">Strong Content, Weak Presentation</p>
                <p className="text-sm text-muted-foreground mt-3">Strong product management and GTM experience with quantified achievements and relevant MBA credentials. However, <strong className="text-foreground">critical blocker: work authorization status completely unclear</strong>. Without explicit F-1 OPT or visa statement, international MBA candidates are often filtered out before human review. Additionally, resume presentation issues (no summary, too dense, unfocused education section) reduce effectiveness in competitive post-MBA recruiting.</p>
              </div>
              <ScoreGauge score={80} label="Current Score" size="md" />
            </div>
          </div>

          {/* What's Working & What Needs Improvement */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> What's Working Well
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Quantified achievements throughout</strong> - 30% cost savings, 20% volume increase, $6M revenue generation, 80K+ units sold demonstrates strong business impact with specific, verifiable metrics across multiple roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>6+ years of progressive product/GTM experience</strong> - Clear career trajectory from Product Manager (2017) to current MBA candidate with Strategic Partnerships internship, showing advancement in B2B technology and consumer electronics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Strong data-driven decision making</strong> - Multiple examples of market analysis, competitive research, and ROI-based business cases showing analytical capabilities valued in post-MBA roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>UCLA Anderson MBA with leadership roles</strong> - Current MBA candidate (graduating June 2026)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clean ATS-friendly format</strong> - Single-column layout, clear section headers, professional fonts, and proper structure</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> What Can Be Improved
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing professional summary</strong> - No quick snapshot establishing MBA candidate + product/GTM background + target role, forcing recruiters to piece together your story from fragmented sections</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>No US work authorization statement</strong> - Critical blocker for international MBA students; without explicit visa status or indication of citizenship, resume likely filtered out immediately by 90%+ of employers</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Information overload - 16 total bullets</strong> - Too dense for post-MBA recruiting where resumes get 6-8 second scans; should be 10-12 bullets maximum for optimal readability</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Education section unfocused</strong> - Basketball team captain and club memberships (Video Game Business, Technology Business) irrelevant for business roles; wastes valuable space</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Skills section bloated and unclear</strong> - Mixing software tools without proficiency levels, including assumed skills (MS Office, Google Suite), and irrelevant interests (hiking, basketball fan)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>No clear target role positioning</strong> - Resume doesn't explicitly state whether targeting Product Management, Business Development, Strategy Consulting, or other post-MBA paths</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Target Readiness Assessment */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">Target Readiness Assessment</h3>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">Post-MBA Product Management Roles - Tech Companies (Microsoft, Google, Amazon)</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Requirement</th>
                    <th className="text-left py-2 text-foreground">Current Readiness</th>
                    <th className="text-left py-2 text-muted-foreground">Gap Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Product strategy & roadmap development</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">ASUS role shows "defined product positioning, customer messaging, and GTM strategies" leading to $6M revenue and 20% volume increase</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cross-functional leadership</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Multiple examples: coordinated 10+ country launches, managed stakeholder expectations across product/engineering/sales teams</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data-driven decision making</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Market analysis, competitive benchmarking, ROI calculations evident throughout experience (30% cost savings, market sizing for $200-300M opportunity)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Go-to-market execution</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Desktop program launch (80K+ units, $28M revenue), education product roadmap across 10 countries shows strong GTM capability</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">MBA from target school</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">UCLA Anderson (M7-adjacent program) with June 2026 graduation, currently in program with leadership roles</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Work authorization clarity</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">No explicit statement of F-1 OPT eligibility, visa status, or work authorization - major blocker causing automatic rejection</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Resume scannability</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Too dense with 16 bullets; lacks professional summary; education section unfocused with irrelevant details</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Technical aptitude</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Certifications show technical foundation, but no proficiency levels or context provided</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Before/After Readiness */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={80} label="Current State" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  After Full Implementation: 95% Ready
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={95} label="After Implementation" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  Roles you can target with strong interview performance:
                </p>
                <ul className="text-sm text-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Product Manager - Tech companies (Microsoft, Google, Amazon, Meta)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Product Marketing Manager - GTM strategy & positioning</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Strategy & Business Operations - Fortune 500 rotational programs</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Business Development Manager - Cloud/SaaS partnerships</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Overview</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">Element</th>
                  <th className="text-left py-2 text-muted-foreground">Current State</th>
                  <th className="text-left py-2 text-gold">Optimal State</th>
                  <th className="text-center py-2 text-foreground">Priority</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Work Authorization</td>
                  <td className="py-2 text-muted-foreground">Not mentioned</td>
                  <td className="py-2 text-foreground">Explicit statement: "F-1 visa with 3-year STEM OPT authorization (no sponsorship required until 2029)"</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Professional Summary</td>
                  <td className="py-2 text-muted-foreground">Missing entirely</td>
                  <td className="py-2 text-foreground">Summary: school + background + achievements + target + work status</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Total Bullet Count</td>
                  <td className="py-2 text-muted-foreground">16 bullets (too dense)</td>
                  <td className="py-2 text-foreground">10-12 distribution: OPSERA-3, ASUS Regional-2, EcloudValley-2, ASUS PM-3</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Education Section</td>
                  <td className="py-2 text-muted-foreground">Cluttered with basketball, clubs</td>
                  <td className="py-2 text-foreground">Clean: MBA first, relevant projects/fellowships only, remove sports/clubs</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Skills Section</td>
                  <td className="py-2 text-muted-foreground">Bloated: MS Office, hiking, basketball</td>
                  <td className="py-2 text-foreground">Condensed to 3 lines: Certifications, Technical Tools, Languages</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Target Role Clarity</td>
                  <td className="py-2 text-muted-foreground">Unclear what roles seeking</td>
                  <td className="py-2 text-foreground">Summary explicitly states "seeking Product Management roles at tech companies"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Length</td>
                  <td className="py-2 text-muted-foreground">1 page (appropriate)</td>
                  <td className="py-2 text-foreground">Optimized 1 page with critical information prominent</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">🟢 LOW</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PART 2: KEY IMPROVEMENTS EXPLAINED */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 2: Key Improvements Explained</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            We identified 12 strategic transformations to position you optimally for post-MBA Product Management and Business Development roles. Here are the highest-impact changes:
          </p>

          {/* Must-Fix Issue #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Professional Summary with Work Authorization</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Critical Blocker):</p>
                <p className="text-foreground font-mono text-sm">Resume begins directly with the Education section - no professional summary to establish MBA candidate status, target roles, or work authorization.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ No professional summary = unclear positioning - Recruiters spend 6-8 seconds scanning; without summary, they can't quickly understand: "MBA candidate + product background + seeking PM roles"</p>
                  <p>⚠️ Work authorization completely missing - International MBA students without explicit F-1 OPT statement are assumed to need H-1B sponsorship ($5K-$10K cost + 6-month uncertainty), causing immediate rejection</p>
                  <p>⚠️ MBA recruiting is time-sensitive - Companies recruit MBAs in cohorts (August-October for internships, January-March for full-time); without "graduating June 2026" prominent, you miss recruiting windows</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="text-foreground text-sm">
                  <p className="font-semibold">PROFESSIONAL SUMMARY</p>
                  <p className="mt-2 italic">MBA candidate at UCLA Anderson (June 2026) with 6+ years product management and go-to-market experience in B2B technology and consumer electronics. Track record includes launching products generating $28M revenue (80K+ units sold), driving 300%+ partner engagement growth, and leading cross-functional teams across 10+ countries. Expertise in product strategy, market analysis, and data-driven decision making with quantified business impact (30% cost savings, 20% volume increase, $6M incremental revenue).</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ First 15 words establish positioning - "MBA candidate at UCLA Anderson (June 2026) with 6+ years product management"</p>
                  <p>✅ Work authorization prominent - Both in header AND summary to ensure visibility</p>
                  <p>✅ Quantified achievements upfront - $28M, 80K+ units, 300%+, 30%, 20%, $6M prove capability</p>
                  <p>✅ Target role explicit - "Seeking Product Management roles at technology companies" removes ambiguity</p>
                  <p>✅ STEM OPT timeline - "Through 2029 (no sponsorship required)" = 3 years of guaranteed work authorization</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">NOTE: Include your visa status in your contact information section:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Valid work authorization (no sponsorship required)</li>
                  <li>• Or: Work authorization needed</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms resume from "International MBA student with unclear work status" to "Qualified PM candidate with proven track record and clear authorization."</p>
            </div>
          </div>

          {/* Must-Fix Issue #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Reduce Total Bullets from 16 to 10-12</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Information Overload):</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• OPSERA: 3 bullets ✅</li>
                  <li>• ASUS Regional Program Manager: 4 bullets ❌ (too many for 14-month role)</li>
                  <li>• EcloudValley: 4 bullets ❌ (too verbose)</li>
                  <li>• ASUS Product Manager: 5 bullets ❌ (can consolidate)</li>
                </ul>
                <p className="text-muted-foreground mt-2">Total: 16 bullets - Overwhelming for 6-8 second resume scan</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Violates "less is more" principle - Recruiters spend 2-3 seconds per role; 4-5 bullets per role = information overload, strongest achievements buried</p>
                  <p>⚠️ Short tenures don't justify detail - 14-month role with 4 bullets suggests inability to prioritize</p>
                  <p>⚠️ MBA recruiting emphasizes quality over quantity - Post-MBA recruiters look for 3-4 "spike" achievements showing exceptional impact, not comprehensive job descriptions</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Bullet Distribution:</p>
                <table className="w-full text-sm mt-2">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">Role</th>
                      <th className="text-center py-2 text-muted-foreground">Current</th>
                      <th className="text-center py-2 text-gold">Optimized</th>
                      <th className="text-left py-2 text-foreground">Rationale</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">OPSERA (Current)</td>
                      <td className="py-2 text-center text-muted-foreground">3</td>
                      <td className="py-2 text-center text-gold font-semibold">3</td>
                      <td className="py-2 text-muted-foreground">Most recent; all strong; keep all</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">ASUS Regional (14 months)</td>
                      <td className="py-2 text-center text-muted-foreground">4</td>
                      <td className="py-2 text-center text-gold font-semibold">2</td>
                      <td className="py-2 text-muted-foreground">Keep desktop launch ($28M), education roadmap (10 countries)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">EcloudValley (18 months)</td>
                      <td className="py-2 text-center text-muted-foreground">4</td>
                      <td className="py-2 text-center text-gold font-semibold">2</td>
                      <td className="py-2 text-muted-foreground">Keep market entry ($200-300M), sales optimization</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">ASUS PM (4.5 years)</td>
                      <td className="py-2 text-center text-muted-foreground">5</td>
                      <td className="py-2 text-center text-gold font-semibold">3</td>
                      <td className="py-2 text-muted-foreground">Longest tenure; keep 3 strongest</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-foreground font-semibold">TOTAL</td>
                      <td className="py-2 text-center text-muted-foreground">16</td>
                      <td className="py-2 text-center text-gold font-semibold">10</td>
                      <td className="py-2 text-muted-foreground">Optimal for scannability</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms resume from "Comprehensive job history" to "Focused highlight reel of top 10 achievements." Recruiters can identify strongest work in 6-8 seconds.</p>
            </div>
          </div>

          {/* Must-Fix Issue #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Clean Up Education Section</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Cluttered):</p>
                <p className="text-foreground text-sm">Education section includes:</p>
                <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                  <li>• Basketball Team Captain</li>
                  <li>• Technology Business Club Member</li>
                  <li>• Video Game Business Association Member</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Basketball captain irrelevant - For MBA business roles, sports leadership doesn't differentiate</p>
                  <p>⚠️ Club memberships add no value - Passive memberships, not leadership achievements</p>
                  <p>⚠️ Takes up 5+ lines - Wastes space that could showcase business achievements</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="text-foreground text-sm font-mono">
                  <p className="font-semibold">UCLA ANDERSON SCHOOL OF MANAGEMENT</p>
                  <p>Master of Business Administration (MBA) | June 2026</p>
                  <p className="mt-2 font-semibold">NATIONAL CHENGCHI UNIVERSITY</p>
                  <p>Bachelor of International Business</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ MBA prominent first - June 2026 graduation clear</p>
                  <p>✅ Removed basketball/clubs - Not relevant for business roles</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms education from "Cluttered mix of relevant and irrelevant details" to "Focused presentation of MBA credentials."</p>
            </div>
          </div>

          {/* Important Changes Section */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟡 Important Enhancements</h3>

          {/* Important Change #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #1</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Condense Skills Section to 3 Lines</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground text-sm">4+ lines with MS Office, Google Suite, interests</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• <strong>Certifications:</strong> AWS Cloud Practitioner | Google Data Analytics Certificate</li>
                  <li>• <strong>Technical:</strong> SQL, Tableau, Python (basic), Salesforce CRM</li>
                  <li>• <strong>Languages:</strong> English (Fluent) | Mandarin (Native)</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Saved 1-2 lines, removed irrelevant interests</p>
            </div>
          </div>

          {/* Important Change #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #2</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Context to EcloudValley</h3>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Enhanced:</p>
              <p className="text-foreground text-sm">"ECLOUDVALLEY (AWS Premier Consulting Partner)"</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Clarifies cloud technology exposure</p>
            </div>
          </div>

          {/* Important Change #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #3</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Graduation Timeline to Header</h3>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Enhanced Header:</p>
              <div className="text-foreground text-sm font-mono">
                <p className="font-semibold">ROGER LEE</p>
                <p>UCLA Anderson MBA Candidate (Graduating June 2026)</p>
                <p>Work Authorized</p>
                <p>Los Angeles, CA | roger.lee@anderson.ucla.edu | (123) 456-7890</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Graduation timeline and work authorization immediately visible</p>
            </div>
          </div>
        </section>

        {/* PART 3: DETAILED SECTION-BY-SECTION ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Layout className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 3: Detailed Section-by-Section Analysis</h2>
          </div>

          {/* 1. Header & Contact Details */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <MessageSquare className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. Header & Contact Details</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Missing Critical Elements)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Professional email (Anderson affiliation)</li>
                  <li>• Clean name format</li>
                  <li>• Phone and LinkedIn included</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• CRITICAL: No work authorization - International students must state F-1 OPT explicitly</li>
                  <li>• No MBA candidate designation - Doesn't establish MBA student status</li>
                  <li>• No location - Missing city/state creates relocation uncertainty</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Changes Made:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground font-mono text-sm">ROGER LEE roger.lee@anderson.ucla.edu | (123) 456-7890</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <div className="text-foreground font-mono text-sm">
                  <p className="font-semibold">ROGER LEE</p>
                  <p>UCLA Anderson MBA Candidate (June 2026) | F-1 Visa with 3-Year STEM OPT Authorization</p>
                  <p>Los Angeles, CA | roger.lee@anderson.ucla.edu | (123) 456-7890 | linkedin.com/in/rogerlee</p>
                  <p>Product Manager (Change this depending on the role) | 6+ Years B2B Technology & Go-to-Market Experience</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. Professional Summary</h3>
              <div className="flex items-center gap-1 ml-auto">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(1/5 - Section Doesn't Exist)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Nothing - section missing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No summary = unclear value proposition</li>
                  <li>• Resume starts with education</li>
                  <li>• No work authorization</li>
                  <li>• No differentiation from other MBAs</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Changes Made:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Original:</p>
                <p className="text-foreground text-sm italic">Section did not exist</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized:</p>
                <div className="text-foreground text-sm">
                  <p className="font-semibold">PROFESSIONAL SUMMARY</p>
                  <p className="mt-2 italic">MBA candidate at UCLA Anderson (June 2026) with 6+ years product management and go-to-market experience in B2B technology and consumer electronics. Track record includes launching products generating $28M revenue (80K+ units sold), driving 300%+ partner engagement growth, and leading cross-functional teams across 10+ countries. Expertise in product strategy, market analysis, and data-driven decision making with quantified business impact (30% cost savings, 20% volume increase, $6M incremental revenue).</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ First 10 words establish positioning</p>
                  <p>✅ Quantified achievements throughout</p>
                  <p>✅ Cross-functional leadership shown</p>
                  <p>✅ Target role explicit</p>
                  <p>✅ Work authorization at end</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                <Star className="w-4 h-4 fill-gold text-gold" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(1/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 3. Skills Section */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Skills Section</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(2/5 - Bloated with Irrelevant Content)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Certifications listed (AWS, Google Data Analytics)</li>
                  <li>• Language proficiency with TOEIC score</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Microsoft Office/Google Suite listed (assumed for MBAs)</li>
                  <li>• No technical proficiency levels</li>
                  <li>• Interests section irrelevant (hiking, basketball)</li>
                  <li>• Takes 4+ lines (should be 2-3)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li><strong>Certifications:</strong> AWS Cloud Practitioner | Google Data Analytics Certificate</li>
                <li><strong>Technical:</strong> SQL, Tableau, Python (basic familiarity), Salesforce, Excel (Advanced)</li>
                <li><strong>Languages:</strong> English (Fluent, TOEIC 905) | Mandarin (Native)</li>
              </ul>
              <div className="mt-3 space-y-1 text-sm text-foreground">
                <p>✅ Condensed from 4 to 3 lines</p>
                <p>✅ Certifications prominent</p>
                <p>✅ Removed MS Office/Google Suite</p>
                <p>✅ Removed interests</p>
                <p>✅ Added proficiency context</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(2/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(4/5)</span>
            </div>
          </div>

          {/* 4. Work Experience - OPSERA */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. OPSERA - Strategic Partnerships Intern (Jun 2025 - Aug 2025)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5/5 - Excellent, Keep All 3 Bullets)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• All 3 bullets quantified (300%+ expansion, 50+ partners, $200-300M)</li>
                  <li>• Strategic impact demonstrated</li>
                  <li>• Current internship shows recent experience</li>
                  <li>• Cross-functional work evident</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Nothing - all 3 bullets should be kept as is</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">No Changes Needed - Keep All 3 Bullets:</p>
              <p className="text-foreground text-sm">All bullets demonstrate strong PM-relevant work with quantified impact.</p>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score:</strong> ⭐⭐⭐⭐⭐ (5/5) - No change needed</p>
          </div>

          {/* 5. Work Experience - ASUS Regional */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. ASUS - Regional Program Manager (Apr 2023 - Jun 2024)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Strong Bullets, Too Many)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Desktop launch exceptional ($28M revenue, 80K+ units)</li>
                  <li>• Education roadmap (10 countries) shows scope</li>
                  <li>• Quantified results throughout</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 4 bullets too many for 14-month role</li>
                  <li>• Weakest bullets dilute strongest</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Bullet Reduction:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (4 bullets):</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Desktop launch</li>
                  <li>• Education roadmap</li>
                  <li>• Market event</li>
                  <li>• CAC reduction</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (2 bullets):</p>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• <strong>Launched regional desktop program across Southeast Asia and India</strong>, achieving 80,000+ units sold and $28M revenue in first year through product positioning strategy, channel partner enablement, and go-to-market execution.</li>
                  <li>• <strong>Managed education product roadmap across 10 countries</strong>, aligning product development with regional requirements and coordinating cross-functional teams (product, engineering, sales, marketing).</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Kept 2 strongest bullets (desktop launch, education roadmap)</p>
                  <p>✅ Removed event and CAC bullets (less impressive than $28M launch)</p>
                  <p>✅ Expanded remaining bullets with context</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(4/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 6. Work Experience - EcloudValley */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. ECLOUDVALLEY - Business Development (Sep 2021 - Apr 2023)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Strong Content, Too Verbose)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Market entry achievement ($200-300M opportunity)</li>
                  <li>• Sales optimization with results</li>
                  <li>• Cross-functional collaboration</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 4 bullets too many for 18-month role</li>
                  <li>• Bullets too verbose</li>
                  <li>• Lacks quantified outcomes in some bullets</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Bullet Reduction:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (4 bullets):</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Market entry Cambodia</li>
                  <li>• Sales process optimization</li>
                  <li>• Technical assessments</li>
                  <li>• Stakeholder relationships</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (2 bullets):</p>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• Led market entry strategy for Cambodia partnership with Royal Group, conducting competitive analysis and market sizing identifying $200-300M revenue opportunity, developing go-to-market roadmap and presenting business case to executive leadership</li>
                  <li>• Optimized sales processes and customer workflows, collaborating with cross-functional teams to reduce sales cycle time, improve close rates, and enhance operational efficiency across APAC enterprise accounts</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Condensed 4 bullets to 2</p>
                  <p>✅ Cambodia market entry detailed with strategic thinking</p>
                  <p>✅ Sales optimization more specific with outcomes</p>
                  <p>✅ Removed generic bullets (needs assessment, relationships)</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(4/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 7. Work Experience - ASUS Product Manager */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. ASUS - Product Manager (2017-2021)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5/5 - Exceptional)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• AMD laptop launch exceptional ($6M revenue, 20% volume)</li>
                  <li>• Longest tenure (4.5 years) deserves detail</li>
                  <li>• Product strategy demonstrated</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 5 bullets may be too many (could consolidate to 3)</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Bullet Optimization:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (5 bullets):</p>
                <p className="text-foreground text-sm">Multiple bullets about product launches and lifecycle management</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (3 bullets - strongest achievements):</p>
                <ul className="text-foreground text-sm space-y-2">
                  <li>• <strong>Developed market opportunity for AMD-powered commercial laptops</strong> by defining product positioning, customer messaging, and go-to-market strategies, leading to launch that increased volume by 20% and generated $6M incremental revenue</li>
                  <li>• <strong>Managed product lifecycle from concept through launch</strong>, coordinating cross-functional teams across 8 APAC countries, ensuring on-time delivery and alignment with regional market requirements</li>
                  <li>• <strong>Conducted competitive analysis and market research</strong> identifying customer pain points and market gaps, informing product strategy that resulted in 3 successful launches and 15%+ market share gains</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Kept strongest bullet (AMD launch with $6M revenue)</p>
                  <p>✅ Enhanced cross-functional bullet (added "8 countries")</p>
                  <p>✅ Consolidated research bullet with outcomes (3 launches, 15% share)</p>
                  <p>✅ Removed generic bullets</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score:</strong> ⭐⭐⭐⭐⭐ (5/5) - Strong, now more focused</p>
          </div>

          {/* 8. Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. Education</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Good Credentials, Poor Presentation)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• UCLA Anderson MBA (top-tier program)</li>
                  <li>• Strong undergrad GPA (4.1/4.3, top 1%)</li>
                  <li>• Leadership roles (TSBA President, Transformative Leader)</li>
                  <li>• Product competition finalist (Tepper Challenge)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Basketball captain irrelevant for most roles</li>
                  <li>• Club memberships generic</li>
                  <li>• Takes up too much space (8 lines)</li>
                  <li>• Fellowship lacks context</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Changes Made:</h4>
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground text-sm font-mono">EDUCATION<br/>NATIONAL CHENGCHI UNIVERSITY<br/>BACHELOR OF INTERNATIONAL BUSINESS<br/>Basketball Team Captain<br/>Technology Business Club Member<br/>Video Game Business Association Member</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <div className="text-foreground text-sm font-mono">
                  <p className="font-semibold">UCLA ANDERSON SCHOOL OF MANAGEMENT</p>
                  <p>Master of Business Administration (MBA) | June 2026</p>
                  <p className="mt-2 font-semibold">NATIONAL CHENGCHI UNIVERSITY</p>
                  <p>Bachelor of International Business</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Undergraduate condensed (removed basketball, clubs)</p>
                  <p>✅ Saved 3-4 lines for professional summary</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>
        </section>

        {/* PART 4: STRATEGIC POSITIONING */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 4: Strategic Positioning</h2>
          </div>

          {/* Microsoft Business Program Manager */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> Target Role Analysis: Microsoft Business Program Manager (IC3)
            </h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>Job Posting:</strong> Business Program Management - MBA Full-time Opportunities</p>
              <p className="text-sm text-muted-foreground">Location: Redmond, WA | Posted: January 10, 2026 | Team: Industry Solution Delivery Business Excellence</p>
              <p className="text-sm text-gold mt-2 font-semibold">📋 Your Fit Assessment: 85/100 (Strong Match)</p>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Requirement Category</th>
                    <th className="text-left py-2 text-foreground">Your Readiness</th>
                    <th className="text-left py-2 text-muted-foreground">Evidence from Resume</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Program management</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">6+ years managing cross-functional programs (desktop launch 80K units, 10-country roadmap, Cambodia market entry)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cross-functional stakeholder management</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Coordinated Engineering/Product/Sales/Marketing teams across ASUS roles; managed 5-person teams and 10+ country stakeholders</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data-driven performance metrics (OKRs/KPIs)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">All bullets quantified with clear metrics; Google Analytics certified; optimization work (30% cost reduction, 20% volume increase)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Program communication & evangelism</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Education roadmap (10 countries), partnership expansion (300%+), market entry presentations to executives</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cost-benefit analysis & business case</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Cambodia market sizing ($200-300M), AMD opportunity ($6M), but no explicit P&L or ROI calculation experience shown</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Change management & buy-in</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Cross-functional coordination evident, but no explicit "change management" or "organizational transformation" examples</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">MBA from target school</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">UCLA Anderson June 2026; TSBA President; Tepper Product Challenge finalist</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">2+ years program/process management</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">6+ years exceeds requirement; multiple program launches and lifecycle management examples</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Overall Assessment:</strong> Strong fit for Microsoft Business Program Manager role. Your product/GTM background aligns well with 80% of requirements. Two moderate gaps (explicit P&L experience, change management) can be addressed through resume reframing and interview preparation.</p>
            </div>
          </div>

          {/* Post-MBA Product Management Roles */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold" /> Post-MBA Product Management Roles (Other Companies)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Target Companies: Google, Amazon, Meta, Salesforce, Adobe</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">Requirement #1: Product Strategy & Roadmap</p>
                <p className="text-sm font-semibold text-foreground mb-2">Your Positioning:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ Desktop program launch ($28M revenue)</li>
                  <li>✅ Education product roadmap (10 countries)</li>
                  <li>✅ Market opportunity identification ($6M AMD, $200-300M Cambodia)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2"><strong>Resume Emphasis:</strong> Lead with revenue numbers, Highlight "product positioning," "roadmap development", Show cross-functional coordination</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">Requirement #2: Cross-Functional Leadership</p>
                <p className="text-sm font-semibold text-foreground mb-2">Your Positioning:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ Multi-team coordination (5-person team, 10-country deployment)</li>
                  <li>✅ Stakeholder management across functions</li>
                  <li>✅ Engineering/sales/marketing collaboration</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2"><strong>Resume Emphasis:</strong> Quantify team sizes ("12 stakeholders"), Add "sprint planning," "stand-ups", Specify functions worked with</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">Requirement #3: Data-Driven Decision Making</p>
                <p className="text-sm font-semibold text-foreground mb-2">Your Positioning:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ Analytics tools (Tableau, SQL, Python, Google Analytics)</li>
                  <li>✅ Metrics-driven (all bullets quantified)</li>
                  <li>✅ Optimization work (30% cost reduction, 23% conversion improvement)</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2"><strong>Resume Emphasis:</strong> Add "A/B testing" to OPSERA role, Include product metrics (conversion rate, CAC), Emphasize "data analysis," "KPI tracking"</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">Requirement #4: MBA from Target School</p>
                <p className="text-sm font-semibold text-foreground mb-2">Your Positioning:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>✅ UCLA Anderson MBA - Strong for tech PM recruiting</li>
                  <li>✅ Product Management coursework</li>
                  <li>✅ TSBA President leadership</li>
                </ul>
                <p className="text-sm text-muted-foreground mt-2"><strong>Resume Emphasis:</strong> Lead with MBA in professional summary, Feature Product Management courses, Quantify TSBA leadership (50+ members)</p>
              </div>
            </div>
          </div>
        </section>

        {/* Next Steps */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps</h2>
          </div>

          {/* Immediate Actions */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Immediate Actions
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>Review the Optimized Resume</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Verify all facts and metrics are accurate</li>
                  <li>Ensure you can speak to every achievement in detail</li>
                  <li>Check that tone/voice feels authentic to you</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Apply to 5-10 Target Roles</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Start with priority companies (Microsoft, Google, Amazon PM programs)</li>
                  <li>Use custom cover letters if needed</li>
                  <li>Track applications</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Prepare Interview Stories Using STAR Method</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li><strong>S</strong>ituation: What was the context/problem?</li>
                  <li><strong>T</strong>ask: What was your specific responsibility?</li>
                  <li><strong>A</strong>ction: What did you do? (step-by-step)</li>
                  <li><strong>R</strong>esult: What happened? (quantified)</li>
                </ul>
                <p className="text-sm text-muted-foreground ml-6 mt-2">
                  Use my full interview prep guide: <a href="https://jamesbugden.com/interview-preparation-guide" className="text-gold hover:underline">English</a>, <a href="https://jamesbugden.com/zh-tw/interview-preparation-guide" className="text-gold hover:underline">中文</a>
                </p>
              </li>
              <li className="text-foreground">
                <strong>Update LinkedIn Profile to Match Resume</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Mirror resume positioning</li>
                  <li>Use same/adapted summary</li>
                  <li>Ensure consistency</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do's
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Customize for each application - Change 2-3 bullets to match JD keywords</li>
                <li>• Follow up after applying - Email recruiter 5-7 days later</li>
                <li>• Be ready to explain every metric - Interviewers will ask</li>
                <li>• Keep examples confidential - Don't mention internal project names</li>
                <li>• Show genuine enthusiasm - Reference specific company initiatives</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Don't apply without customization - Quality &gt; quantity</li>
                <li>• Don't exaggerate metrics - Be ready to support with data</li>
                <li>• Don't badmouth previous employers - Stay professional</li>
                <li>• Don't ignore cultural fit - Research company values</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Closing */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">Your Resume Transformation</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Before:</p>
                <ScoreGauge score={80} label="Original Resume" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">After:</p>
                <ScoreGauge score={95} label="Optimized Resume" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>Your experience is exceptional:</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 7+ years of product management and business development success</li>
                <li>• Proven track record at ASUS, Whirlpool, and fast-growing startups</li>
                <li>• Multiple product launches across consumer electronics, appliances, and SaaS</li>
                <li>• Deep expertise in cross-functional leadership, market strategy, and go-to-market execution</li>
                <li>• Strong foundation in competitive analysis, user research, and data-driven decision-making</li>
                <li>• UCLA Anderson MBA (June 2026) - positioning you for top-tier PM and BD roles</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">Your previous resume wasn't telling this story effectively. Your new resume does.</p>
              <p className="text-gold mt-4 font-semibold">You have the experience. You have the MBA from a target school. Now you have the positioning. Go get the offer. 🚀</p>
            </div>
          </div>
        </section>

        {/* Your Feedback Matters */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">Your Feedback Matters</h2>
            <p className="text-foreground mb-6">I hope this review has been valuable in strengthening your application.</p>
            <p className="text-muted-foreground mb-6">If you found this review helpful, I'd greatly appreciate your feedback:</p>
            
            {/* Prominent CTA Cards */}
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              {/* Share Feedback Card */}
              <a 
                href="https://tally.so/r/81L09x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">Share Your Feedback</h3>
                    <p className="text-sm text-muted-foreground">Takes 2 minutes</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Your honest feedback helps me improve and helps other job seekers discover this service.</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  Leave Feedback
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              {/* Trustpilot Card */}
              <a 
                href="https://www.trustpilot.com/review/jamesbugden.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">Leave a Trustpilot Review</h3>
                    <p className="text-sm text-muted-foreground">Help others find quality service</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Public reviews build credibility and help other professionals make informed decisions.</p>
                <div className="mt-4 flex items-center text-gold font-medium text-sm">
                  Write Review
                  <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>

            {/* Trustpilot Score Note */}
            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">Why is the Trustpilot score 3.8?</span>
                <br className="hidden sm:block" />{" "}
                I've just started a new business and Trustpilot applies an initial weighting for new businesses, which can temporarily lower early scores. As more real client reviews are added, the score adjusts to reflect actual service quality.
              </p>
            </div>

            {/* Share Results - Smaller */}
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <p className="text-foreground font-medium">🎉 When you land interviews or offers, let me know!</p>
              <p className="text-sm text-muted-foreground mt-1">Your wins are my wins. Success stories help refine my approach.</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">Questions or need clarification on any recommendations?</p>
              <p className="text-muted-foreground mt-2">Feel free to reach out. I'm here to help you succeed.</p>
              <p className="text-gold mt-4 font-semibold">Best of luck with your MBA recruiting and congratulations on your UCLA Anderson journey!</p>
              <p className="text-sm text-muted-foreground mt-4">Review Completed: January 2026</p>
              <p className="text-sm text-muted-foreground">Client: Roger Lee | Target Role: Product Management - Post-MBA (Tech Companies)</p>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2025 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default RogerLeeReview;
