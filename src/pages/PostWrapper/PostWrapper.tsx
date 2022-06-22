import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const PostWrapper = (props: Props) => {
  return (
    <div className="w-full flex justify-center">
      <Outlet />
    </div>
  );
};

export default PostWrapper;
