import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Linkedin, MessageCircle } from "lucide-react";
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
    <div className="min-h-screen bg-background font-sans">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-wide">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
            <a href="#results" className="text-sm font-medium hover:text-accent transition-colors">Results</a>
            <a href="#newsletter" className="text-sm font-medium hover:text-accent transition-colors">Newsletter</a>
          </div>
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>
      </nav>

      {/* Hero Section with Newsletter */}
      <section id="newsletter" className="pt-24 pb-16 px-6 bg-secondary">
        <div className="container mx-auto max-w-3xl text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold leading-tight mb-12">
            5 Minutes That Might
            <br />
            Change Your Career
          </h1>
          
          <p className="text-xl md:text-2xl mb-6">
            <span className="text-accent font-bold">12,847+ professionals</span> have leveled up their careers so far. Will the next one be you?
          </p>
          <p className="text-muted-foreground text-lg mb-8">
            Receive career strategies shared with thousands of ambitious professionals directly to your inbox every Tuesday.
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 mb-4 max-w-xl mx-auto">
            <Input
              type="email"
              placeholder="Your Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-background"
              required
            />
            <Button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8">
              SIGN UP
            </Button>
          </form>
          <p className="text-sm text-muted-foreground italic">
            Your information is protected and I never spam, ever.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6">
        <div className="container mx-auto max-w-5xl">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-center mb-16">
            Hi, I'm James
          </h2>
          
          <div className="grid md:grid-cols-[1fr,auto] gap-12 items-start">
            {/* Text - left side on desktop, below photo on mobile */}
            <div className="order-2 md:order-1">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                I've helped 500+ professionals negotiate <strong className="text-foreground">$12M+ in additional compensation</strong>. 
                I've been on both sides of the hiring table at Fortune 500 companies, and I know exactly what gets candidates 
                rejected—and what makes them irresistible.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-8">
                My clients land roles at Google, Amazon, Meta, Goldman Sachs, McKinsey, 
                and every major tech company you can think of. I don't teach theory. I teach what actually works.
              </p>
              <div className="flex flex-wrap gap-4 justify-center md:justify-start">
                <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <Linkedin className="w-4 h-4" /> LinkedIn
                  </Button>
                </a>
                <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer">
                  <Button variant="outline" className="gap-2">
                    <MessageCircle className="w-4 h-4" /> Threads
                  </Button>
                </a>
              </div>
            </div>
            
            {/* Photo - right side on desktop, first on mobile */}
            <div className="flex justify-center md:justify-end order-1 md:order-2">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-radial from-accent/20 to-transparent rounded-full scale-125 blur-xl"></div>
                <img
                  src={jamesPhoto}
                  alt="James Bugden - Career Coach"
                  className="relative w-56 h-56 md:w-72 md:h-72 rounded-full object-cover border-4 border-background shadow-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              How I Help You Win
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three ways to 10x your career trajectory. Pick your path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Resume */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">📄</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Resume That Opens Doors</h3>
              <p className="text-muted-foreground mb-6">
                Your resume has 6 seconds to impress. Most resumes fail in 2. I'll rebuild yours to pass ATS systems 
                AND make recruiters reach out same day.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>ATS-optimized formatting</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Achievement-focused bullets</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Tailored for FAANG & MNCs</span>
                </li>
              </ul>
            </div>

            {/* Interview */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow relative">
              <div className="absolute -top-3 right-6 bg-accent text-accent-foreground text-xs font-bold px-3 py-1 rounded-full">
                MOST POPULAR
              </div>
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">🎯</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Interview Mastery</h3>
              <p className="text-muted-foreground mb-6">
                Stop "hoping" you'll get the job. I'll show you exactly what to say, how to say it, and how to 
                handle any curveball they throw at you.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Mock interviews with feedback</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>STAR method frameworks</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Company-specific strategies</span>
                </li>
              </ul>
            </div>

            {/* Salary Negotiation */}
            <div className="bg-background border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
              <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mb-6">
                <span className="text-2xl">💰</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Salary Negotiation</h3>
              <p className="text-muted-foreground mb-6">
                The average person leaves $50K+ on the table. Don't be average. I'll coach you to negotiate 
                like a pro and get what you're actually worth.
              </p>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Exact scripts & tactics</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Counter-offer strategies</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                  <span>Total comp optimization</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section id="results" className="py-20 px-6 bg-primary text-primary-foreground">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Results That Speak
            </h2>
            <p className="text-primary-foreground/70 text-lg">
              Real numbers. Real people. Real transformations.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">$12M+</p>
              <p className="text-primary-foreground/70">Additional Comp Negotiated</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">500+</p>
              <p className="text-primary-foreground/70">Clients Placed</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">94%</p>
              <p className="text-primary-foreground/70">Interview Success Rate</p>
            </div>
            <div>
              <p className="text-4xl md:text-5xl font-bold text-accent mb-2">47%</p>
              <p className="text-primary-foreground/70">Avg Salary Increase</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
              Don't Take My Word For It
            </h2>
            <p className="text-muted-foreground text-lg">
              Real stories from real people who transformed their careers.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "I was stuck at $85K for 3 years. James helped me negotiate $142K at Google. 
                That's a 67% increase. The ROI on his coaching was literally 100x."
              </p>
              <div>
                <p className="font-bold">Sarah M.</p>
                <p className="text-sm text-muted-foreground">Software Engineer → Google</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "Failed 12 interviews before James. After his coaching, got offers from Meta AND Amazon. 
                Took Meta. Still pinching myself."
              </p>
              <div>
                <p className="font-bold">Michael T.</p>
                <p className="text-sm text-muted-foreground">Product Manager → Meta</p>
              </div>
            </div>

            <div className="bg-card border border-border rounded-xl p-8">
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-accent">★</span>
                ))}
              </div>
              <p className="text-muted-foreground mb-6 italic">
                "I almost accepted their first offer. James coached me to counter and I got $45K more 
                in total comp. Best investment I ever made."
              </p>
              <div>
                <p className="font-bold">Jennifer L.</p>
                <p className="text-sm text-muted-foreground">Data Scientist → Goldman Sachs</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Companies Section */}
      <section className="py-16 px-6 bg-muted">
        <div className="container mx-auto max-w-4xl text-center">
          <p className="text-sm font-semibold text-muted-foreground mb-8 tracking-wide">
            WHERE MY CLIENTS LAND OFFERS
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12 text-2xl md:text-3xl font-bold text-muted-foreground/50">
            <span>Google</span>
            <span>Meta</span>
            <span>Amazon</span>
            <span>Apple</span>
            <span>Microsoft</span>
            <span>Goldman Sachs</span>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6">
        <div className="container mx-auto max-w-3xl text-center">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-6">
            Your Dream Job Won't Apply For Itself
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Every week you wait is money you're leaving on the table and opportunities passing you by. 
            Let's fix that.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold text-lg px-8">
              Work With Me <ArrowRight className="ml-2" />
            </Button>
            <a href="#newsletter">
              <Button size="lg" variant="outline" className="font-semibold text-lg px-8">
                Get Free Weekly Tips
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container mx-auto max-w-6xl">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <div>
              <span className="text-lg font-bold">JAMES BUGDEN</span>
              <p className="text-sm text-muted-foreground mt-1">
                Career strategist for ambitious professionals
              </p>
            </div>
            <div className="flex items-center gap-6">
              <a href="https://www.linkedin.com/in/jamesbugden" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://threads.net/@james.careers" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent transition-colors">
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-border text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} James Bugden. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;