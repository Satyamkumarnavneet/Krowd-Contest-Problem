import React, { useState } from "react";
import "./App.css";

function ItemListManager() {
  const [items, setItems] = useState([]); // State to store the list of items
  const [inputValue, setInputValue] = useState(""); // State to store input field value
  const [successMessage, setSuccessMessage] = useState(""); // State for success feedback

  const handleAddItem = () => {
    if (inputValue.trim() !== "") {
      setItems([...items, inputValue]); // Add input value to the list
      setInputValue(""); // Clear the input field
      showSuccessMessage("Item added successfully!");
    }
  };

  const handleDeleteItem = (index) => {
    const updatedItems = items.filter((_, i) => i !== index); // Remove item by index
    setItems(updatedItems);
  };

  const handleEditItem = (index) => {
    const newValue = prompt("Edit item:", items[index]);
    if (newValue && newValue.trim() !== "") {
      const updatedItems = items.map((item, i) => (i === index ? newValue : item));
      setItems(updatedItems);
    }
  };

  const handleClearAll = () => {
    setItems([]); // Clear all items
  };

  const showSuccessMessage = (message) => {
    setSuccessMessage(message);
    setTimeout(() => setSuccessMessage(""), 2000); // Hide message after 2 seconds
  };

  return (
    <div className="app-container">
      <header className="header">
        <h1>Item List Manager</h1>
      </header>
      <main className="main-content">
        {successMessage && <p className="success-message">{successMessage}</p>}

        <div className="input-container">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)} // Update state on input change
            placeholder="Enter an item"
            className="input-field"
          />
          <button onClick={handleAddItem} className="add-button">
            Add Item
          </button>
        </div>

        {items.length > 0 ? (
          <>
            <ul className="item-list">
              {items.map((item, index) => (
                <li key={index} className="item">
                  {item}
                  <div className="item-actions">
                    <button onClick={() => handleEditItem(index)} className="edit-button">
                      Edit
                    </button>
                    <button onClick={() => handleDeleteItem(index)} className="delete-button">
                      Delete
                    </button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleClearAll} className="clear-all-button">
              Clear All
            </button>
          </>
        ) : (
          <p className="empty-placeholder">Your list is empty. Start adding items!</p>
        )}
      </main>
    </div>
  );
}

export default ItemListManager;
