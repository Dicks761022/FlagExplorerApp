
import React from 'react';
import CountryGrid from '../components/CountryGrid';

function Home({countries,onCountryClick}) {

 return (
    <div className="home">
      {/* Pass onCountryClick to CountryGrid */}
      <CountryGrid countries={countries}
       onCountryClick={onCountryClick} />
    </div>
  );
}

export default Home;
