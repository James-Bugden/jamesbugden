import { ArrowLeft, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, ExternalLink } from 'lucide-react';
import { Link } from 'react-router-dom';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const RemaRaoReview = () => {
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
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">Resume Review</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Rema Rao</h1>
          <p className="text-cream/80 text-lg">General Manager, Financial Services | Uber</p>
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

          {/* Overall Score Card */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">Overall Assessment</p>
                <p className="text-3xl font-bold text-gold">90/100 → 100/100</p>
                <p className="text-sm text-muted-foreground mt-1">Exceptional Resume → After Full Implementation</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="Before" size="md" />
                <ScoreGauge score={100} label="After" size="md" />
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
                  <span className="text-foreground"><strong>Strong quantified achievements in your GM role.</strong> $51M portfolio, 170% YoY revenue growth, $22M annual revenue increase, 19-market expansion. These numbers give immediate credibility and show commercial impact at scale.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Excellent career progression and brand recognition.</strong> Uber, Deloitte, Capco, PayPal, HSBC form a compelling trajectory from banking operations through consulting into tech leadership. This shows versatility and progressive responsibility.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Smart separation of early career vs. recent roles.</strong> Condensing pre-2019 experience into an "Early Career" section with 2 bullets each keeps focus on the last 6 years while preserving your breadth.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Board experience signals Director-readiness.</strong> MRC European Advisory Board and Women at Uber global leadership demonstrate governance, strategic influence, and cross-organisational leadership beyond the day job.</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clean, ATS-friendly 2-page layout.</strong> Single-column format, clear section headers, consistent bullet structure, professional spacing. Easy for both automated systems and human reviewers to parse.</span>
                </li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> What Needs Improvement
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing business results on two key bullets in Progressive Roles.</strong> The UK EMI/EEA market-entry and Taiwan TPPSP stabilisation bullets describe strategic activities but don't quantify the financial impact. Your GM role does this well. These two bullets don't.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>People management experience is invisible in recent roles.</strong> You lead teams (the Women at Uber section mentions ~40 FTEs). Your GM and Progressive Roles bullets contain zero references to team size, direct/indirect reports, hiring, or org building. This is a critical gap for Director-level positioning.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Stakeholder management not surfaced.</strong> You communicate with senior VPs, CEOs, and cross-business-unit stakeholders. This is not explicitly stated anywhere.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>LinkedIn profile has significant keyword gaps.</strong> Your expertise section is sparse. This reduces your visibility in recruiter Boolean searches for Director-level financial services roles where headhunting is the primary sourcing method.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>LinkedIn vs. resume role mismatch.</strong> Your LinkedIn shows multiple Uber role changes. Your resume smartly consolidates them under "Progressive Regional Leadership Roles." The resume framing is stronger. The inconsistency between platforms raises questions.</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Geographic scope is understated.</strong> 19 markets across EMEA and APAC. M&A integration across Autocab, Careem, Trendyol/Getir. Multi-jurisdiction regulatory work.</span>
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
                  <td className="py-2 text-foreground font-semibold">Business Results on Progressive Roles</td>
                  <td className="py-2 text-muted-foreground">UK EMI and Taiwan TPPSP bullets describe activities only</td>
                  <td className="py-2 text-foreground">Quantified: revenue enabled, revenue protected, transaction volume, marketplace value preserved</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">People Management</td>
                  <td className="py-2 text-muted-foreground">Not mentioned in GM or Progressive Roles</td>
                  <td className="py-2 text-foreground">Explicit: team sizes, direct/indirect reports, cross-functional teams led</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Stakeholder Management</td>
                  <td className="py-2 text-muted-foreground">Implied but not stated</td>
                  <td className="py-2 text-foreground">Specific: "VP/C-suite engagement across X business lines" with context</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">🔴 HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Geographic Scope (Summary)</td>
                  <td className="py-2 text-muted-foreground">Mentioned in bullets but absent from summary</td>
                  <td className="py-2 text-foreground">Summary should state 19+ markets, multi-entity M&A, multi-jurisdiction scope</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">LinkedIn Expertise Keywords</td>
                  <td className="py-2 text-muted-foreground">Sparse expertise section</td>
                  <td className="py-2 text-foreground">Populated with Director-level financial services keywords for headhunter discoverability</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">LinkedIn vs. Resume Alignment</td>
                  <td className="py-2 text-muted-foreground">Multiple Uber roles on LinkedIn vs. consolidated on resume</td>
                  <td className="py-2 text-foreground">Align LinkedIn to match resume framing, or add context to bridge the gap</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">🟡 MEDIUM</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">M&A Financial Context</td>
                  <td className="py-2 text-muted-foreground">Names entities (Autocab, Careem, Trendyol/Getir) but no portfolio value</td>
                  <td className="py-2 text-foreground">Add portfolio value, integration scope, or revenue impact where possible</td>
                  <td className="py-2 text-center"><span className="text-yellow-600 font-semibold">🟡 MEDIUM</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* PART 2: KEY IMPROVEMENTS EXPLAINED */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Star className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 2: Key Improvements Explained</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            Here are the highest-impact changes (detailed analysis in Part 3):
          </p>

          {/* 🔴 3 Must-Fix Issues Header */}
          <h3 className="font-heading text-2xl text-destructive mb-6">🔴 3 Must-Fix Issues</h3>

          {/* Must-Fix #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 #1 Business Results</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Quantified Business Results to UK EMI/EEA and Taiwan TPPSP Bullets</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version (Missing Commercial Impact):</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive mb-4">
                <p className="text-sm text-foreground italic mb-3">Defined and executed regulatory market-entry strategy for Uber's UK EMI and EEA entities, structuring partner banking and issuing relationships to enable launch of stored value (Uber Money) and integrate financial services into the regional commerce model.</p>
                <p className="text-sm text-foreground italic">Led strategic stabilisation of Uber Taiwan's regulated payments business under acquirer termination risk, renegotiating and transitioning critical external partner relationships to secure TPPSP compliance within six months and preserve marketplace continuity.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ Both bullets describe what you did (the activity) but not what you achieved (the result). Compare this to your GM role where "170% YoY revenue growth, increasing annual portfolio revenue by $22M" immediately communicates impact.</li>
                <li>⚠️ The UK EMI bullet enables "launch of stored value" but doesn't quantify: How many markets did this open? What revenue did Uber Money generate? What was the user base or transaction volume enabled?</li>
                <li>⚠️ The Taiwan bullet preserves "marketplace continuity" but doesn't quantify: What was the marketplace GMV at risk? How many drivers/riders were protected? What revenue did you preserve by avoiding acquirer termination?</li>
                <li>⚠️ "so what was the business impact?"</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold space-y-3">
                <p className="text-sm text-foreground italic">(EXAMPLE) Defined and executed regulatory market-entry strategy for Uber's UK EMI and EEA entities, structuring partner banking and issuing relationships to enable launch of stored value (Uber Money) across [NUMBER] markets, generating [$VALUE] in new financial services revenue and [NUMBER] monthly active users.</p>
                <p className="text-sm text-foreground italic">(EXAMPLE) Led strategic stabilisation of Uber Taiwan's regulated payments business under acquirer termination risk, renegotiating and transitioning critical external partner relationships to secure TPPSP compliance within six months, preserving [$VALUE] in annual marketplace GMV and uninterrupted service for [NUMBER] drivers and riders.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Follows the same pattern that makes your GM bullets strong: activity + quantified outcome.</li>
                <li>✅ Revenue enabled / revenue protected gives a Director-level reviewer the commercial lens they screen for.</li>
                <li>✅ User or driver/rider numbers add scale context that reinforces why this work mattered.</li>
                <li>✅ Keeps the strategic language while adding the missing proof layer.</li>
              </ul>
            </div>

            <p className="text-sm text-gold font-semibold">Impact: Two strong-but-incomplete bullets become complete Context-Action-Result stories that match the quality of your GM role.</p>
          </div>

          {/* Must-Fix #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 #2 People Management</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">People Management Experience in Recent Roles</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version (I didn't see the Team Leadership experience but I know you have this):</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm text-foreground mb-3">Your GM role (2025-Present) and Progressive Roles (2019-2024) do not have references to:</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>• Team size or direct/indirect reports</li>
                  <li>• Hiring, developing, or restructuring teams</li>
                  <li>• Cross-functional team leadership</li>
                  <li>• Organisational design or operating model creation</li>
                </ul>
                <p className="text-sm text-foreground mt-3">In the Board Roles section, your Women at Uber entry mentions leading "a central and regional team of ~40 FTEs" and a "500+ member network." This is significant people leadership hidden in what most reviewers treat as a secondary section.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ Director roles universally require demonstrated people management. Team sizes, spans of control, hiring, talent development.</li>
                <li>⚠️ Your GM role says you "built and scaled regional financial services operations" but doesn't mention the team you built to do this. How many people? What functions? Direct reports vs. cross-functional matrix?</li>
                <li>⚠️ Without explicit people management evidence in your core experience, a headhunter might categorise you as a "strategic individual contributor" rather than a "people leader."</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-sm text-muted-foreground mb-2">Add people management context to your GM role and Progressive Roles. Examples:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold space-y-3">
                <p className="text-sm text-foreground italic">(EXAMPLE) Built and led a cross-functional team of [NUMBER] across commercial, operations, and partner management to scale financial services across 19 EMEA and APAC markets.</p>
                <p className="text-sm text-foreground italic">(EXAMPLE) Managed [NUMBER] direct reports and coordinated [NUMBER] across commercial, operations, and partner management to scale financial services across 19 EMEA and APAC markets.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Directly addresses the screening criterion for Director roles: demonstrated ability to build and lead teams.</li>
                <li>✅ Cross-functional framing (commercial, operations, legal, compliance, engineering) shows you operate across multiple organisational lines, not within a single function.</li>
              </ul>
            </div>
          </div>

          {/* Must-Fix #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">🔴 #3 Stakeholder Management</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Make Stakeholder Management Explicit</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version (Implied But Not Stated):</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm text-foreground">Your resume demonstrates engagement with senior executives: "endorsed at executive leadership level," "VP and Regional GM of Mobility EMEA executive sponsorship."</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ Director-level roles require explicit evidence of upward and lateral stakeholder management: influencing VP/C-suite decisions, presenting to boards, aligning cross-business-unit priorities.</li>
                <li>⚠️ Your work involves communicating with senior VPs, CEOs, regulators, and external partner executives across banking and fintech. I know you have more of this than is on your resume.</li>
                <li>⚠️ Your multi-year strategy was "endorsed at executive leadership level." This implies you presented to and convinced senior people. What is the presentation, influence, and alignment skills behind this?</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <p className="text-sm text-muted-foreground mb-2">Weave stakeholder management context into existing bullets rather than creating standalone bullets. Examples:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold space-y-3">
                <p className="text-sm text-foreground italic">(EXAMPLE) Defined and led execution of a multi-year regional financial services acceleration strategy, engaging VP and C-suite stakeholders across Mobility, Delivery, and platform teams, and governing a partner ecosystem across banking, fintech and issuing institutions... endorsed at executive leadership level.</p>
                <p className="text-sm text-foreground mt-2">Current like this is good. Maybe you could expand in other bullets on the stakeholders.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Names the level of stakeholders (VP, C-suite) and the breadth of engagement (multiple business lines, external regulators, banking partners).</li>
                <li>✅ Doesn't create a generic "stakeholder management" bullet.</li>
                <li>✅ Director-level reviewers want to see you influence without direct authority across complex organisational structures.</li>
              </ul>
            </div>

            <p className="text-sm text-gold font-semibold">Impact: Completes the picture of how your strategic work gets done: through influence, alignment, and executive engagement across complex multi-stakeholder environments.</p>
          </div>

          {/* 🟡 Important Changes Header */}
          <h3 className="font-heading text-2xl text-yellow-600 mb-6 mt-10">🟡 Important Changes</h3>

          {/* Yellow #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 #1 Geographic Scope</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Elevate Geographic Scope in Executive Summary</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version:</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm text-foreground italic">Regional P&L leader across EMEA and APAC, shaping commercial, go-to-market and ecosystem partnership strategy for multi-market financial services portfolios in complex, regulated environments.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ "Multi-market" undersells the actual scale. 19 markets across two major regions with M&A integration across 4 entities is genuinely global, not "multi-market."</li>
                <li>⚠️ Your M&A work spanning Autocab, Careem, Trendyol/Getir represents cross-entity integration experience that Director roles in financial services value highly. It's buried in bullet 4 of the Progressive Roles section.</li>
                <li>⚠️ "EMEA and APAC" is stated but the depth of multi-jurisdiction regulatory work (UK, EEA, Taiwan, Australia, India) isn't visible in the summary.</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-foreground italic">(EXAMPLE) Regional P&L leader across 19+ EMEA and APAC markets, shaping commercial, go-to-market and ecosystem partnership strategy for financial services portfolios in complex, regulated environments, including payments and financial services integration across multiple M&A entities.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ "19+" immediately quantifies the scope. Far more compelling than "multi-market."</li>
                <li>✅ M&A reference in the summary ensures this differentiator is visible even to reviewers who only read the top third of your resume.</li>
              </ul>
            </div>
          </div>

          {/* Yellow #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 #2 M&A Context</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Financial Context to M&A Integration Bullet</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version:</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm text-foreground italic">Led strategic payments and financial services integration across regional M&A initiatives (Autocab, Careem, Trendyol/Getir), aligning regulatory architecture, partner ecosystems, infrastructure and monetisation models to accelerate post-acquisition scale.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ Names the entities but provides no financial context. A Director-level reviewer will want to know: What was the combined portfolio value? What revenue did integration generate? What was the timeline?</li>
                <li>⚠️ "Accelerate post-acquisition scale" is a good outcome statement but lacks quantification.</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-foreground italic">(EXAMPLE) Led strategic payments and financial services integration across regional M&A initiatives (Autocab, Careem, Trendyol/Getir) representing [$VALUE] in combined marketplace volume, aligning regulatory architecture, partner ecosystems, infrastructure and monetisation models to enable [OUTCOME with metric] in post-acquisition revenue contribution.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Portfolio value gives immediate scale context to the M&A work.</li>
                <li>✅ Quantified outcome completes the CAR structure.</li>
              </ul>
            </div>
          </div>

          {/* Yellow #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 #3 APAC Payments</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Business Outcome to APAC Payments Strategy Bullet</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Version:</p>
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm text-foreground italic">Shaped APAC payments strategy, sequencing onshoring initiatives and enabling instant payments in Australia, Taiwan and India to materially optimise liquidity, reduce settlement friction and strengthen regional marketplace economics.</p>
              </div>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ "Materially optimise liquidity" and "reduce settlement friction" are strong directional statements but lack quantification. What was the liquidity improvement? Settlement time reduction? Cost savings?</li>
              </ul>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm text-foreground italic">(EXAMPLE) Shaped APAC payments strategy, sequencing onshoring initiatives and enabling instant payments in Australia, Taiwan and India, reducing settlement cycles by [X days/hours], and generating [$VALUE] in annual cost savings across regional marketplace operations.</p>
              </div>
            </div>

            <div>
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Quantified settlement improvement and cost savings</li>
              </ul>
            </div>
          </div>

          {/* Yellow #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 #4 LinkedIn Keywords</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">LinkedIn Expertise Section: Keyword Gap for Headhunter Discoverability</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Issue:</p>
              <p className="text-sm text-muted-foreground mb-3">Your LinkedIn expertise/skills section is sparse. For Director-level Financial Services roles, headhunters run Boolean searches using keywords like:</p>
              <p className="text-sm text-muted-foreground mb-3 italic">I'm no finance recruiter but these are what I expect based off your resume.</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {[
                  "P&L Management", "Embedded Finance", "Payments Strategy", "Regulatory Strategy",
                  "Partner Ecosystem Management", "Financial Services", "M&A Integration",
                  "Go-to-Market Strategy", "Fintech", "AML / Financial Crime Compliance",
                  "Cross-Border Payments", "Digital Banking", "Revenue Growth",
                  "Stakeholder Management", "Team Leadership"
                ].map((keyword) => (
                  <span key={keyword} className="px-3 py-1 bg-gold/10 text-gold text-xs font-medium rounded-full border border-gold/20">
                    {keyword}
                  </span>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">If these terms are not in your LinkedIn profile (Skills, About, and Experience sections), you won't surface in searches. This is critical because Director-level roles are typically headhunted rather than applied to.</p>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Recommendation:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Populate your LinkedIn Skills section with at least 15-20 relevant keywords from the list above.</li>
                <li>• Ensure your LinkedIn About section mirrors the depth of your resume summary.</li>
                <li>• Add key achievements with metrics to your LinkedIn Experience entries. The headline numbers ($51M portfolio, 170% YoY growth, 19 markets) should be visible on LinkedIn, not only on your resume.</li>
              </ul>
            </div>
          </div>

          {/* Yellow #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/10 text-yellow-600 text-xs font-bold rounded-full uppercase tracking-wide">🟡 #5 LinkedIn Alignment</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Align LinkedIn Role Presentation with Resume</h3>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Issue:</p>
              <p className="text-sm text-muted-foreground">Your LinkedIn shows multiple individual Uber role changes and moves. Your resume smartly consolidates the 2019-2024 period under "Progressive Regional Leadership Roles in Payments & Financial Services EMEA & APAC." The resume framing is significantly stronger. It tells a story of deliberate progression rather than a series of lateral moves.</p>
            </div>

            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Problems:</p>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>⚠️ A headhunter who reviews your resume then checks your LinkedIn will see inconsistency. Different titles, different date ranges, different role breakdowns.</li>
                <li>⚠️ The LinkedIn version inadvertently makes your trajectory look fragmented rather than progressive.</li>
                <li>⚠️ If a recruiter only sees your LinkedIn (common for headhunted Director roles), they get a weaker narrative than your resume tells.</li>
              </ul>
            </div>

            <div>
              <p className="text-sm font-semibold text-gold mb-2">Recommendation:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Consider restructuring your LinkedIn Uber entries to mirror the resume approach. One consolidated entry for 2019-2024 with the progressive framing, and a separate entry for the GM role from 2025.</li>
                <li>• If you keep the granular LinkedIn entries, ensure each one has a clear, quantified achievement and links logically to the next.</li>
                <li>• Whichever approach you choose, ensure the story is consistent across both platforms.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* PART 3: DETAILED SECTION-BY-SECTION ANALYSIS */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <FileText className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Part 3: Detailed Section-by-Section Analysis</h2>
          </div>

          {/* Section 1: Header & Contact Details */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">1. Header & Contact Details</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐⭐ (5/5 - Excellent)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Professional email and phone number. Clean contact details with international format</li>
                <li>✅ Full LinkedIn URL included. <code className="text-xs bg-muted px-1 rounded">https://www.linkedin.com/in/remarao</code> is a clean custom URL that parses correctly in ATS systems.</li>
                <li>✅ Clear professional title. "General Manager at Uber | Board Member" immediately communicates seniority and current position.</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground">No changes needed.</p>
            <p className="text-sm text-gold font-semibold mt-4">Score: ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* Section 2: Executive Summary */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">2. Executive Summary</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐☆ (4/5 - Strong, Needs Strategic Enhancement)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Strong opening positioning. "Regional P&L leader across EMEA and APAC" immediately establishes seniority and scope.</li>
                <li>✅ Clear specialisation. Financial services, embedded finance, regulated environments. The domain expertise is unambiguous.</li>
                <li>✅ Strategic language. "Product prioritisation, monetisation design, investment sequencing" signals executive-level thinking, not operational execution.</li>
                <li>✅ Board membership mentioned. MRC European Advisory Board reference in the summary is a smart inclusion for Director positioning.</li>
                <li>✅ 0-1 builder identity. "Builder of 0-1 capabilities and scalable operating structures" is a compelling differentiator.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Needed Improvement:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>❌ "Multi-market" undersells actual scope. 19+ markets with M&A integration across 4 entities deserves explicit quantification in the summary.</li>
                <li>❌ M&A experience buried. Cross-entity integration (Autocab, Careem, Trendyol/Getir) is a major differentiator for Director roles and only appears deep in the Progressive Roles section.</li>
                <li>❌ No people leadership signal. The summary describes what you do strategically but doesn't mention building or leading teams. This is a gap for Director targeting.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Changes Recommended:</p>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                  <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                  <p className="text-sm text-foreground italic">Regional P&L leader across EMEA and APAC, shaping commercial, go-to-market and ecosystem partnership strategy for multi-market financial services portfolios in complex, regulated environments.</p>
                </div>
                <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                  <p className="text-sm font-semibold text-gold mb-2">After:</p>
                  <p className="text-sm text-foreground italic">(EXAMPLE) Regional P&L leader across 19+ EMEA and APAC markets, shaping commercial, go-to-market and ecosystem partnership strategy for financial services portfolios in complex, regulated environments, including payments and financial services integration across multiple M&A entities.</p>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• "19+" immediately quantifies the scope and catches the eye of a Director-level hiring manager.</li>
                <li>• M&A reference ensures this differentiator is visible in the top third of the resume.</li>
                <li>• Retains the executive tone and strategic framing of the original.</li>
              </ul>
            </div>
            <p className="text-sm text-gold font-semibold">Score Improvement: ⭐⭐⭐⭐☆ (4/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* Section 3: Work Experience: GM Role */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">3. Work Experience: General Manager Role (2025-Present)</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐⭐ (5/5 - Excellent)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ $51M portfolio quantified upfront. Immediately establishes commercial scale in the role description line.</li>
                <li>✅ 170% YoY revenue growth. Specific, impressive, verifiable. Exactly what hiring managers look for.</li>
                <li>✅ $22M annual revenue increase. Absolute dollar growth alongside the percentage gives full context.</li>
                <li>✅ 19-market scale. Geographic scope is clear and compelling.</li>
                <li>✅ Multi-year strategy with executive endorsement. "Endorsed at executive leadership level" signals you operate with credibility at the highest levels.</li>
                <li>✅ Strong action verbs. "Built," "Delivered," "Scaled," "Defined." Active, confident language throughout.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Needed Improvement:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>❌ Missing team/people context. Who did you build this with? How many people are on your team? What functions do they cover?</li>
                <li>❌ Missing stakeholder management specifics. The executive endorsement is mentioned but the stakeholder engagement journey (who you presented to, how you aligned competing priorities) is invisible.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Changes Recommended:</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">Bullet 1:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Built and scaled regional financial services operations from early expansion through commercial maturity, establishing embedded finance as an evergreen ancillary revenue stream for Mobility and Delivery.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Built and scaled regional financial services operations from early expansion through commercial maturity, leading a cross-functional team of [NUMBER] across commercial, operations, and partner management, establishing embedded finance as an evergreen ancillary revenue stream for Mobility and Delivery.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">Bullet 4:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Defined and led execution of a multi-year regional financial services acceleration strategy, building and governing a partner ecosystem across banking, fintech and issuing institutions to enable compliant market entry, capital-efficient scaling and long-term revenue expansion within Uber's commerce platform; endorsed at executive leadership level.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Defined and led execution of a multi-year regional financial services acceleration strategy, engaging VP and C-suite stakeholders across Mobility, Delivery, and platform teams, building and governing a partner ecosystem across banking, fintech and issuing institutions to enable compliant market entry, capital-efficient scaling and long-term revenue expansion within Uber's commerce platform; endorsed at executive leadership level.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Team size quantification addresses the people management gap directly.</li>
                <li>• Stakeholder naming (VP, C-suite, specific business lines) makes the influence dimension explicit.</li>
                <li>• Both additions enrich existing bullets rather than bloating the section.</li>
              </ul>
            </div>
            <p className="text-sm text-gold font-semibold">Score: ⭐⭐⭐⭐⭐ (5/5). Already strong</p>
          </div>

          {/* Section 4: Progressive Roles */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">4. Work Experience: Progressive Regional Leadership Roles (2019-2024)</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐☆ (4/5 - Strong Foundation, Key Gaps)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Smart consolidation. Grouping 5 years of progressive roles under one umbrella heading tells a story of deliberate career progression.</li>
                <li>✅ Breadth of scope. UK, EEA, Taiwan, Australia, India, plus M&A across multiple entities. The geographic and functional range is impressive.</li>
                <li>✅ Regulatory depth. UK EMI, EEA licensing, TPPSP compliance, acquirer relationships. This demonstrates deep domain expertise that Director roles in financial services specifically value.</li>
                <li>✅ M&A integration. Naming Autocab, Careem, Trendyol/Getir shows experience with complex post-acquisition work.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Needed Improvement:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>❌ UK EMI/EEA bullet has no business result. "Enable launch of stored value (Uber Money) and integrate financial services into the regional commerce model" describes the outcome in product terms, not financial terms. What revenue did this generate? How many markets? How many users?</li>
                <li>❌ Taiwan TPPSP bullet has no business result. "Preserve marketplace continuity" is directional but doesn't quantify what was at stake. What was the marketplace GMV at risk? How many users or partners were affected?</li>
                <li>❌ APAC payments bullet also lacks quantification. "Materially optimise liquidity, reduce settlement friction." How much? What time reduction? What cost savings?</li>
                <li>❌ M&A bullet lacks financial context. "Accelerate post-acquisition scale." By how much? What was the combined marketplace volume of these entities?</li>
                <li>❌ No people management or stakeholder management references. Same gap as the GM role.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Changes Recommended:</p>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">UK EMI/EEA Bullet:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Defined and executed regulatory market-entry strategy for Uber's UK EMI and EEA entities, structuring partner banking and issuing relationships to enable launch of stored value (Uber Money) and integrate financial services into the regional commerce model.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Defined and executed regulatory market-entry strategy for Uber's UK EMI and EEA entities, structuring partner banking and issuing relationships to enable launch of stored value (Uber Money) across [NUMBER] markets, generating [$VALUE] in new financial services revenue and [NUMBER] monthly active users within the first year.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">Taiwan TPPSP Bullet:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Led strategic stabilisation of Uber Taiwan's regulated payments business under acquirer termination risk, renegotiating and transitioning critical external partner relationships to secure TPPSP compliance within six months and preserve marketplace continuity.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Led strategic stabilisation of Uber Taiwan's regulated payments business under acquirer termination risk, renegotiating and transitioning critical external partner relationships to secure TPPSP compliance within six months, preserving [$VALUE] in annual marketplace GMV and uninterrupted service for [NUMBER] drivers and riders.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">APAC Payments Bullet:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Shaped APAC payments strategy, sequencing onshoring initiatives and enabling instant payments in Australia, Taiwan and India to materially optimise liquidity, reduce settlement friction and strengthen regional marketplace economics.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Shaped APAC payments strategy, sequencing onshoring initiatives and enabling instant payments in Australia, Taiwan and India, reducing settlement cycles by [X days/hours], improving driver liquidity by [X%], and generating [$VALUE] in annual cost savings across regional marketplace operations.</p>
                    </div>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-foreground font-medium mb-2">M&A Bullet:</p>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                      <p className="text-sm font-semibold text-destructive mb-2">Before:</p>
                      <p className="text-sm text-foreground italic">Led strategic payments and financial services integration across regional M&A initiatives (Autocab, Careem, Trendyol/Getir), aligning regulatory architecture, partner ecosystems, infrastructure and monetisation models to accelerate post-acquisition scale.</p>
                    </div>
                    <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                      <p className="text-sm font-semibold text-gold mb-2">After:</p>
                      <p className="text-sm text-foreground italic">(EXAMPLE) Led strategic payments and financial services integration across regional M&A initiatives (Autocab, Careem, Trendyol/Getir) representing [$VALUE] in combined marketplace volume, aligning regulatory architecture, partner ecosystems, infrastructure and monetisation models to enable [OUTCOME with metric] in post-acquisition revenue contribution.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Every bullet now follows the same CAR pattern that makes the GM role compelling.</li>
                <li>• Financial context (revenue enabled, revenue protected, cost savings, marketplace value) gives Director-level reviewers the commercial lens they need.</li>
                <li>• (EXAMPLE) placeholders ensure you only include numbers you verify. Never fabricate metrics.</li>
              </ul>
            </div>
            <p className="text-sm text-gold font-semibold">Score Improvement: ⭐⭐⭐⭐☆ (4/5) → ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* Section 5: Board Roles */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">5. Board Roles</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐⭐ (5/5 - Strong, Excellent for Director Positioning)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ MRC European Advisory Board. Governance and industry leadership beyond the employer. Exactly what Director-level candidates should demonstrate.</li>
                <li>✅ Conference Committee Chair. Shows you shape industry conversations, not participate in them.</li>
                <li>✅ Women at Uber: ~40 FTEs, 500+ member network. This is significant organisational leadership with real scale.</li>
                <li>✅ #GigSister across 40+ markets. Designed and scaled a programme with measurable geographic reach.</li>
                <li>✅ Executive sponsorship named. "VP and Regional GM of Mobility EMEA" shows you operate with senior backing.</li>
              </ul>
            </div>
            <p className="text-sm text-gold font-semibold">Score: ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* Section 6: Early Career */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">6. Early Career</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐⭐ (5/5 - Clean, Appropriately Condensed)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ 2 bullets per role keeps early career proportionate to the overall resume.</li>
                <li>✅ Strong company names. Deloitte, Capco, PayPal, HSBC provide credibility and show breadth.</li>
                <li>✅ AML, financial crime, cross-border compliance. The early career consistently builds the regulatory foundation that supports your current positioning.</li>
                <li>✅ Geographic diversity visible. Chile, Singapore, Malaysia, UK. Reinforces the global trajectory.</li>
                <li>✅ Progressive seniority. Analyst to Compliance Consultant to Senior Consultant to Senior Management Consultant shows clear career growth.</li>
              </ul>
            </div>
            <p className="text-sm text-muted-foreground mb-4">No changes needed. This section is well-executed. The concise format correctly prioritises your recent Uber experience while preserving the breadth and depth of your earlier career.</p>
            <p className="text-sm text-gold font-semibold">Score: ⭐⭐⭐⭐⭐ (5/5)</p>
          </div>

          {/* Section 7: Education */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-2">7. Education</h3>
            <p className="text-sm text-gold font-semibold mb-4">Assessment: ⭐⭐⭐⭐⭐ (5/5 - Clean, Appropriate)</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">What Was Working:</p>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>✅ Properly placed. Bottom of page 2, appropriate for 15+ years of experience.</li>
                <li>✅ Clean format. Single entry, no unnecessary detail.</li>
              </ul>
            </div>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">No Changes Needed:</p>
              <p className="text-sm text-foreground">Bachelor of Laws, LL.B (Hons) | 2010-2013 University of Hertfordshire | Hatfield, United Kingdom</p>
              <p className="text-sm text-muted-foreground mt-2">This is correctly formatted for a senior professional.</p>
            </div>
            <p className="text-sm text-gold font-semibold">Score: ⭐⭐⭐⭐⭐ (5/5)</p>
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

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn Optimization: Critical for Director-Level Discoverability</h3>
            <p className="text-sm text-muted-foreground mb-4">Director-level Financial Services roles are predominantly filled through headhunting, not inbound applications. Your LinkedIn profile is your primary discoverability surface. If the right keywords aren't present, headhunters won't find you regardless of how strong your resume is.</p>
            <div className="mb-4">
              <p className="text-sm font-semibold text-muted-foreground mb-2">Current Gap:</p>
              <p className="text-sm text-muted-foreground">Your LinkedIn expertise section is sparse. This significantly reduces the number of recruiter Boolean searches that return your profile.</p>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">LinkedIn vs. Resume Alignment</h3>
            <p className="text-sm text-muted-foreground mb-4">Your resume consolidates your 2019-2024 Uber experience under "Progressive Regional Leadership Roles." This is a significantly stronger narrative than the multiple individual role entries on your LinkedIn.</p>
            <p className="text-sm text-muted-foreground"><strong>Recommendation:</strong> Align your LinkedIn to mirror the resume framing, or at minimum ensure each LinkedIn entry has quantified achievements that build a coherent progression story. The headline numbers from your resume ($51M portfolio, 170% YoY growth, 19 markets, $22M revenue increase) should all be visible on LinkedIn.</p>
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
                <h3 className="font-semibold text-foreground mb-2">Review the Optimized Resume</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Verify all facts and metrics are accurate</li>
                  <li>• Ensure you speak to every achievement in detail</li>
                  <li>• Check that tone/voice feels authentic to you</li>
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">2</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Apply to 5-10 Target Roles</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Start with priority companies and Director-level openings</li>
                  <li>• Use custom cover letters if needed</li>
                  <li>• Track applications</li>
                </ul>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">3</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Prepare Interview Stories Using STAR Method</h3>
                <p className="text-muted-foreground text-sm mb-3">For each major achievement on your resume, prepare a 2-3 minute story:</p>
                <div className="p-4 bg-muted/30 rounded-xl mb-4">
                  <h4 className="font-semibold text-foreground mb-2">STAR Framework:</h4>
                  <ul className="text-muted-foreground text-sm space-y-1">
                    <li>• <span className="font-medium text-foreground">Situation:</span> What was the context/problem?</li>
                    <li>• <span className="font-medium text-foreground">Task:</span> What was your specific responsibility?</li>
                    <li>• <span className="font-medium text-foreground">Action:</span> What did you do? (step-by-step)</li>
                    <li>• <span className="font-medium text-foreground">Result:</span> What happened? (quantified)</li>
                  </ul>
                </div>
                <div>
                  <p className="text-muted-foreground text-sm mb-2">Use my full interview prep guide:</p>
                  <a
                    href="/interview-preparation-guide"
                    className="inline-flex items-center gap-2 text-sm text-gold hover:underline"
                  >
                    <FileText className="w-4 h-4" />
                    English Interview Prep Guide
                  </a>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border flex gap-4">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-gold text-white flex items-center justify-center font-semibold">4</div>
              <div>
                <h3 className="font-semibold text-foreground mb-2">Update LinkedIn Profile to Match Resume</h3>
                <ul className="text-muted-foreground text-sm space-y-1">
                  <li>• Mirror resume positioning</li>
                  <li>• Populate expertise/skills section with recommended keywords</li>
                  <li>• Add quantified achievements to LinkedIn experience entries</li>
                  <li>• Ensure consistency between LinkedIn and resume</li>
                </ul>
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
                <li>• Customize for each application. Change 2-3 bullets to match the JD.</li>
                <li>• Follow up after applying. Email the recruiter 5-7 days later.</li>
                <li>• Be ready to explain every metric. Interviewers will ask.</li>
                <li>• Show genuine enthusiasm</li>
              </ul>
            </div>
            <div className="bg-destructive/5 rounded-xl p-6 border border-destructive/20">
              <h3 className="font-semibold text-destructive mb-4">Don'ts</h3>
              <ul className="text-sm text-muted-foreground space-y-2">
                <li>• Don't apply without customization. Quality {'>'} quantity.</li>
                <li>• Don't exaggerate metrics. Be ready to support with data.</li>
                <li>• Don't badmouth previous employers. Stay professional.</li>
                <li>• Don't ignore cultural fit. Research company values.</li>
              </ul>
            </div>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8">
            <h2 className="font-heading text-2xl text-cream mb-4">💭 Final Thought</h2>
            <p className="text-cream/90 leading-relaxed mb-4">
              Your experience is exceptional:
            </p>
            <p className="text-cream/90 leading-relaxed mb-4">
              Your resume is already strong. The improvements above take you from 90 to 100 by ensuring every bullet tells the complete story: what you did, and what it achieved.
            </p>
            <p className="text-gold font-semibold text-lg">
              You have the experience. Sharpen the positioning. Go get the Director role.
            </p>
            <p className="text-cream/80 mt-2">Good luck! 🚀</p>
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
          <p className="text-muted-foreground mb-6">If you found this review helpful, I'd appreciate your feedback:</p>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
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

          <p className="text-muted-foreground mb-2">Share Your Results: When you land interviews or offers, let me know!</p>
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
          <p className="text-sm text-muted-foreground mt-6">Review Completed: March 2026</p>
        </section>
      </main>
    </div>
    </>
  );
};

export default RemaRaoReview;
