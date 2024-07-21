import React from "react";
import { FaPlus } from "react-icons/fa";

const AddItem = ({ newName, setNewName, handleSubmit }) => {
  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="New name"
        required
        value={newName}
        onChange={(e) => setNewName(e.target.value)}
      />
      <button type="submit">
        <FaPlus />
      </button>
    </form>
  );
};

export default AddItem;
