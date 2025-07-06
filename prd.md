# Mock Twitter MVP - Product Requirement Document

## Overview
This is a minimal viable product (MVP) version of Twitter to demonstrate core social networking functionalities. The goal is to build a working prototype that supports user-generated content, social interactions, and content discovery. This document outlines the initial feature set and behaviors.

## Tech Stack
- **Frontend**: Next.js (TypeScript, Tailwind CSS, Relay)
- **Backend**: Nest.js (TypeScript, GraphQL)
- **Database**: SQLite

## Core Features

### 1. User Authentication
- Users can **sign up** with a unique username, email, and password.
- Users can **log in** using email and password.
- Session management using **JWT (JSON Web Token)** for authentication.

### 2. Tweeting
- Users can **post a tweet**.
- Tweets are limited to **280 characters**.
- Tweets are timestamped.

### 3. Follow System
- Users can **follow or unfollow** other users.
- Each user has a list of **followers** and **followees**.

### 4. Feed
- Authenticated users see a **feed** of tweets from people they follow.
- Tweets in the feed are **ranked by recency**.
- Feed supports **infinite scroll**.

### 5. Search
- Users can **search tweets** by keyword.
- Users can **search by hashtag** (e.g., #mvp).
- Hashtag search is **case-insensitive**.
- Search covers **all tweets**, not limited to followed users.

### 6. User Profiles
- Each user has a **profile page**: `/@username`
- Profile displays user's bio (optional), tweets, follower/following count.

## Non-Goals
- No media (images, videos) support.
- No direct messaging.
- No tweet replies, likes, or retweets (yet).

## Milestones
Each milestone should work end-to-end (frontend + backend integrated).

### Milestone 1: Auth System
- Implement sign-up and login flow
- Basic GraphQL schema for auth
- Session management

### Milestone 2: Tweeting
- Backend support for creating and fetching tweets
- Tweet posting UI (280-character limit)
- Display own tweets on profile page

### Milestone 3: Follow System
- Backend support for following/unfollowing users
- UI for follow/unfollow button
- Update profile pages to reflect follower/following count

### Milestone 4: Feed
- Backend query to get tweets from followed users
- Frontend feed UI with infinite scroll

### Milestone 5: Search
- Implement text and hashtag-based search
- Case-insensitive hashtag query
- Frontend search bar and result view

### Milestone 6: Profile Pages
- Public user profiles at `/@username`
- Show tweets, basic user info, follower/following data

## Assumptions
- Only public tweets; no private account concept.
- Simplified UI; focus on function, not style.

## Suggested v0 Prompts by Milestone
Each prompt should include project context for v0 to better generate UI aligned with your goals.

### Project Context (include in each prompt)
> This is a minimal Twitter clone MVP built with Next.js, TypeScript, Tailwind CSS, and GraphQL. It should support tweeting, user authentication, follow relationships, search, and user profiles. The focus is on working UI that integrates cleanly with a GraphQL backend, not styling or animations.

Use these prompts with [v0.dev](https://v0.dev) to scaffold your frontend code incrementally.

### Milestone 1: Auth System
> Build a responsive sign-up and login page using Next.js, TypeScript, and Tailwind CSS. Include fields for username, email, and password. Handle form validation and display error states. Integrate with a GraphQL backend using JWT for session management.

### Milestone 2: Tweeting
> Create a tweet posting UI in Next.js using Tailwind CSS. Limit tweets to 280 characters and display a list of the user's own tweets below the input box. Use GraphQL mutations and queries to send and fetch data.

### Milestone 3: Follow System
> Build follow and unfollow buttons on user profile pages. Update follower and following counts accordingly. Use GraphQL mutations for follow/unfollow actions and queries to fetch follow data.

### Milestone 4: Feed
> Build a tweet feed UI with infinite scroll in Next.js using Tailwind. Each tweet should display the user handle, timestamp, and text. Use GraphQL to fetch a paginated feed from followed users.

### Milestone 5: Search
> Create a tweet search UI with a search bar that supports keyword and hashtag search (case-insensitive). Render search results in a list view. Use GraphQL queries to perform the search.

### Milestone 6: Profile Pages
> Create a public user profile page accessible at `/@username` that shows the user's bio (if available), tweets, and follower/following counts. Use GraphQL to fetch profile and tweet data.
