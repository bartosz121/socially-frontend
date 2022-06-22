import React, { useState, useEffect } from "react";
import { IconHeart, IconMessage2, IconCopy } from "@tabler/icons";
import { useNavigate, useLocation } from "react-router";
import { Link } from "react-router-dom";

import { useAuth } from "../../services/auth.serivce";
import { axiosI } from "../../api/axios";
import { handleApiResponseError } from "../../api/axios";
import PostActionButton from "../PostActionButton/PostActionButton";

import {
  LIKE_HEX_COLOR,
  formatNumberToDisplay,
  copyTextToClipboard,
} from "../../utils";

type Props = {
  postId: number;
  postLikeCount: number;
  postCommentCount: number;
  commentsIconVisible: boolean;
};

const PostBottom = ({
  postId,
  postLikeCount,
  postCommentCount,
  commentsIconVisible,
}: Props) => {
  const [likeCount, setLikeCount] = useState(postLikeCount);
  const [userLiked, setUserLiked] = useState(false);
  const [copyMsg, setCopyMsg] = useState("Copy URL");

  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useAuth();

  // @ts-ignore
  const from = location.state?.from?.pathname || "/";

  useEffect(() => {
    let timer = setTimeout(() => setCopyMsg("Copy URL"), 5000);
    return () => {
      clearTimeout(timer);
    };
  }, [copyMsg]);

  const handleCopyClick = async () => {
    await copyTextToClipboard(window.location.hostname);
    setCopyMsg("Copied!");
  };

  useEffect(() => {
    if (user?.id) {
      axiosI
        .get(`/users/${user.id}/liked/${postId}/`)
        .then((res) => {
          setUserLiked(res.data.is_liked);
        })
        .catch((err) => {
          handleApiResponseError(err);
        });
    }
  }, []);

  const likePost = async () => {
    if (user) {
      const action = userLiked ? "dislike" : "like";
      await axiosI
        .post(`/posts/${postId}/like/`, {
          action: action,
        })
        .then((res) => {
          setLikeCount(res.data.like_count);
          setUserLiked(!userLiked);
        })
        .catch((err) => {
          handleApiResponseError(err);
        });
    } else {
      navigate("/auth/signin", {
        state: { from: location },
      });
    }
  };

  return (
    <div className="card-actions justify-evenly select-none mt-4">
      {commentsIconVisible && (
        <Link to={`/posts/${postId}`}>
          <PostActionButton className="flex flex-row justify-center items-center">
            <IconMessage2 size={32} stroke={1.4} />
            <p className="mx-2 font-bold">
              {postCommentCount > 0 && formatNumberToDisplay(postCommentCount)}
            </p>
          </PostActionButton>
        </Link>
      )}
      <PostActionButton
        onClick={async () => {
          await likePost();
        }}
        className={`flex flex-row justify-center items-center ${
          user && userLiked && "drop-shadow-like text-like"
        }`}
      >
        {user && userLiked ? (
          <IconHeart fill={LIKE_HEX_COLOR} size={32} stroke={1.4} />
        ) : (
          <IconHeart size={32} stroke={1.4} />
        )}
        <p className="mx-2 font-bold">
          {likeCount > 0 && formatNumberToDisplay(likeCount)}
        </p>
      </PostActionButton>
      <div className="tooltip tooltip-primary" data-tip={copyMsg}>
        <PostActionButton onClick={() => handleCopyClick()}>
          <IconCopy size={32} stroke={1.4} />
        </PostActionButton>
      </div>
    </div>
  );
};

export default PostBottom;
