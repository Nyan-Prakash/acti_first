"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { useWizardStore } from "@/stores/wizard-store";
import { StarRating } from "@/components/rating/star-rating";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function RatePage() {
  const params = useParams();
  const router = useRouter();
  const { generatedActivities } = useWizardStore();

  const index = parseInt(params.activityId as string, 10);
  const activity = generatedActivities[index];

  const [suitability, setSuitability] = useState(0);
  const [goalAchievement, setGoalAchievement] = useState(0);
  const [recommendation, setRecommendation] = useState(0);
  const [comment, setComment] = useState("");
  const [submitted, setSubmitted] = useState(false);

  if (!activity) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <p className="text-gray-500">Activity not found.</p>
        <Button
          variant="outline"
          className="mt-4"
          onClick={() => router.push("/wizard/step-3")}
        >
          Back to Activities
        </Button>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="container mx-auto max-w-2xl px-4 py-16 text-center">
        <div className="mb-4 text-5xl">✅</div>
        <h1 className="text-2xl font-bold text-gray-900">
          Thank you for your feedback!
        </h1>
        <p className="mt-2 text-gray-500">
          Your rating helps improve activity recommendations for all teachers.
        </p>
        <div className="mt-6 flex justify-center gap-4">
          <Button
            variant="outline"
            onClick={() => router.push("/wizard/step-3")}
          >
            View Other Activities
          </Button>
          <Button onClick={() => router.push("/wizard/step-1")}>
            Create New Activity
          </Button>
        </div>
      </div>
    );
  }

  const canSubmit = suitability > 0 && goalAchievement > 0 && recommendation > 0;

  return (
    <div className="container mx-auto max-w-2xl px-4 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-2">Rate Activity</h1>
      <p className="text-gray-500 mb-6">
        Rate &ldquo;{activity.title}&rdquo; to help improve future suggestions
      </p>

      <Card>
        <CardHeader>
          <CardTitle>Your Feedback</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <StarRating
            label="How suitable did you find it to the lesson information?"
            value={suitability}
            onChange={setSuitability}
          />

          <StarRating
            label="Were you able to achieve the learning goals through it?"
            value={goalAchievement}
            onChange={setGoalAchievement}
          />

          <StarRating
            label="Do you recommend it to your subject teachers?"
            value={recommendation}
            onChange={setRecommendation}
          />

          <div>
            <Label htmlFor="comment" className="font-medium text-gray-900">
              Additional Comments (Optional)
            </Label>
            <Textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Share any additional thoughts about this activity..."
              className="mt-2 bg-white"
            />
          </div>

          <div className="flex justify-between pt-4">
            <Button
              variant="outline"
              onClick={() => router.push(`/wizard/step-3/${index}`)}
            >
              Back
            </Button>
            <Button
              disabled={!canSubmit}
              onClick={() => setSubmitted(true)}
            >
              Submit Rating
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
