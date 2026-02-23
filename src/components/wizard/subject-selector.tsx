"use client";

import { SUBJECTS } from "@/lib/constants";
import { cn } from "@/lib/utils";

// Clean SVG icons for each subject — no emoji
function SubjectIcon({ value, active }: { value: string; active: boolean }) {
  const color = active ? "var(--desk-teal)" : "var(--desk-muted)";
  const cls = "w-4 h-4 shrink-0";
  switch (value) {
    case "mathematics":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" className={cls} aria-hidden="true">
          <line x1="5" y1="12" x2="19" y2="12"/><line x1="12" y1="5" x2="12" y2="19"/>
          <line x1="7" y1="7" x2="17" y2="17"/><line x1="17" y1="7" x2="7" y2="17"/>
        </svg>
      );
    case "science":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M9 3h6"/><path d="M10 3v7l-4 8a1 1 0 0 0 .9 1.5h10.2a1 1 0 0 0 .9-1.5L14 10V3"/>
        </svg>
      );
    case "english":
    case "arabic":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M4 7V4h16v3"/><path d="M9 20h6"/><path d="M12 4v16"/>
        </svg>
      );
    case "history":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M3 3v18h18"/><path d="M7 16l4-4 4 4 4-4"/>
        </svg>
      );
    case "geography":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><path d="M3 12h18"/><path d="M12 3a15 15 0 0 1 0 18"/><path d="M12 3a15 15 0 0 0 0 18"/>
        </svg>
      );
    case "islamic_studies":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      );
    case "social_studies":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    case "art":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="3"/>
          <line x1="12" y1="3" x2="12" y2="9"/><line x1="12" y1="15" x2="12" y2="21"/>
          <line x1="3" y1="12" x2="9" y2="12"/><line x1="15" y1="12" x2="21" y2="12"/>
        </svg>
      );
    case "physical_education":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="12" cy="5" r="2"/><path d="M12 7v6l4 4"/><path d="M12 13l-4 4"/>
          <path d="M8 7H5"/><path d="M19 7h-3"/>
        </svg>
      );
    case "computer_science":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8"/><path d="M12 17v4"/>
          <path d="M8 11l2 2-2 2"/><line x1="12" y1="15" x2="16" y2="15"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
        </svg>
      );
  }
}

interface SubjectSelectorProps {
  value: string | null;
  onChange: (subject: string) => void;
}

export function SubjectSelector({ value, onChange }: SubjectSelectorProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {SUBJECTS.map((subject) => {
        const isActive = value === subject.value;
        return (
          <button
            key={subject.value}
            onClick={() => onChange(subject.value)}
            aria-pressed={isActive}
            className={cn(
              "flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm font-medium transition-all duration-150",
              isActive
                ? "border-[var(--desk-teal)] bg-[var(--desk-teal)] text-white shadow-sm"
                : "border-[var(--desk-border)] bg-[var(--desk-paper)] text-[var(--desk-body)] hover:border-[var(--desk-teal)] hover:text-[var(--desk-ink)]"
            )}
          >
            <SubjectIcon value={subject.value} active={isActive} />
            {subject.label}
          </button>
        );
      })}
    </div>
  );
}

