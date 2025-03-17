import React from 'react';

function FilterFlags({ onSelect }) {
  const regions = [
    { id: 1, name: "Africa" },
    { id: 2, name: "Asia" },
    { id: 3, name: "Europe" },
    { id: 4, name: "North America" },
    { id: 5, name: "South America" },
    { id: 6, name: "Australia" },
    { id: 7, name: "Antarctica" }
  ];

  // Update selectHandler to handle regions
  const selectHandler = (e) => {
    const regionName = e.target.value;
    onSelect(regionName);
  };

  return (
    <select onChange={selectHandler}>
      <option value="all">Filter by region</option>
      {regions.map((region) => (
        <option key={region.id} value={region.name}>
          {region.name}
        </option>
      ))}
    </select>
  );
}

export default FilterFlags;
