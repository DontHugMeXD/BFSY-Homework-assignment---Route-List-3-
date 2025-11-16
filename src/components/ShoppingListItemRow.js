import React, { useState } from 'react';
import Icon from '../shared/icons/Icon';
import './ShoppingListItemRow.css';

const ShoppingListItemRow = ({ 
  item, 
  isOwner, 
  onToggle, 
  onEdit, 
  onDelete 
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(item.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit && onEdit({
        text: editText.trim(),
      });
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(item.text);
    setIsEditing(false);
  };

  return (
    <div className={`item-row ${item.done ? 'done' : ''}`}>
      <div className="item-left">
        <input
          type="checkbox"
          checked={item.done}
          onChange={onToggle}
          className="item-checkbox"
        />
        {isEditing ? (
          <div className="item-edit-form">
            <input
              type="text"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              className="edit-input"
              autoFocus
            />
            <button className="edit-save-btn" onClick={handleSave}>
              <Icon name="check" size={18} />
            </button>
            <button className="edit-cancel-btn" onClick={handleCancel}>
              <Icon name="close" size={18} />
            </button>
          </div>
        ) : (
          <div className="item-content">
            <span className="item-text">{item.text}</span>
            {item.done && item.updatedBy && (
              <span className="item-updated">Completed by: {item.updatedBy}</span>
            )}
            {!item.done && item.updatedBy && (
              <span className="item-updated">Updated by: {item.updatedBy}</span>
            )}
          </div>
        )}
      </div>
      <div className="item-actions">
        {!isEditing && (
          <>
            <button
              className="item-action-btn"
              onClick={() => setIsEditing(true)}
              title="Edit"
            >
              <Icon name="edit" size={18} />
            </button>
            {onDelete && (
              <button
                className="item-action-btn"
                onClick={onDelete}
                title="Delete"
              >
                <Icon name="trash" size={18} />
              </button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ShoppingListItemRow;

