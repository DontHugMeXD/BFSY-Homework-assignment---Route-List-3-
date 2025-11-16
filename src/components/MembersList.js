import React from 'react';
import MemberRow from './MemberRow';
import './MembersList.css';

const MembersList = ({
  members,
  isOwner,
  currentUserEmail,
  onRemoveMember,
  onLeave,
}) => {
  return (
    <div className="members-list">
      {members.length === 0 ? (
        <div className="empty-members">No members</div>
      ) : (
        members.map((member) => (
          <MemberRow
            key={member.id}
            member={member}
            isCurrentUser={member.email === currentUserEmail}
            isOwner={isOwner}
            onRemove={() => onRemoveMember && onRemoveMember(member.id)}
            onLeave={() => onLeave && onLeave()}
          />
        ))
      )}
    </div>
  );
};

export default MembersList;

