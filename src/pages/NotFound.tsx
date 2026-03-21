import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, BookOpen, Calculator, Briefcase, HelpCircle, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const quickLinks = [
  {
    to: "/",
    icon: Home,
    title: "Homepage",
    description: "Start here — learn about coaching services",
  },
  {
    to: "/guides",
    icon: BookOpen,
    title: "Free Guides",
    description: "Resume, LinkedIn, interview & career change guides",
  },
  {
    to: "/offer-calculator",
    icon: Calculator,
    title: "Offer Calculator",
    description: "Compare compensation packages side-by-side",
  },
  {
    to: "/dashboard",
    icon: Briefcase,
    title: "Career Dashboard",
    description: "All your tools, guides & negotiation templates in one place",
  },
  {
    to: "/quiz",
    icon: HelpCircle,
    title: "Career Quiz",
    description: "Find out where you stand in your job search",
  },
];

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Decorative top bar */}
      <div className="h-1 bg-gradient-to-r from-gold/60 via-gold to-gold/60" />

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-16 sm:py-24">
        {/* 404 heading */}
        <h1
          className="font-heading text-7xl sm:text-9xl font-bold text-gold tracking-tight"
          style={{ lineHeight: 1 }}
        >
          404
        </h1>
        <h2 className="mt-4 font-heading text-xl sm:text-2xl font-semibold text-foreground text-center">
          This page doesn't exist
        </h2>
        <p className="mt-2 text-sm text-muted-foreground text-center max-w-md">
          The URL may be incorrect or this page may have moved. Try one of the links below to get back on track.
        </p>

        {/* Quick-link grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full max-w-3xl">
          {quickLinks.map(({ to, icon: Icon, title, description }) => (
            <Link
              key={to}
              to={to}
              className="group rounded-xl border border-border bg-card p-5 transition-all duration-300 hover:shadow-lg hover:-translate-y-0.5 hover:border-gold/40"
            >
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-lg bg-gold/10 p-2 text-gold group-hover:bg-gold/20 transition-colors">
                  <Icon className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold text-foreground text-sm">{title}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-relaxed">{description}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Primary CTA */}
        <Button asChild className="mt-10 h-11 px-6 gap-2 font-semibold">
          <Link to="/">
            Return to Homepage
            <ArrowRight className="h-4 w-4" />
          </Link>
        </Button>

        {/* Site directory link */}
        <Link
          to="/site-directory"
          className="mt-4 text-xs text-muted-foreground hover:text-foreground underline transition-colors"
        >
          View full site directory
        </Link>
      </main>
    </div>
  );
};

export default NotFound;
