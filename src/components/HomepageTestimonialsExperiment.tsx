import { useState } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import sunnyPhoto from "@/assets/testimonials/sunny-thumb.webp";
import monicaPhoto from "@/assets/testimonials/monica-thumb.webp";
import juliePhoto from "@/assets/testimonials/julie-thumb.webp";
import cynthiaPhoto from "@/assets/testimonials/cynthia-thumb.webp";
import pinweiPhoto from "@/assets/testimonials/pinwei-thumb.webp";
import airuPhoto from "@/assets/testimonials/airu.png";
import omarPhoto from "@/assets/testimonials/omar-li.jpg";

/* ── Data ── */
const featured = {
  hook: "Having a professional recruiter do a deep-dive review is on a whole different level.",
  boldSentence: "Having a professional recruiter do a deep-dive review is on a whole different level.",
  full: "This is awesome! These days, everyone is using AI to polish their resumes, but having a professional recruiter do a deep-dive review is on a whole different level. It felt more like a high-density career session than just a resume check. You helped me spot those 'hidden' wins that I would've never noticed on my own.",
  name: "Pin-Wei Wu",
  photo: pinweiPhoto,
  source: "via Coaching Session",
};

const scrollCards = [
  {
    hook: "For the first time, I clearly understood what HR truly focuses on when evaluating candidates.",
    boldSentence: "I clearly understood for the first time what HR truly focuses on when evaluating candidates.",
    full: "What I liked most was being able to think about negotiation from the perspectives of different roles in the recruiting process. Approaching it from the HR perspective, I clearly understood for the first time what HR truly focuses on when evaluating candidates. It also clarified many salary-related questions — like what's okay to ask and how to respond appropriately. It was really helpful for my interview preparation and gave me a much clearer sense of direction.",
    name: "Airu",
    photo: airuPhoto,
    source: "via Coaching Session",
  },
  {
    hook: "His advice was clear, practical, and tailored to my specific situation.",
    boldSentence: "His advice was clear, practical, and tailored to my specific situation.",
    full: "I had an excellent experience talking with James on salary negotiation. His advice was clear, practical, and tailored to my specific situation. He not only helped me understand my market value better, but also gave me the confidence and strategies to communicate professionally during negotiations. Throughout the process, he was supportive, insightful, and genuinely invested in my success. I highly recommend his services to anyone looking to grow their career and approach salary discussions with clarity and confidence.",
    name: "Omar Li",
    photo: omarPhoto,
    source: "via LinkedIn",
  },
  {
    hook: "I'm really grateful to have understood what each stakeholder values beforehand. It made a huge difference.",
    boldSentence: "It made a huge difference.",
    full: "Thanks for the advice on salary negotiation. I'm really grateful to have understood what each stakeholder values beforehand. It made a huge difference.",
    name: "Reese",
    photo: undefined as string | undefined,
    source: "via Coaching Session",
  },
  {
    hook: "I was truly impressed by how insightful and sharp James's advice was, especially within such a short coaching session.",
    boldSentence: "I was truly impressed by how insightful and sharp James's advice was.",
    full: "I was truly impressed by how insightful and sharp James's advice was, especially within such a short coaching session. Even though the industry I work in is not U.S.-based, he was still able to provide thoughtful, objective, and well-balanced feedback. I really appreciate his perspective.",
    name: "Patty Kuo",
    photo: undefined as string | undefined,
    source: "via Coaching Session",
  },
  {
    hook: "This is advice that even my HR friends and headhunter friends couldn't give me.",
    boldSentence: "This is advice that even my HR friends and headhunter friends couldn't give me.",
    full: "Thank you James for the thorough resume review. I was truly surprised when I received the feedback — how could someone be this meticulous! I felt like I gained so much. This is advice that even my HR friends and headhunter friends couldn't give me. Highly recommended — James is incredibly dedicated and professional.",
    name: "Sunny",
    photo: sunnyPhoto,
    source: "via LinkedIn",
  },
  {
    hook: "I now have a much clearer direction and confidence in how to write a resume with real content and strategy.",
    boldSentence: "I now have a much clearer direction and confidence in how to write a resume with real content and strategy.",
    full: "After comparing my original resume with the revised version, it looked significantly more professional. The feedback for every section was very specific — tailored to my years of experience and background, with logical and actionable suggestions. This also gave me a reusable framework and way of thinking that I can adapt for different companies and roles in the future, greatly improving my efficiency and precision. I now have a much clearer direction and confidence in how to write a resume with real content and strategy.",
    name: "Monica",
    photo: monicaPhoto,
    source: "via LinkedIn",
  },
  {
    hook: "James's feedback is direct and hits the nail on the head every time.",
    boldSentence: "James's feedback is direct and hits the nail on the head every time.",
    full: "James's feedback is direct and hits the nail on the head every time. Afterwards, I used his comments together with AI tools to have ongoing conversations, and ultimately made the bold decision to remove less relevant education and a short internship. I'll continue to improve and train my writing skills. Thank you for taking the time to review my resume.",
    name: "Julie Huang",
    photo: juliePhoto,
    source: "via LinkedIn",
  },
  {
    hook: "You helped me identify several important blind spots, especially around ATS optimisation.",
    boldSentence: "You helped me identify several important blind spots.",
    full: "Thank you for the detailed and insightful CV review. You helped me identify several important blind spots that I wasn't aware of, especially around ATS optimisation, impact-driven writing, and role alignment. Your guidance on improving the header format, strengthening the first 15 words, and presenting a clear professional title was extremely helpful. Overall, your review was concise, professional, and full of actionable recommendations. It's exactly the type of structured feedback I needed.",
    name: "Cynthia Chiang",
    photo: cynthiaPhoto,
    source: "via LinkedIn",
  },
  {
    hook: "Even after refining my resume over ten times, I still gained so many valuable insights from James's review!",
    boldSentence: "Even after refining my resume over ten times, I still gained so many valuable insights from James's review!",
    full: "James's resume review is incredibly practical. He carefully addresses every detail with specific feedback and revision suggestions, and shares what HR values from a talent acquisition perspective. He doesn't just tell you what the problems are (What) — he shows you how to fix them (How) and why (Why). Even after refining my resume over ten times, I still gained so many valuable insights from James's review!",
    name: "David",
    photo: undefined as string | undefined,
    source: "via Coaching Session",
  },
  {
    hook: "If he offered an advanced service like interview coaching, I'd definitely be interested.",
    boldSentence: "If he offered an advanced service, like interview coaching, I'd definitely be interested.",
    full: "I think this resume review was super professional. James used his expertise to give me a clear, structured breakdown of where I could improve, along with examples for how to revise my content. If he offered an advanced service, like interview coaching, I'd definitely be interested. If you're aiming for an overseas opportunity, he's someone who can really help.",
    name: "Sam Lee",
    photo: undefined as string | undefined,
    source: "via LinkedIn",
  },
];

