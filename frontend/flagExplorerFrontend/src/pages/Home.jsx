import React, { useState, useEffect } from 'react';
import CountryGrid from '../components/CountryGrid';
import SearchBar from '../components/SearchBar';
import FilterFlags from '../components/FilterFlags';

const API_URL = "https://restcountries.com/v3.1/all";

function Home({ countries, onCountryClick }) {
  const [searchFlag, setSearchFlag] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [filteredCountries, setFilteredCountries] = useState(countries); // New state for filtered countries

  useEffect(() => {
    filterCountries(); // Apply filtering on component mount and whenever the filter or search changes
  }, [searchFlag, selectedRegion, countries]);

  // Function to filter countries based on search and region
  const filterCountries = () => {
    const updatedCountries = countries?.filter(country => {
      const matchesSearch = country.name.common.toLowerCase().includes(searchFlag.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || country.region === selectedRegion;
      return matchesSearch && matchesRegion;
    }) || [];
    setFilteredCountries(updatedCountries); // Update the filtered countries state
  };

  const getCountryByRegion = async (regionName) => {
    try {
      const response = await fetch(`${API_URL}/region/${regionName}`);
      if (!response.ok) throw new Error("Failed to fetch countries by region");
      const data = await response.json();
      setFilteredCountries(data); // Set the filtered countries based on region
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="home">
        <h1>Welcome to Flag Explorer</h1>
        <p>Discover the world, one flag at a time. Dive into a colorful journey and learn more about countries from every corner of the globe.Whether you're curious about the population, the name, or the flag of a country, our easy-to-use platform lets you search, filter, and explore. Ready to explore? Start by searching for a flag or selecting a region, and uncover the fascinating details behind each nation!</p>
      <SearchBar setSearchFlag={setSearchFlag} />
      <FilterFlags onSelect={setSelectedRegion} />
      {/* Pass filtered countries to CountryGrid */}
      <CountryGrid countries={filteredCountries} onCountryClick={onCountryClick} />
    </div>
  );
}

export default Home;
