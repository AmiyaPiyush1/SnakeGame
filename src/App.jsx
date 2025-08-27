import React, { useState, useEffect, useRef } from "react";

const GRID_SIZE = 20;
const INITIAL_SNAKE = [{ x: 10, y: 10 }];
const INITIAL_DIRECTION = { x: 0, y: 0 };

function isPositionOnSnake(snake, position) {
  for (let i = 0; i < snake.length; i++) {
    if (snake[i].x === position.x && snake[i].y === position.y) {
      return true;
    }
  }
  return false;
}

function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE);
  const [food, setFood] = useState(getRandomFood(INITIAL_SNAKE));
  const [direction, setDirection] = useState(INITIAL_DIRECTION);
  const [gameOver, setGameOver] = useState(false);
  const [score, setScore] = useState(0);
  const gameLoopIntervalRef = useRef(null);

  function getRandomFood(snakeBody) {
    let newFood = {
      x: Math.floor(Math.random() * GRID_SIZE),
      y: Math.floor(Math.random() * GRID_SIZE),
    };

    while (isPositionOnSnake(snakeBody, newFood)) {
      newFood = {
        x: Math.floor(Math.random() * GRID_SIZE),
        y: Math.floor(Math.random() * GRID_SIZE),
      };
    }
    return newFood;
  }

  useEffect(() => {
    function handleKey(e) {
      e.preventDefault();
      if (e.key === "ArrowUp" && direction.y === 0) {
        setDirection({ x: 0, y: -1 });
      } else if (e.key === "ArrowDown" && direction.y === 0) {
        setDirection({ x: 0, y: 1 });
      } else if (e.key === "ArrowLeft" && direction.x === 0) {
        setDirection({ x: -1, y: 0 });
      } else if (e.key === "ArrowRight" && direction.x === 0) {
        setDirection({ x: 1, y: 0 });
      }
    }

    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [direction]);

  useEffect(() => {
    if (!gameOver) {
      gameLoopIntervalRef.current = setInterval(() => {
        move();
      }, 150);
    }
    return () => clearInterval(gameLoopIntervalRef.current);
  }, [gameOver, direction]);

  function move() {
    if (direction.x === 0 && direction.y === 0) return;

    setSnake((prevSnake) => {
      const newHead = {
        x: prevSnake[0].x + direction.x,
        y: prevSnake[0].y + direction.y,
      };

      if (
        newHead.x < 0 ||
        newHead.x >= GRID_SIZE ||
        newHead.y < 0 ||
        newHead.y >= GRID_SIZE ||
        isPositionOnSnake(prevSnake, newHead)
      ) {
        setGameOver(true);
        return prevSnake;
      }

      const newSnake = [newHead, ...prevSnake];

      if (newHead.x === food.x && newHead.y === food.y) {
        setScore((prev) => prev + 10);
        setFood(getRandomFood(newSnake));
      } else {
        newSnake.pop();
      }

      return newSnake;
    });
  }

  function resetGame() {
    setSnake(INITIAL_SNAKE);
    setDirection(INITIAL_DIRECTION);
    setFood(getRandomFood(INITIAL_SNAKE));
    setGameOver(false);
    setScore(0);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <h1>Snake Game</h1>
      <h2>Score: {score}</h2>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${GRID_SIZE}, 20px)`,
          border: "2px solid black",
        }}
      >
        {Array.from({ length: GRID_SIZE * GRID_SIZE }).map((_, i) => {
          const x = i % GRID_SIZE;
          const y = Math.floor(i / GRID_SIZE);
          let cellColor = "white";

          for (let j = 0; j < snake.length; j++) {
            if (snake[j].x === x && snake[j].y === y) {
              cellColor = "green";
              break;
            }
          }

          if (food.x === x && food.y === y) {
            cellColor = "red";
          }

          return (
            <div
              key={i}
              style={{
                width: "20px",
                height: "20px",
                backgroundColor: cellColor,
                border: "1px solid #ddd",
              }}
            ></div>
          );
        })}
      </div>
      <button onClick={resetGame}>Restart</button>
      {gameOver ? <div>Game Over!</div> : ""}
    </div>
  );
}

export default SnakeGame;
