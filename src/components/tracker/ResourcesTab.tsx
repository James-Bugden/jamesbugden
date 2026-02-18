import { useState } from "react";
import { ChevronDown, ExternalLink, BookOpen } from "lucide-react";

/* ── Expandable Card ─────────────────────────────────── */
function ResourceCard({ emoji, title, summary, children, defaultOpen = false }: {
  emoji: string; title: string; summary: string; children: React.ReactNode; defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden transition-shadow hover:shadow-md" style={{ borderColor: "#E5E0D8" }}>
      <button onClick={() => setOpen(!open)} className="w-full text-left px-5 py-4 flex items-start gap-3">
        <span className="text-xl flex-shrink-0 mt-0.5">{emoji}</span>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-bold" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>{title}</h3>
          <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "#888" }}>{summary}</p>
        </div>
        <ChevronDown className="w-4 h-4 mt-1 flex-shrink-0 transition-transform duration-200" style={{ color: "#9CA3AF", transform: open ? "rotate(180deg)" : undefined }} />
      </button>
      {open && <div className="px-5 pb-5 pt-0 text-sm leading-relaxed" style={{ color: "#2C2C2C" }}>{children}</div>}
    </div>
  );
}

/* ── Stepper item ────────────────────────────────────── */
function Step({ day, text, highlight }: { day: string; text: string; highlight?: boolean }) {
  return (
    <div className="flex gap-3">
      <div className="flex flex-col items-center">
        <div className="w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ backgroundColor: highlight ? "#C9A961" : "#1B3A2F" }}>{day}</div>
        <div className="w-px flex-1 bg-[#E5E0D8]" />
      </div>
      <p className="text-xs pb-4 pt-1" style={{ color: "#2C2C2C" }}>{text}</p>
    </div>
  );
}

/* ── Mini status card ────────────────────────────────── */
function StatusMini({ emoji, label, color, bg, text }: { emoji: string; label: string; color: string; bg: string; text: string }) {
  return (
    <div className="flex-1 rounded-lg p-3 text-center" style={{ backgroundColor: bg }}>
      <p className="text-lg mb-1">{emoji}</p>
      <p className="text-xs font-bold mb-1" style={{ color }}>{label}</p>
      <p className="text-[11px] leading-snug" style={{ color: "#2C2C2C" }}>{text}</p>
    </div>
  );
}

/* ══════════════════════════════════════════════════════════
   Resources Tab
   ══════════════════════════════════════════════════════════ */
