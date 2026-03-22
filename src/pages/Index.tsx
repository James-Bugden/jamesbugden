import "@/styles/experiment.css"; // force HMR refresh
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Briefcase, Users, Linkedin, FileCheck, X, CheckCircle2, Eye, Building, Plus, Minus, DollarSign, BookOpen, FileText, TrendingUp } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import HomepageTestimonials from "@/components/HomepageTestimonials";
import LogoScroll from "@/components/LogoScroll";
import SelfSegmentation from "@/components/SelfSegmentation";
import SalaryProofSection from "@/components/SalaryProofSection";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";
import AboutSection from "@/components/AboutSection";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import PromoBanner from "@/components/PromoBanner";
import { useAuth } from "@/contexts/AuthContext";

const faqs = [
  { q: "Why are these free?", a: "It's my mission to make as many paid tools and information online free. I want to help as many people as I can to have the job and lifestyle they want." },
  { q: "I don't have the confidence to negotiate my salary. Will this help?", a: "This is the most common concern I hear. Here's the truth: you don't need to be pushy. You need to understand what the other side wants. I'll show you how HR thinks so you feel calm and ready, not scared." },
  { q: "I keep applying but never hear back. What am I doing wrong?", a: "Usually one of three things: your resume doesn't get past the computer filter, your title doesn't match the job, or your best work is hidden in the wrong place. My review finds what's wrong and tells you how to fix it." },
  { q: "I don't know how to deal with HR during the hiring process. They feel like gatekeepers.", a: "HR isn't your enemy. They want to fill the job. The problem is most people don't understand what HR cares about. I've been in HR. I'll show you what they look for at each step so you work together, not against each other." },
  { q: "Why not use ChatGPT to fix my resume?", a: "AI is a good start. But AI doesn't know what a real recruiter looks for. It won't tell you your best achievement is buried on page 2. Or the company you want cares more about X than Y. 20,000+ resume reviews taught me what AI hasn't learned." },
  { q: "How is your resume review different from other services?", a: "Most resume services fix spelling and move things around. My review is different. I look at your resume like a recruiter. I tell you what to change to get more interviews. You also get a simple system you reuse every time you apply." },
];

