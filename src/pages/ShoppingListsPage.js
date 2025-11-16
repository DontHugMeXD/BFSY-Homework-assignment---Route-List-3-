import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import Toolbar from '../shared/Toolbar';
import ShoppingListCard from '../components/ShoppingListCard';
import EmptyState from '../components/EmptyState';
import Icon from '../shared/icons/Icon';
import './ShoppingListsPage.css';

const ShoppingListsPage = ({ 
  lists, 
  onCreate, 
  onArchive, 
  onDelete, 
  onLeave,
  currentUserEmail 
}) => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [listFilter, setListFilter] = useState('active'); // 'active', 'all', 'archived'
  const [showLeaveConfirm, setShowLeaveConfirm] = useState(false);
  const [listToLeave, setListToLeave] = useState(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [listToDelete, setListToDelete] = useState(null);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);
  const [listToArchive, setListToArchive] = useState(null);

  // Filter lists based on archive status and user access
  const userLists = lists.filter(list => 
    list.owner === currentUserEmail || 
    list.members.some(m => m.email === currentUserEmail)
  );

  // Apply archive filter
  let filteredByArchive = userLists;
  if (listFilter === 'active') {
    filteredByArchive = userLists.filter(list => !list.archived);
  } else if (listFilter === 'archived') {
    filteredByArchive = userLists.filter(list => list.archived);
  }
  // 'all' shows both active and archived

  // Apply search filter
  const filteredLists = filteredByArchive.filter(list =>
    list.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCreateSubmit = (e) => {
    e.preventDefault();
    if (onCreate && newListName.trim()) {
      const newList = onCreate(newListName.trim());
      if (newList && newList.id) {
        navigate(`/shopping-lists/${newList.id}`);
      }
      setNewListName('');
      setShowCreateModal(false);
    }
  };

  const handleCreateCancel = () => {
    setNewListName('');
    setShowCreateModal(false);
  };

  const handleOpen = (listId) => {
    navigate(`/shopping-lists/${listId}`);
  };

  const handleLeaveClick = (listId) => {
    setListToLeave(listId);
    setShowLeaveConfirm(true);
  };

  const handleLeaveConfirm = () => {
    if (onLeave && listToLeave) {
      onLeave(listToLeave);
      navigate('/');
    }
    setShowLeaveConfirm(false);
    setListToLeave(null);
  };

  const handleLeaveCancel = () => {
    setShowLeaveConfirm(false);
    setListToLeave(null);
  };

  const handleDeleteClick = (listId) => {
    setListToDelete(listId);
    setShowDeleteConfirm(true);
  };

  const handleDeleteConfirm = () => {
    if (onDelete && listToDelete) {
      onDelete(listToDelete);
      navigate('/');
    }
    setShowDeleteConfirm(false);
    setListToDelete(null);
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setListToDelete(null);
  };

  const handleArchiveClick = (listId) => {
    setListToArchive(listId);
    setShowArchiveConfirm(true);
  };

  const handleArchiveConfirm = () => {
    if (onArchive && listToArchive) {
      onArchive(listToArchive);
    }
    setShowArchiveConfirm(false);
    setListToArchive(null);
  };

  const handleArchiveCancel = () => {
    setShowArchiveConfirm(false);
    setListToArchive(null);
  };

  return (
    <div className="shopping-lists-page">
      <AppHeader
        title="Shopping Lists"
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />
      <Toolbar>
        <button className="primary-button" onClick={() => setShowCreateModal(true)}>
          <Icon name="plus" size={18} /> Create New List
        </button>
        <div className="list-filter-controls">
          <label>Filter:</label>
          <div className="filter-tabs">
            <button
              className={`filter-tab ${listFilter === 'active' ? 'active' : ''}`}
              onClick={() => setListFilter('active')}
            >
              Active
            </button>
            <button
              className={`filter-tab ${listFilter === 'all' ? 'active' : ''}`}
              onClick={() => setListFilter('all')}
            >
              All
            </button>
            <button
              className={`filter-tab ${listFilter === 'archived' ? 'active' : ''}`}
              onClick={() => setListFilter('archived')}
            >
              Archived
            </button>
          </div>
        </div>
      </Toolbar>
      {filteredLists.length === 0 ? (
        <EmptyState 
          message={
            listFilter === 'active' 
              ? "You don't have any active shopping lists yet. Tap 'Create New List' to get started."
              : listFilter === 'archived'
              ? "You don't have any archived shopping lists."
              : "You don't have any shopping lists yet. Tap 'Create New List' to get started."
          }
          actionLabel={listFilter === 'active' || listFilter === 'all' ? "Create New List" : undefined}
          onAction={listFilter === 'active' || listFilter === 'all' ? () => setShowCreateModal(true) : undefined}
        />
      ) : (
        <div className="list-grid">
          {filteredLists.map(list => {
            const isOwner = list.owner === currentUserEmail;
            const isMember = !isOwner && list.members.some(m => m.email === currentUserEmail);
            return (
              <ShoppingListCard
                key={list.id}
                list={list}
                isOwner={isOwner}
                onOpen={() => handleOpen(list.id)}
                onArchive={isOwner ? () => handleArchiveClick(list.id) : undefined}
                onDelete={isOwner ? () => handleDeleteClick(list.id) : undefined}
                onLeave={isMember ? () => handleLeaveClick(list.id) : undefined}
              />
            );
          })}
        </div>
      )}

      {showCreateModal && (
        <div className="modal-overlay" onClick={handleCreateCancel}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Create New List</h3>
            <form onSubmit={handleCreateSubmit}>
              <div className="modal-form-group">
                <label>List name</label>
                <input
                  type="text"
                  value={newListName}
                  onChange={(e) => setNewListName(e.target.value)}
                  className="modal-input"
                  placeholder="Enter list name"
                  required
                  autoFocus
                />
              </div>
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={handleCreateCancel}>
                  Cancel
                </button>
                <button type="submit" className="create-confirm-btn">
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

      {showArchiveConfirm && (
        <div className="modal-overlay" onClick={handleArchiveCancel}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Archive List?</h3>
            <p>Are you sure you want to archive this shopping list? You can restore it later from the archive view.</p>
            <div className="modal-actions">
              <button className="cancel-btn" onClick={handleArchiveCancel}>
                Cancel
              </button>
              <button className="archive-confirm-btn" onClick={handleArchiveConfirm}>
                Archive
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListsPage;

