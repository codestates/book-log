import React from 'react';
import './App.css';
import MainPage from './pages/MainPage';
import TitleBar from './components/TitleBar';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Router>
        <TitleBar />
        <Routes>
          <Route exact path="/" element={<MainPage />}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export { App as default, MainPage };
