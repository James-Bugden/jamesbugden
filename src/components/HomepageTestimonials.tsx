import { useState } from "react";
import { ChevronDown } from "lucide-react";
import pinweiPhoto from "@/assets/testimonials/pinwei-thumb.webp";
import cynthiaPhoto from "@/assets/testimonials/cynthia-thumb.webp";
import airuPhoto from "@/assets/testimonials/airu.png";
import royPhoto from "@/assets/testimonials/roy.jpeg";
import monicaPhoto from "@/assets/testimonials/monica-thumb.webp";
import janellePhoto from "@/assets/testimonials/janelle.jpg";
import annePhoto from "@/assets/testimonials/anne.jpeg";
import silviaPhoto from "@/assets/testimonials/silvia.jpg";
import sunnyPhoto from "@/assets/testimonials/sunny-thumb.webp";
import omarPhoto from "@/assets/testimonials/omar-li.jpg";
import juliePhoto from "@/assets/testimonials/julie-thumb.webp";
import peterPhoto from "@/assets/testimonials/peter.jpg";
import kikiPhoto from "@/assets/testimonials/kiki.png";
import rockPhoto from "@/assets/testimonials/rock.png";

type Testimonial = {
  headline: string;
  name: string;
  titleSource: string;
  photo: string;
  quote: string;
  bold: string;
};

const tier1: Testimonial[] = [
  {
    headline: "\"It felt like a full career strategy session.\"",
    name: "Pin-Wei Wu",
    titleSource: "Career Changer · via Resume Review",
    photo: pinweiPhoto,
    quote: "Everyone is using AI to polish their resumes, but having a professional recruiter do a deep-dive review is on a whole different level. It felt more like a high-density career session than just a resume check. You helped me spot those 'hidden' wins that I would've never noticed on my own. This gave me a lot more confidence for my next steps.",
    bold: "It felt more like a high-density career session than just a resume check.",
  },
  {
    headline: "\"Every fix was specific. Nothing generic.\"",
    name: "Cynthia Chiang",
    titleSource: "Professional · via Resume Review",
    photo: cynthiaPhoto,
    quote: "You helped me identify several important blind spots, especially around ATS optimization, impact-driven writing, and role alignment. Your guidance on improving the header format, strengthening the first 15 words, and presenting a clear professional title was extremely helpful. Your review was concise, professional, and full of actionable recommendations.",
    bold: "Full of actionable recommendations.",
  },
  {
    headline: "\"Finally understood how the hiring side thinks.\"",
    name: "Airu",
    titleSource: "Job Seeker · via Salary Coaching",
    photo: airuPhoto,
    quote: "My favorite part was learning to think about negotiation from different roles in the hiring process. This was the first time I clearly understood what HR really cares about when evaluating candidates. It helped me prepare for interviews and gave me a much clearer direction.",
    bold: "The first time I clearly understood what HR really cares about.",
  },
  {
    headline: "\"Not just a resume fix — a confidence boost.\"",
    name: "Roy Tsai",
    titleSource: "Career Switcher · via Resume Review",
    photo: royPhoto,
    quote: "The depth of this review far exceeded my expectations. James didn't just suggest edits. He gave me a strategic framework for positioning my background against target roles. He helped me realize my strongest achievements were buried in the wrong places. This wasn't just a resume fix. It was a confidence boost that helped me see my career value with completely fresh eyes.",
    bold: "This wasn't just a resume fix. It was a confidence boost.",
  },
  {
    headline: "\"I use the same framework for every application now.\"",
    name: "Monica",
    titleSource: "Professional · via Resume Review",
    photo: monicaPhoto,
    quote: "After seeing the before-and-after, the difference was remarkable. Everything felt so much more professional. The feedback for each section was incredibly specific, with suggestions tailored to my experience level. Now I can use the same framework to customize my resume for any role, which has dramatically improved my efficiency.",
    bold: "I can use the same framework to customize my resume for any role.",
  },
  {
    headline: "\"He found potential I didn't know was there.\"",
    name: "Janelle Cheng",
    titleSource: "Professional · via Resume Review",
    photo: janellePhoto,
    quote: "James is dedicated to the details and the potential hidden in my plain description. It's highly recommended to have a professional like James assess your CV from an expert perspective. I'm truly grateful for the experience.",
    bold: "Dedicated to the details and the potential hidden in my plain description.",
  },
  {
    headline: "\"I walked into my next negotiation prepared.\"",
    name: "Peter Cho",
    titleSource: "Professional · via Salary Coaching",
    photo: peterPhoto,
    quote: "James quickly zeroed in on my situation, helped me understand how HR thinks, and gave me practical solutions I could use right away. I feel much more prepared for my upcoming interviews and salary conversations.",
    bold: "Helped me understand how HR thinks.",
  },
];

