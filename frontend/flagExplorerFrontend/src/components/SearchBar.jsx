import React from 'react';
import "./SearchBar.css";

function SearchBar({ setSearchFlag }) { 
  return (
    <div className='search-bar'>
      <input 
        type='text' 
        placeholder='Search for a country'
        onChange={(e) => setSearchFlag(e.target.value)} 
      />
    </div>
  );
}

export default SearchBar;
