"use server";

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { createClient } from "@/lib/supabase/server";
import { profileSchema } from "@/lib/validators";

export async function completeOnboardingAction(formData: FormData) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const raw = {
    subject: formData.get("subject") as string,
    grade_level: formData.get("grade_level") as string,
  };

  const parsed = profileSchema.safeParse(raw);

  if (!parsed.success) {
    const firstError = parsed.error.issues[0]?.message ?? "Invalid input";
    // We return an error message so the client can display it.
    // Using a thrown error pattern compatible with useFormState is avoided here;
    // instead we return a serialisable object.
    return { error: firstError };
  }

  const { error } = await supabase
    .from("profiles")
    .update({
      subject: parsed.data.subject,
      grade_level: parsed.data.grade_level,
    })
    .eq("id", user.id);

  if (error) {
    return { error: "Failed to save profile. Please try again." };
  }

  revalidatePath("/onboarding");
  revalidatePath("/wizard/step-1");

  redirect("/wizard/step-1");
}
