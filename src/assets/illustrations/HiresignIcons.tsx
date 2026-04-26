interface IconProps {
  size?: number;
  className?: string;
}

const STROKE = 1.5;

/* Stack of resumes / documents, for "20,000+ resumes reviewed" */
export function ResumeStackIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <rect x="14" y="10" width="32" height="40" rx="3" fill="hsl(var(--gold-soft))" stroke="hsl(var(--gold))" strokeWidth={STROKE} />
      <rect x="18" y="14" width="32" height="40" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <line x1="24" y1="24" x2="44" y2="24" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" />
      <line x1="24" y1="30" x2="40" y2="30" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="24" y1="36" x2="42" y2="36" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="24" y1="42" x2="36" y2="42" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <circle cx="48" cy="46" r="6" fill="hsl(var(--gold))" />
      <path d="M45 46 L47 48 L51 44" stroke="hsl(var(--card))" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Three figures, for "750+ people hired" */
export function ThreeFiguresIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Left figure */}
      <circle cx="16" cy="22" r="5" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <path d="M8 46 C8 38 11 34 16 34 C21 34 24 38 24 46" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" fill="hsl(var(--gold-soft))" />
      {/* Center figure (taller, gold accent) */}
      <circle cx="32" cy="18" r="6" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <path d="M22 50 C22 40 26 34 32 34 C38 34 42 40 42 50" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" fill="hsl(var(--executive-green))" />
      {/* Right figure */}
      <circle cx="48" cy="22" r="5" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <path d="M40 46 C40 38 43 34 48 34 C53 34 56 38 56 46" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" fill="hsl(var(--gold-soft))" />
    </svg>
  );
}

/* Office building / insider, for "Recruiter at Uber Taiwan" */
export function InsiderIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Building */}
      <rect x="14" y="14" width="36" height="40" rx="2" fill="hsl(var(--card))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      {/* Roof accent */}
      <rect x="12" y="12" width="40" height="4" rx="1" fill="hsl(var(--executive-green))" />
      {/* Windows grid */}
      <rect x="20" y="22" width="6" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="29" y="22" width="6" height="6" rx="1" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="38" y="22" width="6" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="20" y="32" width="6" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="29" y="32" width="6" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="38" y="32" width="6" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      {/* Door */}
      <rect x="28" y="44" width="8" height="10" rx="1" fill="hsl(var(--executive-green))" />
      <circle cx="34" cy="49" r="0.6" fill="hsl(var(--gold))" />
    </svg>
  );
}

/* Pulse / signal mark, generic accent */
export function PulseIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <circle cx="32" cy="32" r="24" stroke="currentColor" strokeWidth="1.5" fill="none" opacity="0.4" />
      <path d="M14 36 L22 36 L26 22 L32 46 L38 28 L42 36 L50 26"
        stroke="currentColor" strokeWidth="2.5"
        strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Upload doc, for "Upload Your Resume" */
export function UploadDocIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Doc */}
      <rect x="14" y="20" width="28" height="36" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <line x1="20" y1="30" x2="36" y2="30" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="20" y1="36" x2="34" y2="36" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="20" y1="42" x2="32" y2="42" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      {/* Upload arrow ring */}
      <circle cx="46" cy="20" r="10" fill="hsl(var(--gold))" />
      <path d="M46 25 L46 15 M42 19 L46 15 L50 19" stroke="hsl(var(--card))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Score / scan, for "Get Your Score and Tips" */
export function ScoreScanIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Doc */}
      <rect x="12" y="12" width="32" height="40" rx="3" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <line x1="18" y1="22" x2="38" y2="22" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.5" />
      <line x1="18" y1="28" x2="34" y2="28" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.5" />
      <line x1="18" y1="34" x2="36" y2="34" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.5" />
      {/* Score badge */}
      <circle cx="46" cy="44" r="11" fill="hsl(var(--executive-green))" stroke="hsl(var(--gold))" strokeWidth={STROKE} />
      <text x="46" y="48" textAnchor="middle" fill="hsl(var(--gold))" fontFamily="Geist, sans-serif" fontWeight="700" fontSize="11">A+</text>
    </svg>
  );
}

/* Trophy / offer, for "Land Your Dream Offer" */
export function OfferTrophyIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Cup body */}
      <path d="M22 14 L42 14 L40 32 C40 36 36 40 32 40 C28 40 24 36 24 32 Z" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinejoin="round" />
      {/* Handles */}
      <path d="M22 18 C16 18 14 22 14 26 C14 30 18 32 22 30" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" fill="none" />
      <path d="M42 18 C48 18 50 22 50 26 C50 30 46 32 42 30" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" fill="none" />
      {/* Stem */}
      <line x1="32" y1="40" x2="32" y2="46" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" />
      {/* Base */}
      <rect x="22" y="46" width="20" height="6" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      {/* Star */}
      <path d="M32 22 L33.2 25 L36.5 25.3 L34 27.5 L34.7 30.7 L32 29 L29.3 30.7 L30 27.5 L27.5 25.3 L30.8 25 Z" fill="hsl(var(--card))" />
    </svg>
  );
}

