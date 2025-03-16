
import React from 'react';
import CountryDetails from '../components/CountryDetails';



function Details({ country }) {
  return (
    <div className="details">
      {/* Render the CountryDetails component and pass the country prop */}
      <CountryDetails country={country} />
    </div>
  );
}

export default Details;
