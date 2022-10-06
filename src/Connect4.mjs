/******************************************
 * 
 * Name
 * 
 *****************************************/

import { exit } from 'node:process';      // Provides the exit method (if you need it)
import * as readline from 'node:readline';


// I put this here because, in my opinion, the entire program should use the same io object.\
const io = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

// Make the Connect4 class available externally.
// You are not required to use an OO design.  You can use any reasonable structure you like
// You can also change the exports if you like.
export default class Connect4 {

    // Use private instance variables where appropriate
    #numRows;
    #numCols;
    #winLength;
    #board;

    constructor(numRows, numCols, winLength) {         
        console.log(`Constructor ${numRows}  ${numCols}  ${winLength}`)   

    }

    header() {
        return 'A B C D E F G H I J K L M O P'.substring(0, this.#numCols*2);
    }

    makeBoard() {
        // I was just playing around with different ideas.  Feel free to delete this
        // if you don't like it.
        this.#board = Array(this.#numRows).fill(1).map(() => Array(this.#numCols).fill(-1));
    }


    fetchColumn(player, callback) {
        io.question(`Player ${player}, which Column? `, line => {
            console.log(`You requested "${line}"`);
            callback();  // Your callback will probably take parameters.
           });
    }

    quit() {
        console.log("Goodbye.");
        io.close();
    }

    playGame() {

        // No, this isn't at all what you code will do.
        // I'm just demonstrating how the pieces *might*
        // fit together.
       this.fetchColumn(1, () => {
        this.quit();
       })
    }
}
