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

cells.forEach((e) => {
    e.addEventListener("click", handleClick);
});

function handleClick(event) {
    if (xTurn) {
        event.target.classList.add(X_CLASS);
    } else {
        event.target.classList.add(O_CLASS);
    }
    let position = [];
    cells.forEach((cell, i) => {
        if (cell.classList.contains(xTurn ? X_CLASS : O_CLASS)) {
            position.push(i);
        }
    });
    WIN_POSITION.forEach((pos) => {
        if (pos.every((v) => position.includes(v))) {
            win();
            return;
        }
    });

    xTurn = !xTurn;
}

function win() {
    winText.innerHTML = xTurn ? "X WINS" : "O WINS";
    winElement.style.display = "block";
}

function handleRestart() {
    xTurn = true;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS, O_CLASS);
    });
    winElement.style.display = "none";
}

restartButton.addEventListener("click", handleRestart);