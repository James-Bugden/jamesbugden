import { useState, useCallback, useRef } from "react";

interface CurrencyInputProps {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  disabled?: boolean;
  disabledPlaceholder?: string;
  prefix?: string;
  suffix?: string;
  isLarge?: boolean;
  min?: number;
  max?: number;
  className?: string;
  ariaLabel?: string;
}

export function formatCurrency(value: number): string {
  if (value === 0) return "$0";
  return "$" + Math.round(value).toLocaleString("en-US");
}

export function CurrencyInput({
  value,
  onChange,
  placeholder = "0",
  disabled = false,
  disabledPlaceholder,
  prefix = "$",
  suffix,
  isLarge = false,
  min = 0,
  max,
  className = "",
  ariaLabel,
}: CurrencyInputProps) {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setDisplayValue(value === 0 ? "" : String(value));
    setTimeout(() => inputRef.current?.select(), 0);
  }, [value]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    const parsed = parseFloat(displayValue.replace(/,/g, "")) || 0;
    const clamped = Math.max(min, max != null ? Math.min(parsed, max) : parsed);
    onChange(clamped);
  }, [displayValue, onChange, min, max]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      setDisplayValue(raw);
      const parsed = parseFloat(raw) || 0;
      const clamped = Math.max(min, max != null ? Math.min(parsed, max) : parsed);
      onChange(clamped);
    },
    [onChange, min, max]
  );

  if (disabled) {
    return (
      <div
        className={`h-12 flex items-center px-3 rounded-lg bg-muted text-muted-foreground text-sm ${className}`}
      >
        {disabledPlaceholder || "N/A"}
      </div>
    );
  }

  const formattedValue =
    value === 0 ? "" : Math.round(value).toLocaleString("en-US");

  return (
    <div className={`relative ${className}`}>
      {prefix && !focused && value === 0 ? null : (
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
          {prefix}
        </span>
      )}
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={focused ? displayValue : formattedValue}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className={`w-full rounded-lg border border-input bg-background px-3 py-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors ${
          prefix ? "pl-7" : ""
        } ${suffix ? "pr-8" : ""} ${
          isLarge ? "text-base font-semibold h-14" : "text-sm h-12"
        }`}
      />
      {suffix && (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
          {suffix}
        </span>
      )}
    </div>
  );
}

interface PercentInputProps {
  value: number;
  onChange: (val: number) => void;
  placeholder?: string;
  max?: number;
  ariaLabel?: string;
}

export function PercentInput({
  value,
  onChange,
  placeholder = "0",
  max = 100,
  ariaLabel,
}: PercentInputProps) {
  const [focused, setFocused] = useState(false);
  const [displayValue, setDisplayValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const handleFocus = useCallback(() => {
    setFocused(true);
    setDisplayValue(value === 0 ? "" : String(value));
    setTimeout(() => inputRef.current?.select(), 0);
  }, [value]);

  const handleBlur = useCallback(() => {
    setFocused(false);
    const parsed = parseFloat(displayValue) || 0;
    onChange(Math.max(0, Math.min(parsed, max)));
  }, [displayValue, onChange, max]);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const raw = e.target.value.replace(/[^0-9.]/g, "");
      setDisplayValue(raw);
      const parsed = parseFloat(raw) || 0;
      onChange(Math.max(0, Math.min(parsed, max)));
    },
    [onChange, max]
  );

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={focused ? displayValue : value === 0 ? "" : String(value)}
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        placeholder={placeholder}
        aria-label={ariaLabel}
        className="w-full rounded-lg border border-input bg-background px-3 py-2 pr-8 text-sm h-12 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring transition-colors"
      />
      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm pointer-events-none">
        %
      </span>
    </div>
  );
}
