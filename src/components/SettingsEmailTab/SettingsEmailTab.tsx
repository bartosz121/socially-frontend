import React, { useState } from "react";
import { useNavigate } from "react-router";

import { axiosI, handleApiResponseError } from "../../api/axios";
import { toastSuccess } from "../../services/toast.service";

import Spinner from "../Spinner/Spinner";

type Props = {
  userEmail: string;
};

const SettingsEmailTab = ({ userEmail }: Props) => {
  const [loading, setLoading] = useState(false);
  const [email1, setEmail1] = useState("");
  const [email2, setEmail2] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const data = {
      old_email: userEmail,
      new_email1: email1,
      new_email2: email2,
    };

    await axiosI
      .put("/accounts/email/change/", data)
      .then((res) => {
        toastSuccess("Email changed!");
        console.log(res);
        navigate("/");
      })
      .catch((err) => {
        console.error(err);
        handleApiResponseError(err);
      })
      .finally(() => {
        setLoading(false);
      });
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
            Change Email
          </h1>
          <div className="form-control">
            <label htmlFor="email" className="label font-semibold">
              <span className="label-text">Current Email</span>
            </label>

            <div className="relative mt-1">
              <input
                id="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                value={userEmail}
                disabled
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-neutral text-opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label font-semibold">
              <span className="label-text">New Email</span>
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Enter email"
                autoComplete="off"
                value={email1}
                onChange={(e) => setEmail1(e.target.value)}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-neutral text-opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <div className="form-control">
            <label htmlFor="email" className="label font-semibold">
              <span className="label-text">Confirm Email</span>
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Confirm email"
                autoComplete="off"
                value={email2}
                onChange={(e) => setEmail2(e.target.value)}
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5 text-neutral text-opacity-60"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  />
                </svg>
              </span>
            </div>
          </div>

          <button
            type="submit"
            className={`btn btn-primary block w-full px-5 py-3 ${
              (loading || email1 === "" || email2 === "") && "btn-disabled"
            }`}
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default SettingsEmailTab;
