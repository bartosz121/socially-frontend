import { initReactQueryAuth } from "react-query-auth";

import { loginFn, registerFn, logoutFn, loadUser } from "../api/auth";

import {
  SignInCredentials,
  SignUpCredentials,
  Error,
} from "../types/auth.types";
import { IUser } from "../types/user.types";

const authConfig = {
  loadUser,
  loginFn,
  registerFn,
  logoutFn,
  waitInitial: false,
};

export const { AuthProvider, useAuth } = initReactQueryAuth<
  IUser | null,
  Error,
  SignInCredentials,
  SignUpCredentials
>(authConfig);
