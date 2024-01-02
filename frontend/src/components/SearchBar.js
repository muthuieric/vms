// SearchBar.js
import React from 'react';

const SearchBar = ({ searchTerm, onSearchChange }) => {
  return (
    <div>
      <input
        id="search"
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full mt-2 px-3 py-2 rounded-md border border-gray focus:outline-none "
      />
    </div>
  );
};

export default SearchBar;
