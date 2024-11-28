import React, { useState } from 'react';

function ListCreator() {
  const [inputValue, setInputValue] = useState('');
  const [items, setItems] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setItems([...items, inputValue]);
      setInputValue('');
    }
  };

  return (
    <div className="container">
      <h1>My List Creator</h1>
      
      <form onSubmit={handleSubmit} className="input-form">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter an item..."
          className="input-field"
        />
        <button type="submit" className="submit-button">
          Add Item
        </button>
      </form>

      <ul className="items-list">
        {items.map((item, index) => (
          <li key={index} className="list-item">
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListCreator; 