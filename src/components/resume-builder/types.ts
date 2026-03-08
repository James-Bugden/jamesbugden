export interface PersonalDetails {
  fullName: string;
  professionalTitle: string;
  email: string;
  phone: string;
  location: string;
  photo: string;
  extras: { id: string; type: string; value: string }[];
}

export interface ResumeSectionEntry {
  id: string;
  fields: Record<string, string>;
  collapsed?: boolean;
}

export type SectionLayout = "grid" | "bubble" | "compact";
export type SectionSeparator = "bullet" | "pipe" | "newline" | "comma";
export type SubtitleStyle = "dash" | "colon" | "bracket";

export interface ResumeSection {
  id: string;
  type: string;
  title: string;
  entries: ResumeSectionEntry[];
  collapsed: boolean;
  layout?: SectionLayout;
  separator?: SectionSeparator;
  subtitleStyle?: SubtitleStyle;
  showHeading?: boolean; // for summary/profile section
}

export interface ResumeData {
  personalDetails: PersonalDetails;
  sections: ResumeSection[];
}

export const SECTION_TYPES = [
  { type: "education", title: "Education", icon: "GraduationCap", description: "Add your degrees and schools. Include your focus, honors, or exchange terms." },
  { type: "experience", title: "Professional Experience", icon: "Briefcase", description: "Add your professional roles and employer history including internships." },
  { type: "skills", title: "Skills", icon: "Wrench", description: "Add your hard and soft skills that help you stand out from the crowd today." },
  { type: "languages", title: "Languages", icon: "Globe", description: "Add your languages and proficiency level to show your communication range." },
  { type: "summary", title: "Summary", icon: "AlignLeft", description: "Add a professional summary to introduce yourself and highlight your strengths." },
  { type: "certificates", title: "Certificates", icon: "Award", description: "Add your industry certificates or licences. Include issuer and date earned." },
  { type: "interests", title: "Interests", icon: "Heart", description: "Add relevant personal interests that support your career story and cultural fit." },
  { type: "projects", title: "Projects", icon: "FolderOpen", description: "Add key projects you participated in and highlight your challenges, role, and impact." },
  { type: "courses", title: "Courses", icon: "BookOpen", description: "Add online or in-person courses and trainings you joined and completed." },
  { type: "awards", title: "Awards", icon: "Trophy", description: "Add your awards and recognitions from industry, competitions, or academia." },
  { type: "organisations", title: "Organisations", icon: "Users", description: "Add your memberships or volunteering with organisations including your role." },
  { type: "publications", title: "Publications", icon: "FileText", description: "Add publications, articles, or books you wrote or contributed to." },
  { type: "references", title: "References", icon: "UserCheck", description: "Add your references from managers or coworkers, including their contact details." },
  { type: "declaration", title: "Declaration", icon: "PenTool", description: "Add your declaration by creating or uploading your personal signature." },
  { type: "custom", title: "Custom", icon: "Plus", description: "Add a custom section for anything else, or combine sections cleanly." },
] as const;

export const EXTRA_DETAIL_OPTIONS = [
  "LinkedIn", "Website", "Nationality", "Date of Birth", "Visa", "Passport or Id", "Gender/Pronoun",
] as const;

export const PROFICIENCY_LEVELS = [
  "Native or bilingual proficiency",
  "Full professional proficiency",
  "Professional working proficiency",
  "Limited working proficiency",
  "Elementary proficiency",
] as const;

export const MONTHS = [
  "January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December",
] as const;

export const DEFAULT_RESUME_DATA: ResumeData = {
  personalDetails: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    photo: "",
    extras: [],
  },
  sections: [],
};

export function getDefaultFieldsForType(type: string): Record<string, string> {
  switch (type) {
    case "education":
      return { degree: "", institution: "", location: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyHere: "", description: "" };
    case "experience":
      return { position: "", company: "", location: "", startMonth: "", startYear: "", endMonth: "", endYear: "", currentlyHere: "", description: "" };
    case "skills":
      return { skills: "" }; // comma-separated tags
    case "languages":
      return { language: "", proficiency: "" };
    case "summary":
      return { description: "" };
    case "certificates":
      return { name: "", issuer: "", date: "", url: "" };
    case "interests":
      return { interests: "" }; // comma-separated tags
    case "projects":
      return { name: "", role: "", startMonth: "", startYear: "", endMonth: "", endYear: "", url: "", description: "" };
    case "courses":
      return { name: "", institution: "", date: "" };
    case "awards":
      return { name: "", issuer: "", date: "", description: "" };
    case "organisations":
      return { name: "", role: "", startMonth: "", startYear: "", endMonth: "", endYear: "", description: "" };
    case "publications":
      return { title: "", publisher: "", date: "", url: "", description: "" };
    case "references":
      return { name: "", position: "", company: "", email: "", phone: "", relationship: "" };
    case "declaration":
      return { fullName: "", place: "", date: "", signature: "" };
    case "custom":
      return { sectionTitle: "", description: "" };
    default:
      return { description: "" };
  }
}
