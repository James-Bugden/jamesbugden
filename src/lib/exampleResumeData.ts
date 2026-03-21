import { ResumeData } from "@/components/resume-builder/types";

export const EXAMPLE_RESUME_EN: ResumeData = {
  personalDetails: {
    fullName: "James Bugden",
    professionalTitle: "Senior Recruiter & Career Coach",
    email: "james@example.com",
    phone: "+886 912 345 678",
    location: "Taipei, Taiwan",
    photo: "",
    extras: [
      { id: "1", type: "LinkedIn", value: "linkedin.com/in/jamesbugden" },
      { id: "2", type: "Website", value: "jamescareers.com" },
    ],
  },
  sections: [
    {
      id: "summary-1",
      type: "summary",
      title: "Summary",
      collapsed: false,
      entries: [
        {
          id: "sum-1",
          fields: {
            description:
              "Senior recruiter with 8+ years of experience in talent acquisition across APAC. Specialising in tech hiring for high-growth companies, I've helped scale engineering teams from 20 to 200+ and reduced average time-to-hire by 35%. Career coach who has reviewed 10,000+ resumes and helped 500+ professionals land roles at top-tier companies.",
          },
        },
      ],
    },
    {
      id: "experience-1",
      type: "experience",
      title: "Professional Experience",
      collapsed: false,
      entries: [
        {
          id: "exp-1",
          fields: {
            position: "Senior Technical Recruiter",
            company: "Uber",
            location: "Taipei, Taiwan",
            startMonth: "March",
            startYear: "2021",
            endMonth: "",
            endYear: "",
            currentlyHere: "true",
            description:
              "<ul><li>Led full-cycle recruitment for engineering, product, and data science roles across APAC, filling 60+ positions annually</li><li>Built and executed sourcing strategies that increased qualified pipeline by 45% through targeted outreach and employer branding initiatives</li><li>Partnered with hiring managers to redesign interview processes, improving offer acceptance rate from 72% to 89%</li><li>Mentored a team of 3 junior recruiters, establishing standardised training materials and performance frameworks</li></ul>",
          },
        },
        {
          id: "exp-2",
          fields: {
            position: "Technical Recruiter",
            company: "Uber",
            location: "Taipei, Taiwan",
            startMonth: "June",
            startYear: "2019",
            endMonth: "February",
            endYear: "2021",
            currentlyHere: "",
            description:
              "<ul><li>Managed end-to-end recruitment for software engineering positions, consistently exceeding quarterly hiring targets by 20%</li><li>Developed a referral programme that generated 30% of all engineering hires, reducing cost-per-hire by $4,000</li><li>Coordinated with global talent teams to align regional hiring strategies with company-wide diversity and inclusion goals</li></ul>",
          },
        },
        {
          id: "exp-3",
          fields: {
            position: "Talent Acquisition Specialist",
            company: "Netskope",
            location: "Taipei, Taiwan",
            startMonth: "January",
            startYear: "2017",
            endMonth: "May",
            endYear: "2019",
            currentlyHere: "",
            description:
              "<ul><li>Recruited for cybersecurity engineering roles in a high-growth environment, helping scale the APAC team from 15 to 80 employees</li><li>Established relationships with 10+ universities for campus recruiting, creating a sustainable junior talent pipeline</li><li>Implemented an ATS workflow that reduced administrative time by 25% and improved candidate experience scores</li></ul>",
          },
        },
      ],
    },
    {
      id: "education-1",
      type: "education",
      title: "Education",
      collapsed: false,
      entries: [
        {
          id: "edu-1",
          fields: {
            degree: "Bachelor of Arts in International Development",
            institution: "University of East Anglia",
            location: "Norwich, United Kingdom",
            startMonth: "September",
            startYear: "2012",
            endMonth: "June",
            endYear: "2015",
            currentlyHere: "",
            description: "",
          },
        },
      ],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "Skills",
      collapsed: false,
      entries: [
        {
          id: "sk-1",
          fields: {
            skills:
              "Technical Recruiting, Talent Acquisition Strategy, Employer Branding, Stakeholder Management, Interview Design, Pipeline Analytics, ATS Management, Diversity & Inclusion Hiring, Career Coaching, Resume Optimisation",
          },
        },
      ],
    },
    {
      id: "languages-1",
      type: "languages",
      title: "Languages",
      collapsed: false,
      entries: [
        { id: "lang-1", fields: { language: "English", proficiency: "Native or bilingual proficiency" } },
        { id: "lang-2", fields: { language: "Mandarin Chinese", proficiency: "Professional working proficiency" } },
      ],
    },
    {
      id: "certificates-1",
      type: "certificates",
      title: "Certificates",
      collapsed: false,
      entries: [
        {
          id: "cert-1",
          fields: { name: "LinkedIn Certified Professional Recruiter", issuer: "LinkedIn", date: "2020", url: "" },
        },
        {
          id: "cert-2",
          fields: { name: "AIRS Certified Internet Recruiter", issuer: "AIRS", date: "2018", url: "" },
        },
      ],
    },
  ],
};

