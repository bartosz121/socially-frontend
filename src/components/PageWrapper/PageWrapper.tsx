import React from "react";

type Props = {
  children: React.ReactNode;
};

const PageWrapper = ({ children }: Props) => {
  return (
    <div className="mx-auto mt-4 w-full md:w-1/2 2xl:w-1/4  flex flex-col justify-center items-center">
      {children}
    </div>
  );
};

export default PageWrapper;
