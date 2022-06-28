import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

import { useAuth } from "../../services/auth.serivce";

type Props = {};

const Auth = (props: Props) => {
  const { user } = useAuth();
  const navigator = useNavigate();

  if (user) {
    navigator("/", { replace: true });
    return <></>;
  } else {
    return (
      <div className="max-w-screen-xl px-4 py-16 mx-auto sm:px-6 lg:px-8">
        <div className="max-w-lg mx-auto">
          <Outlet />
        </div>
      </div>
    );
  }
};

export default Auth;
