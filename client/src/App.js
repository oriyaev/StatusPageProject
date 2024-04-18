import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [statuses, setStatuses] = useState([]);

  const handleStatuses = (method, headers, body) => {
    console.error(method, headers, body);
    return fetch('/handleStatuses', {
      method: method,
      headers: headers,
      body: body
    })
      .then(response => {
        console.error("res", response);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json(); // Parse response body as JSON
      })
      .catch(error => {
        console.error('Error adding status:', error);
      });
  };

  const fetchStatuses = () => {
    handleStatuses("GET", { 'Content-Type': 'application/json' }, undefined)
      .then(data => {
        console.error("data", data);
        setStatuses(data["statuses"]);
      })
      .catch(error => {
        console.error('Error fetching statuses:', error);
      });
  };

  const addStatus = () => {
    if (inputValue.trim() !== '') {
      handleStatuses("POST", { 'Content-Type': 'application/json' }, JSON.stringify({ status: inputValue }))
        .then(response => {
          console.error("test");
          fetchStatuses();
          setInputValue("");
        })
        .catch(error => {
          console.error('Error adding status:', error);
        });
    }
  };

  const removeAllStatuses = () => {
    handleStatuses("DELETE", { 'Content-Type': 'application/json' }, JSON.stringify({ shouldResetAll: true }))
      .then(() => fetchStatuses())
      .catch(error => {
        console.error('Error removing all statuses:', error);
      });
  };

  const removeStatus = (status) => {
    handleStatuses("DELETE", { 'Content-Type': 'application/json' }, JSON.stringify({ shouldResetAll: false, status: status }))
      .then(() => fetchStatuses())
      .catch(error => {
        console.error('Error removing all statuses:', error);
      });
  };

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />
      <button onClick={addStatus}>Add</button>
      <button onClick={removeAllStatuses} className="redButton">Remove All</button>
      <ul>
        {statuses.map((status, index) => (
          <li key={index}>
            {status}
            <button onClick={() => removeStatus(status)} className="removeButton">Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
