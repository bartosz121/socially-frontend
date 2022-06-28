import React, { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";

import { axiosI } from "../../api/axios";

import Spinner from "../Spinner/Spinner";

interface Props {
  itemSourceUrl: string;
  renderItem: (item: any, i?: number) => React.ReactNode;
  endMessage: JSX.Element;
  scrollableTarget?: string;
  className?: string;
}

const ItemList = ({
  itemSourceUrl,
  renderItem,
  endMessage,
  scrollableTarget,
  className,
}: Props) => {
  const [items, setItems] = useState<Array<any>>([]);
  const [itemsCount, setItemsCount] = useState(0);
  const [error, setError] = useState(false);
  const [nextUrl, setNextUrl] = useState(itemSourceUrl);

  useEffect(() => {
    getItems();
  }, []);

  const getItems = async () => {
    setError(false);

    try {
      const result = await axiosI.get<any>(nextUrl);
      setItems([...items, ...result.data.results]);
      setItemsCount(result.data.count);
      setNextUrl(result.data.next);
    } catch (error) {
      // TODO
      setError(true);
    }
  };

  return (
    <InfiniteScroll
      dataLength={items.length}
      next={getItems}
      hasMore={items.length < itemsCount}
      loader={<Spinner />}
      endMessage={endMessage ? endMessage : <hr />}
      scrollableTarget={scrollableTarget}
      scrollThreshold={0.9}
      className={`flex flex-col justify-center items-center ${
        className && className
      }`}
    >
      {items.map((item, i) => renderItem(item, i))}
    </InfiniteScroll>
  );
};

export default ItemList;
