import React from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { formatDistanceToNow, format, compareAsc } from "date-fns";
import {
  IconDotsVertical,
  IconPencil,
  IconPencilPlus,
  IconTrash,
} from "@tabler/icons";

import { useAuth } from "../../services/auth.serivce";
import { toastInfo } from "../../services/toast.service";

import { axiosI, handleApiResponseError } from "../../api/axios";

import { PostAuthor } from "../../types/post.types";

type Props = {
  postId: number;
  postAuthor: PostAuthor;
  created: string;
  updated: string;
  deleteCallback: () => void;
};

const PostHead = ({
  postId,
  postAuthor,
  created,
  updated,
  deleteCallback,
}: Props) => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  const createdDate = new Date(Number(created));
  const updatedDate = new Date(Number(updated));

  const wasUpdated = compareAsc(updatedDate, createdDate) === 1;

  const tooltipData = `Created: ${format(
    createdDate,
    "yyyy/MM/dd' 'HH:mm:ss.sss"
  )} ${
    wasUpdated
      ? "Updated: " + format(updatedDate, "yyyy/MM/dd' 'HH:mm:ss.sss")
      : ""
  }`;

  const deletePost = async () => {
    await axiosI
      .delete(`/posts/${postId}`, {})
      .then((res) => {
        if (res.status === 204) {
          deleteCallback();
          toastInfo("Post deleted");
          if (id && parseInt(id) === postId) {
            navigate("/");
          }
        }
      })
      .catch((err) => {
        handleApiResponseError(err);
      });
  };

  return (
    <div className="flex flex-row justify-start items-center">
      <Link to="/">
        <figure className="avatar cursor-pointer">
          <div className="w-14 rounded-xl">
            <img src={postAuthor.profile_picture} alt="Profile picture" />
          </div>
        </figure>
      </Link>
      <div className="flex flex-col ml-3">
        <Link to="/" className="font-semibold hover:underline cursor-pointer">
          {postAuthor.username}
        </Link>
        <div
          className="tooltip tooltip-bottom tooltip-primary flex flex-row items-center justify-center tracking-tight cursor-pointer"
          data-tip={tooltipData}
        >
          <p className="opacity-50 text-left flex flex-row justify-center items-center">
            {formatDistanceToNow(updatedDate, { addSuffix: true })}{" "}
            {wasUpdated && <IconPencil size={14} className="mx-1" />}
          </p>
        </div>
      </div>
      <div className="ml-auto flex flex-col sm:flex-row gap-1 md:gap-4 justify-center items-center">
        {(user?.isStaff || user?.id == postAuthor.user_id) && (
          <div className="btn-group">
            <button className="btn btn-primary btn-outline btn-xs">
              <Link to={`/posts/${postId}/edit/`}>
                <div
                  className="tooltip tooltip-primary tooltip-bottom"
                  data-tip="Edit"
                >
                  <IconPencilPlus className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
              </Link>
            </button>
            <button
              onClick={async () => await deletePost()}
              className="btn btn-primary btn-outline btn-xs"
            >
              <div
                className="tooltip tooltip-primary tooltip-bottom"
                data-tip="Delete"
              >
                <IconTrash className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
            </button>
          </div>
        )}
        <div className="dropdown dropdown-end">
          <button className="btn btn-ghost btn-circle btn-sm">
            <IconDotsVertical size={24} />
          </button>
          <ul
            tabIndex={0}
            className="dropdown-content menu p-2 shadow-lg bg-base-100 rounded-box w-52"
          >
            <li>
              <Link to="/">Author profile</Link>
            </li>
            <li>
              <Link to={`/posts/${postId}`}>Comments</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default PostHead;
