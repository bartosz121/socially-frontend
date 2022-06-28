import { AbsoluteUrl, Timestamp } from "./general.types";

enum LikeAction {
  like = "like",
  dislike = "dislike",
}

export interface PostAuthor {
  user_id: number;
  username: string;
  profile_picture: AbsoluteUrl;
}

export interface ParentAuthor {
  user_id: number;
  username: string;
  profile_picture: AbsoluteUrl;
}

export interface ParentPost {
  id: number;
  parent_author: ParentAuthor;
}

export interface PostT {
  id: number;
  parent_post: ParentPost;
  body: string;
  picture_url: AbsoluteUrl | null;
  like_count: number;
  comment_count: number;
  post_author: PostAuthor;
  created: Timestamp;
  updated: Timestamp;
}

export interface PostRequestData {
  body: string;
  picture_url?: File;
  parent_post?: number;
}

export interface LikeResponse {
  like_count: number;
  action: LikeAction;
}
