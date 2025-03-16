import React from 'react';

function CountryDetails({ country }) {
 

  return (
    <div className="country-details">
      <h2>{country.name.common}</h2>
      <p><strong>Capital:</strong> {country.capital ? capital[0] : 'N/A'}</p>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
     
    </div>
  );
}

export default CountryDetails;
