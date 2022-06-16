import React from "react";

type Props = {};

const Spinner = (props: Props) => {
  return (
    <div className="overflow-hidden">
      <div
        style={{ borderTopColor: "transparent" }}
        className="w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin"
      ></div>
    </div>
  );
};

export default Spinner;
