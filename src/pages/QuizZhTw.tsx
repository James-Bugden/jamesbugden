import { useState, useEffect, useCallback, useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Check, Copy, Linkedin, Users } from "lucide-react";
import LanguageToggle from "@/components/LanguageToggle";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
} from "recharts";
import { SEO } from "@/components/SEO";
import { syncToMailerLite } from "@/lib/mailerlite";

/* ─── types ─── */
type Screen = "intro" | "questions" | "email" | "results" | "results-minimal";

interface Question {
  dimension: string;
  label: string;
  text: string;
  options: { text: string; score: number }[];
}

/* ─── data ─── */
const questions: Question[] = [
  {
    dimension: "英語能力",
    label: "英語能力 · Q1",
    text: "你的主管要求你下週用英文向亞太團隊報告專案進度。你的感受是？",
    options: [
      { text: "有信心——我做過很多次了", score: 10 },
      { text: "有點緊張但應該可以應付", score: 7 },
      { text: "我需要把每個字都寫成逐字稿", score: 4 },
      { text: "我會想辦法讓別人代替我報告", score: 1 },
    ],
  },
  {
    dimension: "履歷準備度",
    label: "履歷準備度 · Q2",
    text: "以下哪個最能描述你目前的履歷？",
    options: [
      { text: "一頁式、以量化成果為主，英文版本已準備好", score: 10 },
      { text: "還可以，但主要是列出工作職責，沒有英文版", score: 6 },
      { text: "多頁、以職責描述為主，超過 6 個月沒更新", score: 3 },
      { text: "我還沒有準備好的履歷", score: 1 },
    ],
  },
  {
    dimension: "面試準備",
    label: "面試準備 · Q3",
    text: "面試官問你：「請分享一次你不同意團隊決定的經驗。」你的反應是？",
    options: [
      { text: "我有準備好的結構化故事，包含情境、行動和結果", score: 10 },
      { text: "我可以想出一些東西，但不會很精練", score: 6 },
      { text: "我會很掙扎——我從沒準備過這類問題", score: 3 },
      { text: "我只做過技術面試或傳統的問答式面試", score: 1 },
    ],
  },
  {
    dimension: "文化適配度",
    label: "文化適配度 · Q4",
    text: "當工作上有不清楚的地方，你通常會...",
    options: [
      { text: "直接問，即使對方是主管也一樣", score: 10 },
      { text: "先等一下自己想辦法，卡住了再問", score: 7 },
      { text: "請同事代替我去問", score: 4 },
      { text: "等對方來澄清", score: 1 },
    ],
  },
  {
    dimension: "薪資知識",
    label: "薪資知識 · Q5",
    text: "你知道如何評估整體薪酬方案——而不只是月薪嗎？",
    options: [
      { text: "知道——我能比較底薪、獎金、股票、福利和簽約金", score: 10 },
      { text: "我會看月薪和年終獎金", score: 6 },
      { text: "我主要只比較月薪數字", score: 3 },
      { text: "公司給什麼我就接受", score: 1 },
    ],
  },
  {
    dimension: "職業能見度",
    label: "職業能見度 · Q6",
    text: "你的英文 LinkedIn 活躍程度如何？",
    options: [
      { text: "英文檔案已優化，經常互動，且已有目標公司的人脈", score: 10 },
      { text: "有英文檔案但很少主動使用", score: 6 },
      { text: "檔案主要是中文，很少使用", score: 3 },
      { text: "我幾乎不用 LinkedIn", score: 1 },
    ],
  },
];

