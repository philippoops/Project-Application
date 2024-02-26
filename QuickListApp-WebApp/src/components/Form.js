import { useState } from 'react';

export default function Form({ onAddItems }) {
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [category, setCategory] = useState('All');
  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;
    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription('');
    setQuantity(1);
  }
  return (
    <div className="form-container">
      <h3>What do you need for your grocery?</h3>

      <form className="add-form" onSubmit={handleSubmit}>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        >
          {Array.from({ length: 50 }, (_, i) => i + 1).map((num) => (
            <option value={num} key={num}>
              {num}
            </option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Item..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button>Add</button>
      </form>
    </div>
  );
}