const remainingTestimonials = [
  {
    hook: "James truly puts his heart into customising his advice for each person's situation and target roles!",
    boldSentence: "James truly puts his heart into customising his advice for each person's situation and target roles!",
    full: "He clearly identified the areas I should improve based on my background and current situation. The item-by-item review made it easy to pinpoint problems and make improvements. James truly puts his heart into customising his advice for each person's situation and target roles!",
    name: "Roger Lee",
    photo: undefined as string | undefined,
    source: "via Coaching Session",
  },
  {
    hook: "Your review helped me discover my own strengths and where I can keep improving!",
    boldSentence: "Your review helped me discover my own strengths and where I can keep improving!",
    full: "Although this resume review came a bit late, I think it helped a lot! Sometimes we have blind spots, and your review really helped me discover my own strengths and where I can keep improving on my resume!",
    name: "Charlene Lee",
    photo: undefined as string | undefined,
    source: "via LinkedIn",
  },
  {
    hook: "Learning to read between the lines during interviews to strengthen your negotiation leverage is incredibly comprehensive and practical knowledge.",
    boldSentence: "Learning to read between the lines during interviews to strengthen your negotiation leverage is incredibly comprehensive and practical knowledge.",
    full: "Huge thanks to James for the help! Through this consultation, I realized that salary negotiation actually starts from the very first interaction with the recruiter. You need to understand the dynamics between yourself, the recruiter, and the hiring manager, and learn to pick up on subtle cues during interviews to strengthen your negotiation position. This is incredibly comprehensive and practical knowledge.",
    name: "Sean Wang",
    photo: undefined as string | undefined,
    source: "via Coaching Session",
  },
];

