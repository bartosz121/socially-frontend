import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";
import { imgToFile } from "../../utils";
import { toastError, toastSuccess } from "../../services/toast.service";

import { PostRequestData, PostT } from "../../types/post.types";

import ImagePreview from "../ImagePreview/ImagePreview";
import Spinner from "../Spinner/Spinner";
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  newPostCallback: (post: PostT) => void;
  postData?: PostT;
  parentPostId?: number;
  textAreaPlaceholder?: string;
  submitBtnText?: string;
}

const PostForm = ({
  newPostCallback,
  className,
  postData,
  parentPostId,
  textAreaPlaceholder = "What's on your mind?",
  submitBtnText = "Send",
  ...props
}: Props) => {
  const [image, setImage] = useState<File>();
  const [preview, setPreview] = useState<string>(); // base64
  const [loading, setLoading] = useState(false);
  const [textAreaValue, setTextAreaValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    if (image) {
      setPreview(URL.createObjectURL(image));
    } else {
      setPreview(undefined);
    }
  }, [image]);

  useEffect(() => {
    const addDataToForm = async () => {
      if (postData?.body) {
        setTextAreaValue(postData.body);
      }

      if (postData?.picture_url) {
        const img = await imgToFile(postData.picture_url);
        if (img) {
          setImage(img);
        } else {
          toastError("Error reading post image");
        }
      }
    };
    addDataToForm();
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
      <section className={`${className} ${loading && "opacity-50"}`} {...props}>
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
              <ImageUploadInput
                isLoading={loading}
                onChangeHandler={setImage}
              />
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
          <ImagePreview
            imgSrc={preview}
            deleteCallback={() => {
              setImage(undefined);
              setPreview(undefined);
            }}
          />
        )}
      </section>
    </>
  );
};

export default PostForm;
