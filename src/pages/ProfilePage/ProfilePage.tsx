import React, { useState, useEffect } from "react";
import { useParams } from "react-router";

import { renderPost } from "../../components/Post/Post";
import ItemList from "../../components/ItemList/ItemList";
import ProfileDetailHead from "../../components/ProfilePageHead/ProfilePageHead";

type Props = {};

const ProfilePage = (props: Props) => {
  const { username } = useParams();
  return (
    <div className="mt-4 w-full flex flex-col justify-center items-center">
      <ProfileDetailHead username={username!} />
      <div className="w-full mt-4">
        <ItemList
          itemSourceUrl={`/users/${username}/posts/`}
          endMessage={<hr />}
          renderItem={(item, i) => renderPost(item, i)}
          className="gap-8"
        />
      </div>
    </div>
  );
};

export default ProfilePage;
