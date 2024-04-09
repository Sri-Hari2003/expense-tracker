import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleChange = (event) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    onSearch(newQuery); // Call the onSearch function with the new query
  };

  return (
    <form className="search-bar-form">
      <input
        className="search-bar-input"
        type="text"
        value={query}
        onChange={handleChange}
        placeholder="Search Transactions.."
      />
    </form>
  );
};

export default SearchBar;
