# Tic Tac Toe (Minimax Engine)

An unbeatable Tic Tac Toe game featuring a smart AI powered by the **Minimax algorithm** and a modern glassmorphic UI.
LIVE DEMO:https://tictactoe-minimax-engine.vercel.app/
## 🚀 Features
- **🧠 Minimax AI**: The AI opponent plays optimally, ensuring a fair challenge.
- **🔄 Dual Mode**: Play against the Bot or locally with a friend (Human vs Human).
- **🎨 Modern UI**: Premium Glassmorphism design with smooth animations and hover effects.
- **🎮 Responsive Design**: Optimized for both desktop and mobile devices.

## 🛠️ Tech Stack
- **HTML5**: Structure and Semantics.
- **CSS3**: Styling, Animations, and Glassmorphism.
- **JavaScript (Vanilla)**: Game Logic, Minimax Algorithm, and DOM Manipulation.

## 📂 Project Structure
```
tic-tac-toe/
├── index.html          # Main game page
├── styles.css          # Styles and animations
├── index.js            # Game logic and AI implementation
└── assets/
    └── gradient-bg.jpg # Background image
```

## ⚙️ How to Play

1.  **Open `index.html`** in your web browser.
2.  **Toggle Bot Mode**: Check the switch at the top to enable AI mode. Uncheck it to play with a friend.
3.  **Start Game**: Click the "New Game" button to begin.
4.  **Play**: Click on the empty cells to place your mark. The game will automatically switch turns.
5.  **Win**: Get three of your marks in a row (horizontally, vertically, or diagonally) to win!

## 🧩 Algorithm Explanation

The AI uses the **Minimax Algorithm** to make decisions.

1.  **Minimax**: It explores all possible moves recursively down to the end of the game.
2.  **Scoring**:
    *   If the AI (O) wins, it gets a score of `+10`.
    *   If the Human (X) wins, it gets a score of `-10`.
    *   If it's a tie, the score is `0`.
3.  **Optimization**: The scores are adjusted by the `depth` (number of moves taken) to ensure the AI plays faster and prefers shorter games if multiple winning moves exist.
4.  **Best Move**: The AI always chooses the move that leads to the highest possible score, assuming the opponent also plays optimally.

## 🏃 Running the Project
No installation is required! Since the game uses vanilla JavaScript and local assets, you can run it directly.
1.  Clone or download the repository.
2.  Open `index.html` in any modern web browser (Chrome, Firefox, Safari, Edge).
