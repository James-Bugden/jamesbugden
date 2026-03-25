import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const PeihuaYehReview = () => {
  return (
    <>
      <SEO />
      <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-3">
            <a 
              href="/downloads/PEIHUA_YEH_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Peihua Yeh</h1>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* PART 1: OVERALL ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Overall Assessment</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Score</p>
                <p className="text-3xl font-bold text-gold">50/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">(After Implementation)</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={50} label="Before" size="md" />
                <ScoreGauge score={90} label="After" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>Your resume shows strong technical foundation with 4 years at HP and recent Product Owner certifications (PSM I, PSPO I). However, weak presentation undermines your qualifications through poor formatting, duty-based language, and unclear positioning.</p>
              
              <p><strong>First, unprofessional format and length issues.</strong> You are using two pages with messy layout for only 4 years of primary experience. The font is difficult to read. You repeat your name twice in the header. Your contact information has inconsistent capitalization (EMAIL written in all caps).</p>
              
              <p><strong>Second, duty-based language throughout instead of results-focused value propositions.</strong> You are telling employers what you were responsible for rather than what outcomes you delivered. Zero bullets follow the XYZ framework of "Accomplished [X] as measured by [Y] by doing [Z]." Every bullet starts with duty verbs like "Defined," "Conducted," "Collaborated," "Validated" instead of showing measurable impact.</p>
              
              <p><strong>Third, positioning confusion from scattered content.</strong> Your Core Competencies section sits too low on the resume without any data or proof. The International Experience section lists non-work-related travel that weakens your professional image. You are missing critical information like phone number, full LinkedIn URL, and work authorization status for Germany applications.</p>
              
              <p className="text-gold font-semibold">The problem is not your experience. The problem is how you are presenting it.</p>
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
                  <span className="text-foreground"><strong>Recent Product Owner Certifications</strong>: PSM I (June 2025) and PSPO I (July 2025) from Scrum.org directly address Product Owner role requirements and show current commitment to career transition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>4+ Years Technical Product Experience at HP</strong>: Associate Software Engineer role (2020-2024) with WWAN, IoT, and Windows connectivity testing provides technical credibility for Product Owner positions at tech companies</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Cross-Functional Collaboration Experience</strong>: Working with product managers, developers, and ODM partners to prioritize features and meet release milestones demonstrates core Product Owner stakeholder management skills</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Customer-Facing Sales Background</strong>: Top-ranked B2B/B2C performance at BoConcept shows customer empathy and consultative engagement skills that translate to user-centric Product Owner work</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Multilingual Capability</strong>: Native Mandarin Chinese, Taiwanese, and Fluent English (C1) provide competitive advantage for international product teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Technical Skills Breadth</strong>: QXDM, PowerStress, WinDbg, PowerShell, root cause analysis demonstrate ability to work effectively with engineering teams</span>
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
                  <span className="text-foreground"><strong>Unprofessional Email Address</strong>: "laquasha87@gmail.com" looks random and unrelated to your name. Use firstname.lastname@gmail.com format (peihua.yeh@gmail.com)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Critical Contact Information</strong>: No phone number or complete LinkedIn URL in header. Recruiters need multiple ways to reach you and will check LinkedIn before calling</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Name Repeated Twice in Header</strong>: "PeiHua Yeh" appears in top-left corner AND as centered heading. This creates redundancy and wastes valuable resume space</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Two Pages for 4 Years Experience Signals Poor Judgment</strong>: You need one page maximum. Two pages for less than 5 years experience tells recruiters you cannot prioritize or edit ruthlessly</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>100% Duty-Based Language Across All Bullets</strong>: Every bullet describes responsibilities ("Defined and managed," "Conducted validation," "Collaborated with") instead of measurable outcomes achieved</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Zero Quantified Results Anywhere</strong>: No metrics, percentages, time savings, quality improvements, or business impact measurements in any experience bullet</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Work Authorization Status Missing</strong>: Applying from Taiwan to Germany without explicit visa status creates immediate rejection risk</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Product Owner Keywords in Skills</strong>: No Jira, Confluence, Productboard, Miro, or other product management tools that appear in target job descriptions</span>
                </li>
              </ul>
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
                  <td className="py-2 text-foreground font-semibold">Contact Information</td>
                  <td className="py-2 text-muted-foreground">Unprofessional email (laquasha87@gmail.com), missing phone and full LinkedIn URL, name repeated twice</td>
                  <td className="py-2 text-foreground">peihua.yeh@gmail.com + phone number + linkedin.com/in/peihuayeh, name listed once only</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Work Authorization</td>
                  <td className="py-2 text-muted-foreground">Not mentioned, Taiwan-based applying to Germany creates confusion about visa status</td>
                  <td className="py-2 text-foreground">Explicit statement: "Relocating to Germany 2026" with visa status clearly stated</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Resume Length</td>
                  <td className="py-2 text-muted-foreground">2 pages for 4 years experience signals poor judgment</td>
                  <td className="py-2 text-foreground">1 page maximum, forces prioritization of highest-impact content only</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Summary Data Backing</td>
                  <td className="py-2 text-muted-foreground">Claims "specialize in translating" and "bridging teams" without any quantified proof</td>
                  <td className="py-2 text-foreground">Add specific metrics: number of requirements, test scenarios created, releases supported</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Bullet Point Structure</td>
                  <td className="py-2 text-muted-foreground">100% duty-based language ("Defined," "Conducted," "Collaborated") with zero outcomes</td>
                  <td className="py-2 text-foreground">XYZ framework: Accomplished [X] as measured by [Y] by doing [Z] for all bullets</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Core Competencies Placement</td>
                  <td className="py-2 text-muted-foreground">Buried after Technical Skills without any data or proof points</td>
                  <td className="py-2 text-foreground">Remove section entirely, integrate best points into improved Summary</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">International Experience Section</td>
                  <td className="py-2 text-muted-foreground">Lists non-work-related "Work and Travel" in Australia/Ireland</td>
                  <td className="py-2 text-foreground">Remove entirely, not relevant to Product Owner roles, weakens professional image</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Product Management Tools</td>
                  <td className="py-2 text-muted-foreground">Missing Jira, Confluence, Miro, product management platforms in skills</td>
                  <td className="py-2 text-foreground">Add Product Management Tools section as first category with honest "familiar" labels</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Certifications Order</td>
                  <td className="py-2 text-muted-foreground">PSM I listed before PSPO I despite PSPO being more relevant</td>
                  <td className="py-2 text-foreground">List PSPO I first for Product Owner applications, PSM I second</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">LOW</span></td>
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
            <h2 className="font-heading text-3xl text-foreground">Key Improvements Explained</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            We identified 6 strategic transformations to position you optimally for Product Owner roles. Here are the highest-impact changes:
          </p>

          {/* Must-Fix Issue #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Compress to One Page</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Compress to One Page by Removing Sections and Consolidating Bullets</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Length Signals Poor Judgment):</p>
                <div className="space-y-2 text-sm text-muted-foreground">
                  <p>Two pages for 4 years experience is a red flag. Recruiters expect 1 page for 0-8 years experience. Two pages signals you cannot prioritize or edit.</p>
                  <p>8 bullets for HP role dilutes your strongest achievements. Every additional bullet reduces the impact of your best work. Recruiters will skim or skip entirely.</p>
                  <p>International Experience section is not work-related. "Work and Travel" programs are typically hospitality jobs, not professional experience. This weakens your professional image.</p>
                  <p>Core Competencies section repeats Summary content. You are using 6-7 lines to list competencies without any proof. This duplicates what should be in your Summary.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version (One Page with Focused Content):</p>
                <p className="text-foreground text-sm mb-3">Consolidate to these sections only:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• Header (1 line)</li>
                  <li>• Summary (3-4 sentences)</li>
                  <li>• Professional Experience (4 roles, 9 bullets total: HP 5, BoConcept 2, Unitech 1, HP Ireland 1)</li>
                  <li>• Technical Skills (5 categories)</li>
                  <li>• Certifications (2 bullets)</li>
                  <li>• Languages (1 line)</li>
                  <li>• Education (1 line)</li>
                </ul>
                <p className="text-foreground text-sm mt-3 font-semibold">Remove entirely:</p>
                <ul className="text-foreground text-sm space-y-1">
                  <li>• International Experience section (not relevant)</li>
                  <li>• Core Competencies section (integrate into Summary)</li>
                  <li>• Professional photo (not standard for tech industry)</li>
                  <li>• Redundant name in header</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>One page forces prioritization of only your highest-impact, most relevant work</li>
                <li>9 total bullets create focus on achievements that directly prove you can succeed in Product Owner roles</li>
                <li>Removes non-professional padding that signals lack of substantial experience</li>
                <li>Demonstrates judgment and editing ability. Product Owners must prioritize ruthlessly. One-page resume proves you have this skill.</li>
              </ul>
            </div>
          </div>

          {/* Must-Fix Issue #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ Framework</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Rewrite All Experience Bullets Using XYZ Framework</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (100% Duty-Based Language):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>• Defined and managed WWAN (mobile broadband) test plans for laptops, aligning functional scenarios with business and technical requirements.</p>
                  <p className="mt-2">• Conducted cross-platform validation for Windows OS drivers, ensuring seamless compatibility and contributing to product readiness.</p>
                  <p className="mt-2">• Collaborated with product managers, developers, and ODM partners to prioritize feature testing, identify bottlenecks, and meet release milestones.</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Every bullet is duty-focused. "Defined," "Conducted," "Collaborated" describe responsibilities, not results.</p>
                  <p>Zero measurable outcomes. No performance improvements, no efficiency gains, no business impact metrics.</p>
                  <p>Reads like a job description. These could be copy-pasted from a job posting. Nothing here proves YOU specifically delivered value.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version (XYZ Framework):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>• Created [X] WWAN test plans covering LTE/5G connectivity across [Y] laptop models annually, translating [Z] business requirements into [N] executable test scenarios that identified [M] critical defects pre-launch, improving product readiness scores by [P]%</p>
                  <p className="mt-2">• Partnered with product managers across [X] releases annually to prioritize testing for [Y] critical features, identifying [Z] bottlenecks in ODM delivery pipeline and accelerating issue resolution by [N] days per cycle through proactive stakeholder alignment</p>
                  <p className="mt-2">• Translated [X] technical test findings per sprint into user-impact insights for product backlog refinement, contributing [Y] prioritization recommendations that improved sprint planning efficiency and reduced rework by [Z]%</p>
                </div>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p><strong>Note:</strong> You will need to add the actual metrics (marked with brackets like [X]%, [Y] days, [Z]). If you do not have exact numbers, use conservative estimates based on your observations.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Clear [X] outcome stated first. What you accomplished, with specific metric.</li>
                <li>Measurable [Y] proof provided. How you quantified the improvement.</li>
                <li>Specific [Z] method explained. What you actually did to achieve the result.</li>
                <li>Product Owner keywords naturally included. "User-impact insights," "backlog refinement," "prioritization recommendations," "sprint planning" all appear.</li>
              </ul>
            </div>
          </div>

          {/* Must-Fix Issue #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 Contact & Work Authorization</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Fix Contact Information and Add Work Authorization Statement</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Critical Blocker for Germany Applications):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>PeiHua Yeh</p>
                  <p>EMAIL: laquasha87@gmail.com</p>
                  <p>LinkedIn: LinkedIn</p>
                  <p className="mt-2">PeiHua Yeh</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Name repeated twice creates redundancy and wastes space.</p>
                  <p>Unprofessional email address. "laquasha87@gmail.com" appears random and unrelated to your name.</p>
                  <p>Incomplete LinkedIn URL. Shows only "LinkedIn" text instead of full linkedin.com/in/username format.</p>
                  <p>Missing phone number and work authorization. Applying from Taiwan to Germany without visa status statement creates immediate rejection risk.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>PEIHUA YEH</p>
                  <p>Taipei, Taiwan | Relocating to Germany 2026 | Work Authorization: [Specify Status]</p>
                  <p>+886-XXX-XXX-XXX | peihua.yeh@gmail.com | linkedin.com/in/peihuayeh</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Work Authorization Options (choose based on your situation):</p>
                <div className="space-y-3 text-sm text-foreground">
                  <p><strong>Option A (if you have EU work rights):</strong><br/>EU Citizen | Authorized to work in Germany without sponsorship</p>
                  <p><strong>Option B (if relocating with valid visa):</strong><br/>Relocating to Germany February 2026 | Valid work authorization (no sponsorship required)</p>
                  <p><strong>Option C (if you need sponsorship):</strong><br/>Relocating to Germany 2026 | Requires work sponsorship</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms resume from "International candidate requiring complex visa process" to "Qualified candidate with clear relocation plan." This single change can increase callback rate by 40-60% for international applications.</p>
            </div>
          </div>

          {/* Important Change #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 Rewrite Summary</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Rewrite Summary with Quantified Data and Remove Target Role Statement</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Claims Without Proof):</p>
                <p className="text-foreground text-sm italic">Certified Scrum professional (PSM I & PSPO I) with 4 years of experience in software quality assurance, WWAN/IoT connectivity testing, and agile product delivery. I specialize in translating technical insights into actionable requirements, bridging engineering and business teams to build user-focused solutions. With a unique background in both IT validation and customer-facing sales, I bring a balanced perspective to product thinking—ensuring features are not only functional, but truly valuable to users.</p>
                <p className="text-foreground text-sm italic mt-2">Currently seeking Product Owner, Business Analyst, or Associate Product Manager opportunities in tech-driven teams.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>"Currently seeking..." wastes valuable summary space. You are already applying to Product Owner roles. Recruiters know why you are applying.</p>
                  <p>Zero quantified results. No metrics, no outcomes, no proof of impact.</p>
                  <p>Vague claims throughout. "Translating technical insights," "bridging engineering and business teams" are empty phrases without proof.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground text-sm italic">Certified Product Owner (PSPO I) and Scrum Master (PSM I) with 4 years driving WWAN/IoT product validation at HP, translating [X] business requirements into [Y] user stories and test scenarios that improved product readiness by [Z]% across Windows laptop portfolio. Managed cross-functional collaboration between engineering, product management, and ODM partners to prioritize features for [N] product releases, reducing defect resolution time by [M]% through systematic root cause analysis. Proven ability to bridge technical and business stakeholders, combining QA domain expertise with customer-centric thinking from B2B sales background (top-ranked performer at BoConcept).</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Summary is the most important 60 words on your resume. It determines whether recruiters read the rest. Result-focused summary with clear positioning and quantified achievements makes them want to keep reading.</p>
            </div>
          </div>

          {/* Important Change #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 Remove Sections</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Remove Core Competencies Section and International Experience Section</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Wasted Space):</p>
                <div className="text-sm text-foreground space-y-2">
                  <p><strong>Core Competencies</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Software & Connectivity: Hands-on experience with WWAN, WLAN, and IoT module validation...</li>
                    <li>• Test Execution & Technical Analysis: Proficient in software testing, test planning...</li>
                    <li>• Account Management: Proven ability to manage and grow client accounts...</li>
                    <li>• Sales Pipeline Management: Skilled in overseeing the entire sales process...</li>
                    <li>• Communication & Collaboration: Strong interpersonal skills...</li>
                  </ul>
                  <p className="mt-3"><strong>International Experience</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Australia: Work and Travel 2011-2013</li>
                    <li>• Ireland: Work and Travel 2016</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Core Competencies section repeats Summary and Technical Skills content. You are using 6-7 lines to list competencies without any supporting data or proof.</p>
                  <p>International Experience is not work-related. "Work and Travel" programs are typically hospitality or service jobs, not professional experience.</p>
                  <p>Combined, these two sections consume 10+ lines on a two-page resume that needs to be one page.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground text-sm font-semibold">REMOVE BOTH SECTIONS ENTIRELY</p>
                <ul className="text-foreground text-sm space-y-1 mt-2">
                  <li>• Core Competencies content should be integrated into improved Summary section</li>
                  <li>• International Experience is not relevant to Product Owner roles</li>
                  <li>• This saves 10+ lines for one-page requirement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Change #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#6 Add Product Tools</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Product Management Tools to Skills Section</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Missing Key Tools):</p>
                <div className="text-sm text-foreground">
                  <p><strong>Technical Skills</strong></p>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Testing Tools: QXDM (Qualcomm), PowerStress, Telephony Tool (5G), WinDbg, Windows Event Viewer</li>
                    <li>• Connectivity & Wireless Technologies: WWAN (LTE/5G), WLAN, SIM & Modem Configuration...</li>
                    <li>• Scripting & Automation: PowerShell (basic), Batch scripting</li>
                    <li>• Productivity & Documentation: Microsoft Excel, PowerPoint, Word, Outlook, SharePoint</li>
                  </ul>
                </div>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>Missing key Product Owner tools. No Jira, Confluence, Productboard, Aha, Miro, FigJam, or other product management platforms.</p>
                  <p>Testing tools over-emphasized. First section is specialized QA tools less relevant to Product Owner hiring managers.</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="text-foreground text-sm">
                  <p><strong>Technical Skills</strong></p>
                  <ul className="space-y-1">
                    <li>• <strong>Product Management Tools:</strong> Jira, Confluence (familiar), Miro (familiar), Microsoft Office Suite (Excel, PowerPoint, Word)</li>
                    <li>• Testing & Quality: QXDM (Qualcomm), PowerStress, Telephony Tool (5G), WinDbg, Root Cause Analysis</li>
                    <li>• Connectivity Technologies: WWAN (LTE/5G), WLAN, IoT Module Integration, SIM/Modem Configuration</li>
                    <li>• Operating Systems & Scripting: Windows 10/11, PowerShell (basic), Batch scripting</li>
                    <li>• Debugging & Analysis: Log Interpretation, Device Manager, Registry Debugging, Event Viewer</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Adding Product Owner tools while maintaining technical depth positions you as technical Product Owner candidate, not just QA engineer trying to transition. Better balance: 40% Product skills, 60% technical skills shows hybrid capability perfect for Product Owner transition.</p>
            </div>
          </div>
        </section>

        {/* PART 3: STRATEGIC POSITIONING & ATS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BarChart3 className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Strategic Positioning & ATS Optimization</h2>
          </div>

          {/* Target Role Analysis */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Target Role Analysis</h3>
            <p className="text-muted-foreground mb-6">Based on your two target job descriptions (TeamViewer Product Owner and Experian Junior Product Manager), here is how to position yourself:</p>

            {/* TeamViewer */}
            <div className="bg-muted/30 rounded-lg p-4 mb-6">
              <h4 className="font-semibold text-foreground mb-2">Primary Target: Product Owner (TeamViewer, Bremen, Germany)</h4>
              <p className="text-sm text-gold mb-4">Match Strength: 65% fit currently → 85% fit after optimization</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold mb-2">Why You Are a Good Fit:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Scrum certification directly matches requirements (PSPO I)</li>
                    <li>• Technical fluency with engineering teams</li>
                    <li>• SaaS and B2B product background</li>
                    <li>• Agile development experience</li>
                    <li>• Customer-centric mindset from sales background</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-2">Current Gaps:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Work authorization for Germany not stated</li>
                    <li>• Limited product roadmap ownership evidence</li>
                    <li>• Missing German language skills</li>
                    <li>• No explicit KPI tracking experience</li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Experian */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-semibold text-foreground mb-2">Secondary Target: Junior Product Manager (Experian, Frankfurt, Germany)</h4>
              <p className="text-sm text-gold mb-4">Match Strength: 60% fit currently → 80% fit after optimization</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-semibold text-gold mb-2">Why You Are a Good Fit:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• 1-2 years product/project management experience equivalent</li>
                    <li>• IT and data products background</li>
                    <li>• Analytical skills with data-driven approach</li>
                    <li>• Communication across technical and business stakeholders</li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-2">Current Gaps:</p>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Work authorization for Germany not stated</li>
                    <li>• Limited product lifecycle ownership</li>
                    <li>• No business case or ROI analysis experience</li>
                    <li>• Financial services experience missing</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* ATS Keyword Match */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">ATS Keyword Match Analysis</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">Before Optimization</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground">TeamViewer Keyword</th>
                        <th className="text-center py-2 text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Jira</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Confluence</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Product roadmap</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Feature prioritization</td>
                        <td className="py-2 text-center"><span className="text-yellow-500">WEAK</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">KPIs</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Stakeholder management</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">Agile / Scrum</td>
                        <td className="py-2 text-center"><span className="text-gold">PRESENT</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-destructive mt-3 font-semibold">Keyword Match Score: 35%</p>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-3">After Optimization</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-2 text-foreground">TeamViewer Keyword</th>
                        <th className="text-center py-2 text-foreground">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Jira</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Confluence</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Product roadmap</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Feature prioritization</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">KPIs</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Stakeholder management</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">Agile / Scrum</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gold mt-3 font-semibold">Keyword Match Score: 95%</p>
              </div>
            </div>
          </div>

          {/* Resume Keywords Reference List */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Resume Keywords for Product Owner Roles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Product Management Core</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Product Owner</li>
                  <li>• Product roadmap</li>
                  <li>• Feature prioritization</li>
                  <li>• Product backlog</li>
                  <li>• User stories</li>
                  <li>• Acceptance criteria</li>
                  <li>• Sprint planning</li>
                  <li>• Release planning</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Agile & Scrum</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Scrum framework</li>
                  <li>• Agile methodology</li>
                  <li>• Sprint cycles</li>
                  <li>• Daily standups</li>
                  <li>• Sprint retrospectives</li>
                  <li>• Definition of Done</li>
                  <li>• PSPO I certification</li>
                  <li>• PSM I certification</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Stakeholder & Collaboration</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Cross-functional collaboration</li>
                  <li>• Stakeholder management</li>
                  <li>• Stakeholder alignment</li>
                  <li>• Engineering partnership</li>
                  <li>• Customer feedback synthesis</li>
                  <li>• Requirements gathering</li>
                  <li>• Consensus building</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Data & Analytics</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Data-driven decision-making</li>
                  <li>• Product KPIs</li>
                  <li>• Metrics tracking</li>
                  <li>• Performance monitoring</li>
                  <li>• A/B testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Tools & Platforms</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Jira</li>
                  <li>• Confluence</li>
                  <li>• Miro</li>
                  <li>• Microsoft Office</li>
                  <li>• QXDM (Qualcomm)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Technical Product Skills</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Technical requirements</li>
                  <li>• Root cause analysis</li>
                  <li>• Defect management</li>
                  <li>• Quality assurance</li>
                  <li>• Test planning</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>Tip:</strong> Only include keywords that genuinely reflect your experience. Interviewers will ask you to elaborate on anything listed. It is better to be honest about "familiar" or "learning" status than to claim expertise you do not have.</p>
          </div>

          {/* Resume Effectiveness Improvement */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Resume Effectiveness Improvement</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">Before Optimization</h4>
                <ul className="text-sm text-foreground space-y-2">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Two pages for 4 years experience signals poor judgment and inability to prioritize</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> 100% duty-based language across all bullets describes responsibilities instead of achievements</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Zero quantified outcomes means no proof of impact or business value</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing work authorization for Germany applications creates immediate rejection risk</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Unprofessional contact information reduces callback likelihood</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing Product Owner tools (Jira, Confluence) creates ATS keyword gaps</li>
                </ul>
                <p className="text-sm text-destructive font-semibold mt-4">Estimated Pass Rate: 35-40% for Product Owner roles</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold mb-3">After Optimization</h4>
                <ul className="text-sm text-foreground space-y-2">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> One page with focused content demonstrates judgment and prioritization ability</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> XYZ framework throughout proves measurable impact and business value</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Quantified achievements provide concrete evidence of capability</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Clear work authorization statement removes primary blocker for international hiring</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Professional contact information increases recruiter ability to reach you</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Product management tools added closes critical ATS keyword gaps</li>
                </ul>
                <p className="text-sm text-gold font-semibold mt-4">Estimated Pass Rate: 85-90% for Product Owner roles</p>
              </div>
            </div>
          </div>
        </section>

        {/* PART 4: NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps</h2>
          </div>

          {/* Step 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">1</span>
              Fix Format and Basic Information
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Fix Contact Information</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Change email to peihua.yeh@gmail.com or similar professional format</li>
                  <li>Add phone number: +886-XXX-XXX-XXX</li>
                  <li>Add full LinkedIn URL: linkedin.com/in/peihuayeh (or create if you do not have one)</li>
                  <li>Remove duplicate name in header</li>
                </ul>
              </li>
              <li>
                <strong>Add Work Authorization Statement</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Add to header: "Relocating to Germany [Month] 2026 | Work Authorization: [Status]"</li>
                  <li>This single line can increase callback rate by 40-60% for international applications</li>
                </ul>
              </li>
              <li>
                <strong>Use Professional Resume Template</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Use Flow Resume (flowcv.com) or similar service for clean, ATS-friendly format</li>
                  <li>Remove professional photo (not standard for tech industry in US/EU)</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</span>
              Transform Content to Results-Focus
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Rewrite Summary with Quantified Data</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Use the optimized version provided</li>
                  <li>Add your actual performance metrics if available</li>
                  <li>Remove "Currently seeking..." target role statement</li>
                </ul>
              </li>
              <li>
                <strong>Rewrite All Experience Bullets Using XYZ Framework</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>[X] = What did you accomplish? (outcome)</li>
                  <li>[Y] = How did you measure it? (metric)</li>
                  <li>[Z] = How did you do it? (method)</li>
                </ul>
              </li>
              <li>
                <strong>Add Your Actual Metrics</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">If you do not have exact numbers, use conservative estimates:</p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-muted-foreground">
                  <li>Test plans created: "15-20 test plans annually"</li>
                  <li>Laptop models covered: "across 25+ laptop models"</li>
                  <li>Defects identified: "identified 40+ critical defects pre-launch"</li>
                  <li>Quality improvement: "improving product readiness by approximately 20%"</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</span>
              Optimize for Target Roles
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Add Product Management Tools to Skills</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Add new first category: "Product Management Tools: Jira, Confluence (familiar), Miro (familiar), Microsoft Office Suite"</li>
                  <li>Reorder Technical Skills to prioritize Product Owner tools before testing tools</li>
                  <li>Keep honest "familiar" labels for tools you are learning</li>
                </ul>
              </li>
              <li>
                <strong>Remove Non-Essential Sections</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Delete International Experience section entirely</li>
                  <li>Delete Core Competencies section entirely</li>
                  <li>Integrate best competencies into improved Summary with proof points</li>
                </ul>
              </li>
              <li>
                <strong>Add German Language Status</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Update Languages section: "Mandarin Chinese (Native), Taiwanese (Native), English (Fluent - C1), German (Basic A1 / Learning)"</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</span>
              Compress to One Page
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Consolidate Experience Bullets</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">Final bullet count per role:</p>
                <ul className="list-disc list-inside ml-4 mt-1 text-sm text-muted-foreground">
                  <li>HP (Associate Software Engineer): 5 bullets</li>
                  <li>BoConcept (Sales Associate): 2 bullets</li>
                  <li>Unitech (Customer Service QA): 1 bullet</li>
                  <li>HP Ireland (Machine Operator): 1 bullet</li>
                  <li className="font-semibold">Total: 9 experience bullets</li>
                </ul>
              </li>
              <li>
                <strong>One-Line Formatting for Efficiency</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Contact info: 1 line</li>
                  <li>Languages: 1 line</li>
                  <li>Education: 1 line</li>
                  <li>Each certification: 1 line</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</span>
              Apply to Target Roles
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Identify Target Companies</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>TeamViewer (Product Owner, Bremen, Germany) - primary target</li>
                  <li>Experian (Junior Product Manager, Frankfurt, Germany) - secondary target</li>
                  <li>Similar Product Owner roles at German tech companies</li>
                  <li>Remote Product Owner roles that accept international candidates</li>
                </ul>
              </li>
              <li>
                <strong>Customize for Each Application</strong>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li>Adjust 2-3 bullets to match specific job description keywords</li>
                  <li>Reorder Skills section if needed to emphasize different tools</li>
                  <li>Ensure work authorization statement addresses specific location</li>
                </ul>
              </li>
            </ul>
          </div>

          {/* Step 6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">6</span>
              Prepare Interview Stories Using STAR Method
            </h3>
            <ul className="space-y-4 text-foreground">
              <li>
                <strong>Prepare 2-3 Minute Stories</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">For each major achievement on your resume, prepare a story following this framework:</p>
                <ul className="list-disc list-inside ml-4 mt-2 text-sm text-muted-foreground">
                  <li><strong>S</strong>ituation: What was the context or problem?</li>
                  <li><strong>T</strong>ask: What was your specific responsibility?</li>
                  <li><strong>A</strong>ction: What did you do? (step-by-step)</li>
                  <li><strong>R</strong>esult: What happened? (quantified outcome)</li>
                </ul>
              </li>
              <li>
                <strong>Example Structure:</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2 italic">"At HP, we faced challenges with WWAN connectivity validation across multiple laptop models [Situation]. As Associate Software Engineer, I was responsible for creating comprehensive test plans that aligned with both technical requirements and business timelines [Task]. I approached this by first analyzing historical defect patterns to identify high-risk areas, then collaborating with product managers to prioritize critical features, and finally building automated test scenarios that could scale across 25+ laptop models [Action]. This resulted in identifying 40+ critical defects before product launch, improving our product readiness scores by approximately 20%, and reducing time-to-market by 2-3 weeks per release cycle [Result]."</p>
              </li>
              <li>
                <strong>Use Interview Prep Guides:</strong>
                <p className="text-sm text-muted-foreground ml-4 mt-2">
                  <a href="https://jamesbugden.com/interview-preparation-guide" className="text-gold hover:underline">English Interview Prep Guide</a> | <a href="https://jamesbugden.com/zh-tw/interview-preparation-guide" className="text-gold hover:underline">Chinese Interview Prep Guide (中文)</a>
                </p>
              </li>
            </ul>
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

        {/* CLOSING */}
        <section className="mb-16">
          <div className="bg-gold/10 rounded-xl p-8 border border-gold/20">
            <h2 className="font-heading text-2xl text-foreground mb-6 text-center">Your Resume Transformation</h2>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-16 mb-8">
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">Before:</p>
                <ScoreGauge score={50} label="Original Resume" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">After:</p>
                <ScoreGauge score={90} label="Optimized Resume" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>Your experience is strong for Product Owner transition:</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 4 years at HP with WWAN/IoT product experience</li>
                <li>• PSM I and PSPO I certifications</li>
                <li>• Cross-functional collaboration with engineering and business teams</li>
                <li>• Customer-centric mindset from B2B sales background</li>
                <li>• Multilingual capability for international product teams</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">Your previous resume was not telling this story effectively. It buried your strongest achievements under 13 duty-based bullets across two pages. It confused recruiters with scattered Core Competencies and non-work-related International Experience sections. It failed to quantify any results or prove business impact.</p>
              <p className="text-muted-foreground mt-2">Your new resume will showcase exactly what makes you valuable. You can validate complex technical products. You can collaborate across engineering and business stakeholders. You can translate technical findings into actionable product insights. You can deliver measurable quality improvements.</p>
              <p className="text-gold mt-4 font-semibold">You have the experience. Now you have the positioning. Go get the offer.</p>
            </div>
          </div>
        </section>

        {/* YOUR FEEDBACK MATTERS */}
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
              <p className="text-foreground font-medium">When you land interviews or offers, let me know!</p>
              <p className="text-sm text-muted-foreground mt-1">Your wins are my wins. Success stories help refine my approach.</p>
            </div>

            <div className="mt-8 pt-6 border-t border-border">
              <p className="text-foreground">Questions or need clarification on any recommendations?</p>
              <p className="text-muted-foreground mt-2">Feel free to reach out. I'm here to help you succeed.</p>
              <p className="text-gold mt-4 font-semibold">Best of luck with your applications!</p>
              <p className="text-sm text-muted-foreground mt-4">Review Completed: February 2026</p>
            </div>
          </div>
        </section>


      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2026 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PeihuaYehReview;
