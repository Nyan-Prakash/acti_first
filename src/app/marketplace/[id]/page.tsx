import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ActivityDetail } from "@/components/activity/activity-detail";
import { SaveButton } from "@/components/activity/save-button";
import { RatingForm } from "@/components/activity/rating-form";
import { TeacherNotes } from "@/components/activity/teacher-notes";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { StampBadge } from "@/components/ui-desk";
import { GRADE_LEVELS, SUBJECTS } from "@/lib/constants";
import type { ActivityContent } from "@/types";

function getGradeLabel(value: string) {
  return GRADE_LEVELS.find((g) => g.value === value)?.label || value;
}

function getSubjectLabel(value: string) {
  return SUBJECTS.find((s) => s.value === value)?.label || value;
}

export default async function MarketplaceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  // Fetch activity
  const { data: activity, error } = await supabase
    .from("activities")
    .select("*, profiles(name)")
    .eq("id", id)
    .single();

  if (error || !activity) {
    notFound();
  }

  // Fetch ratings
  const { data: ratings } = await supabase
    .from("ratings")
    .select("*, profiles(name)")
    .eq("activity_id", id)
    .order("created_at", { ascending: false });

  // Get current user
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Check save status and existing rating
  let isSaved = false;
  let userRating: {
    suitability: number;
    goalAchievement: number;
    recommendation: number;
    overallRating?: number | null;
    reviewText?: string | null;
    comment?: string | null;
  } | null = null;

  if (user) {
    const { data: save } = await supabase
      .from("saves")
      .select("id")
      .eq("user_id", user.id)
      .eq("activity_id", id)
      .single();
    isSaved = !!save;

    const existingRating = ratings?.find(
      (r: { user_id: string }) => r.user_id === user.id
    );
    if (existingRating) {
      userRating = {
        suitability: existingRating.suitability,
        goalAchievement: existingRating.goal_achievement,
        recommendation: existingRating.recommendation,
        overallRating: existingRating.overall_rating,
        reviewText: existingRating.review_text,
        comment: existingRating.comment,
      };
    }
  }

  // Compute aggregates
  const ratingCount = ratings?.length ?? 0;
  const ratingsWithOverall = ratings?.filter(
    (r: { overall_rating: number | null }) => r.overall_rating
  ) ?? [];
  const avgOverall =
    ratingsWithOverall.length > 0
      ? ratingsWithOverall.reduce(
          (sum: number, r: { overall_rating: number | null }) =>
            sum + (r.overall_rating || 0),
          0
        ) / ratingsWithOverall.length
      : null;

  const avgSuitability =
    ratingCount > 0
      ? ratings!.reduce(
          (sum: number, r: { suitability: number }) => sum + r.suitability,
          0
        ) / ratingCount
      : null;
  const avgGoalAchievement =
    ratingCount > 0
      ? ratings!.reduce(
          (sum: number, r: { goal_achievement: number }) =>
            sum + r.goal_achievement,
          0
        ) / ratingCount
      : null;
  const avgRecommendation =
    ratingCount > 0
      ? ratings!.reduce(
          (sum: number, r: { recommendation: number }) =>
            sum + r.recommendation,
          0
        ) / ratingCount
      : null;

  const content = activity.content as ActivityContent;
  const authorName =
    (activity.profiles as { name: string | null } | null)?.name || "Anonymous";

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      {/* Back nav */}
      <div className="flex items-center justify-between mb-6 flex-wrap gap-2">
        <Link href="/marketplace">
          <Button
            variant="ghost"
            size="sm"
            className="text-desk-muted hover:text-desk-ink -ml-2"
          >
            ← Marketplace
          </Button>
        </Link>
        {user && (
          <SaveButton activityId={activity.id} initialSaved={isSaved} />
        )}
      </div>

      <div className="flex gap-6 items-start">
        {/* ── Main column ── */}
        <div className="flex-1 min-w-0 space-y-6">
          {/* Header */}
          <div className="space-y-3">
            <h1
              className="text-2xl font-bold leading-snug"
              style={{ fontFamily: "var(--font-fraunces)", color: "var(--desk-ink)" }}
            >
              {activity.title}
            </h1>
            <div className="flex flex-wrap items-center gap-2">
              <Badge
                variant="secondary"
                className="capitalize text-xs"
                style={{
                  background: "color-mix(in srgb, var(--desk-teal) 12%, transparent)",
                  color: "var(--desk-teal)",
                  border: "1px solid color-mix(in srgb, var(--desk-teal) 30%, transparent)",
                }}
              >
                {activity.category.replace(/_/g, " ")}
              </Badge>
              <StampBadge color="ink">{getGradeLabel(activity.grade_level)}</StampBadge>
              <StampBadge color="ink">{getSubjectLabel(activity.subject)}</StampBadge>
              <StampBadge color="teal">{content.structure?.duration || "—"}</StampBadge>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: "var(--desk-muted)" }}>
              {activity.summary}
            </p>
            <p className="text-xs" style={{ color: "var(--desk-muted)" }}>
              By {authorName}
            </p>
          </div>

          {/* Rating Summary */}
          {ratingCount > 0 && (
            <div
              className="rounded-xl p-4 grid grid-cols-2 gap-4 sm:grid-cols-4"
              style={{ background: "var(--desk-bg)", border: "1px solid var(--desk-border)" }}
            >
              {avgOverall !== null && (
                <div className="text-center">
                  <div className="text-2xl font-bold" style={{ color: "var(--desk-teal)" }}>
                    {avgOverall.toFixed(1)} <span className="text-base font-normal" style={{ color: "var(--desk-muted)" }}>/ 5</span>
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--desk-muted)" }}>Overall</div>
                </div>
              )}
              <div className="text-center">
                <div className="text-2xl font-bold" style={{ color: "var(--desk-teal)" }}>
                  {ratingCount}
                </div>
                <div className="text-xs mt-0.5" style={{ color: "var(--desk-muted)" }}>Ratings</div>
              </div>
              {avgSuitability !== null && (
                <div className="text-center">
                  <div className="text-lg font-semibold" style={{ color: "var(--desk-ink)" }}>
                    {avgSuitability.toFixed(1)}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--desk-muted)" }}>Suitability</div>
                </div>
              )}
              {avgGoalAchievement !== null && (
                <div className="text-center">
                  <div className="text-lg font-semibold" style={{ color: "var(--desk-ink)" }}>
                    {avgGoalAchievement.toFixed(1)}
                  </div>
                  <div className="text-xs mt-0.5" style={{ color: "var(--desk-muted)" }}>Goal Achievement</div>
                </div>
              )}
            </div>
          )}

          {/* Activity Detail Sections */}
          <ActivityDetail content={content} />

          {/* Reviews */}
          {ratings && ratings.filter((r: { review_text: string | null }) => r.review_text).length > 0 && (
            <div
              className="rounded-xl p-5 space-y-4"
              style={{ background: "var(--desk-bg)", border: "1px solid var(--desk-border)" }}
            >
              <p className="text-xs font-bold uppercase tracking-widest" style={{ color: "var(--desk-muted)" }}>
                Reviews ({ratings.filter((r: { review_text: string | null }) => r.review_text).length})
              </p>
              {ratings
                .filter((r: { review_text: string | null }) => r.review_text)
                .map(
                  (
                    r: {
                      id: string;
                      overall_rating: number | null;
                      review_text: string | null;
                      profiles: { name: string | null } | null;
                      created_at: string;
                    },
                    i: number
                  ) => (
                    <div
                      key={r.id}
                      className={i > 0 ? "pt-4" : ""}
                      style={i > 0 ? { borderTop: "1px solid var(--desk-border)" } : {}}
                    >
                      <div className="flex items-center gap-2 mb-1 flex-wrap">
                        <span className="font-semibold text-sm" style={{ color: "var(--desk-ink)" }}>
                          {(r.profiles as { name: string | null } | null)?.name || "Anonymous"}
                        </span>
                        {r.overall_rating && (
                          <StampBadge color="teal">{r.overall_rating} / 5</StampBadge>
                        )}
                        <span className="text-xs" style={{ color: "var(--desk-muted)" }}>
                          {new Date(r.created_at).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm leading-relaxed" style={{ color: "var(--desk-body)" }}>{r.review_text}</p>
                    </div>
                  )
                )}
            </div>
          )}

          {/* Rating Form */}
          {user && (
            <div className="pb-8">
              <RatingForm
                activityId={activity.id}
                initialRating={userRating ?? undefined}
              />
            </div>
          )}

          {!user && (
            <div className="pb-8 text-center">
              <p style={{ color: "var(--desk-muted)" }}>
                <Link href="/login" className="underline underline-offset-2" style={{ color: "var(--desk-teal)" }}>
                  Sign in
                </Link>{" "}
                to rate this activity and save it to your library.
              </p>
            </div>
          )}
        </div>

        {/* ── Teacher Notes sidebar ── */}
        <aside className="hidden lg:block w-60 shrink-0 mt-4">
          <TeacherNotes activityId={activity.id} />
        </aside>
      </div>
    </div>
  );
}
