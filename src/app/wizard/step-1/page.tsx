"use client";

import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { WizardProgress } from "@/components/wizard/wizard-progress";
import { GradeSelector } from "@/components/wizard/grade-selector";
import { SubjectSelector } from "@/components/wizard/subject-selector";
import { Button } from "@/components/ui/button";

export default function Step1Page() {
  const router = useRouter();
  const { gradeLevel, subject, setGradeLevel, setSubject } = useWizardStore();

  const canProceed = gradeLevel && subject;

  return (
    <div>
      <WizardProgress currentStep={1} />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Select Grade Level
          </h1>
          <p className="mt-1 text-gray-500">
            Choose the target age group for your activity
          </p>
          <div className="mt-4">
            <GradeSelector value={gradeLevel} onChange={setGradeLevel} />
          </div>
        </div>

        <div>
          <h2 className="text-2xl font-bold text-gray-900">Select Subject</h2>
          <p className="mt-1 text-gray-500">
            Choose the subject matter for your lesson
          </p>
          <div className="mt-4">
            <SubjectSelector value={subject} onChange={setSubject} />
          </div>
        </div>

        <div className="flex justify-end">
          <Button
            size="lg"
            disabled={!canProceed}
            onClick={() => router.push("/wizard/step-2")}
          >
            Continue
          </Button>
        </div>
      </div>
    </div>
  );
}
