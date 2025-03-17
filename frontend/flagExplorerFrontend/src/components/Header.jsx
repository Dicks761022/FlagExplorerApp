import React from 'react';
import SearchBar from './SearchBar';
import FilterFlags from './FilterFlags';
import '../components/Header.css'; 

function Header({ setSearchFlag, setSelectedRegion }) {
  return (
    <div className='home-header-container'>
    <div className="home-header">
    <div className="header-text">
      <h1>Welcome to Flag Explorer</h1>
      <p>Discover the world, one flag at a time. Dive into a colorful journey and learn more about countries from every corner of the globe.Whether you're curious about the population, the name, or the flag of a country, our easy-to-use platform lets you search, filter, and explore. Ready to explore?
         Start by searching for a flag or selecting a region, and uncover the fascinating details behind each nation!</p>
      
      <div className="search-filter-container">
        <SearchBar setSearchFlag={setSearchFlag} />
        <FilterFlags onSelect={setSelectedRegion} />
      </div>
    </div>

    <div className='map'></div>
    </div>
    </div>
  );
}

export default Header;
