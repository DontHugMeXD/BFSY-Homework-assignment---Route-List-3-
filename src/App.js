import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, useParams, useNavigate } from 'react-router-dom';
import { INITIAL_LISTS, CURRENT_USER } from './data';
import ShoppingListsPage from './pages/ShoppingListsPage';
import ShoppingListDetailPage from './pages/ShoppingListDetailPage';
import ListSettingsPage from './pages/ListSettingsPage';
import ListMembersPage from './pages/ListMembersPage';
import ArchivedListsPage from './pages/ArchivedListsPage';
import './App.css';

function App() {
  const [lists, setLists] = useState(INITIAL_LISTS);

  // Helper function to get a list by ID
  const getListById = (listId) => {
    return lists.find(list => list.id === listId);
  };

  // Helper function to check if user is owner
  const isOwner = (list) => {
    return list && list.owner === CURRENT_USER.email;
  };

  // List management functions
  const handleCreateList = (listName = 'New Shopping List') => {
    const newList = {
      id: Date.now().toString(),
      name: listName,
      owner: CURRENT_USER.email,
      members: [{ 
        id: Date.now().toString(), 
        name: CURRENT_USER.name, 
        email: CURRENT_USER.email, 
        role: 'owner' 
      }],
      items: [],
      archived: false,
      isDefault: false,
    };
    setLists([...lists, newList]);
    return newList;
  };

  const handleRenameList = (listId, newName) => {
    setLists(lists.map(list =>
      list.id === listId ? { ...list, name: newName } : list
    ));
  };

  const handleArchiveList = (listId) => {
    setLists(lists.map(list =>
      list.id === listId ? { ...list, archived: !list.archived } : list
    ));
  };

  const handleDeleteList = (listId) => {
    setLists(lists.filter(list => list.id !== listId));
  };

  const handleAddMember = (listId, email) => {
    const newMember = {
      id: Date.now().toString(),
      name: email.split('@')[0],
      email: email,
      role: 'member',
    };
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, members: [...list.members, newMember] }
        : list
    ));
  };

  const handleRemoveMember = (listId, memberId) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, members: list.members.filter(m => m.id !== memberId) }
        : list
    ));
  };

  const handleLeaveList = (listId) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, members: list.members.filter(m => m.email !== CURRENT_USER.email) }
        : list
    ));
  };

  const handleSetDefault = (listId, isDefault) => {
    // Only one list can be default
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, isDefault: isDefault }
        : { ...list, isDefault: false }
    ));
  };

  const handleSetArchived = (listId, archived) => {
    setLists(lists.map(list =>
      list.id === listId ? { ...list, archived: archived } : list
    ));
  };

  const handleRestoreList = (listId) => {
    handleArchiveList(listId);
  };

  // Item management functions
  const handleAddItem = (listId, item) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, items: [...list.items, { ...item, done: false }] }
        : list
    ));
  };

  const handleToggleItem = (listId, index, userName) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item, i) =>
              i === index 
                ? { 
                    ...item, 
                    done: !item.done,
                    updatedBy: !item.done ? userName : null // Set who completed it when marking as done, clear when unmarking
                  } 
                : item
            ),
          }
        : list
    ));
  };

  const handleEditItem = (listId, index, patch) => {
    setLists(lists.map(list =>
      list.id === listId
        ? {
            ...list,
            items: list.items.map((item, i) =>
              i === index ? { ...item, ...patch } : item
            ),
          }
        : list
    ));
  };

  const handleDeleteItem = (listId, index) => {
    setLists(lists.map(list =>
      list.id === listId
        ? { ...list, items: list.items.filter((_, i) => i !== index) }
        : list
    ));
  };

  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route
            path="/"
            element={
              <ShoppingListsPage
                lists={lists}
                onCreate={handleCreateList}
                onArchive={(id) => handleArchiveList(id)}
                onDelete={handleDeleteList}
                onLeave={(id) => handleLeaveList(id)}
                currentUserEmail={CURRENT_USER.email}
              />
            }
          />
          <Route
            path="/shopping-lists/:listId"
            element={
              <ShoppingListDetailPageWrapper
                lists={lists}
                getListById={getListById}
                isOwner={isOwner}
                currentUserName={CURRENT_USER.name}
                onRename={handleRenameList}
                onArchive={(listId) => handleArchiveList(listId)}
                onAddItem={handleAddItem}
                onToggleItem={handleToggleItem}
                onEditItem={handleEditItem}
                onDeleteItem={handleDeleteItem}
              />
            }
          />
          <Route
            path="/shopping-lists/:listId/settings"
            element={
              <ListSettingsPageWrapper
                lists={lists}
                getListById={getListById}
                isOwner={isOwner}
                onRename={handleRenameList}
                onSetDefault={handleSetDefault}
                onSetArchived={handleSetArchived}
                onDelete={handleDeleteList}
              />
            }
          />
          <Route
            path="/shopping-lists/:listId/members"
            element={
              <ListMembersPageWrapper
                lists={lists}
                getListById={getListById}
                isOwner={isOwner}
                currentUserEmail={CURRENT_USER.email}
                onAddMember={handleAddMember}
                onRemoveMember={handleRemoveMember}
                onLeave={handleLeaveList}
              />
            }
          />
          <Route
            path="/shopping-lists/archive"
            element={
              <ArchivedListsPage
                lists={lists}
                currentUserEmail={CURRENT_USER.email}
                onRestore={handleRestoreList}
                onDelete={handleDeleteList}
              />
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

// Wrapper components to extract route params
const ShoppingListDetailPageWrapper = ({
  lists,
  getListById,
  isOwner,
  currentUserName,
  onRename,
  onArchive,
  onAddItem,
  onToggleItem,
  onEditItem,
  onDeleteItem,
}) => {
  const { listId } = useParams();
  const list = getListById(listId);
  
  if (!list) {
    return <div>List not found</div>;
  }

  return (
    <ShoppingListDetailPage
      list={list}
      isOwner={isOwner(list)}
      currentUserName={currentUserName}
      onRename={(name) => onRename(listId, name)}
      onArchive={() => onArchive(listId)}
      onAddItem={(item) => onAddItem(listId, item)}
      onToggleItem={(index, userName) => onToggleItem(listId, index, userName)}
      onEditItem={(index, patch) => onEditItem(listId, index, patch)}
      onDeleteItem={(index) => onDeleteItem(listId, index)}
    />
  );
};

const ListSettingsPageWrapper = ({
  lists,
  getListById,
  isOwner,
  onRename,
  onSetDefault,
  onSetArchived,
  onDelete,
}) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const list = getListById(listId);
  
  if (!list) {
    return <div>List not found</div>;
  }

  const handleDelete = () => {
    onDelete(listId);
    navigate('/');
  };

  return (
    <ListSettingsPage
      list={list}
      isOwner={isOwner(list)}
      onRename={(name) => onRename(listId, name)}
      onSetDefault={(v) => onSetDefault(listId, v)}
      onSetArchived={(v) => onSetArchived(listId, v)}
      onDelete={handleDelete}
    />
  );
};

const ListMembersPageWrapper = ({
  lists,
  getListById,
  isOwner,
  currentUserEmail,
  onAddMember,
  onRemoveMember,
  onLeave,
}) => {
  const { listId } = useParams();
  const navigate = useNavigate();
  const list = getListById(listId);
  
  if (!list) {
    return <div>List not found</div>;
  }

  const handleLeave = () => {
    onLeave(listId);
    navigate('/');
  };

  return (
    <ListMembersPage
      list={list}
      isOwner={isOwner(list)}
      currentUserEmail={currentUserEmail}
      onAddMember={(email) => onAddMember(listId, email)}
      onRemoveMember={(memberId) => onRemoveMember(listId, memberId)}
      onLeave={handleLeave}
    />
  );
};

export default App;
