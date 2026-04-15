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
    headline: "遠超一般的履歷檢查",
    name: "Pin-Wei Wu",
    titleSource: "轉職者 · 透過履歷健檢",
    photo: pinweiPhoto,
    quote: "現在每個人都用 AI 修改履歷，但讓專業招募官做深度審查完全是另一個層次。感覺更像是一場高密度的職涯諮詢，而不只是履歷檢查。你幫我找到那些我自己永遠不會注意到的『隱藏亮點』。這讓我對下一步更有信心。",
    bold: "感覺更像是一場高密度的職涯諮詢，而不只是履歷檢查。",
  },
  {
    headline: "滿滿的具體改善建議",
    name: "Cynthia Chiang",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: cynthiaPhoto,
    quote: "你幫我找到幾個重要的盲點，特別是 ATS 優化、以成果為導向的寫法，還有職位定位。你在改善標題格式、強化前 15 個字、呈現清楚的職稱方面的建議都非常實用。你的審查精簡、專業，而且充滿具體的改善建議。",
    bold: "充滿具體的改善建議。",
  },
  {
    headline: "第一次真正理解 HR 在意什麼",
    name: "Airu",
    titleSource: "求職者 · 透過薪資談判教練",
    photo: airuPhoto,
    quote: "我最喜歡的部分是學會從招募流程中不同角色的角度思考談判。這是我第一次清楚理解 HR 在評估候選人時到底在意什麼。這幫助我準備面試，也讓我的方向更加明確。",
    bold: "第一次清楚理解 HR 在評估候選人時到底在意什麼。",
  },
  {
    headline: "跨產業求職者的信心提升",
    name: "Roy Tsai",
    titleSource: "轉職者 · 透過履歷健檢",
    photo: royPhoto,
    quote: "這份審查的深度遠超我的預期。James 不只是建議修改，他給了我一套策略框架，幫我針對目標職位重新定位我的背景。他讓我發現我最強的成就被放在錯誤的地方。這不只是改履歷，是讓我用全新的眼光重新看見自己的職涯價值。",
    bold: "這不只是改履歷，是讓我用全新的眼光重新看見自己的職涯價值。",
  },
  {
    headline: "現在我會自己針對任何職位客製化履歷",
    name: "Monica",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: monicaPhoto,
    quote: "看到修改前後的對比，差異讓我很驚訝。每個部分的回饋都非常具體，建議完全針對我的經驗程度量身打造。現在我會用同樣的架構自己客製化履歷，效率大幅提升。",
    bold: "現在我會用同樣的架構自己客製化履歷，效率大幅提升。",
  },
  {
    headline: "他找到你故事裡隱藏的潛力",
    name: "Janelle Cheng",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: janellePhoto,
    quote: "James 非常注重細節，也能從平淡的描述中找到隱藏的潛力。強烈推薦讓 James 這樣的專業人士用專家角度評估你的履歷。我非常感謝這次的經驗。",
    bold: "從平淡的描述中找到隱藏的潛力。",
  },
  {
    headline: "現在我知道 HR 到底怎麼想",
    name: "Peter Cho",
    titleSource: "專業人士 · 透過薪資談判教練",
    photo: peterPhoto,
    quote: "James 很快掌握了我的狀況，幫我理解 HR 的思維方式，還給了我馬上可以用的實際方法。我對即將到來的面試和薪資談判感覺準備充分多了。",
    bold: "幫我理解 HR 的思維方式。",
  },
];

