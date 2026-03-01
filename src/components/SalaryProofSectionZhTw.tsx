import { X, CheckCircle2 } from "lucide-react";

export default function SalaryProofSectionZhTw() {
  return (
    <>
      {/* Part A — Big Impact Numbers */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
        <div className="container mx-auto max-w-3xl text-center">
          <h2
            className="font-heading mb-14"
            style={{ color: '#FBF7F0', fontSize: 'clamp(2rem, 4vw, 2.625rem)', lineHeight: 1.2 }}
          >
            數字會說話
          </h2>

          <div className="flex flex-col gap-14">
            {[
              { num: "8,000 萬+", desc: "接受第一個 Offer 和策略性談判之間的差距。30 年職涯計算。" },
              { num: "10,000+", desc: "免費工具、模板和指南的下載次數。" },
            ].map((stat) => (
              <div key={stat.num} className="flex flex-col items-center">
                <span
                  className="font-heading font-bold mb-2"
                  style={{ color: '#D4930D', fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}
                >
                  {stat.num}
                </span>
                <div className="w-16 h-[3px] rounded-full mb-4" style={{ backgroundColor: '#D4930D' }} />
                <p className="max-w-md" style={{ color: '#A8B5A9', fontSize: '1.0625rem' }}>
                  {stat.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Part B — Salary Comparison */}
      <section className="py-16 md:py-24 px-5 md:px-6" style={{ backgroundColor: '#1B3A2F' }}>
        <div className="container mx-auto max-w-3xl">
          <div className="text-center mb-10">
            <h2
              className="font-heading mb-3"
              style={{ color: '#FBF7F0', fontSize: 'clamp(1.75rem, 3.5vw, 2.25rem)', lineHeight: 1.2 }}
            >
              談判的差距有多大
            </h2>
            <p style={{ color: '#A8B5A9', fontSize: '1rem' }}>
              同樣的起薪。兩種不同策略。30 年後：
            </p>
          </div>

          {/* Comparison Cards */}
          <div className="flex flex-col gap-4 mb-8">
            {/* Card 1 — Accept First Offer */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <X className="w-5 h-5" style={{ color: '#C85A5A' }} strokeWidth={2.5} />
                <span className="font-bold" style={{ color: '#A8B5A9', fontSize: '1rem' }}>直接接受第一個 Offer</span>
              </div>
              <p className="mb-1" style={{ color: '#6B6B6B', fontSize: '0.875rem' }}>每次換工作加薪 15%</p>
              <p className="font-bold" style={{ color: '#A8B5A9', fontSize: '1.5rem' }}>7,309 萬</p>
              <p style={{ color: '#6B6B6B', fontSize: '0.8125rem' }}>30 年總計</p>
            </div>

            {/* Card 2 — Negotiate Strategically */}
            <div
              className="rounded-xl p-6"
              style={{ backgroundColor: 'rgba(45,58,46,0.5)', border: '2px solid #D4930D' }}
            >
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="w-5 h-5" style={{ color: '#4CAF50' }} />
                <span className="font-bold" style={{ color: '#FBF7F0', fontSize: '1rem' }}>策略性談判</span>
              </div>
              <p className="mb-1" style={{ color: '#A8B5A9', fontSize: '0.875rem' }}>每次換工作加薪 30%</p>
              <p className="font-bold" style={{ color: '#D4930D', fontSize: '1.5rem' }}>1 億 5,343 萬</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>30 年總計</p>
            </div>
          </div>

          {/* Big Callout */}
          <div className="text-center mb-8">
            <p
              className="font-heading font-bold"
              style={{ color: '#D4930D', fontSize: 'clamp(2rem, 5vw, 3.5rem)' }}
            >
              +8,034 萬
            </p>
            <p className="font-semibold mt-1" style={{ color: '#FBF7F0', fontSize: '1.125rem' }}>
              職涯收入多 109.9%
            </p>
          </div>

          {/* Two stat cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div
              className="rounded-xl p-5 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-bold mb-1" style={{ color: '#D4930D', fontSize: '1.25rem' }}>22.3 萬</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>每個月不談判損失的金額</p>
            </div>
            <div
              className="rounded-xl p-5 text-center"
              style={{ backgroundColor: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.08)' }}
            >
              <p className="font-bold mb-1" style={{ color: '#D4930D', fontSize: '1.25rem' }}>8,034 萬</p>
              <p style={{ color: '#A8B5A9', fontSize: '0.8125rem' }}>30 年累計少拿的金額</p>
            </div>
          </div>

          {/* Footnote */}
          <p className="text-center mb-8" style={{ color: '#6B6B6B', fontSize: '0.75rem' }}>
            以年薪 120 萬起薪、每 3 年換一次工作計算。
          </p>

          {/* CTA */}
          <div className="text-center">
            <a
              href="#about"
              className="inline-flex items-center justify-center font-semibold"
              style={{
                backgroundColor: '#D4930D',
                color: '#FFFFFF',
                padding: '16px 32px',
                borderRadius: '8px',
                fontSize: '1rem',
                fontWeight: 600,
                transition: 'background-color 0.2s ease',
              }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#E0A520')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = '#D4930D')}
            >
              免費獲取工具包
            </a>
          </div>
        </div>
      </section>
    </>
  );
}
