import React, { useEffect, useState } from 'react';
import './App.css';
import CountryGrid from './components/CountryGrid';
import CountryDetails from './components/CountryDetails';
const API_URL = "https://restcountries.com/v3.1/all";

function App() {
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null); // State for selected country

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      console.log(data);
      setCountries(data);
    } catch (error) {
      console.log(error);
    }
  };

  // Handle country selection
  const handleCountryClick = (country) => {
    setSelectedCountry(country); // Set the selected country
  };

  return (
    <div className="app">
      {/* Show country grid */}
      {!selectedCountry ? (
        <CountryGrid countries={countries} onCountryClick={handleCountryClick} />
      ) : (
        // Show country details if a country is selected
        <CountryDetails country={selectedCountry} />
      )}
    </div>
  );
}

export default App;
