import React from "react";

interface Props {
  name: string;
  toggleModalElement: React.ReactNode;
  children: React.ReactNode;
  disabled?: boolean;
}

const Modal = ({
  name,
  toggleModalElement,
  children,
  disabled = false,
}: Props) => {
  return (
    <>
      <label htmlFor={name}>{toggleModalElement}</label>

      {!disabled && (
        <>
          <input type="checkbox" id={name} className="modal-toggle" />
          <label htmlFor={name} className="modal cursor-pointer">
            <label className="modal-box relative" htmlFor="">
              {children}
            </label>
          </label>
        </>
      )}
    </>
  );
};

export default Modal;
