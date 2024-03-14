
class Board {
    constructor() {
      this.cells = Array(9).fill(null);
    }
  
    makeMove(index, player) {
      if (this.cells[index] === null) {
        this.cells[index] = player;
        return true;
      }
      return false;
    }
  
    checkWinner() {
      const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
        [0, 4, 8], [2, 4, 6] // diagonals
      ];
  
      for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (this.cells[a] && this.cells[a] === this.cells[b] && this.cells[a] === this.cells[c]) {
          return this.cells[a]; // return the winning player
        }
      }
  
      if (this.cells.every(cell => cell !== null)) { // if every cell is occupied, but no winner
        return 'draw'; // game ended in a draw
      }
  
      return null; // game is still ongoing
    }
  
    reset() {
      this.cells = Array(9).fill(null);
    }
  }
  
  class Game {
    constructor() {
      this.board = new Board();
      this.currentPlayer = 'X';
      this.statusElement = document.getElementById('status');
      this.restartButton = document.getElementById('restart-btn');
      this.restartButton.addEventListener('click', () => this.restartGame());
      this.render();
    }
  
    render() {
      const boardElement = document.getElementById('board');
      boardElement.innerHTML = '';
      for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.dataset.index = i;
        cell.textContent = this.board.cells[i];
        cell.addEventListener('click', () => this.handleMove(i));
        boardElement.appendChild(cell);
      }
      this.updateStatus();
    }
  
    updateStatus() {
      if (this.board.checkWinner()) {
        this.statusElement.textContent = this.board.checkWinner() === 'draw' ? 'It\'s a draw!' : `Player ${this.currentPlayer} wins!`;
      } else {
        this.statusElement.textContent = `Current player: ${this.currentPlayer}`;
      }
    }
  
    handleMove(index) {

        if (this.board.checkWinner() || this.board.cells[index] !== null) {
            return; // Game has ended or cell is already occupied
          }

      if (this.board.makeMove(index, this.currentPlayer)) {
        this.render();
        if (this.board.checkWinner()) {
          this.statusElement.textContent = this.board.checkWinner() === 'draw' ? 'It\'s a draw!' : `Player ${this.currentPlayer} wins!`;
        } else {
          this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
          this.updateStatus();
        }
      }
    }
  
    restartGame() {
      this.board.reset();
      this.currentPlayer = 'X';
      this.render();
    }
  }
  
  const game = new Game();
