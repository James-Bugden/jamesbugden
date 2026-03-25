import { useLocation } from "react-router-dom";
import SiteFooter from "./SiteFooter";

const EXCLUDED_PREFIXES = [
  "/admin",
  "/resume",
  "/zh-tw/resume",
  "/resume-simple",
  "/zh-tw/resume-simple",
  "/login",
  "/signup",
  "/reset-password",
  "/review",
  "/jobs",
  "/tracker",
];

const SiteLayout = ({ children }: { children: React.ReactNode }) => {
  const { pathname } = useLocation();
  const showFooter = !EXCLUDED_PREFIXES.some((p) => pathname === p || pathname.startsWith(p + "/"));

  return (
    <>
      {children}
      {showFooter && <SiteFooter />}
    </>
  );
};

export default SiteLayout;
