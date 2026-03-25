import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const HopeChenReview = () => {
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
              href="/downloads/HOPE_CHEN_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Hope Chen</h1>
          <p className="text-cream/80 text-lg">Brand & Category Growth Manager</p>
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

          {/* Overall Score Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Score</p>
                <p className="text-3xl font-bold text-gold">90/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">(After Implementation)</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="Before" size="md" />
                <ScoreGauge score={95} label="After" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>Your resume is solid with a clear value proposition, strong quantified achievements, and good brand name references. The design is clean and 95% of the content works well. You explain your tools and skills in relation to target roles effectively.</p>
              
              <p><strong>First, minor presentation issue with title size being too small under your name</strong>, reducing visual impact of your positioning.</p>
              
              <p><strong>Second, tactical vs strategic balance</strong> in some work experience bullets that describe what you did without explicitly linking results to wider business goals or strategic impact.</p>
              
              <p><strong>Third, LinkedIn profile incomplete</strong> (outside scope of this review) making it harder for recruiters to find you through search.</p>
              
              <p>However, you have strong underlying qualifications for marketing manager roles. Your 10 years FMCG and retail experience, budget management, work with premium brands (adidas, Schweppes, BMW), quantified achievements, and clear progression from Account Executive to Manager demonstrate capability.</p>
              
              <p className="text-gold font-semibold">The problem is not your experience, it is minor refinements to presentation and linking tactical wins to strategic outcomes.</p>
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
                  <span className="text-foreground"><strong>Strong quantified achievements throughout:</strong> Every highlight bullet includes specific metrics (11x, 10%+, 153%, 40%) demonstrating measurable impact, not vague claims</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Premium brand credibility:</strong> Experience with adidas, Schweppes, BMW, JP Morgan, LG Taiwan provides immediate credibility and shows ability to work at scale</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clear budget management scope:</strong> NT$18M A&P responsibility signals manager-level accountability and financial stewardship</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Well-organized structure:</strong> Selected Highlights section draws attention to best work upfront, Core Competencies provides keyword-rich summary, experience shows appropriate detail levels</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Appropriate length and focus:</strong> Most recent role gets proper emphasis, older roles condensed appropriately, overall resume is scannable and focused</span>
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
                  <span className="text-foreground"><strong>Title font size too small:</strong> "Brand & Category Growth Manager" needs to be larger and bolder for better visual hierarchy and immediate positioning clarity</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Some bullets focus on execution without business context:</strong> Several work experience bullets describe what you did and how, but do not explicitly link to wider business goals or strategic outcomes</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>MS Office listed unnecessarily:</strong> This is assumed for marketing roles and wastes space that could showcase more distinctive skills or be removed entirely</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Shape Advertising bullet lacks outcome:</strong> Describes integrated GTM execution well but missing what resulted from the work (awareness lift, engagement rate, launch success)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ADK Taiwan bullet emphasizes operational metric:</strong> 100% on-time rollout is good but does not show marketing impact or campaign effectiveness</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Ogilvy bullet purely operational:</strong> Describes coordination of activations without any business outcome like trial rates, sales lift, or market share impact</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Current State vs. Optimal State</h3>
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
                  <td className="py-2 text-foreground font-semibold">Title Visual Hierarchy</td>
                  <td className="py-2 text-muted-foreground">Title font too small under name, reducing positioning clarity</td>
                  <td className="py-2 text-foreground">Larger, bolder title for immediate role identification</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Tools Section</td>
                  <td className="py-2 text-muted-foreground">MS Office listed (assumed skill)</td>
                  <td className="py-2 text-foreground">Remove or replace with data analysis proof in experience</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Shape Advertising Bullet</td>
                  <td className="py-2 text-muted-foreground">Execution focus without campaign outcomes</td>
                  <td className="py-2 text-foreground">Add awareness lift, engagement rate, or launch success metrics</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">ADK Taiwan Bullet</td>
                  <td className="py-2 text-muted-foreground">Emphasizes operational metric (100% on-time)</td>
                  <td className="py-2 text-foreground">Add marketing effectiveness or campaign results</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Ogilvy Action Bullet</td>
                  <td className="py-2 text-muted-foreground">Coordination focus without business outcomes</td>
                  <td className="py-2 text-foreground">Add trial rates, sales lift, or market share impact</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* KEY IMPROVEMENTS EXPLAINED */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Key Improvements Explained</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            We identified 5 strategic transformations to position you optimally across your target roles. Here are the highest-impact changes:
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Title Hierarchy</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Increase Title Font Size for Better Visual Hierarchy</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Weak Positioning):</p>
                <p className="text-sm text-foreground italic mb-3">Hope Chen Brand & Category Growth Manager [small font]</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Title too small compared to name reduces visual impact</li>
                  <li>• Weak hierarchy creates confusion</li>
                  <li>• Harder for recruiters to quickly categorize you</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-sm text-foreground italic mb-3">Hope Chen BRAND & CATEGORY GROWTH MANAGER [larger, bolder font]</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Immediate role clarity for recruiters</li>
                  <li>• Professional visual balance</li>
                  <li>• Faster processing in 6-second scan</li>
                  <li>• Flexible for customization</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Data Analysis</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Data Analysis and Excel Capability Through Experience Context</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Assumed Skill Listed):</p>
                <p className="text-sm text-foreground italic mb-3">Tools: MS Office (Excel, PowerPoint)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• MS Office is assumed for marketing professionals</li>
                  <li>• No proof of proficiency level</li>
                  <li>• Missed opportunity to highlight data skills</li>
                  <li>• Takes up line that could be removed</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-sm text-foreground mb-2">Option A: Remove Tools section entirely</p>
                <p className="text-sm text-foreground mb-2">Option B: Add new bullet to Mediacom role:</p>
                <p className="text-sm text-foreground italic">"Conducted advanced Excel-based campaign analysis and budget modeling for NT$18M A&P pool, creating automated dashboards and weekly performance reports that informed real-time optimization decisions and improved forecast accuracy by [X]%."</p>
              </div>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#3 Shape Advertising</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Campaign Outcomes to Shape Advertising Experience</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Execution Without Results):</p>
                <p className="text-sm text-foreground italic mb-3">"Orchestrated integrated GTM for LG Taiwan with influencer storytelling and social video assets, ensuring message consistency and execution quality across touchpoints."</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Describes process but not outcome</li>
                  <li>• Missing marketing impact metrics</li>
                  <li>• Purely operational focus</li>
                  <li>• No proof of campaign success</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-sm text-foreground mb-2">Option A (If You Have Metrics):</p>
                <p className="text-sm text-foreground italic mb-3">"...achieved [X]% increase in brand awareness and [Y]% engagement rate, exceeding campaign benchmarks."</p>
                <p className="text-sm text-foreground mb-2">Option B (If No Metrics Available):</p>
                <p className="text-sm text-foreground italic">"...successfully launched [product/campaign name] on time and on budget, delivering cohesive brand experience across digital and social channels."</p>
              </div>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 ADK & Ogilvy</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Strategic Metrics to ADK Taiwan and Ogilvy Action Experience</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version - ADK Taiwan (Operational Focus):</p>
                <p className="text-sm text-foreground italic">"Managed integrated ATL, digital and retail campaigns for BMW, JP Morgan, CITIZEN and Kirin Beer, ensuring messaging and on-ground activities supported brand positioning and business goals, aligning ATL/POSM/digital deliverables and cross-team timelines; achieved 100% on-time rollout."</p>
              </div>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version - Ogilvy Action (Coordination Focus):</p>
                <p className="text-sm text-foreground italic">"Executed 30+ in-store activations for British American Tobacco, coordinating brand stakeholders and field crews under tight timelines and brand compliance requirements."</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Versions:</p>
                <p className="text-sm text-foreground mb-2">ADK Taiwan:</p>
                <p className="text-sm text-foreground italic mb-3">"...achieved 100% on-time rollout and [X]% improvement in campaign effectiveness scores year-over-year."</p>
                <p className="text-sm text-foreground mb-2">Ogilvy Action:</p>
                <p className="text-sm text-foreground italic">"...achieved [X]% increase in product trial and [Y]% sales lift during activation periods, contributing to regional market share growth."</p>
              </div>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 Header Formatting</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Optimize Header and Minor Formatting Elements</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version:</p>
                <p className="text-sm text-foreground italic">LinkedIn: https://www.linkedin.com/in/hopechenyo/</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-sm text-foreground italic mb-3">LinkedIn: linkedin.com/in/hopechenyo</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• More professional appearance</li>
                  <li>• Easier to type manually</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* STRATEGIC POSITIONING & ATS OPTIMIZATION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Strategic Positioning & ATS Optimization</h2>
          </div>

          {/* Version 1: UNIQLO */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">Version 1: Product Marketing Manager (UNIQLO)</h3>
            <p className="text-sm text-muted-foreground mb-4">Target: UNIQLO-Product Marketing Assistant Manager/Manager</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">Key Requirements from JD:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 8+ years marketing experience in retail, apparel, cosmetics, or FMCG</li>
                <li>• Campaign management across paid and owned media</li>
                <li>• Local projects: events, digital contests, content creation with KOLs</li>
                <li>• Bilingual production and proofreading</li>
                <li>• A&P budget management</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-foreground font-medium">Your Fit:</span>
              <span className="bg-gold text-white px-3 py-1 rounded-full text-sm">85% match</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Customization Strategy:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Title: "Brand & Category Growth Manager" works, or use "Product Marketing Manager - FMCG & Retail"</li>
                <li>• Summary: Emphasize "retail experience" and "product launch planning" (LTO/NPD)</li>
                <li>• Highlights: Lead with LTO launch planning bullet (product launches key for this role)</li>
                <li>• Core Competencies: Add "Product Lifecycle Management," "Retail Marketing," "Omnichannel Strategy"</li>
                <li>• Experience: Emphasize cross-reach optimization (retail needs broad customer reach) and seasonal planning</li>
              </ul>
            </div>
          </div>

          {/* Version 2: 全億寢飾 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">Version 2: Brand Marketing Operations Manager (全億寢飾)</h3>
            <p className="text-sm text-muted-foreground mb-4">Target: 品牌行銷營運經理 at 全億寢飾</p>
            
            <div className="mb-4">
              <h4 className="font-semibold text-foreground mb-2">Key Requirements from JD:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Brand marketing strategy and execution</li>
                <li>• Marketing operations and budget management</li>
                <li>• Agency and vendor management</li>
                <li>• Process optimization</li>
                <li>• Content marketing and brand storytelling</li>
              </ul>
            </div>
            
            <div className="flex items-center gap-2 mb-4">
              <span className="text-foreground font-medium">Your Fit:</span>
              <span className="bg-gold text-white px-3 py-1 rounded-full text-sm">75% match</span>
            </div>
            
            <div>
              <h4 className="font-semibold text-foreground mb-2">Customization Strategy:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Title: "Brand & Category Growth Manager" or "Brand Marketing Operations Manager"</li>
                <li>• Summary: Emphasize "A&P budget management" (NT$18M) and "cross-functional leadership"</li>
                <li>• Highlights: Lead with A&P optimization bullet showing operational efficiency (10%+ reach lift, 40% CPR reduction)</li>
                <li>• Core Competencies: Add "Marketing Operations," "Budget Management," "Process Optimization," "Vendor/Agency Management"</li>
                <li>• Experience: Emphasize operational efficiency improvements and agency collaboration across all roles</li>
              </ul>
            </div>
          </div>
        </section>

        {/* ATS KEYWORD MATCH ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS Keyword Match Analysis</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">Before Optimization - UNIQLO Role</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-foreground">Product marketing</span><span className="text-yellow-600">WEAK</span></div>
                <div className="flex justify-between"><span className="text-foreground">Retail</span><span className="text-green-600">PRESENT</span></div>
                <div className="flex justify-between"><span className="text-foreground">Campaign</span><span className="text-green-600">PRESENT</span></div>
                <div className="flex justify-between"><span className="text-foreground">KOL collaboration</span><span className="text-destructive">MISSING</span></div>
                <div className="flex justify-between"><span className="text-foreground">Events</span><span className="text-destructive">MISSING</span></div>
                <div className="flex justify-between"><span className="text-foreground">Content creation</span><span className="text-destructive">MISSING</span></div>
              </div>
              <p className="text-sm text-destructive font-medium mt-4">Keyword Match Score: 50%</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">After Optimization - UNIQLO Role</h3>
              <div className="text-sm space-y-2">
                <div className="flex justify-between"><span className="text-foreground">Product marketing</span><span className="text-green-600">STRONG</span></div>
                <div className="flex justify-between"><span className="text-foreground">Retail</span><span className="text-green-600">STRONG</span></div>
                <div className="flex justify-between"><span className="text-foreground">KOL collaboration</span><span className="text-green-600">STRONG</span></div>
                <div className="flex justify-between"><span className="text-foreground">Bilingual</span><span className="text-green-600">STRONG</span></div>
                <div className="flex justify-between"><span className="text-foreground">Digital marketing</span><span className="text-green-600">STRONG</span></div>
                <div className="flex justify-between"><span className="text-foreground">A&P budget</span><span className="text-green-600">STRONG</span></div>
              </div>
              <p className="text-sm text-gold font-medium mt-4">Keyword Match Score: 90%</p>
            </div>
          </div>
        </section>

        {/* RESUME KEYWORDS REFERENCE LIST */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Resume Keywords Reference List</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading text-lg text-foreground mb-4">For UNIQLO Product Marketing Role</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gold mb-2">Product Marketing & Retail</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Product lifecycle management</li>
                    <li>• Retail marketing</li>
                    <li>• Product launch planning</li>
                    <li>• LTO/NPD execution</li>
                    <li>• Omnichannel strategy</li>
                    <li>• In-store marketing</li>
                    <li>• Store opening support</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">Campaign & Content</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• KOL collaboration</li>
                    <li>• Influencer marketing</li>
                    <li>• Content creation</li>
                    <li>• Bilingual campaign execution</li>
                    <li>• Social media marketing</li>
                    <li>• Digital contests</li>
                    <li>• Campaign management</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">Operations & Budget</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• A&P budget management</li>
                    <li>• Paid & owned media</li>
                    <li>• Global campaign coordination</li>
                    <li>• Cross-functional collaboration</li>
                    <li>• Marketing operations</li>
                  </ul>
                </div>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <h3 className="font-heading text-lg text-foreground mb-4">For 全億寢飾 Brand Marketing Ops Role</h3>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gold mb-2">Marketing Operations</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Marketing operations management</li>
                    <li>• Process optimization</li>
                    <li>• Budget management & forecasting</li>
                    <li>• Marketing efficiency</li>
                    <li>• Campaign operations</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">Agency & Vendor Management</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Agency relationship management</li>
                    <li>• Vendor management</li>
                    <li>• External partner coordination</li>
                    <li>• Production management</li>
                    <li>• Creative agency collaboration</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">Brand & Content</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Brand marketing strategy</li>
                    <li>• Brand storytelling</li>
                    <li>• Content marketing</li>
                    <li>• Brand positioning</li>
                    <li>• Integrated marketing communications</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gold mb-2">Analytics & Optimization</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Marketing analytics</li>
                    <li>• Campaign performance analysis</li>
                    <li>• Data-driven optimization</li>
                    <li>• Marketing effectiveness</li>
                    <li>• ROI measurement</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
          
          <p className="text-sm text-muted-foreground mt-6 italic">Tip: Only include keywords that genuinely reflect your experience as interviewers will ask you to elaborate on anything listed.</p>
        </section>

        {/* RESUME EFFECTIVENESS IMPROVEMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Resume Effectiveness Improvement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">Before Optimization</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Title too small reduces positioning clarity → Recruiters may overlook or misunderstand your level</li>
                <li>• Some bullets focus on tactics without business context → Appears execution-focused rather than strategic</li>
                <li>• MS Office listed as skill → Wastes space on assumed information</li>
                <li>• Shape Advertising lacks outcome metrics → Missing proof of campaign effectiveness</li>
                <li>• ADK Taiwan emphasizes only operational metric → Does not show marketing impact for premium brands</li>
                <li>• Ogilvy Action purely coordination focus → Missing business outcomes from activations</li>
              </ul>
              <p className="text-sm text-destructive font-medium mt-4">Estimated Pass Rate: 70-75% for target roles</p>
            </div>
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">After Optimization</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Larger title with better hierarchy → Immediate positioning clarity for recruiters</li>
                <li>• All bullets link tactics to business goals → Demonstrates strategic thinking and business impact orientation</li>
                <li>• MS Office removed or replaced with data analysis proof → Showcases distinctive analytical capability</li>
                <li>• Shape Advertising includes campaign results → Proves marketing effectiveness beyond execution</li>
                <li>• ADK Taiwan adds effectiveness metrics → Shows strategic value for premium client work</li>
                <li>• Ogilvy Action includes business outcomes → Demonstrates results orientation from early career</li>
              </ul>
              <p className="text-sm text-gold font-medium mt-4">Estimated Pass Rate: 90-95% for target roles</p>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">1</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Fix Format and Basic Information</h3>
                <p className="text-muted-foreground text-sm">Increase Title Font Size</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Transform Experience Bullets to Link Business Outcomes</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Add Outcome to Shape Advertising Bullet</li>
                  <li>• Add Strategic Metric to ADK Taiwan Bullet</li>
                  <li>• Add Business Outcome to Ogilvy Bullet</li>
                </ul>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Optimize Tools Section</h3>
                <p className="text-muted-foreground text-sm">Remove MS Office or replace with data analysis proof</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Apply to 5-10 Target Roles</h3>
                <p className="text-muted-foreground text-sm">Customize resume for each application based on role-specific strategies above</p>
              </div>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">5</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prepare Interview Stories Using STAR Method</h3>
                <p className="text-muted-foreground text-sm mb-3">For Each Major Achievement, prepare 2-3 minute stories following STAR framework:</p>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• <span className="font-medium text-foreground">Situation:</span> What was the context/problem?</li>
                  <li>• <span className="font-medium text-foreground">Task:</span> What was your specific responsibility?</li>
                  <li>• <span className="font-medium text-foreground">Action:</span> What did you do? (step-by-step)</li>
                  <li>• <span className="font-medium text-foreground">Result:</span> What happened? (quantified outcome)</li>
                </ul>
                
                <div className="mt-4 p-4 bg-muted/30 rounded-xl">
                  <h4 className="font-semibold text-foreground mb-2">Example for your 11x sales uplift achievement:</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• <span className="font-medium text-foreground">S:</span> Schweppes facing declining sales in competitive beverage market, needed breakthrough campaign</li>
                    <li>• <span className="font-medium text-foreground">T:</span> Lead GTM/IMC strategy to reverse sales trend and regain market share</li>
                    <li>• <span className="font-medium text-foreground">A:</span> Translated consumer insights into channel-specific strategies, optimized O2O conversion with targeted digital and offline mix, implemented weekly performance reviews for real-time adjustment</li>
                    <li>• <span className="font-medium text-foreground">R:</span> Achieved 11x sales uplift during campaign period, exceeding target by [X]% and contributing to overall brand growth</li>
                  </ul>
                </div>
                
                <div className="mt-4">
                  <p className="text-muted-foreground text-sm mb-2">Use my full interview prep guides:</p>
                  <div className="flex flex-wrap gap-3">
                    <a 
                      href="/interview-preparation-guide" 
                      className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      English Interview Prep Guide
                    </a>
                    <a 
                      href="/zh-tw/interview-preparation-guide" 
                      className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                    >
                      <FileText className="w-4 h-4" />
                      Chinese Interview Prep Guide (中文面試準備指南)
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* REMINDERS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Reminders</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-gold/5 rounded-xl p-6 border border-gold/20">
              <h3 className="font-semibold text-gold mb-4">Do's</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Customize for each application - Change 2-3 bullets to match JD</li>
                <li>• Follow up after applying - Email recruiter 5-7 days later</li>
                <li>• Be ready to explain every metric - Interviewers will ask</li>
                <li>• Keep examples confidential - Don't mention internal project names</li>
                <li>• Show genuine enthusiasm - Reference specific company initiatives</li>
              </ul>
            </div>
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">Don'ts</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Don't apply without customization - Quality {'>'} quantity</li>
                <li>• Don't exaggerate metrics - Be ready to support with data</li>
                <li>• Don't badmouth previous employers - Stay professional</li>
                <li>• Don't ignore cultural fit - Research company values</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8">
            <h2 className="font-heading text-2xl text-cream mb-4">Final Thought</h2>
            <p className="text-cream/90 leading-relaxed mb-4">
              Your experience is strong: Your previous resume was already solid at 90/100. The presentation was clear and achievements were quantified.
            </p>
            <p className="text-cream/90 leading-relaxed mb-4">
              These refinements move you to 95/100 by linking tactical excellence to strategic business outcomes.
            </p>
            <p className="text-gold font-semibold text-lg">
              You have the experience. Now you have the positioning. Go get the offer.
            </p>
          </div>
        </section>

        {/* YOUR FEEDBACK MATTERS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Your Feedback Matters</h2>
          </div>

          <p className="text-muted-foreground mb-6">I hope this review has been valuable in strengthening your application.</p>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <a 
              href="https://tally.so/r/81L09x" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">Share Your Feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground">Your honest feedback helps me improve the service. I read every response and continuously refine my approach.</p>
            </a>
            
            <a 
              href="https://www.trustpilot.com/review/jamesbugden.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center gap-3 mb-3">
                <ExternalLink className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">Leave a Trustpilot Review</h3>
              </div>
              <p className="text-sm text-muted-foreground">Public reviews help build credibility and help other professionals make informed decisions.</p>
            </a>
          </div>
          
          <div className="bg-muted/30 rounded-xl p-4 border border-border mb-6">
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-foreground">Why is the Trustpilot score 3.8?</span> I've just started a new business and Trustpilot applies an initial weighting for new businesses, which can temporarily lower early scores. As more real client reviews are added, the score adjusts to reflect actual service quality.
            </p>
          </div>
        </section>

        {/* DOWNLOAD PDF */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h2 className="font-heading text-xl text-foreground mb-2">Download Your Review</h2>
                <p className="text-muted-foreground text-sm">Save a copy of this review for your records</p>
              </div>
              <a
                href="/downloads/HOPE_CHEN_RESUME_REVIEW.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 bg-executive-green text-cream rounded-xl hover:bg-executive-green/90 transition-colors"
              >
                <Download className="w-5 h-5" />
                Download PDF
              </a>
            </div>
          </div>
        </section>

        {/* QUESTIONS */}
        <section className="text-center py-8">
          <p className="text-muted-foreground mb-2">Questions or need clarification on any recommendations?</p>
          <a 
            href="mailto:james@james.careers" 
            className="text-gold hover:underline font-medium"
          >
            Feel free to reach out. I'm here to help you succeed.
          </a>
        </section>
      </main>
    </div>
  );
};

export default HopeChenReview;
