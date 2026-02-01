import { ArrowLeft, Download, FileText, Target, Star, MessageSquare } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const HopeChenReviewZhTw = () => {
  return (
    <div className="min-h-screen bg-background">
      <header className="bg-nav-green sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
          <Link to="/zh-tw" className="flex items-center gap-2 text-cream hover:text-gold transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="text-sm font-medium">返回首頁</span>
          </Link>
          <div className="flex items-center gap-3">
            <ReviewLanguageToggle />
            <a href="/downloads/HOPE_CHEN_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
              <Download className="w-4 h-4" />
              <span className="text-sm font-medium">下載 PDF</span>
            </a>
          </div>
        </div>
      </header>

      <section className="bg-executive-green relative py-12 sm:py-16">
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6">
          <div className="flex items-center gap-2 text-gold mb-4">
            <FileText className="w-5 h-5" />
            <span className="text-sm font-semibold tracking-wide uppercase">履歷審閱報告</span>
          </div>
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Hope Chen</h1>
          <p className="text-cream/80 text-lg">品牌與品類成長經理</p>
        </div>
      </section>

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-12">
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <Target className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">整體評估</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-8 border border-border">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground mb-1 font-semibold">整體分數</p>
                <p className="text-3xl font-bold text-gold">90/100 → 95/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={90} label="修改前" size="md" />
                <ScoreGauge score={95} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷紮實，有清晰的價值主張、強大的量化成就和良好的品牌名稱參考。設計乾淨，95% 的內容運作良好。您有效地說明工具和技能與目標職位的關聯。</p>
              <p>第一，職稱字體大小太小的小問題，在姓名下方減少了定位的視覺影響。</p>
              <p>第二，部分工作經驗要點的戰術與策略平衡問題——描述您做了什麼但沒有明確連結到更廣泛的業務目標或策略影響。</p>
              <p>第三，LinkedIn 個人資料不完整（超出本次審閱範圍），讓招募人員更難透過搜尋找到您。</p>
              <p>然而，您具備行銷經理職位所需的強大基礎資歷。您的 10 年快消品和零售經驗、預算管理、與高端品牌（adidas、Schweppes、BMW）合作、量化成就，以及從客戶執行到經理的清晰晉升都展現了能力。問題不在於您的經驗，而在於呈現和將戰術成果連結到策略成果的小修改。</p>
              <p className="text-gold font-semibold">您有經驗。現在您有定位。去拿到 offer 吧。</p>
            </div>
          </div>
        </section>

        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">您的回饋很重要</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <a href="https://tally.so/r/81L09x" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <MessageSquare className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">分享您的回饋</h3>
              </div>
              <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進服務。</p>
            </a>
            <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">在 Trustpilot 留下評論</h3>
              </div>
              <p className="text-sm text-muted-foreground">公開評論有助於建立可信度。</p>
            </a>
          </div>
        </section>
      </main>
    </div>
  );
};

export default HopeChenReviewZhTw;
