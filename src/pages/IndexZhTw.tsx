import "@/styles/homepage.css";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { X, CheckCircle2, Plus, Minus, FileText, Users } from "lucide-react";
import PainMarker from "@/components/PainMarker";
import { ResumeStackIcon, ThreeFiguresIcon, InsiderIcon } from "@/assets/illustrations/HiresignIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import HomepageTestimonialsZhTw from "@/components/HomepageTestimonialsZhTw";
import LogoScrollZhTw from "@/components/LogoScrollZhTw";
import SelfSegmentationZhTw from "@/components/SelfSegmentationZhTw";
import SalaryProofSectionZhTw from "@/components/SalaryProofSectionZhTw";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";
import AboutSectionZhTw from "@/components/AboutSectionZhTw";
import ExitIntentPopup from "@/components/ExitIntentPopup";
import PromoBanner from "@/components/PromoBanner";
import { useAuth } from "@/contexts/AuthContext";
import { SEO } from "@/components/SEO";
import { Wordmark } from "@/components/Wordmark";

const faqs = [
  { q: "為什麼這些是免費的？", a: "我的使命是把盡可能多的付費工具和資訊免費開放。我想幫助更多人得到他們想要的工作和生活。" },
  { q: "我沒有自信談薪水。這會有幫助嗎？", a: "你不需要強勢。你需要了解對方要什麼。我讓你理解 HR 的思維方式，讓你感覺冷靜、準備好。" },
  { q: "我一直投履歷但都沒有回音。我做錯了什麼？", a: "通常三件事之一：履歷沒通過電腦篩選、職稱跟職缺不匹配、或最好的成果放在錯誤位置。我的審查會找出問題，告訴你怎麼改。" },
  { q: "我不知道在招募流程中怎麼跟 HR 溝通。他們感覺像守門員。", a: "HR 不是你的敵人。他們想把職缺填滿。問題是大部分人不了解 HR 在意什麼。我做過 HR。我讓你知道他們每個階段看什麼，讓你們合作。" },
  { q: "為什麼不用 ChatGPT 改履歷就好？", a: "AI 是好的起點。但 AI 不知道真正的招募官在找什麼。AI 不會告訴你最好的成就被埋在第二頁。或你想去的公司更在意 X 而不是 Y。審閱過 20,000+ 份履歷教會我 AI 還沒學到的事。" },
  { q: "你的履歷健檢跟其他服務有什麼不同？", a: "大部分履歷服務修改錯字、調整排版。我用招募官的角度看你的履歷，告訴你怎麼改才能拿到更多面試。你還會得到一套可重複使用的系統。" },
];