/* ─── feedback lookup ─── */
const feedback: Record<string, Record<number, string>> = {
  "英語能力": {
    10: "你的英語口說能力很強，這讓你領先台灣大多數的求職者。有一件事可以加強：閱讀目標公司的英文部落格或新聞稿，這能讓你聽起來像已經在那裡工作的人。",
    7: "你的英語能應付日常溝通，但簡報和多輪面試會比較吃力。建議養成一個簡單的習慣：每週用英文錄一段 3 分鐘的工作近況更新，然後播放回來聽。大多數人一旦聽到自己的錄音，進步就會很快。",
    4: "目前你在說英文之前，腦中會先從中文翻譯過去。這很正常，但會拖慢你的速度。找一個每週的英語口說練習團體，像是 Toastmasters Taipei。你需要的是用英文思考的練習，而不只是閱讀。",
    1: "英語是你目前最大的差距，但也是最容易改善的。從每天 30 分鐘開始：聽一集商業英語 Podcast，然後大聲複述你聽到的內容。試試 'All Ears English' 或 'Business English Pod'。持續三個月就會有巨大的改變。",
  },
  "履歷準備度": {
    10: "你的履歷格式很紮實。你這個程度最常犯的錯誤是：每家公司都用同一份履歷。每次投遞花 15 分鐘，把你的重點項目對齊職缺描述中的關鍵字。這樣才能通過 ATS 篩選和招募人員的快速瀏覽。",
    6: "你的履歷列出了你做過什麼，但外商想看到的是因為你而產生了什麼成果。把你最重要的 5 項工作職責改寫成這樣：「做了 X，因此達成了 Y，用 Z 來衡量。」例如：「主導微服務遷移，將部署時間縮短 60%，影響 3 個團隊。」數字是讓你從「也許」變成「邀請面試」的關鍵。",
    3: "外商的履歷規則跟台灣式履歷不同。關鍵改變：一頁、不放照片、不寫年齡或婚姻狀況等個人資料、全英文。每個重點項目都要附上數字。這一個改變——修正履歷格式——通常是投報率最高的事。",
    1: "從簡單的開始。打開一份空白文件，寫下你最重要的 5 個工作成就，那些你有數字可以證明的（營收、用戶數、節省時間、團隊規模）。這些就是你的履歷重點。一頁，每個職位 3-5 個重點，每行都要有數字。這就是外商招募人員期待的格式。",
  },
  "面試準備": {
    10: "你了解行為面試的運作方式，這讓你領先台灣 80% 的求職者。現在可以更深入：在 Glassdoor 和 Blind 上查找目標公司的面試題目，針對他們的具體問題準備故事，而不是通用型的。",
    6: "你有基本概念，但沒有打磨過的回答每次都會輸給準備好的人。用 STAR 格式寫出 8-10 個故事，涵蓋這些主題：衝突、失敗、領導力、在資訊不明確時工作、以及跨團隊合作。每個故事大聲練習到能在 2 分鐘內講完為止。",
    3: "行為面試（「請分享一次你曾經...」）是每家外商的標準面試方式。它測試的是你如何思考和表達，而不是你知道什麼。學習 STAR 方法：情境（Situation）、任務（Task）、行動（Action）、結果（Result）。準備 5 個來自你工作經驗的真實故事，找一個會給你誠實回饋的朋友一起練習。",
    1: "外商面試和你之前經歷的不一樣。你會遇到像「請分享一次你失敗的經驗」和「你如何處理意見不同的情況」這樣的問題。這是一個可以學會的技能，不是與生俱來的天賦。在 YouTube 搜尋「STAR method interview」，大聲練習回答——不要只在腦中想。",
  },
  "文化適配度": {
    10: "你直接的溝通風格正是外商想要的。在面試中，舉出你曾經反對某個決定、提早提出問題、或挑戰某個假設的例子。這些故事展現的是用人主管最看重的主人翁心態。",
    7: "你的直覺不錯。需要調整的是：在外商，提問不是軟弱的表現，而是被期待的。試試看：這週在每個會議中都問一個釐清問題，即使你覺得自己已經理解了。先在低風險的場合中建立這個習慣。",
    4: "透過同事去問資深同仁問題，在台灣是很正常的。但在外商，這會被視為不夠直接。試試看：下次你有問題要問資深的人時，直接傳訊息給他們。大多數外商主管更喜歡直接溝通，因為這幫他們節省時間。",
    1: "這是台灣專業人士轉向外商時最大的文化轉變。扁平化的溝通取代了層級制度。先從觀察開始：在 LinkedIn 上追蹤你目標公司的 5-10 位員工，注意他們怎麼寫文章。直接、簡短、明確表達觀點。這就是你正在學習的風格。",
  },
};

