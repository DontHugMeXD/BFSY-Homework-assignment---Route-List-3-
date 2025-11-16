import React, { useState } from 'react';
import './SettingsCard.css';

const SettingsCard = ({
  name,
  isDefault,
  archived,
  onRename,
  onSetDefault,
  onSetArchived,
  onDelete,
}) => {
  const [editName, setEditName] = useState(name);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleRename = () => {
    if (editName.trim() && editName !== name && onRename) {
      onRename(editName.trim());
    } else {
      setEditName(name);
    }
  };

  const handleDelete = () => {
    if (onDelete) {
      setShowDeleteConfirm(false);
      onDelete();
    }
  };

  return (
    <div className="settings-card">
      <div className="rename-section">
        <label>Name</label>
        <input
          type="text"
          value={editName}
          onChange={(e) => setEditName(e.target.value)}
          onBlur={handleRename}
          onKeyPress={(e) => e.key === 'Enter' && handleRename()}
          className="settings-input"
          placeholder="List Name"
          disabled={!onRename}
        />
      </div>

      <div className="toggle-section">
        <label>Set as default</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isDefault}
            onChange={(e) => onSetDefault && onSetDefault(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>

      <div className="toggle-section">
        <label>Active / Archived</label>
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={archived}
            onChange={(e) => onSetArchived && onSetArchived(e.target.checked)}
          />
          <span className="slider"></span>
        </label>
      </div>

      {onDelete && (
        <div className="danger-zone">
          <button
            className="delete-button"
            onClick={() => setShowDeleteConfirm(true)}
          >
            Delete
          </button>
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={() => setShowDeleteConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete List?</h3>
            <p>Are you sure you want to delete this list? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="delete-confirm-btn" onClick={handleDelete}>
                Delete
              </button>
              <button className="cancel-btn" onClick={() => setShowDeleteConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SettingsCard;

