import React from 'react';
import "../styles/LevelFilter.css";

const LevelFilter = ({ levelsList, activeLevel, setActiveLevel }) => {
  return (
    <div className="levels-filter">
      <select
        value={activeLevel}
        onChange={(e) => setActiveLevel(e.target.value)}
        className="levels-filter-select"
      >
        <option value="">Tous les niveaux</option>
        {levelsList?.map((level) => (
          <option key={level} value={level}>{level}</option>
        ))}
      </select>
    </div>
  );
};

export default LevelFilter;
