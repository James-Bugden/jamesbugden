import "@/styles/homepage.css"; // force HMR refresh v2
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Briefcase, Users, FileCheck, X, CheckCircle2, Eye, Building, Plus, Minus, DollarSign, BookOpen, FileText, TrendingUp } from "lucide-react";
import PainMarker from "@/components/PainMarker";
import { ResumeStackIcon, ThreeFiguresIcon, InsiderIcon } from "@/assets/illustrations/HiresignIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
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
import { SEO } from "@/components/SEO";
import { Wordmark } from "@/components/Wordmark";

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
    <section className="py-14 md:py-20 px-5 md:px-6 bg-paper">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-center mb-10 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
          Is this actually free? Yes, here's why.
        </h2>
        <div className="card-hairline divide-y divide-border overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 px-6 text-left gap-4 hover:bg-paper-alt transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-${i}`}
                >
                  <span className="font-heading text-[1.0625rem] text-foreground tracking-[-0.01em]" style={{ fontWeight: 600 }}>{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gold" strokeWidth={2.25} />
                    : <Plus className="w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gold" strokeWidth={2.25} />
                  }
                </button>
                <div
                  id={`faq-panel-${i}`}
                  role="region"
                  aria-labelledby={`faq-q-${i}`}
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="px-6 pb-5 text-[15px] text-muted-foreground leading-relaxed" style={{ paddingTop: '0' }}>
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

