"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { MoreHorizontal, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const COLORS = [
  { value: "teal", label: "Teal", hex: "var(--desk-teal)" },
  { value: "rose", label: "Rose", hex: "var(--desk-rose)" },
  { value: "sage", label: "Sage", hex: "var(--desk-sage)" },
  { value: "accent", label: "Yellow", hex: "var(--desk-accent)" },
];

interface FolderActionsProps {
  folderId: string;
  folderName: string;
  folderColor: string;
}

export function FolderActions({ folderId, folderName, folderColor }: FolderActionsProps) {
  const [renameOpen, setRenameOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [name, setName] = useState(folderName);
  const [color, setColor] = useState(folderColor);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  const handleRename = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Name is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch(`/api/folders/${folderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), color }),
      });
      if (res.ok) {
        setRenameOpen(false);
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to rename");
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  const handleDelete = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/folders/${folderId}`, { method: "DELETE" });
      if (res.ok) {
        setDeleteOpen(false);
        router.refresh();
      }
    } catch {
      console.error("Failed to delete folder");
    }
    setLoading(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div
            role="button"
            tabIndex={0}
            onClick={(e) => e.stopPropagation()}
            onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") e.stopPropagation(); }}
            className="flex h-6 w-6 items-center justify-center rounded opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/5 focus:outline-none cursor-pointer"
            aria-label="Folder options"
          >
            <MoreHorizontal className="h-4 w-4" style={{ color: "var(--desk-muted)" }} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" style={{ background: "var(--desk-paper)", borderColor: "var(--desk-border)" }}>
          <DropdownMenuItem
            onClick={(e) => { e.stopPropagation(); setRenameOpen(true); }}
            className="gap-2 cursor-pointer"
            style={{ color: "var(--desk-ink)" }}
          >
            <Pencil className="h-3.5 w-3.5" /> Rename
          </DropdownMenuItem>
          <DropdownMenuSeparator style={{ background: "var(--desk-border)" }} />
          <DropdownMenuItem
            onClick={(e) => { e.stopPropagation(); setDeleteOpen(true); }}
            className="gap-2 cursor-pointer text-red-500 focus:text-red-500"
          >
            <Trash2 className="h-3.5 w-3.5" /> Delete folder
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Rename dialog */}
      <Dialog open={renameOpen} onOpenChange={setRenameOpen}>
        <DialogContent className="sm:max-w-sm" style={{ background: "var(--desk-paper)", borderColor: "var(--desk-border)" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}>
              Rename Folder
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleRename} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label style={{ color: "var(--desk-ink)" }}>Name</Label>
              <Input
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                style={{ background: "var(--desk-bg)", borderColor: "var(--desk-border)", color: "var(--desk-ink)" }}
              />
              {error && <p className="text-xs text-red-500">{error}</p>}
            </div>
            <div className="space-y-1.5">
              <Label style={{ color: "var(--desk-ink)" }}>Color</Label>
              <div className="flex gap-2">
                {COLORS.map((c) => (
                  <button
                    key={c.value}
                    type="button"
                    title={c.label}
                    onClick={() => setColor(c.value)}
                    className="w-7 h-7 rounded-full border-2 transition-transform hover:scale-110 focus:outline-none"
                    style={{
                      background: c.hex,
                      borderColor: color === c.value ? "var(--desk-ink)" : "transparent",
                    }}
                  />
                ))}
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="ghost" onClick={() => setRenameOpen(false)} style={{ color: "var(--desk-muted)" }}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="bg-desk-teal text-white hover:opacity-90">
                {loading ? "Saving…" : "Save"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete confirm dialog */}
      <Dialog open={deleteOpen} onOpenChange={setDeleteOpen}>
        <DialogContent className="sm:max-w-sm" style={{ background: "var(--desk-paper)", borderColor: "var(--desk-border)" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}>
              Delete &ldquo;{folderName}&rdquo;?
            </DialogTitle>
          </DialogHeader>
          <p className="text-sm py-2" style={{ color: "var(--desk-body)" }}>
            The folder will be deleted. Your activities won&apos;t be removed.
          </p>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)} style={{ color: "var(--desk-muted)" }}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={loading}
            >
              {loading ? "Deleting…" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
