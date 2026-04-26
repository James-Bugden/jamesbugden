import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, Linkedin, Users } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { SEO } from "@/components/SEO";
import { syncToMailerLite } from "@/lib/mailerlite";

/* ─── types ─── */
type Screen = "intro" | "questions" | "email" | "results" | "results-minimal";

interface Question {
  dimension: string;
  label: string;
  text: string;
  options: { text: string; score: number }[];
}

/* ─── data ─── */
const questions: Question[] = [
  {
    dimension: "English Proficiency",
    label: "ENGLISH PROFICIENCY · Q1",
    text: "Your manager asks you to present a project update to the Asia-Pacific team in English next week. How do you feel?",
    options: [
      { text: "Confident — I've done this before", score: 10 },
      { text: "Slightly nervous but I'd manage", score: 7 },
      { text: "I'd need to script everything word-for-word", score: 4 },
      { text: "I'd try to get someone else to present", score: 1 },
    ],
  },
  {
    dimension: "Resume Readiness",
    label: "RESUME READINESS · Q2",
    text: "Which best describes your current resume?",
    options: [
      { text: "One page, achievement-focused with quantified results, English version ready", score: 10 },
      { text: "Decent but mostly lists job duties, no English version", score: 6 },
      { text: "Multi-page, responsibilities-focused, hasn't been updated in 6+ months", score: 3 },
      { text: "I don't have one ready", score: 1 },
    ],
  },
  {
    dimension: "Interview Preparation",
    label: "INTERVIEW PREPARATION · Q3",
    text: "A hiring manager asks: 'Tell me about a time you disagreed with a team decision.' Your reaction?",
    options: [
      { text: "I have a structured story ready with situation, action, and result", score: 10 },
      { text: "I could come up with something but it wouldn't be polished", score: 6 },
      { text: "I'd struggle — I've never prepared for this type of question", score: 3 },
      { text: "I've only done technical or traditional Q&A interviews", score: 1 },
    ],
  },
  {
    dimension: "Cultural Fit",
    label: "CULTURAL FIT · Q4",
    text: "When something is unclear at work, you typically...",
    options: [
      { text: "Ask directly, even if the person is senior", score: 10 },
      { text: "Wait a bit and try to figure it out, then ask if stuck", score: 7 },
      { text: "Ask a peer to ask on your behalf", score: 4 },
      { text: "Wait for clarification to come to you", score: 1 },
    ],
  },
  {
    dimension: "Compensation Knowledge",
    label: "COMPENSATION KNOWLEDGE · Q5",
    text: "Do you know how to evaluate a total compensation package — not just monthly salary?",
    options: [
      { text: "Yes — I can compare base, bonus, equity, benefits, and sign-on across offers", score: 10 },
      { text: "I look at monthly salary and maybe annual bonus", score: 6 },
      { text: "I mainly just compare monthly salary numbers", score: 3 },
      { text: "I accept what's offered without comparing", score: 1 },
    ],
  },
  {
    dimension: "Professional Presence",
    label: "PROFESSIONAL PRESENCE · Q6",
    text: "How active is your English-language LinkedIn presence?",
    options: [
      { text: "Optimized profile in English, I engage regularly and have connections at target companies", score: 10 },
      { text: "Profile exists in English but I'm mostly passive", score: 6 },
      { text: "Profile is mainly in Chinese, rarely used", score: 3 },
      { text: "I barely use LinkedIn", score: 1 },
    ],
  },
];

