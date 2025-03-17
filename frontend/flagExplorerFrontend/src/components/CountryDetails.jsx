import React from 'react';
import './CountryDetails.css';

function CountryDetails({ country }) {
 
// Check if country is properly passed as prop
if (!country) return <div></div>;

  return (
    
<div className="country-details-container">
<h1 className="details-heading">Country Details</h1> {/* Added Heading */}

    <div className="country-details">
      
      <h1 className='heading-country-details'>{country.name}</h1>
      <p><strong>Population:</strong> {country.population.toLocaleString()}</p>
      <p><strong>Capital:</strong> {country.capital }</p>
    
      <img src={country.flag} alt={country.name} className='dflag'/>

    </div>
   </div>
  );
}

export default CountryDetails;