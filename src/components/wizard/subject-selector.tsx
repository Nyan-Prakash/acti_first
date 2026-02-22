"use client";

import { SUBJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

interface SubjectSelectorProps {
  value: string | null;
  onChange: (subject: string) => void;
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
      {SUBJECTS.map((subject) => (
        <button
          key={subject.value}
          onClick={() => onChange(subject.value)}
          className={cn(
            "flex flex-col items-center gap-1.5 rounded-lg border-2 bg-white p-4 text-center transition-all hover:shadow-sm",
            value === subject.value
              ? "border-blue-600 bg-blue-50 shadow-sm"
              : "border-gray-200 hover:border-gray-300"
          )}
        >
          <span className="text-2xl">{subject.icon}</span>
          <span className="text-sm font-medium text-gray-900">
            {subject.label}
          </span>
        </button>
      ))}
    </div>
  );
}
