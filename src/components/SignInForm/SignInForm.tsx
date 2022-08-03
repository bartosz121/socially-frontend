import React, { useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";

import { toastSuccess } from "../../services/toast.service";
import { useAuth } from "../../services/auth.serivce";

import Spinner from "../Spinner/Spinner";

import { handleApiResponseError } from "../../api/axios";

type Props = {};

const SignInForm = (props: Props) => {
  const [passwordShown, setPasswordShown] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const navigator = useNavigate();
  const location = useLocation();

  const { login } = useAuth();

  const togglePasswordShown = () => {
    setPasswordShown((state) => !state);
  };

  // @ts-ignore
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      await login({ email, password });
      toastSuccess("You are now logged in");
      navigator(from, { replace: true });
    } catch (error: unknown) {
      console.error(error);
      handleApiResponseError(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="relative">
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
            Sign In
          </h1>
          <div className="form-control">
            <label htmlFor="email" className="label font-semibold">
              <span className="label-text">Email</span>
            </label>

            <div className="relative mt-1">
              <input
                type="email"
                id="email"
                className="w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Enter email"
                autoComplete="off"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
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
            <label htmlFor="password" className="label font-semibold">
              <span className="label-text">Password</span>
            </label>

            <div className="relative mt-1">
              <input
                type={passwordShown ? "text" : "password"}
                id="password"
                className="tracking-wide w-full p-4 pr-12 text-sm rounded-lg shadow-sm input input-bordered input-accent outline-accent-focus"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />

              <span className="absolute inset-y-0 inline-flex items-center right-4 opacity-60 transition-opacity hover:opacity-100 hover:cursor-pointer">
                <label className="swap swap-rotate">
                  <input
                    type="checkbox"
                    className="invisible"
                    onClick={() => togglePasswordShown()}
                  />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="swap-off w-6 h-6 text-neutral"
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
                    className="swap-on w-6 h-6 text-neutral"
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
              (loading || email === "" || password === "") && "btn-disabled"
            }`}
          >
            Sign in
          </button>

          <p className="text-sm text-center text-neutral text-opacity-80">
            No account?
            <Link
              to="../signup"
              state={{ from: from }}
              className="underline mx-2"
            >
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </section>
  );
};

export default SignInForm;
