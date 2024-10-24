const cells = document.querySelectorAll('[data-cell]');
let isXTurn = true;
const winningMessageElement = document.getElementById('winningMessage');
const winningMessageText = document.querySelector('[data-winning-message-text]');
const board = document.getElementById('board');
const playerTurnDisplay = document.getElementById('playerTurn'); // Show player turn

let playerX = 'Player 1'; // Default name for Player X
let playerO = 'Player 2'; // Default name for Player O

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],
  [0, 3, 6], [1, 4, 7], [2, 5, 8],
  [0, 4, 8], [2, 4, 6]
];

// Start the game after players submit their names
document.getElementById('playerForm').addEventListener('submit', function(e) {
  e.preventDefault(); // Prevent form submission
  
  playerX = document.getElementById('player1').value || 'Player 1';
  playerO = document.getElementById('player2').value || 'Player 2';
  
  updatePlayerTurn(); // Display the player’s turn
  startGame();
});

function startGame() {
  cells.forEach(cell => {
    cell.addEventListener('click', handleClick, { once: true });
  });
}

function handleClick(e) {
  const cell = e.target;
  const currentClass = isXTurn ? 'x' : 'o';
  placeMark(cell, currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    swapTurns();
    updatePlayerTurn(); // Update player turn after each move
  }
}

function placeMark(cell, currentClass) {
  cell.classList.add(currentClass);
}

function swapTurns() {
  isXTurn = !isXTurn;
}

function checkWin(currentClass) {
  return winningCombinations.some(combination => {
    return combination.every(index => {
      return cells[index].classList.contains(currentClass);
    });
  });
}

function endGame(draw) {
  if (draw) {
    winningMessageText.innerText = 'It\'s a Draw!';
  } else {
    winningMessageText.innerText = `${isXTurn ? playerX : playerO} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

function isDraw() {
  return [...cells].every(cell => {
    return cell.classList.contains('x') || cell.classList.contains('o');
  });
}

function updatePlayerTurn() {
  playerTurnDisplay.innerText = `${isXTurn ? playerX : playerO}'s Turn`;
}

const restartButton = document.getElementById('restartButton');
restartButton.addEventListener('click', restartGame);

function restartGame() {
  isXTurn = true;
  cells.forEach(cell => {
    cell.classList.remove('x', 'o', 'highlight');
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  winningMessageElement.classList.remove('show');
  updatePlayerTurn(); // Reset to Player X's turn
}
