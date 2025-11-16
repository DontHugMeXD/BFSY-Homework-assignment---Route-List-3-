import React, { useState } from 'react';
import AddMemberForm from './AddMemberForm';
import MembersList from './MembersList';
import Icon from '../shared/icons/Icon';
import './MembersPanel.css';

const MembersPanel = ({
  members,
  isOwner,
  currentUserEmail,
  onAddMember,
  onRemoveMember,
  onLeave,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const handleAddMember = (email) => {
    if (onAddMember) {
      onAddMember(email);
      setShowAddForm(false);
    }
  };

  return (
    <div className="members-panel">
      {isOwner && (
        <div className="panel-header">
          <button
            className="add-member-button"
            onClick={() => setShowAddForm(!showAddForm)}
          >
            <Icon name="plus" size={18} /> Add member
          </button>
        </div>
      )}
      {showAddForm && isOwner && (
        <AddMemberForm
          onSubmit={handleAddMember}
          onCancel={() => setShowAddForm(false)}
        />
      )}
      <MembersList
        members={members}
        isOwner={isOwner}
        currentUserEmail={currentUserEmail}
        onRemoveMember={onRemoveMember}
        onLeave={onLeave}
      />
    </div>
  );
};

export default MembersPanel;

