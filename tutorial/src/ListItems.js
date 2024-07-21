import React from "react";
import SingleItem from "./SingleItem";

const ListItems = ({ list, handleDelete }) => {
  return (
    <ol>
      {list.map((item) => (
        <SingleItem key={item.id} item={item} handleDelete={handleDelete} />
      ))}
    </ol>
  );
};

export default ListItems;
