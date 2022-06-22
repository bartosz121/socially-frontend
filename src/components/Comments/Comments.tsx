import React, { useEffect } from "react";

import { PostT } from "../../types/post.types";

import PostList from "../PostList/PostList";

type Props = {
  postId: number;
  newPost?: PostT;
};

const Comments = ({ postId, newPost }: Props) => {
  useEffect(() => {
    console.log(postId);
  }, []);
  return (
    <section className="my-4 md:my-6 w-full">
      <h2 id="comments" className="text-center text-2xl md:text-3xl">
        Comments
      </h2>
      <div className="w-full">
        <PostList
          endMessage={<hr />}
          newestPost={newPost}
          sourceUrl={`/posts/${postId}/comments/`}
        />
      </div>
    </section>
  );
};

export default Comments;
