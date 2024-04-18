import React, { useState } from 'react';
import './App.css';

function App() {
  const [inputStatusValue, setInputStatusValue] = useState('');
  const [statuses, setStatuses] = useState([]);

  const [inputNameValue, setInputNameValue] = useState('');
  const [statusFrom, setStatusFromValue] = useState(statuses[0]);
  const [statusTo, setStatusToValue] = useState(statuses[0]);
  const [transitions, setTransitions] = useState([]);

  const handleStatuses = (path, method, headers, body) => {
    console.error(path, method, headers, body);
    return fetch(path, {
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
    handleStatuses("/handleStatuses", "GET", { 'Content-Type': 'application/json' }, undefined)
      .then(data => {
        console.error("data", data);
        setStatuses(data["statuses"]);
      })
      .catch(error => {
        console.error('Error fetching statuses:', error);
      });
  };

  const fetchTransitions = () => {
    handleStatuses("/handleNames", "GET", { 'Content-Type': 'application/json' }, undefined)
      .then(data => {
        console.error("data", data);
        setTransitions(data["names"]);
      })
      .catch(error => {
        console.error('Error fetching transitions:', error);
      });
  };

  const addStatus = () => {
    if (inputStatusValue.trim() !== '') {
      handleStatuses("/handleStatuses", "POST", { 'Content-Type': 'application/json' }, JSON.stringify({ status: inputStatusValue }))
        .then(response => {
          console.error("test");
          fetchStatuses();
          setInputStatusValue("");
        })
        .catch(error => {
          console.error('Error adding status:', error);
        });
    }
  };

  const addTransition = () => {
    if (inputNameValue.trim() !== "") {
     handleStatuses("/handleNames", "POST", { 'Content-Type': 'application/json' }, JSON.stringify({ name: inputNameValue, "from_status": statusFrom, "to_status": statusTo }))
        .then(response => {
          console.error("test");
          fetchTransitions();
          setInputNameValue("");
        })
        .catch(error => {
          console.error('Error adding status:', error);
        });
    }
  };

  const removeAllStatuses = () => {
    handleStatuses("/handleStatuses", "DELETE", { 'Content-Type': 'application/json' }, JSON.stringify({ shouldResetAll: true }))
      .then(() => fetchStatuses())
      .catch(error => {
        console.error('Error removing all statuses:', error);
      });
  };

  const removeStatus = (status) => {
    handleStatuses("/handleStatuses", "DELETE", { 'Content-Type': 'application/json' }, JSON.stringify({ shouldResetAll: false, status: status }))
      .then(() => fetchStatuses())
      .catch(error => {
        console.error('Error removing all statuses:', error);
      });
  };

  return (
    <div className="wrapperDiv">
        <div className="sectionDiv">
          <text className="sectionTitle">Add Input</text>
          <br/>
          <div className="input">
              <input
                type="text"
                value={inputStatusValue}
                onChange={(e) => setInputStatusValue(e.target.value)}
              />
              <button onClick={addStatus}>Add</button>
          </div>
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
        <div className="sectionDiv">
           <text className="sectionTitle">Add Transition</text>
          <br/>
          <div className="transitionDiv">
            <form>
              <input
                type="text"
                value={inputNameValue}
                onChange={(e) => setInputNameValue(e.target.value)}
               />
                <label>
                  From:
                  <select className="dropdown" defaultValue={statuses[0]} onChange={(e) => setStatusFromValue(e.target.value)}>
                    {statuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  To:
                  <select className="dropdown" defaultValue={statuses[0]} onChange={(e) => setStatusToValue(e.target.value)}>
                    {statuses.map((status, index) => (
                      <option key={index} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <button onClick={addTransition}>Add</button>
              </form>
          </div>
          <ul>
            {transitions.map((transition, index) => (
              <li key={index}>
                {transition["name"]}: transition["from_status"] -> transition["to_status"]
              </li>
            ))}
          </ul>
        </div>
     </div>
  );
}

export default App;
