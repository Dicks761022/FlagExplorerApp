import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import CountryDetails from '../components/CountryDetails';

function Details() {
  const { name } = useParams(); // Get country name from URL
  const navigate = useNavigate();
  const [country, setCountry] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const decodedName = decodeURIComponent(name); // Decode URL-encoded name

    console.log(`Fetching details for country: ${decodedName}`);

    setLoading(true);
    fetch(`http://localhost:8080/countries/${decodedName}`) // Use decoded name in API call
      .then((response) => {
        if (!response.ok) {
          throw new Error('Country not found');
        }
        return response.json();
      })
      .then((data) => {
        console.log('Country data received:', data);
        setCountry(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [name]);

  const handleBack = () => {
    navigate(-1); // Navigate back in history
  };

  if (loading) {
    return <div>Loading...</div>; // Show loading message
  }

  if (error) {
    return <div style={{ color: 'red' }}>Error: {error}</div>; // Show error message
  }

  if (!country) {
    return <div>No data found for this country.</div>; // Handle case if country data is missing
  }

  return (
    <div className="details">
      <button
        className="back-button"
        onClick={handleBack}
        aria-label="Back to Countries"
      >
        <i className="fas fa-arrow-left"></i> {/* Arrow icon */}
      </button>
      <CountryDetails country={country} /> {/* Display country details */}
    </div>
  );
}

export default Details;
