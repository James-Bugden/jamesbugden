import { ArrowLeft, Download, Users, Target, FileText, MessageSquare, Search, CheckCircle2, Calendar, Linkedin, TrendingUp, Briefcase, Award, Eye, Zap, BarChart3 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GoldCheckBadge from "@/components/GoldCheckBadge";

const LinkedInBrandingGuide = () => {
  const navigate = useNavigate();

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/LinkedIn_Personal_Branding_Tactical_Guide.pdf';
    link.download = 'LinkedIn_Personal_Branding_Tactical_Guide.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <Link to="/" className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-3 md:gap-4">
            <Link to="/" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <button 
              onClick={() => navigate("/zh-tw/linkedin-branding-guide")}
              className="px-3 py-1.5 text-sm font-semibold bg-gold/20 hover:bg-gold/30 text-gold border border-gold/40 rounded-md transition-all duration-200 hover:scale-105"
            >
              中文
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-28 md:pt-36 pb-12 md:pb-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-4xl text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full bg-gold/20 flex items-center justify-center">
              <Linkedin className="w-8 h-8 text-gold" />
            </div>
          </div>
          <h1 className="font-heading text-3xl md:text-5xl lg:text-6xl text-cream leading-tight mb-4">
            LinkedIn Personal Branding
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            A Recruiter's Tactical Guide
          </p>
          <p className="text-base text-cream/60 mb-6">
            By James Bugden, Senior Recruiter
          </p>
          <Button 
            onClick={handleDownload}
            className="bg-gold hover:bg-gold/90 text-executive-green font-semibold px-6 py-3 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
          >
            <Download className="w-5 h-5 mr-2" />
            Download PDF Guide
          </Button>
        </div>
      </section>

      {/* Framework Note */}
      <section className="py-8 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-3xl">
          <p className="text-sm md:text-base text-muted-foreground italic text-center">
            Based on Sandra Long's "LinkedIn for Personal Branding: The Ultimate Guide" combined with recruiting experience from 20,000+ resume reviews and 500+ hires.
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            What is Personal Branding?
          </h2>
          <p className="text-base md:text-lg text-foreground mb-4">
            Personal branding is actively managing your image and defining your unique value. It's about showing your best authentic self, not creating a fake persona.
          </p>
          <p className="text-base md:text-lg text-foreground mb-6">
            Here's the reality: <span className="text-gold font-semibold">Your brand reputation exists whether you actively manage it or not. The question is: will you control the narrative, or will you let others define you?</span>
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">The "Orange Fish" Principle</h3>
          <p className="text-foreground mb-4">
            Most LinkedIn profiles look identical: job title, company name, responsibilities. That's being a blue fish. Your goal is to be the orange fish: memorable, differentiated, compelling.
          </p>
          <p className="text-muted-foreground italic">
            When I'm screening candidates at Uber, the blue fish all blur together. The orange fish get interviews.
          </p>
        </div>
      </section>

      {/* Why LinkedIn Matters */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Why LinkedIn Branding Matters Now</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">700 Million</p>
              <p className="text-muted-foreground">Global users, with 2 new users joining every second</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">50 Million+</p>
              <p className="text-muted-foreground">Profiles viewed every day</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">65%</p>
              <p className="text-muted-foreground">Professionals say online impressions matter as much as in-person</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-2xl font-heading text-gold mb-2">87%</p>
              <p className="text-muted-foreground">Recruiters use LinkedIn to evaluate candidates</p>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">The Recruiter's Truth:</strong> I can tell within 6 seconds of viewing your profile whether you're a serious candidate or just another resume. Your LinkedIn brand is either working for you 24/7, or it's costing you opportunities every single day.
            </p>
          </div>
        </div>
      </section>

      {/* Six Opportunities */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            The Six Opportunities LinkedIn Creates
          </h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-card border border-border rounded-lg p-6">
              <Briefcase className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">1. Career Opportunities</h3>
              <p className="text-muted-foreground text-sm">The best opportunities come when you're not looking—but only if your profile attracts them.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <TrendingUp className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">2. Sales Opportunities</h3>
              <p className="text-muted-foreground text-sm">Before prospects take your call, they look you up on LinkedIn.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Award className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">3. Thought Leadership</h3>
              <p className="text-muted-foreground text-sm">Conference organizers and media find experts and speakers through LinkedIn.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Users className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">4. Social Proof</h3>
              <p className="text-muted-foreground text-sm">Recommendations, endorsements, and engagement show people value your expertise.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Zap className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">5. Partnership Opportunities</h3>
              <p className="text-muted-foreground text-sm">Connect with potential business partners, co-founders, and collaborators.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-6">
              <Eye className="w-8 h-8 text-gold mb-3" />
              <h3 className="font-heading text-lg text-foreground mb-2">6. Credibility & Recognition</h3>
              <p className="text-muted-foreground text-sm">When someone searches your name, your LinkedIn profile validates your expertise.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Personal Brand Framework */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Target className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">The Personal Branding Framework</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Component 1: Know Your Audience</h3>
          <p className="text-foreground mb-4">Before you write a single word on LinkedIn, you need to know: Who will be reading your profile, and what do you want them to do?</p>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• Hiring managers and recruiters</li>
            <li>• Potential clients or customers</li>
            <li>• Industry peers and thought leaders</li>
            <li>• Partners or investors</li>
            <li>• Conference organizers and media</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">Component 2: Define Your Unique Value</h3>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-6">
            <p className="text-foreground font-semibold mb-2">The Personal Branding Equation:</p>
            <p className="text-gold font-heading text-lg">Your Unique Value = Skills + Personality + Perspective + Proof</p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Component 3: Be Authentic</h3>
          <p className="text-foreground mb-4">You want to be true to yourself, your skills, and your personality. It's more about showing or demonstrating your best genuine self than creating anything new.</p>
          <p className="text-muted-foreground italic">
            Think: "How would I introduce myself at an industry conference?" That's your LinkedIn voice.
          </p>
        </div>
      </section>

      {/* Profile Sections */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">LinkedIn Profile: Section by Section</h2>
          </div>

          {/* Headline */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Headline</span> (155 characters)
            </h3>
            <p className="text-foreground mb-4">This is the most important real estate on your entire profile. It appears in search results, when you comment on posts, when you send connection requests.</p>
            
            <div className="bg-card border border-border rounded-lg p-4 mb-4">
              <p className="text-muted-foreground mb-2">❌ What most people write:</p>
              <p className="text-foreground">"Software Engineer at Google" or "Marketing Manager | MBA"</p>
            </div>
            <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-4 mb-4">
              <p className="text-gold mb-2">✅ What works better:</p>
              <p className="text-foreground">"Helping SaaS Companies Scale from $1M to $10M+ ARR | Growth Marketing Leader | Ex-Google, Meta"</p>
            </div>

            <p className="text-foreground font-semibold mb-2">The Formula:</p>
            <p className="text-gold">[Unique Value] | [Key Skills/Expertise] | [Credibility Markers]</p>
          </div>

          {/* About Section */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">About Section</span> (2,600 characters)
            </h3>
            <p className="text-foreground mb-4">This is your chance to tell your story. Most people write boring job descriptions. You should write compelling narrative.</p>
            
            <h4 className="font-semibold text-foreground mb-3">The Structure:</h4>
            <div className="space-y-3 mb-6">
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">Opening Hook (first 2-3 sentences)</p>
                  <p className="text-muted-foreground text-sm">These show before "See more" on mobile. Make them count.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">Your Story (middle section)</p>
                  <p className="text-muted-foreground text-sm">How you got to where you are, what drives you, key experiences that shaped your expertise.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">What You Offer (next section)</p>
                  <p className="text-muted-foreground text-sm">Specific ways you help people/companies, your superpowers or key strengths.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <GoldCheckBadge />
                <div>
                  <p className="text-foreground font-semibold">Call to Action (final section)</p>
                  <p className="text-muted-foreground text-sm">How people can work with you, how to reach you.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Experience Section */}
          <div className="mb-10">
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Experience Section</span>
            </h3>
            <p className="text-foreground mb-4">This is where most people just copy-paste their resume. Don't.</p>
            
            <h4 className="font-semibold text-foreground mb-3">The Description Formula:</h4>
            <ul className="space-y-2 mb-6 text-foreground">
              <li>• <strong>Context</strong> (1-2 sentences): What was the situation when you started?</li>
              <li>• <strong>Actions</strong> (2-4 bullets): What did you do?</li>
              <li>• <strong>Results</strong> (numbers and outcomes): What impact did you have?</li>
            </ul>

            <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
              <p className="text-foreground">
                <strong className="text-gold">What I'm Looking For:</strong> Scope (how big was your responsibility?), Impact (what changed because of your work?), Skills (what capabilities did you demonstrate?), Growth (did you get promoted or expand responsibilities?)
              </p>
            </div>
          </div>

          {/* Recommendations */}
          <div>
            <h3 className="font-heading text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="text-gold">Recommendations</span>
            </h3>
            <p className="text-foreground mb-4">This is the most underutilized feature on LinkedIn—and the most powerful for building trust.</p>
            
            <h4 className="font-semibold text-foreground mb-3">Sandra's 6-Step Recommendation Process:</h4>
            <ol className="space-y-3 mb-6">
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">1</span>
                <p className="text-foreground"><strong>Make a List</strong> — Decide who can describe your work firsthand from direct experience working with you</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">2</span>
                <p className="text-foreground"><strong>Consider Timing</strong> — Best times are right after completing a project, leaving a job, or receiving a big compliment</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">3</span>
                <p className="text-foreground"><strong>Ask in Person</strong> — A personalized request dramatically increases success rate</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">4</span>
                <p className="text-foreground"><strong>Make it Easy</strong> — Ask if they'd like talking points</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">5</span>
                <p className="text-foreground"><strong>Follow Up Gently</strong> — People have good intentions but get busy</p>
              </li>
              <li className="flex items-start gap-3">
                <span className="w-6 h-6 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0 text-sm">6</span>
                <p className="text-foreground"><strong>Show Gratitude</strong> — Send a thank you note or LinkedIn message</p>
              </li>
            </ol>
          </div>
        </div>
      </section>

      {/* Content Strategy */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Content Strategy: Becoming a Thought Leader</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Why Create Content on LinkedIn?</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Visibility</strong> — The more you post, the more your profile gets seen</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Authority</strong> — Regular content builds expertise</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Opportunity</strong> — Content attracts inbound opportunities</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Relationships</strong> — Comments and engagement build connections</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">The Anatomy of High-Performing Posts</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>Hook (first 1-2 lines)</strong> — This is what people see before clicking "See more." Make it compelling.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>Body</strong> — Tell a story, share a lesson, or provide value. Use short paragraphs.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>Call to Action</strong> — Ask a question to drive comments. Invite people to share their experiences.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Examples of Strong Hooks:</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• "I just got rejected from the job I really wanted. Here's what I learned:"</li>
            <li>• "After reviewing 10,000 resumes, I noticed a pattern that predicts success:"</li>
            <li>• "Most people are doing LinkedIn wrong. Here's what actually works:"</li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">Daily Engagement Routine (15-20 minutes):</h3>
          <ul className="space-y-2 text-foreground">
            <li>• React to 10-15 posts from your network</li>
            <li>• Leave 5-7 thoughtful comments (not just "Great post!")</li>
            <li>• Respond to all comments on your recent posts</li>
            <li>• Share 1-2 posts with your own commentary</li>
          </ul>
        </div>
      </section>

      {/* Algorithm & Visibility */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">The LinkedIn Algorithm: How to Get Seen</h2>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Algorithm Priorities:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Dwell Time</strong> — How long people spend reading your post</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Engagement</strong> — Likes, comments, shares, and clicks</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Relevance</strong> — How well your content matches viewer interests</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Freshness</strong> — Newer posts get an initial boost</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Author Credibility</strong> — Profiles with higher SSI get more reach</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">The "Golden Hour":</strong> The first 60 minutes after posting are critical. If your post gets strong engagement immediately, LinkedIn will show it to more people.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Best Times to Post:</h3>
          <ul className="space-y-2 text-foreground">
            <li>• Tuesday through Thursday are the strongest days</li>
            <li>• 8-10am and 12-2pm (in your audience's time zone)</li>
            <li>• Avoid weekends for B2B content</li>
          </ul>
        </div>
      </section>

      {/* Common Mistakes */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Common LinkedIn Mistakes (And How to Avoid Them)
          </h2>

          <div className="space-y-4">
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #1: Treating LinkedIn as a Resume</p>
              <p className="text-muted-foreground">Resumes are for applications. LinkedIn is for attraction. Write like you're telling a colleague about your work over coffee.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #2: No Strategy</p>
              <p className="text-muted-foreground">Define your goals (job search, sales, thought leadership), identify target audience, create consistent positioning in profile and content.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #3: Being Too Promotional</p>
              <p className="text-muted-foreground">Follow the 80/20 rule. 80% value-adding content, 20% promotional.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #4: Inconsistent Activity</p>
              <p className="text-muted-foreground">Post at least 2-3 times per week. Consistency beats perfection.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-5">
              <p className="text-foreground font-semibold mb-2">Mistake #5: Outdated Profile</p>
              <p className="text-muted-foreground">Update your profile quarterly. Add new achievements, refresh your About section, request new recommendations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 90-Day Plan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-cream">Your 90-Day LinkedIn Transformation Plan</h2>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Weeks 1-2: Foundation</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Audit current profile against frameworks in this guide</li>
                <li>☐ Define your target audience and goals</li>
                <li>☐ Update profile photo and background banner</li>
                <li>☐ Rewrite headline and About section</li>
                <li>☐ Update Experience section for top 2-3 roles</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Weeks 3-4: Content Launch</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Brainstorm 20 content ideas</li>
                <li>☐ Create content calendar (2-3 posts per week)</li>
                <li>☐ Publish first content piece</li>
                <li>☐ Engage with 10-15 posts daily</li>
                <li>☐ Send 10 personalized connection requests</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Weeks 5-8: Consistency & Optimization</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Post 2-3 times per week as planned</li>
                <li>☐ Send 20 connection requests to strategic targets</li>
                <li>☐ Join 3-5 relevant LinkedIn groups</li>
                <li>☐ Create first video post</li>
                <li>☐ Write first LinkedIn article</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Weeks 9-12: Scaling & Advanced Strategies</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Engage with industry influencers</li>
                <li>☐ Send personalized messages to engaged connections</li>
                <li>☐ Schedule coffee chats or calls</li>
                <li>☐ Review 90-day progress and plan next 90 days</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-gold" />
            </div>
            <h2 className="font-heading text-2xl md:text-3xl text-foreground">Measuring Success: What Good Looks Like</h2>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Profile Views</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beginner: 50-100 per week</li>
                <li>• Intermediate: 100-300 per week</li>
                <li>• Advanced: 300-1,000+ per week</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Engagement Rate</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beginner: 1-3%</li>
                <li>• Intermediate: 3-7%</li>
                <li>• Advanced: 7-15%+</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Follower Growth</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beginner: 20-50 per month</li>
                <li>• Intermediate: 50-200 per month</li>
                <li>• Advanced: 200-1,000+ per month</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h3 className="font-heading text-lg text-foreground mb-3">Impressions Per Post</h3>
              <ul className="space-y-1 text-sm text-muted-foreground">
                <li>• Beginner: 500-2,000</li>
                <li>• Intermediate: 2,000-10,000</li>
                <li>• Advanced: 10,000-100,000+</li>
              </ul>
            </div>
          </div>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">My Results (after 18 months of consistent effort):</strong> 20,000+ profile views per month, 22,000+ followers, 50,000-200,000 impressions per post, 80% of consulting clients find me through LinkedIn.
            </p>
          </div>
        </div>
      </section>

      {/* Conclusion */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6">
            Your LinkedIn Journey Starts Now
          </h2>
          <p className="text-foreground mb-4">
            Personal branding on LinkedIn is no longer optional—it's essential. Whether you're job hunting, growing a business, or building thought leadership, LinkedIn is where professional success happens.
          </p>
          <p className="text-xl font-heading text-gold mb-6">
            The Core Message: Be authentic, be strategic, be consistent.
          </p>
          <p className="text-muted-foreground italic mb-8">
            Your LinkedIn profile is your 24/7 salesperson. Right now, it's either attracting opportunities or losing them for you. Which is it?
          </p>
          <p className="text-foreground font-semibold">
            Remember: You're just one well-optimized profile away from your next big opportunity.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-5 md:px-6 bg-nav-green">
        <div className="container mx-auto max-w-4xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <Link to="/" className="font-heading text-lg font-medium text-cream">
              JAMES BUGDEN
            </Link>
            <div className="flex items-center gap-4">
              <a 
                href="https://www.linkedin.com/in/jamesbugden/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin className="w-5 h-5" />
              </a>
              <a 
                href="https://www.instagram.com/jamesbugden/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="Instagram"
              >
                <InstagramIcon />
              </a>
              <a 
                href="https://www.threads.net/@jamesbugden" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-cream/70 hover:text-cream transition-colors"
                aria-label="Threads"
              >
                <ThreadsIcon />
              </a>
            </div>
          </div>
          <div className="mt-4 text-center text-cream/50 text-sm">
            © {new Date().getFullYear()} James Bugden. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LinkedInBrandingGuide;
