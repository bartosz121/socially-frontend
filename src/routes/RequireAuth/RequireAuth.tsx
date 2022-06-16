import React from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../services/auth.serivce";

type Props = {
  children: JSX.Element;
};

const RequireAuth = ({ children }: Props) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    return <Navigate to="/auth/signin" state={{ from: location }} replace />;
  }
  return children;
};

export default RequireAuth;