function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <section className="py-12 md:py-20 px-5 md:px-6 bg-background">
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center mb-6 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
          Is this actually free? Yes. Here's why.
        </h2>
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} className="border-b border-border">
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-bold text-lg text-foreground">{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-5 h-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground" />
                    : <Plus className="w-5 h-5 flex-shrink-0 transition-transform duration-200 text-muted-foreground" />
                  }
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-base text-foreground" style={{ paddingTop: '0' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const IndexExperiment = () => {
  const { isLoggedIn } = useAuth();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="experiment min-h-screen overflow-x-hidden scroll-smooth bg-cream">
      <PageSEO
        title="James Bugden — Break Into Google, Uber & Microsoft From Taiwan"
        description="Career coach shares insider strategies that helped 750+ candidates land roles at Google, Uber, Microsoft and other top companies."
        path="/"
      />

      {/* ── Promo Banner + Navigation (sticky together) ── */}
      <header className="sticky top-0 z-50">
        <PromoBanner lang="en" />
        <nav
          className={`transition-shadow duration-300 bg-cream ${
            scrolled ? "shadow-md shadow-black/8" : ""
          }`}
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 sm:px-5 md:px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-base sm:text-lg md:text-xl font-bold tracking-tight whitespace-nowrap text-executive-green">
              JAMES BUGDEN
            </span>
            <div className="flex items-center gap-2 sm:gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="default" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — cream #FDFBF7 ── */}
        <section id="about" className="pt-8 md:pt-16 pb-12 md:pb-20 px-4 sm:px-5 md:px-6 relative bg-cream">
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-4 pt-4 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                  </div>
                </div>

                <h1 className="font-heading leading-[1.12] tracking-tight mb-3 max-w-3xl mx-auto md:mx-0 text-foreground" style={{ fontSize: 'clamp(1.75rem, 5vw, 3.5rem)' }}>
                  Get a $200K+ Offer at Your Dream&nbsp;Company
                </h1>

                {/* Credential badge */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-border bg-muted/40 text-muted-foreground text-[0.9375rem]">
                    <Briefcase className="w-4 h-4 text-muted-foreground" />
                    Senior Recruiter at Uber
                  </span>
                </div>

                <p className="leading-relaxed max-w-xl mx-auto md:mx-0 mb-5 text-foreground text-[1.0625rem]">
                  Free tools, templates, and insider strategies from a recruiter who's helped 750+ people get hired.
                </p>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
                  <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Send Me the Free Toolkit" />
                </div>

                <p className="mb-5 text-muted-foreground text-[0.8125rem] mt-2">
                  Join 10,000+ professionals using my free tools · Unsubscribe anytime
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5 text-foreground">
                      <FileCheck className="w-5 h-5 text-executive-green/70" />
                      20,000+
                    </span>
                    <span className="text-sm text-muted-foreground">resumes reviewed</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5 text-foreground">
                      <Users className="w-5 h-5 text-executive-green/70" />
                      750+
                    </span>
                    <span className="text-sm text-muted-foreground">people hired</span>
                  </div>
                </div>
              </div>

              {/* Photo — desktop only */}
              <div className="hidden md:flex justify-end order-2">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                  <img src={jamesPhoto} alt="James Bugden" className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar — cream #FDFBF7 ── */}
        <div className="bg-cream">
          <LogoScrollExperiment />
        </div>

        {/* ── Testimonials — white #FFFFFF ── */}
        <LazySection>
          <div className="bg-card">
            <HomepageTestimonialsExperiment />
          </div>
        </LazySection>

        {/* ── Pain-Point Section — cream #FDFBF7 ── */}
        <section className="py-12 md:py-20 px-5 md:px-6 bg-cream">
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-heading mb-6 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
              Sound Familiar?
            </h2>

            <div className="flex flex-col gap-5 mb-8 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">You've applied to tons of jobs and never heard back.</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">You made it to the final interview... then nothing. No email. No call.</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5 text-destructive" strokeWidth={2.5} />
                <p className="text-foreground text-lg">You got a job offer, but you have no idea if the pay is fair or if you should ask for more.</p>
              </div>
            </div>

            <div className="flex items-start justify-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5 text-executive-green" />
              <p className="text-muted-foreground text-base">
                You don't need another job board. You need someone who's been on the other side of the table.
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Get My Free Recruiting Tips" />
            </div>
            <p className="text-center mt-2 text-muted-foreground text-[0.8125rem]">
              No spam, no fluff. Insider recruiting strategies every week.
            </p>
          </div>
        </section>

        {/* ── Credibility Section — white #FFFFFF ── */}
        <section className="py-12 md:py-20 px-5 md:px-6 bg-card">
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="font-heading mb-3 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
                Most career advice comes from people who've never hired anyone.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mb-10">
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Eye className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">I've Read 20,000+ Resumes</p>
                <p className="text-base text-foreground">
                  I know what makes a recruiter stop and read. I also know what gets your resume tossed in 6 seconds. No guessing. I've seen it thousands of times.
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Users className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">I've Hired 750+ People</p>
                <p className="text-base text-foreground">
                  I've sat in the room where they decide your offer. I know what HR thinks, what the hiring manager cares about, and where most people lose money.
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left bg-cream border-t-[3px] border-gold">
                <Building className="w-10 h-10 mx-auto md:mx-0 mb-4 text-executive-green" strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2 text-foreground">Insider Knowledge</p>
                <p className="text-base text-foreground">
                  I've hired over 750 people. I know how they interview, how they pay, and what makes you stand out.
                </p>
              </div>
            </div>

          </div>
        </section>

        {/* ── How It Works ── */}
        <LazySection>
          <SelfSegmentationExperiment />
        </LazySection>

        {/* ── Salary Calculator Proof ── */}
        <LazySection>
          <SalaryProofSection />
        </LazySection>

        {/* ── About ── */}
        <LazySection>
          <AboutSection />
        </LazySection>

        {/* ── FAQ ── */}
        <LazySection>
          <FAQSection />
        </LazySection>

        {/* ── Create Account CTA ── */}
        {!isLoggedIn && (
          <LazySection>
            <section className="py-16 md:py-24 px-5 md:px-6 bg-cream">
              <div className="container mx-auto max-w-2xl text-center">
                <h2 className="font-heading mb-4 text-foreground" style={{ fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
                  Create your free account
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-xl mx-auto">
                  Get full access to all career guides, resume tools, salary data, and more — completely free.
                </p>
                <div className="flex flex-col gap-3 mb-8 text-left max-w-sm mx-auto">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">10+ career &amp; interview guides</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">Resume Builder &amp; AI Analyzer</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-executive-green" />
                    <span className="text-foreground">Interview Question Bank &amp; negotiation tools</span>
                  </div>
                </div>
                <Link
                  to="/join"
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg font-bold text-white bg-gold hover:bg-gold/90 transition-colors text-lg"
                >
                  Get Full Access — It's Free
                </Link>
                
              </div>
            </section>
          </LazySection>
        )}

      </main>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-executive-green">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-cream" aria-label="LinkedIn">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-cream" aria-label="Instagram">
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity text-cream" aria-label="Threads">
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
          <span className="text-sm text-center w-full text-cream/60">
            © 2026 James Bugden. All rights reserved.
          </span>
        </div>
      </footer>
      <ExitIntentPopup lang="en" />
    </div>
  );
};

export default IndexExperiment;
