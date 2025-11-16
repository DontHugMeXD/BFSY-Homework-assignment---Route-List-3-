import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import MembersPanel from '../components/MembersPanel';
import './ListMembersPage.css';

const ListMembersPage = ({
  list,
  isOwner,
  currentUserEmail,
  onAddMember,
  onRemoveMember,
  onLeave,
}) => {
  const navigate = useNavigate();
  const { listId } = useParams();
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);

  const handleLeaveClick = () => {
    setShowLeaveConfirm(true);
  };

  const handleLeaveConfirm = () => {
    if (onLeave) {
      onLeave();
    }
    setShowLeaveConfirm(false);
  };

  const handleLeaveCancel = () => {
    setShowLeaveConfirm(false);
  };

  return (
    <div className="list-members-page">
      <AppHeader
        title="Members list"
        showBack={true}
        onBack={() => navigate(`/shopping-lists/${listId}`)}
        showSearch={true}
        actions={[{ iconName: 'user', label: 'Profile', onClick: () => {} }]}
      />
      <MembersPanel
        members={list.members}
        isOwner={isOwner}
        currentUserEmail={currentUserEmail}
        onAddMember={onAddMember}
        onRemoveMember={onRemoveMember}
        onLeave={handleLeaveClick}
      />

      {showLeaveConfirm && (
        <div className="modal-overlay" onClick={handleLeaveCancel}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Leave List?</h3>
            <p>Are you sure you want to leave this shopping list? You will need to be invited again to rejoin.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleLeaveCancel}>
                Cancel
              </button>
              <button className="leave-confirm-btn" onClick={handleLeaveConfirm}>
                Leave
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ListMembersPage;

