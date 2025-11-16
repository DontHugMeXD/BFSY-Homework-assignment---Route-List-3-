import React from 'react';
import Icon from '../shared/icons/Icon';
import './MemberRow.css';

const MemberRow = ({
  member,
  isCurrentUser,
  isOwner,
  onRemove,
  onLeave,
}) => {
  return (
    <div className="member-row">
      <div className="member-left">
        <div className="member-avatar"><Icon name="user" size={20} /></div>
        <div className="member-info">
          <span className="member-name">{member.name}</span>
          {isCurrentUser && <span className="role-pill me-pill">Me</span>}
          {member.role === 'owner' ? (
            <span className="role-pill owner-pill">Owner</span>
          ) : (
            <span className="role-pill member-pill">Member</span>
          )}
        </div>
      </div>
      <div className="member-actions">
        {isCurrentUser ? (
          member.role !== 'owner' && onLeave && (
            <button className="member-action-btn" onClick={onLeave} title="Leave">
              <Icon name="door" size={18} />
            </button>
          )
        ) : (
          isOwner && onRemove && (
            <button className="member-action-btn" onClick={onRemove} title="Remove">
              <Icon name="trash" size={18} />
            </button>
          )
        )}
      </div>
    </div>
  );
};

export default MemberRow;

