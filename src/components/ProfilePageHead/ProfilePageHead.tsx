import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";
import { useAuth } from "../../services/auth.serivce";
import {
  IsFollowingResponse,
  Profile,
  ProfileFollowResponse,
  FollowStatsReponse,
  BasicProfile,
} from "../../types/profile.types";

import { formatNumberToDisplay } from "../../utils";

import ModalScrollableList from "../ModalScrollableList/ModalScrollableList";
import { renderProfileItemList } from "../ProfileItemList/ProfileItemList";
import Spinner from "../Spinner/Spinner";

type Props = {
  username: string;
};

const ProfileDetailHead = ({ username }: Props) => {
  const [profileData, setProfileData] = useState<Profile>();
  const [followersCounter, setFollowersCounter] = useState<number>();
  const [followingCounter, setFollowingCounter] = useState<number>();
  const [isUserFollowing, setIsUserFollowing] = useState(false);
  const [loading, setLoading] = useState(true);

  const followersUrl = `/profiles/${username}/followers/`;
  const followingUrl = `/profiles/${username}/following/`;

  const navigate = useNavigate();
  const { user } = useAuth();

  // @ts-ignore
  const from = location.state?.from?.pathname || "/";

  const fetchFollowCounters = async () => {
    await axiosI
      .get<FollowStatsReponse>(`/profiles/${username}/follow/count`)
      .then((res) => {
        setFollowersCounter(res.data.followers);
        setFollowingCounter(res.data.following);
      })
      .catch((err) => handleApiResponseError(err));
  };

  useEffect(() => {
    const fetchFollowStatus = async () => {
      if (user) {
        await axiosI
          .get<IsFollowingResponse>(
            `/profiles/${username}/is-following/${user.username}/`
          )
          .then((res) => {
            console.log(res);
            setIsUserFollowing(res.data.is_following);
          })
          .catch((err) => {
            handleApiResponseError(err);
          });
      }
    };

    fetchFollowStatus();
  }, [user]);

  useEffect(() => {
    const fetchProfileData = async () => {
      await axiosI
        .get<Profile>(`/profiles/${username}/`)
        .then((res) => {
          setProfileData(res.data);
          setFollowingCounter(res.data.following_count);
          setFollowersCounter(res.data.followers_count);
        })
        .catch((err) => handleApiResponseError(err));
    };

    setLoading(true);
    fetchProfileData();
    setLoading(false);
  }, []);

  const handleFollowClick = async () => {
    if (user) {
      const action = isUserFollowing ? "unfollow" : "follow";
      await axiosI
        .post<ProfileFollowResponse>(`/profiles/${username}/follow/`, {
          action: action,
        })
        .then(async (res) => {
          setFollowersCounter(res.data.followers_count);
          setIsUserFollowing(!isUserFollowing);
          await fetchFollowCounters();
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
    <section className="">
      {loading && <Spinner className="relative mx-auto" />}
      {profileData && (
        <div className="mx-auto">
          <div className="mt-4">
            <img
              className="w-full max-h-52 rounded-xl object-fill"
              src={profileData.profile_background}
              alt="Profile background"
            />
          </div>
          <div className="px-8 md:h-32 flex flex-col md:flex-row justify-around items-center">
            <img
              className="relatve bottom-4 md:bottom-12 avatar rounded-md w-32 md:w-44 ring ring-base-100 ring-offset-base-100 ring-offset-2"
              src={profileData.profile_picture}
              alt="Profile picture"
            />
            <p className="text-4xl break-all text-center">{username}</p>
            <div className="flex flex-row pt-4 justify-around items-center select-none gap-6 text-lg">
              <ModalScrollableList
                name="following-modal"
                itemSourceUrl={followingUrl}
                renderItem={(item, i) => renderProfileItemList(item, i)}
                toggleModalElement={
                  <div className="cursor-pointer hover:underline">
                    {formatNumberToDisplay(followingCounter!)}
                    <small className="text-neutral opacity-70">Following</small>
                  </div>
                }
                disabled={followingCounter === 0}
              />
              <ModalScrollableList
                name="followers-modal"
                itemSourceUrl={followersUrl}
                renderItem={(item, i) => renderProfileItemList(item, i)}
                toggleModalElement={
                  <div className="cursor-pointer hover:underline">
                    {formatNumberToDisplay(followersCounter!)}
                    <small className="text-neutral opacity-70">Followers</small>
                  </div>
                }
                disabled={followersCounter === 0}
              />
            </div>
          </div>
          <div className="mt-4 md:mt-0 w-full md:w-1/2 mx-auto text-center">
            <div className="text-neutral opacity-80">
              <p className="">{profileData.bio}</p>
            </div>
            <button
              className={`btn btn-wide mt-4 ${
                user && isUserFollowing ? "btn-error" : "btn-primary"
              }`}
              onClick={async () => await handleFollowClick()}
            >
              {user && isUserFollowing ? "Unfollow" : "Follow"}
            </button>
          </div>
        </div>
      )}
    </section>
  );
};

export default ProfileDetailHead;
