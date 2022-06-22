import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";
import { toastSuccess } from "../../services/toast.service";

import { PostRequestData, PostT } from "../../types/post.types";

import Spinner from "../Spinner/Spinner";

type Props = {
  newPostCallback: (post: PostT) => void;
  className?: string;
  postData?: PostT;
  parentPostId?: number;
  textAreaPlaceholder?: string;
  submitBtnText?: string;
};

const PostForm = ({
  newPostCallback,
  className,
  postData,
  parentPostId,
  textAreaPlaceholder = "What's on your mind?",
  submitBtnText = "Send",
}: Props) => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(); // base64
  const [loading, setLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
      };

      reader.readAsDataURL(image);
    } else {
      setPreview(undefined);
    }
  }, [image]);

  useEffect(() => {
    const imgToFile = async () => {
      await fetch(postData!.picture_url!)
        .then((res) => res.blob())
        .then((blob) => {
          const extension = postData!.picture_url!.substring(
            postData!.picture_url!.lastIndexOf(".") + 1
          );
          setImage(new File([blob], `img.${extension}`));
        });
    };

    if (postData?.body) {
      setTextAreaValue(postData.body);
    }

    if (postData?.picture_url) {
      imgToFile();
    }
  }, [postData]);

  const createPost = async (data: PostRequestData) => {
    await axiosI
      .post<PostT>("/posts/", data, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        toastSuccess("Post created!");
        stateCleanup();
        newPostCallback(res.data);
      })
      .catch((err) => {
        console.log(err);
        handleApiResponseError(err);
      });
  };

  const updatePost = async (data: PostRequestData) => {
    await axiosI
      .put(
        `/posts/${postData!.id}/`,
        { ...postData, ...data },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        toastSuccess("Updated!");
        stateCleanup();
        navigate(`/posts/${res.data.id}`);
      })
      .catch((err) => {
        console.log(err);
        handleApiResponseError(err);
      });
  };

  const stateCleanup = () => {
    setPreview(undefined);
    setImage(undefined);
    setTextAreaValue("");
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      body: textAreaValue,
      picture_url: image,
      ...(parentPostId && { parent_post: parentPostId }),
    };

    if (postData) {
      await updatePost(formData);
    } else {
      await createPost(formData);
    }
    setLoading(false);
  };

  return (
    <>
      {loading && <Spinner className="absolute mt-4 left-1/2 z-10" />}
      <section
        className={`mx-auto w-full md:w-3/4 max-w-4xl ${className} ${
          loading && "opacity-50"
        }`}
      >
        <form
          onSubmit={async (e) => await handleSubmit(e)}
          method="POST"
          encType="multipart/form-data"
        >
          <div className="flex flex-col md:flex-row justify-center items-center gap-1">
            <textarea
              className="textarea textarea-primary border-opacity-30 w-full h-20 md:h-28 text-lg leading-tight resize-none"
              name="body"
              placeholder={textAreaPlaceholder}
              value={textAreaValue}
              maxLength={240}
              onChange={(e) => setTextAreaValue(e.target.value)}
            ></textarea>
            <div className="flex flex-row md:flex-col gap-2">
              <label
                htmlFor="file-upload"
                className="relative cursor-pointer bg-base-100 rounded-md font-medium text-neutral text-opacity-50 hover:text-primary focus-within:outline-none"
              >
                <svg
                  className="mx-auto h-12 w-12 text-neutral opacity-50 hover:text-primary hover:opacity-100 transition-opacity"
                  stroke="currentColor"
                  fill="none"
                  viewBox="0 0 48 48"
                  aria-hidden="true"
                >
                  <path
                    d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <input
                  id="file-upload"
                  name="picutre_url"
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  disabled={loading}
                  onChange={(e) => {
                    if (e.target.files) {
                      const file = e.target.files[0];
                      setImage(file);
                    } else {
                      setImage(undefined);
                    }
                  }}
                />
              </label>
              <button
                className={`btn btn-primary px-16 md:px-4 ${
                  (loading || textAreaValue.trim().length < 1) && "btn-disabled"
                }`}
                type="submit"
              >
                {submitBtnText}
              </button>
            </div>
          </div>
        </form>
        {preview && (
          <div className="artboard mx-auto">
            <img
              className="mt-2 w-full max-h-96 object-contain"
              src={preview}
              alt="Post image preview"
            />
            <div className="my-2 w-full text-center">
              <button
                onClick={() => {
                  setImage(undefined);
                  setPreview(undefined);
                }}
                className={`btn btn-error btn-wide ${
                  loading && "btn-disabled"
                }`}
              >
                Delete
              </button>
            </div>
          </div>
        )}
      </section>
    </>
  );
};

export default PostForm;
