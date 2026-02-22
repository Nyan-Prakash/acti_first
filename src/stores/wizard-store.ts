"use client";

import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import type { GradeLevel, ActivityType } from "@/lib/constants";
import type { Activity } from "@/types";

interface WizardState {
  // Step 1
  gradeLevel: GradeLevel | null;
  subject: string | null;
  // Step 2
  activityType: ActivityType | null;
  lessonInfo: string;
  learningObjectives: string;
  // Step 3 results
  generatedActivities: Activity[];
  isGenerating: boolean;
  // Actions
  setGradeLevel: (g: GradeLevel) => void;
  setSubject: (s: string) => void;
  setActivityType: (t: ActivityType) => void;
  setLessonInfo: (info: string) => void;
  setLearningObjectives: (obj: string) => void;
  setGeneratedActivities: (activities: Activity[]) => void;
  setIsGenerating: (generating: boolean) => void;
  reset: () => void;
}

const initialState = {
  gradeLevel: null as GradeLevel | null,
  subject: null as string | null,
  activityType: null as ActivityType | null,
  lessonInfo: "",
  learningObjectives: "",
  generatedActivities: [] as Activity[],
  isGenerating: false,
};

export const useWizardStore = create<WizardState>()(
  persist(
    (set) => ({
      ...initialState,
      setGradeLevel: (gradeLevel) => set({ gradeLevel }),
      setSubject: (subject) => set({ subject }),
      setActivityType: (activityType) => set({ activityType }),
      setLessonInfo: (lessonInfo) => set({ lessonInfo }),
      setLearningObjectives: (learningObjectives) => set({ learningObjectives }),
      setGeneratedActivities: (generatedActivities) => set({ generatedActivities }),
      setIsGenerating: (isGenerating) => set({ isGenerating }),
      reset: () => set(initialState),
    }),
    {
      name: "acti-genie-wizard",
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({
        gradeLevel: state.gradeLevel,
        subject: state.subject,
        activityType: state.activityType,
        lessonInfo: state.lessonInfo,
        learningObjectives: state.learningObjectives,
      }),
    }
  )
);
