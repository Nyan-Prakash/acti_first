"use client";

import { GRADE_LEVELS, type GradeLevel } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface GradeSelectorProps {
  value: GradeLevel | null;
  onChange: (grade: GradeLevel) => void;
}

export function GradeSelector({ value, onChange }: GradeSelectorProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      {GRADE_LEVELS.map((grade) => (
        <button
          key={grade.value}
          onClick={() => onChange(grade.value)}
          className={cn(
            "flex flex-col items-center gap-2 rounded-xl border-2 bg-white p-6 text-center transition-all hover:shadow-md",
            value === grade.value
              ? "border-blue-600 bg-blue-50 shadow-md"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="text-4xl">{grade.icon}</span>
          <span className="text-lg font-semibold text-gray-900">
            {grade.label}
          </span>
          <span className="text-sm text-gray-500">{grade.description}</span>
        </button>
      ))}
    </div>
  );
}
