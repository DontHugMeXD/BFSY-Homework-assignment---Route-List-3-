import React from 'react';
import './FilterControls.css';

const FilterControls = ({ filter, onFilterChange }) => {
  return (
    <div className="filter-controls">
      <label>Filter:</label>
      <div className="filter-tabs">
        <button
          className={`filter-tab ${filter === 'all' ? 'active' : ''}`}
          onClick={() => onFilterChange && onFilterChange('all')}
        >
          All
        </button>
        <button
          className={`filter-tab ${filter === 'active' ? 'active' : ''}`}
          onClick={() => onFilterChange && onFilterChange('active')}
        >
          Active
        </button>
        <button
          className={`filter-tab ${filter === 'done' ? 'active' : ''}`}
          onClick={() => onFilterChange && onFilterChange('done')}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default FilterControls;

