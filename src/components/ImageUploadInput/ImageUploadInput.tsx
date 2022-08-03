import React from "react";

type Props = {
  isLoading: boolean;
  onChangeHandler: (value: File | undefined) => void;
};

const ImageUploadInput = ({ isLoading, onChangeHandler }: Props) => {
  const uuid = crypto.randomUUID();

  return (
    <label
      htmlFor={uuid}
      className="relative cursor-pointer bg-base-100 rounded-md font-medium text-neutral text-opacity-50 hover:text-primary focus-within:outline-none"
    >
      <svg
        className="mx-auto h-12 w-12 text-primary opacity-50 hover:text-primary hover:opacity-100 transition-opacity"
        stroke="currentColor"
        fill="none"
        viewBox="0 0 48 48"
        aria-hidden="true"
      >
        <path
          d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <input
        id={uuid}
        type="file"
        accept="image/*"
        className="sr-only"
        disabled={isLoading}
        onChange={(e) => {
          if (e.target.files) {
            const file = e.target.files[0];
            onChangeHandler(file);
          } else {
            onChangeHandler(undefined);
          }
        }}
      />
    </label>
  );
};

export default ImageUploadInput;