/* ─── feedback lookup ─── */
const feedback: Record<string, Record<number, string>> = {
  "English Proficiency": {
    10: "Your spoken English is strong. That puts you ahead of most candidates in Taiwan. One thing to work on: read your target company's blog or press releases in English. It helps you sound like someone who already works there.",
    7: "You get by in English, but presentations and panel interviews will feel harder. Here is a simple habit: record yourself giving a 3-minute work update in English once a week. Play it back. Most people improve fast once they hear themselves.",
    4: "Right now you are translating from Chinese in your head before you speak. That is normal, but it slows you down. Find a weekly English speaking group like Toastmasters Taipei. You need practice thinking in English, not reading it.",
    1: "English is your biggest gap right now. It is also the most fixable. Start with 30 minutes a day: one business English podcast, then say out loud what you heard. Try 'All Ears English' or 'Business English Pod.' Three months of this will change everything.",
  },
  "Resume Readiness": {
    10: "Your resume format is solid. The mistake most people make at your level: sending the same version to every company. Spend 15 minutes per application matching your bullet points to the words in the job description. This gets you past both ATS filters and recruiter skim reads.",
    6: "Your resume lists what you did. Foreign companies want to see what happened because of you. Take your top 5 job duties and rewrite each one like this: 'Did X, which led to Y, measured by Z.' Example: 'Led migration to microservices, cutting deploy time by 60% across 3 teams.' Numbers are the difference between a maybe and an interview.",
    3: "Foreign company resumes follow different rules than Taiwan-style CVs. Key changes: one page max, no photo, no personal details like age or marital status, English only. Every bullet point needs a number attached to it. This one change, fixing your resume format, is often the highest-ROI thing you do.",
    1: "Start simple. Open a blank document. Write down your 5 biggest work wins, things where you have a number to show (revenue, users, time saved, team size). These become your resume bullets. One page. 3-5 bullets per role. Numbers in every line. That is the format foreign company recruiters expect.",
  },
  "Interview Preparation": {
    10: "You know how behavioral interviews work. That puts you ahead of 80% of candidates in Taiwan. Go deeper now: look up your target company's interview questions on Glassdoor and Blind. Prepare stories for their specific questions, not generic ones.",
    6: "You get the idea, but unpolished answers lose to prepared ones every time. Write out 8-10 stories using the STAR format. Cover these themes: conflict, failure, leadership, working with unclear info, and cross-team work. Practice each one out loud until it takes under 2 minutes.",
    3: "Behavioral interviews ('tell me about a time when...') are the standard at every foreign company. They test how you think and talk, not what you know. Learn the STAR method: Situation, Task, Action, Result. Prepare 5 real stories from your work. Practice with a friend who will give honest feedback.",
    1: "Foreign company interviews are different from what you have done before. You will face questions like 'tell me about a time you failed' and 'how do you handle disagreements.' This is a skill you learn, not a talent you are born with. Search 'STAR method interview' on YouTube and practice answering out loud, not in your head.",
  },
  "Cultural Fit": {
    10: "Your direct style is what foreign companies want. In interviews, give examples of times you pushed back on a decision, flagged a problem early, or challenged an assumption. These stories show the ownership mindset that hiring managers look for.",
    7: "You have good instincts. The adjustment: in foreign companies, asking questions is not weakness. It is expected. Try this: ask one clarifying question in every meeting this week, even if you think you understand. Build the habit in low-stakes situations first.",
    4: "Going through a coworker to ask a senior person a question is normal in Taiwan. In foreign companies, it reads as indirect. Try this: next time you have a question for someone senior, message them yourself. Most foreign company managers prefer direct messages. It saves them time.",
    1: "This is the biggest culture shift for Taiwan professionals moving to foreign companies. Flat communication replaces hierarchy. Start by watching: follow 5-10 people at your target companies on LinkedIn. Notice how they write. Direct. Short. They state opinions. That is the style you are learning.",
  },
};

function getCompPresenceFeedback(avg: number): string {
  if (avg >= 8) return "You understand total comp and you are visible on LinkedIn. Strong combo. When you get an offer, ask for the full breakdown: base, bonus, equity vesting schedule, sign-on, benefits. Compare them side by side. Most first offers have 10-20% room to negotiate.";
  if (avg >= 5) return "You have some awareness but gaps that will cost you money. Two things to fix. First: learn how stock vesting works. A 4-year equity grant with a 1-year cliff means you get zero if you leave in month 11. Second: switch your LinkedIn to English, write a clear headline about what you do, and start commenting on posts from people at your target companies.";
  if (avg >= 3) return "You are leaving money on the table and recruiters do not know you exist. Foreign company packages include base, bonus, stock, sign-on, and benefits. Salary alone is often only 60% of total pay. And recruiters search LinkedIn every day for candidates. If your profile is in Chinese or blank, they will never find you. Fix both.";
  return "Two big gaps to close. First: total pay at foreign companies is 30-50% higher than the base salary number. If you compare monthly salary only, you will misjudge every offer. Second: LinkedIn is how foreign company recruiters find people in Taiwan. It is not optional. Make an English profile this week. Add a clear headline, your top 3 wins, and a professional photo.";
}

/* ─── bracket helpers ─── */
function getBracket(score: number) {
  if (score >= 50) return { label: "Strong Candidate", color: "hsl(var(--executive-green))", summary: "You're ready — focus on targeting the right companies and negotiating well." };
  if (score >= 35) return { label: "Almost There", color: "hsl(var(--gold))", summary: "You're close. A few targeted improvements will make a big difference." };
  if (score >= 20) return { label: "Building Foundation", color: "hsl(var(--gold-dark))", summary: "You have real potential. A structured plan will get you there in 2–3 months." };
  return { label: "Getting Started", color: "hsl(var(--destructive))", summary: "Everyone starts somewhere. Start with English and resume, then build from there." };
}

