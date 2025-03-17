import React from 'react';
import './CountryDetails.css';

function CountryDetails({ country }) {
 
// Check if country is properly passed as prop
if (!country) return <div>No country data available</div>;

  return (
    
<div className="country-details-container">
    <div className="country-details">
    <img src={country.flag} alt={country.name} className='dflag'/>
      <h2>{country.name}</h2>
      <p><strong>Capital:</strong> {country.capital }</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
    </div>
   </div>
  );
}

export default CountryDetails;
