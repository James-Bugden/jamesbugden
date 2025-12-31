import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSection from "@/components/TestimonialsSection";
import MailerLiteForm from "@/components/MailerLiteForm";

declare global {
  interface Window {
    ml?: (action: string, ...args: unknown[]) => void;
  }
}

const Index = () => {
  const navLinks = [
    { href: "#about", label: "About" },
    { href: "#testimonials", label: "Testimonials" },
    { href: "#results", label: "Results" },
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation - Executive Green */}
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
            <div className="hidden md:block">
              <LanguageToggle variant="nav" />
            </div>
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
            <MobileMenu links={navLinks} />
          </div>
        </div>
      </nav>

      {/* Hero Section - Lead Magnet */}
      <section id="about" className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl text-executive-green mb-2 leading-[1.1]">
                Your Resume Isn't Getting You a Job
              </h1>
              <p className="font-heading text-2xl md:text-3xl text-foreground mb-8">
                I'll Tell You Why
              </p>
              <div className="space-y-1 mb-6">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  I'm an active Uber recruiter.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  I've reviewed <span className="text-gold font-bold">20,000+ resumes</span> and hired <span className="text-gold font-bold">500+ people</span>.
                </p>
              </div>
              <div className="space-y-1 mb-6">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  Most resumes are rejected in under 10 seconds.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed font-medium">
                  I'll show you exactly what's costing you the job.
                </p>
              </div>
              <p className="text-gold font-semibold text-base md:text-lg mb-6">
                $500 USD value · No charge while I'm testing this · Only 5 candidates per month
              </p>
              
              <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[400px] mb-4" />
              <p className="text-sm text-muted-foreground mb-6">
                Your info stays private. No spam. Ever.
              </p>
              
              <div className="flex flex-wrap gap-3">
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
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="w-56 h-56 md:w-80 md:h-80 rounded-full object-cover hero-photo-shadow border-4 border-card"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <TestimonialsSection />


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
      <section className="py-14 md:py-20 px-5 md:px-6 bg-executive-dark relative border-t border-cream/5">
        <div className="container mx-auto max-w-xl text-center relative z-10">
          <h3 className="font-heading text-xl md:text-2xl text-cream/90 mb-3">
            Not sure if this is a fit?
          </h3>
          <p className="text-cream/60 text-sm md:text-base mb-6 leading-relaxed">
            If you have a quick question before joining the waitlist,<br className="hidden md:block" /> you can ask it here.
          </p>
          <a href="mailto:james@jamesbugden.com?subject=Quick question about resume review">
            <Button variant="outline" size="default" className="border-cream/20 text-cream/70 hover:text-cream hover:border-cream/40 hover:bg-cream/5 font-medium text-sm tracking-wide">
              Ask a quick question
            </Button>
          </a>
        </div>
      </section>

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
