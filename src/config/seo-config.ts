// =============================================================================
// SEO Configuration for jamesbugden.com
// Copy this file into your Lovable project: src/config/seo-config.ts
// =============================================================================

export interface SEOMeta {
  title: string;
  description: string;
  keywords?: string;
  ogType?: string;
  noIndex?: boolean; // true = hide from Google
}

// Base URL for your site
export const SITE_URL = "https://jamesbugden.com";
export const SITE_NAME = "James Bugden";
export const DEFAULT_OG_IMAGE = `${SITE_URL}/og-image.png`; // Create a 1200x630 branded image

// =============================================================================
// ENGLISH PAGES
// =============================================================================

export const seoConfig: Record<string, SEOMeta> = {
  // ─── Homepage ───────────────────────────────────────────────────────────────
  "/": {
    title: "James Bugden | Career Coach for Top Company Job Seekers",
    description:
      "Senior recruiter with 13+ years helping professionals in Taiwan land high-paying offers at top multinational companies. Free guides, tools, and coaching.",
    keywords: "career coach Taiwan, foreign company jobs Taiwan, 外商 career coaching",
  },

  // ─── Auth (noIndex) ────────────────────────────────────────────────────────
  "/login": {
    title: "Log In | James Bugden",
    description: "Log in to your James Bugden career coaching account.",
    noIndex: true,
  },
  "/signup": {
    title: "Sign Up | James Bugden",
    description: "Create your free James Bugden career coaching account.",
    noIndex: true,
  },
  "/reset-password": {
    title: "Reset Password | James Bugden",
    description: "Reset your James Bugden account password.",
    noIndex: true,
  },

  // ─── Join / Onboarding ─────────────────────────────────────────────────────
  "/join": {
    title: "Join Free | Career Resources for Pros | James Bugden",
    description:
      "Free career guides, resume templates, and interview prep tools for professionals targeting multinational companies in Taiwan.",
  },

  // ─── Dashboard (noIndex) ───────────────────────────────────────────────────
  "/dashboard": {
    title: "Dashboard | James Bugden",
    description: "Your personal career coaching dashboard.",
    noIndex: true,
  },

  // ─── Guides Hub ────────────────────────────────────────────────────────────
  "/guides": {
    title: "Free Career Guides | Resume, Interview & More",
    description:
      "15+ free career guides on resumes, interviews, LinkedIn, salary negotiation & job search. By a senior recruiter with 13 years experience.",
    keywords: "career guides, interview guide, resume guide, job search guide",
  },

  // ─── Quiz ──────────────────────────────────────────────────────────────────
  "/quiz": {
    title: "Foreign Company Readiness Quiz | James Bugden",
    description:
      "Free quiz: are you ready to land a role at a top foreign company? Get a personalized action plan in 3 minutes.",
    keywords: "career readiness quiz, foreign company quiz, 外商 quiz",
  },

  // ─── Site Directory ────────────────────────────────────────────────────────
  "/site-directory": {
    title: "Site Directory | James Bugden",
    description:
      "Full directory of all career guides, tools, and resources available on James Bugden's career coaching platform.",
  },

  // ─── Review ────────────────────────────────────────────────────────────────
  "/review": {
    title: "Resume Review | Expert Feedback | James Bugden",
    description:
      "Get your resume reviewed by a senior recruiter who has screened thousands of applications. Actionable feedback to land more interviews.",
    keywords: "resume review, resume feedback, CV review",
  },

  // ─── Experiment ────────────────────────────────────────────────────────────
  "/experiment": {
    title: "Career Experiments | James Bugden",
    description: "Try new career tools and experimental features from James Bugden.",
    noIndex: true,
  },

  // ─── Admin (noIndex) ──────────────────────────────────────────────────────
  "/admin": { title: "Admin | James Bugden", description: "Admin panel.", noIndex: true },
  "/admin/login": { title: "Admin Login | James Bugden", description: "Admin login.", noIndex: true },
  "/admin/import-questions": { title: "Import Questions | James Bugden", description: "Admin tool.", noIndex: true },
  "/admin/reviews": { title: "Admin Reviews | James Bugden", description: "Admin tool.", noIndex: true },
  "/admin/salary-checks": { title: "Admin Salary | James Bugden", description: "Admin tool.", noIndex: true },

  // =========================================================================
  // TOOLS
  // =========================================================================

  "/resume-analyzer": {
    title: "Free AI Resume Analyzer | Instant Feedback",
    description:
      "Upload your resume and get instant AI-powered feedback on formatting, content, and impact. Built by a recruiter who reviews hundreds of resumes monthly.",
    keywords: "resume analyzer, AI resume review, resume checker, CV analyzer",
  },
  "/resume": {
    title: "Free Resume Builder | Professional Resume | James Bugden",
    description:
      "Build a recruiter-approved resume in minutes with our free builder. Designed to pass ATS systems and impress hiring managers.",
    keywords: "resume builder, free resume maker, ATS resume, professional resume template",
  },
  "/resume-simple": {
    title: "Simple Resume Builder | Quick & Easy | James Bugden",
    description:
      "Create a simple, professional resume fast. No frills, just a clean template that gets results. Free and easy to use.",
    keywords: "simple resume builder, quick resume, easy resume maker",
  },
  "/offer-calculator": {
    title: "Job Offer Calculator | Compare Compensation",
    description:
      "Calculate and compare the true value of job offers including base salary, bonus, stock, benefits, and more.",
    keywords: "offer calculator, salary calculator, total compensation calculator, job offer comparison",
  },
  "/offer-calculator/compare": {
    title: "Compare Job Offers Side by Side | James Bugden",
    description:
      "Put two or more job offers side by side and compare total compensation packages. See which offer is really worth more.",
    keywords: "compare job offers, offer comparison tool",
  },
  "/offer-compass": {
    title: "Offer Compass | Evaluate Beyond Salary | James Bugden",
    description:
      "Evaluate job offers on 10+ dimensions beyond salary: growth, culture, work-life balance, and more. Make decisions you won't regret.",
    keywords: "job offer evaluation, offer decision tool, career decision framework",
  },
  "/offer-compass/compare": {
    title: "Compare Offers with Offer Compass | James Bugden",
    description:
      "Compare multiple job offers across salary, growth potential, culture fit, and more using the Offer Compass framework.",
  },
  "/interview-questions": {
    title: "200+ Interview Questions & Answers | James Bugden",
    description:
      "Practice with 200+ real interview questions used by top companies. Each includes sample answers in English and Chinese.",
    keywords: "interview questions, interview answers, common interview questions, 面試問題",
  },
  "/jobs": {
    title: "Job Board | Foreign Company Roles in Taiwan",
    description:
      "Browse curated job openings at top multinational companies hiring in Taiwan. Updated regularly by a recruiter with deep market knowledge.",
    keywords: "foreign company jobs Taiwan, multinational jobs Taiwan, 外商工作",
  },
  "/tracker": {
    title: "Job Application Tracker | Stay Organized",
    description:
      "Track every job application in one place. Monitor status, follow-ups, and deadlines so nothing falls through the cracks.",
    keywords: "job tracker, application tracker, job search organizer",
  },

  // =========================================================================
  // SALARY
  // =========================================================================

  "/salary": {
    title: "Taiwan Salary Data | Foreign Companies | James Bugden",
    description:
      "Explore real salary data for foreign company roles in Taiwan. Compare compensation across industries, companies, and seniority levels.",
    keywords: "Taiwan salary data, 外商薪水, foreign company salary Taiwan, tech salary Taiwan",
  },
  "/salary/explore": {
    title: "Explore Salaries by Role & Company | James Bugden",
    description:
      "Search and filter salary data for specific roles, companies, and industries in Taiwan's foreign company job market.",
    keywords: "salary search Taiwan, explore salaries, compensation data Taiwan",
  },
  "/salary/compare": {
    title: "Compare Salaries Across Roles | Taiwan | James Bugden",
    description:
      "Compare salaries side by side across different roles, companies, and seniority levels in Taiwan's foreign company market.",
    keywords: "salary comparison Taiwan, compare compensation",
  },
  "/salary/insights": {
    title: "Salary Insights & Trends | Taiwan | James Bugden",
    description:
      "Data-driven insights on salary trends, compensation benchmarks, and hiring patterns in Taiwan's multinational job market.",
    keywords: "salary trends Taiwan, compensation insights, hiring trends Taiwan",
  },
  "/salary-starter-kit": {
    title: "Salary Negotiation Starter Kit | James Bugden",
    description:
      "Free email templates, scripts, and a step-by-step framework for negotiating your salary. Written by a recruiter who knows what works.",
    keywords: "salary negotiation, negotiation templates, salary scripts, how to negotiate salary",
  },

  // =========================================================================
  // GUIDES (English)
  // =========================================================================

  "/resume-guide": {
    title: "Resume Guide | Get More Interviews | James Bugden",
    description:
      "How to write a resume that gets interviews. Formatting, bullet points, ATS tips, and real examples from a senior recruiter.",
    keywords: "resume guide, how to write a resume, resume tips, ATS resume, resume examples",
  },
  "/resume-quick-reference": {
    title: "Resume Quick Reference | Cheat Sheet | James Bugden",
    description:
      "One-page resume cheat sheet with formatting rules, action verbs, and do's and don'ts. Print it and keep it next to you.",
    keywords: "resume cheat sheet, resume quick reference, resume formatting rules",
  },
  "/interview-prep-guide": {
    title: "Interview Prep Guide | Step-by-Step | James Bugden",
    description:
      "Step-by-step guide to preparing for job interviews at top companies. Covers STAR method, common questions, and recruiter insights.",
    keywords: "interview prep guide, how to prepare for interview, interview tips, STAR method",
  },
  "/interview-preparation-guide": {
    title: "Interview Preparation Guide | Deep Dive | James Bugden",
    description:
      "Comprehensive interview prep covering behavioral, case, and technical rounds plus salary discussions. From a senior recruiter.",
    keywords: "interview preparation, behavioral interview, case interview, technical interview prep",
  },
  "/linkedin-guide": {
    title: "LinkedIn Profile Guide | Attract Recruiters | James Bugden",
    description:
      "Build a LinkedIn profile that attracts recruiters from top companies. Headline formulas, summary templates, and real examples.",
    keywords: "LinkedIn guide, LinkedIn profile tips, LinkedIn for job search, recruiter LinkedIn",
  },
  "/linkedin-branding-guide": {
    title: "LinkedIn Branding Guide | Stand Out | James Bugden",
    description:
      "Go beyond profile basics. Build a personal brand on LinkedIn that positions you as a top candidate for foreign company roles.",
    keywords: "LinkedIn branding, personal branding LinkedIn, LinkedIn strategy",
  },
  "/pivot-method-guide": {
    title: "Pivot Method | Change Careers Successfully | James Bugden",
    description:
      "A practical framework for changing careers without starting over. Identify transferable skills and land your next role.",
    keywords: "career change, pivot career, career transition guide, how to change careers",
  },
  "/pivot-method-mini-guide": {
    title: "Pivot Method Mini Guide | Quick Start | James Bugden",
    description:
      "Quick-start Pivot Method for career changers. Identify strengths, scan the market, and take your first step in 30 minutes.",
    keywords: "career pivot, quick career change, career transition",
  },
  "/hr-interview-guide": {
    title: "HR Interview Guide | Pass the Screening | James Bugden",
    description:
      "Discover what HR recruiters check in screening calls and how to confidently answer salary, availability, and motivation questions. Pass the first interview round.",
    keywords: "HR interview, HR screening, phone screen tips, HR interview questions",
  },
  "/ai-job-search-guide": {
    title: "AI Job Search Guide | Find Jobs Faster | James Bugden",
    description:
      "Use ChatGPT, Claude, and AI tools to speed up your job search. Resume tailoring, interview prep, and networking — AI-assisted.",
    keywords: "AI job search, ChatGPT job search, AI resume, AI interview prep",
  },
  "/job-offer-guide": {
    title: "Job Offer Guide | Evaluate & Negotiate | James Bugden",
    description:
      "A recruiter's guide to evaluating job offers, negotiating salary, and making the right decision. Includes scripts and frameworks.",
    keywords: "job offer guide, how to negotiate offer, salary negotiation guide, offer evaluation",
  },
  "/problem-solving-guide": {
    title: "Problem Solving for Interviews | James Bugden",
    description:
      "Structured problem-solving frameworks that impress interviewers at top companies. MECE, root cause analysis, and more.",
    keywords: "problem solving interview, structured thinking, case interview framework",
  },
  "/office-politics-guide": {
    title: "Office Politics Guide | Workplace Tips | James Bugden",
    description:
      "A practical guide to reading and navigating office politics at multinational companies. Build influence and protect your career.",
    keywords: "office politics, workplace dynamics, corporate politics, career strategy",
  },
  "/recruiter-guide": {
    title: "How Recruiters Think | Insider Guide | James Bugden",
    description:
      "See hiring from the other side. How recruiters source, screen, and evaluate candidates — and how to stand out at every stage.",
    keywords: "how recruiters think, recruiter guide, hiring process insider, how hiring works",
  },
  "/recruiter-screen-guide": {
    title: "Recruiter Screen Guide | Ace the First Call | James Bugden",
    description:
      "What recruiters check in the first phone screen and how to answer every question. Salary, availability, and hidden dealbreakers.",
    keywords: "recruiter screen, phone screen tips, first interview, recruiter call",
  },
  "/ikigai-guide": {
    title: "Ikigai Career Guide | Find Your Purpose | James Bugden",
    description:
      "Apply Ikigai to your career. A guided framework for finding work at the intersection of passion, skill, need, and pay.",
    keywords: "ikigai career, find purpose career, ikigai guide, meaningful work",
  },
  "/career-game-guide": {
    title: "Career Game Guide | Play Strategically | James Bugden",
    description:
      "Think of your career as a long game. Covers timing, leverage, reputation building, and strategic moves that compound over years.",
    keywords: "career strategy, long-term career planning, career game, strategic career moves",
  },
  "/48-laws-guide": {
    title: "48 Laws of Power for Your Career | James Bugden",
    description:
      "Key principles from the 48 Laws of Power applied to your career. Build influence, protect yourself, and navigate corporate life.",
    keywords: "48 laws of power career, career power, workplace strategy, corporate influence",
  },

  // =========================================================================
  // TOOLKIT
  // =========================================================================

  "/toolkit": {
    title: "Salary Negotiation Toolkit | Free | James Bugden",
    description:
      "Everything to negotiate your salary: email scripts, counteroffer templates, a salary calculator, and step-by-step frameworks.",
    keywords: "salary negotiation toolkit, negotiation scripts, salary templates",
  },
  "/toolkit/scripts": {
    title: "Salary Negotiation Scripts | Templates | James Bugden",
    description:
      "Copy-paste negotiation scripts for every situation: initial offer response, counteroffer, asking for more time, and declining.",
    keywords: "negotiation scripts, salary email templates, how to counter offer email",
  },
  "/toolkit/offer-response": {
    title: "How to Respond to a Job Offer | James Bugden",
    description:
      "Professional email templates for responding to job offers. Accept, negotiate, ask for time, or decline with the exact wording.",
    keywords: "offer response email, how to respond to job offer, offer acceptance email",
  },
  "/toolkit/counteroffer": {
    title: "Counteroffer Email Template | James Bugden",
    description:
      "A proven counteroffer email template with fill-in-the-blank sections. Plus strategy on when and how much to counter.",
    keywords: "counteroffer email, how to counter offer, salary counteroffer template",
  },
  "/toolkit/calculator": {
    title: "Salary Calculator | True Compensation | James Bugden",
    description:
      "Calculate the true value of your compensation package including base, bonus, stock, insurance, and other benefits.",
    keywords: "salary calculator, compensation calculator, total comp calculator",
  },
  "/toolkit/calculator-interactive": {
    title: "Interactive Salary Calculator | James Bugden",
    description:
      "An interactive calculator to model different salary scenarios and see how base, bonus, and equity combine into total compensation.",
    keywords: "interactive salary calculator, compensation modeling",
  },
  "/toolkit/pushback": {
    title: "Handle Salary Pushback | Scripts | James Bugden",
    description:
      "What to say when the company pushes back on your salary request. Scripts and strategies for staying firm without losing the offer.",
    keywords: "salary pushback, negotiation pushback, how to handle pushback salary",
  },
  "/toolkit/raise": {
    title: "How to Ask for a Raise | Scripts | James Bugden",
    description:
      "Step-by-step guide to asking for a raise. When to ask, how to prepare your case, and the exact words to use.",
    keywords: "how to ask for a raise, raise request, salary increase, asking for more money",
  },
  "/toolkit/log": {
    title: "Negotiation Log | Track Salary Talks | James Bugden",
    description:
      "Keep a record of every salary conversation, email, and counteroffer in one place. Stay organized during your negotiation.",
    keywords: "negotiation tracker, salary discussion log",
  },

  // =========================================================================
  // TRADITIONAL CHINESE (zh-tw) PAGES
  // =========================================================================

  // ─── Homepage ──────────────────────────────────────────────────────────────
  "/zh-tw": {
    title: "James Bugden | 外商求職教練，幫你拿到理想 Offer",
    description:
      "擁有13年以上經驗的資深招募官，專門幫助台灣專業人士順利進入頂尖外商公司拿到理想Offer。免費提供求職指南、AI工具和一對一輔導，助你在外商求職路上少走彎路。",
    keywords: "外商求職, 外商面試, 台灣外商工作, 求職教練, career coach Taiwan",
  },

  // ─── Join ──────────────────────────────────────────────────────────────────
  "/zh-tw/join": {
    title: "免費加入 | 外商求職資源 | James Bugden",
    description:
      "取得免費的外商求職指南、履歷模板和面試準備工具。專為想進入跨國企業的台灣專業人士設計。",
  },

  // ─── Dashboard ─────────────────────────────────────────────────────────────
  "/zh-tw/dashboard": {
    title: "個人儀表板 | James Bugden",
    description: "你的個人求職教練儀表板。",
    noIndex: true,
  },

  // ─── Guides Hub ────────────────────────────────────────────────────────────
  "/zh-tw/guides": {
    title: "免費求職指南 | 履歷、面試攻略 | James Bugden",
    description:
      "15份以上免費求職指南，涵蓋履歷、面試、LinkedIn 和薪資談判。由13年經驗的資深招募官撰寫。",
    keywords: "求職指南, 面試指南, 履歷指南, 外商求職攻略",
  },

  // ─── Quiz ──────────────────────────────────────────────────────────────────
  "/zh-tw/quiz": {
    title: "外商求職準備度測驗 | James Bugden",
    description:
      "用3分鐘測試你是否準備好進入外商公司。獲得個人化的行動計畫和建議。",
    keywords: "外商準備度測驗, 外商求職測試, career readiness quiz",
  },

  // ─── Experiment ────────────────────────────────────────────────────────────
  "/zh-tw/experiment": {
    title: "實驗功能 | James Bugden",
    description: "嘗試新的求職工具和實驗功能。",
    noIndex: true,
  },

  // =========================================================================
  // TOOLS (zh-tw)
  // =========================================================================

  "/zh-tw/resume-analyzer": {
    title: "免費 AI 履歷分析工具 | 即時回饋 | James Bugden",
    description:
      "立即上傳履歷，獲得 AI 即時分析，涵蓋格式規範、內容品質和整體影響力。由每月審閱數百份履歷的資深招募官設計，幫你打造更有競爭力的求職文件。",
    keywords: "履歷分析, AI 履歷檢查, 履歷回饋, resume analyzer",
  },
  "/zh-tw/resume": {
    title: "免費履歷產生器 | 打造專業履歷 | James Bugden",
    description:
      "幾分鐘內建立一份乾淨、通過 ATS 系統的專業履歷。由資深招募官設計的免費履歷工具。",
    keywords: "履歷產生器, 免費履歷工具, ATS 履歷, 專業履歷模板",
  },
  "/zh-tw/resume-simple": {
    title: "簡易履歷產生器 | 快速建立 | James Bugden",
    description:
      "快速建立簡潔專業的履歷。沒有多餘的步驟，就是一份能拿到面試機會的好履歷。",
    keywords: "簡易履歷, 快速履歷產生器",
  },
  "/zh-tw/offer-calculator": {
    title: "Offer 計算機 | 比較薪資報酬 | James Bugden",
    description:
      "計算並比較工作 Offer 的真實價值，包含底薪、獎金、股票和福利。",
    keywords: "offer 計算機, 薪資計算機, 總薪酬計算, 工作 offer 比較",
  },
  "/zh-tw/offer-compass": {
    title: "Offer 指南針 | 超越薪水評估 | James Bugden",
    description:
      "從成長空間、文化、工作生活平衡等10個以上維度評估工作 Offer。做出不會後悔的決定。",
    keywords: "工作 offer 評估, offer 決策工具, 職涯決策框架",
  },
  "/zh-tw/interview-questions": {
    title: "200+ 面試題庫 | 中英雙語問答 | James Bugden",
    description:
      "練習超過200道頂尖公司常用的面試題目。每題都附中英文參考答案。",
    keywords: "面試題目, 面試問答, 常見面試問題, interview questions 中文",
  },

  // =========================================================================
  // SALARY (zh-tw)
  // =========================================================================

  "/zh-tw/salary": {
    title: "台灣外商薪資數據 | 薪水查詢 | James Bugden",
    description:
      "探索台灣外商公司的真實薪資數據。按產業、公司和職級比較薪酬水準。",
    keywords: "外商薪水, 台灣薪資數據, 外商薪資比較, tech salary Taiwan",
  },
  "/zh-tw/salary/explore": {
    title: "探索薪資 | 按職位和公司查詢 | James Bugden",
    description:
      "搜尋和篩選台灣外商市場中特定職位、公司和產業的薪資數據。",
    keywords: "薪資查詢, 薪水搜尋, 台灣薪資數據",
  },
  "/zh-tw/salary/compare": {
    title: "比較薪資 | 跨職位與公司比較 | James Bugden",
    description:
      "將不同職位、公司和職級的薪資並排比較。找出台灣外商市場的薪資差異。",
    keywords: "薪資比較, 薪水比較工具",
  },
  "/zh-tw/salary/insights": {
    title: "薪資趨勢與洞察 | 台灣市場 | James Bugden",
    description:
      "數據驅動的台灣外商薪資趨勢、薪酬基準和招聘趨勢分析。",
    keywords: "薪資趨勢, 薪酬洞察, 台灣招聘趨勢",
  },
  "/zh-tw/salary-starter-kit": {
    title: "薪資談判入門包 | 免費模板 | James Bugden",
    description:
      "取得免費的薪資談判信件模板、腳本和步驟框架。由知道什麼方法有效的招募官撰寫。",
    keywords: "薪資談判, 談判模板, 薪資腳本, 如何談薪水",
  },

  // =========================================================================
  // GUIDES (zh-tw)
  // =========================================================================

  "/zh-tw/resume-guide": {
    title: "完整履歷指南 | 拿到面試的履歷 | James Bugden",
    description:
      "學習撰寫一份能拿到面試機會的履歷。格式、重點描述、ATS 優化，附資深招募官實際範例。",
    keywords: "履歷指南, 如何寫履歷, 履歷技巧, ATS 履歷, 外商履歷",
  },
  "/zh-tw/resume-quick-reference": {
    title: "履歷速查表 | 寫履歷必備參考 | James Bugden",
    description:
      "一頁式履歷速查表，包含格式規則、動作動詞和注意事項。寫履歷時隨時參考。",
    keywords: "履歷速查表, 履歷格式規則, 履歷參考",
  },
  "/zh-tw/interview-prep-guide": {
    title: "面試準備指南 | 逐步教學 | James Bugden",
    description:
      "逐步教你準備頂尖公司面試。涵蓋 STAR 方法、常見問題和招募官真正在看的重點。",
    keywords: "面試準備, 如何準備面試, 面試技巧, STAR 方法, 外商面試",
  },
  "/zh-tw/interview-preparation-guide": {
    title: "深度面試準備攻略 | 全方位指南 | James Bugden",
    description:
      "全面的面試準備：行為面試、案例分析、技術輪和薪資談判。來自資深招募官的實戰經驗。",
    keywords: "面試準備攻略, 行為面試, 案例面試, 技術面試",
  },
  "/zh-tw/linkedin-guide": {
    title: "LinkedIn 指南 | 讓招募官找上你 | James Bugden",
    description:
      "打造吸引頂尖公司招募官的 LinkedIn 檔案。標題公式、自我介紹模板和優化範例。",
    keywords: "LinkedIn 指南, LinkedIn 優化, LinkedIn 求職, 招募官 LinkedIn",
  },
  "/zh-tw/linkedin-branding-guide": {
    title: "LinkedIn 個人品牌指南 | 脫穎而出 | James Bugden",
    description:
      "超越基本檔案優化。在 LinkedIn 上建立個人品牌，讓你成為外商公司的首選候選人。",
    keywords: "LinkedIn 個人品牌, LinkedIn 策略",
  },
  "/zh-tw/pivot-method-guide": {
    title: "轉職方法指南 | 成功轉換跑道 | James Bugden",
    description:
      "實用的轉職框架，不用從零開始。找出可轉移技能，建立橋樑，順利轉進新領域。",
    keywords: "轉職, 轉換跑道, 職涯轉型指南, 如何轉職",
  },
  "/zh-tw/pivot-method-mini-guide": {
    title: "轉職迷你指南 | 快速框架 | James Bugden",
    description:
      "精簡版轉職方法指南。30分鐘內找出你的優勢、掃描市場並踏出第一步。",
    keywords: "快速轉職, 轉職入門",
  },
  "/zh-tw/hr-interview-guide": {
    title: "HR 面試指南 | 通過初篩 | James Bugden",
    description:
      "了解 HR 招募官在初篩電話中真正評估哪些條件，自信回答薪資期望、到職時間和應聘動機問題，不在第一關被淘汰。附資深招募官視角的完整解析與實戰技巧。",
    keywords: "HR 面試, HR 初篩, 電話面試技巧, HR 面試問題",
  },
  "/zh-tw/ai-job-search-guide": {
    title: "AI 求職指南 | 用 AI 加速找工作 | James Bugden",
    description:
      "使用 ChatGPT、Claude 等 AI 工具加速求職。履歷客製、面試準備和人脈經營全靠 AI。",
    keywords: "AI 求職, ChatGPT 求職, AI 履歷, AI 面試準備",
  },
  "/zh-tw/job-offer-guide": {
    title: "Offer 指南 | 評估和談判 Offer | James Bugden",
    description:
      "招募官教你評估工作 Offer、談判薪資並做出正確決定。包含腳本、框架和真實案例。",
    keywords: "offer 指南, 如何談判 offer, 薪資談判指南, offer 評估",
  },
  "/zh-tw/problem-solving-guide": {
    title: "問題解決指南 | 面試結構化思考 | James Bugden",
    description:
      "學習在頂尖公司面試中讓面試官印象深刻的結構化問題解決框架。MECE 和根因分析。",
    keywords: "問題解決面試, 結構化思考, 案例面試框架",
  },
  "/zh-tw/office-politics-guide": {
    title: "辦公室政治指南 | 外商職場術 | James Bugden",
    description:
      "在跨國企業中應對辦公室政治的實用指南。建立影響力、避開陷阱、保護你的職涯。",
    keywords: "辦公室政治, 職場人際, 外商職場, 職涯策略",
  },
  "/zh-tw/recruiter-guide": {
    title: "招募官怎麼想 | 內幕指南 | James Bugden",
    description:
      "從招募官角度看面試流程。招募官如何搜尋、篩選和評估候選人，以及你如何脫穎而出。",
    keywords: "招募官怎麼想, 招募官指南, 面試流程內幕",
  },
  "/zh-tw/recruiter-screen-guide": {
    title: "招募官初篩指南 | 通過第一通電話 | James Bugden",
    description:
      "招募官在第一通電話中檢查什麼，以及如何回答每個問題。薪資、到職時間和隱藏淘汰標準。",
    keywords: "招募官初篩, 電話面試, 第一輪面試",
  },
  "/zh-tw/ikigai-guide": {
    title: "Ikigai 職涯指南 | 找到有意義的工作 | James Bugden",
    description:
      "將日本 Ikigai 概念應用到你的職涯。在熱情、技能、需求和報酬的交集找到理想工作。",
    keywords: "ikigai 職涯, 找到職涯目標, ikigai 指南, 有意義的工作",
  },
  "/zh-tw/career-game-guide": {
    title: "職涯賽局指南 | 策略性規劃職涯 | James Bugden",
    description:
      "把職涯當成長期賽局。涵蓋時機、槓桿、聲譽建立和能隨時間複利成長的策略行動。",
    keywords: "職涯策略, 長期職涯規劃, 職涯賽局",
  },

  // =========================================================================
  // TOOLKIT (zh-tw)
  // =========================================================================

  "/zh-tw/toolkit": {
    title: "薪資談判工具包 | 腳本與模板 | James Bugden",
    description:
      "談判薪資所需的一切：信件腳本、反 offer 模板、薪資計算機和步驟框架。全部免費。",
    keywords: "薪資談判工具包, 談判腳本, 薪資模板",
  },
  "/zh-tw/toolkit/scripts": {
    title: "薪資談判腳本 | 逐字模板 | James Bugden",
    description:
      "適用各種情境的複製貼上談判腳本：初始 offer 回覆、反 offer、要求更多時間和禮貌拒絕。",
    keywords: "談判腳本, 薪資信件模板, 如何寫反 offer 信",
  },
  "/zh-tw/toolkit/offer-response": {
    title: "如何回覆工作 Offer | 信件模板 | James Bugden",
    description:
      "回覆工作 Offer 的專業信件模板。接受、談判、要求時間或拒絕——附上確切的措辭。",
    keywords: "offer 回覆信, 如何回覆工作 offer, offer 接受信",
  },
  "/zh-tw/toolkit/counteroffer": {
    title: "反 Offer 信件模板 | James Bugden",
    description:
      "經過驗證的反 offer 信件模板，附有填空欄位。加上何時反 offer 和反多少的策略。",
    keywords: "反 offer 信, 如何 counter offer, 薪資反 offer 模板",
  },
  "/zh-tw/toolkit/calculator": {
    title: "薪資計算機 | 計算真實薪酬 | James Bugden",
    description:
      "計算你的薪酬總值，包含底薪、獎金、股票、保險和其他福利。",
    keywords: "薪資計算機, 薪酬計算機, 總薪酬計算",
  },
  "/zh-tw/toolkit/calculator-interactive": {
    title: "互動式薪資計算機 | James Bugden",
    description:
      "互動式計算機，模擬不同薪資方案，看底薪、獎金和股權如何組合成總薪酬。",
    keywords: "互動式薪資計算機, 薪酬模擬",
  },
  "/zh-tw/toolkit/pushback": {
    title: "薪資談判被拒怎麼辦 | 腳本 | James Bugden",
    description:
      "當公司拒絕你的薪資要求時該說什麼。保持堅定又不失去 offer 的腳本和策略。",
    keywords: "薪資談判被拒, 談判堅持, 如何應對薪資拒絕",
  },
  "/zh-tw/toolkit/raise": {
    title: "如何要求加薪 | 腳本與時機 | James Bugden",
    description:
      "要求加薪的逐步指南。何時開口、如何準備你的論點，以及對話中使用的確切措辭。",
    keywords: "如何要求加薪, 加薪請求, 薪資調整",
  },
  "/zh-tw/toolkit/log": {
    title: "談判紀錄 | 追蹤薪資討論 | James Bugden",
    description:
      "將每次薪資對話、信件和反 offer 記錄在一個地方。在談判過程中保持有條理。",
    keywords: "談判追蹤器, 薪資討論紀錄",
  },

  // =========================================================================
  // REVIEWS (English)
  // =========================================================================

  "/reviews/charlene-lee": {
    title: "Charlene Lee — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Charlene Lee by senior recruiter James Bugden.",
  },
  "/reviews/chien-jung-liu": {
    title: "Chien-Jung Liu — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Chien-Jung Liu by senior recruiter James Bugden.",
  },
  "/reviews/hope-chen": {
    title: "Hope Chen — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Hope Chen by senior recruiter James Bugden.",
  },
  "/reviews/janelle-cheng": {
    title: "Janelle Cheng — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Janelle Cheng by senior recruiter James Bugden.",
  },
  "/reviews/james-bugden": {
    title: "James Bugden — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for James Bugden by senior recruiter James Bugden.",
  },
  "/reviews/peihua-yeh": {
    title: "Peihua Yeh — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Peihua Yeh by senior recruiter James Bugden.",
  },
  "/reviews/pin-wei-wu": {
    title: "Pin-Wei Wu — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Pin-Wei Wu by senior recruiter James Bugden.",
  },
  "/reviews/rema-rao": {
    title: "Rema Rao — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Rema Rao by senior recruiter James Bugden.",
  },
  "/reviews/roger-lee": {
    title: "Roger Lee — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Roger Lee by senior recruiter James Bugden.",
  },
  "/reviews/roy-tsai": {
    title: "Roy Tsai — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Roy Tsai by senior recruiter James Bugden.",
  },
  "/reviews/sam-lee": {
    title: "Sam Lee — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Sam Lee by senior recruiter James Bugden.",
  },
  "/reviews/silvia-chen": {
    title: "Silvia Chen — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Silvia Chen by senior recruiter James Bugden.",
  },
  "/reviews/willy-lin": {
    title: "Willy Lin — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Willy Lin by senior recruiter James Bugden.",
  },
  "/reviews/youting-chen": {
    title: "Youting Chen — Resume Review | James Bugden",
    description: "Detailed resume review and career feedback for Youting Chen by senior recruiter James Bugden.",
  },

  // =========================================================================
  // REVIEWS (zh-tw)
  // =========================================================================

  "/zh-tw/reviews/charlene-lee": {
    title: "Charlene Lee — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Charlene Lee 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/chien-jung-liu": {
    title: "Chien-Jung Liu — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Chien-Jung Liu 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/hope-chen": {
    title: "Hope Chen — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Hope Chen 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/janelle-cheng": {
    title: "Janelle Cheng — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Janelle Cheng 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/james-bugden": {
    title: "James Bugden — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 James Bugden 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/peihua-yeh": {
    title: "Peihua Yeh — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Peihua Yeh 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/pin-wei-wu": {
    title: "Pin-Wei Wu — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Pin-Wei Wu 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/rema-rao": {
    title: "Rema Rao — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Rema Rao 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/roger-lee": {
    title: "Roger Lee — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Roger Lee 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/roy-tsai": {
    title: "Roy Tsai — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Roy Tsai 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/sam-lee": {
    title: "Sam Lee — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Sam Lee 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/silvia-chen": {
    title: "Silvia Chen — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Silvia Chen 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/willy-lin": {
    title: "Willy Lin — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Willy Lin 提供的詳細履歷點評與職涯回饋。",
  },
  "/zh-tw/reviews/youting-chen": {
    title: "Youting Chen — 履歷點評 | James Bugden",
    description: "資深招募官 James Bugden 為 Youting Chen 提供的詳細履歷點評與職涯回饋。",
  },
};