const Index = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    const pending = sessionStorage.getItem("auth_redirect");
    if (pending) {
      sessionStorage.removeItem("auth_redirect");
      navigate(pending === "/" ? "/dashboard" : pending, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="homepage min-h-screen overflow-x-hidden scroll-smooth bg-cream">
      <SEO schemaJson={{
        "@context": "https://schema.org",
        "@type": "Person",
        "name": "James Bugden",
        "url": "https://jamesbugden.com",
        "jobTitle": "Senior Recruiter",
        "description": "Fortune 500 recruiter who has placed 750+ candidates at companies like Google, Uber, and Microsoft.",
        "sameAs": [
          "https://www.linkedin.com/in/james-bugden/",
          "https://www.instagram.com/james.careers/",
          "https://www.threads.com/@james.careers"
        ],
        "knowsAbout": ["Recruiting", "Career Coaching", "Resume Writing", "Interview Preparation", "Salary Negotiation"]
      }} />

      {/* ── Promo Banner + Navigation (sticky together), LIGHT cream nav ── */}
      <header className="sticky top-0 z-50">
        <PromoBanner lang="en" />
        <nav
          className={`transition-all duration-300 border-b border-border ${
            scrolled ? "shadow-sm" : ""
          }`}
          style={{ background: 'rgba(253,251,247,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          aria-label="Main navigation"
        >
          <div className="container mx-auto px-4 sm:px-5 md:px-6 h-16 flex items-center justify-between">
            <Link to="/" className="cursor-pointer flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Hiresign, by James Bugden" style={{ color: 'hsl(var(--executive-green))' }}>
              <Wordmark variant="mono" size={28} />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="nav" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero, paper bg, photo above H1 per user direction ── */}
        <section id="about" className="pt-12 md:pt-16 pb-14 md:pb-24 px-4 sm:px-5 md:px-6 relative bg-paper">
          <div className="container mx-auto max-w-3xl">

            {/* Hero photo, above H1, large for recognition */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-[32px]"
                  style={{ background: 'hsl(var(--gold-soft))', opacity: 0.5, transform: 'translate(10px, 12px)' }}
                  aria-hidden
                />
                <div
                  className="relative overflow-hidden rounded-[24px] bg-card"
                  style={{ border: '1px solid hsl(var(--border))' }}
                >
                  <img
                    src={jamesPhoto}
                    alt="James Bugden, Senior Recruiter at Uber Taiwan"
                    className="object-cover w-[240px] h-[300px] md:w-[280px] md:h-[350px]"
                    loading="eager"
                  />
                </div>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 card-hairline px-4 py-2 flex items-center gap-2 whitespace-nowrap"
                  style={{ background: 'hsl(var(--paper))' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--gold))' }} />
                  <span className="text-foreground text-[13px] font-semibold leading-tight">James Bugden</span>
                  <span className="text-muted-foreground text-[12px]">· Uber Recruiter</span>
                </div>
              </div>
            </div>

            <h1
              className="font-heading leading-[1.02] tracking-[-0.04em] mb-6 text-center mx-auto max-w-3xl mt-6"
              style={{ fontSize: 'clamp(2.5rem, 5.5vw, 4.25rem)', fontWeight: 600, color: 'hsl(var(--foreground))', textWrap: 'balance' }}
            >
              Get a <span style={{ color: 'hsl(var(--executive-green))' }}>$200K+ offer</span>
              <br className="hidden md:inline" />
              {' '}at <span className="text-mark-gold whitespace-nowrap">your dream company</span>.
            </h1>

            <p className="leading-relaxed mb-9 text-[1.125rem] text-center mx-auto max-w-2xl" style={{ color: 'hsl(0 0% 28%)' }}>
              Free tools, templates, and insider strategies from a recruiter who's helped 750+ people get hired.
            </p>

            <div className="mb-3 max-w-xl mx-auto">
              <MailerLiteForm formId="sM1X80" className="ml-embedded ml-inline" buttonText="Send Me the Free Toolkit" />
            </div>

            <p className="mb-12 text-muted-foreground text-[13px] text-center">
              Join <span className="tnum-geist" style={{ fontWeight: 600 }}>10,000+</span> professionals · Unsubscribe anytime
            </p>

            {/* Stat row, green icons + Geist tabular numerics, hairline border-top */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-16 pt-9 border-t border-border w-full">
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--green-soft))' }}>
                  <ResumeStackIcon size={28} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>20,000+</span>
                  <span className="text-muted-foreground text-[13px]">Resumes reviewed</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--green-soft))' }}>
                  <ThreeFiguresIcon size={28} />
                </div>
                <div className="flex flex-col text-left">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>750+</span>
                  <span className="text-muted-foreground text-[13px]">People hired</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar, paper-alt ── */}
        <section className="bg-paper-alt py-10 md:py-14 px-5 md:px-6 border-y border-border">
          <div className="container mx-auto max-w-6xl">
            <LogoScroll />
          </div>
        </section>

        {/* ── Testimonials, white #FFFFFF ── */}
        <LazySection>
          <div className="bg-card">
            <HomepageTestimonials />
          </div>
        </LazySection>

        {/* ── Pain-Point Section, paper bg, hairline cards ── */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-paper">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-center mb-10 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
              Sound familiar?
            </h2>

            <div className="grid gap-3 mb-8">
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">You've applied to tons of jobs and never heard back.</p>
              </div>
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">You made it to the final interview… then nothing. No email. No call.</p>
              </div>
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">You got a job offer, but you have no idea if the pay is fair, or if you should ask for more.</p>
              </div>
            </div>

            <div className="card-hairline-tinted p-6 md:p-8 text-center">
              <div className="flex items-start gap-3 mb-5 max-w-xl mx-auto text-left">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1 text-executive-green" strokeWidth={2} />
                <p className="text-foreground text-[1.0625rem] leading-relaxed font-medium">
                  You don't need another job board. You need someone who's been on the other side of the table.
                </p>
              </div>
              <div className="max-w-md mx-auto">
                <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Get My Free Recruiting Tips" />
              </div>
              <p className="mt-3 text-muted-foreground text-[0.8125rem] text-center">
                No spam, no fluff. Insider recruiting strategies every week.
              </p>
            </div>
          </div>
        </section>

        {/* ── Credibility Section, paper-alt, hairline cards with gold top accent ── */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
                Most career advice comes from people who've never <span style={{ color: 'hsl(var(--gold))' }}>hired</span> anyone.
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <ResumeStackIcon size={56} />
                </div>
                <div className="mb-1">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>20,000+</span>
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em]" style={{ fontWeight: 600, lineHeight: 1.25 }}>Resumes reviewed</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  I know what makes a recruiter stop and read, and what gets a resume tossed in 6 seconds.
                </p>
              </div>
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <ThreeFiguresIcon size={56} />
                </div>
                <div className="mb-1">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>750+</span>
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em]" style={{ fontWeight: 600, lineHeight: 1.25 }}>People hired</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  I've sat in the room where offers are decided. I know what HR thinks, and where most people leave money on the table.
                </p>
              </div>
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <InsiderIcon size={56} />
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em] mt-9" style={{ fontWeight: 600, lineHeight: 1.25 }}>Recruiter at Uber Taiwan</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  I work in the room where hiring decisions get made, and I share what I see, with you.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <LazySection>
          <SelfSegmentation />
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

        {/* ── Create Account CTA, hairline card on paper-alt to match site language ── */}
        {!isLoggedIn && (
          <LazySection>
            <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
              <div className="container mx-auto max-w-3xl">
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm">
                  <h2 className="font-heading mb-3 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, textWrap: 'balance' }}>
                    Create your free account
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                    Get full access to all career guides, resume tools, salary data, and more, completely free.
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-left max-w-2xl mx-auto">
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">10+ career &amp; interview guides</span>
                    </div>
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">Resume Builder &amp; AI Analyzer</span>
                    </div>
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">Interview Bank &amp; negotiation tools</span>
                    </div>
                  </div>
                  <Link
                    to="/join"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold bg-gold text-white hover:bg-gold-dark transition-colors text-base shadow-sm"
                  >
                    Get Full Access
                  </Link>
                </div>
              </div>
            </section>
          </LazySection>
        )}

      </main>

      <ExitIntentPopup lang="en" />
    </div>
  );
};

export default Index;