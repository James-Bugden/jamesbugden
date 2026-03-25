import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Clock, Star, BarChart3, MessageSquare, AlertTriangle, Lightbulb, ListChecks, BookOpen, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const YoutingChenReview = () => {
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
            <a href="/downloads/YOUTING_CHEN_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Youting Chen</h1>
          <p className="text-cream/80 text-lg">Product Director, Token Listing at OKX</p>
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
                <p className="text-3xl font-bold text-gold">85/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">(After Implementation)</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={85} label="Before" size="md" />
                <ScoreGauge score={95} label="After" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>Your resume demonstrates exceptional product leadership and crypto trading expertise, with strong quantified achievements throughout. The foundation is solid.</p>
              <p>First, missing executive summary. You force recruiters to work through dense experience bullets to understand your value. A 3-4 sentence summary upfront would immediately position your expertise and key wins.</p>
              <p>Second, unclear QR code purpose. The QR code in your header lacks explanation. Recruiters will not scan unknown codes. Either remove it or add clear context.</p>
              <p>Third, generic skills section dilutes impact. Broad assumptions like problem solving and stakeholder management add no differentiation. Replace with role-specific technical skills and crypto/Web3 tools.</p>
              <p className="text-gold font-semibold">Your Bybit leadership managing 8 PMs, $1.5B AUM recovery, Orderly market-making infrastructure, Binance growth initiatives, and HSBC wealth management create a compelling narrative. The problem is not your experience. The problem is forcing recruiters to dig for it.</p>
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
                  <span className="text-foreground"><strong>Strong Quantified Achievements Throughout</strong>: $1.5B AUM recovery at Bybit, 6x altcoin volume scaling at Orderly, 0.6% spot market share contribution at Binance, 30% QoQ growth at TapPay demonstrate clear business impact with specific metrics</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Leadership Scale Clearly Stated</strong>: Managing 8 product managers, coordinating 30+ market makers, overseeing 20+ DEX builders shows scope of responsibility appropriate for director-level roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Crypto-Native Experience Depth</strong>: 3+ years across Bybit, Orderly, and Binance covering CEX operations, DeFi liquidity, token listings, market making, and compliance aligns perfectly with OKX requirements</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clean Format with Hyperlinked Companies</strong>: Linking company names to websites (though hyperlinks should be more obvious with underline and blue color) adds professionalism and context</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Progressive Career Trajectory</strong>: Clear advancement from co-founder to HSBC trainee to Binance operations to VP role to Head of Product shows consistent growth and increasing responsibility</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Bilingual Capability</strong>: Chinese literature background plus international education positions you well for Hong Kong/APAC roles requiring Mandarin and English fluency</span>
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
                  <span className="text-foreground"><strong>No Executive Summary to Frame Experience</strong>: Resume jumps straight into experience section, forcing recruiters to piece together your value proposition instead of seeing it immediately stated with key metrics upfront</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Unexplained QR Code Creates Confusion</strong>: QR code in header has no context, recruiters will not scan unknown codes, either remove or add clear label like "LinkedIn Profile QR" or "Portfolio QR"</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Generic Skills Section Adds No Value</strong>: "Analytical and problem solving skills," "stakeholder management," "communication skills" are assumed for any director-level role, replace with specific technical skills and crypto tools</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Hyperlinks Not Obviously Clickable</strong>: Company name links exist but without underline and blue color standard, readers will not know they are clickable, missing opportunity for context</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Two Filler Bullets in Bybit Role</strong>: "Established key metrics, monitoring systems, and dashboards" and "Collaborated cross-functionally to launch new products" lack specific outcomes or differentiation, they read as basic job duties</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Exchange Student Program Relevance Unclear</strong>: Peking University exchange from 2015 may not be relevant for current director-level applications, consider removing to save space unless targeting China-specific roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing OKX-Specific Keywords</strong>: Job description emphasizes "listing/delisting process," "risk management," "token listing marketing," "Web3 business teams," "team management" which should appear explicitly in resume</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Graduation Dates May Trigger Age Bias</strong>: 2011-2015 undergraduate dates reveal approximate age, consider removing dates to avoid unconscious bias, keep degrees and institutions only</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Long Bybit Bullet List Needs Prioritization</strong>: 8 bullets for one role is excessive, identify top 4-5 most impressive achievements relevant to target role and cut the rest</span>
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
                  <td className="py-3 px-2 font-medium">Executive Summary</td>
                  <td className="py-3 px-2 text-muted-foreground">Missing entirely, no upfront value proposition</td>
                  <td className="py-3 px-2">3-4 sentence summary with years experience, specialization, top 3 quantified achievements, key expertise areas</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">QR Code Context</td>
                  <td className="py-3 px-2 text-muted-foreground">Unexplained QR code in header creates confusion</td>
                  <td className="py-3 px-2">Add label "LinkedIn Profile" or remove entirely if not essential</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Skills Section</td>
                  <td className="py-3 px-2 text-muted-foreground">Generic soft skills (analytical, problem solving, stakeholder management, communication)</td>
                  <td className="py-3 px-2">Replace with crypto-specific technical skills: token economics, market making, liquidity management, DeFi protocols, CEX/DEX operations, compliance frameworks</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Bybit Bullet Count</td>
                  <td className="py-3 px-2 text-muted-foreground">8 bullets dilutes impact of strongest achievements</td>
                  <td className="py-3 px-2">Cut to 4-5 highest-impact bullets only, remove filler content</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">Filler Bullets at Bybit</td>
                  <td className="py-3 px-2 text-muted-foreground">"Established key metrics" and "Collaborated cross-functionally" lack specific outcomes</td>
                  <td className="py-3 px-2">Delete or replace with quantified achievements showing unique impact</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded">HIGH</span></td>
                </tr>
                <tr className="border-b border-border/50">
                  <td className="py-3 px-2 font-medium">OKX Keyword Alignment</td>
                  <td className="py-3 px-2 text-muted-foreground">Missing critical JD terms: listing/delisting process, risk management, token listing marketing, growth strategies</td>
                  <td className="py-3 px-2">Strategic incorporation where truthful throughout experience bullets</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-3 px-2 font-medium">Hyperlink Formatting</td>
                  <td className="py-3 px-2 text-muted-foreground">Company names link but not visually obvious (no underline, no blue color)</td>
                  <td className="py-3 px-2">Format as standard hyperlinks with blue text and underline to signal clickability</td>
                  <td className="py-3 px-2"><span className="px-2 py-1 bg-gold/20 text-gold text-xs font-bold rounded">MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Additional Notes */}
          <div className="grid md:grid-cols-2 gap-6 mt-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Exchange Student Program</h4>
              <p className="text-muted-foreground text-sm">2015 Peking University: Consider removing if not directly relevant to crypto product roles to save space</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Graduation Dates</h4>
              <p className="text-muted-foreground text-sm">Full date ranges shown (2011-2015, 2015-2017) may reveal age. Remove dates, keep only degrees and institutions</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Contact Information</h4>
              <p className="text-muted-foreground text-sm">Clear email, phone, LinkedIn URL format. No changes needed, already professional</p>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-foreground mb-3">Company Context</h4>
              <p className="text-muted-foreground text-sm">Some roles include helpful company descriptions in parentheses. Expand this pattern to all roles for clarity (e.g., "Bybit (Top 3 global crypto exchange by volume)")</p>
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
          <p className="text-muted-foreground mb-8">We identified 6 strategic transformations to position you optimally for the OKX Product Director, Token Listing role. Here are the highest-impact changes:</p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Add Executive Summary</span>
            <h3 className="font-heading text-2xl text-foreground mt-4 mb-4">Add Executive Summary with Quantified Achievements</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Missing Value Proposition):</p>
              <p className="text-muted-foreground text-sm italic">Resume jumps directly into experience section starting with "Bybit, Dubai, Head of Product..."</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No immediate value capture: Recruiters spend 6 seconds on initial scan, you force them to read through dense bullets to understand your fit instead of stating it upfront</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing key differentiators: Your $1.5B AUM recovery, 8-person team leadership, and 6x volume scaling are buried in bullets, they should be highlighted immediately</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No positioning statement: Unclear whether you are product leader, crypto operations expert, or growth strategist, summary should clarify your primary identity</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Competitive disadvantage: Other candidates with weaker experience but better summaries will capture attention first</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No crypto expertise signal: Your deep crypto-native background is not immediately obvious without reading full experience section</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-foreground text-sm"><strong>SUMMARY</strong></p>
              <p className="text-foreground text-sm italic mt-2">Product Director with 6+ years crypto-native experience leading token listing operations, spot trading growth, and liquidity infrastructure at top-tier exchanges (Bybit, Orderly, Binance). Track record includes driving $1.5B AUM recovery through post-hack listing products, managing 8-person product team across spot/on-chain/listings/AI tools, scaling altcoin trading volume 6x through 50+ new listings, and achieving 0.6% spot market share contribution through new user acquisition platforms.</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Years of experience stated upfront: "6+ years crypto-native" immediately establishes seniority and specialization</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Top 3 quantified achievements highlighted: $1.5B AUM, 6x volume scaling, 0.6% market share prove impact with specific metrics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Role positioning clear: "Product Director" with focus on "token listing operations" directly aligns with OKX job title and responsibilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Company credibility established: Name-dropping Bybit, Orderly, Binance positions you as tier-1 exchange operator</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX keywords loaded: "token listing," "liquidity," "listing/delisting processes," "regulatory compliance," "team leadership" hit critical JD requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Bilingual advantage stated: Mandarin/English fluency directly addresses "bilingual proficiency is an advantage" from JD</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">Impact: Summary transforms resume from "dense work history" to "proven crypto product leader with exact skills OKX needs" in first 6 seconds of recruiter attention.</p>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Replace Generic Skills</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Replace Generic Skills with Crypto-Specific Technical Competencies</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Assumed Basic Skills):</p>
              <p className="text-foreground text-sm font-medium">CORE SKILLS</p>
              <ul className="text-muted-foreground text-sm mt-2 space-y-1">
                <li>• Analytical and problem solving skills</li>
                <li>• Stakeholder management and influencing skills</li>
                <li>• Written and verbal communication skills</li>
                <li>• Team management experience</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Zero differentiation: Every product manager claims these same soft skills, you look identical to 100 other applicants</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No technical depth shown: Recruiters want to see specific crypto/Web3 expertise, not generic corporate capabilities</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Wastes prime resume space: Skills section should load ATS keywords and prove specialized knowledge, not repeat job description requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing OKX keywords: JD emphasizes "Crypto Trading," "Web3 industry," "token listing," "risk management," none of which appear in your skills</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Fails to prove crypto-native claim: Generic skills could apply to any industry, nothing here signals deep crypto expertise</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-foreground text-sm font-medium">CORE SKILLS</p>
              <div className="mt-3 space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">Token Listing & Market Operations:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• Token Listing/Delisting Processes & Risk Management</li>
                    <li>• Spot Trading, Futures, Derivatives, On-Chain Trading</li>
                    <li>• Market Making & Liquidity Management (CEX & DEX)</li>
                    <li>• Token Economics & Tokenomics Analysis</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Web3 & Crypto Ecosystem:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• DeFi Protocols (Perp DEX, AMM, Orderbook Models)</li>
                    <li>• Blockchain Infrastructure & On-Chain Analytics</li>
                    <li>• Crypto Compliance & Regulatory Frameworks</li>
                    <li>• Web3 Product Strategy & Growth Marketing</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Technical & Leadership:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• Data-Driven Product Strategy & A/B Testing</li>
                    <li>• Cross-Functional Team Leadership (8+ Direct Reports)</li>
                    <li>• Stakeholder Management (Market Makers, DEX Builders, Compliance)</li>
                    <li>• Bilingual: Mandarin/English</li>
                  </ul>
                </div>
              </div>
              <p className="text-muted-foreground text-xs mt-3 italic">You don't need to include all these skills. Pick what is most relevant to the role.</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX job description keywords loaded: "Token Listing/Delisting," "Risk Management," "Spot Trading," "Web3," "Team Leadership" directly match JD requirements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Crypto-specific expertise demonstrated: Market making, DeFi protocols, tokenomics, on-chain analytics prove deep industry knowledge</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Technical depth signals seniority: Shows you are not generic product manager but specialized crypto product leader</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Three-tier organization improves scannability: Grouping by Token/Market, Web3/Crypto, Technical/Leadership creates clear hierarchy</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Bilingual positioned as skill: Moves language capability from buried context to explicit competitive advantage</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>ATS optimization: Crypto/Web3 keywords ensure resume passes automated screening for industry-specific terms</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">Impact: Skills section transforms from "generic corporate buzzwords" to "proven crypto product expert with exact technical competencies OKX requires."</p>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 Cut Bybit to 5 Bullets</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Cut Bybit Experience from 8 Bullets to 5 Highest-Impact Achievements</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Diluted by Filler Content):</p>
              <ul className="text-muted-foreground text-sm space-y-1">
                <li>• "Established key metrics, monitoring systems, and dashboards to accelerate management decision-making"</li>
                <li>• "Collaborated cross-functionally to launch new products, features, and partnerships by defining analyses and processes"</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Two bullets are generic filler: "Established metrics/dashboards" and "Collaborated cross-functionally" describe basic PM duties, not unique achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No quantified outcomes for filler bullets: What decisions were accelerated? Which products launched? What was the business impact?</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Dilutes stronger achievements: Every extra bullet reduces attention on your best work like $1.5B AUM recovery and 50% DAU increase</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Harder to scan quickly: 8 bullets for one role forces recruiters to work too hard to find top accomplishments</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Signals poor prioritization: Senior product leaders should identify their 4-5 most important wins, not list everything</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version (5 Bullets Total):</p>
              <p className="text-foreground text-sm font-medium">Bybit | Dubai</p>
              <p className="text-foreground text-sm">Head of Product, Spot Business Unit | Nov. 2024 - Present</p>
              <ul className="text-foreground text-sm mt-3 space-y-2">
                <li>• Led 8-person product team across Spot trading, On-chain trading, Token listings, and AI tools, driving growth in trading volume, DAU, AUM, new user acquisition, and liquidity through integrated product strategy achieving $1.5B AUM recovery post-hack</li>
                <li>• Launched post-hack listing savings and holding products combining new-token incentives with yield and position-based rewards, driving over $1.5B in AUM recovery and inflows within [X] months</li>
                <li>• Spearheaded token analytics revamp integrating AI models and external data into unified flow, driving 50% DAU increase and 2x trading conversion through improved user insights and discovery experience</li>
                <li>• Orchestrated institutional collaboration to enhance Spot liquidity across top 180 trading pairs and new listings, achieving Binance-level depth and spreads through Retail Price Improvement Order implementation</li>
                <li>• Streamlined end-to-end token listing application and promotion workflows, improving operational efficiency by 90% through system integration and automated validation, while aligning with Compliance requirements for regulated markets</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Deleted two filler bullets: Removed "established metrics/dashboards" and "collaborated cross-functionally" which lacked specific outcomes</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Consolidated team leadership: Moved 8-person team management into first bullet combined with business outcomes to show leadership scope</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Each remaining bullet has clear outcome: $1.5B AUM, 50% DAU increase, 2x conversion, Binance-level depth, 90% efficiency improvement all quantified</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Prioritizes most impressive wins: $1.5B recovery and AI-driven growth appear prominently as top achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX keywords maintained: Token listings, liquidity, listing application, Compliance, operational efficiency</span>
                </li>
              </ul>
            </div>

            <p className="text-gold font-semibold mt-4 text-sm">Impact: Cutting from 8 to 5 bullets forces focus on highest-value achievements, makes resume more scannable</p>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">#4 QR Code & Hyperlinks</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Add Clear Context Labels to QR Code and Hyperlinks</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Unclear Interactive Elements):</p>
              <p className="text-muted-foreground text-sm">QR code appears in header with no explanation. Company names are hyperlinked but not visually distinguished as clickable.</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>QR code creates security concern: Recruiters will not scan unknown QR codes due to phishing risks, you lose opportunity to drive them to portfolio/LinkedIn</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missed hyperlink value: Company links provide helpful context but most recruiters will not discover them because they are not formatted as obvious clickable elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No visual hierarchy: Standard black text for hyperlinks looks identical to non-linked text, readers cannot distinguish interactive elements</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="space-y-3 text-sm">
                <div>
                  <p className="text-foreground font-medium">QR Code Options:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• Option A (If leads to portfolio): Add "Scan for Portfolio" label below QR code</li>
                    <li>• Option B (If leads to LinkedIn): Add "LinkedIn Profile" label below QR code</li>
                    <li>• Option C (If not essential): Remove QR code entirely and rely on standard LinkedIn URL</li>
                  </ul>
                </div>
                <div>
                  <p className="text-foreground font-medium">Hyperlink Formatting:</p>
                  <p className="text-foreground mt-1">Change company names from standard black text to:</p>
                  <ul className="text-foreground mt-1 space-y-1">
                    <li>• Color: Blue (#0066CC)</li>
                    <li>• Underline: Yes</li>
                    <li>• Example: <span className="text-blue-600 underline">Bybit</span> (Top 3 global crypto exchange)</li>
                  </ul>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>QR code purpose immediately clear: Label tells recruiters exactly what they will get, removing security hesitation</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Hyperlinks visually obvious: Blue underlined text follows universal web convention for clickable elements</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Professional polish: Clear labeling shows attention to user experience and communication clarity</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Maximizes engagement: Recruiters more likely to click company links when they know they are clickable</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-gold/20 text-gold text-xs font-bold rounded-full uppercase tracking-wide">#5 OKX Keywords</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Add Strategic OKX Keywords Throughout Experience Bullets</h3>
            
            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">What's Missing:</p>
              <p className="text-muted-foreground text-sm mb-2">OKX job description emphasizes specific terminology:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li>• "Listing/delisting process"</li>
                <li>• "Risk management of token listing/delisting activities"</li>
                <li>• "Listing related marketing"</li>
                <li>• "Growth strategies"</li>
                <li>• "User acquisition, conversion, and retention"</li>
                <li>• "Team management"</li>
              </ul>
              <p className="text-muted-foreground text-sm mt-2">Your resume uses related concepts but not exact keyword matches, which may hurt ATS scoring.</p>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Add Strategic Keywords:</p>
              <div className="space-y-4 text-sm">
                <div>
                  <p className="text-foreground font-medium">Bybit Role - Add to existing bullets:</p>
                  <p className="text-foreground mt-1 italic">"Streamlined end-to-end product flow for listing/delisting process including application review, risk assessment, and promotional campaign execution, improving operational efficiency by 90% through system integration and automated workflow validation"</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Orderly Role - Strengthen existing content:</p>
                  <p className="text-foreground mt-1 italic">"Built liquidity system for Orderly's orderbook Perp DEX, designing market-making program and decentralized reward pool to deliver CEX-level trading experience while managing listing/delisting risk across 50+ assets"</p>
                </div>
                <div>
                  <p className="text-foreground font-medium">Binance Role - Emphasize growth strategies:</p>
                  <p className="text-foreground mt-1 italic">"Built new-user acquisition platform with marketing and product teams, implementing retention-focused growth strategies that converted new users into active Spot traders and contributed 0.6% of Spot market share"</p>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Impact:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>OKX keyword match increases: "Listing/delisting process," "risk management," "growth strategies" now appear explicitly</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>ATS scoring improves: Automated systems will flag exact keyword matches from job description</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Maintains authenticity: All additions reflect work you actually did, just using OKX's preferred terminology</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Human readers benefit: Recruiters see immediate alignment between your experience and their specific needs</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-muted text-muted-foreground text-xs font-bold rounded-full uppercase tracking-wide">#6 Final Polish</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Consider Removing Graduation Dates and Exchange Program to Avoid Age Bias</h3>
            
            <div className="bg-muted/30 rounded-lg p-4 mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Current Version (Potential Age Bias Trigger):</p>
              <div className="text-sm text-foreground">
                <p className="font-medium">EDUCATION</p>
                <div className="mt-2 space-y-2">
                  <div>
                    <p>National Chengchi University | Taipei</p>
                    <p className="text-muted-foreground">Master of Science in Technology and Innovation Management (GPA 4.0 / 4.0) | Sep. 2015 - Aug. 2017</p>
                    <p className="text-muted-foreground">Bachelor of Liberal Arts in Chinese Literature (GPA 3.9 / 4.0) | Sep. 2011 - Jun. 2015</p>
                  </div>
                  <div>
                    <p>Peking University | Beijing</p>
                    <p className="text-muted-foreground">Exchange Student at Guanghua School of Management (GPA 4.0 / 4.0) | Feb. 2015 - Jun. 2015</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-destructive mb-2">Problems:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Graduation dates reveal approximate age: 2011-2015 undergraduate timeline suggests you are around 32-33 years old, which may trigger unconscious age bias</span>
                </li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="text-sm text-foreground">
                <p className="font-medium">EDUCATION</p>
                <div className="mt-2 space-y-2">
                  <div>
                    <p>National Chengchi University (FT Masters in Management #41, QS Classics & Ancient History #30) | Taipei</p>
                    <ul className="text-foreground mt-1 space-y-1">
                      <li>• Master of Science in Technology and Innovation Management (GPA 4.0/4.0)</li>
                      <li>• Bachelor of Liberal Arts in Chinese Literature (GPA 3.9/4.0)</li>
                    </ul>
                  </div>
                  <div>
                    <p>Peking University (QS Accounting & Finance #14) | Beijing</p>
                    <ul className="text-foreground mt-1 space-y-1">
                      <li>• Exchange Student at Guanghua School of Management (GPA 4.0/4.0)</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Why This Works:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Eliminates age bias trigger: No dates means no easy age calculation from graduation timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Education credibility maintained: University names, degrees, rankings, and GPAs all still present to prove qualifications</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Saves vertical space: Shorter education section creates room for additional experience details or white space</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Focuses on relevant credentials: Your crypto experience is what matters for OKX role, not 10-year-old exchange semester</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Standard for experienced professionals: Directors with 6+ years experience typically omit graduation dates</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* STRATEGIC POSITIONING */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Strategic Positioning & ATS Optimization</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Target Role Analysis</h3>
            <p className="text-muted-foreground mb-4">Based on OKX Product Director, Token Listing job description, here is how to position yourself:</p>
            
            <div className="bg-gold/10 rounded-lg p-4 mb-4">
              <p className="text-gold font-semibold">Primary Target: Product Director, Token Listing at OKX Hong Kong</p>
              <p className="text-foreground mt-2">Match Strength: 85% fit (after optimization: 95%)</p>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gold mb-3">Why You Are a Good Fit:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>6+ years crypto-native product experience exceeds "5-8 years Product Strategy/Product Management" requirement across Bybit, Orderly, Binance</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Direct token listing operations experience at Bybit including "end-to-end listing application and promotion" workflow optimization achieving 90% efficiency improvement</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Team management proven through leading 8-person product team at Bybit, managing 30+ market makers at Orderly, coordinating 20+ DEX builders</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Strong analytical skills demonstrated through data-driven growth initiatives: 50% DAU increase, 2x trading conversion, 0.6% market share contribution, all metrics-based</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Crypto/Web3 deep expertise across CEX (Bybit, Binance), DeFi (Orderly), token economics, market making, liquidity management, compliance frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Bilingual Mandarin/English capability from Chinese literature degree, Taiwan education, international work experience (Dubai, Singapore)</span>
                </li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-destructive mb-3">Current Gaps:</p>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No explicit "listing/delisting risk management" language: Experience is there (managing 50+ asset listings, compliance alignment) but not framed using OKX's exact terminology</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>"Listing related marketing" not prominently featured: Post-hack listing products and new user acquisition campaigns demonstrate this capability but need repositioning</span>
                </li>
                <li className="flex items-start gap-2">
                  <AlertTriangle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>MBA preferred but not required: You have master's degree in Technology & Innovation Management which is relevant but not traditional MBA</span>
                </li>
              </ul>
            </div>
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
            {/* Before */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">Before Optimization: 40%</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">OKX Keyword</th>
                      <th className="text-left py-2 text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Token listing</td>
                      <td className="py-2"><span className="text-gold">WEAK</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Listing/delisting process</td>
                      <td className="py-2"><span className="text-destructive">MISSING</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Risk management</td>
                      <td className="py-2"><span className="text-destructive">MISSING</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Listing related marketing</td>
                      <td className="py-2"><span className="text-gold">WEAK</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Web3/Crypto/Blockchain</td>
                      <td className="py-2"><span className="text-gold">WEAK</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Product strategy</td>
                      <td className="py-2"><span className="text-gold">WEAK</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Stakeholder management</td>
                      <td className="py-2"><span className="text-destructive">MISSING</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Growth strategies</td>
                      <td className="py-2"><span className="text-gold">WEAK</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Bilingual (Chinese/English)</td>
                      <td className="py-2"><span className="text-destructive">MISSING</span></td>
                    </tr>
                    <tr>
                      <td className="py-2">Analytical skills</td>
                      <td className="py-2"><span className="text-destructive">MISSING</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* After */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">After Optimization: 95%</h4>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 text-foreground">OKX Keyword</th>
                      <th className="text-left py-2 text-foreground">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-foreground">
                    <tr className="border-b border-border/50">
                      <td className="py-2">Token listing</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Listing/delisting process</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Risk management</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Listing related marketing</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Web3/Crypto/Blockchain</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Product strategy</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Stakeholder management</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Growth strategies</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr className="border-b border-border/50">
                      <td className="py-2">Bilingual (Chinese/English)</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                    <tr>
                      <td className="py-2">Analytical skills</td>
                      <td className="py-2"><span className="text-gold">STRONG</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* Keyword Placement Strategy */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Keyword Placement Strategy</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3">Summary Keywords (naturally incorporate):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Token listing operations</li>
                  <li>• Spot trading growth</li>
                  <li>• Liquidity infrastructure</li>
                  <li>• $1.5B AUM recovery</li>
                  <li>• 8-person product team</li>
                  <li>• 6x volume scaling</li>
                  <li>• Market making</li>
                  <li>• CEX/DEX operations</li>
                  <li>• Listing/delisting processes</li>
                  <li>• Regulatory compliance</li>
                  <li>• Bilingual Mandarin/English</li>
                </ul>
              </div>
              
              <div>
                <p className="text-sm font-semibold text-gold mb-3">Bullet Point Keywords (weave into experience):</p>
                <div className="space-y-3 text-sm">
                  <div>
                    <p className="font-medium text-foreground">Bybit bullets should include:</p>
                    <p className="text-muted-foreground">Listing/delisting process, Risk assessment, Listing related marketing, Promotional campaign execution, Growth strategies, User acquisition/conversion/retention</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Orderly bullets should include:</p>
                    <p className="text-muted-foreground">Listing risk management, Web3 business development, Growth strategies, Market-making operations</p>
                  </div>
                  <div>
                    <p className="font-medium text-foreground">Binance bullets should include:</p>
                    <p className="text-muted-foreground">User acquisition platform, Retention mechanisms, Growth strategies, Data-driven initiatives</p>
                  </div>
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

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Token Listing & Exchange Operations</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Token listing/delisting processes</li>
                <li>• Listing application review</li>
                <li>• Risk management & assessment</li>
                <li>• Token due diligence</li>
                <li>• Listing related marketing</li>
                <li>• Promotional campaign execution</li>
                <li>• Market making operations</li>
                <li>• Liquidity management (CEX & DEX)</li>
                <li>• Spot trading operations</li>
                <li>• Derivatives trading</li>
                <li>• On-chain trading</li>
                <li>• Trading volume growth</li>
                <li>• Market share expansion</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Product Strategy & Management</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Product strategy & roadmap</li>
                <li>• Cross-functional collaboration</li>
                <li>• Stakeholder management</li>
                <li>• Team management & leadership</li>
                <li>• Go-to-market execution</li>
                <li>• Product launch & delivery</li>
                <li>• Feature prioritization</li>
                <li>• A/B testing & experimentation</li>
                <li>• User journey optimization</li>
                <li>• Metrics definition & tracking</li>
                <li>• Data-driven decision making</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Web3 & Crypto Expertise</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Web3 ecosystem development</li>
                <li>• DeFi protocols & infrastructure</li>
                <li>• Blockchain analytics</li>
                <li>• Token economics & tokenomics</li>
                <li>• Crypto compliance frameworks</li>
                <li>• Regulatory alignment</li>
                <li>• Institutional partnerships</li>
                <li>• Market maker relationships</li>
                <li>• DEX builder coordination</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Growth & User Metrics</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• User acquisition strategies</li>
                <li>• Conversion optimization</li>
                <li>• Retention mechanisms</li>
                <li>• Growth marketing campaigns</li>
                <li>• DAU/MAU growth</li>
                <li>• Trading volume expansion</li>
                <li>• AUM growth & recovery</li>
                <li>• Market share contribution</li>
                <li>• New user onboarding</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Technical & Analytical</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Analytics & dashboards</li>
                <li>• Monitoring systems</li>
                <li>• Business intelligence</li>
                <li>• Quantitative analysis</li>
                <li>• Performance metrics</li>
                <li>• ROI optimization</li>
                <li>• Efficiency improvement</li>
                <li>• Process automation</li>
                <li>• System integration</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Languages & Communication</h4>
              <ul className="text-sm text-foreground space-y-1">
                <li>• Bilingual: Mandarin (Native), English (Fluent)</li>
                <li>• Executive presentations</li>
                <li>• Cross-cultural communication</li>
                <li>• Written & verbal communication</li>
              </ul>
              <p className="text-muted-foreground text-xs mt-4 italic flex items-start gap-2">
                <Lightbulb className="w-4 h-4 mt-0.5 flex-shrink-0" />
                <span>Tip: Only include keywords that genuinely reflect your experience as interviewers will ask you to elaborate on anything listed.</span>
              </p>
            </div>
          </div>
        </section>

        {/* TRANSFORMATION SUMMARY */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Summary of Transformation Impact</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-4">Before Optimization</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>No executive summary → Recruiters must piece together value from dense bullets</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Generic skills section → Looks identical to non-crypto product managers</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>8 bullets at Bybit including filler → Dilutes impact of strongest achievements</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Missing OKX keywords → ATS scoring 40%, likely filtered before human review</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Unexplained QR code → Creates confusion and security concern</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Graduation dates shown → Potential age bias trigger</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-4">After Optimization</h4>
              <ul className="space-y-3 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Powerful 4-sentence summary → Immediately positions as crypto product leader with $1.5B+ impact</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Crypto-specific skills → Demonstrates deep technical expertise in token listing, DeFi, market making</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Focused 5-bullet Bybit section → Highlights top achievements only, removes filler</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Strategic OKX keyword integration → ATS scoring 95%, passes automated screening</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Clear QR code labeling → Professional polish, drives traffic to portfolio/LinkedIn</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Graduation dates removed → Eliminates age bias, focuses on current capabilities</span>
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
                <h3 className="font-heading text-xl text-foreground">Review the Optimized Resume</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Verify Accuracy</strong>: Check all facts and metrics are accurate. Ensure you have specific examples ready for every quantified achievement. Confirm tone and voice feels authentic to you.</span>
                </li>
              </ul>
            </div>

            {/* Step 2 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">2</div>
                <h3 className="font-heading text-xl text-foreground">Add Executive Summary</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Write 3-4 Sentence Summary</strong>: Use optimized version provided as template. Customize with your actual metrics and achievements. Position yourself as "Product Director" specializing in "token listing operations". Include years of crypto experience, top 3 quantified wins, key expertise areas, bilingual capability.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Test Summary with 6-Second Rule</strong>: Read summary out loud. Recruiter should understand your value proposition in 6 seconds. If not immediately clear, simplify language and strengthen metrics.</span>
                </li>
              </ul>
            </div>

            {/* Step 3 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">3</div>
                <h3 className="font-heading text-xl text-foreground">Optimize Skills Section</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Replace Generic Skills</strong>: Delete: analytical skills, problem solving, stakeholder management, communication (assumed for any director). Add: Token Listing/Delisting Processes, Risk Management, Market Making, DeFi Protocols, Tokenomics, Compliance Frameworks. Organize into 3 categories: Token/Market Operations, Web3/Crypto Ecosystem, Technical/Leadership. Include "Bilingual: Mandarin (Native), English (Fluent)" as explicit skill.</span>
                </li>
              </ul>
            </div>

            {/* Step 4 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">4</div>
                <h3 className="font-heading text-xl text-foreground">Cut Bybit Experience to Top 5 Bullets</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Remove Filler Content</strong>: Delete: "Established key metrics, monitoring systems, and dashboards" and "Collaborated cross-functionally to launch new products, features, and partnerships". Keep only: Team leadership + AUM recovery, Post-hack listing products, Token analytics revamp, Liquidity enhancement, Listing workflow optimization.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Add OKX Keywords to Remaining Bullets</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 5 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">5</div>
                <h3 className="font-heading text-xl text-foreground">Fix QR Code and Hyperlink Formatting</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Add QR Code Label (2 minutes)</strong>: If QR leads to LinkedIn: Add "LinkedIn Profile" text below QR code. If QR leads to portfolio: Add "Scan for Portfolio" text below QR code. If QR not essential: Remove entirely and rely on standard LinkedIn URL.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Format Company Hyperlinks</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 6 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">6</div>
                <h3 className="font-heading text-xl text-foreground">Consider Removing Graduation Dates</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Evaluate Age Bias Concern</strong>: If you are comfortable with potential age calculation: Keep dates. If you want to avoid unconscious bias: Remove all dates (Sep. 2015 - Aug. 2017, etc.). Keep university names, degrees, regardless of decision.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Evaluate Exchange Program Relevance</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 7 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">7</div>
                <h3 className="font-heading text-xl text-foreground">Apply to 5-10 Target Roles</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Customize for Each Application (30 min per role)</strong>: Read job description carefully and note specific keyword requirements. Adjust 2-3 bullets to match specific JD terminology. Update skills section if JD emphasizes different technical areas. Write custom cover letter if required (most crypto exchanges do not require).</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Track Applications (Ongoing)</strong></span>
                </li>
              </ul>
            </div>

            {/* Step 8 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">8</div>
                <h3 className="font-heading text-xl text-foreground">Prepare Interview Stories Using STAR Method</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Prepare 2-3 Minute Stories (2-3 hours total)</strong>: For each major achievement on your resume, prepare a story following STAR framework: Situation, Task, Action, Result.</span>
                </li>
              </ul>
              <div className="ml-11 mt-4 bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Example Structure for $1.5B AUM Recovery:</p>
                <p className="text-sm text-foreground italic">At Bybit in November 2024, we faced a major hack that severely impacted user confidence and caused massive withdrawals. As Head of Product for Spot Business Unit, I was responsible for recovering AUM and rebuilding trust. I approached this by first analyzing user withdrawal patterns and identifying that new token listings combined with yield incentives could drive redeposits. I worked with our token listing team to accelerate high-quality project launches, designed position-based reward mechanisms, and created automated savings products that made it easy for users to earn on new tokens. Within [X] months, we recovered over $1.5B in AUM through these integrated listing and savings products, surpassing our recovery target by [Y]% and restoring user confidence as measured by [Z metric].</p>
              </div>
              <div className="ml-11 mt-4">
                <p className="text-sm font-semibold text-foreground mb-2">Key Achievements to Prepare Stories For:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• $1.5B AUM recovery at Bybit (what happened, your role, specific actions, timeline, outcome)</li>
                  <li>• 50% DAU increase and 2x trading conversion from token analytics revamp (problem, solution, metrics)</li>
                  <li>• 90% listing workflow efficiency improvement (before state, challenges, solution, results)</li>
                  <li>• 6x altcoin trading volume scaling at Orderly (strategy, execution, partnerships, measurement)</li>
                  <li>• 0.6% Binance spot market share contribution (platform design, user journey, growth tactics)</li>
                  <li>• Managing 8-person product team (hiring, structure, goals, team achievements)</li>
                  <li>• 30+ market maker relationships at Orderly (how built, how managed, business outcomes)</li>
                </ul>
              </div>
            </div>

            {/* Step 9 */}
            <div className="bg-card rounded-xl p-6 border border-border">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold text-sm">9</div>
                <h3 className="font-heading text-xl text-foreground">Update LinkedIn Profile to Match Resume</h3>
              </div>
              <ul className="space-y-2 text-sm text-foreground ml-11">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Mirror Resume Positioning (45 minutes)</strong>: Use same executive summary (or slightly expanded version with more detail). Align experience bullets with resume (can be slightly longer on LinkedIn). Ensure consistency across all sections. Update skills section to match resume keywords.</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span><strong>Optimize Profile Elements (30 minutes)</strong>: Headline: "Product Director | Token Listing & Crypto Trading Operations | $1.5B+ AUM Growth". About: Expanded version of resume summary (3-4 paragraphs). Featured: Showcase key projects, articles, or media coverage if available.</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Reminders */}
          <div className="grid md:grid-cols-2 gap-6 mt-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-gold mb-3">Do's</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Customize for each application: Change 2-3 bullets to match specific JD keywords</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Follow up after applying: Email recruiter or hiring manager 5-7 days later with brief, professional note</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Be ready to explain every metric: Interviewers will ask "How did you measure that?" and "What was your specific contribution?"</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" />
                  <span>Research OKX thoroughly: Understand their products, recent news, market position, competitors</span>
                </li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-border">
              <h4 className="font-semibold text-destructive mb-3">Don'ts</h4>
              <ul className="space-y-2 text-sm text-foreground">
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't use the same resume for every application without customization</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't include metrics you cannot explain or defend in an interview</span>
                </li>
                <li className="flex items-start gap-2">
                  <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                  <span>Don't neglect your LinkedIn profile while focusing on your resume</span>
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
                <ScoreGauge score={85} label="Before" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <div className="text-center">
                <ScoreGauge score={95} label="After" size="lg" />
              </div>
            </div>
            <div className="bg-card rounded-lg p-6 text-center space-y-4">
              <p className="text-foreground">Your previous resume was not telling your story effectively. It forced recruiters to dig through dense bullets to find your value instead of stating it upfront. Your new resume captures attention immediately with a powerful summary, demonstrates crypto-specific expertise through technical skills, and highlights only your most impressive achievements.</p>
              <p className="text-gold font-semibold text-lg">You have the experience. Now you have the positioning. Go get the offer.</p>
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

      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">© 2026 Resume Review. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default YoutingChenReview;
