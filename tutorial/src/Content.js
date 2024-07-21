import React from "react";
import ListItems from "./ListItems";
const Content = ({ list, handleDelete }) => {
  return (
    <div>
      {list.length ? (
        <ListItems list={list} handleDelete={handleDelete} />
      ) : (
        <p>List is empty</p>
      )}
    </div>
  );
};

export default Content;
