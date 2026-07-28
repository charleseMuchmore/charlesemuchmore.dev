import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://charlese.website/api/apps/coffee";

function Coffee() {
  const [gameState, setGameState] = useState(null);
  const [result, setResult] = useState('Click "Start Game" to initialize.');

  const startGame = async () => {
    try {
      const response = await axios.post(`${API_URL}/start`);
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to start game.');
    }
  };

  const generateOrder = async () => {
    if (!gameState) {
      setResult('Start a game first.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/action`, {
        gameState,
        action: { type: 'GENERATE_ORDER' }
      });
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to generate order.');
    }
  };

  const makeDrink = async (drinkName) => {
    if (!gameState) {
      setResult('Start a game first.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/action`, {
        gameState,
        action: { type: 'MAKE_DRINK', drink: drinkName }
      });
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to make drink.');
    }
  };

  const serveDrink = async () => {
    if (!gameState) {
      setResult('Start a game first.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/action`, {
        gameState,
        action: { type: 'SERVE_DRINK' }
      });
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to serve drink.');
    }
  };

  const advanceDay = async () => {
    if (!gameState) {
      setResult('Start a game first.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/action`, {
        gameState,
        action: { type: 'ADVANCE_DAY' }
      });
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to advance day.');
    }
  };

  const refillInventory = async () => {
    if (!gameState) {
      setResult('Start a game first.');
      return;
    }
    try {
      const response = await axios.post(`${API_URL}/action`, {
        gameState,
        action: { 
          type: 'REFILL', 
          payload: { beans: 100, milk: 100, cups: 25 } 
        }
      });
      setGameState(response.data.gameState);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to refill inventory.');
    }
  };

  const resetGame = () => {
    setGameState(null);
    setResult('Click "Start Game" to initialize.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Coffee Shop Simulator</h1>
      <p>Test the refactored coffee app backend with the new unified API.</p>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
        <button onClick={startGame} style={{ fontWeight: 'bold' }}>Start Game</button>
        <button onClick={generateOrder}>Generate Order</button>
        <button onClick={() => makeDrink('espresso')}>Make Espresso</button>
        <button onClick={() => makeDrink('latte')}>Make Latte</button>
        <button onClick={() => makeDrink('cappuccino')}>Make Cappuccino</button>
        <button onClick={serveDrink}>Serve Drink</button>
        <button onClick={refillInventory}>Refill Inventory</button>
        <button onClick={advanceDay}>Advance Day</button>
        <button onClick={resetGame}>Reset</button>
      </div>

      <h3>Current Game State</h3>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
        {gameState ? JSON.stringify(gameState, null, 2) : 'No game state yet'}
      </pre>

      <h3>Backend Response</h3>
      <pre style={{ backgroundColor: '#f5f5f5', padding: '1rem', overflow: 'auto' }}>
        {result}
      </pre>
    </div>
  );
}

export default Coffee;