const tier2: Testimonial[] = [
  {
    headline: "\"I stopped being scared of salary conversations.\"",
    name: "Anne Chen",
    titleSource: "Professional · via Salary Coaching",
    photo: annePhoto,
    quote: "This session completely changed how I see salary negotiation. I used to think it was awkward and confrontational, but James helped me understand it's actually professional career communication. He broke down how recruiters, headhunters, and hiring teams each think differently. So you know exactly how to position yourself with each one.",
    bold: "He broke down how recruiters, headhunters, and hiring teams each think differently.",
  },
  {
    headline: "\"I knew exactly what to fix first.\"",
    name: "Silvia Chen",
    titleSource: "Professional · via Resume Review",
    photo: silviaPhoto,
    quote: "The visual layout made the review report incredibly easy to read. Strengths and areas for improvement were clearly laid out and applicable across different positions. The prioritized improvement suggestions with optimized examples made it very easy to understand and act on immediately.",
    bold: "Prioritized improvement suggestions with optimized examples.",
  },
  {
    headline: "\"Advice my HR and headhunter friends couldn't give me.\"",
    name: "Sunny",
    titleSource: "Professional · via Resume Review",
    photo: sunnyPhoto,
    quote: "I was honestly shocked by how detailed the feedback was. This is the kind of advice that even my HR friends and headhunter connections couldn't give me. James is incredibly thorough and truly professional. I can't recommend him enough.",
    bold: "The kind of advice that even my HR friends and headhunter connections couldn't give me.",
  },
  {
    headline: "\"More clarity and confidence going into salary talks.\"",
    name: "Omar Li",
    titleSource: "Professional · via Salary Coaching",
    photo: omarPhoto,
    quote: "Throughout the entire process, James was supportive, deeply insightful, and genuinely invested in my success. I highly recommend his services to anyone looking to advance their career and approach salary discussions with more clarity and confidence.",
    bold: "Genuinely invested in my success.",
  },
];

const tier3: Testimonial[] = [
  {
    headline: "\"I paired his feedback with AI and the quality jumped.\"",
    name: "Julie Huang",
    titleSource: "Professional · via Resume Review",
    photo: juliePhoto,
    quote: "James was direct and hit every point that mattered. I took his feedback and paired it with AI tools to refine my resume further. It was like having a professional roadmap to follow. I've already seen a real difference in the quality of my applications.",
    bold: "Direct and hit every point that mattered.",
  },
  {
    headline: "\"In 30 minutes I realized I was underpaid.\"",
    name: "Kiki",
    titleSource: "Professional · via Salary Coaching",
    photo: kikiPhoto,
    quote: "In just 30 minutes, James helped me realize my salary actually has room to grow. I just needed more confidence in my own value. Knowing where I stand compared to others in my industry was an incredible starting point.",
    bold: "Helped me realize my salary actually has room to grow.",
  },
  {
    headline: "\"No generic advice. All about my situation.\"",
    name: "Rock Shih",
    titleSource: "Professional · via Salary Coaching",
    photo: rockPhoto,
    quote: "I expected a generic salary negotiation talk, but instead James gave me highly customized guidance based on my specific situation. I now feel much more equipped to communicate with employers and negotiate a better package.",
    bold: "Highly customized guidance based on my specific situation.",
  },
];

