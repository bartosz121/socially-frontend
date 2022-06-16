import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";

import { toastError } from "../services/toast.service";

type AxiosErrorData = {
  [key: string]: Array<string>;
};

const getAxiosErrorData = (data: AxiosErrorData): string => {
  let result = "Error:";
  for (const key in data) {
    data[key].forEach((msg) => {
      result = result.concat(" ", msg);
    });
  }

  return result;
};

const refreshJWTToken = (failedRequest: Response) => {
  axiosRefreshInstance.post("auth/token/refresh/", {}).catch((error) => {});
  return Promise.resolve();
};

// There must be seperate instance for refreshing, otherwise interceptor loop will occur
const axiosRefreshInstance = axios.create({
  withCredentials: true,
  baseURL: "http://localhost/api/v1/",
  headers: {
    "Content-Type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

export const handleApiResponseError = (error: unknown) => {
  if (axios.isAxiosError(error)) {
    const errors = getAxiosErrorData(error.response?.data as AxiosErrorData);
    toastError(errors);
  } else {
    toastError("Unknown error");
  }
};

// withCredentials: true
export const axiosAuth = axios.create({
  withCredentials: true,
  baseURL: "http://localhost/api/v1/",
  timeout: 5000,
  headers: {
    "Content-type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

export const axiosI = axios.create({
  baseURL: "http://localhost/api/v1/",
  timeout: 5000,
  headers: {
    "Content-type": "application/json; charset=utf-8",
    Accept: "application/json",
  },
});

createAuthRefreshInterceptor(axiosAuth, refreshJWTToken, {
  statusCodes: [401],
  pauseInstanceWhileRefreshing: true,
});

// axiosI.interceptors.request.use(async (request) => {
//   console.log("AXIOSI INTERCEPT");
//   console.log(request);
//   // console.log(`INTERCEPT ROOT.ACCESSTOKEN:${rootStore.authStore.accessToken}`);
//   return request;
// });

// axiosAuth.interceptors.request.use(async (request) => {
//   console.log("AXIOS AUTH INTERCEPT");
//   console.log(request);
//   // console.log(`INTERCEPT ROOT.ACCESSTOKEN:${rootStore.authStore.accessToken}`);
//   return request;
// });
