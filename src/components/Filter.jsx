import React from 'react';
import "../styles/Filter.css";

const Filter = ({ filtersList, activeFilter, setActiveFilter, name }) => {
  return (
    <div className="filter">
      <select
        value={activeFilter}
        onChange={(e) => setActiveFilter(e.target.value)}
        className="levels-filter-select"
      >
        <option value="">Tous les {name}</option>
        {filtersList?.map((filter) => (
          <option key={filter} value={filter}>{filter}</option>
        ))}
      </select>
    </div>
  );
};

export default Filter;
