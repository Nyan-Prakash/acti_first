"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, FolderOpen } from "lucide-react";
import { FolderActions } from "./folder-actions";
import { StampBadge } from "@/components/ui-desk";
import { AddToFolderButton } from "./add-to-folder-button";
import { DeleteActivityButton } from "@/components/activity/delete-activity-button";
import { GRADE_LEVELS, SUBJECTS } from "@/lib/constants";

type ActivityRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  grade_level: string;
  subject: string;
  activity_type: string;
  created_at: string;
};

type FolderRow = {
  id: string;
  name: string;
  color: string;
  created_at: string;
};

type FolderActivityRow = {
  folder_id: string;
  activity_id: string;
};

const colorVar: Record<string, string> = {
  teal: "var(--desk-teal)",
  rose: "var(--desk-rose)",
  sage: "var(--desk-sage)",
  accent: "var(--desk-accent)",
};

const colorBg: Record<string, string> = {
  teal: "color-mix(in srgb, var(--desk-teal) 10%, transparent)",
  rose: "color-mix(in srgb, var(--desk-rose) 10%, transparent)",
  sage: "color-mix(in srgb, var(--desk-sage) 10%, transparent)",
  accent: "color-mix(in srgb, var(--desk-accent) 30%, transparent)",
};

function getGradeLabel(value: string) {
  return GRADE_LEVELS.find((g) => g.value === value)?.label || value;
}
function getSubjectLabel(value: string) {
  return SUBJECTS.find((s) => s.value === value)?.label || value;
}

function ActivityCategoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/>
      <polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/>
      <line x1="16" y1="17" x2="8" y2="17"/>
    </svg>
  );
}

interface FoldersPanelProps {
  folders: FolderRow[];
  folderActivities: FolderActivityRow[];
  allActivities: ActivityRow[];
}

export function FoldersPanel({ folders, folderActivities, allActivities }: FoldersPanelProps) {
  const [selectedFolderId, setSelectedFolderId] = useState<string | null>(
    folders.length > 0 ? folders[0].id : null
  );

  const selectedFolder = folders.find((f) => f.id === selectedFolderId) ?? null;
  const activityIdsInSelected = folderActivities
    .filter((fa) => fa.folder_id === selectedFolderId)
    .map((fa) => fa.activity_id);

  const activitiesInFolder = allActivities.filter((a) =>
    activityIdsInSelected.includes(a.id)
  );

  const memberFolderIdsForActivity = (activityId: string) =>
    folderActivities.filter((fa) => fa.activity_id === activityId).map((fa) => fa.folder_id);

  const accentColors = ["teal", "rose", "sage", "accent"] as const;

  if (folders.length === 0) {
    return (
      <div className="py-16 text-center space-y-3">
        <div
          className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ background: "color-mix(in srgb, var(--desk-teal) 10%, transparent)" }}
        >
          <Folder className="h-8 w-8" style={{ color: "var(--desk-teal)" }} />
        </div>
        <p className="text-base font-semibold" style={{ color: "var(--desk-ink)", fontFamily: "var(--font-fraunces)" }}>
          No folders yet
        </p>
        <p className="text-sm max-w-xs mx-auto" style={{ color: "var(--desk-muted)" }}>
          Create a folder to start organizing your activities by unit, topic, or class.
        </p>
      </div>
    );
  }

  return (
    <div className="flex gap-6 min-h-100">
      {/* Sidebar */}
      <aside className="w-56 shrink-0 space-y-1">
        {folders.map((folder) => {
          const count = folderActivities.filter((fa) => fa.folder_id === folder.id).length;
          const isSelected = folder.id === selectedFolderId;
          return (
            <div
              key={folder.id}
              role="button"
              tabIndex={0}
              onClick={() => setSelectedFolderId(folder.id)}
              onKeyDown={(e) => e.key === "Enter" && setSelectedFolderId(folder.id)}
              className="group w-full flex items-center gap-2.5 rounded-xl px-3 py-2.5 text-left transition-colors cursor-pointer focus:outline-none"
              style={{
                background: isSelected ? colorBg[folder.color] ?? colorBg.teal : "transparent",
                color: isSelected ? colorVar[folder.color] ?? "var(--desk-teal)" : "var(--desk-body)",
              }}
            >
              <span className="shrink-0">
                {isSelected ? (
                  <FolderOpen className="h-4 w-4" style={{ color: colorVar[folder.color] }} />
                ) : (
                  <Folder className="h-4 w-4" style={{ color: colorVar[folder.color] }} />
                )}
              </span>
              <span className="flex-1 truncate text-sm font-medium">{folder.name}</span>
              <span
                className="shrink-0 text-xs font-bold"
                style={{ color: isSelected ? colorVar[folder.color] : "var(--desk-muted)" }}
              >
                {count}
              </span>
              <FolderActions
                folderId={folder.id}
                folderName={folder.name}
                folderColor={folder.color}
              />
            </div>
          );
        })}
      </aside>

      {/* Activity list */}
      <div className="flex-1 min-w-0">
        {selectedFolder && activitiesInFolder.length === 0 ? (
          <div className="py-12 text-center space-y-2">
            <p className="text-sm font-semibold" style={{ color: "var(--desk-ink)" }}>
              This folder is empty
            </p>
            <p className="text-sm" style={{ color: "var(--desk-muted)" }}>
              On the <strong>My Activities</strong> or <strong>Saved</strong> tab, use the folder icon
              on any activity card to add it here.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {activitiesInFolder.map((activity, i) => {
              const accent = accentColors[i % accentColors.length];
              return (
                <div key={activity.id} className="relative group">
                  <Link href={`/marketplace/${activity.id}`}>
                    <div className="paper-card h-full flex flex-col gap-3 p-4 cursor-pointer">
                      {/* top strip */}
                      <div
                        className="h-1 -mx-4 -mt-4 rounded-t-xl mb-1"
                        style={{ background: `var(--desk-${accent})` }}
                      />
                      <div className="flex items-start gap-3">
                        <span
                          className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md mt-0.5"
                          style={{
                            background: `color-mix(in srgb, var(--desk-${accent}) 12%, transparent)`,
                            color: `var(--desk-${accent})`,
                          }}
                        >
                          <ActivityCategoryIcon className="w-4 h-4" />
                        </span>
                        <h3 className="font-semibold text-desk-ink leading-snug line-clamp-2 text-base pr-6">
                          {activity.title}
                        </h3>
                      </div>
                      <p className="text-sm text-desk-body line-clamp-2 flex-1">{activity.summary}</p>
                      <div className="flex flex-wrap gap-1.5 mt-auto">
                        <StampBadge color={accent} animateIn>
                          {activity.category.replace(/_/g, " ")}
                        </StampBadge>
                        <StampBadge color="ink">{getGradeLabel(activity.grade_level)}</StampBadge>
                        <StampBadge color="ink">{getSubjectLabel(activity.subject)}</StampBadge>
                      </div>
                      <p className="text-xs text-desk-muted">
                        {new Date(activity.created_at).toLocaleDateString(undefined, {
                          month: "short", day: "numeric", year: "numeric",
                        })}
                      </p>
                    </div>
                  </Link>
                  {/* Action buttons overlay */}
                  <div className="absolute top-3 right-3 flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <AddToFolderButton
                      activityId={activity.id}
                      folders={folders}
                      memberFolderIds={memberFolderIdsForActivity(activity.id)}
                    />
                    <DeleteActivityButton activityId={activity.id} activityTitle={activity.title} />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
