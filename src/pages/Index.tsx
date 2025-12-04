import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight, CheckCircle, Linkedin, MessageCircle } from "lucide-react";
import jamesPhoto from "@/assets/james-bugden.jpg";

const Index = () => {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle newsletter signup
    console.log("Newsletter signup:", email);
    setEmail("");
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <span className="text-xl font-bold tracking-tight">JAMES BUGDEN</span>
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-sm font-medium hover:text-accent transition-colors">Services</a>
            <a href="#about" className="text-sm font-medium hover:text-accent transition-colors">About</a>
            <a href="#results" className="text-sm font-medium hover:text-accent transition-colors">Results</a>
            <a href="#newsletter" className="text-sm font-medium hover:text-accent transition-colors">Newsletter</a>
          </div>
          <div className="flex items-center gap-4">
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
      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight mb-6">
                Stop Getting Ghosted.
                <br />
                <span className="text-gradient">Start Getting Offers.</span>
              </h1>
              <p className="text-lg text-muted-foreground mb-8 max-w-lg">
                I help ambitious professionals land $150K-$500K+ roles at Google, Meta, Amazon, and other top-tier companies. No fluff. No BS. Just proven strategies that work.
              </p>
              
              {/* Newsletter Signup */}
              <div id="newsletter" className="bg-card border border-border rounded-xl p-6 shadow-lg">
                <p className="text-sm font-semibold text-accent mb-2">FREE WEEKLY CAREER INTEL</p>
                <p className="text-foreground font-medium mb-4">
                  12,847+ professionals get my best career strategies every Tuesday. Zero spam. Unsubscribe anytime.
                </p>
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3">
                  <Input
                    type="email"
                    placeholder="Your email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="flex-1"
                    required
                  />
                  <Button type="submit" className="bg-accent hover:bg-accent/90 text-accent-foreground font-semibold">
                    SIGN UP <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </div>
            </div>
            
            <div className="flex justify-center lg:justify-end">
              <div className="relative">
                <div className="absolute -inset-4 bg-accent/20 rounded-full blur-3xl"></div>
                <img
                  src={jamesPhoto}
                  alt="James Bugden - Career Coach"
                  className="relative w-72 h-72 md:w-80 md:h-80 rounded-full object-cover border-4 border-card shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-card">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Hi, I'm James
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-8">
            I've helped 500+ professionals negotiate <strong className="text-foreground">$12M+ in additional compensation</strong>. 
            I've been on both sides of the hiring table at Fortune 500 companies, and I know exactly what gets candidates 
            rejected—and what makes them irresistible. My clients land roles at Google, Amazon, Meta, Goldman Sachs, McKinsey, 
            and every major tech company you can think of. I don't teach theory. I teach what actually works.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
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
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              How I Help You Win
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Three ways to 10x your career trajectory. Pick your path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Resume */}
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
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
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-shadow relative">
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
            <div className="bg-card border border-border rounded-xl p-8 hover:shadow-xl transition-shadow">
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
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
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
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
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
