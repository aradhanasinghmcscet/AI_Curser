import React, { useState } from 'react';
import './Tile.css';

function Tile({ text, onEdit }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newText, setNewText] = useState(text);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    onEdit(newText);
    setIsEditing(false);
  };

  return (
    <div className="tile">
      <div className="tile-content">
        {isEditing ? (
          <input
            type="text"
            value={newText}
            onChange={(e) => setNewText(e.target.value)}
            className="tile-input"
          />
        ) : (
          <p className="tile-text">{text}</p>
        )}
        <div className="tile-actions">
          <a href="#" className="more-link">More</a>
          {isEditing ? (
            <button onClick={handleSave} className="btn btn-save">Save</button>
          ) : (
            <button onClick={handleEdit} className="btn btn-edit">Edit</button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Tile; 