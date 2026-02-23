import { createClient } from "@/lib/supabase/server";

export type Profile = {
  id: string;
  email: string;
  name: string | null;
  subject: string | null;
  grade_level: string | null;
  updated_at: string | null;
  created_at: string;
};

/**
 * Fetch the currently authenticated user's profile from Supabase.
 * Returns null if not authenticated or if the profile doesn't exist.
 */
export async function getMyProfile(): Promise<Profile | null> {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, subject, grade_level, updated_at, created_at")
    .eq("id", user.id)
    .single();

  if (error || !data) return null;

  return data as Profile;
}

/**
 * Returns true if the user has completed onboarding
 * (i.e., both subject and grade_level are set).
 */
export function isOnboardingComplete(profile: Profile | null): boolean {
  if (!profile) return false;
  return (
    typeof profile.subject === "string" &&
    profile.subject.trim().length > 0 &&
    typeof profile.grade_level === "string" &&
    profile.grade_level.trim().length > 0
  );
}
