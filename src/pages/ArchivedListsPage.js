import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import Toolbar from '../shared/Toolbar';
import ArchivedListCard from '../components/ArchivedListCard';
import Icon from '../shared/icons/Icon';
import './ArchivedListsPage.css';

const ArchivedListsPage = ({
  lists,
  currentUserEmail,
  onRestore,
  onDelete,
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);

  const archivedLists = lists.filter(list => list.archived);
  const filteredLists = archivedLists.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleOpen = (listId) => {
    navigate(`/shopping-lists/${listId}`);
  };

  const handleDeleteClick = (listId) => {
    setListToDelete(listId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete && listToDelete) {
      onDelete(listToDelete);
    }
    setShowDeleteConfirm(false);
    setListToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setListToDelete(null);
  };

  return (
    <div className="archived-lists-page">
      <AppHeader
        title="Shopping Lists"
        showBack={true}
        onBack={() => navigate('/')}
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Toolbar>
        <button
          className="back-to-active-btn"
          onClick={() => navigate('/')}
        >
          <Icon name="back" size={18} /> Back to Active
        </button>
      </Toolbar>
      {filteredLists.length === 0 ? (
        <div className="empty-archive">
          <div className="empty-icon"><Icon name="archive" size={64} /></div>
          <p>No archived lists</p>
        </div>
      ) : (
        <div className="archived-grid">
          {filteredLists.map(list => {
            const isOwner = list.owner === currentUserEmail;
            return (
              <ArchivedListCard
                key={list.id}
                list={list}
                isOwner={isOwner}
                onRestore={isOwner ? () => onRestore && onRestore(list.id) : undefined}
                onDelete={isOwner ? () => handleDeleteClick(list.id) : undefined}
                onOpen={() => handleOpen(list.id)}
              />
            );
          })}
        </div>
      )}

      {showDeleteConfirm && (
        <div className="modal-overlay" onClick={handleDeleteCancel}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Delete List?</h3>
            <p>Are you sure you want to delete this shopping list? This action cannot be undone.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleDeleteCancel}>
                Cancel
              </button>
              <button className="delete-confirm-btn" onClick={handleDeleteConfirm}>
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchivedListsPage;

