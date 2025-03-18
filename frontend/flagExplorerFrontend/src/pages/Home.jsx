import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CountryGrid from '../components/CountryGrid';
import Header from '../components/Header';

const API_URL = "http://localhost:8080/countries";

function Home() {
  const [countries, setCountries] = useState([]);
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchFlag, setSearchFlag] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch all countries on mount
  useEffect(() => {
    fetch(API_URL)
      .then(response => {
        if (!response.ok) throw new Error('Failed to fetch countries');
        return response.json();
      })
      .then(data => {
        setCountries(data);
        setFilteredCountries(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
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

      {/* Display errors if fetching fails */}
      {error && <p className="error">Error: {error}</p>}

      {/* Show loading state */}
      {loading ? (
        <p className="loading">Loading countries...</p>
      ) : (
        <CountryGrid countries={filteredCountries} onCountryClick={handleCountryClick} />
      )}
    </div>
  );
}

export default Home;
