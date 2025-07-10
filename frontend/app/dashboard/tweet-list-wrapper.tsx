"use client";

import { TweetList } from "@/components/tweets/tweet-list";
import type { TweetsResponse } from "@/types/tweet";

interface TweetListWrapperProps {
  userId: string;
  initialData: TweetsResponse;
}

export default function TweetListWrapper({ userId, initialData }: TweetListWrapperProps) {
  return <TweetList userId={userId} initialData={initialData} />;
}