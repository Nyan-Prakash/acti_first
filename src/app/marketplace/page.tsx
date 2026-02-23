import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { ActivityFilters } from "@/components/marketplace/activity-filters";
import { ScrollRow } from "@/components/marketplace/scroll-row";
import { StampBadge } from "@/components/ui-desk";
import { GRADE_LEVELS, SUBJECTS } from "@/lib/constants";
import { getMyProfile } from "@/lib/profile";

function ActivityCategoryIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className={className ?? "w-5 h-5"} aria-hidden="true">
      <path d="M14.5 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7.5L14.5 2z"/><polyline points="14 2 14 8 20 8"/>
      <line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10 9 9 9 8 9"/>
    </svg>
  );
}

function StarIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className={className ?? "w-3.5 h-3.5"} aria-hidden="true">
      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
    </svg>
  );
}

function getGradeLabel(value: string) {
  return GRADE_LEVELS.find((g) => g.value === value)?.label || value;
}

function getSubjectLabel(value: string) {
  return SUBJECTS.find((s) => s.value === value)?.label || value;
}

type ActivityRow = {
  id: string;
  title: string;
  category: string;
  summary: string;
  grade_level: string;
  subject: string;
  activity_type: string;
  created_at: string;
  user_id: string;
};

/* ── Compact card used in the grid ── */
function ActivityCard({
  activity,
  accent,
  stats,
}: {
  activity: ActivityRow;
  accent: "teal" | "rose" | "sage" | "accent";
  stats?: { rating_count: number; avg_overall: number | null };
}) {
  return (
    <Link href={`/marketplace/${activity.id}`}>
      <div className="paper-card h-full flex flex-col gap-2 p-3.5 cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div
          className="h-0.5 -mx-3.5 -mt-3.5 rounded-t-xl mb-0.5"
          style={{
            background:
              accent === "teal"
                ? "var(--desk-teal)"
                : accent === "rose"
                  ? "var(--desk-rose)"
                  : accent === "sage"
                    ? "var(--desk-sage)"
                    : "var(--desk-accent)",
          }}
        />
        <h3 className="font-semibold text-desk-ink leading-snug line-clamp-2 text-sm">
          {activity.title}
        </h3>
        <p className="text-xs text-desk-body line-clamp-2 flex-1">{activity.summary}</p>
        <div className="flex flex-wrap gap-1 mt-auto">
          <StampBadge color={accent} animateIn>
            {activity.category.replace(/_/g, " ")}
          </StampBadge>
          <StampBadge color="ink">{getGradeLabel(activity.grade_level)}</StampBadge>
          <StampBadge color="ink">{getSubjectLabel(activity.subject)}</StampBadge>
        </div>
        {stats && stats.rating_count > 0 ? (
          <div className="flex items-center gap-1 text-xs text-desk-muted">
            <StarIcon className="w-3 h-3 text-amber-400" />
            <span className="font-medium text-desk-ink">
              {stats.avg_overall ? Number(stats.avg_overall).toFixed(1) : "N/A"}
            </span>
            <span className="mx-0.5">&middot;</span>
            <span>{stats.rating_count} {stats.rating_count === 1 ? "review" : "reviews"}</span>
          </div>
        ) : (
          <p className="text-xs text-desk-muted">
            {new Date(activity.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}

/* ── Wider card for the horizontal scroll row ── */
function RecommendedCard({
  activity,
  accent,
  stats,
}: {
  activity: ActivityRow;
  accent: "teal" | "rose" | "sage" | "accent";
  stats?: { rating_count: number; avg_overall: number | null };
}) {
  return (
    <Link
      href={`/marketplace/${activity.id}`}
      className="shrink-0 w-65 sm:w-70"
    >
      <div className="paper-card h-full flex flex-col gap-2.5 p-4 cursor-pointer hover:shadow-md transition-shadow duration-200">
        <div
          className="h-1 -mx-4 -mt-4 rounded-t-xl mb-0.5"
          style={{
            background:
              accent === "teal"
                ? "var(--desk-teal)"
                : accent === "rose"
                  ? "var(--desk-rose)"
                  : accent === "sage"
                    ? "var(--desk-sage)"
                    : "var(--desk-accent)",
          }}
        />
        <div className="flex items-start gap-2.5">
          <span
            className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md"
            style={{
              background: `color-mix(in srgb, var(--desk-${accent === "accent" ? "accent" : accent}) 12%, transparent)`,
              color: `var(--desk-${accent === "accent" ? "ink" : accent})`
            }}
          >
            <ActivityCategoryIcon className="w-3.5 h-3.5" />
          </span>
          <h3 className="font-semibold text-desk-ink leading-snug line-clamp-2 text-sm">
            {activity.title}
          </h3>
        </div>
        <p className="text-xs text-desk-body line-clamp-2 flex-1">{activity.summary}</p>
        <div className="flex flex-wrap gap-1">
          <StampBadge color={accent} animateIn>
            {activity.category.replace(/_/g, " ")}
          </StampBadge>
        </div>
        {stats && stats.rating_count > 0 ? (
          <div className="flex items-center gap-1 text-xs text-desk-muted">
            <StarIcon className="w-3 h-3 text-amber-400" />
            <span className="font-medium text-desk-ink">
              {stats.avg_overall ? Number(stats.avg_overall).toFixed(1) : "N/A"}
            </span>
            <span className="mx-0.5">&middot;</span>
            <span>{stats.rating_count} {stats.rating_count === 1 ? "review" : "reviews"}</span>
          </div>
        ) : (
          <p className="text-xs text-desk-muted">
            {new Date(activity.created_at).toLocaleDateString(undefined, {
              month: "short",
              day: "numeric",
            })}
          </p>
        )}
      </div>
    </Link>
  );
}

export default async function MarketplacePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}) {
  const params = await searchParams;
  const gradeFilter = params.grade || "";
  const subjectFilter = params.subject || "";
  const sort = params.sort || "newest";
  const searchQuery = (params.q || "").trim().toLowerCase();
  const typeFilter = params.type || "";
  const categoryFilter = params.category || "";
  const ratingFilter = params.rating || "";

  const hasActiveFilters = gradeFilter || subjectFilter || searchQuery || typeFilter || categoryFilter || ratingFilter;

  const supabase = await createClient();
  const profile = await getMyProfile();

  // Build query for activities
  let query = supabase
    .from("activities")
    .select("id, title, category, summary, grade_level, subject, activity_type, created_at, user_id")
    .eq("is_public", true);

  if (gradeFilter) {
    query = query.eq("grade_level", gradeFilter);
  }
  if (subjectFilter) {
    query = query.eq("subject", subjectFilter);
  }
  if (typeFilter) {
    query = query.eq("activity_type", typeFilter);
  }
  if (categoryFilter) {
    query = query.eq("category", categoryFilter);
  }

  if (sort === "newest") {
    query = query.order("created_at", { ascending: false });
  } else {
    query = query.order("created_at", { ascending: false });
  }

  query = query.limit(50);

  const { data: activities } = await query;

  // Fetch stats for all activities
  let statsMap: Record<
    string,
    { rating_count: number; avg_overall: number | null }
  > = {};
  if (activities && activities.length > 0) {
    const activityIds = activities.map((a) => a.id);
    const { data: stats } = await supabase
      .from("activity_stats")
      .select("*")
      .in("activity_id", activityIds);

    if (stats) {
      statsMap = Object.fromEntries(
        stats.map((s) => [
          s.activity_id,
          { rating_count: s.rating_count, avg_overall: s.avg_overall },
        ])
      );
    }
  }

  let sortedActivities = activities || [];

  if (searchQuery) {
    sortedActivities = sortedActivities.filter(
      (a) =>
        a.title.toLowerCase().includes(searchQuery) ||
        a.summary?.toLowerCase().includes(searchQuery) ||
        a.category.toLowerCase().includes(searchQuery)
    );
  }

  if (ratingFilter) {
    const minRating = Number(ratingFilter);
    sortedActivities = sortedActivities.filter((a) => {
      const avg = statsMap[a.id]?.avg_overall;
      return avg != null && Number(avg) >= minRating;
    });
  }

  if (sort === "highest_rated") {
    sortedActivities = [...sortedActivities].sort((a, b) => {
      const aRating = statsMap[a.id]?.avg_overall ?? 0;
      const bRating = statsMap[b.id]?.avg_overall ?? 0;
      return Number(bRating) - Number(aRating);
    });
  } else if (sort === "most_rated") {
    sortedActivities = [...sortedActivities].sort((a, b) => {
      const aCount = statsMap[a.id]?.rating_count ?? 0;
      const bCount = statsMap[b.id]?.rating_count ?? 0;
      return bCount - aCount;
    });
  }

  // Split into recommended (matching profile) and rest when no filters active
  const showRecommended = !hasActiveFilters && profile?.grade_level && profile?.subject;
  let recommended: typeof sortedActivities = [];
  let rest: typeof sortedActivities = sortedActivities;

  if (showRecommended) {
    recommended = sortedActivities.filter(
      (a) =>
        a.grade_level === profile.grade_level &&
        a.subject === profile.subject
    );
    rest = sortedActivities.filter(
      (a) =>
        a.grade_level !== profile.grade_level ||
        a.subject !== profile.subject
    );
  }

  const accentColors = ["teal", "rose", "sage", "accent"] as const;

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">
          Activity Marketplace
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Browse and discover activities created by the community
        </p>
      </div>

      <ActivityFilters />

      <div className="mt-6">
        {sortedActivities.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-lg text-gray-500">No activities found.</p>
            <p className="mt-1 text-sm text-gray-400">
              Try adjusting your filters or check back later.
            </p>
          </div>
        ) : (
          <div className="space-y-8">
            {/* ── Recommended for You (horizontal scroll) ── */}
            {showRecommended && recommended.length > 0 && (
              <section>
                <div className="mb-3 flex items-center gap-2.5">
                  <span className="flex h-6 w-6 items-center justify-center rounded-md bg-violet-100 text-violet-600">
                    <StarIcon className="w-3.5 h-3.5" />
                  </span>
                  <h2 className="text-sm font-semibold text-gray-900">
                    Recommended for You
                  </h2>
                  <span className="rounded-full bg-violet-50 border border-violet-200 px-2 py-px text-[11px] font-medium text-violet-600">
                    {getGradeLabel(profile!.grade_level!)} &middot; {getSubjectLabel(profile!.subject!)}
                  </span>
                </div>
                <ScrollRow>
                  {recommended.map((activity, i) => (
                    <RecommendedCard
                      key={activity.id}
                      activity={activity}
                      accent={accentColors[i % accentColors.length]}
                      stats={statsMap[activity.id]}
                    />
                  ))}
                </ScrollRow>
              </section>
            )}

            {/* ── All Activities (grid) ── */}
            {rest.length > 0 && (
              <section>
                {showRecommended && recommended.length > 0 && (
                  <div className="mb-3 flex items-center gap-2.5">
                    <span className="flex h-6 w-6 items-center justify-center rounded-md bg-gray-100 text-gray-500">
                      <svg viewBox="0 0 20 20" fill="currentColor" className="w-3.5 h-3.5" aria-hidden="true">
                        <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                      </svg>
                    </span>
                    <h2 className="text-sm font-semibold text-gray-900">
                      All Activities
                    </h2>
                    <div className="flex-1 h-px bg-gray-200" />
                  </div>
                )}
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
                  {rest.map((activity, i) => {
                    const offset = showRecommended ? recommended.length : 0;
                    return (
                      <ActivityCard
                        key={activity.id}
                        activity={activity}
                        accent={accentColors[(i + offset) % accentColors.length]}
                        stats={statsMap[activity.id]}
                      />
                    );
                  })}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
