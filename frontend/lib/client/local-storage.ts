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
    const tweets = JSON.parse(tweetsJson);
    return tweets;
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
  console.log('[LocalStorage] addLocalTweet called with tweet:', JSON.stringify(tweet, null, 2));
  if (typeof window === 'undefined') return;
  
  // Safety check - ensure tweet has a valid author
  if (!tweet.author) {
    console.error('Cannot add tweet: Missing author object');
    throw new Error('Missing author object in tweet');
  }
  
  // Safety check - ensure tweet author has an ID
  if (!tweet.author.id) {
    console.error('Cannot add tweet: Author missing ID', JSON.stringify(tweet.author));
    throw new Error('Author missing ID');
  }
  
  console.log('[LocalStorage] Adding tweet with author ID:', tweet.author.id);
  const tweets = getLocalTweets();
  saveLocalTweets([tweet, ...tweets]);
}

// Clear all tweets from local storage
export function clearLocalTweets(): void {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem(KEYS.LOCAL_TWEETS);
}