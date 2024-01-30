import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function HighScoresPage() {
  const [highScores, setHighScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('https://65b81b6c46324d531d55f518.mockapi.io/Promineotech/snakegameHS')
      .then(response => {
        setHighScores(response.data);
      })
      .catch(error => {
        console.error('Error fetching high scores:', error);
      });
  }, []);

  const goToGame = () => {
    navigate("/game"); // Replace "/game" with the actual path where your game is located
  };
  const goToHome = () => {
    navigate("/"); // Replace "/" with the actual path where your home screen is located
  };

  return (
    <div>
      <h1>High Scores</h1>
      {highScores.map((score, index) => (
        <div key={index}>
          <p>{score.playerName}: {score.score}</p>
        </div>
      ))}
      <button onClick={goToGame}>Back to Game</button>
      <button onClick={goToHome}>Home</button>
    </div>
  );
}


export default HighScoresPage;