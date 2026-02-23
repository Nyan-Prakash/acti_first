"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FolderInput, FolderMinus } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

type Folder = { id: string; name: string; color: string };

interface AddToFolderButtonProps {
  activityId: string;
  folders: Folder[];
  /** IDs of folders that already contain this activity */
  memberFolderIds: string[];
}

const colorVar: Record<string, string> = {
  teal: "var(--desk-teal)",
  rose: "var(--desk-rose)",
  sage: "var(--desk-sage)",
  accent: "var(--desk-accent)",
};

export function AddToFolderButton({ activityId, folders, memberFolderIds }: AddToFolderButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const toggle = async (folderId: string, isIn: boolean) => {
    setLoading(true);
    try {
      await fetch(`/api/folders/${folderId}/activities`, {
        method: isIn ? "DELETE" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ activityId }),
      });
      router.refresh();
    } catch {
      console.error("Failed to update folder");
    }
    setLoading(false);
  };

  if (folders.length === 0) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <button
          onClick={(e) => e.preventDefault()}
          disabled={loading}
          className="flex h-7 w-7 items-center justify-center rounded-md transition-colors hover:bg-black/5 focus:outline-none"
          title="Add to folder"
          aria-label="Add to folder"
        >
          <FolderInput className="h-4 w-4" style={{ color: "var(--desk-muted)" }} />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        align="end"
        style={{ background: "var(--desk-paper)", borderColor: "var(--desk-border)" }}
        onClick={(e) => e.stopPropagation()}
      >
        <p className="px-2 py-1 text-xs font-semibold uppercase tracking-widest" style={{ color: "var(--desk-muted)" }}>
          Add to folder
        </p>
        <DropdownMenuSeparator style={{ background: "var(--desk-border)" }} />
        {folders.map((folder) => {
          const isIn = memberFolderIds.includes(folder.id);
          return (
            <DropdownMenuItem
              key={folder.id}
              onClick={() => toggle(folder.id, isIn)}
              className="gap-2 cursor-pointer"
              style={{ color: "var(--desk-ink)" }}
            >
              <span
                className="flex h-4 w-4 shrink-0 items-center justify-center rounded"
                style={{ background: colorVar[folder.color] ?? "var(--desk-teal)" }}
              >
                {isIn ? (
                  <FolderMinus className="h-2.5 w-2.5 text-white" />
                ) : (
                  <FolderInput className="h-2.5 w-2.5 text-white" />
                )}
              </span>
              <span className="flex-1 truncate">{folder.name}</span>
              {isIn && (
                <span className="text-xs" style={{ color: "var(--desk-muted)" }}>✓</span>
              )}
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
