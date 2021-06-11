const X_CLASS = "x";
const O_CLASS = "o";
const WIN_POSITION = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
];
let xTurn = true;

let cells = [...document.getElementsByClassName("cell")];
let winElement = document.getElementById("win");
let winText = document.getElementById("win-text");
let restartButton = document.getElementById("restart");
let turnText = document.getElementById("turn-text");

cells.forEach((cell) => {
    cell.addEventListener("click", handleClick);
});

function handleClick(event) {
    if (!markCell(event.target)) return;
    checkWin();

    xTurn = !xTurn;
    turnText.innerHTML = xTurn ? "X TURN" : "O TURN";
}

function markCell(cell) {
    if (cell.classList.contains(X_CLASS) || cell.classList.contains(O_CLASS)) {
        return false;
    }
    if (xTurn) {
        cell.classList.add(X_CLASS);
    } else {
        cell.classList.add(O_CLASS);
    }
    return true;
}

function checkWin() {
    let position = [];
    let filled = [];
    cells.forEach((cell, i) => {
        if (cell.classList.contains(xTurn ? X_CLASS : O_CLASS)) {
            position.push(i);
        }
        if (
            cell.classList.contains(X_CLASS) ||
            cell.classList.contains(O_CLASS)
        ) {
            filled.push(i);
        }
    });
    WIN_POSITION.forEach((pos) => {
        if (pos.every((v) => position.includes(v))) {
            win();
            return;
        }
    });
    if (filled.length > 8) win(true);
}

function win(draw = false) {
    if (draw) {
        winText.innerHTML = "DRAW";
    } else {
        winText.innerHTML = xTurn ? "X WINS" : "O WINS";
    }
    winElement.style.display = "block";
}

function handleRestart() {
    xTurn = true;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS, O_CLASS);
    });
    winElement.style.display = "none";
    turnText.innerHTML = "X TURN";
}

restartButton.addEventListener("click", handleRestart);