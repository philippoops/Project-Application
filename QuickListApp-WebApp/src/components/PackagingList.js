import { useState } from 'react';
import Item from './Item';

export default function PackagingList({
  itemList,
  onDeleteItem,
  onToggleItems,
  onHandleClearlist,
}) {
  const [sortBy, setSortBy] = useState('input');

  let sortedItems;

  if (sortBy === 'input') sortedItems = itemList;
  if (sortBy === 'description')
    sortedItems = itemList
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  if (sortBy === 'packed')
    sortedItems = itemList
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  return (
    <div className="list">
      <ul>
        {sortedItems.map((item) => (
          <Item
            item={item}
            onDeleteItem={onDeleteItem}
            onToggleItem={onToggleItems}
            key={item.id}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by input order</option>
          <option value="description">Sort by description</option>
          <option value="packed">Sort by packed status</option>
        </select>
        <button
          disabled={sortedItems.length === 0 ? true : false}
          onClick={onHandleClearlist}
        >
          Clear list
        </button>
      </div>
    </div>
  );
}
