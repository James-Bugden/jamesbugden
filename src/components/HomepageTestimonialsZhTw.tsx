import { useState, useRef } from "react";
import { ChevronDown, ChevronUp, Quote } from "lucide-react";
import sunnyPhoto from "@/assets/testimonials/sunny.webp";
import monicaPhoto from "@/assets/testimonials/monica.webp";
import juliePhoto from "@/assets/testimonials/julie.webp";
import cynthiaPhoto from "@/assets/testimonials/cynthia.webp";
import pinweiPhoto from "@/assets/testimonials/pinwei.webp";
import airuPhoto from "@/assets/testimonials/airu.png";

const featured = {
  hook: "讓一個專業招募官做深度審閱完全是另一個層級。",
  full: "這太棒了！現在大家都用AI來潤履歷，但讓一個專業招募官做深度審閱完全是另一個層級。比起單純的履歷檢查，這更像是一場高密度的職涯諮詢。你幫我找到了那些我自己永遠不會注意到的『隱藏亮點』。真的很感謝你的幫助，James！這讓我對下一步有了更多信心。",
  name: "Pin-Wei Wu",
  photo: pinweiPhoto,
};

const scrollCards = [
  {
    hook: "從人資視角出發，讓我第一次清楚理解 HR 在評估人選時真正關心的重點。",
    full: "我最喜歡的部分，是能從招募過程中不同角色的角度思考談判。這次從人資視角出發，讓我第一次清楚理解 HR 在評估人選時真正關心的重點，也釐清了許多薪資相關問題，例如哪些可以問、以及如何回應比較合適。對我準備面試真的很有幫助，也更清楚自己該怎麼調整。這次諮詢幫助我理解不同面試角色的考量，尤其是人資的視角，也釐清了薪資相關問題應答。對面試準備很有幫助，也讓我更有方向。",
    name: "Airu",
    photo: airuPhoto,
  },
  {
    hook: "他的建議清晰、實用，而且完全針對我的情況量身打造。",
    full: "跟 James 討論薪資談判的經驗非常好。他的建議清晰、實用，而且完全針對我的情況量身打造。他不僅幫我更了解自己的市場價值，也給了我在談判中專業溝通的信心和策略。整個過程中，他非常支持、有洞察力，而且真心關注我的成功。我非常推薦他的服務。",
    name: "Omar Li",
    photo: undefined as string | undefined,
  },
  {
    hook: "能事先了解每個利害關係人重視什麼，真的幫助很大。",
    full: "感謝薪資談判的建議。能事先了解每個利害關係人重視什麼，真的幫助很大。",
    name: "Reese",
    photo: undefined as string | undefined,
  },
  {
    hook: "在這麼短的諮詢中，James 的建議就能如此精準有洞見，真的令我印象深刻。",
    full: "在這麼短的諮詢中，James 的建議就能如此精準有洞見，真的令我印象深刻。即使我所在的產業不是美國市場，他仍然能提供深思熟慮、客觀且平衡的回饋。非常感謝他的觀點。",
    name: "Patty Kuo",
    photo: undefined as string | undefined,
  },
  {
    hook: "這是就連我身邊的HR朋友，或是獵頭朋友，都給不了我的建議。",
    full: "謝謝James認真的幫我做履歷健檢，我收到回饋的時候非常訝異！怎麼能夠這麼細心，我感受到收穫滿滿，這是就連我身邊的HR朋友，或是獵頭朋友，都給不了我的建議。推薦給大家，非常認真又專業的James。",
    name: "Sunny",
    photo: sunnyPhoto,
  },
  {
    hook: "讓我對「怎麼寫一份有內容與策略的履歷」有了更清楚的方向與信心。",
    full: "在看原版履歷以及調整的履歷後，呈現的感覺都專業了許多。我覺得在針對履歷每一個 section 所提供的回饋都非常具體，會依照我目前的工作年資與過往經驗，給出有脈絡與可實際調整的建議。這也讓我能夠未來在面對不同公司時，可以沿用同樣架構與思考方式，依照職缺與企業做客製化調整，大幅提升修改效率與精準度。非常感謝這次細心而專業的指導，讓我對「怎麼寫一份有內容與策略的履歷」有了更清楚的方向與信心。",
    name: "Monica",
    photo: monicaPhoto,
  },
  {
    hook: "James的回應很直接且針針見血。",
    full: "我覺得James的回應很直接且針針見血，後續我是搭配評語以及AI工具不斷的對話，最後果斷刪除與我現在經歷較少關聯的學歷以及其中一段較為短暫的實習經驗。後續也會陸續精進自己，訓練自己撰寫能力。感謝您抽空審視我的履歷。",
    name: "Julie Huang",
    photo: juliePhoto,
  },
  {
    hook: "你幫我發現了幾個重要的盲點，特別是ATS優化、影響力導向的寫法，以及職位對齊。",
    full: "感謝你提供如此詳細且有洞察力的履歷review。你幫我發現了幾個重要的盲點，特別是ATS優化、影響力導向的寫法，以及職位對齊。你在改善header格式、強化開頭15個字，以及呈現清晰的專業頭銜方面的指導，都非常有幫助。整體來說，你的review簡潔、專業，而且充滿可以立即執行的建議。這正是我需要的那種有架構的回饋。",
    name: "Cynthia Chiang",
    photo: cynthiaPhoto,
  },
  {
    hook: "即便我已經精修履歷不下十次，依然在 James 的履歷健檢收穫許多寶貴的建議！",
    full: "James 的履歷健檢非常實用，他會仔細的針對每個細節提出具體的評論和修改建議，也會從 talent acquisition 的角度告訴你 HR 看重的內容，且不只會告訴你問題在哪裡（What）也會示範該怎麼改（How）、為什麼要改（Why），即便我已經精修履歷不下十次，依然在 James 的履歷健檢收穫許多寶貴的建議！",
    name: "David",
    photo: undefined as string | undefined,
  },
  {
    hook: "如果James有進階服務，像是面試輔導，我一定會報名。",
    full: "我覺得這次的履歷review非常專業。James用他的專業知識給了我清晰、有架構的改進建議，還附上了修改內容的範例。如果他有進階服務，像是面試輔導，我一定會報名。如果你的目標是海外機會，他真的能幫上大忙。",
    name: "Sam Lee",
    photo: undefined as string | undefined,
  },
];

