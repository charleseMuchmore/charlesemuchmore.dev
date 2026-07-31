import React, { useEffect, useRef, useState } from 'react';
import './Pong.css';

const INITIAL_STATUS = 'Click "Start Game" to initialize.';
const WIDTH = 800;
const HEIGHT = 600;
const PADDLE_WIDTH = 12;
const PADDLE_HEIGHT = 100;
const PADDLE_SPEED = 8;
const BALL_SIZE = 12;
const INITIAL_BALL_SPEED = 6;

function Pong() {
  const [gameState, setGameState] = useState(false);
  const [result, setResult] = useState(INITIAL_STATUS);
  const [score, setScore] = useState({ left: 0, right: 0 });
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const keysRef = useRef({ up: false, down: false, w: false, s: false });
  const gameRef = useRef({
    running: false,
    leftPaddleY: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    rightPaddleY: HEIGHT / 2 - PADDLE_HEIGHT / 2,
    ballX: WIDTH / 2,
    ballY: HEIGHT / 2,
    ballDX: INITIAL_BALL_SPEED,
    ballDY: INITIAL_BALL_SPEED,
    leftScore: 0,
    rightScore: 0,
  });

  const stopGame = () => {
    if (animationRef.current) {
      cancelAnimationFrame(animationRef.current);
      animationRef.current = null;
    }

    gameRef.current.running = false;
  };

  const drawFrame = () => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const ctx = canvas.getContext('2d');
    if (!ctx) {
      return;
    }

    const state = gameRef.current;
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, WIDTH, HEIGHT);

    ctx.strokeStyle = 'white';
    ctx.setLineDash([12, 12]);
    ctx.beginPath();
    ctx.moveTo(WIDTH / 2, 0);
    ctx.lineTo(WIDTH / 2, HEIGHT);
    ctx.stroke();
    ctx.setLineDash([]);

    ctx.fillStyle = 'white';
    ctx.fillRect(20, state.leftPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);
    ctx.fillRect(WIDTH - 20 - PADDLE_WIDTH, state.rightPaddleY, PADDLE_WIDTH, PADDLE_HEIGHT);

    ctx.beginPath();
    ctx.arc(state.ballX, state.ballY, BALL_SIZE, 0, Math.PI * 2);
    ctx.fill();

    ctx.font = 'bold 48px Courier';
    ctx.textAlign = 'center';
    ctx.fillText(`${state.leftScore}`, WIDTH / 2 - 60, 70);
    ctx.fillText(`${state.rightScore}`, WIDTH / 2 + 60, 70);
  };

  const resetBall = () => {
    const state = gameRef.current;
    state.ballX = WIDTH / 2;
    state.ballY = HEIGHT / 2;
    state.ballDX = INITIAL_BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
    state.ballDY = INITIAL_BALL_SPEED * (Math.random() > 0.5 ? 1 : -1);
  };

  const updateGame = () => {
    const state = gameRef.current;

    if (keysRef.current.w) {
      state.leftPaddleY = Math.max(0, state.leftPaddleY - PADDLE_SPEED);
    }
    if (keysRef.current.s) {
      state.leftPaddleY = Math.min(HEIGHT - PADDLE_HEIGHT, state.leftPaddleY + PADDLE_SPEED);
    }
    if (keysRef.current.up) {
      state.rightPaddleY = Math.max(0, state.rightPaddleY - PADDLE_SPEED);
    }
    if (keysRef.current.down) {
      state.rightPaddleY = Math.min(HEIGHT - PADDLE_HEIGHT, state.rightPaddleY + PADDLE_SPEED);
    }

    state.ballX += state.ballDX;
    state.ballY += state.ballDY;

    if (state.ballY <= BALL_SIZE || state.ballY >= HEIGHT - BALL_SIZE) {
      state.ballDY *= -1;
    }

    const leftPaddleX = 20 + PADDLE_WIDTH;
    const rightPaddleX = WIDTH - 20 - PADDLE_WIDTH;

    const leftHit =
      state.ballX - BALL_SIZE <= leftPaddleX &&
      state.ballX + BALL_SIZE >= 20 &&
      state.ballY + BALL_SIZE >= state.leftPaddleY &&
      state.ballY - BALL_SIZE <= state.leftPaddleY + PADDLE_HEIGHT &&
      state.ballDX < 0;

    const rightHit =
      state.ballX + BALL_SIZE >= rightPaddleX &&
      state.ballX - BALL_SIZE <= WIDTH - 20 &&
      state.ballY + BALL_SIZE >= state.rightPaddleY &&
      state.ballY - BALL_SIZE <= state.rightPaddleY + PADDLE_HEIGHT &&
      state.ballDX > 0;

    if (leftHit || rightHit) {
      const hitPaddleY = leftHit ? state.leftPaddleY : state.rightPaddleY;
      const relativeIntersect = (state.ballY - (hitPaddleY + PADDLE_HEIGHT / 2)) / (PADDLE_HEIGHT / 2);
      const bounceAngle = relativeIntersect * 0.75;

      state.ballDX *= -1.05;
      state.ballDY = INITIAL_BALL_SPEED * bounceAngle;
      state.ballX += state.ballDX > 0 ? 8 : -8;
    }

    if (state.ballX + BALL_SIZE < 0) {
      state.rightScore += 1;
      setScore({ left: state.leftScore, right: state.rightScore });
      resetBall();
    } else if (state.ballX - BALL_SIZE > WIDTH) {
      state.leftScore += 1;
      setScore({ left: state.leftScore, right: state.rightScore });
      resetBall();
    }
  };

  const startGame = () => {
    stopGame();
    setGameState(true);
    setResult('Game running...');
    setScore({ left: 0, right: 0 });

    window.requestAnimationFrame(() => {
      const canvas = canvasRef.current;
      if (!canvas) {
        setResult('The game canvas is not ready yet.');
        setGameState(false);
        return;
      }

      const state = gameRef.current;
      state.running = true;
      state.leftPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
      state.rightPaddleY = HEIGHT / 2 - PADDLE_HEIGHT / 2;
      state.leftScore = 0;
      state.rightScore = 0;
      state.ballX = WIDTH / 2;
      state.ballY = HEIGHT / 2;
      state.ballDX = INITIAL_BALL_SPEED;
      state.ballDY = INITIAL_BALL_SPEED;

      const tick = () => {
        if (!gameRef.current.running) {
          return;
        }

        updateGame();
        drawFrame();
        animationRef.current = requestAnimationFrame(tick);
      };

      tick();
    });
  };

  const resetGame = () => {
    stopGame();
    setGameState(false);
    setResult(INITIAL_STATUS);
  };

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'ArrowUp') {
        keysRef.current.up = true;
        event.preventDefault();
      } else if (event.key === 'ArrowDown') {
        keysRef.current.down = true;
        event.preventDefault();
      } else if (event.key === 'w' || event.key === 'W') {
        keysRef.current.w = true;
        event.preventDefault();
      } else if (event.key === 's' || event.key === 'S') {
        keysRef.current.s = true;
        event.preventDefault();
      }
    };

    const handleKeyUp = (event) => {
      if (event.key === 'ArrowUp') {
        keysRef.current.up = false;
      } else if (event.key === 'ArrowDown') {
        keysRef.current.down = false;
      } else if (event.key === 'w' || event.key === 'W') {
        keysRef.current.w = false;
      } else if (event.key === 's' || event.key === 'S') {
        keysRef.current.s = false;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      stopGame();
    };
  }, []);

  return (
    <div style={{ padding: '2rem', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Ping Pong</h1>
      <p>Use W and S for the left player, and the up and down arrows for the right player.</p>
      <p>(Please note this game doesn't work on mobile yet!)</p>
      {!gameState && (
        <div>
          <div style={{ gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button onClick={startGame} className="button-55">Start Game</button>
          </div>
        </div>
      )}

      {gameState && (
        <div>
          <canvas
            ref={canvasRef}
            id="pongCanvas"
            width={WIDTH}
            height={HEIGHT}
            style={{ border: '1px solid white', background: 'black' }}
          />

          <div style={{ gap: '0.75rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
            <button className="button-55" onClick={resetGame}>Quit</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Pong;
