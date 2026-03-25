import { Suspense } from "react";
import { ResumeBuilderLangContext } from "@/components/resume-builder/i18n";

// Dynamically import the actual builder to avoid circular dependency
import ResumeBuilder from "./ResumeBuilder";
import { SEO } from "@/components/SEO";

export default function ResumeBuilderZhTw() {
  return (
    <>
    <SEO />
    <ResumeBuilderLangContext.Provider value="zh-tw">
      <ResumeBuilder />
    </ResumeBuilderLangContext.Provider>
  );
}
