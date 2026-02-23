"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { WizardProgress } from "@/components/wizard/wizard-progress";
import { GradeSelector } from "@/components/wizard/grade-selector";
import { SubjectSelector } from "@/components/wizard/subject-selector";
import { Button } from "@/components/ui/button";
import { StickyCard } from "@/components/ui-desk";
import { GRADE_LEVELS, type GradeLevel } from "@/lib/constants";

interface Step1ClientProps {
  profileSubject: string | null;
  profileGradeLevel: string | null;
}

export function Step1Client({ profileSubject, profileGradeLevel }: Step1ClientProps) {
  const router = useRouter();
  const { gradeLevel, subject, setGradeLevel, setSubject } = useWizardStore();

  // Seed store from profile on first mount — only if the store slot is empty
  useEffect(() => {
    if (!gradeLevel && profileGradeLevel) {
      const validGrades = GRADE_LEVELS.map((g) => g.value);
      if (validGrades.includes(profileGradeLevel as GradeLevel)) {
        setGradeLevel(profileGradeLevel as GradeLevel);
      }
    }
    if (!subject && profileSubject) {
      setSubject(profileSubject);
    }
    // Only run once on mount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const canProceed = gradeLevel && subject;

  return (
    <div>
      <WizardProgress currentStep={1} />

      <div className="flex gap-6 items-start">
        {/* Main content */}
        <div className="flex-1 space-y-8 min-w-0">
          <div>
            <p className="text-xs font-bold uppercase tracking-widest mb-1" style={{ color: "var(--desk-teal)" }}>
              Step 1
            </p>
            <h1
              className="text-2xl font-bold"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
            >
              Grade level &amp; subject
            </h1>
            <p className="mt-1 text-sm" style={{ color: "var(--desk-muted)" }}>
              This context shapes the language, complexity, and format of your activities.
              {(profileSubject || profileGradeLevel) && (
                <span className="ml-1" style={{ color: "var(--desk-teal)" }}>
                  Pre-filled from your profile — change anytime.
                </span>
              )}
            </p>
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold" style={{ color: "var(--desk-ink)" }}>
              Grade level
            </h2>
            <GradeSelector value={gradeLevel} onChange={setGradeLevel} />
          </div>

          <div className="space-y-2">
            <h2 className="text-base font-semibold" style={{ color: "var(--desk-ink)" }}>
              Subject
            </h2>
            <SubjectSelector value={subject} onChange={setSubject} />
          </div>

          <div className="flex justify-end pt-2">
            <Button
              size="lg"
              disabled={!canProceed}
              onClick={() => router.push("/wizard/step-2")}
              className="bg-desk-teal text-white hover:opacity-90 px-8 gap-2"
            >
              Continue
            </Button>
          </div>
        </div>

        {/* Tip sticky note — hidden on mobile */}
        <aside className="hidden lg:block w-56 shrink-0 mt-16">
          <StickyCard color="yellow">
            <p
              className="text-xs font-bold uppercase tracking-widest mb-2"
              style={{ color: "var(--desk-teal)" }}
            >
              Tip
            </p>
            <p className="text-xs leading-relaxed" style={{ color: "var(--desk-body)" }}>
              Picking the right grade level helps Planboard calibrate vocabulary,
              activity complexity, and time estimates — be as specific as you can.
            </p>
          </StickyCard>
        </aside>
      </div>
    </div>
  );
}
