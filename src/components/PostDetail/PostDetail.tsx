import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

import { axiosI, handleApiResponseError } from "../../api/axios";

import { Post, renderPost } from "../Post/Post";
import PostForm from "../PostForm/PostForm";
import ItemList from "../ItemList/ItemList";
import Spinner from "../Spinner/Spinner";

import { PostT } from "../../types/post.types";

type Props = {};

const PostDetail = (props: Props) => {
  const [postData, setPostData] = useState<PostT>();
  const [newPosts, setNewPosts] = useState<Array<PostT>>([]);

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
            newPostCallback={(post: PostT) =>
              setNewPosts((state) => [post, ...state])
            }
            className="mt-12"
            parentPostId={postData.id}
            submitBtnText="Reply"
            textAreaPlaceholder="Reply..."
          />
          <div className="flex flex-col justify-center items-center my-8 gap-8 w-full">
            {newPosts.map((post) => renderPost(post))}
          </div>
          {postData.comment_count > 0 && (
            <div className="my-4 md:my-6 w-full">
              <ItemList
                endMessage={<hr />}
                itemSourceUrl={`/posts/${postData.id}/comments/`}
                renderItem={(item, i) => renderPost(item, i)}
                className="w-full my-4 gap-8"
              />
            </div>
          )}
        </div>
      ) : (
        <Spinner className={"my-4"} />
      )}
    </>
  );
};

export default PostDetail;
