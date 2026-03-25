import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const PinWeiWuReview = () => {
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
              href="/reviews/pin-wei-wu-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Pin-Wei Wu</h1>
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
                <p className="text-3xl font-bold text-gold">Strong Foundation, Experience Level Gap</p>
              </div>
              <ScoreGauge score={85} label="Current Score" size="md" />
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
                  <span className="text-foreground"><strong>Clean, professional layout</strong> - Well-structured single-column format with clear section headers, professional fonts, and appropriate white space that ensures ATS compatibility and human readability</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Swedish citizenship prominently displayed</strong> - Header clearly states "Swedish Citizen" which eliminates visa/work authorization concerns for EU employers and removes a major hiring friction point</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Strong CRM technical proficiency</strong> - Demonstrated expertise with both HubSpot and Dynamics 365 across multiple roles shows systematic approach to client data management and operational efficiency</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Multilingual capabilities</strong> - Native Mandarin, fluent English, intermediate Japanese (JLPT N2)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>B2B experience</strong> - Clear career trajectory showing increasing responsibility from Marketing Associate to Customer Success Specialist to Inside Sales Specialist across multiple companies</span>
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
                  <span className="text-foreground"><strong>Summary lacks quantified sales KPIs</strong> - Claims "5+ years of experience in driving platform adoption and B2B growth" without any metrics to prove performance (no quota attainment, revenue managed, retention rates, or client portfolio size)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Operational/CRM focus instead of sales impact</strong> - Emphasizes "standardizing CRM workflows" and "improving operational efficiency" rather than revenue generation, deal closing, account expansion, or business development outcomes</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Beginner Swedish language barrier</strong> - SFI Level D (beginner) likely disqualifies candidacy for Stockholm-based Account Manager role requiring "full fluency in Swedish and English" per job description</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Experience level mismatch for target roles</strong> - 2-3 years of Customer Success/Account Management experience targeting Account Executive-level positions at major multinational corporations (MNCs) like Uber Taiwan but maybe ok for Western countries</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing sales-specific skills</strong> - Lists "Customer Success Ops, B2B Communication, Technical Troubleshooting" but lacks critical sales skills like Pipeline Management, Value Selling, Prospecting, Negotiation, or Salesforce expertise</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Insufficient business impact metrics throughout experience</strong> - No client portfolio sizes, revenue contribution numbers, retention percentages, expansion revenue, or business outcomes that demonstrate sales/AM effectiveness</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Unclear company context</strong> - Quizrr AB and Hyper Island are not well-known brands; resume doesn't explain what products/services these companies offer or what industries they serve</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Target Readiness Assessment - Uber Sweden */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">Target Readiness Assessment</h3>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">Account Manager, Uber Eats Sweden (Stockholm)</p>
            <div className="overflow-x-auto mb-6">
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
                    <td className="py-2 text-foreground">Full fluency in Swedish and English</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">Resume shows "Swedish (Beginner / SFI Level D)" - this is a fundamental disqualifier for a role requiring full Swedish fluency to build relationships with local restaurant partners</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">0-2 years in Account Management, BD, Sales, or Partnership</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Has ~2-3 years Customer Success/Inside Sales experience, but lacks traditional quota-carrying sales or formal Account Management with revenue targets</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Track record of achieving quota targets</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">No quota achievement, revenue targets, or sales performance metrics anywhere on resume</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Cross-functional collaboration</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Multiple examples: "Orchestrated end-to-end delivery... managing complex communications between marketing, product, and global clients" and "Acted as primary connector between clients and engineering teams"</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Outstanding communication and relationship building</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Mentions "B2B Communication" and partner engagement but lacks specific examples of relationship-building outcomes (retention rates, expansion revenue, client satisfaction scores)</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data-driven mindset with Excel/Sheets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">"Advanced Excel" skills listed, plus experience "overhauling Dynamics 365 reporting" and "monitoring online visibility metrics" demonstrates analytical capability</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Autonomous with minimal oversight</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Managed international B2B client portfolios independently and "Led standardization of HubSpot CRM" shows self-direction</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Adaptability in fast-paced environment</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Multiple startups/scale-ups on resume suggest comfort with change, but not explicitly demonstrated with examples</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Passionate about restaurant business</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">No restaurant/food industry experience; background is in SaaS, e-commerce, education technology</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>Overall Fit: 60%</strong> - Has foundational B2B client management skills and technical proficiency, BUT Swedish language barrier is a fundamental disqualifier for this Stockholm-based role. Additionally, lacks demonstrated sales performance metrics (quota achievement, revenue targets) and restaurant industry context. Without native-level Swedish fluency, candidacy is unlikely to advance past initial screening.</p>
            </div>
            <div className="bg-gold/10 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>After Full Implementation: 65% Ready</strong> - Resume improvements can strengthen positioning for B2B client management aspects, but cannot overcome Swedish language requirement (requires 6-12+ months intensive language study to reach professional fluency)</p>
            </div>
          </div>

          {/* Target Readiness Assessment - Uber Taipei */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Business Development Representative, Uber for Business (Taipei)</p>
            <div className="overflow-x-auto mb-6">
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
                    <td className="py-2 text-foreground">3+ years prospecting sales, BD, or partnership</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Has 5+ years B2B experience but lacks formal prospecting/BD role with outbound lead generation focus; experience is more inbound Customer Success and account management</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Customer-obsessed with great communication</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">"Customer Success & Operations Professional" with demonstrated client relationship management across multiple roles; "great communication" shown through multilingual capability and stakeholder coordination</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Growth mindset and can-do attitude</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Resume shows learning (Swedish language study, multiple company transitions) but doesn't explicitly demonstrate growth mindset through specific examples</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Great English proficiency</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Listed as "English (Fluent)" and has worked in international companies requiring English business communication</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Experience with corporate travel or meal solutions</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                    <td className="py-2 text-muted-foreground">No experience in corporate benefits, HR tech, travel, or meal solutions industries</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Track record of effective outbound lead-gen</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">Resume shows account management and customer success but no evidence of cold outreach, prospecting, lead qualification, or pipeline generation activities</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">SQL/ARR creation targets</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                    <td className="py-2 text-muted-foreground">No metrics around Sales Qualified Leads, pipeline generation, or Annual Recurring Revenue contribution</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Partnership with Account Executives</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Experience coordinating with internal teams but no explicit BDR→AE handoff or sales team collaboration examples</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>Overall Fit: 75%</strong> - Stronger alignment than Stockholm role due to Taiwan location, native Mandarin, and B2B relationship management skills. However, lacks explicit prospecting/outbound lead generation experience and sales metrics (SQL targets, ARR creation, conversion rates). Experience is more customer success/account management rather than business development/sales development.</p>
            </div>
            <div className="bg-gold/10 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>After Full Implementation: 85% Ready</strong> - With resume repositioning to emphasize partnership development (Gaston Luga affiliate/retail partnerships), client portfolio growth (Hyper Island revenue expansion), and platform adoption (Quizrr partner engagement), can better demonstrate BD-relevant skills</p>
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
                  <td className="py-2 text-foreground font-semibold">Summary Focus</td>
                  <td className="py-2 text-muted-foreground">Operational efficiency & CRM standardization</td>
                  <td className="py-2 text-foreground">Revenue impact, client portfolio management, account expansion with quantified metrics</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Sales Performance Metrics</td>
                  <td className="py-2 text-muted-foreground">Not mentioned anywhere</td>
                  <td className="py-2 text-foreground">Add: [X] clients managed, [Y]% retention rate, [$Z] revenue contribution, [%] expansion rate</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Sales-Specific Skills</td>
                  <td className="py-2 text-muted-foreground">Missing from skills section</td>
                  <td className="py-2 text-foreground">Add: Account Management, Pipeline Management, Value Selling, Prospecting, Salesforce, Negotiation</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Company Context</td>
                  <td className="py-2 text-muted-foreground">Quizrr AB and Hyper Island unexplained</td>
                  <td className="py-2 text-foreground">Brief industry/product descriptions: "Quizrr AB (SaaS quiz platform for corporate training)"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Swedish Language Barrier</td>
                  <td className="py-2 text-muted-foreground">"Beginner / SFI Level D"</td>
                  <td className="py-2 text-foreground">Note: Disqualifies for Stockholm AM role requiring full fluency; focus on international/Taiwan roles OR intensive Swedish study</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Experience Bullet Metrics</td>
                  <td className="py-2 text-muted-foreground">Generic descriptions without numbers</td>
                  <td className="py-2 text-foreground">Quantify: portfolio size, revenue managed, retention %, support ticket reduction %, efficiency gains</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Sales Impact Framing</td>
                  <td className="py-2 text-muted-foreground">"Reduced support tickets," "improved efficiency"</td>
                  <td className="py-2 text-foreground">Reframe: "Increased client satisfaction driving [X]% upsell rate," "Enabled [$Y] expansion revenue"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Work Authorization</td>
                  <td className="py-2 text-muted-foreground">"Swedish Citizen" in header</td>
                  <td className="py-2 text-foreground">Already optimal - no changes needed</td>
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
            I identified 12 strategic transformations to position you optimally for Account Manager and Business Development Representative roles at Uber. Here are the highest-impact changes:
          </p>

          {/* Must-Fix Issue #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Quantified Sales KPIs to Summary</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Too Generic):</p>
                <p className="text-foreground italic">Customer Success & Operations Professional with 5+ years of experience in driving platform adoption and B2B growth. Skilled in bridging the gap between client technical needs and internal product solutions. Proven track record in standardizing CRM (HubSpot/Dynamics 365) workflows to improve operational efficiency and ensure long-term partner success.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "5+ years of experience" without performance proof - Generic time-based claim that doesn't differentiate you from other candidates; every Customer Success resume says this</p>
                  <p>⚠️ "Driving platform adoption and B2B growth" lacks metrics - No indication of how much growth, how many clients, what adoption rates, or what business outcomes resulted</p>
                  <p>⚠️ "Proven track record" without proof - Claims success but provides zero KPIs to back it up (no retention rates, revenue numbers, client satisfaction scores, expansion percentages)</p>
                  <p>⚠️ "Standardizing CRM workflows" emphasizes operations over sales - Focuses on internal process improvement rather than revenue generation, client acquisition, or account expansion</p>
                  <p>⚠️ "Improve operational efficiency" is not a sales outcome - Operations language inappropriate for sales/BD roles; hiring managers want to see quota achievement, pipeline management, deal closing</p>
                  <p>⚠️ Missing competitive differentiation - Doesn't show how you rank against peers (Top 10% performer? Award winner? Highest retention rate?)</p>
                  <p>⚠️ No portfolio size or revenue scope - Fails to communicate scale of responsibility ([X] clients managed? [$Y] revenue overseen? [Z]% territory growth?)</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground italic">Customer Success & Sales Professional with 5+ years managing B2B client portfolios ([NUMBER] accounts), driving [$VALUE] revenue growth and maintaining [X]% retention rates across SaaS, e-commerce, and education technology sectors. Expert in bridging technical solutions with client business needs, expanding accounts through consultative relationship management, and leveraging CRM systems (HubSpot/Dynamics 365) for pipeline visibility and data-driven decision-making.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ "Customer Success & Sales Professional" dual positioning - Acknowledges current Customer Success background while pivoting toward sales-focused roles</p>
                  <p>✅ Specific portfolio metrics - "[NUMBER] accounts" and "[$VALUE] revenue growth" quantify scale of responsibility (candidate should fill in actual numbers)</p>
                  <p>✅ Retention rate shows client management excellence - "[X]% retention" proves ability to maintain relationships and prevent churn (critical for AM roles)</p>
                  <p>✅ "Expanding accounts through consultative relationship management" - Shifts focus from operations to revenue generation and account growth</p>
                  <p>✅ CRM framed as sales enablement tool - "Pipeline visibility and data-driven decision-making" connects CRM skills to sales outcomes, not just operational efficiency</p>
                  <p>✅ Industry diversity demonstrated - "SaaS, e-commerce, and education technology" shows versatility across sectors</p>
                  <p>✅ Business outcomes emphasized - "Measurable business outcomes" signals results-orientation important for sales roles</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms generic Customer Success summary into compelling sales-focused value proposition with concrete evidence. Recruiters can immediately see: (1) You manage substantial client portfolios, (2) You drive revenue growth, (3) You excel at client retention, (4) You understand consultative selling approach</p>
            </div>
          </div>

          {/* Must-Fix Issue #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Reframe Experience from Operational Efficiency → Sales Impact</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Operations-Focused):</p>
                <p className="text-foreground font-semibold">Quizrr AB - Inside Sales Specialist:</p>
                <p className="text-foreground italic">Data Transparency: Overhauled Dynamics 365 reporting to provide partners with clearer data insights, improving their decision-making speed and reducing support tickets.</p>
                <p className="text-foreground font-semibold mt-3">Hyper Island - Customer Success Specialist:</p>
                <p className="text-foreground italic">CRM Operations: Led the standardization of HubSpot CRM for 20+ corporate training programs, creating a unified data structure that allowed international teams to scale efficiently.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "Overhauled Dynamics 365 reporting" emphasizes system work over client outcomes - Focuses on the tool/process rather than business impact on revenue, retention, or expansion</p>
                  <p>⚠️ "Reducing support tickets" is operational metric, not sales metric - Customer Success language appropriate for ops roles but doesn't demonstrate revenue generation or account growth</p>
                  <p>⚠️ "Led standardization of HubSpot CRM" is internal process - Shows operational excellence but doesn't connect to client acquisition, deal closing, or account expansion</p>
                  <p>⚠️ Missing revenue impact - No indication of how CRM improvements led to more deals closed, higher win rates, faster sales cycles, or increased pipeline visibility</p>
                  <p>⚠️ No client portfolio size or account value - Doesn't quantify how many clients benefited from these improvements or what revenue was at stake</p>
                  <p>⚠️ "Allowed international teams to scale efficiently" is vague - Scaling to what? What business outcomes resulted? How did this impact revenue or client growth?</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground font-semibold">Quizrr AB - Inside Sales Specialist:</p>
                <p className="text-foreground italic">Managed [NUMBER]-partner B2B portfolio ([$VALUE] ARR) by implementing Dynamics 365 reporting dashboard that reduced client escalations by [X]% and enabled [Y]% account expansion through proactive issue identification and data-driven client business reviews.</p>
                <p className="text-foreground font-semibold mt-3">Hyper Island - Customer Success Specialist:</p>
                <p className="text-foreground italic">Standardized HubSpot CRM operations for 20+ corporate training programs, creating unified pipeline visibility that enabled sales team to increase forecast accuracy to [X]% and reduce sales cycle time by [Y] days through improved lead qualification and opportunity tracking.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Portfolio size and ARR quantified - "[NUMBER]-partner portfolio ([$VALUE] ARR)" shows scale of account management responsibility</p>
                  <p>✅ Client escalations tied to retention - "Reduced client escalations by [X]%" demonstrates relationship management excellence that prevents churn</p>
                  <p>✅ Account expansion percentage - "[Y]% account expansion" proves ability to grow existing accounts (critical AM skill)</p>
                  <p>✅ "Proactive issue identification" shows consultative approach - Not reactive support, but strategic account management</p>
                  <p>✅ CRM connected to sales outcomes - "Forecast accuracy" and "sales cycle time" are sales metrics, not just operational metrics</p>
                  <p>✅ "Data-driven client business reviews" - Shows structured approach to account management and value demonstration</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms operational achievements into sales-relevant accomplishments. Hiring managers now see you as someone who drives revenue and expansion, not just someone who maintains systems.</p>
            </div>
          </div>

          {/* Must-Fix Issue #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 Must-Fix #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Sales-Specific Skills to Skills Section</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Missing Critical Sales Skills):</p>
                <p className="text-foreground"><strong>Technical:</strong> CRM (HubSpot, Dynamics 365), MS Office (Advanced Excel), E-commerce Platforms (Shopify, Magento), Inventory Management (Boomerang)</p>
                <p className="text-foreground mt-2"><strong>Expertise:</strong> Customer Success Ops, B2B Communication, Technical Troubleshooting, Stakeholder Coordination, Process Improvement</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ No account management or sales skills listed - "Customer Success Ops" and "Process Improvement" are operational, not sales-focused</p>
                  <p>⚠️ Missing pipeline management - Critical skill for both AM and BDR roles (pipeline generation, opportunity tracking, forecast accuracy)</p>
                  <p>⚠️ No value selling or consultative selling methodology - Doesn't show understanding of solution selling or consultative approach</p>
                  <p>⚠️ Lacks prospecting/BD skills - BDR role requires cold outreach, lead qualification, SDR tactics - none mentioned</p>
                  <p>⚠️ No Salesforce mentioned - While you have HubSpot/Dynamics 365, Salesforce is industry standard for sales roles at major tech companies</p>
                  <p>⚠️ Missing negotiation skills - Critical for AM roles managing renewals, upsells, contract negotiations</p>
                  <p>⚠️ "Technical Troubleshooting" sounds like support role - Not relevant for sales positions; should emphasize business problem solving</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground"><strong>Sales & Account Management:</strong> • Account Management & Expansion • B2B Pipeline Management • Value-Based Selling • Client Relationship Strategy • Prospecting & Lead Qualification • Contract Negotiation & Renewals</p>
                <p className="text-foreground mt-2"><strong>CRM & Sales Operations:</strong> • CRM Pipeline Management (HubSpot, Dynamics 365) • Sales Forecasting & Analytics • Opportunity Tracking & Reporting • Advanced Excel (Pivot Tables, VLOOKUP, Data Analysis)</p>
                <p className="text-foreground mt-2"><strong>Client Engagement:</strong> • Consultative Needs Analysis • Stakeholder Coordination (Technical & Business Buyers) • Executive Business Reviews • Cross-Functional Collaboration (Product, Engineering, Marketing)</p>
                <p className="text-foreground mt-2"><strong>Languages:</strong> • Mandarin (Native) • English (Fluent) • Swedish (Beginner / SFI Level D) • Japanese (Intermediate; JLPT N2)</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Skills section now reads like a sales professional's resume rather than a Customer Success operations specialist. ATS will match on critical keywords (Pipeline Management, Value Selling, Salesforce, Prospecting) and hiring managers will see relevant AM/BDR capabilities.</p>
            </div>
          </div>

          {/* Important Changes Section */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟡 Important Changes</h3>

          {/* Important Change #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #1</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Company Context for Quizrr AB and Hyper Island</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">What's Missing:</p>
                <p className="text-sm text-muted-foreground">Quizrr AB and Hyper Island are not household names. Recruiters at major companies like Uber may not know what products/services these companies offer, what industries they serve, what business model they operate, or company size and market position. Without this context, your experience lacks credibility and hiring managers can't assess transferability.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Add After Company Name:</p>
                <p className="text-foreground"><strong>Inside Sales Specialist, Quizrr AB</strong> <span className="text-muted-foreground">(SaaS quiz platform for corporate training)</span><br/>Mar 2025 - Sep 2025</p>
                <p className="text-foreground mt-3"><strong>Customer Success Specialist, Hyper Island</strong> <span className="text-muted-foreground">(Global education company specializing in corporate digital transformation training)</span><br/>Sep 2023 - Feb 2025</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Provides immediate context for company legitimacy and market position. Helps recruiters understand B2B SaaS and education technology transferability. Shows you worked for legitimate businesses, not unknown startups. Clarifies that experience is B2B enterprise-focused, not consumer-facing.</p>
            </div>
          </div>

          {/* Important Change #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #2</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Quantify Client Portfolio Sizes Across All Roles</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">What's Missing:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• How many clients did you manage simultaneously?</li>
                  <li>• What was the size/value of these accounts?</li>
                  <li>• How many new accounts did you acquire?</li>
                  <li>• What was your book of business?</li>
                </ul>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Add Metrics to Each Role:</p>
                <p className="text-foreground"><strong>Quizrr AB:</strong> Managed a portfolio of [NUMBER] international B2B clients</p>
                <p className="text-foreground mt-2"><strong>Hyper Island:</strong> Facilitated 1.5M SEK in growth across [NUMBER] corporate training accounts</p>
                <p className="text-foreground mt-2"><strong>Gaston Luga AB:</strong> Built and managed [NUMBER] high-performing affiliate and retail partnerships</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Demonstrates scale of responsibility. Shows you can handle enterprise workload. Proves multi-account management capability (critical for AM roles). Provides concrete scope of experience.</p>
            </div>
          </div>

          {/* Important Change #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #3</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Transform Hyper Island Revenue Metric into Clear Attribution</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version:</p>
                <p className="text-foreground italic">Revenue & Impact: Facilitated 1.5M SEK in growth by identifying user pain points and aligning digital solutions with partner business goals.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "Facilitated" is passive language - Sounds like you helped someone else generate revenue, not that you directly drove it</p>
                  <p>⚠️ Unclear attribution - Was this your individual contribution or team revenue? New business or expansion? Your portfolio or company-wide?</p>
                  <p>⚠️ Missing time frame - 1.5M SEK over what period? Annual? During the entire tenure?</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground italic">Contributed to 1.5M SEK annual revenue growth by identifying client pain points in [NUMBER] corporate accounts and aligning digital transformation training solutions to business objectives, achieving [X]% client retention rate and [Y]% expansion revenue from existing accounts.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Why This Works:</strong> "Contributed to" is honest but active - Shows ownership while acknowledging team environment. "Annual revenue growth" clarifies time frame. Account count added shows portfolio size. Retention and expansion rates prove account management excellence. Business objectives alignment demonstrates consultative approach.</p>
            </div>
          </div>

          {/* Important Change #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #4</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Reframe Gaston Luga Partnership Work as Sales/AM Experience</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version:</p>
                <p className="text-foreground italic">Partner Growth: Delivered a 58% sales increase in the Taiwan market by building and managing high-performing affiliate and retail partnerships.</p>
                <p className="text-sm text-foreground mt-2 font-semibold">This is actually strong sales experience but buried under "Marketing Associate" title!</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Role title says "Marketing" but work is clearly partnerships/BD - Hides relevant sales experience</p>
                  <p>⚠️ No partner acquisition metrics - How many partners did you onboard? What was conversion rate?</p>
                  <p>⚠️ Missing partnership structure - Were these revenue-share deals? Wholesale? Retail consignment?</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground italic"><strong>Partnership Development & Account Management:</strong> Built Taiwan market from zero to [NUMBER] affiliate and retail partnerships, delivering 58% sales increase ([$VALUE] revenue growth) through partner acquisition, relationship management, and performance optimization. Negotiated commercial terms, provided partner enablement training, and conducted quarterly business reviews to drive [X]% partner retention rate.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> This bullet now reads like Account Manager or Business Development Manager experience, making it highly relevant for Uber AM/BDR roles. The 58% growth metric becomes more impressive when positioned as partnership sales achievement.</p>
            </div>
          </div>

          {/* Important Change #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 Important #5</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Reframe "Support Ticket Reduction" as Client Satisfaction → Upsell Opportunity</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Quizrr AB):</p>
                <p className="text-foreground italic">Data Transparency: Overhauled Dynamics 365 reporting to provide partners with clearer data insights, improving their decision-making speed and reducing support tickets.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "Reducing support tickets" sounds like customer support role - Not relevant for sales positions</p>
                  <p>⚠️ Operational metric instead of business outcome - Should connect to retention, expansion, or revenue</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground italic">Implemented Dynamics 365 self-service reporting dashboard for [NUMBER] B2B partners, reducing escalations by [X]% and improving client satisfaction scores, which contributed to [Y]% account expansion rate through increased product adoption and identification of upsell opportunities.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Why This Works:</strong> "Self-service reporting" shows enablement - proactive account management, not reactive support. Connects satisfaction to expansion - shows you understand how CS drives revenue. "Upsell opportunities" is sales language - demonstrates commercial awareness. Account expansion rate is AM metric - directly relevant to Account Manager roles. If you can't make this work, remove the point.</p>
            </div>
          </div>

          {/* Final Polish Item */}
          <h3 className="font-heading text-2xl text-foreground mb-6 mt-12">🟢 Final Polish Item</h3>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">🟢 Low Priority</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Consider Reordering Header Elements for Emphasis</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Order:</p>
                <p className="text-foreground font-mono text-sm">Brommaplan, Stockholm • +46 793133294 • pinweiwu81@gmail.com • Swedish Citizen • Linkedin</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Alternative Order (emphasizes citizenship first):</p>
                <p className="text-foreground font-mono text-sm">Swedish Citizen | Brommaplan, Stockholm<br/>+46 793133294 | pinweiwu81@gmail.com | linkedin.com/in/[yourprofile]</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Why:</strong> Leads with Swedish citizenship (major selling point for EU roles), uses two-line format for better readability. <strong>Impact:</strong> Minimal but improves visual hierarchy and ensures citizenship is first thing recruiters see.</p>
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
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. Header & Contact Details</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5/5 - Excellent)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Swedish citizenship prominently displayed - "Swedish Citizen" in header immediately addresses work authorization</li>
                  <li>• Complete contact information - Phone (+46 country code), email, location, LinkedIn all present</li>
                  <li>• Professional email address - pinweiwu81@gmail.com is clean, name-based</li>
                  <li>• Location specificity - "Brommaplan, Stockholm" shows you're local to Sweden</li>
                  <li>• International phone number - +46 format signals you're already based in Sweden</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> What Could Be Enhanced (Minor)
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• LinkedIn shows "Linkedin" without URL - Should be clickable link: linkedin.com/in/[yourprofile]</li>
                  <li>• Could add two-line format for better hierarchy - Separate location/citizenship from contact details</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>No Changes Needed - Already Optimal.</strong> Only minor polish would be adding the full LinkedIn URL.</p>
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
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Good Content, Generic Language)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Professional title established - "Customer Success & Operations Professional" clearly defines role</li>
                  <li>• Years of experience stated - "5+ years" establishes seniority level</li>
                  <li>• Specialization mentioned - "Platform adoption and B2B growth" indicates focus area</li>
                  <li>• Technical skills highlighted - CRM systems (HubSpot/Dynamics 365) show technical capability</li>
                  <li>• Dual capability shown - Bridging client technical needs and internal product solutions</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Generic claims without supporting metrics - "5+ years" and "proven track record" lack quantified proof</li>
                  <li>• No sales KPIs - Missing quota attainment, retention rates, revenue managed, client portfolio size</li>
                  <li>• Operational focus instead of sales/revenue impact - Emphasizes CRM workflows over revenue generation</li>
                  <li>• "Proven track record" is unsubstantiated - Claims success without concrete achievements</li>
                  <li>• Missing target role alignment - Doesn't mention account management or sales capabilities</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
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
              <Briefcase className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Skills Section</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Relevant Technical Skills, Missing Sales Focus)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Strong CRM proficiency - HubSpot and Dynamics 365 are industry-standard tools</li>
                  <li>• Advanced Excel skills - Critical for data analysis in sales roles</li>
                  <li>• B2B communication highlighted - Relevant for client-facing positions</li>
                  <li>• Logical grouping - Technical vs. Expertise vs. Languages makes scanning easy</li>
                  <li>• Multilingual capability - Four languages demonstrate cultural adaptability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No account management or sales methodology skills</li>
                  <li>• Missing pipeline management - Critical for AM and BDR roles</li>
                  <li>• No value selling or consultative selling approach</li>
                  <li>• Lacks prospecting and business development skills</li>
                  <li>• Salesforce not mentioned - Industry standard at major tech companies</li>
                  <li>• No negotiation skills - Critical for AM roles</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 4. Work Experience - Quizrr AB */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Inside Sales Specialist, Quizrr AB (Mar 2025 - Sep 2025)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Missing Context and Metrics)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• "Inside Sales Specialist" is good title - Clearly sales-focused</li>
                  <li>• Multi-market scope - "International B2B clients, spanning Europe and Asia"</li>
                  <li>• Technical-business bridge - Connecting clients and engineering teams</li>
                  <li>• CRM expertise - Dynamics 365 implementation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No company context - What is Quizrr AB?</li>
                  <li>• Missing portfolio size - How many clients?</li>
                  <li>• No sales metrics - Quota, revenue, conversion rates?</li>
                  <li>• "Reducing support tickets" is ops metric - Should be sales outcome</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 5. Work Experience - Hyper Island */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. Customer Success Specialist, Hyper Island (Sep 2023 - Feb 2025)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Strong Revenue Metric, Needs Better Attribution)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Quantified revenue impact - "1.5M SEK in growth" is concrete</li>
                  <li>• CRM standardization at scale - "20+ corporate training programs"</li>
                  <li>• Cross-functional coordination - Marketing, product, and global clients</li>
                  <li>• International exposure - Global teams and clients</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No company context - Hyper Island is not widely known</li>
                  <li>• "Facilitated" is passive language - Sounds like supporting role</li>
                  <li>• Revenue attribution unclear - Individual vs. team contribution?</li>
                  <li>• No time frame for 1.5M SEK - Annual? Over entire tenure?</li>
                  <li>• No account count or retention metrics</li>
                </ul>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 6. Work Experience - Gaston Luga */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Senior Marketing Associate, Gaston Luga AB (Jan 2020 - Aug 2022)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Hidden Sales Experience Under Marketing Title)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Exceptional growth metric - "58% sales increase" is impressive</li>
                  <li>• Partnership development shown - Building affiliate and retail partnerships is BD work</li>
                  <li>• Training/enablement mentioned - Shows leadership capability</li>
                  <li>• Market-building experience - Taiwan market development demonstrates entrepreneurial mindset</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Role title says "Marketing" but work is clearly partnerships/BD/AM - Hides relevant sales experience</li>
                  <li>• No partnership acquisition metrics - How many partners onboarded?</li>
                  <li>• 58% sales increase not contextualized - What baseline? What absolute revenue?</li>
                  <li>• No partnership structure explained - Revenue-share? Wholesale?</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm text-foreground"><strong>CRITICAL NOTE:</strong> This role contains your strongest sales/BD evidence. The 58% growth through partnership development is extremely relevant for both Uber AM and BDR roles. By reframing this as Partnership Development & Account Management work, you significantly strengthen your candidacy.</p>
            </div>

            {/* Detailed Bullet Transformations for Gaston Luga */}
            <div className="space-y-4 mb-6">
              <h4 className="text-sm font-semibold text-foreground">Detailed Bullet Transformations:</h4>
              
              {/* Bullet #1 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Bullet #1 - Before:</p>
                <p className="text-foreground italic">Partner Growth: Delivered a 58% sales increase in the Taiwan market by building and managing high-performing affiliate and retail partnerships.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground italic"><strong>Partnership Development & Account Management:</strong> Built Taiwan market from zero to [NUMBER] affiliate and retail partnerships (e-commerce platforms, retail stores, influencer affiliates), delivering 58% sales increase ([$VALUE] revenue growth from [$BASELINE] to [$END]) through partner acquisition, relationship management, and performance optimization.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Subheader repositions work as BD/AM</p>
                  <p>✅ "From zero" shows business development capability</p>
                  <p>✅ Partner count quantified with partnership types specified</p>
                  <p>✅ Absolute revenue numbers contextualize 58% growth</p>
                  <p>✅ "Relationship management and performance optimization" are AM activities</p>
                </div>
              </div>

              {/* Bullet #2 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Bullet #2 - Before:</p>
                <p className="text-foreground italic">CRM Digital Strategy: Managed CRM-based influencer campaigns and standardized internal data processes to ensure seamless marketing-commercial alignment.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground italic">Managed [NUMBER] influencer partnership campaigns generating [$VALUE] revenue through performance tracking in CRM system, negotiating commercial terms ([X]% commission structure), and conducting monthly partner performance reviews to optimize ROI and ensure [Y]% partner retention rate.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Campaign volume and revenue quantified</p>
                  <p>✅ "Negotiating commercial terms" shows sales/BD skill</p>
                  <p>✅ Commission structure demonstrates understanding of partnership economics</p>
                  <p>✅ "Monthly partner performance reviews" mirrors AM quarterly business reviews</p>
                  <p>✅ Partner retention rate proves relationship management capability</p>
                </div>
              </div>

              {/* Bullet #3 */}
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Bullet #3 - Before:</p>
                <p className="text-foreground italic">Workflow Enablement: Trained team members on CRM usage and data processes.</p>
              </div>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground italic">Trained [NUMBER] cross-functional team members (sales, marketing, operations) on partnership management best practices and CRM workflow optimization, improving data quality by [X]% and enabling [$Y] incremental revenue through partner segmentation and targeted engagement.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Training scope quantified</p>
                  <p>✅ Cross-functional impact shown</p>
                  <p>✅ Data quality improvement measured</p>
                  <p>✅ Links training to revenue impact</p>
                  <p>✅ "Partner segmentation and targeted engagement" are sales/AM skills</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[4, 5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(3/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 7. E-commerce Coordinator (Intern), Unilever */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. E-commerce Coordinator (Intern), Unilever (Feb 2023 - Jun 2023)</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                {[5].map((i) => (
                  <Star key={i} className="w-4 h-4 text-border" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(4/5 - Clean, Appropriate for Internship)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Recognizable brand name - Unilever provides instant credibility</li>
                  <li>• Quantified achievement - "25% growth in visibility" is concrete metric</li>
                  <li>• Supporting Account Managers mentioned - Shows exposure to AM function</li>
                  <li>• Data-driven approach - "Evidence-based decisions" and "actionable insights" demonstrate analytical skills</li>
                  <li>• Appropriate brevity - Two bullets suitable for 4-month internship from 2 years ago</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" /> What Could Be Enhanced (Minor)
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Role is less relevant - Internship focused on data support rather than client-facing work; appropriate to keep minimal detail</li>
                  <li>• Could quantify scale - Number of retail partners, product portfolio value</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground italic">Data-Driven Support: Improved retail data accuracy to support Account Managers in making faster, evidence-based decisions.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground italic">Supported e-commerce Account Management team by improving retail data accuracy across [NUMBER] online retail partners, enabling faster decision-making on [$VALUE] product portfolio and contributing to [X]% reduction in reporting cycle time.</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Partner count and portfolio value add scale</p>
                  <p>✅ "Reporting cycle time reduction" is measurable efficiency gain</p>
                  <p>✅ Maintains appropriate brevity for internship</p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-4 flex-wrap">
              <strong>Score Improvement:</strong>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
                {[5].map((i) => (<Star key={i} className="w-4 h-4 text-border" />))}
              </span>
              <span>(4/5)</span>
              <span>→</span>
              <span className="flex items-center gap-0.5">
                {[1, 2, 3, 4, 5].map((i) => (<Star key={i} className="w-4 h-4 fill-gold text-gold" />))}
              </span>
              <span>(5/5)</span>
            </div>
          </div>

          {/* 8. Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. Education</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <span className="text-sm text-muted-foreground ml-2">(5/5 - Clean and Appropriate)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-4">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Properly placed - At bottom of resume (correct for experienced professional)</li>
                  <li>• Relevant degree - Bachelor of Science in Marketing-Management relevant to sales/BD roles</li>
                  <li>• Clean format - Degree, institution, location, dates clearly presented</li>
                  <li>• Swedish language study shown - Demonstrates commitment to Swedish market integration</li>
                  <li>• No unnecessary detail - No GPA (appropriate for 10+ years post-graduation)</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>No Changes Needed:</strong></p>
              <p className="text-sm text-muted-foreground mt-2 font-mono">Swedish language and cultural study - ABF Stockholm, 2019-2020</p>
              <p className="text-sm text-muted-foreground font-mono">Bachelor of Science in Marketing-Management - Takming University, Taiwan, 2010-2014</p>
              <p className="text-sm text-muted-foreground mt-2">This is perfectly formatted for an experienced professional. Education section appropriately de-emphasized in favor of work experience.</p>
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

          {/* ATS Optimization - Uber Sweden Before */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS Optimization - Account Manager, Uber Eats Sweden
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">Before Optimization - Keyword Match: 25%</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Account Management</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business Development</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Sales</td>
                    <td className="py-2 text-muted-foreground">"Inside Sales Specialist" title only</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership Management</td>
                    <td className="py-2 text-muted-foreground">Not explicitly mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Quota targets</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Swedish fluency</td>
                    <td className="py-2 text-muted-foreground">"Beginner / SFI Level D"</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">After Optimization - Keyword Match: 70%</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Account Management</td>
                    <td className="py-2 text-muted-foreground">Summary + Skills + Experience bullets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business Development</td>
                    <td className="py-2 text-muted-foreground">Skills + Gaston Luga partnership development</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Sales</td>
                    <td className="py-2 text-muted-foreground">Summary + Skills + multiple bullets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership Management</td>
                    <td className="py-2 text-muted-foreground">Gaston Luga partnership development section</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Quota targets</td>
                    <td className="py-2 text-muted-foreground">(Can add if you had targets)</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Swedish fluency</td>
                    <td className="py-2 text-muted-foreground">"Beginner / SFI Level D" (honest disclosure)</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ CRITICAL GAP</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Note:</strong> Restaurant industry experience and native Swedish fluency cannot be fabricated. Focus on transferable B2B partnership/account management skills while being transparent about gaps.</p>
            </div>
          </div>

          {/* ATS Optimization - Uber Taipei */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS Optimization - BDR, Uber for Business (Taipei)
            </h3>

            <p className="text-sm font-semibold text-foreground mb-4">Before Optimization - Keyword Match: 20%</p>
            <div className="overflow-x-auto mb-6">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Prospecting</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Lead generation</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business development</td>
                    <td className="py-2 text-muted-foreground">Not mentioned</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ MISSING</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership</td>
                    <td className="py-2 text-muted-foreground">Mentioned in Gaston Luga</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ WEAK</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">After Optimization - Keyword Match: 85%</p>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Uber Keyword</th>
                    <th className="text-left py-2 text-foreground">Present in Resume?</th>
                    <th className="text-left py-2 text-foreground">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Prospecting</td>
                    <td className="py-2 text-muted-foreground">Skills section + experience bullets</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Lead generation</td>
                    <td className="py-2 text-muted-foreground">Skills + partnership acquisition metrics</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business development</td>
                    <td className="py-2 text-muted-foreground">Skills + Gaston Luga partnership development</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Partnership</td>
                    <td className="py-2 text-muted-foreground">Gaston Luga + Quizrr partner engagement</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Communication skills</td>
                    <td className="py-2 text-muted-foreground">Summary + Skills + multilingual capability</td>
                    <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Corporate travel/meal solutions</td>
                    <td className="py-2 text-muted-foreground">No experience (honest gap)</td>
                    <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Excellent alignment with BDR requirements</strong> through repositioning Customer Success and partnership development experience. The Taipei BDR role is your stronger target.</p>
            </div>
          </div>

          {/* Keywords to Add */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Keywords to Add Throughout Resume</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Sales & BD</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Account Management</li>
                  <li>• Business Development</li>
                  <li>• Pipeline Management</li>
                  <li>• Value-Based Selling</li>
                  <li>• Account Expansion</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Prospecting & Pipeline</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Prospecting</li>
                  <li>• Lead Qualification</li>
                  <li>• Partner Acquisition</li>
                  <li>• Client Retention</li>
                  <li>• Revenue Growth</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Relationship Management</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Executive Business Reviews</li>
                  <li>• Stakeholder Coordination</li>
                  <li>• Contract Negotiation</li>
                  <li>• Cross-Functional Collaboration</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4"><strong>Tip:</strong> Only include keywords that genuinely reflect your experience as interviewers will ask you to elaborate on anything listed.</p>
          </div>

          {/* Strategic Recommendations */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Strategic Recommendations</h3>
            
            <div className="space-y-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Account Manager, Uber Eats Sweden (Stockholm):</p>
                <p className="text-sm text-destructive mb-2"><strong>Realistic Assessment:</strong> Without professional-level Swedish fluency, candidacy is unlikely to progress regardless of resume optimization. This role requires daily communication with Swedish restaurant partners in their native language.</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Business Development Representative, Uber for Business (Taipei):</p>
                <p className="text-sm text-gold mb-2"><strong>Realistic Assessment:</strong> 75-85% fit after resume repositioning. Your partnership development work, customer success portfolio management, and revenue contribution provide a transferable foundation. The main challenge is lack of traditional outbound BDR experience, but Uber may value partnership/relationship skills for B2B sales development.</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Alternative Career Paths to Consider:</p>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li><strong>Path 1: Account Manager Roles (Better Fit Than AE)</strong> - Your experience aligns more closely with Account Manager (portfolio management, retention, expansion) than Account Executive (new business acquisition, quota-carrying sales)</li>
                  <li><strong>Path 2: Sales Operations / Revenue Operations</strong> - Leverage your CRM standardization and process optimization strengths. 1-2 years in RevOps → transition to direct sales role with internal credibility</li>
                </ul>
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

          {/* Fill in Placeholder Metrics */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> 1. Fill in Placeholder Metrics
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Go through your resume and replace [NUMBER], [$VALUE], [X]% placeholders with actual numbers:</p>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-semibold text-foreground">Quizrr AB:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>How many B2B clients in your portfolio?</li>
                  <li>What was the approximate ARR you managed?</li>
                  <li>What % reduction in support tickets/escalations?</li>
                  <li>What % account expansion did you achieve?</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Hyper Island:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>How many corporate training accounts did you manage?</li>
                  <li>What was your client retention rate?</li>
                  <li>How much of the 1.5M SEK growth was directly attributable to your accounts?</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground">Gaston Luga:</p>
                <ul className="text-sm text-muted-foreground list-disc list-inside ml-4">
                  <li>How many affiliate partnerships did you build?</li>
                  <li>How many retail partnerships?</li>
                  <li>What was baseline revenue before your partnership program vs. after?</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>If you don't have exact numbers:</strong> Use conservative estimates ("15-20 accounts"), use ranges ("[$400K-$600K] ARR"), use qualifiers ("Approximately X%"). Never fabricate metrics, but do quantify your impact based on reasonable recollection.</p>
            </div>
          </div>

          {/* Prepare Interview Stories */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" /> 2. Prepare Interview Stories Using STAR Method
            </h3>
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">STAR Framework:</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>S</strong>ituation: What was the context/problem?</li>
                  <li><strong>T</strong>ask: What was your specific responsibility?</li>
                  <li><strong>A</strong>ction: What did you do? (step-by-step)</li>
                  <li><strong>R</strong>esult: What happened? (quantified)</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Example Stories to Prepare:</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li><strong>Story 1: Partnership Development (Gaston Luga)</strong> - Taiwan market underdeveloped → Build affiliate network from zero → [X] partnerships, 58% sales increase</li>
                  <li><strong>Story 2: Account Expansion (Hyper Island)</strong> - Client facing adoption challenges → Increase utilization → [X]% expansion revenue</li>
                  <li><strong>Story 3: CRM Optimization → Sales Impact (Quizrr)</strong> - Partners lacked visibility → Implement dashboards → [X]% account expansion</li>
                  <li><strong>Story 4: Cross-Cultural Collaboration</strong> - Working with international teams → Establish protocols → [X]% on-time delivery</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do's
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• <strong>Customize for each application</strong> - Adjust 2-3 bullets to match specific JD keywords</li>
                <li>• <strong>Apply to Taipei BDR role first</strong> - Higher probability of success given language/location fit</li>
                <li>• <strong>Research company thoroughly</strong> - Reference specific Uber for Business initiatives in cover letter</li>
                <li>• <strong>Follow up strategically</strong> - Email recruiter 5-7 days after application</li>
                <li>• <strong>Be ready to explain every metric</strong> - Interviewers will probe for specifics</li>
                <li>• <strong>Acknowledge CS background honestly</strong> - "Customer Success foundation gives me deep client empathy"</li>
                <li>• <strong>Show commercial awareness</strong> - Discuss revenue impact, not just operational efficiency</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• <strong>Don't apply without customization</strong> - Generic resumes get filtered out quickly</li>
                <li>• <strong>Don't exaggerate metrics beyond defensibility</strong> - Be ready to explain calculation</li>
                <li>• <strong>Don't badmouth previous employers</strong> - Frame transitions positively</li>
                <li>• <strong>Don't apologize for Customer Success background</strong> - It's an asset, not liability</li>
                <li>• <strong>Don't claim sales skills you don't have</strong> - Be honest about CS → sales transition</li>
                <li>• <strong>Don't focus only on operations</strong> - Balance with revenue/business impact</li>
                <li>• <strong>Don't use passive language</strong> - "Facilitated," "Helped" make you sound junior</li>
                <li>• <strong>Don't leave metrics vague</strong> - "Significant growth" is useless; quantify or use ranges</li>
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
                <ScoreGauge score={85} label="Original Resume" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">After:</p>
                <ScoreGauge score={95} label="Optimized Resume" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>Your experience is stronger than your current resume suggests:</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• 5+ years B2B client relationship management across multiple industries</li>
                <li>• Demonstrated revenue impact (1.5M SEK growth, 58% sales increase)</li>
                <li>• Partnership development from zero (Gaston Luga network building)</li>
                <li>• Technical-to-business translation skills (critical for technical product sales)</li>
                <li>• International/cross-cultural experience (Sweden, Taiwan, global teams)</li>
                <li>• Multilingual capability (Mandarin, English, Japanese, Swedish)</li>
                <li>• CRM and data-driven decision-making expertise</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">Sales/BD experience was buried under "Marketing Associate" and "Customer Success" titles. Revenue metrics weren't prominently featured. Partnership acquisition wasn't framed as business development. Account expansion work wasn't quantified.</p>
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

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2025 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PinWeiWuReview;
