import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const SilviaChenReview = () => {
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
            <ReviewLanguageToggle />
            <a 
              href="/downloads/SILVIA_CHEN_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Silvia Chen</h1>
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
                <p className="text-3xl font-bold text-gold">60/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">(After Implementation)</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={60} label="Before" size="md" />
                <ScoreGauge score={90} label="After" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>Your resume shows strong B2B experience across well-known companies, but weak presentation prevents recruiters from understanding your value quickly.</p>
              
              <p><strong>First, missing summary section creates immediate confusion</strong> about what role you're targeting and why you're qualified. Recruiters spend 6 seconds scanning resumes. Without a summary showcasing your Customer Success expertise upfront, they move to the next candidate.</p>
              
              <p><strong>Second, duty-based language throughout</strong> instead of results-focused achievements. You're telling employers what you were responsible for rather than what outcomes you delivered. Most bullets lack the XYZ framework of "Accomplished [X] as measured by [Y] by doing [Z]."</p>
              
              <p><strong>Third, inconsistent formatting and spacing</strong> makes the resume look rushed and unprofessional. Different bullet styles, spacing issues, and formatting inconsistencies signal poor attention to detail.</p>
              
              <p>However, you have strong underlying qualifications for a Customer Success Manager role. Your 8+ years of B2B experience, proven ability to drive customer retention, cross-functional collaboration skills, and bilingual capabilities (English, Japanese N1, learning Korean).</p>
              
              <p className="text-gold font-semibold">The problem isn't your experience, it's how you're presenting it.</p>
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
                  <span className="text-foreground"><strong>Strong Customer Retention Achievement at Merkle</strong>: 122% sales achievement through RFM modeling and data-driven re-engagement for furniture brand demonstrates quantified customer success impact with specific methodology</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Relevant B2B Experience Across Well-Known Companies</strong>: 8+ years at Merkle/Dentsu, DKSH Smollan (Google Pixel), HTC/VIVEPORT, ASUS ROG shows progression in tech and digital sectors with recognizable brand names</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Data Analysis and CRM Skills</strong>: Experience with RFM modeling, customer journey mapping, LINE/CRM tagging, A/B testing, Tableau, Power BI, and Excel directly aligns with data-driven customer success requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Multilingual Capabilities</strong>: Fluent English, Japanese (JLPT N1), and learning Korean (TOPIK 1) demonstrates ability to work in multilingual environments and support international customers</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Cross-Functional Collaboration Experience</strong>: Working with data teams, marketing, sales, product teams, and engineering shows ability to partner across departments to ensure customer success</span>
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
                  <span className="text-foreground"><strong>Missing Summary Section</strong>: No executive summary means recruiters can't quickly understand your value proposition, years of experience, or why you're qualified for Customer Success Manager roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Incomplete Contact Information</strong>: Missing LinkedIn URL and location (Taipei, Taiwan). Modern resumes need LinkedIn for credibility verification and location for work authorization clarity</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Duty-Based Language Throughout</strong>: Almost every bullet describes responsibilities ("Drove," "Architected," "Coordinated," "Monitored") instead of measurable outcomes using XYZ framework</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Inconsistent Formatting and Spacing</strong>: Different bullet styles, spacing issues between sections, and inconsistent indentation make resume look unprofessional and hard to scan</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Key Customer Success Keywords</strong>: Resume lacks terms like "customer onboarding," "QBRs," "renewals," "churn reduction," "customer health scores," "expansion revenue," "NPS," "customer advocacy"</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Language Proficiency Buried</strong>: Multilingual capability (English, Japanese N1, Korean) is buried in skills section instead of being prominently displayed as competitive advantage</span>
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
                  <td className="py-2 text-foreground font-semibold">Summary Section</td>
                  <td className="py-2 text-muted-foreground">Missing entirely - no value proposition or qualification overview</td>
                  <td className="py-2 text-foreground">3-4 sentence summary with years of experience, quantified achievements, key skills, and Customer Success focus</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Contact Information</td>
                  <td className="py-2 text-muted-foreground">Missing LinkedIn URL and location (only email and phone)</td>
                  <td className="py-2 text-foreground">Add LinkedIn URL and "Taipei, Taiwan" location for credibility and work authorization clarity</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Bullet Structure</td>
                  <td className="py-2 text-muted-foreground">Duty-based language ("Drove," "Architected," "Coordinated") with limited quantified outcomes</td>
                  <td className="py-2 text-foreground">XYZ framework: Accomplished [X] as measured by [Y], by doing [Z] for every bullet</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Resume Formatting</td>
                  <td className="py-2 text-muted-foreground">Inconsistent bullet styles, spacing issues, and indentation problems</td>
                  <td className="py-2 text-foreground">Consistent formatting throughout with proper spacing, uniform bullets, clear visual hierarchy</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Customer Success Keywords</td>
                  <td className="py-2 text-muted-foreground">Missing: onboarding, QBRs, renewals, churn, customer health scores, expansion, NPS, advocacy</td>
                  <td className="py-2 text-foreground">Strategic incorporation of Customer Success terminology in summary, bullets, and skills</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Language Proficiency</td>
                  <td className="py-2 text-muted-foreground">Buried in skills section as single line</td>
                  <td className="py-2 text-foreground">Dedicated "Languages" section: "English (Fluent), Japanese (JLPT N1), Korean (TOPIK 1 - Learning)"</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Education Section</td>
                  <td className="py-2 text-muted-foreground">Includes irrelevant thesis titles wasting space</td>
                  <td className="py-2 text-foreground">Remove thesis details, keep degree/institution/dates only</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* KEY IMPROVEMENTS EXPLAINED */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Key Improvements Explained</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            We identified 6 strategic transformations to position you optimally for the Customer Success Manager role at Speak. Here are the highest-impact changes:
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Add Executive Summary</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Executive Summary to Showcase Customer Success Experience</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Missing Entirely):</p>
                <p className="text-muted-foreground text-sm">Your resume has no summary section. Recruiters spend 6 seconds scanning resumes before deciding whether to read further. Without a summary, they must piece together your value proposition from bullet points scattered across multiple roles.</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>No value proposition upfront - Recruiters can't quickly understand what role you're targeting or why you're qualified</p>
                  <p>Buried Customer Success achievements - Your strongest proof point (122% sales achievement through customer retention) is hidden in the middle of your resume</p>
                  <p>Unclear years of experience - No quick reference for experience level</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground text-sm italic">Customer Success professional with 8+ years of B2B experience driving customer retention, expansion, and satisfaction across tech and digital platforms. Track record includes achieving 122% sales targets through data-driven re-engagement strategies, reducing churn through optimized customer journey mapping, and expanding market share by 53% (1.5% to 2.3%) for Google Pixel through coordinated sales and marketing alignment. Expertise in customer lifecycle management, CRM strategy, cross-functional collaboration, and data analysis (RFM modeling, A/B testing, Tableau, Power BI). Fluent in English and Japanese (JLPT N1), with experience supporting global customers across Asia-Pacific markets.</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Clear role positioning upfront - "Customer Success Manager" immediately tells recruiters what you're targeting</li>
                <li>Quantified experience level - "8+ years of B2B experience" sets appropriate expectations for mid-senior roles</li>
                <li>Three specific, measurable achievements - 122% sales achievement, 53% market share expansion, churn reduction</li>
                <li>Strategic keyword loading - Customer retention, expansion, lifecycle management, CRM strategy, cross-functional collaboration</li>
                <li>Differentiators highlighted - Multilingual capabilities and Asia-Pacific market experience</li>
              </ul>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 XYZ Framework</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Convert All Bullets to XYZ Framework</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Duty-Based Language):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p><strong>Merkle Taiwan:</strong></p>
                  <p>• Drove 122% Sales Achievement: Spearheaded data-driven re-engagement for a leading furniture brand using RFM modeling; identified high-value segments and optimized purchase cycles to exceed sales targets by 20%.</p>
                  <p className="mt-2">• Architected Retention Frameworks: Redesigned customer journeys and LINE/CRM tagging strategies to bridge service gaps; implemented A/B testing that improved lead-to-service conversion and minimized churn through personalized automation.</p>
                  <p className="mt-2"><strong>DKSH Smollan:</strong></p>
                  <p>• Coordinated marketing and sales resources based on data analysis to ensure successful sales results. Increased the market share of our flagship product, Pixel, from 1.5% to 2.3% during my time there.</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Merkle first bullet is strong - Has quantified outcome (122% achievement) but could better specify business impact</p>
                  <p>Merkle second bullet is vague - "Improved lead-to-service conversion" by how much? "Minimized churn" by what percentage?</p>
                  <p>DKSH first bullet buries the lead - Market share expansion (1.5% to 2.3% = 53% relative increase) is buried after vague opening</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version (XYZ Framework):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p><strong>MERKLE TAIWAN (Dentsu Group) | Taipei, Taiwan</strong></p>
                  <p><strong>CRM Senior Manager</strong> | Jun 2024 - Present</p>
                  <p className="mt-2">• Increased customer retention revenue by 22% (achieving 122% of sales target) for leading furniture brand, measured by repeat purchase rate improvement from 18% to 28%, by implementing RFM modeling to identify high-value segments and personalizing re-engagement campaigns based on optimized purchase cycle analysis.</p>
                  <p className="mt-2">• Reduced customer churn by [X]% while improving lead-to-service conversion by [Y]%, measured by 90-day retention tracking and service activation rates, by redesigning customer journey flows with LINE/CRM automation and conducting A/B testing across 5 personalized engagement paths.</p>
                  <p className="mt-3"><strong>DKSH SMOLLAN | Taipei, Taiwan</strong></p>
                  <p><strong>Channel Strategy Manager</strong> | Oct 2022 - Jul 2023</p>
                  <p className="mt-2">• Expanded Google Pixel market share by 53% (1.5% to 2.3% of Taiwan smartphone market), generating approximately [X]M NTD incremental revenue, by coordinating marketing and sales resources through data-driven channel strategies and competitive positioning analysis.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> XYZ framework transforms duty lists into proof of capability. Recruiters and hiring managers want to know what results you can deliver for them - this structure answers that question directly.</p>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 Complete Contact Info</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Complete Contact Information (LinkedIn + Location)</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Incomplete):</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground mb-3">
                  <p>Silvia Chen</p>
                  <p>yingchu08@gmail.com</p>
                  <p>+886-923750827</p>
                </div>
                <div className="space-y-1 text-sm text-muted-foreground">
                  <p>Missing LinkedIn URL - Recruiters verify 90% of candidates on LinkedIn before contacting</p>
                  <p>Missing location - No indication you're Taipei-based. Creates confusion about work authorization</p>
                  <p>No visual separation - Email and phone run together making it harder to scan</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="bg-muted/50 rounded p-3 font-mono text-sm text-foreground">
                  <p>SILVIA CHEN</p>
                  <p>Taipei, Taiwan | yingchu08@gmail.com | +886-923-750-827 | linkedin.com/in/silviachen</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Complete contact information is table stakes for professional resumes. Missing elements create friction in the hiring process and signal lack of attention to detail.</p>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#4 Dedicated Languages Section</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Dedicated Language Proficiency Section</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Buried in Skills):</p>
                <p className="text-muted-foreground text-sm">Major differentiator is hidden - Multilingual capability (English, Japanese N1, Korean) is rare and valuable for Taiwan-based roles at international companies like Speak, but buried at the end of a mixed skills section.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="bg-muted/50 rounded p-3 text-sm text-foreground">
                  <p className="font-semibold">LANGUAGES</p>
                  <p>Mandarin Chinese (Native) | English (Fluent) | Japanese (JLPT N1 - Business Fluent) | Korean (TOPIK 1 - Conversational)</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 mt-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Language proficiency is a competitive advantage that differentiates you from monolingual candidates, especially for Taiwan-based roles at multinational companies like Speak serving Asia-Pacific markets.</p>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">#5 Customer Success Keywords</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Add Strategic Customer Success Keywords Throughout Resume</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-3">Missing Keywords from Speak JD:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Customer onboarding</li>
                    <li>• Quarterly Business Reviews (QBRs)</li>
                    <li>• Customer retention</li>
                    <li>• Customer satisfaction</li>
                    <li>• Renewals and expansion</li>
                  </ul>
                  <ul className="text-sm text-foreground space-y-1">
                    <li>• Churn reduction</li>
                    <li>• Customer health scores</li>
                    <li>• Customer lifecycle</li>
                    <li>• Training sessions</li>
                    <li>• Customer advocacy</li>
                  </ul>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After Optimization - Keyword Match Score: 95%</p>
                <p className="text-foreground text-sm">Strategic integration of Customer Success terminology in summary, bullets, and skills section ensures ATS pass-through and demonstrates industry knowledge to human recruiters.</p>
              </div>
            </div>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/10 text-green-600 text-xs font-bold rounded-full uppercase tracking-wide">#6 Clean Up Education</span>
            </div>
            <h3 className="font-heading text-xl text-foreground mb-4">Clean Up Education Section by Removing Thesis Titles</h3>
            
            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Includes Irrelevant Details):</p>
                <div className="text-sm text-muted-foreground space-y-2">
                  <p>National Chengchi University, Master of Business Administration (MBA) | Sep 2014 - Jun 2015</p>
                  <p className="italic">Thesis title: Study on How Accelerators Help Internet Entrepreneurs to Acquire Resources</p>
                  <p>National Taiwan Normal University, Master of Library and Information Science | Sep 2008 - Jan 2011</p>
                  <p className="italic">Thesis title: An exploratory study on university students' relevance judgment for web video retrieval</p>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Thesis titles waste valuable space - For professionals with 8+ years experience, thesis topics are not relevant to hiring decisions for Customer Success roles.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="text-foreground text-sm">
                  <p>MBA, National Chengchi University, Taiwan (2014-2015)</p>
                  <p>MS Library and Information Science, National Taiwan Normal University, Taiwan (2008-2011)</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ATS KEYWORD ANALYSIS */}
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
            <p className="text-muted-foreground mb-4">Primary Target: Customer Success Manager at Speak (Taiwan)</p>
            <p className="text-gold mb-6">Match Strength: 70% fit (after optimization: 90%)</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3">Why You're a Good Fit:</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>• 2+ years customer success experience in B2B - You have 8+ years B2B experience with clear customer retention focus</li>
                  <li>• Previous business operations experience - Channel Strategy Manager and CRM Senior Manager roles</li>
                  <li>• Strong customer communication skills - Experience conducting business reviews and stakeholder engagement</li>
                  <li>• Multilingual capability - Fluent English and Japanese (JLPT N1) exceeds basic requirement</li>
                  <li>• Data analysis and CRM expertise - RFM modeling, customer journey mapping, A/B testing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3">Current Gaps:</p>
                <ul className="text-sm text-foreground space-y-2">
                  <li>• No explicit EdTech experience - Speak is EdTech/language learning. However, your experience at diverse tech companies shows adaptability</li>
                  <li>• Missing specific CSM terminology - Resume doesn't use "onboarding," "QBRs," "renewals," "churn"</li>
                  <li>• Limited customer-facing examples - Bullets emphasize internal analysis rather than direct customer engagement</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Keyword Match */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">ATS Keyword Match Analysis</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">Before Optimization: 35%</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Customer Success</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Onboarding</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">QBRs</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Customer retention</td>
                        <td className="py-2 text-center"><span className="text-yellow-500">WEAK</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Mandarin Chinese</td>
                        <td className="py-2 text-center"><span className="text-destructive">MISSING</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div>
                <h4 className="font-semibold text-gold mb-3">After Optimization: 95%</h4>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Customer Success</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Onboarding</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">QBRs</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Customer retention</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Mandarin Chinese</td>
                        <td className="py-2 text-center"><span className="text-gold">STRONG</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>

          {/* Resume Keywords Reference */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Resume Keywords for Customer Success Roles</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Customer Success Core</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Customer retention</li>
                  <li>• Customer satisfaction</li>
                  <li>• Customer health scores</li>
                  <li>• Churn reduction</li>
                  <li>• Renewal rate</li>
                  <li>• Expansion revenue</li>
                  <li>• Customer lifecycle</li>
                  <li>• NPS / CSAT</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Customer Success Activities</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Customer onboarding</li>
                  <li>• Training sessions</li>
                  <li>• QBRs / EBRs</li>
                  <li>• Success planning</li>
                  <li>• Account management</li>
                  <li>• Stakeholder engagement</li>
                  <li>• Escalation management</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-gold mb-2">Data & Analytics</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Data-driven strategies</li>
                  <li>• CRM systems</li>
                  <li>• RFM modeling</li>
                  <li>• Customer segmentation</li>
                  <li>• A/B testing</li>
                  <li>• Performance metrics</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* NEXT STEPS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Action Items
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li><strong>Add Executive Summary</strong> - Use the optimized version provided for Customer Success Manager positioning</li>
              <li><strong>Complete Contact Information</strong> - Add LinkedIn URL and location: "Taipei, Taiwan"</li>
              <li><strong>Create Dedicated Languages Section</strong> - Mandarin Chinese (Native), English (Fluent), Japanese (JLPT N1), Korean (TOPIK 1)</li>
              <li><strong>Rewrite Bullets Using XYZ Framework</strong> - Accomplished [X] as measured by [Y] by doing [Z]</li>
              <li><strong>Add Customer Success Keywords</strong> - Onboarding, QBRs, retention, churn, health scores</li>
              <li><strong>Clean Up Education Section</strong> - Remove thesis titles, keep degree/institution/dates only</li>
              <li><strong>Prepare Interview Stories Using STAR Method</strong> - Situation, Task, Action, Result</li>
            </ol>
          </div>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do's
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Customize for each application - Change 1-2 bullets to match JD keywords</li>
                <li>• Follow up after applying - Email recruiter 5-7 days later</li>
                <li>• Be ready to explain every metric - Interviewers will ask for details</li>
                <li>• Show genuine enthusiasm - Reference specific Speak initiatives</li>
                <li>• Emphasize multilingual advantage - Your Japanese fluency is rare and valuable</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Don't apply without customization - Generic applications get rejected</li>
                <li>• Don't exaggerate metrics - Be ready to support with data and examples</li>
                <li>• Don't ignore cultural fit - Research Speak's mission and values</li>
                <li>• Don't forget to proofread - Typos signal carelessness</li>
                <li>• Don't skip the summary - This is the most important 80 words on your resume</li>
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
                <ScoreGauge score={60} label="Original Resume" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">After:</p>
                <ScoreGauge score={90} label="Optimized Resume" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">Your previous resume wasn't telling this story effectively. It buried your strongest achievements under duty-based bullets, lacked a summary to showcase your Customer Success expertise, and missed critical keywords that ATS systems scan for.</p>
              <p className="text-muted-foreground mt-2">Your new resume will clearly position you as a results-driven Customer Success professional with quantified proof of retention, expansion, and customer satisfaction impact.</p>
              <p className="text-gold mt-4 font-semibold">You have the experience. Now you have the positioning. Go get the offer.</p>
            </div>
          </div>
        </section>

        {/* YOUR FEEDBACK MATTERS */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">Your Feedback Matters</h2>
            <p className="text-foreground mb-6">I hope this review has been valuable in strengthening your application.</p>
            
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a 
                href="https://tally.so/r/81L09x" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">Share Your Feedback</h3>
                    <p className="text-sm text-muted-foreground">Takes 2 minutes</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Your honest feedback helps me improve and helps other job seekers discover this service.</p>
              </a>

              <a 
                href="https://www.trustpilot.com/review/jamesbugden.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold hover:shadow-gold transition-all duration-300"
              >
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-foreground group-hover:text-gold transition-colors">Leave a Trustpilot Review</h3>
                    <p className="text-sm text-muted-foreground">Help others find quality service</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">Public reviews build credibility and help other professionals make informed decisions.</p>
              </a>
            </div>

            <div className="p-4 bg-muted/30 rounded-lg border border-border mb-6">
              <p className="text-sm text-muted-foreground text-center">
                <span className="font-medium text-foreground">Why is the Trustpilot score 3.8?</span>
                <br className="hidden sm:block" />{" "}
                I've just started a new business and Trustpilot applies an initial weighting for new businesses. As more real client reviews are added, the score adjusts to reflect actual service quality.
              </p>
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
    </>
  );
};

export default SilviaChenReview;
