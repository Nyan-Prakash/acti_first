"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FolderPlus } from "lucide-react";

const COLORS = [
  { value: "teal", label: "Teal", hex: "var(--desk-teal)" },
  { value: "rose", label: "Rose", hex: "var(--desk-rose)" },
  { value: "sage", label: "Sage", hex: "var(--desk-sage)" },
  { value: "accent", label: "Yellow", hex: "var(--desk-accent)" },
];

export function CreateFolderButton() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [color, setColor] = useState("teal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) { setError("Folder name is required"); return; }
    setLoading(true);
    setError("");
    try {
      const res = await fetch("/api/folders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: name.trim(), color }),
      });
      if (res.ok) {
        setOpen(false);
        setName("");
        setColor("teal");
        router.refresh();
      } else {
        const data = await res.json();
        setError(data.error || "Failed to create folder");
      }
    } catch {
      setError("Something went wrong");
    }
    setLoading(false);
  };

  return (
    <>
      <Button
        variant="outline"
        size="sm"
        className="gap-1.5 border-desk-border text-desk-body hover:border-desk-teal hover:text-desk-teal"
        onClick={() => { setOpen(true); setTimeout(() => inputRef.current?.focus(), 50); }}
      >
        <FolderPlus className="h-4 w-4" />
        New Folder
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-sm" style={{ background: "var(--desk-paper)", borderColor: "var(--desk-border)" }}>
          <DialogHeader>
            <DialogTitle style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}>
              Create Folder
            </DialogTitle>
          </DialogHeader>
          <form onSubmit={handleSubmit} className="space-y-4 pt-2">
            <div className="space-y-1.5">
              <Label htmlFor="folder-name" style={{ color: "var(--desk-ink)" }}>Name</Label>
              <Input
                id="folder-name"
                ref={inputRef}
                value={name}
                onChange={(e) => { setName(e.target.value); setError(""); }}
                placeholder="e.g. Unit 3 – Ecology"
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
              <Button type="button" variant="ghost" onClick={() => setOpen(false)} style={{ color: "var(--desk-muted)" }}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="bg-desk-teal text-white hover:opacity-90"
              >
                {loading ? "Creating…" : "Create"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
