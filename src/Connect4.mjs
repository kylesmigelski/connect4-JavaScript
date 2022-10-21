/******************************************
 *
 * Kyle Smigelski
 * Fall 2022
 * CIS 343
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

    /************************************************************************************
     * Checks if there are winLength pieces in a row for the current player by iterating
     * over the given array and checking if the current element is equal to the current player
     * @param array
     * @returns {boolean}
     */
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

    /************************************************************************************
     * Returns an array of both diagonals
     * @param colSelect
     * @returns {*[][]}
     */
    getDiags(colSelect) {

        // Lambda function iterates through the board and returns the diagonal from the current position,
        // iterating in the given direction
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

        // Two diagonal arrays are combined into a complete diagonal, with one array reversed and the last element
        // removed to avoid duplicates
        let rightDiag = diagonal(-1, -1).reverse().slice(0, -1).concat(diagonal(1, 1));
        let leftDiag = diagonal(1, -1).reverse().slice(0, -1).concat(diagonal(-1, 1));
        return [rightDiag, leftDiag];
    }

    /************************************************************************************
     * Checks for a win by passing the column, row, and diagonals to the xInARow function
     * @param colSelect
     * @returns {boolean}
     */
    checkForWin(colSelect) {
        this.getDiags(colSelect);
        return this.xInARow(this.getColumn(colSelect)) || this.xInARow(this.getRow(this.#rowSelection))
            || (this.xInARow(this.getDiags(colSelect)[0]) || this.xInARow(this.getDiags(colSelect)[1]));
    }

    /************************************************************************************
     * Takes the current player and the selected column and drops a piece into the board
     * and checks if the current player has won
     * @param player
     * @param input
     */
    playTurn(player, input) {
        let colSelect = input;

        // Converts input into a number
        colSelect = colSelect.toLowerCase().charCodeAt(0) - 97;
        this.checkForQuit(colSelect);

        // If the input is valid the piece is dropped into the board
        if (this.validInput(colSelect)) {
            this.dropPiece(player, colSelect);

            // If the current player has won, end the game
            if (this.checkForWin(colSelect)) {
                console.log("Congratulations, " + player + ". You win.");
                io.close();
                process.exit(0);
            }

            // If input is not valid, prompt again
        } else {
            this.fetchColumn(player);
        }
        this.nextPlayer();
        this.advance();
    }

    /************************************************************************************
     * Callback function for the readline interface, reads the input and
     * passes it to the playTurn function
     * @param player
     */
    fetchColumn(player) {
        io.question(`Player ${player}, please select a column: `, (input) => {
            this.playTurn(player, input);
        });
    }

    // Prints the board and prompts the current player for input
    advance() {
        this.printBoard();
        this.fetchColumn(this.#currentPlayer);
    }

    // Creates the board and starts the first turn
    playGame() {
        this.makeBoard();
        this.advance();
    }

    // Returns the selected column
    getColumn(col) {
        let column = [];
        for (let i = 0; i < this.#numRows; i++) {
            column.push(this.#board[i][col]);
        }
        return column;
    }

    // Returns the selected row
    getRow(row) {
        return this.#board[row];
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

    // Checks if the selected column is not on the board, or if the column is full
    validInput(colSelect) {
        if (colSelect < 0 || colSelect >= this.#numCols || this.isColFull(colSelect)) {
            console.log('Invalid column');
            return false;
        }
        return true;
    }

    // Checks if a column is full
    isColFull(col) {
        return this.#board[this.#numRows - 1][col] !== -1;
    }

    // Drops a piece into the board, sets the rowSelection variable to the row the piece was dropped into
    dropPiece(player, col) {
        let row;
        for (row = 0; row < this.#numRows; row++) {
            if (this.#board[row][col] === -1) {
                this.#board[row][col] = player;
                this.#rowSelection = row;
                return;
            }
        }
    }

    // Switches the current player
    nextPlayer() {
        this.#currentPlayer = this.#currentPlayer === 1 ? 2 : 1;
    }

    // If the user enters 'q' or 'Q' the game ends
    checkForQuit(input) {
        if (input === -48 || input === 16) {
            console.log("Goodbye.");
            process.exit(0);
        }
    }
}