function FAQSection() {
  const [open, setOpen] = useState<Set<number>>(new Set());
  const toggle = (i: number) => setOpen(prev => {
    const next = new Set(prev);
    next.has(i) ? next.delete(i) : next.add(i);
    return next;
  });

  return (
    <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
      <div className="container mx-auto max-w-3xl">
        <h2 className="font-heading text-center mb-10 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
          這真的免費嗎？是的 — 原因如下。
        </h2>
        <div className="card-hairline divide-y divide-border overflow-hidden">
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 px-6 text-left gap-4 hover:bg-paper-alt transition-colors"
                  aria-expanded={isOpen}
                  aria-controls={`faq-panel-zh-${i}`}
                >
                  <span className="font-heading text-[1.0625rem] text-foreground tracking-[-0.01em]" style={{ fontWeight: 600 }}>{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gold" strokeWidth={2.25} />
                    : <Plus className="w-4 h-4 flex-shrink-0 transition-transform duration-200 text-gold" strokeWidth={2.25} />
                  }
                </button>
                <div
                  id={`faq-panel-zh-${i}`}
                  role="region"
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="px-6 pb-5 text-[15px] text-muted-foreground leading-relaxed" style={{ paddingTop: '0' }}>
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

const IndexZhTw = () => {
  const { isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!isLoggedIn) return;
    const pending = sessionStorage.getItem("auth_redirect");
    if (pending) {
      sessionStorage.removeItem("auth_redirect");
      navigate(pending === "/zh-tw" ? "/zh-tw/dashboard" : pending, { replace: true });
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="homepage min-h-screen overflow-x-hidden scroll-smooth bg-cream">
      <SEO />

      {/* ── Promo Banner + Navigation (sticky together) ── */}
      <header className="sticky top-0 z-50">
        <PromoBanner lang="zh" />
        <nav
          className={`transition-all duration-300 border-b border-border ${
            scrolled ? "shadow-sm" : ""
          }`}
          style={{ background: 'rgba(253,251,247,0.85)', backdropFilter: 'blur(12px)', WebkitBackdropFilter: 'blur(12px)' }}
          aria-label="主要導覽"
        >
          <div className="container mx-auto px-4 sm:px-5 md:px-6 h-16 flex items-center justify-between">
            <Link to="/zh-tw" className="cursor-pointer flex items-center gap-3" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })} aria-label="Hiresign — by James Bugden" style={{ color: 'hsl(var(--executive-green))' }}>
              <Wordmark variant="mono" size={28} />
            </Link>
            <div className="flex items-center gap-2 sm:gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="nav" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — paper bg, photo above H1 ── */}
        <section id="about" className="pt-12 md:pt-16 pb-14 md:pb-24 px-4 sm:px-5 md:px-6 relative bg-paper">
          <div className="container mx-auto max-w-3xl">

            {/* Hero photo — above H1, large for recognition */}
            <div className="flex justify-center mb-8">
              <div className="relative">
                <div
                  className="absolute -inset-3 rounded-[32px]"
                  style={{ background: 'hsl(var(--gold-soft))', opacity: 0.5, transform: 'translate(10px, 12px)' }}
                  aria-hidden
                />
                <div
                  className="relative overflow-hidden rounded-[24px] bg-card"
                  style={{ border: '1px solid hsl(var(--border))' }}
                >
                  <img
                    src={jamesPhoto}
                    alt="James Bugden, Uber 資深 Recruiter"
                    className="object-cover w-[240px] h-[300px] md:w-[280px] md:h-[350px]"
                    loading="eager"
                  />
                </div>
                <div
                  className="absolute -bottom-3 left-1/2 -translate-x-1/2 card-hairline px-4 py-2 flex items-center gap-2 whitespace-nowrap"
                  style={{ background: 'hsl(var(--paper))' }}
                >
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: 'hsl(var(--gold))' }} />
                  <span className="text-foreground text-[13px] font-semibold leading-tight">James Bugden</span>
                  <span className="text-muted-foreground text-[12px]">· Uber Recruiter</span>
                </div>
              </div>
            </div>

            <h1
              className="font-heading leading-[1.05] tracking-[-0.04em] mb-6 text-center mx-auto max-w-3xl mt-6"
              style={{ fontSize: 'clamp(2.25rem, 5vw, 3.75rem)', fontWeight: 600, color: 'hsl(var(--foreground))', textWrap: 'balance' }}
            >
              在<span style={{ color: 'hsl(var(--executive-green))' }}>夢想公司</span>拿到 <span className="text-mark-gold whitespace-nowrap">300 萬以上</span>的 Offer
            </h1>

            <p className="leading-relaxed mb-9 text-[1.125rem] text-center mx-auto max-w-2xl" style={{ color: 'hsl(0 0% 28%)' }}>
              免費工具、模板和內部策略，來自幫助 750 位以上求職者成功錄取的職涯教練。
            </p>

            <div className="mb-3 max-w-xl mx-auto">
              <MailerLiteForm
                formId="sM1X80"
                className="ml-embedded ml-inline"
                buttonText="免費索取攻略"
                successHeading="成功加入！"
                successBody="請查看您的信箱，免費求職指南已寄出。"
                successCta="建立免費帳號，儲存進度並探索更多工具"
                successCtaLink="/zh-tw/join"
              />
            </div>

            <p className="mb-12 text-muted-foreground text-[13px] text-center">
              加入 <span className="tnum-geist" style={{ fontWeight: 600 }}>10,000+</span> 位專業人士 · 隨時取消訂閱
            </p>

            {/* Stat row — green icons + Geist tabular numerics, hairline border-top */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-12 pt-9 border-t border-border max-w-xl mx-auto">
              <div className="flex items-center gap-3 justify-center">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--green-soft))' }}>
                  <ResumeStackIcon size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>20,000+</span>
                  <span className="text-muted-foreground text-[13px]">份履歷審閱</span>
                </div>
              </div>
              <div className="flex items-center gap-3 justify-center">
                <div className="flex-shrink-0 w-11 h-11 rounded-lg flex items-center justify-center" style={{ background: 'hsl(var(--green-soft))' }}>
                  <ThreeFiguresIcon size={28} />
                </div>
                <div className="flex flex-col">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>750+</span>
                  <span className="text-muted-foreground text-[13px]">人成功錄取</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar — paper-alt ── */}
        <section className="bg-paper-alt py-10 md:py-14 px-5 md:px-6 border-y border-border">
          <div className="container mx-auto max-w-6xl">
            <LogoScrollZhTw />
          </div>
        </section>

        {/* ── Testimonials — paper-alt ── */}
        <LazySection>
          <HomepageTestimonialsZhTw />
        </LazySection>

        {/* ── Pain-Point Section — paper bg, hairline cards ── */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-paper">
          <div className="container mx-auto max-w-3xl">
            <h2 className="font-heading text-center mb-10 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
              聽起來很熟悉？
            </h2>

            <div className="grid gap-3 mb-8">
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">你投了一堆工作，完全沒有回音。</p>
              </div>
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">你進到最終面試，然後沒有下文。沒有 Email。沒有電話。</p>
              </div>
              <div className="card-hairline p-5 flex items-start gap-4">
                <span className="mt-0.5"><PainMarker /></span>
                <p className="text-foreground text-[1.0625rem] leading-relaxed">你拿到 Offer，但你不知道薪水合不合理，也不知道該不該再談。</p>
              </div>
            </div>

            <div className="card-hairline-tinted p-6 md:p-8">
              <div className="flex items-start gap-3 mb-4">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-1 text-executive-green" strokeWidth={2} />
                <p className="text-foreground text-[1.0625rem] leading-relaxed font-medium">
                  你不需要另一個求職平台。你需要一個坐在桌子另一邊的人。
                </p>
              </div>
              <div className="max-w-md">
                <MailerLiteForm
                  formId="sM1X80"
                  className="ml-embedded"
                  buttonText="免費索取攻略"
                  successHeading="成功加入！"
                  successBody="請查看您的信箱，免費求職指南已寄出。"
                  successCta="建立免費帳號，儲存進度並探索更多工具"
                  successCtaLink="/zh-tw/join"
                />
              </div>
              <p className="mt-3 text-muted-foreground text-[0.8125rem]">
                不灌水、不廢話。每週一則招募內幕策略。
              </p>
            </div>
          </div>
        </section>

        {/* ── Credibility Section — paper-alt, hairline cards with gold top accent ── */}
        <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
          <div className="container mx-auto max-w-5xl">
            <div className="text-center mb-12 max-w-3xl mx-auto">
              <h2 className="font-heading text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(2rem, 4vw, 2.75rem)', fontWeight: 600, lineHeight: 1.1 }}>
                大部分職涯建議來自從沒<span style={{ color: 'hsl(var(--gold))' }}>錄取</span>過任何人的人。
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <ResumeStackIcon size={56} />
                </div>
                <div className="mb-1">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>20,000+</span>
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em]" style={{ fontWeight: 600, lineHeight: 1.25 }}>份履歷審閱</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  我知道什麼讓招募官停下來看，什麼讓履歷在 6 秒內被淘汰。
                </p>
              </div>
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <ThreeFiguresIcon size={56} />
                </div>
                <div className="mb-1">
                  <span className="tnum-geist text-foreground" style={{ fontSize: '1.75rem' }}>750+</span>
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em]" style={{ fontWeight: 600, lineHeight: 1.25 }}>人成功錄取</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  我坐在決定 Offer 的會議室裡。我知道 HR 怎麼想,還有大部分人在哪裡少拿了錢。
                </p>
              </div>
              <div className="card-hairline p-7 relative overflow-hidden">
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gold" />
                <div className="mb-5">
                  <InsiderIcon size={56} />
                </div>
                <p className="font-heading text-[18px] mb-2 text-foreground tracking-[-0.01em] mt-9" style={{ fontWeight: 600, lineHeight: 1.25 }}>Uber 台灣 Recruiter</p>
                <p className="text-[15px] text-muted-foreground leading-relaxed">
                  我每天都在做招募決定的會議室裡 — 我把我看到的分享給你。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <LazySection>
          <SelfSegmentationZhTw />
        </LazySection>

        {/* ── Salary Calculator Proof ── */}
        <LazySection>
          <SalaryProofSectionZhTw />
        </LazySection>

        {/* ── About ── */}
        <LazySection>
          <AboutSectionZhTw />
        </LazySection>

        {/* ── FAQ ── */}
        <LazySection>
          <FAQSection />
        </LazySection>

        {/* ── Create Account CTA — hairline card on paper-alt to match site language ── */}
        {!isLoggedIn && (
          <LazySection>
            <section className="py-14 md:py-20 px-5 md:px-6 bg-paper-alt">
              <div className="container mx-auto max-w-3xl">
                <div className="bg-card border border-border rounded-2xl p-8 md:p-12 text-center shadow-sm">
                  <p className="text-[11px] uppercase tracking-[0.2em] text-gold font-bold mb-4">免費</p>
                  <h2 className="font-heading mb-3 text-foreground tracking-[-0.025em]" style={{ fontSize: 'clamp(1.75rem, 4vw, 2.5rem)', fontWeight: 700, lineHeight: 1.1, textWrap: 'balance' }}>
                    免費建立帳號
                  </h2>
                  <p className="text-base md:text-lg text-muted-foreground mb-8 max-w-xl mx-auto leading-relaxed">
                    免費取得所有職涯指南、履歷工具、薪資數據等完整資源。
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-8 text-left max-w-2xl mx-auto">
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">10+ 份職涯與面試指南</span>
                    </div>
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">履歷建立器與 AI 分析工具</span>
                    </div>
                    <div className="bg-paper-alt border border-border rounded-xl p-4 flex items-start gap-3">
                      <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-gold-soft border border-gold/30 flex-shrink-0 mt-0.5" aria-hidden>
                        <CheckCircle2 className="w-3.5 h-3.5 text-gold" strokeWidth={2.5} />
                      </span>
                      <span className="text-foreground text-[14px]">面試題庫與談判工具</span>
                    </div>
                  </div>
                  <Link
                    to="/zh-tw/join"
                    className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-lg font-bold bg-gold text-executive-green hover:bg-gold-dark hover:text-cream transition-colors text-base shadow-sm"
                  >
                    免費取得完整資源
                  </Link>
                  <p className="text-xs text-muted-foreground mt-3">無需信用卡</p>
                </div>
              </div>
            </section>
          </LazySection>
        )}

      </main>

      <ExitIntentPopup lang="zh" />
    </div>
  );
};

export default IndexZhTw;
