import { AbsoluteUrl, Timestamp } from "./general.types";

enum FollowAction {
  follow = "follow",
  unfollow = "unfollow",
}

export interface BasicProfile {
  user_id: number;
  username: string;
  profile_picture: AbsoluteUrl;
}

export interface Profile extends BasicProfile {
  profile_background: AbsoluteUrl;
  bio: string;
  followers_count: number;
  following_count: number;
  posts_count: number;
  created: Timestamp;
  updated: Timestamp;
}

export interface ProfileFollowResponse {
  followers_count: number;
  action: FollowAction;
}

export interface IsFollowingResponse {
  is_following: boolean;
}

export interface FollowStatsReponse {
  user_id: number;
  username: string;
  followers: number;
  following: number;
}
