import React from 'react';

function CountryCard({ country, style }) {
  return (
    <div className="country-card" style={style}>
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        className="flag" 
      />
    </div>
  );
}

export default CountryCard;