/* Trending bar chart, for salary "numbers speak" section. Editorial, not clipart. */
export function CoinStackIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Soft tinted plate */}
      <rect x="6" y="6" width="52" height="52" rx="10" fill="hsl(var(--gold-soft))" />
      {/* Baseline */}
      <line x1="14" y1="48" x2="50" y2="48" stroke="hsl(var(--executive-green))" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      {/* Bars, ascending */}
      <rect x="16" y="36" width="6" height="12" rx="1" fill="hsl(var(--executive-green))" opacity="0.35" />
      <rect x="26" y="28" width="6" height="20" rx="1" fill="hsl(var(--executive-green))" opacity="0.55" />
      <rect x="36" y="20" width="6" height="28" rx="1" fill="hsl(var(--gold))" />
      {/* Trend arrow */}
      <path d="M16 40 L26 32 L36 24 L46 14" stroke="hsl(var(--executive-green))" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M40 14 L46 14 L46 20" stroke="hsl(var(--executive-green))" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" fill="none" />
    </svg>
  );
}

/* Concentric rings + central mark, for "Downloads" stat. Reads as reach / signal. */
export function DownloadCloudIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Soft tinted plate */}
      <rect x="6" y="6" width="52" height="52" rx="10" fill="hsl(var(--gold-soft))" />
      {/* Concentric rings */}
      <circle cx="32" cy="32" r="20" stroke="hsl(var(--executive-green))" strokeWidth="1" fill="none" opacity="0.25" />
      <circle cx="32" cy="32" r="14" stroke="hsl(var(--executive-green))" strokeWidth="1" fill="none" opacity="0.45" />
      <circle cx="32" cy="32" r="8" fill="hsl(var(--executive-green))" />
      {/* Down chevron, implies "delivered to you" */}
      <path d="M28 30 L32 35 L36 30" stroke="hsl(var(--gold))" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Tick accents */}
      <circle cx="32" cy="10" r="1.5" fill="hsl(var(--gold))" />
      <circle cx="54" cy="32" r="1.5" fill="hsl(var(--gold))" />
      <circle cx="32" cy="54" r="1.5" fill="hsl(var(--gold))" />
      <circle cx="10" cy="32" r="1.5" fill="hsl(var(--gold))" />
    </svg>
  );
}

/* Open book, for guides / library */
export function GuideBookIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Left page */}
      <path d="M10 18 C10 16 12 14 14 14 L30 14 C31 14 32 15 32 16 L32 50 C32 51 31 52 30 52 L14 52 C12 52 10 50 10 48 Z"
        fill="hsl(var(--card))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinejoin="round" />
      {/* Right page */}
      <path d="M54 18 C54 16 52 14 50 14 L34 14 C33 14 32 15 32 16 L32 50 C32 51 33 52 34 52 L50 52 C52 52 54 50 54 48 Z"
        fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinejoin="round" />
      {/* Spine */}
      <line x1="32" y1="14" x2="32" y2="52" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" />
      {/* Left page lines */}
      <line x1="16" y1="22" x2="28" y2="22" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="16" y1="28" x2="26" y2="28" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="16" y1="34" x2="28" y2="34" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      {/* Right page lines */}
      <line x1="36" y1="22" x2="48" y2="22" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      <line x1="36" y1="28" x2="46" y2="28" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      {/* Gold bookmark ribbon on right page */}
      <path d="M44 14 L44 24 L46 22 L48 24 L48 14" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinejoin="round" />
    </svg>
  );
}

/* Clipboard with checkmarks, for interview prep / scorecard / checklist */
export function ChecklistIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      {/* Clip top */}
      <rect x="24" y="8" width="16" height="6" rx="2" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      {/* Clipboard body */}
      <rect x="14" y="12" width="36" height="44" rx="3" fill="hsl(var(--card))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      {/* Row 1: check + line */}
      <circle cx="22" cy="24" r="3" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <path d="M20.5 24 L21.5 25 L23.5 23" stroke="hsl(var(--executive-green))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="28" y1="24" x2="44" y2="24" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      {/* Row 2 */}
      <circle cx="22" cy="34" r="3" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <path d="M20.5 34 L21.5 35 L23.5 33" stroke="hsl(var(--executive-green))" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <line x1="28" y1="34" x2="42" y2="34" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
      {/* Row 3 (unchecked, gold accent ring) */}
      <circle cx="22" cy="44" r="3" fill="hsl(var(--card))" stroke="hsl(var(--gold))" strokeWidth={STROKE} />
      <line x1="28" y1="44" x2="40" y2="44" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" opacity="0.6" />
    </svg>
  );
}

/* Bar chart, for salary section */
export function BarChartIcon({ size = 56, className = "" }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={className} xmlns="http://www.w3.org/2000/svg">
      <line x1="10" y1="52" x2="56" y2="52" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} strokeLinecap="round" />
      <rect x="14" y="36" width="8" height="16" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="26" y="26" width="8" height="26" rx="1" fill="hsl(var(--gold-soft))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
      <rect x="38" y="14" width="8" height="38" rx="1" fill="hsl(var(--gold))" stroke="hsl(var(--executive-green))" strokeWidth={STROKE} />
    </svg>
  );
}