/* ── Helpers ── */
function BoldQuote({ text, bold }: { text: string; bold: string }) {
  const idx = text.indexOf(bold);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-bold">{bold}</strong>
      {text.slice(idx + bold.length)}
    </>
  );
}

/* ── Card ── */
function TestimonialCard({ item, featured = false }: { item: Testimonial; featured?: boolean }) {
  return (
    <div
      className={`rounded-xl ${featured ? "md:col-span-2" : ""}`}
      style={{
        backgroundColor: "#FFFFFF",
        borderLeft: "4px solid #D4930D",
        boxShadow: "0 2px 8px rgba(0,0,0,0.06)",
        padding: "24px",
      }}
    >
      {/* 1. Headline */}
      <p className="font-bold mb-3" style={{ color: "#1A1A1A", fontSize: featured ? "1.25rem" : "1.0625rem" }}>
        {item.headline}
      </p>

      {/* 2-3. Quote with bold sentence */}
      <p className="leading-relaxed mb-4" style={{ color: "#1A1A1A", fontSize: "1rem" }}>
        "<BoldQuote text={item.quote} bold={item.bold} />"
      </p>

      {/* 4. Photo + Name + Title/Source */}
      <div className="flex items-center gap-3">
        <img
          src={item.photo}
          alt={item.name}
          width={40}
          height={40}
          loading="lazy"
          className="w-10 h-10 rounded-full object-cover flex-shrink-0"
          style={{ border: "2px solid #D4930D" }}
        />
        <div>
          <p className="font-bold" style={{ color: "#1A1A1A", fontSize: "0.9375rem" }}>
            {item.name}
          </p>
          <p style={{ color: "#6B6B6B", fontSize: "0.8125rem" }}>{item.titleSource}</p>
        </div>
      </div>
    </div>
  );
}

/* ── Animated tier wrapper ── */
function TierReveal({ visible, children }: { visible: boolean; children: React.ReactNode }) {
  return (
    <div
      className="grid grid-cols-1 md:grid-cols-2 gap-4 transition-all duration-300 ease-out overflow-hidden"
      style={{
        maxHeight: visible ? "5000px" : "0",
        opacity: visible ? 1 : 0,
        marginTop: visible ? "16px" : "0",
      }}
    >
      {children}
    </div>
  );
}

/* ── Main ── */
export default function HomepageTestimonials() {
  const [revealLevel, setRevealLevel] = useState(0);

  const buttonText = revealLevel === 0 ? "Show More Reviews" : "Show Even More Reviews";
  const featured = tier1[0];
  const gridTier1 = tier1.slice(1);

  return (
    <section id="testimonials" className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-center mb-6" style={{ color: "#1A1A1A", fontSize: "clamp(2rem, 4vw, 2.625rem)" }}>
          Real feedback from real people.
        </h2>

        {/* Featured */}
        <TestimonialCard item={featured} featured />

        {/* Tier 1 grid */}
        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridTier1.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>

        {/* Tier 2 */}
        <TierReveal visible={revealLevel >= 1}>
          {tier2.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </TierReveal>

        {/* Tier 3 */}
        <TierReveal visible={revealLevel >= 2}>
          {tier3.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </TierReveal>

        {/* Show More */}
        {revealLevel < 2 && (
          <div className="mt-8 text-center">
            <button
              type="button"
              onClick={() => setRevealLevel((v) => v + 1)}
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 border"
              style={{ color: "#2b4734", borderColor: "#2b4734", backgroundColor: "transparent" }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#2b4734"; e.currentTarget.style.color = "#FFFFFF"; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; e.currentTarget.style.color = "#2b4734"; }}
            >
              {buttonText}
              <ChevronDown className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
