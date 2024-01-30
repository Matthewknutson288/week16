import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import GamePage from './GamePage';
import HighScoresPage from './HighScoresPage';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/game" element={<GamePage />} />
        <Route path="/high-scores" element={<HighScoresPage />} />
      </Routes>
    </Router>
  );
};

export default App;