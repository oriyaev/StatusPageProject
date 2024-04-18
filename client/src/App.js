import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [inputValue, setInputValue] = useState('');
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetchStatuses();
  }, []);

  const fetchStatuses = () => {
    fetch('/statusPage')
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        setStatuses(data.statuses);
      })
      .catch(error => {
        console.error('Error fetching statuses:', error);
      });
  };

  const addStatus = () => {
    if (inputValue.trim() !== '') {
      fetch('/statusPage', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: inputValue })
      })
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          console.log(data);
          fetchStatuses();
          setInputValue('');
        })
        .catch(error => {
          console.error('Error adding status:', error);
        });
    }
  };

  const removeAllStatuses = () => {
    setStatuses([]);
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
          <li key={index}>{status}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
