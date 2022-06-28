import React from "react";

import Modal from "../Modal/Modal";
import ItemList from "../ItemList/ItemList";

type Props = {
  name: string;
  toggleModalElement: React.ReactNode;
  itemSourceUrl: string;
  renderItem: (item: any, i?: number) => React.ReactNode;
  disabled?: boolean;
};

const ModalScrollableList = ({
  name,
  toggleModalElement,
  disabled,
  ...props
}: Props) => {
  const randomId = crypto.randomUUID();

  return (
    <Modal
      name={name}
      toggleModalElement={toggleModalElement}
      disabled={disabled}
    >
      <div id={randomId} className="overflow-auto max-h-96">
        <ItemList
          endMessage={<hr />}
          className="gap-2"
          scrollableTarget={randomId}
          {...props}
        />
      </div>
    </Modal>
  );
};

export default ModalScrollableList;
