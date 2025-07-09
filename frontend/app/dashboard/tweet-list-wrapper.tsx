"use client";

import { TweetList } from "@/components/tweets/tweet-list";
import type { TimelineResponse } from "@/types/feed";

interface TweetListWrapperProps {
  userId: string;
  initialData: TimelineResponse;
}

export default function TweetListWrapper({ userId, initialData }: TweetListWrapperProps) {
  return <TweetList userId={userId} initialData={initialData} />;
}