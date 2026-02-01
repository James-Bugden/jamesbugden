import { ArrowLeft, Download, FileText, Zap, Target, CheckCircle, XCircle, Clock, Star, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScoreGauge from '@/components/ScoreGauge';

const YoutingChenReview = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">Back to Home</span>
          </Link>
          <a href="/downloads/YOUTING_CHEN_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Youting Chen</h1>
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
              <p><strong>First, missing executive summary.</strong> You force recruiters to work through dense experience bullets to understand your value. A 3-4 sentence summary upfront would immediately position your expertise and key wins.</p>
              <p><strong>Second, unclear QR code purpose.</strong> The QR code in your header lacks explanation. Recruiters will not scan unknown codes. Either remove it or add clear context.</p>
              <p><strong>Third, generic skills section dilutes impact.</strong> Broad assumptions like problem solving and stakeholder management add no differentiation. Replace with role-specific technical skills and crypto/Web3 tools.</p>
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
                  <span className="text-foreground"><strong>Strong Quantified Achievements</strong>: $1.5B AUM recovery at Bybit, 6x altcoin volume scaling at Orderly, 0.6% spot market share contribution at Binance, 30% QoQ growth at TapPay</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Leadership Scale Clearly Stated</strong>: Managing 8 product managers, coordinating 30+ market makers, overseeing 20+ DEX builders shows scope appropriate for director-level roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Crypto-Native Experience Depth</strong>: 3+ years across Bybit, Orderly, and Binance covering CEX operations, DeFi liquidity, token listings, market making, and compliance</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Progressive Career Trajectory</strong>: Clear advancement from co-founder to HSBC trainee to Binance operations to VP role to Head of Product</span>
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
                  <span className="text-foreground"><strong>No Executive Summary</strong>: Resume jumps straight into experience section, forcing recruiters to piece together your value proposition</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Unexplained QR Code</strong>: QR code in header has no context, recruiters will not scan unknown codes</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Generic Skills Section</strong>: "Analytical and problem solving skills," "stakeholder management" are assumed for any director-level role</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Too Many Bybit Bullets</strong>: 8 bullets for current role is excessive, dilutes impact of strongest achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing OKX-Specific Keywords</strong>: "listing/delisting process," "risk management," "token listing marketing" should appear explicitly</span>
                </li>
              </ul>
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
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Add Executive Summary</span>
            <h3 className="font-heading text-2xl text-foreground mt-4 mb-4">Add Executive Summary with Quantified Achievements</h3>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-foreground text-sm italic">Product Director with 6+ years crypto-native experience leading token listing operations, spot trading growth, and liquidity infrastructure at top-tier exchanges (Bybit, Orderly, Binance). Track record includes driving $1.5B AUM recovery through post-hack listing products, managing 8-person product team across spot/on-chain/listings/AI tools, scaling altcoin trading volume 6x through 50+ new listings, and achieving 0.6% spot market share contribution through new user acquisition platforms.</p>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Replace Generic Skills</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Replace Generic Skills with Crypto-Specific Technical Competencies</h3>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Skills:</p>
              <ul className="text-foreground text-sm space-y-1">
                <li><strong>Token Listing & Market Operations:</strong> Token Listing/Delisting Processes, Risk Management, Spot Trading, Market Making & Liquidity Management</li>
                <li><strong>Web3 & Crypto Ecosystem:</strong> DeFi Protocols, Blockchain Infrastructure, Crypto Compliance & Regulatory Frameworks</li>
                <li><strong>Technical & Leadership:</strong> Data-Driven Product Strategy, Cross-Functional Team Leadership, Bilingual: Mandarin/English</li>
              </ul>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#3 Cut Bybit to 5 Bullets</span>
            <h3 className="font-heading text-xl text-foreground mt-4 mb-4">Cut Bybit Experience from 8 Bullets to 5 Highest-Impact Achievements</h3>
            <p className="text-muted-foreground mb-4">Remove filler bullets like "Established key metrics, monitoring systems" and "Collaborated cross-functionally" which lack specific outcomes.</p>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Keep These 5:</p>
              <ul className="text-foreground text-sm space-y-2">
                <li>• Led 8-person product team achieving $1.5B AUM recovery post-hack</li>
                <li>• Launched post-hack listing savings products driving $1.5B+ inflows</li>
                <li>• Spearheaded token analytics revamp driving 50% DAU increase and 2x conversion</li>
                <li>• Orchestrated institutional collaboration achieving Binance-level depth</li>
                <li>• Streamlined listing workflow improving operational efficiency by 90%</li>
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
            <h2 className="font-heading text-3xl text-foreground">ATS Keyword Match</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-destructive mb-3">Before: 40%</h4>
                <p className="text-muted-foreground text-sm">Missing: listing/delisting process, risk management, listing marketing, growth strategies, bilingual</p>
              </div>
              <div>
                <h4 className="font-semibold text-gold mb-3">After: 95%</h4>
                <p className="text-foreground text-sm">Strong alignment with all critical OKX job description terminology</p>
              </div>
            </div>
          </div>
        </section>

        {/* CLOSING */}
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
            <div className="bg-card rounded-lg p-4 text-center">
              <p className="text-gold font-semibold">You have the experience. Now you have the positioning. Go get the offer.</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK */}
        <section className="mb-16">
          <div className="bg-card rounded-xl p-8 border border-border">
            <h2 className="font-heading text-2xl text-foreground mb-6">Your Feedback Matters</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Share Your Feedback</h3>
                </div>
              </a>
              <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="group block p-6 rounded-xl border-2 border-gold/30 bg-gradient-to-br from-gold/5 to-gold/10 hover:border-gold transition-all">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-gold to-gold-dark flex items-center justify-center">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Leave a Trustpilot Review</h3>
                </div>
              </a>
            </div>
            <p className="text-gold font-semibold">Best of luck with your applications!</p>
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
