import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { axiosI, handleApiResponseError } from "../../api/axios";

import { useAuth } from "../../services/auth.serivce";
import { BasicProfile } from "../../types/profile.types";

import Spinner from "../Spinner/Spinner";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const FollowSuggestions = ({ className, ...props }: Props) => {
  const [suggestions, setSuggestions] = useState<Array<BasicProfile>>([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  const fetchUrl = user
    ? `/profiles/${user.username}/follow-suggestions/`
    : "/profiles/most-followers/";

  useEffect(() => {
    const fetchSuggestions = async () => {
      setLoading(true);
      await axiosI
        .get<Array<BasicProfile>>(fetchUrl)
        .then((res) => {
          setSuggestions(res.data);
        })
        .catch((err) => {
          console.log(err);
          handleApiResponseError(err);
        });
      setLoading(false);
    };

    fetchSuggestions();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner className="mx-auto" />
      ) : (
        <div
          className={`${className} bg-base-300 shadow-xl rounded-lg`}
          {...props}
        >
          <h4 className="font-semibold text-center text-lg md:text-2xl">
            People you might know
          </h4>
          <div className="flex flex-col">
            {suggestions.map((item) => (
              <div className="my-2 w-full flex flex-col items-center">
                <Link to={`/profiles/${item.username}/`}>
                  <img
                    className="w-14 h-14 rounded-xl my-1 cursor-pointer"
                    src={item.profile_picture}
                    alt="Profile picture"
                  />
                </Link>
                <Link to={`/profiles/${item.username}/`}>
                  <p className="cursor-pointer hover:underline">
                    {item.username}
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default FollowSuggestions;
