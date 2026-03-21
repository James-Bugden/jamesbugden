export interface PromptItem {
  step: string;
  stepZh: string;
  promptEn: string;
  promptZh: string;
}

export interface PromptStage {
  stage: number;
  titleEn: string;
  titleZh: string;
  prompts: PromptItem[];
}

export const AI_GUIDE_PROMPTS: PromptStage[] = [
  {
    stage: 1,
    titleEn: "Find Your Path",
    titleZh: "找出你的職涯方向",
    prompts: [
      {
        step: "Generate Job Titles",
        stepZh: "產生潛在職稱",
        promptEn: `Generate 10 specific job titles that could be a good fit for me based on:

My Favorite Skills:

My Interests:

My Major:

My Resume:`,
        promptZh: `根據以下資訊，產生 10 個可能適合我的具體職稱：

我最擅長的技能：＿＿＿＿＿
我感興趣的領域：＿＿＿＿＿
我的主修科目：＿＿＿＿＿
我的履歷內容：＿＿＿＿＿`,
      },
      {
        step: "Explore the Roles",
        stepZh: "探索這些職位",
        promptEn: `Please tell me about a typical day for each of these job titles and the kinds of people who tend to enjoy them: INSERT TITLES`,
        promptZh: `請告訴我以下職稱的典型工作日常，以及什麼樣的人格特質的人會喜歡這份工作：＿＿＿`,
      },
      {
        step: "Rank the Roles",
        stepZh: "職位排序",
        promptEn: `Rank these jobs - INSERT TITLES - based on my:

Career Goals: INSERT GOALS

Qualifications: INSERT SKILLS + CREDENTIALS`,
        promptZh: `請根據以下條件，替我排序這些職位：

職涯目標：INSERT GOALS
專業資格與技能：INSERT SKILLS + CREDENTIALS`,
      },
      {
        step: "Test Your Fit",
        stepZh: "測試適合度",
        promptEn: `What are three specific ways I can test my fit with each of the following roles: INSERT ROLES`,
        promptZh: `請告訴我三個具體方式，讓我能測試自己是否適合以下這些職位：INSERT ROLES`,
      },
    ],
  },
  {
    stage: 2,
    titleEn: "Shore Up Your LinkedIn Defenses",
    titleZh: "強化你的 LinkedIn 防禦力",
    prompts: [
      {
        step: "Generate a Headline",
        stepZh: "建立個人標題",
        promptEn: `Generate a 220 character LinkedIn profile Headline based on the following template, desired job title, and resume:

Here's a headline template: DESIRED JOB (List "Seeking" if the candidate lacks experience) | RELEVANT SKILLS FOR JOB

Here's the desired job title: INSERT JOB

And here's the resume: INSERT RESUME`,
        promptZh: `根據以下模板、目標職稱與履歷內容，生成一段 220 字元以內的 LinkedIn 個人標題

模板：「期望職稱（若無經驗可寫 Seeking）｜與職位相關的技能」

目標職稱：INSERT JOB
履歷內容：INSERT RESUME`,
      },
      {
        step: "Find Your Top Skills",
        stepZh: "找出你的核心技能",
        promptEn: `What are the 20 most common skills listed on job descriptions for JOB TITLE?`,
        promptZh: `在「JOB TITLE」職稱的職缺說明中，最常被提及的 20 項技能是什麼？`,
      },
      {
        step: "Add Them to Your Profile",
        stepZh: "將它們加入你的個人檔案",
        promptEn: `Please incorporate the following keywords into my existing resume bullet points.

Keywords:

Bullet Points:`,
        promptZh: `請將以下關鍵字整合進我現有的履歷條列點中。

關鍵字：＿＿＿
條列點：＿＿＿`,
      },
      {
        step: "Develop Your About Section",
        stepZh: "撰寫你的 About 段落",
        promptEn: `Generate a 2,000 character LinkedIn profile About section based on the following template, desired job title, and resume.

Here's a template:

Start with an opening sentence that states the candidate's focus on their desired job title.

► Pull out a relevant bullet from their resume

► Pull out a second relevant bullet from their resume

► Pull out a third relevant bullet from their resume

Specialties: List the most relevant skills for the desired job from their resume

Here's the desired job title:

And here's the resume:`,
        promptZh: `根據以下範本、理想職稱及履歷，生成一段 2,000 字的 LinkedIn「About」介紹。

以一句開場白說明候選人對理想職稱的專注方向。
從履歷中挑出一個相關重點條列。
再挑出第二個相關條列。
接著挑出第三個相關條列。

Specialties：列出履歷中與該理想職位最相關的技能。

以下是理想職稱：＿＿＿
以下是履歷：＿＿＿`,
      },
      {
        step: "Build New Skills",
        stepZh: "培養新技能",
        promptEn: `What are the specific fastest and cheapest ways to learn SKILL?`,
        promptZh: `學習「SKILL」這項技能最快又最便宜的方式是什麼？`,
      },
      {
        step: "Follow Companies",
        stepZh: "追蹤公司",
        promptEn: `Generate a list of the 100 top employers of X job title in Y industry and Z location.`,
        promptZh: `生成一份在「X job title in Y industry」產業、「Z」地區的 100 家該職稱的頂尖雇主清單。`,
      },
      {
        step: "Add a Cover Photo",
        stepZh: "新增封面照片",
        promptEn: `Please generate 10 ideas for a photo of X role in action.`,
        promptZh: `請為「X」這個職位設計 10 個「在行動中」的照片概念。`,
      },
      {
        step: "Get a Recommendation",
        stepZh: "取得推薦",
        promptEn: `Generate a LinkedIn Recommendation request for my former boss/client, X. Please use a friendly but grateful and respectful tone. Keep the message under 500 characters.`,
        promptZh: `請為我之前的主管／客戶「X」撰寫一封 LinkedIn 推薦信請求。語氣要友善、感激且尊重。字數請控制在 500 字以內。`,
      },
    ],
  },
  {
    stage: 3,
    titleEn: "Go on the Offense with Your Resume",
    titleZh: "主動出擊，打造你的履歷",
    prompts: [
      {
        step: "Get Your Most Important Keywords",
        stepZh: "取得最重要的關鍵字",
        promptEn: `Generate the 20 most important keywords from across ROLE job descriptions.`,
        promptZh: `請根據不同的「ROLE」職位描述，產生最重要的 20 個關鍵字`,
      },
      {
        step: "Add an Achievement for Each Experience",
        stepZh: "為每段經歷新增具體成就",
        promptEn: `What are some example numeric or eye-catching accomplishments that I could list on my resume for X Experience?`,
        promptZh: `請列出我在「X」的可量化或吸引人的成就範例`,
      },
      {
        step: "Incorporate Keywords for Each Experience",
        stepZh: "為每段經歷加入關鍵字",
        promptEn: `Which of the following keywords would be a good fit for my resume based on the following achievements? Please suggest specific relevant keywords from my list for each achievement.

Keywords: PASTE KEYWORDS

Achievements: PASTE ACHIEVEMENTS`,
        promptZh: `根據以下的成就，哪些關鍵字最適合放入我的履歷？
請從我的關鍵字清單中為每個成就建議具體的相關字詞。

關鍵字：PASTE KEYWORDS
成就：PASTE ACHIEVEMENTS`,
      },
      {
        step: "Create Complete Bullets",
        stepZh: "整合成完整條列點",
        promptEn: `Please combine this achievement and these keywords to make a great resume bullet:

Achievement: PASTE ACHIEVEMENT

Keywords: PASTE KEYWORDS`,
        promptZh: `將以下成就與關鍵字結合，產生一條強而有力的履歷條列點：

成就：PASTE ACHIEVEMENT
關鍵字：PASTE KEYWORDS`,
      },
      {
        step: "Review Your Bullet Points",
        stepZh: "檢視並改進你的條列點",
        promptEn: `Please rate the following resume bullets based on the impressiveness of their accomplishments and their inclusion of important keywords for X ROLE. And suggest specific ideas to improve them, if possible:

BULLET POINTS`,
        promptZh: `請根據以下條列點的「成就強度」與「關鍵字完整度」為 X 職位進行評分，並提供具體改進建議。

條列點: BULLET POINTS`,
      },
      {
        step: "Aim for ~50% Keyword Match Rate",
        stepZh: "目標達到約 50% 關鍵字匹配率",
        promptEn: `Suggest a revision of this resume bullet to incorporate KEYWORDS:

RESUME BULLET`,
        promptZh: `請建議如何修改以下條列點，以提升與關鍵字的匹配度：

履歷條列點：RESUME BULLET`,
      },
      {
        step: "Add Rows for Your Education",
        stepZh: "新增教育經歷欄",
        promptEn: `What experiences from my EDUCATION might be relevant for an X role?`,
        promptZh: `我的教育經歷中有哪些經驗可與「X」職位相關？`,
      },
      {
        step: "Review Your Education Bullets",
        stepZh: "檢視教育條列點",
        promptEn: `Please rate the following resume bullets based on the impressiveness of their accomplishments and their inclusion of important keywords for X ROLE. And suggest specific ideas to improve them, if possible:

BULLET POINTS`,
        promptZh: `請根據以下條列點的「成就強度」與「關鍵字完整度」為 X 職位進行評分，並提供具體改進建議。

條列點：RESUME BULLET`,
      },
      {
        step: "Complete Your Skills Section",
        stepZh: "完成技能區段",
        promptEn: `Place these skills into categories: PASTE IN SKILLS LIST`,
        promptZh: `請將以下技能進行分類: PASTE IN SKILLS LIST`,
      },
      {
        step: "Add a Summary",
        stepZh: "撰寫總結段落",
        promptEn: `Please rate the following resume summary based on how clear my interest is in a X role and how impressive and relevant my accomplishments are. And suggest specific ideas to improve it, if possible:

INSERT SUMMARY`,
        promptZh: `請根據我對「X」職位的興趣與相關成就，為以下履歷摘要評分，並提供改進建議：

摘要內容：INSERT SUMMARY`,
      },
    ],
  },
  {
    stage: 4,
    titleEn: "Find + Apply on Autopilot",
    titleZh: "自動化求職流程",
    prompts: [
      {
        step: "Set Up Job Alerts",
        stepZh: "設定職缺提醒",
        promptEn: `What are the most common other job titles companies use instead of ROLE?`,
        promptZh: `公司除了使用「ROLE」這個職稱外，最常用的其他職稱是什麼？`,
      },
      {
        step: "Leverage My Cover Letter Template",
        stepZh: "使用我的求職信範本",
        promptEn: `Please rate the following cover letter for an X role based on how clearly my skills and passion align with the role. And suggest specific ideas to improve it, if possible:

INSERT COVER LETTER`,
        promptZh: `請根據以下內容，評估這封針對「X」職位的求職信，並判斷我的技能與熱情是否明確與該職位相符。若有需要，請提出具體的改進建議。

求職信內容：INSERT COVER LETTER`,
      },
      {
        step: "Customize Your Cover Letter for Each Job",
        stepZh: "為每個職缺客製化求職信",
        promptEn: `Rewrite the following cover letter paragraph to focus on X EMPLOYER:

INSERT PARAGRAPH`,
        promptZh: `請重寫以下求職信段落，讓其聚焦於「X EMPLOYER」（公司名稱）。

段落內容：INSERT PARAGRAPH`,
      },
    ],
  },
  {
    stage: 5,
    titleEn: "Prepare to Crush Your Interviews",
    titleZh: "準備在面試中大放異彩",
    prompts: [
      {
        step: "Generate Sample Questions + Answers",
        stepZh: "產生模擬問題與回答",
        promptEn: `Generate a list of the 10 most likely interview questions I'll face based on the following job description. And for each question, generate an answer in Challenge - Action - Result format, drawing only from the following resume.

Job description: PASTE JOB DESCRIPTION

Resume: PASTE RESUME`,
        promptZh: `請根據以下職缺說明，列出我最有可能在面試中被問到的 10 個問題。
並且針對每個問題，根據以下履歷，以 挑戰（Challenge）– 行動（Action）– 結果（Result） 的架構生成回答。

職缺說明：PASTE JOB DESCRIPTION
履歷內容：PASTE RESUME`,
      },
      {
        step: "Practice Writing Your Answers",
        stepZh: "練習撰寫你的回答",
        promptEn: `I want you to interview me for an X ROLE at Y COMPANY. Start by asking me questions based on the job description below. And then, after I answer, please provide constructive criticism on my answer - and ask the next question.
Here is the job description: JOB DESCRIPTION`,
        promptZh: `請你擔任面試官，針對「X」職位於「Y」公司進行模擬面試。
從以下職缺說明中提出問題。
在我回答後，請提供具建設性的回饋，然後繼續問下一題。

職缺說明如下：JOB DESCRIPTION`,
      },
      {
        step: "Get in the Right Mindset",
        stepZh: "在面試前進入正確心態",
        promptEn: `1) What are the 5 biggest challenges and opportunities facing X COMPANY?

2) What's a 90-day action plan to tackle the job described in this job description: PASTE JOB DESCRIPTION`,
        promptZh: `1. X COMPANY 公司面臨的五大挑戰與機會是什麼？
2. 請為以下職缺撰寫一份 90 天行動計畫：PASTE JOB DESCRIPTION`,
      },
    ],
  },
  {
    stage: 6,
    titleEn: "Negotiate Like a Robot",
    titleZh: "像機器人一樣談薪水",
    prompts: [
      {
        step: "Assess Your Offers",
        stepZh: "評估各項錄取通知",
        promptEn: `My career goal is X, my skills are Y, and my interests are Z. Based on this context, please evaluate the following job opportunities to help me determine which is the best fit:

INSERT OFFERS`,
        promptZh: `我的職涯目標是 X，我的技能是 Y，我的興趣 Z
請根據這些背景，協助我評估以下的工作機會，幫助我判斷哪一個最適合我：

職缺列表：INSERT OFFERS`,
      },
      {
        step: "Frame the Negotiation Early",
        stepZh: "在談判初期設定框架",
        promptEn: `Generate a short, conversational email to the recruiter at X COMPANY, letting them know about my other interviews/offers at Y COMPANY and Z COMPANY. Ask them if, in light of these competitive opportunities, they can do ABC (accelerate their interview process, make a final decision sooner, or offer a more competitive package).`,
        promptZh: `請撰寫一封簡短、自然的電子郵件，寄給 X 公司的人資／招募者，告訴他們我目前也在 Y 公司與 Z 公司進行面試或已獲得 offer，並詢問他們是否能在這些競爭情況下：加快面試流程、提早做出決定、或提供更具競爭力的待遇`,
      },
      {
        step: "Reanchor with Compensation Data",
        stepZh: "以市場資料重新定錨",
        promptEn: `Generate a short, conversational email to my recruiter, thanking them for their kind job offer (INSERT OFFER), and letting them know that I'd like to explore what's possible based on the following facts:

-Current Salary

-Other Offers

-Pay Research for Role/Location`,
        promptZh: `請撰寫一封簡短、自然的電子郵件，感謝招募者給予的 offer（INSERT OFFER），並表達希望能根據以下資訊討論可能的調整空間：

目前薪資
其他公司 offer
該職位／地區的市場薪資研究`,
      },
      {
        step: "Rebut the 2nd Offer",
        stepZh: "回應第二輪報價",
        promptEn: `I asked my recruiter to match this offer: X. They came back with the following message: Y. Generate a short, conversational response that asks them to do better, given my opportunities at these other firms: Z`,
        promptZh: `我請招募者比照另一份 offer（X），他們回覆如下（Y）。請撰寫一封簡短、自然的回信，禮貌地請他們在考慮我在其他公司機會（Z）的前提下，再提出更好的條件`,
      },
      {
        step: "Change the Negotiation Focus",
        stepZh: "轉換談判焦點",
        promptEn: `Generate a short, conversational email to my recruiter offering a concession of X salary in exchange for Y benefit.`,
        promptZh: `請撰寫一封簡短、自然的電子郵件，表示願意放棄 X 金額的薪資以換取 Y 項福利`,
      },
      {
        step: "Close the Deal",
        stepZh: "成交",
        promptEn: `Generate a short, conversational email to my recruiter letting them know that I'm willing to consider signing their offer today and turning down my other offers - but only if they can agree to X compensation now.`,
        promptZh: `請撰寫一封簡短、自然、對話語氣的電子郵件給我的招募者，讓他們知道我願意今天就考慮簽下他們的 offer，並拒絕我手上的其他 offer，但前提是他們現在願意同意我所要求的「X」薪資條件`,
      },
    ],
  },
];
