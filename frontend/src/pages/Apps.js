import React from 'react';
import { Link } from 'react-router-dom';

function Apps() {
  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Apps</h1>
      <p>Choose an app to explore.</p>
      <ul>
        <li><Link to="/Coffee">Coffee Shop Simulator</Link></li>
        <li><Link to="/Pong">Ping Pong</Link></li>
      </ul>
    </div>
  );
}

export default Apps;
