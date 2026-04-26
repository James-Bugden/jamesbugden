interface PainMarkerProps {
  size?: number;
}

/**
 * Stylized pain-point marker — destructive-soft plate with refined X stroke.
 * Mirrors the green-soft square icon pattern used in hero stat row.
 */
export default function PainMarker({ size = 28 }: PainMarkerProps) {
  return (
    <span
      aria-hidden="true"
      className="inline-flex items-center justify-center flex-shrink-0 rounded-md"
      style={{
        width: size,
        height: size,
        background: 'hsl(var(--destructive-soft))',
        border: '1px solid hsl(var(--destructive) / 0.18)',
      }}
    >
      <svg
        width={size * 0.5}
        height={size * 0.5}
        viewBox="0 0 24 24"
        fill="none"
        stroke="hsl(var(--destructive))"
        strokeWidth="2.5"
        strokeLinecap="round"
      >
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="18" y1="6" x2="6" y2="18" />
      </svg>
    </span>
  );
}
