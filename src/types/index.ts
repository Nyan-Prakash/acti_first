import type { GradeLevel, Subject, ActivityType } from "@/lib/constants";

export interface ActivityPhase {
  name: string;
  duration: string;
  instructions: string;
}

export interface EvaluationCriteria {
  name: string;
  weight: number;
  description: string;
}

export interface Resource {
  title: string;
  url?: string;
  type: string;
}

export interface ActivityContent {
  overview: string;
  researchAndPreparation: {
    description: string;
    steps: string[];
  };
  format: {
    description: string;
    materials: string[];
  };
  structure: {
    duration: string;
    phases: ActivityPhase[];
  };
  evaluation: {
    criteria: EvaluationCriteria[];
    rubric?: string;
  };
  reflection: {
    questions: string[];
  };
  resources: Resource[];
  adaptations: {
    higherLevel: string;
    lowerLevel: string;
  };
}

export interface Activity {
  id: string;
  title: string;
  category: string;
  summary: string;
  content: ActivityContent;
  isSaved: boolean;
  createdAt: string;
}

export interface GenerationRequest {
  gradeLevel: GradeLevel;
  subject: string;
  activityType: ActivityType;
  lessonInfo: string;
  learningObjectives: string;
}

export interface Rating {
  activityId: string;
  suitability: number;
  goalAchievement: number;
  recommendation: number;
  comment?: string;
}