export default function ResourcesTab() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 1 — LAMP Method */}
        <ResourceCard emoji="🎯" title="The LAMP Method" summary="Build and prioritize a list of 40+ target employers in 40 minutes.">
          <ul className="space-y-2.5 text-xs">
            <li><strong style={{ color: "#C9A961" }}>L = List</strong> — Generate 40+ employers using 4 methods: Dream Employers, Alumni Employers, Posting Search, Trend Following. Aim for 10 per method.</li>
            <li><strong style={{ color: "#C9A961" }}>A = Alumni</strong> — Mark Y or N: do you have a potential contact at this company?</li>
            <li><strong style={{ color: "#C9A961" }}>M = Motivation</strong> — Rate 1–5 based on your genuine interest. 5 = dream employer.</li>
            <li><strong style={{ color: "#C9A961" }}>P = Posting</strong> — Rate 1–3 based on current job postings. 3 = relevant posting exists.</li>
          </ul>
          <p className="text-xs mt-3 p-2.5 rounded-md" style={{ backgroundColor: "#FBF7F0", color: "#1B3A2F" }}>
            <strong>Sort order:</strong> Motivation (highest first) → Posting (highest first) → Alumni (Y before N). This gives you your priority attack order.
          </p>
        </ResourceCard>

        {/* 2 — 3B7 Routine */}
        <ResourceCard emoji="⏰" title="The 3B7 Routine" summary="Your follow-up system: check at 3 days, follow up at 7 days.">
          <div className="space-y-0">
            <Step day="0" text="Send 5-Point Email to Contact #1" highlight />
            <Step day="3" text="No response? → Reach out to Contact #2 at the same company" />
            <Step day="7" text="Still nothing from #1? → Follow up (email if #2 responded, phone call if neither did)" />
            <Step day="10" text="No response to follow-up? → Contact is likely a Curmudgeon. Move to Contact #3." />
          </div>
          <p className="text-xs mt-2 p-2.5 rounded-md font-medium" style={{ backgroundColor: "#DCFCE7", color: "#166534" }}>
            Key rule: Respond to Boosters within 24 hours!
          </p>
        </ResourceCard>

        {/* 3 — Boosters, Obligates & Curmudgeons */}
        <ResourceCard emoji="🟢" title="Boosters, Obligates & Curmudgeons" summary="Not everyone will help you. That's okay — learn to spot who will.">
          <div className="flex flex-col sm:flex-row gap-2">
            <StatusMini emoji="🟢" label="Boosters" color="#166534" bg="#DCFCE7" text="Respond within 3 days. Love their job, love helping. These are your golden contacts. Give them all your energy." />
            <StatusMini emoji="🟠" label="Obligates" color="#9A3412" bg="#FED7AA" text="Slow to respond. Help from guilt, not interest. Low return on your time. Don't chase them." />
            <StatusMini emoji="🔴" label="Curmudgeons" color="#991B1B" bg="#FEE2E2" text="Never respond. Nothing personal. Move on without looking back." />
          </div>
        </ResourceCard>

        {/* 4 — 5-Point Email */}
        <ResourceCard emoji="✉️" title="The 5-Point Email" summary="The perfect outreach email follows 5 rules.">
          <ol className="space-y-2 text-xs list-none">
            {[
              ["Under 100 words", "Shorter emails get more responses"],
              ["No mention of jobs", "They already know why you're writing"],
              ["Connection first", "Lead with why they should care about you (school, mutual contact, their article)"],
              ["Generalize your interest", '"Tech companies in Taiwan" not "the PM role on your team"'],
              ["You control follow-up", 'End with "I\'ll follow up next week" so you don\'t wait passively'],
            ].map(([title, desc], i) => (
              <li key={i} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold text-white flex-shrink-0" style={{ backgroundColor: "#C9A961" }}>{i + 1}</span>
                <span><strong>{title}</strong> — {desc}</span>
              </li>
            ))}
          </ol>
        </ResourceCard>

        {/* 5 — TIARA Framework */}
        <ResourceCard emoji="🎤" title="TIARA Framework" summary="5 question types that make informational interviews actually useful.">
          <ul className="space-y-2 text-xs">
            {[
              ["T — Trends", '"What trends are you seeing in [industry]?"'],
              ["I — Insights", '"What surprises you most about working at [Company]?"'],
              ["A — Advice", '"What advice would you give someone trying to break into [field]?"'],
              ["R — Resources", '"Are there other people or resources you\'d recommend I look into?"'],
              ["A — Assignments", '"Is there anything I can do to help you or stay on your radar?"'],
            ].map(([label, q]) => (
              <li key={label} className="flex gap-2">
                <strong className="flex-shrink-0" style={{ color: "#C9A961" }}>{label}</strong>
                <span className="italic" style={{ color: "#555" }}>{q}</span>
              </li>
            ))}
          </ul>
        </ResourceCard>

        {/* 6 — Contact Source Hierarchy */}
        <ResourceCard emoji="🔍" title="Contact Source Hierarchy" summary="Where to find contacts, in order of effectiveness.">
          <ol className="space-y-1.5 text-xs list-none">
            {[
              "University alumni database (fastest, warmest)",
              "LinkedIn — 1st-degree connections",
              "LinkedIn — 2nd-degree (ask for intro)",
              "LinkedIn Groups (shared interest = built-in connection)",
              "Facebook status update (strength of weak ties)",
              'Fan Mail — Google: [company] [keyword] "interview with"',
              "LinkedIn backsolving (find name → guess email)",
              "Cold calls (last resort, but effective at small companies)",
            ].map((item, i) => (
              <li key={i} className="flex gap-2.5">
                <span className="w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold flex-shrink-0" style={{ backgroundColor: i < 3 ? "#DCFCE7" : "#F3F4F6", color: i < 3 ? "#166534" : "#6B7280" }}>{i + 1}</span>
                <span>{item}</span>
              </li>
            ))}
          </ol>
        </ResourceCard>

        {/* 7 — Your Other Tools */}
        <ResourceCard emoji="🛠️" title="Your Other Tools" summary="Free tools to help at every stage of your job search.">
          <div className="space-y-2">
            {[
              { name: "JD Decoder", desc: "Paste a job description to decode what it really means, extract keywords, and check if you're a match.", href: "/#jd-decoder" },
              { name: "Resume Analyzer", desc: "Get instant analysis of your resume based on recruiter-tested criteria.", href: "/#resume-analyzer" },
            ].map((tool) => (
              <div key={tool.name} className="rounded-md border p-3" style={{ borderColor: "#E5E0D8" }}>
                <p className="text-xs font-bold mb-1" style={{ color: "#1B3A2F" }}>{tool.name}</p>
                <p className="text-[11px] mb-2" style={{ color: "#888" }}>{tool.desc}</p>
                <a href={tool.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-[11px] font-semibold hover:underline" style={{ color: "#C9A961" }}>
                  Open {tool.name} → <ExternalLink className="w-3 h-3" />
                </a>
              </div>
            ))}
          </div>
        </ResourceCard>

        {/* 8 — Get the Book (not collapsible) */}
        <div className="bg-white rounded-lg shadow-sm border-l-4 border overflow-hidden" style={{ borderColor: "#E5E0D8", borderLeftColor: "#C9A961" }}>
          <div className="px-5 py-4 flex items-start gap-3">
            <BookOpen className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: "#C9A961" }} />
            <div>
              <h3 className="text-sm font-bold mb-1" style={{ fontFamily: "var(--font-heading)", color: "#1B3A2F" }}>📖 Get the Book</h3>
              <p className="text-xs leading-relaxed mb-3" style={{ color: "#2C2C2C" }}>
                This tracker is based on <em>The 2-Hour Job Search</em> by Steve Dalton. The book covers the full methodology — this tool is a digital companion, not a replacement.
              </p>
              <a
                href="https://www.amazon.com/2-Hour-Job-Search-Technology-Faster/dp/1607741709"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-md text-xs font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
                style={{ backgroundColor: "#C9A961" }}
              >
                Buy on Amazon → <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ── Coaching CTA ───────────────────────────────── */}
      <div className="rounded-lg p-6 mt-2" style={{ backgroundColor: "#1B3A2F" }}>
        <p className="text-sm font-semibold text-white mb-1">🇹🇼 Targeting foreign companies in Taiwan?</p>
        <p className="text-xs leading-relaxed mb-4" style={{ color: "rgba(255,255,255,0.75)" }}>
          James is a Senior Recruiter at Uber Taiwan who has helped hundreds of professionals land jobs at Google, Meta, Amazon & more.
        </p>
        <a
          href="https://james.careers/#coaching"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 rounded-md text-sm font-semibold text-white transition-all duration-200 hover:scale-[1.02]"
          style={{ backgroundColor: "#C9A961" }}
        >
          Explore Coaching Services → <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
