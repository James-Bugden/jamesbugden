import { useAuth } from "@/contexts/AuthContext";
import { Navigate, Link } from "react-router-dom";
import LanguageToggle from "@/components/LanguageToggle";
import { ArrowRight } from "lucide-react";
import PageSEO from "@/components/PageSEO";

const tools = [
  {
    emoji: "📄",
    title: "Resume Analyzer",
    description: "Upload your resume. Get a recruiter-level score and specific fixes in 60 seconds.",
    path: "/resume-analyzer",
  },
  {
    emoji: "💰",
    title: "Offer Calculator",
    description: "See how much more you'd earn over 30 years by negotiating strategically.",
    path: "/offer-calculator",
  },
  {
    emoji: "⚖️",
    title: "Offer Calculator Compare",
    description: "Compare two offers side by side — base, bonus, stock, benefits — and see the real difference.",
    path: "/offer-calculator/compare",
  },
  {
    emoji: "📝",
    title: "Resume Builder",
    description: "Build a recruiter-approved resume from scratch using proven templates.",
    path: "/resume",
  },
  {
    emoji: "📋",
    title: "Job Tracker",
    description: "Track every application, interview, and follow-up in one place. Stop losing opportunities.",
    path: "/jobs",
  },
];

export default function Dashboard() {
  const { user, isLoggedIn, isLoading, signOut } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!isLoggedIn) return <Navigate to="/login" replace />;

  const firstName =
    user?.user_metadata?.full_name?.split(" ")[0] ||
    user?.email?.split("@")[0] ||
    "there";

  return (
    <>
      <PageSEO title="Dashboard — James Bugden" description="Your career tools dashboard." path="/dashboard" />

      {/* Nav */}
      <nav className="bg-executive text-cream-light sticky top-0 z-50">
        <div className="max-w-[1200px] mx-auto flex items-center justify-between px-4 md:px-8 h-14">
          <Link to="/" className="font-heading text-lg tracking-wide text-white">
            JAMES BUGDEN
          </Link>
          <div className="flex items-center gap-4 text-sm">
            <span className="hidden sm:inline text-white/80">Hey {firstName}</span>
            <button onClick={signOut} className="text-white/70 hover:text-white transition-colors">
              Sign out
            </button>
            <LanguageToggle />
          </div>
        </div>
      </nav>

      {/* Welcome Banner */}
      <section className="bg-executive">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h1 className="font-heading text-2xl md:text-3xl text-white">
            Welcome back, {firstName}.
          </h1>
          <div className="bg-white/10 rounded-lg px-4 py-3 max-w-lg">
            <p className="text-white/90 text-sm leading-relaxed">
              <span className="mr-1.5">🆕</span>
              <span className="font-semibold text-white">New: Salary Starter Kit</span> — Everything you need to negotiate your next offer. Scripts, templates, and the exact numbers.{" "}
              <Link to="/salary-starter-kit" className="text-gold font-semibold hover:underline inline-flex items-center gap-0.5">
                Check it out <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="bg-background min-h-[60vh]">
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 py-8 md:py-12">
          {/* Section Header */}
          <h2 className="font-heading text-2xl md:text-3xl text-foreground mb-2">Your Tools</h2>
          <p className="text-muted-foreground text-sm md:text-base mb-8">
            Interactive tools built with real recruiting data. Use them as many times as you need.
          </p>

          {/* Tool Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {tools.map((tool) => (
              <Link
                key={tool.path}
                to={tool.path}
                className="group bg-card rounded-xl shadow-[0_2px_8px_rgba(0,0,0,0.08)] border-l-[3px] border-l-gold p-6 min-h-[180px] flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:shadow-premium"
              >
                <div>
                  <span className="text-2xl mb-3 block">{tool.emoji}</span>
                  <h3 className="text-lg font-bold text-foreground mb-1">{tool.title}</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{tool.description}</p>
                </div>
                <div className="flex justify-end mt-4">
                  <span className="inline-flex items-center gap-1 text-sm font-semibold text-gold group-hover:text-gold-dark transition-colors">
                    Launch <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </main>
    </>
  );
}
