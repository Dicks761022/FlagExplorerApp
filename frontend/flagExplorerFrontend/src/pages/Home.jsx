import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CountryGrid from '../components/CountryGrid';
import Header from '../components/Header';

const API_URL = "http://localhost:8080/countries";

function Home() {
  const [countries, setCountries] = useState([]); // Store all countries
  const [filteredCountries, setFilteredCountries] = useState([]); // Store filtered countries
  const [searchFlag, setSearchFlag] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const navigate = useNavigate(); // React Router's navigate function

  // Fetch all countries on mount
  useEffect(() => {
    fetch(API_URL)
      .then(response => response.json())
      .then(data => {
        setCountries(data);
        setFilteredCountries(data); // Initialize filteredCountries with all data
      })
      .catch(error => console.error("Error fetching countries:", error));
  }, []);

  // Filter countries dynamically when search or region changes
  useEffect(() => {
    if (!countries.length) return;

    const updatedCountries = countries.filter(country => {
      const matchesSearch = country.name.toLowerCase().includes(searchFlag.toLowerCase());
      const matchesRegion = selectedRegion === 'all' || country.region.toLowerCase() === selectedRegion.toLowerCase();
      return matchesSearch && matchesRegion;
    });

    setFilteredCountries(updatedCountries);
  }, [searchFlag, selectedRegion, countries]);

  // Handle country click (navigate to details)
  const handleCountryClick = (country) => {
    navigate(`/country/${encodeURIComponent(country.name)}`);
  };

  return (
    <div className="home">
      {/* Header component with search bar and filter */}
      <Header setSearchFlag={setSearchFlag} setSelectedRegion={setSelectedRegion} />
      
      {/* Display filtered countries */}
      <CountryGrid countries={filteredCountries} onCountryClick={handleCountryClick} />
    </div>
  );
}

export default Home;
