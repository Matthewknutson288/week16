import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // Import axios
import './GamePage.css';

const dotSize = 20;
const gameBoardSize = 600;

const GamePage = () => {
  const [snake, setSnake] = useState([{ top: 0, left: 0 }]);
  const [direction, setDirection] = useState('right');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(localStorage.getItem('highScore') || 0);
  const [apple, setApple] = useState(getRandomPosition());
  const [pineapple, setPineapple] = useState(getRandomPosition()); // Add pineapple state
  const [speed, setSpeed] = useState(200); // Add speed state
  const navigate = useNavigate();

  function getRandomPosition() {
    return {
      top: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
      left: Math.floor(Math.random() * gameBoardSize / dotSize) * dotSize,
    };
  }

  const handleKeyDown = useCallback((event) => {
    const directions = {
      ArrowUp: 'up',
      ArrowDown: 'down',
      ArrowLeft: 'left',
      ArrowRight: 'right',
    };
    setDirection(directions[event.key]);
  }, []);

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  const moveSnake = useCallback(() => {
    setSnake((snake) => {
      const newSnake = [...snake];
      const head = { ...newSnake[0] };

      switch (direction) {
        case 'right':
          head.left += dotSize;
          break;
        case 'down':
          head.top += dotSize;
          break;
        case 'left':
          head.left -= dotSize;
          break;
        case 'up':
          head.top -= dotSize;
          break;
      }

      
      if (newSnake.some((dot, index) => index !== 0 && dot.top === head.top && dot.left === head.left)) {
        gameOver();
      } else if (
        head.top < 0 ||
        head.top === gameBoardSize ||
        head.left < 0 ||
        head.left === gameBoardSize
      ) {
        gameOver();
      } else if (head.top === apple.top && head.left === apple.left) {
        setScore(score + 1);
        setApple(getRandomPosition());
        newSnake.unshift(head);

        // If score is a multiple of 5, decrease the speed
        if ((score + 1) % 5 === 0) {
          setSpeed(speed => speed > 50 ? speed - 20 : 50);
        }
      } else if (head.top === pineapple.top && head.left === pineapple.left) {
        setScore(score + 5);
        setPineapple(getRandomPosition());
        setSpeed(speed => speed + 2);
        newSnake.unshift(head);
      } else {
        newSnake.unshift(head);
        newSnake.pop();
      }
      return newSnake;
    });
  }, [direction, snake, apple, pineapple, score, speed]);

  useEffect(() => {
    const gameInterval = setInterval(moveSnake, speed);
    return () => clearInterval(gameInterval);
  }, [moveSnake, speed]);

  useEffect(() => {
    const pineappleInterval = setInterval(() => {
      setPineapple(getRandomPosition());
    }, 10000);
    return () => clearInterval(pineappleInterval);
  }, []);

  const gameOver = () => {
    alert('Game Over!');
    if (score > highScore) {
      const name = prompt('You set a new high score! Please enter your name:');
      localStorage.setItem('highScore', score);
      localStorage.setItem('highScoreName', name);
      setHighScore(score);

      // Post the new high score to your mockAPI
      axios.post('https://65b81b6c46324d531d55f518.mockapi.io/Promineotech/snakegameHS', {
        playerName: name,
        score: score
      })
      .then(response => console.log(response))
      .catch(error => console.error(error));
    }
    setScore(0);
    setSnake([{ top: 0, left: 0 }]);
    setDirection('right');
    setApple(getRandomPosition());
    setPineapple(getRandomPosition()); // Reset the pineapple
    setSpeed(200); // Reset the speed
    navigate('/high-scores');
  };

  return (
    <div className="centered-container">
      <div id="game-board">
        {snake.map((dot, index) => (
          <div key={index} className="dot" style={{ top: dot.top, left: dot.left }} />
        ))}
        {apple && <div className="apple" style={{ top: apple.top, left: apple.left }} />}
        {pineapple && <div className="pineapple" style={{ top: pineapple.top, left: pineapple.left }} />} {/* Render the pineapple */}
      </div>
      <div id="score">Score: {score}</div>
      <div id="high-score">High Score: {highScore}</div>
    </div>
  );
};

export default GamePage;