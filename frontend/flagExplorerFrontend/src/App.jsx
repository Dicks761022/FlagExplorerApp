import React, { useEffect, useState } from 'react';
import './App.css';
import Home from './pages/Home';
import Details from './pages/Details';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const API_URL = "http://localhost:8080/countries";

function App() {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCountries();
  }, []);

  const fetchCountries = async () => {
    try {
      const response = await fetch(API_URL);
      if (!response.ok) throw new Error("Failed to fetch countries");
      const data = await response.json();
      setCountries(data);
      setLoading(false);
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  return (
    <Router>
      <div className="app">
        {loading && <p>Loading countries...</p>}
        {error && <p style={{ color: 'red' }}>Error: {error}</p>}

        <Routes>
          {/* Home route to display country grid */}
          <Route
            path="/"
            element={<Home countries={countries} />}
          />
          {/* Details route to show details of a specific country */}
          <Route
            path="/country/:name"
            element={<Details />}
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
