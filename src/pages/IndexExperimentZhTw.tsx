import "@/styles/experiment.css";
import { useState, useEffect } from "react";
import { Briefcase, Users, Linkedin, FileCheck, X, CheckCircle2, Eye, Building, Plus, Minus } from "lucide-react";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import jamesPhoto from "@/assets/james-bugden.jpg";
import LanguageToggle from "@/components/LanguageToggle";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import PageSEO from "@/components/PageSEO";
import HomepageTestimonialsExperimentZhTw from "@/components/HomepageTestimonialsExperimentZhTw";
import LogoScrollExperimentZhTw from "@/components/LogoScrollExperimentZhTw";
import SelfSegmentationExperimentZhTw from "@/components/SelfSegmentationExperimentZhTw";
import SalaryProofSectionZhTw from "@/components/SalaryProofSectionZhTw";
import MailerLiteForm from "@/components/MailerLiteForm";
import LazySection from "@/components/LazySection";
import AboutSectionZhTw from "@/components/AboutSectionZhTw";

const faqs = [
  { q: "為什麼這些是免費的？", a: "我的使命是把盡可能多的付費工具和資訊免費開放。我想幫助更多人得到他們想要的工作和生活。" },
  { q: "我沒有自信談薪水。這會有幫助嗎？", a: "你不需要強勢。你需要了解對方要什麼。我讓你理解 HR 的思維方式，讓你感覺冷靜、準備好。" },
  { q: "我一直投履歷但都沒有回音。我做錯了什麼？", a: "通常三件事之一：履歷沒通過電腦篩選、職稱跟職缺不匹配、或最好的成果放在錯誤位置。我的審查會找出問題，告訴你怎麼改。" },
  { q: "我不知道在招募流程中怎麼跟 HR 溝通。他們感覺像守門員。", a: "HR 想把職缺填滿。大部分人不了解 HR 在意什麼。我做過 HR。我讓你知道他們每個階段看什麼，讓你們合作。" },
  { q: "為什麼不用 ChatGPT 改履歷就好？", a: "AI 是好的起點。但 AI 不知道招募官在找什麼。AI 不會告訴你最好的成就被埋在第二頁。審閱過 20,000+ 份履歷教會我 AI 還沒學到的事。" },
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
    <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FFFFFF' }}>
      <div className="container mx-auto max-w-2xl">
        <h2 className="font-heading text-center mb-6" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
          你心裡的疑問
        </h2>
        <div>
          {faqs.map((faq, i) => {
            const isOpen = open.has(i);
            return (
              <div key={i} style={{ borderBottom: '1px solid #E5E5E5' }}>
                <button
                  type="button"
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between py-5 text-left gap-4"
                >
                  <span className="font-bold text-lg" style={{ color: '#1A1A1A' }}>{faq.q}</span>
                  {isOpen
                    ? <Minus className="w-5 h-5 flex-shrink-0 transition-transform duration-200" style={{ color: '#6B6B6B' }} />
                    : <Plus className="w-5 h-5 flex-shrink-0 transition-transform duration-200" style={{ color: '#6B6B6B' }} />
                  }
                </button>
                <div
                  className="overflow-hidden transition-all duration-200 ease-in-out"
                  style={{ maxHeight: isOpen ? '500px' : '0', opacity: isOpen ? 1 : 0 }}
                >
                  <p className="pb-5 text-base" style={{ color: '#1A1A1A', paddingTop: '0' }}>
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

const IndexExperimentZhTw = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div className="experiment min-h-screen overflow-x-hidden scroll-smooth" style={{ backgroundColor: '#FDFBF7' }}>
      <PageSEO
        title="James Bugden — 實驗頁面"
        description="實驗版首頁"
        path="/zh-tw/experiment"
      />

      {/* ── Navigation ── */}
      <header>
        <nav
          className={`fixed top-0 left-0 right-0 z-50 transition-shadow duration-300 ${
            scrolled ? "shadow-md shadow-black/8" : ""
          }`}
          style={{ backgroundColor: '#FDFBF7' }}
        >
          <div className="container mx-auto px-5 md:px-6 py-4 flex items-center justify-between">
            <span className="font-heading text-lg md:text-xl font-bold tracking-tight" style={{ color: '#2b4734' }}>
              JAMES BUGDEN
            </span>
            <div className="flex items-center gap-4">
              <AuthHeaderButton variant="light" />
              <LanguageToggle variant="default" />
            </div>
          </div>
        </nav>
      </header>

      <main>
        {/* ── Hero — cream #FDFBF7 ── */}
        <section id="about" className="pt-20 md:pt-36 pb-12 md:pb-20 px-5 md:px-6 relative" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="container mx-auto max-w-5xl">
            <div className="flex flex-col items-center text-center md:grid md:grid-cols-[1fr_auto] md:gap-16 md:items-center md:text-left">
              <div className="order-2 md:order-1 w-full">
                {/* Photo — mobile only */}
                <div className="flex justify-center mb-4 md:hidden">
                  <div className="relative">
                    <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                    <img src={jamesPhoto} alt="James Bugden" className="relative w-40 h-40 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                  </div>
                </div>

                <h1 className="font-heading leading-[1.12] tracking-tight mb-3 max-w-3xl mx-auto md:mx-0" style={{ color: '#1A1A1A', fontSize: 'clamp(2.25rem, 5vw, 3.5rem)', lineHeight: 1.2 }}>
                  在夢想公司拿到年薪兩百萬以上的&nbsp;Offer
                </h1>

                {/* Credential badge */}
                <div className="flex items-center justify-center md:justify-start gap-2 mb-5">
                  <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border" style={{ backgroundColor: 'rgba(43,71,52,0.06)', borderColor: 'rgba(43,71,52,0.12)', color: '#6B6B6B', fontSize: '0.9375rem' }}>
                    <Briefcase className="w-4 h-4" style={{ color: '#6B6B6B' }} />
                    Uber 資深 HR
                  </span>
                </div>

                <p className="leading-relaxed max-w-xl mx-auto md:mx-0 mb-5" style={{ color: '#1A1A1A', fontSize: '1.0625rem' }}>
                  免費工具、模板和內部策略，來自幫助 750 位以上求職者成功錄取的招募官。
                </p>

                <div className="mb-2 max-w-md mx-auto md:mx-0">
                  <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="免費獲取工具包" />
                </div>

                <p className="mb-5" style={{ color: '#6B6B6B', fontSize: '0.8125rem', marginTop: '8px' }}>
                  加入 10,000 以上位專業人士 · 永久免費 · 隨時取消訂閱
                </p>

                <div className="flex flex-wrap justify-center md:justify-start gap-x-8 gap-y-3 pt-6 border-t border-border/60">
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5" style={{ color: '#1A1A1A' }}>
                      <FileCheck className="w-5 h-5" style={{ color: '#2b4734', opacity: 0.7 }} />
                      20,000 以上
                    </span>
                    <span className="text-sm" style={{ color: '#6B6B6B' }}>份履歷審閱</span>
                  </div>
                  <div className="flex flex-col items-center md:items-start">
                    <span className="text-xl font-bold flex items-center gap-1.5" style={{ color: '#1A1A1A' }}>
                      <Users className="w-5 h-5" style={{ color: '#2b4734', opacity: 0.7 }} />
                      750 以上
                    </span>
                    <span className="text-sm" style={{ color: '#6B6B6B' }}>人成功錄取</span>
                  </div>
                </div>
              </div>

              {/* Photo — desktop only */}
              <div className="hidden md:flex justify-end order-2">
                <div className="relative">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-br from-gold/20 via-transparent to-executive-green/10 blur-xl" />
                  <img src={jamesPhoto} alt="James Bugden" className="relative w-80 h-80 lg:w-88 lg:h-88 rounded-full object-cover hero-photo-shadow" style={{ border: '3px solid #D4930D' }} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ── Logo Trust Bar ── */}
        <div style={{ backgroundColor: '#FDFBF7' }}>
          <LogoScrollExperimentZhTw />
        </div>

        {/* ── Testimonials ── */}
        <LazySection>
          <div style={{ backgroundColor: '#FFFFFF' }}>
            <HomepageTestimonialsExperimentZhTw />
          </div>
        </LazySection>

        {/* ── Sound Familiar? ── */}
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
          <div className="container mx-auto max-w-2xl text-center">
            <h2 className="font-heading mb-6" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
              聽起來很熟悉？
            </h2>

            <div className="flex flex-col gap-5 mb-8 text-left max-w-xl mx-auto">
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>你投了一堆工作，完全沒有回音。</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>你進到最終面試，然後沒有下文。沒有 Email。沒有電話。</p>
              </div>
              <div className="flex items-start gap-3">
                <X className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <p style={{ color: '#1A1A1A', fontSize: '1.125rem' }}>你拿到 Offer，但你不知道薪水合不合理，也不知道該不該再談。</p>
              </div>
            </div>

            <div className="flex items-start justify-center gap-2 mb-6">
              <CheckCircle2 className="w-5 h-5 flex-shrink-0 mt-0.5" style={{ color: '#2b4734' }} />
              <p style={{ color: '#6B6B6B', fontSize: '1rem' }}>
                你不需要另一個求職平台。你需要一個坐在桌子另一邊的人。
              </p>
            </div>

            <div className="max-w-md mx-auto">
              <MailerLiteForm formId="sM1X80" className="ml-embedded" buttonText="免費獲取工具包" />
            </div>
            <p className="text-center mt-2" style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>
              不灌水、不廢話。每週一則招募內幕策略。
            </p>
          </div>
        </section>

        {/* ── Why Work With an Insider ── */}
        <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FFFFFF' }}>
          <div className="container mx-auto max-w-4xl">
            <div className="text-center mb-6">
              <h2 className="font-heading mb-3" style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}>
                大部分的職涯建議來自沒招募過任何人的人
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-6 mb-10">
              <div className="rounded-xl p-6 text-center md:text-left" style={{ backgroundColor: '#FDFBF7', borderTop: '3px solid #D4930D' }}>
                <Eye className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2b4734' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>審閱過 20,000+ 份履歷</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  我知道什麼讓招募官停下來看。也知道什麼讓履歷 6 秒內被淘汰。不用猜，看過幾千次了。
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left" style={{ backgroundColor: '#FDFBF7', borderTop: '3px solid #D4930D' }}>
                <Users className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2b4734' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>錄取過 750+ 人</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  我坐在決定你 Offer 的會議室裡。我知道 HR 怎麼想、用人主管在意什麼，還有大部分人在哪裡少拿了錢。
                </p>
              </div>
              <div className="rounded-xl p-6 text-center md:text-left" style={{ backgroundColor: '#FDFBF7', borderTop: '3px solid #D4930D' }}>
                <Building className="w-10 h-10 mx-auto md:mx-0 mb-4" style={{ color: '#2b4734' }} strokeWidth={1.5} />
                <p className="font-bold text-[20px] mb-2" style={{ color: '#1A1A1A' }}>內部知識</p>
                <p className="text-base" style={{ color: '#1A1A1A' }}>
                  我錄取過 750 位以上的人。我知道他們怎麼面試、怎麼給薪，還有什麼讓你脫穎而出。
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── How It Works ── */}
        <LazySection>
          <SelfSegmentationExperimentZhTw />
        </LazySection>

        {/* ── Salary Proof ── */}
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
      </main>

      {/* ── Footer ── */}
      <footer className="py-8 md:py-10 px-5 md:px-6" style={{ backgroundColor: '#2b4734' }}>
        <div className="container mx-auto max-w-5xl flex flex-col items-center gap-4">
          <div className="flex items-center gap-6">
            <a href="https://www.linkedin.com/in/james-bugden/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/james.careers/" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <InstagramIcon className="w-5 h-5" />
            </a>
            <a href="https://www.threads.com/@james.careers" target="_blank" rel="noopener noreferrer" className="hover:opacity-70 transition-opacity" style={{ color: '#FFFFFF' }}>
              <ThreadsIcon className="w-5 h-5" />
            </a>
          </div>
          <span className="text-sm text-center w-full" style={{ color: '#A8B5A9' }}>
            © 2026 James Bugden. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
};

export default IndexExperimentZhTw;
