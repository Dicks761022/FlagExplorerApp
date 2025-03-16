import React from 'react';

function CountryCard({ country, onClick, style }) {
  return (
    <div className="country-card" style={style} onClick={onClick}>
      <img 
        src={country.flags.svg} 
        alt={`Flag of ${country.name.common}`} 
        className="flag" 
      />
    </div>
  );
}

export default CountryCard;
