import React from "react";
import { Link } from "react-router-dom";
import { BasicProfile } from "../../types/profile.types";

type Props = {
  profileData: BasicProfile;
};

export const renderProfileItemList = (
  profileData: BasicProfile,
  i?: number
) => <ProfileItemList profileData={profileData} key={i} />;

export const ProfileItemList = ({ profileData }: Props) => {
  return (
    <div className="w-full sm:w-1/2 flex items-center justify-center">
      <Link
        to={`/profiles/${profileData.username}`}
        className="w-16 h-16 rounded cursor-pointer"
        reloadDocument={true}
      >
        <img src={profileData.profile_picture} alt="Profile picture" />
      </Link>
      <Link
        to={`/profiles/${profileData.username}`}
        className="w-full mx-1 sm:w-11/12 text-center truncate cursor-pointer hover:underline"
        reloadDocument={true}
      >
        <span>{profileData.username}</span>
      </Link>
    </div>
  );
};
