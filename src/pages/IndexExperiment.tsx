// Experimental copy of Index.tsx — safe to modify without affecting the live homepage
import { useState, useEffect } from "react";
import { Briefcase, Users, Linkedin, FileCheck } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import HomepageTestimonials from "@/components/HomepageTestimonials";
import LogoScroll from "@/components/LogoScroll";
import SelfSegmentation from "@/components/SelfSegmentation";
import ReadinessAssessment from "@/components/ReadinessAssessment";
import OfferCalculatorCTA from "@/components/OfferCalculatorCTA";
import CoachingCTA from "@/components/CoachingCTA";
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
          className={`fixed top-0 left-0 right-0 z-50 bg-executive-green transition-shadow duration-300 ${
            scrolled ? "shadow-lg shadow-black/20" : ""
          }`}
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-lg md:text-xl font-bold text-cream tracking-tight">
              JAMES BUGDEN
            </span>
            <div className="flex items-center gap-4">
              <AuthHeaderButton variant="nav" />
              <LanguageToggle variant="nav" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — cream #FDFBF7 ── */}
        <section id="about" className="pt-20 md:pt-36 pb-10 md:pb-24 px-5 md:px-6 relative" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-2 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow border-4 border-card" />
                  </div>
                </div>

                <div className="mb-4 md:mb-8">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-executive-green/8 border border-executive-green/15 text-sm font-medium" style={{ color: '#2D3A2E' }}>
                    <Briefcase className="w-3.5 h-3.5" />
                    Senior Recruiter · Fortune 500
                  </span>
                </div>

                <h1 className="font-heading text-foreground leading-[1.12] tracking-tight mb-4 max-w-2xl mx-auto md:mx-0" style={{ color: '#1A1A1A' }}>
                  Get a $200K+ Offer at Your Dream&nbsp;Company
                </h1>

                <p className="md:text-lg leading-relaxed max-w-xl mx-auto md:mx-0 mb-5" style={{ color: '#1A1A1A', fontSize: '1.0625rem' }}>
                  The insider recruiting strategies I used to help 750+ candidates at companies like Google, Uber, and Microsoft.
                </p>

                <div className="flex items-center justify-center md:justify-start gap-2 text-sm mb-4" style={{ color: '#6B6B6B' }}>
                  <Users className="w-4 h-4 flex-shrink-0" style={{ color: '#D4930D' }} />
                  <span>Join 2,000+ professionals getting insider recruiting tips weekly</span>
                </div>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
                  <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Sign Up" />
                </div>

                <p className="text-[13px] mb-5" style={{ color: '#6B6B6B' }}>
                  Join free · Unsubscribe anytime · No spam
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
                  <img src={jamesPhoto} alt="James Bugden" className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full object-cover hero-photo-shadow border-4 border-card" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar — cream #FDFBF7 ── */}
        <div style={{ backgroundColor: '#FDFBF7' }}>
          <LogoScroll />
        </div>

        {/* ── Testimonials — white #FFFFFF ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <HomepageTestimonials />
          </div>
        </LazySection>

        {/* ── "Where Are You Right Now?" — white #FFFFFF ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <SelfSegmentation />
          </div>
        </LazySection>

        {/* ── Offer Calculator — cream #FDFBF7 ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FDFBF7' }}>
            <OfferCalculatorCTA />
          </div>
        </LazySection>

        {/* ── Readiness Assessment — removed for now, keeping in flow ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <ReadinessAssessment />
          </div>
        </LazySection>

        {/* ── Paid Coaching — dark green (unchanged) ── */}
        <LazySection>
          <CoachingCTA />
        </LazySection>
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#6B6B6B' }}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#6B6B6B' }}>
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#6B6B6B' }}>
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
          <span className="text-sm text-center w-full" style={{ color: '#6B6B6B' }}>
            © 2026 James Bugden. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default IndexExperiment;
