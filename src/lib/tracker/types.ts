export interface Employer {
  id: string;
  name: string;
  source: "dream" | "alumni" | "posting" | "trend" | "manual";
  alumni: boolean;
  motivation: 1 | 2 | 3 | 4 | 5;
  posting: 1 | 2 | 3;
  stage: "listed" | "contacted" | "informational" | "advocate" | "applied" | "interviewing" | "offer";
  notes: string;
  jdUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface Contact {
  id: string;
  employerId: string;
  name: string;
  email: string;
  role: string;
  source: "alumni-db" | "linkedin-1st" | "linkedin-2nd" | "linkedin-group" | "facebook" | "fan-mail" | "cold-call";
  status: "not-contacted" | "awaiting" | "booster" | "obligate" | "curmudgeon";
  emailSentDate: string | null;
  respondedDate: string | null;
  followUpSentDate: string | null;
  followUpCallDate: string | null;
  notes: string;
  contactNumber: 1 | 2 | 3;
  createdAt: string;
}

export interface UserProfile {
  name: string;
  school: string;
  degree: string;
  interestArea: string;
}

export const STORAGE_KEYS = {
  employers: "lamp-employers",
  contacts: "lamp-contacts",
  userProfile: "lamp-user-profile",
  dismissedBanner: "lamp-dismissed-banner",
} as const;
