import React from 'react';
import Icon from '../shared/icons/Icon';
import './ShoppingListCard.css';

const ShoppingListCard = ({ 
  list, 
  isOwner, 
  onOpen, 
  onArchive, 
  onDelete, 
  onLeave 
}) => {
  return (
    <div className="shopping-list-card" onClick={onOpen}>
      <div className="card-header">
        {isOwner && (
          <div className="card-actions">
            {onArchive && (
              <button
                className="card-action-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  onArchive();
                }}
                title="Archive"
              >
                <Icon name="archive" size={18} />
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
        {!isOwner && onLeave && (
          <button
            className="card-action-btn"
            onClick={(e) => {
              e.stopPropagation();
              onLeave();
            }}
            title="Leave"
          >
            <Icon name="door" size={18} />
          </button>
        )}
      </div>
      <div className="card-content">
        <div className="card-icon"><Icon name="shoppingCart" size={32} /></div>
        <h3 className="card-name">{list.name}</h3>
        <div className="card-pills">
          {isOwner ? (
            <span className="role-pill owner-pill">Owner</span>
          ) : (
            <span className="role-pill member-pill">Member</span>
          )}
          {list.isDefault && (
            <span className="role-pill default-pill">Default</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default ShoppingListCard;

