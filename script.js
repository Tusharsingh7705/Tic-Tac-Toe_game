document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const resetButton = document.getElementById('reset');
    const messageElement = document.getElementById('message');
    let currentPlayer = 'X';
    let board = Array(9).fill(null);
    let gameActive = true;
  
    const winningCombinations = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];
  
    function handleCellClick(event) {
      const cell = event.target;
      const cellIndex = parseInt(cell.getAttribute('data-index'));
  
      if (board[cellIndex] || !gameActive) {
        return;
      }
  
      board[cellIndex] = currentPlayer;
      cell.textContent = currentPlayer;
  
      if (checkWin()) {
        messageElement.textContent = `${currentPlayer} wins!`;
        gameActive = false;
        return;
      }
  
      if (board.every(cell => cell)) {
        messageElement.textContent = 'Draw!';
        gameActive = false;
        return;
      }
  
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
  
    function checkWin() {
      return winningCombinations.some(combination => {
        return combination.every(index => {
          return board[index] === currentPlayer;
        });
      });
    }
  
    function resetGame() {
      board = Array(9).fill(null);
      cells.forEach(cell => {
        cell.textContent = '';
      });
      currentPlayer = 'X';
      gameActive = true;
      messageElement.textContent = '';
    }
  
    cells.forEach(cell => {
      cell.addEventListener('click', handleCellClick);
    });
  
    resetButton.addEventListener('click', resetGame);
  });
  