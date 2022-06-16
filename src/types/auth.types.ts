export interface SignInCredentials {
  email: string;
  password: string;
}

export interface SignUpCredentials {
  email: string;
  password1: string;
  password2: string;
}

export interface User {
  id: string;
  name: string;
}

export interface Error {
  message: string;
}

export interface SignInDataResponse {
  user: UserDataResponse;
  access_token: string;
  refresh_token: string;
}

export interface SignUpDataResponse {
  user: UserDataResponse;
  access_token: string;
  refresh_token: string;
}

export interface UserDataResponse {
  pk: number;
  username: string;
  email: string;
  profile_picture: string;
  is_staff: boolean;
}
