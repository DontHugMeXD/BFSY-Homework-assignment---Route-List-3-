import React from 'react';
import Icon from './icons/Icon';
import './AppHeader.css';

const AppHeader = ({ 
  title, 
  showBack = false, 
  onBack, 
  showSearch = false,
  searchValue = '',
  onSearchChange,
  actions = [] // Array of { icon, label, onClick }
}) => {
  return (
    <div className="app-header">
      <div className="header-nav">
        {showBack && (
          <button className="back-button" onClick={onBack}>
            <Icon name="back" size={20} />
          </button>
        )}
        <h1 className="header-title">{title}</h1>
        {actions.length > 0 && (
          <div className="header-actions">
            {actions.map((action, idx) => (
              <button
                key={idx}
                className="header-action-btn"
                onClick={action.onClick}
                title={action.label}
              >
                {action.iconName ? <Icon name={action.iconName} size={20} /> : (action.icon || action.label)}
              </button>
            ))}
          </div>
        )}
      </div>
      {showSearch && (
        <div className="search-bar">
          <span className="search-icon"><Icon name="search" size={18} /></span>
          <input
            type="text"
            placeholder="Search"
            value={searchValue}
            onChange={(e) => onSearchChange && onSearchChange(e.target.value)}
            className="search-input"
          />
        </div>
      )}
    </div>
  );
};

export default AppHeader;

