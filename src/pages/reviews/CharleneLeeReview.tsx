import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw } from 'lucide-react';
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
            
            <p className="text-foreground leading-relaxed mb-4">
              Charlene, your resume shows strong experience at a prestigious company (Microsoft) with impressive retention metrics (120%+, 100% renewals).
            </p>
            
            <p className="text-foreground leading-relaxed mb-4">
              However, the resume is currently positioned for Customer Success roles but trying to pivot to Operations/Supply roles (likely Uber/ride-sharing based on your framing). The heavy use of analogies ("directly applicable to driver acquisition") actually weakens your positioning—you're telling recruiters how to interpret your experience rather than letting your achievements speak for themselves.
            </p>
            
            <p className="text-foreground leading-relaxed mb-6">
              With focused repositioning and content refinement, this resume can be highly competitive for Operations Manager or Supply Growth roles. My assumption is that you are targeting these kind of roles but in retrospect I should have asked for your target job descriptions.
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
              <p className="text-sm text-muted-foreground mb-3">
                <strong>Current State:</strong> This resume will get you interviews for Customer Success Manager or Account Manager roles at tech companies. However, it's not optimally positioned for Operations/Supply Growth roles because:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Too much "Customer Success" language</li>
                <li>• Not enough operational/supply chain terminology</li>
                <li>• Analogies make pivot obvious and awkward</li>
                <li>• Missing key operations metrics (throughput, efficiency, utilization)</li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm text-muted-foreground mb-2">After Implementing Fixes</p>
              <div className="flex items-end gap-3 mb-3">
                <div className="flex-1 h-3 bg-muted rounded-full overflow-hidden">
                  <div className="h-full w-[85%] bg-gold rounded-full"></div>
                </div>
                <span className="text-2xl font-bold text-gold">85%</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">
                <strong>After implementing the 3 priorities above:</strong> Resume will be 85% ready and competitive for:
              </p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Operations Manager roles (tech companies, marketplaces, platforms)</li>
                <li>• Supply Growth Manager (Uber, Grab, Deliveroo, Foodpanda)</li>
                <li>• Business Operations Manager (high-growth startups)</li>
                <li>• Strategic Partnerships Manager (B2B platforms)</li>
              </ul>
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
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Top 3 Strengths ✅</h2>
          </div>

          <div className="space-y-6">
            {/* Strength 1 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">1</div>
                <h3 className="text-xl font-semibold text-foreground">Quantified, Impressive Results</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">120%+ retention and growth across portfolio</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">100% client renewals</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">20% reduction in reporting time</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">These metrics immediately show you drive business impact and are results-oriented</span>
                </li>
              </ul>
            </div>

            {/* Strength 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">2</div>
                <h3 className="text-xl font-semibold text-foreground">Blue-Chip Brand Credibility</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">20 years at Microsoft (2005-2025) demonstrates loyalty, progression, and ability to work in complex enterprise environments</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Microsoft name instantly builds trust with recruiters</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Certification stack (Azure, M365, AI, Security) shows continuous learning</span>
                </li>
              </ul>
            </div>

            {/* Strength 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold text-foreground flex items-center justify-center font-bold text-sm">3</div>
                <h3 className="text-xl font-semibold text-foreground">Clear Cross-Functional Leadership</h3>
              </div>
              <ul className="space-y-2">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Orchestrated Engineering, Delivery, Support teams</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Partnered with C-level executives</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">Coordinated across sales, services, support organizations</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
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
            <h2 className="font-heading text-3xl text-foreground">Top 3 Priorities 🎯 (Ranked by Impact)</h2>
          </div>

          {/* Priority 1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Priority 1 - High Impact 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Remove ALL Analogies and Parenthetical Explanations</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Your summary and bullets are filled with phrases like "(directly applicable to platform earner/driver acquisition)" and "(analogous to driver loyalty)". This creates three major problems:
            </p>
            
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>Weakens your credibility</strong> - Sounds like you're trying to convince recruiters your experience is relevant</li>
              <li><strong>Takes up valuable space</strong> - Uses 15-20% of your resume real estate on meta-commentary</li>
            </ol>

            <p className="text-foreground font-semibold mb-4">The Fix: Simply describe what you actually DID and the results you achieved. Let recruiters draw their own connections.</p>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">❌ Current (Weak):</p>
                <p className="text-foreground italic">"Achieved 100% client renewals while surpassing 120% retention and growth across a high-value portfolio, proving capability in building scalable, long-term engagement strategies (analogous to driver loyalty)."</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">✅ Better (Strong):</p>
                <p className="text-foreground italic">"Achieved 100% client renewals while surpassing 120% retention and growth across high-value portfolio of 25+ enterprise accounts worth $15M+ ARR."</p>
              </div>
            </div>

            <p className="text-muted-foreground mt-4 text-sm">The second version is stronger, more specific, and doesn't apologize for itself.</p>
          </div>

          {/* Priority 2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Priority 2 - High Impact 🔴</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Rewrite Your Professional Summary to Be Role-Focused, Not Pivot-Focused</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Your current summary reads like a cover letter explaining why you're qualified for a different role. It's 6 lines of dense text trying to connect your experience to something else. Recruiters will skim this and miss your actual value.
            </p>

            <p className="text-foreground font-semibold mb-3">What's wrong with the current version:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>Too long (6 lines when 4 is maximum)</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>Defensive tone ("directly applicable to")</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>Unclear what role you're actually targeting</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>Buries your strongest achievements</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-destructive">•</span>
                <strong>Generic phrases ("operational excellence," "cross-functional teams")</strong>
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">Action: Rewrite to 3-4 tight lines that state:</p>
            <ol className="list-decimal list-inside space-y-1 mb-6 text-foreground">
              <li><strong>Who you are (title/function)</strong></li>
              <li><strong>Years of experience + company brand</strong></li>
              <li><strong>Top 2-3 quantified achievements</strong></li>
              <li><strong>Core expertise/specialization</strong></li>
            </ol>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">✅ RECOMMENDED REWRITE:</p>
              <p className="text-foreground">
                Senior Operations Manager with 20 years at Microsoft, specializing in growth strategy, client retention, and operational excellence. Delivered 120%+ portfolio growth while maintaining 100% client renewals across $15M+ accounts. Expert in data-driven pipeline management, cross-functional team leadership, and strategic forecasting to drive measurable business outcomes.
              </p>
            </div>

            <p className="text-foreground font-semibold mb-3">Why this is better:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Immediately clear what you do</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Microsoft brand up front</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Top metrics in second line</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Specific expertise without analogies</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Confident, professional tone</strong>
              </li>
            </ul>

            {/* Alternative Options */}
            <div className="mt-6 space-y-4">
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Option B - Supply Growth Focus (if targeting Uber/Grab):</p>
                <p className="text-muted-foreground italic text-sm">
                  Senior Operations and Growth Manager with 20 years at Microsoft leading high-value portfolio expansion and retention strategies. Achieved 120%+ growth and 100% renewals across enterprise accounts through data-driven funnel optimization and cross-functional team leadership. Proven expertise in pipeline forecasting, stakeholder management, and operational excellence.
                </p>
                <p className="text-sm text-foreground mt-3"><strong>Why this works:</strong> Emphasizes "Growth" for supply growth roles. "Portfolio expansion" and "funnel optimization" signal supply/marketplace experience. Still mentions Microsoft brand and key metrics. No defensive language or analogies.</p>
              </div>
              
              <div className="bg-muted/50 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Option C - If Staying in Customer Success:</p>
                <p className="text-muted-foreground italic text-sm">
                  Senior Customer Success Account Manager with 20 years at Microsoft, specializing in enterprise client retention and portfolio growth. Delivered 120%+ growth with 100% renewals across high-value accounts through strategic adoption roadmaps and data-driven engagement. Expert in C-level stakeholder management, cross-functional project leadership, and business transformation.
                </p>
                <p className="text-sm text-foreground mt-3"><strong>Why this works:</strong> Positions you as senior CS leader. Emphasizes enterprise and strategic work. Still includes top metrics and Microsoft brand.</p>
              </div>
            </div>

            {/* Summary Writing Formula */}
            <div className="bg-gold/10 rounded-lg p-4 mt-6 border border-gold/20">
              <p className="text-sm font-semibold text-gold mb-2">💡 Summary Writing Formula:</p>
              <p className="text-foreground text-sm">
                <strong>Line 1:</strong> [Title] with [X years] at [Company], specializing in [core function]<br/>
                <strong>Line 2:</strong> Delivered [top metric] and [second top metric] across [scale/scope]<br/>
                <strong>Line 3:</strong> Expert in [skill 1], [skill 2], and [skill 3] to [business outcome]
              </p>
              <p className="text-sm text-muted-foreground mt-2">Fill in the brackets with your specific information and you'll have a strong summary every time.</p>
            </div>

            {/* Principle Box */}
            <div className="bg-muted/30 rounded-lg p-4 mt-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground mb-2"><strong>Summary should be 4–5 lines maximum</strong> - Longer summaries become unreadable walls of text. Recruiters skim, so 4 tight lines give information without overwhelming. The summary should answer: Who are you? Where have you worked? What did you deliver? What are you good at?</p>
              <p className="text-sm text-foreground"><strong>Evidence-based, not adjective-based</strong> - Adjectives like "extensive experience" add no measurable value. Replacing adjectives with results (120% growth, 100% renewals) creates a stronger, credible narrative that demonstrates impact clearly.</p>
            </div>
          </div>

          {/* Priority 3 */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">Priority 3 - Medium Impact 🟡</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Missing Metrics and Context to Work Experience Bullets</h3>
            
            <p className="text-foreground mb-4">
              <strong>Why this matters:</strong> Several bullets describe activities without showing scale or business impact. Without numbers, your accomplishments blend in with everyone else who "partnered with executives" or "led Business Reviews."
            </p>

            <p className="text-foreground font-semibold mb-3">Pattern to fix: Many bullets say WHAT you did but not:</p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>How many/how much (scale)</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>What changed (before → after)</strong>
              </li>
              <li className="flex items-start gap-2 text-foreground">
                <span className="text-gold">•</span>
                <strong>Why it mattered (business impact)</strong>
              </li>
            </ul>

            <p className="text-foreground font-semibold mb-3">Examples of bullets that need metrics:</p>

            <div className="space-y-4">
              <div>
                <p className="text-sm text-muted-foreground mb-2">Current bullet (vague):</p>
                <p className="text-foreground italic mb-3">"Partnered with executives to design strategic modernization and adoption roadmaps"</p>
                
                <p className="text-sm text-muted-foreground mb-2">Questions to answer:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>How many executives? How senior?</strong></li>
                  <li>• <strong>How many roadmaps? For what value of accounts?</strong></li>
                  <li>• <strong>What was the outcome? (Adoption %, revenue impact, time savings?)</strong></li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Stronger version:</p>
                  <p className="text-foreground text-sm">"Partnered with 15+ C-level executives to design strategic adoption roadmaps for $8M+ accounts, achieving 85% feature adoption within 6 months and reducing time-to-value by 40%."</p>
                </div>
              </div>

              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-2">Current bullet (incomplete):</p>
                <p className="text-foreground italic mb-3">"Designed and deployed forecasting dashboards and robust pipeline analytics to inform strategic sales decisions"</p>
                
                <p className="text-sm text-muted-foreground mb-2">Questions to answer:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>How many dashboards? Used by how many people?</strong></li>
                  <li>• <strong>What decisions were made? What changed?</strong></li>
                  <li>• <strong>What was the measurable impact?</strong></li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Stronger version:</p>
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
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">High Impact 🔴</span>
              <span className="text-foreground font-semibold">Do These First</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Remove ALL analogies from summary and bullets</p>
                  <p className="text-sm text-muted-foreground">Delete every phrase in parentheses: "(directly applicable to...)", "(analogous to...)", "(mirroring...)" - Simply state what you did and what results you achieved</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Rewrite Professional Summary to 3-4 lines focusing on achievements, not pivot explanation</p>
                  <p className="text-sm text-muted-foreground">Lead with: "Senior Operations Manager with 20 years at Microsoft" • Include: 120%+ growth, 100% renewals, $15M+ accounts • Remove: All analogies and defensive positioning</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Add specific metrics to 5 weakest bullets in Work Experience</p>
                  <p className="text-sm text-muted-foreground">How many executives/accounts/team members? What $ value or % impact? What business outcome resulted?</p>
                </div>
              </label>
            </div>
          </div>

          {/* MEDIUM IMPACT */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">Medium Impact 🟡</span>
              <span className="text-foreground font-semibold">Do Next</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Reorder Core Skills to prioritize operational language</p>
                  <p className="text-sm text-muted-foreground">Move "Supply-Demand Forecasting" and "Operational Excellence" to top. Remove or de-emphasize "Customer Success" terminology.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Consolidate two Microsoft roles into clearer progression</p>
                  <p className="text-sm text-muted-foreground">Current format makes it unclear if you were promoted. Show: Business Excellence Operations (2005-2022) → Customer Success Account Manager (2022-2025)</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Add certification dates to show recency</p>
                  <p className="text-sm text-muted-foreground">Azure Fundamentals (2023), AI Fundamentals (2024) — Dates show continuous learning vs old certifications</p>
                </div>
              </label>
            </div>
          </div>

          {/* LOW IMPACT */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-gold/10 text-gold text-xs font-bold rounded-full uppercase tracking-wide">Low Impact 🟢</span>
              <span className="text-foreground font-semibold">Polish</span>
            </div>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Fix formatting inconsistency in second role description</p>
                  <p className="text-sm text-muted-foreground">"的" appears instead of English text: "aligning leadership 的 strategic priorities"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Add Education year</p>
                  <p className="text-sm text-muted-foreground">Currently just says "Finance, National Taipei University of Business" — Add graduation year: "B.S. Finance, 2005" (or whatever year)</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg border border-border cursor-pointer hover:bg-muted/50 transition-colors">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Consider adding Languages section since you're in Taiwan (5 min)</p>
                  <p className="text-sm text-muted-foreground">Mandarin (Native), English (Professional Working Proficiency) — Shows bilingual capability for multinational companies</p>
                </div>
              </label>
            </div>
          </div>
        </section>

        {/* Detailed Section Analysis */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <BookOpen className="w-5 h-5 text-gold" />
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
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Complete contact information:</strong> Phone, email, location, LinkedIn all present</li>
                  <li>• <strong>Professional email:</strong> charlenelyc@gmail.com is clean and name-based</li>
                  <li>• <strong>LinkedIn URL included:</strong> Shows you understand modern job search practices</li>
                  <li>• <strong>Clear location:</strong> "Taipei City, Taiwan" is specific enough without giving full address</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Phone number formatting:</strong> "886 920187795" is slightly hard to read</li>
                  <li>• <strong>No job title under name:</strong> Recruiters don't immediately know what role you hold/want</li>
                  <li>• <strong>LinkedIn URL not optimized:</strong> Uses default format (charlene-l-38621a11a) instead of custom</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">💡 How to Fix:</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Phone number:</strong> Add spaces or dashes for readability</p>
              <p className="text-sm text-foreground mb-2">❌ Current: 886 920187795</p>
              <p className="text-sm text-foreground mb-4">✅ Better: +886 920 187 795 or +886-920-187-795</p>
              
              <p className="text-sm text-muted-foreground mb-2"><strong>Add positioning line under your name:</strong></p>
              <div className="bg-background rounded p-3 font-mono text-sm text-foreground">
                <p className="font-bold">CHARLENE LEE</p>
                <p>Senior Operations Manager | Growth Strategy | Client Success</p>
                <p className="text-muted-foreground">+886 920 187 795 | charlenelyc@gmail.com | Taipei City, Taiwan</p>
                <p className="text-muted-foreground">linkedin.com/in/charlene-l-38621a11a</p>
              </div>
              
              <p className="text-sm text-muted-foreground mt-4"><strong>LinkedIn URL:</strong> Consider customizing to linkedin.com/in/charleneleeyc or linkedin.com/in/charlene-lee-taiwan</p>
              <ul className="text-sm text-muted-foreground mt-2">
                <li>• Go to LinkedIn → Edit Profile → Edit Public Profile URL</li>
                <li>• Makes you look more professional and URL is more memorable</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground"><strong>First 15 words label the candidate clearly</strong> - A vague or missing professional title forces recruiters to guess what roles you're suited for. A sharp, specific opening (name + title + key skills) immediately communicates who you are and why you fit the job. This is especially important when pivoting—you need to clearly state your target function.</p>
            </div>
          </div>

          {/* 2. Format and Layout */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Layout className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. Format and Layout</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Single-column, ATS-friendly layout:</strong> No tables, graphics, or text boxes that would break parsing</li>
                  <li>• <strong>Clear section headings:</strong> All caps, consistent throughout (PROFESSIONAL SUMMARY, KEY ACHIEVEMENTS, etc.)</li>
                  <li>• <strong>Professional font:</strong> Clean, readable, appropriate size</li>
                  <li>• <strong>Reasonable length:</strong> Two pages is correct for 20 years of experience</li>
                  <li>• <strong>Consistent bullet formatting:</strong> All bullets use same style</li>
                  <li>• <strong>Good white space:</strong> Not cramped or overcrowded</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Spacing inconsistency:</strong> Some sections have more space between them than others</li>
                  <li>• <strong>Character encoding error:</strong> "的" appears in English text in second role</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">💡 How to Fix:</p>
              <p className="text-sm text-muted-foreground mb-2"><strong>Ensure consistent spacing:</strong></p>
              <ul className="text-sm text-foreground space-y-1 mb-4">
                <li>• 12-18pt space between major sections</li>
                <li>• 6-8pt space between job roles</li>
                <li>• Test by printing—should look balanced</li>
              </ul>
              
              <p className="text-sm text-muted-foreground mb-2"><strong>Fix encoding error:</strong></p>
              <p className="text-sm text-foreground mb-1">❌ Current: "aligning leadership 的 strategic priorities"</p>
              <p className="text-sm text-foreground">✅ Fixed: "aligning leadership strategic priorities" OR "aligning leadership's strategic priorities"</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground"><strong>Clean, consistent design (use Calibri/Arial/Helvetica, 11–12 pt)</strong> - Inconsistent fonts, spacing, or formatting makes resumes look messy and unprofessional. ATS systems may misread decorative elements. Consistent styles across all sections create a polished, trustworthy impression that looks like you pay attention to detail—critical for operations roles.</p>
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
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Quantified achievements mentioned:</strong> 120%+ retention, 100% renewals</li>
                  <li>• <strong>Establishes seniority:</strong> "Senior Operations and Customer Success Account Manager"</li>
                  <li>• <strong>Shows specialization:</strong> Supply growth, engagement, retention strategies</li>
                  <li>• <strong>Mentions cross-functional leadership:</strong> Engineering, Product, Support</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <p className="text-sm text-foreground font-semibold mb-2">This is your biggest problem section. Here's what's wrong:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>1. Too long</strong> - Currently 6 lines of dense text when 3-4 is maximum. Recruiters spend 6-8 seconds scanning. Most will skip this entire paragraph. Key information gets buried.</li>
                  <li>• <strong>2. Over-explained tone</strong> - Filled with justifications: "(directly applicable to platform earner/driver acquisition)", "(analogous to driver loyalty)". These phrases scream "I'm pivoting and not sure if I'm qualified"</li>
                  <li>• <strong>3. Generic buzzwords without context:</strong> "operational excellence" (overused, vague), "data-driven" (everyone claims this), "orchestrate cross-functional teams" (standard phrase)</li>
                  <li>• <strong>4. Unclear target role:</strong> Are you an Operations Manager? Customer Success Manager? Supply Growth Manager? Recruiters can't tell what you want</li>
                  <li>• <strong>5. Missing key information:</strong> How many years of experience? Which company? (Microsoft should be featured!) Portfolio size? ($15M? 25 accounts? Scale matters)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 4. Key Achievements */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. Key Achievements</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Smart to have this section:</strong> Pulls your best wins to the top where recruiters will definitely see them</li>
                  <li>• <strong>Strong metrics:</strong> 120%+, 100%, 20% are all impressive and specific</li>
                  <li>• <strong>Bullet format:</strong> Easy to scan quickly</li>
                  <li>• <strong>Shows variety:</strong> Retention, acquisition, analytics, operations, leadership all represented</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <p className="text-sm text-foreground font-semibold mb-2">Problem: Every bullet has parenthetical explanations that weaken your credibility</p>
              </div>
            </div>

            {/* Bullet Analysis */}
            <div className="space-y-6">
              {/* Bullet 1 */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Bullet 1:</p>
                <p className="text-foreground italic mb-3">"Supply Retention & Growth (120%+): Achieved 100% client renewals while surpassing 120% retention and growth across a high-value portfolio, proving capability in building scalable, long-term engagement strategies (analogous to driver loyalty)."</p>
                
                <p className="text-sm font-semibold text-destructive mb-2">What's wrong:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>"proving capability"</strong> - defensive language</li>
                  <li>• <strong>"(analogous to driver loyalty)"</strong> - Allow the recruiter to make their own connection for this otherwise it looks too desperate</li>
                  <li>• <strong>Missing:</strong> How many clients? What $ value?</li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Bullet 1 Rewrite:</p>
                  <p className="text-foreground text-sm">Supply Retention & Growth: Achieved 100% client renewals and 120%+ portfolio growth across [NUMBER] enterprise accounts worth [$VALUE] ARR, implementing proactive engagement strategies and data-driven health scoring to reduce churn risk.</p>
                </div>

                <div className="bg-gold/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                  <ul className="text-foreground space-y-1">
                    <li>• <strong>[NUMBER]:</strong> How many accounts? (e.g., 20+, 25+, 30+)</li>
                    <li>• <strong>[$VALUE]:</strong> Total ARR? (e.g., $10M+, $15M+, $20M+)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Adds scale: account count, $ value. Removes analogy. Adds method: health scoring, proactive engagement. Confident tone.</p>
                </div>
              </div>

              {/* Bullet 2 */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Bullet 2:</p>
                <p className="text-foreground italic mb-3">"Acquisition Strategy & Segmentation: Expanded platform opportunity capture by exceeding 120% new supply/account capture rate, utilizing data-driven funnel segmentation and targeted engagement-experience directly transferrable to driver acquisition."</p>
                
                <p className="text-sm font-semibold text-destructive mb-2">What's wrong:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>"experience directly transferrable to driver acquisition"</strong> - screams "I'm pivoting"</li>
                  <li>• <strong>"expanded platform opportunity capture"</strong> - vague, what does this mean?</li>
                  <li>• <strong>Missing:</strong> How many accounts acquired? From what starting point?</li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Bullet 2 Rewrite:</p>
                  <p className="text-foreground text-sm">Acquisition Strategy & Growth: Exceeded 120% new account acquisition target, expanding enterprise portfolio from [NUMBER] to [NUMBER] clients ([%] growth) in [TIMEFRAME] through data-driven funnel segmentation and targeted outreach.</p>
                </div>

                <div className="bg-gold/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                  <ul className="text-foreground space-y-1">
                    <li>• <strong>First [NUMBER]:</strong> Starting count (e.g., 30, 40, 50)</li>
                    <li>• <strong>Second [NUMBER]:</strong> Ending count (e.g., 45, 55, 65)</li>
                    <li>• <strong>[%]:</strong> Calculate growth percentage (e.g., 35%, 37%, 40%)</li>
                    <li>• <strong>[TIMEFRAME]:</strong> How long? (e.g., 6 months, 12 months, Q3-Q4)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Specific before/after numbers. Shows growth percentage. Adds timeframe. Removes "driver acquisition" reference. Clear starting and ending point.</p>
                </div>
              </div>

              {/* Bullet 3 */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Bullet 3:</p>
                <p className="text-foreground italic mb-3">"Spend & Data Analytics: Led recurring Business Reviews utilizing KPIs and usage trends to guide strategic investments, mirroring the function of monitoring driver lifecycle and incentive ROI optimization."</p>
                
                <p className="text-sm font-semibold text-destructive mb-2">What's wrong:</p>
                <ul className="space-y-1 mb-3 text-foreground text-sm">
                  <li>• <strong>"mirroring the function of"</strong> - again, doing the recruiter's work</li>
                  <li>• <strong>"Led recurring Business Reviews"</strong> - how many? How often? For whom?</li>
                  <li>• <strong>Missing:</strong> What decisions were made? What changed?</li>
                </ul>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Bullet 3 Rewrite:</p>
                  <p className="text-foreground text-sm">Business Reviews & Strategic Planning: Conducted [FREQUENCY] Business Reviews for C-level executives across [NUMBER] accounts, utilizing KPI dashboards and usage analytics to identify [$VALUE] in expansion opportunities and inform product roadmap priorities.</p>
                </div>

                <div className="bg-gold/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                  <ul className="text-foreground space-y-1">
                    <li>• <strong>[FREQUENCY]:</strong> How often? (e.g., quarterly, monthly, bi-monthly)</li>
                    <li>• <strong>[NUMBER]:</strong> How many accounts? (e.g., 20+, 25+, 30+)</li>
                    <li>• <strong>[$VALUE]:</strong> Expansion value identified (e.g., $1M+, $2M+, $3M+)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Adds frequency: shows consistency. Adds scale: account count. Adds $ impact: expansion value. Mentions product roadmap influence (strategic impact). Removes "driver lifecycle" analogy.</p>
                </div>
              </div>

              {/* Bullet 4 */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Bullet 4 (pretty good, just needs minor refinement):</p>
                <p className="text-foreground italic mb-3">"Operational Excellence: Delivered operational improvements that reduced reporting time by 20%, increasing agility and data-driven responsiveness for customer-facing teams."</p>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Slight improvement:</p>
                  <p className="text-foreground text-sm">Operational Excellence: Automated reporting workflows and optimized data pipelines, reducing reporting time by 20% for [NUMBER] customer-facing team members and enabling real-time business intelligence.</p>
                </div>

                <div className="bg-gold/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                  <ul className="text-foreground space-y-1">
                    <li>• <strong>[NUMBER]:</strong> How many people impacted? (e.g., 30+, 40+, 50+)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Adds method: automated, optimized. Adds scale: team member count. Adds outcome: real-time BI.</p>
                </div>
              </div>

              {/* Bullet 5 */}
              <div className="border-t border-border pt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Current Bullet 5 (also decent, just tighten):</p>
                <p className="text-foreground italic mb-3">"Cross-functional Leadership: Coordinated delivery, engineering, and support teams to co-create and execute complex adoption strategies, ensuring project delivery within scope and timeline."</p>

                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                  <p className="text-sm font-semibold text-gold mb-2">✅ Slight improvement:</p>
                  <p className="text-foreground text-sm">Cross-functional Project Leadership: Led [NUMBER] cross-functional initiatives across Engineering, Delivery, and Support teams, delivering complex adoption projects [%] on-time and within budget, resulting in [%] customer satisfaction.</p>
                </div>

                <div className="bg-gold/10 rounded-lg p-3 text-sm">
                  <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                  <ul className="text-foreground space-y-1">
                    <li>• <strong>First [NUMBER]:</strong> How many initiatives? (e.g., 8+, 10+, 12+)</li>
                    <li>• <strong>First [%]:</strong> On-time delivery rate (e.g., 90%, 95%, 100%)</li>
                    <li>• <strong>Second [%]:</strong> Customer satisfaction score (e.g., 80%+, 85%+, 90%+)</li>
                  </ul>
                  <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Adds quantity: initiative count. Adds quality metric: on-time %. Adds outcome: satisfaction %. More specific and measurable.</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground mt-6">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground mb-2"><strong>Each bullet measurable and result-driven</strong> - Metrics instantly show scale and credibility. Without them, work appears like generic tasks rather than real accomplishments. Recruiters often skip unquantified bullets because they cannot judge impact.</p>
              <p className="text-sm text-foreground"><strong>Passing the 'So What?' Test</strong> - Every line must show why your work mattered and what business value it created. If a bullet doesn't answer "so what?", recruiters view it as filler. Clear outcomes make achievements compelling.</p>
            </div>
          </div>

          {/* 5. Core Skills */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. Core Skills</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Well-organized:</strong> Logically grouped skills, easy to scan</li>
                  <li>• <strong>Mix of hard and soft skills:</strong> Data analytics, forecasting + stakeholder engagement</li>
                  <li>• <strong>Relevant to target roles:</strong> Most skills apply to operations/supply/CS roles</li>
                  <li>• <strong>Specific tools/methods mentioned:</strong> KPI Analytics, Supply-Demand Forecasting</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>1. Ordering doesn't match target role</strong> - If you're targeting Operations/Supply roles, lead with operational skills.</li>
                  <li>• <strong>2. "Digital Transformation & Adoption Roadmaps" is very Customer Success</strong> - This phrase is fine for CS roles but doesn't resonate for pure operations roles. Consider whether you actually need it?</li>
                  <li>• <strong>3. Missing some operational terminology:</strong> Process optimization, Resource allocation, Capacity planning, Performance metrics, Workflow automation</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">💡 How to Fix - Recommended reorder for Operations/Supply roles:</p>
              <div className="bg-background rounded p-3 font-mono text-sm text-foreground mb-4">
                <p className="font-bold mb-2">CORE SKILLS</p>
                <p>• Supply-Demand Forecasting & Pipeline Development</p>
                <p>• Operational Excellence & Process Optimization</p>
                <p>• Data-Driven Insights & KPI Analytics</p>
                <p>• Program Design & Incentive Optimization</p>
                <p>• Cross-functional Collaboration & Project Leadership</p>
                <p>• Stakeholder Engagement & Influence (C-level)</p>
                <p>• Business Planning & Strategic Roadmaps</p>
              </div>
              <p className="text-sm text-muted-foreground"><strong>Why this is better:</strong> Leads with "Supply-Demand" (matches target roles). Second line emphasizes "Operational Excellence". Replaced "Digital Transformation & Adoption Roadmaps" with more generic "Business Planning & Strategic Roadmaps". Still includes all your strengths but reframed.</p>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">Alternative for Customer Success roles (if not pivoting):</p>
              <div className="bg-background rounded p-3 font-mono text-sm text-foreground">
                <p className="font-bold mb-2">CORE SKILLS</p>
                <p>• Customer Success & Account Management</p>
                <p>• Data-Driven Insights & KPI Analytics</p>
                <p>• Stakeholder Engagement & Influence (C-level)</p>
                <p>• Adoption Roadmaps & Digital Transformation</p>
                <p>• Cross-functional Collaboration & Project Leadership</p>
                <p>• Supply-Demand Forecasting & Pipeline Development</p>
                <p>• Program Design & Growth Strategy</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground mb-2"><strong>Prioritize Hard Skills Over Soft Skills</strong> - Hard skills show what you can actually do, while soft skills often sound generic and unverifiable. Recruiters look for technical and functional capability first. Order matters—put the most relevant skills for your target role first.</p>
              <p className="text-sm text-foreground"><strong>Role-Relevant, Not Generic</strong> - Your skills section should highlight expertise directly aligned with the job you're targeting. Generic skills make you look unfocused and reduce perceived seniority.</p>
            </div>
          </div>

          {/* 6. Work Experience */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <TrendingUp className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Work Experience</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-gold" /> What's Working Overall
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>20 years at Microsoft:</strong> Shows loyalty, progression, ability to work in complex enterprise environment</li>
                  <li>• <strong>Clear role titles:</strong> Customer Success Account Manager vs Business Excellence Operations</li>
                  <li>• <strong>Quantified results:</strong> 120%+ growth, 100% renewals, 20% time reduction</li>
                  <li>• <strong>Cross-functional leadership demonstrated:</strong> Engineering, Delivery, Support, Sales</li>
                  <li>• <strong>C-level interaction mentioned:</strong> Shows strategic influence</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work Overall
                </p>
                <p className="text-sm text-foreground font-semibold mb-2">Major Issues:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>1. First role (2022-2025) is only 3 years but gets 4 bullets</strong></li>
                  <li>• <strong>2. Second role (2005-2022) is 17 years but only gets 4 bullets</strong> - This makes no sense proportionally. 17 years should have more detail or be broken into sub-roles</li>
                  <li>• <strong>3. Many bullets lack specifics:</strong> How many executives/accounts/projects? What $ impact or % improvement? What was the before/after state?</li>
                  <li>• <strong>4. Character encoding error in second role</strong></li>
                  <li>• <strong>5. Unclear if you were promoted or just changed departments</strong></li>
                </ul>
              </div>
            </div>

            {/* 6a. Customer Success Account Manager */}
            <div className="border-t border-border pt-6 mb-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">6a. Customer Success Account Manager | Microsoft Taiwan (Sep 2022 – Aug 2025)</h4>
              
              <div className="space-y-6">
                {/* Bullet 1 */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 1:</p>
                  <p className="text-foreground italic mb-3">"Partnered with executives to design strategic modernization and adoption roadmaps, directly influencing the lifecycle and long-term engagement of a high-value B2B portfolio."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• "Partnered with executives" - how many? What level?</li>
                    <li>• "High-value B2B portfolio" - how many accounts? What $ value?</li>
                    <li>• "Directly influencing" - vague outcome, what actually changed?</li>
                    <li>• Too generic - could apply to anyone in CS</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Partnered with [NUMBER] C-level executives across [NUMBER] enterprise accounts ([$VALUE] ARR) to design strategic modernization roadmaps, achieving [%] feature adoption within [TIMEFRAME] and reducing time-to-value by [%].</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• First [NUMBER]: How many executives? (e.g., 10, 15+, 20)</li>
                      <li>• Second [NUMBER]: How many accounts? (e.g., 15, 25, 40+)</li>
                      <li>• [$VALUE]: Total contract value? (e.g., $10M, $15M, $20M+)</li>
                      <li>• [% adoption]: What adoption rate achieved? (e.g., 75%, 85%, 90%+)</li>
                      <li>• [TIMEFRAME]: How long did this take? (e.g., 3 months, 6 months, Q2)</li>
                      <li>• [% reduction]: How much faster? (e.g., 30%, 40%, 50%)</li>
                    </ul>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 2 (actually pretty good! Minor refinement):</p>
                  <p className="text-foreground italic mb-3">"Achieved 100% client renewals while surpassing 120% retention and growth, applying proactive, data-informed engagement strategies to sustain loyalty and expansion."</p>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Achieved 100% client renewals ([NUMBER]/[NUMBER] accounts) while exceeding 120% retention and growth targets, implementing proactive health scoring and engagement strategies to drive [$VALUE] in expansion revenue.</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• [NUMBER]/[NUMBER]: Actual count (e.g., 25/25, 30/30, 40/40)</li>
                      <li>• [$VALUE]: Expansion revenue generated (e.g., $2M+, $3M+, $5M+)</li>
                    </ul>
                    <p className="text-muted-foreground mt-2"><strong>Why better:</strong> Adds actual count to show "100%" isn't just 1 account. Adds $ impact to show business value. Mentions method: health scoring. More concrete and impressive.</p>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 3:</p>
                  <p className="text-foreground italic mb-3">"Led data-driven Business Reviews utilizing KPIs, usage analytics, and health scoring to identify high-value client/partner churn risks and pinpoint growth opportunities (directly analogous to driver retention planning)."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• "(directly analogous to driver retention planning)" - <strong>DELETE THIS</strong></li>
                    <li>• "Led Business Reviews" - how many? How often?</li>
                    <li>• "Identify risks and pinpoint opportunities" - vague, what decisions resulted?</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Conducted [FREQUENCY] Business Reviews for [NUMBER] enterprise accounts, utilizing KPI dashboards and usage analytics to identify churn risks and capture [$VALUE] in upsell opportunities, resulting in [%] increase in average account value.</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• [FREQUENCY]: How often? (e.g., quarterly, monthly, bi-monthly)</li>
                      <li>• [NUMBER]: How many accounts? (e.g., 20+, 25+, 30+)</li>
                      <li>• [$VALUE]: Upsell value captured (e.g., $1M+, $2M+, $3M+)</li>
                      <li>• [%]: Increase in account value (e.g., 10%, 15%, 20%)</li>
                    </ul>
                  </div>
                </div>

                {/* Bullet 4 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 4:</p>
                  <p className="text-foreground italic mb-3">"Project Leadership: Orchestrated cross-functional Engineering, Delivery, and Support teams to execute complex transformation projects, ensuring operational scalability and measurable business impact."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• "Orchestrated" is overused buzzword</li>
                    <li>• "Complex transformation projects" - vague, what projects?</li>
                    <li>• "Ensuring operational scalability" - generic outcome</li>
                    <li>• "Measurable business impact" - but no actual measurements given!</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Led [NUMBER] cross-functional transformation projects across Engineering, Delivery, and Support teams ([NUMBER] people per project), delivering [%] on-time completion rate and achieving [%] improvement in customer onboarding time.</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• First [NUMBER]: How many projects? (e.g., 6, 8, 10+)</li>
                      <li>• Second [NUMBER]: Team size per project (e.g., 10-12, 12-15, 15-20)</li>
                      <li>• First [%]: On-time rate (e.g., 90%, 95%, 100%)</li>
                      <li>• Second [%]: Improvement in onboarding (e.g., 25%, 30%, 40%)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* 6b. Business Excellence Operations */}
            <div className="border-t border-border pt-6">
              <h4 className="text-lg font-semibold text-foreground mb-4">6b. Business Excellence Operations | Microsoft Taiwan (Jun 2005 – Sep 2022)</h4>
              
              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <p className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-gold" /> What's Working
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• <strong>Shows longevity:</strong> 17 years at Microsoft before moving to CS role</li>
                    <li>• <strong>Different skill set:</strong> Forecasting, pipeline analytics, operational excellence</li>
                    <li>• <strong>Shows progression from operations to customer-facing role</strong></li>
                  </ul>
                </div>
                <div>
                  <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" /> What Needs Work
                  </p>
                  <p className="text-sm text-foreground font-semibold mb-2">Major Issues:</p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• <strong>1. 17 years collapsed into 4 bullets</strong> - This is way too little detail. Either break this into 2-3 sub-roles showing progression OR add 2-3 more bullets showing breadth of work</li>
                    <li>• <strong>2. Character encoding error:</strong> "leadership 的 strategic priorities" (的 is Chinese character)</li>
                    <li>• <strong>3. Bullets need more metrics and specifics</strong></li>
                  </ul>
                </div>
              </div>

              <div className="space-y-6">
                {/* Bullet 1 */}
                <div>
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 1:</p>
                  <p className="text-foreground italic mb-3">"Designed and deployed forecasting dashboards and robust pipeline analytics to inform strategic sales decisions, providing a strong foundation for demand-supply balancing and growth planning."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• "Designed and deployed" - how many dashboards?</li>
                    <li>• "Inform strategic sales decisions" - what decisions? What changed?</li>
                    <li>• "Providing foundation" - vague outcome</li>
                    <li>• No metrics or impact shown</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Designed and deployed [NUMBER] forecasting dashboards tracking [$VALUE] pipeline, used by [NUMBER] sales leaders to improve forecast accuracy by [%] and reduce sales cycle time by [NUMBER] days.</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• First [NUMBER]: How many dashboards? (e.g., 3, 5, 7)</li>
                      <li>• [$VALUE]: Pipeline value tracked (e.g., $30M+, $50M+, $100M+)</li>
                      <li>• Second [NUMBER]: How many users? (e.g., 30+, 40+, 50+)</li>
                      <li>• [%]: Accuracy improvement (e.g., 10%, 15%, 20%)</li>
                      <li>• Third [NUMBER]: Days reduced (e.g., 8, 10, 12)</li>
                    </ul>
                  </div>
                </div>

                {/* Bullet 2 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 2:</p>
                  <p className="text-foreground italic mb-3">"Managed and enforced Business Rhythm (RoB) processes, effectively aligning leadership 的 strategic priorities and optimizing resource allocation across high-impact operational teams."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• <strong>Character encoding error:</strong> "的" should be removed or replaced with English</li>
                    <li>• "Business Rhythm (RoB)" - unclear what this is</li>
                    <li>• "Effectively aligning" - how? What was the result?</li>
                    <li>• "High-impact operational teams" - which teams? How many people?</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Managed Business Rhythm (RoB) processes for [NUMBER] operational teams ([NUMBER] people), aligning strategic priorities across sales, services, and support organizations and improving cross-team collaboration efficiency by [%].</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• First [NUMBER]: How many teams? (e.g., 6, 8, 10)</li>
                      <li>• Second [NUMBER]: Total people (e.g., 100+, 120+, 150+)</li>
                      <li>• [%]: Efficiency improvement (e.g., 20%, 25%, 30%)</li>
                    </ul>
                  </div>
                </div>

                {/* Bullet 3 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 3 (pretty good! Just add scale):</p>
                  <p className="text-foreground italic mb-3">"Drove Operational Excellence improvements that reduced reporting time by 20%, directly increasing agility and data-driven responsiveness for customer-facing teams."</p>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Drove Operational Excellence improvements by automating manual reporting processes, reducing reporting time by 20% for [NUMBER] customer-facing team members and enabling real-time business intelligence dashboards.</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• [NUMBER]: How many people impacted? (e.g., 30+, 40+, 50+)</li>
                    </ul>
                  </div>
                </div>

                {/* Bullet 4 */}
                <div className="border-t border-border pt-4">
                  <p className="text-sm font-semibold text-foreground mb-2">Bullet 4:</p>
                  <p className="text-foreground italic mb-3">"Partnered with sales, services, and support organizations to streamline operations and enhance overall customer experience."</p>
                  
                  <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
                  <ul className="space-y-1 mb-3 text-foreground text-sm">
                    <li>• <strong>Most generic bullet on your entire resume</strong></li>
                    <li>• "Partnered to streamline and enhance" - everyone says this</li>
                    <li>• No specifics: what operations? What changed?</li>
                    <li>• No metrics or outcomes</li>
                    <li>• Could be deleted entirely without losing anything</li>
                  </ul>

                  <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-3">
                    <p className="text-sm font-semibold text-gold mb-2">✅ Rewrite:</p>
                    <p className="text-foreground text-sm">Led operational process redesign across sales, services, and support teams, consolidating [NUMBER] fragmented workflows into [NUMBER] standardized processes and reducing handoff errors by [%].</p>
                  </div>

                  <div className="bg-gold/10 rounded-lg p-3 text-sm">
                    <p className="font-semibold text-gold mb-1">💡 ACTION: Fill in:</p>
                    <ul className="text-foreground space-y-1">
                      <li>• First [NUMBER]: How many workflows before? (e.g., 10, 12, 15)</li>
                      <li>• Second [NUMBER]: How many after consolidation? (e.g., 3, 4, 5)</li>
                      <li>• [%]: Error reduction (e.g., 30%, 35%, 40%)</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Recommended Structure Change */}
              <div className="bg-gold/10 rounded-lg p-4 mt-6 border border-gold/20">
                <p className="text-sm font-semibold text-gold mb-3">💡 Recommended Structure Change:</p>
                
                <p className="text-sm text-foreground mb-2"><strong>Current structure:</strong></p>
                <p className="text-sm text-muted-foreground mb-4">Business Excellence Operations | Jun 2005 – Sep 2022 (17 years, 4 bullets)</p>
                
                <p className="text-sm text-foreground mb-2"><strong>Better structure option - Break into progression:</strong></p>
                <div className="bg-background rounded p-3 font-mono text-sm text-foreground mb-4">
                  <p className="font-bold">MICROSOFT TAIWAN | Jun 2005 – Aug 2025</p>
                  <p className="mt-2"><strong>Customer Success Account Manager | Sep 2022 – Aug 2025</strong></p>
                  <p className="text-muted-foreground">• [4 bullets as above, with improvements]</p>
                  <p className="mt-2"><strong>Senior Business Operations Manager | Jan 2018 – Sep 2022</strong></p>
                  <p className="text-muted-foreground">• [3-4 bullets showing senior operational work]</p>
                  <p className="mt-2"><strong>Business Operations Manager | Jun 2010 – Dec 2017</strong></p>
                  <p className="text-muted-foreground">• [2-3 bullets showing mid-level work]</p>
                  <p className="mt-2"><strong>Business Analyst | Jun 2005 – May 2010</strong></p>
                  <p className="text-muted-foreground">• [1-2 bullets showing early career foundation]</p>
                </div>
                
                <p className="text-sm text-muted-foreground mb-4"><strong>Why this is better:</strong> Clearly shows 20-year progression at one company (impressive!). Demonstrates growth: Analyst → Manager → Senior Manager → Account Manager. Explains why you have so much experience. More accurately represents your career arc.</p>
                
                <p className="text-sm text-foreground mb-2"><strong>Alternative if you don't remember exact dates:</strong></p>
                <div className="bg-background rounded p-3 font-mono text-sm text-foreground">
                  <p className="font-bold">MICROSOFT TAIWAN | Jun 2005 – Aug 2025</p>
                  <p className="mt-2"><strong>Customer Success Account Manager | Sep 2022 – Aug 2025</strong></p>
                  <p className="text-muted-foreground">• [4 improved bullets]</p>
                  <p className="mt-2"><strong>Business Excellence Operations (Multiple Roles) | Jun 2005 – Sep 2022</strong></p>
                  <p className="text-muted-foreground italic">Progressed from Business Analyst to Senior Operations Manager over 17 years</p>
                  <p className="text-muted-foreground">• [6-7 strongest operational bullets from entire period]</p>
                </div>
                <p className="text-sm text-muted-foreground mt-2">This approach acknowledges progression without requiring exact dates for every role change.</p>
              </div>

              <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
                <p className="text-sm text-foreground mb-2"><strong>Detail last 5 years; summarize beyond 10 years</strong> - For highly experienced candidates, provide full detail for recent roles but summarize or consolidate older work. Focus 80% of detail on the last 5-10 years to showcase most relevant skills and seniority.</p>
                <p className="text-sm text-foreground"><strong>Each bullet measurable and result-driven</strong> - Every bullet must include numbers showing scale (how many? how much?) and credibility (what changed? what improved?). Without metrics, accomplishments blend in with generic task descriptions.</p>
              </div>
            </div>
          </div>

          {/* 7. Certifications */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. Certifications</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Four Microsoft certifications: Shows continuous learning and technical aptitude</li>
                  <li>• Recent certification stack: Azure, M365, AI, Security all current technologies</li>
                  <li>• Relevant to tech roles: Demonstrates you understand cloud, AI, security landscape</li>
                  <li>• Microsoft-specific: Reinforces your company expertise</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>Missing dates:</strong> When did you get these certifications?</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">💡 How to Fix - Add years to show recency:</p>
              <div className="bg-background rounded p-3 font-mono text-sm text-foreground">
                <p className="font-bold mb-2">CERTIFICATIONS</p>
                <p>• Microsoft Certified: Azure Fundamentals (AZ-900), 2023</p>
                <p>• Microsoft Certified: Microsoft 365 Fundamentals (MS-900), 2023</p>
                <p>• Microsoft Certified: AI Fundamentals (AI-900), 2024</p>
                <p>• Microsoft Certified: Security, Compliance, and Identity Fundamentals (SC-900), 2024</p>
              </div>
              
              <p className="text-sm text-foreground mt-4"><strong>Why dates matter:</strong></p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Shows continuous learning (2023-2024)</li>
                <li>• Proves certifications are current, not expired</li>
                <li>• Demonstrates commitment to staying relevant</li>
                <li>• More recent certifications carry more weight</li>
              </ul>
              
              <p className="text-sm text-foreground mt-4"><strong>If you don't remember exact year:</strong></p>
              <ul className="text-sm text-muted-foreground mt-2 space-y-1">
                <li>• Use "2024" for all of them (assume recent unless you know otherwise)</li>
                <li>• OR just leave dates off if certifications are older than 3 years</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground"><strong>Include Only Relevant or Recent Certifications</strong> - Certifications should demonstrate real industry relevance, not filler content. Include certification dates to show recency and commitment to continuous learning. Certifications older than 3-5 years should generally be omitted unless highly prestigious.</p>
            </div>
          </div>

          {/* 8. Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">8. Education</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What's Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Clear degree and institution: Finance, National Taipei University of Business</li>
                  <li>• Relevant major: Finance is solid foundation for operations/business roles</li>
                  <li>• Clean format: Simple one-line listing</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needs Work
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• <strong>No additional details:</strong> GPA, honors, relevant coursework?</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/50 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-3">Should you add GPA or other details?</p>
              <p className="text-sm text-muted-foreground mb-3">With 20 years of experience, additional education details usually aren't necessary. Your work experience speaks for itself. <strong>ONLY add if:</strong></p>
              <ul className="text-sm text-foreground space-y-1 mb-4">
                <li>• GPA was 3.8+ / 4.0</li>
                <li>• You graduated with honors</li>
                <li>• You have relevant additional education (MBA, etc.)</li>
              </ul>
              <p className="text-sm text-muted-foreground"><strong>If you have an MBA or other degrees:</strong> List them here! Education section should include ALL degrees in reverse chronological order (newest first).</p>
            </div>

            <div className="bg-muted/30 rounded-lg p-4 border-l-4 border-muted-foreground">
              <p className="text-sm font-semibold text-foreground mb-2">📋 Principle:</p>
              <p className="text-sm text-foreground mb-2"><strong>List Education Last for Mid–Senior Roles</strong> - With 20 years of professional experience, Education must be the final section. Its purpose is to verify credentials, not to showcase early achievements. Work experience is far more relevant than academic history at this stage.</p>
              <p className="text-sm text-foreground"><strong>Clear, Relevant Education Placement</strong> - Education must be listed clearly with degree, institution, and graduation year so recruiters can instantly verify academic background. Missing key details causes confusion.</p>
            </div>
          </div>
        </section>

        {/* Before & After Showcase */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <RefreshCw className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Before & After Showcase</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">Let me show you the dramatic improvement when we apply these principles to your actual content.</p>

          {/* Example 1: Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Example 1: Professional Summary</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">BEFORE ❌</p>
              <p className="text-foreground text-sm italic">
                Senior Operations and Customer Success Account Manager with extensive experience in technology and digital transformation, specializing in supply growth, engagement, and retention strategies. Expertise in applying data-driven acquisition and lifecycle management principles to high-value client portfolios (directly applicable to platform earner/driver acquisition). Proven ability to orchestrate cross-functional teams (Engineering, Product, Support) to execute complex, large-scale initiatives, achieving 120%+ retention and growth in a fast-paced environment. Skilled in influencing C-level stakeholders and translating strategy into operational excellence to accelerate adoption and achieve measurable growth.
              </p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is weak:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• 🔴 6 lines - way too long, recruiters will skip</li>
                <li>• 🔴 Defensive tone with multiple analogies in parentheses</li>
                <li>• 🔴 Generic buzzwords: "extensive experience," "operational excellence," "fast-paced environment"</li>
                <li>• 🔴 Microsoft not mentioned (biggest selling point!)</li>
                <li>• 🔴 Top metrics buried in middle of paragraph</li>
                <li>• 🔴 Unclear what role you actually want</li>
              </ul>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">AFTER ✅</p>
              <p className="text-foreground text-sm italic">
                Senior Operations Manager with 20 years at Microsoft, driving growth strategy, client retention, and operational excellence. Delivered 120%+ portfolio growth with 100% renewals across [$VALUE] enterprise accounts. Expert in data-driven pipeline management, cross-functional team leadership, and strategic forecasting to achieve measurable business outcomes.
              </p>
              <p className="text-sm text-gold mt-3"><strong>💡 ACTION:</strong> Fill in [$VALUE] with your actual portfolio value (e.g., $10M+, $15M+, $20M+)</p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is strong:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• ✅ 4 lines - perfect length for scanning</li>
                <li>• ✅ Microsoft brand featured prominently</li>
                <li>• ✅ Top metrics in second line (120%, 100%)</li>
                <li>• ✅ Confident, clear positioning as Operations Manager</li>
                <li>• ✅ No defensive language or analogies</li>
                <li>• ✅ Specific expertise listed</li>
                <li>• ✅ Professional, senior-level tone</li>
              </ul>
            </div>
            
            <p className="text-sm text-foreground font-semibold">Impact: This rewrite makes you look like a strong candidate immediately instead of someone unsure if they're qualified.</p>
          </div>

          {/* Example 2: Key Achievements Bullet */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Example 2: Key Achievements Bullet</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">BEFORE ❌</p>
              <p className="text-foreground text-sm italic">
                Acquisition Strategy & Segmentation: Expanded platform opportunity capture by exceeding 120% new supply/account capture rate, utilizing data-driven funnel segmentation and targeted engagement-experience directly transferrable to driver acquisition.
              </p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is weak:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• 🔴 "Experience directly transferrable to driver acquisition" - screams pivoting/desperation</li>
                <li>• 🔴 "Expanded platform opportunity capture" - jargon, unclear</li>
                <li>• 🔴 Missing: How many accounts? From what starting point to what ending point?</li>
                <li>• 🔴 No timeframe given</li>
                <li>• 🔴 No business impact shown</li>
              </ul>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">AFTER ✅</p>
              <p className="text-foreground text-sm italic">
                Acquisition Strategy & Growth: Exceeded 120% new account acquisition target, expanding enterprise portfolio from [NUMBER] to [NUMBER] clients ([%] growth) in [TIMEFRAME] through data-driven funnel segmentation and targeted outreach.
              </p>
              <p className="text-sm text-gold mt-3"><strong>💡 ACTION:</strong> Fill in: First [NUMBER]: Starting count (e.g., 30, 40, 50). Second [NUMBER]: Ending count (e.g., 45, 55, 65). [%]: Growth percentage (e.g., 35%, 37%, 40%).</p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is strong:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• ✅ Removed defensive language about driver acquisition</li>
                <li>• ✅ Shows before/after with specific numbers</li>
                <li>• ✅ Includes timeframe</li>
                <li>• ✅ Clear growth percentage</li>
                <li>• ✅ Method mentioned but not overexplained</li>
                <li>• ✅ Confident, achievement-focused tone</li>
              </ul>
            </div>
            
            <p className="text-sm text-foreground font-semibold">Impact: The rewrite shows concrete results instead of claiming transferable experience. It lets recruiters draw their own conclusions.</p>
          </div>

          {/* Example 3: Work Experience Bullet */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="text-xl font-semibold text-foreground mb-4">Example 3: Work Experience Bullet</h3>
            
            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">BEFORE ❌</p>
              <p className="text-foreground text-sm italic">
                Partnered with executives to design strategic modernization and adoption roadmaps, directly influencing the lifecycle and long-term engagement of a high-value B2B portfolio.
              </p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is weak:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• 🔴 "Partnered with executives" - how many? What level?</li>
                <li>• 🔴 "High-value B2B portfolio" - how high? How many accounts?</li>
                <li>• 🔴 "Directly influencing" - vague, unmeasurable outcome</li>
                <li>• 🔴 No actual results shown</li>
                <li>• 🔴 Could describe anyone in customer success</li>
              </ul>
            </div>
            
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">AFTER ✅</p>
              <p className="text-foreground text-sm italic">
                Partnered with [NUMBER] C-level executives across [NUMBER] enterprise accounts ([$VALUE] ARR) to design strategic modernization roadmaps, achieving [%] feature adoption within [TIMEFRAME] and reducing time-to-value by [%].
              </p>
              <p className="text-sm text-gold mt-3"><strong>💡 ACTION:</strong> Fill in: First [NUMBER]: Executive count (e.g., 10+, 15+, 20+). Second [NUMBER]: Account count (e.g., 20, 25, 30+). [$VALUE]: Portfolio value (e.g., $10M+, $15M+, $20M+). First [%]: Adoption rate (e.g., 75%, 85%, 90%). Second [%]: Time reduction (e.g., 30%, 40%, 50%).</p>
              <p className="text-sm text-foreground mt-3"><strong>Why this is strong:</strong></p>
              <ul className="text-sm text-muted-foreground space-y-1 mt-2">
                <li>• ✅ Shows scale: executive count, account count, $ value</li>
                <li>• ✅ Specific level: C-level</li>
                <li>• ✅ Measurable outcomes: adoption % and time reduction</li>
                <li>• ✅ Includes timeframe</li>
                <li>• ✅ Shows both scope of influence AND business results</li>
                <li>• ✅ Significantly more impressive and credible</li>
              </ul>
            </div>
            
            <p className="text-sm text-foreground font-semibold">Impact: The rewrite transforms a generic statement into a powerful achievement that proves senior-level influence and measurable impact.</p>
          </div>
        </section>

        {/* ATS Compliance Check */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">ATS Compliance Check ✅</h2>
          </div>

          <div className="bg-card rounded-xl p-6 border border-border">
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
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Single-column layout: Yes, clean single column
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Standard fonts: Yes, professional font used
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  No graphics/tables: Yes, pure text format
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Keywords present: Yes, but could be stronger
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Proper section headings: Yes, all caps, clear
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Standard date format: Yes, consistent
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  No headers/footers with critical info: Correct
                </div>
                <div className="flex items-center gap-2 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Contact info at top: Yes, all present
                </div>
              </div>
            </div>

            <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
              <p className="text-sm font-semibold text-destructive mb-2">The one gap:</p>
              <p className="text-sm text-foreground mb-3">Your keyword density could be higher for operations/supply roles. Currently heavy on "Customer Success" language. If applying to ops roles, you'd benefit from adding these keywords naturally throughout:</p>
              
              <p className="text-sm font-semibold text-foreground mb-2">Operations keywords to add:</p>
              <div className="flex flex-wrap gap-2">
                {['Process optimization', 'Workflow efficiency', 'Resource allocation', 'Capacity planning', 'Performance metrics', 'Pipeline management (you have this)', 'Operational scalability (you have this)', 'Cross-functional coordination (you have this)'].map((keyword) => (
                  <span key={keyword} className="px-2 py-1 bg-background rounded text-xs text-foreground">
                    {keyword}
                  </span>
                ))}
              </div>
              
              <p className="text-sm text-muted-foreground mt-3">
                <strong>How to add them:</strong> Weave into your bullet rewrites. For example: "Led process optimization initiatives...", "Implemented workflow efficiency improvements...", "Managed resource allocation across..."
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
              <p className="text-sm font-semibold text-gold mb-4">Your Strengths vs. Competition:</p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">✅ 20 years at Microsoft</p>
                    <p className="text-sm text-muted-foreground">Most candidates have 5-10 years total experience across multiple companies. Your longevity demonstrates loyalty and deep institutional knowledge.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">✅ Impressive retention metrics</p>
                    <p className="text-sm text-muted-foreground">120%+ growth and 100% renewals are genuinely outstanding. Many ops managers struggle to quantify their impact this clearly.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">✅ C-level stakeholder management</p>
                    <p className="text-sm text-muted-foreground">Direct executive interaction is not universal, especially in operations roles. This differentiates you.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">✅ Cross-functional leadership</p>
                    <p className="text-sm text-muted-foreground">Coordinating Engineering, Product, Support shows you can work horizontally, a key ops skill.</p>
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
                    <p className="text-foreground font-medium">⚠️ Customer Success title</p>
                    <p className="text-sm text-muted-foreground">For pure operations roles, your most recent title (Customer Success Account Manager) may raise questions about fit. Operations Managers typically come from titles with "Operations," "Supply," "Program," or "Process" in the name.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">⚠️ Limited technical operations language</p>
                    <p className="text-sm text-muted-foreground">Your resume emphasizes client-facing work. Competitors may show more systems/process/analytical work.</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <AlertTriangle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-foreground font-medium">⚠️ No operational certifications</p>
                    <p className="text-sm text-muted-foreground">Many ops managers have Six Sigma, PMP, Lean, or similar process certifications. Your Microsoft certs are great for tech knowledge but don't signal operations expertise.</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* What Would Make You Top 10% */}
          <div className="bg-gold/10 rounded-xl p-6 mb-6 border border-gold/20">
            <p className="text-gold font-semibold mb-3">What Would Make You Top 10%:</p>
            <ol className="space-y-2 text-foreground list-decimal list-inside">
              <li><strong>Reframe as Operations Manager</strong> (remove Customer Success positioning)</li>
              <li><strong>Add 3-5 more operational metrics</strong> (efficiency %, cost savings, process improvements)</li>
              <li><strong>Consider getting Six Sigma Green Belt or similar</strong> (3-month online course)</li>
              <li><strong>Lead with operational achievements</strong> in summary and key achievements</li>
              <li><strong>Tailor for each specific company/role</strong> (add their language and priorities)</li>
            </ol>
          </div>

          {/* Market Expectations */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <p className="text-sm font-semibold text-foreground mb-4">Market Expectations for Senior Operations Manager Roles:</p>
            <div className="grid md:grid-cols-2 gap-4">
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  6-10 years experience (you have 20 ✅)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Proven portfolio/program management (you have this ✅)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Data-driven decision making (you have this ✅)
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <CheckCircle className="w-4 h-4 text-gold" />
                  Cross-functional leadership (you have this ✅)
                </li>
              </ul>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="w-4 h-4 text-gold" />
                  Process improvement expertise <strong>(you mention but don't emphasize ⚠️)</strong>
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="w-4 h-4 text-gold" />
                  Budget/resource management <strong>(not mentioned ⚠️)</strong>
                </li>
                <li className="flex items-center gap-2 text-foreground">
                  <AlertTriangle className="w-4 h-4 text-gold" />
                  Having too much experience can be a blocker sometimes <strong>⚠️</strong>
                </li>
              </ul>
            </div>
            <p className="text-sm text-foreground mt-4 font-semibold">Bottom line: You're competitive but need to reposition your narrative from Customer Success to Operations to crack the top tier of candidates.</p>
          </div>
        </section>

        {/* Next Steps / Action Plan */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Action Plan</h2>
          </div>

          {/* Original Resume Reference */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Lightbulb className="w-5 h-5 text-gold" />
              <h3 className="text-lg font-semibold text-foreground">Original Resume Reference</h3>
            </div>
            
            <div className="grid lg:grid-cols-3 gap-6">
              {/* Resume Images */}
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 border-b border-border">
                    <span className="text-sm font-medium text-foreground">Page 1</span>
                  </div>
                  <div className="p-2">
                    <img 
                      src="/reviews/charlene-lee-original.png" 
                      alt="Charlene Lee Resume - Page 1" 
                      className="w-full rounded-lg border border-border"
                    />
                  </div>
                </div>
                <div className="bg-card rounded-xl border border-border overflow-hidden">
                  <div className="bg-muted/50 px-4 py-2 border-b border-border">
                    <span className="text-sm font-medium text-foreground">Page 2</span>
                  </div>
                  <div className="p-2">
                    <img 
                      src="/reviews/charlene-lee-original-page2.png" 
                      alt="Charlene Lee Resume - Page 2" 
                      className="w-full rounded-lg border border-border"
                    />
                  </div>
                </div>
              </div>

              {/* Key Issues Summary */}
              <div className="space-y-4">
                <div className="bg-destructive/5 rounded-xl p-4 border border-destructive/20">
                  <p className="font-semibold text-destructive mb-3 flex items-center gap-2">
                    <XCircle className="w-4 h-4" />
                    Issues Found
                  </p>
                  <ul className="space-y-2 text-sm">
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">1</span>
                      <span className="text-foreground">Phone number formatting</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">2</span>
                      <span className="text-foreground">Character encoding error (的)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">3</span>
                      <span className="text-foreground">Defensive analogies throughout</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">4</span>
                      <span className="text-foreground">Missing job title under name</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">5</span>
                      <span className="text-foreground">Summary too long (6 lines)</span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="w-5 h-5 rounded-full bg-gold text-foreground text-xs flex items-center justify-center flex-shrink-0 mt-0.5">6</span>
                      <span className="text-foreground">Missing specific metrics</span>
                    </li>
                  </ul>
                </div>

                <div className="bg-gold/10 rounded-xl p-4 border border-gold/20">
                  <p className="font-semibold text-gold mb-3 flex items-center gap-2">
                    <CheckCircle className="w-4 h-4" />
                    After Fixes
                  </p>
                  <ul className="space-y-2 text-sm text-foreground">
                    <li>• +886 920 187 795</li>
                    <li>• Job title added under name</li>
                    <li>• All analogies removed</li>
                    <li>• Summary condensed to 4 lines</li>
                    <li>• Specific metrics added</li>
                    <li>• Professional, confident tone</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Wins - Priority Section */}
          <div className="bg-gradient-to-br from-gold/10 to-gold/5 rounded-xl p-6 mb-8 border-2 border-gold/30">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">Quick Wins</h3>
              <span className="px-2 py-0.5 bg-gold/20 text-gold text-xs font-semibold rounded-full">Start Here</span>
            </div>
            <p className="text-sm text-muted-foreground mb-5">4 changes for instant improvement</p>

            <div className="space-y-3">
              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Delete all parenthetical analogies</p>
                  <p className="text-sm text-muted-foreground">Find: "(directly applicable to", "(analogous to", "(mirroring". Delete everything in those parentheses.</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Fix character encoding error</p>
                  <p className="text-sm text-muted-foreground">Find: "leadership 的 strategic". Change to: "leadership strategic" or "leadership's strategic"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Add phone number spaces</p>
                  <p className="text-sm text-muted-foreground">Change: "886 920187795" to "+886 920 187 795"</p>
                </div>
              </label>

              <label className="flex items-start gap-3 bg-card p-4 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors border border-border">
                <input type="checkbox" className="mt-1 w-5 h-5 rounded border-border text-gold focus:ring-gold accent-gold" />
                <div>
                  <p className="text-foreground font-medium">Add job title under your name</p>
                  <p className="text-sm text-muted-foreground">CHARLENE LEE → Senior Operations Manager | Growth Strategy | Client Success</p>
                </div>
              </label>
            </div>
          </div>

          {/* Main Checklist Grid */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Summary & Key Achievements */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-foreground">Summary & Key Achievements</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Rewrite Professional Summary to 3-4 lines</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Rewrite all 5 Key Achievements bullets</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Add specific metrics using [PLACEHOLDER] format</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Save as: Charlene_Lee_Resume_v2.pdf</span>
                </label>
              </div>
            </div>

            {/* Recent Role */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-foreground">Recent Role (2022-2025)</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Rewrite all 4 bullets using CAR model</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Add scale metrics: # accounts, $ ARR, team sizes</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Add outcome metrics: % adoption, $ expansion</span>
                </label>
              </div>
            </div>

            {/* Operations Role */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <RefreshCw className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-foreground">Operations Role (2005-2022)</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Decide: break into sub-roles or keep as one</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Add 2-3 bullets showing operational breadth</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Rewrite existing 4 bullets with specific metrics</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Show progression across 17 years</span>
                </label>
              </div>
            </div>

            {/* ATS & Keywords */}
            <div className="bg-card rounded-xl p-5 border border-border">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-foreground">ATS & Keywords</h3>
              </div>
              <div className="space-y-2">
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Review 3-5 target job descriptions</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Add 5-10 operational keywords naturally</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Reorder Core Skills to match target role</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Ensure keywords in summary, skills, experience</span>
                </label>
              </div>
            </div>

            {/* Final Review - spans full width */}
            <div className="bg-card rounded-xl p-5 border border-border md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <Award className="w-4 h-4 text-gold" />
                <h3 className="font-semibold text-foreground">Final Review & Polish</h3>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-6 gap-y-2">
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Send to 2-3 trusted colleagues/mentors</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Ask: "Does this read as Operations Manager level?"</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Incorporate feedback</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Print and review on paper</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Read entire resume aloud</span>
                </label>
                <label className="flex items-start gap-3 p-2 rounded-lg cursor-pointer hover:bg-muted/50 transition-colors">
                  <input type="checkbox" className="mt-0.5 w-4 h-4 rounded border-border text-gold focus:ring-gold accent-gold" />
                  <span className="text-sm text-foreground">Proofread for typos and consistency</span>
                </label>
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
              <strong>Charlene, you have an incredibly strong foundation.</strong> Twenty years at Microsoft with 120%+ growth metrics and 100% renewal rates puts you in the top tier of operational professionals. The issue isn't your experience—it's how you're presenting it.
            </p>

            <p className="text-foreground font-semibold mb-3">The three biggest problems are:</p>
            <ol className="list-decimal list-inside space-y-2 mb-6 text-foreground">
              <li><strong>Over-explaining your pivot with analogies that actually hurt your credibility</strong></li>
              <li><strong>Missing critical metrics that would show scale and business impact</strong></li>
              <li><strong>Positioning yourself as Customer Success when you want Operations roles</strong></li>
            </ol>

            <p className="text-foreground leading-relaxed mb-6">
              <strong>The good news?</strong> All three are fixable in a weekend. Once you make these changes, you'll have a resume that:
            </p>

            <ul className="space-y-2 mb-6">
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Positions you clearly as a Senior Operations Manager</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Demonstrates 20 years of progressive Microsoft experience</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Shows quantified, impressive business results</strong>
              </li>
              <li className="flex items-start gap-3 text-foreground">
                <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                <strong>Competes for $120K-180K operations roles at top tech companies</strong>
              </li>
            </ul>

            <p className="text-foreground leading-relaxed mb-6">
              You don't need to apologize for your experience or explain why it's relevant. Your achievements speak for themselves. Trust them. Add the missing metrics. Let recruiters see your value immediately.
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
  );
};

export default CharleneLeeReview;