const remainingTestimonials = [
  {
    hook: "James 真的非常用心在按照每個人的狀況以及想申請的職位去做客制化的調整!",
    full: "很清楚按照我的背景跟目前的狀況去點出我應該改善的地方。逐項檢查讓我可以清楚定位問題去做改善。James 真的非常用心在按照每個人的狀況以及想申請的職位去做客制化的調整!",
    name: "Roger Lee",
    photo: undefined as string | undefined,
  },
  {
    hook: "經過你的review的確讓我發現本身的優勢以及未來在resume上可以再加強跟改進的部分！",
    full: "雖然這份履歷健檢來的太晚，但我認為幫助很多！確實有時候會有盲點，但經過你的review的確讓我發現本身的優勢以及未來在resume上可以再加強跟改進的部分！",
    name: "Charlene Lee",
    photo: undefined as string | undefined,
  },
];

const allTestimonials = remainingTestimonials;

function FeaturedCard() {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-background rounded-2xl border border-border p-6 md:p-10 shadow-[0_2px_12px_rgba(0,0,0,0.06)]">
      <Quote className="w-8 h-8 text-gold/40 mb-4" />
      <blockquote className="font-heading text-xl md:text-2xl text-foreground leading-relaxed mb-4">
        「{featured.hook}」
      </blockquote>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "max-h-96 opacity-100 mb-4" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-muted-foreground text-sm md:text-base leading-relaxed border-t border-border pt-4">
          {featured.full}
        </p>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          {featured.photo ? (
            <img src={featured.photo} alt={featured.name} className="w-12 h-12 rounded-full object-cover border-2 border-gold" />
          ) : (
            <div className="w-12 h-12 rounded-full border-2 border-gold bg-muted flex items-center justify-center text-muted-foreground font-semibold text-lg">
              {featured.name[0]}
            </div>
          )}
          <p className="font-semibold text-foreground">{featured.name}</p>
        </div>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
        >
          {expanded ? "收起" : "更多"}
          <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${expanded ? "rotate-180" : ""}`} />
        </button>
      </div>
    </div>
  );
}

function ScrollCard({ item }: { item: (typeof scrollCards)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <button
      type="button"
      onClick={() => setExpanded((v) => !v)}
      className="snap-start shrink-0 w-[42vw] sm:w-56 text-left bg-background rounded-xl border border-border border-l-4 border-l-gold p-4 shadow-[0_2px_12px_rgba(0,0,0,0.06)] transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] focus:outline-none focus:ring-2 focus:ring-gold/40"
    >
      {item.photo && (
        <img src={item.photo} alt={item.name} loading="lazy" className="w-10 h-10 rounded-full object-cover border-2 border-gold mb-3" />
      )}
      <p className="text-foreground text-sm leading-relaxed mb-2">
        「{item.hook}」
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "max-h-96 opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-muted-foreground text-xs leading-relaxed border-t border-border pt-3">
          {item.full}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="font-semibold text-foreground text-sm">{item.name}</p>
        <span className="flex items-center gap-1 text-gold text-xs font-medium">
          {expanded ? "收起" : "更多"}
          <ChevronDown
            className={`w-3 h-3 transition-transform duration-300 ${
              expanded ? "rotate-180" : ""
            }`}
          />
        </span>
      </div>
    </button>
  );
}

export default function HomepageTestimonialsZhTw() {
  const [showAll, setShowAll] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section
      id="testimonials"
      className="py-14 md:py-20 px-5 md:px-6 bg-card border-y border-border"
    >
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-foreground text-center mb-12">
          客戶怎麼說
        </h2>

        <FeaturedCard />

        <div
          ref={scrollRef}
          className="mt-8 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 scrollbar-hide"
          style={{ scrollbarWidth: "none" }}
        >
          {scrollCards.map((item) => (
            <ScrollCard key={item.name} item={item} />
          ))}
        </div>

        <div className="mt-8 text-center">
          <button
            type="button"
            onClick={() => setShowAll((v) => !v)}
            className="inline-flex items-center gap-1.5 text-sm font-medium text-gold hover:text-gold-dark transition-colors"
          >
            {showAll ? "收起評價" : "查看所有評價"}
            {showAll ? (
              <ChevronUp className="w-4 h-4" />
            ) : (
              <ChevronDown className="w-4 h-4" />
            )}
          </button>
        </div>

        <div
          className={`grid gap-4 mt-6 transition-all duration-500 ease-in-out overflow-hidden ${
            showAll ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          {allTestimonials.map((item) => (
            <ExpandableTestimonial key={item.name} item={item} />
          ))}
        </div>
      </div>
    </section>
  );
}

function ExpandableTestimonial({ item }: { item: (typeof allTestimonials)[0] }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="bg-background rounded-xl border border-border border-l-4 border-l-gold/60 p-5 shadow-[0_2px_12px_rgba(0,0,0,0.06)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.10)] transition-shadow duration-200">
      {item.photo && (
        <img src={item.photo} alt={item.name} loading="lazy" className="w-10 h-10 rounded-full object-cover border-2 border-gold mb-3" />
      )}
      <p className="text-foreground text-sm leading-relaxed mb-2">
        「{item.hook}」
      </p>

      <div
        className={`overflow-hidden transition-all duration-300 ease-out ${
          expanded ? "max-h-[600px] opacity-100 mt-3" : "max-h-0 opacity-0"
        }`}
      >
        <p className="text-muted-foreground text-xs leading-relaxed border-t border-border pt-3">
          {item.full}
        </p>
      </div>

      <div className="flex items-center justify-between mt-3">
        <p className="font-semibold text-foreground text-sm">{item.name}</p>
        <button
          onClick={() => setExpanded((v) => !v)}
          className="flex items-center gap-1 text-gold hover:text-gold/80 transition-colors text-xs font-medium"
        >
          {expanded ? "收起" : "更多"}
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
