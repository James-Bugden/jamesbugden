import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import ReviewLanguageToggle from '@/components/ReviewLanguageToggle';
import ScoreGauge from '@/components/ScoreGauge';

const WillyLinReviewZhTw = () => {
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
            <a href="/downloads/WILLY_LIN_RESUME_REVIEW.pdf" download className="flex items-center gap-2 px-4 py-2 bg-gold/20 hover:bg-gold/30 text-cream rounded-lg transition-colors">
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
          <h1 className="font-heading text-4xl sm:text-5xl text-cream mb-3">Willy Lin</h1>
          <p className="text-cream/80 text-lg">AI 工程師 | NLP 工程師 | LLM 資料科學家</p>
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
                <p className="text-3xl font-bold text-gold">60/100 → 90/100</p>
                <p className="text-sm text-muted-foreground mt-1">（實施後）</p>
              </div>
              <div className="flex gap-4">
                <ScoreGauge score={60} label="修改前" size="md" />
                <ScoreGauge score={90} label="修改後" size="md" />
              </div>
            </div>
            <div className="mt-6 space-y-4 text-foreground">
              <p>您的履歷有強大的教育和技術技能區塊，但薄弱的呈現方式和展示方法不適合招募人員和用人主管。</p>
              <p><strong>第一，定位混亂</strong>——您的履歷混合 AI 工程與資料工程、資料分析和一般 ML 工作，造成不確定您實際目標是什麼職位。</p>
              <p><strong>第二，篇幅顯示判斷力不佳</strong>——您使用兩頁 13 個要點卻只有不到一年的主要經驗（兩頁應保留給有 8 年以上實質成就的專業人士）。</p>
              <p><strong>第三，全篇職責導向語言而非成果導向價值主張</strong>——您告訴雇主您負責什麼而非您達成什麼成果。</p>
              <p>然而，您具備早期職涯 AI 專業人士的基礎資歷。您的 Qwen3-8B 訓練經驗、GRPO 優化工作、多語言能力、生產部署知識，以及巴斯大學碩士學位。</p>
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於您如何呈現它。</p>
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

export default WillyLinReviewZhTw;
