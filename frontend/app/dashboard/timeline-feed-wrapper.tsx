"use client";

import { TweetList } from "@/components/tweets/tweet-list";
import type { TweetsResponse } from "@/types/tweet";

interface TimelineFeedWrapperProps {
  initialData: TweetsResponse;
}

export default function TimelineFeedWrapper({ initialData }: TimelineFeedWrapperProps) {
  return <TweetList initialData={initialData} userId={""} />;
}