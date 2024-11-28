import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Tile from './Tile';
import './TileList.css';

function TileList() {
  const [tiles, setTiles] = useState([
    { id: '1', text: 'This is a sample tile with some interesting content.' },
    { id: '2', text: 'Click edit to modify the content of this tile.' },
    { id: '3', text: 'Each tile can be customized according to your needs.' }
  ]);
  const [nextId, setNextId] = useState(4);

  const handleEdit = (id, newText) => {
    setTiles(tiles.map(tile => tile.id === id ? { ...tile, text: newText } : tile));
  };

  const addTile = () => {
    setTiles([...tiles, { id: String(nextId), text: `New Tile ${nextId}` }]);
    setNextId(nextId + 1);
  };

  const handleDragEnd = (result) => {
    if (!result.destination) return;

    const items = Array.from(tiles);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setTiles(items);
  };

  return (
    <div className="tile-list-container">
      <h1 className="tile-list-title">My Tiles</h1>
      <button onClick={addTile} className="add-tile-btn">Add New Tile</button>
      
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="tiles" direction="horizontal">
          {(provided) => (
            <div 
              className="tile-grid"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {tiles.map((tile, index) => (
                <Draggable 
                  key={tile.id} 
                  draggableId={tile.id} 
                  index={index}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`tile-wrapper ${snapshot.isDragging ? 'dragging' : ''}`}
                    >
                      <Tile
                        text={tile.text}
                        onEdit={(newText) => handleEdit(tile.id, newText)}
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </div>
  );
}

export default TileList; 