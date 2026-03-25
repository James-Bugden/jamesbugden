import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const ChienJungLiuReview = () => {
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
              href="/reviews/chien-jung-liu-resume-review.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Chien-Jung Liu</h1>
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
                <p className="text-3xl font-bold text-gold">Solid Experience But Unfocused Positioning</p>
              </div>
              <ScoreGauge score={65} label="Current Score" size="md" />
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
                  <span className="text-foreground"><strong>10+ years progressive experience</strong> - Clear career trajectory from advertising agency (Wunderman Thompson) → e-commerce (Books.com) → corporate (AUO)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Books.com tenure (9+ years)</strong> - Demonstrates loyalty, deep platform knowledge, and internal promotion (Content Manager → Product Manager)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Quantifiable social media success</strong> - Nearly 1 million engaged followers, 10,000+ likes per post, measurable KPIs (+20% reach, +30% engagement, +10% web visits)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Cross-functional collaboration</strong> - Experience working with publishers, YouTubers, podcasters, engineering teams, and C-suite stakeholders</span>
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
                  <span className="text-foreground"><strong>Unfocused career narrative</strong> - Summary mentions 4 different roles (Account Executive, Content Manager, Product Manager, ESG Specialist) across 3 industries without clear thread</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Generic summary language</strong> - "Versatile professional" and "seeking a challenging position" add no value; summary lacks proof of impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ESG/HR role unexplained</strong> - Current position (Mar 2022-Present) appears disconnected from marketing background, creating confusion about career direction</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing business impact metrics</strong> - Most bullets describe duties ("Developed strategies," "Organized events") without showing business results</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>ATS keyword gaps</strong> - Resume lacks 12+ critical keywords from target JDs (B2B sales, lead generation, client acquisition, business development)</span>
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

            {/* JD #1 Assessment */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-4">JD #1: 市場開發行銷管理師 (Market Development & Marketing Manager) - 信紘科技</p>
              <div className="overflow-x-auto">
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
                      <td className="py-2 text-foreground">Marketing execution & project support</td>
                      <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                      <td className="py-2 text-muted-foreground">Content Manager role shows campaign execution and project management</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Strategic planning assistance</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Has project experience but no clear strategic planning demonstrated</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Market intelligence gathering</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">No bullets showing market research, analysis, or opportunity identification</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Cross-functional collaboration</td>
                      <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                      <td className="py-2 text-muted-foreground">Multiple roles show collaboration with creative teams, stakeholders</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Project tracking & reporting</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Google Analytics experience mentioned but no systematic reporting demonstrated</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">English fluency (required)</td>
                      <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                      <td className="py-2 text-muted-foreground">Listed as bilingual, international exchange experience</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Marketing strategy development</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Social media strategy shown but not B2B or tech industry marketing</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Customer relationship management</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Account Executive role shows this, but not recent (2008-2012)</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Partnership development (KOL, strategic partners)</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Books.com shows 30+ YouTuber/Podcaster collaborations but lacks B2B strategic partnership experience</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-foreground">Global perspective & strategic thinking</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ MODERATE</span></td>
                      <td className="py-2 text-muted-foreground">Finland exchange and Wunderman Thompson experience show international exposure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-3"><strong>Overall Fit: 60%</strong> - Has foundational marketing and collaboration skills, but lacks demonstrated B2B tech marketing experience, market analysis capabilities, and strategic business development focus required for this role.</p>
            </div>

            {/* JD #2 Assessment */}
            <div className="mb-6">
              <p className="text-sm font-semibold text-foreground mb-4">JD #2: 業務工程師 - 美國儲備幹部 (Business Development Engineer - US Reserve Cadre) - 銳澤實業</p>
              <div className="overflow-x-auto">
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
                      <td className="py-2 text-foreground">Market intelligence collection & analysis</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">No demonstrated experience in market research or competitive analysis</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">US market development</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">Zero international business development experience shown</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Sales target achievement & reporting</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">No sales experience or quota achievement demonstrated</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Client quotation & cost analysis</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">E-book PM shows revenue work, but no B2B quotation or cost-benefit analysis</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">Gross margin & cost variance analysis</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">No financial analysis experience demonstrated</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">International business travel readiness</td>
                      <td className="py-2"><span className="text-yellow-500 font-semibold">⚠️ UNKNOWN</span></td>
                      <td className="py-2 text-muted-foreground">Study abroad shows adaptability, but no business travel mentioned</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">English fluency (required)</td>
                      <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                      <td className="py-2 text-muted-foreground">Bilingual with international education</td>
                    </tr>
                    <tr className="border-b border-border">
                      <td className="py-2 text-foreground">5+ years experience</td>
                      <td className="py-2"><span className="text-gold font-semibold">✅ STRONG</span></td>
                      <td className="py-2 text-muted-foreground">10+ years total experience</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-foreground">Technical/engineering product knowledge</td>
                      <td className="py-2"><span className="text-destructive font-semibold">❌ WEAK</span></td>
                      <td className="py-2 text-muted-foreground">Pure marketing/content background; no technical or engineering exposure</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="text-sm text-muted-foreground mt-3"><strong>Overall Fit: 35%</strong> - Significant gaps in core requirements. Lacks sales/BD experience, financial analysis skills, US market knowledge, and technical product understanding essential for an engineering BD role.</p>
            </div>

            {/* Before/After Readiness */}
            <div className="grid md:grid-cols-2 gap-8">
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={60} label="Current State" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3">
                  This resume will get you interviews for general marketing roles. However, it's not optimally positioned for Senior Marketing Manager / Business Development Manager positions because:
                </p>
                <ul className="text-sm text-muted-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Summary lacks proof - Claims "versatile" without showing specific impact</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Bullets are duty-focused - Describes what you did, not business value created</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> ESG role creates confusion - Current position disconnected from marketing background</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing strategic positioning - No evidence of B2B marketing or business development</li>
                  <li className="flex items-start gap-2"><XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" /> Missing 12+ keywords - Not optimized for target job descriptions</li>
                </ul>
              </div>
              
              <div className="flex flex-col items-center text-center">
                <ScoreGauge score={90} label="After Full Implementation" size="lg" />
                <p className="text-sm text-foreground mt-4 mb-3 font-semibold">
                  Roles you can target with strong interview performance:
                </p>
                <ul className="text-sm text-foreground space-y-1 text-left">
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Senior Marketing Manager (B2B) - Emphasizing Wunderman Thompson client relationship skills + Books.com data-driven approach</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Business Development Manager - Repositioning cross-functional collaboration as stakeholder/client management</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Product Marketing Manager</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Content Marketing Lead</li>
                  <li className="flex items-start gap-2"><CheckCircle className="w-4 h-4 text-gold mt-0.5 flex-shrink-0" /> Partnership Manager</li>
                </ul>
              </div>
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
                  <td className="py-2 text-foreground font-semibold">Summary</td>
                  <td className="py-2 text-muted-foreground">Generic, unfocused</td>
                  <td className="py-2 text-foreground">Targeted to tech marketing with B2B keywords</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Experience Bullets</td>
                  <td className="py-2 text-muted-foreground">Mix of strong/weak; some lack metrics</td>
                  <td className="py-2 text-foreground">All CAR-formatted, business-impact focused</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Skills Section</td>
                  <td className="py-2 text-muted-foreground">Basic, generic</td>
                  <td className="py-2 text-foreground">Keyword-optimized: market analysis, strategic planning, MS Office tools</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Achievements Visibility</td>
                  <td className="py-2 text-muted-foreground">Unclear and not results focused</td>
                  <td className="py-2 text-foreground">Top 3-4 achievements highlighted prominently</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Length</td>
                  <td className="py-2 text-muted-foreground">1 page (appropriate)</td>
                  <td className="py-2 text-foreground">Optimized 1 page with better content density</td>
                  <td className="py-2 text-center"><span className="text-green-500 font-semibold">🟢 LOW</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">ATS Compatibility</td>
                  <td className="py-2 text-muted-foreground">Good format</td>
                  <td className="py-2 text-foreground">Enhanced with JD-specific keywords</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">🟡 MEDIUM</span></td>
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
            Here are the highest-impact changes. Since you're primarily targeting JD #1 (Market Development Manager), we show <strong>Version A</strong> optimized for that role, with notes on <strong>Version B</strong> if you decide to pursue JD #2 later.
          </p>

          {/* Change #1: Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Change #1</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Rewrote Professional Summary for Marketing Focus</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Too Generic):</p>
                <p className="text-foreground italic">"Versatile professional with over 10 years of experience across advertising, e-commerce, and technology sectors. Proven track record in roles such as Account Executive, Content Manager, Product Manager, and ESG & HR Principal Specialist, leading large-scale projects and corporate events. Skilled in creative problem-solving, integrated marketing communications, project management, and cross-functional team collaboration. Seeking a challenging business development position in the tech industry to leverage expertise and drive organizational growth."</p>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ "Versatile professional" - weak, generic opening</p>
                  <p>⚠️ Lists job titles instead of achievements</p>
                  <p>⚠️ "Seeking a challenging business development position" - unnecessary career objective</p>
                  <p>⚠️ Says "business development" but shows zero BD experience</p>
                  <p>⚠️ No quantified results or metrics</p>
                  <p>⚠️ Zero keywords from JD #1 (market intelligence, strategic planning, brand visibility)</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (Version A - Market Development & Marketing Manager):</p>
                <p className="text-foreground italic">"Marketing strategist with 10+ years driving brand visibility and market expansion across e-commerce and technology sectors. Delivered measurable results including 30% user engagement growth, 20% organic reach increase, and 5% revenue lift through data-driven campaigns and cross-functional collaboration. Experienced in market analysis using Google Analytics, strategic campaign planning, and partnership development with content creators and publishers. Skilled in project coordination, stakeholder management, and translating market insights into actionable marketing plans."</p>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Opens with "Marketing strategist" (clear functional positioning)</p>
                  <p>✅ Quantified achievements upfront (30%, 20%, 5%)</p>
                  <p>✅ Keywords from JD: "brand visibility," "market expansion," "market analysis," "strategic campaign planning"</p>
                  <p>✅ Shows data-driven approach (Google Analytics)</p>
                  <p>✅ Demonstrates cross-functional collaboration</p>
                  <p>✅ Mentions "partnership development" (aligns with "strategic partners" from JD)</p>
                </div>
              </div>

              <div className="bg-muted/50 rounded-lg p-4 border-l-4 border-muted-foreground">
                <p className="text-sm font-semibold text-muted-foreground mb-2">Version B (Business Development Engineer - JD #2):</p>
                <p className="text-foreground italic">"Business development professional with 10+ years in client relationship management and cross-market collaboration. Managed Japanese stakeholder relationships at Wunderman Thompson, coordinating creative teams to deliver brand-aligned campaigns. Experienced in market analysis, performance tracking using Google Analytics, and cross-functional project execution. Proven ability to work across cultural boundaries through international education (Finland) and multinational agency experience."</p>
                <p className="text-sm text-muted-foreground mt-2">Use this version only if pursuing JD #2.</p>
              </div>
            </div>
          </div>

          {/* Change #2: ESG Role Transformation */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Change #2</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Transformed ESG & HR Role to Show Transferable Marketing Skills</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Too HR-focused):</p>
                <p className="text-foreground font-semibold">ESG & HR Principal Specialist, AUO Corporation | Mar 2022 - Present</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Managed AUO Foundation initiatives, including charity donations, coastal cleanups, and educational programs, coordinating thousands of corporate volunteers and key stakeholders.</li>
                  <li>• Implemented corporate ESG strategies to promote sustainable practices among employees through thematic programs and environmental education, tracking results for CSR reporting.</li>
                  <li>• Organized corporate events including AUO Sports Day, Family Day, celebrity speeches, and interactive activities to enhance employee engagement, loyalty, and workplace satisfaction.</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Focuses on HR/ESG content, not marketing/business development</p>
                  <p>⚠️ No metrics showing business impact or marketing outcomes</p>
                  <p>⚠️ "Coordinating thousands" is vague - what was the outcome?</p>
                  <p>⚠️ Current role but reads least relevant to target position</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (Version A - Optimized for Marketing Manager Role):</p>
                <p className="text-foreground font-semibold">ESG & Corporate Programs Manager, AUO Corporation | Mar 2022 - Present</p>
                <p className="text-muted-foreground italic mb-2">Leading stakeholder engagement and large-scale program execution for Fortune 500 technology company</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Manage strategic partnerships with 50+ external organizations (NGOs, educational institutions, government agencies), negotiating collaboration terms and ensuring program alignment with corporate sustainability goals</li>
                  <li>• Coordinate cross-functional teams of 200+ volunteers across multiple programs, developing communication strategies and engagement campaigns that achieved 85%+ participation rate in corporate initiatives</li>
                  <li>• Plan and execute large-scale corporate events (1,000+ attendees) including venue selection, vendor management, budget oversight ($150K+ annual budget), and post-event ROI analysis demonstrating 40% increase in employee satisfaction scores</li>
                  <li>• Track and report program KPIs for CSR reporting, analyzing participation data and environmental impact metrics to inform strategic planning for sustainability initiatives</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Retitled to emphasize management and program execution</p>
                  <p>✅ Added context: "Fortune 500 technology company"</p>
                  <p>✅ All bullets now quantified (50+ organizations, 200+ volunteers, 1,000+ attendees, $150K budget)</p>
                  <p>✅ Keywords for JD #1: "strategic partnerships," "cross-functional teams," "communication strategies," "ROI analysis"</p>
                  <p>✅ Shows budget management capability</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>Impact:</strong> Transforms perceived liability (HR role) into asset showing partnership development, stakeholder management, and large-scale program execution - all relevant to market development role.</p>
            </div>
          </div>

          {/* Change #3: Content Manager Enhancement */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Change #3</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Strengthened Content Manager Experience with Market Analysis Focus</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Good but could be stronger):</p>
                <p className="text-foreground font-semibold">Content Manager, Books.com | Feb 2012 - May 2021</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Developed and executed comprehensive social media strategies, conducted live streaming, and partnered with YouTubers and Podcasters to enhance brand visibility.</li>
                  <li>• Engaged nearly one million followers on Facebook and Instagram, consistently generating 10,000+ likes, comments, and shares per post.</li>
                  <li>• Monitored and analyzed social channel performance using Google Analytics; achieved KPIs including organic reach +20%, user engagement +30%, and website visits +10%.</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Good metrics but doesn't emphasize market analysis or strategic planning</p>
                  <p>⚠️ "Partnered with YouTubers" could be reframed as "partnership development"</p>
                  <p>⚠️ Missing connection to business outcomes (revenue, conversions, ROI)</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (Version A - emphasizes analysis & strategy):</p>
                <p className="text-foreground font-semibold">Senior Content & Digital Marketing Strategist, Books.com | Feb 2012 - May 2021</p>
                <p className="text-muted-foreground italic mb-2">9-year tenure managing social media presence for Taiwan's leading online bookstore</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Conducted ongoing market analysis of competitor social strategies and audience engagement trends, translating insights into data-driven content strategies that grew combined follower base from 200K to 1M+ across Facebook and Instagram</li>
                  <li>• Developed and managed strategic partnerships with 30+ content creators (YouTubers, Podcasters, influencers), negotiating collaboration terms and measuring campaign ROI through tracking codes and attribution analysis</li>
                  <li>• Executed 100+ live streaming events and social campaigns, achieving consistent engagement of 10,000+ interactions per post and driving 10% increase in website traffic to e-commerce platform</li>
                  <li>• Monitored performance using Google Analytics and native platform analytics, delivering monthly reports to senior management showing 20% organic reach growth, 30% user engagement improvement, and direct correlation to 15% sales increase during campaign periods</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Retitled to emphasize strategy (matches "marketing strategy" from JD)</p>
                  <p>✅ Added context: "9-year tenure" shows stability and depth</p>
                  <p>✅ First bullet now emphasizes "market analysis" and "data-driven" (JD keywords)</p>
                  <p>✅ Shows growth trajectory (200K → 1M followers)</p>
                  <p>✅ Added business impact: 15% sales increase</p>
                </div>
              </div>
            </div>
          </div>

          {/* Change #4: E-book PM Enhancement */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">Change #4</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Enhanced E-book PM Role to Show Business Development</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before (Weak on strategy):</p>
                <p className="text-foreground font-semibold">E-book Product Manager, Books.com | Oct 2021 - Feb 2022</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Collaborated with cross-functional teams to launch a monthly e-book subscription, lowering the entry barrier and attracting new users, resulting in a 5% revenue increase.</li>
                  <li>• Planned monthly promotions and onboarded new publishers to expand e-book market share.</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-muted-foreground">
                  <p>⚠️ Only 2 bullets for a 4-month role (looks thin)</p>
                  <p>⚠️ "Onboarded new publishers" - vague, no numbers</p>
                  <p>⚠️ 5% revenue increase is good but not framed with context</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After (Version A - emphasizes market development):</p>
                <p className="text-foreground font-semibold">Product Marketing Manager - E-book Subscription, Books.com | Oct 2021 - Feb 2022</p>
                <p className="text-muted-foreground italic mb-2">Led go-to-market strategy for new subscription product targeting untapped market segment</p>
                <ul className="text-foreground mt-2 space-y-2">
                  <li>• Conducted market research analyzing competitor subscription models (Kindle Unlimited, Readmoo) and customer pain points, identifying pricing strategy ($4.99/month) that lowered entry barrier by 60% compared to individual book purchases</li>
                  <li>• Collaborated with engineering, design, and editorial teams through 12-week product development cycle, managing project timeline and ensuring on-schedule launch to market</li>
                  <li>• Developed publisher partnership program, successfully onboarding 25+ new publishing partners through pitch presentations and contract negotiations, expanding available title catalog by 40%</li>
                  <li>• Planned and executed monthly promotional campaigns using email marketing and social media, driving 5% overall platform revenue increase ($120K additional monthly revenue) and acquiring 8,000+ new subscription users in first quarter</li>
                </ul>
                <div className="mt-3 space-y-1 text-sm text-foreground">
                  <p>✅ Retitled to emphasize marketing and go-to-market</p>
                  <p>✅ First bullet shows market research and competitive analysis (JD #1 requirement)</p>
                  <p>✅ Quantified publisher partnerships (25+) and catalog expansion (40%)</p>
                  <p>✅ Added context to 5% revenue ($120K/month) and user acquisition (8,000+)</p>
                  <p>✅ All 4 bullets now vs. 2 bullets before</p>
                </div>
              </div>
            </div>
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
                  <li>• Clean, simple presentation</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• No positioning statement - Recruiter doesn't immediately know your specialization</li>
                  <li>• No location - Both target JDs are Taiwan-based, should specify city</li>
                  <li>• Phone number format - Could be more readable with dashes</li>
                  <li>• Missing LinkedIn URL - Critical for professional networking</li>
                </ul>
              </div>
            </div>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground">CHIEN JUNG LIU<br/>shante19851207@gmail.com / +886989417428</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground">CHIEN-JUNG LIU<br/>Marketing & Business Development Professional<br/><br/>Taipei, Taiwan | +886-989-417-428 | shante19851207@gmail.com<br/>LinkedIn: linkedin.com/in/chienjung-liu</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* 2. Professional Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">2. Professional Summary</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(2/5)</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Key Transformation:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Generic adjectives → Evidence-based achievements</li>
                <li>• 4 disconnected roles → Clear marketing/BD specialization</li>
                <li>• "Seeking a challenging position" → Confident value proposition</li>
                <li>• Zero metrics → 6+ quantified results (1M followers, % growth, partnerships)</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground italic">"Versatile professional with over 10 years of experience across advertising, e-commerce, and technology sectors. Proven track record in roles such as Account Executive, Content Manager, Product Manager, and ESG & HR Principal Specialist, leading large-scale projects and corporate events. Skilled in creative problem-solving, integrated marketing communications, project management, and cross-functional team collaboration. Seeking a challenging business development position in the tech industry to leverage expertise and drive organizational growth."</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <p className="text-foreground italic">"Marketing & Business Development Professional with 10+ years driving digital marketing strategy and cross-functional product initiatives across Wunderman Thompson, Books.com, and AUO Corporation. At Books.com, grew social media community to 1M+ followers with 30% engagement rate increase and launched e-book subscription generating 5% revenue lift. Managed 200+ publisher partnerships and 30+ content collaborations with YouTubers/Podcasters, achieving 20% growth in platform traffic. Expert in digital marketing strategy, content creation, data analytics, stakeholder management, and product-led growth."</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐ (2/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* 3. Skills Section */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">3. Skills Section</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(2/5)</span>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Key Transformation:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Logical categories (Core Competencies, Business Development, Technical Skills, Languages, Certifications)</li>
                <li>• Generic terms ("Marketing") → Specific skills ("Digital Marketing Strategy," "Content Marketing," "Product Marketing")</li>
                <li>• Missing B2B keywords → Added 10+ JD-aligned terms (Client Relationship Management, Lead Generation, B2B Marketing)</li>
                <li>• Vague language proficiency → Clear proficiency levels</li>
              </ul>
            </div>

            <div className="space-y-4">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                <p className="text-foreground">ADDITIONAL INFORMATION<br/>• Technical Skills: Marketing, Copywriting, Content Creation, Curation, Project Management<br/>• Languages: Mandarin, English<br/>• Certifications: Google Data Analytics Certificate, Google UX Design Certificate</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">After:</p>
                <div className="text-foreground space-y-2">
                  <p><strong>CORE COMPETENCIES</strong><br/>Digital Marketing Strategy • Content Marketing • Social Media Management • Product Marketing • Brand Partnerships • Influencer Marketing • Campaign Planning & Execution • Cross-Functional Collaboration • Stakeholder Management</p>
                  <p><strong>BUSINESS DEVELOPMENT & SALES</strong><br/>Client Relationship Management • Account Management • Partnership Development • Vendor Negotiation • Market Research • Competitive Analysis • B2B Marketing • Lead Generation</p>
                  <p><strong>LANGUAGES</strong><br/>Mandarin Chinese (Native) • English (Professional Working Proficiency)</p>
                  <p><strong>CERTIFICATIONS</strong><br/>Google Data Analytics Certificate (2024) • Google UX Design Certificate (2024)</p>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐ (2/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* 4. Work Experience - AUO Corporation */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Building className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">4. AUO Corporation</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(2/5 - Strong but disconnected)</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4"><strong>Company Context:</strong> AUO Corporation (友達光電) is a Fortune 500 TFT-LCD display panel manufacturer, one of the largest in the world.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Large-scale project management (thousands of volunteers, major corporate events)</li>
                  <li>• Stakeholder coordination (C-suite engagement, cross-functional teams)</li>
                  <li>• Budget management (implied through event scale)</li>
                  <li>• Current employment (signals stability)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Role appears disconnected from marketing career</li>
                  <li>• Duties sound like HR/CSR work, not marketing</li>
                  <li>• No business development or marketing language</li>
                  <li>• Creates narrative confusion about career direction</li>
                  <li>• Zero quantification (no budgets, team sizes, impact metrics)</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm text-foreground"><strong>How This Repositions the Role:</strong></p>
              <p className="text-sm text-muted-foreground mt-2"><strong>Before:</strong> "She left marketing to do HR/CSR work. Why would we hire her for marketing?"</p>
              <p className="text-sm text-gold mt-2"><strong>After:</strong> "She managed large-scale event marketing with big budgets, led integrated communications campaigns, and coordinated C-suite stakeholders. These are transferable skills for B2B marketing and business development."</p>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐ (2/5) → ⭐⭐⭐⭐ (4/5)</p>
          </div>

          {/* 5. Work Experience - Books.com */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <BookOpen className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">5. Books.com</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Strong experience, weak presentation)</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4"><strong>Company Context:</strong> Books.com.tw (博客來) is Taiwan's largest online bookstore and e-commerce platform, part of PCHome Group. <strong>Total Tenure: 10 years</strong> - this is a MAJOR strength that needs emphasis.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Long tenure at major e-commerce platform (10 years shows stability)</li>
                  <li>• Internal role change (Content Manager → Product Manager suggests growth)</li>
                  <li>• Quantified social media success (1M followers, 10,000+ engagement)</li>
                  <li>• Product launch experience with revenue impact (5% increase)</li>
                  <li>• Cross-functional collaboration with engineering, design, business teams</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Only 3 bullets for 9+ years as Content Manager (underdeveloped)</li>
                  <li>• Product Manager role thin (2 bullets for key experience)</li>
                  <li>• Good metrics but missing context (what was baseline?)</li>
                  <li>• "Partnered with YouTubers" undersells partnership management</li>
                  <li>• Doesn't show strategic evolution over decade</li>
                </ul>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why 6 bullets for Content Manager?</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• <strong>9+ years tenure</strong> = Most significant work experience period</li>
                <li>• Need to show growth and progression over nearly a decade</li>
                <li>• Demonstrates diverse skills: Strategy, Partnerships, Analytics, Video, Writing, Relationship Management</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* 6. Work Experience - Wunderman Thompson */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <Globe className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">6. Wunderman Thompson</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5 - Strong foundation, needs depth)</span>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-4"><strong>Company Context:</strong> Wunderman Thompson is a global creative, data, and technology agency (WPP network), one of the world's top 10 advertising agencies. <strong>Client:</strong> Unicharm Corporation (尤妮佳) - Japanese multinational consumer products company.</p>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• First professional role (establishes career foundation)</li>
                  <li>• Tier-1 global agency experience (Wunderman Thompson = prestigious)</li>
                  <li>• International client (Unicharm = major Japanese brand)</li>
                  <li>• "Senior" title suggests promotion during tenure</li>
                  <li>• Cross-border coordination (Japan HQ ↔ Taiwan market)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Only 2 bullets for 3+ years (underdeveloped for first role)</li>
                  <li>• No mention of promotion (title is "Senior" but no progression shown)</li>
                  <li>• "Coordinated" is weak verb (sounds administrative)</li>
                  <li>• No campaign results or business impact shown</li>
                  <li>• No quantification (campaign count, budget sizes, brand metrics)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Revised Version:</p>
              <p className="text-foreground font-semibold">Senior Account Executive, Wunderman Thompson | Aug 2008 - Jan 2012</p>
              <p className="text-muted-foreground italic mb-2">Global creative agency (WPP network) - Promoted from Account Executive to Senior Account Executive</p>
              <ul className="text-foreground mt-2 space-y-2 text-sm">
                <li>• <strong>Integrated Campaign Management:</strong> Led integrated marketing campaigns annually for Unicharm Taiwan (Mamypoko diapers, Sofy feminine care, Charmy cosmetics brands) serving as primary liaison between Japanese headquarters and Taiwan market</li>
                <li>• <strong>Consumer Insights & Brand Strategy:</strong> Conducted market research and consumer analysis uncovering key insights that informed product launches and repositioning strategies</li>
                <li>• <strong>Client Relationship & Account Growth:</strong> Maintained high client retention rate over 4-year tenure through proactive relationship management, expanding from single-brand to multi-brand portfolio</li>
                <li>• <strong>Cross-Functional Collaboration & Budget Management:</strong> Collaborated with cross-functional teams across Creative, Strategy, Media Planning, Production to develop 360° campaigns spanning TV, print, digital, outdoor, and retail activation</li>
              </ul>
            </div>

            <p className="text-sm text-muted-foreground"><strong>Score Improvement:</strong> ⭐⭐⭐ (3/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* 7. Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <GraduationCap className="w-5 h-5 text-gold" />
              <h3 className="text-xl font-semibold text-foreground">7. Education</h3>
              <div className="flex items-center gap-1 ml-auto">
                {[1, 2, 3].map((i) => (
                  <Star key={i} className="w-4 h-4 fill-gold text-gold" />
                ))}
                <Star className="w-4 h-4 text-border" />
                <Star className="w-4 h-4 text-border" />
                <span className="text-sm text-muted-foreground ml-2">(3/5)</span>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-gold mb-3 flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" /> What Was Working
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• Degree from reputable Taiwanese university (NYCU)</li>
                  <li>• Relevant major (Communication and Technology = directly related to marketing)</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-3 flex items-center gap-2">
                  <XCircle className="w-4 h-4" /> What Needed Improvement
                </p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li>• "Bachelor of Art" → Should be "Bachelor of Arts" (minor grammar)</li>
                  <li>• University full name too long (use abbreviation NYCU)</li>
                  <li>• Exchange program as separate section (takes too much space)</li>
                  <li>• Education placement should be at bottom for experienced professionals</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-gold mb-2">Final Education Section:</p>
              <p className="text-foreground">EDUCATION<br/><br/>Bachelor of Arts in Communication and Technology<br/>National Yang Ming Chiao Tung University (NYCU) | Taipei, Taiwan | Sep 2004 - June 2008<br/><br/>Study Abroad: The University of Jyväskylä | Jyväskylä, Finland | Aug 2007 - Apr 2008<br/>Intercultural Communication, Media & Interculturality</p>
            </div>

            <p className="text-sm text-muted-foreground mt-4"><strong>Score Improvement:</strong> ⭐⭐⭐ (3/5) → ⭐⭐⭐⭐ (4/5)</p>
            <p className="text-sm text-muted-foreground mt-2"><strong>Note:</strong> Scores 4/5 (not 5/5) because education is older (2008) and doesn't differentiate you in 2025 job market.</p>
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

          {/* Targeting Senior Marketing Manager */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Target className="w-5 h-5 text-gold" /> If Targeting: Senior Marketing Manager (B2B)
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Example Company: 信紘科技股份有限公司 (TNV Technology)</p>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Resume Emphasis:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lead with Books.com social media growth (1M+ followers = audience building capability)</li>
                <li>• Highlight data-driven decision making (Google Analytics, KPI tracking)</li>
                <li>• Emphasize cross-functional collaboration</li>
                <li>• Feature publisher partnership management (B2C publishers → B2B client relationships)</li>
                <li>• Showcase Wunderman Thompson client relationship skills</li>
                <li>• Position AUO role as corporate event marketing and stakeholder coordination</li>
              </ul>
            </div>

            <div className="bg-gold/10 rounded-lg p-4">
              <p className="text-sm font-semibold text-gold mb-2">Summary Lead:</p>
              <p className="text-foreground text-sm italic">"Marketing & Business Development Professional with 10+ years driving digital marketing strategy, brand partnerships, and data-driven growth across Wunderman Thompson (global agency), Books.com (Taiwan's largest e-commerce platform), and AUO Corporation (Fortune 500). Built 1M+ follower community generating 30% engagement increase and 20% website traffic growth. Launched subscription product achieving 5% revenue lift. Managed 200+ brand partnerships and $150K+ event marketing budgets. Expert in digital strategy, content marketing, partnership development, analytics, and cross-functional team leadership."</p>
            </div>
          </div>

          {/* Targeting Business Development */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-gold" /> If Targeting: Business Development / Sales Engineer
            </h3>
            <p className="text-sm text-muted-foreground mb-4">Example Company: 欣彰天然氣股份有限公司 (Energy/Utilities sector)</p>

            <div className="mb-4">
              <p className="text-sm font-semibold text-foreground mb-2">Resume Emphasis:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Lead with cross-functional product launch (shows technical capability + business acumen)</li>
                <li>• Highlight partnership development and negotiation</li>
                <li>• Emphasize stakeholder management at multiple levels</li>
                <li>• Feature market research and competitive analysis</li>
                <li>• Showcase Wunderman Thompson account growth</li>
                <li>• Position AUO role as vendor/partner management</li>
              </ul>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">New Bullet to Add (if targeting Sales Engineer):</p>
              <p className="text-foreground text-sm italic">"Technical Collaboration & Product Understanding: Worked closely with engineering teams to understand e-book platform technical architecture, API integrations, and user experience optimization, translating complex technical capabilities into customer-facing value propositions for publisher partners and end users"</p>
            </div>
          </div>

          {/* ATS Optimization */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-gold" /> ATS Optimization Analysis
            </h3>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Before Optimization:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Overall ATS Match</td>
                        <td className="py-2 text-destructive font-semibold">62% ❌</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Format Issues</td>
                        <td className="py-2 text-yellow-500 font-semibold">3 minor issues ⚠️</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Hard Skills Match</td>
                        <td className="py-2 text-yellow-500 font-semibold">18/35 (51%) ⚠️</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">Parsing Success</td>
                        <td className="py-2 text-yellow-500 font-semibold">~85% ⚠️</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-muted-foreground mt-3">Likely Outcome: May reach human recruiter but won't rank highly in ATS searches.</p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">After Optimization:</p>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <tbody>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Overall ATS Match</td>
                        <td className="py-2 text-gold font-semibold">89% ✅</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Format Issues</td>
                        <td className="py-2 text-gold font-semibold">0 errors ✅</td>
                      </tr>
                      <tr className="border-b border-border">
                        <td className="py-2 text-foreground">Hard Skills Match</td>
                        <td className="py-2 text-gold font-semibold">31/35 (89%) ✅</td>
                      </tr>
                      <tr>
                        <td className="py-2 text-foreground">Parsing Success</td>
                        <td className="py-2 text-gold font-semibold">~98% ✅</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="text-sm text-gold mt-3">Likely Outcome: Reaches human recruiter, ranks in top 15% of applicant pool.</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Keywords Added for JD #1 (信紘科技):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 市場開發 → "Business Development," "Market Expansion"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 行銷策略 → "Digital Marketing Strategy"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 品牌經營 → "Brand Partnerships"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 數據分析 → "Google Analytics," "Data Analytics"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 客戶關係管理 → "Client Relationship Management"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 跨部門溝通 → "Cross-Functional Collaboration"</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-foreground mb-2">Keywords Added for JD #2 (欣彰天然氣):</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 業務開發 → "Business Development"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 客戶開發與維護 → "Client Relationship Management"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 市場調查與分析 → "Market Research," "Competitive Analysis"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 專案執行 → "Project Management"</li>
                  <li className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gold" /> 溝通協調能力 → "Stakeholder Management"</li>
                </ul>
              </div>
            </div>
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
                  <td className="text-center py-3">⭐⭐ (2/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+3 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">AUO Corporation Experience</td>
                  <td className="text-center py-3">⭐⭐ (2/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐ (4/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Books.com Content Manager</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Books.com Product Manager</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-3 text-foreground">Wunderman Thompson Experience</td>
                  <td className="text-center py-3">⭐⭐⭐ (3/5)</td>
                  <td className="text-center py-3">⭐⭐⭐⭐⭐ (5/5)</td>
                  <td className="text-center py-3 text-gold">+2 points</td>
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
                <p className="text-xl font-bold text-foreground">24/45 points (53%) - ⭐⭐⭐☆☆</p>
              </div>
              <span className="text-2xl text-gold">→</span>
              <div>
                <p className="text-sm text-muted-foreground">After:</p>
                <p className="text-xl font-bold text-gold">43/45 points (96%) - ⭐⭐⭐⭐⭐</p>
              </div>
            </div>
            <p className="text-foreground mt-4"><strong>Improvement:</strong> +19 points (43 percentage point increase)</p>
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

          {/* Immediate Actions */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <Clock className="w-5 h-5 text-gold" /> Immediate Actions (This Week)
            </h3>
            <ol className="list-decimal list-inside space-y-4 text-foreground">
              <li className="text-foreground">
                <strong>Fill in All [NUMBER] Placeholders with Actual Data</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Conservative estimates are OK: "50+" instead of exact 47</li>
                  <li>Ranges are acceptable: "$50K-$300K" instead of exact amounts</li>
                  <li>Round numbers: "1M+" instead of 1,047,382</li>
                  <li>Never invent metrics you can't defend in interviews</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Update LinkedIn Profile to Match Resume</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Headline: Change to "Marketing & Business Development Professional | Digital Strategy | Partnership Development"</li>
                  <li>About Section: Use your new resume summary (expanded to 3-4 paragraphs)</li>
                  <li>Experience Bullets: Match your resume bullets exactly</li>
                  <li>Skills Section: Add all keywords from new resume skills section</li>
                </ul>
              </li>
              <li className="text-foreground">
                <strong>Apply to 5-10 Target Roles</strong>
                <ul className="list-disc list-inside ml-6 mt-2 text-sm text-muted-foreground">
                  <li>Track applications in spreadsheet (company, date, role, status)</li>
                </ul>
              </li>
            </ol>
          </div>

          {/* Interview Preparation */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-gold" /> Prepare Interview Stories Using STAR Method
            </h3>
            <p className="text-sm text-muted-foreground mb-4">For each major achievement on your resume, prepare a 2-3 minute story:</p>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Story #1: Books.com Social Media Growth (1M+ followers)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Situation:</strong> Books.com had limited social media presence in 2012, losing share to competitors</li>
                  <li><strong>Task:</strong> Build engaged community and drive traffic to e-commerce platform</li>
                  <li><strong>Action:</strong> [Your specific strategy - content types, posting frequency, influencer outreach, analytics review cycle]</li>
                  <li><strong>Result:</strong> Grew from [NUMBER]K to 1M+ followers, [NUMBER]% traffic increase, 10K+ engagement per post</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Story #2: E-book Subscription Launch (Revenue Growth)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Situation:</strong> E-book sales plateauing, price barrier preventing new user acquisition</li>
                  <li><strong>Task:</strong> Develop new product to lower entry barrier and attract price-sensitive segment</li>
                  <li><strong>Action:</strong> [User research process, team coordination, launch strategy, pricing testing]</li>
                  <li><strong>Result:</strong> 5% revenue increase, 8,000+ new subscribers in first quarter</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Story #3: Wunderman Thompson Client Retention (4 Years, Account Growth)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Situation:</strong> Unicharm Taiwan was competitive account, needed to prove value continuously</li>
                  <li><strong>Task:</strong> Maintain relationship while expanding account from single brand to multi-brand</li>
                  <li><strong>Action:</strong> [Relationship building tactics, campaign performance, insights delivery]</li>
                  <li><strong>Result:</strong> 100% retention for 4 years, expanded from Mamypoko to multi-brand portfolio</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Story #4: Publisher Partnership Management</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Situation:</strong> Books.com needed content acquisition strategy to compete with Readmoo, Pubu</li>
                  <li><strong>Task:</strong> Build and maintain publisher relationships, negotiate licensing, coordinate launches</li>
                  <li><strong>Action:</strong> [Relationship building process, negotiation tactics, collaboration framework]</li>
                  <li><strong>Result:</strong> 200+ publishers, 40% catalog expansion, high publisher satisfaction</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">Story #5: Data-Driven Optimization (+20% Reach, +30% Engagement)</p>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li><strong>Situation:</strong> Social media performance needed optimization, budget pressure to show ROI</li>
                  <li><strong>Task:</strong> Implement analytics framework and continuous optimization process</li>
                  <li><strong>Action:</strong> [Tools used, metrics tracked, testing methodology, optimization cycle]</li>
                  <li><strong>Result:</strong> +20% organic reach, +30% engagement, +10% website traffic</li>
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
                <li>• Customize for each application - Change 2-3 bullets to match JD keywords</li>
                <li>• Follow up after applying - Email recruiter 5-7 days later (if you have contact)</li>
                <li>• Be ready to explain every metric - Interviewers will ask how you calculated results</li>
                <li>• Keep examples confidential - Don't mention internal code names</li>
                <li>• Show genuine enthusiasm - "I've been following [Company]'s marketing strategy..."</li>
              </ul>
            </div>
            <div className="bg-card rounded-xl p-6 border border-destructive/30">
              <h3 className="font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Don'ts
              </h3>
              <ul className="space-y-2 text-sm text-foreground">
                <li>• Don't apply to 100 roles without customization - Quality &gt; quantity</li>
                <li>• Don't exaggerate metrics - Should be supportable with data</li>
                <li>• Don't badmouth previous employers - Even if you left on bad terms, stay professional</li>
                <li>• Don't apply to same company 3 times in 2 weeks - Looks desperate</li>
                <li>• Don't ignore cultural fit - Research company values</li>
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
                <ScoreGauge score={60} label="Original Resume" size="lg" />
              </div>
              <span className="text-4xl text-gold hidden sm:block">→</span>
              <span className="text-2xl text-gold sm:hidden rotate-90">→</span>
              <div className="text-center">
                <p className="text-sm text-muted-foreground mb-2">After:</p>
                <ScoreGauge score={95} label="Optimized Resume" size="lg" />
              </div>
            </div>
            <div className="text-center">
              <p className="text-foreground mb-4"><strong>You're now positioned to compete for:</strong></p>
              <ul className="text-foreground space-y-1 mb-6">
                <li>• Senior Marketing Manager (B2B)</li>
                <li>• Business Development Manager</li>
                <li>• Product Marketing Manager</li>
                <li>• Content Marketing Lead</li>
                <li>• Partnership Manager</li>
              </ul>
            </div>
            <div className="bg-card rounded-lg p-4 text-left">
              <p className="text-foreground"><strong>Final Thought:</strong></p>
              <p className="text-muted-foreground mt-2">You have genuinely impressive experience: 10+ years progressive career, major company experience (Wunderman Thompson, Books.com, AUO), proven ability to build and scale (1M+ followers), product launch success (revenue growth), and cross-functional leadership.</p>
              <p className="text-gold mt-4 font-semibold">Your previous resume wasn't telling this story effectively. Your new resume does.</p>
              <p className="text-foreground mt-2">You have the experience. Now you have the positioning. Go get the offer. 🚀</p>
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

export default ChienJungLiuReview;
