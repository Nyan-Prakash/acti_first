"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const categoryIcons: Record<string, string> = {
  debate: "🗣️",
  documentary: "🎬",
  acting: "🎭",
  conference: "🎤",
  experiment: "🧪",
  quiz: "📝",
  group_discussion: "👥",
  creative_project: "🎨",
  presentation: "📊",
  simulation: "🎮",
  field_study: "🔍",
  peer_teaching: "👨‍🏫",
  role_play: "🎪",
  research_project: "📚",
};

interface ActivityCardProps {
  title: string;
  category: string;
  summary: string;
  index: number;
  onViewDetail: () => void;
}

export function ActivityCard({
  title,
  category,
  summary,
  onViewDetail,
}: ActivityCardProps) {
  const icon = categoryIcons[category] || "📋";
  const categoryLabel = category.replace(/_/g, " ");

  return (
    <Card className="transition-all hover:shadow-lg cursor-pointer" onClick={onViewDetail}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <span className="text-3xl">{icon}</span>
            <div>
              <CardTitle className="text-lg">{title}</CardTitle>
              <Badge variant="secondary" className="mt-1 capitalize">
                {categoryLabel}
              </Badge>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 mb-4">{summary}</p>
        <Button variant="outline" size="sm" className="w-full">
          View Details
        </Button>
      </CardContent>
    </Card>
  );
}
