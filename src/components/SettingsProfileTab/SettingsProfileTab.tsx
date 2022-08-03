import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";
import { toastSuccess } from "../../services/toast.service";
import { Profile } from "../../types/profile.types";
import { imgToFile } from "../../utils";
import ImagePreview from "../ImagePreview/ImagePreview";
import ImageUploadInput from "../ImageUploadInput/ImageUploadInput";

import Spinner from "../Spinner/Spinner";

type Props = {
  profileData: Profile;
};

interface ProfileFormData {
  username: string;
  bio: string;
  profilePicture?: File;
  profileBackground?: File;
}

const SettingsProfileTab = (props: Props) => {
  const [loading, setLoading] = useState(false);
  const [profilePicturePreview, setProfilePicturePreview] = useState<string>();
  const [profileBackgroundPreview, setProfileBackgroundPreview] =
    useState<string>();

  const [profileData] = useState<Profile>(props.profileData);
  const [formData, setFormData] = useState<ProfileFormData>();

  const navigate = useNavigate();

  useEffect(() => {
    if (formData?.profilePicture) {
      setProfilePicturePreview(URL.createObjectURL(formData.profilePicture));
    }

    if (formData?.profileBackground) {
      setProfileBackgroundPreview(
        URL.createObjectURL(formData.profileBackground)
      );
    }
  }, [formData?.profilePicture, formData?.profileBackground]);

  useEffect(() => {
    const createFormData = async () => {
      const profilePictureImg = await imgToFile(profileData.profile_picture);
      const profileBackgroundImg = await imgToFile(
        profileData.profile_background
      );

      const formData: ProfileFormData = {
        username: profileData.username,
        bio: profileData.bio,
        profilePicture: profilePictureImg!,
        profileBackground: profileBackgroundImg!,
      };

      setFormData(formData);
    };

    if (profileData) {
      createFormData();
    }
  }, [profileData]);

  const setFormDataProfilePicture = (img: File | undefined) => {
    setFormData((state) => {
      return { ...state!, profilePicture: img };
    });
  };

  const setFormDataProfileBackground = (img: File | undefined) => {
    setFormData((state) => {
      return { ...state!, profileBackground: img };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = {
      username: formData?.username,
      bio: formData?.bio,
      profile_picture: formData?.profilePicture,
      profile_background: formData?.profileBackground,
    };

    console.log(data);

    setLoading(true);

    await axiosI
      .put("/profiles/profile/change/", data, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        console.log(res);
        toastSuccess("Profile changed!");
        navigate("/");
      })
      .catch((err) => handleApiResponseError(err))
      .finally(() => setLoading(false));
  };

  return (
    <section className="relative">
      {!formData ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Spinner />
        </div>
      ) : (
        <div className={`${loading && "opacity-50"}`}>
          <form
            onSubmit={async (e) => await handleSubmit(e)}
            method="POST"
            encType="multipart/form-data"
            className="p-3 sm:p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
          >
            <h1 className="text-2xl font-bold text-center text-primary sm:text-3xl">
              Profile
            </h1>
            <div className="form-control">
              <label htmlFor="username" className="label font-semibold">
                <span className="label-text">Username</span>
              </label>

              <div className="relative mt-1">
                <input
                  type="text"
                  name="username"
                  className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                  autoComplete="off"
                  value={formData!.username}
                  onChange={(e) =>
                    setFormData((state) => {
                      return { ...state!, username: e.target.value };
                    })
                  }
                />
              </div>
            </div>

            <div className="form-control">
              <label htmlFor="bio" className="label font-semibold">
                <span className="label-text">Bio</span>
              </label>

              <div className="relative mt-1"></div>
              <textarea
                className="textarea textarea-primary border-opacity-30 w-full h-20 md:h-28 text-lg leading-tight resize-none"
                name="bio"
                value={formData!.bio ? formData!.bio : ""}
                maxLength={180}
                onChange={(e) =>
                  setFormData((state) => {
                    return { ...state!, bio: e.target.value };
                  })
                }
              />
            </div>

            <div className="form-control">
              <label htmlFor="profile-picture" className="label font-semibold">
                <span className="label-text">Profile Picture</span>
              </label>
              <ImageUploadInput
                isLoading={loading}
                onChangeHandler={setFormDataProfilePicture}
              />
              <ImagePreview
                imgSrc={profilePicturePreview!}
                deleteCallback={() => {
                  setFormDataProfilePicture(undefined);
                  setProfilePicturePreview(undefined);
                }}
              />
            </div>

            <div className="form-control">
              <label
                htmlFor="profile-background"
                className="label font-semibold"
              >
                <span className="label-text">Profile Background</span>
              </label>
              <ImageUploadInput
                isLoading={loading}
                onChangeHandler={setFormDataProfileBackground}
              />
              <ImagePreview
                imgSrc={profileBackgroundPreview!}
                deleteCallback={() => {
                  setFormDataProfileBackground(undefined);
                  setProfileBackgroundPreview(undefined);
                }}
              />
            </div>

            <button
              type="submit"
              className={`btn btn-primary block w-full px-5 py-3 ${
                (loading || formData.username === "") && "btn-disabled"
              }`}
            >
              Update
            </button>
          </form>
        </div>
      )}
    </section>
  );
};

export default SettingsProfileTab;
