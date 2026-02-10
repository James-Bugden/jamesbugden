import { Button } from "@/components/ui/button";
import { Linkedin, Users, Briefcase, FileCheck } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSection from "@/components/TestimonialsSection";
import FreeResourcesSection from "@/components/FreeResourcesSection";
import MailerLiteForm from "@/components/MailerLiteForm";
import PageSEO from "@/components/PageSEO";

declare global {
  interface Window {
    ml?: (action: string, ...args: unknown[]) => void;
  }
}

const Index = () => {
  const navLinks = [
    { href: "#resources", label: "Free Resources" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <PageSEO
        title="James Bugden — Get a $200K+ Offer"
        description="Senior Fortune 500 recruiter shares insider strategies that helped 750+ candidates land offers at Google, Uber, Microsoft."
        path="/"
      />
      {/* Navigation - Executive Green */}
      <header>
      <nav className="fixed top-0 left-0 right-0 z-50 bg-nav-green">
        <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
          <span className="font-heading text-lg md:text-xl font-medium text-cream tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a key={link.href} href={link.href} className="text-sm text-cream-70 hover:text-cream transition-colors">
                {link.label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3 md:gap-4">
            <a href="#resources" className="md:hidden text-sm text-cream-70 hover:text-cream transition-colors">
              Resources
            </a>
            <LanguageToggle variant="nav" />
            <div className="hidden md:flex items-center gap-3">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-cream-70 hover:text-cream transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>
      </header>

      <main>
      {/* Hero Section */}
      <section id="about" className="pt-24 md:pt-36 pb-16 md:pb-24 px-5 md:px-6 bg-background relative">
        <div className="container mx-auto max-w-5xl">
          {/* Mobile: centered stack / Desktop: two-column */}
          <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">

            {/* Content column */}
            <div className="order-2 md:order-1 w-full">
              {/* Photo — mobile only, centered */}
              <div className="flex justify-center mb-3 md:hidden">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                  <img
                    src={jamesPhoto}
                    alt="James Bugden"
                    className="relative w-36 h-36 rounded-full object-cover hero-photo-shadow border-4 border-card"
                  />
                </div>
              </div>

              {/* Credential badge */}
              <div className="mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-executive-green/8 border border-executive-green/15 text-sm text-executive-green font-medium">
                  <Briefcase className="w-3.5 h-3.5" />
                  Senior Recruiter · Fortune 500
                </span>
              </div>

              {/* Headline */}
              <h1 className="font-heading text-[2.25rem] md:text-[3.5rem] lg:text-[4rem] text-foreground leading-[1.12] tracking-tight mb-5 max-w-2xl mx-auto md:mx-0">
                Get a $200K+ Offer at Your Dream&nbsp;Company
              </h1>

              {/* Subhead */}
              <p className="text-[1.0625rem] md:text-lg text-foreground/85 leading-relaxed max-w-xl mx-auto md:mx-0 mb-6">
                The insider recruiting strategies I used to place 750+ candidates at companies like Google, Uber, and Microsoft.
              </p>

              {/* Social proof — ABOVE form */}
              <div className="flex items-center justify-center md:justify-start gap-2 text-sm text-muted-foreground mb-5">
                <Users className="w-4 h-4 text-gold flex-shrink-0" />
                <span>Join 2,000+ professionals getting insider recruiting tips weekly</span>
              </div>

              {/* CTA block */}
              <div className="mb-2 max-w-md mx-auto md:mx-0">
                <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="Send My Guides" />
              </div>

              {/* Micro-commitment reducer */}
              <p className="text-[13px] text-muted-foreground/70 mb-8">
                Join free · Unsubscribe anytime · No spam
              </p>

              {/* Stats bar */}
              <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-foreground flex items-center gap-1.5">
                    <FileCheck className="w-5 h-5 text-executive-green/60" />
                    20,000+
                  </span>
                  <span className="text-sm text-foreground/60">resumes reviewed</span>
                </div>
                <div className="flex flex-col items-center md:items-start">
                  <span className="text-xl font-bold text-foreground flex items-center gap-1.5">
                    <Briefcase className="w-5 h-5 text-executive-green/60" />
                    750+
                  </span>
                  <span className="text-sm text-foreground/60">people hired</span>
                </div>
              </div>
            </div>

            {/* Photo — desktop only */}
            <div className="hidden md:flex justify-end order-2">
              <div className="relative">
                <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="relative w-72 h-72 lg:w-80 lg:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />

      {/* Free Resources Section */}
      <FreeResourcesSection />


      {/* Waitlist CTA Section */}
      <section id="results" className="py-16 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 leading-tight">
            Join The Waitlist: Free Resume Review
          </h2>
          <p className="text-gold font-semibold text-lg md:text-xl mb-2">
            $500 USD value · No charge while I'm testing this
          </p>
          <p className="text-base md:text-lg text-foreground mb-8">
            Only 5 candidates per month
          </p>
          
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 mb-8 text-left max-w-xl mx-auto">
            <p className="text-foreground mb-4 font-medium">Why there's a waitlist:</p>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              Good resume feedback takes time.<br />
              And rushed feedback doesn't help anyone.
            </p>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              To keep this useful,<br />
              I limit reviews to 5 candidates per month.
            </p>
            <p className="text-foreground mb-6 text-sm md:text-base leading-relaxed">
              That way, each resume gets thoughtful, honest input<br />
              based on real hiring decisions.
            </p>
            <p className="text-foreground font-medium mb-3">What you'll get when your spot opens:</p>
            <ul className="space-y-2 mb-0">
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>Full report and updated English resume</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>Real feedback from an active Fortune 100 recruiter</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>Learn how to target your resume to your dream jobs</span>
              </li>
            </ul>
          </div>

          <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[500px] mx-auto" />
          <p className="text-sm text-muted-foreground mt-4">
            Your info stays private. I don't spam. Ever.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-executive-green relative border-t border-cream/10">
        <div className="container mx-auto max-w-xl text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl text-cream mb-4">
            Ask me anything
          </h2>
          <p className="text-cream/70 text-base md:text-lg mb-8 leading-relaxed">
            I can also help with interview preparation and salary negotiation.
          </p>
          <a href="mailto:james@jamesbugden.com?subject=Quick question about resume review">
            <Button size="lg" className="h-14 px-10 btn-gold font-medium text-base uppercase tracking-wider">
              Ask a quick question
            </Button>
          </a>
        </div>
      </section>
      </main>

      {/* Footer */}
      <footer className="py-8 md:py-10 px-5 md:px-6 bg-card border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-foreground transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
