const boxes = document.querySelectorAll(".box");

const resetBtn = document.querySelector("#reset-btn");
const newGameBtn = document.querySelector("#new-game-btn");
const resetScoreBtn = document.querySelector("#reset-score-btn");

const popup = document.querySelector(".popup");
const winnerMessage = document.querySelector("#winner-message");

const turnIndicator = document.querySelector("#turn-indicator");

const playerXScore = document.querySelector("#player-x-score");
const playerOScore = document.querySelector("#player-o-score");
const drawScore = document.querySelector("#draw-score");


// ===============================
// Game Variables
// ===============================

let isOTurn = true;
let moveCount = 0;

let xScore = 0;
let oScore = 0;
let draws = 0;


// ===============================
// Winning Patterns
// ===============================

const winPatterns = [

    [0,1,2],
    [3,4,5],
    [6,7,8],

    [0,3,6],
    [1,4,7],
    [2,5,8],

    [0,4,8],
    [2,4,6]

];


// ===============================
// Update Turn Indicator
// ===============================

function updateTurnIndicator(){

    if(isOTurn){

        turnIndicator.innerHTML = "⭕ Player O";

    }

    else{

        turnIndicator.innerHTML = "❌ Player X";

    }

}


// ===============================
// le All Boxes
// ===============================

function enableBoxes(){

    boxes.forEach((box)=>{

        box.disabled = false;

        box.innerText = "";

        box.classList.remove("winner");

        box.style.color = "";

    });

}


// ===============================
// Disable All Boxes
// ===============================

function disableBoxes(){

    boxes.forEach((box)=>{

        box.disabled = true;

    });

}


// ===============================
// Reset Current Match
// ===============================

function resetGame(){

    isOTurn = true;

    moveCount = 0;

    popup.classList.add("hide");

    enableBoxes();

    updateTurnIndicator();

}


// ===============================
// Reset Complete Scoreboard
// ===============================

function resetScoreBoard(){

    xScore = 0;
    oScore = 0;
    draws = 0;

    playerXScore.innerText = xScore;
    playerOScore.innerText = oScore;
    drawScore.innerText = draws;

    resetGame();

}


// ===============================
// Box Click Event
// ===============================

boxes.forEach((box)=>{

    box.addEventListener("click",()=>{

        if(isOTurn){

            box.innerText = "O";

            box.style.color = "#ff1744";

        }

        else{

            box.innerText = "X";

            box.style.color = "#2962ff";

        }

        box.disabled = true;

        moveCount++;

        // Winner check will be in Part 2
        const winnerFound = checkWinner();

if(winnerFound){

    return;

}

if(moveCount === 9){

    showDraw();

    return;

}

isOTurn = !isOTurn;

updateTurnIndicator();

    });

});


// ===============================
// Button Events
// ===============================

resetBtn.addEventListener("click", resetGame);

newGameBtn.addEventListener("click", resetGame);

resetScoreBtn.addEventListener("click", resetScoreBoard);


// ===============================
// Initial Function Call
// ===============================

updateTurnIndicator();

// ===============================
// Show Winner
// ===============================

function showWinner(winner){

    winnerMessage.innerHTML = `🏆 Player ${winner} Wins!`;

    popup.classList.remove("hide");

    disableBoxes();

    if(winner === "X"){

        xScore++;

        playerXScore.innerText = xScore;

    }

    else{

        oScore++;

        playerOScore.innerText = oScore;

    }

}


// ===============================
// Show Draw
// ===============================

function showDraw(){

    winnerMessage.innerHTML = "🤝 It's a Draw!";

    popup.classList.remove("hide");

    disableBoxes();

    draws++;

    drawScore.innerText = draws;

}


// ===============================
// Check Winner
// ===============================

function checkWinner(){

    for(const pattern of winPatterns){

        const pos1 = boxes[pattern[0]].innerText;
        const pos2 = boxes[pattern[1]].innerText;
        const pos3 = boxes[pattern[2]].innerText;

        if(
            pos1 !== "" &&
            pos2 !== "" &&
            pos3 !== ""
        ){

            if(
                pos1 === pos2 &&
                pos2 === pos3
            ){

                // Highlight Winning Boxes

                boxes[pattern[0]].classList.add("winner");

                boxes[pattern[1]].classList.add("winner");

                boxes[pattern[2]].classList.add("winner");

                showWinner(pos1);

                return true;

            }

        }

    }

    return false;

}