import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";

import { useAuth } from "../../services/auth.serivce";
import { toastError } from "../../services/toast.service";

import { PostT } from "../../types/post.types";

import PostForm from "../PostForm/PostForm";

type Props = {};

const PostEdit = (props: Props) => {
  const [postData, setPostData] = useState<PostT>();
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    const fetchPost = async () => {
      setPostData(undefined);
      await axiosI
        .get<PostT>(`/posts/${id}`)
        .then((res) => {
          if (!user?.isStaff && res.data.post_author.user_id !== user?.id) {
            toastError("Unauthorized");
            navigate("/", { replace: true });
          }

          setPostData(res.data);
        })
        .catch((err) => {
          handleApiResponseError(err);
          navigate("/", { replace: true });
        });
    };

    fetchPost();
  }, [id]);

  return (
    <div className="w-full mt-4">
      <h2 className="text-2xl text-center">Update Post #{id}</h2>
      <PostForm
        className="w-full mt-4"
        newPostCallback={() => navigate(`/posts/${id}`)}
        postData={postData}
      />
    </div>
  );
};

export default PostEdit;
