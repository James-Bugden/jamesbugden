import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Linkedin } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-executive-green">
        <div className="container mx-auto px-8 py-5 flex items-center justify-between">
          <div className="flex items-center gap-12">
            <a href="#" className="text-primary text-sm tracking-wide hover:text-accent transition-colors">HOME</a>
            <a href="#about" className="text-primary/70 text-sm tracking-wide hover:text-primary transition-colors">ABOUT</a>
            <a href="#services" className="text-primary/70 text-sm tracking-wide hover:text-primary transition-colors">SERVICES</a>
          </div>
          
          {/* Logo/Initials */}
          <div className="absolute left-1/2 -translate-x-1/2">
            <span className="font-heading text-3xl text-primary tracking-wide">JB</span>
          </div>
          
          <div className="flex items-center gap-8">
            <a href="#results" className="text-primary/70 text-sm tracking-wide hover:text-primary transition-colors">RESULTS</a>
            <a href="#contact" className="text-primary/70 text-sm tracking-wide hover:text-primary transition-colors">CONTACT</a>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Hero Section - Marshall Goldsmith Style */}
      <section className="relative min-h-screen hero-gradient flex items-center justify-center pt-20">
        <div className="container mx-auto px-6 relative">
          <div className="flex flex-col items-center justify-center">
            {/* Name and Photo Container */}
            <div className="relative flex items-center justify-center w-full max-w-5xl">
              {/* First Name - Left */}
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary name-shadow animate-fade-up tracking-wide">
                James
              </h1>
              
              {/* Photo - Center */}
              <div className="relative mx-4 md:mx-8 lg:mx-12 animate-fade-up-delay">
                <img
                  src={jamesPhoto}
                  alt="James Bugden"
                  className="w-48 h-64 md:w-64 md:h-80 lg:w-80 lg:h-[420px] object-cover object-top photo-glow"
                />
              </div>
              
              {/* Last Name - Right */}
              <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl text-primary name-shadow animate-fade-up tracking-wide">
                Bugden
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="py-24 px-6 bg-background">
        <div className="container mx-auto max-w-4xl">
          <div className="animate-fade-up-delay-2">
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              My mission is simple. I help ambitious professionals land roles at the world's best companies—and negotiate what they're truly worth. With years of experience on both sides of the hiring table at Fortune 500 companies, I've learned exactly what it takes to stand out.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-8">
              As a career strategist and coach, I help people understand how to position themselves, ace interviews, and negotiate fearlessly. Through direct, actionable advice, I help professionals achieve lasting career success.
            </p>
            <p className="text-lg md:text-xl text-foreground leading-relaxed mb-12">
              I've filled my practice with proven strategies, real-world insights, and frameworks that work. Every client walks away with concrete tools they can use immediately.
            </p>
            <h3 className="font-heading text-3xl md:text-4xl text-accent mb-2">Life is good.</h3>
            <h3 className="font-heading text-3xl md:text-4xl text-primary">Your career can be too.</h3>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 section-gradient border-y border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="p-6">
              <p className="font-heading text-4xl md:text-5xl text-primary mb-2">$12M+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Negotiated</p>
            </div>
            <div className="p-6">
              <p className="font-heading text-4xl md:text-5xl text-primary mb-2">500+</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Clients</p>
            </div>
            <div className="p-6">
              <p className="font-heading text-4xl md:text-5xl text-primary mb-2">94%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Success Rate</p>
            </div>
            <div className="p-6">
              <p className="font-heading text-4xl md:text-5xl text-primary mb-2">47%</p>
              <p className="text-sm text-muted-foreground uppercase tracking-wider">Avg Raise</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-28 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="grid md:grid-cols-2 gap-16 items-start">
            <div>
              <h2 className="font-heading text-4xl md:text-5xl text-primary mb-8">
                About <span className="text-accent">James</span>
              </h2>
              <p className="text-foreground text-lg leading-relaxed mb-6">
                I've spent my career helping professionals break through to the next level. What started as informal advice to friends became a full practice serving hundreds of clients worldwide.
              </p>
              <p className="text-foreground text-lg leading-relaxed mb-6">
                My clients land at Google, Amazon, Meta, Goldman Sachs, McKinsey, and beyond. I don't teach theory—I teach what actually works in real interviews, real negotiations, and real careers.
              </p>
              <p className="text-muted-foreground text-lg leading-relaxed">
                Having been on both sides of the hiring table, I know exactly what companies are looking for—and how to position yourself as the obvious choice.
              </p>
            </div>
            <div className="flex flex-col gap-6">
              <div className="p-8 border border-border bg-card">
                <h4 className="font-heading text-2xl text-primary mb-4">The Problem</h4>
                <p className="text-muted-foreground leading-relaxed">
                  Most professionals undersell themselves. They accept the first offer, stumble through interviews, and wonder why they're not advancing.
                </p>
              </div>
              <div className="p-8 border border-accent/30 bg-card">
                <h4 className="font-heading text-2xl text-accent mb-4">The Solution</h4>
                <p className="text-foreground leading-relaxed">
                  I give you the exact scripts, frameworks, and strategies to command what you're worth and land the role you deserve.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-28 px-6 section-gradient">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              How I Can <span className="text-accent">Help</span>
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Choose the path that fits your needs
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-10 border border-border bg-card hover:border-accent/50 transition-colors duration-500">
              <div className="text-4xl mb-6">📄</div>
              <h3 className="font-heading text-2xl text-primary mb-4">Resume Excellence</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Your resume has 6 seconds to impress. I'll rebuild it to pass every ATS and make recruiters reach out first.
              </p>
              <p className="text-accent font-medium">Perfect first impressions →</p>
            </div>

            <div className="p-10 border border-accent/50 bg-card relative">
              <div className="absolute top-4 right-4 text-xs text-accent uppercase tracking-wider">Popular</div>
              <div className="text-4xl mb-6">🎯</div>
              <h3 className="font-heading text-2xl text-primary mb-4">Interview Mastery</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                Stop hoping and start knowing. I'll show you exactly what to say, how to say it, and how to handle any question.
              </p>
              <p className="text-accent font-medium">Ace every interview →</p>
            </div>

            <div className="p-10 border border-border bg-card hover:border-accent/50 transition-colors duration-500">
              <div className="text-4xl mb-6">💰</div>
              <h3 className="font-heading text-2xl text-primary mb-4">Salary Negotiation</h3>
              <p className="text-muted-foreground leading-relaxed mb-6">
                The average person leaves $50K+ on the table. I'll coach you to negotiate fearlessly and get what you deserve.
              </p>
              <p className="text-accent font-medium">Maximize your worth →</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section id="results" className="py-28 px-6 bg-background">
        <div className="container mx-auto max-w-5xl">
          <div className="text-center mb-16">
            <h2 className="font-heading text-4xl md:text-5xl text-primary mb-4">
              Real <span className="text-accent">Results</span>
            </h2>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                quote: "I was stuck at $85K for 3 years. James helped me negotiate $142K at Google. That's a 67% increase.",
                name: "Sarah M.",
                role: "Software Engineer → Google"
              },
              {
                quote: "Failed 12 interviews before James. After his coaching, got offers from Meta AND Amazon.",
                name: "Michael T.",
                role: "Product Manager → Meta"
              },
              {
                quote: "I almost accepted their first offer. James coached me to counter and I got $45K more.",
                name: "Jennifer L.",
                role: "Data Scientist → Goldman Sachs"
              }
            ].map((testimonial, i) => (
              <div key={i} className="p-8 border border-border bg-card">
                <div className="flex gap-1 mb-6 text-accent text-lg">★★★★★</div>
                <p className="text-foreground mb-8 leading-relaxed italic">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-medium text-primary">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Companies */}
      <section className="py-16 px-6 border-y border-border">
        <div className="container mx-auto max-w-5xl text-center">
          <p className="text-xs font-medium text-muted-foreground tracking-[0.3em] uppercase mb-10">
            Where My Clients Work
          </p>
          <div className="flex flex-wrap justify-center items-center gap-10 md:gap-16 font-heading text-2xl md:text-3xl text-muted-foreground/40">
            <span className="hover:text-primary transition-colors duration-300">Google</span>
            <span className="hover:text-primary transition-colors duration-300">Meta</span>
            <span className="hover:text-primary transition-colors duration-300">Amazon</span>
            <span className="hover:text-primary transition-colors duration-300">Apple</span>
            <span className="hover:text-primary transition-colors duration-300">Goldman</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section id="contact" className="py-28 px-6 bg-executive-green">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="font-heading text-4xl md:text-5xl text-primary mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-primary/70 text-lg mb-12 max-w-xl mx-auto">
            Every week you wait is money left on the table and opportunities passing you by.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="h-14 px-12 bg-primary text-primary-foreground hover:bg-primary/90 font-medium text-base uppercase tracking-wider">
              Work With Me
            </Button>
            <Button size="lg" variant="outline" className="h-14 px-12 border-primary/30 text-primary hover:bg-primary/10 font-medium text-base uppercase tracking-wider">
              Get Free Tips
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-background border-t border-border">
        <div className="container mx-auto max-w-5xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <span className="font-heading text-2xl text-primary">JB</span>
            <div className="flex items-center gap-8">
              <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <InstagramIcon className="w-5 h-5" />
              </a>
              <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                <ThreadsIcon className="w-5 h-5" />
              </a>
            </div>
            <span className="text-sm text-muted-foreground">
              © 2024 James Bugden. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
