import React, { useState } from 'react';
import axios from 'axios';

const API_URL = "https://charlese.website/api/apps/coffee";

function Coffee() {
  const [character, setCharacter] = useState('barista');
  const [gameState, setGameState] = useState({
    water: 500,
    beans: 250,
    milk: 400,
    money: 0,
    inventory: [],
    day: 1,
    character: 'barista',
  });
  const [currentOrder, setCurrentOrder] = useState('ltte');
  const [result, setResult] = useState('Order or make a drink to see the response.');

  const getInfo = async () => {
    try {
      const response = await axios.get(API_URL);
        setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to fetch info.');
    }
  };

  const takeOrder = async () => {
    try {
      const response = await axios.post(`${API_URL}/order`, { gameState });
      setCurrentOrder(response.data.order);
      setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
      setResult(error.response?.data?.error || 'Failed to take order.');
    }
  };

  const makeDrink = async () => {
    try {
        const response = await axios.post(`${API_URL}/make`, { gameState, order: currentOrder });
        setResult(JSON.stringify(response.data, null, 2));
    } catch (error) {
        setResult(error.response?.data?.error || 'Failed to make drink.');
    }
  };

  const resetGame = () => {
    setGameState({
      water: 500,
      beans: 250,
      milk: 400,
      money: 0,
      inventory: [],
      day: 1,
      character: 'barista',
    });
    setResult('Game reset.');
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Coffee App</h1>
      <p>This page connects to the backend coffee endpoints so you can test the app quickly.</p>

      <div style={{ marginBottom: '1rem' }}>
        <label htmlFor="character">Character </label>
        <select id="character" value={character} onChange={(e) => setCharacter(e.target.value)}>
          <option value="barista">Barista</option>
          {/* <option value="customer">Customer</option> */}
        </select>
      </div>

      <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1rem' }}>
        <button onClick={getInfo}>Get Info</button>
        <button onClick={resetGame}>Reset</button>
        <button onClick={takeOrder}>Take Order</button>
        <button onClick={makeDrink}>Make Latte</button>
      </div>

      <h3>Current state</h3>
      <pre>{JSON.stringify(gameState, null, 2)}</pre>

      <h3>Backend response</h3>
      <pre>{result}</pre>
    </div>
  );
}

export default Coffee;
