'use client';

import type { Tweet } from "@/types/tweet";

// Keys for local storage
const KEYS = {
  LOCAL_TWEETS: 'local_tweets'
};

// Get tweets from local storage
export function getLocalTweets(): Tweet[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const tweetsJson = localStorage.getItem(KEYS.LOCAL_TWEETS);
    if (!tweetsJson) return [];
    return JSON.parse(tweetsJson);
  } catch (error) {
    console.error('Error retrieving tweets from local storage:', error);
    return [];
  }
}

// Save tweets to local storage
export function saveLocalTweets(tweets: Tweet[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(KEYS.LOCAL_TWEETS, JSON.stringify(tweets));
  } catch (error) {
    console.error('Error saving tweets to local storage:', error);
  }
}

// Add a new tweet to local storage
export function addLocalTweet(tweet: Tweet): void {
  if (typeof window === 'undefined') return;
  
  const tweets = getLocalTweets();
  saveLocalTweets([tweet, ...tweets]);
}

// Clear all tweets from local storage
export function clearLocalTweets(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(KEYS.LOCAL_TWEETS);
}