/******************************************
 *
 * Kyle Smigelski
 *
 *****************************************/

import * as readline from 'node:readline';

const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
});

export default class Connect4 {

    // Private Instance Variables
    #numRows;
    #numCols;
    #winLength;
    #board;
    #rowSelection;
    #currentPlayer = 1;

    constructor(numRows, numCols, winLength) {
        this.#numRows = numRows;
        this.#numCols = numCols;
        this.#winLength = winLength;
    }

    header() {
        return '\nA  B  C  D  E  F  G  H  I  J  K  L  M  O  P'.substring(0, this.#numCols * 3);
    }

    makeBoard() {
        this.#board = Array(this.#numRows).fill(1).map(() => Array(this.#numCols).fill(-1));
    }

    // Prints the board to the console
    printBoard() {
        console.log(this.header());
        for (let row = this.#numRows - 1; row >= 0; row--) {
            let rowString = '';
            for (let col = 0; col < this.#numCols; col++) {
                if (this.#board[row][col] === -1) {
                    rowString += '.  ';
                } else {
                    rowString += this.#board[row][col] + '  ';
                }
            }
            console.log(rowString);
        }
    }

    validInput(colSelect, input) {
        if (colSelect < 0 || colSelect >= this.#numCols || this.isColFull(colSelect) || input.length > 1) {
            console.log('Invalid column');
            return false;
        }
        return true;
    }

    isColFull(col) {
        return this.#board[this.#numRows-1][col] !== -1;
    }

    dropPiece(player, col) {
        let row;
        for(row = 0; row < this.#numRows; row++) {
            if(this.#board[row][col] === -1) {
                this.#board[row][col] = player;
                this.#rowSelection = row;
                return;
            }
        }
    }

    nextPlayer() {
        this.#currentPlayer = this.#currentPlayer === 1 ? 2 : 1;
    }

    checkForQuit(input) {
        if (input === 'q' || input === 'Q') {
            console.log("\nGoodbye.");
            process.exit(0);
        }
    }

    fetchColumn(player) {
        io.question(`Player ${player}, please select a column: `, (input) => {
            this.playTurn(player, input);
        });
    }

    playTurn(player, input) {
        let colSelect = input;
        this.checkForQuit(colSelect);
        colSelect = colSelect.toLowerCase().charCodeAt(0) - 97;
        if (this.validInput(colSelect, input)) {
            this.dropPiece(player, colSelect);
            if (this.checkForWin(colSelect)) {
                console.log("\nCongratulations, player " + player + ". You win.");
                process.exit(0);
            }
        } else {
            this.fetchColumn(player);
        }
        this.nextPlayer();
        this.advance();
    }

    advance() {
        this.printBoard();
        this.fetchColumn(this.#currentPlayer);
    }

    playGame() {
        this.makeBoard();
        this.advance();
    }

    xInARow(array) {
        let count = 0;
        for (let i = 0; i < array.length; i++) {
            if (array[i] === this.#currentPlayer) {
                count++;
                if (count === this.#winLength) {
                    return true;
                }
            } else {
                count = 0;
            }
        }
        return false;
    }

    getColumn(col) {
        let column = [];
        for (let i = 0; i < this.#numRows; i++) {
            column.push(this.#board[i][col]);
        }
        return column;
    }

    getRow(row) {
        return this.#board[row];
    }

    getDiags(colSelect){
        let diagonal = (directionX, directionY) => {
            let diagonalArray = [];
            let rowPos = this.#rowSelection;
            let colPos = colSelect;
            while (rowPos >= 0 && rowPos < this.#numRows && colPos >= 0 && colPos < this.#numCols) {
                diagonalArray.push(this.#board[rowPos][colPos]);
                rowPos += directionY;
                colPos += directionX;
            }
            return diagonalArray;
        }
        let rightDiag = diagonal(-1,-1).reverse().slice(0,-1).concat(diagonal(1,1));
        let leftDiag = diagonal(1,-1).reverse().slice(0,-1).concat(diagonal(-1,1));
        return [rightDiag, leftDiag];
    }

    checkForWin(colSelect) {
        this.getDiags(colSelect);
        return this.xInARow(this.getColumn(colSelect)) || this.xInARow(this.getRow(this.#rowSelection))
            || (this.xInARow(this.getDiags(colSelect)[0]) || this.xInARow(this.getDiags(colSelect)[1]));
    }
}

