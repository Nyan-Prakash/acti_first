import { redirect } from "next/navigation";
import { getMyProfile, isOnboardingComplete } from "@/lib/profile";
import { Step1Client } from "./step-1-client";
import { GRADE_LEVELS, type GradeLevel } from "@/lib/constants";

export default async function Step1Page() {
  const profile = await getMyProfile();

  // If the profile has both subject and grade_level set, seed the store
  // server-side isn't possible — but we can skip the page entirely and
  // pass the values through the URL so Step 2 can pick them up.
  // Simpler: just redirect to step-2; the store will be seeded client-side
  // by Step1Client's useEffect before we redirect, so instead we do it here
  // by redirecting only when both are valid.
  if (isOnboardingComplete(profile)) {
    const validGrades = GRADE_LEVELS.map((g) => g.value);
    const gradeIsValid = validGrades.includes((profile!.grade_level ?? "") as GradeLevel);

    if (gradeIsValid && profile!.subject) {
      // Pass values as search params so Step 2 / the store can be seeded
      const params = new URLSearchParams({
        grade: profile!.grade_level!,
        subject: profile!.subject!,
      });
      redirect(`/wizard/step-2?${params.toString()}`);
    }
  }

  return (
    <Step1Client
      profileSubject={profile?.subject ?? null}
      profileGradeLevel={profile?.grade_level ?? null}
    />
  );
}
