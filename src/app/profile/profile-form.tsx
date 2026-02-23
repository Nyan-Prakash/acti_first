"use client";

import { useState, useTransition } from "react";
import { Button } from "@/components/ui/button";
import { GradeSelector } from "@/components/wizard/grade-selector";
import { SubjectSelector } from "@/components/wizard/subject-selector";
import { updateProfileAction } from "./actions";
import type { GradeLevel } from "@/lib/constants";
import { GRADE_LEVELS } from "@/lib/constants";

interface ProfileFormProps {
  initialSubject: string;
  initialGradeLevel: string;
}

export function ProfileForm({ initialSubject, initialGradeLevel }: ProfileFormProps) {
  // Validate that initialGradeLevel is a known GradeLevel value, else null
  const validGrades = GRADE_LEVELS.map((g) => g.value);
  const parsedGrade = validGrades.includes(initialGradeLevel as GradeLevel)
    ? (initialGradeLevel as GradeLevel)
    : null;

  const [gradeLevel, setGradeLevel] = useState<GradeLevel | null>(parsedGrade);
  const [subject, setSubject] = useState<string | null>(initialSubject || null);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  const canSubmit = gradeLevel && subject && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gradeLevel || !subject) return;

    setError(null);
    setSaved(false);

    const formData = new FormData();
    formData.set("subject", subject);
    formData.set("grade_level", gradeLevel);

    startTransition(async () => {
      const result = await updateProfileAction(formData);
      if (result?.error) {
        setError(result.error);
      } else if (result?.success) {
        setSaved(true);
      }
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Success banner */}
      {saved && (
        <div
          className="rounded-lg border px-4 py-3 text-sm flex items-center gap-2"
          style={{
            background: "color-mix(in srgb, var(--desk-teal) 8%, var(--desk-paper))",
            borderColor: "var(--desk-teal)",
            color: "var(--desk-teal)",
          }}
        >
          <span>✓</span>
          <span className="font-semibold">Profile saved successfully.</span>
        </div>
      )}

      {/* Error banner */}
      {error && (
        <div
          className="rounded-lg border px-4 py-3 text-sm"
          style={{
            background: "#fef2f2",
            borderColor: "#fca5a5",
            color: "#b91c1c",
          }}
        >
          <strong>Error: </strong>{error}
        </div>
      )}

      {/* Grade Level */}
      <div className="space-y-3">
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--desk-ink)" }}
        >
          Grade level
        </h2>
        <GradeSelector value={gradeLevel} onChange={(g) => { setGradeLevel(g); setSaved(false); }} />
      </div>

      {/* Subject */}
      <div className="space-y-3">
        <h2
          className="text-base font-semibold"
          style={{ color: "var(--desk-ink)" }}
        >
          Subject
        </h2>
        <SubjectSelector value={subject} onChange={(s) => { setSubject(s); setSaved(false); }} />
      </div>

      {/* Submit */}
      <div className="flex justify-end pt-2">
        <Button
          type="submit"
          size="lg"
          disabled={!canSubmit}
          className="bg-desk-teal text-white hover:opacity-90 px-8 gap-2"
        >
          {isPending ? (
            <span className="flex items-center gap-2">
              <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
              Saving…
            </span>
          ) : (
            "Save profile"
          )}
        </Button>
      </div>
    </form>
  );
}
