import React, { useState } from "react";
import { useNavigate } from "react-router";

import Spinner from "../Spinner/Spinner";
import { toastSuccess } from "../../services/toast.service";
import { axiosI, handleApiResponseError } from "../../api/axios";

type Props = {};

const SettingsPasswordTab = (props: Props) => {
  const [passwordsShown, setPasswordsShown] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [password1, setPassword1] = useState("");
  const [password2, setPassword2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      old_password: currentPassword,
      new_password1: password1,
      new_password2: password2,
    };

    await axiosI
      .post("/auth/password/change/", data)
      .then((res) => {
        toastSuccess("Password changed!");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        handleApiResponseError(err);
      })
      .finally(() => setLoading(false));
  };

  const togglePasswordsShown = () => {
    setPasswordsShown((state) => !state);
  };

  return (
    <section className="relative md:w-96">
      {loading && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-10">
          <Spinner />
        </div>
      )}
      <div className={`${loading && "opacity-50"}`}>
        <form
          onSubmit={async (e) => await handleSubmit(e)}
          className="p-8 mt-6 mb-0 space-y-4 rounded-lg shadow-2xl"
        >
          <h1 className="text-2xl font-bold text-center text-primary sm:text-3xl">
            Change Password
          </h1>
          <div className="form-control">
            <label htmlFor="oldPassword" className="label font-semibold">
              <span className="label-text">Current Password</span>
            </label>

            <div className="relative mt-1">
              <input
                type={passwordsShown ? "text" : "password"}
                id="oldPassword"
                className="tracking-wide w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Current password"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />

              <span
                onClick={() => togglePasswordsShown()}
                className="absolute inset-y-0 inline-flex items-center right-4 opacity-60 transition-opacity hover:opacity-100 hover:cursor-pointer"
              >
                <label className="swap swap-active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "off" : "on"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "on" : "off"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                  </svg>
                </label>
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password1" className="label font-semibold">
              <span className="label-text">Password</span>
            </label>

            <div className="relative mt-1">
              <input
                type={passwordsShown ? "text" : "password"}
                id="password1"
                className="tracking-wide w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Enter password"
                value={password1}
                onChange={(e) => setPassword1(e.target.value)}
              />

              <span
                onClick={() => togglePasswordsShown()}
                className="absolute inset-y-0 inline-flex items-center right-4 opacity-60 transition-opacity hover:opacity-100 hover:cursor-pointer"
              >
                <label className="swap swap-active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "off" : "on"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "on" : "off"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                  </svg>
                </label>
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="password2" className="label font-semibold">
              <span className="label-text">Confirm password</span>
            </label>

            <div className="relative mt-1">
              <input
                type={passwordsShown ? "text" : "password"}
                id="password2"
                className="tracking-wide w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Confirm password"
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
              />

              <span
                onClick={() => togglePasswordsShown()}
                className="absolute inset-y-0 inline-flex items-center right-4 opacity-60 transition-opacity hover:opacity-100 hover:cursor-pointer"
              >
                <label className="swap swap-active">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "off" : "on"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="12" cy="12" r="2" />
                    <path d="M22 12c-2.667 4.667 -6 7 -10 7s-7.333 -2.333 -10 -7c2.667 -4.667 6 -7 10 -7s7.333 2.333 10 7" />
                  </svg>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className={`swap-${
                      passwordsShown ? "on" : "off"
                    } w-6 h-6 text-neutral`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                  >
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <line x1="3" y1="3" x2="21" y2="21" />
                    <path d="M10.584 10.587a2 2 0 0 0 2.828 2.83" />
                    <path d="M9.363 5.365a9.466 9.466 0 0 1 2.637 -.365c4 0 7.333 2.333 10 7c-.778 1.361 -1.612 2.524 -2.503 3.488m-2.14 1.861c-1.631 1.1 -3.415 1.651 -5.357 1.651c-4 0 -7.333 -2.333 -10 -7c1.369 -2.395 2.913 -4.175 4.632 -5.341" />
                  </svg>
                </label>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary block w-full px-5 py-3 ${
              (loading ||
                currentPassword === "" ||
                password1 === "" ||
                password2 === "") &&
              "btn-disabled"
            }`}
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default SettingsPasswordTab;
