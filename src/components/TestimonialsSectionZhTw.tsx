import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Testimonial {
  name: string;
  hook: string;
  full: string;
}

interface TestimonialsSectionZhTwProps {
  title?: string;
  testimonials?: Testimonial[];
}

const defaultTestimonials: Testimonial[] = [
  {
    name: "Pin-Wei Wu",
    hook: "比起單純的履歷檢查，這更像是一場高密度的職涯諮詢。",
    full: "這太棒了！現在大家都用AI來潤履歷，但讓一個專業recruiter做深度review完全是另一個層級。比起單純的履歷檢查，這更像是一場高密度的職涯諮詢。你幫我找到了那些我自己永遠不會注意到的『隱藏亮點』。真的很感謝你的幫助，James！這讓我對下一步有了更多信心。",
  },
  {
    name: "David",
    hook: "即便我已經精修履歷不下十次，依然在 James 的履歷健檢收穫許多寶貴的建議！",
    full: "James 的履歷健檢非常實用，他會仔細的針對每個細節提出具體的評論和修改建議，也會從 talent acquisition 的角度告訴你 HR 看重的內容，且不只會告訴你問題在哪裡（What）也會示範該怎麼改（How）、為什麼要改（Why），即便我已經精修履歷不下十次，依然在 James 的履歷健檢收穫許多寶貴的建議！",
  },
  {
    name: "Sunny",
    hook: "這是就連我身邊的HR朋友，或是獵頭朋友，都給不了我的建議。",
    full: "謝謝James認真的幫我做履歷健檢，我收到回饋的時候非常訝異！怎麼能夠這麼細心，我感受到收穫滿滿，這是就連我身邊的HR朋友，或是獵頭朋友，都給不了我的建議。推薦給大家，非常認真又專業的James。",
  },
  {
    name: "Sam Lee",
    hook: "如果James有進階服務，像是面試輔導，我一定會報名。",
    full: "我覺得這次的履歷review非常專業。James用他的專業知識給了我清晰、有架構的改進建議，還附上了修改內容的範例。如果他有進階服務，像是面試輔導，我一定會報名。如果你的目標是海外機會，他真的能幫上大忙。",
  },
  {
    name: "Monica",
    hook: "讓我對「怎麼寫一份有內容與策略的履歷」有了更清楚的方向與信心。",
    full: "在看原版履歷以及調整的履歷後，呈現的感覺都專業了許多。我覺得在針對履歷每一個 section 所提供的回饋都非常具體，會依照我目前的工作年資與過往經驗，給出有脈絡與可實際調整的建議。這也讓我能夠未來在面對不同公司時，可以沿用同樣架構與思考方式，依照職缺與企業做客製化調整，大幅提升修改效率與精準度。非常感謝這次細心而專業的指導，讓我對「怎麼寫一份有內容與策略的履歷」有了更清楚的方向與信心。",
  },
  {
    name: "Cynthia Chiang",
    hook: "你幫我發現了幾個重要的盲點，特別是ATS優化、影響力導向的寫法，以及職位對齊。",
    full: "感謝你提供如此詳細且有洞察力的履歷review。你幫我發現了幾個重要的盲點，特別是ATS優化、影響力導向的寫法，以及職位對齊。你在改善header格式、強化開頭15個字，以及呈現清晰的專業頭銜方面的指導，都非常有幫助。整體來說，你的review簡潔、專業，而且充滿可以立即執行的建議。這正是我需要的那種有架構的回饋。",
  },
  {
    name: "Julie Huang",
    hook: "James的回應很直接且針針見血。",
    full: "我覺得James的回應很直接且針針見血，後續我是搭配評語以及AI工具不斷的對話，最後果斷刪除與我現在經歷較少關聯的學歷以及其中一段較為短暫的實習經驗。後續也會陸續精進自己，訓練自己撰寫能力。感謝您抽空審視我的履歷。",
  },
  {
    name: "Roger Lee",
    hook: "James 真的非常用心在按照每個人的狀況以及想申請的職位去做客制化的調整!",
    full: "很清楚按照我的背景跟目前的狀況去點出我應該改善的地方。逐項檢查讓我可以清楚定位問題去做改善。James 真的非常用心在按照每個人的狀況以及想申請的職位去做客制化的調整!",
  },
  {
    name: "Charlene Lee",
    hook: "經過你的review的確讓我發現本身的優勢以及未來在resume上可以再加強跟改進的部分！",
    full: "雖然這份履歷健檢來的太晚，但我認為幫助很多！確實有時候會有盲點，但經過你的review的確讓我發現本身的優勢以及未來在resume上可以再加強跟改進的部分！",
  },
];

const TestimonialCard = ({ testimonial }: { testimonial: Testimonial }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="bg-card rounded-2xl p-8 md:p-10 shadow-md hover:shadow-lg transition-all duration-300 border-l-4 border-gold">
      {/* Decorative Quote Mark */}
      <span className="block text-6xl md:text-7xl text-gold/30 font-serif leading-none mb-4 select-none">
        "
      </span>

      {/* Hook Quote */}
      <p className="font-heading text-lg md:text-xl text-foreground leading-relaxed mb-4">
        「{testimonial.hook}」
      </p>

      {/* Expandable Full Content */}
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="text-muted-foreground text-base leading-relaxed mb-4 pt-2 border-t border-border">
              {testimonial.full}
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Footer: Name + Read More */}
      <div className="flex items-center justify-between mt-4">
        <p className="font-bold text-foreground text-base">{testimonial.name}</p>
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-1 text-gold hover:text-gold/80 transition-colors text-sm font-medium"
        >
          {isExpanded ? "收起" : "閱讀更多"}
          <motion.span
            animate={{ rotate: isExpanded ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronDown className="w-4 h-4" />
          </motion.span>
        </button>
      </div>
    </div>
  );
};

const TestimonialsSectionZhTw = ({
  title = "客戶怎麼說",
  testimonials = defaultTestimonials,
}: TestimonialsSectionZhTwProps) => {
  return (
    <section id="testimonials" className="py-16 md:py-24 px-5 md:px-6 bg-muted">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-3xl md:text-5xl text-foreground text-center mb-12 md:mb-16">
          {title}
        </h2>

        <div className="flex flex-col gap-6">
          {testimonials.map((testimonial, index) => (
            <TestimonialCard key={index} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSectionZhTw;
