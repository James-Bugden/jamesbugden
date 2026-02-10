import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSection from "@/components/TestimonialsSection";
import FreeResourcesSection from "@/components/FreeResourcesSection";
import MailerLiteForm from "@/components/MailerLiteForm";

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
            {/* Mobile: show link and language toggle */}
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

      {/* Hero Section */}
      <section id="about" className="pt-32 md:pt-40 pb-20 md:pb-28 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
            {/* Content */}
            <div className="order-2 md:order-1">
              {/* Headline Block - Dominant element with breathing room */}
              <div className="mb-14 md:mb-16">
                <h1 className="font-heading text-[2.5rem] md:text-6xl lg:text-7xl text-executive-green leading-[1.05] tracking-tight mb-3">
                  Land a $200K+ Role at a Company You Want to Work At
                </h1>
              </div>

              {/* Authority + value prop */}
              <div className="mb-10 md:mb-12">
                <p className="text-base md:text-lg text-foreground leading-relaxed">
                  I've reviewed 20,000+ resumes and hired 750+ people at Fortune 500 companies.
                </p>
                <p className="text-base md:text-lg text-foreground leading-relaxed mt-3">
                  Every week I share the salary, resume, and interview strategies most career coaches don't know.
                </p>
              </div>

              {/* CTA */}
              <div className="space-y-5">
                <MailerLiteForm formId="sM1X80" className="ml-embedded max-w-[400px]" buttonText="Get Free Weekly Strategies" />
                
                <p className="text-sm text-muted-foreground">
                  Join 2,000+ professionals who get insider recruiting tips every week.
                </p>
              </div>
            </div>

            {/* Photo */}
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
