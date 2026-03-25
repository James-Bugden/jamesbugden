import { ResumeBuilderLangContext } from "@/components/resume-builder/i18n";
import ResumeBuilderSimple from "./ResumeBuilderSimple";
import { SEO } from "@/components/SEO";

export default function ResumeBuilderSimpleZhTw() {
  return (
    <>
    <SEO />
    <ResumeBuilderLangContext.Provider value="zh-tw">
      <ResumeBuilderSimple />
    </ResumeBuilderLangContext.Provider>
    </>
  );
}
