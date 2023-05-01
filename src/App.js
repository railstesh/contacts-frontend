import React from 'react';
import { Routes ,Route } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import EditContact from './components/EditContact';

function App() {
  return (
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/edit" element={<EditContact/>} />
      </Routes>
  );
}

export default App;
