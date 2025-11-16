import React from 'react';
import './ItemsFooter.css';

const ItemsFooter = ({ remaining }) => {
  return (
    <div className="items-footer">
      <div className="item-counter">
        {remaining} remaining
      </div>
    </div>
  );
};

export default ItemsFooter;

