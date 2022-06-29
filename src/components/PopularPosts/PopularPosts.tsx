import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { axiosI, handleApiResponseError } from "../../api/axios";
import { PostT } from "../../types/post.types";

import Spinner from "../Spinner/Spinner";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const PopularPosts = ({ className, ...props }: Props) => {
  const [posts, setPosts] = useState<Array<PostT>>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      await axiosI
        .get<Array<PostT>>("/posts/most-commented/")
        .then((res) => {
          setPosts(res.data);
        })
        .catch((err) => {
          console.log(err);
          handleApiResponseError(err);
        });
      setLoading(false);
    };

    fetchPosts();
  }, []);
  return (
    <>
      {loading ? (
        <Spinner className="mx-auto" />
      ) : (
        <div
          className={`${className} bg-base-300 shadow-xl rounded-lg`}
          {...props}
        >
          <h4 className="font-semibold text-center text-lg md:text-2xl">
            Popular posts
          </h4>
          <div className="flex flex-col">
            {posts.map((item) => (
              <div className="my-1">
                <Link to={`/posts/${item.id}`}>
                  <p className="truncate text-ellipsis font-semibold cursor-pointer hover:underline">
                    {item.body}
                  </p>
                </Link>
                <Link to={`/profiles/${item.post_author.username}`}>
                  <p className="ml-auto text-neutral text-opacity-70 cursor-pointer hover:text-opacity-100 hover:underline">
                    by {item.post_author.username}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default PopularPosts;