/* ── Helpers ── */

/** Renders text with the boldSentence bolded inline */
function HighlightedText({ text, boldSentence }: { text: string; boldSentence: string }) {
  const idx = text.indexOf(boldSentence);
  if (idx === -1) return <>{text}</>;
  return (
    <>
      {text.slice(0, idx)}
      <strong className="font-bold">{boldSentence}</strong>
      {text.slice(idx + boldSentence.length)}
    </>
  );
}

/* ── Components ── */

function FeaturedCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-2xl border border-border p-6 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]" style={{ backgroundColor: '#FDFBF7' }}>
      <Quote className="w-8 h-8 mb-4" style={{ color: '#D4930D', opacity: 0.5 }} />
      <blockquote className="font-heading text-xl md:text-2xl leading-relaxed mb-4" style={{ color: '#1A1A1A' }}>
        "<HighlightedText text={featured.hook} boldSentence={featured.boldSentence} />"
      </blockquote>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-sm md:text-base leading-relaxed border-t border-border pt-4" style={{ color: '#6B6B6B' }}>
          <HighlightedText text={featured.full} boldSentence={featured.boldSentence} />
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <img src={featured.photo} alt={featured.name} width={48} height={48} className="w-12 h-12 rounded-full object-cover" style={{ border: '2px solid #D4930D' }} />
          <div>
            <p className="font-semibold" style={{ color: '#1A1A1A' }}>{featured.name}</p>
            <p style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>{featured.source}</p>
          </div>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 transition-colors text-sm font-medium"
          style={{ color: '#2D3A2E' }}
        >
          {expanded ? "Less" : "More"}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}

type TestimonialItem = { hook: string; boldSentence: string; full: string; name: string; photo?: string; source: string };

function TestimonialCard({ item }: { item: TestimonialItem }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="rounded-xl border border-border p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200" style={{ backgroundColor: '#FDFBF7', borderLeft: '4px solid #D4930D' }}>
      {item.photo && (
        <img src={item.photo} alt={item.name} loading="lazy" width={40} height={40} className="w-10 h-10 rounded-full object-cover mb-3" style={{ border: '2px solid #D4930D' }} />
      )}
      <p className="text-sm leading-relaxed mb-2" style={{ color: '#1A1A1A', fontSize: '0.9375rem' }}>
        "<HighlightedText text={item.hook} boldSentence={item.boldSentence} />"
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-xs leading-relaxed border-t border-border pt-3" style={{ color: '#6B6B6B' }}>
          <HighlightedText text={item.full} boldSentence={item.boldSentence} />
        </p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <div>
          <p className="font-semibold text-sm" style={{ color: '#1A1A1A' }}>{item.name}</p>
          <p style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>{item.source}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 transition-colors text-xs font-medium"
          style={{ color: '#2D3A2E' }}
        >
          {expanded ? "Less" : "More"}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>
    </div>
  );
}

export default function HomepageTestimonialsExperiment() {
  const [showAll, setShowAll] = useState(false);

  return (
    <section
      id="testimonials"
      className="py-14 md:py-20 px-5 md:px-6 border-y border-border"
      style={{ backgroundColor: '#FFFFFF' }}
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-center mb-12" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)' }}>
          750+ Professionals Landed Their Dream Offers
        </h2>

        <FeaturedCard />

        {/* All testimonial cards — stacked on mobile, grid on desktop */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          {scrollCards.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium transition-colors"
            style={{ color: '#2D3A2E' }}
          >
            {showAll ? "Hide Testimonials" : "See All Testimonials"}
            {showAll ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 transition-all duration-500 ease-in-out overflow-hidden ${
            showAll ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {remainingTestimonials.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}
