// src/App.jsx
import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [entries, setEntries] = useState(() => {
    const saved = localStorage.getItem("journalEntries");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [editIndex, setEditIndex] = useState(null); // track which entry is being edited

  // Save entries to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("journalEntries", JSON.stringify(entries));
  }, [entries]);

  const addEntry = () => {
    if (!input.trim()) return;

    if (editIndex !== null) {
      // Editing existing entry
      const updated = [...entries];
      updated[editIndex] = { ...updated[editIndex], text: input };
      setEntries(updated);
      setEditIndex(null); // exit edit mode
    } else {
      // Adding new entry
      const newEntry = {
        text: input,
        date: new Date().toLocaleString()
      };
      setEntries([newEntry, ...entries]);
    }
    setInput("");
  };

  const deleteEntry = (index) => {
    const updated = entries.filter((_, i) => i !== index);
    setEntries(updated);
    if (editIndex === index) setEditIndex(null); // cancel editing if deleting the current entry
  };

  const editEntry = (index) => {
    setInput(entries[index].text); // populate textarea with current text
    setEditIndex(index); // set which entry is being edited
  };

  return (
    <div className="app-container">
      <h1>Daily Journal App</h1>
      <p>A simple web app to log your daily journal entries.</p>

      <div className="input-section">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Write your journal entry here..."
        />
        <button onClick={addEntry}>
          {editIndex !== null ? "Save Changes" : "Add Entry"}
        </button>
      </div>

      <div className="entries-section">
        {entries.length === 0 ? (
          <p>No entries yet.</p>
        ) : (
          entries.map((entry, index) => (
            <div key={index} className="entry">
              <div className="entry-header">
                <span>{entry.date}</span>
                <div>
                  <button className="edit" onClick={() => editEntry(index)}>Edit</button>
                  <button className="delete" onClick={() => deleteEntry(index)}>Delete</button>
                </div>
              </div>
              <p>{entry.text}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default App;