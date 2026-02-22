export const GRADE_LEVELS = [
  { value: "primary", label: "Primary School", description: "Ages 6-11", icon: "🎨" },
  { value: "middle_school", label: "Middle School", description: "Ages 12-14", icon: "📚" },
  { value: "high_school", label: "High School", description: "Ages 15-18", icon: "🎓" },
] as const;

export const SUBJECTS = [
  { value: "mathematics", label: "Mathematics", icon: "➗" },
  { value: "science", label: "Science", icon: "🔬" },
  { value: "english", label: "English Language", icon: "📖" },
  { value: "history", label: "History", icon: "🏛️" },
  { value: "geography", label: "Geography", icon: "🌍" },
  { value: "arabic", label: "Arabic Language", icon: "📝" },
  { value: "islamic_studies", label: "Islamic Studies", icon: "🕌" },
  { value: "social_studies", label: "Social Studies", icon: "👥" },
  { value: "art", label: "Art", icon: "🎨" },
  { value: "physical_education", label: "Physical Education", icon: "⚽" },
  { value: "computer_science", label: "Computer Science", icon: "💻" },
  { value: "other", label: "Other", icon: "📋" },
] as const;

export const ACTIVITY_TYPES = [
  { value: "educational", label: "Educational Activity", description: "Activities focused on learning and engagement" },
  { value: "assessment", label: "Assessment Activity", description: "Activities focused on evaluating student understanding" },
] as const;

export type GradeLevel = (typeof GRADE_LEVELS)[number]["value"];
export type Subject = (typeof SUBJECTS)[number]["value"];
export type ActivityType = (typeof ACTIVITY_TYPES)[number]["value"];
