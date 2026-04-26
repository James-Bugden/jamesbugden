import { CSSProperties } from "react";

type WordmarkVariant = "primary" | "mono" | "mark-only";

interface WordmarkProps {
  variant?: WordmarkVariant;
  size?: number;
  className?: string;
  showName?: boolean;
  style?: CSSProperties;
}

/**
 * Hiresign lockup — pulse-in-seal mark + lowercase wordmark.
 * Color is driven by `currentColor` on the SVG and `text-*` on the parent.
 */
export function Wordmark({
  variant = "primary",
  size = 32,
  className = "",
  showName,
  style,
}: WordmarkProps) {
  const renderName = showName ?? variant !== "mark-only";

  const color = variant === "primary" ? "var(--brand-primary, #B08A3E)" : "currentColor";
  const ringColor = variant === "primary" ? "var(--brand-primary, #B08A3E)" : "currentColor";

  return (
    <span
      className={`inline-flex items-center gap-2 align-middle ${className}`}
      style={style}
      aria-label="Hiresign"
    >
      <span
        aria-hidden="true"
        style={{ display: "inline-flex", width: size, height: size, color }}
      >
        <svg
          width={size}
          height={size}
          viewBox="0 0 60 60"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <circle
            cx="30"
            cy="30"
            r="22"
            stroke={ringColor}
            strokeWidth="1.5"
            fill="none"
            opacity="0.55"
          />
          <path
            d="M14 34 L20 34 L24 22 L30 42 L36 28 L40 34 L46 26"
            stroke="currentColor"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            fill="none"
          />
        </svg>
      </span>
      {renderName && (
        <span
          style={{
            fontFamily: "var(--font-brand)",
            fontWeight: 700,
            letterSpacing: "-0.025em",
            fontSize: Math.round(size * 0.6),
            lineHeight: 1,
          }}
        >
          hiresign
        </span>
      )}
    </span>
  );
}

export default Wordmark;
