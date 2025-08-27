# Classic Snake Game

This is a **classic Snake Game** implemented in **React** using **arrays** to manage the snake's body and game grid.

## Features

- Grid-based movement using a 2D array logic.
- Snake grows when it eats food.
- Game ends when the snake collides with itself or the wall.
- Score tracking.
- Restart button to play again.
- Arrow key controls for movement.

## How It Works

- The game grid is represented using an array of cells.
- The snake is stored as an **array of objects**, each object representing a segment with `x` and `y` coordinates.
- Food is placed randomly on the grid, avoiding the snake's current position.
- On each game loop tick:
  - The snake moves by adding a new head in the current direction.
  - If the snake eats food, the snake grows and score increases.
  - If the snake collides with walls or itself, the game ends.
- React state hooks (`useState`) and effects (`useEffect`) handle the game logic and rendering.

## Controls

- **Arrow Up**: Move up
- **Arrow Down**: Move down
- **Arrow Left**: Move left
- **Arrow Right**: Move right
- **Restart button**: Restart the game

## Technologies Used

- **React**
- **JavaScript**
- **HTML/CSS (inline styling)**

## How to Run

1. Clone this repository:
   ```bash
   git clone https://github.com/AmiyaPiyush1/SnakeGame.git
