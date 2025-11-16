import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import AppHeader from '../shared/AppHeader';
import FilterControls from '../components/FilterControls';
import AddItemForm from '../components/AddItemForm';
import ItemsList from '../components/ItemsList';
import ItemsFooter from '../components/ItemsFooter';
import Icon from '../shared/icons/Icon';
import './ShoppingListDetailPage.css';

const ShoppingListDetailPage = ({
  list,
  isOwner,
  currentUserName,
  onRename,
  onArchive,
  onAddItem,
  onToggleItem,
  onEditItem,
  onDeleteItem,
}) => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState('active'); // Default view: only unresolved items
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingTitle, setEditingTitle] = useState(false);
  const [editTitleValue, setEditTitleValue] = useState(list.name);
  const [showArchiveConfirm, setShowArchiveConfirm] = useState(false);

  // Filter items based on filter state and search query
  const filteredItems = useMemo(() => {
    let items = list.items;
    
    // Apply status filter (active/done/all)
    if (filter === 'active') {
      items = items.filter(item => !item.done);
    } else if (filter === 'done') {
      items = items.filter(item => item.done);
    }
    
    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase().trim();
      items = items.filter(item => 
        item.text.toLowerCase().includes(query)
      );
    }
    
    return items;
  }, [list.items, filter, searchQuery]);

  const remaining = list.items.filter(item => !item.done).length;

  const handleRename = () => {
    if (editTitleValue.trim() && editTitleValue !== list.name) {
      onRename && onRename(editTitleValue.trim());
    }
    setEditingTitle(false);
  };

  const handleArchiveConfirm = () => {
    setShowArchiveConfirm(false);
    onArchive && onArchive();
    navigate('/');
  };

  const headerActions = [];
  if (isOwner && onRename) {
    headerActions.push({
      label: 'Edit',
      onClick: () => setEditingTitle(true),
    });
  }
  if (isOwner && onArchive) {
    headerActions.push({
      label: 'Archive',
      onClick: () => setShowArchiveConfirm(true),
    });
  }
  headerActions.push({
    label: 'Settings',
    onClick: () => navigate(`/shopping-lists/${list.id}/settings`),
  });
  headerActions.push({
    label: 'Members',
    onClick: () => navigate(`/shopping-lists/${list.id}/members`),
  });

  return (
    <div className="shopping-list-detail-page">
      <AppHeader
        title={editingTitle ? (
          <input
            type="text"
            value={editTitleValue}
            onChange={(e) => setEditTitleValue(e.target.value)}
            onBlur={handleRename}
            onKeyPress={(e) => e.key === 'Enter' && handleRename()}
            className="editable-title-input"
            autoFocus
          />
        ) : (
          list.name
        )}
        showBack={true}
        onBack={() => navigate('/')}
        showSearch={true}
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
        actions={headerActions}
      />
      
      <div className="detail-actions">
        <button
          className="add-item-button"
          onClick={() => setShowAddForm(!showAddForm)}
        >
          <Icon name="plus" size={18} /> Add Item
        </button>
        <div className="detail-controls-group">
          <FilterControls
            filter={filter}
            onFilterChange={setFilter}
          />
        </div>
      </div>

      {showAddForm && (
        <AddItemForm
          onSubmit={(item) => {
            onAddItem && onAddItem(item);
            setShowAddForm(false);
          }}
          disabled={list.archived}
        />
      )}

      <ItemsList
        sortedItems={filteredItems}
        isOwner={isOwner}
        onToggleItem={(index) => {
          const item = filteredItems[index];
          const originalIndex = list.items.indexOf(item);
          onToggleItem && onToggleItem(originalIndex, currentUserName);
        }}
        onEditItem={(index, patch) => {
          const item = filteredItems[index];
          const originalIndex = list.items.indexOf(item);
          onEditItem && onEditItem(originalIndex, patch);
        }}
        onDeleteItem={(index) => {
          const item = filteredItems[index];
          const originalIndex = list.items.indexOf(item);
          onDeleteItem && onDeleteItem(originalIndex);
        }}
        currentUserName={currentUserName}
      />

      <ItemsFooter
        remaining={remaining}
      />

      {showArchiveConfirm && (
        <div className="modal-overlay" onClick={() => setShowArchiveConfirm(false)}>
          <div className="confirm-modal" onClick={(e) => e.stopPropagation()}>
            <h3>Archive List?</h3>
            <p>Are you sure you want to archive this list? You can restore it later from the archive.</p>
            <div className="modal-actions">
              <button className="archive-confirm-btn" onClick={handleArchiveConfirm}>
                Archive
              </button>
              <button className="cancel-btn" onClick={() => setShowArchiveConfirm(false)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShoppingListDetailPage;

