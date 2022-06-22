import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { axiosI } from "../../api/axios";

import { PaginatedResponse, PostT } from "../../types/post.types";

import Post from "../Post/Post";
import Spinner from "../Spinner/Spinner";

type Props = {
  sourceUrl: string;
  endMessage: JSX.Element;
  newestPost?: PostT;
};

const PostList = ({ newestPost, sourceUrl, endMessage }: Props) => {
  const defaultPostSourceUrl = "/api/v1/posts/";
  const [posts, setPosts] = useState<Array<PostT>>([]);
  const [postsCount, setPostsCount] = useState(0);
  const [error, setError] = useState(false);
  const [nextUrl, setNextUrl] = useState(
    sourceUrl ? sourceUrl : defaultPostSourceUrl
  );

  useEffect(() => {
    if (newestPost) {
      setPosts([newestPost, ...posts]);
    }
  }, [newestPost]);

  useEffect(() => {
    getPosts();
  }, []);

  const getPosts = async () => {
    setError(false);

    try {
      const result = await axiosI.get(nextUrl);
      setPosts([...posts, ...result.data.results]);
      setPostsCount(result.data.count);
      setNextUrl(result.data.next);
    } catch (error) {
      // TODO
      setError(true);
    }
  };

  return (
    <InfiniteScroll
      dataLength={posts.length}
      next={getPosts}
      hasMore={posts.length < postsCount}
      loader={<Spinner />}
      endMessage={endMessage ? endMessage : <hr />}
      scrollThreshold={0.9}
      className="flex flex-col justify-center items-center my-4 gap-8"
    >
      {posts.map((post, i) => (
        <Post post={post} key={post.id} />
      ))}
    </InfiniteScroll>
  );
};

export default PostList;
