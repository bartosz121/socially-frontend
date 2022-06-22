import React, { useState } from "react";

import { Link } from "react-router-dom";

import { ParentPost, PostT } from "../../types/post.types";

type Props = {
  body: string;
  pictureUrl: string | null;
  parentData: ParentPost | null;
};

const PostBody = ({ body, pictureUrl, parentData }: Props) => {
  return (
    <section>
      {parentData && (
        <p className="mb-1 opacity-50 tracking-tight hover:opacity-100 hover:underline cursor-pointer">
          Replying to{" "}
          <Link to={`/posts/${parentData.id}`}>
            {parentData.parent_author.username}
          </Link>
        </p>
      )}
      <article className="leading-tight">
        <p>{body}</p>
      </article>
      {pictureUrl && (
        <>
          <figure className="m-4 select-none">
            <a href={pictureUrl} target="_blank">
              <img
                src={pictureUrl}
                className="rounded object-fit max-h-96 max-w-fit"
                alt="Post image"
              />
            </a>
          </figure>
        </>
      )}
    </section>
  );
};

export default PostBody;
