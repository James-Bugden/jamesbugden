// Experimental copy of Index.tsx — safe to modify without affecting the live homepage
import { useState, useEffect } from "react";
import { Briefcase, Users, Linkedin, FileCheck, X, CheckCircle2, Eye, Building, Plus, Minus } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import HomepageTestimonialsExperiment from "@/components/HomepageTestimonialsExperiment";
import LogoScrollExperiment from "@/components/LogoScrollExperiment";
import SelfSegmentationExperiment from "@/components/SelfSegmentationExperiment";
import CoachingCTAExperiment from "@/components/CoachingCTAExperiment";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";

const faqs = [
  { q: "Is the free newsletter actually free? What's the catch?", a: "100% free, no catch. I send weekly recruiting tips, salary insights, and resume strategies straight to your inbox. I also offer paid 1-on-1 coaching for people who want personalized help — but the newsletter stands on its own and you'll never be pressured to buy anything." },
  { q: "I don't have the confidence to negotiate my salary. Can you actually help with that?", a: "This is the #1 thing I hear from candidates. Most people don't realize that salary negotiation isn't about being aggressive — it's about understanding how the other side thinks. I teach you the recruiter's perspective so you can negotiate with clarity, not confrontation. Even my most nervous clients walk away feeling prepared." },
  { q: "I keep applying but never hear back. What am I doing wrong?", a: "Usually it's one of three things: your resume isn't passing ATS filters, your headline doesn't match the job title, or your achievements are buried under generic descriptions. My resume review pinpoints exactly which of these is happening to you and gives you specific fixes — not vague advice." },
  { q: "I don't know how to deal with HR during the hiring process. They feel like gatekeepers.", a: "HR isn't your enemy — they're actually incentivized to fill the role. The problem is most candidates don't understand what HR is optimizing for. I've been that HR person. I show you exactly what recruiters care about at each stage so you can work with them, not against them." },
  { q: "Can't I just use ChatGPT to fix my resume?", a: "AI is great for a first pass, but it doesn't know what a Fortune 500 recruiter actually looks for. It can't tell you that your strongest achievement is buried on page 2, or that the company you're targeting cares more about X than Y. That's what 20,000+ resume reviews and years of insider experience give you." },
  { q: "How is the resume review different from other services?", a: "Most resume services give you a proofread and some formatting tweaks. My review is a strategic breakdown — I analyze your resume against specific target roles, identify which achievements to lead with, restructure your positioning, and give you a framework you can reuse for every application going forward. It's a career strategy session disguised as a resume review." },
];

