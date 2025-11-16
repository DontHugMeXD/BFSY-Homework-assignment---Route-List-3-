import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import SettingsCard from '../components/SettingsCard';
import './ListSettingsPage.css';

const ListSettingsPage = ({
  list,
  isOwner,
  onRename,
  onSetDefault,
  onSetArchived,
  onDelete,
}) => {
  const navigate = useNavigate();
  const { listId } = useParams();

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      navigate('/');
    }
  };

  return (
    <div className="list-settings-page">
      <AppHeader
        title="Settings"
        showBack={true}
        onBack={() => navigate(`/shopping-lists/${listId}`)}
      />
      <div className="settings-content">
        <SettingsCard
          name={list.name}
          isDefault={list.isDefault}
          archived={list.archived}
          onRename={isOwner ? onRename : undefined}
          onSetDefault={onSetDefault}
          onSetArchived={onSetArchived}
          onDelete={isOwner ? handleDelete : undefined}
        />
      </div>
    </div>
  );
};

export default ListSettingsPage;

