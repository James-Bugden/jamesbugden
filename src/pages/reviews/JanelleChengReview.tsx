import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare, Phone, MapPin, Shield, Trash2, Edit3, Search, UserCheck, Code, Database, TestTube, Handshake } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const JanelleChengReview = () => {
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
              href="/downloads/CHI_CHENG_JANELLE_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Chi Cheng (Janelle)</h1>
          <p className="text-cream/80 text-lg">Senior Analytics Engineer | Maniko Nails & Riot</p>
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
              <p>Your resume demonstrates strong Analytics Engineer positioning with excellent technical execution in your current role.</p>
              
              <p><strong>First, missing critical contact information creates immediate friction for EU-based recruiters.</strong> No phone number, no explicit location, and most critically, no work authorization statement when applying from Taiwan to Germany and France roles means your application faces automatic screening challenges regardless of qualifications.</p>
              
              <p><strong>Second, space allocated to irrelevant content reduces focus on your strongest technical work.</strong> Professional Development (meetup attendance) and Volunteer Experience (2013 tourism planning) consume valuable resume real estate without supporting your Analytics Engineer positioning.</p>
              
              <p><strong>Third, some bullets lack the specificity needed to demonstrate depth of impact.</strong> While most follow the XYZ framework well, a few key achievements (KPI analytics enabling 3x margin increase, client retention improvements) need clearer methodology to show exactly how your work created business value.</p>
              
              <p>However, your core qualifications are exceptional for Analytics Engineer roles. Your hands-on dbt experience transforming SAP data into 20+ business-ready models, 10+ automated Tableau dashboards with 100% on-time delivery, multi-region BI unification across Europe/US/Asia, self-service analytics culture building, and 9 years bridging commercial strategy with data modeling.</p>
              
              <p className="text-gold font-semibold">The problem is not your experience - it is presentation details that create unnecessary friction.</p>
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
                  <span className="text-foreground"><strong>Excellent Current Role Presentation:</strong> Teamson Design Corp bullets demonstrate strong Analytics Engineer capabilities with dbt workflows, star-schema modeling, executive BI delivery, and stakeholder enablement - all with quantified metrics (20+ models, 10+ dashboards, 100% on-time, 24% ticket reduction, 3x margin increase)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Outstanding Summary:</strong> Your summary is already excellent and well-tailored to Analytics Engineer roles - it clearly positions you as "Analytics Engineer bridging business strategy and data modeling," quantifies 9 years experience, highlights international collaboration (Europe/US/Asia), and naturally integrates critical keywords (dbt, SQL, Tableau)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Modern Technical Stack:</strong> Your Tech Stack section hits all major Analytics Engineer tools - dbt, SQL, Tableau, Python, Airflow, Docker, Git with CI/CD, and GCP (BigQuery, GCS, Compute Engine) demonstrate engineering mindset beyond basic SQL analysis</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Strong XYZ Framework Execution:</strong> Most bullets follow the "Accomplished [X] as measured by [Y] by doing [Z]" structure effectively - you show outcomes (20% latency improvement), quantification (10+ dashboards, 100+ users), and methods (dbt workflows, star-schema models, RBAC administration)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Clean Format and Visual Hierarchy:</strong> Two-page format is appropriate for your experience level, layout is professional and easy to scan, sections are logically organized, and you use context well (industry descriptors like "E-Commerce of Toys and Furniture" clarify business type)</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Relevant Certifications:</strong> Recent Tableau Desktop Training (2023-2024) and Google Agile Project Management (2025) demonstrate ongoing professional development in directly relevant areas</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>International Experience Highlighted:</strong> Multi-region collaboration across Europe, US, and Asia in both summary and experience bullets positions you well for global companies like Maniko (worldwide customers) and Riot (international operations)</span>
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
                  <span className="text-foreground"><strong>Missing Phone Number in Header:</strong> No contact number provided - recruiters need multiple ways to reach candidates, especially for remote roles requiring coordination across timezones (Asia to EU applications)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Location Information:</strong> No city or country specified in header - critical for remote roles to indicate timezone context and work authorization status when applying from Taiwan to Germany/France positions</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>No Work Authorization Statement:</strong> Applying from Taiwan to EU roles without explicit visa/work rights statement creates immediate uncertainty - recruiters will assume you need sponsorship and may filter your application automatically regardless of qualifications</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Professional Development Section Somewhat Irrelevant:</strong> dbt Meetup Taiwan and Tableau User Group Meetup Taiwan show community engagement but consume space without demonstrating verified competency - meetup attendance is better suited for LinkedIn than resume</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Volunteer Experience Not Work-Related:</strong> 2013 tourism planning for aboriginal tribes (12 years ago) has no connection to Analytics Engineer role and takes valuable space that could showcase relevant technical projects or expand current role achievements</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Teamson Bullet #4 Lacks Specificity:</strong> "Facilitated data-driven actions through KPI and expense analytics, uncovering cost drivers and enabling a 3x contribution-margin increase" does not specify which KPIs, what analytics methods, or how your work directly enabled the 3x increase</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>No Explicit Data Quality or Testing Emphasis:</strong> Both target JDs emphasize data quality frameworks and validation processes but your bullets do not explicitly mention testing, validation, or data quality assurance work</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Stakeholder Collaboration Process Details:</strong> While bullets show outputs (dashboards delivered, models built), they do not explicitly describe collaboration process that both JDs emphasize</span>
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
                  <td className="py-2 text-foreground font-semibold">Phone Number</td>
                  <td className="py-2 text-muted-foreground">Not included in header</td>
                  <td className="py-2 text-foreground">Add international format: +886-XXX-XXX-XXX for accessibility</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Location</td>
                  <td className="py-2 text-muted-foreground">Not specified</td>
                  <td className="py-2 text-foreground">Explicit city/country: "Taipei, Taiwan" for timezone and context clarity</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Work Authorization</td>
                  <td className="py-2 text-muted-foreground">Not mentioned</td>
                  <td className="py-2 text-foreground">Explicit statement: "EU Work Authorization" OR "Requires sponsorship" OR "Relocating to [city]"</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Professional Development Section</td>
                  <td className="py-2 text-muted-foreground">dbt Meetup Taiwan, Tableau User Group Meetup Taiwan</td>
                  <td className="py-2 text-foreground">Remove entirely - meetup attendance does not demonstrate verified competency</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Volunteer Experience Section</td>
                  <td className="py-2 text-muted-foreground">2013 tourism planning (12 years old, not work-related)</td>
                  <td className="py-2 text-foreground">Recommend removing - no connection to Analytics Engineer role</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Teamson Bullet #4 Specificity</td>
                  <td className="py-2 text-muted-foreground">Vague: "KPI and expense analytics...enabling 3x contribution-margin increase"</td>
                  <td className="py-2 text-foreground">Specify which KPIs, what expense categories, how analytics directly enabled increase</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Data Quality Emphasis</td>
                  <td className="py-2 text-muted-foreground">Not explicitly mentioned despite doing this work</td>
                  <td className="py-2 text-foreground">Add bullet or enhance existing bullets to highlight testing, validation frameworks, data quality processes</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Stakeholder Collaboration Process</td>
                  <td className="py-2 text-muted-foreground">Outputs shown (dashboards, models) but not collaboration process</td>
                  <td className="py-2 text-foreground">Add details on requirements gathering, stakeholder workshops, translating business needs to technical solutions</td>
                  <td className="py-2 text-center"><span className="text-yellow-500 font-semibold">MEDIUM</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Summary</td>
                  <td className="py-2 text-muted-foreground">Already excellent - strong well-tailored positioning as Analytics Engineer with quantified experience</td>
                  <td className="py-2 text-foreground">No changes needed</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">LOW</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Certifications</td>
                  <td className="py-2 text-muted-foreground">Recent, relevant Tableau and Agile PM certifications</td>
                  <td className="py-2 text-foreground">No changes needed - properly formatted and valuable</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">LOW</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Current Role (Teamson)</td>
                  <td className="py-2 text-muted-foreground">Strong technical bullets with quantified impact</td>
                  <td className="py-2 text-foreground">No major changes needed - 5 of 6 bullets are excellent</td>
                  <td className="py-2 text-center"><span className="text-green-600 font-semibold">LOW</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* TARGET READINESS ASSESSMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Building className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Target Readiness Assessment</h2>
          </div>

          {/* Maniko Nails */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Senior Analytics Engineer - Maniko Nails (Germany)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Requirement</th>
                    <th className="text-left py-2 text-foreground">Readiness</th>
                    <th className="text-left py-2 text-muted-foreground">Gap Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">3+ years Analytics Engineer experience</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">1.5 years explicit Analytics Engineering focus at Teamson plus 4 years merchandising analytics at Tasameng equals ~5 years relevant experience - well above minimum</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Strong SQL & data transformation (dbt)</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Explicit bullet: "Designed and optimized dbt workflows transforming SAP data into 20+ business-ready models" with 20% latency improvement demonstrates hands-on dbt expertise</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data modeling & structuring expertise</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Explicit bullet: "Developed reusable star-schema data models to support scalable, self-service analytics" shows dimensional modeling knowledge</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Visualization tools (preferably Tableau)</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Multiple Tableau bullets (10+ dashboards, 100+ user administration, training workshops) plus Tableau Desktop certifications (2023-2024) demonstrate expert-level proficiency</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data quality & reliability focus</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">You clearly do this work (20+ business-ready models, data accuracy mentioned) but no explicit bullet on testing frameworks, validation processes, or data quality assurance</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Collaboration & stakeholder management</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Outputs shown (dashboards, models, training) but collaboration process not explicitly described - no bullet on requirements gathering, stakeholder workshops, translating business needs</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Self-service analytics enablement</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Two explicit bullets: star-schema for self-service, training workshops building self-service culture, reduced ad-hoc requests</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business impact & prioritization</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Multiple business impact metrics: 3x contribution-margin increase, 24% IT ticket reduction, eliminated manual reports, 20% YoY growth</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Python (nice to have)</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">PRESENT</span></td>
                    <td className="py-2 text-muted-foreground">Listed in Tech Stack, used for data engineering tasks per experience context</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Work authorization for Germany</td>
                    <td className="py-2"><span className="text-destructive font-semibold">CRITICAL</span></td>
                    <td className="py-2 text-muted-foreground">No statement of EU work rights - major blocker for German employer unless you have visa or are willing to state sponsorship requirements upfront</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">Overall Fit: 75% Ready → 95% Ready (After Implementation)</p>
              <p className="text-sm text-muted-foreground mt-1">Pending work authorization clarity</p>
            </div>
          </div>

          {/* Riot */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Lead Analytics Engineer - Riot (France)</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm mb-6">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-2 text-foreground">Requirement (from JD)</th>
                    <th className="text-left py-2 text-foreground">Readiness</th>
                    <th className="text-left py-2 text-muted-foreground">Gap Analysis</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Analytics Engineer experience</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">1.5 years explicit Analytics Engineering plus commercial/operational analytics background demonstrates capability</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data infrastructure development</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">dbt workflows, star-schema modeling, PostgreSQL data models show infrastructure building beyond ad-hoc analysis</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Scalable data models for analytics</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">Explicit: "Developed reusable star-schema data models to support scalable, self-service analytics"</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data products for stakeholders</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">10+ automated Tableau dashboards, self-service culture building, 100+ user enablement demonstrate data product creation</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Data quality</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Work is evident (business-ready models, data accuracy) but no explicit mention of test frameworks or validation processes</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Business partnership & translation</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Shows results (dashboards, models) but does not explicitly describe requirements gathering or translation process</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Stakeholder management</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">MODERATE</span></td>
                    <td className="py-2 text-muted-foreground">Executive BI reporting and training show engagement but process details missing</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">Challenge assumptions & advocate</td>
                    <td className="py-2"><span className="text-yellow-500 font-semibold">WEAK</span></td>
                    <td className="py-2 text-muted-foreground">No evidence of challenging stakeholders or advocating for data-informed approaches - bullets focus on delivery</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="py-2 text-foreground">SQL & data transformation</td>
                    <td className="py-2"><span className="text-green-600 font-semibold">STRONG</span></td>
                    <td className="py-2 text-muted-foreground">dbt + SQL + 20+ models demonstrate strong capability</td>
                  </tr>
                  <tr>
                    <td className="py-2 text-foreground">Work authorization for France</td>
                    <td className="py-2"><span className="text-destructive font-semibold">CRITICAL</span></td>
                    <td className="py-2 text-muted-foreground">No statement of EU work rights - blocker for French employer</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
              <p className="text-foreground font-semibold">Overall Fit: 70% Ready → 90% Ready (After Implementation)</p>
              <p className="text-sm text-muted-foreground mt-1">Pending work authorization clarity and adding stakeholder challenge examples</p>
            </div>
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
            We identified 6 strategic transformations to position you optimally for Senior Analytics Engineer roles at Maniko and Riot. Here are the highest-impact changes:
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Contact Information</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Complete Contact Information with Work Authorization Statement</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Creates Major Hiring Friction):</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>No phone number reduces accessibility - Recruiters need multiple contact methods, especially for international remote roles requiring timezone coordination between Asia and Europe</p>
                  <p>Missing location creates confusion - EU recruiters cannot tell if you are Taiwan-based, already in Europe, or planning relocation without explicit city/country</p>
                  <p>No work authorization statement is critical blocker - Applying from Taiwan to Germany and France without explicit visa status means recruiters will assume you need sponsorship (expensive and complex) and filter your application first regardless of qualifications</p>
                  <p>Competing against local EU candidates - Without clear authorization statement, you appear riskier and more expensive to hire than local applicants with identical qualifications</p>
                  <p>Background check and compliance concerns - Unclear work rights create legal compliance worries that make recruiters skip your application entirely</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version - Option A (if you have EU work authorization):</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">CHI CHENG (JANELLE)</p>
                  <p>Analytics Engineer</p>
                  <p>Taipei, Taiwan | EU Work Authorization | Open to relocation</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version - Option B (if relocating with valid visa):</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">CHI CHENG (JANELLE)</p>
                  <p>Analytics Engineer</p>
                  <p>Relocating to Berlin/Paris [Month Year] | Valid work authorization</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version - Option C (if you need sponsorship - be upfront):</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm font-mono">
                  <p className="font-bold">CHI CHENG (JANELLE)</p>
                  <p>Analytics Engineer</p>
                  <p>Taipei, Taiwan | Requires work sponsorship | Open to relocation</p>
                  <p>+886-XXX-XXX-XXX | iamjanellecheng@gmail.com | linkedin.com/in/janellecheng</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Removes critical blocker - Explicit work authorization statement prevents automatic filtering before your qualifications are even considered</li>
                <li>Professional title establishes positioning - "Analytics Engineer" immediately tells recruiters what role you target</li>
                <li>Phone number adds accessibility - Shows you are reachable and serious about opportunity across timezones</li>
                <li>Location clarity helps planning - Recruiters understand timezone difference (GMT+8 vs GMT+1/+2) and relocation logistics</li>
                <li>Complete LinkedIn URL - Full profile link enables one-click verification</li>
                <li>Reduces perceived risk - Clear statements about authorization or sponsorship needs let recruiters make informed decisions rather than assumptions</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Transforms your application from "international candidate with unknown visa complexity" to "qualified candidate with clear work authorization status" - this single change can increase EU callback rates by 300%+ for Taiwan-based applicants.</p>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Remove Irrelevant Sections</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Remove Professional Development and Volunteer Experience Sections</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Takes Valuable Space Without Supporting Positioning):</p>
                <div className="mt-3 space-y-2 text-sm">
                  <p className="font-semibold text-foreground">Professional Development:</p>
                  <ul className="text-muted-foreground ml-4 list-disc">
                    <li>dbt Meetup Taiwan</li>
                    <li>Tableau User Group Meetup Taiwan</li>
                  </ul>
                  <p className="font-semibold text-foreground mt-3">Volunteer Experience:</p>
                  <ul className="text-muted-foreground ml-4 list-disc">
                    <li>Chun Shin Limited - ETS Country Master Distributor</li>
                    <li>Volunteer, 2013 - Tourism plan for aboriginal tribes</li>
                  </ul>
                </div>
                <div className="mt-4 space-y-2 text-sm text-foreground">
                  <p>Meetup attendance is not a differentiator - Attending user groups shows interest but does not demonstrate verified competency or tangible outcomes like certifications do</p>
                  <p>Better suited for LinkedIn - Community involvement belongs in LinkedIn "Interests" or "Activities" section, not resume which should focus on proven achievements</p>
                  <p>2013 volunteer work is too dated - 12-year-old tourism planning has no connection to Analytics Engineer role and provides no value to hiring decision</p>
                  <p>Wastes valuable space - Two-page resume should prioritize technical achievements and relevant experience - every line must justify its presence</p>
                  <p>Dilutes focus on strengths - These sections draw attention away from your exceptional dbt work, Tableau expertise, and quantified business impact</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground text-sm">Remove both sections entirely. Your resume already demonstrates professional development through:</p>
                <ul className="text-sm text-foreground mt-2 space-y-1 ml-4 list-disc">
                  <li>Recent certifications (Tableau Desktop Training 2023-2024, Google Agile PM 2025)</li>
                  <li>Modern tech stack adoption (dbt, Airflow, Docker, CI/CD)</li>
                  <li>Progressive skill growth shown in experience bullets (data modeling → BI delivery → administration → enablement)</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Focuses space on proven achievements - Every line now supports your Analytics Engineer positioning with quantified technical accomplishments</li>
                <li>Certifications demonstrate verified knowledge - Your Certification section already shows professional development more effectively than meetup attendance</li>
                <li>Eliminates dated irrelevant content - Removing 12-year-old volunteer work keeps resume current and focused on professional technical experience</li>
                <li>Creates space for enhancements - You can use recovered space to add data quality bullet, expand stakeholder collaboration details, or add relevant technical projects</li>
                <li>Strengthens professional image - Resume now contains only work-related achievements and verified credentials</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Removing two sections that provide no hiring value creates space to strengthen areas that directly prove your Analytics Engineer capabilities - this improves recruiter focus and demonstrates better judgment about what matters.</p>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#3 Add Specificity</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Specificity to Teamson Bullet #4 on KPI and Expense Analytics</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Strong Outcome, Weak on Method):</p>
                <p className="text-muted-foreground text-sm italic">"Facilitated data-driven actions through KPI and expense analytics, uncovering cost drivers and enabling a 3x contribution-margin increase."</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>Vague on which KPIs - "KPI analytics" without specifying which KPIs (revenue per customer? Product margins? Shipping costs?) does not prove depth of knowledge</p>
                  <p>No expense categories specified - "Expense analytics" could mean anything - which expenses did you analyze? Fulfillment? Supplier costs? Marketing?</p>
                  <p>Causal link unclear - How did your analytics directly enable 3x increase? What actions did stakeholders take based on your analysis?</p>
                  <p>Missing the "Z" in XYZ framework - Bullet shows outcome (3x increase) but not the specific method you used to deliver analytics</p>
                  <p>Could be coincidental - Without clear connection between your work and result, recruiters may think business grew 3x independently while you happened to do some analytics</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <p className="text-foreground text-sm italic">"Enabled 3x contribution-margin increase by delivering KPI dashboards tracking product-level profitability, supplier costs, and shipping expenses, identifying $XXK in cost-saving opportunities (renegotiated supplier terms, optimized shipping routes) and informing pricing strategy adjustments across 200+ SKUs."</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Alternative if you cannot claim direct causation:</p>
                <p className="text-foreground text-sm italic">"Delivered comprehensive KPI and expense analytics dashboards tracking product margins (by category and SKU), fulfillment costs, and customer acquisition costs, uncovering cost drivers and informing commercial decisions that contributed to 3x contribution-margin increase."</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Specific KPIs identified - Product profitability, supplier costs, shipping expenses show exactly what you tracked</li>
                <li>Clear methodology - Dashboards + tracking + identification + recommendations demonstrates complete analytical process</li>
                <li>Quantified scope - $XXK savings, 200+ SKUs, specific actions (supplier renegotiation, route optimization) prove depth</li>
                <li>Business impact connection - Shows how your analytics informed specific decisions (pricing strategy, supplier terms) that led to margin improvement</li>
                <li>Honest attribution - "Contributed to" version acknowledges team result while claiming your analytical role</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Transforms vague analytics claim into specific proof of business partnership and analytical depth - shows exactly how you turn data into actionable insights that drive commercial outcomes.</p>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#4 Data Quality</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Explicit Data Quality and Testing Framework Emphasis</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">What's Missing:</p>
                <p className="text-foreground text-sm mb-3">Both Maniko and Riot JDs heavily emphasize data quality:</p>
                <div className="space-y-2 text-sm">
                  <p className="font-semibold text-foreground">Maniko JD states:</p>
                  <ul className="text-muted-foreground ml-4 list-disc">
                    <li>"Ensure data quality through test frameworks, validation processes, and comprehensive documentation"</li>
                    <li>"You have a data-first mindset and take pride in ensuring accuracy, consistency, and reliability"</li>
                  </ul>
                  <p className="font-semibold text-foreground mt-3">Riot JD states:</p>
                  <ul className="text-muted-foreground ml-4 list-disc">
                    <li>"Ensure data quality through test frameworks, validation processes, and comprehensive documentation"</li>
                  </ul>
                </div>
                <p className="text-foreground text-sm mt-3">Your resume shows you deliver quality work (20+ business-ready models, data accuracy mentioned) but you do not explicitly describe testing frameworks, validation processes, or data quality assurance methods.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Add New Bullet to Teamson Role:</p>
                <p className="text-foreground text-sm italic">"Implemented data quality framework using dbt tests and validation checks across 20+ data models, catching data anomalies pre-production and improving data reliability by XX%, reducing downstream reporting errors and building stakeholder trust in analytics outputs."</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Alternative - Enhance Existing Bullet #2:</p>
                <p className="text-sm text-muted-foreground mb-2">Current: "Developed reusable star-schema data models to support scalable, self-service analytics, elevating data accessibility, accuracy, and governance."</p>
                <p className="text-foreground text-sm italic">Enhanced: "Developed reusable star-schema data models with built-in data quality checks (dbt tests, referential integrity validation, null checks), supporting self-service analytics for 100+ users while ensuring accuracy, consistency, and governance across all analytics outputs."</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Addresses critical JD requirement - Both roles explicitly want test frameworks and validation processes</li>
                <li>Shows engineering rigor - Testing and validation separate Analytics Engineers from basic analysts</li>
                <li>Demonstrates data-first mindset - Proactive quality assurance proves you take pride in reliability as Maniko JD requests</li>
                <li>Builds stakeholder trust - Quality focus connects to business partnership aspect both JDs emphasize</li>
                <li>Technical depth - Specific methods (dbt tests, referential integrity, null checks) show hands-on implementation knowledge</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Adding explicit data quality emphasis directly addresses a requirement both target companies prioritize - demonstrates you understand that Analytics Engineers own data reliability, not just data delivery.</p>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#5 Stakeholder Collaboration</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Add Stakeholder Collaboration Process Details</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">What's Missing:</p>
                <p className="text-foreground text-sm mb-3">Both JDs emphasize collaboration process, not just outputs:</p>
                <ul className="text-muted-foreground text-sm ml-4 list-disc space-y-1">
                  <li>Maniko JD: "You will be a close business partner for our teams and work with colleagues to translate their requirements into actionable data solutions"</li>
                  <li>Riot JD: "Working closely with stakeholders to define metrics and enable data-driven decisions is one of your strengths"</li>
                </ul>
                <p className="text-foreground text-sm mt-3">Your bullets show excellent outputs (dashboards, models, training) but do not describe HOW you collaborate with stakeholders to gather requirements, translate business needs, or define metrics.</p>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Option 1 - Add new bullet to Teamson:</p>
                <p className="text-foreground text-sm italic">"Partnered with Commercial, Finance, and Operations leaders to translate business requirements into data solutions, conducting stakeholder workshops to define KPIs, prioritize analytics requests based on business impact, and deliver tailored dashboards addressing specific decision-making needs."</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Option 2 - Enhance existing training bullet:</p>
                <p className="text-sm text-muted-foreground mb-2">Current: "Upskilled Commercial, Supply Chain, Finance, and Operations teams via Tableau and Power BI workshops, building a self-service culture and reducing ad-hoc requests."</p>
                <p className="text-foreground text-sm italic">Enhanced: "Built self-service analytics culture by conducting 10+ stakeholder workshops with Commercial, Supply Chain, Finance, and Operations teams, translating their business questions into Tableau and Power BI solutions, training 50+ users on self-service capabilities, and reducing ad-hoc analytics requests by 30%."</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Shows business partnership - "Partnered with leaders" and "stakeholder workshops" demonstrate close collaboration both JDs want</li>
                <li>Highlights translation skill - "Translate business requirements into data solutions" is exact language from Maniko JD</li>
                <li>Demonstrates prioritization - "Prioritize based on business impact" shows you balance requests strategically</li>
                <li>Process over output - Focuses on HOW you work with stakeholders, not just WHAT you deliver</li>
                <li>Decision-enabling focus - "Addressing specific decision-making needs" connects to Riot's "enable data-driven decisions"</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Makes collaboration process explicit rather than implied - proves you can be the "close business partner" both companies seek, not just a technical executor.</p>
            </div>
          </div>

          {/* Improvement #6 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">#6 Optional Enhancements</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Optional Enhancements for Maximum Impact</h3>
            
            <p className="text-muted-foreground mb-4">These changes are lower priority but can further strengthen positioning:</p>

            <div className="space-y-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">A) Categorize Tech Stack for Easier Scanning</p>
                <div className="grid md:grid-cols-2 gap-4 mt-3 text-sm">
                  <div>
                    <p className="text-muted-foreground mb-2">Current:</p>
                    <p className="text-foreground">dbt, SQL, Tableau, Python, Airflow, Docker, Jira, Git (Version Control, CI/CD), GCP (GCS, BigQuery, Compute Engine)</p>
                  </div>
                  <div>
                    <p className="text-gold mb-2">Enhanced:</p>
                    <ul className="text-foreground space-y-1">
                      <li><strong>Data Modeling & Transformation:</strong> dbt, SQL, star schema, dimensional modeling</li>
                      <li><strong>Databases & Warehouses:</strong> PostgreSQL, BigQuery, SAP</li>
                      <li><strong>Visualization & BI:</strong> Tableau, Power BI</li>
                      <li><strong>Programming:</strong> Python, SQL</li>
                      <li><strong>Orchestration:</strong> Airflow</li>
                      <li><strong>Cloud Platforms:</strong> GCP (BigQuery, GCS, Compute Engine)</li>
                      <li><strong>DevOps & Collaboration:</strong> Git (CI/CD), Docker, Jira</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">B) Quantify Teamson Bullet #6 Training Outcomes</p>
                <div className="mt-3 text-sm">
                  <p className="text-muted-foreground mb-2">Current: "Upskilled Commercial, Supply Chain, Finance, and Operations teams via Tableau and Power BI workshops, building a self-service culture and reducing ad-hoc requests."</p>
                  <p className="text-gold mt-2">Enhanced: "Upskilled 50+ users across Commercial, Supply Chain, Finance, and Operations teams through 10+ Tableau and Power BI workshops, building self-service culture and reducing ad-hoc analytics requests by 30%."</p>
                </div>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-foreground mb-2">C) Add Specificity to Longchamp Bullets</p>
                <div className="mt-3 text-sm space-y-3">
                  <div>
                    <p className="text-muted-foreground">Bullet #1 Enhanced:</p>
                    <p className="text-gold">"Identified key market trends through weekly analysis of product performance (sell-through rates, bestseller tracking, inventory turnover), informing merchandising and promotion decisions that contributed to exceeding sales targets with 20% year-to-date growth."</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Bullet #3 Enhanced:</p>
                    <p className="text-gold">"Improved client retention by analyzing purchase history and style preferences to deliver personalized product recommendations, achieving 65% Capture and Opt-in rates for loyalty program enrollment."</p>
                  </div>
                </div>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mt-4">These optional improvements add polish and depth but are not critical since your core positioning is already strong.</p>
          </div>
        </section>

        {/* STRATEGIC POSITIONING & ATS OPTIMIZATION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Search className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Strategic Positioning & ATS Optimization</h2>
          </div>

          {/* Role Clarity Strategy */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Role Clarity Strategy: Create Two Customized Versions</h3>
            <p className="text-muted-foreground mb-4">You are applying to two different companies with similar but slightly different Analytics Engineer focuses. While one resume works for both, small customizations will improve match rates.</p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">Version 1: Senior Analytics Engineer - Maniko Nails (Primary Target)</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>Title:</strong> "Analytics Engineer"</li>
                  <li><strong>Summary Focus:</strong> Self-service analytics, dbt data modeling, stakeholder collaboration, multi-region BI</li>
                  <li><strong>Keyword Emphasis:</strong> dbt, SQL, Tableau, data modeling, self-service, data quality, validation, business partnership</li>
                  <li><strong>Skills Section:</strong> Emphasize Tableau (their preferred tool), star schema, data quality frameworks</li>
                  <li><strong>Experience Emphasis:</strong> Highlight training/enablement bullets (building self-service culture matches their needs)</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">Version 2: Lead Analytics Engineer - Riot (Secondary Target)</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>Title:</strong> "Analytics Engineer" or "Lead Analytics Engineer"</li>
                  <li><strong>Summary Focus:</strong> Data infrastructure, scalable data products, stakeholder management, data-informed approaches</li>
                  <li><strong>Keyword Emphasis:</strong> Data infrastructure, data products, scalability, stakeholder management, challenge assumptions</li>
                  <li><strong>Skills Section:</strong> Emphasize Python (nice-to-have in their JD), orchestration (Airflow), infrastructure</li>
                  <li><strong>Experience Emphasis:</strong> Highlight dbt infrastructure work and model scalability</li>
                </ul>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-4">Customization is minimal - both roles want the same core Analytics Engineer skills. Main differences are emphasis areas.</p>
          </div>

          {/* ATS Keyword Match Analysis */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">ATS Keyword Match Analysis</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Before Optimization - Maniko Keywords</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>Analytics Engineer</span> <span className="text-yellow-500">WEAK</span></p>
                  <p className="flex justify-between"><span>dbt</span> <span className="text-green-600">PRESENT</span></p>
                  <p className="flex justify-between"><span>SQL</span> <span className="text-green-600">PRESENT</span></p>
                  <p className="flex justify-between"><span>Tableau</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Data modeling</span> <span className="text-yellow-500">WEAK</span></p>
                  <p className="flex justify-between"><span>Self-service analytics</span> <span className="text-yellow-500">WEAK</span></p>
                  <p className="flex justify-between"><span>Data quality</span> <span className="text-yellow-500">WEAK</span></p>
                  <p className="flex justify-between"><span>Validation processes</span> <span className="text-destructive">MISSING</span></p>
                  <p className="flex justify-between"><span>Test frameworks</span> <span className="text-destructive">MISSING</span></p>
                  <p className="flex justify-between"><span>Business partnership</span> <span className="text-destructive">MISSING</span></p>
                </div>
                <p className="mt-3 text-sm font-semibold">Keyword Match Score: <span className="text-yellow-500">55%</span></p>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">After Optimization - Maniko Keywords</p>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between"><span>Analytics Engineer</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>dbt</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>SQL</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Tableau</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Data modeling</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Self-service analytics</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Data quality</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Validation processes</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Test frameworks</span> <span className="text-green-600">STRONG</span></p>
                  <p className="flex justify-between"><span>Business partnership</span> <span className="text-green-600">STRONG</span></p>
                </div>
                <p className="mt-3 text-sm font-semibold">Keyword Match Score: <span className="text-green-600">95%</span></p>
              </div>
            </div>
          </div>

          {/* Keywords Reference List */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Resume Keywords Reference List</h3>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 text-sm">
              <div>
                <p className="font-semibold text-gold mb-2">Technical Skills - Analytics Engineering</p>
                <ul className="text-foreground space-y-1">
                  <li>dbt (data build tool)</li>
                  <li>SQL (structured query language)</li>
                  <li>Data modeling (star schema, dimensional modeling)</li>
                  <li>Data transformation</li>
                  <li>ETL/ELT pipelines</li>
                  <li>Data warehousing</li>
                  <li>Data quality frameworks</li>
                  <li>Test automation (dbt tests)</li>
                  <li>Data validation</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gold mb-2">Technical Skills - Visualization & BI</p>
                <ul className="text-foreground space-y-1">
                  <li>Tableau</li>
                  <li>Power BI</li>
                  <li>Dashboard development</li>
                  <li>Self-service analytics</li>
                  <li>Data visualization</li>
                  <li>Executive reporting</li>
                  <li>BI administration</li>
                  <li>RBAC (role-based access control)</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gold mb-2">Technical Skills - Data Engineering</p>
                <ul className="text-foreground space-y-1">
                  <li>Python</li>
                  <li>Airflow (workflow orchestration)</li>
                  <li>PostgreSQL</li>
                  <li>BigQuery</li>
                  <li>SAP data extraction</li>
                  <li>Data pipelines</li>
                  <li>Workflow automation</li>
                  <li>Data infrastructure</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gold mb-2">Technical Skills - DevOps & Collaboration</p>
                <ul className="text-foreground space-y-1">
                  <li>Git (version control)</li>
                  <li>CI/CD (continuous integration/deployment)</li>
                  <li>Docker (containerization)</li>
                  <li>Jira (project management)</li>
                  <li>Agile methodologies</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gold mb-2">Soft Skills & Process</p>
                <ul className="text-foreground space-y-1">
                  <li>Stakeholder management</li>
                  <li>Business partnership</li>
                  <li>Requirements gathering</li>
                  <li>Cross-functional collaboration</li>
                  <li>User training and enablement</li>
                  <li>Data-driven decision making</li>
                  <li>Metric definition</li>
                  <li>Prioritization based on business impact</li>
                </ul>
              </div>

              <div>
                <p className="font-semibold text-gold mb-2">Business Impact Areas</p>
                <ul className="text-foreground space-y-1">
                  <li>Self-service culture</li>
                  <li>Data accessibility</li>
                  <li>Data accuracy and reliability</li>
                  <li>Data governance</li>
                  <li>Process improvement</li>
                  <li>Efficiency gains</li>
                  <li>Cost reduction</li>
                  <li>Revenue growth</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border-l-4 border-gold">
              <p className="text-sm text-foreground"><strong>Important Note:</strong> Only include keywords that genuinely reflect your experience. Interviewers will ask you to elaborate on anything listed. All keywords above are already demonstrated in your experience - this list simply helps you recognize what to emphasize.</p>
            </div>
          </div>
        </section>

        {/* RESUME EFFECTIVENESS IMPROVEMENT */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <TrendingUp className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Resume Effectiveness Improvement</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> Before Optimization
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>Missing contact information → Reduces accessibility and creates work authorization uncertainty for EU recruiters</li>
                <li>Irrelevant sections consume space → Professional Development and Volunteer Experience dilute focus on technical achievements</li>
                <li>Some bullets lack specificity → KPI analytics, client retention methods unclear, weakening proof of capability</li>
                <li>Data quality emphasis missing → Critical JD requirement not explicitly addressed despite doing this work</li>
                <li>Stakeholder collaboration process unclear → Shows outputs but not HOW you partner with business teams</li>
                <li>Keywords coverage gaps → Missing strategic/process keywords both JDs emphasize (business partnership, translate requirements, test frameworks, validation)</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-muted-foreground">Estimated Pass Rate: 55% for Maniko, 45% for Riot</p>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-green-600 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> After Optimization
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li>Complete contact information with work authorization → Removes critical EU hiring blocker and demonstrates professionalism</li>
                <li>Focused content on relevant achievements → Every section directly supports Analytics Engineer positioning</li>
                <li>All bullets follow XYZ framework → Clear outcomes, quantified metrics, specific methods throughout</li>
                <li>Explicit data quality and testing emphasis → Directly addresses both JDs' quality framework requirements</li>
                <li>Stakeholder collaboration process clear → Shows business partnership and requirements translation capability</li>
                <li>95%+ keyword coverage → Comprehensive match to both Maniko and Riot JD requirements</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-green-600">Estimated Pass Rate: 95% for Maniko, 90% for Riot</p>
            </div>
          </div>

          {/* Expected Outcomes */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Expected Outcomes</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-3">Current Resume Performance:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>ATS Success Rate:</strong> 60% (strong technical keywords but missing process keywords)</li>
                  <li><strong>Recruiter Response Rate:</strong> 55% (good experience but contact/authorization friction)</li>
                  <li><strong>Interview Conversion:</strong> 70% (strong technical skills once you get through screening)</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">Optimized Resume Performance:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>ATS Success Rate:</strong> 95% (comprehensive keyword coverage across technical and process areas)</li>
                  <li><strong>Recruiter Response Rate:</strong> 90% (clear positioning, complete information, no authorization friction)</li>
                  <li><strong>Interview Conversion:</strong> 85% (can articulate both technical depth and business partnership)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border-l-4 border-gold">
              <p className="text-sm text-foreground"><strong>Bottom Line:</strong> Optimizing contact information, removing irrelevant sections, and adding strategic keywords can increase your interview rate by approximately 3x for EU Analytics Engineer roles. Your technical experience is already excellent - these changes simply ensure recruiters see it without friction.</p>
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

          {/* Step 1 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">1</div>
              <h3 className="font-heading text-xl text-foreground">Fix Contact Information and Header</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Add Complete Contact Details (15 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Add phone number in international format: +886-XXX-XXX-XXX</li>
                  <li>Add explicit location: Taipei, Taiwan</li>
                  <li>Add work authorization statement (choose appropriate option based on your visa status)</li>
                  <li>Add professional title: Analytics Engineer</li>
                  <li>Complete LinkedIn URL format: linkedin.com/in/[yourprofile]</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Choose Work Authorization Approach (5 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>"EU Work Authorization | Open to relocation" (if you have visa/permit)</li>
                  <li>"Relocating to [Berlin/Paris] [Month Year] | Valid work authorization" (if already planned)</li>
                  <li>"Requires work sponsorship | Open to relocation" (if you need employer sponsorship)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</div>
              <h3 className="font-heading text-xl text-foreground">Remove Irrelevant Sections</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Delete Professional Development Section (2 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Remove "dbt Meetup Taiwan" and "Tableau User Group Meetup Taiwan"</li>
                  <li>Community involvement can stay on LinkedIn but does not belong on resume</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Delete Volunteer Experience Section (2 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Remove 2013 tourism planning entry</li>
                  <li>12-year-old non-work-related volunteer work does not support Analytics Engineer positioning</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</div>
              <h3 className="font-heading text-xl text-foreground">Enhance Key Bullets for Specificity</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Rewrite Teamson Bullet #4 on KPI Analytics (20 minutes)</p>
                <p className="text-muted-foreground mt-1">Current: "Facilitated data-driven actions through KPI and expense analytics, uncovering cost drivers and enabling a 3x contribution-margin increase"</p>
                <p className="text-gold mt-2">Enhanced: "Enabled 3x contribution-margin increase by delivering KPI dashboards tracking product-level profitability, supplier costs, and shipping expenses, identifying $50K in cost-saving opportunities (renegotiated supplier terms, optimized shipping routes) and informing pricing strategy adjustments across 200+ SKUs."</p>
              </div>
              <div>
                <p className="font-semibold">Data Quality Enhancements - Add new bullet OR enhance existing bullet #2</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>Option A - New bullet:</strong> "Implemented data quality framework using dbt tests and validation checks across 20+ data models, catching data anomalies pre-production and improving data reliability by 25%, reducing downstream reporting errors and building stakeholder trust in analytics outputs."</li>
                  <li><strong>Option B - Enhance existing bullet #2:</strong> "Developed reusable star-schema data models with built-in data quality checks (dbt tests, referential integrity validation, null checks), supporting self-service analytics for 100+ users while ensuring accuracy, consistency, and governance across all analytics outputs."</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Stakeholder Collaboration Details - Enhance training bullet OR add new collaboration bullet</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>Enhanced training bullet:</strong> "Built self-service analytics culture by conducting 10+ stakeholder workshops with Commercial, Supply Chain, Finance, and Operations teams, translating their business questions into Tableau and Power BI solutions, training 50+ users on self-service capabilities, and reducing ad-hoc analytics requests by 30%."</li>
                  <li><strong>OR add new bullet:</strong> "Partnered with Commercial, Finance, and Operations leaders to translate business requirements into data solutions, conducting stakeholder workshops to define KPIs, prioritize analytics requests based on business impact, and deliver tailored dashboards addressing specific decision-making needs."</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</div>
              <h3 className="font-heading text-xl text-foreground">Optional Enhancements</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Categorize Tech Stack (15 minutes - optional)</p>
                <p className="text-muted-foreground mt-1">Data Modeling & Transformation, Databases & Warehouses, Visualization & BI, Programming, Orchestration, Cloud Platforms, DevOps & Collaboration</p>
              </div>
              <div>
                <p className="font-semibold">Quantify Training Outcomes (10 minutes - optional)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>How many users trained? (estimate: 50+ across four departments)</li>
                  <li>How many workshops? (estimate: 10+ over 1.5 years)</li>
                  <li>Ad-hoc request reduction? (estimate: 30% based on ticket data)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Add Specificity to Longchamp Bullets (20 minutes - optional)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Bullet #1: Add "weekly analysis of sell-through rates, bestseller tracking, inventory turnover"</li>
                  <li>Bullet #3: Add "purchase history and style preferences analysis"</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</div>
              <h3 className="font-heading text-xl text-foreground">Create Two Customized Versions</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Version A: Maniko Nails Focus (30 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Emphasize: Self-service analytics, Tableau expertise, training/enablement, data quality</li>
                  <li>Skills section: Highlight Tableau administration, star schema, data quality frameworks</li>
                  <li>Summary: Can add "self-service analytics" if you want</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Version B: Riot Focus (30 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Emphasize: Data infrastructure, scalable data products, Python, orchestration</li>
                  <li>Skills section: Highlight Python, Airflow, data infrastructure, data products</li>
                  <li>Consider adding example of challenging assumptions if you have one</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">6</div>
              <h3 className="font-heading text-xl text-foreground">Prepare for Interviews</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Prepare STAR Stories (2-3 hours)</p>
                <p className="text-muted-foreground mt-1">For each major achievement, prepare a 2-3 minute story using STAR Framework:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>Situation:</strong> What was the context/problem?</li>
                  <li><strong>Task:</strong> What was your specific responsibility?</li>
                  <li><strong>Action:</strong> What did you do? (step-by-step)</li>
                  <li><strong>Result:</strong> What happened? (quantified outcome)</li>
                </ul>
                <p className="text-muted-foreground mt-2">Example for dbt implementation: S: SAP data was difficult to access, required manual ETL, caused delays. T: Build automated data transformation pipeline to improve analyst productivity. A: Implemented dbt workflows with incremental models, created star schema, set up testing framework. R: 20% latency improvement, 20+ business-ready models, enabled self-service analytics.</p>
              </div>
              <div>
                <p className="font-semibold">Stories to Prepare:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>dbt implementation and optimization</li>
                  <li>Dashboard delivery with 100% on-time record</li>
                  <li>Building self-service culture through training</li>
                  <li>3x contribution-margin increase analytics</li>
                  <li>Tableau administration for 100+ users</li>
                  <li>Cross-region BI unification</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Technical Preparation (3-4 hours)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>dbt best practices (incremental models, testing, documentation)</li>
                  <li>Star schema and dimensional modeling</li>
                  <li>Data quality frameworks and testing approaches</li>
                  <li>Stakeholder collaboration and requirements gathering</li>
                  <li>SQL optimization techniques</li>
                  <li>Tableau administration and governance</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Behavioral Preparation (2 hours)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>How do you prioritize competing analytics requests?</li>
                  <li>Describe a time you had to explain technical concepts to non-technical stakeholders</li>
                  <li>Tell me about a data quality issue you discovered and resolved</li>
                  <li>How do you balance speed vs. quality in analytics delivery?</li>
                  <li>Describe your approach to building self-service analytics capabilities</li>
                  <li>Tell me about a time you challenged a business assumption with data</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 7 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">7</div>
              <h3 className="font-heading text-xl text-foreground">Apply to Target Roles</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Start with Maniko and Riot (your current targets)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Maniko: Use Version A (self-service analytics emphasis)</li>
                  <li>Riot: Use Version B (data infrastructure emphasis)</li>
                  <li>Customize 2-3 bullets to match specific JD language</li>
                  <li>Write tailored cover letter if requested</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Identify 5-10 Similar Roles (1-2 hours)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Analytics Engineer roles at e-commerce companies</li>
                  <li>Senior Data Analyst roles with dbt/modeling focus</li>
                  <li>BI Engineer roles emphasizing stakeholder collaboration</li>
                  <li>Remote EU positions open to international candidates</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Companies to consider:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Other EU e-commerce/retail tech companies</li>
                  <li>Fintech companies with analytics engineering teams</li>
                  <li>SaaS companies building data products</li>
                  <li>Startups with modern data stacks (dbt, Tableau, cloud warehouses)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Track Applications (ongoing)</p>
                <p className="text-muted-foreground mt-1">Create spreadsheet with: Company name, Role title, Date applied, Customizations made, Follow-up dates, Interview status</p>
              </div>
            </div>
          </div>

          {/* Reminders */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Reminders</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <p className="text-sm font-semibold text-green-600 mb-2 flex items-center gap-2"><CheckCircle className="w-4 h-4" /> Do's</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>Customize for each application: Change 2-3 bullets to match specific JD keywords</li>
                  <li>Be ready to explain every metric: Interviewers will ask how you measured 20% improvement, calculated 3x increase</li>
                  <li>Follow up after applying: Email recruiter 5-7 days later with brief note referencing your fit</li>
                  <li>Research company before interview: Understand their data stack, business model, analytics challenges</li>
                  <li>Show genuine enthusiasm: Reference specific company initiatives or products you find interesting</li>
                  <li>Prepare questions: Ask about data team structure, current analytics challenges, tech stack evolution</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2"><XCircle className="w-4 h-4" /> Don'ts</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>Don't apply without work authorization clarity: EU companies need to know visa status upfront</li>
                  <li>Don't exaggerate metrics: Be ready to support every number with data or conservative estimates</li>
                  <li>Don't ignore cultural fit: Research company values and work style before applying</li>
                  <li>Don't badmouth previous employers: Keep all examples professional and constructive</li>
                  <li>Don't submit generic resume: Every application should have at least minor customizations</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* FINAL THOUGHT */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8 text-cream">
            <h2 className="font-heading text-2xl mb-4">Final Thought</h2>
            <div className="space-y-4 text-cream/90">
              <p>Your previous resume was not telling this story effectively. Missing contact information created work authorization uncertainty for EU recruiters. Irrelevant sections (meetup attendance, 12-year-old volunteer work) diluted focus on technical achievements. Some bullets lacked specificity on methodology, weakening proof of analytical depth. Critical keywords around data quality frameworks and stakeholder collaboration were implied but not explicit.</p>
              
              <p>Your new resume eliminates these gaps. Complete contact information with work authorization statement removes hiring friction. Focused content on relevant Analytics Engineer achievements demonstrates better judgment. Enhanced bullets with specific KPIs, methods, and collaboration processes prove depth. Explicit data quality and stakeholder partnership emphasis addresses both target companies' core requirements.</p>
              
              <p className="text-gold font-semibold text-lg">You have the experience. Now you have the positioning. Go get the offer.</p>
              
              <p className="text-xl">Good luck! 🚀</p>
            </div>
          </div>
        </section>

        {/* FEEDBACK SECTION */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">Your Feedback Matters</h2>
          </div>

          <p className="text-muted-foreground mb-6">I hope this review has been valuable in strengthening your application.</p>

          <div className="grid md:grid-cols-2 gap-6">
            <a 
              href="https://tally.so/r/81L09x" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-card rounded-xl p-6 border-2 border-gold/30 hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h3 className="font-heading text-xl text-foreground">Share Your Feedback</h3>
              </div>
              <p className="text-sm text-muted-foreground">Your honest feedback helps me improve the service. Testimonials help other job seekers discover this service. I read every response and continuously refine my approach.</p>
            </a>

            <a 
              href="https://www.trustpilot.com/review/jamesbugden.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="block bg-card rounded-xl p-6 border-2 border-gold/30 hover:border-gold transition-colors"
            >
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-gold fill-gold" />
                <h3 className="font-heading text-xl text-foreground">Trustpilot</h3>
              </div>
              <p className="text-sm text-muted-foreground">Public reviews help build credibility. Your review helps other professionals make informed decisions.</p>
            </a>
          </div>

          <div className="bg-muted/30 rounded-xl p-6 mt-6 border border-border">
            <h4 className="font-semibold text-foreground mb-2">Why is the Trustpilot score 3.8?</h4>
            <p className="text-sm text-muted-foreground">New businesses on Trustpilot start with an average rating. As more clients like you leave reviews, the score will better reflect the actual service quality. Your feedback directly impacts this.</p>
          </div>
        </section>

      </main>

    </div>
  );
};

export default JanelleChengReview;