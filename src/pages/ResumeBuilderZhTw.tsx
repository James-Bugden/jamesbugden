import { Suspense } from "react";
import { ResumeBuilderLangContext } from "@/components/resume-builder/i18n";

// Dynamically import the actual builder to avoid circular dependency
import ResumeBuilder from "./ResumeBuilder";

export default function ResumeBuilderZhTw() {
  return (
    <ResumeBuilderLangContext.Provider value="zh-tw">
      <ResumeBuilder />
    </ResumeBuilderLangContext.Provider>
  );
}
