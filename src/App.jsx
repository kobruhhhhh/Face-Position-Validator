import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Capitalize component name
import Main from './components/Main'; // Capitalize component name
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
       
        <Routes>
          <Route path="/" element={<Main />} /> 
          <Route path="/home" element={<Home />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
