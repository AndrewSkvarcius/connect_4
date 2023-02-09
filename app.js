const width = 7; //< Board Width
const height = 6; //< Board Height

let currPlayer = 1; //< current player who's turn it is 
let board = []; //< game board, array of six arrays each with seven elements

const makeBoard = () => {
    for (let y = 0; y < height; y++){
        board.push(Array.from({length: width}));
    }
}
     //^ makes the board width and height in board array [x][y];
const makeHtmlBoard = () => {
    const board = document.getElementById('board');
    //^ makes HTML table and row of column tops

      // make column tops (clickable area for adding a piece to that column)
   const top = document.createElement('tr');
   top.setAttribute('id', 'column-top');
   top.addEventListener('click', handleClick);
 
   for (let x = 0; x < width; x++) {
     const headCell = document.createElement('td');
     headCell.setAttribute('id', x);
     top.append(headCell);
   }
 
   board.append(top);
 
   // make main part of board
   for (let y = 0; y < height; y++) {
     const row = document.createElement('tr');
 
     for (let x = 0; x < width; x++) {
       const cell = document.createElement('td');
       cell.setAttribute('id', `${y}-${x}`);
       row.append(cell);
     }
 
     board.append(row);
   }


}
const findSpotForCol = x => {
    for (let y = height - 1; y >= 0; y--) {
      if (!board[y][x]) {
        return y;
      }
    
    return null;
}
function placeInTable(y, x) {
    const piece = document.createElement('div');
    piece.classList.add('piece');
    piece.classList.add(`p${currPlayer}`);
    console.log(currPlayer);
    piece.style.top = -50 * (y + 2);
  
    const spot = document.getElementById(`${y}-${x}`);
    spot.append(piece);
  }
  
  // End of game alert message
  
  const endGame = (msg) => alert(msg);
  
  
  // handleClick: handle click of column top to play piece */
  
  
  /** checkForWin: check board cell-by-cell for "does a win start here?" */
  
  function checkForWin() {
    function _win(cells) {
      // Check four cells to see if they're all color of current player
      //  - cells: list of four (y, x) cells
      //  - returns true if all are legal coordinates & all match currPlayer
  
      return cells.every(
        ([y, x]) =>
          y >= 0 &&
          y < height &&
          x >= 0 &&
          x < width &&
          board[y][x] === currPlayer
      );
    }
  
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        // get "check list" of 4 cells (starting here) for each of the different
        // ways to win
        const horiz = [[y, x], [y, x + 1], [y, x + 2], [y, x + 3]];
        const vert = [[y, x], [y + 1, x], [y + 2, x], [y + 3, x]];
        const diagDR = [[y, x], [y + 1, x + 1], [y + 2, x + 2], [y + 3, x + 3]];
        const diagDL = [[y, x], [y + 1, x - 1], [y + 2, x - 2], [y + 3, x - 3]];
  
        // find winner (only checking each win-possibility as needed)
        if (_win(horiz) || _win(vert) || _win(diagDR) || _win(diagDL)) {
          return true;
        }
      }
    }
  }
} 
  makeBoard();
  makeHtmlBoard();
