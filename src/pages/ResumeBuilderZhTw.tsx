import { lazy } from "react";

// The Resume Builder is language-agnostic (UI labels are minimal/icon-based).
// We re-export the same component; the zh-tw route simply provides the path context.
// In the future, labels can be swapped via i18n context if needed.

const ResumeBuilder = lazy(() => import("./ResumeBuilder"));

export default function ResumeBuilderZhTw() {
  return <ResumeBuilder />;
}
