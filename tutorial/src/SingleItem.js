import React from "react";
import { FaTrashAlt } from "react-icons/fa";

const SingleItem = ({ item, handleDelete }) => {
  return (
    <li>
      {item.name}
      <FaTrashAlt
        role="button"
        tabIndex="0"
        onClick={() => handleDelete(item.id)}
      />
    </li>
  );
};

export default SingleItem;
