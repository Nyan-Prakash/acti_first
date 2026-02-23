"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { PaperPage } from "@/components/ui-desk";
import { GradeSelector } from "@/components/wizard/grade-selector";
import { SubjectSelector } from "@/components/wizard/subject-selector";
import { completeOnboardingAction } from "./actions";
import type { GradeLevel } from "@/lib/constants";

export default function OnboardingPage() {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [gradeLevel, setGradeLevel] = useState<GradeLevel | null>(null);
  const [subject, setSubject] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const canSubmit = gradeLevel && subject && !isPending;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!gradeLevel || !subject) return;

    setError(null);
    const formData = new FormData();
    formData.set("subject", subject);
    formData.set("grade_level", gradeLevel);

    startTransition(async () => {
      const result = await completeOnboardingAction(formData);
      // If completeOnboardingAction redirects, this code won't be reached.
      // It only returns a value when there's an error.
      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/wizard/step-1");
        router.refresh();
      }
    });
  };

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-[80vh]">
      <PaperPage className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-10">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl text-white select-none"
            style={{ background: "var(--desk-teal)" }}
          >
            <svg viewBox="0 0 28 28" fill="none" className="w-7 h-7" aria-hidden="true">
              <rect x="3" y="3" width="9" height="9" rx="2" fill="white" opacity="0.9"/>
              <rect x="16" y="3" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="3" y="16" width="9" height="9" rx="2" fill="white" opacity="0.6"/>
              <rect x="16" y="16" width="9" height="9" rx="2" fill="white" opacity="0.9"/>
            </svg>
          </div>
          <p
            className="text-xs font-bold uppercase tracking-widest mb-2"
            style={{ color: "var(--desk-teal)" }}
          >
            One-time setup
          </p>
          <h1
            className="text-3xl font-bold"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
          >
            Tell us about your classroom
          </h1>
          <p className="mt-2 text-sm max-w-md mx-auto" style={{ color: "var(--desk-muted)" }}>
            We&apos;ll use this to personalise your generated activities. You can change these later in your profile.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
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
              What grade level do you teach?
            </h2>
            <GradeSelector value={gradeLevel} onChange={setGradeLevel} />
          </div>

          {/* Subject */}
          <div className="space-y-3">
            <h2
              className="text-base font-semibold"
              style={{ color: "var(--desk-ink)" }}
            >
              What subject do you teach?
            </h2>
            <SubjectSelector value={subject} onChange={setSubject} />
          </div>

          {/* Submit */}
          <div className="flex justify-end pt-2">
            <Button
              type="submit"
              size="lg"
              disabled={!canSubmit}
              className="bg-desk-teal text-white hover:opacity-90 px-10 gap-2 min-w-45"
            >
              {isPending ? (
                <span className="flex items-center gap-2">
                  <span className="h-4 w-4 border-2 border-white/40 border-t-white rounded-full animate-spin" />
                  Saving…
                </span>
              ) : (
                "Get started"
              )}
            </Button>
          </div>
        </form>
      </PaperPage>
    </div>
  );
}
