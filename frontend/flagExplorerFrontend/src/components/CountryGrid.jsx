import React from 'react';
import './CountryGrid.css';
import CountryCard from './CountryCard';

function CountryGrid({ countries, onCountryClick }) {
  return (
    <div className="country-grid">
      {countries.map((country, index) => (
        <div key={country.cca3} onClick={() => onCountryClick(country)}>
          <CountryCard 
            country={country}
            style={{ animationDelay: `${index * 0.1}s` }}
          />
        </div>
      ))}
    </div>
  );
}

export default CountryGrid;
