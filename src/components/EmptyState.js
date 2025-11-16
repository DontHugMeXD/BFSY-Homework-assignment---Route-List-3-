import React from 'react';
import Icon from '../shared/icons/Icon';
import './EmptyState.css';

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <div className="empty-state">
      <p className="empty-message">{message}</p>
      {actionLabel && onAction && (
        <button className="empty-action-button" onClick={onAction}>
          <Icon name="plus" size={18} /> {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;

