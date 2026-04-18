import { useState, useRef, KeyboardEvent } from "react";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

interface TagInputProps {
  value: string; // comma-separated
  onChange: (val: string) => void;
  placeholder?: string;
  showLevel?: boolean;
}

const SKILL_LEVELS = ["Beginner", "Intermediate", "Advanced", "Expert"];

export function TagInput({ value, onChange, placeholder = "Type and press Enter", showLevel }: TagInputProps) {
  const [input, setInput] = useState("");
  const [dupeError, setDupeError] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const tags = value ? value.split(",").filter(Boolean) : [];

  const addTag = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    if (tags.some(t => t.toLowerCase() === trimmed.toLowerCase())) {
      setDupeError(true);
      return;
    }
    onChange([...tags, trimmed].join(","));
    setInput("");
    setDupeError(false);
    requestAnimationFrame(() => inputRef.current?.focus());
  };

  const removeTag = (idx: number) => {
    onChange(tags.filter((_, i) => i !== idx).join(","));
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      addTag();
    }
    if (e.key === "Backspace" && !input && tags.length) {
      removeTag(tags.length - 1);
    }
  };

  const handleChange = (val: string) => {
    setInput(val);
    if (dupeError) setDupeError(false);
  };

  return (
    <div>
      <div className={cn(
        "rounded-lg bg-[#F5F3EE] px-3 py-2 min-h-[42px] transition-colors",
        dupeError && "ring-2 ring-red-400/70"
      )}>
        <div className="flex flex-wrap gap-1.5 items-center">
          {tags.map((tag, idx) => (
            <span
              key={idx}
              className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white text-sm text-gray-800 border border-gray-200 shadow-sm"
            >
              {tag}
              <button
                onClick={() => removeTag(idx)}
                className="text-gray-400 hover:text-red-500 transition-colors"
              >
                <X className="w-3 h-3" />
              </button>
            </span>
          ))}
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => handleChange(e.target.value)}
            onKeyDown={handleKeyDown}
            onBlur={() => { if (input.trim()) addTag(); }}
            placeholder={tags.length === 0 ? placeholder : ""}
            className="flex-1 min-w-[120px] bg-transparent text-sm outline-none placeholder:text-gray-400 py-1"
          />
        </div>
      </div>
      {dupeError && (
        <p className="text-xs text-red-500 mt-1 ml-1">This item is already added.</p>
      )}
    </div>
  );
}
