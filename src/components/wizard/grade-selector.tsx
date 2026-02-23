"use client";

import { GRADE_LEVELS, type GradeLevel } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Grade level icons — clean SVG, no emoji
function GradeIcon({ value, active }: { value: string; active: boolean }) {
  const color = active ? "var(--desk-teal)" : "var(--desk-muted)";
  switch (value) {
    case "primary":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
          <circle cx="16" cy="10" r="5" stroke={color} strokeWidth="1.5"/>
          <path d="M6 26c0-5.523 4.477-10 10-10s10 4.477 10 10" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    case "middle_school":
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
          <path d="M16 4L4 10v1l12 6 12-6V10L16 4z" stroke={color} strokeWidth="1.5" strokeLinejoin="round"/>
          <path d="M4 10v8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M10 13v7a6 6 0 0012 0v-7" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      );
    default: // high_school
      return (
        <svg viewBox="0 0 32 32" fill="none" className="w-5 h-5 shrink-0" aria-hidden="true">
          <rect x="5" y="8" width="22" height="18" rx="2" stroke={color} strokeWidth="1.5"/>
          <path d="M5 13h22" stroke={color} strokeWidth="1.5"/>
          <path d="M16 8V4" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 4h8" stroke={color} strokeWidth="1.5" strokeLinecap="round"/>
          <rect x="10" y="18" width="12" height="4" rx="1" stroke={color} strokeWidth="1.2"/>
        </svg>
      );
  }
}

interface GradeSelectorProps {
  value: GradeLevel | null;
  onChange: (grade: GradeLevel) => void;
}

export function GradeSelector({ value, onChange }: GradeSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {GRADE_LEVELS.map((grade) => {
        const isActive = value === grade.value;
        return (
          <button
            key={grade.value}
            onClick={() => onChange(grade.value)}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-2.5 rounded-lg border px-4 py-2.5 text-left transition-all duration-150",
              isActive
                ? "border-[var(--desk-teal)] bg-[var(--desk-teal)] text-white shadow-sm"
                : "border-[var(--desk-border)] bg-[var(--desk-paper)] hover:border-[var(--desk-teal)] hover:bg-[var(--desk-paper)]"
            )}
          >
            <GradeIcon value={grade.value} active={isActive} />
            <div className="text-left">
              <p
                className="text-sm font-semibold leading-tight"
                style={{ color: isActive ? "white" : "var(--desk-ink)" }}
              >
                {grade.label}
              </p>
              <p
                className="text-xs leading-tight mt-0.5"
                style={{ color: isActive ? "rgba(255,255,255,0.75)" : "var(--desk-muted)" }}
              >
                {grade.description}
              </p>
            </div>
          </button>
        );
      })}
    </div>
  );
}

