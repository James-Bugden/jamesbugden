// Experimental copy of Index.tsx — safe to modify without affecting the live homepage
import { useState, useEffect } from "react";
import { Briefcase, Users, Linkedin, FileCheck, X, CheckCircle2 } from "lucide-react";
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

        {/* ── "Find Your Path" — white #FFFFFF ── */}
        <LazySection>
          <SelfSegmentationExperiment />
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
