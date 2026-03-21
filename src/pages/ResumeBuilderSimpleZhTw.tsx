import { ResumeBuilderLangContext } from "@/components/resume-builder/i18n";
import ResumeBuilderSimple from "./ResumeBuilderSimple";

export default function ResumeBuilderSimpleZhTw() {
  return (
    <ResumeBuilderLangContext.Provider value="zh-tw">
      <ResumeBuilderSimple />
    </ResumeBuilderLangContext.Provider>
  );
}
