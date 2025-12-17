import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen } from 'lucide-react';
import { Link } from 'react-router-dom';

const CharleneLeeReview = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
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
      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Resume Review</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Charlene Lee</h1>
          <p className="text-cream-70 text-lg">Professional Resume Analysis & Recommendations</p>
        </div>
      </section>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        
        {/* Executive Summary */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Executive Summary</h2>
          </div>

          {/* Overall Assessment Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Overall Assessment</p>
                <p className="text-3xl font-bold text-gold">GOOD</p>
              </div>
              <div className="flex items-center gap-2">
                <div className="flex gap-1">
                  {[1, 2, 3].map((i) => (
                    <Star key={i} className="w-6 h-6 fill-gold text-gold" />
                  ))}
                  <Star className="w-6 h-6 fill-gold/50 text-gold" />
                  <Star className="w-6 h-6 text-border" />
                </div>
                <span className="text-muted-foreground">(3.5/5)</span>
              </div>
            </div>
            
            <p className="text-foreground leading-relaxed mb-6">
              Charlene, your resume shows strong experience at a prestigious company (Microsoft) with impressive retention metrics (120%+, 100% renewals). However, the resume is currently positioned for Customer Success roles but trying to pivot to Operations/Supply roles (likely Uber/ride-sharing based on your framing). The heavy use of analogies ("directly applicable to driver acquisition") actually weakens your positioning—you're telling recruiters how to interpret your experience rather than letting your achievements speak for themselves.
            </p>
            
            <p className="text-foreground font-semibold">
              With focused repositioning and content refinement, this resume can be highly competitive for Operations Manager or Supply Growth roles.
            </p>
          </div>

          {/* Target Readiness */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">Target Readiness</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[65%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">65%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Current: Will get interviews for Customer Success Manager or Account Manager roles at tech companies. Not optimally positioned for Operations/Supply Growth roles.
              </p>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">After Implementing Fixes</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-primary rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-primary">85%</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Competitive for: Operations Manager (tech), Supply Growth Manager (Uber, Grab, Deliveroo), Business Operations Manager, Strategic Partnerships Manager.
              </p>
            </div>
          </div>

          {/* Remaining Gap */}
          <div className="bg-gold/10 rounded-xl p-6 border border-gold/20">
            <p className="text-gold font-semibold mb-3">Remaining 15% gap:</p>
            <ul className="space-y-2 text-foreground">
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                Tailoring keywords for each specific role (Ops vs Supply vs Partnerships)
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                Potentially reordering experience to lead with operational achievements
              </li>
              <li className="flex items-start gap-2">
                <span className="text-gold mt-1">•</span>
                Adding 1-2 operational certifications if targeting pure ops roles (Six Sigma, PMP)
              </li>
            </ul>
          </div>
        </section>

        {/* Top 3 Strengths */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Top 3 Strengths</h2>
          </div>

          <div className="space-y-6">
            {/* Strength 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold text-foreground">Quantified, Impressive Results</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">120%+ retention and growth across portfolio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">100% client renewals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">20% reduction in reporting time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">These metrics immediately show you drive business impact and are results-oriented</span>
                </li>
              </ul>
            </div>

            {/* Strength 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold text-foreground">Blue-Chip Brand Credibility</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">20 years at Microsoft (2005-2025) demonstrates loyalty, progression, and ability to work in complex enterprise environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Microsoft name instantly builds trust with recruiters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Certification stack (Azure, M365, AI, Security) shows continuous learning</span>
                </li>
              </ul>
            </div>

            {/* Strength 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-xl font-semibold text-foreground">Clear Cross-Functional Leadership</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Orchestrated Engineering, Delivery, Support teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Partnered with C-level executives</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Coordinated across sales, services, support organizations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Shows you can influence without authority and manage complex stakeholders</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Top 3 Priorities */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Top 3 Priorities 🎯</h2>
          </div>

          {/* Priority 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">High Impact</span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>Est. Time: 30 minutes</span>
              </div>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Priority 1: Remove ALL Analogies and Parenthetical Explanations</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Your summary and bullets are filled with phrases like "(directly applicable to platform earner/driver acquisition)" and "(analogous to driver loyalty)". This creates three major problems:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li>Weakens your credibility - Sounds like you're trying to convince recruiters your experience is relevant</li>
              <li>Takes up valuable space - Uses 15-20% of your resume real estate on meta-commentary</li>
            </ol>

            <p className="text-foreground font-semibold mb-4">The Fix: Simply describe what you actually DID and the results you achieved. Let recruiters draw their own connections.</p>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">❌ Current (Weak):</p>
                <p className="text-foreground italic">"Achieved 100% client renewals while surpassing 120% retention and growth across a high-value portfolio, proving capability in building scalable, long-term engagement strategies (analogous to driver loyalty)."</p>
              </div>
              
              <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                <p className="text-sm font-semibold text-primary mb-2">✅ Better (Strong):</p>
                <p className="text-foreground italic">"Achieved 100% client renewals while surpassing 120% retention and growth across high-value portfolio of 25+ enterprise accounts worth $15M+ ARR."</p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">See the difference? The second version is stronger, more specific, and doesn't apologize for itself.</p>
          </div>

          {/* Priority 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">High Impact</span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>Est. Time: 45 minutes</span>
              </div>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Priority 2: Rewrite Your Professional Summary to Be Role-Focused, Not Pivot-Focused</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Your current summary reads like a cover letter explaining why you're qualified for a different role. It's 6 lines of dense text trying to connect your experience to something else. Recruiters will skim this and miss your actual value.
            </p>

            <p className="text-foreground font-semibold mb-3">What's wrong with the current version:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                Too long (6 lines when 4 is maximum)
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                Defensive tone ("directly applicable to")
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                Unclear what role you're actually targeting
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                Buries your strongest achievements
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                Generic phrases ("operational excellence," "cross-functional teams")
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">Action: Rewrite to 3-4 tight lines that state:</p>
            <ol className="list-decimal list-inside space-y-1 mb-6 text-foreground">
              <li>Who you are (title/function)</li>
              <li>Years of experience + company brand</li>
              <li>Top 2-3 quantified achievements</li>
              <li>Core expertise/specialization</li>
            </ol>

            <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary mb-4">
              <p className="text-sm font-semibold text-primary mb-2">✅ RECOMMENDED REWRITE:</p>
              <p className="text-foreground">
                Senior Operations Manager with 20 years at Microsoft, specializing in growth strategy, client retention, and operational excellence. Delivered 120%+ portfolio growth while maintaining 100% client renewals across $15M+ accounts. Expert in data-driven pipeline management, cross-functional team leadership, and strategic forecasting to drive measurable business outcomes.
              </p>
            </div>

            <p className="text-foreground font-semibold mb-3">Why this is better:</p>
            <ul className="space-y-2">
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                4 lines (perfect length)
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                Microsoft brand up front
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                Top metrics in second line
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                Specific expertise without analogies
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                Confident, professional tone
              </li>
            </ul>

            {/* Alternative Options */}
            <div className="mt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Option B - Supply Growth Focus (if targeting Uber/Grab):</p>
                <p className="text-muted-foreground italic text-sm">
                  Senior Operations and Growth Manager with 20 years at Microsoft leading high-value portfolio expansion and retention strategies. Achieved 120%+ growth and 100% renewals across enterprise accounts through data-driven funnel optimization and cross-functional team leadership. Proven expertise in pipeline forecasting, stakeholder management, and operational excellence.
                </p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Option C - If Staying in Customer Success:</p>
                <p className="text-muted-foreground italic text-sm">
                  Senior Customer Success Account Manager with 20 years at Microsoft, specializing in enterprise client retention and portfolio growth. Delivered 120%+ growth with 100% renewals across high-value accounts through strategic adoption roadmaps and data-driven engagement. Expert in C-level stakeholder management, cross-functional project leadership, and business transformation.
                </p>
              </div>
            </div>
          </div>

          {/* Priority 3 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">Medium Impact</span>
              <div className="flex items-center gap-2 text-muted-foreground text-sm">
                <Clock className="w-4 h-4" />
                <span>Est. Time: 60 minutes</span>
              </div>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Priority 3: Add Missing Metrics and Context to Work Experience Bullets</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Several bullets describe activities without showing scale or business impact. Without numbers, your accomplishments blend in with everyone else who "partnered with executives" or "led Business Reviews."
            </p>

            <p className="text-foreground font-semibold mb-3">Pattern to fix: Many bullets say WHAT you did but not:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                How many/how much (scale)
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                What changed (before → after)
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                Why it mattered (business impact)
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">Examples of bullets that need metrics:</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current bullet (vague):</p>
                <p className="text-foreground italic mb-3">"Partnered with executives to design strategic modernization and adoption roadmaps"</p>
                
                <p className="text-sm text-muted-foreground mb-2">Questions to answer:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• How many executives? How senior?</li>
                  <li>• How many roadmaps? For what value of accounts?</li>
                  <li>• What was the outcome? (Adoption %, revenue impact, time savings?)</li>
                </ul>

                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm font-semibold text-primary mb-2">✅ Stronger version:</p>
                  <p className="text-foreground text-sm">"Partnered with 15+ C-level executives to design strategic adoption roadmaps for $8M+ accounts, achieving 85% feature adoption within 6 months and reducing time-to-value by 40%."</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Current bullet (incomplete):</p>
                <p className="text-foreground italic mb-3">"Designed and deployed forecasting dashboards and robust pipeline analytics to inform strategic sales decisions"</p>
                
                <p className="text-sm text-muted-foreground mb-2">Questions to answer:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• How many dashboards? Used by how many people?</li>
                  <li>• What decisions were made? What changed?</li>
                  <li>• What was the measurable impact?</li>
                </ul>

                <div className="bg-primary/5 rounded-lg p-4 border-l-4 border-primary">
                  <p className="text-sm font-semibold text-primary mb-2">✅ Stronger version:</p>
                  <p className="text-foreground text-sm">"Designed and deployed 5 forecasting dashboards used by 40+ sales leaders, improving pipeline visibility and contributing to 15% increase in forecast accuracy."</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Priority Action Items */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Priority Action Items</h2>
          </div>

          {/* HIGH IMPACT */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">High Impact</span>
              <span className="text-foreground font-semibold">Do These First</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Remove ALL analogies from summary and bullets (30 min)</p>
                  <p className="text-sm text-muted-foreground">Delete every phrase in parentheses: "(directly applicable to...)", "(analogous to...)", "(mirroring...)"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Rewrite Professional Summary to 3-4 lines (45 min)</p>
                  <p className="text-sm text-muted-foreground">Lead with: "Senior Operations Manager with 20 years at Microsoft" • Include: 120%+ growth, 100% renewals, $15M+ accounts</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Add specific metrics to 5 weakest bullets (60 min)</p>
                  <p className="text-sm text-muted-foreground">How many executives/accounts/team members? What $ value or % impact? What business outcome resulted?</p>
                </div>
              </label>
            </div>
          </div>

          {/* MEDIUM IMPACT */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">Medium Impact</span>
              <span className="text-foreground font-semibold">Do Next</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Reorder Core Skills to prioritize operational language (10 min)</p>
                  <p className="text-sm text-muted-foreground">Move "Supply-Demand Forecasting" and "Operational Excellence" to top. Remove or de-emphasize "Customer Success" terminology.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Consolidate two Microsoft roles into clearer progression (20 min)</p>
                  <p className="text-sm text-muted-foreground">Current format makes it unclear if you were promoted. Show: Business Excellence Operations (2005-2022) → Customer Success Account Manager (2022-2025)</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Add certification dates to show recency (5 min)</p>
                  <p className="text-sm text-muted-foreground">Azure Fundamentals (2023), AI Fundamentals (2024) — Dates show continuous learning vs old certifications</p>
                </div>
              </label>
            </div>
          </div>

          {/* LOW IMPACT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-primary/10 text-primary text-xs font-bold rounded-full uppercase tracking-wide">Low Impact</span>
              <span className="text-foreground font-semibold">Polish</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Fix formatting inconsistency (2 min)</p>
                  <p className="text-sm text-muted-foreground">"的" appears instead of English text: "aligning leadership 的 strategic priorities"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Add Education year (2 min)</p>
                  <p className="text-sm text-muted-foreground">Currently just says "Finance, National Taipei University of Business" — Add graduation year: "B.S. Finance, 2005"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Consider adding Languages section (5 min)</p>
                  <p className="text-sm text-muted-foreground">Mandarin (Native), English (Professional Working Proficiency) — Shows bilingual capability for multinational companies</p>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Detailed Section Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Detailed Section Analysis</h2>
          </div>

          {/* 1. Header & Contact Details */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">1. Header & Contact Details</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Complete contact information: Phone, email, location, LinkedIn all present</li>
                  <li>• Professional email: charlenelyc@gmail.com is clean and name-based</li>
                  <li>• LinkedIn URL included: Shows you understand modern job search practices</li>
                  <li>• Clear location: "Taipei City, Taiwan" is specific enough</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Phone number formatting: "886 920187795" is hard to read</li>
                  <li>• No job title under name: Recruiters don't immediately know what role you hold/want</li>
                  <li>• LinkedIn URL not optimized: Uses default format instead of custom</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">💡 How to Fix:</p>
              <p className="text-sm text-muted-foreground mb-2">Add positioning line under your name:</p>
              <div className="bg-background rounded p-3 font-mono text-sm text-foreground">
                <p className="font-bold">CHARLENE LEE</p>
                <p>Senior Operations Manager | Growth Strategy | Client Success</p>
                <p className="text-muted-foreground">+886 920 187 795 | charlenelyc@gmail.com | Taipei City, Taiwan</p>
              </div>
            </div>
          </div>

          {/* 3. Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Professional Summary</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Quantified achievements mentioned: 120%+ retention, 100% renewals</li>
                  <li>• Establishes seniority: "Senior Operations and Customer Success Account Manager"</li>
                  <li>• Shows specialization: Supply growth, engagement, retention strategies</li>
                  <li>• Mentions cross-functional leadership: Engineering, Product, Support</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Way too long - 6 lines when 3-4 is maximum</li>
                  <li>• Defensive tone with parenthetical justifications</li>
                  <li>• Generic buzzwords: "operational excellence," "data-driven"</li>
                  <li>• Unclear target role</li>
                  <li>• Microsoft not mentioned (biggest selling point!)</li>
                </ul>
              </div>
            </div>

            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">This is your biggest problem section. Here's what's wrong:</p>
              <ol className="list-decimal list-inside space-y-2 text-sm text-foreground">
                <li><strong>Way too long</strong> - Currently 6 lines of dense text when 3-4 is maximum. Recruiters spend 6-8 seconds scanning. Most will skip this entire paragraph.</li>
                <li><strong>Defensive, over-explained tone</strong> - Filled with parenthetical justifications: "(directly applicable to platform earner/driver acquisition)", "(analogous to driver loyalty)". These phrases scream "I'm pivoting and not sure if I'm qualified"</li>
                <li><strong>Generic buzzwords without context</strong> - "operational excellence" (overused, vague), "data-driven" (everyone claims this), "orchestrate cross-functional teams" (standard phrase)</li>
                <li><strong>Unclear target role</strong> - Are you an Operations Manager? Customer Success Manager? Supply Growth Manager? Recruiters can't tell what you want</li>
                <li><strong>Missing key information</strong> - How many years of experience? Which company? (Microsoft should be featured!) Portfolio size?</li>
              </ol>
            </div>

            <div className="bg-muted/50 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Summary should be 4–5 lines maximum.</strong> Longer summaries become unreadable walls of text. Recruiters skim, so 4 tight lines give information without overwhelming.</p>
              <p className="text-sm text-muted-foreground"><strong>Evidence-based, not adjective-based.</strong> Adjectives like "extensive experience" add no measurable value. Replacing adjectives with results (120% growth, 100% renewals) creates a stronger, credible narrative.</p>
            </div>
          </div>

          {/* 4. Key Achievements */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Target className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Key Achievements</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-primary mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Smart to have this section: Pulls your best wins to the top</li>
                  <li>• Strong metrics: 120%+, 100%, 20% are impressive and specific</li>
                  <li>• Bullet format: Easy to scan quickly</li>
                  <li>• Shows variety: Retention, acquisition, analytics, operations, leadership</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Every bullet has parenthetical explanations that weaken credibility</li>
                  <li>• "proving capability" - defensive language</li>
                  <li>• Missing: How many clients? What $ value?</li>
                </ul>
              </div>
            </div>

            <p className="text-sm font-semibold text-foreground mb-4">Bullet-by-Bullet Fixes:</p>

            <div className="space-y-4">
              <div className="border-l-4 border-destructive pl-4">
                <p className="text-sm text-destructive font-medium mb-2">Current Bullet 1 (Problems):</p>
                <p className="text-sm text-foreground italic mb-2">"Supply Retention & Growth (120%+): Achieved 100% client renewals while surpassing 120% retention and growth across a high-value portfolio, proving capability in building scalable, long-term engagement strategies (analogous to driver loyalty)."</p>
                <p className="text-sm text-muted-foreground">What's wrong: "proving capability" - defensive language, "(analogous to driver loyalty)" - let recruiters make their own connection, Missing: How many clients? What $ value?</p>
              </div>

              <div className="bg-primary/5 rounded-lg p-4">
                <p className="text-sm font-semibold text-primary mb-2">✅ Bullet 1 Rewrite:</p>
                <p className="text-sm text-foreground">Supply Retention & Growth: Achieved 100% client renewals and 120%+ portfolio growth across [NUMBER] enterprise accounts worth [$VALUE] ARR, implementing proactive engagement strategies and data-driven health scoring to reduce churn risk.</p>
                <p className="text-xs text-muted-foreground mt-2">💡 ACTION: Fill in [NUMBER] (e.g., 20+, 25+, 30+) and [$VALUE] (e.g., $10M+, $15M+, $20M+)</p>
              </div>
            </div>
          </div>
        </section>

        {/* ATS Compliance Check */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-primary" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS Compliance Check</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-sm text-muted-foreground mb-1">Excellent ATS Compatibility</p>
                <p className="text-sm text-muted-foreground">Your resume format is well-optimized for ATS systems</p>
              </div>
              <div className="text-right">
                <p className="text-4xl font-heading font-bold text-gold">9/10</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4 mb-6">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Single-column layout: Yes, clean single column
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Standard fonts: Yes, professional font used
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  No graphics/tables: Yes, pure text format
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Keywords present: Yes, but could be stronger
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Proper section headings: Yes, all caps, clear
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Standard date format: Yes, consistent
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  No headers/footers with critical info: Correct
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary" />
                  Contact info at top: Yes, all present
                </div>
              </div>
            </div>

            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
              <p className="text-sm font-semibold text-destructive mb-2">The one gap:</p>
              <p className="text-sm text-foreground mb-3">Your keyword density could be higher for operations/supply roles. Currently heavy on "Customer Success" language.</p>
              
              <p className="text-sm font-semibold text-foreground mb-2">Operations keywords to add:</p>
              <div className="flex flex-wrap gap-2">
                {['Process optimization', 'Workflow efficiency', 'Resource allocation', 'Capacity planning', 'Performance metrics', 'Pipeline management (you have this)', 'Operational scalability (you have this)', 'Cross-functional coordination (you have this)'].map((keyword) => (
                  <span key={keyword} className="px-2 py-1 bg-background rounded text-xs text-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                How to add them: Weave into your bullet rewrites. For example: "Led process optimization initiatives...", "Implemented workflow efficiency improvements...", "Managed resource allocation across..."
              </p>
            </div>
          </div>
        </section>

        {/* Competitive Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Users className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Competitive Analysis</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-6">How This Resume Compares to Other Operations Manager Candidates:</p>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-primary mb-4">Your Strengths vs. Competition:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">20 years at Microsoft</p>
                    <p className="text-sm text-muted-foreground">Most candidates have 5-10 years total experience across multiple companies. Your longevity demonstrates loyalty and deep institutional knowledge.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Impressive retention metrics</p>
                    <p className="text-sm text-muted-foreground">120%+ growth and 100% renewals are genuinely outstanding. Many ops managers struggle to quantify their impact this clearly.</p>
                  </div>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4">Your Gaps vs. Competition:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Customer Success title</p>
                    <p className="text-sm text-muted-foreground">For pure operations roles, your most recent title may raise questions about fit. Operations Managers typically come from titles with "Operations," "Supply," "Program," or "Process" in the name.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">Limited technical operations language</p>
                    <p className="text-sm text-muted-foreground">Your resume emphasizes client-facing work. Competitors may show more systems/process/analytical work.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Next Steps / 5-Day Action Plan */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Calendar className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">5-Day Action Plan</h2>
          </div>

          {/* Annotated Resume Section */}
          <div className="bg-gold/10 rounded-xl p-6 mb-8 border border-gold/20">
            <div className="flex items-center gap-3 mb-4">
              <Lightbulb className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-foreground">Annotated Resume Reference</h3>
            </div>
            <p className="text-muted-foreground mb-4">
              Below is your original resume with annotations showing exactly where to make changes. Use this as a visual guide while implementing the action items.
            </p>
            <div className="bg-background rounded-lg p-4 border border-border">
              <p className="text-sm text-muted-foreground italic text-center">
                [Annotated resume image will be added here - Please provide the annotated version of the resume]
              </p>
            </div>
          </div>

          {/* Quick Wins - Day 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">1</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Quick Wins - Day 1 (10 min)</h3>
                <p className="text-sm text-muted-foreground">Do these 4 changes immediately for instant improvement:</p>
              </div>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Delete all parenthetical analogies</p>
                  <p className="text-sm text-muted-foreground">Find: "(directly applicable to", "(analogous to", "(mirroring". Delete everything in those parentheses.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Fix character encoding error</p>
                  <p className="text-sm text-muted-foreground">Find: "leadership 的 strategic". Change to: "leadership strategic" or "leadership's strategic"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Add phone number spaces</p>
                  <p className="text-sm text-muted-foreground">Change: "886 920187795" to "+886 920 187 795"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-muted/50 p-4 rounded-lg cursor-pointer hover:bg-muted transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <div>
                  <p className="text-foreground font-medium">Add job title under your name</p>
                  <p className="text-sm text-muted-foreground">CHARLENE LEE → Senior Operations Manager | Growth Strategy | Client Success</p>
                </div>
              </label>
            </div>

            <p className="text-sm text-primary font-medium mt-4">Result: Instantly more confident, professional presentation</p>
          </div>

          {/* Day 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">2</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Day 2: Core Content (2 hours)</h3>
                <p className="text-sm text-muted-foreground">Summary & Key Achievements</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Rewrite Professional Summary to 3-4 lines using provided template (30 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Rewrite all 5 Key Achievements bullets using provided examples (60 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Add specific metrics using [PLACEHOLDER] format where needed (30 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Save as: Charlene_Lee_Resume_v2.pdf</span>
              </label>
            </div>
          </div>

          {/* Day 3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">3</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Day 3: Work Experience - Recent Role (2 hours)</h3>
                <p className="text-sm text-muted-foreground">Customer Success Account Manager (2022-2025)</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Rewrite all 4 bullets using CAR model (Context, Action, Result) (60 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Add scale metrics: # of accounts, $ ARR, team sizes (30 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Add outcome metrics: % adoption, $ expansion, time savings (30 min)</span>
              </label>
            </div>
          </div>

          {/* Day 4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">4</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Day 4: Work Experience - Operations Role (2 hours)</h3>
                <p className="text-sm text-muted-foreground">Business Excellence Operations (2005-2022)</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Decide: break into sub-roles or keep as one section (15 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Add 2-3 more bullets showing operational breadth (45 min)</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Rewrite existing 4 bullets with specific metrics (45 min)</span>
              </label>
            </div>
          </div>

          {/* Day 5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold">5</div>
              <div>
                <h3 className="text-lg font-semibold text-foreground">Day 5: Review & Polish</h3>
                <p className="text-sm text-muted-foreground">Final checks</p>
              </div>
            </div>

            <div className="space-y-2">
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Send to 2-3 trusted colleagues/mentors</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Ask: "Does this read as Operations Manager level?"</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Print and review on paper</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Read entire resume aloud</span>
              </label>
              <label className="flex items-start gap-3 p-3 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-primary focus:ring-primary" />
                <span className="text-foreground">Save final: Charlene_Lee_Resume_Operations_Final.pdf</span>
              </label>
            </div>
          </div>

          {/* Time Investment */}
          <div className="bg-primary text-primary-foreground rounded-xl p-6 text-center">
            <p className="text-sm opacity-80 mb-2">Total Time Investment</p>
            <p className="font-heading text-3xl mb-2">~8-9 hours over 5 days</p>
            <p className="text-sm opacity-80">ROI: Transform from 65% ready to 85% ready for senior operations roles</p>
          </div>
        </section>

        {/* Closing Thoughts */}
        <section className="mb-16">
          <div className="bg-executive-green relative rounded-xl overflow-hidden">
            <div className="relative z-10 p-8 md:p-12 text-center">
              <h2 className="font-heading text-3xl text-cream mb-6">Closing Thoughts</h2>
              
              <p className="text-cream-90 text-lg leading-relaxed mb-6 max-w-3xl mx-auto">
                Charlene, you have an incredibly strong foundation. Twenty years at Microsoft with 120%+ growth metrics and 100% renewal rates puts you in the top tier of operational professionals. The issue isn't your experience—it's how you're presenting it.
              </p>

              <p className="text-gold font-semibold text-lg mb-4">The three biggest problems are:</p>

              <ol className="text-cream-90 text-left max-w-2xl mx-auto space-y-2 mb-6">
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">1.</span>
                  Over-explaining your pivot with analogies that actually hurt your credibility
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">2.</span>
                  Missing critical metrics that would show scale and business impact
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-gold font-bold">3.</span>
                  Positioning yourself as Customer Success when you want Operations roles
                </li>
              </ol>

              <p className="text-cream-90 text-lg mb-4">
                <span className="text-gold font-semibold">The good news?</span> All three are fixable in a weekend. Once you make these changes, you'll have a resume that:
              </p>

              <ul className="text-cream-90 text-left max-w-2xl mx-auto space-y-2 mb-8">
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  Positions you clearly as a Senior Operations Manager
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  Demonstrates 20 years of progressive Microsoft experience
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  Shows quantified, impressive business results
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gold">•</span>
                  Competes for $120K-180K operations roles at top tech companies
                </li>
              </ul>

              <p className="text-cream-90 text-lg mb-8 max-w-3xl mx-auto">
                You don't need to apologize for your experience or explain why it's relevant. Your achievements speak for themselves. Trust them. Remove the defensive language. Add the missing metrics. Let recruiters see your value immediately.
              </p>

              <p className="font-heading text-2xl text-gold mb-8">You've got this.</p>

              <a 
                href="https://james.careers" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center px-8 py-4 btn-gold rounded-lg text-lg font-semibold"
              >
                Work With James
              </a>
            </div>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-muted py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-muted-foreground text-sm">
            © 2024 James Bugden Career Coaching. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default CharleneLeeReview;
