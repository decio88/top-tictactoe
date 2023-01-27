// Array of win conditions
const boardArray = new Array(9);
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

// Factory function to create player
const Player = (symbol, turn) => {
  const getTurn = () => turn;
  const getSymbol = () => symbol;
  const changeTurn = () => (turn = !turn);
  return { getTurn, getSymbol, changeTurn };
};

const player1 = Player('x', true);
const player2 = Player('o', false);

// Module to create the game board and store its information
function gameBoard() {
  // function to check if player won
  function winGame(player) {
    const playerMoves = [];
    let moveId = boardArray.indexOf(player.getSymbol());
    while (moveId != -1) {
      playerMoves.push(moveId);
      moveId = boardArray.indexOf(player.getSymbol(), moveId + 1);
    }
    if (winArray.includes(playerMoves)) {
      alert(`${player} wins!`);
    } else if (!boardArray.includes(undefined)) {
      alert('Draw!');
    }
  }

  // function to play round
  function playRound(id) {
    if (boardArray[id] === undefined) {
      if (player1.getTurn() === true) {
        player1.changeTurn();
        player2.changeTurn();
        boardArray[id] = player1.getSymbol();
        winGame(player1);
      } else {
        player2.playTurn();
        player1.playTurn();
        boardArray[id] = player2.getSymbol();
        winGame(player2);
      }
    }
  }

  // add event listeners to the divs
  document.querySelectorAll('.box').forEach((box) => {
    box.addEventListener('click', () => {
      playRound(box.id);
    });
  });

  // function of storing the plays array
  // function for checking if player won
}

gameBoard();
