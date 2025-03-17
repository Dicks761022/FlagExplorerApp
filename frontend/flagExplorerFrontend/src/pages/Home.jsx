import React, { useState, useEffect } from 'react';
import CountryGrid from '../components/CountryGrid';
import Header from '../components/Header';

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
      {/* Header component containing the text, search bar, and filter */}
      <Header setSearchFlag={setSearchFlag} setSelectedRegion={setSelectedRegion} />
      
      {/* Pass filtered countries to CountryGrid */}
      <CountryGrid countries={filteredCountries} onCountryClick={onCountryClick} />
    </div>
  );
}

export default Home;
