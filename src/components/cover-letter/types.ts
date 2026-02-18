import { PersonalDetails } from "../resume-builder/types";

export interface RecipientDetails {
  recipientName: string;
  companyName: string;
  companyAddress: string;
}

export interface CoverLetterSignature {
  fullName: string;
  place: string;
  date: string;
  signatureImage: string; // base64 or empty
}

export interface CoverLetterData {
  personalDetails: PersonalDetails;
  date: string;
  recipient: RecipientDetails;
  body: string; // HTML from rich text editor
  signature: CoverLetterSignature;
}

export interface CoverLetterCustomize {
  fontSize: number;
  lineHeight: number;
  marginX: number;
  marginY: number;
  bodyFont: string;
  headingFont: string;
  headerPosition: "top" | "left" | "right";
  colorMode: "basic" | "advanced" | "border";
  colorType: "accent" | "multi" | "image";
  accentColor: string;
  datePosition: "left" | "right";
  declarationPosition: "left" | "right";
  showDeclarationLine: boolean;
  footerPageNumbers: boolean;
  footerEmail: boolean;
  footerName: boolean;
  linkUnderline: boolean;
  linkBlue: boolean;
  linkIcon: boolean;
  linkIconStyle: "link" | "external";
  headerAlign: "left" | "center" | "right";
  headerArrangement: "stacked" | "inline";
  contactSeparator: "icon" | "bullet" | "bar";
  iconStyle: number;
  nameSize: "xs" | "s" | "m" | "l" | "xl";
  nameBold: boolean;
  nameFont: "body" | "creative";
  titleSize: "s" | "m" | "l";
  language: string;
  pageFormat: string;
  syncWithResume: boolean;
}

function getTodayFormatted(): string {
  const d = new Date();
  const day = d.getDate();
  const suffix = [, "st", "nd", "rd"][(day % 100 >> 3) ^ 1 && day % 10] || "th";
  const month = d.toLocaleString("en-GB", { month: "long" });
  return `${day}${suffix} ${month} ${d.getFullYear()}`;
}

export const DEFAULT_COVER_LETTER_DATA: CoverLetterData = {
  personalDetails: {
    fullName: "",
    professionalTitle: "",
    email: "",
    phone: "",
    location: "",
    photo: "",
    extras: [],
  },
  date: getTodayFormatted(),
  recipient: {
    recipientName: "",
    companyName: "",
    companyAddress: "",
  },
  body: "<p>Dear ______,</p><p></p><p></p><p>Sincerely,</p>",
  signature: {
    fullName: "",
    place: "",
    date: "",
    signatureImage: "",
  },
};

export const DEFAULT_COVER_LETTER_CUSTOMIZE: CoverLetterCustomize = {
  fontSize: 11,
  lineHeight: 1.5,
  marginX: 16,
  marginY: 16,
  bodyFont: "'Source Sans 3', sans-serif",
  headingFont: "'Source Sans 3', sans-serif",
  headerPosition: "top",
  colorMode: "basic",
  colorType: "accent",
  accentColor: "#1e293b",
  datePosition: "right",
  declarationPosition: "left",
  showDeclarationLine: true,
  footerPageNumbers: false,
  footerEmail: false,
  footerName: false,
  linkUnderline: true,
  linkBlue: true,
  linkIcon: false,
  linkIconStyle: "link",
  headerAlign: "center",
  headerArrangement: "stacked",
  contactSeparator: "icon",
  iconStyle: 0,
  nameSize: "s",
  nameBold: true,
  nameFont: "body",
  titleSize: "m",
  language: "en-GB",
  pageFormat: "a4",
  syncWithResume: false,
};
