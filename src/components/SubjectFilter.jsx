import React from 'react';
import "../styles/SubjectFilter.css";

const SubjectFilter = ({ subjectsList, activeSubject, setActiveSubject }) => {
  return (
    <div className="subjects-filter">
      <select
        value={activeSubject}
        onChange={(e) => setActiveSubject(e.target.value)}
        className="subjects-filter-select"
      >
        <option value="">Tous les sujets</option>
        {subjectsList?.map((subject) => (
          <option key={subject} value={subject}>{subject}</option>
        ))}
      </select>
    </div>
  );
};

export default SubjectFilter;