function getCompPresenceFeedback(avg: number): string {
  if (avg >= 8) return "你了解整體薪酬結構，而且在 LinkedIn 上有能見度。很強的組合。當你拿到 offer 時，要求看完整的明細：底薪、獎金、股票歸屬時程、簽約金、福利。逐項比較。大多數第一次的 offer 都有 10-20% 的談判空間。";
  if (avg >= 5) return "你有一些認知但仍有差距，而這些差距會讓你損失金錢。兩件事要改善。第一：了解股票歸屬如何運作。4 年的股票授予加上 1 年的等待期（cliff），意味著如果你在第 11 個月離職，你什麼都拿不到。第二：把你的 LinkedIn 切換成英文，寫一個清楚的標題說明你的專長，然後開始在目標公司員工的貼文下留言互動。";
  if (avg >= 3) return "你正在讓到手的錢溜走，而且獵頭也找不到你。外商的薪資包括底薪、獎金、股票、簽約金和福利。光看月薪通常只佔總薪酬的 60%。而獵頭每天都在 LinkedIn 上搜尋候選人。如果你的檔案是中文或空白的，他們永遠找不到你。兩個問題都要解決。";
  return "有兩個大差距要彌補。第一：外商的實際總薪酬比底薪數字高 30-50%。如果你只比較月薪，你會誤判每一個 offer。第二：LinkedIn 是外商獵頭在台灣找人的方式，不是可有可無的。這週就建立一個英文檔案，加上清楚的標題、你最重要的 3 個成就，和一張專業照片。";
}

/* ─── bracket helpers ─── */
function getBracket(score: number) {
  if (score >= 50) return { label: "強勢候選人", color: "#05944F", summary: "你已準備好了——專注於鎖定對的公司和薪資談判。" };
  if (score >= 35) return { label: "即將到位", color: "#C9A961", summary: "你很接近了。幾個有針對性的改善就能帶來很大的差異。" };
  if (score >= 20) return { label: "打好基礎", color: "#E68A00", summary: "你有真正的潛力。一個結構化的計畫可以讓你在 2-3 個月內達標。" };
  return { label: "起步階段", color: "#C75146", summary: "每個人都有起點。先從英語和履歷開始，然後逐步建立。" };
}

