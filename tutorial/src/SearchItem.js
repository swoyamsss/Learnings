import React from "react";

const SearchItem = ({searchName,setSearchName}) => {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        id="search"
        type="text"
        role="searchbox"
        placeholder="Search Name"
        value={searchName}
        onChange={(e) => setSearchName(e.target.value)}
      />
    </form>
  );
};

export default SearchItem;