export const EXAMPLE_RESUME_ZH_TW: ResumeData = {
  personalDetails: {
    fullName: "James Bugden",
    professionalTitle: "資深招募顧問 & 職涯教練",
    email: "james@example.com",
    phone: "+886 912 345 678",
    location: "台北，台灣",
    photo: "",
    extras: [
      { id: "1", type: "LinkedIn", value: "linkedin.com/in/jamesbugden" },
      { id: "2", type: "Website", value: "jamescareers.com" },
    ],
  },
  sections: [
    {
      id: "summary-1",
      type: "summary",
      title: "個人摘要",
      collapsed: false,
      entries: [
        {
          id: "sum-1",
          fields: {
            description:
              "擁有 8 年以上亞太區人才招募經驗的資深招募顧問。專精於高成長科技公司的技術招募，曾協助工程團隊從 20 人擴展至 200 人以上，並將平均招募週期縮短 35%。同時身為職涯教練，已審閱超過 10,000 份履歷，協助 500 多位專業人士成功進入頂尖企業。",
          },
        },
      ],
    },
    {
      id: "experience-1",
      type: "experience",
      title: "工作經歷",
      collapsed: false,
      entries: [
        {
          id: "exp-1",
          fields: {
            position: "資深技術招募顧問",
            company: "Uber",
            location: "台北，台灣",
            startMonth: "March",
            startYear: "2021",
            endMonth: "",
            endYear: "",
            currentlyHere: "true",
            description:
              "<ul><li>負責亞太區工程、產品及數據科學職位的全流程招募，年度填補 60+ 個職缺</li><li>建立並執行招募策略，透過精準開發與雇主品牌經營，將合格候選人管道增加 45%</li><li>與用人主管合作重新設計面試流程，將 offer 接受率從 72% 提升至 89%</li><li>指導 3 名初級招募顧問，建立標準化培訓教材與績效評估框架</li></ul>",
          },
        },
        {
          id: "exp-2",
          fields: {
            position: "技術招募顧問",
            company: "Uber",
            location: "台北，台灣",
            startMonth: "June",
            startYear: "2019",
            endMonth: "February",
            endYear: "2021",
            currentlyHere: "",
            description:
              "<ul><li>管理軟體工程職位的端到端招募流程，持續超額完成每季招募目標 20%</li><li>開發內部推薦計畫，貢獻 30% 的工程師錄取人數，降低單位招募成本 $4,000</li><li>與全球人才團隊協調，將區域招募策略與公司多元包容目標對齊</li></ul>",
          },
        },
        {
          id: "exp-3",
          fields: {
            position: "人才招募專員",
            company: "Netskope",
            location: "台北，台灣",
            startMonth: "January",
            startYear: "2017",
            endMonth: "May",
            endYear: "2019",
            currentlyHere: "",
            description:
              "<ul><li>在高速成長環境中招募資安工程人才，協助亞太團隊從 15 人擴展至 80 人</li><li>與 10 餘所大學建立校園招募合作關係，建立穩定的初階人才供給管道</li><li>導入 ATS 自動化流程，減少 25% 行政作業時間並提升候選人體驗分數</li></ul>",
          },
        },
      ],
    },
    {
      id: "education-1",
      type: "education",
      title: "學歷",
      collapsed: false,
      entries: [
        {
          id: "edu-1",
          fields: {
            degree: "國際發展學學士",
            institution: "東安格利亞大學 (University of East Anglia)",
            location: "諾里奇，英國",
            startMonth: "September",
            startYear: "2012",
            endMonth: "June",
            endYear: "2015",
            currentlyHere: "",
            description: "",
          },
        },
      ],
    },
    {
      id: "skills-1",
      type: "skills",
      title: "專業技能",
      collapsed: false,
      entries: [
        {
          id: "sk-1",
          fields: {
            skills:
              "技術招募, 人才策略規劃, 雇主品牌經營, 利害關係人管理, 面試流程設計, 招募數據分析, ATS 系統管理, 多元共融招募, 職涯教練, 履歷優化",
          },
        },
      ],
    },
    {
      id: "languages-1",
      type: "languages",
      title: "語言能力",
      collapsed: false,
      entries: [
        { id: "lang-1", fields: { language: "英文", proficiency: "Native or bilingual proficiency" } },
        { id: "lang-2", fields: { language: "中文", proficiency: "Professional working proficiency" } },
      ],
    },
    {
      id: "certificates-1",
      type: "certificates",
      title: "專業證照",
      collapsed: false,
      entries: [
        {
          id: "cert-1",
          fields: { name: "LinkedIn 認證專業招募師", issuer: "LinkedIn", date: "2020", url: "" },
        },
        {
          id: "cert-2",
          fields: { name: "AIRS 認證網路招募師", issuer: "AIRS", date: "2018", url: "" },
        },
      ],
    },
  ],
};
