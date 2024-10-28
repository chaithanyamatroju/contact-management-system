import React from 'react';
import './App.css';
import ContactList from './components/ContactList';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Contact Management System</h1>
      </header>
      <ContactList />
    </div>
  );
};

export default App;
