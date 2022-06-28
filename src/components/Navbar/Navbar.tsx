import React from "react";
import { NavLink, Link } from "react-router-dom";

import { useAuth } from "../../services/auth.serivce";

type Props = {};

type styleProps = {
  isActive: boolean;
};

const Navbar = (props: Props) => {
  const { user, logout } = useAuth();

  const style = ({ isActive }: styleProps) =>
    `btn btn-link btn-sm md:btn-md text-primary-content ${
      isActive && "btn-active"
    }`;

  const handleLogoutClick = async (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>
  ) => {
    await logout();
  };

  return (
    <header className="bg-primary">
      <nav className="flex items-center h-16 max-w-screen-xl sm:gap-8 px-4 mx-auto sm:px-6 lg:px-8 text-primary-content">
        <div className="flex-none">
          <NavLink
            to="/"
            className="btn btn-ghost normal-case text-lg sm:text-2xl md:text-3xl"
          >
            Socially
          </NavLink>
        </div>
        <div className="flex items-center justify-end flex-1 md:justify-between">
          <div className="hidden md:block" aria-labelledby="header-navigation">
            <NavLink className={style} to="/">
              Home
            </NavLink>
            <NavLink className={style} to="/explore">
              Explore
            </NavLink>
            <NavLink className={style} to="/search">
              Search
            </NavLink>
          </div>
          <div className="flex items-center gap-4">
            <div className="sm:gap-4 flex items-center">
              <div className="dropdown">
                <label
                  tabIndex={0}
                  className="btn btn-circle btn-ghost btn-sm text-opacity-70 md:hidden hover:opacity-100 transition-opacity"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M4 6h16M4 12h16M4 18h16"
                    />
                  </svg>
                </label>
                <ul
                  tabIndex={0}
                  className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-300 text-neutral rounded-box w-36"
                >
                  <li>
                    <NavLink to="/">Home</NavLink>
                  </li>
                  <li>
                    <NavLink to="/explore">Explore</NavLink>
                  </li>
                  <li>
                    <NavLink to="/search">Search</NavLink>
                  </li>
                </ul>
              </div>
              {user ? (
                <>
                  <div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle">
                      <button className="btn btn-ghost btn-circle">
                        <div className="indicator">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
                            />
                          </svg>
                          <span className="badge badge-xs badge-primary indicator-item"></span>
                        </div>
                      </button>
                    </label>
                    <div
                      tabIndex={0}
                      className="mt-3 card card-compact dropdown-content w-52 bg-base-100 shadow"
                    >
                      <div className="card-body text-neutral">
                        <span className="font-bold text-lg">8 Items</span>
                        <span className="text-info">Subtotal: $999</span>
                        <div className="card-actions">
                          <button className="btn btn-primary btn-block">
                            View cart
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="dropdown dropdown-end">
                    <label
                      tabIndex={0}
                      className="btn btn-ghost btn-circle avatar"
                    >
                      <div className="w-10 rounded-full">
                        <img src={user.picture} alt="Profile picture" />
                      </div>
                    </label>
                    <ul
                      tabIndex={0}
                      className="menu menu-compact dropdown-content mt-3 p-2 shadow-lg bg-base-300 text-neutral rounded-box w-52"
                    >
                      <li>
                        <Link
                          to={`/profiles/${user.username}`}
                          reloadDocument={true}
                        >
                          Profile
                        </Link>
                      </li>
                      <li>
                        <Link to="/user/settings">Settings</Link>
                      </li>
                      <li>
                        <span onClick={async (e) => await handleLogoutClick(e)}>
                          Logout
                        </span>
                      </li>
                    </ul>
                  </div>
                </>
              ) : (
                <div className="flex items-center">
                  <NavLink
                    className="btn btn-ghost btn-xs sm:btn-sm md:btn-md"
                    to="/auth/signin"
                  >
                    Sign in
                  </NavLink>
                  <NavLink
                    className="btn btn-ghost btn-xs sm:btn-sm md:btn-md"
                    to="/auth/signup"
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
