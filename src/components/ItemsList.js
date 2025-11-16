import React from 'react';
import ShoppingListItemRow from './ShoppingListItemRow';
import './ItemsList.css';

const ItemsList = ({ sortedItems, isOwner, onToggleItem, onEditItem, onDeleteItem, currentUserName }) => {
  return (
    <div className="items-list">
      {sortedItems.length === 0 ? (
        <div className="empty-items">No items in this list</div>
      ) : (
        sortedItems.map((item, index) => (
          <ShoppingListItemRow
            key={index}
            item={item}
            isOwner={isOwner}
            onToggle={() => onToggleItem && onToggleItem(index)}
            onEdit={(patch) => onEditItem && onEditItem(index, { ...patch, updatedBy: currentUserName })}
            onDelete={() => onDeleteItem && onDeleteItem(index)}
          />
        ))
      )}
    </div>
  );
};

export default ItemsList;

