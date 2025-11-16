import React from 'react';
import './SortControls.css';

const SortControls = ({ value, onChange }) => {
  return (
    <div className="sort-controls">
      <label>Sort by:</label>
      <select 
        value={value} 
        onChange={(e) => onChange && onChange(e.target.value)}
        className="sort-select"
      >
        <option value="active">Active</option>
        <option value="done">Done</option>
      </select>
    </div>
  );
};

export default SortControls;

