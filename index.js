const boxes = document.querySelectorAll(".box");
const gameInfo = document.querySelector(".game-info");
const newGameBtn = document.querySelector(".btn");
const botToggle = document.getElementById("bot-toggle");


let currentPlayer;
let gameGrid;

const winningPositions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

//let's create a function to initialise the game
function initGame() {
    currentPlayer = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    //UI pr empty bhi karna padega boxes ko
    boxes.forEach((box, index) => {
        box.innerText = "";
        boxes[index].style.pointerEvents = "all";
        //one more thing is missing, initialise box with css properties again
        box.classList = `box box${index + 1}`;
    });
    newGameBtn.classList.remove("active");
    gameInfo.innerText = `Current Player - ${currentPlayer}`;
}

initGame();

function swapTurn() {
    if (currentPlayer === "X") {
        currentPlayer = "O";
    }
    else {
        currentPlayer = "X";
    }
    //UI Update
    gameInfo.innerText = `Current Player - ${currentPlayer}`;

    // If bot mode is on and it's O's turn, trigger bot move
    if (botToggle.checked && currentPlayer === "O") {
        // Add a small delay for better UX
        setTimeout(makeBotMove, 500);
    }
}

function checkGameOver() {
    let answer = "";

    winningPositions.forEach((position) => {
        //all 3 boxes should be non-empty and exactly same in value
        if ((gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== "")
            && (gameGrid[position[0]] === gameGrid[position[1]]) && (gameGrid[position[1]] === gameGrid[position[2]])) {

            //check if winner is X
            if (gameGrid[position[0]] === "X")
                answer = "X";
            else {
                answer = "O";
            }


            //disable pointer events
            boxes.forEach((box) => {
                box.style.pointerEvents = "none";
            })

            //now we know X/O is a winner
            boxes[position[0]].classList.add("win");
            boxes[position[1]].classList.add("win");
            boxes[position[2]].classList.add("win");
        }
    });

    //it means we have a winner
    if (answer !== "") {
        gameInfo.innerText = `Winner Player - ${answer}`;
        newGameBtn.classList.add("active");
        return;
    }

    //We know, NO Winner Found, let's check whether there is tie
    let fillCount = 0;
    gameGrid.forEach((box) => {
        if (box !== "")
            fillCount++;
    });

    //board is Filled, game is TIE
    if (fillCount === 9) {
        gameInfo.innerText = "Game Tied !";
        newGameBtn.classList.add("active");
        return true;
    }
    return false;
}

function checkWinner(grid) {
    let res = null;
    winningPositions.forEach((position) => {
        if (grid[position[0]] !== "" && grid[position[0]] === grid[position[1]] && grid[position[1]] === grid[position[2]]) {
            res = grid[position[0]];
        }
    });

    if (res === null) {
        let fillCount = 0;
        grid.forEach(cell => { if (cell !== "") fillCount++; });
        if (fillCount === 9) return "tie";
    }
    return res;
}

function minimax(grid, depth, isMaximizing) {
    let result = checkWinner(grid);
    if (result !== null) {
        if (result === "O") return 10 - depth;
        if (result === "X") return depth - 10;
        return 0;
    }

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < 9; i++) {
            if (grid[i] === "") {
                grid[i] = "O";
                let score = minimax(grid, depth + 1, false);
                grid[i] = "";
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < 9; i++) {
            if (grid[i] === "") {
                grid[i] = "X";
                let score = minimax(grid, depth + 1, true);
                grid[i] = "";
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}

function makeBotMove() {
    let bestScore = -Infinity;
    let move = -1;
    for (let i = 0; i < 9; i++) {
        if (gameGrid[i] === "") {
            gameGrid[i] = "O";
            let score = minimax(gameGrid, 0, false);
            gameGrid[i] = "";
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    if (move !== -1) {
        handleClick(move);
    }
}

function handleClick(index) {
    if (gameGrid[index] === "") {
        boxes[index].innerText = currentPlayer;
        gameGrid[index] = currentPlayer;
        boxes[index].style.pointerEvents = "none";
        //swap karo turn ko
        swapTurn();
        //check koi jeet toh nahi gya
        checkGameOver();
    }
}

boxes.forEach((box, index) => {
    box.addEventListener("click", () => {
        handleClick(index);
    })
});

newGameBtn.addEventListener("click", initGame);