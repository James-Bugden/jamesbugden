import { Star } from "lucide-react";

interface Props {
  value: number;
  onChange?: (v: number) => void;
  size?: number;
  readonly?: boolean;
}

export default function ExcitementStars({ value, onChange, size = 16, readonly = false }: Props) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          disabled={readonly}
          onClick={() => onChange?.(value === star ? 0 : star)}
          className={readonly ? "cursor-default" : "cursor-pointer hover:scale-110 transition-transform"}
          aria-label={`${star} star${star > 1 ? "s" : ""}`}
        >
          <Star
            className="transition-colors"
            style={{
              width: size,
              height: size,
              fill: star <= value ? "#C9A961" : "none",
              color: star <= value ? "#C9A961" : "#D1D5DB",
            }}
          />
        </button>
      ))}
    </div>
  );
}
