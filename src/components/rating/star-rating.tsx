"use client";

import { cn } from "@/lib/utils";

interface StarRatingProps {
  value: number;
  onChange: (value: number) => void;
  label: string;
}

export function StarRating({ value, onChange, label }: StarRatingProps) {
  return (
    <div>
      <p className="mb-2 font-medium text-gray-900">{label}</p>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            key={star}
            onClick={() => onChange(star)}
            className={cn(
              "text-3xl transition-colors",
              star <= value
                ? "text-yellow-400"
                : "text-gray-300 hover:text-yellow-200"
            )}
          >
            ★
          </button>
        ))}
      </div>
    </div>
  );
}
