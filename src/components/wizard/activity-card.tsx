"use client";

import { StampBadge } from "@/components/ui-desk";

/** SVG icon for each category — no emoji */
function CategoryIcon({ category, className }: { category: string; className?: string }) {
  const cls = className ?? "w-6 h-6";
  switch (category) {
    case "debate":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        </svg>
      );
    case "documentary":
    case "acting":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18"/>
          <line x1="7" y1="2" x2="7" y2="22"/><line x1="17" y1="2" x2="17" y2="22"/>
          <line x1="2" y1="12" x2="22" y2="12"/><line x1="2" y1="7" x2="7" y2="7"/>
          <line x1="2" y1="17" x2="7" y2="17"/><line x1="17" y1="17" x2="22" y2="17"/>
          <line x1="17" y1="7" x2="22" y2="7"/>
        </svg>
      );
    case "conference":
    case "presentation":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      );
    case "experiment":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M9 3h6"/><path d="M10 3v7l-4 8a1 1 0 0 0 .9 1.5h10.2a1 1 0 0 0 .9-1.5L14 10V3"/>
        </svg>
      );
    case "quiz":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="9" y1="15" x2="15" y2="15"/><line x1="9" y1="11" x2="15" y2="11"/><line x1="9" y1="19" x2="11" y2="19"/>
        </svg>
      );
    case "group_discussion":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/>
          <path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      );
    case "creative_project":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="12" cy="12" r="10"/><line x1="14.31" y1="8" x2="20.05" y2="17.94"/>
          <line x1="9.69" y1="8" x2="21.17" y2="8"/><line x1="7.38" y1="12" x2="13.12" y2="2.06"/>
          <line x1="9.69" y1="16" x2="3.95" y2="6.06"/><line x1="14.31" y1="16" x2="2.83" y2="16"/>
          <line x1="16.62" y1="12" x2="10.88" y2="21.94"/>
        </svg>
      );
    case "simulation":
    case "role_play":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
        </svg>
      );
    case "field_study":
    case "research_project":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
      );
    case "peer_teaching":
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={cls} aria-hidden="true">
          <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
          <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
        </svg>
      );
  }
}

/** Derives rough metadata stamps from the category label */
function getCategoryMeta(category: string): { prep: string; group: string; energy: string } {
  const energyMap: Record<string, string> = {
    debate: "High",
    acting: "High",
    role_play: "High",
    simulation: "High",
    experiment: "Med",
    conference: "Med",
    group_discussion: "Med",
    creative_project: "Med",
    quiz: "Low",
    research_project: "Low",
    documentary: "Low",
    presentation: "Med",
    peer_teaching: "Med",
    field_study: "Med",
  };
  const prepMap: Record<string, string> = {
    experiment: "30 min",
    documentary: "45 min",
    research_project: "60 min",
    field_study: "60 min",
    quiz: "10 min",
    debate: "20 min",
    presentation: "30 min",
    creative_project: "40 min",
  };
  return {
    prep: prepMap[category] ?? "15 min",
    group: ["debate", "group_discussion", "simulation", "role_play"].includes(category) ? "Groups" : "Flexible",
    energy: energyMap[category] ?? "Med",
  };
}

interface ActivityCardProps {
  title: string;
  category: string;
  summary: string;
  index: number;
  onViewDetail: () => void;
}

export function ActivityCard({
  title,
  category,
  summary,
  index,
  onViewDetail,
}: ActivityCardProps) {
  const categoryLabel = category.replace(/_/g, " ");
  const meta = getCategoryMeta(category);

  // Rotate card colors by index for visual variety
  const accentColors = ["teal", "rose", "sage", "accent"] as const;
  const accent = accentColors[index % accentColors.length];

  return (
    <button
      onClick={onViewDetail}
      className="paper-card text-left w-full group flex flex-col p-5 gap-4 focus-visible:ring-2 focus-visible:ring-[var(--desk-teal)]"
      aria-label={`View details for ${title}`}
    >
      {/* Header row */}
      <div className="flex items-start gap-3">
        <span
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg mt-0.5"
          style={{ background: `color-mix(in srgb, var(--desk-${accent === "accent" ? "accent" : accent}) 12%, transparent)`, color: `var(--desk-${accent === "accent" ? "ink" : accent})` }}
        >
          <CategoryIcon category={category} className="w-5 h-5" />
        </span>
        <div className="flex-1 min-w-0">
          <h3
            className="font-bold text-base leading-snug line-clamp-2"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
          >
            {title}
          </h3>
          <span
            className="stamp-badge mt-1.5 inline-block"
            style={{
              color: `var(--desk-${accent === "accent" ? "ink" : accent})`,
              borderColor: `var(--desk-${accent === "accent" ? "accent" : accent})`,
              background: `color-mix(in srgb, var(--desk-${accent === "accent" ? "accent" : accent}) 10%, transparent)`,
              fontSize: "0.625rem",
            }}
          >
            {categoryLabel}
          </span>
        </div>
      </div>

      {/* Summary */}
      <p
        className="text-sm leading-relaxed line-clamp-3 flex-1"
        style={{ color: "var(--desk-muted)" }}
      >
        {summary}
      </p>

      {/* Metadata stamps */}
      <div className="flex flex-wrap gap-1.5 pt-1 border-t border-[var(--desk-border)]">
        <StampBadge color="ink">Prep {meta.prep}</StampBadge>
        <StampBadge color="ink">{meta.group}</StampBadge>
        <StampBadge
          color={meta.energy === "High" ? "rose" : meta.energy === "Med" ? "teal" : "ink"}
        >
          {meta.energy} energy
        </StampBadge>
      </div>

      {/* View CTA */}
      <div
        className="text-xs font-semibold flex items-center gap-1 group-hover:gap-2 transition-all"
        style={{ color: "var(--desk-teal)" }}
      >
        View full plan
      </div>
    </button>
  );
}

