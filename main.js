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
    console.log(xTurn ? "X" : "O", "WIN");
}

cells.forEach((e) => {
    e.addEventListener("click", handleClick);
});
