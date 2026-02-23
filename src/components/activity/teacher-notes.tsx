"use client";

import { useState } from "react";
import { StickyCard } from "@/components/ui-desk";
import { Textarea } from "@/components/ui/textarea";

interface TeacherNotesProps {
  activityId: string;
}

export function TeacherNotes({ activityId }: TeacherNotesProps) {
  const storageKey = `teacher-notes-${activityId}`;

  const [notes, setNotes] = useState<string>(() => {
    if (typeof window === "undefined") return "";
    return localStorage.getItem(storageKey) ?? "";
  });

  const handleChange = (value: string) => {
    setNotes(value);
    localStorage.setItem(storageKey, value);
  };

  return (
    <StickyCard color="yellow">
      <p
        className="text-xs font-bold uppercase tracking-widest mb-3"
        style={{ color: "var(--desk-teal)" }}
      >
        Teacher notes
      </p>
      <Textarea
        value={notes}
        onChange={(e) => handleChange(e.target.value)}
        placeholder="Jot down your thoughts, adaptations, or reminders…"
        className="text-xs min-h-36 resize-none border-(--desk-accent)/30 bg-transparent focus:border-desk-teal p-0"
        style={{ color: "var(--desk-body)", background: "transparent" }}
      />
      <p className="mt-2 text-xs" style={{ color: "var(--desk-muted)" }}>
        Saved locally in your browser.
      </p>
    </StickyCard>
  );
}
