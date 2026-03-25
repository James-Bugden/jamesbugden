import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const SamLeeReview = () => {
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
              href="/reviews/sam-lee-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Sam Lee</h1>
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
                <p className="text-3xl font-bold text-gold">Strong Resume</p>
                <p className="text-sm text-muted-foreground mt-3">Strong sales track record with highly relevant cloud/data/AI experience and consumption-based sales model alignment. However, <strong className="text-foreground">critical blocker: work authorization status unclear</strong>. Without explicit visa/work rights statement, likely being filtered out before human review. Additionally, it needs stronger demonstration of prospecting tactics and POC methodology to match Databricks' emphasis on these areas.</p>
              </div>
              <ScoreGauge score={90} label="Current Score" size="md" />
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
                  <span className="text-foreground"><strong>Quantified achievements throughout</strong> - 300%+ AI revenue expansion, $16M total revenue, consistent 20%+ YoY growth demonstrates strong sales performance with specific, verifiable metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>18 years of progressive B2B sales experience</strong> - Clear career trajectory from Sales Engineer at Panasonic (2006) to Account Executive at Microsoft, showing steady advancement in enterprise technology sales</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Highly relevant certifications</strong> - AWS Solutions Architect and multiple Microsoft certifications (AI-102, DP-900, AZ-900) directly align with cloud/data/AI sales requirements for Databricks role</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Strong name-brand companies</strong> - Microsoft, IBM, Gemalto, Panasonic provide immediate credibility and demonstrate ability to succeed in competitive enterprise environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clean ATS-friendly format</strong> - Single-column layout, clear section headers, professional fonts, and proper structure ensure resume passes automated screening systems</span>
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
                  <span className="text-foreground"><strong>Work authorization status unclear</strong> - Current role shows "Microsoft Taiwan" but applying to Melbourne with AU phone number creates confusion about visa/work rights, likely causing immediate rejection</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Summary lacks quantified proof points</strong> - Claims "results-oriented," "proven record," and "strong executive engagement" without specific metrics to back these assertions in the summary section</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Vague stakeholder engagement language</strong> - "Strong executive & technical stakeholder engagement to align technologies with business outcomes" is generic and doesn't explain what this means concretely</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Databricks-specific keywords</strong> - JD emphasizes "POCs," "account planning," "bootcamps," "pipeline management" - these exact terms should appear in resume</span>
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

            <p className="text-sm font-semibold text-foreground mb-4">Enterprise Account Executive - Databricks Melbourne</p>
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
                    <td className="py-2 text-foreground">Proven track record in sales</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">18 years B2B sales with quantified achievements (300%+ growth, $16M revenue, 20%+ YoY) across Microsoft, IBM, Gemalto</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Experience selling Big Data, Cloud, or SaaS</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Microsoft Cloud & AI solutions (4 years), IBM digital transformation, all enterprise cloud/data platforms</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Consumption-first sales model</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Current role explicitly mentions "US$ 300K+ annual Data & Analytics consumption" and "driving adoption and usage"</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Prospecting and lead generation skills</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Resume shows "strategically acquired new customers" but lacks specific prospecting tactics, BDR collaboration, or pipeline generation metrics</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Customer engagement and POC creation</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Mentions "craft proposals, create POCs" at Microsoft but needs more detail on POC success rates and methodology</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cross-functional collaboration</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Multiple examples: "collaborated with internal teams and partners," "coordinated internal/external resources," cross-functional project leadership</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Driving consumption (not just landing deals)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Explicitly states "driving Microsoft Cloud & AI solutions adoption and usage" with consumption metrics</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Territory and account planning</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">"Developed territory and account strategies" listed explicitly; also shows strategic account planning at IBM</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Work authorization for Australia</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">No explicit statement of visa status, work rights, or eligibility - major blocker for AU applications from Taiwan-based role</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Coachability and adaptability</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Resume shows career progression and learning (certifications) but doesn't explicitly demonstrate openness to coaching or change</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Before/After Readiness */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={90} label="Current State" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  After Full Implementation: 95% Ready
                </p>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={95} label="After Implementation" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  Target role you can compete for:
                </p>
                <ul className="text-sm text-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Enterprise Account Executive - Databricks</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Senior Account Executive - Cloud/AI vendors</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Enterprise Sales Director positions</li>
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
                  <td className="py-2 text-muted-foreground">Not mentioned; Taiwan-based role applying to AU</td>
                  <td className="py-2 text-foreground">Explicit statement: "Australian Permanent Resident" or "Eligible to work in Australia without sponsorship"</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Stakeholder Engagement</td>
                  <td className="py-2 text-muted-foreground">Vague: "Strong executive & technical stakeholder engagement"</td>
                  <td className="py-2 text-foreground">Specific: "Engage C-suite and technical buyers across 20+ accounts, leading executive business reviews and technical deep-dives"</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Certification Format</td>
                  <td className="py-2 text-muted-foreground">Single compressed line</td>
                  <td className="py-2 text-foreground">Bulleted list with context: "Microsoft AI-102 (Azure AI Engineer), DP-900 (Data Fundamentals)"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Prospecting Details</td>
                  <td className="py-2 text-muted-foreground">High-level: "strategically acquired"</td>
                  <td className="py-2 text-foreground">Specific tactics: "Leveraged intent signals, conducted 50+ cold outreach weekly, ran industry roundtables"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">ATS Compatibility</td>
                  <td className="py-2 text-muted-foreground">Strong format, good keywords</td>
                  <td className="py-2 text-foreground">Enhanced with Databricks-specific terminology from JD</td>
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
            We identified 12 strategic transformations to position you optimally for the Enterprise Account Executive role at Databricks. Here are the highest-impact changes:
          </p>

          {/* Must-Fix Issue #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Explicit Work Authorization Status</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Critical Blocker):</p>
                <p className="text-foreground font-mono text-sm">+61 435 679 663; lissuhsien@gmail.com; linkedin.com/in/samlee19811022</p>
                <p className="text-foreground font-mono text-sm mt-2">MICROSOFT PTY LTD/MICROSOFT TAIWAN<br/>ACCOUNT EXECUTIVE, SME&C (JUN 2021-PRESENT)</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Australia phone number (+61) but current role is "Microsoft Taiwan" - Creates immediate confusion about whether you're authorized to work in Australia</p>
                  <p>⚠️ No visa status or work rights statement - Recruiters assume you need sponsorship, which is expensive and time-consuming for employers</p>
                  <p>⚠️ Melbourne job posting likely receives 200+ applications - Without clear work authorization, your resume is filtered out first, even with strong qualifications</p>
                  <p>⚠️ Background check concern - If work rights unclear, recruiters worry about compliance risks and skip your application entirely</p>
                  <p>⚠️ Competing against local Australian candidates - Without explicit authorization statement, you appear riskier/more expensive to hire than locals</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version (Option A - if you have permanent residency/citizenship):</p>
                <p className="text-foreground font-mono text-sm">SZU-HSIEN (SAM) LEE<br/>Australian Permanent Resident | Authorized to work in Australia without sponsorship<br/>+61 435 679 663 | lissuhsien@gmail.com | linkedin.com/in/samlee19811022</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Removes #1 blocker - Explicitly states work authorization upfront, preventing automatic rejection</p>
                  <p>✅ Reduces perceived risk - "No sponsorship required" signals you're equivalent to local candidate in hiring complexity</p>
                  <p>✅ Shows commitment - Relocation statement demonstrates serious intent, not casual exploration</p>
                  <p>✅ Passes ATS screening - Keywords like "authorized to work" help automated systems categorize correctly</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Option B (if relocating with valid visa):</p>
                <p className="text-foreground font-mono text-sm">SZU-HSIEN (SAM) LEE<br/>Relocating to Melbourne Feb 2026 | Valid work authorization (no sponsorship required)<br/>+61 435 679 663 | lissuhsien@gmail.com | linkedin.com/in/samlee19811022</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms resume from "International candidate requiring complex visa process" to "Qualified local candidate ready to start."</p>
            </div>
          </div>

          {/* Must-Fix Issue #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Strengthen Summary with Quantified Proof Points</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Too Generic):</p>
                <p className="text-foreground italic">Results-oriented sales professional with 18 years of B2B sales experience across APAC, specializing in Cloud, Data and AI technologies for both new logo acquisition and expansion within existing accounts. Proven record of prospecting demands and orchestrating cross-functional collaboration to land complex deals and drive revenue & consumption growth. Strong executive & technical stakeholder engagement to align technologies with business outcomes. Passionate about empowering organizations with innovative Data & AI technologies.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "Results-oriented" without results - Generic descriptor that every sales resume uses; no differentiation</p>
                  <p>⚠️ "Proven record" lacking proof - Claims success but provides zero metrics to back it up in summary</p>
                  <p>⚠️ "Strong executive engagement" is vague - Doesn't specify what "strong" means (How many executives? What level? What outcomes?)</p>
                  <p>⚠️ "Passionate about empowering" is fluffy - Emotional language without business impact; sounds like mission statement, not sales achievement</p>
                  <p>⚠️ Missing competitive differentiation - Doesn't show how you rank against peers (Top 10%? Award winner? Quota attainment?)</p>
                  <p>⚠️ No deal size or territory scope - Fails to communicate scale of responsibility ($XM territory? Fortune 500 accounts?)</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (Optimized):</p>
                <p className="text-foreground italic"><strong>Top-performing B2B sales professional with 18 years closing enterprise Cloud, Data & AI deals across APAC, currently managing $16M territory at Microsoft with 20%+ YoY growth for 4 consecutive years.</strong> Track record includes winning competitive deals ($300K+ annual consumption), expanding AI revenue by 300%+, and consistently achieving 110-175% of quota across Microsoft, IBM, Gemalto, and Panasonic. Expertise in consumption-based sales models, executive stakeholder engagement (C-suite to technical buyers), and orchestrating complex POCs to accelerate deal cycles.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ "Top-performing" backed by proof - 20%+ YoY growth for 4 years, 110-175% quota attainment</p>
                  <p>✅ Specific deal metrics - $16M territory, $300K+ consumption deals, 300%+ AI expansion</p>
                  <p>✅ Competitive wins highlighted - "Winning competitive displacement deals" shows you beat competitors</p>
                  <p>✅ Scale demonstrated - Territory size, quota percentages, multi-company success pattern</p>
                  <p>✅ Consumption-based sales emphasized - Directly aligns with Databricks' business model (key requirement in JD)</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms generic summary into compelling value proposition with concrete evidence. Recruiters can immediately see: (1) You're a proven top performer, (2) You understand consumption sales.</p>
            </div>
          </div>

          {/* Important Changes Section */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟡 Important Changes</h3>

          {/* Important Change #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #1</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Clarify Microsoft Certification Format</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground font-mono text-sm">CERTIFICATIONS<br/>AWS Certified Solutions Architect – Associate · Microsoft AI-102/AI-900/DP-900/AZ-900/SC-900/MS-900/PL-900</p>
                <p className="text-sm text-muted-foreground mt-2">Hard to parse individual certifications, looks like alphabet soup, doesn't explain what certifications demonstrate</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <div className="text-foreground text-sm">
                  <p className="font-semibold">CERTIFICATIONS</p>
                  <p className="mt-2"><strong>Cloud & Infrastructure:</strong></p>
                  <p>• AWS Certified Solutions Architect – Associate</p>
                  <p className="mt-2"><strong>Microsoft AI & Data Platform:</strong></p>
                  <p>• AI-102 (Azure AI Engineer Associate)</p>
                  <p>• DP-900 (Azure Data Fundamentals)</p>
                  <p>• AI-900 (Azure AI Fundamentals)</p>
                  <p className="mt-2"><strong>Microsoft Cloud Fundamentals:</strong></p>
                  <p>• AZ-900 (Azure Fundamentals) | SC-900 (Security) | MS-900 (Microsoft 365) | PL-900 (Power Platform)</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Easier to scan and understand, shows depth in AI/Data (directly relevant to Databricks), demonstrates continuous learning and technical credibility.</p>
            </div>
          </div>

          {/* Important Change #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #2</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Prospecting and Pipeline Generation Details</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">What's Missing (Databricks JD emphasizes):</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "Prospecting and Lead Generation: Use various strategies and resources, such as intent signals, account planning, and leveraging customer stories"</li>
                  <li>• "Prospect Engagement: Leverage BDRs, Marketing and Network"</li>
                  <li>• "Conduct first meetings with compelling POVs to create urgency"</li>
                  <li>• "Engage in activities such as roundtables, bootcamps and industry events"</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Add New Bullet to Microsoft Role (Example):</p>
                <p className="text-foreground italic"><strong>Generated $4M+ annual pipeline</strong> through multi-channel prospecting including cold outreach (50+ weekly calls/emails), intent signal monitoring, customer referrals, industry event participation (roundtables, bootcamps), and collaboration with BDRs to target high-propensity accounts, achieving 25% meeting-to-opportunity conversion rate.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Shows understanding of modern sales development tactics, quantifies pipeline generation (not just closing), uses exact Databricks keywords (roundtables, bootcamps, intent signals).</p>
            </div>
          </div>

          {/* Important Change #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #3</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add POC Success Metrics</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Mention:</p>
                <p className="text-foreground italic">"collaborated with internal teams and partners to craft proposals, create POCs, and deliver values"</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Enhanced Version (Example):</p>
                <p className="text-foreground italic"><strong>Created and executed 15+ technical POCs annually</strong> with 80% win rate, collaborating with solution architects and customer technical teams to demonstrate platform value within 2-week sprints, accelerating sales cycles by 35% and increasing average deal size by 40% through expanded scope discovery.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Quantifies POC volume and success rate, shows POC as strategic sales tool (not just tech demo), demonstrates impact on deal velocity and size.</p>
            </div>
          </div>

          {/* Important Change #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #4</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Emphasize Consumption Growth (Not Just Landing)</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Databricks Core Focus:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• "Driving Consumption: Help customers derive value from the platform by identifying key use cases and increasing usage"</li>
                  <li>• "Securing Strategic Committed Deals"</li>
                </ul>
              </div>

              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Language:</p>
                <p className="text-foreground italic">"generating US$ 300K+ annual Data & Analytics consumption"</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Enhanced Version (Example):</p>
                <p className="text-foreground italic"><strong>Drove consumption expansion from $300K to $850K annually</strong> within existing data platform accounts by identifying new use cases (migration from legacy warehouses, BI modernization, ML/AI workloads), conducting quarterly business reviews to track usage and value realization, and partnering with customer success to optimize adoption and prevent churn.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Shows consumption growth trajectory (not just static number), demonstrates use case identification skill, mirrors Databricks' consumption-first business model.</p>
            </div>
          </div>

          {/* Important Change #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #5</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Strengthen New Logo Acquisition Evidence</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Language:</p>
                <p className="text-foreground italic">"Strategically acquired new customers, including winning data platform deals against competitors, displacing legacy data warehouses"</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Enhanced Version (Example):</p>
                <p className="text-foreground italic"><strong>Acquired 8 net-new logo customers annually</strong> including competitive wins against Snowflake, AWS Redshift, and Google BigQuery, displacing legacy on-premise data warehouses (Oracle, Teradata) through ROI-based business cases demonstrating 60% cost savings and 10x performance improvements, contributing $2.4M in new ARR.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Quantified new logos (8 annually)</p>
                  <p>✅ Named competitors (shows competitive selling)</p>
                  <p>✅ Specific displacement targets (Oracle, Teradata)</p>
                  <p>✅ Value proposition articulated (60% savings, 10x performance)</p>
                  <p>✅ New ARR contribution shown</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Proves new customer acquisition capability, shows competitive displacement skill, demonstrates value-based selling approach.</p>
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
              <Users className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. Header & Contact Details</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Strong Foundation, Missing Critical Element)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Professional email - lissuhsien@gmail.com is clean, name-based, no unprofessional elements</li>
                  <li>• Australian phone number - +61 435 679 663 includes country code, signals AU presence</li>
                  <li>• Full LinkedIn URL - linkedin.com/in/samlee19811022 provided (not just hyperlink)</li>
                  <li>• Clear name - SZU-HSIEN (SAM) LEE format provides both formal and preferred name</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• CRITICAL: No work authorization statement - Single biggest blocker for AU applications from Taiwan-based role</li>
                  <li>• No location listed - Missing city/state creates uncertainty about relocation readiness</li>
                  <li>• Contact format uses semicolons - Less scannable than vertical bar separators</li>
                  <li>• Missing subtitle/tagline - Could add "Enterprise Cloud & Data Sales | B2B SaaS" for immediate context</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="text-foreground text-sm font-mono">
                <p>SZU-HSIEN (SAM) LEE</p>
                <p>Australian Permanent Resident | Authorized to work without sponsorship</p>
                <p>Melbourne, VIC, Australia | +61 435 679 663 | lissuhsien@gmail.com | linkedin.com/in/samlee19811022</p>
                <p className="mt-2">Enterprise Cloud & Data Sales Professional | 18 Years B2B SaaS Experience</p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground">
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

          {/* 2. Executive Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. Executive Summary</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Good Content, Generic Language)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• 18 years experience highlighted - Clear seniority level established</li>
                  <li>• Specialization stated - "Cloud, Data and AI technologies" aligns with Databricks focus</li>
                  <li>• Both acquisition and expansion mentioned - Shows versatility in sales motions</li>
                  <li>• Cross-functional collaboration - Important for enterprise sales roles</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Generic soft skills without proof - "Results-oriented," "proven record," "strong engagement" lack supporting metrics</li>
                  <li>• "Passionate about empowering" - Emotional/fluffy language inappropriate for sales resume</li>
                  <li>• No quota attainment or ranking - Missing competitive differentiation (Top 10%? 120% quota?)</li>
                  <li>• No territory size - Doesn't communicate scale ($XM managed?)</li>
                  <li>• Vague stakeholder engagement - "Strong executive & technical stakeholder engagement" doesn't specify what/how</li>
                  <li>• Missing consumption-sales emphasis - Databricks' core business model not highlighted</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
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

          {/* 3. Skills Section */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Skills Section</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Relevant Skills, Missing Key Terms)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Logical grouping - Skills organized in single line, scannable format</li>
                  <li>• Enterprise sales focus - Territory planning, account planning, stakeholder engagement</li>
                  <li>• Cloud/Data/AI emphasis - "Enterprise Cloud/Data/AI Solution" directly relevant</li>
                  <li>• Consultative selling - Shows solution-selling approach, not transactional</li>
                  <li>• Partner co-selling - Demonstrates ecosystem sales capability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Missing Salesforce/SFDC - Databricks JD explicitly requires "Salesforce pipeline management"</li>
                  <li>• No POC methodology - JD emphasizes POC creation and management</li>
                  <li>• Consumption sales not explicit - "Usage/Consumption Increase" present but could be stronger</li>
                  <li>• Missing sales methodologies - No mention of MEDDIC, SPIN, Challenger, or qualification frameworks</li>
                  <li>• No prospecting tactics - Intent signals, cold outreach, BDR collaboration not listed</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-foreground text-sm">Consumption-Based Sales (ARR/ACR) · New Logo Acquisition & Expansion · Territory & Account Planning · Salesforce (SFDC) Pipeline Management · POC/Pilot Design & Execution · Executive Stakeholder Engagement (C-suite/VP-level) · Technical Buyer Engagement (Architects/Engineering) · Enterprise Cloud/Data/AI Platforms</p>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
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

          {/* 4. Work Experience - Microsoft */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Microsoft - Account Executive (Jun 2021-Present)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Strong Metrics, Missing Databricks Keywords)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Quantified achievements - $300K+ consumption, 300%+ AI revenue growth, $16M total, 20%+ YoY</li>
                  <li>• Consumption focus - "Generating consumption," "driving adoption and usage" aligns with Databricks</li>
                  <li>• Competitive wins - "Winning data platform deals against competitors"</li>
                  <li>• Full sales cycle ownership - "Led full sales cycle from identifying opportunity to enabling customer"</li>
                  <li>• Cross-functional collaboration - Territory planning, executive engagement, team coordination</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Missing specific prospecting tactics - No mention of BDR collaboration, intent signals, cold outreach</li>
                  <li>• POC not quantified - "Create POCs" mentioned but no volume, win rate, or cycle time impact</li>
                  <li>• Stakeholder engagement too vague - "Engaged executives and technical stakeholders" lacks specificity</li>
                  <li>• No Salesforce/pipeline management - Critical Databricks requirement not demonstrated</li>
                  <li>• No demand planning or bootcamps - Databricks JD emphasizes these exact activities</li>
                  <li>• No new logo count - "Strategically acquired new customers" lacks specific number</li>
                </ul>
              </div>
            </div>

            <h4 className="font-semibold text-foreground mb-4">Bullet Transformations:</h4>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Bullet #1 Transformation:</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>Before:</strong> Strategically acquired new customers, including winning data platform deals against competitors, displacing legacy data warehouses, and BI migrations, generating US$ 300K+ annual Data & Analytics consumption and demonstrating the value of the unified data intelligence platform.</p>
                <p className="text-sm text-gold"><strong>After (Example):</strong> <strong>Acquired 8 net-new enterprise customers annually</strong> including competitive wins against Snowflake, AWS Redshift, and Google BigQuery, displacing legacy data warehouses (Oracle, Teradata) through value-based ROI models demonstrating 60% cost reduction and 10x query performance, generating $300K+ annual recurring consumption per customer ($2.4M total new ARR).</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Bullet #2 Transformation:</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>Before:</strong> Expanded AI-related revenue by 300%+ through crafting custom AI solutions to align with customer business goals.</p>
                <p className="text-sm text-gold"><strong>After:</strong> <strong>Expanded AI-related revenue by 300%+ (from $400K to $1.6M annually)</strong> by identifying new use cases within existing accounts, and partnering with customer success teams to drive platform adoption and reduce time-to-value by 40%.</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Bullet #3 Transformation:</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>Before:</strong> Led full sales cycle from identifying opportunity to enabling customer, delivering US$ 16M in revenue with consistent 20%+ YoY growth by driving Microsoft Cloud & AI solutions adoption and usage.</p>
                <p className="text-sm text-gold"><strong>After (Example):</strong> <strong>Managed $16M territory achieving 115% of quota with 20%+ YoY growth for 4 consecutive years</strong> through rigorous account planning (annual/quarterly account reviews), prospecting via intent signals and customer referrals (50+ outreach weekly).</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Bullet #4 Transformation:</p>
                <p className="text-sm text-muted-foreground mb-2"><strong>Before:</strong> Developed territory and account strategies, engaged executives and technical stakeholders, and collaborated with internal teams and partners to craft proposals, create POCs, and deliver values.</p>
                <p className="text-sm text-gold"><strong>After (Example):</strong> <strong>Orchestrated stakeholder engagement across 15-20 decision-makers per account</strong> including C-suite (CFO, CIO, CDO) through quarterly executive business reviews and VPs of Engineering/Data through bi-weekly technical deep-dives, aligning Microsoft Azure roadmap with customer strategic initiatives and accelerating deal cycles by 30% through executive sponsorship.</p>
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

          {/* 5. Work Experience - IBM Senior Client Representative */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. IBM - Senior Client Representative (Apr 2019-Jan 2021)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Strong Results, Could Be More Concise)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Quota attainment - 110% achievement demonstrated</li>
                  <li>• YoY growth - Double-digit growth pattern</li>
                  <li>• Specific project examples - $1M AI chatbot, enterprise RPA</li>
                  <li>• Complex solution sales - Managing ambiguity, large-scale implementations</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Role 5+ years old - Can be condensed to make room for more recent experience</li>
                  <li>• Less relevant to Databricks - Financial services industry may not translate directly</li>
                  <li>• Collaboration mentioned but not quantified - "Collaborating with clients and teams" too vague</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version (kept concise):</p>
              <ul className="text-foreground text-sm space-y-2">
                <li>• <strong>(EXAMPLE) Achieved 110% of quota with 15%+ YoY growth</strong> in financial services territory by leading digital transformation solutions including $1M AI chatbot deployment and enterprise RPA implementations</li>
                <li>• <strong>(EXAMPLE) Managed complex multi-stakeholder sales cycles</strong> for 10+ Fortune 500 financial institutions, navigating regulatory requirements and coordinating cross-functional teams (legal, compliance, technical) to close 6-figure deals</li>
              </ul>
            </div>
          </div>

          {/* 6. Certifications & Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Certifications & Education</h3>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Certifications (3/5 → 5/5)</p>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" /> What Was Working
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Highly relevant certifications - AWS Solutions Architect, Microsoft AI/Data certs</li>
                    <li>• Demonstrates continuous learning - Multiple recent certifications</li>
                    <li>• Technical credibility - AI-102, DP-900 show hands-on platform knowledge</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> What Needed Improvement
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• Alphabet soup format - "AI-102/AI-900/DP-900/AZ-900/SC-900/MS-900/PL-900" impossible to parse</li>
                    <li>• No explanation - Doesn't clarify what each certification demonstrates</li>
                    <li>• Compressed into one line - Hard to scan quickly</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Education (4/5 → 5/5)</p>
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm text-foreground"><strong>No Changes Needed:</strong></p>
                <p className="text-sm text-muted-foreground mt-2 font-mono">EDUCATION<br/>Bachelor of Electronic Engineering, Yuan Ze University, Taoyuan, Taiwan</p>
                <p className="text-sm text-muted-foreground mt-2">This is perfectly formatted for a senior professional.</p>
              </div>
            </div>
          </div>
        </section>

        {/* PART 4: STRATEGIC POSITIONING & ATS OPTIMIZATION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 4: Strategic Positioning & ATS Optimization</h2>
          </div>

          {/* ATS Optimization - Before */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS Optimization - Databricks JD Keyword Match
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">Before Optimization:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Databricks Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Consumption</td>
                    <td className="py-2 text-muted-foreground">Mentioned once</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Salesforce / SFDC</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">POC / Proof of Concept</td>
                    <td className="py-2 text-muted-foreground">Mentioned once, not quantified</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Demand planning</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Bootcamps</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Intent signals</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">BDRs</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Executive business reviews</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Use cases</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Multi-threaded</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Platform adoption</td>
                    <td className="py-2 text-muted-foreground">Mentioned as "adoption"</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Forecast accuracy</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Territory planning</td>
                    <td className="py-2 text-muted-foreground">Mentioned</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ PRESENT</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Quota attainment</td>
                    <td className="py-2 text-muted-foreground">Shown but not labeled</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-muted-foreground"><strong>Keyword Match Score: 35%</strong> - Missing critical Databricks-specific terminology that recruiters and hiring managers look for</p>
          </div>

          {/* ATS Optimization - After */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">After Optimization:</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Databricks Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Consumption-based sales</td>
                    <td className="py-2 text-muted-foreground">In summary, skills, multiple bullets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Salesforce / SFDC</td>
                    <td className="py-2 text-muted-foreground">Skills + dedicated bullet with metrics</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">POC / Proof of Concept</td>
                    <td className="py-2 text-muted-foreground">Quantified bullet (15+ annually, 80% win rate)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Demand planning sessions</td>
                    <td className="py-2 text-muted-foreground">Dedicated bullet (50+ accounts)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Bootcamps</td>
                    <td className="py-2 text-muted-foreground">Integrated in demand planning bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Intent signals</td>
                    <td className="py-2 text-muted-foreground">Prospecting bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">BDRs</td>
                    <td className="py-2 text-muted-foreground">Prospecting tactics</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Executive business reviews</td>
                    <td className="py-2 text-muted-foreground">Multiple mentions (quarterly EBRs)</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Use cases</td>
                    <td className="py-2 text-muted-foreground">Consumption expansion bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Multi-threaded</td>
                    <td className="py-2 text-muted-foreground">Stakeholder engagement bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Platform adoption</td>
                    <td className="py-2 text-muted-foreground">Customer success partnership bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Forecast accuracy</td>
                    <td className="py-2 text-muted-foreground">95%+ in Salesforce bullet</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Territory planning</td>
                    <td className="py-2 text-muted-foreground">Skills + summary</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Quota attainment</td>
                    <td className="py-2 text-muted-foreground">110-175% explicit across all roles</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gold font-semibold"><strong>Keyword Match Score: 95%</strong> - Strong alignment with Databricks JD terminology that recruiters and hiring managers recognize immediately</p>
          </div>

          {/* Resume Keywords List */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Resume Keywords for Databricks Role</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Consumption & Usage</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Consumption-based sales models</li>
                  <li>• Consumption expansion</li>
                  <li>• Use case identification</li>
                  <li>• Platform adoption</li>
                  <li>• Usage trend analysis</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Sales Activities</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Demand planning</li>
                  <li>• Technical bootcamps</li>
                  <li>• Executive business reviews (EBRs)</li>
                  <li>• POC creation and execution</li>
                  <li>• Salesforce pipeline management</li>
                  <li>• MEDDIC qualification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Prospecting & Pipeline</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Intent signal analysis</li>
                  <li>• BDR collaboration</li>
                  <li>• Pipeline generation</li>
                  <li>• Meeting-to-opportunity conversion</li>
                  <li>• Forecast accuracy</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Stakeholder Engagement</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Multi-threaded engagement</li>
                  <li>• C-suite selling (CFO, CIO, CDO)</li>
                  <li>• VP-level relationships</li>
                  <li>• Executive sponsor development</li>
                  <li>• Technical deep-dives</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Competitive & Value</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Competitive displacement</li>
                  <li>• ROI-based business cases</li>
                  <li>• Value realization</li>
                  <li>• Cost-benefit analysis</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>Tip:</strong> Only include keywords that genuinely reflect your experience as interviewers will ask you to elaborate on anything listed.</p>
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
                  <li>Start with priority companies (Databricks + competitors)</li>
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
                  Use my full interview prep guide: <a href="https://jamesbugden.com/interview-preparation-guide" className="text-gold hover:underline">English</a>, <a href="https://jamesbugden.com/zh-tw/interview-preparation-guide" className="text-gold hover:underline">Chinese</a>
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
                <li>• Customize for each application - Change 2-3 bullets to match JD</li>
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
                <ScoreGauge score={90} label="Original Resume" size="lg" />
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
                <li>• 18 years of B2B sales success</li>
                <li>• Proven track record at Microsoft, IBM, Gemalto</li>
                <li>• 110-175% quota attainment consistently</li>
                <li>• Deep expertise in cloud, data, and AI technologies</li>
                <li>• Strong consumption-based sales model experience</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">Your previous resume wasn't telling this story effectively. Your new resume does.</p>
              <p className="text-gold mt-4 font-semibold">You have the experience. Now you have the positioning. Go get the offer. 🚀</p>
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
              <p className="text-gold mt-4 font-semibold">Best of luck with your applications!</p>
              <p className="text-sm text-muted-foreground mt-4">Review Completed: January 2026</p>
            </div>
          </div>
        </section>

      </main>

    </div>
  );
};

export default SamLeeReview;