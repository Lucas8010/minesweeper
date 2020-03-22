document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
var mineChance = 0.1;
var board = {
}

function newBoard(boardSize) {
	 board.cells = [];
	for(let currentRow = 0; currentRow < boardSize; currentRow++) {
		for(let currentCol = 0; currentCol < boardSize; currentCol++){
			board.cells.push({
				row: currentRow,
				col: currentCol,
				isMine: Math.round(Math.random() < mineChance),
				isMarked: false,
				hidden: true,
			})
		}
	}
	return board;
}

newBoard()

function startGame () {

	document.addEventListener ("click", checkForWin)
	document.addEventListener ("contextmenu", checkForWin)

	// this line should be on lib.js actually - but I didn't want to change that file
	document.getElementsByClassName('board')[0].innerHTML = '';
	board = newBoard(4);

	for(var i = 0; i < board.cells.length; i++) {
		board.cells[i].surroundingMines = countSurroundingMines(board.cells[i])
	}

  // Don't remove this function call: it makes the game work!
  lib.initBoard();
  console.log("here") ;
  	
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {
	for (let i = 0; i < board.cells.length; i++) {
		if ((board.cells[i].isMine === true && board.cells[i].isMarked === false) || (board.cells[i].isMine === false && board.cells[i].isMarked === true)) {
			return 
		} else if (board.cells[i].ismarked === false && board.cells[i].hidden == true) {
			return
		}
	} 
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
// var winAudio = new Audio('triumph.mp3');
//  winAudio.src = "triumph.mp3";

//   if (board.cells.isMine === true && board.cells.isMarked === true) {
//   	   return winAudio.play();
//   }
    lib.displayMessage('You win!')
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {

		const surroundingCells = lib.getSurroundingCells(cell.row, cell.col);		
		let count = 0;
		for (var i = 0; i < surroundingCells.length; i++) {
			if (surroundingCells[i].isMine == true){
				count++;				
			}
		}
		console.log(count);
	return count;
}
