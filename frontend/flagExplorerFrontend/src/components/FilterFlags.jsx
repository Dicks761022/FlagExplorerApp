import React, { useState } from 'react';
import PropTypes from 'prop-types';
import "../components/Header.css";

function FilterFlags({ onSelect }) {
  const regions = [
    { id: 1, name: "Africa" },
    { id: 2, name: "Asia" },
    { id: 3, name: "Europe" },
    { id: 4, name: "North America" },
    { id: 5, name: "South America" },
  ];

  const [selectedRegion, setSelectedRegion] = useState("all");

  // Update selectHandler to handle regions
  const selectHandler = (e) => {
    const regionName = e.target.value;
    setSelectedRegion(regionName); // Updating internal state
    onSelect(regionName); // Passing selected region to the parent
  };

  return (
    <select
      className="filter"
      data-testid="region-select"
      value={selectedRegion}
      onChange={selectHandler}
    >
      <option value="all">Filter by region</option> {/* Default value */}
      {regions.map((region) => (
        <option key={region.id} value={region.name}>
          {region.name}
        </option>
      ))}
    </select>
  );
}

// Prop validation
FilterFlags.propTypes = {
  onSelect: PropTypes.func.isRequired,
};

export default FilterFlags;
