import { ArrowLeft, Download, Star, Users, FileText, MessageSquare, Search, CheckCircle2, Calendar, Linkedin } from "lucide-react";
import { Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import { Button } from "@/components/ui/button";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import GuideShareButtons from "@/components/GuideShareButtons";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import { useTrackGuideProgress } from "@/hooks/useReadingProgress";

const LinkedInGuide = () => {
  useTrackGuideProgress("linkedin-guide");

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/LinkedIn_Personal_Branding_Mini_Guide.pdf';
    link.download = 'LinkedIn_Personal_Branding_Mini_Guide.pdf';
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
            <AuthHeaderButton variant="nav" />
            <Link to="/" className="text-sm text-cream-70 hover:text-cream transition-colors flex items-center gap-1">
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to Home</span>
            </Link>
            <LanguageToggle variant="nav" />
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
            LinkedIn for Job Search
          </h1>
          <p className="text-lg md:text-xl text-cream/80 mb-2">
            Get Recruiters to Find You
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
            Based on "LinkedIn for Personal Branding: The Ultimate Guide" by Sandra Long
          </p>
        </div>
      </section>

      {/* Introduction */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <p className="text-base md:text-lg text-foreground mb-4">
            Your LinkedIn profile creates a first impression before anyone meets you in person. <span className="text-gold font-semibold">65% of professionals say the impression you make online is just as important as the one you make in person.</span>
          </p>
          <p className="text-base md:text-lg text-foreground">
            This guide gives you Sandra Long's proven framework to stand out, to be the "orange fish" swimming in your own direction.
          </p>
        </div>
      </section>

      {/* Step 1: All-Star Status */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Star className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 1: Reach All-Star Status</h2>
              <p className="text-muted-foreground">Your Foundation</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Before anything else, hit LinkedIn's "All-Star" profile strength. This is the minimum threshold that makes your profile more visible in search results.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">All-Star requires:</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Professional photo</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">50+ connections</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Current position listed</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">2 past positions</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Education</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">3+ skills</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Industry and location filled in</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5">
            <p className="text-foreground">
              <strong className="text-gold">Why it matters:</strong> All-Star profiles are significantly more likely to appear in search results. Think of it as the entry ticket — you won't get found without it.
            </p>
          </div>

          <div className="mt-6 p-4 bg-background border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: Check your profile strength indicator. Fill any gaps listed above this weekend.
            </p>
          </div>
        </div>
      </section>

      {/* Step 2: Strategic Headline */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 2: Write a Strategic Headline</h2>
              <p className="text-muted-foreground">220 Characters</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Your headline and photo are often the only things someone sees before deciding whether to click on your profile. Most people leave the default — their job title. That's a missed opportunity.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra's Top Headline Tips:</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Use keywords</strong> — the words in your headline help people find you in search</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Add a value statement</strong> — don't just say what you are, say what you do for people</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Be specific</strong> — "Account Executive" is generic; add what makes you different</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Keep your corporate brand</strong> if it's recognizable — "Senior VP at GE" draws clicks</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Look at others in your industry for ideas and language</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">Before & After Examples:</h3>
          <div className="overflow-x-auto mb-6">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left text-foreground">❌ Before</th>
                  <th className="border border-border p-3 text-left text-foreground">✅ After</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Marketing Manager</td>
                  <td className="border border-border p-3 text-foreground">Marketing Executive | Growth Strategy | Channel Development | Partner Relations</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Human Resources Consultant</td>
                  <td className="border border-border p-3 text-foreground">HR Consultant | Talent Acquisition | Employee Retention | Optimizing Your Workforce for Growth</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Operations Manager</td>
                  <td className="border border-border p-3 text-foreground">Operations Manager | Call Center Optimization | Black Belt | Six Sigma | Military Veteran</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-muted-foreground">Unemployed Seeking Marketing Role</td>
                  <td className="border border-border p-3 text-foreground">Marketing Leader | Digital Media | Lead Generation Specialist | Helping Organizations Grow</td>
                </tr>
              </tbody>
            </table>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">3 "Value-Focused" Phrases You Can Add:</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• "I help people and businesses develop positive communication skills"</li>
            <li>• "Making entrepreneurship available to all women"</li>
            <li>• "Protecting family assets and wealth"</li>
          </ul>

          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: Write 3-5 headline options. Pick the one that's most compelling AND includes your strategic keywords.
            </p>
          </div>
        </div>
      </section>

      {/* Step 3: About Section */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <FileText className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 3: Craft Your About Section</h2>
              <p className="text-muted-foreground">2,600 Characters</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Your About section is valuable digital real estate. Don't just rehash what's already in your profile. Weave together your story in a way that compels people to want to work with you or refer you.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra's 10 Tips for a Great About Section:</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>1. Focus</strong> — Craft an excellent introduction. Write it in Word first for spelling and grammar.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>2. Set goals</strong> — What are you trying to achieve? New clients? A new job? Speaking invitations?</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>3. Consider your readers</strong> — Think about ALL your audiences. What makes them want to contact you?</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>4. Use the space</strong> — LinkedIn says essays of at least 40 words make your profile more likely to be found in search. Most strong profiles include 2-3 paragraphs.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>5. Be real and genuine</strong> — Let the real "you" come through. Include personal interests.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>6. Write in first person</strong> — Creates warmth. 40% of recruiters look for personality in profiles.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>7. Use strategic language</strong> — Include keywords naturally. Add a specialties list at the end.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>8. Make it attractive</strong> — Use spacing, capitalization, and symbols for visual appeal.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>9. Start with a hook</strong> — Draw readers in. Make them want to click "see more."</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong>10. Close carefully</strong> — End with a specialties list and contact info for a "quick read" option.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Use the Five H's Format:</h3>
          <p className="text-muted-foreground mb-4">Sandra's signature structure for writing your About section:</p>
          <div className="space-y-3 mb-8">
            <div className="flex items-start gap-3">
              <span className="text-2xl">🪝</span>
              <div>
                <p className="text-foreground font-semibold">Hook</p>
                <p className="text-muted-foreground">Start with a compelling opening that makes people want to read more</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🤝</span>
              <div>
                <p className="text-foreground font-semibold">Help</p>
                <p className="text-muted-foreground">Describe how you help your clients, prospects, or employer</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">😊</span>
              <div>
                <p className="text-foreground font-semibold">Human</p>
                <p className="text-muted-foreground">Add personality. Share what drew you to your work, your values, or your interests outside work</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">🔑</span>
              <div>
                <p className="text-foreground font-semibold">Hot-Words</p>
                <p className="text-muted-foreground">Weave in your strategic keywords naturally throughout</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <span className="text-2xl">👋</span>
              <div>
                <p className="text-foreground font-semibold">Hello</p>
                <p className="text-muted-foreground">End with your contact information so people can reach you</p>
              </div>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Choose Your Writing Persona:</h3>
          <p className="text-muted-foreground mb-4">Sandra identifies six approaches to writing your About section. Pick the one that fits you:</p>
          <div className="space-y-4 mb-6">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Historian</strong> — Chronological story of your career. If you use this approach, make sure to add personality. Don't just repeat your Experience section.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Storyteller</strong> — Open with a great story that connects to your personal brand. Sandra's favorite approach: "I just love stories."</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Weaver</strong> — Perfect if your career path isn't linear. Use the About section to connect the dots and explain why your varied experience makes sense together.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Themer</strong> — Best for senior leaders or people with wide-ranging experience. Pick 3-4 themes that have carried through your career and organize around those.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Personality</strong> — Let your character and working style take center stage. Show how you approach problems and collaborate.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">The Business Leader</strong> — Write your About as a "preselling document" for prospective clients. Still use first person and tell your story.</p>
            </div>
          </div>

          <div className="p-4 bg-background border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: Pick your persona. Write your About section using the Five H's structure. Draft it in a separate document first, then paste it in.
            </p>
          </div>
        </div>
      </section>

      {/* Step 4: Social Proof */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Users className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 4: Build Social Proof</h2>
              <p className="text-muted-foreground">Recommendations & Endorsements</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Online reviews can make the difference in being found, hired, and trusted. People who have recommendations and endorsements on LinkedIn have worked at it — it doesn't happen by accident.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Skills & Endorsements</h3>
          <ul className="space-y-3 mb-6">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Clean up your skills</strong> — Remove anything that doesn't match your brand. Just because someone endorsed you for a skill doesn't mean it belongs on your profile.</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Pin your top 3</strong> — The first three skills shown on your profile should be your most strategic ones.</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Review every few months</strong> — Your skills list should evolve as your career does.</span>
            </li>
          </ul>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-5 mb-8">
            <p className="text-foreground">
              <strong className="text-gold">LinkedIn Fun Fact:</strong> Users with at least 5 relevant skills are messaged 31x more and viewed 17x more than those without.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Sandra's 6-Step Recommendation Process:</h3>
          <ol className="space-y-4 mb-6">
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">1</span>
              <div>
                <p className="text-foreground"><strong>Make a list</strong> — Decide who can describe your work firsthand from working directly with you</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">2</span>
              <div>
                <p className="text-foreground"><strong>Consider timing</strong> — The best time to ask is right after finishing a project, leaving a job, or receiving a big compliment</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">3</span>
              <div>
                <p className="text-foreground"><strong>Ask personally</strong> — For close contacts, a note works. For others, warm them up first — call or meet for coffee. Make a personalized request to dramatically increase your success rate</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">4</span>
              <div>
                <p className="text-foreground"><strong>Make it easy</strong> — Ask if they'd like talking points or if you should draft something for them to edit</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">5</span>
              <div>
                <p className="text-foreground"><strong>Follow up gently</strong> — People have good intentions but get busy. A gentle reminder is smart</p>
              </div>
            </li>
            <li className="flex items-start gap-3">
              <span className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-semibold flex-shrink-0">6</span>
              <div>
                <p className="text-foreground"><strong>Show gratitude</strong> — Send a thank-you note or LinkedIn message</p>
              </div>
            </li>
          </ol>

          <div className="bg-executive-green/10 border border-executive-green/30 rounded-lg p-5 mb-6">
            <p className="text-foreground">
              <strong>Goal:</strong> Get at least 3 recommendations. Give at least 5. The best ones come from customers, your direct boss, or people with significant titles.
            </p>
          </div>

          <p className="text-muted-foreground italic mb-6">
            Pro tip from the book: It's perfectly OK to recommend someone who recommends you. After a great project: "I really enjoyed working with you. Let's write a LinkedIn recommendation for each other based on this great achievement."
          </p>

          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: Identify 3-5 people to ask for recommendations. Send your first request this week using the 6-step process.
            </p>
          </div>
        </div>
      </section>

      {/* Step 5: Content & Engagement */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <MessageSquare className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 5: Create & Engage with Content</h2>
              <p className="text-muted-foreground">The 80/20 Rule</p>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Sandra's content rule is the single most important engagement strategy in the book.
          </p>

          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 mb-8">
            <h3 className="font-heading text-xl text-gold mb-3">The 80/20 Rule:</h3>
            <p className="text-foreground mb-4">
              Spend at least 80% of your content time engaging with OTHER people's content. Be helpful. Provide thought leadership. Share useful insights.
            </p>
            <p className="text-foreground">
              Avoid selling, asking for meetings, or asking for jobs. This helpful approach builds relationships and makes people come to YOU.
            </p>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Think of it like a networking event (Sandra's analogy):</h3>
          <div className="grid md:grid-cols-2 gap-4 mb-8">
            <div className="bg-red-50 dark:bg-red-950/30 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <p className="text-foreground"><strong className="text-red-600 dark:text-red-400">❌ Bill</strong> walks in and immediately spews his sales pitch. He never comes up for air. Everything revolves around himself. Bill repels.</p>
            </div>
            <div className="bg-green-50 dark:bg-green-950/30 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-foreground"><strong className="text-green-600 dark:text-green-400">✅ Mark</strong> enters and shows authentic interest in others. He engages with interesting conversation. Mark attracts.</p>
            </div>
          </div>

          <p className="text-foreground mb-6 italic">The online world works exactly the same way.</p>

          <h3 className="font-heading text-xl text-foreground mb-4">The Three C's of Content:</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Create</strong> — Write original posts, articles, or record native video. Posts of 800-1,200 characters tend to perform well.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Curate</strong> — Find valuable content and share it with YOUR unique perspective. Add insightful commentary — don't just hit "repost."</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Comment</strong> — Sandra's #1 secret. If she could do only ONE thing, it would be to comment daily with meaningful, insightful, or supportive notes.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Commenting Best Practices:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Write longer, insightful comments — not just "Great post!"</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Add white space if your comment is lengthy</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Comment back with an @-mention (tag)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Avoid links unless absolutely necessary</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Never hijack someone's post to push your own agenda</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">Build Relationships Through Comments:</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">When you create a post:</p>
              <p className="text-muted-foreground text-sm">You post → Someone comments → You like AND reply to their comment (with @-mention) → Visit their profile and engage with their content → Invite them to connect with a personal note → Continue being helpful → Watch relationships develop organically.</p>
            </div>
            <div className="bg-background border border-border rounded-lg p-4">
              <p className="text-foreground font-semibold mb-2">When you engage with others:</p>
              <p className="text-muted-foreground text-sm">Find interesting content in a hashtag stream → Leave an insightful comment with @-mention → They comment back and check your profile → Like their reply → Visit their profile, comment on another post → Let it lead to a natural connection.</p>
            </div>
          </div>

          <h3 className="font-heading text-xl text-foreground mb-4">Content Types Available on LinkedIn:</h3>
          <ul className="space-y-2 mb-6 text-foreground">
            <li>• <strong>Posts</strong> (800-1,200 characters, appear in home feed)</li>
            <li>• <strong>Native video</strong> (upload from phone, add captions)</li>
            <li>• <strong>Live video</strong> (broadcast from personal or company page)</li>
            <li>• <strong>Document posts</strong> (upload PDFs or PowerPoints)</li>
            <li>• <strong>Polls</strong> (great for driving engagement and conversation)</li>
            <li>• <strong>Articles</strong> (long-form blog content, 1,500-3,000 words)</li>
          </ul>

          <div className="p-4 bg-background border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: This week, comment on 5 posts per day with genuine, thoughtful insights. Share 1 curated article with your own perspective added.
            </p>
          </div>
        </div>
      </section>

      {/* Step 6: Optimize for Search */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Search className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-foreground">Step 6: Optimize for Search & Visibility</h2>
            </div>
          </div>

          <p className="text-foreground mb-6">
            Being found on LinkedIn requires intentional keyword placement and profile completeness.
          </p>

          <h3 className="font-heading text-xl text-foreground mb-4">Where to Place Keywords:</h3>
          <ul className="space-y-3 mb-8">
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Headline</strong> (highest search weight)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>About section</strong> (especially the specialties list)</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Experience section</strong> titles and descriptions</span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground"><strong>Skills section</strong></span>
            </li>
            <li className="flex items-start gap-3">
              <GoldCheckBadge />
              <span className="text-foreground">Publications, projects, and other sections</span>
            </li>
          </ul>

          <h3 className="font-heading text-xl text-foreground mb-4">Quick Visibility Wins:</h3>
          <div className="space-y-4 mb-8">
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Custom URL</strong> — Change your LinkedIn URL to linkedin.com/in/yourname</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Public profile</strong> — Make sure your profile is visible on Google</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Location & industry</strong> — Fill these in correctly; they affect search results</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Featured section</strong> — Showcase your best content, media mentions, case studies, or lead magnets at the top of your profile</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-foreground"><strong className="text-gold">Rich media</strong> — Add videos, presentations, and documents to your Experience sections</p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-heading text-lg text-foreground mb-3">Professional Photo Guidelines:</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• Professional, recent, high-quality</li>
                <li>• You are the only person in the photo</li>
                <li>• Friendly expression</li>
                <li>• Minimum 400 × 400 pixels</li>
              </ul>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <h4 className="font-heading text-lg text-foreground mb-3">Background Banner:</h4>
              <ul className="space-y-2 text-foreground text-sm">
                <li>• 1584 × 396 pixels</li>
                <li>• Use it to reinforce your brand</li>
                <li>• Add tagline, visual, website</li>
              </ul>
            </div>
          </div>

          <div className="p-4 bg-card border border-border rounded-lg">
            <p className="text-foreground font-medium">
              ⬜ Action: Customize your URL. Add a background banner. Upload 1-2 rich media items to your Experience sections.
            </p>
          </div>
        </div>
      </section>

      {/* 4-Week Action Plan */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center">
              <Calendar className="w-6 h-6 text-gold" />
            </div>
            <div>
              <h2 className="font-heading text-2xl md:text-3xl text-cream">Your 4-Week Action Plan</h2>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Week 1: Foundation</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Check your All-Star status on LinkedIn — fill any gaps</li>
                <li>☐ Update photo and background banner</li>
                <li>☐ Rewrite headline (write 3-5 options, pick the best)</li>
                <li>☐ Choose your About section persona</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Week 2: Power Sections</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Write About section using the Five H's format</li>
                <li>☐ Update top 3 Experience entries with accomplishments (not responsibilities)</li>
                <li>☐ Clean up Skills — remove irrelevant ones, pin your top 3</li>
                <li>☐ Add Featured section</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Week 3: Social Proof</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Send 3-5 recommendation requests using the 6-step process</li>
                <li>☐ Write 2-3 recommendations for others</li>
                <li>☐ Give authentic endorsements to colleagues</li>
                <li>☐ Customize your LinkedIn URL</li>
              </ul>
            </div>

            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="font-heading text-xl text-gold mb-4">Week 4: Content & Engagement</h3>
              <ul className="space-y-2 text-cream/90">
                <li>☐ Apply the 80/20 rule — comment on 5+ posts daily</li>
                <li>☐ Share 2-3 posts this week (create or curate with your perspective)</li>
                <li>☐ Use the relationship-building comment strategy</li>
                <li>☐ Review your profile analytics — what's working?</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Key Principles */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-8 text-center">
            Key Book Principles to Remember
          </h2>

          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🐟</p>
              <p className="text-foreground"><strong className="text-gold">Be the Orange Fish</strong> — Most people on LinkedIn look the same. Your unique personal brand is what makes people want to connect, hire, or buy from you. Don't blend in with the blue fish.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🎭</p>
              <p className="text-foreground"><strong className="text-gold">Demonstrate, Don't Tell</strong> — Don't say you have "demonstrated leadership." Actually demonstrate it through your stories, accomplishments, and content. Show, don't claim.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">✍</p>
              <p className="text-foreground"><strong className="text-gold">First Person Always</strong> — Write your About section in first person. It creates warmth and connection. Third person feels cold and impersonal.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">💬</p>
              <p className="text-foreground"><strong className="text-gold">Commenting Is King</strong> — If you can only do one thing on LinkedIn, comment daily with meaningful insights. It builds more relationships than posting alone.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">🤝</p>
              <p className="text-foreground"><strong className="text-gold">80/20 Everything</strong> — 80% helping others, 20% about you. This applies to content, engagement, and networking.</p>
            </div>
            <div className="bg-card border border-border rounded-lg p-5">
              <p className="text-2xl mb-2">📊</p>
              <p className="text-foreground"><strong className="text-gold">Keep at least 80% of your content informational</strong> — and no more than 20% promotional. People will tune you out if every post is a sales pitch.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Character Limits Reference */}
      <section className="py-12 md:py-16 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-3xl">
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-6 text-center">
            Quick Reference: Character Counts
          </h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-muted">
                  <th className="border border-border p-3 text-left text-foreground">Section</th>
                  <th className="border border-border p-3 text-left text-foreground">Character Limit</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="border border-border p-3 text-foreground">Headline</td>
                  <td className="border border-border p-3 text-gold font-semibold">220 characters</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">About</td>
                  <td className="border border-border p-3 text-gold font-semibold">2,600 characters</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">Experience (each)</td>
                  <td className="border border-border p-3 text-gold font-semibold">2,000 characters</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">Skills</td>
                  <td className="border border-border p-3 text-gold font-semibold">Up to 50 skills</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">Photo</td>
                  <td className="border border-border p-3 text-gold font-semibold">Min 400 × 400 px</td>
                </tr>
                <tr>
                  <td className="border border-border p-3 text-foreground">Banner</td>
                  <td className="border border-border p-3 text-gold font-semibold">1584 × 396 px</td>
                </tr>
              </tbody>
            </table>
          </div>

          <p className="text-center text-muted-foreground mt-6 text-sm italic">
            This mini guide is based on LinkedIn for Personal Branding: The Ultimate Guide by Sandra Long. For the complete framework with additional examples, case studies, and advanced strategies, get the full book.
          </p>
        </div>
      </section>

      <GuideShareButtons />

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
            <p className="text-cream/60 text-sm">
              © {new Date().getFullYear()} James Bugden
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LinkedInGuide;
