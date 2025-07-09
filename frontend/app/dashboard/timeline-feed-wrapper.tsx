"use client";

import { TimelineFeed } from "@/components/feed/timeline-feed";
import type { TimelineResponse } from "@/types/feed";

interface TimelineFeedWrapperProps {
  initialData: TimelineResponse;
}

export default function TimelineFeedWrapper({ initialData }: TimelineFeedWrapperProps) {
  return <TimelineFeed initialData={initialData} />;
}