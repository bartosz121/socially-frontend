import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { axiosI, handleApiResponseError } from "../../api/axios";

import Post from "../Post/Post";
import PostForm from "../PostForm/PostForm";
import Comments from "../Comments/Comments";
import Spinner from "../Spinner/Spinner";

import { PostT } from "../../types/post.types";

type Props = {};

const PostDetail = (props: Props) => {
  const [postData, setPostData] = useState<PostT>();
  const [createdPost, setCreatedPost] = useState<PostT>();

  const navigate = useNavigate();
  let { id } = useParams();

  useEffect(() => {
    const fetchPost = async () => {
      setPostData(undefined);
      await axiosI
        .get(`/posts/${id}`)
        .then((res) => setPostData(res.data))
        .catch((err) => {
          handleApiResponseError(err);
          navigate("/");
        });
    };

    fetchPost();
  }, [id]);

  return (
    <>
      {postData ? (
        <div className="mt-4 w-full flex flex-col justify-center items-center">
          <Post post={postData} isDetailView={true} />
          <PostForm
            newPostCallback={(post: PostT) => setCreatedPost(post)}
            className="mt-12"
            parentPostId={postData.id}
            submitBtnText="Reply"
            textAreaPlaceholder="Reply..."
          />
          {(postData.comment_count > 0 || createdPost) && (
            <Comments postId={postData.id} newPost={createdPost} />
          )}
        </div>
      ) : (
        <Spinner className={"my-4"} />
      )}
    </>
  );
};

export default PostDetail;
