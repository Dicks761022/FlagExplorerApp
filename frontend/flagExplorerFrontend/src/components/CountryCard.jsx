import React from 'react';

function CountryCard({ country, onClick, style }) {
  return (
    <div className="country-card" style={style} onClick={onClick}>
      <img 
        src={country.flag} 
        alt={`Flag of ${country.name}`} 
        className="flag" 
      />
    </div>
  );
}

export default CountryCard;
