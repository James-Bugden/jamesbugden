import { ReactNode, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Linkedin } from "lucide-react";
import { Wordmark } from "@/components/Wordmark";
import { AuthHeaderButton } from "@/components/AuthHeaderButton";
import LanguageToggle from "@/components/LanguageToggle";
import { InstagramIcon, ThreadsIcon } from "@/components/SocialIcons";
import PromoBanner from "@/components/PromoBanner";

export type SiteHeaderVariant = "light" | "dark";
export type SiteHeaderLang = "en" | "zh";

interface SiteHeaderProps {
  /** Visual treatment. `light` = frosted paper on hero/tool pages. `dark` = bg-executive-green on dashboard/guides. */
  variant?: SiteHeaderVariant;
  /** Locale for wordmark href + language toggle direction. */
  lang?: SiteHeaderLang;
  /** Override the wordmark href. Defaults to `/` (en) or `/zh-tw` (zh). */
  homeHref?: string;
  /** Optional small label rendered after the wordmark, e.g. `My Toolkit` on the dashboard. */
  breadcrumb?: string;
  /** Optional back link rendered to the right of the wordmark. */
  backHref?: string;
  backLabel?: string;
  /** Render `<PromoBanner />` above the nav and stick the whole stack to the top of the viewport. */
  promoBanner?: boolean;
  /** Whether the header sticks to the top of the viewport (independent of promoBanner). Defaults true for `light`, false for `dark`. */
  sticky?: boolean;
  /** Hide the language toggle — useful for routes that are locale-specific (e.g. /zh-tw/quiz). Defaults false (toggle visible). */
  hideLanguageToggle?: boolean;
  /** Hide the auth button — useful for auth-flow pages where re-login UI would be redundant. Defaults false. */
  hideAuth?: boolean;
  /** Show LinkedIn / Instagram / Threads social icons in the right cluster (guides + toolkit). Defaults false. */
  showSocials?: boolean;
  /** Replace the entire right cluster with a custom slot (Dashboard uses this for user greeting + signOut). */
  rightSlot?: ReactNode;
  /** Render arbitrary content directly under the nav (e.g. dashboard sub-nav, scenario selector bar). */
  belowSlot?: ReactNode;
  /** Render arbitrary content centered between LEFT and RIGHT clusters (e.g. dashboard section tabs). Hidden on mobile by default. */
  centerSlot?: ReactNode;
  /** Additional className applied to the outer wrapper. */
  className?: string;
}

/**
 * Single source of truth for every page-level header on the site.
 * Two visual variants ride the same wordmark + auth + language pattern;
 * everything else (back link, promo banner, social icons, sub-nav) is opt-in.
 *
 * Replaces the dozens of one-off inline `<header>` blocks that had drifted
 * apart during the rebrand.
 */
export function SiteHeader({
  variant = "light",
  lang = "en",
  homeHref,
  breadcrumb,
  backHref,
  backLabel,
  promoBanner = false,
  sticky,
  hideLanguageToggle = false,
  hideAuth = false,
  showSocials = false,
  rightSlot,
  belowSlot,
  centerSlot,
  className = "",
}: SiteHeaderProps) {
  const isDark = variant === "dark";
  const isSticky = sticky ?? !isDark;
  const resolvedHomeHref = homeHref ?? (lang === "zh" ? "/zh-tw" : "/");

  // Subtle elevation shadow once the user scrolls past the hero, only on light variant.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    if (isDark) return;
    const onScroll = () => setScrolled(window.scrollY > 80);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [isDark]);

  const wrapperClass = [
    isSticky ? "sticky top-0 z-50" : "",
    "print:hidden",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const navClass = isDark
    ? "bg-executive-green border-b border-executive-green-light/30"
    : `transition-shadow duration-300 border-b border-border ${scrolled ? "shadow-sm" : ""}`;

  const navStyle = isDark
    ? undefined
    : {
        background: "rgba(253,251,247,0.85)",
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
      };

  const wordmarkColor = isDark
    ? "text-cream"
    : "text-executive-green";

  const breadcrumbColor = isDark ? "text-cream/50" : "text-muted-foreground";

  const backLinkColor = isDark
    ? "text-cream/70 hover:text-cream"
    : "text-muted-foreground hover:text-foreground";

  const socialColor = isDark
    ? "text-cream/70 hover:text-cream"
    : "text-muted-foreground hover:text-foreground";

  return (
    <header className={wrapperClass}>
      {promoBanner && <PromoBanner lang={lang} />}
      <nav className={navClass} style={navStyle} aria-label="Main navigation">
        <div className="container mx-auto px-4 sm:px-5 md:px-6 h-14 sm:h-16 flex items-center justify-between gap-4">
          {/* LEFT — wordmark + optional breadcrumb + optional back link */}
          <div className="flex items-center gap-3 min-w-0">
            <Link
              to={resolvedHomeHref}
              className={`cursor-pointer flex items-center gap-2 ${wordmarkColor}`}
              aria-label="Hiresign, by James Bugden"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            >
              <Wordmark variant="mono" size={28} />
            </Link>
            {breadcrumb && (
              <>
                <span className={`hidden sm:inline ${isDark ? "text-cream/30" : "text-muted-foreground/40"}`}>/</span>
                <span className={`hidden sm:inline text-sm font-semibold whitespace-nowrap ${breadcrumbColor}`}>
                  {breadcrumb}
                </span>
              </>
            )}
            {backHref && (
              <>
                <span className={`hidden sm:inline ${isDark ? "text-cream/30" : "text-muted-foreground/40"}`}>·</span>
                <Link
                  to={backHref}
                  className={`hidden sm:inline-flex items-center gap-1.5 text-sm transition-colors whitespace-nowrap ${backLinkColor}`}
                >
                  <ArrowLeft className="w-4 h-4" />
                  {backLabel ?? (lang === "zh" ? "返回" : "Back")}
                </Link>
              </>
            )}
          </div>

          {/* CENTER — optional sub-nav / tabs (desktop only by default) */}
          {centerSlot && (
            <div className="hidden md:flex items-center gap-1 flex-1 justify-center">
              {centerSlot}
            </div>
          )}

          {/* RIGHT — auth + language + optional socials, OR custom slot */}
          {rightSlot ? (
            <div className="flex items-center gap-2 sm:gap-4">{rightSlot}</div>
          ) : (
            <div className="flex items-center gap-2 sm:gap-4">
              {!hideAuth && <AuthHeaderButton variant={isDark ? "nav" : "light"} />}
              {!hideLanguageToggle && <LanguageToggle variant="nav" />}
              {showSocials && (
                <div className="hidden md:flex items-center gap-3 pl-2">
                  <a
                    href="https://www.linkedin.com/in/james-bugden/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialColor}
                    aria-label="LinkedIn"
                  >
                    <Linkedin className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.instagram.com/james.careers/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialColor}
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-5 h-5" />
                  </a>
                  <a
                    href="https://www.threads.com/@james.careers"
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialColor}
                    aria-label="Threads"
                  >
                    <ThreadsIcon className="w-5 h-5" />
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
        {belowSlot}
      </nav>
    </header>
  );
}

export default SiteHeader;
