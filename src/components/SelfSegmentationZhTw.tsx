import { FileUp, Search, Trophy } from "lucide-react";

const steps = [
  {
    num: 1,
    icon: FileUp,
    headline: "上傳你的履歷",
    subtext: "把你的履歷放進免費 AI 分析器。60 秒內看到招募官看到的結果。",
  },
  {
    num: 2,
    icon: Search,
    headline: "取得你的分數和建議",
    subtext: "了解哪些有效、哪些沒用、怎麼改才能拿到更多面試。",
  },
  {
    num: 3,
    icon: Trophy,
    headline: "拿到你的理想 Offer",
    subtext: "用一份通過篩選、送到用人主管桌上的履歷去投遞。",
  },
];

export default function SelfSegmentationZhTw() {
  return (
    <section className="py-12 md:py-20 px-5 md:px-6" style={{ backgroundColor: '#FDFBF7' }}>
      <div className="container mx-auto max-w-4xl">
        <h2
          className="font-heading-cjk text-center mb-10 md:mb-14"
          style={{ color: '#1A1A1A', fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2, fontWeight: 700 }}
        >
          拿到年薪百萬以上 Offer 的 3 個步驟
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-0 relative mb-12">
          <div
            className="hidden md:block absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px]"
            style={{ backgroundColor: 'rgba(43,71,52,0.15)' }}
          />

          {steps.map((step) => {
            const Icon = step.icon;
            return (
              <div key={step.num} className="flex flex-col items-center text-center relative z-10">
                <div
                  className="w-[72px] h-[72px] rounded-full flex items-center justify-center text-2xl font-bold mb-5"
                  style={{ backgroundColor: '#2b4734', color: '#FFFFFF' }}
                >
                  {step.num}
                </div>

                {step.num < 3 && (
                  <div className="md:hidden flex justify-center -mt-2 mb-2">
                    <svg width="16" height="24" viewBox="0 0 16 24" fill="none">
                      <path d="M8 0 L8 18 M3 14 L8 20 L13 14" stroke="#2b4734" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" opacity="0.25" />
                    </svg>
                  </div>
                )}

                <Icon className="w-8 h-8 mb-4" style={{ color: '#2b4734' }} strokeWidth={1.5} />

                <p className="font-bold text-lg mb-2" style={{ color: '#1A1A1A' }}>
                  {step.headline}
                </p>
                <p className="text-base max-w-[260px]" style={{ color: '#6B6B6B' }}>
                  {step.subtext}
                </p>
              </div>
            );
          })}
        </div>

        <div className="text-center">
          <a
            href="/zh-tw/resume-analyzer"
            className="inline-flex items-center justify-center rounded-lg font-semibold transition-colors duration-200"
            style={{
              backgroundColor: '#2b4734',
              color: '#FFFFFF',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '1rem',
              fontWeight: 600,
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#3a5a45')}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#2b4734')}
          >
            立即檢測我的履歷
          </a>
          <p className="mt-2" style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>
            免費 · 不需要註冊 · 60 秒完成
          </p>
        </div>
      </div>
    </section>
  );
}
