import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import PostHead from "../PostHead/PostHead";
import PostBody from "../PostBody/PostBody";
import PostBottom from "../PostBottom/PostBottom";

import { PostT } from "../../types/post.types";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  post: PostT;
  isDetailView?: boolean;
}

export const renderPost = (post: PostT, _?: number) => (
  <Post post={post} key={post.id} />
);

export const Post = ({
  post,
  className = "w-full md:w-3/4 max-w-4xl",
  isDetailView = false,
  ...props
}: Props) => {
  const {
    id: postId,
    parent_post: parentPost,
    body,
    comment_count: commentCount,
    like_count: likeCount,
    picture_url: pictureUrl,
    post_author: postAuthor,
    created,
    updated,
  } = post;

  const [postVisible, setPostVisible] = useState(true);

  return (
    <AnimatePresence exitBeforeEnter={true} onExitComplete={() => null}>
      {postVisible && (
        <motion.div
          key={`post-${postId}`}
          initial={{ y: "20vh", opacity: 0 }}
          animate={{ y: "0", opacity: 1 }}
          exit={{ y: "-20vh", opacity: 0 }}
          transition={{ duration: 0.4 }}
          className={className}
        >
          <div
            className="card w-full bg-base-300 shadow-xl overflow-visible"
            {...props}
          >
            <div className="card-body">
              <PostHead
                postId={postId}
                postAuthor={postAuthor}
                created={created}
                updated={updated}
                deleteCallback={() => setPostVisible(false)}
              />
              <PostBody
                body={body}
                pictureUrl={pictureUrl}
                parentData={parentPost}
              />
              <PostBottom
                postId={postId}
                postLikeCount={likeCount}
                postCommentCount={commentCount}
                commentsIconVisible={!isDetailView}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
