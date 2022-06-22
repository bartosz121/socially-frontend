import React from "react";

interface Props extends React.HTMLAttributes<HTMLDivElement> {}

const Spinner = ({ className, ...props }: Props) => {
  return (
    <div className="overflow-hidden">
      <div
        style={{ borderTopColor: "transparent" }}
        className={`w-16 h-16 border-4 border-primary border-solid rounded-full animate-spin ${className}`}
        {...props}
      ></div>
    </div>
  );
};

export default Spinner;
