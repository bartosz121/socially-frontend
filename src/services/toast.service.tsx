import React from "react";

import toast from "react-hot-toast";

enum AlertTypes {
  info = "info",
  success = "success",
  warning = "warning",
  error = "error",
}

type CustomToastProps = {
  type: AlertTypes;
  msg: string;
};

const getToastClassName = (type: AlertTypes) => {
  let alertType = null;

  switch (type) {
    case AlertTypes.success:
      alertType = "alert-success";
      break;
    case AlertTypes.error:
      alertType = "alert-error";
      break;
    case AlertTypes.warning:
      alertType = "alert-warning";
      break;
    default:
      alertType = "alert-info";
      break;
  }

  return `alert ${alertType} text-white grow shadow-lg w-full md:max-w-md`;
};

const getToastIcon = (type: AlertTypes) => {
  let path = null;
  switch (type) {
    case AlertTypes.success:
      path = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
      break;
    case AlertTypes.warning:
      path = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      );
      break;
    case AlertTypes.error:
      path = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
        />
      );
      break;
    default:
      path = (
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      );
      break;
  }

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      className="stroke-current flex-shrink-0 w-6 h-6"
    >
      {path}
    </svg>
  );
};

const customToast = ({ type, msg }: CustomToastProps) => {
  const alertIcon = getToastIcon(type);
  const alertClassName = getToastClassName(type);

  toast.custom((t) => (
    <div className={t.visible ? "animate-fadeIn" : "animate-fadeOut"}>
      <div className={alertClassName}>
        {alertIcon}
        <p className="break-words">{msg}</p>
      </div>
    </div>
  ));
};

export const toastInfo = (msg: string) => {
  customToast({ type: AlertTypes.info, msg });
};

export const toastSuccess = (msg: string) => {
  customToast({ type: AlertTypes.success, msg });
};

export const toastWarning = (msg: string) => {
  customToast({ type: AlertTypes.warning, msg });
};

export const toastError = (msg: string) => {
  customToast({ type: AlertTypes.error, msg });
};
