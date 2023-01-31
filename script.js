// Array of win conditions
const boardArray = new Array(9);
let turnCounter = 0;
const winArray = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

// function to display content on the page

function displayController() {
  function displaySymbols(id, symbol) {
    const divArray = document.querySelectorAll('.box');
    divArray[id].innerHTML = symbol;
    document.querySelector('.turn').innerHTML = turnCounter;
  }

  // function to reset the display
  function resetDisplay() {
    document.querySelectorAll('.box').forEach((box) => {
      box.innerHTML = '';
      turnCounter = 0;
      document.querySelector('.turn').innerHTML = turnCounter;
      document.querySelector('.result-message>h2').innerHTML = '';
    });
  }

  // function to display the game result
  function resultMessage(condition, player) {
    const resultMsg = document.querySelector('.result-message>h2');
    if (condition === 1) {
      resultMsg.innerHTML = `Congratulations ${player.getName()}, you won!`;
    } else {
      resultMessage.innerHTML = "It's a draw!";
    }
  }

  return { displaySymbols, resetDisplay, resultMessage };
}

// Factory function to create player
const Player = (name, symbol, turn) => {
  const getTurn = () => turn;
  const getSymbol = () => symbol;
  const changeTurn = () => (turn = !turn);
  const setTurn = (value) => {
    turn = value;
  };
  const getName = () => name;
  return { getTurn, getSymbol, changeTurn, setTurn, getName };
};

let player1;
let player2;

// Functions to create players and manage overlay

function createPlayer1() {
  const playerName = document.querySelector(`#player1`).value;
  player1 = Player(playerName, 'X', true);
  document.querySelector('.player1').classList.add('hidden');
  document.querySelector('#player1-name').innerHTML = playerName;
}

function createPlayer2() {
  const playerName = document.querySelector(`#player2`).value;
  player2 = Player(playerName, 'O', false);
  document.querySelector('.player2').classList.add('hidden');
  document.querySelector('#player2-name').innerHTML = playerName;
}

function hideOverlay() {
  if (player1 !== undefined && player2 !== undefined) {
    document.querySelector('.overlay').classList.add('hidden');
  }
}

function resetOverlay() {
  document.querySelector('.overlay').classList.remove('hidden');
  document.querySelector('.player2').classList.remove('hidden');
  document.querySelector('.player1').classList.remove('hidden');
}

document.querySelector('#pl1Btn').addEventListener('click', () => {
  createPlayer1();
  hideOverlay();
});

document.querySelector('#pl2Btn').addEventListener('click', () => {
  createPlayer2();
  hideOverlay();
});

// Module to create the game board and store its information
function gameBoard() {
  let endGameCondition = false;

  // function to check if player won and storing the plays array
  function gameEngine(player) {
    const playerMoves = [];
    let moveId = boardArray.indexOf(player.getSymbol());
    while (moveId !== -1) {
      playerMoves.push(moveId);
      moveId = boardArray.indexOf(player.getSymbol(), moveId + 1);
    }

    // check the winner
    let i = 0;
    while (i < winArray.length) {
      if (winArray[i].every((v) => playerMoves.includes(v))) {
        displayController().resultMessage(1, player);
        endGameCondition = true;
      }
      i++;
    }
    if (!boardArray.includes(undefined)) {
      displayController().resultMessage(0, player);
    }
  }

  // function to play round
  function playRound(id) {
    if (endGameCondition === false) {
      if (boardArray[id] === undefined) {
        turnCounter += 1;
        if (player1.getTurn() === true) {
          player1.changeTurn();
          player2.changeTurn();
          boardArray[id] = player1.getSymbol();
          displayController().displaySymbols(id, player1.getSymbol());
          gameEngine(player1);
        } else {
          player2.changeTurn();
          player1.changeTurn();
          boardArray[id] = player2.getSymbol();
          displayController().displaySymbols(id, player2.getSymbol());
          gameEngine(player2);
        }
      }
    }
  }

  // function to reset game
  function resetGame() {
    for (let i = 0; i < boardArray.length; i++) {
      boardArray[i] = undefined;
    }
    displayController().resetDisplay();
    endGameCondition = false;
    player1 = undefined;
    player2 = undefined;
    resetOverlay();
  }

  // add event listeners to the divs
  document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', () => {
      const id = +box.getAttribute('data-id');
      playRound(id);
    });
  });
  // add event listners to the reset button
  document.querySelector('.reset').addEventListener('click', () => resetGame());
}

gameBoard();
