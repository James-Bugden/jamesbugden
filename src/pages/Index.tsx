import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import MobileMenu from "@/components/MobileMenu";
import GoldCheckBadge from "@/components/GoldCheckBadge";
import TestimonialsSection from "@/components/TestimonialsSection";

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

      {/* Bio Section - Now first after nav */}
      <section id="about" className="pt-28 md:pt-32 pb-16 md:pb-20 px-5 md:px-6 bg-card border-b border-border">
        <div className="container mx-auto max-w-5xl">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
            Hi, I'm James
          </h2>
          <div className="grid md:grid-cols-2 gap-10 md:gap-12 items-center">
            <div className="order-2 md:order-1">
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                I'm a <span className="font-bold">Senior Recruiter at Uber</span> in Taiwan.
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                I've hired <span className="font-bold">500+ people</span> and reviewed over <span className="text-gold font-bold">20,000 resumes</span>.
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                I know exactly what gets people rejected. And what makes them stand out.
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-6">
                I don't teach theory. I teach what actually works.
              </p>
              <p className="text-base md:text-lg text-foreground leading-relaxed mb-8">
                I spent years as an English teacher in Taiwan. Then I moved into tech recruiting. I want to help others achieve their goals through finding their dream job.
              </p>
              <div className="flex flex-wrap gap-3">
                <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <InstagramIcon className="w-4 h-4" /> Instagram
                  </Button>
                </a>
                <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" size="sm" className="gap-2 border-2 border-foreground/20 hover:bg-secondary hover:border-foreground/40 h-10 md:h-9">
                    <ThreadsIcon className="w-4 h-4" /> Threads
                  </Button>
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

      {/* Hero Section - Waitlist Lead Magnet (Now after testimonials) */}
      <section className="py-16 md:py-20 px-5 md:px-6 bg-card border-y border-border">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground mb-4 animate-fade-up leading-tight">
            Join The Waitlist: Free Resume Review
          </h2>
          <p className="text-gold font-semibold text-lg md:text-xl mb-6 animate-fade-up-delay">
            (Worth $200 - Limited Spots)
          </p>
          <p className="text-base md:text-lg text-foreground mb-2 animate-fade-up-delay">
            I've reviewed <span className="font-bold">20,000+ resumes</span> as an Uber recruiter.
          </p>
          <p className="text-base md:text-lg text-foreground mb-8 animate-fade-up-delay">
            Right now I'm fully booked, but join the waitlist and I'll let you know when spots open up.
          </p>
          
          <div className="bg-background border border-border rounded-lg p-6 md:p-8 mb-8 text-left max-w-xl mx-auto animate-fade-up-delay-2">
            <p className="text-foreground mb-4 font-medium">Here's the deal: I'm swamped.</p>
            <p className="text-foreground mb-4 text-sm md:text-base leading-relaxed">
              I work full-time at Uber but I want to help people. I can't review every resume.
            </p>
            <p className="text-foreground mb-6 text-sm md:text-base leading-relaxed">
              But I know how it feels. You send 50 applications. You hear nothing back.
            </p>
            <p className="text-foreground mb-6 text-sm md:text-base leading-relaxed">
              So here's what I'm doing: Join the waitlist for a free resume review. When I have time, I'll reach out.
            </p>
            <p className="text-foreground font-medium mb-3">What you'll get:</p>
            <ul className="space-y-2 mb-0">
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>The exact changes that make recruiters reach out</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>Tips from someone who reviews resumes every day at Uber</span>
              </li>
              <li className="flex items-start gap-3 text-sm md:text-base text-foreground">
                <GoldCheckBadge />
                <span>Real feedback from an active Fortune 500 recruiter</span>
              </li>
            </ul>
          </div>

          <div className="ml-embedded max-w-[500px] mx-auto animate-fade-up-delay-2" data-form="sM1X80"></div>
          <p className="text-sm text-muted-foreground mt-4 animate-fade-up-delay-2">
            Your info stays private. I don't spam. Ever.
          </p>
        </div>
      </section>

      {/* Results Section - Updated Stats */}
      <section id="results" className="py-16 md:py-24 px-5 md:px-6 bg-background">
        <div className="container mx-auto max-w-5xl text-center">
          <h2 className="font-heading text-3xl md:text-5xl text-foreground mb-12 md:mb-16">
            The Numbers
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">20,000+</p>
              <p className="text-sm md:text-base text-muted-foreground">Resumes Reviewed</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">500+</p>
              <p className="text-sm md:text-base text-muted-foreground">People Hired</p>
            </div>
            <div>
              <p className="font-heading text-4xl md:text-5xl text-gold-gradient mb-2">22K+</p>
              <p className="text-sm md:text-base text-muted-foreground">LinkedIn + Threads Community</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 md:py-24 px-5 md:px-6 bg-executive-green relative border-t border-cream/10">
        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="font-heading text-3xl md:text-5xl text-cream mb-6">
            Ready to Level Up?
          </h2>
          <p className="text-cream-90 text-base md:text-lg mb-8 md:mb-10 max-w-xl mx-auto">
            Every week you wait is money left on the table. Let's change that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-10 btn-gold font-medium text-base uppercase tracking-wider w-full sm:w-auto">
              Work With Me
            </Button>
            <Button size="lg" className="h-14 px-10 btn-secondary-blur font-medium text-base uppercase tracking-wider w-full sm:w-auto">
              Get Free Tips
            </Button>
          </div>
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
