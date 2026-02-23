"use client";

import { cn } from "@/lib/utils";

interface ConjureLoaderProps {
  className?: string;
  label?: string;
  sublabel?: string;
}

/**
 * ConjureLoader — generation loading state with bouncing dots.
 * Subtle 1.2s animation.
 */
export function ConjureLoader({
  className,
  label = "Generating activities…",
  sublabel = "This usually takes 10–20 seconds",
}: ConjureLoaderProps) {
  return (
    <div className={cn("flex flex-col items-center gap-6 py-20", className)}>
      {/* Icon */}
      <div className="relative">
        <svg
          width="40"
          height="40"
          viewBox="0 0 40 40"
          fill="none"
          aria-hidden="true"
          className="text-[var(--desk-teal)]"
        >
        </svg>
      </div>

      {/* Bouncing dots */}
      <div className="flex items-center gap-2" role="status" aria-label={label}>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={cn(
              "conjure-dot h-3 w-3 rounded-full bg-[var(--desk-teal)]",
            )}
          />
        ))}
      </div>

      {/* Labels */}
      <div className="text-center">
        <p className="font-display text-lg font-semibold text-[var(--desk-ink)]">
          {label}
        </p>
        {sublabel && (
          <p className="mt-1 text-sm text-[var(--desk-muted)]">{sublabel}</p>
        )}
      </div>
    </div>
  );
}
