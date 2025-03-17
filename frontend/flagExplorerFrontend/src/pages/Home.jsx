import React, { useState } from 'react';
import CountryGrid from '../components/CountryGrid';
import SearchBar from '../components/SearchBar';

function Home({ countries, onCountryClick }) {
  const [searchFlag, setSearchFlag] = useState('');

  const filterCountries = countries?.filter(country => 
    country.name.common.toLowerCase().includes(searchFlag.toLowerCase())
  ) || [];

  console.log(filterCountries, "filterCountries");

  return (
    <div className="home">
      <SearchBar setSearchFlag={setSearchFlag} />
      {/* Pass filtered countries to CountryGrid */}
      <CountryGrid countries={filterCountries} onCountryClick={onCountryClick} />
    </div>
  );
}

export default Home;
