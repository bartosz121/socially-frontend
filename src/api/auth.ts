import { axiosAuth } from "./axios";

import { SIGNUP_URL, SIGNIN_URL, SIGNOUT_URL, GETME_URL } from "./urls.auth";
import { IUser } from "../types/user.types";
import {
  SignInCredentials,
  SignUpCredentials,
  Error,
  SignInDataResponse,
  UserDataResponse,
  SignUpDataResponse,
  User,
} from "../types/auth.types";

const handleUserDataReponse = (userData: UserDataResponse) => {
  const user: IUser = {
    id: userData.pk,
    username: userData.username,
    email: userData.email,
    picture: userData.profile_picture,
    isStaff: userData.is_staff,
  };

  return user;
};

const handleSignInResponse = ({
  user: userData,
}: SignInDataResponse): IUser => {
  const user = handleUserDataReponse(userData);

  return user;
};

const axiosSignIn = async (
  data: SignInCredentials
): Promise<SignInDataResponse> => {
  return await axiosAuth
    .post<SignInDataResponse>(SIGNIN_URL, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

const axiosSignUp = async (
  data: SignUpCredentials
): Promise<SignUpDataResponse> => {
  return await axiosAuth
    .post(SIGNUP_URL, data)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

const getUser = async (): Promise<UserDataResponse | null> => {
  return await axiosAuth
    .get(GETME_URL)
    .then((response) => response.data)
    .catch((error) => null);
};

// react-query-auth
export const loginFn = async (data: SignInCredentials) => {
  const response = await axiosSignIn(data);
  const user = handleSignInResponse(response);
  return user;
};

export const registerFn = async (data: SignUpCredentials) => {
  const response = await axiosSignUp(data);
  const user = handleSignInResponse(response);
  return user;
};

export const logoutFn = async () => {
  await axiosAuth
    .post(SIGNOUT_URL)
    .then((response) => response.data)
    .catch((error) => Promise.reject(error));
};

export const loadUser = async () => {
  let user = null;
  const userData = await getUser();
  if (userData !== null) {
    user = handleUserDataReponse(userData);
  }

  return user;
};
