"use client";

import type { Era } from "@/lib/eras";

interface EraCardProps {
  era: Era;
  selected: boolean;
  onSelect: (id: string) => void;
}

// Roman numeral ornaments for each era
const ERA_GLYPHS: Record<string, string> = {
  "1.0": "I",
  "2.0": "II",
  "3.0": "III",
  "4.0": "IV",
};

export default function EraCard({ era, selected, onSelect }: EraCardProps) {
  return (
    <button
      onClick={() => onSelect(era.id)}
      aria-pressed={selected}
      className={`
        group relative w-full text-left rounded-lg border transition-all duration-300
        focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-light focus-visible:ring-offset-2 focus-visible:ring-offset-ink
        ${
          selected
            ? "border-gold bg-ink-light shadow-[0_0_30px_rgba(201,150,62,0.2)]"
            : "border-ink-muted bg-ink-light hover:border-gold/50 hover:shadow-[0_0_20px_rgba(201,150,62,0.08)]"
        }
      `}
    >
      {/* Gold accent bar on top when selected */}
      <div
        className={`absolute inset-x-0 top-0 h-0.5 rounded-t-lg transition-all duration-300 ${
          selected ? "bg-gold" : "bg-transparent group-hover:bg-gold/30"
        }`}
      />

      <div className="p-5 sm:p-6">
        <div className="flex items-start gap-4">
          {/* Roman numeral glyph */}
          <div
            className={`
              shrink-0 w-10 h-10 rounded-full border flex items-center justify-center
              font-display text-sm font-bold transition-colors duration-300
              ${
                selected
                  ? "border-gold text-gold bg-gold/10"
                  : "border-ink-muted text-cream-muted group-hover:border-gold/50 group-hover:text-gold-light"
              }
            `}
          >
            {ERA_GLYPHS[era.id]}
          </div>

          <div className="flex-1 min-w-0">
            <div className="flex items-baseline gap-2 flex-wrap">
              <span
                className={`font-display text-lg font-bold transition-colors duration-300 ${
                  selected ? "text-gold" : "text-cream group-hover:text-gold-light"
                }`}
              >
                {era.label}
              </span>
              <span className="text-cream-muted text-sm tabular-nums">{era.yearRange}</span>
            </div>

            <p className="mt-1 text-sm text-cream-muted leading-snug">{era.description}</p>

            <p
              className={`mt-2 text-xs italic leading-snug transition-colors duration-300 ${
                selected ? "text-gold-light/80" : "text-cream-muted/60 group-hover:text-cream-muted"
              }`}
            >
              &ldquo;{era.flavor}&rdquo;
            </p>
          </div>

          {/* Checkmark */}
          <div
            className={`shrink-0 mt-0.5 transition-all duration-300 ${
              selected ? "opacity-100 scale-100" : "opacity-0 scale-75"
            }`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gold"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>
      </div>
    </button>
  );
}