const tier2: Testimonial[] = [
  {
    headline: "了解招募流程中每個人的思考方式",
    name: "Anne Chen",
    titleSource: "專業人士 · 透過薪資談判教練",
    photo: annePhoto,
    quote: "這次諮詢完全改變了我對薪資談判的看法。我以前覺得談薪很尷尬、很對立，但 James 讓我理解這其實是專業的職涯溝通。他拆解了招募官、獵頭、用人團隊各自不同的思維方式，讓你知道面對每個人時該怎麼定位自己。",
    bold: "他拆解了招募官、獵頭、用人團隊各自不同的思維方式。",
  },
  {
    headline: "列出優先順序，讓我馬上行動",
    name: "Silvia Chen",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: silviaPhoto,
    quote: "視覺化的版面讓審查報告非常好讀。優勢和需要改善的地方清楚列出，適用於不同職位。有優先順序的改善建議搭配優化範例，讓我很容易理解，也馬上付諸行動。",
    bold: "有優先順序的改善建議搭配優化範例。",
  },
  {
    headline: "比我的 HR 和獵頭朋友給的建議更好",
    name: "Sunny",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: sunnyPhoto,
    quote: "我真的很驚訝回饋有多詳細。這種建議連我的 HR 朋友和獵頭人脈都給不出來。James 非常仔細、非常專業。我大力推薦。",
    bold: "這種建議連我的 HR 朋友和獵頭人脈都給不出來。",
  },
  {
    headline: "真心投入幫助我成功",
    name: "Omar Li",
    titleSource: "專業人士 · 透過薪資談判教練",
    photo: omarPhoto,
    quote: "整個過程中，James 都很支持我，洞察力很深，也真心投入幫助我成功。我強烈推薦他的服務給想要提升職涯、帶著更清晰的方向和信心面對薪資談判的人。",
    bold: "真心投入幫助我成功。",
  },
];

const tier3: Testimonial[] = [
  {
    headline: "一份專業的求職路線圖",
    name: "Julie Huang",
    titleSource: "專業人士 · 透過履歷健檢",
    photo: juliePhoto,
    quote: "James 很直接，每一點都切中要害。我把他的回饋搭配 AI 工具進一步優化履歷，就像有一份專業的路線圖。我已經明顯感受到投遞品質的差異。",
    bold: "每一點都切中要害。",
  },
  {
    headline: "發現我的薪水還有成長空間",
    name: "Kiki",
    titleSource: "專業人士 · 透過薪資談判教練",
    photo: kikiPhoto,
    quote: "短短 30 分鐘，James 讓我意識到我的薪水還有成長空間，我只是需要對自己的價值更有信心。了解自己在業界的定位是一個很好的起點。",
    bold: "讓我意識到我的薪水還有成長空間。",
  },
  {
    headline: "客製化指導，不是通用建議",
    name: "Rock Shih",
    titleSource: "專業人士 · 透過薪資談判教練",
    photo: rockPhoto,
    quote: "我原本以為是通用的薪資談判課程，但 James 根據我的具體狀況給了我高度客製化的指導。我現在對跟雇主溝通、談到更好的條件更有把握了。",
    bold: "根據我的具體狀況給了我高度客製化的指導。",
  },
];

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
      <p className="font-bold mb-3" style={{ color: "#1A1A1A", fontSize: featured ? "1.25rem" : "1.0625rem" }}>
        {item.headline}
      </p>
      <p className="leading-relaxed mb-4" style={{ color: "#1A1A1A", fontSize: "1rem" }}>
        「<BoldQuote text={item.quote} bold={item.bold} />」
      </p>
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

export default function HomepageTestimonialsZhTw() {
  const [revealLevel, setRevealLevel] = useState(0);

  const buttonText = revealLevel === 0 ? "顯示更多評價" : "顯示更多評價";
  const featured = tier1[0];
  const gridTier1 = tier1.slice(1);

  return (
    <section id="testimonials" className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: "#FFFFFF" }}>
      <div className="container mx-auto max-w-5xl">
        <h2 className="font-heading-cjk text-center mb-6" style={{ color: "#1A1A1A", fontSize: "clamp(2rem, 4vw, 2.625rem)", lineHeight: 1.2, fontWeight: 700 }}>
          <span className="hidden sm:inline">在夢想公司拿到年薪 3 百萬以上的 Offer</span>
          <span className="sm:hidden">在夢想公司拿到<br />年薪 3 百萬以上<br />的 Offer</span>
        </h2>

        <TestimonialCard item={featured} featured />

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {gridTier1.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </div>

        <TierReveal visible={revealLevel >= 1}>
          {tier2.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </TierReveal>

        <TierReveal visible={revealLevel >= 2}>
          {tier3.map((item) => (
            <TestimonialCard key={item.name} item={item} />
          ))}
        </TierReveal>

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