function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <section className="py-20 px-5 md:px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center mb-12" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
          Questions You Might Be Thinking
        </h2>
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-bold text-lg" style={{ color: '#1A1A1A' }}>{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-5 h-5 flex-shrink-0 transition-transform duration-200" style={{ color: '#6B6B6B' }} />
                    : <Plus className="w-5 h-5 flex-shrink-0 transition-transform duration-200" style={{ color: '#6B6B6B' }} />
                  }
                </button>
                <div
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-base" style={{ color: '#1A1A1A', paddingTop: '0' }}>
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
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="experiment min-h-screen overflow-x-hidden scroll-smooth" style={{ backgroundColor: '#FDFBF7' }}>
      <PageSEO
        title="James Bugden — Experiment"
        description="Experimental homepage layout"
        path="/experiment"
      />

      {/* ── Navigation ── */}
      <header>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
            scrolled ? "shadow-md shadow-black/8" : ""
          }`}
          style={{ backgroundColor: '#FDFBF7' }}
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-lg md:text-xl font-bold tracking-tight" style={{ color: '#2D3A2E' }}>
              JAMES BUGDEN
            </span>
            <div className="flex items-center gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="default" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — cream #FDFBF7 ── */}
        <section id="about" className="pt-20 md:pt-36 pb-12 md:pb-20 px-5 md:px-6 relative" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-4 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                  </div>
                </div>

                <h1 className="font-heading leading-[1.12] tracking-tight mb-3 max-w-3xl mx-auto md:mx-0" style={{ color: '#1A1A1A', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)' }}>
                  Get a $200K+ Offer at Your Dream&nbsp;Company
                </h1>

                {/* Credential badge — below headline */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ backgroundColor: 'rgba(45,58,46,0.06)', borderColor: 'rgba(45,58,46,0.12)', color: '#6B6B6B', fontSize: '0.9375rem' }}>
                    <Briefcase className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    Senior Recruiter · Fortune 500
                  </span>
                </div>

                <p className="leading-relaxed max-w-xl mx-auto md:mx-0 mb-5" style={{ color: '#1A1A1A', fontSize: '1.0625rem' }}>
                  Tired of getting ghosted after interviews or lowballed on offers? Get the exact recruiting playbook I used to place 750+ candidates at Google, Uber, and Microsoft — delivered to your inbox weekly.
                </p>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
                  <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Get My Free Recruiting Tips" />
                </div>

                <p className="mb-5" style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>
                  Join 2,000+ professionals. Free forever. Unsubscribe anytime.
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5" style={{ color: '#1A1A1A' }}>
                      <FileCheck className="w-5 h-5" style={{ color: '#2D3A2E', opacity: 0.7 }} />
                      20,000+
                    </span>
                    <span className="text-sm" style={{ color: '#6B6B6B' }}>resumes reviewed</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5" style={{ color: '#1A1A1A' }}>
                      <Briefcase className="w-5 h-5" style={{ color: '#2D3A2E', opacity: 0.7 }} />
                      750+
                    </span>
                    <span className="text-sm" style={{ color: '#6B6B6B' }}>people hired</span>
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
        <div style={{ backgroundColor: '#FDFBF7' }}>
          <LogoScrollExperiment />
        </div>

        {/* ── Testimonials — white #FFFFFF ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <HomepageTestimonialsExperiment />
          </div>
        </LazySection>

        {/* ── Pain-Point Section (NEW) — cream #FDFBF7 ── */}
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-heading mb-6" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
              Sound Familiar?
            </h2>

            <div className="flex flex-col gap-5 mb-8 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>You've sent 100+ applications and heard nothing back</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>You finally got interviews but keep getting ghosted after the final round</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>You got an offer — but you have no idea if it's actually good or if you're leaving $50K+ on the table</p>
              </div>
            </div>

            <div className="flex items-center justify-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0" style={{ color: '#2D3A2E' }} />
              <p style={{ color: '#6B6B6B', fontSize: '1rem' }}>
                You don't need more job boards. You need an insider who knows how the system actually works.
              </p>
            </div>

            <a
              href="#about"
              className="inline-flex h-12 px-8 items-center justify-center rounded-lg btn-gold text-base font-semibold"
            >
              Get My Free Recruiting Tips
            </a>
          </div>
        </section>

        {/* ── Why Work With an Insider — white #FFFFFF ── */}
        <section className="py-20 px-5 md:px-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-12">
              <h2 className="font-heading mb-3" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
                Why Work With an Insider?
              </h2>
              <p className="text-[17px] max-w-[600px] mx-auto" style={{ color: '#6B6B6B' }}>
                Most career advice comes from people who've never sat on the other side of the hiring table. I have.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-10">
              <div className="text-center md:text-left">
                <Eye className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2D3A2E' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>I've Read 20,000+ Resumes</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  I know exactly what makes a recruiter stop scrolling and what gets your resume thrown out in 6 seconds. No guesswork — just patterns I've seen thousands of times.
                </p>
              </div>
              <div className="text-center md:text-left">
                <Users className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2D3A2E' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>I've Hired 750+ People</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  I've sat in the room where offers get decided. I know what HR is thinking, what hiring managers care about, and exactly where candidates lose money in negotiation.
                </p>
              </div>
              <div className="text-center md:text-left">
                <Building className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2D3A2E' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>Fortune 500 Insider Access</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  Google, Amazon, Meta, Microsoft — I've recruited for them all. I know their interview processes, compensation structures, and what it takes to stand out in their applicant pools.
                </p>
              </div>
            </div>

            <p className="text-center text-sm" style={{ color: '#6B6B6B' }}>
              This isn't generic career advice from a blog. It's the playbook from someone who's been on the inside.
            </p>
          </div>
        </section>

        {/* ── "Find Your Path" — white #FFFFFF ── */}
        <LazySection>
          <SelfSegmentationExperiment />
        </LazySection>

        {/* ── FAQ — white #FFFFFF ── */}
        <LazySection>
          <FAQSection />
        </LazySection>

        {/* ── Coaching CTA — dark green gradient ── */}
        <LazySection>
          <CoachingCTAExperiment />
        </LazySection>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-10 px-5 md:px-6" style={{ backgroundColor: '#2D3A2E' }}>
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
          <span className="text-sm text-center w-full" style={{ color: '#A8B5A9' }}>
            © 2026 James Bugden. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default IndexExperiment;
