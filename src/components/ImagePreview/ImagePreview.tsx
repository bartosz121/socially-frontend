import React from "react";

type Props = {
  imgSrc: string;
  deleteCallback: () => void;
};

const ImagePreview = ({ imgSrc, deleteCallback }: Props) => {
  return (
    <div className="artboard mx-auto" key={crypto.randomUUID()}>
      <img
        className="mt-2 w-40 md:w-80 lg:w-full mx-auto max-h-96 object-contain"
        src={imgSrc}
        alt="image preview"
      />
      <div className="my-2 w-full text-center">
        <button
          onClick={() => deleteCallback()}
          className="btn btn-error btn-wide"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default ImagePreview;
