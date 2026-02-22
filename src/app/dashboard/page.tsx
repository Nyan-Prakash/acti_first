"use client";

import { useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { ActivityCard } from "@/components/wizard/activity-card";
import { Button } from "@/components/ui/button";

export default function DashboardPage() {
  const router = useRouter();
  const { generatedActivities } = useWizardStore();

  return (
    <div className="container mx-auto max-w-4xl px-4 py-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500">
            Your recently generated activities
          </p>
        </div>
        <Button onClick={() => router.push("/wizard/step-1")}>
          Create New Activity
        </Button>
      </div>

      {generatedActivities.length === 0 ? (
        <div className="rounded-xl border bg-white p-12 text-center">
          <div className="text-5xl mb-4">📋</div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">
            No activities yet
          </h2>
          <p className="text-gray-500 mb-6">
            Generate your first activity to see it here.
          </p>
          <Button onClick={() => router.push("/wizard/step-1")}>
            Get Started
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {generatedActivities.map((activity, index) => (
            <ActivityCard
              key={activity.id}
              title={activity.title}
              category={activity.category}
              summary={activity.summary}
              index={index}
              onViewDetail={() => router.push(`/wizard/step-3/${index}`)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