/* ─── component ─── */
export default function Quiz() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);
  const [animateRing, setAnimateRing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalScore = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const bracket = getBracket(totalScore);

  // radar chart data
  const compPresenceAvg = ((answers[4] ?? 0) + (answers[5] ?? 0)) / 2;
  const radarData = [
    { axis: "English", value: answers[0] ?? 0, fullMark: 10 },
    { axis: "Resume", value: answers[1] ?? 0, fullMark: 10 },
    { axis: "Interview", value: answers[2] ?? 0, fullMark: 10 },
    { axis: "Cultural Fit", value: answers[3] ?? 0, fullMark: 10 },
    { axis: "Comp & Presence", value: compPresenceAvg, fullMark: 10 },
  ];

  // dimension card data
  const dimensions = [
    { name: "English Proficiency", score: answers[0] ?? 0, fb: feedback["English Proficiency"][answers[0] ?? 1] },
    { name: "Resume Readiness", score: answers[1] ?? 0, fb: feedback["Resume Readiness"][answers[1] ?? 1] },
    { name: "Interview Preparation", score: answers[2] ?? 0, fb: feedback["Interview Preparation"][answers[2] ?? 1] },
    { name: "Cultural Fit", score: answers[3] ?? 0, fb: feedback["Cultural Fit"][answers[3] ?? 1] },
    { name: "Comp & Presence", score: compPresenceAvg, fb: getCompPresenceFeedback(compPresenceAvg) },
  ];

  const selectAnswer = useCallback(
    (score: number) => {
      const next = [...answers];
      next[currentQ] = score;
      setAnswers(next);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (currentQ < 5) {
          setCurrentQ((q) => q + 1);
        } else {
          setScreen("email");
        }
      }, 500);
    },
    [currentQ, answers]
  );

  const goBack = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentQ === 0) {
      setScreen("intro");
    } else {
      setCurrentQ((q) => q - 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("Please enter a valid email address.");
      return;
    }
    setEmailError("");
    syncToMailerLite(email.trim());
    setEmailSubmitted(true);
    setTimeout(() => setScreen("results"), 800);
  };

  useEffect(() => {
    if (screen === "results") {
      requestAnimationFrame(() => setAnimateRing(true));
    }
  }, [screen]);

  const quizUrl = "https://jamesbugden.lovable.app/quiz";
  const shareLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(quizUrl)}`, "_blank");
  const copyLink = () => {
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── screen renders ─── */

  const renderIntro = () => (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(var(--paper))" }}>
      {/* nav */}
      <nav className="px-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-lg font-bold tracking-wide" style={{ color: "hsl(var(--executive-green))" }}>
          hiresign
        </Link>
        <LanguageToggle variant="nav" />
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-16 text-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4" style={{ color: "hsl(var(--executive-green))", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
          Are You Ready for a<br />Foreign Company?
        </h1>
        <p className="text-base md:text-lg mb-10 max-w-md" style={{ color: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }}>
          Find out where you stand in 2 minutes. Get a personalized action plan.
        </p>

        {/* decorative radar outline */}
        <div className="w-56 h-56 md:w-64 md:h-64 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="60%" data={[
              { axis: "English", value: 0, fullMark: 10 },
              { axis: "Resume", value: 0, fullMark: 10 },
              { axis: "Interview", value: 0, fullMark: 10 },
              { axis: "Cultural Fit", value: 0, fullMark: 10 },
              { axis: "Comp & Presence", value: 0, fullMark: 10 },
            ]}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
              <Radar dataKey="value" stroke="hsl(var(--gold))" fill="transparent" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={() => { setScreen("questions"); setCurrentQ(0); }}
          className="h-12 px-8 rounded-lg text-base font-semibold transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--executive-green))" }}
        >
          Start the Assessment
        </button>
        <p className="text-xs mt-3" style={{ color: "hsl(var(--foreground))", opacity: 0.5 }}>
          Free · 6 questions · Takes 2 minutes
        </p>
        <div className="flex items-center gap-2 text-sm mt-5" style={{ color: "hsl(var(--foreground))", opacity: 0.6 }}>
          <Users className="w-4 h-4 flex-shrink-0" style={{ color: "hsl(var(--gold))" }} />
          <span>1,200+ professionals have taken this quiz</span>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / 6) * 100;
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(var(--paper))" }}>
        {/* top bar */}
        <div className="px-5 py-4 flex items-center gap-3">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors" aria-label="Back">
            <ArrowLeft className="w-5 h-5" style={{ color: "hsl(var(--executive-green))" }} />
          </button>
          <div className="flex-1">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "hsl(var(--border))" }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: "hsl(var(--gold))" }} />
            </div>
          </div>
          <span className="text-xs font-medium whitespace-nowrap" style={{ color: "hsl(var(--foreground))", opacity: 0.5 }}>
            Question {currentQ + 1} of 6
          </span>
        </div>

        <div className="flex-1 px-5 pb-10 max-w-lg mx-auto w-full">
          <p className="text-xs font-semibold uppercase tracking-wider mt-6 mb-3" style={{ color: "hsl(var(--foreground))", opacity: 0.4 }}>
            {q.label}
          </p>
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-8" style={{ color: "hsl(var(--executive-green))", lineHeight: 1.25 }}>
            {q.text}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt) => {
              const selected = answers[currentQ] === opt.score;
              const dimmed = answers[currentQ] !== null && !selected;
              return (
                <button
                  key={opt.score}
                  onClick={() => selectAnswer(opt.score)}
                  className="text-left rounded-lg p-4 pr-5 transition-all duration-200"
                  style={{
                    backgroundColor: selected ? "hsl(var(--paper))" : "hsl(var(--card))",
                    borderLeft: `3px solid ${selected ? "hsl(var(--gold))" : "hsl(var(--border))"}`,
                    opacity: dimmed ? 0.6 : 1,
                    transform: selected ? "scale(1.01)" : "scale(1)",
                    boxShadow: selected ? "0 2px 8px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-sm md:text-base" style={{ color: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderEmailGate = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ backgroundColor: "hsl(var(--paper))" }}>
      <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4" style={{ color: "hsl(var(--executive-green))" }}>
        Your results are ready!
      </h2>

      <p className="text-5xl font-bold font-heading mb-6" style={{ color: "hsl(var(--executive-green))" }}>
        {totalScore} <span className="text-2xl font-normal" style={{ opacity: 0.5 }}>/ 60</span>
      </p>

      {/* blurred radar preview */}
      <div className="w-56 h-56 mb-6" style={{ filter: "blur(8px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="60%" data={radarData}>
            <PolarGrid stroke="hsl(var(--border))" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "hsl(var(--foreground))" }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
            <Radar dataKey="value" stroke="hsl(var(--executive-green))" fill="hsl(var(--gold))" fillOpacity={0.25} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm md:text-base mb-6 max-w-sm" style={{ color: "hsl(var(--foreground))" }}>
        Enter your email to unlock your full breakdown and personalized action plan.
      </p>

      {emailSubmitted ? (
        <div className="flex items-center gap-2 text-base font-semibold" style={{ color: "hsl(var(--executive-green))" }}>
          <Check className="w-5 h-5" /> Thanks!
        </div>
      ) : (
        <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="you@email.com"
              aria-label="Email address"
              autoComplete="email"
              className="flex-1 h-12 px-4 rounded-lg border text-base"
              style={{ borderColor: emailError ? "hsl(var(--destructive))" : "hsl(var(--border))", backgroundColor: "hsl(var(--card))", color: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-lg font-semibold text-base transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--executive-green))" }}
            >
              See My Results
            </button>
          </div>
          {emailError && <p className="text-xs mt-2 text-left" style={{ color: "hsl(var(--destructive))" }}>{emailError}</p>}
        </form>
      )}

      <p className="text-xs mt-3 max-w-xs" style={{ color: "hsl(var(--foreground))", opacity: 0.45 }}>
        Plus weekly tips for breaking into foreign companies. Unsubscribe anytime.
      </p>

      <button
        onClick={() => setScreen("results-minimal")}
        className="text-xs underline mt-6 hover:opacity-80 transition-opacity"
        style={{ color: "hsl(var(--foreground))", opacity: 0.5 }}
      >
        Skip — show score only
      </button>
    </div>
  );

  const renderResultsMinimal = () => (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "hsl(var(--paper))" }}>
      {/* email banner */}
      <div className="px-4 py-3 flex flex-col sm:flex-row items-center gap-2 text-sm" style={{ backgroundColor: "hsl(var(--executive-green))", color: "hsl(var(--paper))" }}>
        <span className="flex-1">Enter your email to see your full breakdown →</span>
        <form
          onSubmit={(e) => { e.preventDefault(); handleEmailSubmit(e); }}
          className="flex gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@email.com"
            aria-label="Email address"
            autoComplete="email"
            className="h-8 px-3 rounded text-sm text-foreground"
            style={{ backgroundColor: "hsl(var(--card))", width: 180 }}
          />
          <button type="submit" className="h-8 px-4 rounded text-sm font-semibold" style={{ backgroundColor: "hsl(var(--gold))", color: "hsl(var(--executive-green))" }}>
            Unlock
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-6xl font-bold font-heading mb-3" style={{ color: "hsl(var(--executive-green))" }}>
          {totalScore} <span className="text-2xl font-normal" style={{ opacity: 0.5 }}>/ 60</span>
        </p>
        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-3" style={{ backgroundColor: bracket.color }}>
          {bracket.label}
        </span>
        <p className="text-sm max-w-sm" style={{ color: "hsl(var(--foreground))" }}>{bracket.summary}</p>
      </div>
    </div>
  );

  /* ─── SVG ring helpers ─── */
  const ringRadius = 68;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (totalScore / 60) * ringCircumference;

  const renderResults = () => (
    <div className="min-h-screen" style={{ backgroundColor: "hsl(var(--paper))" }}>
      {/* nav */}
      <nav className="px-5 py-4 flex items-center justify-between">
        <Link to="/" className="font-heading text-lg font-bold tracking-wide" style={{ color: "hsl(var(--executive-green))" }}>
          hiresign
        </Link>
        <LanguageToggle variant="nav" />
      </nav>

      <div className="px-5 pb-16 max-w-lg mx-auto">
        {/* Section 1 — Score Ring */}
        <div className="flex flex-col items-center text-center pt-6 pb-10">
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="hsl(var(--border))" strokeWidth="10" />
              <circle
                cx="80"
                cy="80"
                r={ringRadius}
                fill="none"
                stroke="hsl(var(--gold))"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={animateRing ? ringOffset : ringCircumference}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold" style={{ color: "hsl(var(--executive-green))" }}>
              {totalScore} <span className="text-lg font-normal" style={{ opacity: 0.5 }}>/ 60</span>
            </span>
          </div>
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-2" style={{ backgroundColor: bracket.color }}>
            {bracket.label}
          </span>
          <p className="text-sm max-w-sm" style={{ color: "hsl(var(--foreground))" }}>{bracket.summary}</p>
        </div>

        {/* Section 2 — Radar Chart */}
        <div className="w-full h-64 md:h-72 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="60%" data={radarData}>
              <PolarGrid stroke="hsl(var(--border))" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
              <Radar dataKey="value" stroke="hsl(var(--executive-green))" fill="hsl(var(--gold))" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Section 3 — Dimension Cards */}
        <div className="flex flex-col gap-4 mb-12">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="rounded-xl p-6"
              style={{ backgroundColor: "hsl(var(--card))", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: "hsl(var(--executive-green))" }}>{d.name}</span>
                <span className="text-sm font-bold" style={{ color: "hsl(var(--gold))" }}>
                  {typeof d.score === "number" ? (Number.isInteger(d.score) ? d.score : d.score.toFixed(1)) : d.score} / 10
                </span>
              </div>
              <div className="h-2 rounded-full mb-3" style={{ backgroundColor: "hsl(var(--border))" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.score / 10) * 100}%`, backgroundColor: "hsl(var(--gold))" }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "hsl(var(--foreground))", fontFamily: "'DM Sans', sans-serif" }}>
                {d.fb}
              </p>
            </div>
          ))}
        </div>


        {/* Section 4 — Share */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={shareLinkedIn}
            className="flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold border transition-transform hover:scale-[1.02]"
            style={{ borderColor: "hsl(var(--gold))", color: "hsl(var(--gold))", backgroundColor: "transparent" }}
          >
            <Linkedin className="w-4 h-4" /> Share on LinkedIn
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 h-10 px-5 rounded-lg text-sm transition-opacity hover:opacity-70"
            style={{ color: "hsl(var(--foreground))", opacity: 0.6 }}
          >
            <Copy className="w-4 h-4" /> {copied ? "Copied ✓" : "Copy link"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO />

      <div className="transition-opacity duration-300">
        {screen === "intro" && renderIntro()}
        {screen === "questions" && renderQuestions()}
        {screen === "email" && renderEmailGate()}
        {screen === "results" && renderResults()}
        {screen === "results-minimal" && renderResultsMinimal()}
      </div>
    </>
  );
}