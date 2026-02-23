import { redirect } from "next/navigation";
import { getMyProfile } from "@/lib/profile";
import { Button } from "@/components/ui/button";
import { PaperPage } from "@/components/ui-desk";
import { ProfileForm } from "./profile-form";
import { signOutAction } from "./actions";

export default async function ProfilePage() {
  const profile = await getMyProfile();

  if (!profile) {
    redirect("/login");
  }

  return (
    <div className="container mx-auto max-w-2xl px-4 py-10">
      <PaperPage>
        {/* Header */}
        <div className="mb-8">
          <p
            className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: "var(--desk-teal)" }}
          >
            Account
          </p>
          <h1
            className="text-2xl font-bold"
            style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
          >
            Your Profile
          </h1>
          <p className="mt-1 text-sm" style={{ color: "var(--desk-muted)" }}>
            Update the details that shape your generated activities.
          </p>
        </div>

        {/* Read-only info */}
        <div
          className="rounded-lg border px-4 py-4 mb-8 space-y-1"
          style={{ borderColor: "var(--desk-border)", background: "var(--desk-bg)" }}
        >
          {profile.name && (
            <div className="flex items-center gap-2 text-sm">
              <span className="font-semibold w-16" style={{ color: "var(--desk-ink)" }}>Name</span>
              <span style={{ color: "var(--desk-body)" }}>{profile.name}</span>
            </div>
          )}
          <div className="flex items-center gap-2 text-sm">
            <span className="font-semibold w-16" style={{ color: "var(--desk-ink)" }}>Email</span>
            <span style={{ color: "var(--desk-body)" }}>{profile.email}</span>
          </div>
        </div>

        {/* Editable form */}
        <ProfileForm
          initialSubject={profile.subject ?? ""}
          initialGradeLevel={profile.grade_level ?? ""}
        />

        {/* Sign out */}
        <div
          className="mt-8 pt-6 border-t"
          style={{ borderColor: "var(--desk-border)" }}
        >
          <h2 className="text-base font-semibold mb-1" style={{ color: "var(--desk-ink)" }}>
            Sign out
          </h2>
          <p className="text-sm mb-4" style={{ color: "var(--desk-muted)" }}>
            End your current session on this device.
          </p>
          <form action={signOutAction}>
            <Button
              type="submit"
              variant="outline"
              className="border-[var(--desk-rose)] text-[var(--desk-rose)] hover:bg-[color-mix(in_srgb,var(--desk-rose)_10%,white)]"
            >
              Sign out
            </Button>
          </form>
        </div>
      </PaperPage>
    </div>
  );
}
