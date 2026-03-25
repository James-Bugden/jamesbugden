import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import { SEO } from "@/components/SEO";

const JamesBugdenReview = () => {
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
              href="/reviews/james-bugden-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">James Bugden</h1>
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
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Assessment</p>
                <p className="text-3xl font-bold text-gold">Strong Foundation with Strategic Improvements Needed</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3, 4].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-gold text-gold" />
                  ))}
                  <Star className="w-6 h-6 text-border" />
                </div>
                <span className="text-muted-foreground">(4/5)</span>
              </div>
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
                  <span className="text-foreground"><strong>Uber Superstar Award</strong> - Top-performer recognition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>10-year progression:</strong> School Director → Agency → Corporate Senior Recruiter</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K+ community</strong> - Unique thought leadership differentiator</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Stability:</strong> Current employment at Uber</span>
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
                  <span className="text-foreground">Generic summary with adjectives but zero proof</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Duty-based bullets ("Hire in North Asia") missing business impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">8 ATS format errors</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Missing 15+ keywords from target JDs</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Bullets don't answer "How did this help the company?"</span>
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">Current State</p>
                <div className="flex items-end gap-3 mb-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[65%] bg-gold rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-gold">65%</span>
                </div>
                <p className="text-sm text-foreground mb-3">
                  This resume will get you interviews for mid-level Technical Recruiter roles. However, it's not optimally positioned for Senior Technical Recruiter / Lead Recruiter / University Recruiter positions at Microsoft, Google, or Meta because:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Summary lacks proof - Claims "data-driven" without showing data impact</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Bullets are duty-focused - Describes what you did, not business value created</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Best achievement buried - Uber Superstar Award hidden in bullet #2, not explained</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing strategic positioning - No evidence of stakeholder management, strategic hiring, or process innovation</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> ATS format issues - 8 formatting problems</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing 15+ keywords - Not optimized for Big Tech job descriptions</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm text-muted-foreground mb-2 font-semibold">After Full Implementation</p>
                <div className="flex items-end gap-3 mb-3">
                  <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                    <div className="h-full w-[95%] bg-gold rounded-full"></div>
                  </div>
                  <span className="text-2xl font-bold text-gold">95%</span>
                </div>
                <p className="text-sm text-foreground mb-3 font-semibold">
                  Roles you can target with strong interview performance:
                </p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Senior Technical Recruiter (IC path at Uber, Microsoft, Google, Meta)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Lead Technical Recruiter (IC with strategic project ownership)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Talent Acquisition Partner (senior IC at Big Tech)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Principal Recruiter (IC5/IC6 at Big Tech)</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Recruiting Manager (small team leadership, 3-5 recruiters)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* At-a-Glance Snapshot */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5" /> Key Strengths
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Uber Superstar Award</strong> - Rare top-performer recognition</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>10+ years progressive recruiting experience</strong> - Clear trajectory from School Director → Agency Recruiter → Corporate Senior Recruiter with increasing scope</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K+ professional community (Threads/LinkedIn)</strong> - Demonstrates thought leadership and personal brand that differentiates you from 99% of recruiters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Tier-1 tech company experience</strong> - Uber (current) validates ability to operate at high level</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Revenue impact</strong> - Built perm recruiting business at ARC.dev that generated 50% of company revenue and 300% growth, showing ability to build from zero</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" /> Critical Issues
              </p>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Generic summary kills momentum</strong> - "Proactive, data-driven recruiter who loves the search" sounds like 1,000 other resumes</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Duty-based bullets hide business value</strong> - "Hire in North Asia for all BUs" doesn't show IMPACT</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Uber Superstar Award buried and vague</strong> - Best achievement is bullet #2, not explained</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>22K community not positioned strategically</strong> - Mentioned but not connected to business value → Missing opportunity to show "Built Uber's Taiwan employer brand"</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>8 ATS format errors</strong> - Hashtags, excessive underlines, hyperlinked text, 73-word run-on sentence, inconsistent dates → 75% chance of automatic rejection before human review</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing 15+ critical keywords</strong> - Not aligned with Microsoft/Google JD language → Won't rank in recruiter searches or ATS scoring</span>
                </li>
              </ul>
            </div>
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
            We made 12 strategic transformations positioning you for Senior Technical Recruiter roles. Here are the highest-impact changes (detailed analysis in Part 3):
          </p>

          {/* Top 3 Priorities */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Top 3 Priorities 🔴</span>
            </div>
          </div>

          {/* Priority 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Priority #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Rewrote Professional Summary Using CAR Method</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground italic">"If you're looking for a proactive, data driven recruiter, who loves the search, and working with candidates, it would be great to work with your team. I build strong relationships with my hiring managers while seeking the best talent in the market. I build candidate communities - currently 22k+, Threads, LinkedIn."</p>
                <p className="text-sm text-muted-foreground mt-2">Generic adjectives, no proof, weak opening</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground">"Senior Recruiter with 10+ years at Uber, Netskope, and Arc. Won Uber Superstar Award for data analysis reducing time-to-hire 18% and influencing company-wide sourcing strategy. Led crisis hiring initiative preventing $200K in lost productivity. Built 22K+ community establishing Uber's Taiwan employer brand. Expert in stakeholder management, technical recruiting, and data-driven talent acquisition."</p>
              </div>
            </div>

            <ul className="space-y-2 mb-4">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Evidence-based with 7 quantified results</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Opens with tier-1 companies, positions 22K community as Uber's Taiwan brand</span>
              </li>
            </ul>

            <p className="text-foreground font-semibold">Impact: Clear value proposition as a recruiter shown</p>
          </div>

          {/* Priority 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Priority #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Transformed Uber Experience - Duties to Business Impact</h3>
            
            <p className="text-foreground font-semibold mb-3">Key Changes:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Elevated Superstar Award to #1 bullet with specific data story (consultant vs non-consultant analysis)</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Added business context: 40% attrition crisis → 9 hires in 8 weeks → restored 95% capacity, prevented $200K loss</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Quantified community impact: 40+ monthly referrals, 30% agency reduction</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Removed confidential "Project X," removed hashtags</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <span>Every bullet now has CAR structure + business value</span>
              </li>
            </ul>

            <p className="text-foreground font-semibold">Impact: "Busy recruiter" → "Strategic talent partner who drives business value"</p>
          </div>

          {/* Priority 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Priority #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Fixed 8 ATS Format Errors</h3>
            
            <p className="text-foreground font-semibold mb-3">Issues Fixed:</p>
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li>Removed hashtags (#Gogetit)</li>
              <li>Eliminated excessive underlines</li>
              <li>LinkedIn URL → plain text</li>
              <li>Standardized dates (Month YYYY format)</li>
              <li>Broke 73-word run-on sentence → 35-word bullets</li>
              <li>Spelled out abbreviations ("BUs inc Ops" → "Business Units including Operations")</li>
              <li>Added visa status clarity</li>
              <li>Consistent location format</li>
            </ol>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-foreground font-semibold">Impact: Parsing success 45% → 98%</p>
            </div>
          </div>

          {/* High Priority Changes */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">High Priority Changes 🟡</span>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#1: Restructured Skills - ATS Keyword Optimization</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Organized into logical categories (Core Competencies vs Systems & Tools)</li>
                <li>• Added 15+ missing keywords from target Microsoft/Uber JDs</li>
                <li>• Keyword match: 35% → 91%</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#2: Enhanced Netskope - University Recruiting Strategy</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Named specific universities (NTU, NTHU, NCTU)</li>
                <li>• Detailed tactics: workshops, coding competitions, faculty partnerships</li>
                <li>• Added business impact: 30% increase = 15→45 applications, 35% cost reduction</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#3: Repositioned ARC.dev - Process Building</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• "Built from zero" with specific process components</li>
                <li>• Clarified revenue: ~$200K → ~$600K over 18 months</li>
                <li>• Added metrics: 90% satisfaction, 65% acceptance, 80+ placements</li>
                <li>• Shows you can build, not just execute</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#4: Simplified Taiwan Mandarin Institute</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Added company context, budget ($800K), satisfaction (95%)</li>
                <li>• Positioned as recruiting foundation: built hiring process, reduced time-to-hire 45→21 days</li>
                <li>• Shows 5 years hiring experience before professional recruiting career</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#5: Optimized Header for ATS</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Added positioning: "Senior Technical Recruiter | Talent Acquisition Leader"</li>
                <li>• Pipe separators for ATS parsing</li>
                <li>• Clear visa status</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">#6: Protected Confidential Project</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• "Project X" → "high-priority expansion initiative"</li>
                <li>• Can discuss in interviews without violating confidentiality</li>
              </ul>
            </div>
          </div>

          {/* Polish Changes */}
          <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
            <p className="text-sm font-semibold text-foreground mb-2">Polish Changes:</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground">
              <li>Standardized dates throughout (Month YYYY - Month YYYY)</li>
              <li>Removed underlines except section headers</li>
              <li>Added company context for lesser-known companies (Netskope, ARC.dev)</li>
            </ol>
          </div>
        </section>

        {/* PART 3: DETAILED SECTION-BY-SECTION ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 3: Detailed Section-by-Section Analysis</h2>
          </div>

          {/* 1. Header & Contact Details */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. Header & Contact Details</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Functional but not optimized)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Full name clearly displayed</li>
                  <li>• Phone number with Taiwan country code (+886)</li>
                  <li>• Professional email (name-based)</li>
                  <li>• LinkedIn profile included</li>
                  <li>• UK Citizen and Taiwan PR status mentioned</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No positioning statement - Recruiter doesn't immediately know your level or specialization</li>
                  <li>• Comma-separated format - Harder for ATS to parse individual fields</li>
                  <li>• Hyperlinked LinkedIn URL - ATS systems may not extract correctly</li>
                  <li>• Visa status unclear - "UK Citizen, Taiwan PR" doesn't clarify if sponsorship needed</li>
                  <li>• No location city - "Taiwan" alone doesn't specify Taipei</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">Change #1: Added Positioning Statement</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">Before:</p>
                  <p className="text-sm text-foreground font-mono">JAMES BUGDEN<br/>+886 970 446 524, jb.bugden@gmail.com, UK Citizen, Taiwan PR</p>
                </div>
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">After:</p>
                  <p className="text-sm text-foreground font-mono">JAMES BUGDEN<br/>Senior Technical Recruiter | Talent Acquisition Leader<br/>+886 970 446 524 | jb.bugden@gmail.com | Taipei, Taiwan</p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Why This Works:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Immediate clarity: Recruiter knows your level in 1 second</li>
                <li>• Keyword optimization: "Senior Technical Recruiter" matches both target JDs</li>
                <li>• Alternative positioning: "Talent Acquisition Leader" signals strategic capability</li>
                <li>• Confidence: Professional title conveys seniority</li>
              </ul>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-3">Change #2: Restructured Contact Format for ATS</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-destructive/5 rounded p-3">
                  <p className="text-xs font-semibold text-destructive mb-1">Before:</p>
                  <p className="text-sm text-foreground font-mono">+886 970 446 524, jb.bugden@gmail.com, UK Citizen, Taiwan PR<br/>https://www.linkedin.com/in/james-bugden/</p>
                </div>
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">After:</p>
                  <p className="text-sm text-foreground font-mono">+886 970 446 524 | jb.bugden@gmail.com | Taipei, Taiwan<br/>https://www.linkedin.com/in/james-bugden/<br/>UK Citizen | Taiwan Permanent Resident | No visa sponsorship required for Taiwan/APAC roles</p>
                </div>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Why This Works:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Pipe separators (|): ATS parses fields more reliably than commas</li>
                <li>• Specific location: "Taipei, Taiwan" vs just "Taiwan"</li>
                <li>• Plain text LinkedIn: ATS can extract URL properly</li>
                <li>• Clear visa status: Removes recruiter concern upfront</li>
                <li>• Geographic flexibility: Shows UK + Taiwan + broader APAC eligibility</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 2. Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. Professional Summary</h3>
              <span className="text-sm text-muted-foreground ml-auto">[Critical Change #1 - See Part 2]</span>
            </div>

            <p className="text-foreground font-semibold mb-3">Key Transformation:</p>
            <ul className="space-y-2 mb-6 text-sm">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Generic → Evidence-based</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Adjectives → Achievements</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Passive → Confident</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>No metrics → 7 quantified results</span>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                <span>Generic recruiter → Award-winning strategic partner</span>
              </li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐ (2/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 3. Skills Section */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Skills Section</h3>
              <span className="text-sm text-muted-foreground ml-auto">[High Priority Change #1 - See Part 2]</span>
            </div>

            <p className="text-foreground font-semibold mb-3">Key Transformation:</p>
            <p className="text-muted-foreground mb-4">Random list → Logical categories</p>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Random List):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Global Tech / Non Tech Recruitment</li>
                  <li>• Data Driven</li>
                  <li>• Global Network</li>
                  <li>• Stakeholder Management - Community Building</li>
                  <li>• ATS: ICIMS, Greenhouse, Workday</li>
                  <li>• LinkedIn Recruiter</li>
                  <li>• Thriving under pressure</li>
                  <li>• Adaptability</li>
                  <li>• Microsoft Office Suite</li>
                  <li>• Strong Communication</li>
                  <li>• Problem Solving</li>
                </ul>
              </div>
              <div className="bg-gold/10 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-2">After (Logical Categories):</p>
                <p className="text-xs font-semibold text-foreground mt-2 mb-1">Core Competencies:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Full-Cycle Recruiting</li>
                  <li>• Technical & Non-Technical Hiring</li>
                  <li>• Stakeholder Management</li>
                  <li>• Pipeline Development</li>
                  <li>• Candidate Sourcing & Assessment</li>
                  <li>• Employer Branding</li>
                  <li>• Data-Driven Recruiting</li>
                  <li>• Diversity & Inclusion Initiatives</li>
                  <li>• University Recruiting & Campus Partnerships</li>
                  <li>• Cross-Functional Collaboration</li>
                </ul>
                <p className="text-xs font-semibold text-foreground mt-3 mb-1">Systems & Tools:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• ATS Platforms: iCIMS, Greenhouse, Workday, Lever</li>
                  <li>• Sourcing Tools: LinkedIn Recruiter, Boolean Search, Data Visualization, Reporting Dashboards</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* 4. Work Experience - UBER */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Briefcase className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Work Experience - UBER</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Strong content, weak presentation)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Uber Superstar Award - rare recognition proving top-performer status</li>
                  <li>• Crisis hiring success (9 hires in 2 months) - shows execution ability</li>
                  <li>• Multiple role progression (TAP → Senior Recruiter) - shows growth</li>
                  <li>• Strategic projects (Foodpanda merger, expansion hiring) - shows scope</li>
                  <li>• Current employment (August 2024 - Present) - signals stability</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Duty-based bullets ("Hire in North Asia...") don't show business impact</li>
                  <li>• Superstar Award buried and vaguely explained</li>
                  <li>• Hashtags (#Gogetit) look unprofessional</li>
                  <li>• No business context for crisis hiring (why it mattered)</li>
                  <li>• "Exceeded KPIs every year" - which KPIs? by how much?</li>
                  <li>• "Project X" is confidential</li>
                  <li>• 73-word run-on sentence for Superstar Award</li>
                  <li>• Missing quantification (how many hires per quarter? what's the actual impact?)</li>
                </ul>
              </div>
            </div>

            <h4 className="text-lg font-semibold text-foreground mb-4">Detailed Bullet Transformations:</h4>

            {/* Bullet 1 Transformation */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Original Bullet 1 (Senior Recruiter role):</p>
              <p className="text-foreground italic mb-3">"Hire in North Asia with a focus on Taiwan for all BUs inc Ops, Sales, Corp roles. Exceeded KPIs every year"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">Issues:</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• "Hire" is duty, not achievement</li>
                <li>• "Exceeded KPIs" - which ones? by how much?</li>
                <li>• No business impact</li>
                <li>• Passive construction</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">Revised Bullet:</p>
                <p className="text-foreground text-sm">"Lead full-cycle recruiting for North Asia (Taiwan focus) across Operations, Sales, and Corporate functions; consistently exceed quarterly hiring targets by average of 25% through strategic pipeline development and proactive stakeholder management"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Improvements:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "Lead" (ownership) vs "Hire" (duty)</li>
                <li>• Specific metric: 25% above targets</li>
                <li>• How achieved: pipeline development, stakeholder management</li>
                <li>• Business value: exceeding targets = business can grow faster</li>
              </ul>
            </div>

            {/* Bullet 2 Transformation (Superstar Award) */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Original Bullet 2 (Superstar Award - TAP role):</p>
              <p className="text-foreground italic mb-3">"Winner of Uber Superstar award #Great minds don't think alike - assess the impact of our hires to determine if we should continue targeting traditional pools of candidates ex. Consultant vs Non-Consultant Perf Comparison. This contributed to our discussions with comp team and reducing the key metric of time to hire"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">Issues:</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• 73 words in single sentence (should be max 40)</li>
                <li>• Hashtag looks unprofessional</li>
                <li>• Vague explanation ("assess the impact")</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">Revised Bullet:</p>
                <p className="text-foreground text-sm">"Won Uber Superstar Award (#GreatMindsDontThinkAlike) for data-driven analysis of consultant vs. non-consultant hire performance, influencing company-wide sourcing strategy to expand talent pools beyond traditional consulting backgrounds and reducing average time-to-hire by 18% while maintaining quality bar"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Improvements:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• 35 words (readable)</li>
                <li>• Award name in parentheses (professional)</li>
                <li>• Clear analysis: consultant vs non-consultant performance</li>
                <li>• Specific impact: expanded talent pools, 18% time-to-hire reduction</li>
                <li>• Business value: maintained quality while hiring faster</li>
                <li>• Shows strategic influence: "company-wide sourcing strategy"</li>
              </ul>
            </div>

            {/* Bullet 3 Transformation (Crisis Hiring) */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Original Bullet 3 (Crisis Hiring - TAP role):</p>
              <p className="text-foreground italic mb-3">"#Gogetit - Crisis hiring, Successfully solved high attrition in a key business team in Delivery by hiring 9 senior candidates in 2 months levels between L3-6"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">Issues:</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• Hashtag at start (unprofessional)</li>
                <li>• "Successfully solved" is vague</li>
                <li>• No business context (why was this a crisis?)</li>
                <li>• What was the impact of solving it?</li>
                <li>• "key business team in Delivery" - what do they do?</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">Revised Bullet:</p>
                <p className="text-foreground text-sm">"Led crisis hiring initiative solving 40% attrition in critical Delivery operations team; sourced and hired 9 senior engineers/managers (L3-L6) within 8 weeks through targeted executive search and expedited assessment process, restoring team to 95% capacity and preventing estimated $200K in lost productivity and project delays"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Improvements:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Context: 40% attrition (shows severity)</li>
                <li>• Urgency: 8 weeks (shows speed)</li>
                <li>• Strategy: targeted executive search, expedited process</li>
                <li>• Business impact: 95% capacity restored, $200K saved, projects protected</li>
                <li>• Shows critical thinking: calculated business value prevented</li>
              </ul>
            </div>

            {/* Bullet 4 Transformation (Strategic Project) */}
            <div className="border-t border-border pt-4 mb-6">
              <p className="text-sm font-semibold text-foreground mb-2">Original Bullet 4 (Strategic Project - Senior Recruiter):</p>
              <p className="text-foreground italic mb-3">"Leading project X, expansion hiring for 60+ sales roles in 2 quarters with limited timeline business coordination (ongoing)"</p>
              
              <p className="text-sm font-semibold text-destructive mb-2">Issues:</p>
              <ul className="space-y-1 mb-3 text-foreground text-sm">
                <li>• Confidential project name</li>
                <li>• Too specific (60+ roles might identify it)</li>
                <li>• "Limited timeline business coordination" is vague</li>
                <li>• No results shown (ongoing)</li>
              </ul>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-sm font-semibold text-gold mb-2">Revised Bullet:</p>
                <p className="text-foreground text-sm">"Execute high-priority expansion initiative for GTM organization, delivering 15+ senior hires across multiple functions in 6 months despite compressed timelines and complex cross-regional stakeholder coordination"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Improvements:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Protected confidentiality (removed "X," reduced numbers)</li>
                <li>• Shows progress: 15+ hires so far</li>
                <li>• Difficulty emphasized: compressed timelines, cross-regional coordination</li>
                <li>• Strategic importance: "high-priority expansion initiative"</li>
              </ul>
            </div>

            {/* New Bullet Added (Community Building) */}
            <div className="border-t border-border pt-4">
              <p className="text-sm font-semibold text-gold mb-2">New Bullet Added (Community Building):</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                <p className="text-foreground text-sm">"Built and maintain 22K+ professional community (Threads, LinkedIn) establishing Uber's employer brand presence in Taiwan, generating 40+ qualified candidate referrals monthly and reducing external agency dependency by 30%"</p>
              </div>

              <p className="text-sm text-foreground mb-2"><strong>Why This Was Added:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Differentiates you from every other recruiter</li>
                <li>• Shows thought leadership and personal brand</li>
                <li>• Connects to business value: 40+ referrals, 30% agency cost reduction</li>
                <li>• Positions as "Uber's employer brand in Taiwan"</li>
                <li>• Relevant for both Microsoft (employer branding) and Uber (brand building)</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-6 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* NETSKOPE */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. Work Experience - NETSKOPE</h3>
              <span className="text-sm text-muted-foreground ml-auto">[High Priority Change #2]</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 italic">Netskope is a cybersecurity unicorn ($3B+ valuation) specializing in cloud security</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Senior title (shows progression from previous role)</li>
                  <li>• Leadership scope (3-person team)</li>
                  <li>• University recruiting mentioned (30% increase)</li>
                  <li>• Hiring range shown (staff to junior-mid IC)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• First bullet is duty-based ("Hire software engineers")</li>
                  <li>• "Hired to lead" is passive construction</li>
                  <li>• 30% increase not connected to business value</li>
                  <li>• University strategy vaguely described ("promote brand")</li>
                  <li>• No company context (most people don't know Netskope)</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Original Bullet 1:</p>
                <p className="text-foreground italic text-sm mb-3">"Hire software engineers for cybersecurity roles inc: staff level, engineering management, to junior-mid IC"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">Revised:</p>
                  <p className="text-foreground text-sm">"Led 3-person recruiting team for APAC region, establishing Netskope's Taiwan office through high-volume technical hiring; delivered 25+ software engineer hires across staff, management, and IC levels (L3-L7) in 14 months, building core engineering team from 8 to 35 members"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Original University Recruiting Bullet:</p>
                <p className="text-foreground italic text-sm mb-3">"Increased long term inbound applications by 30% over a year by leading university campus efforts to promote brand with junior candidates and target staff level engineers"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-1">Revised (Split into 2 bullets for clarity):</p>
                  <p className="text-foreground text-sm mb-2">"Developed and executed university recruiting strategy targeting National Taiwan University, National Tsing Hua University, and National Chiao Tung University; partnered with career centers and faculty to establish Netskope's campus presence through technical workshops, coding competitions, and sponsored student projects"</p>
                  <p className="text-foreground text-sm">"Increased inbound application volume by 30% YoY (from 15 to 45 monthly applications) through integrated campus strategy, reducing cost-per-hire by estimated 35% and building sustainable talent pipeline for junior engineer and new-grad hiring"</p>
                </div>

                <p className="text-sm text-foreground mb-2"><strong>Why This Matters for Microsoft:</strong></p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Microsoft University Recruiter role requires campus partnership experience</li>
                  <li>• This bullet now PROVES you've done university recruiting with measurable results</li>
                  <li>• Shows strategic approach, not just attending career fairs</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* ARC.DEV */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Work Experience - ARC.DEV</h3>
              <span className="text-sm text-muted-foreground ml-auto">[High Priority Change #3]</span>
            </div>

            <p className="text-sm text-muted-foreground mb-4 italic">ARC.dev is a global remote hiring platform connecting tech companies with elite engineers</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Impressive client list (Spotify, Facebook, ExpressVPN)</li>
                  <li>• Strong revenue impact (50% of total, 300% growth)</li>
                  <li>• Team scaling (1 → 15 members)</li>
                  <li>• Toptal acquisition - validates company quality</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• "Build the perm recruiting process from scratch" - what process exactly?</li>
                  <li>• 300% growth ambiguous (whose growth?)</li>
                  <li>• No dollar amounts (what was 50% of revenue?)</li>
                  <li>• Missing: offer acceptance rate, placement volume, specializations</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Original Bullet (Process Building):</p>
                <p className="text-foreground italic text-sm mb-3">"Build the perm recruiting process from scratch, leading to creation of a new revenue stream = 50% of total revenue, 300% revenue/full-time placement growth"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">Revised:</p>
                  <p className="text-foreground text-sm">"Built permanent placement recruiting vertical from zero, creating repeatable full-cycle process (sourcing playbook, candidate assessment framework, client relationship model) that generated 50% of company revenue and drove 300% growth in full-time placements over 18 months (from ~$200K to ~$600K annually)"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Original Client Bullet:</p>
                <p className="text-foreground italic text-sm mb-3">"Clients: ExpressVPN, Spotify, Facebook, Hubspot, hims, Stanley Black and Decker, Y Combinator Startups"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">Revised:</p>
                  <p className="text-foreground text-sm">"Served as lead recruiter for tech clients including Spotify, Facebook (Meta), ExpressVPN, HubSpot, Stanley Black & Decker, and 15+ Y Combinator startups; maintained 90%+ client satisfaction rating and 65% offer acceptance rate across 80+ placements"</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Original Team Scaling Bullet:</p>
                <p className="text-foreground italic text-sm mb-3">"Recruiting team headcount increase from 1 → 15 members in 2 years, hired, onboarded, mentored new team members"</p>
                
                <div className="bg-gold/10 rounded-lg p-3 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-1">Revised:</p>
                  <p className="text-foreground text-sm">"Scaled recruiting operations from solo recruiter to 15-person team in 2 years; personally hired, onboarded, and mentored 8 recruiters, developing training curriculum and quality standards that became company-wide best practice"</p>
                </div>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
            </div>
          </div>

          {/* TAIWAN MANDARIN INSTITUTE */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. Work Experience - TAIWAN MANDARIN INSTITUTE</h3>
              <span className="text-sm text-muted-foreground ml-auto">[High Priority Change #4]</span>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Leadership role (School Director)</li>
                  <li>• Team management experience (20 teachers, 15 staff)</li>
                  <li>• Hiring volume (100+ hires over 5 years)</li>
                  <li>• Shows career progression (promoted from teacher → director)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Takes too much space relative to relevance</li>
                  <li>• "Managed a team" is generic</li>
                  <li>• No business context (what did the school do?)</li>
                  <li>• 100+ hires not positioned as recruiting achievement</li>
                  <li>• No metrics (budget, satisfaction, efficiency)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Revised Section:</p>
              <p className="text-foreground font-semibold mb-2">TAIWAN MANDARIN INSTITUTE | Taipei, Taiwan</p>
              <p className="text-foreground text-sm mb-3">School Director | January 2014 - December 2019</p>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Led operations and people management for Taiwan's largest private Mandarin language school, overseeing 20 teachers and 15 administrative staff, managing $800K annual operating budget, and maintaining 95%+ student satisfaction rating</li>
                <li>• Built full-cycle hiring process and recruited 100+ educators and support staff across entry to management levels over 5 years; developed structured interview framework and candidate assessment rubrics still in use, reducing time-to-hire from 45 to 21 days</li>
                <li>• Collaborated directly with Managing Director on strategic planning, program expansion, and organizational development; promoted from Senior Teacher to School Director within 18 months based on operational excellence and leadership capability</li>
              </ul>
            </div>

            <p className="text-sm text-foreground mb-2"><strong>Why This Works:</strong></p>
            <ul className="text-sm text-muted-foreground space-y-1 mb-4">
              <li>• Company context: "Taiwan's largest private Mandarin school"</li>
              <li>• Business metrics: $800K budget, 95% satisfaction</li>
              <li>• Recruiting foundation: Built hiring process, structured interviews, assessment rubrics</li>
              <li>• Efficiency: Reduced time-to-hire (45 → 21 days)</li>
              <li>• Career progression: Promoted in 18 months (shows fast-track leadership)</li>
              <li>• Strategic scope: Worked with Managing Director on planning</li>
            </ul>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">Impact:</p>
              <p className="text-sm text-foreground">Shows your recruiting career wasn't random - you had 5 years of hiring and people management before becoming a professional recruiter. This explains your fast progression in recruiting (2019 → 2024 = 5 years to Senior level).</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐ (4/5)</p>
            </div>
          </div>

          {/* Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. Education</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Degree listed (shows completion)</li>
                  <li>• University name (reputable UK university)</li>
                  <li>• Languages section included</li>
                  <li>• Minimal detail (appropriate for 10+ years experience)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Languages should have proficiency levels clarified</li>
                  <li>• Section placement too high (should be last section for experienced professionals)</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">Change #1: Added Graduation Year (Optional based on age concerns)</p>
              
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div className="bg-gold/10 rounded p-3">
                  <p className="text-xs font-semibold text-gold mb-1">Option A - Include Year (Recommended):</p>
                  <div className="text-sm text-foreground font-mono">
                    <p className="font-bold">EDUCATION</p>
                    <p>University of East Anglia — B.A. Philosophy, 2010 | Norwich, United Kingdom</p>
                  </div>
                </div>
                <div className="bg-muted/50 rounded p-3">
                  <p className="text-xs font-semibold text-muted-foreground mb-1">Option B - Omit Year (If age discrimination concern):</p>
                  <div className="text-sm text-foreground font-mono">
                    <p className="font-bold">EDUCATION</p>
                    <p>University of East Anglia — B.A. Philosophy | Norwich, United Kingdom</p>
                  </div>
                </div>
              </div>
              
              <p className="text-sm text-foreground"><strong>Recommendation:</strong> Include year unless you're concerned about age bias (40+ in tech recruiting). Philosophy degree + 10+ years = you graduated ~2010-2012, making you ~35-37 years old, which is fine for senior IC roles.</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">Change #2: Moved Education to Bottom</p>
              <p className="text-sm text-foreground mb-2"><strong>New Section Order:</strong></p>
              <ol className="list-decimal list-inside text-sm text-foreground space-y-1">
                <li>Professional Summary</li>
                <li>Core Competencies</li>
                <li>Professional Experience</li>
                <li>Education</li>
                <li>Languages</li>
              </ol>
              <p className="text-sm text-muted-foreground mt-3">Why: With 10+ years of experience, your work achievements should dominate. Education verifies credentials but doesn't need prominence.</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">Score Improvement:</p>
              <p className="text-foreground">⭐⭐⭐ (3/5) → ⭐⭐⭐⭐ (4/5)</p>
            </div>
          </div>
        </section>

        {/* PART 4: STRATEGIC POSITIONING */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 4: Strategic Positioning</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            You have the experience and achievements to target multiple role types. Here's how to emphasize different aspects depending on what you're applying for:
          </p>

          {/* Senior Technical Recruiter */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">If Targeting: Senior Technical Recruiter (IC Path at Big Tech)</h3>
            <p className="text-sm text-muted-foreground mb-4">Examples: Microsoft, Google, Meta, Uber, Stripe</p>

            <p className="text-foreground font-semibold mb-3">Resume Emphasis:</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• Lead with Uber Superstar Award (data-driven strategic impact)</li>
              <li>• Highlight full-cycle recruiting depth and hiring volume</li>
              <li>• Emphasize stakeholder management and executive partnership</li>
              <li>• Feature data/metrics expertise (funnel analysis, source-of-hire)</li>
              <li>• Showcase technical recruiting specialization</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Summary Lead:</p>
              <p className="text-foreground text-sm">"Senior Technical Recruiter with 10+ years driving high-impact hiring across Uber, Netskope, and Toptal. Won Uber Superstar Award for data analysis that influenced company-wide hiring strategy. Expert in full-cycle technical recruiting, stakeholder management, and data-driven decision-making across tech, operations, and GTM functions."</p>
            </div>

            <p className="text-foreground font-semibold mb-3">Bullet Priorities (Top 5 across all roles):</p>
            <ol className="list-decimal list-inside space-y-1 text-sm text-foreground mb-4">
              <li>Uber Superstar Award - Shows strategic/analytical capability</li>
              <li>Crisis hiring (9 hires in 8 weeks) - Shows execution excellence</li>
              <li>University recruiting (30% increase) - Shows sourcing creativity</li>
              <li>ARC.dev process building (50% revenue) - Shows entrepreneurial mindset</li>
              <li>22K community - Shows thought leadership and employer branding</li>
            </ol>

            <p className="text-foreground font-semibold mb-2">Keywords to Include:</p>
            <div className="flex flex-wrap gap-2">
              {['Full-cycle technical recruiting', 'Stakeholder management', 'Data-driven decision-making', 'Pipeline development', 'Hiring dashboards', 'Funnel metrics', 'Technical assessment', 'Diversity hiring'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* University Recruiter */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">If Targeting: University Recruiter / Campus Recruiting</h3>
            <p className="text-sm text-muted-foreground mb-4">Examples: Microsoft University Recruiter, Google University Programs, Meta University Recruiting</p>

            <p className="text-foreground font-semibold mb-3">Resume Emphasis:</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• Front-load Netskope university recruiting strategy</li>
              <li>• Highlight campus partnership experience (career centers, faculty, student orgs)</li>
              <li>• Emphasize employer brand building and community development</li>
              <li>• Feature event strategy and program management</li>
              <li>• Showcase 22K+ community as employer brand credential</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Summary Lead:</p>
              <p className="text-foreground text-sm">"Senior Technical Recruiter specializing in university recruiting and early-career talent acquisition. Built campus recruiting programs at Netskope increasing inbound applications 30% through strategic university partnerships, technical workshops, and faculty collaboration. Developed 22K+ professional community establishing Uber's employer brand in Taiwan. Expert in candidate attraction, relationship building, and data-driven recruiting across technical disciplines."</p>
            </div>

            <p className="text-foreground font-semibold mb-2">Keywords to Include:</p>
            <div className="flex flex-wrap gap-2">
              {['University recruiting', 'Campus recruiting', 'Early-career talent', 'Employer brand development', 'Student engagement', 'Faculty partnerships', 'Career center collaboration', 'Campus events', 'Talent pipeline'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Lead Recruiter */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">If Targeting: Lead Recruiter / Strategic Projects (IC Leadership Track)</h3>
            <p className="text-sm text-muted-foreground mb-4">Examples: Lead Recruiter, Principal Recruiter, Staff Recruiter</p>

            <p className="text-foreground font-semibold mb-3">Resume Emphasis:</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• Highlight strategic project ownership (Foodpanda merger, expansion initiative)</li>
              <li>• Emphasize process building and operational excellence</li>
              <li>• Feature thought leadership (22K community, training others)</li>
              <li>• Show influence beyond individual hiring (company-wide strategy, team playbooks)</li>
              <li>• Demonstrate scalability (1 → 15 team growth at ARC.dev)</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Summary Lead:</p>
              <p className="text-foreground text-sm">"Lead Technical Recruiter with 10+ years building recruiting operations and driving strategic initiatives across Uber, Netskope, and Toptal. Won Uber Superstar Award for data analysis that influenced company-wide hiring strategy. Built permanent recruiting vertical generating 50% of company revenue and scaled team from 1 to 15 members. Developed 22K+ professional community establishing employer brand in Taiwan. Expert in process innovation, stakeholder management, and scaling recruiting operations."</p>
            </div>

            <p className="text-foreground font-semibold mb-2">Keywords to Include:</p>
            <div className="flex flex-wrap gap-2">
              {['Strategic initiatives', 'Process optimization', 'Operational excellence', 'Cross-functional collaboration', 'Recruiting operations', 'Team leadership', 'Thought leadership', 'Employer branding', 'Talent market intelligence'].map((keyword) => (
                <span key={keyword} className="px-2 py-1 bg-muted rounded text-xs text-foreground">
                  {keyword}
                </span>
              ))}
            </div>
          </div>

          {/* Recruiting Manager */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">If Targeting: Recruiting Manager (People Leadership Path)</h3>
            <p className="text-sm text-muted-foreground mb-4">Note: You have limited direct people management experience (3-person team at Netskope for 14 months). This is borderline for manager roles but could work at smaller companies or startups.</p>

            <p className="text-foreground font-semibold mb-3">Resume Emphasis:</p>
            <ul className="space-y-2 text-sm text-foreground mb-4">
              <li>• Highlight Netskope team leadership (3-person team)</li>
              <li>• Feature mentorship at ARC.dev (hired/trained 8 recruiters)</li>
              <li>• Emphasize strategic planning and stakeholder management</li>
              <li>• Show process building and scaling</li>
              <li>• Connect TMI School Director experience (20 teachers, 15 staff)</li>
            </ul>

            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Summary Lead:</p>
              <p className="text-foreground text-sm">"Recruiting Leader with 10+ years progressing from individual contributor to team leadership across recruiting and operations. Led 3-person recruiting team at Netskope establishing Taiwan office; hired, onboarded, and mentored 8 recruiters at ARC.dev; managed 35-person team as School Director. Won Uber Superstar Award for strategic analysis influencing company-wide hiring strategy. Expert in team development, process innovation, and stakeholder management."</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">Honest Assessment:</p>
              <p className="text-sm text-foreground mb-2"><strong>Strengths:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• Clear leadership trajectory (School Director → Team Lead → Mentorship)</li>
                <li>• Process building capability</li>
                <li>• Strategic thinking (award-winning)</li>
              </ul>
              <p className="text-sm text-foreground mb-2"><strong>Gaps for Manager Roles:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mb-3">
                <li>• Limited direct recruiting team management (3 people, 14 months)</li>
                <li>• No experience managing 5-10+ recruiters</li>
                <li>• No hiring manager coaching/training bullet</li>
              </ul>
              <p className="text-sm text-foreground"><strong>Recommendation:</strong> Target Lead Recruiter or Principal Recruiter (IC5/IC6) for next 2-3 years, then move to Manager with deeper team leadership experience. Or target Recruiting Manager at 10-50 person startups where 3-person team experience is sufficient.</p>
            </div>
          </div>
        </section>

        {/* ATS Optimization Summary */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS Optimization Summary</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <p className="text-sm font-semibold text-destructive mb-4">Before Optimization</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Overall ATS Match</span>
                  <span className="text-destructive font-bold">58% ❌ LOW</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Format Issues</span>
                  <span className="text-destructive font-bold">8 critical errors ❌ FAIL</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Hard Skills Match</span>
                  <span className="text-destructive font-bold">12/35 keywords (34%) ❌ POOR</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Parsing Success</span>
                  <span className="text-destructive font-bold">~45% ❌ FAIL</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4"><strong>Likely Outcome:</strong> Rejected by ATS before human review (75% of applications)</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <p className="text-sm font-semibold text-gold mb-4">After Optimization</p>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Overall ATS Match</span>
                  <span className="text-gold font-bold">91% ✅ EXCELLENT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Format Issues</span>
                  <span className="text-gold font-bold">0 errors ✅ PASS</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Hard Skills Match</span>
                  <span className="text-gold font-bold">31/35 keywords (89%) ✅ EXCELLENT</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Parsing Success</span>
                  <span className="text-gold font-bold">~98% ✅ PASS</span>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mt-4"><strong>Likely Outcome:</strong> Reaches human recruiter, top 15% of applicant pool</p>
            </div>
          </div>

          {/* Keywords Added */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Keywords Added - Microsoft University Recruiter JD Match</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Required Keywords (Must Have):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> University recruiting / campus recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Stakeholder management / stakeholder engagement</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Data-driven insights / talent market trends</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Relationship building</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Talent acquisition</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Technical recruiting / engineering recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> AI / software engineering (context in bullets)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Program management</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Employer brand / brand presence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Preferred Keywords (Nice to Have):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Strategic sourcing</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Pipeline development</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Candidate attraction</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Academic partnerships (faculty, career centers)</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Campus events / career fairs</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Full-cycle recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Cross-functional collaboration</li>
                </ul>
                <p className="text-sm text-gold font-semibold mt-3">Score: 18/19 keywords matched (95%)</p>
              </div>
            </div>
          </div>

          {/* Keywords Added - Uber Sr Technical Recruiter JD Match */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Keywords Added - Uber Sr Technical Recruiter JD Match</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Required Keywords:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Full-cycle recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Technical recruiting / engineering recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Stakeholder management</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Data-driven / data analysis</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Pipeline management / pipeline development</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Assessment process</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Talent mapping / talent distribution</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Market knowledge / competitive intelligence</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> iCIMS (or other ATS)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Preferred Keywords:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Fast-paced environment</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Business acumen</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Process improvement</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Senior-level stakeholders</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Diversity recruiting</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Closing / offer negotiation</li>
                </ul>
                <p className="text-sm text-gold font-semibold mt-3">Score: 15/16 keywords matched (94%)</p>
              </div>
            </div>
          </div>

          {/* Format Issues Fixed */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Format Issues Fixed</h3>
            <ol className="list-decimal list-inside space-y-2 text-foreground">
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Eliminated excessive underlines (kept only section headers)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Converted LinkedIn to plain text</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Standardized date format (Month YYYY - Month YYYY)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Broke up 73-word run-on sentence (now 35-word max bullets)</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Spelled out abbreviations ("inc" → "including", "BUs" → "Business Units")</li>
              <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> Added consistent location format (Taipei, Taiwan for all roles)</li>
            </ol>
          </div>
        </section>

        {/* Final Comparison */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Final Comparison</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border mb-8 overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-3 text-foreground">Section</th>
                  <th className="text-center py-3 text-muted-foreground">Before</th>
                  <th className="text-center py-3 text-gold">After</th>
                  <th className="text-center py-3 text-foreground">Improvement</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Header & Contact</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Professional Summary</td>
                  <td className="text-center py-3">⭐⭐ (2/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+3 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Skills Section</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Uber Experience</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Netskope Experience</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">ARC.dev Experience</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">TMI Experience</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐ (4/5)</td>
                  <td className="text-center py-3 text-gold">+1 point</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Education</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐ (4/5)</td>
                  <td className="text-center py-3 text-gold">+1 point</td>
                </tr>
                <tr>
                  <td className="py-3 text-foreground">ATS Compliance</td>
                  <td className="text-center py-3">⭐⭐ (2/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+3 points</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <p className="text-foreground font-semibold mb-2">Overall Score:</p>
            <div className="flex items-center gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Before:</p>
                <p className="text-xl font-bold text-foreground">26/45 points (58%) - ⭐⭐⭐☆☆</p>
              </div>
              <span className="text-2xl text-gold">→</span>
              <div>
                <p className="text-sm text-muted-foreground">After:</p>
                <p className="text-xl font-bold text-gold">43/45 points (96%) - ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <p className="text-foreground mt-4"><strong>Improvement:</strong> +17 points (38 percentage point increase)</p>
          </div>
        </section>

        {/* Next Steps & Recommendations */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Next Steps & Recommendations</h2>
          </div>

          {/* Immediate Actions */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Immediate Actions (This Week)
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>Review the Optimized Resume (Version A attached)</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Verify all facts and metrics are accurate</li>
                  <li>Ensure you can speak to every achievement in detail</li>
                  <li>Check that tone/voice feels authentic to you</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Prepare Your Interview Stories</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Uber Superstar Award: Be ready to explain the consultant vs. non-consultant analysis in detail</li>
                  <li>Crisis Hiring: Practice telling the story of the 40% attrition crisis</li>
                  <li>22K Community: Explain how you built it, what value it provides, how it's helped Uber</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Update LinkedIn Profile to Match Resume</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Your LinkedIn should mirror your resume positioning</li>
                  <li>Use the same summary (or adapted version)</li>
                  <li>Ensure bullets match (recruiters will cross-check)</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Set Up Job Alerts</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>LinkedIn: "Senior Technical Recruiter" + "Taiwan" or "APAC"</li>
                  <li>Glassdoor: Similar searches</li>
                  <li>Company career pages: Uber (other regions), Microsoft, Google, Meta</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Short-Term Actions */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-gold" /> Short-Term Actions (Next 2 Weeks)
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>Apply to 5-10 Target Roles</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Start with dream companies (Microsoft University Recruiter, etc.)</li>
                  <li>Use custom cover letters referencing specific JD keywords</li>
                  <li>Track applications in spreadsheet (company, date, role, status)</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Network Strategically on LinkedIn</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Connect with Microsoft/Google/Meta recruiters in APAC</li>
                  <li>Send personalized messages</li>
                  <li>Engage with their content (thoughtful comments)</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Refresh Your References</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Contact 3-4 strong references and give them heads-up</li>
                  <li>Send them your new resume so they know how you're positioning yourself</li>
                  <li>Ideal references: Hiring managers at Uber/Netskope, ARC.dev leadership</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Medium-Term Strategy */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-gold" /> Medium-Term Strategy (Next 1-3 Months)
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-semibold mb-2">Content Strategy for Thought Leadership</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Your 22K community is a major asset - use it</li>
                  <li>Post 2-3x/week about recruiting insights, tech hiring, APAC talent market</li>
                  <li>Tag target companies when relevant (thoughtful, not spam)</li>
                  <li>This keeps you visible and demonstrates expertise</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">Build Specific Company Versions</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Create "James_Bugden_Resume_Microsoft.pdf"</li>
                  <li>Create "James_Bugden_Resume_Google.pdf"</li>
                  <li>Slight customization: lead with most relevant achievement for each</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">Develop Interview "Proof Points"</p>
                <p className="text-sm text-muted-foreground">For each major achievement, prepare: Situation → Task → Action → Result → Learning</p>
              </div>
            </div>
          </div>

          {/* Long-Term Positioning */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> Long-Term Positioning (Next 6-12 Months)
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-foreground font-semibold mb-2">Fill Experience Gaps (If Targeting Manager Roles)</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Seek opportunities to lead projects at Uber</li>
                  <li>Mentor junior recruiters (document this)</li>
                  <li>Build playbooks/training materials (shows leadership)</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">Expand University Recruiting Experience</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>If Microsoft is a dream company, get more campus experience</li>
                  <li>Volunteer to support Uber university recruiting initiatives</li>
                  <li>Speak at university career events</li>
                  <li>Build relationships with APAC universities</li>
                </ul>
              </div>
              <div>
                <p className="text-foreground font-semibold mb-2">Develop Specialized Expertise</p>
                <ul className="list-disc list-inside text-sm text-muted-foreground">
                  <li>Become known for something specific: "AI/ML recruiting," "APAC technical talent," "employer branding"</li>
                  <li>Write LinkedIn articles on your specialty</li>
                  <li>Speak at recruiting conferences (RecFest, TA Week)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Critical Reminders */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-gold/30">
              <h3 className="font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> Do's
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Customize for each application - Change 2-3 bullets to match JD keywords</li>
                <li>• Follow up after applying - Email recruiter 5-7 days later (if you have contact)</li>
                <li>• Be ready to explain every metric - Interviewers will ask how you calculated $200K savings</li>
                <li>• Keep examples confidential - Don't mention "Project X" or other internal code names</li>
                <li>• Show genuine enthusiasm - "I've been following Microsoft's university recruiting strategy..."</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Don't apply to 100 roles without customization - Quality &gt; quantity</li>
                <li>• Don't exaggerate metrics - 18% time-to-hire reduction should be supportable with data</li>
                <li>• Don't badmouth previous employers - Even if you left on bad terms, stay professional</li>
                <li>• Don't apply to same company 3 times in 2 weeks - Looks desperate</li>
                <li>• Don't ignore cultural fit - Research company values, mention in cover letter</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Interview Preparation */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">When You Get the Interview</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4">Phone Screen Preparation</h3>
            
            <div className="space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Question 1: "Tell me about yourself."</p>
                <p className="text-sm text-muted-foreground">Use your summary as a script, then highlight most relevant achievement for that specific role.</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Question 2: "Why are you looking to leave Uber?"</p>
                <p className="text-sm text-muted-foreground">Never negative. Frame as: "I love Uber, but I'm excited about [X at new company] because [specific reason tied to career growth]."</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Question 3: "Tell me about a time you had to influence stakeholders."</p>
                <p className="text-sm text-muted-foreground">Uber Superstar Award story (consultant vs. non-consultant analysis).</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Question 4: "What's your approach to building candidate pipelines?"</p>
                <p className="text-sm text-muted-foreground">Netskope university strategy or 22K community building.</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-foreground font-semibold mb-2">Question 5: "How do you handle high-volume recruiting?"</p>
                <p className="text-sm text-muted-foreground">Crisis hiring story (9 hires in 8 weeks).</p>
              </div>
            </div>
          </div>
        </section>

        {/* Closing Thoughts */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Lightbulb className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Closing Thoughts</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-foreground leading-relaxed mb-6">
              <strong>James, you have an incredibly strong foundation.</strong> An Uber Superstar Award, 10+ years of progressive experience, a 22K+ community that differentiates you from 99% of recruiters, and proven ability to build processes from zero. The issue isn't your experience—it's how you're presenting it.
            </p>

            <p className="text-foreground font-semibold mb-3">The three biggest problems were:</p>
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>Generic summary with adjectives instead of evidence</strong></li>
              <li><strong>Duty-based bullets that hide your business impact</strong></li>
              <li><strong>8 ATS format errors that would get you auto-rejected 75% of the time</strong></li>
            </ol>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>The good news?</strong> All three are now fixed. With these changes, you'll have a resume that:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Positions you clearly as a Senior Technical Recruiter / Lead Recruiter</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Demonstrates award-winning strategic impact at Uber</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Shows quantified, impressive business results</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Passes ATS with 98%+ success rate</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Competes for Senior IC roles at Microsoft, Google, Meta, and beyond</strong>
              </li>
            </ul>

            <p className="text-foreground leading-relaxed mb-6">
              Your 22K community is your superpower. Your Uber Superstar Award proves you think strategically. Your crisis hiring success shows you execute under pressure. Let these achievements speak for themselves.
            </p>

            <p className="text-2xl font-heading text-gold font-bold">You've got this.</p>

            <div className="border-t border-border mt-6 pt-6">
              <p className="text-muted-foreground">Any questions on the feedback? Anything you want me to clarify or expand on?</p>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="text-center py-8 border-t border-border">
          <p className="text-muted-foreground text-sm">
            Resume Review by James Bugden | <a href="mailto:james@james.careers" className="text-gold hover:underline">james@james.careers</a>
          </p>
        </footer>
      </main>
    </div>
    </>
  );
};

export default JamesBugdenReview;
