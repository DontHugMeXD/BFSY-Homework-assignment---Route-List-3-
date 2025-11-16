import React from 'react';
import Icon from '../shared/icons/Icon';
import './ArchivedListCard.css';

const ArchivedListCard = ({ list, isOwner, onRestore, onDelete, onOpen }) => {
  return (
    <div className="archived-list-card" onClick={onOpen}>
      <div className="card-header">
        <div className="card-icon"><Icon name="archive" size={32} /></div>
        {isOwner && (
          <div className="card-actions">
            {onRestore && (
              <button
                className="card-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onRestore();
                }}
                title="Restore"
              >
                <Icon name="restore" size={18} />
              </button>
            )}
            {onDelete && (
              <button
                className="card-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete();
                }}
                title="Delete"
              >
                <Icon name="trash" size={18} />
              </button>
            )}
          </div>
        )}
      </div>
      <div className="card-content">
        <h3 className="card-name">{list.name} (Archived)</h3>
      </div>
    </div>
  );
};

export default ArchivedListCard;

