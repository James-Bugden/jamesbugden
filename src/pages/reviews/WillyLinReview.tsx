import { ArrowLeft, Download, FileText, TrendingUp, Zap, Target, CheckCircle, XCircle, Clock, Users, AlertTriangle, Calendar, Lightbulb, Star, BookOpen, Layout, Award, GraduationCap, RefreshCw, Briefcase, Building, Globe, BarChart3, MessageSquare, Phone, MapPin, Shield, Trash2, Edit3, Search, UserCheck, Code, Database, TestTube, Handshake, FileWarning, Layers } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';
import { SEO } from "@/components/SEO";

const WillyLinReview = () => {
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
              href="/downloads/WILLY_LIN_RESUME_REVIEW.pdf" 
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Willy Lin</h1>
          <p className="text-cream/80 text-lg">AI Engineer | NLP Engineer | LLM Data Scientist</p>
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
              <p>Your resume has strong education and technical skills sections, but weak presentation and showcase of those skills in a format that works for recruiters and hiring managers.</p>
              
              <p><strong>First, positioning confusion from trying to be everything to everyone</strong>—your resume mixes AI engineering with data engineering, data analytics, and general ML work, creating uncertainty about what role you're actually targeting.</p>
              
              <p><strong>Second, poor judgment signaled by length</strong>—you're using two pages with 13 bullet points for less than one year of primary experience (two pages should be reserved for professionals with 8+ years of substantial achievements).</p>
              
              <p><strong>Third, duty-based language throughout instead of results-focused value proposition</strong>—you're telling employers what you were responsible for rather than what outcomes you delivered, with zero bullets following the XYZ framework of "Accomplished [X] as measured by [Y] by doing [Z]."</p>
              
              <p>However, you have underlying qualifications for an early-career AI professional. Your hands-on Qwen3-8B training experience, GRPO optimization work, multilingual capabilities, production deployment knowledge, and MSc from University of Bath.</p>
              
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
                  <span className="text-foreground"><strong>Strong Educational Foundation:</strong> MSc Data Science from University of Bath (UK) plus BSc Applied Mathematics demonstrates solid quantitative background—education section is well-structured and appropriate</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Relevant Technical Skills Section:</strong> Python, PyTorch, TensorFlow, LLM training frameworks (Axolotl), and infrastructure tools (HPC, RunPod, Vast.ai) are clearly listed—skills section is comprehensive and well-organized</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Qwen3-8B LLM Training Experience:</strong> Direct hands-on experience with model training, fine-tuning, and GRPO optimization aligns with all three target roles</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Taiwan AI Certifications:</strong> iPAS AI Application Planner certification adds local credibility for Taiwan-based positions (Foxconn)</span>
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
                  <span className="text-foreground"><strong>Unprofessional Email Address:</strong> "willy1234willy123413@gmail.com" looks unprofessional—use firstname.lastname@gmail.com format (e.g., willy.lin@gmail.com)</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Missing Critical Contact Information:</strong> No phone number or LinkedIn URL in header—recruiters need multiple ways to reach you and will check LinkedIn before calling</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Basic Format with No Visual Hierarchy:</strong> Current layout is flat and doesn't guide the reader's attention to your strongest qualifications—needs structure to help recruiters scan efficiently</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Summary is Duty-Oriented, Not Result-Oriented:</strong> You're telling employers what you did instead of the measurable results you achieved—no metrics, no outcomes, no proof of impact</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Confusing Title:</strong> "AI Engineer – Large Language Models & Data Pipelines": Why combine both? This creates positioning confusion—pick ONE primary identity per application</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>13 Bullet Points for &lt;12 Month Role is Overkill:</strong> More bullets = weaker impact. Keep 4-5 of only the most relevant points for the target job</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Duty-Based Language Throughout:</strong> Bullets describe responsibilities ("Led and executed," "Designed and delivered") instead of outcomes achieved—needs complete rewrite using XYZ framework</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Separate "Internship Experience" Section:</strong> Should be combined into general "Experience" section, not isolated</span>
                </li>
              </ul>
            </div>
          </div>

          {/* Overview Table */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">Current State vs. Optimal State</h3>
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
                  <td className="py-2 text-foreground font-semibold">Contact Information</td>
                  <td className="py-2 text-muted-foreground">Unprofessional email (willy1234willy123413@gmail.com), missing phone and LinkedIn</td>
                  <td className="py-2 text-foreground">willy.lin@gmail.com (or firstname.lastname format) + phone number + LinkedIn URL</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Format & Visual Hierarchy</td>
                  <td className="py-2 text-muted-foreground">Basic, flat layout with no structure to guide reader attention</td>
                  <td className="py-2 text-foreground">Clear sections with white space, strategic use of bold/headers to highlight strengths</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Role Positioning</td>
                  <td className="py-2 text-muted-foreground">"AI Engineer – Large Language Models & Data Pipelines" creates identity confusion</td>
                  <td className="py-2 text-foreground">Choose ONE per application: "AI Engineer" OR "NLP Engineer" OR "LLM Data Scientist"</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Resume Length</td>
                  <td className="py-2 text-muted-foreground">2 pages for &lt;1 year primary experience signals poor judgment</td>
                  <td className="py-2 text-foreground">1 page maximum—forces prioritization of highest-impact content only</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Summary Orientation</td>
                  <td className="py-2 text-muted-foreground">Duty-focused ("specializing in," "hands-on experience delivering") with no quantified results</td>
                  <td className="py-2 text-foreground">Result-focused with metrics: token volumes processed, model performance improvements, deployment speed</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Summary Structure</td>
                  <td className="py-2 text-muted-foreground">Dense single paragraph, confusing first line mixing "AI Engineer" with "Data Science Master's"</td>
                  <td className="py-2 text-foreground">3-4 concise sentences with clear role identity, quantified achievements upfront</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">Bullet Point Volume</td>
                  <td className="py-2 text-muted-foreground">13 bullets for single 9-month role dilutes impact</td>
                  <td className="py-2 text-foreground">4-5 highest-impact bullets only, each following XYZ framework</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">Bullet Structure</td>
                  <td className="py-2 text-muted-foreground">Duty-based language ("Led and executed," "Designed and delivered") with no measurable outcomes</td>
                  <td className="py-2 text-foreground">XYZ framework: Accomplished [X] as measured by [Y], by doing [Z]</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">HIGH</span></td>
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
            We identified 12 strategic transformations to position you optimally across your target roles. Here are the highest-impact changes:
          </p>

          {/* Improvement #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 Compress to One Page</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Compress to One Page by Removing 8+ Bullets & Eliminating White Space</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Length Signals Poor Judgment):</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>Two pages for &lt;1 year experience is a red flag: Recruiters expect 1 page for 0-8 years experience; two pages signals you can't prioritize or edit</p>
                  <p>13 bullets dilutes your strongest achievements: Every additional bullet reduces the impact of your best work—recruiters will skim or skip entirely</p>
                  <p>Many bullets are redundant: Data pipeline bullets repeat similar information; infrastructure bullets overlap; multi-modal integration is mentioned twice</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Experience Section:</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm">
                  <p className="font-bold">EXPERIENCE</p>
                  <p className="font-semibold mt-2">Wanda AI Technology Co., Ltd. | Taipei, Taiwan</p>
                  <p className="text-muted-foreground">AI Engineer | Apr 2025 – Present</p>
                  <ul className="mt-2 space-y-2 text-foreground list-disc ml-4">
                    <li>Trained and optimized Qwen3-8B LLM for multilingual conversational AI (Chinese/English/Japanese), processing 20B pretraining tokens and 6-7B fine-tuning tokens, achieving [X]% improvement in persona consistency and [Y]% reduction in hallucination rate vs. baseline Qwen model through GRPO reinforcement learning with rubric-based reward modeling</li>
                    <li>Built production-grade data pipeline processing 500M+ tokens monthly using Python multi-threading and JSON/JSONL normalization, reducing data preparation time by [X]% and enabling 3x faster training iteration cycles for continuous model improvement</li>
                    <li>Deployed low-latency embedding inference service using Go + LibTorch + gRPC, reducing model initialization overhead by [X]ms and supporting 1000+ QPS for real-time RAG retrieval in production virtual assistant platform</li>
                    <li>Established LLM evaluation framework benchmarking RAG capability, multi-turn coherence, and proactive response behavior against ChatGPT API baseline, identifying [X] critical improvement areas that guided GRPO optimization priorities</li>
                  </ul>
                  <p className="font-semibold mt-4">Data Analytics Training Program | Taiwan</p>
                  <p className="text-muted-foreground">Data Analyst Intern | Dec 2024 – Mar 2025</p>
                  <ul className="mt-2 space-y-2 text-foreground list-disc ml-4">
                    <li>[1 bullet showing business impact using XYZ framework]</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>One page forces prioritization of only your highest-impact, most relevant work</li>
                <li>4-5 bullets create focus on achievements that directly prove you can succeed in target roles</li>
                <li>Each bullet follows XYZ framework: Accomplished [X] as measured by [Y], by doing [Z]—shows outcomes, not duties</li>
                <li>Unified Experience section eliminates artificial fragmentation between "work" and "internship"</li>
                <li>Quantified metrics (tokens processed, improvement percentages, latency reductions) replace vague descriptions</li>
                <li>Strategic keyword placement: GRPO, RAG, embedding, multi-turn coherence, hallucination reduction all appear naturally</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: One-page resume demonstrates judgment, forces you to articulate only your strongest value propositions, and ensures recruiters actually read your content instead of skimming or skipping.</p>
            </div>
          </div>

          {/* Improvement #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 Rewrite Summary</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Rewrite Summary from Duty-Focus to Result-Focus with Clear Role Identity</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Tells What You Did, Not What You Achieved):</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>First line creates identity confusion: "AI Engineer with a Master's degree in Data Science"—is your degree your job title? This makes it unclear what role you're actually targeting</p>
                  <p>Zero quantified results: No metrics, no outcomes, no proof of impact—just a list of areas you "specialized in" and tasks you have "experience with"</p>
                  <p>Dense paragraph is unreadable at a glance: One 100+ word block of text defeats the purpose of a summary—recruiters won't read this</p>
                  <p>Passive language throughout: "specializing in," "hands-on experience," "worked on," "strong focus"—all duty-oriented, none result-oriented</p>
                  <p>No differentiation: Nothing here proves you're better than the 50 other candidates who also have "LLM training experience"</p>
                  <p>Subtitle adds more confusion: "LARGE LANGUAGE MODELS & DATA PIPELINES"—are you an AI Engineer or a Data Engineer?</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version - AI Engineer:</p>
                <p className="text-foreground text-sm italic">"AI Engineer with 9 months specialized experience training production LLMs, including Qwen3-8B model optimization achieving [X]% improvement in persona consistency through GRPO reinforcement learning. Built data pipelines processing 26-27B tokens for multilingual training (Chinese/English/Japanese) and deployed low-latency embedding service supporting 1000+ QPS for production RAG retrieval. MSc Data Science (University of Bath, UK) with expertise in PyTorch, Transformers, and HPC-based model training infrastructure."</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version - NLP Engineer:</p>
                <p className="text-foreground text-sm italic">"NLP Engineer specializing in multilingual LLM development, with 9 months experience fine-tuning Qwen3-8B for Chinese/English/Japanese conversational AI and achieving [X]% improvement in multi-turn coherence through GRPO optimization. Built production NLP pipelines processing 500M+ tokens monthly with automated data cleaning, deduplication, and schema validation, enabling 3x faster training cycles. MSc Data Science (University of Bath, UK) with expertise in text processing, transformer architectures, and model evaluation frameworks."</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Clear role identity upfront: "AI Engineer" or "NLP Engineer" (not both at once)—removes all positioning confusion</li>
                <li>Quantified experience first: "9 months specialized experience training production LLMs" sets realistic expectations while emphasizing depth</li>
                <li>Three specific, measurable achievements: Token volumes, performance improvements, efficiency gains—proves you deliver results</li>
                <li>Strategic keyword loading: Qwen3-8B, GRPO, multilingual, PyTorch, Transformers, HPC—hits major ATS requirements</li>
                <li>Education positioned as credential: MSc provides credibility without creating identity confusion</li>
                <li>Readable structure: Three sentences with clear hierarchy—recruiters can scan this in 6 seconds</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Summary is the most important 60 words on your resume—it determines whether recruiters read the rest. Result-focused summary with clear positioning and quantified achievements makes them want to keep reading.</p>
            </div>
          </div>

          {/* Improvement #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#3 Convert All Bullets to XYZ Framework</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Convert All Bullets to XYZ Framework (Accomplished [X] Measured by [Y] by Doing [Z])</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Duty-Based Language):</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>Every single bullet is duty-focused: "Led and executed," "Designed and delivered," "Owned," "Built," "Implemented"—all describe responsibilities, not results</p>
                  <p>Zero measurable outcomes: No performance improvements, no efficiency gains, no business impact metrics</p>
                  <p>"Significantly reducing" is meaningless: How much? 10%? 50%? 90%? Vague adjectives don't prove anything</p>
                  <p>No context for why these tasks mattered: What problem did this solve? What was the before state? What changed after your work?</p>
                  <p>Reads like a job description: These could be copy-pasted from a job posting—nothing here proves YOU specifically delivered value</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version (XYZ Framework):</p>
                <ul className="text-foreground text-sm space-y-3 list-disc ml-4">
                  <li>Improved Qwen3-8B conversational quality by [X]% for multilingual use cases (Chinese/English/Japanese), measured by human evaluation scores for persona consistency and response appropriateness, by implementing GRPO reinforcement learning with Qwen-14B reward model and three custom rubric-based evaluation prompts targeting hallucination reduction, context coherence, and proactive engagement</li>
                  <li>Reduced LLM training iteration time by [Y]% (from [A] days to [B] days per cycle), enabling 3x faster model experimentation, by building Python multi-threading data pipeline automating generation, cleaning, deduplication, and JSON/JSONL validation for 26-27B tokens (20B pretraining + 6-7B fine-tuning)</li>
                  <li>Decreased embedding inference latency by [Z]ms (achieving &lt;[X]ms 95th percentile), supporting 1000+ queries per second for production RAG retrieval, by developing Go-based embedding service using LibTorch and gRPC that eliminated Python interpreter overhead and enabled concurrent request processing</li>
                  <li>Identified [N] critical model improvement areas increasing training ROI by [X]%, measured by cost-per-quality-point improvement, by establishing comparative evaluation framework benchmarking Qwen3-8B against ChatGPT API across RAG accuracy, multi-turn coherence, and persona stability metrics</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Clear [X] outcome stated first: What you accomplished, with specific metric</li>
                <li>Measurable [Y] proof provided: How you quantified the improvement—percentages, time savings, latency reductions</li>
                <li>Specific [Z] method explained: What you actually did to achieve the result—tools, techniques, approaches</li>
                <li>Business context clear: Why this mattered—faster iteration, lower latency, better ROI</li>
                <li>Competitive differentiation: These bullets prove you can deliver measurable improvements, not just complete tasks</li>
              </ul>
              <div className="mt-4 p-3 bg-gold/10 rounded-lg">
                <p className="text-sm text-foreground"><strong>Note:</strong> You'll need to add the actual metrics (marked with brackets like [X]%, [Y] days, [Z]ms). If you don't have exact numbers, use conservative estimates based on your observations: "approximately 40% faster," "reduced from 7 days to 5 days," "achieved &lt;50ms p95 latency." Never fabricate, but do quantify.</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: XYZ framework transforms duty lists into proof of capability. Recruiters and hiring managers want to know what results you can deliver for them—this structure answers that question directly.</p>
            </div>
          </div>

          {/* Improvement #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">#4 Merge Internship into Experience</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Merge "Internship Experience" into Main "Experience" Section</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">Current Version (Artificial Fragmentation):</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>Separate sections create fragmentation: Makes your timeline look artificially thin by isolating internship</p>
                  <p>"Internship Experience" sounds junior: Professional resumes use unified "Experience" sections</p>
                  <p>Wastes vertical space: Section headers consume valuable lines on a one-page resume</p>
                  <p>Disrupts chronological flow: Readers expect reverse chronological order in one unified section</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">Optimized Version:</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm">
                  <p className="font-bold">EXPERIENCE</p>
                  <p className="font-semibold mt-2">Wanda AI Technology Co., Ltd. | Taipei, Taiwan</p>
                  <p className="text-muted-foreground">AI Engineer | Apr 2025 – Present</p>
                  <p className="text-foreground mt-1">[4-5 optimized bullets using XYZ framework]</p>
                  <p className="font-semibold mt-4">Data Analytics Training Program | Taiwan</p>
                  <p className="text-muted-foreground">Data Analyst Intern | Dec 2024 – Mar 2025</p>
                  <p className="text-foreground mt-1">[1-2 optimized bullets using XYZ framework showing business impact]</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Why This Works:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>Unified section looks more substantial: Professional standard for all experience levels</li>
                <li>Saves vertical space: Eliminates redundant section header, freeing lines for content</li>
                <li>Clear reverse chronological order: Most recent role first, then internship—natural reading flow</li>
                <li>Internship isn't hidden: Still clearly labeled with dates, just not isolated in separate section</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: Small structural change eliminates amateurish fragmentation and makes your timeline look more cohesive.</p>
            </div>
          </div>

          {/* Improvement #5 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">#5 Education, Skills, Certifications</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">Confirm Education, Skills, and Certifications Are Already Optimized</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-green-500/10 rounded-lg p-4 border-l-4 border-green-600">
                <p className="text-sm font-semibold text-green-700 mb-2">Current Version (Already Strong):</p>
                <div className="mt-3 space-y-4 text-sm">
                  <div>
                    <p className="font-semibold text-foreground">EDUCATION</p>
                    <p className="text-foreground">University of Bath, United Kingdom — MSc in Data Science</p>
                    <p className="text-foreground">Chinese Culture University, Taiwan — BSc in Applied Mathematics</p>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">TECHNICAL SKILLS</p>
                    <ul className="text-foreground space-y-1">
                      <li><strong>Languages:</strong> Python, JavaScript, Go</li>
                      <li><strong>LLMs & NLP:</strong> Qwen3-8B, Transformers, NLP, Prompt Engineering</li>
                      <li><strong>Model Training:</strong> CPR, SFT, QAT, GRPO</li>
                      <li><strong>Data & Pipelines:</strong> Data generation, data cleaning, JSON/JSONL schema design</li>
                      <li><strong>Frameworks & Tools:</strong> PyTorch, TensorFlow, Scikit-learn, Axolotl</li>
                      <li><strong>Infrastructure:</strong> HPC, RunPod, Vast.ai, Remote GPU environments</li>
                      <li><strong>Visualization & BI:</strong> Pandas, Matplotlib, Plotly, Power BI</li>
                      <li><strong>Version Control:</strong> Git, GitHub</li>
                    </ul>
                  </div>
                  <div>
                    <p className="font-semibold text-foreground">CERTIFICATIONS</p>
                    <p className="text-foreground">iPAS AI Application Planner (Intermediate) – Ministry of Economic Affairs, Taiwan</p>
                    <p className="text-foreground">AI & Digital Innovation Programs – CMRI Digital Innovation Institute</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">Assessment:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>These sections are already well-structured and appropriate</li>
                <li>Education clearly formatted: University, degree, location—all essential information present</li>
                <li>Skills logically grouped: By category (Languages, LLMs & NLP, Model Training, etc.) instead of alphabetical dump</li>
                <li>Certifications provide local credibility: Taiwan-specific credentials valuable for Foxconn application</li>
                <li>No unnecessary details: No GPA (appropriate for experienced professionals), no irrelevant coursework</li>
              </ul>
              <div className="mt-4 p-3 bg-gold/10 rounded-lg">
                <p className="text-sm text-foreground"><strong>Only Minor Enhancement Needed:</strong> Add role-specific keywords to Skills section when customizing for each application:</p>
                <ul className="text-sm text-foreground mt-2 space-y-1 ml-4 list-disc">
                  <li>For NLP role: Add SpaCy, NLTK, Gensim, Word2Vec, NER, Text Classification</li>
                  <li>For RAG role: Add LangChain (study), RAG Architectures, LlamaIndex (familiar), Azure OpenAI (familiar)</li>
                  <li>For Microsoft: Add ML Systems, Model Serving, Online Learning (if applicable)</li>
                </ul>
              </div>
              <p className="mt-4 text-sm font-semibold text-gold">Impact: These sections already meet professional standards—don't waste time over-optimizing them when other sections need critical fixes.</p>
            </div>
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
            <h3 className="font-heading text-xl text-foreground mb-4">Role Clarity Strategy: Create Three Customized Versions</h3>
            <p className="text-muted-foreground mb-4">You sent three different job types, which require three different positioning approaches. You cannot use one resume for all three and expect good results. Here's how to customize:</p>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">Version 1: AI Engineer (Microsoft Applied Scientist 2)</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>Title:</strong> "AI Engineer"</li>
                  <li><strong>Summary Focus:</strong> LLM training, model optimization, reinforcement learning, evaluation frameworks</li>
                  <li><strong>Keyword Emphasis:</strong> GRPO, Qwen3-8B, model training, benchmarking, PyTorch, large-scale systems</li>
                  <li><strong>Bullet Emphasis:</strong> Training pipeline efficiency, model performance improvements, evaluation framework design</li>
                  <li><strong>Skills Section:</strong> Remove BI tools (Power BI, Plotly), add ML Systems, Model Serving if applicable</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">Version 2: NLP Engineer (Foxconn Type 2)</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>Title:</strong> "NLP Engineer"</li>
                  <li><strong>Summary Focus:</strong> Multilingual NLP, text processing, Chinese/English/Japanese language models</li>
                  <li><strong>Keyword Emphasis:</strong> NLP, text mining, multilingual, transformers, fine-tuning, Hugging Face</li>
                  <li><strong>Bullet Emphasis:</strong> Language-specific capabilities, text processing pipelines, NLP algorithm implementation</li>
                  <li><strong>Skills Section:</strong> ADD SpaCy, NLTK, Gensim, Word2Vec, text classification, NER, POS tagging</li>
                </ul>
              </div>

              <div className="bg-muted/30 rounded-lg p-4">
                <p className="text-sm font-semibold text-gold mb-3">Version 3: LLM Data Scientist (RAG/Agentic AI Role)</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li><strong>Title:</strong> "LLM Data Scientist" or "GenAI Engineer"</li>
                  <li><strong>Summary Focus:</strong> RAG systems, knowledge retrieval, evaluation frameworks, production deployment</li>
                  <li><strong>Keyword Emphasis:</strong> RAG, retrieval-augmented generation, LangChain, evaluation, embeddings, context-aware</li>
                  <li><strong>Bullet Emphasis:</strong> Reframe evaluation work as RAG capability testing, emphasize embedding service for retrieval</li>
                  <li><strong>Skills Section:</strong> ADD LangChain (study), RAG Architectures, LlamaIndex (familiar), Azure OpenAI (familiar), Cohere (familiar)</li>
                </ul>
              </div>
            </div>

            <div className="bg-gold/10 rounded-lg p-4 mt-4 border-l-4 border-gold">
              <p className="text-sm font-semibold text-foreground mb-2">Honest Approach for Missing Keywords:</p>
              <ul className="text-sm text-foreground space-y-1">
                <li><strong>"(study)":</strong> For tools you're currently learning (LangChain, LlamaIndex)</li>
                <li><strong>"(familiar)":</strong> For tools you understand conceptually but haven't used extensively (Azure OpenAI, Cohere)</li>
                <li><strong>Reframe existing work:</strong> Your evaluation framework DID test retrieval capabilities—calling it "RAG capability evaluation" is truthful</li>
                <li><strong>Don't fabricate:</strong> If you genuinely have zero exposure to a tool, don't claim it—focus on adjacent experience instead</li>
              </ul>
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
                <li><strong>Overall Score:</strong> 60/100</li>
                <li>Two pages for &lt;1 year experience</li>
                <li>13 duty-based bullets with zero measurable outcomes</li>
                <li>Unprofessional email, missing phone/LinkedIn</li>
                <li>Role positioning confusion</li>
                <li>39-61% keyword coverage depending on target role</li>
              </ul>
            </div>

            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-green-600 mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> After Optimization
              </p>
              <ul className="space-y-2 text-sm text-foreground">
                <li><strong>Overall Score:</strong> 90/100</li>
                <li>One page with 4-5 high-impact achievement bullets</li>
                <li>Every bullet follows XYZ framework with quantified results</li>
                <li>Professional contact information with all required elements</li>
                <li>Clear, focused role identity per application</li>
                <li>77-100% keyword coverage depending on target role</li>
              </ul>
            </div>
          </div>

          {/* Key Metrics */}
          <div className="bg-card rounded-xl p-6 border border-border">
            <h3 className="font-heading text-xl text-foreground mb-4">Key Metrics</h3>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <p className="text-sm font-semibold text-foreground mb-3">ATS Pass-Through Rate Improvement:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>ATS Pass-Through Rate:</strong> 55-61% → 77-100% (depending on target role)</li>
                  <li><strong>Recruiter Read Time:</strong> 2 pages (likely skimmed) → 1 page (fully read)</li>
                  <li><strong>Bullet Impact:</strong> 13 weak bullets → 4-5 strong bullets (2.6x stronger per bullet)</li>
                  <li><strong>Role Clarity:</strong> Confused positioning → Clear, focused identity</li>
                </ul>
              </div>

              <div>
                <p className="text-sm font-semibold text-gold mb-3">Estimated Application Success Rate Improvement:</p>
                <ul className="space-y-2 text-sm text-foreground">
                  <li><strong>Foxconn NLP Engineer:</strong> 30% → 85% (callback rate)</li>
                  <li><strong>LLM/RAG Data Scientist:</strong> 25% → 70% (callback rate)</li>
                  <li><strong>Microsoft Applied Scientist 2:</strong> 15% → 45% (callback rate due to junior level)</li>
                </ul>
              </div>
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
              <h3 className="font-heading text-xl text-foreground">Fix Format and Basic Information</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Fix Contact Information (15 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Change email to willy.lin@gmail.com or similar professional format</li>
                  <li>Add phone number: +886-XXX-XXX-XXX</li>
                  <li>Add LinkedIn URL: linkedin.com/in/willylin (or create LinkedIn if you don't have one)</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Choose Target Role & Create Focused Version (30 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Decide which of the three roles is your primary target (recommendation: Foxconn NLP Engineer)</li>
                  <li>Update title line to match: "NLP Engineer" OR "AI Engineer" OR "LLM Data Scientist"</li>
                  <li>Remove subtitle "LARGE LANGUAGE MODELS & DATA PIPELINES" entirely</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Rewrite Summary to Result-Focus (45 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Use the optimized version provided for your chosen role</li>
                  <li>Add your actual performance metrics if available (model improvement %, latency reduction, etc.)</li>
                  <li>Keep to 3-4 sentences maximum</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Cut to One Page by Removing 8+ Bullets (60 minutes)</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Select your 4-5 strongest, most relevant achievements only</li>
                  <li>Merge "Internship Experience" into main "Experience" section</li>
                  <li>Remove italicized project note</li>
                  <li>Delete redundant/low-impact bullets</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</div>
              <h3 className="font-heading text-xl text-foreground">Transform All Bullets to XYZ Framework</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">Rewrite Each Remaining Bullet (90 minutes for 4-5 bullets)</p>
                <p className="text-muted-foreground mt-1">For each bullet, answer:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>[X] = What did you accomplish? (outcome)</li>
                  <li>[Y] = How did you measure it? (metric)</li>
                  <li>[Z] = How did you do it? (method)</li>
                </ul>
                <p className="text-gold mt-2">Format: Accomplished [X] as measured by [Y] by doing [Z]</p>
              </div>
              <div>
                <p className="font-semibold">Add Your Actual Metrics (60 minutes)</p>
                <p className="text-muted-foreground mt-1">If you don't have exact numbers, use conservative estimates:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>Model improvement: "improved by approximately 15-25%"</li>
                  <li>Time reduction: "reduced from 7 days to 5 days per iteration"</li>
                  <li>Latency: "achieved {'<'}50ms p95 latency"</li>
                  <li>Never fabricate—but do quantify based on your observations</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">Rewrite 1-2 Internship Bullets (30 minutes)</p>
                <p className="text-muted-foreground mt-1">Apply XYZ framework to internship work showing business impact</p>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</div>
              <h3 className="font-heading text-xl text-foreground">Create Three Customized Versions for Three Role Types</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <p className="text-muted-foreground">You cannot use one resume for all three roles. Create three versions:</p>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">Version A: NLP Engineer (Foxconn)</p>
                  <p className="text-xs text-muted-foreground">Primary recommendation</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>Title: "NLP Engineer"</li>
                    <li>Skills: ADD SpaCy, NLTK, Gensim, Word2Vec, text classification, NER</li>
                    <li>Summary focus: Multilingual NLP, text processing</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">Version B: LLM Data Scientist (RAG Role)</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>Title: "LLM Data Scientist" or "GenAI Engineer"</li>
                    <li>Skills: ADD LangChain (study), RAG, LlamaIndex (familiar), Azure OpenAI (familiar)</li>
                    <li>Summary focus: RAG systems, knowledge retrieval, evaluation</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">Version C: AI Engineer (Microsoft)</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>Title: "AI Engineer"</li>
                    <li>Skills: Emphasize ML systems, model serving</li>
                    <li>Summary focus: LLM training, optimization, large-scale systems</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</div>
              <h3 className="font-heading text-xl text-foreground">Apply to 5-10 Target Roles</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <p className="text-muted-foreground">After Resume is Optimized:</p>
              <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                <li>Start with Foxconn NLP Engineer role (strongest fit)</li>
                <li>Apply to similar NLP/LLM roles at Taiwan tech companies</li>
                <li>Use customized version for each role type</li>
                <li>Track applications in spreadsheet</li>
              </ul>
            </div>
          </div>

          {/* Step 5 */}
          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</div>
              <h3 className="font-heading text-xl text-foreground">Prepare Interview Stories Using STAR Method</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">For Each Major Achievement:</p>
                <p className="text-muted-foreground mt-1">Prepare 2-3 minute stories following STAR framework:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>Situation:</strong> What was the context/problem?</li>
                  <li><strong>Task:</strong> What was your specific responsibility?</li>
                  <li><strong>Action:</strong> What did you do? (step-by-step)</li>
                  <li><strong>Result:</strong> What happened? (quantified outcome)</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 mt-3">
                <p className="font-semibold text-foreground">Example for your Qwen3-8B GRPO optimization work:</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>S:</strong> Qwen3-8B base model had inconsistent persona adherence and occasional hallucinations</li>
                  <li><strong>T:</strong> Improve conversational quality for production virtual assistant platform</li>
                  <li><strong>A:</strong> Implemented GRPO using Qwen-14B reward model with three custom rubrics targeting hallucination, coherence, persona</li>
                  <li><strong>R:</strong> Achieved 23% improvement in human evaluation scores, reduced hallucination rate by 18%, enabling production deployment</li>
                </ul>
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
                  <li>Customize for each application - Change 2-3 bullets to match JD</li>
                  <li>Follow up after applying - Email recruiter 5-7 days later</li>
                  <li>Be ready to explain every metric - Interviewers will ask</li>
                  <li>Keep examples confidential - Don't mention internal project names</li>
                  <li>Show genuine enthusiasm - Reference specific company initiatives</li>
                </ul>
              </div>
              <div>
                <p className="text-sm font-semibold text-destructive mb-2 flex items-center gap-2"><XCircle className="w-4 h-4" /> Don'ts</p>
                <ul className="text-sm text-foreground space-y-1">
                  <li>Don't apply without customization - Quality {'>'} quantity</li>
                  <li>Don't exaggerate metrics - Be ready to support with data</li>
                  <li>Don't badmouth previous employers - Stay professional</li>
                  <li>Don't ignore cultural fit - Research company values</li>
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
              <p>Your experience is great for an early-career AI professional.</p>
              
              <p>Your previous resume wasn't telling this story effectively. It buried your strongest achievements under 13 bullets of duty descriptions, confused recruiters with mixed positioning, and failed to quantify any results.</p>
              
              <p>Your new resume will showcase exactly what makes you valuable: you can train production LLMs, optimize them through GRPO, deploy them at scale, and deliver measurable improvements.</p>
              
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
            <p className="text-sm text-muted-foreground">I've just started a new business and Trustpilot applies an initial weighting for new businesses, which can temporarily lower early scores. As more real client reviews are added, the score adjusts to reflect actual service quality.</p>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">
            © 2025 James Bugden. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WillyLinReview;