/* ─── component ─── */
export default function QuizZhTw() {
  const [screen, setScreen] = useState<Screen>("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>(Array(6).fill(null));
  const [email, setEmail] = useState("");
  const [emailSubmitted, setEmailSubmitted] = useState(false);
  const [emailError, setEmailError] = useState("");
  const [copied, setCopied] = useState(false);
  const [animateRing, setAnimateRing] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const totalScore = answers.reduce<number>((s, a) => s + (a ?? 0), 0);
  const bracket = getBracket(totalScore);

  const compPresenceAvg = ((answers[4] ?? 0) + (answers[5] ?? 0)) / 2;
  const radarData = [
    { axis: "英語", value: answers[0] ?? 0, fullMark: 10 },
    { axis: "履歷", value: answers[1] ?? 0, fullMark: 10 },
    { axis: "面試", value: answers[2] ?? 0, fullMark: 10 },
    { axis: "文化適配", value: answers[3] ?? 0, fullMark: 10 },
    { axis: "薪資與能見度", value: compPresenceAvg, fullMark: 10 },
  ];

  const dimensions = [
    { name: "英語能力", score: answers[0] ?? 0, fb: feedback["英語能力"][answers[0] ?? 1] },
    { name: "履歷準備度", score: answers[1] ?? 0, fb: feedback["履歷準備度"][answers[1] ?? 1] },
    { name: "面試準備", score: answers[2] ?? 0, fb: feedback["面試準備"][answers[2] ?? 1] },
    { name: "文化適配度", score: answers[3] ?? 0, fb: feedback["文化適配度"][answers[3] ?? 1] },
    { name: "薪資與能見度", score: compPresenceAvg, fb: getCompPresenceFeedback(compPresenceAvg) },
  ];

  const selectAnswer = useCallback(
    (score: number) => {
      const next = [...answers];
      next[currentQ] = score;
      setAnswers(next);

      if (timerRef.current) clearTimeout(timerRef.current);
      timerRef.current = setTimeout(() => {
        if (currentQ < 5) {
          setCurrentQ((q) => q + 1);
        } else {
          setScreen("email");
        }
      }, 500);
    },
    [currentQ, answers]
  );

  const goBack = () => {
    if (timerRef.current) clearTimeout(timerRef.current);
    if (currentQ === 0) {
      setScreen("intro");
    } else {
      setCurrentQ((q) => q - 1);
    }
  };

  const handleEmailSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setEmailError("請輸入有效的電子郵件地址。");
      return;
    }
    setEmailError("");
    syncToMailerLite(email.trim());
    setEmailSubmitted(true);
    setTimeout(() => setScreen("results"), 800);
  };

  useEffect(() => {
    if (screen === "results") {
      requestAnimationFrame(() => setAnimateRing(true));
    }
  }, [screen]);

  const quizUrl = "https://jamesbugden.lovable.app/zh-tw/quiz";
  const shareLinkedIn = () => window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(quizUrl)}`, "_blank");
  const copyLink = () => {
    navigator.clipboard.writeText(quizUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  /* ─── screen renders ─── */

  const renderIntro = () => (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FBF7F0" }}>
      <nav className="px-5 py-4 flex items-center justify-between">
        <Link to="/zh-tw" className="font-heading text-lg font-bold tracking-wide" style={{ color: "#1B3A2F" }}>
          JAMES BUGDEN
        </Link>
        <LanguageToggle variant="nav" />
      </nav>

      <div className="flex-1 flex flex-col items-center justify-center px-5 pb-16 text-center">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-4" style={{ color: "#1B3A2F", lineHeight: 1.12, letterSpacing: "-0.02em" }}>
          你準備好進外商了嗎？
        </h1>
        <p className="text-base md:text-lg mb-10 max-w-md" style={{ color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
          2 分鐘測驗，了解你的準備程度並獲得個人化行動計畫。
        </p>

        {/* decorative radar outline */}
        <div className="w-56 h-56 md:w-64 md:h-64 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="60%" data={[
              { axis: "英語", value: 0, fullMark: 10 },
              { axis: "履歷", value: 0, fullMark: 10 },
              { axis: "面試", value: 0, fullMark: 10 },
              { axis: "文化適配", value: 0, fullMark: 10 },
              { axis: "薪資與能見度", value: 0, fullMark: 10 },
            ]}>
              <PolarGrid stroke="#E5E5E5" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
              <Radar dataKey="value" stroke="#C9A961" fill="transparent" strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        <button
          onClick={() => { setScreen("questions"); setCurrentQ(0); }}
          className="h-12 px-8 rounded-lg text-base font-semibold transition-transform hover:scale-[1.02]"
          style={{ backgroundColor: "#C9A961", color: "#1B3A2F" }}
        >
          開始測驗
        </button>
        <p className="text-xs mt-3" style={{ color: "#1A1A1A", opacity: 0.5 }}>
          免費 · 6 題 · 只需 2 分鐘
        </p>
        <div className="flex items-center gap-2 text-sm mt-5" style={{ color: "#1A1A1A", opacity: 0.6 }}>
          <Users className="w-4 h-4 flex-shrink-0" style={{ color: "#C9A961" }} />
          <span>1,200+ 位專業人士已完成此測驗</span>
        </div>
      </div>
    </div>
  );

  const renderQuestions = () => {
    const q = questions[currentQ];
    const progress = ((currentQ + 1) / 6) * 100;
    return (
      <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FBF7F0" }}>
        <div className="px-5 py-4 flex items-center gap-3">
          <button onClick={goBack} className="p-2 -ml-2 rounded-full hover:bg-black/5 transition-colors" aria-label="返回">
            <ArrowLeft className="w-5 h-5" style={{ color: "#1B3A2F" }} />
          </button>
          <div className="flex-1">
            <div className="h-2 rounded-full overflow-hidden" style={{ backgroundColor: "#E5E5E5" }}>
              <div className="h-full rounded-full transition-all duration-300" style={{ width: `${progress}%`, backgroundColor: "#C9A961" }} />
            </div>
          </div>
          <span className="text-xs font-medium whitespace-nowrap" style={{ color: "#1A1A1A", opacity: 0.5 }}>
            第 {currentQ + 1} 題，共 6 題
          </span>
        </div>

        <div className="flex-1 px-5 pb-10 max-w-lg mx-auto w-full">
          <p className="text-xs font-semibold uppercase tracking-wider mt-6 mb-3" style={{ color: "#1A1A1A", opacity: 0.4 }}>
            {q.label}
          </p>
          <h2 className="font-heading text-xl md:text-2xl font-bold mb-8" style={{ color: "#1B3A2F", lineHeight: 1.25 }}>
            {q.text}
          </h2>

          <div className="flex flex-col gap-3">
            {q.options.map((opt) => {
              const selected = answers[currentQ] === opt.score;
              const dimmed = answers[currentQ] !== null && !selected;
              return (
                <button
                  key={opt.score}
                  onClick={() => selectAnswer(opt.score)}
                  className="text-left rounded-lg p-4 pr-5 transition-all duration-200"
                  style={{
                    backgroundColor: selected ? "#FBF7F0" : "#FFFFFF",
                    borderLeft: `3px solid ${selected ? "#C9A961" : "#E5E5E5"}`,
                    opacity: dimmed ? 0.6 : 1,
                    transform: selected ? "scale(1.01)" : "scale(1)",
                    boxShadow: selected ? "0 2px 8px rgba(0,0,0,0.06)" : "0 1px 3px rgba(0,0,0,0.04)",
                  }}
                >
                  <span className="text-sm md:text-base" style={{ color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
                    {opt.text}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  const renderEmailGate = () => (
    <div className="min-h-screen flex flex-col items-center justify-center px-5 text-center" style={{ backgroundColor: "#FBF7F0" }}>
      <h2 className="font-heading text-2xl md:text-4xl font-bold mb-4" style={{ color: "#1B3A2F" }}>
        你的結果已準備好！
      </h2>

      <p className="text-5xl font-bold font-heading mb-6" style={{ color: "#1B3A2F" }}>
        {totalScore} <span className="text-2xl font-normal" style={{ opacity: 0.5 }}>/ 60</span>
      </p>

      {/* blurred radar preview */}
      <div className="w-56 h-56 mb-6" style={{ filter: "blur(8px)" }}>
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart outerRadius="60%" data={radarData}>
            <PolarGrid stroke="#E5E5E5" />
            <PolarAngleAxis dataKey="axis" tick={{ fontSize: 11, fill: "#1A1A1A" }} />
            <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
            <Radar dataKey="value" stroke="#1B3A2F" fill="#C9A961" fillOpacity={0.25} strokeWidth={2} />
          </RadarChart>
        </ResponsiveContainer>
      </div>

      <p className="text-sm md:text-base mb-6 max-w-sm" style={{ color: "#1A1A1A" }}>
        輸入你的電子郵件，解鎖完整分析和個人化行動計畫。
      </p>

      {emailSubmitted ? (
        <div className="flex items-center gap-2 text-base font-semibold" style={{ color: "#05944F" }}>
          <Check className="w-5 h-5" /> 謝謝！
        </div>
      ) : (
        <form onSubmit={handleEmailSubmit} className="w-full max-w-sm">
          <div className="flex gap-2">
            <input
              type="email"
              value={email}
              onChange={(e) => { setEmail(e.target.value); setEmailError(""); }}
              placeholder="你的信箱@email.com"
              aria-label="電子郵件地址"
              autoComplete="email"
              className="flex-1 h-12 px-4 rounded-lg border text-base"
              style={{ borderColor: emailError ? "#C75146" : "#E5E5E5", backgroundColor: "#FFFFFF", color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}
            />
            <button
              type="submit"
              className="h-12 px-6 rounded-lg font-semibold text-base transition-transform hover:scale-[1.02]"
              style={{ backgroundColor: "#C9A961", color: "#1B3A2F" }}
            >
              查看結果
            </button>
          </div>
          {emailError && <p className="text-xs mt-2 text-left" style={{ color: "#C75146" }}>{emailError}</p>}
        </form>
      )}

      <p className="text-xs mt-3 max-w-xs" style={{ color: "#1A1A1A", opacity: 0.45 }}>
        同時獲得每週外商求職技巧。隨時可取消訂閱。
      </p>

      <button
        onClick={() => setScreen("results-minimal")}
        className="text-xs underline mt-6 hover:opacity-80 transition-opacity"
        style={{ color: "#1A1A1A", opacity: 0.5 }}
      >
        跳過 — 只顯示分數
      </button>
    </div>
  );

  const renderResultsMinimal = () => (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "#FBF7F0" }}>
      <div className="px-4 py-3 flex flex-col sm:flex-row items-center gap-2 text-sm" style={{ backgroundColor: "#1B3A2F", color: "#FBF7F0" }}>
        <span className="flex-1">輸入你的電子郵件查看完整分析 →</span>
        <form
          onSubmit={(e) => { e.preventDefault(); handleEmailSubmit(e); }}
          className="flex gap-2"
        >
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="你的信箱@email.com"
            aria-label="電子郵件地址"
            autoComplete="email"
            className="h-8 px-3 rounded text-sm text-foreground"
            style={{ backgroundColor: "#FFFFFF", width: 180 }}
          />
          <button type="submit" className="h-8 px-4 rounded text-sm font-semibold" style={{ backgroundColor: "#C9A961", color: "#1B3A2F" }}>
            解鎖
          </button>
        </form>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center px-5 text-center">
        <p className="text-6xl font-bold font-heading mb-3" style={{ color: "#1B3A2F" }}>
          {totalScore} <span className="text-2xl font-normal" style={{ opacity: 0.5 }}>/ 60</span>
        </p>
        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-3" style={{ backgroundColor: bracket.color }}>
          {bracket.label}
        </span>
        <p className="text-sm max-w-sm" style={{ color: "#1A1A1A" }}>{bracket.summary}</p>
      </div>
    </div>
  );

  const ringRadius = 68;
  const ringCircumference = 2 * Math.PI * ringRadius;
  const ringOffset = ringCircumference - (totalScore / 60) * ringCircumference;

  const renderResults = () => (
    <div className="min-h-screen" style={{ backgroundColor: "#FBF7F0" }}>
      <nav className="px-5 py-4 flex items-center justify-between">
        <Link to="/zh-tw" className="font-heading text-lg font-bold tracking-wide" style={{ color: "#1B3A2F" }}>
          JAMES BUGDEN
        </Link>
        <LanguageToggle variant="nav" />
      </nav>

      <div className="px-5 pb-16 max-w-lg mx-auto">
        {/* Section 1 — Score Ring */}
        <div className="flex flex-col items-center text-center pt-6 pb-10">
          <div className="relative w-40 h-40 mb-4">
            <svg viewBox="0 0 160 160" className="w-full h-full -rotate-90">
              <circle cx="80" cy="80" r={ringRadius} fill="none" stroke="#E5E5E5" strokeWidth="10" />
              <circle
                cx="80"
                cy="80"
                r={ringRadius}
                fill="none"
                stroke="#C9A961"
                strokeWidth="10"
                strokeLinecap="round"
                strokeDasharray={ringCircumference}
                strokeDashoffset={animateRing ? ringOffset : ringCircumference}
                style={{ transition: "stroke-dashoffset 1s ease-out" }}
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center font-heading text-3xl font-bold" style={{ color: "#1B3A2F" }}>
              {totalScore} <span className="text-lg font-normal" style={{ opacity: 0.5 }}>/ 60</span>
            </span>
          </div>
          <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-white mb-2" style={{ backgroundColor: bracket.color }}>
            {bracket.label}
          </span>
          <p className="text-sm max-w-sm" style={{ color: "#1A1A1A" }}>{bracket.summary}</p>
        </div>

        {/* Section 2 — Radar Chart */}
        <div className="w-full h-64 md:h-72 mb-10">
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart outerRadius="60%" data={radarData}>
              <PolarGrid stroke="#E5E5E5" />
              <PolarAngleAxis dataKey="axis" tick={{ fontSize: 12, fill: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }} />
              <PolarRadiusAxis tick={false} axisLine={false} domain={[0, 10]} />
              <Radar dataKey="value" stroke="#1B3A2F" fill="#C9A961" fillOpacity={0.25} strokeWidth={2} />
            </RadarChart>
          </ResponsiveContainer>
        </div>

        {/* Section 3 — Dimension Cards */}
        <div className="flex flex-col gap-4 mb-12">
          {dimensions.map((d) => (
            <div
              key={d.name}
              className="rounded-xl p-6"
              style={{ backgroundColor: "#FFFFFF", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-sm font-semibold" style={{ color: "#1B3A2F" }}>{d.name}</span>
                <span className="text-sm font-bold" style={{ color: "#C9A961" }}>
                  {typeof d.score === "number" ? (Number.isInteger(d.score) ? d.score : d.score.toFixed(1)) : d.score} / 10
                </span>
              </div>
              <div className="h-2 rounded-full mb-3" style={{ backgroundColor: "#E5E5E5" }}>
                <div className="h-full rounded-full transition-all duration-500" style={{ width: `${(d.score / 10) * 100}%`, backgroundColor: "#C9A961" }} />
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#1A1A1A", fontFamily: "'DM Sans', sans-serif" }}>
                {d.fb}
              </p>
            </div>
          ))}
        </div>


        {/* Section 4 — Share */}
        <div className="flex items-center justify-center gap-3">
          <button
            onClick={shareLinkedIn}
            className="flex items-center gap-2 h-10 px-5 rounded-lg text-sm font-semibold border transition-transform hover:scale-[1.02]"
            style={{ borderColor: "#C9A961", color: "#C9A961", backgroundColor: "transparent" }}
          >
            <Linkedin className="w-4 h-4" /> 分享至 LinkedIn
          </button>
          <button
            onClick={copyLink}
            className="flex items-center gap-2 h-10 px-5 rounded-lg text-sm transition-opacity hover:opacity-70"
            style={{ color: "#1A1A1A", opacity: 0.6 }}
          >
            <Copy className="w-4 h-4" /> {copied ? "已複製 ✓" : "複製連結"}
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <SEO />

      <div className="transition-opacity duration-300">
        {screen === "intro" && renderIntro()}
        {screen === "questions" && renderQuestions()}
        {screen === "email" && renderEmailGate()}
        {screen === "results" && renderResults()}
        {screen === "results-minimal" && renderResultsMinimal()}
      </div>
    </>
  );
}