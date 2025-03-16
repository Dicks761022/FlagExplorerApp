import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';

const API_URL = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // State for selected country
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle any errors

  useEffect(() => {
    fetchCountries();
  }, []);

  // Fetch countries data from the API
  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data); // Store fetched countries in state
      setLoading(false); // Update loading state
    } catch (error) {
      setError(error.message); // Handle fetch error
      setLoading(false); // Stop loading in case of error
    }
  };

  // Handle country selection
  const handleCountryClick = (country) => {
    setSelectedCountry(country); // Set the selected country
  };

  return (
    <div className="app">
      {/* Show loading, error, or the content */}
      {loading && <p>Loading countries...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}

      {/* Render Home if no country is selected, otherwise render Details */}
      {!selectedCountry ? (
        <Home countries={countries} onCountryClick={handleCountryClick} />
      ) : (
        <Details country={selectedCountry} />
      )}
    </div>
  );
}

export default App;
