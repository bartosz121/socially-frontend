import React from "react";
import { Outlet } from "react-router-dom";

type Props = {};

const Auth = (props: Props) => {
  return (
    <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
      <div className="max-w-lg mx-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Auth;
