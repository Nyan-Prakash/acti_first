"use client";

import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { WizardProgress } from "@/components/wizard/wizard-progress";
import { ACTIVITY_TYPES, type ActivityType } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export default function Step2Page() {
  const router = useRouter();
  const {
    gradeLevel,
    subject,
    activityType,
    lessonInfo,
    learningObjectives,
    setActivityType,
    setLessonInfo,
    setLearningObjectives,
  } = useWizardStore();

  // Redirect to step 1 if prerequisites are missing
  if (!gradeLevel || !subject) {
    router.push("/wizard/step-1");
    return null;
  }

  const canProceed =
    activityType &&
    lessonInfo.trim().length >= 10 &&
    learningObjectives.trim().length >= 10;

  return (
    <div>
      <WizardProgress currentStep={2} />

      <div className="space-y-8">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Activity Type</h1>
          <p className="mt-1 text-gray-500">
            Select the type of activity you want to generate
          </p>
          <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
            {ACTIVITY_TYPES.map((type) => (
              <button
                key={type.value}
                onClick={() => setActivityType(type.value as ActivityType)}
                className={cn(
                  "flex flex-col items-start gap-2 rounded-xl border-2 bg-white p-6 text-left transition-all hover:shadow-md",
                  activityType === type.value
                    ? "border-blue-600 bg-blue-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300"
                )}
              >
                <span className="text-lg font-semibold text-gray-900">
                  {type.label}
                </span>
                <span className="text-sm text-gray-500">
                  {type.description}
                </span>
              </button>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="lessonInfo" className="text-lg font-semibold text-gray-900">
            Lesson Information
          </Label>
          <p className="mt-1 text-sm text-gray-500">
            Provide the key content, topics, and details of your lesson
          </p>
          <Textarea
            id="lessonInfo"
            value={lessonInfo}
            onChange={(e) => setLessonInfo(e.target.value)}
            placeholder="Enter your lesson information here... (e.g., The lesson covers the emergence and disappearance of civilizations, comparing the perspectives of Ibn Khaldun and Arnold Toynbee...)"
            className="mt-2 min-h-[150px] bg-white"
          />
          <p className="mt-1 text-xs text-gray-400">
            {lessonInfo.length} characters (minimum 10)
          </p>
        </div>

        <div>
          <Label htmlFor="objectives" className="text-lg font-semibold text-gray-900">
            Learning Objectives
          </Label>
          <p className="mt-1 text-sm text-gray-500">
            What should students be able to do after completing the activity?
          </p>
          <Textarea
            id="objectives"
            value={learningObjectives}
            onChange={(e) => setLearningObjectives(e.target.value)}
            placeholder="Enter your learning objectives here... (e.g., Students will be able to compare and contrast different historical perspectives, develop critical thinking skills through debate...)"
            className="mt-2 min-h-[120px] bg-white"
          />
          <p className="mt-1 text-xs text-gray-400">
            {learningObjectives.length} characters (minimum 10)
          </p>
        </div>

        <div className="flex justify-between">
          <Button
            variant="outline"
            size="lg"
            onClick={() => router.push("/wizard/step-1")}
          >
            Back
          </Button>
          <Button
            size="lg"
            disabled={!canProceed}
            onClick={() => router.push("/wizard/step-3")}
          >
            Generate Activities
          </Button>
        </div>
      </div>
    </div>
  );
}
