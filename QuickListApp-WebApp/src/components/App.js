import { useState } from 'react';
import Navigation from './Navigation';
import Form from './Form';
import PackagingList from './PackagingList';
import Stats from './Stats';

export default function App() {
  const [items, setItems] = useState([]);
  function handleAddItems(addItems) {
    setItems((items) => [...items, addItems]);
  }

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleToggleItem(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  function handleClearlist() {
    const confirmed = window.confirm('Are you sure to delete all the list?');
    if (confirmed) setItems([]);
  }
  return (
    <>
      <div className="app">
        <Navigation />
        <Form onAddItems={handleAddItems} />
        <PackagingList
          itemList={items}
          onDeleteItem={handleDeleteItem}
          onToggleItems={handleToggleItem}
          onHandleClearlist={handleClearlist}
        />
        <Stats statsItem={items} />
      </div>
    </>
  );
}
