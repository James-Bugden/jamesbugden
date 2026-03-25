import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp, Award, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const RoyTsaiReview = () => {
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
            <a href="/downloads/YI_TING_ROY_TSAI_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Yi-Ting (Roy) Tsai</h1>
          <p className="text-cream/80 text-lg">Brand Activation Manager at Revolut / Product Marketing Manager at Snap</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* OVERALL ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Overall Assessment</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Score</p>
                <p className="text-3xl font-bold text-gold">70/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">(After Implementation)</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={70} label="Before" size="md" />
                <ScoreGauge score={90} label="After" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>Your resume has strong quantified achievements and solid experience, but suffers from presentation issues that prevent it from landing interviews at your target companies.</p>
              <p>First, missing work authorization statement creates immediate rejection risk. You are applying from Taiwan to roles in UK (Revolut) and Singapore (Snap) with no visa status clarification. Recruiters assume you need expensive sponsorship and filter you out before reading your qualifications.</p>
              <p>Second, densely packed content makes it exhausting to read. Two pages with 20+ bullets across recent roles forces recruiters to hunt for relevant information. Your strongest achievements are buried in walls of text instead of highlighted upfront.</p>
              <p>Third, generic skills section wastes valuable ATS keyword opportunity. "Product Marketing," "Brand Strategy," and "Digital Strategy" are baseline assumptions that do not differentiate you or match specific job description requirements like "upper funnel," "creator economy," "brand consistency," or "customer segmentation."</p>
              <p className="text-gold font-semibold">However, you have good qualifications for a senior product marketing role ex. No.1 market share for 2 consecutive years, and M.A. Brand Leadership with Distinction from University of East Anglia - same university as me! The problem is not your experience. The problem is how you present it.</p>
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
                  <span className="text-foreground"><strong>Exceptional Quantified Achievements Throughout</strong>: 20X sales uplift, 5X conversion rate, +41% COVID-era growth, 15% retention vs. 10% benchmark, +79% brand health improvement, ROAS of 8, £251K cost savings across 6 APAC markets demonstrate consistent results-driven performance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Award Recognition Validates Quality</strong>: 2024 Sanofi Play-To-Win Award, 2022 J&J Digital First Award, 2020 Asia Pulp & Paper Outstanding Employee of the Year prove you deliver exceptional work recognized by leadership</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Strong Multinational Brand Experience</strong>: Sanofi, Kenvue, Johnson & Johnson, Asia Pulp & Paper, Coty Inc. provide credibility and show you can operate at scale in complex organizations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Program Building Demonstrated</strong>: Built first CRM loyalty programs at J&J (showcased globally across NA, EU, ANZ, SEA), first strategic partner program at Sanofi, first cross-brand activation proving you can create new capabilities from scratch</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Relevant Master's Degree with Distinction</strong>: M.A. Brand Leadership from University of East Anglia (UK) with Distinction directly aligns with brand activation and product marketing requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Cross-Functional Leadership Evident</strong>: Successfully collaborated with Digital IT, Commercial Growth, Compliance, Legal, Finance, Product, Design, Operations, PMO showing ability to drive alignment across complex stakeholder groups</span>
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
                  <span className="text-foreground"><strong>Missing Work Authorization Statement</strong>: No visa status, work rights, or relocation timeline stated. For UK and Singapore roles, this is the single biggest blocker causing automatic rejection regardless of qualifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Summary Too Long and Generic</strong>: 100+ word paragraph with vague claims ("measurable business impact," "driving brand growth") instead of leading with quantified proof points like "20X sales uplift" and "15% retention vs. 10% benchmark"</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Skills Section Too Generic and Missing Critical JD Keywords</strong>: "Product Marketing and Brand Strategy" does not match Revolut's need for "brand consistency," "customer segmentation," "content quality," or Snap's need for "upper funnel," "creator economy," "awareness and consideration campaigns"</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Experience Section Too Dense with 20+ Bullets</strong>: Sanofi (5 bullets), Kenvue (4 bullets), J&J (5 bullets), APP (2 bullets), NU SKIN (2 bullets), OPPO (3 bullets), Coty (2 bullets) forces recruiters to read everything instead of highlighting top 3-4 achievements per role</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>NU SKIN 3-Month Role Raises Questions</strong>: April-July 2019 tenure is very short and NU SKIN's MLM business model has controversial reputation that may hurt perception, especially for tech/CPG roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Education Projects Take Up Too Much Space</strong>: Three detailed 2016-2017 academic projects consume 8 lines for limited value. Your 10+ years of professional experience far outweighs student work</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Date Formatting Inconsistencies</strong>: Some use "Aug 2024 - Now" vs. "Nov 2023-Apr 2024" (missing spaces), creates unprofessional appearance</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Company Descriptors Inconsistent</strong>: Some in parentheses with periods "(Medical Device Manufacturer.)", others without "Johnson and Johnson(Consumer Health BU)" creating visual inconsistency</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* CURRENT STATE VS OPTIMAL STATE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Current State vs. Optimal State</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 px-2 text-foreground font-semibold">Element</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">Current State</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">Optimal State</th>
                  <th className="text-left py-3 px-2 text-foreground font-semibold">Priority</th>
                </tr>
              </thead>
              <tbody className="text-foreground">
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Work Authorization</td>
                  <td className="py-3 px-2 text-muted-foreground">Not mentioned</td>
                  <td className="py-3 px-2">Explicit statement: "Requires work sponsorship" or "Authorized to work without sponsorship" with relocation timeline</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Summary Length</td>
                  <td className="py-3 px-2 text-muted-foreground">100+ words, dense paragraph, generic claims</td>
                  <td className="py-3 px-2">4 sentences under 90 words with quantified proof points leading (20X sales, 15% retention, +41% growth)</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Summary Positioning</td>
                  <td className="py-3 px-2 text-muted-foreground">Generic "marketing professional"</td>
                  <td className="py-3 px-2">Role-specific: "Product Marketing Manager" or "Brand Activation Manager" with specialization</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Skills Section</td>
                  <td className="py-3 px-2 text-muted-foreground">4 generic skills, missing critical JD keywords</td>
                  <td className="py-3 px-2">Organized by category with 20+ specific tools, methodologies, and JD keywords (upper funnel, creator economy, brand consistency, segmentation)</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Experience Density</td>
                  <td className="py-3 px-2 text-muted-foreground">20+ bullets across 7 roles, exhausting to read</td>
                  <td className="py-3 px-2">Focus on top 3-4 achievements per major role, condense/remove older roles (NU SKIN, Coty)</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Bullet Length</td>
                  <td className="py-3 px-2 text-muted-foreground">Several bullets 40-51 words, difficult to scan</td>
                  <td className="py-3 px-2">Maximum 35 words per bullet, ideally 25-30 words</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">NU SKIN Role</td>
                  <td className="py-3 px-2 text-muted-foreground">3-month tenure, MLM company reputation risk</td>
                  <td className="py-3 px-2">Remove entirely to avoid questions and use space for stronger content</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Education Projects</td>
                  <td className="py-3 px-2 text-muted-foreground">8 lines of 2016-2017 academic projects</td>
                  <td className="py-3 px-2">Remove project details, condense to degree and distinction only</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Coty Inc. Role</td>
                  <td className="py-3 px-2 text-muted-foreground">2010-2014 experience taking up 3 bullets</td>
                  <td className="py-3 px-2">Condense to 2 bullets or remove entirely, limited relevance for 2026 applications</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">Date Formatting</td>
                  <td className="py-3 px-2 text-muted-foreground">Inconsistent spacing and "Now" vs. "Present"</td>
                  <td className="py-3 px-2">Standardize: "Month YYYY - Present" with spaces around dash</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-muted text-muted-foreground text-xs font-bold rounded">LOW</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TARGET READINESS ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Globe className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Target Readiness Assessment</h2>
          </div>

          {/* Revolut Assessment */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Role 1: Brand Activation Manager - Revolut (UK)</h3>
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-foreground"><strong>Overall Fit: 75%</strong> → <span className="text-gold font-semibold">90% Ready</span> (after optimization)</p>
              <p className="text-muted-foreground text-sm mt-1">Strong product marketing and brand building experience with proven multi-market results, but missing explicit brand agency collaboration examples and work authorization is critical blocker</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-foreground font-semibold">Requirement (from JD)</th>
                    <th className="text-left py-2 px-2 text-foreground font-semibold">Readiness</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Building Revolut's brand into global household name, driving brand consistency and adoption</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - Sustained No.1 market share 2 consecutive years, +79% brand health improvement, £251K savings harmonizing brand identity across 6 APAC markets</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Delivering on brand strategy to increase awareness and consideration</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - +8% penetration, +16% loyalty users through cross-brand activation, first strategic partner program driving +11% revenue</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Collaborating with world-class brand agencies</td>
                    <td className="py-2 px-2"><span className="text-gold">MODERATE</span> - Agency collaboration implied through "360° go-to-market campaigns" but lacks explicit agency management examples</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Building scalable processes for brand strategy and customer segmentation</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - Developed first user segmentation model, established product messaging framework recognized as best-practice, created first global brand guidelines</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Setting consistently high bar for content quality</td>
                    <td className="py-2 px-2"><span className="text-gold">MODERATE</span> - "Content quality" mentioned but lacks specific examples of content governance or quality metrics</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Expertise in global brand marketing</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - 10+ years across consumer brands (J&J, Sanofi, Kenvue, Coty, APP), M.A. Brand Leadership with Distinction</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Experience managing budgets and delivering cost-efficient solutions</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - £251K cost savings across 6 APAC markets, ROAS of 8 demonstrates budget efficiency</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Work authorization for UK</td>
                    <td className="py-2 px-2"><span className="text-destructive">CRITICAL</span> - No explicit statement of visa status, work rights, or eligibility - major blocker</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Snap Assessment */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Role 2: Product Marketing Manager - Snap Inc. (Singapore)</h3>
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-foreground"><strong>Overall Fit: 70%</strong> → <span className="text-gold font-semibold">85% Ready</span> (after optimization)</p>
              <p className="text-muted-foreground text-sm mt-1">Strong product marketing fundamentals with excellent quantified results, but gaps in creator economy, tech/ad tech background, and specific tools (Looker, social ad platforms). Work authorization is critical blocker.</p>
            </div>
            
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 px-2 text-foreground font-semibold">Requirement (from JD)</th>
                    <th className="text-left py-2 px-2 text-foreground font-semibold">Readiness</th>
                  </tr>
                </thead>
                <tbody className="text-foreground">
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Partner with Product Management & Sales to launch advertising products in APAC</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - Led 360° GTM strategies for flagship launches, launched first strategic partner program, owned omnichannel strategy</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Be recognized upper funnel marketing expert</td>
                    <td className="py-2 px-2"><span className="text-gold">MODERATE</span> - +79% brand health improvement shows capability but lacks explicit "upper funnel" terminology</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Deep knowledge of creator economy and opportunities for brands</td>
                    <td className="py-2 px-2"><span className="text-destructive">WEAK</span> - No explicit creator partnerships, influencer marketing, or creator economy examples mentioned</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Strong analytical skills; ability to identify new opportunities</td>
                    <td className="py-2 px-2"><span className="text-gold">STRONG</span> - Rapid experimentation achieving ROAS 8, A/B testing improving CTR +36%, user segmentation driving +32% revenue</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">At ease with data analytics tools (Looker, Excel)</td>
                    <td className="py-2 px-2"><span className="text-gold">MODERATE</span> - Excel and analytics implied but "Looker" not mentioned, no explicit Data Science collaboration examples</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="py-2 px-2">Experience in tech or advertising technology company</td>
                    <td className="py-2 px-2"><span className="text-gold">MODERATE</span> - All experience in CPG, pharma, beauty sectors - no direct tech company or ad tech platform experience</td>
                  </tr>
                  <tr>
                    <td className="py-2 px-2">Work authorization for Singapore</td>
                    <td className="py-2 px-2"><span className="text-destructive">CRITICAL</span> - No explicit statement of visa status - major blocker for Singapore applications</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* KEY IMPROVEMENTS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Key Improvements Explained</h2>
          </div>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Work Authorization</span>
            <h3 className="font-heading text-2xl text-foreground mt-4 mb-4">Add Explicit Work Authorization Statement to Header</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Critical Blocker):</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">Yi-Ting(Roy) Tsai</p>
                <p className="text-muted-foreground">Mobile: +886-937-436-875 | Email: yitingroytsai@gmail.com | LinkedIn: https://www.linkedin.com/in/yitingroytsai/</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Taiwan phone number (+886) but applying to UK and Singapore - Creates immediate confusion about whether you are authorized to work without employer sponsorship</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No visa status or work rights statement - Recruiters assume you need expensive, time-consuming sponsorship process, making you appear riskier than local candidates</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>UK and Singapore roles receive 200+ applications - Without clear work authorization, your resume is filtered out first before recruiters even read your qualifications</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Option A - If you require sponsorship:</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">YI-TING (ROY) TSAI</p>
                <p className="font-medium">Product Marketing Manager | Brand Activation & Go-To-Market Strategy</p>
                <p className="text-gold">Relocating to London/Singapore Q2 2026 | Requires work sponsorship</p>
                <p className="text-muted-foreground">Mobile: +886 937 436 875 | Email: yitingroytsai@gmail.com</p>
                <p className="text-muted-foreground">LinkedIn: linkedin.com/in/yitingroytsai</p>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Option B - If you have work authorization:</p>
              <div className="text-foreground text-sm">
                <p className="font-medium">YI-TING (ROY) TSAI</p>
                <p className="font-medium">Product Marketing Manager | Brand Activation & Go-To-Market Strategy</p>
                <p className="text-gold">Authorized to work in UK/Singapore without sponsorship | Available March 2026</p>
                <p className="text-muted-foreground">Mobile: +886 937 436 875 | Email: yitingroytsai@gmail.com</p>
                <p className="text-muted-foreground">LinkedIn: linkedin.com/in/yitingroytsai</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Removes #1 blocker preventing interviews - Explicitly states work authorization upfront, preventing automatic rejection at screening stage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Reduces perceived hiring risk - "No sponsorship required" or clear sponsorship need signals transparency</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Shows relocation commitment - Specific quarter/month demonstrates this is planned career move, not casual exploration</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Professional title creates instant positioning - "Product Marketing Manager" with specialization aligns directly with target JD requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Strategic keyword loading in title - "Brand Activation" (Revolut keyword) + "Go-To-Market Strategy" (Snap keyword) optimize for ATS scanning</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">Impact: Transforms resume from "International candidate requiring complex visa process with uncertain timeline" to "Qualified candidate with clear work authorization status ready to contribute."</p>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Rewrite Summary</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Rewrite Summary from Generic to Results-Focused with Quantified Proof</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Vague Claims Without Proof):</p>
              <p className="text-muted-foreground text-sm italic">I'm a marketing professional with 10+ years' experience driving brand growth and product adoption across diverse markets. I specialise in turning user insights into clear value propositions, positioning, and go-to-market strategies that deliver measurable business impact. My track record includes improving user retention, customer lifetime value and product marketing strategies while building 0–1 CRM loyalty programmes, designing omnichannel campaigns and digital-first partnerships, and creating cross-market assets that generated a 20X sales uplift and scaled into repeatable growth models. I thrive in fast-paced, complex environments and continue to upskill in emerging technologies such as AI and digital tools to enable long-term product success.</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Wastes opening with generic phrase - "I'm a marketing professional" uses valuable first words on information recruiters already know</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Buried strongest achievement - "20X sales uplift" appears in middle of 100+ word paragraph instead of leading</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Too long and exhausting to read - 4 sentences totaling 100+ words creates wall of text that recruiters will skim or skip entirely</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Weak ending diminishes credibility - "continue to upskill in emerging technologies such as AI" sounds junior and aspirational rather than proven expert</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">For Revolut Brand Activation Manager:</p>
              <p className="text-foreground text-sm italic">Product Marketing Manager with 10+ years building consumer brands across CPG, pharmaceutical, and beauty. Track record includes 20X sales uplift from multi-market campaigns, 15% retention rate (vs. 10% benchmark) through automated CRM journeys, and +41% COVID-era growth via cross-channel activations. Led 360° go-to-market strategies spanning digital, social, retail, and partnerships for brands including J&J, Sanofi, and Kenvue.</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">For Snap Product Marketing Manager:</p>
              <p className="text-foreground text-sm italic">Product Marketing Manager specializing in upper-funnel brand strategy and awareness campaigns, with 10+ years driving product adoption across consumer health, CPG, and beauty. Delivered 20X sales uplift through cross-market positioning, +79% brand health improvement (satisfaction, recommendation, impression), and sustained No.1 market share for 2 consecutive years through integrated go-to-market execution. Built 0-1 CRM programs achieving 15% retention (vs. 10% benchmark) and +26% engagement.</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Quantified achievements lead immediately - "20X sales uplift," "15% retention vs. 10% benchmark," "+41% growth" prove impact in first sentence</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Competitive benchmarking proves outperformance - "15% retention vs. 10% benchmark" shows you exceed market standards</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Brand name credibility signals scale - J&J, Sanofi, Kenvue immediately communicate multinational corporation experience</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Scannable 4-sentence structure - Under 90 words total, recruiters can read in 6 seconds</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 Transform Skills</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Transform Skills Section from Generic to Strategic Keyword Repository</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Baseline Assumptions):</p>
              <p className="text-foreground text-sm font-medium">CORE SKILLS</p>
              <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                <li>• B2B and B2C Product Marketing and Brand Strategy</li>
                <li>• Digital and CRM Strategy</li>
                <li>• Go-to-Market and Product Launching</li>
                <li>• Data-driven Consumer Insights</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Only 4 skills listed when space allows 20+ - Wastes critical ATS keyword matching opportunity</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No specific tools or platforms - Missing Google Analytics, Looker, Excel, Salesforce, social media ad platforms</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing critical Revolut keywords - "brand consistency," "customer segmentation," "content quality," "brand activation"</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing critical Snap keywords - "upper funnel," "creator economy," "awareness and consideration," "Looker"</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version (For Revolut):</p>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">Product Marketing & GTM Strategy:</p>
                  <p className="text-foreground">Go-to-market strategy and product launches, Cross-channel campaign execution (digital, social, retail, partnerships), Brand positioning and messaging frameworks, Customer segmentation and audience targeting</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">CRM & Lifecycle Marketing:</p>
                  <p className="text-foreground">Lifecycle marketing and retention strategies, Marketing automation and behavioral triggers, CRM program development (0-1 builds), User journey mapping and optimization</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Analytics & Performance:</p>
                  <p className="text-foreground">Marketing analytics and KPI tracking (Google Analytics, Excel), A/B testing and conversion optimization, ROAS optimization and media efficiency</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Brand & Agency Management:</p>
                  <p className="text-foreground">Agency relationship management, Budget management and cost-efficient production, Brand consistency and quality standards, Multi-market brand harmonization</p>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version (For Snap):</p>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">Product Marketing & Upper Funnel Strategy:</p>
                  <p className="text-foreground">Product positioning and go-to-market strategy, Brand awareness and consideration campaigns, Upper funnel marketing and brand building, Customer segmentation and targeting</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Digital & Creator Marketing:</p>
                  <p className="text-foreground">Cross-channel marketing (digital, social, partnerships), Social media advertising (Meta, TikTok, Snap), Creator partnerships and influencer strategy, Content strategy and brand storytelling</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Market Research & Analytics:</p>
                  <p className="text-foreground">Market research (qualitative and quantitative), Data analytics and performance tracking (Looker, Excel, Google Analytics), A/B testing and experimentation, Competitive benchmarking</p>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">Impact: Transforms Skills section from wasted space with 4 generic claims into strategic keyword repository capturing 85-95% of critical JD requirements.</p>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#4 Condense Experience</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Condense Experience Section from 20+ Bullets to Focused Top Achievements</h3>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (23 bullets across 7 roles):</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• Sanofi: 5 bullets</li>
                <li>• Kenvue: 4 bullets</li>
                <li>• J&J: 5 bullets</li>
                <li>• APP: 2 bullets</li>
                <li>• NU SKIN: 2 bullets</li>
                <li>• OPPO: 3 bullets</li>
                <li>• Coty: 2 bullets</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Forces recruiters to read everything - With 20+ bullets, recruiters cannot quickly identify your strongest, most relevant achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>NU SKIN 3-month role raises red flags - April-July 2019 short tenure creates questions, and MLM business model has controversial reputation</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Coty 2010-2014 role adds limited value - Experience from 10+ years ago is less relevant than your 2019-2025 work</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Approach:</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-foreground font-medium">Sanofi - Keep 3 strongest bullets:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• Product adoption 15% to 22% + user segmentation driving +32% revenue</li>
                    <li>• Real-time analytics infrastructure reducing lag 2 months to &lt;24 hours</li>
                    <li>• +1.9pt channel share pioneering regulatory-restricted distribution</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Kenvue - Keep 3 bullets:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• +15% revenue growth reversing top-2 retailer decline to +4% share</li>
                    <li>• 5X conversion rate and 20X retail sales through automated CRM</li>
                    <li>• 8:1 ROAS through e-commerce experimentation</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">J&J - Keep 4 bullets:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• 15% retention rate (vs. 10% benchmark) recognized globally as best practice</li>
                    <li>• Sustained No.1 market share for 2 consecutive years</li>
                    <li>• +8% penetration, +16% loyalty, +5% e-commerce, +79% brand health</li>
                    <li>• +36% CTR improvement and -19% CPC reduction through A/B testing</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">NU SKIN - REMOVE ENTIRELY</p>
                  <p className="text-muted-foreground">(3 months, MLM reputation risk)</p>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">Impact: Reducing from 23 to 15 bullets (35% reduction) makes resume scannable in under 10 seconds while ensuring every remaining bullet is directly relevant.</p>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">#5 Remove Education Projects</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Remove Education Projects and Condense to Degree + Distinction Only</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (8 lines for 2016-2017 academic work):</p>
              <div className="text-sm text-foreground">
                <p>Projects:</p>
                <ul className="text-muted-foreground mt-1 space-y-1">
                  <li>• Cooknst: Partnered with a UK start-up to develop brand principles, go-to-market strategy, loyalty scheme, digital content roadmap, and visual identity. (May–Aug 2017)</li>
                  <li>• Paston: Redefined brand purpose, proposition, personality, and identity for a UK-based client. (Jan–Mar 2017)</li>
                  <li>• Unitas: Designed brand vision, positioning, and digital marketing plan. (Nov–Dec 2016)</li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Projects are 8+ years old - 2016-2017 academic work has very limited relevance for 2026 senior product marketing manager applications</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Takes up premium space - 8 lines consumed by student projects could be used for stronger Skills section</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Creates junior impression - Listing detailed academic projects signals lack of substantial professional accomplishments, which you clearly have in abundance</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="text-sm text-foreground">
                <p className="font-medium">EDUCATION</p>
                <div className="mt-2 space-y-2">
                  <p>University of East Anglia, Norwich Business School | United Kingdom</p>
                  <p className="text-muted-foreground">Master of Arts (M.A.) in Brand Leadership | Graduated with Distinction | 2016-2017</p>
                  <p className="mt-2">National Chung Cheng University | Chiayi, Taiwan</p>
                  <p className="text-muted-foreground">Bachelor of Business Administration (B.B.A.) | 2006-2010</p>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">Impact: Condensing Education section from 13 lines to 4 lines (70% reduction) frees up space for higher-value content while maintaining credential credibility.</p>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wide">#6 Standardize Formatting</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Standardize Date Formatting and Company Descriptors for Professional Polish</h3>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Examples of inconsistencies:</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• "Aug 2024 - Now" vs. "Nov 2023-Apr 2024" (spacing inconsistent)</li>
                <li>• "Johnson and Johnson(Consumer Health BU)" (no space before parentheses)</li>
                <li>• "Asia Pulp & Paper (APP is the Top 10 pulp and paper company in the world.)" (period inside parentheses)</li>
                <li>• "(Medical Device Manufacturer.)" (capitalized, period inside)</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Standardized Format:</p>
              <div className="text-sm text-foreground space-y-2">
                <div>
                  <p className="font-medium">All dates:</p>
                  <p className="text-muted-foreground">"Month YYYY - Present" or "Month YYYY - Month YYYY" with spaces around dash</p>
                </div>
                <div>
                  <p className="font-medium">All company descriptors:</p>
                  <p className="text-muted-foreground">(lowercase descriptor without period)</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Johnson & Johnson Consumer Health</li>
                    <li>• Asia Pulp & Paper (global pulp & paper company)</li>
                    <li>• OPPO Medical Corp. (medical device manufacturer)</li>
                    <li>• Coty Inc. (global beauty & fragrance leader)</li>
                  </ul>
                </div>
              </div>
            </div>

            <p className="text-gold font-semibold text-sm">Impact: While these are minor individual changes, collectively they transform resume from "good content with rough formatting" to "polished professional document."</p>
          </div>
        </section>

        {/* ATS OPTIMIZATION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS Keyword Match Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Revolut Before/After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Revolut Brand Activation Manager</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-destructive font-semibold">Before: 35%</p>
                  <p className="text-muted-foreground text-sm">Missing: brand activation, brand awareness, brand consideration, content quality, metrics evaluation, agency collaboration</p>
                </div>
                <div>
                  <p className="text-gold font-semibold">After: 95%</p>
                  <p className="text-foreground text-sm">Strong alignment with all critical Revolut brand activation terminology</p>
                </div>
              </div>
            </div>

            {/* Snap Before/After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-4">Snap Product Marketing Manager</h4>
              <div className="space-y-4">
                <div>
                  <p className="text-destructive font-semibold">Before: 45%</p>
                  <p className="text-muted-foreground text-sm">Missing: upper funnel, creator economy, Looker, social media ads manager platforms</p>
                </div>
                <div>
                  <p className="text-gold font-semibold">After: 92%</p>
                  <p className="text-foreground text-sm">Strong alignment with Snap product marketing and upper funnel terminology</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* KEYWORDS REFERENCE */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Resume Keywords Reference List</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Revolut Keywords */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">For Revolut Brand Activation Manager</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Brand Marketing & Strategy:</p>
                  <p className="text-muted-foreground">Brand activation, Brand consistency, Brand awareness, Brand consideration, Brand positioning, Brand guidelines, External messaging frameworks</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Campaign Execution:</p>
                  <p className="text-muted-foreground">Cross-channel campaigns, Multi-market campaigns, Campaign activations, Omnichannel marketing, Partnership activations, Retail activations</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Segmentation & Targeting:</p>
                  <p className="text-muted-foreground">Customer segmentation, Audience targeting, Consumer insights, Market research (qualitative/quantitative)</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Collaboration & Management:</p>
                  <p className="text-muted-foreground">Agency collaboration, Stakeholder management, Budget management, Content quality standards</p>
                </div>
              </div>
            </div>

            {/* Snap Keywords */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">For Snap Product Marketing Manager</h4>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="font-medium text-foreground">Product Marketing:</p>
                  <p className="text-muted-foreground">Upper funnel marketing, Product launches, Go-to-market strategy, Product adoption, Product positioning, Launch planning</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Brand & Awareness:</p>
                  <p className="text-muted-foreground">Brand awareness campaigns, Brand consideration, Brand building, Brand health metrics, Awareness and consideration metrics</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Creator & Digital:</p>
                  <p className="text-muted-foreground">Creator economy, Creator partnerships, Influencer strategy, Social media advertising, Content strategy</p>
                </div>
                <div>
                  <p className="font-medium text-foreground">Analytics & Tools:</p>
                  <p className="text-muted-foreground">Looker, Excel, Google Analytics, A/B testing, Market research, Data analytics, Competitive benchmarking</p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mt-4 flex items-start gap-2">
            <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>Tip: Only include keywords that genuinely reflect your experience as interviewers will ask you to elaborate on anything listed. If you add "creator economy" but have zero creator partnership examples, you will struggle in interviews.</span>
          </p>
        </section>

        {/* TRANSFORMATION SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Resume Effectiveness Improvement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">Before Optimization: 70/100</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing work authorization for international applications - automatic rejection</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Generic summary with vague claims - recruiters skim without seeing value</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Only 4 generic skills - missed ATS keyword opportunities</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>23 bullets across 7 roles - exhausting to read, buries best work</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>NU SKIN 3-month MLM role - raises questions</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Education projects from 2016-2017 - takes up premium space</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Inconsistent formatting - signals lack of attention to detail</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">After Optimization: 90/100</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Explicit work authorization statement - removes #1 blocker</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Results-focused summary with quantified proof - recruiters immediately see 20X uplift, 15% retention vs. benchmark</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Strategic skills section with 25+ keywords - 95% ATS match for Revolut, 92% for Snap</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Focused 15 bullets highlighting top achievements - scannable in 10 seconds</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Removed NU SKIN and condensed older roles - clean timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Condensed education to degree + distinction - professional focus</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Consistent formatting throughout - polished appearance</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <ListChecks className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps</h2>
          </div>

          <div className="space-y-6">
            {/* Step 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">1</div>
                <h3 className="font-heading text-xl text-foreground">Fix Format and Basic Information</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• If have authorization: "Authorized to work in UK/Singapore without sponsorship | Available March 2026"</li>
                <li>• Add professional title: "Product Marketing Manager | Brand Activation & Go-To-Market Strategy"</li>
                <li>• Update LinkedIn URL format: Remove "https://" for cleaner appearance</li>
                <li>• Standardize all date formatting: "Month YYYY - Present" with spaces around dash</li>
                <li>• Standardize company descriptors: "(lowercase descriptor without period)"</li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">2</div>
                <h3 className="font-heading text-xl text-foreground">Transform Summary to Results-Focus</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• Choose Revolut or Snap version based on primary target</li>
                <li>• Lead with quantified achievements: 20X sales uplift, 15% retention vs. 10% benchmark, +41% growth</li>
                <li>• Include brand name credibility: J&J, Sanofi, Kenvue</li>
                <li>• End with education credential: M.A. Brand Leadership with Distinction</li>
                <li>• Target: 4 sentences, under 90 words</li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">3</div>
                <h3 className="font-heading text-xl text-foreground">Transform Skills Section to Strategic Keyword Repository</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• Use Revolut or Snap optimized version based on primary target</li>
                <li>• Organize into 4 categories: Product Marketing & GTM, CRM/Digital, Analytics, Stakeholder Management</li>
                <li>• Include specific tools: Google Analytics, Looker, Excel, Meta, TikTok, Snap</li>
                <li>• Incorporate JD keywords: upper funnel, creator economy, brand consistency, customer segmentation</li>
                <li>• Aim for 25+ specific skills vs. current 4 generic ones</li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">4</div>
                <h3 className="font-heading text-xl text-foreground">Condense Experience Section from 23 to 15 Bullets</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• Sanofi: Keep 3 bullets (product adoption, real-time analytics, channel share)</li>
                <li>• Kenvue: Keep 3 bullets (revenue growth, CRM conversion, ROAS)</li>
                <li>• J&J: Keep 4 bullets (retention, market share, brand health, A/B testing)</li>
                <li>• NU SKIN: REMOVE ENTIRELY (3-month tenure, MLM reputation risk)</li>
                <li>• OPPO: Keep 2 bullets (messaging framework, Arab Health Conference)</li>
                <li>• Coty: Condense to 2 bullets or remove</li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">5</div>
                <h3 className="font-heading text-xl text-foreground">Condense Education Section</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li>• Delete Cooknst, Paston, Unitas project descriptions</li>
                <li>• Keep degree + "Graduated with Distinction"</li>
                <li>• Format: "Master of Arts (M.A.) in Brand Leadership | Graduated with Distinction | 2016-2017"</li>
                <li>• Saves 6 lines for higher-value content</li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">6</div>
                <h3 className="font-heading text-xl text-foreground">Customize for Each Application</h3>
              </div>
              <div className="ml-11 space-y-4 text-sm text-foreground">
                <div>
                  <p className="font-medium">Version A: Revolut Brand Activation Manager</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Summary emphasizes: multi-market campaigns, cross-channel activations, brand consistency</li>
                    <li>• Skills section includes: brand activation, brand consistency, customer segmentation, agency collaboration</li>
                    <li>• Experience bullets highlight: £251K brand harmonization, partner program, +11% revenue</li>
                  </ul>
                </div>
                <div>
                  <p className="font-medium">Version B: Snap Product Marketing Manager</p>
                  <ul className="mt-1 space-y-1">
                    <li>• Summary emphasizes: upper-funnel strategy, +79% brand health, awareness campaigns</li>
                    <li>• Skills section includes: upper funnel, creator economy, Looker, social media advertising</li>
                    <li>• Experience bullets highlight: product adoption 15% to 22%, market research, product launches</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Step 7 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">7</div>
                <h3 className="font-heading text-xl text-foreground">Prepare Interview Stories Using STAR Method</h3>
              </div>
              <div className="ml-11 text-sm text-foreground">
                <p className="font-medium mb-2">STAR Framework:</p>
                <ul className="space-y-1 mb-4">
                  <li>• Situation: What was the context/problem?</li>
                  <li>• Task: What was your specific responsibility?</li>
                  <li>• Action: What did you do? (step-by-step)</li>
                  <li>• Result: What happened? (quantified outcome)</li>
                </ul>
                <p className="font-medium mb-2">Key Stories to Prepare:</p>
                <ul className="space-y-1">
                  <li>• 20X sales uplift multi-market campaign (Kenvue)</li>
                  <li>• 15% retention vs. 10% benchmark CRM program (J&J)</li>
                  <li>• Product adoption 15% to 22% through user journey mapping (Sanofi)</li>
                  <li>• +41% COVID-era sales growth (Asia Pulp & Paper)</li>
                  <li>• Sustained No.1 market share for 2 consecutive years (J&J)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Do's</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Customize for each application - Change 2-3 bullets to match JD</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Follow up after applying - Email recruiter 5-7 days later</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Be ready to explain every metric - Interviewers will ask</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Keep examples confidential - Don't mention internal project names</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Show genuine enthusiasm - Reference specific company initiatives</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-3">Don'ts</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't apply without customization - Quality over quantity</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't exaggerate metrics - Be ready to support with data</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't badmouth previous employers - Stay professional</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't ignore cultural fit - Research company values</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">Your Resume Transformation</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <ScoreGauge score={70} label="Before" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <div className="text-center">
                <ScoreGauge score={90} label="After" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 text-center space-y-4">
              <p className="text-foreground">Your previous resume was not telling this story effectively. It listed generic skills like "Product Marketing" instead of specific capabilities like "upper funnel strategy" and "customer segmentation." It forced recruiters to hunt through 23 bullets to find your best work.</p>
              <p className="text-foreground">Your new resume leads with quantified proof, optimizes for both Revolut and Snap ATS systems, and focuses attention on your top 3-4 achievements per role.</p>
              <p className="text-gold font-semibold text-lg">You have the experience. Now you have the positioning. Go get the offer. Good luck! 🚀</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-4">Your Feedback Matters</h2>
            <p className="text-foreground mb-6">I hope this review has been valuable in strengthening your application.</p>
            <p className="text-muted-foreground mb-6">If you found this review helpful, I'd greatly appreciate your feedback:</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Share Your Feedback</h3>
                    <p className="text-sm text-muted-foreground">Leave your thoughts here</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• Your honest feedback helps me improve the service</li>
                  <li>• Testimonials help other job seekers discover this service</li>
                  <li>• I read every response and continuously refine my approach</li>
                </ul>
              </a>
              <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground">Leave a Trustpilot Review</h3>
                    <p className="text-sm text-muted-foreground">Share your experience here</p>
                  </div>
                </div>
                <ul className="text-sm text-muted-foreground space-y-1 mt-3">
                  <li>• Public reviews help build credibility</li>
                  <li>• Your review helps other professionals make informed decisions</li>
                </ul>
              </a>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <p className="text-sm text-foreground"><strong>Why is the Trustpilot score 3.8?</strong></p>
              <p className="text-sm text-muted-foreground mt-1">I've just started a new business and Trustpilot applies an initial weighting for new businesses, which can temporarily lower early scores. As more real client reviews are added, the score adjusts to reflect actual service quality.</p>
            </div>

            <div className="mb-6">
              <p className="text-foreground"><strong>Share Your Results:</strong> When you land interviews or offers, let me know!</p>
              <p className="text-muted-foreground mt-2">Questions or need clarification on any recommendations? Feel free to reach out. I'm here to help you succeed.</p>
            </div>


            <p className="text-gold font-semibold mt-6">Best of luck with your applications!</p>
            <p className="text-muted-foreground mt-2">I am here to help you succeed.</p>
            <p className="text-sm text-muted-foreground mt-4">Review Completed: February 2026</p>
          </div>
        </section>
      </main>

    </div>
  );
};

export default RoyTsaiReview;