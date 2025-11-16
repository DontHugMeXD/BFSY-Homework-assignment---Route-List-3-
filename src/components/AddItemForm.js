import React, { useState } from 'react';
import './AddItemForm.css';

const AddItemForm = ({ onSubmit, disabled = false }) => {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSubmit && onSubmit({
        text: text.trim(),
      });
      setText('');
    }
  };

  const handleCancel = () => {
    setText('');
  };

  if (disabled) {
    return null;
  }

  return (
    <form className="add-item-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Item name:</label>
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          className="form-input"
          placeholder="Enter item name"
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={handleCancel}>
          Cancel
        </button>
        <button type="submit" className="save-btn">
          Save
        </button>
      </div>
    </form>
  );
};

export default AddItemForm;

