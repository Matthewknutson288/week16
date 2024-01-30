import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Home.css';

function HomePage() {
  const [highScores, setHighScores] = useState([]);

  useEffect(() => {
    async function fetchHighScores() {
      try {
        const response = await axios.get('https://65b81b6c46324d531d55f518.mockapi.io/Promineotech/snakegameHS');
        setHighScores(response.data);
      } catch (error) {
        console.error("There was an error fetching high scores!", error);
      }
    }

    fetchHighScores();
  }, []);

  return (
    <div>
      <h1>Welcome to the Snake Game!</h1>
      <p>Instructions on how to play the game: Eat the apples and grow larger! Sometimes a pineapple will appear...you've gotta be quick to catch it!</p>
      
      <h2>High Scores</h2>
      <ul>
        {highScores.map(score => (
          <li key={score.id}>{score.name}: {score.score}</li>
        ))}
      </ul>

      <Link to="/game" style={{ padding: '10px', backgroundColor: 'blue', color: 'white', textDecoration: 'none' }}>Start Game</Link>
    </div>
  );
}

export default HomePage;