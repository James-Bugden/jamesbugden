import { ArrowLeft, Download, FileText, Target, CheckCircle, XCircle, Star, MessageSquare, Zap, Calendar } from 'lucide-react';
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
        {/* 整體評估 */}
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
              <p><strong>第一，定位混亂，試圖迎合所有人</strong>——您的履歷混合 AI 工程與資料工程、資料分析和一般 ML 工作，造成不確定您實際目標是什麼職位。</p>
              <p><strong>第二，篇幅顯示判斷力不佳</strong>——您使用兩頁 13 個要點卻只有不到一年的主要經驗（兩頁應保留給有 8 年以上實質成就的專業人士）。</p>
              <p><strong>第三，全篇職責導向語言而非成果導向價值主張</strong>——您告訴雇主您負責什麼而非您達成什麼成果，沒有任何要點遵循「完成 [X] 透過 [Y] 衡量，藉由做 [Z]」的 XYZ 框架。</p>
              <p>然而，您具備早期職涯 AI 專業人士的基礎資歷。您的 Qwen3-8B 實際訓練經驗、GRPO 優化工作、多語言能力、生產部署知識，以及巴斯大學碩士學位。</p>
              <p className="text-gold font-semibold">問題不在於您的經驗，而在於您如何呈現它。</p>
            </div>
          </div>

          {/* 優點與待改進 */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-gold mb-4 flex items-center gap-2">
                <CheckCircle className="w-5 h-5" /> 表現良好的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>強大的教育基礎：</strong>巴斯大學（英國）資料科學碩士加上應用數學學士展現紮實的量化背景，教育區塊結構良好且適當</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>相關技術技能區塊：</strong>Python、PyTorch、TensorFlow、LLM 訓練框架（Axolotl）和基礎設施工具（HPC、RunPod、Vast.ai）列示清楚，技能區塊全面且組織良好</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>Qwen3-8B LLM 訓練經驗：</strong>模型訓練、微調和 GRPO 優化的直接實務經驗符合所有三個目標職位</span>
                </li>
                <li className="flex items-start gap-3">
                  <CheckCircle className="w-5 h-5 text-gold mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>台灣 AI 認證：</strong>經濟部 iPAS AI 應用規劃師認證為台灣職位（鴻海）增加本地可信度</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-card rounded-xl p-6 border border-border">
              <p className="text-sm font-semibold text-destructive mb-4 flex items-center gap-2">
                <XCircle className="w-5 h-5" /> 需要改進的部分
              </p>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>不專業的電子郵件地址：</strong>「willy1234willy123413@gmail.com」看起來不專業，應使用 firstname.lastname@gmail.com 格式（例如 willy.lin@gmail.com）</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>缺少關鍵聯絡資訊：</strong>頁首沒有電話號碼或 LinkedIn URL，招募人員需要多種聯絡方式並會在致電前查看 LinkedIn</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>基本格式沒有視覺層次：</strong>目前版面平淡，無法引導讀者注意力到您最強的資歷，需要結構幫助招募人員有效掃描</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>摘要是職責導向而非成果導向：</strong>您告訴雇主您做了什麼而非達成的可衡量成果，沒有指標、沒有成果、沒有影響力證明</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>令人困惑的職稱：</strong>「AI 工程師 – 大型語言模型與資料管線」：為什麼要結合兩者？這造成定位混亂，每個申請選擇一個主要身分</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>不到 12 個月職位用 13 個要點太多：</strong>更多要點 = 更弱的影響力。只保留 4-5 個與目標職位最相關的要點</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>全篇職責導向語言：</strong>要點描述職責（「領導並執行」、「設計並交付」）而非達成的成果，需要使用 XYZ 框架完全重寫</span>
                </li>
                <li className="flex items-start gap-3">
                  <XCircle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
                  <span className="text-foreground"><strong>分開的「實習經驗」區塊：</strong>應合併到一般「經驗」區塊，而非隔離</span>
                </li>
              </ul>
            </div>
          </div>

          {/* 總覽表格 */}
          <div className="bg-card rounded-xl p-6 mb-8 border border-border overflow-x-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">目前狀態 vs. 最佳狀態</h3>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-border">
                  <th className="text-left py-2 text-foreground">元素</th>
                  <th className="text-left py-2 text-muted-foreground">目前狀態</th>
                  <th className="text-left py-2 text-gold">最佳狀態</th>
                  <th className="text-center py-2 text-foreground">優先級</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">聯絡資訊</td>
                  <td className="py-2 text-muted-foreground">不專業的電子郵件，缺少電話和 LinkedIn</td>
                  <td className="py-2 text-foreground">willy.lin@gmail.com + 電話號碼 + LinkedIn URL</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">角色定位</td>
                  <td className="py-2 text-muted-foreground">「AI 工程師 – 大型語言模型與資料管線」造成身分混亂</td>
                  <td className="py-2 text-foreground">每個申請選擇一個：「AI 工程師」或「NLP 工程師」或「LLM 資料科學家」</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">履歷長度</td>
                  <td className="py-2 text-muted-foreground">不到 1 年主要經驗用 2 頁顯示判斷力不佳</td>
                  <td className="py-2 text-foreground">最多 1 頁，強制優先選擇最高影響力內容</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">摘要導向</td>
                  <td className="py-2 text-muted-foreground">職責導向（「專精於」、「實務經驗交付」）沒有量化成果</td>
                  <td className="py-2 text-foreground">成果導向帶指標：處理的 token 量、模型效能改善、部署速度</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr className="border-b border-border">
                  <td className="py-2 text-foreground font-semibold">要點數量</td>
                  <td className="py-2 text-muted-foreground">單一 9 個月職位 13 個要點稀釋影響力</td>
                  <td className="py-2 text-foreground">只保留 4-5 個最高影響力要點，每個遵循 XYZ 框架</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
                <tr>
                  <td className="py-2 text-foreground font-semibold">要點結構</td>
                  <td className="py-2 text-muted-foreground">職責導向語言（「領導並執行」、「設計並交付」）沒有可衡量成果</td>
                  <td className="py-2 text-foreground">XYZ 框架：完成 [X] 透過 [Y] 衡量，藉由做 [Z]</td>
                  <td className="py-2 text-center"><span className="text-destructive font-semibold">高</span></td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* 關鍵改進說明 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
              <Zap className="w-5 h-5 text-destructive" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">關鍵改進說明</h2>
          </div>

          <p className="text-lg text-muted-foreground mb-8">
            我們找出 12 項策略性轉變，以最佳方式為您定位目標職位。以下是影響最大的改變：
          </p>

          {/* 改進 #1 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#1 壓縮至一頁</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">移除 8 個以上要點並消除空白，壓縮至一頁</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（篇幅顯示判斷力不佳）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>不到 1 年經驗用兩頁是警訊：招募人員期望 0-8 年經驗用 1 頁；兩頁顯示您無法優先排序或編輯</p>
                  <p>13 個要點稀釋您最強的成就：每增加一個要點都會減少您最佳工作的影響力，招募人員會略過或完全跳過</p>
                  <p>許多要點是冗餘的：資料管線要點重複類似資訊；基礎設施要點重疊；多模態整合提及兩次</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化經驗區塊：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm">
                  <p className="font-bold">經驗</p>
                  <p className="font-semibold mt-2">萬達 AI 科技有限公司 | 台北，台灣</p>
                  <p className="text-muted-foreground">AI 工程師 | 2025 年 4 月至今</p>
                  <ul className="mt-2 space-y-2 text-foreground list-disc ml-4">
                    <li>透過 GRPO 強化學習與基於評分標準的獎勵建模，訓練並優化 Qwen3-8B LLM 用於多語言對話 AI（中/英/日），處理 200 億預訓練 token 和 60-70 億微調 token，在角色一致性和幻覺率方面達成 [X]% 改善</li>
                    <li>使用 Python 多執行緒和 JSON/JSONL 正規化建立生產級資料管線，每月處理 5 億+ token，減少 [X]% 資料準備時間並實現 3 倍更快的訓練迭代週期</li>
                    <li>使用 Go + LibTorch + gRPC 部署低延遲嵌入推論服務，減少 [X]ms 模型初始化開銷並支援 1000+ QPS 的生產虛擬助理平台即時 RAG 檢索</li>
                    <li>建立 LLM 評估框架，針對 ChatGPT API 基準測試 RAG 能力、多輪對話一致性和主動回應行為，找出 [X] 個關鍵改進領域引導 GRPO 優化優先順序</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>一頁強制優先選擇只有您最高影響力、最相關的工作</li>
                <li>4-5 個要點聚焦於直接證明您能在目標職位成功的成就</li>
                <li>每個要點遵循 XYZ 框架：完成 [X] 透過 [Y] 衡量，藉由做 [Z]，展示成果而非職責</li>
                <li>統一的經驗區塊消除「工作」和「實習」之間的人為分割</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：一頁履歷展現判斷力，強迫您只闡述最強的價值主張，並確保招募人員真正閱讀您的內容而非略過或跳過。</p>
            </div>
          </div>

          {/* 改進 #2 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-destructive/10 text-destructive text-xs font-bold rounded-full uppercase tracking-wide">#2 重寫摘要</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">將摘要從職責導向重寫為成果導向，並有清晰角色身分</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（說您做了什麼，而非達成什麼）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>第一行造成身分混亂：「擁有資料科學碩士學位的 AI 工程師」，您的學位是職稱嗎？這讓人不清楚您實際目標是什麼職位</p>
                  <p>零量化成果：沒有指標、沒有成果、沒有影響力證明，只有您「專精於」和「有經驗」的領域清單</p>
                  <p>密集段落一眼無法閱讀：一個 100+ 字的文字區塊違背摘要的目的，招募人員不會讀這個</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - AI 工程師：</p>
                <p className="text-foreground text-sm italic">「擁有 9 個月專業生產 LLM 訓練經驗的 AI 工程師，包括透過 GRPO 強化學習達成 [X]% 角色一致性改善的 Qwen3-8B 模型優化。建立處理 260-270 億 token 的多語言訓練（中/英/日）資料管線，並部署支援 1000+ QPS 生產 RAG 檢索的低延遲嵌入服務。巴斯大學（英國）資料科學碩士，專精於 PyTorch、Transformers 和基於 HPC 的模型訓練基礎設施。」</p>
              </div>

              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本 - NLP 工程師：</p>
                <p className="text-foreground text-sm italic">「專精於多語言 LLM 開發的 NLP 工程師，擁有 9 個月為中/英/日對話 AI 微調 Qwen3-8B 並透過 GRPO 優化達成 [X]% 多輪對話一致性改善的經驗。使用自動化資料清洗、去重和綱要驗證建立每月處理 5 億+ token 的生產 NLP 管線，實現 3 倍更快的訓練週期。巴斯大學（英國）資料科學碩士，專精於文字處理、transformer 架構和模型評估框架。」</p>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>開頭清晰角色身分：「AI 工程師」或「NLP 工程師」（不同時用兩個），移除所有定位混亂</li>
                <li>量化經驗優先：「9 個月專業生產 LLM 訓練經驗」設定務實期望同時強調深度</li>
                <li>三個具體、可衡量的成就：Token 量、效能改善、效率提升，證明您交付成果</li>
                <li>策略關鍵字載入：Qwen3-8B、GRPO、多語言、PyTorch、Transformers、HPC，命中主要 ATS 要求</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：摘要是履歷上最重要的 60 個字，它決定招募人員是否繼續閱讀。帶有清晰定位和量化成就的成果導向摘要讓他們想繼續讀下去。</p>
            </div>
          </div>

          {/* 改進 #3 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-yellow-500/20 text-yellow-700 text-xs font-bold rounded-full uppercase tracking-wide">#3 將所有要點轉換為 XYZ 框架</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">將所有要點轉換為 XYZ 框架（完成 [X] 透過 [Y] 衡量，藉由做 [Z]）</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（職責導向語言）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>每個要點都是職責導向：「領導並執行」、「設計並交付」、「擁有」、「建立」、「實施」，全部描述職責而非成果</p>
                  <p>零可衡量成果：沒有效能改善、沒有效率提升、沒有商業影響指標</p>
                  <p>「顯著減少」毫無意義：多少？10%？50%？90%？模糊的形容詞什麼都證明不了</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本（XYZ 框架）：</p>
                <ul className="text-foreground text-sm space-y-3 list-disc ml-4">
                  <li>透過實施使用 Qwen-14B 獎勵模型和三個針對幻覺減少、上下文一致性和主動參與的自訂評分標準評估提示的 GRPO 強化學習，將 Qwen3-8B 多語言用例（中/英/日）的對話品質改善 [X]%，以角色一致性和回應適當性的人類評估分數衡量</li>
                  <li>透過建立自動化生成、清洗、去重和 JSON/JSONL 驗證的 Python 多執行緒資料管線（260-270 億 token，200 億預訓練 + 60-70 億微調），將 LLM 訓練迭代時間減少 [Y]%（從 [A] 天減至每週期 [B] 天），實現 3 倍更快的模型實驗</li>
                  <li>透過開發使用 LibTorch 和 gRPC 的 Go 語言嵌入服務（消除 Python 解譯器開銷並啟用並發請求處理），將嵌入推論延遲減少 [Z]ms（達成 {'<'}[X]ms 第 95 百分位），支援生產 RAG 檢索每秒 1000+ 查詢</li>
                </ul>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>清晰的 [X] 成果首先陳述：您完成了什麼，帶有具體指標</li>
                <li>提供可衡量的 [Y] 證明：您如何量化改善，百分比、時間節省、延遲減少</li>
                <li>解釋具體的 [Z] 方法：您實際做了什麼來達成成果，工具、技術、方法</li>
                <li>商業背景清晰：為什麼這很重要，更快迭代、更低延遲、更好 ROI</li>
              </ul>
              <div className="mt-4 p-3 bg-gold/10 rounded-lg">
                <p className="text-sm text-foreground"><strong>注意：</strong>您需要新增實際指標（用括號標記如 [X]%、[Y] 天、[Z]ms）。如果沒有確切數字，使用基於觀察的保守估計：「大約快 40%」、「從 7 天減至 5 天」、「達成 {'<'}50ms p95 延遲」。絕不捏造，但要量化。</p>
              </div>
              <p className="mt-4 text-sm font-semibold text-gold">影響：XYZ 框架將職責清單轉化為能力證明。招募人員和用人主管想知道您能為他們交付什麼成果，這個結構直接回答那個問題。</p>
            </div>
          </div>

          {/* 改進 #4 */}
          <div className="bg-card rounded-xl p-6 mb-6 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <span className="px-3 py-1 bg-green-500/20 text-green-700 text-xs font-bold rounded-full uppercase tracking-wide">#4 合併實習經驗</span>
            </div>
            <h3 className="font-heading text-2xl text-foreground mb-4">將「實習經驗」合併到主要「經驗」區塊</h3>
            
            <div className="space-y-4 mb-6">
              <div className="bg-destructive/5 rounded-lg p-4 border-l-4 border-destructive">
                <p className="text-sm font-semibold text-destructive mb-2">目前版本（人為分割）：</p>
                <div className="mt-3 space-y-2 text-sm text-foreground">
                  <p>分開區塊造成分割：通過隔離實習讓您的時間軸看起來人為單薄</p>
                  <p>「實習經驗」聽起來資淺：專業履歷使用統一的「經驗」區塊</p>
                  <p>浪費垂直空間：區塊標題在一頁履歷上消耗寶貴行數</p>
                </div>
              </div>
              
              <div className="bg-gold/10 rounded-lg p-4 border-l-4 border-gold">
                <p className="text-sm font-semibold text-gold mb-2">優化版本：</p>
                <div className="bg-muted/30 rounded p-3 mt-2 text-sm">
                  <p className="font-bold">經驗</p>
                  <p className="font-semibold mt-2">萬達 AI 科技有限公司 | 台北，台灣</p>
                  <p className="text-muted-foreground">AI 工程師 | 2025 年 4 月至今</p>
                  <p className="text-foreground mt-1">[4-5 個使用 XYZ 框架的優化要點]</p>
                  <p className="font-semibold mt-4">資料分析培訓計畫 | 台灣</p>
                  <p className="text-muted-foreground">資料分析實習生 | 2024 年 12 月 – 2025 年 3 月</p>
                  <p className="text-foreground mt-1">[1-2 個使用 XYZ 框架展示商業影響的優化要點]</p>
                </div>
              </div>
            </div>

            <div className="bg-muted/30 rounded-lg p-4">
              <p className="text-sm font-semibold text-foreground mb-2">為什麼有效：</p>
              <ul className="text-sm text-foreground space-y-1">
                <li>統一區塊看起來更充實：所有經驗水準的專業標準</li>
                <li>節省垂直空間：消除冗餘區塊標題，釋放行數用於內容</li>
                <li>清晰的反向時間順序：最近職位優先，然後是實習，自然的閱讀流程</li>
                <li>實習沒有被隱藏：仍然清楚標示日期，只是不在分開區塊中隔離</li>
              </ul>
              <p className="mt-4 text-sm font-semibold text-gold">影響：小的結構改變消除業餘的分割並使您的時間軸看起來更連貫。</p>
            </div>
          </div>
        </section>

        {/* 下一步 */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-gold" />
            </div>
            <h2 className="font-heading text-3xl text-foreground">下一步行動</h2>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">1</div>
              <h3 className="font-heading text-xl text-foreground">修正格式和基本資訊</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">修正聯絡資訊（15 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>將電子郵件改為 willy.lin@gmail.com 或類似專業格式</li>
                  <li>新增電話號碼：+886-XXX-XXX-XXX</li>
                  <li>新增 LinkedIn URL：linkedin.com/in/willylin（如果沒有請建立）</li>
                </ul>
              </div>
              <div>
                <p className="font-semibold">選擇目標角色並建立聚焦版本（30 分鐘）</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>決定三個職位中哪個是主要目標（建議：鴻海 NLP 工程師）</li>
                  <li>更新職稱行以匹配：「NLP 工程師」或「AI 工程師」或「LLM 資料科學家」</li>
                  <li>完全移除副標題「大型語言模型與資料管線」</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">2</div>
              <h3 className="font-heading text-xl text-foreground">將所有要點轉換為 XYZ 框架</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">重寫每個保留的要點（4-5 個要點 90 分鐘）</p>
                <p className="text-muted-foreground mt-1">對每個要點回答：</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li>[X] = 您完成了什麼？（成果）</li>
                  <li>[Y] = 您如何衡量？（指標）</li>
                  <li>[Z] = 您如何做到？（方法）</li>
                </ul>
                <p className="text-gold mt-2">格式：完成 [X] 透過 [Y] 衡量，藉由做 [Z]</p>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">3</div>
              <h3 className="font-heading text-xl text-foreground">為三種角色類型建立三個客製化版本</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <p className="text-muted-foreground">您不能用一份履歷申請所有三個職位。建立三個版本：</p>
              <div className="grid md:grid-cols-3 gap-4 mt-3">
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">版本 A：NLP 工程師（鴻海）</p>
                  <p className="text-xs text-muted-foreground">主要建議</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>職稱：「NLP 工程師」</li>
                    <li>技能：新增 SpaCy、NLTK、Gensim、Word2Vec、文本分類、NER</li>
                    <li>摘要重點：多語言 NLP、文字處理</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">版本 B：LLM 資料科學家（RAG 職位）</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>職稱：「LLM 資料科學家」或「GenAI 工程師」</li>
                    <li>技能：新增 LangChain（學習中）、RAG、LlamaIndex（熟悉）、Azure OpenAI（熟悉）</li>
                    <li>摘要重點：RAG 系統、知識檢索、評估</li>
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="font-semibold text-gold">版本 C：AI 工程師（微軟）</p>
                  <ul className="text-muted-foreground mt-2 text-xs space-y-1 list-disc ml-3">
                    <li>職稱：「AI 工程師」</li>
                    <li>技能：強調 ML 系統、模型服務</li>
                    <li>摘要重點：LLM 訓練、優化、大規模系統</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">4</div>
              <h3 className="font-heading text-xl text-foreground">申請 5-10 個目標職位</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <p className="text-muted-foreground">履歷優化後：</p>
              <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                <li>從鴻海 NLP 工程師職位開始（最強適配）</li>
                <li>申請台灣科技公司的類似 NLP/LLM 職位</li>
                <li>為每種職位類型使用客製化版本</li>
                <li>在試算表中追蹤申請</li>
              </ul>
            </div>
          </div>

          <div className="bg-card rounded-xl p-6 mb-4 border border-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center text-gold font-bold">5</div>
              <h3 className="font-heading text-xl text-foreground">使用 STAR 方法準備面試故事</h3>
            </div>
            <div className="space-y-3 text-sm text-foreground ml-11">
              <div>
                <p className="font-semibold">為每個主要成就：</p>
                <p className="text-muted-foreground mt-1">準備 2-3 分鐘的 STAR 框架故事：</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>情境：</strong>背景/問題是什麼？</li>
                  <li><strong>任務：</strong>您的具體職責是什麼？</li>
                  <li><strong>行動：</strong>您做了什麼？（逐步）</li>
                  <li><strong>結果：</strong>發生了什麼？（量化成果）</li>
                </ul>
              </div>
              <div className="bg-muted/30 rounded-lg p-3 mt-3">
                <p className="font-semibold text-foreground">您的 Qwen3-8B GRPO 優化工作範例：</p>
                <ul className="text-muted-foreground mt-1 ml-4 list-disc">
                  <li><strong>情境：</strong>Qwen3-8B 基礎模型有不一致的角色遵循和偶爾的幻覺</li>
                  <li><strong>任務：</strong>改善生產虛擬助理平台的對話品質</li>
                  <li><strong>行動：</strong>使用 Qwen-14B 獎勵模型和三個針對幻覺、一致性、角色的自訂評分標準實施 GRPO</li>
                  <li><strong>結果：</strong>人類評估分數達成 23% 改善，幻覺率減少 18%，實現生產部署</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* 最後想法 */}
        <section className="mb-16">
          <div className="bg-executive-green rounded-xl p-8 text-cream">
            <h2 className="font-heading text-2xl mb-4">最後想法</h2>
            <div className="space-y-4 text-cream/90">
              <p>您的經驗對早期職涯 AI 專業人士來說是出色的。</p>
              <p>您之前的履歷沒有有效地講述這個故事。它將您最強的成就埋在 13 個職責描述要點下，用混合定位混淆招募人員，並且沒有量化任何成果。</p>
              <p>您的新履歷將展示讓您有價值的確切因素：您可以訓練生產 LLM、透過 GRPO 優化它們、大規模部署它們，並交付可衡量的改善。</p>
              <p className="text-gold font-semibold text-lg">您有經驗。現在您有定位。去拿到 offer 吧。</p>
              <p className="text-xl">祝好運！🚀</p>
            </div>
          </div>
        </section>

        {/* 回饋區塊 */}
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
              <p className="text-sm text-muted-foreground">您誠實的回饋幫助我改進服務。我會閱讀每一則回覆並持續優化我的方法。</p>
            </a>
            <a href="https://www.trustpilot.com/review/jamesbugden.com" target="_blank" rel="noopener noreferrer" className="block p-6 rounded-xl border-2 border-gold bg-gradient-to-br from-background to-card hover:shadow-lg transition-shadow">
              <div className="flex items-center gap-3 mb-3">
                <Star className="w-6 h-6 text-gold" />
                <h3 className="font-semibold text-foreground">在 Trustpilot 留下評論</h3>
              </div>
              <p className="text-sm text-muted-foreground">公開評論有助於建立可信度，幫助其他專業人士做出明智的決定。</p>
            </a>
          </div>

          <div className="mt-6 p-4 bg-muted/30 rounded-xl">
            <p className="text-sm text-muted-foreground">
              <strong>為什麼 Trustpilot 分數是 3.8？</strong>我剛開始新事業，Trustpilot 對新企業會套用初始權重，這可能暫時降低早期分數。隨著更多真實客戶評論的加入，分數會調整以反映實際服務品質。
            </p>
          </div>
        </section>
      </main>

      <footer className="bg-nav-green py-8">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 text-center">
          <p className="text-cream/60 text-sm">
            © 2025 James Bugden. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WillyLinReviewZhTw;