export const GRADE_LEVELS = [
  { value: "primary", label: "Primary School", description: "Ages 6-11" },
  { value: "middle_school", label: "Middle School", description: "Ages 12-14" },
  { value: "high_school", label: "High School", description: "Ages 15-18" },
] as const;

export const SUBJECTS = [
  { value: "mathematics", label: "Mathematics" },
  { value: "science", label: "Science" },
  { value: "english", label: "English Language" },
  { value: "history", label: "History" },
  { value: "geography", label: "Geography" },
  { value: "arabic", label: "Arabic Language" },
  { value: "islamic_studies", label: "Islamic Studies" },
  { value: "social_studies", label: "Social Studies" },
  { value: "art", label: "Art" },
  { value: "physical_education", label: "Physical Education" },
  { value: "computer_science", label: "Computer Science" },
  { value: "other", label: "Other" },
] as const;

export const ACTIVITY_TYPES = [
  { value: "educational", label: "Educational Activity", description: "Activities focused on learning and engagement" },
  { value: "assessment", label: "Assessment Activity", description: "Activities focused on evaluating student understanding" },
] as const;

export const CATEGORIES = [
  { value: "debate", label: "Debate" },
  { value: "documentary", label: "Documentary" },
  { value: "acting", label: "Acting" },
  { value: "conference", label: "Conference" },
  { value: "experiment", label: "Experiment" },
  { value: "project", label: "Project" },
  { value: "presentation", label: "Presentation" },
  { value: "research", label: "Research" },
  { value: "game", label: "Game" },
  { value: "simulation", label: "Simulation" },
  { value: "workshop", label: "Workshop" },
  { value: "field_trip", label: "Field Trip" },
  { value: "role_play", label: "Role Play" },
  { value: "group_discussion", label: "Group Discussion" },
  { value: "quiz", label: "Quiz" },
] as const;

export const RATING_OPTIONS = [
  { value: "4", label: "4+ Stars" },
  { value: "3", label: "3+ Stars" },
  { value: "2", label: "2+ Stars" },
] as const;

export type GradeLevel = (typeof GRADE_LEVELS)[number]["value"];
export type Subject = (typeof SUBJECTS)[number]["value"];
export type ActivityType = (typeof ACTIVITY_TYPES)[number]["value"];
export type Category = (typeof CATEGORIES)[number]["value"];
