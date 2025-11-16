import React, { useState } from 'react';
import './AddMemberForm.css';

const AddMemberForm = ({ onSubmit, onCancel }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim()) {
      onSubmit && onSubmit(email.trim());
      setEmail('');
    }
  };

  return (
    <form className="add-member-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>User email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="form-input"
          placeholder="Enter email"
          required
        />
      </div>
      <div className="form-actions">
        <button type="button" className="cancel-btn" onClick={onCancel}>
          Cancel
        </button>
        <button type="submit" className="add-btn">
          Add
        </button>
      </div>
    </form>
  );
};

export default AddMemberForm;

